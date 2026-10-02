import { expect, test } from "vitest";
import {
  buildOnlineSearch,
  queryOnlineSearch,
  OnlineSearchError,
  type OnlineSearchPage,
} from "../../src/query/lexical.js";
import type { Topic } from "../../src/domain/schema.js";
import type { SearchSection } from "../../src/query/search-index.js";

const RELEASE = `web-v1-${"a".repeat(40)}`;
const INDEX_LIMIT = 2 * 1024 * 1024;
const CHAPTER_LIMIT = 8 * 1024 * 1024;

interface Spec {
  harness_id: string;
  topic: Topic;
  edition_id: string;
  section_id: string;
  surface_ids: string[];
  title: string;
  body: string;
  question_id: string;
  question_wording?: string[];
  exact_terms?: string[];
  aliases?: string[];
}

const reference = (spec: Spec) => `ref-${spec.section_id}`;

function searchSection(spec: Spec): SearchSection {
  return {
    harness_id: spec.harness_id,
    topic: spec.topic,
    edition_id: spec.edition_id,
    section_id: spec.section_id,
    surface_ids: spec.surface_ids,
    title: spec.title,
    body: `## ${spec.title} {#${spec.section_id}}\n\n${spec.body}`,
    question_ids: [spec.question_id],
    question_wording: spec.question_wording ?? [],
    exact_terms: spec.exact_terms ?? [],
    aliases: spec.aliases ?? [],
    source_refs: [reference(spec)],
  };
}

function chapterFile(specs: Spec[]): Buffer {
  const first = specs[0]!;
  const resource = {
    protocol_version: 1,
    release_id: RELEASE,
    resource_kind: "chapter",
    chapter: {
      schema_version: 3,
      record_kind: "production",
      edition_id: first.edition_id,
      harness_id: first.harness_id,
      topic: first.topic,
      title: first.topic,
      sections: specs.map((spec) => ({
        section_id: spec.section_id,
        surface_ids: spec.surface_ids,
        source_refs: [reference(spec)],
      })),
      questions: specs.map((spec) => ({
        question_id: spec.question_id,
        answers: [
          {
            surface_ids: spec.surface_ids,
            section_id: spec.section_id,
            status: "answered",
            source_refs: [reference(spec)],
          },
        ],
      })),
      body: specs
        .map((spec) => `## ${spec.title} {#${spec.section_id}}\n\n${spec.body}`)
        .join("\n\n"),
    },
    source_scope: specs.map((spec) => ({
      reference_id: reference(spec),
      snapshot_id: `snap-${spec.section_id}`,
      official_url: "https://example.test/doc",
    })),
  };
  return Buffer.from(JSON.stringify(resource), "utf8");
}

function build(specs: Spec[], withChapters = true) {
  const map = buildOnlineSearch(specs.map(searchSection), RELEASE);
  const files = new Map<string, Buffer>();
  for (const [path, resource] of map)
    files.set(path, Buffer.from(JSON.stringify(resource), "utf8"));
  if (withChapters) {
    const byEdition = new Map<string, Spec[]>();
    for (const spec of specs) {
      const list = byEdition.get(spec.edition_id);
      if (list) list.push(spec);
      else byEdition.set(spec.edition_id, [spec]);
    }
    for (const [edition, list] of byEdition)
      files.set(`chapters/${edition}.json`, chapterFile(list));
  }
  const manifest = JSON.parse(
    files.get("search/manifest.json")!.toString("utf8"),
  ) as unknown;
  return { map, files, manifest };
}

interface ReaderOptions {
  pad?: { path: string; size: number };
}

function reader(files: Map<string, Buffer>, options: ReaderOptions = {}) {
  const reads: string[] = [];
  const read = async (path: string): Promise<Buffer> => {
    reads.push(path);
    const buffer = files.get(path);
    if (!buffer) throw new Error(`missing resource: ${path}`);
    const pad = options.pad;
    if (pad && pad.path === path && buffer.length < pad.size)
      return Buffer.concat([
        buffer,
        Buffer.alloc(pad.size - buffer.length, 0x20),
      ]);
    return buffer;
  };
  return { read, reads };
}

function indexReads(reads: string[]): string[] {
  return [...new Set(reads.filter((path) => !path.startsWith("chapters/")))];
}

