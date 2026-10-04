import {
  mkdir,
  readFile,
  readdir,
  realpath,
  lstat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { z } from "zod";
import { catalogSchema } from "../domain/catalog.js";
import {
  chapterSelectionSchema,
  type ChapterDataset,
} from "../domain/chapter.js";
import { sourceSchema } from "../domain/schema.js";
import { loadAndValidateChapters } from "../validation/chapters.js";
import { validateAuditLedger } from "./scan.js";

const catalogFile = "catalog/harnesses.yaml";
const selectionFile = "registry/chapter-current.yaml";
const batchSchema = z.strictObject({
  project_root: z.string(),
  profile: z.enum(["production", "fixture"]),
  products: z.array(z.string().regex(/^[a-z][a-z0-9_-]*$/)).min(1),
});
type Batch = z.infer<typeof batchSchema>;
type Files = Map<string, string>;

function parse(text: string): unknown {
  const doc = YAML.parseDocument(text, { uniqueKeys: true, customTags: [] });
  if (doc.errors.length || doc.warnings.length)
    throw new Error("Invalid candidate YAML.");
  return doc.toJS({ maxAliasCount: 0 }) as unknown;
}

async function filesAt(
  root: string,
  allowEntry?: (entry: string) => boolean,
): Promise<Files> {
  if ((await realpath(root)) !== path.resolve(root))
    throw new Error("Candidate root must be a real directory.");
  const files: Files = new Map();
  async function visit(relative: string): Promise<void> {
    for (const entry of await readdir(path.join(root, relative), {
      withFileTypes: true,
    })) {
      const file = path.posix.join(relative, entry.name);
      if (allowEntry && !allowEntry(file))
        throw new Error(`Candidate path is outside its product scope: ${file}`);
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile()) {
        if ((await lstat(path.join(root, file))).size > 1024 * 1024)
          throw new Error(`Candidate file too large: ${file}`);
        files.set(file, await readFile(path.join(root, file), "utf8"));
      } else
        throw new Error(
          `Candidate entry is not a regular file or directory: ${file}`,
        );
    }
  }
  await visit("");
  return files;
}

async function writeFiles(root: string, files: Files): Promise<void> {
  for (const [file, text] of files) {
    const destination = path.join(root, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, text, { flag: "wx" });
  }
}

async function projectFiles(root: string, product?: string): Promise<Files> {
  const files: Files = new Map();
  for (const directory of [
    "catalog",
    "registry/harnesses",
    "registry/sources",
    product ? `knowledge/${product}` : "knowledge",
    product ? `audits/${product}` : "audits",
  ]) {
    let exists = true;
    try {
      await lstat(path.join(root, directory));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      exists = false;
    }
    if (!exists) continue;
    const subtree = await filesAt(path.join(root, directory));
    for (const [file, text] of subtree) {
      const relative = `${directory}/${file}`;
      if (directory === "catalog" && relative !== catalogFile) continue;
      if (
        product &&
        directory === "registry/harnesses" &&
        file !== `${product}.yaml`
      )
        continue;
      if (
        product &&
        directory === "registry/sources" &&
        z.object({ harness_id: z.string() }).parse(parse(text)).harness_id !==
          product
      )
        continue;
      files.set(relative, text);
    }
  }
  files.set(
    selectionFile,
    await readFile(path.join(root, selectionFile), "utf8"),
  );
  // Fixture sources have bounded local originals needed by the same validators.
  // Production sources retain identity only and never copy archive or checkouts.
  for (const [file, text] of [...files]) {
    if (!file.startsWith("registry/sources/")) continue;
    const source = sourceSchema.parse(parse(text));
    if (source.kind !== "fixture_file") continue;
    const absolute = path.join(root, source.file);
    if (
      !source.file.startsWith("materials/") ||
      path.posix.normalize(source.file) !== source.file ||
      (await realpath(absolute)) !== absolute ||
      !(await lstat(absolute)).isFile()
    )
      throw new Error("Unsafe fixture original.");
    files.set(source.file, await readFile(absolute, "utf8"));
  }
  if (product) {
    const catalog = catalogSchema.parse(parse(files.get(catalogFile)!));
    files.set(
      catalogFile,
      YAML.stringify({
        ...catalog,
        products: catalog.products.filter((x) => x.harness_id === product),
        references: catalog.references.filter((x) => x.harness_id === product),
      }),
    );
    const selection = chapterSelectionSchema.parse(
      parse(files.get(selectionFile)!),
    );
    files.set(
      selectionFile,
      YAML.stringify({
        ...selection,
        selections: selection.selections.filter(
          (x) => x.harness_id === product,
        ),
      }),
    );
  }
  return files;
}

