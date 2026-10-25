# claude-code 巡检报告 2026-10-22

- 审计：`audit-claude-code-2489084b-1bc7-4844-8ccc-6e140ed4c79f`
- 观察时间：2026-10-22T12:53:14.776Z（只读观察，未重扫上游）
- 范围：configuration、custom_agents、hooks、local_transcripts、mcp、skills；固定问题 12 道
- 结论：`status: changed`，`review_status: reviewed`，`pending_question_ids: []`

## 来源身份

| source | baseline | observed | 形态 |
| --- | --- | --- | --- |
| source-claude-code-configuration-doc | a8cc395af5e0… | 513768ecae76… | 官方文档（settings.md） |
| source-claude-code-skills-doc | 4d090296b0a4… | cdfcb0df9307… | 官方文档（skills.md） |
| source-claude-code-mcp-doc | 3c658de8dce8… | 9a42e98f8100… | 官方文档（mcp.md） |
| source-claude-code-npm | 2.1.299@sha512-7pI5… | 2.1.308@sha512-b2Hn… | 纯发布身份，无知识影响 |

## 语义 triage

比对方式：把上一轮归档原件（`archive/claude-code/artifact-source-claude-code-*-a8cc395af5e0|4d090296b0a4|3c658de8dce8`）与本轮冻结 URL 页面按段落归一化后逐段对照，再逐条核对受影响章节引用的摘录。

- 摘录不再命中不等于结论失效：已发布引用绑定自己的 snapshot。本轮只在页面表述与本轮机制冲突或新增条件时新建 edition。
- 15 条引用摘录的措辞漂移（含「just you」→「only you」等）不单独触发改写。

## 逐主题结论

| 主题 | 问题 | 结论 | 处理 |
| --- | --- | --- | --- |
| configuration | config.sources | 改变：云会话读取范围拆为 project 云线程 / 单仓库 / 多仓库；project 云线程不读仓库 settings.json 的权限、hooks、env；`~/.claude.json` 保存「账号信息」 | 新 edition `claude-code-configuration-v5` |
| configuration | config.defaults | 未变（仍 partial） | 沿用 |
| custom_agents | agents.overrides | 改变：`model` 在 auto mode 与 plan mode 分类器审阅期间不采用不支持模型；后台 fork 的 checkpoint 边界细化 | 新 edition `claude-code-custom_agents-v4` |
| custom_agents | agents.limits | 改变（边界细化）；并发/嵌套上限仍无来源，保持 partial | 同上 |
| hooks | hooks.entry | 未变：settings 文件、Skill frontmatter `hooks`、插件 hooks 三条事实与全限定名规则语义一致 | 不改章节，记 answered/partial |
| local_transcripts | transcripts.lifecycle | 改变：自动转后台删去 v2.1.212 标注，新增 `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS`（0 关闭）；checkpoints 表述细化 | 新 edition `claude-code-local_transcripts-v2` |
| local_transcripts | transcripts.database | 改变：`~/.claude.json` 内容措辞；仍无数据库/索引证据 | 同上 |
| mcp | mcp.capabilities | 改变：无 tool search 的配置不再包含自定义 `ANTHROPIC_BASE_URL`；v2.1.305 起 400/422 后可无 tool search 重试；托管 server 描述不截断 | 新 edition `claude-code-mcp-v6` |
| mcp | mcp.exposure | 改变：网关后 tool search 默认开启（v2.1.304 起）；deny `ToolSearch` 后前置加载但请求仍可能带占位 `defer_loading`；`-p`/SDK/非 project 云线程免批准加载 project server | 同上 |
| skills | skills.roots | 改变：项目与嵌套 Skill 在 project 云线程内不可用 | 新 edition `claude-code-skills-v6` |
| skills | skills.invocation | 改变：叠放只在终端成立，SDK 与 `claude -p` 只加载第一个；`user-invocable: false` 同时隐藏菜单项 | 同上 |
| skills | skills.conditions | 改变：`paths` 相对当前工作目录，目录外文件不匹配 | 同上 |

## 排除项

- mcp.entry / mcp.definition / mcp.auth / mcp.lifecycle / mcp.diagnostics、skills.discovery/format/extensions/loading/diagnostics、configuration 其余问题、custom_agents 其余问题、local_transcripts 其余问题：本轮未派发，正文与引用原样沿用旧 edition 内容。
- npm 2.1.299→2.1.308：只记身份，不造映射，新版本仍未验证。

## 证据与工件

新增 snapshot / artifact（archive_path 按 scan 既有命名，原件待 coordinator 归档）：

- `snapshot-claude-code-configuration-doc-20261022` ← `artifact-source-claude-code-configuration-doc-513768ecae76`
- `snapshot-claude-code-skills-doc-20261022` ← `artifact-source-claude-code-skills-doc-cdfcb0df9307`
- `snapshot-claude-code-mcp-doc-20261022` ← `artifact-source-claude-code-mcp-doc-9a42e98f8100`

新增引用（摘录均逐条与冻结页面文本核对命中）：`ref-cc-config-find-20261022`、`ref-cc-config-cloudthreads-20261022`、`ref-cc-skills-locations-20261022`、`ref-cc-skills-cowork-20261022`、`ref-cc-skills-stack-20261022`、`ref-cc-skills-userinvocable-20261022`、`ref-cc-skills-paths-20261022`、`ref-cc-skills-modelrow-20261022`、`ref-cc-skills-checkpoints-20261022`、`ref-cc-lt-checkpoints-20261022`、`ref-cc-lt-backgroundtask-20261022`、`ref-cc-lt-claudejson-20261022`、`ref-cc-mcp-autobackground-20261022`、`ref-cc-mcp-toolavailability-20261022`、`ref-cc-mcp-toolsearchgateway-20261022`、`ref-cc-mcp-toolsearchretry-20261022`、`ref-cc-mcp-denytoolsearch-20261022`、`ref-cc-mcp-desclimit-20261022`、`ref-cc-mcp-approvals-20261022`。

## 待办与风险

- 三份新原件尚未进入项目根 `archive/`；`sources:audit-log` 在这些路径缺件时会报原件缺失。coordinator 需按记录路径归档后再验。
- 新 edition 的 `version_applicability` 仍为 unknown：页面未标注适用版本，正文的 2.1.x 门槛是页面级说明。
