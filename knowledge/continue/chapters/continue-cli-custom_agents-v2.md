---
schema_version: 3
record_kind: production
edition_id: continue-cli-custom_agents-v2
harness_id: continue
topic: custom_agents
title: "Continue CLI 的自定义 Agent：agent 文件、subagent 与运行边界"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-continue-src-agentfile-get, ref-continue-src-agentfile-schema, ref-continue-src-common-options, ref-continue-src-subagentmodels, ref-continue-src-agentfile-init, ref-continue-src-slash-handlers, ref-continue-src-hub-throws, ref-continue-doc-cli-quickstart-flags]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-continue-src-agentfile-schema, ref-continue-src-agentfile-parse, ref-continue-src-configservice-mcp, ref-continue-src-agentfile-init, ref-continue-src-hub-throws, ref-continue-src-agentfile-rules, ref-continue-src-configservice-blocks, ref-continue-src-agentfile-tools, ref-continue-src-chat-agentprompt]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-continue-src-subagentmodels, ref-continue-src-subagent-exec, ref-continue-src-agentfile-init, ref-continue-src-configservice-blocks, ref-continue-src-systemmessage-rules, ref-continue-src-agent-toolgate, ref-continue-src-merge, ref-continue-src-dupedetect]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-continue-src-subagent-meta, ref-continue-src-subagent-desc, ref-continue-src-tools-assemble, ref-continue-src-toolsconfig, ref-continue-src-index-program, ref-continue-src-chat-agentprompt, ref-continue-src-chat-tui-agentprompt, ref-continue-src-subagent-exec, ref-continue-src-subagent-restore]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-continue-src-agentfile-get, ref-continue-src-agentfile-init, ref-continue-src-subagent-desc, ref-continue-src-subagentmodels, ref-continue-src-subagent-tool-call, ref-continue-src-subagent-exec, ref-continue-src-logger, ref-continue-src-common-options, ref-continue-src-perms-precedence, ref-continue-src-agent-toolgate]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: partial
        source_refs: [ref-continue-src-agentfile-get, ref-continue-src-agentfile-schema, ref-continue-src-common-options, ref-continue-src-subagentmodels, ref-continue-src-agentfile-init, ref-continue-src-slash-handlers, ref-continue-src-hub-throws, ref-continue-doc-cli-quickstart-flags]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-continue-src-agentfile-schema, ref-continue-src-agentfile-parse, ref-continue-src-configservice-mcp, ref-continue-src-agentfile-init, ref-continue-src-hub-throws, ref-continue-src-agentfile-rules, ref-continue-src-configservice-blocks, ref-continue-src-agentfile-tools, ref-continue-src-chat-agentprompt]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-continue-src-subagentmodels, ref-continue-src-subagent-exec, ref-continue-src-agentfile-init, ref-continue-src-configservice-blocks, ref-continue-src-systemmessage-rules, ref-continue-src-agent-toolgate, ref-continue-src-merge, ref-continue-src-dupedetect]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-continue-src-subagent-meta, ref-continue-src-subagent-desc, ref-continue-src-tools-assemble, ref-continue-src-toolsconfig, ref-continue-src-index-program, ref-continue-src-chat-agentprompt, ref-continue-src-chat-tui-agentprompt, ref-continue-src-subagent-exec, ref-continue-src-subagent-restore]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-continue-src-subagentmodels, ref-continue-src-subagent-exec, ref-continue-src-agentfile-init, ref-continue-src-configservice-blocks, ref-continue-src-systemmessage-rules, ref-continue-src-agent-toolgate, ref-continue-src-merge, ref-continue-src-dupedetect]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-continue-src-subagent-meta, ref-continue-src-subagent-desc, ref-continue-src-tools-assemble, ref-continue-src-toolsconfig, ref-continue-src-index-program, ref-continue-src-chat-agentprompt, ref-continue-src-chat-tui-agentprompt, ref-continue-src-subagent-exec, ref-continue-src-subagent-restore]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-continue-src-agentfile-get, ref-continue-src-agentfile-init, ref-continue-src-subagent-desc, ref-continue-src-subagentmodels, ref-continue-src-subagent-tool-call, ref-continue-src-subagent-exec, ref-continue-src-logger, ref-continue-src-common-options, ref-continue-src-perms-precedence, ref-continue-src-agent-toolgate]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 两条互不相干的「自定义 Agent」入口 {#agents-entry}

Continue CLI 里能叫「自定义 agent」的东西有两个，机制完全不同：

1. **agent 文件（`--agent`）**：一个 Markdown 文件，frontmatter 声明 `name`/`model`/`tools`/`rules`，正文是一段 prompt。CLI 通过 `--agent {path-or-slug}` 载入它，把正文拼进首次用户输入、把 `rules`/`tools`/`model` 展开成附加配置注入本次会话。仓库自己的 `.continue/agents/` 目录（`breaking-change-detector.md`、`dependency-security-review.md`、`error-message-review.md` 等）就是这种文件。[@ref-continue-src-agentfile-get][@ref-continue-src-agentfile-schema][@ref-continue-src-common-options]
2. **subagent（子代理）**：config.yaml 里 `roles` 含 `subagent` 的模型，主 agent 通过 `Subagent` 工具在子会话里调用它。它不是文件，是模型配置。[@ref-continue-src-subagentmodels]

**agent 文件不会被自动发现**。`AgentFileService.doInitialize(agentFilePath, ...)` 只在 `--agent` 给出值时才去加载，未给出时状态保持为空；CLI 不扫描 `.continue/agents/`，也没有 `/agents` 之类的斜杠命令。[@ref-continue-src-agentfile-init][@ref-continue-src-slash-handlers]

**slug 与路径的判定**（缺一不可的边界，这里有一条重要缺口）：

- `getAgentFile` 先把参数按 `/` 切开，只有当**恰好两段且两段都不含 `.`** 时才当成 hub slug（形如 `owner/package`），走 hub 载入；否则按文件路径处理。[@ref-continue-src-agentfile-get]
- 本提交里 hub 载入路径已经废弃：`loadPackageFromHub` 直接抛出 `Hub package loading has been removed.`。只有参数以 `.md` / `.markdown` 结尾时才会吞掉这个错误回退到本地文件读取；否则原样抛出。[@ref-continue-src-hub-throws][@ref-continue-src-agentfile-get]
- 本地读取时 `file:/` 前缀走 `fileURLToPath`，其余按 `path.resolve` 解析；文件必须是 Markdown，解析函数是 `parseAgentFile`。[@ref-continue-src-agentfile-get]

因此在本提交的固定源码上：`cn --agent ./agents/reviewer.md` 可用，`cn --agent my-org/reviewer`（hub slug）会直接报错——尽管 `--help` 与文档仍把它描述成「从 hub 载入 agent 文件」。这是文档与源码之间的分歧，读者应以实际行为为准。[@ref-continue-src-common-options][@ref-continue-doc-cli-quickstart-flags][@ref-continue-src-hub-throws]

## agent 文件的格式与字段 {#agents-format}

agent 文件是「YAML frontmatter + 正文」的 Markdown，frontmatter 用 zod 校验：`name` 必填且非空，`description`、`model`、`tools`、`rules` 都是可选字符串；正文整体作为 `prompt`。[@ref-continue-src-agentfile-schema]

| 字段 | 必填 | 语义 | 解析与生效 |
| :-- | :-- | :-- | :-- |
| `name` | 是 | agent 显示名 | 缺失或空串直接抛错「Agent file must contain YAML frontmatter with a 'name' field」 [@ref-continue-src-agentfile-parse][@ref-continue-src-agentfile-schema] |
| `description` | 否 | 用途说明 | 透传给展开出的 prompt 块 [@ref-continue-src-configservice-mcp] |
| `model` | 否 | 一个模型包标识符 | 初始化时调 `loadModelFromHub` 取模型；本提交该函数恒抛 `Hub package loading has been removed.`，所以**带 `model` 的 agent 文件目前会初始化失败** [@ref-continue-src-agentfile-init][@ref-continue-src-hub-throws] |
| `rules` | 否 | 逗号分隔的规则标识符串 | `parseAgentFileRules` 按逗号切分并去空白，每项作为包标识符注入 [@ref-continue-src-agentfile-rules][@ref-continue-src-configservice-blocks] |
| `tools` | 否 | 逗号分隔的工具引用串 | `parseAgentFileTools` 解析成「MCP server 列表 + 具体工具 + 是否 `built_in`」，见下 [@ref-continue-src-agentfile-tools] |
| 正文 | 是（可为空串） | agent 的 prompt | `prependPrompt(agentFile.prompt, prompt)` 把它放在首次用户输入之前，中间空一行；同时也会作为名为 `Agent prompt ({name})` 的 prompt 块进入配置 [@ref-continue-src-chat-agentprompt][@ref-continue-src-configservice-mcp] |

**`tools` 串的语法**（`parseAgentFileTools` 逐项判定）：[@ref-continue-src-agentfile-tools]

| 写法 | 含义 |
| :-- | :-- |
| `built_in` | 关键字，放行全部内置工具 |
| `Bash` / `Write` | 单个内置工具名 |
| `owner/package` | 该 hub MCP server 的全部工具 |
| `owner/package:tool_name` | 只放行该 server 的指定工具 |
| `https://mcp.example.com` | URL 形式的 MCP server，全部工具 |
| `https://mcp.example.com:tool_name` | URL server 的指定工具（末段是纯数字端口时会整体当作 server） |

含空格的冒号引用会被主动拒绝（抛 `Invalid MCP tool reference`），避免静默误配。[@ref-continue-src-agentfile-tools]

**最小示例**（结构来自 `agentFileFrontmatterSchema` 与仓库里真实的 `.continue/agents/*.md`）：

```md
---
name: Test Coverage
description: Ensure new functionality includes corresponding tests
---

Review this pull request to determine if new functionality has adequate test coverage.
```

加上 `tools: built_in, owner/some-mcp` 就会放行全部内置工具加该 MCP server 的所有工具。[@ref-continue-src-agentfile-schema][@ref-continue-src-agentfile-tools]

## 角色划分与覆盖方式 {#agents-roles}

**主 agent 与 subagent 用不同机制**：主 agent 是会话里被选中的 chat 模型，subagent 是配置里带 `subagent` 角色的模型。判定条件在 `ModelService.getSubagentModels` 里是三连过滤：模型必须非空、必须有 `name`、`roles` 必须含 `subagent`、且必须有 `chatOptions.baseSystemMessage`——最后一条意味着**没有系统提示词的 subagent 会被静默忽略**。[@ref-continue-src-subagentmodels]

**subagent 能覆盖什么**：它自带自己的模型（`createLlmApi(model)`），执行时系统消息被换成「主 agent 基础系统消息 + 该模型的 `baseSystemMessage`」，并且工具权限被临时改成「全部放行」。除此之外它继承当前会话的全部工具集，包括 `Skills`、MCP 工具，甚至 `Subagent` 本身（当 `--beta-subagent-tool` 打开时）。[@ref-continue-src-subagent-exec]

**agent 文件能覆盖什么**：

- `model` 覆盖本次会话的模型来源（当前实现已因 hub 移除而不可用，见上节）。[@ref-continue-src-agentfile-init]
- `rules` 注入附加规则，最终与 `config.yaml` 的 `rules`、`~/.continue/rules`/`.continue/rules` 下的 Markdown 规则、`--rule` 一起拼进系统消息。[@ref-continue-src-configservice-blocks][@ref-continue-src-systemmessage-rules]
- `tools` 收窄工具可见性：声明了 `tools` 且其中没有 `built_in` 时，未列出的内置工具会被批量设为 `exclude`；列出的 MCP server 与工具则放行。[@ref-continue-src-agent-toolgate]

**继承关系**：agent 文件不产生新的模型或权限体系，它只是往当前配置上叠一层「隐藏的附加配置」（`{name: "hidden", ...}`），由 `mergeUnrolledAssistants` 与基础配置合并；同名块按名字去重，incoming（即附加层）排在前面因而胜出。[@ref-continue-src-configservice-blocks][@ref-continue-src-merge][@ref-continue-src-dupedetect]

## 调用方式与运行边界 {#agents-invocation}

**subagent 的调用**：主 agent 通过内置 `Subagent` 工具发起，参数为 `description`（任务简述）、`prompt`（任务正文）、`subagent_name`（必须是已注册的 subagent 名）。工具描述里会动态列出全部可用 subagent 及其系统提示词摘要，因此模型看到的是「有哪些子代理、各自负责什么」。[@ref-continue-src-subagent-meta][@ref-continue-src-subagent-desc][@ref-continue-src-tools-assemble]

**开关**：`Subagent` 工具默认不注册，需要 `--beta-subagent-tool` 显式打开（`setBetaSubagentToolEnabled`）。没打开时 `getAllAvailableTools()` 不会 push 这个工具，模型也没有工具描述可依据。[@ref-continue-src-toolsconfig][@ref-continue-src-index-program][@ref-continue-src-tools-assemble]

**用户侧调用 agent 文件**：只有 `--agent` 一个入口；它把正文前置到首次输入，把 rules/tools 注入配置。没有「菜单里选一个 agent」的机制。[@ref-continue-src-chat-agentprompt][@ref-continue-src-chat-tui-agentprompt]

**运行边界**：

- subagent 在**独立的子会话**里跑：新建一份只含该 prompt 的 `chatHistory`，临时把 `ChatHistoryService` 标记为未就绪（防止子会话写进主会话记录），执行结束再恢复原系统消息函数、原权限状态与原本的就绪标记。[@ref-continue-src-subagent-exec][@ref-continue-src-subagent-restore]
- **没有并发上限、没有递归深度检查、没有时长上限**：`executeSubAgent` 每次调用都新建子会话，工具集里若包含 `Subagent` 本身，模型理论上可以继续嵌套；源码里没有计数或深度守卫。[@ref-continue-src-subagent-exec][@ref-continue-src-tools-assemble]
- **中断**：用户触发 escape 会 abort 当前 AbortController，并往子会话历史里追加一条「被用户取消」的消息。[@ref-continue-src-subagent-exec]
- **上下文**：子会话只带 prompt 本身，不带父会话历史；返回给主 agent 的是子会话最后一条消息的文本内容。[@ref-continue-src-subagent-exec]
- **权限**：执行期间权限被强制改成 `{tool: "*", permission: "allow"}`，源码注释写明这是临时行为（「allow all tools for now」），结束后恢复主 agent 的原状态。也就是说 subagent 内部不会弹出审批。[@ref-continue-src-subagent-exec][@ref-continue-src-subagent-restore]

## 诊断 {#agents-diagnostics}

- **agent 文件**：加载失败会抛异常并带上原始原因（`Failed to load agent from {path}: ...`），在服务初始化阶段直接冒泡，往往是会话启动即失败。可观察的信号是启动错误文本，而不是某个列表命令。[@ref-continue-src-agentfile-get][@ref-continue-src-agentfile-init]
- **subagent 是否注册**：没有 `/agents` 命令。可用的间接入口是「模型能不能看到工具」——`Subagent` 工具的描述里列出全部可用 subagent；如果列表为空，说明没有满足「`roles` 含 subagent + 有 `baseSystemMessage`」的模型。[@ref-continue-src-subagent-desc][@ref-continue-src-subagentmodels]
- **调用失败**：`subagent_name` 不在列表里时工具直接抛 `Unknown agent type`；子会话执行异常会被捕获成 `{success: false, error}` 并写进 debug 日志，主 agent 只看到一段失败文本。[@ref-continue-src-subagent-tool-call][@ref-continue-src-subagent-exec]
- **日志**：debug 级日志写到 `{continueHome}/logs/cn.log`，`--verbose` 提高终端日志级别。[@ref-continue-src-logger][@ref-continue-src-common-options]
- **权限类失败**：如果 `Subagent` 本身被 `--exclude` 或被 agent 文件的 `tools` 排除，现象是「工具不存在」而不是「权限被拒」——子代理也就完全不可用。[@ref-continue-src-perms-precedence][@ref-continue-src-agent-toolgate]

**缺口**：固定来源没有提供查询「哪些 agent 文件被加载」「上次调用花了多久」的入口；两条机制（agent 文件与 subagent）也没有统一的列表或状态视图，这是 diagnostics 只能给出上述间接入口的原因。
