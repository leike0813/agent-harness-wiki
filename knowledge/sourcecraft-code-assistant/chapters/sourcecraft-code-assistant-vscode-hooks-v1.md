---
schema_version: 3
record_kind: production
edition_id: sourcecraft-code-assistant-vscode-hooks-v1
harness_id: sourcecraft-code-assistant
topic: hooks
title: "SourceCraft Code Assistant（VS Code）的 Hook 机制调查"
sections:
  - section_id: hooks-overview
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-aa-permissions, ref-sc-ca-chatui-components, ref-sc-ca-modes-configure, ref-sc-ca-roo, ref-sc-ca-tools-ref]
  - section_id: hooks-adjoining
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-aa-permissions, ref-sc-ca-aa-retry, ref-sc-ca-checkpoints-how, ref-sc-ca-term-manual]
  - section_id: hooks-cross-surface
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-aa-execute, ref-sc-ca-aa-permissions, ref-sc-ca-aa-quickstart, ref-sc-ca-cli-opencode, ref-sc-ca-cli-skills, ref-sc-ca-logs, ref-sc-ca-mcp-disable, ref-sc-ca-modes-configure, ref-sc-ca-tools-ref]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [vscode]
        section_id: hooks-overview
        status: unknown
        source_refs: [ref-sc-ca-tools-ref, ref-sc-ca-aa-permissions]
  - question_id: hooks.entry
    answers:
      - surface_ids: [vscode]
        section_id: hooks-overview
        status: unknown
        source_refs: [ref-sc-ca-modes-configure, ref-sc-ca-aa-permissions]
  - question_id: hooks.input
    answers:
      - surface_ids: [vscode]
        section_id: hooks-overview
        status: unknown
        source_refs: [ref-sc-ca-tools-ref]
  - question_id: hooks.output
    answers:
      - surface_ids: [vscode]
        section_id: hooks-overview
        status: unknown
        source_refs: [ref-sc-ca-aa-permissions]
  - question_id: hooks.order
    answers:
      - surface_ids: [vscode]
        section_id: hooks-overview
        status: unknown
        source_refs: [ref-sc-ca-aa-permissions]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [vscode]
        section_id: hooks-adjoining
        status: unknown
        source_refs: [ref-sc-ca-aa-permissions, ref-sc-ca-term-manual]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: hooks-cross-surface
        status: unknown
        source_refs: [ref-sc-ca-logs, ref-sc-ca-aa-quickstart]
---

## 结论与已检查入口 {#hooks-overview}

在 VS Code 插件这一界面上，固定来源中**没有任何第一方 Hook（事件回调/拦截）机制的记载**：没有事件清单、注册入口、输入输出契约，也没有 matcher、超时、并发或排序规则。官方插件功能地图是 Skills、Custom rules、Slash 命令、Modes、MCP、Auto-approve、Checkpoints、Terminal integration、Context mentions、Model profiles——其中没有 Hooks 一节。

已逐项检查、确认不含 Hook 内容的直接入口：

| 检查入口 | 该入口实际记载的内容 | 是否含 Hook |
| :-- | :-- | :-- |
| 工具参考与"工具如何工作" | `read_file`、`search_files`、`write_to_file`、`apply_diff`、`execute_command`、`web_fetch`、`new_task`、`attempt_completion` 等工具，以及"描述请求 → 选工具 → 批准 → 应用"的循环 | 否 [@ref-sc-ca-tools-ref] |
| 聊天界面组件与状态 | 聊天历史、输入框、动作按钮、模式选择器、加载/错误/成功指示 | 否 [@ref-sc-ca-chatui-components] |
| Modes 配置 | 可配置维度为工具组（`read`/`edit`/`browser`/`command`/`mcp`）与行为指令 | 否 [@ref-sc-ca-modes-configure] |
| Auto-approve 权限表 | Read/Write/Execute/Browser/MCP/Mode/Subtasks/Retry 八项审批策略 | 否（是审批策略） [@ref-sc-ca-aa-permissions] |
| 插件内文件清单 | modes、provider settings、MCP hub、checkpoints、marketplace 等管理器 | 否（未见 hooks/events 入口） [@ref-sc-ca-roo] |

因此本主题七道问题全部记为 `unknown`：**不是**"官方明确声明不支持"，而是固定来源未建立该机制的任何可定位契约。判为 `not_applicable` 需要一条明确写出"本产品不提供 Hooks"的官方来源，本轮未找到。

## 相邻机制与易混点 {#hooks-adjoining}

下列机制在"操作发生时自动介入"这一点上与 Hook 相近，但官方定义分别是审批策略、请求重试、版本快照或终端集成，不能当作 Hook：

