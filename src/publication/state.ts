import * as z from "zod";

/** Minimum announced window between a protocol freeze and its retirement. */
export const PROTOCOL_FREEZE_MS = 90 * 24 * 60 * 60 * 1000;

const commit = z.string().regex(/^[a-f0-9]{40}$/);
const datetime = z.iso.datetime();
const protocolId = z.string().regex(/^[1-9]\d*$/);
/** `web-v<N>-<sha>`; vN only exists for protocol-policy tests. */
export const releaseIdSchema = z
  .string()
  .regex(/^web-v([1-9]\d*)-[a-f0-9]{40}$/);

const releaseRecordSchema = z.strictObject({
  commit,
  protocol_version: z.number().int().positive(),
  published_at: datetime,
  archive_tag: z.string().min(1),
  verified_at: datetime.nullable(),
  exited_current_at: datetime.nullable(),
});

const protocolRecordSchema = z.strictObject({
  state: z.enum(["active", "frozen", "retired"]),
  current: releaseIdSchema.nullable(),
  recovery: releaseIdSchema.nullable(),
  frozen_at: datetime.nullable(),
  retire_at: datetime.nullable(),
  upgrade: z.string().min(1).nullable(),
});

const pendingDeploymentSchema = z.strictObject({
  run_id: z.string().min(1),
  target: releaseIdSchema,
  previous: releaseIdSchema.nullable(),
  started_at: datetime,
  deployment_id: z.string().min(1).nullable(),
  execution_commit: commit.nullable(),
  status: z.enum(["deploying", "deployed", "uncertain"]),
  reason: z.string().min(1).nullable(),
});

const transitionRecordSchema = z.strictObject({
  run_id: z.string().min(1),
  from: releaseIdSchema.nullable(),
  to: releaseIdSchema,
  at: datetime,
  deployment_id: z.string().min(1).nullable(),
  verified: z.boolean(),
});

const npmCandidateSchema = z.strictObject({
  commit,
  integrity: z.string().min(1),
  status: z.enum(["prepared", "next", "verified", "promoted", "failed"]),
  verified_release_id: releaseIdSchema.nullable(),
  updated_at: datetime,
});

const npmStateSchema = z.strictObject({
  latest: z.string().min(1).nullable(),
  candidates: z.record(z.string(), npmCandidateSchema),
});

/**
 * Durable publication ledger. One JSON authority for fixed release
 * reservations, per-protocol lifecycle pointers, deployment intent and
 * program candidates; cross references are checked here so every reader
 * shares one source of truth.
 */
