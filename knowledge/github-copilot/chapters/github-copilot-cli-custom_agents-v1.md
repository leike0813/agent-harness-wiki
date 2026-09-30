---
schema_version: 3
record_kind: production
edition_id: github-copilot-cli-custom_agents-v1
harness_id: github-copilot
topic: custom_agents
title: "GitHub Copilot CLI 自定义 Agent：位置、格式、调用、覆盖与边界"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-github-copilot-agentsconc-about, ref-github-copilot-agentsconc-builtin, ref-github-copilot-agentsconc-subagents, ref-github-copilot-cmp-agents, ref-github-copilot-cmp-subagents, ref-github-copilot-agents-creating]
  - section_id: agents-entry-format
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cmdref-agents-locations, ref-github-copilot-cfgdir-agents, ref-github-copilot-agents-creating, ref-github-copilot-invoke-agents, ref-github-copilot-agentsconc-where, ref-github-copilot-pluginsconc-contain, ref-github-copilot-pluginref-legacy-components, ref-github-copilot-pluginsconc-structure-ap1, ref-github-copilot-pluginref-components, ref-github-copilot-pluginref-locations, ref-github-copilot-agentsconc-format, ref-github-copilot-agentsconc-example, ref-github-copilot-cmdref-agents-frontmatter, ref-github-copilot-cmdref-agents-ref, ref-github-copilot-agentsref-frontmatter, ref-github-copilot-agentsref-example, ref-github-copilot-agentsref-names, ref-github-copilot-agentsref-versioning, ref-github-copilot-cmdref-sidekick]
  - section_id: agents-roles-invocation
    surface_ids: [cli]
    source_refs: [ref-github-copilot-agentsconc-builtin, ref-github-copilot-cmdref-agents-builtin, ref-github-copilot-cmp-agents, ref-github-copilot-cmp-subagents, ref-github-copilot-agentsconc-subagents, ref-github-copilot-cmdref-agents-ref, ref-github-copilot-agents-creating, ref-github-copilot-cmdref-slash, ref-github-copilot-cmdref-options, ref-github-copilot-progref-agents, ref-github-copilot-invoke-agents, ref-github-copilot-agents-using, ref-github-copilot-cmdref-agents-frontmatter, ref-github-copilot-cmdref-agents-locations, ref-github-copilot-best-delegate]
  - section_id: agents-overrides-limits
    surface_ids: [cli]
    source_refs: [ref-github-copilot-agentsref-tools, ref-github-copilot-agentsref-tool-aliases, ref-github-copilot-agentsref-tools-ootb, ref-github-copilot-agentsref-tools-processing, ref-github-copilot-agentsref-mcp, ref-github-copilot-agentsref-mcp-type, ref-github-copilot-agentsref-mcp-env, ref-github-copilot-agentsref-mcp-configs, ref-github-copilot-pluginref-legacy-mcp, ref-github-copilot-cmdref-agents-frontmatter, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cmdref-slash, ref-github-copilot-agents-subagent-instr, ref-github-copilot-cmdref-agents-subagent-instr, ref-github-copilot-cmdref-subagent-limits, ref-github-copilot-cmdref-sidekick]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cmdref-slash, ref-github-copilot-agents-using, ref-github-copilot-cmdref-agents-locations, ref-github-copilot-pluginref-loading, ref-github-copilot-cmdref-agents-ref, ref-github-copilot-admin-agents, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-invoke-agents, ref-github-copilot-agentsconc-where, ref-github-copilot-agents-creating, ref-github-copilot-agentsref-names, ref-github-copilot-cmp-choose]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-github-copilot-cmdref-agents-locations, ref-github-copilot-cfgdir-agents, ref-github-copilot-agents-creating, ref-github-copilot-invoke-agents, ref-github-copilot-agentsconc-where, ref-github-copilot-pluginsconc-contain, ref-github-copilot-pluginref-locations]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-github-copilot-agentsconc-format, ref-github-copilot-agentsconc-example, ref-github-copilot-cmdref-agents-frontmatter, ref-github-copilot-cmdref-agents-ref, ref-github-copilot-agentsref-frontmatter, ref-github-copilot-agentsref-example, ref-github-copilot-agentsref-names, ref-github-copilot-agentsref-versioning]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles-invocation
        status: partial
        source_refs: [ref-github-copilot-agentsconc-builtin, ref-github-copilot-cmdref-agents-builtin, ref-github-copilot-cmp-agents, ref-github-copilot-cmp-subagents, ref-github-copilot-agentsconc-subagents, ref-github-copilot-cmdref-agents-ref]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-roles-invocation
        status: answered
        source_refs: [ref-github-copilot-agents-creating, ref-github-copilot-cmdref-slash, ref-github-copilot-cmdref-options, ref-github-copilot-progref-agents, ref-github-copilot-invoke-agents, ref-github-copilot-agents-using, ref-github-copilot-cmdref-agents-frontmatter, ref-github-copilot-cmdref-agents-locations, ref-github-copilot-cmp-agents, ref-github-copilot-best-delegate]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: partial
        source_refs: [ref-github-copilot-agentsref-tools, ref-github-copilot-agentsref-tool-aliases, ref-github-copilot-agentsref-tools-ootb, ref-github-copilot-agentsref-tools-processing, ref-github-copilot-agentsref-mcp, ref-github-copilot-agentsref-mcp-type, ref-github-copilot-agentsref-mcp-env, ref-github-copilot-agentsref-mcp-configs, ref-github-copilot-pluginref-legacy-mcp, ref-github-copilot-cmdref-agents-frontmatter, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cmdref-slash, ref-github-copilot-agents-subagent-instr, ref-github-copilot-cmdref-agents-subagent-instr]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: partial
        source_refs: [ref-github-copilot-cmdref-subagent-limits, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cmdref-sidekick]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-github-copilot-cmdref-slash, ref-github-copilot-agents-using, ref-github-copilot-cmdref-agents-locations, ref-github-copilot-pluginref-loading, ref-github-copilot-cmdref-agents-ref, ref-github-copilot-admin-agents, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-invoke-agents, ref-github-copilot-agentsconc-where, ref-github-copilot-agents-creating, ref-github-copilot-agentsref-names, ref-github-copilot-cmp-choose]
