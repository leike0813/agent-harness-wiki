import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  chmod,
  lstat,
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  readlink,
  rename,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, expect, test, vi } from "vitest";
import {
  checkCurrentManaged,
  observeManaged,
  promoteCandidate,
  sandboxStartup,
  updateManaged,
} from "../../src/sources/managed.js";
import {
  managedStorage,
  promoteExternal,
  recoverManaged,
  selectedManagedDirectory,
  withManagedLock,
} from "../../src/sources/managed-storage.js";
import { sha256 } from "../../src/compiler/projection.js";
import { auditArtifacts } from "../../src/sources/audit.js";

const roots: string[] = [];
const exec = promisify(execFile);
afterEach(async () => {
  for (const root of roots.splice(0))
    await rm(root, { recursive: true, force: true });
});

async function temporary(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-managed-test-"));
  roots.push(root);
  return root;
}

test.each([
  ["1.0.1", "sha512-AAAA", "candidate"],
  ["1.0.0", "sha512-AAAA", "no_change"],
  ["1.0.0", "sha512-BBBB", "anomaly"],
  ["0.9.0", "sha512-AAAA", "anomaly"],
  ["preview", "sha512-AAAA", "anomaly"],
] as const)(
  "observes official latest %s without changing selection",
  async (version, integrity, status) => {
    const root = await temporary();
    const dir = path.join(root, "research/package-set");
    await mkdir(dir, { recursive: true });
    await writeFile(
      path.join(dir, "package.json"),
      JSON.stringify({ dependencies: { "@openai/codex": "1.0.0" } }),
    );
    await writeFile(
      path.join(dir, "pnpm-lock.yaml"),
      "packages:\n  '@openai/codex@1.0.0':\n    resolution:\n      integrity: sha512-AAAA\n",
    );
    const fetchImpl = (async () =>
      Response.json({
        name: "@openai/codex",
        version,
        dist: { integrity },
      })) as typeof fetch;
    const result = await observeManaged(root, "codex", fetchImpl);
    expect(result).toMatchObject({
      channel: "latest",
      observed: version,
      integrity,
      status,
    });
    expect(
      JSON.parse(await readFile(path.join(dir, "package.json"), "utf8"))
        .dependencies["@openai/codex"],
    ).toBe("1.0.0");
  },
);

test("an unselected registered package is a first-admission candidate", async () => {
  const root = await temporary();
  const dir = path.join(root, "research/package-set");
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, "package.json"),
    JSON.stringify({ dependencies: {} }),
  );
  await writeFile(path.join(dir, "pnpm-lock.yaml"), "packages: {}\n");
  const fetchImpl = (async () =>
    Response.json({
      name: "@openai/codex",
      version: "1.0.0",
      dist: { integrity: "sha512-AAAA" },
    })) as typeof fetch;
  const result = await observeManaged(root, "codex", fetchImpl);
  expect(result).toMatchObject({
    selected: null,
    observed: "1.0.0",
    status: "candidate",
  });
  const current = await checkCurrentManaged(root, "codex");
  expect(current).toMatchObject({ status: "blocked" });
  expect(current.reason).toContain("Package not selected");
});

test("a failed first admission keeps the selected package set intact", async () => {
  const root = await temporary();
  const selected = path.join(root, "research/package-set");
  const candidateId = "00000000-0000-0000-0000-000000000001";
  const candidate = path.join(
    root,
    "var/managed-packages/candidates",
    candidateId,
  );
  await mkdir(selected, { recursive: true });
  await mkdir(candidate, { recursive: true });
  await writeFile(
    path.join(selected, "package.json"),
    JSON.stringify({ dependencies: {} }),
  );
  await writeFile(path.join(selected, "pnpm-lock.yaml"), "packages: {}\n");
  await writeFile(
    path.join(candidate, "package.json"),
    JSON.stringify({ dependencies: { "@openai/codex": "1.0.0" } }),
  );
  await writeFile(
    path.join(candidate, "pnpm-lock.yaml"),
    "packages:\n  '@openai/codex@1.0.0':\n    resolution:\n      integrity: sha512-AAAA\nimporters:\n  .:\n    dependencies:\n      '@openai/codex':\n        specifier: 1.0.0\n",
  );
  const fetchImpl = (async () =>
    Response.json({
      name: "@openai/codex",
      version: "1.0.0",
      dist: { integrity: "sha512-AAAA" },
    })) as typeof fetch;
  const result = await updateManaged(root, "codex", fetchImpl, candidateId);
  expect(result.status).toBe("blocked");
  expect(
    JSON.parse(await readFile(path.join(selected, "package.json"), "utf8")),
  ).toEqual({ dependencies: {} });
});

