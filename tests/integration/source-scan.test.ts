import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import {
  mkdtemp,
  mkdir,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, expect, test } from "vitest";
import YAML from "yaml";
import { create } from "tar";
import { scanHarnesses, validateAuditLedger } from "../../src/sources/scan.js";
import { readArchivedPackageFile } from "../../src/sources/package-archive.js";
import { auditArtifacts } from "../../src/sources/audit.js";
import { loadAndValidateDataset } from "../../src/validation/dataset.js";

const roots: string[] = [];
const run = promisify(execFile);
afterEach(async () => {
  for (const root of roots.splice(0))
    await rm(root, { recursive: true, force: true });
});

async function record(
  root: string,
  relative: string,
  value: object,
): Promise<void> {
  const file = path.join(root, relative);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, YAML.stringify(value));
}

async function dataset(includeGit = false): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-scan-"));
  roots.push(root);
  await record(root, "registry/harnesses/example.yaml", {
    schema_version: 1,
    record_kind: "production",
    harness_id: "example",
    name: "Example",
    aliases: [],
    surfaces: ["cli"],
    source_refs: [
      "source-example-npm",
      "source-example-doc",
      ...(includeGit ? ["source-example-repo"] : []),
    ],
  });
  await record(root, "registry/sources/npm.yaml", {
    schema_version: 1,
    record_kind: "production",
    source_id: "source-example-npm",
    harness_id: "example",
    kind: "npm_registry",
    package_name: "example-package",
    registry_url: "https://registry.npmjs.org",
  });
  await record(root, "registry/sources/doc.yaml", {
    schema_version: 1,
    record_kind: "production",
    source_id: "source-example-doc",
    harness_id: "example",
    kind: "official_documentation",
    url: "https://example.org/manual.md",
  });
  if (includeGit)
    await record(root, "registry/sources/repo.yaml", {
      schema_version: 1,
      record_kind: "production",
      source_id: "source-example-repo",
      harness_id: "example",
      kind: "git_repository",
      repository_url: "https://example.org/repo.git",
    });
  return root;
}

async function packageBytes(
  root: string,
): Promise<{ bytes: Buffer; integrity: string }> {
  const folder = path.join(root, "tar-input");
  await mkdir(path.join(folder, "package"), { recursive: true });
  await writeFile(
    path.join(folder, "package", "index.js"),
    "export const ready = true;\n",
  );
  const file = path.join(root, "package.tgz");
  await create({ gzip: true, file, cwd: folder }, ["package"]);
  const bytes = await readFile(file);
  return {
    bytes,
    integrity: `sha512-${createHash("sha512").update(bytes).digest("base64")}`,
  };
}

function fakeFetch(
  bytes: Buffer,
  integrity: string,
  brokenDoc = false,
): typeof fetch {
  return (async (input: string | URL | Request) => {
    const url = String(input);
    if (url === "https://registry.npmjs.org/example-package")
      return Response.json({
        name: "example-package",
        "dist-tags": { latest: "2.0.0" },
        versions: {
          "2.0.0": {
            dist: {
              integrity,
              tarball:
                "https://registry.npmjs.org/example-package/-/example-package-2.0.0.tgz",
            },
          },
        },
      });
    if (url.endsWith(".tgz")) return new Response(new Uint8Array(bytes));
    if (url === "https://example.org/manual.md")
      return brokenDoc
        ? new Response(null, { status: 503 })
        : new Response("# Manual\n");
    throw new Error(`Unexpected network request: ${url}`);
  }) as typeof fetch;
}

test("records changed, unchanged and pending scans without changing knowledge", async () => {
  const root = await dataset();
  const pkg = await packageBytes(root);
  const fetchImpl = fakeFetch(pkg.bytes, pkg.integrity);
  const first = (
    await scanHarnesses({ root, harnessIds: ["example"], fetchImpl })
  )[0]!;
  expect(first.status).toBe("changed");
  expect(first.review_status).toBe("pending");
  expect(first.impacts.map((item) => item.topic)).toHaveLength(7);
  expect(
    first.checks.find((item) => item.kind === "npm_registry")?.candidate_path,
  ).toBe("archive/example/npm/2.0.0/package.tgz");
  expect(
    (
      await readArchivedPackageFile(
        path.join(root, "archive/example/npm/2.0.0/package.tgz"),
        pkg.integrity,
        "package/index.js",
      )
    )?.toString(),
  ).toContain("ready");

  const second = (
    await scanHarnesses({ root, harnessIds: ["example"], fetchImpl })
  )[0]!;
  expect(second.status).toBe("no_change");
  expect(second.review_status).toBe("not_required");
  expect(second.pending_audit_refs).toContain(first.audit_id);
  expect(second.checks.every((item) => item.status === "unchanged")).toBe(true);
  expect(await validateAuditLedger(root)).toBe(2);
});

