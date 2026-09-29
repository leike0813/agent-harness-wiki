# 开发指南

使用 `package.json` 与 `.node-version` 指定的 Node.js 24.x、pnpm 11.10.0；安装依赖使用 `pnpm install --frozen-lockfile`。不执行上游来源中的命令。虚构章节数据位于 `tests/fixtures/datasets/chapters/`，与正式知识隔离。

新增章节时，按 [固定问题清单](topic-questions.md)为每个问题记录状态、主要小节、具体说明和本问题来源引用。章节放在 `knowledge/<harness-id>/chapters/<edition-id>.md`；小节标题用 `{#section-id}`，引用用 `[@reference-id]`。来源引用和软件版本映射分别放在同产品的 `references/` 与 `mappings/`。另在 `registry/chapter-current.yaml` 选择当前章节。改写正文须创建新 `edition_id`，保留旧文件；新增版本映射无需修改章节。

运行 `pnpm chapters:validate` 校验虚构数据。运行 `pnpm chapters:build` 在隔离的 `var/chapter-release-fixture/releases/` 构建固定 ID `fixture-chapters`；该 ID 不可覆盖，重复构建前应改用显式命令和新 ID，例如：

```bash
pnpm exec tsx scripts/compile-chapters.ts --dataset-root tests/fixtures/datasets/chapters --profile fixture --release-id fixture-chapters-next --published-at 2026-09-29T00:00:00Z --releases-root var/chapter-release-fixture/releases
```

`pnpm exec vitest run tests/integration/chapter-release.test.ts tests/integration/query.test.ts tests/integration/mcp.test.ts tests/integration/site.test.ts` 检查章节发布、版本选择、来源、真实 MCP stdio 和站点。修改 schema 后运行 `pnpm schema:export`、`pnpm schema:check`、`pnpm typecheck`、`pnpm lint`、`pnpm format:check`。正式来源原件另以 `pnpm sources:audit` 显式离线核对；普通章节校验和构建不依赖忽略的原件。

`pnpm verify` 验证章节读取链，`pnpm fixtures:build` 生成虚构章节发布。公共查询、MCP 与站点只读取 schema 2 发布，不适配旧 release。生产章节运行 `pnpm knowledge:validate`，用 `pnpm ahw compile --dataset-root . --profile production --release-id <new-id> --published-at <fixed-time> --stage` 先构建。验收该 release 的 CLI、MCP 与站点之后，运行 `pnpm ahw publish --release-id <new-id>` 原子切换当前指针。CLI 的 `query list/topic/search/compare/source` 与 MCP 的五个工具读取同一 release；`get_topic` 用 `section_id` 定位搜索结果。Windows 尚未实测。
