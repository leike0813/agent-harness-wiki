# claude-code 巡检维护报告（2026-10-13 观察）

- 任务：`monitor-20261013-claude-code`，role=worker，delivery=pr
- 协调者审计：`audit-claude-code-2bb3ee3e-9e7f-4c58-86a3-f0c937b6315f`
- 范围：topic `mcp`，固定问题 `mcp.diagnostics`、`mcp.exposure`、`mcp.capabilities`
- 结论：证据新鲜度修复（摘录与章节对齐），不是机制变化；无 pending 问题

## 变化的来源身份

| source_id | kind | baseline | observed |
| --- | --- | --- | --- |
| source-claude-code-mcp-doc | official_documentation | `3b8b9783…b5c6f` | `d6217242…521d5` |
| source-claude-code-npm | npm_registry | 2.1.296 | unchanged |
| source-claude-code-skills-doc | official_documentation | `35fd2c11…4602a` | unchanged |
| source-claude-code-configuration-doc | official_documentation | `a8cc395a…5e380` | unchanged |

新一版原件由巡检保留在原项目 `archive/claude-code/artifact-source-claude-code-mcp-doc-d62172422b54/source.md`，旧一版仍在 `…-3b8b9783292c/source.md`。候选中只新增身份记录（`artifact-source-claude-code-mcp-doc-d62172422b54`、`snapshot-claude-code-mcp-doc-20261013`），不复制原件字节。

## 语义 triage

逐行比对两份保留原件，全页只有一处文本差异，位于 `### Managing your servers` 下的 `#### Tool availability` 小节第二条要点：

- 改前：`… and a model earlier than the Claude 4.5 generation on Google Cloud's Agent Platform.`
- 改后：`… and a model earlier than Claude Opus 4.5, Claude Sonnet 4.5, and Claude Haiku 4.5 on Google Cloud's Agent Platform.`

除此之外，标题层级、表格、示例代码、版本门槛（如 v2.1.285 / v2.1.287 / v2.1.259）与全部其他正文均逐字相同；`Tool search requires a model that supports tool_reference blocks: …` 一句未变。

判断：该句只是把「早于 Claude 4.5 世代」细化为逐个列出 Opus 4.5、Sonnet 4.5、Haiku 4.5。tool search 的机制结论（等待放在 `ToolSearch` 调用内、`ENABLE_TOOL_SEARCH` 取值语义、`tool_reference` 模型要求、`alwaysLoad` 与 tool search 的优先级）没有变化，因此不改写这些结论，也不新增版本映射——该页无版本标注，`version_applicability` 保持 `unknown`。

## 证据修复

- 新增 `ref-cc-mcp-toolavailability-20261013`：绑定 `snapshot-claude-code-mcp-doc-20261013`，定位为文档小节 `Tool availability`，摘录取当前原文前两条要点（含改写后的条件句）。
- 保留 `ref-cc-mcp-toolavailability-20261003`：它仍绑定旧快照并正确描述旧快照，但不再被新 edition 使用。
- 其余既有引用、章节小节与已发布结论一律未动。

## 章节

mcp 章节正文确实复述了该条件句（「以及 Google Cloud Agent Platform 上早于 Claude 4.5 代的模型」），照旧表述会与固定来源不符，因此按规则新建完整 edition `claude-code-mcp-v5`（v1–v4 全部保留），只做三处最小改动：

1. 正文条件句改写为「Google Cloud 的 Agent Platform 上早于 Claude Opus 4.5、Claude Sonnet 4.5 和 Claude Haiku 4.5 的模型」。
2. `mcp-capabilities` 小节与 `mcp.capabilities` 答案的 `source_refs` 由 `ref-cc-mcp-toolavailability-20261003` 换为 `ref-cc-mcp-toolavailability-20261013`（`mcp.exposure`、`mcp.diagnostics` 的 `source_refs` 未变）。
3. 首段快照日期同步为 2026-10-13。

`registry/chapter-current.yaml` 的 claude-code × mcp 选章改为 `claude-code-mcp-v5`；其余七个主题选章保持原样。

## 排除的问题与主题

协调者按「整份来源变化」列出的 custom_agents、custom_providers、hooks、local_transcripts、native_plugins 影响只是扫描器粗粒度提示。本次逐行比对证明 mcp.md 除该一句外无任何其他变化，这些主题引用的段落文字与版本门槛均未失效，因此不在本轮维护范围，也不重开已完成问题。

## 候选校验与复核

- `pnpm maintenance:candidates check --candidate <candidate_root>` 通过。
- 复核：作者自检完成（普通更新，无高影响机制结论），`review_status: reviewed`，`pending_question_ids: []`。
- 未发布、未切换本地发布指针、未运行 `managed:packages`，未使用 source workspace（`workspaceIDs: []`）。