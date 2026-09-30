---
schema_version: 3
record_kind: production
edition_id: gemini-cli-cli-custom_agents-v1
harness_id: gemini-cli
topic: custom_agents
title: "Gemini CLI 的 subagents：定义位置、文件格式、调用、覆盖与边界"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-plugins-ref-subagents, ref-gemini-cli-agents-doc-what]
  - section_id: agents-entry-format
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-agents-doc-files, ref-gemini-cli-storage-agents-dirs, ref-gemini-cli-storage-project-scope, ref-gemini-cli-agents-doc-extension, ref-gemini-cli-agents-registry-sources, ref-gemini-cli-agents-registry-ack, ref-gemini-cli-agents-doc-format, ref-gemini-cli-agents-doc-schema, ref-gemini-cli-agents-loader-local, ref-gemini-cli-agents-loader-parse]
  - section_id: agents-roles-invocation
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-agents-registry-sources, ref-gemini-cli-agents-doc-builtin, ref-gemini-cli-agents-doc-investigator, ref-gemini-cli-agents-doc-browser, ref-gemini-cli-agents-doc-remote, ref-gemini-cli-agents-doc-extension, ref-gemini-cli-agents-doc-what, ref-gemini-cli-agents-doc-optimize, ref-gemini-cli-agents-doc-forcing, ref-gemini-cli-agents-policy-syntax, ref-gemini-cli-agents-doc-interactive, ref-gemini-cli-cmd-agents]
  - section_id: agents-overrides-limits
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-agents-doc-schema, ref-gemini-cli-agents-doc-overrides, ref-gemini-cli-settings-agents, ref-gemini-cli-agents-doc-modeloverrides, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-agents-doc-policies, ref-gemini-cli-agents-policy-syntax, ref-gemini-cli-agents-doc-isolation, ref-gemini-cli-agents-doc-toolisolation, ref-gemini-cli-agents-doc-inline]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-cmd-agents, ref-gemini-cli-cli-interactive, ref-gemini-cli-agents-loader-local, ref-gemini-cli-agents-registry-sources, ref-gemini-cli-agents-registry-ack, ref-gemini-cli-settings-experimental-agents]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-gemini-cli-agents-doc-files, ref-gemini-cli-storage-agents-dirs, ref-gemini-cli-storage-project-scope, ref-gemini-cli-agents-doc-extension, ref-gemini-cli-agents-registry-sources, ref-gemini-cli-agents-registry-ack]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: partial
        source_refs: [ref-gemini-cli-agents-doc-format, ref-gemini-cli-agents-doc-schema, ref-gemini-cli-agents-loader-local, ref-gemini-cli-agents-loader-parse]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles-invocation
        status: answered
        source_refs: [ref-gemini-cli-agents-registry-sources, ref-gemini-cli-agents-doc-builtin, ref-gemini-cli-agents-doc-investigator, ref-gemini-cli-agents-doc-browser, ref-gemini-cli-agents-doc-remote, ref-gemini-cli-agents-doc-extension]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-roles-invocation
        status: answered
        source_refs: [ref-gemini-cli-agents-doc-what, ref-gemini-cli-agents-doc-optimize, ref-gemini-cli-agents-doc-forcing, ref-gemini-cli-agents-policy-syntax, ref-gemini-cli-agents-doc-interactive, ref-gemini-cli-cmd-agents]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-gemini-cli-agents-doc-schema, ref-gemini-cli-agents-doc-overrides, ref-gemini-cli-settings-agents, ref-gemini-cli-agents-doc-modeloverrides, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-agents-doc-policies, ref-gemini-cli-agents-policy-syntax]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: partial
        source_refs: [ref-gemini-cli-agents-doc-schema, ref-gemini-cli-agents-doc-isolation, ref-gemini-cli-agents-doc-toolisolation, ref-gemini-cli-agents-doc-inline]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-gemini-cli-cmd-agents, ref-gemini-cli-cli-interactive, ref-gemini-cli-agents-loader-local, ref-gemini-cli-agents-registry-sources, ref-gemini-cli-agents-registry-ack, ref-gemini-cli-settings-experimental-agents]
---

## 固定来源与适用范围 {#agents-scope}

本章的固定来源是官方仓库 `google-gemini/gemini-cli` 提交
`38700b4b38bf387dafded6c97c3f190d084b49e9` 的
`docs/core/subagents.md`、`docs/reference/configuration.md`（`agents` 段）与
`packages/core/src/agents/agentLoader.ts`、`registry.ts`
源码。固定来源未注明适用的软件版本，因此本章是来源级知识。文档把这一机制标注为"preview feature currently under active
development" [@ref-gemini-cli-plugins-ref-subagents]。产品里的名字是 **subagents**：主
agent 把子 agent 当作同名工具调用，子 agent 在自己的上下文循环里完成任务后把结论回报给主 agent
[@ref-gemini-cli-agents-doc-what]。

## 定义位置与文件格式 {#agents-entry-format}

