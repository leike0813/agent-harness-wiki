import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, expect, test } from "vitest";
import { type UpstreamAudit } from "../../src/domain/schema.js";
import { MonitorState, monitorWeek } from "../../src/sources/monitor-state.js";
import { precheckMonitorRun } from "../../src/sources/monitor-run.js";
import {
  startMonitorSession,
  finishMonitorSession,
} from "../../src/sources/monitor-session.js";

const exec = promisify(execFile);
const roots: string[] = [];
const opened: MonitorState[] = [];
const sunday = new Date("2026-10-24T18:10:00Z");
afterEach(async () => {
  for (const state of opened.splice(0)) state.close();
  for (const root of roots.splice(0))
    await rm(root, { recursive: true, force: true });
});

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-monitor-progress-"));
  roots.push(root);
  const state = await MonitorState.open(root);
  opened.push(state);
  return { root, state };
}

function audit(
  id: string,
  observed: string,
  baseline = "a",
  time = "2026-10-23T00:00:00Z",
): UpstreamAudit {
  return {
    schema_version: 2,
    audit_id: `audit-${id}-${randomUUID()}`,
    harness_id: id,
    checked_at: time,
    status: observed === baseline ? "no_change" : "changed",
    review_status: "pending",
    reviewed_by: "fixture-author",
    reviewed_at: time,
    pending_audit_refs: [],
    impacts: [],
    pending_question_ids: [],
    investigation_notes: [],
    checks: [
      {
        source_id: `source-${id}`,
        kind: "official_documentation",
        checked_at: time,
        status: observed === baseline ? "unchanged" : "changed",
        baseline,
        observed,
      },
    ],
  };
}

test("observations accumulate from the processed baseline; a late manual result preserves newer work", async () => {
  const { state } = await fixture();
  const b = audit("demo-product", "b");
  state.observe([b]);
  const c = audit("demo-product", "c", "b", "2026-10-24T00:00:00Z");
  state.observe([c]);
  expect(state.queue()[0]?.checks[0]).toMatchObject({
    baseline: "a",
    observed: "c",
  });
  state.record(
    {
      harness_id: b.harness_id,
      audit_id: b.audit_id,
      outcome: "completed",
      reason: "Manually checked the scoped change.",
    },
    b,
  );
  expect(state.queue()[0]?.checks[0]).toMatchObject({
    baseline: "b",
    observed: "c",
  });
  state.record(
    {
      harness_id: c.harness_id,
      audit_id: c.audit_id,
      outcome: "completed",
      reason: "Latest change integrated.",
    },
    c,
  );
  expect(state.queue()).toEqual([]);
});

test("historical pending remains parked and an updated reviewed audit can close work", async () => {
  const { state } = await fixture();
  const old = audit("demo-product", "b");
  old.pending_question_ids = ["config.sources"];
  state.importAudits([old]);
  expect(state.queue()).toEqual([]);
  const current = audit("demo-product", "c", "b", "2026-10-24T00:00:00Z");
  state.observe([current]);
  expect(state.queue()).toHaveLength(1);
  state.importAudits([
    {
      ...current,
      review_status: "reviewed",
      reviewed_by: "fixture",
      reviewed_at: "2026-10-24T01:00:00Z",
    },
  ]);
  expect(state.queue()).toEqual([]);
  expect(old.pending_question_ids).toEqual(["config.sources"]);
});

test.each(["blocked", "failed", "waiting_for_integration"] as const)(
  "same input is not redispatched after %s",
  async (outcome) => {
    const { state } = await fixture();
    const input = audit("demo-product", "b");
    state.observe([input]);
    const task = state.claim(sunday, randomUUID())[0]!;
    state.record(
      {
        task_id: task.task_id,
        harness_id: task.harness_id,
        audit_id: input.audit_id,
        outcome,
        reason: "Requires new evidence or explicit integration.",
      },
      input,
    );
    state.observe([audit("demo-product", "b", "b", "2026-10-25T00:00:00Z")]);
    expect(state.claim(new Date("2026-10-31T18:10:00Z"), randomUUID())).toEqual(
      [],
    );
    state.observe([audit("demo-product", "c", "b", "2026-10-31T00:00:00Z")]);
    expect(state.queue()[0]?.checks[0]).toMatchObject({
      baseline: "a",
      observed: "c",
    });
  },
);

