import { createHash } from "node:crypto";
import {
  cp,
  mkdtemp,
  readFile,
  readdir,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { afterEach, expect, test } from "vitest";
import { compileRelease, verifyRelease } from "../../src/compiler/release.js";
import { renderDocs } from "../../src/compiler/docs.js";
import { canonical } from "../../src/compiler/projection.js";
import type { PublishedKnowledge } from "../../src/domain/schema.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/basic", import.meta.url),
);
const temporary: string[] = [];
const publishedAt = "2026-09-27T00:00:00Z";

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-release-"));
  temporary.push(root);
  return root;
}

afterEach(async () => {
  await Promise.all(
    temporary
      .splice(0)
      .map((root) => rm(root, { recursive: true, force: true })),
  );
});

async function build(
  root: string,
  datasetRoot = fixture,
  releaseId = "fixture-basic",
  profile: "fixture" | "production" = "fixture",
) {
  return compileRelease({
    datasetRoot,
    profile,
    releaseId,
    publishedAt,
    releasesRoot: root,
  });
}

async function files(root: string, relative = ""): Promise<string[]> {
  const entries = await readdir(path.join(root, relative), {
    withFileTypes: true,
  });
  const found: string[] = [];
  for (const entry of entries) {
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) found.push(...(await files(root, name)));
    else found.push(name);
  }
  return found.sort();
}

test("repeat build yields equal canonical artifacts and SQLite rows", async () => {
  const left = await build(await tempRoot());
  const right = await build(await tempRoot());
  expect(await verifyRelease(left.releaseDir)).toEqual(left.manifest);
  expect(await verifyRelease(right.releaseDir)).toEqual(right.manifest);
  const leftFiles = await files(left.releaseDir);
  expect(leftFiles).toEqual(await files(right.releaseDir));
  for (const name of leftFiles.filter((item) => item !== "knowledge.sqlite"))
    expect(await readFile(path.join(left.releaseDir, name))).toEqual(
      await readFile(path.join(right.releaseDir, name)),
    );
  for (const table of [
    "harnesses",
    "sources",
    "snapshots",
    "claims",
    "evidence",
    "assessments",
    "coverage",
    "claims_fts",
  ]) {
    const rows = [];
    for (const release of [left, right]) {
      const db = new Database(
        path.join(release.releaseDir, "knowledge.sqlite"),
        { readonly: true },
      );
      try {
        rows.push(
          db
            .prepare(
              `SELECT * FROM ${table} ORDER BY ${table === "claims_fts" ? "claim_id" : "id"}`,
            )
            .all(),
        );
      } finally {
        db.close();
      }
    }
    expect(rows[0]).toEqual(rows[1]);
  }
  const db = new Database(path.join(left.releaseDir, "knowledge.sqlite"), {
    readonly: true,
  });
  try {
    expect(
      db
        .prepare(
          "SELECT count(*) AS n FROM claims_fts WHERE claims_fts MATCH ?",
        )
        .get("skills"),
    ).toEqual({ n: 1 });
    expect(db.pragma("foreign_key_check")).toEqual([]);
  } finally {
    db.close();
  }
});

test("release views preserve exact scope, coverage and evidence", async () => {
  const result = await build(await tempRoot());
  const knowledge = JSON.parse(
    await readFile(path.join(result.releaseDir, "knowledge.json"), "utf8"),
  ) as PublishedKnowledge;
  expect(knowledge.records.harnesses).toHaveLength(2);
  expect(knowledge.records.claims).toHaveLength(8);
  expect(
    knowledge.records.snapshots.some(
      (item) =>
        "target" in item && item.target.version_identity.value === "2.0.0",
    ),
  ).toBe(true);
  expect(
    knowledge.records.claims.some(
      (item) => item.version_applicability.versions[0].value === "2.0.0",
    ),
  ).toBe(false);
  expect(
    knowledge.records.coverage.some(
      (item) =>
        item.status === "not_started" &&
        item.target.version_identity.value === "2.0.0",
    ),
  ).toBe(true);
  expect(
    knowledge.records.claims.find(
      (item) => item.claim_id === "claim-demo-package-plugin",
    )?.support.delivery,
  ).toBe("external_extension");
  expect(
    await readFile(
      path.join(result.releaseDir, "docs/topics/native_plugins.md"),
      "utf8",
    ),
  ).toContain("not_started");
  for (const file of (await files(path.join(result.releaseDir, "docs"))).filter(
    (name) => name.endsWith(".md"),
  ))
    expect(
      await readFile(path.join(result.releaseDir, "docs", file), "utf8"),
    ).toContain("Fictional fixture data");
  const db = new Database(path.join(result.releaseDir, "knowledge.sqlite"), {
    readonly: true,
  });
  try {
    for (const claim of knowledge.records.claims)
      expect(
        (
          db
            .prepare("SELECT payload_json FROM claims WHERE id=?")
            .get(claim.claim_id) as { payload_json: string }
        ).payload_json,
      ).toBe(canonical(claim));
  } finally {
    db.close();
  }
});

