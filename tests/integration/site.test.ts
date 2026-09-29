import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";
import { renderDocs } from "../../src/compiler/docs.js";
import { compileRelease, verifyRelease } from "../../src/compiler/release.js";
import { publishedKnowledgeSchema } from "../../src/domain/schema.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/basic", import.meta.url),
);
const script = fileURLToPath(
  new URL("../../scripts/build-site.ts", import.meta.url),
);
const output = path.resolve("site/.vitepress/dist");
let root: string;
let releaseDir: string;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-site-test-"));
  releaseDir = (
    await compileRelease({
      datasetRoot: fixture,
      profile: "fixture",
      releaseId: "site-test",
      publishedAt: "2026-09-27T00:00:00Z",
      releasesRoot: root,
    })
  ).releaseDir;
});
afterAll(async () => {
  if (root) await rm(root, { recursive: true, force: true });
});

test("VitePress builds verified release pages without changing the release", async () => {
  const before = await readFile(path.join(releaseDir, "manifest.json"), "utf8");
  const build = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      script,
      "--release-id",
      "site-test",
      "--releases-root",
      root,
    ],
    { encoding: "utf8", timeout: 30_000 },
  );
  expect(build.status, build.stderr).toBe(0);
  expect(await readFile(path.join(releaseDir, "manifest.json"), "utf8")).toBe(
    before,
  );
  await verifyRelease(releaseDir);
  const files = [
    "index.html",
    "release.html",
    "reading-results.html",
    "harnesses/index.html",
    "harnesses/demo-open-cli.html",
    "harnesses/demo-package-cli.html",
    "evidence/evidence-demo-open-skills.html",
    ...[
      "skills",
      "mcp",
      "custom_agents",
      "custom_providers",
      "hooks",
      "native_plugins",
    ].map((topic) => `topics/${topic}.html`),
  ];
  for (const file of files) {
    const html = await readFile(path.join(output, file), "utf8");
    expect(html).toContain("Fictional fixture data");
  }
  expect(await readFile(path.join(output, "release.html"), "utf8")).toContain(
    "site-test",
  );
  const guide = await readFile(
    path.join(output, "reading-results.html"),
    "utf8",
  );
  expect(guide).toContain("not_verified");
  expect(guide).toContain("conflict");
  expect(guide).toContain("partial");
  expect(
    await readFile(path.join(output, "harnesses/demo-open-cli.html"), "utf8"),
  ).toContain("虚构代理配置调查");
  expect(guide).toContain("fact_verified_at");
}, 40_000);

test("generated disputed and partial facts remain visible; source markup is inert", async () => {
  const knowledge = publishedKnowledgeSchema.parse(
    JSON.parse(await readFile(path.join(releaseDir, "knowledge.json"), "utf8")),
  );
  const assessment = knowledge.records.assessments[0]!;
  const coverage = knowledge.records.coverage[0]!;
  const evidence = knowledge.records.evidence[0]!;
  const altered = {
    ...knowledge,
    records: {
      ...knowledge.records,
      assessments: knowledge.records.assessments.map((item) =>
        item.assessment_id === assessment.assessment_id
          ? { ...item, status: "disputed" as const }
          : item,
      ),
      coverage: knowledge.records.coverage.map((item) =>
        item.coverage_id === coverage.coverage_id
          ? { ...item, status: "partial" as const }
          : item,
      ),
      evidence: knowledge.records.evidence.map((item) =>
        item.evidence_id === evidence.evidence_id
          ? { ...item, excerpt: "<script>alert(1)</script>" }
          : item,
      ),
    },
  };
  const docs = [...renderDocs(altered).values()].join("\n");
  expect(docs).toContain("Review: disputed");
  expect(docs).toContain("Coverage: partial");
  expect(docs).toContain("&lt;script&gt;");
  expect(docs).not.toContain("<script>");
});
