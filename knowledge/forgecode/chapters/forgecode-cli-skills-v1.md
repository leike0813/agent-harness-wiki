---
schema_version: 3
record_kind: production
edition_id: forgecode-cli-skills-v1
harness_id: forgecode
topic: skills
title: "ForgeCode CLI 的 Agent Skills：来源目录、发现扫描、冲突解析与按需加载"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-forgecode-skills-claude, ref-forgecode-skills-loader, ref-forgecode-skills-locations]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-forgecode-skills-builtin, ref-forgecode-skills-dirs, ref-forgecode-skills-loader, ref-forgecode-skills-locations, ref-forgecode-skills-readme]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-forgecode-skills-discovery, ref-forgecode-skills-fetch, ref-forgecode-skills-loader, ref-forgecode-skills-locations]
  - section_id: skills-collision
    surface_ids: [cli]
    source_refs: [ref-forgecode-skills-conflict, ref-forgecode-skills-loader, ref-forgecode-skills-locations, ref-forgecode-skills-sort]
  - section_id: skills-format-loading
    surface_ids: [cli]
    source_refs: [ref-forgecode-skills-agent-include, ref-forgecode-skills-dirs, ref-forgecode-skills-discovery, ref-forgecode-skills-frontmatter, ref-forgecode-skills-instructions, ref-forgecode-skills-locations, ref-forgecode-skills-prompt, ref-forgecode-skills-render, ref-forgecode-skills-tool]
  - section_id: skills-invocation-diagnostics
    surface_ids: [cli]
    source_refs: [ref-forgecode-list-commands, ref-forgecode-skills-agent-include, ref-forgecode-skills-dirs, ref-forgecode-skills-fetch, ref-forgecode-skills-readme, ref-forgecode-skills-tool, ref-forgecode-skills-verify]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-forgecode-skills-dirs, ref-forgecode-skills-locations, ref-forgecode-skills-builtin]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-forgecode-skills-loader, ref-forgecode-skills-discovery, ref-forgecode-skills-fetch]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-collision
        status: answered
        source_refs: [ref-forgecode-skills-conflict, ref-forgecode-skills-loader, ref-forgecode-skills-locations]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format-loading
        status: answered
        source_refs: [ref-forgecode-skills-frontmatter, ref-forgecode-skills-locations]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format-loading
        status: answered
        source_refs: [ref-forgecode-skills-render, ref-forgecode-skills-discovery]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-format-loading
        status: answered
        source_refs: [ref-forgecode-skills-prompt, ref-forgecode-skills-instructions, ref-forgecode-skills-tool]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation-diagnostics
        status: answered
        source_refs: [ref-forgecode-skills-fetch, ref-forgecode-skills-verify, ref-forgecode-skills-agent-include]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation-diagnostics
        status: partial
        source_refs: [ref-forgecode-skills-dirs, ref-forgecode-skills-agent-include]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation-diagnostics
        status: partial
        source_refs: [ref-forgecode-skills-verify, ref-forgecode-skills-fetch]
---

## 固定来源与界面 {#skills-scope}

本章依据两类固定来源：官方仓库 `tailcallhq/forgecode` 固定 commit `571a28902b9c562594c02fd089fc58bf8595108f` 的检出（`crates/forge_repo/src/skill.rs` 的技能仓库、`crates/forge_domain/src/env.rs` 的路径推导、`crates/forge_services/src/tool_services/skill.rs` 的取用工具、`crates/forge_app/src/system_prompt.rs` 的注入点、内置 agent 模板 `crates/forge_repo/src/agents/forge.md` 与 `templates/forge-partial-skill-instructions.md`），以及 forgecode.dev 官方文档快照（`/docs/skills/` 与 `/docs/`）。界面口径为 catalog 唯一登记的 `cli`。[@ref-forgecode-skills-locations][@ref-forgecode-skills-loader]

ForgeCode 的技能就是“一个包含 `SKILL.md` 的目录”，格式与 Claude Code 的 SKILL.md 相同，文档明确说明无需转换 [@ref-forgecode-skills-locations][@ref-forgecode-skills-claude]。除技能目录外没有第二套技能格式。

