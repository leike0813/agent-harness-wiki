import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat, readFile } from "node:fs/promises";
import { Parser } from "tar";

const MAX_TARBALL = 128 * 1024 * 1024;
const MAX_UNPACKED = 256 * 1024 * 1024;
const MAX_ENTRY = 64 * 1024 * 1024;

export function safePackageEntry(value: string): boolean {
  return (
    value.startsWith("package/") &&
    !value.includes("\\") &&
    !value.includes("\0") &&
    value
      .split("/")
      .every((part) => part !== "." && part !== ".." && part !== "")
  );
}

export async function readArchivedPackageFile(
  tarball: string,
  integrity: string,
  selected?: string,
): Promise<Buffer | undefined> {
  const stat = await lstat(tarball);
  if (!stat.isFile() || stat.size > MAX_TARBALL)
    throw new Error("Package tarball is not a bounded regular file.");
  const actual = `sha512-${createHash("sha512")
    .update(await readFile(tarball))
    .digest("base64")}`;
  if (actual !== integrity)
    throw new Error("Package tarball integrity mismatch.");
  if (selected && !safePackageEntry(selected))
    throw new Error("Unsafe package entry path.");

  let count = 0;
  let unpacked = 0;
  let found: Buffer | undefined;
  await new Promise<void>((resolve, reject) => {
    const input = createReadStream(tarball);
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
        // Strict tar parsing throws after aborting; the original error is returned below.
      }
      reject(error);
    };
    input.on("error", fail);
    parser.on("error", fail);
    parser.on("end", resolve);
    parser.on("entry", (entry) => {
      count += 1;
      unpacked += entry.size;
      if (
        count > 20_000 ||
        unpacked > MAX_UNPACKED ||
        (!(entry.type === "Directory" && /^package\/?$/.test(entry.path)) &&
          !safePackageEntry(
            entry.type === "Directory" && entry.path.endsWith("/")
              ? entry.path.slice(0, -1)
              : entry.path,
          )) ||
        (entry.type !== "File" && entry.type !== "Directory") ||
        entry.size > MAX_ENTRY
      )
        return fail(
          new Error(`Unsafe or oversized package entry: ${entry.path}`),
        );
      if (entry.path === selected && entry.type === "File") {
        const chunks: Buffer[] = [];
        entry.on("data", (chunk: Buffer) => chunks.push(chunk));
        entry.on("end", () => {
          found = Buffer.concat(chunks);
        });
      }
      entry.resume();
    });
    input.pipe(parser);
  });
  if (selected && !found) throw new Error(`Package entry missing: ${selected}`);
  return found;
}
