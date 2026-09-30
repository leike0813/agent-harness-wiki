---
schema_version: 3
record_kind: production
edition_id: devin-cli-custom_agents-v1
harness_id: devin
topic: custom_agents
title: "Devin CLI 的自定义 Subagent：定义、profile、覆盖、边界与诊断"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-devin-sub-custom, ref-devin-sub-how, ref-devin-ext-how, ref-devin-index-vs, ref-devin-controls-limits]
  - section_id: agents-entry-format
    surface_ids: [cli]
    source_refs: [ref-devin-sub-create, ref-devin-configfile-locations, ref-devin-plug-format, ref-devin-plug-skillsrules, ref-devin-import-claude, ref-devin-sub-definition, ref-devin-sub-fields, ref-devin-sub-used]
  - section_id: agents-roles-profiles
    surface_ids: [cli]
    source_refs: [ref-devin-sub-profiles, ref-devin-sub-used, ref-devin-sub-custom, ref-devin-plug-format, ref-devin-cmd-profiles, ref-devin-sub-model]
  - section_id: agents-invocation-overrides
    surface_ids: [cli]
    source_refs: [ref-devin-sub-how, ref-devin-sub-influence, ref-devin-sub-used, ref-devin-skillc-subagents, ref-devin-sub-toggle, ref-devin-configfile-options, ref-devin-sub-fields, ref-devin-sub-model, ref-devin-sub-enterprise, ref-devin-sub-nesting, ref-devin-sub-perms, ref-devin-sub-monitor]
  - section_id: agents-limits-diagnostics
    surface_ids: [cli]
    source_refs: [ref-devin-cmd-doctor, ref-devin-sub-toggle, ref-devin-sub-used, ref-devin-sub-monitor, ref-devin-sub-model, ref-devin-sub-perms]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-devin-sub-create, ref-devin-configfile-locations, ref-devin-plug-format, ref-devin-plug-skillsrules, ref-devin-import-claude, ref-devin-sub-definition, ref-devin-sub-fields, ref-devin-sub-used]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-devin-sub-create, ref-devin-configfile-locations, ref-devin-plug-format, ref-devin-plug-skillsrules, ref-devin-import-claude, ref-devin-sub-definition, ref-devin-sub-fields, ref-devin-sub-used]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles-profiles
        status: answered
        source_refs: [ref-devin-sub-profiles, ref-devin-sub-used, ref-devin-sub-custom, ref-devin-plug-format, ref-devin-cmd-profiles, ref-devin-sub-model]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-overrides
        status: answered
        source_refs: [ref-devin-sub-how, ref-devin-sub-influence, ref-devin-sub-used, ref-devin-skillc-subagents, ref-devin-sub-toggle, ref-devin-configfile-options, ref-devin-sub-fields, ref-devin-sub-model, ref-devin-sub-enterprise, ref-devin-sub-nesting, ref-devin-sub-perms, ref-devin-sub-monitor]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-overrides
        status: partial
        source_refs: [ref-devin-sub-how, ref-devin-sub-influence, ref-devin-sub-used, ref-devin-skillc-subagents, ref-devin-sub-toggle, ref-devin-configfile-options, ref-devin-sub-fields, ref-devin-sub-model, ref-devin-sub-enterprise, ref-devin-sub-nesting, ref-devin-sub-perms, ref-devin-sub-monitor]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits-diagnostics
        status: partial
        source_refs: [ref-devin-cmd-doctor, ref-devin-sub-toggle, ref-devin-sub-used, ref-devin-sub-monitor, ref-devin-sub-model, ref-devin-sub-perms]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-limits-diagnostics
        status: answered
        source_refs: [ref-devin-cmd-doctor, ref-devin-sub-toggle, ref-devin-sub-used, ref-devin-sub-monitor, ref-devin-sub-model, ref-devin-sub-perms]
---

## 固定来源与范围 {#agents-scope}

