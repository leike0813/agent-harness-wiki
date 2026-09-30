---
schema_version: 3
record_kind: production
edition_id: deep-agents-cli-custom_agents-v3
harness_id: deep-agents
topic: custom_agents
title: "自定义 Agent：主代理 profile、子代理定义与委派机制"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-deep-agents-agents-doc-cli, ref-deep-agents-agents-doc-configsub, ref-deep-agents-agents-doc-fileagents, ref-deep-agents-agents-doc-memory, ref-deep-agents-agents-doc-plugins, ref-deep-agents-agents-doc-subagents, ref-deep-agents-agents-general, ref-deep-agents-agents-marker, ref-deep-agents-agents-pathfinders, ref-deep-agents-agents-precedence]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-deep-agents-agents-doc-subagents, ref-deep-agents-agents-fallback-v2, ref-deep-agents-agents-parse]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-deep-agents-agents-doc-cli, ref-deep-agents-agents-doc-fileagents, ref-deep-agents-agents-doc-quickstart, ref-deep-agents-agents-doc-subagents, ref-deep-agents-agents-general]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-deep-agents-agents-build, ref-deep-agents-agents-doc-configsub, ref-deep-agents-agents-doc-subagents, ref-deep-agents-agents-fsinject]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-deep-agents-agents-async, ref-deep-agents-agents-doc-limits, ref-deep-agents-agents-doc-subagents]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-deep-agents-agents-build, ref-deep-agents-agents-doc-cli, ref-deep-agents-agents-doc-fileagents, ref-deep-agents-agents-doc-limits, ref-deep-agents-agents-parse, ref-deep-agents-agents-precedence]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-deep-agents-agents-doc-subagents, ref-deep-agents-agents-doc-configsub, ref-deep-agents-agents-doc-fileagents, ref-deep-agents-agents-doc-memory, ref-deep-agents-agents-doc-plugins, ref-deep-agents-agents-marker, ref-deep-agents-agents-pathfinders]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-deep-agents-agents-doc-cli, ref-deep-agents-agents-doc-plugins, ref-deep-agents-agents-doc-subagents, ref-deep-agents-agents-general, ref-deep-agents-agents-marker]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: conflict
        source_refs: [ref-deep-agents-agents-doc-subagents, ref-deep-agents-agents-fallback-v2, ref-deep-agents-agents-parse]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-deep-agents-agents-doc-cli, ref-deep-agents-agents-doc-fileagents, ref-deep-agents-agents-doc-quickstart, ref-deep-agents-agents-doc-subagents, ref-deep-agents-agents-general]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-deep-agents-agents-build, ref-deep-agents-agents-doc-configsub, ref-deep-agents-agents-doc-subagents, ref-deep-agents-agents-fsinject]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-deep-agents-agents-async, ref-deep-agents-agents-doc-limits, ref-deep-agents-agents-doc-subagents]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-deep-agents-agents-build, ref-deep-agents-agents-doc-cli, ref-deep-agents-agents-doc-fileagents, ref-deep-agents-agents-doc-limits, ref-deep-agents-agents-parse, ref-deep-agents-agents-precedence]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 自定义 Agent 的定义位置与角色机制 {#agents-entry}

注：catalog 为该 surface 登记的参考页是 Deep Agents overview（`https://docs.langchain.com/oss/python/deepagents/overview`），该页描述 Python SDK 的 `create_deep_agent`，不描述 CLI；本页因此改用官方 CLI 文档树与固定提交的 `libs/code` 源码作为固定来源。

Deep Agents Code 里有两套彼此独立、名字又都叫 "agent" 的机制，先分开再看它们的协作关系。

**主代理 profile（agent）** 是 `~/.deepagents/{agent_name}/`（随 `DEEPAGENTS_HOME` 整体搬迁）下的一个目录，内含 `AGENTS.md`、`skills/`、`memories/` 与 `agents/`。它决定主代理的持久指令、记忆与技能，通过 `dcode --agent NAME`（`-a`）选择，并覆盖 `[agents].default` 与 `[agents].recent`[@ref-deep-agents-agents-doc-cli]。未指定时默认名为 `agent`，或采用 `[agents].recent`；`[agents].default` 始终优先于 `recent`，`/agents` 选择器中按 `Enter` 写 `recent`、按 `Ctrl+S` 固定 `default`[@ref-deep-agents-agents-doc-fileagents]。`~/.deepagents/` 下的目录要被识别为 agent，必须含有一个普通（非符号链接）文件 `AGENTS.md`——发现是 fail-closed 的：点开头目录、保留名目录、符号链接目录都不算，`/agents` 选择器据此列表[@ref-deep-agents-agents-marker]。该 `AGENTS.md` 是会话启动时始终加载的持久上下文[@ref-deep-agents-agents-doc-memory]。

**子代理（subagent）** 是主代理通过内置 `task` 委派的专用代理，定义在：

- 项目级：`.deepagents/agents/{subagent-name}/AGENTS.md`（相对 git 仓库根）
- 用户级：`~/.deepagents/{agent}/agents/{subagent-name}/AGENTS.md`

这两条路径与目录层级由官方文档与加载器一致给出[@ref-deep-agents-agents-doc-subagents][@ref-deep-agents-agents-precedence]。构造 agent 时，用户级目录解析为 `get_user_agents_dir(agent_name)/agents`，项目级解析为项目根目录下的 `.deepagents/agents`（项目根为空则为 `None`）[@ref-deep-agents-agents-pathfinders]。

两层目录结构可对照（`{agent}` 为主代理 profile 名）：

```text
~/.deepagents/                      # 可用 DEEPAGENTS_HOME 搬迁
└── {agent}/
    ├── AGENTS.md                   # 主代理持久指令
    ├── skills/                     # 用户级技能
    └── agents/                     # 用户级子代理
        └── {subagent-name}/
            └── AGENTS.md

{project}/                          # git 仓库根
└── .deepagents/
    └── agents/                     # 项目级子代理（优先级最高）
        └── {subagent-name}/
            └── AGENTS.md
```

**发现与优先级**：同名子代理，项目级完全覆盖用户级，不做合并；加载顺序是先用户、后项目，后者的 `update()` 覆盖前者[@ref-deep-agents-agents-precedence]。优先级表与之一致，并明确 "higher precedence wins completely (no merging)"[@ref-deep-agents-agents-doc-configsub]。若两个定义（文件夹名或 frontmatter `name`）解析出同一名字，加载器记录警告并只保留一个，而不是让某个定义无声消失[@ref-deep-agents-agents-precedence]。

**角色来源区分**：dcode 只从上述两个文件系统根加载自定义子代理[@ref-deep-agents-agents-pathfinders]。插件（plugin）向 dcode 提供的组件是 skills、MCP server、hook 与 Python extension，没有 agent/subagent 组件[@ref-deep-agents-agents-doc-plugins]。内置的 `general-purpose` 子代理由 dcode 在未发现同名定义时自动补上，默认以 fork 模式（继承父会话）运行[@ref-deep-agents-agents-general]。用户侧用 `--agent`/`/agents` 切换的是主代理 profile（决定记忆与技能），与子代理定义不是同一机制[@ref-deep-agents-agents-doc-cli]。

## 定义文件格式与解析规则 {#agents-format}

每个子代理是单个 `AGENTS.md` 文件：以 `---` 包裹的 YAML frontmatter，后接 Markdown 正文。正文整体成为该子代理的 `system_prompt`[@ref-deep-agents-agents-doc-subagents]。

加载器 `libs/code/deepagents_code/subagents.py` 的解析与校验规则：

- 文件必须以 `^---` 开头的 frontmatter 块起始；缺失则跳过并告警 "missing YAML frontmatter"。
- frontmatter 用 `yaml.safe_load` 解析，且必须是 mapping（dict）；否则跳过。
- `description` 必填，且须为非空字符串（去首尾空白后仍非空）。
- `name` 可选：省略时回退为文件夹名；但显式给出却为空串、纯空白或非字符串时，判为无效并跳过（不静默回退，以便拼写错误暴露）。
- `model` 可选；出现时必须是字符串，否则跳过。

上述取值来自 `_parse_subagent_file`[@ref-deep-agents-agents-parse]；通过后映射为 `{name, description, system_prompt, model, source, path}`，其中 `system_prompt` 取 frontmatter 之后的正文并 `strip()`[@ref-deep-agents-agents-fallback-v2]。

| 字段 | 必填性 | 类型/取值 | 说明 |
| - | - | - | - |
| `name` | 加载器视为可选；文档称必填 | 非空字符串 | 子代理标识，供 `task` 使用；省略时回退为文件夹名 |
| `description` | 必填 | 非空字符串 | 主代理据此决定何时委派给它 |
| `model` | 可选 | `provider:model-name` 字符串 | 覆盖主代理模型；省略即继承 |
| 正文（frontmatter 之后） | 作为 `system_prompt` | Markdown | 子代理的系统提示词 |

字段来源[@ref-deep-agents-agents-parse][@ref-deep-agents-agents-fallback-v2]，`name`/`description` 的必要性另见文档[@ref-deep-agents-agents-doc-subagents]。

**来源冲突（`name` 是否必填）**：官方文档写 "The frontmatter requires `name` and `description`"（与 SDK `SubAgent` dict 规范一致）[@ref-deep-agents-agents-doc-subagents]；而固定提交中的加载器把 `name` 当作可选、用文件夹名兜底，模块 docstring 也明确说明这是对 Agent Skills 规范（`deepagents.middleware.skills`）的刻意放宽[@ref-deep-agents-agents-fallback-v2]。以固定提交的实际行为为准，`name` 可省略；文档描述的是更严格的 SDK 规范。

frontmatter 示例（依据官方文档 subagents 页 "File format" 一节的字段）：

```markdown
---
name: researcher
description: Research topics on the web before writing content
model: anthropic:claude-haiku-4-5-20251001
---

You are a research assistant with access to web search.
```

这里的 `name` 显式给出；按加载器它其实可以省略，省略后用文件夹名 `researcher` 作为名字。

## 显式选择与自动委派 {#agents-invocation}

**用户侧显式入口（作用于主代理）**：

- `-a` / `--agent NAME`：以命名 agent 启动，覆盖 `[agents].default` 与 `[agents].recent`[@ref-deep-agents-agents-doc-cli]。
- `[agents].default` 与 `[agents].recent`：`config.toml` 中的长期默认与最近切换值，`default` 优先[@ref-deep-agents-agents-doc-fileagents]。
- `/agents`：会话内浏览并切换 agent profile[@ref-deep-agents-agents-doc-fileagents]。
- `dcode agents list`（别名 `ls`）：列出可用 agent[@ref-deep-agents-agents-doc-cli]。

**子代理的自动委派**：用户不直接点名调用子代理。主代理用内置 `task` 工具委派，并依据子代理的 `description` 判断何时委派给谁（字段定义即 "Main agent uses this to decide when to delegate"；`task` 工具的作用是 "Launch a subagent"）[@ref-deep-agents-agents-doc-subagents][@ref-deep-agents-agents-doc-cli]。因此 `description` 的措辞会直接影响委派选择。

**输入框里的 `@`**：`@filename` 是文件提及（自动补全并注入文件内容），`@@query` 搜索历史线程并插入线程引用；二者都不是 agent 调用入口[@ref-deep-agents-agents-doc-quickstart]。

**动态子代理（dynamic subagents）**：`dcode` 默认启用代码解释器。请求 "workflow" 时，主代理不再自己逐步委派，而是写一段编排脚本，在解释器里调用内置 `task()` 做 fan-out；子代理在面板中按派发阶段分组实时显示[@ref-deep-agents-agents-doc-subagents]。内置 `general-purpose` 子代理默认以 fork 模式运行，由 dcode 自动注入[@ref-deep-agents-agents-general]。

若要让内置 `general-purpose` 子代理改为隔离模式（不继承父会话），在 shell 或全局 `~/.deepagents/.env` 中设置：

```bash
export DEEPAGENTS_CODE_FORKED_SUBAGENTS=false
```

该变量默认为真；项目 `.env` 不能设置它，因为继承内容可能包含私有父状态[@ref-deep-agents-agents-doc-subagents]。

## 每个 Agent 的模型与工具覆盖 {#agents-overrides}

**模型覆盖**：子代理 frontmatter 的 `model` 覆盖主代理模型，格式为 `provider:model-name`（如 `anthropic:claude-opus-4-8`）；省略即继承主代理模型[@ref-deep-agents-agents-doc-subagents]。加载器为每个已解析子代理构造 `SubAgent` dict，仅在 `model_spec` 为真值时才写入 `model` 键——空值（`None` 或 `""`）视为"无显式模型"，所以空 `model:` 会继承运行模型而不是被透传[@ref-deep-agents-agents-build]。若模型被 `[models].allowed` 策略禁止，`require_model_allowed` 会带上声明文件路径抛出，整次 CLI 启动中止[@ref-deep-agents-agents-build]。

**不能通过 frontmatter 配置的字段**：文档明确 `tools`、`middleware`、`interrupt_on`、`skills` 目前无法经 `AGENTS.md` frontmatter 设置；以此方式定义的自定义子代理继承主代理的工具，需要完整控制应直接使用 SDK[@ref-deep-agents-agents-doc-subagents]。

**dcode 注入的行为（用户不可写）**：

- 每个同步子代理会被注入一个绑定 `fs_tools` 的 `FilesystemMiddleware`，使 `task` 委派无法绕过 `--allow-fs-tools` 文件系统白名单；遇到 `CompiledSubAgent`（带 `runnable` 键）会直接抛错，因为其 middleware 不可配置[@ref-deep-agents-agents-fsinject]。
- 有显式模型的子代理携带自己的 middleware 栈；继承运行模型的子代理额外追加可配置模型 middleware[@ref-deep-agents-agents-build]。
- 父级设置了 `interrupt_on` 时，无 `interrupt_on` 的声明式子代理会继承父级 map（导致二次 HITL），dcode 显式写入空 map 以选择退出[@ref-deep-agents-agents-build]。

**继承与优先级小结**：同名子代理项目级覆盖用户级且不合并[@ref-deep-agents-agents-doc-configsub]；`model` 省略即继承主代理模型；工具一律继承主代理，无法在 frontmatter 中单独指定。

## 并发、递归与异步边界 {#agents-limits}

**递归（graph step budget）**：`[runtime].recursion_limit` 控制主代理 LangGraph 图在单轮内允许的节点调用数。dcode 不自设默认，未配置时沿用 LangGraph 服务端默认。解析顺序为 managed config → `--recursion-limit` → `DEEPAGENTS_CODE_RECURSION_LIMIT` → `[runtime].recursion_limit` → `LANGGRAPH_DEFAULT_RECURSION_LIMIT`；managed/env/TOML 值须落在 `[25, 100000]`（含），CLI 值为 `>= 1`，越界会告警并下探到下一来源[@ref-deep-agents-agents-doc-limits]。该限制作用于主代理图；goal/rubric 的递归限制另算。

**异步子代理不可用**：官方文档给出明确提示——"Async subagents are not available to end-users in Deep Agents Code at this time."[@ref-deep-agents-agents-doc-subagents]。

**代码中的 async 通道**：固定提交仍实现了 `[async_subagents]` 的读取（从 `config.toml`），要求每个子表至少含 `description` 与 `graph_id`，构造为远端 `AsyncSubAgent` 并连同同步子代理一起传给 `create_deep_agent`[@ref-deep-agents-agents-async]。文档未把它列为面向终端用户的能力，因此应视为文档化的不可用项与代码路径并存。

**并发**：动态子代理通过解释器里的 `task()` 脚本 fan-out，面板按派发阶段展示[@ref-deep-agents-agents-doc-subagents]。固定来源未给出并发子代理数量的具体上限——这是本问题的已知缺口（已检查 subagents 页与 config-file 的 runtime limits 一节，均无明确数值）。

## 诊断：确认发现、可调用与失败定位 {#agents-diagnostics}

- **列出主代理 profile**：`dcode agents list`（别名 `ls`）[@ref-deep-agents-agents-doc-cli]，或会话内 `/agents`[@ref-deep-agents-agents-doc-fileagents]。
- **子代理发现失败的静默跳过**：缺 frontmatter、YAML 非法、`description` 缺失、`model` 非字符串，加载器都会 `logger.warning` 并跳过[@ref-deep-agents-agents-parse]。
- **常见结构错误**：把 `.md` 直接放在 `agents/` 下（应为 `agents/{name}/AGENTS.md`），或文件夹里没有 `AGENTS.md`，加载器会记录 "must be defined at .../{subagent-name}/AGENTS.md" / "expected an AGENTS.md" 告警并忽略[@ref-deep-agents-agents-precedence]。
- **名称冲突**：两个定义解析出同名子代理时记录警告[@ref-deep-agents-agents-precedence]。
- **权限/委派失败的强信号**：模型被策略拒绝时启动即抛出，并带上声明文件路径，便于定位是哪个子代理[@ref-deep-agents-agents-build]。
- **查看生效值**：`[runtime].recursion_limit` 等配置用 `dcode config get KEY`（如 `dcode config get runtime.recursion_limit`）查看有效值与来源[@ref-deep-agents-agents-doc-limits]。
- **确认可调用**：`dcode tools list` / 会话内 `/tools` 按内置工具与各 MCP server 分组列出当前 agent 可调用的工具，其中 `task` 即委派子代理的入口；这能区分"子代理已加载"与"主代理确实拿到 `task` 工具"[@ref-deep-agents-agents-doc-cli]。
