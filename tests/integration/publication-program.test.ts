import { createHash } from "node:crypto";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { expect, test } from "vitest";
import { consumerPackageName } from "../../src/publication/consumer-verification.js";
import type { LedgerSnapshot } from "../../src/publication/github.js";
import {
  candidateManifest,
  compareStableVersions,
  nextCandidate,
  prepareCandidate,
  promoteCandidate,
  requiredPublicChecks,
  validatePublicReports,
  type ProgramRunner,
  type ProgramStore,
} from "../../src/publication/program.js";
import {
  initialState,
  type PublicationState,
} from "../../src/publication/state.js";

const T0 = "2026-01-01T00:00:00.000Z";
const T1 = "2026-01-02T00:00:00.000Z";
const COMMIT = "a".repeat(40);
const RELEASE = `web-v1-${COMMIT}`;
const REGISTRY = "https://registry.test";
const PACKAGE_URL = `${REGISTRY}/${consumerPackageName}`;
const TARBALL_URL = `${REGISTRY}/${consumerPackageName}/-/${consumerPackageName}-1.0.0.tgz`;
const TARBALL = Buffer.from("agent-harness-wiki packed bytes");
const INTEGRITY = `sha512-${createHash("sha512").update(TARBALL).digest("base64")}`;
const SHASUM = createHash("sha1").update(TARBALL).digest("hex");
const MIN_NODE = "24.12.0";
const LATEST_NODE = "24.20.0";
const COMBOS = ["linux-x64", "darwin-arm64", "win32-x64"];
const PLATFORMS = COMBOS.flatMap((combo) => [
  `${combo}-node${MIN_NODE}`,
  `${combo}-node${LATEST_NODE}`,
]);

function memoryStore() {
  let state: PublicationState = initialState();
  let revision = 0;
  const digest = () => revision.toString(16).padStart(40, "0");
  const store: ProgramStore & { state: PublicationState } = {
    get state() {
      return state;
    },
    async readState(): Promise<LedgerSnapshot> {
      return { state: structuredClone(state), sha: digest() };
    },
    async writeState(snapshot: LedgerSnapshot): Promise<LedgerSnapshot> {
      if (snapshot.sha !== digest()) throw new Error("state_conflict");
      revision += 1;
      state = structuredClone(snapshot.state);
      return { state: structuredClone(state), sha: digest() };
    },
  };
  return store;
}

function fakeRunner(
  handler?: (args: string[], env: NodeJS.ProcessEnv) => string,
) {
  const calls: { args: string[]; cwd: string; env: NodeJS.ProcessEnv }[] = [];
  const runner: ProgramRunner = {
    npm: async () => "/fake/npm-cli.js",
    runNode: async (args, cwd, env) => {
      calls.push({ args, cwd, env });
      return handler ? handler(args, env) : "";
    },
  };
  return { calls, runner };
}

function registryHarness(initiallyPresent = false) {
  const state = { present: initiallyPresent, latest: null as string | null };
  const fetchImpl = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url === PACKAGE_URL)
      return Response.json({
        "dist-tags": state.latest ? { latest: state.latest } : {},
        versions: state.present
          ? {
              "1.0.0": {
                dist: {
                  integrity: INTEGRITY,
                  shasum: SHASUM,
                  tarball: TARBALL_URL,
                },
              },
            }
          : {},
      });
    if (url === TARBALL_URL) return new Response(TARBALL);
    throw new Error(`unexpected registry read ${url}`);
  }) as typeof fetch;
  return { state, fetchImpl };
}

/** A runner that mirrors what a real registry does to its `latest` dist-tag. */
function programRunner(harness: ReturnType<typeof registryHarness>) {
  return fakeRunner((args) => {
    if (args[1] === "publish") harness.state.present = true;
    if (args[1] === "dist-tag") harness.state.latest = args[3]!.split("@")[1]!;
    return "";
  });
}

const packageMissing = (async () =>
  new Response("not found", { status: 404 })) as typeof fetch;

