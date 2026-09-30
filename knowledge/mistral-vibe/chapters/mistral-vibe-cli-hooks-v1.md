---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-hooks-v1
harness_id: mistral-vibe
topic: hooks
title: "Mistral Vibe CLI 的 hooks.toml：三个事件、JSON 契约与严格模式"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-mv-hooks-types, ref-mv-hooks-invocations, ref-mv-docs-hooks-post-tool, ref-mv-docs-hooks-post-agent, ref-mv-readme-hooks, ref-mv-hooks-harness-lifecycle]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-mv-hook-files, ref-mv-docs-trusted-folders, ref-mv-hooks-load, ref-mv-docs-hooks-locations, ref-mv-hooks-config-model, ref-mv-hooks-validation, ref-mv-hooks-post-agent, ref-mv-name-matching, ref-mv-docs-hooks-declare, ref-mv-readme-hooks, ref-mv-hooks-tolerance]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-mv-hooks-executor, ref-mv-hooks-invocations, ref-mv-docs-hooks-contract, ref-mv-hooks-response, ref-mv-hooks-pre-tool, ref-mv-docs-hooks-pre-tool, ref-mv-hooks-post-tool, ref-mv-docs-hooks-post-tool, ref-mv-hooks-post-agent, ref-mv-docs-hooks-post-agent, ref-mv-docs-hooks-example]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-mv-hooks-manager, ref-mv-hooks-handlers, ref-mv-hooks-executor, ref-mv-hooks-failure, ref-mv-hooks-post-agent]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-mv-readme-hooks, ref-mv-docs-trusted-folders, ref-mv-hooks-executor, ref-mv-docs-hooks-locations, ref-mv-hooks-invocations]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-hooks-load, ref-mv-hooks-post-agent, ref-mv-hooks-types, ref-mv-hooks-manager, ref-mv-hooks-failure, ref-mv-hooks-failure-reason]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-mv-hooks-types, ref-mv-hooks-invocations, ref-mv-docs-hooks-post-tool]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-mv-hook-files, ref-mv-hooks-load, ref-mv-hooks-config-model]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-mv-hooks-executor, ref-mv-hooks-invocations]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-mv-hooks-response, ref-mv-hooks-pre-tool, ref-mv-hooks-post-tool, ref-mv-docs-hooks-contract]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs: [ref-mv-hooks-manager, ref-mv-hooks-failure, ref-mv-hooks-executor]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-mv-readme-hooks, ref-mv-docs-trusted-folders, ref-mv-docs-hooks-locations]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-mv-hooks-load, ref-mv-hooks-manager, ref-mv-hooks-failure-reason]
---

固定来源是官方仓库提交 `7c19608af06f6c61d63f8f7a5c3430da73fba2ab` 与 `docs.mistral.ai` 的 Vibe Code CLI 文档快照。Hook 在 Vibe 里是"外部 shell 命令 + 一份固定的 JSON stdin/stdout 契约"，不是宿主内注册的回调：声明即生效，没有开关。

## 事件与触发时点 {#hooks-events}

第一方可声明的事件恰好三个，对应枚举的三个成员。[@ref-mv-hooks-types]

| 事件 | 触发时点 | 是否可阻断 |
| :-- | :-- | :-- |
| `pre_tool` | 每次工具调用，在**用户权限提示之前** | 可以（拒绝该次调用） |
| `post_tool` | 工具主体确实执行过之后（含取消但主体已开始） | 不能阻断，只能改写工具输出文本 |
| `post_agent` | 每一轮助手回复结束且没有待处理的工具调用时 | 可以（把拒绝理由变成一次重试要求） |

每个事件对应的 stdin 模型都是"会话上下文 + 事件特有字段"，`hook_event_name` 是判别字段；`post_tool` 额外带 `tool_status`（`success`/`failure`/`cancelled`）、结构化输出、将要给模型看的文本、错误与耗时。[@ref-mv-hooks-invocations] 官方文档对三个时点的描述与实现一致，`post_agent` 的表述是"在每一轮以没有待处理工具调用结束之后触发"。[@ref-mv-docs-hooks-post-agent] 官方文档还特别说明 `post_tool` **只在工具主体真正跑过时**触发：`pre_tool` 拒绝、用户在批准提示上拒绝、权限为 `NEVER`、或在主体开始前被取消，都不会触发它。[@ref-mv-docs-hooks-post-tool] README 对这层的定性是"hook 把任意 shell 命令接入 Vibe 的生命周期，用来门禁、审计或改写 agent 行为，不需要任何开关，声明即生效"。[@ref-mv-readme-hooks]

除了用户声明的这三个事件，还存在第二个**来源**：插件在自己目录里声明的 hook（带 `plugin_name`、`cwd` 与环境变量），它们由插件机制装配，不会混进 `hooks.toml` 的清单里。[@ref-mv-hooks-invocations] 另外 Unified Harness 的生命周期点比 `hooks.toml` 能选的更多：harness 的 matcher 里另有 `pre_agent_turn`、`pre_llm_call`、`post_llm_call`、`post_agent_turn` 四个点，`hooks.toml` 无法选中它们。[@ref-mv-hooks-harness-lifecycle]

