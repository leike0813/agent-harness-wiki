/**
 * Public npm consumer acceptance for one exact published version.
 *
 * Installs the exact version into a temporary prefix outside the source tree
 * with isolated npm configuration, then runs the five CLI queries and the five
 * MCP tools over the real SDK against a published data URL. The install runs
 * against a controllable registry so tests never reach the public network or
 * the user's npm configuration. Release identities across the CLI and MCP
 * reads must agree; a public pointer change is reported as an inconsistent
 * failure rather than re-read or rebound.
 */
import { deepStrictEqual } from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { consumerResultSchemas } from "../domain/consumer.js";
import { verifyPublishedSite } from "./readback.js";

export const publicRegistry = "https://registry.npmjs.org";
export const consumerPackageName = "agent-harness-wiki";

/** Isolated process helpers, injected so this module reuses the caller's spawn. */
export interface ConsumerProcess {
  npm(): Promise<string>;
  runNode(
    args: string[],
    cwd: string,
    env: NodeJS.ProcessEnv,
    expected?: number,
  ): Promise<string>;
}

export interface ConsumerInstallOptions {
  runner: ConsumerProcess;
  packageVersion: string;
  registry?: string;
  packageName?: string;
}

export interface InstalledConsumer {
  base: string;
  prefix: string;
  entry: string;
  version: string;
  env: Record<string, string>;
  remove(): Promise<void>;
}

/** OS process essentials only; never copy the caller's credentials. */
const passthroughKeys = [
  "PATH",
  "Path",
  "SystemRoot",
  "COMSPEC",
  "PATHEXT",
  "TEMP",
  "TMP",
] as const;

/** Isolated HOME, cache and npm config under a temporary base with spaces. */
function isolatedEnvironment(
  base: string,
  registry: string,
  prefix: string,
): Record<string, string> {
  const home = path.join(base, "home with spaces");
  const env: Record<string, string> = {
    HOME: home,
    USERPROFILE: home,
    APPDATA: path.join(home, "AppData", "Roaming"),
    LOCALAPPDATA: path.join(home, "AppData", "Local"),
    XDG_CACHE_HOME: path.join(home, ".cache"),
    XDG_CONFIG_HOME: path.join(home, ".config"),
    npm_config_cache: path.join(base, "npm cache"),
    npm_config_userconfig: path.join(base, "user.npmrc"),
    npm_config_globalconfig: path.join(base, "global.npmrc"),
    npm_config_prefix: prefix,
    npm_config_registry: registry,
    npm_config_audit: "false",
    npm_config_fund: "false",
    npm_config_update_notifier: "false",
    npm_config_ignore_scripts: "true",
    npm_config_loglevel: "error",
  };
  for (const key of passthroughKeys) {
    const value = process.env[key];
    if (value !== undefined) env[key] = value;
  }
  return env;
}

/**
 * Install one exact published version outside the source tree. The returned
 * base directory is owned by the caller through `remove()`.
 */
export async function installExactConsumerPackage(
  options: ConsumerInstallOptions,
): Promise<InstalledConsumer> {
  const name = options.packageName ?? consumerPackageName;
  const registry = options.registry ?? publicRegistry;
  const npm = await options.runner.npm();
  const base = await mkdtemp(path.join(tmpdir(), "ahw-public-consumer "));
  const prefix = path.join(base, "install prefix");
  try {
    await mkdir(prefix, { recursive: true });
    await writeFile(path.join(base, "user.npmrc"), "");
    await writeFile(path.join(base, "global.npmrc"), "");
    const env = isolatedEnvironment(base, registry, prefix);
    await writeFile(
      path.join(prefix, "package.json"),
      JSON.stringify({
        name: "consumer-verification",
        version: "0.0.0",
        private: true,
      }),
    );
    await options.runner.runNode(
      [
        npm,
        "install",
        "--prefix",
        prefix,
        "--registry",
        registry,
        "--no-audit",
        "--no-fund",
        "--ignore-scripts",
        `${name}@${options.packageVersion}`,
      ],
      prefix,
      env,
    );
    const manifest = JSON.parse(
      await readFile(
        path.join(prefix, "node_modules", name, "package.json"),
        "utf8",
      ),
    ) as {
      version: string;
      bin?: string | Record<string, string>;
    };
    if (manifest.version !== options.packageVersion)
      throw new Error(
        `Installed ${name}@${manifest.version}, expected ${options.packageVersion}.`,
      );
    const bin =
      typeof manifest.bin === "string" ? manifest.bin : manifest.bin?.ahw;
    if (!bin) throw new Error(`Installed ${name} declares no ahw bin.`);
    return {
      base,
      prefix,
      entry: path.join(prefix, "node_modules", name, bin),
      version: manifest.version,
      env,
      remove: () => rm(base, { recursive: true, force: true }),
    };
  } catch (error) {
    await rm(base, { recursive: true, force: true });
    throw error;
  }
}

