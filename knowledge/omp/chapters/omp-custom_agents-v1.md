---
schema_version: 3
record_kind: production
edition_id: omp-custom_agents-v1
harness_id: omp
topic: custom_agents
title: OMP 自定义 Agent 机制
sections:
  - section_id: agents-sources
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-precedence-doc
  - section_id: agents-format
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-shape-doc
      - ref-omp-agents-fields-code
  - section_id: agents-run
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-roles-doc
      - ref-omp-agents-lookup-doc
      - ref-omp-agents-constraints-doc
      - ref-omp-agents-merge-doc
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-sources
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
        section_id: agents-run
        status: answered
        source_refs:
          - ref-omp-agents-roles-doc
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-run
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
        section_id: agents-run
        status: answered
        source_refs:
          - ref-omp-agents-constraints-doc
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-run
        status: partial
        source_refs:
          - ref-omp-agents-merge-doc
---
## Agent 来源 {#agents-sources}

**agents.entry**：原生 agent 定义来自项目 `.omp/agents`（自 cwd 向上就近命中一个）与用户 agentDir 下的 `agents`；其余来源依次是扩展包的 agents 目录、Claude 市场插件的 agents 目录，最后是内置 agent。跨 harness 的 `.claude/agents` 等目录被有意跳过。 [@ref-omp-agents-precedence-doc]

## 定义格式与覆盖 {#agents-format}

**agents.format**：`AgentDefinition` 必填 name、description 与 systemPrompt，可选 tools、spawns、model 列表、thinkingLevel、output、blocking、autoloadSkills、readSummarize、prewalk、advisor。解析入口是 `parseAgentFields()`，缺 name 或 description 判为无效，整个文件被跳过。 [@ref-omp-agents-shape-doc]

**agents.overrides**：frontmatter 可指定模型列表、思考等级、工具与 spawns；model 接受单个、CSV 或数组，按顺序在角色别名展开后尝试。覆盖发生在定义选择阶段（整体替换同名定义），而不是字段级与父会话合并。[@ref-omp-agents-shape-doc] [@ref-omp-agents-fields-code]

## 角色、调用与边界 {#agents-run}

**agents.roles**：可用角色别名做模型路由，例如 frontmatter 写 model: @review，再在 config.yml 的 modelRoles.review 指定具体 selector（可带思考后缀如 :high）。主代理与子代理共用同一 agent 机制，内置 agent 与非内置 agent 只在来源与优先级上区分。 [@ref-omp-agents-roles-doc]

**agents.invocation**：查找是精确名线性搜索（getAgent）；无限制会话在省略 agent 时默认 task，受限父会话则取 spawns 列表首项。是否可自动委派取决于父会话的 spawn 策略。 [@ref-omp-agents-lookup-doc]

**agents.limits**：`resolveEffectiveSubagentPolicy()` 在解析后检查 `task.disabledAgents`；父会话 spawns 策略可为“全部允许”“全部禁止”或 CSV 白名单；`task.maxRecursionDepth` 默认 2，负值关闭上限。并发与上下文边界本章未逐项取证。 [@ref-omp-agents-constraints-doc]

**agents.diagnostics**：发现层按 first-wins 判断同名覆盖（项目优先于用户、较早扩展优先于较晚扩展、非内置优先于内置、名称区分大小写），可据此定位“为何生效的不是我这份定义”。权限或委派失败的直接诊断本轮未观察，仍缺证据。 [@ref-omp-agents-merge-doc]
