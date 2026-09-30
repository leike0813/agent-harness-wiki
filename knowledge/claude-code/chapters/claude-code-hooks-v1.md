---
schema_version: 3
record_kind: production
edition_id: claude-code-hooks-v1
harness_id: claude-code
topic: hooks
title: Claude Code 的 Hook 入口、事件与条件
sections:
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-files
      - ref-cc-skills-frontmatter
      - ref-cc-mcp-pluginservers
      - ref-cc-mcp-stdio
      - ref-cc-hooks-elicitation
  - section_id: hooks-behavior
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-reload
      - ref-cc-config-broken
      - ref-cc-hooks-trust
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-reload
      - ref-cc-config-broken
      - ref-cc-npm-readme
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: partial
        source_refs:
          - ref-cc-hooks-elicitation
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: partial
        source_refs:
          - ref-cc-config-files
          - ref-cc-skills-frontmatter
          - ref-cc-mcp-pluginservers
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: partial
        source_refs:
          - ref-cc-mcp-stdio
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-behavior
        status: unknown
        source_refs: []
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-behavior
        status: unknown
        source_refs: []
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-behavior
        status: partial
        source_refs:
          - ref-cc-config-reload
          - ref-cc-config-broken
          - ref-cc-hooks-trust
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs:
          - ref-cc-config-reload
          - ref-cc-config-broken
---

## Hook 入口、事件与输入 {#hooks-entry}

固定来源没有 Hook 专页，hook 结论来自设置页、Skills 页与 MCP 页的旁述，故本章标记为 partial。

**hooks.events**：快照中具名出现的第一方事件只有两个。`ConfigChange` 在每次检测到设置文件变更时运行；`Elicitation` 用于在收到 MCP elicitation 请求时自动应答而不弹窗。完整的事件清单与各事件触发时点位于未纳入快照的 Hook 页，因此这里不给出事件全表；插件是否另有同名事件也未被来源确认。 [@ref-cc-hooks-elicitation]

**hooks.entry**：hook 配置写在 settings 文件中，团队共享的 `.claude/settings.json` 可以承载 hooks；Skill 也可用 frontmatter 的 `hooks` 字段在技能被调用时注册 hook 并在会话余下时间继续运行。引用插件携带的 MCP 工具时，hook matcher 必须使用插件名、server key 与工具名组成的全限定名（`mcp__plugin_` 前缀），用裸 server key 写的 matcher 不会命中。 [@ref-cc-config-files] [@ref-cc-skills-frontmatter] [@ref-cc-mcp-pluginservers]

**hooks.input**：可以确认的是项目根目录以 `CLAUDE_PROJECT_DIR` 传给 hook，与传给 stdio MCP server 的是同一个路径。回调拿到的其余输入、环境变量以及敏感内容的处理方式没有在所引快照中出现，属于缺口。 [@ref-cc-mcp-stdio]

## 输出、顺序与条件 {#hooks-behavior}

**hooks.output**：所引固定来源没有描述 hook 的输出、退出码、异常或返回值如何继续、修改或阻断操作。已检查入口为设置页的重载与拒绝条目说明、Skills 页的 `hooks` 字段说明，均未覆盖；这是明确缺口。

**hooks.order**：多个 hook 的顺序、并发、重复触发、超时与失败处理没有在所引来源中出现。已检查入口同上；这是明确缺口。

**hooks.conditions**：可确认三条条件。设置文件变更会热重载，包括对 hooks 的修改；对情况敏感的是信任：settings 文件中的 hooks 在 `claude -p` 或 SDK 会话里会获得自动信任，而父目录的信任不算数；解析层面，未知 hook 事件名被当作单项 Settings Warning 跳过，文件其余部分继续生效。启用状态、权限与沙箱对 hook 的影响没有进一步说明。 [@ref-cc-config-reload] [@ref-cc-config-broken] [@ref-cc-hooks-trust]

## 诊断与来源边界 {#hooks-diagnostics}

**hooks.diagnostics**：设置文件保存后，Claude Code 会对每次检测到的变更运行 `ConfigChange` hook，可用它观测重载；被拒绝的条目（含未知 hook 事件名）可用 `claude doctor` 列出；整份文件 JSON 非法时报 Settings Error，单项失败时以 Settings Warning 跳过。hook 是否被发现、匹配、执行及失败，以及配置修改何时生效的更细粒度诊断，所引来源没有给出专门入口。 [@ref-cc-config-reload] [@ref-cc-config-broken]

关于版本：本章所引官方页面均未标注适用版本，`version_applicability` 为 unknown。选定的 npm 包快照记录版本 2.1.283，包内 README 只指向在线文档，不能据此把上述 hook 机制固定到该精确版本。 [@ref-cc-npm-readme]
