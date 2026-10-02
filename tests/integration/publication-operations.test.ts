import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer, type IncomingMessage, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { buildOnlineSite } from "../../src/compiler/online-site.js";
import {
  PublicationGithub,
  type LedgerSnapshot,
} from "../../src/publication/github.js";
import {
  beginPublication,
  finishPublication,
  reconcilePublication,
  type PublicationPlan,
} from "../../src/publication/operations.js";
import { verifyPublishedSite } from "../../src/publication/readback.js";
import {
  initialState,
  publicationStateSchema,
  reserveRelease,
  type PublicationState,
} from "../../src/publication/state.js";

const exec = promisify(execFile);
const repository = "owner/repo";
const previousCommit = "f".repeat(40);
const executionCommit = "e".repeat(40);
const runId = "run-1";
const sha1 = (value: string) => createHash("sha1").update(value).digest("hex");

let root: string;
let targetCommit: string;
let target: string;
let previous: string;
let deploymentDir: string;
let dataUrl: string;

const missing = new Set<string>();
const overrides = new Map<string, string>();
let site: Server;

async function bodyOf(request: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

function seededState(): PublicationState {
  const state = initialState();
  const previousRelease = reserveRelease(
    state,
    previousCommit,
    "2026-09-01T00:00:00Z",
  );
  previousRelease.verified_at = "2026-09-01T00:05:00Z";
  reserveRelease(state, targetCommit, "2026-10-01T00:00:00Z");
  state.protocols["1"]!.current = previous;
  return state;
}

interface GithubEmulator {
  github: PublicationGithub;
  snapshot(): Promise<LedgerSnapshot>;
  setDeployment(id: number, sha: string, status: string): void;
  setPagesStatus(commit: string, status: string): void;
  stateWrites(): number;
  close(): Promise<void>;
}

/** Real PublicationGithub against a controlled GitHub REST surface. */
async function startGithub(options: {
  state: PublicationState;
  mainHead: string | string[];
}): Promise<GithubEmulator> {
  let content = `${JSON.stringify(options.state, null, 2)}\n`;
  let revision = sha1(content);
  let writes = 0;
  const heads = Array.isArray(options.mainHead)
    ? [...options.mainHead]
    : [options.mainHead];
  const nextMainHead = () => (heads.length > 1 ? heads.shift()! : heads[0]!);
  const deployments = new Map<number, { sha: string; status: string }>();
  const pages = new Map<string, string>();
  const server = createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    const key = decodeURIComponent(url.pathname).replace(/^\//, "");
    const json = (status: number, payload: unknown): void => {
      response.writeHead(status, { "content-type": "application/json" });
      response.end(JSON.stringify(payload));
    };
    if (key === `repos/${repository}/contents/state.json`) {
      if (request.method === "PUT") {
        const body = JSON.parse(await bodyOf(request)) as {
          sha: string;
          content: string;
        };
        if (body.sha !== revision) return json(409, { message: "conflict" });
        content = Buffer.from(body.content, "base64").toString("utf8");
        publicationStateSchema.parse(JSON.parse(content));
        revision = sha1(content);
        writes += 1;
        return json(200, { content: { sha: revision } });
      }
      return json(200, {
        sha: revision,
        content: Buffer.from(content).toString("base64"),
        encoding: "base64",
      });
    }
    if (key === `repos/${repository}/git/ref/heads/main`)
      return json(200, { object: { sha: nextMainHead() } });
    if (key === `repos/${repository}/deployments`) {
      const sha = url.searchParams.get("sha");
      return json(
        200,
        [...deployments]
          .filter(([, entry]) => entry.sha === sha)
          .map(([id, entry]) => ({
            id,
            sha: entry.sha,
            environment: "github-pages",
          })),
      );
    }
    const statusRoute =
      /^repos\/[^/]+\/[^/]+\/deployments\/(\d+)\/statuses$/.exec(key);
    if (statusRoute) {
      const entry = deployments.get(Number(statusRoute[1]));
      return json(200, entry ? [{ state: entry.status }] : []);
    }
    const single = /^repos\/[^/]+\/[^/]+\/deployments\/(\d+)$/.exec(key);
    if (single) {
      const entry = deployments.get(Number(single[1]));
      return entry
        ? json(200, { sha: entry.sha, environment: "github-pages" })
        : json(404, { message: "not found" });
    }
    const pagesRoute =
      /^repos\/[^/]+\/[^/]+\/pages\/deployments\/([^/]+)$/.exec(key);
    if (pagesRoute) {
      const status = pages.get(pagesRoute[1]!);
      return status
        ? json(200, { status })
        : json(404, { message: "not found" });
    }
    return json(404, { message: "not found" });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  return {
    github: new PublicationGithub({
      repository,
      token: "test-token",
      apiBase: origin,
    }),
    snapshot: () =>
      new PublicationGithub({
        repository,
        token: "test-token",
        apiBase: origin,
      }).readState(),
    setDeployment: (id, sha, status) =>
      void deployments.set(id, { sha, status }),
    setPagesStatus: (commit, status) => void pages.set(commit, status),
    stateWrites: () => writes,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

async function startSite(directory: string): Promise<Server> {
  const server = createServer(async (request, response) => {
    const relative = decodeURIComponent(
      new URL(request.url ?? "/", "http://127.0.0.1").pathname,
    ).replace(/^\//, "");
    const override = overrides.get(relative);
    if (missing.has(relative)) {
      response.writeHead(404).end();
      return;
    }
    if (override !== undefined) {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(override);
      return;
    }
    try {
      const body = await readFile(path.join(directory, relative));
      response.writeHead(200, {
        "content-type": relative.endsWith(".html")
          ? "text/html; charset=utf-8"
          : "application/json",
      });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  return server;
}

function planFor(snapshot: LedgerSnapshot): PublicationPlan {
  return {
    schema_version: 1,
    target,
    commit: targetCommit,
    execution_commit: executionCommit,
    recovery: false,
    run_id: runId,
    output: deploymentDir,
    data_url: dataUrl,
    prepared_state_sha: snapshot.sha,
  };
}

async function pendingPlan(
  github: PublicationGithub,
): Promise<PublicationPlan> {
  const snapshot = await github.readState();
  const plan = planFor(snapshot);
  expect(await beginPublication(github, plan)).toBe(true);
  return plan;
}

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-operations-"));
  const datasetRoot = path.join(root, "dataset");
  await cp("tests/fixtures/datasets/chapters", datasetRoot, {
    recursive: true,
  });
  const git = (args: string[]) => exec("git", ["-C", datasetRoot, ...args]);
  await git(["init", "-q"]);
  await git(["add", "."]);
  await git([
    "-c",
    "user.name=test",
    "-c",
    "user.email=test@example.invalid",
    "commit",
    "-qm",
    "fixture",
  ]);
  targetCommit = (await git(["rev-parse", "HEAD"])).stdout.trim();
  target = `web-v1-${targetCommit}`;
  previous = `web-v1-${previousCommit}`;
  deploymentDir = path.join(root, "deployment");
  await buildOnlineSite({
    datasetRoot,
    profile: "fixture",
    commit: targetCommit,
    publishedAt: "2026-10-01T00:00:00Z",
    base: "/",
    outDir: deploymentDir,
  });
  site = await startSite(deploymentDir);
  const { port } = site.address() as AddressInfo;
  dataUrl = `http://127.0.0.1:${port}/data/v1/`;
}, 120_000);

afterAll(async () => {
  await new Promise<void>((resolve) => site?.close(() => resolve()));
  if (root) await rm(root, { recursive: true, force: true });
});

afterEach(() => {
  missing.clear();
  overrides.clear();
});

test("stale begin is skipped before any build or intent is recorded", async () => {
  const emulator = await startGithub({
    state: seededState(),
    mainHead: previousCommit,
  });
  try {
    const snapshot = await emulator.snapshot();
    expect(await beginPublication(emulator.github, planFor(snapshot))).toBe(
      false,
    );
    expect((await emulator.snapshot()).state.pending).toBeNull();
  } finally {
    await emulator.close();
  }
});

test("begin rechecks main head after verifying the deployment", async () => {
  const emulator = await startGithub({
    state: seededState(),
    mainHead: [targetCommit, previousCommit],
  });
  try {
    const snapshot = await emulator.snapshot();
    expect(await beginPublication(emulator.github, planFor(snapshot))).toBe(
      false,
    );
    expect((await emulator.snapshot()).state.pending).toBeNull();
    expect(emulator.stateWrites()).toBe(0);
  } finally {
    await emulator.close();
  }
});

test("a confirmed target with failed readback records verified=false and exits the old release", async () => {
  const emulator = await startGithub({
    state: seededState(),
    mainHead: targetCommit,
  });
  try {
    emulator.setDeployment(41, executionCommit, "success");
    emulator.setPagesStatus(executionCommit, "succeed");
    const plan = await pendingPlan(emulator.github);
    const writes = emulator.stateWrites();
    const healthy = await verifyPublishedSite({ dataUrl });
    const topicPage = `harnesses/${healthy.inputs!.harness}/${healthy.inputs!.topic}.html`;
    missing.add(topicPage);
    await finishPublication(emulator.github, plan, true).catch(() => {});
    expect(emulator.stateWrites() - writes).toBe(1);
    const { state } = await emulator.snapshot();
    expect(state.pending).toBeNull();
    expect(state.protocols["1"]!.current).toBe(target);
    expect(state.releases[target]!.verified_at).toBeNull();
    expect(state.releases[previous]!.exited_current_at).not.toBeNull();
    expect(state.transitions.at(-1)!.verified).toBe(false);
    expect(state.transitions.some((entry) => entry.verified)).toBe(false);
  } finally {
    await emulator.close();
  }
});

test("an unchanged or missing public pointer leaves the run uncertain", async () => {
  for (const scenario of ["old", "missing"] as const) {
    const emulator = await startGithub({
      state: seededState(),
      mainHead: targetCommit,
    });
    try {
      emulator.setDeployment(41, executionCommit, "success");
      emulator.setPagesStatus(executionCommit, "succeed");
      const plan = await pendingPlan(emulator.github);
      if (scenario === "old")
        overrides.set(
          "data/v1/current.json",
          JSON.stringify({
            protocol_version: 1,
            state: "active",
            release_id: previous,
            manifest: `releases/${previous}/manifest.json`,
          }),
        );
      else missing.add("data/v1/current.json");
      await finishPublication(emulator.github, plan, true).catch(() => {});
      const { state } = await emulator.snapshot();
      expect(state.pending?.status).toBe("uncertain");
      expect(state.protocols["1"]!.current).toBe(previous);
      expect(state.releases[target]!.verified_at).toBeNull();
      expect(state.releases[target]!.exited_current_at).toBeNull();
      expect(state.transitions).toHaveLength(0);
    } finally {
      await emulator.close();
      missing.clear();
      overrides.clear();
    }
  }
});

test("reconcile completes only when status and public target agree", async () => {
  const emulator = await startGithub({
    state: seededState(),
    mainHead: targetCommit,
  });
  try {
    emulator.setDeployment(41, executionCommit, "success");
    await pendingPlan(emulator.github);
    const reconciled = await reconcilePublication(emulator.github, {
      dataUrl,
      deploymentId: "41",
    });
    expect(reconciled.state.pending).toBeNull();
    expect(reconciled.state.protocols["1"]!.current).toBe(target);
    expect(reconciled.state.releases[target]!.verified_at).not.toBeNull();
    expect(reconciled.state.transitions.at(-1)!.verified).toBe(true);
  } finally {
    await emulator.close();
  }
});

test("reconcile keeps pending when public readback fails for the confirmed target", async () => {
  const emulator = await startGithub({
    state: seededState(),
    mainHead: targetCommit,
  });
  try {
    emulator.setDeployment(41, executionCommit, "success");
    await pendingPlan(emulator.github);
    const healthy = await verifyPublishedSite({ dataUrl });
    missing.add(
      `harnesses/${healthy.inputs!.harness}/${healthy.inputs!.topic}.html`,
    );
    const writes = emulator.stateWrites();
    await expect(
      reconcilePublication(emulator.github, { dataUrl, deploymentId: "41" }),
    ).rejects.toMatchObject({ code: "readback_failed" });
    expect(emulator.stateWrites()).toBe(writes);
    const { state } = await emulator.snapshot();
    expect(state.pending?.status).toBe("deploying");
    expect(state.protocols["1"]!.current).toBe(previous);
    expect(state.releases[target]!.verified_at).toBeNull();
  } finally {
    await emulator.close();
  }
});

test("finish leaves the run uncertain when no platform deployment matches", async () => {
  const emulator = await startGithub({
    state: seededState(),
    mainHead: targetCommit,
  });
  try {
    const plan = await pendingPlan(emulator.github);
    await finishPublication(emulator.github, plan, true).catch(() => {});
    const { state } = await emulator.snapshot();
    expect(state.pending?.status).toBe("uncertain");
    expect(state.protocols["1"]!.current).toBe(previous);
    expect(state.releases[target]!.verified_at).toBeNull();
  } finally {
    await emulator.close();
  }
});

test("reconcile refuses a public target that disagrees with pending intent", async () => {
  const emulator = await startGithub({
    state: seededState(),
    mainHead: targetCommit,
  });
  try {
    emulator.setDeployment(41, executionCommit, "success");
    await pendingPlan(emulator.github);
    overrides.set(
      "data/v1/current.json",
      JSON.stringify({
        protocol_version: 1,
        state: "active",
        release_id: previous,
        manifest: `releases/${previous}/manifest.json`,
      }),
    );
    await expect(
      reconcilePublication(emulator.github, {
        dataUrl,
        deploymentId: "41",
      }),
    ).rejects.toThrow(/deployment_uncertain|do not agree/);
    const { state } = await emulator.snapshot();
    expect(state.pending).not.toBeNull();
    expect(state.protocols["1"]!.current).toBe(previous);
  } finally {
    await emulator.close();
  }
});

test("reconcile aborts only a terminal failure with the predecessor intact", async () => {
  const emulator = await startGithub({
    state: seededState(),
    mainHead: targetCommit,
  });
  try {
    emulator.setDeployment(41, executionCommit, "failure");
    await pendingPlan(emulator.github);
    overrides.set(
      "data/v1/current.json",
      JSON.stringify({
        protocol_version: 1,
        state: "active",
        release_id: previous,
        manifest: `releases/${previous}/manifest.json`,
      }),
    );
    const reconciled = await reconcilePublication(emulator.github, {
      dataUrl,
      deploymentId: "41",
      abort: true,
    });
    expect(reconciled.state.pending).toBeNull();
    expect(reconciled.state.transitions).toHaveLength(0);
    expect(reconciled.state.releases[target]!.verified_at).toBeNull();
  } finally {
    await emulator.close();
  }
});
