---
schema_version: 3
record_kind: production
edition_id: goose-cli-hooks-v1
harness_id: goose
topic: hooks
title: "Goose CLI 的 Hooks：插件注册、事件、输入输出、顺序与诊断"
sections:
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-goose-hooks-doc-config, ref-goose-hooks-doc-disable, ref-goose-hooks-doc-intro, ref-goose-hooks-doc-where, ref-goose-hooks-src-action-fields, ref-goose-hooks-src-component-marker, ref-goose-hooks-src-entry-path, ref-goose-hooks-src-file-shape, ref-goose-hooks-src-matcher-invalid, ref-goose-hooks-src-no-permission, ref-goose-hooks-src-onfailure, ref-goose-hooks-src-onfailure-scope, ref-goose-hooks-src-plugin-config-map, ref-goose-hooks-src-plugin-settings, ref-goose-hooks-src-select-action, ref-goose-hooks-src-settings-paths, ref-goose-hooks-src-timeout-default]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-goose-hooks-doc-events, ref-goose-hooks-doc-matcher, ref-goose-hooks-doc-tool-keys, ref-goose-hooks-doc-troubleshoot, ref-goose-hooks-src-emit-delegated, ref-goose-hooks-src-emit-entry, ref-goose-hooks-src-emit-stop, ref-goose-hooks-src-events, ref-goose-hooks-src-select-action]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-goose-hooks-doc-payload, ref-goose-hooks-doc-tool-keys, ref-goose-hooks-src-failure-reasons, ref-goose-hooks-src-payload, ref-goose-hooks-src-plugin-root, ref-goose-hooks-src-pretool-result, ref-goose-hooks-src-stdin]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-goose-hooks-doc-block, ref-goose-hooks-doc-onfailure, ref-goose-hooks-doc-pretool-result, ref-goose-hooks-doc-stdout, ref-goose-hooks-src-apply-verdict, ref-goose-hooks-src-banner, ref-goose-hooks-src-classify, ref-goose-hooks-src-denial-wording, ref-goose-hooks-src-policy-evaluated, ref-goose-hooks-src-serialization, ref-goose-hooks-src-stdin]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-goose-hooks-doc-onfailure, ref-goose-hooks-doc-stop-cap, ref-goose-hooks-src-emit-fire-and-forget, ref-goose-hooks-src-first-deny, ref-goose-hooks-src-order, ref-goose-hooks-src-order-scope, ref-goose-hooks-src-stop-cap, ref-goose-hooks-src-timeout-default]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-hooks-doc-timeout, ref-goose-hooks-doc-troubleshoot, ref-goose-hooks-src-load-logs, ref-goose-hooks-src-runtime-logs, ref-goose-hooks-src-span]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: partial
        source_refs: [ref-goose-hooks-doc-events, ref-goose-hooks-doc-matcher, ref-goose-hooks-doc-tool-keys, ref-goose-hooks-doc-troubleshoot, ref-goose-hooks-src-emit-delegated, ref-goose-hooks-src-emit-entry, ref-goose-hooks-src-emit-stop, ref-goose-hooks-src-events, ref-goose-hooks-src-select-action]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-goose-hooks-doc-config, ref-goose-hooks-doc-disable, ref-goose-hooks-doc-intro, ref-goose-hooks-doc-where, ref-goose-hooks-src-action-fields, ref-goose-hooks-src-component-marker, ref-goose-hooks-src-entry-path, ref-goose-hooks-src-file-shape, ref-goose-hooks-src-matcher-invalid, ref-goose-hooks-src-no-permission, ref-goose-hooks-src-onfailure, ref-goose-hooks-src-onfailure-scope, ref-goose-hooks-src-plugin-config-map, ref-goose-hooks-src-plugin-settings, ref-goose-hooks-src-select-action, ref-goose-hooks-src-settings-paths, ref-goose-hooks-src-timeout-default]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-goose-hooks-doc-payload, ref-goose-hooks-doc-tool-keys, ref-goose-hooks-src-failure-reasons, ref-goose-hooks-src-payload, ref-goose-hooks-src-plugin-root, ref-goose-hooks-src-pretool-result, ref-goose-hooks-src-stdin]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-goose-hooks-doc-block, ref-goose-hooks-doc-onfailure, ref-goose-hooks-doc-pretool-result, ref-goose-hooks-doc-stdout, ref-goose-hooks-src-apply-verdict, ref-goose-hooks-src-banner, ref-goose-hooks-src-classify, ref-goose-hooks-src-denial-wording, ref-goose-hooks-src-policy-evaluated, ref-goose-hooks-src-serialization, ref-goose-hooks-src-stdin]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: partial
        source_refs: [ref-goose-hooks-doc-onfailure, ref-goose-hooks-doc-stop-cap, ref-goose-hooks-src-emit-fire-and-forget, ref-goose-hooks-src-first-deny, ref-goose-hooks-src-order, ref-goose-hooks-src-order-scope, ref-goose-hooks-src-stop-cap, ref-goose-hooks-src-timeout-default]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-goose-hooks-doc-config, ref-goose-hooks-doc-disable, ref-goose-hooks-doc-intro, ref-goose-hooks-doc-where, ref-goose-hooks-src-action-fields, ref-goose-hooks-src-component-marker, ref-goose-hooks-src-entry-path, ref-goose-hooks-src-file-shape, ref-goose-hooks-src-matcher-invalid, ref-goose-hooks-src-no-permission, ref-goose-hooks-src-onfailure, ref-goose-hooks-src-onfailure-scope, ref-goose-hooks-src-plugin-config-map, ref-goose-hooks-src-plugin-settings, ref-goose-hooks-src-select-action, ref-goose-hooks-src-settings-paths, ref-goose-hooks-src-timeout-default]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-goose-hooks-doc-timeout, ref-goose-hooks-doc-troubleshoot, ref-goose-hooks-src-load-logs, ref-goose-hooks-src-runtime-logs, ref-goose-hooks-src-span]
