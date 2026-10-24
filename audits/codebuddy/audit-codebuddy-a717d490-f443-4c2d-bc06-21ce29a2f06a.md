# CodeBuddy 上游审阅报告 · 2026-10-22

## 给维护者的结论

文档仓库从 `79abbc5…` 前进到 `3d2d64bb…`，20 个 changed paths 里与本轮固定的两个主题、五个问题有关的是七个文档：`docs/settings.md`、`docs/cli-reference.md`、`docs/env-vars.md`、`docs/slash-commands.md`、`docs/sub-agents.md`、`docs/interactive-mode.md`、`docs/web-ui.md`。逐文件读实际 hunk 后，机制级变化只有三处：

1. `codebuddy.mainAgent` 的 `default` / `lastUsed` 语义被重写，并明确了两条以前没写清的规则：进程 `--agent` 压过 `lastUsed` 且不写 `default`；交互 TUI 在 `default` 与 `lastUsed` 都没设置时新会话默认 PTC，其余入口默认 `cli`。
2. `CODEBUDDY_MAX_RETRIES` 默认从 1 改为 8，重试错误集从「429 / 502 / 503 / 529 / 超时 / 锁超时」扩成「429 / 除 570-579 外的 5xx / 超时 / 锁超时」，退避从 500ms 起步改成 1s 起步、2 倍增长、单次封顶 32s，网关 `retry_policy` 覆盖时的固定重试次数同步改为 8。
3. `/branch` 与 `/fork` 从「含子代理历史的对话暂不支持分支」改为「关联的已结束子代理转录会独立复制」。

`docs/settings.md` 另新增 `daemon.preventSleep`（默认 `true`）。`docs/sub-agents.md` 的唯一新增行是自定义代理字段 `disable-model-invocation`，属 `custom_agents` 主题；`docs/web-ui.md` 新增的是中继 Web 访问能力；`docs/interactive-mode.md` 只把 `/agent-mode` 的默认 PTC 补进正文——这三处都不改变 transcript 的记录范围、存储布局、导出或清理机制。

据此改写两个主题：`configuration` 升到 v5（只改 `config-defaults` 小节），`local_transcripts` 升到 v3（只改 `transcripts-storage-layout` 的命名规则段与 `transcripts-session-lifecycle` 的分支段）。其余小节、其余问题原样保留。

## 定位失效与重新锚定

把 `references/` 下所有 `file_lines` 引用按 locator 在本轮提交上重读，与基线相比只有三条由命中变为不再命中：

<!-- prettier-ignore -->
| 已发布引用 | 原定位 | 本轮情况 | 处理 |
| --- | --- | --- | --- |
| `ref-codebuddy-lt-settings-cleanup-command` | `docs/settings.md:753-758` | 本地数据清理一节整体下移，正文逐字未变，现为 `:755-759` | 新增 `ref-codebuddy-lt-settings-cleanup-command-20261022`，v3 的保留与诊断两节改引新锚点 |
| `ref-codebuddy-lt-slash-resume-fork` | `docs/slash-commands.md:47-48` | `/fork` 行被重写，旧摘录不再成立 | 新增 `ref-codebuddy-lt-slash-branch`（第 20 行）与 `ref-codebuddy-lt-slash-fork`（第 47 行）替代 |
| `ref-codebuddy-settings-daemon-restart` | `docs/settings.md:91` | 第 91 行被新增的 `daemon.preventSleep` 占用，`autoRestartOnUpdate` 下移到 92 行、内容不变 | configuration v5 仍用它证明自动重启键（对其快照有效），另新增 `ref-codebuddy-settings-prevent-sleep` 证明新键 |

另有若干引用（`env-vars`、`CHANGELOG`、`mods` 等）在本轮基线之前就已锚定更早的修订快照，对各自快照仍有效，本轮不改写——这是快照机制的预期形态，不是回归。

## 证据边界

- CodeBuddy Code 闭源；本章结论只证明官方文档在该提交上这样写，不代表验证过任何 `@tencent-ai/codebuddy` 发行包的运行时行为。
- npm 由 `2.167.0` 变为 `2.172.1@sha512-W0EM…`，只更新身份，不据此建立版本映射。
- `docs/web-ui.md` 的中继 Web 访问、`docs/http-api.md` 的 `fs/locate` 与 Lite 变体端点、`docs/models.md` 的 TUI 描述语言、`docs/goal.md` 的评估提示词、`docs/mods-api.md` 的删除都是新增能力或无关删除，不属于本轮固定的两个主题与五个问题，未改写。
- `/branch` 复制子代理转录的底层实现（复制还是重建会话文件）文档没说，v3 的缺口段保留该问题并改写措辞。

