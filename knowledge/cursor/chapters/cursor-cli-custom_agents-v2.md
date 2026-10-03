---
schema_version: 3
record_kind: production
edition_id: cursor-cli-custom_agents-v2
harness_id: cursor
topic: custom_agents
title: Cursor 自定义 Agent：入口、格式、角色、调用、模型与权限覆盖、边界与诊断
sections:
  - section_id: agents-entry
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_agents-subagents-scope
      - ref-cur-custom_agents-subagents-creating
      - ref-cur-custom_agents-subagents-loc-project
      - ref-cur-custom_agents-subagents-loc-user
      - ref-cur-custom_agents-subagents-loc-precedence
      - ref-cur-custom_agents-changelog-hidden-dirs
      - ref-cur-custom_agents-changelog-plugin-subagents
      - ref-cur-custom_agents-plugins-agents
      - ref-cur-custom_agents-customize-subagents-row
      - ref-cur-custom_agents-customize-scope
      - ref-cur-custom_agents-sdk-config-sources
  - section_id: agents-format
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_agents-subagents-format
      - ref-cur-custom_agents-subagents-fields-model
      - ref-cur-custom_agents-subagents-fields-perms
      - ref-cur-custom_agents-subagents-model-config
      - ref-cur-custom_agents-subagents-model-params
      - ref-cur-custom_agents-subagents-model-params-note
      - ref-cur-custom_agents-subagents-model-fallback
      - ref-cur-custom_agents-rules-agents-md
      - ref-cur-custom_agents-cli-using-rules
  - section_id: agents-roles
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_agents-subagents-how
      - ref-cur-custom_agents-subagents-builtin-table
      - ref-cur-custom_agents-subagents-faq-builtin
      - ref-cur-custom_agents-hooks-subagent-types
      - ref-cur-custom_agents-acp-task
      - ref-cur-custom_agents-projects-coordinator
      - ref-cur-custom_agents-projects-subscriptions
      - ref-cur-custom_agents-plugins-agents
      - ref-cur-custom_agents-sdk-subagents
  - section_id: agents-invocation
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_agents-subagents-auto-delegate
      - ref-cur-custom_agents-subagents-explicit
      - ref-cur-custom_agents-subagents-modes
      - ref-cur-custom_agents-subagents-parallel
      - ref-cur-custom_agents-subagents-isolation-intro
      - ref-cur-custom_agents-subagents-isolation-detail
      - ref-cur-custom_agents-subagents-cloud
      - ref-cur-custom_agents-subagents-autopilot
      - ref-cur-custom_agents-subagents-resume
      - ref-cur-custom_agents-agents-window-features
      - ref-cur-custom_agents-changelog-cli-subagents
  - section_id: agents-overrides
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_agents-subagents-fields-model
      - ref-cur-custom_agents-subagents-fields-perms
      - ref-cur-custom_agents-subagents-model-config
      - ref-cur-custom_agents-subagents-model-params
      - ref-cur-custom_agents-subagents-model-fallback
      - ref-cur-custom_agents-subagents-pools-model
      - ref-cur-custom_agents-subagents-faq-mcp
      - ref-cur-custom_agents-changelog-cli-subagents
      - ref-cur-custom_agents-changelog-autoaccept
      - ref-cur-custom_agents-changelog-explore-model
      - ref-cur-custom_agents-sdk-tools
      - ref-cur-custom_agents-sdk-system-prompt
      - ref-cur-custom_agents-sdk-custom-tools
      - ref-cur-custom_agents-sdk-composer2-reroute
  - section_id: agents-limits
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_agents-subagents-faq-nesting
      - ref-cur-custom_agents-sdk-nested
      - ref-cur-custom_agents-sdk-background
      - ref-cur-custom_agents-changelog-single-turn
      - ref-cur-custom_agents-changelog-retry
      - ref-cur-custom_agents-subagents-cost
      - ref-cur-custom_agents-subagents-token-cost
      - ref-cur-custom_agents-subagents-pools-billing
      - ref-cur-custom_agents-hooks-subagent-start
      - ref-cur-custom_agents-hooks-loop-limit
      - ref-cur-custom_agents-agent-overview-tools
  - section_id: agents-diagnostics
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_agents-subagents-viewing
      - ref-cur-custom_agents-subagents-faq-progress
      - ref-cur-custom_agents-subagents-faq-debug
      - ref-cur-custom_agents-subagents-faq-failure
      - ref-cur-custom_agents-changelog-transcript
      - ref-cur-custom_agents-changelog-jobs
      - ref-cur-custom_agents-changelog-subagent-ui
      - ref-cur-custom_agents-changelog-resume-context
      - ref-cur-custom_agents-slash-commands-logs
      - ref-cur-custom_agents-hooks-subagent-start
      - ref-cur-custom_agents-customize-scope
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs:
          - ref-cur-custom_agents-subagents-scope
          - ref-cur-custom_agents-subagents-creating
          - ref-cur-custom_agents-subagents-loc-project
          - ref-cur-custom_agents-subagents-loc-user
          - ref-cur-custom_agents-subagents-loc-precedence
          - ref-cur-custom_agents-changelog-hidden-dirs
          - ref-cur-custom_agents-changelog-plugin-subagents
          - ref-cur-custom_agents-plugins-agents
          - ref-cur-custom_agents-sdk-config-sources
      - surface_ids: [cursor]
        section_id: agents-entry
        status: answered
        source_refs:
          - ref-cur-custom_agents-subagents-scope
          - ref-cur-custom_agents-subagents-loc-project
          - ref-cur-custom_agents-subagents-loc-user
          - ref-cur-custom_agents-subagents-loc-precedence
          - ref-cur-custom_agents-plugins-agents
          - ref-cur-custom_agents-customize-subagents-row
          - ref-cur-custom_agents-customize-scope
          - ref-cur-custom_agents-sdk-config-sources
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs:
          - ref-cur-custom_agents-subagents-format
          - ref-cur-custom_agents-subagents-fields-model
          - ref-cur-custom_agents-subagents-fields-perms
          - ref-cur-custom_agents-subagents-model-config
          - ref-cur-custom_agents-subagents-model-params
          - ref-cur-custom_agents-subagents-model-fallback
          - ref-cur-custom_agents-cli-using-rules
      - surface_ids: [cursor]
        section_id: agents-format
        status: answered
        source_refs:
          - ref-cur-custom_agents-subagents-format
          - ref-cur-custom_agents-subagents-fields-model
          - ref-cur-custom_agents-subagents-fields-perms
          - ref-cur-custom_agents-subagents-model-config
          - ref-cur-custom_agents-subagents-model-params
          - ref-cur-custom_agents-subagents-model-fallback
          - ref-cur-custom_agents-rules-agents-md
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs:
          - ref-cur-custom_agents-subagents-how
          - ref-cur-custom_agents-subagents-builtin-table
          - ref-cur-custom_agents-subagents-faq-builtin
          - ref-cur-custom_agents-hooks-subagent-types
          - ref-cur-custom_agents-acp-task
          - ref-cur-custom_agents-projects-coordinator
          - ref-cur-custom_agents-projects-subscriptions
          - ref-cur-custom_agents-plugins-agents
          - ref-cur-custom_agents-sdk-subagents
      - surface_ids: [cursor]
        section_id: agents-roles
        status: answered
        source_refs:
          - ref-cur-custom_agents-subagents-how
          - ref-cur-custom_agents-subagents-builtin-table
          - ref-cur-custom_agents-subagents-faq-builtin
          - ref-cur-custom_agents-hooks-subagent-types
          - ref-cur-custom_agents-projects-coordinator
          - ref-cur-custom_agents-projects-subscriptions
          - ref-cur-custom_agents-plugins-agents
          - ref-cur-custom_agents-sdk-subagents
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-cur-custom_agents-subagents-auto-delegate
          - ref-cur-custom_agents-subagents-explicit
          - ref-cur-custom_agents-subagents-modes
          - ref-cur-custom_agents-subagents-parallel
          - ref-cur-custom_agents-subagents-isolation-intro
          - ref-cur-custom_agents-subagents-isolation-detail
          - ref-cur-custom_agents-subagents-resume
      - surface_ids: [cursor]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-cur-custom_agents-subagents-auto-delegate
          - ref-cur-custom_agents-subagents-explicit
          - ref-cur-custom_agents-subagents-modes
          - ref-cur-custom_agents-subagents-parallel
          - ref-cur-custom_agents-subagents-isolation-intro
          - ref-cur-custom_agents-subagents-isolation-detail
          - ref-cur-custom_agents-subagents-cloud
          - ref-cur-custom_agents-subagents-autopilot
          - ref-cur-custom_agents-subagents-resume
          - ref-cur-custom_agents-agents-window-features
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs:
          - ref-cur-custom_agents-subagents-fields-model
          - ref-cur-custom_agents-subagents-fields-perms
          - ref-cur-custom_agents-subagents-model-config
          - ref-cur-custom_agents-subagents-model-params
          - ref-cur-custom_agents-subagents-model-fallback
          - ref-cur-custom_agents-subagents-pools-model
          - ref-cur-custom_agents-changelog-cli-subagents
          - ref-cur-custom_agents-changelog-autoaccept
          - ref-cur-custom_agents-changelog-explore-model
          - ref-cur-custom_agents-sdk-system-prompt
          - ref-cur-custom_agents-sdk-custom-tools
          - ref-cur-custom_agents-sdk-composer2-reroute
      - surface_ids: [cursor]
        section_id: agents-overrides
        status: partial
        source_refs:
          - ref-cur-custom_agents-subagents-fields-model
          - ref-cur-custom_agents-subagents-fields-perms
          - ref-cur-custom_agents-subagents-model-config
          - ref-cur-custom_agents-subagents-model-params
          - ref-cur-custom_agents-subagents-model-fallback
          - ref-cur-custom_agents-subagents-faq-mcp
          - ref-cur-custom_agents-sdk-tools
          - ref-cur-custom_agents-sdk-system-prompt
          - ref-cur-custom_agents-sdk-custom-tools
          - ref-cur-custom_agents-sdk-composer2-reroute
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs:
          - ref-cur-custom_agents-subagents-faq-nesting
          - ref-cur-custom_agents-sdk-nested
          - ref-cur-custom_agents-changelog-single-turn
          - ref-cur-custom_agents-changelog-retry
          - ref-cur-custom_agents-subagents-cost
          - ref-cur-custom_agents-subagents-token-cost
          - ref-cur-custom_agents-subagents-pools-billing
          - ref-cur-custom_agents-hooks-subagent-start
          - ref-cur-custom_agents-hooks-loop-limit
          - ref-cur-custom_agents-agent-overview-tools
      - surface_ids: [cursor]
        section_id: agents-limits
        status: partial
        source_refs:
          - ref-cur-custom_agents-subagents-faq-nesting
          - ref-cur-custom_agents-sdk-nested
          - ref-cur-custom_agents-sdk-background
          - ref-cur-custom_agents-subagents-cost
          - ref-cur-custom_agents-subagents-token-cost
          - ref-cur-custom_agents-subagents-pools-billing
          - ref-cur-custom_agents-hooks-subagent-start
          - ref-cur-custom_agents-hooks-loop-limit
          - ref-cur-custom_agents-agent-overview-tools
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs:
          - ref-cur-custom_agents-subagents-viewing
          - ref-cur-custom_agents-subagents-faq-progress
          - ref-cur-custom_agents-subagents-faq-debug
          - ref-cur-custom_agents-subagents-faq-failure
          - ref-cur-custom_agents-changelog-transcript
          - ref-cur-custom_agents-changelog-jobs
          - ref-cur-custom_agents-changelog-subagent-ui
          - ref-cur-custom_agents-changelog-resume-context
          - ref-cur-custom_agents-slash-commands-logs
      - surface_ids: [cursor]
        section_id: agents-diagnostics
        status: partial
        source_refs:
          - ref-cur-custom_agents-subagents-viewing
          - ref-cur-custom_agents-subagents-faq-progress
          - ref-cur-custom_agents-subagents-faq-debug
          - ref-cur-custom_agents-subagents-faq-failure
          - ref-cur-custom_agents-hooks-subagent-start
          - ref-cur-custom_agents-customize-scope
