---
schema_version: 3
record_kind: production
edition_id: cursor-cli-hooks-v2
harness_id: cursor
topic: hooks
title: Cursor CLI 的 Hooks：事件清单、配置入口、输入输出契约与生效条件
sections:
  - section_id: hooks-scope
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-overview
      - ref-cur-hooks-doc-capabilities
      - ref-cur-hooks-doc-thirdparty
      - ref-cur-hooks-changelog-intro
  - section_id: hooks-events
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-categories
      - ref-cur-hooks-doc-categories-tab
      - ref-cur-hooks-doc-config-file-scope
      - ref-cur-hooks-doc-cloud-supported
      - ref-cur-hooks-doc-cloud-unsupported
      - ref-cur-hooks-doc-cloud-unsupported-2
      - ref-cur-hooks-doc-cloud-unsupported-3
      - ref-cur-hooks-doc-cloud-sources
      - ref-cur-hooks-doc-cloud-exec-types
      - ref-cur-hooks-doc-event-workspaceopen
      - ref-cur-hooks-changelog-reliable
  - section_id: hooks-entry
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-overview
      - ref-cur-hooks-doc-quickstart-project
      - ref-cur-hooks-doc-types-prompt
      - ref-cur-hooks-doc-config-levels
      - ref-cur-hooks-doc-config-levels-mid
      - ref-cur-hooks-doc-config-levels-2
      - ref-cur-hooks-doc-config-cwd
      - ref-cur-hooks-doc-global-options
      - ref-cur-hooks-doc-script-options-2
      - ref-cur-hooks-doc-script-options-3
      - ref-cur-hooks-doc-script-options-extra
      - ref-cur-hooks-doc-script-options-matcher
      - ref-cur-hooks-doc-matcher-byhook
      - ref-cur-hooks-plugins-workspaceopen
      - ref-cur-hooks-sdk-file-based
  - section_id: hooks-input
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-common-input
      - ref-cur-hooks-doc-common-input-fields
      - ref-cur-hooks-doc-common-input-fields-2
      - ref-cur-hooks-doc-common-input-fields-3
      - ref-cur-hooks-doc-app-lifecycle-input
      - ref-cur-hooks-doc-env-vars
      - ref-cur-hooks-doc-env-vars-2
      - ref-cur-hooks-doc-env-session
      - ref-cur-hooks-doc-event-pretooluse
      - ref-cur-hooks-doc-event-subagentstart
      - ref-cur-hooks-doc-event-beforeshell-mcp-fields
      - ref-cur-hooks-doc-event-beforereadfile
      - ref-cur-hooks-doc-event-beforesubmitprompt
      - ref-cur-hooks-doc-event-sessionstart
      - ref-cur-hooks-changelog-stdin
  - section_id: hooks-output
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-types-command
      - ref-cur-hooks-doc-troubleshooting-exitcode
      - ref-cur-hooks-doc-script-options-extra
      - ref-cur-hooks-doc-example-blockgit
      - ref-cur-hooks-doc-event-pretooluse-3
      - ref-cur-hooks-doc-event-subagentstart-out
      - ref-cur-hooks-doc-event-posttooluse
      - ref-cur-hooks-doc-event-beforeshell-mcp
      - ref-cur-hooks-doc-event-beforereadfile-2
      - ref-cur-hooks-doc-event-beforetabfileread
      - ref-cur-hooks-doc-event-aftertabfileedit
      - ref-cur-hooks-doc-event-beforesubmitprompt
      - ref-cur-hooks-doc-event-stop
      - ref-cur-hooks-doc-event-stop-2
  - section_id: hooks-order
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-config-levels
      - ref-cur-hooks-doc-config-levels-2
      - ref-cur-hooks-doc-types-command
      - ref-cur-hooks-doc-script-options-3
      - ref-cur-hooks-doc-script-options-extra
      - ref-cur-hooks-doc-event-stop
      - ref-cur-hooks-doc-event-stop-2
      - ref-cur-hooks-doc-event-subagentstop
      - ref-cur-hooks-doc-event-sessionstart
  - section_id: hooks-conditions
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-team-vcs
      - ref-cur-hooks-doc-cloud-support
      - ref-cur-hooks-doc-cloud-sources
      - ref-cur-hooks-doc-cloud-exec-types
      - ref-cur-hooks-plugins-component
      - ref-cur-hooks-plugins-workspaceopen
      - ref-cur-hooks-runmodes-protected
      - ref-cur-hooks-changelog-plugin-hooks
      - ref-cur-hooks-changelog-worker-hooks
  - section_id: hooks-enforcement
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-cloud-dist
      - ref-cur-hooks-doc-mdm
      - ref-cur-hooks-ent-controls
      - ref-cur-hooks-ent-enforcement
      - ref-cur-hooks-ent-dlp
      - ref-cur-hooks-ent-approval
  - section_id: hooks-diagnostics
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-troubleshooting-active
      - ref-cur-hooks-doc-troubleshooting-exitcode
      - ref-cur-hooks-doc-example-audit
      - ref-cur-hooks-changelog-intro
      - ref-cur-hooks-changelog-stdin
      - ref-cur-hooks-changelog-reliable
      - ref-cur-hooks-changelog-payloads
      - ref-cur-hooks-changelog-plugin-hooks
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs:
          - ref-cur-hooks-doc-categories
          - ref-cur-hooks-doc-categories-tab
          - ref-cur-hooks-doc-config-file-scope
          - ref-cur-hooks-doc-cloud-supported
          - ref-cur-hooks-doc-cloud-unsupported
          - ref-cur-hooks-doc-cloud-unsupported-2
          - ref-cur-hooks-doc-cloud-unsupported-3
          - ref-cur-hooks-doc-cloud-sources
          - ref-cur-hooks-doc-cloud-exec-types
          - ref-cur-hooks-changelog-reliable
      - surface_ids: [cursor]
        section_id: hooks-events
        status: answered
        source_refs:
          - ref-cur-hooks-doc-categories
          - ref-cur-hooks-doc-categories-tab
          - ref-cur-hooks-doc-config-file-scope
          - ref-cur-hooks-doc-event-workspaceopen
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs:
          - ref-cur-hooks-doc-quickstart-project
          - ref-cur-hooks-doc-types-prompt
          - ref-cur-hooks-doc-config-levels
          - ref-cur-hooks-doc-config-levels-mid
          - ref-cur-hooks-doc-config-levels-2
          - ref-cur-hooks-doc-config-cwd
          - ref-cur-hooks-doc-global-options
          - ref-cur-hooks-doc-script-options-2
          - ref-cur-hooks-doc-script-options-3
          - ref-cur-hooks-doc-script-options-extra
          - ref-cur-hooks-doc-script-options-matcher
          - ref-cur-hooks-doc-matcher-byhook
          - ref-cur-hooks-sdk-file-based
      - surface_ids: [cursor]
        section_id: hooks-entry
        status: answered
        source_refs:
          - ref-cur-hooks-doc-config-levels
          - ref-cur-hooks-doc-config-levels-2
          - ref-cur-hooks-doc-config-cwd
          - ref-cur-hooks-doc-global-options
          - ref-cur-hooks-doc-script-options-2
          - ref-cur-hooks-doc-script-options-matcher
          - ref-cur-hooks-doc-matcher-byhook
          - ref-cur-hooks-plugins-workspaceopen
          - ref-cur-hooks-sdk-file-based
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs:
          - ref-cur-hooks-doc-common-input
          - ref-cur-hooks-doc-common-input-fields
          - ref-cur-hooks-doc-common-input-fields-2
          - ref-cur-hooks-doc-common-input-fields-3
          - ref-cur-hooks-doc-app-lifecycle-input
          - ref-cur-hooks-doc-env-vars
          - ref-cur-hooks-doc-env-vars-2
          - ref-cur-hooks-doc-env-session
          - ref-cur-hooks-doc-event-beforeshell-mcp-fields
          - ref-cur-hooks-doc-event-sessionstart
          - ref-cur-hooks-changelog-stdin
      - surface_ids: [cursor]
        section_id: hooks-input
        status: answered
        source_refs:
          - ref-cur-hooks-doc-common-input
          - ref-cur-hooks-doc-common-input-fields
          - ref-cur-hooks-doc-app-lifecycle-input
          - ref-cur-hooks-doc-env-vars
          - ref-cur-hooks-doc-env-session
          - ref-cur-hooks-doc-event-beforereadfile
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs:
          - ref-cur-hooks-doc-types-command
          - ref-cur-hooks-doc-example-blockgit
          - ref-cur-hooks-doc-event-pretooluse-3
          - ref-cur-hooks-doc-event-subagentstart-out
          - ref-cur-hooks-doc-event-posttooluse
          - ref-cur-hooks-doc-event-beforeshell-mcp
          - ref-cur-hooks-doc-event-beforetabfileread
          - ref-cur-hooks-doc-event-beforesubmitprompt
          - ref-cur-hooks-doc-event-stop
      - surface_ids: [cursor]
        section_id: hooks-output
        status: answered
        source_refs:
          - ref-cur-hooks-doc-types-command
          - ref-cur-hooks-doc-event-pretooluse-3
          - ref-cur-hooks-doc-event-beforereadfile-2
          - ref-cur-hooks-doc-event-beforetabfileread
          - ref-cur-hooks-doc-event-aftertabfileedit
          - ref-cur-hooks-doc-event-beforesubmitprompt
          - ref-cur-hooks-doc-event-stop-2
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: partial
        source_refs:
          - ref-cur-hooks-doc-config-levels
          - ref-cur-hooks-doc-config-levels-2
          - ref-cur-hooks-doc-types-command
          - ref-cur-hooks-doc-script-options-3
          - ref-cur-hooks-doc-event-stop-2
          - ref-cur-hooks-doc-event-subagentstop
          - ref-cur-hooks-doc-event-sessionstart
      - surface_ids: [cursor]
        section_id: hooks-order
        status: partial
        source_refs:
          - ref-cur-hooks-doc-config-levels
          - ref-cur-hooks-doc-types-command
          - ref-cur-hooks-doc-event-stop
          - ref-cur-hooks-doc-event-stop-2
          - ref-cur-hooks-doc-event-sessionstart
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs:
          - ref-cur-hooks-doc-team-vcs
          - ref-cur-hooks-doc-cloud-support
          - ref-cur-hooks-doc-cloud-sources
          - ref-cur-hooks-doc-cloud-exec-types
          - ref-cur-hooks-plugins-component
          - ref-cur-hooks-runmodes-protected
          - ref-cur-hooks-changelog-plugin-hooks
          - ref-cur-hooks-changelog-worker-hooks
      - surface_ids: [cursor]
        section_id: hooks-conditions
        status: partial
        source_refs:
          - ref-cur-hooks-doc-team-vcs
          - ref-cur-hooks-plugins-component
          - ref-cur-hooks-plugins-workspaceopen
          - ref-cur-hooks-runmodes-protected
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs:
          - ref-cur-hooks-doc-troubleshooting-active
          - ref-cur-hooks-doc-troubleshooting-exitcode
          - ref-cur-hooks-doc-example-audit
          - ref-cur-hooks-changelog-intro
          - ref-cur-hooks-changelog-stdin
          - ref-cur-hooks-changelog-reliable
          - ref-cur-hooks-changelog-payloads
      - surface_ids: [cursor]
        section_id: hooks-diagnostics
        status: answered
        source_refs:
          - ref-cur-hooks-doc-troubleshooting-active
          - ref-cur-hooks-doc-troubleshooting-exitcode
          - ref-cur-hooks-doc-example-audit