| 机制 | 触发时点 | 能否挂接用户代码 | 来源 |
| :-- | :-- | :-- | :-- |
| Auto-approve 权限 | 工具/动作被调用时 | 否（仅决定是否弹批准） | [@ref-sc-ca-aa-permissions] |
| Retry | 服务器返回错误时 | 否（内建指数退避） | [@ref-sc-ca-aa-retry] |
| Checkpoints | 任务开始与每次文件修改**之前** | 否（内建辅助 Git 仓库） | [@ref-sc-ca-checkpoints-how] |
| Terminal shell integration | 终端命令执行时 | 否（shell 环境集成） | [@ref-sc-ca-term-manual] |

**Auto-approve**：八项权限为 Read、Write、Execute、Browser、MCP、Mode、Subtasks、Retry，风险等级从 Low 到 High 不等；`Execute` 维护命令前缀白名单（官方示例 `git`、`npm run`、`python -m pytest`、`cargo test`、`go test`、`docker ps`、`ls`、`cat`，`*` 表示全部但官方明确不推荐）。名称与开关由固定来源列全，但**没有**任何"在某事件前后运行脚本"的语义。[@ref-sc-ca-aa-permissions]

**Retry**：服务器报错时自动重试 API 请求，初始延迟默认 `10` 秒，遵循 `min(baseDelay * 2^retryAttempt, 600)`。这是请求层重试，不是事件回调。[@ref-sc-ca-aa-retry]

**Checkpoints**：在文件修改前用独立辅助 Git 仓库打快照，只覆盖文件内容/新增/删除/重命名/二进制变化，**不在运行命令前创建**；可在聊天中 `View Diff` 或 `Restore Checkpoint`。这是一项内建服务，不对外提供回调点。[@ref-sc-ca-checkpoints-how]

**Terminal shell integration**：官方文档中唯一出现 "hooks" 字样的位置是 Cygwin 排错段落——"if you have any issues integrating your shell with Cygwin, make sure you have added proper shell integration hooks to your Cygwin bash profile"。这里指 **Cygwin bash profile 的 shell 集成钩子**（环境配置），与产品 Hook 机制无关。[@ref-sc-ca-term-manual]

**判定条件缺口**：若未来出现 Hook 机制，最可能挂在 Modes 的工具组配置或 Auto-approve 面板旁；目前这两处都没有相关字段，因此 `hooks.conditions`（启用状态/权限/信任如何限制 Hook 生效）无从回答。

## 跨界面线索、逐题缺口与诊断 {#hooks-cross-surface}

**跨界面线索**：SourceCraft CLI 内置 `opencode`，官方说明"SourceCraft CLI 不以任何方式限制 opencode 的功能，而是扩展它——你可以继续使用既有的 plugins、rules、tools 等"，并可用 `src skill` 运行 OpenCode 风格的 Skill。[@ref-sc-ca-cli-opencode][@ref-sc-ca-cli-skills] 这说明 CLI 侧存在由 **opencode** 提供的插件/规则扩展面，但该扩展面属于 opencode 项目本身，不属于 Code Assistant 在 VS Code 插件内文档化的机制；本任务未登记 opencode 官方文档，因此不对其事件或钩子形态作答。

**逐题缺口清单**（同一结论的七个问题，分别列出缺什么证据）：

| 问题 | 需要的契约 | 本轮结果 |
| :-- | :-- | :-- |
| `hooks.events` | 第一方事件清单与触发时点 | 未找到；工具/工作流文档无事件模型 [@ref-sc-ca-tools-ref] |
| `hooks.entry` | 注册位置、作用域、matcher/过滤语法 | 未找到；配置面只有 Modes 工具组与 Auto-approve 权限 [@ref-sc-ca-modes-configure] |
| `hooks.input` | 回调输入、环境变量、工作目录、敏感内容处理 | 未找到 |
| `hooks.output` | 退出码/返回值对继续、修改、阻断的语义 | 未找到；相关语义只存在于 Auto-approve 的批准/拒绝 [@ref-sc-ca-aa-permissions] |
| `hooks.order` | 多 Hook 顺序、并发、重复触发、超时、失败处理 | 未找到 |
| `hooks.conditions` | 启用状态、权限、信任、沙箱对生效的影响 | 未找到；`Execute` 白名单是权限而非 Hook 条件 [@ref-sc-ca-aa-execute] |
| `hooks.diagnostics` | 发现/匹配/执行/失败的检查入口 | 未找到；只有通用日志导出 [@ref-sc-ca-logs] |

**诊断**：插件侧没有 Hook 专属诊断入口；通用入口是插件菜单的 **Export Logs**（导出 `logs.zip`）与 Settings 各面板（Auto-approve、MCP servers、Checkpoints 等）。[@ref-sc-ca-logs][@ref-sc-ca-aa-quickstart]

**与 MCP 的边界**：MCP 的自动批准同样是"授权策略"而非 Hook；关闭 MCP 总开关会把 `use_mcp_tool` 与 `access_mcp_resource` 一并移除，属于能力开关。[@ref-sc-ca-mcp-disable]