---

本节固定来源：仓库 `block/goose` 提交 `ac15f938` 的官方 Hooks 文档与 Rust 源码快照。勾子（Hook）机制跟随 Open Plugins 的 hooks 规范：钩子由磁盘上的插件提供，命中生命周期事件时以本地 shell 命令执行 [@ref-goose-hooks-doc-intro]。文档快照不含适用软件版本号，本章按来源级知识阅读。

## 钩子的注册位置、文件格式与启用条件 {#hooks-entry}

钩子属于某个插件目录：每个定义钩子的插件必须在根下提供 `hooks/hooks.json`，用户级插件放 `~/.agents/plugins/PLUGIN_NAME/`，项目级插件放 `PROJECT/.agents/plugins/PLUGIN_NAME/` [@ref-goose-hooks-doc-where]。源码侧同一份约束：加载器只对已发现的插件读取 `PLUGIN_ROOT/hooks/hooks.json`，文件不存在就跳过该插件 [@ref-goose-hooks-src-entry-path]。插件目录本身也是「插件」判定的组件标记之一，`hooks/hooks.json` 存在即可让一个无清单的仓库被识别为 Open Plugins 插件 [@ref-goose-hooks-src-component-marker]。

`hooks.json` 顶层是一个可选 `hooks` 映射，键是事件名，值是规则数组；每条规则有可选的 `matcher` 字符串与必需的 `hooks` 动作数组，动作的 `type` 省略或为 `"command"` 时按命令动作解析 [@ref-goose-hooks-src-file-shape]。命令动作字段与默认值：

| 字段 | 必需 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `command` | 是 | 字符串 | 无 | 以 `sh -c` 执行的命令 |
| `timeout` | 否 | 数字（秒） | `30` | 单条钩子超时；必须是 JSON 数字，`"5s"` 之类会报 `expected u64` |
| `on_failure` | 否 | `"allow"`/`"block"` | `"allow"` | 仅 `PreToolUse` 解析并校验，其它事件恒为默认值与文档一致 |

