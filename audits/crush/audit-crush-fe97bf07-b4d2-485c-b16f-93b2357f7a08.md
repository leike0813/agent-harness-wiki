# crush 维护报告 audit-crush-fe97bf07-b4d2-485c-b16f-93b2357f7a08

## 来源观察

| source_id | 类型 | baseline | observed | 状态 |
| :-- | :-- | :-- | :-- | :-- |
| source-crush-repo | git_repository | `a48dabea1a3562b24c39cc7f0dec10e867f8499b` | `cd5f15d366f516c992ec8331f0bc158708bb69ec` | changed |
| source-crush-npm | npm_registry | `0.98.1@sha512-TWjk5My…` | 同左 | unchanged |

固定工作区 `ws-cd5f15d366f5-662cca20-11e6-4e3a-b631-02bc244b45f2`，检出在项目外的临时目录，本轮只读。103 个变更文件、+3720/−572；提交标题 `feat(openrouter): send app attribution headers and session_id for sticky routing (#4115)`。

## 语义 triage

三处变化对已发布章节有实质语义：

1. **自定义 provider 的模型发现**（新增 `internal/config/discovery.go`，`internal/config/load.go` 删除内联探测段，`store.go` 增加 `cachedDiscovery`）。触发条件收敛为 `discoveryJobs`：未在 known 目录、未 `disable`、有 `base_url`，且 `models` 为空或 `discover_models` 为真。结果按“`base_url` + 模型列表”缓存到全局数据文件同目录的 `discovered_models/`（文件名是 URL 转义的 provider id），命中缓存不联网，只有未命中的才内联探测（共享 3 秒预算）。新增 `RefreshDiscoveredModels` 后台重探缓存来源的 provider，列表变化即 `ReloadFromDisk`。`mergeModels` 让配置里的模型优先、发现结果只补缺失 ID。**影响** `providers.models` 与 `providers.diagnostics`（新增缓存位置与刷新重载）。
2. **新增 `options.max_background_jobs`**（`internal/config/config.go`、`internal/shellconfig/options.go`、`schema.json`、`docs/config/README.md`、内置 `crush-config` 技能）。默认 50，`0` 或负数由 `GetMaxBackgroundJobs()` 归一化回 50；后台 shell 启动时先 `prune` 已结束任务，达到上限直接报错。**影响** `config.defaults` 的默认值/开关清单。
3. **工具调用补记（settlement）**（新增 `internal/agent/settle.go`、`internal/agent/empty_media.go`；`agent.go`、`backend/session.go`、`message/content.go` 接入）。回合结束时对无回复的 tool_call 补 `finished` 与一条 `is_error` 的 tool_result；读取会话时 `ListSettledMessages` 补记被强杀遗留的孤儿调用，并为未完成的 assistant 消息补 `finish(error)`（时间回填 `updated_at`）。`tool_call.input` 保留部分 JSON、发送前由 `toolCallInput` 归一化；空媒体结果落库为说明文字。**影响** `transcripts.schema` 的字段语义与记录关系。

排除项及理由：

- `hooks`：仅 `internal/config/reload_hooks_test.go` 的签名调整，`internal/hooks/**`、`docs/hooks/**`、`internal/shellconfig/hook.go` 未改，`hooks.entry`/`hooks.conditions` 不变。
- `skills`：`internal/skills/builtin/crush-config/SKILL.md` 只加一行 `option max-background-jobs` 文档条目，`internal/skills/**` 的发现/加载代码未改，`skills.roots`/`skills.conditions` 不变。
- `native_plugins`：没有任何插件相关文件改动，仍为 `not_applicable`。
- `custom_agents`：`Agent` 结构与 `SetupAgents` 未改，`schema.json` 顶层仍无 agents 键；`agents.format`/`agents.overrides` 不变。
- `mcp.capabilities`：本轮 `internal/agent/tools/mcp/tools.go:63-115` 把原先内联在 `RunTool` 里的媒体折叠抽成 `toolResultFromCall`/`mediaPayload`，并加入空/空白媒体载荷处理（配套新增 `internal/agent/tools/mcp/empty_media_test.go`）；“最多一份图片、一份音频”的折叠规则本身在本轮之前已存在，且与 `UnsupportedMediaResponse` 无关——后者定义在 `internal/agent/tools/tools.go:73-76`，由 `internal/agent/tools/mcp-tools.go:143` 与 `internal/agent/tools/view.go:210` 调用，`mcp/tools.go` 内没有该标识符。`ListTools`、`filterTools`、resources、prompts 路径未改，答案不变。
- 配置加载入口改为显式传 `context`（`Load`/`Init`/`LoadProviders`）属调用层签名变化；来源、合并、运行时覆盖与信任规则未改，`config.sources`/`config.overrides`/`config.runtime`/`config.trust` 不变。
- `internal/cmd/{root,session,stats}.go` 是 context 传递、信号处理与分页 writer 的重构，`transcripts.scope`/`transcripts.location`/`transcripts.format` 不变。

