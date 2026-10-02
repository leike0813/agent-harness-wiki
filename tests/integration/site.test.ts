import { spawnSync } from "node:child_process";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
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

test.each(["/", "/wiki/"])(
  "site builds navigable pages under %s from a verified immutable release",
  async (base) => {
    const before = await readFile(
      path.join(releaseDir, "manifest.json"),
      "utf8",
    );
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
        "--base",
        base,
      ],
      { encoding: "utf8", timeout: 30_000 },
    );
    expect(build.status, build.stderr).toBe(0);
    expect(await readFile(path.join(releaseDir, "manifest.json"), "utf8")).toBe(
      before,
    );
    await verifyChapterRelease(releaseDir);
    const index = await readFile(path.join(output, "index.html"), "utf8");
    const catalog = await readFile(path.join(output, "catalog.html"), "utf8");
    const knowledge = chapterPublishedKnowledgeSchema.parse(
      JSON.parse(
        await readFile(path.join(releaseDir, "knowledge.json"), "utf8"),
      ),
    );
    expect(index).toContain('lang="zh-CN"');
    for (const harness of knowledge.records.harnesses)
      expect(index).toContain(
        `href="${base}harnesses/${harness.harness_id}/index"`,
      );
    expect(catalog).toContain("Demo Candidate CLI");
    expect(catalog).not.toContain(`${base}harnesses/demo-candidate/`);
    const assets = await readdir(path.join(output, "assets"), {
      recursive: true,
    });
    const searchAsset = assets.find((file) =>
      file.includes("localSearchIndex"),
    );
    expect(searchAsset).toBeDefined();
    const searchIndex = await readFile(
      path.join(output, "assets", searchAsset!),
      "utf8",
    );
    expect(searchIndex).toContain("harnesses/demo-open-cli/skills");
    expect(searchIndex).toContain("#product-overview");
    expect(searchIndex).not.toContain("/chapters/");
    expect(searchIndex).not.toContain("/sources/");
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
        expect(page).toContain(`href="${base}harnesses/${harness}/index"`);
        expect(page).toContain(`href="${base}harnesses/${harness}/${topic}"`);
      }
    }
  },
  60_000,
);

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
