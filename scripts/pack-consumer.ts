import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { npmCli, runNode } from "./consumer-process.js";

const destination = path.resolve("var/consumer-package");
await mkdir(destination, { recursive: true });
const output = await runNode(
  [
    await npmCli(),
    "pack",
    "--json",
    "--ignore-scripts",
    "--pack-destination",
    destination,
  ],
  path.resolve("packages/consumer"),
  {
    ...process.env,
    npm_config_cache: path.join(destination, "npm-cache"),
    npm_config_userconfig: path.join(destination, "empty.npmrc"),
  },
);
const packed = JSON.parse(output)[0] as {
  filename: string;
  size: number;
  unpackedSize: number;
  files: { path: string }[];
};
for (const file of packed.files)
  assert(
    !/(^|\/)(compiler|validation|sources|cli|knowledge|registry|archive|node_modules|tests|scripts)(\/|$)|sqlite|ollama|semantic-file/.test(
      file.path,
    ),
    `Forbidden consumer artifact: ${file.path}`,
  );
for (const required of [
  "dist/consumer/index.js",
  "LICENSE",
  "LICENSE-knowledge",
  "NOTICE",
])
  assert(
    packed.files.some((file) => file.path === required),
    `Missing ${required}`,
  );
await writeFile(
  path.join(destination, "manifest.json"),
  `${JSON.stringify(packed, null, 2)}\n`,
);
process.stdout.write(
  `${path.join(destination, packed.filename)} (${packed.size} bytes)\n`,
);
