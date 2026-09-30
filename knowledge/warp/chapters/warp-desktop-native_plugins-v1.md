---
schema_version: 3
record_kind: production
edition_id: warp-desktop-native_plugins-v1
harness_id: warp
topic: native_plugins
title: "Warp 桌面端的原生插件边界：无插件系统，只有集成与随附组件"
sections:
  - section_id: plugins-model
    surface_ids: [desktop]
    source_refs: [ref-warp-integrations-docker, ref-warp-integrations-raycast, ref-warp-integrations-vscode, ref-warp-integrations-jetbrains, ref-warp-agentnotif-setup, ref-warp-mcp-file-based]
  - section_id: plugins-components
    surface_ids: [desktop]
    source_refs: [ref-warp-ssh-how, ref-warp-ssh-install, ref-warp-agentnotif-setup, ref-warp-agentnotif-supported]
  - section_id: plugins-diagnostics
    surface_ids: [desktop]
    source_refs: [ref-warp-ssh-install, ref-warp-ssh-how, ref-warp-integrations-docker, ref-warp-integrations-raycast, ref-warp-integrations-vscode, ref-warp-mcp-file-based]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [desktop]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-warp-integrations-vscode, ref-warp-mcp-file-based]
  - question_id: plugins.package
    answers:
      - surface_ids: [desktop]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-warp-integrations-docker]
  - question_id: plugins.install
    answers:
      - surface_ids: [desktop]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-warp-integrations-raycast, ref-warp-integrations-jetbrains]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [desktop]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-warp-integrations-vscode]
  - question_id: plugins.api
    answers:
      - surface_ids: [desktop]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-warp-agentnotif-setup, ref-warp-mcp-file-based]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [desktop]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-warp-ssh-install, ref-warp-ssh-how]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [desktop]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-warp-ssh-how, ref-warp-integrations-docker, ref-warp-integrations-vscode]
---

## 原生插件模型的边界 {#plugins-model}

固定来源是 Warp 官方文档站的 Markdown 快照（Terminal Integrations、agent notifications、MCP、Skills、SSH extension 页）。Warp 桌面端（surface `desktop`）**没有插件系统**：没有插件清单、没有插件入口点、没有插件 API、没有插件目录或插件市场，也没有插件开发文档。证据是可直接复核的官方入口：

- 文档站唯一标题类似插件的页面是 **Terminal Integrations**，它列出的全部是**外部工具侧的配置**，不是 Warp 的插件：Docker 扩展（Docker Hub 上的扩展，仅 macOS）、Raycast 扩展（仅 macOS）、在 VSCode 里把外部终端指到 Warp、在 JetBrains IDE 里加一个 External Tool 指向 Warp [@ref-warp-integrations-docker][@ref-warp-integrations-raycast][@ref-warp-integrations-vscode][@ref-warp-integrations-jetbrains]。这些是把 Warp 当终端目标来启动，不需要 Warp 加载任何扩展代码。
- 站点里出现的 "plugin" 全部属于**其他工具的生态**：Claude Code / OpenCode / Codex 的通知插件（如 Claude Code 经 `/plugin marketplace add warpdotdev/claude-code-warp` 安装）[@ref-warp-agentnotif-setup]。

与相邻概念的关系：Warp 的扩展面是 **MCP server**（文档直接称其为 "essentially acting as plugins for Warp"）、**Skill**（`SKILL.md` 指令包）与 **Warp Drive 对象**；这三者都不是宿主插件——它们不注入代码、不注册扩展点，只提供工具、指令与数据 [@ref-warp-mcp-file-based]。

`plugins.package`、`plugins.install`、`plugins.discovery`、`plugins.api` 因此记 **not_applicable**：不存在包格式、入口清单、兼容声明、安装/固定版本/禁用/卸载流程、依赖与加载顺序规则，也不存在插件可注册的能力或宿主 API 边界 [@ref-warp-integrations-docker][@ref-warp-integrations-vscode]。

## Warp 自有的随附组件与第三方插件通道 {#plugins-components}

有一类容易与"插件"混淆的东西：**Warp 自己随附并管理的远程组件**。最典型的是 **SSH extension**——在远端主机上安装一个小型 companion server 到 `~/.warp/remote-server`，作为用户身份在后台运行、经已有 SSH 连接通信，不监听端口、不需要 root、不改 home 之外的内容 [@ref-warp-ssh-how]。它的生命周期由 Warp 管：**版本跟随你的 Warp 版本**，连到装了旧版扩展的主机时 Warp 自动安装匹配版本；一个主机上多个 SSH 会话与 Warp 窗口共用一个 server 进程；卸载方式是删除远端 `~/.warp*/remote-server` 目录 [@ref-warp-ssh-how]。安装需要用户显式同意，Warp 不会未经同意在远端装东西 [@ref-warp-ssh-install]。

这与插件模型的差别在于：它是 Warp 客户端的一部分、由 Warp 单方升级，用户既不能选版本也不能装第三方替代品；没有清单、没有权限声明 API [@ref-warp-ssh-install]。

第三方插件通道存在于**别的宿主**里：Claude Code 与 OpenCode 通过各自插件市场/插件数组安装 Warp 通知插件，用来把 agent 事件回传给 Warp 显示 [@ref-warp-agentnotif-setup]。Warp 侧对应的支撑能力是 agent 通知呈现（toast、通知信箱、桌面通知）与受支持的 agent 清单，而不是一个 Warp 插件 API [@ref-warp-agentnotif-supported]。

## 生命周期状态与诊断 {#plugins-diagnostics}

由于没有 Warp 插件，`plugins.lifecycle` 与 `plugins.diagnostics` 只能回答到"Warp 自有组件"这一层，记 **partial**：

- **已安装/启用/加载**：SSH extension 的状态可从远端 `~/.warp/remote-server`（Preview 为 `~/.warp-preview/remote-server`）是否存在判断；两个通道可以在同一远端主机共存 [@ref-warp-ssh-install]。
- **升级**：连接时 Warp 检查远端扩展版本并自动安装与客户端匹配的版本，因此"旧扩展"表现为一次自动安装 [@ref-warp-ssh-how]。
- **卸载**：删除远端 `~/.warp*/remote-server` 目录 [@ref-warp-ssh-how]。
- **失败回退**：远端不满足要求（OS/架构/glibc/shell/家目录可写/出网 HTTPS）或安装模式设为 **Never install** 时，Warp 回退到 legacy SSH wrapper；安装脚本需要远端能访问 `app.warp.dev`，无 `curl`/`wget` 时改走 SSH 上传 [@ref-warp-ssh-install]。
- **外部集成**：Docker 与 Raycast 扩展只在 macOS 可用，安装与否由那些工具的扩展市场负责，Warp 不做插件版本查询 [@ref-warp-integrations-docker][@ref-warp-integrations-raycast]。

未验证：是否存在未写入文档的插件加载路径（文档站没有插件开发页、没有插件清单规范，也没有插件目录约定）。本节检查的入口是文档站目录（Terminal Integrations、SSH extension、Agent Notifications 页）、MCP 与 Skills 页面，以及设置参考中与扩展相关的段落 [@ref-warp-integrations-vscode][@ref-warp-mcp-file-based]。
