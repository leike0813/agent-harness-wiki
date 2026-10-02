/**
 * Independent program (npm) publication over the shared publication ledger.
 *
 * A candidate is fixed by its commit and the sha512/sha1 of the exact packed
 * tgz. `next` publishes that artifact, `promote` moves `latest` only after six
 * independent public reports agree on the program version and the knowledge
 * release they observed. Every registry read is bounded; no user npm
 * configuration, HOME or long-lived token is used, so OIDC trusted publishing
 * keeps working from the isolated environment.
 */
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import * as z from "zod";
import { consumerResultSchemas } from "../domain/consumer.js";
import {
  consumerPackageName,
  publicRegistry,
  type ConsumerProcess,
} from "./consumer-verification.js";
import type { LedgerSnapshot } from "./github.js";

export class ProgramError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

/** Structural view of PublicationGithub; only the ledger read/write is needed. */
export interface ProgramStore {
  readState(): Promise<LedgerSnapshot>;
  writeState(
    snapshot: LedgerSnapshot,
    message: string,
  ): Promise<LedgerSnapshot>;
}
export type ProgramRunner = ConsumerProcess;

const stableVersion = z
  .string()
  .regex(/^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/);

export const candidateManifestSchema = z.strictObject({
  schema_version: z.literal(1),
  package: z.string().min(1),
  version: stableVersion,
  commit: z.string().regex(/^[a-f0-9]{40}$/),
  integrity: z.string().regex(/^sha512-[A-Za-z0-9+/]+={0,2}$/),
  shasum: z.string().regex(/^[a-f0-9]{40}$/),
  tarball: z.string().min(1),
  size: z.number().int().nonnegative(),
});
export type CandidateManifest = z.infer<typeof candidateManifestSchema>;

const sriOf = (bytes: Buffer) =>
  `sha512-${createHash("sha512").update(bytes).digest("base64")}`;
const sha1Of = (bytes: Buffer) =>
  createHash("sha1").update(bytes).digest("hex");

/** Fix a packed tgz by its own bytes; the artifact is never rebuilt from memory. */
export async function candidateManifest(options: {
  version: string;
  commit: string;
  tgz: string;
  package?: string;
}): Promise<CandidateManifest> {
  const bytes = await readFile(options.tgz);
  return candidateManifestSchema.parse({
    schema_version: 1,
    package: options.package ?? consumerPackageName,
    version: options.version,
    commit: options.commit,
    integrity: sriOf(bytes),
    shasum: sha1Of(bytes),
    tarball: path.resolve(options.tgz),
    size: bytes.byteLength,
  });
}

const registrySchema = z.object({
  "dist-tags": z.record(z.string(), z.string()).default({}),
  versions: z
    .record(
      z.string(),
      z.object({
        dist: z
          .object({
            integrity: z.string().optional(),
            shasum: z.string().optional(),
            tarball: z.string().optional(),
          })
          .optional(),
      }),
    )
    .default({}),
});
export type RegistryState = {
  latest: string | null;
  versions: z.infer<typeof registrySchema>["versions"];
};
export type RegistryCheck =
  | { state: "package_missing" }
  | { state: "version_missing" }
  | { state: "present" };

export type ProgramFetch = typeof fetch;

async function readBounded(response: Response, limit: number): Promise<Buffer> {
  if (!response.body)
    throw new ProgramError(
      "registry_failure",
      "Registry response has no body.",
    );
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of response.body) {
    total += chunk.byteLength;
    if (total > limit)
      throw new ProgramError(
        "registry_too_large",
        "Registry response exceeds its bound.",
      );
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function fetchBytes(
  fetchImpl: ProgramFetch,
  url: string,
  limit: number,
  timeoutMs: number,
): Promise<Buffer> {
  const response = await fetchImpl(url, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: { accept: "application/octet-stream" },
  });
  if (!response.ok)
    throw new ProgramError(
      "registry_failure",
      `Registry read failed (${response.status}) for ${url}.`,
    );
  return readBounded(response, limit);
}

async function fetchRegistry(
  fetchImpl: ProgramFetch,
  registry: string,
  name: string,
): Promise<RegistryState | null> {
  const url = `${registry.replace(/\/+$/, "")}/${name.startsWith("@") ? name.replace("/", "%2f") : name}`;
  const response = await fetchImpl(url, {
    signal: AbortSignal.timeout(15_000),
    headers: {
      accept: "application/vnd.npm.install-v1+json, application/json",
    },
  });
  if (response.status === 404) {
    await response.body?.cancel();
    return null;
  }
  if (!response.ok)
    throw new ProgramError(
      "registry_failure",
      `Registry metadata read failed (${response.status}).`,
    );
  const body = await readBounded(response, 8 * 1024 * 1024);
  const parsed = registrySchema.parse(JSON.parse(body.toString("utf8")));
  return {
    latest: parsed["dist-tags"].latest ?? null,
    versions: parsed.versions,
  };
}

