import { constants } from "node:fs";
import {
  access,
  lstat,
  mkdir,
  open,
  readFile,
  readlink,
  realpath,
  rename,
  symlink,
  unlink,
} from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import Database from "better-sqlite3";
import { z } from "zod";

const absolute = z
  .string()
  .refine((value) => path.isAbsolute(value) && path.normalize(value) === value);
const configSchema = z
  .object({
    bytesRoot: absolute,
    mountPoint: absolute,
    mountSource: z.string().min(1),
  })
  .strict();
export type ManagedStorage = z.infer<typeof configSchema> & {
  candidates: string;
};
const metadataFiles = ["package.json", "pnpm-lock.yaml"] as const;
const exec = promisify(execFile);

async function checkNfsAcl(file: string): Promise<void> {
  const { stdout } = await exec(
    "getfattr",
    ["-h", "--only-values", "-n", "system.nfs4_acl", "--", file],
    { encoding: "buffer", maxBuffer: 65536 },
  );
  let offset = 0;
  const number = (): number => {
    const value = stdout.readUInt32BE(offset);
    offset += 4;
    return value;
  };
  const count = number();
  for (let i = 0; i < count; i++) {
    const type = number();
    number(); // ACE flags; both effective and inherited write grants are checked.
    const mask = number();
    const length = number();
    if (length > stdout.length - offset) throw new Error("Invalid NFS ACL");
    const who = stdout.subarray(offset, offset + length).toString("utf8");
    offset += Math.ceil(length / 4) * 4;
    // RFC 7530: data/attribute writes, deletion, WRITE_ACL and WRITE_OWNER.
    if (type === 0 && who !== "OWNER@" && (mask & 0x000d0156) !== 0)
      throw new Error("Managed NFS ACL grants writes beyond the owner");
  }
  if (offset !== stdout.length) throw new Error("Invalid NFS ACL");
}
const journalSchema = z
  .object({
    target: z.string().regex(/^candidates\/[a-f0-9-]{36}$/),
    files: z
      .object({ "package.json": z.string(), "pnpm-lock.yaml": z.string() })
      .strict(),
  })
  .strict();

