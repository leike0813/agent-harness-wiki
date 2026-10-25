import { execFile } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import Database from "better-sqlite3";
import { z } from "zod";
import { upstreamAuditSchema, type UpstreamAudit } from "../domain/schema.js";

const exec = promisify(execFile);
export const WEEKLY_PRODUCT_LIMIT = 5;
const outcomeSchema = z.enum([
  "completed",
  "reviewed_no_impact",
  "blocked",
  "failed",
  "waiting_for_integration",
]);
export type MonitorOutcome = z.infer<typeof outcomeSchema>;
const checkSchema = upstreamAuditSchema.shape.checks.element;
const sourceStateSchema = z.strictObject({
  harness_id: z.string(),
  source_id: z.string(),
  kind: checkSchema.shape.kind,
  observed: z.string(),
  processed: z.string(),
  processed_at: z.string().nullable(),
  attempted: z.string().nullable(),
  checked_at: z.string(),
  pending_since: z.string().nullable(),
  check: checkSchema,
});
type SourceState = z.infer<typeof sourceStateSchema>;
const taskSchema = z.strictObject({
  task_id: z.uuid(),
  session_id: z.uuid(),
  harness_id: z.string(),
  week: z.string(),
  created_at: z.iso.datetime(),
  audit: upstreamAuditSchema,
  outcome: outcomeSchema.nullable(),
  reason: z.string().nullable(),
  audit_id: z.string().nullable(),
});
export type MonitorTask = z.infer<typeof taskSchema>;
export const monitorResultSchema = z.strictObject({
  task_id: z.uuid().optional(),
  harness_id: upstreamAuditSchema.shape.harness_id,
  audit_id: upstreamAuditSchema.shape.audit_id,
  outcome: outcomeSchema,
  reason: z.string().min(1),
});
export type MonitorResult = z.infer<typeof monitorResultSchema>;

/** Git worktrees share progress; standalone datasets keep their local runtime. */
export async function monitorDirectory(rootInput: string): Promise<string> {
  const root = await realpath(rootInput);
  let common: string;
  try {
    const { stdout } = await exec("git", [
      "-C",
      root,
      "rev-parse",
      "--path-format=absolute",
      "--git-common-dir",
    ]);
    common = await realpath(stdout.trim());
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !error.message.includes("not a git repository")
    )
      throw error;
    return path.join(root, "var/harness-monitor");
  }
  return path.join(common, "agent-harness-wiki-monitor");
}

