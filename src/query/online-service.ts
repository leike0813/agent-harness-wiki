/**
 * Online consumer query service. Exposes the five read-only chapter queries
 * over one release fixed by an OnlineClient at open time. Every call reads only
 * release-relative published resources; compare shares a single resource and
 * time-budget context across all targets.
 */
import * as z from "zod";
import {
  consumerCompareTopicsSchema,
  consumerGetSourceSchema,
  consumerGetTopicSchema,
  consumerListHarnessesSchema,
  consumerSearchKnowledgeSchema,
} from "../domain/consumer.js";
import { parseOnlineResource, type OnlineResource } from "../domain/online.js";
import { OnlineError } from "./online-error.js";
import {
  OnlineClient,
  type OnlineClientOptions,
  type Operation,
} from "./online-client.js";
import { OnlineSearchError, queryOnlineSearch } from "./lexical.js";
import {
  assembleComparison,
  CursorError,
  page,
  projectChapter,
  resolveProduct,
  sectionText,
  selectEdition,
  type EditionCandidate,
} from "./chapter-query.js";
import {
  compareSchema,
  listSchema,
  searchSchema,
  sourceRequestSchema,
  topicRequestSchema,
} from "./schema.js";

type ListResult = z.infer<typeof consumerListHarnessesSchema>;
type TopicResult = z.infer<typeof consumerGetTopicSchema>;
type SearchResult = z.infer<typeof consumerSearchKnowledgeSchema>;
type CompareResult = z.infer<typeof consumerCompareTopicsSchema>;
type SourceResult = z.infer<typeof consumerGetSourceSchema>;

export interface OnlineMetadata {
  release_id: string;
  knowledge_published_at: string;
  access_mode: "online" | "offline";
}

/** Guidance for a selected edition retained outside the online history window. */
export const LOCAL_HISTORY_URL =
  "https://github.com/leike0813/agent-harness-wiki#local-full-history-release";

function toOnlineError(error: unknown, releaseId: string): OnlineError {
  if (error instanceof OnlineError) return error;
  if (error instanceof CursorError)
    return new OnlineError("invalid_cursor", error.message, { releaseId });
  if (error instanceof OnlineSearchError)
    return new OnlineError(error.code, `Search failed: ${error.code}.`, {
      releaseId,
    });
  if (error instanceof z.ZodError)
    return new OnlineError("invalid_input", "Query parameters are invalid.", {
      releaseId,
    });
  if (error instanceof Error && error.name === "AbortError")
    return new OnlineError(
      "operation_cancelled",
      "The operation was cancelled.",
      {
        releaseId,
      },
    );
  return new OnlineError(
    "invalid_release_data",
    "Published data could not be read.",
    {
      releaseId,
    },
  );
}

export class OnlineQueryService {
  readonly releaseId: string;
  readonly metadata: OnlineMetadata;
  private readonly client: OnlineClient;

  private constructor(client: OnlineClient) {
    this.client = client;
    this.releaseId = client.releaseId;
    this.metadata = {
      release_id: client.releaseId,
      knowledge_published_at: client.manifest.knowledge_published_at,
      access_mode: client.accessMode,
    };
  }

  static async open(
    options: OnlineClientOptions = {},
  ): Promise<OnlineQueryService> {
    return new OnlineQueryService(await OnlineClient.open(options));
  }

  close(): void {
    this.client.close();
  }

  async listHarnesses(
    input: unknown = {},
    signal?: AbortSignal,
  ): Promise<ListResult> {
    const op = this.client.operation(signal);
    try {
      const request = listSchema.parse(input);
      const query = request.query?.toLocaleLowerCase() ?? "";
      const items = this.client.catalog.products
        .filter(
          (product) =>
            request.scope === "catalog" ||
            product.registration === "registered",
        )
        .filter((product) =>
          [product.harness_id, product.name, ...product.aliases].some((alias) =>
            alias.toLocaleLowerCase().includes(query),
          ),
        )
        .map((product) => ({ ...product }));
      op.check();
      await op.checkpoint();
      return {
        ...this.metadata,
        ...page(items, request.limit, request.cursor, this.releaseId, {
          query,
          scope: request.scope,
        }),
      };
    } catch (error) {
      throw toOnlineError(error, this.releaseId);
    } finally {
      op.dispose();
    }
  }

