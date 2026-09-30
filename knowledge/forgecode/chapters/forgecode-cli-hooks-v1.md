---
schema_version: 3
record_kind: production
edition_id: forgecode-cli-hooks-v1
harness_id: forgecode
topic: hooks
title: "ForgeCode CLI 的 Hook 机制：确认不存在用户级 Hook 与可用替代扩展点"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-forgecode-hooks-internal, ref-forgecode-hooks-nocommand]
  - section_id: hooks-absence
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-defaults, ref-forgecode-config-schema-top, ref-forgecode-hooks-nocommand]
  - section_id: hooks-internal
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-defaults, ref-forgecode-hooks-handlers, ref-forgecode-hooks-internal, ref-forgecode-hooks-wiring]
  - section_id: hooks-alternatives
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-permissions-doc, ref-forgecode-config-schema-top, ref-forgecode-hooks-nocommand]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-internal
        status: not_applicable
        source_refs: [ref-forgecode-hooks-internal, ref-forgecode-hooks-handlers]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-absence
        status: not_applicable
        source_refs: [ref-forgecode-config-schema-top, ref-forgecode-hooks-nocommand]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-absence
        status: not_applicable
        source_refs: [ref-forgecode-hooks-nocommand, ref-forgecode-config-schema-top]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-absence
        status: not_applicable
        source_refs: [ref-forgecode-hooks-nocommand, ref-forgecode-config-schema-top]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-absence
        status: not_applicable
        source_refs: [ref-forgecode-hooks-nocommand, ref-forgecode-config-schema-top]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-absence
        status: not_applicable
        source_refs: [ref-forgecode-hooks-nocommand, ref-forgecode-config-schema-top]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-alternatives
        status: not_applicable
        source_refs: [ref-forgecode-hooks-nocommand, ref-forgecode-config-permissions-doc]
---

## 固定来源与界面 {#hooks-scope}

本章依据官方仓库 `tailcallhq/forgecode` 固定 commit `571a28902b9c562594c02fd089fc58bf8595108f` 的检出与 forgecode.dev 官方文档快照。检查过的入口包括：`crates/forge_domain/src/hook.rs`（是否存在用户可注册的 Hook 抽象）、`crates/forge_app/src/hooks/` 与 `crates/forge_app/src/app.rs`（处理器如何被装配）、`forge.schema.json` 与 `crates/forge_config/.forge.toml`（配置面是否存在 hook 键）、`crates/forge_main/src/cli.rs` 顶层子命令（是否存在 hook 管理命令），以及 forgecode.dev 文档站的全部 `/docs/` 页面（是否存在 hooks 文档）。界面口径为 catalog 唯一登记的 `cli`。[@ref-forgecode-hooks-internal][@ref-forgecode-hooks-nocommand]

结论：ForgeCode 的 `cli` 界面**不提供用户级 Hook 机制**，因此本节对应问题全部记 `not_applicable`。“hook”一词只出现在内部 Rust 抽象与内部处理器命名中，用户无法在配置、CLI 或项目文件里注册回调。

## 不存在用户级 Hook：配置面与命令面的证据 {#hooks-absence}

配置面没有 Hook 键：发布的配置 schema `forge.schema.json` 顶层 `properties` 只包含 `auto_dump`、`http`、`providers`、`retry`、`session`、`restricted`、`subagents`、`temperature` 等运行参数，没有任何 hook/event 段落；全文件对 “hook” 的唯一一次提及是 `verify_todos` 的描述文字（“启用 pending todos hook”），它本身是一个布尔开关而不是注册机制 [@ref-forgecode-config-schema-top][@ref-forgecode-config-defaults]。

命令面没有 Hook 命令：顶层子命令是 agent、zsh/extension、list、banner、info、config、conversation、commit、mcp、suggest、provider、cmd、workspace、data、vscode、update、setup、doctor、logs、select，其中不含 hook 注册、列举或调试入口 [@ref-forgecode-hooks-nocommand]。

因此 `hooks.entry`、`hooks.input`、`hooks.output`、`hooks.order`、`hooks.conditions`、`hooks.diagnostics` 在固定来源内都没有可描述的机制；把它们写成 `not_applicable` 而不是 `unknown`，依据是上两处“应存在却不存在”的入口检查（schema 顶层键集合 + CLI 子命令集合）。文档站也没有 hooks 页面可引 [@ref-forgecode-hooks-nocommand]。

## 内部生命周期事件与内置处理器（不可由用户配置） {#hooks-internal}

源码里确实存在名为 `Hook` 的内部抽象，但它服务于宿主自身：`crates/forge_domain/src/hook.rs` 定义了一组带 agent 与 model 上下文的生命周期事件载荷——`StartPayload`、`EndPayload`、`RequestPayload`（请求计数）、`ResponsePayload`（完整回复）、`ToolcallStartPayload`（工具调用）等；这是宿主内部观察点，不暴露给用户注册 [@ref-forgecode-hooks-internal]。

处理器是编译期固定的：`crates/forge_app/src/hooks/` 只包含 `compaction`、`doom_loop`、`pending_todos`、`title_generation`、`tracing` 五个模块并导出对应的 `CompactionHandler`、`DoomLoopDetector`、`PendingTodosHandler`、`TitleGenerationHandler`、`TracingHandler`；装配发生在 `app.rs` 中构造 `Hook::default()` 时按配置追加 `on_end` 处理器（例如 `verify_todos` 为真时挂上 `PendingTodosHandler`），再由编排器在每个阶段触发 [@ref-forgecode-hooks-handlers][@ref-forgecode-hooks-wiring][@ref-forgecode-config-defaults]。

也就是说：能改的只有这些处理器背后的配置开关（如 `verify_todos`、`subagents`、`[compact]` 段），改不了“在某个时点执行我自己的脚本”。`hooks.events` 因此记 `not_applicable`（无面向用户的第一方事件）；上面列出的内部事件只作为实现背景说明，用户无法订阅。

## 实际可用替代扩展点 {#hooks-alternatives}

需要“在 ForgeCode 工作流中插入自定义行为”时，产品提供的扩展点是另外四类，各自有独立章节：

- MCP server：以进程或 HTTP 服务形式挂载工具，工具自动进入所有 agent 的工具池，这是最接近“外部插入逻辑”的机制，受项目级信任门约束。
- 自定义 agent 与 `AGENTS.md`：用 frontmatter 定义角色、工具白名单与采样参数，用项目根 `AGENTS.md` 注入持久规则。
- Skill 与自定义命令：`.forge/skills/{name}/SKILL.md` 提供按需加载的工作流，`.forge/commands/*.md` 提供用户可显式触发的命令。
- 权限策略：受限模式下 `permissions.yaml` 对内置工具做 allow/deny/confirm 判定，可作为“在操作前拦截”的替代手段 [@ref-forgecode-config-permissions-doc]。

这些机制都不具备“在一次工具调用前后执行任意脚本并改写其结果”的能力，因此不能算作 Hook 机制的等价物；本轮的 `not_applicable` 结论仍然成立。[@ref-forgecode-hooks-nocommand][@ref-forgecode-config-schema-top]