---

## 来源、范围与三组概念的关系 {#agents-scope}

GitHub Copilot CLI 是闭源产品（npm 包 `@github/copilot`），因此本章的全部证据只来自官方文档站
docs.github.com 的归档 markdown 快照。文档没有标注对应 CLI 版本，所以本章是来源级知识，不绑定任何已发布的
npm 版本；凡是文档没有写明的边界，下面按 `partial`/`unknown` 明确标出。

**自定义 Agent**（custom agent）是一份用 Markdown 写成的 agent profile：YAML frontmatter 声明名称、描述、
可用工具、MCP server 等，frontmatter 之下的正文就是该 agent 的提示词。它描述的是一种“专家人格与工作取向”，
即 Copilot 在特定任务上应采用的专门知识与做法 [@ref-github-copilot-agentsconc-about][@ref-github-copilot-cmp-agents]。

**子代理**（subagent）是执行单元，不是定义：当主 agent 判断把一块工作交给一个独立 agent 更合适时，它会
启动一个拥有独立上下文窗口的子代理来完成该工作，从而避免把专门工作的中间过程塞进主 agent 的上下文
[@ref-github-copilot-agentsconc-subagents][@ref-github-copilot-cmp-subagents]。因此二者的关系是：自定义
agent（或内置 agent）是“配置”，子代理是“一次运行”。文档明确说，若自定义 agent 允许被推断使用，主 agent
就可能“用该自定义 agent 的配置启动一个子代理” [@ref-github-copilot-cmp-subagents]。

