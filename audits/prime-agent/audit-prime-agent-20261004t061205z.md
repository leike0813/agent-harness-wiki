# prime-agent 上游巡检报告 · 2026-10-04

- 审计记录：`audit-prime-agent-20261004t061205z`（status `changed`，review_status `pending`）
- 本轮观察：1 个登记来源，其中 1 个非 unchanged
- 协调者语义 triage：定向维护（maintain）
- 交付方式：`delivery=pr`，本轮不切换本地发布指针、不更新受管二进制

## 来源身份变化

| 来源 | 类型 | 状态 | 基线 | 本轮观察 |
| --- | --- | --- | --- | --- |
| `source-prime-agent-repo` | git_repository | changed | `e78f11f5409f47ec560fff390b6158470523cb0f` | `c24ac227f11f552ed1d3fa8ebc7d916937d7f6bc` |

## 语义 triage 与理由

### configuration

受影响固定问题：`config.sources`、`config.defaults`

关联小节：`config-sources`、`config-trust-defaults-migration`

crates/pa-core/src/settings/types.rs 在提交 c24ac227 新增顶层 FactorySettings（serde camelCase，字段 enabled，可选），并挂到 Settings；settings/load.rs 的 KNOWN_FIELDS 同步加入 "factory"。这是配置文件中新增的一个顶层段。

### mcp

受影响固定问题：`mcp.lifecycle`

关联小节：`mcp-lifecycle`

.changes/acp-mcp-replace-cleanup.md 记录：ACP session/new 在 MCP server 准入失败或超时时，会清空该连接已准入的 MCP server，使丢失确认前 worker 已应用的 server 不再保持准入状态，与 TypeScript 实现对齐。这改变 MCP server 的准入生命周期。

## 维护结果

| topic | 新 edition | 固定问题与状态 | 已选入当前版本 |
| --- | --- | --- | --- |
| configuration | `prime-agent-cli-configuration-v2` | `config.sources`：answered；`config.defaults`：answered；`config.overrides`：answered（只补证据与正文，未改状态） | 是 |
| mcp | `prime-agent-cli-mcp-v3` | `mcp.lifecycle`：answered | 是 |

旧 edition `prime-agent-cli-configuration-v1` 与 `prime-agent-cli-mcp-v2` 保留未动。

### 核实后的修正

**`factory.enabled` 不是新键，是新的类型化暴露。** 基线 `e78f11f5` 上内核的 `rlm.factory` 与 `crates/pa-core/src/refinement/mod.rs` 已经在直接解析 agent 目录 `settings.json` 的原始 JSON 读这个键，绕过类型化设置层。`c24ac227` 新增的是 `Settings` 上的可选 `factory` 字段、`FactorySettings`（camelCase，只有一个可选布尔 `enabled`）、`KNOWN_FIELDS` 接受 `"factory"`、`SettingsManager` 的 `get/set_factory_enabled`，以及 pa-tui/pa-cli 的 `ClientSettings` 读写缝。协调者初判里“这是配置文件中新增的一个顶层段”按键的存在性来说不准确，章节按核实结果写。

**开关的界面归属（独立复核修正）。** 斜杠命令 `/factory [on|off|status]` 只实现在 `pa-tui`（`crates/pa-tui/src/session_ui/commands.rs:416-437`）；`pa-cli` 侧注册的 `factory` 是另一套命令 `factory <list|import|export>`，管机器库，没有 on/off/status（`crates/pa-cli/src/command_registry.rs:244-250`）。而 `catalog/harnesses.yaml` 为本产品只声明了 `surface_id: cli`，没有声明承载该斜杠命令的客户端界面。按界面归属规则，该命令的界面绑定记为 `unknown`，章节明确写出**它不是 `cli` 界面的结论、不能外推为 CLI 行为**；键本身的语义（键名、只读全局、失败关闭）与界面无关，仍作为产品级事实保留。

**生效时机的缺口声明已收窄（独立复核修正）。** 客户端界面的 `/factory on` 成功提示原文要求重启客户端才会显示 factory 分组（`crates/pa-tui/src/session_ui/commands.rs:437`），所以旧版“关闭时是否需要重启没有说明”不成立。缺口改为只保留两条：`/reload` 是否足够、关闭时是否也要重启。

**该键是只读全局键。** `get_factory_enabled` 读 `self.global_settings()`，setter 只写全局作用域，项目 `.prime/agent/settings.json` 里的 `factory.enabled` 打不开闸门。这一条同时补进了 `config-overrides` 的全局键例外表：`config.overrides` 不在本轮交回的两个固定问题内，但同一章节若只记录 `config-sources` 的键作用域而不更新例外表会自相矛盾，因此只补了该小节的正文一行与 `source_refs`，未改其问题状态与引用集以外的内容。

**默认值是失败关闭。** 内核侧文件缺失、键缺失、值类型不对、文档损坏都按未设置处理，只有值恰为布尔 `true` 才算打开。这与本章其它“非法值按字段回退到内置默认”的键不同——那些键回退后功能是开着的。

**MCP 的 changeset 措辞需要收窄。** 基线的进程内 `admit_session_servers` 在替换失败时**已经**做 owner 清理，所以 `c24ac227` 不是给失败路径新增清理，而是把准入从进程内管理器搬到 worker 的 `replace_acp_mcp_servers` 线协议命令（会话级响应超时 30 秒）；失败与超时因此汇入同一条 `Err` 分支，清理覆盖到超时这一新增情形。worker 侧另有三道约束：真正的 agent 引擎持有会话 MCP 存储（脚本化引擎退回 worker 级存储）、agent 运行中拒绝替换、同 owner 同列表为成功空操作；被拒的替换先按同一 owner 清空回滚再上报失败。`session/close` 与连接拆除走同一条“替换为空”路径。

