---
schema_version: 3
record_kind: production
edition_id: cline-cli-custom_agents-v2
harness_id: cline
topic: custom_agents
title: "Cline CLI 的自定义 Agent、Subagent 与 Team 角色"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-cline-paths-agents, ref-cline-paths-clinedir, ref-cline-agents-load, ref-cline-agents-yaml, ref-cline-cli-agent-flags, ref-cline-cli-agents-cmd, ref-cline-cli-ref-files-v2, ref-cline-config-doc-layout, ref-cline-agents-load-loop]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-cline-agents-schema, ref-cline-agents-stringlist, ref-cline-agents-body, ref-cline-agents-tool-name, ref-cline-agents-tool-name-build, ref-cline-agent-tool-aliases]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-cline-agents-tool, ref-cline-agents-delegated, ref-cline-agents-spawn-tool, ref-cline-agents-spawn-run, ref-cline-agents-team-schema, ref-cline-agents-team-tools, ref-cline-agents-teammate-prompt, ref-cline-session-tool-filter, ref-cline-cli-root-options, ref-cline-teams-doc-state, ref-cline-agents-override]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-cline-agents-tool, ref-cline-agents-spawn-tool, ref-cline-cli-team-command, ref-cline-cli-team-run, ref-cline-subagents-doc-enable, ref-cline-cli-agent-flags]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-cline-agents-tool-timeout, ref-cline-agents-spawn-timeout, ref-cline-agents-team-tools, ref-cline-agents-spawn-tool, ref-cline-teams-doc-disable, ref-cline-cli-root-options, ref-cline-cli-agents-cmd, ref-cline-agents-load]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: conflict
        source_refs: [ref-cline-paths-agents, ref-cline-cli-agents-cmd, ref-cline-cli-ref-files-v2, ref-cline-agents-load-loop]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-cline-agents-schema, ref-cline-agents-body, ref-cline-agents-tool-name]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-cline-agents-delegated, ref-cline-agents-team-tools, ref-cline-agents-spawn-tool]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-cline-agents-tool, ref-cline-cli-team-command, ref-cline-cli-team-run]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-cline-agents-tool, ref-cline-agents-delegated, ref-cline-session-tool-filter, ref-cline-agents-override]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-cline-agents-tool-timeout, ref-cline-agents-spawn-timeout, ref-cline-teams-doc-disable]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs: [ref-cline-cli-agents-cmd, ref-cline-agents-load]
---

## 定义位置与作用域 {#agents-entry}

固定来源：仓库提交 `3435f72fcf4cb843bee946b8f9e981683564c9e3` 的 `sdk/packages/shared/src/storage/paths.ts`、`sdk/packages/core/src/extensions/tools/team/`、`sdk/packages/core/src/runtime/orchestration/runtime-builder.ts`、`apps/cli/src/`，以及 `docs/features/subagents.mdx`、`docs/cli/agent-teams.mdx`、`docs/getting-started/config.mdx`、`docs/cli/cli-reference.mdx`。

自定义 Agent 是「一个目录里的若干个 YAML 文件」。搜索路径由 `resolveAgentConfigSearchPaths(workspacePath)` 给出：先 `{workspace}/.cline/agents`，再 `resolveClineDir()/agents`（即 `~/.cline/agents`，受 `CLINE_DIR` 与 `--config` 影响）。[@ref-cline-paths-agents][@ref-cline-paths-clinedir]

加载器 `loadConfiguredAgentConfigs` 只读目录里的**普通文件**且扩展名必须是 `.yml` 或 `.yaml`；按搜索顺序遍历，每个规范化名字（小写去空格）**先到先得**，所以项目定义覆盖全局同名定义；单个文件解析失败只把错误收进 `errors[]`，不影响其它文件。[@ref-cline-agents-load][@ref-cline-agents-load-loop][@ref-cline-agents-yaml]

CLI 侧接线：只有 `enableSpawnAgent` 打开时运行时才会调用加载器，工作区根取 `workspaceRoot ?? cwd`，而 CLI 把 `enableSpawnAgent` 与 `enableAgentTeams` 都设成 `!isYoloMode`——即 `-y/--yolo` 模式下自定义 subagent 与团队都不可用。[@ref-cline-cli-agent-flags][@ref-cline-agents-load]

