---
schema_version: 3
record_kind: production
edition_id: kiro-cli-hooks-v1
harness_id: kiro
topic: hooks
title: "Kiro CLI 的事件驱动 Hooks"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-kiro-hooks-intro, ref-kiro-hookmigration-triggers, ref-kiro-hooxtypes-availability, ref-kiro-hooxtypes-prompt, ref-kiro-hooxtypes-stop, ref-kiro-hooxtypes-sessionstart, ref-kiro-hooxtypes-pretool, ref-kiro-hooxtypes-filecreate, ref-kiro-hooxtypes-mcp]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-kiro-hooks-how, ref-kiro-hooks-location, ref-kiro-config-paths, ref-kiro-hooks-schema, ref-kiro-hookmigration-matcher, ref-kiro-agentref-hooks, ref-kiro-hooks-setup]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-kiro-hooxtypes-prompt, ref-kiro-hookmigration-format, ref-kiro-hooxtypes-pretool, ref-kiro-hooxtypes-mcp, ref-kiro-hookactions-shell, ref-kiro-hooxtypes-stop, ref-kiro-hooks-confirm, ref-kiro-hookactions-select]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-kiro-hooks-schema, ref-kiro-config-conflicts, ref-kiro-hookactions-shell, ref-kiro-hookmgmt-manage, ref-kiro-hooxtypes-pretool, ref-kiro-hookactions-select, ref-kiro-2x-hooks, ref-kiro-hooks-prev]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-kiro-hooks-schema, ref-kiro-hookmgmt-manage, ref-kiro-hooks-how, ref-kiro-hooks-prev, ref-kiro-2x-hooks, ref-kiro-hooxtypes-availability]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kiro-hooktrouble, ref-kiro-hooks-how, ref-kiro-hookmgmt-manage, ref-kiro-slash-config]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-kiro-hookmigration-triggers, ref-kiro-hooxtypes-availability]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-kiro-hooks-location, ref-kiro-hooks-schema, ref-kiro-agentref-hooks]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-kiro-hooxtypes-prompt, ref-kiro-hookmigration-format, ref-kiro-hooxtypes-pretool]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-kiro-hookactions-shell, ref-kiro-hooxtypes-stop, ref-kiro-hooks-confirm]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: conflict
        source_refs: [ref-kiro-hooks-schema, ref-kiro-hookactions-shell, ref-kiro-hookmgmt-manage, ref-kiro-config-conflicts]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: partial
        source_refs: [ref-kiro-hooks-schema, ref-kiro-hooks-how, ref-kiro-hooxtypes-availability]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-kiro-hooktrouble, ref-kiro-hookmgmt-manage]
---

## 事件与触发点 {#hooks-events}

Hook 的官方定义：在会话中发生特定事件（agent 改文件、调用工具、完成任务）时自动执行 shell 命令或 agent 提示；你定义触发器和动作，Kiro 负责执行。[@ref-kiro-hooks-intro]

**CLI 3.0 的触发器全集**由迁移页的 "Trigger reference" 给出（该表同时标注哪些触发器可阻断）：[@ref-kiro-hookmigration-triggers]

| 触发器 | 触发时点 | matcher 匹配对象 | 可阻断 |
| :-- | :-- | :-- | :--: |
| `SessionStart` | 会话开始 | 不评估 | 否 |
| `Stop` | 会话结束 | 不评估 | 否 |
| `PreToolUse` | 工具执行前 | 工具名（regex） | 是 |
| `PostToolUse` | 工具执行后 | 工具名（regex） | 否 |
| `PreTaskExec` | spec 任务开始前 | 不评估 | 是 |
| `PostTaskExec` | spec 任务结束后 | 不评估 | 否 |
| `UserPromptSubmit` | 用户提交提示词 | 提示词文本 | 是 |
| `PostFileCreate` | agent 创建文件后 | 文件路径（regex） | 否 |
| `PostFileSave` | agent 保存/编辑文件后 | 文件路径（regex） | 否 |
| `PostFileDelete` | agent 删除文件后 | 文件路径（regex） | 否 |
| `Manual` | 用户按需触发 | 不评估 | 否 |

