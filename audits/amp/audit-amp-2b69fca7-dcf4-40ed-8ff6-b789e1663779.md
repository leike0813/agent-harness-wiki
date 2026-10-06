# Amp 上游审阅报告 · 2026-10-06（local_transcripts 首采）

- 审计记录：`audit-amp-2b69fca7-dcf4-40ed-8ff6-b789e1663779`（status `changed`，review_status `pending`）
- 本轮观察：21 个登记来源，其中 2 个非 unchanged（`source-amp-manual` 文档内容、`source-amp-npm` 版本身份）
- 本轮交付：新建 `local_transcripts` 首版章节 `amp-local_transcripts-v1`；其余七个主题的已发布答案未改动
- 交付方式：`delivery=pr`，未执行 publish、未切换本地发布指针、未运行受管包更新、未执行真实 Amp

## 给维护者的结论

Amp 的文档**没有**描述它把会话记录写到用户机器上的哪个位置、用什么格式、怎么清理。可得证据只覆盖两件事：thread 的语义与生命周期（`session.start`、回合事件序列、`session_id` 形如 `T-<uuid>`、`parentThreadID`），以及 `--stream-json` 在 stdout 上输出的逐行 JSON 事件。据此写了六题 partial、四题 unknown，并明确禁止读者把 `~/.config/amp/` 当作记录位置、或据此推断可以安全删除。

最需要维护者知道的风险是**证据面缺口**：本轮 21 个来源里只有 `source-amp-manual` 归档了原件，其余 19 个文档来源只有 snapshot 身份与既有引用摘录，无法逐页全文检索。这不是来源失败（19 个都报 `unchanged`），而是原件未保留，因此四题 unknown 属于"没查到"，不是"不存在"。

## 来源身份变化

| 来源 | 类型 | 状态 | 基线 | 本轮观察 |
| --- | --- | --- | --- | --- |
| `source-amp-manual` | official_documentation | changed | `c83203d24b80ca1561bb69a749d78f6f39f0caf3ba…` | `9440684f167360139e709a75543cfc527ea49d66f16a…`（原件已归档 `archive/amp/artifact-source-amp-manual-9440684f1673/source.md`） |
| `source-amp-npm` | npm_registry | changed | `0.0.1791091069-gb9917f@sha512-i+H++Q12PsB0X…` | `0.0.1791259278-gaa84b5@sha512-Sbg/hq/FPbVytJz…` |

`status` 保持 `changed`。`source-amp-npm` 仍是 `0.0.x` 预发布身份连续推进，本轮未运行 `pnpm managed:packages`，受管二进制核对留给 `harness-binary`。

## local_transcripts 的证据边界

已归档的 manual 原件（sha256 与本轮 observed 一致）全文检索 thread / conversation / session / transcript / local / storage / privacy / delete / export / retention / sync / history / sqlite / ampfile，命中全部是界面文案与前端渲染样板注释。可用的两条文字证据是「Threads: You can save and share your interactions with Amp.」和「Amp is the same agent and the same threads everywhere」——它们证明 thread 是**账号侧、跨界面**的交互单位，不能当作本机存储机制的证据。

十题逐题结论与关键定位：

| 问题 | 状态 | 关键证据 |
| --- | --- | --- |
| `transcripts.scope` | partial | `ref-amp-stream-json-output`（`--stream-json` init/user 记录含 cwd、session_id、tools、mcp_servers、parent_tool_use_id）、`ref-amp-plugins-events`（回合内 tool.call/tool.result 序列） |
| `transcripts.location` | unknown | 已查入口 manual 原件全文、20 个文档来源既有摘录、`ref-amp-settings-locations`、`ref-amp-plugins-locations`（只有配置与插件路径） |
| `transcripts.naming` | partial | `ref-amp-stream-json-output`（`session_id` 为 `T-<uuid>`）、`ref-amp-plugins-session-start`（`event.thread.id`）、`ref-amp-plugins-subagent`（`parentThreadID`）；无 thread id 与文件名对应关系 |
| `transcripts.format` | partial | `ref-amp-stream-json-output`（逐行 JSON 对象）、`ref-amp-execute-mode`（打印最终消息后退出） |
| `transcripts.schema` | partial | 只有上述两行示例的字段与嵌套结构；完整枚举、必填项、迁移、落盘 schema 均无来源 |
| `transcripts.lifecycle` | partial | `ref-amp-plugins-session-start`（首条消息或打开/切换已有线程；**无 `session.end`**）、`ref-amp-plugins-events`、`ref-amp-dial-first-message`、`ref-amp-execute-mode`、`ref-amp-plugins-ui-input` |
| `transcripts.database` | unknown | 没有任何来源提到 SQLite 或其它本地数据库 |
| `transcripts.archive` | partial | 仅 `ref-amp-manual-intro` 的账号侧保存/分享；本机归档开关、导出格式、恢复损失无来源 |
| `transcripts.cleanup` | unknown | `ref-amp-cli-accounts`（`amp logout --all` 删的是账号凭据，且不影响浏览器/原生 app 会话）与 thread 记录无关 |
| `transcripts.diagnostics` | unknown | `ref-amp-stream-json-output`（只能对活进程读流）、`ref-amp-cli-update`（`amp version`）、`ref-amp-cli-accounts`（`amp account list`）；无完整性检查/修复/重建工具 |

排除的题：无——本轮只调查 `amp` 的 `local_transcripts`，未触及其它主题的答案。

## 本轮改动与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| `local_transcripts` | `amp-local_transcripts-v1` | scope/naming/format/schema/lifecycle/archive：partial；location/database/cleanup/diagnostics：unknown | 新建，已加入 `registry/chapter-current.yaml` |

**发布：** 仅候选数据集，未切换本地发布指针。**受管二进制：** 未触发。

本轮**未新建**任何 reference、snapshot 或 artifact——19 个来源的原件不在候选内，按纪律不新建 `archived_document`；全部引用复用既有引用记录，因此没有 artifact 绑定错误与孤儿 artifact 风险。

## 待处理与独立复核

**审计记录：** `audits/amp/audit-amp-2b69fca7-dcf4-40ed-8ff6-b789e1663779.yaml`。**待处理旧审计：** 无。**待复核问题：** `skills.roots`、`skills.discovery`、`skills.collision`、`skills.conditions`——scan 因 `source-amp-manual` 变化推出的 skills 遗留 pending，本轮未改动，`review_status` 保持 `pending`。

`local_transcripts` 十题未触发独立复核条件：没有来源冲突，没有推翻已发布配置步骤，没有跨主题关键加载机制变化。

## 验证

```
pnpm maintenance:candidates check --candidate .../lt-batch-20261006/candidates/amp   # 通过（exit 0）
```

自检：`diff -rq baseline/amp candidates/amp` 只有 3 个文件不同（新章节、chapter-current.yaml、本轮审计 YAML）；正文 15 个 `[@ref]` 标记全部有对应 reference 文件；十题各一次；`local_transcripts` selection 唯一。

## 后续入口

1. 归档 `source-amp-docs-cli`、`cli/settings`、`customize/plugins`、`plugin-api`、`the-dial` 等页面原件后重跑本主题，可把 location/database/cleanup/diagnostics 从 unknown 推进。
2. 若要源码级答案，需先在 catalog/registry 为 amp 登记并固定仓库来源——目前 Amp 无仓库来源，全部结论只能是来源级知识，`version_applicability: unknown`。
3. `source-amp-manual` 每轮都报 changed（HTML 响应含每请求生成的 nonce），维护者可考虑把 URL 换成同页 markdown 渲染 `https://ampcode.com/docs/markdown` 以稳定字节身份。