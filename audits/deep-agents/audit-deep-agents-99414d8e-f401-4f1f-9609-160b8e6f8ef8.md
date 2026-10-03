# deep-agents 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮上游有一处真正影响读者的变化，而且只落在 skills 一章：`dcode` 自带的 system prompt 把技能路径的构造规则改写了。此前它给的提示是"列出各来源目录，按绝对路径访问附带文件"；现在明确写成**来源目录仅供参考、不能拿来拼技能路径**，技能路径必须从清单行的 `-> Read` 原样复制，附带文件按该技能自身 `SKILL.md` 所在目录解析。旧版 skills-loading 小节对这段提示的描述已经不准确，因此发布了 `deep-agents-cli-skills-v2`；v1 按原样保留。

自定义代理、原生插件、MCP、自定义 provider 四章经复查没有 CLI 侧变化，版本维持不变。其中两处容易被误判为新机制的地方需要点名：`cache_expiring` 钩子在基线提交里就已存在，CHANGELOG 只是补记；deepagents SDK 新增的 `metadata.include_tools` 工具披露机制在 CLI 上不生效，因为 `dcode` 走的是自己的 `PluginSkillsMiddleware` 且不传 `tools=`。

`docs/config-file` 原文确实变了，但相对已登记摘录只有一处链接归一化，不改写任何已发布结论，详见下文证据边界。

## 变化的意义与证据边界

### 技能路径的构造规则被改写

`libs/code/deepagents_code/system_prompt.md` 的 `### Skills Directory` 小节在提交 `f57c6f383b7018024ca5cde2dc565048ea83202a` 变成 `### Skill Paths`（该文件第 163–167 行）。新表述同时点明 agent 专属技能目录，但立刻声明来源目录不是构造技能路径的基准，载入清单里的技能须把 `-> Read` 路径原样交给 `read_file`，既不把来源目录与技能名拼接，也不替换成另一个来源目录；附带文件则按该条 `SKILL.md` 所在目录解析并遵循其正文。

影响 `skills.loading`、`skills.format`、`skills.roots` 三个问题，落在 `skills-loading` 与 `skills-format` 两个小节。新证据是固定在新提交上的 `git_source_file` 引用，可以证明 CLI 提示词的字面内容，证明不了模型在真实会话中的行为——本次没有运行任何 harness。

值得留着的一个细节：同一份 prompt 里 SDK 技能中间件的使用说明仍写着"use absolute paths"访问辅助文件，两句不冲突（落在该技能目录下的绝对路径同时满足两者），但路径的**来源**以清单行为准。

### config-file 文档变化只波及一处链接

`source-deep-agents-docs-config-file` 从 `f9e628b9…` 变为 `07d56c13…`。上一轮声明的归档路径 `archive/deep-agents/artifact-deep-agents-docs-config-file/raw.md` 在本工作副本中不存在（`archive/` 不随仓库保留），所以逐字节 diff 做不了。改用与已登记的 8 条 config-file 摘录逐条比对：7 条逐字不变，只有 `ref-deep-agents-providers-arbitrary-doc` 不同，差异是 BaseChatModel 链接从 `reference.langchain.com/python/langchain_core/language_models/#…` 归一为 `reference.langchain.com/python/langchain-core/language_models`。该链接只出现在解释性文字里，custom_providers 一章依赖它的四条结论（可接受非 OpenAI 的 `BaseChatModel`、单独接收 `api_key`、可改写 `create_agent`、在 `create_deep_agent` 中使用任意工具集）都仍然成立，因此不改写该章，也不另建文档快照。

剩余缺口：`config-file` 中未被任何摘录覆盖的小节（如 Python extensions、Startup approval mode、Cold prompt-cache warning）本轮无法判定是否变化。Python extensions 的内容已由未变化的 `extensions.md` 与 native_plugins 章节覆盖，不构成已知缺口。

### 查过但没变化的入口

