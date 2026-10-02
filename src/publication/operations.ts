import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import * as z from "zod";
import {
  buildOnlineSite,
  assembleOnlineDeployment,
  verifyOnlineDeployment,
} from "../compiler/online-site.js";
import { packArchive, extractArchive } from "./archive.js";
import {
  PublicationGithub,
  PublicationError,
  type LedgerSnapshot,
} from "./github.js";
import {
  reserveRelease,
  protectedReleases,
  assertNoPendingPublication,
  beginDeployment,
  completeDeployment,
  markUncertain,
  abortDeployment,
} from "./state.js";
import { readPublishedPointer, verifyPublishedSite } from "./readback.js";
import { OnlineError } from "../query/online-error.js";

const planSchema = z.strictObject({
  schema_version: z.literal(1),
  target: z.string().regex(/^web-v1-[a-f0-9]{40}$/),
  commit: z.string().regex(/^[a-f0-9]{40}$/),
  execution_commit: z.string().regex(/^[a-f0-9]{40}$/),
  recovery: z.boolean(),
  run_id: z.string().min(1),
  output: z.string().min(1),
  data_url: z.url(),
  prepared_state_sha: z.string().regex(/^[a-f0-9]{40}$/),
});
export type PublicationPlan = z.infer<typeof planSchema>;

/** Only the deploy controller invokes mutations; this is never consumer code. */
export async function preparePublication(options: {
  github: PublicationGithub;
  commit: string;
  executionCommit: string;
  runId: string;
  root: string;
  base: string;
  workDir: string;
  dataUrl: string;
  recoveryTarget?: string;
  now?: string;
}): Promise<PublicationPlan> {
  const { github } = options;
  let snapshot = await github.readState();
  assertNoPendingPublication(snapshot.state);
  if (snapshot.state.active_protocol !== 1)
    throw new PublicationError(
      "unsupported_protocol",
      "This builder publishes v1 only.",
    );
  const now = options.now ?? new Date().toISOString();
  const target = options.recoveryTarget ?? `web-v1-${options.commit}`;
  if (options.recoveryTarget) {
    if (!snapshot.state.releases[target]?.verified_at)
      throw new PublicationError(
        "invalid_recovery",
        "Recovery requires an independently verified saved release.",
      );
  } else {
    reserveRelease(snapshot.state, options.commit, now);
    snapshot = await github.writeState(snapshot, `Reserve ${target}`);
  }
  const workDir = path.resolve(options.workDir);
  await mkdir(workDir, { recursive: true });
  const session = await mkdtemp(path.join(workDir, "attempt-"));
  const release = snapshot.state.releases[target]!;
  const candidateDir = await savedArchive(
    github,
    release.archive_tag,
    session,
    release.published_at,
    async (outDir) => {
      if (options.recoveryTarget)
        throw new PublicationError(
          "archive_missing",
          "Recovery archive is unavailable; it must not be rebuilt.",
        );
      await buildOnlineSite({
        datasetRoot: options.root,
        profile: "production",
        commit: release.commit,
        publishedAt: release.published_at,
        base: options.base,
        outDir,
      });
    },
    release.commit,
  );
  await assertArtifact(candidateDir, target, release.published_at);
  const retainedDirs: string[] = [];
  for (const id of protectedReleases(snapshot.state, now)) {
    if (id === target) continue;
    const previous = snapshot.state.releases[id]!;
    const directory = await mkdtemp(path.join(session, "retained-"));
    const artifact = await savedArchive(
      github,
      previous.archive_tag,
      directory,
      previous.published_at,
    );
    await assertArtifact(artifact, id, previous.published_at);
    retainedDirs.push(artifact);
  }
  const pointers: Record<string, unknown> = {};
  for (const [version, protocol] of Object.entries(snapshot.state.protocols)) {
    if (protocol.state === "retired")
      pointers[`data/v${version}/current.json`] = {
        protocol_version: Number(version),
        state: "retired",
        retired_at: protocol.retire_at,
        upgrade: protocol.upgrade,
      };
    else if (version !== "1" && protocol.current)
      pointers[`data/v${version}/current.json`] = {
        protocol_version: Number(version),
        state: "active",
        release_id: protocol.current,
        manifest: `releases/${protocol.current}/manifest.json`,
      };
  }
  const output = path.join(session, "deployment");
  await assembleOnlineDeployment({
    candidateDir,
    retainedDirs,
    outDir: output,
    pointers,
  });
  const plan = planSchema.parse({
    schema_version: 1,
    target,
    commit: release.commit,
    execution_commit: options.executionCommit,
    recovery: Boolean(options.recoveryTarget),
    run_id: options.runId,
    output,
    data_url: options.dataUrl,
    prepared_state_sha: snapshot.sha,
  });
  await writeFile(
    path.join(workDir, "plan.json"),
    `${JSON.stringify(plan, null, 2)}\n`,
  );
  return plan;
}

