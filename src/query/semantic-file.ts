import { createReadStream, createWriteStream } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline";
import { semanticIndexSchema, type SemanticIndex } from "./search-index.js";

// The index holds one vector per bounded passage, so it grows with the number of
// products. A single JSON document would have to be built and parsed as one
// string, which stops working once the index passes the engine's string limit;
// JSON Lines keeps both directions streaming.
export const semanticFileName = "semantic.jsonl";
// Releases built before the streaming index keep their single-document file; it
// is still read so an existing release stays verifiable and cacheable.
const legacySemanticFileName = "semantic.json";

export async function writeSemanticIndex(
  dir: string,
  index: SemanticIndex,
): Promise<void> {
  const out = createWriteStream(path.join(dir, semanticFileName));
  await new Promise<void>((resolve, reject) => {
    out.on("error", reject);
    out.write(
      `${JSON.stringify({ schema_version: index.schema_version, model: index.model })}\n`,
    );
    for (const passage of index.passages)
      out.write(`${JSON.stringify(passage)}\n`);
    out.end(resolve);
  });
}

export async function readSemanticIndex(
  dir: string,
  file: string = semanticFileName,
): Promise<SemanticIndex> {
  if (file === legacySemanticFileName)
    return semanticIndexSchema.parse(
      JSON.parse(await readFile(path.join(dir, file), "utf8")),
    );
  const input = createReadStream(path.join(dir, file));
  const lines = createInterface({ input, crlfDelay: Infinity });
  let header: { schema_version: unknown; model: unknown } | undefined;
  const passages: unknown[] = [];
  try {
    for await (const line of lines) {
      if (!line.trim()) continue;
      const parsed = JSON.parse(line) as unknown;
      if (!header)
        header = parsed as { schema_version: unknown; model: unknown };
      else passages.push(parsed);
    }
  } finally {
    lines.close();
    input.destroy();
  }
  if (!header) throw new Error("Semantic index is empty.");
  return semanticIndexSchema.parse({ ...header, passages });
}
