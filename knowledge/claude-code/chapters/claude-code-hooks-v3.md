---
schema_version: 3
record_kind: production
edition_id: claude-code-hooks-v3
harness_id: claude-code
topic: hooks
title: Claude Code 的 Hook 入口、事件与条件
sections:
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-files-20261003
      - ref-cc-skills-hooksfield-20261003
      - ref-cc-agents-plugin
      - ref-cc-mcp-pluginservers
      - ref-cc-mcp-stdio
      - ref-cc-hooks-elicitation
  - section_id: hooks-behavior
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-reload-20261003
      - ref-cc-config-broken-20261003
      - ref-cc-skills-stopsfollowing-20261003
      - ref-cc-hooks-trust
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-reload-20261003
      - ref-cc-config-broken-20261003
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
          - ref-cc-config-files-20261003
          - ref-cc-skills-hooksfield-20261003
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
          - ref-cc-config-reload-20261003
          - ref-cc-config-broken-20261003
          - ref-cc-hooks-trust
          - ref-cc-skills-stopsfollowing-20261003
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs:
          - ref-cc-config-reload-20261003
          - ref-cc-config-broken-20261003
---

固定快照里没有 Hook 专页，hook 结论来自设置页、Skills 页与 MCP 页的旁述，因此本章整体仍标记为 partial，事件全表、输出语义与顺序规则都只能写成缺口。依据 2026-10-03 抓取的官方设置页、Skills 页与 MCP 页快照。

## Hook 入口、事件与输入 {#hooks-entry}

在所见来源中具名出现的第一方事件有两个。`Elicitation` 用于在收到 MCP elicitation 请求时自动应答而不弹窗，把它写进 hook 配置即可跳过交互对话框；`ConfigChange` 在每次检测到设置文件变更时运行，可用它观测配置重载。完整的事件清单与各事件的触发时点位于未纳入快照的 Hook 页，插件是否另有同名事件也未被来源确认，因此这里不给出事件全表。 [@ref-cc-hooks-elicitation]

hook 配置写在 settings 文件里，团队共享的 `.claude/settings.json` 可以承载 hooks。 [@ref-cc-config-files-20261003] Skill 也可用 frontmatter 的 `hooks` 字段在技能被调用时注册 hook，并在此后会话余下时间继续运行，该字段的配置格式与 `once` 选项记录在 Hook 页上。 [@ref-cc-skills-hooksfield-20261003] 插件同样可以携带 hooks，因为它可打包 agents、hooks 与 MCP servers。 [@ref-cc-agents-plugin] 引用插件携带的 MCP 工具时，matcher 必须使用插件名、server key 与工具名组成的全限定名（`mcp__plugin_` 前缀），用裸 server key 写的 matcher 不会命中。 [@ref-cc-mcp-pluginservers] 所引来源没有给出 hooks 数组的字段、matcher 语法与过滤规则的完整表，属于缺口。

回调拿到的输入里可确认的一项是项目根目录：hook 通过的 `CLAUDE_PROJECT_DIR` 与传给 stdio MCP server 的是同一个路径，指向会话项目根。回调拿到的其余输入、环境变量以及敏感内容的处理方式，在所引快照中没有出现，属于缺口。 [@ref-cc-mcp-stdio]

## 输出、顺序与生效条件 {#hooks-behavior}

hook 的输出、退出码、异常或返回值如何继续、修改或阻断操作：所引固定来源没有描述。已检查入口为设置页的重载与拒绝条目说明、Skills 页的 `hooks` 字段说明，均未覆盖，这是明确缺口。

多个 hook 的顺序、并发、重复触发、超时与失败处理：所引来源同样没有出现。已检查入口同上，属于缺口。

可确认的生效条件有四条。设置文件变更会热重载，包括对 hooks 的修改，并为每次检测到的变更运行 `ConfigChange` hook，但经 MDM 或 claude.ai 控制台到达的托管设置不在此列。 [@ref-cc-config-reload-20261003] 解析层面，未知 hook 事件名与格式错误的权限规则被当作单项 Settings Warning 跳过，文件其余部分继续生效。 [@ref-cc-config-broken-20261003] 信任层面，settings 文件中的 hooks 在 `claude -p` 或 SDK 会话里会获得自动信任，而父目录的信任不算数，必须信任项目或目录本身。 [@ref-cc-hooks-trust]

第五条是 Skill 自带 hook 的生存期：写在 Skill `hooks` 字段里的那条规则从 Skill 被调用起一直有效到会话结束，宿主在事件每次发生时都会运行它，不依赖 Claude 是否还在遵循 Skill 正文。 [@ref-cc-skills-stopsfollowing-20261003] 启用状态、权限与沙箱对 hook 的影响没有进一步说明。

## 诊断与版本边界 {#hooks-diagnostics}

可用 `ConfigChange` hook 观测设置重载；被拒绝的条目（含未知 hook 事件名）可用 `claude doctor` 列出。整份文件 JSON 非法时报 Settings Error，单项失败时以 Settings Warning 跳过；`-p` 非交互运行不弹对话框，只跳过或打印错误。hook 是否被发现、匹配、执行及失败，以及配置修改何时生效的更细粒度诊断，所引来源没有给出专门入口。 [@ref-cc-config-reload-20261003] [@ref-cc-config-broken-20261003]

关于版本：本章所引官方页面均未标注适用版本，`version_applicability` 为 unknown。选定的 npm 包快照记录 `@anthropic-ai/claude-code` 版本为 2.1.283，包内 README 只指向在线文档，不能据此把这些 hook 机制固定到该精确版本。 [@ref-cc-npm-readme]
