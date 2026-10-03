---
schema_version: 3
record_kind: production
edition_id: deepseek-harness-custom_agents-v1
harness_id: deepseek-harness
topic: custom_agents
title: "DeepSeek Harness 的自定义 Agent：preset 声明、委派工具与权限继承"
sections:
  - section_id: agents-declaration
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_agents-agents-entry-e01, ref-dsh-custom_agents-agents-entry-e02, ref-dsh-custom_agents-agents-entry-e03, ref-dsh-custom_agents-agents-entry-e04, ref-dsh-custom_agents-agents-entry-e05, ref-dsh-custom_agents-agents-entry-e06]
  - section_id: agents-fields
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_agents-agents-format-e01, ref-dsh-custom_agents-agents-format-e02, ref-dsh-custom_agents-agents-format-e03, ref-dsh-custom_agents-agents-format-e04, ref-dsh-custom_agents-agents-format-e05, ref-dsh-custom_agents-agents-format-e06]
  - section_id: agents-roles
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_agents-agents-roles-e03, ref-dsh-custom_agents-agents-roles-e04, ref-dsh-custom_agents-agents-roles-e05, ref-dsh-custom_agents-agents-roles-e06]
  - section_id: agents-invocation
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_agents-agents-invocation-e01, ref-dsh-custom_agents-agents-invocation-e03, ref-dsh-custom_agents-agents-invocation-e05, ref-dsh-custom_agents-agents-invocation-e06]
  - section_id: agents-overrides
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_agents-agents-overrides-e01, ref-dsh-custom_agents-agents-overrides-e02, ref-dsh-custom_agents-agents-overrides-e03]
  - section_id: agents-limits
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_agents-agents-limits-e01, ref-dsh-custom_agents-agents-limits-e03, ref-dsh-custom_agents-agents-limits-e05, ref-dsh-custom_agents-agents-limits-e06]
  - section_id: agents-observability
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_agents-agents-diagnostics-e01, ref-dsh-custom_agents-agents-diagnostics-e02, ref-dsh-custom_agents-agents-diagnostics-e03, ref-dsh-custom_agents-agents-diagnostics-e04, ref-dsh-custom_agents-agents-diagnostics-e06]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: agents-declaration
        status: answered
        source_refs: [ref-dsh-custom_agents-agents-entry-e01, ref-dsh-custom_agents-agents-entry-e02, ref-dsh-custom_agents-agents-entry-e03, ref-dsh-custom_agents-agents-entry-e04, ref-dsh-custom_agents-agents-entry-e05, ref-dsh-custom_agents-agents-entry-e06]
  - question_id: agents.format
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: agents-fields
        status: answered
        source_refs: [ref-dsh-custom_agents-agents-format-e01, ref-dsh-custom_agents-agents-format-e02, ref-dsh-custom_agents-agents-format-e03, ref-dsh-custom_agents-agents-format-e04, ref-dsh-custom_agents-agents-format-e05, ref-dsh-custom_agents-agents-format-e06]
  - question_id: agents.roles
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: agents-roles
        status: answered
        source_refs: [ref-dsh-custom_agents-agents-roles-e03, ref-dsh-custom_agents-agents-roles-e04, ref-dsh-custom_agents-agents-roles-e05, ref-dsh-custom_agents-agents-roles-e06]
  - question_id: agents.invocation
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-dsh-custom_agents-agents-invocation-e01, ref-dsh-custom_agents-agents-invocation-e03, ref-dsh-custom_agents-agents-invocation-e05, ref-dsh-custom_agents-agents-invocation-e06]
  - question_id: agents.overrides
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-dsh-custom_agents-agents-overrides-e01, ref-dsh-custom_agents-agents-overrides-e02, ref-dsh-custom_agents-agents-overrides-e03]
  - question_id: agents.limits
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: agents-limits
        status: partial
        source_refs: [ref-dsh-custom_agents-agents-limits-e01, ref-dsh-custom_agents-agents-limits-e03, ref-dsh-custom_agents-agents-limits-e05, ref-dsh-custom_agents-agents-limits-e06]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: agents-observability
        status: answered
        source_refs: [ref-dsh-custom_agents-agents-diagnostics-e01, ref-dsh-custom_agents-agents-diagnostics-e02, ref-dsh-custom_agents-agents-diagnostics-e03, ref-dsh-custom_agents-agents-diagnostics-e04, ref-dsh-custom_agents-agents-diagnostics-e06]
---

## 自定义 Agent 定义在哪里 {#agents-declaration}

