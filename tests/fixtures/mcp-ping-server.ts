import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import * as z from "zod";

const server = new McpServer({ name: "ahw-toolchain-check", version: "0.0.0" });
server.registerTool(
  "ping",
  { inputSchema: z.strictObject({ value: z.string() }) },
  async ({ value }) => ({ content: [{ type: "text", text: value }] }),
);
await server.connect(new StdioServerTransport());
