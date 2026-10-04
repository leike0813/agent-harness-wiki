# OpenHands 上游巡检报告 · 2026-10-04

- 审计记录：`audit-openhands-20261004t061205z`（status `changed`，review_status `pending`）
- 本轮观察：25 个登记来源，其中 4 个非 unchanged
- 协调者语义 triage：限定调查（narrow_investigation）
- 交付方式：`delivery=pr`，本轮不切换本地发布指针、不更新受管二进制

## 来源身份变化

| 来源 | 类型 | 状态 | 基线 | 本轮观察 |
| --- | --- | --- | --- | --- |
| `source-openhands-docs-agents` | official_documentation | changed | `2642629487c759b2796b7b453908a1a76ed1ca35ada8…` | `5bb5fa776a7b351366dd547c0e58631892608b67404b…` |
| `source-openhands-docs-custom-llm` | official_documentation | changed | `4423acea1c77e712f308751b83a26e0a8ab5be663522…` | `115ab5e5ffe3f87ed6303557e3aa23a2265d100e3340…` |
| `source-openhands-docs-env-vars` | official_documentation | changed | `ea2844c1819c560a6ebaedf96c3401fa8348c43f40f2…` | `0c3b7f1ab5e88ce3cb74ac5d3d2bbfe03f4a6a15a47c…` |
| `source-openhands-sdk-repo` | git_repository | changed | `08af1d5aa3c7ec75813b01de94b26d8af9996752` | `b347047e2dcdd8f4b2be810aa8bc6632bc756d41` |

## 语义 triage 与理由

协调者给出的两处前提经核实需要更正：`conversation_router.py` 并非新增文件，基线 `08af1d5a` 已存在（864 行）；`api.py` 的 +20/-27 是
`_cleanup_stale_tmux_sessions` 的改写，与会话端点无关。据此把判断从「新增对外能力面」改为「既有 HTTP 路由的可观测性请求头扩展」。

### mcp —— 无需修改

复查的固定问题：`mcp.entry`、`mcp.definition`、`mcp.transport`、`mcp.auth`、`mcp.lifecycle`、`mcp.capabilities`、`mcp.exposure`、`mcp.diagnostics`

关联小节：`mcp-entry`、`mcp-definition`、`mcp-transport`、`mcp-auth`、`mcp-lifecycle`、`mcp-capabilities`、`mcp-exposure`、`mcp-diagnostics`

- `08af1d5a..b347047e` 的 37 个变化路径中没有任何 MCP 代码；对全量 diff 检索 `mcp`/`fastmcp`/`list_tools`/`stdio`/`oauth`/`RemoteMCPServer`/`StdioMCPServer` 的新增行命中为 0。
- `openhands-sdk/openhands/sdk/mcp/` 整个目录未被改动。
- 承载 `mcp.json` 解析、`--transport` 校验、`list_enabled_servers` 与 ACP 转发的 CLI 仓库 `OpenHands/OpenHands-CLI@954f2ba` 本轮 `unchanged`；两个 MCP 文档来源 `source-openhands-docs-cli-mcp`、`source-openhands-docs-mcp-settings` 本轮也 `unchanged`。
- 结论：八个固定问题的答案与状态不变，不新建章节版本，mcp 维持 v1。

### custom_agents —— 只修正一处引用边界

复查的固定问题：`agents.entry`、`agents.format`、`agents.roles`、`agents.invocation`、`agents.overrides`、`agents.limits`、`agents.diagnostics`

关联小节：`agents-entry`、`agents-format`、`agents-roles`、`agents-invocation`、`agents-overrides`、`agents-limits`、`agents-diagnostics`

- `openhands-sdk/openhands/sdk/agents/`、`skills/`、`plugins/` 均未被改动，Agent 定义加载、注册表与 `TaskToolSet` 委派机制无变化；新增的 `sdk/automation/__init__.py`（+215）只是 automation 可观测性标签与请求头辅助函数。
- `source-openhands-docs-agents` 页面由《Main Agent and Capabilities》改标为《Legacy CodeAct Agent》，新增归档横幅并把当前 Agent 架构指向 `/sdk/arch/agent`。本轮原件已归档为 `archive/openhands/artifact-openhands-docs-agents-20261004/raw.md`，`raw_sha256` 与扫描器 observed 一致；与上一版原件逐行比对，被引用的 `### Description` 正文字节未变，差异只有标题与横幅。
- 章节 v1 原本把该页当作现行主代理的描述来源。v2 在 `agents-scope` 与 `agents-roles` 标注其归档身份，并新增 `ref-openhands-docs-agent-legacy` 承载横幅原文。
- 结论：七个固定问题的答案与状态均不变（`agents.roles` 仍为 `answered`，主张继续由 CLI 与 SDK 源码引用支撑），仅引用边界被修正。

## 调查记录

- 本轮协调者语义 triage 结论：narrow_investigation。已交回隔离候选做定向维护，仅 mcp 与 custom_agents 两个主题的固定问题。
- openhands SDK 仓库由 08af1d5a 前进到 b347047e，提交为 uvicorn 依赖升级；文档侧 source-openhands-docs-agents、-custom-llm、-env-vars 三份哈希变化。
- openhands 七章当前均为 v1 且证据较薄，本轮只交回最小入口，不发起全主题重审。
- 跨主题观察（不在本轮交回范围，未改动）：custom-llm 与 env-vars 属同一次上游「归档标注」批次。custom-llm 页面正文未变但同样被标为 Legacy，custom_providers 章节引用的 `ref-openhands-docs-customllm-how`、`ref-openhands-docs-customllm-using` 正来自该页；env-vars 页面还把 `OH_CONVERSATION_*` 表格压缩为指向 Canvas Development 的指针，涉及 configuration 与 custom_providers 引用的 `ref-openhands-docs-env-core`/`-deprecated`/`-llm`/`-naming`。建议按同一边界处理这两个主题。
- 本轮未做版本映射：SDK 仓库 HEAD 只代表源码树，`openhands-sdk==1.28.1` 固定提交 `edaac806` 未变，章节继续按 source-level knowledge 记录，`version_applicability` 保持 `unknown`。
- 本轮新建 `openhands-cli-custom_agents-v2` 并把 `chapter-current` 的 custom_agents 指向 v2，v1 保留可查；未执行发布、未切发布指针、未触碰受管二进制。

## 候选与复核

本产品已交回隔离候选做定向维护；候选只允许编辑本产品的 `knowledge/`、`audits/` 与本产品来源登记，逐产品 `check` 通过后由协调者生成合并计划。高影响结论按维护契约另行独立复核。

本轮为低影响引用边界修正，`review_status` 保持 `pending`，由协调者在合并时决定复核归属；worker 未自行标记 `reviewed`。
