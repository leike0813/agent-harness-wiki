import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { z } from "zod";

const exec = promisify(execFile);
const ROOT_DIRECTORY = "ahw-source-workspaces";
const MANIFEST_SUFFIX = ".ownership.json";
const MANIFEST_BYTES = 64 * 1024;

export type GitRun = (args: string[]) => Promise<string>;

export interface SourceWorkspace {
  id: string;
  path: string;
  /** Absent means the baseline is unavailable, so every topic needs review. */
  changedPaths?: string[];
  dispose(): Promise<void>;
}

export interface RecoveredSourceWorkspaces {
  removed: string[];
  retained: {
    id: string;
    reason: "owner_alive" | "foreign_project" | "unreadable_manifest";
  }[];
}

const workspaceId = z.string().regex(/^ws-[a-f0-9]{12}-[0-9a-f-]{36}$/);
const commit = z.string().regex(/^[a-f0-9]{40}$/);
const manifestSchema = z.strictObject({
  schema_version: z.literal(1),
  id: workspaceId,
  root: z.string().min(1),
  path: z.string().min(1),
  project_root: z.string().min(1),
  owner_pid: z.number().int().positive(),
  created_at: z.string().min(1),
  repository: z.string().min(1),
  commit,
  baseline: commit.optional(),
});
type Manifest = z.infer<typeof manifestSchema>;

/**
 * Git runs against downloaded source never see the maintainer's global or
 * system configuration: hooks, credential helpers and attribute filters from
 * those files would run inside a checkout we did not write. Repository
 * attributes still apply, so LFS smudge is disabled as well.
 */
export async function runSourceGit(
  args: string[],
  timeoutMs = 600_000,
): Promise<string> {
  const { stdout } = await exec(
    "git",
    [
      "-c",
      "core.hooksPath=/dev/null",
      "-c",
      "credential.helper=",
      "-c",
      "protocol.ext.allow=never",
      ...args,
    ],
    {
      timeout: timeoutMs,
      maxBuffer: 16 * 1024 * 1024,
      env: {
        PATH: process.env.PATH,
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_CONFIG_GLOBAL: "/dev/null",
        GIT_ATTR_NOSYSTEM: "1",
        GIT_TERMINAL_PROMPT: "0",
        GIT_LFS_SKIP_SMUDGE: "1",
      },
    },
  );
  return stdout;
}

export function sourceWorkspaceRoot(): string {
  return path.join(tmpdir(), ROOT_DIRECTORY);
}

function within(parent: string, child: string): boolean {
  const relative = path.relative(parent, child);
  return (
    relative !== "" &&
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

/**
 * The temporary root must be a real directory that neither contains nor is
 * contained by the project, so a source workspace can never be mistaken for
 * one of the project's own checkouts.
 */
async function resolvedRoot(
  projectRoot: string,
): Promise<{ root: string; project: string }> {
  const project = await realpath(path.resolve(projectRoot));
  const root = sourceWorkspaceRoot();
  await mkdir(root, { recursive: true, mode: 0o700 });
  const stat = await lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink())
    throw new Error("Source workspace root is not a real directory.");
  const real = await realpath(root);
  if (real === project || within(project, real) || within(real, project))
    throw new Error("Source workspace root overlaps the project workspace.");
  return { root: real, project };
}

function manifestFile(root: string, id: string): string {
  if (!workspaceId.safeParse(id).success)
    throw new Error(`Invalid source workspace id: ${id}`);
  return path.join(root, `${id}${MANIFEST_SUFFIX}`);
}

async function readManifest(root: string, id: string): Promise<Manifest> {
  const file = manifestFile(root, id);
  const stat = await lstat(file);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > MANIFEST_BYTES)
    throw new Error(`Unsafe source workspace manifest: ${id}`);
  return manifestSchema.parse(JSON.parse(await readFile(file, "utf8")));
}

async function exists(target: string): Promise<boolean> {
  return lstat(target).then(
    () => true,
    (error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return false;
      throw error;
    },
  );
}

export function ownerAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EPERM") return true;
    if ((error as NodeJS.ErrnoException).code === "ESRCH") return false;
    throw error;
  }
}

/**
 * Removal requires the manifest, the resolved root, the checkout directory and
 * the owning project to agree, so neither a foreign project nor a replaced
 * path can delete a live workspace.
 */
