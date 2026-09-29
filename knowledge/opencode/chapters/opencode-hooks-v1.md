---
schema_version: 2
record_kind: production
edition_id: opencode-hooks-v1
harness_id: opencode
topic: hooks
title: OpenCode 的 Hook 机制
sections:
  - section_id: hooks-entry
    source_refs:
      - ref-opencode-hooks-entry
      - ref-opencode-hooks-loadorder
  - section_id: hooks-events
    source_refs:
      - ref-opencode-hooks-interface
      - ref-opencode-hooks-toolhooks
      - ref-opencode-hooks-experimental
  - section_id: hooks-io
    source_refs:
      - ref-opencode-hooks-context
      - ref-opencode-hooks-toolhooks
      - ref-opencode-hooks-examples
      - ref-opencode-hooks-experimental
  - section_id: hooks-diagnostics
    source_refs:
      - ref-opencode-hooks-context
      - ref-opencode-hooks-examples
      - ref-opencode-hooks-logging
questions:
  - question_id: hooks.events
    section_id: hooks-events
    status: answered
    source_refs:
      - ref-opencode-hooks-interface
      - ref-opencode-hooks-toolhooks
      - ref-opencode-hooks-experimental
  - question_id: hooks.entry
    section_id: hooks-entry
    status: answered
    source_refs:
      - ref-opencode-hooks-entry
  - question_id: hooks.input
    section_id: hooks-io
    status: answered
    source_refs:
      - ref-opencode-hooks-context
      - ref-opencode-hooks-toolhooks
  - question_id: hooks.output
    section_id: hooks-io
    status: answered
    source_refs:
      - ref-opencode-hooks-toolhooks
      - ref-opencode-hooks-examples
      - ref-opencode-hooks-experimental
  - question_id: hooks.order
    section_id: hooks-entry
    status: answered
    source_refs:
      - ref-opencode-hooks-loadorder
  - question_id: hooks.conditions
    section_id: hooks-entry
    status: partial
    source_refs:
      - ref-opencode-hooks-entry
      - ref-opencode-hooks-loadorder
  - question_id: hooks.diagnostics
    section_id: hooks-diagnostics
    status: partial
    source_refs:
      - ref-opencode-hooks-logging
      - ref-opencode-hooks-examples
---
本章依据固定源码提交 545f51d 的官方文档与实现。在 OpenCode 里 Hook 不是独立的配置概念，而是插件返回的函数集合；这一产品专有结论决定了下面所有问题的答案形态。该提交不等于 npm 包 opencode-ai@1.18.32 的运行时行为。

## 注册与加载 {#hooks-entry}

**hooks.entry**：OpenCode 没有单独的 Hook 配置文件或 `hooks` 段。Hook 是插件模块导出的函数所返回的对象键。插件来源有三：项目目录 `.opencode/plugins/`、全局目录 `~/.config/opencode/plugins/`（启动时自动加载其中文件），以及配置 `plugin` 数组里列出的 npm 包（支持普通与 scoped 包名）。 [@ref-opencode-hooks-entry]

**hooks.order**：官方加载顺序为全局配置、项目配置、全局插件目录、项目插件目录，并声明“所有来源的 Hook 按顺序执行”。同名同版本的 npm 包只加载一次，但本地插件与同名的 npm 插件会分别加载，两者都会生效。 [@ref-opencode-hooks-loadorder]

**hooks.conditions**：目前可确认的生效条件只有“插件是否被加载”。目录内文件在启动时载入，npm 插件需能解析入口（源码另有 `engines.opencode` 兼容门禁，不满足则跳过该插件）。固定来源没有 Hook 级启用开关，也没有项目信任或沙箱说明，源码的 Hook 分发处同样没有权限判断，因此信任、权限与沙箱维度是已知缺口，本项标 partial。 [@ref-opencode-hooks-entry] [@ref-opencode-hooks-loadorder]

## 事件与回调 {#hooks-events}

**hooks.events**：Hook 事件由 `Hooks` 接口的键名定义，可分四组。事件与消息组：`event`、`config`、`chat.message`、`chat.params`、`chat.headers`、`permission.ask`、`command.execute.before`。工具与 Shell 组：`tool.execute.before`、`tool.execute.after`、`shell.env`、`tool.definition`。实验组：`experimental.chat.messages.transform`、`experimental.chat.system.transform`、`experimental.provider.small_model`、`experimental.session.compacting`、`experimental.compaction.autocontinue`、`experimental.text.complete`。`event` 覆盖文档列出的总线事件（如 `session.idle`、`file.edited`）。插件工具通过 `tool` 键注册，与 Hook 同属一个返回对象。 [@ref-opencode-hooks-interface] [@ref-opencode-hooks-toolhooks] [@ref-opencode-hooks-experimental]

## 输入与输出 {#hooks-io}

**hooks.input**：插件函数收到上下文 `{ project, client, $, directory, worktree }`，其中 `client` 是 opencode SDK 客户端，`$` 是 Bun Shell，`directory` 为当前工作目录，`worktree` 为 Git worktree 路径。单个回调收到 `(input, output)`：`tool.execute.before` 的 input 含 `tool`、`sessionID`、`callID`；`shell.env` 的 input 含 `cwd`（可带 sessionID、callID）。敏感内容的处理方式没有固定说明，`shell.env` 会注入环境变量，是否泄漏由插件自身负责。 [@ref-opencode-hooks-context] [@ref-opencode-hooks-toolhooks]

**hooks.output**：Hook 通过改写 `output` 影响流程，或抛异常阻断操作。`tool.execute.before` 可改写 `output.args`，抛错则阻止工具执行（文档的 `.env` 保护示例用 `throw` 拒绝读取）；`shell.env` 写 `output.env` 注入环境变量；`tool.execute.after` 可改写输出的 title、output、metadata；`experimental.session.compacting` 用 `output.context` 追加内容，或用 `output.prompt` 整体替换压缩提示。退出码语义未在固定来源中定义，本文只依据返回对象与异常作答。 [@ref-opencode-hooks-toolhooks] [@ref-opencode-hooks-examples] [@ref-opencode-hooks-experimental]

## 诊断 {#hooks-diagnostics}

**hooks.diagnostics**：插件内推荐用 `client.app.log()` 做结构化日志（`debug`、`info`、`warn`、`error`）替代 `console.log`。固定来源没有“列出已注册 Hook”“查看某 Hook 是否匹配或触发”的专用命令，也没有插件级健康检查；加载期错误只能从运行行为或插件自身日志推断。配置与插件文件修改何时生效，文档只说启动时加载，未给热重载入口，故本项标 partial。 [@ref-opencode-hooks-logging] [@ref-opencode-hooks-examples]
