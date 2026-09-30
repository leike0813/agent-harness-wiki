---
schema_version: 3
record_kind: production
edition_id: amazon-q-cli-hooks-v1
harness_id: amazon-q
topic: hooks
title: "Amazon Q CLI 的 Hooks：触发点、定义入口、输入输出、执行顺序与诊断"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-hooks-defining, ref-amazon-q-repo-format-hooks, ref-amazon-q-docs-command-line-kiro, ref-amazon-q-repo-readme-status, ref-amazon-q-repo-intro]
  - section_id: hooks-events-entry
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-hooks-defining, ref-amazon-q-repo-format-hooks, ref-amazon-q-repo-hook-struct, ref-amazon-q-repo-hooks-types, ref-amazon-q-repo-migration-hooks, ref-amazon-q-repo-hooks-matching]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-hooks-event, ref-amazon-q-repo-hooks-types, ref-amazon-q-repo-tools-list, ref-amazon-q-repo-hooks-output]
  - section_id: hooks-order-conditions
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-hook-runner, ref-amazon-q-repo-hooks-caching, ref-amazon-q-repo-hook-struct, ref-amazon-q-repo-hooks-timeout, ref-amazon-q-repo-format-hooks, ref-amazon-q-repo-default-builtin, ref-amazon-q-repo-hooks-matching, ref-amazon-q-repo-migration-hooks]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-hooks-command, ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-hooks-output, ref-amazon-q-repo-hooks-defining, ref-amazon-q-repo-cli-verbose]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-entry
        status: answered
        source_refs: [ref-amazon-q-repo-hooks-types, ref-amazon-q-repo-hook-struct, ref-amazon-q-repo-migration-hooks]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-entry
        status: answered
        source_refs: [ref-amazon-q-repo-hooks-defining, ref-amazon-q-repo-format-hooks, ref-amazon-q-repo-hooks-matching]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-amazon-q-repo-hooks-event, ref-amazon-q-repo-hooks-types, ref-amazon-q-repo-tools-list]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-amazon-q-repo-hooks-output, ref-amazon-q-repo-hooks-types]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: partial
        source_refs: [ref-amazon-q-repo-hook-runner, ref-amazon-q-repo-hooks-caching, ref-amazon-q-repo-hooks-timeout, ref-amazon-q-repo-hook-struct]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: partial
        source_refs: [ref-amazon-q-repo-format-hooks, ref-amazon-q-repo-default-builtin, ref-amazon-q-repo-hooks-matching, ref-amazon-q-repo-migration-hooks, ref-amazon-q-repo-hook-struct]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-amazon-q-repo-hooks-command, ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-hooks-output, ref-amazon-q-repo-hooks-defining, ref-amazon-q-repo-cli-verbose]
---

## 固定来源与适用范围 {#hooks-scope}

本章的固定来源是官方仓库 `aws/amazon-q-developer-cli`（提交 `15cc8f3cd18c4272925ce1c7053268eedff1ea0a`）的 `docs/hooks.md`、`docs/agent-format.md` 与相关源码，以及 AWS 官方用户指南的 CLI 页面 [@ref-amazon-q-repo-hooks-defining][@ref-amazon-q-repo-format-hooks][@ref-amazon-q-docs-command-line-kiro]。

AWS 用户指南的 CLI 页面只说明 Q CLI 已变为 Kiro CLI，Hook 的机制细节来自官方仓库的文档与源码。仓库 README 说明项目已不再积极维护、Q Developer CLI 以闭源 Kiro CLI 继续提供 [@ref-amazon-q-repo-readme-status]；仓库 `docs/` 自述描述开发构建、仍在变动 [@ref-amazon-q-repo-intro]。因此本章为来源级知识，只覆盖 `cli` 界面。

## 触发点与定义入口 {#hooks-events-entry}

**hooks.entry**：Hook 只定义在 **agent 配置文件**里，位于 `hooks` 字段；文档没有提供全局 hook 文件或独立 hook 目录 [@ref-amazon-q-repo-hooks-defining]。字段形状是"触发点名到该触发的 hook 数组" [@ref-amazon-q-repo-format-hooks]：

```json
{
  "hooks": {
    "agentSpawn": [
      { "command": "git status" }
    ],
    "preToolUse": [
      {
        "matcher": "execute_bash",
        "command": "{ echo \"$(date) - Bash command:\"; cat; echo; } >> /tmp/bash_audit_log"
      }
    ],
    "postToolUse": [
      { "matcher": "fs_write", "command": "cargo fmt --all" }
    ]
  }
}
```

每个 hook 对象里 `command` 必填，`matcher` 可选（只对 `preToolUse`/`postToolUse` 有意义） [@ref-amazon-q-repo-format-hooks]。源码中 Hook 结构另有 `timeout_ms`、`max_output_size`、`cache_ttl_seconds` 三个可写字段 [@ref-amazon-q-repo-hook-struct]。

**hooks.events**：第一方事件恰好五个——`agentSpawn`（agent 初始化时）、`userPromptSubmit`（用户提交消息时）、`preToolUse`（工具执行前，可阻断）、`postToolUse`（工具执行后）、`stop`（助手完成一轮回复时） [@ref-amazon-q-repo-hooks-types][@ref-amazon-q-repo-hook-struct]。迁移文档记录了这一版的重命名：hook 名不再是必填项，`conversation_start` 改名为 `agentSpawn`、`per_prompt` 改名为 `userPromptSubmit` [@ref-amazon-q-repo-migration-hooks]。登记的固定来源里没有出现"插件事件"这一类同名机制的其它来源，因此不存在需要区分的第二套事件表。

