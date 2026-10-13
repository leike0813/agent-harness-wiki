# Antigravity 上游审阅报告 · 2026-10-13 巡检定向维护

## 给维护者的结论

本轮只处理 `audit-antigravity-67652ea2-c1f2-4152-b06d-3d06ec9a33cc` 冻结范围内的四个主题：hooks、native_plugins、custom_providers、skills。六个来源发生变化（五个官方文档页 + `source-agy-repo`），逐条比对了原项目 archive 中保留的新旧两版原件后，四个主题全部需要改写，configuration、custom_agents、mcp、local_transcripts 本轮未调查、未改动。

新发布四个章节版本：`antigravity-cli-hooks-v2`、`antigravity-cli-native_plugins-v3`、`antigravity-cli-custom_providers-v2`、`antigravity-cli-skills-v3`；旧版本全部保留，`registry/chapter-current.yaml` 指向新版本。

**本轮含两项高影响结论，必须经独立复核后才能视为已结**：`SessionStart` 是新的第一方 hook 事件（第一方事件集合发生变化），`agy plugin list` 的输出契约被整体改写并新增 `--json`（插件发现与状态查询入口发生变化）。两者的作者自检只保证证据与章节定位逐条对应，不替代复核；本审计 `review_status` 保持 `pending`，不写 `reviewed_by` / `reviewed_at`。

## 仓库侧：确认为 changelog-only，按无知识影响排除

pinned workspace `ws-9eebbedf051f-64e1fc4d-dbec-4fcc-bdaf-64ee8c2e2719`（提交 `9eebbedf051ffd75adb15e468f48b7b75be4b15b`）：

- `800852ea61796e9fe53077a2f945e74daacb4be6..9eebbedf051ffd75adb15e468f48b7b75be4b15b` 之间只有 1 个提交（`Update CHANGELOG.md for 1.3.4`）。
- `git diff --name-status` 只返回 `M CHANGELOG.md`，净增 17 行，即 1.3.4 一节。
- 1.3.4 首条写的是「`agy plugin list` 新增 `--json`，并修复只显示 imported 插件的问题，改为列出每个已安装插件及其版本与启用状态」。这与 plugins 页同一轮修订描述的是同一处变化，属旁证而非独立机制。

按冻结输入的排除项，仓库侧不新建章节、不新增 `git_source_file` 引用、不建立任何版本映射（本产品无官方 npm 包）。

## hooks：新增第一方事件 SessionStart 与两项输出契约变化

证据固定在 `snapshot-agy-hooks-doc-20261013`（原件 `archive/antigravity/artifact-source-agy-hooks-doc-9a6d9f794b74/source.md`，sha256 `9a6d9f79…`），与基线 `cb8b510a…` 逐行 diff 只有这些变化：

1. **新事件 `SessionStart`**。字段表、事件表、matcher 注记、`hooks.json` 示例与「Input and output contract」小节同步出现：一次会话开始、首次模型调用之前触发；stdin 只有公共字段 `conversationId` / `workspacePaths` / `transcriptPath` / `artifactDirectoryPath` / `modelName`；stdout 只有可选 `injectSteps`，schema 与 `PreInvocation` 同构；matcher 被忽略。第一方事件由五个变为六个，章内所有「共五个」表述已改。
2. **`allow` 语义被改写**：`allow` 从「Automatically allows the tool execution」变为「Allows the tool call to proceed, delegating to the next hook or default policy」。这是本轮最容易被旧章节误导的一处：只返回 `allow` 的 Hook 不再等价于直接放行。
3. **新增 `auto_approve` 决策**：默认策略本会提示时自动批准，同时尊重用户显式配置的规则。文档没有写它与「Always Allow」缓存、`permissionOverrides` 的优先级关系。
4. **新增 `overwrite` 输出**：替换实参以浅层顶层合并并入 `toolCall.args`，实参被改动时工具结果前会 prepend 一条点名被改动键名的通知。这是第二条「可修改」通道，与 `permissionOverrides`（改默认权限）作用对象不同。
5. **注入步新增 `systemMessage` 类型**：官方例子为 `{"systemMessage": "Remember to lint", "metadata": {"source": "policy"}}`，`PreInvocation` 的注入形态由三选一变为四选一。

写入 `antigravity-cli-hooks-v2`：`hooks-entry`（字段表加 `SessionStart`、`hooks.json` 示例、matcher 注记）、`hooks-events`（事件表加行、触发位置与边界提醒）、`hooks-contract`（SessionStart 输入输出小节、`allow`/`auto_approve`/`overwrite` 说明、注入步四选一）、`hooks-order`（唯一写明的跨事件顺序：`SessionStart` 早于第一次 `PreInvocation`）。`hooks.input`、`hooks.output` 仍为 partial——文档仍未写 Hook 进程的 cwd、环境变量与非零退出码处置。

## native_plugins：`agy plugin list` 输出契约被整体改写

证据固定在 `snapshot-agy-plugins-doc-20261013`（`189969e2…`）与 `snapshot-agy-marketplace-doc-20261013`（`61f56331…`）。

- 旧文本「List all active packages and their loaded components」被替换为：默认输出是**已安装插件**摘要，逐条给出 enabled/disabled、版本、来源、分量计数。
- 新增 `--json`：输出 JSON 数组，含 `name`、`enabled`、`version`、`source`、`path` 以及 `skills` / `agents` / `rules` / `mcpServers` / `hooks` 分量名数组。
- 官方示例包含三种插件形态：启用的 `gcalendar`（0.0.3，`antigravity-plugins-official`，1 skill）、**禁用的** `gdocs`、以及来源为 `gemini-cli`、提供 1 个 MCP server 的 `workspace`。禁用插件仍在已安装集合里，与既有「禁用后仍可见」结论一致。
- marketplace 页把原先合并的一条拆成「List installed plugins」与「Enable, disable, or uninstall plugins」两条，命令与 flag 与 plugins 页一致。

