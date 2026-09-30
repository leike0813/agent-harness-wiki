---
schema_version: 3
record_kind: production
edition_id: prime-agent-cli-hooks-v1
harness_id: prime-agent
topic: hooks
title: "Prime Agent CLI 的 Hook：扩展事件、输入输出语义与诊断"
sections:
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-prime-agent-ext-on, ref-prime-agent-ext-code-on, ref-prime-agent-args-flags, ref-prime-agent-pm-overrides, ref-prime-agent-code-migrations-hooks, ref-prime-agent-ext-locations, ref-prime-agent-ext-code-discovery, ref-prime-agent-pm-auto, ref-prime-agent-ext-code-resolve, ref-prime-agent-ext-code-manifest, ref-prime-agent-ext-quickstart]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-prime-agent-ext-lifecycle, ref-prime-agent-ext-types-events, ref-prime-agent-ext-events]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-prime-agent-ext-types-ctx, ref-prime-agent-ext-ctx, ref-prime-agent-ext-commandctx, ref-prime-agent-ext-bash-events, ref-prime-agent-ext-tool-events, ref-prime-agent-ext-input-events, ref-prime-agent-ext-agent-events]
  - section_id: hooks-output-order
    surface_ids: [cli]
    source_refs: [ref-prime-agent-ext-tool-events, ref-prime-agent-ext-session-events, ref-prime-agent-ext-agent-events, ref-prime-agent-ext-input-events, ref-prime-agent-ext-bash-events, ref-prime-agent-ext-runner-emit, ref-prime-agent-ext-runner-toolcall, ref-prime-agent-ext-error, ref-prime-agent-ex-permission-gate]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-prime-agent-ext-locations, ref-prime-agent-args-flags, ref-prime-agent-pm-overrides, ref-prime-agent-ex-readme, ref-prime-agent-ex-permission-gate, ref-prime-agent-ext-modes]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-prime-agent-diag-main, ref-prime-agent-diag-interactive, ref-prime-agent-ext-code-errors, ref-prime-agent-ext-error, ref-prime-agent-ext-runner-toolcall, ref-prime-agent-diag-snapshot, ref-prime-agent-diag-reload, ref-prime-agent-ext-code-reload]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-prime-agent-ext-events, ref-prime-agent-ext-lifecycle, ref-prime-agent-ext-types-events]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: conflict
        source_refs: [ref-prime-agent-ext-on, ref-prime-agent-ext-locations, ref-prime-agent-pm-overrides, ref-prime-agent-args-flags, ref-prime-agent-code-migrations-hooks, ref-prime-agent-ext-code-discovery]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-prime-agent-ext-tool-events, ref-prime-agent-ext-bash-events, ref-prime-agent-ext-input-events, ref-prime-agent-ext-agent-events, ref-prime-agent-ext-ctx, ref-prime-agent-ext-types-ctx]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output-order
        status: answered
        source_refs: [ref-prime-agent-ext-tool-events, ref-prime-agent-ext-session-events, ref-prime-agent-ext-input-events, ref-prime-agent-ext-bash-events, ref-prime-agent-ext-error]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-output-order
        status: answered
        source_refs: [ref-prime-agent-ext-runner-emit, ref-prime-agent-ext-runner-toolcall, ref-prime-agent-ext-error, ref-prime-agent-ext-tool-events]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-prime-agent-ext-locations, ref-prime-agent-args-flags, ref-prime-agent-pm-overrides, ref-prime-agent-ext-modes]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-prime-agent-diag-main, ref-prime-agent-diag-interactive, ref-prime-agent-ext-code-errors, ref-prime-agent-diag-reload, ref-prime-agent-ext-code-reload]
---

## Hook 的载体与注册入口 {#hooks-entry}

Prime Agent 的“Hook”就是**扩展事件处理器**：扩展（TypeScript 模块）导出默认工厂函数 `(pi: ExtensionAPI)`（可返回 void，也可返回 Promise），唯一的注册动作是 `pi.on(event, handler)`，实现把每个 handler 依次压进该扩展的 `handlers` map，注册多少个就调用多少个。[@ref-prime-agent-ext-on][@ref-prime-agent-ext-code-on]

**设置文件里没有 `hooks` 键，也没有任何声明式 handler 配置**：设置 schema 只有 `packages`、`extensions`、`skills`、`prompts`、`themes`；`settings.json` 的 `extensions` 数组在实现中只作为 `!`/`+`/`-` 覆盖模式作用于自动发现的条目，真正追加路径的入口是 `-e`/`--extension`。历史目录 `hooks/` 已废弃，启动迁移只保留一条 `Hooks have been renamed to extensions.` 的告警。[@ref-prime-agent-args-flags][@ref-prime-agent-pm-overrides][@ref-prime-agent-code-migrations-hooks]

