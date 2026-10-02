import { existsSync, readFileSync } from "node:fs";

const navigationFile = new URL("./navigation.json", import.meta.url);
const navigation = existsSync(navigationFile)
  ? JSON.parse(readFileSync(navigationFile, "utf8"))
  : {};

export default {
  title: "Agent Harness Wiki",
  description: "有来源、有边界的 Agent 配置与扩展知识库。",
  lang: "zh-CN",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230f766e'/%3E%3Cpath d='m12 10-6 6 6 6m8-12 6 6-6 6' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
      },
    ],
  ],
  metaChunk: true,
  // ponytail: serial indexing for stable IDs; parallelize when upstream preserves order.
  buildConcurrency: 1,
  cleanUrls: true,
  themeConfig: {
    ...navigation,
    outline: { level: [2, 3], label: "本页目录" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    sidebarMenuLabel: "章节导航",
    returnToTopLabel: "返回顶部",
    darkModeSwitchLabel: "深色模式",
    lightModeSwitchTitle: "切换浅色模式",
    darkModeSwitchTitle: "切换深色模式",
    skipToContentLabel: "跳到正文",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/leike0813/agent-harness-wiki",
      },
    ],
    search: {
      provider: "local",
      options: {
        _render(
          src: string,
          env: {
            frontmatter?: {
              search?: boolean;
              portal?: {
                kind: string;
                product?: {
                  name: string;
                  aliases: string[];
                  topics: { name: string }[];
                };
              };
            };
          },
          md: {
            render: (source: string, env: unknown) => string;
            utils: { escapeHtml: (text: string) => string };
          },
        ) {
          const html = md.render(src, env);
          if (env.frontmatter?.search === false) return "";
          const portal = env.frontmatter?.portal;
          if (portal?.kind === "directory") return "";
          if (portal?.kind === "product" && portal.product) {
            const product = portal.product;
            return `<h1 id="product-overview">${md.utils.escapeHtml(product.name)}<a href="#product-overview"></a></h1><p>${md.utils.escapeHtml([...product.aliases, ...product.topics.map((topic) => topic.name)].join(" "))}</p>`;
          }
          return html;
        },
        locales: {
          root: {
            translations: {
              button: { buttonText: "搜索章节", buttonAriaLabel: "搜索章节" },
              modal: {
                displayDetails: "显示详细结果",
                resetButtonTitle: "清空搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有找到相关章节",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "回车",
                  navigateText: "切换",
                  navigateUpKeyAriaLabel: "上箭头",
                  navigateDownKeyAriaLabel: "下箭头",
                  closeText: "关闭",
                  closeKeyAriaLabel: "Esc",
                },
              },
            },
          },
        },
        miniSearch: {
          options: {
            // Self-contained: VitePress serializes this function into the browser.
            tokenize: (text: string) => {
              if (typeof Intl.Segmenter !== "function")
                return text.match(/[\p{L}\p{N}_]+/gu) ?? [];
              return Array.from(
                new Intl.Segmenter("zh", { granularity: "word" }).segment(text),
              )
                .filter((part) => part.isWordLike)
                .map((part) => part.segment);
            },
          },
        },
      },
    },
  },
};
