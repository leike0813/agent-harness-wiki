---
schema_version: 3
record_kind: production
edition_id: crush-cli-hooks-v1
harness_id: crush
topic: hooks
title: "Crush 的 Hooks：PreToolUse 的配置、输入输出、顺序与诊断"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-crush-hooksdoc-facts, ref-crush-readme-hooks, ref-crush-skilldoc-hooks]
  - section_id: hooks-events-entry
    surface_ids: [cli]
    source_refs: [ref-crush-code-hook-events, ref-crush-hooksdoc-events, ref-crush-hooksdoc-facts, ref-crush-skilldoc-hooks, ref-crush-code-hook-validate, ref-crush-hooksdoc-pretooluse, ref-crush-hooksdoc-hookconfig, ref-crush-schema-hook, ref-crush-code-hook-builtin, ref-crush-configdoc-hook-add, ref-crush-configdoc-hook-remove, ref-crush-code-hook-struct, ref-crush-hooksdoc-config, ref-crush-code-config-lookup]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-crush-code-hook-payload, ref-crush-hooksdoc-env]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-crush-hooksdoc-exit-codes, ref-crush-hooksdoc-output, ref-crush-code-hook-stdout, ref-crush-code-hook-wrap, ref-crush-code-permission-request, ref-crush-code-hook-claude-compat, ref-crush-hooksdoc-claude]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-crush-hooksdoc-building, ref-crush-hooksdoc-multiple, ref-crush-code-hook-run, ref-crush-code-hook-runone, ref-crush-hooksdoc-aggregation, ref-crush-code-hook-aggregate, ref-crush-code-hook-runner, ref-crush-hooksdoc-timeouts, ref-crush-hooksdoc-exec]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-crush-code-hook-wrap, ref-crush-hooksdoc-pretooluse, ref-crush-code-build-tools, ref-crush-code-permission-request, ref-crush-code-hook-runone, ref-crush-code-hook-validate, ref-crush-code-reload]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-crush-code-hook-wrap, ref-crush-code-hook-events, ref-crush-code-hook-run, ref-crush-readme-logging, ref-crush-code-info-hooks, ref-crush-hooksdoc-examples, ref-crush-hooksdoc-example]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-entry
        status: answered
        source_refs: [ref-crush-code-hook-events, ref-crush-hooksdoc-events, ref-crush-hooksdoc-facts, ref-crush-skilldoc-hooks]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-entry
        status: answered
        source_refs: [ref-crush-hooksdoc-hookconfig, ref-crush-schema-hook, ref-crush-code-hook-builtin, ref-crush-configdoc-hook-add, ref-crush-code-hook-struct, ref-crush-code-hook-validate, ref-crush-hooksdoc-config]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-crush-code-hook-payload, ref-crush-hooksdoc-env]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-crush-hooksdoc-exit-codes, ref-crush-hooksdoc-output, ref-crush-code-hook-stdout, ref-crush-code-hook-wrap, ref-crush-code-permission-request]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs: [ref-crush-hooksdoc-building, ref-crush-code-hook-run, ref-crush-code-hook-runone, ref-crush-hooksdoc-timeouts, ref-crush-hooksdoc-exec]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-crush-code-hook-wrap, ref-crush-code-build-tools, ref-crush-code-permission-request, ref-crush-code-hook-validate, ref-crush-code-reload]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-crush-code-hook-wrap, ref-crush-code-hook-events, ref-crush-code-hook-run, ref-crush-readme-logging, ref-crush-code-info-hooks]
---

## 固定来源与界面 {#hooks-scope}

本章依据官方仓库 `charmbracelet/crush` 固定 commit `69c65c3d5be0a388d62047feb55d88b9bad7f1b2` 的检出：`docs/hooks/README.md`（含执行模型、输入输出、聚合与参考四部分）、README 的 Hooks 一节、内置技能 `internal/skills/builtin/crush-hooks/SKILL.md`，以及 `internal/hooks/`、`internal/agent/hooked_tool.go`、`internal/shellconfig/hook.go` 的实现。界面口径为 catalog 唯一登记的 `cli`。[@ref-crush-hooksdoc-facts][@ref-crush-readme-hooks][@ref-crush-skilldoc-hooks]

一句话概括：Hook 就是配置里声明的 shell 命令，在工具调用的固定时点执行，用退出码或 stdout 上的 JSON 回话 [@ref-crush-hooksdoc-facts]。

## 事件与配置入口 {#hooks-events-entry}

