import { cp, mkdtemp, readFile, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, expect, test } from "vitest";
import { loadAndValidateDataset } from "../../src/validation/dataset.js";

const basic = fileURLToPath(
  new URL("../fixtures/datasets/basic", import.meta.url),
);
const temporary: string[] = [];

async function copyDataset(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-fixture-"));
  temporary.push(root);
  await cp(basic, root, { recursive: true });
  return root;
}

async function edit(
  root: string,
  relative: string,
  change: (text: string) => string,
): Promise<void> {
  const file = path.join(root, relative);
  await writeFile(file, change(await readFile(file, "utf8")));
}

afterEach(async () => {
  await Promise.all(
    temporary
      .splice(0)
      .map((root) => rm(root, { recursive: true, force: true })),
  );
});

const openClaim = "knowledge/demo-open-cli/claims/claim-demo-open-skills.yaml";
const openEvidence =
  "knowledge/demo-open-cli/evidence/evidence-demo-open-skills.yaml";
const agentGuide = "knowledge/demo-open-cli/guides/custom_agents.md";

test("guides accept honest coverage-only prose and reject unreviewed facts", async () => {
  const root = await copyDataset();
  await edit(root, agentGuide, (text) =>
    text.replace("claim_refs: [claim-demo-open-agents]", "claim_refs: []"),
  );
  expect((await loadAndValidateDataset({ root, profile: "fixture" })).ok).toBe(
    true,
  );
  await edit(root, agentGuide, (text) =>
    text.replace("claim_refs: []", "claim_refs: [missing-claim]"),
  );
  const invalid = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(invalid.ok).toBe(false);
  expect(
    invalid.diagnostics.some(
      (item) =>
        item.code === "GUIDE_CLAIM_UNREVIEWED" && item.file === agentGuide,
    ),
  ).toBe(true);
  await edit(root, agentGuide, (text) =>
    text
      .replace("claim_refs: [missing-claim]", "claim_refs: []")
      .concat("\n<script>alert(1)</script>\n"),
  );
  const unsafe = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(
    unsafe.diagnostics.some((item) => item.code === "GUIDE_UNSAFE_MARKUP"),
  ).toBe(true);
});

test("basic fixture keeps exact scope, coverage and delivery distinctions", async () => {
  const result = await loadAndValidateDataset({
    root: basic,
    profile: "fixture",
  });
  expect(result.ok).toBe(true);
  if (!result.ok) return;
  expect(result.dataset.harnesses).toHaveLength(2);
  expect(new Set(result.dataset.claims.map((claim) => claim.topic))).toEqual(
    new Set([
      "skills",
      "mcp",
      "custom_agents",
      "custom_providers",
      "hooks",
      "native_plugins",
      "configuration",
    ]),
  );
  expect(
    result.dataset.coverage.some(
      (item) =>
        item.status === "not_started" &&
        item.target.version_identity.value === "2.0.0",
    ),
  ).toBe(true);
  expect(
    result.dataset.claims.find(
      (item) => item.claim_id === "claim-demo-package-plugin",
    )?.support.delivery,
  ).toBe("external_extension");
  expect(
    result.dataset.claims.find(
      (item) => item.claim_id === "claim-demo-package-no-native",
    )?.support.availability,
  ).toBe("unsupported");
});

test.each([
  [
    "unknown field",
    openClaim,
    (text: string) => `${text}unexpected: true\n`,
    "SCHEMA_INVALID",
  ],
  [
    "duplicate YAML key",
    openClaim,
    (text: string) => `${text}topic: skills\n`,
    "YAML_INVALID",
  ],
  [
    "unknown YAML tag",
    openClaim,
    (text: string) => text.replace("topic: skills", "topic: !execute skills"),
    "YAML_INVALID",
  ],
  [
    "unverified range",
    openClaim,
    (text: string) => text.replace("kind: exact", "kind: range"),
    "SCHEMA_INVALID",
  ],
  [
    "contradictory conditions",
    openClaim,
    (text: string) =>
      text.replace(
        "support:",
        "    - { type: workspace_trust, equals: untrusted }\nsupport:",
      ),
    "CONDITION_CONFLICT",
  ],
  [
    "unsafe source path",
    "registry/sources/source-demo-open.yaml",
    (text: string) =>
      text.replace("materials/demo-open-cli.txt", "../outside.txt"),
    "PATH_INVALID",
  ],
  [
    "platform mismatch",
    "knowledge/demo-open-cli/snapshots/snapshot-demo-open-142-linux.yaml",
    (text: string) => text.replace("os: linux", "os: windows"),
    "TARGET_MISMATCH",
  ],
] as const)("rejects %s", async (_name, relative, change, code) => {
  const root = await copyDataset();
  await edit(root, relative, change);
  const result = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(
    result.diagnostics.some((diagnostic) => diagnostic.code === code),
  ).toBe(true);
});