test.skipIf(process.env.AHW_SANDBOX_TEST !== "1")(
  "first admission and later update promote only after isolated startup",
  async () => {
    const root = await temporary();
    const selected = path.join(root, "research/package-set");
    const name = "@mariozechner/pi-coding-agent";
    const candidateId = "00000000-0000-0000-0000-000000000001";
    await mkdir(path.join(selected, "node_modules"), { recursive: true });
    await writeFile(
      path.join(selected, "package.json"),
      JSON.stringify({ dependencies: {} }),
    );
    await writeFile(path.join(selected, "pnpm-lock.yaml"), "packages: {}\n");

    async function candidate(version: string): Promise<void> {
      const dir = path.join(
        root,
        "var/managed-packages/candidates",
        candidateId,
      );
      const nodeModules = path.join(dir, "node_modules");
      const packageDir = path.join(
        nodeModules,
        `.pnpm/@mariozechner+pi-coding-agent@${version}/node_modules/@mariozechner/pi-coding-agent`,
      );
      await mkdir(path.join(packageDir, "dist"), { recursive: true });
      await mkdir(path.join(nodeModules, "@mariozechner"), {
        recursive: true,
      });
      await symlink(
        `../.pnpm/@mariozechner+pi-coding-agent@${version}/node_modules/@mariozechner/pi-coding-agent`,
        path.join(nodeModules, name),
      );
      await writeFile(
        path.join(packageDir, "package.json"),
        JSON.stringify({ name, version }),
      );
      await writeFile(
        path.join(packageDir, "dist/cli.js"),
        `console.log(${JSON.stringify(version)});\n`,
      );
      await writeFile(
        path.join(dir, "package.json"),
        JSON.stringify({ dependencies: { [name]: version } }),
      );
      await writeFile(
        path.join(dir, "pnpm-lock.yaml"),
        `packages:\n  '${name}@${version}':\n    resolution:\n      integrity: sha512-AAAA\nimporters:\n  .:\n    dependencies:\n      '${name}':\n        specifier: ${version}\n`,
      );
    }

    for (const [version, previous] of [
      ["1.0.0", null],
      ["1.0.1", "1.0.0"],
    ] as const) {
      await candidate(version);
      const fetchImpl = (async () =>
        Response.json({
          name,
          version,
          dist: { integrity: "sha512-AAAA" },
        })) as typeof fetch;
      const result = await updateManaged(root, "pi", fetchImpl, candidateId);
      expect(result).toMatchObject({
        status: "promoted",
        selected: previous,
        observed: version,
        entry: expect.stringContaining("dist/cli.js"),
        runtime: "node",
        exit_code: 0,
      });
      expect(
        JSON.parse(await readFile(path.join(selected, "package.json"), "utf8"))
          .dependencies[name],
      ).toBe(version);
    }
  },
);

test("incomplete candidate leaves the selected manifest, lock and runnable entry in place", async () => {
  const root = await temporary();
  const selected = path.join(root, "selected");
  const candidate = path.join(root, "candidate");
  for (const dir of [selected, candidate])
    await mkdir(path.join(dir, "node_modules"), { recursive: true });
  await writeFile(path.join(selected, "package.json"), "selected");
  await writeFile(path.join(selected, "pnpm-lock.yaml"), "locked");
  await writeFile(path.join(selected, "node_modules/entry"), "runnable");
  await writeFile(path.join(root, "knowledge-current"), "unchanged");
  await writeFile(path.join(candidate, "package.json"), "candidate");
  await expect(promoteCandidate(selected, candidate)).rejects.toThrow();
  expect(await readFile(path.join(selected, "package.json"), "utf8")).toBe(
    "selected",
  );
  expect(await readFile(path.join(selected, "pnpm-lock.yaml"), "utf8")).toBe(
    "locked",
  );
  expect(
    await readFile(path.join(selected, "node_modules/entry"), "utf8"),
  ).toBe("runnable");
  expect(await readFile(path.join(root, "knowledge-current"), "utf8")).toBe(
    "unchanged",
  );
});

test("successful promotion preserves the old executable bytes in a backup", async () => {
  const root = await temporary();
  const selected = path.join(root, "selected");
  const candidate = path.join(root, "candidate");
  for (const dir of [selected, candidate])
    await mkdir(path.join(dir, "node_modules"), { recursive: true });
  for (const [dir, value] of [
    [selected, "old"],
    [candidate, "new"],
  ] as const) {
    await writeFile(path.join(dir, "package.json"), value);
    await writeFile(path.join(dir, "pnpm-lock.yaml"), value);
    await writeFile(path.join(dir, "node_modules/entry"), value);
  }
  await promoteCandidate(selected, candidate);
  expect(
    await readFile(path.join(selected, "node_modules/entry"), "utf8"),
  ).toBe("new");
  const backup = (await readdir(root)).find((name) =>
    name.startsWith("previous-"),
  );
  expect(backup).toBeDefined();
  expect(
    await readFile(path.join(root, backup!, "node_modules/entry"), "utf8"),
  ).toBe("old");
});

