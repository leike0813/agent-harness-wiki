---
schema_version: 3
record_kind: production
edition_id: gemini-cli-cli-skills-v1
harness_id: gemini-cli
topic: skills
title: "Gemini CLI 的 Agent Skills：位置、格式、发现、加载与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-skills-doc-how, ref-gemini-cli-skills-create-structure]
  - section_id: skills-locations-format
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-skills-doc-tiers, ref-gemini-cli-skills-docsite-tiers, ref-gemini-cli-skills-manager-discover, ref-gemini-cli-storage-skills-dirs, ref-gemini-cli-storage-project-scope, ref-gemini-cli-storage-home, ref-gemini-cli-storage-user-scope, ref-gemini-cli-skills-create-aliases, ref-gemini-cli-plugins-ref-skills, ref-gemini-cli-skills-doc-options, ref-gemini-cli-skills-using-terminal, ref-gemini-cli-skills-create-metadata, ref-gemini-cli-skills-create-quickstart, ref-gemini-cli-skills-loader-frontmatter, ref-gemini-cli-skills-loader-file, ref-gemini-cli-skills-doc-precedence, ref-gemini-cli-settings-skills, ref-gemini-cli-settings-admin, ref-gemini-cli-skills-create-scripts, ref-gemini-cli-skills-create-structure, ref-gemini-cli-skills-manager-state]
  - section_id: skills-discovery-collision
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-skills-doc-how, ref-gemini-cli-skills-docsite-how, ref-gemini-cli-skills-loader-dir, ref-gemini-cli-skills-doc-manage, ref-gemini-cli-skills-using-manage, ref-gemini-cli-cli-interactive, ref-gemini-cli-skills-doc-precedence, ref-gemini-cli-skills-manager-conflict, ref-gemini-cli-skills-manager-state]
  - section_id: skills-loading-invocation
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-skills-doc-how, ref-gemini-cli-skills-doc-benefits, ref-gemini-cli-skills-docsite-how, ref-gemini-cli-skills-activate-execute, ref-gemini-cli-skills-activate-confirm, ref-gemini-cli-skills-using-security, ref-gemini-cli-skills-activate-usage, ref-gemini-cli-skills-activate-args, ref-gemini-cli-skills-doc-manage, ref-gemini-cli-cmd-skills, ref-gemini-cli-cli-skills, ref-gemini-cli-skills-manager-state]
  - section_id: skills-conditions-diagnostics
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-settings-skills, ref-gemini-cli-settings-doc-skills, ref-gemini-cli-settings-admin, ref-gemini-cli-config-admin-remote, ref-gemini-cli-skills-manager-discover, ref-gemini-cli-settings-security, ref-gemini-cli-skills-using-security, ref-gemini-cli-settings-auto-memory, ref-gemini-cli-skills-doc-manage, ref-gemini-cli-cmd-skills, ref-gemini-cli-skills-using-manage, ref-gemini-cli-skills-manager-conflict, ref-gemini-cli-skills-loader-dir, ref-gemini-cli-skills-activate-execute]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations-format
        status: partial
        source_refs: [ref-gemini-cli-skills-doc-tiers, ref-gemini-cli-skills-docsite-tiers, ref-gemini-cli-skills-manager-discover, ref-gemini-cli-storage-skills-dirs, ref-gemini-cli-storage-project-scope, ref-gemini-cli-storage-home, ref-gemini-cli-storage-user-scope, ref-gemini-cli-skills-create-aliases, ref-gemini-cli-plugins-ref-skills, ref-gemini-cli-skills-doc-options, ref-gemini-cli-skills-using-terminal]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: partial
        source_refs: [ref-gemini-cli-skills-doc-how, ref-gemini-cli-skills-docsite-how, ref-gemini-cli-skills-loader-dir, ref-gemini-cli-skills-doc-manage, ref-gemini-cli-skills-using-manage, ref-gemini-cli-cli-interactive]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: answered
        source_refs: [ref-gemini-cli-skills-doc-precedence, ref-gemini-cli-skills-manager-conflict, ref-gemini-cli-skills-manager-state]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-locations-format
        status: answered
        source_refs: [ref-gemini-cli-skills-create-metadata, ref-gemini-cli-skills-create-quickstart, ref-gemini-cli-skills-create-structure, ref-gemini-cli-skills-loader-frontmatter, ref-gemini-cli-skills-loader-file]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-locations-format
        status: partial
        source_refs: [ref-gemini-cli-skills-doc-precedence, ref-gemini-cli-settings-skills, ref-gemini-cli-settings-admin, ref-gemini-cli-skills-doc-options, ref-gemini-cli-plugins-ref-skills, ref-gemini-cli-skills-create-quickstart, ref-gemini-cli-skills-create-scripts, ref-gemini-cli-skills-manager-state]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-gemini-cli-skills-doc-how, ref-gemini-cli-skills-doc-benefits, ref-gemini-cli-skills-docsite-how, ref-gemini-cli-skills-activate-execute, ref-gemini-cli-skills-activate-confirm]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: partial
        source_refs: [ref-gemini-cli-skills-activate-usage, ref-gemini-cli-skills-activate-args, ref-gemini-cli-skills-activate-execute, ref-gemini-cli-skills-doc-manage, ref-gemini-cli-cmd-skills, ref-gemini-cli-cli-skills, ref-gemini-cli-skills-manager-state]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-gemini-cli-settings-skills, ref-gemini-cli-settings-doc-skills, ref-gemini-cli-settings-admin, ref-gemini-cli-config-admin-remote, ref-gemini-cli-skills-manager-discover, ref-gemini-cli-settings-security, ref-gemini-cli-skills-using-security, ref-gemini-cli-settings-auto-memory]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-gemini-cli-skills-doc-manage, ref-gemini-cli-cmd-skills, ref-gemini-cli-skills-using-manage, ref-gemini-cli-skills-manager-conflict, ref-gemini-cli-skills-loader-dir, ref-gemini-cli-settings-skills, ref-gemini-cli-skills-activate-execute]