**内置 agent** 是 CLI 自带的一组预置 agent，主 agent 可以把它们当作子代理运行（例如 `explore`、`task`、
`code-review`、`general-purpose`、`research`、`rubber-duck`、`security-review`），它们与用户自定义 agent
共用同一套“作为子代理运行”的机制 [@ref-github-copilot-agentsconc-builtin]。

最后，创建与使用自定义 agent 的官方入口是 `create-custom-agents-for-cli` 这篇 how-to，本章对“创建/使用”
的基本描述均以它为准 [@ref-github-copilot-agents-creating]。范围限定：本章只写 CLI surface，不写
VS Code / JetBrains / Web / cloud agent 的对应行为。

## 定义位置与文件格式 {#agents-entry-format}

**agents.entry（在哪里定义与如何发现）**。CLI 按以下优先级加载自定义 agent，同一 ID 时“先加载者胜”
[@ref-github-copilot-cmdref-agents-locations]：

| 优先级 | 作用域 | 位置 |
| --- | --- | --- |
| 1（最高） | User | `~/.copilot/agents/` |
| 2 | Project | `.github/agents/`，自当前工作目录向上到 Git 根 |
| 3 | Project | `.claude/agents/`，自当前工作目录向上到 Git 根 |
| 4 | Added root | `--add-dir`、`/add-dir` 或 SDK `additionalDirectories` 所指目录下的 `.github/agents/` |
| 5 | Plugin | 插件目录下的 `agents/` |
| 6（最低） | Remote | 组织或企业级 agent |

同一 project 行内，先查当前目录、再逐级向上到 Git 根，因此更深的目录优先级更高；所有项目 `.github/agents/`
目录先于任何项目 `.claude/agents/` 目录加载，于是 monorepo 里每个子包都能贡献自己的 agent
[@ref-github-copilot-cmdref-agents-locations]。个人目录 `~/.copilot/agents/` 存放 `.agent.md` 文件，对所有
会话可用；若个人 agent 与项目级 agent ID 相同（例如都叫 `reviewer.agent.md`），个人 agent 优先
[@ref-github-copilot-cfgdir-agents]。创建向导只提供两个落点：**Project**（`.github/agents/`）与 **User**
（`~/.copilot/agents/`）[@ref-github-copilot-agents-creating]。

除 CLI 本地目录外，文档还把 agent 划为四层作用域：user（本地 `~/.copilot/agents`）、repository
（`.github/agents`）、organization（组织 `.github` 或 `.github-private` 仓库的 `/agents`）、enterprise
（企业指定组织的 `.github-private` 仓库 `/agents`）[@ref-github-copilot-invoke-agents]。同一份概念文档给出
的层级落点是 repository `.github/agents/`、organization 与 enterprise 的 `/agents/` 目录
[@ref-github-copilot-agentsconc-where]。定义也可以随 plugin 分发：plugin 内含的 agent 放在 `agents/`
目录（`*.agent.md`）[@ref-github-copilot-pluginsconc-contain]；legacy plugin 的 agent 目录默认为 `agents/`，
可在 manifest 中覆盖 [@ref-github-copilot-pluginref-legacy-components]；Agent Plugins 1.0 的 client 专有
agent 放在 `com.github.copilot/agents/` [@ref-github-copilot-pluginsconc-structure-ap1]
[@ref-github-copilot-pluginref-components]；plugin 的 agent 加载位置在文件位置表中记为 legacy `agents/`
[@ref-github-copilot-pluginref-locations]。

**agents.format（第一方字段与解析）**。agent profile 是带 YAML frontmatter 的 Markdown 文件；最简单形态
包含 Name（可选，缺省用文件名作标识与默认显示名）、Description（说明用途与能力）、Prompt（正文指令）、
Tools（可选，缺省可访问全部工具与 MCP 工具），并可选带 `mcp-servers` [@ref-github-copilot-agentsconc-format]。
一份最小示例（来自概念页）[@ref-github-copilot-agentsconc-example]：

