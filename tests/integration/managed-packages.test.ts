import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import {
  checkCurrentManaged,
  observeManaged,
  promoteCandidate,
  sandboxStartup,
} from "../../src/sources/managed.js";

const roots: string[] = [];
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
    const result = await observeManaged(root, "codex-cli", fetchImpl);
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
