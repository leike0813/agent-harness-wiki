import { createHash, randomUUID } from "node:crypto";
import {
  link,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { loadAndValidateChapters } from "../validation/chapters.js";
import {
  upstreamAuditSchema,
  type Dataset,
  type SourceDefinition,
  type UpstreamAudit,
} from "../domain/schema.js";
import type { ChapterDataset } from "../domain/chapter.js";
import { loadAndValidateDataset } from "../validation/dataset.js";
import { runSourceGit, type GitRun } from "./workspace.js";

type Check = UpstreamAudit["checks"][number];
type RemoteSource = Exclude<SourceDefinition, { kind: "fixture_file" }>;
const defaultGit: GitRun = (args) => runSourceGit(args, 30_000);

async function boundedFetch(
  url: string,
  limit: number,
  fetchImpl: typeof fetch,
  accept?: string,
): Promise<{ bytes: Buffer; resolvedUrl: string }> {
  const origin = new URL(url).origin;
  let current = url;
  for (let redirect = 0; redirect <= 3; redirect += 1) {
    const response = await fetchImpl(current, {
      redirect: "manual",
      signal: AbortSignal.timeout(30_000),
      ...(accept ? { headers: { Accept: accept } } : {}),
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("Redirect has no location.");
      const next = new URL(location, current);
      if (next.protocol !== "https:" || next.origin !== origin)
        throw new Error("Cross-origin source redirect is blocked.");
      current = next.href;
      continue;
    }
    if (!response.ok || !response.body)
      throw new Error(`HTTP source returned ${response.status}.`);
    const declared = Number(response.headers.get("content-length"));
    if (Number.isFinite(declared) && declared > limit)
      throw new Error("Source exceeds the download limit.");
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new Error("Source exceeds the download limit.");
      }
      chunks.push(value);
    }
    return { bytes: Buffer.concat(chunks), resolvedUrl: current };
  }
  throw new Error("Too many source redirects.");
}

async function archiveLocation(
  root: string,
  relative: string,
): Promise<string> {
  const absolute = path.resolve(root, relative);
  const archive = path.join(root, "archive");
  if (!absolute.startsWith(`${archive}${path.sep}`))
    throw new Error("Candidate path escapes archive.");
  await mkdir(path.dirname(absolute), { recursive: true });
  const realParent = await realpath(path.dirname(absolute));
  if (!realParent.startsWith(`${archive}${path.sep}`))
    throw new Error("Candidate archive contains a symlink.");
  return absolute;
}

async function retainBytes(
  root: string,
  relative: string,
  bytes: Buffer,
): Promise<void> {
  const destination = await archiveLocation(root, relative);
  const temporary = `${destination}.${randomUUID()}.tmp`;
  await writeFile(temporary, bytes, { flag: "wx" });
  try {
    try {
      await link(temporary, destination);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const existingStat = await lstat(destination);
      if (!existingStat.isFile() || existingStat.isSymbolicLink())
        throw new Error("Existing candidate is not a regular file.");
      if (existingStat.size !== bytes.length)
        throw new Error("Existing candidate size differs from observed bytes.");
      const existing = await readFile(destination);
      if (!existing.equals(bytes))
        throw new Error("Existing candidate differs from observed bytes.");
    }
  } finally {
    await unlink(temporary);
  }
}

function initialBaseline(
  dataset: Dataset,
  source: RemoteSource,
): string | undefined {
  const snapshot = dataset.snapshots
    .filter((item) => item.source_id === source.source_id)
    .sort((a, b) => b.source_fetched_at.localeCompare(a.source_fetched_at))[0];
  if (!snapshot || !("kind" in snapshot)) return undefined;
  if (snapshot.kind === "npm_release")
    return `${snapshot.version}@${snapshot.integrity}`;
  if (snapshot.kind === "source_revision") return snapshot.commit;
  return snapshot.raw_sha256;
}