test("unreviewed facts stay out; source markup is inert", async () => {
  const root = await tempRoot();
  const dataset = path.join(root, "dataset");
  await cp(fixture, dataset, { recursive: true });
  const assessment = path.join(
    dataset,
    "knowledge/demo-open-cli/assessments/assessment-demo-open-skills.yaml",
  );
  await writeFile(
    assessment,
    (await readFile(assessment, "utf8")).replace(
      "status: accepted",
      "status: draft",
    ),
  );
  const rejected = path.join(
    dataset,
    "knowledge/demo-open-cli/assessments/assessment-demo-open-hooks.yaml",
  );
  await writeFile(
    rejected,
    (await readFile(rejected, "utf8")).replace(
      "status: accepted",
      "status: rejected",
    ),
  );
  const disputed = path.join(
    dataset,
    "knowledge/demo-open-cli/assessments/assessment-demo-open-mcp.yaml",
  );
  await writeFile(
    disputed,
    (await readFile(disputed, "utf8")).replace(
      "status: accepted",
      "status: disputed",
    ),
  );
  const result = await build(path.join(root, "releases"), dataset);
  const knowledge = JSON.parse(
    await readFile(path.join(result.releaseDir, "knowledge.json"), "utf8"),
  ) as PublishedKnowledge;
  expect(
    knowledge.records.claims.some(
      (item) => item.claim_id === "claim-demo-open-skills",
    ),
  ).toBe(false);
  expect(
    knowledge.records.claims.some(
      (item) => item.claim_id === "claim-demo-open-hooks",
    ),
  ).toBe(false);
  expect(
    knowledge.records.claims.some(
      (item) => item.claim_id === "claim-demo-open-mcp",
    ),
  ).toBe(true);
  expect(
    knowledge.records.coverage.some((item) => item.topic === "skills"),
  ).toBe(true);
  const page = await readFile(
    path.join(result.releaseDir, "docs/topics/skills.md"),
    "utf8",
  );
  expect(page).not.toContain("skills.discovery.project_path");
  expect(
    await readFile(path.join(result.releaseDir, "docs/topics/mcp.md"), "utf8"),
  ).toContain("Review: disputed");
  const malicious = structuredClone(knowledge);
  malicious.records.evidence[0]!.excerpt = "<script>alert(1)</script>";
  const rendered = [...renderDocs(malicious).values()].join("\n");
  expect(rendered).not.toContain("<script>");
  expect(rendered).toContain("&lt;script&gt;");
});

test("invalid input, duplicate IDs and damaged artifacts cannot replace prior release", async () => {
  const root = await tempRoot();
  const previous = await build(root);
  const pointer = await readFile(path.join(root, "current.json"), "utf8");
  await expect(build(root, fixture, "future", "production")).rejects.toThrow(
    /PROFILE_MISMATCH/,
  );
  await expect(build(root)).rejects.toThrow(/already exists/);
  expect(await readFile(path.join(root, "current.json"), "utf8")).toBe(pointer);
  expect(await verifyRelease(previous.releaseDir)).toEqual(previous.manifest);
  const page = path.join(previous.releaseDir, "docs/index.md");
  const original = await readFile(page, "utf8");
  await unlink(page);
  await expect(verifyRelease(previous.releaseDir)).rejects.toThrow(/inventory/);
  await writeFile(page, original);
  await writeFile(page, `${await readFile(page, "utf8")}damage`);
  await expect(verifyRelease(previous.releaseDir)).rejects.toThrow(
    /hash mismatch/,
  );
  expect(await readFile(path.join(root, "current.json"), "utf8")).toBe(pointer);
});

test("source material and temporary paths stay out of release artifacts", async () => {
  const root = await tempRoot();
  const dataset = path.join(root, "dataset");
  await cp(fixture, dataset, { recursive: true });
  const material = path.join(dataset, "materials/demo-open-cli.txt");
  const contents = `${await readFile(material, "utf8")}\nSECRET_CANARY=/home/person/private\n`;
  await writeFile(material, contents);
  const oldHash = createHash("sha256")
    .update(await readFile(path.join(fixture, "materials/demo-open-cli.txt")))
    .digest("hex");
  const newHash = createHash("sha256").update(contents).digest("hex");
  for (const relative of [
    "registry/sources/source-demo-open.yaml",
    "knowledge/demo-open-cli/snapshots/snapshot-demo-open-142-linux.yaml",
  ]) {
    const file = path.join(dataset, relative);
    await writeFile(
      file,
      (await readFile(file, "utf8")).replace(oldHash, newHash),
    );
  }
  const result = await build(path.join(root, "releases"), dataset);
  for (const name of await files(result.releaseDir)) {
    const bytes = await readFile(path.join(result.releaseDir, name));
    expect(bytes.includes("SECRET_CANARY")).toBe(false);
    expect(bytes.includes(root)).toBe(false);
  }
});
