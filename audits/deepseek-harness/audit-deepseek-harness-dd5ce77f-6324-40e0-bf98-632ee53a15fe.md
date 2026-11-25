# DeepSeek Harness 上游审阅报告 · 2026-11-25

## 给维护者的结论

本轮把 `local_transcripts` 完整重做为 v2 并选入候选：新增可选 SQLite 持久化后端、JSONL 的 `listConcurrency` 与 `location` 快照字段、`parentSource` fork 契约、`parentSession` 与 `cwd` 的新语义、导出 ZIP 的缺失附件清单与 Markdown 复制路径。JSONL 仍是出厂 profile 的默认后端，`$DSH_HOME/sessions` 与会话目录命名没有变化。

`custom_agents` 与 `configuration` 的结论**没有进入候选**：新证据直接推翻了已发布的配置步骤（`tool-subagent` 的 `persona`/`toolFilter` 被拒绝、Team 配置键被拒绝、`DSH_TOOLS_MODE` 不再被读取、`dsh-tools` 的 `mode`/`maxParallelSubCalls` 在加载时拒绝），触发独立复核条件。两章保留 v1，相关问题在审计中保持 `pending`。

## 变化的意义与证据边界

### 本地 Transcript：provider、位置与观察

Git 基线 `d7432673` 到观察 `4b399c39` 的比较包含 20 个被本章引用的文件。`docs/subsystems/persistence.md` 把 `SessionLocation` 改为观察性元数据，并新增 `dsh-session-persistence-sqlite` 后端条目；该包 README 固定数据库位于存储根下 `.segments/sessions.sqlite`，首次打开时导入 JSONL、保留源字节，`stat`/`list` 不导入历史。JSONL README 新增 `listConcurrency: 3`、`location` 快照字段、fork 复制子历史与读打开等待 writer 收尾的行为。这些仅改变“可选后端与观察字段”，不改变出厂位置与命名，因此 `transcripts.location`、`format`、`database`、`diagnostics` 更新为条件化表述。

### 分支与压缩

`parentSource: { sessionId, endSeq, events }` 取代“仅 `seed` 的 fork”，并由 `SessionPersistence.create()` 在返回写句柄前持久化父前缀；JSONL 后端把子历史复制进子文件。`parentSession` 头字段收窄为“子代理会话的直接创建者”，普通 fork 省略，判断子代理改看 `origin`。压缩语义新增“下一次模型尝试用普通 `system/message` 替换合并系统指令”，日志仍是同一条可重放记录。`transcripts.naming`、`schema`、`lifecycle` 因此更新。

### 导出

`session-log-export` 新增 `/api/session.markdown` 与 `Copy Session as Markdown`；ZIP 对 `ATTACHMENT_NOT_FOUND`/`INVALID_ATTACHMENT_REF` 不再整体失败，而是跳过该条目并在根写 `attachments-missing.txt`，其它附件错误仍失败。原文“不写清单”被推翻并改正，`transcripts.archive` 扩展了 Markdown 与 `Session file:` 路径。

### 待复核的两处推翻

`packages/subagent/tool-subagent/src/index.ts:150-152` 明确拒绝 `persona`/`toolFilter`，要求改用 Agent Preset + `agentPreset`（仅 spawn）；`docs/subsystems/subagent.md` 删除对应能力标志，新增 `agentPreset`、子代理 `name`、`rootOf/namesOf/resolveName/capacityOf/waitForTreeWork`，移除 `listChildren`/`list`/`drainChildren`。Team 已进入 base（`agent-team` maxTasks 256、`tool-agent-team`），0.2.1-rc.2/rc.3 升级指南移除了 `spawn_teammate`、`/team on|off`、`maxMembers`/`maxMessageBytes`/`disposalTimeoutMs` 与 Team 专用控制工具。`docs/upgrade-guide/v0.2.1-rc.2/tool-executor-plugins/guide.md` 记录 `dsh-tools` 在加载时拒绝 `mode`/`maxParallelSubCalls`，执行器改为显式 `tool-executor-native`/`tool-executor-ptc`，Web、headless 与 SDK 不再读取 `DSH_TOOLS_MODE`。两者都命中“推翻已发布配置步骤”，需独立复核后才能写入正文。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| local_transcripts | deepseek-harness-local_transcripts-v2 | scope/location/naming/format/schema/lifecycle/database/archive/diagnostics：answered；cleanup：partial | 已进入候选并选入 `chapter-current.yaml` |
| custom_agents | deepseek-harness-custom_agents-v1（保留） | roles/invocation/overrides/limits/diagnostics：pending | 保留旧版本；证据与拟定改动写入审计，等待独立复核 |
| configuration | deepseek-harness-configuration-v1（保留） | runtime/migration/defaults：pending | 保留旧版本；等待独立复核 |

**发布：** 未发布（worker 不构建 release、不切换指针）。候选已通过 `pnpm -s maintenance:candidates check`。 **受管二进制：** 未触发（worker 不运行 binary）。

## 待处理与独立复核

**审计记录：** `audits/deepseek-harness/audit-deepseek-harness-dd5ce77f-6324-40e0-bf98-632ee53a15fe.yaml`。**待处理旧审计：** `5ab74160`、`c748b1d3`、`a0af6040` 仍未结案；本审计的 `pending_audit_refs` 按任务契约留空，不表示已关闭。**待复核问题：** `agents.roles`、`agents.invocation`、`agents.overrides`、`agents.limits`、`agents.diagnostics`、`config.runtime`、`config.migration`、`config.defaults`；触发原因均为“推翻已发布配置步骤”，复核状态 pending。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-deepseek-harness-repo | d743267388641bc → 4b399c39a6d1479cd84ca591b4d7c88e24d38a96 | changed；按 20 个交叉引用文件逐文件 triage |
| source-deepseek-harness-docs | 665aa28b1c3a → 2705797fbbd9 | changed；2705797 已在 0a59457c 观察为 unchanged；保留页是客户端渲染的 VitePress 外壳，无可提取正文，且无引用，不影响章节 |
| source-deepseek-harness-npm | 0.2.0-rc.2 → 0.2.2-rc.5 | changed；仅身份，无映射或章节影响 |

## 验证与差异入口

本地 Transcript 的 21 条新引用均固定在 `snapshot-deepseek-harness-repo-20261125`；每条摘录已按该 commit 的 raw 文件复核，8 个 `git_source_file` 记录逐文件 `content_sha256`（`curl -fsSL https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/<commit>/<path> | sha256sum`）。候选校验：`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/deepseek-harness` 通过。未运行事项：未构建 release、未运行 `chapters:update`、未执行 `sources:scan`（固定来源模式）与 `managed:packages`。
