# CodeBuddy 上游审阅报告 · 2026-10-13（monitor-20261013-codebuddy）

## 给维护者的结论

固定提交 `ae82976cd…`（`docs: 自动同步 CodeBuddy Code 文档和变更日志`）相对基线 `7576ffa8…` 改动 9 个文件。本轮范围限 `hooks` 的四个固定问题，实际逐字 diff 了 `docs/hooks.md` 与 `docs/tools-reference.md`，其余 7 个文件按任务排除项只作确认并记录。

`docs/hooks.md` 只增了一行正文（第 664 行，一段「上下文注入说明」），没有任何删除。这一段写明了此前分散在别处、且表述含糊的一件事：**stdout 一旦解析为 JSON 对象，就不会把原文整体投递给 Agent**；要补上下文必须用该事件支持的 `hookSpecificOutput.additionalContext`；`UserPromptSubmit`、`SessionStart` 这类支持 stdout 上下文注入的事件，只把**未解析为 JSON 对象**的 stdout 当作纯文本兜底，而 `suppressOutput: true` 关闭的正是这条兜底通道，不影响 `systemMessage` 的界面提示，也不影响显式的 `additionalContext`。这改写了已发布的 stdout 契约，落在 `hooks.output`。

因此本轮：**`hooks.output` 判定为变化并改写**；`hooks.events`、`hooks.input`、`hooks.entry` 逐字核对后判定无变化（事件家族、`Hook 输入` 全部小节、`配置`/`结构`/`项目特定的 Hook 脚本` 三节均逐字未动）。四题的 `status` 都仍是 `answered`——变化的是答案内容，不是答案状态。

## 逐题判定

| 固定问题 | 判定 | 依据 |
| --- | --- | --- |
| `hooks.events` | 无变化 | `docs/hooks.md` 事件表（第 333–457 行）与各事件小节逐字未变；新增段落只提到 `UserPromptSubmit`、`SessionStart` 两个已登记事件，未新增或改名任何一方事件 |
| `hooks.input` | 无变化 | `Hook 输入` 节（第 458–612 行）不在 diff 范围内，stdin 公共字段与各事件输入结构未变 |
| `hooks.output` | **变化** | 第 664 行新增段落改写 stdout 契约：`ref-codebuddy-hooks-output-context`（`docs/hooks.md:660-664`，快照固定在 `ae82976`） |
| `hooks.entry` | 无变化 | `配置`（第 22 行）、`结构`（第 35 行）、`项目特定的 Hook 脚本`（第 92 行）均逐字未变；`settings.json` 的 `hooks` 键结构、matcher 与 `hooks[]` 字段没有新增或改名 |

`docs/tools-reference.md` 的唯一改动是第 77 行把「只读调用可以并发」一句补上并发上限（默认最多 10 个，超出按顺序排队，可用 `CODEBUDDY_MAX_TOOL_USE_CONCURRENCY` 调整）。工具名与事件名列表逐字未变——这正是任务排除项要求确认的那一点，结论是**没有改变任何已登记的工具名或事件名**，因此不改写 hooks 章节，也不把它写成 hooks 的引用。它属于工具并发与 `configuration` 主题。

## 新增证据

- `artifact-codebuddy-docs-hooks-20261014`：`git_source_file`，只记 commit `ae82976cd…`、`docs/hooks.md`、`content_sha256: 8710c599…`，无临时路径、无源码副本。
- `snapshot-codebuddy-docs-hooks-20261014`：`source_revision`，绑上述 artifact，`version_identity.kind: commit`。
- `ref-codebuddy-hooks-output-context`：`file_lines` 定位 `docs/hooks.md:660-664`，摘录含 `**消息字段说明**` 两条与新增的「上下文注入说明」整段，逐字取自固定提交。

已发布引用一个字未改——`ref-codebuddy-hooks-output` 仍绑定旧快照 `snapshot-codebuddy-docs`，继续为 v1/v2 服务。

## 排除并记录的 7 个文件

`CHANGELOG.md`、`docs/env-vars.md`、`docs/http-api.md`、`docs/mods-api.md`、`docs/release-notes/README.md`、`docs/release-notes/v2.166.0.md`、`docs/security.md`。它们不在本轮四个固定问题的范围内。

