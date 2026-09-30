---
schema_version: 3
record_kind: production
edition_id: warp-desktop-hooks-v1
harness_id: warp
topic: hooks
title: "Warp 桌面端的 Hook 边界：无 Agent 事件回调，只有 OSC 通知 Hook"
sections:
  - section_id: hooks-scope
    surface_ids: [desktop]
    source_refs: [ref-warp-allsettings-agents, ref-warp-slash-static, ref-warp-agentnotif-setup, ref-warp-notifications-osc]
  - section_id: hooks-osc
    surface_ids: [desktop]
    source_refs: [ref-warp-notifications-osc, ref-warp-notifications-access, ref-warp-agentnotif-setup]
  - section_id: hooks-diagnostics
    surface_ids: [desktop]
    source_refs: [ref-warp-notifications-access, ref-warp-agentnotif-inapp, ref-warp-agentnotif-setup, ref-warp-notifications-osc]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [desktop]
        section_id: hooks-scope
        status: partial
        source_refs: [ref-warp-notifications-osc, ref-warp-allsettings-agents, ref-warp-slash-static]
  - question_id: hooks.entry
    answers:
      - surface_ids: [desktop]
        section_id: hooks-scope
        status: not_applicable
        source_refs: [ref-warp-allsettings-agents, ref-warp-notifications-osc]
  - question_id: hooks.input
    answers:
      - surface_ids: [desktop]
        section_id: hooks-osc
        status: partial
        source_refs: [ref-warp-notifications-osc]
  - question_id: hooks.output
    answers:
      - surface_ids: [desktop]
        section_id: hooks-osc
        status: not_applicable
        source_refs: [ref-warp-notifications-osc]
  - question_id: hooks.order
    answers:
      - surface_ids: [desktop]
        section_id: hooks-scope
        status: not_applicable
        source_refs: [ref-warp-notifications-osc, ref-warp-allsettings-agents]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [desktop]
        section_id: hooks-osc
        status: partial
        source_refs: [ref-warp-notifications-osc, ref-warp-notifications-access]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [desktop]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-warp-notifications-access, ref-warp-agentnotif-inapp, ref-warp-agentnotif-setup]
---

## 本 surface 的 Hook 边界 {#hooks-scope}

固定来源是 Warp 官方文档站的 Markdown 快照。Warp 桌面端（surface `desktop`）**没有 agent 生命周期 hook 机制**：没有 hook 事件列表、没有 hook 配置项、没有 matcher 或回调注册入口。这一结论来自对以下可直接复核入口的检查，而不是猜测：

- **完整设置参考**：`all-settings` 的 `Agents` 一节列出 `[agents]`、`[agents.knowledge]`、`[agents.mcp_servers]`、`[agents.profiles]`、`[agents.warp_agent]`、`[agents.third_party]`、`[agents.voice]` 全部字段，没有任何 hook / event / callback 键 [@ref-warp-allsettings-agents]。
- **内置斜杠命令表**：`Static slash commands` 是完整的命令清单，没有注册、列出或调试 hook 的命令 [@ref-warp-slash-static]。
- **Agent 通知页**：只描述 Warp 自己与第三方 CLI agent 的通知呈现，第三方 agent 的事件由它们自己的插件/配置产生，不是 Warp 的 hook 入口 [@ref-warp-agentnotif-setup]。
- **唯一带 "hook" 字样的第一方机制**是终端层的 **Custom notification hooks (OSC 9 / OSC 777)**，见下一节 [@ref-warp-notifications-osc]。

因此 `hooks.events` 记 partial：第一方"事件"只有终端转义序列触发的通知请求，没有工具调用前后的 agent 事件；其余问题的"机制不存在"结论以本节与小节引用为证据。

## OSC 9 / OSC 777 通知 Hook {#hooks-osc}

Warp 支持"可插拔通知"，由**终端转义序列**触发，脚本和工具无需额外依赖即可弹出桌面通知 [@ref-warp-notifications-osc]：

| 事件 | 序列格式 | 示例（bash/zsh） |
| :-- | :-- | :-- |
| OSC 9（仅正文） | `ESC ] 9 ; body BEL` | `printf '\033]9;Build complete\007'` |
| OSC 777（标题 + 正文） | `ESC ] 777 ; notify ; title ; body BEL` | `printf '\033]777;notify;Deploy;Success on prod\007'` |

**输入**就是序列里的正文（OSC 9）或标题与正文（OSC 777）；文档给出的注意点是正文里应避免或转义换行与分号。没有环境变量、工作目录、退出码等回调输入，也没有"敏感内容如何处理"的说明——通知正文按你写的内容提交给操作系统通知中心 [@ref-warp-notifications-osc]。

**生效条件**：该特性在当时的发布版中**默认启用**，在 macOS、Windows、Linux 上只要 Warp 被允许显示通知即可工作 [@ref-warp-notifications-osc]。系统层面需要通知权限：通知默认开启但依赖系统权限，被关掉过可以从 **Settings > Features > Session** 重新打开（或用命令面板快速切换），长命令完成 / 密码提示等内建触发器的配置在 **Settings > Features > Notifications** [@ref-warp-notifications-access]。

相比 agent hook 系统，这套机制的差别是：触发方在**终端外部**（任何往 pty 写字节的程序），Warp 只负责把序列翻译成一条通知；没有"在操作之前拦截并修改/阻断"的能力 [@ref-warp-notifications-osc]。`hooks.output`、`hooks.order` 因此记 not_applicable：既没有返回值/退出码语义，也就没有多个 hook 的排序、并发、超时或失败处理 [@ref-warp-notifications-osc]。

第三方 CLI agent（Claude Code、Codex、OpenCode）的通知各自需要它们自己的插件或配置，例如 Codex 需在 `~/.codex/config.toml` 的 `[tui]` 下加 `notification_condition = "always"` 后重启；这些是那些工具的机制，不是 Warp 的 hook [@ref-warp-agentnotif-setup]。

## 诊断 {#hooks-diagnostics}

- **通知没有出现**：先确认系统通知权限；Warp 侧的开关在 **Settings > Features > Session**，触发器在 **Settings > Features > Notifications**，桌面通知页另有专门的 troubleshooting 小节 [@ref-warp-notifications-access]。
- **通知进不来**：agent 通知分 Complete / Request / Error 三类，app 内以 toast 与通知信箱呈现（信箱有 All / Unread / Errors 过滤），后台时才走系统级桌面通知 [@ref-warp-agentnotif-inapp]。
- **第三方 agent 通知缺失**：按各自工具的安装步骤核对（Claude Code / OpenCode 装 Warp 通知插件，Codex 改 `[tui]` 配置），Warp 侧不提供 hook 调试命令 [@ref-warp-agentnotif-setup]。

未验证：OSC 序列的完整支持范围（文档只列 9 与 777）、标题/正文长度上限，以及通知被系统静音时的可观察结果，固定来源均未描述 [@ref-warp-notifications-osc]。