**当前只有 `PreToolUse` 一个事件**：它在每次工具调用之前触发，代码里也只有这一个事件常量；官方在文档与内置技能里都写明“目前只支持 PreToolUse，未来会补齐” [@ref-crush-code-hook-events][@ref-crush-hooksdoc-events][@ref-crush-hooksdoc-facts]。同名“插件事件”不存在——Crush 没有插件体系，hook 事件只有配置里 `hooks` 映射的键这一处来源。[@ref-crush-skilldoc-hooks]

事件名大小写不敏感且兼容 snake_case：`PreToolUse`、`pretooluse`、`PRETOOLUSE`、`pre_tool_use`、`PRE_TOOL_USE` 都会在加载时被规范化为 `PreToolUse` [@ref-crush-code-hook-validate][@ref-crush-hooksdoc-pretooluse]。

两种写法：

- JSON（`crush.json`/`.crush.json`）：顶层 `hooks` 对象，键是事件名，值是 hook 数组 [@ref-crush-hooksdoc-hookconfig][@ref-crush-schema-hook]。
- Bash（`crushrc`）：`hook add` 后跟事件名、`--command` 后跟命令，另可带可选的 `--name`、`--matcher`、`--timeout`，向该事件追加一条；同一事件可多次追加；`hook remove` 后跟事件名（可选 `--name`）按名字删除，不给名字则清空整个事件 [@ref-crush-code-hook-builtin][@ref-crush-configdoc-hook-add][@ref-crush-configdoc-hook-remove]。

单条 hook 的字段 [@ref-crush-code-hook-struct][@ref-crush-hooksdoc-hookconfig]：

| 字段 | 必填 | 默认 | 说明 |
| :-- | :-- | :-- | :-- |
| `command` | 是 | 无 | 要执行的 shell 命令；缺了会被拒绝 |
| `matcher` | 否 | 空 = 匹配所有工具 | 对工具名做正则匹配；空串表示匹配全部 |
| `name` | 否 | 回退为 `command` | TUI 展示名，也是 `hook remove --name` 的删除依据 |
| `timeout` | 否 | 30 秒 | 超时秒数；小于等于 0 按 30 秒处理 |

加载期校验：每个 hook 必须有 `command`，`matcher` 必须能编译成正则，否则直接以“invalid hook configuration”拒绝启动；校验发生在所有配置合并（含工作区数据配置）之后，所以工作区里加的 hook 也参与校验 [@ref-crush-code-hook-validate]。

作用域与合并：hook 定义在普通配置里，因此遵循同一套优先级——项目配置覆盖全局配置；官方在 hook 文档里也写明“项目级 hook 优先于全局” [@ref-crush-hooksdoc-config][@ref-crush-code-config-lookup]。命令的路径解析是**相对当前工作目录**，不是相对配置文件：项目级配置写 `./hooks/x.sh` 能工作是因为项目根就是工作目录，全局配置里必须写绝对路径或使用内联命令。[@ref-crush-hooksdoc-config]

一个最小可用的项目级配置（示例逐字来自 hook 文档的 Configuration 一节）[@ref-crush-hooksdoc-config]：

```jsonc
{
  "hooks": {
    "PreToolUse": [
      {
        "name": "no-rm-rf",
        "matcher": "^bash$",
        "command": "./hooks/no-rm-rf.sh",
        "timeout": 10
      }
    ]
  }
}
```

## 回调收到什么：环境变量与 stdin {#hooks-input}

两种输入方式同时提供，二者内容同源 [@ref-crush-code-hook-payload][@ref-crush-hooksdoc-env]：

- **环境变量**：`CRUSH=1`、`AGENT=crush`、`AI_AGENT=crush` 三个标记恒存在（与 `bash` 工具一致，便于脚本判断“是否在 agent 下运行”）；外加 `CRUSH_EVENT`、`CRUSH_TOOL_NAME`、`CRUSH_SESSION_ID`、`CRUSH_CWD`、`CRUSH_PROJECT_DIR`；再从工具输入里提取 `CRUSH_TOOL_INPUT_COMMAND`（bash 类工具的 command 字段）与 `CRUSH_TOOL_INPUT_FILE_PATH`（文件类工具的 file_path 字段）。
- **stdin JSON**：`event`、`session_id`、`cwd`、`tool_name`、`tool_input`，其中 `tool_input` 是模型发给该工具的原始 JSON 对象（不是字符串）。实现里若模型给的输入不是合法 JSON，会退化成 `{}` 再传给 hook。[@ref-crush-code-hook-payload]