export function within(root: string, file: string): boolean {
  const relative = path.relative(root, file);
  return (
    relative !== "" &&
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

export async function managedStorage(
  root: string,
): Promise<ManagedStorage | undefined> {
  let text: string;
  try {
    const configFile = path.join(root, "var/managed-packages/storage.json");
    if (!(await lstat(configFile)).isFile())
      throw new Error(
        "Managed storage configuration must be a regular local file",
      );
    text = await readFile(configFile, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
  const config = configSchema.parse(JSON.parse(text));
  if (!within(config.mountPoint, config.bytesRoot))
    throw new Error("Managed bytes root escapes mount point");
  // Inspect the kernel mount table before touching any configured remote path.
  const mounts = (await readFile("/proc/self/mountinfo", "utf8"))
    .trim()
    .split("\n")
    .map((line) => {
      const [left, right] = line.split(" - ");
      const fields = left!.split(" ");
      const remote = right!.split(" ");
      const decode = (value: string): string =>
        value.replace(/\\([0-7]{3})/g, (_, octal: string) =>
          String.fromCharCode(parseInt(octal, 8)),
        );
      return {
        target: decode(fields[4]!),
        type: remote[0],
        source: decode(remote[1]!),
      };
    });
  if (mounts.some((mount) => within(config.bytesRoot, mount.target)))
    throw new Error("Nested mount inside managed storage");
  const localStore = path.join(await realpath(root), ".pnpm-store/v11");
  const indexMount = mounts
    .filter(
      (item) => item.target === localStore || within(item.target, localStore),
    )
    .sort((a, b) => b.target.length - a.target.length)[0];
  if (
    indexMount &&
    ["nfs", "nfs4", "cifs", "smb3"].includes(indexMount.type ?? "")
  )
    throw new Error("Managed store index must remain local");
  if (mounts.some((mount) => within(localStore, mount.target)))
    throw new Error("Mount inside local managed store index");
  for (const file of [
    config.bytesRoot,
    path.join(config.bytesRoot, "candidates"),
    path.join(config.bytesRoot, "store/v11/files"),
    path.join(config.bytesRoot, "store/v11/tmp"),
  ]) {
    const mount = mounts
      .filter((item) => item.target === file || within(item.target, file))
      .sort((a, b) => b.target.length - a.target.length)[0];
    if (
      mount?.target !== config.mountPoint ||
      mount.source !== config.mountSource ||
      !["nfs", "nfs4"].includes(mount.type ?? "")
    )
      throw new Error("Managed NFS mount missing or mismatched");
    if ((await realpath(file)) !== file)
      throw new Error("Managed storage directory escapes configured layout");
    const info = await lstat(file);
    if (
      !info.isDirectory() ||
      info.uid !== process.getuid?.() ||
      (info.mode & 0o022) !== 0 ||
      (info.mode & 0o005) !== 0o005
    )
      throw new Error("Unsafe managed storage permissions");
    await access(file, constants.R_OK | constants.W_OK | constants.X_OK);
    if (mount.type === "nfs4") await checkNfsAcl(file);
  }
  const candidates = path.join(config.bytesRoot, "candidates");
  for (const [local, remote] of [
    ["var/managed-packages/candidates", candidates],
    [".pnpm-store/v11/files", path.join(config.bytesRoot, "store/v11/files")],
    [".pnpm-store/v11/tmp", path.join(config.bytesRoot, "store/v11/tmp")],
  ]) {
    if (
      !(await lstat(path.join(root, local!))).isSymbolicLink() ||
      (await realpath(path.join(root, local!))) !== remote
    )
      throw new Error("Managed storage link differs from configured layout");
  }
  if (
    (await realpath(path.join(root, ".pnpm-store/v11"))) !==
    path.join(root, ".pnpm-store/v11")
  )
    throw new Error("Managed store index must remain local");
  for (const file of ["index.db", "index.db-wal", "index.db-shm", "projects"]) {
    try {
      if (
        (await lstat(path.join(root, ".pnpm-store/v11", file))).isSymbolicLink()
      )
        throw new Error("Managed store index must remain local");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  return { ...config, candidates };
}

export async function selectedManagedDirectory(
  root: string,
  storage: ManagedStorage | undefined,
): Promise<string> {
  root = await realpath(root);
  const selected = path.join(root, "research/package-set");
  if (!storage) {
    const modules = path.join(selected, "node_modules");
    if (
      (await lstat(modules)).isSymbolicLink() ||
      (await realpath(modules)) !== modules
    )
      throw new Error("Unconfigured external managed package set");
    return selected;
  }
  try {
    await lstat(path.join(root, "var/managed-packages/recovery.json"));
    throw new Error("Managed promotion requires recovery");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  const pointer = path.join(storage.bytesRoot, "current");
  const localModules = path.join(selected, "node_modules");
  if (
    path.resolve(path.dirname(localModules), await readlink(localModules)) !==
    path.join(pointer, "node_modules")
  )
    throw new Error("Managed package set must follow current pointer");
  const target = await readlink(pointer);
  if (!/^candidates\/[a-f0-9-]{36}$/.test(target))
    throw new Error("Unsafe managed current pointer");
  const dir = path.join(storage.bytesRoot, target);
  if (
    (await realpath(pointer)) !== dir ||
    (await realpath(path.join(dir, "node_modules"))) !==
      path.join(dir, "node_modules") ||
    (await realpath(path.join(selected, "node_modules"))) !==
      path.join(dir, "node_modules")
  )
    throw new Error("Managed current link escapes snapshot");
  for (const file of metadataFiles) {
    if (
      (await lstat(path.join(dir, file))).isSymbolicLink() ||
      (await readFile(path.join(dir, file), "utf8")) !==
        (await readFile(path.join(selected, file), "utf8"))
    )
      throw new Error("Selected metadata differs from managed snapshot");
  }
  return dir;
}

async function atomicFile(file: string, text: string): Promise<void> {
  const temporary = `${file}.${randomUUID()}.tmp`;
  const handle = await open(temporary, "wx", 0o644);
  try {
    try {
      await handle.writeFile(text);
      await handle.sync();
    } finally {
      await handle.close();
    }
    await rename(temporary, file);
    const directory = await open(path.dirname(file), "r");
    try {
      await directory.sync();
    } finally {
      await directory.close();
    }
  } finally {
    await unlink(temporary).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
}

async function currentPointer(
  storage: ManagedStorage,
  target: string,
): Promise<void> {
  const temporary = path.join(storage.bytesRoot, `.current-${randomUUID()}`);
  await symlink(target, temporary);
  try {
    await rename(temporary, path.join(storage.bytesRoot, "current"));
  } finally {
    await unlink(temporary).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
}

// SQLite releases this local lock on process exit, including interrupted promotions.
export async function withManagedLock<T>(
  root: string,
  operation: () => Promise<T>,
): Promise<T> {
  await mkdir(path.join(root, "var/managed-packages"), { recursive: true });
  const db = new Database(
    path.join(root, "var/managed-packages/operation-lock.sqlite"),
    { timeout: 0 },
  );
  try {
    db.exec("BEGIN IMMEDIATE");
    return await operation();
  } finally {
    db.close();
  }
}

export async function recoverManaged(
  root: string,
  storage: ManagedStorage,
): Promise<void> {
  const journal = path.join(root, "var/managed-packages/recovery.json");
  let text: string;
  try {
    text = await readFile(journal, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
    throw error;
  }
  const recovery = journalSchema.parse(JSON.parse(text));
  if (
    (await realpath(path.join(storage.bytesRoot, recovery.target))) !==
    path.join(storage.bytesRoot, recovery.target)
  )
    throw new Error("Unsafe recovery snapshot");
  for (const file of metadataFiles) {
    const snapshotFile = path.join(storage.bytesRoot, recovery.target, file);
    if (!(await lstat(snapshotFile)).isFile())
      throw new Error("Unsafe recovery metadata");
    if ((await readFile(snapshotFile, "utf8")) !== recovery.files[file])
      throw new Error("Recovery metadata differs from prior snapshot");
  }
  await currentPointer(storage, recovery.target);
  for (const file of metadataFiles)
    await atomicFile(
      path.join(root, "research/package-set", file),
      recovery.files[file],
    );
  await unlink(journal);
}

export async function promoteExternal(
  root: string,
  candidate: string,
  storage: ManagedStorage,
): Promise<void> {
  await recoverManaged(root, storage);
  await selectedManagedDirectory(root, storage);
  if (
    path.dirname(candidate) !== storage.candidates ||
    !/^[a-f0-9-]{36}$/.test(path.basename(candidate)) ||
    (await realpath(candidate)) !== candidate
  )
    throw new Error("Unsafe external candidate");
  for (const file of [...metadataFiles, "node_modules"]) {
    const item = await lstat(path.join(candidate, file));
    if (
      item.isSymbolicLink() ||
      (file === "node_modules" ? !item.isDirectory() : !item.isFile())
    )
      throw new Error(`Unsafe candidate ${file}`);
  }
  const journal = path.join(root, "var/managed-packages/recovery.json");
  const files = {
    "package.json": await readFile(
      path.join(root, "research/package-set/package.json"),
      "utf8",
    ),
    "pnpm-lock.yaml": await readFile(
      path.join(root, "research/package-set/pnpm-lock.yaml"),
      "utf8",
    ),
  };
  await atomicFile(
    journal,
    JSON.stringify({
      target: await readlink(path.join(storage.bytesRoot, "current")),
      files,
    }),
  );
  try {
    for (const file of metadataFiles)
      await atomicFile(
        path.join(root, "research/package-set", file),
        await readFile(path.join(candidate, file), "utf8"),
      );
    await currentPointer(storage, `candidates/${path.basename(candidate)}`);
    for (const file of metadataFiles) {
      if (
        (await readFile(
          path.join(root, "research/package-set", file),
          "utf8",
        )) !== (await readFile(path.join(candidate, file), "utf8"))
      )
        throw new Error("Promoted metadata differs from candidate");
    }
    await unlink(journal);
  } catch (error) {
    await recoverManaged(root, storage);
    throw error;
  }
}
