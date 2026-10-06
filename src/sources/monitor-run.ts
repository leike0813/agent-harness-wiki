import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { z } from "zod";
import {
  finishMonitorSession,
  startMonitorSession,
  type MonitorSession,
} from "./monitor-session.js";
import { checkHarnesses } from "./scan.js";

const exec = promisify(execFile);

export const MONITOR_BRANCH_PREFIX = "automation/harness-monitor/";

const pullSchema = z.strictObject({
  number: z.number().int().positive(),
  headRefName: z.string().min(1),
  url: z.string().min(1),
});
export type MonitorPull = z.infer<typeof pullSchema>;

export type GitRun = (args: string[]) => Promise<string>;

/** A precondition the coordinator cannot resolve on its own; reported, never worked around. */
export class MonitorRunBlockedError extends Error {}

export interface MonitorBranchDecisionInput {
  openPulls: MonitorPull[];
  currentBranch: string;
  /** The current branch tip is already an ancestor of origin/main, so its run was delivered. */
  currentBranchMerged: boolean;
  hasUnpushedCommits: boolean;
}

export type MonitorBranchDecision =
  | { action: "reuse"; branch: string; pr: MonitorPull; reason: string }
  | { action: "continue"; branch: string; reason: string }
  | { action: "create"; branch: string; reason: string }
  | { action: "blocked"; blocker: string };

/** UTC second precision, matching the rolling branch names already on the remote. */
function nextMonitorBranch(date: Date): string {
  return `${MONITOR_BRANCH_PREFIX}${date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d+Z$/, "Z")}`;
}

/**
 * The delivery rules of one monitor round, kept pure so the branch choice is
 * testable on its own: an open pull request is continued rather than forked,
 * a merged branch is never reused, and an undelivered branch is resumed
 * instead of being replaced by a second edition.
 */
export function decideMonitorBranch(
  input: MonitorBranchDecisionInput,
  nextBranch: string,
  nextBranchAvailable: boolean,
): MonitorBranchDecision {
  const monitorPulls = input.openPulls.filter((pull) =>
    pull.headRefName.startsWith(MONITOR_BRANCH_PREFIX),
  );
  if (monitorPulls.length > 1)
    return {
      action: "blocked",
      blocker: `Open monitor pull requests: ${monitorPulls.map((pull) => pull.headRefName).join(", ")}. Stop delivery and report instead of creating a forked pull request.`,
    };
  if (monitorPulls.length === 1) {
    const pr = monitorPulls[0]!;
    return {
      action: "reuse",
      branch: pr.headRefName,
      pr,
      reason:
        "An open monitor pull request exists; continue the rolling branch and update that pull request.",
    };
  }
  const undelivered =
    input.currentBranch.startsWith(MONITOR_BRANCH_PREFIX) &&
    !input.currentBranchMerged &&
    input.hasUnpushedCommits;
  if (undelivered)
    return {
      action: "continue",
      branch: input.currentBranch,
      reason:
        "The current monitor branch is not merged and still carries undelivered commits; resume it instead of opening a second edition.",
    };
  if (!nextBranchAvailable)
    return {
      action: "blocked",
      blocker: `Branch ${nextBranch} already exists. Retry to get a new timestamp.`,
    };
  return {
    action: "create",
    branch: nextBranch,
    reason:
      "No open monitor pull request and no undelivered branch; start a new rolling branch from origin/main.",
  };
}

export interface MonitorRunHandoff {
  worktree: string;
  branch: string;
  branchAction: MonitorBranchDecision["action"];
  branchReason: string;
  commitsAheadOfMain: number;
  pull?: MonitorPull;
  session: MonitorSession;
  checksPath: string;
  observation: {
    products: number;
    changed: number;
    blocked: number;
    /** Sources failed to check; the coordinator still triages every product it could observe. */
    degraded: boolean;
  };
  reportPath: string;
  skill: string;
  nextStep: string;
}