环境里还包含当前进程的全部环境变量，因此 hook 可以正常使用 `PATH`、`HOME` 等 [@ref-crush-code-hook-payload]。敏感内容处理：文档没有对 env/stdin 做脱敏，hook 能看到工具输入的全部内容；想脱敏要靠 hook 自己改写输入（`updated_input`）。[@ref-crush-hooksdoc-env]

两种输入是同一份数据的两种视图：环境变量方便 shell 脚本直接 `$CRUSH_TOOL_INPUT_COMMAND` 取值，stdin 的 JSON 在输入结构复杂时更合适；实现里两者都由同一组参数构造，因此不会出现“env 与 JSON 不一致”。[@ref-crush-code-hook-payload]

## 输出、退出码与如何阻断 {#hooks-output}

退出码约定 [@ref-crush-hooksdoc-exit-codes]：

| 退出码 | 含义 |
| :-- | :-- |
| 0 | 成功；stdout 按 JSON 信封解析 |
| 2 | 阻断当前工具调用；stderr 作为拒绝理由，stdout 被忽略 |
| 49 | 直接中止整个回合；stderr 作为中止理由 |
| 其它 | 非阻断错误，记日志并忽略，工具照常执行 |

stdout 上的 JSON 信封字段 [@ref-crush-hooksdoc-output][@ref-crush-code-hook-stdout]：

| 字段 | 含义 |
| :-- | :-- |
| `version` | 信封版本，缺省 1；更高版本仍会被解析（只记日志） |
| `decision` | `allow` / `deny` / null；`allow` 是肯定式预批准（跳过权限询问），null 表示“无意见”，由正常权限流程决定 |
| `halt` | true 表示结束整个回合，用户接手 |
| `reason` | 拒绝或中止时展示的理由 |
| `context` | 字符串或字符串数组，追加到模型看到的内容里；空项被丢弃 |
| `updated_input` | 与原始 `tool_input` 做**浅合并**的补丁；未出现的键保留，嵌套对象整体替换 |

`decision: allow` 的实现路径是：hook 返回 allow 时给上下文打一个带 toolCallID 的标记，权限服务检查到该标记就直接批准并跳过询问，同时仍发出“已授权”通知（UI 与审计订阅者能看到结果）[@ref-crush-code-hook-wrap][@ref-crush-code-permission-request]。`deny` 会让工具调用直接返回一条错误响应给模型（模型可以换方法再试），`halt` 在此之上把回合的 `StopTurn` 置真，回合到此为止 [@ref-crush-code-hook-wrap]。

实现里还兼容 Claude Code 的输出结构：stdout JSON 里若出现 `hookSpecificOutput`，就按 Claude Code 的字段解析 [@ref-crush-code-hook-claude-compat][@ref-crush-hooksdoc-claude]。除这一处解析兼容外，官方只承诺本文档描述的接口，其它字段不保证生效 [@ref-crush-hooksdoc-claude]。

Claude Code 兼容的具体映射（实现里只认这一种包装）：stdout 顶层出现 `hookSpecificOutput` 时，取其中的 `permissionDecision` 作为 decision、`permissionDecisionReason` 作为 reason、`additionalContext` 作为 context、`updatedInput` 作为 updated_input；这是“原有 Claude Code hook 多数可原样跑”的实现基础。除了这组字段，官方强调只保证本文档描述的接口生效。[@ref-crush-code-hook-claude-compat][@ref-crush-hooksdoc-claude]

## 顺序、并发、超时与失败处理 {#hooks-order}

处理链（官方“Building Hooks”一节的五步在实现里逐条对应）[@ref-crush-hooksdoc-building][@ref-crush-hooksdoc-multiple][@ref-crush-code-hook-run][@ref-crush-code-hook-runone]：

1. 按 `matcher` 正则筛出与工具名匹配的 hook（没有 matcher 视为匹配全部）。
2. 按 `command` 字符串去重：完全相同的命令只跑一次。
3. 剩余 hook **并行**执行，子进程获得同一份 env 与 stdin。
4. 等全部结束或超时，然后**按配置顺序**聚合结果：`halt` 具有粘性；`reason` 按配置顺序换行拼接；`context` 同样按配置顺序拼接；`decision` 的优先级是 `deny` 大于 `allow` 大于 null（首个 deny 决定结果，后续 allow 不覆盖）；`updated_input` 按配置顺序依次浅合并到原始输入，后出现者覆盖同键。
5. 结果在权限检查**之前**应用：deny 直接阻断（用户看不到权限提示），allow 相当于预批准并跳过提示，无意见则进入正常权限流程；被 deny 或 halt 时 `updated_input` 补丁被忽略。