## 本次交付

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `codebuddy-cli-configuration-v5` | `config.defaults`：answered（新增主 Agent 默认值、重试默认值、休眠默认值三段）；其余六题不变 | 候选内，待父进程集成 |
| local_transcripts | `codebuddy-local_transcripts-v3` | `transcripts.naming`：partial（分支改为独立复制子代理转录，父子字段缺口保留）；`transcripts.lifecycle`：partial（同一语义变化）；`transcripts.cleanup`、`transcripts.diagnostics`：partial（结论不变，引用重新锚定）；其余六题不变 | 候选内，待父进程集成 |

新增记录：4 个 `git_source_file`（settings / cli-reference / env-vars / slash-commands @ `3d2d64bb…`）、4 个 `source_revision` 快照、7 条引用。旧 edition 文件逐字未改，`registry/chapter-current.yaml` 只切换这两个主题的选择。

## 待处理与复核

`pending_audit_refs` 里的 `audit-codebuddy-9f90f95d` 与 `audit-codebuddy-b2f1e4d2` 保持各自的 pending 状态：前者仍列着本轮冻结范围之外的问题（`hooks.*`、`agents.*`、`mcp.*` 等），本审计不代为结案。本审计自身的五个固定问题全部给出结论；但这两个未结的旧审计仍把同样的五个问题列为未结，所以 `pending_question_ids` 保留这五个问题 id，本审计不代为结案。

**复核触发判断（已更正）。** 本轮推翻了已发布的读者可见表述：`codebuddy-local_transcripts-v2`（`v2:189`、`v2:233`）写「含子代理历史的对话会提示暂不支持」，而固定提交 `docs/slash-commands.md:20`（`/branch`）与 `:47`（`/fork`）已改为「关联的已结束子代理转录会独立复制」。这正是 maintenance 第 5 节「新证据推翻已发布配置步骤（读者会照做的步骤）」的独立复核触发条件，因此本轮必须走独立复核，不能以 worker 自检结案。独立复核 `rev2-codebuddy`（2026-10-24）返回 changes_requested，五个固定问题全部 upheld（无结论被改正），其四条意见已按下文修订；审计仍保持 `review_status: pending`，不写 `reviewed_by` / `reviewed_at`。

**跨主题矛盾（本轮不改写，需协调者排期）。** 候选仍选择 `codebuddy-cli-custom_providers-v2`，其 `providers-responses` 小节（`codebuddy-cli-custom_providers-v2.md:147`）仍写 `CODEBUDDY_MAX_RETRIES`「默认 1，上限 15」、错误集「429/502/503/529/请求超时/锁超时」、退避「500ms 起步的指数退避加抖动」，与新源 `docs/env-vars.md:180` @ `3d2d64bb…`（默认 8、上限 15；429 / 除 570-579 外的 5xx / 请求超时 / 锁超时；1s 起步、每次 2 倍、单次封顶 32s）以及本轮 configuration v5 的「重试次数的默认值」段互相矛盾。`custom_providers` 不在本轮冻结主题内，故本章未改写；协调者应在 custom_providers 轮次重核 `providers-responses` 并新建 edition。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 实际内容变化 |
| --- | --- | --- |
| `source-codebuddy-docs` | `79abbc5f…` → `3d2d64bb…` | changed；20 个文件，其中与本章目标相关的七个见上文，其余为发行记录、API 与新增能力文档 |
| `source-codebuddy-site` | `6041efd9…` → `6041efd9…` | unchanged |
| `source-codebuddy-npm` | `2.167.0` → `2.172.1@sha512-W0EM…` | changed；只观察版本与 integrity，未取包字节 |

## 验证与差异入口

只运行了任务指定的候选校验：`pnpm -s maintenance:candidates check --candidate <candidate>`，返回 codebuddy 的文件清单，退出码 0。本轮未运行构建、lint、typecheck、测试或全库校验。

引用摘录均从固定提交的文件按行截取生成，最长 738 字符（`ref-codebuddy-cli-agent-flag`），未超过 800 字符上限。Git 来源不保留 checkout，记录形态为 `git_source_file`，来源审计应报 `not_retained`。

本轮只读使用 coordinator 提供的工作区 `ws-3d2d64bb9ad8-a0affe4c-a6c6-44ca-96f4-04ae2817ae38`（`source-codebuddy-docs` @ `3d2d64bb…`），按任务约束未自行关闭。
