---
schema_version: 3
record_kind: production
edition_id: rovodev-cli-native_plugins-v1
harness_id: rovodev
topic: native_plugins
title: "Rovo Dev CLI 没有原生插件机制：扩展点是 MCP、Skill 与子代理"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-rovodev-install-acli, ref-rovodev-mcp-structure, ref-rovodev-skills-locations, ref-rovodev-subagents-locations, ref-rovodev-mcp-atlassian]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-rovodev-commands-cli, ref-rovodev-config-options, ref-rovodev-commands-interactive, ref-rovodev-install-acli]
  - section_id: plugins-state
    surface_ids: [cli]
    source_refs: [ref-rovodev-commands-interactive, ref-rovodev-config-options]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-rovodev-commands-interactive, ref-rovodev-help-cli]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: partial
        source_refs: [ref-rovodev-install-acli, ref-rovodev-mcp-structure, ref-rovodev-skills-locations]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: unknown
        source_refs: []
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: not_applicable
        source_refs: [ref-rovodev-commands-cli, ref-rovodev-install-acli]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: unknown
        source_refs: []
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: unknown
        source_refs: []
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-state
        status: not_applicable
        source_refs: [ref-rovodev-commands-interactive, ref-rovodev-config-options]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-rovodev-commands-interactive, ref-rovodev-help-cli]
---

固定来源范围：本章依据 Atlassian 官方支持文档《Install and run Rovo Dev CLI on your device》《Rovo Dev CLI commands》《Manage Rovo Dev CLI settings》《Connect to an MCP server in Rovo Dev CLI》《Extend Rovo Dev CLI with Agent Skills》《Use subagents in Rovo Dev CLI》《Get help in Rovo Dev CLI》《Rovo Dev and Model Context Protocol (MCP)》的固定快照。Rovo Dev CLI 为闭源产品，`surface_id: cli`；官方页面未标注适用的软件版本，本章为来源级知识。

结论先行：固定来源中**没有 Rovo Dev CLI 的原生插件机制**。官方文档描述的扩展方式是 MCP server、Agent Skills 和子代理（subagent），而不是可安装的插件包；CLI 自身也不位于「插件」这一层，而是 ACLI 的一个扩展。

逐题结论一览（证据见各小节）：

| 固定问题 | 状态 | 结论 |
| --- | --- | --- |
| `plugins.model` | partial | 无插件概念；CLI 是 ACLI 的扩展，扩展点是 MCP/Skill/子代理 |
| `plugins.package` | unknown | 无插件包格式、清单或兼容声明文档 |
| `plugins.install` | not_applicable | 命令与配置清单中无可安装对象 |
| `plugins.discovery` | unknown | 无插件发现/校验/加载文档 |
| `plugins.api` | unknown | 无插件注册能力或宿主 API 边界文档 |
| `plugins.lifecycle` | not_applicable | 不存在安装/启用/加载状态机 |
| `plugins.diagnostics` | partial | 只有 `/status`、`--help` 等 CLI 级入口 |

## 交付形态与扩展点 {#plugins-model}

Rovo Dev CLI 不是独立分发的插件宿主，而是 **Atlassian Command Line Interface (ACLI) 的一个扩展**：安装方式是先安装/升级 ACLI，再通过 `acli rovodev` 系列命令使用 Rovo Dev。[@ref-rovodev-install-acli]

它自己对用户暴露的扩展点只有三类，都不是插件：

| 扩展点 | 载体 | 官方机制 |
| --- | --- | --- |
| MCP server | `~/.rovodev/mcp.json` 的 `mcpServers`，用 `command`/`args`/`env` 或 `url`/`headers` 定义，`transport` 取 `stdio`/`http`/`sse` | 连接外部数据源与工具 |
| Agent Skill | `~/.rovodev/skills/`、`.rovodev/skills/`（或 `.agents/skills/`）下的目录与 `SKILL.md` | 以指令集方式教 Rovo Dev 完成任务 |
| 子代理 | `~/.rovodev/subagents/` 或 `.rovodev/subagents/` 下的 markdown 文件 | 委派带专用提示与工具的任务 |

三者分别见 MCP 结构、skill 位置表与子代理目录表。[@ref-rovodev-mcp-structure][@ref-rovodev-skills-locations][@ref-rovodev-subagents-locations]