export const publicationStateSchema = z
  .strictObject({
    schema_version: z.literal(1),
    active_protocol: z.number().int().positive(),
    protocols: z.record(protocolId, protocolRecordSchema),
    releases: z.record(releaseIdSchema, releaseRecordSchema),
    pending: pendingDeploymentSchema.nullable(),
    transitions: z.array(transitionRecordSchema),
    npm: npmStateSchema,
  })
  .superRefine((state, ctx) => {
    const fail = (message: string, path: (string | number)[] = []) =>
      ctx.addIssue({ code: "custom", message, path });
    const known = (id: string) => state.releases[id] !== undefined;

    const active = state.protocols[String(state.active_protocol)];
    if (!active) fail("active_protocol has no record.", ["active_protocol"]);
    else if (active.state !== "active")
      fail("active_protocol must be active.", ["active_protocol"]);
    const actives = Object.values(state.protocols).filter(
      (protocol) => protocol.state === "active",
    );
    if (actives.length !== 1)
      fail("Exactly one protocol may be active.", ["protocols"]);

    for (const [id, release] of Object.entries(state.releases)) {
      const version = Number(/^web-v([1-9]\d*)-/.exec(id)?.[1]);
      if (version !== release.protocol_version)
        fail("Release id must carry its own protocol_version.", [
          "releases",
          id,
        ]);
      if (
        id !== `web-v${release.protocol_version}-${release.commit}` ||
        release.archive_tag !== id
      )
        fail("Release commit and archive must match its identity.", [
          "releases",
          id,
        ]);
      if (!state.protocols[String(release.protocol_version)])
        fail("Release protocol has no record.", [
          "releases",
          id,
          "protocol_version",
        ]);
    }

    for (const [key, protocol] of Object.entries(state.protocols)) {
      for (const field of ["current", "recovery"] as const) {
        const id = protocol[field];
        if (id !== null && state.releases[id]?.protocol_version !== Number(key))
          fail(`${field} must reference a release of this protocol.`, [
            "protocols",
            key,
            field,
          ]);
      }
      const frozen = protocol.frozen_at !== null;
      if (
        protocol.recovery !== null &&
        state.releases[protocol.recovery]?.verified_at == null
      )
        fail("Recovery must reference an independently verified release.", [
          "protocols",
          key,
          "recovery",
        ]);
      if (
        protocol.state === "active" &&
        (frozen || protocol.retire_at !== null || protocol.upgrade !== null)
      )
        fail("Active protocol carries no freeze fields.", ["protocols", key]);
      if (
        protocol.state === "frozen" &&
        (!frozen || protocol.retire_at === null || protocol.upgrade === null)
      )
        fail("Frozen protocol requires frozen_at, retire_at and upgrade.", [
          "protocols",
          key,
        ]);
      if (protocol.state === "retired") {
        if (protocol.upgrade === null)
          fail("Retired protocol preserves upgrade guidance.", [
            "protocols",
            key,
          ]);
        if (protocol.current !== null || protocol.recovery !== null)
          fail("Retired protocol releases current and recovery.", [
            "protocols",
            key,
          ]);
      }
      if (
        protocol.frozen_at !== null &&
        protocol.retire_at !== null &&
        Date.parse(protocol.retire_at) - Date.parse(protocol.frozen_at) <
          PROTOCOL_FREEZE_MS
      )
        fail("Protocol announcement must last at least 90 days.", [
          "protocols",
          key,
          "retire_at",
        ]);
    }

    if (state.pending !== null) {
      if (!known(state.pending.target))
        fail("Pending target is not a known release.", ["pending", "target"]);
      if (state.pending.previous !== null && !known(state.pending.previous))
        fail("Pending previous is not a known release.", [
          "pending",
          "previous",
        ]);
    }

    for (const [index, transition] of state.transitions.entries()) {
      if (!known(transition.to))
        fail("Transition target is not a known release.", [
          "transitions",
          index,
          "to",
        ]);
      if (transition.from !== null && !known(transition.from))
        fail("Transition source is not a known release.", [
          "transitions",
          index,
          "from",
        ]);
    }

    for (const [version, candidate] of Object.entries(state.npm.candidates)) {
      if (
        candidate.verified_release_id !== null &&
        !known(candidate.verified_release_id)
      )
        fail("npm candidate references an unknown release.", [
          "npm",
          "candidates",
          version,
        ]);
    }
  });

export type PublicationState = z.infer<typeof publicationStateSchema>;
export type ReleaseRecord = z.infer<typeof releaseRecordSchema>;
export type PendingDeployment = z.infer<typeof pendingDeploymentSchema>;

export function initialState(): PublicationState {
  return {
    schema_version: 1,
    active_protocol: 1,
    protocols: {
      "1": {
        state: "active",
        current: null,
        recovery: null,
        frozen_at: null,
        retire_at: null,
        upgrade: null,
      },
    },
    releases: {},
    pending: null,
    transitions: [],
    npm: { latest: null, candidates: {} },
  };
}

const msBetween = (from: string, to: string) =>
  Date.parse(to) - Date.parse(from);

/**
 * Reserve the immutable identity of a candidate under the active protocol.
 * Re-reserving keeps the original publication time and archive identity, so a
 * retry reuses the same release instead of inventing a new one.
 */
export function reserveRelease(
  state: PublicationState,
  sha: string,
  now: string,
): ReleaseRecord {
  if (!/^[a-f0-9]{40}$/.test(sha))
    throw new Error(
      `reserveRelease: commit must be 40 hex characters, got "${sha}".`,
    );
  const id = `web-v${state.active_protocol}-${sha}`;
  const existing = state.releases[id];
  if (existing) return existing;
  const release: ReleaseRecord = {
    commit: sha,
    protocol_version: state.active_protocol,
    published_at: now,
    archive_tag: id,
    verified_at: null,
    exited_current_at: null,
  };
  state.releases[id] = release;
  return release;
}

/**
 * Select only the current and verified recovery of each supported protocol
 * after the planned switch. Archives and ledger history are independent.
 */