test("five product slots survive new connections, repeated starts and a failed week", async () => {
  const { root, state } = await fixture();
  for (let i = 0; i < 7; i++) state.observe([audit(`demo-${i}`, "b")]);
  const session = randomUUID();
  const first = state.claim(sunday, session);
  expect(first.map((task) => task.harness_id)).toEqual([
    "demo-0",
    "demo-1",
    "demo-2",
    "demo-3",
    "demo-4",
  ]);
  expect(state.claim(sunday, session).map((task) => task.task_id)).toEqual(
    first.map((task) => task.task_id),
  );
  const second = await MonitorState.open(root);
  opened.push(second);
  expect(second.claim(sunday, randomUUID())).toEqual([]);
  expect(second.preview(sunday)).toMatchObject({
    used: 5,
    remaining: 0,
    queued: 2,
  });
  expect(
    second
      .claim(new Date("2026-10-31T18:10:00Z"), randomUUID())
      .map((task) => task.harness_id),
  ).toEqual(["demo-5", "demo-6"]);
});

test("source failures retain progress, source reverts cancel queued work, normal npm advances do not queue", async () => {
  const { state } = await fixture();
  const input = audit("demo-product", "b");
  state.observe([input]);
  state.observe([
    {
      ...input,
      audit_id: `audit-${randomUUID()}`,
      checked_at: "2026-10-24T00:00:00Z",
      status: "blocked",
      checks: [
        {
          source_id: "source-demo-product",
          kind: "official_documentation",
          status: "blocked",
          checked_at: "2026-10-24T00:00:00Z",
          baseline: "b",
          error: "503",
        },
      ],
    },
  ]);
  expect(state.baselines().get("source-demo-product")).toBe("b");
  expect(state.queue()).toEqual([]);
  state.observe([audit("demo-product", "a", "b", "2026-10-25T00:00:00Z")]);
  expect(state.queue()).toEqual([]);
  const npm = audit("demo-npm", "1.1.0@sha512-new", "1.0.0@sha512-old");
  npm.checks[0]!.kind = "npm_registry";
  state.observe([npm]);
  expect(state.queue()).toEqual([]);
  state.observe([
    {
      ...npm,
      audit_id: `audit-${randomUUID()}`,
      checks: [
        {
          ...npm.checks[0]!,
          observed: "1.1.0@sha512-other",
          checked_at: "2026-10-25T00:00:00Z",
        },
      ],
    },
  ]);
  expect(state.queue()[0]?.harness_id).toBe("demo-npm");
});

test("task results are bound to frozen inputs and waiting integration can finish once", async () => {
  const { state } = await fixture();
  const input = audit("demo-product", "b");
  state.observe([input]);
  const session = randomUUID();
  const task = state.claim(sunday, session)[0]!;
  const result = {
    task_id: task.task_id,
    harness_id: task.harness_id,
    audit_id: input.audit_id,
    outcome: "waiting_for_integration" as const,
    reason: "Candidate ready.",
  };
  expect(() => state.record(result, audit("demo-product", "c"))).toThrow();
  expect(() => state.assertSettled(session)).toThrow();
  state.record(result, input);
  state.assertSettled(session);
  state.record({ ...result, outcome: "completed" }, input);
  expect(state.queue()).toEqual([]);
  expect(() => state.record({ ...result, outcome: "failed" }, input)).toThrow();
});

