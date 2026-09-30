---
schema_version: 2
record_kind: production
edition_id: antigravity-cli-hooks-v1
harness_id: antigravity-cli
topic: hooks
title: Antigravity CLI 的 Hooks：配置入口、事件契约、匹配与诊断
sections:
  - section_id: hooks-entry
    source_refs:
      - ref-agy-hooks-locations
      - ref-agy-hooks-schema
      - ref-agy-hooks-fields
      - ref-agy-hooks-matcher
      - ref-agy-hooks-tools
      - ref-agy-hooks-handler
      - ref-agy-hooks-plugin-component
      - ref-agy-hooks-plugin-location
      - ref-agy-hooks-cmd-ref
  - section_id: hooks-events
    source_refs:
      - ref-agy-hooks-events
      - ref-agy-hooks-fields
      - ref-agy-hooks-plugin-component
      - ref-agy-hooks-cl-plugin-list
  - section_id: hooks-contract
    source_refs:
      - ref-agy-hooks-common-input
      - ref-agy-hooks-pretooluse-in
      - ref-agy-hooks-pretooluse-out
      - ref-agy-hooks-posttooluse
      - ref-agy-hooks-preinvocation
      - ref-agy-hooks-postinvocation
      - ref-agy-hooks-stop-in
      - ref-agy-hooks-stop-out
      - ref-agy-hooks-cl-approval
      - ref-agy-hooks-handler
  - section_id: hooks-order
    source_refs:
      - ref-agy-hooks-cl-order
      - ref-agy-hooks-cl-stop-cap
      - ref-agy-hooks-cl-posttooluse-matcher
      - ref-agy-hooks-cl-panic
      - ref-agy-hooks-cl-single-path
      - ref-agy-hooks-handler
      - ref-agy-hooks-posttooluse
  - section_id: hooks-conditions
    source_refs:
      - ref-agy-hooks-fields
      - ref-agy-hooks-cl-plugin-disable
      - ref-agy-hooks-cl-trust-reload
      - ref-agy-hooks-cl-truncation
  - section_id: hooks-diagnostics
    source_refs:
      - ref-agy-hooks-cmd-ref
      - ref-agy-hooks-locations
      - ref-agy-hooks-cl-plugin-list
      - ref-agy-hooks-cl-list-noconfig
      - ref-agy-hooks-cl-print-mode
      - ref-agy-hooks-cl-write-path
      - ref-agy-hooks-cl-empty-decision
      - ref-agy-hooks-cl-trust-reload
questions:
  - question_id: hooks.events
    section_id: hooks-events
    status: answered
    source_refs:
      - ref-agy-hooks-events
      - ref-agy-hooks-fields
      - ref-agy-hooks-plugin-component
      - ref-agy-hooks-cl-plugin-list
  - question_id: hooks.entry
    section_id: hooks-entry
    status: answered
    source_refs:
      - ref-agy-hooks-locations
      - ref-agy-hooks-schema
      - ref-agy-hooks-fields
      - ref-agy-hooks-matcher
      - ref-agy-hooks-tools
      - ref-agy-hooks-handler
      - ref-agy-hooks-plugin-component
      - ref-agy-hooks-plugin-location
      - ref-agy-hooks-cmd-ref
  - question_id: hooks.input
    section_id: hooks-contract
    status: partial
    source_refs:
      - ref-agy-hooks-common-input
      - ref-agy-hooks-pretooluse-in
      - ref-agy-hooks-posttooluse
  - question_id: hooks.output
    section_id: hooks-contract
    status: partial
    source_refs:
      - ref-agy-hooks-pretooluse-out
      - ref-agy-hooks-posttooluse
      - ref-agy-hooks-preinvocation
      - ref-agy-hooks-postinvocation
      - ref-agy-hooks-stop-in
      - ref-agy-hooks-stop-out
      - ref-agy-hooks-cl-approval
  - question_id: hooks.order
    section_id: hooks-order
    status: partial
    source_refs:
      - ref-agy-hooks-cl-order
      - ref-agy-hooks-cl-stop-cap
      - ref-agy-hooks-cl-posttooluse-matcher
      - ref-agy-hooks-cl-panic
      - ref-agy-hooks-cl-single-path
      - ref-agy-hooks-handler
  - question_id: hooks.conditions
    section_id: hooks-conditions
    status: partial
    source_refs:
      - ref-agy-hooks-fields
      - ref-agy-hooks-cl-plugin-disable
      - ref-agy-hooks-cl-trust-reload
      - ref-agy-hooks-cl-truncation
  - question_id: hooks.diagnostics
    section_id: hooks-diagnostics
    status: partial
    source_refs:
      - ref-agy-hooks-cmd-ref
      - ref-agy-hooks-locations
      - ref-agy-hooks-cl-plugin-list
      - ref-agy-hooks-cl-list-noconfig
      - ref-agy-hooks-cl-print-mode
      - ref-agy-hooks-cl-write-path
      - ref-agy-hooks-cl-empty-decision
