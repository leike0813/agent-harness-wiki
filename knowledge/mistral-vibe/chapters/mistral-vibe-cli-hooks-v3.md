---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-hooks-v3
harness_id: mistral-vibe
topic: hooks
title: "Mistral Vibe CLI 的 hooks.toml：三个可声明点、JSON 契约与失败策略"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-mv-301-harness-hook-points, ref-mv-301-hooks-points]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-mv-301-hook-files, ref-mv-301-hooks-load, ref-mv-301-hooks-declaration]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-mv-301-hooks-payload, ref-mv-301-hooks-output, ref-mv-301-hooks-failure]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-mv-301-hooks-binding, ref-mv-301-hooks-declaration, ref-mv-301-hooks-matcher]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-mv-301-hooks-declaration, ref-mv-301-hooks-load, ref-mv-301-hooks-failure]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-301-hooks-load, ref-mv-301-hooks-output, ref-mv-301-hooks-binding, ref-mv-301-hooks-points]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-mv-301-harness-hook-points, ref-mv-301-hooks-points]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-mv-301-hook-files, ref-mv-301-hooks-load, ref-mv-301-hooks-declaration]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-mv-301-hooks-payload]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-mv-301-hooks-output, ref-mv-301-hooks-failure]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs: [ref-mv-301-hooks-binding, ref-mv-301-hooks-declaration, ref-mv-301-hooks-matcher]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-mv-301-hooks-declaration, ref-mv-301-hooks-load]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-mv-301-hooks-load, ref-mv-301-hooks-output, ref-mv-301-hooks-binding]
---

固定来源是官方仓库提交 `dd2c04ce717c417731ab89c333cd0a72541e33ba`（变更日志 3.0.1），界面为 `cli`。Hook 仍然是"外部命令 + JSON stdin/stdout 契约"，但执行位置在本提交后移到了 Unified harness：Core 决定何时派发，运行时持有真正执行命令的 handler，两侧用同一个绑定 id 连接。

## 事件与触发时点 {#hooks-events}

用户在 `hooks.toml` 里能声明的点恰好三个，名字与 Core 点的对应关系是：`pre_tool` → `pre_tool_call`，`post_tool` → `post_tool_call`，`post_agent` → `post_agent_turn`。[@ref-mv-301-hooks-points]

Core 自身的钩子点有六个：`pre_agent_turn`、`pre_llm_call`、`post_llm_call`、`post_agent_turn`、`pre_tool_call`、`post_tool_call`。另三个点（`pre_agent_turn`、`pre_llm_call`、`post_llm_call`）不是 `hooks.toml` 的可选值，它们由宿主内部装配，用户声明无法选中。[@ref-mv-301-harness-hook-points]

| 声明点 | 触发时点 | 允许的返回动作 |
| :-- | :-- | :-- |
| `pre_tool` | 每次工具调用之前 | 继续（可改写参数）或拒绝 |
| `post_tool` | 工具执行之后 | 继续或替换工具结果 |
| `post_agent` | 一轮助手回复结束后 | 接受，或要求带反馈重试（拒绝改用重试） |

每个 Core 点都有自己的类型化输出：`pre_agent_turn` 可带用户内容或跳过；`post_llm_call` / `post_agent_turn` 是接受、重试或拒绝三选一；`pre_tool_call` 可带改写后的有效参数或跳过；`post_tool_call` 返回工具结果。[@ref-mv-301-harness-hook-points] 用户命令行 hook 只覆盖其中三个，且 `post_agent` 本身没有"阻断"模式：失败时它只会接受本轮。

## 配置入口与字段 {#hooks-entry}

Hook 写在独立的 `hooks.toml` 里。加载顺序是：每个项目根的 `.vibe/hooks.toml`（受信任的当前目录与 `--add-dir` 目录，按根的顺序），最后是用户级 `$VIBE_HOME/hooks.toml`。[@ref-mv-301-hook-files] 同名去重按 `name` 先到先得：先加载的条目胜出，后来者被跳过并在配置问题里记一条 `Duplicate hook name`（用户级重复位于列表末尾，因此项目/工作区条目优先）。[@ref-mv-301-hooks-load]

`[[hooks]]` 的字段就七个：[@ref-mv-301-hooks-declaration]

| 字段 | 必填 | 默认 | 约束 |
| :-- | :-- | :-- | :-- |
| `name` | 是 | — | 去重键，也是绑定 id 的一部分 |
| `type` | 是 | — | `pre_tool` / `post_tool` / `post_agent` |
| `command` | 是 | — | 非空；由平台 shell 在会话工作目录执行 |
| `match` | 否 | 无（等价全匹配） | 只允许工具类 hook；空白串被拒；出现在 `post_agent` 上直接报错 |
| `timeout` | 否 | 60 秒 | 超时杀进程 |
| `strict` | 否 | `false` | 只允许工具类 hook；出现在 `post_agent` 上直接报错 |
| `description` | 否 | 无 | 只做说明，运行时不读取 |

最小声明：

```toml
# PROJECT/.vibe/hooks.toml
[[hooks]]
name = "deny-rm-rf"
type = "pre_tool"
match = "bash"
command = "uv run python .vibe/hooks/guard-bash.py"
timeout = 60.0
strict = false
description = "Reject dangerous shell commands."
```

## 输入与输出契约 {#hooks-io}

**输入**：每次触发把该点的 JSON 事件写到子进程 stdin。三个点共享同一组会话字段：`session_id`、`transcript_path`（会话存储根，持久 journal 在其下）、`cwd`、`parent_session_id`；判别字段是 `hook_event_name`，工具类 hook 另带 `tool_name`、`tool_call_id` 与 `tool_input`。[@ref-mv-301-hooks-payload]

