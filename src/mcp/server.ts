import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { QueryService } from "../query/service.js";
import {
  compareSchema,
  listSchema,
  searchSchema,
  sourceRequestSchema,
  topicRequestSchema,
} from "../query/schema.js";

export function mcpResponse(value: Record<string, unknown>) {
  const result = {
    structuredContent: value,
    content: [{ type: "text" as const, text: JSON.stringify(value) }],
  };
  if (Buffer.byteLength(JSON.stringify(result), "utf8") <= 128 * 1024)
    return result;
  const bounded =
    "sections" in value
      ? {
          release_id: value.release_id,
          status: "response_too_large",
          harness_id: value.harness_id,
          topic: value.topic,
          edition_id: value.edition_id,
          resolution: value.resolution,
          sections: value.sections,
          message: "Read a section by section_id.",
        }
      : {
          release_id: value.release_id,
          status: "response_too_large",
          message: "Narrow the query.",
        };
  return {
    structuredContent: bounded,
    content: [{ type: "text" as const, text: JSON.stringify(bounded) }],
  };
}

export function createMcpServer(service: QueryService): McpServer {
  const server = new McpServer({
    name: "agent-harness-wiki",
    version: "0.0.0",
  });
  const readonly = { readOnlyHint: true };
  server.registerTool(
    "list_harnesses",
    { inputSchema: listSchema, annotations: readonly },
    (input) => mcpResponse(service.listHarnesses(input)),
  );
  server.registerTool(
    "get_topic",
    { inputSchema: topicRequestSchema, annotations: readonly },
    (input) => mcpResponse(service.getTopic(input)),
  );
  server.registerTool(
    "search_knowledge",
    { inputSchema: searchSchema, annotations: readonly },
    async (input) => mcpResponse(await service.searchKnowledge(input)),
  );
  server.registerTool(
    "compare_topics",
    { inputSchema: compareSchema, annotations: readonly },
    (input) => mcpResponse(service.compareTopics(input)),
  );
  server.registerTool(
    "get_source",
    { inputSchema: sourceRequestSchema, annotations: readonly },
    (input) => mcpResponse(service.getSource(input)),
  );
  server.server.onclose = () => service.close();
  return server;
}

export async function serveMcp(service: QueryService): Promise<void> {
  await createMcpServer(service).connect(new StdioServerTransport());
}
