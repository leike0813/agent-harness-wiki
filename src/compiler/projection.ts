import { createHash } from "node:crypto";
import type { Dataset, PublishedKnowledge } from "../domain/schema.js";
export { canonical } from "../domain/json.js";

export type { PublishedKnowledge };

// Compare by UTF-16 code unit so the JSON order matches SQLite's `ORDER BY id`
// (BINARY collation). `localeCompare` ignores punctuation weight, so ids mixing
// `-` and `_` sorted differently in the two artifacts and failed release verify.
const by = <T>(items: T[], key: (item: T) => string): T[] =>
  items.sort((a, b) => {
    const left = key(a);
    const right = key(b);
    return left < right ? -1 : left > right ? 1 : 0;
  });

export function publishedRecords(dataset: Dataset): Dataset {
  const assessments = dataset.assessments.filter((item) =>
    ["accepted", "disputed"].includes(item.status),
  );
  const reviewed = new Map<string, string[]>();
  for (const item of assessments) {
    const refs = reviewed.get(item.claim_id) ?? [];
    refs.push(item.assessment_id);
    reviewed.set(item.claim_id, refs);
  }
  const claims = dataset.claims
    .filter((claim) => reviewed.has(claim.claim_id))
    .map((claim) => {
      const claimAssessments = assessments.filter(
        (item) => item.claim_id === claim.claim_id,
      );
      const evidenceRefs = new Set(
        claimAssessments.flatMap((item) => item.evidence_refs),
      );
      return {
        ...claim,
        assessment_refs: by([...reviewed.get(claim.claim_id)!], (id) => id),
        evidence_refs: by([...evidenceRefs], (id) => id),
      };
    });
  const claimIds = new Set(claims.map((item) => item.claim_id));
  const includedAssessments = assessments.filter((item) =>
    claimIds.has(item.claim_id),
  );
  const evidenceIds = new Set(claims.flatMap((item) => item.evidence_refs));
  const evidence = dataset.evidence.filter((item) =>
    evidenceIds.has(item.evidence_id),
  );
  return {
    harnesses: by([...dataset.harnesses], (item) => item.harness_id),
    sources: by([...dataset.sources], (item) => item.source_id),
    artifacts: by([...dataset.artifacts], (item) => item.artifact_id),
    snapshots: by([...dataset.snapshots], (item) => item.snapshot_id),
    claims: by(claims, (item) => item.claim_id),
    evidence: by(evidence, (item) => item.evidence_id),
    assessments: by(includedAssessments, (item) => item.assessment_id),
    coverage: by([...dataset.coverage], (item) => item.coverage_id),
    guides: by([...dataset.guides], (item) => item.guide_id),
  };
}

export const sha256 = (value: string | Buffer): string =>
  createHash("sha256").update(value).digest("hex");
