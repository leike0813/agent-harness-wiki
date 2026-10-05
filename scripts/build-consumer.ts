import { spawnSync } from "node:child_process";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { parse } from "yaml";
import { catalogSchema } from "../src/domain/catalog.js";

const root = path.resolve("packages/consumer");
await mkdir("var/consumer-build", { recursive: true });
const staging = await mkdtemp(path.resolve("var/consumer-build/runtime-"));
const previous = `${staging}-previous`;
let backedUp = false;
let promoted = false;
try {
  const compile = spawnSync(
    process.execPath,
    [
      "node_modules/typescript/bin/tsc",
      "-p",
      "packages/consumer/tsconfig.json",
    ],
    { stdio: "inherit" },
  );
  if (compile.status !== 0) throw new Error("Consumer compilation failed.");
  const seen = new Set<string>();
  const dependencies = JSON.parse(
    await readFile(path.join(root, "package.json"), "utf8"),
  ).dependencies as Record<string, string>;
  async function copyModule(relative: string): Promise<void> {
    if (seen.has(relative)) return;
    seen.add(relative);
    const source = await readFile(path.join("dist", relative), "utf8");
    const target = path.join(staging, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, source);
    for (const file of ts.preProcessFile(source).importedFiles) {
      if (file.fileName.startsWith(".")) {
        const imported = path.posix.normalize(
          path.posix.join(path.posix.dirname(relative), file.fileName),
        );
        if (
          imported.startsWith("../") ||
          /^(compiler|validation|sources|cli)\//.test(imported)
        )
          throw new Error(`Maintainer import in consumer: ${imported}`);
        await copyModule(imported);
      } else if (!file.fileName.startsWith("node:")) {
        const packageName = file.fileName.startsWith("@")
          ? file.fileName.split("/").slice(0, 2).join("/")
          : file.fileName.split("/")[0]!;
        if (!(packageName in dependencies))
          throw new Error(`Undeclared consumer dependency: ${packageName}`);
      }
    }
  }
  await copyModule("consumer/index.js");
  const catalog = catalogSchema.parse(
    parse(await readFile("catalog/harnesses.yaml", "utf8")),
  );
  const products = catalog.products.map(({ harness_id, name, aliases }) => ({
    harness_id,
    name,
    aliases,
  }));
  await mkdir(path.join(staging, "consumer/init"), { recursive: true });
  await writeFile(
    path.join(staging, "consumer/init/products.json"),
    `${JSON.stringify(products)}\n`,
  );
  try {
    await stat(path.join(root, "dist"));
    await rename(path.join(root, "dist"), previous);
    backedUp = true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  await rename(staging, path.join(root, "dist"));
  promoted = true;
  for (const file of ["LICENSE", "LICENSE-knowledge", "NOTICE"])
    await cp(file, path.join(root, file));
  process.stdout.write(`Consumer runtime: ${seen.size} compiled modules.\n`);
} catch (error) {
  if (promoted) await rm(path.join(root, "dist"), { recursive: true });
  if (backedUp) await rename(previous, path.join(root, "dist"));
  throw error;
} finally {
  await rm(staging, { recursive: true, force: true });
  if (promoted) await rm(previous, { recursive: true, force: true });
}
