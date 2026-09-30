---
schema_version: 3
record_kind: production
edition_id: trae-trae-configuration-v1
harness_id: trae
topic: configuration
title: "Trae IDE 的配置机制：来源、优先级、默认值与诊断"
sections:
  - section_id: config-sources
    surface_ids: [trae]
    source_refs: [ref-trae-set-overview, ref-trae-rules-dirs, ref-trae-commands-dirs, ref-trae-hook-locations, ref-trae-mem-types, ref-trae-ignore-procedure, ref-trae-perm-global-json]
  - section_id: config-overrides
    surface_ids: [trae]
    source_refs: [ref-trae-hook-locations, ref-trae-skills-agents-note, ref-trae-subagents-override, ref-trae-rules-ref, ref-trae-rules-gitmsg, ref-trae-perm-res-auth, ref-trae-perm-fs-auth, ref-trae-perm-net-auth, ref-trae-perm-cmd-rules]
  - section_id: config-runtime-trust
    surface_ids: [trae]
    source_refs: [ref-trae-hook-envvars, ref-trae-perm-modes, ref-trae-perm-request, ref-trae-perm-global-json, ref-trae-autorun]
  - section_id: config-defaults-migration
    surface_ids: [trae]
    source_refs: [ref-trae-perm-scene-ref, ref-trae-hook-fields, ref-trae-mcp-timeout, ref-trae-perm-global-json, ref-trae-rules-nesting, ref-trae-rules-subdir, ref-trae-commands-dirs, ref-trae-rules-import, ref-trae-set-general]
  - section_id: config-diagnostics
    surface_ids: [trae]
    source_refs: [ref-trae-set-overview, ref-trae-perm-global-json, ref-trae-ignore-procedure]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [trae]
        section_id: config-sources
        status: answered
        source_refs: [ref-trae-set-overview, ref-trae-rules-dirs, ref-trae-commands-dirs, ref-trae-hook-locations, ref-trae-mem-types, ref-trae-perm-global-json]
  - question_id: config.overrides
    answers:
      - surface_ids: [trae]
        section_id: config-overrides
        status: answered
        source_refs: [ref-trae-perm-res-auth, ref-trae-perm-fs-auth, ref-trae-perm-net-auth, ref-trae-perm-cmd-rules, ref-trae-subagents-override, ref-trae-skills-agents-note, ref-trae-rules-ref]
  - question_id: config.runtime
    answers:
      - surface_ids: [trae]
        section_id: config-runtime-trust
        status: partial
        source_refs: [ref-trae-hook-envvars]
  - question_id: config.trust
    answers:
      - surface_ids: [trae]
        section_id: config-runtime-trust
        status: partial
        source_refs: [ref-trae-perm-modes, ref-trae-perm-request, ref-trae-perm-global-json, ref-trae-autorun]
  - question_id: config.defaults
    answers:
      - surface_ids: [trae]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-trae-perm-scene-ref, ref-trae-hook-fields, ref-trae-mcp-timeout]
  - question_id: config.migration
    answers:
      - surface_ids: [trae]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-trae-rules-import, ref-trae-set-general]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [trae]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-trae-set-overview, ref-trae-ignore-procedure, ref-trae-perm-global-json]
---

## 配置来源与作用域 {#config-sources}

本章来源为 `docs.trae.ai` IDE 分册的设置、规则、记忆、忽略文件与权限系列页面快照（`/ide/ide-settings-overview`、`/ide/rules`、`/ide/memories`、`/ide/ignore-files`、`/ide/permission-and-approval` 及其两个配置参考页、`/ide/auto-run-and-security`）。Trae 闭源、无官方 npm 包，整章为来源级知识。

TraeCode 的配置分两类载体：**设置中心的界面开关**与**磁盘上的配置文件**。设置中心从右上角齿轮进入，官方总览页按 Account / General / Agents / MCP / Conversation / CUE / Models / Context / Rules 分组列出可配置项。[@ref-trae-set-overview]

磁盘配置的入口按作用域分摊到两个根目录（路径口径均取自对应官方页面）：

| 机制 | 用户级（macOS/Linux） | 项目级 | 来源 |
| :-- | :-- | :-- | :-- |
| 规则 Rules | `~/.trae/user_rules` | `.trae/rules/` | [@ref-trae-rules-dirs] |
| 命令 Commands | `~/.trae/commands` | `.trae/commands` | [@ref-trae-commands-dirs] |
| Hook | `~/.trae/hooks.json` | `$PROJECT_FOLDER/.trae/hooks.json` | [@ref-trae-hook-locations] |
| 记忆 Memories | `~/.trae/memory/user_profile.md` | `~/.trae/memory/projects/{project_path}/project_memory.md`（按项目分开，但仍在本机用户目录下） | [@ref-trae-mem-types] |
| 索引忽略 | 无 | `.trae/.ignore`（由设置面板创建） | [@ref-trae-ignore-procedure] |
| 权限 | `~/.trae/permission/global.json` | 同左（全局文件） | (见下) |