---

本章讲的是 Antigravity CLI（可执行文件 `agy`）的 Hooks 机制。固定来源范围：官方文档快照（取于 2026-09-30，未注明适用软件版本），以及官方仓库提交 77b1aad 中登记的 `CHANGELOG.md` 与文档；产品没有官方 npm 包，也没有版本映射，整章按 source_only 阅读。

同步点：Hooks 的官方页面是多形态共享页，同一页面内并列 Antigravity 2.0、Antigravity CLI、Antigravity IDE 三个 tab。本章只把 CLI tab 描述的机制写成 CLI 的机制；其余形态的内容（例如 IDE 的 Customizations 菜单、2.0 的 Settings 面板）仅在与 CLI 路径形成冲突对照时提及，并明确它不属于 CLI。页面中形如 `app_data_dir` 的占位符对三个形态分别解析到不同目录，CLI 取 `~/.gemini/antigravity-cli` [@ref-agy-hooks-locations]。

## Hook 配置入口与作用域 {#hooks-entry}

CLI 把 Hook 定义为「拦截 agent 动作」的机制：在动作执行前或执行后立即介入，用于跑 pre-flight 检查或 post-generation 格式化器（例如写文件后跑 `prettier`）[@ref-agy-hooks-locations]。

Hook 的配置文件是 `hooks.json`，可以从三个作用域加载 [@ref-agy-hooks-locations]：

| 作用域 | 位置 | 生效范围 |
| :-- | :-- | :-- |
| 工作区级 | 项目根目录下的 `.agents/hooks.json` | 仅在该项目内生效 |
| 全局级 | `~/.gemini/config/hooks.json`，或写在主配置文件 `~/.gemini/antigravity-cli/settings.json` 里 | 本机所有工作区 |
| 插件级 | 插件包内的 `hooks.json` | 随插件启用而生效 |

插件级 Hook 的来源是插件包：插件目录把 `hooks.json` 列为可选组件，语义是「在工具调用前后执行 shell 命令的事件处理器」[@ref-agy-hooks-plugin-component]；安装后 CLI 把插件资产落到 `~/.gemini/antigravity-cli/plugins/PLUGIN_NAME/` [@ref-agy-hooks-plugin-location]。

文件格式是一个 JSON 对象，键是 Hook 名，值是「事件名到处理器数组」的映射 [@ref-agy-hooks-schema]。一个 Hook 名下的字段如下 [@ref-agy-hooks-fields]：

| 字段 | 类型 | 说明 |
| :-- | :-- | :-- |
| `enabled` | boolean | 可选。设为 `false` 可禁用该 Hook 而不删除定义，默认 `true` |
| `PreToolUse` | array | 工具执行前运行的处理器 |
| `PostToolUse` | array | 工具完成后运行的处理器 |
| `PreInvocation` | array | 调用模型前运行的处理器 |
| `PostInvocation` | array | 每次模型调用完成后立即运行 |
| `Stop` | array | 执行循环终止时运行 |

每个处理器（`hooks` 数组的元素）只有三个字段 [@ref-agy-hooks-handler]：

| 字段 | 类型 | 说明 |
| :-- | :-- | :-- |
| `type` | string | 可选，目前只支持 `"command"`，默认即 `"command"` |
| `command` | string | 必填，要执行的 shell 命令 |
| `timeout` | integer | 可选，超时秒数，默认 `30` |

matcher 只在 `PreToolUse` 与 `PostToolUse` 上有效，取值为正则表达式 [@ref-agy-hooks-matcher]：

- 空串或 `*`：匹配所有工具；
- `run_command`：精确匹配该工具名；
- `run_command|view_file`：匹配两者之一；
- `browser_.*`：匹配任何以 `browser_` 开头的工具。