test("source failures remain local and integrity failures do not become candidates", async () => {
  const root = await dataset();
  const pkg = await packageBytes(root);
  const first = (
    await scanHarnesses({
      root,
      harnessIds: ["example"],
      fetchImpl: fakeFetch(pkg.bytes, pkg.integrity, true),
    })
  )[0]!;
  expect(first.status).toBe("blocked");
  expect(
    first.checks.find((item) => item.kind === "npm_registry")?.status,
  ).toBe("changed");
  expect(
    first.checks.find((item) => item.kind === "official_documentation")?.status,
  ).toBe("blocked");

  const invalidIntegrity = `sha512-${Buffer.alloc(64).toString("base64")}`;
  const second = (
    await scanHarnesses({
      root,
      harnessIds: ["example"],
      fetchImpl: fakeFetch(pkg.bytes, invalidIntegrity),
    })
  )[0]!;
  expect(
    second.checks.find((item) => item.kind === "npm_registry")?.status,
  ).toBe("blocked");
  expect(
    second.checks.find((item) => item.kind === "official_documentation")
      ?.status,
  ).toBe("changed");
});

test("does not follow a registered document to another origin", async () => {
  const root = await dataset();
  const pkg = await packageBytes(root);
  const ordinary = fakeFetch(pkg.bytes, pkg.integrity);
  const fetchImpl = (async (
    input: string | URL | Request,
    init?: RequestInit,
  ) =>
    String(input) === "https://example.org/manual.md"
      ? new Response(null, {
          status: 302,
          headers: { location: "https://unrelated.example/manual.md" },
        })
      : ordinary(input, init)) as typeof fetch;
  const audit = (
    await scanHarnesses({ root, harnessIds: ["example"], fetchImpl })
  )[0]!;
  const doc = audit.checks.find(
    (item) => item.kind === "official_documentation",
  );
  expect(doc?.status).toBe("blocked");
  expect(doc?.error).toMatch(/Cross-origin/);
  expect(
    audit.checks.find((item) => item.kind === "npm_registry")?.status,
  ).toBe("changed");
});

test("rejects unsafe package links and keeps Git candidates separate from submodules", async () => {
  const root = await dataset(true);
  const pkg = await packageBytes(root);
  const input = path.join(root, "bad-tar");
  await mkdir(path.join(input, "package"), { recursive: true });
  await symlink("../../escape", path.join(input, "package", "link"));
  const badFile = path.join(root, "bad.tgz");
  await create({ gzip: true, file: badFile, cwd: input }, ["package"]);
  const badBytes = await readFile(badFile);
  const badIntegrity = `sha512-${createHash("sha512").update(badBytes).digest("base64")}`;
  await expect(readArchivedPackageFile(badFile, badIntegrity)).rejects.toThrow(
    /Unsafe/,
  );

  const commit = "a".repeat(40);
  const submodule = path.join(root, "upstream", "example");
  await mkdir(submodule, { recursive: true });
  await writeFile(path.join(submodule, "marker"), "untouched");
  const git = async (args: string[]): Promise<string> => {
    if (args.includes("ls-remote")) return `${commit}\tHEAD\n`;
    if (args.includes("clone")) {
      await mkdir(args.at(-1)!, { recursive: true });
      return "";
    }
    if (args.includes("rev-parse")) return `${commit}\n`;
    return "";
  };
  const result = (
    await scanHarnesses({
      root,
      harnessIds: ["example"],
      fetchImpl: fakeFetch(pkg.bytes, pkg.integrity),
      git,
    })
  )[0]!;
  expect(
    result.checks.find((item) => item.kind === "git_repository")
      ?.candidate_path,
  ).toBe(`archive/example/git/${commit}/checkout`);
  expect(await readFile(path.join(submodule, "marker"), "utf8")).toBe(
    "untouched",
  );
});

