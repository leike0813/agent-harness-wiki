import * as z from "zod";

const digest = z.string().regex(/^[a-f0-9]{64}$/);
export const modelLockSchema = z.strictObject({
  name: z.string().min(1),
  digest,
  blob_sha256: digest,
  dimensions: z.int().positive(),
  license: z.string().min(1),
  source_url: z.url(),
});
export type ModelLock = z.infer<typeof modelLockSchema>;

// The endpoint is configurable so a release can be built against another local
// Ollama instance (for example one that offloads the embedding model to a GPU).
export const OLLAMA_ENDPOINT =
  process.env.OLLAMA_ENDPOINT ?? "http://127.0.0.1:11434";

async function jsonResponse(url: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) throw new Error(`Local Ollama HTTP ${response.status}.`);
  return response.json() as Promise<unknown>;
}

export async function assertLocalModel(
  lock: ModelLock,
  endpoint = OLLAMA_ENDPOINT,
): Promise<void> {
  const tags = z
    .object({
      models: z.array(z.object({ name: z.string(), digest })),
    })
    .parse(await jsonResponse(`${endpoint}/api/tags`));
  if (
    !tags.models.some(
      (model) => model.name === lock.name && model.digest === lock.digest,
    )
  )
    throw new Error(
      `Required local Ollama model is missing or changed: ${lock.name}.`,
    );
  const shown = z.object({ modelfile: z.string() }).parse(
    await jsonResponse(`${endpoint}/api/show`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: lock.name }),
    }),
  );
  if (!shown.modelfile.includes(`sha256-${lock.blob_sha256}`))
    throw new Error(`Local Ollama model blob changed: ${lock.name}.`);
}

export async function embedLocal(
  lock: ModelLock,
  inputs: string[],
  endpoint = OLLAMA_ENDPOINT,
): Promise<number[][]> {
  if (!inputs.length) return [];
  const result = z
    .object({
      model: z.string(),
      embeddings: z.array(z.array(z.number().finite())),
    })
    .parse(
      await jsonResponse(`${endpoint}/api/embed`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          model: lock.name,
          input: inputs,
          truncate: false,
        }),
      }),
    );
  if (
    result.model !== lock.name ||
    result.embeddings.length !== inputs.length ||
    result.embeddings.some((vector) => vector.length !== lock.dimensions)
  )
    throw new Error(
      "Local Ollama embedding response differs from the model lock.",
    );
  return result.embeddings;
}
