# github-copilot local_transcripts 首采报告

- 审计 ID：`audit-github-copilot-6e6a5df9-1868-4f63-a805-2bfda137e2b9`
- 状态：`blocked`（与 `checks` 一致，本轮不改）
- 主题：`local_transcripts`（首次采写）
- 界面：`cli`
- 固定来源：commit `6783c47bfd23f2b497808cc3b8d217560bdf19bf`，基线 `a9ba11a191255b3f7b323b425b717f7db14b6c74`
- delivery：`pr`

## 来源失败

本轮 scan 有一条来源被记为 `blocked`：

| source_id | 类型 | 结果 |
|---|---|---|
| `source-github-copilot-docs-cli-concept` | official_documentation | HTTP 404 |

该来源是 `about-copilot-cli`（https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli.md ），是官方对“自动上下文管理”的一手说明。

## Triage 理由

来源失败**不阻止**本轮发布，理由有三：

1. **该页依赖的是既有快照。** 候选中已存在绑定到 `snapshot-github-copilot-docs-cli-concept` 的既有 reference（`ref-github-copilot-conc-context`），其 excerpt 逐字取自先前成功抓取的页面。404 意味着本轮**无法复核**该页是否变化，不意味着内容不存在。
2. **本主题的核心证据不依赖该页。** 会话存储目录树来自 `cli-best-practices`，`COPILOT_HOME` 与删除建议表来自 `cli-config-dir-reference`，命令行行为来自 `cli-command-reference`，会话格式改版、删除、分叉、命名、检查点、同步、日志清理等来自固定 commit 的 `changelog.md`。
3. **十题均给出了有证据的答案。** 状态纪律允许 `partial`；把来源失败当作“无法回答”会丢弃已证实的机制。

## 受影响的题

只有两题的部分证据受影响，且都不是关键机制：

| 题 | 状态 | 受影响部分 | 缺口如何处理 |
|---|---|---|---|
| `transcripts.scope` | `partial` | 自动压缩属于记录生命周期的一部分，概念页是其一手指南 | 正文改用 `cli-best-practices` 的 `checkpoints/` 与 `changelog.md` 的检查点条目支撑；概念页的 95% 阈值与 `/compact` 细节依赖既有快照，本轮未复核 |
| `transcripts.lifecycle` | `partial` | 自动压缩的触发时机与 `/compact` 手动触发 | 同上；其余生命周期结论（创建、追加、恢复、分支）不依赖该页 |

## 排除的题

其余八题**不依赖**该 404 页面，均由其它固定来源直接证实：

`transcripts.location`（`answered`，来自 `cli-best-practices` + `cli-config-dir-reference`）、`transcripts.naming`、`transcripts.format`、`transcripts.schema`、`transcripts.database`、`transcripts.archive`、`transcripts.cleanup`、`transcripts.diagnostics`。

## 证据

固定 commit 的源码侧证据全部落在 `changelog.md`（本仓库唯一可用的发布方自述文件），生成 artifact `artifact-github-copilot-lt-changelog-md` 与 snapshot `snapshot-github-copilot-lt-changelog-md`（`content_sha256` 由该文件真实字节计算）。本轮新增 14 条 reference：

- 存储格式与位置：`changelog-storage-layout-overhaul`（0.0.342 格式改版、`session-state` 与 `history-session-state` 的按需迁移）、`changelog-events-metrics`、`changelog-settings-json-split`
- 命名与分支：`changelog-session-name`、`changelog-continue-cwd`、`changelog-fork-branch`、`changelog-session-sync`
- 生命周期与检查点：`changelog-session-checkpoint`、`changelog-sessionend-hooks`、`changelog-session-resume-integrity`
- 删除与保留：`changelog-session-delete-subcommands`、`changelog-session-picker-delete`、`changelog-delete-old-sessions`、`changelog-logs-pruning`

文档侧复用既有 reference：`best-context`、`best-sessions`、`conc-context`、`cfgdir-overview`、`cfgdir-move`、`cfgdir-delete`、`cmp-hooks`、`cmdref-options`、`reporeadme-intro`。

## 结构性限制

公开仓库 `github/copilot-cli` 在该 commit 只有 18 个文件，**不含 CLI 实现代码**。因此：

- 无第一方源码可查 `events.jsonl` 的记录类型、字段、必填项、写入与刷盘策略、压缩分片规则；
- 未写 `mappings/`：源码 commit 不能证明 npm 发行包 `@github/copilot` 的行为，无逐小节证据即不写映射；
- 未提供 `events.jsonl` 示例记录——无已发布 schema，任何示例都是编造；
- `transcripts.database` 记为“未使用数据库”，但这是**基于已列举目录清单的否定性推断**，非厂商声明，故仍标 `partial`；
- 未在 Windows 或 macOS 上验证 `session-state` 路径形态，`changelog.md` 中所有路径均为 POSIX 写法。

## 复核结果

未做独立复核。理由：`status` 为 `blocked`（存在来源失败），且 `pending_question_ids` 非空，`review_status` 保持 `pending`，未写 `reviewed_by` / `reviewed_at`。

## Blocker

1. `source-github-copilot-docs-cli-concept` 持续 404，需要 GitHub 修正该文档 URL 或提供替代页面，才能复核自动上下文管理的一手表述。
2. `transcripts.schema` 存在**不可由现有来源闭合**的缺口：需要官方发布的记录格式说明或可核实的实现证据。在此之前该题保持 `partial`。
3. `transcripts.cleanup` 缺少官方对 `session-state/` 删除语义的说明；配置目录参考页的 safe-to-delete 表未覆盖该目录。正文按纪律**既不授权也不禁止**手工删除会话目录。
