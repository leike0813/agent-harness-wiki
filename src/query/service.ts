import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Database from "better-sqlite3";
import * as z from "zod";
import { verifyRelease } from "../compiler/release.js";
import { canonical } from "../compiler/projection.js";
import {
  assessmentSchema,
  claimSchema,
  coverageSchema,
  evidenceSchema,
  guideSchema,
  harnessSchema,
  snapshotSchema,
  topicSchema,
  type Claim,
  type CoverageRecord,
  type HarnessDefinition,
  type Guide,
  type SnapshotManifest,
  type Target,
} from "../domain/schema.js";
import {
  compareSchema,
  evidenceRequestSchema,
  listSchema,
  queryRequestSchema,
  searchSchema,
} from "./schema.js";

const releaseIdSchema = z.string().regex(/^[a-z][a-z0-9_-]*$/);
type CapabilityRequest = z.infer<typeof queryRequestSchema>;
type Version = Target["version_identity"];
type Fact = {
  claim: Claim;
  target: Target;
  review_status: "accepted" | "disputed";
};
type ResolvedGuide = Guide & {
  target: Target;
  topic: z.infer<typeof topicSchema>;
  coverage_status: CoverageRecord["status"];
};
type Status =
  | "ok"
  | "partial"
  | "ambiguous"
  | "not_verified"
  | "conflict"
  | "not_found"
  | "unknown";

const chineseTopics: Record<string, z.infer<typeof topicSchema>> = {
  技能: "skills",
  MCP: "mcp",
  自定义代理: "custom_agents",
  自定义提供商: "custom_providers",
  钩子: "hooks",
  原生插件: "native_plugins",
  配置: "configuration",
};

function scopeOf(target: Target): Omit<Target, "version_identity"> {
  const { harness_id, surface, distribution, os, arch, execution_mode } =
    target;
  return { harness_id, surface, distribution, os, arch, execution_mode };
}

function sameScope(
  left: Omit<Target, "version_identity">,
  right: Omit<Target, "version_identity">,
): boolean {
  return canonical(left) === canonical(right);
}

function compareVersion(a: Version, b: Version): number | undefined {
  if (a.kind !== "release" || b.kind !== "release") return undefined;
  if (!/^\d+(\.\d+)*$/.test(a.value) || !/^\d+(\.\d+)*$/.test(b.value))
    return undefined;
  const left = a.value.split(".").map(Number);
  const right = b.value.split(".").map(Number);
  if (
    left.some((n) => !Number.isSafeInteger(n)) ||
    right.some((n) => !Number.isSafeInteger(n))
  )
    return undefined;
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const delta = (left[i] ?? 0) - (right[i] ?? 0);
    if (delta) return Math.sign(delta);
  }
  return 0;
}

function newest(versions: Version[]): Version | undefined | "ambiguous" {
  const unique = [
    ...new Map(versions.map((item) => [canonical(item), item])).values(),
  ];
  if (!unique.length) return undefined;
  if (unique.length === 1) return unique[0];
  let selected = unique[0]!;
  for (const item of unique.slice(1)) {
    const order = compareVersion(item, selected);
    if (
      order === undefined ||
      (order === 0 && canonical(item) !== canonical(selected))
    )
      return "ambiguous";
    if (order > 0) selected = item;
  }
  return selected;
}

function conditionKey(value: CapabilityRequest["conditions"][number]): string {
  if ("name" in value) return `${value.type}:${value.name}`;
  if ("key" in value) return `${value.type}:${value.key}`;
  if ("id" in value) return `${value.type}:${value.id}`;
  return value.type;
}

function conditionMatch(
  required: Claim["conditions"]["all_of"],
  provided: CapabilityRequest["conditions"],
): "match" | "missing" | "mismatch" {
  let missing = false;
  for (const item of required) {
    const supplied = provided.filter(
      (other) => conditionKey(other) === conditionKey(item),
    );
    if (!supplied.length) missing = true;
    else if (supplied.some((other) => canonical(other) !== canonical(item)))
      return "mismatch";
  }
  return missing ? "missing" : "match";
}

function page<T>(
  items: T[],
  limit: number,
  cursor: string | undefined,
  releaseId: string,
  query: unknown,
): { items: T[]; next_cursor?: string } {
  const digest = createHash("sha256").update(canonical(query)).digest("hex");
  let offset = 0;
  if (cursor) {
    let decoded: unknown;
    try {
      decoded = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    } catch {
      throw new Error("Invalid cursor.");
    }
    const parsed = z
      .strictObject({
        release: releaseIdSchema,
        digest: z.string(),
        order: z.literal(1),
        offset: z.int().nonnegative(),
      })
      .safeParse(decoded);
    if (
      !parsed.success ||
      parsed.data.release !== releaseId ||
      parsed.data.digest !== digest ||
      parsed.data.offset > items.length
    )
      throw new Error("Cursor does not match this release or query.");
    offset = parsed.data.offset;
  }
  const next = offset + limit;
  return {
    items: items.slice(offset, next),
    ...(next < items.length
      ? {
          next_cursor: Buffer.from(
            JSON.stringify({
              release: releaseId,
              digest,
              order: 1,
              offset: next,
            }),
          ).toString("base64url"),
        }
      : {}),
  };
}