`PreInvocation`、`PostInvocation`、`Stop` 的结构更简单——事件键下直接是处理器列表，matcher 被忽略 [@ref-agy-hooks-matcher]。

可被 matcher 匹配的工具名，官方按分类列全如下 [@ref-agy-hooks-tools]：

| 分类 | 工具名 | 出参（参数）|
| :-- | :-- | :-- |
| 文件与目录 | `view_file` | `AbsolutePath`、`StartLine`（可选）、`EndLine`（可选）、`IsSkillFile`（可选）|
| 文件与目录 | `write_to_file` | `TargetFile`、`Overwrite`、`CodeContent`、`Description`、`IsArtifact`（可选）、`ArtifactMetadata`（可选）|
| 文件与目录 | `replace_file_content` | `TargetFile`、`Instruction`、`Description`、`AllowMultiple`、`TargetContent`、`ReplacementContent`、`StartLine`、`EndLine`、`TargetLintErrorIds`（可选）|
| 文件与目录 | `multi_replace_file_content` | `TargetFile`、`Instruction`、`Description`、`ReplacementChunks`（块数组）、`TargetLintErrorIds`（可选）、`ArtifactMetadata`（可选）|
| 文件与目录 | `list_dir` | `DirectoryPath` |
| 文件与目录 | `find_by_name` | `SearchDirectory`、`Pattern`、`Type`（可选）、`Excludes`（可选）、`Extensions`（可选）、`FullPath`（可选）、`MaxDepth`（可选）|
| 搜索与研究 | `grep_search` | `SearchPath`、`Query`、`IsRegex`（可选）、`CaseInsensitive`（可选）、`Includes`（可选）、`MatchPerLine`（可选）|
| 搜索与研究 | `search_web` | `query`、`domain`（可选）|
| 搜索与研究 | `read_url_content` | `Url` |
| 系统与执行 | `run_command` | `CommandLine`、`Cwd`、`WaitMsBeforeAsync`、`RunPersistent`（可选）、`RequestedTerminalID`（可选）|
| 系统与执行 | `manage_task` | `Action`（`list`、`kill`、`status`、`send_input`）、`TaskId`（可选）、`Input`（可选）|
| 系统与执行 | `schedule` | `DurationSeconds`（可选）、`CronExpression`（可选）、`MaxIterations`（可选）、`Prompt` |
| 系统与执行 | `list_permissions` | 无 |
| 系统与执行 | `ask_permission` | `Action`、`Target`、`Reason` |
| Agent 协作 | `invoke_subagent` | `Subagents`（含 `Prompt`、`Role`、`TypeName`、`Workspace`（可选）的规格数组）|
| Agent 协作 | `define_subagent` | `name`、`description`、`system_prompt`、`enable_mcp_tools`（可选）、`enable_write_tools`（可选）、`enable_subagent_tools`（可选）|
| Agent 协作 | `send_message` | `Recipient`、`Message` |
| Agent 协作 | `manage_subagents` | `Action`（`list`、`kill`、`kill_all`）、`ConversationIds`（可选）|
| 交互与媒体 | `ask_question` | `questions`（含 `question`、`options`、`is_multi_select` 的数组）|
| 交互与媒体 | `generate_image` | `Prompt`、`ImageName`、`ImagePaths`（可选）|

CLI 之外还有 `agy plugin` 子命令与 `/plugin` 斜杠命令用于管理插件（安装、启用、禁用、卸载），这些命令决定插件级 `hooks.json` 是否参与加载，但 Hook 的启用状态本身仍由上面的 `enabled` 字段与插件启用状态共同决定。

交互式检查入口是 TUI 内的 `/hooks` 命令，官方描述为「浏览已加载并激活的 pre-flight/post-format 脚本 Hook」[@ref-agy-hooks-cmd-ref]，文档把它列为 CLI 的检查方式 [@ref-agy-hooks-locations]。

## 第一方事件与触发时点 {#hooks-events}

第一方事件共五个，触发时点与 matcher 目标如下 [@ref-agy-hooks-events]：

| 事件 | 触发时点 | matcher 目标 |
| :-- | :-- | :-- |
| `PreToolUse` | 工具执行之前 | 工具名（如 `run_command`）|
| `PostToolUse` | 工具完成之后 | 工具名 |
| `PreInvocation` | 调用模型之前 | 不适用（忽略 matcher）|
| `PostInvocation` | 每次模型调用完成之后立即 | 不适用（忽略 matcher）|
| `Stop` | 执行循环终止时 | 不适用（忽略 matcher）|

