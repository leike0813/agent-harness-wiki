import { expect, test, vi } from "vitest";
import {
  isSiteSourceId,
  readSiteSource,
  SiteSourceError,
} from "../../src/site/source-reader.js";

const RELEASE = `web-v1-${"a".repeat(40)}`;
const OTHER_RELEASE = `web-v1-${"b".repeat(40)}`;
const BASE = "https://wiki.example/agent-harness-wiki/";
const REQUEST = {
  base: BASE,
  releaseId: RELEASE,
  referenceId: "ref-demo",
};
const RESOURCE_URL = `${BASE}data/v1/releases/${RELEASE}/sources/ref-demo.json`;

const chapterResource = (releaseId = RELEASE) => ({
  protocol_version: 1,
  release_id: releaseId,
  resource_kind: "source",
  reference: {
    kind: "chapter",
    record: {
      schema_version: 2,
      record_kind: "fixture" as const,
      reference_id: "ref-demo",
      harness_id: "demo-cli",
      snapshot_id: "snap-demo",
      locator: {
        kind: "file_lines" as const,
        file: "src/demo.ts",
        start: 1,
        end: 20,
      },
      official_url: "https://example.com/demo",
      excerpt: "demo excerpt",
    },
  },
});

const catalogResource = (referenceId = "ref-demo") => ({
  protocol_version: 1,
  release_id: RELEASE,
  resource_kind: "source",
  reference: {
    kind: "catalog" as const,
    record: {
      reference_id: referenceId,
      harness_id: "demo-cli",
      official_url: "https://example.com/docs",
      captured_at: "2026-09-29T00:00:00.000Z",
      snapshot: {
        kind: "git_commit" as const,
        sha256: "c".repeat(64),
        revision: "d".repeat(40),
      },
      locator: "README.md#install",
      excerpt: "catalog excerpt",
    },
  },
});

const respond = (handler: (url: string) => Response) =>
  vi.fn((input: RequestInfo | URL) => Promise.resolve(handler(String(input))));
const rejectWith = (error: Error) => vi.fn(() => Promise.reject(error));
const hang = (seen?: { signal?: AbortSignal }) =>
  vi.fn(
    (_input: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        if (seen && init?.signal) seen.signal = init.signal;
        init?.signal?.addEventListener("abort", () =>
          reject(init?.signal?.reason),
        );
      }),
  );
const asFetch = (mock: ReturnType<typeof vi.fn>) =>
  mock as unknown as typeof globalThis.fetch;
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const codeOf = async (promise: Promise<unknown>) => {
  const error = await promise.then(
    () => undefined,
    (reason: unknown) => reason,
  );
  expect(error).toBeInstanceOf(SiteSourceError);
  return (error as SiteSourceError).code;
};

test.each([
  ["章节来源", chapterResource()],
  ["目录来源", catalogResource()],
])("%s 只按固定发布路径请求并解析", async (_name, resource) => {
  const fetchImpl = respond(() => json(resource));
  const source = await readSiteSource(REQUEST, asFetch(fetchImpl));
  expect(source).toEqual(resource);
  expect(String(fetchImpl.mock.calls[0]?.[0])).toBe(RESOURCE_URL);
});

test("base 缺少结尾斜杠时仍解析到同一发布路径", async () => {
  const fetchImpl = respond(() => json(chapterResource()));
  await readSiteSource(
    { ...REQUEST, base: "/agent-harness-wiki" },
    asFetch(fetchImpl),
  );
  expect(String(fetchImpl.mock.calls[0]?.[0])).toBe(
    `/agent-harness-wiki/data/v1/releases/${RELEASE}/sources/ref-demo.json`,
  );
});

test.each([
  ["非法引用 ID", { referenceId: "../current" }],
  ["非法发布 ID", { releaseId: "local-release" }],
])("%s 时不发起请求", async (_name, override) => {
  const fetchImpl = respond(() => json(chapterResource()));
  expect(
    await codeOf(
      readSiteSource({ ...REQUEST, ...override }, asFetch(fetchImpl)),
    ),
  ).toBe("invalid_id");
  expect(fetchImpl).not.toHaveBeenCalled();
});

