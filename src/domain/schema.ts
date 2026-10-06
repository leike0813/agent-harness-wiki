import * as z from "zod";

const id = z.string().regex(/^[a-z][a-z0-9_-]*$/);
const nonempty = z.string().min(1);
const sha256 = z.string().regex(/^[a-f0-9]{64}$/);
const record = {
  schema_version: z.literal(1),
  record_kind: z.enum(["fixture", "production"]),
};

export const topicSchema = z.enum([
  "skills",
  "mcp",
  "custom_agents",
  "custom_providers",
  "hooks",
  "native_plugins",
  "configuration",
  "local_transcripts",
]);

export const versionIdentitySchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("release"), value: nonempty }),
  z.strictObject({ kind: z.literal("commit"), value: nonempty }),
]);

export const surfaceKindSchema = z.enum([
  "cli",
  "ide",
  "desktop",
  "web",
  "sdk",
]);

export const targetScopeSchema = z.strictObject({
  harness_id: id,
  surface: surfaceKindSchema,
  distribution: nonempty,
  os: z.enum(["linux", "windows", "macos"]),
  arch: z.enum(["x64", "arm64"]),
  execution_mode: z.enum(["native", "wsl", "container", "remote"]),
});

export const targetSchema = z.strictObject({
  ...targetScopeSchema.shape,
  version_identity: versionIdentitySchema,
});

export const semanticPathSchema = z.strictObject({
  base: z.enum([
    "home",
    "project_root",
    "workspace_root",
    "cwd",
    "config_root",
    "installation_root",
    "os_config_root",
    "environment_variable",
  ]),
  variable: z
    .string()
    .regex(/^[A-Z][A-Z0-9_]*$/)
    .optional(),
  segments: z
    .array(
      z
        .string()
        .min(1)
        .max(255)
        .regex(/^(?!\.\.?$)[^\\/\x00]+$/),
    )
    .max(16),
});

export const conditionSchema = z.discriminatedUnion("type", [
  z.strictObject({
    type: z.literal("workspace_trust"),
    equals: z.enum(["trusted", "untrusted"]),
  }),
  z.strictObject({
    type: z.literal("environment_variable"),
    name: z.string().regex(/^[A-Z][A-Z0-9_]*$/),
    operator: z.enum(["set", "unset"]),
  }),
  z.strictObject({
    type: z.literal("feature_flag"),
    name: nonempty,
    equals: z.boolean(),
  }),
  z.strictObject({
    type: z.literal("config_value"),
    key: nonempty,
    equals: nonempty,
  }),
  z.strictObject({
    type: z.literal("launch_argument"),
    name: nonempty,
    present: z.boolean(),
  }),
  z.strictObject({ type: z.literal("profile"), equals: nonempty }),
  z.strictObject({
    type: z.literal("extension_installed"),
    id,
    equals: z.boolean(),
  }),
]);

export const assertionSchema = z.discriminatedUnion("type", [
  z.strictObject({
    type: z.literal("search_path"),
    scope: z.enum(["user", "project", "workspace"]),
    path: semanticPathSchema,
  }),
  z.strictObject({
    type: z.literal("transport_support"),
    transport: z.enum(["stdio", "http", "sse"]),
  }),
  z.strictObject({
    type: z.literal("discovery_rule"),
    subject: z.literal("agent"),
    rule: nonempty,
  }),
  z.strictObject({ type: z.literal("provider_protocol"), protocol: nonempty }),
  z.strictObject({ type: z.literal("hook_event"), event: nonempty }),
  z.strictObject({
    type: z.literal("plugin_lifecycle"),
    stage: z.enum([
      "installed",
      "enabled",
      "discovered",
      "loaded",
      "active",
      "healthy",
    ]),
    mechanism: nonempty,
  }),
  z.strictObject({
    type: z.literal("precedence_rule"),
    higher: nonempty,
    lower: nonempty,
  }),
  z.strictObject({
    type: z.literal("capability_support"),
    capability: nonempty,
  }),
]);