---

## 固定来源与界面口径 {#hooks-scope}

本章的固定来源是 Cursor 官方文档站的五个快照：`hooks.md`（hooks 机制主来源，取于 2026-09-30）、`plugins.md`、`enterprise/llm-safety-and-controls.md`、`agent/security/run-modes.md` 与 `cli/changelog.md`；2026-10-03 巡检另按 `sdk/typescript.md` 快照 `snapshot-source-cur-sdk-typescript-doc-20261003` 补入「无程序化 hook 回调」这条边界。正文里所有 `[@ref-cur-hooks-...]` 标记都指向 `knowledge/cursor/references/` 下绑定这批快照的引用记录，摘录逐字取自对应页面。

Hook 是宿主生成的**子进程**：它与宿主用 stdin/stdout 双向 JSON 通信，在 agent loop 的既定阶段前后运行，因此可以观察、阻断或修改行为。配置写在项目级或用户级 `hooks.json`，也可以由从 Customize 安装的插件提供；官方同时说明 Cursor 会读取 Claude Code 等第三方工具的 hook 配置 [@ref-cur-hooks-doc-overview][@ref-cur-hooks-doc-thirdparty]。官方列出的典型用途是编辑后跑格式化、事件埋点、PII/密钥扫描、危险操作闸门（例如 SQL 写）、控制子代理（Task 工具）执行、会话开始时注入上下文 [@ref-cur-hooks-doc-capabilities]。

**两个界面怎么读**：catalog 中 Cursor 有 `cli`（Cursor CLI）与 `cursor`（Cursor IDE）两个界面。`hooks.md` 是一页两用的官方文档，界面口径以 IDE 为主（Tab 内联补全、Customize 面板、桌面应用生命周期），所以本章对共享的引擎契约（事件名、输入输出、退出码）给 CLI 与 IDE 两条答案，只在一侧成立的差异逐条标注。CLI 侧的时间线来自 `cli/changelog.md`：2026 年 1 月的更新为 CLI 引入 session start/end、带 follow-up 循环的 stop hook、pre-compaction 与子代理生命周期 hook，并读取合并 Claude Code 的 `settings.json` hook；管理员可推送 team-managed hook，优先级为 enterprise > team > project > user [@ref-cur-hooks-changelog-intro]。

