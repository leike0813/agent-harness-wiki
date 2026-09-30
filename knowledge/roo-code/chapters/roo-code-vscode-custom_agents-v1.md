---
schema_version: 3
record_kind: production
edition_id: roo-code-vscode-custom_agents-v1
harness_id: roo-code
topic: custom_agents
title: "Roo Code 的自定义模式（自定义 Agent）：定义文件、字段与校验、内置模式关系、委派、覆盖与限制"
sections:
  - section_id: agents-entry
    surface_ids: [vscode]
    source_refs: [ref-roo-agents-code-roomodes-path, ref-roo-agents-code-global-path, ref-roo-agents-code-parse, ref-roo-agents-code-schema-gate, ref-roo-agents-code-json-migration, ref-roo-agents-doc-methods, ref-roo-agents-doc-props, ref-roo-agents-code-schema, ref-roo-agents-doc-importexport]
  - section_id: agents-format
    surface_ids: [vscode]
    source_refs: [ref-roo-agents-code-schema, ref-roo-agents-doc-props, ref-roo-agents-code-toolgroups, ref-roo-agents-code-groups, ref-roo-agents-code-json-schema, ref-roo-agents-doc-regex]
  - section_id: agents-roles
    surface_ids: [vscode]
    source_refs: [ref-roo-agents-code-defaultmodes, ref-roo-agents-code-modeselect, ref-roo-agents-doc-precedence, ref-roo-agents-code-getallmodes, ref-roo-modes-doc-builtin]
  - section_id: agents-invocation
    surface_ids: [vscode]
    source_refs: [ref-roo-modes-doc-switch, ref-roo-agents-code-switchmode, ref-roo-agents-code-newtask, ref-roo-agents-code-delegate, ref-roo-boomerang-doc-how]
  - section_id: agents-overrides
    surface_ids: [vscode]
    source_refs: [ref-roo-agents-code-toolallow, ref-roo-agents-code-filerestriction, ref-roo-agents-code-frerror, ref-roo-agents-code-modeapiconfig, ref-roo-agents-code-modeswitch, ref-roo-agents-code-merge, ref-roo-agents-doc-precedence, ref-roo-agents-code-rules-order, ref-roo-agents-doc-rules, ref-roo-agents-code-generic-rules, ref-roo-agents-code-agents-md, ref-roo-agents-code-roodirs, ref-roo-agents-code-delegate, ref-roo-agents-code-newtask]
  - section_id: agents-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-roo-agents-code-modes-list, ref-roo-agents-code-watch-settings, ref-roo-agents-code-watch-roomodes, ref-roo-agents-code-getmodes, ref-roo-agents-code-schema-gate, ref-roo-agents-code-switchmode, ref-roo-agents-code-frerror, ref-roo-agents-doc-troubleshooting]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [vscode]
        section_id: agents-entry
        status: answered
        source_refs: [ref-roo-agents-code-roomodes-path, ref-roo-agents-code-global-path, ref-roo-agents-code-schema-gate]
  - question_id: agents.format
    answers:
      - surface_ids: [vscode]
        section_id: agents-format
        status: answered
        source_refs: [ref-roo-agents-code-schema, ref-roo-agents-code-groups, ref-roo-agents-code-toolgroups]
  - question_id: agents.roles
    answers:
      - surface_ids: [vscode]
        section_id: agents-roles
        status: answered
        source_refs: [ref-roo-agents-code-defaultmodes, ref-roo-agents-code-modeselect, ref-roo-agents-code-getallmodes]
  - question_id: agents.invocation
    answers:
      - surface_ids: [vscode]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-roo-agents-code-newtask, ref-roo-agents-code-switchmode, ref-roo-agents-code-delegate]
  - question_id: agents.overrides
    answers:
      - surface_ids: [vscode]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-roo-agents-code-toolallow, ref-roo-agents-code-filerestriction, ref-roo-agents-code-modeapiconfig, ref-roo-agents-code-merge]
  - question_id: agents.limits
    answers:
      - surface_ids: [vscode]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-roo-agents-code-delegate, ref-roo-agents-code-newtask]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-roo-agents-code-modes-list, ref-roo-agents-code-watch-settings, ref-roo-agents-code-schema-gate]
---

## 自定义模式的定义位置与作用域 {#agents-entry}

Roo Code 里"自定义 Agent"就是**模式（mode）**：一套角色定义、指令、工具组与文件权限的命名组合。固定来源为官方仓库提交 `b867ec9145750d0ae1ff7f02d35406e9bf2a0b16`，本章只描述 `vscode` 界面（扩展清单在 `src/package.json`）。