async function runGitCommand(args: string[]): Promise<string> {
  const { stdout } = await exec("git", args, {
    timeout: 600_000,
    maxBuffer: 16 * 1024 * 1024,
  });
  return stdout;
}

/**
 * The session lock lives under each project root, so the main working tree
 * carries a second, unrelated lock. A monitor run also commits and pushes, so
 * running there would pull the maintainer's uncommitted edits into the pull
 * request. A dedicated linked worktree removes both problems at once.
 */
async function assertDedicatedWorktree(
  root: string,
  git: GitRun,
): Promise<void> {
  const gitDir = (
    await git(["-C", root, "rev-parse", "--absolute-git-dir"])
  ).trim();
  const reported = (
    await git(["-C", root, "rev-parse", "--git-common-dir"])
  ).trim();
  const commonDir = path.isAbsolute(reported)
    ? reported
    : path.resolve(root, reported);
  if (gitDir === commonDir)
    throw new MonitorRunBlockedError(
      `Monitor runs require a dedicated linked worktree. ${root} is the main working tree, which keeps its own session lock and would carry uncommitted changes into the pull request. Start the agent session from the dedicated worktree instead.`,
    );
}

async function assertClean(root: string, git: GitRun): Promise<void> {
  const status = await git(["-C", root, "status", "--porcelain"]);
  if (status.trim())
    throw new MonitorRunBlockedError(
      "The worktree has uncommitted changes. Distinguish leftovers this run recorded from other edits before switching or merging; attribution is never guessed and unknown changes are never discarded.",
    );
}

async function openMonitorPulls(): Promise<MonitorPull[]> {
  let stdout: string;
  try {
    ({ stdout } = await exec(
      "gh",
      [
        "pr",
        "list",
        "--base",
        "main",
        "--state",
        "open",
        "--json",
        "number,headRefName,url",
      ],
      { timeout: 120_000, maxBuffer: 4 * 1024 * 1024 },
    ));
  } catch (error) {
    throw new MonitorRunBlockedError(
      `Open pull requests could not be read: ${error instanceof Error ? error.message : String(error)}. An unreadable pull request list is never treated as no open pull request.`,
    );
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    throw new MonitorRunBlockedError(
      "Open pull requests could not be read: the response was not complete JSON. An unreadable pull request list is never treated as no open pull request.",
    );
  }
  return z.array(pullSchema).parse(parsed);
}

async function isMergedIntoMain(root: string, git: GitRun): Promise<boolean> {
  try {
    await git(["-C", root, "rev-parse", "--verify", "origin/main"]);
  } catch {
    throw new MonitorRunBlockedError(
      "origin/main is unavailable after fetch; the branch decision needs it to tell a merged branch from an undelivered one.",
    );
  }
  try {
    await git([
      "-C",
      root,
      "merge-base",
      "--is-ancestor",
      "HEAD",
      "origin/main",
    ]);
    return true;
  } catch {
    return false;
  }
}

async function hasUnpushedCommits(root: string, git: GitRun): Promise<boolean> {
  let upstream: string;
  try {
    upstream = (
      await git([
        "-C",
        root,
        "rev-parse",
        "--abbrev-ref",
        "--symbolic-full-name",
        "@{u}",
      ])
    ).trim();
  } catch {
    // A branch that was never pushed has no upstream: all of its commits are
    // undelivered work.
    return true;
  }
  const count = Number(
    (
      await git(["-C", root, "rev-list", "--count", `${upstream}..HEAD`])
    ).trim(),
  );
  return Number.isFinite(count) && count > 0;
}