**agents.entry**：自定义 agent 是带 YAML frontmatter 的 Markdown 文件，放在两处——项目级
`项目根/.gemini/agents/`（随仓库共享）与用户级 `~/.gemini/agents/`
[@ref-gemini-cli-agents-doc-files]。这两条路径与源码中的
`getProjectAgentsDir()`（`项目根/.gemini/agents`）和
`Storage.getUserAgentsDir()`（`~/.gemini/agents`）一致
[@ref-gemini-cli-storage-agents-dirs][@ref-gemini-cli-storage-project-scope]。扩展可以打包
subagent：把 `.md` 放在扩展根的 `agents/` 目录 [@ref-gemini-cli-agents-doc-extension]。内置
agent 由程序注册（见下文），不来自目录 [@ref-gemini-cli-agents-registry-sources]。

注册顺序与门禁（源码）：内置 → 项目级（仅在文件夹信任开启且当前目录受信时读取；未受信时给出跳过提示）→ 用户级 →
扩展自带（仅激活的扩展）[@ref-gemini-cli-agents-registry-sources]。项目级 agent 还有一层确认机制：注册表用
agent 定义的内容哈希向 acknowledged-agents 服务核对，未确认的项目 agent 不会直接注册，而是先作为"发现到的新
agent"发事件等待确认 [@ref-gemini-cli-agents-registry-ack]。用户级与扩展 agent 没有这道确认
[@ref-gemini-cli-agents-registry-sources]。

**agents.format**：文件必须以 `---` 包围的 YAML frontmatter 开头，Markdown 正文即该 agent 的
System Prompt
[@ref-gemini-cli-agents-doc-format]。官方示例（来自文档）[@ref-gemini-cli-agents-doc-format]：

```markdown
---
name: security-auditor
description: Specialized in finding security vulnerabilities in code.
kind: local
tools:
  - read_file
  - grep_search
model: gemini-3-flash-preview
temperature: 0.2
max_turns: 10
---

You are a ruthless Security Auditor. ...
```

字段表（文档逐条给出）[@ref-gemini-cli-agents-doc-schema]：

| 字段 | 必填 | 说明与默认 |
| :-- | :-- | :-- |
| `name` | 是 | 唯一标识，同时是工具名；只允许小写字母、数字、连字符与下划线 |
| `description` | 是 | 主 agent 据此判断何时委派 |
| `kind` | 否 | `local`（默认）或 `remote`（A2A 远端 agent） |
| `tools` | 否 | 工具名数组，支持通配；省略时继承父会话全部工具 |
| `mcpServers` | 否 | 只属于该 agent 的内联 MCP server |
| `model` | 否 | 指定模型，默认 `inherit`（用主会话模型） |
| `temperature` | 否 | 默认 `1` |
| `max_turns` | 否 | 默认 `30` |
| `timeout_mins` | 否 | 默认 `10` |

源码侧的校验比文档更严：`name` 必须匹配 `^[a-z0-9-_]+$`；local agent 的 frontmatter 用 `.strict()`
解析，出现未列出的字段会导致该文件加载失败并上报错误；`kind` 缺省时按字段形状猜测（含 `max_turns`/`timeout_mins`
等本地字段推断为 `local`）；`mcp_servers` 支持
`command`/`args`/`env`/`cwd`/`url`/`http_url`/`headers`/`tcp`/`type`/`timeout`/`trust`/`include_tools`/`exclude_tools`/`auth`
等键，字段名用下划线（`mcp_servers`、`max_turns`），与文档示例里的驼峰写法（`mcpServers`、`maxTurns`）属于不同层的写法
[@ref-gemini-cli-agents-loader-local][@ref-gemini-cli-agents-loader-parse]。**缺口**：文档与源码在
`mcpServers` 的拼写上并存两种形态，登记来源没有说明解析时是否两者都接受，也没有列出 `tools` 通配符的完整匹配语义；这两点按 partial
阅读。远端 agent 的 frontmatter（`kind: remote`、认证字段）在源码里有独立 schema，本章不展开
[@ref-gemini-cli-agents-loader-parse]。

## 角色、调用与委派 {#agents-roles-invocation}

**agents.roles**：主 agent、内置 subagent、自定义 subagent 与远端 agent 共用同一套"agent 定义 → 注册表
→ 同名工具"的机制，差别在来源与门禁：内置 agent 由程序注册，随能力开关启用
[@ref-gemini-cli-agents-registry-sources][@ref-gemini-cli-agents-doc-builtin]。文档列出的内置
agent 有 `codebase_investigator`、`cli_help`、`generalist`、`browser_agent`（默认禁用，需在
`agents.overrides` 里 `enabled: true` 并满足 Chrome 144+
前置条件）[@ref-gemini-cli-agents-doc-investigator][@ref-gemini-cli-agents-doc-browser]。远端
agent 走 Agent2Agent 协议，是独立文档 [@ref-gemini-cli-agents-doc-remote]。扩展提供的 subagent
与原生实现在加载路径上并列，但同样标注为 preview [@ref-gemini-cli-agents-doc-extension]。