模式定义只有两个文件来源，没有插件式来源：[@ref-roo-agents-code-roomodes-path][@ref-roo-agents-code-global-path]

| 作用域 | 文件 | 说明 |
| :-- | :-- | :-- |
| 项目 | `工作区根/.roomodes` | 工作区根目录，可 YAML 可 JSON；文件不存在时不报错 |
| 全局 | `SETTINGS_DIR/custom_modes.yaml` | `SETTINGS_DIR` = `globalStorageUri.fsPath` 下的 `settings/`，可被 `roo-cline.customStoragePath` 改写 |

该路径取第一个工作区文件夹，若编辑器里有打开的文件，则取该文件所属的工作区文件夹——多根工作区下只有其中一个 `.roomodes` 生效。[@ref-roo-agents-code-roomodes-path]

解析顺序是"先 YAML，失败后仅对 `.roomodes` 退回 JSON"：`parseYamlSafely` 去掉 BOM、清理不可见字符后调用 `yaml.parse`；解析抛错且文件以 `.roomodes` 结尾时才尝试 `JSON.parse`，全局文件不会走 JSON 回退（不过合法 JSON 本身也是合法 YAML）。[@ref-roo-agents-code-parse]

两个文件都必须给出 `{ customModes: [...] }` 结构并通过 Zod 校验，否则返回空列表；写入时每条模式按文件路径打上 `source`（`.roomodes` → `project`，全局文件 → `global`）。[@ref-roo-agents-code-schema-gate]

旧的全局 `custom_modes.json` 在扩展激活时被迁移为 `custom_modes.yaml`，且仅当 YAML 尚不存在时执行，原 JSON 保留以便回滚。[@ref-roo-agents-code-json-migration]

界面上有两条等价入口：Modes 页面里的"Edit Global Modes"打开 `settings/custom_modes.yaml`，"Edit Project Modes (.roomodes)"打开工作区文件；也可以直接用 UI 表单或让 Roo 代写。[@ref-roo-agents-doc-methods]

最小项目配置（示例与字段名取自文档 "YAML/JSON Property Details"，键名与 Zod schema 一致）[@ref-roo-agents-doc-props][@ref-roo-agents-code-schema]：

```yaml
customModes:
  - slug: docs-writer
    name: 📝 Documentation Writer
    description: Writes and edits technical documentation.
    roleDefinition: You are a technical writer specializing in clear documentation.
    whenToUse: Use this mode for writing and editing documentation.
    customInstructions: Focus on clarity and completeness.
    groups:
      - read
      - - edit
        - fileRegex: \.(md|mdx)$
          description: Markdown files only
```

导入导出走 `Export/Import Mode`：导出把模式配置与 `.roo/rules-{slug}/` 里的规则一起写进一个 YAML，`rulesFiles` 字段承载规则内容与相对路径；导入时可选择项目级或全局级，并把规则写回对应目录。[@ref-roo-agents-doc-importexport]

## 模式记录格式、字段与校验 {#agents-format}

模式记录的 Zod 定义（`modeConfigSchema`）：[@ref-roo-agents-code-schema]

```ts
slug: z.string().regex(/^[a-zA-Z0-9-]+$/, "Slug must contain only letters numbers and dashes"),
name: z.string().min(1),
roleDefinition: z.string().min(1),
whenToUse: z.string().optional(),
description: z.string().optional(),
customInstructions: z.string().optional(),
groups: groupEntryArraySchema,
source: z.enum(["global", "project"]).optional(),
```

必需字段是 `slug`、`name`、`roleDefinition`、`groups`；`whenToUse`、`description`、`customInstructions` 可选；`source` 由系统写入，用户不必也不应手填（文档同样说明了这一点）。同一文件的 slug 不允许重复，`groups` 内不允许重复条目。[@ref-roo-agents-code-schema][@ref-roo-agents-doc-props]

`groups` 的取值集合是 `read`、`edit`、`command`、`mcp`、`modes`；已废弃的 `browser` 会在校验前被静默剥离，因此旧配置不会因此报错。[@ref-roo-agents-code-toolgroups][@ref-roo-agents-code-groups]

条目有两种写法：字符串（如 `"edit"`）表示不设限制，二元组 `["edit", { fileRegex, description }]` 表示带文件限制；`fileRegex` 在 schema 层会用 `new RegExp(...)` 试编译，非法表达式直接报 `Invalid regular expression pattern`。[@ref-roo-agents-code-groups]