async function pageAll(
  files: Map<string, Buffer>,
  manifest: unknown,
  request: Omit<
    Parameters<typeof queryOnlineSearch>[0],
    "read" | "manifest" | "releaseId"
  >,
): Promise<OnlineSearchPage["results"]> {
  const { read } = reader(files);
  const all: OnlineSearchPage["results"] = [];
  let cursor: string | undefined;
  do {
    const page = await queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read,
      ...request,
      cursor,
    });
    all.push(...page.results);
    cursor = page.next_cursor;
  } while (cursor);
  return all;
}

function hasLoneSurrogate(value: string): boolean {
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(i + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
      i += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) return true;
  }
  return false;
}

const base: Spec[] = [
  {
    harness_id: "demo-open-cli",
    topic: "mcp",
    edition_id: "demo-open-cli-mcp-v1",
    section_id: "s1",
    surface_ids: ["cli"],
    title: "服务器配置",
    body: "使用 `mcp.servers` 配置项，参考 CLAUDE.md。配置服务器地址。",
    question_id: "mcp.configure",
    question_wording: ["如何配置 MCP servers"],
    exact_terms: ["mcp.servers", "CLAUDE.md"],
    aliases: ["demo-open-cli", "MCP server"],
  },
  {
    harness_id: "demo-open-cli",
    topic: "mcp",
    edition_id: "demo-open-cli-mcp-v1",
    section_id: "s2",
    surface_ids: ["cli"],
    title: "工具集成",
    body: "hooks 与 tool 的配置说明。CLAUDE.md 也可参考。",
    question_id: "mcp.tools",
    exact_terms: ["hooks"],
  },
  {
    harness_id: "demo-open-cli",
    topic: "skills",
    edition_id: "demo-open-cli-skills-v1",
    section_id: "s3",
    surface_ids: ["ide"],
    title: "技能定义",
    body: "技能通过 skill 文件定义并加载。",
    question_id: "skills.define",
    question_wording: ["如何定义技能"],
    exact_terms: ["skill"],
  },
  {
    harness_id: "demo-open-cli",
    topic: "hooks",
    edition_id: "demo-open-cli-hooks-v1",
    section_id: "s4",
    surface_ids: ["web"],
    title: "长文本",
    body: `${"x".repeat(239)}😀😀`,
    question_id: "hooks.long",
  },
];

test("exact categories rank before lexical body matches", async () => {
  const { files, manifest } = build(base);
  const { read } = reader(files);
  const query = (text: string) =>
    queryOnlineSearch({ releaseId: RELEASE, manifest, read, text });

  expect((await query("mcp.configure")).results[0]!.match).toBe(
    "exact_question_id",
  );
  expect((await query("mcp.servers")).results[0]!.match).toBe(
    "exact_config_term",
  );
  expect((await query("如何配置 MCP servers")).results[0]!.match).toBe(
    "exact_question_wording",
  );
  expect((await query("MCP server")).results[0]!.match).toBe("alias");

  const body = await query("配置");
  expect(body.results.length).toBeGreaterThanOrEqual(2);
  expect(body.results.every((result) => result.match === "full_text")).toBe(
    true,
  );
});

test("punctuation and multi-word matching stay addressable", async () => {
  const { files, manifest } = build(base);
  const { read } = reader(files);
  const result = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    text: "CLAUDE.md",
  });
  const ids = result.results.map((item) => item.locator.section_id);
  expect(ids).toContain("s1");
  expect(ids).toContain("s2");
  expect(
    result.results.find((item) => item.locator.section_id === "s1")!.match,
  ).toBe("exact_config_term");
});

test("filter-only paging uses scope metadata and never reads postings", async () => {
  const { files, manifest } = build(base);
  const { read, reads } = reader(files);
  const page = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    harness: "demo-open-cli",
    topic: "mcp",
    surface_id: "cli",
  });
  expect(page.results.map((item) => item.locator.section_id).sort()).toEqual([
    "s1",
    "s2",
  ]);
  expect(reads.some((path) => path.startsWith("search/scopes/"))).toBe(true);
  expect(
    reads.some(
      (path) =>
        path.startsWith("search/exact") || path.startsWith("search/lexical"),
    ),
  ).toBe(false);

  const ide = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    topic: "skills",
    surface_id: "ide",
  });
  expect(ide.results.map((item) => item.locator.section_id)).toEqual(["s3"]);

  const empty = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    topic: "mcp",
    surface_id: "ide",
  });
  expect(empty.results).toEqual([]);
});