async function manifestFor(bytes = TARBALL, version = "1.0.0") {
  const directory = await mkdtemp(path.join(tmpdir(), "ahw-program-test-"));
  const tgz = path.join(directory, `${consumerPackageName}-${version}.tgz`);
  await writeFile(tgz, bytes);
  return candidateManifest({ version, commit: COMMIT, tgz });
}

const report = (platform: string, overrides: Record<string, unknown> = {}) => ({
  result: "passed",
  package: { name: consumerPackageName, version: "1.0.0" },
  release_id: RELEASE,
  checks: requiredPublicChecks.map((name) => ({ name, status: "passed" })),
  failures: [],
  platforms: { [platform]: "passed" },
  ...overrides,
});

const reports = PLATFORMS.map((platform) => report(platform));

async function publishNext() {
  const harness = registryHarness();
  const { calls, runner } = programRunner(harness);
  const store = memoryStore();
  const manifest = await manifestFor();
  const result = await nextCandidate({
    store,
    runner,
    manifest,
    now: T0,
    registry: REGISTRY,
    fetchImpl: harness.fetchImpl,
  });
  return { store, harness, calls, runner, manifest, result };
}

function promoteOptions(
  store: ProgramStore,
  runner: ProgramRunner,
  fetchImpl: typeof fetch,
  override: Partial<Parameters<typeof promoteCandidate>[0]> = {},
) {
  return {
    store,
    runner,
    version: "1.0.0",
    expectedReleaseId: RELEASE,
    reports,
    now: T1,
    minimumNode: MIN_NODE,
    registry: REGISTRY,
    fetchImpl,
    ...override,
  };
}

test("a candidate is fixed by commit and artifact bytes", async () => {
  const store = memoryStore();
  const manifest = await manifestFor();
  expect(manifest.tarball).toBe(path.resolve(manifest.tarball));
  expect(manifest).toMatchObject({
    version: "1.0.0",
    commit: COMMIT,
    integrity: INTEGRITY,
    shasum: SHASUM,
  });
  await prepareCandidate(store, manifest, T0);
  expect(store.state.npm.candidates["1.0.0"]).toEqual({
    commit: COMMIT,
    integrity: INTEGRITY,
    status: "prepared",
    verified_release_id: null,
    updated_at: T0,
  });
  await prepareCandidate(store, manifest, T1);
  expect(store.state.npm.candidates["1.0.0"]!.updated_at).toBe(T0);
  const other = await manifestFor(Buffer.from("different bytes"));
  await expect(prepareCandidate(store, other, T1)).rejects.toThrow(/immutable/);
});

test("next publishes the exact tgz and records the candidate", async () => {
  const { store, calls, manifest, result } = await publishNext();
  expect(result.status).toBe("next");
  expect(result.published).toBe(true);
  expect(store.state.npm.candidates["1.0.0"]!.status).toBe("next");
  expect(store.state.npm.latest).toBeNull();
  expect(calls).toHaveLength(1);
  expect(calls[0]!.args).toEqual([
    "/fake/npm-cli.js",
    "publish",
    manifest.tarball,
    "--tag",
    "next",
    "--access",
    "public",
  ]);
});

test("publishing uses an isolated environment with OIDC identity only", async () => {
  process.env.ACTIONS_ID_TOKEN_REQUEST_URL = "https://oidc.test/token";
  process.env.GITHUB_ACTIONS = "true";
  process.env.GITHUB_REPOSITORY = "owner/repo";
  process.env.GITHUB_TOKEN = "secret-token";
  process.env.npm_config_userconfig = "/home/someone/.npmrc";
  process.env.npm_config_evil = "leak";
  try {
    const { calls } = await publishNext();
    const env = calls[0]!.env;
    expect(env.ACTIONS_ID_TOKEN_REQUEST_URL).toBe("https://oidc.test/token");
    expect(env.GITHUB_ACTIONS).toBe("true");
    expect(env.GITHUB_REPOSITORY).toBe("owner/repo");
    expect(env.GITHUB_TOKEN).toBeUndefined();
    expect(env.npm_config_userconfig).not.toBe("/home/someone/.npmrc");
    expect(env.npm_config_userconfig).toMatch(/user\.npmrc$/);
    expect(env.npm_config_evil).toBeUndefined();
    expect(env.HOME).not.toBe(process.env.HOME);
    expect(env.npm_config_registry).toBe(REGISTRY);
  } finally {
    delete process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
    delete process.env.GITHUB_ACTIONS;
    delete process.env.GITHUB_REPOSITORY;
    delete process.env.GITHUB_TOKEN;
    delete process.env.npm_config_userconfig;
    delete process.env.npm_config_evil;
  }
});

