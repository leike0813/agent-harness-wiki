import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { afterEach, expect, test } from "vitest";
import {
  prepareMaintenanceCandidates,
  checkMaintenanceCandidate,
  planMaintenanceCandidates,
} from "../../src/sources/maintenance-candidates.js";
import { catalogSchema } from "../../src/domain/catalog.js";
import { chapterSelectionSchema } from "../../src/domain/chapter.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);
const ids = ["demo-open-cli", "demo-package-cli"];
const roots: string[] = [];
async function setup() {
  const temporary = await mkdtemp(path.join(tmpdir(), "ahw-maintenance-test-"));
  roots.push(temporary);
  const root = path.join(temporary, "project");
  await cp(fixture, root, { recursive: true });
  const prepared = await prepareMaintenanceCandidates({
    root,
    out: path.join(temporary, "batch"),
    products: ids,
    profile: "fixture",
  });
  return { ...prepared, root, temporary };
}
afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});
async function change(root: string, id: string) {
  const catalogFile = path.join(root, "catalog/harnesses.yaml");
  const catalog = catalogSchema.parse(
    YAML.parse(await readFile(catalogFile, "utf8")),
  );
  catalog.products.find((x) => x.harness_id === id)!.name += " reviewed";
  await writeFile(catalogFile, YAML.stringify(catalog));
  const from = `${id}-skills-v1`,
    to = `${id}-skills-v2`;
  const chapter = await readFile(
    path.join(root, `knowledge/${id}/chapters/${from}.md`),
    "utf8",
  );
  await writeFile(
    path.join(root, `knowledge/${id}/chapters/${to}.md`),
    chapter.replaceAll(from, to),
  );
  const selectionFile = path.join(root, "registry/chapter-current.yaml");
  const selection = chapterSelectionSchema.parse(
    YAML.parse(await readFile(selectionFile, "utf8")),
  );
  selection.selections.find(
    (x) => x.harness_id === id && x.topic === "skills",
  )!.edition_id = to;
  await writeFile(selectionFile, YAML.stringify(selection));
}

test("independent candidates merge catalog and selections while preserving other products and the project", async () => {
  const state = await setup();
  const original = await readFile(
    path.join(state.root, "catalog/harnesses.yaml"),
    "utf8",
  );
  await Promise.all(
    state.candidates.map(async (candidate) => {
      await change(candidate.root, candidate.harness_id);
      await checkMaintenanceCandidate(candidate.root);
    }),
  );
  // An unrelated, simultaneous catalogue edit must survive integration.
  const live = catalogSchema.parse(YAML.parse(original));
  live.products.find((x) => x.harness_id === "demo-candidate")!.name +=
    " user edit";
  await writeFile(
    path.join(state.root, "catalog/harnesses.yaml"),
    YAML.stringify(live),
  );
  const plan = await planMaintenanceCandidates({
    batch: state.batch,
    out: path.join(state.temporary, "merged"),
  });
  expect(plan.accepted).toEqual(ids);
  expect(plan.rejected).toEqual([]);
  const catalog = catalogSchema.parse(
    YAML.parse(
      await readFile(path.join(plan.root, "catalog/harnesses.yaml"), "utf8"),
    ),
  );
  expect(
    catalog.products
      .filter((x) => ids.includes(x.harness_id))
      .every((x) => x.name.endsWith("reviewed")),
  ).toBe(true);
  expect(
    catalog.products.find((x) => x.harness_id === "demo-candidate")!.name,
  ).toContain("user edit");
  const selections = chapterSelectionSchema.parse(
    YAML.parse(
      await readFile(
        path.join(plan.root, "registry/chapter-current.yaml"),
        "utf8",
      ),
    ),
  );
  expect(
    selections.selections
      .filter((x) => x.topic === "skills")
      .map((x) => x.edition_id),
  ).toEqual(ids.map((id) => `${id}-skills-v2`));
  expect(
    selections.selections
      .filter((x) => x.topic === "mcp")
      .map((x) => x.edition_id),
  ).toEqual(ids.map((id) => `${id}-mcp-v1`));
  expect(
    await readFile(path.join(state.root, "catalog/harnesses.yaml"), "utf8"),
  ).toBe(YAML.stringify(live));
  expect(
    plan.changes.some(
      (x) => x.path === "registry/chapter-current.yaml" && x.before !== null,
    ),
  ).toBe(true);
});

test("half-written candidate cannot disrupt a different product or become integrated", async () => {
  const state = await setup();
  const broken = state.candidates[0]!;
  await writeFile(
    path.join(broken.root, "catalog/harnesses.yaml"),
    "products: [",
  );
  await change(state.candidates[1]!.root, ids[1]!);
  const checks = await Promise.allSettled(
    state.candidates.map((x) => checkMaintenanceCandidate(x.root)),
  );
  expect(checks.map((x) => x.status)).toEqual(["rejected", "fulfilled"]);
  const plan = await planMaintenanceCandidates({
    batch: state.batch,
    out: path.join(state.temporary, "merged"),
  });
  expect(plan.accepted).toEqual([ids[1]]);
  expect(plan.rejected.map((x) => x.harness_id)).toEqual([ids[0]]);
  expect(
    plan.changes.every((x) => !x.path.startsWith(`knowledge/${ids[0]}/`)),
  ).toBe(true);
});