test("processed inputs never repeat after an identity oscillation and invalid completion cannot advance progress", async () => {
  const { state } = await fixture();
  const b = audit("demo-product", "b");
  state.observe([b]);
  const task = state.claim(sunday, randomUUID())[0]!;
  const result = {
    task_id: task.task_id,
    harness_id: task.harness_id,
    audit_id: b.audit_id,
    outcome: "completed" as const,
    reason: "Reviewed.",
  };
  expect(() =>
    state.record(result, {
      ...b,
      reviewed_by: undefined,
      reviewed_at: undefined,
    } as unknown as UpstreamAudit),
  ).toThrow();
  state.record({ ...result, outcome: "failed" }, b);
  state.observe([audit("demo-product", "c", "b", "2026-10-26T00:00:00Z")]);
  state.claim(new Date("2026-10-31T18:10:00Z"), randomUUID());
  state.observe([audit("demo-product", "b", "c", "2026-11-02T00:00:00Z")]);
  expect(state.queue()).toEqual([]);
});

test.each([
  ["2026-10-24T17:59:59Z", false, "2026-10-18"],
  ["2026-10-24T18:00:00Z", true, "2026-10-25"],
  ["2026-10-24T18:59:59Z", true, "2026-10-25"],
  ["2026-10-24T19:00:00Z", false, "2026-10-25"],
])("Shanghai weekly gate at %s", (time, due, week) => {
  expect(monitorWeek(new Date(String(time)))).toEqual({ due, week });
});

async function git(root: string, ...args: string[]) {
  return (
    await exec("git", ["-c", "core.hooksPath=/dev/null", "-C", root, ...args], {
      env: {
        ...process.env,
        GIT_CONFIG_GLOBAL: "/dev/null",
        GIT_CONFIG_NOSYSTEM: "1",
      },
    })
  ).stdout.trim();
}

test("linked worktrees share progress and session exclusion; precheck does not change branches or user files", async () => {
  const { root } = await fixture();
  await git(root, "init", "--quiet");
  await git(
    root,
    "-c",
    "user.name=Fixture",
    "-c",
    "user.email=fixture@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--allow-empty",
    "--quiet",
    "-m",
    "fixture",
  );
  const linked = path.join(root, "linked");
  await git(root, "worktree", "add", "--detach", "--quiet", linked);
  const first = await MonitorState.open(root);
  opened.push(first);
  const second = await MonitorState.open(linked);
  opened.push(second);
  const b = audit("demo-product", "b");
  first.observe([b]);
  expect(second.queue()).toHaveLength(1);
  const session = await startMonitorSession(root, process.pid);
  try {
    await expect(startMonitorSession(linked, process.pid)).rejects.toThrow(
      /active/,
    );
  } finally {
    await finishMonitorSession(root, session.id);
  }
  await writeFile(path.join(linked, "user.txt"), "keep");
  const head = await git(linked, "rev-parse", "HEAD");
  const result = await precheckMonitorRun({
    root: linked,
    date: new Date("2026-10-25T18:10:00Z"),
    observe: async () => [{ ...b, requires_triage: true }],
  });
  expect(result).toMatchObject({
    launch: false,
    status: "observed",
    queued: 1,
  });
  expect(await git(linked, "rev-parse", "HEAD")).toBe(head);
  expect(await readFile(path.join(linked, "user.txt"), "utf8")).toBe("keep");
  const ready = await precheckMonitorRun({
    root: linked,
    date: sunday,
    observe: async () => [{ ...b, requires_triage: true }],
  });
  expect(ready).toMatchObject({
    launch: false,
    status: "delivery_blocked",
    products: ["demo-product"],
  });
  await rm(path.join(linked, "user.txt"));
  const clean = await precheckMonitorRun({
    root: linked,
    date: sunday,
    observe: async () => [{ ...b, requires_triage: true }],
  });
  expect(clean).toMatchObject({ launch: true, products: ["demo-product"] });
});