**没有 agent 定义文件，也没有目录扫描。** 一个自定义 Agent 是某个 bundle 的 patch-list YAML 里声明的 `@deepseek-ai/dsh-agent-preset` Cordis 插件行；`ctx.agentPresets`（`dsh-agent-preset-registry`）注册每一行，并急切地把它激活进一个 registry 拥有的作用域与内存 Loader 树 [@ref-dsh-custom_agents-agents-entry-e02]。

可发现的来源只有四类：出厂 bundle patch（`@deepseek-ai/dsh-web-app` 在它的 `dsh.bundle.patch` 里列出 `./cordis.patch.yml`、`./presets/standard.patch.yml`、`./presets/ptc.patch.yml`、`./presets/minimal.patch.yml`、`./presets/cordis.patch.yml`）[@ref-dsh-custom_agents-agents-entry-e04]、profile 层 `$DSH_HOME/profiles/{profile}/cordis.patch.yml`、可重复的 `dsh --patch {path}` 覆盖层，以及任何用 `plugin_manager` 装进 profile 的 bundle。registry「既不扫描目录也不接受 preset 路径」，所以仓库里放一个 `agents/` 目录**不是**一个来源。已退役的用户目录 `$DSH_HOME/.agent-presets/{id}/{preset.yml,agent.cordis.yml}` 不被任何东西读取。仓库自带的作者 Skill 把这条写得很直白：preset 就是由 bundle patch 承载的普通声明，没有任何东西原地编辑声明，创建或修改一个 preset 的方式是安装一个声明或覆盖它的 bundle [@ref-dsh-custom_agents-agents-entry-e01]。registry 本身不写声明；它的 `read` Remote 把一个声明的子列表渲染回 entry-list YAML 供客户端展示，**没有任何东西把 YAML 收回去** [@ref-dsh-custom_agents-agents-entry-e03]。

界面差异要说准：只有 web 出厂带一份 preset 名册，desktop 因为打包了同一个 web-app bundle 所以也有；`base`、`headless`、`acp-app`、`sdk-app`、`sdk-minimal` 都不声明 `dsh-agent-preset-registry` 依赖也不带 preset patch，headless 的一次性运行器甚至**主动拒绝**接管日志记录了 preset 的 Session，因为恢复它会在 headless 的工具与提示下静默运行 [@ref-dsh-custom_agents-agents-entry-e06]。项目级目录只对 skill 存在（`{projectRoot}/.agents/skills` 等）[@ref-dsh-custom_agents-agents-entry-e05]。

## 声明字段与指令、资源如何解析 {#agents-fields}

第一方字段就是该行的 `config`：`id`（必填，小写字母、数字、连字符）与 `plugins`（必填的 Cordis entry 列表）构成定义本身；`name`、`description`、`order` 只是可选的名册元数据。**没有指令正文字段** [@ref-dsh-custom_agents-agents-format-e01]。Loader 行 id 按约定是 `preset-{id}` [@ref-dsh-custom_agents-agents-format-e02]。

指令与资源来自挂载的子行，每个子行有自己的插件 schema：`@deepseek-ai/dsh-persona` 把 `prefix`/`suffix` 模板渲染进共享的 `deployment:persona-prefix`/`deployment:persona-suffix` 提示槽（也可以用 `complete: true` 只用 prefix 作系统提示）[@ref-dsh-custom_agents-agents-format-e04]，这两个槽由全局配置与作用域贡献共享 [@ref-dsh-custom_agents-agents-format-e05]；`@deepseek-ai/dsh-agent-instructions` 在 `maxBytes` 预算下加载 `AGENTS.md`/`CLAUDE.md` 链 [@ref-dsh-custom_agents-agents-format-e06]；`@deepseek-ai/dsh-plan-mode` 承载自由 `section:` 散文。资源就是 `plugins` 里列出的那些行的能力（工具、`cordis:group` 隔离块、skill 相关行）。子 config 与 `disabled` 里允许 `!!js` 表达式。

**Agent 没有任何文件级 frontmatter 格式**——全仓检索 `frontmatter` 只命中 skill 加载与文档预览。覆盖出厂 preset 的正确方式是按 Loader 行 id 覆盖声明，而不是插入；覆盖替换整块 `config`，所以必须重写 `id`、`plugins` 与出厂文件带的其它每个字段 [@ref-dsh-custom_agents-agents-format-e03]。

## 主代理、子代理与特殊角色 {#agents-roles}

