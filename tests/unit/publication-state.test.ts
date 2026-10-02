import { expect, test } from "vitest";
import {
  PROTOCOL_FREEZE_MS,
  RELEASE_RETENTION_MS,
  abortDeployment,
  assertNoPendingPublication,
  beginDeployment,
  completeDeployment,
  freezeProtocol,
  initialState,
  markUncertain,
  protectedReleases,
  publicationStateSchema,
  reserveRelease,
  retireProtocol,
  type PublicationState,
} from "../../src/publication/state.js";

const T0 = "2026-01-01T00:00:00.000Z";
const DAY = 24 * 60 * 60 * 1000;
const plus = (ms: number) => new Date(Date.parse(T0) + ms).toISOString();
const sha = (char: string) => char.repeat(40);
const idOf = (char: string) => `web-v1-${sha(char)}`;

function deploy(
  state: PublicationState,
  id: string,
  runId: string,
  at: string,
  verified: boolean,
) {
  beginDeployment(state, id, runId, at);
  completeDeployment(state, {
    runId,
    deploymentId: `${runId}-dep`,
    at,
    verified,
  });
}

function deployedSingle(): PublicationState {
  const state = initialState();
  deploy(
    state,
    reserveRelease(state, sha("a"), T0).archive_tag,
    "run-1",
    T0,
    true,
  );
  return state;
}

test("initial state is a valid strict ledger and rejects drift", () => {
  const state = initialState();
  expect(publicationStateSchema.safeParse(state).success).toBe(true);
  expect(
    publicationStateSchema.safeParse({ ...state, unexpected: true }).success,
  ).toBe(false);
  expect(
    publicationStateSchema.safeParse({
      ...state,
      protocols: {
        "1": { ...state.protocols["1"]!, state: "frozen" },
      },
    }).success,
  ).toBe(false);
});

test("reserved releases keep their identity and fixed publication time", () => {
  const state = initialState();
  const first = reserveRelease(state, sha("a"), T0);
  expect(first.archive_tag).toBe(idOf("a"));
  expect(first.published_at).toBe(T0);
  first.verified_at = plus(DAY);
  const retry = reserveRelease(state, sha("a"), plus(10 * DAY));
  expect(retry).toBe(first);
  expect(retry.published_at).toBe(T0);
  expect(retry.verified_at).toBe(plus(DAY));
  expect(() => reserveRelease(state, "short", T0)).toThrow(/40 hex/);
});

test("release ids carry the protocol that reserved them", () => {
  const state = initialState();
  deploy(
    state,
    reserveRelease(state, sha("a"), T0).archive_tag,
    "run-1",
    T0,
    true,
  );
  freezeProtocol(state, 1, T0, plus(PROTOCOL_FREEZE_MS), "Upgrade to v2");
  const v2 = reserveRelease(state, sha("b"), plus(DAY));
  expect(v2.archive_tag).toBe(`web-v2-${sha("b")}`);
  expect(v2.protocol_version).toBe(2);
  expect(publicationStateSchema.safeParse(state).success).toBe(true);
});

test("cross references must stay consistent with one active protocol", () => {
  const state = deployedSingle();
  const tampered = structuredClone(state);
  tampered.releases[idOf("a")]!.protocol_version = 2;
  expect(publicationStateSchema.safeParse(tampered).success).toBe(false);

  const foreign = structuredClone(state);
  foreign.protocols["1"]!.current = `web-v2-${sha("b")}`;
  expect(publicationStateSchema.safeParse(foreign).success).toBe(false);

  const twoActive = structuredClone(state);
  twoActive.protocols["2"] = structuredClone(twoActive.protocols["1"]!);
  expect(publicationStateSchema.safeParse(twoActive).success).toBe(false);
});

test("begin refuses a busy or unknown target and an unverified recovery", () => {
  const state = initialState();
  const a = reserveRelease(state, sha("a"), T0).archive_tag;
  beginDeployment(state, a, "run-1", T0);
  expect(() => beginDeployment(state, a, "run-2", T0)).toThrow(/reconcile/);

  const fresh = initialState();
  expect(() => beginDeployment(fresh, idOf("c"), "run-1", T0)).toThrow(
    /not a reserved release/,
  );

  const failed = initialState();
  const fb = reserveRelease(failed, sha("b"), T0).archive_tag;
  deploy(failed, fb, "run-1", T0, false);
  deploy(
    failed,
    reserveRelease(failed, sha("a"), T0).archive_tag,
    "run-2",
    T0,
    false,
  );
  expect(() => beginDeployment(failed, fb, "run-3", plus(DAY))).toThrow(
    /not verified/,
  );
});