- `libs/code` 全量 diff 只有 6 个非测试文件：CHANGELOG、`_version.py`、`system_prompt.md`、`tui/session_cost.py`、`tui/subagent_panel.py`、`pyproject.toml`。TUI 两处分别是 `/clear` 提示文案与重放子代理时的计时显示，不改变任何已发布机制。
- `libs/code/deepagents_code/skills/load.py` 在新提交的内容哈希与既有快照记录一致（`47147f1e…`），技能发现与优先级机制未变。
- deepagents SDK 侧 `SkillsMiddleware` 新增 `tools` 参数、`SkillsState` 新增 `_skill_tools_disclosed`、`graph.py` 调整中间件次序与 fork 排除项；这些都不在 `cli` 界面上。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | deep-agents-cli-skills-v2 | skills.loading：answered；skills.format：answered；skills.roots：answered | 建议选为当前版本；v1 保留 |
| custom_providers | deep-agents-cli-custom_providers-v2 | 无问题受影响 | 保留（config-file 仅链接归一化，结论不变） |
| custom_agents | deep-agents-cli-custom_agents-v3 | 无问题受影响 | 保留（SDK 侧变化不在 cli 界面） |
| hooks | deep-agents-cli-hooks-v2 | 无问题受影响 | 保留（`cache_expiring` 基线已存在） |
| mcp | deep-agents-cli-mcp-v1 | 无问题受影响 | 保留（无相关源码变化） |
| native_plugins | deep-agents-cli-native_plugins-v1 | 无问题受影响 | 保留（`extensions.md` 未变化） |
| configuration | deep-agents-cli-configuration-v1 | 无问题受影响 | 保留（config-file 变化不涉及配置步骤） |

**发布：** delivery=pr，未运行 `ahw publish`、未切换任何发布指针、未改 `registry/chapter-current.yaml`；建议聚合阶段将 `deep-agents-cli-skills-v2` 选为 deep-agents × skills 的当前版本。**受管二进制：** 未触发（delivery=pr 不做受管二进制核对）。

## 待处理与独立复核

**审计记录：** [audit-deep-agents-99414d8e-f401-4f1f-9609-160b8e6f8ef8.yaml](audit-deep-agents-99414d8e-f401-4f1f-9609-160b8e6f8ef8.yaml)（`review_status: reviewed`）。**待处理旧审计：** 无（`pending_audit_refs` 为空）。**待复核问题：** 无。

三个触发条件都不成立：来源之间没有无法用版本／分发／条件解释的冲突；改写的是 harness 自带的提示词，不是读者会照做的配置步骤；`include_tools` 虽然是新的关键加载机制，但在本产品的 `cli` 界面上不生效，因此不构成跨主题变化。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-deep-agents-repo | c9b2ce194e422d2a61b9faf3732da15d90623c13 → f57c6f383b7018024ca5cde2dc565048ea83202a | changed；153 个路径变更，实际影响见上文 |
| source-deep-agents-docs-config-file | f9e628b9… → 07d56c13… | changed；仅一处链接归一化，见上文 |
| source-deep-agents-docs-cli-reference | 03ab0759… → 03ab0759… | unchanged |
| source-deep-agents-docs-configuration | 未变 | unchanged |
| source-deep-agents-docs-credentials | 未变 | unchanged |
| source-deep-agents-docs-extensions | 未变 | unchanged |
| source-deep-agents-docs-hooks | 未变 | unchanged |
| source-deep-agents-docs-mcp-tools | 未变 | unchanged |
| source-deep-agents-docs-memory-and-skills | 未变 | unchanged |
| source-deep-agents-docs-plugins | 未变 | unchanged |
| source-deep-agents-docs-providers | 未变 | unchanged |
| source-deep-agents-docs-quickstart | 未变 | unchanged |
| source-deep-agents-docs-subagents | 未变 | unchanged |

## 验证与差异入口

`pnpm knowledge:validate` 通过（Validated 500 chapter editions，无 error）；`pnpm sources:audit-log` 通过（Validated 21 upstream audit records）；`git diff --check` 无输出。COVERAGE_INCOMPLETE 警告来自 omp、opencode、pi 等其他产品的既有 coverage 记录，按约定未改动。

本轮改动：章节 [deep-agents-cli-skills-v2.md](../../knowledge/deep-agents/chapters/deep-agents-cli-skills-v2.md)、引用 [ref-deep-agents-skills-skill-paths.yaml](../../knowledge/deep-agents/references/ref-deep-agents-skills-skill-paths.yaml)、快照与原件 [snapshot-deep-agents-repo-20261003.yaml](../../knowledge/deep-agents/snapshots/snapshot-deep-agents-repo-20261003.yaml) 与 [artifact-deep-agents-repo-20261003.yaml](../../knowledge/deep-agents/artifacts/artifact-deep-agents-repo-20261003.yaml)。无版本映射变更——npm 版本变化本身不构成映射。

查看差异：`git status --short --untracked-files=all | grep deep-agents`；未跟踪文件用 `git diff --no-index /dev/null <file>` 逐个查看。