字段表对五个事件的描述与此一致：`PreInvocation` 在 Antigravity 调用模型前运行，`PostInvocation` 在每次模型调用完成后立即运行，`Stop` 在执行循环终止时运行 [@ref-agy-hooks-fields]。

「同名的插件事件是否另有来源」：插件自带 `hooks.json`，官方把它定义为「在工具调用前后执行 shell 命令的事件处理器」[@ref-agy-hooks-plugin-component]，即插件级文件与工作区/全局用的是同一份格式与同类事件处理器，而不是另立一套文件格式；但固定来源没有单独定义「插件专属事件名或触发时点」，也没有逐项声明插件级支持哪些事件，因此插件级的事件集合只能按同一格式理解（属推断，未在来源中逐项声明）。差别在于加载作用域随插件启用与否。`/hooks` 命令的列举范围包含插件内置的 `hooks.json`：仓库 CHANGELOG 记录过它曾经漏列插件内的 Hook，后已修复为把启用插件捆绑的 Hook 一并列出 [@ref-agy-hooks-cl-plugin-list]。文档本身没有单独为「插件事件」定义名称或额外触发时点，因此除作用域外，固定来源没有给出插件 Hook 与其它两个作用域在事件语义上的差异。

边界提醒：`PreInvocation`、`PostInvocation`、`Stop` 的 matcher 被忽略 [@ref-agy-hooks-events]，不要指望用 matcher 过滤这类事件。

## 输入、输出与阻断契约 {#hooks-contract}

Hook 通过 stdin 收 JSON、通过 stdout 回 JSON，字段名用 camelCase [@ref-agy-hooks-common-input]。

所有 Hook 都会在 stdin 收到以下公共系统元数据字段 [@ref-agy-hooks-common-input]：

| 字段 | 类型 | 说明 |
| :-- | :-- | :-- |
| `conversationId` | string | 当前 agent 会话的唯一 UUID |
| `workspacePaths` | 字符串数组 | 用户挂载工作区的绝对目录路径 |
| `transcriptPath` | string | 持久化 `transcript.jsonl` 会话日志的绝对路径 |
| `artifactDirectoryPath` | string | 存放会话产物与截图的目录绝对路径 |
| `modelName` | string | 处理本次调用的模型标识（如 `gemini-3.6-flash-medium`）|

关于工作目录与敏感内容：官方页面只固定了以上字段与 stdin/stdout 契约，没有写明 Hook 进程以哪个工作目录启动，也没有写明环境变量注入规则；`command` 只是「要执行的 shell 命令」[@ref-agy-hooks-handler]。换言之，输入通道（stdin JSON）是明确的，环境与 cwd 不是。`transcriptPath` 指向完整会话日志、`workspacePaths` 暴露工作区绝对路径，这属于会传给 Hook 的敏感面；文档没有说明对这些内容做脱敏、白名单或访问控制，需要运行观察才能判定实际边界。因此 `hooks.input` 记为 partial。

各事件的具体输入与输出如下。

**PreToolUse（工具执行前）** [@ref-agy-hooks-pretooluse-in]。输入：
- `toolCall`：被提案的工具调用详情，含 `toolCall.name`（工具名）与 `toolCall.args`（传给工具的实参对象）；
- `stepIdx`：当前步骤在轨迹中的 0 基索引；
- 以及全部公共字段。

输出（stdout）[@ref-agy-hooks-pretooluse-out]：
- `decision`（必填）：`allow` 直接放行；`deny` 立即硬阻断；`ask` 弹确认但尊重「Always Allow」设置；`force_ask` 总是弹确认、忽略已缓存权限；`deny_unless_prior_grant` 除非该资源曾获用户授权否则拒绝；
- `reason`（可选）：展示给 agent 或用户的决策解释；
- `permissionOverrides`（可选）：资源字符串数组（例如 `read_file(/path)`、`command(args)`），用于覆盖默认工具权限。这是文档明说的「可修改」通道之一。

**PostToolUse（工具完成后）** [@ref-agy-hooks-posttooluse]。输入：`toolCall`（含 `name` 与 `args`）、`stepIdx`、可选 `error`（失败时的运行时错误信息，成功为空），以及公共字段。输出固定为空的 JSON 对象 `{}`——该事件没有可写回决策的字段，属于「观察」而非「介入」。

