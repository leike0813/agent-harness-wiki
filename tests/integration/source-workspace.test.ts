import { execFile, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, expect, test } from "vitest";
import {
  closeSourceWorkspace,
  createSourceWorkspace,
  listSourceWorkspaces,
  recoverSourceWorkspaces,
  runSourceGit,
  sourceWorkspaceRoot,
  type SourceWorkspace,
} from "../../src/sources/workspace.js";

const run = promisify(execFile);
const temporary: string[] = [];
const workspaces: SourceWorkspace[] = [];

afterEach(async () => {
  for (const workspace of workspaces.splice(0))
    await workspace.dispose().catch(() => {});
  for (const root of temporary.splice(0))
    await rm(root, { recursive: true, force: true });
});

async function scratch(prefix: string): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), prefix));
  temporary.push(root);
  return root;
}

async function repository(): Promise<{
  dir: string;
  first: string;
  second: string;
}> {
  const dir = await scratch("ahw-workspace-repo-");
  const git = async (args: string[]): Promise<string> => {
    const { stdout } = await run("git", [
      "-c",
      "user.name=Source Workspace",
      "-c",
      "user.email=workspace@example.invalid",
      "-c",
      "commit.gpgsign=false",
      "-C",
      dir,
      ...args,
    ]);
    return stdout;
  };
  await git(["init", "-q", "-b", "main"]);
  await writeFile(path.join(dir, "README.md"), "first\n");
  await git(["add", "README.md"]);
  await git(["commit", "-q", "-m", "first"]);
  const first = (await git(["rev-parse", "HEAD"])).trim();
  await mkdir(path.join(dir, "src"));
  await writeFile(path.join(dir, "README.md"), "second\n");
  await writeFile(path.join(dir, "src/config.json"), "{}\n");
  await git(["add", "-A"]);
  await git(["commit", "-q", "-m", "second"]);
  const second = (await git(["rev-parse", "HEAD"])).trim();
  return { dir, first, second };
}

async function deadPid(): Promise<number> {
  const child = spawn(process.execPath, ["-e", "0"], { stdio: "ignore" });
  const pid = child.pid;
  if (pid === undefined) throw new Error("Failed to spawn an owner process.");
  await new Promise<void>((resolve, reject) => {
    child.on("exit", () => resolve());
    child.on("error", reject);
  });
  return pid;
}

async function open(
  input: Parameters<typeof createSourceWorkspace>[0],
): Promise<SourceWorkspace> {
  const workspace = await createSourceWorkspace(input);
  workspaces.push(workspace);
  return workspace;
}

async function present(target: string): Promise<boolean> {
  return stat(target).then(
    () => true,
    (error: NodeJS.ErrnoException) => error.code !== "ENOENT",
  );
}

test("pins the requested commit in a detached checkout outside the project", async () => {
  const projectRoot = await scratch("ahw-workspace-project-");
  const repo = await repository();
  const workspace = await open({
    repository: repo.dir,
    commit: repo.second,
    baseline: repo.first,
    projectRoot,
  });
  expect(path.dirname(workspace.path)).toBe(sourceWorkspaceRoot());
  const relative = path.relative(projectRoot, workspace.path);
  expect(relative.startsWith("..")).toBe(true);
  expect(
    (await runSourceGit(["-C", workspace.path, "rev-parse", "HEAD"])).trim(),
  ).toBe(repo.second);
  await expect(
    runSourceGit(["-C", workspace.path, "symbolic-ref", "-q", "HEAD"]),
  ).rejects.toThrow();
  expect(
    await readFile(path.join(workspace.path, "src/config.json"), "utf8"),
  ).toBe("{}\n");
  expect(workspace.changedPaths).toEqual(["README.md", "src/config.json"]);
  expect(await listSourceWorkspaces(projectRoot, process.pid)).toEqual([
    { id: workspace.id, path: workspace.path, commit: repo.second },
  ]);
  expect(await listSourceWorkspaces(projectRoot, process.pid + 1)).toEqual([]);
  expect(await present(path.join(projectRoot, "src"))).toBe(false);
});

