---
schema_version: 3
record_kind: production
edition_id: openhands-cli-skills-v1
harness_id: openhands
topic: skills
title: "OpenHands CLI 的 Skills：位置、格式、发现、加载、调用与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-readme-status, ref-openhands-cli-pyproject, ref-openhands-canvas-boundaries]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-skills-context, ref-openhands-sdk-skills-project, ref-openhands-sdk-skills-thirdparty, ref-openhands-sdk-skills-user, ref-openhands-sdk-skills-public, ref-openhands-cli-locations, ref-openhands-sdk-skills-cache, ref-openhands-canvas-skills-scope, ref-openhands-docs-skills-locations, ref-openhands-docs-skills-registry]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-skills-parse, ref-openhands-sdk-skills-model, ref-openhands-sdk-skills-triggers, ref-openhands-sdk-skills-mcpjson, ref-openhands-sdk-skills-resource-dirs, ref-openhands-sdk-skills-resources, ref-openhands-docs-sdk-skill-format, ref-openhands-docs-skills-keyword-frontmatter, ref-openhands-docs-skills-path-frontmatter, ref-openhands-docs-skills-path-glob]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-skills-context, ref-openhands-sdk-context-autoload, ref-openhands-sdk-skills-load, ref-openhands-sdk-skills-discovery, ref-openhands-sdk-skills-thirdparty, ref-openhands-sdk-skills-public, ref-openhands-sdk-skills-cache, ref-openhands-docs-skills-progressive]
  - section_id: skills-collision
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-skills-precedence, ref-openhands-sdk-skills-merge, ref-openhands-sdk-context-autoload, ref-openhands-sdk-skills-user, ref-openhands-sdk-skills-project, ref-openhands-sdk-context-fields, ref-openhands-docs-skills-locations]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-context-fields, ref-openhands-cli-skills-context, ref-openhands-sdk-context-partition, ref-openhands-sdk-skills-template, ref-openhands-sdk-context-prompt, ref-openhands-docs-skills-progressive, ref-openhands-docs-sdk-skill-injection, ref-openhands-docs-sdk-skill-always, ref-openhands-docs-sdk-skill-location]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-skills-triggers, ref-openhands-sdk-context-partition, ref-openhands-cli-skills-command, ref-openhands-docs-sdk-skill-paths]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-context-fields, ref-openhands-cli-skills-context, ref-openhands-sdk-skills-public, ref-openhands-sdk-skills-cache, ref-openhands-docs-skills-registry, ref-openhands-sdk-skills-parse, ref-openhands-sdk-skills-load, ref-openhands-sdk-skills-project, ref-openhands-sdk-context-autoload, ref-openhands-docs-sdk-skill-loading]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-skills-command, ref-openhands-cli-resources, ref-openhands-sdk-skills-load, ref-openhands-sdk-context-partition, ref-openhands-docs-skills-mechanism, ref-openhands-sdk-skills-cache]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-openhands-cli-skills-context, ref-openhands-sdk-skills-project, ref-openhands-sdk-skills-thirdparty, ref-openhands-sdk-skills-user, ref-openhands-sdk-skills-public, ref-openhands-cli-locations, ref-openhands-sdk-skills-cache, ref-openhands-docs-skills-locations]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: partial
        source_refs: [ref-openhands-cli-skills-context, ref-openhands-sdk-skills-load, ref-openhands-sdk-skills-discovery, ref-openhands-sdk-skills-thirdparty, ref-openhands-sdk-skills-public, ref-openhands-sdk-skills-cache, ref-openhands-docs-skills-progressive]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-collision
        status: answered
        source_refs: [ref-openhands-sdk-skills-precedence, ref-openhands-sdk-skills-merge, ref-openhands-sdk-skills-user, ref-openhands-sdk-skills-project, ref-openhands-sdk-context-fields, ref-openhands-docs-skills-locations]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-openhands-sdk-skills-parse, ref-openhands-sdk-skills-model, ref-openhands-sdk-skills-triggers, ref-openhands-docs-sdk-skill-format]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-openhands-sdk-skills-mcpjson, ref-openhands-sdk-skills-resource-dirs, ref-openhands-sdk-skills-resources, ref-openhands-sdk-skills-model, ref-openhands-docs-skills-path-frontmatter, ref-openhands-docs-skills-path-glob, ref-openhands-sdk-skills-triggers]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-openhands-sdk-context-partition, ref-openhands-sdk-skills-template, ref-openhands-sdk-context-prompt, ref-openhands-docs-skills-progressive, ref-openhands-docs-sdk-skill-injection]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: partial
        source_refs: [ref-openhands-sdk-skills-triggers, ref-openhands-sdk-context-partition, ref-openhands-cli-skills-command, ref-openhands-docs-sdk-skill-paths]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: answered
        source_refs: [ref-openhands-sdk-context-fields, ref-openhands-cli-skills-context, ref-openhands-sdk-skills-public, ref-openhands-sdk-skills-cache, ref-openhands-sdk-skills-parse, ref-openhands-sdk-skills-project, ref-openhands-docs-skills-registry]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-openhands-cli-skills-command, ref-openhands-cli-resources, ref-openhands-sdk-skills-load, ref-openhands-sdk-context-partition, ref-openhands-sdk-skills-cache]
