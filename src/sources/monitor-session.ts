import { randomUUID } from "node:crypto";
import { realpathSync, rmSync } from "node:fs";
import { mkdtemp, realpath } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import Database from "better-sqlite3";
import * as z from "zod";
import { ownerAlive, recoverSourceWorkspaces } from "./workspace.js";
import { openMonitorDatabase } from "./monitor-state.js";
import { lstat } from "node:fs/promises";

const sessionSchema = z.strictObject({
  id: z.uuid(),
  projectRoot: z.string(),
  ownerPid: z.number().int().positive(),
  tempRoot: z.string(),
  reportPath: z.string(),
});
export type MonitorSession = z.infer<typeof sessionSchema>;

async function runtime(rootInput: string) {
  const root = await realpath(rootInput);
  const { directory, database } = await openMonitorDatabase(root);
  database.exec(
    "CREATE TABLE IF NOT EXISTS session (singleton INTEGER PRIMARY KEY CHECK(singleton = 1), record TEXT NOT NULL)",
  );
  return { root, directory, database };
}

function readSession(
  database: Database.Database,
  directory: string,
): MonitorSession | undefined {
  const row = database
    .prepare("SELECT record FROM session WHERE singleton = 1")
    .get() as { record: string } | undefined;
  if (!row) return undefined;
  const session = sessionSchema.parse(JSON.parse(row.record));
  if (session.reportPath !== path.join(directory, "latest.json"))
    throw new Error("Monitor lock belongs to another project.");
  if (
    path.dirname(session.tempRoot) !== realpathSync(tmpdir()) ||
    !path.basename(session.tempRoot).startsWith(`ahw-monitor-${session.id}-`)
  )
    throw new Error("Unsafe monitor temporary directory.");
  return session;
}

function releaseTemporary(session: MonitorSession): void {
  try {
    if (realpathSync(session.tempRoot) !== session.tempRoot)
      throw new Error("Unsafe monitor temporary directory.");
    rmSync(session.tempRoot, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

export async function startMonitorSession(
  rootInput: string,
  ownerPid: number,
): Promise<MonitorSession> {
  if (!Number.isSafeInteger(ownerPid) || ownerPid <= 0 || !ownerAlive(ownerPid))
    throw new Error("A live task owner PID is required.");
  const { root, directory, database } = await runtime(rootInput);
  const localLock = path.join(root, "var/harness-monitor/session.sqlite");
  if (path.dirname(localLock) !== directory) {
    try {
      const info = await lstat(localLock);
      if (!info.isFile() || info.isSymbolicLink())
        throw new Error("Unsafe monitor lock.");
      const previous = new Database(localLock, {
        readonly: true,
        fileMustExist: true,
      });
      try {
        const hasSession = previous
          .prepare(
            "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'session'",
          )
          .get();
        const row = hasSession
          ? (previous
              .prepare("SELECT record FROM session WHERE singleton = 1")
              .get() as { record: string } | undefined)
          : undefined;
        if (
          row &&
          ownerAlive(sessionSchema.parse(JSON.parse(row.record)).ownerPid)
        )
          throw new Error(
            "A monitor owner is still active in the worktree-local runtime.",
          );
      } finally {
        previous.close();
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        database.close();
        throw error;
      }
    }
  }
  const id = randomUUID();
  const tempRoot = await mkdtemp(
    path.join(await realpath(tmpdir()), `ahw-monitor-${id}-`),
  );
  const session = {
    id,
    projectRoot: root,
    ownerPid,
    tempRoot,
    reportPath: path.join(directory, "latest.json"),
  };
  let acquired = false;
  try {
    database
      .transaction(() => {
        const prior = readSession(database, directory);
        if (prior && ownerAlive(prior.ownerPid))
          throw new Error("A harness monitor run is already active.");
        // Retain the old ownership record if disposal fails. Keeping this
        // synchronous inside the transaction also fences concurrent recovery.
        if (prior) releaseTemporary(prior);
        database
          .prepare(
            "INSERT OR REPLACE INTO session(singleton, record) VALUES (1, ?)",
          )
          .run(JSON.stringify(session));
      })
      .immediate();
    acquired = true;
    await recoverSourceWorkspaces(root);
    return session;
  } catch (error) {
    if (acquired)
      database
        .prepare(
          "DELETE FROM session WHERE singleton = 1 AND json_extract(record, '$.id') = ?",
        )
        .run(id);
    releaseTemporary(session);
    throw error;
  } finally {
    database.close();
  }
}

export async function finishMonitorSession(
  rootInput: string,
  id: string,
): Promise<void> {
  const { directory, database } = await runtime(rootInput);
  try {
    const session = readSession(database, directory);
    if (!session || session.id !== id)
      throw new Error("Monitor session identity differs.");
    // Keep the lease while deleting its owned outputs; another start cannot
    // enter between validation and disposal.
    releaseTemporary(session);
    database
      .prepare(
        "DELETE FROM session WHERE singleton = 1 AND json_extract(record, '$.id') = ?",
      )
      .run(id);
  } finally {
    database.close();
  }
}