**TypeScript 对齐无法在本轮核实。** changeset 说“与 TypeScript 行为一致”，但 `packages/` 下的 TypeScript 树在基线与本轮仓库顶层都不存在，TypeScript 移植早已不在树内。章节只记 Rust 侧语义，不复述对齐结论。

### 协调者未核实改动的归属

- `settings/manager.rs`：新增内容是 `factory.enabled` 只读全局的测试（`factory_enabled_reads_the_global_scope_only`），属 `config.sources` 范围。
- `settings/interactive_settings.rs`：`get_factory_enabled` / `set_factory_enabled` 及全局作用域说明，属 `config.sources` 与 `config.defaults` 范围。
- `pa-tui/src/client_settings.rs`：`ClientSettings` trait 上的 `factory_enabled` / `set_factory_enabled`，只是同一对读写的客户端缝，未引入独立配置面。
- `pa-cli/src/client_settings.rs`：`setting!` 宏接线加测试，断言写入落到 agent 目录 `settings.json` 的 `factory.enabled` 且不改动其它键，属 `config.sources` 范围。

## 调查记录

- 本轮协调者语义 triage 结论：maintain。已交回隔离候选做定向维护。
- 本轮 prime-agent 由 e78f11f5 前进到 c24ac227（提交标题为客户端关闭时保持 daemon 运行），162 个变化路径中与已发布主题直接相关的是 settings/{types,load,manager,interactive_settings}.rs 与 pa-cli/pa-tui 的 client_settings.rs。
- factory 段同时被 daemon 的 factory_activity 通道广播与 kernel 的 factory gate 读取，属新增配置面；其对外能力影响由维护按固定问题判断，本轮不预设。
- 本轮已按交回范围完成维护：新建两个 edition，保留旧 edition 不原地改，`registry/chapter-current.yaml` 只切换本产品 configuration 与 mcp 两个 topic。
- 来源身份提示：已发布章节的既有引用仍指向 `packages/coding-agent` 下的 TypeScript 路径，固定在 `snapshot-prime-agent-repo`（`e2fb7bfa`）。本轮新增引用一律按 `git_source_file` 固定在 `c24ac227`，记录精确 `file` 与实际计算的 `content_sha256`，未保留 checkout，未记录临时工作区路径。
- 源码 HEAD 只代表源码树，不构成任何已发布二进制的行为证明；两个 edition 仍按来源级知识记录，未建立版本映射。

## 复核后补齐的引用覆盖

| 断言 | 原引用范围 | 补齐后 |
| --- | --- | --- |
| worker 侧两道约束 | `worker/commands.rs:290-303`（未覆盖） | 新增 `ref-prime-agent-acp-wire-constraints-rust` = `272-289` |
| setter 只写全局作用域 | `interactive_settings.rs:357-371`（只有 getter） | 新增 `ref-prime-agent-factory-scope-setter-rust` = `374-387` |
| refinement host 读原始 JSON | 无引用 | 新增 `ref-prime-agent-factory-refinement-host-rust` = `refinement/mod.rs:164-175` |
| 30 秒超时的证据链 | `daemon.rs:45-46`（只有常量） | 新增 `ref-prime-agent-acp-wire-request-call-rust` = `966-985` 与 `ref-prime-agent-acp-request-wiring-rust` = `169-172`，与常量引用合成完整链条 |

因单条摘录上限 800 字符，`commands.rs:272-303`（1571 字节）与 `interactive_settings.rs:357-387` 无法并入一条引用，改为按「约束 / 回滚」与「getter / setter」拆成两条，覆盖范围与拆分前一致。15 条 Rust/Python 引用逐条与 `c24ac227` 原文比对，全部逐字且 ≤800 字符。

另把 `ref-prime-agent-factory-gate-rust` 改名为 `ref-prime-agent-factory-gate-py`（其指向 `prime-agent-runtime/src/rlm/factory.py`，`-rust` 后缀有误导），对应的 artifact 与 snapshot 一并改名，章节与本审计的引用 id 已同步。

## 协调者与 reviewer 的裁定

- agent factory 不构成回退或挂起理由：两章内容（`factory.enabled` 设置键语义 + ACP 准入生命周期）成立，可按本轮范围交付；factory 的跨主题 triage 另开维护任务。
- TypeScript 树消失属既有已发布内容的历史问题，不在本轮范围：已发布引用固定在 `e2fb7bfa`，树消失发生在更晚的提交，不构成对已发布引用的证据失效。作为独立后续项上报维护者。

## 未自行扩范围并上报协调者

agent factory 在本轮是整体新增的能力面。除配置闸门外，同一提交还新增了 `skills/factory/SKILL.md`、`pa-tui` 的 `/factory` 视图与图形面板、`prime-agent-runtime` 的 `rlm.factory` 命名空间、`pa-daemon` 的 `factory_activity` 通道，以及 `crates/pa-core/src/session_engine/factory_host.rs`。它是否构成新的 agent 形态、是否应进入 `custom_agents`（`agents.*`）或 `skills` 主题，本轮不作判断，因此 `pending_question_ids` 清空而没有写入未经 triage 的跨主题问题 id。

## 候选与复核

本产品已在隔离候选内完成定向维护；候选只编辑了本产品的 `knowledge/`、`audits/` 与本产品来源登记，逐产品 `check` 通过后由协调者生成合并计划。

`review_status` 保持 `pending`：`configuration` 改动虽只覆盖两个固定问题，但同一提交引入了上述跨主题的新能力面，是否属高影响由协调者决定是否触发第二 Agent 独立复核。

