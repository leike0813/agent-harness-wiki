import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as z from "zod";
import { recordSchemas } from "../src/domain/schema.js";
import { chapterRecordSchemas } from "../src/domain/chapter.js";

const directory = path.resolve("schemas");
await mkdir(directory, { recursive: true });
for (const [name, schema] of Object.entries({
  ...recordSchemas,
  ...chapterRecordSchemas,
})) {
  await writeFile(
    path.join(directory, `${name}.schema.json`),
    `${JSON.stringify(z.toJSONSchema(schema), null, 2)}\n`,
  );
}