/**
 * Confirm the registry holds this exact artifact. Metadata fields are checked
 * and the tarball itself is re-hashed against the manifest, so a matching
 * shasum alone can never stand in for the real bytes.
 */
export async function verifyPublishedVersion(
  fetchImpl: ProgramFetch,
  options: { registry: string; name: string; manifest: CandidateManifest },
): Promise<RegistryCheck> {
  const metadata = await fetchRegistry(
    fetchImpl,
    options.registry,
    options.name,
  );
  if (!metadata) return { state: "package_missing" };
  const entry = metadata.versions[options.manifest.version];
  if (!entry) return { state: "version_missing" };
  const dist = entry.dist;
  if (dist?.integrity && dist.integrity !== options.manifest.integrity)
    throw new ProgramError(
      "integrity_mismatch",
      `Published ${options.name}@${options.manifest.version} has a different integrity.`,
    );
  if (dist?.shasum && dist.shasum !== options.manifest.shasum)
    throw new ProgramError(
      "integrity_mismatch",
      `Published ${options.name}@${options.manifest.version} has a different shasum.`,
    );
  if (!dist?.tarball)
    throw new ProgramError(
      "integrity_mismatch",
      `Published ${options.name}@${options.manifest.version} exposes no tarball.`,
    );
  const bytes = await fetchBytes(
    fetchImpl,
    dist.tarball,
    64 * 1024 * 1024,
    60_000,
  );
  if (
    sriOf(bytes) !== options.manifest.integrity ||
    sha1Of(bytes) !== options.manifest.shasum
  )
    throw new ProgramError(
      "integrity_mismatch",
      `Registry tarball for ${options.name}@${options.manifest.version} differs from the candidate.`,
    );
  return { state: "present" };
}

/** Isolated npm environment: no inherited HOME or npm configuration, OIDC kept. */
function publishEnvironment(base: string, registry: string): NodeJS.ProcessEnv {
  const home = path.join(base, "home");
  const env: NodeJS.ProcessEnv = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined) continue;
    if (/^npm_config_/i.test(key)) continue;
    if (/^(?:https?|all|no)_proxy$/i.test(key)) continue;
    if (key === "PATH" || key === "Path") env[key] = value;
    else if (/^ACTIONS_ID_TOKEN_REQUEST_/.test(key)) env[key] = value;
    else if (/^GITHUB_/.test(key) && key !== "GITHUB_TOKEN") env[key] = value;
    else if (
      process.platform === "win32" &&
      /^(?:SystemRoot|COMSPEC|PATHEXT|TEMP|TMP)$/i.test(key)
    )
      env[key] = value;
  }
  env.HOME = home;
  env.USERPROFILE = home;
  env.APPDATA = path.join(home, "AppData", "Roaming");
  env.LOCALAPPDATA = path.join(home, "AppData", "Local");
  env.npm_config_userconfig = path.join(base, "user.npmrc");
  env.npm_config_globalconfig = path.join(base, "global.npmrc");
  env.npm_config_cache = path.join(base, "cache");
  env.npm_config_registry = registry;
  env.npm_config_audit = "false";
  env.npm_config_fund = "false";
  env.npm_config_loglevel = "error";
  return env;
}

async function runNpm(
  runner: ProgramRunner,
  args: string[],
  cwd: string,
  registry: string,
): Promise<string> {
  const npm = await runner.npm();
  const base = await mkdtemp(path.join(tmpdir(), "ahw-program-"));
  try {
    await writeFile(path.join(base, "user.npmrc"), "");
    await writeFile(path.join(base, "global.npmrc"), "");
    return await runner.runNode(
      [npm, ...args],
      cwd,
      publishEnvironment(base, registry),
    );
  } finally {
    await rm(base, { recursive: true, force: true });
  }
}

