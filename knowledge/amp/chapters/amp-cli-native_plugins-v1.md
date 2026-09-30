---
schema_version: 3
record_kind: production
edition_id: amp-cli-native_plugins-v1
harness_id: amp
topic: native_plugins
title: "Amp CLI 的原生插件：包格式、安装、发现与 API 边界"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-overview, ref-amp-docs-index-pages, ref-amp-plugins-events, ref-amp-plugins-bundled-skill, ref-amp-pluginapi-agentconfig, ref-amp-plugins-writing, ref-amp-modes-custom]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-writing, ref-amp-pluginapi-types, ref-amp-pluginapi-skilldef, ref-amp-plugins-bundled-skill]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-locations, ref-amp-plugins-adding, ref-amp-global-local, ref-amp-plugins-repos, ref-amp-global-repos, ref-amp-global-scopes, ref-amp-global-update, ref-amp-global-share, ref-amp-plugins-reload]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-locations, ref-amp-plugins-writing, ref-amp-plugins-reload, ref-amp-plugins-bundled-skill]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-amp-pluginapi-api, ref-amp-plugins-events, ref-amp-plugins-overview, ref-amp-plugins-register-tool, ref-amp-plugins-bundled-skill, ref-amp-plugins-link-pattern, ref-amp-plugins-agent-mode, ref-amp-pluginapi-createwebhook-doc, ref-amp-pluginapi-ondispose, ref-amp-plugins-command-availability, ref-amp-plugins-ui-input, ref-amp-plugins-ai-ask, ref-amp-plugins-permissions-example, ref-amp-tools-permissions]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-reload, ref-amp-plugins-locations, ref-amp-global-publish, ref-amp-plugins-agent-mode, ref-amp-pluginapi-ondispose]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-amp-plugins-overview, ref-amp-plugins-events, ref-amp-plugins-bundled-skill, ref-amp-pluginapi-agentconfig]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: partial
        source_refs: [ref-amp-plugins-writing, ref-amp-pluginapi-types, ref-amp-pluginapi-skilldef]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: partial
        source_refs: [ref-amp-plugins-locations, ref-amp-plugins-adding, ref-amp-global-local, ref-amp-plugins-repos, ref-amp-global-update]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: partial
        source_refs: [ref-amp-plugins-locations, ref-amp-plugins-writing]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-amp-pluginapi-api, ref-amp-plugins-register-tool, ref-amp-plugins-link-pattern, ref-amp-pluginapi-createwebhook-doc, ref-amp-plugins-command-availability]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-amp-plugins-reload, ref-amp-plugins-locations, ref-amp-global-publish]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-amp-plugins-reload, ref-amp-plugins-agent-mode]
---

## 什么算 Amp 的原生插件 {#plugins-model}

固定来源是官方文档站快照：`/docs/customize/plugins`、`/docs/plugin-api`、`/docs/customize/global-plugins-and-skills`。Amp CLI 闭源，全部结论为来源级知识（`version_applicability: unknown`）。[@ref-amp-plugins-overview][@ref-amp-docs-index-pages]

官方定义：「插件是给 Amp 增加工具、命令和事件驱动行为的 TypeScript 或 JavaScript 模块。插件可以是单个文件，也可以是带辅助文件的目录。插件会在你的环境里运行代码，所以只加载你信任的插件。」[@ref-amp-plugins-overview]

插件能做的事（官方枚举）[@ref-amp-plugins-overview]：处理事件（`amp.on(...)`，用于工具调用、工具结果与 agent 生命周期）、加工具（`amp.registerTool(...)`）、打包 Skill（`await amp.registerSkill(...)`）、加命令（`amp.registerCommand(...)`）、显示 UI（`ctx.ui.notify/confirm/input/select`）、用 AI 分类（`amp.ai.ask(...)`）。

**与四类相邻机制的关系**：