export async function openMonitorDatabase(
  root: string,
): Promise<{ directory: string; database: Database.Database }> {
  const directory = await monitorDirectory(root);
  await mkdir(directory, { recursive: true });
  if ((await realpath(directory)) !== directory)
    throw new Error("Monitor runtime contains a symlink.");
  const file = path.join(directory, "session.sqlite");
  try {
    const info = await lstat(file);
    if (!info.isFile() || info.isSymbolicLink())
      throw new Error("Unsafe monitor database.");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  const database = new Database(file);
  database.pragma("busy_timeout = 5000");
  return { directory, database };
}

/** Weeks start Sunday 02:00 in Shanghai, including the scheduler's grace hour. */
export function monitorWeek(date: Date): { week: string; due: boolean } {
  const local = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  const due = local.getUTCDay() === 0 && local.getUTCHours() === 2;
  const start = new Date(local);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  start.setUTCHours(2, 0, 0, 0);
  if (local < start) start.setUTCDate(start.getUTCDate() - 7);
  return { week: start.toISOString().slice(0, 10), due };
}

function normalPackageAdvance(check: UpstreamAudit["checks"][number]): boolean {
  if (check.kind !== "npm_registry" || !check.observed || !check.baseline)
    return false;
  const parse = (identity: string) => {
    const match = /^(\d+)\.(\d+)\.(\d+)@/.exec(identity);
    return match ? match.slice(1).map(Number) : undefined;
  };
  const before = parse(check.baseline);
  const after = parse(check.observed);
  if (!before || !after) return false;
  for (let i = 0; i < 3; i++) {
    if (after[i]! > before[i]!) return true;
    if (after[i]! < before[i]!) return false;
  }
  return check.observed === check.baseline;
}

function businessAudit(input: unknown): UpstreamAudit {
  if (typeof input !== "object" || !input)
    return upstreamAuditSchema.parse(input);
  const value = { ...input };
  // Observation hints are not part of the permanent audit contract.
  Reflect.deleteProperty(value, "requires_triage");
  return upstreamAuditSchema.parse(value);
}

export class MonitorState {
  private constructor(
    readonly directory: string,
    private readonly database: Database.Database,
  ) {
    database.exec(`
      CREATE TABLE IF NOT EXISTS monitor_sources (source_id TEXT PRIMARY KEY, body TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS monitor_observations (audit_id TEXT PRIMARY KEY, harness_id TEXT NOT NULL, checked_at TEXT NOT NULL, body TEXT NOT NULL);
      CREATE INDEX IF NOT EXISTS monitor_observation_latest ON monitor_observations(harness_id, checked_at);
      CREATE TABLE IF NOT EXISTS monitor_imports (audit_id TEXT PRIMARY KEY, body TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS monitor_tasks (task_id TEXT PRIMARY KEY, week TEXT NOT NULL, harness_id TEXT NOT NULL, session_id TEXT NOT NULL, body TEXT NOT NULL);
      CREATE UNIQUE INDEX IF NOT EXISTS monitor_week_product ON monitor_tasks(week, harness_id);
      CREATE TABLE IF NOT EXISTS monitor_attempts (source_id TEXT NOT NULL, observed TEXT NOT NULL, PRIMARY KEY(source_id, observed));
    `);
  }

  static async open(root: string): Promise<MonitorState> {
    const { directory, database } = await openMonitorDatabase(root);
    return new MonitorState(directory, database);
  }

  close(): void {
    this.database.close();
  }

  private sources(): SourceState[] {
    return (
      this.database.prepare("SELECT body FROM monitor_sources").all() as {
        body: string;
      }[]
    ).map((row) => sourceStateSchema.parse(JSON.parse(row.body)));
  }

  private put(source: SourceState): void {
    this.database
      .prepare("INSERT OR REPLACE INTO monitor_sources VALUES (?, ?)")
      .run(source.source_id, JSON.stringify(source));
  }

  private attempted(sourceId: string, observed: string): void {
    this.database
      .prepare("INSERT OR IGNORE INTO monitor_attempts VALUES (?, ?)")
      .run(sourceId, observed);
  }

  baselines(processed = false): ReadonlyMap<string, string> {
    return new Map(
      this.sources().map((source) => [
        source.source_id,
        processed ? source.processed : source.observed,
      ]),
    );
  }

  private saveObservation(audit: UpstreamAudit): void {
    this.database
      .prepare("INSERT OR IGNORE INTO monitor_observations VALUES (?, ?, ?, ?)")
      .run(
        audit.audit_id,
        audit.harness_id,
        audit.checked_at,
        JSON.stringify(audit),
      );
  }

  /** Imported pending history is parked, never reclassified as completed. */
  importAudits(inputs: UpstreamAudit[]): void {
    this.database
      .transaction(() => {
        for (const audit of [...inputs].sort((a, b) =>
          a.checked_at.localeCompare(b.checked_at),
        )) {
          const body = JSON.stringify(audit);
          const previous = this.database
            .prepare("SELECT body FROM monitor_imports WHERE audit_id = ?")
            .get(audit.audit_id) as { body: string } | undefined;
          if (previous?.body === body) continue;
          this.observe([audit], true);
          if (
            audit.review_status === "reviewed" &&
            audit.pending_question_ids.length === 0 &&
            audit.checks.every((check) => check.status !== "blocked")
          )
            this.acknowledge(audit);
          this.database
            .prepare("INSERT OR REPLACE INTO monitor_imports VALUES (?, ?)")
            .run(audit.audit_id, body);
        }
      })
      .immediate();
  }

  observe(inputs: unknown[], parked = false): void {
    this.database
      .transaction(() => {
        const current = new Map(
          this.sources().map((source) => [source.source_id, source]),
        );
        for (const input of inputs) {
          const audit = businessAudit(input);
          this.saveObservation(audit);
          for (const check of audit.checks) {
            const old = current.get(check.source_id);
            if (old && old.checked_at > check.checked_at) continue;
            if (!check.observed) {
              if (old) {
                const next = { ...old, check, checked_at: check.checked_at };
                this.put(next);
                current.set(check.source_id, next);
              }
              continue;
            }
            const processed = old?.processed ?? check.baseline ?? "";
            const metadataOnly = normalPackageAdvance({
              ...check,
              baseline: old?.observed || processed || check.baseline,
            });
            const next: SourceState = {
              harness_id: audit.harness_id,
              source_id: check.source_id,
              kind: check.kind,
              observed: check.observed,
              processed: metadataOnly ? check.observed : processed,
              processed_at: old?.processed_at ?? null,
              attempted:
                parked || metadataOnly
                  ? check.observed
                  : (old?.attempted ?? null),
              checked_at: check.checked_at,
              pending_since:
                check.observed !== processed && !metadataOnly
                  ? (old?.pending_since ?? check.checked_at)
                  : null,
              check,
            };
            this.put(next);
            current.set(check.source_id, next);
            if (parked || metadataOnly)
              this.attempted(check.source_id, check.observed);
          }
        }
      })
      .immediate();
  }

  private acknowledge(audit: UpstreamAudit): void {
    const states = new Map(
      this.sources().map((source) => [source.source_id, source]),
    );
    for (const check of audit.checks) {
      const old = states.get(check.source_id);
      if (!old || !check.observed || check.status === "blocked") continue;
      if (
        old.processed_at &&
        old.processed_at > check.checked_at &&
        old.observed !== check.observed
      )
        continue;
      this.put({
        ...old,
        processed: check.observed,
        processed_at: check.checked_at,
        attempted: check.observed,
        pending_since:
          old.observed === check.observed ? null : old.pending_since,
      });
    }
  }

  queue(): UpstreamAudit[] {
    const grouped = new Map<string, SourceState[]>();
    for (const source of this.sources()) {
      if (
        source.check.status === "blocked" ||
        source.observed === source.processed ||
        source.observed === source.attempted ||
        this.database
          .prepare(
            "SELECT 1 FROM monitor_attempts WHERE source_id = ? AND observed = ?",
          )
          .get(source.source_id, source.observed)
      )
        continue;
      const list = grouped.get(source.harness_id) ?? [];
      list.push(source);
      grouped.set(source.harness_id, list);
    }
    return [...grouped]
      .sort(([a, aa], [b, bb]) => {
        const oldest = (list: SourceState[]) =>
          list.map((source) => source.pending_since!).sort()[0]!;
        return oldest(aa).localeCompare(oldest(bb)) || a.localeCompare(b);
      })
      .map(([id, sources]) => {
        const row = this.database
          .prepare(
            "SELECT body FROM monitor_observations WHERE harness_id = ? ORDER BY checked_at DESC LIMIT 1",
          )
          .get(id) as { body: string };
        const latest = upstreamAuditSchema.parse(JSON.parse(row.body));
        const changed = new Map(
          sources.map((source) => [source.source_id, source]),
        );
        const allSources = new Map(
          this.sources().map((source) => [source.source_id, source]),
        );
        const checks = latest.checks.map((check) => {
          const source = changed.get(check.source_id);
          if (source) {
            const item = {
              ...source.check,
              ...(source.processed ? { baseline: source.processed } : {}),
              status: "changed" as const,
            };
            if (!source.processed) Reflect.deleteProperty(item, "baseline");
            return item;
          }
          const current = allSources.get(check.source_id);
          return check.status === "blocked" || !current
            ? check
            : {
                ...check,
                baseline: current.observed,
                status: "unchanged" as const,
              };
        });
        return {
          ...latest,
          checks,
          status: checks.some((check) => check.status === "blocked")
            ? ("blocked" as const)
            : ("changed" as const),
          impacts: [],
          pending_question_ids: [],
          review_status: "pending" as const,
        };
      });
  }

  private tasks(): MonitorTask[] {
    return (
      this.database.prepare("SELECT body FROM monitor_tasks").all() as {
        body: string;
      }[]
    ).map((row) => taskSchema.parse(JSON.parse(row.body)));
  }

  preview(date: Date) {
    const { week, due } = monitorWeek(date);
    const used = this.tasks().filter((task) => task.week === week);
    const queue = this.queue().filter(
      (audit) => !used.some((task) => task.harness_id === audit.harness_id),
    );
    return {
      week,
      due,
      used: used.length,
      remaining: Math.max(0, WEEKLY_PRODUCT_LIMIT - used.length),
      queued: queue.length,
      products: queue
        .slice(0, Math.max(0, WEEKLY_PRODUCT_LIMIT - used.length))
        .map((audit) => audit.harness_id),
    };
  }

  claim(date: Date, sessionId: string): MonitorTask[] {
    return this.database
      .transaction(() => {
        const existing = this.tasks().filter(
          (task) => task.session_id === sessionId,
        );
        if (existing.length) return existing;
        const plan = this.preview(date);
        if (!plan.due) return [];
        const tasks = this.queue()
          .filter((audit) => plan.products.includes(audit.harness_id))
          .map((audit): MonitorTask => ({
            task_id: randomUUID(),
            session_id: sessionId,
            harness_id: audit.harness_id,
            week: plan.week,
            created_at: date.toISOString(),
            audit,
            outcome: null,
            reason: null,
            audit_id: null,
          }));
        const sources = this.sources();
        for (const task of tasks) {
          this.database
            .prepare("INSERT INTO monitor_tasks VALUES (?, ?, ?, ?, ?)")
            .run(
              task.task_id,
              task.week,
              task.harness_id,
              task.session_id,
              JSON.stringify(task),
            );
          for (const check of task.audit.checks) {
            const source = sources.find(
              (item) => item.source_id === check.source_id,
            );
            if (source && check.status === "changed" && check.observed) {
              this.put({ ...source, attempted: check.observed });
              this.attempted(check.source_id, check.observed);
            }
          }
        }
        return tasks;
      })
      .immediate();
  }

  record(input: MonitorResult, audit: UpstreamAudit): void {
    const result = monitorResultSchema.parse(input);
    if (
      audit.harness_id !== result.harness_id ||
      audit.audit_id !== result.audit_id
    )
      throw new Error("Result audit belongs to another task or product.");
    if (
      (result.outcome === "completed" ||
        result.outcome === "reviewed_no_impact") &&
      (audit.pending_question_ids.length > 0 ||
        audit.checks.some((check) => check.status === "blocked") ||
        (audit.review_status !== "reviewed" &&
          (!audit.reviewed_by || !audit.reviewed_at)))
    )
      throw new Error(
        "Completed results require a self-checked audit with no incomplete current questions or failed sources.",
      );
    this.database
      .transaction(() => {
        const task = result.task_id
          ? this.tasks().find((item) => item.task_id === result.task_id)
          : undefined;
        if (result.task_id && (!task || task.harness_id !== result.harness_id))
          throw new Error("Unknown monitor task.");
        if (
          task &&
          task.audit.checks.some(
            (check) =>
              check.status === "changed" &&
              !audit.checks.some(
                (item) =>
                  item.source_id === check.source_id &&
                  item.observed === check.observed,
              ),
          )
        )
          throw new Error("Result audit differs from the frozen task sources.");
        if (task?.outcome && task.outcome !== "waiting_for_integration") {
          if (
            task.outcome === result.outcome &&
            task.audit_id === result.audit_id &&
            task.reason === result.reason
          )
            return;
          throw new Error("Monitor task already has a terminal result.");
        }
        const explicitAudit = upstreamAuditSchema.parse(audit);
        this.observe([explicitAudit], true);
        if (
          result.outcome === "completed" ||
          result.outcome === "reviewed_no_impact"
        )
          this.acknowledge(audit);
        if (task)
          this.database
            .prepare("UPDATE monitor_tasks SET body = ? WHERE task_id = ?")
            .run(
              JSON.stringify({
                ...task,
                outcome: result.outcome,
                reason: result.reason,
                audit_id: result.audit_id,
              }),
              task.task_id,
            );
      })
      .immediate();
  }

  assertSettled(sessionId: string): void {
    if (
      this.tasks().some(
        (task) => task.session_id === sessionId && task.outcome === null,
      )
    )
      throw new Error(
        "Record every product outcome before finishing the monitor session.",
      );
  }

  status(date = new Date()) {
    return {
      ...this.preview(date),
      products: this.queue().map((audit) => audit.harness_id),
      recent_tasks: this.tasks()
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .slice(0, 20)
        .map((task) => ({
          task_id: task.task_id,
          harness_id: task.harness_id,
          week: task.week,
          outcome: task.outcome ?? "incomplete",
          reason: task.reason,
          audit_id: task.audit_id,
        })),
    };
  }

  async retainDocument(_sourceId: string, bytes: Buffer): Promise<void> {
    const hash = createHash("sha256").update(bytes).digest("hex");
    const directory = path.join(this.directory, "documents");
    await mkdir(directory, { recursive: true });
    if ((await realpath(directory)) !== directory)
      throw new Error("Unsafe document cache.");
    const file = path.join(directory, `${hash}.txt`);
    try {
      await writeFile(file, bytes, { flag: "wx" });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const info = await lstat(file);
      if (
        !info.isFile() ||
        info.isSymbolicLink() ||
        !(await readFile(file)).equals(bytes)
      )
        throw new Error("Document cache differs from the observed bytes.");
    }
  }
}