**缺口**：固定来源没有按界面拆分 `hooks.json` 的字段或行为差异，本章只在有独立来源（changelog、plugins 页）支持时才给出界面差异结论，其余默认两侧共享。

## Hook 类别与事件清单 {#hooks-events}

所有第一方事件按触发来源分三类 [@ref-cur-hooks-doc-categories][@ref-cur-hooks-doc-categories-tab]：

| 类别                | 触发范围                   | 事件                                                                                                                                                                                                                                                                                                                                 |
| :------------------ | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent hooks         | Cmd+K 与 Agent Chat 会话内 | `sessionStart`、`sessionEnd`、`preToolUse`、`postToolUse`、`postToolUseFailure`、`subagentStart`、`subagentStop`、`beforeShellExecution`、`afterShellExecution`、`beforeMCPExecution`、`afterMCPExecution`、`beforeReadFile`、`afterFileEdit`、`beforeSubmitPrompt`、`preCompact`、`stop`、`afterAgentResponse`、`afterAgentThought` |
| Tab hooks           | 自主 Tab（内联补全）操作   | `beforeTabFileRead`、`afterTabFileEdit`                                                                                                                                                                                                                                                                                              |
| App lifecycle hooks | 不在任何 agent 会话内      | `workspaceOpen`                                                                                                                                                                                                                                                                                                                      |

三类分开的意义是让同一条策略可以只作用于自主 Tab 操作、用户主导的 Agent 操作或工作区启动 [@ref-cur-hooks-doc-categories]。原文档进一步给出归属口径：Agent hooks（上面列出的 18 个）作用于 Cmd+K 与 Agent Chat，Tab hooks 只作用于 Tab 内联补全，`workspaceOpen` 在打开工作区及工作区文件夹变化时触发、与 agent 会话无关 [@ref-cur-hooks-doc-config-file-scope]。`workspaceOpen` 在桌面应用与 CLI 中都会运行 [@ref-cur-hooks-doc-event-workspaceopen]。

逐事件的时点、用途与阻断能力（输出字段见「输出、退出码与阻断语义」小节）：

| 事件                   | 时点                                           | 用途                                | 能否阻断                                                                              |
| :--------------------- | :--------------------------------------------- | :---------------------------------- | :------------------------------------------------------------------------------------ |
| `sessionStart`         | 新建 composer 会话时                           | 设置会话环境变量、注入初始上下文    | 否（fire-and-forget，见「回调收到的输入」小节） [@ref-cur-hooks-doc-categories]       |
| `sessionEnd`           | 会话结束时                                     | 日志、埋点、清理                    | 否（响应只记录） [@ref-cur-hooks-doc-categories]                                      |
| `preToolUse`           | 任意工具执行前（Shell/Read/Write/MCP/Task 等） | 通用工具闸门，用 matcher 按工具过滤 | 是，`permission` 允许/拒绝，可改写 `updated_input` [@ref-cur-hooks-doc-categories]    |
| `postToolUse`          | 工具成功执行后                                 | 审计、分析、向对话注入补充上下文    | 否（MCP 工具可替换模型可见输出） [@ref-cur-hooks-doc-categories]                      |
| `postToolUseFailure`   | 工具失败、超时或被拒后                         | 错误追踪与恢复逻辑                  | 否 [@ref-cur-hooks-doc-categories]                                                    |
| `subagentStart`        | 生成子代理（Task 工具）前                      | 允许或拒绝子代理创建                | 是（`ask` 不作审批，见「输出」小节） [@ref-cur-hooks-doc-categories]                  |
| `subagentStop`         | 子代理完成、报错或中止后                       | 触发后续动作（follow-up）           | 否，但可自动续跑 [@ref-cur-hooks-doc-categories]                                      |
| `beforeShellExecution` | 任意 shell 命令执行前                          | 命令闸门、审批路由                  | 是，`allow`/`deny`/`ask` [@ref-cur-hooks-doc-categories]                              |
| `afterShellExecution`  | shell 命令执行后                               | 审计、从命令输出收集指标            | 否 [@ref-cur-hooks-doc-categories]                                                    |
| `beforeMCPExecution`   | MCP 工具执行前                                 | MCP 调用闸门                        | 是，`allow`/`deny`/`ask` [@ref-cur-hooks-doc-categories]                              |
| `afterMCPExecution`    | MCP 工具执行后                                 | 审计、检查工具返回值                | 否 [@ref-cur-hooks-doc-categories]                                                    |
| `beforeReadFile`       | Agent 读文件前                                 | 访问控制，阻止敏感文件进入模型      | 是，`allow`/`deny` [@ref-cur-hooks-doc-categories]                                    |
| `afterFileEdit`        | Agent 编辑文件后                               | 格式化、统计 agent 写入的代码       | 否 [@ref-cur-hooks-doc-categories]                                                    |
| `beforeTabFileRead`    | Tab 读文件前                                   | 对自主 Tab 单独做脱敏或访问控制     | 是，`allow`/`deny` [@ref-cur-hooks-doc-categories][@ref-cur-hooks-doc-categories-tab] |
| `afterTabFileEdit`     | Tab 编辑文件后                                 | 对 Tab 写入做格式化或分析           | 否（当前无输出字段） [@ref-cur-hooks-doc-categories-tab]                              |
| `beforeSubmitPrompt`   | 用户点发送之后、后端请求之前                   | 提交前校验提示词                    | 是，`continue: false` 阻止提交 [@ref-cur-hooks-doc-categories]                        |
| `afterAgentResponse`   | 助手消息完成后                                 | 跟踪最终回答文本                    | 否 [@ref-cur-hooks-doc-categories]                                                    |
| `afterAgentThought`    | 思考块完成后                                   | 观察推理过程                        | 否 [@ref-cur-hooks-doc-categories]                                                    |
| `stop`                 | agent loop 结束时                              | 处理完成事件，可自动续跑            | 否（可自动续跑，见「输出」小节） [@ref-cur-hooks-doc-categories]                      |
| `preCompact`           | 上下文窗口压缩/摘要之前                        | 记录压缩时机、提示用户              | 否（观察型） [@ref-cur-hooks-doc-categories]                                          |
| `workspaceOpen`        | 打开工作区时，以及每次工作区文件夹变化         | 按工作区返回要加载的插件目录        | 否 [@ref-cur-hooks-doc-event-workspaceopen]                                           |

### 云端 agent 的事件可用性 {#hooks-events-cloud}