test("cursors bind release, text and filters", async () => {
  const { files, manifest } = build(base);
  const { read } = reader(files);
  const first = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    topic: "mcp",
    limit: 1,
  });
  expect(first.results).toHaveLength(1);
  expect(first.next_cursor).toBeTruthy();
  const second = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    topic: "mcp",
    limit: 1,
    cursor: first.next_cursor,
  });
  expect(second.results[0]!.locator.section_id).not.toBe(
    first.results[0]!.locator.section_id,
  );

  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read,
      text: "配置",
      cursor: first.next_cursor,
    }),
  ).rejects.toBeInstanceOf(OnlineSearchError);
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read,
      topic: "mcp",
      limit: 1,
      cursor: "not-a-cursor",
    }),
  ).rejects.toMatchObject({ code: "invalid_cursor" });

  const raw = JSON.parse(
    Buffer.from(first.next_cursor!, "base64url").toString("utf8"),
  ) as { b: string; p: number; d: string };
  expect(raw.b).toContain('"rank":1');
  const tamper = (mutate: (value: typeof raw) => unknown) =>
    Buffer.from(JSON.stringify(mutate(raw)), "utf8").toString("base64url");
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read,
      topic: "mcp",
      limit: 1,
      cursor: tamper((value) => ({ ...value, p: value.p + 1 })),
    }),
  ).rejects.toMatchObject({ code: "invalid_cursor" });
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read,
      topic: "mcp",
      limit: 1,
      cursor: tamper((value) => ({
        ...value,
        b: value.b.replace('"rank":1', '"rank":2'),
      })),
    }),
  ).rejects.toMatchObject({ code: "invalid_cursor" });
});

test("a page reads one chapter per edition and only page chapters", async () => {
  const { files, manifest } = build(base);
  const { read, reads } = reader(files);
  const page = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    text: "配置",
  });
  expect(page.results).toHaveLength(2);
  const chapterReads = reads.filter(
    (path) => path === "chapters/demo-open-cli-mcp-v1.json",
  );
  expect(chapterReads).toHaveLength(1);
});

test("mismatched chapter identity is rejected", async () => {
  const { files, manifest } = build(base);
  const path = "chapters/demo-open-cli-mcp-v1.json";
  const record = JSON.parse(files.get(path)!.toString("utf8")) as {
    chapter: { edition_id: string };
  };
  record.chapter.edition_id = "demo-open-cli-other-v1";
  files.set(path, Buffer.from(JSON.stringify(record), "utf8"));
  const { read } = reader(files);
  await expect(
    queryOnlineSearch({ releaseId: RELEASE, manifest, read, text: "配置" }),
  ).rejects.toThrow(/identity/);
});

test("filter-only for a product/topic without sections returns empty", async () => {
  const { files, manifest } = build(base);
  const { read, reads } = reader(files);
  const page = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    harness: "demo-open-cli",
    topic: "configuration",
  });
  expect(page.results).toEqual([]);
  expect(
    reads.some(
      (path) =>
        path.startsWith("search/exact") || path.startsWith("search/lexical"),
    ),
  ).toBe(false);
});

test("cross-purpose search roots are rejected", async () => {
  const { files, manifest } = build(base);
  const swapped = {
    ...(manifest as Record<string, unknown>),
    exact: "search/lexical/index.json",
    lexical: "search/exact/index.json",
  };
  const { read } = reader(files);
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest: swapped,
      read,
      text: "配置",
    }),
  ).rejects.toThrow(/purpose/);
});

test("scope-only rejects a damaged or missing scope resource", async () => {
  const { map, files, manifest } = build(base);
  const block = [...map.keys()].find((path) =>
    path.startsWith("search/scopes/demo-open-cli/mcp/blocks/"),
  )!;
  const damaged = new Map(files);
  damaged.set("search/scopes/demo-open-cli/mcp/index.json", Buffer.from("{"));
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read: reader(damaged).read,
      harness: "demo-open-cli",
      topic: "mcp",
    }),
  ).rejects.toThrow();

  const missing = new Map(files);
  missing.delete(block);
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read: reader(missing).read,
      harness: "demo-open-cli",
      topic: "mcp",
    }),
  ).rejects.toThrow();
});