**所有角色走同一套机制**：一个 preset 组合加一个委派工具行。主代理是由所选 preset 组合出来的 Session（preset 行也可以注册作用域化的提示小节，比如 plan mode）。被委派的子代理是由 `ctx.subagents` provider（`spawn`、`fork`、`acp`、`codex`、`claude-code`、`dsh-sdk`）创建的 Agent，只能通过**每个 provider 一个** `@deepseek-ai/dsh-tool-subagent` 实例触达，各有自己面向模型的 `toolName` [@ref-dsh-custom_agents-agents-roles-e03]。实验性的 Team 包增加另外两种角色 `lead` 与 `teammate`，由模型的 `spawn_teammate` 创建；它们不在我读到的任何出厂 preset 里，是选择性加入 [@ref-dsh-custom_agents-agents-roles-e05]。

原生与扩展提供的区别是**来源**而不是运行时标志：随产品出货在 web-app bundle 里的行是内置的，运行时由安装的 bundle patch 插入或覆盖的行是自定义的。扩展提供的后端是 provider 而非 agent 定义——出厂的 `codex`/`claude-code` 行以 `disabled: true` 加 `maxDepth: provider-managed` 存在，去掉 `disabled` 的副本只对由该副本组合出的 Agent 暴露工具 [@ref-dsh-custom_agents-agents-roles-e06]。`subagent-claude-code` 这类兼容层是后端适配，不是 agent 定义格式 [@ref-dsh-custom_agents-agents-roles-e04]。

## 用户与模型怎样调用 {#agents-invocation}

**用户显式调用是名册选择，不是命令**：Settings／新任务的 picker 列出内置与自定义卡片，`agentPresets/list` 提供名册并标记默认，`agentPresets/read` 只读渲染一个声明，`agent-preset-registry` 的 `selectedDefault` 易失设置保存后续 Session 的默认值；选中一个健康默认也会同步空 Session。「Creator 模式」为新任务暂存 `cordis` preset [@ref-dsh-custom_agents-agents-invocation-e01]。**没有 CLI 或 headless flag 选 preset，也没有 `/agent` 之类的命令。**

**模型驱动调用是对某个具名委派工具的直接调用**，没有路由器、匹配器或自动选择——一个工具实例等于一个 provider 加一个不同的 `toolName`，工具描述的措辞由该 provider 是否继承父上下文推导 [@ref-dsh-custom_agents-agents-invocation-e03]。`continuable` 后台模式下调用返回一条 `started subagent {childId}` 文本，子代理随后由 `send_message` 引导；`one-shot` 前台模式返回子代理的最终文本。Team 工具加了一条固定策略：**队友只在用户明确要求组队时才创建** [@ref-dsh-custom_agents-agents-invocation-e06]。子代理的 LLM 路由选择需要已启用的按 Session 策略**加上** provider 宣告 `agentOptions`；ACP、Codex 与 Claude Code 是拒绝而不是忽略 [@ref-dsh-custom_agents-agents-invocation-e05]。

界面差异只在选择面：picker、默认设置与 Creator 只存在于组合出名册的地方（web、desktop）；委派工具本身是组合级的，在任何挂载这些行的 profile 里都出现，包括 sdk、acp 与 headless bundle——那里没有名册，所以 Session 没有可选的 preset。

## 覆盖与继承 {#agents-overrides}

**声明层**：`plugins` entry 列表**就是**覆盖面；按出厂行 id 的 patch 替换整块 `config`，所以覆盖必须重写 `id`、`order` 与完整子列表，而且它**不会**合并上游未来的改动。

**委派层**，每个 `dsh-tool-subagent` 实例固定：`agentOptions`（配置子代理的 `provider`、`model`、适配器自有的 `reasoningEffort`、正整数 `maxTokens`，叠加在 provider 自有的 `agentRouteDefaults` 上）、`persona`、`toolFilter`（全局工具名的允许/拒绝列表，例如出厂 `subagent_fork` 行拒绝四个 `schedule_*` 工具）与 `maxDepth` [@ref-dsh-custom_agents-agents-overrides-e02]。每一项都需要对应的 provider 能力标志，而改动其中一项就需要另一个不同名的工具。没有配置时子代理继承父路由：先 `agentRouteDefaults`，否则父代理最近一次已记录的请求，再否则其创建选项，并保留配置的 `maxTokens` [@ref-dsh-custom_agents-agents-overrides-e01]。

