import { spawn } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stringify } from "yaml";
import type { ChapterPublishedKnowledge } from "../domain/chapter.js";
import { topicSchema } from "../domain/schema.js";
import { renderChapterDocs } from "./chapter-release.js";
import { topicNames } from "./docs.js";

const project = fileURLToPath(new URL("../../", import.meta.url));

export async function buildSitePages(options: {
  outDir: string;
  base?: string;
  knowledge: ChapterPublishedKnowledge;
  online?: boolean;
}): Promise<void> {
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
    const knowledge = options.knowledge;
    const registered = new Set(
      knowledge.records.harnesses.map((x) => x.harness_id),
    );
    const products = knowledge.records.catalog.products.map((product) => ({
      id: product.harness_id,
      name: product.name,
      aliases: product.aliases,
      surfaces: product.surfaces.map((surface) => ({
        id: surface.surface_id,
        name: surface.name,
        kind: surface.kind,
      })),
      topics: topicSchema.options
        .filter((topic) =>
          knowledge.records.current.some(
            (selection) =>
              selection.harness_id === product.harness_id &&
              selection.topic === topic,
          ),
        )
        .map((topic) => ({
          id: topic,
          name: topicNames[topic],
          href: `/harnesses/${product.harness_id}/${topic}`,
        })),
      ...(registered.has(product.harness_id)
        ? { href: `/harnesses/${product.harness_id}/index` }
        : {}),
      candidate: !registered.has(product.harness_id),
      sources: [
        ...new Set([
          ...product.reference_ids,
          ...product.surfaces.flatMap((surface) => surface.reference_ids),
          ...product.runtimes.flatMap((runtime) => runtime.reference_ids),
          ...product.bindings.flatMap((binding) => binding.reference_ids),
        ]),
      ].map((id) => ({ id, href: `/sources/${id}` })),
      runtimes: product.runtimes.map((runtime) => ({
        id: runtime.runtime_id,
        name: runtime.name,
      })),
      bindings: product.bindings.map((binding) => ({
        surface_id: binding.surface_id,
        ...(binding.runtime_id ? { runtime_id: binding.runtime_id } : {}),
        status: binding.status,
      })),
    }));
    const productById = new Map(
      products.map((product) => [product.id, product]),
    );
    const chapters = new Map(
      knowledge.records.chapters.map((chapter) => [
        chapter.edition_id,
        chapter,
      ]),
    );
    const home = { text: "首页", link: "/" };
    const catalog = { text: "产品目录", link: "/catalog" };
    const genericSidebar = [
      {
        text: "开始阅读",
        items: [catalog, { text: "阅读指南", link: "/reading-results" }],
      },
    ];
    const sidebar: Record<string, unknown> = { "/": genericSidebar };
    const pages = renderChapterDocs(knowledge, {
      online: options.online ?? false,
    });
    const frontmatter = new Map<string, Record<string, unknown>>();
    const summary = {
      products: registered.size,
      chapters: knowledge.records.current.length,
      topics: topicSchema.options.length,
    };
    frontmatter.set("docs/index.md", {
      layout: "home",
      title: "Agent 配置与扩展知识库",
      hero: {
        name: "Agent Harness Wiki",
        text: "找到配置方法，\n读懂扩展机制。",
        tagline:
          "查阅不同 Agent 产品的 Skills、MCP、Hooks 与配置机制。每篇章节保留固定来源、适用范围和调查缺口。",
        actions: [
          { theme: "brand", text: "浏览产品", link: "#products" },
          { theme: "alt", text: "阅读指南", link: "/reading-results" },
        ],
      },
      portal: {
        kind: "directory",
        heading: "从你的产品开始",
        intro: "选择产品，查阅它的配置与扩展章节。",
        products: products.filter((product) => !product.candidate),
        summary,
      },
    });
    pages.set("docs/index.md", "<KnowledgePortal />\n");
    frontmatter.set("docs/catalog.md", {
      layout: "page",
      title: "产品目录",
      portal: {
        kind: "directory",
        heading: "产品目录",
        intro:
          "浏览已收录产品与候选项。可读主题数量表示已有章节，不代表功能支持程度。",
        products,
      },
    });
    pages.set("docs/catalog.md", "<KnowledgePortal />\n");
    for (const product of products.filter((product) => !product.candidate)) {
      const navigation = [
        {
          text: product.name,
          items: [
            { text: "产品概览", link: product.href },
            ...product.topics.map((topic) => ({
              text: topic.name,
              link: topic.href,
            })),
          ],
        },
        ...genericSidebar,
      ];
      sidebar[`/harnesses/${product.id}/`] = navigation;
      const productCrumb = { text: product.name, link: product.href };
      frontmatter.set(`docs/harnesses/${product.id}/index.md`, {
        title: product.name,
        outline: false,
        breadcrumbs: [home, catalog, { text: product.name }],
        portal: { kind: "product", product },
      });
      pages.set(
        `docs/harnesses/${product.id}/index.md`,
        "<KnowledgePortal />\n",
      );
      for (const topic of product.topics) {
        frontmatter.set(`docs/harnesses/${product.id}/${topic.id}.md`, {
          title: `${product.name} · ${topic.name}`,
          breadcrumbs: [home, catalog, productCrumb, { text: topic.name }],
        });
      }
    }
    for (const [edition, chapter] of chapters) {
      const product = productById.get(chapter.harness_id)!;
      sidebar[`/chapters/${edition}`] =
        sidebar[`/harnesses/${product.id}/`] ?? genericSidebar;
      frontmatter.set(`docs/chapters/${edition}.md`, {
        title: `${product.name} · ${topicNames[chapter.topic]} · 历史版`,
        search: false,
        breadcrumbs: [
          home,
          catalog,
          { text: product.name, link: product.href },
          { text: "历史章节" },
        ],
      });
    }
    for (const file of pages.keys()) {
      if (file.startsWith("docs/sources/"))
        frontmatter.set(file, {
          search: false,
          breadcrumbs: [home, catalog, { text: "固定来源" }],
        });
    }
    pages.set(
      "docs/reading-results.md",
      await readFile(path.join(project, "site/reading-results.md"), "utf8"),
    );
    frontmatter.set("docs/reading-results.md", {
      title: "阅读指南",
      breadcrumbs: [home, { text: "阅读指南" }],
    });
    const fixture =
      knowledge.profile === "fixture"
        ? "> Fictional fixture data. 虚构测试数据。\n\n"
        : "";
    for (const [file, body] of pages) {
      const target = path.join(temporary, file);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(
        target,
        `---\n${stringify(frontmatter.get(file) ?? {})}---\n\n${frontmatter.get(file)?.portal || file === "docs/reading-results.md" ? fixture : ""}${body}`,
        "utf8",
      );
    }
    await cp(
      path.join(project, "site/.vitepress"),
      path.join(docs, ".vitepress"),
      {
        recursive: true,
        filter: (source) => !["dist", "cache"].includes(path.basename(source)),
      },
    );
    await writeFile(
      path.join(docs, ".vitepress/navigation.json"),
      JSON.stringify({
        nav: [
          home,
          { ...catalog, activeMatch: "^/(catalog|harnesses|chapters)" },
          { text: "阅读指南", link: "/reading-results" },
        ],
        sidebar,
        release: {
          id: knowledge.release_id,
          publishedAt: knowledge.knowledge_published_at,
          online: options.online ?? false,
          fixture: knowledge.profile === "fixture",
        },
      }),
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