test("a locator whose section is absent from its chapter is rejected", async () => {
  const missingSection = build(base);
  const path = "chapters/demo-open-cli-mcp-v1.json";
  const record = JSON.parse(
    missingSection.files.get(path)!.toString("utf8"),
  ) as {
    chapter: { sections: { section_id: string }[] };
  };
  record.chapter.sections = record.chapter.sections.filter(
    (section) => section.section_id !== "s1",
  );
  missingSection.files.set(path, Buffer.from(JSON.stringify(record), "utf8"));
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest: missingSection.manifest,
      read: reader(missingSection.files).read,
      text: "配置",
    }),
  ).rejects.toThrow(/section/i);

  const missingHeading = build(base);
  const record2 = JSON.parse(
    missingHeading.files.get(path)!.toString("utf8"),
  ) as { chapter: { body: string } };
  record2.chapter.body = record2.chapter.body.replace(
    "## 服务器配置 {#s1}",
    "## 服务器配置",
  );
  missingHeading.files.set(path, Buffer.from(JSON.stringify(record2), "utf8"));
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest: missingHeading.manifest,
      read: reader(missingHeading.files).read,
      text: "配置",
    }),
  ).rejects.toThrow(/body/i);
});

test("previews fit 240 UTF-16 code units without broken Unicode", async () => {
  const { files, manifest } = build(base);
  const { read } = reader(files);
  const body = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    text: "配置",
  });
  for (const result of body.results) {
    expect(result.preview.length).toBeLessThanOrEqual(240);
    expect(result.preview).toContain("配置");
    expect(hasLoneSurrogate(result.preview)).toBe(false);
  }
  const metadata = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    topic: "hooks",
    surface_id: "web",
  });
  expect(metadata.results[0]!.match).toBe("filter");
  expect(metadata.results[0]!.preview.length).toBeLessThanOrEqual(240);
  expect(hasLoneSurrogate(metadata.results[0]!.preview)).toBe(false);
});

test("a body preview near a hit never splits a surrogate pair", async () => {
  const body = "w ".repeat(50) + "needle" + " " + "b".repeat(132) + "😀😀";
  const spec: Spec = {
    harness_id: "demo-emoji",
    topic: "mcp",
    edition_id: "demo-emoji-mcp-v1",
    section_id: "s1",
    surface_ids: ["cli"],
    title: "t",
    body,
    question_id: "mcp.emoji",
  };
  const { files, manifest } = build([spec]);
  const { read } = reader(files);
  const page = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    text: "needle",
  });
  expect(page.results).toHaveLength(1);
  expect(page.results[0]!.preview.length).toBeLessThanOrEqual(240);
  expect(hasLoneSurrogate(page.results[0]!.preview)).toBe(false);
});

test("manifest release and resource identity are validated", async () => {
  const { files, manifest } = build(base);
  const { read } = reader(files);
  await expect(
    queryOnlineSearch({
      releaseId: `web-v1-${"b".repeat(40)}`,
      manifest,
      read,
      text: "配置",
    }),
  ).rejects.toThrow();
});

function scaleSpecs(count: number, harness: string, body: string): Spec[] {
  return Array.from({ length: count }, (_, index) => ({
    harness_id: harness,
    topic: "mcp" as Topic,
    edition_id: `${harness}-mcp-v1`,
    section_id: `s${String(index).padStart(4, "0")}`,
    surface_ids: ["cli"],
    title: `${harness} 配置`,
    body,
    question_id: `mcp.q${index}`,
  }));
}