云端 agent 只运行**基于命令**的 hook；来源是仓库根的 `.cursor/hooks.json`，Enterprise 计划下还包括 dashboard 下发的 team hooks 与系统级 enterprise hooks；用户级 `~/.cursor/hooks.json` 不可用（云端 VM 访问不到本机 home 配置）。云端 agent 有时会以只读环境开始最初的探索轮次，那些轮次里 hook 不运行，要等环境可写之后才开始 [@ref-cur-hooks-doc-cloud-support][@ref-cur-hooks-doc-cloud-sources]。prompt 型 hook 需要 hook 与 agent loop 之间的鉴权接线，云端执行环境不提供，因此只支持 command 型 [@ref-cur-hooks-doc-cloud-exec-types]。

云端会运行的事件 [@ref-cur-hooks-doc-cloud-supported]：`beforeShellExecution`、`afterShellExecution`、`beforeReadFile`、`afterFileEdit`、`preToolUse`、`postToolUse`、`postToolUseFailure`、`subagentStart`、`subagentStop`、`beforeSubmitPrompt`、`preCompact`、`afterAgentResponse`、`afterAgentThought`、`stop`。

云端不运行的事件及官方理由 [@ref-cur-hooks-doc-cloud-unsupported][@ref-cur-hooks-doc-cloud-unsupported-2][@ref-cur-hooks-doc-cloud-unsupported-3]：

| 事件                                       | 理由                                                                                                          |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `sessionStart`                             | 在云端仍可能以只读环境启动，hook 此时不加载，云端 `sessionStart` 会在首次写入之后才触发，而不是真正的会话开始 |
| `sessionEnd`                               | 云端没有编辑器生命周期的会话边界；`sessionEnd` 绑定的是 IDE 会话而非云端 agent 对话                           |
| `beforeMCPExecution` / `afterMCPExecution` | 同样因只读启动阶段 hook 不加载，MCP hook 的时机不明确，暂缓                                                   |
| `beforeTabFileRead` / `afterTabFileEdit`   | Tab 补全是 IDE 功能，不跑在云端 agent 里                                                                      |
| `workspaceOpen`                            | IDE 生命周期 hook，不适用于云端 agent                                                                         |

自托管 worker（Pools 与 My Machines）跑同样的基于命令的项目 hook，Enterprise 下也跑 team 与 enterprise hook；在那些 worker 上，`sessionStart`/`sessionEnd` 在会话认领 worker 与释放认领时触发 [@ref-cur-hooks-doc-cloud-sources]。

**界面差异（CLI）**：CLI 侧至少从 2026 年 1 月起支持 hook；`afterAgentThought`/`afterAgentResponse` 在 CLI 中发射，并接受 Claude Code 格式的 hook 响应——这一条是"hook 在 CLI 里不触发"的修复记录，可作为 CLI 生效的观测点 [@ref-cur-hooks-changelog-reliable]。

**缺口**：固定来源没有说明云端以外的其它执行入口（例如编辑器集成/ACP 会话）是否加载 hook；也没有说明第三方插件定义的"hook 事件"与第一方事件名是否共用同一命名空间（`plugins.md` 只把 Hooks 描述为 Cursor Plugins 的一种组件，见「生效条件」小节）。

## Hook 的配置入口、作用域与字段 {#hooks-entry}

### 配置文件与作用域 {#hooks-entry-scope}

Hook 定义写在名为 `hooks.json` 的文件里，同一台机器可以有多层配置，**所有来源中所有匹配的 hook 都会运行**，Cursor 再合并它们的响应 [@ref-cur-hooks-doc-config-levels]：

| 层级                           | 位置                                                                                                                                      | 说明                                                                            |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| Enterprise（MDM 托管，系统级） | macOS `/Library/Application Support/Cursor/hooks.json`；Linux/WSL `/etc/cursor/hooks.json`；Windows `C:\\ProgramData\\Cursor\\hooks.json` | 系统级配置文件，由组织部署 [@ref-cur-hooks-doc-config-levels-mid]               |
| Team（云端下发，仅企业版）     | 在 web dashboard（Team content 的 hooks 区）配置后同步到所有成员                                                                          | 自动同步，不落本机手写文件 [@ref-cur-hooks-doc-config-levels-mid]               |
| Project（项目级）              | `{project-root}/.cursor/hooks.json`                                                                                                       | 随项目进入版本控制；只在受信任的工作区运行 [@ref-cur-hooks-doc-config-levels-2] |
| User（用户级）                 | `~/.cursor/hooks.json`                                                                                                                    | 对该用户全局生效 [@ref-cur-hooks-doc-config-levels-2]                           |

优先级从高到低为 Enterprise → Team → Project → User [@ref-cur-hooks-doc-config-levels-2]。

**脚本工作目录按来源区分**——这是相对路径写错的最常见原因：项目级 hook 从**项目根**运行，用户级 hook 从 `~/.cursor/` 运行，系统级 enterprise hook 从 enterprise 配置目录运行，team hook 从托管 hook 目录运行 [@ref-cur-hooks-doc-config-cwd]。因此项目级配置里要写 `.cursor/hooks/script.sh`，而不是 `./hooks/script.sh`（后者会指向 `{project-root}/hooks/script.sh`）[@ref-cur-hooks-doc-quickstart-project]。

项目级最小可用配置与脚本（来源为官方 Quickstart 的项目级示例）[@ref-cur-hooks-doc-quickstart-project]：

```json title=".cursor/hooks.json"
{
  "version": 1,
  "hooks": {
    "afterFileEdit": [{ "command": ".cursor/hooks/format.sh" }]
  }
}
```

```bash title=".cursor/hooks/format.sh"
#!/bin/bash
# Read input, do something, exit 0
cat > /dev/null
exit 0
```

脚本需要可执行（`chmod +x .cursor/hooks/format.sh`）。宿主会监视 `hooks.json` 文件并在保存时重载 [@ref-cur-hooks-doc-quickstart-project]。

### 字段 {#hooks-entry-fields}

顶层只有一个字段：`version` 是必填的正整数，当前用 `1` [@ref-cur-hooks-doc-global-options]。`hooks` 对象把事件名映射到 hook 定义数组 [@ref-cur-hooks-doc-config-levels]。每个定义支持以下字段：