| 相邻机制 | 关系 |
| :-- | :-- |
| **Hook 脚本** | Amp 没有独立的 hook 脚本；Hook 就是插件事件处理器，见「Hooks」一章 [@ref-amp-plugins-events] |
| **Skill** | 目录型插件可以把自己目录里的标准 skill 包注册进来，得到限定名 `plugin-name:skill-name`；Amp 不会自动扫描插件的 `skills/` 目录，必须显式注册 [@ref-amp-plugins-bundled-skill] |
| **MCP server** | MCP 是另一套扩展入口（`amp.mcpServers` / skill 的 `mcp.json`），与插件并列；插件里的 agent 可以通过 `mcp__*` 通配符把 MCP 工具纳入自己的工具列表 [@ref-amp-pluginapi-agentconfig] |
| **普通包** | 固定来源把插件描述为**文件或目录**，由 Amp 用 Bun 执行，没有描述 npm 包分发或依赖安装机制；插件入口可以用相对路径 import 自己的辅助文件 [@ref-amp-plugins-writing] |

插件也是**自定义 agent**的来源：插件可以定义自定义模式与自定义子代理。[@ref-amp-modes-custom]

## 包格式、入口与元数据 {#plugins-package}

**单文件插件**是直接放在插件位置里的 `.ts` 或 `.js` 文件。**目录插件**用 `插件名/index.ts` 或 `插件名/index.js`；两者同时存在时 Amp 用 `index.ts`。入口文件可以用相对路径 import 辅助文件。[@ref-amp-plugins-writing]

```text
deploy-status/
├── index.ts
├── client.ts
└── prompts/
```

每个插件入口导出一个**默认函数**，Amp 把 `PluginAPI` 对象作为参数传进去；导出函数里的代码在插件加载时运行（需要「在某个线程会话启动时」才跑的工作应放到 `session.start`）[@ref-amp-plugins-writing]：

```ts
import type { PluginAPI } from '@ampcode/plugin'

export default function (amp: PluginAPI) {
	amp.logger.log('Plugin initialized')
}
```

**第一方元数据**只有两项：类型来自 npm 包 `@ampcode/plugin`，运行期由 Bun 执行；以及可选的具名导出 `description`——它**必须是静态字符串字面量，且不超过 300 个字符**，Amp 在插件设置里显示它，缺失、动态或超长的值会被忽略。[@ref-amp-pluginapi-types]

固定来源**没有**描述插件清单文件（package.json / manifest）、版本号声明、兼容性声明或依赖安装——「包格式」在文档里就是「文件布局 + 默认导出」。这是明确缺口。[@ref-amp-plugins-writing]

**插件可以贡献的其他静态资产**：目录插件里的 skill 目录（必须调用 `registerSkill({ path })` 注册，路径相对插件目录，且指向含 `SKILL.md` 的目录；frontmatter 的 `name` 必须与目录名一致）。单文件插件不能注册 skill。[@ref-amp-pluginapi-skilldef][@ref-amp-plugins-bundled-skill]

## 安装、更新与卸载 {#plugins-install}

四种安装/放置方式 [@ref-amp-plugins-locations][@ref-amp-plugins-adding]：