---

Cursor 的「自定义 Agent」本体是**子代理机制**：主代理在会话内生成子代理执行一段专门工作，子代理在独立上下文里运行并把结果交回父代理；用户用 Markdown 文件或 SDK 内联对象定义可复用的命名子代理。本章的固定来源限于官方文档站快照（`subagents.md` 等取于 2026-09-30；`agent/projects.md` 与 `sdk/typescript.md` 在 2026-10-03 巡检中按新快照 `snapshot-source-cur-agent-projects-doc-20261003`、`snapshot-source-cur-sdk-typescript-doc-20261003` 复核）：主来源为 `subagents.md`，另有 `agent/overview.md`、`cli/using.md`、`cli/changelog.md`、`rules.md`、`agent/agents-window.md`、`sdk/typescript.md`、`agent/projects.md`，并辅以 `customize-cursor.md`、`plugins.md`、`hooks.md`、`cli/acp.md`、`cli/slash-commands.md`。登记来源均未声明适用软件版本，产品也没有软件版本映射，因此整章按 source_only 阅读；行文中出现的版本或日期都来自原文自身（例如 `Since Cursor 2.5`）。`subagents.md` 明确写出子代理可用于 "the editor, CLI, and Cloud Agents"，所以同一套机制同时覆盖 `cursor`（Cursor IDE/编辑器）与 `cli`（Cursor CLI）两个界面；CLI 专有的入口与变更只在 `cli` 答案中引用 CLI changelog 作为证据。