---

## 固定来源与适用范围 {#skills-scope}

本章的固定来源是官方仓库 `google-gemini/gemini-cli` 在提交
`38700b4b38bf387dafded6c97c3f190d084b49e9`
的登记文档与源码（`docs/cli/skills.md`、`docs/cli/creating-skills.md`、`docs/cli/using-agent-skills.md`、`docs/tools/activate-skill.md`、`packages/core/src/skills/*`），以及官方文档站
`geminicli.com/docs` 的 markdown 快照。仓库快照固定到
commit，文档站快照只能按抓取时刻阅读，两者的软件版本都未在文档中注明，因此全章是来源级知识，不绑定任何已发布的 npm 版本。

Skill 在本产品里叫 **Agent Skills**，基于 `agentskills.io` 开放标准：一个 skill 是"目录包"，包内必须有
`SKILL.md`，其余是可选的 `scripts/`、`references/`、`assets/` 资源
[@ref-gemini-cli-skills-doc-how][@ref-gemini-cli-skills-create-structure]。它与常驻上下文文件（`GEMINI.md`）的分工是：后者常驻注入，前者按需激活
[@ref-gemini-cli-skills-doc-how]。

## 位置、格式与宿主专有项 {#skills-locations-format}

**skills.roots**：发现分四层，文档顺序即优先级（低到高）：内置 skill（随 CLI 发行）、扩展自带 skill、用户级、工作区级
[@ref-gemini-cli-skills-doc-tiers][@ref-gemini-cli-skills-docsite-tiers]。源码里的加载顺序与之一致，且把每一层的两个别名路径分开加载：内置（`builtin/`）→
处于激活状态的扩展 → `~/.gemini/skills/` → `~/.agents/skills/`
→（仅当工作区受信）`项目根/.gemini/skills/` → `项目根/.agents/skills/`
[@ref-gemini-cli-skills-manager-discover]。路径由 Storage
生成：`~/.gemini/skills`、`~/.agents/skills`、`项目根/.gemini/skills`、`项目根/.agents/skills`（"项目根"指工作区根，即会话工作目录）[@ref-gemini-cli-storage-skills-dirs][@ref-gemini-cli-storage-project-scope]。

