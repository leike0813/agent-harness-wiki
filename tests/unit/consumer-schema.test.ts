import { expect, test } from "vitest";
import {
  consumerGetTopicSchema,
  consumerListHarnessesSchema,
  consumerMetadataShape,
  consumerResultSchemas,
} from "../../src/domain/consumer.js";

const RELEASE = `web-v1-${"a".repeat(40)}`;
const metadata = {
  release_id: RELEASE,
  knowledge_published_at: "2026-10-02T00:00:00Z",
  access_mode: "online" as const,
};
const surfaces = [
  {
    surface_id: "cli",
    name: "Demo CLI",
    kind: "cli" as const,
    reference_ids: ["ref-demo"],
  },
];
const resolution = {
  requested_version: "1.4.2",
  selected_version: "1.4.2",
  match_kind: "exact" as const,
  requested_applicability: "mapped" as const,
};
const projection = {
  ...metadata,
  history_scope: "current_and_previous" as const,
  status: "ok" as const,
  harness_id: "demo-open-cli",
  surface_id: null,
  surfaces,
  runtimes: [],
  bindings: [
    { surface_id: "cli", status: "unknown" as const, reference_ids: [] },
  ],
  topic: "skills" as const,
  edition_id: "demo-skills-v1",
  title: "skills",
  body: "## Overview {#overview}\n\nBody",
  sections: [
    {
      section_id: "overview",
      surface_ids: ["cli"],
      question_ids: [],
      source_refs: [],
    },
  ],
  questions: [],
  source_refs: [],
  source_scope: [],
  history: ["demo-skills-v1"],
  resolution,
};

test("metadata shape is exported unchanged", () => {
  expect(Object.keys(consumerMetadataShape).sort()).toEqual([
    "access_mode",
    "knowledge_published_at",
    "release_id",
  ]);
});

test("representative consumer results parse", () => {
  expect(
    consumerListHarnessesSchema.parse({ ...metadata, items: [] }),
  ).toBeTruthy();
  expect(consumerGetTopicSchema.parse(projection)).toBeTruthy();
  expect(
    consumerResultSchemas.search_knowledge.parse({
      ...metadata,
      status: "ok",
      items: [
        {
          harness_id: "demo-open-cli",
          topic: "skills",
          edition_id: "demo-skills-v1",
          section_id: "overview",
          surface_ids: ["cli"],
          question_ids: [],
          preview: "Body",
          source_refs: [],
          source_scope: [],
          match: "full_text",
        },
      ],
    }),
  ).toBeTruthy();
  expect(
    consumerResultSchemas.compare_topics.parse({
      ...metadata,
      history_scope: "current_and_previous",
      topic: "skills",
      results: [
        {
          ...metadata,
          history_scope: "current_and_previous",
          status: "ok",
          harness_id: "demo-open-cli",
          surface_id: null,
          topic: "skills",
          edition_id: "demo-skills-v1",
          resolution,
        },
      ],
      questions: [],
    }),
  ).toBeTruthy();
  expect(
    consumerResultSchemas.get_source.parse({
      ...metadata,
      status: "not_found",
      surface_id: null,
    }),
  ).toBeTruthy();
});

test("history_not_available is a normal result with guidance", () => {
  expect(
    consumerGetTopicSchema.parse({
      ...metadata,
      history_scope: "current_and_previous",
      status: "history_not_available",
      harness_id: "demo-open-cli",
      surface_id: "cli",
      topic: "skills",
      edition_id: "demo-skills-v0",
      resolution,
      local_history_url: "https://example.test/local-history",
    }),
  ).toBeTruthy();
});

test("strict schemas reject extra fields and missing metadata", () => {
  expect(() =>
    consumerGetTopicSchema.parse({ ...projection, extra: true }),
  ).toThrow();
  expect(() => consumerListHarnessesSchema.parse({ items: [] })).toThrow();
  expect(() =>
    consumerResultSchemas.error.parse({
      status: "error",
      error: { code: "not_a_code", reason: "x", retryable: false },
    }),
  ).toThrow();
});

test("technical error carries a bound release and stable code", () => {
  expect(
    consumerResultSchemas.error.parse({
      status: "error",
      release_id: RELEASE,
      error: { code: "network_error", reason: "unreachable", retryable: true },
    }),
  ).toBeTruthy();
});

test("response_too_large preserves metadata and history scope", () => {
  expect(
    consumerResultSchemas.response_too_large.parse({
      ...metadata,
      history_scope: "current_and_previous",
      status: "response_too_large",
      harness_id: "demo-open-cli",
      topic: "skills",
      edition_id: "demo-skills-v1",
      resolution,
      sections: projection.sections,
      message: "Read a section by section_id.",
    }),
  ).toBeTruthy();
});
