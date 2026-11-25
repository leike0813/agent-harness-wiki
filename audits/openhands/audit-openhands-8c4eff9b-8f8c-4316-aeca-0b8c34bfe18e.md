# openhands 上游审阅报告 · 2026-11-24

## 给维护者的结论

本轮观察 `2026-11-24T14:03:14Z`（audit `8c4eff9b`）相对最近一次处理的基线记录了 21 个官方文档来源变化、3 个 Git 仓库变化与 npm `1.44.0 → 1.45.0`。文档变化大多是 Mintlify 序列化差异（提示块、绝对链接、卡片/选项卡、代码块反斜杠转义），但有四处是真正的机制变化：hooks 的插件自带 hook 与 `PLUGIN_ROOT`、task tool 的 `tool_concurrency_limit` 并行、plugins 页移除 CLI 安装入口、环境变量页被归档且 CLI 首次运行设置文件名改为 `agent_settings.json`。对应发布 4 个新章节 edition：hooks v2、custom_agents v3、native_plugins v2、configuration v2。其余主题（custom_providers、local_transcripts、mcp、skills）逐题核对后无答案变化，保留原 edition。

## 变化的意义与证据边界

### hooks：插件 hook、`PLUGIN_ROOT` 与工作目录范围

上游 hooks 页新增 “Hooks Bundled in Plugins”：插件可在 `hooks/hooks.json`、Agent Plugins 包在 `dev.openhands/hooks/hooks.json` 提供 hook，执行时设置 `PLUGIN_ROOT`，并按该会话加载的插件修订绑定各自的根。页面还把 `hooks.json` 限定在会话工作目录（不搜索父目录），并把适用界面改为 Agent Canvas / OpenHands Cloud / OpenHands Enterprise，删除了 CLI 选项卡与 `/skills` 入口。`hooks.events`、`hooks.output`、`hooks.order` 的机制结论不变；`PLUGIN_ROOT` 未在固定的 SDK 1.28.1 快照中出现，正文明确标为当前官方文档所述、未在固定源码验证。

### custom_agents：任务调用的并发边界

task-tool-set 页现在写明：单次任务调用仍然阻塞，但独立任务调用可通过父代理的 `tool_concurrency_limit` 并行；示例显式使用 `TaskToolSet` 并称 `DelegateTool` 已退役。原章节同时写了“任务工具一次只跑一个”和“工具并发由 `tool_concurrency_limit` 控制”，两句互相矛盾；v3 统一为“单次调用阻塞、并发由工具级上限控制”，并保留嵌套深度缺口。

### native_plugins：上游文档删除了 CLI 插件入口

plugins 页删除了 `~/.openhands/config.toml` 的 `[plugins] sources` 与 `openhands --plugin`，改为 Agent Canvas / SDK / OpenHands Cloud 三种用法；本地目录为 `~/.agents/plugins` 或 `~/.openhands/plugins`（Agent Canvas 作为只读 `Local` 插件发现）或交给 SDK 的 `PluginSource`。这与固定 CLI 源码“没有插件命令”的结论一致，v2 更正了旧版“文档给出 CLI 入口”的差异说明。插件格式、组件、生命周期结论不变。

### configuration：环境变量页归档与首次运行文件名

环境变量页被上游归档，明确“不是现行 Canvas/SDK 的完整或已验证参考”；configuration 章节原先把该页称为“完整清单”，v2 改为“归档的历史对照”，并在迁移小节提示先确认变量是否仍适用。安装页 First Run 现在写明 LLM 设置保存到 `~/.openhands/agent_settings.json`，同时列出 `cli_config.json` 与 `mcp.json`，与固定源码一致；章节删除了旧的 `settings.json` 命名差异说明。

### 排除项与证据边界

