---
schema_version: 3
record_kind: production
edition_id: codebuff-cli-custom-agents-v2
harness_id: codebuff
topic: custom_agents
title: "Codebuff 的自定义 Agent：定义、发现、角色、调用与边界"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-codebuff-agents-doc, ref-codebuff-agent-fields, ref-codebuff-publisher-trust-mcp, ref-codebuff-doc-agent-fields, ref-codebuff-doc-agents-builtin]
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-codebuff-agents-load, ref-codebuff-agents-filter, ref-codebuff-cli-startup, ref-codebuff-agentdir-trust-doc, ref-codebuff-agentdir-trust, ref-codebuff-cli-flags, ref-codebuff-init-write, ref-codebuff-agents-template-readme]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-codebuff-agent-fields, ref-codebuff-agent-tools, ref-codebuff-agent-io, ref-codebuff-agent-completion-check, ref-codebuff-doc-agent-prompts, ref-codebuff-agents-validate-api, ref-codebuff-agents-validate]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-codebuff-agent-modes, ref-codebuff-doc-agents-pipeline, ref-codebuff-doc-agents-builtin, ref-codebuff-doc-agents-coordination, ref-codebuff-agent-lookup, ref-codebuff-cli-agent-merge, ref-codebuff-agent-steps, ref-codebuff-handlesteps-eval, ref-codebuff-publisher-trust, ref-codebuff-publisher-trust-mcp, ref-codebuff-publisher-trust-error-20261003, ref-codebuff-publisher-trust-doc]
  - section_id: agents-invocation-overrides
    surface_ids: [cli]
    source_refs: [ref-codebuff-agent-selection, ref-codebuff-mention-agents, ref-codebuff-agents-template-readme, ref-codebuff-doc-agents-coordination, ref-codebuff-doc-agent-fields, ref-codebuff-agent-fields, ref-codebuff-agent-io, ref-codebuff-cli-agent-merge, ref-codebuff-doc-agent-overrides]
  - section_id: agents-limits-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuff-agent-steps-default, ref-codebuff-run-options, ref-codebuff-agent-io, ref-codebuff-agent-fields, ref-codebuff-agent-validation-cli, ref-codebuff-agent-validation-hook, ref-codebuff-cli-agent-registry, ref-codebuff-agents-load, ref-codebuff-cli-flags, ref-codebuff-cli-logs, ref-codebuff-doc-agent-debug]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-codebuff-agents-load, ref-codebuff-agents-filter, ref-codebuff-cli-startup, ref-codebuff-agentdir-trust-doc, ref-codebuff-agentdir-trust, ref-codebuff-cli-flags, ref-codebuff-init-write]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-codebuff-agent-fields, ref-codebuff-agent-tools, ref-codebuff-agent-io, ref-codebuff-agent-completion-check, ref-codebuff-doc-agent-prompts, ref-codebuff-agents-validate-api, ref-codebuff-agents-validate]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-codebuff-agent-modes, ref-codebuff-doc-agents-pipeline, ref-codebuff-doc-agents-builtin, ref-codebuff-doc-agents-coordination, ref-codebuff-agent-lookup, ref-codebuff-cli-agent-merge, ref-codebuff-agent-steps, ref-codebuff-handlesteps-eval, ref-codebuff-publisher-trust, ref-codebuff-publisher-trust-mcp, ref-codebuff-publisher-trust-error-20261003, ref-codebuff-publisher-trust-doc]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-overrides
        status: answered
        source_refs: [ref-codebuff-agent-selection, ref-codebuff-mention-agents, ref-codebuff-agents-template-readme, ref-codebuff-doc-agents-coordination, ref-codebuff-doc-agent-fields]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-overrides
        status: partial
        source_refs: [ref-codebuff-agent-fields, ref-codebuff-agent-io, ref-codebuff-cli-agent-merge, ref-codebuff-doc-agent-overrides]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits-diagnostics
        status: partial
        source_refs: [ref-codebuff-agent-steps-default, ref-codebuff-run-options, ref-codebuff-agent-io, ref-codebuff-agent-fields]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-limits-diagnostics
        status: partial
        source_refs: [ref-codebuff-agent-validation-cli, ref-codebuff-agent-validation-hook, ref-codebuff-cli-agent-registry, ref-codebuff-agents-load, ref-codebuff-cli-flags, ref-codebuff-cli-logs, ref-codebuff-doc-agent-debug]
