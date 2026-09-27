import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { lstat, readFile, realpath } from "node:fs/promises";
import path from "node:path";
import type { Artifact } from "../domain/schema.js";
import { loadAndValidateDataset } from "../validation/dataset.js";

const run = promisify(execFile);

async function localPath(root: string, relative: string): Promise<string> {
  if (
    path.isAbsolute(relative) ||
    /^[a-zA-Z]:/.test(relative) ||
    relative.includes("\0") ||
    relative
      .split("/")
      .some(
        (part) => !part || part === "." || part === ".." || part.includes("\\"),
      )
  )
    throw new Error(`Unsafe original path: ${relative}`);
  let cursor = await realpath(root);
  const base = cursor;
  for (const part of relative.split("/")) {
    cursor = path.join(cursor, part);
    if ((await lstat(cursor)).isSymbolicLink())
      throw new Error(`Symlink in original path: ${relative}`);
  }
  if (!cursor.startsWith(`${base}${path.sep}`))
    throw new Error(`Original escapes root: ${relative}`);
  return cursor;
}

async function checkedHash(
  root: string,
  relative: string,
  expected: string,
): Promise<void> {
  const file = await localPath(root, relative);
  const stat = await lstat(file);
  if (!stat.isFile() || stat.size > 16 * 1024 * 1024)
    throw new Error(`Original is not a bounded file: ${relative}`);
  const actual = createHash("sha256")
    .update(await readFile(file))
    .digest("hex");
  if (actual !== expected)
    throw new Error(`Original hash mismatch: ${relative}`);
}

export async function auditArtifacts(
  artifacts: Artifact[],
  originalsRoot: string,
): Promise<void> {
  for (const artifact of artifacts) {
    try {
      if (artifact.kind === "archived_document") {
        await checkedHash(
          originalsRoot,
          artifact.archive_path,
          artifact.raw_sha256,
        );
      } else {
        const checkout = await localPath(originalsRoot, artifact.checkout_path);
        if (!(await lstat(checkout)).isDirectory())
          throw new Error("Checkout is not a directory.");
        const { stdout } = await run("git", [
          "-C",
          checkout,
          "rev-parse",
          "HEAD",
        ]);
        if (stdout.trim() !== artifact.commit)
          throw new Error(`Checkout commit differs: ${stdout.trim()}`);
        await checkedHash(
          originalsRoot,
          `${artifact.checkout_path}/${artifact.file}`,
          artifact.content_sha256,
        );
      }
    } catch (error) {
      throw new Error(`Artifact ${artifact.artifact_id}: ${String(error)}`);
    }
  }
}

export async function auditSources(
  datasetRoot: string,
  originalsRoot: string,
): Promise<void> {
  const validated = await loadAndValidateDataset({
    root: datasetRoot,
    profile: "production",
  });
  if (!validated.ok) throw new Error("Production source metadata is invalid.");
  await auditArtifacts(validated.dataset.artifacts, originalsRoot);
}