`cline config agents` 用硬编码的同一组目录（`{cwd}/.cline/agents` 与 `{CLINE_DIR 或 ~/.cline}/agents`）列出条目，只认 `.yml`/`.yaml`，同名去重取第一个，`--json` 输出 `{name, path}` 数组。[@ref-cline-cli-agents-cmd]

**文档冲突。** 官方 CLI 参考的目录树把代理定义写成项目根的单个 `.cline/agents.yaml` 文件；`docs/getting-started/config.mdx` 与代码则是 `.cline/agents/` **目录**（全局 `~/.cline/agents/`）。按代码，`agents.yaml` 既不会被加载也不会被 `cline config agents` 列出。[@ref-cline-cli-ref-files-v2][@ref-cline-config-doc-layout]

## 文件格式、字段与工具名 {#agents-format}

文件是 YAML frontmatter 加 markdown 正文。frontmatter 的字段集合固定为 [@ref-cline-agents-schema]：

| 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `name` | 是 | 非空字符串，去空格 |
| `description` | 是 | 非空字符串，作为工具描述的一部分 |
| `tools` | 否 | 字符串或字符串数组，逗号分隔也可 |
| `skills` | 否 | 同上，限制该子代理可用的 skill |
| `providerId` | 否 | 覆盖 provider |
| `modelId` | 否 | 覆盖模型 |
| `maxIterations` | 否 | 正整数 |

`tools`/`skills` 都接受「逗号分隔字符串」或「字符串数组」，逐项去空格、丢空值、保序去重。[@ref-cline-agents-stringlist]

frontmatter 之后的正文去掉首尾空白就是系统提示；正文为空会报 `Missing system prompt body in agent config file.`。文件开头允许有 UTF-8 BOM。[@ref-cline-agents-body]

名字到工具名的映射：`subagent_` 前缀加净化后的名字（小写、只保留 `[a-z0-9]`、其余连续字符折成 `_`、去掉尾部 `_`），超过 64 字符时截断并追加 6 位 base36 哈希后缀，重名再补 `_2`、`_3`。[@ref-cline-agents-tool-name][@ref-cline-agents-tool-name-build]

`tools` 里写的是内置工具的旧名，会先经别名表归一：`read_file` → `read_files`、`execute_command`/`bash`/`list_files` → `run_commands`、`search_files`/`list_code_definition_names` → `search_codebase`、`apply_diff`/`replace_in_file`/`write_to_file` → `editor`、`attempt_completion` → `submit_and_exit`、`use_skill` → `skills`。[@ref-cline-agent-tool-aliases]

一个最小定义（字段名与取值来自加载器 schema 与运行时别名表）[@ref-cline-agents-schema][@ref-cline-agent-tool-aliases]：

```yaml
---
name: reviewer
description: 审查改动并给出可执行意见
tools: Read_File, Search_Files
skills: code-review
providerId: openai
modelId: gpt-5
maxIterations: 3
---
你是一名代码审查者，只读取文件并给出结论。
```

## 角色、委派机制与覆盖 {#agents-roles}

同一套底层原语支持三种委派：

1. **配置型 subagent**：每个 YAML 变成一个工具 `subagent_名字`，描述是 `Use the "名字" subagent: 描述`，执行时用 `createDelegatedAgent({kind: "subagent", prompt: systemPrompt, maxIterations, parentAgentId})`；`tools` 设了就把子代理的工具限死在名单内，`skills` 设了就把 `skills` 加进名单并只给它这些 skill 的专用执行器。[@ref-cline-agents-tool][@ref-cline-agents-delegated]
2. **通用 spawn_agent**：由核心提供，系统提示与任务来自模型的工具调用（`systemPrompt` + `task`），同样走 `createDelegatedAgent`，`maxIterations` 用默认值。[@ref-cline-agents-spawn-tool][@ref-cline-agents-spawn-run]
3. **Agent Teams**：`--team-name` 或 `/team` 打开团队模式后，lead 额外拿到团队工具与 `team_spawn_teammate`（入参严格为 `{agentId, rolePrompt}`）；teammate 拿到同一批团队工具但**不含** spawn 工具（`allowSpawn: false`、`includeSpawnTool: false`），系统提示只在 cline provider 下被加上团队角色头。[@ref-cline-agents-team-schema][@ref-cline-agents-team-tools][@ref-cline-agents-teammate-prompt]

