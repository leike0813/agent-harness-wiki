import { createReadStream, createWriteStream } from "node:fs";
import { lstat, mkdir, mkdtemp, rename, rm } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";
import { Pack, Parser, type ReadEntry } from "tar";
import {
  deploymentByteLimit,
  inventory,
  verifyOnlineDeployment,
} from "../compiler/online-site.js";

const entryLimit = 200_000;
// ponytail: name-based guard only; the verified deployment is the real boundary.
const credentialName =
  /^(?:\.env(?:\..+)?|\.npmrc|\.netrc|credentials(?:\.json)?|id_(?:rsa|ed25519))$/;

/**
 * Pack one verified deployment into a gzipped tarball whose entries mirror the
 * deployment directory. The archive is immutable: an existing target is never
 * replaced, and no credentials or local originals may enter it.
 */
export async function packArchive(
  directory: string,
  file: string,
): Promise<void> {
  await verifyOnlineDeployment(directory);
  const source = path.resolve(directory);
  const target = path.resolve(file);
  const files = await inventory(source);
  for (const relative of files)
    for (const part of relative.split("/"))
      if (credentialName.test(part))
        throw new Error(`Archive entry looks like a credential: ${relative}`);
  await mkdir(path.dirname(target), { recursive: true });
  const pack = new Pack({ cwd: source, portable: true, noMtime: true });
  // "wx" reserves the target exclusively so a retry cannot replace published bytes.
  const done = pipeline(
    pack,
    createGzip(),
    createWriteStream(target, { flags: "wx", mode: 0o644 }),
  );
  try {
    for (const relative of files) pack.add(relative);
    pack.end();
    await done;
  } catch (error) {
    pack.destroy();
    await done.catch(() => undefined);
    if ((error as NodeJS.ErrnoException).code !== "EEXIST")
      await rm(target, { force: true });
    throw error;
  }
}

type VerifiedDeployment = { releaseId: string; bytes: number; files: number };

function safeEntry(entry: ReadEntry): string {
  if (entry.type !== "File" && entry.type !== "Directory")
    throw new Error(
      `Archive entry type is not allowed: ${entry.path} (${entry.type})`,
    );
  const raw =
    entry.type === "Directory" ? entry.path.replace(/\/+$/, "") : entry.path;
  if (raw === ".") return "";
  const parts = raw.split("/");
  if (
    raw.includes("\\") ||
    raw.includes("\0") ||
    /^[a-zA-Z]:/.test(raw) ||
    path.posix.isAbsolute(raw) ||
    parts.some((part) => part === "" || part === "." || part === "..")
  )
    throw new Error(`Archive entry path is unsafe: ${entry.path}`);
  return parts.join("/");
}

/**
 * Walk an archive once, rejecting unsafe or oversized entries. With a writer
 * the file bodies are written below the walk; without one this is a dry run
 * that validates before any output is created.
 */
async function readArchive(
  file: string,
  write?: (entry: ReadEntry, relative: string) => Promise<void>,
): Promise<void> {
  let count = 0;
  let bytes = 0;
  const seen = new Set<string>();
  await new Promise<void>((resolve, reject) => {
    const input = createReadStream(file);
    const parser = new Parser({ strict: true });
    let stopped = false;
    const fail = (error: Error): void => {
      if (stopped) return;
      stopped = true;
      input.unpipe(parser);
      input.destroy();
      try {
        parser.abort(error);
      } catch {
        // Strict parsing can throw while aborting; the original error stands.
      }
      reject(error);
    };
    input.on("error", fail);
    parser.on("error", fail);
    parser.on("end", resolve);
    parser.on("entry", (entry) => {
      try {
        const relative = safeEntry(entry);
        if (!relative) {
          entry.resume();
          return;
        }
        count += 1;
        bytes += entry.size;
        if (count > entryLimit)
          throw new Error("Archive contains too many entries.");
        if (bytes > deploymentByteLimit)
          throw new Error("Archive exceeds the expanded byte limit.");
        if (seen.has(relative))
          throw new Error(`Duplicate archive entry: ${relative}`);
        seen.add(relative);
        if (!write || entry.type === "Directory") {
          entry.resume();
          return;
        }
        write(entry, relative).catch(fail);
      } catch (error) {
        fail(error as Error);
      }
    });
    input.pipe(parser);
  });
}

async function assertMissing(output: string): Promise<void> {
  try {
    await lstat(output);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
    throw error;
  }
  throw new Error(`Archive output already exists: ${output}`);
}

/**
 * Validate an archive completely, then extract it into a fresh directory and
 * return the verified deployment it contains. The output must not exist, and
 * unsafe paths, links or special entries are rejected before any write.
 */
export async function extractArchive(
  file: string,
  outDir: string,
): Promise<VerifiedDeployment> {
  const source = path.resolve(file);
  const output = path.resolve(outDir);
  const info = await lstat(source);
  if (!info.isFile() || info.isSymbolicLink())
    throw new Error("Archive must be a regular file.");
  if (info.size > deploymentByteLimit)
    throw new Error("Archive exceeds the expanded byte limit.");
  await assertMissing(output);
  await readArchive(source);
  const parent = path.dirname(output);
  await mkdir(parent, { recursive: true });
  const stage = await mkdtemp(path.join(parent, ".archive-staging-"));
  try {
    await readArchive(source, async (entry, relative) => {
      const target = path.join(stage, relative);
      await mkdir(path.dirname(target), { recursive: true });
      await pipeline(
        entry,
        createWriteStream(target, { flags: "wx", mode: 0o644 }),
      );
    });
    const verified = await verifyOnlineDeployment(stage);
    await rename(stage, output);
    return verified;
  } catch (error) {
    await rm(stage, { recursive: true, force: true });
    throw error;
  }
}