- CLI 维护状态：command-reference、mcp-servers、installation 三页新增 “The OpenHands CLI is no longer actively maintained” 横幅。各章节 scope 早已依据 CLI 仓库 README 记录该状态，故不据此单开 edition。
- mcp：mcp-settings 删除了 CLI 专属说明，但 OAuth 机制段落与 “Add a Custom Server” 仍在，cli/mcp-servers 页仍完整记录 `--auth oauth` 与 `~/.openhands/mcp.json`，CLI 答案不变。
- skills：overview 三页只有提示块与链接格式变化；sdk-skills 新增的 GitHub 子目录安装 API 不属于 9 道固定问题，答案不变。
- custom_providers / local_transcripts：相关文档页面变化为归档标注或格式；章节原本已按“版本未知/旧版对照”处理，核心结论由固定 SDK/CLI 快照支撑，答案不变。
- Git：coordinator 提供的 changed-path 清单（repo 25 commits/229 files、sdk-repo 5 commits/44 files、cli-repo `0403f1a → 283c6ac`）不含章节引用文件，无 git-based 章节影响；本轮 worker 未开 workspace、未重扫。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| hooks | openhands-cli-hooks-v2 | hooks.entry/input/conditions/diagnostics：answered；events/output/order 不变 | 已进入候选选版 |
| custom_agents | openhands-cli-custom_agents-v3 | agents.limits：partial（并发已补，嵌套深度仍缺） | 已进入候选选版 |
| native_plugins | openhands-cli-native_plugins-v2 | plugins.install/diagnostics：partial | 已进入候选选版 |
| configuration | openhands-cli-configuration-v2 | config.sources/runtime/migration：answered；defaults/diagnostics 不变 | 已进入候选选版 |
| custom_providers | openhands-cli-custom_providers-v1 | entry/auth/protocol/models/forwarding/diagnostics：无答案变化 | 保留旧版本 |
| local_transcripts | openhands-cli-local_transcripts-v1 | scope/location：无答案变化 | 保留旧版本 |
| mcp | openhands-cli-mcp-v1 | entry/definition/transport/auth/diagnostics：无答案变化 | 保留旧版本 |
| skills | openhands-cli-skills-v1 | roots/discovery/collision/format/extensions/loading/invocation/conditions：无答案变化 | 保留旧版本 |

**发布：**候选隔离交付，未构建 release、未切换指针（`delivery=pr`）。**受管二进制：**worker 不执行 binary。

## 待处理与独立复核

**审计记录：** `audits/openhands/audit-openhands-8c4eff9b-8f8c-4316-aeca-0b8c34bfe18e.yaml`（reviewed；`pending_question_ids: []`）。**待处理旧审计：** `72fdbc68`、`9af885fb`、`e6a9b08b`、`47261bfb`、`6563dbad`、`908f5b19` 保留在 `pending_audit_refs`，本轮不代为关闭。**待复核问题：**无——没有来源冲突无法解释、没有推翻已发布配置步骤、没有跨主题关键加载机制改变；新增内容均为文档级、版本未知，不需要独立复核。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-openhands-docs-hooks | 4279e3742c48 → 2f549b9867f1 | changed；真实变化（插件 hook、PLUGIN_ROOT、工作目录、适用界面） |
| source-openhands-docs-task-tool | 80b77b0f363e → 526f76d0c37e | changed；真实变化（tool_concurrency_limit 并行、DelegateTool 退役） |
| source-openhands-docs-plugins | 5557bef62e64 → 81481fa294c2 | changed；真实变化（删除 CLI 入口、本地插件目录） |
| source-openhands-docs-cli-installation | 7972a6a61d6e → 994068f5b11f | changed；真实变化（CLI 维护状态、agent_settings.json、uv 0.11.6+） |
| source-openhands-docs-env-vars | 0c3b7f1ab5e8（未保留）→ e391ce627da8 | changed；页面归档（对照 2026-10-04 保留副本 ea2844c1） |
| source-openhands-docs-agents | 5bb5fa776a7b → 068c300c40b8 | changed；仅 `[!WARNING]` 与链接格式 |
| source-openhands-docs-agent-file-based / agent-settings / agent-plugins | baseline → observed | changed；提示块、链接绝对化、目录卡片、代码块转义 |
| source-openhands-docs-cli-commands / cli-mcp | baseline → observed | changed；仅新增 CLI 维护状态横幅与链接格式 |
| source-openhands-docs-config-options / custom-llm / llm-settings | baseline → observed | changed；格式；custom-llm 加 Legacy 归档说明 |
| source-openhands-docs-mcp-settings | 3be069f7dcd4 → 6d15c70046de | changed；删除 CLI 专属说明，新增 UI 选项卡与排障小节 |
| source-openhands-docs-sdk-hooks / sdk-plugins / skills / skills-keyword / skills-path | baseline → observed | changed；格式、卡片与目录树序列化差异 |
| source-openhands-docs-sdk-skills | 346c78f8f217 → 41b477249b24 | changed；新增 GitHub 子目录安装 API（非固定问题范围） |
| source-openhands-npm | 1.44.0 → 1.45.0 | changed；仅发布身份，不造映射 |
| source-openhands-cli-repo / repo / sdk-repo | 0403f1a→283c6ac / fd3a76f→d5dcd45 / f824a94→15bbd07 | changed；changed-path 清单不含章节引用文件 |

## 验证与差异入口

候选校验：`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-3/candidates/openhands`（结果见交付报告）。新增引用均绑定 observed hash 的快照：`snapshot-source-openhands-docs-{hooks,plugins,task-tool,cli-installation,env-vars}-20261124`，`source_fetched_at` 取对应 check 的 `checked_at`。diff 口径与保留原件日期见审计 `investigation_notes` 第 1 条；2026-09-30 快照窗口没有保留原件，未对其断言。