async function priorAudits(
  root: string,
  harnessId: string,
): Promise<UpstreamAudit[]> {
  const directory = path.join(root, "audits", harnessId);
  let files: string[];
  try {
    if (
      !(await lstat(directory)).isDirectory() ||
      (await realpath(directory)) !== directory
    )
      throw new Error(`Unsafe audit directory: ${harnessId}`);
    files = await readdir(directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const audits: UpstreamAudit[] = [];
  for (const file of files.sort()) {
    if (file.endsWith(".md")) {
      if (
        !file.startsWith("target-") &&
        !files.includes(`${file.slice(0, -3)}.yaml`)
      )
        throw new Error(`Review report has no audit: ${file}`);
      const report = await lstat(path.join(directory, file));
      if (!report.isFile() || report.size > 1024 * 1024)
        throw new Error(`Unsafe review report: ${file}`);
      continue;
    }
    if (!file.endsWith(".yaml"))
      throw new Error(`Unexpected audit entry: ${file}`);
    const absolute = path.join(directory, file);
    const stat = await lstat(absolute);
    if (!stat.isFile() || stat.size > 1024 * 1024)
      throw new Error(`Unsafe audit entry: ${file}`);
    const document = YAML.parseDocument(await readFile(absolute, "utf8"), {
      uniqueKeys: true,
      customTags: [],
    });
    if (document.errors.length || document.warnings.length)
      throw new Error(`Invalid audit YAML: ${file}`);
    const raw = document.toJS({ maxAliasCount: 0 }) as Record<string, unknown>;
    const audit = upstreamAuditSchema.parse(
      raw.schema_version === 1
        ? (() => {
            const legacy = { ...raw };
            delete legacy.candidate_refs;
            return {
              ...legacy,
              schema_version: 2,
              impacts: [],
              pending_question_ids: [],
            };
          })()
        : raw,
    );
    if (audit.harness_id !== harnessId || `${audit.audit_id}.yaml` !== file)
      throw new Error(`Audit identity differs from path: ${file}`);
    audits.push(audit);
  }
  return audits.sort((a, b) => a.checked_at.localeCompare(b.checked_at));
}

function parseHead(stdout: string): { commit: string; ref?: string } {
  const line = stdout
    .split(/\r?\n/)
    .find((item) => /^[a-f0-9]{40}\s+HEAD$/.test(item));
  if (!line) throw new Error("Remote HEAD has no exact commit.");
  const ref = stdout.match(
    /^ref: (refs\/heads\/[A-Za-z0-9._/-]+)\s+HEAD$/m,
  )?.[1];
  return { commit: line.slice(0, 40), ...(ref ? { ref } : {}) };
}

async function observe(
  root: string,
  source: RemoteSource,
  baseline: string | undefined,
  fetchImpl: typeof fetch,
  git: GitRun,
  retainDocuments: boolean,
): Promise<
  Pick<
    Check,
    | "observed"
    | "candidate_path"
    | "changed_paths"
    | "resolved_url"
    | "remote_ref"
  >
> {
  if (source.kind === "official_documentation") {
    const { bytes, resolvedUrl } = await boundedFetch(
      source.url,
      8 * 1024 * 1024,
      fetchImpl,
    );
    const observed = createHash("sha256").update(bytes).digest("hex");
    if (observed === baseline || !retainDocuments)
      return { observed, resolved_url: resolvedUrl };
    const artifactId = `artifact-${source.source_id}-${observed.slice(0, 12)}`;
    const candidate_path = `archive/${source.harness_id}/${artifactId}/source.md`;
    await retainBytes(root, candidate_path, bytes);
    return { observed, resolved_url: resolvedUrl, candidate_path };
  }
  if (source.kind === "npm_registry") {
    const metadataUrl = `${source.registry_url}/${encodeURIComponent(source.package_name)}`;
    const { bytes } = await boundedFetch(
      metadataUrl,
      64 * 1024 * 1024,
      fetchImpl,
      "application/vnd.npm.install-v1+json",
    );
    const metadata: unknown = JSON.parse(bytes.toString("utf8"));
    if (!metadata || typeof metadata !== "object")
      throw new Error("Invalid npm metadata.");
    const info = metadata as Record<string, unknown>;
    const version = (info["dist-tags"] as Record<string, unknown> | undefined)
      ?.latest;
    if (
      info.name !== source.package_name ||
      typeof version !== "string" ||
      !/^[0-9A-Za-z][0-9A-Za-z.+-]*$/.test(version)
    )
      throw new Error("npm package name or latest version is invalid.");
    const release = (info.versions as Record<string, unknown> | undefined)?.[
      version
    ];
    const dist =
      release && typeof release === "object"
        ? (release as Record<string, unknown>).dist
        : undefined;
    const details =
      dist && typeof dist === "object" ? (dist as Record<string, unknown>) : {};
    const integrity = details.integrity;
    if (
      typeof integrity !== "string" ||
      !/^sha512-[A-Za-z0-9+/]+={0,2}$/.test(integrity)
    )
      throw new Error("npm release integrity is invalid.");
    const observed = `${version}@${integrity}`;
    return { observed };
  }

  const stdout = await git([
    "ls-remote",
    "--symref",
    source.repository_url,
    "HEAD",
  ]);
  const { commit: observed, ref } = parseHead(stdout);
  return {
    observed,
    ...(ref ? { remote_ref: ref } : {}),
  };
}

export function mapAuditImpacts(
  dataset: ChapterDataset,
  checks: Check[],
): UpstreamAudit["impacts"] {
  const result: UpstreamAudit["impacts"] = [];
  const changed = checks.filter(
    (check) => check.status === "changed" && check.kind !== "npm_registry",
  );
  const harnessIds = new Set(
    changed.map(
      (check) =>
        dataset.sources.find((source) => source.source_id === check.source_id)
          ?.harness_id,
    ),
  );
  for (const chapter of dataset.chapters.filter(
    (item) =>
      harnessIds.has(item.harness_id) &&
      dataset.current.some((current) => current.edition_id === item.edition_id),
  )) {
    const ownChanges = changed.filter((check) =>
      dataset.sources.some(
        (source) =>
          source.source_id === check.source_id &&
          source.harness_id === chapter.harness_id,
      ),
    );
    const shared = ownChanges.some(
      (check) =>
        check.kind === "git_repository" &&
        (check.changed_paths === undefined ||
          check.changed_paths.some((file) =>
            /(^|\/)(config|configuration|build|package|feature|flags|loader)(\/|\.|$)/i.test(
              file,
            ),
          )),
    );
    const refs = dataset.source_references.filter((ref) => {
      if (ref.harness_id !== chapter.harness_id) return false;
      const snapshot = dataset.snapshots.find(
        (item) => item.snapshot_id === ref.snapshot_id,
      );
      return ownChanges.some(
        (check) =>
          check.source_id === snapshot?.source_id &&
          (!check.changed_paths ||
            !("file" in ref.locator) ||
            check.changed_paths.includes(ref.locator.file)),
      );
    });
    const source_refs = refs
      .map((ref) => ref.reference_id)
      .filter((id) =>
        chapter.sections.some((section) => section.source_refs.includes(id)),
      );
    const unbounded =
      shared ||
      ownChanges.some(
        (check) =>
          !dataset.source_references.some((ref) => {
            const snapshot = dataset.snapshots.find(
              (item) => item.snapshot_id === ref.snapshot_id,
            );
            return (
              snapshot?.source_id === check.source_id &&
              (!check.changed_paths ||
                !("file" in ref.locator) ||
                check.changed_paths.includes(ref.locator.file))
            );
          }),
      );
    if (!source_refs.length && !unbounded) continue;
    const sections = unbounded
      ? chapter.sections
      : chapter.sections.filter((section) =>
          section.source_refs.some((id) => source_refs.includes(id)),
        );
    const directlyCited = chapter.questions.filter((question) =>
      question.answers.some((answer) =>
        answer.source_refs.some((id) => source_refs.includes(id)),
      ),
    );
    const cross_topic_links = dataset.chapters
      .filter(
        (item) =>
          item.harness_id === chapter.harness_id &&
          item.topic !== chapter.topic &&
          dataset.current.some(
            (current) => current.edition_id === item.edition_id,
          ),
      )
      .flatMap((item) => item.questions)
      .filter(
        (question) =>
          unbounded ||
          question.answers.some((answer) =>
            answer.source_refs.some((id) => source_refs.includes(id)),
          ),
      )
      .map((question) => question.question_id);
    result.push({
      topic: chapter.topic,
      question_ids: (unbounded || directlyCited.length === 0
        ? chapter.questions
        : directlyCited
      )
        .filter((question) =>
          sections.some((section) =>
            question.answers.some(
              (answer) => section.section_id === answer.section_id,
            ),
          ),
        )
        .map((question) => question.question_id),
      section_ids: sections.map((section) => section.section_id),
      surface_ids: [
        ...new Set(sections.flatMap((section) => section.surface_ids)),
      ],
      source_refs,
      cross_topic_links,
      reason: `${ownChanges.map((check) => check.source_id).join(", ")}: ${unbounded ? "shared or unknown impact; assess relevant entrypoints" : "cited source changed"}`,
    });
  }
  return result;
}

type ScanOptions = {
  root: string;
  harnessIds?: string[];
  fetchImpl?: typeof fetch;
  git?: GitRun;
  now?: () => Date;
};

/** Candidate signal for semantic triage, not an instruction to dispatch maintenance. */
export type HarnessCheck = UpstreamAudit & { requires_maintenance: boolean };

/** Read-only observations; no originals, audits or checkouts are written. */
export async function checkHarnesses(
  input: ScanOptions,
): Promise<HarnessCheck[]> {
  return (await collectHarnesses(input, false)).map((audit) => ({
    ...audit,
    requires_maintenance:
      audit.checks.some((check) => check.status !== "unchanged") ||
      audit.pending_audit_refs.length > 0,
  }));
}

export async function scanHarnesses(
  input: ScanOptions & { harnessIds: string[] },
): Promise<UpstreamAudit[]> {
  const root = await realpath(input.root);
  const audits = await collectHarnesses(input, true);
  const auditRoot = path.join(root, "audits");
  await mkdir(auditRoot, { recursive: true });
  if ((await realpath(auditRoot)) !== auditRoot)
    throw new Error("Unsafe audit root.");
  for (const audit of audits) {
    const directory = path.join(auditRoot, audit.harness_id);
    await mkdir(directory, { recursive: true });
    if ((await realpath(directory)) !== directory)
      throw new Error(`Unsafe audit directory: ${audit.harness_id}`);
    await writeFile(
      path.join(directory, `${audit.audit_id}.yaml`),
      YAML.stringify(audit),
      { flag: "wx" },
    );
  }
  return audits;
}

async function collectHarnesses(
  input: ScanOptions,
  retainDocuments: boolean,
): Promise<UpstreamAudit[]> {
  const root = await realpath(input.root);
  const validated = await loadAndValidateDataset({
    root,
    profile: "production",
  });
  if (!validated.ok)
    throw new Error(
      `Production dataset invalid: ${validated.diagnostics.map((item) => item.code).join(", ")}`,
    );
  const dataset = validated.dataset;
  const chapters = await loadAndValidateChapters({
    root,
    profile: "production",
  });
  const hasChapters = await lstat(
    path.join(root, "registry/chapter-current.yaml"),
  ).then(
    () => true,
    () => false,
  );
  if (!chapters.ok && hasChapters)
    throw new Error("Production chapter dataset is invalid.");
  const requestedIds =
    input.harnessIds ??
    dataset.harnesses
      .filter(
        (harness) =>
          !validated.catalog ||
          validated.catalog.products.some(
            (product) => product.harness_id === harness.harness_id,
          ),
      )
      .map((harness) => harness.harness_id);
  if (requestedIds.length === 0)
    throw new Error("At least one harness ID is required.");
  const ids = [...new Set(requestedIds)];
  for (const id of ids)
    if (!dataset.harnesses.some((item) => item.harness_id === id))
      throw new Error(`Unknown registered harness: ${id}`);
  const results: UpstreamAudit[] = [];
  for (const harnessId of ids) {
    const harness = dataset.harnesses.find(
      (item) => item.harness_id === harnessId,
    )!;
    const previous = await priorAudits(root, harnessId);
    const checks: Check[] = [];
    let nextSource = 0;
    const byIndex: (Check | undefined)[] = [];
    async function checkNext(): Promise<void> {
      for (;;) {
        const index = nextSource++;
        const sourceId = harness.source_refs[index];
        if (sourceId === undefined) return;
        const source = dataset.sources.find(
          (item) => item.source_id === sourceId,
        );
        if (!source || source.kind === "fixture_file") continue;
        const checked_at = (input.now ?? (() => new Date()))().toISOString();
        const baseline =
          [...previous]
            .reverse()
            .flatMap((audit) => audit.checks)
            .find((check) => check.source_id === sourceId && check.observed)
            ?.observed ?? initialBaseline(dataset, source);
        try {
          const result = await observe(
            root,
            source,
            baseline,
            input.fetchImpl ?? fetch,
            input.git ?? defaultGit,
            retainDocuments,
          );
          byIndex[index] = {
            source_id: sourceId,
            kind: source.kind,
            checked_at,
            status: result.observed === baseline ? "unchanged" : "changed",
            ...(baseline ? { baseline } : {}),
            ...result,
          };
        } catch (error) {
          byIndex[index] = {
            source_id: sourceId,
            kind: source.kind,
            checked_at,
            status: "blocked",
            ...(baseline ? { baseline } : {}),
            error: error instanceof Error ? error.message : String(error),
          };
        }
      }
    }
    await Promise.all(
      Array.from({ length: Math.min(4, harness.source_refs.length) }, () =>
        checkNext(),
      ),
    );
    checks.push(
      ...byIndex.filter((check): check is Check => check !== undefined),
    );
    const pending_audit_refs = previous
      .filter(
        (audit) =>
          audit.review_status === "pending" &&
          !previous.some(
            (later) =>
              later.checked_at > audit.checked_at &&
              later.review_status === "reviewed" &&
              later.pending_audit_refs.includes(audit.audit_id),
          ),
      )
      .map((audit) => audit.audit_id);
    const status = checks.some((item) => item.status === "blocked")
      ? "blocked"
      : checks.some((item) => item.status === "changed")
        ? "changed"
        : "no_change";
    const requestedTime = (input.now ?? (() => new Date()))().getTime();
    const previousTime = previous.at(-1)?.checked_at;
    const auditTime = new Date(
      Math.max(requestedTime, previousTime ? Date.parse(previousTime) + 1 : 0),
    );
    const affected = chapters.ok
      ? mapAuditImpacts(chapters.dataset, checks)
      : [];
    const audit = upstreamAuditSchema.parse({
      schema_version: 2,
      audit_id: `audit-${harnessId}-${randomUUID()}`,
      harness_id: harnessId,
      checked_at: auditTime.toISOString(),
      ...(previous.at(-1)
        ? { previous_audit_id: previous.at(-1)!.audit_id }
        : {}),
      status,
      review_status: status === "no_change" ? "not_required" : "pending",
      pending_audit_refs,
      checks,
      impacts: affected,
      pending_question_ids: [
        ...new Set(affected.flatMap((impact) => impact.question_ids)),
      ],
      investigation_notes: [],
    });
    results.push(audit);
  }
  return results;
}

export async function validateAuditLedger(
  rootInput: string,
  profile: "production" | "fixture" = "production",
): Promise<number> {
  const root = await realpath(rootInput);
  const validated = await loadAndValidateDataset({
    root,
    profile,
  });
  if (!validated.ok) throw new Error("Audit dataset is invalid.");
  const chapterDataset = await loadAndValidateChapters({
    root,
    profile,
  });
  const hasChapters = await lstat(
    path.join(root, "registry/chapter-current.yaml"),
  ).then(
    () => true,
    () => false,
  );
  if (!chapterDataset.ok && hasChapters)
    throw new Error("Production chapter dataset is invalid.");
  let directories: string[];
  try {
    const auditRoot = path.join(root, "audits");
    if (
      !(await lstat(auditRoot)).isDirectory() ||
      (await realpath(auditRoot)) !== auditRoot
    )
      throw new Error("Unsafe audit root.");
    directories = await readdir(auditRoot);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return 0;
    throw error;
  }
  let total = 0;
  for (const harnessId of directories) {
    if (
      !validated.dataset.harnesses.some((item) => item.harness_id === harnessId)
    )
      throw new Error(`Audit has unknown harness: ${harnessId}`);
    const directory = path.join(root, "audits", harnessId);
    if (!(await lstat(directory)).isDirectory())
      throw new Error(`Audit harness path is not a directory: ${harnessId}`);
    const audits = await priorAudits(root, harnessId);
    const seen = new Set<string>();
    for (const audit of audits) {
      if (audit.previous_audit_id && !seen.has(audit.previous_audit_id))
        throw new Error(`Missing previous audit: ${audit.audit_id}`);
      for (const pending of audit.pending_audit_refs)
        if (!seen.has(pending))
          throw new Error(`Missing pending audit: ${audit.audit_id}`);
      for (const impact of audit.impacts) {
        if (
          impact.surface_ids?.some(
            (id) =>
              !chapterDataset.ok ||
              !chapterDataset.dataset.catalog.products
                .find((product) => product.harness_id === harnessId)
                ?.surfaces.some((surface) => surface.surface_id === id),
          )
        )
          throw new Error(
            `Audit impact names an unknown surface: ${audit.audit_id}`,
          );
        if (!chapterDataset.ok)
          throw new Error(
            `Audit impact has no chapter dataset: ${audit.audit_id}`,
          );
        const chapters = chapterDataset.dataset.chapters.filter(
          (item) =>
            item.harness_id === harnessId && item.topic === impact.topic,
        );
        if (
          !chapters.length ||
          impact.question_ids.some(
            (id) =>
              !chapters.some((chapter) =>
                chapter.questions.some((q) => q.question_id === id),
              ),
          ) ||
          impact.section_ids.some(
            (id) =>
              !chapters.some((chapter) =>
                chapter.sections.some((section) => section.section_id === id),
              ),
          ) ||
          impact.source_refs.some(
            (id) =>
              !chapters.some((chapter) =>
                chapter.sections.some((section) =>
                  section.source_refs.includes(id),
                ),
              ),
          )
        )
          throw new Error(
            `Audit impact differs from published chapter: ${audit.audit_id}`,
          );
      }
      if (
        audit.pending_question_ids.some(
          (id) =>
            !audit.impacts.some((impact) => impact.question_ids.includes(id)),
        )
      )
        throw new Error(
          `Pending question lacks audit impact: ${audit.audit_id}`,
        );
      if (
        new Set(audit.checks.map((item) => item.source_id)).size !==
        audit.checks.length
      )
        throw new Error(`Duplicate audit source: ${audit.audit_id}`);
      const expected = audit.checks.some((item) => item.status === "blocked")
        ? "blocked"
        : audit.checks.some((item) => item.status === "changed")
          ? "changed"
          : "no_change";
      if (expected !== audit.status)
        throw new Error(`Audit status differs from checks: ${audit.audit_id}`);
      if (
        (audit.review_status === "reviewed" &&
          (!audit.reviewed_by ||
            !audit.reviewed_at ||
            audit.pending_question_ids.length > 0)) ||
        (audit.review_status === "not_required" && audit.status !== "no_change")
      )
        throw new Error(`Audit review state is incomplete: ${audit.audit_id}`);
      for (const check of audit.checks) {
        const source = validated.dataset.sources.find(
          (item) => item.source_id === check.source_id,
        );
        if (source && source.kind !== check.kind)
          throw new Error(`Audit source kind differs: ${audit.audit_id}`);
        if (
          check.candidate_path &&
          (!check.candidate_path.startsWith(`archive/${harnessId}/`) ||
            check.candidate_path
              .split("/")
              .some((part) => part === ".." || part === "."))
        )
          throw new Error(`Unsafe candidate path: ${audit.audit_id}`);
      }
      seen.add(audit.audit_id);
      total += 1;
    }
  }
  return total;
}