## 自定义子代理的定义入口与发现位置 {#agents-entry}

自定义子代理就是一段 Markdown 定义：每个子代理一个文件，宿主按目录约定发现它，用户和插件都通过这套约定接入。[@ref-cur-custom_agents-subagents-scope]

项目级与用户级的查找位置（原文表格逐字给出的三类根目录）[@ref-cur-custom_agents-subagents-loc-project][@ref-cur-custom_agents-subagents-loc-user]：

| 类型 | 位置 | 作用域 |
| :-- | :-- | :-- |
| 项目子代理 | `.cursor/agents/` | 仅当前项目 |
| 项目子代理 | `.claude/agents/` | 仅当前项目（Claude 兼容） |
| 项目子代理 | `.codex/agents/` | 仅当前项目（Codex 兼容） |
| 用户子代理 | `~/.cursor/agents/` | 当前用户的全部项目 |
| 用户子代理 | `~/.claude/agents/` | 当前用户的全部项目（Claude 兼容） |
| 用户子代理 | `~/.codex/agents/` | 当前用户的全部项目（Codex 兼容） |

同名时的选择规则是确定的：项目子代理优先于用户子代理，而多个根目录都有同名文件时 `.cursor/` 优先于 `.claude/` 与 `.codex/`。[@ref-cur-custom_agents-subagents-loc-precedence]

