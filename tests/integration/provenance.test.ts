import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import Database from "better-sqlite3";
import { afterEach, expect, test } from "vitest";
import {
  compileRelease,
  verifyRelease,
  type ReleaseManifest,
} from "../../src/compiler/release.js";
import { canonical, sha256 } from "../../src/compiler/projection.js";
import { auditArtifacts } from "../../src/sources/audit.js";
import { loadAndValidateDataset } from "../../src/validation/dataset.js";

const repository = fileURLToPath(new URL("../..", import.meta.url));
const fixture = path.join(repository, "tests/fixtures/datasets/basic");
const temporary: string[] = [];
const git = promisify(execFile);

async function temp(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-provenance-"));
  temporary.push(root);
  return root;
}

async function metadataCopy(): Promise<string> {
  const root = await temp();
  await cp(path.join(repository, "registry"), path.join(root, "registry"), {
    recursive: true,
  });
  await cp(path.join(repository, "knowledge"), path.join(root, "knowledge"), {
    recursive: true,
  });
  await cp(path.join(repository, "catalog"), path.join(root, "catalog"), {
    recursive: true,
  });
  return root;
}

afterEach(async () => {
  await Promise.all(
    temporary
      .splice(0)
      .map((root) => rm(root, { recursive: true, force: true })),
  );
});

test("production metadata validates without local originals", async () => {
  const root = await metadataCopy();
  const result = await loadAndValidateDataset({ root, profile: "production" });
  expect(result.ok).toBe(true);
  if (result.ok) {
    const npmProducts = new Set(
      result.dataset.harnesses
        .filter((harness) =>
          result.dataset.sources.some(
            (source) =>
              source.harness_id === harness.harness_id &&
              source.kind === "npm_registry",
          ),
        )
        .map((harness) => harness.harness_id),
    );
    const managedProducts = new Set(
      result.dataset.artifacts
        .filter((item) => item.kind === "managed_package")
        .map((item) => item.harness_id),
    );
    // A managed package must belong to a product that registered an official npm
    // channel. The converse does not hold: a candidate can still be blocked (it
    // needs a network download or an install script) or the vendor may ship no
    // directly runnable Linux entry, which harness-binary reports instead.
    expect([...managedProducts].every((id) => npmProducts.has(id))).toBe(true);
    for (const first of ["codex", "claude-code", "opencode", "pi", "omp"])
      expect(managedProducts.has(first)).toBe(true);
    const firstWaveCoverage = result.dataset.coverage.filter((item) =>
      item.target.distribution.startsWith("npm:"),
    );
    expect(firstWaveCoverage).toHaveLength(35);
    expect(
      firstWaveCoverage.filter(
        (item) =>
          item.status === "partial" &&
          item.snapshot_refs?.length &&
          item.investigation_notes,
      ),
    ).toHaveLength(35);
    expect(result.dataset.claims).toHaveLength(3);
    expect(
      result.dataset.assessments.map((item) => item.status).sort(),
    ).toEqual(["accepted", "accepted", "accepted"]);
  }
});

test.each([
  [
    "knowledge/codex/snapshots/snapshot-codex-cli-doc.yaml",
    "artifact-codex-cli-doc",
    "artifact-codex-repo",
    "ARTIFACT_MISSING",
  ],
  [
    "knowledge/codex/artifacts/artifact-codex-cli-doc.yaml",
    "archive/codex/artifact-codex-cli-doc/raw.md",
    "../raw.md",
    "PATH_INVALID",
  ],
  [
    "knowledge/codex/artifacts/artifact-codex-cli-doc.yaml",
    "harness_id: codex",
    "harness_id: other",
    "ARTIFACT_MISSING",
  ],
  [
    "knowledge/codex/snapshots/snapshot-codex-repo.yaml",
    "distribution: source-tree",
    "distribution: packaged-cli",
    "TARGET_MISMATCH",
  ],
  [
    "knowledge/pi/snapshots/snapshot-pi-npm.yaml",
    "value: 0.73.1",
    "value: 0.73.2",
    "TARGET_MISMATCH",
  ],
  [
    "knowledge/pi/coverage/coverage-pi-skills.yaml",
    "snapshot-pi-npm",
    "snapshot-omp-npm",
    "SNAPSHOT_MISSING",
  ],
] as const)(
  "rejects broken provenance in %s",
  async (relative, before, after, code) => {
    const root = await metadataCopy();
    const file = path.join(root, relative);
    await writeFile(
      file,
      (await readFile(file, "utf8")).replace(before, after),
    );
    const result = await loadAndValidateDataset({
      root,
      profile: "production",
    });
    expect(result.ok).toBe(false);
    expect(result.diagnostics.map((item) => item.code)).toContain(code);
  },
);