test("completion moves the pointer and records only confirmed outcomes", () => {
  const state = initialState();
  const a = reserveRelease(state, sha("a"), T0).archive_tag;
  deploy(state, a, "run-1", T0, true);
  const b = reserveRelease(state, sha("b"), plus(DAY)).archive_tag;
  deploy(state, b, "run-2", plus(DAY), false);

  const protocol = state.protocols["1"]!;
  expect(protocol.current).toBe(b);
  expect(protocol.recovery).toBe(a);
  expect(state.releases[a]!.exited_current_at).toBe(plus(DAY));
  expect(state.releases[a]!.verified_at).toBe(T0);
  expect(state.releases[b]!.verified_at).toBeNull();
  expect(state.pending).toBeNull();
  expect(state.transitions).toEqual([
    expect.objectContaining({ from: null, to: a, verified: true }),
    expect.objectContaining({ from: a, to: b, verified: false, at: plus(DAY) }),
  ]);
  expect(publicationStateSchema.safeParse(state).success).toBe(true);
});

test("an unverified current is never promoted into the recovery slot", () => {
  const state = initialState();
  const a = reserveRelease(state, sha("a"), T0).archive_tag;
  deploy(state, a, "run-1", T0, true);
  const b = reserveRelease(state, sha("b"), plus(DAY)).archive_tag;
  deploy(state, b, "run-2", plus(DAY), true);
  const c = reserveRelease(state, sha("c"), plus(2 * DAY)).archive_tag;
  deploy(state, c, "run-3", plus(2 * DAY), false);
  expect(state.protocols["1"]!.current).toBe(c);
  expect(state.protocols["1"]!.recovery).toBe(b);
});

test("completion rejects a missing run or a lost change", () => {
  const state = initialState();
  const a = reserveRelease(state, sha("a"), T0).archive_tag;
  expect(() =>
    completeDeployment(state, {
      runId: "run-1",
      deploymentId: null,
      at: T0,
      verified: true,
    }),
  ).toThrow(/no pending run/);
  beginDeployment(state, a, "run-1", T0);
  expect(() =>
    completeDeployment(state, {
      runId: "other",
      deploymentId: null,
      at: T0,
      verified: true,
    }),
  ).toThrow(/no pending run/);
  state.protocols["1"]!.current = a;
  expect(() =>
    completeDeployment(state, {
      runId: "run-1",
      deploymentId: null,
      at: T0,
      verified: true,
    }),
  ).toThrow(/moved under run/);
});

test("uncertainty keeps the run and does not invent a timestamp", () => {
  const state = deployedSingle();
  const b = reserveRelease(state, sha("b"), plus(DAY)).archive_tag;
  beginDeployment(state, b, "run-2", plus(DAY));
  markUncertain(state, "run-2", "pages lag");
  expect(state.pending).toMatchObject({
    run_id: "run-2",
    target: b,
    previous: idOf("a"),
    started_at: plus(DAY),
    status: "uncertain",
    reason: "pages lag",
  });
  expect(state.transitions).toHaveLength(1);
  expect(protectedReleases(state, plus(2 * DAY))).toEqual([idOf("a"), b]);
  expect(() => markUncertain(state, "nope")).toThrow(/no pending run/);
  expect(publicationStateSchema.safeParse(state).success).toBe(true);
});

test("pending and uncertain state both stop a normal plan", () => {
  const state = initialState();
  expect(() => assertNoPendingPublication(state)).not.toThrow();
  const a = reserveRelease(state, sha("a"), T0).archive_tag;
  beginDeployment(state, a, "run-1", T0);
  expect(() => assertNoPendingPublication(state)).toThrow(/reconcile/);
  markUncertain(state, "run-1");
  expect(() => assertNoPendingPublication(state)).toThrow(/uncertain/);
});

test("abort clears intent only when no switch happened", () => {
  const state = deployedSingle();
  const b = reserveRelease(state, sha("b"), plus(DAY)).archive_tag;
  beginDeployment(state, b, "run-2", plus(DAY));
  markUncertain(state, "run-2", "deploy terminated");
  abortDeployment(state, "run-2");
  expect(state.pending).toBeNull();
  expect(state.transitions).toHaveLength(1);
  expect(state.protocols["1"]!.current).toBe(idOf("a"));
  expect(protectedReleases(state, plus(2 * DAY))).toEqual([idOf("a")]);
  expect(() => abortDeployment(state, "run-2")).toThrow(/no pending run/);

  const moved = deployedSingle();
  const c = reserveRelease(moved, sha("c"), plus(DAY)).archive_tag;
  beginDeployment(moved, c, "run-3", plus(DAY));
  moved.protocols["1"]!.current = c;
  expect(() => abortDeployment(moved, "run-3")).toThrow(/reconcile/);
  expect(moved.pending).not.toBeNull();
});

