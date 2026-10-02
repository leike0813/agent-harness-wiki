/**
 * Online lexical search over static JSON resources.
 *
 * Build side turns current SearchSections into a navigable inverted index and
 * scope directories; query side replays the same normalization/ranking rules
 * through a caller-supplied resource reader. No SQLite, Ollama, MCP or network.
 */
import { createHash } from "node:crypto";
import {
  parseOnlineResource,
  resourcePathSchema,
  lexicalRules,
  type OnlineChapter,
  type OnlineLocator,
  type OnlineNavigation,
  type OnlinePosting,
  type OnlineResource,
  type OnlineSearchManifest,
} from "../domain/online.js";
import type { Topic } from "../domain/schema.js";
import type { SearchSection } from "./search-index.js";

export type MatchKind = OnlinePosting["match"];
export type Field = OnlinePosting["fields"][number];
export type SourceScope = OnlineChapter["source_scope"][number];

const BLOCK_BYTES = lexicalRules.block_bytes;
const CANDIDATE_LIMIT = lexicalRules.candidates;
const FIELD_WEIGHTS: Record<Field, number> = lexicalRules.weights;
const SEARCH_ROOT = "search";
const SCOPE_ROOT = `${SEARCH_ROOT}/scopes`;

const MATCH_RANK: Record<MatchKind, number> = {
  exact_question_id: 0,
  exact_config_term: 1,
  exact_question_wording: 2,
  alias: 3,
  full_text: 4,
  filter: 5,
};

export class OnlineSearchError extends Error {
  constructor(readonly code: "invalid_cursor" | "query_too_broad") {
    super(code);
    this.name = "OnlineSearchError";
  }
}

