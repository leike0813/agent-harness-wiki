---
schema_version: 3
record_kind: production
edition_id: zoo-code-vscode-custom_agents-v1
harness_id: zoo-code
topic: custom_agents
title: "Zoo Code VS Code 扩展的自定义模式（自定义 Agent）：定义、委派与覆盖"
sections:
  - section_id: agents-entry
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-modes-precedence, ref-zoo-code-src-global-file-names, ref-zoo-code-src-modes-path, ref-zoo-code-docs-modes-migration, ref-zoo-code-src-modes-merge]
  - section_id: agents-format
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-modes-parse, ref-zoo-code-src-mode-schema, ref-zoo-code-schema-roomodes, ref-zoo-code-docs-modes-fields, ref-zoo-code-docs-modes-included, ref-zoo-code-docs-modes-regex]
  - section_id: agents-roles
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-using-modes, ref-zoo-code-src-default-modes, ref-zoo-code-docs-modes-precedence, ref-zoo-code-docs-orchestrator, ref-zoo-code-src-new-task, ref-zoo-code-docs-modes-importexport, ref-zoo-code-docs-boomerang-faq]
  - section_id: agents-invocation
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-modes-fields, ref-zoo-code-docs-switch-modes, ref-zoo-code-src-new-task, ref-zoo-code-docs-boomerang, ref-zoo-code-docs-profiles-modes]
  - section_id: agents-overrides
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-mode-schema, ref-zoo-code-docs-profiles-modes, ref-zoo-code-docs-profiles-sticky, ref-zoo-code-docs-modes-instructions, ref-zoo-code-docs-modes-importexport, ref-zoo-code-docs-modes-precedence, ref-zoo-code-src-modes-merge]
  - section_id: agents-limits
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-boomerang-considerations, ref-zoo-code-docs-boomerang, ref-zoo-code-docs-modes-trouble, ref-zoo-code-src-modes-parse, ref-zoo-code-docs-modes-regex, ref-zoo-code-docs-modes-instructions]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [vscode]
        section_id: agents-entry
        status: answered
        source_refs: [ref-zoo-code-docs-modes-precedence, ref-zoo-code-src-global-file-names, ref-zoo-code-src-modes-path, ref-zoo-code-docs-modes-migration, ref-zoo-code-src-modes-merge]
  - question_id: agents.format
    answers:
      - surface_ids: [vscode]
        section_id: agents-format
        status: answered
        source_refs: [ref-zoo-code-src-modes-parse, ref-zoo-code-src-mode-schema, ref-zoo-code-schema-roomodes, ref-zoo-code-docs-modes-fields, ref-zoo-code-docs-modes-included, ref-zoo-code-docs-modes-regex]
  - question_id: agents.roles
    answers:
      - surface_ids: [vscode]
        section_id: agents-roles
        status: answered
        source_refs: [ref-zoo-code-docs-using-modes, ref-zoo-code-src-default-modes, ref-zoo-code-docs-modes-precedence, ref-zoo-code-docs-orchestrator, ref-zoo-code-src-new-task, ref-zoo-code-docs-modes-importexport, ref-zoo-code-docs-boomerang-faq]
  - question_id: agents.invocation
    answers:
      - surface_ids: [vscode]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-zoo-code-docs-modes-fields, ref-zoo-code-docs-switch-modes, ref-zoo-code-src-new-task, ref-zoo-code-docs-boomerang, ref-zoo-code-docs-profiles-modes]
  - question_id: agents.overrides
    answers:
      - surface_ids: [vscode]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-zoo-code-src-mode-schema, ref-zoo-code-docs-profiles-modes, ref-zoo-code-docs-profiles-sticky, ref-zoo-code-docs-modes-instructions, ref-zoo-code-docs-modes-importexport, ref-zoo-code-docs-modes-precedence, ref-zoo-code-src-modes-merge]
  - question_id: agents.limits
    answers:
      - surface_ids: [vscode]
        section_id: agents-limits
        status: partial
        source_refs: [ref-zoo-code-docs-boomerang-considerations, ref-zoo-code-docs-boomerang, ref-zoo-code-docs-modes-trouble, ref-zoo-code-src-modes-parse, ref-zoo-code-docs-modes-regex, ref-zoo-code-docs-modes-instructions]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: agents-limits
        status: answered
        source_refs: [ref-zoo-code-docs-boomerang-considerations, ref-zoo-code-docs-boomerang, ref-zoo-code-docs-modes-trouble, ref-zoo-code-src-modes-parse, ref-zoo-code-docs-modes-regex, ref-zoo-code-docs-modes-instructions]
