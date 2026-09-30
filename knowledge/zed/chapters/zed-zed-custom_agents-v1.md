---
schema_version: 3
record_kind: production
edition_id: zed-zed-custom_agents-v1
harness_id: zed
topic: custom_agents
title: "Zed 的自定义 Agent：agent_servers、ACP 外部代理与 profile 覆盖"
sections:
  - section_id: agents-entry
    surface_ids: [zed]
    source_refs: [ref-zed-agents-doc-boundaries, ref-zed-agents-doc-registry, ref-zed-agents-doc-custom, ref-zed-agents-doc-extension, ref-zed-agents-custom-settings, ref-zed-agents-custom-server, ref-zed-agents-repo-doc-common, ref-zed-agents-repo-doc-extension, ref-zed-agents-custom-read]
  - section_id: agents-format
    surface_ids: [zed]
    source_refs: [ref-zed-agents-doc-custom, ref-zed-agents-server-trait, ref-zed-agents-custom-server, ref-zed-agents-custom-settings, ref-zed-agents-doc-boundaries, ref-zed-agents-repo-doc-boundaries]
  - section_id: agents-roles
    surface_ids: [zed]
    source_refs: [ref-zed-agents-doc-boundaries, ref-zed-agents-spawn-name, ref-zed-agents-spawn-input, ref-zed-agents-repo-doc-profiles]
  - section_id: agents-invocation-overrides
    surface_ids: [zed]
    source_refs: [ref-zed-agents-doc-registry, ref-zed-agents-doc-boundaries, ref-zed-agents-spawn-input, ref-zed-agents-profile-content, ref-zed-agents-profile-runtime, ref-zed-agents-model-keys, ref-zed-agents-profiles-key, ref-zed-agents-custom-settings, ref-zed-agents-repo-doc-sandbox, ref-zed-agents-repo-doc-sandbox-perms, ref-zed-agents-context-preset]
  - section_id: agents-limits
    surface_ids: [zed]
    source_refs: [ref-zed-agents-doc-boundaries, ref-zed-agents-spawn-input, ref-zed-agents-profiles-key]
  - section_id: agents-diagnostics
    surface_ids: [zed]
    source_refs: [ref-zed-agents-doc-registry, ref-zed-agents-doc-debug, ref-zed-agents-doc-custom, ref-zed-agents-profile-content, ref-zed-agents-repo-doc-import]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [zed]
        section_id: agents-entry
        status: answered
        source_refs: [ref-zed-agents-doc-registry, ref-zed-agents-doc-custom, ref-zed-agents-doc-extension, ref-zed-agents-custom-settings]
  - question_id: agents.format
    answers:
      - surface_ids: [zed]
        section_id: agents-format
        status: answered
        source_refs: [ref-zed-agents-custom-settings, ref-zed-agents-doc-custom, ref-zed-agents-server-trait]
  - question_id: agents.roles
    answers:
      - surface_ids: [zed]
        section_id: agents-roles
        status: answered
        source_refs: [ref-zed-agents-doc-boundaries, ref-zed-agents-repo-doc-profiles, ref-zed-agents-spawn-name]
  - question_id: agents.invocation
    answers:
      - surface_ids: [zed]
        section_id: agents-invocation-overrides
        status: answered
        source_refs: [ref-zed-agents-doc-registry, ref-zed-agents-spawn-input]
  - question_id: agents.overrides
    answers:
      - surface_ids: [zed]
        section_id: agents-invocation-overrides
        status: answered
        source_refs: [ref-zed-agents-profile-content, ref-zed-agents-model-keys, ref-zed-agents-profiles-key, ref-zed-agents-doc-boundaries]
  - question_id: agents.limits
    answers:
      - surface_ids: [zed]
        section_id: agents-limits
        status: partial
        source_refs: [ref-zed-agents-doc-boundaries, ref-zed-agents-profiles-key]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [zed]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-zed-agents-doc-registry, ref-zed-agents-doc-debug]
---

本章固定来源：官方仓库提交 `5d80b4e784636899e209cae89626c3be4487e14f` 的 `crates/settings_content/src/agent.rs`、`crates/agent_servers/src/custom.rs`、`crates/agent_servers/src/agent_servers.rs`、`crates/agent_settings/src/agent_profile.rs`、`crates/agent/src/tools/spawn_agent_tool.rs`，以及官方文档站的 `docs/ai/external-agents.md`、`docs/ai/agent-profiles.md` 快照。文档快照不含适用软件版本号，本章按来源级知识阅读。

## 自定义 Agent 的定义位置与来源 {#agents-entry}

Zed 里「Agent」分三条路径：Zed Agent（原生）、External Agents（通过 ACP 接入的外部进程）、Terminal Threads（在终端线程里跑 CLI/TUI）。本条问题只涉及前两条——它们都由设置文件里的 `agent_servers` 映射登记。[@ref-zed-agents-doc-boundaries]

三个来源：

