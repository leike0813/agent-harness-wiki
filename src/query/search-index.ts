import type { ChapterPublishedKnowledge } from "../domain/chapter.js";
import { topicSchema, type Topic } from "../domain/schema.js";
import * as z from "zod";
import { modelLockSchema } from "./ollama.js";

export const searchSectionSchema = z.strictObject({
  harness_id: z.string(),
  topic: topicSchema,
  edition_id: z.string(),
  section_id: z.string(),
  title: z.string(),
  body: z.string(),
  question_ids: z.array(z.string()),
  question_wording: z.array(z.string()),
  exact_terms: z.array(z.string()),
  aliases: z.array(z.string()),
  source_refs: z.array(z.string()),
});
export const searchIndexSchema = z.strictObject({
  schema_version: z.literal(1),
  sections: z.array(searchSectionSchema),
});
export type SearchSection = z.infer<typeof searchSectionSchema>;

export function searchableText(section: SearchSection): string {
  return [
    section.title,
    section.body,
    ...section.question_ids,
    ...section.question_wording,
    ...section.exact_terms,
    ...section.aliases,
  ].join(" ");
}
export const semanticIndexSchema = z.strictObject({
  schema_version: z.literal(1),
  model: modelLockSchema,
  passages: z.array(
    z.strictObject({
      edition_id: z.string(),
      section_id: z.string(),
      ordinal: z.int().nonnegative(),
      vector: z.array(z.number().finite()),
    }),
  ),
});
export type SemanticIndex = z.infer<typeof semanticIndexSchema>;

export function normalizeVector(vector: number[]): number[] {
  const length = Math.hypot(...vector);
  if (!Number.isFinite(length) || length === 0)
    throw new Error("Invalid embedding vector.");
  return vector.map((value) => value / length);
}

const topicAliases: Record<Topic, string[]> = {
  skills: ["技能", "skill"],
  mcp: ["模型上下文协议", "mcp server", "服务器"],
  custom_agents: ["自定义代理", "子代理", "agent"],
  custom_providers: ["自定义供应商", "模型供应商", "provider"],
  hooks: ["钩子", "hook"],
  native_plugins: ["原生插件", "扩展", "plugin"],
  configuration: ["配置", "设置", "config"],
};

export function sectionText(
  body: string,
  sectionId: string,
): string | undefined {
  const headings = [...body.matchAll(/^## (.+) \{#([a-z][a-z0-9_-]*)\}\s*$/gm)];
  const index = headings.findIndex((x) => x[2] === sectionId);
  return index < 0
    ? undefined
    : body.slice(headings[index]!.index, headings[index + 1]?.index).trim();
}

export function buildSearchSections(
  knowledge: ChapterPublishedKnowledge,
  catalog: Map<Topic, Map<string, string>>,
): SearchSection[] {
  const chapters = new Map(
    knowledge.records.chapters.map((chapter) => [chapter.edition_id, chapter]),
  );
  const harnesses = new Map(
    knowledge.records.harnesses.map((harness) => [harness.harness_id, harness]),
  );
  return knowledge.records.current.flatMap((selection) => {
    const chapter = chapters.get(selection.edition_id)!;
    const harness = harnesses.get(selection.harness_id)!;
    return chapter.sections.map((section) => {
      const body = sectionText(chapter.body, section.section_id)!;
      const title = /^## (.+) \{#[a-z][a-z0-9_-]*\}/.exec(body)?.[1] ?? "";
      const questions = chapter.questions.filter(
        (question) => question.section_id === section.section_id,
      );
      const exact = new Set<string>(
        questions.map((question) => question.question_id),
      );
      for (const match of body.matchAll(/`([^`\n]{1,120})`/g))
        exact.add(match[1]!);
      for (const match of body.matchAll(
        /^\s*["']?([A-Za-z_][\w.-]{1,80})["']?\s*[:=]/gm,
      ))
        exact.add(match[1]!);
      return {
        harness_id: chapter.harness_id,
        topic: chapter.topic,
        edition_id: chapter.edition_id,
        section_id: section.section_id,
        title,
        body,
        question_ids: questions.map((question) => question.question_id),
        question_wording: questions.map(
          (question) =>
            catalog.get(chapter.topic)?.get(question.question_id) ?? "",
        ),
        exact_terms: [...exact].sort(),
        aliases: [
          chapter.topic,
          ...topicAliases[chapter.topic],
          harness.harness_id,
          harness.name,
          ...harness.aliases,
        ],
        source_refs: section.source_refs,
      };
    });
  });
}

export function splitPassages(body: string, maxChars = 400): string[] {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter(Boolean);
  const passages: string[] = [];
  let current = "";
  const append = (text: string) => {
    if (current && current.length + text.length + 2 > maxChars) {
      passages.push(current);
      current = "";
    }
    current = current ? `${current}\n\n${text}` : text;
  };
  for (const paragraph of paragraphs) {
    if (paragraph.length <= maxChars) {
      append(paragraph);
      continue;
    }
    if (current) {
      passages.push(current);
      current = "";
    }
    const sentences = paragraph.split(/(?<=[。！？.!?])\s*/u).filter(Boolean);
    for (const sentence of sentences) {
      if (sentence.length <= maxChars) append(sentence);
      else
        for (let offset = 0; offset < sentence.length; offset += maxChars)
          append(sentence.slice(offset, offset + maxChars));
    }
  }
  if (current) passages.push(current);
  return passages;
}
