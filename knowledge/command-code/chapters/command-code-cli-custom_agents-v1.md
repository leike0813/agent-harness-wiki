---
schema_version: 3
record_kind: production
edition_id: command-code-cli-custom_agents-v1
harness_id: command-code
topic: custom_agents
title: "Command Code CLI 的自定义子代理：定义位置、frontmatter 字段、委派与边界"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-cc-agents-load, ref-cc-agents-create, ref-cc-agents-file, ref-cc-slash-custom, ref-cc-import-what]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-cc-agents-file, ref-cc-agents-fields, ref-cc-agents-tools]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-cc-agents-how, ref-cc-agents-builtin, ref-cc-memory-where, ref-cc-memory-context]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-cc-agents-how, ref-cc-agents-create, ref-cc-agents-background]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-cc-agents-models, ref-cc-agents-effort, ref-cc-agents-fields, ref-cc-agents-tools, ref-cc-perm-mcp, ref-cc-agents-how]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cc-agents-load, ref-cc-agents-create, ref-cc-perm-mcp, ref-cc-hooks-debug]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-cc-agents-load, ref-cc-agents-create, ref-cc-slash-custom, ref-cc-import-what]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-cc-agents-file, ref-cc-agents-fields, ref-cc-agents-tools]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: partial
        source_refs: [ref-cc-agents-builtin, ref-cc-agents-how, ref-cc-memory-where]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-cc-agents-how, ref-cc-agents-background]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs: [ref-cc-agents-fields, ref-cc-agents-models]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs: [ref-cc-agents-fields, ref-cc-agents-how]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-cc-agents-load, ref-cc-agents-create, ref-cc-perm-mcp]
---

本章的固定来源是 Command Code 官方文档站的页面快照（`/docs/agents`、`/docs/memory`、`/docs/import`、`/docs/reference/slash-commands`、`/docs/permissions`、`/docs/reference/cli`、`/docs/hooks`），抓取于 2026-10-01（各 snapshot 的 `source_fetched_at` 记录 UTC 时间戳 2026-09-30T17:08Z）；文档站只有 HTML，引用按文档小节标题定位、摘录取自页面正文。Command Code 闭源，整章为来源级知识。

Command Code 的“自定义 Agent”是一个 Markdown 文件：frontmatter 配置字段、正文是 system prompt；主循环通过内置 `agent` 工具把任务委派给它，子代理在独立上下文里跑完并返回一个结果。

## 定义位置与发现 {#agents-entry}

Agent 有三个来源，文档给出的加载顺序是**内置 → 个人 → 项目**，同名时**第一条定义获胜**（即内置优先于个人、个人优先于项目）；文件每轮重新扫描，因此新增、修改、删除立即生效：[@ref-cc-agents-load]

| 来源 | 路径 | 说明 |
| :-- | :-- | :-- |
| 内置（bundled） | 编译进产品 | General、Explore、Plan，只读 |
| 个人（Personal） | `~/.commandcode/agents/` | 本机所有项目 |
| 项目（Project） | `.commandcode/agents/` | 随仓库提交、与团队共享 |

保留名 `explore`、`plan`、`review`、`general` 被内置行为占用，用这些名字的自定义文件会被忽略。[@ref-cc-agents-load]

创建方式有两条：直接用自然语言让 Command Code 生成（`create a code-reviewer subagent that …`），或在 `/agents` 菜单里走 “Create manually” 向导（location → identifier → system prompt → description → tools → model → confirm），或按格式手写文件放进上面两个目录。[@ref-cc-agents-create][@ref-cc-agents-file]

另有一类相邻机制——**自定义斜杠命令**：`.commandcode/commands/`（项目）与 `~/.commandcode/commands/`（用户）下的 Markdown 文件按文件名（去掉 `.md`）成为 `/` 加命令名，与 Agent 定义文件是两个不同的目录。[@ref-cc-slash-custom] 从其他代理迁移时，`/import` 会把来源的 skills、custom agents、custom slash commands、MCP 配置与 memory 分别落到 `~/.commandcode/agents/`、`~/.commandcode/commands/`、`~/.commandcode/mcp.json`、`~/.commandcode/AGENTS.md`（或项目级对应位置），格式兼容的 agent frontmatter（`name`、`description`、`tools`、`model`）原样复制，Codex 的 TOML agents 等会被转换。[@ref-cc-import-what]

