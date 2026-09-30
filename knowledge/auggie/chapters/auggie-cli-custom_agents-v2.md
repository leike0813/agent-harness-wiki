---
schema_version: 3
record_kind: production
edition_id: auggie-cli-custom_agents-v2
harness_id: auggie
topic: custom_agents
title: "Auggie CLI 的 Subagent 定义、工具限制与调用"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-locations, ref-auggie-repo-plugin-agent, ref-auggie-docs-agents-create, ref-auggie-docs-plugins-components]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-frontmatter, ref-auggie-docs-agents-prompt, ref-auggie-docs-agents-tools, ref-auggie-docs-perms-legacy, ref-auggie-docs-agents-models, ref-auggie-docs-agents-examples, ref-auggie-repo-plugin-agent]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-about, ref-auggie-docs-agents-locations, ref-auggie-docs-plugins-components, ref-auggie-repo-changelog]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-running, ref-auggie-docs-interactive-additional]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-about, ref-auggie-docs-agents-tools, ref-auggie-repo-changelog]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-interactive-additional, ref-auggie-docs-agents-create, ref-auggie-docs-agents-best, ref-auggie-docs-agents-locations, ref-auggie-docs-reference-diagnostics]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-auggie-docs-agents-locations, ref-auggie-docs-agents-create, ref-auggie-docs-plugins-components]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-auggie-docs-agents-frontmatter, ref-auggie-docs-agents-tools, ref-auggie-docs-agents-prompt, ref-auggie-docs-agents-models]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: partial
        source_refs: [ref-auggie-docs-agents-about, ref-auggie-docs-plugins-components, ref-auggie-repo-changelog]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-auggie-docs-agents-running, ref-auggie-docs-interactive-additional]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-auggie-docs-agents-frontmatter, ref-auggie-docs-agents-tools, ref-auggie-docs-agents-models, ref-auggie-docs-perms-legacy]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-auggie-docs-agents-about, ref-auggie-docs-agents-tools, ref-auggie-repo-changelog]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-auggie-docs-interactive-additional, ref-auggie-docs-agents-create, ref-auggie-docs-reference-diagnostics]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 定义位置与发现 {#agents-entry}

固定来源是官方仓库提交 `9cc3ead419db9486ad44e6e4bba30ecd6784ccff` 与官方文档站的 CLI 页面；“Subagents” 页给出全部本主题机制，仓库的市场示例给出一个真实的 agent 文件。[@ref-auggie-docs-agents-locations][@ref-auggie-repo-plugin-agent]

两个配置位置（markdown 文件，YAML frontmatter）：[@ref-auggie-docs-agents-locations]

| 作用域 | 位置 | 可用范围 |
| :-- | :-- | :-- |
| 用户 | home 目录的 `.augment/agents/` | 所有工作区 |
| 工作区 | 工作区根的 `.augment/agents/` | 仅当前工作区 |

创建方式有两种：交互模式下运行 `/agents` 走向导（选择 “Create new agent”，再选保存位置，填写 Name、Description、Color、Model、Prompt 后保存），或直接手写配置文件。[@ref-auggie-docs-agents-create]

插件是第三个来源：插件包的 `agents/` 目录内的 agent 文件随插件启用而生效，文件格式与本地 agent 相同。仓库自带市场里的 `plugin_marketplace/code-review/agents/local-analyzer.md` 就是一个官方示例，其 frontmatter 为 `name: code-review-local-analyzer`、`description`、`model: "code-review"`、`color: yellow`。[@ref-auggie-docs-plugins-components][@ref-auggie-repo-plugin-agent]

## 定义格式与字段 {#agents-format}

配置文件是 markdown：YAML frontmatter 描述元数据，正文就是 agent 的 prompt。[@ref-auggie-docs-agents-frontmatter][@ref-auggie-docs-agents-prompt]

| 字段 | 必填 | 用途 |
| :-- | :-- | :-- |
| `name` | 是 | agent 名称 |
| `description` | 否 | agent 说明 |
| `color` | 否 | CLI 中显示的颜色，取合法 ANSI 颜色名 |
| `model` | 否 | 该 agent 使用的模型；不写则用 CLI 默认模型 |
| `tools` | 否 | 允许使用的工具名单（allowlist），不能与 `disabled_tools` 同用 |
| `disabled_tools` | 否 | 禁止使用的工具名单（denylist），不能与 `tools` 同用 |

工具限制的解析规则：`tools` 与 `disabled_tools` 同时出现时 **`disabled_tools` 优先，`tools` 被忽略**；两者都不写则 agent 拥有全部工具。两种写法都支持 YAML 列表与逗号分隔字符串。[@ref-auggie-docs-agents-tools]

文档给出的字段与工具名示例：[@ref-auggie-docs-agents-frontmatter][@ref-auggie-docs-agents-tools]

```markdown
---
name: safe-reader
description: A safe file reader that cannot modify or execute
disabled_tools:
  - str-replace-editor
  - save-file
  - remove-files
  - launch-process
---

You are a read-only review agent. ...
```

文档列的常用工具名是 `view`、`codebase-retrieval`、`str-replace-editor`、`save-file`、`remove-files`、`launch-process`、`github-api`、`web-fetch`、`web-search`；这些是旧名，权限页面同时给出新名别名（`launch-process`→`terminal`、`view`→`read`、`str-replace-editor`→`edit`、`save-file`→`write`）。[@ref-auggie-docs-agents-tools][@ref-auggie-docs-perms-legacy]

正文 prompt 按 markdown 渲染，支持代码块与列表，用来定义角色、能力与预期行为。[@ref-auggie-docs-agents-prompt]

`model` 可写任何 Auggie 支持的模型，用 `auggie models list` 查看标识符；模型可用性受订阅与组织设置影响，不写时使用 CLI 默认模型。[@ref-auggie-docs-agents-models]

文档给出的完整示例（代码评审 agent）：[@ref-auggie-docs-agents-examples]

```markdown
---
name: code-review
description: Code review agent
model: sonnet4.5
color: purple
---

You are an agentic code-review AI assistant ... You are conducting a comprehensive
code review for the staged changes in the current working directory.
```

只读评审 agent 的写法是在 frontmatter 用 `disabled_tools` 去掉写类工具（文档示例去掉 `str-replace-editor`、`save-file`、`remove-files`、`launch-process`）。需要注意仓库官方插件里的 agent 采用了另一种写法：`plugin_marketplace/code-review/agents/local-analyzer.md` 的 frontmatter 只写 `name`／`description`／`model`／`color`，把工具约束写在正文 prompt 里（正文写 “Allowed tools: launch-process, view / Disallowed tools: github-api”），正文约束是提示词层面的要求，而 frontmatter 的 `tools`／`disabled_tools` 才是宿主执行的限制。[@ref-auggie-docs-agents-examples][@ref-auggie-docs-agents-tools][@ref-auggie-repo-plugin-agent]

## 角色与来源 {#agents-roles}

文档把自定义 agent 定义为“为特定任务配置的 subagent”：

- subagent 有独立于主 agent 的上下文窗口，使用自己的 prompt，与其他 subagent 并行运行，并在主线程中显示当前进度摘要。[@ref-auggie-docs-agents-about]
- 来源分三类：本地 subagent（用户级或工作区级）、随仓库共享给团队的 subagent（把配置放进项目的 `.augment/agents/`）、以及插件提供的 subagent（插件 `agents/` 目录）。三者用同一套定义机制。[@ref-auggie-docs-agents-locations][@ref-auggie-docs-plugins-components]
- CHANGELOG 还记录了宿主自带的 “explore sub-agents”（探索类子代理的 allowlist 修正），说明除用户自定义之外还有原生提供的 subagent；这些内置 agent 的定义入口与列表在固定来源中没有文档化。[@ref-auggie-repo-changelog]

## 调用 {#agents-invocation}

显式调用：在消息里引用 agent 名，例如向主 agent 说 “Use the code-review agent to review my staged changes”。[@ref-auggie-docs-agents-running]

自动委派：文档说明 “Augment 也会自动判断某个任务何时适合某个 subagent，并主动提议使用它”——即由主 agent 提议，而不是静默委派。[@ref-auggie-docs-agents-running]

浏览入口：交互模式附加命令 `/agents` 用于浏览可用 sub-agents。[@ref-auggie-docs-interactive-additional]

**缺口（partial）**：自动委派的判定条件、候选 subagent 的选择顺序、以及用户能否拒绝某次委派，固定来源都没有给出规则。[@ref-auggie-docs-agents-running]

## 边界与限制 {#agents-limits}

文档明示的行为边界只有三条：每个 subagent 有自己的上下文窗口；subagent 之间并行运行；进度摘要回显在主线程。[@ref-auggie-docs-agents-about]

工具边界由 `tools`／`disabled_tools` 控制，文档列出三类用途：安全（阻止 subagent 改文件或执行命令）、聚焦（只给任务需要的工具）、防破坏（阻止破坏性操作）。[@ref-auggie-docs-agents-tools]

**缺口（partial）**：并发上限、递归与嵌套深度、运行时长、单 subagent 上下文上限、以及 subagent 是否继承父级的权限与 hooks，固定来源没有说明。可参考的一条相关记录是 CHANGELOG 中的 “PreToolUse 与 PostToolUse hooks 现在也在 sub-agent 会话中运行”，说明 hook 机制会延伸到 subagent，但继承范围未展开。[@ref-auggie-docs-agents-about][@ref-auggie-repo-changelog]

## 诊断 {#agents-diagnostics}

- 发现与浏览：交互模式 `/agents` 可浏览可用 sub-agents；创建向导最后一步是审阅配置并按回车保存。[@ref-auggie-docs-interactive-additional][@ref-auggie-docs-agents-create]
- 手动创建后的确认：文档建议把 subagent 放到项目 `.augment/agents/` 以便共享，但未给出“列出已发现 agent”的独立命令或 `/agents` 弹窗的字段清单。[@ref-auggie-docs-agents-best][@ref-auggie-docs-agents-locations]
- **缺口（partial）**：权限或委派失败的定位入口没有文档化。可用的通用诊断手段是 `/status`（系统状态，含 MCP servers 与 rules）与 `--log-level debug` 日志，但文档没有把这两项与 subagent 关联。[@ref-auggie-docs-interactive-additional][@ref-auggie-docs-reference-diagnostics]