async function branchExists(
  root: string,
  branch: string,
  git: GitRun,
): Promise<boolean> {
  try {
    await git([
      "-C",
      root,
      "show-ref",
      "--verify",
      "--quiet",
      `refs/heads/${branch}`,
    ]);
    return true;
  } catch {
    /* Not a local branch. */
  }
  try {
    await git([
      "-C",
      root,
      "ls-remote",
      "--exit-code",
      "--heads",
      "origin",
      branch,
    ]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Deterministic preflight for one monitor round: the dedicated worktree,
 * an up-to-date origin, the rolling branch decision, the session lock and a
 * single observation written to disk. The semantic triage stays with the
 * coordinator, which continues from the returned handoff.
 */
export async function startMonitorRun(input: {
  root: string;
  ownerPid: number;
  date?: Date;
  git?: GitRun;
}): Promise<MonitorRunHandoff> {
  const root = path.resolve(input.root);
  const git = input.git ?? runGitCommand;
  const date = input.date ?? new Date();
  const nextBranch = nextMonitorBranch(date);

  await assertDedicatedWorktree(root, git);
  await assertClean(root, git);
  // Fetch before deciding: a stale origin/main makes a merged branch look like
  // undelivered work, and an existing pull request look absent.
  await git(["-C", root, "fetch", "origin"]);

  const currentBranch = (
    await git(["-C", root, "rev-parse", "--abbrev-ref", "HEAD"])
  ).trim();
  if (currentBranch === "HEAD")
    throw new MonitorRunBlockedError(
      "The worktree is in a detached HEAD state; check out a branch before starting a monitor run.",
    );
  const [openPulls, merged, unpushed, nextAvailable, commitsAhead] =
    await Promise.all([
      openMonitorPulls(),
      isMergedIntoMain(root, git),
      hasUnpushedCommits(root, git),
      branchExists(root, nextBranch, git),
      git(["-C", root, "rev-list", "--count", "origin/main..HEAD"]).then(
        (out) => Number(out.trim()),
      ),
    ]);
  const decision = decideMonitorBranch(
    {
      openPulls,
      currentBranch,
      currentBranchMerged: merged,
      hasUnpushedCommits: unpushed,
    },
    nextBranch,
    nextAvailable,
  );
  if (decision.action === "blocked")
    throw new MonitorRunBlockedError(decision.blocker);

  if (decision.action === "create")
    await git(["-C", root, "checkout", "-b", decision.branch, "origin/main"]);
  else if (currentBranch !== decision.branch)
    await git(["-C", root, "checkout", decision.branch]);
  if (decision.action !== "create") {
    try {
      // An ordinary merge only; rebase and force push are never acceptable on a
      // branch that already has a pull request.
      await git(["-C", root, "merge", "--no-edit", "origin/main"]);
    } catch (error) {
      throw new MonitorRunBlockedError(
        `Merging origin/main into ${decision.branch} needs manual resolution: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  const session = await startMonitorSession(root, input.ownerPid);
  const checksPath = path.join(session.tempRoot, "checks.json");
  try {
    // One observation per round, written to disk: a partially failed source is
    // reported to the coordinator, and only a missing result blocks the round.
    const results = await checkHarnesses({ root });
    await writeFile(
      checksPath,
      `${JSON.stringify(results, null, 2)}\n`,
      "utf8",
    );
    const blocked = results.filter(
      (result) => result.status === "blocked",
    ).length;
    return {
      worktree: root,
      branch: decision.branch,
      branchAction: decision.action,
      branchReason: decision.reason,
      commitsAheadOfMain: commitsAhead,
      ...(decision.action === "reuse" ? { pull: decision.pr } : {}),
      session,
      checksPath,
      observation: {
        products: results.length,
        changed: results.filter((result) => result.status === "changed").length,
        blocked,
        degraded: blocked > 0,
      },
      reportPath: session.reportPath,
      skill: ".agents/skills/harness-monitor/SKILL.md",
      nextStep:
        "Step 1 is complete. Continue at section 2 of this skill, triaging the observation at checksPath.",
    };
  } catch (error) {
    // Without a usable observation the round cannot triage; release the lock
    // instead of leaving a session that reports nothing.
    await finishMonitorSession(root, session.id).catch(() => {});
    throw error;
  }
}

export async function finishMonitorRun(
  root: string,
  sessionId: string,
): Promise<void> {
  await finishMonitorSession(path.resolve(root), sessionId);
}