## 定义文件格式与字段 {#agents-format}

Agent 是 Markdown 文件：frontmatter 配置、正文即 system prompt。[@ref-cc-agents-file]

```markdown
---
name: code-reviewer
description: Use after writing code to review a diff for bugs and security issues.
tools: read_file, grep, glob
model: claude-sonnet-5
---
You are a meticulous code reviewer. Prioritize correctness, security, and clear feedback.
```

只有列出的键会被读取，其余忽略；除 `name` 外都可选：[@ref-cc-agents-fields]

| 字段 | 类型 | 必需 | 默认 | 说明 |
| :-- | :-- | :--: | :-- | :-- |
| `name` | string | 是 | 文件名 | Agent id；清洗为 `a-z A-Z 0-9 _ -`，不能是保留名 |
| `description` | string | 否 | `""` | Command Code 用来决定何时委派的匹配文本 |
| `tools` | string \| string[] | 否 | 无 | 允许的工具；`"*"` 授予全部，否则逗号/空格分隔或 YAML 数组 |
| `disallowedTools` | string \| string[] | 否 | - | 拒绝列表，在 `tools` 之后应用（拒绝优先） |
| `model` | string | 否 | inherit | 任意 `/model` id；省略或 `inherit` 表示跟随会话模型 |
| `reasoningEffort` | string | 否 | 模型默认 | 固定模型支持的推理级别；不支持时回落到模型默认 |
| `maxTurns` | integer | 否 | `100` | 限制 agent 循环轮数 |
| `permissionMode` | string | 否 | inherit | 覆盖会话模式：`default`、`accept-edits`、`yolo`、`plan`、`dont-ask`；已在 `plan`/`yolo` 的会话优先 |
| `background` | boolean | 否 | `false` | `true` 时每次运行都分离，`agent` 工具立即返回 `agent_id` |
| `showOutput` | boolean | 否 | `false` | `true` 时把 agent 的最终消息原样显示在 feed 里 |

工具 id 与 `/agents` 向导高级列表里的名字一致：`tools: "*"` 授予全部（含已连接的 MCP 工具）；`tools: read_file, grep, glob` 是允许列表；省略即无工具。常用分类：只读 `read_file`/`read_directory`/`grep`，编辑 `edit_file`/`write_file`，执行 `shell_command`/`run_command`/`kill_shell`，搜索 `web_search`/`web_fetch`。MCP 工具用原始名（如 `mcp__github__get_me`）。`agent` 与 `agent_output` 不能授予——这正是让委派保持一层深的机制。[@ref-cc-agents-tools][@ref-cc-agents-fields]

## 角色划分：主代理、内置角色与子代理 {#agents-roles}

文档把“主代理”与“子代理”的关系写成委派模型：任务由主会话通过内置 `agent` 工具交给子代理，子代理在自己的循环里完成工作并返回一个结果；子代理的读文件与推理留在自己的上下文窗口里，长探索不会撑爆主对话。[@ref-cc-agents-how]

三个内置角色始终可用且只读（不能编辑或删除）：**General**（没有其他 agent 合适时的默认，研究与多步任务，工具为全部）、**Explore**（跨多文件的代码库搜索与理解，只读 `read_file`/`read_directory`/`grep`）、**Plan**（设计方案与权衡，仅 `read_file`）。未命名 agent 的委派交给 **General**。[@ref-cc-agents-builtin]

与 Agent 并列的另一条“持久指令”通道是 memory：`AGENTS.md`（用户级 `~/.commandcode/AGENTS.md`、项目级 `AGENTS.md` 或 `.commandcode/AGENTS.md`（都在项目根）、子目录级）作为**系统提示**的一部分每轮重读，而 Agent 文件定义的是“谁来做这件事”。[@ref-cc-memory-where]

memory 文件本身不是 Agent 定义，而是**系统提示**的一部分：它每次请求重读（会话中途编辑 `AGENTS.md`，下一轮就生效，无需重启；`/context` 会把它标成 *(modified, refreshes next request)*），因为不属于对话所以不会被压缩掉，也因此每一轮都要花 token——`/context` 的 **Memory** 行给出确切数目。[@ref-cc-memory-context]