function rows<T>(
  db: Database.Database,
  table: string,
  schema: z.ZodType<T>,
): T[] {
  return (
    db.prepare(`SELECT payload_json FROM ${table} ORDER BY id`).all() as {
      payload_json: string;
    }[]
  ).map((row) => schema.parse(JSON.parse(row.payload_json)));
}

export class QueryService {
  private constructor(
    readonly releaseId: string,
    private readonly db: Database.Database,
    private readonly harnesses: HarnessDefinition[],
    private readonly snapshots: SnapshotManifest[],
    private readonly claims: Fact[],
    private readonly coverage: CoverageRecord[],
    private readonly evidence: z.infer<typeof evidenceSchema>[],
    private readonly guides: ResolvedGuide[],
  ) {}

  static async open(options: {
    releasesRoot: string;
    releaseId?: string;
  }): Promise<QueryService> {
    const explicit = options.releaseId !== undefined;
    const pointer = explicit
      ? undefined
      : (JSON.parse(
          await readFile(
            path.join(options.releasesRoot, "current.json"),
            "utf8",
          ),
        ) as unknown);
    const releaseId = releaseIdSchema.parse(
      explicit
        ? options.releaseId
        : z.strictObject({ release_id: releaseIdSchema }).parse(pointer)
            .release_id,
    );
    const releaseDir = path.join(options.releasesRoot, releaseId);
    const manifest = await verifyRelease(releaseDir);
    if (manifest.profile === "fixture" && !explicit)
      throw new Error("Fixture release requires an explicit release ID.");
    const db = new Database(path.join(releaseDir, "knowledge.sqlite"), {
      readonly: true,
      fileMustExist: true,
    });
    try {
      const harnesses = rows(db, "harnesses", harnessSchema);
      const snapshots = rows(db, "snapshots", snapshotSchema);
      const claimRecords = rows(db, "claims", claimSchema);
      const assessments = rows(db, "assessments", assessmentSchema);
      const disputed = new Set(
        assessments
          .filter((item) => item.status === "disputed")
          .map((item) => item.claim_id),
      );
      const claims: Fact[] = claimRecords.map((claim) => ({
        claim,
        target: {
          ...claim.target,
          version_identity: claim.version_applicability.versions[0],
        },
        review_status: disputed.has(claim.claim_id) ? "disputed" : "accepted",
      }));
      const coverage = rows(db, "coverage", coverageSchema);
      const coverageById = new Map(
        coverage.map((item) => [item.coverage_id, item]),
      );
      const hasGuides = db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'guides'",
        )
        .get();
      const guides: ResolvedGuide[] = hasGuides
        ? rows(db, "guides", guideSchema).map((guide) => {
            const linked = coverageById.get(guide.coverage_ref);
            if (!linked)
              throw new Error(`Guide coverage missing: ${guide.guide_id}`);
            return {
              ...guide,
              target: linked.target,
              topic: linked.topic,
              coverage_status: linked.status,
            };
          })
        : [];
      return new QueryService(
        releaseId,
        db,
        harnesses,
        snapshots,
        claims,
        coverage,
        rows(db, "evidence", evidenceSchema),
        guides,
      );
    } catch (error) {
      db.close();
      throw error;
    }
  }

  close(): void {
    this.db.close();
  }

  private harness(name: string): HarnessDefinition | undefined {
    const matched = this.harnesses.filter((item) =>
      [item.harness_id, item.name, ...item.aliases].some(
        (alias) => alias.toLocaleLowerCase() === name.toLocaleLowerCase(),
      ),
    );
    if (matched.length > 1) throw new Error(`Ambiguous harness alias: ${name}`);
    return matched[0];
  }

  listHarnesses(input: unknown = {}): {
    release_id: string;
    items: HarnessDefinition[];
    next_cursor?: string;
  } {
    const request = listSchema.parse(input);
    const filtered = this.harnesses.filter(
      (item) =>
        !request.search ||
        [item.harness_id, item.name, ...item.aliases].some((name) =>
          name
            .toLocaleLowerCase()
            .includes(request.search!.toLocaleLowerCase()),
        ),
    );
    return {
      release_id: this.releaseId,
      ...page(filtered, request.limit, request.cursor, this.releaseId, {
        search: request.search ?? "",
      }),
    };
  }

  getCapability(input: unknown): {
    release_id: string;
    status: Status;
    requested_version: CapabilityRequest["version"];
    target?: Target;
    source_observed_at?: string;
    coverage: CoverageRecord[];
    facts: Fact[];
    guides: ResolvedGuide[];
  } {
    const request = queryRequestSchema.parse(input);
    const conditionKeys = request.conditions.map(conditionKey);
    if (new Set(conditionKeys).size !== conditionKeys.length)
      throw new Error("Duplicate condition key in query.");
    const harness = this.harness(request.scope.harness);
    if (!harness)
      return {
        release_id: this.releaseId,
        status: "not_found",
        requested_version: request.version,
        coverage: [],
        facts: [],
        guides: [],
      };
    const { surface, distribution, os, arch, execution_mode } = request.scope;
    const scope = {
      harness_id: harness.harness_id,
      surface,
      distribution,
      os,
      arch,
      execution_mode,
    };
    const inScope = (target: Target) => sameScope(scopeOf(target), scope);
    let version: Version | undefined | "ambiguous";
    if (request.version.policy === "exact") version = request.version.identity;
    else if (request.version.policy === "latest_verified")
      version = newest(
        this.claims
          .filter(
            (item) =>
              item.review_status === "accepted" &&
              inScope(item.target) &&
              (!request.topic || item.claim.topic === request.topic) &&
              (!request.fact_key || item.claim.fact_key === request.fact_key),
          )
          .map((item) => item.target.version_identity),
      );
    else
      version = newest(
        this.snapshots.flatMap((item) =>
          "target" in item && inScope(item.target)
            ? [item.target.version_identity]
            : [],
        ),
      );
    const empty = (status: Status) => ({
      release_id: this.releaseId,
      status,
      requested_version: request.version,
      coverage: [],
      facts: [],
      guides: [],
    });
    if (version === "ambiguous") return empty("ambiguous");
    if (!version) return empty("not_verified");
    const target: Target = { ...scope, version_identity: version };
    const sameTarget = (candidate: Target) =>
      canonical(candidate) === canonical(target);
    const coverage = this.coverage.filter(
      (item) =>
        sameTarget(item.target) &&
        (!request.topic || item.topic === request.topic),
    );
    let missing = false;
    const facts = this.claims.filter((item) => {
      if (
        !sameTarget(item.target) ||
        (request.topic && item.claim.topic !== request.topic) ||
        (request.fact_key && item.claim.fact_key !== request.fact_key)
      )
        return false;
      const condition = conditionMatch(
        item.claim.conditions.all_of,
        request.conditions,
      );
      if (condition === "missing") missing = true;
      return condition !== "mismatch";
    });
    const guides = request.fact_key
      ? []
      : this.guides.filter(
          (item) =>
            sameTarget(item.target) &&
            (!request.topic || item.topic === request.topic),
        );
    const sourceTimes = this.snapshots
      .filter((item) => "target" in item && sameTarget(item.target))
      .map((item) => item.source_fetched_at)
      .sort();
    const status: Status = facts.some(
      (item) => item.review_status === "disputed",
    )
      ? "conflict"
      : missing
        ? "ambiguous"
        : !facts.length
          ? coverage.some((item) => item.status === "partial")
            ? "partial"
            : coverage.some((item) => item.status === "complete")
              ? "unknown"
              : "not_verified"
          : coverage.some((item) => item.status !== "complete")
            ? "partial"
            : "ok";
    return {
      release_id: this.releaseId,
      status,
      requested_version: request.version,
      target,
      ...(request.version.policy === "latest_upstream" && sourceTimes.length
        ? { source_observed_at: sourceTimes.at(-1)! }
        : {}),
      coverage,
      facts,
      guides,
    };
  }

  compareCapabilities(input: unknown): {
    release_id: string;
    dimensions: { topic: string; fact_key: string; facts: Fact[][] }[];
    results: ReturnType<QueryService["getCapability"]>[];
  } {
    const request = compareSchema.parse(input);
    const results = request.requests.map((item) => this.getCapability(item));
    const dimensions = [
      ...new Set(
        results.flatMap((item) =>
          item.facts.map(
            (fact) => `${fact.claim.topic}:${fact.claim.fact_key}`,
          ),
        ),
      ),
    ]
      .sort()
      .map((key) => {
        const separator = key.indexOf(":");
        const topic = key.slice(0, separator);
        const fact_key = key.slice(separator + 1);
        return {
          topic,
          fact_key,
          facts: results.map((item) =>
            item.facts.filter(
              (fact) =>
                fact.claim.topic === topic && fact.claim.fact_key === fact_key,
            ),
          ),
        };
      });
    return { release_id: this.releaseId, dimensions, results };
  }

  getEvidence(input: unknown): {
    release_id: string;
    status: "ok" | "not_found";
    evidence?: z.infer<typeof evidenceSchema>;
  } {
    const { evidence_id } = evidenceRequestSchema.parse(input);
    const evidence = this.evidence.find(
      (item) => item.evidence_id === evidence_id,
    );
    return {
      release_id: this.releaseId,
      status: evidence ? "ok" : "not_found",
      ...(evidence ? { evidence } : {}),
    };
  }

  searchKnowledge(input: unknown): {
    release_id: string;
    items: (Fact & { match: "alias" | "filter" | "exact" | "text" })[];
    next_cursor?: string;
    guides: (Omit<ResolvedGuide, "body"> & { preview: string })[];
    next_guide_cursor?: string;
  } {
    const request = searchSchema.parse(input);
    const aliasTopic = request.text ? chineseTopics[request.text] : undefined;
    const topic = request.topic ?? aliasTopic;
    const harness = request.harness ? this.harness(request.harness) : undefined;
    if (request.harness && !harness)
      return { release_id: this.releaseId, items: [], guides: [] };
    const text = request.text?.toLocaleLowerCase();
    const tokens = request.text?.match(/[\p{L}\p{N}_]+/gu) ?? [];
    const ftsIds = new Set<string>();
    if (tokens.length && !aliasTopic) {
      const literal = tokens.map((term) => `"${term}"`).join(" AND ");
      for (const row of this.db
        .prepare("SELECT claim_id FROM claims_fts WHERE claims_fts MATCH ?")
        .all(literal) as { claim_id: string }[])
        ftsIds.add(row.claim_id);
    }
    const candidates: (Fact & {
      match: "alias" | "filter" | "exact" | "text";
    })[] = this.claims.flatMap((fact) => {
      if (harness && fact.target.harness_id !== harness.harness_id) return [];
      if (topic && fact.claim.topic !== topic) return [];
      if (request.os && fact.target.os !== request.os) return [];
      if (
        request.version &&
        canonical(fact.target.version_identity) !== canonical(request.version)
      )
        return [];
      const definition = this.harnesses.find(
        (item) => item.harness_id === fact.target.harness_id,
      )!;
      const alias =
        text &&
        [definition.harness_id, definition.name, ...definition.aliases].some(
          (value) => value.toLocaleLowerCase() === text,
        );
      const assertion = fact.claim.assertion;
      const exactPath =
        assertion.type === "search_path" &&
        [
          assertion.path.segments.join("/"),
          `${assertion.path.base}/${assertion.path.segments.join("/")}`,
        ].some((value) => value.toLocaleLowerCase() === text);
      const exact =
        text && (fact.claim.fact_key.toLocaleLowerCase() === text || exactPath);
      const match: "alias" | "filter" | "exact" | "text" | undefined = alias
        ? "alias"
        : !text || aliasTopic
          ? "filter"
          : exact
            ? "exact"
            : ftsIds.has(fact.claim.claim_id)
              ? "text"
              : undefined;
      return match ? [{ ...fact, match }] : [];
    });
    const rank = { alias: 0, filter: 1, exact: 2, text: 3 };
    candidates.sort(
      (a, b) =>
        rank[a.match] - rank[b.match] ||
        a.claim.claim_id.localeCompare(b.claim.claim_id),
    );
    const guideMatches = this.guides
      .filter(
        (guide) =>
          (!harness || guide.target.harness_id === harness.harness_id) &&
          (!topic || guide.topic === topic) &&
          (!request.os || guide.target.os === request.os) &&
          (!request.version ||
            canonical(guide.target.version_identity) ===
              canonical(request.version)) &&
          (!text ||
            aliasTopic ||
            (harness &&
              [harness.harness_id, harness.name, ...harness.aliases].some(
                (alias) => alias.toLocaleLowerCase() === text,
              )) ||
            `${guide.title} ${guide.body}`.toLocaleLowerCase().includes(text)),
      )
      .map(({ body, ...guide }) => ({ ...guide, preview: body.slice(0, 240) }));
    const guidePage = page(
      guideMatches,
      request.limit,
      request.guide_cursor,
      this.releaseId,
      {
        text: request.text ?? "",
        harness: harness?.harness_id,
        topic,
        os: request.os,
        version: request.version,
        kind: "guide",
      },
    );
    return {
      release_id: this.releaseId,
      ...page(candidates, request.limit, request.cursor, this.releaseId, {
        text: request.text ?? "",
        harness: harness?.harness_id,
        topic,
        os: request.os,
        version: request.version,
      }),
      guides: guidePage.items,
      ...(guidePage.next_cursor
        ? { next_guide_cursor: guidePage.next_cursor }
        : {}),
    };
  }
}
