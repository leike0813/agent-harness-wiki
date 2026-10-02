import { execFile } from "node:child_process";
import {
  cp,
  mkdtemp,
  readdir,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { createServer, type Server } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterAll, afterEach, describe, expect, test } from "vitest";
import { prepareOnlineRelease } from "../../src/compiler/online-release.js";
import type { OnlineResource } from "../../src/domain/online.js";
import { OnlineClient } from "../../src/query/online-client.js";
import { OnlineError } from "../../src/query/online-error.js";

const exec = promisify(execFile);
const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);
const dataPrefix = "/data/v1/";

const temporary: string[] = [];
const servers: Server[] = [];
const clients: OnlineClient[] = [];
let releaseRoot: string | undefined;

afterEach(async () => {
  for (const client of clients.splice(0)) client.close();
  for (const server of servers.splice(0)) {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
  await Promise.all(
    temporary
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});
afterAll(async () => {
  if (releaseRoot) await rm(releaseRoot, { recursive: true, force: true });
});

interface Release {
  releaseId: string;
  files: Map<string, Buffer>;
  resourcePaths: string[];
  pathname(relative: string): string;
}

const pointerPath = `${dataPrefix}current.json`;

function deployment(prepared: {
  releaseId: string;
  resources: Map<string, OnlineResource>;
}): Release {
  const prefix = `${dataPrefix}releases/${prepared.releaseId}/`;
  const files = new Map<string, Buffer>();
  for (const [relative, resource] of prepared.resources)
    files.set(prefix + relative, Buffer.from(JSON.stringify(resource)));
  files.set(
    pointerPath,
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
    resourcePaths: [...prepared.resources.keys()].sort(),
    pathname: (relative) => prefix + relative,
  };
}

async function buildBaseRelease(): Promise<Release> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-online-client-"));
  releaseRoot = root;
  const datasetRoot = path.join(root, "dataset");
  await cp(fixture, datasetRoot, { recursive: true });
  const git = (args: string[]) =>
    exec("git", ["-C", datasetRoot, ...args], { maxBuffer: 64 * 1024 * 1024 });
  await git(["init", "-q"]);
  await git(["add", "."]);
  await git([
    "-c",
    "user.name=test",
    "-c",
    "user.email=test@example.invalid",
    "commit",
    "-qm",
    "init",
  ]);
  const commit = (await git(["rev-parse", "HEAD"])).stdout.trim();
  return deployment(
    await prepareOnlineRelease({
      datasetRoot,
      profile: "fixture",
      commit,
      publishedAt: "2026-10-02T00:00:00Z",
      base: "/",
    }),
  );
}

let base: Promise<Release> | undefined;
const baseRelease = (): Promise<Release> => (base ??= buildBaseRelease());

/** Same resources under a new release identity, for current A→B moves. */
function renamed(source: Release, releaseId: string): Release {
  const prefix = `${dataPrefix}releases/${source.releaseId}/`;
  const nextPrefix = `${dataPrefix}releases/${releaseId}/`;
  const files = new Map<string, Buffer>();
  for (const [url, body] of source.files) {
    if (!url.startsWith(prefix)) continue;
    files.set(
      nextPrefix + url.slice(prefix.length),
      Buffer.from(
        body.toString("utf8").replaceAll(source.releaseId, releaseId),
      ),
    );
  }
  files.set(
    pointerPath,
    Buffer.from(
      JSON.stringify({
        protocol_version: 1,
        state: "active",
        release_id: releaseId,
        manifest: `releases/${releaseId}/manifest.json`,
      }),
    ),
  );
  return {
    releaseId,
    files,
    resourcePaths: source.resourcePaths,
    pathname: (relative) => nextPrefix + relative,
  };
}

function setPointer(server: TestServer, release: Release): void {
  const pointer = release.files.get(pointerPath);
  if (!pointer) throw new Error("release has no pointer");
  server.files.set(pointerPath, pointer);
}

interface Override {
  status?: number;
  retryAfter?: string;
  delayMs?: number;
  body?: Buffer;
  once?: boolean;
  partialBody?: { bytes: Buffer; holdMs: number };
}

interface TestServer {
  origin: string;
  files: Map<string, Buffer>;
  requests: string[];
  overrides: Map<string, Override>;
  delays: Map<string, number>;
  maxConcurrent: number;
  count(pathname: string): number;
}

async function startServer(files: Map<string, Buffer>): Promise<TestServer> {
  const state = {
    files,
    requests: [] as string[],
    overrides: new Map<string, Override>(),
    delays: new Map<string, number>(),
    maxConcurrent: 0,
    active: 0,
  };
  const server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(
      new URL(request.url ?? "/", "http://127.0.0.1").pathname,
    );
    state.requests.push(pathname);
    state.active += 1;
    state.maxConcurrent = Math.max(state.maxConcurrent, state.active);
    try {
      const override = state.overrides.get(pathname);
      const delay = override?.delayMs ?? state.delays.get(pathname) ?? 0;
      if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
      if (override) {
        if (override.once) state.overrides.delete(pathname);
        const partial = override.partialBody;
        if (partial) {
          response.writeHead(200, { "content-type": "application/json" });
          response.write(partial.bytes);
          await new Promise((resolve) => setTimeout(resolve, partial.holdMs));
          response.end();
          return;
        }
        if (override.status !== undefined) {
          response.writeHead(
            override.status,
            override.retryAfter === undefined
              ? {}
              : { "retry-after": override.retryAfter },
          );
          response.end();
          return;
        }
        if (override.body) {
          response.writeHead(200, { "content-type": "application/json" });
          response.end(override.body);
          return;
        }
      }
      const body = state.files.get(pathname);
      if (!body) {
        response.writeHead(404);
        response.end();
        return;
      }
      response.writeHead(200, { "content-type": "application/json" });
      response.end(body);
    } finally {
      state.active -= 1;
    }
  });
  servers.push(server);
  await new Promise<void>((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve()),
  );
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("server did not bind a port");
  return {
    origin: `http://127.0.0.1:${address.port}`,
    files: state.files,
    requests: state.requests,
    overrides: state.overrides,
    delays: state.delays,
    get maxConcurrent(): number {
      return state.maxConcurrent;
    },
    count: (pathname) =>
      state.requests.filter((entry) => entry === pathname).length,
  };
}