function exitedRelease() {
  const state = initialState();
  const a = reserveRelease(state, sha("a"), T0).archive_tag;
  deploy(state, a, "run-1", T0, true);
  const b = reserveRelease(state, sha("b"), T0).archive_tag;
  deploy(state, b, "run-2", T0, true);
  state.protocols["1"]!.recovery = null;
  return { state, exited: a, current: b };
}

test.each([
  ["inside the 30-day window", RELEASE_RETENTION_MS - 1, true],
  ["at the window close", RELEASE_RETENTION_MS, false],
])("retention boundary: %s keeps a confirmed exit", (_name, offset, kept) => {
  const { state, exited, current } = exitedRelease();
  const protectedIds = protectedReleases(state, plus(offset));
  expect(protectedIds.includes(exited)).toBe(kept);
  expect(protectedIds).toContain(current);
});

test("returning to current renews protection and a later exit restarts", () => {
  const { state, exited } = exitedRelease();
  beginDeployment(state, exited, "run-3", plus(5 * DAY));
  completeDeployment(state, {
    runId: "run-3",
    deploymentId: "run-3-dep",
    at: plus(5 * DAY),
    verified: true,
  });
  const protocol = state.protocols["1"]!;
  expect(state.releases[exited]!.exited_current_at).toBeNull();
  expect(protocol.current).toBe(exited);
  expect(protocol.recovery).toBe(idOf("b"));

  const later = reserveRelease(state, sha("c"), plus(20 * DAY)).archive_tag;
  deploy(state, later, "run-4", plus(20 * DAY), true);
  protocol.recovery = null;
  expect(state.releases[exited]!.exited_current_at).toBe(plus(20 * DAY));
  expect(
    protectedReleases(state, plus(20 * DAY + RELEASE_RETENTION_MS - 1)),
  ).toContain(exited);
  expect(
    protectedReleases(state, plus(20 * DAY + RELEASE_RETENTION_MS)),
  ).not.toContain(exited);
});

test("freeze needs a verified current and a 90-day notice", () => {
  const unverified = initialState();
  deploy(
    unverified,
    reserveRelease(unverified, sha("a"), T0).archive_tag,
    "run-1",
    T0,
    false,
  );
  expect(() =>
    freezeProtocol(
      unverified,
      1,
      T0,
      plus(PROTOCOL_FREEZE_MS),
      "Upgrade to v2",
    ),
  ).toThrow(/not verified/);

  expect(() =>
    freezeProtocol(
      deployedSingle(),
      1,
      T0,
      plus(PROTOCOL_FREEZE_MS - 1),
      "Upgrade to v2",
    ),
  ).toThrow(/90 days/);
  expect(() =>
    freezeProtocol(deployedSingle(), 9, T0, plus(PROTOCOL_FREEZE_MS), "x"),
  ).toThrow(/not registered/);
});

test("freeze at the boundary starts the next active protocol", () => {
  const state = deployedSingle();
  freezeProtocol(state, 1, T0, plus(PROTOCOL_FREEZE_MS), "Upgrade to v2");
  expect(state.active_protocol).toBe(2);
  expect(state.protocols["1"]).toMatchObject({
    state: "frozen",
    current: idOf("a"),
    frozen_at: T0,
    retire_at: plus(PROTOCOL_FREEZE_MS),
    upgrade: "Upgrade to v2",
  });
  expect(state.protocols["2"]).toMatchObject({
    state: "active",
    current: null,
  });
  expect(publicationStateSchema.safeParse(state).success).toBe(true);
});

test("retirement waits for the announced date and remaining windows", () => {
  const state = deployedSingle();
  freezeProtocol(state, 1, T0, plus(PROTOCOL_FREEZE_MS), "Upgrade to v2");
  expect(() => retireProtocol(state, 1, plus(PROTOCOL_FREEZE_MS - 1))).toThrow(
    /announced/,
  );

  const stillObliged = structuredClone(state);
  stillObliged.releases[idOf("a")]!.exited_current_at = plus(
    PROTOCOL_FREEZE_MS - DAY,
  );
  expect(() =>
    retireProtocol(stillObliged, 1, plus(PROTOCOL_FREEZE_MS)),
  ).toThrow(/retention window/);

  retireProtocol(state, 1, plus(PROTOCOL_FREEZE_MS));
  expect(state.protocols["1"]).toMatchObject({
    state: "retired",
    current: null,
    recovery: null,
    upgrade: "Upgrade to v2",
  });
  expect(state.protocols["1"]!.frozen_at).toBe(T0);
  expect(publicationStateSchema.safeParse(state).success).toBe(true);
  expect(() => retireProtocol(state, 1, plus(PROTOCOL_FREEZE_MS))).toThrow(
    /not frozen/,
  );
  expect(() => retireProtocol(deployedSingle(), 1, T0)).toThrow(/not frozen/);
});