上述聚合规则的官方表述在 Hook 文档的 Aggregation 与 Multiple Hooks 两节，实现位于 `internal/hooks/hooks.go` 的 `aggregate` 函数（含浅合并补丁的实现）与 `Runner`（构造时编译 matcher、固定放弃宽限常量）[@ref-crush-hooksdoc-aggregation][@ref-crush-hooksdoc-multiple][@ref-crush-code-hook-aggregate][@ref-crush-code-hook-runner]。

超时与放弃：超过 `timeout` 会取消上下文；通过 shebang 派发的子进程用 `exec.CommandContext` 杀掉，进程内的命令只给约 1 秒宽限然后被放弃；两种情况都记 warning 并把该 hook 当作“无意见”，工具调用继续。[@ref-crush-code-hook-runone][@ref-crush-hooksdoc-timeouts]

执行环境：hook 跑在 Crush 内嵌的 POSIX shell（`mvdan.cc/sh`，与 `bash` 工具同一个解释器）里。内联命令与无 shebang 的脚本在进程内执行；带 `#!` 的脚本交由对应解释器（需要解释器在 `PATH` 上，绝对路径不存在时会回退按 basename 查找并记 debug 日志；解释器也找不到就退化成非阻断 warning）。Windows 不需要 WSL/Git Bash 即可运行内联 shell 与无 shebang 脚本；`.ps1` 不会按扩展名自动派发，需要显式写 `powershell -File ...`。[@ref-crush-hooksdoc-exec]

## 生效条件 {#hooks-conditions}

- **只在顶层 agent 上生效**：`wrapToolsWithHooks` 在 `isSubAgent` 为真时直接返回原工具集，因此子代理（`agent` 任务工具、`agentic_fetch`）内部的工具调用不会触发 hook；子代理工具本身的调用仍在外层被包装，所以“禁止派生子代理”这类策略依然有效 [@ref-crush-code-hook-wrap][@ref-crush-hooksdoc-pretooluse]。
- **只在配置里存在 hook 时才有包装**：构建工具集时先看 `PreToolUse` 是否有条目，没有就完全不构造 Runner [@ref-crush-code-build-tools]。
- **先于权限系统**：hook 阻断发生在权限询问之前，deny 时用户不会看到提示；allow 时标记被权限服务识别为预批准 [@ref-crush-code-hook-wrap][@ref-crush-code-permission-request]。
- **信任**：hook 命令按“与 shell alias 同级的用户自撰命令”执行（注释里的原话），因此没有额外的沙箱或信任门；能写配置就能执行命令 [@ref-crush-code-hook-runone]。
- **matcher 校验在加载期完成**，非法正则会阻止启动而不是等第一次工具调用才失败 [@ref-crush-code-hook-validate]。
- **生效时间**：Runner 在 agent 构建工具集时用当时的 hook 配置创建，配置变更后要重新构建工具集/重载配置才会用上新 hook；`ReloadFromDisk` 会重新编译 matcher（有回归测试守着这一点） [@ref-crush-code-build-tools][@ref-crush-code-reload]。

## 诊断 {#hooks-diagnostics}

- 每次工具调用后，hook 的结果会作为元数据挂在工具响应上（hook 数量、聚合 decision、是否 halt、reason、是否改写了输入，以及逐条 hook 的名称、matcher、decision、halt、reason、是否改写），TUI 据此显示 hook 指示；被阻断时模型收到的是带理由的错误响应。[@ref-crush-code-hook-wrap][@ref-crush-code-hook-events]
- 日志：每次聚合结束写一条 `Hook completed`，含事件名、工具名、参与的 hook 数量与最终 decision；单条 hook 的执行失败、超时、放弃、解释器回退等各有 warning/debug 行；`crush logs --follow` 或 `--debug` 可直接观察。[@ref-crush-code-hook-run][@ref-crush-readme-logging]
- `crush_info` 的 `[hooks]` 小节列出当前生效的 hook（事件、名称、matcher、命令）[@ref-crush-code-info-hooks]。
- 调试建议（来自官方示例与参考）：先用无 matcher 的日志型 hook 验证触发，再逐步加 matcher；`echo` 到 stderr 并 `exit 2` 是最小可验证的阻断方式；改完 `crush.json` 后需要让配置重新加载（重启 Crush）。[@ref-crush-hooksdoc-examples][@ref-crush-hooksdoc-example]

缺口：没有面向用户的“hook 调试模式”或 dry-run，也没有列出“某次工具调用匹配了哪些 hook、匹配用了哪条正则、实际耗时多少”的专用视图；这些信息只能从日志与工具响应元数据里拼出来。[@ref-crush-code-hook-run][@ref-crush-code-hook-wrap]