function dataUrl(server: TestServer): string {
  return `${server.origin}${dataPrefix}`;
}

function track(client: OnlineClient): OnlineClient {
  clients.push(client);
  return client;
}

async function readResource(
  client: OnlineClient,
  relative: string,
): Promise<OnlineResource> {
  const operation = client.operation();
  try {
    const buffer = await client.read(relative, operation);
    return JSON.parse(buffer.toString("utf8")) as OnlineResource;
  } finally {
    operation.dispose();
  }
}

async function errorOf(promise: Promise<unknown>): Promise<OnlineError> {
  const error = await promise.then(
    () => undefined,
    (reason: unknown) => reason,
  );
  expect(error).toBeInstanceOf(OnlineError);
  return error as OnlineError;
}

async function walkFiles(directory: string): Promise<string[]> {
  const found: string[] = [];
  for (const dirent of await readdir(directory, { withFileTypes: true })) {
    const entry = path.join(directory, dirent.name);
    if (dirent.isDirectory()) found.push(...(await walkFiles(entry)));
    else if (dirent.isFile()) found.push(entry);
  }
  return found;
}

async function temp(): Promise<string> {
  const directory = await mkdtemp(path.join(tmpdir(), "ahw-online-cache-"));
  temporary.push(directory);
  return directory;
}