test("missing Claude platform dependency blocks the selected startup", async () => {
  const root = await temporary();
  const dir = path.join(root, "research/package-set");
  const packageRoot = path.join(
    dir,
    "node_modules/.pnpm/@anthropic-ai+claude-code@1.0.0/node_modules/@anthropic-ai/claude-code",
  );
  await mkdir(packageRoot, { recursive: true });
  await mkdir(path.join(dir, "node_modules/@anthropic-ai"), {
    recursive: true,
  });
  await symlink(
    packageRoot,
    path.join(dir, "node_modules/@anthropic-ai/claude-code"),
  );
  await writeFile(
    path.join(packageRoot, "package.json"),
    JSON.stringify({ name: "@anthropic-ai/claude-code", version: "1.0.0" }),
  );
  await writeFile(
    path.join(dir, "package.json"),
    JSON.stringify({ dependencies: { "@anthropic-ai/claude-code": "1.0.0" } }),
  );
  await writeFile(
    path.join(dir, "pnpm-lock.yaml"),
    "packages:\n  '@anthropic-ai/claude-code@1.0.0':\n    resolution:\n      integrity: sha512-AAAA\n",
  );
  const result = await checkCurrentManaged(root, "claude-code");
  expect(result.status).toBe("blocked");
  expect(result.reason).toContain("ENOENT");
});

test.skipIf(process.env.AHW_SANDBOX_TEST !== "1")(
  "bwrap startup hides ambient credentials and has no network",
  async () => {
    const root = await temporary();
    await writeFile(
      path.join(root, "fixture.cjs"),
      'const net = require("node:net"); const socket = net.connect(53, "1.1.1.1"); socket.on("connect", () => { console.log("network-open"); socket.destroy(); }); socket.on("error", () => console.log("0.73.1", process.env.OPENAI_API_KEY ?? "clean", "network-denied"));\n',
    );
    const prior = process.env.OPENAI_API_KEY;
    process.env.OPENAI_API_KEY = "credential-canary";
    try {
      const result = await sandboxStartup(
        root,
        "pi",
        "0.73.1",
        "fixture.cjs",
        "node",
      );
      expect(result.ok).toBe(true);
      expect(result.output).toContain("clean");
      expect(result.output).not.toContain("credential-canary");
      expect(result.output).toContain("network-denied");
      expect(result.sandbox).toContain("--unshare-all");
    } finally {
      if (prior === undefined) delete process.env.OPENAI_API_KEY;
      else process.env.OPENAI_API_KEY = prior;
    }
  },
);

const piName = "@mariozechner/pi-coding-agent";
type Storage = Parameters<typeof promoteExternal>[2];
type StorageFixture = { remote: string; bytesRoot: string };

// rename is mocked for the whole file but passes through by default so the
// interrupted-promotion test can inject one failure.
vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  return { ...actual, rename: vi.fn(actual.rename) };
});

async function packageSet(
  root: string,
  dependencies: Record<string, string>,
  lock: string,
): Promise<string> {
  const dir = path.join(root, "research/package-set");
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, "package.json"),
    JSON.stringify({ dependencies }),
  );
  await writeFile(path.join(dir, "pnpm-lock.yaml"), lock);
  return dir;
}

function piLock(version: string, integrity = "sha512-AAAA"): string {
  return (
    "packages:\n  '" +
    piName +
    "@" +
    version +
    "':\n    resolution:\n      integrity: " +
    integrity +
    "\nimporters:\n  .:\n    dependencies:\n      '" +
    piName +
    "':\n        specifier: " +
    version +
    "\n"
  );
}

function twoPackageLock(
  piVersion: string,
  piIntegrity: string,
  codexIntegrity: string,
): string {
  return (
    "packages:\n  '" +
    piName +
    "@" +
    piVersion +
    "':\n    resolution:\n      integrity: " +
    piIntegrity +
    "\n  '@openai/codex@1.0.0':\n    resolution:\n      integrity: " +
    codexIntegrity +
    "\nimporters:\n  .:\n    dependencies:\n      '" +
    piName +
    "':\n        specifier: " +
    piVersion +
    "\n      '@openai/codex':\n        specifier: 1.0.0\n"
  );
}