```text
---
name: readme-creator
description: Agent specializing in creating and improving README files
---

You are a documentation specialist focused on README files. ...
```

CLI 专用的 frontmatter 字段表列出：`description`（必填，显示在 agent 列表与 `task` 工具里）、`name`（可选，
也可用作 `--agent` 的选择值，缺省为 agent ID）、`tools`（默认 `["*"]`，含 `*` 即授予全部工具）、`model`、
`models`、`modelPolicy`、`reasoningEffort`、`infer`、`include-custom-instructions`、`mcp-servers`
[@ref-github-copilot-cmdref-agents-frontmatter]。首行标识也解释了 agent 文件的扩展名：文档同时接受 `.md` 与
`.agent.md`，并从文件名/相对路径推导 ID [@ref-github-copilot-cmdref-agents-ref]。

更广的共享参考页（覆盖 GitHub.com、Copilot CLI 与受支持 IDE）另列出 `target`
（`vscode` 或 `github-copilot`，缺省两者）、`disable-model-invocation`、`user-invocable` 与已退役的
`infer`；其中 `infer` 被标为 **Retired**，建议改用 `disable-model-invocation` 与 `user-invocable`，而
`mcp-servers`/`metadata` 标注为“不用于 VS Code 等 IDE 自定义 agent”，属于 GitHub.com 侧语义
[@ref-github-copilot-agentsref-frontmatter]。该页还给出测试专家、实现规划者两份示例 profile，正文最大
30,000 字符 [@ref-github-copilot-agentsref-example]。

命名与版本：在共享参考页的模型里，命名冲突时“较低层级配置覆盖较高层级”，即 repository 覆盖 organization、
organization 覆盖 enterprise [@ref-github-copilot-agentsref-names]；版本以 agent profile 文件的 Git
commit SHA 为单位，可借分支或标签产生不同版本的 agent [@ref-github-copilot-agentsref-versioning]。注意这与
CLI 本地加载优先级表描述的模型不同（CLI 侧 User 最高、Project 次之、Remote lowest），文档没有解释两套模型
如何统一，这一点按 `partial` 阅读 [@ref-github-copilot-cmdref-agents-locations]。

此外 CLI 支持 **sidekick agent**：在 agent 定义里加 `sidekick:` 块即可注册 [@ref-github-copilot-cmdref-sidekick]。

## 角色、委派与调用方式 {#agents-roles-invocation}

**agents.roles（主/子/特殊角色是否同一机制）**。CLI 的主 agent 是默认处理请求的 agent；内置 agent 是主 agent
可当作子代理运行的专门角色，覆盖探索、命令执行、代码审查、安全审查、研究、通用任务、rubber-duck 等
[@ref-github-copilot-agentsconc-builtin]。命令参考给出内置 agent 的默认模型与职责，例如 `code-review`、
`explore`、`general-purpose`、`research`、`rubber-duck`、`security-review`、`task`
[@ref-github-copilot-cmdref-agents-builtin]。概念比较页把“subagents”定义为“主 agent 为完成某块工作而启动的
独立 agent 执行”，把“custom agents”定义为“专门能力的定义，可被主 agent 委派一个任务去应用”，两者共用同一
套“定义 → 子代理执行”机制 [@ref-github-copilot-cmp-agents][@ref-github-copilot-cmp-subagents]。自定义
agent 与内置 agent 的差别只在于来源（用户/项目/插件定义 vs 随 CLI 内置），运行时都走 `task` 工具的委派
路径 [@ref-github-copilot-agentsconc-subagents]。CLI 对 agent ID 的推导统一适用于 user、project 与
added-root agent [@ref-github-copilot-cmdref-agents-ref]。

**agents.invocation（显式调用、自动委派与选择规则）**。文档给出四种用法
[@ref-github-copilot-agents-creating]：

