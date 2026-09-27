import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";
import { compileRelease } from "../../src/compiler/release.js";
import { queryResultSchema } from "../../src/domain/schema.js";
import { QueryService } from "../../src/query/service.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/basic", import.meta.url),
);
const packageScope = {
  harness: "虚构插件命令行",
  surface: "cli",
  distribution: "demo-package",
  os: "windows",
  arch: "x64",
  execution_mode: "native",
};
const openScope = {
  harness: "demo-open-cli",
  surface: "cli",
  distribution: "demo-package",
  os: "linux",
  arch: "x64",
  execution_mode: "native",
};
const exact = (value: string) => ({
  policy: "exact",
  identity: { kind: "release", value },
});
let root: string;
let service: QueryService;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-query-"));
  await compileRelease({
    datasetRoot: fixture,
    profile: "fixture",
    releaseId: "query-fixture",
    publishedAt: "2026-09-27T00:00:00Z",
    releasesRoot: root,
  });
  service = await QueryService.open({
    releasesRoot: root,
    releaseId: "query-fixture",
  });
});
afterAll(async () => {
  service?.close();
  if (root) await rm(root, { recursive: true, force: true });
});

test("release is fixed and fixture selection must be explicit", async () => {
  await expect(QueryService.open({ releasesRoot: root })).rejects.toThrow(
    /Fixture release/,
  );
  await expect(
    QueryService.open({ releasesRoot: root, releaseId: "../unsafe" }),
  ).rejects.toThrow();
  await writeFile(
    path.join(root, "current.json"),
    '{"release_id":"different"}',
  );
  expect(service.listHarnesses().release_id).toBe("query-fixture");
  expect(service.listHarnesses().items).toHaveLength(2);
});

test("exact, upstream and verified versions remain separate", () => {
  const request = { scope: packageScope, topic: "native_plugins" };
  const newer = service.getCapability({ ...request, version: exact("2.0.0") });
  expect(queryResultSchema.parse(newer).status).toBe("not_verified");
  expect(newer.status).toBe("not_verified");
  expect(newer.target?.version_identity.value).toBe("2.0.0");
  expect(newer.coverage[0]?.status).toBe("not_started");
  expect(newer.facts).toHaveLength(0);
  const upstream = service.getCapability({
    ...request,
    version: { policy: "latest_upstream" },
  });
  expect(upstream.status).toBe("not_verified");
  expect(upstream.target?.version_identity.value).toBe("2.0.0");
  expect(upstream.source_observed_at).toBe("2026-02-01T00:00:00Z");
  const verified = service.getCapability({
    ...request,
    version: { policy: "latest_verified" },
    conditions: [
      { type: "extension_installed", id: "sample-extension", equals: true },
    ],
  });
  expect(verified.target?.version_identity.value).toBe("1.4.2");
  expect(
    verified.facts.some(
      (item) => item.claim.support.delivery === "external_extension",
    ),
  ).toBe(true);
  expect(
    service.getCapability({ ...request, version: exact("3.0.0") }).facts,
  ).toHaveLength(0);
  expect(
    service.getCapability({
      ...request,
      scope: { ...packageScope, os: "linux" },
      version: exact("1.4.2"),
    }).facts,
  ).toHaveLength(0);
  expect(
    service.getCapability({
      ...request,
      fact_key: "plugins.uninvestigated",
      version: exact("1.4.2"),
    }).status,
  ).toBe("unknown");
});

test("missing conditions and comparisons retain Target-specific meaning", () => {
  const skills = service.getCapability({
    scope: openScope,
    topic: "skills",
    version: exact("1.4.2"),
  });
  expect(skills.status).toBe("ambiguous");
  expect(skills.facts[0]?.claim.conditions.all_of).toHaveLength(2);
  const resolved = service.getCapability({
    scope: openScope,
    topic: "skills",
    version: exact("1.4.2"),
    conditions: [
      { type: "workspace_trust", equals: "trusted" },
      {
        type: "environment_variable",
        name: "DEMO_SKILLS_DIR",
        operator: "unset",
      },
    ],
  });
  expect(resolved.status).toBe("ok");
  const compared = service.compareCapabilities({
    requests: [
      {
        scope: packageScope,
        topic: "native_plugins",
        version: exact("1.4.2"),
        conditions: [
          { type: "extension_installed", id: "sample-extension", equals: true },
        ],
      },
      { scope: packageScope, topic: "native_plugins", version: exact("2.0.0") },
    ],
  });
  expect(compared.results.map((item) => item.status)).toEqual([
    "ok",
    "not_verified",
  ]);
  expect(
    compared.results[0]?.facts.some(
      (item) => item.claim.support.delivery === "external_extension",
    ),
  ).toBe(true);
  expect(compared.results[1]?.facts).toHaveLength(0);
  const evidence = service.getEvidence({
    evidence_id: "evidence-demo-package-plugin",
  });
  expect(evidence.status).toBe("ok");
  expect(evidence.evidence?.basis).toBe("source_inspected");
});