Skill（`.trae/skills/`、`~/.trae/skills`）、MCP（`.trae/mcp.json`）、子智能体（`.trae/agents/`）的路径分别记在各自章节。

权限配置是个例外：自定义权限模式与全局权限策略、资源授权、命令/MCP 规则**都写在同一份用户级文件 `~/.trae/permission/global.json`** 里，没有项目级副本。[@ref-trae-perm-global-json]

**远程设备的例外**：使用 Remote SSH 或 WSL 连接远程设备时，"you need to configure custom settings for each device separately; local custom settings cannot be reused"——即配置不随连接共享。[@ref-trae-perm-global-json]

**缺口（`config.sources`）**：固定来源没有出现组织级/企业管理策略文件、环境变量覆盖顺序或 profile 概念；已检查的入口是设置中心总览页与上述各配置页面，缺失的是企业策略与配置文件优先级清单。[@ref-trae-set-overview]

## 合并与优先级规则 {#config-overrides}

各机制的覆盖语义并不同一，逐条都有明确来源：[@ref-trae-hook-locations]

**Hook：合并，不覆盖。** 同一工作区多个项目根目录各自启用项目 hook 时逐份读取合并执行；Claude Code hook 与 TraeCode hook 同时启用时同样合并执行。[@ref-trae-hook-locations]

**Skill：`.trae/skills/` 优先于 `.agents/skills/`** 的同名 Skill。[@ref-trae-skills-agents-note]

**子智能体：项目级覆盖用户级同名；同层同名只取第一个加载的**，后面的被忽略。[@ref-trae-subagents-override]

**Rules：`#Rule` 引用优先级最高。** 对应用方式为手动（Apply Manually）的规则，用 `#Rule` 在输入框里引用；"Among rule referencing methods, `#Rule` has the highest priority."，并且对其它应用方式的规则，若用 `#Rule` 显式提及，AI 在本次对话里也会采用。[@ref-trae-rules-ref] 另外 `scene: git_message` 是独立通道："As long as the rule file contains this field, regardless of how other fields are configured, the AI will follow the rule in `scene: git_message` when generating Git commit messages."，多个规则文件都带该字段时**全部**生效。[@ref-trae-rules-gitmsg]

**权限：三层递减 + 同层内部规则。** 命中 `resourceAuthorization` 里的资源级规则时优先使用它，没有命中才回落到自定义权限模式的默认策略，再回落到 TraeCode 内置的默认资源访问权限。[@ref-trae-perm-res-auth] 同层内部规则：路径越长越精确优先级越高；同一路径同时写进 `readWrite` 与 `readOnly` 时 `readOnly` 优先；[@ref-trae-perm-fs-auth] 网络目标同理，越精确越优先，同一目标同时在 `allow` 与 `deny` 里时 `deny` 优先；[@ref-trae-perm-net-auth] 命令规则 `commandRules` 的优先级高于 `commandAstDangerChecker`，命中两处时以全局命令规则为准。[@ref-trae-perm-cmd-rules]

**缺口（`config.overrides`）**：文档没有给出"对象/数组/空值/删除标记如何合并"的统一规则（例如 `global.json` 是被整体替换还是深合并），也没有列出不参与覆盖的键；上述优先级都是逐机制单独描述的。[@ref-trae-perm-res-auth]

## 运行时介入与信任边界 {#config-runtime-trust}

**运行时**：固定来源里唯一出现"运行时注入配置"的机制是 Hook 的环境变量——`TRAE_PROJECT_DIR` 提供工作区目录，`SessionStart` 额外注入 `TRAE_ENV_FILE`，hook 写入该文件的变量对本会话后续的 hook 与 `RunCommand` 生效。[@ref-trae-hook-envvars] 文档没有描述命令行启动参数、profile 或环境变量对**配置读取顺序**的覆盖，`config.runtime` 只覆盖到这一层，其余未验证。[@ref-trae-hook-envvars]

**信任与权限是配置生效的主要闸门**，由三档预设权限模式定义：[@ref-trae-perm-modes][@ref-trae-perm-request]

| 模式 | 沙箱 | 安全检查 | 审批人 |
| :-- | :-- | :-- | :-- |
| Manual Approval | 开启，命令在隔离环境执行 | 危险命令拦截与文件保护开启 | 用户逐条确认 |
| Automatic Approval | 开启 | 开启 | TraeCode 内置 LLM Guardian 自动评估（用户使用自定义模型时由该模型评估） |
| Full Access | 关闭，命令直接在宿主机执行 | 全部安全检查关闭，不触发审批 | 无 |

"Automatic Approval" 对美国地区用户不可用；自定义权限模式下可以细粒度控制哪些操作需要审批（例如禁止 MCP 工具自动执行、改为逐次人工批准）。[@ref-trae-perm-modes][@ref-trae-perm-request]

**自定义权限模式的全局配置文件**同时承载授权与规则，结构顶层是 `customProfiles.defaultCustomProfile` 与 `resourceAuthorization` 两组；自定义权限模式还可以调整沙箱策略、审批决策者、风险场景规则以及文件系统与网络访问策略。[@ref-trae-perm-global-json]