Hook 的落点（决定 `/reload` 能否热重载）[@ref-prime-agent-ext-locations][@ref-prime-agent-ext-code-discovery]：

| 位置 | 说明 |
| :-- | :-- |
| `~/.prime/agent/extensions/*.ts` 或 `*.js` | 全局单文件扩展 |
| `~/.prime/agent/extensions/NAME/index.ts`（或 `index.js`） | 全局目录型扩展 |
| `.prime/agent/extensions/` 下同样两种形式 | 项目级 |
| 设置 `extensions` 数组 | 对以上条目做 include/exclude/force 模式 |
| `-e` / `--extension SOURCE` | 命令行追加，可重复，装到临时目录仅本次运行有效 |
| 包（npm/git/本地）内的 `extensions/` 目录或 `package.json` 的 `pi.extensions` | 由 `prime-agent package install` 安装后自动发现 |

**来源分歧**：官方《Extension Locations》把设置写成“Additional paths via settings.json”，示例是 `"extensions": ["/path/to/local/extension.ts", "/path/to/local/extension/dir"]`；同一提交的实现只把这两个数组当作覆盖模式交给自动发现结果过滤（`isEnabledByOverrides` 只识别 `!`/`+`/`-` 前缀，裸路径不参与匹配），因此按代码这类裸路径不会额外加载任何扩展。要额外加载请用 `-e`/`--extension` 或把扩展放进上面的四个目录。[@ref-prime-agent-ext-locations][@ref-prime-agent-pm-overrides]