---

## 固定来源与适用范围 {#agents-scope}

本章来源是仓库 `CodebuffAI/codebuff` @ `9fbc44c4446470323357edb91dc59fd32bd541e2` 的
`.agents` 加载器、agent 类型定义、注册表查找、发布者信任门与 CLI 信任门
[@ref-codebuff-agents-doc][@ref-codebuff-agent-fields][@ref-codebuff-publisher-trust-mcp]，以及文档站的 Agents 章节
[@ref-codebuff-doc-agent-fields][@ref-codebuff-doc-agents-builtin]。仓库 `docs/agents-and-tools.md` 是
本仓库自己写的 agent/tool 说明，被当作官方源码内文档引用 [@ref-codebuff-agents-doc]。

## 定义入口、发现范围与信任 {#agents-entry}

**agents.entry**：自定义 agent 是一个 TypeScript/JavaScript 模块，默认导出 agent 定义对象
[@ref-codebuff-agents-load]。SDK 的默认搜索目录是 `{cwd}/.agents`、`{cwd}/../.agents`、
`{homedir}/.agents`，**后面的目录覆盖前面的同名 id** [@ref-codebuff-agents-filter]。只有
`.ts`、`.tsx`、`.js`、`.mjs`、`.cjs` 会被导入，`.d.ts` 与 `*.test.*`/`*.spec.*` 被排除；
以 `.` 开头的目录、`node_modules`、`scripts`、`skills`、`skills-*` 不会被递归
[@ref-codebuff-agents-filter]。加载用动态 `import()`（在 CLI 里由 Bun 原生执行
TypeScript），并要求定义里有 `id` 与 `model`，否则整条定义被跳过
[@ref-codebuff-agents-load]。

CLI 启动时先跑信任门，再把通过的目录交给注册表 [@ref-codebuff-cli-startup]。仓库内
`.agents`（含父目录）会因为"导入即执行代码、并会拉起 `mcp.json` 里的 stdio server"而需要
用户确认；`~/.agents` 永不询问；只含 `skills/` markdown 的目录也不需要
[@ref-codebuff-agentdir-trust-doc]。信任记录写在 配置目录下的 `trusted-agent-dirs.json`（0600），
交互式启动时在纯终端打印将要加载的文件与 `mcp.json` 将执行的命令，非交互运行除非
`CODEBUFF_TRUST_AGENT_DIRS=1` 或 `--trust-agents` 否则跳过 [@ref-codebuff-agentdir-trust]。传
`--agent` 时 CLI 整体跳过本地 `.agents` 加载 [@ref-codebuff-cli-flags]。

`/init` 会创建 `.agents/`、`.agents/types/` 并复制 `agent-definition.ts`、`tools.ts`、
`util-types.ts` 三个类型文件，同时写入 `my-custom-agent.ts` 模板
[@ref-codebuff-init-write][@ref-codebuff-agents-template-readme]。

## 定义格式与字段 {#agents-format}

**agents.format**：类型定义给出的字段分三组 [@ref-codebuff-agent-fields][@ref-codebuff-agent-tools]：

| 组 | 字段 | 默认 / 必填 |
| --- | --- | --- |
| 核心 | `id`、`displayName`、`model` | 必填；`model` 是 OpenRouter 风格模型串 |
| 核心 | `version`、`publisher` | 可选；发布到 store 时才需要 |
| 推理 | `reasoningOptions`（`enabled`、`exclude`，以及 `max_tokens` 或 `effort` 二选一） | 可选 |
| 路由 | `providerOptions`（OpenRouter 供应商排序、回退、量化、最大价等） | 可选 |
| 工具 | `toolNames` | 可选，文档说默认只有 `end_turn` |
| 工具 | `spawnableAgents` | 可选，默认空 |
| MCP | `mcpServers` | 可选，写法与 `mcp.json` 内一致（server 名不能含 `/`） |
| 输入输出 | `inputSchema`、`outputMode`、`outputSchema` | `outputMode` 默认 `last_message` |
| 上下文 | `includeMessageHistory`（默认 false）、`inheritParentSystemPrompt`、`windowedFileReads`、`compactContext` | 可选 |
| 收尾 | `completionCheck` | 可选；为真时在工具工作之后、沿用既有步数预算再给一次最终验证机会 |
| 提示词 | `systemPrompt`、`instructionsPrompt`、`stepPrompt` | 可选，可写字符串或指向文件的 `path` |
| 程序化 | `handleSteps` 生成器 | 可选 |

