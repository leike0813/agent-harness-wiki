import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import * as z from "zod";
import {
  queryResultSchema,
  targetSchema,
  topicSchema,
} from "../domain/schema.js";
import { QueryService } from "../query/service.js";
import {
  compareResultSchema,
  compareSchema,
  evidenceRequestSchema,
  evidenceResultSchema,
  listResultSchema,
  listSchema,
  queryRequestSchema,
  searchResultSchema,
  searchSchema,
} from "../query/schema.js";

const pageLimit = z.int().min(1).max(20).default(20);
const mcpListSchema = listSchema.safeExtend({ limit: pageLimit });
const mcpSearchSchema = searchSchema.safeExtend({ limit: pageLimit });
const capabilityInputSchema = queryRequestSchema.safeExtend({
  detail_level: z.enum(["summary", "full"]).default("full"),
});
const summaryFactSchema = z.strictObject({
  fact_key: z.string(),
  topic: topicSchema,
  support: queryResultSchema.shape.facts.element.shape.claim.shape.support,
  target: targetSchema,
  conditions:
    queryResultSchema.shape.facts.element.shape.claim.shape.conditions,
  review_status: z.enum(["accepted", "disputed"]),
  evidence_refs: z.array(z.string()),
});
const capabilityOutputSchema = z.discriminatedUnion("detail_level", [
  queryResultSchema.safeExtend({ detail_level: z.literal("full") }),
  queryResultSchema.omit({ facts: true }).safeExtend({
    detail_level: z.literal("summary"),
    facts: z.array(summaryFactSchema),
  }),
]);
const evidenceOutputSchema = evidenceResultSchema.safeExtend({
  excerpt_truncated: z.boolean(),
});

export function mcpResponse(value: Record<string, unknown>): {
  structuredContent: Record<string, unknown>;
  content: [{ type: "text"; text: string }];
  isError?: boolean;
} {
  const encoded = JSON.stringify(value);
  const result: {
    structuredContent: Record<string, unknown>;
    content: [{ type: "text"; text: string }];
  } = {
    structuredContent: value,
    content: [{ type: "text", text: encoded }],
  };
  if (Buffer.byteLength(JSON.stringify(result), "utf8") > 128 * 1024) {
    const error = {
      release_id: value.release_id,
      code: "response_too_large",
      message: "Narrow the query to fit the 128 KiB response limit.",
    };
    return {
      isError: true,
      structuredContent: error,
      content: [{ type: "text", text: JSON.stringify(error) }],
    };
  }
  return result;
}

export function clipExcerpt(excerpt: string): {
  excerpt: string;
  excerpt_truncated: boolean;
} {
  const chars = Array.from(excerpt);
  return {
    excerpt: chars.slice(0, 2000).join(""),
    excerpt_truncated: chars.length > 2000,
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
    {
      inputSchema: mcpListSchema,
      outputSchema: listResultSchema,
      annotations: readonly,
    },
    (input) => mcpResponse(service.listHarnesses(input)),
  );
  server.registerTool(
    "get_capability",
    {
      inputSchema: capabilityInputSchema,
      outputSchema: capabilityOutputSchema,
      annotations: readonly,
    },
    (input) => {
      const { detail_level, ...query } = input;
      const result = service.getCapability(query);
      if (detail_level === "full")
        return mcpResponse({ ...result, detail_level });
      return mcpResponse({
        ...result,
        detail_level,
        facts: result.facts.map(({ claim, target, review_status }) => ({
          fact_key: claim.fact_key,
          topic: claim.topic,
          support: claim.support,
          target,
          conditions: claim.conditions,
          review_status,
          evidence_refs: claim.evidence_refs,
        })),
      });
    },
  );
  server.registerTool(
    "compare_capabilities",
    {
      inputSchema: compareSchema,
      outputSchema: compareResultSchema,
      annotations: readonly,
    },
    (input) => mcpResponse(service.compareCapabilities(input)),
  );
  server.registerTool(
    "search_knowledge",
    {
      inputSchema: mcpSearchSchema,
      outputSchema: searchResultSchema,
      annotations: readonly,
    },
    (input) => mcpResponse(service.searchKnowledge(input)),
  );
  server.registerTool(
    "get_evidence",
    {
      inputSchema: evidenceRequestSchema,
      outputSchema: evidenceOutputSchema,
      annotations: readonly,
    },
    (input) => {
      const result = service.getEvidence(input);
      if (!result.evidence)
        return mcpResponse({ ...result, excerpt_truncated: false });
      const { excerpt, excerpt_truncated } = clipExcerpt(
        result.evidence.excerpt,
      );
      return mcpResponse({
        ...result,
        evidence: { ...result.evidence, excerpt },
        excerpt_truncated,
      });
    },
  );
  server.server.onclose = () => service.close();
  return server;
}

export async function serveMcp(service: QueryService): Promise<void> {
  const server = createMcpServer(service);
  await server.connect(new StdioServerTransport());
}