| 字段         | 类型                      | 默认        | 用途与生效条件                                                                                                                                                                       |
| :----------- | :------------------------ | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command`    | string                    | 必填        | 脚本路径或命令，可以是 shell 字符串、绝对路径或相对路径（基准见上） [@ref-cur-hooks-doc-script-options-2]                                                                            |
| `type`       | `"command"` \| `"prompt"` | `"command"` | 执行类型；`prompt` 时用 LLM 评估自然语言条件 [@ref-cur-hooks-doc-script-options-2]                                                                                                   |
| `timeout`    | number                    | 平台默认    | 执行超时秒数 [@ref-cur-hooks-doc-script-options-3]                                                                                                                                   |
| `loop_limit` | number \| null            | `5`         | 仅 `stop`/`subagentStop` 的 follow-up 上限；`null` 表示不限制；Cursor hook 默认 `5`，Claude Code hook 默认 `null` [@ref-cur-hooks-doc-script-options-3]                              |
| `failClosed` | boolean                   | `false`     | 为 `true` 时，hook 失败（崩溃、超时、非零退出码、无输出）改为阻断动作；权限类 hook 即使为 `false` 也会在 JSON 非法或响应不合 schema 时阻断 [@ref-cur-hooks-doc-script-options-extra] |
| `matcher`    | string                    | 无          | 正则过滤何时运行；空串或 `"*"` 匹配全部 [@ref-cur-hooks-doc-script-options-matcher]                                                                                                  |

`matcher` 的作用对象随事件不同 [@ref-cur-hooks-doc-matcher-byhook]：

| 事件                                                | matcher 匹配的值                                                                                  |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `preToolUse` / `postToolUse` / `postToolUseFailure` | 工具类型，取值含 `Shell`、`Read`、`Write`、`Grep`、`Delete`、`Task`，MCP 工具用 `MCP:{tool_name}` |
| `subagentStart` / `subagentStop`                    | 子代理类型（`generalPurpose`、`explore`、`shell` 等）                                             |
| `beforeShellExecution` / `afterShellExecution`      | 完整 shell 命令字符串                                                                             |
| `beforeReadFile`                                    | 固定值 `Read`                                                                                     |
| `afterFileEdit`                                     | 固定值 `Write`                                                                                    |
| `beforeTabFileRead`                                 | 固定值 `TabRead`                                                                                  |
| `afterTabFileEdit`                                  | 固定值 `TabWrite`                                                                                 |
| `beforeSubmitPrompt`                                | 固定值 `UserPromptSubmit`                                                                         |
| `stop`                                              | 固定值 `Stop`                                                                                     |
| `afterAgentResponse`                                | 固定值 `AgentResponse`                                                                            |
| `afterAgentThought`                                 | 固定值 `AgentThought`                                                                             |

一个把"只对网络命令做审批"和"只对 explore/shell 子代理做校验"写在一起的用户级示例（字段组合依据上面的字段表与 matcher 表）[@ref-cur-hooks-doc-matcher-byhook]：

```json title="~/.cursor/hooks.json"
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "command": "./hooks/approve-network.sh",
        "timeout": 30,
        "matcher": "curl|wget|nc "
      }
    ],
    "subagentStart": [
      {
        "command": "./hooks/validate-explore.sh",
        "matcher": "explore|shell"
      }
    ]
  }
}
```

### prompt 型 hook {#hooks-entry-prompt}

`type: "prompt"` 的定义用 LLM 评估一段自然语言条件，适合不想写脚本的策略执行 [@ref-cur-hooks-doc-types-prompt]：

```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "type": "prompt",
        "prompt": "Does this command look safe to execute? Only allow read-only operations.",
        "timeout": 10
      }
    ]
  }
}
```

prompt 型 hook 返回结构化的 `{ ok: boolean, reason?: string }`，用一个快速模型做评估，`$ARGUMENTS` 占位符会被替换为 hook 输入 JSON；如果没有写 `$ARGUMENTS`，输入 JSON 会被自动追加；可选用 `model` 字段覆盖默认模型 [@ref-cur-hooks-doc-types-prompt]。注意云端 agent 不支持该类型 [@ref-cur-hooks-doc-cloud-exec-types]。

### 插件提供的 hook {#hooks-entry-plugins}

Hook 也可以通过 Customize 安装的插件提供 [@ref-cur-hooks-doc-overview]，其中 `workspaceOpen` 是唯一能让插件按工作区动态加载的入口：hook 脚本返回 `pluginPaths`（插件目录的绝对路径数组）后，Cursor 会把这些插件目录加载进当前工作区 [@ref-cur-hooks-plugins-workspaceopen]。

**没有程序化注册入口。** SDK 侧把这条边界写得明确：hook 只支持文件方式，没有程序化 hook 回调，hook 是项目策略边界而不是单次运行的开关 [@ref-cur-hooks-sdk-file-based]。因此想按运行动态改变 hook 行为，唯一途径是改 `hooks.json` 或换用 `Agent.resume()` 重新加载，不能在创建 agent 时传入回调。对照同一页把 `mcpServers`、`agents`、`systemPrompt` 都列为可内联传入的选项，hook 的缺席是有意的设计而非文档遗漏。

**缺口**：固定来源没有给出 `hooks.json` 的机器可读 schema、未知事件名或未知字段的处置方式，也没有列出插件清单（`.cursor-plugin/plugin.json`）中声明 hook 的字段名；`plugins.md` 只把 Hooks 列为 Cursor Plugins 的组件，并说明 Agent Plugins 标准不含 hook 组件（见「生效条件」小节）。

## 回调收到的输入 {#hooks-input}

### 公共字段 {#hooks-input-common}

所有 hook 都会收到一组基础字段，再叠加自己的事件专有字段 [@ref-cur-hooks-doc-common-input]：

```json
{
  "conversation_id": "string",
  "generation_id": "string",
  "model": "string",
  "model_id": "string",
  "model_params": [{ "id": "string", "value": "string" }],
  "hook_event_name": "string",
  "cursor_version": "string",
  "workspace_roots": ["{absolute-path}"],
  "user_email": "string | null",
  "transcript_path": "string | null"
}
```

| 字段              | 类型           | 含义                                                                   |
| :---------------- | :------------- | :--------------------------------------------------------------------- |
| `conversation_id` | string         | 跨多轮稳定的会话 ID                                                    |
| `generation_id`   | string         | 当前 generation，随每条用户消息变化                                    |
| `model`           | string         | 触发该 hook 的 composer 所配置的模型 slug（历史字段）                  |
| `model_id`        | string（可选） | 结构化模型 ID，可用时给出                                              |
| `model_params`    | array（可选）  | 选中的模型参数（如 thinking、context、effort），每项含 `id` 与 `value` |
| `hook_event_name` | string         | 正在运行哪个 hook                                                      |
| `cursor_version`  | string         | 应用版本，例如 `"1.7.2"`                                               |
| `workspace_roots` | string[]       | 工作区根目录列表，多根工作区会多于一个                                 |
| `user_email`      | string \| null | 已认证用户的邮箱（可用时）                                             |
| `transcript_path` | string \| null | 主对话记录文件路径（transcripts 关闭时为 null）                        |

[@ref-cur-hooks-doc-common-input-fields][@ref-cur-hooks-doc-common-input-fields-2][@ref-cur-hooks-doc-common-input-fields-3]

App lifecycle hook（`workspaceOpen`）在 agent 会话之外触发，因此请求里**不含** `conversation_id`、`generation_id`、`model`、`session_id`、`transcript_path`，但仍带 `hook_event_name`、`cursor_version`、`workspace_roots`、`user_email` [@ref-cur-hooks-doc-app-lifecycle-input]。

### 事件专有输入 {#hooks-input-events}

| 事件                   | 专有输入字段                                                                                                                                                                                                                                           |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preToolUse`           | `tool_name`（如 `Shell`）、`tool_input`（如 `{ "command": "npm install", "working_directory": "/project" }`）、`tool_use_id`、`cwd`，以及 `model`/`model_id`/`model_params` [@ref-cur-hooks-doc-event-pretooluse]                                      |
| `subagentStart`        | `subagent_id`、`subagent_type`、`task`、`parent_conversation_id`、`tool_call_id`、`subagent_model`、`is_parallel_worker`、`git_branch`（可选） [@ref-cur-hooks-doc-event-subagentstart]                                                                |
| `beforeShellExecution` | `command`（完整终端命令）、`cwd`、`sandbox`（布尔）                                                                                                                                                                                                    |
| `beforeMCPExecution`   | `tool_name`、`tool_input`（JSON 参数字符串）、`mcp_server_name`（该 server 在自己 `mcp.json` 中的键）；HTTP/SSE server 另外给 `url` 与 `mcp_server_url`，stdio server 给 `command`（启动命令与参数） [@ref-cur-hooks-doc-event-beforeshell-mcp-fields] |
| `beforeReadFile`       | `file_path`（绝对路径）、`content`（文件全文）、`attachments`（每项含 `type` 为 `file` 或 `rule` 与 `file_path`） [@ref-cur-hooks-doc-event-beforereadfile]                                                                                            |
| `beforeSubmitPrompt`   | `prompt`（用户提示词文本）、`attachments`（同上结构） [@ref-cur-hooks-doc-event-beforesubmitprompt]                                                                                                                                                    |
| `sessionStart`         | `session_id`（与 `conversation_id` 相同）、`is_background_agent`、`composer_mode`（可选，如 `agent`/`ask`/`edit`） [@ref-cur-hooks-doc-event-sessionstart]                                                                                             |

