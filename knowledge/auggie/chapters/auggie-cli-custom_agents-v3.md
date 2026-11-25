---
schema_version: 3
record_kind: production
edition_id: auggie-cli-custom_agents-v3
harness_id: auggie
topic: custom_agents
title: "Auggie CLI 的 Subagent 定义、工具限制与调用（1.x 文档线）"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-locations, ref-auggie-repo-plugin-agent, ref-auggie-docs-agents-create, ref-auggie-docs-plugins-components, ref-auggie-1x-agents-create, ref-auggie-1x-interactive-slash]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-frontmatter, ref-auggie-docs-agents-prompt, ref-auggie-docs-agents-tools, ref-auggie-docs-perms-legacy, ref-auggie-docs-agents-models, ref-auggie-docs-agents-examples, ref-auggie-repo-plugin-agent, ref-auggie-1x-agents-frontmatter, ref-auggie-1x-agents-frontmatter-control, ref-auggie-1x-agents-tools, ref-auggie-1x-agents-models, ref-auggie-1x-reference-models]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-about, ref-auggie-docs-agents-locations, ref-auggie-docs-plugins-components, ref-auggie-repo-changelog, ref-auggie-1x-agents-builtin, ref-auggie-1x-guide-personas]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-running, ref-auggie-docs-interactive-additional, ref-auggie-1x-agents-create, ref-auggie-1x-interactive-slash]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-agents-about, ref-auggie-docs-agents-tools, ref-auggie-repo-changelog, ref-auggie-1x-agents-frontmatter, ref-auggie-1x-agents-frontmatter-control, ref-auggie-1x-agents-tools]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-interactive-additional, ref-auggie-docs-agents-create, ref-auggie-docs-agents-best, ref-auggie-docs-agents-locations, ref-auggie-docs-reference-diagnostics, ref-auggie-1x-agents-create, ref-auggie-1x-interactive-slash]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-auggie-1x-agents-create, ref-auggie-docs-agents-locations, ref-auggie-docs-plugins-components]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-auggie-1x-agents-frontmatter, ref-auggie-1x-agents-tools, ref-auggie-docs-agents-prompt]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-auggie-1x-agents-builtin, ref-auggie-1x-guide-personas, ref-auggie-docs-plugins-components]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-auggie-docs-agents-running, ref-auggie-1x-agents-create]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-auggie-1x-agents-frontmatter, ref-auggie-1x-agents-tools, ref-auggie-1x-agents-models]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-auggie-1x-agents-frontmatter, ref-auggie-1x-agents-frontmatter-control, ref-auggie-1x-agents-tools, ref-auggie-docs-agents-about]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-auggie-1x-agents-create, ref-auggie-1x-interactive-slash, ref-auggie-docs-reference-diagnostics]
---

适用性说明：本章的 1.x 结论固定在 2026-11-25 观察到的官方文档 “Subagents” 页与 Interactive 页（页顶标注 1.x 文档线）、CLI 参考页，以及官方仓库提交 `8bd7186ea04e77d11f63e5850482643c8767666b`。文档快照的 `version_applicability` 仍为 `unknown`，不证明任何具体 npm 版本；0.x 结论保留在原 v2 edition 与旧引用中。

## 定义位置与发现 {#agents-entry}

1.x 的固定来源是官方文档站 “Subagents” 页、Interactive 页与 CLI 参考页，以及官方仓库的示例市场。[@ref-auggie-1x-agents-create]

两个配置位置（markdown 文件，YAML frontmatter）：[@ref-auggie-docs-agents-locations]

| 作用域 | 位置 | 可用范围 |
| :-- | :-- | :-- |
| 用户 | home 目录的 `.augment/agents/` | 所有工作区 |
| 工作区 | 工作区根的 `.augment/agents/` | 仅当前工作区 |

1.x 明确：工作区 agent 覆盖同名用户 agent。[@ref-auggie-docs-agents-locations]

创建方式有两种：交互模式运行 `/agents` 走向导，或直接手写配置文件。1.x 向导的变化是：选择保存位置（项目 `.augment/agents/` 或用户 `~/.augment/agents/`）后，再选 **Generate with Auggie**（描述任务并给名字，由 Auggie 生成配置）或 **Manual configuration**（自己填 name、description、tools、model、thinking level、prompt）。`/agents` 还会列出正在运行的 agent 与可用 agent 类型。[@ref-auggie-1x-agents-create][@ref-auggie-1x-interactive-slash]