写入 `antigravity-cli-native_plugins-v3` 的三处：`plugins-install`（shell 命令块与新契约）、`plugins-lifecycle`（已安装/安装路径两条状态观察入口）、`plugins-diagnostics`（列出与状态查询、版本与来源查询位置——`agy plugin list` 现在也给出 `version` 与 `source`，因此「插件版本只能在详情视图看到」这一限制被打破，脚本有了稳定 JSON 出口）。`plugins.lifecycle` 与 `plugins.diagnostics` 仍为 partial：`--json` 是否含失败或健康字段、跨来源既有目录与 `--json` 所报 `path` 的一致性都没有出处。

## custom_providers：模型可用性表改写

证据固定在 `snapshot-agy-models-doc-20261013`（`a88fc5d6…`），与基线 `f15fd13d…` 的 diff 只有 6 增 3 删：

- 新增 **Gemini 4 Argon** 行：Free/Plus 与 Pro 为 ❌，Ultra 与 Enterprise 为 ✅；是表中唯一不带博客链接的行。
- **Gemini 3.7 Flash、3.6 Flash、3.1 Pro 三行由四列全 ✅ 改为仅 Enterprise ✅**。同一次修订里 Gemini 3.8 Flash 保持四列全 ✅，Claude 与 GPT-OSS 各行标记未变。
- 新增脚注 `*** Not available in Antigravity IDE. Available in Antigravity 2.0, Antigravity CLI, and IDE extensions.`，只挂在 Gemini 4 Argon 一行，是本轮唯一把 CLI 与 IDE 显式区分开的模型可用性说明。原有 `*`、`**` 两条脚注未变。

写入 `antigravity-cli-custom_providers-v2`：`providers-models`（表结构变化、逐行影响、跨形态脚注、边界提醒——表本身不按形态分列，同一模型在 CLI 与 2.0 上的差异表里读不出来）与 `providers-metadata`（强度档位表达未变，变的是可选家族集合；Gemini 4 Argon 支持几档无出处）。两问仍为 partial：自定义模型的 ID/别名规则未文档化。

## skills：只改 shell 入口措辞

`skills.md` 的 CLI 小节把 `agy plugin list` 的注释从「列出所有活动插件及其捆绑 skill」改为「列出已安装插件（传 `--json` 可带上捆绑 skill 名与路径）」，并新增一行 `agy plugin list --json`。发现机制本身（自动扫描已安装插件目录）未变。写入 `antigravity-cli-skills-v3` 的 `skills-discovery` 与 `skills-conditions`，指向新增引用 `ref-agy-skills-doc-plugin-manage-list`；完整字段以 plugins 页的 `--json` 为准，细节留在原生插件章。

## 新增与保留

<!-- prettier-ignore -->
新增记录
- 原件：`artifact-source-agy-{hooks,skills,plugins,marketplace,models}-doc-<hash12>` 共 5 条 `archived_document`，archive 路径指向原项目 `archive/antigravity/...`；候选内不复制原件。
- 快照：`snapshot-agy-{hooks,skills,plugins,marketplace,models}-doc-20261013` 共 5 条。
- 引用 15 条：hooks 8 条（事件表、字段表、matcher 注记、契约小节、schema 示例、两个 `decision`/`overwrite` 表、注入步类型）；plugins/marketplace 4 条（list 命令说明、人类可读输出、JSON 输出、marketplace 侧同一条）；models 2 条（可用性表、脚注）；skills 1 条。
- 章节：`antigravity-cli-hooks-v2`、`antigravity-cli-native_plugins-v3`、`antigravity-cli-custom_providers-v2`、`antigravity-cli-skills-v3`；`registry/chapter-current.yaml` 同步指向这四版。

保留不动
- `antigravity-cli-hooks-v1`、`antigravity-cli-native_plugins-v2`、`antigravity-cli-custom_providers-v1`、`antigravity-cli-skills-v2` 作为历史版本保留。
- configuration、custom_agents、mcp、local_transcripts 四章保持当前选版，本轮未改写。
- 旧 `pending_audit_refs` 六条仍未解决，本审计 `review_status` 保持 `pending`，不写 `reviewed_by` / `reviewed_at`。

自检：`pnpm maintenance:candidates check --candidate <candidate-root>` 通过（exit 0）。

未运行：`pnpm ahw publish`、`pnpm chapters:update`、`pnpm managed:packages`、`pnpm sources:scan`、`pnpm sources:workspace`（pr 轮次不做发布与受管二进制核对；pinned workspace 由 coordinator 关闭）。

## 需要独立复核的问题

1. `SessionStart` 是否确实只触发一次、「新会话」在会话恢复与 `/clear` 后如何界定——文档只写了触发条件，未界定边界（`hooks.events`）。
2. `allow` 改为「交给下一个 hook 或默认策略」后，多个 `PreToolUse` Hook 串联时的实际放行链，以及它与 `auto_approve`、已缓存「Always Allow」的优先级关系（`hooks.output`）。
3. `overwrite` 的浅层顶层合并在嵌套对象与数组实参上的实际行为，以及被 prepend 的「点名被改动键名」通知是否会进入 agent 可见的工具输出（`hooks.output`）。
4. `agy plugin list --json` 是否稳定、字段是否随版本变动，以及它与 `plugin.json` 校验失败、加载失败的错误报告关系（`plugins.lifecycle`、`plugins.diagnostics`）。