---

## 固定来源与调查范围 {#skills-scope}

本页只回答 CLI 界面（`surface_id: cli`）：OpenHands 的命令行客户端 `openhands`。固定来源如下，正文中的每条结论都可在其中定位：

- CLI 源码仓库 `OpenHands/OpenHands-CLI`，提交 `954f2ba646e8d749261a8f2b2b7e3031fa39be9f`，包名 `openhands`、版本 1.16.0，入口脚本 `openhands = openhands_cli.entrypoint:main` 与 `openhands-acp = openhands_cli.acp:main` [@ref-openhands-cli-pyproject]。该仓库当前自带“项目不再积极维护”的说明，并建议改用 Agent Canvas [@ref-openhands-cli-readme-status]。
- Skills 的发现、解析与注入由 CLI 依赖的 `openhands-sdk==1.28.1` 实现，CLI 只负责选择加载选项并把结果放进 Agent 上下文 [@ref-openhands-cli-pyproject]；因此本节同时引用 SDK 仓库 `OpenHands/software-agent-sdk` 标签 v1.28.1（提交 `edaac806d1599a4ee1662fd4008fbcd7b537ecd1`）。
- 产品 Web 端 Agent Canvas 位于另一个官方仓库（本目录的固定修订 `All-Hands-AI/OpenHands@1ec86616`）；该仓库 README 明确列出各仓库职责边界 [@ref-openhands-canvas-boundaries]。Web 界面本轮未调查，不在本页给答案。
- 官方文档站点 `https://docs.openhands.dev` 的 Skills 相关页面为文档快照来源；其适用软件版本未知，与源码不一致时本页并列写出。

## 位置与作用域 {#skills-roots}

CLI 在每次构造 Agent 上下文时显式加载三类 Skills，并在 `AgentContext` 上打开用户级与公共级自动加载 [@ref-openhands-cli-skills-context]：

| 作用域 | 目录 | 触发方式 |
| --- | --- | --- |
| 项目 | `{work_dir}/.agents/skills/`、`{work_dir}/.openhands/skills/`、`{work_dir}/.openhands/microagents/`（遗留） | CLI 调用 `load_project_skills(get_work_dir())` [@ref-openhands-sdk-skills-project] |
| 项目（Git 仓库根） | 同上三个目录，但以最近的 Git 仓库根为基准 | 工作目录位于 Git 仓库内时额外加载，工作目录优先 [@ref-openhands-sdk-skills-project] |
| 项目/仓库上下文文件 | `AGENTS.md`、`agent.md`、`CLAUDE.md`、`GEMINI.md`、`.cursorrules` | 在 `work_dir` 与 Git 仓库根各扫描一次 [@ref-openhands-sdk-skills-thirdparty] |
| 用户 | `~/.agents/skills/`、`~/.openhands/skills/`、`~/.openhands/microagents/`（遗留） | `load_user_skills=True` [@ref-openhands-sdk-skills-user] |
| 用户（已安装 Skills） | `~/.openhands/skills/installed/` | 优先级低于上面三个目录 [@ref-openhands-sdk-skills-user] |
| 公共 | `https://github.com/OpenHands/extensions` 的本地克隆 `~/.openhands/cache/skills/public-skills` | `load_public_skills=True` [@ref-openhands-sdk-skills-public] |