插件是第三个来源：插件包的 `agents/` 目录内的 agent 文件随插件启用而生效，文件格式与本地 agent 相同。[@ref-auggie-docs-plugins-components][@ref-auggie-repo-plugin-agent]

## 定义格式与字段 {#agents-format}

配置文件是 markdown：YAML frontmatter 描述元数据，正文就是 agent 的 prompt。[@ref-auggie-docs-agents-prompt]

1.x 的 frontmatter 字段（全部可选）：[@ref-auggie-1x-agents-frontmatter]

| 字段 | 用途 |
| :-- | :-- |
| `name` | agent 名称；不写时取文件名去掉 `.md` |
| `description` | 说明，用于判断何时委派 |
| `color` | 标签颜色：`red`、`blue`、`green`、`yellow`、`orange`、`purple`、`pink`、`cyan` |
| `model` | 该 agent 使用的模型；不写则用当前模型 |
| `thinking` | 该 agent 模型的 reasoning effort |
| `tools` | 允许使用的**内置**工具名单（allowlist） |
| `disabled_tools` | 禁止使用的工具名单（denylist） |
| `max_turns` | agent 停止前的最大回合数 |
| `replace_system_prompt` | `true` 时正文 prompt 作为完整 system prompt，而不是追加；默认 `false` |
| `skills` | 为该 agent 加载的 Skill 名单；默认全部 |
| `disable_skills` | `true` 时不加载任何 Skill |
| `disable_rules` | `true` 时跳过 rules |
| `isolation` | `worktree` 时在独立 git worktree 中运行 |
| `run_in_background` | `true` 时默认后台运行 |
| `enabled` | `false` 时关闭该 agent 但不删除文件 |

`max_turns`、`replace_system_prompt`、`skills`、`disable_skills`、`disable_rules`、`isolation`、`run_in_background`、`enabled` 等控制字段见同一张表。[@ref-auggie-1x-agents-frontmatter-control]

工具限制的解析规则（1.x）：[@ref-auggie-1x-agents-tools]

- `tools` 是 allowlist，只接受内置工具：`read`、`bash`、`edit`、`write`、`grep`、`find`、`ls`、`web-fetch`。设置 `tools` 会同时移除其它工具，包括 `codebase-retrieval`、`web-search`、集成工具与 MCP 工具。
- `disabled_tools` 是 denylist，可作用于任何工具（含 MCP 与集成工具）。
- 两者同时出现时，工具必须同时在 `tools` 里且不在 `disabled_tools` 里（交集），不是“denylist 优先”。
- 两者都不写，agent 拥有主 agent 的全部工具；要保留 `codebase-retrieval` 等非内置工具，应使用 `disabled_tools`。

文档示例（1.x 工具名）：[@ref-auggie-docs-agents-examples][@ref-auggie-1x-agents-tools]

```markdown
---
name: safe-reader
description: A safe file reader that cannot modify or execute
disabled_tools:
  - edit
  - write
  - bash
---

You are a read-only review agent. ...
```

`model` 可写任何 Auggie 支持的模型，用 `auggie model list` 查看标识符；可以写模型名或名字的一部分（如 `sonnet`、`opus`），Auggie 选最接近的模型。模型可用性受订阅与组织设置影响。[@ref-auggie-1x-agents-models][@ref-auggie-1x-reference-models]

**版本线**：0.x 文档把 `name` 标为必填、`color` 取“合法 ANSI 颜色名”、`model` 用 `sonnet4.5` 这类标识符，并要求 `tools`／`disabled_tools` 不能同用（同用时 denylist 优先）；1.x 改为全部可选、颜色枚举、部分名匹配与交集语义，并新增 `thinking`、`max_turns`、`replace_system_prompt`、`skills`、`disable_skills`、`disable_rules`、`isolation`、`run_in_background`、`enabled`。旧 v2 edition 保留 0.x 说法。[@ref-auggie-docs-agents-frontmatter][@ref-auggie-docs-agents-tools][@ref-auggie-1x-agents-frontmatter]

**旧工具名**：0.x 的 `view`、`str-replace-editor`、`save-file`、`remove-files`、`launch-process` 在 1.x 的规范名是 `read`、`edit`、`write`、`bash`（`remove-files` 未在 1.x 内置清单中出现）；权限页对旧名的兼容子集与本页不同。[@ref-auggie-docs-perms-legacy][@ref-auggie-1x-agents-tools]

