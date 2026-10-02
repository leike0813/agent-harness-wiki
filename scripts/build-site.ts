import { mkdir, mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { Command } from "commander";
import {
  compileChapterRelease,
  verifyChapterRelease,
} from "../src/compiler/chapter-release.js";
import { buildSitePages } from "../src/compiler/site.js";
import { buildOnlineSite } from "../src/compiler/online-site.js";

const options = new Command()
  .option("--release-id <id>")
  .option("--releases-root <path>", "Release directory", "releases")
  .option("--base <path>", "Public site base path", "/")
  .option("--out-dir <path>", "Build output", "site/.vitepress/dist")
  .option("--online", "Build online data and matching pages")
  .option("--dataset-root <path>")
  .option("--profile <profile>", "fixture or production")
  .option("--commit <sha>", "Full Git commit SHA")
  .option("--published-at <iso>")
  .option("--retain <directories...>", "Verified previous deployments")
  .parse()
  .opts<{
    releaseId?: string;
    releasesRoot: string;
    base: string;
    outDir: string;
    online?: boolean;
    datasetRoot?: string;
    profile?: "fixture" | "production";
    commit?: string;
    publishedAt?: string;
    retain?: string[];
  }>();
let temporaryRoot: string | undefined;
try {
  if (options.online) {
    if (
      options.releaseId ||
      !options.datasetRoot ||
      !options.profile ||
      !options.commit ||
      !options.publishedAt
    )
      throw new Error(
        "Online pages require dataset, profile, commit and publication time.",
      );
    process.stdout.write(
      `${JSON.stringify(await buildOnlineSite({ ...options, datasetRoot: options.datasetRoot, profile: options.profile, commit: options.commit, publishedAt: options.publishedAt }))}\n`,
    );
  } else {
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
    await buildSitePages({
      docsDir: path.join(releaseDir, "docs"),
      profile: manifest.profile,
      base: options.base,
      outDir: options.outDir,
    });
    process.stdout.write(`Built site from ${path.basename(releaseDir)}.\n`);
  }
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
} finally {
  if (temporaryRoot) await rm(temporaryRoot, { recursive: true, force: true });
}
