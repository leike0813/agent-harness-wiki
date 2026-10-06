import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { x as extract } from "tar";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { buildOnlineSite } from "../../src/compiler/online-site.js";
import {
  installExactConsumerPackage,
  runPublicConsumerVerification,
  type ConsumerProcess,
} from "../../src/publication/consumer-verification.js";
import { requiredPublicChecks } from "../../src/publication/program.js";
import {
  readPublishedPointer,
  verifyPublishedSite,
} from "../../src/publication/readback.js";
import { npmCli, runNode } from "../../scripts/consumer-process.js";

const exec = promisify(execFile);
const fixture = path.resolve("tests/fixtures/datasets/chapters");
const publishedAt = "2026-10-02T00:00:00Z";

let root: string;
let releaseId: string;
let dataUrl: string;
let server: Server;
const missing = new Set<string>();
const delays = new Map<string, number>();
let stalePointerReads = 0;

async function staticServer(directory: string): Promise<Server> {
  const server = createServer(async (request, response) => {
    const relative = decodeURIComponent(
      new URL(request.url ?? "/", "http://127.0.0.1").pathname,
    ).replace(/^\//, "");
    const delay = delays.get(relative);
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    if (missing.has(relative)) {
      response.writeHead(404).end();
      return;
    }
    if (relative === "data/v1/current.json" && stalePointerReads > 0) {
      stalePointerReads -= 1;
      const id = `web-v1-${"b".repeat(40)}`;
      response.end(
        JSON.stringify({
          protocol_version: 1,
          state: "active",
          release_id: id,
          manifest: `releases/${id}/manifest.json`,
        }),
      );
      return;
    }
    try {
      const body = await readFile(path.join(directory, relative));
      response.writeHead(200, {
        "content-type": relative.endsWith(".html")
          ? "text/html; charset=utf-8"
          : "application/json",
      });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  return server;
}

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-readback-"));
  const datasetRoot = path.join(root, "dataset");
  await cp(fixture, datasetRoot, { recursive: true });
  const git = (args: string[]) => exec("git", ["-C", datasetRoot, ...args]);
  await git(["init", "-q"]);
  await git(["add", "."]);
  await git([
    "-c",
    "user.name=test",
    "-c",
    "user.email=test@example.invalid",
    "commit",
    "-qm",
    "fixture",
  ]);
  const commit = (await git(["rev-parse", "HEAD"])).stdout.trim();
  const outDir = path.join(root, "deployment");
  await buildOnlineSite({
    datasetRoot,
    profile: "fixture",
    commit,
    publishedAt,
    base: "/",
    outDir,
  });
  releaseId = `web-v1-${commit}`;
  server = await staticServer(outDir);
  const { port } = server.address() as AddressInfo;
  dataUrl = `http://127.0.0.1:${port}/data/v1/`;
}, 120_000);

afterAll(async () => {
  await new Promise<void>((resolve) => server?.close(() => resolve()));
  if (root) await rm(root, { recursive: true, force: true });
});

test("confirms a complete release and derives section-scoped inputs", async () => {
  const report = await verifyPublishedSite({ dataUrl });
  expect(report.result).toBe("passed");
  expect(report.release_id).toBe(releaseId);
  expect(report.access_mode).toBe("online");
  expect(report.knowledge_published_at).toBe(publishedAt);
  expect(report.failures).toEqual([]);
  expect(report.checks.map((check) => check.name)).toEqual(
    expect.arrayContaining([
      "public pointer",
      "open release",
      "release navigation",
      "list",
      "search",
      "topic",
      "compare",
      "source",
      "reader pages",
    ]),
  );
  const inputs = report.inputs;
  expect(inputs).not.toBeNull();
  expect(inputs!.harness).toBeTruthy();
  expect(inputs!.section_id).toBeTruthy();
  expect(inputs!.surface_id).toBeTruthy();
  expect(inputs!.reference_id).toMatch(/^[a-z][a-z0-9_-]*$/);
  expect(inputs!.compare_targets).toHaveLength(2);
  expect(inputs!.search_text.length).toBeGreaterThan(0);
  expect(report.pages).toHaveLength(3);
  expect(report.pages.every((page) => page.status === 200)).toBe(true);
});

test("reads the published pointer independently", async () => {
  const pointer = await readPublishedPointer({ dataUrl });
  expect(pointer).toMatchObject({ state: "active", release_id: releaseId });
});

test("reports a failed probe with the actual target when the expected release differs", async () => {
  const report = await verifyPublishedSite({
    dataUrl,
    expectedReleaseId: `web-v1-${"b".repeat(40)}`,
  });
  expect(report.result).toBe("failed");
  expect(report.failures).toContain("expected release");
  expect(report.release_id).toBe(releaseId);
});

test("confirms the expected deployment after a stale public pointer settles", async () => {
  stalePointerReads = 1;
  try {
    const report = await verifyPublishedSite({
      dataUrl,
      expectedReleaseId: releaseId,
    });
    expect(report.result).toBe("passed");
    expect(report.release_id).toBe(releaseId);
    expect(report.failures).toEqual([]);
  } finally {
    stalePointerReads = 0;
  }
});

test("fails when a matching reader page lacks the release identity", async () => {
  const first = await verifyPublishedSite({ dataUrl });
  const inputs = first.inputs!;
  const target = `harnesses/${inputs.harness}/${inputs.topic}.html`;
  missing.add(target);
  try {
    const report = await verifyPublishedSite({ dataUrl });
    expect(report.result).toBe("failed");
    expect(report.failures).toContain("reader pages");
  } finally {
    missing.delete(target);
  }
});

test("honours the optional deadline override", async () => {
  delays.set("data/v1/current.json", 100);
  try {
    const report = await verifyPublishedSite({ dataUrl, timeoutMs: 5 });
    expect(report.result).toBe("failed");
    expect(report.failures).toContain("public pointer");
    expect(report.deadline_ms).toBe(5);
  } finally {
    delays.delete("data/v1/current.json");
  }
});

describe("installExactConsumerPackage", () => {
  let registry: Server;
  let registryUrl: string;
  let tarball: { name: string; version: string; bytes: Buffer };

  beforeAll(async () => {
    const base = await mkdtemp(path.join(tmpdir(), "ahw-registry-"));
    const staging = path.join(base, "fixture package");
    await mkdir(staging, { recursive: true });
    tarball = {
      name: "ahw-fixture-consumer",
      version: "1.2.3",
      bytes: Buffer.alloc(0),
    };
    await writeFile(
      path.join(staging, "package.json"),
      JSON.stringify({
        name: tarball.name,
        version: tarball.version,
        bin: { ahw: "cli.js" },
        files: ["cli.js"],
      }),
    );
    await writeFile(
      path.join(staging, "cli.js"),
      "#!/usr/bin/env node\nprocess.stdout.write('fixture-consumer\\n');\n",
    );
    const packOutput = path.join(base, "tarballs");
    await mkdir(packOutput, { recursive: true });
    const packed = JSON.parse(
      await runNode(
        [
          await npmCli(),
          "pack",
          "--json",
          "--ignore-scripts",
          "--pack-destination",
          packOutput,
          staging,
        ],
        base,
      ),
    ) as { filename: string }[];
    tarball.bytes = await readFile(path.join(packOutput, packed[0]!.filename));
    registry = createServer((request, response) => {
      const key = decodeURIComponent(
        new URL(request.url ?? "/", "http://127.0.0.1").pathname,
      ).replace(/^\//, "");
      const filename = packed[0]!.filename;
      if (key === tarball.name) {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            name: tarball.name,
            "dist-tags": { latest: tarball.version },
            versions: {
              [tarball.version]: {
                name: tarball.name,
                version: tarball.version,
                bin: { ahw: "cli.js" },
                dist: {
                  tarball: `http://${request.headers.host}/${tarball.name}/-/${filename}`,
                  integrity: `sha512-${createHash("sha512").update(tarball.bytes).digest("base64")}`,
                  shasum: createHash("sha1")
                    .update(tarball.bytes)
                    .digest("hex"),
                },
              },
            },
          }),
        );
        return;
      }
      if (key === `${tarball.name}/-/${filename}`) {
        response.writeHead(200, { "content-type": "application/octet-stream" });
        response.end(tarball.bytes);
        return;
      }
      response.writeHead(404).end();
    });
    await new Promise<void>((resolve) =>
      registry.listen(0, "127.0.0.1", resolve),
    );
    registryUrl = `http://127.0.0.1:${(registry.address() as AddressInfo).port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => registry?.close(() => resolve()));
  });

  const runner: ConsumerProcess = { npm: npmCli, runNode };

  test("installs an exact version from a controlled registry in isolation", async () => {
    const installed = await installExactConsumerPackage({
      runner,
      registry: registryUrl,
      packageName: tarball.name,
      packageVersion: tarball.version,
    });
    try {
      expect(installed.version).toBe(tarball.version);
      expect(installed.base.startsWith(tmpdir())).toBe(true);
      expect(installed.env.HOME?.startsWith(installed.base)).toBe(true);
      expect(installed.entry).toBe(
        path.join(installed.prefix, "node_modules", tarball.name, "cli.js"),
      );
    } finally {
      await installed.remove();
    }
  });

  test("fails clearly when the exact version is unavailable", async () => {
    await expect(
      installExactConsumerPackage({
        runner,
        registry: registryUrl,
        packageName: tarball.name,
        packageVersion: "9.9.9",
      }),
    ).rejects.toThrow();
  });
});

const packedManifest = path.resolve("var/consumer-package/manifest.json");

/**
 * Real acceptance of the packed consumer artifact: the injected runner
 * materializes the exact saved tgz instead of fetching it (no registry), then
 * every CLI and MCP read really executes the installed entry. When the
 * artifact is missing it is built once with the project's own scripts.
 */
describe("runPublicConsumerVerification (packed artifact)", () => {
  beforeAll(async () => {
    if (existsSync(packedManifest)) {
      const packed = JSON.parse(await readFile(packedManifest, "utf8"));
      const current = JSON.parse(
        await readFile("packages/consumer/package.json", "utf8"),
      );
      if (packed.version === current.version) return;
    }
    const tsx = path.resolve("node_modules/tsx/dist/cli.mjs");
    const cwd = path.resolve(".");
    await runNode([tsx, "scripts/build-consumer.ts"], cwd);
    await runNode([tsx, "scripts/pack-consumer.ts"], cwd);
  }, 180_000);

  test("accepts the packed consumer through real CLI and MCP reads", async () => {
    const manifest = JSON.parse(await readFile(packedManifest, "utf8")) as {
      filename: string;
    };
    const tgz = path.join(path.dirname(packedManifest), manifest.filename);
    const projectModules = path.resolve("node_modules");
    const runner: ConsumerProcess = {
      npm: npmCli,
      runNode: async (args, cwd, env, expected = 0) => {
        if (args.includes("install") && args.includes("--prefix")) {
          const prefix = args[args.indexOf("--prefix") + 1]!;
          const staging = await mkdtemp(path.join(prefix, "extract-"));
          await extract({ file: tgz, cwd: staging });
          const target = path.join(
            prefix,
            "node_modules",
            "agent-harness-wiki",
          );
          await mkdir(path.dirname(target), { recursive: true });
          await rename(path.join(staging, "package"), target);
          const installed = JSON.parse(
            await readFile(path.join(target, "package.json"), "utf8"),
          ) as { dependencies?: Record<string, string> };
          for (const dependency of Object.keys(installed.dependencies ?? {})) {
            const link = path.join(prefix, "node_modules", dependency);
            await mkdir(path.dirname(link), { recursive: true });
            await symlink(path.join(projectModules, dependency), link, "dir");
          }
          return "";
        }
        return runNode(args, cwd, env, expected);
      },
    };
    const version = (
      JSON.parse(await readFile("packages/consumer/package.json", "utf8")) as {
        version: string;
      }
    ).version;
    const report = await runPublicConsumerVerification({
      runner,
      packageVersion: version,
      dataUrl,
    });
    expect(report.failures).toEqual([]);
    expect(report.result).toBe("passed");
    expect(report.checks.map((check) => check.name)).toEqual(
      expect.arrayContaining([...requiredPublicChecks]),
    );
    expect(report.platforms).toHaveProperty(
      `${process.platform}-${process.arch}-node${process.versions.node}`,
    );
  }, 120_000);
});