`matcher` 的写法有明确规则：内置工具用精确名（`fs_write`）或通配（`fs_*`），MCP 工具用 `@server`（该 server 全部工具）或 `@server/tool`（单个工具），`*` 匹配全部工具（内置与 MCP），`@builtin` 只匹配内置工具，不写 matcher 则对所有工具生效 [@ref-amazon-q-repo-hooks-matching]。

## 输入事件与输出语义 {#hooks-io}

**hooks.input**：CLI 通过 **STDIN** 把事件作为 JSON 传给 hook 命令。公共字段是 `hook_event_name` 与 `cwd`；`userPromptSubmit` 另有 `prompt`；工具相关事件另有 `tool_name`、`tool_input`，`postToolUse` 还带 `tool_response`（工具执行结果） [@ref-amazon-q-repo-hooks-event][@ref-amazon-q-repo-hooks-types]。MCP 工具的 `tool_name` 使用带 server 名的完整形式，例如 `@postgres/query` [@ref-amazon-q-repo-hooks-types]。可用于 matcher 的内置工具名在 built-in tools 文档中枚举，包括 `execute_bash`、`fs_read`、`fs_write`、`introspect`、`report_issue`、`knowledge`、`thinking`、`todo_list`、`use_aws` [@ref-amazon-q-repo-tools-list]。缺口：登记来源没有说明事件 JSON 中如何处理敏感内容，也没有给出除 `cwd` 之外的环境变量约定，按 partial 记录。

**hooks.output**：退出码语义是三档——`0` 表示成功，STDOUT 被捕获（`agentSpawn` 与 `userPromptSubmit` 的成功输出会加入 agent 上下文，其它事件的成功输出不展示给用户）；`2` 只在 `preToolUse` 有意义，表示阻断工具执行并把 STDERR 返回给模型；其它退出码表示 hook 失败，STDERR 以警告形式展示给用户 [@ref-amazon-q-repo-hooks-output][@ref-amazon-q-repo-hooks-types]。注意 `postToolUse` 报错时工具已经执行过，无法回滚 [@ref-amazon-q-repo-hooks-types]。

## 执行顺序、缓存与生效条件 {#hooks-order-conditions}

**hooks.order**：源码中同一触发点的多个 hook 通过 `FuturesUnordered` **并发**执行，实现注释明确写着"返回的 hook 顺序未定义" [@ref-amazon-q-repo-hook-runner]。成功结果按 `(触发点, hook)` 缓存：命中缓存时不再执行、直接以退出码 0 返回；`cache_ttl_seconds` 为 0（默认）表示不缓存，`agentSpawn` 的 hook 永不进入缓存 [@ref-amazon-q-repo-hook-runner][@ref-amazon-q-repo-hooks-caching]。默认参数是 `timeout_ms` 30000、`max_output_size` 10240、`cache_ttl_seconds` 0 [@ref-amazon-q-repo-hook-struct][@ref-amazon-q-repo-hooks-timeout]。缺口：超时后的具体处理、并发上限与失败是否中断同一批其它 hook，登记来源没有说明；`hooks.md` 给出的 `timeout_ms` 说明只写了默认 30 秒 [@ref-amazon-q-repo-hooks-timeout]。

**hooks.conditions**：生效条件是"该 hook 写在当前所用 agent 的配置里"——内置默认 agent 的配置中没有任何 hook 字段，`hooks` 字段只在自定义 agent 里出现，所以 hook 是否生效取决于当前选中的 agent [@ref-amazon-q-repo-format-hooks][@ref-amazon-q-repo-default-builtin]。matcher 决定工具类 hook 是否匹配 [@ref-amazon-q-repo-hooks-matching]。缺口：旧格式 hook 有 `disabled` 与 `type` 字段，迁移文档给出的新版示例里已不再出现，当前 Hook 结构也没有 `disabled`，因此"临时禁用单个 hook"没有依据，只能靠移除该条目；这一点按 partial 记录 [@ref-amazon-q-repo-migration-hooks][@ref-amazon-q-repo-hook-struct]。

## 诊断 {#hooks-diagnostics}

**hooks.diagnostics**：会话内 `/hooks` 命令列出每个触发点及其配置的命令；没有任何 hook 时打印 "No hooks are configured." 并给出 agent 格式文档链接 [@ref-amazon-q-repo-hooks-command][@ref-amazon-q-repo-slash-commands]。执行期反馈由 CLI 直接输出：失败会显示命令、耗时与错误，非 0 退出码的 STDERR 以警告展示 [@ref-amazon-q-repo-hooks-output]。hook 的定义位置与写法可对照 `docs/hooks.md` 与 agent 格式文档 [@ref-amazon-q-repo-hooks-defining]。`q -v` 到 `q -vvv` 可提高日志级别，`q chat` 的日志写入 `qchat.log` [@ref-amazon-q-repo-cli-verbose]。

缺口：登记来源没有给出"hook 是否被执行过"的专门日志入口，也没有说明修改 agent 文件后是否需要重启会话（hook 取自当前 agent 上下文）；按 partial 记录。
