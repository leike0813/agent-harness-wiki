import { spawnSync } from "node:child_process";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = path.resolve("packages/consumer");
await mkdir("var/consumer-build", { recursive: true });
const staging = await mkdtemp(path.resolve("var/consumer-build/runtime-"));
const compile = spawnSync(
  process.execPath,
  ["node_modules/typescript/bin/tsc", "-p", "packages/consumer/tsconfig.json"],
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
try {
  await stat(path.join(root, "dist"));
  await rename(path.join(root, "dist"), `${staging}-previous`);
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
}
await rename(staging, path.join(root, "dist"));
for (const file of ["LICENSE", "LICENSE-knowledge", "NOTICE"])
  await cp(file, path.join(root, file));
process.stdout.write(`Consumer runtime: ${seen.size} compiled modules.\n`);