test("offline audit checks archived bytes and reports missing originals", async () => {
  const validated = await loadAndValidateDataset({
    root: repository,
    profile: "production",
  });
  if (!validated.ok) throw new Error("Production metadata invalid.");
  const document = validated.dataset.artifacts.find(
    (item) => item.kind === "archived_document",
  );
  if (!document || document.kind !== "archived_document")
    throw new Error("Document artifact absent.");
  const bytes = "offline audit sample\n";
  const sample = {
    ...document,
    raw_sha256: sha256(bytes),
    extracted_sha256: sha256(bytes),
  };
  const root = await temp();
  await expect(auditArtifacts([sample], root)).rejects.toThrow(
    document.artifact_id,
  );
  const file = path.join(root, document.archive_path);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, bytes);
  await auditArtifacts([sample], root);
  await writeFile(file, "changed");
  await expect(auditArtifacts([sample], root)).rejects.toThrow(/hash mismatch/);
});

test("offline audit checks local Git HEAD and selected file hash", async () => {
  const root = await temp();
  const checkout = path.join(root, "upstream/codex");
  await mkdir(checkout, { recursive: true });
  await writeFile(path.join(checkout, "README.md"), "fixed source\n");
  await git("git", ["-C", checkout, "init", "-q"]);
  await git("git", ["-C", checkout, "add", "README.md"]);
  await git("git", [
    "-C",
    checkout,
    "-c",
    "user.name=Fixture",
    "-c",
    "user.email=fixture@example.invalid",
    "commit",
    "-qm",
    "fixture",
  ]);
  const { stdout } = await git("git", ["-C", checkout, "rev-parse", "HEAD"]);
  const artifact = {
    schema_version: 1 as const,
    record_kind: "fixture" as const,
    kind: "git_checkout" as const,
    artifact_id: "artifact-local-source",
    source_id: "source-local-source",
    harness_id: "codex",
    checkout_path: "upstream/codex",
    commit: stdout.trim(),
    file: "README.md",
    content_sha256: sha256("fixed source\n"),
  };
  await auditArtifacts([artifact], root);
  await expect(
    auditArtifacts([{ ...artifact, commit: "0".repeat(40) }], root),
  ).rejects.toThrow(/commit differs/);
  await writeFile(path.join(checkout, "README.md"), "changed\n");
  await expect(auditArtifacts([artifact], root)).rejects.toThrow(
    /hash mismatch/,
  );
});

test("managed package audit checks the pinned lock, bytes and missing original", async () => {
  const root = await temp();
  const packageDir = path.join(
    root,
    "research/package-set/node_modules/.pnpm/example@1.0.0/node_modules/example",
  );
  const link = path.join(root, "research/package-set/node_modules/example");
  await mkdir(packageDir, { recursive: true });
  await writeFile(
    path.join(packageDir, "package.json"),
    '{"name":"example","version":"1.0.0"}',
  );
  await writeFile(path.join(packageDir, "README.md"), "fixed package text\n");
  await symlink(packageDir, link);
  const lockfile = path.join(root, "research/package-set/pnpm-lock.yaml");
  await writeFile(
    lockfile,
    "importers:\n  .:\n    dependencies:\n      example:\n        specifier: 1.0.0\npackages:\n  example@1.0.0:\n    resolution:\n      integrity: sha512-AAAA\n",
  );
  const artifact = {
    schema_version: 1 as const,
    record_kind: "fixture" as const,
    kind: "managed_package" as const,
    artifact_id: "artifact-example",
    source_id: "source-example",
    harness_id: "example",
    package_name: "example",
    version: "1.0.0",
    integrity: "sha512-AAAA",
    package_path: "research/package-set/node_modules/example",
    lockfile_path: "research/package-set/pnpm-lock.yaml" as const,
    file: "README.md",
    content_sha256: sha256("fixed package text\n"),
  };
  await auditArtifacts([artifact], root);
  await expect(
    auditArtifacts([{ ...artifact, version: "2.0.0" }], root),
  ).rejects.toThrow(/unavailable/);
  await expect(
    auditArtifacts([{ ...artifact, integrity: "sha512-BBBB" }], root),
  ).rejects.toThrow(/lockfile/);
  const escape = path.join(root, "escape");
  await mkdir(escape, { recursive: true });
  await symlink(
    escape,
    path.join(root, "research/package-set/node_modules/escape"),
  );
  await expect(
    auditArtifacts(
      [
        {
          ...artifact,
          package_path: "research/package-set/node_modules/escape",
        },
      ],
      root,
    ),
  ).rejects.toThrow(/escapes/);
  await writeFile(path.join(packageDir, "README.md"), "changed\n");
  await expect(auditArtifacts([artifact], root)).rejects.toThrow(
    /hash mismatch/,
  );
  await writeFile(path.join(packageDir, "README.md"), "fixed package text\n");
  await writeFile(
    lockfile,
    (await readFile(lockfile, "utf8")).replace("AAAA", "BBBB"),
  );
  await expect(auditArtifacts([artifact], root)).rejects.toThrow(/lockfile/);
  await rm(link);
  await expect(auditArtifacts([artifact], root)).rejects.toThrow(/unavailable/);
});