## 技能来源目录与作用域 {#skills-roots}

技能目录由运行时环境对象推导，因此会随 `$FORGE_CONFIG`、home 目录和当前工作目录变化 [@ref-forgecode-skills-dirs][@ref-forgecode-skills-locations]：

| 来源 | 路径 | 作用域 |
| :-- | :-- | :-- |
| 项目级（CWD） | `{cwd}/.forge/skills/{skill-name}/SKILL.md` | 当前仓库，可提交到版本库 |
| agents 约定 | `~/.agents/skills/{skill-name}/SKILL.md` | 本机，跨工具共享；home 不可确定时跳过该来源 |
| 全局 | `{base_path}/skills/{skill-name}/SKILL.md` | 本机所有项目；文档写作 `~/forge/skills` |
| 内置 | 编译进二进制 | 始终可用 |

`base_path` 即全局配置目录（默认 `~/forge`，若不存在则为 `~/.forge`；设置了 `FORGE_CONFIG` 时完全由它决定，见配置章节），所以全局技能目录实际是 `{base_path}/skills` [@ref-forgecode-skills-dirs][@ref-forgecode-skills-loader]。仓库 README 把三处位置与同名优先级整理成表，结论与代码一致 [@ref-forgecode-skills-readme]。

内置技能共三个，由 `include_str!` 嵌入二进制并从 `forge://skills/...` 路径解析：`create-skill`、`execute-plan`、`github-pr-description` [@ref-forgecode-skills-builtin][@ref-forgecode-skills-readme]。

## 发现时机与扫描范围 {#skills-discovery}

技能在需要时整体重载：`ForgeSkillFetch` 用 `OnceCell` 缓存 `load_skills()` 的结果，首次取用或列出时执行一次，进程内后续调用直接命中缓存；`load_skills()` 依次加载内置、全局、agents、项目四个来源后做冲突消解 [@ref-forgecode-skills-loader][@ref-forgecode-skills-fetch]。

每个来源目录的扫描规则固定在 `load_skills_from_dir` 中 [@ref-forgecode-skills-discovery]：

- 目录不存在时静默返回空列表，不影响其他来源。
- 以 `max_depth = 1`、无广度上限遍历，只把**一级子目录**当作候选技能目录；不会递归发现嵌套技能目录。
- 候选中只有同时也存在 `SKILL.md` 的目录才算技能；子目录按路径排序后并行读取。
- 入选技能目录内的所有文件（递归遍历，排除 `SKILL.md` 本身）都记为资源文件，并随技能一起排序保存。
- 读取单个技能文件失败只记 `tracing::warn!` 日志并跳过该技能，不中断其他技能加载。

文档只说明“三处位置”和“同名时高优先级获胜”，没有描述扫描深度或符号链接策略 [@ref-forgecode-skills-locations]。

## 重名冲突与优先级 {#skills-collision}

四个来源按“内置 → 全局 → agents → 项目”的顺序追加到一个列表，再由 `resolve_skill_conflicts` 按技能名去重、**保留最后出现的条目**，因此最终优先级是：项目级 > `~/.agents/skills` > 全局 > 内置 [@ref-forgecode-skills-loader][@ref-forgecode-skills-conflict]。文档给出的顺序是“project > agents > global > built-in”，与代码一致 [@ref-forgecode-skills-locations]。

去重键是技能名：内置技能用 frontmatter 的 `name`，磁盘技能同样优先用 `name`；因此仅改目录名不能规避冲突。冲突解决后按 `name`、文件路径、`description` 三级排序输出，资源文件单独按路径排序 [@ref-forgecode-skills-sort]。技能没有命名空间前缀机制，同名技能只有一个存活——文档也没有承诺“合并”语义。

## SKILL.md 的格式、扩展与上下文加载 {#skills-format-loading}

磁盘上的 `SKILL.md` 先按 `---` YAML front matter 解析：`SkillMetadata` 只识别两个字段 `name` 与 `description`，两者**必须同时存在**才构造技能；任一缺失时回退为“目录名作技能名、`description` 为空、正文为整份文件内容（含 front matter）” [@ref-forgecode-skills-frontmatter]。解析后的技能对象保存 `name`、`path`、`command`（正文）、`description`、`resources` [@ref-forgecode-skills-frontmatter]。