定义可以两条路产生：直接让 Agent 自己写（给出目标，Agent 在 `.cursor/agents/{name}.md` 建文件），或手工把 Markdown 加进 `.cursor/agents/`（项目）与 `~/.cursor/agents/`（用户）。官方给出的完整定义示例是 `verifier.md`，字段只有 `name` 与 `description`，其余是提示正文。[@ref-cur-custom_agents-subagents-creating] 发现扫描有一条边界规则：CLI changelog 记录 skill 与 subagent 的扫描**不再下探隐藏的点目录**，以避免大型嵌套目录拖慢加载。[@ref-cur-custom_agents-changelog-hidden-dirs]

插件是第二个分发入口，但格式受限：插件组件表把 `Agents` 标为只在 **Cursor Plugins** 格式可用（Agent Plugins 标准只规定 skills 与 MCP servers），描述为「Custom agent configurations and prompts」。[@ref-cur-custom_agents-plugins-agents] CLI changelog 记录插件安装后「plugin skills, slash commands, subagents, and MCP servers all load into the session」，即插件携带的子代理会进入会话。[@ref-cur-custom_agents-changelog-plugin-subagents] 在编辑器侧，插件与子代理都在 **Customize** 页面按 user / team / workspace 作用域安装与管理。[@ref-cur-custom_agents-customize-subagents-row][@ref-cur-custom_agents-customize-scope]

SDK 是第三个入口：`Agent.create()` 的 `agents` 选项可直接内联定义命名子代理，同时仓库里的 `.cursor/agents/*.md` 也会被拾取；SDK 文档给出的配置优先级形态是 per-send inline > creation-time inline > project files > user files > team/dashboard config，其中内联定义与同名文件定义冲突时**内联覆盖文件**。[@ref-cur-custom_agents-sdk-config-sources]

缺口（本节标注 answered 指「入口与根目录可确证」，不等于全部细节已查清）：来源没有给出 CLI 是否为子代理单独增加目录或环境变量（例如 `CURSOR_CONFIG_DIR` 是否影响 `agents/` 的根），没有给出扫描深度上限、是否跟随符号链接、`.md` 之外的文件名是否参与识别，也没有说明插件提供的子代理与手动定义的子代理同名时如何消解。这些点本轮未在来源中找到入口。

## 定义文件格式、字段与指令层 {#agents-format}

每个子代理是「YAML frontmatter + Markdown 正文」的单个文件，正文即该子代理的提示。[@ref-cur-custom_agents-subagents-format] 官方示例（`security-auditor`）同时展示了字段与正文两段：

```markdown
---
name: security-auditor
description: Security specialist. Use when implementing auth, payments, or handling sensitive data.
model: inherit
readonly: true
---

You are a security expert auditing code for vulnerabilities.

When invoked:
1. Identify security-sensitive code paths
2. Check for common vulnerabilities (injection, XSS, auth bypass)
3. Verify secrets are not hardcoded
4. Review input validation and sanitization

Report findings by severity:
- Critical (must fix before deploy)
- High (fix soon)
- Medium (address when possible)
```

frontmatter 字段与默认值（原文表格）[@ref-cur-custom_agents-subagents-fields-model][@ref-cur-custom_agents-subagents-fields-perms]：

| 字段 | 类型 | 必填 | 默认 | 用途 |
| :-- | :-- | :-- | :-- | :-- |
| `name` | string | 否 | 由文件名推导 | 显示名与标识，建议小写加连字符。 |
| `description` | string | 否 | — | 出现在 Task 工具提示里，Agent 据此决定是否委派。 |
| `model` | string | 否 | `inherit` | `inherit` 或具体模型 ID。 |
| `readonly` | boolean | 否 | `false` | 为 `true` 时以受限写权限运行（不可编辑文件、不可执行改变状态的 shell 命令）。 |
| `is_background` | boolean | 否 | `false` | 为 `true` 时后台运行、不阻塞父代理。 |

`model` 有两种取值语义：`inherit` 沿用父代理模型（默认），或写具体模型 ID（例如 `composer-2`、`gpt-5.6-sol`）。需要与父代理同等推理能力时用 `inherit`；需要特定模型能力时不随父代理变化。[@ref-cur-custom_agents-subagents-model-config]

