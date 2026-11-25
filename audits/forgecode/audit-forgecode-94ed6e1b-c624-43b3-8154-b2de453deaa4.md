# forgecode 2026-11-24 巡检：文档站退役

## 观察

- 13 个已登记官方文档来源（`https://forgecode.dev/docs/*`）全部 404。
- `forgecode.dev` 已改为营销站；sitemap 只有 `/`、`/about/`、`/pricing/`、`/support/`、`/terms/`、`/privacy/`、`/blog/` 与一篇博文，无 docs 目录。
- 产品现名 **Antinomy**，官方文档首页 `https://www.antinomy.ai/docs/` 返回 200，但只有一段占位说明：legacy guides 已退役，新内容稍后发布。该站 sitemap 只有 `/docs/`，任何 topic 子页都重定向回占位页。
- 仓库 `tailcallhq/forgecode` README 仍链接 GitHub 的 `docs/` 目录，目录中只有 `docs/tool-guidelines.md`，不含原 13 个 topic 页。

## Triage

- 没有可替代的逐 topic 官方文档，也没有可执行的修复入口（旧站不可恢复、新站未发布内容）。
- 本轮不修改任何章节、快照、引用或 catalog 身份；既有章节保持固定在其旧快照与版本边界上。
- npm `2.13.21`、仓库 `a22b49288856d5b3f3ca57e8532683d54a662c8c` 本轮未变化。

## 结论与后续

`blocked`：等待 `antinomy.ai/docs` 发布逐 topic 文档后再登记观察入口。重复扫描同一批 404 不产生新信息。

产品更名（ForgeCode → Antinomy）属于 catalog 身份变更，影响展示与别名解析，本轮仅记录，交维护者决定是否调整 `catalog/harnesses.yaml`。