export const harnessSchema = z.strictObject({
  ...record,
  harness_id: id,
  name: nonempty,
  aliases: z.array(nonempty),
  surfaces: z.array(surfaceKindSchema).min(1),
  source_refs: z.array(id).min(1),
});

const officialUrl = z.url().refine((value) => value.startsWith("https://"));
const commit = z.string().regex(/^[a-f0-9]{40}$/);
const provenance = { ...record, source_id: id, harness_id: id };

export const sourceSchema = z.discriminatedUnion("kind", [
  z.strictObject({
    ...provenance,
    kind: z.literal("fixture_file"),
    file: nonempty,
    content_sha256: sha256,
  }),
  z.strictObject({
    ...provenance,
    kind: z.literal("git_repository"),
    repository_url: officialUrl,
  }),
  z.strictObject({
    ...provenance,
    kind: z.literal("official_documentation"),
    url: officialUrl,
  }),
  z.strictObject({
    ...provenance,
    kind: z.literal("npm_registry"),
    package_name: nonempty,
    registry_url: z.literal("https://registry.npmjs.org"),
  }),
]);

const artifactBase = { ...provenance, artifact_id: id };
const gitFile = {
  ...artifactBase,
  commit,
  file: nonempty,
  content_sha256: sha256,
};
export const artifactSchema = z.discriminatedUnion("kind", [
  z.strictObject({
    ...gitFile,
    kind: z.literal("git_checkout"),
    checkout_path: nonempty,
  }),
  // A pinned commit file the repository never retains: the daily monitor checks
  // out a temporary external clone, records commit, file and content hash, and
  // drops the checkout afterwards.
  z.strictObject({
    ...gitFile,
    kind: z.literal("git_source_file"),
  }),
  z.strictObject({
    ...artifactBase,
    kind: z.literal("archived_document"),
    archive_path: nonempty,
    raw_sha256: sha256,
    extracted_sha256: sha256,
    extractor: z.literal("identity-markdown@1"),
  }),
  z.strictObject({
    ...artifactBase,
    kind: z.literal("managed_package"),
    package_name: nonempty,
    version: nonempty,
    integrity: z.string().regex(/^sha512-[A-Za-z0-9+/]+={0,2}$/),
    package_path: nonempty,
    lockfile_path: z.literal("research/package-set/pnpm-lock.yaml"),
    file: nonempty,
    content_sha256: sha256,
  }),
  z.strictObject({
    ...artifactBase,
    kind: z.literal("archived_package_file"),
    package_name: nonempty,
    version: nonempty,
    integrity: z.string().regex(/^sha512-[A-Za-z0-9+/]+={0,2}$/),
    tarball_path: nonempty,
    file: nonempty,
    content_sha256: sha256,
  }),
]);

const snapshotBase = {
  ...record,
  snapshot_id: id,
  source_id: id,
  source_fetched_at: z.iso.datetime(),
};
export const snapshotSchema = z.union([
  z.strictObject({
    ...snapshotBase,
    target: targetSchema,
    content_sha256: sha256,
  }),
  z.strictObject({
    ...snapshotBase,
    kind: z.literal("source_revision"),
    artifact_id: id,
    target: targetSchema,
    commit,
    content_sha256: sha256,
  }),
  z.strictObject({
    ...snapshotBase,
    kind: z.literal("documentation"),
    artifact_id: id,
    harness_id: id,
    surface: surfaceKindSchema,
    requested_url: officialUrl,
    resolved_url: officialUrl,
    raw_sha256: sha256,
    extracted_sha256: sha256,
    extractor: z.literal("identity-markdown@1"),
    version_applicability: z.strictObject({ kind: z.literal("unknown") }),
  }),
  z.strictObject({
    ...snapshotBase,
    kind: z.literal("npm_release"),
    artifact_id: id,
    target: targetSchema,
    package_name: nonempty,
    version: nonempty,
    integrity: z.string().regex(/^sha512-[A-Za-z0-9+/]+={0,2}$/),
  }),
]);

