import type { Theme } from "vitepress";
import { useData, withBase } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import KnowledgePortal from "./KnowledgePortal.vue";
import "./custom.css";

type Crumb = { text: string; link?: string };
type Release = {
  id: string;
  publishedAt: string;
  online: boolean;
  fixture: boolean;
};

/** Trail from `frontmatter.breadcrumbs`; the last entry is the current page. */
const AhwBreadcrumbs = {
  name: "AhwBreadcrumbs",
  setup() {
    const { frontmatter } = useData();
    return () => {
      const crumbs = frontmatter.value.breadcrumbs as Crumb[] | undefined;
      if (!crumbs?.length) return null;
      return h(
        "nav",
        { class: "ahw-breadcrumbs", "aria-label": "当前位置" },
        h(
          "ol",
          { class: "ahw-breadcrumbs__list" },
          crumbs.map((crumb, index) => {
            const current = index === crumbs.length - 1;
            return h(
              "li",
              { class: "ahw-breadcrumbs__item" },
              current || !crumb.link
                ? h(
                    "span",
                    current ? { "aria-current": "page" } : null,
                    crumb.text,
                  )
                : h("a", { href: withBase(crumb.link) }, crumb.text),
            );
          }),
        ),
      );
    };
  },
};

/** Single footer for every page, reading `theme.release` from navigation.json. */
const AhwFooter = {
  name: "AhwFooter",
  setup() {
    const { theme } = useData();
    return () => {
      const release = (theme.value as { release?: Release }).release;
      if (!release) return null;
      return h("footer", { class: "ahw-footer" }, [
        h("div", { class: "ahw-footer__inner" }, [
          release.fixture
            ? h("span", { class: "ahw-footer__badge" }, "虚构 fixture 数据")
            : null,
          h("span", { class: "ahw-footer__release" }, [
            "知识发布 ",
            h("code", null, release.id),
          ]),
          h(
            "span",
            { class: "ahw-footer__time" },
            `发布时间 ${release.publishedAt}`,
          ),
          release.online
            ? h(
                "span",
                { class: "ahw-footer__note" },
                "在线版仅保留当前章节与最近一个历史版本，完整历史请用本地 ahw 查询。",
              )
            : null,
        ]),
      ]);
    };
  },
};

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "doc-before": () => h(AhwBreadcrumbs),
      "layout-bottom": () => h(AhwFooter),
    }),
  enhanceApp(context) {
    DefaultTheme.enhanceApp?.(context);
    context.app.component("KnowledgePortal", KnowledgePortal);
  },
} satisfies Theme;