**PreInvocation（调用模型前）** [@ref-agy-hooks-preinvocation]。输入：`invocationNum`（模型调用序号，从 0 开始）、`initialNumSteps`（当前轨迹中的步骤数），以及公共字段。输出：可选 `injectSteps`，在调用模型前注入轨迹；注入步的形态三选一——`toolCall`（要执行的工具调用）、`userMessage`（用户消息）、`ephemeralMessage`（临时系统消息）。

**PostInvocation（每次模型调用完成后）** [@ref-agy-hooks-postinvocation]。输入与 `PreInvocation` 相同。输出：可选 `injectSteps`（注入时机改为调用完成后，schema 同前）；可选 `terminationBehavior`——`force_continue` 强制循环继续，`terminate` 强制循环终止，空串或省略走默认行为。

**Stop（执行循环终止时）** [@ref-agy-hooks-stop-in]。输入：`executionNum`、`terminationReason`（如 `model_stop`、`max_steps_exceeded`、`error`）、可选 `error`、必填 `fullyIdle`（true 表示 agent 完全结束且所有后台/异步任务已完成，false 表示仍有后台任务在跑）。输出 [@ref-agy-hooks-stop-out]：必填 `decision`——设为 `continue` 可阻止 agent 停止并重新进入执行循环，任何其它值都允许停止；可选 `reason`——当 `decision` 为 `continue` 时，该文本作为系统消息注入会话。

退出码与异常：官方契约通篇只用 stdin/stdout 的 JSON 表达「继续、修改、阻断」，`PreToolUse` 与 `Stop` 的阻断语义分别由 `decision` 的 `deny` 与 `continue` 承载 [@ref-agy-hooks-pretooluse-out] [@ref-agy-hooks-stop-out]，`PostInvocation` 由 `terminationBehavior` 承载 [@ref-agy-hooks-postinvocation]。`decision` 为 `ask` 或 `force_ask` 时，`reason` 会进入工具审批提示：CHANGELOG 记录审批提示会加一行 `Reason:`，其中一个典型来源正是「某个 Hook 标记了该动作」[@ref-agy-hooks-cl-approval]。文档没有写明非零退出码、stdout 非 JSON、stderr 内容的处理规则，这也是 `hooks.output` 记为 partial 的原因；已知的异常处置只有 CHANGELOG 记录的一处——Hook 引发 panic 时被捕获而不再让 CLI 崩溃（见下一节）。

## 顺序、并发、超时与失败 {#hooks-order}

顺序：CHANGELOG 记录过一次顺序修正——`hooks.json` 里定义的 Hook 现在先于内建的终止检查运行，这样 `PostInvocation` Hook 能观察到一轮对话的最后一次调用，`Stop` Hook 也才真正可达，而不是被内建检查挡在后面 [@ref-agy-hooks-cl-order]。这条说明了两点：Hook 与内建终止逻辑之间有先后关系，且该关系曾是有歧义的实现细节，需要以运行观察为准。

同一事件下多个处理器的排列顺序、是否并发执行、是否对同一操作重复触发，文档没有说明。可观察的相关记录有两处：其一，`PostToolUse` 曾被修成不再在非工具步骤（用户输入、模型回复）上触发，修好之前它会忽略配置的 matcher [@ref-agy-hooks-cl-posttooluse-matcher]，说明「只是配置了 matcher」不等于实现一定按 matcher 过滤；其二，CHANGELOG 提到把 agent 执行收敛到单一执行路径后工具、Hook、prompt 行为更一致 [@ref-agy-hooks-cl-single-path]，暗示顺序与触发点会随版本变化。

超时：处理器可配 `timeout`（秒，默认 30）[@ref-agy-hooks-handler]。超时后 Hook 是被杀死、被忽略还是让操作失败，文档没有写明。

失败处理：`PostToolUse` 会把工具失败信息以 `error` 字段传给 Hook [@ref-agy-hooks-posttooluse]；对 Hook 自身失败，已知记录是 Hook 的 panic 被捕获、不再导致 CLI 崩溃 [@ref-agy-hooks-cl-panic]，以及 `Stop` Hook 反复返回继续会被限制——连续继续达到一个可配置次数后 Hook 不能再阻断，该轮正常结束 [@ref-agy-hooks-cl-stop-cap]。后者说明「一直返回 continue 的 Stop Hook」有内置上限，但上限的具体值与配置位置未在文档中给出。