const piLatest = (version: string, integrity = "sha512-AAAA"): typeof fetch =>
  (async () =>
    Response.json({
      name: piName,
      version,
      dist: { integrity },
    })) as typeof fetch;

async function writeStorage(root: string, config: unknown): Promise<void> {
  const dir = path.join(root, "var/managed-packages");
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, "storage.json"),
    typeof config === "string" ? config : JSON.stringify(config),
  );
}

async function piSnapshot(dir: string, version: string): Promise<string> {
  const packageDir = path.join(
    dir,
    "node_modules/.pnpm/@mariozechner+pi-coding-agent@" +
      version +
      "/node_modules/" +
      piName,
  );
  await mkdir(path.join(packageDir, "dist"), { recursive: true });
  await mkdir(path.join(dir, "node_modules/@mariozechner"), {
    recursive: true,
  });
  await chmod(dir, 0o755);
  await symlink(packageDir, path.join(dir, "node_modules", piName));
  await writeFile(
    path.join(packageDir, "package.json"),
    JSON.stringify({ name: piName, version }),
  );
  const script = "console.log(" + JSON.stringify(version) + ");\n";
  await writeFile(path.join(packageDir, "dist/cli.js"), script);
  await writeFile(
    path.join(dir, "package.json"),
    JSON.stringify({ dependencies: { [piName]: version } }),
  );
  await writeFile(path.join(dir, "pnpm-lock.yaml"), piLock(version));
  return script;
}

async function externalStorage(root: string): Promise<Storage> {
  const bytesRoot = path.join(root, "bytes");
  const candidates = path.join(bytesRoot, "candidates");
  await mkdir(candidates, { recursive: true });
  await mkdir(path.join(root, "var/managed-packages"), { recursive: true });
  return {
    bytesRoot,
    mountPoint: path.join(root, "mount"),
    mountSource: "fixture-host:/export",
    candidates,
  };
}

// The local package set follows the current pointer; the link target must be
// <bytesRoot>/current/node_modules literally.
async function linkLocal(
  root: string,
  storage: Storage,
  target: string,
): Promise<void> {
  const selected = path.join(root, "research/package-set");
  const dir = path.join(storage.bytesRoot, target);
  await mkdir(selected, { recursive: true });
  await symlink(target, path.join(storage.bytesRoot, "current"));
  await symlink(
    path.join(storage.bytesRoot, "current", "node_modules"),
    path.join(selected, "node_modules"),
  );
  for (const file of ["package.json", "pnpm-lock.yaml"])
    await writeFile(
      path.join(selected, file),
      await readFile(path.join(dir, file), "utf8"),
    );
}

async function managedSnapshot(dir: string, value: string): Promise<void> {
  await mkdir(path.join(dir, "node_modules"), { recursive: true });
  await writeFile(
    path.join(dir, "package.json"),
    JSON.stringify({ dependencies: { example: value } }),
  );
  await writeFile(path.join(dir, "pnpm-lock.yaml"), "marker: " + value + "\n");
  await writeFile(path.join(dir, "node_modules/entry"), value);
}

const storageFailures: Array<
  [string, (fixture: StorageFixture) => string, RegExp]
> = [
  ["invalid json", () => "{ not json", /SyntaxError/],
  [
    "escaped bytes root",
    (fixture) =>
      JSON.stringify({
        bytesRoot: fixture.bytesRoot,
        mountPoint: path.join(fixture.remote, "elsewhere"),
        mountSource: "host:/export",
      }),
    /escapes mount point/,
  ],
  [
    "missing mount",
    (fixture) =>
      JSON.stringify({
        bytesRoot: fixture.bytesRoot,
        mountPoint: fixture.remote,
        mountSource: "host:/export",
      }),
    /mount missing or mismatched/,
  ],
  [
    "wrong mount source",
    (fixture) =>
      JSON.stringify({
        bytesRoot: fixture.bytesRoot,
        mountPoint: fixture.remote,
        mountSource: "wrong-host:/export",
      }),
    /mount missing or mismatched/,
  ],
];

test.each(storageFailures)(
  "storage that fails validation blocks update and current check: %s",
  async (_label, config, reason) => {
    const root = await temporary();
    const remote = path.join(root, "remote");
    const bytesRoot = path.join(remote, "bytes");
    await mkdir(bytesRoot, { recursive: true });
    await writeFile(path.join(bytesRoot, "SENTINEL"), "untouched");
    await packageSet(
      root,
      { "@openai/codex": "1.0.0" },
      "packages:\n  '@openai/codex@1.0.0':\n    resolution:\n      integrity: sha512-AAAA\n",
    );
    await writeStorage(root, config({ remote, bytesRoot }));
    const offline = (async () => {
      throw new Error("registry touched");
    }) as typeof fetch;
    const update = await updateManaged(root, "codex", offline);
    expect(update.status).toBe("blocked");
    expect(update.reason).toMatch(reason);
    const current = await checkCurrentManaged(root, "codex", offline);
    expect(current.status).toBe("blocked");
    expect(current.reason).toMatch(reason);
    expect(await readdir(bytesRoot)).toEqual(["SENTINEL"]);
  },
);