async function writeCandidate(
  store: ProgramStore,
  snapshot: LedgerSnapshot,
  version: string,
  patch: {
    status: "prepared" | "next" | "verified" | "promoted" | "failed";
    verified_release_id?: string | null;
    latest?: string;
  },
  now: string,
  message: string,
): Promise<LedgerSnapshot> {
  const candidate = snapshot.state.npm.candidates[version];
  if (!candidate)
    throw new ProgramError(
      "candidate_missing",
      `Ledger has no npm candidate ${version}.`,
    );
  candidate.status = patch.status;
  if (patch.verified_release_id !== undefined)
    candidate.verified_release_id = patch.verified_release_id;
  if (patch.latest !== undefined) snapshot.state.npm.latest = patch.latest;
  candidate.updated_at = now;
  return store.writeState(snapshot, message);
}

/** Record the immutable candidate identity; a retry with another artifact is rejected. */
export async function prepareCandidate(
  store: ProgramStore,
  manifest: CandidateManifest,
  now: string,
): Promise<LedgerSnapshot> {
  const parsed = candidateManifestSchema.parse(manifest);
  const snapshot = await store.readState();
  const existing = snapshot.state.npm.candidates[parsed.version];
  if (existing) {
    if (
      existing.commit !== parsed.commit ||
      existing.integrity !== parsed.integrity
    )
      throw new ProgramError(
        "candidate_conflict",
        `Candidate ${parsed.version} is immutable; it was prepared from a different artifact.`,
      );
    return snapshot;
  }
  snapshot.state.npm.candidates[parsed.version] = {
    commit: parsed.commit,
    integrity: parsed.integrity,
    status: "prepared",
    verified_release_id: null,
    updated_at: now,
  };
  return store.writeState(snapshot, `Prepare npm candidate ${parsed.version}`);
}

export interface NextResult {
  status: "next" | "bootstrap_required";
  published: boolean;
  snapshot: LedgerSnapshot;
}

/**
 * Publish the candidate to `next`, or recognize an artifact that is already
 * published with exactly the same integrity. A package that cannot accept a
 * trusted publish yet reports `bootstrap_required` and leaves the candidate
 * failed with no version published.
 */
export async function nextCandidate(options: {
  store: ProgramStore;
  runner: ProgramRunner;
  manifest: CandidateManifest;
  now: string;
  registry?: string;
  fetchImpl?: ProgramFetch;
}): Promise<NextResult> {
  const manifest = candidateManifestSchema.parse(options.manifest);
  const registry = options.registry ?? publicRegistry;
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  let snapshot = await prepareCandidate(options.store, manifest, options.now);
  const fail = async (error: unknown): Promise<never> => {
    await writeCandidate(
      options.store,
      snapshot,
      manifest.version,
      { status: "failed" },
      options.now,
      `Failed npm candidate ${manifest.version}`,
    );
    throw error;
  };

  const before = await verifyPublishedVersion(fetchImpl, {
    registry,
    name: manifest.package,
    manifest,
  }).catch(fail);
  if (before.state === "present") {
    snapshot = await writeCandidate(
      options.store,
      snapshot,
      manifest.version,
      { status: "next" },
      options.now,
      `Recognize published npm candidate ${manifest.version}`,
    );
    return { status: "next", published: false, snapshot };
  }
  if (before.state === "package_missing") {
    await writeCandidate(
      options.store,
      snapshot,
      manifest.version,
      { status: "failed" },
      options.now,
      `Bootstrap required for npm candidate ${manifest.version}`,
    );
    return { status: "bootstrap_required", published: false, snapshot };
  }

  await runNpm(
    options.runner,
    ["publish", manifest.tarball, "--tag", "next", "--access", "public"],
    path.dirname(manifest.tarball),
    registry,
  ).catch(fail);

  const after = await verifyPublishedVersion(fetchImpl, {
    registry,
    name: manifest.package,
    manifest,
  }).catch(fail);
  if (after.state !== "present")
    throw new ProgramError(
      "registry_missing",
      `Published ${manifest.package}@${manifest.version} is not readable on the registry.`,
    );
  snapshot = await writeCandidate(
    options.store,
    snapshot,
    manifest.version,
    { status: "next" },
    options.now,
    `Publish npm candidate ${manifest.version} to next`,
  );
  return { status: "next", published: true, snapshot };
}

/** Semver comparison for the stable x.y.z versions this channel publishes. */
export function compareStableVersions(a: string, b: string): number {
  const parts = (version: string): number[] => {
    const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(version);
    if (!match)
      throw new ProgramError(
        "invalid_version",
        `"${version}" is not a stable x.y.z version.`,
      );
    return [Number(match[1]), Number(match[2]), Number(match[3])];
  };
  const left = parts(a);
  const right = parts(b);
  for (let index = 0; index < 3; index += 1) {
    const difference = left[index]! - right[index]!;
    if (difference !== 0) return difference < 0 ? -1 : 1;
  }
  return 0;
}

