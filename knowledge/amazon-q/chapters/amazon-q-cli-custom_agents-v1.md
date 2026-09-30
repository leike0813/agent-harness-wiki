---
schema_version: 3
record_kind: production
edition_id: amazon-q-cli-custom_agents-v1
harness_id: amazon-q
topic: custom_agents
title: "Amazon Q CLI 的自定义 Agent：文件位置、字段格式、默认选择、委派、覆盖与诊断"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-docs-command-line-kiro, ref-amazon-q-repo-readme-status, ref-amazon-q-repo-intro]
  - section_id: agents-entry-format
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-agents-local, ref-amazon-q-repo-agents-global, ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-repo-agents-precedence, ref-amazon-q-repo-agents-conflict, ref-amazon-q-repo-agents-example, ref-amazon-q-repo-format-sections, ref-amazon-q-repo-format-name, ref-amazon-q-repo-format-description, ref-amazon-q-repo-format-prompt, ref-amazon-q-repo-format-example, ref-amazon-q-repo-agent-schema]
  - section_id: agents-roles-invocation
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-default-priority, ref-amazon-q-repo-default-errors, ref-amazon-q-repo-default-builtin, ref-amazon-q-repo-agent-subcommands, ref-amazon-q-repo-root-subcommands, ref-amazon-q-repo-experiments-delegate, ref-amazon-q-repo-experiments-settings, ref-amazon-q-repo-format-sections]
  - section_id: agents-overrides-limits
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-format-model, ref-amazon-q-repo-format-tools, ref-amazon-q-repo-format-allowedtools, ref-amazon-q-repo-format-toolssettings, ref-amazon-q-repo-format-resources, ref-amazon-q-repo-format-hooks, ref-amazon-q-repo-format-toolaliases, ref-amazon-q-repo-format-example, ref-amazon-q-repo-experiments-delegate, ref-amazon-q-repo-agent-subcommands, ref-amazon-q-repo-experiments-settings]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-agent-subcommands, ref-amazon-q-repo-root-subcommands, ref-amazon-q-repo-agents-conflict, ref-amazon-q-repo-default-errors, ref-amazon-q-repo-cli-verbose, ref-amazon-q-repo-slash-commands]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-amazon-q-repo-agents-local, ref-amazon-q-repo-agents-global, ref-amazon-q-repo-agents-precedence, ref-amazon-q-docs-mcp-config-cli]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-format-name, ref-amazon-q-repo-format-description, ref-amazon-q-repo-format-prompt, ref-amazon-q-repo-agent-schema, ref-amazon-q-repo-format-example]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles-invocation
        status: partial
        source_refs: [ref-amazon-q-repo-default-priority, ref-amazon-q-repo-default-builtin, ref-amazon-q-repo-experiments-delegate, ref-amazon-q-repo-format-sections]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-roles-invocation
        status: answered
        source_refs: [ref-amazon-q-repo-default-priority, ref-amazon-q-repo-agent-subcommands, ref-amazon-q-repo-root-subcommands, ref-amazon-q-repo-default-errors]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-amazon-q-repo-format-model, ref-amazon-q-repo-format-tools, ref-amazon-q-repo-format-allowedtools, ref-amazon-q-repo-format-toolssettings, ref-amazon-q-repo-format-resources, ref-amazon-q-repo-format-hooks]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: partial
        source_refs: [ref-amazon-q-repo-experiments-delegate, ref-amazon-q-repo-experiments-settings, ref-amazon-q-repo-agent-subcommands]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-amazon-q-repo-agent-subcommands, ref-amazon-q-repo-agents-conflict, ref-amazon-q-repo-default-errors, ref-amazon-q-repo-cli-verbose, ref-amazon-q-repo-slash-commands]
---

## 固定来源与适用范围 {#agents-scope}

自定义 Agent 是 Amazon Q CLI 的核心配置单位。本章的固定来源是 AWS 官方用户指南的 CLI/MCP 页面与官方仓库 `aws/amazon-q-developer-cli`（提交 `15cc8f3cd18c4272925ce1c7053268eedff1ea0a`）的登记文档和源码 [@ref-amazon-q-docs-mcp-config-cli][@ref-amazon-q-repo-format-sections]。