async function assertArtifact(
  directory: string,
  id: string,
  publishedAt: string,
): Promise<void> {
  const verified = await verifyOnlineDeployment(directory);
  const record = z
    .object({ knowledge_published_at: z.string() })
    .parse(
      JSON.parse(
        await readFile(path.join(directory, "integrity.json"), "utf8"),
      ),
    );
  if (
    verified.releaseId !== id ||
    record.knowledge_published_at !== publishedAt
  )
    throw new PublicationError(
      "archive_identity",
      "Saved archive differs from its reserved release identity or time.",
    );
  const manifest = z
    .object({ profile: z.literal("production") })
    .safeParse(
      JSON.parse(
        await readFile(
          path.join(directory, `data/v1/releases/${id}/manifest.json`),
          "utf8",
        ),
      ),
    );
  if (!manifest.success)
    throw new PublicationError(
      "archive_profile",
      "Publication archives must contain production knowledge.",
    );
}

async function savedArchive(
  github: PublicationGithub,
  tag: string,
  workDir: string,
  publishedAt: string,
  build?: (directory: string) => Promise<void>,
  commit?: string,
): Promise<string> {
  const archiveFile = path.join(workDir, "site.tar.gz");
  const output = path.join(workDir, "artifact");
  let release = await github.archive(tag);
  if (release && release.tag_name !== tag)
    throw new PublicationError(
      "archive_identity",
      "Saved Release tag differs from the requested archive.",
    );
  if (release && !release.draft && !release.immutable)
    throw new PublicationError(
      "immutable_archive",
      "Saved archive is not immutable.",
    );
  if (release?.assets.some((entry) => entry.name === "site.tar.gz")) {
    await github.downloadArchive(release, archiveFile);
    await extractArchive(archiveFile, output);
    await assertArtifact(output, tag, publishedAt);
    if (release.draft) await github.publishArchive(release);
    return output;
  }
  if (!build || !commit)
    throw new PublicationError(
      "archive_missing",
      `Protected archive ${tag} is missing.`,
    );
  await build(output);
  await assertArtifact(output, tag, publishedAt);
  await packArchive(output, archiveFile);
  release ??= await github.createArchive(tag, commit);
  await github.uploadArchive(release, await readFile(archiveFile));
  release = await github.archiveById(release.id);
  // Verify the uploaded bytes before sealing the draft, not just the local file.
  const remoteFile = path.join(workDir, "uploaded.tar.gz");
  await github.downloadArchive(release, remoteFile);
  if (
    !Buffer.from(await readFile(archiveFile)).equals(await readFile(remoteFile))
  )
    throw new PublicationError(
      "archive_incomplete",
      "Uploaded archive differs from the validated candidate.",
    );
  await github.publishArchive(release);
  return output;
}

export async function loadPublicationPlan(
  file: string,
): Promise<PublicationPlan> {
  return planSchema.parse(JSON.parse(await readFile(file, "utf8")));
}

export async function beginPublication(
  github: PublicationGithub,
  plan: PublicationPlan,
): Promise<boolean> {
  if (!plan.recovery && (await github.mainHead()) !== plan.commit) return false;
  const snapshot = await github.readState();
  assertNoPendingPublication(snapshot.state);
  if (snapshot.sha !== plan.prepared_state_sha)
    throw new PublicationError(
      "state_conflict",
      "State changed after deployment assembly; prepare again.",
    );
  await verifyOnlineDeployment(plan.output);
  if (!plan.recovery && (await github.mainHead()) !== plan.commit) return false;
  beginDeployment(
    snapshot.state,
    plan.target,
    plan.run_id,
    new Date().toISOString(),
    null,
    plan.execution_commit,
  );
  await github.writeState(
    snapshot,
    `Begin deployment ${plan.run_id} to ${plan.target}`,
  );
  return true;
}