export const publicReportSchema = z.object({
  result: z.enum(["passed", "failed"]),
  package: z.object({ name: z.string(), version: z.string() }),
  release_id: z.string(),
  checks: z.array(
    z.object({ name: z.string(), status: z.enum(["passed", "failed"]) }),
  ),
  failures: z.array(z.string()),
  platforms: z.record(z.string(), z.string()),
});

/** Operating systems the public matrix must cover. */
export const requiredPublicCombos = [
  "linux-x64",
  "darwin-arm64",
  "win32-x64",
] as const;
const consumerToolNames = Object.keys(consumerResultSchemas);
/** Stable report-contract checks every passing platform report must contain. */
export const requiredPublicChecks: readonly string[] = [
  "installed --version",
  ...consumerToolNames.map((name) => `CLI ${name}`),
  ...consumerToolNames.map((name) => `MCP ${name}`),
  "MCP serverInfo version",
  "MCP tools are the five read-only tools",
  "public readback probe",
];

/**
 * Six independent platform reports must all pass, describe the same program
 * version, agree on the one knowledge release the locked site served, and
 * cover both the minimum and a newer Node 24.x on at least three operating
 * systems. Distinct platform keys alone cannot satisfy the matrix.
 */
export function validatePublicReports(
  reports: unknown[],
  expected: { version: string; releaseId: string; minimumNode: string },
): number {
  if (reports.length < 6)
    throw new ProgramError(
      "reports_missing",
      `Promotion needs six public reports, found ${reports.length}.`,
    );
  if (!/^\d+\.\d+\.\d+$/.test(expected.minimumNode))
    throw new ProgramError(
      "invalid_version",
      `"${expected.minimumNode}" is not a stable Node version.`,
    );
  const major = expected.minimumNode.split(".")[0]!;
  const combos = new Map<string, Set<string>>();
  for (const raw of reports) {
    const report = publicReportSchema.parse(raw);
    if (
      report.result !== "passed" ||
      report.failures.length > 0 ||
      report.checks.some((check) => check.status !== "passed")
    )
      throw new ProgramError(
        "report_failed",
        "A public platform report did not pass.",
      );
    if (
      report.package.name !== consumerPackageName ||
      report.package.version !== expected.version
    )
      throw new ProgramError(
        "report_mismatch",
        `A report covers ${report.package.name}@${report.package.version}.`,
      );
    if (report.release_id !== expected.releaseId)
      throw new ProgramError(
        "report_mismatch",
        `A report observed ${report.release_id}, expected ${expected.releaseId}.`,
      );
    for (const key of Object.keys(report.platforms)) {
      const match =
        /^(linux|darwin|win32)-(x64|arm64)-nodev?(\d+\.\d+\.\d+)$/.exec(key);
      if (!match)
        throw new ProgramError(
          "report_mismatch",
          `Unexpected platform key ${key}.`,
        );
      const combo = `${match[1]}-${match[2]}`;
      const nodes = combos.get(combo) ?? new Set<string>();
      nodes.add(match[3]!);
      combos.set(combo, nodes);
    }
    const names = new Set(report.checks.map((check) => check.name));
    const missing = requiredPublicChecks.filter((name) => !names.has(name));
    if (missing.length)
      throw new ProgramError(
        "report_mismatch",
        `A report is missing required checks: ${missing.join(", ")}.`,
      );
  }
  const missingCombos = requiredPublicCombos.filter(
    (combo) => !combos.has(combo),
  );
  if (missingCombos.length)
    throw new ProgramError(
      "reports_missing",
      `No public report for ${missingCombos.join(", ")}.`,
    );
  for (const [combo, nodes] of combos) {
    if (!nodes.has(expected.minimumNode))
      throw new ProgramError(
        "report_mismatch",
        `${combo} has no minimum Node ${expected.minimumNode} report.`,
      );
    const newer = [...nodes].some(
      (node) =>
        node.split(".")[0] === major &&
        compareStableVersions(node, expected.minimumNode) > 0,
    );
    if (!newer)
      throw new ProgramError(
        "report_mismatch",
        `${combo} has no newer Node ${major}.x report.`,
      );
  }
  return combos.size;
}