**为什么它们不算「插件」**：按固定来源能读到的差异看——

- MCP server 是外部进程或远程端点，通过协议连接，宿主不加载其代码；它的「安装」是在 JSON 里声明 `command`/`url`，没有包元数据或兼容声明。[@ref-rovodev-mcp-structure]
- Skill 是纯文本指令集（markdown + YAML frontmatter），没有可执行入口要求，目录结构由协议约定；其「安装」就是把目录放到约定的根目录下。[@ref-rovodev-skills-locations]
- 子代理是定义主代理委派行为的提示与工具清单，同样没有代码加载或版本兼容声明。[@ref-rovodev-subagents-locations]

除此之外，Rovo Dev 内置了 Atlassian MCP server 并自动连接，用户无需安装任何东西就能获得 Atlassian 侧的上下文——这也说明「接入第三方能力」的官方路径是 MCP 声明，而不是插件安装。[@ref-rovodev-mcp-atlassian]

固定来源没有定义「插件」这一概念，也没有给出插件清单格式、入口文件、生命周期钩子或宿主 API 边界。检查过的直接入口：官方 CLI 命令清单、配置段清单、帮助命令；这些入口中都没有插件相关条目，但这属于**文档范围内的缺证**，不等于官方明确声明「不支持插件」。因此 `plugins.package`、`plugins.discovery`、`plugins.api` 保持未知。

## 安装与卸载 {#plugins-install}

官方命令行命令清单中只有 `run`、`auth login`、`serve`、`config`、`mcp`、`--help` 这些子命令，没有任何安装/卸载插件的命令。[@ref-rovodev-commands-cli] 配置文件的顶层段中也没有插件相关键：官方列出的段是 `agent`、`sessions`、`atlassianConnections`、`console`、`logging`、`mcp`、`toolPermissions`、`atlassianBillingSite`。[@ref-rovodev-config-options]

唯一名称相近的入口是交互命令 `/ide`（"Install Rovo Dev IDE plugin (when enabled)"），但它安装的是**Rovo Dev IDE 插件**，作用于 IDE 那一侧；在 CLI 侧它既不是插件宿主能力，也不是可安装到 CLI 的插件，且被标注为 "when enabled"。[@ref-rovodev-commands-interactive]

Rovo Dev CLI 自身的获取与更新随 ACLI 走：安装步骤是「安装 ACLI（或升级到最新版本）」，没有独立的版本固定、回滚或卸载流程。[@ref-rovodev-install-acli]

据此，面向 CLI 的「从哪里安装插件、如何固定版本/更新/禁用/卸载」在本产品上不成立（没有可安装对象）；用户级与项目级的区分只存在于 skill 与子代理的目录作用域，而不存在于插件。

## 状态与生命周期 {#plugins-state}

固定来源没有「已安装 / 已启用 / 已发现 / 已加载 / 已激活 / 健康」这组插件状态，也没有对应的查询命令——`/status` 只显示 CLI 自身的状态、版本、账号与模型。[@ref-rovodev-commands-interactive]

配置层面同样没有插件启用开关，只有与具体机制相关的条目（如 `mcp.disabledMcpServers`、`mcp.allowedMcpServers`、以及 skill 与子代理的目录约定），它们是各机制自己的开关，不能等同于插件生命周期。[@ref-rovodev-config-options]

因此 `plugins.lifecycle` 在本产品上不适用：既没有可安装对象，也没有安装→启用→加载的状态机可供观察。

## 诊断 {#plugins-diagnostics}

- `/status`：显示 CLI 状态、版本、账号信息与模型，可用于确认 CLI 版本，但**不涉及插件**。[@ref-rovodev-commands-interactive]
- `acli rovodev --help`、以及 `acli rovodev` 后接子命令的 `--help`：列出 flag 与子命令，是确认「当前构建是否提供某个命令」的入口。[@ref-rovodev-help-cli]

**缺口**：没有插件版本查询、依赖解析或加载错误定位的官方入口；若将来引入插件机制，需要新的官方来源补足 `plugins.package`、`plugins.discovery`、`plugins.api`、`plugins.lifecycle`。