test.each([
  ["package.json", "missing"],
  ["package.json", "corrupt"],
  ["pnpm-lock.yaml", "missing"],
  ["pnpm-lock.yaml", "corrupt"],
  ["pnpm-lock.yaml", "empty"],
  ["pnpm-lock.yaml", "scalar"],
])("a %s that is %s blocks observe, check and update", async (file, kind) => {
  const root = await temporary();
  const dir = await packageSet(root, { [piName]: "1.0.0" }, piLock("1.0.0"));
  if (kind === "missing") await rm(path.join(dir, file));
  else if (kind === "empty") await writeFile(path.join(dir, file), "");
  else if (kind === "scalar")
    await writeFile(path.join(dir, file), "invalid-lock");
  else await writeFile(path.join(dir, file), "{ not valid ]");
  const offline = (async () => {
    throw new Error("registry touched");
  }) as typeof fetch;
  for (const result of [
    await observeManaged(root, "pi", offline),
    await checkCurrentManaged(root, "pi", offline),
    await updateManaged(root, "pi", offline),
  ])
    expect(result.status).toBe("blocked");
});

test("the managed lock refuses a concurrent update and releases afterwards", async () => {
  const root = await temporary();
  let concurrent: unknown;
  await withManagedLock(root, async () => {
    concurrent = await withManagedLock(root, async () => "ran").then(
      () => "ran",
      (error: unknown) => error,
    );
  });
  expect((concurrent as { code?: string }).code).toBe("SQLITE_BUSY");
  await expect(withManagedLock(root, async () => "released")).resolves.toBe(
    "released",
  );
});

test("an external package set link without storage configuration is rejected", async () => {
  const root = await temporary();
  const dir = await packageSet(root, {}, "packages: {}\n");
  await mkdir(path.join(root, "outside"));
  await symlink(path.join(root, "outside"), path.join(dir, "node_modules"));
  await expect(selectedManagedDirectory(root, undefined)).rejects.toThrow(
    /Unconfigured external managed package set/,
  );
});

const escapes: Array<[string, string]> = [
  ["virtual store", "Virtual store escapes managed snapshot"],
  ["package link", "Package link escapes candidate"],
  ["entry", "Direct executable entry missing or unsafe"],
];

test.each(escapes)(
  "a managed snapshot whose %s escapes the candidate is blocked",
  async (kind, reason) => {
    const root = await temporary();
    const dir = await packageSet(root, { [piName]: "1.0.0" }, piLock("1.0.0"));
    const outside = path.join(root, "outside");
    await mkdir(outside);
    const nodeModules = path.join(dir, "node_modules");
    await mkdir(path.join(nodeModules, "@mariozechner"), { recursive: true });
    const packageDir = path.join(
      nodeModules,
      ".pnpm/@mariozechner+pi-coding-agent@1.0.0/node_modules/" + piName,
    );
    if (kind === "virtual store") {
      await symlink(outside, path.join(nodeModules, ".pnpm"));
    } else if (kind === "package link") {
      await mkdir(path.join(nodeModules, ".pnpm"));
      await symlink(outside, path.join(nodeModules, piName));
    } else {
      await mkdir(path.join(packageDir, "dist"), { recursive: true });
      await symlink(packageDir, path.join(nodeModules, piName));
      await writeFile(
        path.join(packageDir, "package.json"),
        JSON.stringify({ name: piName, version: "1.0.0" }),
      );
      await writeFile(path.join(outside, "cli.js"), "console.log('1.0.0')\n");
      await symlink(
        path.join(outside, "cli.js"),
        path.join(packageDir, "dist/cli.js"),
      );
    }
    const result = await checkCurrentManaged(root, "pi");
    expect(result.status).toBe("blocked");
    expect(result.reason).toContain(reason);
  },
);

const drift: Array<[string, Record<string, string>, string, string]> = [
  [
    "version",
    { [piName]: "1.0.1", "@openai/codex": "2.0.0" },
    twoPackageLock("1.0.1", "sha512-PI", "sha512-CODEX"),
    "Candidate differs from current package selection",
  ],
  [
    "integrity",
    { [piName]: "1.0.1", "@openai/codex": "1.0.0" },
    twoPackageLock("1.0.1", "sha512-PI", "sha512-DRIFT"),
    "Candidate changes selected package integrity",
  ],
];