home 由 `homedir()` 决定：设置了 `GEMINI_CLI_HOME` 时用它，否则用系统 home；因此 `~/.gemini/skills`
与 `~/.agents/skills` 都随该变量移动
[@ref-gemini-cli-storage-home][@ref-gemini-cli-storage-user-scope]。文档没有提到任何专门改写
skill 搜索路径的变量，`GEMINI_CLI_HOME` 是通过改写 home 间接生效的。别名 `.agents/skills/` 是为跨工具互通而设
[@ref-gemini-cli-skills-create-aliases]。

扩展自带 skill 放在扩展目录的 `skills/` 下（例如 `skills/security-audit/SKILL.md` 暴露
`security-audit`）[@ref-gemini-cli-plugins-ref-skills]；扩展未激活时不参与发现
[@ref-gemini-cli-skills-manager-discover]。`/skills link PATH` 与
`gemini skills install SOURCE`（参数为目录或 Git 仓库地址）把外部目录或 Git
仓库引入本机：安装默认落用户档案，`--scope workspace` 落当前项目，`--path` 指定仓库内的子目录，`--consent` 跳过安装确认
[@ref-gemini-cli-skills-doc-options][@ref-gemini-cli-skills-using-terminal]。文档没有写出安装后的确切落盘目录，只给出"用户档案
/ 工作区"两个作用域，这一点按 partial 阅读。

**skills.format**：`SKILL.md` 以 YAML frontmatter 开头，frontmatter 之后是正文指令
[@ref-gemini-cli-skills-create-metadata]。文档只确认两个字段：`name`（唯一标识，建议与目录名一致）与
`description`（必填，模型据此决定是否使用该
skill）[@ref-gemini-cli-skills-create-metadata][@ref-gemini-cli-skills-create-quickstart]。源码里的解析链是：文件必须匹配"以
`---` 开头的 frontmatter 块"这一正则，否则整份文件被丢弃；frontmatter 先用 YAML 解析，要求 `name` 与
`description` 都是字符串，YAML 解析失败或字段缺失时退回逐行的简单解析器（识别
`name:`/`description:`，并把缩进的后续行拼进
description）[@ref-gemini-cli-skills-loader-frontmatter][@ref-gemini-cli-skills-loader-file]。解析出的
`name` 会把 `:`、`\`、`/`、`<`、`>`、`*`、`?`、`"`、`|` 替换成 `-` 后再作为 skill 名字使用
[@ref-gemini-cli-skills-loader-file]。

目录形状（占位符是普通文本）[@ref-gemini-cli-skills-create-structure]：

```text
my-skill/
  SKILL.md       (必需) 指令与元数据
  scripts/       (可选) 可执行脚本
  references/    (可选) 静态文档
  assets/        (可选) 模板等资源
```

`name` 与 `description` 的最小示例，来自创建指南 [@ref-gemini-cli-skills-create-quickstart]：

```markdown
---
name: code-reviewer
description:
  Expertise in reviewing code changes for correctness, security, and style. Use
  when the user asks to "review" their code or a PR.
---

# Code Reviewer Instructions
...
```

**skills.extensions**：宿主识别但不属于 Agentskills 标准核心的项有——`.agents/skills` 别名（同层内优先于
`.gemini/skills`）[@ref-gemini-cli-skills-doc-precedence]；`skills.enabled`（布尔，默认
true，需重启）、`skills.disabled`（数组，默认
`[]`，需重启）[@ref-gemini-cli-settings-skills]；管理侧开关 `admin.skills.enabled`（false
时禁用 skill 能力）[@ref-gemini-cli-settings-admin]；安装侧 `--scope`/`--path`/`--consent`
[@ref-gemini-cli-skills-doc-options]；扩展内的 `skills/` 目录
[@ref-gemini-cli-plugins-ref-skills]；随 CLI 内置的 `skill-creator` 元 skill，会生成
`SKILL.md` 与 `scripts/`、`references/`、`assets/` 三个目录
[@ref-gemini-cli-skills-create-quickstart]；`.skill` 打包（zip）脚本
`scripts/package_skill.cjs` 与校验脚本 `scripts/validate_skill.cjs`
[@ref-gemini-cli-skills-create-scripts]。