产品状态需要先说清：AWS 用户指南写明 Q CLI 已变为 Kiro CLI [@ref-amazon-q-docs-command-line-kiro]；仓库 README 写明该项目不再积极维护、Amazon Q Developer CLI 以闭源 Kiro CLI 继续提供 [@ref-amazon-q-repo-readme-status]。仓库 `docs/` 自述描述的是开发构建、仍在变动 [@ref-amazon-q-repo-intro]。因此以下字段与行为按来源级知识阅读。本章只覆盖 `cli` 界面。

## 定义位置与文件格式 {#agents-entry-format}

**agents.entry**：agent 配置文件分两级放置——工作区级在当前目录的 `.amazonq/cli-agents/`，只在从该目录或其子目录运行 Q CLI 时可用；用户级在 `~/.aws/amazonq/cli-agents/`（`amazonq` 目录位于 `.aws` 下），任何目录都可用 [@ref-amazon-q-repo-agents-local][@ref-amazon-q-repo-agents-global]。AWS 用户指南把 CLI 的全局 agent/MCP 配置统一写成 `~/.aws/amazonq/cli-agents` 目录 [@ref-amazon-q-docs-mcp-config-cli]。查找顺序是先本地后全局，同名时本地生效并打印 `WARNING: Agent conflict for NAME. Using workspace version.`，全局同名文件被忽略 [@ref-amazon-q-repo-agents-precedence][@ref-amazon-q-repo-agents-conflict]。全局目录不存在时 CLI 会自动创建，工作区目录需要用户自己建 [@ref-amazon-q-repo-agents-local]。

每个 agent 是一个 JSON 文件，**文件名去掉 `.json` 就是 agent 名** [@ref-amazon-q-repo-format-sections]。仓库给出的最小工作区 agent 示例 [@ref-amazon-q-repo-agents-example]：

```json
{
  "description": "Helper agent for this specific project",
  "tools": ["fs_read", "fs_write", "execute_bash"],
  "resources": [
    "file://README.md",
    "file://docs/**/*.md"
  ]
}
```

**agents.format**：agent 配置可包含的字段是——`name`（可选，缺省由文件名推导）、`description`、`prompt`（高层上下文，可用内联文本或 `file://` URI）、`mcpServers`、`tools`、`toolAliases`、`allowedTools`、`toolsSettings`、`resources`、`hooks`、`useLegacyMcpJson`、`model` [@ref-amazon-q-repo-format-sections]。仓库中唯一的 agent schema 是 `schemas/agent-v1.json` [@ref-amazon-q-repo-agent-schema]。`name` 用于识别与展示 [@ref-amazon-q-repo-format-name]；`description` 面向人与模型阅读 [@ref-amazon-q-repo-format-description]；`prompt` 支持 `file://` 引用外部文件，相对路径相对 agent 配置文件所在目录解析，绝对路径原样使用 [@ref-amazon-q-repo-format-prompt]。仓库还给出了把上述字段组合起来的完整示例 [@ref-amazon-q-repo-format-example]。文档建议在会话里用 `/agent generate` 由模型生成 agent 配置 [@ref-amazon-q-repo-format-sections]。

## 默认选择、切换与委派 {#agents-roles-invocation}

**agents.invocation**：选择顺序是三层——先看启动时的 `--agent NAME`（不存在则报错并回退），再看设置 `chat.defaultAgent` 指定的用户默认（找不到也报错并回退），最后用内置默认 agent [@ref-amazon-q-repo-default-priority]。回退时会打印可读的错误，例如 `Error: no agent with name NAME found. Falling back to user specified default` [@ref-amazon-q-repo-default-errors]。放入名为 `q_cli_default` 的 agent 文件即可覆盖内置默认 [@ref-amazon-q-repo-default-builtin]。