test.each(drift)(
  "a reviewed candidate that changes another selected package is blocked (%s)",
  async (_label, dependencies, lock, reason) => {
    const root = await temporary();
    const selected = twoPackageLock("1.0.0", "sha512-PI", "sha512-CODEX");
    await packageSet(
      root,
      { [piName]: "1.0.0", "@openai/codex": "1.0.0" },
      selected,
    );
    const candidateId = "00000000-0000-0000-0000-000000000002";
    const candidate = path.join(
      root,
      "var/managed-packages/candidates",
      candidateId,
    );
    await mkdir(candidate, { recursive: true });
    await writeFile(
      path.join(candidate, "package.json"),
      JSON.stringify({ dependencies }),
    );
    await writeFile(path.join(candidate, "pnpm-lock.yaml"), lock);
    const result = await updateManaged(
      root,
      "pi",
      piLatest("1.0.1"),
      candidateId,
    );
    expect(result.status).toBe("blocked");
    expect(result.reason).toContain(reason);
    expect(
      await readFile(
        path.join(root, "research/package-set/package.json"),
        "utf8",
      ),
    ).toBe(
      JSON.stringify({
        dependencies: { [piName]: "1.0.0", "@openai/codex": "1.0.0" },
      }),
    );
    expect(
      await readFile(
        path.join(root, "research/package-set/pnpm-lock.yaml"),
        "utf8",
      ),
    ).toBe(selected);
  },
);

test("promoteExternal repoints current and keeps the previous snapshot", async () => {
  const root = await temporary();
  const storage = await externalStorage(root);
  const older = "11111111-1111-1111-1111-111111111111";
  const newer = "22222222-2222-2222-2222-222222222222";
  await managedSnapshot(path.join(storage.candidates, older), "old");
  await managedSnapshot(path.join(storage.candidates, newer), "new");
  await linkLocal(root, storage, "candidates/" + older);

  await promoteExternal(root, path.join(storage.candidates, newer), storage);

  expect(await readlink(path.join(storage.bytesRoot, "current"))).toBe(
    "candidates/" + newer,
  );
  expect(
    await readFile(
      path.join(root, "research/package-set/package.json"),
      "utf8",
    ),
  ).toBe(JSON.stringify({ dependencies: { example: "new" } }));
  expect(
    await readFile(
      path.join(root, "research/package-set/pnpm-lock.yaml"),
      "utf8",
    ),
  ).toBe("marker: new\n");
  expect(
    await readFile(
      path.join(storage.candidates, older, "node_modules/entry"),
      "utf8",
    ),
  ).toBe("old");
  await expect(
    lstat(path.join(root, "var/managed-packages/recovery.json")),
  ).rejects.toThrow();
});

test("a failed local metadata write is recovered and keeps the previous snapshot", async () => {
  const root = await temporary();
  const storage = await externalStorage(root);
  const older = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
  const newer = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
  await managedSnapshot(path.join(storage.candidates, older), "old");
  await managedSnapshot(path.join(storage.candidates, newer), "new");
  await linkLocal(root, storage, "candidates/" + older);
  const renameMock = vi.mocked(rename);
  const passthrough = renameMock.getMockImplementation();
  let injected = false;
  renameMock.mockImplementation(((from: string, to: string) => {
    if (
      !injected &&
      String(to).endsWith("research/package-set/pnpm-lock.yaml")
    ) {
      injected = true;
      throw Object.assign(new Error("EACCES"), { code: "EACCES" });
    }
    return passthrough!(from, to);
  }) as unknown as typeof rename);
  try {
    await expect(
      promoteExternal(root, path.join(storage.candidates, newer), storage),
    ).rejects.toThrow(/EACCES/);
  } finally {
    renameMock.mockImplementation(passthrough!);
  }
  expect(injected).toBe(true);
  expect(await readlink(path.join(storage.bytesRoot, "current"))).toBe(
    "candidates/" + older,
  );
  expect(
    await readFile(
      path.join(root, "research/package-set/package.json"),
      "utf8",
    ),
  ).toBe(JSON.stringify({ dependencies: { example: "old" } }));
  expect(
    await readFile(
      path.join(root, "research/package-set/pnpm-lock.yaml"),
      "utf8",
    ),
  ).toBe("marker: old\n");
  expect(
    await readFile(
      path.join(storage.candidates, newer, "node_modules/entry"),
      "utf8",
    ),
  ).toBe("new");
  await expect(
    lstat(path.join(root, "var/managed-packages/recovery.json")),
  ).rejects.toThrow();
});