export function onlineReleases(
  state: PublicationState,
  target: string,
): string[] {
  assertNoPendingPublication(state);
  const release = state.releases[target];
  if (!release)
    throw new Error(`onlineReleases: target ${target} is not reserved.`);
  const ids = new Set<string>();
  for (const [version, protocol] of Object.entries(state.protocols)) {
    if (protocol.state === "retired") continue;
    const switching = Number(version) === release.protocol_version;
    const current = switching ? target : protocol.current;
    const recovery = switching
      ? recoveryAfterSwitch(state, protocol, target)
      : protocol.recovery;
    if (current !== null) ids.add(current);
    if (recovery !== null) ids.add(recovery);
  }
  return [...ids].sort();
}

function recoveryAfterSwitch(
  state: PublicationState,
  protocol: PublicationState["protocols"][string],
  target: string,
): string | null {
  const previous = protocol.current;
  if (
    previous !== null &&
    previous !== target &&
    state.releases[previous]?.verified_at != null
  )
    return previous;
  return protocol.recovery === target ? null : protocol.recovery;
}

/** Stop a normal plan while any deployment is in flight or unresolved. */
export function assertNoPendingPublication(state: PublicationState): void {
  if (state.pending === null) return;
  const { run_id, target, status } = state.pending;
  throw new Error(
    `assertNoPendingPublication: run "${run_id}" is ${status} for ${target}; reconcile before publishing.`,
  );
}

/**
 * Record deployment intent before any pointer moves. Main checks the latest
 * main head separately; here the target must be reserved, and a recovery of a
 * previously live release must already be independently verified.
 */
export function beginDeployment(
  state: PublicationState,
  target: string,
  runId: string,
  now: string,
  deploymentId: string | null = null,
  executionCommit: string | null = null,
): void {
  if (state.pending !== null)
    throw new Error(
      `beginDeployment: run "${state.pending.run_id}" is ${state.pending.status} for ${state.pending.target}; reconcile first.`,
    );
  const release = state.releases[target];
  if (!release)
    throw new Error(
      `beginDeployment: target ${target} is not a reserved release.`,
    );
  const protocol = state.protocols[String(release.protocol_version)];
  if (!protocol)
    throw new Error(
      `beginDeployment: release ${target} has no protocol record.`,
    );
  if (release.exited_current_at !== null && release.verified_at === null)
    throw new Error(
      `beginDeployment: recovery target ${target} is not verified.`,
    );
  state.pending = {
    run_id: runId,
    target,
    previous: protocol.current,
    started_at: now,
    deployment_id: deploymentId,
    execution_commit: executionCommit,
    status: "deploying",
    reason: null,
  };
}

/**
 * Record a confirmed deployment. The previous current only exits when the
 * pointer actually moves; `verified_at` is written only for a full readback,
 * and a known-valid recovery candidate is never replaced by an unverified one.
 */
export function completeDeployment(
  state: PublicationState,
  outcome: {
    runId: string;
    deploymentId: string | null;
    at: string;
    verified: boolean;
  },
): void {
  const pending = state.pending;
  if (!pending || pending.run_id !== outcome.runId)
    throw new Error(`completeDeployment: no pending run "${outcome.runId}".`);
  if (
    pending.deployment_id !== null &&
    pending.deployment_id !== outcome.deploymentId
  )
    throw new Error(
      `completeDeployment: deployment id changed for run "${outcome.runId}".`,
    );
  const release = state.releases[pending.target];
  if (!release)
    throw new Error(
      `completeDeployment: target ${pending.target} is not a reserved release.`,
    );
  const protocol = state.protocols[String(release.protocol_version)];
  if (!protocol)
    throw new Error(
      `completeDeployment: release ${pending.target} has no protocol record.`,
    );
  if (pending.previous !== protocol.current)
    throw new Error(
      `completeDeployment: current moved under run "${outcome.runId}"; reconcile first.`,
    );

  const previous = pending.previous;
  const recovery = recoveryAfterSwitch(state, protocol, pending.target);
  if (previous !== null && previous !== pending.target) {
    const exited = state.releases[previous];
    if (exited) exited.exited_current_at = outcome.at;
  }
  release.exited_current_at = null;
  protocol.current = pending.target;
  if (outcome.verified) release.verified_at = outcome.at;

  protocol.recovery = recovery;

  state.pending = null;
  state.transitions.push({
    run_id: outcome.runId,
    from: previous,
    to: pending.target,
    at: outcome.at,
    deployment_id: outcome.deploymentId,
    verified: outcome.verified,
  });
}