test("no-op candidates produce no shared-file rewrites", async () => {
  const state = await setup();
  const plan = await planMaintenanceCandidates({
    batch: state.batch,
    out: path.join(state.temporary, "merged"),
  });
  expect(plan.accepted).toEqual(ids);
  expect(plan.changes).toEqual([]);
});

test("changed product baseline is rejected while another product can finish", async () => {
  const state = await setup();
  await change(state.root, ids[0]!);
  await change(state.candidates[1]!.root, ids[1]!);
  const plan = await planMaintenanceCandidates({
    batch: state.batch,
    out: path.join(state.temporary, "merged"),
  });
  expect(plan.accepted).toEqual([ids[1]]);
  expect(plan.rejected[0]).toMatchObject({ harness_id: ids[0] });
  const selections = chapterSelectionSchema.parse(
    YAML.parse(
      await readFile(
        path.join(plan.root, "registry/chapter-current.yaml"),
        "utf8",
      ),
    ),
  );
  expect(
    selections.selections.find(
      (x) => x.harness_id === ids[0] && x.topic === "skills",
    )!.edition_id,
  ).toBe(`${ids[0]}-skills-v2`);
});

test.each(["directory", "record", "symlink", "audit"])(
  "rejects out-of-scope or invalid %s in candidate",
  async (kind) => {
    const state = await setup();
    const candidate = state.candidates[0]!;
    if (kind === "directory") await mkdir(path.join(candidate.root, "unowned"));
    if (kind === "record") {
      const sourceDir = path.join(state.root, "registry/sources");
      const { readdir } = await import("node:fs/promises");
      for (const file of await readdir(sourceDir)) {
        const text = await readFile(path.join(sourceDir, file), "utf8");
        if (
          (YAML.parse(text) as { harness_id: string }).harness_id === ids[1]
        ) {
          await writeFile(
            path.join(candidate.root, "registry/sources/foreign.yaml"),
            text,
          );
          break;
        }
      }
    }
    if (kind === "symlink")
      await symlink(
        state.root,
        path.join(candidate.root, "knowledge/foreign"),
        "dir",
      );
    if (kind === "audit") {
      const directory = path.join(
        candidate.root,
        `audits/${candidate.harness_id}`,
      );
      await mkdir(directory, { recursive: true });
      await writeFile(
        path.join(directory, "audit-demo.yaml"),
        YAML.stringify({
          schema_version: 2,
          audit_id: "audit-demo",
          harness_id: candidate.harness_id,
          checked_at: "2026-10-04T00:00:00Z",
          status: "no_change",
          review_status: "reviewed",
          checks: [],
          impacts: [],
          pending_audit_refs: [],
          pending_question_ids: [],
          investigation_notes: [],
        }),
      );
    }
    await expect(checkMaintenanceCandidate(candidate.root)).rejects.toThrow();
  },
);

test("cross-product record ID collision rejects only the conflicting candidate", async () => {
  const state = await setup();
  const open = state.candidates[0]!.root;
  const foreignId = "ref-demo-package-npm";
  const originalRef = path.join(
    open,
    "knowledge/demo-open-cli/references/ref-demo-open.yaml",
  );
  const raw = YAML.parse(await readFile(originalRef, "utf8")) as {
    reference_id: string;
  };
  raw.reference_id = foreignId;
  await writeFile(
    path.join(open, "knowledge/demo-open-cli/references/extra.yaml"),
    YAML.stringify(raw),
  );
  await checkMaintenanceCandidate(open);
  await change(state.candidates[1]!.root, ids[1]!);
  const plan = await planMaintenanceCandidates({
    batch: state.batch,
    out: path.join(state.temporary, "merged"),
  });
  expect(plan.accepted).toEqual([ids[1]]);
  expect(plan.rejected[0]).toMatchObject({ harness_id: ids[0] });
  expect(plan.rejected[0]!.reason).toContain(foreignId);
});

test("duplicate tasks and outputs inside tracked datasets are rejected", async () => {
  const state = await setup();
  await expect(
    prepareMaintenanceCandidates({
      root: state.root,
      out: path.join(state.temporary, "duplicate"),
      products: [ids[0]!, ids[0]!],
      profile: "fixture",
    }),
  ).rejects.toThrow();
  await expect(
    prepareMaintenanceCandidates({
      root: state.root,
      out: path.join(state.root, "knowledge/task"),
      products: [ids[0]!],
      profile: "fixture",
    }),
  ).rejects.toThrow();
  await expect(
    planMaintenanceCandidates({ batch: state.batch, out: state.root }),
  ).rejects.toThrow();
});