**Auto-Run 是权限之外的第二个闸门**：开启"自动运行 MCP"后 Agent 无需逐次确认即可运行 MCP server 及其工具，首次连接外部 MCP server 仍需用户显式授权；把命令执行模式设为 Auto Run 会让命令**始终在沙箱外**自动执行，官方明确"recommend not to enable 'Auto Run' mode unless necessary"。[@ref-trae-autorun]

## 默认值、嵌套与迁移 {#config-defaults-migration}

**有明确默认值的第一方字段**（逐项都有来源）：[@ref-trae-perm-scene-ref][@ref-trae-hook-fields][@ref-trae-mcp-timeout]

| 项 | 默认值 | 来源 |
| :-- | :-- | :-- |
| `hooks.json` 的 `version` | `1`（当前只支持 1） | [@ref-trae-hook-fields] |
| hook 定义层 `timeout` | `30` 秒 | [@ref-trae-hook-fields] |
| hook 组 `loop_limit` | `5`（未配置或 ≤0 时） | [@ref-trae-hook-fields] |
| `commandAstDangerChecker` | `true` | [@ref-trae-perm-scene-ref] |
| `shellFileProtection` | `false` | [@ref-trae-perm-scene-ref] |
| `deleteToolApproval` | `false` | [@ref-trae-perm-scene-ref] |
| `mcpToolApproval` | `true` | [@ref-trae-perm-scene-ref] |
| MCP 启动/调用超时 | 未配置时无默认值说明；文档示例给 `60000` 毫秒 | [@ref-trae-mcp-timeout] |

权限默认范围也在文档里写明：Manual/Automatic 模式下 `.vscode` 只读、工作区文件（除 `.trae`、`.vscode`、`.git`）可读写、临时/缓存/依赖目录按操作系统列表放行，网络默认全部允许；自定义模式下 `filesystem.default` 与 `network.default` 可改。见上一节与配置参考页。[@ref-trae-perm-global-json]

**项目规则的目录层级**：`.trae/rules/` 支持递归读取子目录，**最多三层嵌套**（第四层文件不可读）；同一机制也支持在项目的任意子目录里放 `.trae/rules/`，当对话中提到该目录的文件或 AI 读取其中文件时自动应用。[@ref-trae-rules-nesting][@ref-trae-rules-subdir] 命令目录同样是三层上限。[@ref-trae-commands-dirs]

**迁移与兼容**：[@ref-trae-rules-import][@ref-trae-set-general]

- 导入 `AGENTS.md`：跨工具约定，需手工放在项目根目录，然后在 `Settings > Rules` 里打开对应开关；
- 导入 `CLAUDE.md` / `CLAUDE.local.md`：Claude Code 的项目规则文件，从 Claude Code 迁移项目时自动带入，同样用开关启用；
- 导入 Claude Code 的 Hook 配置（见 Hook 一章，导入后需按 TraeCode 事件规范调整输入输出）；
- 从 VS Code / Cursor 导入 plugins、settings、code snippets 与快捷键：菜单入口 `Import Configuration`，**会覆盖当前 TraeCode 配置且不可撤销**。

固定来源没有描述配置键的弃用、改名或旧格式自动迁移规则。[@ref-trae-set-general]

## 诊断与"写了没生效" {#config-diagnostics}

可用的观察点分四类：[@ref-trae-set-overview][@ref-trae-perm-global-json]

- **设置中心**：Account / General / Agents / MCP / Conversation / CUE / Models / Context / Rules 各组是配置的读取入口，也是多数开关的实际状态展示处；
- **直接打开配置文件**：自定义权限模式与全局策略在 `Settings > Permission Approval` 的 `Regular Tasks > Permission Mode` 区域点 `Open Config` 打开 `global.json`；
- **日志**：Hook 有 `Settings > Hooks > View Logs`（Output 面板 "Agent Hooks"，退出客户端后清空），MCP server 有列表齿轮 → `Logs` 或 Output 面板的 `MCP Server Host` 视图；
- **任务内回执**：Git 提交信息规则生效时，在 Source Control 面板点 `Generate Commit Message` 即可看到结果。

**典型"文件已写但没有生效"**：[@ref-trae-ignore-procedure][@ref-trae-perm-global-json]

- `.trae/.ignore` 只在**重新索引之后**生效——官方流程要求回到索引面板点 `Build` 重建索引；
- 项目级 `mcp.json` 需要先在 `Settings > MCP` 打开项目级开关并确认；
- `skill-config.json` 只记录被禁用的**项目级** Skill，全局 Skill 的禁用状态不在该文件里，不能用它判断全局 Skill 的启用状态；
- Remote SSH / WSL 连接的远程设备使用各自的配置，本机改动不会同步过去。

**缺口（`config.diagnostics`）**：固定来源没有提供"列出实际生效的配置来源与优先级"的命令或界面，也没有说明配置文件改动是否需要重启客户端；可观察点只有上述面板状态与日志。[@ref-trae-set-overview]