function sameFiles(a: Files, b: Files): boolean {
  return (
    a.size === b.size && [...a].every(([file, text]) => b.get(file) === text)
  );
}

function replaceOwned<T extends { harness_id: string }>(
  all: T[],
  own: T[],
  id: string,
): T[] {
  const first = all.findIndex((x) => x.harness_id === id);
  if (first < 0) return [...all, ...own];
  return [
    ...all.slice(0, first),
    ...own,
    ...all.slice(first).filter((x) => x.harness_id !== id),
  ];
}

async function newOutput(root: string, out: string): Promise<string> {
  const destination = path.resolve(out);
  const parent = await realpath(path.dirname(destination));
  const resolved = path.join(parent, path.basename(destination));
  const relative = path.relative(root, resolved);
  // Runtime directories are allowed; tracked datasets and their ancestors are not.
  if (
    relative === "" ||
    relative === ".." ||
    root.startsWith(`${resolved}${path.sep}`) ||
    (!relative.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relative) &&
      !relative.startsWith(`var${path.sep}`))
  ) {
    throw new Error(
      "Candidate output must be outside the project or inside var.",
    );
  }
  await mkdir(resolved);
  return resolved;
}

async function validate(
  root: string,
  profile: Batch["profile"],
): Promise<ChapterDataset> {
  const result = await loadAndValidateChapters({ root, profile });
  if (!result.ok)
    throw new Error(
      `Candidate validation failed: ${result.diagnostics.map((x) => `${x.code} ${x.file}${x.path}: ${x.reason}`).join("; ")}`,
    );
  await validateAuditLedger(root, profile);
  return result.dataset;
}

function identities(dataset: ChapterDataset): [string, string][] {
  return [
    ...dataset.catalog.references.map((x): [string, string] => [
      x.reference_id,
      x.harness_id,
    ]),
    ...dataset.harnesses.map((x): [string, string] => [
      x.harness_id,
      x.harness_id,
    ]),
    ...dataset.sources.map((x): [string, string] => [
      x.source_id,
      x.harness_id,
    ]),
    ...dataset.artifacts.map((x): [string, string] => [
      x.artifact_id,
      x.harness_id,
    ]),
    ...dataset.snapshots.map((x): [string, string] => [
      x.snapshot_id,
      "harness_id" in x ? x.harness_id : x.target.harness_id,
    ]),
    ...dataset.source_references.map((x): [string, string] => [
      x.reference_id,
      x.harness_id,
    ]),
    ...dataset.chapters.map((x): [string, string] => [
      x.edition_id,
      x.harness_id,
    ]),
    ...dataset.mappings.map((x): [string, string] => [
      x.mapping_id,
      x.harness_id,
    ]),
  ];
}

/** Copy independent product datasets, with immutable baseline copies outside worker roots. */
export async function prepareMaintenanceCandidates(input: {
  root: string;
  out: string;
  products: string[];
  profile?: Batch["profile"];
}): Promise<{
  batch: string;
  candidates: { harness_id: string; root: string }[];
}> {
  const root = await realpath(input.root);
  const metadata = batchSchema.parse({
    project_root: root,
    profile: input.profile ?? "production",
    products: input.products,
  });
  if (new Set(metadata.products).size !== metadata.products.length)
    throw new Error("Duplicate product task.");
  await validate(root, metadata.profile);
  const projected = await Promise.all(
    metadata.products.map(async (id) => {
      const files = await projectFiles(root, id);
      const catalog = catalogSchema.parse(parse(files.get(catalogFile)!));
      if (
        catalog.products.length !== 1 ||
        !files.has(`registry/harnesses/${id}.yaml`)
      )
        throw new Error(`Unknown registered product: ${id}`);
      return files;
    }),
  );
  const batch = await newOutput(root, input.out);
  const candidates = [];
  for (const [index, id] of metadata.products.entries()) {
    const candidate = path.join(batch, "candidates", id);
    await writeFiles(candidate, projected[index]!);
    await writeFiles(path.join(batch, "baseline", id), projected[index]!);
    candidates.push({ harness_id: id, root: candidate });
  }
  await writeFile(
    path.join(batch, "batch.json"),
    `${JSON.stringify(metadata, null, 2)}\n`,
    { flag: "wx" },
  );
  return { batch, candidates };
}