| 位置 | 适用范围 | 怎么装 |
| :-- | :-- | :-- |
| personal 插件 | 处处可用 | Personal Settings 里管理，或把共享 URL 粘进线程让 Amp 导入 |
| workspace 插件 | 工作区全体成员 | 管理员在 Workspace Settings 管理，或让 Amp 把共享项复制进 workspace 仓库 |
| project 插件 | 该项目的 Amp 运行 | 把文件或目录放进项目根的 `.amp/plugins/` |
| system 插件 | 本机的所有项目 | `amp plugins add URL`（默认即此），或手工放进 `$XDG_CONFIG_HOME/amp/plugins/`（未设置时 `~/.config/amp/plugins/`，Windows 为 `%USERPROFILE%\.config\amp\plugins\`） |

`amp plugins add URL` 装单个单文件插件；`--target workspace` 表示装进**当前项目的 `.amp/plugins/`**，而不是托管的 Workspace Plugins 仓库。要发布托管 workspace 插件，必须走 Amp 对话或仓库流程。[@ref-amp-global-local]

**托管仓库**：personal 与 workspace 插件各自存在一个 Git 仓库里，Amp 称其为 global（不绑定单个项目或机器）。仓库用 Git 版本化，commit 并 push 即发布；仓库所有者可以在 Advanced 设置里要求签名提交。CLI 入口：`amp plugins repositories` 列出仓库与 clone 命令，`amp clone user-plugins` / `amp clone workspace-plugins` 克隆，`amp plugins import` / `amp plugins update NAME` 管理共享导入。[@ref-amp-plugins-repos][@ref-amp-global-repos]

**作用域选择**建议：先做 personal，成型后再共享或让管理员发布到 workspace。[@ref-amp-global-scopes]

**更新**：导入项不会被无声覆盖——要求 Amp 检查哪些导入已过期并准备更新，或 `amp plugins update NAME`；评审、commit、push 之后才发布。托管安装的插件也可以带自动更新标志安装（文档示例 `amp plugins add --auto-update @amp/grok-46-mode`）。[@ref-amp-global-update]

**共享**：Personal Settings 里选中插件 → Share → 对工作区可见 → 复制 URL；别人导入的是自己的副本，改副本不影响你。[@ref-amp-global-share]

固定来源没有给出「禁用/卸载单个插件」的独立 CLI 命令；文档里的卸载路径是移除文件或通过仓库流程移除，并通过 `plugins: reload` 生效。这是缺口。[@ref-amp-plugins-reload]

## 发现、加载与命名冲突 {#plugins-discovery}

**优先级**：同名插件按 project、system、personal、workspace 的顺序取胜（前面覆盖后面）。[@ref-amp-plugins-locations]

**发现与加载**：Amp 在插件位置里找单文件插件与目录插件，取目录里的 `index.ts`（优先）或 `index.js` 作为入口，执行默认导出函数，把 `PluginAPI` 传进去；导出函数体内的代码即为「加载时」执行。[@ref-amp-plugins-writing][@ref-amp-plugins-locations]

固定来源**没有**描述插件依赖的解析与安装、插件之间的加载顺序（除了「同名取优先级」）、加载失败的降级策略或命名空间隔离规则。插件注册的工具、命令与事件都挂在插件实例上，重载或禁用插件会一并移除它带来的 skill。[@ref-amp-plugins-reload][@ref-amp-plugins-bundled-skill]

**重载**：改动插件后让 Amp 重载，或命令面板 `plugins: reload`。系统插件、project 插件同理。[@ref-amp-plugins-reload]

## 插件能注册什么、边界在哪 {#plugins-api}

`PluginAPI` 暴露的注册面（类型参考原文）[@ref-amp-pluginapi-api]：

| 能力 | 调用 | 说明 |
| :-- | :-- | :-- |
| 事件 | `on(event, handler)` | 见 Hooks 一章；返回 `Subscription` [@ref-amp-plugins-events] |
| 命令 | `registerCommand(id, options, handler)` | 出现在命令面板里 [@ref-amp-plugins-overview] |
| 工具 | `registerTool(definition)` | 与内置工具并列给模型调用 [@ref-amp-plugins-register-tool] |
| Skill | `await registerSkill({ path })` | 只能注册目录插件里的 skill [@ref-amp-plugins-bundled-skill] |
| 链接模式 | `registerLinkPattern({ id, pattern, href })` | 把线程记录里的匹配文本变成链接 [@ref-amp-plugins-link-pattern] |
| 自定义 agent | `createAgent(...)` + `registerAgentMode(...)` | 见「Custom agents」一章 [@ref-amp-plugins-agent-mode] |
| 持久 webhook | `await createWebhook({ key, handler })` | 在 Amp 托管的 Orb 里注册一个持久通用 webhook，返回能力 URL [@ref-amp-pluginapi-createwebhook-doc] |
| 清理 | `onDispose(callback)` | 插件被卸载/重载或宿主优雅关闭时运行 [@ref-amp-pluginapi-ondispose] |
| AI / 附件 / 配置 / 线程 / 系统 | `amp.ai`、`amp.attachments`、`amp.configuration`、`amp.threads`、`amp.system` | 配置可 `get` / `update(partial, target)` / `delete(key, target)`，target 为 `global`（用户设置）或 `workspace`（默认） [@ref-amp-pluginapi-api] |

**命令的可用性**：`registerCommand` 接受可选的 `availability`，并返回带 `setAvailability(...)` 的订阅，取值 `{type:'enabled'}`（默认）、`{type:'disabled', reason}`（显示但不可选）、`{type:'hidden'}`（不显示）。[@ref-amp-plugins-command-availability]

**链接模式的约束**（注册入口的边界示例）：`pattern` 是不带锚点、flag 与定界符的正则源码，Amp 用 `u` flag 编译，要求两侧有 token 边界，拒绝超过 200 字符、含反向引用/后行断言或能匹配空串的模式；`href` 必须展开成 `http:`/`https:` URL 或 Amp 上的绝对路径，`{{match}}` 与 `{{name}}` 会被 URL 编码；两条模式匹配同一段文本时先注册者胜。[@ref-amp-plugins-link-pattern]

**UI 与 AI 助手**：`ctx.ui.confirm/input/select` 提供确认、文本输入与选择对话框（选择对话框可开 `allowOther` 追加自定义输入项），插件还能用 `amp.ai.ask(...)` 做线程作用域的 yes/no 分类。[@ref-amp-plugins-ui-input][@ref-amp-plugins-ai-ask]

**权限与宿主 API 边界**：插件是**在你的环境里跑的代码**，文档的边界只有一句「只加载你信任的插件」——没有沙箱、权限清单或能力授予机制的描述。反过来，需要「按策略阻断工具」时，官方给的方案是**写插件**（例如权限插件示例），由管理员作为 global workspace 插件分发；Amp 默认不在运行工具前请求批准。[@ref-amp-plugins-overview][@ref-amp-plugins-permissions-example][@ref-amp-tools-permissions]

**webhook 的时限**（唯一明确写出时限的插件 API）：同一用户的 project 线程按「插件 + key」共享一个注册，无 project 的线程每线程一份；重复注册返回同一个能力 URL，URL 要当作凭据。处理器副作用**至少投递一次**，要用 `event.id` 做幂等键；处理器有 30 秒完成时间，超时后 `ctx.signal` 被中止并重试；失败按 5 秒起始、上限 5 分钟的指数退避重试，连续失败 1 小时后丢弃事件；归档拥有该注册的线程会让 URL 失效并暂停投递。[@ref-amp-pluginapi-createwebhook-doc]

`onDispose` 的清理预算：一个插件的所有清理回调合计约 3 秒，并行执行、顺序不保证，抛错只记录不传播；插件进程崩溃或被 SIGKILL 时清理回调**不会**运行，需要外部兜底（例如服务端 idle timeout）。[@ref-amp-pluginapi-ondispose]

## 生命周期与诊断 {#plugins-lifecycle}

固定来源能确认的插件状态与对应入口 [@ref-amp-plugins-reload][@ref-amp-plugins-locations]：

| 状态 | 怎么确认 |
| :-- | :-- |
| 已在磁盘上（已安装/已放置） | 检查四个插件位置；同名时按 project → system → personal → workspace 决定谁生效 [@ref-amp-plugins-locations] |
| 已加载 | `amp plugins list`（shell），或命令面板 `plugins: list` [@ref-amp-plugins-reload] |
| 已注册什么 | `amp plugins list` 会显示已加载插件、它们的来源，以及注册的事件、命令和工具 [@ref-amp-plugins-reload] |
| 已发布但未加载 | 托管仓库 push 后**新线程**自动加载新版；已有线程不会自动重载插件 [@ref-amp-global-publish] |
| 模式是否对外可见 | 客户端按 `// @amp-agent-mode ...` 注释做静态发现；运行期注册与注释不一致会告警 toast [@ref-amp-plugins-agent-mode] |
| 卸载/清理是否运行 | `onDispose` 回调在卸载、重载与优雅关闭时运行，崩溃或 SIGKILL 时不运行 [@ref-amp-pluginapi-ondispose] |

**改动何时生效**：命令面板 `plugins: reload` 或让 Amp 重载当前线程的插件；插件激活设置同时作用于交互式 `amp` 会话与 `amp --execute`。[@ref-amp-plugins-reload]

固定来源**没有**提供：插件版本查询命令、插件运行健康度、加载错误的独立日志入口，或「插件依赖缺失」的诊断。`amp plugins list` 只能确认注册面与来源；`amp plugins show-agent-options` 只回答插件 agent 可用的模型与内置工具名。[@ref-amp-plugins-reload][@ref-amp-plugins-agent-mode]
