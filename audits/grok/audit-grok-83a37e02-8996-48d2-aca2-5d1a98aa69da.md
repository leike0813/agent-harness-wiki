# Grok Build CLI 上游审阅报告 · 2026-11-25

## 给维护者的结论

本轮有两个来源变化：`overview` 被整页重写，`modes-and-commands` 相对冻结基线只多了两行。重写后的 overview 主要是入门导航改写和内容搬家，没有改变任何八主题固定问题的答案；modes 的两个真实增量落在 MCP 与自定义 Agent 两个主题上，因此只新建 `grok-cli-mcp-v2` 与 `grok-cli-custom_agents-v2` 两个完整 edition，其余六个主题保留旧版。

- **MCP**：`/mcps` 新增别名 `/connectors`，写入 `mcp.lifecycle` 的 TUI 启停入口。
- **custom_agents**：modes 新增 Goals 一节，记录目标复核时由 reviewer 子代理自动委派，补入 `agents.invocation` 并把该节缺口收窄为“除 `/goal` 外”。
- **overview**：安装/登录/`grok update`/系统要求/`/usage`/xAI API SDK 示例属于入门或站外内容，不在八主题固定问题内；Custom models 示例被移除，但 `~/.grok/config.toml` 路径仍在 Next 链接中，配置与自定义模型事实继续由未变的配置文档和源码引用支持。

## 变化的意义与证据边界

### 验证窗口

冻结审计记录的基线原件没有保留，因此按维护契约与最新保留原件逐字对比，并只对下列窗口负责：

| 来源 | 最新保留原件 | 冻结观察 | 说明 |
| --- | --- | --- | --- |
| `source-grok-docs-overview` | 8c85c95a…（2026-09-30） | e636af43…（2026-11-21 抓取） | 中间基线 3edf9fc3… 原件未保留；其相对 8c85c95a… 的差异只是 API 示例排序与 `SpaceXAI`→`SpaceXSI` 拼写，无语义变化 |
| `source-grok-docs-modes` | 606a0391…（2026-09-30） | 6d60b778…（2026-11-11 抓取） | 冻结基线 afd24e36… 原件未保留；中间修订 9b0d96bf…、afd24e36… 仅存哈希于历史 pending 审计 |

不据此断言窗口之外的任何变化。

### overview 重写：入门内容搬家，固定问题答案未变

相对保留原件，重写后的 overview：

- 安装段新增“下载最新稳定版并写入 `PATH`”，并提示新终端；首启登录改为浏览器、SSH/远程用 `grok login --device-auth`、CI 用 `XAI_API_KEY` 的三行表格；新增 `/usage`、`grok update`、系统要求和功能导航；删除“TUI 富交互”一句。
- headless 段的 `grok -p` 与 `--output-format streaming-json` 命令逐字未变，只改写引导语并链接 Headless and Scripting。
- 整节删除 Custom models 与其 `[model.my-model]` 示例、`grok inspect` 段落；Next 仍写明“Use any model through `~/.grok/config.toml`”，示例改指向未登记的 settings reference#modelid。
- 整节删除 Use Grok 4.7 on the API（JS/Python/curl/SDK 示例）。

对固定问题的影响：`config.sources` / `config.diagnostics` 的路径与 `grok inspect` 事实仍由 `config.toml` 文档、`grok inspect` 引用与源码支持；`providers.models` / `providers.diagnostics` 的字段与优先级来自源码与配置参考，删除文档示例不改变机制。登录方式、安装、更新、系统要求、`/usage` 与直达 xAI API 的 SDK 用法不属于任何固定问题；没有已发布章节声称 overview 保留这些小节。因此 configuration、custom_providers、skills、native_plugins 与 agents.diagnostics 全部保留旧版。

### modes 增量：MCP 别名与 Goals 复核

相对保留原件，modes 的语义变化是：

- `/timestamps` 由开关改为 `off|minimal|on` 取值，并新增 `/density <level>`；只影响 TUI 显示，无对应固定问题，排除。
- `/mcps` 行新增 `(alias /connectors)`；写入 `mcp.lifecycle`。
- 新增 `/goal` 命令与 Goals 一节：目标看起来完成时，一组 reviewer 子代理对照证据复核，多数同意才标记完成；发现缺口则继续，卡住时暂停并说明缺什么。这是已文档化的自动委派条件，补入 `agents.invocation`。
- memory 命令后的“启用条件”说明句删除、Workflows 行增加锚点；前者属记忆功能说明、后者是纯链接，均排除。

### 引用与审计边界