主代理自身不走这套：lead 就是宿主会话的 agent，所有子角色都是通过同一份「父连接配置快照」创建的，因此 provider、密钥、baseUrl 默认继承父会话。[@ref-cline-agents-delegated]

覆盖规则：每个 agent 只能覆盖 `providerId`、`modelId`、`maxIterations`（`agent.X ?? base.X`），以及工具与 skill 的范围；连接字段（apiKey、baseUrl、headers、thinking/maxTokens/temperature 等）一律继承，agent 文件里没有对应字段。[@ref-cline-agents-override][@ref-cline-agents-tool]

**权限没有按 agent 隔离**：委派出来的子代理带着 `requestToolApproval: undefined` 与 `toolPolicies: undefined`，设计注释写明「父代理批准委派，子代理工具自行运行」；批准只在父代理调用 `subagent_*`/`spawn_agent` 这一次发生。父会话的 `toolPolicies` 仍然决定这些工具本身是否可见。[@ref-cline-agents-delegated][@ref-cline-session-tool-filter]

沙箱也不是 per-agent 字段：CLI 的沙箱是会话级配置（`--data-dir` 或 `CLINE_SANDBOX`）。团队状态持久化在 `{数据目录}/teams/{team-name}/`，含任务板、信箱与任务日志。[@ref-cline-cli-root-options][@ref-cline-teams-doc-state]

## 显式调用与自动委派 {#agents-invocation}

模型侧：每个配置型 agent 就是一个工具，模型按描述自行选择；`spawn_agent` 的描述是「带自定义指令生成子代理，等待其完成后返回结果再继续」。两者都是 `executionMode: "parallel"`。[@ref-cline-agents-tool][@ref-cline-agents-spawn-tool]

用户侧只有两条显式入口，没有「按名字直接调用某个 agent」的命令：

- 命令行 `cline --team-name <名字> "任务"`（该选项在帮助里被隐藏），含义是开启团队并把 coordinator 角色交给主代理；[@ref-cline-cli-team-command]
- 交互模式 `/team 任务`：`/team` 被重写成一段普通提示（`spawn a team of agents for the following task: ...`），同时强制 `enableAgentTeams = true`、补一个 `teamName`、并重启空会话。[@ref-cline-cli-team-run]

其余情况都靠提示词引导模型自己选工具；文档建议的「用 subagents 探索 X」就是这个用法。[@ref-cline-subagents-doc-enable]

两个总开关都来自配置且在 yolo 下关闭：`enableSpawnAgent` 管配置型 agent 与 `spawn_agent`，`enableAgentTeams` 管团队工具。文档说明「subagents 默认开启，可在 Settings → Features → Agent 里关掉 `use_subagents`」，CLI 侧的对应物是模式与这两个开关。[@ref-cline-cli-agent-flags][@ref-cline-subagents-doc-enable]

## 边界、开关与诊断 {#agents-limits}

时长：配置型 subagent 工具与 `spawn_agent` 都带 `timeoutMs: 300000`（5 分钟）且 `retryable: false`；没有单次委派的迭代上限之外的持续时间限制。[@ref-cline-agents-tool-timeout][@ref-cline-agents-spawn-timeout]

嵌套：subagent 与 teammate 都不带 spawn 工具，因此不能继续生成同级角色；通用 `spawn_agent` 是唯一可能在会话内再次委派的路径。并发方面，同一批工具都是并行执行模式，固定来源没有给出并发上限常数。[@ref-cline-agents-team-tools][@ref-cline-agents-spawn-tool]

**文档冲突。** `docs/cli/agent-teams.mdx` 说可以用 `cline --no-teams "提示"` 关闭团队；固定提交的根选项列表里没有 `--no-teams`，实际可用的开关是 `-y/--yolo`（同时关掉 spawn 与 teams）与不启用团队模式。[@ref-cline-teams-doc-disable][@ref-cline-cli-root-options]

诊断：`cline config agents` 列出发现到的定义与文件路径，`--json` 便于脚本比对；加载时的逐文件解析错误只在运行时 `errors[]` 里，CLI 没有把它们打印出来的命令。[@ref-cline-cli-agents-cmd][@ref-cline-agents-load]
