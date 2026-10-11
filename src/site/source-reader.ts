/** Reads only `sources/<reference-id>.json` of the pinned release; a response whose release or reference identity differs is rejected. */
import * as z from "zod";
import {
  onlineIdSchema,
  onlineReleaseIdSchema,
  onlineSourceSchema,
} from "../domain/online.js";

export type SiteSource = z.infer<typeof onlineSourceSchema>;
export type SiteSourceErrorCode =
  "invalid_id" | "not_found" | "read_failed" | "invalid_data" | "too_large";

export class SiteSourceError extends Error {
  constructor(
    readonly code: SiteSourceErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "SiteSourceError";
  }
}

export interface SiteSourceRequest {
  /** Site base path, with or without its trailing slash. */
  base: string;
  releaseId: string;
  referenceId: string;
  signal?: AbortSignal;
}

const maxDecodedBytes = 16 * 1024 * 1024;
const requestTimeoutMs = 10_000;

export function isSiteSourceId(value: string): boolean {
  return onlineIdSchema.safeParse(value).success;
}

function transportError(
  caller: AbortSignal | undefined,
  deadline: AbortSignal,
  error: unknown,
): Error {
  // A cancelled caller already knows why; only our own deadline becomes an error.
  if (caller?.aborted)
    return error instanceof Error ? error : new Error("来源读取已取消。");
  if (deadline.aborted)
    return new SiteSourceError("read_failed", "读取来源资源超时。", {
      cause: error,
    });
  return new SiteSourceError("read_failed", "读取来源资源失败。", {
    cause: error,
  });
}

async function readDecodedBody(
  response: Response,
  caller: AbortSignal | undefined,
  deadline: AbortSignal,
): Promise<string> {
  if (!response.body)
    throw new SiteSourceError("invalid_data", "来源资源缺少正文流。");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  try {
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > maxDecodedBytes) {
        await reader.cancel();
        throw new SiteSourceError("too_large", "来源资源超过 16 MiB 上限。");
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
  } catch (error) {
    if (error instanceof SiteSourceError) throw error;
    await reader.cancel().catch(() => {});
    throw transportError(caller, deadline, error);
  }
  return text + decoder.decode();
}

export async function readSiteSource(
  request: SiteSourceRequest,
  fetchImpl: typeof globalThis.fetch = globalThis.fetch,
): Promise<SiteSource> {
  const referenceId = onlineIdSchema.safeParse(request.referenceId);
  const releaseId = onlineReleaseIdSchema.safeParse(request.releaseId);
  if (!referenceId.success || !releaseId.success)
    throw new SiteSourceError("invalid_id", "来源 ID 或发布 ID 不合法。");
  const base = request.base.endsWith("/") ? request.base : `${request.base}/`;
  const url = `${base}data/v1/releases/${releaseId.data}/sources/${referenceId.data}.json`;
  const deadline = new AbortController();
  const timer = setTimeout(() => deadline.abort(), requestTimeoutMs);
  const signal = request.signal
    ? AbortSignal.any([request.signal, deadline.signal])
    : deadline.signal;
  try {
    let response: Response;
    try {
      response = await fetchImpl(url, { signal });
    } catch (error) {
      throw transportError(request.signal, deadline.signal, error);
    }
    if (response.status === 404 || !response.ok) {
      await response.body?.cancel().catch(() => {});
      throw new SiteSourceError(
        response.status === 404 ? "not_found" : "read_failed",
        response.status === 404
          ? `本次发布没有保留来源 ${referenceId.data}。`
          : `来源资源响应异常：HTTP ${response.status}。`,
      );
    }
    const text = await readDecodedBody(
      response,
      request.signal,
      deadline.signal,
    );
    let payload: unknown;
    try {
      payload = JSON.parse(text);
    } catch (error) {
      throw new SiteSourceError("invalid_data", "来源资源不是有效 JSON。", {
        cause: error,
      });
    }
    const source = onlineSourceSchema.safeParse(payload);
    if (!source.success)
      throw new SiteSourceError("invalid_data", "来源资源不符合在线发布结构。");
    if (!source.data.reference.record.official_url.startsWith("https://"))
      throw new SiteSourceError("invalid_data", "官方来源必须使用 HTTPS。");
    if (source.data.release_id !== releaseId.data)
      throw new SiteSourceError(
        "invalid_data",
        "来源资源的发布身份与当前发布不同。",
      );
    if (source.data.reference.record.reference_id !== referenceId.data)
      throw new SiteSourceError(
        "invalid_data",
        "来源资源的引用 ID 与请求不同。",
      );
    return source.data;
  } finally {
    clearTimeout(timer);
  }
}