export interface PublicConsumerOptions extends ConsumerInstallOptions {
  dataUrl: string;
  signal?: AbortSignal;
}

export interface PublicConsumerCheck {
  name: string;
  status: "passed" | "failed";
  detail?: string;
}

export interface PublicConsumerReport {
  result: "passed" | "failed";
  package: { name: string; version: string };
  registry: string;
  data_url: string;
  release_id: string;
  checks: PublicConsumerCheck[];
  failures: string[];
  platforms: Record<string, string>;
  started_at: string;
  finished_at: string;
}

export async function runPublicConsumerVerification(
  options: PublicConsumerOptions,
): Promise<PublicConsumerReport> {
  const startedAt = new Date().toISOString();
  const name = options.packageName ?? consumerPackageName;
  const registry = options.registry ?? publicRegistry;
  const checks: PublicConsumerCheck[] = [];
  const failures: string[] = [];
  const record = (
    check: string,
    status: "passed" | "failed",
    detail?: string,
  ) => {
    checks.push(
      detail === undefined
        ? { name: check, status }
        : { name: check, status, detail },
    );
    if (status === "failed") failures.push(check);
  };
  const guard = async (
    check: string,
    work: () => Promise<string | void> | string | void,
  ): Promise<boolean> => {
    try {
      const detail = await work();
      record(check, "passed", detail || undefined);
      return true;
    } catch (error) {
      record(check, "failed", brief(error));
      return false;
    }
  };

  let releaseId = "";
  let installed: InstalledConsumer | undefined;
  const finish = (): PublicConsumerReport => ({
    result: failures.length ? "failed" : "passed",
    package: { name, version: options.packageVersion },
    registry,
    data_url: options.dataUrl,
    release_id: releaseId,
    checks,
    failures,
    platforms: {
      [`${process.platform}-${process.arch}-node${process.versions.node}`]:
        failures.length ? "failed" : "passed",
    },
    started_at: startedAt,
    finished_at: new Date().toISOString(),
  });
  try {
    installed = await installExactConsumerPackage(options);
    record(
      "install exact published package",
      "passed",
      `${name}@${installed.version}`,
    );
    const cli = (args: string[]) =>
      options.runner.runNode(
        [
          installed!.entry,
          "--data-url",
          options.dataUrl,
          "--no-file-cache",
          "--json",
          "query",
          ...args,
        ],
        installed!.prefix,
        installed!.env,
      );

    await guard("installed --version", async () => {
      const version = (
        await options.runner.runNode(
          [installed!.entry, "--version"],
          installed!.prefix,
          installed!.env,
        )
      ).trim();
      if (version !== options.packageVersion)
        throw new Error(`Installed CLI reports ${version}.`);
      return version;
    });

    const probe = await verifyPublishedSite({ dataUrl: options.dataUrl });
    record(
      "public readback probe",
      probe.result === "passed" ? "passed" : "failed",
      probe.result === "passed"
        ? probe.release_id
        : `${probe.release_id}: ${probe.failures.join(", ")}`,
    );
    if (probe.result !== "passed" || !probe.inputs) return finish();
    releaseId = probe.release_id;
    const inputs = probe.inputs;
    const expected = probe.release_id;

    const cliResults: Record<string, unknown> = {};
    const releaseIds = new Set<string>();
    const cliCases: {
      key: string;
      args: string[];
      schema: { parse(value: unknown): { release_id: string } & object };
    }[] = [
      {
        key: "list_harnesses",
        args: ["list"],
        schema: consumerResultSchemas.list_harnesses,
      },
      {
        key: "get_topic",
        args: [
          "topic",
          "--harness",
          inputs.harness,
          "--topic",
          inputs.topic,
          "--surface-id",
          inputs.surface_id,
          ...(inputs.section_id ? ["--section-id", inputs.section_id] : []),
        ],
        schema: consumerResultSchemas.get_topic,
      },
      {
        key: "search_knowledge",
        args: [
          "search",
          "--text",
          inputs.search_text,
          "--harness",
          inputs.harness,
          "--topic",
          inputs.topic,
        ],
        schema: consumerResultSchemas.search_knowledge,
      },
      {
        key: "compare_topics",
        args: [
          "compare",
          "--topic",
          inputs.topic,
          "--targets",
          JSON.stringify(inputs.compare_targets),
        ],
        schema: consumerResultSchemas.compare_topics,
      },
      {
        key: "get_source",
        args: ["source", "--reference-id", inputs.reference_id],
        schema: consumerResultSchemas.get_source,
      },
    ];
    for (const entry of cliCases)
      await guard(`CLI ${entry.key}`, async () => {
        const parsed = entry.schema.parse(JSON.parse(await cli(entry.args)));
        if (parsed.release_id !== expected)
          throw new Error(`reported ${parsed.release_id}`);
        releaseIds.add(parsed.release_id);
        cliResults[entry.key] = parsed;
      });

    const transport = new StdioClientTransport({
      command: process.execPath,
      args: [
        installed.entry,
        "--data-url",
        options.dataUrl,
        "--no-file-cache",
        "mcp",
      ],
      env: installed.env,
      cwd: installed.prefix,
      stderr: "pipe",
    });
    const client = new Client({
      name: "ahw-public-consumer-verify",
      version: options.packageVersion,
    });
    const call = async (tool: string, input: Record<string, unknown>) => {
      const result = await client.callTool({ name: tool, arguments: input });
      if (result.isError) throw new Error(`${tool} returned isError`);
      if (
        typeof result.structuredContent !== "object" ||
        result.structuredContent === null
      )
        throw new Error(`${tool} returned no structured content`);
      return result.structuredContent as { release_id: string } & object;
    };
    try {
      await client.connect(transport);
      await guard("MCP serverInfo version", () => {
        if (client.getServerVersion()?.version !== options.packageVersion)
          throw new Error("serverInfo version differs");
        return options.packageVersion;
      });
      await guard("MCP tools are the five read-only tools", async () => {
        const tools = (await client.listTools()).tools;
        const names = tools.map((tool) => tool.name).sort();
        const expectedNames = [...cliCases.map((entry) => entry.key)].sort();
        deepStrictEqual(names, expectedNames);
        if (!tools.every((tool) => tool.annotations?.readOnlyHint === true))
          throw new Error("a tool is not read-only");
        return names.join(", ");
      });
      const mcpCases: {
        key: string;
        input: Record<string, unknown>;
        schema: { parse(value: unknown): { release_id: string } & object };
      }[] = [
        {
          key: "list_harnesses",
          input: {},
          schema: consumerResultSchemas.list_harnesses,
        },
        {
          key: "get_topic",
          input: {
            harness: inputs.harness,
            topic: inputs.topic,
            surface_id: inputs.surface_id,
            ...(inputs.section_id ? { section_id: inputs.section_id } : {}),
          },
          schema: consumerResultSchemas.get_topic,
        },
        {
          key: "search_knowledge",
          input: {
            text: inputs.search_text,
            harness: inputs.harness,
            topic: inputs.topic,
          },
          schema: consumerResultSchemas.search_knowledge,
        },
        {
          key: "compare_topics",
          input: {
            topic: inputs.topic,
            targets: inputs.compare_targets,
          },
          schema: consumerResultSchemas.compare_topics,
        },
        {
          key: "get_source",
          input: { reference_id: inputs.reference_id },
          schema: consumerResultSchemas.get_source,
        },
      ];
      for (const entry of mcpCases)
        await guard(`MCP ${entry.key}`, async () => {
          const parsed = entry.schema.parse(await call(entry.key, entry.input));
          if (parsed.release_id !== expected)
            throw new Error(`reported ${parsed.release_id}`);
          releaseIds.add(parsed.release_id);
          deepStrictEqual(parsed, cliResults[entry.key]);
          return undefined;
        });
    } finally {
      await client.close().catch(() => {});
      await transport.close().catch(() => {});
    }

    await guard("public current stayed one release", () => {
      if (releaseIds.size !== 1 || releaseIds.has(expected) === false)
        throw new Error(
          `Observed releases ${[...releaseIds].join(", ")}; expected ${expected}.`,
        );
      return expected;
    });
  } catch (error) {
    record("public verification", "failed", brief(error));
  } finally {
    await installed?.remove();
  }
  return finish();
}

function brief(error: unknown): string {
  const issues = (
    error as { issues?: { path?: unknown[]; message?: string }[] }
  ).issues;
  if (Array.isArray(issues))
    return issues
      .slice(0, 5)
      .map((issue) => `${(issue.path ?? []).join(".")}: ${issue.message ?? ""}`)
      .join("; ")
      .slice(0, 500);
  return (error instanceof Error ? error.message : String(error)).slice(0, 500);
}