宿主专有扩展只有两项 [@ref-forgecode-skills-render][@ref-forgecode-skills-discovery]：

| 扩展 | 位置 | 作用 |
| :-- | :-- | :-- |
| 路径占位符 | 技能正文中的 `{{global_skills_path}}`、`{{agents_skills_path}}`、`{{local_skills_path}}` | 加载后替换为实际目录字符串，便于技能内脚本引用技能目录 |
| 资源文件 | 技能目录内除 `SKILL.md` 外的所有文件（递归） | 作为技能资源列表随技能一起展示给模型 |

没有为技能目录设置配置键：目录集合完全由环境推导，`.forge.toml` 与 JSON schema 的顶层字段中都不存在技能开关 [@ref-forgecode-skills-dirs]。

上下文加载分两步。构建系统提示时 `SystemPrompt::add_system_message` 调用 `list_skills()`，把技能的 `name` 与 `description` 注入 `SystemContext.skills`，再由内置 agent 模板渲染成 `available_skills` 列表；**正文不进入提示** [@ref-forgecode-skills-prompt][@ref-forgecode-skills-instructions]。模型随后调用 `skill` 工具按名取回技能，工具返回完整正文（`command`）与资源清单后才读取步骤 [@ref-forgecode-skills-tool][@ref-forgecode-skills-instructions]。内置 `forge` agent 的模板通过 `{{> forge-partial-skill-instructions.md}}` 引入这段说明，因此只有采用该模板的 agent 才会看到技能用法约定 [@ref-forgecode-skills-agent-include]。

文档的说法与代码吻合但更粗略：“ForgeCode 在会话开始时读取所有技能，并按你的请求自动应用相关技能” [@ref-forgecode-skills-locations]。

## 调用、生效条件与诊断 {#skills-invocation-diagnostics}

调用由模型侧驱动：`skill` 工具接收 `name` 参数，在已缓存列表中按名精确匹配，命中后返回 `Skill`（含正文与资源），未命中报错 `Skill '...' not found. Please check the available skills list.` [@ref-forgecode-skills-fetch][@ref-forgecode-skills-tool]。同一 `skill` 工具也是内置 agent 工具清单中的一项，配置了工具裁剪的 agent 若不含 `skill`，就不能调用技能 [@ref-forgecode-skills-agent-include]。

用户侧入口有三条：会话内用 `:skill` 列出所有可用技能及其描述；CLI 用 `forge list skill`（别名 `skills`）列出；文档也建议直接让模型显式点名技能 [@ref-forgecode-skills-verify][@ref-forgecode-skills-readme][@ref-forgecode-list-commands]。

生效条件方面，源码没有发现信任门、启用开关或策略过滤：技能不属于 `permissions.yaml` 的受管工具族，项目级 `.forge/skills` 会被直接读取（不同于 `.mcp.json` 的项目信任提示）；唯一可影响的间接条件是技能是否被当前 agent 的工具集合包含，以及 home 目录是否可确定（决定 `~/.agents/skills` 是否参与） [@ref-forgecode-skills-dirs][@ref-forgecode-skills-agent-include]。本节可验证的结论以源码为准；“是否存在其他未文档化的启用开关”在固定来源内没有证据，属于本回答的缺口。

诊断按“发现 → 选择 → 调用”分层 [@ref-forgecode-skills-verify][@ref-forgecode-skills-fetch]：

- 发现/选择：`:skill` 或 `forge list skill` 输出技能名与描述，看不到正文与资源路径。
- 调用：模型调用 `skill` 工具后返回的技能详情块中包含技能路径（`command` 元素的 `path` 属性）、完整正文与资源清单，可直接核对是否命中预期文件。
- 重载：技能列表在进程内被 `OnceCell` 缓存，改动目录或 `SKILL.md` 后需重启会话/CLI 才会重新加载；源码未提供独立的“重载技能”命令（`:config-reload` 针对的是会话配置覆盖，不是技能缓存）。[INFERENCE] 该判断依据缓存实现与 CLI 命令清单，未在运行时验证。