---

本章采写 Zoo Code 的「自定义 Agent」机制——即产品的 **Modes**：定义位置、字段与校验、内置模式与角色关系、调用与委派、覆盖规则、边界与诊断。固定来源是 Zoo-Code 仓库固定 commit `bf3bc781b813a2a6cbdb29dfd7c86f423589090e` 上的 `src/core/config/CustomModesManager.ts`、`packages/types/src/mode.ts`、`schemas/roomodes.json`、`src/core/tools/NewTaskTool.ts`，以及 Zoo-Code-Docs 仓库固定 commit `dfd2628c31073ec6b111bfedbcd071d197d37ad2` 上的 `docs/features/custom-modes.mdx`、`docs/basic-usage/using-modes.md`、`docs/features/boomerang-tasks.mdx`。

## 定义位置与作用域 {#agents-entry}

自定义模式有两级、两种文件格式：

| 层级 | 文件 | 打开方式 |
| --- | --- | --- |
| 全局（所有工作区） | 扩展全局存储目录 `settings/` 下的 `custom_modes.yaml`（旧名 `custom_modes.json`） | Modes 页 → Edit Global Modes [@ref-zoo-code-docs-modes-precedence] |
| 项目（当前工作区） | 工作区根 `.roomodes`，可为 YAML 或 JSON | Modes 页 → Edit Project Modes [@ref-zoo-code-docs-modes-precedence] |

- 全局文件名来自 `GlobalFileNames.customModes`，即 `custom_modes.yaml`；路径由设置目录决定，与 MCP 的 `mcp_settings.json` 同目录 [@ref-zoo-code-src-global-file-names] [@ref-zoo-code-src-modes-path]。文件不存在时会被创建为 `customModes: []` [@ref-zoo-code-src-modes-path]。
- 生效顺序是：项目 `.roomodes` → 全局 `custom_modes.yaml` → 内置默认模式；项目与全局出现相同 `slug` 时，**项目版本整体覆盖**全局版本，不做字段合并 [@ref-zoo-code-docs-modes-precedence]。
- 全局侧还有一次自动迁移：启动时若存在 `custom_modes.json` 且不存在 `custom_modes.yaml`，就把 JSON 转成 YAML 并保留原文件以便回滚；`.roomodes` 不做启动迁移，只在通过 UI 编辑时改写为 YAML [@ref-zoo-code-docs-modes-migration]。
- 项目模式与全局模式都会合并进同一份运行期模式列表，并在记录里标注来源（`source: project` / `global`）[@ref-zoo-code-src-modes-merge]。

## 字段、格式与校验 {#agents-format}

解析器对同一份内容先按 YAML 解析，`.roomodes` 失败时再退化为 JSON 解析；两次都失败就报错而不覆盖文件 [@ref-zoo-code-src-modes-parse]。第一方字段（依据 `packages/types/src/mode.ts` 与 `schemas/roomodes.json`）[@ref-zoo-code-src-mode-schema] [@ref-zoo-code-schema-roomodes]：

| 字段 | 必填 | 约束与用途 |
| --- | --- | --- |
| `slug` | 是 | 仅字母、数字、连字符（`^[a-zA-Z0-9-]+$`），用于引用模式与定位 `.roo/rules-{slug}/` [@ref-zoo-code-docs-modes-fields] |
| `name` | 是 | 界面显示名，至少 1 字符 [@ref-zoo-code-src-mode-schema] |
| `roleDefinition` | 是 | 角色定义，置于系统提示词开头 [@ref-zoo-code-docs-modes-fields] |
| `description` | 否 | 模式选择器里的短摘要，不参与自动决策 [@ref-zoo-code-docs-modes-fields] |
| `whenToUse` | 否 | 供自动决策（模式切换与任务编排）使用的场景说明；留空时退化为 `roleDefinition` 的第一句 [@ref-zoo-code-docs-modes-fields] |
| `customInstructions` | 否 | 追加在系统提示词后部的行为准则 [@ref-zoo-code-docs-modes-included] |
| `groups` | 是 | 工具组数组，元素为字符串或 `[组名, 选项]` 二元组；同组不得重复 [@ref-zoo-code-src-mode-schema] |
| `allowedMcpServers` | 否 | 该模式可用的 MCP server 名单，省略=全部，空数组=全禁 [@ref-zoo-code-src-mode-schema] |
| `source` | 否 | 由系统写入的 `global`/`project` 标记，不应手工设置 [@ref-zoo-code-docs-modes-fields] |