`beforeMCPExecution` 的判别建议（原文口径）：用 `mcp_server_name`（配合 `tool_name`）判断调用是否针对自己的 server；`command` 只是该 server 配置里的启动字符串，不同安装可能不同（相对路径、`${CURSOR_PLUGIN_ROOT}` 展开，或根本没有 `command` 的 HTTP 传输），所以"默认放行不认识的东西"的实现应当把缺失或意外的 `mcp_server_name` 当作拒绝 [@ref-cur-hooks-doc-event-beforeshell-mcp-fields]。

### 环境变量 {#hooks-input-env}

脚本执行时还会拿到一组环境变量 [@ref-cur-hooks-doc-env-vars][@ref-cur-hooks-doc-env-vars-2]：

| 变量                     | 含义                                | 是否总有           |
| :----------------------- | :---------------------------------- | :----------------- |
| `CURSOR_PROJECT_DIR`     | 工作区根目录                        | 是                 |
| `CURSOR_VERSION`         | Cursor 版本字符串                   | 是                 |
| `CURSOR_USER_EMAIL`      | 认证用户邮箱                        | 已登录时           |
| `CURSOR_TRANSCRIPT_PATH` | 对话记录文件路径                    | transcripts 开启时 |
| `CURSOR_CODE_REMOTE`     | 在远程工作区运行时为字符串 `"true"` | 远程工作区         |
| `CLAUDE_PROJECT_DIR`     | 项目目录别名（Claude 兼容）         | 是                 |

`sessionStart` hook 返回的会话级环境变量会传给该会话内后续所有 hook 执行 [@ref-cur-hooks-doc-env-session]。

### 敏感内容与传输 {#hooks-input-secrets}

输入即数据出口：`beforeReadFile` 会把文件全文 `content` 交给 hook 进程，`beforeSubmitPrompt` 会把提示词原文交给 hook，因此脱敏/拦截逻辑本身要按敏感数据处理。传输方式上，CLI 已把 hook 载荷从 argv 改为走 stdin，以避免 argv 长度上限并让载荷不出现在进程列表里 [@ref-cur-hooks-changelog-stdin]；`hooks.md` 描述的契约同样是 JSON 经 stdin 输入、JSON 经 stdout 输出（见「固定来源与界面口径」小节）。

**缺口**：本章只列了逐事件输入中的代表性字段；`hooks.md` 同名小节里其它事件（如 `postToolUse` 的 `tool_output` 与 `duration`、`postToolUseFailure` 的 `failure_type`、`preCompact` 的上下文用量、`sessionEnd` 的 `reason`）也同样有完整输入表，来源未把这些表汇总成一页对照，也没有枚举 `model_params` 的取值集合。

## 输出、退出码与阻断语义 {#hooks-output}

### 退出码 {#hooks-output-exit}

命令型 hook 的退出码决定整条链路 [@ref-cur-hooks-doc-types-command][@ref-cur-hooks-doc-troubleshooting-exitcode]：

| 退出码   | 语义                                                                   |
| :------- | :--------------------------------------------------------------------- |
| `0`      | hook 成功，采用其 JSON 输出                                            |
| `2`      | 阻断该动作，等价于返回 `permission: "deny"`（与 Claude Code 行为一致） |
| 其它非零 | hook 失败，**默认放行**（fail-open）                                   |

权限类 hook（`beforeShellExecution`、`beforeMCPExecution`、`beforeReadFile`、`beforeTabFileRead`、`subagentStart`、`preToolUse`）在退出码为 `0` 但 JSON 非法、或响应不符合该 hook schema 时，同样会阻断动作 [@ref-cur-hooks-doc-types-command]。崩溃、超时、以及除 `2` 以外的非零退出码默认放行；在这些 hook 定义上设 `failClosed: true` 可以把这些失败改成阻断，官方建议对安全关键的 `beforeMCPExecution` 这样做 [@ref-cur-hooks-doc-script-options-extra]。

### 与动作的关系 {#hooks-output-semantics}

- `permission`：`"allow"` 放行、`"deny"` 阻断，`"ask"` 交给用户审批。`preToolUse` 接受 `"ask"` 写入 schema 但当前不强制执行；`subagentStart` 不支持 `"ask"`，按 `"deny"` 处理 [@ref-cur-hooks-doc-event-pretooluse-3][@ref-cur-hooks-doc-event-subagentstart-out]。
- `user_message` / `agent_message`：仅在拒绝时分别展示给用户、回传给 agent。`beforeShellExecution` / `beforeMCPExecution` 返回 `{ "permission": "allow" | "deny" | "ask", "user_message": ..., "agent_message": ... }` [@ref-cur-hooks-doc-event-beforeshell-mcp]。
- 修改而非阻断：`preToolUse` 可用 `updated_input` 替换工具输入 [@ref-cur-hooks-doc-event-pretooluse-3]；`postToolUse` 可用 `updated_mcp_tool_output`（仅 MCP 工具）替换模型看到的输出，并用 `additional_context` 向对话注入补充上下文 [@ref-cur-hooks-doc-event-posttooluse]。
- 阻止提交：`beforeSubmitPrompt` 返回 `{ "continue": true | false, "user_message": ... }`，`continue: false` 阻止提示词提交 [@ref-cur-hooks-doc-event-beforesubmitprompt]。
- 自动续跑：`stop` 返回 `{ "followup_message": "..." }`；非空时 Cursor 会把它当作下一条用户消息自动提交，从而形成循环式流程；`loop_count` 从 0 开始计数，默认上限 5 次、可用 `loop_limit` 调整、设为 `null` 取消上限 [@ref-cur-hooks-doc-event-stop][@ref-cur-hooks-doc-event-stop-2]。
- 不可阻断：`afterTabFileEdit` 当前不支持输出字段 [@ref-cur-hooks-doc-event-aftertabfileedit]；`beforeTabFileRead` 只支持 `permission` 的 `allow`/`deny` [@ref-cur-hooks-doc-event-beforetabfileread]；`beforeReadFile` 返回 `permission` 与可选 `user_message`，但其失败默认放行，除非设 `failClosed` [@ref-cur-hooks-doc-event-beforereadfile-2]。

