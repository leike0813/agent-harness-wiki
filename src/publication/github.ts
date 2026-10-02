import { open } from "node:fs/promises";
import * as z from "zod";
import {
  publicationStateSchema,
  initialState,
  type PublicationState,
} from "./state.js";

const shaSchema = z.string().regex(/^[a-f0-9]{40}$/);
const contentsSchema = z.object({
  sha: shaSchema,
  content: z.string(),
  encoding: z.literal("base64"),
});
const assetSchema = z.object({
  id: z.int().positive(),
  name: z.string(),
  size: z.int().nonnegative(),
});
const releaseSchema = z.object({
  id: z.int().positive(),
  tag_name: z.string(),
  draft: z.boolean(),
  immutable: z.boolean().optional(),
  upload_url: z.string(),
  assets: z.array(assetSchema),
});
export type ArchiveRelease = z.infer<typeof releaseSchema>;
export type LedgerSnapshot = { state: PublicationState; sha: string };

export class PublicationError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

/** GitHub is the durable store; caches and runner workspaces are not authorities. */
export class PublicationGithub {
  readonly #base: URL;
  readonly #token: string;
  readonly repository: string;
  constructor(options: {
    repository: string;
    token: string;
    apiBase?: string;
  }) {
    if (
      !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(options.repository) ||
      !options.token
    )
      throw new PublicationError(
        "invalid_configuration",
        "A repository and GitHub operation token are required.",
      );
    this.repository = options.repository;
    this.#token = options.token;
    this.#base = new URL(
      (options.apiBase ?? "https://api.github.com").replace(/\/?$/, "/"),
    );
  }
  async #request(
    url: URL,
    method = "GET",
    body?: string | Buffer,
    binary = false,
  ): Promise<Response> {
    const response = await fetch(url, {
      method,
      headers: {
        authorization: `Bearer ${this.#token}`,
        accept:
          binary && method === "GET"
            ? "application/octet-stream"
            : "application/vnd.github+json",
        "content-type": binary ? "application/gzip" : "application/json",
        "x-github-api-version": "2022-11-28",
      },
      ...(body === undefined
        ? {}
        : { body: typeof body === "string" ? body : new Uint8Array(body) }),
      signal: AbortSignal.timeout(binary ? 300_000 : 30_000),
    });
    if (!response.ok && response.status !== 404) {
      await response.body?.cancel();
      throw new PublicationError(
        response.status === 409 || response.status === 422
          ? "state_conflict"
          : "github_failure",
        `GitHub ${method} failed (${response.status}); no state retry was performed.`,
      );
    }
    return response;
  }
  async #json(
    route: string,
    method = "GET",
    body?: unknown,
  ): Promise<unknown | null> {
    const response = await this.#request(
      new URL(route, this.#base),
      method,
      body === undefined ? undefined : JSON.stringify(body),
    );
    if (response.status === 404) {
      await response.body?.cancel();
      return null;
    }
    let bytes = 0;
    const chunks: Buffer[] = [];
    if (!response.body)
      throw new PublicationError(
        "github_failure",
        "GitHub response body is missing.",
      );
    for await (const chunk of response.body) {
      bytes += chunk.byteLength;
      if (bytes > 16 * 1024 * 1024)
        throw new PublicationError(
          "github_failure",
          "GitHub metadata response exceeds its bound.",
        );
      chunks.push(Buffer.from(chunk));
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  }
  async readState(): Promise<LedgerSnapshot> {
    const raw = await this.#json(
      `repos/${this.repository}/contents/state.json?ref=publication-state`,
    );
    if (!raw)
      throw new PublicationError(
        "state_missing",
        "publication-state/state.json is missing; initialize or reconcile it explicitly.",
      );
    const record = contentsSchema.parse(raw);
    return {
      sha: record.sha,
      state: publicationStateSchema.parse(
        JSON.parse(Buffer.from(record.content, "base64").toString("utf8")),
      ),
    };
  }
  async writeState(
    snapshot: LedgerSnapshot,
    message: string,
  ): Promise<LedgerSnapshot> {
    const state = publicationStateSchema.parse(snapshot.state);
    const raw = await this.#json(
      `repos/${this.repository}/contents/state.json`,
      "PUT",
      {
        branch: "publication-state",
        sha: snapshot.sha,
        message,
        content: Buffer.from(`${JSON.stringify(state, null, 2)}\n`).toString(
          "base64",
        ),
      },
    );
    const result = z
      .object({ content: z.object({ sha: shaSchema }) })
      .parse(raw);
    return { state, sha: result.content.sha };
  }
  async initialize(): Promise<LedgerSnapshot> {
    if (
      await this.#json(
        `repos/${this.repository}/git/ref/heads/publication-state`,
      )
    )
      return this.readState();
    const tree = z.object({ sha: shaSchema }).parse(
      await this.#json(`repos/${this.repository}/git/trees`, "POST", {
        tree: [
          {
            path: "state.json",
            mode: "100644",
            type: "blob",
            content: `${JSON.stringify(initialState(), null, 2)}\n`,
          },
        ],
      }),
    );
    const commit = z.object({ sha: shaSchema }).parse(
      await this.#json(`repos/${this.repository}/git/commits`, "POST", {
        message: "Initialize independent publication ledger",
        tree: tree.sha,
        parents: [],
      }),
    );
    await this.#json(`repos/${this.repository}/git/refs`, "POST", {
      ref: "refs/heads/publication-state",
      sha: commit.sha,
    });
    return this.readState();
  }
  async mainHead(): Promise<string> {
    return z
      .object({ object: z.object({ sha: shaSchema }) })
      .parse(await this.#json(`repos/${this.repository}/git/ref/heads/main`))
      .object.sha;
  }
  async archive(tag: string): Promise<ArchiveRelease | null> {
    const raw = await this.#json(
      `repos/${this.repository}/releases/tags/${encodeURIComponent(tag)}`,
    );
    if (raw !== null) return releaseSchema.parse(raw);
    // Draft releases have no published tag ref; list them to resume an upload.
    const releases = z
      .array(releaseSchema)
      .parse(
        await this.#json(`repos/${this.repository}/releases?per_page=100`),
      );
    return releases.find((release) => release.tag_name === tag) ?? null;
  }
  async createArchive(tag: string, commit: string): Promise<ArchiveRelease> {
    return releaseSchema.parse(
      await this.#json(`repos/${this.repository}/releases`, "POST", {
        tag_name: tag,
        target_commitish: shaSchema.parse(commit),
        name: tag,
        body: "Verified knowledge and reader pages. Code: MIT; original knowledge: CC BY 4.0; third-party rights: NOTICE. Deployment status is recorded separately in publication-state.",
        draft: true,
        make_latest: "false",
      }),
    );
  }
  async uploadArchive(
    release: ArchiveRelease,
    bytes: Buffer,
    name = "site.tar.gz",
  ): Promise<void> {
    if (!release.draft)
      throw new PublicationError(
        "immutable_archive",
        "Published archive assets cannot be changed.",
      );
    const url = new URL(release.upload_url.replace(/\{.*$/, ""));
    if (
      url.origin !== "https://uploads.github.com" &&
      url.origin !== this.#base.origin
    )
      throw new PublicationError(
        "invalid_configuration",
        "Unexpected archive upload origin.",
      );
    url.searchParams.set("name", name);
    const response = await this.#request(url, "POST", bytes, true);
    if (!response.ok)
      throw new PublicationError(
        "github_failure",
        "Archive upload did not succeed.",
      );
    await response.body?.cancel();
  }
  async publishArchive(release: ArchiveRelease): Promise<ArchiveRelease> {
    if (!release.draft) return release;
    const saved = releaseSchema.parse(
      await this.#json(
        `repos/${this.repository}/releases/${release.id}`,
        "PATCH",
        { draft: false, make_latest: "false" },
      ),
    );
    if (!saved.immutable)
      throw new PublicationError(
        "immutable_archive",
        "Enable repository immutable releases before publishing knowledge archives.",
      );
    return saved;
  }
  async archiveById(id: number): Promise<ArchiveRelease> {
    return releaseSchema.parse(
      await this.#json(`repos/${this.repository}/releases/${id}`),
    );
  }
  async downloadArchive(
    release: ArchiveRelease,
    destination: string,
  ): Promise<void> {
    const asset = release.assets.find((entry) => entry.name === "site.tar.gz");
    if (!asset)
      throw new PublicationError(
        "archive_missing",
        "The saved release has no site.tar.gz asset.",
      );
    if (asset.size > 513 * 1024 * 1024)
      throw new PublicationError(
        "archive_too_large",
        "Archive download exceeds its bound.",
      );
    const response = await this.#request(
      new URL(
        `repos/${this.repository}/releases/assets/${asset.id}`,
        this.#base,
      ),
      "GET",
      undefined,
      true,
    );
    if (!response.ok || !response.body)
      throw new PublicationError("archive_missing", "Archive download failed.");
    const file = await open(destination, "wx");
    try {
      let bytes = 0;
      for await (const chunk of response.body) {
        bytes += chunk.byteLength;
        if (bytes > 513 * 1024 * 1024)
          throw new PublicationError(
            "archive_too_large",
            "Archive download exceeds its bound.",
          );
        await file.write(Buffer.from(chunk));
      }
      if (bytes !== asset.size)
        throw new PublicationError(
          "archive_incomplete",
          "Downloaded archive size differs from its saved asset.",
        );
    } finally {
      await file.close();
    }
  }
  async pagesDeployment(id: string): Promise<string> {
    if (!/^[A-Za-z0-9_-]+$/.test(id))
      throw new PublicationError(
        "invalid_configuration",
        "Invalid deployment identity.",
      );
    const result = await this.#json(
      `repos/${this.repository}/pages/deployments/${id}`,
    );
    return z.object({ status: z.string() }).parse(result).status;
  }
  async environmentDeployment(commit: string): Promise<string> {
    const result = z
      .array(
        z.object({
          id: z.int().positive(),
          sha: shaSchema,
          environment: z.string(),
        }),
      )
      .parse(
        await this.#json(
          `repos/${this.repository}/deployments?environment=github-pages&sha=${shaSchema.parse(commit)}&per_page=10`,
        ),
      );
    const deployment = result.find(
      (entry) => entry.sha === commit && entry.environment === "github-pages",
    );
    if (!deployment)
      throw new PublicationError(
        "deployment_uncertain",
        "No matching github-pages environment deployment was found.",
      );
    return String(deployment.id);
  }
  async assertEnvironmentDeployment(id: string, commit: string): Promise<void> {
    if (!/^\d+$/.test(id))
      throw new PublicationError(
        "invalid_configuration",
        "Invalid environment deployment identity.",
      );
    const deployment = z
      .object({
        sha: shaSchema,
        environment: z.string(),
      })
      .parse(await this.#json(`repos/${this.repository}/deployments/${id}`));
    if (deployment.sha !== commit || deployment.environment !== "github-pages")
      throw new PublicationError(
        "deployment_uncertain",
        "Deployment does not match this publication attempt.",
      );
  }
  async environmentDeploymentStatus(id: string): Promise<string> {
    if (!/^\d+$/.test(id))
      throw new PublicationError(
        "invalid_configuration",
        "Invalid environment deployment identity.",
      );
    const result = z
      .array(z.object({ state: z.string() }))
      .parse(
        await this.#json(
          `repos/${this.repository}/deployments/${id}/statuses?per_page=1`,
        ),
      );
    if (!result[0])
      throw new PublicationError(
        "deployment_uncertain",
        "Deployment status is unavailable.",
      );
    return result[0].state;
  }
}