`tool_input` 是"作者视角"的参数：运行时把 `read_file`/`write_file` 的 `path` 改名为 `file_path`，把 `edit` 的单块 `content` 展开成 `old_string`/`new_string`/`replace_all`，把 `bash` 的 `timeout_seconds` 改名为 `timeout`；其余字段原样保留，避免 hook 丢掉 offset/limit 之类仍会被执行的参数。

**输出**：只看退出码与 stdout。空 stdout 且退出 0 表示直通；stdout 不是合法 JSON 对象视为失败（`strict` 时按失败策略处理）。[@ref-mv-301-hooks-output]

```json
{"decision": "deny", "reason": "refuse dangerous shell"}
```

| stdout 形状 | 结果 |
| :-- | :-- |
| 空 | 直通，不显示任何提示 |
| `decision` 为 `deny` | 拒绝：`reason` 作为拒绝理由（`pre_tool` 变成模型看到的工具错误；`post_tool` 替换工具结果；`post_agent` 变成一次要求修订的反馈） |
| 其他 `decision`（含缺省/未知值） | 放行 |
| `system_message` | 作为一条只给用户看的气泡提示 |
| `hook_specific_output.tool_input`（`pre_tool`） | 用该对象改写本次工具参数 |
| 非 0 退出、超时、启动失败、非法 JSON | 按点的失败策略处理 |

失败策略在三个点上不同，且 handler 从不为执行失败抛异常：`pre_tool` 在 `strict` 时失败即拒绝、否则放行；`post_tool` 在 `strict` 时清空工具结果、否则直通；`post_agent` 永远接受本轮，因此一个坏掉的评审 hook 不会卡住会话收尾。[@ref-mv-301-hooks-failure] stdout 读取有 1MB 上限：超出部分被丢弃但继续读，避免 hook 灌爆内存或阻塞在写满的管道上。

## 顺序、匹配与超时 {#hooks-order}

每次声明都会编译成一个 Core 绑定：`id` 是 `source:name`（故意不含执行顺序，这样重排 `hooks.toml` 不会改变已有 hook 的 id，恢复会话时仍能按 id 重新挂上 handler），`point` 是 Core 点，`order` 是声明顺序，`selector` 决定是否派发。绑定随会话进入 Core 的能力集合，handler 注册在运行时，两者用 id 对齐。[@ref-mv-301-hooks-binding]

`match` 的匹配发生在**调用时**，针对真正被调用的工具：`*` 或缺省匹配全部；`re:` 前缀走正则（大小写不敏感、全匹配）；其他写法是不区分大小写的 fnmatch 通配。候选名同时包括限定名（如 `file_system.bash`）、叶子名（`bash`）、下划线形式以及模型实际看到的工具名（`read_file`、`edit`、`agents_spawn` 等），因此 `match = "edit"` 能命中 `file_system.search_replace`。[@ref-mv-301-hooks-matcher] 生命周期点不接受 `match`；`post_agent` 因此在语义上总是匹配。

每个 hook 有独立超时，默认 60 秒，超时杀掉子进程；多个 hook 的派发顺序由绑定里的 `order` 决定。[@ref-mv-301-hooks-declaration]

## 生效条件 {#hooks-conditions}

- **项目钩子受信任门槛约束**：项目 `hooks.toml` 只从项目根收集，而项目根集合本身就是"受信任的当前目录 + `--add-dir`"，因此未受信任目录里的 hook 文件根本不会被读到。[@ref-mv-301-hook-files] 收集顺序与"同名先到先得"的合并规则见加载函数本身。[@ref-mv-301-hooks-load]
- **声明即生效，没有开关**：固定来源里没有启用/禁用 hook 的配置字段；要停用只能删掉声明或让它失败（失败策略见上）。
- **字段级条件**：`match` 与 `strict` 只对工具类 hook 有效，写在 `post_agent` 上会让该条目校验失败并成为一条配置问题。[@ref-mv-301-hooks-declaration]
- **失败不阻断会话**：`post_agent` 没有阻断模式，`pre_tool` 只在 `strict` 上闭锁；因此 hook 不可用时最坏结果是放行或"结果被清空"，而不是会话中止。[@ref-mv-301-hooks-failure]
- **插件钩子另有来源**：插件声明的 hook 带 `plugin_name`、插件根目录/数据目录环境与协议（Vibe、Claude Code、Kimi Code）标记，与用户 `hooks.toml` 分开装配；用户条目不会混进插件清单。

## 诊断 {#hooks-diagnostics}

1. **是否被发现**：加载结果是 `hooks`、`issues` 与配置问题列表；TOML 解析失败、字段非法、跨文件重名都会变成带文件名与原因的条目，而不是静默忽略。[@ref-mv-301-hooks-load]
2. **是否被匹配**：匹配在调用时按工具名判定；写 `match` 时用模型看到的工具名最稳（`bash`、`edit`、`read_file`），MCP 工具则带 `别名_工具名` 形式。[@ref-mv-301-hooks-matcher]
3. **是否被执行**：hook 改变结果时会产出一条 `hook_completed` 事件（带 scope、`tool_call_id`、hook 名与状态）；直通运行不产生提示，所以"没有提示"等于"没有改动"。[@ref-mv-301-hooks-output]
4. **为什么失败**：失败提示优先取 stderr，其次 stdout，最后回落到退出码；调试信息应写 stderr。
5. **改了配置何时生效**：hook 声明在会话开始时编译成绑定，绑定随会话能力集合固定；现有会话不会因为磁盘上的 `hooks.toml` 变化而换成另一组 hook，改动在下一次会话（或重新恢复）时生效。[@ref-mv-301-hooks-binding]