路径随以下输入变化：状态根取自环境变量 `OPENHANDS_PERSISTENCE_DIR`（默认 `~/.openhands`），会话目录取自 `OPENHANDS_CONVERSATIONS_DIR`，工作目录取自 `OPENHANDS_WORK_DIR`（默认当前目录）[@ref-openhands-cli-locations]。用户级目录中的 `~` 始终是进程的 home [@ref-openhands-sdk-skills-user]；项目级目录随 `work_dir` 与 Git 仓库根变化 [@ref-openhands-sdk-skills-project]；公共 Skills 缓存目录随 home 变化，仓库地址与 ref 由代码常量与 `EXTENSIONS_REF` 决定 [@ref-openhands-sdk-skills-cache]。Agent Canvas 侧对同一批 SDK 目录做了作用域映射，可作为命名约定的旁证 [@ref-openhands-canvas-skills-scope]。官方文档给出的作用域与推荐目录与代码一致（仓库上下文、项目 `.agents/skills/`、用户 `~/.agents/skills/`、公共注册表），并明确 `.openhands/skills/` 与 `.openhands/microagents/` 仍被支持 [@ref-openhands-docs-skills-locations]；公共注册表就是 `github.com/OpenHands/extensions` [@ref-openhands-docs-skills-registry]。

## 文件格式与专有字段 {#skills-format}

一个目录只要直接包含 `SKILL.md`（大小写不敏感）就是 AgentSkills 格式 Skill；其中的 frontmatter 由 `python-frontmatter` 解析，正文即 Skill 内容 [@ref-openhands-sdk-skills-parse]。SKILL.md 的 Skill 名优先取 frontmatter 的 `name`，否则取父目录名；非 SKILL.md 的 Markdown 按遗留 OpenHands 格式解析，名字由相对路径或文件名推导 [@ref-openhands-sdk-skills-parse]。

`Skill` 模型识别的字段（未列出的字段被忽略）：`name`、`content`、`trigger`、`source`、`mcp_tools`、`inputs`、`is_agentskills_format`，以及 AgentSkills 标准字段 `version`（默认 `1.0.0`）、`description`（上限 1024 字符，超长截断并附来源提示）、`license`、`compatibility`、`metadata`、`allowed-tools`/`allowed_tools`、`disable-model-invocation`/`disable_model_invocation`、`resources` [@ref-openhands-sdk-skills-model]。

触发类型由 frontmatter 推导：存在 `inputs` 时构造 `TaskTrigger`（并把 `/{skill-name}` 追加为触发词），存在 `triggers` 时构造 `KeywordTrigger`，都没有时 `trigger=None`（遗留格式表示常驻上下文）[@ref-openhands-sdk-skills-triggers]。`triggers` 必须是字符串列表，`inputs` 必须是列表，否则抛 `SkillValidationError` [@ref-openhands-sdk-skills-triggers]。

附加文件与目录：AgentSkills 格式的 Skill 会在自身目录查找 `.mcp.json` 并作为 MCP 配置载入；遗留格式只认 frontmatter 里的 `mcp_tools` 字典 [@ref-openhands-sdk-skills-mcpjson] [@ref-openhands-sdk-skills-parse]。资源目录固定为 `scripts/`、`references/`、`assets/`，其中的文件以相对路径登记为资源清单，供 Agent 需要时按需读取 [@ref-openhands-sdk-skills-resource-dirs] [@ref-openhands-sdk-skills-resources]。

官方文档给出的最小 SKILL.md 形态与之一致（`name`、`description` 为必填，`name` 需与父目录同名且只含小写字母、数字与连字符）[@ref-openhands-docs-sdk-skill-format]，关键字触发的 frontmatter 写法为 `triggers` 列表 [@ref-openhands-docs-skills-keyword-frontmatter]。文档还描述了 `paths` 路径触发规则（glob 列表，与 `triggers` 同时出现时 `paths` 优先）[@ref-openhands-docs-skills-path-frontmatter] [@ref-openhands-docs-skills-path-glob]；但固定快照的 SDK v1.28.1 中触发类型只有 `keyword` 与 `task` 两种，没有任何 `paths` 处理代码，因此该字段在 CLI 1.16.0 上不生效（版本差别，见“调用方式”一节）。

## 发现时机与扫描范围 {#skills-discovery}

扫描发生在会话/Agent 构造时，不是后台监听：CLI 在 `AgentStore._build_agent_context()` 中调用 `load_project_skills(get_work_dir())` 并同时开启用户与公共自动加载 [@ref-openhands-cli-skills-context]；SDK 构造 `AgentContext` 时再执行自动加载并把显式 Skills 置于优先位置 [@ref-openhands-sdk-context-autoload]。

单个 Skills 目录内的扫描规则（`load_skills_from_dir`）[@ref-openhands-sdk-skills-load]：