缺口：登记来源没有列举 `SKILL.md` 允许的其它 frontmatter 字段（例如工具白名单、模型指定、依赖声明），也没有给出
`skills.disabled` 与文件名/目录名的匹配规则（源码显示按名字大小写不敏感比较
[@ref-gemini-cli-skills-manager-state]）。这两点状态 partial。

## 发现时机、扫描范围与同名冲突 {#skills-discovery-collision}

**skills.discovery**：会话冷启动时 CLI 扫描各发现层，并把所有启用 skill 的 name 与 description 注入系统提示
[@ref-gemini-cli-skills-doc-how][@ref-gemini-cli-skills-docsite-how]。扫描实现是
`glob` 匹配 `SKILL.md` 与 `*/SKILL.md` 两种模式（相对各 skill 根目录），`nodir` 只取文件，忽略
`**/node_modules/**` 与 `**/.git/**`；根目录不存在或不是目录时该层返回空
[@ref-gemini-cli-skills-loader-dir]。因此默认发现深度是"skill
根目录本身"或"根目录的直接子目录"，更深的嵌套不会命中。目录非空但没找到有效 skill 时，只在 debug 日志里给出提示
[@ref-gemini-cli-skills-loader-dir]。

不重启即可重新发现：`/skills reload`（别名 `/skills refresh`）重新扫描所有层
[@ref-gemini-cli-skills-doc-manage][@ref-gemini-cli-skills-using-manage]；CLI
参考也把 `/skills reload` 列为磁盘重载入口
[@ref-gemini-cli-cli-interactive]。缺口：登记来源没有说明是否跟随符号链接、是否读取
`.gitignore`/`.geminiignore`（源码里只忽略 `node_modules` 与 `.git`，未接入 ignore
文件），也没有给出扫描深度上限之外的耗时说明。按 partial 阅读。

**skills.collision**：同名 skill 按层覆盖，高优先级覆盖低优先级；同一层内 `.agents/skills/` 别名覆盖
`.gemini/skills/` [@ref-gemini-cli-skills-doc-precedence]。源码用"名字 →
skill"的映射表实现，后来的写入胜负已分；覆盖非内置 skill 时会发出 warning
级反馈（`Skill conflict detected: ...`），覆盖内置 skill 只在 debug 日志中记录
[@ref-gemini-cli-skills-manager-conflict]。没有命名空间机制（不像 MCP 工具会加 `mcp_SERVER_`
前缀），落败的一方直接消失。名字查找大小写不敏感（`/skills enable|disable` 与 `skills.disabled`
均按小写比较），但映射表的键是原始 `name` 字符串 [@ref-gemini-cli-skills-manager-state]。

## 加载、激活与调用 {#skills-loading-invocation}

**skills.loading**：渐进披露分三步——启动时只把 name/description 放进系统提示；命中任务时模型调用
`activate_skill` 工具；用户批准后，`SKILL.md` 正文与该 skill 的目录结构被加入会话历史
[@ref-gemini-cli-skills-doc-how][@ref-gemini-cli-skills-doc-benefits][@ref-gemini-cli-skills-docsite-how]。源码侧确认：激活时把
skill 文本包成 `activated_skill` 段落（内含 instructions 与 available_resources
两段）返回给模型，并把 `SKILL.md` 所在目录加入工作区上下文，使模型有权读取包内资源
[@ref-gemini-cli-skills-activate-execute]。资源读取走普通文件工具（目录已被授权），没有单独的"资源 API"。内置
skill 激活时不弹确认；其它 skill 每次激活都要用户同意，并展示将要共享的目录结构
[@ref-gemini-cli-skills-activate-confirm][@ref-gemini-cli-skills-using-security]。

