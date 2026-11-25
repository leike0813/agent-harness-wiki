# Devin CLI 上游维护报告（2026-11-25）

- 审计：`audit-devin-35aa3416-b3bd-47d1-9187-fbdfb7df4e41`（上一轮 `audit-devin-5d45a1bf-ce1a-4a45-933a-366166d21a6e`）
- 观察：`2026-11-25T00:28:50.994Z`，30 个官方文档来源 changed；npm 身份 `3000.6.11@sha512-q4oSmCGm…` 未变
- 范围：八主题全部复核；改写 `configuration`、`custom_providers`、`hooks`、`mcp`、`native_plugins`、`skills`
- 候选：`/tmp/ahw-batch-11/candidates/devin`

## 证据窗口（必读）

devin 的最新**已登记** snapshot 多为 `2026-09-30`，早于冻结基线（多数 `2026-10-04`）；`archive/devin/` 另保留了冻结基线原件以及 `2026-10-14`、`2026-10-23` 的副本。本轮为每个来源取最新的既有原件与 `2026-11-25` 观察做语义 diff，窗口起点见下表；**不把 `2026-09-30` 到该起点之间的变化归因本轮**。全部 30 个观察原件与 `documents/<sha>.txt` 的 sha256 均与审计 `observed` 一致。

## 逐来源结论

| 来源 | 窗口起点 | 结论 |
| - | - | - |
| adaptive | 10-23 | 仅措辞；Enterprise 设置名改为 Adaptive，Desktop 改为 Model routing 段 |
| auth | 10-04 | 仅链接 |
| cloud | 10-04 | 新增 Use your local machine；cloud 页不再列 `/archive`，commands 页仍保留 → transcripts 无变化 |
| commands | 10-04 | 新增 drs secret-create 取值来源、`devin connect`、`/resume` picker、`/rename` 别名、`/recap`、`/vim`、`/codex`、`/fusion`、`/undo-add-dir`，删除 `/loop` |
| config-ext | 10-04 | 排版 |
| config-file | 10-23 | 新增 `permission_mode`、`agent.pinned_models`、`local_tools_bypass_permissions`、`read_config_from.codex/kiro`；`show_path` 默认改 `true` |
| controls | 10-04 | 页面重写；Limitations（Memories/Workflows/App Deploys/Arena）被移除，App Deploys 不再列为不支持项 |
| essential | 10-23 | Smart 措辞、`Esc Esc`、resume picker、`/add-dir`、`/loop` 删除 |
| ext-index | 10-04 | 新增 Codex/Kiro 行 |
| fusion | 10-04 | 默认 pairing 改为 Opus 5.5 Medium + SWE-2 Medium |
| handoff | 10-04 | 外部 handoff 改为 Devin API/prompt，不再是开源插件 |
| hooks-lifecycle | 10-04 | 新增 surfaces、SessionStart 恢复/云端语义、SessionEnd 云端不触发、`ask_user_question` |
| hooks | 10-04 | 同事件表措辞；超时/不可读输出按错误 |
| import | 10-23 | 新增 Codex/Kiro 与 `.codeium/skills`；Claude 的 commands-as-skills 行被移除 |
| index | 10-04 | 安装/Quickstart 排版 |
| mcp-config | 10-04 | 新增 `oauthScopes`、`disabledTools` 与插件 MCP 字段参考链接 |
| mcp-overview | 10-04 | 排版 |
| models | 10-04 | 新增 Pinned Models（`Alt+P`/`Alt+N`、`agent.pinned_models`） |
| permissions | 10-04 | 批准选项 once/session/project/always 并链 `permission_mode`；Smart 可用性改为组织策略/沙箱条件；命令审批的 Describe 选项移除 |
| plugins-quickstart | 10-04 | 链接 |
| plugins | 10-04 | 插件 hooks 覆盖 cloud；新增 `platforms`、`logo`；list/update 与 Required/Offered；MCP 凭据占位符 |
| precedence | 10-04 | 排版 |
| rules | 10-04 | 排版 |
| sandbox | 10-04 | 链接 |
| skills-create | 10-04 | 链接 |
| skills-overview | 10-04 | 新增 `.kiro` 项目/全局位置与第三方 skill 来源句 |
| subagents | 10-14 | 排版/图片 |
| system-config | 10-04 | `proxy` 新增 `gzip`（默认 true） |
| team-settings | 10-04 | 链接与 Desktop controls 引用 |
| troubleshooting | 10-04 | accordion 化 |