- SKILL.md：只检查该目录的**直接子目录**，逐个查找 `SKILL.md`（大小写不敏感）；更深层的嵌套目录不会被当成独立 Skill [@ref-openhands-sdk-skills-discovery]。
- 普通 Markdown：对该目录做递归 `*.md` 遍历，排除 `README.md`、所有 `SKILL.md`，以及位于某个 SKILL.md 目录下的文件（它们被视为该 Skill 的参考资料）[@ref-openhands-sdk-skills-discovery]。
- 仓库上下文文件：只在 `work_dir` 与 Git 仓库根的**顶层**按文件名匹配（不递归），大小写不敏感；同名重复与解析到同一真实路径的符号链接只保留一个 [@ref-openhands-sdk-skills-thirdparty]。
- 单个文件解析失败只记录告警并跳过，不影响其余 Skill [@ref-openhands-sdk-skills-load]。

公共 Skills 的扫描是“克隆 + 过滤”：首次使用把 `https://github.com/OpenHands/extensions` 克隆到 `~/.openhands/cache/skills/public-skills`，默认只加载 `marketplaces/default.json` 清单里列出的插件名对应的 Skill [@ref-openhands-sdk-skills-public]；分支 ref 在进程内按 TTL 缓存，tag 或 commit SHA（不可变 ref）不再轮询远程 [@ref-openhands-sdk-skills-cache]。文档把这一过程描述为“发现阶段只把 name/description 放进可用清单”的三级渐进披露 [@ref-openhands-docs-skills-progressive]。

缺口：固定来源未说明目录遍历对符号链接（`rglob` 是否跟随目录链接、SKILL.md 目录是否为符号链接）的行为，代码只对第三方上下文文件做了 `resolve()` 去重 [@ref-openhands-sdk-skills-thirdparty]。

## 同名冲突与优先级 {#skills-collision}

同名 Skill 按作用域覆盖而不是合并内容。SDK 的合并入口 `load_available_skills` 明确写入优先级：公共 → 用户 → 项目，后者覆盖前者 [@ref-openhands-sdk-skills-precedence]；显式传入的 Skills 由 `merge_skills_by_name` 保证权威，自动加载的同名项被丢弃 [@ref-openhands-sdk-skills-merge] [@ref-openhands-sdk-context-autoload]。

同一作用域内的顺序（先到先得）：

- 用户级：`~/.agents/skills/` → `~/.openhands/skills/` → `~/.openhands/microagents/`，随后才是 `~/.openhands/skills/installed/` [@ref-openhands-sdk-skills-user]。
- 项目级：`{root}/.agents/skills/` → `{root}/.openhands/skills/` → `{root}/.openhands/microagents/`；`root` 先取工作目录、再取 Git 仓库根，因此工作目录定义优先于仓库根定义 [@ref-openhands-sdk-skills-project]。
- 名称在 `AgentContext.skills` 内重复会直接抛错（同一显式列表内不允许重名）[@ref-openhands-sdk-context-fields]。

官方文档对读者的表述相同：自动加载时项目覆盖用户、用户覆盖公共，同一作用域内 `.agents/skills/` 优先于两个遗留目录 [@ref-openhands-docs-skills-locations]。

## 加载与注入 {#skills-loading}

`AgentContext` 在构造时决定两件事：是否自动加载用户/公共 Skills（`load_user_skills`、`load_public_skills`，默认均为 `False`，CLI 把它设为 `True`），以及可选的 `marketplace_path` [@ref-openhands-sdk-context-fields] [@ref-openhands-cli-skills-context]。加载完成后，注入位置由 `_partition_skills()` 决定 [@ref-openhands-sdk-context-partition]：

- AgentSkills 格式（SKILL.md）与带触发的遗留 Skill：进入 available_skills 清单，只在系统提示中给出名称与描述；若 `disable_model_invocation` 为真则连描述也不列出。
- 遗留格式且无触发：整段正文进入 REPO_CONTEXT 区段，作为常驻上下文。

系统提示的拼装模板为 `context/prompts/templates/system_message_suffix.j2`：REPO_CONTEXT 区段与 available_skills 清单分别插入，并附带环境变量、时间等扩展字段 [@ref-openhands-sdk-skills-template]。生成系统提示时还会做厂商过滤：当模型族不是 Anthropic/Google 时，名称恰为 `claude` 或 `gemini` 的常驻 Skill 被剔除 [@ref-openhands-sdk-context-prompt]。Agent 需要正文时再读取 SKILL.md 本体与其 `scripts/`、`references/`、`assets/` 下的文件，这就是文档所述的定向查找+渐进披露 [@ref-openhands-docs-skills-progressive] [@ref-openhands-docs-sdk-skill-injection]。

