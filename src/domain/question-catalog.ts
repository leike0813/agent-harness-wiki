import type { Topic } from "./schema.js";

const topicPrefix: Record<string, Topic> = {
  skills: "skills",
  mcp: "mcp",
  agents: "custom_agents",
  providers: "custom_providers",
  hooks: "hooks",
  plugins: "native_plugins",
  config: "configuration",
  transcripts: "local_transcripts",
};

export function parseQuestionCatalog(
  markdown: string,
): Map<Topic, Map<string, string>> {
  const result = new Map<Topic, Map<string, string>>();
  for (const match of markdown.matchAll(
    /^\| `([a-z][a-z0-9_]*\.[a-z][a-z0-9_]*)` \| ([^\n|]+) \|$/gm,
  )) {
    const id = match[1]!;
    const topic = topicPrefix[id.split(".")[0]!];
    if (!topic) continue;
    const questions = result.get(topic) ?? new Map<string, string>();
    if (questions.has(id)) throw new Error(`Duplicate fixed question: ${id}`);
    questions.set(id, match[2]!.trim());
    result.set(topic, questions);
  }
  return result;
}
