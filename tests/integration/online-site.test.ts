import {
  open,
  cp,
  mkdtemp,
  rm,
  mkdir,
  symlink,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, expect, test } from "vitest";
import {
  assembleOnlineDeployment,
  checkDeploymentCapacity,
  deploymentByteLimit,
  buildOnlineSite,
  verifyOnlineDeployment,
} from "../../src/compiler/online-site.js";
import { sha256 } from "../../src/compiler/projection.js";
import {
  beginDeployment,
  completeDeployment,
  initialState,
  onlineReleases,
  reserveRelease,
} from "../../src/publication/state.js";

const exec = promisify(execFile);

const temporary: string[] = [];
async function temp(): Promise<string> {
  const directory = await mkdtemp(path.join(tmpdir(), "ahw-online-site-"));
  temporary.push(directory);
  return directory;
}
afterEach(async () => {
  await Promise.all(
    temporary
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

test("capacity counts all uncompressed files, with an inclusive limit", async () => {
  const root = await temp();
  await mkdir(path.join(root, "data/v1/releases/old"), { recursive: true });
  await writeFile(path.join(root, "index.html"), "page");
  const file = await open(
    path.join(root, "data/v1/releases/old/resource.json"),
    "w",
  );
  try {
    await file.truncate(deploymentByteLimit - 4);
    expect((await checkDeploymentCapacity(root)).bytes).toBe(
      deploymentByteLimit,
    );
    await file.truncate(deploymentByteLimit - 3);
    await expect(checkDeploymentCapacity(root)).rejects.toThrow(/capacity/);
    expect(await readFile(path.join(root, "index.html"), "utf8")).toBe("page");
  } finally {
    await file.close();
  }
});

test("deployment traversal rejects symbolic links", async () => {
  const root = await temp();
  await symlink(root, path.join(root, "outside"), "dir");
  await expect(checkDeploymentCapacity(root)).rejects.toThrow(/symlink/);
});

test("builds one release with retained resources and preserves accepted output on failure", async () => {
  const root = await temp();
  const datasetRoot = path.join(root, "input");
  await cp("tests/fixtures/datasets/chapters", datasetRoot, {
    recursive: true,
  });
  const git = (args: string[]) => exec("git", ["-C", datasetRoot, ...args]);
  const commit = async (message: string) => {
    await git(["add", "."]);
    await git([
      "-c",
      "user.name=test",
      "-c",
      "user.email=test@example.invalid",
      "commit",
      "-qm",
      message,
    ]);
    return (await git(["rev-parse", "HEAD"])).stdout.trim();
  };
  await git(["init", "-q"]);
  const firstCommit = await commit("fixture input");
  const options = {
    datasetRoot,
    profile: "fixture" as const,
    commit: firstCommit,
    publishedAt: "2026-10-02T00:00:00Z",
    base: "/wiki/",
    outDir: path.join(root, "first"),
  };
  const first = await buildOnlineSite(options);
  expect(await buildOnlineSite(options)).toEqual(first);
  const before = await readFile(
    path.join(options.outDir, "integrity.json"),
    "utf8",
  );
  const repeated = path.join(root, "repeated");
  await buildOnlineSite({ ...options, outDir: repeated });
  expect(await readFile(path.join(repeated, "integrity.json"), "utf8")).toBe(
    before,
  );
  await expect(
    buildOnlineSite({ ...options, publishedAt: "2026-10-03T00:00:00Z" }),
  ).rejects.toThrow(/cannot be overwritten/);
  expect(
    await readFile(path.join(options.outDir, "integrity.json"), "utf8"),
  ).toBe(before);

  const current = path.join(
    datasetRoot,
    "knowledge/demo-open-cli/chapters/demo-open-cli-skills-v1.md",
  );
  const body = await readFile(current, "utf8");
  for (const edition of ["v2", "v3"])
    await writeFile(
      current.replace("v1.md", edition + ".md"),
      body.replace(
        "edition_id: demo-open-cli-skills-v1",
        "edition_id: demo-open-cli-skills-" + edition,
      ),
    );
  const secondCommit = await commit("historical editions");
  const secondDir = path.join(root, "second");
  await buildOnlineSite({
    ...options,
    commit: secondCommit,
    outDir: secondDir,
    retain: [options.outDir],
  });
  expect(
    await buildOnlineSite({
      ...options,
      commit: secondCommit,
      outDir: secondDir,
      retain: [options.outDir],
    }),
  ).toEqual(await verifyOnlineDeployment(secondDir));
  const retainedPath = `data/v1/releases/${first.releaseId}/manifest.json`;
  expect(await readFile(path.join(secondDir, retainedPath), "utf8")).toBe(
    await readFile(path.join(options.outDir, retainedPath), "utf8"),
  );
  const page = await readFile(
    path.join(secondDir, "harnesses/demo-open-cli/skills.html"),
    "utf8",
  );
  expect(page).toContain("/wiki/");
  expect(page).toContain("demo-open-cli-skills-v2");
  expect(page).not.toContain("demo-open-cli-skills-v3.html");
  await expect(
    readFile(path.join(secondDir, "chapters/demo-open-cli-skills-v3.html")),
  ).rejects.toMatchObject({ code: "ENOENT" });

  // Rehashing a damaged page must not bypass the semantic link/identity check.
  const pagePath = "harnesses/demo-open-cli/skills.html";
  const damaged = page.replaceAll(
    `web-v1-${secondCommit}`,
    "web-v1-" + "0".repeat(40),
  );
  await writeFile(path.join(secondDir, pagePath), damaged);
  const recordPath = path.join(secondDir, "integrity.json");
  const record = JSON.parse(await readFile(recordPath, "utf8"));
  record.files[pagePath] = sha256(damaged);
  await writeFile(recordPath, JSON.stringify(record));
  await expect(verifyOnlineDeployment(secondDir)).rejects.toThrow(/identity/);
  await expect(
    buildOnlineSite({
      ...options,
      commit: secondCommit,
      outDir: path.join(root, "failed"),
      retain: [secondDir],
    }),
  ).rejects.toThrow(/identity/);
  await expect(
    readFile(path.join(root, "failed/integrity.json")),
  ).rejects.toMatchObject({ code: "ENOENT" });
  expect(await verifyOnlineDeployment(options.outDir)).toEqual(first);
}, 60_000);

test("assembles selected pages with exactly retained own release data", async () => {
  const root = await temp();
  const datasetRoot = path.join(root, "input");
  await cp("tests/fixtures/datasets/chapters", datasetRoot, {
    recursive: true,
  });
  const git = (args: string[]) => exec("git", ["-C", datasetRoot, ...args]);
  const commit = async (message: string) => {
    await git(["add", "."]);
    await git([
      "-c",
      "user.name=test",
      "-c",
      "user.email=test@example.invalid",
      "commit",
      "-qm",
      message,
    ]);
    return (await git(["rev-parse", "HEAD"])).stdout.trim();
  };
  await git(["init", "-q"]);
  const firstCommit = await commit("fixture input");

  const base = {
    datasetRoot,
    profile: "fixture" as const,
    publishedAt: "2026-10-02T00:00:00Z",
    base: "/wiki/",
  };
  const firstDir = path.join(root, "first");
  const first = await buildOnlineSite({
    ...base,
    commit: firstCommit,
    outDir: firstDir,
  });

  const current = path.join(
    datasetRoot,
    "knowledge/demo-open-cli/chapters/demo-open-cli-skills-v1.md",
  );
  const body = await readFile(current, "utf8");
  for (const edition of ["v2", "v3"])
    await writeFile(
      current.replace("v1.md", edition + ".md"),
      body.replace(
        "edition_id: demo-open-cli-skills-v1",
        "edition_id: demo-open-cli-skills-" + edition,
      ),
    );
  const secondCommit = await commit("historical editions");
  const canonicalDir = path.join(root, "canonical");
  const canonical = await buildOnlineSite({
    ...base,
    commit: secondCommit,
    outDir: canonicalDir,
  });
  const envelopeDir = path.join(root, "envelope");
  await buildOnlineSite({
    ...base,
    commit: secondCommit,
    outDir: envelopeDir,
    retain: [firstDir],
  });
  const firstIntegrity = await readFile(
    path.join(firstDir, "integrity.json"),
    "utf8",
  );
  const envelopeIntegrity = await readFile(
    path.join(envelopeDir, "integrity.json"),
    "utf8",
  );

  // A retained envelope carries an older release, but only its own is kept.
  const stale = path.join(root, "stale");
  const staleResult = await assembleOnlineDeployment({
    candidateDir: canonicalDir,
    retainedDirs: [envelopeDir],
    outDir: stale,
  });
  expect(staleResult.releaseId).toBe(canonical.releaseId);
  expect(staleResult).toEqual(await verifyOnlineDeployment(stale));
  await expect(
    readFile(
      path.join(stale, `data/v1/releases/${first.releaseId}/manifest.json`),
    ),
  ).rejects.toMatchObject({ code: "ENOENT" });

  // A protected archive supplies its own data while pages stay canonical.
  const restored = path.join(root, "restored");
  await assembleOnlineDeployment({
    candidateDir: canonicalDir,
    retainedDirs: [firstDir],
    outDir: restored,
  });
  const retainedManifest = `data/v1/releases/${first.releaseId}/manifest.json`;
  expect(await readFile(path.join(restored, retainedManifest), "utf8")).toBe(
    await readFile(path.join(firstDir, retainedManifest), "utf8"),
  );
  const page = await readFile(
    path.join(restored, "harnesses/demo-open-cli/skills.html"),
    "utf8",
  );
  expect(page).toContain("demo-open-cli-skills-v2");
  expect(page).not.toContain("demo-open-cli-skills-v3.html");

  // Three archived releases rotate through two online slots; an excluded
  // verified archive can still supply a manual recovery's pages and data.
  await git([
    "-c",
    "user.name=test",
    "-c",
    "user.email=test@example.invalid",
    "commit",
    "--allow-empty",
    "-qm",
    "third fixture publication",
  ]);
  const thirdCommit = (await git(["rev-parse", "HEAD"])).stdout.trim();
  const thirdDir = path.join(root, "third");
  const third = await buildOnlineSite({
    ...base,
    commit: thirdCommit,
    outDir: thirdDir,
  });
  const archives = new Map([
    [first.releaseId, firstDir],
    [canonical.releaseId, canonicalDir],
    [third.releaseId, thirdDir],
  ]);
  const state = initialState();
  for (const [index, sha] of [firstCommit, secondCommit].entries()) {
    const release = reserveRelease(state, sha, base.publishedAt);
    const runId = `fixture-${index}`;
    beginDeployment(state, release.archive_tag, runId, base.publishedAt);
    completeDeployment(state, {
      runId,
      deploymentId: null,
      at: base.publishedAt,
      verified: true,
    });
  }
  reserveRelease(state, thirdCommit, base.publishedAt);
  for (const [index, target] of [third.releaseId, first.releaseId].entries()) {
    const selected = onlineReleases(state, target);
    const output = path.join(root, `rotation-${index}`);
    await assembleOnlineDeployment({
      candidateDir: archives.get(target)!,
      retainedDirs: selected
        .filter((id) => id !== target)
        .map((id) => archives.get(id)!),
      outDir: output,
    });
    expect(
      (await readdir(path.join(output, "data/v1/releases"))).sort(),
    ).toEqual(selected);
    expect((await verifyOnlineDeployment(output)).releaseId).toBe(target);
    const runId = `rotation-${index}`;
    beginDeployment(state, target, runId, base.publishedAt);
    completeDeployment(state, {
      runId,
      deploymentId: null,
      at: base.publishedAt,
      verified: true,
    });
    expect(onlineReleases(state, target)).toEqual(selected);
  }
  expect(Object.keys(state.releases)).toHaveLength(3);

  // Inputs stay byte-stable and an existing output cannot be overwritten.
  expect(await readFile(path.join(firstDir, "integrity.json"), "utf8")).toBe(
    firstIntegrity,
  );
  expect(await readFile(path.join(envelopeDir, "integrity.json"), "utf8")).toBe(
    envelopeIntegrity,
  );
  await expect(
    assembleOnlineDeployment({
      candidateDir: canonicalDir,
      retainedDirs: [],
      outDir: restored,
    }),
  ).rejects.toThrow(/cannot be overwritten/);

  // Explicit lifecycle pointers are applied; a mismatched protocol is rejected.
  const pointer = {
    protocol_version: 2,
    state: "retired",
    retired_at: "2026-12-01T00:00:00Z",
    upgrade: "https://example.invalid/upgrade",
  };
  const pointed = path.join(root, "pointed");
  await assembleOnlineDeployment({
    candidateDir: canonicalDir,
    retainedDirs: [],
    outDir: pointed,
    pointers: { "data/v2/current.json": pointer },
  });
  expect(
    JSON.parse(
      await readFile(path.join(pointed, "data/v2/current.json"), "utf8"),
    ),
  ).toEqual(pointer);
  await expect(
    assembleOnlineDeployment({
      candidateDir: canonicalDir,
      retainedDirs: [],
      outDir: path.join(root, "mismatch"),
      pointers: {
        "data/v2/current.json": { ...pointer, protocol_version: 3 },
      },
    }),
  ).rejects.toThrow(/protocol differs/);

  // The inclusive 768 MiB deployment limit is enforced before acceptance.
  const oversized = path.join(root, "oversized");
  await cp(canonicalDir, oversized, { recursive: true });
  const big = await open(path.join(oversized, "big.bin"), "w");
  await big.truncate(deploymentByteLimit);
  await big.close();
  const recordPath = path.join(oversized, "integrity.json");
  const record = JSON.parse(await readFile(recordPath, "utf8"));
  // ponytail: capacity is checked before hashing, so the value never matters.
  record.files["big.bin"] = sha256("");
  await writeFile(recordPath, JSON.stringify(record));
  await expect(
    assembleOnlineDeployment({
      candidateDir: oversized,
      retainedDirs: [],
      outDir: path.join(root, "over"),
    }),
  ).rejects.toThrow(/capacity/);
  await expect(
    readFile(path.join(root, "over", "integrity.json")),
  ).rejects.toMatchObject({ code: "ENOENT" });
}, 120_000);
