---
schema_version: 3
record_kind: production
edition_id: omp-custom_agents-v3
harness_id: omp
topic: custom_agents
title: OMP 自定义 Agent 定义与选择
sections:
  - section_id: agents-discovery
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-discovery-doc-69e8
      - ref-omp-agents-cross-harness-skip-doc-69e8
      - ref-omp-agents-plugin-gating-doc-69e8
  - section_id: agents-format
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-shape-doc-69e8
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-model-doc-69e8
  - section_id: agents-lookup
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-lookup-doc-69e8
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-limits-doc-69e8
  - section_id: agents-merge
    surface_ids: [cli]
    source_refs:
      - ref-omp-agents-merge-doc-69e8
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-discovery
        status: answered
        source_refs:
          - ref-omp-agents-discovery-doc-69e8
          - ref-omp-agents-cross-harness-skip-doc-69e8
          - ref-omp-agents-plugin-gating-doc-69e8
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs:
          - ref-omp-agents-shape-doc-69e8
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs:
          - ref-omp-agents-model-doc-69e8
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-lookup
        status: answered
        source_refs:
          - ref-omp-agents-lookup-doc-69e8
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs:
          - ref-omp-agents-shape-doc-69e8
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs:
          - ref-omp-agents-limits-doc-69e8
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-merge
        status: partial
        source_refs:
          - ref-omp-agents-merge-doc-69e8
---
本章材料来自源码修订 69e8c9e 的官方文档 `docs/task-agent-discovery.md`。来源顺序、跨 harness 跳过规则、Claude 市场插件的 provider 门控、定义形态、模型路由、查找与运行边界都取自该修订的文档正文；上一版引用的包内 `src/discovery/helpers.ts` 解析代码不在本轮取证范围内。相对上一版的变化是实质性的：Claude 市场插件的用户作用域 agent 根新增了额外门控，扩展包的 `extensions:` 数组由拼接改为整数组替换，模型选择新增调用级 selector 与前置校验。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有运行产品来观察权限或委派失败。

## Agent 定义来源 {#agents-discovery}

发现输入按固定顺序取五类：工作目录就近命中的第一个 `.omp/agents`、用户作用域第一个 `.omp` 命中的 `agents`、每个已启用的 OMP 扩展包下的 `agents/`、Claude 市场插件根下的 `agents/`，最后是内置 agent。 [@ref-omp-agents-discovery-doc-69e8]

扩展包表面有一个容易误判的点：项目与用户的 `extensions:` 数组**不**互相拼接，设置使用整数组替换语义，因此高优先级层的一个条目会连同低优先层的其它扩展包一起丢出这个表面；会话 overlay 与运行时覆盖仍然保留。顺序是显式 CLI `--extension` / SDK 目录根、会话生效的 `extensions:` 数组、已安装 npm/link 插件。在 `explicit-only` 模式（`--no-extensions` 或 SDK 的 `disableExtensionDiscovery`）下只有显式根贡献该表面。 [@ref-omp-agents-discovery-doc-69e8]

跨 harness 的裸目录在这一版仍然被有意跳过：`.claude/agents`、`.codex/agents`、`.gemini/agents` 这类直接跨 harness 根不参与发现，原因是它们的 frontmatter schema 不是 OMP 的 task-agent 契约，原生配置目录列表由 `TASK_AGENT_CONFIG_SOURCE = ".omp"` 过滤。上一版已记录的这一点在本版未变。 [@ref-omp-agents-cross-harness-skip-doc-69e8]

需要与上面区分的是 Claude 市场插件根：它不是裸目录，而是插件根，所以走的是另一条带门控的路径。上一版已把市场插件的 `agents/` 列为发现来源，本版新增的是这条路径上的门控条件——需要 `isProviderEnabled("claude-plugins")`，项目作用域插件排在用户作用域之前；用户作用域的根还要额外满足 `isUserSourceEnabled`（通常经 `enabledProviders` 打开 `claude-plugins`；设了 `CLAUDE_CONFIG_DIR` 时 `claude` 也隐式启用）。`origin: "omp"` 的自有安装与 `--plugin-dir` 根不属于外来 `~/.claude/plugins` 树，因此豁免这条用户级门控。 [@ref-omp-agents-plugin-gating-doc-69e8]

另一条本版新增的规则：Claude 方言的插件 agent 会丢弃 frontmatter 里的 `model`，避免 Claude 别名被当成 OMP selector 误读；OMP 原生包与 Agent Plugins 标准包保留自己的模型 selector。 [@ref-omp-agents-discovery-doc-69e8]

## 定义文件格式与字段 {#agents-format}

task agent 归一化成 `AgentDefinition`（`src/task/types.ts`）：必填 `name`、`description` 与 `systemPrompt`，可选 `tools`、`spawns`、带优先级的 `model` 列表、`thinkingLevel`、`output`、`blocking`、`autoloadSkills`、`readSummarize`、`prewalk`、`advisor`，以及 `source`（`bundled` / `user` / `project`，扩展 agent 按其扩展根的层级标注）与可选 `filePath`。 [@ref-omp-agents-shape-doc-69e8]

解析规则本版写得更细：`name` 或 `description` 缺失/非字符串即视为无效；`main` 与 `sub` 是保留名（去除空白并转小写后检查），用了就无效；`tools` 接受 CSV 或数组并归一化旧别名、自动补 `yield`，因此显式写 `tools: []` 得到的是只有 `yield` 而不是默认工具集；`spawns` 缺失但 `tools` 含 `task` 时向后兼容地补成 `*`；`output` 作为不透明 schema 数据透传。 [@ref-omp-agents-shape-doc-69e8]

项目作用域的一个完整定义文件 `.omp/agents/reviewer.md`：