function compareStrings(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function byteLengthOf(value: unknown): number {
  return Buffer.byteLength(JSON.stringify(value), "utf8");
}

export function normalizeText(value: string): string {
  return value.normalize("NFC").toLowerCase().replace(/\s+/gu, " ").trim();
}

let segmenter: Intl.Segmenter | undefined;

/** Segmented, normalized, code-unit sorted query terms. */
export function segmentTerms(value: string): string[] {
  if (typeof Intl.Segmenter !== "function")
    throw new Error("Intl.Segmenter is required for online lexical search.");
  segmenter ??= new Intl.Segmenter("zh", { granularity: "word" });
  const terms = new Set<string>();
  for (const part of segmenter.segment(normalizeText(value)))
    if (part.isWordLike && part.segment) terms.add(part.segment);
  return [...terms].sort(compareStrings);
}

interface RawPosting {
  term: string;
  locator: OnlineLocator;
  match: MatchKind;
  fields: Field[];
}

type PostingIndex = Map<string, Map<string, RawPosting>>;

function offer(index: PostingIndex, posting: RawPosting): void {
  let bucket = index.get(posting.term);
  if (!bucket) index.set(posting.term, (bucket = new Map()));
  const key = `${posting.locator.edition_id}|${posting.locator.section_id}|${posting.match}`;
  const existing = bucket.get(key);
  if (!existing) {
    bucket.set(key, posting);
    return;
  }
  for (const field of posting.fields)
    if (!existing.fields.includes(field)) existing.fields.push(field);
}

function comparePostings(a: RawPosting, b: RawPosting): number {
  const x = a.locator;
  const y = b.locator;
  return (
    compareStrings(x.harness_id, y.harness_id) ||
    compareStrings(x.topic, y.topic) ||
    compareStrings(x.edition_id, y.edition_id) ||
    compareStrings(x.section_id, y.section_id) ||
    MATCH_RANK[a.match] - MATCH_RANK[b.match] ||
    compareStrings(a.fields.join(","), b.fields.join(","))
  );
}

interface RangeSpec {
  first: string;
  last: string;
  resource: string;
  harness_id?: string | undefined;
  topic?: Topic | undefined;
}

function navigation(
  releaseId: string,
  purpose: OnlineNavigation["purpose"],
  ranges: RangeSpec[],
): unknown {
  return {
    protocol_version: 1,
    release_id: releaseId,
    resource_kind: "navigation",
    purpose,
    ranges,
  };
}

/**
 * Write a navigation tree rooted at `<prefix>/index.json`, subdividing by
 * decoded byte size (64 KiB target including envelope) until every node fits.
 */
function writeNavigation(
  prefix: string,
  purpose: OnlineNavigation["purpose"],
  ranges: RangeSpec[],
  out: Map<string, OnlineResource>,
  releaseId: string,
): string {
  const path = `${prefix}/index.json`;
  if (byteLengthOf(navigation(releaseId, purpose, ranges)) <= BLOCK_BYTES) {
    out.set(
      path,
      parseOnlineResource(navigation(releaseId, purpose, ranges), releaseId),
    );
    return path;
  }
  const avg = Math.max(
    1,
    Math.ceil(
      ranges.reduce((sum, r) => sum + byteLengthOf(r) + 1, 0) / ranges.length,
    ),
  );
  const target = Math.floor(BLOCK_BYTES * 0.6);
  const groupSize = Math.max(2, Math.floor(target / avg));
  const groups: RangeSpec[][] = [];
  for (let i = 0; i < ranges.length; i += groupSize)
    groups.push(ranges.slice(i, i + groupSize));
  const parents: RangeSpec[] = groups.map((group, i) => {
    const resource = writeNavigation(
      `${prefix}/_g${i}`,
      purpose,
      group,
      out,
      releaseId,
    );
    const parent: RangeSpec = {
      first: group[0]!.first,
      last: group.reduce(
        (m, r) => (compareStrings(r.last, m) > 0 ? r.last : m),
        group[0]!.last,
      ),
      resource,
    };
    const harness = group[0]!.harness_id;
    const topic = group[0]!.topic;
    if (
      harness &&
      topic &&
      group.every((r) => r.harness_id === harness && r.topic === topic)
    ) {
      parent.harness_id = harness;
      parent.topic = topic;
    }
    return parent;
  });
  if (byteLengthOf(navigation(releaseId, purpose, parents)) <= BLOCK_BYTES) {
    out.set(
      path,
      parseOnlineResource(navigation(releaseId, purpose, parents), releaseId),
    );
    return path;
  }
  // Extremely large vocabularies: recurse one more level and point the root at it.
  const deeper = writeNavigation(
    `${prefix}/_p`,
    purpose,
    parents,
    out,
    releaseId,
  );
  const root: RangeSpec = {
    first: parents[0]!.first,
    last: parents.reduce(
      (m, r) => (compareStrings(r.last, m) > 0 ? r.last : m),
      parents[0]!.last,
    ),
    resource: deeper,
  };
  out.set(
    path,
    parseOnlineResource(navigation(releaseId, purpose, [root]), releaseId),
  );
  return path;
}

function packPostings(
  purpose: "exact" | "lexical",
  index: PostingIndex,
  prefix: string,
  out: Map<string, OnlineResource>,
  releaseId: string,
): RangeSpec[] {
  const envelope = byteLengthOf({
    protocol_version: 1,
    release_id: releaseId,
    resource_kind: "postings",
    purpose,
    entries: [],
  });
  const ranges: RangeSpec[] = [];
  let block: RawPosting[] = [];
  let blockBytes = 0;
  let blockIndex = 0;
  const flush = () => {
    if (!block.length) return;
    const resource = `${prefix}/blocks/${String(blockIndex).padStart(4, "0")}.json`;
    out.set(
      resource,
      parseOnlineResource(
        {
          protocol_version: 1,
          release_id: releaseId,
          resource_kind: "postings",
          purpose,
          entries: block,
        },
        releaseId,
      ),
    );
    const range: RangeSpec = {
      first: block[0]!.term,
      last: block[block.length - 1]!.term,
      resource,
    };
    const harness = block[0]!.locator.harness_id;
    const topic = block[0]!.locator.topic;
    if (
      block.every(
        (posting) =>
          posting.locator.harness_id === harness &&
          posting.locator.topic === topic,
      )
    ) {
      range.harness_id = harness;
      range.topic = topic;
    }
    ranges.push(range);
    blockIndex += 1;
    block = [];
    blockBytes = 0;
  };
  for (const term of [...index.keys()].sort(compareStrings)) {
    for (const posting of [...index.get(term)!.values()].sort(
      comparePostings,
    )) {
      const size = byteLengthOf(posting) + 1;
      if (block.length && envelope + blockBytes + size - 1 > BLOCK_BYTES)
        flush();
      block.push(posting);
      blockBytes += size;
    }
  }
  flush();
  return ranges;
}

function packSections(
  locators: OnlineLocator[],
  prefix: string,
  out: Map<string, OnlineResource>,
  releaseId: string,
): RangeSpec[] {
  const envelope = byteLengthOf({
    protocol_version: 1,
    release_id: releaseId,
    resource_kind: "sections",
    entries: [],
  });
  const ranges: RangeSpec[] = [];
  let block: OnlineLocator[] = [];
  let blockBytes = 0;
  let blockIndex = 0;
  const first = locators[0]?.harness_id;
  const topic = locators[0]?.topic;
  const flush = () => {
    if (!block.length) return;
    const resource = `${prefix}/blocks/${String(blockIndex).padStart(4, "0")}.json`;
    out.set(
      resource,
      parseOnlineResource(
        {
          protocol_version: 1,
          release_id: releaseId,
          resource_kind: "sections",
          entries: block,
        },
        releaseId,
      ),
    );
    const range: RangeSpec = {
      first: block[0]!.section_id,
      last: block[block.length - 1]!.section_id,
      resource,
    };
    if (first && topic) {
      range.harness_id = first;
      range.topic = topic;
    }
    ranges.push(range);
    blockIndex += 1;
    block = [];
    blockBytes = 0;
  };
  for (const locator of locators) {
    const size = byteLengthOf(locator) + 1;
    if (block.length && envelope + blockBytes + size - 1 > BLOCK_BYTES) flush();
    block.push(locator);
    blockBytes += size;
  }
  flush();
  return ranges;
}

export function buildOnlineSearch(
  sections: SearchSection[],
  releaseId: string,
): Map<string, OnlineResource> {
  const out = new Map<string, OnlineResource>();
  const exact: PostingIndex = new Map();
  const lexical: PostingIndex = new Map();
  const scopes = new Map<
    string,
    { harness_id: string; topic: Topic; locators: Map<string, OnlineLocator> }
  >();

  for (const section of sections) {
    const locator: OnlineLocator = {
      harness_id: section.harness_id,
      topic: section.topic,
      edition_id: section.edition_id,
      section_id: section.section_id,
      surface_ids: [...new Set(section.surface_ids)].sort(compareStrings),
    };
    const offerExact = (value: string, match: MatchKind) => {
      const term = normalizeText(value);
      if (term)
        offer(exact, {
          term,
          locator,
          match,
          fields: match === "exact_question_wording" ? ["wording"] : [],
        });
    };
    for (const id of section.question_ids) offerExact(id, "exact_question_id");
    for (const term of section.exact_terms)
      offerExact(term, "exact_config_term");
    for (const wording of section.question_wording)
      offerExact(wording, "exact_question_wording");
    for (const alias of section.aliases) offerExact(alias, "alias");

    const lexicalFields = new Map<string, Set<Field>>();
    const addLexical = (source: string, field: Field) => {
      if (!source) return;
      for (const term of segmentTerms(source)) {
        let fields = lexicalFields.get(term);
        if (!fields) lexicalFields.set(term, (fields = new Set()));
        fields.add(field);
      }
    };
    addLexical(section.title, "title");
    addLexical(section.body, "body");
    for (const wording of section.question_wording)
      addLexical(wording, "wording");
    for (const [term, fields] of lexicalFields)
      offer(lexical, {
        term,
        locator,
        match: "full_text",
        fields: [...fields].sort(compareStrings),
      });

    const scopeKey = `${section.harness_id}/${section.topic}`;
    let scope = scopes.get(scopeKey);
    if (!scope)
      scopes.set(
        scopeKey,
        (scope = {
          harness_id: section.harness_id,
          topic: section.topic,
          locators: new Map(),
        }),
      );
    scope.locators.set(`${locator.edition_id}|${locator.section_id}`, locator);
  }

  const exactRanges = packPostings(
    "exact",
    exact,
    `${SEARCH_ROOT}/exact`,
    out,
    releaseId,
  );
  const lexicalRanges = packPostings(
    "lexical",
    lexical,
    `${SEARCH_ROOT}/lexical`,
    out,
    releaseId,
  );
  const exactPath = writeNavigation(
    `${SEARCH_ROOT}/exact`,
    "exact",
    exactRanges,
    out,
    releaseId,
  );
  const lexicalPath = writeNavigation(
    `${SEARCH_ROOT}/lexical`,
    "lexical",
    lexicalRanges,
    out,
    releaseId,
  );

  const harnessRanges: RangeSpec[] = [];
  for (const harness of [
    ...new Set([...scopes.values()].map((s) => s.harness_id)),
  ].sort(compareStrings)) {
    const topicRanges: RangeSpec[] = [];
    for (const scope of [...scopes.values()]
      .filter((s) => s.harness_id === harness)
      .sort((a, b) => compareStrings(a.topic, b.topic))) {
      const locators = [...scope.locators.values()].sort(
        (a, b) =>
          compareStrings(a.edition_id, b.edition_id) ||
          compareStrings(a.section_id, b.section_id),
      );
      const ranges = packSections(
        locators,
        `${SCOPE_ROOT}/${harness}/${scope.topic}`,
        out,
        releaseId,
      );
      const resource = writeNavigation(
        `${SCOPE_ROOT}/${harness}/${scope.topic}`,
        "scope",
        ranges,
        out,
        releaseId,
      );
      topicRanges.push({
        first: scope.topic,
        last: scope.topic,
        resource,
        harness_id: harness,
        topic: scope.topic,
      });
    }
    const resource = writeNavigation(
      `${SCOPE_ROOT}/${harness}`,
      "scope",
      topicRanges,
      out,
      releaseId,
    );
    harnessRanges.push({
      first: harness,
      last: harness,
      resource,
      harness_id: harness,
    });
  }
  writeNavigation(SCOPE_ROOT, "scope", harnessRanges, out, releaseId);

  const manifest = {
    protocol_version: 1,
    release_id: releaseId,
    resource_kind: "search_manifest",
    capability: "lexical_only",
    rules: {
      format: lexicalRules.format,
      segmentation: lexicalRules.segmentation,
      normalization: lexicalRules.normalization,
      ranking: lexicalRules.ranking,
      weights: lexicalRules.weights,
      block_bytes: lexicalRules.block_bytes,
      index_bytes: lexicalRules.index_bytes,
      candidates: lexicalRules.candidates,
      chapter_bytes: lexicalRules.chapter_bytes,
    },
    environment: {
      node: process.version,
      icu: process.versions.icu ?? "unknown",
    },
    exact: exactPath,
    lexical: lexicalPath,
    scopes: `${SCOPE_ROOT}/`,
  };
  out.set(
    `${SEARCH_ROOT}/manifest.json`,
    parseOnlineResource(manifest, releaseId),
  );
  return out;
}

export interface OnlineSearchResult {
  release_id: string;
  locator: OnlineLocator;
  match: MatchKind;
  fields: Field[];
  question_ids: string[];
  preview: string;
  source_scope: SourceScope[];
}

export interface OnlineSearchPage {
  release_id: string;
  results: OnlineSearchResult[];
  next_cursor?: string;
}

export interface OnlineSearchRequest {
  releaseId: string;
  manifest: unknown;
  read: (relative: string) => Promise<Buffer>;
  text?: string | undefined;
  harness?: string | undefined;
  topic?: Topic | undefined;
  surface_id?: string | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
}

class Budget {
  private readonly indexPaths = new Set<string>();
  private readonly chapterPaths = new Set<string>();
  private indexBytes = 0;
  private chapterBytes = 0;

  chargeIndex(path: string, bytes: number): void {
    if (this.indexPaths.has(path)) return;
    this.indexPaths.add(path);
    this.indexBytes += bytes;
    if (this.indexBytes > lexicalRules.index_bytes)
      throw new OnlineSearchError("query_too_broad");
  }

  chargeChapter(path: string, bytes: number): void {
    if (this.chapterPaths.has(path)) return;
    this.chapterPaths.add(path);
    this.chapterBytes += bytes;
    if (this.chapterBytes > lexicalRules.chapter_bytes)
      throw new OnlineSearchError("query_too_broad");
  }
}

function sectionBodyOf(body: string, sectionId: string): string | undefined {
  const headings = [...body.matchAll(/^## (.+) \{#([a-z][a-z0-9_-]*)\}\s*$/gm)];
  const index = headings.findIndex((heading) => heading[2] === sectionId);
  if (index < 0) return undefined;
  return body.slice(headings[index]!.index, headings[index + 1]?.index).trim();
}

/** 240 UTF-16 code units without splitting a surrogate pair. */
function clip(text: string, limit = 240): string {
  if (text.length <= limit) return text;
  let end = limit;
  if (/[\uD800-\uDBFF]/.test(text[end - 1]!)) end -= 1;
  return text.slice(0, end);
}

function previewOf(body: string, needles: string[]): string {
  const haystack = body.toLowerCase();
  let hit = -1;
  for (const needle of needles) {
    const at = haystack.indexOf(needle);
    if (at >= 0 && (hit < 0 || at < hit)) hit = at;
  }
  if (hit < 0) return clip(body.trim());
  let start = Math.max(0, hit - 100);
  if (start > 0 && /[\uDC00-\uDFFF]/.test(body[start]!)) start -= 1;
  return clip(body.slice(start, start + 241).trim());
}

function cursorDigest(binding: string, position: number): string {
  return createHash("sha256")
    .update(`${binding}\u0000${position}`)
    .digest("base64url");
}

function encodeCursor(binding: string, position: number): string {
  return Buffer.from(
    JSON.stringify({
      b: binding,
      p: position,
      d: cursorDigest(binding, position),
    }),
    "utf8",
  ).toString("base64url");
}

function decodeCursor(cursor: string): { b: string; p: number } | undefined {
  try {
    const parsed = JSON.parse(
      Buffer.from(cursor, "base64url").toString("utf8"),
    ) as {
      b?: unknown;
      p?: unknown;
      d?: unknown;
    };
    if (
      typeof parsed.b !== "string" ||
      !Number.isInteger(parsed.p) ||
      (parsed.p as number) < 0 ||
      typeof parsed.d !== "string"
    )
      return undefined;
    const position = parsed.p as number;
    if (cursorDigest(parsed.b, position) !== parsed.d) return undefined;
    return { b: parsed.b, p: position };
  } catch {
    return undefined;
  }
}

export async function queryOnlineSearch(
  request: OnlineSearchRequest,
): Promise<OnlineSearchPage> {
  const { releaseId, read } = request;
  const manifest = parseOnlineResource(
    request.manifest,
    releaseId,
  ) as OnlineSearchManifest;
  if (manifest.resource_kind !== "search_manifest")
    throw new Error("Expected a search manifest.");

  const budget = new Budget();
  const load = async (path: string): Promise<OnlineResource> => {
    resourcePathSchema.parse(path);
    const buffer = await read(path);
    budget.chargeIndex(path, buffer.byteLength);
    return parseOnlineResource(
      JSON.parse(buffer.toString("utf8")) as unknown,
      releaseId,
    );
  };

  const harness = request.harness;
  const topic = request.topic;
  const surface = request.surface_id;
  const selected = (range: RangeSpec): boolean => {
    if (harness && range.harness_id && range.harness_id !== harness)
      return false;
    if (topic && range.topic && range.topic !== topic) return false;
    return true;
  };

  interface Candidate {
    locator: OnlineLocator;
    match: MatchKind;
    fields: Set<Field>;
    terms: Set<string>;
  }
  const candidates = new Map<string, Candidate>();
  const addCandidate = (
    locator: OnlineLocator,
    match: MatchKind,
    fields: Field[],
    term: string | undefined,
  ): void => {
    if (surface && !locator.surface_ids.includes(surface)) return;
    if (harness && locator.harness_id !== harness) return;
    if (topic && locator.topic !== topic) return;
    const key = `${locator.edition_id}|${locator.section_id}`;
    let candidate = candidates.get(key);
    if (!candidate) {
      candidates.set(
        key,
        (candidate = { locator, match, fields: new Set(), terms: new Set() }),
      );
      if (candidates.size > CANDIDATE_LIMIT)
        throw new OnlineSearchError("query_too_broad");
    }
    if (MATCH_RANK[match] < MATCH_RANK[candidate.match])
      candidate.match = match;
    for (const field of fields) candidate.fields.add(field);
    if (term) candidate.terms.add(term);
  };

  const needles: string[] = [];
  const terms: string[] = [];
  const normalizedText =
    request.text === undefined ? undefined : normalizeText(request.text);

  const collectPostings = async (
    root: string,
    wanted: string[],
    expected: "exact" | "lexical",
  ): Promise<void> => {
    const wantedSet = new Set(wanted);
    const visit = async (path: string): Promise<void> => {
      const resource = await load(path);
      if (resource.resource_kind === "navigation") {
        if (resource.purpose !== expected)
          throw new Error("Search navigation purpose mismatch.");
        for (const range of resource.ranges)
          if (
            selected(range) &&
            wanted.some((term) => range.first <= term && term <= range.last)
          )
            await visit(range.resource);
        return;
      }
      if (resource.resource_kind !== "postings")
        throw new Error("Unexpected search resource.");
      if (resource.purpose !== expected)
        throw new Error("Search postings purpose mismatch.");
      for (const entry of resource.entries) {
        if (!wantedSet.has(entry.term)) continue;
        if (harness && entry.locator.harness_id !== harness) continue;
        if (topic && entry.locator.topic !== topic) continue;
        addCandidate(entry.locator, entry.match, entry.fields, entry.term);
      }
    };
    await visit(root);
  };

  const collectScope = async (root: string): Promise<void> => {
    const visit = async (path: string): Promise<void> => {
      const resource = await load(path);
      if (resource.resource_kind === "navigation") {
        if (resource.purpose !== "scope")
          throw new Error("Scope navigation purpose mismatch.");
        for (const range of resource.ranges)
          if (selected(range)) await visit(range.resource);
        return;
      }
      if (resource.resource_kind !== "sections")
        throw new Error("Unexpected scope resource.");
      for (const entry of resource.entries)
        addCandidate(entry, "filter", [], undefined);
    };
    await visit(root);
  };

  if (normalizedText) {
    needles.push(normalizedText);
    terms.push(...segmentTerms(request.text!));
    await collectPostings(manifest.exact, [normalizedText], "exact");
    await collectPostings(manifest.lexical, terms, "lexical");
  } else {
    await collectScope(`${manifest.scopes}index.json`);
  }

  const ranked = [...candidates.values()]
    .map((candidate) => ({
      ...candidate,
      coverage: candidate.terms.size,
      weight: Math.max(
        0,
        ...[...candidate.fields].map((field) => FIELD_WEIGHTS[field]),
      ),
    }))
    .sort(
      (a, b) =>
        MATCH_RANK[a.match] - MATCH_RANK[b.match] ||
        b.coverage - a.coverage ||
        b.weight - a.weight ||
        compareStrings(a.locator.edition_id, b.locator.edition_id) ||
        compareStrings(a.locator.section_id, b.locator.section_id),
    );

  const binding = JSON.stringify({
    v: lexicalRules.format,
    release: releaseId,
    text: normalizedText ?? null,
    terms: normalizedText
      ? [...new Set(segmentTerms(request.text!))].sort(compareStrings)
      : [],
    harness: harness ?? null,
    topic: topic ?? null,
    surface: surface ?? null,
    rank: lexicalRules.ranking,
  });

  let position = 0;
  if (request.cursor !== undefined) {
    const decoded = decodeCursor(request.cursor);
    if (!decoded || decoded.b !== binding)
      throw new OnlineSearchError("invalid_cursor");
    position = decoded.p;
  }

  const limit = Math.min(20, Math.max(1, request.limit ?? 10));
  const window = ranked.slice(position, position + limit);
  const nextPosition = position + window.length;

  const chapters = new Map<string, OnlineResource>();
  const results: OnlineSearchResult[] = [];
  for (const candidate of window) {
    const editionPath = `chapters/${candidate.locator.edition_id}.json`;
    let chapter = chapters.get(editionPath);
    if (!chapter) {
      resourcePathSchema.parse(editionPath);
      const buffer = await read(editionPath);
      budget.chargeChapter(editionPath, buffer.byteLength);
      chapter = parseOnlineResource(
        JSON.parse(buffer.toString("utf8")) as unknown,
        releaseId,
      );
      chapters.set(editionPath, chapter);
    }
    if (chapter.resource_kind !== "chapter")
      throw new Error("Unexpected chapter resource.");
    const edition = chapter.chapter;
    if (
      edition.edition_id !== candidate.locator.edition_id ||
      edition.harness_id !== candidate.locator.harness_id ||
      edition.topic !== candidate.locator.topic
    )
      throw new Error("Chapter resource identity mismatch.");
    const section = edition.sections.find(
      (item) => item.section_id === candidate.locator.section_id,
    );
    if (!section) throw new Error("Chapter section not found.");
    const body = sectionBodyOf(edition.body, candidate.locator.section_id);
    if (body === undefined)
      throw new Error("Section body not found in chapter.");
    const preview =
      candidate.match === "full_text"
        ? previewOf(body, [...new Set([...needles, ...terms])])
        : clip(body.trim());
    const refs = new Set(section.source_refs);
    const scoped = chapter.source_scope.filter((scope) =>
      refs.has(scope.reference_id),
    );
    if (
      [...refs].some(
        (id) =>
          !chapter.source_scope.some((scope) => scope.reference_id === id),
      )
    )
      throw new Error("Section source reference missing from chapter scope.");
    results.push({
      release_id: releaseId,
      locator: candidate.locator,
      match: candidate.match,
      fields: [...candidate.fields].sort(compareStrings),
      question_ids: edition.questions
        .filter((question) =>
          question.answers.some(
            (answer) => answer.section_id === candidate.locator.section_id,
          ),
        )
        .map((question) => question.question_id),
      preview,
      source_scope: scoped,
    });
  }

  const page: OnlineSearchPage = { release_id: releaseId, results };
  if (nextPosition < ranked.length)
    page.next_cursor = encodeCursor(binding, nextPosition);
  return page;
}
