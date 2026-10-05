/**
 * External consumer acceptance for the packed agent-harness-wiki artifact.
 *
 * Installs the real tgz outside the source tree from a controlled local npm
 * registry serving the exact installed dependency closure, then runs the five
 * CLI queries and the five MCP tools over the real SDK against a generated
 * online release on loopback. Cancellation and disconnect are measured by the
 * HTTP server observing aborted work. Results are validated with the public
 * consumer schemas. No public registry, no real HOME. Writes
 * var/consumer-package/verification.json.
 */
import { deepStrictEqual } from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  cp,
  lstat,
  stat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { createServer, type Server } from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { prepareOnlineRelease } from "../src/compiler/online-release.js";
import { consumerResultSchemas } from "../src/domain/consumer.js";
import type { OnlineResource } from "../src/domain/online.js";
import type { Topic } from "../src/domain/schema.js";
import { npmCli, runNode } from "./consumer-process.js";

const project = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const artifactDirectory = path.join(project, "var/consumer-package");
const consumerRoot = path.join(project, "packages/consumer");
const dataPrefix = "/data/v1/";
const programVersion = (
  JSON.parse(readFileSync(path.join(consumerRoot, "package.json"), "utf8")) as {
    version: string;
  }
).version;
const toolNames = [
  "list_harnesses",
  "get_topic",
  "search_knowledge",
  "compare_topics",
  "get_source",
];

type Json = Record<string, unknown>;
interface Check {
  name: string;
  status: "passed" | "failed";
  detail?: string;
}
const checks: Check[] = [];
const failures: string[] = [];

const messageOf = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);
/** Bounded diagnostic: Zod issues become "path: message" pairs. */
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
  return messageOf(error).slice(0, 500);
}
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const sha1 = (bytes: Buffer): string =>
  createHash("sha1").update(bytes).digest("hex");
const integrityOf = (bytes: Buffer): string =>
  `sha512-${createHash("sha512").update(bytes).digest("base64")}`;

async function check(
  name: string,
  work: () => Promise<string | void> | string | void,
): Promise<void> {
  try {
    const detail = await work();
    checks.push(
      detail ? { name, status: "passed", detail } : { name, status: "passed" },
    );
  } catch (error) {
    checks.push({ name, status: "failed", detail: brief(error) });
    failures.push(name);
  }
}

async function closeServer(server: Server): Promise<void> {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
}

// --- controlled static data server ------------------------------------------

interface StaticServer {
  origin: string;
  delays: Map<string, number>;
  missing: Set<string>;
  requests: Map<string, number>;
  aborts: Map<string, number>;
  settle(pathname: string): Promise<void>;
  waitForRequest(pathname: string, atLeast: number): Promise<void>;
  close(): Promise<void>;
}

async function startStaticServer(
  files: Map<string, Buffer>,
): Promise<StaticServer> {
  const delays = new Map<string, number>();
  const missing = new Set<string>();
  const requests = new Map<string, number>();
  const aborts = new Map<string, number>();
  const bump = (map: Map<string, number>, key: string): void =>
    void map.set(key, (map.get(key) ?? 0) + 1);
  const server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(
      new URL(request.url ?? "/", "http://127.0.0.1").pathname,
    );
    bump(requests, pathname);
    request.once("aborted", () => bump(aborts, pathname));
    response.once("close", () => {
      if (!response.writableEnded) bump(aborts, pathname);
    });
    const delay = delays.get(pathname) ?? 0;
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    const body = missing.has(pathname) ? undefined : files.get(pathname);
    response.writeHead(
      body ? 200 : 404,
      body ? { "content-type": "application/json" } : {},
    );
    response.end(body);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("static server did not bind");
  return {
    origin: `http://127.0.0.1:${address.port}`,
    delays,
    missing,
    requests,
    aborts,
    settle: async (pathname) => {
      for (let attempt = 0; attempt < 40 && !aborts.get(pathname); attempt += 1)
        await new Promise((resolve) => setTimeout(resolve, 50));
    },
    waitForRequest: async (pathname, atLeast) => {
      for (
        let attempt = 0;
        attempt < 200 && (requests.get(pathname) ?? 0) < atLeast;
        attempt += 1
      )
        await new Promise((resolve) => setTimeout(resolve, 10));
      assert(
        (requests.get(pathname) ?? 0) >= atLeast,
        `request to ${pathname} did not start`,
      );
    },
    close: () => closeServer(server),
  };
}

// --- controlled local npm registry ------------------------------------------