- 斜杠命令：交互模式输入 `/agent`，从可用自定义 agent 列表中选择，再输入要转交给它的 prompt。列表**不含**
  CLI 的默认（内置）agent。
- 显式指令：在 prompt 里点名，例如 `Use the security-auditor agent on all files in the /src/app directory`。
- 按推断：使用能触发某 agent 描述的 prompt（例如让其处理 `src` 下 TypeScript 文件的安全问题），或使用 agent
  profile 里定义的触发词（如 `seccheck /src/app/validator.go`），Copilot 自动推断目标 agent。
- 程序化：`copilot --agent security-auditor --prompt "Check /src/app/validator.go"`，或把 `name` 用引号
  传入，例如 `--agent "Security Auditor"`。

调用入口汇总：`/agent` 浏览并选择可用 agent [@ref-github-copilot-cmdref-slash]；`--agent=AGENT` 指定
自定义 agent [@ref-github-copilot-cmdref-options]；程序化参考同样以 `--agent` 为例
[@ref-github-copilot-progref-agents]。使用页把用法归纳为三种：`/agent` 选择、prompt 内点名（Copilot 自动
推断）、命令行 `--agent=refactor-agent` [@ref-github-copilot-invoke-agents]；how-to 页补充内置 agent 不在
`/agent` 列表中 [@ref-github-copilot-agents-using]。

选择规则以 agent profile 的 `description` 为依据：Copilot 可能判断某 agent 的专长契合当前任务从而选用它
[@ref-github-copilot-agents-using]。可推断性由 `infer` 控制，缺省 `true`；设 `false` 时只能手动选择
[@ref-github-copilot-cmdref-agents-frontmatter]。当 `--agent` 的取值同时匹配多个 agent 的 ID 或 `name` 时，
CLI 取优先级表中第一个匹配者 [@ref-github-copilot-cmdref-agents-locations]。

**ID 推导规则**：对 user、project 与 added-root agent，ID 由文件相对 `agents` 目录的路径得到——去掉
`.agent.md` 或 `.md` 扩展名，并把目录分隔符替换为 `--`；例如 `agents/team/reviewer.agent.md` 的 ID 是
`team--reviewer` [@ref-github-copilot-cmdref-agents-ref]。how-to 页给出一致规则，并说明 `agents` 子目录
会以同样方式并入 ID（如 `agents/security/security-auditor.agent.md` → `security--security-auditor`）
[@ref-github-copilot-agents-creating]。

另有一处易混机制：`/delegate` 是把工作转交到云端 Copilot cloud agent（生成 PR），并非本地自定义 agent 的
调用路径 [@ref-github-copilot-best-delegate]。文档所写的委派规则（`infer` 未设 `false` 时主 agent 可能委派
给该自定义 agent）见比较页 [@ref-github-copilot-cmp-agents]。

## 覆盖项与边界 {#agents-overrides-limits}

**agents.overrides（每个 agent 可指定的模型、工具、权限、沙箱）**。工具由 `tools` 属性控制，可用
`tools: ["*"]` 或省略表示启用全部工具（含 profile 与仓库设置里配置的 MCP 工具），也可只列具体名称或别名，
用 `server/tool` 前缀从某 MCP server 选工具、用 `server/*` 启用该 server 全部工具，用 `tools: []`
禁用全部工具；无法识别的工具名会被忽略 [@ref-github-copilot-agentsref-tools]。工具别名表给出 `execute`
（含 `shell`/`Bash`/`powershell`）、`read`、`edit`、`search`、`agent`、`web`、`todo`，均大小写不敏感
[@ref-github-copilot-agentsref-tool-aliases]。文档还列出“开箱即用”的 MCP server 命名空间（`github`、
`playwright`），可用 `github/*` 或 `github/TOOL_NAME` 引用 [@ref-github-copilot-agentsref-tools-ootb]。
工具处理规则是：不写 = 全部启用，空列表 = 全禁用，显式列表 = 只启用列出的那些
[@ref-github-copilot-agentsref-tools-processing]。

