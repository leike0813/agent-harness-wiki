import { expect, test } from "vitest";
import {
  onlinePointerSchema,
  onlineTopicSchema,
  parseOnlineResource,
} from "../../src/domain/online.js";

const release = `web-v1-${"a".repeat(40)}`;
test("online identities and trimmed entries remain distinct from readable data", () => {
  const topic = {
    protocol_version: 1,
    release_id: release,
    resource_kind: "topic",
    harness_id: "demo-open-cli",
    topic: "skills",
    current: "demo-skills-v2",
    editions: [
      {
        availability: "trimmed",
        edition_id: "demo-skills-v1",
        sections: [],
        mappings: [],
      },
    ],
  };
  expect(parseOnlineResource(topic, release).resource_kind).toBe("topic");
  expect(() => parseOnlineResource(topic, `web-v1-${"b".repeat(40)}`)).toThrow(
    /identity/,
  );
  expect(
    onlineTopicSchema.safeParse({
      ...topic,
      editions: [
        { ...topic.editions[0], resource: "chapters/demo-skills-v1.json" },
      ],
    }).success,
  ).toBe(false);
  expect(
    onlinePointerSchema.safeParse({
      protocol_version: 1,
      state: "retired",
      retired_at: "2026-10-02T00:00:00Z",
      upgrade: "Upgrade client",
    }).success,
  ).toBe(true);
  expect(
    onlinePointerSchema.safeParse({
      protocol_version: 1,
      release_id: release,
      state: "active",
      manifest: "../other/manifest.json",
    }).success,
  ).toBe(false);
});