test("packing bounds blocks and a filtered query skips unrelated scopes", async () => {
  const specs = [
    ...scaleSpecs(600, "alpha", "sharedterm"),
    ...scaleSpecs(1200, "beta", "sharedterm"),
  ];
  const { map, files, manifest } = build(specs);
  for (const [path, resource] of map)
    if (path.includes("/blocks/"))
      expect(
        Buffer.byteLength(JSON.stringify(resource), "utf8"),
      ).toBeLessThanOrEqual(65536);
  const blocksWith = (harness: string) =>
    [...map.entries()]
      .filter(
        ([path, resource]) =>
          path.startsWith("search/lexical/blocks/") &&
          resource.resource_kind === "postings" &&
          resource.entries.some(
            (entry) =>
              entry.term === "sharedterm" &&
              entry.locator.harness_id === harness,
          ),
      )
      .map(([path]) => path);
  const pureForeign = [...map.entries()]
    .filter(
      ([path, resource]) =>
        path.startsWith("search/lexical/blocks/") &&
        resource.resource_kind === "postings" &&
        resource.entries.length > 0 &&
        resource.entries.every((entry) => entry.locator.harness_id !== "alpha"),
    )
    .map(([path]) => path);
  const alphaBlocks = blocksWith("alpha");
  expect(alphaBlocks.length).toBeGreaterThan(1);
  expect(pureForeign.length).toBeGreaterThan(0);

  const { read, reads } = reader(files);
  const firstPage = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    text: "sharedterm",
    harness: "alpha",
    limit: 20,
  });
  expect(firstPage.results).toHaveLength(20);
  const readBlocks = [
    ...new Set(
      reads.filter((path) => path.startsWith("search/lexical/blocks/")),
    ),
  ].sort();
  const allLexicalBlocks = [...map.keys()].filter((path) =>
    path.startsWith("search/lexical/blocks/"),
  );
  expect(readBlocks.length).toBeLessThan(allLexicalBlocks.length);
  for (const block of alphaBlocks) expect(readBlocks).toContain(block);
  expect(reads.some((path) => pureForeign.includes(path))).toBe(false);

  const all = await pageAll(files, manifest, {
    text: "sharedterm",
    harness: "alpha",
  });
  expect(all).toHaveLength(600);
  expect(new Set(all.map((item) => item.locator.section_id)).size).toBe(600);
  expect(all.every((item) => item.locator.harness_id === "alpha")).toBe(true);
});

test("scope-only pruning stays within one product", async () => {
  const specs = [
    ...scaleSpecs(4, "alpha", "sharedterm"),
    ...scaleSpecs(4, "beta", "sharedterm"),
  ];
  const { files, manifest } = build(specs);
  const { read, reads } = reader(files);
  const page = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    harness: "alpha",
  });
  expect(page.results).toHaveLength(4);
  expect(reads.some((path) => path.startsWith("search/scopes/beta"))).toBe(
    false,
  );
});

test("packed blocks serve global and unique terms across many scopes", async () => {
  const specs: Spec[] = Array.from({ length: 500 }, (_, index) => ({
    harness_id: `p${String(index).padStart(4, "0")}`,
    topic: "mcp" as Topic,
    edition_id: `ed-p${String(index).padStart(4, "0")}`,
    section_id: "s1",
    surface_ids: ["cli"],
    title: "配置",
    body: `sharedterm uniq${String(index).padStart(4, "0")}`,
    question_id: `mcp.q${index}`,
  }));
  const { map, files, manifest } = build(specs);
  for (const [path, resource] of map)
    if (path.includes("/blocks/"))
      expect(
        Buffer.byteLength(JSON.stringify(resource), "utf8"),
      ).toBeLessThanOrEqual(65536);

  const { read } = reader(files);
  const unique = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    text: "uniq0250",
  });
  expect(unique.results).toHaveLength(1);
  expect(unique.results[0]!.locator.harness_id).toBe("p0250");

  const shared = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    text: "sharedterm",
    limit: 20,
  });
  expect(shared.results).toHaveLength(20);
  expect(shared.next_cursor).toBeTruthy();
});

