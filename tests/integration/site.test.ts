import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";
import {
  compileChapterRelease,
  renderChapterDocs,
  verifyChapterRelease,
} from "../../src/compiler/chapter-release.js";
import { chapterPublishedKnowledgeSchema } from "../../src/domain/chapter.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);
const script = fileURLToPath(
  new URL("../../scripts/build-site.ts", import.meta.url),
);
const output = path.resolve("site/.vitepress/dist");
let root: string, releaseDir: string;
beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-site-"));
  releaseDir = (
    await compileChapterRelease({
      datasetRoot: fixture,
      profile: "fixture",
      releaseId: "site-fixture",
      publishedAt: "2026-09-29T00:00:00Z",
      releasesRoot: root,
    })
  ).releaseDir;
});
afterAll(async () => {
  if (root) await rm(root, { recursive: true, force: true });
});

test("site builds product and topic pages from a verified immutable release", async () => {
  const before = await readFile(path.join(releaseDir, "manifest.json"), "utf8");
  const build = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      script,
      "--release-id",
      "site-fixture",
      "--releases-root",
      root,
    ],
    { encoding: "utf8", timeout: 30_000 },
  );
  expect(build.status, build.stderr).toBe(0);
  expect(await readFile(path.join(releaseDir, "manifest.json"), "utf8")).toBe(
    before,
  );
  await verifyChapterRelease(releaseDir);
  for (const harness of ["demo-open-cli", "demo-package-cli"]) {
    const overview = await readFile(
      path.join(output, "harnesses", harness, "index.html"),
      "utf8",
    );
    expect(overview).toContain("Fictional fixture data");
    for (const topic of [
      "skills",
      "mcp",
      "custom_agents",
      "custom_providers",
      "hooks",
      "native_plugins",
      "configuration",
    ]) {
      const page = await readFile(
        path.join(output, "harnesses", harness, `${topic}.html`),
        "utf8",
      );
      expect(page).toContain("Fictional fixture data");
    }
  }
}, 60_000);

test("online pages link retained history and cite the same published sources", async () => {
  const knowledge = chapterPublishedKnowledgeSchema.parse(
    JSON.parse(await readFile(path.join(releaseDir, "knowledge.json"), "utf8")),
  );
  const pages = renderChapterDocs(knowledge, { online: true });
  for (const chapter of knowledge.records.chapters) {
    const history = pages.get(`docs/chapters/${chapter.edition_id}.md`)!;
    expect(history).toContain(knowledge.release_id);
    for (const reference of chapter.sections.flatMap(
      (section) => section.source_refs,
    )) {
      if (chapter.body.includes(`[@${reference}]`))
        expect(history).toContain(`../sources/${reference}.md`);
    }
  }
  expect(pages.get("docs/index.md")).toContain("本地发布");
});
