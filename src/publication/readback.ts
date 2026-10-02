/**
 * Bounded public readback for a deployed online knowledge site.
 *
 * Reads the public current pointer, opens one release through the real online
 * query client, runs section-scoped representative reads of the five consumer
 * queries, and confirms the matching reader pages and navigation resources.
 * One shared deadline bounds the whole check; every HTTP read has its own
 * timeout. Readback only reads: it never writes and never rebinds the release
 * it observed, so a caller can record the actual public target after a
 * failure.
 */
import * as z from "zod";
import { consumerResultSchemas } from "../domain/consumer.js";
import {
  onlineManifestSchema,
  onlinePointerSchema,
  parseOnlineResource,
} from "../domain/online.js";
import type { Topic } from "../domain/schema.js";
import { OnlineError } from "../query/online-error.js";
import { OnlineQueryService } from "../query/online-service.js";

/** Default deadline for one complete readback. */
export const readbackDeadlineMs = 120_000;
/** Per-request timeout for readback HTTP reads. */
export const readbackRequestMs = 10_000;
/** Bound for the public pointer body. */
export const pointerByteLimit = 32 * 1024;
/** Bound for one release JSON resource read by readback. */
const resourceByteLimit = 32 * 1024 * 1024;
/** Bound for one reader page body. */
const pageByteLimit = 16 * 1024 * 1024;

export type PublishedPointer = z.infer<typeof onlinePointerSchema>;

