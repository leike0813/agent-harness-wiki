---
schema_version: 3
record_kind: production
edition_id: minimax-code-cli-custom_agents-v2
harness_id: minimax-code
topic: custom_agents
title: "MiniMax Code CLI 的自定义 Agent：定义、角色、调用、覆盖与边界"
sections:
  - section_id: agents-entry-format
    surface_ids: [cli]
    source_refs: [ref-minimax-code-agents-roster, ref-minimax-code-agents-files-layout, ref-minimax-code-agents-assets-dir, ref-minimax-code-agents-canonical-schema, ref-minimax-code-agents-canonical-parse, ref-minimax-code-agents-canonical-limits, ref-minimax-code-agents-worker-md, ref-minimax-code-agents-import-noscan, ref-minimax-code-agents-import]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-minimax-code-agents-roles, ref-minimax-code-agents-primary, ref-minimax-code-agents-targets, ref-minimax-code-agents-resolve]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-minimax-code-agents-task-tool, ref-minimax-code-agents-task-control, ref-minimax-code-agents-mention, ref-minimax-code-agents-projection, ref-minimax-code-agents-delegation-policy, ref-minimax-code-agents-resolve, ref-minimax-code-agents-unknown, ref-minimax-code-agents-delegation-gate, ref-minimax-code-agents-candelegate]
  - section_id: agents-overrides-limits
    surface_ids: [cli]
    source_refs: [ref-minimax-code-agents-capabilities, ref-minimax-code-agents-capability-keys, ref-minimax-code-agents-config, ref-minimax-code-agents-model-precedence, ref-minimax-code-agents-tool-ceilings, ref-minimax-code-agents-task-tool, ref-minimax-code-agents-import-noscan, ref-minimax-code-agents-taskchild-ceiling, ref-minimax-code-agents-admission, ref-minimax-code-agents-task-control, ref-minimax-code-doc-feat-slash]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-minimax-code-agents-task-control, ref-minimax-code-agents-telemetry, ref-minimax-code-agents-model-precedence, ref-minimax-code-agents-candelegate, ref-minimax-code-agents-taskchild-ceiling, ref-minimax-code-agents-unknown, ref-minimax-code-doc-feat-entrypoints]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-minimax-code-agents-roster, ref-minimax-code-agents-files-layout, ref-minimax-code-agents-assets-dir, ref-minimax-code-agents-canonical-schema, ref-minimax-code-agents-canonical-parse, ref-minimax-code-agents-canonical-limits, ref-minimax-code-agents-worker-md, ref-minimax-code-agents-import-noscan, ref-minimax-code-agents-import]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-minimax-code-agents-roster, ref-minimax-code-agents-files-layout, ref-minimax-code-agents-assets-dir, ref-minimax-code-agents-canonical-schema, ref-minimax-code-agents-canonical-parse, ref-minimax-code-agents-canonical-limits, ref-minimax-code-agents-worker-md, ref-minimax-code-agents-import-noscan, ref-minimax-code-agents-import]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-minimax-code-agents-roles, ref-minimax-code-agents-primary, ref-minimax-code-agents-targets, ref-minimax-code-agents-resolve]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-minimax-code-agents-task-tool, ref-minimax-code-agents-task-control, ref-minimax-code-agents-mention, ref-minimax-code-agents-projection, ref-minimax-code-agents-delegation-policy, ref-minimax-code-agents-resolve, ref-minimax-code-agents-unknown, ref-minimax-code-agents-delegation-gate, ref-minimax-code-agents-candelegate]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-minimax-code-agents-capabilities, ref-minimax-code-agents-capability-keys, ref-minimax-code-agents-config, ref-minimax-code-agents-model-precedence, ref-minimax-code-agents-tool-ceilings, ref-minimax-code-agents-task-tool, ref-minimax-code-agents-import-noscan, ref-minimax-code-agents-taskchild-ceiling, ref-minimax-code-agents-admission, ref-minimax-code-agents-task-control, ref-minimax-code-doc-feat-slash]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-minimax-code-agents-capabilities, ref-minimax-code-agents-capability-keys, ref-minimax-code-agents-config, ref-minimax-code-agents-model-precedence, ref-minimax-code-agents-tool-ceilings, ref-minimax-code-agents-task-tool, ref-minimax-code-agents-import-noscan, ref-minimax-code-agents-taskchild-ceiling, ref-minimax-code-agents-admission, ref-minimax-code-agents-task-control, ref-minimax-code-doc-feat-slash]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-minimax-code-agents-task-control, ref-minimax-code-agents-telemetry, ref-minimax-code-agents-model-precedence, ref-minimax-code-agents-candelegate, ref-minimax-code-agents-taskchild-ceiling, ref-minimax-code-agents-unknown, ref-minimax-code-doc-feat-entrypoints]