test("只接受与在线来源 ID 相同的引用", () => {
  expect(isSiteSourceId("ref-demo")).toBe(true);
  expect(isSiteSourceId("../current")).toBe(false);
});

test.each(["http://example.com/docs", "javascript:alert(1)"])(
  "拒绝非 HTTPS 官方链接 %s",
  async (officialUrl) => {
    const resource = catalogResource();
    resource.reference.record.official_url = officialUrl;
    expect(
      await codeOf(
        readSiteSource(REQUEST, asFetch(respond(() => json(resource)))),
      ),
    ).toBe("invalid_data");
  },
);

test.each([
  [
    "404 表示本次发布未保留该来源",
    () => new Response("missing", { status: 404 }),
    "not_found",
  ],
  ["其他 HTTP 状态是读取失败", () => json({}, 500), "read_failed"],
  [
    "非 JSON 正文被拒绝",
    () => new Response("<html>", { status: 200 }),
    "invalid_data",
  ],
  [
    "结构不符的正文被拒绝",
    () => json({ resource_kind: "catalog" }),
    "invalid_data",
  ],
  [
    "发布身份不符的正文被拒绝",
    () => json(chapterResource(OTHER_RELEASE)),
    "invalid_data",
  ],
  [
    "引用 ID 不符的正文被拒绝",
    () => json(catalogResource("ref-other")),
    "invalid_data",
  ],
])("%s", async (_name, respondWith, code) => {
  expect(
    await codeOf(readSiteSource(REQUEST, asFetch(respond(respondWith)))),
  ).toBe(code);
});

test.each([
  ["404", 404],
  ["500", 500],
])("%s 拒绝时释放未读取的响应正文流", async (_name, status) => {
  let released = false;
  const body = new ReadableStream<Uint8Array>({
    cancel() {
      released = true;
    },
  });
  await codeOf(
    readSiteSource(
      REQUEST,
      asFetch(respond(() => new Response(body, { status }))),
    ),
  );
  expect(released).toBe(true);
});

test("网络失败与超过 16 MiB 的正文流分别拒绝", async () => {
  expect(
    await codeOf(
      readSiteSource(REQUEST, asFetch(rejectWith(new Error("offline")))),
    ),
  ).toBe("read_failed");

  const chunk = new Uint8Array(1024 * 1024);
  let sent = 0;
  const fetchImpl = respond(() => {
    let closed = false;
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (closed) return;
        sent += chunk.byteLength;
        controller.enqueue(chunk.slice());
        if (sent > 16 * 1024 * 1024) {
          closed = true;
          controller.close();
        }
      },
    });
    return new Response(stream, { status: 200 });
  });
  expect(await codeOf(readSiteSource(REQUEST, asFetch(fetchImpl)))).toBe(
    "too_large",
  );
  expect(sent).toBeGreaterThan(16 * 1024 * 1024);
});

test("调用方取消时中止请求并保留取消原因", async () => {
  const seen: { signal?: AbortSignal } = {};
  const controller = new AbortController();
  const reason = new Error("用户离开页面");
  const pending = readSiteSource(
    { ...REQUEST, signal: controller.signal },
    asFetch(hang(seen)),
  );
  const settled = pending.then(
    () => undefined,
    (raised: unknown) => raised,
  );
  controller.abort(reason);
  expect(await settled).toBe(reason);
  expect(seen.signal?.aborted).toBe(true);
});

test("10 秒无响应时以读取失败结束", async () => {
  vi.useFakeTimers();
  try {
    const pending = readSiteSource(REQUEST, asFetch(hang()));
    const settled = codeOf(pending);
    await vi.advanceTimersByTimeAsync(10_000);
    expect(await settled).toBe("read_failed");
  } finally {
    vi.useRealTimers();
  }
});
