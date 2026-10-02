import { expect, test } from "vitest";
import { mcpResponse } from "../../src/mcp/server.js";

test("oversized whole chapter gives a bounded section index", () => {
  const result = mcpResponse({
    release_id: "fixture",
    knowledge_published_at: "2026-10-02T00:00:00Z",
    access_mode: "offline",
    history_scope: "current_and_previous",
    status: "ok",
    body: "x".repeat(70 * 1024),
    sections: [{ section_id: "first" }],
    resolution: { match_kind: "source_only" },
  });
  expect(result.structuredContent.status).toBe("response_too_large");
  expect(result.structuredContent).toMatchObject({
    knowledge_published_at: "2026-10-02T00:00:00Z",
    access_mode: "offline",
    history_scope: "current_and_previous",
  });
  expect(result.structuredContent.sections).toEqual([{ section_id: "first" }]);
  expect(Buffer.byteLength(JSON.stringify(result), "utf8")).toBeLessThanOrEqual(
    128 * 1024,
  );
});