export interface BoundedPointerOptions {
  dataUrl: string;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export interface ReadbackOptions {
  dataUrl: string;
  /** Fail when the current release differs from this exact identity. */
  expectedReleaseId?: string;
  /** Prefer this published product id (for example a production representative). */
  harness?: string;
  /** Pin the representative topic. */
  topic?: Topic;
  /** Pin the representative section so reads stay section-scoped. */
  sectionId?: string;
  signal?: AbortSignal;
  /** Override the default deadline; tests use small values. */
  timeoutMs?: number;
}

export interface ReadbackCheck {
  name: string;
  status: "passed" | "failed";
  detail?: string;
}

export interface ReadbackPage {
  url: string;
  status: number;
}

/** Representative inputs shared with the consumer CLI and MCP tools. */
export interface ReadbackInputs {
  harness: string;
  topic: Topic;
  surface_id: string;
  section_id: string | null;
  reference_id: string;
  compare_targets: { harness: string; surface_id: string }[];
  search_text: string;
}

export interface ReadbackReport {
  result: "passed" | "failed";
  access_mode: "online";
  release_id: string;
  knowledge_published_at: string;
  data_url: string;
  deadline_ms: number;
  checks: ReadbackCheck[];
  failures: string[];
  inputs: ReadbackInputs | null;
  pages: ReadbackPage[];
  started_at: string;
  finished_at: string;
}

/**
 * Read the public `current.json` pointer with one bounded request. This is the
 * independent confirmation used after a failed probe; it never consults a
 * cache and never changes the observed target.
 */
export async function readPublishedPointer(
  options: BoundedPointerOptions,
): Promise<PublishedPointer> {
  const entry = new URL(options.dataUrl);
  const signal = boundedSignal(
    options.signal,
    options.timeoutMs ?? readbackRequestMs,
  );
  const fetchImpl = globalThis.fetch;
  const response = await fetchImpl(new URL("current.json", entry), {
    signal,
    cache: "no-store",
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    if (response.body) await response.body.cancel().catch(() => {});
    throw new OnlineError(
      "http_error",
      `Pointer read failed (${response.status}).`,
      { retryable: false, httpStatus: response.status },
    );
  }
  const bytes = await readBoundedBody(response, pointerByteLimit);
  let body: unknown;
  try {
    body = JSON.parse(bytes.toString("utf8"));
  } catch {
    throw new OnlineError("invalid_release_data", "Pointer is not valid JSON.");
  }
  try {
    return onlinePointerSchema.parse(body);
  } catch {
    throw new OnlineError("invalid_release_data", "Pointer is invalid.");
  }
}

/** Site root for a v1 data entry, used to locate the matching reader pages. */
export function siteRootFor(dataUrl: string): URL {
  const entry = new URL(dataUrl);
  const marker = "data/v1/";
  const pathname = entry.pathname.endsWith("/")
    ? entry.pathname
    : `${entry.pathname}/`;
  if (!pathname.endsWith(marker))
    throw new Error(`Data URL must end with ${marker}`);
  const root = new URL(entry);
  root.pathname = pathname.slice(0, -marker.length) || "/";
  root.search = "";
  root.hash = "";
  return root;
}

function boundedSignal(
  signal: AbortSignal | undefined,
  timeoutMs: number,
): AbortSignal {
  const timeout = AbortSignal.timeout(timeoutMs);
  return signal ? AbortSignal.any([signal, timeout]) : timeout;
}

function brief(error: unknown): string {
  if (error instanceof z.ZodError)
    return error.issues
      .slice(0, 5)
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ")
      .slice(0, 500);
  return (error instanceof Error ? error.message : String(error)).slice(0, 500);
}

/** Read a response body under a hard byte ceiling, cancelling oversized reads. */
async function readBoundedBody(
  response: Response,
  limitBytes: number,
): Promise<Buffer> {
  if (!response.body) return Buffer.alloc(0);
  const chunks: Buffer[] = [];
  let bytes = 0;
  for await (const chunk of response.body) {
    bytes += chunk.byteLength;
    if (bytes > limitBytes) {
      await response.body.cancel().catch(() => {});
      throw new OnlineError(
        "invalid_release_data",
        `Response body exceeds ${limitBytes} bytes.`,
      );
    }
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function fetchJson(
  url: URL,
  signal: AbortSignal,
  timeoutMs: number,
): Promise<unknown> {
  const response = await globalThis.fetch(url, {
    signal: boundedSignal(signal, timeoutMs),
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    if (response.body) await response.body.cancel().catch(() => {});
    throw new OnlineError(
      "http_error",
      `Read failed (${response.status}) for ${url.pathname}`,
      { retryable: false, httpStatus: response.status },
    );
  }
  const bytes = await readBoundedBody(response, resourceByteLimit);
  try {
    return JSON.parse(bytes.toString("utf8"));
  } catch {
    throw new OnlineError(
      "invalid_release_data",
      `Read failed for ${url.pathname}`,
    );
  }
}

export async function verifyPublishedSite(
  options: ReadbackOptions,
): Promise<ReadbackReport> {
  const startedAt = new Date().toISOString();
  const deadline = options.timeoutMs ?? readbackDeadlineMs;
  const requestMs = readbackRequestMs;
  const signal = boundedSignal(options.signal, deadline);
  const entry = new URL(options.dataUrl);
  const checks: ReadbackCheck[] = [];
  const pages: ReadbackPage[] = [];

  let releaseId = "";
  let publishedAt = "";
  let inputs: ReadbackInputs | null = null;

  const record = (name: string, status: "passed" | "failed", detail?: string) =>
    void checks.push(
      detail === undefined ? { name, status } : { name, status, detail },
    );
  const run = async (
    name: string,
    work: () => Promise<string | void> | string | void,
  ): Promise<boolean> => {
    try {
      const detail = await work();
      record(name, "passed", detail || undefined);
      return true;
    } catch (error) {
      record(name, "failed", brief(error));
      return false;
    }
  };
  const finish = (): ReadbackReport => {
    const failures = checks
      .filter((check) => check.status === "failed")
      .map((check) => check.name);
    return {
      result: failures.length ? "failed" : "passed",
      access_mode: "online",
      release_id: releaseId,
      knowledge_published_at: publishedAt,
      data_url: options.dataUrl,
      deadline_ms: deadline,
      checks,
      failures,
      inputs,
      pages,
      started_at: startedAt,
      finished_at: new Date().toISOString(),
    };
  };

  let manifestPath = "";
  const pointerRead = await run("public pointer", async () => {
    const pointer = await readPublishedPointer({
      dataUrl: options.dataUrl,
      signal,
      timeoutMs: requestMs,
    });
    if (pointer.state !== "active")
      throw new OnlineError("protocol_retired", pointer.upgrade);
    releaseId = pointer.release_id;
    manifestPath = pointer.manifest;
    return pointer.release_id;
  });
  if (!pointerRead) return finish();
  const releaseRoot = new URL(".", new URL(manifestPath, entry));

  let service: OnlineQueryService | undefined;
  try {
    service = await OnlineQueryService.open({
      dataUrl: options.dataUrl,
      fileCache: false,
      signal,
    });
    if (service.releaseId !== releaseId)
      throw new Error(
        `Client bound ${service.releaseId}, pointer says ${releaseId}.`,
      );
    publishedAt = service.metadata.knowledge_published_at;
    record("open release", "passed", service.releaseId);
  } catch (error) {
    record("open release", "failed", brief(error));
    return finish();
  }

  try {
    if (options.expectedReleaseId)
      await run("expected release", () => {
        if (releaseId !== options.expectedReleaseId)
          throw new Error(
            `Current release is ${releaseId}, expected ${options.expectedReleaseId}.`,
          );
        return options.expectedReleaseId;
      });

    await run("release navigation", async () => {
      const manifest = onlineManifestSchema.parse(
        await fetchJson(
          new URL("manifest.json", releaseRoot),
          signal,
          requestMs,
        ),
      );
      if (manifest.release_id !== releaseId)
        throw new Error("Manifest release identity differs.");
      if (manifest.knowledge_published_at !== publishedAt)
        throw new Error("Manifest publication time differs.");
      parseOnlineResource(
        await fetchJson(
          new URL(manifest.search, releaseRoot),
          signal,
          requestMs,
        ),
        releaseId,
      );
      parseOnlineResource(
        await fetchJson(
          new URL(manifest.sources, releaseRoot),
          signal,
          requestMs,
        ),
        releaseId,
      );
      return `${manifest.profile} ${manifest.knowledge_published_at}`;
    });

    let catalog:
      z.infer<typeof consumerResultSchemas.list_harnesses> | undefined;
    const listed = await run("list", async () => {
      catalog = consumerResultSchemas.list_harnesses.parse(
        await service.listHarnesses({ scope: "catalog", limit: 20 }, signal),
      );
      if (catalog.release_id !== releaseId)
        throw new Error("List release identity differs.");
      if (!catalog.items.length)
        throw new Error("Catalog exposes no products.");
      return `${catalog.items.length} products`;
    });
    if (!listed || !catalog) return finish();

    const candidates = catalog.items.filter(
      (product) => product.topics.length && product.surfaces.length,
    );
    if (!candidates.length) {
      record(
        "representative inputs",
        "failed",
        "Catalog has no product with topics and surfaces.",
      );
      return finish();
    }
    if (
      options.harness &&
      !candidates.some((product) => product.harness_id === options.harness)
    ) {
      record(
        "representative inputs",
        "failed",
        `Catalog has no ${options.harness} with investigated topics.`,
      );
      return finish();
    }
    const owns = (topic: Topic) =>
      candidates.filter((product) => product.topics.includes(topic));
    const pair = candidates
      .flatMap((product) => product.topics.map((topic) => ({ product, topic })))
      .find(({ topic }) => owns(topic).length >= 2);
    const product =
      candidates.find((entry) => entry.harness_id === options.harness) ??
      pair?.product ??
      candidates[0]!;
    const topic =
      options.topic && product.topics.includes(options.topic)
        ? options.topic
        : (pair?.topic ?? product.topics[0]!);
    if (options.topic && !product.topics.includes(options.topic)) {
      record(
        "representative inputs",
        "failed",
        `${product.harness_id} has no investigated ${options.topic}.`,
      );
      return finish();
    }

    let search:
      z.infer<typeof consumerResultSchemas.search_knowledge> | undefined;
    const searched = await run("search", async () => {
      search = consumerResultSchemas.search_knowledge.parse(
        await service.searchKnowledge(
          { harness: product.harness_id, topic },
          signal,
        ),
      );
      if (search.release_id !== releaseId)
        throw new Error("Search release identity differs.");
      if (search.status !== "ok" || !search.items.length)
        throw new Error(`Search is ${search.status}.`);
      return `${search.items.length} items`;
    });
    if (!searched || !search) return finish();

    const item =
      (options.sectionId
        ? search.items.find((entry) => entry.section_id === options.sectionId)
        : undefined) ?? search.items[0]!;
    const sectionId = options.sectionId ?? item.section_id;
    const surfaceId = item.surface_ids[0]!;
    const searchText =
      /[\p{L}\p{N}]{4,}/u.exec(item.preview)?.[0] ?? item.section_id;

    let referenceId: string | undefined;
    const topicRead = await run("topic", async () => {
      const result = consumerResultSchemas.get_topic.parse(
        await service.getTopic(
          {
            harness: product.harness_id,
            topic,
            surface_id: surfaceId,
            section_id: sectionId,
          },
          signal,
        ),
      );
      if (result.status !== "ok") throw new Error(`Topic is ${result.status}.`);
      if (result.release_id !== releaseId)
        throw new Error("Topic release identity differs.");
      referenceId =
        result.source_scope[0]?.reference_id ?? result.source_refs[0];
      return `${result.edition_id} ${sectionId}`;
    });
    if (!topicRead) return finish();
    if (!referenceId) {
      record(
        "source",
        "failed",
        "Representative section declares no source reference.",
      );
    }
    inputs = {
      harness: product.harness_id,
      topic,
      surface_id: surfaceId,
      section_id: sectionId,
      reference_id: referenceId ?? "",
      compare_targets: owns(topic)
        .slice(0, 2)
        .map((owner) => ({
          harness: owner.harness_id,
          surface_id: owner.surfaces[0]!.surface_id,
        })),
      search_text: searchText,
    };

    await run("compare", async () => {
      if (inputs!.compare_targets.length < 2)
        throw new Error(
          "Fewer than two products own the representative topic.",
        );
      const result = consumerResultSchemas.compare_topics.parse(
        await service.compareTopics(
          { topic, targets: inputs!.compare_targets },
          signal,
        ),
      );
      if (result.release_id !== releaseId)
        throw new Error("Compare release identity differs.");
      if (!result.results.some((entry) => entry.status === "ok"))
        throw new Error("Compare returned no readable target.");
      return `${inputs!.compare_targets.length} targets`;
    });

    if (referenceId)
      await run("source", async () => {
        const result = consumerResultSchemas.get_source.parse(
          await service.getSource({ reference_id: referenceId! }, signal),
        );
        if (result.status !== "ok")
          throw new Error(`Source ${referenceId} is ${result.status}.`);
        return referenceId;
      });

    await run("reader pages", async () => {
      const root = siteRootFor(options.dataUrl);
      const relatives = [
        `harnesses/${product.harness_id}/${topic}.html`,
        `harnesses/${product.harness_id}/index.html`,
        ...(referenceId ? [`sources/${referenceId}.html`] : []),
      ];
      for (const relative of relatives) {
        const url = new URL(relative, root);
        const response = await globalThis.fetch(url, {
          signal: boundedSignal(signal, requestMs),
          headers: { accept: "text/html" },
        });
        pages.push({ url: url.href, status: response.status });
        if (!response.ok) {
          if (response.body) await response.body.cancel().catch(() => {});
          throw new Error(`${relative} returned ${response.status}.`);
        }
        const html = (await readBoundedBody(response, pageByteLimit)).toString(
          "utf8",
        );
        if (!html.includes(releaseId))
          throw new Error(`${relative} lacks release identity.`);
      }
      return `${relatives.length} pages`;
    });
  } finally {
    service.close();
  }

  return finish();
}