文档补充：常驻上下文最适合放仓库级 AGENTS.md，体量大的内容应放进按需加载的 Skill 与参考资料 [@ref-openhands-docs-sdk-skill-always]；Skill 正文里出现的 `!` + 反引号形式的内联命令会在渲染时执行并替换为输出，代码块内不执行 [@ref-openhands-docs-sdk-skill-injection]。可用 Skill 的定位在提示中同时给出名称、描述与文件路径，便于模型自行读取 [@ref-openhands-docs-sdk-skill-location]。

## 调用方式 {#skills-invocation}

三条路径并存 [@ref-openhands-sdk-skills-triggers] [@ref-openhands-sdk-context-partition]：

1. 模型主动调用：AgentSkills 格式的 Skill 始终出现在 available_skills 清单里，模型根据描述决定是否读取正文（除非 `disable-model-invocation: true`）[@ref-openhands-sdk-context-partition]。
2. 关键字/任务触发：`triggers` 命中用户消息时自动注入正文；带 `inputs` 的 Skill 是任务 Skill，除关键字外还会注册 `/{skill-name}` 作为触发词 [@ref-openhands-sdk-skills-triggers]。
3. 遗留常驻：`trigger=None` 的遗留 Skill 不做调用决策，正文一直在系统提示中 [@ref-openhands-sdk-context-partition]。

用户可见的 CLI 侧入口是 TUI 的 `/skills` 命令，用于查看已加载的 Skills、Hooks 与 MCP，而不是调用某个 Skill 本身 [@ref-openhands-cli-skills-command]。文档另外描述了 `paths` 路径规则：命中被读/写/创建的文件路径时确定性注入、且不对模型公布 [@ref-openhands-docs-sdk-skill-paths]；该行为在固定快照的 SDK v1.28.1 中没有实现，属于文档与固定源码的差别（本页按源码为准，把它记为缺口）。

## 生效条件 {#skills-conditions}

- 自动加载开关：用户级与公共级自动加载必须由 `AgentContext` 显式打开（默认关闭）；CLI 打开两者，并显式加载项目级 [@ref-openhands-sdk-context-fields] [@ref-openhands-cli-skills-context]。以库方式使用 SDK 时，显式传入的 Skills 不会被自动加载项覆盖 [@ref-openhands-sdk-context-fields]。
- 公共 Skills 依赖本机 git 与网络：需要能把 `OpenHands/extensions` 克隆到 `~/.openhands/cache/skills/public-skills`；ref 由 `EXTENSIONS_REF` 决定（默认 `main`），默认只加载 `marketplaces/default.json` 中列出的 Skill [@ref-openhands-sdk-skills-public] [@ref-openhands-sdk-skills-cache]。官方文档说明该注册表即官方全局 Skill 仓库 [@ref-openhands-docs-skills-registry]。
- 命名校验：SKILL.md 的 `name` 在严格模式下必须匹配 `^[a-z0-9]+(-[a-z0-9]+)*$` 且与目录名一致，否则加载该 Skill 会抛错并只影响自身 [@ref-openhands-sdk-skills-parse] [@ref-openhands-sdk-skills-load]。
- 作用域可见性：项目 Skills 只在会话工作目录（或该目录所属 Git 仓库根）下生效；换目录运行 `openhands` 会得到不同集合 [@ref-openhands-sdk-skills-project]。
- 文件改动不会热加载：扫描只在构造 Agent 上下文时进行一次，修改 Skill 文件需要新开一次会话/重启 CLI [@ref-openhands-sdk-context-autoload] [@ref-openhands-docs-sdk-skill-loading]。

## 诊断与重载 {#skills-diagnostics}

- CLI 内：TUI 的 `/skills` 命令列出当前会话已加载的 Skills（名称、描述、来源路径），同一视图也显示 Hooks 与 MCP [@ref-openhands-cli-skills-command] [@ref-openhands-cli-resources]。
- 日志：SDK 加载器在发现/解析失败时用 `logger.warning` 记录具体文件，整个目录加载失败也不中断会话；目录扫描完成后会把 repo/knowledge/agent 三类计数写入 debug 日志 [@ref-openhands-sdk-skills-load]。
- 可用清单与注入：模型看到的就是 available_skills 清单（名称+描述）与 REPO_CONTEXT（无触发遗留 Skill 的正文），核对这两处即可判断某个 Skill 是否真的进入上下文 [@ref-openhands-sdk-context-partition] [@ref-openhands-docs-skills-mechanism]。
- 改动后重载：没有文件监听或热重载路径，重新开始一次会话（重启 `openhands`）即可拿到新集合；公共 Skills 的克隆更新在进程内按 TTL 缓存，切换不可变 ref（tag/commit）后不再轮询远程 [@ref-openhands-sdk-skills-cache]。
