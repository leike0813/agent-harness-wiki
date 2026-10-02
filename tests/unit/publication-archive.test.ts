import { execFile } from "node:child_process";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { Header, c } from "tar";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import {
  buildOnlineSite,
  deploymentByteLimit,
  verifyOnlineDeployment,
} from "../../src/compiler/online-site.js";
import { sha256 } from "../../src/compiler/projection.js";
import { extractArchive, packArchive } from "../../src/publication/archive.js";

const exec = promisify(execFile);
const temporary: string[] = [];
let root: string;
let deployment: string;

async function temp(): Promise<string> {
  const directory = await mkdtemp(path.join(tmpdir(), "ahw-archive-"));
  temporary.push(directory);
  return directory;
}

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-archive-fixture-"));
  const datasetRoot = path.join(root, "input");
  await cp("tests/fixtures/datasets/chapters", datasetRoot, {
    recursive: true,
  });
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
    "fixture input",
  ]);
  const commit = (await git(["rev-parse", "HEAD"])).stdout.trim();
  deployment = path.join(root, "deployment");
  await buildOnlineSite({
    datasetRoot,
    profile: "fixture",
    commit,
    publishedAt: "2026-10-02T00:00:00Z",
    base: "/wiki/",
    outDir: deployment,
  });
}, 60_000);

afterEach(async () => {
  await Promise.all(
    temporary
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});
afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

test("archive round trip preserves the verified deployment", async () => {
  const file = path.join(root, "site.tar.gz");
  await packArchive(deployment, file);
  expect((await readFile(file)).length).toBeGreaterThan(0);
  const out = path.join(root, "extracted");
  expect(await extractArchive(file, out)).toEqual(
    await verifyOnlineDeployment(deployment),
  );
  const page = "harnesses/demo-open-cli/skills.html";
  expect(await readFile(path.join(out, page), "utf8")).toBe(
    await readFile(path.join(deployment, page), "utf8"),
  );
}, 60_000);

test("packing never replaces an existing archive", async () => {
  const file = path.join(root, "immutable.tar.gz");
  await packArchive(deployment, file);
  const before = sha256(await readFile(file));
  await expect(packArchive(deployment, file)).rejects.toThrow();
  expect(sha256(await readFile(file))).toBe(before);
}, 60_000);

test("extraction requires a new output directory", async () => {
  const file = path.join(root, "occupied.tar.gz");
  await packArchive(deployment, file);
  const out = path.join(root, "occupied");
  await mkdir(out);
  await expect(extractArchive(file, out)).rejects.toThrow(/already exists/);
}, 60_000);

test("extraction rejects traversal, absolute and link entries", async () => {
  const directory = await temp();
  await mkdir(path.join(directory, "inner"));
  await writeFile(path.join(directory, "evil.txt"), "x");
  await symlink("/etc/passwd", path.join(directory, "inner", "link"));
  const cases: { name: string; cwd: string; entries: string[] }[] = [
    {
      name: "traversal",
      cwd: path.join(directory, "inner"),
      entries: ["../evil.txt"],
    },
    {
      name: "absolute",
      cwd: directory,
      entries: [path.join(directory, "evil.txt")],
    },
    { name: "symlink", cwd: directory, entries: ["inner/link"] },
  ];
  for (const entry of cases) {
    const file = path.join(directory, `${entry.name}.tar`);
    await c({ cwd: entry.cwd, file, preservePaths: true }, entry.entries);
    await expect(
      extractArchive(file, path.join(directory, `${entry.name}-out`)),
    ).rejects.toThrow(/unsafe|not allowed/);
    await expect(
      readFile(path.join(directory, `${entry.name}-out`, "evil.txt")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  }
}, 60_000);

test("extraction bounds the expanded byte size", async () => {
  const directory = await temp();
  const file = path.join(directory, "huge.tar");
  const header = new Header({
    path: "huge.bin",
    size: deploymentByteLimit + 1,
    type: "File",
    mode: 0o644,
  });
  const buffer = Buffer.alloc(512);
  header.encode(buffer);
  await writeFile(file, buffer);
  await expect(
    extractArchive(file, path.join(directory, "huge-out")),
  ).rejects.toThrow(/byte limit/);
});

test("packing rejects credential-like entries", async () => {
  const copy = path.join(root, "credential-copy");
  await cp(deployment, copy, { recursive: true });
  await writeFile(path.join(copy, ".env"), "SECRET=1\n");
  const recordPath = path.join(copy, "integrity.json");
  const record = JSON.parse(await readFile(recordPath, "utf8"));
  record.files[".env"] = sha256("SECRET=1\n");
  await writeFile(recordPath, JSON.stringify(record));
  await expect(verifyOnlineDeployment(copy)).resolves.toBeTruthy();
  await expect(
    packArchive(copy, path.join(root, "credential.tar.gz")),
  ).rejects.toThrow(/credential/);
}, 60_000);