因此 `hooks.order` 记为 partial：顺序（相对内建检查）与超时默认值、Stop 阻断上限、panic 捕获有出处；同一事件内多处理器的排序与并发、重复触发去重规则没有出处。

## 生效条件：启用、信任与预算 {#hooks-conditions}

逐 Hook 的开关是 `enabled` 字段：设为 `false` 即禁用该 Hook 而不必删除定义，默认 `true` [@ref-agy-hooks-fields]。

插件级 Hook 还受插件启用状态影响。CHANGELOG 记录过「已禁用插件仍在运行其 Hook」的问题，修复后禁用插件不再贡献 Hook 等定制内容——出问题的 Hook 会随插件关闭而停止，否则它甚至会拖坏文件编辑工具 [@ref-agy-hooks-cl-plugin-disable]。

工作区信任影响工作区级 Hook 的加载：`.agents/hooks.json`（工作区根目录）在信任该目录之后才加载；修复做法是每当工作区集合变化就重新加载 Hook [@ref-agy-hooks-cl-trust-reload]。也就是说「信任」既是 Hook 生效的前置条件，也是触发一次重载的时机。

定制内容的 token 预算截断也会影响 Hook：CHANGELOG 记录过在截断激活时 `hooks.json` 配置被静默丢弃的修复 [@ref-agy-hooks-cl-truncation]，说明存在一个会裁掉定制内容的预算机制，Hook 定义属于被裁对象。

文档层面没有把权限（permissions）或沙箱（sandbox）写成 Hook 的生效条件：登记的 permissions 页与 sandbox 页均未出现 Hook 相关条目，Hooks 页也没有提到权限/沙箱对 Hook 的限制。因此 `hooks.conditions` 记为 partial——启用字段、插件启用、工作区信任、token 预算截断均有出处；Hook 是否受工具权限体系或沙箱约束、以及 Hook 命令本身是否在沙箱内执行，文档未说明，需运行观察。

## 诊断与生效时机 {#hooks-diagnostics}

检查入口：
- TUI 内 `/hooks` 命令，官方描述为浏览已加载并激活的 pre-flight/post-format 脚本 Hook [@ref-agy-hooks-cmd-ref]；文档把它列为 CLI 的检查方式 [@ref-agy-hooks-locations]。
- `/hooks` 的列举范围覆盖插件内置 Hook：曾漏列，已修为把启用插件捆绑的 `hooks.json` 一并列出 [@ref-agy-hooks-cl-plugin-list]。
- 未显式指定 agent 配置时，`/hooks` 与 `/skills`、`/plugins`、`/agents` 曾误报「找不到定制内容」，修复方式是在列举视图挂载内建定制内容 [@ref-agy-hooks-cl-list-noconfig]。
- 非交互场景（print 模式）中 `/hooks` 可被直接回答：`-p "/hooks"` 会每行输出一条 tab 分隔记录，`--output-format json` 或 `stream-json` 下输出结构化载荷，且不启动 agent 回合、不消耗配额、不留会话 [@ref-agy-hooks-cl-print-mode]。

执行与失败的可见性：
- `PostToolUse` 的输入带 `error` 字段，是判断「工具为何失败」的入口。
- `PreToolUse` 返回空 decision 会导致权限管理器报「unknown pre-tool hook decision」类错误，CHANGELOG 记录已改为安全处理空 decision 字符串 [@ref-agy-hooks-cl-empty-decision]——排查 Hook 输出的第一步应是确认它返回了合法 JSON 与合法 `decision`。

配置修改何时生效：
- 工作区级 Hook 在信任目录、且工作区集合变化时重载 [@ref-agy-hooks-cl-trust-reload]，所以「信任后仍不生效」应优先怀疑未触发重载。
- `/hooks` 写配置的落点曾被修正：不再写到 `~/.gemini/antigravity-cli/hooks.json`，而是共享的 `~/.gemini/config/hooks.json`，以保证 TUI 与后端同步 [@ref-agy-hooks-cl-write-path]；排查「命令改了配置但后端没读到」时要核对这个路径。
- 逐文件热更新的语义未在文档中写明：`hooks.json` 被编辑后是否需要重开会话或触发工作区变化才生效，没有出处。因此 `hooks.diagnostics` 记为 partial——发现/列表/print 模式/重载时机有出处，单文件编辑的热加载边界需运行观察。