interface RegistryVersion {
  metadata: Json;
  tarballName: string;
  bytes: Buffer;
  files: string[];
}
interface RegistryServer {
  url: string;
  close(): Promise<void>;
}

async function startRegistryServer(
  versions: Map<string, RegistryVersion[]>,
): Promise<RegistryServer> {
  const documents: Json = {};
  const tarballs = new Map<string, Buffer>();
  for (const [name, list] of versions) {
    documents[name] = {
      name,
      "dist-tags": { latest: String(list[list.length - 1]!.metadata.version) },
      versions: Object.fromEntries(
        list.map((entry) => [String(entry.metadata.version), entry.metadata]),
      ),
    };
    for (const entry of list)
      tarballs.set(`${name}/-/${entry.tarballName}`, entry.bytes);
  }
  const server = createServer((request, response) => {
    const key = decodeURIComponent(
      new URL(request.url ?? "/", "http://127.0.0.1").pathname,
    ).replace(/^\//, "");
    const body = key.endsWith(".tgz")
      ? tarballs.get(key)
      : JSON.stringify(documents[key] ?? null);
    const found = key.endsWith(".tgz") ? body : documents[key] !== undefined;
    response.writeHead(found ? 200 : 404, {
      "content-type": key.endsWith(".tgz")
        ? "application/octet-stream"
        : "application/json",
    });
    response.end(found ? body : undefined);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("registry did not bind");
  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => closeServer(server),
  };
}

// --- installed dependency closure -------------------------------------------

interface InstalledPackage {
  name: string;
  version: string;
  directory: string;
  json: Json;
}

/** Resolve an installed package root even when package.json is not exported. */
function locatePackage(from: string, name: string): InstalledPackage {
  const require = createRequire(path.join(from, "package.json"));
  let resolved: string;
  try {
    resolved = require.resolve(`${name}/package.json`);
  } catch {
    resolved = require.resolve(name);
  }
  let directory = path.dirname(resolved);
  for (;;) {
    try {
      const json = JSON.parse(
        readFileSync(path.join(directory, "package.json"), "utf8"),
      ) as Json;
      if (json.name === name)
        return { name, version: String(json.version), directory, json };
    } catch {
      // Keep walking up until a matching package.json appears.
    }
    const parent = path.dirname(directory);
    if (parent === directory) throw new Error(`Cannot locate ${name}`);
    directory = parent;
  }
}

function collectClosure(root: string): InstalledPackage[] {
  const manifest = JSON.parse(
    readFileSync(path.join(root, "package.json"), "utf8"),
  ) as {
    dependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
  };
  const found = new Map<string, InstalledPackage>();
  const walk = (from: string, name: string, required: boolean): void => {
    let pkg: InstalledPackage;
    try {
      pkg = locatePackage(from, name);
    } catch (error) {
      if (required)
        throw new Error(
          `Cannot resolve installed dependency ${name} from ${from}: ${messageOf(error)}`,
        );
      return;
    }
    if (found.has(`${pkg.name}@${pkg.version}`)) return;
    found.set(`${pkg.name}@${pkg.version}`, pkg);
    for (const dependency of Object.keys(
      (pkg.json.dependencies as Record<string, string> | undefined) ?? {},
    ))
      walk(pkg.directory, dependency, true);
    for (const dependency of Object.keys(
      (pkg.json.optionalDependencies as Record<string, string> | undefined) ??
        {},
    ))
      walk(pkg.directory, dependency, false);
  };
  for (const name of Object.keys(manifest.dependencies ?? {}))
    walk(root, name, true);
  for (const name of Object.keys(manifest.optionalDependencies ?? {}))
    walk(root, name, false);
  return [...found.values()];
}

async function packDependencies(
  installed: InstalledPackage[],
  output: string,
  npm: string,
  env: Record<string, string>,
): Promise<Map<string, RegistryVersion[]>> {
  const versions = new Map<string, RegistryVersion[]>();
  for (const pkg of installed) {
    // npm excludes tar hardlinks when installing; pnpm's store can share inodes.
    const staging = await mkdtemp(path.join(output, "package-"));
    await cp(pkg.directory, staging, { recursive: true });
    const packed = (
      JSON.parse(
        await runNode(
          [
            npm,
            "pack",
            "--json",
            "--ignore-scripts",
            "--pack-destination",
            output,
            staging,
          ],
          project,
          env,
        ),
      ) as { filename: string; files?: { path: string }[] }[]
    )[0];
    assert(packed, `npm pack produced no output for ${pkg.name}`);
    const bytes = await readFile(path.join(output, packed.filename));
    const list = versions.get(pkg.name) ?? [];
    list.push({
      metadata: {
        ...pkg.json,
        dist: {
          tarball: "",
          integrity: integrityOf(bytes),
          shasum: sha1(bytes),
        },
      },
      tarballName: packed.filename,
      bytes,
      files: (packed.files ?? []).map((file) => file.path),
    });
    versions.set(pkg.name, list);
  }
  return versions;
}

// --- online release fixture --------------------------------------------------

interface Deployment {
  releaseId: string;
  files: Map<string, Buffer>;
  resources: Map<string, OnlineResource>;
}

function gitIn(directory: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(
      "git",
      ["-C", directory, ...args],
      { maxBuffer: 64 * 1024 * 1024 },
      (error, stdout) => (error ? reject(error) : resolve(stdout)),
    );
  });
}