其中两点需要点名，避免下游误以为漏看：`CHANGELOG.md` 与 `docs/release-notes/v2.166.0.md` 确实含 hook 条目（「修复 hook 的 `systemMessage` 用户提示意外进入模型上下文的问题，界面提示、纯文本 stdout 和显式 `additionalContext` 行为保持不变」「修复命令型 hook 输出提示信息时出错卡住」），方向与本轮新增段落一致，可作为该段落的行为背景；但它们是发行记录，按任务排除项本轮不作为 hooks 引用、不据此新建章节。`docs/http-api.md` 提到此前可用未授权写入 `ConfigChange` Hook 实现远程命令执行、现在 `--serve` 默认开启密码认证，那属于 server 运行时与 `configuration`/安全主题，本轮不动。`docs/mods-api.md`（+476 行）是新增页面，Mods 侧问题仍由 `audit-codebuddy-ce6431f3` 的未结案复核承担。

## 指针与复核

`registry/chapter-current.yaml` **未改动**：`hooks` 仍指向 `codebuddy-cli-hooks-v2`。理由与 v3 是否发布无关：`hooks.conditions`（Mods 启用闸门）的独立复核仍未完成，v2 是当前安全选择。另一条边界：`codebuddy-cli-hooks-v3` 已合入 main，因此本轮的 `hooks-io` 改写**不**落在 v3 上，按维护契约第 4 节新建完整 edition `codebuddy-cli-hooks-v4`，v3 文件逐字保持基线。v4 未被选入指针，`registry/chapter-current.yaml` 保持原状；指针切换待复核完成后由父进程处理。

**需独立复核：`hooks.output`。** 本轮把 stdout 的投递边界改写成一条读者可执行的判据（JSON 对象 vs 纯文本、`suppressOutput` 关的是哪条通道），属于「新证据改写已发布机制表述」，按维护契约第 5 节不作者自审替代。复核范围应限于：摘录定位与逐字一致性、`additionalContext` 在 `UserPromptSubmit`/`SessionStart`/`PostToolUse` 三处文档示例与本段表述是否冲突、以及 pointer 切换时机。`hooks.conditions`（Mods 启用闸门）的复核仍未完成，由 `audit-codebuddy-ce6431f3` 承担，本审计通过 `pending_audit_refs` 引用它，不通过标 `reviewed` 间接关闭。

## 版本映射

本轮**未新建任何软件版本映射**。来源是未带版本号的文档仓库，无法证明任何 npm 发行版的二进制行为，沿用来源级知识表述；本轮也不主张新增段落自 2.166.0 起成立——虽然发行记录有对应修复条目，但按排除项未取证。

## 验证与差异入口

`pnpm maintenance:candidates check --candidate /tmp/ahw-monitor-fa60cb88-ac51-446f-83dd-ae9a5d0a45e2-QlS6z6/batch-1/candidates/codebuddy` 退出码 0。审计改写后曾两次报错并已修掉：一次是 `pending_question_ids` 里非 hooks 的题缺少对应 impact（收窄 impacts 时误删，现按「保留原有 7 个非 hooks impact、只收窄 hooks 的」修正），一次是 YAML 重写把 `checked_at` 输出成 `2026-10-13 18:01:42.554000+00:00`（`Invalid ISO datetime`，已改回 `Z` 结尾）。

固定工作区内的只读核对：`docs/hooks.md:660-664` 逐行确认；`docs/tools-reference.md:77` 整行确认。`git diff --stat` 核对 9 文件清单。未复制任何源码或文档原件进候选。

本轮使用的固定源码工作区：`ws-ae82976cdedc-5012246c-087c-4271-812e-49e694db4371`（`source-codebuddy-docs` @ `ae82976cdedc6fc812a66b2c2d8d5eaf7524097a`），由父进程打开；本 worker 未新建、未关闭工作区，也未重扫来源。

本轮改动文件：

```text
knowledge/codebuddy/chapters/codebuddy-cli-hooks-v4.md                            （新增完整 edition，hooks-io 改写；v3 逐字未动）
knowledge/codebuddy/references/ref-codebuddy-hooks-output-context.yaml            （新增）
knowledge/codebuddy/artifacts/artifact-codebuddy-docs-hooks-20261014.yaml          （新增）
knowledge/codebuddy/snapshots/snapshot-codebuddy-docs-hooks-20261014.yaml          （新增）
audits/codebuddy/audit-codebuddy-9f90f95d-….yaml                                  （改写）
audits/codebuddy/audit-codebuddy-9f90f95d-….md                                    （新增，本文件）
```
