/**
 * Bounded read-only client for published online knowledge releases.
 *
 * Confirms the current pointer, validates the manifest and catalog, then reads
 * individual release resources on demand. One client binds one release for its
 * whole lifetime; a new process confirms the current pointer again. All reads
 * on one client share memory and file caches, and callers share cancellation
 * and resource budgets through a single Operation context.
 */
import { createHash, randomUUID } from "node:crypto";
import {
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  stat,
  unlink,
  utimes,
  writeFile,
} from "node:fs/promises";
import { homedir } from "node:os";
import { performance } from "node:perf_hooks";
import path from "node:path";
import * as z from "zod";
import {
  onlineCatalogSchema,
  onlineManifestSchema,
  onlinePointerSchema,
  onlineReleaseIdSchema,
  parseOnlineResource,
  resourcePathSchema,
  type OnlineManifest,
  type OnlineResource,
} from "../domain/online.js";
import { OnlineError } from "./online-error.js";

export type OnlineCatalog = z.infer<typeof onlineCatalogSchema>;
export type AccessMode = "online" | "offline";

export const defaultDataUrl =
  "https://leike0813.github.io/agent-harness-wiki/data/v1/";

export interface OnlineClientOptions {
  dataUrl?: string;
  offline?: boolean;
  cacheDir?: string;
  fileCache?: boolean;
  signal?: AbortSignal;
  diagnostic?: (message: string) => void;
}

/**
 * Timer, transport and capacity overrides. Only tests pass these; the CLI and
 * MCP entry points never expose them as user options.
 */
export interface OnlineClientInternals {
  fetch?: typeof globalThis.fetch;
  now?: () => number;
  operationMs?: number;
  requestMs?: number;
  concurrency?: number;
  maxResources?: number;
  memoryBytes?: number;
  diskBytes?: number;
  maxResourceBytes?: number;
}

export interface Operation {
  /** Aborted when the operation is cancelled, closed, or out of time. */
  readonly signal: AbortSignal;
  /** Throw the matching OnlineError when cancelled or past the deadline. */
  check(): void;
  /** Yield to the event loop, then check; call between bounded batches. */
  checkpoint(): Promise<void>;
  /** Release the deadline timer and remove the operation from its client. */
  dispose(): void;
}

const operationDefaults = {
  operationMs: 30_000,
  requestMs: 10_000,
  concurrency: 4,
  maxResources: 64,
  memoryBytes: 32 * 1024 * 1024,
  diskBytes: 128 * 1024 * 1024,
  // ponytail: one generous per-resource ceiling; raise if a real release ever
  // ships a single JSON resource above 16 MiB.
  maxResourceBytes: 16 * 1024 * 1024,
};

const retryableStatuses = new Set([408, 429, 502, 503, 504]);
const retryBackoffMs = 200;
const lastSuccessFile = "last-success.json";

const lastSuccessSchema = z.strictObject({
  protocol_version: z.literal(1),
  release_id: onlineReleaseIdSchema,
  manifest: resourcePathSchema,
});

interface Limits {
  fetch: typeof globalThis.fetch;
  now: () => number;
  operationMs: number;
  requestMs: number;
  concurrency: number;
  maxResources: number;
  memoryBytes: number;
  diskBytes: number;
  maxResourceBytes: number;
}

interface ResolvedOptions {
  entryUrl: URL;
  offline: boolean;
  cacheRoot: string | undefined;
  signal: AbortSignal | undefined;
  diagnostic: (message: string) => void;
}

interface InitializedRelease {
  releaseId: string;
  manifest: OnlineManifest;
  catalog: OnlineCatalog;
  releaseRoot: URL;
  accessMode: AccessMode;
}

/** Platform default file-cache root. Pure so tests never touch a real HOME. */
export function defaultCacheRoot(input: {
  platform: NodeJS.Platform;
  env: Record<string, string | undefined>;
  homedir: string;
}): string {
  const { platform, env } = input;
  if (platform === "win32") {
    const local = env.LOCALAPPDATA;
    const base =
      local && path.win32.isAbsolute(local)
        ? local
        : path.win32.join(input.homedir, "AppData", "Local");
    return path.win32.join(base, "agent-harness-wiki", "Cache");
  }
  if (platform === "darwin")
    return path.posix.join(
      input.homedir,
      "Library",
      "Caches",
      "agent-harness-wiki",
    );
  const xdg = env.XDG_CACHE_HOME;
  const base =
    xdg && path.posix.isAbsolute(xdg)
      ? xdg
      : path.posix.join(input.homedir, ".cache");
  return path.posix.join(base, "agent-harness-wiki");
}

