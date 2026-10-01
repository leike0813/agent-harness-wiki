import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { lstat, readFile, realpath } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import type { Artifact } from "../domain/schema.js";
import { loadAndValidateDataset } from "../validation/dataset.js";
import { readArchivedPackageFile } from "./package-archive.js";
import {
  managedStorage,
  selectedManagedDirectory,
  within,
} from "./managed-storage.js";

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
      } else if (artifact.kind === "archived_package_file") {
        const bytes = await readArchivedPackageFile(
          await localPath(originalsRoot, artifact.tarball_path),
          artifact.integrity,
          artifact.file,
        );
        if (
          !bytes ||
          createHash("sha256").update(bytes).digest("hex") !==
            artifact.content_sha256
        )
          throw new Error("Archived package file hash mismatch.");
      } else if (artifact.kind === "managed_package") {
        const selected = await selectedManagedDirectory(
          originalsRoot,
          await managedStorage(originalsRoot),
        );
        const virtualStore = path.join(selected, "node_modules/.pnpm");
        if ((await realpath(virtualStore)) !== virtualStore)
          throw new Error("Managed virtual store escapes snapshot.");
        const packageLink = path.join(originalsRoot, artifact.package_path);
        let packageDir: string;
        try {
          packageDir = await realpath(packageLink);
        } catch {
          throw new Error(
            `Managed package original unavailable: ${artifact.package_path}`,
          );
        }
        if (!within(virtualStore, packageDir))
          throw new Error(
            "Managed package link escapes the dedicated package set.",
          );
        const packageJsonFile = await localPath(packageDir, "package.json");
        if ((await lstat(packageJsonFile)).size > 1024 * 1024)
          throw new Error("Managed package manifest exceeds the audit limit.");
        const packageJson = JSON.parse(
          await readFile(packageJsonFile, "utf8"),
        ) as { name?: unknown; version?: unknown };
        if (packageJson.version !== artifact.version)
          throw new Error(
            `Managed package original unavailable: ${artifact.package_name}@${artifact.version}`,
          );
        if (packageJson.name !== artifact.package_name)
          throw new Error("Managed package name differs.");
        const lockfile = YAML.parse(
          await readFile(
            await localPath(originalsRoot, artifact.lockfile_path),
            "utf8",
          ),
        ) as {
          packages?: Record<string, { resolution?: { integrity?: string } }>;
          importers?: Record<
            string,
            { dependencies?: Record<string, { specifier?: string }> }
          >;
        };
        if (
          lockfile.packages?.[`${artifact.package_name}@${artifact.version}`]
            ?.resolution?.integrity !== artifact.integrity ||
          lockfile.importers?.["."]?.dependencies?.[artifact.package_name]
            ?.specifier !== artifact.version
        )
          throw new Error(
            "Managed package differs from the fixed pnpm lockfile.",
          );
        await checkedHash(packageDir, artifact.file, artifact.content_sha256);
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
  if (validated.catalog) {
    for (const ref of validated.catalog.references)
      await checkedHash(
        originalsRoot,
        ref.snapshot.archive_path,
        ref.snapshot.sha256,
      );
  }
  const artifacts = new Map(
    validated.dataset.artifacts.map((item) => [item.artifact_id, item]),
  );
  const snapshots = new Map(
    validated.dataset.snapshots.map((item) => [item.snapshot_id, item]),
  );
  for (const evidence of validated.dataset.evidence) {
    const snapshot = snapshots.get(evidence.snapshot_id);
    if (!snapshot || !("kind" in snapshot) || snapshot.kind !== "npm_release")
      continue;
    const artifact = artifacts.get(snapshot.artifact_id);
    if (
      artifact?.kind !== "managed_package" &&
      artifact?.kind !== "archived_package_file"
    )
      continue;
    const source =
      artifact.kind === "managed_package"
        ? await readFile(
            await localPath(
              await realpath(path.join(originalsRoot, artifact.package_path)),
              artifact.file,
            ),
            "utf8",
          )
        : ((
            await readArchivedPackageFile(
              await localPath(originalsRoot, artifact.tarball_path),
              artifact.integrity,
              artifact.file,
            )
          )?.toString("utf8") ?? "");
    const located =
      evidence.locator.kind === "line"
        ? source
            .split(/\r?\n/)
            .slice(evidence.locator.start - 1, evidence.locator.end)
            .join("\n")
            .includes(evidence.excerpt)
        : source.includes(evidence.locator.heading) &&
          source.includes(evidence.excerpt);
    if (!located)
      throw new Error(
        `Evidence ${evidence.evidence_id}: package locator differs from original.`,
      );
  }
}
