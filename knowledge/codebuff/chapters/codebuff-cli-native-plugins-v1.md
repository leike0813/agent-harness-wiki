---
schema_version: 3
record_kind: production
edition_id: codebuff-cli-native-plugins-v1
harness_id: codebuff
topic: native_plugins
title: "Codebuff 的原生插件：本提交里不存在插件机制"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-codebuff-workspaces, ref-codebuff-tools-list, ref-codebuff-theme-plugin, ref-codebuff-agents-doc, ref-codebuff-doc-agents-builtin, ref-codebuff-doc-mcp-file, ref-codebuff-doc-skills-create]
  - section_id: plugins-package-install-discovery
    surface_ids: [cli]
    source_refs: [ref-codebuff-workspaces, ref-codebuff-doc-quickstart, ref-codebuff-doc-troubleshoot-config, ref-codebuff-agent-lookup, ref-codebuff-agentdir-trust-doc, ref-codebuff-agents-doc]
  - section_id: plugins-api-lifecycle-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuff-run-options, ref-codebuff-theme-plugin, ref-codebuff-agentdir-trust-store, ref-codebuff-doc-troubleshoot-config, ref-codebuff-cli-logs]
  - section_id: plugins-alternatives
    surface_ids: [cli]
    source_refs: [ref-codebuff-agents-doc, ref-codebuff-doc-sdk-options, ref-codebuff-run-overrides, ref-codebuff-agent-lookup, ref-codebuff-doc-quickstart, ref-codebuff-agentdir-trust-doc, ref-codebuff-workspaces]
  - section_id: plugins-package-identity
    surface_ids: [cli]
    source_refs: [ref-codebuff-cli-package, ref-codebuff-doc-quickstart, ref-codebuff-agent-lookup, ref-codebuff-agent-fields]
  - section_id: plugins-mechanism-map
    surface_ids: [cli]
    source_refs: [ref-codebuff-agents-doc, ref-codebuff-doc-skills-create, ref-codebuff-doc-mcp-file, ref-codebuff-workspaces]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-codebuff-workspaces, ref-codebuff-tools-list, ref-codebuff-agents-doc]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package-install-discovery
        status: not_applicable
        source_refs: [ref-codebuff-workspaces, ref-codebuff-doc-quickstart]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-package-install-discovery
        status: not_applicable
        source_refs: [ref-codebuff-doc-quickstart, ref-codebuff-doc-troubleshoot-config, ref-codebuff-agent-lookup]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-package-install-discovery
        status: not_applicable
        source_refs: [ref-codebuff-agentdir-trust-doc, ref-codebuff-agents-doc]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api-lifecycle-diagnostics
        status: not_applicable
        source_refs: [ref-codebuff-run-options, ref-codebuff-theme-plugin]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-api-lifecycle-diagnostics
        status: not_applicable
        source_refs: [ref-codebuff-agentdir-trust-store, ref-codebuff-doc-troubleshoot-config]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-api-lifecycle-diagnostics
        status: not_applicable
        source_refs: [ref-codebuff-cli-logs, ref-codebuff-doc-troubleshoot-config]
---

## 固定来源与检索范围 {#plugins-model}

**plugins.model**：本提交没有"原生插件"这一机制。为了给出可复核的结论，检索覆盖了仓库
`CodebuffAI/codebuff` @ `639e3f3c7a96658035d008e935398417843067fc` 的顶层工作区与
`cli/`、`sdk/`、`common/`、`packages/` [@ref-codebuff-workspaces]，以及 CLI 与 SDK 中的
"plugin" 字样、工具清单与扩展入口 [@ref-codebuff-tools-list]。仓库里唯一名为 plugin 的 API 是 CLI
内部的**主题插件**：一个进程内接口（`name` + `apply(theme, mode)`），由
`registerThemePlugin` 注册、重复注册只告警 [@ref-codebuff-theme-plugin]。它没有包格式、没有安装
渠道、也不跨进程加载，和 Skill、MCP server、Hook 脚本或 npm 包都不是一类东西
[@ref-codebuff-theme-plugin][@ref-codebuff-agents-doc]。