export async function finishPublication(
  github: PublicationGithub,
  plan: PublicationPlan,
  actionSucceeded: boolean,
): Promise<void> {
  const snapshot = await github.readState();
  if (!snapshot.state.pending || snapshot.state.pending.run_id !== plan.run_id)
    throw new PublicationError(
      "state_conflict",
      "No matching pending deployment.",
    );
  let deploymentId: string | null = null;
  try {
    deploymentId = await github.environmentDeployment(plan.execution_commit);
  } catch {
    /* Public readback can confirm a target; missing platform state remains unresolved. */
  }
  snapshot.state.pending.deployment_id = deploymentId;
  let readbackError: unknown;
  let verified = false;
  try {
    if (
      !actionSucceeded ||
      !deploymentId ||
      (await github.pagesDeployment(plan.execution_commit)) !== "succeed"
    )
      throw new PublicationError(
        "deployment_uncertain",
        "Pages action and platform deployment did not confirm success.",
      );
    const report = await verifyPublishedSite({
      dataUrl: plan.data_url,
      expectedReleaseId: plan.target,
    });
    await writeFile(
      path.join(path.dirname(plan.output), "readback.json"),
      `${JSON.stringify(report, null, 2)}\n`,
    );
    if (report.result !== "passed")
      throw new PublicationError(
        "readback_failed",
        `Public verification failed: ${report.failures.join(", ")}.`,
      );
    verified = true;
  } catch (error) {
    readbackError = error;
  }
  if (verified) {
    completeDeployment(snapshot.state, {
      runId: plan.run_id,
      deploymentId,
      at: new Date().toISOString(),
      verified: true,
    });
  } else {
    // A confirmed target with failed representative queries is deployed but not usable.
    // A missing/old pointer cannot prove a rollback or an exit timestamp.
    let confirmed = false;
    if (actionSucceeded && deploymentId) {
      try {
        const pointer = await readPublishedPointer({ dataUrl: plan.data_url });
        confirmed =
          pointer.state === "active" && pointer.release_id === plan.target;
      } catch {
        /* Preserve unresolved intent. */
      }
    }
    if (confirmed && snapshot.state.pending)
      completeDeployment(snapshot.state, {
        runId: plan.run_id,
        deploymentId,
        at: new Date().toISOString(),
        verified: false,
      });
    else if (snapshot.state.pending)
      markUncertain(
        snapshot.state,
        plan.run_id,
        "Deployment or public readback could not be confirmed.",
      );
  }
  // Persist once: a failed CAS must not retry mutations using its stale SHA.
  await github.writeState(
    snapshot,
    `${verified ? "Verified" : "Failed"} public deployment ${plan.target}`,
  );
  if (!verified) throw readbackError;
}

export async function reconcilePublication(
  github: PublicationGithub,
  options: { dataUrl: string; deploymentId: string; abort?: boolean },
): Promise<LedgerSnapshot> {
  const snapshot = await github.readState();
  const pending = snapshot.state.pending;
  if (!pending) return snapshot;
  await github.assertEnvironmentDeployment(
    options.deploymentId,
    pending.execution_commit ?? snapshot.state.releases[pending.target]!.commit,
  );
  const status = await github.environmentDeploymentStatus(options.deploymentId);
  const pointer = await readPublishedPointer({
    dataUrl: options.dataUrl,
  }).catch((error: unknown) => {
    if (
      options.abort &&
      pending.previous === null &&
      error instanceof OnlineError &&
      error.httpStatus === 404
    )
      return null;
    throw error;
  });
  if (options.abort) {
    if (
      !["failure", "error", "inactive"].includes(status) ||
      (pending.previous === null
        ? pointer !== null
        : pointer?.state !== "active" ||
          pointer.release_id !== pending.previous)
    )
      throw new PublicationError(
        "deployment_uncertain",
        "Abort requires a terminal failed deployment and the unchanged public predecessor.",
      );
    abortDeployment(snapshot.state, pending.run_id);
  } else {
    if (
      status !== "success" ||
      pointer?.state !== "active" ||
      pointer.release_id !== pending.target
    )
      throw new PublicationError(
        "deployment_uncertain",
        "Deployment status and public target do not agree with pending intent.",
      );
    const report = await verifyPublishedSite({
      dataUrl: options.dataUrl,
      expectedReleaseId: pending.target,
    });
    if (report.result !== "passed")
      throw new PublicationError(
        "readback_failed",
        `Public verification failed: ${report.failures.join(", ")}.`,
      );
    completeDeployment(snapshot.state, {
      runId: pending.run_id,
      deploymentId: options.deploymentId,
      at: new Date().toISOString(),
      verified: true,
    });
  }
  return github.writeState(snapshot, `Reconcile deployment ${pending.run_id}`);
}