/**
 * Mark an interrupted run unresolved without inventing a timestamp. The next
 * publication must reconcile before retention can be evaluated.
 */
export function markUncertain(
  state: PublicationState,
  runId: string,
  reason: string | null = null,
): void {
  const pending = state.pending;
  if (!pending || pending.run_id !== runId)
    throw new Error(`markUncertain: no pending run "${runId}".`);
  pending.status = "uncertain";
  if (reason !== null) pending.reason = reason;
}

/**
 * Clear deployment intent after the caller has proven the public pointer never
 * moved and the deployment failed terminally. No transition is recorded
 * because no switch happened; only explicit reconciliation may use this.
 */
export function abortDeployment(state: PublicationState, runId: string): void {
  const pending = state.pending;
  if (!pending || pending.run_id !== runId)
    throw new Error(`abortDeployment: no pending run "${runId}".`);
  const release = state.releases[pending.target];
  const protocol =
    release === undefined
      ? undefined
      : state.protocols[String(release.protocol_version)];
  if (protocol !== undefined && protocol.current !== pending.previous)
    throw new Error(
      `abortDeployment: the pointer moved past run "${runId}"; reconcile instead of aborting.`,
    );
  state.pending = null;
}

/**
 * Freeze the active protocol at its verified current release, announce an
 * upgrade at least 90 days out, and start the next major protocol.
 */
export function freezeProtocol(
  state: PublicationState,
  version: number,
  now: string,
  retireAt: string,
  upgrade: string,
): void {
  assertNoPendingPublication(state);
  const key = String(version);
  const protocol = state.protocols[key];
  if (!protocol)
    throw new Error(`freezeProtocol: protocol ${key} is not registered.`);
  if (protocol.state !== "active")
    throw new Error(
      `freezeProtocol: protocol ${key} is already ${protocol.state}.`,
    );
  if (state.active_protocol !== version)
    throw new Error(
      `freezeProtocol: protocol ${key} is not the active protocol.`,
    );
  if (protocol.current === null)
    throw new Error(`freezeProtocol: protocol ${key} has no current release.`);
  if (state.releases[protocol.current]?.verified_at == null)
    throw new Error(
      `freezeProtocol: protocol ${key}'s current release is not verified.`,
    );
  if (upgrade.trim() === "")
    throw new Error("freezeProtocol: upgrade guidance is required.");
  if (msBetween(now, retireAt) < PROTOCOL_FREEZE_MS)
    throw new Error(
      `freezeProtocol: retire_at must be at least 90 days after ${now}.`,
    );
  const next = String(version + 1);
  if (state.protocols[next])
    throw new Error(`freezeProtocol: protocol ${next} already exists.`);
  protocol.state = "frozen";
  protocol.frozen_at = now;
  protocol.retire_at = retireAt;
  protocol.upgrade = upgrade;
  state.protocols[next] = {
    state: "active",
    current: null,
    recovery: null,
    frozen_at: null,
    retire_at: null,
    upgrade: null,
  };
  state.active_protocol = version + 1;
}

/**
 * Retire a frozen protocol at its announced date, releasing its online
 * current/recovery while keeping the upgrade entry, archives and history.
 */
export function retireProtocol(
  state: PublicationState,
  version: number,
  now: string,
): void {
  assertNoPendingPublication(state);
  const key = String(version);
  const protocol = state.protocols[key];
  if (!protocol)
    throw new Error(`retireProtocol: protocol ${key} is not registered.`);
  if (protocol.state !== "frozen")
    throw new Error(`retireProtocol: protocol ${key} is not frozen.`);
  if (protocol.retire_at === null)
    throw new Error(`retireProtocol: protocol ${key} has no announced date.`);
  if (Date.parse(now) < Date.parse(protocol.retire_at))
    throw new Error(
      `retireProtocol: protocol ${key} is announced for ${protocol.retire_at}.`,
    );
  protocol.current = null;
  protocol.recovery = null;
  protocol.state = "retired";
}