/**
 * Promote the candidate to `latest` only after the public reports pass. The
 * ledger reaches `verified` before the registry tag moves, so an interrupted
 * promotion leaves `latest` unchanged and stays reconcilable.
 */
export async function promoteCandidate(options: {
  store: ProgramStore;
  runner: ProgramRunner;
  version: string;
  expectedReleaseId: string;
  reports: unknown[];
  now: string;
  minimumNode: string;
  registry?: string;
  fetchImpl?: ProgramFetch;
}): Promise<LedgerSnapshot> {
  const registry = options.registry ?? publicRegistry;
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const snapshot = await options.store.readState();
  const candidate = snapshot.state.npm.candidates[options.version];
  if (!candidate)
    throw new ProgramError(
      "candidate_missing",
      `Ledger has no npm candidate ${options.version}.`,
    );
  if (
    candidate.status !== "next" &&
    candidate.status !== "verified" &&
    candidate.status !== "promoted"
  )
    throw new ProgramError(
      "candidate_not_published",
      `Candidate ${options.version} is ${candidate.status}; publish it to next first.`,
    );
  validatePublicReports(options.reports, {
    version: options.version,
    releaseId: options.expectedReleaseId,
    minimumNode: options.minimumNode,
  });

  const metadata = await fetchRegistry(
    fetchImpl,
    registry,
    consumerPackageName,
  );
  const latestKnown = [
    snapshot.state.npm.latest,
    metadata?.latest ?? null,
  ].filter((value): value is string => value !== null && value !== undefined);
  for (const current of latestKnown)
    if (
      /^\d+\.\d+\.\d+$/.test(current) &&
      compareStableVersions(options.version, current) < 0
    )
      throw new ProgramError(
        "older_candidate",
        `${options.version} is older than the current latest ${current}.`,
      );
  await assertRegistryIntegrity(
    fetchImpl,
    registry,
    options.version,
    candidate.integrity,
  );

  if (candidate.status === "promoted" && metadata?.latest === options.version)
    return writeCandidate(
      options.store,
      snapshot,
      options.version,
      {
        status: "promoted",
        verified_release_id: options.expectedReleaseId,
        latest: options.version,
      },
      options.now,
      `Confirm npm ${options.version} latest`,
    );

  const verified = await writeCandidate(
    options.store,
    snapshot,
    options.version,
    { status: "verified", verified_release_id: options.expectedReleaseId },
    options.now,
    `Verify npm candidate ${options.version}`,
  );
  try {
    await runNpm(
      options.runner,
      [
        "dist-tag",
        "add",
        `${consumerPackageName}@${options.version}`,
        "latest",
      ],
      process.cwd(),
      registry,
    );
  } catch (error) {
    await writeCandidate(
      options.store,
      verified,
      options.version,
      { status: "failed" },
      options.now,
      `Failed npm promotion ${options.version}`,
    );
    throw error;
  }
  const confirmed = await fetchRegistry(
    fetchImpl,
    registry,
    consumerPackageName,
  );
  if (confirmed?.latest !== options.version)
    throw new ProgramError(
      "latest_unconfirmed",
      `Registry latest is ${confirmed?.latest ?? "unset"} after promoting ${options.version}.`,
    );
  return writeCandidate(
    options.store,
    verified,
    options.version,
    {
      status: "promoted",
      verified_release_id: options.expectedReleaseId,
      latest: options.version,
    },
    options.now,
    `Promote npm ${options.version} to latest`,
  );
}

/** The registry must still hold exactly the artifact the ledger recorded. */
async function assertRegistryIntegrity(
  fetchImpl: ProgramFetch,
  registry: string,
  version: string,
  integrity: string,
): Promise<void> {
  const metadata = await fetchRegistry(
    fetchImpl,
    registry,
    consumerPackageName,
  );
  const entry = metadata?.versions[version];
  if (!entry?.dist?.tarball)
    throw new ProgramError(
      "registry_missing",
      `${consumerPackageName}@${version} is not readable on the registry.`,
    );
  if (entry.dist.integrity && entry.dist.integrity !== integrity)
    throw new ProgramError(
      "integrity_mismatch",
      `Registry metadata for ${consumerPackageName}@${version} differs from the ledger.`,
    );
  const bytes = await fetchBytes(
    fetchImpl,
    entry.dist.tarball,
    64 * 1024 * 1024,
    60_000,
  );
  if (sriOf(bytes) !== integrity)
    throw new ProgramError(
      "integrity_mismatch",
      `Registry tarball for ${consumerPackageName}@${version} differs from the ledger.`,
    );
}