模型 ID 后可跟方括号参数覆盖单项能力，写法是 `id=value`、多项用逗号分隔，例如 `composer-2.5[]`（固定基础模型而不是 fast 变体）、`composer-2.5[fast=false]`、`claude-opus-5[effort=high]`、`claude-opus-5[context=300k]`、`claude-opus-5[effort=high,context=300k]`；可用选项取决于模型，与 SDK 的 model parameters 使用同一套 `id=value` 语法。[@ref-cur-custom_agents-subagents-model-params][@ref-cur-custom_agents-subagents-model-params-note]

frontmatter 写的模型不保证生效，三种条件下 Cursor 会回退到兼容模型：团队管理员屏蔽了该模型；旧式 request-based 计划的模型需要 Max Mode 而用户未启用；当前计划不包含该模型。[@ref-cur-custom_agents-subagents-model-fallback]

指令层与定义本体要分开：`AGENTS.md` 是放在项目根（并支持子目录嵌套、更具体的指令优先）的纯 Markdown agent 指令，和 rules 一样进入模型上下文，但**不是子代理定义**；它没有 frontmatter 元数据。[@ref-cur-custom_agents-rules-agents-md] CLI 侧同样读取项目根的 `AGENTS.md` 与 `CLAUDE.md`，与 `.cursor/rules` 并列作为规则应用。[@ref-cur-custom_agents-cli-using-rules]

缺口：登记来源只给出上表 5 个字段；文件格式里**没有**出现内联 SDK 那样的 `prompt`、`tools` 等键，也没有说明未知 frontmatter 键是被忽略、报错还是透传。因此「子代理文件是否有工具白名单字段」在文件侧无法确证（SDK 侧才见 `tools`/`disallowedTools`，见「覆盖与继承」小节）。

## 角色：内置子代理、自定义子代理与协调者 {#agents-roles}

子代理只承担「父代理派出的自主执行」这一种角色，父代理把必要上下文写进提示，因为子代理拿不到此前的会话历史；它独立工作后交回一条最终消息。[@ref-cur-custom_agents-subagents-how]

内置子代理有三个，随产品提供、无需配置，在这种上下文密集型操作出现时自动启用 [@ref-cur-custom_agents-subagents-builtin-table][@ref-cur-custom_agents-subagents-faq-builtin]：

| 子代理 | 用途 | 为何做成子代理 |
| :-- | :-- | :-- |
| Explore | 搜索与分析代码库 | 探索产生大量中间输出，会把主上下文撑大；用更快的模型并行跑多次搜索。 |
| Bash | 连续执行 shell 命令 | 命令输出冗长，隔离后父代理只看决策而不看日志。 |
| Browser | 通过 MCP 工具操作浏览器 | 浏览器交互产生大量 DOM 快照与截图，子代理负责过滤成相关结果。 |

原文对三者的称呼并不完全一致，这是登记来源里的一处**未消解差异**：`subagents.md` 用 `Explore` / `Bash` / `Browser`，FAQ 用小写 `explore` / `bash` / `browser`；[@ref-cur-custom_agents-subagents-faq-builtin] 而 hooks 页给出的 subagent 类型是小写 `generalPurpose`、`explore`、`shell` 等，并要求按 subagent 类型做 matcher 过滤。[@ref-cur-custom_agents-hooks-subagent-types] 可以确认存在 `explore` 类型，但 `Bash` 是否对应 hooks 的 `shell`、以及 `generalPurpose` 是自定义通用子代理还是内置项，文档没有对齐，需按运行观察或未登记源码判定。

自定义子代理与内置项共用同一执行机制，区别只在定义来源（`.cursor/agents/` 等目录、插件、SDK 内联）。插件侧一个细节：组件表把 `Agents` 标为仅 Cursor Plugins 格式可用，因此走 Agent Plugins 标准的插件不会提供子代理。[@ref-cur-custom_agents-plugins-agents] SDK 定义了「程序化角色」这一变体：`agents` 选项建命名子代理，由主代理通过 `Agent` 工具生成。[@ref-cur-custom_agents-sdk-subagents]

再往上一层是 **Project 的协调者**：Project 的 coordinator 自己不写代码，只规划工作、把它委派给会写代码的 agent，并把完成的工作交回给用户确认；它按需并行创建多个 agent。[@ref-cur-custom_agents-projects-coordinator] 这与子代理是不同粒度——协调者派出的 agent 有自己的会话，而不是父会话里的 Task 子代理。协调者还可以持有**订阅（subscriptions）**：让它盯某个 Slack 频道、按计划运行或跟随 PR，它会主动创建订阅；只要至少有一个订阅，聊天输入框上方就会出现 **Listening** 标记，点开可以查看 Project 正在监听的每个事件（频道消息、仓库 PR 活动、分支 CI 运行、每天 8:00 这类计划），不再需要时在同一列表里移除。[@ref-cur-custom_agents-projects-subscriptions] 订阅是协调者层面的能力，子代理本身没有对应概念。