MCP 配置写在 `mcp-servers` 属性里，其子项与仓库级 MCP JSON 配置大体相同
[@ref-github-copilot-agentsref-mcp]。示例：`type: 'local'`、`command`、`args`、`tools`、`env`
[@ref-github-copilot-agentsref-mcp-type]。环境变量与密钥支持 `$VAR`、`${VAR}`、`${VAR:-default}`，YAML 侧
另支持 `${{ secrets.VAR }}` 与 `${{ vars.VAR }}` [@ref-github-copilot-agentsref-mcp-env]。MCP server 配置
的处理顺序为：先处理开箱即用 MCP（如 GitHub MCP），再处理自定义 agent 的 MCP 配置，最后处理仓库设置中的
MCP 配置，逐层覆盖 [@ref-github-copilot-agentsref-mcp-configs]。插件内 agent 还能在自己的 frontmatter 中
声明 `mcp-servers`，并用 `${PLUGIN_ROOT}` 指向插件根目录 [@ref-github-copilot-pluginref-legacy-mcp]。

模型/推理强度的覆盖链在 CLI 参考中给出：`model`、`models`、`modelPolicy`、`reasoningEffort` 都有默认与
继承规则；解析优先级（高到低）为：单次调用显式值 > `~/.copilot/settings.json` 里的 `subagents` 覆盖 >
agent 定义字段 > 父会话值。声明了却无法兑现的模型/强度会回退到会话值，除非设
`modelPolicy: "required"`（此时拒绝派发而非替换）[@ref-github-copilot-cmdref-agents-frontmatter]。
用户设置中的 `subagents.*` 一族是这一层的落点：`subagents.agents`（按 agent 名覆盖 `model`、
`modelPolicy`、`effortLevel`、`contextTier`）、`subagents.disabledSubagents`（阻止派发的 agent 名单）、
`subagents.maxConcurrency`、`subagents.maxDepth` [@ref-github-copilot-cfgdir-user-settings]。`/subagents`
（别名 `/agents`）命令可交互式配置默认与按 agent 的模型 [@ref-github-copilot-cmdref-slash]。

`include-custom-instructions: true` 让自定义 agent 在**作为子代理**运行时读取仓库指令文件
（`copilot-instructions.md`、`AGENTS.md`、`CLAUDE.md`）；缺省为 `false` [@ref-github-copilot-cmdref-agents-frontmatter]。
它只对子代理形态生效，用 `--agent`/`/agent`/推断直接选中的 agent 本就遵循仓库指令
[@ref-github-copilot-agents-subagent-instr]。子代理不会继承主会话额外加载的指令目录（例如
`COPILOT_CUSTOM_INSTRUCTIONS_DIRS` 指定的个人目录），且会话以 `--no-custom-instructions` 启动时任何 agent
都拿不到仓库指令 [@ref-github-copilot-cmdref-agents-subagent-instr]。

**agents.limits（并发、递归、嵌套、持续时间）**。CLI 对深度与并发设限：默认最大深度 `6`、上限 `256`；
最大并发按计划而定（Free/Education `2`、Pro/Pro+ `4`、Max `8`、Business `16`、Enterprise 与按量计费
`32`，硬上限 `32`）[@ref-github-copilot-cmdref-subagent-limits]。达到深度上限时最内层 agent 不能再生成
子代理；达到并发上限时新的子代理请求被拒绝，直到有 agent 完成
[@ref-github-copilot-cmdref-subagent-limits]。超出范围的值会被夹取（并发封顶 `32`、深度封顶 `256`）
[@ref-github-copilot-cmdref-subagent-limits]；对应设置只在按量计费计划下生效
[@ref-github-copilot-cfgdir-user-settings]。