## 语义 triage 与改写

| topic | 处理 | 新 edition |
| - | - | - |
| configuration | `config.sources` 增加 Codex/Kiro 与开关；`config.runtime` 增加 `permission_mode` 与 Smart 可用性；`config.trust` 增加 `proxy.gzip`；`config.defaults` 修正 `show_path=true` 并新增 `pinned_models`/`permission_mode`/`local_tools_bypass_permissions`；`config.migration` 补 Codex/Kiro | `devin-cli-configuration-v2` |
| custom_providers | `providers.entry` 补 `pinned_models`；`providers.models` 增加 pinning 与默认 pairing；`providers.diagnostics` 更新 Adaptive 的 Desktop 路径 | `devin-cli-custom_providers-v3` |
| hooks | 事件表补 SessionStart 恢复/云端、SessionEnd 云端不触发；插件 hooks 扩到 cloud；stdin `source`、云端后台/decision/additionalContext、超时错误、`ask_user_question` | `devin-cli-hooks-v2` |
| mcp | 定义表增加 `oauthScopes`/`disabledTools`；auth 与 exposure/diagnostics 同步 | `devin-cli-mcp-v3` |
| native_plugins | 清单增加 `platforms`/`logo`；install/lifecycle 补 list/update 与 Required/Offered；api 的 hooks 行与 MCP 凭据写法更新 | `devin-cli-native_plugins-v2` |
| skills | `.kiro` 项目/全局位置；Codex/Kiro 就地导入；Claude commands-as-skills 不再断言 | `devin-cli-skills-v2` |
| custom_agents | subagents 页无实质变化；保留 v1。历史 pending（`agent.subagent_model`、诊断取消键句）无新证据，不重开 | — |
| local_transcripts | 新命令属增补，不推翻存储/格式/清理答案；`/archive` 仍有 commands 页证据；保留 v1 | — |

新增 12 组 snapshot/artifact（archive 原件路径按扫描命名）与 25 条引用；摘录逐条与冻结观察逐字核对，均 ≤800 字符。所有新快照 `version_applicability: unknown`，不建立软件版本映射。

## 排除与保留

- `permissions` 的按 `e` 编辑命令、Local Hands 说明、`cloud` 的 `devin connect` 属 config.trust/plugins 的更大范围，本轮只取与已派发问题直接相关的 `permission_mode`、Smart 可用性与默认值。
- `commands` 的 drs secret-create 与 `/vim` 等属产品操作面，不在八主题内。
- `controls` 移除 Limitations 文案不等于来源断言"机制不存在"；旧引用仍锚定其自身 snapshot，章节不改，仅在本审计记录该文档变化。
- `local_transcripts` 的 `/rename` 别名、`/resume` picker 范围与 `/recap` 是增补；存储位置与数据库仍无来源，`transcripts.location/database` 保持 `unknown`。

## 复核与历史 pending

本轮无来源冲突、未推翻已发布配置步骤、未改变加载顺序/优先级机制；插件 `platforms` 与 hooks 的 cloud 语义是附加条件，按普通更新由作者自检。六个新 edition 逐节核对引用、问题、surface 与版本边界。

旧审计中的 configuration 云端账号来源（`read_config_from.cloud` 只读用户配置、组织策略优先）与 custom_agents 的 `agent.subagent_model`/诊断取消键句仍未完成高影响独立复核；本轮没有新证据，不重开。`pending_audit_refs: []` 只表示本审计不依赖它们结案，旧审计的未完成项保持历史待办。

## 验证

`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/devin` 通过；候选包含 6 个新 edition、12 个新 snapshot、12 个新 artifact、25 条新引用与更新后的 selection。未运行发布、指针切换或 binary 操作（worker 不执行）。
