import { readFile } from "node:fs/promises";
import path from "node:path";
import * as z from "zod";
import { recordSchemas } from "../src/domain/schema.js";
import { chapterRecordSchemas } from "../src/domain/chapter.js";
import { onlineRecordSchemas } from "../src/domain/online.js";
import { consumerRecordSchemas } from "../src/domain/consumer.js";

for (const [name, schema] of Object.entries({
  ...recordSchemas,
  ...chapterRecordSchemas,
  ...onlineRecordSchemas,
  ...consumerRecordSchemas,
})) {
  const expected = `${JSON.stringify(z.toJSONSchema(schema), null, 2)}\n`;
  const actual = await readFile(
    path.join("schemas", `${name}.schema.json`),
    "utf8",
  );
  if (actual !== expected) throw new Error(`Exported schema is stale: ${name}`);
}