`outputMode` 三档语义（`last_message`、`all_messages`、`structured_output`）在类型注释里写明
[@ref-codebuff-agent-io]。`completionCheck` 是本提交新增的布尔开关，注释写明它在工具工作之后、
不额外占用步数预算地追加一次最终验证机会 [@ref-codebuff-agent-completion-check]。提示词字段支持
"内联字符串"或"外部文件引用"两种写法，文档站与类型定义
一致 [@ref-codebuff-doc-agent-prompts]。

校验分两层。SDK 导出的 `validateAgents` 先用 Zod 做本地校验，可按需再向 web API 校验
`spawnableAgents` 是否存在 [@ref-codebuff-agents-validate-api][@ref-codebuff-agents-validate]。加载器的
`validate: true` 会删掉校验失败的定义并返回错误列表 [@ref-codebuff-agents-validate]。

## 角色、注册表与程序化控制 {#agents-roles}

**agents.roles**：主 agent 与子 agent 用同一套定义机制，区别只在谁运行它：模式决定根 agent
（`base3`、`base3-lite`、`base2-max`、`base2-plan` 等），子 agent 由 `spawn_agents` 按
`spawnableAgents` 白名单拉起 [@ref-codebuff-agent-modes][@ref-codebuff-doc-agents-pipeline]。文档站列出的
内置角色（base/editor/reviewer/thinker/researcher/file-picker/basher/code-searcher）都是同一
机制下的定义 [@ref-codebuff-doc-agents-builtin]，`spawnerPrompt` 决定其它 agent 何时该拉起它
[@ref-codebuff-doc-agents-coordination]。

查找顺序由注册表函数固定：先查本地模板（动态 agent 与静态模板），再查数据库缓存，最后请求
数据库；无法解析为 `publisher/agent` 的裸 id 会回退成"`codebuff/` 加该 id"再查
[@ref-codebuff-agent-lookup]。CLI 侧把本地定义叠在随二进制打包的 bundled agent 之上，同名 id 时本地
覆盖内置；同时把所有本地 agent 的 id 自动追加到 id 以 `base` 开头的 agent 的
`spawnableAgents` 里，用户不必改基础 agent 就能自己的子 agent 被拉起
[@ref-codebuff-cli-agent-merge]。

程序化角色用 `handleSteps` 生成器：可以 yield 工具调用、`'STEP'`、`'STEP_ALL'` 或 `return`，
并为 `GenerateN` 等高级控制留出入口 [@ref-codebuff-agent-steps]。注意来源里明确写了它的执行方式：
加载器把本地定义里的函数转成源码字符串，运行时再用 `eval` 在**当前进程**里变成真函数，没有
沙箱隔离 [@ref-codebuff-handlesteps-eval]。因此远程注册表模板受发布者信任门限制：只有 `codebuff`、
`CODEBUFF_TRUSTED_AGENT_PUBLISHERS` 列出的发布者、或运行时显式传入的 `trustedAgentPublishers`
才允许加载，否则抛 `UntrustedAgentPublisherError`；本地 `.agents` 文件与 SDK 的 `agentDefinitions`
不受此门限制 [@ref-codebuff-publisher-trust][@ref-codebuff-publisher-trust-doc]。

这道门在本提交判的是"模板里有没有可执行内容"，函数名 `hasExecutableContent`：字符串 `handleSteps`
算一份，模板里列了任何 `mcpServers` 也算一份——运行时会在第一个 agent 步骤就去连这些 server，
stdio server 会在本机把 `command` 起成进程，http/sse 则把 `$VAR` 请求头用本进程的环境变量填好后发往
模板给的 URL [@ref-codebuff-publisher-trust-mcp]。也就是说，只带 MCP server、不带 `handleSteps` 的
远程模板同样会被拦下，错误文案相应写成 "contains executable handleSteps or MCP servers from an
untrusted publisher"，并给出设置 `CODEBUFF_TRUSTED_AGENT_PUBLISHERS` 或传 `trustedAgentPublishers`
的做法 [@ref-codebuff-publisher-trust-error-20261003]。纯数据模板（只有提示词、工具列表、可 spawn 的
子 agent）不受影响，仍照旧加载。

