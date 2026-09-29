import { randomUUID } from "node:crypto";
import {
  copyFile,
  lstat,
  mkdir,
  mkdtemp,
  open,
  readFile,
  readdir,
  rename,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import Database from "better-sqlite3";
import * as z from "zod";
import {
  chapterPublishedKnowledgeSchema,
  chapterReleaseManifestSchema,
  type ChapterDataset,
  type ChapterPublishedKnowledge,
} from "../domain/chapter.js";
import { loadAndValidateChapters } from "../validation/chapters.js";
import { canonical, sha256 } from "./projection.js";

const optionsSchema = z.strictObject({
  datasetRoot: z.string().min(1),
  profile: z.enum(["fixture", "production"]),
  releaseId: z.string().regex(/^[a-z][a-z0-9_-]*$/),
  publishedAt: z.iso.datetime(),
  releasesRoot: z.string().min(1),
});
export type ChapterCompileOptions = z.infer<typeof optionsSchema>;
export type ChapterReleaseManifest = z.infer<
  typeof chapterReleaseManifestSchema
>;

const sort = <T>(xs: T[], key: (x: T) => string): T[] =>
  [...xs].sort((a, b) => (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0));
const textSafe = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export function projectChapters(
  dataset: ChapterDataset,
  releaseId: string,
  profile: "fixture" | "production",
  publishedAt: string,
): ChapterPublishedKnowledge {
  const records = {
    harnesses: sort(dataset.harnesses, (x) => x.harness_id),
    sources: sort(dataset.sources, (x) => x.source_id),
    artifacts: sort(dataset.artifacts, (x) => x.artifact_id),
    snapshots: sort(dataset.snapshots, (x) => x.snapshot_id),
    source_references: sort(dataset.source_references, (x) => x.reference_id),
    chapters: sort(dataset.chapters, (x) => x.edition_id),
    mappings: sort(dataset.mappings, (x) => x.mapping_id),
    current: sort(dataset.current, (x) => `${x.harness_id}|${x.topic}`),
  };
  return chapterPublishedKnowledgeSchema.parse({
    schema_version: 2,
    release_id: releaseId,
    profile,
    knowledge_published_at: publishedAt,
    records,
  });
}

export function renderChapterDocs(
  knowledge: ChapterPublishedKnowledge,
): Map<string, string> {
  const pages = new Map<string, string>();
  const fixture =
    knowledge.profile === "fixture" ? "> Fictional fixture data.\n\n" : "";
  pages.set(
    "docs/index.md",
    `# Knowledge release ${knowledge.release_id}\n\n${fixture}${knowledge.records.current.map((x) => `- [${x.harness_id} / ${x.topic}](chapters/${x.edition_id}.md)`).join("\n")}\n\n## Historical editions\n\n${knowledge.records.chapters
      .filter(
        (x) =>
          !knowledge.records.current.some((y) => y.edition_id === x.edition_id),
      )
      .map(
        (x) =>
          `- [${x.harness_id} / ${x.topic} / ${x.edition_id}](chapters/${x.edition_id}.md)`,
      )
      .join("\n")}\n`,
  );
  for (const chapter of knowledge.records.chapters)
    pages.set(
      `docs/chapters/${chapter.edition_id}.md`,
      `# ${textSafe(chapter.title)}\n\n${fixture}${chapter.body}\n`,
    );
  for (const ref of knowledge.records.source_references)
    pages.set(
      `docs/sources/${ref.reference_id}.md`,
      `# ${ref.reference_id}\n\n${fixture}Snapshot: ${ref.snapshot_id}\n\nLocation: ${textSafe(JSON.stringify(ref.locator))}\n\nOfficial link: ${ref.official_url}\n\n### Excerpt\n\n${ref.excerpt
        .split("\n")
        .map((line) => `    ${line}`)
        .join("\n")}\n`,
    );
  return pages;
}

function writeChapterSqlite(
  file: string,
  knowledge: ChapterPublishedKnowledge,
): void {
  const db = new Database(file);
  try {
    db.pragma("journal_mode = DELETE");
    db.pragma("foreign_keys = ON");
    db.exec(`
      CREATE TABLE harnesses (id TEXT PRIMARY KEY, payload_json TEXT NOT NULL);
      CREATE TABLE sources (id TEXT PRIMARY KEY, harness_id TEXT NOT NULL REFERENCES harnesses(id), payload_json TEXT NOT NULL);
      CREATE TABLE artifacts (id TEXT PRIMARY KEY, source_id TEXT NOT NULL REFERENCES sources(id), payload_json TEXT NOT NULL);
      CREATE TABLE snapshots (id TEXT PRIMARY KEY, source_id TEXT NOT NULL REFERENCES sources(id), payload_json TEXT NOT NULL);
      CREATE TABLE source_references (id TEXT PRIMARY KEY, snapshot_id TEXT NOT NULL REFERENCES snapshots(id), harness_id TEXT NOT NULL REFERENCES harnesses(id), payload_json TEXT NOT NULL);
      CREATE TABLE chapters (id TEXT PRIMARY KEY, harness_id TEXT NOT NULL REFERENCES harnesses(id), topic TEXT NOT NULL, is_current INTEGER NOT NULL, payload_json TEXT NOT NULL);
      CREATE TABLE sections (chapter_id TEXT NOT NULL REFERENCES chapters(id), section_id TEXT NOT NULL, payload_json TEXT NOT NULL, PRIMARY KEY(chapter_id, section_id));
      CREATE TABLE questions (chapter_id TEXT NOT NULL REFERENCES chapters(id), question_id TEXT NOT NULL, section_id TEXT NOT NULL, status TEXT NOT NULL, payload_json TEXT NOT NULL, PRIMARY KEY(chapter_id, question_id), FOREIGN KEY(chapter_id, section_id) REFERENCES sections(chapter_id, section_id));
      CREATE TABLE mappings (id TEXT PRIMARY KEY, chapter_id TEXT NOT NULL REFERENCES chapters(id), version TEXT NOT NULL, scope TEXT NOT NULL, payload_json TEXT NOT NULL);
      CREATE TABLE mapping_sections (mapping_id TEXT NOT NULL REFERENCES mappings(id), chapter_id TEXT NOT NULL, section_id TEXT NOT NULL, evidence_ref TEXT NOT NULL REFERENCES source_references(id), PRIMARY KEY(mapping_id, section_id), FOREIGN KEY(chapter_id, section_id) REFERENCES sections(chapter_id, section_id));
      CREATE TABLE current (harness_id TEXT NOT NULL REFERENCES harnesses(id), topic TEXT NOT NULL, edition_id TEXT NOT NULL REFERENCES chapters(id), payload_json TEXT NOT NULL, PRIMARY KEY(harness_id, topic));
      CREATE INDEX chapters_scope ON chapters(harness_id, topic, is_current);
      CREATE INDEX mappings_version ON mappings(version, chapter_id);
    `);
    const r = knowledge.records;
    db.transaction(() => {
      for (const x of r.harnesses)
        db.prepare("INSERT INTO harnesses VALUES (?,?)").run(
          x.harness_id,
          canonical(x),
        );
      for (const x of r.sources)
        db.prepare("INSERT INTO sources VALUES (?,?,?)").run(
          x.source_id,
          x.harness_id,
          canonical(x),
        );
      for (const x of r.artifacts)
        db.prepare("INSERT INTO artifacts VALUES (?,?,?)").run(
          x.artifact_id,
          x.source_id,
          canonical(x),
        );
      for (const x of r.snapshots)
        db.prepare("INSERT INTO snapshots VALUES (?,?,?)").run(
          x.snapshot_id,
          x.source_id,
          canonical(x),
        );
      for (const x of r.source_references)
        db.prepare("INSERT INTO source_references VALUES (?,?,?,?)").run(
          x.reference_id,
          x.snapshot_id,
          x.harness_id,
          canonical(x),
        );
      for (const x of r.chapters) {
        db.prepare("INSERT INTO chapters VALUES (?,?,?,?,?)").run(
          x.edition_id,
          x.harness_id,
          x.topic,
          r.current.some((y) => y.edition_id === x.edition_id) ? 1 : 0,
          canonical(x),
        );
        for (const s of x.sections)
          db.prepare("INSERT INTO sections VALUES (?,?,?)").run(
            x.edition_id,
            s.section_id,
            canonical(s),
          );
        for (const q of x.questions)
          db.prepare("INSERT INTO questions VALUES (?,?,?,?,?)").run(
            x.edition_id,
            q.question_id,
            q.section_id,
            q.status,
            canonical(q),
          );
      }
      for (const x of r.mappings) {
        db.prepare("INSERT INTO mappings VALUES (?,?,?,?,?)").run(
          x.mapping_id,
          x.edition_id,
          x.software_version,
          x.scope,
          canonical(x),
        );
        for (const s of x.sections)
          db.prepare("INSERT INTO mapping_sections VALUES (?,?,?,?)").run(
            x.mapping_id,
            x.edition_id,
            s.section_id,
            s.evidence_ref,
          );
      }
      for (const x of r.current)
        db.prepare("INSERT INTO current VALUES (?,?,?,?)").run(
          x.harness_id,
          x.topic,
          x.edition_id,
          canonical(x),
        );
    })();
  } finally {
    db.close();
  }
}

async function paths(root: string, relative = ""): Promise<string[]> {
  const result: string[] = [];
  for (const x of await readdir(path.join(root, relative), {
    withFileTypes: true,
  })) {
    const name = path.posix.join(relative, x.name);
    if (x.isDirectory()) result.push(...(await paths(root, name)));
    else if (x.isFile()) result.push(name);
    else throw new Error(`Unsupported release entry: ${name}`);
  }
  return result.sort();
}

export async function verifyChapterRelease(
  dir: string,
): Promise<ChapterReleaseManifest> {
  const manifest = chapterReleaseManifestSchema.parse(
    JSON.parse(await readFile(path.join(dir, "manifest.json"), "utf8")),
  );
  if (
    path.basename(dir) !== manifest.release_id &&
    !path.basename(dir).startsWith(".staging-")
  )
    throw new Error("Release directory and ID differ.");
  const inventory = (await paths(dir)).filter((x) => x !== "manifest.json");
  if (
    inventory.join("\n") !==
      Object.keys(manifest.artifacts).sort().join("\n") ||
    !inventory.includes("knowledge.json") ||
    !inventory.includes("knowledge.sqlite")
  )
    throw new Error("Release artifact inventory differs from manifest.");
  for (const file of inventory) {
    if (
      !/^(knowledge\.(json|sqlite)|docs\/(index|chapters\/[a-z0-9_-]+|sources\/[a-z0-9_-]+)\.md)$/.test(
        file,
      )
    )
      throw new Error(`Unsafe artifact name: ${file}`);
    if (
      sha256(await readFile(path.join(dir, file))) !== manifest.artifacts[file]
    )
      throw new Error(`Artifact hash mismatch: ${file}`);
  }
  const knowledge = chapterPublishedKnowledgeSchema.parse(
    JSON.parse(await readFile(path.join(dir, "knowledge.json"), "utf8")),
  );
  if (
    knowledge.release_id !== manifest.release_id ||
    knowledge.profile !== manifest.profile ||
    knowledge.knowledge_published_at !== manifest.knowledge_published_at
  )
    throw new Error("Release identity differs across artifacts.");
  const history = knowledge.records.chapters
    .filter(
      (x) =>
        !knowledge.records.current.some((y) => y.edition_id === x.edition_id),
    )
    .map((x) => x.edition_id);
  if (
    canonical(manifest.current) !== canonical(knowledge.records.current) ||
    canonical(manifest.history) !== canonical(history)
  )
    throw new Error("Chapter selection differs from manifest.");
  for (const item of knowledge.records.current) {
    const chapter = knowledge.records.chapters.find(
      (x) => x.edition_id === item.edition_id,
    );
    if (
      !chapter ||
      chapter.harness_id !== item.harness_id ||
      chapter.topic !== item.topic
    )
      throw new Error("Current chapter identity differs from JSON.");
  }
  const pagePaths = [
    "docs/index.md",
    ...knowledge.records.chapters.map(
      (x) => `docs/chapters/${x.edition_id}.md`,
    ),
    ...knowledge.records.source_references.map(
      (x) => `docs/sources/${x.reference_id}.md`,
    ),
  ];
  if (
    pagePaths.sort().join("\n") !==
    inventory.filter((x) => x.startsWith("docs/")).join("\n")
  )
    throw new Error("Markdown inventory differs from JSON.");
  const index = await readFile(path.join(dir, "docs/index.md"), "utf8");
  for (const item of knowledge.records.current)
    if (!index.includes(`chapters/${item.edition_id}.md`))
      throw new Error("Current chapter missing from Markdown index.");
  for (const chapter of knowledge.records.chapters)
    if (
      !(
        await readFile(
          path.join(dir, `docs/chapters/${chapter.edition_id}.md`),
          "utf8",
        )
      ).includes(chapter.body)
    )
      throw new Error(
        `Chapter Markdown differs from JSON: ${chapter.edition_id}`,
      );
  for (const ref of knowledge.records.source_references) {
    const page = await readFile(
      path.join(dir, `docs/sources/${ref.reference_id}.md`),
      "utf8",
    );
    if (
      !page.includes(ref.snapshot_id) ||
      !page.includes(
        ref.excerpt
          .split("\n")
          .map((line) => `    ${line}`)
          .join("\n"),
      )
    )
      throw new Error(`Source Markdown differs from JSON: ${ref.reference_id}`);
  }
  const db = new Database(path.join(dir, "knowledge.sqlite"), {
    readonly: true,
    fileMustExist: true,
  });
  try {
    if (
      db.pragma("integrity_check", { simple: true }) !== "ok" ||
      (db.pragma("foreign_key_check") as unknown[]).length
    )
      throw new Error("SQLite integrity check failed.");
    const names = [
      "harnesses",
      "sources",
      "artifacts",
      "snapshots",
      "source_references",
      "chapters",
      "mappings",
      "current",
    ] as const;
    for (const name of names) {
      const rows = db
        .prepare(
          `SELECT payload_json FROM ${name} ORDER BY ${name === "current" ? "harness_id, topic" : "id"}`,
        )
        .all() as { payload_json: string }[];
      const values = knowledge.records[name];
      if (
        rows.length !== values.length ||
        rows.some((x, i) => x.payload_json !== canonical(values[i]))
      )
        throw new Error(`SQLite ${name} differs from JSON.`);
    }
    for (const [table, expected] of [
      [
        "sections",
        knowledge.records.chapters.flatMap((x) =>
          x.sections.map((s) => ({
            chapter_id: x.edition_id,
            key: s.section_id,
            payload: canonical(s),
          })),
        ),
      ],
      [
        "questions",
        knowledge.records.chapters.flatMap((x) =>
          x.questions.map((q) => ({
            chapter_id: x.edition_id,
            key: q.question_id,
            payload: canonical(q),
          })),
        ),
      ],
    ] as const) {
      const rows = db
        .prepare(
          `SELECT chapter_id, ${table === "sections" ? "section_id" : "question_id"} AS key, payload_json AS payload FROM ${table} ORDER BY chapter_id, key`,
        )
        .all();
      if (
        canonical(rows) !==
        canonical(sort(expected, (x) => `${x.chapter_id}|${x.key}`))
      )
        throw new Error(`SQLite ${table} differs from JSON.`);
    }
    const mappingRows = db
      .prepare(
        "SELECT mapping_id, chapter_id, section_id, evidence_ref FROM mapping_sections ORDER BY mapping_id, section_id",
      )
      .all();
    const mappingExpected = sort(
      knowledge.records.mappings.flatMap((x) =>
        x.sections.map((s) => ({
          mapping_id: x.mapping_id,
          chapter_id: x.edition_id,
          section_id: s.section_id,
          evidence_ref: s.evidence_ref,
        })),
      ),
      (x) => `${x.mapping_id}|${x.section_id}`,
    );
    if (canonical(mappingRows) !== canonical(mappingExpected))
      throw new Error("SQLite mapping sections differ from JSON.");
  } finally {
    db.close();
  }
  for (const sidecar of ["knowledge.sqlite-wal", "knowledge.sqlite-shm"])
    try {
      await lstat(path.join(dir, sidecar));
      throw new Error("SQLite sidecar present.");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  return manifest;
}

export async function compileChapterRelease(
  input: ChapterCompileOptions,
): Promise<{ releaseDir: string; manifest: ChapterReleaseManifest }> {
  const options = optionsSchema.parse(input);
  const validated = await loadAndValidateChapters({
    root: options.datasetRoot,
    profile: options.profile,
  });
  if (!validated.ok)
    throw new Error(
      `Dataset validation failed: ${validated.diagnostics
        .filter((x) => x.severity === "error")
        .map((x) => `${x.code} ${x.file}`)
        .join("; ")}`,
    );
  const root = path.resolve(options.releasesRoot);
  await mkdir(root, { recursive: true });
  const lock = await open(path.join(root, ".publish.lock"), "wx");
  let stage: string | undefined;
  let pointerTemp: string | undefined;
  try {
    const releaseDir = path.join(root, options.releaseId);
    try {
      await lstat(releaseDir);
      throw new Error(`Release already exists: ${options.releaseId}`);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    const pointer = path.join(root, "current.json");
    let previous: string | undefined;
    try {
      previous = JSON.parse(await readFile(pointer, "utf8"))
        .release_id as string;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    if (previous) await verifyChapterRelease(path.join(root, previous));
    stage = await mkdtemp(path.join(root, ".staging-"));
    const knowledge = projectChapters(
      validated.dataset,
      options.releaseId,
      options.profile,
      options.publishedAt,
    );
    await writeFile(path.join(stage, "knowledge.json"), canonical(knowledge));
    writeChapterSqlite(path.join(stage, "knowledge.sqlite"), knowledge);
    for (const [file, content] of renderChapterDocs(knowledge)) {
      const target = path.join(stage, file);
      await mkdir(path.dirname(target), { recursive: true });
      const old =
        previous && file.startsWith("docs/chapters/")
          ? path.join(root, previous, file)
          : undefined;
      if (old) {
        try {
          const oldBytes = await readFile(old, "utf8");
          if (oldBytes !== content)
            throw new Error(`Immutable chapter edition changed: ${file}`);
          await copyFile(old, target);
          continue;
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
        }
      }
      await writeFile(target, content);
    }
    const artifacts: Record<string, string> = {};
    for (const file of await paths(stage))
      artifacts[file] = sha256(await readFile(path.join(stage, file)));
    const manifest: ChapterReleaseManifest = {
      schema_version: 2,
      builder_version: "4",
      release_id: options.releaseId,
      profile: options.profile,
      knowledge_published_at: options.publishedAt,
      input_sha256: sha256(canonical(validated.dataset)),
      current: knowledge.records.current,
      history: knowledge.records.chapters
        .filter(
          (x) =>
            !knowledge.records.current.some(
              (y) => y.edition_id === x.edition_id,
            ),
        )
        .map((x) => x.edition_id),
      artifacts,
    };
    await writeFile(path.join(stage, "manifest.json"), canonical(manifest));
    await verifyChapterRelease(stage);
    await rename(stage, releaseDir);
    stage = undefined;
    pointerTemp = path.join(root, `.current-${randomUUID()}.json`);
    await writeFile(pointerTemp, canonical({ release_id: options.releaseId }));
    await rename(pointerTemp, pointer);
    pointerTemp = undefined;
    return { releaseDir, manifest };
  } finally {
    if (stage) await rm(stage, { recursive: true, force: true });
    if (pointerTemp) await unlink(pointerTemp);
    await lock.close();
    await unlink(path.join(root, ".publish.lock"));
  }
}