| 来源 | 登记方式 | 状态 |
| :-- | :-- | :-- |
| ACP Registry | 在 Agent Settings 的 External Agents 页选 `Install from Registry` | 文档推荐的主路径 [@ref-zed-agents-doc-registry] |
| 手写自定义 | `agent_servers` 里写 `{ "type": "custom", "command": …, "args": […], "env": {} }` | 文档给出的原生入口 [@ref-zed-agents-doc-custom] |
| 扩展提供 | 由扩展登记的 agent | 自 Zed `v1.5.0` 起废弃，已安装的会被自动迁移到 registry 等价物 [@ref-zed-agents-doc-extension][@ref-zed-agents-repo-doc-extension] |

`agent_servers` 的每个条目解析成 `CustomAgentServerSettings`。自定义变体的字段是 `path`（序列化名 `command`）、`args`、`env`，外加三个可选的控制项：`default_mode`（会话模式，并非所有 agent 都支持）、`default_config_options`（会话配置选项的默认值映射）、`favorite_config_option_values`（每个配置项的收藏值列表）。[@ref-zed-agents-custom-settings] 另一变体服务于 registry 安装的 agent，字段形状相同，因此「registry 装完还能针对该 agent 配默认模式/收藏值」这一点有源码支撑。[@ref-zed-agents-custom-settings]

运行侧的实现是 `CustomAgentServer`：它只保存 agent id，具体 settings 每次从全局 `AllAgentServersSettings` 里按 id 取用（`default_mode`、`favorite_config_option_value_ids` 都走这条路径），说明设置改动会被下一次读取看到。[@ref-zed-agents-custom-server][@ref-zed-agents-custom-read]

文档另有一份常见 ACP agent 清单（Claude、Codex、OpenCode、Copilot、Cursor、Pi Coding Agent），并明确该清单是精选而非穷尽，实际可选列表以应用内 ACP Registry 为准；Registry 安装完成后 agent 才会出现在新建线程菜单里。[@ref-zed-agents-repo-doc-common]

## 定义格式与跨进程约定 {#agents-format}

自定义 agent 是一个 ACP 兼容程序：`command` 是要执行的程序，`args` 是参数，`env` 是追加的环境变量。文档给出的最小示例（与源码字段一致）：[@ref-zed-agents-doc-custom]

```json
{
  "agent_servers": {
    "my-agent": {
      "type": "custom",
      "command": "node",
      "args": ["~/projects/agent/index.js", "--acp"],
      "env": {}
    }
  }
}
```

Zed 侧的通用实现是 `AgentServer` trait：它要求实现者提供 `agent_id`，其余能力（会话模式、配置项收藏等）由 trait 的默认实现或具体实现给出；`CustomAgentServer` 就是这套 trait 的一个实现。[@ref-zed-agents-server-trait][@ref-zed-agents-custom-server] Zed 提供方与 agent 之间通过 ACP 通信，agent 自己拥有运行时、认证、模型选择、工具与原生配置。[@ref-zed-agents-doc-boundaries] 对自定义 agent，`type: "custom"` 是必写的判别字段；registry 安装的条目由 Zed 写入，用户通常只需要改可选控制项。[@ref-zed-agents-custom-settings]

**边界**：Zed 只负责把线程渲染在 Agent Panel / Threads Sidebar，并把 Zed 配置的一部分转发过去；auth、模型、订阅、原生 skill/指令通常由 agent 自己管，Zed Agent profiles 默认不适用，Zed Skills 也不以 Zed Skill 的形式生效。[@ref-zed-agents-doc-boundaries][@ref-zed-agents-repo-doc-boundaries] 文档明确 External Agents 的计费、条款与数据处理由 agent 提供方负责，Zed 不为其收费。[@ref-zed-agents-doc-boundaries]

## 角色：原生 agent、外部 agent 与子 agent {#agents-roles}

三类「角色」用不同机制实现，不能混为一谈：

1. **Zed Agent**：Zed 自带的 agent，使用 Zed 配置的模型、内置工具、profile、Skill、指令与 MCP。[@ref-zed-agents-doc-boundaries]
2. **External Agent**：一个独立的 ACP 进程，Zed 只承载线程表面。[@ref-zed-agents-doc-boundaries]
3. **子 agent（subagent）**：Zed Agent 通过内置工具 `spawn_agent`（工具名常量 `spawn_agent`）派生的委派任务，拥有自己的上下文窗口；文档说明每个 subagent 与父 agent 拥有相同工具集，父 agent 继续自己的工作并在其完成后查看结果。[@ref-zed-agents-spawn-name][@ref-zed-agents-spawn-input]

Zed Agent 内部的「角色」由 **profile** 表达，而不是由 agent 定义文件表达：内置 profile 是 `Write`（读写与执行命令）、`Ask`（只读问答）、`Minimal`（不使用项目工具），用户可新建或 fork；profile 决定可以用哪些工具，而不决定是否自动批准。[@ref-zed-agents-repo-doc-profiles]

## 调用入口与每 agent 的设置覆盖 {#agents-invocation-overrides}

