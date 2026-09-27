import { expect, test } from "vitest";
import { clipExcerpt, mcpResponse } from "../../src/mcp/server.js";

test("MCP bounds Unicode excerpts and rejects oversized responses explicitly", () => {
  const clipped = clipExcerpt("🔎".repeat(2001));
  expect(Array.from(clipped.excerpt)).toHaveLength(2000);
  expect(clipped.excerpt_truncated).toBe(true);
  expect(clipExcerpt("short").excerpt_truncated).toBe(false);
  const large = mcpResponse({
    release_id: "fixture",
    data: "x".repeat(70 * 1024),
  });
  expect(large.isError).toBe(true);
  expect(large.structuredContent.code).toBe("response_too_large");
  expect(large.content[0].text).toBe(JSON.stringify(large.structuredContent));
});
