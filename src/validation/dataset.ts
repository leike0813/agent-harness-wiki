import { createHash } from "node:crypto";
import type { Dirent } from "node:fs";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";
import {
  catalogSchema,
  harnessRegistrationSchema,
  type HarnessCatalog,
} from "../domain/catalog.js";
import * as z from "zod";
import YAML from "yaml";
import {
  assessmentSchema,
  artifactSchema,
  claimSchema,
  coverageSchema,
  evidenceSchema,
  guideSchema,
  harnessSchema,
  snapshotSchema,
  sourceSchema,
  type Claim,
  type Dataset,
  type Target,
  type Topic,
} from "../domain/schema.js";

export type Diagnostic = {
  code: string;
  severity: "error" | "warning";
  category: "schema" | "relationship" | "semantic" | "publishability";
  file: string;
  record_id?: string;
  path: string;
  reason: string;
  hint: string;
};

export type ValidationResult =
  | {
      ok: true;
      dataset: Dataset;
      catalog?: HarnessCatalog;
      diagnostics: Diagnostic[];
    }
  | { ok: false; diagnostics: Diagnostic[] };

type Kind =
  | "harness"
  | "source"
  | "snapshot"
  | "artifact"
  | "claim"
  | "evidence"
  | "assessment"
  | "coverage"
  | "guide";
type RecordMeta = { file: string; kind: Kind };
const recordDirs: Record<Kind, string> = {
  harness: "registry/harnesses",
  source: "registry/sources",
  snapshot: "snapshots",
  artifact: "artifacts",
  claim: "claims",
  evidence: "evidence",
  assessment: "assessments",
  coverage: "coverage",
  guide: "guides",
};
const topicType: Record<Topic, string[]> = {
  skills: ["search_path", "capability_support"],
  mcp: ["transport_support", "capability_support"],
  custom_agents: ["discovery_rule", "capability_support"],
  custom_providers: ["provider_protocol", "capability_support"],
  hooks: ["hook_event", "capability_support"],
  native_plugins: ["plugin_lifecycle", "capability_support"],
  configuration: ["precedence_rule", "capability_support"],
};

function emptyDataset(): Dataset {
  return {
    harnesses: [],
    sources: [],
    artifacts: [],
    snapshots: [],
    claims: [],
    evidence: [],
    assessments: [],
    coverage: [],
    guides: [],
  };
}

function versionKey(version: Target["version_identity"]): string {
  return `${version.kind}:${version.value}`;
}

function scopeKey(target: Omit<Target, "version_identity">): string {
  return [
    target.harness_id,
    target.surface,
    target.distribution,
    target.os,
    target.arch,
    target.execution_mode,
  ].join("|");
}

function targetKey(target: Target): string {
  return `${scopeKey(target)}|${versionKey(target.version_identity)}`;
}

function claimTarget(claim: Claim): Target {
  return {
    ...claim.target,
    version_identity: claim.version_applicability.versions[0],
  };
}

function safeRelative(value: string): boolean {
  return (
    !path.isAbsolute(value) &&
    !value.includes("\0") &&
    !value.includes("\\") &&
    !/^[a-zA-Z]:/.test(value) &&
    value
      .split("/")
      .every((segment) => segment !== "" && segment !== "." && segment !== "..")
  );
}