- `groups` 的合法组名是 `read`、`edit`、`command`、`mcp`、`modes`、`browser`；旧配置里已废弃的组会在校验前被剔除以保证向后兼容 [@ref-zoo-code-schema-roomodes] [@ref-zoo-code-src-mode-schema]。
- 仅 `edit` 组支持带选项的元组形式，选项为 `fileRegex`（正则字符串，非法正则在 schema 层被拒）与可选 `description`；正则匹配的是相对工作区根的完整路径，且大小写敏感、默认区分大小写 [@ref-zoo-code-src-mode-schema] [@ref-zoo-code-docs-modes-regex]。
- 同一文件内 `slug` 不得重复，重复会被 schema 拒绝 [@ref-zoo-code-src-mode-schema]。

```yaml
# 依据 docs/features/custom-modes.mdx 的 YAML Example
customModes:
  - slug: docs-writer
    name: 📝 Documentation Writer
    description: A specialized mode for writing and editing technical documentation.
    roleDefinition: You are a technical writer specializing in clear documentation.
    whenToUse: Use this mode for writing and editing documentation.
    customInstructions: Focus on clarity and completeness in documentation.
    groups:
      - read
      - - edit
        - fileRegex: \.(md|mdx)$
          description: Markdown files only
```

## 内置角色与自定义角色的关系 {#agents-roles}

内置模式有五个：`architect`、`code`、`ask`、`debug`、`orchestrator`，官方文档逐项说明各模式的用途与适用场景 [@ref-zoo-code-docs-using-modes]；任何一个都可以被同名 `slug` 的自定义模式整体替换 [@ref-zoo-code-src-default-modes] [@ref-zoo-code-docs-modes-precedence]。

| slug | 名称 | 默认工具组 |
| --- | --- | --- |
| `architect` | 🏗️ Architect | `read`、`edit`（仅 `\.md$`）、`mcp` [@ref-zoo-code-src-default-modes] |
| `code` | 💻 Code | `read`、`edit`、`command`、`mcp` [@ref-zoo-code-src-default-modes] |
| `ask` | ❓ Ask | `read`、`mcp` [@ref-zoo-code-src-default-modes] |
| `debug` | 🪲 Debug | `read`、`edit`、`command`、`mcp` [@ref-zoo-code-src-default-modes] |
| `orchestrator` | 🪃 Orchestrator | 空（无文件、命令与 MCP 能力）[@ref-zoo-code-src-default-modes] |

- 「主 Agent / 子 Agent」不是两套定义机制：委派由 Orchestrator 模式用 `new_task` 工具发起，被委派的模式仍是普通模式，只是以子任务形式运行 [@ref-zoo-code-docs-orchestrator] [@ref-zoo-code-src-new-task]。
- 从 marketplace 安装的模式与手工编写的模式进入同一份配置（`.roomodes` 或全局 `custom_modes.yaml`），没有单独的插件式角色实现 [@ref-zoo-code-docs-modes-importexport]。
- Orchestrator 默认没有 `read`/`edit`/`command`/`mcp` 组，官方给出的理由是避免文件读取污染上下文；要放开能力就用同名 `slug` 覆盖它并补齐 `groups` [@ref-zoo-code-docs-boomerang-faq]。

## 调用与委派 {#agents-invocation}

