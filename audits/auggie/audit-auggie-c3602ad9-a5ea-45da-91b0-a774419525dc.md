# Auggie 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮 20 个官方文档来源全部报了内容 hash 变化，但读者可见的只有模型页 `docs.augmentcode.com/models/available-models.md` 一处。字节变化的主体是文档站重新渲染：每页顶部多出 “## Documentation Index” 提示块，页尾多出 Mintlify 署名行；`llms.txt` 的 CLI 段落行号没有移位，只有 Tool Permissions 一行补了一句权限在代码扩展中不强制执行——这个事实 `configuration` 章节早已通过 `ref-auggie-docs-perms-enforced` 记录。

改写只落在一个主题：`custom_providers` 升到 `auggie-cli-custom_providers-v2`，补上模型目录的可用性条件（More 菜单、符合条件的工作区）和 Prism 两个路由选项的具体路由族。其余六个主题复核后无事实变化，沿用原版本。Auggie CLI 闭源，全部结论仍是来源级知识（`version_applicability: unknown`），不代表任何具体发行版。

另有一条不是变化的记录：`source-auggie-npm` 报 changed 是因为 Auggie 没有 npm_release 快照，扫描器取不到基线；观察到的 `0.36.0@sha512-jb4kq97…` 与既有 `artifact-auggie-npm` 记录的版本和 integrity 完全相同，本轮不据此改任何章节或映射。

## 变化的意义与证据边界

### 模型目录新增条目，Prism 第一次写明路由族

“Current models” 一节在既有清单末尾补了 `GPT-6.1 Sol by OpenAI`、`Kimi K3`、`Kimi K2.7 Code`（Moonshot，托管在 Fireworks 与 Baseten）和第二个 Prism 条目，并写明两条可用性规则：被新版本取代的型号退到 **More** 菜单（Claude Sonnet 5 与 GPT-6 Sol 都是这样），新型号只对“此前提供过上一代”的工作区开放（GPT-6.1 Sol 的原文如此）。这让 “`/model` 里能选到什么” 从一份随时变动的清单变成有条件说明的问题。

同页新增 “Prism routing options” 一节：Prism（Claude + Gemini）在 Claude Opus 5、Claude Sonnet 5 与 Gemini 3.0 Flash 之间路由，Prism（GPT）在 GPT-5.6 Sol、GPT-5.6 Luna 与一个 GPT-5.6 Luna solver 层之间路由，路由依据是任务、上下文与当前系统状况。对应引用 `ref-auggie-docs-models-catalog-20261003` 与 `ref-auggie-docs-models-prism-routing`，都绑定 2026-10-03 的 `snapshot-auggie-docs-models-20261003`。

边界仍然不变：路由参数对用户不可写，模型 ID 由 Augment 托管，文档没有任何指向自建端点或第三方 key 的入口。因此八道题的 `not_applicable` 状态一个都没有改变，改动落在 `providers.models`、`providers.metadata` 与 `providers.responses` 的机制描述上。

### 文档索引仍然没有 provider 页面

`llms.txt` 的 CLI 段从 “Introducing Auggie CLI” 起共 29 行，覆盖安装、登录、Subagents、Rules、Skills、Permissions、Plugins、MCP、Hooks、自定义命令、交互模式、Automation、Service Accounts、ACP、SDK 与 CLI Flags，没有 provider、BYOK、base URL 或 openai-compatible 条目（对全文件做过关键词检索）。新增引用 `ref-auggie-docs-index-cli-20261003` 绑定 2026-10-03 的索引快照，`providers-checks` 的“机制不存在”结论因此有了当前字节的落点。

### 其余页面的变化止于渲染样板