新增 `snapshot-grok-docs-modes-6d60b7787551`、`artifact-grok-docs-modes-6d60b7787551`（原件 `archive/grok/artifact-grok-docs-modes-6d60b7787551/raw.md`，sha256 `6d60b778…`）与两条引用 `ref-grok-docs-modes-mcp-alias`、`ref-grok-docs-modes-goal-reviewers`。旧 snapshot 与旧引用字节不变。overview 未被本轮任何引用消费，因此不新建它的 snapshot/artifact。

历史 pending 审计 `audit-grok-7f4ff347` 与 `audit-grok-b1d40922` 保持未关闭；本轮 `pending_audit_refs: []` 只表示没有新增待办，不表示关闭它们。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| mcp | grok-cli-mcp-v2 | mcp.lifecycle：partial（补 `/connectors` 别名） | 新 edition，进入候选选章 |
| custom_agents | grok-cli-custom_agents-v2 | agents.invocation：partial（补 Goals reviewer 委派，收窄缺口） | 新 edition，进入候选选章 |
| skills | grok-cli-skills-v2 | skills.invocation：answered（源字节未变） | 保留旧版 |
| custom_providers | grok-cli-custom_providers-v1 | providers.models / providers.diagnostics（答案未变） | 保留旧版 |
| hooks | grok-cli-hooks-v2 | 无（源字节未变） | 保留旧版 |
| native_plugins | grok-cli-native_plugins-v1 | plugins.diagnostics（表内仅 `/mcps` 行变化，答案未变） | 保留旧版 |
| configuration | grok-cli-configuration-v1 | config.sources / config.diagnostics（答案未变） | 保留旧版 |
| local_transcripts | grok-cli-local_transcripts-v1 | 无（源字节未变） | 保留旧版 |

**发布：** 仅候选数据集与审计，`delivery=pr` 由 coordinator 集成；未运行 `pnpm ahw publish`、未切换指针。**受管二进制：** 本轮不触发。

## 待处理与独立复核

**审计记录：** [audit-grok-83a37e02-8996-48d2-aca2-5d1a98aa69da.yaml](audit-grok-83a37e02-8996-48d2-aca2-5d1a98aa69da.yaml)。**待处理旧审计：** 上述两条历史 pending 保持未关闭。**待复核问题：** 无；本轮无来源冲突、无推翻已发布配置步骤、无跨主题关键加载机制变化，未触发独立复核。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| [source-grok-repo](https://github.com/xai-org/grok-build.git) | 2bdd1d6a… → 同 | unchanged；源码树未变 |
| [source-grok-docs-overview](https://docs.x.ai/build/overview.md) | 3edf9fc3… → e636af43… | changed；入门页重写、Custom models 与 xAI API 小节移除；无固定问题答案变化 |
| [source-grok-docs-skills-plugins](https://docs.x.ai/build/features/skills-plugins-marketplaces.md) | 8a43a340… → 同 | unchanged |
| [source-grok-docs-mcp](https://docs.x.ai/build/features/mcp-servers.md) | e0b9ce6b… → 同 | unchanged |
| [source-grok-docs-hooks](https://docs.x.ai/build/features/hooks.md) | 4f013d76… → 同 | unchanged |
| [source-grok-docs-subagents](https://docs.x.ai/build/features/subagents.md) | 42511685… → 同 | unchanged |
| [source-grok-docs-modes](https://docs.x.ai/build/modes-and-commands.md) | afd24e36… → 6d60b778… | changed；`/mcps` 增 `/connectors` 别名、新增 `/goal` 与 Goals 节；另含 `/timestamps`/`/density` 等显示命令 |
| [source-grok-docs-headless](https://docs.x.ai/build/cli/headless-scripting.md) | a4f39daf… → 同 | unchanged |
| [source-grok-docs-project-rules](https://docs.x.ai/build/features/project-rules.md) | 1077d4bf… → 同 | unchanged |
| [source-grok-npm](https://registry.npmjs.org) | 1.0.92@sha512-tLFJjet… → 同 | unchanged |

## 验证与差异入口

候选自检：

```sh
cd /home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor
pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-10/candidates/grok
```

结果为单产品文件清单，无诊断错误；候选包含两个新 edition、两条新引用、一条新 snapshot/artifact 与更新后的选章。

本地差异：

```sh
cd /tmp/ahw-batch-10/candidates/grok
git diff --no-index knowledge/grok/chapters/grok-cli-mcp-v1.md knowledge/grok/chapters/grok-cli-mcp-v2.md
git diff --no-index knowledge/grok/chapters/grok-cli-custom_agents-v1.md knowledge/grok/chapters/grok-cli-custom_agents-v2.md
```