一个同时演示四种结果的真实示例（官方 Examples 中的 `block-git.sh`）：检出 `git ` 命令时输出 `permission: "deny"` 并给出 `user_message`/`agent_message`，检出 `gh ` 时输出 `permission: "ask"`，其余输出 `permission: "allow"` [@ref-cur-hooks-doc-example-blockgit]。它同时说明输出是打印到 stdout 的 JSON，而不是退出码本身。

**冲突提示**：企业文档给出的 hook 示例使用 camelCase 字段名（`userMessage`、`agentMessage`）并用 `exit 1`／`exit 3` 表达阻断，与本节依据 `hooks.md` 得出的 snake_case 字段名与"exit 2 才阻断"的契约不一致。按 `hooks.md` 的契约，`exit 3` 属于"其它退出码"，会被当成 hook 失败并放行。两处原文与适用边界见「企业强制 hook、DLP 与分发」小节。

## 顺序、合并与失败处理 {#hooks-order}

### 多来源合并 {#hooks-order-merge}

所有来源中所有匹配的 hook 都会运行，Cursor 合并它们的响应：**任意 `deny` 胜过 `ask`，`ask` 胜过 `allow`**，与来源无关；`user_message` 与 `agent_message` 会被拼接；其它字段（例如 `followup_message`）取最后一个响应。合并按优先级顺序进行，因此对这类字段而言，低优先级来源会覆盖高优先级来源 [@ref-cur-hooks-doc-config-levels]。优先级顺序是 Enterprise → Team → Project → User [@ref-cur-hooks-doc-config-levels-2]。

由此可以推出的可观察结果：同一条策略在用户级与项目级各写一份且两者都匹配时，两份脚本都会执行；只有 `deny`/`ask` 这类"就高"字段体现不出低优先级来源的存在，而 `followup_message` 这类"后写者胜"字段会以优先级最低的来源为准 [@ref-cur-hooks-doc-config-levels]。

### 循环上限与续跑 {#hooks-order-loops}

`stop` 的 `followup_message` 会形成自动续跑 [@ref-cur-hooks-doc-event-stop]；`loop_count` 记录该会话上 stop hook 已触发过多少次自动 follow-up（从 0 开始），默认上限为 5 次，可用 `loop_limit` 调整，设为 `null` 取消上限；`subagentStop` 的 follow-up 共用同一限制 [@ref-cur-hooks-doc-event-stop-2][@ref-cur-hooks-doc-event-subagentstop]。`loop_limit` 在 Cursor hook 上默认 `5`，在 Claude Code hook 上默认 `null` [@ref-cur-hooks-doc-script-options-3]。

### 失败与超时 {#hooks-order-failure}

失败默认 fail-open：崩溃、超时、除 `2` 以外的非零退出码都会记录失败并放行动作；`failClosed: true` 可改为阻断 [@ref-cur-hooks-doc-types-command][@ref-cur-hooks-doc-script-options-extra]。`timeout` 的默认值文档只写"平台默认"，没有给出具体秒数 [@ref-cur-hooks-doc-script-options-3]。`sessionStart` 是 fire-and-forget：agent loop 不等待也不强制执行其阻断响应，会话创建不会因为 `continue: false` 而被阻止 [@ref-cur-hooks-doc-event-sessionstart]。

**缺口（本条为 partial）**：固定来源没有说明同一事件的多个 hook 定义是并行执行还是串行等待、各自超时如何累计、是否有执行顺序保证，也没有说明时间戳/去重规则。已检查入口是 `hooks.md` 的 Configuration 与 Reference 各小节。要判定并发行为只能运行观察多个 hook 的日志时序。

## 生效条件：信任、云端、插件与沙箱 {#hooks-conditions}

- **工作区信任**：项目级 hook（`{project-root}/.cursor/hooks.json`）只在**受信任**的工作区自动加载运行，这是出于安全的硬条件 [@ref-cur-hooks-doc-team-vcs]。
- **云端 agent**：只运行命令型 hook；来源限于仓库项目 hook、Enterprise 的 team hooks 与系统级 enterprise hooks；用户级 `~/.cursor/hooks.json` 不可用；只读的初期探索轮次不运行 hook；`sessionStart`/`sessionEnd`/MCP hook/Tab hook/`workspaceOpen` 在云端不运行（理由见「Hook 类别与事件清单」） [@ref-cur-hooks-doc-cloud-support][@ref-cur-hooks-doc-cloud-sources]。云端只跑 command 型，prompt 型不支持 [@ref-cur-hooks-doc-cloud-exec-types]。
- **插件状态**：hook 是 Cursor Plugins（`.cursor-plugin/plugin.json`）的组件，Agent Plugins 标准不含 hook，因此插件格式决定了能否携带 hook [@ref-cur-hooks-plugins-component]。`workspaceOpen` 返回的 `pluginPaths` 决定当前工作区额外加载哪些插件目录，等于把"插件可见性"变成工作区条件 [@ref-cur-hooks-plugins-workspaceopen]。
- **CLI 侧插件生命周期**：已安装插件定义的 hook 会执行，并随插件重载刷新；通过 `--plugin-dir` 加载的插件也一样 [@ref-cur-hooks-changelog-plugin-hooks]。
- **自托管 worker**：会话认领 worker 与释放认领时分别触发 `sessionStart`/`sessionEnd`，因此这两个事件在 worker 上有与 IDE 不同的生命周期锚点 [@ref-cur-hooks-changelog-worker-hooks]。
- **沙箱与受保护路径**：`beforeShellExecution` 的输入带 `sandbox` 布尔值，说明 hook 能区分命令是否在沙箱中执行（见「回调收到的输入」）。同时 Cursor 对 `.git/config`、`.git/hooks`、`.vscode`、`.cursorignore` 等路径做保护，沙箱内命令默认只能读写工作区 [@ref-cur-hooks-runmodes-protected]——这给出一个容易踩的边界：把 hook 放进 `.git/hooks` 不是受支持的注册方式，注册入口只有 `hooks.json` 与插件。

