# 开发指南

使用 `package.json` 与 `.node-version` 指定的 Node.js 24.x、pnpm 11.10.0；安装依赖使用 `pnpm install --frozen-lockfile`。不执行上游来源中的命令。虚构章节数据位于 `tests/fixtures/datasets/chapters/`，与正式知识隔离。

新增章节时，按 [固定问题清单](topic-questions.md)为每个问题记录状态、主要小节、具体说明和本问题来源引用。章节放在 `knowledge/<harness-id>/chapters/<edition-id>.md`；小节标题用 `{#section-id}`，引用用 `[@reference-id]`。来源引用和软件版本映射分别放在同产品的 `references/` 与 `mappings/`。另在 `registry/chapter-current.yaml` 选择当前章节。改写正文须创建新 `edition_id`，保留旧文件；新增版本映射无需修改章节。

运行 `pnpm chapters:validate` 校验虚构数据。运行 `pnpm chapters:build` 在隔离的 `var/chapter-release-fixture/releases/` 构建固定 ID `fixture-chapters`；该 ID 不可覆盖，重复构建前应改用显式命令和新 ID，例如：

```bash
pnpm exec tsx scripts/compile-chapters.ts --dataset-root tests/fixtures/datasets/chapters --profile fixture --release-id fixture-chapters-next --published-at 2026-09-29T00:00:00Z --releases-root var/chapter-release-fixture/releases
```

`pnpm exec vitest run tests/integration/chapter-release.test.ts` 检查版本选择、来源和映射边界、重复构建、发布一致性及失败时指针保留。修改 schema 后运行 `pnpm schema:export`、`pnpm schema:check`、`pnpm typecheck`、`pnpm lint`、`pnpm format:check`。正式来源原件另以 `pnpm sources:audit` 显式离线核对；普通章节校验和构建不依赖忽略的原件。

现有 `pnpm verify`、`pnpm fixtures:build`、公共查询、MCP 与站点仍验收 M0 Claim 读取链。新章节发布器只处理 schema 2，不适配旧 release。公共读取切换和五个真实产品的 35 篇章节属于 `m1-reader-guides`；本项不切换生产当前指针。Windows 尚未实测。
