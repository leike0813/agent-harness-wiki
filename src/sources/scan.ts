import { createHash, randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
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
import {
  topicSchema,
  upstreamAuditSchema,
  type Dataset,
  type SourceDefinition,
  type Topic,
  type UpstreamAudit,
} from "../domain/schema.js";
import { loadAndValidateDataset } from "../validation/dataset.js";
import { readArchivedPackageFile } from "./package-archive.js";

const exec = promisify(execFile);
const topics = topicSchema.options;
type Check = UpstreamAudit["checks"][number];
type RemoteSource = Exclude<SourceDefinition, { kind: "fixture_file" }>;
type GitRun = (args: string[]) => Promise<string>;

async function defaultGit(args: string[]): Promise<string> {
  const { stdout } = await exec("git", args, {
    timeout: 300_000,
    maxBuffer: 16 * 1024 * 1024,
    env: {
      PATH: process.env.PATH,
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_TERMINAL_PROMPT: "0",
      GIT_LFS_SKIP_SMUDGE: "1",
    },
  });
  return stdout;
}

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
  verify?: (file: string) => Promise<unknown>,
): Promise<void> {
  const destination = await archiveLocation(root, relative);
  const temporary = `${destination}.${randomUUID()}.tmp`;
  await writeFile(temporary, bytes, { flag: "wx" });
  try {
    if (verify) await verify(temporary);
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
    const audit = upstreamAuditSchema.parse(
      document.toJS({ maxAliasCount: 0 }),
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
    if (observed === baseline) return { observed, resolved_url: resolvedUrl };
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
    const tarball = details.tarball;
    if (
      typeof integrity !== "string" ||
      !/^sha512-[A-Za-z0-9+/]+={0,2}$/.test(integrity) ||
      typeof tarball !== "string" ||
      new URL(tarball).origin !== source.registry_url ||
      !tarball.startsWith("https://")
    )
      throw new Error("npm release integrity or tarball URL is invalid.");
    const observed = `${version}@${integrity}`;
    if (observed === baseline) return { observed };
    const { bytes: packageBytes, resolvedUrl } = await boundedFetch(
      tarball,
      128 * 1024 * 1024,
      fetchImpl,
    );
    const candidate_path = `archive/${source.harness_id}/npm/${version}/package.tgz`;
    await retainBytes(root, candidate_path, packageBytes, (file) =>
      readArchivedPackageFile(file, integrity),
    );
    return { observed, resolved_url: resolvedUrl, candidate_path };
  }

  const stdout = await git([
    "ls-remote",
    "--symref",
    source.repository_url,
    "HEAD",
  ]);
  const { commit: observed, ref } = parseHead(stdout);
  if (observed === baseline)
    return { observed, ...(ref ? { remote_ref: ref } : {}) };
  const candidate_path = `archive/${source.harness_id}/git/${observed}/checkout`;
  const directory = await archiveLocation(root, candidate_path);
  try {
    const stat = await lstat(directory);
    if (!stat.isDirectory() || stat.isSymbolicLink())
      throw new Error("Git candidate is not a directory.");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    await git([
      "-c",
      "core.hooksPath=/dev/null",
      "clone",
      "--filter=blob:none",
      "--depth=1",
      "--no-checkout",
      source.repository_url,
      directory,
    ]);
  }
  const head = (await git(["-C", directory, "rev-parse", "HEAD"])).trim();
  if (head !== observed)
    throw new Error("Git candidate commit differs from remote HEAD.");
  await git([
    "-c",
    "core.hooksPath=/dev/null",
    "-C",
    directory,
    "checkout",
    "--detach",
    observed,
  ]);
  let changed_paths: string[] | undefined;
  if (baseline && /^[a-f0-9]{40}$/.test(baseline)) {
    try {
      await git(["-C", directory, "fetch", "--depth=1", "origin", baseline]);
      changed_paths = (
        await git(["-C", directory, "diff", "--name-only", baseline, observed])
      )
        .split(/\r?\n/)
        .filter(Boolean);
    } catch {
      // The old revision may no longer be available remotely; review all topics.
    }
  }
  return {
    observed,
    candidate_path,
    ...(ref ? { remote_ref: ref } : {}),
    ...(changed_paths ? { changed_paths } : {}),
  };
}

function impacts(dataset: Dataset, checks: Check[]): UpstreamAudit["impacts"] {
  const collected = new Map<
    Topic,
    { claims: Set<string>; reasons: Set<string> }
  >();
  for (const check of checks) {
    if (check.status !== "changed") continue;
    const matchesSnapshot = (snapshotId: string): boolean => {
      const snapshot = dataset.snapshots.find(
        (record) => record.snapshot_id === snapshotId,
      );
      if (snapshot?.source_id !== check.source_id) return false;
      if (!check.changed_paths || !("kind" in snapshot)) return true;
      const artifact = dataset.artifacts.find(
        (record) => record.artifact_id === snapshot.artifact_id,
      );
      return Boolean(
        artifact &&
        "file" in artifact &&
        check.changed_paths.includes(artifact.file),
      );
    };
    const direct = dataset.evidence
      .filter((item) => matchesSnapshot(item.snapshot_id))
      .map((item) =>
        dataset.claims.find((claim) => claim.claim_id === item.claim_id),
      )
      .filter((claim) => claim !== undefined);
    const covered = dataset.coverage.filter((item) =>
      item.snapshot_refs?.some(matchesSnapshot),
    );
    const knownFiles = dataset.snapshots.flatMap((snapshot) => {
      if (snapshot.source_id !== check.source_id || !("kind" in snapshot))
        return [];
      const artifact = dataset.artifacts.find(
        (item) => item.artifact_id === snapshot.artifact_id,
      );
      return artifact && "file" in artifact ? [artifact.file] : [];
    });
    const broad =
      check.kind === "npm_registry" ||
      !check.changed_paths ||
      check.changed_paths.some(
        (file) =>
          /(^|\/)(config|configuration|build|package|feature|flags|loader)(\/|\.|$)/i.test(
            file,
          ) || !knownFiles.includes(file),
      ) ||
      (direct.length === 0 && covered.length === 0);
    const affected = broad
      ? topics
      : [
          ...new Set([
            ...direct.map((claim) => claim.topic),
            ...covered.map((item) => item.topic),
          ]),
        ];
    for (const topic of affected) {
      const item = collected.get(topic) ?? {
        claims: new Set<string>(),
        reasons: new Set<string>(),
      };
      for (const claim of direct)
        if (claim.topic === topic) item.claims.add(claim.claim_id);
      item.reasons.add(
        broad
          ? `${check.source_id}: broad review`
          : `${check.source_id}: referenced file changed`,
      );
      collected.set(topic, item);
    }
  }
  return [...collected.entries()].map(([topic, item]) => ({
    topic,
    claim_refs: [...item.claims].sort(),
    reason: [...item.reasons].sort().join("; "),
  }));
}

export async function scanHarnesses(input: {
  root: string;
  harnessIds: string[];
  fetchImpl?: typeof fetch;
  git?: GitRun;
  now?: () => Date;
}): Promise<UpstreamAudit[]> {
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
  if (input.harnessIds.length === 0)
    throw new Error("At least one harness ID is required.");
  const ids = [...new Set(input.harnessIds)];
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
    for (const sourceId of harness.source_refs) {
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
        );
        checks.push({
          source_id: sourceId,
          kind: source.kind,
          checked_at,
          status: result.observed === baseline ? "unchanged" : "changed",
          ...(baseline ? { baseline } : {}),
          ...result,
        });
      } catch (error) {
        checks.push({
          source_id: sourceId,
          kind: source.kind,
          checked_at,
          status: "blocked",
          ...(baseline ? { baseline } : {}),
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
    const pending_audit_refs = previous
      .filter((audit) => audit.review_status === "pending")
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
    const audit = upstreamAuditSchema.parse({
      schema_version: 1,
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
      impacts: impacts(dataset, checks),
      candidate_refs: [],
      investigation_notes: [],
    });
    const auditRoot = path.join(root, "audits");
    await mkdir(auditRoot, { recursive: true });
    if ((await realpath(auditRoot)) !== auditRoot)
      throw new Error("Unsafe audit root.");
    const directory = path.join(auditRoot, harnessId);
    await mkdir(directory, { recursive: true });
    if ((await realpath(directory)) !== directory)
      throw new Error(`Unsafe audit directory: ${harnessId}`);
    await writeFile(
      path.join(directory, `${audit.audit_id}.yaml`),
      YAML.stringify(audit),
      {
        flag: "wx",
      },
    );
    results.push(audit);
  }
  return results;
}

export async function validateAuditLedger(rootInput: string): Promise<number> {
  const root = await realpath(rootInput);
  const validated = await loadAndValidateDataset({
    root,
    profile: "production",
  });
  if (!validated.ok) throw new Error("Production dataset is invalid.");
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
          (!audit.reviewed_by || !audit.reviewed_at)) ||
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