- 用户显式切换：模式选择器（chatbox 下方的 Mode 菜单）或 `switch_mode` 工具；`whenToUse` 是自动切换时的依据，`description` 只用于界面 [@ref-zoo-code-docs-modes-fields] [@ref-zoo-code-docs-switch-modes]。
- 自动委派只发生在 Orchestrator 模式：它把任务拆成子任务，用 `new_task` 工具指定目标模式与初始说明；`new_task` 走的是审批流程，未获批准不会创建子任务 [@ref-zoo-code-src-new-task] [@ref-zoo-code-docs-boomerang]。
- 子任务创建后父任务暂停，子任务在独立会话里跑完后父任务只用子任务的完成摘要继续 [@ref-zoo-code-docs-boomerang]。
- 子任务也可以由用户在任意模式下手工创建；`new_task` 的目标模式由参数指定 [@ref-zoo-code-src-new-task]。
- 每个模式的最后使用的模型/配置档案会被记住（Sticky Models），无需重复配置即可在不同任务间切换 [@ref-zoo-code-docs-profiles-modes]。

## 覆盖规则与可定制项 {#agents-overrides}

- 可覆盖的范围限于模式自身的字段：工具组、文件正则限制、MCP 白名单、角色定义与指令文本；模式配置里没有模型或 provider 字段 [@ref-zoo-code-src-mode-schema]。
- 模型与 provider 通过 **API 配置档案**选择，而不是写在模式里：Prompts 页可以把某个档案显式绑定到某个模式，系统同时记住“上次在该模式下使用的档案” [@ref-zoo-code-docs-profiles-modes]。
- 子任务会继承父任务启动时的档案并在其生命周期内保持不变，避免任务中途换模型 [@ref-zoo-code-docs-profiles-sticky]。
- 指令可以来自三处并叠加：模式字段 `customInstructions`、工作区 `.roo/rules-{slug}/` 目录（优先，递归读取并按文件名排序）与根目录单文件 `.roorules-{slug}`（仅当目录不存在或为空时生效）[@ref-zoo-code-docs-modes-instructions]。
- 导入/导出会把模式与 `.roo/rules-{slug}/` 下的规则打包成一个 YAML，导入时可选 project 或 global 层级；`slug` 变更时导入流程会同步改写规则路径 [@ref-zoo-code-docs-modes-importexport]。
- 覆盖是同名整体替换：项目 `.roomodes` 里的 `code` 会屏蔽全局 `code` 的一切属性 [@ref-zoo-code-docs-modes-precedence] [@ref-zoo-code-src-modes-merge]。

## 边界、生效条件与诊断 {#agents-limits}

- 上下文边界：子任务不与父任务共享上下文，下行靠 `new_task` 的 `message`，上行只有 `attempt_completion` 的 `result` 摘要；父任务不会看到子任务的文件读写过程 [@ref-zoo-code-docs-boomerang-considerations]。
- 审批边界：默认每次创建与完成子任务都要用户确认，可在自动批准设置里把 Subtasks 打开以省去确认 [@ref-zoo-code-docs-boomerang-considerations]。
- 固定来源没有给出子任务并发数、嵌套深度或持续时间的硬上限；能确认的只有「子任务独立上下文、结果只回传摘要」这一隔离模型与逐次审批流程 [@ref-zoo-code-docs-boomerang] [@ref-zoo-code-docs-boomerang-considerations]。并发与嵌套上限属于未验证项。
- 模式未出现时的排查顺序：确认写入的是项目 `.roomodes` 或全局 `custom_modes.yaml`（同名 slug 会整体覆盖）→ 确认 YAML/JSON 语法有效（解析失败会弹出带行号的错误且不覆盖原文件）→ 确认必需字段 `slug`/`name`/`roleDefinition`/`groups` 齐全 → 必要时重载 VS Code 窗口 [@ref-zoo-code-docs-modes-trouble] [@ref-zoo-code-src-modes-parse]。
- 正则在编辑被拦截时会抛出 `FileRestrictionError`，错误信息包含模式名、允许的模式串、描述与试图编辑的路径，可据此定位是 `fileRegex` 挡住的操作 [@ref-zoo-code-docs-modes-regex]。
- 模式专属指令“不生效”时，优先确认 `.roo/rules-{slug}/` 与 `.roorules-{slug}` 的优先级关系（目录优先），以及 `slug` 与目录名是否一致 [@ref-zoo-code-docs-modes-instructions]。
