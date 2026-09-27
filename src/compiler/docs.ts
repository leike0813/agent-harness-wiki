import type { Claim, Topic } from "../domain/schema.js";
import { topicSchema } from "../domain/schema.js";
import type { PublishedKnowledge } from "./projection.js";

const escapeText = (value: string): string =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/([*_`\[\]{}()#!|])/g, "\\$1")
    .replace(/\r?\n/g, " ");

function renderClaim(claim: Claim, statuses: Map<string, string>): string {
  const status = claim.assessment_refs.some(
    (id) => statuses.get(id) === "disputed",
  )
    ? "disputed"
    : "accepted";
  const target = {
    ...claim.target,
    version_identity: claim.version_applicability.versions[0],
  };
  return [
    `### ${escapeText(claim.fact_key)}`,
    "",
    `- Review: ${status}`,
    `- Availability: ${claim.support.availability}`,
    `- Delivery: ${claim.support.delivery ?? "none"}`,
    `- Target: ${escapeText(JSON.stringify(target))}`,
    `- Assertion: ${escapeText(JSON.stringify(claim.assertion))}`,
    `- Conditions: ${escapeText(JSON.stringify(claim.conditions))}`,
    `- Evidence: ${claim.evidence_refs.map((id) => `[${escapeText(id)}](../evidence/${id}.md)`).join(", ")}`,
    "",
  ].join("\n");
}

export function renderDocs(knowledge: PublishedKnowledge): Map<string, string> {
  const pages = new Map<string, string>();
  const records = knowledge.records;
  const notice =
    knowledge.profile === "fixture"
      ? "> Fictional fixture data. Not real harness guidance.\n\n"
      : "";
  const statuses = new Map(
    records.assessments.map((item) => [item.assessment_id, item.status]),
  );
  const page = (title: string, lines: string[]): string =>
    `# ${title}\n\n${notice}${lines.join("\n").trimEnd()}\n`;

  pages.set(
    "docs/index.md",
    page("Knowledge release", [
      `Release: ${escapeText(knowledge.release_id)}`,
      "",
      "[Harnesses](harnesses/index.md) · [Release details](release.md)",
      "",
      ...topicSchema.options.map((topic) => `- [${topic}](topics/${topic}.md)`),
    ]),
  );
  pages.set(
    "docs/release.md",
    page("Release details", [
      `- ID: ${escapeText(knowledge.release_id)}`,
      `- Profile: ${knowledge.profile}`,
      `- Published: ${escapeText(knowledge.knowledge_published_at)}`,
      `- Claims: ${records.claims.length}`,
      `- Coverage records: ${records.coverage.length}`,
    ]),
  );
  pages.set(
    "docs/harnesses/index.md",
    page(
      "Harnesses",
      records.harnesses.map(
        (item) => `- [${escapeText(item.name)}](${item.harness_id}.md)`,
      ),
    ),
  );
  for (const harness of records.harnesses) {
    const claims = records.claims.filter(
      (item) => item.target.harness_id === harness.harness_id,
    );
    const coverage = records.coverage.filter(
      (item) => item.target.harness_id === harness.harness_id,
    );
    pages.set(
      `docs/harnesses/${harness.harness_id}.md`,
      page(escapeText(harness.name), [
        `Aliases: ${harness.aliases.map(escapeText).join(", ")}`,
        "",
        "## Coverage",
        "",
        ...coverage.map(
          (item) =>
            `- ${item.topic}: ${item.status} — ${escapeText(JSON.stringify(item.target))}`,
        ),
        "",
        "## Reviewed claims",
        "",
        ...claims.map((item) => renderClaim(item, statuses)),
      ]),
    );
  }
  for (const topic of topicSchema.options as Topic[]) {
    pages.set(
      `docs/topics/${topic}.md`,
      page(escapeText(topic), [
        ...records.coverage
          .filter((item) => item.topic === topic)
          .map(
            (item) =>
              `- Coverage: ${item.status} — ${escapeText(JSON.stringify(item.target))}`,
          ),
        "",
        ...records.claims
          .filter((item) => item.topic === topic)
          .map((item) => renderClaim(item, statuses)),
      ]),
    );
  }
  for (const item of records.evidence) {
    pages.set(
      `docs/evidence/${item.evidence_id}.md`,
      page(escapeText(item.evidence_id), [
        `- Claim: ${escapeText(item.claim_id)}`,
        `- Snapshot: ${escapeText(item.snapshot_id)}`,
        `- Locator: ${escapeText(JSON.stringify(item.locator))}`,
        `- Stance: ${item.stance}`,
        `- Basis: ${item.basis}`,
        "",
        `Excerpt: ${escapeText(item.excerpt)}`,
      ]),
    );
  }
  return pages;
}
