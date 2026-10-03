import {
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile,
  symlink,
} from "node:fs/promises";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { tmpdir } from "node:os";
import path from "node:path";
import Database from "better-sqlite3";
import { afterEach, expect, test } from "vitest";
import {
  finishMonitorSession,
  startMonitorSession,
} from "../../src/sources/monitor-session.js";

const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0))
    await rm(root, { recursive: true, force: true });
});

test("failed stale cleanup preserves its ownership record and foreign content", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-monitor-test-"));
  roots.push(root);
  const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
    stdio: "ignore",
  });
  await once(child, "spawn");
  const abandoned = await startMonitorSession(root, child.pid!);
  const exited = once(child, "exit");
  child.kill();
  await exited;
  await rm(abandoned.tempRoot, { recursive: true });
  await writeFile(path.join(root, "keep.txt"), "foreign content");
  await symlink(root, abandoned.tempRoot, "junction");
  try {
    await expect(startMonitorSession(root, process.pid)).rejects.toThrow(
      /Unsafe/,
    );
    const db = new Database(
      path.join(root, "var/harness-monitor/session.sqlite"),
    );
    try {
      const row = db.prepare("SELECT record FROM session").get() as {
        record: string;
      };
      expect(JSON.parse(row.record).id).toBe(abandoned.id);
    } finally {
      db.close();
    }
    expect(await readFile(path.join(root, "keep.txt"), "utf8")).toBe(
      "foreign content",
    );
  } finally {
    await rm(abandoned.tempRoot);
    await finishMonitorSession(root, abandoned.id);
  }
});

test("one monitoring run owns its disposable build directory and preserves its report", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-monitor-test-"));
  roots.push(root);
  const session = await startMonitorSession(root, process.pid);
  await writeFile(path.join(session.tempRoot, "build.json"), "{}");
  await writeFile(session.reportPath, '{"status":"unchanged"}');
  await expect(startMonitorSession(root, process.pid)).rejects.toThrow(
    /active/,
  );
  await expect(finishMonitorSession(root, "other-task")).rejects.toThrow(
    /identity/,
  );
  await finishMonitorSession(root, session.id);
  await expect(stat(session.tempRoot)).rejects.toMatchObject({
    code: "ENOENT",
  });
  expect(JSON.parse(await readFile(session.reportPath, "utf8"))).toEqual({
    status: "unchanged",
  });
  const next = await startMonitorSession(root, process.pid);
  expect(next.id).not.toBe(session.id);
  await finishMonitorSession(root, next.id);
});

test("concurrent starts elect one run and reclaim a dead owner's outputs", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-monitor-test-"));
  roots.push(root);
  const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
    stdio: "ignore",
  });
  await once(child, "spawn");
  const abandoned = await startMonitorSession(root, child.pid!);
  const exited = once(child, "exit");
  child.kill();
  await exited;
  const starts = await Promise.allSettled([
    startMonitorSession(root, process.pid),
    startMonitorSession(root, process.pid),
  ]);
  const winners = starts.filter(
    (
      item,
    ): item is PromiseFulfilledResult<
      Awaited<ReturnType<typeof startMonitorSession>>
    > => item.status === "fulfilled",
  );
  expect(winners).toHaveLength(1);
  expect(starts.filter((item) => item.status === "rejected")).toHaveLength(1);
  await expect(stat(abandoned.tempRoot)).rejects.toMatchObject({
    code: "ENOENT",
  });
  await finishMonitorSession(root, winners[0]!.value.id);
});