/** Seconds or HTTP-date Retry-After, clamped at zero. */
export function parseRetryAfterHeader(
  value: string | null,
  nowMs: number,
): number | undefined {
  if (value === null) return undefined;
  const trimmed = value.trim();
  if (/^\d+$/.test(trimmed)) return Number(trimmed) * 1000;
  const at = Date.parse(trimmed);
  if (Number.isNaN(at)) return undefined;
  return Math.max(0, at - nowMs);
}

function expectedKinds(
  relative: string,
): readonly OnlineResource["resource_kind"][] | undefined {
  if (relative === "manifest.json") return ["manifest"];
  if (relative === "catalog.json") return ["catalog"];
  if (relative.startsWith("topics/") && relative.endsWith("/index.json"))
    return ["topic"];
  if (relative.startsWith("chapters/")) return ["chapter"];
  if (relative === "search/manifest.json") return ["search_manifest"];
  if (relative.startsWith("search/") && relative.endsWith("/index.json"))
    return ["navigation"];
  if (/^search\/(exact|lexical)\/blocks\//.test(relative)) return ["postings"];
  if (relative.startsWith("sources/index/blocks/")) return ["source_directory"];
  if (relative.startsWith("sources/index/")) return ["navigation"];
  if (relative.startsWith("sources/")) return ["source"];
  if (relative.startsWith("search/scopes/") && relative.includes("/blocks/"))
    return ["sections"];
  if (relative.startsWith("search/")) return ["navigation"];
  return undefined;
}

function releaseRootFor(manifest: string, entryUrl: URL): URL {
  return new URL(".", new URL(manifest, entryUrl));
}

function protocolVersionOf(value: unknown): number | undefined {
  if (value === null || typeof value !== "object") return undefined;
  const record = value as Record<string, unknown>;
  return typeof record.protocol_version === "number"
    ? record.protocol_version
    : undefined;
}

function isWithin(root: string, target: string): boolean {
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(target);
  return (
    resolved === resolvedRoot || resolved.startsWith(resolvedRoot + path.sep)
  );
}

function isMissing(error: unknown): boolean {
  return (error as NodeJS.ErrnoException).code === "ENOENT";
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const onAbort = (): void => {
      clearTimeout(timer);
      reject(new Error("aborted"));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    if (signal.aborted) {
      clearTimeout(timer);
      reject(new Error("aborted"));
      return;
    }
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

class Semaphore {
  #active = 0;
  #waiters: {
    resolve: () => void;
    signal: AbortSignal;
    onAbort: () => void;
  }[] = [];

  constructor(private readonly limit: number) {}

  async acquire(signal: AbortSignal): Promise<void> {
    if (signal.aborted) throw new Error("aborted");
    if (this.#active < this.limit) {
      this.#active += 1;
      return;
    }
    await new Promise<void>((resolve, reject) => {
      const waiter = {
        resolve,
        signal,
        onAbort: (): void => {
          const index = this.#waiters.indexOf(waiter);
          if (index >= 0) this.#waiters.splice(index, 1);
          reject(new Error("aborted"));
        },
      };
      this.#waiters.push(waiter);
      signal.addEventListener("abort", waiter.onAbort, { once: true });
    });
  }

  release(): void {
    this.#active -= 1;
    const waiter = this.#waiters.shift();
    if (!waiter) return;
    waiter.signal.removeEventListener("abort", waiter.onAbort);
    this.#active += 1;
    waiter.resolve();
  }
}

// One HTTP slot pool per process; all clients in a process share the four
// default slots.
const sharedSemaphore = new Semaphore(operationDefaults.concurrency);

interface AttemptOutcome {
  status: number;
  body: Buffer | undefined;
  retryAfterMs: number | undefined;
}

class OperationContext implements Operation {
  readonly signal: AbortSignal;
  readonly #controller = new AbortController();
  readonly #client: OnlineClient;
  readonly #deadline: number;
  readonly #now: () => number;
  readonly #maxResources: number;
  readonly #timer: NodeJS.Timeout;
  readonly #onDispose: (operation: OperationContext) => void;
  readonly #resources = new Set<string>();
  readonly #external: AbortSignal | undefined;
  readonly #onExternalAbort = () => this.#abort("cancelled");
  #abortKind: "deadline" | "cancelled" | "closed" | undefined;
  #disposed = false;

  constructor(
    client: OnlineClient,
    config: {
      operationMs: number;
      maxResources: number;
      now: () => number;
      external: AbortSignal | undefined;
      onDispose: (operation: OperationContext) => void;
    },
  ) {
    this.#client = client;
    this.#now = config.now;
    this.#maxResources = config.maxResources;
    this.#onDispose = config.onDispose;
    this.#deadline = config.now() + config.operationMs;
    this.signal = this.#controller.signal;
    this.#timer = setTimeout(() => this.#abort("deadline"), config.operationMs);
    this.#timer.unref();
    this.#external = config.external;
    if (config.external) {
      if (config.external.aborted) this.#abort("cancelled");
      else
        config.external.addEventListener("abort", this.#onExternalAbort, {
          once: true,
        });
    }
  }

  belongsTo(client: OnlineClient): boolean {
    return this.#client === client;
  }

  remainingMs(): number {
    return Math.max(0, this.#deadline - this.#now());
  }

  charge(resource: string): void {
    if (this.#resources.has(resource)) return;
    if (this.#resources.size >= this.#maxResources)
      throw new OnlineError(
        "query_too_broad",
        `The operation exceeded ${this.#maxResources} distinct release resources.`,
        { releaseId: this.#client.boundReleaseId() },
      );
    this.#resources.add(resource);
  }

  check(): void {
    if (this.#abortKind === "deadline")
      throw new OnlineError(
        "operation_timeout",
        "The operation deadline was reached.",
        { retryable: true, releaseId: this.#client.boundReleaseId() },
      );
    if (this.#abortKind !== undefined)
      throw new OnlineError(
        "operation_cancelled",
        "The operation was cancelled.",
        { releaseId: this.#client.boundReleaseId() },
      );
    if (this.#now() >= this.#deadline) {
      this.#abort("deadline");
      throw new OnlineError(
        "operation_timeout",
        "The operation deadline was reached.",
        { retryable: true, releaseId: this.#client.boundReleaseId() },
      );
    }
  }

  async checkpoint(): Promise<void> {
    await new Promise<void>((resolve) => setImmediate(resolve));
    this.check();
  }

  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;
    this.#external?.removeEventListener("abort", this.#onExternalAbort);
    this.#onDispose(this);
    this.#abort("closed");
  }

  #abort(kind: "deadline" | "cancelled" | "closed"): void {
    if (this.#abortKind !== undefined) return;
    this.#abortKind = kind;
    clearTimeout(this.#timer);
    this.#controller.abort(kind);
  }
}

interface FileEntry {
  file: string;
  size: number;
  mtimeMs: number;
}

class DiskCache {
  constructor(
    public root: string,
    private readonly limit: number,
    private readonly maxResourceBytes: number,
  ) {}

  async canonicalize(): Promise<void> {
    try {
      await mkdir(this.root, { recursive: true });
      this.root = await realpath(this.root);
    } catch {
      /* Read-only or unavailable cache remains optional online. */
    }
  }

  pathFor(releaseId: string, relative: string): string {
    return path.join(this.root, releaseId, relative);
  }

  async read(
    releaseId: string,
    relative: string,
    signal: AbortSignal,
  ): Promise<Buffer | undefined> {
    const file = this.pathFor(releaseId, relative);
    if (!isWithin(this.root, file)) return undefined;
    try {
      const real = await realpath(file);
      if (!isWithin(this.root, real)) return undefined;
      const size = (await stat(real)).size;
      if (size > this.maxResourceBytes)
        throw new OnlineError(
          "invalid_cached_data",
          "Cached resource exceeds the size limit.",
        );
      const bytes = await readFile(real, { signal });
      void utimes(real, new Date(), new Date()).catch(() => {});
      return bytes;
    } catch (error) {
      if (error instanceof OnlineError || signal.aborted) throw error;
      return undefined;
    }
  }

  async write(
    releaseId: string,
    relative: string,
    bytes: Buffer,
  ): Promise<void> {
    const target = this.pathFor(releaseId, relative);
    if (!isWithin(this.root, target))
      throw new Error("Cache path escapes its owned namespace.");
    const directory = path.dirname(target);
    await mkdir(directory, { recursive: true });
    const real = await realpath(directory);
    if (!isWithin(this.root, real))
      throw new Error("Cache directory escapes its owned namespace.");
    const temp = path.join(
      directory,
      `.tmp-${process.pid}-${randomUUID()}-${path.basename(target)}`,
    );
    await writeFile(temp, bytes);
    await rename(temp, target);
    await this.#enforce();
  }

  async readRecord(signal: AbortSignal): Promise<unknown | undefined> {
    const file = path.join(this.root, lastSuccessFile);
    let text: string;
    try {
      text = await readFile(file, { encoding: "utf8", signal });
    } catch (error) {
      if (isMissing(error)) return undefined;
      throw error;
    }
    try {
      return JSON.parse(text) as unknown;
    } catch {
      throw new OnlineError(
        "invalid_cached_data",
        "The cached initialization record is not valid JSON.",
      );
    }
  }

  async writeRecord(record: unknown, operation: Operation): Promise<void> {
    const target = path.join(this.root, lastSuccessFile);
    await mkdir(this.root, { recursive: true });
    const temp = path.join(
      this.root,
      `.tmp-${process.pid}-${randomUUID()}-${lastSuccessFile}`,
    );
    await writeFile(temp, JSON.stringify(record), { signal: operation.signal });
    operation.check();
    await rename(temp, target);
  }

  async #enforce(): Promise<void> {
    const entries = await this.#collect();
    let total = entries.reduce((sum, entry) => sum + entry.size, 0);
    if (total <= this.limit) return;
    entries.sort((a, b) => a.mtimeMs - b.mtimeMs);
    for (const entry of entries) {
      if (total <= this.limit) break;
      try {
        await unlink(entry.file);
        total -= entry.size;
      } catch {
        // Another process may have reclaimed it already.
      }
    }
  }

  async #collect(): Promise<FileEntry[]> {
    const record = path.join(this.root, lastSuccessFile);
    const entries: FileEntry[] = [];
    const walk = async (directory: string): Promise<void> => {
      let dirents;
      try {
        dirents = await readdir(directory, { withFileTypes: true });
      } catch {
        return;
      }
      for (const dirent of dirents) {
        const file = path.join(directory, dirent.name);
        if (dirent.isSymbolicLink()) continue;
        if (dirent.isDirectory()) {
          await walk(file);
          continue;
        }
        if (!dirent.isFile() || file === record) continue;
        try {
          const info = await stat(file);
          entries.push({ file, size: info.size, mtimeMs: info.mtimeMs });
        } catch {
          // Skip files that vanished mid-walk.
        }
      }
    };
    await walk(this.root);
    return entries;
  }
}

export class OnlineClient {
  readonly #options: ResolvedOptions;
  readonly #limits: Limits;
  readonly #semaphore: Semaphore;
  readonly #disk: DiskCache | undefined;
  readonly #memory = new Map<string, Buffer>();
  readonly #operations = new Set<OperationContext>();
  #memoryBytes = 0;
  #state: InitializedRelease | undefined;
  #initializingReleaseId: string | undefined;
  #closed = false;
  #diagnostics = 0;

  private constructor(
    options: ResolvedOptions,
    limits: Limits,
    semaphore: Semaphore,
    disk: DiskCache | undefined,
  ) {
    this.#options = options;
    this.#limits = limits;
    this.#semaphore = semaphore;
    this.#disk = disk;
  }

  static open(options: OnlineClientOptions = {}): Promise<OnlineClient> {
    return OnlineClient.#start(options, {});
  }

  /** Test-only entry that accepts timer, transport and capacity overrides. */
  static openForTest(
    options: OnlineClientOptions,
    internals: OnlineClientInternals,
  ): Promise<OnlineClient> {
    return OnlineClient.#start(options, internals);
  }

  static async #start(
    options: OnlineClientOptions,
    internals: OnlineClientInternals,
  ): Promise<OnlineClient> {
    const limits = resolveLimits(internals);
    const resolved = resolveOptions(options);
    const semaphore =
      internals.concurrency === undefined
        ? sharedSemaphore
        : new Semaphore(limits.concurrency);
    const disk = resolved.cacheRoot
      ? new DiskCache(
          resolved.cacheRoot,
          limits.diskBytes,
          limits.maxResourceBytes,
        )
      : undefined;
    const client = new OnlineClient(resolved, limits, semaphore, disk);
    await client.#initialize();
    return client;
  }

  get releaseId(): string {
    return this.#release().releaseId;
  }

  get manifest(): OnlineManifest {
    return this.#release().manifest;
  }

  get catalog(): OnlineCatalog {
    return this.#release().catalog;
  }

  get accessMode(): AccessMode {
    return this.#release().accessMode;
  }

  /** Release id once known, else undefined; used for error diagnostics. */
  boundReleaseId(): string | undefined {
    return this.#state?.releaseId ?? this.#initializingReleaseId;
  }

  operation(signal?: AbortSignal): Operation {
    if (this.#closed)
      throw new OnlineError(
        "operation_cancelled",
        "The online client is closed.",
        { releaseId: this.boundReleaseId() },
      );
    return this.#createOperation(signal);
  }

  async read(
    relative: string,
    operation: Operation,
    validate?: (resource: OnlineResource) => void,
  ): Promise<Buffer> {
    const release = this.#release();
    if (this.#closed)
      throw new OnlineError(
        "operation_cancelled",
        "The online client is closed.",
        { releaseId: release.releaseId },
      );
    let safe: string;
    try {
      safe = resourcePathSchema.parse(relative);
    } catch {
      throw new OnlineError(
        "invalid_input",
        "A release-relative JSON resource path is required.",
        { releaseId: release.releaseId },
      );
    }
    const context = this.#context(operation);
    context.check();
    const bytes = await this.#load(
      safe,
      context,
      release.releaseId,
      release.releaseRoot,
      validate,
    );
    context.check();
    return bytes;
  }

  close(): void {
    if (this.#closed) return;
    this.#closed = true;
    for (const operation of [...this.#operations]) operation.dispose();
    this.#operations.clear();
  }

  #release(): InitializedRelease {
    if (!this.#state)
      throw new OnlineError(
        "invalid_release_data",
        "The online client is not initialized.",
      );
    return this.#state;
  }

  #context(operation: Operation): OperationContext {
    if (!(operation instanceof OperationContext) || !operation.belongsTo(this))
      throw new OnlineError(
        "invalid_input",
        "The operation does not belong to this client.",
        { releaseId: this.boundReleaseId() },
      );
    return operation;
  }

  async #io<T>(pending: Promise<T>, operation: Operation): Promise<T> {
    let rejectAbort: (() => void) | undefined;
    const aborted = new Promise<never>((_, reject) => {
      rejectAbort = () => {
        try {
          operation.check();
        } catch (error) {
          reject(error);
        }
      };
      operation.signal.addEventListener("abort", rejectAbort, { once: true });
      if (operation.signal.aborted) rejectAbort();
    });
    try {
      return await Promise.race([pending, aborted]);
    } finally {
      if (rejectAbort)
        operation.signal.removeEventListener("abort", rejectAbort);
    }
  }

  #createOperation(external: AbortSignal | undefined): OperationContext {
    const context = new OperationContext(this, {
      operationMs: this.#limits.operationMs,
      maxResources: this.#limits.maxResources,
      now: this.#limits.now,
      external,
      onDispose: (operation) => this.#operations.delete(operation),
    });
    this.#operations.add(context);
    return context;
  }

  async #initialize(): Promise<void> {
    const operation = this.#createOperation(this.#options.signal);
    try {
      if (this.#disk) await this.#io(this.#disk.canonicalize(), operation);
      this.#state = this.#options.offline
        ? await this.#initializeOffline(operation)
        : await this.#initializeOnline(operation);
    } finally {
      operation.dispose();
    }
  }

  async #initializeOnline(
    operation: OperationContext,
  ): Promise<InitializedRelease> {
    const pointerBytes = await this.#httpBytes(
      new URL("current.json", this.#options.entryUrl),
      operation,
    );
    const pointerJson = this.#parseJson(pointerBytes, "current.json");
    const version = protocolVersionOf(pointerJson);
    if (version !== 1)
      throw new OnlineError(
        "unsupported_protocol",
        `The data entry serves an unsupported protocol version (${version ?? "unknown"}).`,
        {},
      );
    let pointer;
    try {
      pointer = onlinePointerSchema.parse(pointerJson);
    } catch {
      throw new OnlineError(
        "invalid_release_data",
        "The current pointer is invalid.",
        {},
      );
    }
    if (pointer.state === "retired")
      throw new OnlineError("protocol_retired", pointer.upgrade, {});
    const releaseId = pointer.release_id;
    this.#initializingReleaseId = releaseId;
    const releaseRoot = releaseRootFor(
      pointer.manifest,
      this.#options.entryUrl,
    );
    const manifest = await this.#readResource(
      "manifest.json",
      operation,
      releaseId,
      releaseRoot,
      onlineManifestSchema,
    );
    const catalog = await this.#readResource(
      manifest.catalog,
      operation,
      releaseId,
      releaseRoot,
      onlineCatalogSchema,
    );
    operation.check();
    await this.#io(
      this.#writeLastSuccess(
        {
          protocol_version: 1,
          release_id: releaseId,
          manifest: pointer.manifest,
        },
        operation,
      ),
      operation,
    );
    return { releaseId, manifest, catalog, releaseRoot, accessMode: "online" };
  }

  async #initializeOffline(
    operation: OperationContext,
  ): Promise<InitializedRelease> {
    if (!this.#disk)
      throw new OnlineError(
        "offline_cache_miss",
        "File cache is disabled; offline initialization is unavailable.",
        {},
      );
    const raw = await this.#io(
      this.#disk.readRecord(operation.signal),
      operation,
    );
    if (raw === undefined)
      throw new OnlineError(
        "offline_cache_miss",
        "No successful initialization was cached.",
        {},
      );
    let record;
    try {
      record = lastSuccessSchema.parse(raw);
    } catch {
      throw new OnlineError(
        "invalid_cached_data",
        "The cached initialization record is invalid.",
      );
    }
    const releaseRoot = releaseRootFor(record.manifest, this.#options.entryUrl);
    this.#initializingReleaseId = record.release_id;
    const manifest = await this.#readResource(
      "manifest.json",
      operation,
      record.release_id,
      releaseRoot,
      onlineManifestSchema,
    );
    const catalog = await this.#readResource(
      manifest.catalog,
      operation,
      record.release_id,
      releaseRoot,
      onlineCatalogSchema,
    );
    return {
      releaseId: record.release_id,
      manifest,
      catalog,
      releaseRoot,
      accessMode: "offline",
    };
  }

  async #readResource<T>(
    relative: string,
    operation: OperationContext,
    releaseId: string,
    releaseRoot: URL,
    schema: z.ZodType<T>,
  ): Promise<T> {
    const bytes = await this.#load(relative, operation, releaseId, releaseRoot);
    const parsed = this.#parseJson(bytes, relative);
    let resource: T;
    try {
      resource = schema.parse(parsed);
    } catch {
      throw new OnlineError(
        "invalid_release_data",
        `Resource ${relative} failed schema validation.`,
        { releaseId },
      );
    }
    if ((resource as { release_id?: unknown }).release_id !== releaseId)
      throw new OnlineError(
        "invalid_release_data",
        `Resource ${relative} belongs to another release.`,
        { releaseId },
      );
    return resource;
  }

  async #load(
    relative: string,
    operation: OperationContext,
    releaseId: string,
    releaseRoot: URL,
    validate?: (resource: OnlineResource) => void,
  ): Promise<Buffer> {
    operation.charge(relative);
    const key = `${releaseId}\u0000${relative}`;
    const memo = this.#memory.get(key);
    if (memo) {
      try {
        this.#validate(relative, memo, releaseId, operation, validate);
        this.#memory.delete(key);
        this.#memory.set(key, memo);
        return Buffer.from(memo);
      } catch (error) {
        operation.check();
        if (this.#options.offline) throw this.#cachedError(error, releaseId);
        this.#memory.delete(key);
        this.#memoryBytes -= memo.byteLength;
      }
    }
    if (this.#disk) {
      let cached: Buffer | undefined;
      try {
        cached = await this.#io(
          this.#disk.read(releaseId, relative, operation.signal),
          operation,
        );
      } catch (error) {
        operation.check();
        if (this.#options.offline) throw this.#cachedError(error, releaseId);
        this.#diagnose(`Discarding unreadable cache entry ${relative}.`);
      }
      if (cached) {
        try {
          const valid = this.#validate(
            relative,
            cached,
            releaseId,
            operation,
            validate,
          );
          this.#remember(key, valid);
          return Buffer.from(valid);
        } catch (error) {
          operation.check();
          if (this.#options.offline) throw this.#cachedError(error, releaseId);
          this.#diagnose(`Discarding unreadable cache entry ${relative}.`);
        }
      } else if (this.#options.offline) {
        throw new OnlineError(
          "offline_cache_miss",
          `No cached copy of ${relative}.`,
          { releaseId },
        );
      }
    } else if (this.#options.offline) {
      throw new OnlineError("offline_cache_miss", "File cache is disabled.", {
        releaseId,
      });
    }
    if (this.#options.offline)
      throw new OnlineError(
        "offline_cache_miss",
        `No cached copy of ${relative}.`,
        { releaseId },
      );
    const fetched = await this.#httpBytes(
      new URL(relative, releaseRoot),
      operation,
    );
    const valid = this.#validate(
      relative,
      fetched,
      releaseId,
      operation,
      validate,
    );
    this.#remember(key, valid);
    if (this.#disk) {
      try {
        await this.#io(this.#disk.write(releaseId, relative, valid), operation);
      } catch (error) {
        operation.check();
        this.#diagnose(
          `Cache write failed for ${relative}: ${messageOf(error)}`,
        );
      }
    }
    operation.check();
    return Buffer.from(valid);
  }

  #validate(
    relative: string,
    buffer: Buffer,
    releaseId: string,
    operation: OperationContext,
    validate?: (resource: OnlineResource) => void,
  ): Buffer {
    const parsed = this.#parseJson(buffer, relative, releaseId);
    operation.check();
    let resource: OnlineResource;
    try {
      resource = parseOnlineResource(parsed, releaseId);
    } catch {
      throw new OnlineError(
        "invalid_release_data",
        `Resource ${relative} failed schema validation.`,
        { releaseId },
      );
    }
    const expected = expectedKinds(relative);
    if (expected && !expected.includes(resource.resource_kind))
      throw new OnlineError(
        "invalid_release_data",
        `Resource ${relative} has unexpected kind ${resource.resource_kind}.`,
        { releaseId },
      );
    if (
      resource.resource_kind === "navigation" ||
      resource.resource_kind === "postings"
    ) {
      const purpose = relative.startsWith("sources/index/")
        ? "sources"
        : relative.startsWith("search/scopes/")
          ? "scope"
          : relative.startsWith("search/exact/")
            ? "exact"
            : relative.startsWith("search/lexical/")
              ? "lexical"
              : undefined;
      if (purpose && resource.purpose !== purpose)
        throw new OnlineError(
          "invalid_release_data",
          "Published navigation purpose differs from its requested path.",
          { releaseId },
        );
    }
    const topicPath = /^topics\/([^/]+)\/([^/]+)\/index\.json$/.exec(relative);
    const chapterPath = /^chapters\/([^/]+)\.json$/.exec(relative);
    const sourcePath = /^sources\/([^/]+)\.json$/.exec(relative);
    if (
      (topicPath &&
        (resource.resource_kind !== "topic" ||
          resource.harness_id !== topicPath[1] ||
          resource.topic !== topicPath[2])) ||
      (chapterPath &&
        (resource.resource_kind !== "chapter" ||
          resource.chapter.edition_id !== chapterPath[1])) ||
      (sourcePath &&
        (resource.resource_kind !== "source" ||
          resource.reference.record.reference_id !== sourcePath[1]))
    )
      throw new OnlineError(
        "invalid_release_data",
        "Published resource identity differs from its requested path.",
        { releaseId },
      );
    validate?.(resource);
    operation.check();
    return buffer;
  }

  #parseJson(buffer: Buffer, relative: string, releaseId?: string): unknown {
    try {
      return JSON.parse(buffer.toString("utf8")) as unknown;
    } catch {
      throw new OnlineError(
        "invalid_release_data",
        `Resource ${relative} is not valid JSON.`,
        releaseId === undefined ? {} : { releaseId },
      );
    }
  }

  #cachedError(error: unknown, releaseId: string): OnlineError {
    return new OnlineError(
      "invalid_cached_data",
      error instanceof OnlineError
        ? error.message
        : `Cached resource for ${releaseId} is unreadable.`,
      { releaseId },
    );
  }

  #remember(key: string, bytes: Buffer): void {
    if (bytes.byteLength > this.#limits.memoryBytes) return;
    const existing = this.#memory.get(key);
    if (existing) {
      this.#memoryBytes -= existing.byteLength;
      this.#memory.delete(key);
    }
    this.#memory.set(key, bytes);
    this.#memoryBytes += bytes.byteLength;
    while (this.#memoryBytes > this.#limits.memoryBytes) {
      const oldest = this.#memory.keys().next();
      if (oldest.done) break;
      const value = this.#memory.get(oldest.value);
      this.#memory.delete(oldest.value);
      if (value) this.#memoryBytes -= value.byteLength;
    }
  }

  async #writeLastSuccess(
    record: {
      protocol_version: 1;
      release_id: string;
      manifest: string;
    },
    operation: Operation,
  ): Promise<void> {
    if (!this.#disk) return;
    try {
      await this.#disk.writeRecord(record, operation);
    } catch (error) {
      operation.check();
      this.#diagnose(
        `Could not record the last successful initialization: ${messageOf(error)}`,
      );
    }
  }

  #diagnose(message: string): void {
    if (this.#diagnostics++ < 10)
      this.#options.diagnostic(`agent-harness-wiki: ${message}`);
  }

  async #httpBytes(url: URL, operation: OperationContext): Promise<Buffer> {
    let attempt = 0;
    for (;;) {
      attempt += 1;
      let outcome: AttemptOutcome;
      try {
        outcome = await this.#attempt(url, operation);
      } catch (error) {
        operation.check();
        const failure =
          error instanceof OnlineError
            ? error
            : new OnlineError(
                "network_error",
                `Request to ${url.pathname} failed.`,
                { retryable: true, releaseId: this.boundReleaseId() },
              );
        if (attempt >= 2 || !isInCallRetryable(failure)) throw failure;
        await this.#backoff(operation, undefined, failure);
        continue;
      }
      if (outcome.status === 200 && outcome.body) return outcome.body;
      const failure = this.#statusError(outcome.status, url.pathname);
      if (attempt >= 2 || !isInCallRetryable(failure)) throw failure;
      await this.#backoff(operation, outcome.retryAfterMs, failure);
    }
  }

  async #attempt(
    url: URL,
    operation: OperationContext,
  ): Promise<AttemptOutcome> {
    await this.#semaphore.acquire(operation.signal);
    try {
      operation.check();
      let timedOut = false;
      const timeoutSignal = AbortSignal.timeout(this.#limits.requestMs);
      timeoutSignal.addEventListener("abort", () => (timedOut = true), {
        once: true,
      });
      const signal = AbortSignal.any([operation.signal, timeoutSignal]);
      let response: Response;
      try {
        response = await this.#limits.fetch(url, {
          signal,
          headers: { accept: "application/json" },
          redirect: "follow",
        });
      } catch {
        operation.check();
        throw this.#transportError(url, timedOut);
      }
      const retryAfterMs = parseRetryAfterHeader(
        response.headers.get("retry-after"),
        Date.now(),
      );
      if (response.status !== 200) {
        await response.body?.cancel().catch(() => {});
        return { status: response.status, body: undefined, retryAfterMs };
      }
      let body: Buffer;
      try {
        const chunks: Uint8Array[] = [];
        let size = 0;
        if (response.body) {
          const reader = response.body.getReader();
          try {
            for (;;) {
              const chunk = await reader.read();
              if (chunk.done) break;
              size += chunk.value.byteLength;
              if (size > this.#limits.maxResourceBytes) {
                await reader.cancel();
                throw new OnlineError(
                  "invalid_release_data",
                  "Published resource exceeds the size limit.",
                  { releaseId: this.boundReleaseId() },
                );
              }
              chunks.push(chunk.value);
            }
          } finally {
            reader.releaseLock();
          }
        }
        body = Buffer.concat(chunks, size);
      } catch (error) {
        operation.check();
        if (error instanceof OnlineError) throw error;
        throw this.#transportError(url, timedOut);
      }
      return { status: 200, body, retryAfterMs };
    } finally {
      this.#semaphore.release();
    }
  }

  #transportError(url: URL, timedOut: boolean): OnlineError {
    return timedOut
      ? new OnlineError(
          "request_timeout",
          `Request to ${url.pathname} timed out.`,
          { retryable: true, releaseId: this.boundReleaseId() },
        )
      : new OnlineError("network_error", `Request to ${url.pathname} failed.`, {
          retryable: true,
          releaseId: this.boundReleaseId(),
        });
  }

  #statusError(status: number, pathname: string): OnlineError {
    const options = { releaseId: this.boundReleaseId(), httpStatus: status };
    if (status === 404)
      return new OnlineError(
        "release_resource_missing",
        `Required resource ${pathname} is missing from the release.`,
        options,
      );
    if (status === 429)
      return new OnlineError(
        "rate_limited",
        `The data entry rate limited a request to ${pathname}.`,
        { ...options, retryable: true },
      );
    return new OnlineError(
      "http_error",
      `HTTP ${status} while reading ${pathname}.`,
      { ...options, retryable: retryableStatuses.has(status) },
    );
  }

  async #backoff(
    operation: OperationContext,
    retryAfterMs: number | undefined,
    failure: OnlineError,
  ): Promise<void> {
    const remaining = operation.remainingMs();
    if (remaining <= 0) operation.check();
    const requested = retryAfterMs ?? retryBackoffMs;
    if (requested > remaining) throw failure;
    try {
      await sleep(requested, operation.signal);
    } catch {
      // Cancelled while waiting; check below reports the precise error.
    }
    operation.check();
  }
}