test("an existing published version is reused only with the same integrity", async () => {
  const harness = registryHarness(true);
  const { calls, runner } = fakeRunner();
  const store = memoryStore();
  const manifest = await manifestFor();
  const reused = await nextCandidate({
    store,
    runner,
    manifest,
    now: T0,
    registry: REGISTRY,
    fetchImpl: harness.fetchImpl,
  });
  expect(reused).toMatchObject({ status: "next", published: false });
  expect(calls).toHaveLength(0);

  const mismatch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url === PACKAGE_URL)
      return Response.json({
        versions: {
          "1.0.0": {
            dist: {
              integrity: `sha512-${Buffer.from("x").toString("base64")}`,
              shasum: SHASUM,
              tarball: TARBALL_URL,
            },
          },
        },
      });
    return new Response(TARBALL);
  }) as unknown as typeof fetch;
  const conflicting = memoryStore();
  await expect(
    nextCandidate({
      store: conflicting,
      runner,
      manifest,
      now: T0,
      registry: REGISTRY,
      fetchImpl: mismatch,
    }),
  ).rejects.toThrow(/different integrity/);
  expect(conflicting.state.npm.candidates["1.0.0"]!.status).toBe("failed");
});

test("a missing package reports bootstrap_required without publishing", async () => {
  const store = memoryStore();
  const { calls, runner } = fakeRunner();
  const manifest = await manifestFor();
  const result = await nextCandidate({
    store,
    runner,
    manifest,
    now: T0,
    registry: REGISTRY,
    fetchImpl: packageMissing,
  });
  expect(result).toMatchObject({
    status: "bootstrap_required",
    published: false,
  });
  expect(calls).toHaveLength(0);
  expect(store.state.npm.candidates["1.0.0"]!.status).toBe("failed");
  expect(store.state.npm.latest).toBeNull();
});

test("promotion needs six passing reports for one program and one release", async () => {
  const { store, harness, calls, runner } = await publishNext();
  const snapshot = await promoteCandidate(
    promoteOptions(store, runner, harness.fetchImpl),
  );
  const candidate = snapshot.state.npm.candidates["1.0.0"]!;
  expect(candidate.status).toBe("promoted");
  expect(candidate.verified_release_id).toBe(RELEASE);
  expect(snapshot.state.npm.latest).toBe("1.0.0");
  expect(
    calls.some(
      (call) => call.args[1] === "dist-tag" && call.args[4] === "latest",
    ),
  ).toBe(true);
});

test("a repeated promotion of the same latest is idempotent", async () => {
  const { store, harness, calls, runner } = await publishNext();
  await promoteCandidate(promoteOptions(store, runner, harness.fetchImpl));
  const before = calls.filter((call) => call.args[1] === "dist-tag").length;
  const again = await promoteCandidate(
    promoteOptions(store, runner, harness.fetchImpl),
  );
  expect(again.state.npm.latest).toBe("1.0.0");
  expect(again.state.npm.candidates["1.0.0"]!.status).toBe("promoted");
  expect(calls.filter((call) => call.args[1] === "dist-tag").length).toBe(
    before,
  );
});