事件时点的语义由触发器页给到：Prompt Submit 在用户提交提示词时触发，shell 动作可通过环境变量 `USER_PROMPT` 取得提示词；Agent Stop 在 agent 结束一轮回复时触发；Session Start 在新聊天会话开始时触发（CLI V3 的规范名是 `SessionStart`，`AgentSpawn`/`agentSpawn` 作为 2.x 兼容拼写仍被接受）；Pre/Post Tool Use 在工具调用前后触发；`SessionEnd` 仅在 CLI V3 会话被拆除时触发。[@ref-kiro-hooxtypes-prompt][@ref-kiro-hooxtypes-stop][@ref-kiro-hooxtypes-sessionstart][@ref-kiro-hooxtypes-pretool]

**可用性（surface × CLI 版本）**：触发器页的表格逐项标注，`Prompt Submit`、`Agent Stop`、`Pre Tool Use`、`Post Tool Use` 在 IDE/CLI/Web 都可用；`Session Start`、`File Create/Save/Delete`、`Pre/Post Task Execution` 在 CLI 标为 "V3"；`Session End` 仅 CLI V3；`Agent Spawn` 是 2.x 与 V3 兼容别名；`Manual` 在 Web 与 CLI V3 被识别并列出（文档同时说明 CLI V3 的 `/hooks` 没有调用 Manual hook 的动作）。[@ref-kiro-hooxtypes-availability]

**文件类事件只响应 agent 的改动**：文件触发器（File Create/Save/Delete）不会被手写编辑器改动触发。[@ref-kiro-hooxtypes-filecreate]

**MCP 工具**：对 MCP 工具的 hook，`tool_name` 使用带 server 前缀的完整命名空间（例如 `@postgres/query`），Pre/Post Tool Use 都适用。[@ref-kiro-hooxtypes-mcp]

## 注册位置与文件结构 {#hooks-entry}

Hook 是 `.kiro/hooks/` 下的独立 JSON 文件，每个文件定义 `version` 与 `hooks` 数组；文件在会话启动时**自动激活**，无需手工注册。全局作用域的 hook 目录是 `~/.kiro/hooks/`（配置作用域参考页 "File paths" 表中列出），项目作用域是 `.kiro/hooks/`。[@ref-kiro-hooks-how][@ref-kiro-hooks-location][@ref-kiro-config-paths]