test("reports an empty change set when the baseline is the pinned commit", async () => {
  const projectRoot = await scratch("ahw-workspace-project-");
  const repo = await repository();
  const workspace = await open({
    repository: repo.dir,
    commit: repo.second,
    baseline: repo.second,
    projectRoot,
  });
  expect(workspace.changedPaths).toEqual([]);
});

test("omits the change set when the baseline is unavailable", async () => {
  const projectRoot = await scratch("ahw-workspace-project-");
  const repo = await repository();
  const missing = createHash("sha1").update("absent baseline").digest("hex");
  const workspace = await open({
    repository: repo.dir,
    commit: repo.second,
    baseline: missing,
    projectRoot,
  });
  expect(workspace.changedPaths).toBeUndefined();
  expect(
    (await runSourceGit(["-C", workspace.path, "rev-parse", "HEAD"])).trim(),
  ).toBe(repo.second);
});

test("disposes the workspace and its ownership manifest", async () => {
  const projectRoot = await scratch("ahw-workspace-project-");
  const repo = await repository();
  const workspace = await open({
    repository: repo.dir,
    commit: repo.second,
    projectRoot,
  });
  const manifest = path.join(
    sourceWorkspaceRoot(),
    `${workspace.id}.ownership.json`,
  );
  expect(await present(manifest)).toBe(true);
  await workspace.dispose();
  expect(await present(workspace.path)).toBe(false);
  expect(await present(manifest)).toBe(false);
  await expect(workspace.dispose()).resolves.toBeUndefined();
});

test("leaves no workspace behind when retrieval fails", async () => {
  const projectRoot = await scratch("ahw-workspace-project-");
  const repo = await repository();
  const root = sourceWorkspaceRoot();
  const before = (await readdir(root).catch(() => [])).sort();
  await expect(
    createSourceWorkspace({
      repository: repo.dir,
      commit: createHash("sha1").update("absent commit").digest("hex"),
      projectRoot,
    }),
  ).rejects.toThrow();
  expect((await readdir(root).catch(() => [])).sort()).toEqual(before);
  await expect(
    createSourceWorkspace({
      repository: repo.dir,
      commit: repo.second.slice(0, 39),
      projectRoot,
    }),
  ).rejects.toThrow();
});

test("recovers only the dead owners of the same project", async () => {
  const project = await scratch("ahw-workspace-project-");
  const other = await scratch("ahw-workspace-other-");
  const repo = await repository();
  const dead = await deadPid();
  const stale = await open({
    repository: repo.dir,
    commit: repo.second,
    ownerPid: dead,
    projectRoot: project,
  });
  const live = await open({
    repository: repo.dir,
    commit: repo.second,
    ownerPid: process.pid,
    projectRoot: project,
  });
  const foreign = await open({
    repository: repo.dir,
    commit: repo.second,
    ownerPid: dead,
    projectRoot: other,
  });
  const recovered = await recoverSourceWorkspaces(project);
  expect(recovered.removed).toEqual([stale.id]);
  expect(recovered.retained).toEqual(
    expect.arrayContaining([
      { id: live.id, reason: "owner_alive" },
      { id: foreign.id, reason: "foreign_project" },
    ]),
  );
  expect(recovered.retained).toHaveLength(2);
  expect(await present(stale.path)).toBe(false);
  expect(await present(live.path)).toBe(true);
  expect(await present(foreign.path)).toBe(true);
});

test("refuses to close a workspace owned by another project", async () => {
  const project = await scratch("ahw-workspace-project-");
  const other = await scratch("ahw-workspace-other-");
  const repo = await repository();
  const foreign = await open({
    repository: repo.dir,
    commit: repo.second,
    projectRoot: other,
  });
  await expect(
    closeSourceWorkspace({ id: foreign.id, projectRoot: project }),
  ).rejects.toThrow(/another project/);
  expect(await present(foreign.path)).toBe(true);
  await expect(
    closeSourceWorkspace({ id: "../escape", projectRoot: other }),
  ).rejects.toThrow(/Invalid source workspace id/);
  await closeSourceWorkspace({ id: foreign.id, projectRoot: other });
  expect(await present(foreign.path)).toBe(false);
});