**显式调用**：在 Agent Panel 的 new-thread 菜单里选择 Zed Agent 或任一已安装的 External Agent 来新建线程；`agent::NewExternalAgentThread` 动作可带 agent id 直接开线程，因此可以给具体 agent 绑快捷键；安装后该 agent 会出现在 new-thread 菜单与 Threads Sidebar。[@ref-zed-agents-doc-registry] 线程可并行运行，每条线程可以使用不同的 agent。[@ref-zed-agents-doc-boundaries]

**自动委派**：Zed Agent 通过 `spawn_agent` 工具把子任务派给 subagent，输入结构由 `SpawnAgentToolInput` 定义；文档说明适用场景是「并行调查、自包含任务、只关心结论的研究」。[@ref-zed-agents-spawn-input]

**覆盖规则**分两层：

- **profile 层**（只对 Zed Agent）：profile 定义 `name`、`tools`（工具名到布尔的映射）、`enable_all_context_servers`、`context_servers`（server id 到该 server 的工具预设）以及 `default_model`。[@ref-zed-agents-profile-content][@ref-zed-agents-profile-runtime][@ref-zed-agents-context-preset] 运行时会把这些内容物化成 `AgentProfileSettings`，并据此判断某个工具在当前 profile 下是否启用。[@ref-zed-agents-profile-runtime]
- **行为层**：`agent.default_model` 决定新线程与未指定模型的特性用哪个模型，`agent.subagent_model` 决定 `spawn_agent` 派生的子 agent 用哪个模型（未设置时继承父 agent 的模型），`agent.default_profile` 决定默认 profile（默认 `write`），`agent.profiles` 是 profile 定义本身。[@ref-zed-agents-model-keys][@ref-zed-agents-profiles-key]

External Agent 的覆盖点只有 Zed 侧能控制的那部分：每 agent 的 `agent_servers` 条目（默认模式、配置项默认值与收藏值）。模型、认证、工具权限通常由 agent 自己决定；Zed 配置的 MCP server 可能通过 ACP 转发给它，ACP/工具转发权限也可能生效，但原生工具权限取决于该 agent。[@ref-zed-agents-custom-settings][@ref-zed-agents-doc-boundaries]

**沙箱**：OS 级沙箱只作用于 Zed Agent 的 `terminal` 与 `fetch` 工具，不影响 External Agents、Terminal Threads、语言服务器、扩展与普通终端；沙箱持久授权写在 `agent.sandbox_permissions`。[@ref-zed-agents-repo-doc-sandbox][@ref-zed-agents-repo-doc-sandbox-perms]

## 并发、嵌套与上下文边界 {#agents-limits}

已确证的部分：

- **线程并行**：Threads Sidebar 可以同时容纳多条 agent 线程与 Terminal Threads，每条线程有独立的 agent、上下文窗口与会话历史；可以给线程挑不同的 worktree 做隔离。[@ref-zed-agents-doc-boundaries]
- **subagent 上下文**：`spawn_agent` 派生的子 agent 有自己的上下文窗口，父 agent 只接收结果，从而让两侧上下文都保持聚焦。[@ref-zed-agents-spawn-input]
- **空闲线程保留**：`agent.max_idle_retained_threads` 控制保留多少条可加载会话的空闲线程，默认 `5`，设为 `0` 表示一旦不再活跃就卸载。[@ref-zed-agents-profiles-key]

**缺口**：固定来源没有给出 subagent 的最大并发数、最大嵌套深度或运行时长上限；`spawn_agent` 的输入结构与文档只描述用途与上下文窗口，未给出这些边界。父线程与子线程之间的可调用关系（子 agent 能否再派生 subagent）同样未在本次签出的文件集中确定。

## 诊断：确认定义被发现与定位失败 {#agents-diagnostics}

- **界面入口**：`agent::OpenSettings` 打开 Agent Settings 的 AI 页，其中 External Agents 子页列出已安装的 agent，并提供 `Add Agent`（`Install from Registry` / `Add Custom Agent`）；安装后 agent 出现在 new-thread 菜单，这就是「已被发现、可调用」的可观察证据。[@ref-zed-agents-doc-registry]
- **ACP 日志**：用命令面板里的 `dev::OpenAcpLogs` 查看 Zed 与 External Agent 之间的消息；文档要求在报告 External Agent 问题时附上该日志。[@ref-zed-agents-doc-debug]
- **配置位置**：选择 `Add Custom Agent` 时 Zed 会打开设置文件并插入 `agent_servers` 条目，因此「定义是否写对」可以直接对文件核对。[@ref-zed-agents-doc-custom]
- **委派失败**：Zed Agent 侧的失败线索在工具卡片与线程视图里；固定来源对「权限或委派失败」的专门诊断入口描述有限，只给出工具权限与 profile 两层规则，具体错误文案未能确证。[@ref-zed-agents-profile-content][@ref-zed-agents-doc-debug]
- **连接是否可达**：Thread History 里的 `Import Threads` 会按所选的 agent 逐个建立 ACP 连接，把「尚未在历史里、且有工作目录」的会话导入进来，重复导入安全；因此「能导入出会话」是 ACP 集成可用的一个可观察证据。[@ref-zed-agents-repo-doc-import]
