import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { expect, test } from "vitest";

test("official SDK client and server exchange one stdio tool call", async () => {
  const server = fileURLToPath(
    new URL("../fixtures/mcp-ping-server.ts", import.meta.url),
  );
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ["--import", "tsx", server],
    stderr: "pipe",
  });
  const client = new Client({ name: "ahw-toolchain-test", version: "0.0.0" });
  try {
    await client.connect(transport);
    expect((await client.listTools()).tools.map((tool) => tool.name)).toEqual([
      "ping",
    ]);
    const result = await client.callTool({
      name: "ping",
      arguments: { value: "ready" },
    });
    expect(result.isError).not.toBe(true);
    expect(result.content).toContainEqual({ type: "text", text: "ready" });
  } finally {
    await client.close();
    await transport.close();
  }
}, 15_000);