`.roomodes` 另有一份生成的 JSON Schema（`schemas/roomodes.json`，由 `packages/types/src/roomodes-schema.ts` 生成）供编辑器补全；它额外允许导入导出用的 `rulesFiles`，并把顶层对象设为严格模式（多写未知键会校验失败）。[@ref-roo-agents-code-json-schema]

`fileRegex` 匹配的是相对工作区根的完整路径，区分大小写；JSON 里反斜杠要双写，YAML 未加引号时单写即可。[@ref-roo-agents-doc-regex]

## 内置模式与自定义模式的关系 {#agents-roles}

内置模式不在 `.roomodes` 或 `custom_modes.yaml` 里，而是编译进扩展的 `DEFAULT_MODES`，共五个 slug：`architect`（也是 `defaultModeSlug`）、`code`、`ask`、`debug`、`orchestrator`。[@ref-roo-agents-code-defaultmodes][@ref-roo-agents-code-modeselect]

解析规则：`getModeBySlug` 先查自定义模式、再查内置；`getAllModes` 在 slug 相同时用自定义模式**整体替换**内置模式，否则追加。因此"覆盖内置模式"就是写一个同 slug 的自定义模式，属性不会做字段级合并。[@ref-roo-agents-code-modeselect][@ref-roo-agents-doc-precedence]

自定义模式与内置模式用同一套机制：同一份 schema、同一个模式选择器、同一套工具组与规则目录，区别只在来源文件与 `source` 标记；没有单独的"内置扩展模式"类型。[@ref-roo-agents-code-getallmodes]

内置模式的能力边界（帮助读者判断覆盖时要改什么）：`code` 与 `debug` 拥有全部工具组；`ask` 只有 `read` 与 `mcp`；`architect` 是 `read`+`mcp`+受限 `edit`（仅 markdown）；`orchestrator` 没有直接工具组，靠 `new_task` 委派。[@ref-roo-modes-doc-builtin]

## 调用与委派 {#agents-invocation}

用户侧有四种显式入口：模式下拉框、`/architect` 这类斜杠命令、循环切换快捷键（macOS `⌘+.`，Windows/Linux `Ctrl+.`）、以及接受模型给出的模式切换建议。[@ref-roo-modes-doc-switch]

模型侧有两个工具：

- `switch_mode`：校验 `mode_slug` 是否存在、拒绝切到当前模式、请求用户批准，然后调用 `provider.handleModeSwitch(mode_slug)`，并等待 500ms 让切换落到下一个工具调用之前。[@ref-roo-agents-code-switchmode]
- `new_task`：校验 `mode`、`message`，在 `roo-cline.newTaskRequireTodos` 为真时还要求给出 todo 清单；用 `getModeBySlug(mode, state.customModes)` 确认目标模式存在，然后调用 `provider.delegateParentAndOpenChild({...})`——**子任务的模式由调用参数显式指定**，不是继承父任务。[@ref-roo-agents-code-newtask]

委派的执行链：先冲刷父任务的待处理工具结果，再销毁父任务以满足"同一时刻只有一个打开的任务"的不变式，随后把 provider 切到子任务的模式，最后创建子任务并给父任务打上 `status: "delegated"`、`delegatedToId`、`awaitingChildId` 元数据。[@ref-roo-agents-code-delegate]

内置的 `orchestrator`（文档称 Boomerang 模式）就是这套委派的固定用法：它本身没有文件读写权限，只是把工作拆给其它模式执行，子任务完成后回到父任务。[@ref-roo-boomerang-doc-how]

## 每模式的工具、权限、模型与继承 {#agents-overrides}

- **工具组**：`read` 对应 `read_file`/`search_files`/`list_files`/`codebase_search`；`edit` 对应 `apply_diff`/`write_to_file`/`generate_image`（自定义工具也归入此组）；`command` 对应 `execute_command`/`read_command_output`；`mcp` 对应 `use_mcp_tool`/`access_mcp_resource`；`modes` 对应 `switch_mode`/`new_task`。
- **始终可用的工具**（不受组限制）：`switch_mode`、`new_task`、`attempt_completion`、`ask_followup_question`、`update_todo_list`、`run_slash_command`、`skill`。[@ref-roo-agents-code-toolallow]
- **文件权限**：`fileRegex` 只对 `edit` 组生效，且只在真正的写操作上校验（读取工具不受限）；单个文件路径或 `apply_patch` 里每个 `*** ... File:` 路径都会被检查，不匹配即抛 `FileRestrictionError`，错误里带上模式名、允许的模式串、描述、被拒路径与工具名。[@ref-roo-agents-code-filerestriction][@ref-roo-agents-code-frerror]
- **模型与配置档案**：模式记录里**没有**模型字段。模型选择存在独立的 `modeApiConfigs`：`{ [modeSlug]: configId }`，与 API 配置档案表一起序列化后存进 VS Code 的 SecretStorage。[@ref-roo-agents-code-modeapiconfig] 切换模式时 `handleModeSwitch` 读取该模式的档案 id 并激活对应配置；工作区状态里的 `lockApiConfigAcrossModes` 为真时会跳过这次切换。[@ref-roo-agents-code-modeswitch]
- **作用域覆盖**：合并按 slug 整体覆盖，项目 `.roomodes` 优先，全局文件里同 slug 的模式被丢弃，不做字段级合并。[@ref-roo-agents-code-merge][@ref-roo-agents-doc-precedence]