最后一个角色面来自 ACP 集成：`cursor/task` 通知的 `subagentType` 枚举覆盖 `unspecified`、`computer_use`、`explore`、`video_review`、`browser_use`、`shell`、`vm_setup_helper`，以及自定义类型的 `{ custom: "your_type" }`；请求里还带 `model`、`agentId`（用于恢复既有子代理）与 `durationMs`。[@ref-cur-custom_agents-acp-task] 这说明 CLI 作为 ACP server 时，客户端能看到并区分内置与自定义子代理类型。

## 调用：显式请求、自动委派、并行与隔离 {#agents-invocation}

自动委派的判据有三个来源：任务复杂度与范围、项目里自定义子代理的 `description`、当前上下文与可用工具。[@ref-cur-custom_agents-subagents-auto-delegate]

显式调用有两种写法：在提示里用 `/name` 语法点名，或自然语言提名。官方样例同时给出三组对照——`/verifier confirm the auth flow is complete`、`/debugger investigate this error`、`/security-auditor review the payment module`，以及「Use the verifier subagent to …」「Have the debugger subagent …」「Run the security-auditor subagent on …」。[@ref-cur-custom_agents-subagents-explicit]

前景与后台由运行模式决定，也可由定义的 `is_background` 默认值控制：前景会阻塞到子代理结束并立即取回结果，适合需要输出的顺序任务；后台立即返回、子代理独立工作，适合长任务或并行工作流。[@ref-cur-custom_agents-subagents-modes]

并行执行来自一次消息里的多个 Task 工具调用，`Agent sends multiple Task tool calls in a single message, so subagents run simultaneously`；用户只需在提示里要求并行处理（例如「…in parallel」）。[@ref-cur-custom_agents-subagents-parallel]

隔离是子代理级的：默认所有子代理共享父代理的 checkout，多个子代理同时编辑会互相覆盖；用户显式要求隔离时，每个子代理拿到自己的环境与分支——同机上的独立 Git worktree，或云上带专属 VM 与仓库克隆的环境，改动留在各自分支直到父代理合并结果。[@ref-cur-custom_agents-subagents-isolation-intro][@ref-cur-custom_agents-subagents-isolation-detail]

云子代理是本地会话的延伸：`/in-cloud` 让下一条任务在自建 VM 与分支上运行，`/autopilot` 让云子代理接管一个 PR 远程迭代；云子代理使用仓库配置的环境，并遵循 Cloud Agents 的模型与能力规则，其 MCP server 来自团队在 `cursor.com/agents` 的配置而不是本地会话。云子代理从 Cursor 桌面应用的 Agents Window 发起。[@ref-cur-custom_agents-subagents-cloud] Agents Window 的专有功能表把这条入口写成「hand off a task to a cloud subagent with `/in-cloud`, or put a PR on `/autopilot`」。[@ref-cur-custom_agents-agents-window-features][@ref-cur-custom_agents-subagents-autopilot]

恢复调用按 agent ID：每次子代理执行都会返回一个 agent ID，把它交给父代理即可在保留上下文的前提下继续该子代理；后台子代理在运行中持续写状态，完成后仍可恢复对话。[@ref-cur-custom_agents-subagents-resume]

CLI 侧还有一层交互入口：CLI changelog 记录子代理在交互式、headless 与编辑器会话中并行本地执行并显示实时状态（该条同时说明它继承凭据、规则与审批策略）；同一版 changelog 的另一节记录「在 agent 工作时按 Enter 把排队消息送入当前运行的安全边界，再按一次 Enter 才中断本轮」。[@ref-cur-custom_agents-changelog-cli-subagents]

缺口：来源没有给出**多个同分候选子代理之间的选择规则**（例如两个 description 都匹配时怎么挑）、也没有说明 CLI 内 `/name` 语法是否与编辑器完全一致；`/name` 与自然语言提名的样例全部来自共享的 `subagents.md`。此外并行上限没有数字，见「边界」小节。

## 模型、工具、权限与继承 {#agents-overrides}

子代理能覆盖的父级设置分三类，粒度不同：

1. **模型**：`model` 字段取 `inherit`（默认，跟随父代理）或具体模型 ID；[@ref-cur-custom_agents-subagents-fields-model][@ref-cur-custom_agents-subagents-model-config] 模型 ID 后可用 `id=value` 参数覆盖 speed、reasoning effort、context window 等单项能力。[@ref-cur-custom_agents-subagents-model-params]
2. **写权限**：`readonly: true` 让子代理以受限写权限运行——不可编辑文件，也不可执行改变状态的 shell 命令。[@ref-cur-custom_agents-subagents-fields-perms]
3. **运行模式**：`is_background` 决定默认是否阻塞父代理。[@ref-cur-custom_agents-subagents-fields-model]