test("search uses aliases, exact keys, Chinese topics and bound cursors", () => {
  expect(
    service.searchKnowledge({ text: "虚构插件命令行" }).items[0]?.match,
  ).toBe("alias");
  expect(
    service.searchKnowledge({ text: "skills.discovery.project_path" }).items[0]
      ?.match,
  ).toBe("exact");
  expect(
    service
      .searchKnowledge({ text: "技能" })
      .items.every((item) => item.claim.topic === "skills"),
  ).toBe(true);
  expect(() => service.searchKnowledge({ text: 'skills" OR *' })).not.toThrow();
  const first = service.searchKnowledge({ text: "demo-open-cli", limit: 1 });
  expect(first.next_cursor).toBeTruthy();
  expect(
    service.searchKnowledge({
      text: "demo-open-cli",
      limit: 1,
      cursor: first.next_cursor,
    }).items[0]?.claim.claim_id,
  ).not.toBe(first.items[0]?.claim.claim_id);
  expect(() =>
    service.searchKnowledge({
      text: "demo-package-cli",
      cursor: first.next_cursor,
    }),
  ).toThrow(/Cursor/);
  expect(() => service.listHarnesses({ limit: 101 })).toThrow();
});

test("disputed review is visible as conflict", async () => {
  const dataset = path.join(root, "disputed-dataset");
  await cp(fixture, dataset, { recursive: true });
  const file = path.join(
    dataset,
    "knowledge/demo-open-cli/assessments/assessment-demo-open-mcp.yaml",
  );
  await writeFile(
    file,
    (await readFile(file, "utf8")).replace(
      "status: accepted",
      "status: disputed",
    ),
  );
  const coverage = path.join(
    dataset,
    "knowledge/demo-open-cli/coverage/coverage-demo-open-cli-skills-1-4-2-linux.yaml",
  );
  await writeFile(
    coverage,
    (await readFile(coverage, "utf8")).replace(
      "status: complete",
      "status: partial",
    ),
  );
  const snapshot = path.join(
    dataset,
    "knowledge/demo-open-cli/snapshots/snapshot-demo-open-142-linux.yaml",
  );
  await writeFile(
    path.join(
      dataset,
      "knowledge/demo-open-cli/snapshots/snapshot-demo-open-commit-linux.yaml",
    ),
    (await readFile(snapshot, "utf8"))
      .replace(
        "snapshot-demo-open-142-linux",
        "snapshot-demo-open-commit-linux",
      )
      .replace("kind: release, value: 1.4.2", "kind: commit, value: demoabc"),
  );
  await compileRelease({
    datasetRoot: dataset,
    profile: "fixture",
    releaseId: "query-disputed",
    publishedAt: "2026-09-27T00:00:00Z",
    releasesRoot: root,
  });
  const disputed = await QueryService.open({
    releasesRoot: root,
    releaseId: "query-disputed",
  });
  try {
    const result = disputed.getCapability({
      scope: openScope,
      topic: "mcp",
      version: exact("1.4.2"),
    });
    expect(result.status).toBe("conflict");
    expect(result.facts[0]?.claim.evidence_refs.length).toBeGreaterThan(0);
    const partial = disputed.getCapability({
      scope: openScope,
      topic: "skills",
      version: exact("1.4.2"),
      conditions: [
        { type: "workspace_trust", equals: "trusted" },
        {
          type: "environment_variable",
          name: "DEMO_SKILLS_DIR",
          operator: "unset",
        },
      ],
    });
    expect(partial.status).toBe("partial");
    expect(
      disputed.getCapability({
        scope: openScope,
        version: { policy: "latest_upstream" },
      }).status,
    ).toBe("ambiguous");
    const cursor = service.searchKnowledge({
      text: "demo-open-cli",
      limit: 1,
    }).next_cursor;
    expect(() =>
      disputed.searchKnowledge({ text: "demo-open-cli", limit: 1, cursor }),
    ).toThrow(/Cursor/);
  } finally {
    disputed.close();
  }
});
