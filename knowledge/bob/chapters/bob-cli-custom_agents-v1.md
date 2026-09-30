---
schema_version: 3
record_kind: production
edition_id: bob-cli-custom_agents-v1
harness_id: bob
topic: custom_agents
title: "Bob Shell 的自定义 Agent：模式、工具权限与 subagent"
sections:
  - section_id: agents-modes-model
    surface_ids: [cli]
    source_refs: [ref-bob-modes-props, ref-bob-modes-global-yaml]
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-bob-modes-global-yaml, ref-bob-modes-project-yaml, ref-bob-modes-cli, ref-bob-modes-switch, ref-bob-subagents-when]
  - section_id: agents-tools-permissions
    surface_ids: [cli]
    source_refs: [ref-bob-modes-toolgroups, ref-bob-modes-toolcfg, ref-bob-modes-precedence]
  - section_id: agents-builtin
    surface_ids: [cli]
    source_refs: [ref-bob-modes-builtin, ref-bob-modes-subagent-restrict, ref-bob-subagents-types]
  - section_id: agents-subagents
    surface_ids: [cli]
    source_refs: [ref-bob-subagents-how, ref-bob-subagents-context, ref-bob-subagents-types, ref-bob-subagents-vs, ref-bob-modes-subagent-restrict, ref-bob-run-options]
  - section_id: agents-instructions-diagnostics
    surface_ids: [cli]
    source_refs: [ref-bob-modes-instructions, ref-bob-rules-dir, ref-bob-slash-builtin, ref-bob-ts-instructions]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-bob-modes-global-yaml, ref-bob-modes-project-yaml]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-modes-model
        status: answered
        source_refs: [ref-bob-modes-props]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-builtin
        status: answered
        source_refs: [ref-bob-modes-builtin, ref-bob-subagents-types]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-bob-modes-cli, ref-bob-modes-switch, ref-bob-subagents-when]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-tools-permissions
        status: answered
        source_refs: [ref-bob-modes-toolgroups, ref-bob-modes-toolcfg, ref-bob-modes-precedence]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-subagents
        status: partial
        source_refs: [ref-bob-subagents-context, ref-bob-modes-subagent-restrict, ref-bob-run-options]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-instructions-diagnostics
        status: partial
        source_refs: [ref-bob-ts-instructions, ref-bob-slash-builtin]
---

## 自定义模式的字段与结构 {#agents-modes-model}

Bob Shell 的“自定义 Agent”即 custom modes。文档说明它与 Bob IDE 的模式共用同一套核心结构，字段如下。[@ref-bob-modes-props]

| 属性 | 说明 | Shell 侧注意事项 |
| :-- | :-- | :-- |
| `slug` | 唯一内部标识 | 用于命令行，例如 `bob --chat-mode=my-mode` |
| `name` | 界面显示名 | 交互模式的模式选择器中显示 |
| `description` | 模式选择器里的简短描述 | 简述模式用途 |
| `roleDefinition` | 核心身份与专长 | 应体现 shell 上下文与命令行工作流 |
| `groups` | 允许的工具组与文件访问 | 命令行执行权限在 shell 中尤其关键 |
| `whenToUse` | 模式选择指引 | 帮助 Bob Shell 选中合适模式 |
| `customInstructions` | 该模式的行为准则或规则 | 可引用 Bob Shell 的开发惯例 |

配置文件格式与 Bob IDE 相同，YAML 优先，同时支持 JSON。[@ref-bob-modes-global-yaml]

## 定义入口与调用 {#agents-entry}

两级文件位置：

- 全局：`~/.bob/custom_modes.yaml`，对所有项目可用。[@ref-bob-modes-global-yaml]
- 项目：项目根的 `.bob/custom_modes.yaml`，只对当前项目可用。[@ref-bob-modes-project-yaml]

全局文件的完整最小示例（逐字来自 Custom modes 页 “Global modes”）：[@ref-bob-modes-global-yaml]

```yaml
customModes:
  - slug: shell-debug
    name: Shell Debugger
    roleDefinition: >-
      You are a debugging specialist focused on command-line troubleshooting.
    whenToUse: Use for debugging shell scripts, command failures, and environment issues.
    customInstructions: |-
      When debugging:
      - Always check environment variables first
      - Examine command exit codes
    groups:
      - read
      - command
      - browser
```

显式调用有三种：命令行传入 `bob --chat-mode=shell-debug`（可与 `--sandbox` 组合）；交互会话里用 `/mode` 后跟模式 slug，或直接键入斜杠加模式 slug 切换；也可以用 `--mode` 在 `bob chat` / `bob run` 时指定起始模式。[@ref-bob-modes-cli] Bob 自己也会在任务推进时切换模式（例如计划完成后从 Plan 转入 Agent），这部分不需要用户干预。[@ref-bob-modes-switch]

