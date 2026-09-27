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
]);

export const versionIdentitySchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("release"), value: nonempty }),
  z.strictObject({ kind: z.literal("commit"), value: nonempty }),
]);

export const targetScopeSchema = z.strictObject({
  harness_id: id,
  surface: z.enum(["cli", "ide", "desktop"]),
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
  surfaces: z.array(z.enum(["cli", "ide", "desktop"])).min(1),
  source_refs: z.array(id).min(1),
});

export const sourceSchema = z.strictObject({
  ...record,
  source_id: id,
  harness_id: id,
  kind: z.literal("fixture_file"),
  file: nonempty,
  content_sha256: sha256,
});

export const snapshotSchema = z.strictObject({
  ...record,
  snapshot_id: id,
  source_id: id,
  target: targetSchema,
  content_sha256: sha256,
  source_fetched_at: z.iso.datetime(),
});

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
});

export const releaseManifestSchema = z.strictObject({
  schema_version: z.literal(1),
  builder_version: z.literal("1"),
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
    snapshots: z.array(snapshotSchema),
    claims: z.array(claimSchema),
    evidence: z.array(evidenceSchema),
    assessments: z.array(assessmentSchema),
    coverage: z.array(coverageSchema),
  }),
});

export const queryRequestSchema = z.strictObject({
  harness_id: id,
  version: z.discriminatedUnion("policy", [
    z.strictObject({
      policy: z.literal("exact"),
      identity: versionIdentitySchema,
    }),
    z.strictObject({ policy: z.literal("latest_verified") }),
    z.strictObject({ policy: z.literal("latest_upstream") }),
  ]),
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
  ]),
  target: targetSchema.optional(),
  claim_ids: z.array(id),
});

export const recordSchemas = {
  harness: harnessSchema,
  source: sourceSchema,
  snapshot: snapshotSchema,
  claim: claimSchema,
  evidence: evidenceSchema,
  assessment: assessmentSchema,
  coverage: coverageSchema,
  release_manifest: releaseManifestSchema,
  published_knowledge: publishedKnowledgeSchema,
  query_request: queryRequestSchema,
  query_result: queryResultSchema,
} as const;

export type HarnessDefinition = z.infer<typeof harnessSchema>;
export type SourceDefinition = z.infer<typeof sourceSchema>;
export type SnapshotManifest = z.infer<typeof snapshotSchema>;
export type Claim = z.infer<typeof claimSchema>;
export type Evidence = z.infer<typeof evidenceSchema>;
export type Assessment = z.infer<typeof assessmentSchema>;
export type CoverageRecord = z.infer<typeof coverageSchema>;
export type Target = z.infer<typeof targetSchema>;
export type Topic = z.infer<typeof topicSchema>;
export type PublishedKnowledge = z.infer<typeof publishedKnowledgeSchema>;
export type Dataset = {
  harnesses: HarnessDefinition[];
  sources: SourceDefinition[];
  snapshots: SnapshotManifest[];
  claims: Claim[];
  evidence: Evidence[];
  assessments: Assessment[];
  coverage: CoverageRecord[];
};