test("archived package evidence stays bound to its exact release", async () => {
  const root = await dataset();
  const pkg = await packageBytes(root);
  await scanHarnesses({
    root,
    harnessIds: ["example"],
    fetchImpl: fakeFetch(pkg.bytes, pkg.integrity),
  });
  const artifact = {
    schema_version: 1,
    record_kind: "production",
    kind: "archived_package_file",
    artifact_id: "artifact-example-new-package",
    source_id: "source-example-npm",
    harness_id: "example",
    package_name: "example-package",
    version: "2.0.0",
    integrity: pkg.integrity,
    tarball_path: "archive/example/npm/2.0.0/package.tgz",
    file: "package/index.js",
    content_sha256: createHash("sha256")
      .update("export const ready = true;\n")
      .digest("hex"),
  };
  await record(root, "knowledge/example/artifacts/package.yaml", artifact);
  const snapshot = {
    schema_version: 1,
    record_kind: "production",
    kind: "npm_release",
    snapshot_id: "snapshot-example-new-package",
    source_id: "source-example-npm",
    artifact_id: artifact.artifact_id,
    source_fetched_at: "2026-09-27T00:00:00.000Z",
    target: {
      harness_id: "example",
      surface: "cli",
      distribution: "npm:example-package:linux-x64-glibc",
      os: "linux",
      arch: "x64",
      execution_mode: "native",
      version_identity: { kind: "release", value: "2.0.0" },
    },
    package_name: "example-package",
    version: "2.0.0",
    integrity: pkg.integrity,
  };
  await record(root, "knowledge/example/snapshots/package.yaml", snapshot);
  const valid = await loadAndValidateDataset({ root, profile: "production" });
  expect(valid.ok).toBe(true);
  if (valid.ok) await auditArtifacts(valid.dataset.artifacts, root);

  await record(root, "knowledge/example/snapshots/package.yaml", {
    ...snapshot,
    target: {
      ...snapshot.target,
      version_identity: { kind: "release", value: "3.0.0" },
    },
  });
  const invalid = await loadAndValidateDataset({ root, profile: "production" });
  expect(invalid.ok).toBe(false);
  if (!invalid.ok)
    expect(invalid.diagnostics.map((item) => item.code)).toContain(
      "TARGET_MISMATCH",
    );
});

test("clones a changed Git HEAD into archive without moving a pinned checkout", async () => {
  const root = await dataset(true);
  const pkg = await packageBytes(root);
  const upstream = path.join(root, "remote");
  await mkdir(upstream);
  await run("git", ["init", "-q", "-b", "main", upstream]);
  await writeFile(path.join(upstream, "README.md"), "fixed commit\n");
  await run("git", ["-C", upstream, "add", "README.md"]);
  await run("git", [
    "-C",
    upstream,
    "-c",
    "user.name=Fixture",
    "-c",
    "user.email=fixture@example.invalid",
    "commit",
    "-qm",
    "first",
  ]);
  const { stdout } = await run("git", ["-C", upstream, "rev-parse", "HEAD"]);
  const commit = stdout.trim();
  const pinned = path.join(root, "upstream", "example");
  await mkdir(pinned, { recursive: true });
  await writeFile(path.join(pinned, "marker"), "pinned");
  const git = async (args: string[]): Promise<string> => {
    const { stdout: output } = await run(
      "git",
      args.map((arg) =>
        arg === "https://example.org/repo.git" ? upstream : arg,
      ),
    );
    return output;
  };
  const audit = (
    await scanHarnesses({
      root,
      harnessIds: ["example"],
      fetchImpl: fakeFetch(pkg.bytes, pkg.integrity),
      git,
    })
  )[0]!;
  const check = audit.checks.find((item) => item.kind === "git_repository");
  expect(check?.status).toBe("changed");
  expect(check?.observed).toBe(commit);
  expect(
    await readFile(
      path.join(root, check!.candidate_path!, "README.md"),
      "utf8",
    ),
  ).toBe("fixed commit\n");
  expect(await readFile(path.join(pinned, "marker"), "utf8")).toBe("pinned");

  await writeFile(path.join(upstream, "README.md"), "next commit\n");
  await run("git", ["-C", upstream, "add", "README.md"]);
  await run("git", [
    "-C",
    upstream,
    "-c",
    "user.name=Fixture",
    "-c",
    "user.email=fixture@example.invalid",
    "commit",
    "-qm",
    "second",
  ]);
  const next = (
    await scanHarnesses({
      root,
      harnessIds: ["example"],
      fetchImpl: fakeFetch(pkg.bytes, pkg.integrity),
      git,
    })
  )[0]!;
  const changed = next.checks.find((item) => item.kind === "git_repository");
  expect(changed?.baseline).toBe(commit);
  expect(changed?.changed_paths).toContain("README.md");
  expect(await readFile(path.join(pinned, "marker"), "utf8")).toBe("pinned");
});