  async getTopic(input: unknown, signal?: AbortSignal): Promise<TopicResult> {
    const op = this.client.operation(signal);
    try {
      return await this.loadTopic(topicRequestSchema.parse(input), op);
    } catch (error) {
      throw toOnlineError(error, this.releaseId);
    } finally {
      op.dispose();
    }
  }

  async searchKnowledge(
    input: unknown,
    signal?: AbortSignal,
  ): Promise<SearchResult> {
    const op = this.client.operation(signal);
    try {
      const request = searchSchema.parse(input);
      const product = request.harness
        ? resolveProduct(this.client.catalog.products, request.harness)
        : undefined;
      if (product === "ambiguous")
        return { ...this.metadata, status: "ambiguous", items: [] };
      if (request.harness && !product)
        return { ...this.metadata, status: "not_found", items: [] };
      if (
        product &&
        request.surface_id &&
        !product.surfaces.some(
          (surface) => surface.surface_id === request.surface_id,
        )
      )
        return { ...this.metadata, status: "not_found", items: [] };
      const searchManifest = await this.loadResource(
        op,
        this.client.manifest.search,
      );
      if (searchManifest.resource_kind !== "search_manifest")
        throw new OnlineError(
          "invalid_release_data",
          "Expected a search manifest.",
          { releaseId: this.releaseId },
        );
      const found = await queryOnlineSearch({
        releaseId: this.releaseId,
        manifest: searchManifest,
        read: (relative) => this.readResource(op, relative),
        signal: op.signal,
        checkpoint: async () => {
          op.check();
          await op.checkpoint();
        },
        text: request.text,
        harness: product ? product.harness_id : undefined,
        topic: request.topic,
        surface_id: request.surface_id,
        limit: request.limit,
        cursor: request.cursor,
      });
      const items = found.results.map((result) => ({
        harness_id: result.locator.harness_id,
        topic: result.locator.topic,
        edition_id: result.locator.edition_id,
        section_id: result.locator.section_id,
        surface_ids: result.locator.surface_ids,
        question_ids: result.question_ids,
        preview: result.preview,
        source_refs: result.source_scope.map((scope) => scope.reference_id),
        source_scope: result.source_scope,
        match: result.match,
      }));
      const status =
        product && product.topics.length === 0
          ? ("not_investigated" as const)
          : ("ok" as const);
      return {
        ...this.metadata,
        status,
        items,
        ...(found.next_cursor !== undefined
          ? { next_cursor: found.next_cursor }
          : {}),
      };
    } catch (error) {
      throw toOnlineError(error, this.releaseId);
    } finally {
      op.dispose();
    }
  }

  async compareTopics(
    input: unknown,
    signal?: AbortSignal,
  ): Promise<CompareResult> {
    const op = this.client.operation(signal);
    try {
      const request = compareSchema.parse(input);
      const fullResults: TopicResult[] = [];
      for (const target of request.targets) {
        await op.checkpoint();
        fullResults.push(
          await this.loadTopic({ ...target, topic: request.topic }, op),
        );
      }
      const assembled = assembleComparison(
        this.releaseId,
        request.topic,
        fullResults,
        request.question_ids,
      );
      return {
        ...this.metadata,
        history_scope: "current_and_previous" as const,
        ...assembled,
        results: assembled.results.map((result) =>
          typeof result === "object" &&
          result !== null &&
          "knowledge_published_at" in result
            ? result
            : {
                ...this.metadata,
                history_scope: "current_and_previous" as const,
                ...result,
              },
        ),
      };
    } catch (error) {
      throw toOnlineError(error, this.releaseId);
    } finally {
      op.dispose();
    }
  }