---

MiniMax Code CLI 的自定义 Agent 是一套**原生文件注册表**加一个模型可调用的委派工具：内置代理随包分发，用户自定义代理是数据目录里带 frontmatter 的 `agent.md`，主代理通过 `task` 工具把工作交给 `explore`/`worker`/`verifier` 等角色 [@ref-minimax-code-agents-roster] [@ref-minimax-code-agents-task-tool]。本章固定来源是 `MiniMax-AI/MiniMax-Code` 仓库 commit `c8a39a5` 上的 `packages/local-runtime-v2/src/service/agent`、`packages/local-runtime-v2/assets/agents`、`packages/shared/src/subagent-roles.ts`、`packages/agent-tools/src/desktop` 与 `packages/local-runtime/src/api`，以及官方 CLI 文档 `features`、`workflows` 的快照。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 定义入口与格式 {#agents-entry-format}

- 内置名册恰好四个：`mavis`、`explore`、`worker`、`verifier`；资产在 `packages/local-runtime-v2/assets/agents/<名称>/` 下，运行时会按数据目录镜像到 `<数据目录>/agents/.builtin/<名称>` [@ref-minimax-code-agents-roster] [@ref-minimax-code-agents-files-layout]。
- 内置资产目录可用环境变量 `MAVIS_BUILTIN_AGENTS_V2_DIR` 覆盖，否则取包内资产路径 [@ref-minimax-code-agents-assets-dir]。
- 用户自定义代理是 `<数据目录>/agents/<名称>/agent.md`；只有「直接子目录且含完整合法规范文件」的目录才进入公开名册，`.builtin` 被跳过，符号链接逃逸被拒绝 [@ref-minimax-code-agents-files-layout]。
- **规范文件是唯一事实源**：文件一旦存在，SQLite 只是索引 [@ref-minimax-code-agents-canonical-schema]。
- 自定义代理的 frontmatter 字段：`name`、`description`、`model`、`effort`、`tools`、`disallowedTools`、`mcpServers`、`skills`，以及 `x-mavis` 子对象（`displayName`、`avatar`、`contextWindow`、`maxOutputTokens`、`defaultWorkspaceDir`、`extensionSkills`）[@ref-minimax-code-agents-canonical-schema]。
- 解析规则：`name` 与 `description` 必填，其余可选；未知字段保留为诊断（`unsupported_agent_field` 等），名称不匹配只记诊断不报错 [@ref-minimax-code-agents-canonical-parse]。
- 稳健性上限：文件 1 MiB、YAML 别名上限 32、深度上限 16、3 次稳定读取 [@ref-minimax-code-agents-canonical-limits]。
- 内置代理的 `agent.md` 只承载**能力覆盖**而不是完整定义，例如 `worker` 声明 `tools: [...]` 与 `features: { delegation: false, webSearch: true }` [@ref-minimax-code-agents-worker-md]。
- **没有项目作用域或插件作用域的代理发现**：项目目录只贡献技能与 `AGENTS.md`；插件只能收到子代理 Hook，不能定义代理 [@ref-minimax-code-agents-import-noscan]。
- 外部导入只支持 `claude-code` 与 `codex` 两种格式，且是无文件系统依赖的「按字节导入」，运行时**从不扫描外部工具目录** [@ref-minimax-code-agents-import] [@ref-minimax-code-agents-import-noscan]。

```markdown
---
name: release-checker
description: Check the release checklist before publishing
model: minimax/MiniMax-M3
tools: [read, grep, glob, bash]
---
Follow the release checklist and report blocking items.
```

示例依据规范文件的必填/可选字段定义；示例值取自内置资产与配置类型的字段名 [@ref-minimax-code-agents-canonical-schema]。

## 角色：主代理、子代理与特殊档案 {#agents-roles}

- 规范子代理角色恰好三个：`explore`、`worker`、`verifier`；主代理（编排者）名 `mavis`，历史别名 `main` 映射到 `mavis` [@ref-minimax-code-agents-roles] [@ref-minimax-code-agents-primary]。
- 三个角色的用途分工写在角色定义里：`explore` 做只读的代码库测绘，`worker` 做有界产出，`verifier` 做独立验证 [@ref-minimax-code-agents-roles]。
- 模型可见的可委派目标为 `mavis`、`explore`、`worker`、`verifier` 四个 [@ref-minimax-code-agents-targets]。
- 保留名（`explore`、`worker`、`verifier`、`main`、`mavis`）不能被自定义代理擅自占用：占用角色名会以 `BUILTIN_AGENT_NAME_CONFLICT` 报错；手工代理与保留名冲突时需用 `agent:` 前缀引用 [@ref-minimax-code-agents-resolve] [@ref-minimax-code-agents-targets]。
- 创建来源分 `manual`、`auto`、`builtin`；目标事实里只有「受信内置」才会带上规范角色 [@ref-minimax-code-agents-resolve]。
- 全部代理定义都是原生实现；插件不提供代理定义，只能通过 `SubagentStart`/`SubagentStop` Hook 观察委派 [@ref-minimax-code-agents-roles]。

## 调用与选择规则 {#agents-invocation}

- 工具面：`task` 工具参数包括 `description`、`prompt`、`agent_name`，以及可选的 `model`、`effort`、`run_in_background`；配套还有继续执行的 `task_append` 与只读的 `task_query`/`task_output`/`task_stop` [@ref-minimax-code-agents-task-tool] [@ref-minimax-code-agents-task-control]。
- 工具描述要求：用户显式指定某个 Agent 时，即使任务简单也必须使用该精确引用 [@ref-minimax-code-agents-task-tool]。
- 用户显式调用走 `@` 提及协议：宿主把已授权的引用投影成给模型的指令，让其调用 Task 工具；投影只在主会话面授权，子代理与 task 子会话一律失败关闭 [@ref-minimax-code-agents-mention] [@ref-minimax-code-agents-projection]。
- 自动委派由提示词策略驱动：默认自己处理请求，只有 `delegation` 特性打开时才注入角色表与「用 explore 做有界测绘」这类指引，并明确「不要只为重复已做的工作而启动子代理」 [@ref-minimax-code-agents-delegation-policy]。
- 选择规则按顺序解析：显式 `agent:` → 主代理（`mavis`/`main`）→ 规范角色 → 精确名 → 大小写不敏感名 → 显示名；歧义时报 `AMBIGUOUS_AGENT_NAME` [@ref-minimax-code-agents-resolve]。
- 未知名会以 `Unknown agent: 名称` 的工具失败返回 [@ref-minimax-code-agents-unknown]。
- 委派可用性门控：`delegation` 特性决定 `task`/`task_append` 是否出现在工具目录；运行时要求 `features.mavis`、`features.delegation` 且工具集允许 `bash` 才认为可委派 [@ref-minimax-code-agents-delegation-gate] [@ref-minimax-code-agents-candelegate]。

## 覆盖、继承与边界 {#agents-overrides-limits}

- 每个 Agent 可声明 `model`、`effort`、`tools`、`disallowedTools`、`mcpServers`、`skills`；内置能力覆盖与运行时上限做**交集**，布尔型特性做与运算 [@ref-minimax-code-agents-capabilities]。
- 全局默认来自 `config.yaml` 的 `agents.default`，可写 `modelConfigId`、`persona.enabled`、`tools`、`builtinTools`、`skills` 与 `features.{mavis,delegation,webSearch}` [@ref-minimax-code-agents-capability-keys] [@ref-minimax-code-agents-config]。
- 单次委派可覆盖模型与推理强度，优先级为「单次指定 > 目标代理自身模型 > 父会话模型」 [@ref-minimax-code-agents-model-precedence]。
- 角色工具天花板：`worker` 失去 `task`/`task_append`；`explore`/`verifier` 再失去写入类工具与全部桌面工具，`explore` 还失去 `task_query`/`task_output`/`task_stop`，两者只保留内置搜索 MCP [@ref-minimax-code-agents-tool-ceilings]。
- 子代理定义在会话创建时冻结：之后编辑 Agent 不会改变正在运行的子会话 [@ref-minimax-code-agents-model-precedence]。
- 权限继承而非按代理配置；委派提示词明确「委派不授予额外权限」 [@ref-minimax-code-agents-task-tool]。
- **没有按代理的沙箱覆盖**：沙箱是运行时级设置；导入守卫还会把 `permission`、`sandbox`、`hook`、`credential`、`secret`、`token` 等安全字段列为不支持 [@ref-minimax-code-agents-import-noscan]。
- 递归/嵌套：task 子会话的工具集中屏蔽 `task`/`task_append`，内置子代理还失去 `mavis` 与 `delegation`，因此最多一层委派 [@ref-minimax-code-agents-taskchild-ceiling]。
- 并发：准入只维护活动任务集合并在关闭时阻塞，没有硬并发上限；终端侧的 `agents=<活动>/<总数>` 只做展示 [@ref-minimax-code-agents-admission]。
- 时长：委派路径没有单子代理的挂钟超时；相关上限只有停止预算（`task_stop` 5 秒、级联 15 秒）与 `task_output` 的 `wait_ms` 上限 30 秒 [@ref-minimax-code-agents-task-control]。
- 上下文：子代理从**全新上下文**开始，不继承父会话历史；任务描述长度规范到 1–50 字符 [@ref-minimax-code-agents-task-tool]。
- 官方文档补充了会话面的相关命令：`/parent` 从子代理会话返回父会话，且会话支持 fork/rewind 等操作 [@ref-minimax-code-doc-feat-slash]。

## 诊断 {#agents-diagnostics}

- 发现：`mavis` 内置工具的 `agent list` 返回带 `requestRef` 的行，模型据此填写 `agent_name` [@ref-minimax-code-agents-task-control]。
- 遥测事件与计数：`subagent.resolve`、`agent_name_compat.resolve`、`agent_name_compat.resource_ambiguity`、`agent_role.observation`、`subagent.tool_policy`、`subagent.finish`，字段有界且尽力上报 [@ref-minimax-code-agents-telemetry]。
- 委派错误码：`UNKNOWN_AGENT_NAME`、`AGENT_NOT_FOUND`、`AMBIGUOUS_AGENT_NAME`、`BUILTIN_AGENT_NAME_CONFLICT`、`CANONICAL_AGENT_NOT_AVAILABLE`；解析来源区分显式、稳定名、规范名与显示名兼容 [@ref-minimax-code-agents-telemetry]。
- 每个会话会归档 `task-agent-definition.json`，用于事后核对子代理当时的定义 [@ref-minimax-code-agents-model-precedence]。
- 权限/委派失败的定位顺序：先看 `canDelegate` 是否为真（特性与工具集门控，否则 `task` 工具根本不存在）→ 再看角色天花板是否静默移除了工具 → 再看 task 子会话是否屏蔽了 `mavis`/`delegation` → 最后看目标名是否报 `Unknown agent` [@ref-minimax-code-agents-candelegate] [@ref-minimax-code-agents-taskchild-ceiling] [@ref-minimax-code-agents-unknown]。
- 官方文档提示委派相关能力属于「保持工作推进」范畴，子代理与会话恢复都在 TUI 内可观察 [@ref-minimax-code-doc-feat-entrypoints]。