async function removeWorkspace(
  root: string,
  project: string,
  id: string,
): Promise<void> {
  if (root !== (await resolvedRoot(project)).root)
    throw new Error(`Source workspace root moved: ${id}`);
  if (!(await exists(manifestFile(root, id)))) {
    // A disposed workspace is gone; an unowned directory is never ours to
    // remove, whoever wrote it.
    if (await exists(path.join(root, id)))
      throw new Error(`Source workspace has no ownership manifest: ${id}`);
    return;
  }
  const manifest = await readManifest(root, id);
  if (manifest.root !== root || manifest.id !== id)
    throw new Error(`Source workspace manifest mismatch: ${id}`);
  if (manifest.project_root !== project)
    throw new Error(`Source workspace belongs to another project: ${id}`);
  const directory = path.join(root, id);
  if (path.resolve(manifest.path) !== directory)
    throw new Error(`Source workspace path mismatch: ${id}`);
  const stat = await lstat(directory);
  if (!stat.isDirectory() || stat.isSymbolicLink())
    throw new Error(`Source workspace is not a directory: ${id}`);
  if ((await realpath(directory)) !== directory || !within(root, directory))
    throw new Error(`Source workspace escapes the workspace root: ${id}`);
  await rm(directory, { recursive: true, force: true });
  try {
    await unlink(manifestFile(root, id));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

async function fetchRevision(
  directory: string,
  revision: string,
  git: GitRun,
): Promise<void> {
  try {
    await git([
      "-C",
      directory,
      "fetch",
      "--quiet",
      "--depth=1",
      "origin",
      revision,
    ]);
    return;
  } catch {
    // A server need not serve an unadvertised object, so an exact fetch of a
    // pinned or baseline revision can be refused. History without blobs is
    // the fallback for a pinned commit that is not a remote tip.
  }
  await git([
    "-C",
    directory,
    "fetch",
    "--quiet",
    "--filter=blob:none",
    "origin",
  ]);
  await git(["-C", directory, "cat-file", "-e", `${revision}^{commit}`]);
}

export async function createSourceWorkspace(input: {
  repository: string;
  commit: string;
  baseline?: string;
  ownerPid?: number;
  projectRoot: string;
  git?: GitRun;
}): Promise<SourceWorkspace> {
  const pinned = commit.parse(input.commit);
  const baseline = input.baseline ? commit.parse(input.baseline) : undefined;
  const owner = z
    .number()
    .int()
    .positive()
    .parse(input.ownerPid ?? process.pid);
  if (input.repository.length === 0)
    throw new Error("Source repository is required.");
  const git = input.git ?? runSourceGit;
  const { root, project } = await resolvedRoot(input.projectRoot);
  const id = `ws-${pinned.slice(0, 12)}-${randomUUID()}`;
  const directory = path.join(root, id);
  // The manifest is written before any content exists, so a workspace left
  // behind by an interrupted run still has a recorded owner to recover.
  await mkdir(directory, { mode: 0o700 });
  const manifest: Manifest = {
    schema_version: 1,
    id,
    root,
    path: directory,
    project_root: project,
    owner_pid: owner,
    created_at: new Date().toISOString(),
    repository: input.repository,
    commit: pinned,
    ...(baseline ? { baseline } : {}),
  };
  await writeFile(
    manifestFile(root, id),
    `${JSON.stringify(manifest, null, 2)}\n`,
    { mode: 0o600, flag: "wx" },
  );
  try {
    await git(["init", "--quiet", directory]);
    await git(["-C", directory, "remote", "add", "origin", input.repository]);
    await fetchRevision(directory, pinned, git);
    await git(["-C", directory, "checkout", "--quiet", "--detach", pinned]);
    const head = (await git(["-C", directory, "rev-parse", "HEAD"])).trim();
    if (head !== pinned)
      throw new Error("Pinned checkout is not at the requested commit.");
    let changedPaths: string[] | undefined;
    if (baseline) {
      try {
        await fetchRevision(directory, baseline, git);
        changedPaths = (
          await git(["-C", directory, "diff", "--name-only", baseline, pinned])
        )
          .split(/\r?\n/)
          .filter(Boolean);
      } catch {
        // The baseline revision is gone from the remote: the change set is
        // unknown, so every topic needs review rather than a narrowed one.
      }
    }
    return {
      id,
      path: directory,
      ...(changedPaths ? { changedPaths } : {}),
      dispose: () => removeWorkspace(root, project, id),
    };
  } catch (error) {
    await removeWorkspace(root, project, id).catch(() => {});
    throw error;
  }
}

export async function closeSourceWorkspace(input: {
  id: string;
  projectRoot: string;
}): Promise<void> {
  const { root, project } = await resolvedRoot(input.projectRoot);
  await removeWorkspace(root, project, input.id);
}

/** Enumerate this task's records even if its worker never returned an ID. */
export async function listSourceWorkspaces(
  projectRoot: string,
  ownerPid: number,
): Promise<{ id: string; path: string; commit: string }[]> {
  const { root, project } = await resolvedRoot(projectRoot);
  const result: { id: string; path: string; commit: string }[] = [];
  for (const entry of (await readdir(root)).sort()) {
    if (!entry.endsWith(MANIFEST_SUFFIX)) continue;
    const id = entry.slice(0, -MANIFEST_SUFFIX.length);
    try {
      const manifest = await readManifest(root, id);
      if (
        manifest.project_root === project &&
        manifest.owner_pid === ownerPid &&
        manifest.id === id &&
        manifest.root === root &&
        manifest.path === path.join(root, id)
      )
        result.push({ id, path: manifest.path, commit: manifest.commit });
    } catch {
      /* Unreadable ownership is never inferred. */
    }
  }
  return result;
}

export async function recoverSourceWorkspaces(
  projectRoot: string,
): Promise<RecoveredSourceWorkspaces> {
  const { root, project } = await resolvedRoot(projectRoot);
  const removed: string[] = [];
  const retained: RecoveredSourceWorkspaces["retained"] = [];
  for (const entry of (await readdir(root)).sort()) {
    if (!entry.endsWith(MANIFEST_SUFFIX)) continue;
    const id = entry.slice(0, -MANIFEST_SUFFIX.length);
    if (!workspaceId.safeParse(id).success) {
      retained.push({ id: entry, reason: "unreadable_manifest" });
      continue;
    }
    let manifest: Manifest;
    try {
      manifest = await readManifest(root, id);
    } catch {
      retained.push({ id, reason: "unreadable_manifest" });
      continue;
    }
    if (manifest.project_root !== project) {
      retained.push({ id, reason: "foreign_project" });
      continue;
    }
    if (ownerAlive(manifest.owner_pid)) {
      retained.push({ id, reason: "owner_alive" });
      continue;
    }
    try {
      await removeWorkspace(root, project, id);
      removed.push(id);
    } catch {
      retained.push({ id, reason: "unreadable_manifest" });
    }
  }
  return { removed, retained };
}