test("rejects absent evidence and assessment", async () => {
  const root = await copyDataset();
  await unlink(path.join(root, openEvidence));
  await unlink(
    path.join(
      root,
      "knowledge/demo-open-cli/assessments/assessment-demo-open-skills.yaml",
    ),
  );
  const result = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((d) => d.code)).toEqual(
    expect.arrayContaining(["EVIDENCE_MISSING", "ASSESSMENT_MISSING"]),
  );
});

test("rejects duplicate IDs and replacement cycles", async () => {
  const root = await copyDataset();
  const mcp = "knowledge/demo-open-cli/claims/claim-demo-open-mcp.yaml";
  await cp(
    path.join(
      root,
      "knowledge/demo-open-cli/claims/claim-demo-open-providers.yaml",
    ),
    path.join(root, "knowledge/demo-open-cli/claims/duplicate.yaml"),
  );
  await edit(
    root,
    mcp,
    (text) => `${text}supersedes: claim-demo-open-skills\n`,
  );
  await edit(
    root,
    openClaim,
    (text) => `${text}supersedes: claim-demo-open-mcp\n`,
  );
  const result = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((d) => d.code)).toContain("DUPLICATE_ID");
  expect(result.diagnostics.map((d) => d.code)).toContain("SUPERSESSION_CYCLE");
  expect(
    result.diagnostics.find((d) => d.code === "DUPLICATE_ID")?.file,
  ).toMatch(/duplicate\.yaml$/);
});

test("keeps a disputed claim and rejects accepted conflicting evidence", async () => {
  const root = await copyDataset();
  const refute = "evidence-demo-open-skills-refute";
  await writeFile(
    path.join(root, `knowledge/demo-open-cli/evidence/${refute}.yaml`),
    [
      "schema_version: 1",
      "record_kind: fixture",
      `evidence_id: ${refute}`,
      "claim_id: claim-demo-open-skills",
      "snapshot_id: snapshot-demo-open-142-linux",
      "locator: { kind: line, start: 2, end: 2 }",
      "excerpt: Trusted projects without DEMO_SKILLS_DIR discover skills in .demo/skills.",
      "stance: refutes",
      "basis: source_inspected",
      "",
    ].join("\n"),
  );
  await edit(root, openClaim, (text) =>
    text.replace(
      "evidence_refs: [evidence-demo-open-skills]",
      `evidence_refs: [evidence-demo-open-skills, ${refute}]`,
    ),
  );
  const assessment =
    "knowledge/demo-open-cli/assessments/assessment-demo-open-skills.yaml";
  await edit(root, assessment, (text) =>
    text
      .replace("status: accepted", "status: disputed")
      .replace(
        "evidence_refs: [evidence-demo-open-skills]",
        `evidence_refs: [evidence-demo-open-skills, ${refute}]`,
      ),
  );
  expect((await loadAndValidateDataset({ root, profile: "fixture" })).ok).toBe(
    true,
  );
  await edit(root, assessment, (text) =>
    text.replace("status: disputed", "status: accepted"),
  );
  const invalid = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(invalid.ok).toBe(false);
  expect(invalid.diagnostics.map((d) => d.code)).toContain(
    "CONFLICT_UNRESOLVED",
  );
});

test("rejects a large record and source file", async () => {
  const root = await copyDataset();
  await edit(
    root,
    openClaim,
    (text) => `${text}# ${"x".repeat(1024 * 1024)}\n`,
  );
  let result = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(result.diagnostics.map((d) => d.code)).toContain("INPUT_TOO_LARGE");
  await edit(root, openClaim, (text) => text.slice(0, text.indexOf("# ")));
  await writeFile(
    path.join(root, "materials/demo-open-cli.txt"),
    "x".repeat(1024 * 1024 + 1),
  );
  result = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(result.diagnostics.map((d) => d.code)).toContain("INPUT_TOO_LARGE");
});

test("production profile rejects fixture records", async () => {
  const result = await loadAndValidateDataset({
    root: basic,
    profile: "production",
  });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((d) => d.code)).toContain("PROFILE_MISMATCH");
});

test("source content hash is checked against actual bytes", async () => {
  const root = await copyDataset();
  await edit(
    root,
    "materials/demo-open-cli.txt",
    (text) => `${text}Changed bytes.\n`,
  );
  const result = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((d) => d.code)).toContain("HASH_MISMATCH");
});