async function batchAt(batch: string): Promise<Batch> {
  const real = await realpath(batch);
  if (real !== path.resolve(batch))
    throw new Error("Batch must be a real directory.");
  return batchSchema.parse(
    JSON.parse(await readFile(path.join(real, "batch.json"), "utf8")),
  );
}

/** Check both file ownership and the normal chapter/audit contracts. */
async function inspectCandidate(
  candidate: string,
): Promise<{ harness_id: string; files: string[]; dataset: ChapterDataset }> {
  const root = path.resolve(candidate);
  const id = path.basename(root);
  const batch = path.dirname(path.dirname(root));
  const metadata = await batchAt(batch);
  if (
    path.basename(path.dirname(root)) !== "candidates" ||
    !metadata.products.includes(id)
  )
    throw new Error("Candidate is not registered in its batch.");
  const baseline = await filesAt(path.join(batch, "baseline", id));
  const materials = new Set<string>();
  for (const file of baseline.keys())
    if (file.startsWith("materials/")) {
      let part = file;
      while (part !== ".") {
        materials.add(part);
        part = path.posix.dirname(part);
      }
    }
  const files = await filesAt(
    root,
    (file) =>
      [
        "catalog",
        "registry",
        "registry/harnesses",
        "registry/sources",
        "knowledge",
        "audits",
        `knowledge/${id}`,
        `audits/${id}`,
        catalogFile,
        selectionFile,
        `registry/harnesses/${id}.yaml`,
      ].includes(file) ||
      /^registry\/sources\/[^/]+\.ya?ml$/.test(file) ||
      file.startsWith(`knowledge/${id}/`) ||
      file.startsWith(`audits/${id}/`) ||
      materials.has(file),
  );
  const catalog = catalogSchema.parse(parse(files.get(catalogFile)!));
  const selection = chapterSelectionSchema.parse(
    parse(files.get(selectionFile)!),
  );
  if (
    catalog.products.length !== 1 ||
    catalog.products[0]!.harness_id !== id ||
    catalog.references.some((x) => x.harness_id !== id) ||
    selection.selections.some((x) => x.harness_id !== id)
  )
    throw new Error("Candidate contains another product.");
  for (const [file, text] of files) {
    if (file === catalogFile || file === selectionFile) continue;
    if (materials.has(file)) {
      if (text !== baseline.get(file))
        throw new Error("Fixture original is immutable.");
      continue;
    }
    if (!(
      file === `registry/harnesses/${id}.yaml` ||
      /^registry\/sources\/[^/]+\.ya?ml$/.test(file) ||
      file.startsWith(`knowledge/${id}/`) ||
      file.startsWith(`audits/${id}/`)
    ))
      throw new Error(`Candidate path is outside its product scope: ${file}`);
    if (/\.ya?ml$/.test(file) || text.startsWith("---\n")) {
      const raw = parse(
        text.startsWith("---\n") ? text.split("\n---\n")[0]!.slice(4) : text,
      );
      if (
        raw &&
        typeof raw === "object" &&
        "harness_id" in raw &&
        raw.harness_id !== id
      )
        throw new Error(`Candidate record belongs to another product: ${file}`);
    }
  }
  const dataset = await validate(root, metadata.profile);
  return { harness_id: id, files: [...files.keys()].sort(), dataset };
}

export async function checkMaintenanceCandidate(
  candidate: string,
): Promise<{ harness_id: string; files: string[] }> {
  const { harness_id, files } = await inspectCandidate(candidate);
  return { harness_id, files };
}

export type MaintenancePlan = {
  root: string;
  accepted: string[];
  rejected: { harness_id: string; reason: string }[];
  changes: { path: string; before: string | null; after: string | null }[];
};