  async getSource(input: unknown, signal?: AbortSignal): Promise<SourceResult> {
    const op = this.client.operation(signal);
    try {
      const request = sourceRequestSchema.parse(input);
      const owner = await this.sourceOwner(op, request.reference_id);
      if (!owner)
        return {
          ...this.metadata,
          status: "not_found",
          surface_id: request.surface_id ?? null,
        };
      const resource = await this.loadResource(
        op,
        `sources/${request.reference_id}.json`,
        (value) => {
          if (
            value.resource_kind !== "source" ||
            value.reference.record.harness_id !== owner
          )
            throw new OnlineError(
              "invalid_release_data",
              `Source owner differs: ${request.reference_id}`,
              { releaseId: this.releaseId },
            );
        },
      );
      if (resource.resource_kind !== "source")
        throw new OnlineError(
          "invalid_release_data",
          "Expected a source resource.",
          { releaseId: this.releaseId },
        );
      const record = resource.reference.record;
      const product = this.client.catalog.products.find(
        (item) => item.harness_id === record.harness_id,
      );
      if (
        request.surface_id &&
        !product?.surfaces.some(
          (surface) => surface.surface_id === request.surface_id,
        )
      )
        return {
          ...this.metadata,
          status: "not_found",
          surface_id: request.surface_id,
        };
      return {
        ...this.metadata,
        status: "ok",
        surface_id: request.surface_id ?? null,
        source: {
          ...record,
          excerpt: Array.from(record.excerpt).slice(0, 2000).join(""),
        },
      };
    } catch (error) {
      throw toOnlineError(error, this.releaseId);
    } finally {
      op.dispose();
    }
  }

  private topicEmpty<S extends "ambiguous" | "not_found">(
    status: S,
    request: { version?: string | undefined; surface_id?: string | undefined },
  ) {
    return {
      ...this.metadata,
      history_scope: "current_and_previous" as const,
      status,
      requested_version: request.version ?? null,
      surface_id: request.surface_id ?? null,
    };
  }

  private async loadTopic(
    request: z.infer<typeof topicRequestSchema>,
    op: Operation,
  ): Promise<TopicResult> {
    await op.checkpoint();
    const product = resolveProduct(
      this.client.catalog.products,
      request.harness,
    );
    if (product === "ambiguous") return this.topicEmpty("ambiguous", request);
    if (!product) return this.topicEmpty("not_found", request);
    if (
      request.surface_id &&
      !product.surfaces.some(
        (surface) => surface.surface_id === request.surface_id,
      )
    )
      return this.topicEmpty("not_found", request);
    if (request.version && !request.surface_id)
      return {
        ...this.topicEmpty("ambiguous", request),
        harness_id: product.harness_id,
        surfaces: product.surfaces,
      };
    const notInvestigated = {
      ...this.metadata,
      history_scope: "current_and_previous" as const,
      status: "not_investigated" as const,
      requested_version: request.version ?? null,
      surface_id: request.surface_id ?? null,
      harness_id: product.harness_id,
      topic: request.topic,
      surfaces: product.surfaces,
      runtimes: product.runtimes,
      bindings: product.bindings,
    };
    if (!product.topics.includes(request.topic)) return notInvestigated;
    const topicResource = await this.loadResource(
      op,
      `topics/${product.harness_id}/${request.topic}/index.json`,
      (value) => {
        if (
          value.resource_kind !== "topic" ||
          value.harness_id !== product.harness_id ||
          value.topic !== request.topic
        )
          throw new OnlineError(
            "invalid_release_data",
            "Published topic identity differs.",
            { releaseId: this.releaseId },
          );
      },
    );
    if (topicResource.resource_kind !== "topic")
      throw new OnlineError(
        "invalid_release_data",
        "Published topic identity differs.",
        { releaseId: this.releaseId },
      );
    const candidates: EditionCandidate[] = topicResource.editions.map(
      (edition) => ({
        edition_id: edition.edition_id,
        availability: edition.availability,
        sections: edition.sections,
        mappings: edition.mappings,
      }),
    );
    const selection = selectEdition(
      candidates,
      topicResource.current,
      request.version,
      request.section_id,
      request.surface_id,
    );
    const selected = selection.edition;
    if (!selected) return notInvestigated;
    if (
      request.section_id &&
      !selected.sections.some(
        (section) => section.section_id === request.section_id,
      )
    )
      return this.topicEmpty("not_found", request);
    if (selected.availability === "trimmed")
      return {
        ...this.metadata,
        history_scope: "current_and_previous" as const,
        status: "history_not_available" as const,
        harness_id: product.harness_id,
        surface_id: request.surface_id ?? null,
        topic: request.topic,
        edition_id: selected.edition_id,
        resolution: selection.resolution,
        local_history_url: LOCAL_HISTORY_URL,
      };
    const selectedEdition = topicResource.editions.find(
      (edition) => edition.edition_id === selected.edition_id,
    );
    if (!selectedEdition || selectedEdition.availability !== "available")
      throw new OnlineError(
        "invalid_release_data",
        "Selected edition is not readable.",
        { releaseId: this.releaseId },
      );
    const chapterResource = await this.loadResource(
      op,
      selectedEdition.resource,
      (value) => {
        if (value.resource_kind !== "chapter")
          throw new OnlineError(
            "invalid_release_data",
            "Expected a chapter resource.",
            { releaseId: this.releaseId },
          );
        if (
          value.chapter.edition_id !== selected.edition_id ||
          value.chapter.harness_id !== product.harness_id ||
          value.chapter.topic !== request.topic
        )
          throw new OnlineError(
            "invalid_release_data",
            "Chapter identity differs from its topic.",
            { releaseId: this.releaseId },
          );
      },
    );
    if (chapterResource.resource_kind !== "chapter")
      throw new OnlineError(
        "invalid_release_data",
        "Expected a chapter resource.",
        { releaseId: this.releaseId },
      );
    const chapter = chapterResource.chapter;
    if (
      request.section_id &&
      !chapter.sections.some(
        (section) => section.section_id === request.section_id,
      )
    )
      return this.topicEmpty("not_found", request);
    for (const section of chapter.sections)
      if (sectionText(chapter.body, section.section_id) === undefined)
        throw new OnlineError(
          "invalid_release_data",
          `Section body is missing: ${section.section_id}`,
          { releaseId: this.releaseId },
        );
    const projection = projectChapter({
      chapter,
      surfaceId: request.surface_id,
      sectionId: request.section_id,
      surfaceIds: product.surfaces.map((surface) => surface.surface_id),
      sourceScope: chapterResource.source_scope,
    });
    await op.checkpoint();
    return {
      ...this.metadata,
      history_scope: "current_and_previous" as const,
      status: projection.status,
      harness_id: product.harness_id,
      surface_id: projection.surface_id,
      surfaces: product.surfaces,
      runtimes: product.runtimes,
      bindings: product.bindings,
      topic: projection.topic,
      edition_id: projection.edition_id,
      title: projection.title,
      body: projection.body,
      sections: projection.sections,
      questions: projection.questions,
      source_refs: projection.source_refs,
      source_scope: projection.source_scope,
      history: topicResource.editions.map((edition) => edition.edition_id),
      resolution: selection.resolution,
    };
  }