已发布引用的行定位在本轮提交上会漂移（triage 记录 35 条不再命中）。处理方式是新 edition 只把新增结论绑定到 `cd5f15d` 的 `git_source_file` 快照（commit、仓库相对路径、`content_sha256`，不保留 checkout），旧 edition 与旧引用保持原字节。

## 候选产物

- 新章节版本：`crush-cli-configuration-v3`、`crush-cli-custom_providers-v3`、`crush-local_transcripts-v2`；旧版全部保留、字节未改。
- 新增 12 对 artifact/snapshot（`artifact-crush-repo-20261022-*` / `snapshot-crush-repo-20261022-*`），覆盖 `internal/config/config.go`、`internal/shellconfig/options.go`、`schema.json`、`docs/config/README.md`、`internal/config/discovery.go`、`internal/config/load.go`、`internal/shell/background.go`、`internal/agent/agent.go`、`internal/agent/settle.go`、`internal/agent/empty_media.go`、`internal/message/content.go`、`internal/backend/session.go`。
- 新增 18 条引用：`ref-crush-code-config-max-background-jobs`、`ref-crush-code-option-max-background-jobs`、`ref-crush-schema-max-background-jobs`、`ref-crush-configdoc-option-max-background-jobs`、`ref-crush-code-background-jobs-limit`、`ref-crush-code-discovery-{jobs,cache,merge,refresh}`、`ref-crush-code-load-discovery-merge`、`ref-crush-transcripts-{agent-settle-turn,settle-constants,settle-tool-calls,settle-repair,backend-settle-read,add-finish-at,tool-call-input,empty-media}`。
- `registry/chapter-current.yaml` 在候选内指向上述三版。

## 问题状态

本轮固定的 24 道问题全部落定，`pending_question_ids` 为空：`config.defaults`、`providers.models`、`providers.diagnostics`、`transcripts.schema` 有新 edition；其余 20 道（`config.sources`、`config.overrides`、`config.runtime`、`config.trust`、`agents.format`、`agents.overrides`、`providers.entry`、`providers.auth`、`providers.protocol`、`providers.metadata`、`hooks.entry`、`hooks.conditions`、`mcp.capabilities`、`plugins.discovery`、`plugins.diagnostics`、`skills.roots`、`skills.conditions`、`transcripts.scope`、`transcripts.location`、`transcripts.format`）按固定 commit 复核后维持原答案，未改章节。

## 复核与 blocker

`review_status` 保持 `pending`，不写 `reviewed_by`/`reviewed_at`：`pending_audit_refs` 仍指向 `review_status=pending` 的 `audit-crush-c605cca6` 与 `audit-crush-2004ef1a`。它们剩余的 `config.migration`、`agents.entry/roles/invocation/limits/diagnostics`、`hooks.events/input/output/order/diagnostics`、`mcp.entry/definition/transport/auth/lifecycle/exposure/diagnostics`、`plugins.model/package/install/api/lifecycle`、`skills.discovery/collision/format/extensions/loading/invocation/diagnostics`、`transcripts.naming/lifecycle/database/archive/cleanup/diagnostics`、`providers.forwarding/responses` 不在本轮固定问题集合内，本审计不能代为关闭。

本轮未发现来源冲突，也未推翻已发布配置步骤；配置加载顺序与合并机制未变，因此不触发 Skill 第 5 节的高影响独立复核。worker 未发布、未切换本地指针。

独立复核 `rev2-crush`（只读）结论为 changes_requested，实质论断仍全部维持：`corrected` 的四道问题是 `config.defaults`、`providers.models`、`providers.diagnostics`（引用行定位）与 `mcp.capabilities`（上方排除项归因），其余 20 道 `upheld`。已按意见修正 `ref-crush-code-option-max-background-jobs`（214-216）、`ref-crush-code-discovery-merge`（183-197）与上述 mcp 归因；另经源码复核修正同批 `ref-crush-transcripts-backend-settle-read`（77-85）；`ref-crush-transcripts-settle-constants` 的 14-24 定位与摘录首末行一致，其摘录因 800 字符上限保留省略写法，未改。复核提出把 `ref-crush-code-load-discovery-merge` 的 start 改为 439，与源码不符（该语句在 440 行，440-452 已与摘录逐字一致），该引用未改。章节文本与 `registry/chapter-current.yaml` 的 edition 选择均未变动。

`pnpm -s maintenance:candidates check --candidate <candidate-root>` 通过。