/** Produce a validated merged temporary dataset. Never edit project files. */
export async function planMaintenanceCandidates(input: {
  batch: string;
  out: string;
  products?: string[];
}): Promise<MaintenancePlan> {
  const batch = await realpath(input.batch);
  const metadata = await batchAt(batch);
  const products = input.products ?? metadata.products;
  if (
    new Set(products).size !== products.length ||
    products.some((id) => !metadata.products.includes(id))
  )
    throw new Error("Unknown or duplicate product task.");
  const before = await projectFiles(metadata.project_root);
  const owners = new Map(
    identities(await validate(metadata.project_root, metadata.profile)),
  );
  const merged = new Map(before);
  let catalog = catalogSchema.parse(parse(merged.get(catalogFile)!));
  let selection = chapterSelectionSchema.parse(
    parse(merged.get(selectionFile)!),
  );
  const accepted: string[] = [];
  const rejected: MaintenancePlan["rejected"] = [];
  for (const id of products) {
    try {
      const candidate = path.join(batch, "candidates", id);
      const checked = await inspectCandidate(candidate);
      const incomingIds = identities(checked.dataset);
      for (const [identity, owner] of incomingIds) {
        if (owners.has(identity) && owners.get(identity) !== owner)
          throw new Error(
            `Candidate identity collides with another product: ${identity}`,
          );
      }
      const baseline = await filesAt(path.join(batch, "baseline", id));
      if (!sameFiles(baseline, await projectFiles(metadata.project_root, id)))
        throw new Error(
          "Product baseline changed; reconcile before integration.",
        );
      const files = await filesAt(candidate);
      const ownCatalog = catalogSchema.parse(parse(files.get(catalogFile)!));
      const ownSelection = chapterSelectionSchema.parse(
        parse(files.get(selectionFile)!),
      );
      // Knowledge history and retained source identities cannot be deleted by a task.
      for (const file of baseline.keys())
        if (!files.has(file))
          throw new Error(`Candidate removed a retained file: ${file}`);
      for (const [file, text] of files) {
        if (file === catalogFile || file === selectionFile) continue;
        if (!baseline.has(file) && merged.has(file))
          throw new Error(
            `Candidate file collides with another product: ${file}`,
          );
        // Only commit the product to the in-memory merge after every check succeeds.
        if (!text) throw new Error(`Empty candidate file: ${file}`);
      }
      const nextCatalog = {
        ...catalog,
        products: catalog.products.map((x) =>
          x.harness_id === id ? ownCatalog.products[0]! : x,
        ),
        references: replaceOwned(catalog.references, ownCatalog.references, id),
      };
      const nextSelection = {
        ...selection,
        selections: replaceOwned(
          selection.selections,
          ownSelection.selections,
          id,
        ),
      };
      catalogSchema.parse(nextCatalog);
      chapterSelectionSchema.parse(nextSelection);
      catalog = nextCatalog;
      selection = nextSelection;
      for (const [file, text] of files)
        if (file !== catalogFile && file !== selectionFile)
          merged.set(file, text);
      accepted.push(id);
      for (const [identity, owner] of incomingIds) owners.set(identity, owner);
    } catch (error) {
      rejected.push({
        harness_id: id,
        reason: error instanceof Error ? error.message : String(error),
      });
    }
  }
  // Preserve shared file bytes when no semantic changes occurred.
  if (
    JSON.stringify(catalog) !==
    JSON.stringify(catalogSchema.parse(parse(before.get(catalogFile)!)))
  )
    merged.set(catalogFile, YAML.stringify(catalog));
  if (
    JSON.stringify(selection) !==
    JSON.stringify(
      chapterSelectionSchema.parse(parse(before.get(selectionFile)!)),
    )
  )
    merged.set(selectionFile, YAML.stringify(selection));
  const out = await newOutput(metadata.project_root, input.out);
  await writeFiles(out, merged);
  await validate(out, metadata.profile);
  const changes: MaintenancePlan["changes"] = [];
  for (const [file, text] of merged)
    if (before.get(file) !== text)
      changes.push({
        path: file,
        before: before.get(file) ?? null,
        after: text,
      });
  // Recheck against concurrent edits while building; the coordinator also checks
  // before-values when applying this reviewable plan using its native editor.
  if (!sameFiles(before, await projectFiles(metadata.project_root)))
    throw new Error("Project changed while planning; rerun plan.");
  return { root: out, accepted, rejected, changes };
}