test("unversioned documentation cannot verify an exact fixture claim", async () => {
  const root = await temp();
  await cp(fixture, root, { recursive: true });
  for (const [from, to] of [
    [
      "registry/sources/source-codex-cli-doc.yaml",
      "registry/sources/source-codex-cli-doc.yaml",
    ],
    [
      "knowledge/codex/artifacts/artifact-codex-cli-doc.yaml",
      "knowledge/demo-open-cli/artifacts/artifact-codex-cli-doc.yaml",
    ],
    [
      "knowledge/codex/snapshots/snapshot-codex-cli-doc.yaml",
      "knowledge/demo-open-cli/snapshots/snapshot-codex-cli-doc.yaml",
    ],
  ] as const) {
    const destination = path.join(root, to);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(
      destination,
      (await readFile(path.join(repository, from), "utf8"))
        .replace("record_kind: production", "record_kind: fixture")
        .replace("harness_id: codex", "harness_id: demo-open-cli")
        .replace("archive/codex/", "archive/demo-open-cli/"),
    );
  }
  const evidenceFile = path.join(
    root,
    "knowledge/demo-open-cli/evidence/evidence-demo-open-skills.yaml",
  );
  await writeFile(
    evidenceFile,
    (await readFile(evidenceFile, "utf8")).replace(
      "snapshot-demo-open-142-linux",
      "snapshot-codex-cli-doc",
    ),
  );
  const result = await loadAndValidateDataset({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        code: "TARGET_MISMATCH",
        record_id: "claim-demo-open-skills",
      }),
    ]),
  );
});

test("first-wave release publishes reviewed facts and scoped provenance", async () => {
  const metadata = await metadataCopy();
  const releasesRoot = await temp();
  const { releaseDir } = await compileRelease({
    datasetRoot: metadata,
    profile: "production",
    releaseId: "codex-provenance",
    publishedAt: "2026-09-27T09:44:48Z",
    releasesRoot,
  });
  expect((await verifyRelease(releaseDir)).builder_version).toBe("3");
  const knowledge = JSON.parse(
    await readFile(path.join(releaseDir, "knowledge.json"), "utf8"),
  );
  expect(
    knowledge.records.claims.map((item: { claim_id: string }) => item.claim_id),
  ).toEqual([
    "claim-omp-user-agents-path",
    "claim-pi-core-mcp",
    "claim-pi-user-skills-path",
  ]);
  expect(
    knowledge.records.coverage.filter(
      (item: { target: { distribution: string } }) =>
        item.target.distribution.startsWith("npm:"),
    ),
  ).toHaveLength(35);
  expect(
    knowledge.records.snapshots.find(
      (item: { kind?: string }) => item.kind === "documentation",
    )?.version_applicability.kind,
  ).toBe("unknown");
  const db = new Database(path.join(releaseDir, "knowledge.sqlite"), {
    readonly: true,
  });
  try {
    expect(db.prepare("SELECT count(*) AS n FROM artifacts").get()).toEqual({
      n: knowledge.records.artifacts.length,
    });
  } finally {
    db.close();
  }
});

test("version 1 release without artifact metadata still verifies", async () => {
  const releasesRoot = await temp();
  const { releaseDir } = await compileRelease({
    datasetRoot: fixture,
    profile: "fixture",
    releaseId: "old-fixture",
    publishedAt: "2026-09-27T00:00:00Z",
    releasesRoot,
  });
  const knowledgeFile = path.join(releaseDir, "knowledge.json");
  const knowledge = JSON.parse(await readFile(knowledgeFile, "utf8"));
  delete knowledge.records.artifacts;
  await writeFile(knowledgeFile, canonical(knowledge));
  const sqliteFile = path.join(releaseDir, "knowledge.sqlite");
  const db = new Database(sqliteFile);
  try {
    db.exec("DROP TABLE artifacts");
  } finally {
    db.close();
  }
  const manifestFile = path.join(releaseDir, "manifest.json");
  const manifest = JSON.parse(
    await readFile(manifestFile, "utf8"),
  ) as ReleaseManifest;
  manifest.builder_version = "1";
  manifest.artifacts["knowledge.json"] = sha256(await readFile(knowledgeFile));
  manifest.artifacts["knowledge.sqlite"] = sha256(await readFile(sqliteFile));
  await writeFile(manifestFile, canonical(manifest));
  expect((await verifyRelease(releaseDir)).builder_version).toBe("1");
});