**agents.invocation**：两条路径。自动委派：主 agent 的系统提示鼓励它在任务匹配专家 agent 时调用对应工具，判断依据是
agent 的 `description`，因此文档建议把"专长领域、何时使用、示例场景"写进描述
[@ref-gemini-cli-agents-doc-what][@ref-gemini-cli-agents-doc-optimize]。显式指定：在提示开头用
`@AGENT_NAME` 指向某个 subagent，CLI 会注入一条系统提示，促使主模型立刻使用该 subagent 工具；例如
`@codebase_investigator`
[@ref-gemini-cli-agents-doc-forcing]。可用性还受策略引擎控制——subagent 在策略匹配里被当作虚拟工具名，可用
`toolName` 直接允许或拒绝某个 subagent [@ref-gemini-cli-agents-policy-syntax]；`/agents`
命令可交互式启停与查看
[@ref-gemini-cli-agents-doc-interactive][@ref-gemini-cli-cmd-agents]。

## 覆盖、继承与边界 {#agents-overrides-limits}

**agents.overrides**：每个 agent
的模型与执行参数可以分三层覆盖。定义文件内：`model`、`temperature`、`max_turns`、`timeout_mins`
[@ref-gemini-cli-agents-doc-schema]。`settings.json` 的 `agents.overrides`：按 agent
名开启/关闭或改写运行配置（`enabled`、`runConfig.maxTurns`、`runConfig.maxTimeMinutes`），该设置标记为需要重启
[@ref-gemini-cli-agents-doc-overrides][@ref-gemini-cli-settings-agents]。模型层：用
`modelConfigs.overrides` 的 `match.overrideScope` 指向 agent 名，对该 agent 单独指定
`modelConfig.generateContentConfig`（例如
temperature）[@ref-gemini-cli-agents-doc-modeloverrides][@ref-gemini-cli-settings-modelconfigs-custom]。权限层：策略
TOML 里给规则加 `subagent` 属性，只对指定 subagent 生效
[@ref-gemini-cli-agents-doc-policies][@ref-gemini-cli-agents-policy-syntax]。继承规则：`model: inherit`（默认）用主会话模型；`tools`
省略时继承父会话全部工具，写了则只保留列出的工具 [@ref-gemini-cli-agents-doc-schema]。

**agents.limits**：每次运行有 `max_turns`（默认 30）与 `timeout_mins`（默认 10）两个硬边界
[@ref-gemini-cli-agents-doc-schema]。递归保护：subagent 不能再调用其它 subagent，即使给了 `*`
通配也看不到其它 agent [@ref-gemini-cli-agents-doc-isolation]。上下文隔离：每个 subagent
有独立历史与只属于自己的工具集，内联 MCP server 也只对该 agent 可见
[@ref-gemini-cli-agents-doc-toolisolation][@ref-gemini-cli-agents-doc-inline]。文档没有给出并发上限、嵌套深度之外的上下文窗口上限或队列行为的说明
—— 这几项状态 partial，已检查的入口是 subagents 文档的"Isolation and recursion
protection"与"Subagent tool isolation"两节
[@ref-gemini-cli-agents-doc-isolation][@ref-gemini-cli-agents-doc-toolisolation]。

## 诊断 {#agents-diagnostics}

进程内管理入口是 `/agents`：`list` 列出已发现的内置/本地/远端 agent，`reload`（别名 `refresh`）重扫
`~/.gemini/agents` 与 `.gemini/agents` 并重载注册表，`enable`/`disable` 单个
agent，`config AGENT_NAME` 打开模型、温度与执行上限对话框 [@ref-gemini-cli-cmd-agents]；CLI 参考也把
`/agents reload` 列为交互式重载入口 [@ref-gemini-cli-cli-interactive]。

加载失败的可观察面：定义解析错误（字段非法、缺必填字段、多余字段）会以 agent 加载错误的形式上报，并按来源标注是
project/user/extension agent
[@ref-gemini-cli-agents-loader-local][@ref-gemini-cli-agents-registry-sources]；项目
agent 未受信时给出"因文件夹不受信任跳过项目 agent"的提示 [@ref-gemini-cli-agents-registry-sources]；项目
agent 未确认时不会被注册，而是作为新发现项等待确认
[@ref-gemini-cli-agents-registry-ack]。缺口：登记来源没有把"定义被发现 / 已注册 / 可被委派 /
权限拒绝"拆成四个独立诊断输出，也没有列出查看某个 agent 当前生效模型与工具集的命令（`/agents config`
是可编辑对话框，不是只读视图）；这两点 partial。全局开关：`experimental.enableAgents` 默认 true、需重启，为 false
时注册表直接跳过加载
[@ref-gemini-cli-settings-experimental-agents][@ref-gemini-cli-agents-registry-sources]。
