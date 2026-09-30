---
schema_version: 3
record_kind: production
edition_id: kilo-code-cli-custom_agents-v2
harness_id: kilo-code
topic: custom_agents
title: "Kilo Code CLI — 自定义 Agent：定义、字段、合并与委派"
sections:
  - section_id: custom-agents-entry
    surface_ids: [cli]
    source_refs: [ref-kilo-code-agents-json, ref-kilo-code-agents-markdown, ref-kilo-code-agents-cli, ref-kilo-code-cli-agent-cmd, ref-kilo-code-config-src-paths, ref-kilo-code-config-src-files, ref-kilo-code-agents-src-md, ref-kilo-code-agents-builtin, ref-kilo-code-agents-what]
  - section_id: custom-agents-format
    surface_ids: [cli]
    source_refs: [ref-kilo-code-agents-options, ref-kilo-code-agents-src-info]
  - section_id: custom-agents-roles
    surface_ids: [cli]
    source_refs: [ref-kilo-code-agents-modes, ref-kilo-code-agents-builtin, ref-kilo-code-agents-options]
  - section_id: custom-agents-invocation
    surface_ids: [cli]
    source_refs: [ref-kilo-code-agents-invoke, ref-kilo-code-agents-what, ref-kilo-code-agents-modes, ref-kilo-code-cli-slash]
  - section_id: custom-agents-overrides
    surface_ids: [cli]
    source_refs: [ref-kilo-code-agents-precedence, ref-kilo-code-agents-override, ref-kilo-code-agents-src-merge, ref-kilo-code-agents-options, ref-kilo-code-agents-permissions]
  - section_id: custom-agents-limits
    surface_ids: [cli]
    source_refs: [ref-kilo-code-agents-what, ref-kilo-code-agents-permissions, ref-kilo-code-agents-invoke, ref-kilo-code-cli-agent-cmd, ref-kilo-code-cli-slash, ref-kilo-code-agents-options, ref-kilo-code-agents-src-task]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: custom-agents-entry
        status: answered
        source_refs: [ref-kilo-code-agents-json, ref-kilo-code-agents-markdown, ref-kilo-code-agents-cli, ref-kilo-code-cli-agent-cmd, ref-kilo-code-config-src-paths, ref-kilo-code-config-src-files, ref-kilo-code-agents-src-md, ref-kilo-code-agents-what]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: custom-agents-format
        status: answered
        source_refs: [ref-kilo-code-agents-options, ref-kilo-code-agents-src-info]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: custom-agents-roles
        status: answered
        source_refs: [ref-kilo-code-agents-modes, ref-kilo-code-agents-builtin, ref-kilo-code-agents-options]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: custom-agents-invocation
        status: answered
        source_refs: [ref-kilo-code-agents-invoke, ref-kilo-code-agents-what, ref-kilo-code-agents-modes, ref-kilo-code-cli-slash]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: custom-agents-overrides
        status: answered
        source_refs: [ref-kilo-code-agents-override, ref-kilo-code-agents-precedence, ref-kilo-code-agents-permissions, ref-kilo-code-agents-src-merge, ref-kilo-code-agents-options]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: custom-agents-limits
        status: partial
        source_refs: [ref-kilo-code-agents-what, ref-kilo-code-agents-invoke, ref-kilo-code-agents-options, ref-kilo-code-agents-src-task]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: custom-agents-limits
        status: answered
        source_refs: [ref-kilo-code-agents-invoke, ref-kilo-code-cli-slash, ref-kilo-code-cli-agent-cmd]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 定义入口与发现 {#custom-agents-entry}

Kilo Code CLI 的自定义 agent（官方称 custom subagents）有三个定义入口：配置文件里的 `agent` 键、markdown agent 文件、`kilo agent create` 脚手架。文档明确当前只能通过配置文件（`kilo.jsonc`）或 markdown 定义，尚无可用的 UI 配置。[@ref-kilo-code-agents-json][@ref-kilo-code-agents-markdown]

**入口一：`agent` 配置键。** 在 `kilo.jsonc` 顶层 `agent` 对象下写条目；任何不匹配内建 agent 名字的 key 都会新建一个自定义 agent。[@ref-kilo-code-agents-json] prompt 可内联为字符串，也可用 `{file:./path}` 引用相对配置文件的外部 prompt 文件。[@ref-kilo-code-agents-json] 依据该来源的最小示例：

```json
{
  "$schema": "https://app.kilo.ai/config.json",
  "agent": {
    "code-reviewer": {
      "description": "Reviews code for best practices and potential issues",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-20250514",
      "prompt": "{file:./prompts/code-review.txt}",
      "permission": { "edit": "deny", "bash": "deny" }
    }
  }
}
```
（依据 [@ref-kilo-code-agents-json]）

**入口二：markdown 文件。** 放在全局 `~/.config/kilo/agents/` 或项目 `.kilo/agents/`；文件名去掉 `.md` 即 agent 名，frontmatter 写字段，正文即系统提示。[@ref-kilo-code-agents-markdown] 若 `.kilo/agents/` 是指向项目外目录的符号链接，需要在全局 `~/.config/kilo/kilo.jsonc` 的 `permission.markdown_source` 里按确切路径放行；项目配置不能授予该权限。外部文件始终不受信任，`{env:...}` 替换被禁用、`{file:...}` 仍限制在项目内。[@ref-kilo-code-agents-markdown] 依据该来源的最小示例：

```markdown
---
description: Reviews code for quality and best practices
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
permission:
  edit: deny
  bash: deny
---

You are a code reviewer. Analyze code quality, bugs, performance, and security.
```
（依据 [@ref-kilo-code-agents-markdown]）

**入口三：`kilo agent create`。** 交互式依次询问保存位置、描述、工具、mode，再用 AI 生成系统提示与标识符，最后写出 markdown 文件。[@ref-kilo-code-agents-cli] 对应的 CLI 接口是 `kilo agent create`，非交互选项为 `--path`（生成目录）、`--description`、`--mode`（`all`/`primary`/`subagent`）、`--permissions`/`--tools`（逗号分隔的权限列表，默认全部）、`-m`/`--model`（`provider/model` 格式）。[@ref-kilo-code-cli-agent-cmd]

**发现范围。** agent markdown 在遍历配置目录时加载：目录从 `Global.Path.config`（即 `~/.config/kilo`）开始，接着是当前目录沿父级到 worktree 根之间的项目 `.kilo`/`.kilocode` 目录；每个目录还会读取 `kilo.jsonc`、`kilo.json`、`opencode.jsonc`、`opencode.json` 中的 `agent` 段。[@ref-kilo-code-config-src-paths][@ref-kilo-code-config-src-files] 目录扫描使用 glob `{agent,agents}/**/*.md`，因此 `agent/` 与 `agents/` 两种目录名都匹配，并会进入嵌套子目录、跟随符号链接。[@ref-kilo-code-agents-src-md]

内建 agent 由代码定义：文档列出两个内建 subagent —— `general`（通用、全工具，除 todo）和 `explore`（只读探索）。[@ref-kilo-code-agents-builtin] 自定义 subagent 与它们统一在同一张 agent 表里：subagent 是被 primary agent 委派的隔离会话，拥有独立对话历史，可被主代理或用户调用，完成后把结果摘要回传父代理。[@ref-kilo-code-agents-what]

## 字段、frontmatter 与 Info 结构 {#custom-agents-format}

配置与 markdown frontmatter 共用同一组字段。文档列出的选项：[@ref-kilo-code-agents-options]

| 字段 | 类型 | 说明 |
|---|---|---|
| `description` | string | agent 做什么、何时使用；展示给 primary agent 以决定调用哪个 subagent。 |
| `mode` | `"subagent"` / `"primary"` / `"all"` | 使用方式；自定义 agent 默认 `all`。 |
| `model` | string | 覆盖本 agent 的模型，格式 `provider/model-id`；未设置则 subagent 继承调用它的 primary agent 的模型。 |
| `prompt` | string | 自定义系统提示；JSON 里可用 `{file:./path}`，markdown 里正文即提示。 |
| `temperature` | number | 响应随机度（0.0–1.0），越低越确定。 |
| `top_p` | number | 与 temperature 二选一的多样性控制（0.0–1.0）。 |
| `permission` | object | 工具权限，见下方权限机制。 |
| `hidden` | boolean | 为 `true` 时从 `@` 自动补全菜单隐藏，仍可被代理经 Task 工具调用；仅对 `mode: subagent` 生效。 |
| `steps` | number | 强制转为纯文本回答前的最大 agentic 迭代次数，用于成本控制。 |
| `color` | string | UI 颜色，接受十六进制（如 `#FF5733`）或主题名（`primary`、`accent`、`error` 等）。 |
| `disable` | boolean | 设为 `true` 彻底禁用该 agent。 |

未列出的附加选项会透传给模型 provider，例如为 OpenAI 模型设置 `reasoningEffort`。[@ref-kilo-code-agents-options]

源码的 `Agent.Info` 结构确认了这些字段的落地形态：`name`、`displayName`、`source`、`description`、`deprecated`、`mode`（限 `subagent`/`primary`/`all`）、`native`、`hidden`、`topP`、`temperature`、`color`、`permission`、`model`（由 `providerID` 与 `modelID` 组成）、`variant`、`prompt`、`options`（字符串到 unknown 的记录）、`steps`。[@ref-kilo-code-agents-src-info] 其中配置里的 `top_p` 映射到 `Info.topP`，`model` 字符串按 `provider/model-id` 解析；`options` 承载透传给 provider 的附加参数。[@ref-kilo-code-agents-src-info]

## 角色：primary、subagent 与 hidden {#custom-agents-roles}

`mode` 决定 agent 如何被使用：`primary` 是用户直接交互、可用 Tab 切换的主代理；`subagent` 只能经 Task 工具或 `@` 提及调用，不可作为主代理；`all` 两者皆可。自定义 agent 的默认 mode 是 `all`。[@ref-kilo-code-agents-modes]

内建的 `general` 与 `explore` 就是 subagent 角色。[@ref-kilo-code-agents-builtin]

`hidden: true` 只对 `mode: subagent` 生效：从 `@` 自动补全菜单里隐藏，但仍可被代理经 Task 工具调用。[@ref-kilo-code-agents-options] 文档把原生实现（代码内建）与用户自定义 agent 区分开：`general` 与 `explore` 是随宿主发布的原生 subagent，其中 `explore` 是只读探索角色，不能修改文件；用户自定义 agent 默认 `mode: all`，字段与内建 agent 走同一套配置合并（见下一节）。[@ref-kilo-code-agents-modes][@ref-kilo-code-agents-builtin]

## 调用与委派 {#custom-agents-invocation}

两条调用路径。[@ref-kilo-code-agents-invoke]

**自动委派。** 拥有完整工具访问的 primary agent 在 subagent 的 `description` 匹配当前任务时，会经 Task 工具自动调用该 subagent；因此 description 要写清用途。已废弃的 Orchestrator agent 并非必需。[@ref-kilo-code-agents-invoke]

**手动调用。** 在消息里输入 `@agent-name` 即可调用任意 subagent，例如 `@code-reviewer review the authentication module`；这会创建一个子任务，在 subagent 的隔离上下文里按其 prompt 与权限运行。[@ref-kilo-code-agents-invoke][@ref-kilo-code-agents-what]

Task 工具只能委派 `subagent` 或 `all` 角色的 agent，`primary` 不作为 subagent 使用。[@ref-kilo-code-agents-modes] 会话内可用 `/agents` 切换 agent 或打开 agent 选择器；`/reload` 会从磁盘重新加载项目的配置、skills、agents 和 commands，但任一项目会话运行中会拒绝 reload。[@ref-kilo-code-cli-slash]

## 覆盖、继承与合并优先级 {#custom-agents-overrides}

agent 配置按以下顺序合并，后出现的来源覆盖前面的：[@ref-kilo-code-agents-precedence]

1. 内建 agent 默认值（代码中的原生 agent）
2. 全局配置（`~/.config/kilo/config.json`）
3. 项目配置（项目根目录的 `kilo.jsonc`）
4. 全局 agent markdown 文件（`~/.config/kilo/agents/*.md`）
5. 项目 agent markdown 文件（`.kilo/agents/*.md`）

覆盖内建 agent 时属性是合并：只覆盖你写出的字段；新建自定义 agent 时未指定的字段用合理默认值（`mode: "all"`、继承全局配置的完整权限）。[@ref-kilo-code-agents-precedence]

用内建 agent 的名字即可定制它，例如把 `explore` 换成别的模型；把某内建 agent 的 `disable` 设为 `true` 可整体禁用它。[@ref-kilo-code-agents-override]

```json
{
  "agent": {
    "explore": { "model": "anthropic/claude-haiku-4-20250514" },
    "general": { "disable": true }
  }
}
```
（依据 [@ref-kilo-code-agents-override]）

源码的合并循环给出同一规则的实现细节：遍历配置里的 agent 条目，`disable` 为真则从表中删除该 agent；否则取已有内建条目、或按 `mode: "all"`、`native: false`、权限由 defaults 与 user 合并的新条目；各字段以 `value.x ?? item.x` 方式逐项覆盖（`model`、`variant`、`prompt`、`description`、`temperature`、`top_p`、`mode`、`color`、`hidden`、`name`、`steps`），`options` 用深度合并，`permission` 用 `Permission.merge(item.permission, Permission.fromConfig(value.permission))` 叠加。[@ref-kilo-code-agents-src-merge] 额外透传选项同样进入 `options` 并最终转发给 provider。[@ref-kilo-code-agents-options]

`permission` 控制子代理能用哪些工具：每条工具权限可取 `"allow"`（无需批准）、`"ask"`（运行前请求批准）、`"deny"`（彻底禁用）。bash 命令可用 glob 按命令设权限，规则按顺序求值、最后匹配的规则生效。还可用 `permission.task` 控制某 agent 能调用哪些子代理。[@ref-kilo-code-agents-permissions]

```json
{
  "agent": {
    "orchestrator": {
      "mode": "primary",
      "permission": {
        "task": { "*": "deny", "code-reviewer": "allow", "docs-writer": "allow" },
        "bash": { "*": "ask", "git diff": "allow", "git log*": "allow" }
      }
    }
  }
}
```
（依据 [@ref-kilo-code-agents-permissions]）

## 边界与诊断 {#custom-agents-limits}

- **非交互子代理。** primary 经 Task 工具调用子代理时，子代理不能直接向最终用户提问；它仍可使用被允许的工具，并通过结果、共享文件或看板沟通。前台任务在父代理继续前返回结果；后台任务设 `background: true`，立即返回、完成后把结果投递给父代理。[@ref-kilo-code-agents-what]
- **委派授权。** 可用 `permission.task` 限制某个 agent 能调用哪些子代理（例如只允许 `code-reviewer` 与 `docs-writer`，其余 `deny`）；被拒绝的目标无法委派。[@ref-kilo-code-agents-permissions]
- **列出 agent。** `kilo agent list` 显示全部内建与自定义 agent，并列出每个 agent 的名称、mode 与权限配置。[@ref-kilo-code-agents-invoke][@ref-kilo-code-cli-agent-cmd]
- **改动生效。** `/reload` 会从磁盘重新加载 agents 等配置；运行中的项目会话会拒绝 reload。[@ref-kilo-code-cli-slash]

**嵌套深度（partial）。** 源码 `packages/opencode/src/tool/task.ts` 在委派前逐层累加 `depth`，达到 `cfg.subagent_depth ?? 1` 时拒绝继续委派，错误文本为 ``Subagent depth limit reached (1). Increase "subagent_depth" to allow nested subagents.``；同一次调用是否把 `task` 工具暴露给子代理也由 `depth + 1 < (cfg.subagent_depth ?? 1)` 决定，因此**默认值 1 表示不允许嵌套子代理**，提高 `subagent_depth` 才能开启嵌套 [@ref-kilo-code-agents-src-task]。

**缺口**：固定来源没有给出并发子代理数量上限、单次委派的超时/持续时间上限（前台任务无限等待直到返回）或子代理的上下文预算；`steps` 只作用于 agent 自身的循环次数。这些点没有可引用证据，保持未验证 [@ref-kilo-code-agents-options]。
