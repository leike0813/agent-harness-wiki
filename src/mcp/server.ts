import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import type * as z from "zod";
import { onlineErrorResult } from "../query/online-error.js";
import {
  compareSchema,
  listSchema,
  searchSchema,
  sourceRequestSchema,
  topicRequestSchema,
} from "../query/schema.js";

type Result = Record<string, unknown> | Promise<Record<string, unknown>>;
export interface QueryOperations {
  listHarnesses(
    input: z.input<typeof listSchema>,
    signal?: AbortSignal,
  ): Result;
  getTopic(
    input: z.input<typeof topicRequestSchema>,
    signal?: AbortSignal,
  ): Result;
  searchKnowledge(
    input: z.input<typeof searchSchema>,
    signal?: AbortSignal,
  ): Result;
  compareTopics(
    input: z.input<typeof compareSchema>,
    signal?: AbortSignal,
  ): Result;
  getSource(
    input: z.input<typeof sourceRequestSchema>,
    signal?: AbortSignal,
  ): Result;
  close(): void;
}

export function mcpResponse(value: Record<string, unknown>) {
  const result = {
    structuredContent: value,
    content: [{ type: "text" as const, text: JSON.stringify(value) }],
  };
  if (Buffer.byteLength(JSON.stringify(result), "utf8") <= 128 * 1024)
    return result;
  const bounded: Record<string, unknown> =
    "sections" in value
      ? {
          release_id: value.release_id,
          ...(value.knowledge_published_at
            ? {
                knowledge_published_at: value.knowledge_published_at,
                access_mode: value.access_mode,
              }
            : {}),
          ...(value.history_scope
            ? { history_scope: value.history_scope }
            : {}),
          status: "response_too_large",
          harness_id: value.harness_id,
          surface_id: value.surface_id,
          topic: value.topic,
          edition_id: value.edition_id,
          resolution: value.resolution,
          sections: value.sections,
          message: "Read a section by section_id.",
        }
      : {
          release_id: value.release_id,
          ...(value.knowledge_published_at
            ? {
                knowledge_published_at: value.knowledge_published_at,
                access_mode: value.access_mode,
              }
            : {}),
          ...(value.history_scope
            ? { history_scope: value.history_scope }
            : {}),
          status: "response_too_large",
          message: "Narrow the query.",
        };
  const response = {
    structuredContent: bounded,
    content: [{ type: "text" as const, text: JSON.stringify(bounded) }],
  };
  if (Buffer.byteLength(JSON.stringify(response), "utf8") > 128 * 1024) {
    delete bounded.sections;
    bounded.message = "Read a section by section_id or narrow the query.";
    response.content[0]!.text = JSON.stringify(bounded);
  }
  return response;
}

export function createMcpServer(
  service: QueryOperations,
  options: { version?: string; online?: boolean } = {},
): McpServer {
  const server = new McpServer({
    name: "agent-harness-wiki",
    version: options.version ?? "0.0.0",
  });
  const readonly = { readOnlyHint: true };
  const call = async (work: () => Result) => {
    try {
      return mcpResponse(await work());
    } catch (error) {
      if (!options.online) throw error;
      return { ...mcpResponse(onlineErrorResult(error)), isError: true };
    }
  };
  server.registerTool(
    "list_harnesses",
    { inputSchema: listSchema, annotations: readonly },
    (input, ctx) => call(() => service.listHarnesses(input, ctx.mcpReq.signal)),
  );
  server.registerTool(
    "get_topic",
    { inputSchema: topicRequestSchema, annotations: readonly },
    (input, ctx) => call(() => service.getTopic(input, ctx.mcpReq.signal)),
  );
  server.registerTool(
    "search_knowledge",
    {
      inputSchema: searchSchema,
      annotations: readonly,
      description: options.online
        ? "Search published current sections using lexical matching only; no semantic model."
        : "Search local published sections with lexical and available semantic recall.",
    },
    (input, ctx) =>
      call(() => service.searchKnowledge(input, ctx.mcpReq.signal)),
  );
  server.registerTool(
    "compare_topics",
    { inputSchema: compareSchema, annotations: readonly },
    (input, ctx) => call(() => service.compareTopics(input, ctx.mcpReq.signal)),
  );
  server.registerTool(
    "get_source",
    { inputSchema: sourceRequestSchema, annotations: readonly },
    (input, ctx) => call(() => service.getSource(input, ctx.mcpReq.signal)),
  );
  server.server.onclose = () => service.close();
  return server;
}

export async function serveMcp(
  service: QueryOperations,
  options: { version?: string; online?: boolean } = {},
): Promise<void> {
  await createMcpServer(service, options).connect(new StdioServerTransport());
}