**指令文件的解析顺序**（模式专有指令是覆盖里最常改的部分）：[@ref-roo-agents-code-rules-order]

1. `.roo/rules-{slug}/`：遍历 `~/.roo` 再 `项目根/.roo`（开启 `enableSubfolderRules` 时还含各子目录的 `.roo`），目录内文件递归读取、按文件名（大小写不敏感）排序拼接；符号链接最多展开 5 层。
2. 若上述目录都没有内容，退回工作区根的单个文件 `.roorules-{slug}`，再退回旧格式 `.clinerules-{slug}`。[@ref-roo-agents-doc-rules]
3. 通用规则同理：`.roo/rules/` 目录组优先，其后才是 `.roorules`、`.clinerules`。[@ref-roo-agents-code-generic-rules]
4. 由 `roo-cline.useAgentRules`（默认 `true`）控制是否加载 `AGENTS.md`（其次是 `AGENT.md`，另外总是尝试 `AGENTS.local.md`）。[@ref-roo-agents-code-agents-md]
5. 目录顺序由 `getRooDirectoriesForCwd` 给出：全局 `~/.roo` 在前、项目 `项目根/.roo` 在后，因此项目内容排在后面、优先级更高。[@ref-roo-agents-code-roodirs]

最终拼进系统提示的 `Rules:` 顺序是：模式专有规则 → `.rooignore` 说明 → AGENTS.md → 通用规则。[@ref-roo-agents-code-rules-order]

**规模限制的实际情况**：这批固定来源里没有子任务嵌套深度、递归层数或并发上限的常量；`new_task` 可以链式继续嵌套。真正的约束是"单一打开任务"不变式（父任务在委派时被销毁）加上用户批准，而不是深度计数。[@ref-roo-agents-code-delegate][@ref-roo-agents-code-newtask] 这段判断基于对 `delegateParentAndOpenChild` 与 `new_task` 的完整阅读；除此之外没有找到其它守卫。

## 诊断与生效 {#agents-diagnostics}

- **是否被发现**：模式列表由 `getModes()` 组装为 `[...DEFAULT_MODES, ...customModes]`，UI 的模式选择器与 Modes 页面都用这份状态；如果自定义模式没出现，先确认文件通过校验。[@ref-roo-agents-code-modes-list]
- **是否生效**：`CustomModesManager` 对全局设置文件和 `.roomodes` 各装一个 `FileSystemWatcher`，create/change/delete 都触发重新读取并回写 `customModes` 状态，因此改文件后**不需要重载窗口**；`.roomodes` 被删除时退回只用全局模式。[@ref-roo-agents-code-watch-settings][@ref-roo-agents-code-watch-roomodes]
- **读取有缓存**：`getCustomModes()` 有 10 秒缓存窗口，紧接着改文件再读可能拿到旧列表，稍等或触发一次文件事件即可。[@ref-roo-agents-code-getmodes]
- **语法/校验错误**：YAML 解析失败会以可定位的错误提示（含行号）报出，Zod 校验失败会列出每条 issue 的路径与信息；全局文件格式非法时另有专门提示。[@ref-roo-agents-code-schema-gate]
- **调用失败**：目标 slug 不存在时 `switch_mode`/`new_task` 返回 `Invalid mode: {slug}`；编辑文件被拒时返回 `FileRestrictionError`（包含允许的正则与说明），据此可判断是权限而非模式发现问题。[@ref-roo-agents-code-switchmode][@ref-roo-agents-code-frerror]
- **文档排障清单**：模式不出现时先检查是否需要在模式选择器里刷新或重载窗口；`fileRegex` 写错会有 "Invalid regular expression pattern"；同名 slug 是整体覆盖而非合并。[@ref-roo-agents-doc-troubleshooting]