模型选择不是子代理单独决定的结果：模型选择器（含 Auto）作用于父代理，而内置子代理自己挑模型、自定义子代理用 `inherit` 或 frontmatter 的 `model`、父代理在发起时也可以指定模型。[@ref-cur-custom_agents-subagents-pools-model] 失败回退见「格式」小节：管理员屏蔽、计划不含、旧式计划缺 Max Mode 时回退到兼容模型。[@ref-cur-custom_agents-subagents-model-fallback]

权限与环境的继承在 CLI 侧有明确记录：子代理继承父代理的凭据、规则与审批策略，Max mode 与自定义 key 配置也会传播到子代理；[@ref-cur-custom_agents-changelog-cli-subagents] Auto-Accept Web Search 这类权限设置同样在 subagent 运行中被遵守（该项由 `/config` 的 Permissions 或 `cli-config.json` 的 `autoAcceptWebSearch` 控制）。[@ref-cur-custom_agents-changelog-autoaccept] 工具面则整体继承：子代理默认继承父代理的全部工具，包括已配置 MCP server 的工具，唯一例外是云子代理——它用团队在 `cursor.com/agents` 配置的 MCP server，而非本地会话的 server。[@ref-cur-custom_agents-subagents-faq-mcp]

内置子代理的模型也可单独配置：CLI 支持把 Explore 子代理设为默认、禁用、继承父代理模型或指定模型，入口是 `/config`。[@ref-cur-custom_agents-changelog-explore-model]

SDK 侧提供了文件格式没有的工具覆盖面：`tools` 做白名单、`disallowedTools` 做黑名单（deny 优先，工具必须既在白名单内又不在黑名单内才提供），二者仅本地 agent 可用，且**不随 agent 持久化**，要在 `Agent.resume()` 时重新传；特别地，禁用 `"task"` 会阻止子代理，禁用 `"mcp"` 会同时移除自定义工具。[@ref-cur-custom_agents-sdk-tools]

SDK 还能**替换系统提示**：`systemPrompt` 用自己的文本替换 Cursor 内置的主循环系统提示，代价是模型失去编码助手身份、工具使用协议与沟通指引，需要把仍需要的内容重述一遍（工具 schema、rules 与 skills 仍照常加载，子代理保留自己的提示）。它仅本地 agent 可用，与 `cloud` 同传会抛 `ConfigurationError`，不能是空串或纯空白，同样不随 agent 持久化，`Agent.resume()` 要重传。[@ref-cur-custom_agents-sdk-system-prompt]

**自定义工具**是不必自建 MCP server 就能暴露自有函数的另一条路：把函数写在 `local.customTools` 上，SDK 会把它们注册成一个名为 `custom-user-tools` 的 MCP server，agent 通过与普通 server 完全相同的 MCP 路径发现和调用。deny 规则与沙箱限制照常生效，但自定义工具**跳过交互式批准**，因此在沙箱运行与 Auto-review 下调用它们不会弹提示。[@ref-cur-custom_agents-sdk-custom-tools]

模型 ID 侧有一条迁移规则：**Composer 2 已退役**，仍传 `composer-2` 或 `composer-2-fast` 的 SDK 请求会在鉴权时被改写到 Composer 2.5，已有脚本因此继续可用；但依赖过 `composer-2-fast` 变体的调用需要确认 fast 行为仍符合预期（等价写法是 `composer-2.5` 配 `fast=true`）。[@ref-cur-custom_agents-sdk-composer2-reroute] 子代理 frontmatter 的 `model` 字段写具体 ID 时同样受这条改写影响，来源未单独说明该字段是否也走鉴权期改写。

缺口（两界面都因此标注 partial）：来源里**没有** provider 字段，也没有子代理级沙箱/网络/审批覆盖的文档（CLI 只说明审批策略被继承）；`readonly` 除「无文件编辑、无改变状态的 shell 命令」之外没有更细的语义说明，也没有说明它能否被父代理反向放开；文件格式没有工具白名单字段（SDK 有），也没有对应的 `systemPrompt` 或自定义工具字段——这两项目前只有 SDK 侧的 `Agent.create()` 入口，`.cursor/agents/*.md` 是否能表达它们未文档化。

## 边界：嵌套、并发、上下文与成本 {#agents-limits}

嵌套有明确上限，且形态是「两层」而不是任意深度：自 Cursor 2.5 起子代理可以再启动子代理形成协作树，主代理与其直接子代理可以启动子代理，但由子代理启动的子代理**不能**再往下启动；嵌套启动还需要当前模式具备 Task 工具访问权，hooks 或工具策略可以阻止生成。[@ref-cur-custom_agents-subagents-faq-nesting] SDK 页给出同一规则的实现说明：子代理使用 `Agent` 工具时拿到与父代理相同的子代理执行器，每一层都能看到同一组命名子代理与自定义工具，但「a subagent launched by another subagent can't launch further ones」。[@ref-cur-custom_agents-sdk-nested]

生成可以被策略阻断：`subagentStart` hook 在生成子代理（Task 工具）前触发，可返回 `permission: "allow"` 或 `"deny"`（`"ask"` 不支持，按 `"deny"` 处理），拒绝时可带 `user_message` 展示给用户。[@ref-cur-custom_agents-hooks-subagent-start]