**skills.invocation**：只有模型能调用 `activate_skill`，用户不能手动调用该工具；工具参数是 `name`
枚举，取值范围就是当前可用的 skill 名
[@ref-gemini-cli-skills-activate-usage][@ref-gemini-cli-skills-activate-args][@ref-gemini-cli-skills-activate-execute]。用户侧入口是斜杠命令与终端命令：`/skills list [all] [nodesc]`、`/skills disable NAME`、`/skills enable NAME`、`/skills reload`、`/skills link PATH [--scope user|workspace]`
[@ref-gemini-cli-skills-doc-manage][@ref-gemini-cli-cmd-skills]；终端侧是
`gemini skills list|install|link|uninstall|enable|disable`（含
`--all`）[@ref-gemini-cli-cli-skills]。被禁用的 skill 从可用列表中被过滤，因此不会进入模型可见的枚举
[@ref-gemini-cli-skills-manager-state]。缺口：登记来源没有描述通过策略引擎对 skill
激活做细粒度允许/拒绝的写法（策略引擎文档只给出 subagent 与 MCP 工具的专有语法），也没有"按路径禁用某个 skill"的语法。partial。

## 生效条件与诊断 {#skills-conditions-diagnostics}

**skills.conditions**：四个可验证条件。其一，`skills.enabled` 默认
true、需重启生效；`skills.disabled` 列出被禁名字
[@ref-gemini-cli-settings-skills][@ref-gemini-cli-settings-doc-skills]。其二，管理面
`admin.skills.enabled` 为 false 时不允许使用 skill，而 admin 段只接受远程下发（文件里的 admin
配置被忽略）[@ref-gemini-cli-settings-admin][@ref-gemini-cli-config-admin-remote]。其三，工作区不受信任时
CLI 不发现工作区层 skill，用户层与内置层照常（源码在发现函数里直接返回并记 debug
日志）[@ref-gemini-cli-skills-manager-discover]；信任开关本身是
`security.folderTrust.enabled`，默认 true
[@ref-gemini-cli-settings-security]。其四，扩展必须以激活状态才能贡献 skill
[@ref-gemini-cli-skills-manager-discover]。

另有两个与生效相关的机制：安装远端 skill 前需确认来源，激活每个非内置 skill 前需确认
[@ref-gemini-cli-skills-using-security]；`experimental.autoMemory`（默认
false）会在后台从历史会话里抽取 memory 补丁与 skill，写入项目 memory 目录下的 inbox 补丁文件，需人工批准才应用
[@ref-gemini-cli-settings-auto-memory]。缺口：源码里还有 `setAdminSettings` 与
`isAdminEnabled` 两个入口，但登记文档没有说明它们在 CLI 侧由哪个配置或远程策略驱动，只能确认 settings 里的
`admin.skills.enabled`。partial。

**skills.diagnostics**：可用入口——`/skills list`（`all` 含内置、`nodesc` 隐藏描述）查看已发现与启用状态
[@ref-gemini-cli-skills-doc-manage]；`gemini skills list --all` 在终端列出全部
[@ref-gemini-cli-cmd-skills]；`/skills reload` 不重启重扫
[@ref-gemini-cli-skills-using-manage]；冲突覆盖会在会话里出现 warning 反馈
[@ref-gemini-cli-skills-manager-conflict]；发现失败（目录非空但无有效 `SKILL.md`）与扫描异常走 debug
日志与 warning 反馈 [@ref-gemini-cli-skills-loader-dir]。改动 frontmatter 后除了 `reload`
还需要重启的情形是 `skills.enabled`/`skills.disabled` 这类标记"Requires restart"的设置
[@ref-gemini-cli-settings-skills]。缺口：没有专门的"为什么这个 skill
没被发现"命令，也没有把"发现/启用/注入系统提示/激活成功"拆成独立诊断输出；`activate_skill` 调用失败时返回的可用 skill
名清单是唯一的即时排查提示 [@ref-gemini-cli-skills-activate-execute]。partial。