把新归档原件与既有 137 条文档引用做空白归一后逐字比对，134 条命中。未命中的三条里两条是概述式摘录而非逐字引用（`ref-auggie-docs-logs-path`、`ref-auggie-docs-index-cli`），内容本身未变；剩下的就是上面的模型页。配置页的五层设置文件与合并规则、权限页的两级优先级与受管文件范围、hooks 页的事件矩阵与字段、plugins 页的组件类型、skills 页的六个位置与 frontmatter 字段、subagents 页的字段表，在新原件中都逐字未变。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_providers | `auggie-cli-custom_providers-v2` | `providers.models`/`providers.metadata`/`providers.responses`/`providers.entry`/`providers.protocol`/`providers.forwarding`/`providers.diagnostics`：not_applicable（描述刷新，状态不变） | 交付工作区，待父进程发布 |
| skills | `auggie-cli-skills-v1` | 本轮复核后无变化 | 保留旧版本 |
| mcp | `auggie-cli-mcp-v2` | 本轮复核后无变化 | 保留旧版本 |
| custom_agents | `auggie-cli-custom_agents-v2` | 本轮复核后无变化 | 保留旧版本 |
| hooks | `auggie-cli-hooks-v2` | 本轮复核后无变化 | 保留旧版本 |
| native_plugins | `auggie-cli-native_plugins-v1` | 本轮复核后无变化 | 保留旧版本 |
| configuration | `auggie-cli-configuration-v1` | 本轮复核后无变化 | 保留旧版本 |

**发布：** `delivery=pr`，本轮不构建 release、不切换 `releases/current.json`，改动留在工作区交回巡检主进程。**受管二进制：** 未触发，`@augmentcode/auggie` 的 observed 值与既有记录相同，留给 `harness-binary` 核对。

## 待处理与独立复核

**审计记录：** [audit-auggie-c3602ad9-a5ea-45da-91b0-a774419525dc.yaml](audit-auggie-c3602ad9-a5ea-45da-91b0-a774419525dc.yaml)。**待处理旧审计：** 无。**待复核问题：** 无。改动不涉及来源冲突、推翻已发布配置步骤或跨主题加载机制变化，按 maintenance 第 4 节由本 Agent 自检。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-auggie-docs-models` | `2ae255c0…` → `e1dba56b…` | changed；模型清单增补并新增 Prism 路由一节，已新建快照与 2 条引用 |
| `source-auggie-docs-index` | `93f78268…` → `ec725797…` | changed；Tool Permissions 一行补权限边界说明，已新建快照与 1 条引用 |
| `source-auggie-docs-cli-config` | `1b929449…` → `d4c6bbcf…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-reference` | `126aa4a6…` → `06e4af1d…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-skills` | `bfbf6686…` → `7326aab9…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-subagents` | `b5a81c42…` → `c38d57d1…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-hooks` | `e500823b…` → `93f421dc…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-plugins` | `a06e95cf…` → `3de1273a…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-permissions` | `18e0c172…` → `3de8bb33…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-rules` | `07b59c66…` → `556b123a…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-custom-commands` | `2add7bc8…` → `49a158f4…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-interactive` | `3fd95f9f…` → `64d818b9…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-integrations` | `979bf699…` → `16b47d1e…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-cli-overview` | `1ea928a4…` → `8d21b733…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-auth` | `14ecd599…` → `8c5c0a41…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-automation` | `94aa03c4…` → `0e23674e…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-service-accounts` | `04daea8d…` → `42bc3c79…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-workspace-context` | `1e6307ba…` → `82516189…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-autoupgrade` | `15148ab0…` → `f747b693…` | changed；仅渲染样板，被引小节逐字未变 |
| `source-auggie-docs-logs` | `22095ca5…` → `fb7e86dd…` | changed；仅渲染样板，日志路径未变 |
| `source-auggie-repo` | `9cc3ead4…` → `9cc3ead4…` | unchanged |
| `source-auggie-npm` | 无基线 → `0.36.0@sha512-jb4kq97…` | changed，但观察值与既有 artifact 记录相同；不构成版本变化或版本映射 |

## 验证与差异入口

`pnpm knowledge:validate`（469 个章节版本通过，只有 codex／omp／opencode／pi 的既有 `COVERAGE_INCOMPLETE` 警告）、`pnpm sources:audit-log`（5 条审计通过）、`git diff --check` 均通过。3 条新引用的摘录已逐字比对归档原件，长度分别为 521、409、684 字符，均小于 800。本轮没有读取 Git 源码来源，没有打开来源工作区，也没有运行受管包流程。查看本地差异用 `git diff -- knowledge/auggie/ audits/auggie/ registry/chapter-current.yaml`，新文件见 `git status --short --untracked-files=all`。