**缺口（`agents.roles`）**：文档没有描述主代理自身的可配置性（例如主代理能否用同样 frontmatter 定制）、也没有说明除 General/Explore/Plan 之外是否还有其它第一方角色扩展点。这些保持未验证。[@ref-cc-agents-builtin][@ref-cc-agents-load]

## 调用与委派 {#agents-invocation}

- **不由用户直接调用**：用户描述需求，Command Code 自己决定是否委派（调用内置 `agent` 工具）；`description` 就是它用来匹配“何时使用这个 agent”的文本。[@ref-cc-agents-how][@ref-cc-agents-create]
- **并行**：同一轮发出多个 `agent` 调用即可同时跑多个子代理（文档举例：五个 explorer，或三个各自编辑不同模块的 agent）。[@ref-cc-agents-how]
- **后台运行**：运行可以分离；在后台启动（或 agent 设 `background: true`）时 `agent` 工具立刻返回 `agent_id`，主会话继续，结果稍后用 `agent_output` 工具收取（可 `wait`、查 `status`、`kill`）。[@ref-cc-agents-background]
- **管理入口**：`/agents` 打开管理器，列出两个创建动作、按作用域分组的自定义 agent，以及只读的默认 agent。[@ref-cc-agents-create]

## 模型、工具与权限覆盖（含边界） {#agents-limits}

`model` 接受任何可以传给 `/model` 的 id（用 `--list-models` 或 `/model` 选择器查）；省略 `model` 等同于 `model: inherit`，跟随会话的 `/model`。固定模型会让该 agent 拥有自己的 prompt cache。[@ref-cc-agents-models]

`reasoningEffort` 独立于会话的 `/effort`，并且分两阶段校验，坏值不会在委派中途到达 provider：加载时未知级别（例如拼错的 `meduim`）会被丢弃并给警告，agent 回落到模型默认，文件仍能加载；运行时再针对实际选中的模型检查，解析出的模型不支持的级别回落到模型默认而不是被截断到别的级别。[@ref-cc-agents-effort][@ref-cc-agents-fields]

`permissionMode` 覆盖会话模式，但**已在 `plan`/`yolo` 的会话优先**；`maxTurns` 默认 `100` 限制 agent 循环。[@ref-cc-agents-fields]

工具边界：`disallowedTools` 在 `tools` 之后应用（拒绝优先）；`agent`/`agent_output` 不可授予，因此**子代理不能再起子代理**（一层深）。子代理与主循环走同一条权限管线，差别是主循环会弹交互提示的地方子代理策略自动允许，但 `deny` 规则、plan 模式只读、以及安全类提示（破坏性命令、敏感文件、工作区外写入、显式 `ask`）**失败关闭**。[@ref-cc-agents-tools][@ref-cc-agents-how][@ref-cc-perm-mcp]

**缺口（`agents.limits`）**：文档给出了 `maxTurns` 默认 100、一层深委派、并行运行与后台运行的存在，但没有说明并发子代理的数量上限、单个 agent 的墙钟/超时上限（除了 `maxTurns`），也没有说明嵌套委派被移除后 `task_*` 类工具是否仍可用于并行度控制。这些未验证。[@ref-cc-agents-fields][@ref-cc-agents-how]

## 诊断 {#agents-diagnostics}

- **文件是否被加载**：文件每轮重新扫描，新增/编辑/删除立即生效，因此“下一轮仍未出现”通常意味着文件名或放置目录不对（`~/.commandcode/agents/`、`.commandcode/agents/`）；保留名（`explore`、`plan`、`review`、`general`）会被静默忽略。[@ref-cc-agents-load]
- **委派失败**：`/agents` 管理器列出各作用域下的自定义 agent 与内置 agent，可确认定义是否出现。[@ref-cc-agents-create]
- **权限导致的失败**：子代理在会弹提示的地方自动允许，但安全类提示与 `deny` 规则失败关闭；排查时先看 `deny`/`ask` 规则与当前 permission mode。[@ref-cc-perm-mcp]
- **通用日志**：`cmd --debug` 会把信任检查、配置加载、matcher 决策、stdin/stdout 载荷与非零退出码写进 `~/.commandcode/logs/command.log`（该日志只在 `--debug` 期间存在）。这是官方文档中给出的通用调试入口，hooks 页描述了它的内容；Agent 页本身没有单独列出 agent 委派日志。[@ref-cc-hooks-debug]
