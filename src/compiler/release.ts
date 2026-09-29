import { randomUUID } from "node:crypto";
import {
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rm,
  open,
  writeFile,
  unlink,
} from "node:fs/promises";
import path from "node:path";
import Database from "better-sqlite3";
import * as z from "zod";
import {
  publishedKnowledgeSchema,
  releaseManifestSchema,
  type PublishedKnowledge,
} from "../domain/schema.js";
import { loadAndValidateDataset } from "../validation/dataset.js";
import { renderDocs } from "./docs.js";
import { canonical, publishedRecords, sha256 } from "./projection.js";
import { writeSqlite } from "./sqlite.js";

const optionsSchema = z.strictObject({
  datasetRoot: z.string().min(1),
  profile: z.enum(["fixture", "production"]),
  releaseId: z.string().regex(/^[a-z][a-z0-9_-]*$/),
  publishedAt: z.iso.datetime(),
  releasesRoot: z.string().min(1),
});
export type CompileOptions = z.infer<typeof optionsSchema>;
export type ReleaseManifest = z.infer<typeof releaseManifestSchema>;

async function exists(file: string): Promise<boolean> {
  try {
    await lstat(file);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

async function artifactPaths(root: string, relative = ""): Promise<string[]> {
  const found: string[] = [];
  for (const item of await readdir(path.join(root, relative), {
    withFileTypes: true,
  })) {
    const name = path.posix.join(relative, item.name);
    if (item.isSymbolicLink())
      throw new Error(`Release contains symlink: ${name}`);
    if (item.isDirectory()) found.push(...(await artifactPaths(root, name)));
    else if (item.isFile()) found.push(name);
    else throw new Error(`Release contains unsupported entry: ${name}`);
  }
  return found.sort();
}

export async function verifyRelease(
  releaseDir: string,
): Promise<ReleaseManifest> {
  const manifest = releaseManifestSchema.parse(
    JSON.parse(await readFile(path.join(releaseDir, "manifest.json"), "utf8")),
  );
  if (
    path.basename(releaseDir) !== manifest.release_id &&
    !path.basename(releaseDir).startsWith(".staging-")
  )
    throw new Error("Release directory and manifest ID differ.");
  const actual = (await artifactPaths(releaseDir)).filter(
    (name) => name !== "manifest.json",
  );
  const expected = Object.keys(manifest.artifacts).sort();
  if (
    actual.join("\n") !== expected.join("\n") ||
    !expected.includes("knowledge.json") ||
    !expected.includes("knowledge.sqlite")
  )
    throw new Error("Release artifact inventory differs from manifest.");
  for (const file of expected) {
    if (
      !/^(knowledge\.(json|sqlite)|docs\/[a-z0-9_/-]+\.md)$/.test(file) ||
      file.includes("..")
    )
      throw new Error(`Unsafe artifact name: ${file}`);
    if (
      sha256(await readFile(path.join(releaseDir, file))) !==
      manifest.artifacts[file]
    )
      throw new Error(`Artifact hash mismatch: ${file}`);
  }
  const knowledge = publishedKnowledgeSchema.parse(
    JSON.parse(await readFile(path.join(releaseDir, "knowledge.json"), "utf8")),
  );
  if (manifest.builder_version !== "1" && !knowledge.records.artifacts)
    throw new Error("This builder version requires artifact metadata.");
  if (
    knowledge.release_id !== manifest.release_id ||
    knowledge.profile !== manifest.profile ||
    knowledge.knowledge_published_at !== manifest.knowledge_published_at
  )
    throw new Error("Release identity differs across artifacts.");
  const db = new Database(path.join(releaseDir, "knowledge.sqlite"), {
    readonly: true,
    fileMustExist: true,
  });
  try {
    if (db.pragma("integrity_check", { simple: true }) !== "ok")
      throw new Error("SQLite integrity check failed.");
    if ((db.pragma("foreign_key_check") as unknown[]).length)
      throw new Error("SQLite foreign key check failed.");
    for (const [table, items] of Object.entries(knowledge.records)) {
      if (items === undefined) continue;
      const payloads = db
        .prepare(`SELECT payload_json FROM ${table} ORDER BY id`)
        .all() as { payload_json: string }[];
      if (
        payloads.length !== items.length ||
        payloads.some(
          (row, index) => row.payload_json !== canonical(items[index]),
        )
      )
        throw new Error(`SQLite ${table} rows differ from JSON.`);
    }
    const ftsIds = db
      .prepare("SELECT claim_id FROM claims_fts ORDER BY claim_id")
      .all() as { claim_id: string }[];
    if (
      ftsIds.map((row) => row.claim_id).join("\n") !==
      knowledge.records.claims.map((item) => item.claim_id).join("\n")
    )
      throw new Error("SQLite search index differs from claims.");
  } finally {
    db.close();
  }
  if (
    (await exists(path.join(releaseDir, "knowledge.sqlite-wal"))) ||
    (await exists(path.join(releaseDir, "knowledge.sqlite-shm")))
  )
    throw new Error("Release requires a SQLite WAL sidecar.");
  return manifest;
}

export async function compileRelease(
  input: CompileOptions,
): Promise<{ releaseDir: string; manifest: ReleaseManifest }> {
  const options = optionsSchema.parse(input);
  const validated = await loadAndValidateDataset({
    root: options.datasetRoot,
    profile: options.profile,
  });
  if (!validated.ok)
    throw new Error(
      `Dataset validation failed: ${validated.diagnostics
        .filter((item) => item.severity === "error")
        .map((item) => `${item.code} ${item.file}`)
        .join("; ")}`,
    );
  const releaseRoot = path.resolve(options.releasesRoot);
  const releaseDir = path.join(releaseRoot, options.releaseId);
  await mkdir(releaseRoot, { recursive: true });
  const lockPath = path.join(releaseRoot, ".publish.lock");
  const lock = await open(lockPath, "wx");
  let stage: string | undefined;
  let pointerTemp: string | undefined;
  try {
    if (await exists(releaseDir))
      throw new Error(`Release already exists: ${options.releaseId}`);
    stage = await mkdtemp(path.join(releaseRoot, ".staging-"));
    const knowledge: PublishedKnowledge = {
      schema_version: 1,
      release_id: options.releaseId,
      profile: options.profile,
      knowledge_published_at: options.publishedAt,
      records: publishedRecords(validated.dataset),
    };
    publishedKnowledgeSchema.parse(knowledge);
    await writeFile(path.join(stage, "knowledge.json"), canonical(knowledge));
    writeSqlite(path.join(stage, "knowledge.sqlite"), knowledge);
    for (const [file, content] of renderDocs(knowledge)) {
      await mkdir(path.dirname(path.join(stage, file)), { recursive: true });
      await writeFile(path.join(stage, file), content);
    }
    const artifacts: Record<string, string> = {};
    for (const file of await artifactPaths(stage))
      artifacts[file] = sha256(await readFile(path.join(stage, file)));
    const manifest: ReleaseManifest = {
      schema_version: 1,
      builder_version: "3",
      release_id: options.releaseId,
      profile: options.profile,
      knowledge_published_at: options.publishedAt,
      input_sha256: sha256(canonical(validated.dataset)),
      artifacts,
    };
    await writeFile(path.join(stage, "manifest.json"), canonical(manifest));
    await verifyRelease(stage);
    await rename(stage, releaseDir);
    stage = undefined;
    pointerTemp = path.join(releaseRoot, `.current-${randomUUID()}.json`);
    await writeFile(pointerTemp, canonical({ release_id: options.releaseId }));
    await rename(pointerTemp, path.join(releaseRoot, "current.json"));
    pointerTemp = undefined;
    return { releaseDir, manifest };
  } finally {
    if (stage) await rm(stage, { recursive: true, force: true });
    if (pointerTemp) await rm(pointerTemp, { force: true });
    await lock.close();
    await unlink(lockPath);
  }
}