  private async readResource(
    op: Operation,
    relative: string,
    validate?: (resource: OnlineResource) => void,
  ): Promise<Buffer> {
    op.check();
    const buffer = await this.client.read(relative, op, validate);
    await op.checkpoint();
    return buffer;
  }

  private async loadResource(
    op: Operation,
    relative: string,
    validate?: (resource: OnlineResource) => void,
  ): Promise<OnlineResource> {
    const buffer = await this.readResource(op, relative, validate);
    let value: unknown;
    try {
      value = JSON.parse(buffer.toString("utf8"));
    } catch {
      throw new OnlineError(
        "invalid_release_data",
        `Published resource is not valid JSON: ${relative}`,
        { releaseId: this.releaseId },
      );
    }
    try {
      return parseOnlineResource(value, this.releaseId);
    } catch {
      throw new OnlineError(
        "invalid_release_data",
        `Published resource failed validation: ${relative}`,
        { releaseId: this.releaseId },
      );
    }
  }

  /** Directory owner of a registered reference, or undefined when absent. */
  private async sourceOwner(
    op: Operation,
    referenceId: string,
  ): Promise<string | undefined> {
    const walk = async (relative: string): Promise<string | undefined> => {
      const resource = await this.loadResource(op, relative);
      if (resource.resource_kind === "navigation") {
        if (resource.purpose !== "sources")
          throw new OnlineError(
            "invalid_release_data",
            "Unexpected source navigation.",
            { releaseId: this.releaseId },
          );
        for (const range of resource.ranges)
          if (range.first <= referenceId && referenceId <= range.last)
            return walk(range.resource);
        return undefined;
      }
      if (resource.resource_kind !== "source_directory")
        throw new OnlineError(
          "invalid_release_data",
          "Unexpected source directory.",
          { releaseId: this.releaseId },
        );
      return resource.entries.find(
        (entry) => entry.reference_id === referenceId,
      )?.harness_id;
    };
    return walk(this.client.manifest.sources);
  }
}
