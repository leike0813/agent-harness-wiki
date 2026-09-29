import { spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { Command } from "commander";
import {
  compileChapterRelease,
  verifyChapterRelease,
} from "../src/compiler/chapter-release.js";

const options = new Command()
  .option("--release-id <id>")
  .option("--releases-root <path>", "Release directory", "releases")
  .parse()
  .opts<{ releaseId?: string; releasesRoot: string }>();
let temporaryRoot: string | undefined;
let temporarySource: string | undefined;
try {
  let releaseDir: string;
  if (options.releaseId) {
    if (!/^[a-z][a-z0-9_-]*$/.test(options.releaseId))
      throw new Error("Invalid release ID.");
    releaseDir = path.resolve(options.releasesRoot, options.releaseId);
  } else {
    await mkdir("var", { recursive: true });
    temporaryRoot = await mkdtemp(path.resolve("var/ahw-site-"));
    releaseDir = (
      await compileChapterRelease({
        datasetRoot: "tests/fixtures/datasets/chapters",
        profile: "fixture",
        releaseId: "fixture-site",
        publishedAt: "2026-09-29T00:00:00Z",
        releasesRoot: temporaryRoot,
      })
    ).releaseDir;
  }
  const manifest = await verifyChapterRelease(releaseDir);
  await mkdir("var", { recursive: true });
  temporarySource = await mkdtemp(path.resolve("var/ahw-site-source-"));
  const docsDir = path.join(temporarySource, "docs");
  await cp(path.join(releaseDir, "docs"), docsDir, { recursive: true });
  const notice =
    manifest.profile === "fixture"
      ? "> Fictional fixture data. Not real harness guidance.\n\n"
      : "";
  await writeFile(
    path.join(docsDir, "reading-results.md"),
    `${notice}${await readFile("site/reading-results.md", "utf8")}`,
  );
  const index = path.join(docsDir, "index.md");
  await writeFile(
    index,
    `${await readFile(index, "utf8")}\n[Reading results](reading-results.md)\n`,
  );
  const result = spawnSync(
    process.execPath,
    [
      path.resolve("site/node_modules/vitepress/bin/vitepress.js"),
      "build",
      docsDir,
      "--outDir",
      path.resolve("site/.vitepress/dist"),
    ],
    { stdio: "inherit" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`VitePress exited ${result.status}`);
  process.stdout.write(`Built site from ${path.basename(releaseDir)}.\n`);
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
} finally {
  if (temporarySource)
    await rm(temporarySource, { recursive: true, force: true });
  if (temporaryRoot) await rm(temporaryRoot, { recursive: true, force: true });
}