test.each([
  ["restores local metadata before the pointer moves", false],
  ["restores the pointer and metadata after an interruption", true],
])("recoverManaged %s", async (_label, interrupted) => {
  const root = await temporary();
  const storage = await externalStorage(root);
  const older = "33333333-3333-3333-3333-333333333333";
  const newer = "44444444-4444-4444-4444-444444444444";
  await managedSnapshot(path.join(storage.candidates, older), "old");
  await managedSnapshot(path.join(storage.candidates, newer), "new");
  await linkLocal(root, storage, "candidates/" + older);
  const selected = path.join(root, "research/package-set");
  const journal = path.join(root, "var/managed-packages/recovery.json");
  const files = {
    "package.json": await readFile(path.join(selected, "package.json"), "utf8"),
    "pnpm-lock.yaml": await readFile(
      path.join(selected, "pnpm-lock.yaml"),
      "utf8",
    ),
  };
  await writeFile(
    journal,
    JSON.stringify({ target: "candidates/" + older, files }),
  );
  if (interrupted) {
    await rm(path.join(storage.bytesRoot, "current"));
    await symlink(
      "candidates/" + newer,
      path.join(storage.bytesRoot, "current"),
    );
    for (const file of ["package.json", "pnpm-lock.yaml"])
      await writeFile(
        path.join(selected, file),
        await readFile(path.join(storage.candidates, newer, file), "utf8"),
      );
  }
  await recoverManaged(root, storage);
  expect(await readlink(path.join(storage.bytesRoot, "current"))).toBe(
    "candidates/" + older,
  );
  expect(await readFile(path.join(selected, "package.json"), "utf8")).toBe(
    files["package.json"],
  );
  expect(await readFile(path.join(selected, "pnpm-lock.yaml"), "utf8")).toBe(
    files["pnpm-lock.yaml"],
  );
  await expect(lstat(journal)).rejects.toThrow();
  expect(await selectedManagedDirectory(root, storage)).toBe(
    path.join(storage.bytesRoot, "candidates/" + older),
  );
});

test.each(["directory", "metadata"])(
  "recoverManaged refuses an escaping %s",
  async (kind) => {
    const root = await temporary();
    const storage = await externalStorage(root);
    const id = "55555555-5555-5555-5555-555555555555";
    await mkdir(path.join(root, "outside"));
    if (kind === "directory")
      await symlink(
        path.join(root, "outside"),
        path.join(storage.candidates, id),
      );
    else {
      await mkdir(path.join(storage.candidates, id));
      await writeFile(path.join(root, "outside/package.json"), "{}");
      await symlink(
        path.join(root, "outside/package.json"),
        path.join(storage.candidates, id, "package.json"),
      );
      await writeFile(
        path.join(storage.candidates, id, "pnpm-lock.yaml"),
        "packages: {}\n",
      );
    }
    await writeFile(
      path.join(root, "var/managed-packages/recovery.json"),
      JSON.stringify({
        target: "candidates/" + id,
        files: { "package.json": "{}", "pnpm-lock.yaml": "packages: {}\n" },
      }),
    );
    await expect(recoverManaged(root, storage)).rejects.toThrow(
      /Unsafe recovery/,
    );
    await expect(
      lstat(path.join(storage.bytesRoot, "current")),
    ).rejects.toThrow();
  },
);

const nfsRoot = process.env.AHW_NFS_TEST_ROOT;
const nfsMountPoint = process.env.AHW_NFS_MOUNT_POINT;
const nfsMountSource = process.env.AHW_NFS_MOUNT_SOURCE;

