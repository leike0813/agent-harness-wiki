import { describe, expect, test } from "vitest";
import {
  decideMonitorBranch,
  type MonitorBranchDecisionInput,
} from "../../src/sources/monitor-run.js";

const NEXT = "automation/harness-monitor/20261006T120000Z";
const mergedBranch = "automation/harness-monitor/20261004T061205Z";

function decide(
  input: Partial<MonitorBranchDecisionInput>,
  nextBranchAvailable = true,
) {
  return decideMonitorBranch(
    {
      openPulls: [],
      currentBranch: "main",
      currentBranchMerged: false,
      hasUnpushedCommits: false,
      ...input,
    },
    NEXT,
    nextBranchAvailable,
  );
}

const pull = (headRefName: string, number = 11) => ({
  number,
  headRefName,
  url: `https://github.com/leike0813/agent-harness-wiki/pull/${number}`,
});

describe("decideMonitorBranch", () => {
  test("continues the open rolling pull request", () => {
    const decision = decide({ openPulls: [pull(mergedBranch)] });
    expect(decision.action).toBe("reuse");
    expect(decision).toMatchObject({ branch: mergedBranch });
  });

  test("ignores pull requests outside the monitor branch space", () => {
    const decision = decide({ openPulls: [pull("feat/some-change", 3)] });
    expect(decision.action).toBe("create");
  });

  test("blocks instead of forking a second pull request", () => {
    const decision = decide({
      openPulls: [pull(mergedBranch, 11), pull(NEXT, 12)],
    });
    expect(decision.action).toBe("blocked");
    expect(decision).toMatchObject({ blocker: expect.stringContaining(NEXT) });
  });

  test("resumes an unmerged branch that still carries undelivered commits", () => {
    const decision = decide({
      currentBranch: mergedBranch,
      currentBranchMerged: false,
      hasUnpushedCommits: true,
    });
    expect(decision).toMatchObject({
      action: "continue",
      branch: mergedBranch,
    });
  });

  test("does not reuse a merged branch", () => {
    // The trap this guards: a local origin/main that predates the merge makes a
    // delivered branch look undelivered and the round opens a second edition.
    const decision = decide({
      currentBranch: mergedBranch,
      currentBranchMerged: true,
      hasUnpushedCommits: true,
    });
    expect(decision).toMatchObject({ action: "create", branch: NEXT });
  });

  test("does not resume a branch whose commits were already pushed", () => {
    const decision = decide({
      currentBranch: mergedBranch,
      currentBranchMerged: false,
      hasUnpushedCommits: false,
    });
    expect(decision.action).toBe("create");
  });

  test("does not resume a branch outside the monitor branch space", () => {
    const decision = decide({
      currentBranch: "feat/local-work",
      currentBranchMerged: false,
      hasUnpushedCommits: true,
    });
    expect(decision.action).toBe("create");
  });

  test("blocks when the generated branch name is taken", () => {
    const decision = decide({ currentBranch: "main" }, false);
    expect(decision).toMatchObject({
      action: "blocked",
      blocker: expect.stringContaining(NEXT),
    });
  });

  test("every decision carries a reason", () => {
    for (const decision of [
      decide({ openPulls: [pull(mergedBranch)] }),
      decide({ currentBranch: mergedBranch, hasUnpushedCommits: true }),
      decide({ currentBranch: "main" }),
      decide({ currentBranch: "main" }, false),
    ])
      expect(
        "reason" in decision ? decision.reason : decision.blocker,
      ).toBeTruthy();
  });
});