上下文与成本的边界是机制性的而非数字性的：每个子代理有自己的上下文窗口，长研究会占用独立空间；代价是启动开销（每个子代理要自建上下文）、更高的 token 用量（并行多个上下文）以及可能比主代理更慢的延迟。[@ref-cur-custom_agents-subagents-cost] 并行 5 个子代理大致等于单代理 5 倍的 token 用量，因此简单任务应交回主代理执行。[@ref-cur-custom_agents-subagents-token-cost] 计费按实际运行的模型列表价结算：命名的第三方模型从 Other Models 池扣费（即使父会话在 Auto、Grok 或 Composer 上也一样），Teams 与 Enterprise 上的第三方请求还会叠加 Cursor Token Rate。[@ref-cur-custom_agents-subagents-pools-billing]

CLI 侧有两条生命周期规则：headless/单轮运行会**等子代理排空并计入结果后**才退出，不会在后台 shell 或 dev server 还在跑时切断；[@ref-cur-custom_agents-changelog-single-turn] 子代理遇到瞬时网络错误不会以终态错误结束，而是按与普通轮次相同的重试策略从最近的 checkpoint 恢复。[@ref-cur-custom_agents-changelog-retry] SDK（本地 agent）另有背景子代理的交付规则：结果作为同一次 run 的后续轮次回到父代理，而不是在父轮结束时丢弃。[@ref-cur-custom_agents-sdk-background]

父代理本身没有工具调用次数上限（`There is no limit on the number of tool calls Agent can make during a task`），这是它与子代理边界唯一被写明的「无限制」项。[@ref-cur-custom_agents-agent-overview-tools]

缺口（本节 partial）：来源没有给出并发子代理数量上限、单个子代理的最长持续时间或超时、嵌套的数值深度（只给了「两层」的形态描述）、以及子代理上下文窗口尺寸；`subagentStop` 有每脚本 `loop_limit` 默认 5 的约束，但那是 hook 侧参数而非子代理本身的时长限制。[@ref-cur-custom_agents-hooks-loop-limit]

## 诊断：确认发现、可调用与失败定位 {#agents-diagnostics}

确认定义被发现：`subagents.md` 的说明是 Agent 把全部自定义子代理纳入可用工具，查看方式就是检查项目里的 `.cursor/agents/` 目录；[@ref-cur-custom_agents-subagents-viewing] 编辑器侧还可以在 Customize 页面按用户、工作区或团队 scope 查看与筛选已安装的组件。[@ref-cur-custom_agents-customize-scope]

观察运行中的子代理（CLI）：前景 shell 与子代理都出现在 jobs pager 里，与后台任务并列；[@ref-cur-custom_agents-changelog-jobs] 子代理有实时渲染的 UI，逐个子代理显示状态、流式活动与 token 计数；[@ref-cur-custom_agents-changelog-subagent-ui] 钻进某个子代理可以看到完整、有序的 transcript（prompt、thinking、工具调用、最终回答），而不只是工具行。[@ref-cur-custom_agents-changelog-transcript] 后台子代理把输出写到 `~/.cursor/subagents/`，父代理读这些文件检查进度。[@ref-cur-custom_agents-subagents-faq-progress] CLI 的调试日志位置可用 `/logs` 取得（同时复制到剪贴板）。[@ref-cur-custom_agents-slash-commands-logs]

恢复与失败：每次执行返回 agent ID，可用于恢复会话；完成后的子代理会持久化 checkpoint，恢复时还原此前上下文而不是空启动，后台子代理在完成通知里附带最终消息，而**恢复一个不可用的子代理会明确报错**。[@ref-cur-custom_agents-changelog-resume-context] 子代理失败时向父代理返回错误状态，父代理可以重试、带更多上下文恢复，或改用其它处理方式。[@ref-cur-custom_agents-subagents-faq-failure]

定位委派/权限失败：先用定义本身排查——检查子代理的 description 与 prompt 是否具体无歧义，并用一个简单任务显式调用它做隔离测试。[@ref-cur-custom_agents-subagents-faq-debug] 若生成被策略拦下，`subagentStart` hook 的返回就是证据面：`permission: "deny"` 会阻止创建，并可通过 `user_message` 把原因展示给用户；hook 的 matcher 还能按 subagent 类型只作用于特定种类。[@ref-cur-custom_agents-hooks-subagent-start]

缺口（cursor 界面因此标注 partial）：CLI 侧有 jobs pager、transcript 与 `/logs` 这类入口，编辑器侧登记来源只给出「查看 `.cursor/agents/` 目录」与 Customize 的作用域列表；两侧都没有文档化的「定义解析失败」「frontmatter 字段写错」诊断命令，也没有把「子代理未被发现」与「被 hook/策略拒绝」区分的统一入口。
