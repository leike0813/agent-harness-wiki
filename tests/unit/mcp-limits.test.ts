import { expect, test } from "vitest";
import { mcpResponse } from "../../src/mcp/server.js";

test("oversized whole chapter gives a bounded section index", () => {
  const result = mcpResponse({
    release_id: "fixture",
    status: "ok",
    body: "x".repeat(70 * 1024),
    sections: [{ section_id: "first" }],
    resolution: { match_kind: "source_only" },
  });
  expect(result.structuredContent.status).toBe("response_too_large");
  expect(result.structuredContent.sections).toEqual([{ section_id: "first" }]);
  expect(Buffer.byteLength(JSON.stringify(result), "utf8")).toBeLessThanOrEqual(
    128 * 1024,
  );
});