function isInCallRetryable(error: OnlineError): boolean {
  return (
    error.code === "network_error" ||
    error.code === "request_timeout" ||
    error.code === "rate_limited" ||
    (error.code === "http_error" && error.retryable)
  );
}

function resolveLimits(internals: OnlineClientInternals): Limits {
  return {
    fetch: internals.fetch ?? globalThis.fetch,
    now: internals.now ?? (() => performance.now()),
    operationMs: internals.operationMs ?? operationDefaults.operationMs,
    requestMs: internals.requestMs ?? operationDefaults.requestMs,
    concurrency: internals.concurrency ?? operationDefaults.concurrency,
    maxResources: internals.maxResources ?? operationDefaults.maxResources,
    memoryBytes: internals.memoryBytes ?? operationDefaults.memoryBytes,
    diskBytes: internals.diskBytes ?? operationDefaults.diskBytes,
    maxResourceBytes:
      internals.maxResourceBytes ?? operationDefaults.maxResourceBytes,
  };
}

function resolveOptions(options: OnlineClientOptions): ResolvedOptions {
  const raw = options.dataUrl ?? defaultDataUrl;
  let entryUrl: URL;
  try {
    entryUrl = new URL(raw);
  } catch {
    throw new OnlineError("invalid_input", "The data URL is not a valid URL.");
  }
  if (entryUrl.protocol !== "http:" && entryUrl.protocol !== "https:")
    throw new OnlineError(
      "invalid_input",
      "The data URL must use http or https.",
    );
  if (
    entryUrl.username ||
    entryUrl.password ||
    entryUrl.search ||
    entryUrl.hash
  )
    throw new OnlineError(
      "invalid_input",
      "The data URL must be a directory without credentials, query or fragment.",
    );
  if (!entryUrl.pathname.endsWith("/")) entryUrl.pathname += "/";
  const fileCache = options.fileCache ?? true;
  const cacheRoot = fileCache
    ? options.cacheDir !== undefined
      ? path.resolve(options.cacheDir)
      : defaultCacheRoot({
          platform: process.platform,
          env: process.env,
          homedir: homedir(),
        })
    : undefined;
  return {
    entryUrl,
    offline: options.offline ?? false,
    cacheRoot:
      cacheRoot === undefined
        ? undefined
        : path.join(
            cacheRoot,
            "online-v1",
            createHash("sha256").update(entryUrl.href).digest("hex"),
          ),
    signal: options.signal,
    diagnostic: options.diagnostic ?? (() => {}),
  };
}