Codebuff 提供的扩展方式是另外四种，官方源码文档与文档站都按这个口径描述：`.agents/` 里的自定义
agent（含程序化 `handleSteps`）、`skills/` 里的 Skill、`mcp.json` 里的 MCP server，以及 SDK 侧
运行时注入的 agent 定义与自定义工具 [@ref-codebuff-agents-doc][@ref-codebuff-doc-agents-builtin]
[@ref-codebuff-doc-mcp-file][@ref-codebuff-doc-skills-create]。因此本主题的七个问题都按
not_applicable 阅读，理由即"机制不存在"，证据是上述检索与这些替代扩展点
[@ref-codebuff-workspaces][@ref-codebuff-tools-list]。

## 包格式、安装与发现 {#plugins-package-install-discovery}

**plugins.package**：没有插件清单、入口或兼容声明可供描述。仓库工作区里可发布的只有
`sdk/package.json` 那一类库（以及 CLI 自身的 npm 包），它们不是宿主加载的插件
[@ref-codebuff-workspaces]；文档站给出的安装对象是命令行工具本身
（`npm install -g codebuff`），不是插件包 [@ref-codebuff-doc-quickstart]。按 not_applicable 阅读
[@ref-codebuff-workspaces][@ref-codebuff-doc-quickstart]。

**plugins.install**：没有插件安装/更新/禁用/卸载流程。与"安装"沾边的两条分别是：一，CLI 自身
经 npm 全局安装，升级走自更新与 `codebuff --version`/npm 页面对比
[@ref-codebuff-doc-quickstart][@ref-codebuff-doc-troubleshoot-config]；二，agent 模板可以发布到 agent
store 并在运行时按 `publisher/agent@version` 拉取，但这属于 agent 而非插件
[@ref-codebuff-agent-lookup]。按 not_applicable 阅读 [@ref-codebuff-doc-quickstart]
[@ref-codebuff-doc-troubleshoot-config]。

**plugins.discovery**：没有插件发现、依赖解析或加载顺序概念。宿主在启动时发现的是
`.agents` 目录内容（agent 文件与 `mcp.json`），并要先过信任门：仓库内目录需用户确认一次，
`~/.agents` 永不询问，非交互运行除非显式 opt-in 否则跳过 [@ref-codebuff-agentdir-trust-doc]。按
not_applicable 阅读 [@ref-codebuff-agentdir-trust-doc][@ref-codebuff-agents-doc]。

## 扩展点、生命周期与诊断 {#plugins-api-lifecycle-diagnostics}

**plugins.api**：没有"插件能注册哪些能力"的问题，因为没有插件宿主 API。最接近的两处都写在源码
里：SDK 的 `CodebuffClient`/`run()` 接受宿主传入的 `agentDefinitions`、`customToolDefinitions` 与
`overrideTools`，属于同一进程内的嵌入方 API [@ref-codebuff-run-options]；CLI 内部的主题插件接口只
改主题合并结果，不暴露给外部包 [@ref-codebuff-theme-plugin]。按 not_applicable 阅读
[@ref-codebuff-run-options][@ref-codebuff-theme-plugin]。

**plugins.lifecycle**：没有"已安装 / 已启用 / 已发现 / 已加载 / 已激活 / 健康"这组状态。仓库里
有状态可查的两个东西是：`.agents` 目录的信任记录（配置目录下的
`trusted-agent-dirs.json`，路径规范化后按目录记 `trustedAt`）[@ref-codebuff-agentdir-trust-store]，以及
CLI 自身的版本与自更新状态 [@ref-codebuff-doc-troubleshoot-config]。按 not_applicable 阅读
[@ref-codebuff-agentdir-trust-store][@ref-codebuff-doc-troubleshoot-config]。