持续时间/生命周期相关的另一机制是 sidekick agent：`sidekick` 块支持 `triggers`（`user.message`、
`session.context_changed` 等事件，可带 `limit`）、`behavior`（`"restart"` 或 `"persistent"`）与
`maxSendsPerTurn` [@ref-github-copilot-cmdref-sidekick]。

## 诊断与故障定位 {#agents-diagnostics}

**如何确认定义被发现、可调用**：用 `/agent` 浏览并选择当前可用（被发现）的 agent，列表不含内置 agent
[@ref-github-copilot-cmdref-slash][@ref-github-copilot-agents-using]；用 `/subagents`（或 `/agents`）查看并
配置 agent 的模型派发，`modelPolicy: "required"` 的 agent 在选取器里显示为锁定、不可覆盖
[@ref-github-copilot-cmdref-slash]；`/add-dir` 加载某目录下的 `.github/agents` 作为受信配置，可用于验证
added-root agent 是否被发现 [@ref-github-copilot-cmdref-slash]。

**查重与优先级**：CLI 侧同 ID 时“先加载者胜”，完整优先级见位置表 User → Project `.github` → Project
`.claude` → Added root → Plugin → Remote；所有项目 `.github/agents/` 先于 `.claude/agents/`
[@ref-github-copilot-cmdref-agents-locations]。插件层面，agent 与 skill 采用“先发现者胜”：若项目级
agent/skill 与插件同名同 ID，插件里的会被静默忽略，插件无法覆盖项目级或个人配置；内置工具与 agent 始终存在
且不可被覆盖 [@ref-github-copilot-pluginref-loading]。`--agent` 取值同时命中多个 ID 或 `name` 时取优先级表
第一项 [@ref-github-copilot-cmdref-agents-locations]。可选 `name` 不参与去重，同名不同 ID 的 agent 会
同时加载 [@ref-github-copilot-cmdref-agents-locations]。agent ID 的推导（去扩展名、`--` 替换分隔符）可在
命令行参考开头查到，是排查“为什么这个 agent 没被选中”的第一手规则 [@ref-github-copilot-cmdref-agents-ref]。

**组织/企业来源**：企业配置的自定义 agent 可在 Copilot CLI 中使用 [@ref-github-copilot-admin-agents]；
用户设置 `customAgents.defaultLocalOnly`（默认 `false`）可关闭远程组织/企业 agent，只使用本地 agent，是
区分“本地未定义”与“远程被禁用”的开关 [@ref-github-copilot-cfgdir-user-settings]。

**能力范围与选型**：agent 与 user/repo/org/enterprise 四种作用域的对应关系见使用页表格
[@ref-github-copilot-invoke-agents]；概念页给出 repository/organization/enterprise 三处落点
[@ref-github-copilot-agentsconc-where]。`/agent` 只列自定义 agent、内置 agent 另见概念页的 built-in
清单 [@ref-github-copilot-agents-creating]。选型表把“需要某类任务上以受限工具集的专家身份工作”指向 custom
agent、“复杂任务”指向 subagents、“不想手工配置的一揽子功能”指向 plugin
[@ref-github-copilot-cmp-choose]。

**缺口（partial）**：文档没有提供专门的“为什么这个 agent 没被发现/没被调用”诊断命令，也没有把“发现 →
去重 → 注入描述 → 推断/委派 → 派发成功”拆成独立诊断输出；可用信息只有 `/agent` 列表、`/subagents` 选取器、
`--agent` 的匹配规则与优先级表 [@ref-github-copilot-cmdref-slash][@ref-github-copilot-cmdref-agents-locations]。
本地加载优先级表与共享参考页的“低层覆盖高层”模型不一致，文档未给出统一解释
[@ref-github-copilot-cmdref-agents-locations][@ref-github-copilot-agentsref-names]。这两点状态 `partial`。
由于产品闭源，除上述文档外没有可交叉验证的实现证据。
