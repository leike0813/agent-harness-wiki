---
schema_version: 3
record_kind: production
edition_id: sourcecraft-code-assistant-vscode-custom_agents-v2
harness_id: sourcecraft-code-assistant
topic: custom_agents
title: "SourceCraft Code Assistant（VS Code）的 Modes 与 Agent 角色机制"
sections:
  - section_id: agents-modes
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-concepts-agents, ref-sc-ca-modes-builtin, ref-sc-ca-modes-intro, ref-sc-ca-modes-orchestrator]
  - section_id: agents-entry
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-modes-configure, ref-sc-ca-roo]
  - section_id: agents-invocation
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-aa-subtasks, ref-sc-ca-modes-orchestrator, ref-sc-ca-modes-switch, ref-sc-ca-slash-hints, ref-sc-ca-tools-ref]
  - section_id: agents-overrides
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-modes-builtin, ref-sc-ca-modes-configure, ref-sc-ca-modes-intro, ref-sc-ca-profiles-modes, ref-sc-ca-rules-mode, ref-sc-ca-skills-modes]
  - section_id: agents-limits
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-aa-requests, ref-sc-ca-checkpoints-parallel, ref-sc-ca-concurrent-reads]
  - section_id: agents-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-chatui-components, ref-sc-ca-logs, ref-sc-ca-modes-configure, ref-sc-ca-modes-intro]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [vscode]
        section_id: agents-entry
        status: answered
        source_refs: [ref-sc-ca-modes-configure]
  - question_id: agents.format
    answers:
      - surface_ids: [vscode]
        section_id: agents-entry
        status: partial
        source_refs: [ref-sc-ca-modes-configure, ref-sc-ca-roo]
  - question_id: agents.roles
    answers:
      - surface_ids: [vscode]
        section_id: agents-modes
        status: answered
        source_refs: [ref-sc-ca-modes-builtin, ref-sc-ca-modes-orchestrator, ref-sc-ca-concepts-agents]
  - question_id: agents.invocation
    answers:
      - surface_ids: [vscode]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-sc-ca-modes-switch, ref-sc-ca-modes-orchestrator, ref-sc-ca-aa-subtasks, ref-sc-ca-slash-hints]
  - question_id: agents.overrides
    answers:
      - surface_ids: [vscode]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-sc-ca-modes-configure, ref-sc-ca-profiles-modes, ref-sc-ca-rules-mode, ref-sc-ca-skills-modes]
  - question_id: agents.limits
    answers:
      - surface_ids: [vscode]
        section_id: agents-limits
        status: partial
        source_refs: [ref-sc-ca-concurrent-reads, ref-sc-ca-aa-requests]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-sc-ca-modes-intro, ref-sc-ca-modes-configure, ref-sc-ca-logs]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## Modes：SourceCraft 的 Agent 角色机制 {#agents-modes}

在 VS Code 插件这一界面上，官方没有单独的"自定义 Agent 定义文件"；承担角色划分的是 **Modes（模式）**。官方定义："Modes in Code Assistant are specialized *personas* that tailor the assistant's behavior to your current task"，每个模式有各自的能力、专长与访问级别。[@ref-sc-ca-modes-intro]

概念页把 VS Code 侧称为 **agent mode**（可细调 tools、连接 LLM、MCP server、选择 operating modes），把 JetBrains 侧称为 chat mode 与基于 SourceCraft CLI 的 agent mode（Preview）——即角色机制是跨界面平行而非同一实现。[@ref-sc-ca-concepts-agents]

五个内置模式（官方参数表汇总）：[@ref-sc-ca-modes-builtin]

| 模式 | 可用工具组 | 定位 |
| :-- | :-- | :-- |
| `Code`（默认） | `read`、`edit`、`browser`、`command`、`mcp` 全量 | 写代码、实现功能、调试 |
| `Ask` | 仅 `read`、`browser`、`mcp`（不能编辑文件或执行命令） | 解释代码、概念答疑，倾向用图表 |
| `Architect` | `read`、`browser`、`mcp`，`edit` 仅限 Markdown 文件 | 系统设计与高层规划 |
| `Debug` | 全量 | 系统化排错与诊断 |
| `Orchestrator`（boomerang） | 无直接工具访问，靠 `new_task` 委派 | 拆解复杂任务并分派给其它模式 |

Orchestrator 通过 `new_task` 把子任务派发给其它模式，官方称其为"策略型工作流编排者"。[@ref-sc-ca-modes-orchestrator]

## 自定义入口与可配置字段 {#agents-entry}

自定义入口：在聊天顶部栏点击省略号按钮并选择 **Modes**；官方原文为"修改既有模式或创建新模式，定义工具访问、文件权限与行为指令，以强制团队标准或构建面向特定目标的助手"。[@ref-sc-ca-modes-configure]

模式可配置的维度（官方在 "Configuring modes" 中给出的即工具组语义）：[@ref-sc-ca-modes-configure]

- `read`：读取与搜索文件、列出文件；
- `edit`：修改与创建文件；
- `browser`：网页浏览与搜索；
- `command`：在终端执行命令；
- `mcp`：与 MCP server 交互。