export const claimSchema = z.strictObject({
  ...record,
  claim_id: id,
  fact_key: nonempty,
  target: targetScopeSchema,
  version_applicability: z.strictObject({
    kind: z.literal("exact"),
    versions: z.tuple([versionIdentitySchema]),
  }),
  topic: topicSchema,
  assertion: assertionSchema,
  conditions: z.strictObject({ all_of: z.array(conditionSchema).max(12) }),
  support: z.strictObject({
    availability: z.enum(["supported", "unsupported", "not_applicable"]),
    delivery: z
      .enum(["native", "bundled", "external_extension", "workaround"])
      .optional(),
  }),
  evidence_refs: z.array(id),
  assessment_refs: z.array(id),
  supersedes: id.optional(),
});

export const evidenceSchema = z.strictObject({
  ...record,
  evidence_id: id,
  claim_id: id,
  snapshot_id: id,
  locator: z.discriminatedUnion("kind", [
    z.strictObject({
      kind: z.literal("line"),
      start: z.int().positive(),
      end: z.int().positive(),
    }),
    z.strictObject({ kind: z.literal("section"), heading: nonempty }),
  ]),
  excerpt: nonempty,
  stance: z.enum(["supports", "refutes", "qualifies"]),
  basis: z.enum(["documented", "source_inspected", "runtime_observed"]),
});

export const assessmentSchema = z.strictObject({
  ...record,
  assessment_id: id,
  claim_id: id,
  status: z.enum(["draft", "accepted", "disputed", "rejected"]),
  evidence_refs: z.array(id),
  reviewer: nonempty,
  fact_verified_at: z.iso.datetime(),
  rationale: nonempty,
});

export const coverageSchema = z.strictObject({
  ...record,
  coverage_id: id,
  target: targetSchema,
  topic: topicSchema,
  status: z.enum(["not_started", "partial", "complete", "blocked"]),
  investigation_notes: nonempty.optional(),
  snapshot_refs: z.array(id).optional(),
});

export const guideSchema = z.strictObject({
  ...record,
  guide_id: id,
  coverage_ref: id,
  claim_refs: z.array(id),
  title: nonempty.max(120),
  body: nonempty.max(6000),
});

export const resolvedGuideSchema = guideSchema.safeExtend({
  target: targetSchema,
  topic: topicSchema,
  coverage_status: coverageSchema.shape.status,
});

export const releaseManifestSchema = z.strictObject({
  schema_version: z.literal(1),
  builder_version: z.enum(["1", "2", "3"]),
  release_id: id,
  profile: z.enum(["fixture", "production"]),
  knowledge_published_at: z.iso.datetime(),
  input_sha256: sha256,
  artifacts: z.record(z.string(), sha256),
});

export const publishedKnowledgeSchema = z.strictObject({
  schema_version: z.literal(1),
  release_id: id,
  profile: z.enum(["fixture", "production"]),
  knowledge_published_at: z.iso.datetime(),
  records: z.strictObject({
    harnesses: z.array(harnessSchema),
    sources: z.array(sourceSchema),
    artifacts: z.array(artifactSchema).optional(),
    snapshots: z.array(snapshotSchema),
    claims: z.array(claimSchema),
    evidence: z.array(evidenceSchema),
    assessments: z.array(assessmentSchema),
    coverage: z.array(coverageSchema),
    guides: z.array(guideSchema).optional(),
  }),
});