固定来源是官方文档站 `docs.devin.ai` 的 Devin CLI markdown 快照：`cli/subagents.md`、`cli/reference/commands.md`、`cli/reference/configuration/config-file.md`、`cli/extensibility/index.md`、`cli/extensibility/plugins/overview.md`、`cli/extensibility/configuration.md`、`cli/extensibility/skills/creating-skills.md`、`cli/extensibility/hooks/lifecycle-hooks.md`、`cli/enterprise/controls.md`、`cli/index.md`。文档未标软件版本；自定义 subagent 被官方标注为 **experimental**，格式与行为可能变化 [@ref-devin-sub-custom]。

Devin CLI 里的"自定义 Agent"就是 **自定义 subagent profile**：主 agent 可以派生独立 worker，subagent 与父级共享工具与代码库上下文，但**不**继承父级对话历史，运行在自己的会话链里 [@ref-devin-sub-how]。它与 skills、rules、MCP、hooks、plugins 并列，是扩展面的一类 [@ref-devin-ext-how]。注意云端 Devin 账户的 Playbooks（以及 Knowledge、Secrets）在 CLI 中尚不支持，CLI 的委派机制只有本地 subagent 与云会话两种 [@ref-devin-index-vs]。Cascade 的 Memories、Workflows 等机制在本地 agent 里也没有对应物，官方建议把关键 memory 迁到 skills [@ref-devin-controls-limits]。

## 定义位置与文件格式 {#agents-entry-format}

**agents.entry**：自定义 subagent 是 `agents/` 下的 markdown 文件，两种布局都可用：扁平文件 `agents/NAME.md`（文件名去掉 `.md` 即 profile 标识，与 Claude Code、Cursor 等工具同一约定），或目录 `agents/NAME/AGENT.md`（目录名即标识）[@ref-devin-sub-create]。目录布局下 `AGENT.md` 优先，其次 `AGENTS.md`、`agent.md`、`agents.md` [@ref-devin-sub-create]。作用域有两层 [@ref-devin-sub-create][@ref-devin-configfile-locations]：

| 作用域 | 路径 |
| - | - |
| 项目（`.devin/`） | `.devin/agents/NAME.md` 或 `.devin/agents/NAME/AGENT.md` |
| 项目（别名） | `.agents/agents/NAME.md` |
| 全局 | `~/.config/devin/agents/`（Windows `%APPDATA%\devin\agents\`） |

插件也能提供 subagent：插件根的 `agents/NAME.md` 或 `agents/NAME/AGENT.md`，以 `PLUGIN:NAME` 暴露；插件 subagent 目前只在本地 Devin agent（CLI 与 Devin Desktop）加载，不进云 session [@ref-devin-plug-format][@ref-devin-plug-skillsrules]。此外 Claude Code 的 `.claude/` 目录会被导入（其中包含自定义 subagent），开关是 `read_config_from.claude` [@ref-devin-import-claude]。文件发现顺序、同名覆盖与"多作用域同时存在时谁生效"未在来源中写明，partial。

**agents.format**：定义文件用与 skill 相同的 YAML frontmatter，后面是 subagent 的系统提示 [@ref-devin-sub-definition]。字段与默认值 [@ref-devin-sub-fields]：

| 字段 | 类型 | 默认 | 说明 |
| - | - | - | - |
| `name` | string | 文件名/目录名 | profile 标识，不得与内置名冲突 |
| `description` | string | 无 | 供 agent 选择 profile 时参考 |
| `model` | string | 默认 subagent 模型（router 选，除非管理员钉死） | 覆盖该 subagent 的模型 |
| `allowed-tools` | list | 全部工具 | 限制该 subagent 可用工具；别名 `tools` 也可用；不能授予 `ask_user_question`（对 subagent 永远收回） |
| `max-nesting` | integer | 无 | 覆盖最大嵌套深度，允许该 subagent 再派生 |

最小示例（来自官方示例，read-only research agent）[@ref-devin-sub-definition]：

```markdown
---
name: researcher
description: Deep codebase research and architecture analysis
model: sonnet
allowed-tools:
  - read
  - grep
  - glob
---