test("large term dictionaries and product scope trees layer the navigation", async () => {
  const longTerm = (i: number, j: number) =>
    "z".repeat(240) + String(i).padStart(2, "0") + String(j).padStart(4, "0");
  const sections = Array.from({ length: 20 }, (_, i) => ({
    harness_id: "huge",
    topic: "mcp" as const,
    edition_id: "huge-mcp-v1",
    section_id: `s${i}`,
    surface_ids: ["cli"],
    title: "t",
    body: Array.from({ length: 1000 }, (_, j) => longTerm(i, j)).join(" "),
    question_ids: [] as string[],
    question_wording: [] as string[],
    exact_terms: [] as string[],
    aliases: [] as string[],
    source_refs: [] as string[],
  }));
  const map = buildOnlineSearch(sections, RELEASE);
  const files = new Map<string, Buffer>();
  for (const [path, resource] of map)
    files.set(path, Buffer.from(JSON.stringify(resource), "utf8"));
  const manifest = JSON.parse(
    files.get("search/manifest.json")!.toString("utf8"),
  ) as unknown;
  const chapterSpecs: Spec[] = Array.from({ length: 20 }, (_, i) => ({
    harness_id: "huge",
    topic: "mcp",
    edition_id: "huge-mcp-v1",
    section_id: `s${i}`,
    surface_ids: ["cli"],
    title: "t",
    body: "small body",
    question_id: `mcp.q${i}`,
  }));
  files.set("chapters/huge-mcp-v1.json", chapterFile(chapterSpecs));

  for (const resource of map.values())
    expect(
      Buffer.byteLength(JSON.stringify(resource), "utf8"),
    ).toBeLessThanOrEqual(65536);
  expect(
    [...map.entries()].some(
      ([path, resource]) =>
        path.startsWith("search/lexical") &&
        resource.resource_kind === "navigation" &&
        resource.ranges.some(
          (range) => map.get(range.resource)?.resource_kind === "navigation",
        ),
    ),
  ).toBe(true);

  const { read, reads } = reader(files);
  const page = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read,
    text: longTerm(3, 7),
  });
  expect(page.results).toHaveLength(1);
  expect(page.results[0]!.locator.section_id).toBe("s3");
  expect(reads.filter((path) => path.startsWith("chapters/"))).toHaveLength(1);

  const products = Array.from({ length: 1000 }, (_, i) => ({
    harness_id: `p${String(i).padStart(4, "0")}`,
    topic: "mcp" as const,
    edition_id: `ed-${i}`,
    section_id: "s1",
    surface_ids: ["cli"],
    title: "t",
    body: "sharedterm",
    question_ids: [] as string[],
    question_wording: [] as string[],
    exact_terms: [] as string[],
    aliases: [] as string[],
    source_refs: [] as string[],
  }));
  const scopeMap = buildOnlineSearch(products, RELEASE);
  for (const resource of scopeMap.values())
    expect(
      Buffer.byteLength(JSON.stringify(resource), "utf8"),
    ).toBeLessThanOrEqual(65536);
  expect(
    [...scopeMap.entries()].some(
      ([path, resource]) =>
        path.startsWith("search/scopes") &&
        resource.resource_kind === "navigation" &&
        resource.ranges.some(
          (range) =>
            scopeMap.get(range.resource)?.resource_kind === "navigation",
        ),
    ),
  ).toBe(true);
});

test("index byte budget is exact and over-budget reports query_too_broad", async () => {
  const { files, manifest } = build(base);
  const probe = reader(files);
  await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read: probe.read,
    text: "配置",
  });
  const paths = indexReads(probe.reads);
  const total = paths.reduce((sum, path) => sum + files.get(path)!.length, 0);
  expect(total).toBeLessThan(INDEX_LIMIT);
  const target =
    paths.find((path) => path.startsWith("search/lexical/blocks/")) ??
    paths[0]!;
  const natural = files.get(target)!.length;
  const exact = natural + (INDEX_LIMIT - total);

  const ok = reader(files, { pad: { path: target, size: exact } });
  const page = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read: ok.read,
    text: "配置",
  });
  expect(page.results.length).toBeGreaterThan(0);

  const over = reader(files, { pad: { path: target, size: exact + 1 } });
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read: over.read,
      text: "配置",
    }),
  ).rejects.toMatchObject({ code: "query_too_broad" });
});

test("page chapter byte budget is exact and over-budget reports query_too_broad", async () => {
  const { files, manifest } = build(base);
  const chapter = "chapters/demo-open-cli-mcp-v1.json";
  const exact = reader(files, { pad: { path: chapter, size: CHAPTER_LIMIT } });
  const page = await queryOnlineSearch({
    releaseId: RELEASE,
    manifest,
    read: exact.read,
    text: "mcp.configure",
  });
  expect(page.results).toHaveLength(1);

  const over = reader(files, {
    pad: { path: chapter, size: CHAPTER_LIMIT + 1 },
  });
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read: over.read,
      text: "mcp.configure",
    }),
  ).rejects.toMatchObject({ code: "query_too_broad" });
});

test("over-broad query reports query_too_broad without a truncated page", async () => {
  const specs: Spec[] = Array.from({ length: 20_001 }, (_, index) => ({
    harness_id: "bulk",
    topic: "mcp" as Topic,
    edition_id: `bulk-${index}`,
    section_id: `s${index}`,
    surface_ids: ["cli"],
    title: "t",
    body: "sharedterm",
    question_id: `mcp.q${index}`,
  }));
  const { files, manifest } = build(specs, false);
  const { read } = reader(files);
  await expect(
    queryOnlineSearch({
      releaseId: RELEASE,
      manifest,
      read,
      text: "sharedterm",
    }),
  ).rejects.toMatchObject({ code: "query_too_broad" });
}, 30_000);