```md
---
name: reviewer
description: Review a change for correctness.
model: "@review"
---

Review the assigned change and report concrete findings.
```

`thinking-level` / `thinking` 选该 agent 的思考档位；当 `task.enableEffort`（默认 false）暴露任务级 `effort`（`lo`/`med`/`hi`）时，它在启动时优先，OMP 把它映射到所选模型支持的最低/中间/最高档并夹到 `task.maxEffort`（默认 `max`），这个上限在重试回退换模型时继续沿用；所选模型在上限之下没有任何可控档位则派发失败。`prewalk: true` 让子代理在首个 edit/write 时交接给默认的 `smol` 角色目标，`task.agentPrewalk` 设置记录可覆盖 frontmatter；`advisor` 同理，由 `task.agentAdvisor` 覆盖，子代理默认无 advisor。 [@ref-omp-agents-shape-doc-69e8]

覆盖仍发生在定义选择阶段：frontmatter 字段随定义整体生效，同名定义按第一命中取一份，不做字段级与父会话合并。

## 模型路由与角色别名 {#agents-roles}

任务派发的模型优先级本版改为四级：调用自身的 `model` selector（任务项/扁平调用，或 eval 的 `agent(model=…)`）、`task.agentModelOverrides[agentName]`、agent frontmatter 的优先级 `model` 列表、父会话活动模型及其配置/默认回退。前三个来源里的角色别名经 `modelRoles` 展开，例外是 `@default`（等价 `*`）——它指第四级本身，解析成父会话当前模型而不是 `modelRoles.default`。 [@ref-omp-agents-model-doc-69e8]

调用级 selector 在派发前校验：`default` / `inherit` 这两个歧义字面量被拒绝，要求显式写 `@default`；展开为空或匹配不到可用模型的 selector 会让派发失败并指名 selector，不会静默落到更低优先级的来源。解析完成后 `before_subagent_spawn` 扩展钩子对该次实际派发运行一次，它可以阻断派发或替换已解析的模型 pattern。 [@ref-omp-agents-model-doc-69e8]

用户级 `~/.omp/agent/config.yml` 里的一段映射：

```yaml
modelRoles:
  review: openai/gpt-5.4:high
```

`@review` 经 `modelRoles.review` 解析成 `openai/gpt-5.4` 并带 `high` 思考等级；改这个映射会影响之后的任务解析。与模型选择相互独立的是服务档与压缩阈值：`task.agentServiceTierOverrides[agentName]` 覆盖 `tier.subagent`，`task.agentCompactionThresholdOverrides[agentName]`（如 `90000` 或 `"80%"`）只对该 agent 替换 `compaction.threshold*`，没有条目的 agent（包括它派生的）沿用主会话阈值。

## 查找与委派 {#agents-lookup}

查找是精确名线性搜索：`getAgent(agents, name)` 等价于对名字做严格相等的 find。无限制会话在省略 `agent` 字段时默认派发 `task`，受限父会话则默认取 `spawns` 列表的第一项。 [@ref-omp-agents-lookup-doc-69e8]

`resolveEffectiveSubagentPolicy()` 由 task 与 eval 两条子代理启动路径共用。它在分配产物之前按序完成：原子地重新加载该会话持久化的全局、项目与显式 overlay 设置并保留运行时覆盖；从父 spawn 策略解析缺失或显式的 agent 名；施加深度、阻止自递归与父 spawn 策略的守卫；用会话 cwd 与生效的扩展根配置重新发现 agent、追加用户标记的会话 agent 并做精确查找；检查 `task.disabledAgents`；解析 plan 模式限制、输出 schema、模型策略与隔离策略。名字缺失时 preflight 失败并报 `Unknown agent "...". Available: ...`，不启动子进程。 [@ref-omp-agents-lookup-doc-69e8]

工具描述与执行时的集合可能不同：`TaskTool.create()` 按解析出的工作目录加完整生效的扩展根配置记忆化发现结果，而执行时会重新发现并合并会话内动态加入的 agent，因此会话中途改动的 agent 或扩展文件在派发时生效。 [@ref-omp-agents-lookup-doc-69e8]

## 运行边界 {#agents-limits}

`task.maxRecursionDepth` 默认 2，负值关闭上限；当前任务深度达到上限时拒绝派发。子代理达到上限时，`runSubprocess` 还会把它工具表里的 `task` 移除并把 spawn 策略置空。 [@ref-omp-agents-limits-doc-69e8]

工具表本身还有几条自动补齐规则：声明了 `spawns` 且深度允许时自动补 `task`；旧的 `exec` 条目在有 eval 后端时展开为 `bash` 加 `eval`；含 `task` 或 `bash` 的列表会补 `wait`，除非父会话要求精确受限工具表，且没有异步、IRC 或 service 唤醒来源时工具构造仍然省略 `wait`。对外的 peer 消息要求子代理工具表里有 `write` 且 IRC 已启用，入站 steer 不要求。 [@ref-omp-agents-limits-doc-69e8]

并发与上下文边界本章未逐项取证。

## 同名合并与诊断 {#agents-merge}

发现用 first-wins 去重，键是精确的 `agent.name`：一个 `Set` 记录已见名字，加载的 agent 按目录顺序展平后只保留未见过的名字，内置 agent 再按同一个集合过滤。由此可依赖的规则：项目 `.omp` 覆盖用户 `.omp`；较早的扩展根覆盖较晚的扩展根与 Claude 市场插件、内置 agent；非内置 agent 覆盖同名内置 agent；名字区分大小写，`Task` 与 `task` 是两个不同的名字。 [@ref-omp-agents-merge-doc-69e8]

这些规则可以用来解释“为什么生效的不是我这份定义”。权限或委派失败的直接诊断本轮没有运行观察，仍属证据缺口。 [@ref-omp-agents-merge-doc-69e8]