You are a research subagent specializing in codebase exploration.
```

`name:` 会覆盖由路径推导的标识；与内置 profile 名（`subagent_explore`、`subagent_general`）冲突的自定义 profile 会被跳过并给出警告 [@ref-devin-sub-create][@ref-devin-sub-used]。另一个官方示例是不指定模型、只限制工具的测试执行 subagent [@ref-devin-sub-used]：

```markdown
---
name: test-runner
description: Runs tests and reports results
allowed-tools:
  - read
  - grep
  - glob
  - exec
---

You are a test runner subagent. Run the relevant test suites and report:
- Which tests passed and failed
- Failure messages and stack traces
- Suggestions for fixing failures
```

## 角色、profile 与模型来源 {#agents-roles-profiles}

**agents.roles**：主 agent 是根，subagent 是派生 worker，两者共用同一套 profile 机制。内置 profile 有两个 [@ref-devin-sub-profiles]：

| profile | 说明 | 工具访问 | 模型 |
| - | - | - | - |
| `subagent_explore` | 只读代码库探索与研究 | 只读代码库工具加 web search；不能改文件、不能取任意 URL（无论前台后台） | 默认 subagent 模型（router 选，除非管理员钉死） |
| `subagent_general` | 通用任务，含代码改动 | 前台全量工具；后台仅预批准工具 | 与父 agent 相同的模型 |

自定义 profile 与内置并列出现，agent 看到每个 profile 的描述后自行选择 [@ref-devin-sub-used]。内置与自定义是同一机制，区别只在来源：内置随 CLI 发行，自定义由 `agents/` 文件或插件提供 [@ref-devin-sub-custom][@ref-devin-plug-format]。CLI 另有 `profiles` 概念（`normal`、`plan`、`ask`），决定主 agent 的工具集与行为，与 subagent profile 不是同一个东西 [@ref-devin-cmd-profiles]。模型来源按 profile 分三档 [@ref-devin-sub-model]：

| profile | 使用的模型 |
| - | - |
| `subagent_explore` | **默认 subagent 模型**——由 subagent router 在 spawn 时选择，除非管理员钉死；不是你在 picker 里选的模型 |
| `subagent_general` | **与父 agent 相同的模型**（picker 里选的，如 Claude Opus、GPT-5） |
| 自定义 | 定义文件里的 `model:`，否则为默认 subagent 模型 |

默认 subagent 模型不是一个固定模型名，而是通过服务端 router 解析；默认的 **Subagent router** 设置会从有序列表里挑第一个可用模型，因此结果随套餐、模型可用性与组织策略变化 [@ref-devin-sub-model]。

## 调用、覆盖与边界 {#agents-invocation-overrides}

**agents.invocation**：用户可以用自然语言要求（例如"research how auth works in a subagent"），主 agent 也可能自行决定委派——它在 spawn 时选一个 profile 并决定前台还是后台 [@ref-devin-sub-how]。`run_subagent` 工具接收的是 **profile**，不是模型名——无法在提示里指定模型 [@ref-devin-sub-influence]。要按名字点名 profile 时也走自然语言（"review this code using the reviewer subagent"）[@ref-devin-sub-used]。文档没有给出用户直接调用 subagent 的斜杠命令；斜杠侧只有 skill 可以声明 `subagent: true` 或 `agent: PROFILE` 把 skill 当成 subagent 跑 [@ref-devin-skillc-subagents]。subagent 的整体开关是用户配置 `subagents_enabled`（默认 `true`，用户配置专有），关闭后 `run_subagent`、`read_subagent` 工具被移除，改动**实时生效**、无需重启 [@ref-devin-sub-toggle][@ref-devin-configfile-options]。Devin Desktop 里同一能力是设置中的 **Subagents (Preview)** 开关 [@ref-devin-sub-toggle]。

**agents.overrides**：可覆盖的项有模型与工具 [@ref-devin-sub-fields]。模型：`subagent_explore` 与未钉 `model:` 的自定义 profile 走"默认 subagent 模型"，`subagent_general` 永远跟随父 agent，自定义 profile 写了 `model:` 就用它 [@ref-devin-sub-model]。因此要在"非父模型"上跑可写 subagent，唯一办法是自定义 profile 的 `model:` [@ref-devin-sub-influence]。skill 的 `model:` 会覆盖 subagent profile 的模型 [@ref-devin-skillc-subagents]。工具：subagent profile 上的 `allowed-tools` 是**真限制**（未列出的工具对该 subagent 不可用），而 skill 上的 `allowed-tools` 不是限制、只做自动批准；`ask_user_question` 不能授予 subagent [@ref-devin-sub-fields][@ref-devin-skillc-subagents]。企业管理员还可以用 **Default subagent model** 统一治理（取值 router / 指定模型 / None）[@ref-devin-sub-enterprise]。继承或覆盖父级其它设置（权限、沙箱、MCP、工作目录）的规则未在来源中说明，partial。

**agents.limits**：默认 subagent **不能**再派生子 subagent——只有根 agent 能，subagent 内部 `run_subagent`/`read_subagent` 被禁用；自定义 profile 可用 `max-nesting` 打开嵌套并设定上限（例如 `max-nesting: 3` 允许深度 3 的链，链上每个未达上限的节点都能继续派生）[@ref-devin-sub-nesting]。并发的显式上限、总时长与上下文上限没有记载。已记载的相关边界：

- **前台 vs 后台**：前台像主 agent，工具调用会向你请求批准，提示里会点名是哪个 subagent 在请求；后台继承本会话已授予的工具权限，未预批准的工具一律自动拒绝，后台**不能**弹新权限提示 [@ref-devin-sub-perms]。
- **中断与恢复**：中断一个 turn 不会杀掉 subagent，它们 park 后在下一条消息恢复；取消/失败/完成的 subagent 都可用新提示 resume，resume 一律以前台运行以便补批此前被拒的工具调用 [@ref-devin-sub-perms][@ref-devin-sub-monitor]。
- **成本**：每个 subagent 是独立会话，有自己的上下文窗口与推理调用，独立计费；prompt-based 套餐下每个 subagent 消耗额外 credit，嵌套会成倍增加 [@ref-devin-sub-how][@ref-devin-sub-nesting]。
- **企业禁用**：管理员把 **Default subagent model** 设为 **None** 会禁用所有 subagent，并压过用户的 `subagents_enabled` [@ref-devin-sub-enterprise][@ref-devin-sub-toggle]。

## 诊断 {#agents-limits-diagnostics}

`devin doctor` 报告哪些自定义 subagent profile 加载成功、标记 frontmatter 无法解析的 `AGENT.md`（这类定义运行时被跳过），并对 Devin 忽略的 frontmatter 键给出警告；任何检查失败时退出码非零，`devin doctor --json` 给机器可读输出 [@ref-devin-cmd-doctor]。关闭 subagent 的配置写法是 [@ref-devin-sub-toggle]：

```json
// ~/.config/devin/config.json
{ "subagents_enabled": false }
```

与内置 profile 同名的自定义 profile 会被跳过并给出警告 [@ref-devin-sub-used]。运行态可看 subagent 面板：显示每个 subagent 的 profile、标题、状态、耗时与工具调用数，面板在会话重载后仍保留；后台运行时输入区下方有指示器，从输入区按 `↓` 再回车可打开面板，前台运行时 spinner 提示 `Ctrl+B` 可转后台，在面板里按 `f` 把后台 subagent 拉到前台、按 `x` 取消，前台运行中可用 `Ctrl+C` 或 `Esc` 取消 [@ref-devin-sub-monitor]。缺口：CLI 目前不在面板里标注 subagent 正在用哪个模型 [@ref-devin-sub-model]；也没有"为什么委派失败"的独立命令，排查看 doctor 输出、profile 名冲突警告与工具权限提示三处 [@ref-devin-cmd-doctor][@ref-devin-sub-perms]。前端交互（面板、快捷键、spinner）以文档为准，未在本机实际运行验证。
