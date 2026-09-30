---
schema_version: 3
record_kind: production
edition_id: junie-cli-skills-v1
harness_id: junie
topic: skills
title: "Junie CLI 的 Agent skills：发现位置、SKILL.md 解析、调用与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-junie-quickstart-overview, ref-junie-repo-install, ref-junie-skills-overview]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-junie-skills-locations, ref-junie-config-fields, ref-junie-skills-config, ref-junie-env-skills, ref-junie-params-discovery, ref-junie-config-trust, ref-junie-extensions-overview, ref-junie-skills-structure, ref-junie-skills-manage]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-junie-skills-structure, ref-junie-skills-format, ref-junie-skills-troubleshoot, ref-junie-skills-config, ref-junie-config-fields, ref-junie-env-skills, ref-junie-extensions-overview]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-junie-skills-usage, ref-junie-skills-overview, ref-junie-skills-manage, ref-junie-config-trust, ref-junie-skills-locations, ref-junie-extensions-overview]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-junie-skills-manage, ref-junie-skills-troubleshoot, ref-junie-extensions-overview, ref-junie-skills-locations]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-junie-skills-locations, ref-junie-skills-config, ref-junie-config-fields, ref-junie-env-skills, ref-junie-params-discovery]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-junie-skills-locations, ref-junie-skills-structure, ref-junie-skills-manage, ref-junie-extensions-overview]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-junie-skills-troubleshoot, ref-junie-skills-locations]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-junie-skills-structure, ref-junie-skills-format, ref-junie-skills-troubleshoot]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-junie-skills-config, ref-junie-config-fields, ref-junie-env-skills, ref-junie-extensions-overview]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-junie-skills-overview, ref-junie-skills-usage]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-junie-skills-usage, ref-junie-skills-manage]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: partial
        source_refs: [ref-junie-config-trust, ref-junie-skills-locations, ref-junie-extensions-overview, ref-junie-skills-manage]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-junie-skills-manage, ref-junie-skills-troubleshoot]
---

## 固定来源与适用范围 {#skills-scope}

本章的固定来源是官方仓库 `JetBrains/junie` 提交
`1ee36c003043b0fec340e61030e1c11862ba3a7f` 的 `README.md`（安装与认证入口），以及 Junie 官方文档站
`junie.jetbrains.com/docs` 中 `agent-skills.html`、`junie-cli-configuration.html`、
`environment-variables.html`、`parameters.html`、`junie-cli-extensions.html` 与
`junie-cli-subagents.html` 的对应快照。文档页面没有标注适用的 Junie 构建号，所以本章记录的是来源级
知识，不对应某个具体发行版。Junie CLI 是 JetBrains 的命令行编码 Agent，官方提供脚本、Homebrew
tap 与 npm 包 `@jetbrains/junie` 三种安装通道
[@ref-junie-quickstart-overview][@ref-junie-repo-install]。

Skill（Junie 文档称 Agent skill）与 guidelines 是两套不同机制：guidelines 每个提示都会附加，
Skill 只在任务匹配时被调用，用于按需披露名称、描述与正文
[@ref-junie-skills-overview]。

## 发现位置与作用域 {#skills-roots}

**skills.roots**。默认从两组主位置加载技能目录，另有四类补充来源：