**plugins.diagnostics**：没有插件诊断入口。可用于排障的仍是通用日志与缓存清理：每会话日志写在
项目 `debug/` 与每会话目录下，`--clear-logs` 清理 [@ref-codebuff-cli-logs]；官方排障文档建议删除
`~/.config/manicode` 下的本地二进制后重启、用 `codebuff --version` 核对版本
[@ref-codebuff-doc-troubleshoot-config]。按 not_applicable 阅读 [@ref-codebuff-cli-logs]
[@ref-codebuff-doc-troubleshoot-config]。

## 想扩展 Codebuff 时应该用哪条路 {#plugins-alternatives}

因为没有插件机制，读者要扩展 Codebuff 只能从四条既有路径里选：`.agents/` 里的自定义 agent
（含程序化 `handleSteps`）、`skills/` 里的 Skill、`mcp.json` 里的 MCP server，以及把 SDK 嵌进自己
程序时传入的 agent 定义与自定义工具 [@ref-codebuff-agents-doc][@ref-codebuff-doc-sdk-options]
[@ref-codebuff-run-overrides]。这四条各自有独立章节，安装与固定版本的方式也不同：agent 模板可发布到
agent store 并按 `publisher/agent@version` 拉取 [@ref-codebuff-agent-lookup]，CLI 自身经 npm 安装
[@ref-codebuff-doc-quickstart]，`.agents` 内容则受目录信任门约束
[@ref-codebuff-agentdir-trust-doc]。本章的检索范围（仓库工作区、CLI/SDK 源码中的 plugin 字样、文档站
页面集合）没有发现插件页或插件包 [@ref-codebuff-workspaces][@ref-codebuff-doc-quickstart]。

## 包身份与安装面（供对照） {#plugins-package-identity}

作为对照，本提交里确实存在的"包"只有两类。其一，CLI 自身是一个 npm 包：
`cli/package.json` 的包名是 `@codebuff/cli`（bin 名 `codebuff-tui`，引擎声明要求 Bun，
`@codebuff/sdk` 是它的工作区依赖）[@ref-codebuff-cli-package]；官方文档给出的安装方式是
`npm install -g codebuff` [@ref-codebuff-doc-quickstart]。其二，agent 模板可以带 `publisher` 与
`version` 发布到 agent store，运行时按 `publisher/agent@version` 拉取，裸 id 回退到 "codebuff" 命名空间下的同名 id [@ref-codebuff-agent-lookup][@ref-codebuff-agent-fields]。两者都没有"宿主加载插件包"
的含义：前者是要运行的 CLI，后者是要执行的 agent 定义 [@ref-codebuff-cli-package]
[@ref-codebuff-agent-fields]。

## 机制对照：什么算插件、什么不算 {#plugins-mechanism-map}

以表格对照四种机制与"插件"的关系，是回答 plugins.model 的关键
[@ref-codebuff-agents-doc][@ref-codebuff-doc-skills-create][@ref-codebuff-doc-mcp-file]：

| 机制 | 是什么 | 与"插件"的关系 |
| --- | --- | --- |
| 自定义 agent | `.agents/` 下的 TS/JS 定义，可含程序化 `handleSteps` | 宿主直接导入执行的代码，但没有包清单、版本解析或安装渠道 |
| Skill | `SKILL.md` 提示词包（frontmatter + 正文） | 纯内容型扩展，按需注入上下文，不注册任何宿主 API |
| MCP server | 由 `mcp.json` 声明的本地进程或远端服务 | 能力来自进程外的服务，宿主只负责连接与工具暴露 |
| Hook 脚本 | 本提交不存在 | — |
| npm 包 | CLI 自身与 SDK 库 | 是要运行的程序/库，不参与宿主运行时加载扩展 |

因此本产品里的"扩展"始终是"配置或代码交由宿主直接执行"，不存在第三方以包为单位注册能力、声明
兼容性并由宿主管理生命周期的插件层 [@ref-codebuff-workspaces][@ref-codebuff-agents-doc]。
