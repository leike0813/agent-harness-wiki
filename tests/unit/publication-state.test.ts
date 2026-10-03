import { expect, test } from "vitest";
import {
  PROTOCOL_FREEZE_MS,
  abortDeployment,
  assertNoPendingPublication,
  beginDeployment,
  completeDeployment,
  freezeProtocol,
  initialState,
  markUncertain,
  onlineReleases,
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
  expect(() => onlineReleases(state, b)).toThrow(/reconcile/);
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
  expect(onlineReleases(state, idOf("a"))).toEqual([idOf("a")]);
  expect(() => abortDeployment(state, "run-2")).toThrow(/no pending run/);

  const moved = deployedSingle();
  const c = reserveRelease(moved, sha("c"), plus(DAY)).archive_tag;
  beginDeployment(moved, c, "run-3", plus(DAY));
  moved.protocols["1"]!.current = c;
  expect(() => abortDeployment(moved, "run-3")).toThrow(/reconcile/);
  expect(moved.pending).not.toBeNull();
});

test("online rotations retain only the target and preceding verified current", () => {
  const state = initialState();
  let previous: string | null = null;
  for (const [index, char] of ["a", "b", "c", "d"].entries()) {
    const at = plus(index * DAY);
    const target = reserveRelease(state, sha(char), at).archive_tag;
    const before = structuredClone(state);
    expect(onlineReleases(state, target)).toEqual(
      [target, ...(previous === null ? [] : [previous])].sort(),
    );
    expect(state).toEqual(before);
    deploy(state, target, `run-${index}`, at, true);
    expect(state.protocols["1"]).toMatchObject({
      current: target,
      recovery: previous,
    });
    expect(onlineReleases(state, target)).toEqual(
      [target, ...(previous === null ? [] : [previous])].sort(),
    );
    previous = target;
  }
  expect(Object.keys(state.releases)).toHaveLength(4);
  expect(state.transitions).toHaveLength(4);
  expect(state.releases[idOf("a")]!.exited_current_at).toBe(plus(DAY));
});

test.each([
  ["new target after an unverified current", "d", "b"],
  ["recover to the verified recovery", "b", null],
  ["recover to an excluded verified archive", "a", "b"],
])("online selection: %s", (_name, targetChar, recoveryChar) => {
  const state = deployedSingle();
  for (const [index, char] of ["b", "c"].entries()) {
    const at = plus((index + 1) * DAY);
    deploy(
      state,
      reserveRelease(state, sha(char), at).archive_tag,
      `run-${char}`,
      at,
      char === "b",
    );
  }
  const target = reserveRelease(
    state,
    sha(targetChar),
    plus(3 * DAY),
  ).archive_tag;
  const recovery = recoveryChar === null ? null : idOf(recoveryChar);
  const selected = onlineReleases(state, target);
  expect(selected).toEqual(
    [target, ...(recovery === null ? [] : [recovery])].sort(),
  );
  expect(selected).not.toContain(idOf("c"));
  deploy(state, target, "run-recovery", plus(3 * DAY), true);
  expect(state.protocols["1"]).toMatchObject({ current: target, recovery });
  expect(onlineReleases(state, target)).toEqual(selected);
  expect(state.releases[idOf("a")]!.verified_at).not.toBeNull();
  expect(state.releases[idOf("c")]!.exited_current_at).toBe(plus(3 * DAY));
  expect(publicationStateSchema.safeParse(state).success).toBe(true);
});

test("an excluded verified archive can replace a verified current", () => {
  const state = deployedSingle();
  for (const char of ["b", "c"]) {
    deploy(
      state,
      reserveRelease(state, sha(char), T0).archive_tag,
      char,
      T0,
      true,
    );
  }
  const target = idOf("a");
  expect(onlineReleases(state, target)).toEqual([target, idOf("c")]);
  deploy(state, target, "recover-a", plus(4 * DAY), true);
  expect(state.protocols["1"]).toMatchObject({
    current: target,
    recovery: idOf("c"),
  });
  expect(state.releases[target]!.exited_current_at).toBeNull();
  expect(Object.keys(state.releases)).toHaveLength(3);
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

test("retirement releases online pointers at the announced date and preserves archives", () => {
  const state = deployedSingle();
  deploy(
    state,
    reserveRelease(state, sha("b"), T0).archive_tag,
    "run-b",
    T0,
    true,
  );
  freezeProtocol(state, 1, T0, plus(PROTOCOL_FREEZE_MS), "Upgrade to v2");
  const next = reserveRelease(state, sha("c"), plus(DAY)).archive_tag;
  expect(onlineReleases(state, next)).toEqual([idOf("a"), idOf("b"), next]);
  expect(() => retireProtocol(state, 1, plus(PROTOCOL_FREEZE_MS - 1))).toThrow(
    /announced/,
  );

  const history = structuredClone(state.releases);
  retireProtocol(state, 1, plus(PROTOCOL_FREEZE_MS));
  expect(onlineReleases(state, next)).toEqual([next]);
  expect(state.releases).toEqual(history);
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
