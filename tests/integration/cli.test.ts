import { spawnSync } from "node:child_process";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/basic", import.meta.url),
);
const cli = fileURLToPath(new URL("../../src/cli/index.ts", import.meta.url));
const tsx = fileURLToPath(import.meta.resolve("tsx/cli"));
let root: string;

function ahw(...args: string[]) {
  return spawnSync(process.execPath, [tsx, cli, ...args], {
    encoding: "utf8",
    timeout: 30000,
  });
}

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-cli-"));
});
afterAll(async () => {
  if (root) await rm(root, { recursive: true, force: true });
});

test("CLI validates and compiles an explicit fixture release", () => {
  const validated = ahw(
    "validate",
    "--dataset-root",
    fixture,
    "--profile",
    "fixture",
  );
  expect(validated.status).toBe(0);
  expect(JSON.parse(validated.stdout).valid).toBe(true);
  const compiled = ahw(
    "compile",
    "--dataset-root",
    fixture,
    "--profile",
    "fixture",
    "--release-id",
    "cli-fixture",
    "--published-at",
    "2026-09-27T00:00:00Z",
    "--releases-root",
    root,
  );
  expect(compiled.status).toBe(0);
  expect(JSON.parse(compiled.stdout).release_id).toBe("cli-fixture");
});

test("all five query commands use one release and preserve uncertainty", () => {
  const base = [
    "query",
    "--release-id",
    "cli-fixture",
    "--releases-root",
    root,
    "--json",
  ];
  const list = JSON.parse(ahw(...base, "list").stdout);
  expect(list.items).toHaveLength(2);
  const capability = JSON.parse(
    ahw(
      ...base,
      "capability",
      "--harness",
      "demo-package-cli",
      "--surface",
      "cli",
      "--distribution",
      "demo-package",
      "--os",
      "windows",
      "--arch",
      "x64",
      "--execution-mode",
      "native",
      "--policy",
      "exact",
      "--version",
      "2.0.0",
      "--topic",
      "native_plugins",
    ).stdout,
  );
  expect(capability.status).toBe("not_verified");
  const request = {
    scope: {
      harness: "demo-package-cli",
      surface: "cli",
      distribution: "demo-package",
      os: "windows",
      arch: "x64",
      execution_mode: "native",
    },
    topic: "native_plugins",
    version: { policy: "exact", identity: { kind: "release", value: "2.0.0" } },
  };
  const compare = JSON.parse(
    ahw(
      ...base,
      "compare",
      "--requests",
      JSON.stringify([
        request,
        { ...request, version: { policy: "latest_verified" } },
      ]),
    ).stdout,
  );
  expect(
    compare.results.map((item: { status: string }) => item.status),
  ).toContain("not_verified");
  const search = JSON.parse(ahw(...base, "search", "--text", "技能").stdout);
  expect(search.items[0]?.claim.topic).toBe("skills");
  const evidence = JSON.parse(
    ahw(...base, "evidence", "--evidence-id", "evidence-demo-package-plugin")
      .stdout,
  );
  expect(evidence.status).toBe("ok");
  for (const result of [list, capability, compare, search, evidence])
    expect(result.release_id).toBe("cli-fixture");
});

test("invalid CLI inputs exit nonzero without success output", async () => {
  const dataset = path.join(root, "broken-dataset");
  await cp(fixture, dataset, { recursive: true });
  const claim = path.join(
    dataset,
    "knowledge/demo-open-cli/claims/claim-demo-open-skills.yaml",
  );
  await writeFile(
    claim,
    (await readFile(claim, "utf8")).replace(
      "evidence-demo-open-skills",
      "evidence-missing",
    ),
  );
  const broken = ahw(
    "validate",
    "--dataset-root",
    dataset,
    "--profile",
    "fixture",
  );
  expect(broken.status).not.toBe(0);
  expect(broken.stdout).toBe("");
  expect(broken.stderr).toContain("EVIDENCE_MISSING");
  const badProfile = ahw(
    "validate",
    "--dataset-root",
    fixture,
    "--profile",
    "other",
  );
  expect(badProfile.status).not.toBe(0);
  expect(badProfile.stdout).toBe("");
  const badTarget = ahw(
    "query",
    "--release-id",
    "cli-fixture",
    "--releases-root",
    root,
    "capability",
    "--harness",
    "demo-package-cli",
    "--surface",
    "cli",
    "--distribution",
    "demo-package",
    "--os",
    "invalid",
    "--arch",
    "x64",
    "--execution-mode",
    "native",
    "--policy",
    "exact",
    "--version",
    "2.0.0",
  );
  expect(badTarget.status).not.toBe(0);
  expect(badTarget.stdout).toBe("");
  expect(badTarget.stderr).toContain("Invalid option");
  const conflictingVersion = ahw(
    "query",
    "--release-id",
    "cli-fixture",
    "--releases-root",
    root,
    "capability",
    "--harness",
    "demo-package-cli",
    "--surface",
    "cli",
    "--distribution",
    "demo-package",
    "--os",
    "windows",
    "--arch",
    "x64",
    "--execution-mode",
    "native",
    "--policy",
    "latest_verified",
    "--version",
    "2.0.0",
  );
  expect(conflictingVersion.status).not.toBe(0);
  expect(conflictingVersion.stdout).toBe("");
});