`timeout` 默认值来自源码常量 `DEFAULT_HOOK_TIMEOUT_SECS = 30` [@ref-goose-hooks-src-timeout-default]；字段形状见 `RawCommandAction` [@ref-goose-hooks-src-action-fields]；`on_failure` 的枚举与「只在 PreToolUse 生效」的判定见 [@ref-goose-hooks-src-onfailure] [@ref-goose-hooks-src-onfailure-scope]。官方文档给出同样的字段表与默认值 [@ref-goose-hooks-doc-config]。

插件示例（结构取自文档的插件示例，字段与源码一致）[@ref-goose-hooks-doc-config]：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "^shell$",
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/block-sudo.sh",
            "on_failure": "block"
          }
        ]
      }
    ]
  }
}
```

配置校验规则：未知事件名与不支持的字符串动作类型被静默忽略（只记 debug），被识别的事件里选中的命令动作会被校验——类型或 `command` 字段错误会让整份 `hooks.json` 被判无效并跳过该插件，matcher 正则非法只警告并跳过该条规则 [@ref-goose-hooks-src-select-action] [@ref-goose-hooks-src-matcher-invalid]。字段解析没有 `deny_unknown_fields`，多余的顶层键与规则字段被忽略。

启用条件：钩子只来自「已发现且启用」的插件。发现链是用户设置 `~/.config/goose/settings.json`（或 `GOOSE_PATH_ROOT` 下的同路径）、项目文件 `PROJECT/.config/goose/settings.json`、项目本地 `PROJECT/.config/goose/settings.local.json` 里的 `enabledPlugins`/`disabledPlugins` 列表，作用域优先 Local > Project > User，同一作用域内 disabled 优先于 enabled，任何作用域都未列出即默认启用 [@ref-goose-hooks-src-plugin-settings] [@ref-goose-hooks-src-settings-paths]。另有 `config.yaml` 的 `plugins:` 映射按插件绝对路径给出 `{enabled: bool}`，新发现的插件会被写成 `enabled: true` 并落盘 [@ref-goose-hooks-src-plugin-config-map]。把插件名加进 `disabledPlugins` 就会让它的钩子完全不运行 [@ref-goose-hooks-doc-disable]。

源码中没有任何沙箱或权限层拦截钩子执行：唯一的环境适配是 Flatpak 下改走开发者扩展的 `flatpak_spawn_command` [@ref-goose-hooks-src-no-permission]。文档侧的安全边界是「只运行可信钩子」，因为钩子会在本机执行命令 [@ref-goose-hooks-doc-intro]。

## 事件清单与触发时点 {#hooks-events}

源码里 `HookEvent` 枚举固定了 12 个事件名，也就是 `hooks.json` 中合法的键：`PreToolUse`、`PreToolUseResult`、`PostToolUse`、`PostToolUseFailure`、`SessionStart`、`SessionEnd`、`UserPromptSubmit`、`BeforeReadFile`、`AfterFileEdit`、`BeforeShellExecution`、`AfterShellExecution`、`Stop` [@ref-goose-hooks-src-events]。名字与字符串的映射由 `name()`/`from_name()` 给出，表外字符串返回 `None`，加载时 debug 记录并跳过，因此携带更新版配置的插件在旧版上不会报错 [@ref-goose-hooks-src-events] [@ref-goose-hooks-src-select-action]。

| 事件 | 触发时点 | matcher 匹配目标 | 来源 |
| --- | --- | --- | --- |
| `SessionStart` | 会话开始 | 无 | 文档事件表；源码在入口操作里发射 |
| `UserPromptSubmit` | 用户提交提示词 | 提示词文本 | 文档事件表；源码发射 |
| `PreToolUse` | 工具执行前 | 工具名 | 文档事件表 |
| `PreToolUseResult` | `PreToolUse` 链结算后、工具执行或拒绝返回前，仅观察 | 工具名 | 文档事件表 |
| `PostToolUse` | 工具成功后 | 工具名 | 文档事件表 |
| `PostToolUseFailure` | 工具失败后 | 工具名 | 文档事件表 |
| `BeforeReadFile` / `AfterFileEdit` | 读文件前 / 成功编辑文件后 | 文件路径 | 文档事件表 |
| `BeforeShellExecution` / `AfterShellExecution` | 执行 shell 前 / 成功后 | shell 命令 | 文档事件表 |
| `Stop` | 一轮结束时 | 无 | 文档事件表；源码发射 |
| `SessionEnd` | 会话结束 | 无 | 文档事件表 |

文档的完整事件表（含 matcher 目标与「`AfterFileEdit`/`AfterShellExecution` 只在成功后触发」的说明）[@ref-goose-hooks-doc-events]。文档明确 `SubagentStart`/`SubagentStop` 目前不会被发射，注册了也不会运行 [@ref-goose-hooks-doc-troubleshoot]。

源码侧可核对的发射点只有三处：入口操作在「当前 kickoff 之前不存在用户可见且非工具响应的用户消息」时发射 `SessionStart`，并在首条消息文本非空时以该文本（同时作为 `matcher_context`）发射 `UserPromptSubmit` [@ref-goose-hooks-src-emit-entry]；`Stop` 由停止操作在消息确实结束一轮时发射，携带最后一条助手文本与会话工作目录 [@ref-goose-hooks-src-emit-stop]。工具、文件与 shell 类事件的发射函数位于本次快照未签出的 `ops_toolcalling` 模块（同目录的 `ops_skills.rs` 从那里导入 `run_pre_tool_hooks`/`emit_post_tool_use`），因此这些事件的确切触发条件只按官方文档记录，源码未验证 [@ref-goose-hooks-src-emit-delegated]。同一原因，`SessionEnd` 只出现在枚举与名字表里，快照内找不到发射点 [@ref-goose-hooks-src-events]。

matcher 是 Rust 正则、非通配符，未匹配到目标就不运行；`*` 是非法正则，会导致整条规则被静默跳过（记警告），要匹配全部请省略 `matcher` 或写 `.*` [@ref-goose-hooks-doc-matcher]。工具事件上 `matcher_context` 就是工具名，`tool_name` 是宿主发给模型的名字（多数扩展形如 `{extension}__{tool}`，而 `developer`、`analyze`、`summon`、`code_execution` 不加前缀）[@ref-goose-hooks-doc-tool-keys]。

## 回调输入 {#hooks-input}

钩子命令从 stdin 收到一段 JSON 负载。必有的字段是 `event` 与 `session_id`，其余字段只在适用时出现（`Option` + `skip_serializing_if`，缺席即省略而不是 `null`）[@ref-goose-hooks-src-payload]。字段含义与出现条件（文档表）[@ref-goose-hooks-doc-payload]：

| 字段 | 出现条件 |
| --- | --- |
| `event` / `session_id` | 总是 |
| `matcher_context` | 该事件有匹配目标时（工具名、文件路径、shell 命令、提示词文本） |
| `tool_name` / `tool_input` / `working_dir` | 工具事件 |
| `tool_call_id` | `PreToolUse`、`PreToolUseResult`、`PostToolUse`、`PostToolUseFailure`，用于关联同一次调用 |
| `message` | `UserPromptSubmit` |
| `last_assistant_message` | `Stop` 且本轮有助手输出 |
| `decision` / `blocked_by` / `reason` / `cause` / `policy_evaluated` | `PreToolUseResult`（`decision` 只有 `allow`/`deny`，`cause` 为 `policy_denial` 或 `hook_failure`） |

`PreToolUseResult` 的负载类型在源码里就是扁平化的 `HookContext` 加一个可选 `cause`，`allow` 时不带 `blocked_by`/`reason` [@ref-goose-hooks-src-pretool-result]。`developer` 内置工具在 `tool_input` 里的键是固定的：`shell` 用 `command`（可选 `timeout_secs`）、`write` 用 `path`/`content`、`edit` 用 `path`/`before`/`after`、`tree` 用 `path`/`depth`、`read_image` 用 `source`（可选 `crop`）[@ref-goose-hooks-doc-tool-keys]。

执行环境：命令以 `sh -c COMMAND` 启动，`${PLUGIN_ROOT}` 在命令串里被文本替换为插件根目录，同时注入同名环境变量 `PLUGIN_ROOT` [@ref-goose-hooks-src-plugin-root]。stdin 交付失败（写不进去或关不掉管道）会被记录并置 `stdin_delivered=false` [@ref-goose-hooks-src-stdin]。运行器从不设置子进程的 `current_dir`，钩子继承 goose 进程的工作目录；负载里的 `working_dir` 是会话工作目录，不会用于 chdir [@ref-goose-hooks-src-plugin-root]。

敏感内容处理：钩子自己给的原因串原样透传、不截断不脱敏，因此钩子不应把密钥写进 `reason`；而框架生成的失败原因是有界常量（如 `the hook command failed to run`、`the hook payload could not be serialized`、`the hook did not receive the request payload`），不含命令串、插件路径或负载内容 [@ref-goose-hooks-src-failure-reasons]。文档给出同样的约束 [@ref-goose-hooks-doc-payload]。

## 输出、退出码与阻断语义 {#hooks-output}

决策按固定顺序解析，先看退出码再看 stdout [@ref-goose-hooks-src-classify]：

1. 退出码 `2` → 拒绝，原因取 stderr（为空时用默认串 `denied by plugin hook`）；
2. stdout 以 `{` 开头且能解析为 JSON、`decision` 恰为 `"block"` → 拒绝，原因取 `reason`（该判定与退出码无关，退出 `2` 以外任意码都生效）；
3. 退出码 `0` 且 stdout 为空或为 `{"decision":"allow"}` → 允许；
4. 其余一切（非零退出且无决策、stdout 有杂散输出、JSON 截断、数组、`{}`、未识别的 decision 值、非法 UTF-8、被信号杀死、超时、spawn 失败）→ 视为「没有给出决策」，也就是钩子失败。

文档把同一顺序写成读者可查的清单，并强调 stdout 是「决策通道」，日志必须写 stderr [@ref-goose-hooks-doc-stdout]。源码里 stdout 必须是合法 UTF-8，否则直接判失败（不修补字节）[@ref-goose-hooks-src-classify]；若负载没能投递到 stdin，允许类结论降级为失败，但已打印的显式拒绝仍被采纳 [@ref-goose-hooks-src-stdin]。

阻断能力只属于两个事件：`PreToolUse` 能拒绝工具调用，`Stop` 能阻止本轮结束；其它事件（含 `UserPromptSubmit` 与 `Before*`/`After*`）返回的 block 会被忽略 [@ref-goose-hooks-doc-block]。拒绝时返回给模型的文案分两种，源码与文档一致：策略拒绝是 ``Tool call denied by policy hook `PLUGIN`: REASON. Do not retry; this is a policy denial, not a transient failure.``，`on_failure: block` 下的钩子失败是 ``Tool call blocked because policy hook `PLUGIN` could not complete: REASON. That hook is configured to block on failure.`` [@ref-goose-hooks-src-denial-wording]。

失败处理：默认 fail-open（记录后继续工具调用）；只有动作声明了 `on_failure: "block"` 且事件为 `PreToolUse` 时，失败才转成拒绝；`Stop` 即使写了 `block` 仍然 fail-open [@ref-goose-hooks-src-apply-verdict]。文档侧对应说明 `on_failure` 只在 `PreToolUse` 生效，且不会覆盖显式拒绝 [@ref-goose-hooks-doc-onfailure]。负载序列化失败也是同一策略：默认 fail-open，若 `PreToolUse` 上存在匹配的阻塞动作则拒绝并归因到该插件 [@ref-goose-hooks-src-serialization]。

`PreToolUseResult` 用 `decision`/`cause`/`policy_evaluated` 三个字段区分结果：`decision` 是实际生效的决定（`on_failure: block` 下钩子失败也显示为 `deny`），`cause` 区分策略拒绝与钩子失败，`policy_evaluated` 是「至少有一个钩子跑到结论」的聚合值，与 `cause` 独立变化 [@ref-goose-hooks-doc-pretool-result]；源码中该聚合值在某个钩子成功退出或给出显式决策时置真，后续钩子失败不会把它改回假 [@ref-goose-hooks-src-policy-evaluated]。

除决策外还有一条柔性输出通道：stdout 起始为 `{` 且能解析出非空 `banner` 字符串时，该横幅会被收集用于展示（`SessionStart` 是文档化的用例）[@ref-goose-hooks-src-banner]。

## 执行顺序、超时与失败传播 {#hooks-order}

规则按插件发现顺序追加：项目作用域先于用户作用域，再按插件名、根路径排序，同名插件保留第一个 [@ref-goose-hooks-src-order-scope]，同一插件内按文件顺序；命中规则的多个动作严格串行——每个动作被 await 完成后才轮到下一个，没有并发 [@ref-goose-hooks-src-order]。阻断链在遇到第一个拒绝时立即返回，后续钩子不再运行 [@ref-goose-hooks-src-first-deny]；文档也把这条写进「策略钩子」的说明 [@ref-goose-hooks-doc-onfailure]。

单条钩子超时用 `tokio::time::timeout` 包住整个子进程执行：超时按失败处理（默认 fail-open，可被 `PreToolUse` + `on_failure: block` 升级为拒绝），超时值来自 `timeout` 字段或默认 30 秒 [@ref-goose-hooks-src-timeout-default]。观察类事件（`emit`）逐条执行且吞掉错误，只记录警告，不影响会话 [@ref-goose-hooks-src-emit-fire-and-forget]。

`Stop` 钩子拒绝时会阻止本轮结束：源码给该拒绝消息打上 `denied` 元数据，下次再算「连续阻断次数」，一旦超过构造时传入的上限 `block_cap`，就改为发一条警告通知并强行结束本轮，避免死循环 [@ref-goose-hooks-src-stop-cap]。文档说明该上限可用环境变量 `GOOSE_STOP_HOOK_BLOCK_CAP` 提高 [@ref-goose-hooks-doc-stop-cap]。

缺口：`block_cap` 的默认数值与 `GOOSE_STOP_HOOK_BLOCK_CAP` 的解析代码不在本次签出范围（只有构造函数签名与警告文案里出现该变量名），阈值默认值未验证；`HookManager::load`、入口/停止操作的调用点也不在快照内，因此实际传入的 `project_root` 与是否修复登录 shell 的 PATH 无法确认。

## 诊断 {#hooks-diagnostics}

每条被执行的钩子动作包在一个目标为 `goose::hooks`、名为 `execute_hook` 的 info span 里，属性含 `gen_ai.operation.name=execute_hook`、`goose.hook.event`、`goose.hook.plugin`、`session.id`，失败时带 `error.type`（`hook_exit` 或 `hook_execution_error`）[@ref-goose-hooks-src-span]。加载期的日志：未知事件、不支持的动作类型、缺 `command` 记 debug；整份文件加载失败记 `Failed to load plugin hooks; skipping`；成功记 `Loaded plugin hooks` 并附规则数与事件列表；matcher 非法记 `Invalid hook matcher regex; skipping rule` [@ref-goose-hooks-src-load-logs]。运行期日志：`Failed to serialize hook context`、`Running plugin hook`、`Plugin hook failed`、`Plugin hook could not be executed`、`Plugin hook failed; continuing without it`、`Plugin hook denied tool call`、`Could not deliver the hook payload`、`Could not close the hook stdin pipe` [@ref-goose-hooks-src-runtime-logs]。

排查入口（文档）：确认插件目录位置、`hooks/hooks.json` 存在、事件名在支持列表内、matcher 命中目标、命令路径正确（用 `${PLUGIN_ROOT}`）、脚本可执行、插件未被 `disabledPlugins` 禁用，以及事件不是 `SubagentStart`/`SubagentStop` [@ref-goose-hooks-doc-troubleshoot]；超时或失败时先确认没把日志打到 stdout、`{"decision":"allow"}` 没和非零退出码同时出现，必要时为该动作设置 `on_failure: block` 或更大的 `timeout` [@ref-goose-hooks-doc-timeout]。

缺口：`hooks.json` 在管理器构造时读一次（`std::fs::read_to_string` 后解析），快照内没有缓存失效或重载触发点，因此「改完配置何时生效」未被来源确立；日志可见性取决于 tracing 订阅者的初始化（在快照之外）。
