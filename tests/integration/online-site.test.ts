import {
  open,
  cp,
  mkdtemp,
  rm,
  mkdir,
  symlink,
  readFile,
  writeFile,
} from "node:fs/promises";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, expect, test } from "vitest";
import {
  checkDeploymentCapacity,
  deploymentByteLimit,
  buildOnlineSite,
  verifyOnlineDeployment,
} from "../../src/compiler/online-site.js";
import { sha256 } from "../../src/compiler/projection.js";

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