## 配置入口、作用域与字段 {#hooks-entry}

Hook 写在独立的 `hooks.toml` 里，查找顺序是：项目根的 `.vibe/hooks.toml`（先）→ `$VIBE_HOME/hooks.toml`（后）。[@ref-mv-hook-files] 项目文件只在工作目录受信任时才会被列入；未信任目录里的 `hooks.toml` 根本不会被读到。[@ref-mv-docs-trusted-folders] 同名去重按 `name` 做"先到先得"：先加载的项目条目胜出，后来的同名条目被跳过并记录一条 `Duplicate hook name` 配置问题。[@ref-mv-hooks-load] 官方文档与 README 的表述一致（项目先加载、同名以项目为准、子 agent 继承父级 hook 配置）。[@ref-mv-docs-hooks-locations][@ref-mv-readme-hooks]

`[[hooks]]` 的字段就七个。[@ref-mv-hooks-config-model]

| 字段 | 必填 | 默认 | 约束 |
| :-- | :-- | :-- | :-- |
| `name` | 是 | — | 去重键，也是重试计数与界面前缀的键 |
| `type` | 是 | — | `pre_tool` / `post_tool` / `post_agent` |
| `command` | 是 | — | 非空；由平台 shell 执行 |
| `match` | 否 | 无（等价 `*`） | 仅工具类 hook；空串被拒；`post_agent` 上出现会直接报错 |
| `timeout` | 否 | 60.0 秒 | 超时杀进程组 |
| `strict` | 否 | `false` | 仅工具类 hook；`post_agent` 上出现会直接报错 |
| `description` | 否 | 无 | 只做说明，运行时不读取 |

`match` 是唯一的匹配器，语义与工具过滤一致：不区分大小写的 fnmatch 通配，或以 `re:` 开头的正则（全匹配）。[@ref-mv-name-matching] `post_agent` 没有 matcher 语义：字段在它上面是非法的（`match` 与 `strict` 都只允许出现在工具类 hook 上），实现里它直接对所有调用返回匹配。[@ref-mv-hooks-validation][@ref-mv-hooks-post-agent] 官方文档的字段表与上面一致，并写明 `match` 只对 `pre_tool`/`post_tool` 有效。[@ref-mv-docs-hooks-declare]

最小声明（README 的官方示例）：[@ref-mv-readme-hooks]

```toml
[[hooks]]
name = "deny-rm-rf"
type = "pre_tool"
match = "bash"
command = "uv run python /path/to/guard-bash"
timeout = 60.0
strict = false
description = "Reject dangerous shell commands."
```

普通加载器对未知 TOML 键是宽容的（`extra="ignore"`），而插件 hook 文件用严格模式解析（未知键拒绝），这是两条路径的一个实际差别。[@ref-mv-hooks-tolerance]

## 输入与输出契约 {#hooks-io}

**输入**：每次调用把整个 invocation 模型序列化成 UTF-8 JSON 写到子进程 stdin。[@ref-mv-hooks-executor] 顶层字段是 `session_id`、`transcript_path`、`cwd`、`parent_session_id`（在子 agent 内运行时非空），加判别字段 `hook_event_name`；工具类 hook 再加 `tool_name`、`tool_call_id`、`tool_input`。[@ref-mv-hooks-invocations] 工作目录是会话的工作目录；环境变量不做额外注入（子进程继承宿主进程环境），也没有敏感内容脱敏——`tool_input` 与 `transcript_path` 都是原样传递，隐私边界只有"项目文件是否需要信任"这一道。这是本主题的显式缺口。

**输出**：只看退出码与 stdout。官方文档把它写成一张表，与实现一一对应。[@ref-mv-docs-hooks-contract]

| 退出码 / stdout | 结果 |
| :-- | :-- |
| 0 且 stdout 为空 | 直通 |
| 0 且 stdout 是合法 JSON 对象 | 结构化响应 |
| 0 但 stdout 非空且不符合 schema | 视为 hook 失败 |
| 非 0 退出、超时、启动失败 | 视为 hook 失败，诊断取 stderr |

结构化响应的通用字段是 `system_message`（只显示给用户）、`decision`（`allow`/`deny`，默认 `allow`）、`reason`（伴随 deny）、以及事件专属的 `hook_specific_output`；未知字段被容忍，对本事件无意义的字段被静默忽略。[@ref-mv-hooks-response]

各事件对 deny 的解释不同：

- `pre_tool`：拒绝该次工具调用，`reason` 成为模型看到的工具错误；`hook_specific_output.tool_input` 是**整体替换**模型参数，替换结果要重新通过工具 schema 校验，失败会变成一次合成拒绝；多个 hook 的改写按顺序左到右叠加。[@ref-mv-hooks-pre-tool] 官方文档把同一条写成"第一个 deny 会短路本次调用剩余的 `pre_tool` hook"，并强调改写后的参数同时也是权限提示显示、工具执行使用、以及后续助手消息里保留的参数。[@ref-mv-docs-hooks-pre-tool]
- `post_tool`：deny 会用 `reason` **替换** `tool_output_text`，流水线继续（后续 hook 看到替换后的文本）；`hook_specific_output.additional_context` 追加（用换行分隔）到 `tool_output_text`；两者同时出现时先替换再追加。[@ref-mv-hooks-post-tool] 官方文档给出的措辞与顺序完全相同。[@ref-mv-docs-hooks-post-tool]
- `post_agent`：deny 把 `reason` 注入为一条新的用户消息要求重试，每个 hook 每个用户轮次最多 3 次，超过后变成终态警告。[@ref-mv-hooks-post-agent] 官方文档写的就是"上限 3 次重试/每个 hook/每个用户轮次"。[@ref-mv-docs-hooks-post-agent]