export const upstreamAuditSchema = z.strictObject({
  schema_version: z.literal(2),
  audit_id: id,
  harness_id: id,
  checked_at: z.iso.datetime(),
  previous_audit_id: id.optional(),
  status: z.enum(["no_change", "changed", "blocked"]),
  review_status: z.enum(["pending", "not_required", "reviewed"]),
  reviewed_by: nonempty.optional(),
  reviewed_at: z.iso.datetime().optional(),
  pending_audit_refs: z.array(id),
  checks: z.array(
    z.strictObject({
      source_id: id,
      kind: z.enum([
        "npm_registry",
        "git_repository",
        "official_documentation",
      ]),
      checked_at: z.iso.datetime(),
      status: z.enum(["unchanged", "changed", "blocked"]),
      baseline: nonempty.optional(),
      observed: nonempty.optional(),
      resolved_url: z.url().optional(),
      remote_ref: nonempty.optional(),
      candidate_path: nonempty.optional(),
      changed_paths: z.array(nonempty).optional(),
      error: nonempty.optional(),
    }),
  ),
  impacts: z.array(
    z.strictObject({
      topic: topicSchema,
      question_ids: z.array(
        z.string().regex(/^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/),
      ),
      section_ids: z.array(id),
      surface_ids: z.array(id).optional(),
      source_refs: z.array(id),
      cross_topic_links: z.array(
        z.string().regex(/^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/),
      ),
      reason: nonempty,
    }),
  ),
  pending_question_ids: z
    .array(z.string().regex(/^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/))
    .default([]),
  investigation_notes: z.array(nonempty).default([]),
});

export const queryScopeSchema = targetScopeSchema
  .omit({ harness_id: true })
  .extend({
    harness: nonempty,
  });

export const queryVersionSchema = z.discriminatedUnion("policy", [
  z.strictObject({
    policy: z.literal("exact"),
    identity: versionIdentitySchema,
  }),
  z.strictObject({ policy: z.literal("latest_verified") }),
  z.strictObject({ policy: z.literal("latest_upstream") }),
]);

export const queryRequestSchema = z.strictObject({
  scope: queryScopeSchema,
  topic: topicSchema.optional(),
  fact_key: nonempty.optional(),
  conditions: z.array(conditionSchema).max(12).default([]),
  version: queryVersionSchema,
});

export const queryResultSchema = z.strictObject({
  release_id: id,
  status: z.enum([
    "ok",
    "partial",
    "ambiguous",
    "not_verified",
    "conflict",
    "not_found",
    "unknown",
  ]),
  requested_version: queryVersionSchema,
  target: targetSchema.optional(),
  source_observed_at: z.iso.datetime().optional(),
  coverage: z.array(coverageSchema),
  facts: z.array(
    z.strictObject({
      claim: claimSchema,
      target: targetSchema,
      review_status: z.enum(["accepted", "disputed"]),
    }),
  ),
  guides: z.array(resolvedGuideSchema),
});

export const recordSchemas = {
  harness: harnessSchema,
  source: sourceSchema,
  artifact: artifactSchema,
  snapshot: snapshotSchema,
  claim: claimSchema,
  evidence: evidenceSchema,
  assessment: assessmentSchema,
  coverage: coverageSchema,
  guide: guideSchema,
  release_manifest: releaseManifestSchema,
  published_knowledge: publishedKnowledgeSchema,
  query_request: queryRequestSchema,
  query_result: queryResultSchema,
  upstream_audit: upstreamAuditSchema,
} as const;

export type HarnessDefinition = z.infer<typeof harnessSchema>;
export type SourceDefinition = z.infer<typeof sourceSchema>;
export type Artifact = z.infer<typeof artifactSchema>;
export type SnapshotManifest = z.infer<typeof snapshotSchema>;
export type Claim = z.infer<typeof claimSchema>;
export type Evidence = z.infer<typeof evidenceSchema>;
export type Assessment = z.infer<typeof assessmentSchema>;
export type CoverageRecord = z.infer<typeof coverageSchema>;
export type Guide = z.infer<typeof guideSchema>;
export type Target = z.infer<typeof targetSchema>;
export type Topic = z.infer<typeof topicSchema>;
export type PublishedKnowledge = z.infer<typeof publishedKnowledgeSchema>;
export type UpstreamAudit = z.infer<typeof upstreamAuditSchema>;
export type Dataset = {
  harnesses: HarnessDefinition[];
  sources: SourceDefinition[];
  artifacts: Artifact[];
  snapshots: SnapshotManifest[];
  claims: Claim[];
  evidence: Evidence[];
  assessments: Assessment[];
  coverage: CoverageRecord[];
  guides: Guide[];
};