**模型、provider 与权限不能按 agent 定义授予**：`permission/preset`、`sandbox/mode` 与 `approval/policy` 是由权限 preset 写下的 Session 事件；委派在第一次 await 之前捕获父 preset 身份并追加到子代理上，但该身份只在父运行于 `auto` 或 `danger-full-access` 时才被继承，而**批准策略无条件钉为 `never`**——只要组合了批准服务，子代理就拿不到批准通道，与父自身的策略无关。所以子代理不能超过它的父 [@ref-dsh-custom_agents-agents-overrides-e03]。沙箱绑定到 Session 不可变的 cwd 而不是任何 agent 定义，因此它是子代理继承的会话／父属性。

## 并发、嵌套与上下文边界 {#agents-limits}

深度与嵌套共享一个预算。`subagent.maxDepth` 是默认 1 的 Host 易失设置；`ctx.subagents.resolveMaxDepth(configured)` 优先取工具实例的 `maxDepth`，否则读该设置，否则返回 `undefined` 表示 `'provider-managed'`。数值上限要求 provider 具备 `depthLimit` 能力；`0` 禁止委派，而在上限处工具**仍然可见**，因此每次尝试启动都以错误结果拒绝 [@ref-dsh-custom_agents-agents-limits-e01]。深度是持久的：`SessionHeader.delegationDepth` 加可合并扩展的 `AgentOptions.subagentDepth`，取较大者，所以冷恢复无法降低它 [@ref-dsh-custom_agents-agents-limits-e03]。

continuable 子代理的并发是 `maxActiveSubagents`，默认 8，指「共享不间断 continuable 父链的存活子代理数」；满容量时冷恢复以 `subagent/delivery-unavailable` 拒绝 [@ref-dsh-custom_agents-agents-limits-e06]。one-shot 子代理改为受父代理的按步并行工具调用约束，实验性 Team 增加 `maxMembers` 16、`maxTasks` 256、`maxPendingMessagesPerMember` 64、`maxMessageBytes` 65536 与 `disposalTimeoutMs` 5000 [@ref-dsh-custom_agents-agents-limits-e05]。每个子代理都是带自己历史的完整 Session；后台 one-shot 子代理成为父代理拥有的 Task，用 `job_output` 收集、用 `job_kill` 停止。

这一题标为 partial，因为**one-shot 路径的上下文与时长边界没有同等明确的公开默认值**——已确认的是深度持久化、并发上限与 Team 的数值表，未找到 one-shot 子代理的时长或上下文窗口上限的固定值。界面差异无；`'provider-managed'` 的取值按行不同而非按界面：出厂 `codex` 与 `claude-code` 行是 `provider-managed`，`spawn` 与 `fork` 行继承 Host 默认。

## 诊断入口 {#agents-observability}

**定义是否被发现**：`agentPresets/list` 返回名册与 `isDefault`，`agentPresets/read` 把一个声明渲染成只读 entry-list YAML，即使 preset 失败也仍能显示，因为它的诊断指向那份 YAML [@ref-dsh-custom_agents-agents-diagnostics-e02]。

**是否激活**：`plugin_manager` 的 `list_bundles` / `list_plugins` 显示已安装 bundle 与 `preset-{id}` 行及其激活状态；激活失败的声明仍留在名册上并带着诊断，在 bundle 修好并重装之前无法组合 Session，而**已有 Session 保持它们启动时的修订**，所以改动的行为必须在新 Session 里验证 [@ref-dsh-custom_agents-agents-diagnostics-e01]。挂载之前，CLI 的 `--dump-config`、`--dump-default-config`、`--dump-config-schema` 打印组合出的 profile 树，用 `preset-{id}` entry id 查询 `Config.listConfigs` 会返回归属的 `packageDir` [@ref-dsh-custom_agents-agents-diagnostics-e04]。

**组合健康**：`ctx.agentPresets.inspectCompositions()` 列出所有保留的修订，可选地收窄到某个 Agent 的确切修订，报告游离的活跃模块与泄漏的服务名；它查询运行时服务而非模块内挂载表，结果不含 Loader 树或 fiber [@ref-dsh-custom_agents-agents-diagnostics-e03]。

**是否可调用**：模型侧的 `list_agents` 工具读父目录（`children`）或递归（`descendants`，带深度并对未知模式给出诊断），`subagentCatalog` Session 投影暴露同样条目。**失败**：缺失的启动期能力会被响亮拒绝并抛 `SubagentError('UNSUPPORTED_CAPABILITY')`，而不是接受后忽略 [@ref-dsh-custom_agents-agents-diagnostics-e06]；provider 无法强制的数值 `maxDepth` 或子 LLM 选择会在挂载时失败，而不是第一次委派时；发往不支持、未知或不可恢复目标的 `send_message` 会说明消息未送达；`interrupt_agent` 对自己、兄弟、陈旧与非祖先调用者返回错误结果。