官方 schema 示例（来自 "Quick example" 与 "Hook file schema"，字段原样）：[@ref-kiro-hooks-how][@ref-kiro-hooks-schema]

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "example-hook",
      "trigger": "PostFileSave",
      "matcher": "\\.(ts|tsx)$",
      "action": { "type": "command", "command": "npx eslint --fix" }
    }
  ]
}
```

字段表（官方 "Hook file schema"）：`version`（必需，当前 `"v1"`）、`hooks`（必需数组）、`hooks[].name`（必需，人工可读标识）、`hooks[].description`（可选，仅文档用）、`hooks[].trigger`（必需，PascalCase）、`hooks[].matcher`（可选 regex；Pre/Post Tool Use 匹配工具名，文件事件匹配文件路径；默认总是匹配）、`hooks[].action.type`（必需，`command` 或 `agent`）、`hooks[].action.command`（`type=command` 时必需）、`hooks[].action.prompt`（`type=agent` 时必需）、`hooks[].timeout`（可选，命令动作超时秒数，默认 60，`0` 表示不超时，对 agent 动作用忽略）、`hooks[].enabled`（可选，`false` 时跳过而不删除，默认 `true`）、`hooks[].confirm`（可选，Stop 命令 hook 执行前的确认块）。[@ref-kiro-hooks-schema]

**matcher 语义按触发器区分**：文件类触发器匹配文件路径（如 `\.ts$`、`src/.*`）；Pre/Post Tool Use 匹配工具名（如 `write`、`shell`、`write|read`）；UserPromptSubmit 匹配提示词文本；SessionStart、Stop、Pre/Post TaskExec、Manual 不评估 matcher，总是触发。[@ref-kiro-hookmigration-matcher]

**CLI 的第二种写法是 agent 内联**：agent 配置的 `hooks` 字段（仅 CLI）用与 `.kiro/hooks/` 相同的 schema 内联 hook 定义，受支持的触发器为 `agentSpawn`、`userPromptSubmit`、`preToolUse`、`postToolUse`、`stop`，每条含 `command` 与可选 `matcher`。[@ref-kiro-agentref-hooks]

在 CLI 里也可以让 agent 直接生成 hook 文件：文档写明 CLI 侧的设置方式是"直接在 `.kiro/hooks/` 创建 hook 文件，hook 在启动会话时自动激活"。[@ref-kiro-hooks-setup]

## 输入与输出 {#hooks-io}

**输入**：hook 事件以 JSON 形式经 **STDIN** 传给命令；Prompt Submit 的提示词还可通过 `USER_PROMPT` 环境变量读取；文件类触发器在 3.0 提供模板变量（`{{filePath}}`）插入命令，该变量只在新的独立文件格式中可用。[@ref-kiro-hooxtypes-prompt][@ref-kiro-hookmigration-format] Pre Tool Use 的事件对象含 `hook_event_name`、`cwd`、`session_id`、`tool_name`、`tool_input` 等字段，MCP 工具的 `tool_name` 形如 `@postgres/query`。[@ref-kiro-hooxtypes-pretool][@ref-kiro-hooxtypes-mcp]

**输出与退出码**（官方 "Shell Command action" 的 CLI 说明）：[@ref-kiro-hookactions-shell]

- 退出码 **0**：成功；STDOUT 在 SessionStart/UserPromptSubmit 时加入上下文，其他触发器忽略；
- 退出码 **2**：阻断执行，仅对 PreToolUse、UserPromptSubmit、PreTaskExec 有效，STDERR 返回给 agent；
- **其他退出码**：hook 失败，STDERR 作为警告显示给用户，执行继续。

**Stop 的 block decision**：Stop hook 可在 STDOUT 返回 `"decision": "block"` 的 JSON，使 agent 不停止，`reason` 会作为新的用户消息继续对话——这是"跑测试/查 lint 后让 agent 继续"的反馈环。Stop hook 不使用 matcher。[@ref-kiro-hooxtypes-stop]

**确认提示与动态选项**：Stop 命令 hook 可加 `confirm` 块，字段为 `question` 与 `options[]`（每个 option 有 `id`、`label`、`run`，`run` 为 false 时该选项不执行命令）；可选 `confirmCommand` 在弹窗前运行，用其 JSON stdout 决定是否弹窗及替换问题与选项，非零退出/超时/非法 JSON 时回退到静态 `question`+`options`。[@ref-kiro-hooks-confirm]

**agent 动作**：agent 动作向当前会话注入一段提示词，由 agent 像正常提示一样响应；Prompt Submit 触发器下，hook 里写的提示词会被**追加**到用户提示后一起发送。[@ref-kiro-hookactions-select]

## 顺序、超时与失败处理 {#hooks-order}

- **顺序**：一个 hook 文件可定义多个 hook（`hooks` 数组）；配置作用域参考页把 Hooks 的合并规则写为 **"All scopes merged"**——全局与项目作用域的 hook 都会生效，而不是互相覆盖。[@ref-kiro-hooks-schema][@ref-kiro-config-conflicts]
- **超时默认值与字段名冲突（`conflict`）**：`/docs/hooks.md` 的字段表写 `hooks[].timeout` 为"命令动作超时秒数，默认 60"，示例用 `"timeout": 30`；而 `/docs/hooks/actions.md` 与 `/docs/hooks/management.md` 的 CLI 说明写"默认超时 30 秒（30,000ms），用 `timeout_ms` 字段配置"。同一产品文档给出两种字段名与两种默认值，来源之间不一致，读者应以实际运行行为为准；本章不判定哪一个正确。[@ref-kiro-hooks-schema][@ref-kiro-hookactions-shell][@ref-kiro-hookmgmt-manage]
- **缓存**：成功的 hook 结果可用 `cache_ttl_seconds` 缓存，`0` 为不缓存（默认），大于 0 表示缓存指定秒数；AgentSpawn hook 无论该设置如何都不缓存。[@ref-kiro-hookactions-shell][@ref-kiro-hookmgmt-manage]
- **失败**：非 0 且非 2 的退出码只把 STDERR 作为警告，执行继续；PreToolUse 的 2 是唯一会阻断工具的退出码（PreTaskExec/UserPromptSubmit 的 2 同样阻断）。[@ref-kiro-hookactions-shell][@ref-kiro-hooxtypes-pretool]
- **agent 动作 vs 命令动作**：官方建议对确定性任务用命令动作——它更快、不消耗 credits；agent 动作会触发新一轮 agent 循环并消耗 credits。[@ref-kiro-hookactions-select]
- CLI 2.x 的内联 hook 格式在同一 agent 配置里以触发器名映射到 hook 数组，每条含 `command` 与 `matcher`；迁移到 3.0 时触发器名改为 PascalCase（`agentSpawn` → `SessionStart` 等）。[@ref-kiro-2x-hooks][@ref-kiro-hooks-prev]

## 生效条件与启用状态 {#hooks-conditions}

- **逐条启用/停用**：`hooks[].enabled: false` 跳过该 hook 而不删除配置（默认 `true`）。[@ref-kiro-hooks-schema]
- **CLI 侧管理方式**：文档给出的 CLI 管理说明是"通过 agent 配置文件管理 hook：修改 hooks 段来增删改；去掉或注释掉定义即停用，改完在 agent 下次激活时生效"。[@ref-kiro-hookmgmt-manage]
- **激活时机**：`.kiro/hooks/` 里的文件在会话启动时自动激活，不需要手工注册。[@ref-kiro-hooks-how]
- **版本边界**：`.kiro/hooks/*.json` 独立格式由 **IDE 1.0 与 CLI 3.0** 引入；从 IDE 0.x 或 CLI 2.x 升级时，旧的内联 hook 需要迁移（旧格式仍在 2.x 参考页与迁移页保留说明）。[@ref-kiro-hooks-prev][@ref-kiro-2x-hooks]
- **Manual 触发器**：CLI V3 会识别并在列表中出现 `Manual` hook 定义，但 `/hooks` 不提供调用动作，因此 Manual 在 CLI 上不可实际执行。[@ref-kiro-hooxtypes-availability]

**缺口**：固定来源没有说明 hook 在**不受信任工作区**中是否被限制（V3 的 workspace trust 只描述了对 shell/写入等能力的一般限制）、hook 执行时的工作目录取值、以及多个 hook 命中同一事件时的执行先后顺序。这些点保持未验证。

## 诊断 {#hooks-diagnostics}

- 官方排查页的 CLI 条目：hook 不触发时——确认 hook 正确写在 agent 配置中、`hook_event_name` 与预期事件一致、Pre/Post Tool Use 的 `matcher` 指向正确工具、脚本可执行且路径相对工作目录正确；性能问题时——确保命令在 `timeout_ms`（默认 30,000ms）内完成、用 `cache_ttl_seconds` 缓存稳定结果、收窄 matcher 以减少不必要执行；命令报错时——确认退出码 2 的阻断是有意为之，其他非零码只显示警告，并检查脚本对 STDIN JSON 的解析。[@ref-kiro-hooktrouble]
- **改动何时生效**：独立文件在会话启动时激活（新会话生效）；CLI 内联 hook 的改动在"agent 下次激活时"生效。[@ref-kiro-hooks-how][@ref-kiro-hookmgmt-manage]
- `/config`（V3 会话）的配置总览包含 Hooks 分类，可用来确认 hook 是否被当前会话认为已配置。[@ref-kiro-slash-config]
- **缺口**：固定来源没有给出 CLI 侧 hook 执行的独立日志文件或 `--verbose` 之外的调试开关（IDE 有输出面板，CLI 侧只说"检查终端输出/JSON 解析"）。这一点保持未验证。