async function buildDeployment(): Promise<Deployment> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-consumer-release-"));
  try {
    const datasetRoot = path.join(root, "dataset");
    await cp(
      path.join(project, "tests/fixtures/datasets/chapters"),
      datasetRoot,
      {
        recursive: true,
      },
    );
    await gitIn(datasetRoot, ["init", "-q"]);
    await gitIn(datasetRoot, ["add", "."]);
    await gitIn(datasetRoot, [
      "-c",
      "user.name=verify",
      "-c",
      "user.email=verify@example.invalid",
      "commit",
      "-qm",
      "fixture",
    ]);
    const commit = (await gitIn(datasetRoot, ["rev-parse", "HEAD"])).trim();
    const prepared = await prepareOnlineRelease({
      datasetRoot,
      profile: "fixture",
      commit,
      publishedAt: "2026-10-02T00:00:00Z",
      base: "/",
    });
    const prefix = `${dataPrefix}releases/${prepared.releaseId}/`;
    const files = new Map<string, Buffer>();
    for (const [relative, resource] of prepared.resources)
      files.set(prefix + relative, Buffer.from(JSON.stringify(resource)));
    files.set(
      `${dataPrefix}current.json`,
      Buffer.from(
        JSON.stringify({
          protocol_version: 1,
          state: "active",
          release_id: prepared.releaseId,
          manifest: `releases/${prepared.releaseId}/manifest.json`,
        }),
      ),
    );
    return {
      releaseId: prepared.releaseId,
      files,
      resources: prepared.resources,
    };
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

interface QueryInputs {
  harness: string;
  topic: Topic;
  surface: string;
  compareTargets: { harness: string; surface_id: string }[];
  searchText: string;
  sourceIds: string[];
}

function deriveInputs(resources: Map<string, OnlineResource>): QueryInputs {
  const catalog = resources.get("catalog.json");
  if (catalog?.resource_kind !== "catalog")
    throw new Error("fixture catalog is missing");
  const products = catalog.products;
  const owners = (topic: Topic) =>
    products.filter(
      (product) => product.topics.includes(topic) && product.surfaces[0],
    );
  const pair = products
    .flatMap((product) => product.topics.map((topic) => ({ product, topic })))
    .find(
      ({ product, topic }) => owners(topic).length >= 2 && product.surfaces[0],
    );
  const product = pair?.product ?? products.find((entry) => entry.surfaces[0]);
  const topic = pair?.topic ?? product?.topics[0];
  const surface = product?.surfaces[0];
  if (!product || !topic || !surface)
    throw new Error("fixture has no listable product");
  const chosen = {
    harness: product.harness_id,
    topic,
    surface: surface.surface_id,
  };
  const topicResource = resources.get(
    `topics/${chosen.harness}/${chosen.topic}/index.json`,
  );
  if (topicResource?.resource_kind !== "topic")
    throw new Error("fixture topic is missing");
  const chapter = resources.get(`chapters/${topicResource.current}.json`);
  if (chapter?.resource_kind !== "chapter")
    throw new Error("fixture chapter is missing");
  const heading = /^##\s+(.+?)(?:\s+\{#|\s*$)/m.exec(chapter.chapter.body);
  const sourceIds = [...resources.keys()]
    .filter((key) => /^sources\/[^/]+\.json$/.test(key))
    .map((key) => key.slice("sources/".length, -".json".length));
  assert(sourceIds.length > 0, "fixture has no source resource");
  return {
    ...chosen,
    compareTargets: owners(chosen.topic)
      .slice(0, 2)
      .map((owner) => ({
        harness: owner.harness_id,
        surface_id: owner.surfaces[0]!.surface_id,
      })),
    searchText:
      /[\p{L}\p{N}]{4,}/u.exec(heading?.[1] ?? chapter.chapter.title)?.[0] ??
      chapter.chapter.title,
    sourceIds,
  };
}

function isolatedEnvironment(
  base: string,
  registry: string,
  prefix: string,
): Record<string, string> {
  const home = path.join(base, "home with spaces");
  const executionVariables = new Set([
    "PATH",
    "PATHEXT",
    "SYSTEMROOT",
    "WINDIR",
    "COMSPEC",
    "TMP",
    "TEMP",
    "TMPDIR",
    "LANG",
    "LC_ALL",
    "TZ",
    "TERM",
    "COLORTERM",
    "CI",
    "NO_COLOR",
    "FORCE_COLOR",
    "LD_LIBRARY_PATH",
    "DYLD_LIBRARY_PATH",
  ]);
  return {
    ...Object.fromEntries(
      Object.entries(process.env).filter(
        (entry): entry is [string, string] =>
          entry[1] !== undefined &&
          executionVariables.has(entry[0].toUpperCase()),
      ),
    ),
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
}

// --- main --------------------------------------------------------------------

async function main(): Promise<void> {
  const started = new Date().toISOString();
  const manifest = JSON.parse(
    await readFile(path.join(artifactDirectory, "manifest.json"), "utf8"),
  ) as {
    filename: string;
    size: number;
    unpackedSize: number;
    files: unknown[];
  };
  const tgz = path.join(artifactDirectory, manifest.filename);
  assert((await lstat(tgz)).isFile(), `Consumer tgz is missing: ${tgz}`);

  const npm = await npmCli();
  const base = await mkdtemp(path.join(tmpdir(), "ahw-consumer verify "));
  const prefix = path.join(base, "install prefix");
  const dependencyDirectory = path.join(base, "dependency tarballs");
  await mkdir(dependencyDirectory, { recursive: true });
  await mkdir(prefix, { recursive: true });
  await writeFile(path.join(base, "user.npmrc"), "");
  await writeFile(path.join(base, "global.npmrc"), "");

  const report: Json = {
    program_version: programVersion,
    package: {
      filename: manifest.filename,
      size: manifest.size,
      unpacked_size: manifest.unpackedSize,
      file_count: manifest.files.length,
    },
    environment: {
      platform: process.platform,
      arch: process.arch,
      node: process.version,
      icu: process.versions.icu ?? null,
      npm: null,
      paths_with_spaces: true,
    },
    mcp: { tools: toolNames },
    result: "failed",
    started_at: started,
  };

  let registry: RegistryServer | undefined;
  let data: StaticServer | undefined;
  try {
    let env = isolatedEnvironment(base, "http://127.0.0.1:0", prefix);
    (report.environment as Json).npm = (
      await runNode([npm, "--version"], project, env)
    ).trim();

    const closure = await packDependencies(
      collectClosure(consumerRoot),
      dependencyDirectory,
      npm,
      env,
    );
    registry = await startRegistryServer(closure);
    for (const [name, list] of closure)
      for (const entry of list)
        (entry.metadata.dist as Json).tarball = new URL(
          `/${name}/-/${entry.tarballName}`,
          registry.url,
        ).href;
    env = isolatedEnvironment(base, registry.url, prefix);
    report.registry = {
      packages: [...closure].map(([name, list]) => ({
        name,
        versions: list.map((entry) => String(entry.metadata.version)),
        bytes: list.reduce((sum, entry) => sum + entry.bytes.length, 0),
      })),
    };

    const deployment = await buildDeployment();
    data = await startStaticServer(deployment.files);
    const dataUrl = `${data.origin}${dataPrefix}`;
    const inputs = deriveInputs(deployment.resources);
    const sourcePath = (id: string) =>
      `${dataPrefix}releases/${deployment.releaseId}/sources/${id}.json`;

    await check("install external tgz from controlled registry", async () => {
      await writeFile(
        path.join(prefix, "package.json"),
        JSON.stringify({
          name: "consumer-verification",
          version: "0.0.0",
          private: true,
        }),
      );
      await runNode(
        [
          npm,
          "install",
          "--prefix",
          prefix,
          "--registry",
          registry!.url,
          "--no-audit",
          "--no-fund",
          "--ignore-scripts",
          tgz,
        ],
        prefix,
        env,
      );
      const installed = JSON.parse(
        await readFile(
          path.join(prefix, "node_modules/agent-harness-wiki/package.json"),
          "utf8",
        ),
      ) as { version: string };
      assert(
        installed.version === programVersion,
        `installed ${installed.version}`,
      );
      return `agent-harness-wiki@${installed.version} outside the source tree`;
    });

    await check(
      "dependency closure and installed tree have no native modules",
      async () => {
        const native = [
          ...[...closure.values()]
            .flat()
            .flatMap((entry) => entry.files)
            .filter(
              (file) => file.endsWith(".node") || file.endsWith("binding.gyp"),
            ),
          ...(
            await readdir(path.join(prefix, "node_modules"), {
              recursive: true,
            })
          ).filter(
            (file) => file.endsWith(".node") || file.endsWith("binding.gyp"),
          ),
        ];
        assert(
          native.length === 0,
          `native artifacts: ${native.slice(0, 5).join(", ")}`,
        );
        (report.registry as Json).native_absent = true;
        return `${closure.size} packages`;
      },
    );

    const execArgs = [npm, "exec", "--prefix", prefix, "--", "ahw"];
    const directArgs = [
      path.join(
        prefix,
        "node_modules/agent-harness-wiki/dist/consumer/index.js",
      ),
    ];
    await check("installed bin runs directly", async () => {
      const version = (
        await runNode([...directArgs, "--version"], prefix, env)
      ).trim();
      assert(version === programVersion, `installed bin version ${version}`);
      return "dist/consumer/index.js";
    });
    await check("npm exec resolves the installed ahw bin", async () => {
      const version = (
        await runNode([...execArgs, "--version"], prefix, env)
      ).trim();
      assert(version === programVersion, `npm exec version ${version}`);
      return "npm exec --prefix";
    });
    await check(
      "npx installs and runs the tgz from a fresh directory",
      async () => {
        const npx = path.join(path.dirname(npm), "npx-cli.js");
        assert((await lstat(npx)).isFile(), `npx CLI is missing: ${npx}`);
        const runDirectory = await mkdtemp(path.join(base, "npx run "));
        const output = (
          await runNode(
            [npx, "--yes", "--package", tgz, "--", "ahw", "--version"],
            runDirectory,
            env,
          )
        ).trim();
        assert(output === programVersion, `npx version ${output}`);
        return "npx-cli.js --package <tgz>";
      },
    );
    report.cli = { launch: "npm exec" };

    const runAhw = (args: string[], expected = 0) =>
      runNode([...execArgs, ...args], prefix, env, expected);
    const query = (args: string[]): string[] => [
      "--data-url",
      dataUrl,
      "--no-file-cache",
      "--json",
      "query",
      ...args,
    ];

    await check("help and version need no published site", async () => {
      assert(
        (await runAhw(["--version"])).trim() === programVersion,
        "ahw version differs",
      );
      await runAhw(["--help"]);
    });
    await check("rejects maintainer commands", async () => {
      for (const command of [
        ["validate"],
        ["compile"],
        ["publish"],
        ["query", "capability"],
      ])
        await runAhw(command, 1);
    });

    await check(
      "init requires confirmation and creates nothing beforehand",
      async () => {
        const result = JSON.parse(
          await runAhw(["--json", "init", "--tools", "codex,claude-code"], 1),
        ) as { error: { code: string } };
        assert(
          result.error.code === "confirmation_required",
          "non-TTY init did not require confirmation",
        );
        for (const target of [
          path.join(prefix, ".codex"),
          path.join(prefix, ".mcp.json"),
        ]) {
          let exists = false;
          try {
            await stat(target);
            exists = true;
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
          }
          assert(!exists, `init wrote before confirmation: ${target}`);
        }
      },
    );
    await check(
      "installed init configures project MCP without knowledge access",
      async () => {
        const before = [...data!.requests.values()].reduce(
          (sum, count) => sum + count,
          0,
        );
        const result = JSON.parse(
          await runAhw([
            "--json",
            "--data-url",
            "http://127.0.0.1:1/data/v1/",
            "--offline",
            "--cache-dir",
            "demo cache",
            "--no-file-cache",
            "init",
            "--tools",
            "Codex,claude-code",
            "-y",
          ]),
        ) as { status: string; plan: { scope: string } };
        assert(
          result.status === "configured" && result.plan.scope === "project",
          "init did not apply project plan",
        );
        const config = JSON.parse(
          await readFile(path.join(prefix, ".mcp.json"), "utf8"),
        ) as {
          mcpServers: Record<string, { command: string; args: string[] }>;
        };
        const entry = config.mcpServers["agent-harness-wiki"]!;
        assert(entry.command === "npx", "unexpected MCP launcher");
        assert(
          entry.args.includes("agent-harness-wiki") &&
            !entry.args.some((arg) => arg.startsWith("agent-harness-wiki@")),
          "init pinned the npm package",
        );
        assert(
          entry.args.includes(path.join(prefix, "demo cache")),
          "relative cache directory was not resolved",
        );
        assert(
          entry.args.includes("--offline") &&
            entry.args.includes("--no-file-cache"),
          "runtime options were lost",
        );
        assert(
          (
            await readFile(path.join(prefix, ".codex", "config.toml"), "utf8")
          ).includes("agent-harness-wiki"),
          "Codex TOML was not configured",
        );
        assert(
          [...data!.requests.values()].reduce(
            (sum, count) => sum + count,
            0,
          ) === before,
          "init accessed knowledge",
        );
      },
    );
    await check(
      "installed init is idempotent and supports global scope",
      async () => {
        const repeated = JSON.parse(
          await runAhw([
            "--json",
            "--data-url",
            "http://127.0.0.1:1/data/v1/",
            "--offline",
            "--cache-dir",
            "demo cache",
            "--no-file-cache",
            "init",
            "--tools",
            "codex,claude-code",
            "--yes",
          ]),
        ) as { status: string; backups: string[] };
        assert(
          repeated.status === "unchanged" && repeated.backups.length === 0,
          "repeated init changed configuration",
        );
        const global = JSON.parse(
          await runAhw([
            "--json",
            "init",
            "--tools",
            "codex",
            "--global",
            "-y",
          ]),
        ) as { status: string; plan: { scope: string } };
        assert(
          global.status === "configured" && global.plan.scope === "global",
          "global init failed",
        );
        assert(
          (
            await readFile(
              path.join(env.HOME!, ".codex", "config.toml"),
              "utf8",
            )
          ).includes("agent-harness-wiki"),
          "global configuration escaped isolated home",
        );
      },
    );

    const cliResults: Record<string, unknown> = {};
    const cliCases: {
      key: string;
      name: string;
      args: string[];
      schema: { parse(value: unknown): unknown };
    }[] = [
      {
        key: "list_harnesses",
        name: "CLI list",
        args: query(["list"]),
        schema: consumerResultSchemas.list_harnesses,
      },
      {
        key: "get_topic",
        name: "CLI topic",
        args: query([
          "topic",
          "--harness",
          inputs.harness,
          "--topic",
          inputs.topic,
          "--surface-id",
          inputs.surface,
        ]),
        schema: consumerResultSchemas.get_topic,
      },
      {
        key: "search_knowledge",
        name: "CLI search",
        args: query([
          "search",
          "--text",
          inputs.searchText,
          "--harness",
          inputs.harness,
          "--topic",
          inputs.topic,
        ]),
        schema: consumerResultSchemas.search_knowledge,
      },
      {
        key: "compare_topics",
        name: "CLI compare",
        args: query([
          "compare",
          "--topic",
          inputs.topic,
          "--targets",
          JSON.stringify(inputs.compareTargets),
        ]),
        schema: consumerResultSchemas.compare_topics,
      },
      {
        key: "get_source",
        name: "CLI source",
        args: query(["source", "--reference-id", inputs.sourceIds[1]!]),
        schema: consumerResultSchemas.get_source,
      },
    ];
    for (const entry of cliCases)
      await check(entry.name, async () => {
        const parsed = entry.schema.parse(
          JSON.parse(await runAhw(entry.args)),
        ) as { release_id?: unknown };
        assert(
          parsed.release_id === deployment.releaseId,
          `${entry.name} release id differs`,
        );
        cliResults[entry.key] = parsed;
      });

    await check("CLI technical error is structured and nonzero", async () => {
      const parsed = consumerResultSchemas.error.parse(
        JSON.parse(
          await runAhw(
            [
              "--data-url",
              "http://127.0.0.1:1/data/v1/",
              "--no-file-cache",
              "--json",
              "query",
              "list",
            ],
            1,
          ),
        ),
      );
      assert(parsed.error.code.length > 0, "CLI error has no code");
    });
    await check("CLI offline miss is offline_cache_miss", async () => {
      const options = ["--offline", "--no-file-cache", "--json"];
      for (const args of [
        [...options, "query", "list"],
        ["query", ...options, "list"],
        ["query", "list", ...options],
      ]) {
        const parsed = consumerResultSchemas.error.parse(
          JSON.parse(await runAhw(args, 1)),
        );
        assert(
          parsed.error.code === "offline_cache_miss",
          `offline ${parsed.error.code}`,
        );
      }
    });

    await check(
      "CLI invalid input is rejected before knowledge access",
      async () => {
        const parsed = consumerResultSchemas.error.parse(
          JSON.parse(await runAhw(query(["list", "--limit", "21"]), 1)),
        );
        assert(
          parsed.error.code === "invalid_input",
          "CLI accepted invalid limit",
        );
      },
    );

    await check(
      "CLI file cache supports offline reads without HTTP",
      async () => {
        const args = [
          "--data-url",
          dataUrl,
          "--cache-dir",
          path.join(base, "knowledge cache"),
          "--json",
          "query",
          "topic",
          "--harness",
          inputs.harness,
          "--topic",
          inputs.topic,
          "--surface-id",
          inputs.surface,
        ];
        const online = consumerResultSchemas.get_topic.parse(
          JSON.parse(await runAhw(args)),
        );
        const before = [...data!.requests];
        const offline = consumerResultSchemas.get_topic.parse(
          JSON.parse(await runAhw(["--offline", ...args])),
        );
        deepStrictEqual(offline, { ...online, access_mode: "offline" });
        deepStrictEqual(
          [...data!.requests],
          before,
          "offline made an HTTP request",
        );
      },
    );

    // --- MCP over the real SDK ---
    const transport = new StdioClientTransport({
      command: process.execPath,
      args: [...execArgs, "--data-url", dataUrl, "--no-file-cache", "mcp"],
      env,
      cwd: prefix,
      stderr: "pipe",
    });
    const client = new Client({
      name: "ahw-consumer-verify",
      version: programVersion,
    });
    const mcpCall = async (name: string, args: Json) => {
      const result = await client.callTool({ name, arguments: args });
      assert(!result.isError, `${name} returned isError`);
      return result.structuredContent;
    };
    try {
      await client.connect(transport);
      await check("MCP serverInfo version", async () => {
        assert(
          client.getServerVersion()?.version === programVersion,
          "serverInfo differs",
        );
      });
      await check("MCP exposes exactly the five read-only tools", async () => {
        const tools = (await client.listTools()).tools;
        deepStrictEqual(
          tools.map((tool) => tool.name).sort(),
          [...toolNames].sort(),
          "MCP tools differ",
        );
        for (const tool of tools)
          assert(
            tool.annotations?.readOnlyHint === true,
            `${tool.name} is not read-only`,
          );
      });
      await check("MCP exposes no Resources or Prompts", async () => {
        const capabilities = client.getServerCapabilities();
        assert(!capabilities?.resources, "server advertised resources");
        assert(!capabilities?.prompts, "server advertised prompts");
      });
      await check("MCP list equals CLI list", async () => {
        deepStrictEqual(
          consumerResultSchemas.list_harnesses.parse(
            await mcpCall("list_harnesses", {}),
          ),
          cliResults.list_harnesses,
          "MCP and CLI list results differ",
        );
      });
      await check(
        "MCP topic, search and compare equal CLI results",
        async () => {
          deepStrictEqual(
            consumerResultSchemas.get_topic.parse(
              await mcpCall("get_topic", {
                harness: inputs.harness,
                topic: inputs.topic,
                surface_id: inputs.surface,
              }),
            ),
            cliResults.get_topic,
            "MCP and CLI get_topic results differ",
          );
          deepStrictEqual(
            consumerResultSchemas.search_knowledge.parse(
              await mcpCall("search_knowledge", {
                text: inputs.searchText,
                harness: inputs.harness,
                topic: inputs.topic,
              }),
            ),
            cliResults.search_knowledge,
            "MCP and CLI search_knowledge results differ",
          );
          deepStrictEqual(
            consumerResultSchemas.compare_topics.parse(
              await mcpCall("compare_topics", {
                topic: inputs.topic,
                targets: inputs.compareTargets,
              }),
            ),
            cliResults.compare_topics,
            "MCP and CLI compare_topics results differ",
          );
        },
      );
      await check(
        "MCP declared-but-missing source is a technical error",
        async () => {
          const id = inputs.sourceIds[1];
          assert(id, "fixture needs a second source id");
          data!.missing.add(sourcePath(id));
          try {
            const result = await client.callTool({
              name: "get_source",
              arguments: { reference_id: id },
            });
            assert(
              result.isError === true,
              "missing declared source was not isError",
            );
            const parsed = consumerResultSchemas.error.parse(
              result.structuredContent,
            );
            assert(
              parsed.error.code === "release_resource_missing",
              `missing source code ${parsed.error.code}`,
            );
          } finally {
            data!.missing.delete(sourcePath(id));
          }
        },
      );
      await check("MCP rejects invalid input without exiting", async () => {
        let rejected = false;
        try {
          rejected =
            (await client.callTool({ name: "get_topic", arguments: {} }))
              .isError === true;
        } catch {
          rejected = true;
        }
        assert(rejected, "invalid input was accepted");
        consumerResultSchemas.list_harnesses.parse(
          await mcpCall("list_harnesses", { limit: 1 }),
        );
      });
      await check(
        "MCP cancellation stops the in-flight HTTP read",
        async () => {
          const id = inputs.sourceIds[1];
          assert(id, "fixture needs a second source id");
          const target = sourcePath(id);
          const before = data!.requests.get(target) ?? 0;
          data!.delays.set(target, 1_500);
          const controller = new AbortController();
          const pending = client.callTool(
            { name: "get_source", arguments: { reference_id: id } },
            { signal: controller.signal },
          );
          await data!.waitForRequest(target, before + 1);
          controller.abort();
          let cancelled = false;
          try {
            cancelled = (await pending).isError === true;
          } catch {
            cancelled = true;
          }
          data!.delays.delete(target);
          assert(cancelled, "cancelled call did not stop");
          await data!.settle(target);
          assert(
            (data!.aborts.get(target) ?? 0) > 0,
            "HTTP read was not aborted",
          );
          assert(
            (data!.requests.get(target) ?? 0) === before + 1,
            "cancelled read was retried",
          );
          deepStrictEqual(
            consumerResultSchemas.get_source.parse(
              await mcpCall("get_source", { reference_id: id }),
            ),
            cliResults.get_source,
            "MCP and CLI get_source results differ",
          );
        },
      );
    } finally {
      await client.close().catch(() => {});
      await transport.close().catch(() => {});
    }

    await check("MCP disconnect stops the in-flight HTTP read", async () => {
      const id = inputs.sourceIds[1];
      assert(id, "fixture needs a second source id");
      const target = sourcePath(id);
      const before = data!.requests.get(target) ?? 0;
      data!.delays.set(target, 2_000);
      const peer = new StdioClientTransport({
        command: process.execPath,
        args: [...directArgs, "--data-url", dataUrl, "--no-file-cache", "mcp"],
        env,
        cwd: prefix,
        stderr: "pipe",
      });
      const peerClient = new Client({
        name: "ahw-consumer-verify-disconnect",
        version: programVersion,
      });
      try {
        await peerClient.connect(peer);
        const pending = peerClient
          .callTool({ name: "get_source", arguments: { reference_id: id } })
          .then(
            () => "settled",
            () => "settled",
          );
        await data!.waitForRequest(target, before + 1);
        await peerClient.close().catch(() => {});
        const outcome = await Promise.race([
          pending,
          new Promise<string>((resolve) =>
            setTimeout(() => resolve("timeout"), 5_000),
          ),
        ]);
        data!.delays.delete(target);
        assert(outcome !== "timeout", "in-flight call did not settle");
        await data!.settle(target);
        assert(
          (data!.aborts.get(target) ?? 0) > 0,
          "HTTP read was not aborted",
        );
        assert(
          (data!.requests.get(target) ?? 0) === before + 1,
          "disconnected read was retried",
        );
      } finally {
        await peerClient.close().catch(() => {});
        await peer.close().catch(() => {});
      }
    });
  } catch (error) {
    checks.push({
      name: "verification harness",
      status: "failed",
      detail: brief(error),
    });
    failures.push("verification harness");
    report.error = brief(error);
  } finally {
    report.checks = checks;
    report.result = failures.length ? "failed" : "passed";
    report.failures = failures;
    report.platforms = {
      [`${process.platform}-${process.arch}-node${process.version}`]:
        failures.length ? "failed" : "passed",
    };
    report.scope =
      "Current runner environment only; other matrix combinations are recorded by their own runner.";
    report.finished_at = new Date().toISOString();
    await mkdir(artifactDirectory, { recursive: true });
    await writeFile(
      path.join(artifactDirectory, "verification.json"),
      `${JSON.stringify(report, null, 2)}\n`,
    );
    await data?.close().catch(() => {});
    await registry?.close().catch(() => {});
    await rm(base, { recursive: true, force: true });
  }
  for (const entry of checks)
    process.stdout.write(
      `${entry.status.padEnd(7)} ${entry.name}${entry.detail ? ` - ${entry.detail}` : ""}\n`,
    );
  if (failures.length) {
    process.stderr.write(
      `Consumer verification failed: ${failures.join(", ")}\n`,
    );
    process.exitCode = 1;
  } else {
    process.stdout.write("Consumer verification passed.\n");
  }
}

await main();