官方文档给了一份可直接照抄的最小实现（`./.vibe/hooks.toml` 指向 `./.vibe/hooks/guard-bash.py`）：脚本从 stdin 读 JSON、取 `tool_input.command`，命中危险命令时打印 `{"decision": "deny", "reason": "..."}` 并 `exit 0`，放行时保持 stdout 为空并 `exit 0`；`strict = true` 时脚本崩溃或输出非法 JSON 也会变成拒绝而不是降级为警告。[@ref-mv-docs-hooks-example]

## 顺序、超时与失败处理 {#hooks-order}

匹配到的 hook 在同一个事件内**串行**执行：先取匹配列表，再逐个 await，并把上一个 hook 的改写结果作为下一个的输入；遇到"应中断"的动作（例如 `pre_tool` 的拒绝）立即停止。[@ref-mv-hooks-manager] 事件类型到处理器的分派是固定三张表。[@ref-mv-hooks-handlers]

- 每个 hook 有独立超时（默认 60 秒），超时会杀掉整个进程组（子进程以新会话启动）。[@ref-mv-hooks-executor]
- 失败处理统一走一条路径：`strict` 为真时先尝试"升级"（`pre_tool` 升级为拒绝，`post_tool` 升级为清空文本），否则降级为一条警告直通。[@ref-mv-hooks-failure]
- 失败不退化为重试：写失败、超时、启动失败都只是这一次失败；唯一的"重试"是 `post_agent` deny 引发的对话级重试，上限 3。[@ref-mv-hooks-post-agent]
- 每个匹配的 hook 每次调用只跑一次；`post_agent` 可能在同一用户轮次内因重试而再次触发。[@ref-mv-hooks-manager]

## 生效条件与继承 {#hooks-conditions}

- **没有开关**：声明即生效。固定来源里没有 `enable_experimental_hooks` 之类的字段（该开关只出现在变更日志的历史记录里，已成为过去式）。[@ref-mv-readme-hooks]
- **唯一前置条件是信任**：项目 `hooks.toml` 只在受信任的工作目录里被列入；`--add-dir` 目录隐式受信任，因此也会贡献 hooks。[@ref-mv-docs-trusted-folders]
- **没有沙箱与独立权限模型**：hook 命令由平台 shell 以与宿主相同的用户权限启动，不经过工具权限存储，也没有 jail；工作目录就是会话目录。[@ref-mv-hooks-executor]
- **子 agent 继承**：子会话拿到父级的 hook 配置，因此策略在委派链上继续生效；子 agent 里的 hook 事件记录在子会话日志里。官方文档的原话是"子 agent 继承父级的 hook 配置，策略会传递生效"。[@ref-mv-docs-hooks-locations] README 的说法相同。[@ref-mv-readme-hooks]
- **插件 hook** 走另一条装配路径（带插件根目录、`PLUGIN_ROOT`/`PLUGIN_DATA` 环境与插件作用域），其可用性取决于插件能否被解析。[@ref-mv-hooks-invocations]

## 诊断 {#hooks-diagnostics}

按"被发现 → 被匹配 → 被执行 → 失败原因"四步看：

1. **被发现**：加载结果是一个 `HookConfigResult`，包含 `hooks`、`issues` 与插件来源的 `runtime_hooks`；解析失败、字段非法、重名都会变成 `issues` 里的条目，并带文件名与原因。[@ref-mv-hooks-load] 启动横幅会显示已加载的 hook 数量。
2. **被匹配**：匹配只看 `type` + `match`，`post_agent` 恒匹配；写 `match` 时注意工具名（MCP 工具带下划线前缀）。[@ref-mv-hooks-post-agent][@ref-mv-hooks-types]
3. **被执行**：每个 hook 运行会产出开始/结束事件，状态取值是 `OK`/`WARNING`/`ERROR`：直通的结束事件是 OK，失败是 WARNING，拒绝或重试耗尽（`Failed, retries exhausted (3/3)`）是 ERROR。[@ref-mv-hooks-manager][@ref-mv-hooks-failure][@ref-mv-hooks-post-agent]
4. **失败原因**：失败文案优先取 stderr，其次 stdout，最后回落到退出码；因此调试信息应当写 stderr。[@ref-mv-hooks-failure-reason]

配置何时生效：hook 配置只在会话建立以及"带 hooks 重载的 reload"（例如工作区重新绑定、配置写入）时重新读取；仅修改磁盘上的 `hooks.toml` 而不触发重载，本会话不会改变行为。[@ref-mv-hooks-load]