function sourcePath(release: Release): string {
  const found = release.resourcePaths.find(
    (relative) =>
      relative.startsWith("sources/") &&
      relative.endsWith(".json") &&
      relative !== "sources/index/index.json",
  );
  if (!found) throw new Error("release has no standalone source resource");
  return found;
}

function chapterPath(release: Release): string {
  const found = release.resourcePaths.find((relative) =>
    relative.startsWith("chapters/"),
  );
  if (!found) throw new Error("release has no chapter resource");
  return found;
}

const topicPath = "topics/demo-open-cli/skills/index.json";

async function waitUntil(
  predicate: () => boolean,
  timeoutMs = 4000,
): Promise<void> {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeoutMs)
      throw new Error("Timed out waiting for the server condition.");
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

describe("OnlineClient", () => {
  test("keeps mirror caches separate and accepts only the same offline entry", async () => {
    const release = await baseRelease();
    const first = await startServer(release.files);
    const second = await startServer(release.files);
    const cacheDir = await temp();
    const client = track(
      await OnlineClient.open({ dataUrl: dataUrl(first), cacheDir }),
    );
    expect(client.releaseId).toBe(release.releaseId);
    expect(
      (
        await errorOf(
          OnlineClient.open({
            dataUrl: dataUrl(second),
            cacheDir,
            offline: true,
          }),
        )
      ).code,
    ).toBe("offline_cache_miss");
  });

  test("reclaims owned disk resources and tolerates refused cache writes", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const cacheDir = await temp();
    const first = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
    );
    await readResource(first, topicPath);
    const topicFile = (await walkFiles(cacheDir)).find((file) =>
      file.endsWith(topicPath),
    )!;
    const second = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), cacheDir },
        { diskBytes: 1 },
      ),
    );
    await readResource(second, chapterPath(release));
    await expect(readFile(topicFile)).rejects.toThrow();
    const blocked = path.join(await temp(), "blocked");
    await writeFile(blocked, "file");
    const diagnostics: string[] = [];
    const readonly = track(
      await OnlineClient.open({
        dataUrl: dataUrl(server),
        cacheDir: blocked,
        diagnostic: (message) => diagnostics.push(message),
      }),
    );
    expect((await readResource(readonly, topicPath)).resource_kind).toBe(
      "topic",
    );
    expect(diagnostics.length).toBeGreaterThan(0);
  });

  test("concurrent complete cache writes remain readable offline", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const cacheDir = await temp();
    const clients = await Promise.all(
      Array.from({ length: 3 }, async () =>
        track(await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir })),
      ),
    );
    await Promise.all(clients.map((client) => readResource(client, topicPath)));
    const offline = track(
      await OnlineClient.open({
        dataUrl: dataUrl(server),
        cacheDir,
        offline: true,
      }),
    );
    expect((await readResource(offline, topicPath)).resource_kind).toBe(
      "topic",
    );
  });
  test("initializes a fixed release and serves reads online and offline", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const cacheDir = await temp();

    const online = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
    );
    expect(online.accessMode).toBe("online");
    expect(online.releaseId).toBe(release.releaseId);
    expect(online.manifest.catalog).toBe("catalog.json");
    expect(online.catalog.products.length).toBeGreaterThan(0);

    const topic = await readResource(online, topicPath);
    expect(topic.resource_kind).toBe("topic");
    const directory = await readResource(online, "sources/index/index.json");
    expect(directory.resource_kind).toBe("navigation");
    online.close();

    const offline = track(
      await OnlineClient.open({
        dataUrl: dataUrl(server),
        cacheDir,
        offline: true,
      }),
    );
    expect(offline.accessMode).toBe("offline");
    expect(offline.releaseId).toBe(release.releaseId);
    expect((await readResource(offline, topicPath)).resource_kind).toBe(
      "topic",
    );

    const uncached = chapterPath(release);
    const operation = offline.operation();
    expect((await errorOf(offline.read(uncached, operation))).code).toBe(
      "offline_cache_miss",
    );
    operation.dispose();
  });

  test("keeps the bound release when current moves and initializes the next one", async () => {
    const first = await baseRelease();
    const second = renamed(first, `web-v1-${"b".repeat(40)}`);
    const server = await startServer(new Map(first.files));

    const bound = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
    );
    expect(bound.releaseId).toBe(first.releaseId);

    for (const [url, body] of second.files)
      if (url !== pointerPath) server.files.set(url, body);
    setPointer(server, second);

    expect(bound.releaseId).toBe(first.releaseId);
    expect((await readResource(bound, topicPath)).resource_kind).toBe("topic");

    const fresh = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
    );
    expect(fresh.releaseId).toBe(second.releaseId);
  });

  test("fails initialization without falling back or overwriting the last success", async () => {
    const release = await baseRelease();
    const server = await startServer(new Map(release.files));
    const cacheDir = await temp();

    track(
      await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
    ).close();

    const recordFile = (await walkFiles(cacheDir)).find((file) =>
      file.endsWith("last-success.json"),
    );
    expect(recordFile).toBeDefined();
    const record = JSON.parse(await readFile(recordFile!, "utf8")) as {
      release_id: string;
    };
    expect(record.release_id).toBe(release.releaseId);

    server.files.set(
      pointerPath,
      Buffer.from(
        JSON.stringify({
          protocol_version: 1,
          state: "active",
          release_id: `web-v1-${"c".repeat(40)}`,
          manifest: `releases/web-v1-${"c".repeat(40)}/manifest.json`,
        }),
      ),
    );

    const failure = await errorOf(
      OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
    );
    expect(failure.code).toBe("release_resource_missing");
    expect(
      (
        JSON.parse(await readFile(recordFile!, "utf8")) as {
          release_id: string;
        }
      ).release_id,
    ).toBe(release.releaseId);

    const offline = track(
      await OnlineClient.open({
        dataUrl: dataUrl(server),
        cacheDir,
        offline: true,
      }),
    );
    expect(offline.releaseId).toBe(release.releaseId);
  });

  test("refetches a corrupt cache entry online and fails it offline", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const cacheDir = await temp();

    const online = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
    );
    await readResource(online, topicPath);
    online.close();

    const cachedTopic = (await walkFiles(cacheDir)).find((file) =>
      file.endsWith(
        path.join("topics", "demo-open-cli", "skills", "index.json"),
      ),
    );
    expect(cachedTopic).toBeDefined();

    await writeFile(cachedTopic!, "{ not json");
    const recovered = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
    );
    expect((await readResource(recovered, topicPath)).resource_kind).toBe(
      "topic",
    );
    recovered.close();

    await writeFile(cachedTopic!, "{ not json");
    const offline = track(
      await OnlineClient.open({
        dataUrl: dataUrl(server),
        cacheDir,
        offline: true,
      }),
    );
    const operation = offline.operation();
    expect((await errorOf(offline.read(topicPath, operation))).code).toBe(
      "invalid_cached_data",
    );
    operation.dispose();
  });

  test("performs no disk work when the file cache is disabled", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const cacheDir = path.join(await temp(), "unused");

    const online = track(
      await OnlineClient.open({
        dataUrl: dataUrl(server),
        cacheDir,
        fileCache: false,
      }),
    );
    expect((await readResource(online, topicPath)).resource_kind).toBe("topic");
    await expect(readdir(cacheDir)).rejects.toThrow();
    online.close();

    expect(
      (
        await errorOf(
          OnlineClient.open({
            dataUrl: dataUrl(server),
            cacheDir,
            fileCache: false,
            offline: true,
          }),
        )
      ).code,
    ).toBe("offline_cache_miss");
  });

  test("caps distinct resources per operation and counts cache hits", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), fileCache: false },
        { maxResources: 2 },
      ),
    );

    const operation = client.operation();
    expect((await client.read(topicPath, operation)).length).toBeGreaterThan(0);
    await client.read(topicPath, operation);
    await client.read(chapterPath(release), operation);
    expect(
      (await errorOf(client.read(sourcePath(release), operation))).code,
    ).toBe("query_too_broad");
    operation.dispose();
  });

  test.each([408, 429, 502, 503, 504])(
    "retries HTTP %i once",
    async (status) => {
      const release = await baseRelease();
      const server = await startServer(release.files);
      const client = track(
        await OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
      );
      server.overrides.set(release.pathname(topicPath), {
        status,
        retryAfter: "0",
        once: true,
      });
      expect((await readResource(client, topicPath)).resource_kind).toBe(
        "topic",
      );
      expect(server.count(release.pathname(topicPath))).toBe(2);
    },
  );

  test("operation deadline includes pending requests and slots", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), fileCache: false },
        { operationMs: 120, requestMs: 2000, concurrency: 1 },
      ),
    );
    const chapter = chapterPath(release);
    server.overrides.set(release.pathname(chapter), { delayMs: 2000 });
    const operation = client.operation();
    const first = errorOf(client.read(chapter, operation));
    const queued = errorOf(client.read(topicPath, operation));
    expect((await first).code).toBe("operation_timeout");
    expect((await queued).code).toBe("operation_timeout");
    expect(server.count(release.pathname(topicPath))).toBe(0);
    operation.dispose();
  });

  test("retries a retryable status once and never retries a permanent 404", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
    );

    server.overrides.set(release.pathname(topicPath), {
      status: 503,
      retryAfter: "0",
      once: true,
    });
    expect((await readResource(client, topicPath)).resource_kind).toBe("topic");
    expect(server.count(release.pathname(topicPath))).toBe(2);

    const source = sourcePath(release);
    server.overrides.set(release.pathname(source), { status: 404 });
    const operation = client.operation();
    expect((await errorOf(client.read(source, operation))).code).toBe(
      "release_resource_missing",
    );
    operation.dispose();
    expect(server.count(release.pathname(source))).toBe(1);
  });

  test("times out each attempt and retries network timeouts once", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), fileCache: false },
        { requestMs: 150 },
      ),
    );

    const chapter = chapterPath(release);
    server.overrides.set(release.pathname(chapter), { delayMs: 800 });
    const operation = client.operation();
    expect((await errorOf(client.read(chapter, operation))).code).toBe(
      "request_timeout",
    );
    operation.dispose();
    expect(server.count(release.pathname(chapter))).toBe(2);
  });

  test("does not retry when Retry-After exceeds the remaining budget", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), fileCache: false },
        { operationMs: 3_000 },
      ),
    );

    server.overrides.set(release.pathname(topicPath), {
      status: 429,
      retryAfter: "60",
    });
    const operation = client.operation();
    const failure = await errorOf(client.read(topicPath, operation));
    operation.dispose();
    expect(failure.code).toBe("rate_limited");
    expect(failure.httpStatus).toBe(429);
    expect(failure.retryable).toBe(true);
    expect(server.count(release.pathname(topicPath))).toBe(1);
  });

  test("cancels one operation without cancelling an independent call", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
    );

    const chapter = chapterPath(release);
    server.overrides.set(release.pathname(chapter), { delayMs: 1_000 });

    const controller = new AbortController();
    const cancelled = client.operation(controller.signal);
    const pending = client.read(chapter, cancelled);
    const independent = client.read(topicPath, client.operation());
    controller.abort();
    expect((await errorOf(pending)).code).toBe("operation_cancelled");
    expect((await independent).length).toBeGreaterThan(0);
    cancelled.dispose();
  });

  test("close aborts in-flight reads", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
    );

    const chapter = chapterPath(release);
    server.overrides.set(release.pathname(chapter), { delayMs: 2_000 });
    const pending = client.read(chapter, client.operation());
    await new Promise((resolve) => setTimeout(resolve, 50));
    client.close();
    expect((await errorOf(pending)).code).toBe("operation_cancelled");
  });

  test("holds at most four simultaneous HTTP requests", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
    );

    const sources = release.resourcePaths
      .filter(
        (relative) =>
          relative.startsWith("sources/") &&
          relative.endsWith(".json") &&
          relative !== "sources/index/index.json",
      )
      .slice(0, 8);
    expect(sources.length).toBeGreaterThan(4);
    for (const relative of sources)
      server.delays.set(release.pathname(relative), 80);

    const operation = client.operation();
    const results = await Promise.all(
      sources.map((relative) => client.read(relative, operation)),
    );
    operation.dispose();
    expect(results.every((buffer) => buffer.length > 0)).toBe(true);
    expect(server.maxConcurrent).toBeLessThanOrEqual(4);
    expect(server.maxConcurrent).toBeGreaterThan(1);
  });

  test("rejects responses beyond the decoded body limit", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const catalogBody = release.files.get(release.pathname("catalog.json"));
    if (!catalogBody) throw new Error("release has no catalog");
    const limit = catalogBody.length + 64;
    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), fileCache: false },
        { maxResourceBytes: limit },
      ),
    );

    const topicBody = release.files.get(release.pathname(topicPath));
    if (!topicBody) throw new Error("release has no topic");
    server.files.set(
      release.pathname(topicPath),
      Buffer.concat([topicBody, Buffer.alloc(topicBody.length + limit, 0x20)]),
    );
    const operation = client.operation();
    const failure = await errorOf(client.read(topicPath, operation));
    operation.dispose();
    expect(failure.code).toBe("invalid_release_data");
    expect(failure.message).toContain("size limit");
  });

  test("distinguishes unsupported protocol from an explicit retirement", async () => {
    const release = await baseRelease();
    const server = await startServer(new Map(release.files));

    server.files.set(
      pointerPath,
      Buffer.from(
        JSON.stringify({ protocol_version: 2, state: "active", manifest: "x" }),
      ),
    );
    expect(
      (
        await errorOf(
          OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
        )
      ).code,
    ).toBe("unsupported_protocol");

    server.files.set(
      pointerPath,
      Buffer.from(
        JSON.stringify({
          protocol_version: 1,
          state: "retired",
          retired_at: "2026-10-01T00:00:00Z",
          upgrade: "Install a newer agent-harness-wiki.",
        }),
      ),
    );
    const retired = await errorOf(
      OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
    );
    expect(retired.code).toBe("protocol_retired");
    expect(retired.releaseId).toBeUndefined();
  });

  test("rejects a wrong-kind resource at the search manifest path", async () => {
    const release = await baseRelease();
    const server = await startServer(new Map(release.files));
    const searchManifest = "search/manifest.json";
    const body = release.files.get(release.pathname(searchManifest));
    if (!body) throw new Error("release has no search manifest");
    const meta = JSON.parse(body.toString("utf8")) as { exact: string };
    const navigation = release.files.get(release.pathname(meta.exact));
    if (!navigation) throw new Error("release has no exact navigation");
    server.files.set(release.pathname(searchManifest), navigation);

    const client = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
    );
    const operation = client.operation();
    const failure = await errorOf(client.read(searchManifest, operation));
    operation.dispose();
    expect(failure.code).toBe("invalid_release_data");
    expect(server.count(release.pathname(searchManifest))).toBe(1);
  });

  test("rejects a resource whose identity contradicts its path without retrying", async () => {
    const release = await baseRelease();
    const server = await startServer(new Map(release.files));
    const resource = JSON.parse(
      release.files.get(release.pathname(topicPath))!.toString("utf8"),
    ) as Record<string, unknown>;
    resource.harness_id = "demo-other-cli";
    server.files.set(
      release.pathname(topicPath),
      Buffer.from(JSON.stringify(resource)),
    );

    const client = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), fileCache: false }),
    );
    const operation = client.operation();
    const failure = await errorOf(client.read(topicPath, operation));
    operation.dispose();
    expect(failure.code).toBe("invalid_release_data");
    expect(server.count(release.pathname(topicPath))).toBe(1);
  });

  const corruptions: Array<{
    name: string;
    mutate: (resource: Record<string, unknown>) => void;
  }> = [
    {
      name: "topic identity",
      mutate: (resource) => {
        resource.harness_id = "demo-other-cli";
      },
    },
    {
      name: "release identity",
      mutate: (resource) => {
        resource.release_id = `web-v1-${"e".repeat(40)}`;
      },
    },
  ];
  test.each(corruptions)(
    "refetches a cache entry with corrupt $name online and fails it offline",
    async ({ mutate }) => {
      const release = await baseRelease();
      const server = await startServer(release.files);
      const cacheDir = await temp();
      const warm = track(
        await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
      );
      await readResource(warm, topicPath);
      warm.close();

      const cachedTopic = (await walkFiles(cacheDir)).find((file) =>
        file.endsWith(
          path.join("topics", "demo-open-cli", "skills", "index.json"),
        ),
      );
      expect(cachedTopic).toBeDefined();
      const corrupt = JSON.parse(
        await readFile(cachedTopic!, "utf8"),
      ) as Record<string, unknown>;
      mutate(corrupt);
      await writeFile(cachedTopic!, JSON.stringify(corrupt));

      const recovered = track(
        await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
      );
      expect((await readResource(recovered, topicPath)).resource_kind).toBe(
        "topic",
      );
      recovered.close();

      mutate(corrupt);
      await writeFile(cachedTopic!, JSON.stringify(corrupt));
      const offline = track(
        await OnlineClient.open({
          dataUrl: dataUrl(server),
          cacheDir,
          offline: true,
        }),
      );
      const operation = offline.operation();
      expect((await errorOf(offline.read(topicPath, operation))).code).toBe(
        "invalid_cached_data",
      );
      operation.dispose();
    },
  );

  test.skipIf(process.platform === "win32")(
    "caches and reads back through a symlinked cache directory",
    async () => {
      const release = await baseRelease();
      const server = await startServer(release.files);
      const real = await temp();
      const link = path.join(await temp(), "cache-link");
      await symlink(real, link, "dir");

      const online = track(
        await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir: link }),
      );
      expect((await readResource(online, topicPath)).resource_kind).toBe(
        "topic",
      );
      online.close();

      const offline = track(
        await OnlineClient.open({
          dataUrl: dataUrl(server),
          cacheDir: link,
          offline: true,
        }),
      );
      expect((await readResource(offline, topicPath)).resource_kind).toBe(
        "topic",
      );
    },
  );

  test("ignores a disk cache entry larger than the resource limit", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const cacheDir = await temp();

    const warm = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
    );
    await readResource(warm, topicPath);
    warm.close();

    const cachedTopic = (await walkFiles(cacheDir)).find((file) =>
      file.endsWith(
        path.join("topics", "demo-open-cli", "skills", "index.json"),
      ),
    );
    expect(cachedTopic).toBeDefined();
    const bytes = await readFile(cachedTopic!);
    const manifest = release.files.get(release.pathname("manifest.json"))!;
    const catalog = release.files.get(release.pathname("catalog.json"))!;
    const topicBody = release.files.get(release.pathname(topicPath))!;
    const limit =
      Math.max(manifest.length, catalog.length, topicBody.length) + 64;
    await writeFile(
      cachedTopic!,
      Buffer.concat([bytes, Buffer.alloc(limit, 0x20)]),
    );

    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), cacheDir },
        { maxResourceBytes: limit },
      ),
    );
    const before = server.count(release.pathname(topicPath));
    expect((await readResource(client, topicPath)).resource_kind).toBe("topic");
    expect(server.count(release.pathname(topicPath))).toBe(before + 1);
  });

  test("charges disk cache hits against the operation resource budget", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const cacheDir = await temp();
    const chapter = chapterPath(release);
    const source = sourcePath(release);

    const warm = track(
      await OnlineClient.open({ dataUrl: dataUrl(server), cacheDir }),
    );
    await readResource(warm, topicPath);
    await readResource(warm, chapter);
    await readResource(warm, source);
    warm.close();

    const offline = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), cacheDir, offline: true },
        { memoryBytes: 0, maxResources: 2 },
      ),
    );
    const operation = offline.operation();
    expect((await offline.read(topicPath, operation)).length).toBeGreaterThan(
      0,
    );
    expect((await offline.read(chapter, operation)).length).toBeGreaterThan(0);
    expect((await errorOf(offline.read(source, operation))).code).toBe(
      "query_too_broad",
    );
    operation.dispose();
  });

  test("cancels a queued operation without issuing its request", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), fileCache: false },
        { concurrency: 1, operationMs: 5_000 },
      ),
    );
    const chapter = chapterPath(release);
    server.delays.set(release.pathname(chapter), 300);
    const occupying = client.operation();
    const first = client.read(chapter, occupying);
    await waitUntil(() => server.count(release.pathname(chapter)) === 1);

    const controller = new AbortController();
    const queuedOperation = client.operation(controller.signal);
    const queued = client.read(topicPath, queuedOperation);
    await new Promise((resolve) => setTimeout(resolve, 50));
    controller.abort();
    expect((await errorOf(queued)).code).toBe("operation_cancelled");
    expect(server.count(release.pathname(topicPath))).toBe(0);
    expect((await first).length).toBeGreaterThan(0);
    occupying.dispose();
    queuedOperation.dispose();
  });

  test("cancels during the response body read", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), fileCache: false },
        { requestMs: 5_000, operationMs: 5_000 },
      ),
    );
    server.overrides.set(release.pathname(topicPath), {
      partialBody: { bytes: Buffer.from("{"), holdMs: 1_000 },
    });

    const controller = new AbortController();
    const operation = client.operation(controller.signal);
    const pending = client.read(topicPath, operation);
    await waitUntil(() => server.count(release.pathname(topicPath)) === 1);
    await new Promise((resolve) => setTimeout(resolve, 50));
    controller.abort();
    expect((await errorOf(pending)).code).toBe("operation_cancelled");
    expect(server.count(release.pathname(topicPath))).toBe(1);
    operation.dispose();
  });

  test("cancels during retry backoff", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), fileCache: false },
        { operationMs: 5_000, requestMs: 5_000 },
      ),
    );
    server.overrides.set(release.pathname(topicPath), {
      status: 503,
      retryAfter: "3",
    });

    const controller = new AbortController();
    const operation = client.operation(controller.signal);
    const pending = client.read(topicPath, operation);
    await waitUntil(() => server.count(release.pathname(topicPath)) === 1);
    await new Promise((resolve) => setTimeout(resolve, 30));
    controller.abort();
    expect((await errorOf(pending)).code).toBe("operation_cancelled");
    expect(server.count(release.pathname(topicPath))).toBe(1);
    operation.dispose();
  });

  test("keeps one overall deadline across sequential reads on a single operation", async () => {
    const release = await baseRelease();
    const server = await startServer(release.files);
    let clock = 0;
    const client = track(
      await OnlineClient.openForTest(
        { dataUrl: dataUrl(server), fileCache: false },
        { operationMs: 10_000, now: () => clock },
      ),
    );
    const operation = client.operation();
    expect((await client.read(topicPath, operation)).length).toBeGreaterThan(0);
    const chapter = chapterPath(release);
    clock = 10_001;
    expect((await errorOf(client.read(chapter, operation))).code).toBe(
      "operation_timeout",
    );
    expect(server.count(release.pathname(chapter))).toBe(0);
    operation.dispose();
  });
});