## 角色与来源 {#agents-roles}

1.x 明确 Auggie 自带三个内置 agent：`general-purpose`、`explore`、`plan`；同名自定义 agent 覆盖内置 agent。[@ref-auggie-1x-agents-builtin]

- subagent 有独立于主 agent 的上下文窗口，使用自己的 prompt，与其他 subagent 并行运行，并在主线程中显示进度摘要。[@ref-auggie-docs-agents-about]
- 来源分三类：本地 subagent（用户级或工作区级）、随仓库共享的 subagent（项目 `.augment/agents/`）、以及插件提供的 subagent（插件 `agents/` 目录）。三者用同一套定义机制。[@ref-auggie-docs-agents-locations][@ref-auggie-docs-plugins-components]
- **Personas 退场**：0.x 的 `/persona` 与 `auggie persona` 在 1.x 被自定义 agent／rules／`/permissions` 取代。旧 v2 edition 与旧引用保留 0.x 的 persona 机制，本章不把它当作 1.x 能力。[@ref-auggie-1x-guide-personas]
- CHANGELOG 还记录 `PreToolUse`／`PostToolUse` hook 现在也在 sub-agent 会话中运行，说明 hook 机制延伸到 subagent。[@ref-auggie-repo-changelog]

## 调用 {#agents-invocation}

显式调用：在消息里引用 agent 名，例如向主 agent 说 “Use the code-review agent to review my staged changes”。[@ref-auggie-docs-agents-running]

自动委派：文档说明 “Augment 也会自动判断某个任务何时适合某个 subagent，并主动提议使用它”——由主 agent 提议，而不是静默委派。[@ref-auggie-docs-agents-running]

浏览入口：`/agents` 用于浏览与创建 agent，并列出正在运行的 agent 与可用 agent 类型；向导支持 Generate with Auggie 或手动配置。[@ref-auggie-1x-agents-create]

**缺口（partial）**：自动委派的判定条件、候选 agent 的选择顺序、以及用户能否拒绝某次委派，固定来源都没有给出规则。[@ref-auggie-docs-agents-running]

## 边界与限制 {#agents-limits}

1.x 文档明示的边界：每个 subagent 有自己的上下文窗口；subagent 之间并行；进度摘要回显在主线程；`max_turns` 限制回合数；`isolation: worktree` 让 agent 在独立 git worktree 中运行；`run_in_background` 控制默认后台运行；`skills`／`disable_skills`／`disable_rules` 控制继承的 Skill 与 rules；`replace_system_prompt` 控制正文是否替换 system prompt。[@ref-auggie-1x-agents-frontmatter][@ref-auggie-1x-agents-frontmatter-control][@ref-auggie-docs-agents-about]

工具边界由 `tools`／`disabled_tools` 控制，文档列出三类用途：安全（阻止 agent 改文件或执行命令）、聚焦（只给任务需要的工具）、防破坏（阻止破坏性操作）。[@ref-auggie-1x-agents-tools]

**缺口（partial）**：并发上限、递归与嵌套深度、运行时长、单 subagent 上下文上限、以及 subagent 与父级权限的继承细节，固定来源没有说明。CHANGELOG 的 “PreToolUse 与 PostToolUse hooks 现在也在 sub-agent 会话中运行” 说明 hook 会延伸，但继承范围未展开。[@ref-auggie-docs-agents-about][@ref-auggie-repo-changelog]

## 诊断 {#agents-diagnostics}

- 发现与浏览：`/agents` 浏览可用 agent、正在运行的 agent 与可用 agent 类型；创建向导支持自动生成或手动配置。[@ref-auggie-1x-agents-create][@ref-auggie-1x-interactive-slash]
- 手动创建后的确认：文档建议把 agent 放到项目 `.augment/agents/` 以便共享，但没有给出“列出已发现 agent 文件”的独立命令或加载错误详情。[@ref-auggie-docs-agents-best][@ref-auggie-docs-agents-locations]
- **缺口（partial）**：权限或委派失败的专用定位入口没有文档化。可用的通用诊断手段是 `/status` 与 `--log-level debug` 日志，但文档没有把这两项与 subagent 关联。[@ref-auggie-docs-reference-diagnostics]