test.each<[string, unknown[], RegExp]>([
  [
    "fewer than six reports",
    PLATFORMS.slice(0, 5).map((p) => report(p)),
    /six public reports/,
  ],
  [
    "a failed report",
    [
      ...PLATFORMS.slice(0, 5).map((p) => report(p)),
      report(PLATFORMS[5]!, { result: "failed", failures: ["MCP get_source"] }),
    ],
    /did not pass/,
  ],
  [
    "another release",
    PLATFORMS.map((p) => report(p, { release_id: `web-v1-${"b".repeat(40)}` })),
    /observed/,
  ],
  [
    "another version",
    PLATFORMS.map((p) =>
      report(p, { package: { name: consumerPackageName, version: "1.0.1" } }),
    ),
    /covers/,
  ],
  [
    "a Windows-less operating system set",
    ["linux-x64", "linux-arm64", "darwin-x64"].flatMap((combo) =>
      [MIN_NODE, LATEST_NODE].map((node) => report(`${combo}-node${node}`)),
    ),
    /No public report for .*win32-x64/,
  ],
  [
    "no newer Node report",
    [
      "linux-x64",
      "darwin-arm64",
      "win32-x64",
      "linux-arm64",
      "darwin-x64",
      "win32-arm64",
    ].map((combo) => report(`${combo}-node${MIN_NODE}`)),
    /no newer Node/,
  ],
  [
    "empty checks",
    PLATFORMS.map((p) => report(p, { checks: [] })),
    /missing required checks/,
  ],
])("promotion rejects %s", async (_name, candidates, message) => {
  const { store, harness, runner } = await publishNext();
  await expect(
    promoteCandidate(
      promoteOptions(store, runner, harness.fetchImpl, { reports: candidates }),
    ),
  ).rejects.toThrow(message);
  expect(store.state.npm.latest).toBeNull();
});

test("a v-prefixed platform key still satisfies the report contract", () => {
  const prefixed = COMBOS.flatMap((combo) =>
    [`${combo}-nodev${MIN_NODE}`, `${combo}-nodev${LATEST_NODE}`].map(
      (platform) => report(platform),
    ),
  );
  expect(() =>
    validatePublicReports(prefixed, {
      version: "1.0.0",
      releaseId: RELEASE,
      minimumNode: MIN_NODE,
    }),
  ).not.toThrow();
});

test("an older candidate cannot displace a newer latest", async () => {
  const { store, harness, runner } = await publishNext();
  store.state.npm.latest = "2.0.0";
  await expect(
    promoteCandidate(promoteOptions(store, runner, harness.fetchImpl)),
  ).rejects.toThrow(/older than/);
  expect(store.state.npm.latest).toBe("2.0.0");
});

test("a failed promotion marks the candidate failed and leaves latest", async () => {
  const { store, harness } = await publishNext();
  const { runner } = fakeRunner((args) => {
    if (args[1] === "dist-tag") throw new Error("npm ERR! code E403");
    return "";
  });
  await expect(
    promoteCandidate(promoteOptions(store, runner, harness.fetchImpl)),
  ).rejects.toThrow(/E403/);
  expect(store.state.npm.candidates["1.0.0"]!.status).toBe("failed");
  expect(store.state.npm.latest).toBeNull();
});

test("an unconfirmed registry latest leaves the candidate verified", async () => {
  const { store, harness } = await publishNext();
  const { runner } = fakeRunner();
  await expect(
    promoteCandidate(promoteOptions(store, runner, harness.fetchImpl)),
  ).rejects.toThrow(/Registry latest/);
  expect(store.state.npm.candidates["1.0.0"]!.status).toBe("verified");
  expect(store.state.npm.latest).toBeNull();
});

test.each<[string, string, number]>([
  ["1.0.0", "1.0.1", -1],
  ["1.2.0", "1.10.0", -1],
  ["2.0.0", "1.9.9", 1],
  ["1.0.0", "1.0.0", 0],
])("stable %s compared with %s is %i", (left, right, expected) => {
  expect(compareStableVersions(left, right)).toBe(expected);
});

test("prerelease versions are outside the stable channel", () => {
  expect(() => compareStableVersions("1.0.0-beta.1", "1.0.0")).toThrow(
    /stable/,
  );
});