自动委派方面，主代理只在任务确实自包含、只回传摘要、且用一两次直接工具调用无法完成时才会派生 subagent；默认永远是直接完成工作。[@ref-bob-subagents-when]

## 工具组、权限与优先级 {#agents-tools-permissions}

自定义模式的 `groups` 决定它能用哪些工具组，文档列出的四组是：`read`（读写目录与文件读取）、`edit`（修改文件，可用 `fileRegex` 限定）、`browser`（浏览器自动化）、`command`（执行终端命令）、`mcp`（访问 MCP server）。[@ref-bob-modes-toolgroups] 省略 `command` 即得到只读模式；这是文档给出的 “Restricting command access” 做法。[@ref-bob-modes-toolcfg]

命令级白名单写在 settings 的 `tools.allowed` 里，值为带参数的调用串（逐字来自 Custom modes 页 “Allowing specific commands”）：[@ref-bob-modes-toolcfg]

```json
{
  "tools": {
    "allowed": [
      "run_shell_command(git status)",
      "run_shell_command(git log)",
      "run_shell_command(git diff)"
    ]
  }
}
```

配置优先级为：命令行参数（`--chat-mode=mode-slug`）> 项目级 `.bob/custom_modes.yaml` > 用户级 `~/.bob/custom_modes.yaml` > 系统级（平台相关位置）。[@ref-bob-modes-precedence] 文档未说明系统级目录在各平台的具体路径。

## 内置模式与 subagent 限制 {#agents-builtin}

默认提供三个内置模式，各自声明了可用工具与允许派生的 subagent 类型。[@ref-bob-modes-builtin]

| 模式 | 用途 | 可用工具 | 允许的 subagent |
| :-- | :-- | :-- | :-- |
| Agent | 写、改、重构代码 | Read, Edit, Execute, MCP, Skill, Todo, Subtask, Subagent, Mode | 全部 |
| Plan | 规划与设计 | Read, Edit, MCP, Skill, Subagent, Mode | Explore |
| Ask | 提问与解释 | Read, MCP, Skill, Subagent, Mode | Explore |

模式会限制可派生的 subagent 类型；若当前模式不允许，Bob 会改为直接完成工作。[@ref-bob-modes-subagent-restrict] 内置模式与派生出来的 subagent 是两套角色：模式决定能力面，subagent 类型（`explore`/`general`）才是被派生的执行体。[@ref-bob-subagents-types] 文档还说明 1.0.x 的 Code 与 Advanced 模式在 2.0.0 合并为单一 Agent 模式，因此旧模式名不属于当前发行版。[@ref-bob-modes-builtin]

## 原生 subagent 的运行方式 {#agents-subagents}

subagent 是 Bob 派生出的独立 agent，拥有自己的上下文窗口，执行完只回传摘要。派生流程为：创建独立 agent、传入聚焦的任务描述、请求用户批准、执行任务、回传摘要，主对话继续。[@ref-bob-subagents-how] 默认不继承父对话历史，需要携带先前决策时由 Bob 设置 `fork_context: true`。[@ref-bob-subagents-context]

文档只定义两种类型：`explore`（只读探索，跑在更轻的模型上）与 `general`（完整工具权限，跑在默认模型上）。[@ref-bob-subagents-types] subagent 与 subtask 的区别也被写清：subagent 静默后台运行、只回摘要；subtask 在界面中有自己的面包屑与对话线程、可交互。[@ref-bob-subagents-vs] 是否允许派生由当前模式决定，模式不允许时 Bob 直接自己完成。[@ref-bob-modes-subagent-restrict]

并发数、递归/嵌套深度与最长运行时间在官方文档中没有给出数值；只确认 `bob run` 有 `--max-turns` 限制 agentic 轮数、`--max-cost` 限制花费，`--disable-subagents` 可在单次运行中关闭 subagent。[@ref-bob-run-options]

## 模式专属指令与诊断 {#agents-instructions-diagnostics}

模式可以带自己的指令文件：目录式放在 `.bob/rules-{mode-slug}/`，例如 `.bob/rules-shell-debug/01-environment-checks.md`；退化为单文件时用工作区根下的 `.bobrules-{mode-slug}`。[@ref-bob-modes-instructions] 这些目录与 `.bob/rules/` 一样按目录读取规则加载。[@ref-bob-rules-dir]

诊断方面：`/mode` 打开模式选择器，`/settings` 查看与编辑设置；模式定义改动是否即时生效，文档没有说明。[@ref-bob-slash-builtin] 若模式专属指令没生效，Troubleshooting 页给出的检查点是路径（`.bob/rules/` 与 `.bob/rules-{modeSlug}/`）与文件扩展名（`.md`、`.txt`、`.xml`），并用 `/memory refresh` 重新加载上下文、`/memory show` 查看当前上下文。[@ref-bob-ts-instructions] 文档没有提供“模式是否被识别”的专用诊断命令，权限或委派失败也没有专门定位入口。
