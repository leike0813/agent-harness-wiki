import { spawn } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ChapterPublishedKnowledge } from "../domain/chapter.js";
import { renderChapterDocs } from "./chapter-release.js";

const project = fileURLToPath(new URL("../../", import.meta.url));

export async function buildSitePages(options: {
  outDir: string;
  base?: string;
  knowledge?: ChapterPublishedKnowledge;
  docsDir?: string;
  online?: boolean;
  profile?: "fixture" | "production";
}): Promise<void> {
  if (Boolean(options.knowledge) === Boolean(options.docsDir))
    throw new Error("Select one verified page source.");
  const base = options.base ?? "/";
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(base))
    throw new Error("Invalid site base path.");
  await mkdir(path.join(project, "var"), { recursive: true });
  const temporary = await mkdtemp(path.join(project, "var/ahw-site-source-"));
  try {
    await writeFile(
      path.join(temporary, "package.json"),
      JSON.stringify({ private: true, type: "module" }),
    );
    const docs = path.join(temporary, "docs");
    if (options.docsDir) await cp(options.docsDir, docs, { recursive: true });
    else {
      for (const [file, body] of renderChapterDocs(options.knowledge!, {
        online: options.online ?? false,
      })) {
        const target = path.join(temporary, file);
        await mkdir(path.dirname(target), { recursive: true });
        await writeFile(target, body, "utf8");
      }
    }
    await writeFile(
      path.join(docs, "reading-results.md"),
      `${(options.knowledge?.profile ?? options.profile) === "fixture" ? "> Fictional fixture data.\n\n" : ""}${await readFile(path.join(project, "site/reading-results.md"), "utf8")}${options.knowledge ? `\n知识发布：\`${options.knowledge.release_id}\`。\n` : ""}`,
    );
    const index = path.join(docs, "index.md");
    await writeFile(
      index,
      `${await readFile(index, "utf8")}\n[Reading results](reading-results.md)\n`,
    );
    await mkdir(path.join(docs, ".vitepress"), { recursive: true });
    await writeFile(
      path.join(docs, ".vitepress/config.mts"),
      "export default { metaChunk: true };\n",
    );
    const child = spawn(
      process.execPath,
      [
        path.join(project, "site/node_modules/vitepress/bin/vitepress.js"),
        "build",
        docs,
        "--base",
        base,
        "--outDir",
        path.resolve(options.outDir),
      ],
      { cwd: temporary, stdio: ["ignore", "inherit", "inherit"] },
    );
    await new Promise<void>((resolve, reject) => {
      child.once("error", reject);
      child.once("exit", (code, signal) =>
        code === 0
          ? resolve()
          : reject(new Error(`VitePress failed (${code ?? signal}).`)),
      );
    });
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}