发现顺序是**项目目录先、用户目录后**，随后按路径去重；单层目录规则是 `extensions/*.ts|*.js`、`extensions/*/index.ts|index.js`、`extensions/*/package.json`（含 `pi.extensions`），再深不递归，复杂包必须用 manifest。目录入口解析顺序为：`package.json` 的 `pi.extensions`（仅保留实际存在的路径）→ `index.ts` → `index.js`。[@ref-prime-agent-pm-auto][@ref-prime-agent-ext-code-resolve][@ref-prime-agent-ext-code-manifest]

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.notify("Extension loaded!", "info");
  });

  pi.on("tool_call", async (event, ctx) => {
    if (event.toolName === "bash" && event.input.command?.includes("rm -rf")) {
      const ok = await ctx.ui.confirm("Dangerous!", "Allow rm -rf?");
      if (!ok) return { block: true, reason: "Blocked by user" };
    }
  });
}
```

[@ref-prime-agent-ext-quickstart]

## 事件目录与触发时点 {#hooks-events}

共 26 个可监听事件，按生命周期分组（官方事件章节与实现类型一一对应）[@ref-prime-agent-ext-lifecycle][@ref-prime-agent-ext-types-events][@ref-prime-agent-ext-events]：

| 分组 | 事件 | 时点 |
| :-- | :-- | :-- |
| 资源 | `resources_discover` | `session_start` 之后，扩展可贡献 skill/prompt/theme 路径（`reason` 为 `startup` 或 `reload`） |
| 会话 | `session_start`、`session_before_switch`、`session_before_fork`、`session_before_compact`、`session_compact`、`session_before_refine`、`refine_complete`、`session_before_tree`、`session_tree`、`session_shutdown` | 会话启动/加载/重载；`/new`、`/resume`、`/fork`、`/clone`、压缩、`/refine`、`/tree` 的前后可取消或改写；拆除扩展宿主前 |
| Agent | `before_agent_start`、`agent_start`、`agent_end`、`turn_start`、`turn_end`、`context`、`before_provider_request`、`after_provider_response` | 每轮用户提示一次、每个模型回合一次；`context` 在每次 LLM 调用前，`before_provider_request` 在载荷构建后发请求前，`after_provider_response` 在拿到响应头、消费流之前 |
| 消息 | `message_start`、`message_update`、`message_end` | 消息生命周期 |
| 工具 | `tool_execution_start`、`tool_execution_update`、`tool_execution_end`、`tool_call`、`tool_result` | `tool_call` 在执行前且**可阻断**；`tool_result` 在执行后、最终工具结果消息发出前且**可改写** |
| 模型 | `model_select`、`thinking_level_select` | `/model`、`Alt+M` 轮换或会话恢复；思考级别变化（仅通知，返回值被忽略） |
| 用户 Shell | `user_bash` | 用户执行 `!` 或 `!!` 命令时，可拦截 |
| 输入 | `input` | 收到用户输入、扩展命令检查之后、skill 与模板展开之前 |

同名“插件事件”不存在另一套来源：事件名就是这套固定清单，插件（扩展）与内置宿主共用同一批事件。[@ref-prime-agent-ext-types-events][@ref-prime-agent-ext-events]

## Handler 输入、上下文与敏感内容 {#hooks-input}

Handler 签名是 `(event, ctx) => R | void`，`event` 字段随事件而定，`ctx` 是统一的 `ExtensionContext`[@ref-prime-agent-ext-types-ctx][@ref-prime-agent-ext-ctx]：

| 事件 | 常用输入字段 |
| :-- | :-- |
| `tool_call` | `toolName`、`toolCallId`、`input`（**可变**，就地改写即成为实际执行参数） |
| `tool_result` | `toolName`、`toolCallId`、`input`、`content`、`details`、`isError` |
| `user_bash` | `command`、`excludeFromContext`（`!!` 为真）、`cwd` |
| `input` | `text`（尚未展开 skill/模板的原始输入）、`images`、`source`（`interactive`/`rpc`/`extension`） |
| `before_agent_start` | `prompt`、`images`、`systemPrompt`、`systemPromptOptions`（含 `contextFiles`、`skills`、`selectedTools` 等） |

[@ref-prime-agent-ext-input-events][@ref-prime-agent-ext-agent-events]

`ctx` 提供 `ui`、`hasUI`、`cwd`、`sessionManager`（只读）、`modelRegistry`、`model`、`isIdle()`、`signal`、`abort()`、`hasPendingMessages()`、`shutdown()`、`getContextUsage()`、`compact()`、`getSystemPrompt()` 以及宿主托管的 `setTimeout`/`setInterval`。命令处理器拿到的是扩展版 `ExtensionCommandContext`（多出 `waitForIdle`、`newSession`、`fork`、`navigateTree`、`switchSession`、`reload`），文档警告不要在事件 handler 里调用这些会话控制方法，否则可能死锁。[@ref-prime-agent-ext-ctx][@ref-prime-agent-ext-commandctx]

环境与敏感内容[@ref-prime-agent-ext-types-ctx][@ref-prime-agent-ext-bash-events][@ref-prime-agent-ext-tool-events]：

- 没有按 handler 注入环境变量的机制；`pi.exec()` 合并宿主会话环境。cwd 通过 `ctx.cwd` 与部分事件字段（`resources_discover.cwd`、`user_bash.cwd`）暴露；
- 扩展层**不做脱敏**：工具入参、工具输出与提示文本原样可见，因为扩展本身与宿主同进程；
- 唯一的内容抑制是 `user_bash` 的 `excludeFromContext`（`!!` 置真），使该命令不进入 LLM 上下文。

## 返回值语义、顺序与失败处理 {#hooks-output-order}

返回值决定能否继续、修改或阻断[@ref-prime-agent-ext-tool-events][@ref-prime-agent-ext-session-events][@ref-prime-agent-ext-agent-events][@ref-prime-agent-ext-input-events][@ref-prime-agent-ext-bash-events]：

| 事件 | 返回 |
| :-- | :-- |
| `tool_call` | `{ block: true, reason?: string }`；改参数靠就地改写 `event.input`，不重新校验 |
| `tool_result` | 部分补丁 `{ content?, details?, isError? }`，省略字段保持原值 |
| `context` | `{ messages? }`，输入是深拷贝，不破坏原消息 |
| `before_provider_request` | 返回任意非 `undefined` 值即**替换**请求载荷 |
| `before_agent_start` | `{ message?, systemPrompt? }`；消息累积，系统提示在多个 handler 间链式修改 |
| `resources_discover` | `{ skillPaths?, promptPaths?, themePaths? }`，多来源聚合 |
| `user_bash` | `{ operations? }` 或 `{ result? }`（直接给出结果即完全接管），首个真值结果生效 |
| `input` | `{action:"continue"}` / `{action:"transform", text, images?}` / `{action:"handled"}`；transform 链式传递，handled 短路 |
| `session_before_*` | `{ cancel: true }` 或事件专有改写（如 `{ compaction }`、`{ summary }`、`{ proposal }`、`{ skip: true }`），一旦 cancel/skip 立即短路后续 handler |
| 通知型事件 | `thinking_level_select`、`session_compact`、`session_start`、`agent_start/end`、`tool_execution_*` 等的返回值被忽略 |

顺序与失败[@ref-prime-agent-ext-runner-emit][@ref-prime-agent-ext-runner-toolcall][@ref-prime-agent-ext-error]：

- 派发严格串行：外层按**扩展加载顺序**，内层按**同一扩展内的注册顺序**依次 `await` 每个 handler；没有并发、没有超时、没有重试与退避。
- 顺序对结果有影响：`tool_call` 的后续 handler 能看到前面 handler 对 `input` 的改写；`tool_result` 像中间件一样串接，每个 handler 看到上一个的结果。
- 重复触发：每次 `pi.on()` 调用追加一个 handler，因此同一事件注册两次就会执行两次；`/reload` 或会话替换时会换一个全新的 runner，旧 runner 被 retire，不会跨重载重复派发。
- 失败边界：多数事件路径捕获异常、转交错误通道并继续；**`tool_call` 不捕获**——抛出的异常向上传播，导致该工具调用被阻断（fail-safe）。工具 `execute` 的错误必须靠抛出，宿主会以 `isError: true` 报给模型并继续。

```typescript
// 示例扩展 permission-gate.ts：无人可确认时默认阻断
pi.on("tool_call", async (event, ctx) => {
  const command = event.input.command;
  if (typeof command === "string" && /\brm\s+-rf\b/.test(command)) {
    if (!ctx.hasUI) return { block: true, reason: "Dangerous command blocked (no UI for confirmation)" };
    ...
  }
});
```

[@ref-prime-agent-ex-permission-gate]

## 生效条件与信任边界 {#hooks-conditions}

- 启用/停用：项目与用户 `extensions/` 目录自动发现；`-ne`/`--no-extensions` 关闭发现；`-e`/`--extension` 追加；设置 `extensions` 用 `+PATH`/`-PATH`/`!PATTERN` 强制包含或排除已发现条目。[@ref-prime-agent-ext-locations][@ref-prime-agent-args-flags][@ref-prime-agent-pm-overrides]
- **没有权限或能力清单**：扩展与宿主同进程、以用户完整权限运行任意代码，官方只要求“只安装你信任的来源”；没有签名、allowlist、按扩展授权或沙箱。[@ref-prime-agent-ext-locations]
- 唯一的能力收缩是 `--no-builtin-tools`（去掉内置工具，保留扩展工具）与 `--tools` 白名单；沙箱与权限门只是官方示例：`examples/extensions/sandbox/` 通过覆盖内置 `bash` 工具接入外部沙箱运行时，`permission-gate.ts` 在无 UI 时默认阻断。[@ref-prime-agent-ex-readme][@ref-prime-agent-ex-permission-gate]
- 模式差异：交互模式有完整 TUI 方法；`--mode rpc` 下 UI 走 JSON 协议；`--mode json` 与 `-p` 下 UI 方法为空操作，扩展仍会运行但不能弹窗，写 handler 时应先看 `ctx.hasUI`。[@ref-prime-agent-ext-modes]

## 诊断与生效时机 {#hooks-diagnostics}

- **加载失败**：`Failed to load extension "PATH": ERROR` 与工具/标记冲突会进入启动诊断，交互模式在 `[Extension errors]`、`[Extension conflicts]` 一类头部下打印；`--verbose` 强制打印已加载的 extensions/skills/prompts/themes 清单。仅导出非法工厂的模块会得到 `Extension does not export a valid factory function`。[@ref-prime-agent-diag-main][@ref-prime-agent-diag-interactive][@ref-prime-agent-ext-code-errors]
- **运行期失败**：扩展错误经错误边界转到交互界面的聊天错误行（形如 `Extension "PATH" error: ...`），agent 继续运行；`tool_call` 的异常例外，会阻断工具。[@ref-prime-agent-ext-error][@ref-prime-agent-ext-runner-toolcall]
- **没有 `/extensions` 检查命令**：固定来源中不存在该命令；可用面是 `/reload`、`--verbose` 的资源清单、启动诊断与 `ctx.ui.notify` 这类扩展自报。daemon/agent 视图的会话快照里也带有扩展清单与诊断项。[@ref-prime-agent-diag-snapshot][@ref-prime-agent-diag-interactive]
- **改动何时生效**：`/reload` 走完整重载流程——向旧运行时发 `session_shutdown`，重新加载扩展/技能/提示/主题，再发 `session_start(reason: "reload")` 与 `resources_discover(reason: "reload")`；自动发现位置的扩展据此可热重载。设置文件没有文件监听，改完设置需要 `/reload` 或重开会话。[@ref-prime-agent-diag-reload][@ref-prime-agent-ext-code-reload]