export async function loadAndValidateDataset(input: {
  root: string;
  profile: "fixture" | "production";
  chapterCatalog?: boolean;
}): Promise<ValidationResult> {
  const root = await realpath(input.root);
  const dataset = emptyDataset();
  const diagnostics: Diagnostic[] = [];
  const meta = new Map<string, RecordMeta>();
  const recordFiles = new WeakMap<object, string>();
  const hasCatalog =
    input.chapterCatalog ??
    (await lstat(path.join(root, "catalog/harnesses.yaml")).then(
      () => true,
      (error: NodeJS.ErrnoException) => {
        if (error.code === "ENOENT") return false;
        throw error;
      },
    ));
  let catalog: HarnessCatalog | undefined;
  if (hasCatalog) {
    try {
      const catalogFile = path.join(root, "catalog/harnesses.yaml");
      const stat = await lstat(catalogFile);
      if (!stat.isFile() || stat.size > 1024 * 1024)
        throw new Error("Catalog must be a regular file within 1 MiB.");
      catalog = catalogSchema.parse(
        YAML.parse(await readFile(catalogFile, "utf8"), {
          uniqueKeys: true,
          customTags: [],
          maxAliasCount: 0,
        }),
      );
    } catch (error) {
      return {
        ok: false,
        diagnostics: [
          {
            code: "CATALOG_INVALID",
            severity: "error",
            category: "schema",
            file: "catalog/harnesses.yaml",
            path: "/",
            reason: String(error),
            hint: "Provide a valid fixed-source catalog.",
          },
        ],
      };
    }
  }
  if (catalog && catalog.record_kind !== input.profile)
    diagnostics.push({
      code: "PROFILE_MISMATCH",
      severity: "error",
      category: "publishability",
      file: "catalog/harnesses.yaml",
      path: "/record_kind",
      reason: "Catalog profile differs.",
      hint: "Keep fixtures separate.",
    });
  let totalBytes = 0;
  const fail = (diagnostic: Diagnostic): void => {
    diagnostics.push(diagnostic);
  };

  async function filesIn(
    relativeDir: string,
    extension = /\.ya?ml$/i,
  ): Promise<string[]> {
    const dir = path.join(root, relativeDir);
    let children;
    try {
      if (!(await lstat(dir)).isDirectory()) {
        fail({
          code: "INVALID_DATASET_ENTRY",
          severity: "error",
          category: "schema",
          file: relativeDir,
          path: "/",
          reason: "Record directory is not a regular directory.",
          hint: "Remove the symlink or non-directory entry.",
        });
        return [];
      }
      children = await readdir(dir, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    }
    const files: string[] = [];
    for (const child of children) {
      const relative = path.posix.join(relativeDir, child.name);
      if (!child.isFile() || !extension.test(child.name)) {
        fail({
          code: "INVALID_DATASET_ENTRY",
          severity: "error",
          category: "schema",
          file: relative,
          path: "/",
          reason: "Record directory contains an unexpected file type.",
          hint: "Move source material outside record directories.",
        });
      } else files.push(relative);
    }
    return files.sort();
  }

  const paths: { kind: Kind; file: string }[] = [];
  for (const kind of ["harness", "source"] as const) {
    for (const file of await filesIn(recordDirs[kind]))
      paths.push({ kind, file });
  }
  const knowledgeDir = path.join(root, "knowledge");
  let harnessDirs: Dirent[];
  try {
    harnessDirs = await readdir(knowledgeDir, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    harnessDirs = [];
  }
  for (const harnessDir of harnessDirs.sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    if (
      !harnessDir.isDirectory() ||
      !/^[a-z][a-z0-9_-]*$/.test(harnessDir.name)
    ) {
      fail({
        code: "INVALID_DATASET_ENTRY",
        severity: "error",
        category: "schema",
        file: `knowledge/${harnessDir.name}`,
        path: "/",
        reason: "Knowledge entries must be harness directories.",
        hint: "Use a safe harness ID directory.",
      });
      continue;
    }
    for (const kind of [
      "artifact",
      "snapshot",
      "claim",
      "evidence",
      "assessment",
      "coverage",
      "guide",
    ] as const) {
      const dir = `knowledge/${harnessDir.name}/${recordDirs[kind]}`;
      for (const file of await filesIn(
        dir,
        kind === "guide" ? /\.md$/i : /\.ya?ml$/i,
      ))
        paths.push({ kind, file });
    }
  }

  function addRecord<T>(
    schema: z.ZodType<T>,
    raw: unknown,
    file: string,
    onValid: (value: T) => void,
  ): void {
    const parsed = schema.safeParse(raw);
    if (parsed.success) {
      if (typeof parsed.data === "object" && parsed.data !== null)
        recordFiles.set(parsed.data, file);
      onValid(parsed.data);
    } else
      for (const issue of parsed.error.issues) {
        fail({
          code: "SCHEMA_INVALID",
          severity: "error",
          category: "schema",
          file,
          path: `/${issue.path.join("/")}`,
          reason: issue.message,
          hint: "Match the exported record schema.",
        });
      }
  }

  for (const { kind, file } of paths) {
    const absolute = path.join(root, file);
    const info = await lstat(absolute);
    if (
      info.size > 1024 * 1024 ||
      (totalBytes += info.size) > 16 * 1024 * 1024
    ) {
      fail({
        code: "INPUT_TOO_LARGE",
        severity: "error",
        category: "schema",
        file,
        path: "/",
        reason: "Dataset input exceeds its size limit.",
        hint: "Split or reduce the input records.",
      });
      continue;
    }
    const text = await readFile(absolute, "utf8");
    let raw: unknown;
    try {
      const frontmatter =
        kind === "guide"
          ? /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/.exec(text)
          : undefined;
      if (kind === "guide" && !frontmatter)
        throw new Error("Guide requires YAML frontmatter and body.");
      const document = YAML.parseDocument(frontmatter?.[1] ?? text, {
        uniqueKeys: true,
        customTags: [],
      });
      if (document.errors.length || document.warnings.length)
        throw new Error(
          [...document.errors, ...document.warnings]
            .map((error) => error.message)
            .join("; "),
        );
      const metadata: unknown = document.toJS({ maxAliasCount: 0 });
      raw =
        kind === "guide" && metadata !== null && typeof metadata === "object"
          ? { ...metadata, body: frontmatter![2]!.trim() }
          : metadata;
    } catch (error) {
      fail({
        code: "YAML_INVALID",
        severity: "error",
        category: "schema",
        file,
        path: "/",
        reason: String(error),
        hint: "Use plain YAML with unique keys and no custom tags or aliases.",
      });
      continue;
    }
    switch (kind) {
      case "harness":
        if (catalog) {
          addRecord(harnessRegistrationSchema, raw, file, (registration) => {
            const product = catalog.products.find(
              (x) => x.harness_id === registration.harness_id,
            );
            if (!product) {
              fail({
                code: "HARNESS_NOT_CATALOGED",
                severity: "error",
                category: "relationship",
                file,
                path: "/harness_id",
                reason: "Registry product is absent from catalog.",
                hint: "Investigate and catalog the product first.",
              });
              return;
            }
            const harness = harnessSchema.parse({
              ...registration,
              name: product.name,
              aliases: product.aliases,
              surfaces: [...new Set(product.surfaces.map((x) => x.kind))],
            });
            recordFiles.set(harness, file);
            dataset.harnesses.push(harness);
          });
        } else
          addRecord(harnessSchema, raw, file, (v) => dataset.harnesses.push(v));
        break;
      case "source":
        addRecord(sourceSchema, raw, file, (v) => dataset.sources.push(v));
        break;
      case "snapshot":
        addRecord(snapshotSchema, raw, file, (v) => dataset.snapshots.push(v));
        break;
      case "artifact":
        addRecord(artifactSchema, raw, file, (v) => dataset.artifacts.push(v));
        break;
      case "claim":
        addRecord(claimSchema, raw, file, (v) => dataset.claims.push(v));
        break;
      case "evidence":
        addRecord(evidenceSchema, raw, file, (v) => dataset.evidence.push(v));
        break;
      case "assessment":
        addRecord(assessmentSchema, raw, file, (v) =>
          dataset.assessments.push(v),
        );
        break;
      case "coverage":
        addRecord(coverageSchema, raw, file, (v) => dataset.coverage.push(v));
        break;
      case "guide":
        addRecord(guideSchema, raw, file, (v) => dataset.guides.push(v));
        break;
    }
  }

  const coverageById = new Map(dataset.coverage.map((v) => [v.coverage_id, v]));
  const all: {
    kind: Kind;
    id: string;
    file: string;
    record_kind: string;
    harness_id?: string;
  }[] = [
    ...dataset.harnesses.map((v) => ({
      kind: "harness" as const,
      id: v.harness_id,
      file: recordFiles.get(v) ?? v.harness_id,
      record_kind: v.record_kind,
    })),
    ...dataset.sources.map((v) => ({
      kind: "source" as const,
      id: v.source_id,
      file: recordFiles.get(v) ?? v.source_id,
      record_kind: v.record_kind,
      harness_id: v.harness_id,
    })),
    ...dataset.artifacts.map((v) => ({
      kind: "artifact" as const,
      id: v.artifact_id,
      file: recordFiles.get(v) ?? v.artifact_id,
      record_kind: v.record_kind,
      harness_id: v.harness_id,
    })),
    ...dataset.snapshots.map((v) => ({
      kind: "snapshot" as const,
      id: v.snapshot_id,
      file: recordFiles.get(v) ?? v.snapshot_id,
      record_kind: v.record_kind,
      harness_id: "target" in v ? v.target.harness_id : v.harness_id,
    })),
    ...dataset.claims.map((v) => ({
      kind: "claim" as const,
      id: v.claim_id,
      file: recordFiles.get(v) ?? v.claim_id,
      record_kind: v.record_kind,
      harness_id: v.target.harness_id,
    })),
    ...dataset.evidence.map((v) => ({
      kind: "evidence" as const,
      id: v.evidence_id,
      file: recordFiles.get(v) ?? v.evidence_id,
      record_kind: v.record_kind,
    })),
    ...dataset.assessments.map((v) => ({
      kind: "assessment" as const,
      id: v.assessment_id,
      file: recordFiles.get(v) ?? v.assessment_id,
      record_kind: v.record_kind,
    })),
    ...dataset.coverage.map((v) => ({
      kind: "coverage" as const,
      id: v.coverage_id,
      file: recordFiles.get(v) ?? v.coverage_id,
      record_kind: v.record_kind,
      harness_id: v.target.harness_id,
    })),
    ...dataset.guides.map((v) => ({
      kind: "guide" as const,
      id: v.guide_id,
      file: recordFiles.get(v) ?? v.guide_id,
      record_kind: v.record_kind,
      ...(coverageById.get(v.coverage_ref)?.target.harness_id
        ? { harness_id: coverageById.get(v.coverage_ref)!.target.harness_id }
        : {}),
    })),
  ];
  for (const item of all) {
    const file = item.file;
    if (meta.has(item.id))
      fail({
        code: "DUPLICATE_ID",
        severity: "error",
        category: "relationship",
        file,
        record_id: item.id,
        path: "/",
        reason: "Record ID is already used.",
        hint: "Assign a unique stable ID.",
      });
    else meta.set(item.id, { file, kind: item.kind });
    if (item.record_kind !== input.profile)
      fail({
        code: "PROFILE_MISMATCH",
        severity: "error",
        category: "publishability",
        file,
        record_id: item.id,
        path: "/record_kind",
        reason: "Record kind does not match the dataset profile.",
        hint: "Keep fixture records outside production.",
      });
    if (
      item.harness_id &&
      file.startsWith("knowledge/") &&
      !file.startsWith(`knowledge/${item.harness_id}/`)
    ) {
      fail({
        code: "HARNESS_DIRECTORY_MISMATCH",
        severity: "error",
        category: "relationship",
        file,
        record_id: item.id,
        path: "/target/harness_id",
        reason: "Record directory and harness ID differ.",
        hint: "Move the record under its harness directory.",
      });
    }
  }
  const fileOf = (id: string): string => meta.get(id)?.file ?? id;
  const related = (
    code: string,
    id: string,
    field: string,
    reason: string,
    hint: string,
    category: Diagnostic["category"] = "relationship",
  ): void =>
    fail({
      code,
      severity: "error",
      category,
      file: fileOf(id),
      record_id: id,
      path: `/${field}`,
      reason,
      hint,
    });
  const harnesses = new Map(dataset.harnesses.map((v) => [v.harness_id, v]));
  const sources = new Map(dataset.sources.map((v) => [v.source_id, v]));
  const artifacts = new Map(dataset.artifacts.map((v) => [v.artifact_id, v]));
  const snapshots = new Map(dataset.snapshots.map((v) => [v.snapshot_id, v]));
  const claims = new Map(dataset.claims.map((v) => [v.claim_id, v]));
  const evidence = new Map(dataset.evidence.map((v) => [v.evidence_id, v]));
  const assessments = new Map(
    dataset.assessments.map((v) => [v.assessment_id, v]),
  );
  const seenGuideCoverage = new Set<string>();
  for (const guide of dataset.guides) {
    const coverage = coverageById.get(guide.coverage_ref);
    const file = fileOf(guide.guide_id);
    const expectedDirectory = coverage?.target.harness_id;
    if (!coverage || !file.startsWith(`knowledge/${expectedDirectory}/guides/`))
      related(
        "GUIDE_COVERAGE_MISMATCH",
        guide.guide_id,
        "coverage_ref",
        "Guide coverage is missing or belongs to another harness.",
        "Reference coverage for this harness and exact Target.",
      );
    if (coverage && path.basename(file) !== `${coverage.topic}.md`)
      related(
        "GUIDE_TOPIC_MISMATCH",
        guide.guide_id,
        "coverage_ref",
        "Guide filename must match its coverage topic.",
        "Rename the guide to the topic name.",
      );
    if (seenGuideCoverage.has(guide.coverage_ref))
      related(
        "GUIDE_DUPLICATE_COVERAGE",
        guide.guide_id,
        "coverage_ref",
        "More than one guide refers to this Coverage record.",
        "Keep one chapter per Target/topic.",
      );
    seenGuideCoverage.add(guide.coverage_ref);
    if (/<\/?[a-z][^>]*>|<script|javascript:|data:/i.test(guide.body))
      related(
        "GUIDE_UNSAFE_MARKUP",
        guide.guide_id,
        "body",
        "Guide contains active or raw HTML markup.",
        "Use ordinary Markdown and code spans.",
        "publishability",
      );
    for (const ref of guide.claim_refs) {
      const claim = claims.get(ref);
      if (
        !claim ||
        !coverage ||
        claim.topic !== coverage.topic ||
        targetKey(claimTarget(claim)) !== targetKey(coverage.target) ||
        !claim.assessment_refs.some(
          (id) => assessments.get(id)?.status === "accepted",
        ) ||
        claim.assessment_refs.some(
          (id) => assessments.get(id)?.status === "disputed",
        )
      )
        related(
          "GUIDE_CLAIM_UNREVIEWED",
          guide.guide_id,
          "claim_refs",
          "Guide claim is missing, unaccepted, disputed, or outside its Target/topic.",
          "Cite an accepted Claim for this exact Target and topic.",
          "publishability",
        );
    }
  }

  for (const harness of dataset.harnesses)
    for (const ref of harness.source_refs) {
      if (sources.get(ref)?.harness_id !== harness.harness_id)
        related(
          "SOURCE_MISSING",
          harness.harness_id,
          "source_refs",
          "Source reference is missing or belongs to another harness.",
          "Refer to a source owned by this harness.",
        );
    }
  const sourceText = new Map<string, string>();
  for (const source of dataset.sources) {
    if (!harnesses.has(source.harness_id))
      related(
        "HARNESS_MISSING",
        source.source_id,
        "harness_id",
        "Unknown harness.",
        "Define the harness first.",
      );
    if (source.kind !== "fixture_file") continue;
    if (!safeRelative(source.file)) {
      related(
        "PATH_INVALID",
        source.source_id,
        "file",
        "Fixture source path is unsafe.",
        "Use a dataset-relative path without traversal.",
      );
      continue;
    }
    const absolute = path.resolve(root, source.file);
    try {
      let cursor = root;
      for (const segment of source.file.split("/")) {
        cursor = path.join(cursor, segment);
        if ((await lstat(cursor)).isSymbolicLink())
          throw new Error("Symlink in source path.");
      }
      const resolved = await realpath(absolute);
      if (!resolved.startsWith(`${root}${path.sep}`))
        throw new Error("Path escapes dataset root.");
      const bytes = await readFile(resolved);
      if (
        bytes.length > 1024 * 1024 ||
        (totalBytes += bytes.length) > 16 * 1024 * 1024
      ) {
        fail({
          code: "INPUT_TOO_LARGE",
          severity: "error",
          category: "schema",
          file: source.file,
          record_id: source.source_id,
          path: "/file",
          reason: "Source file exceeds dataset limits.",
          hint: "Reduce the source material.",
        });
        continue;
      }
      if (
        createHash("sha256").update(bytes).digest("hex") !==
        source.content_sha256
      ) {
        related(
          "HASH_MISMATCH",
          source.source_id,
          "content_sha256",
          "Source hash differs from file bytes.",
          "Recompute SHA-256 from the actual source file.",
        );
      }
      sourceText.set(source.source_id, bytes.toString("utf8"));
    } catch {
      related(
        "PATH_INVALID",
        source.source_id,
        "file",
        "Source file is missing or outside the dataset.",
        "Point to an existing file inside the dataset.",
      );
    }
  }
  for (const artifact of dataset.artifacts) {
    const source = sources.get(artifact.source_id);
    if (
      !source ||
      source.harness_id !== artifact.harness_id ||
      (artifact.kind === "git_checkout" && source.kind !== "git_repository") ||
      (artifact.kind === "archived_document" &&
        source.kind !== "official_documentation") ||
      (artifact.kind === "managed_package" &&
        (source.kind !== "npm_registry" ||
          source.package_name !== artifact.package_name)) ||
      (artifact.kind === "archived_package_file" &&
        (source.kind !== "npm_registry" ||
          source.package_name !== artifact.package_name))
    )
      related(
        "SOURCE_MISSING",
        artifact.artifact_id,
        "source_id",
        "Artifact source is missing, incompatible, or belongs to another harness.",
        "Use an official source of the matching kind and harness.",
      );
    const location =
      artifact.kind === "git_checkout"
        ? artifact.checkout_path
        : artifact.kind === "archived_document"
          ? artifact.archive_path
          : artifact.kind === "managed_package"
            ? artifact.package_path
            : artifact.tarball_path;
    const prefix =
      artifact.kind === "git_checkout"
        ? `upstream/${artifact.harness_id}`
        : artifact.kind === "archived_document"
          ? `archive/${artifact.harness_id}/${artifact.artifact_id}/`
          : artifact.kind === "managed_package"
            ? `research/package-set/node_modules/${artifact.package_name}`
            : `archive/${artifact.harness_id}/npm/${artifact.version}/`;
    if (
      !safeRelative(location) ||
      (artifact.kind === "archived_document" ||
      artifact.kind === "archived_package_file"
        ? !location.startsWith(prefix)
        : artifact.kind === "git_checkout"
          ? location !== prefix &&
            location !==
              `archive/${artifact.harness_id}/git/${artifact.commit}/checkout`
          : location !== prefix) ||
      (artifact.kind !== "archived_document" && !safeRelative(artifact.file)) ||
      (artifact.kind === "archived_package_file" &&
        !artifact.file.startsWith("package/")) ||
      (artifact.kind === "managed_package" &&
        !safeRelative(artifact.package_name))
    )
      related(
        "PATH_INVALID",
        artifact.artifact_id,
        "location",
        "Artifact location is unsafe or outside its harness boundary.",
        "Use the prescribed relative checkout or archive path.",
      );
    if (
      artifact.kind === "archived_document" &&
      artifact.raw_sha256 !== artifact.extracted_sha256
    )
      related(
        "HASH_MISMATCH",
        artifact.artifact_id,
        "extracted_sha256",
        "Identity Markdown extraction must preserve bytes.",
        "Use the raw content hash for both identities.",
      );
  }
  for (const snapshot of dataset.snapshots) {
    const source = sources.get(snapshot.source_id);
    const harnessId =
      "target" in snapshot ? snapshot.target.harness_id : snapshot.harness_id;
    if (!source || source.harness_id !== harnessId)
      related(
        "SOURCE_MISSING",
        snapshot.snapshot_id,
        "source_id",
        "Snapshot source is missing or belongs to another harness.",
        "Use a source for the same harness.",
      );
    else if (
      !("kind" in snapshot) &&
      (source.kind !== "fixture_file" ||
        source.content_sha256 !== snapshot.content_sha256)
    )
      related(
        "HASH_MISMATCH",
        snapshot.snapshot_id,
        "content_sha256",
        "Snapshot and source hash differ.",
        "Use the captured source content hash.",
      );
    if ("kind" in snapshot) {
      const artifact = artifacts.get(snapshot.artifact_id);
      if (
        !artifact ||
        artifact.source_id !== snapshot.source_id ||
        artifact.harness_id !== harnessId ||
        (snapshot.kind === "source_revision" &&
          artifact.kind !== "git_checkout") ||
        (snapshot.kind === "documentation" &&
          artifact.kind !== "archived_document") ||
        (snapshot.kind === "npm_release" &&
          artifact.kind !== "managed_package" &&
          artifact.kind !== "archived_package_file")
      )
        related(
          "ARTIFACT_MISSING",
          snapshot.snapshot_id,
          "artifact_id",
          "Snapshot artifact is missing or belongs to a different source or harness.",
          "Reference a matching artifact.",
        );
      if (snapshot.kind === "source_revision") {
        if (
          snapshot.target.version_identity.kind !== "commit" ||
          snapshot.target.version_identity.value !== snapshot.commit ||
          snapshot.target.distribution !== "source-tree" ||
          (artifact?.kind === "git_checkout" &&
            (artifact.commit !== snapshot.commit ||
              artifact.content_sha256 !== snapshot.content_sha256))
        )
          related(
            "TARGET_MISMATCH",
            snapshot.snapshot_id,
            "target",
            "Source revision Target, commit, or file hash differs from the artifact.",
            "Use the exact source-tree commit and selected file hash.",
          );
      } else if (snapshot.kind === "documentation") {
        if (
          source?.kind !== "official_documentation" ||
          source.url !== snapshot.requested_url ||
          (artifact?.kind === "archived_document" &&
            (artifact.raw_sha256 !== snapshot.raw_sha256 ||
              artifact.extracted_sha256 !== snapshot.extracted_sha256 ||
              artifact.extractor !== snapshot.extractor))
        )
          related(
            "HASH_MISMATCH",
            snapshot.snapshot_id,
            "artifact_id",
            "Documentation URL or content identity differs from source and artifact.",
            "Match the captured URL, extractor and hashes.",
          );
      } else if (snapshot.kind === "npm_release") {
        if (
          source?.kind !== "npm_registry" ||
          source.package_name !== snapshot.package_name ||
          snapshot.target.version_identity.kind !== "release" ||
          snapshot.target.version_identity.value !== snapshot.version ||
          snapshot.target.distribution !==
            `npm:${snapshot.package_name}:linux-x64-glibc` ||
          !harnesses
            .get(harnessId)
            ?.surfaces.includes(snapshot.target.surface) ||
          snapshot.target.os !== "linux" ||
          snapshot.target.arch !== "x64" ||
          snapshot.target.execution_mode !== "native" ||
          (artifact?.kind === "managed_package" &&
            (artifact.package_name !== snapshot.package_name ||
              artifact.version !== snapshot.version ||
              artifact.integrity !== snapshot.integrity)) ||
          (artifact?.kind === "archived_package_file" &&
            (artifact.package_name !== snapshot.package_name ||
              artifact.version !== snapshot.version ||
              artifact.integrity !== snapshot.integrity))
        )
          related(
            "TARGET_MISMATCH",
            snapshot.snapshot_id,
            "target",
            "Package snapshot differs from its source, artifact, or exact Linux Target.",
            "Use the matching package name, version, integrity, and distribution.",
          );
      }
    }
  }
  const coverageKeys = new Set<string>();
  for (const coverage of dataset.coverage) {
    if (!harnesses.has(coverage.target.harness_id))
      related(
        "HARNESS_MISSING",
        coverage.coverage_id,
        "target/harness_id",
        "Unknown harness.",
        "Define the harness first.",
      );
    const key = `${targetKey(coverage.target)}|${coverage.topic}`;
    if (coverageKeys.has(key))
      related(
        "DUPLICATE_COVERAGE",
        coverage.coverage_id,
        "target",
        "Coverage for this Target and topic already exists.",
        "Keep one coverage record per Target and topic.",
      );
    coverageKeys.add(key);
    for (const ref of coverage.snapshot_refs ?? []) {
      const snapshot = snapshots.get(ref);
      const snapshotHarness =
        snapshot &&
        ("target" in snapshot
          ? snapshot.target.harness_id
          : snapshot.harness_id);
      if (!snapshot || snapshotHarness !== coverage.target.harness_id)
        related(
          "SNAPSHOT_MISSING",
          coverage.coverage_id,
          "snapshot_refs",
          "Investigation snapshot is missing or belongs to another harness.",
          "Reference a fixed source snapshot for this harness.",
        );
    }
    if (coverage.status === "not_started" || coverage.status === "partial")
      fail({
        code: "COVERAGE_INCOMPLETE",
        severity: "warning",
        category: "publishability",
        file: fileOf(coverage.coverage_id),
        record_id: coverage.coverage_id,
        path: "/status",
        reason: "Topic coverage is incomplete for this Target.",
        hint: "Keep the coverage state visible until the exact Target is investigated.",
      });
  }
  for (const claim of dataset.claims) {
    if (!harnesses.has(claim.target.harness_id))
      related(
        "HARNESS_MISSING",
        claim.claim_id,
        "target/harness_id",
        "Unknown harness.",
        "Define the harness first.",
      );
    if (!topicType[claim.topic].includes(claim.assertion.type))
      related(
        "TOPIC_ASSERTION_MISMATCH",
        claim.claim_id,
        "assertion/type",
        "Assertion type does not fit the topic.",
        "Use an assertion type for this topic.",
        "semantic",
      );
    if (
      claim.assertion.type === "search_path" &&
      (claim.assertion.path.base === "environment_variable") !==
        Boolean(claim.assertion.path.variable)
    ) {
      related(
        "PATH_INVALID",
        claim.claim_id,
        "assertion/path/variable",
        "Path variable does not match its base.",
        "Provide a variable only for environment_variable paths.",
        "semantic",
      );
    }
    if (
      (claim.support.availability === "supported") !==
      Boolean(claim.support.delivery)
    )
      related(
        "SUPPORT_INVALID",
        claim.claim_id,
        "support/delivery",
        "Delivery must be present exactly for supported claims.",
        "Set delivery for supported facts only.",
        "semantic",
      );
    if (!coverageKeys.has(`${targetKey(claimTarget(claim))}|${claim.topic}`))
      related(
        "COVERAGE_MISSING",
        claim.claim_id,
        "topic",
        "Claim has no coverage for its exact Target and topic.",
        "Add a matching CoverageRecord.",
        "publishability",
      );
    if (claim.assessment_refs.length === 0)
      related(
        "ASSESSMENT_MISSING",
        claim.claim_id,
        "assessment_refs",
        "Claim has no review record.",
        "Add an Assessment, even for draft or disputed claims.",
        "publishability",
      );
    const predicates = new Map<string, string>();
    for (const predicate of claim.conditions.all_of) {
      const key =
        predicate.type +
        ("name" in predicate
          ? predicate.name
          : "key" in predicate
            ? predicate.key
            : "id" in predicate
              ? predicate.id
              : "");
      const value = JSON.stringify(predicate);
      if (predicates.has(key) && predicates.get(key) !== value)
        related(
          "CONDITION_CONFLICT",
          claim.claim_id,
          "conditions",
          "Conditions require incompatible values.",
          "Split the claim into distinct conditional facts.",
          "semantic",
        );
      predicates.set(key, value);
    }
    const target = claimTarget(claim);
    for (const ref of claim.evidence_refs) {
      const item = evidence.get(ref);
      if (!item || item.claim_id !== claim.claim_id)
        related(
          "EVIDENCE_MISSING",
          claim.claim_id,
          "evidence_refs",
          "Evidence reference is missing or targets another claim.",
          "Refer to evidence for this claim.",
        );
      else {
        const snapshot = snapshots.get(item.snapshot_id);
        if (
          !snapshot ||
          !("target" in snapshot) ||
          targetKey(snapshot.target) !== targetKey(target)
        )
          related(
            "TARGET_MISMATCH",
            claim.claim_id,
            "evidence_refs",
            "Evidence snapshot has a different Target.",
            "Use evidence for the exact same Target.",
          );
      }
    }
    let accepted = false;
    let disputed = false;
    for (const ref of claim.assessment_refs) {
      const item = assessments.get(ref);
      if (!item || item.claim_id !== claim.claim_id)
        related(
          "ASSESSMENT_MISSING",
          claim.claim_id,
          "assessment_refs",
          "Assessment reference is missing or targets another claim.",
          "Refer to an assessment for this claim.",
        );
      else {
        accepted ||= item.status === "accepted";
        disputed ||= item.status === "disputed";
        if (item.status === "accepted" && item.evidence_refs.length === 0)
          related(
            "EVIDENCE_MISSING",
            claim.claim_id,
            "assessment_refs",
            "Accepting assessment has no evidence.",
            "Attach evidence to the assessment.",
            "publishability",
          );
        for (const evidenceRef of item.evidence_refs)
          if (!claim.evidence_refs.includes(evidenceRef))
            related(
              "EVIDENCE_MISSING",
              claim.claim_id,
              "assessment_refs",
              "Assessment cites evidence outside its claim.",
              "Use claim evidence refs in the assessment.",
            );
      }
    }
    if (accepted && claim.evidence_refs.length === 0)
      related(
        "EVIDENCE_MISSING",
        claim.claim_id,
        "evidence_refs",
        "Accepted claim lacks evidence.",
        "Add located evidence before acceptance.",
        "publishability",
      );
    const stances = new Set(
      claim.evidence_refs.map((ref) => evidence.get(ref)?.stance),
    );
    if (
      stances.has("supports") &&
      stances.has("refutes") &&
      (!disputed || accepted)
    )
      related(
        "CONFLICT_UNRESOLVED",
        claim.claim_id,
        "assessment_refs",
        "Conflicting evidence needs a disputed assessment.",
        "Record the dispute without selecting one side.",
        "semantic",
      );
    if (claim.supersedes) {
      const older = claims.get(claim.supersedes);
      if (!older)
        related(
          "CLAIM_MISSING",
          claim.claim_id,
          "supersedes",
          "Superseded claim does not exist.",
          "Reference an existing earlier claim.",
        );
      else if (
        older.fact_key !== claim.fact_key ||
        targetKey(claimTarget(older)) !== targetKey(target)
      )
        related(
          "TARGET_MISMATCH",
          claim.claim_id,
          "supersedes",
          "Replacement must share fact key and Target.",
          "Use an earlier claim for the same fact and Target.",
        );
    }
  }
  for (const item of dataset.evidence) {
    const source = sources.get(
      snapshots.get(item.snapshot_id)?.source_id ?? "",
    );
    if (!claims.has(item.claim_id) || !snapshots.has(item.snapshot_id))
      related(
        "REFERENCE_MISSING",
        item.evidence_id,
        "claim_id",
        "Evidence claim or snapshot is missing.",
        "Refer to existing records.",
      );
    else if (
      !claims.get(item.claim_id)?.evidence_refs.includes(item.evidence_id)
    )
      related(
        "EVIDENCE_UNLINKED",
        item.evidence_id,
        "claim_id",
        "Claim does not reference this evidence.",
        "Add the evidence ID to the claim.",
      );
    if (item.locator.kind === "line" && source?.kind === "fixture_file") {
      const lines = sourceText.get(source.source_id)?.split(/\r?\n/) ?? [];
      if (
        item.locator.end < item.locator.start ||
        item.locator.end > lines.length ||
        !lines
          .slice(item.locator.start - 1, item.locator.end)
          .join("\n")
          .includes(item.excerpt)
      ) {
        related(
          "LOCATOR_INVALID",
          item.evidence_id,
          "locator",
          "Excerpt is not present at the source lines.",
          "Correct the line range and excerpt.",
        );
      }
    }
  }
  for (const item of dataset.assessments)
    if (!claims.has(item.claim_id))
      related(
        "CLAIM_MISSING",
        item.assessment_id,
        "claim_id",
        "Assessment claim is missing.",
        "Refer to an existing claim.",
      );
    else if (
      !claims.get(item.claim_id)?.assessment_refs.includes(item.assessment_id)
    )
      related(
        "ASSESSMENT_UNLINKED",
        item.assessment_id,
        "claim_id",
        "Claim does not reference this assessment.",
        "Add the assessment ID to the claim.",
      );
  const visited = new Set<string>();
  const active = new Set<string>();
  function visit(id: string): void {
    if (active.has(id)) {
      related(
        "SUPERSESSION_CYCLE",
        id,
        "supersedes",
        "Claim replacement has a cycle.",
        "Break the cycle.",
      );
      return;
    }
    if (visited.has(id)) return;
    visited.add(id);
    active.add(id);
    const next = claims.get(id)?.supersedes;
    if (next && claims.has(next)) visit(next);
    active.delete(id);
  }
  for (const claim of dataset.claims) visit(claim.claim_id);

  if (diagnostics.some((d) => d.severity === "error"))
    return { ok: false, diagnostics };
  return { ok: true, dataset, ...(catalog ? { catalog } : {}), diagnostics };
}
