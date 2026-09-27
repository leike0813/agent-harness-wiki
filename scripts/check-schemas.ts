import { readFile } from "node:fs/promises";
import path from "node:path";
import * as z from "zod";
import { recordSchemas } from "../src/domain/schema.js";

for (const [name, schema] of Object.entries(recordSchemas)) {
  const expected = `${JSON.stringify(z.toJSONSchema(schema), null, 2)}\n`;
  const actual = await readFile(
    path.join("schemas", `${name}.schema.json`),
    "utf8",
  );
  if (actual !== expected) throw new Error(`Exported schema is stale: ${name}`);
}