会话内的 `/agent` 子命令提供管理面：`list`、`create`（`--name`、可选 `--directory`、`--from`）、`edit`（`--name`）、`generate`、`schema`、`set-default`，另有隐藏的 `delete` 与 `set` [@ref-amazon-q-repo-agent-subcommands]；终端侧是顶层子命令 `q agent` 与 `q chat --agent NAME` [@ref-amazon-q-repo-root-subcommands]。

**agents.roles**：文档只把 agent 描述为"主对话所用配置"，没有给出"主代理 / 子代理"的正式分层；后台并行任务由实验特性 Delegate 提供：`delegate` 工具可 `launch`、`status`、`list`，用特定 agent 起后台会话，完成后在下一个提示处给出状态、耗时与摘要，摘要并入主对话上下文 [@ref-amazon-q-repo-experiments-delegate]。Delegate 由 `chat.enableDelegate` 开关控制 [@ref-amazon-q-repo-experiments-settings]。agent 配置字段清单里没有"角色"或"父/子继承"字段 [@ref-amazon-q-repo-format-sections]。因此本项按 partial 记录：单层 agent + 实验性后台委派有依据，原生主/子代理层级没有依据。

## 覆盖、权限与边界 {#agents-overrides-limits}

**agents.overrides**：每个 agent 独立指定——`model`（模型 ID，不在服务返回列表里则回退默认并告警） [@ref-amazon-q-repo-format-model]；`tools`（可见工具集合，支持 `@server`、`@server/tool`、`*`、`@builtin`） [@ref-amazon-q-repo-format-tools]；`allowedTools`（免确认白名单，支持通配，不接受 `*`） [@ref-amazon-q-repo-format-allowedtools]；`toolsSettings`（逐工具参数，如 `fs_write.allowedPaths`、`use_aws.allowedServices`） [@ref-amazon-q-repo-format-toolssettings]；`resources`（`file://` 上下文资源） [@ref-amazon-q-repo-format-resources]；`hooks`（生命周期与工具事件命令） [@ref-amazon-q-repo-format-hooks]；`toolAliases`（工具改名以消除重名） [@ref-amazon-q-repo-format-toolaliases]。完整示例把这些字段放在一个文件里 [@ref-amazon-q-repo-format-example]。这些字段是**按 agent 各自独立**的，文档没有描述从父级或全局设置继承再覆盖的规则。

**agents.limits**：可验证的边界只有委派相关——同一 agent 同时只允许一个后台任务，任务详情存放在当前目录的 `.amazonq/.subagents/`，同一 agent 再次运行时旧文件被替换 [@ref-amazon-q-repo-experiments-delegate]。缺口：并发上限、递归委派、嵌套深度与单次会话时长都没有在登记来源中说明；`/agent create --from` 的继承语义也只出现在子命令帮助里，没有展开 [@ref-amazon-q-repo-agent-subcommands][@ref-amazon-q-repo-experiments-settings]。按 partial 记录。

## 诊断与管理 {#agents-diagnostics}

可观察入口：会话内 `/agent list` 列出可用 agent，`/agent schema` 打印配置 schema，`/agent edit` 直接编辑当前 agent [@ref-amazon-q-repo-agent-subcommands]；终端侧 `q agent` 与 `q settings chat.defaultAgent` 管理默认选择 [@ref-amazon-q-repo-root-subcommands]；同名冲突会打印 `WARNING: Agent conflict ...` [@ref-amazon-q-repo-agents-conflict]；回退会打印 `no agent with name ... found` 之类的错误 [@ref-amazon-q-repo-default-errors]；`q -v` 到 `q -vvv` 提高日志级别，`q chat` 的日志落在 `qchat.log` [@ref-amazon-q-repo-cli-verbose]；内置的 `introspect` 工具可在会话里回答 CLI 功能问题 [@ref-amazon-q-repo-slash-commands]。

**agents.diagnostics** 按 partial 记录：以上入口都能确认"定义被发现"和"选择发生了"，但登记来源没有给出定位权限拒绝或委派失败原因的专门命令，也没有说明 agent 文件改动后是否需要重启会话。