## 调用与逐 agent 覆盖 {#agents-invocation-overrides}

**agents.invocation**：用户发消息时 CLI 解析当前选中的 agent：若选中项是本地定义就按 id 取该
定义，否则退回模式默认根 agent [@ref-codebuff-agent-selection]。输入框的 `@` 触发一个 agent 补全
菜单，候选来自本地注册表（bundled + 用户 agent），输入前缀按 id/名称匹配
[@ref-codebuff-mention-agents]。模板说明的用法是"不带 `--agent` 运行 codebuff，让本地 `.agents`
加载，然后在提示里调用自己的 agent"，发布用 `codebuff publish <名字>`
[@ref-codebuff-agents-template-readme]。父 agent 通过 `spawn_agents` 工具拉起
`spawnableAgents` 里的子 agent [@ref-codebuff-doc-agents-coordination]。文档站还提到在提示里用
`@` 加 agent 的 displayName 引用自定义 agent [@ref-codebuff-doc-agent-fields]。

**agents.overrides**：每个 agent 自己在定义里指定 `model`、`toolNames`、`spawnableAgents`、
`mcpServers`、`reasoningOptions`、`providerOptions` 与 `compactContext` 等，没有"从父级继承再
覆盖"的通用合并规则；与父级相关的两项是 `includeMessageHistory`（是否把父对话加入上下文，
默认 false）和 `inheritParentSystemPrompt`（是否沿用父系统提示，默认 false，用于保持提示缓存
前缀）[@ref-codebuff-agent-fields][@ref-codebuff-agent-io]。本地 agent 与 bundled agent 同名时按
id 整体替换，不做字段级合并 [@ref-codebuff-cli-agent-merge]。缺口：文档站示意的
"`override: true` + `systemPrompt: { type: append|prepend|replace, content }`"写法在本提交的
本地 `AgentDefinition` 类型里找不到对应字段，固定来源只能确认它是发布/注册表侧的覆盖语法
[@ref-codebuff-doc-agent-overrides][@ref-codebuff-agent-fields]。这一条按 partial 阅读。

## 边界与诊断 {#agents-limits-diagnostics}

**agents.limits**：步数上限由 `maxAgentSteps` 控制，SDK 默认值取自常量 `200`（文档站给 SDK
使用者的建议值是"大约 20"），它写入 `stepsRemaining` 并约束主 agent 的连续响应次数
[@ref-codebuff-agent-steps-default][@ref-codebuff-run-options]。`includeMessageHistory: false` 的
agent 不携带父对话，是控制上下文体积的手段之一；`compactContext` 可在超限时让模型写交接摘要
[@ref-codebuff-agent-io]。缺口：固定来源没有给出并发子 agent 数量、嵌套深度或单 agent 时长的
独立上限；`spawnableAgents` 白名单只是可见范围而不是并发配额。这一条按 partial 阅读
[@ref-codebuff-agent-fields]。

**agents.diagnostics**：CLI 在**每次发送消息前**调用 SDK 校验本地定义（`validateAgents`），失败的
错误列表会阻止发送；免费/托管运行会同时做远程校验，BYOK 运行只做本地校验、不把定义发给
服务端 [@ref-codebuff-agent-validation-cli][@ref-codebuff-agent-validation-hook]。加载期的失败是另一回事：
CLI 的注册表初始化以 `verbose: false` 调用 SDK，缺 `id`/`model` 或导入报错的定义被静默跳过
[@ref-codebuff-cli-agent-registry][@ref-codebuff-agents-load]。其它入口：`--agent` 可指定单个 agent 调试
并跳过本地覆盖 [@ref-codebuff-cli-flags]；每会话日志写在项目 `debug/` 与每会话目录下，可用
`--clear-logs` 清理 [@ref-codebuff-cli-logs]；文档站的排障清单要求重启 Codebuff、在 `.agents/`
里跑 `bun run typecheck`、确认默认导出与相对路径 [@ref-codebuff-doc-agent-debug]。缺口：启动阶段的
agent 加载错误没有面向用户的清单输出。按 partial 阅读。