**缺口（格式未证实）**：固定来源只描述通过 UI 修改/新建模式与选择工具组，**没有给出模式定义文件的路径、文件格式或字段清单**。官方 "Modified Roo Code files" 页面列出插件包含的 Roo Code 修改文件，其中存在 `packages/Roo-Code/src/core/config/CustomModesManager.ts`、`packages/Roo-Code/src/shared/modes.ts`、`webview-ui/src/components/modes/ModesView.tsx`，可作为"模式由一个管理器与共享模式表实现"的间接证据；但文件名不等同于用户可见的配置契约，此处不据此推断模式文件的语法。[@ref-sc-ca-roo]

## 调用与委派 {#agents-invocation}

**显式切换模式**（官方四种方式）：[@ref-sc-ca-modes-switch]

1. 聊天输入框下方的下拉选择器；
2. 在输入框开头输入 `/architect`、`/ask`、`/debug`、`/code`、`/orchestrator`（切换后清空输入框）；
3. 键盘快捷键循环切换（macOS `Cmd` + `.`，Windows/Linux `Ctrl` + `.`）；
4. 点击 Code Assistant 主动给出的模式切换建议。

Slash 命令的 `argument-hint` 会把等待参数显示在命令菜单里，官方举的例子是 `/mode` 后接模式名（如 `code`、`debug`）以及带多个参数的自定义命令。[@ref-sc-ca-slash-hints]

**自动委派**：Orchestrator 模式本身没有工具访问权，它用 `new_task` 工具"以指定起始模式创建子任务"，从而把工作分派给其它模式。[@ref-sc-ca-modes-orchestrator] 工具参考里 `new_task` 的说明同为"用指定起始模式创建子任务"，`switch_mode` 则用于切换操作模式。[@ref-sc-ca-tools-ref]

**子任务批准**：**Subtasks** 权限（风险等级 Low）开启后，Code Assistant 自动创建与完成子任务而不弹批准。[@ref-sc-ca-aa-subtasks]

## 覆盖与继承 {#agents-overrides}

- **工具权限继承/覆盖**：每个模式自带一组工具组访问权限（见上表）；自定义模式时通过勾选工具组改变其能力集合。[@ref-sc-ca-modes-configure][@ref-sc-ca-modes-builtin]
- **模型覆盖**：模式记住上次使用的模型；可以给不同模式配不同模型（官方示例：`Architect` 用 Gemini 2.5 Preview、`Code` 用 Claude Sonnet 3.7），切换模式时自动切换模型；模式与配置档案（profile）可显式绑定，系统也会自动记住每个模式上次用的 profile。[@ref-sc-ca-modes-intro][@ref-sc-ca-profiles-modes]
- **指令覆盖**：模式专用规则目录 `.codeassistant/rules-{modeSlug}/`（或 `.codeassistantrules-{modeSlug}`）只对该模式生效，且模式专用规则排在通用规则之前。[@ref-sc-ca-rules-mode]
- **技能覆盖**：`skills-{modeSlug}` 目录（如 `skills-code`）中的 Skill 只在该模式可用，且模式专用 Skill 在覆盖优先级中高于同级通用 Skill。[@ref-sc-ca-skills-modes]

**缺口**：官方没有说明自定义模式之间的继承关系、默认模式的删除保护之外的覆盖规则，也没有给出"模式级沙箱/工作区信任"字段。

## 边界与并发限制 {#agents-limits}

- **并发文件读取**：`read_file` 可在一次请求中接受多个文件，上限 `100` 个，可调范围 `1`–`100`，设为 `1` 即关闭并发读取；启用时会出现批量批准界面列出所有待读文件。[@ref-sc-ca-concurrent-reads]
- **自动请求上限**：Auto-approve 的 **Max Requests** 限制自动执行的 API 请求数，默认不设限；超出后 Code Assistant 停止并弹出可重置计数的对话框。[@ref-sc-ca-aa-requests]
- **检查点并发**：checkpoint 由专用扩展保证在一次流式操作内不重复创建，官方明确"Git 操作没有专门队列"。[@ref-sc-ca-checkpoints-parallel]

**缺口**：固定来源没有给出子任务递归/嵌套深度上限、单个 Agent 任务的持续时间或上下文窗口边界，也没有并发子任务数量限制的说明；这些保持未验证。

## 诊断 {#agents-diagnostics}

- **确认当前模式**：输入框下方的模式选择器显示当前模式；模式选择会跨会话保留，返回时沿用上次的模式。[@ref-sc-ca-modes-intro]
- **配置入口自检**：Modes 面板中可查看与修改每个模式的工具组与指令。[@ref-sc-ca-modes-configure]
- **状态反馈**：聊天界面用加载指示器、红色错误消息与绿色成功消息区分请求状态。[@ref-sc-ca-chatui-components]
- **日志**：插件菜单的 **Export Logs** 导出 `logs.zip`。[@ref-sc-ca-logs]

**缺口**：没有专门的"模式未加载/权限被拒"诊断命令或状态行；委派失败（`new_task` 被拒）只能从聊天中的批准/拒绝消息判断。