**界面差异**：以上信任条件、沙箱边界与插件组件关系对 CLI 与 IDE 都适用；云端与自托管 worker 的条件只对 CLI/云端执行侧有意义，IDE 侧没有对应来源支持，故 `cursor` 界面的答案记为 partial。

**缺口**：固定来源没有给出"彻底关闭 hook"的开关、环境变量或组织策略项；没有说明 hook 与 MCP 信任/审批流程的交互；没有说明工作区不受信任时是静默跳过还是给出提示；也没有给出 ACP/编辑器集成等其它执行入口是否加载 hook 的结论。

## 企业强制 hook、DLP 与分发 {#hooks-enforcement}

企业侧把 hook 当作**确定性强制**手段：安全控制是"无论 LLM 建议什么都阻断危险操作"的硬边界，官方把拒绝操作的 enforcement hooks、审批工作流与沙箱并列为这类控制 [@ref-cur-hooks-ent-controls]。enforcement hooks 的四个检查点是 [@ref-cur-hooks-ent-enforcement]：

| 检查点       | 能做什么                                                                          |
| :----------- | :-------------------------------------------------------------------------------- |
| 提示词提交前 | 扫描敏感数据，阻断含 API key/凭据、PII 或专有信息的提交                           |
| 读文件前     | 读取前扫描文件，对含密钥的配置文件、日志/数据库中的 PII 或专有算法做脱敏或阻断    |
| 代码生成后   | 落盘前扫描生成代码：SQL 注入、XSS、许可/IP 风险、硬编码凭据                       |
| 终端执行前   | 阻断危险命令或改走审批，例如阻断所有 `git push`、`sudo` 需审批、阻断数据库 `DROP` |

DLP 有两条落点：一条是自己写 hook 实现 DLP 逻辑（提交前扫描提示词、生成后扫描代码，可回调公司 DLP API），另一条是在 hook 里调用既有 DLP 厂商的 API 并按其返回决定 `permission` [@ref-cur-hooks-ent-dlp]。官方对审批工作流的判断是：把 agent 配置成每个动作都要批准会显著拖慢开发体验，因此**多数团队改用 hook 自动阻断危险操作** [@ref-cur-hooks-ent-approval]。

分发路径（企业）：

- **云端下发（Enterprise 专属）**：在 web dashboard 配置 team hook，登录后自动投送到所有客户端；每三十分钟同步一次，可做操作系统定向，管理员无需接触个人机器 [@ref-cur-hooks-doc-cloud-dist]。
- **MDM**：把 `hooks.json` 与脚本放到目标目录——用户级 `~/.cursor/hooks.json` 与 `~/.cursor/hooks/`，或系统级目录（macOS `/Library/Application Support/Cursor/hooks.json`、Linux/WSL `/etc/cursor/hooks.json`、Windows `C:\\ProgramData\\Cursor\\hooks.json`）；MDM 分发完全由组织自行管理，Cursor 不代管文件部署 [@ref-cur-hooks-doc-mdm]。

**冲突**：企业文档的示例脚本使用 `userMessage`/`agentMessage`（camelCase）字段名，并在拦截处 `exit 1`／`exit 3`；而且这些示例是"打印 JSON 后非零退出"。`hooks.md` 的契约要求 `user_message`/`agent_message`（snake_case），并规定只有退出码 `2` 才阻断，其它非零退出码按 hook 失败处理、默认放行。两处说法同时存在，写作 hook 时应以 `hooks.md` 的契约为准，同时注意企业示例照抄可能导致**没有阻断住**。定位见两处引用 [@ref-cur-hooks-ent-dlp][@ref-cur-hooks-ent-enforcement]。

**缺口**：企业文档没有说明 team hooks 与本地 `hooks.json` 的合并实现细节（`hooks.md` 只给优先级），也没有给出 dashboard 配置项与 `hooks.json` 字段的映射表。

## 诊断：确认 hook 被发现、匹配与执行 {#hooks-diagnostics}

IDE 侧有直接入口：**Customize 里的 Hooks 标签页**可以查看已配置与已执行的 hook，**Hooks output channel** 用于调试并显示错误 [@ref-cur-hooks-doc-troubleshooting-active]。当 hook 不工作时，按顺序检查 [@ref-cur-hooks-doc-troubleshooting-active]：

1. 宿主会监视 `hooks.json` 并在保存时自动重载；如果仍未加载，重启 Cursor。
2. 检查相对路径的基准是否与来源匹配：项目级 hook 相对**项目根**（如 `.cursor/hooks/script.sh`），用户级 hook 相对 `~/.cursor/`（如 `./hooks/script.sh`）。

脚本侧可以自己留证据：官方 `audit.sh` 示例把 stdin 的 JSON 追加写入 `/tmp/agent-audit.log`（先 `json_input=$(cat)`，再打时间戳追加），这是判断"hook 确实被调用、且输入长什么样"的最小手段 [@ref-cur-hooks-doc-example-audit]。退出码语义也可以反向验证：退出码 `2` 会阻断动作，等价于 `permission: "deny"` [@ref-cur-hooks-doc-troubleshooting-exitcode]。

CLI 侧没有独立的 hook 查看命令记录，可用证据来自 changelog：`afterAgentThought`/`afterAgentResponse` 在 CLI 中发射、并接受 Claude Code 格式的 hook 响应 [@ref-cur-hooks-changelog-reliable]；hook 载荷改走 stdin [@ref-cur-hooks-changelog-stdin]；载荷包含每轮 token 用量与稳定的 session ID [@ref-cur-hooks-changelog-payloads]；CLI 的 hook 能力在 2026 年 1 月的版本引入（含 session start/end、stop 循环、pre-compaction、子代理生命周期与 Claude Code `settings.json` 合并）[@ref-cur-hooks-changelog-intro]。这些记录同时说明了配置修改的生效时机：保存即重载，插件 hook 随插件重载刷新 [@ref-cur-hooks-changelog-plugin-hooks]。

**界面差异**：Customize 的 Hooks 标签页与 output channel 是 IDE 侧的观测入口，`cursor` 界面可据此确认"被发现、被执行、报错"三件事 [@ref-cur-hooks-doc-troubleshooting-active]。CLI 侧只能确认到"配置已保存并被重载"与"脚本自己在日志里留下了输入"这两层，因此 CLI 答案记为 partial。

**缺口**：固定来源没有给出 hook 执行日志的落盘路径、没有 CLI 子命令或 `--verbose` 开关来列出已加载的 hook 集合、也没有说明云端与自托管 worker 上如何本地排查 hook 未运行。已检查入口为 `hooks.md` 的 Troubleshooting 与 Environment Variables 小节、`plugins.md` 与 `cli/changelog.md`；剩余未知项需要在运行环境里用 `audit.sh` 式的自证脚本与 output channel 观察。
