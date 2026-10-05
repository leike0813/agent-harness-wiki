import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import * as z from "zod";
import { resolveProduct } from "../../query/chapter-query.js";
import { InitError, type InitProduct } from "./types.js";

const productsSchema = z.array(
  z.object({
    harness_id: z.string(),
    name: z.string(),
    aliases: z.array(z.string()),
  }),
);

export async function loadInitProducts(): Promise<InitProduct[]> {
  try {
    return productsSchema.parse(
      JSON.parse(
        await readFile(new URL("./products.json", import.meta.url), "utf8"),
      ),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    // The private workspace runs TypeScript directly; packaged builds use the
    // catalog projection emitted by build-consumer, never a second identity list.
    const manifest = JSON.parse(
      await readFile(new URL("../../../package.json", import.meta.url), "utf8"),
    ) as { private?: boolean };
    if (!manifest.private)
      throw new InitError(
        "missing_catalog",
        "The installed product catalog is missing.",
      );
    const catalog = z
      .object({ products: productsSchema })
      .parse(
        parse(
          await readFile(
            new URL("../../../catalog/harnesses.yaml", import.meta.url),
            "utf8",
          ),
        ),
      );
    return catalog.products;
  }
}

export function selectInitProducts(
  products: readonly InitProduct[],
  expression: string,
): InitProduct[] {
  const selected = new Map<string, InitProduct>();
  for (const token of expression.split(",")) {
    const name = token.trim();
    const product = name ? resolveProduct(products, name) : undefined;
    if (!product || product === "ambiguous")
      throw new InitError(
        "invalid_tools",
        `Unknown or ambiguous harness: ${name || "(empty)"}.`,
      );
    selected.set(product.harness_id, product);
  }
  return [...selected.values()];
}