- 项目作用域：项目根下的 `.junie/skills/`，每个技能一个子目录；可提交进版本库，供团队共享。
- 用户作用域：macOS/Linux 为 `~/.junie/skills/`，Windows 为 `%USERPROFILE%\.junie\skills\`，
  对本机所有项目可见且只属于当前用户。
- 跨 Agent 约定目录：项目根 `.agents/skills/`（仅受信任项目）与 `~/.agents/skills/`。
- 扩展提供的技能：随任何已安装 extension 一起打包。
- 自定义目录：`--skill-location` 或 `config.json` 的 `skill-locations` 指定的额外目录，可重复。
- 内置技能：随 Junie CLI 自身打包。

关闭开关作用于“默认的项目与用户位置（含 `.agents/skills/`）”，`--skill-default-locations false`
后内置技能、扩展技能与自定义目录仍然可用 [@ref-junie-skills-locations]。

`config.json` 里对应字段是 `skill-locations`（额外目录）与 `skill-default-locations`（是否启用默认
位置），相对路径以该配置文件所在目录为基准解析 [@ref-junie-config-fields][@ref-junie-skills-config]。
环境变量与 CLI 一一对应：`JUNIE_SKILL_LOCATIONS`/`--skill-location`、
`JUNIE_SKILL_DEFAULT_LOCATIONS`/`--skill-default-locations`（默认 `true`）
[@ref-junie-env-skills][@ref-junie-params-discovery]。

作用域边界由项目信任决定：在未受信任的项目里，Junie 不隐式加载项目配置、项目类技能（含项目
`.agents/skills/`）等项目来源，改用仓库之外的临时 Junie 目录，会话期间新增的技能随进程关闭而移除；
Junie Home 下的全局来源仍然启用 [@ref-junie-config-trust]。

**skills.discovery**：文档只说明了“扫描技能目录并挑选与当前任务相关的技能”，没有规定目录深度、
符号链接、忽略规则或嵌套目录的解析方式；扩展提供的技能只有在扩展安装后才可用
[@ref-junie-skills-locations][@ref-junie-extensions-overview]。技能目录必须含 `SKILL.md`，缺失该文件
的目录不被识别为技能，子目录（`scripts/`、`templates/`、`checklists/` 等）为可选资源
[@ref-junie-skills-structure]。ACP 客户端里的 `/skills` 会重新扫描技能目录并打印清单，可作为一次
显式重扫入口 [@ref-junie-skills-manage]。

## 目录结构与 SKILL.md 解析 {#skills-format}

**skills.format**。每个技能是一个独立目录，`SKILL.md` 为必填入口，其余子目录承载任意支持文件，
Junie 在需要时读取。`SKILL.md` 是带 YAML frontmatter 的 Markdown：frontmatter 以 `---` 开始、以
`---` 结束，正文在结束标记之后，应当写成可执行指令并指向技能目录内的参考文件
[@ref-junie-skills-structure][@ref-junie-skills-format]。

frontmatter 字段只有两个：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | String | 是 | 技能的唯一标识。 |
| `description` | String | 否 | 供 Junie 判断技能与当前任务相关性的简述。 |

`description` 省略时，Junie 会尝试从正文提取描述，但官方建议显式提供，以便更准确地匹配任务
[@ref-junie-skills-format]。文档没有说明除这两个字段之外的 frontmatter 键是被忽略还是报错，也没有
给出正文长度、编码以外的限制；解析要求 frontmatter 使用合法 YAML（禁止制表符、缩进正确），否则
技能加载失败 [@ref-junie-skills-troubleshoot]。

**skills.extensions**：除 frontmatter 两个字段外，宿主侧可配置项集中在发现位置——`skill-locations`/
`skill-default-locations`、`--skill-location`/`--skill-default-locations` 与
`JUNIE_SKILL_LOCATIONS`/`JUNIE_SKILL_DEFAULT_LOCATIONS`；扩展可以提供随包技能
[@ref-junie-skills-config][@ref-junie-config-fields][@ref-junie-env-skills][@ref-junie-extensions-overview]。
文档未描述技能自身的“专有字段”，因此本项按 partial 阅读：位置与开关已确立，字段级扩展规则缺失。

## 调用、选择与禁用 {#skills-invocation}

**skills.invocation**。Junie 自动调用技能：扫描技能目录后按任务相关性选择，并遵循技能指令读取引用
材料或执行打包脚本；也可显式调用——每个启用的技能都会作为 `/<技能名>` 斜杠命令广告出去，或在提示
中用 `$` 加技能名引用（输入 `$` 时给出匹配建议）。被禁用的技能同时退出自动选择、退出 `/<技能名>`
命令、退出 `$` 建议，其指令也不再进入上下文
[@ref-junie-skills-usage]。

**skills.loading**：采用渐进式披露——技能的 `name` 与 `description` 先对 Junie 可见，使其知道存在
哪些技能，只有在判断与任务相关后才读取完整正文，并进一步加载被引用的材料
[@ref-junie-skills-overview]。正文读取发生在技能被判定相关或被显式调用之后，而不是启动时全量注入。

管理入口是 `/skills`：交互式 TUI 打开管理界面（可按名称或描述搜索，用 `Enter`/`Space` 启停）；
ACP 客户端里 `/skills` 无参时重扫并列出 Enabled、Disabled、Errors 三段，启停用
`/skills <技能名> enable|disable`。禁用是持久化选择，跨会话记住，直到重新启用
[@ref-junie-skills-manage]。

**skills.conditions**：信任是主要条件——未受信任项目的项目级技能不加载 [@ref-junie-config-trust]；
`--skill-default-locations false` 会关掉默认项目/用户位置（含 `.agents/skills/`），但内置技能、扩展
技能与自定义目录仍在 [@ref-junie-skills-locations]；扩展技能只有在扩展安装后才生效
[@ref-junie-extensions-overview]；禁用状态是持久化的可用性开关
[@ref-junie-skills-manage]。文档未描述技能级别的功能开关或策略配置，这一项按 partial 阅读。

## 诊断与冲突 {#skills-diagnostics}

**skills.diagnostics**：`/skills` 是主要观察入口——ACP 形式把技能分为 Enabled（附可用的
`/<技能名>`）、Disabled 与 Errors（列出加载失败原因），并会重新扫描目录；TUI 形式打开交互管理界面
[@ref-junie-skills-manage]。加载失败时检查：frontmatter 是否为合法 YAML（无制表符、缩进正确）、是否
以 `---` 开始与结束、是否至少包含 `name`、文件权限与 UTF-8 编码 [@ref-junie-skills-troubleshoot]。
改动技能文件后，文档给出的重载方式是重新运行 `/skills`（ACP 会重扫目录），TUI 侧为打开管理界面；
扩展带来的技能在扩展安装后即时可用，无需重启进程 [@ref-junie-extensions-overview]。

**skills.collision**：官方给出的冲突规则是——项目级与用户级存在同名技能时，用户级技能被跳过
[@ref-junie-skills-troubleshoot]。文档没有说明多来源（扩展、内置、自定义目录）之间的完整搜索顺序或
命名空间，因此本项按 partial 阅读：同名去重规则已确立，完整优先级顺序未确立
[@ref-junie-skills-troubleshoot][@ref-junie-skills-locations]。