test.skipIf(!nfsRoot || !nfsMountPoint || !nfsMountSource)(
  "real NFS storage validates links, promotes a verified candidate and audits provenance",
  async () => {
    const bytesRoot = path.join(nfsRoot!, "ahw-nfs-test-" + randomUUID());
    const root = await temporary();
    try {
      for (const dir of [
        "",
        "candidates",
        "store/v11/files",
        "store/v11/tmp",
      ]) {
        const directory = path.join(bytesRoot, dir);
        await mkdir(directory, { recursive: true, mode: 0o755 });
        await chmod(directory, 0o755);
      }
      await mkdir(path.join(root, ".pnpm-store/v11"), { recursive: true });
      await mkdir(path.join(root, "var/managed-packages"), { recursive: true });
      for (const [local, remote] of [
        ["var/managed-packages/candidates", "candidates"],
        [".pnpm-store/v11/files", "store/v11/files"],
        [".pnpm-store/v11/tmp", "store/v11/tmp"],
      ] as const)
        await symlink(path.join(bytesRoot, remote), path.join(root, local));
      await writeStorage(root, {
        bytesRoot,
        mountPoint: nfsMountPoint,
        mountSource: nfsMountSource,
      });
      const storage = await managedStorage(root);
      expect(storage).toMatchObject({
        bytesRoot,
        candidates: path.join(bytesRoot, "candidates"),
      });

      const aclFile = path.join(bytesRoot, "store/v11/files");
      const { stdout: safeAcl } = await exec(
        "getfattr",
        ["-h", "--only-values", "-n", "system.nfs4_acl", aclFile],
        { encoding: "buffer" },
      );
      const extra = Buffer.alloc(20);
      extra.writeUInt32BE(2, 8); // ALLOW WRITE_DATA for a fictional other UID.
      extra.writeUInt32BE(3, 12);
      extra.write("666", 16);
      const unsafeAcl = Buffer.concat([safeAcl, extra]);
      unsafeAcl.writeUInt32BE(safeAcl.readUInt32BE(0) + 1, 0);
      try {
        await exec("setfattr", [
          "-h",
          "-n",
          "system.nfs4_acl",
          "-v",
          "0x" + unsafeAcl.toString("hex"),
          aclFile,
        ]);
        await chmod(aclFile, 0o755);
        expect((await lstat(aclFile)).mode & 0o022).toBe(0);
        await expect(managedStorage(root)).rejects.toThrow(/ACL/);
      } finally {
        await exec("setfattr", [
          "-h",
          "-n",
          "system.nfs4_acl",
          "-v",
          "0x" + safeAcl.toString("hex"),
          aclFile,
        ]);
      }
      await expect(managedStorage(root)).resolves.toBeDefined();

      const older = randomUUID();
      await piSnapshot(path.join(bytesRoot, "candidates", older), "0.73.1");
      await linkLocal(root, storage!, "candidates/" + older);
      const candidateId = randomUUID();
      const script = await piSnapshot(
        path.join(bytesRoot, "candidates", candidateId),
        "0.73.2",
      );
      const reviewed = await updateManaged(
        root,
        "pi",
        piLatest("0.73.2"),
        candidateId,
      );
      expect(reviewed).toMatchObject({
        status: "promoted",
        selected: "0.73.1",
        observed: "0.73.2",
      });
      expect(
        (await lstat(path.join(bytesRoot, "candidates", candidateId))).mode &
          0o777,
      ).toBe(0o755);
      expect(await readlink(path.join(bytesRoot, "current"))).toBe(
        "candidates/" + candidateId,
      );
      expect(
        await checkCurrentManaged(root, "pi", piLatest("0.73.2")),
      ).toMatchObject({ status: "startup_success", runtime: "node" });

      const artifact = {
        schema_version: 1 as const,
        record_kind: "fixture" as const,
        kind: "managed_package" as const,
        artifact_id: "artifact-nfs-pi",
        source_id: "source-nfs-pi",
        harness_id: "pi",
        package_name: piName,
        version: "0.73.2",
        integrity: "sha512-AAAA",
        package_path: "research/package-set/node_modules/" + piName,
        lockfile_path: "research/package-set/pnpm-lock.yaml" as const,
        file: "dist/cli.js",
        content_sha256: sha256(script),
      };
      await auditArtifacts([artifact], root);
      const escape = path.join(root, "escape");
      await mkdir(escape, { recursive: true });
      await symlink(
        escape,
        path.join(root, "research/package-set/node_modules/escape"),
      );
      const rejections: Array<[Partial<typeof artifact>, RegExp]> = [
        [{ version: "0.73.1" }, /unavailable/],
        [{ integrity: "sha512-BBBB" }, /lockfile/],
        [{ content_sha256: sha256("other") }, /hash mismatch/],
        [
          { package_path: "research/package-set/node_modules/escape" },
          /escapes/,
        ],
      ];
      for (const [override, auditReason] of rejections)
        await expect(
          auditArtifacts([{ ...artifact, ...override }], root),
        ).rejects.toThrow(auditReason);

      await writeFile(
        path.join(root, "var/managed-packages/recovery.json"),
        JSON.stringify({
          target: "candidates/" + older,
          files: {
            "package.json": await readFile(
              path.join(bytesRoot, "candidates", older, "package.json"),
              "utf8",
            ),
            "pnpm-lock.yaml": await readFile(
              path.join(bytesRoot, "candidates", older, "pnpm-lock.yaml"),
              "utf8",
            ),
          },
        }),
      );
      const next = await updateManaged(root, "pi", piLatest("0.73.1"));
      expect(next.status).toBe("no_change");
      expect(await readlink(path.join(bytesRoot, "current"))).toBe(
        "candidates/" + older,
      );
    } finally {
      await rm(bytesRoot, { recursive: true, force: true });
    }
  },
);
