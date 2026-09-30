---
schema_version: 3
record_kind: production
edition_id: prime-agent-cli-custom_agents-v2
harness_id: prime-agent
topic: custom_agents
title: "Prime Agent CLI 的自定义 Agent：RLM 子 Agent、规格与扩展实现"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-prime-agent-rlm-subagents, ref-prime-agent-rlrt-pyapi, ref-prime-agent-ex-subagent-readme, ref-prime-agent-refinement-kinds, ref-prime-agent-rlrt-continual, ref-prime-agent-subagent-discovery, ref-prime-agent-subagent-parse, ref-prime-agent-subagent-frontmatter, ref-prime-agent-subagent-planner]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-prime-agent-rlrt-child, ref-prime-agent-arch-glance, ref-prime-agent-rlrt-components, ref-prime-agent-rlm-subagents, ref-prime-agent-ex-subagent-readme, ref-prime-agent-usage-agents]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-prime-agent-rlm-subagents, ref-prime-agent-lra-messaging, ref-prime-agent-usage-shell, ref-prime-agent-lra-daemon, ref-prime-agent-ex-subagent-tool]
  - section_id: agents-overrides-limits
    surface_ids: [cli]
    source_refs: [ref-prime-agent-rlrt-pyapi, ref-prime-agent-settings-model, ref-prime-agent-agent-depth, ref-prime-agent-agent-gate, ref-prime-agent-rlrt-child, ref-prime-agent-rlrt-registry, ref-prime-agent-lra-autonomous, ref-prime-agent-ex-subagent-caps]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-prime-agent-rlrt-registry, ref-prime-agent-lra-daemon, ref-prime-agent-usage-shell, ref-prime-agent-rlrt-failures, ref-prime-agent-agent-depth]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-prime-agent-rlm-subagents, ref-prime-agent-rlrt-pyapi, ref-prime-agent-ex-subagent-readme, ref-prime-agent-subagent-discovery, ref-prime-agent-rlrt-continual]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-prime-agent-subagent-frontmatter, ref-prime-agent-subagent-parse, ref-prime-agent-subagent-planner, ref-prime-agent-refinement-kinds, ref-prime-agent-rlrt-pyapi, ref-prime-agent-ex-subagent-readme]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-prime-agent-rlrt-child, ref-prime-agent-rlrt-components, ref-prime-agent-arch-glance, ref-prime-agent-usage-agents, ref-prime-agent-ex-subagent-readme]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-prime-agent-rlm-subagents, ref-prime-agent-lra-messaging, ref-prime-agent-ex-subagent-tool, ref-prime-agent-usage-shell]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-prime-agent-rlrt-pyapi, ref-prime-agent-settings-model, ref-prime-agent-rlrt-child]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-prime-agent-agent-depth, ref-prime-agent-agent-gate, ref-prime-agent-rlrt-registry, ref-prime-agent-lra-autonomous, ref-prime-agent-ex-subagent-caps]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-prime-agent-rlrt-registry, ref-prime-agent-lra-daemon, ref-prime-agent-usage-shell, ref-prime-agent-rlrt-failures]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 自定义 Agent 的定义入口与格式 {#agents-entry}

Prime Agent 的原生自定义 Agent **不是文件**：`rlm` 对象预载在内核里，模型用 `rlm.spawn(task, name=...)` 生成子 Agent，`name` 是**必填**参数，另外可选 `model` 与 `thinking`；调用在任务受理后立即返回一个只含 `rlm_child_id`、`name`、`session_dir`、`model` 的句柄，永远不返回子 Agent 的答案。TypeScript 宿主为它创建一个独立上下文与会话目录的正常子 `AgentSession`。[@ref-prime-agent-rlm-subagents][@ref-prime-agent-rlrt-pyapi]

固定来源中**不存在原生的 agent 定义文件加载器**：`packages/coding-agent/src` 里没有读取 agent 定义的模块，文档也没有 `agents/` 目录约定；产品自带的 `agents/` 目录与 markdown 定义只属于仓库内的示例扩展（见下）。[@ref-prime-agent-ex-subagent-readme][@ref-prime-agent-rlm-subagents]

可复用的“Agent 规格”有三种落点：

1. **运行时调用参数**——即 `rlm.spawn` 的 prompt 加 `name`/`model`/`thinking`，不落盘；
2. **持续性 harness 的 `subagent` 条目**——`/refine` 或内核里的 `rlm.harness` 维护的 JSON 状态，`kind` 取值含 `subagent`，条目字段包含 `id`、`kind`、`title`、`content`、`path`、`scope`（`local`/`global`）、`reference`、`arguments` 等；会话内状态在会话产物目录的 `harness/harness_state.json`，显式全局条目在 `~/.prime/agent/harness/`。它是“可复用调用的描述”，不是可执行定义；[@ref-prime-agent-refinement-kinds][@ref-prime-agent-rlrt-continual]
3. **示例扩展的 markdown Agent**——`examples/extensions/subagent/`，从用户目录 `~/.prime/agent/agents` 与最近的 `.prime/agent/agents`（从 cwd 向上查找）发现 `*.md`，frontmatter 解析规则如下。[@ref-prime-agent-subagent-discovery][@ref-prime-agent-subagent-parse]

```markdown
---
name: planner
description: Creates implementation plans from context and requirements
tools: bash
model: claude-sonnet-4-5
---

你是规划专家……（正文作为该 Agent 的 system prompt）
```

`name` 与 `description` 缺失时该文件被跳过；`tools` 是逗号分隔的字符串，`model` 是模型标识；正文整体作为系统提示。`AgentScope` 有 `user`、`project`、`both` 三种取值，按名字存入 map，`both` 时项目条目最后写入。[@ref-prime-agent-subagent-frontmatter][@ref-prime-agent-subagent-parse][@ref-prime-agent-subagent-planner]

## 角色与实现来源 {#agents-roles}

- **主 Agent 就是会话本身**：交互会话是驻留 worker 进程里的根 `AgentSession`；子 Agent（RLM child）与孙 Agent 由同一套 TypeScript 机制创建，`AgentSession.runRlmChild()` 复用父级的 provider 钩子、资源加载器、模型注册表、工具、传输、重试设置与思考配置。[@ref-prime-agent-rlrt-child][@ref-prime-agent-arch-glance]
- Python 侧的 `rlm` 包只是**面向模型的宿主桥**：它不调用 provider、不实现 agent 循环；`rlm.spawn` 以 `host_request` 事件过 stdio 送到 `ReplKernelManager`，由父 `AgentSession` 派发。凭证、provider 执行、transcript 写入、worker 路由都在 TypeScript 侧。[@ref-prime-agent-rlrt-components][@ref-prime-agent-rlm-subagents]
- 主/子角色没有独立的“人设配置”概念，区别只在诞生方式与继承关系；子 Agent 获得递增的 `RLM_DEPTH` 与自己的 `RLM_SESSION_DIR`。[@ref-prime-agent-rlrt-child]
- **扩展提供的实现是另一条线**：示例 `subagent` 扩展用一个普通工具调用真实的 `pi` 子进程，与原生 RLM 子 Agent 无关；文档明确“Prime Agent also provides native recursive delegation through `rlm.spawn()`。This extension is a separate example”。[@ref-prime-agent-ex-subagent-readme][@ref-prime-agent-usage-agents]

## 调用方式 {#agents-invocation}

- 原生：由**模型**在内核里调用 `rlm.spawn`，不能在 spawn 里 await 子 Agent 的答案；子 Agent 用 `await agent_message.send(message, receiver_role="parent")` 回话，回复在后续轮次作为普通 agent 消息到达；父级可用保留的句柄继续对话。[@ref-prime-agent-rlm-subagents][@ref-prime-agent-lra-messaging]
- 用户侧没有“运行某个自定义 Agent”的命令；可用的入口是会话级操作[@ref-prime-agent-usage-shell][@ref-prime-agent-lra-daemon]：

```bash
prime-agent agents                 # 浏览运行中、空闲与已保存的会话
prime-agent attach NAME            # 重连到某个运行中的会话
prime-agent send NAME "message"    # 向某个 agent 直接发消息
prime-agent stop NAME              # 停止一个根 agent
```

- 示例扩展把委派暴露成模型可调用的 `subagent` 工具，参数支持三种模式：单次（`agent` + `task`）、并行（`tasks` 数组）、串行链（`chain`），并有 `agentScope` 与 `confirmProjectAgents`（默认 `true`，运行项目级 agent 前先询问）。[@ref-prime-agent-ex-subagent-tool]

## 模型覆盖与运行边界 {#agents-overrides-limits}

覆盖规则[@ref-prime-agent-rlrt-pyapi][@ref-prime-agent-settings-model]：

- 每次 spawn 可给 `model`（必须是 `rlm.find_models()` 返回的精确 `provider/model`）与 `thinking`；未知选项直接失败而不是被忽略，思考级别必须对解析后的子模型有效，缺省用父级级别并做钳制；
- 设置 `subagentDefaultModel` 只在本次 spawn 未写 `model=` 时生效，显式 `model=` 永远优先；该项未设置时子 Agent 继承父模型；配置的默认模型不可用、未认证或过期时 **spawn 失败**，不会静默换模型；
- 其余继承项：provider 配置、技能、工具、重试策略与资源加载器；子 Agent 的用量与成本异步折算进发起它的父 assistant 轮次，并在父 transcript 写入 `child_usage_attributed` 条目。

边界[@ref-prime-agent-agent-depth][@ref-prime-agent-agent-gate][@ref-prime-agent-rlrt-child]：

- 递归深度默认 2：根会话可以生子 Agent 与孙 Agent，孙 Agent 不能再往下，除非把上限配高。解析优先级为 会话内值 → 继承配置 → 全局设置 `rlmMaxDepth` → 环境变量 `RLM_MAX_DEPTH` → 默认 2；
- 触顶时宿主拒绝并抛错：`RLM recursion depth limit reached (RLM_DEPTH=..., RLM_MAX_DEPTH=...)`；
- 一次内核同一时刻只跑一个普通 Python 单元格，但 RLM 子 Agent 可以并发，因为每个委派走独立的 host request 与子 runtime；每个直接调用只做受理并立即返回句柄；
- 持久化会话中已完成的 daemon 子 Agent 可被保留与再次寻址；父级拆除时活动后代被取消、runtime 关闭；自主模式在子 Agent 运行期间暂缓定时续跑（默认 25 分钟一个保活窗口，`--subagent-keep-alive-ms 0` 关闭）。[@ref-prime-agent-rlrt-registry][@ref-prime-agent-lra-autonomous]
- 示例扩展自身的上限与原生机制无关：`MAX_PARALLEL_TASKS = 8`、`MAX_CONCURRENCY = 4`。[@ref-prime-agent-ex-subagent-caps]

## 诊断 {#agents-diagnostics}

- 父级注册表是权威来源：`await rlm.list_subagents()` 返回稳定的子 id、daemon 活动会话 id、会话 id、名称、目录与 running/completed 状态；注册表在压缩、内核重启与父级恢复后仍在，已完成的 daemon 子 Agent 从父级产物注册表里重建。删除用 `rlm.delete_subagent(selector)`（接受子 id、活动会话 id、会话 id 或唯一名称），它取消或关闭 runtime、写持久 tombstone 并从消息与观察面移除，但不删除磁盘上的 transcript 与产物。[@ref-prime-agent-rlrt-registry]
- 进程层：`prime-agent agents` / `list` 查看会话，`attach` 重连，`status` 看后台服务，`doctor [--fix]` 诊断或修复服务状态；关闭终端只是断开客户端，worker 继续持有队列、调度、内核与子 Agent。[@ref-prime-agent-lra-daemon][@ref-prime-agent-usage-shell]
- 委托失败的已知行为[@ref-prime-agent-rlrt-failures][@ref-prime-agent-agent-depth]：

| 情形 | 行为 |
| :-- | :-- |
| 深度触顶 | 宿主拒绝 spawn 请求，错误在 Python 侧抛出 |
| 选项不受支持 | 宿主拒绝请求 |
| 请求的模型不可用 | spawn 失败，不替换成其它模型 |
| 宿主连接关闭 | 进行中的 host request 以 `RuntimeError` 失败，等待中的单元格解除阻塞 |
| 子 Agent 被取消 | 宿主中止子 Agent 并移除失败/取消的注册表条目 |
| 父级拆除 | 活动后代被取消，runtime 关闭 |
