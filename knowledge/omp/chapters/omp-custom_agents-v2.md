---
schema_version: 3
record_kind: production
edition_id: omp-custom_agents-v2
harness_id: omp
topic: custom_agents
title: OMP 自定义 Agent 定义与选择
sections:
  - section_id: agents-discovery
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-precedence-doc
  - section_id: agents-format
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-shape-doc
      - ref-omp-agents-fields-code
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-roles-doc
  - section_id: agents-lookup
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-lookup-doc
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-constraints-doc
  - section_id: agents-merge
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-merge-doc
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-discovery
        status: answered
        source_refs:
          - ref-omp-agents-precedence-doc
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs:
          - ref-omp-agents-shape-doc
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs:
          - ref-omp-agents-roles-doc
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-lookup
        status: answered
        source_refs:
          - ref-omp-agents-lookup-doc
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs:
          - ref-omp-agents-shape-doc
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs:
          - ref-omp-agents-constraints-doc
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-merge
        status: partial
        source_refs:
          - ref-omp-agents-merge-doc
---
本章材料来自源码修订 dff728c 的官方文档 `docs/task-agent-discovery.md` 与 npm 包 `@oh-my-pi/pi-coding-agent` 18.3.4 的包内解析代码 `src/discovery/helpers.ts`。发现来源、定义形态、角色映射与运行约束来自文档，必填字段的解析行为来自包内代码。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有运行产品来观察权限或委派失败。

## Agent 定义来源 {#agents-discovery}

原生 agent 定义来自项目作用域的 `.omp/agents`，以及用户作用域 agentDir 下的 `agents` 目录；项目那一处自工作目录向上就近命中一个 `.omp`，用户那一处也取第一个 `.omp` 命中。其余来源依次是扩展包的 agents 目录、Claude 市场插件的 agents 目录，最后是内置 agent。 [@ref-omp-agents-precedence-doc]

跨 harness 的 `.claude/agents`、`.codex/agents`、`.gemini/agents` 等目录被有意跳过，因为它们的 frontmatter 契约不是 OMP 的 task-agent 契约。 [@ref-omp-agents-precedence-doc]

## 定义文件格式与字段 {#agents-format}

`AgentDefinition` 必填 `name` 与 `description`，可选 `tools`、`spawns`、模型列表 `model`、`thinkingLevel`、`output`、`blocking`、`autoloadSkills`、`readSummarize`、`prewalk` 与 `advisor`；frontmatter 之后的文件正文成为该 agent 的 systemPrompt。缺少 `name` 或 `description` 时 `parseAgentFields()` 返回 null，调用方把整个文件当作解析失败跳过。 [@ref-omp-agents-shape-doc]

项目作用域的一个完整定义文件 `.omp/agents/reviewer.md`：

```md
---
name: reviewer
description: Review a change for correctness.
model: "@review"
---

Review the assigned change and report concrete findings.
```

`name` 与 `description` 必填；`model` 接受单个 selector、CSV 或数组，条目在角色别名展开后按顺序尝试；`tools` 接受 CSV 或数组并在提供时自动补上 `yield`；`spawns` 接受 `*`、CSV 或数组；`read-summarize: false` 让子代理的 `read` 工具返回原文而不是结构摘要。生效结果是该文件被注册为一个可派发的 agent，名字就是 `name`；检查方式是派发时用这个名字，找不到会得到列出可用名的 preflight 错误。 [@ref-omp-agents-shape-doc] [@ref-omp-agents-fields-code]

覆盖发生在定义选择阶段：frontmatter 里这些字段随定义整体生效，同名定义之间按第一命中取一份，不做字段级与父会话合并。 [@ref-omp-agents-shape-doc]

## 角色别名与模型路由 {#agents-roles}

可以在 frontmatter 用角色别名做模型路由，例如写 `model: "@review"`，再在 `config.yml` 的 `modelRoles.review` 给出具体 selector，selector 末尾可以带思考后缀。任务派发只设置 agent，不设置 worker 模型，所以改角色映射就能改后续派发用的模型，不必改 agent 定义。 [@ref-omp-agents-roles-doc]

用户级 `~/.omp/agent/config.yml` 里的一段映射：

```yaml
modelRoles:
  review: openai/gpt-5.4:high
```

`@review` 经 `modelRoles.review` 解析成 `openai/gpt-5.4` 并带 `high` 思考等级；改这个映射会影响之后的任务解析。主代理与子代理共用同一套 agent 机制，内置 agent 与非内置 agent 只在来源和优先级上有区别。 [@ref-omp-agents-roles-doc]

## 查找与委派 {#agents-lookup}

查找是精确名线性搜索：`getAgent(agents, name)` 等价于对名字做严格相等的 find。无限制会话在省略 `agent` 字段时默认派发 `task`，受限父会话则默认取 `spawns` 列表的第一项。是否可自动委派取决于父会话的 spawn 策略。 [@ref-omp-agents-lookup-doc]

执行时会重新发现 agent 并合并会话内动态加入的 agent，所以运行时可用的集合可能不同于早先写入工具描述的那一份；派发时的新增或修改文件会生效。 [@ref-omp-agents-lookup-doc]

## 运行边界 {#agents-limits}

`resolveEffectiveSubagentPolicy()` 在解析出 agent 后检查 `task.disabledAgents`，被禁用的名字在 preflight 失败并列出可用替代。父会话的 `spawns` 策略可以是全部允许、全部禁止，或只允许 CSV 白名单。`task.maxRecursionDepth` 默认 2，负值表示关闭上限；子代理达到上限后不再带 `task` 工具。并发与上下文边界本章未逐项取证。 [@ref-omp-agents-constraints-doc]

## 同名合并与诊断 {#agents-merge}

发现用 first-wins 去重，键是精确的 `agent.name`：一个集合记录已见名字，按目录顺序展平后只保留未见过的名字。由此得出几条可依赖的规则：项目 `.omp` 覆盖用户 `.omp`；较早的扩展根覆盖较晚的扩展根、Claude 市场插件与内置 agent；非内置 agent 覆盖同名内置 agent；名字区分大小写，`Task` 与 `task` 是两个不同的名字。 [@ref-omp-agents-merge-doc]

这些规则可以用来解释“为什么生效的不是我这份定义”。权限或委派失败的直接诊断本轮没有运行观察，仍属证据缺口。 [@ref-omp-agents-merge-doc]

