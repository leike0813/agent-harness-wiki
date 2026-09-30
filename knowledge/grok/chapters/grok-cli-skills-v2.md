---
schema_version: 3
record_kind: production
edition_id: grok-cli-skills-v2
harness_id: grok
topic: skills
title: "Grok Build CLI 的 Skills：位置、格式、发现、调用与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-grok-skills-priority-doc, ref-grok-docs-skills-discovery]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-grok-skills-doc-locations, ref-grok-skills-doc-extra-dirs, ref-grok-skills-paths-rs, ref-grok-skills-config-dirs, ref-grok-skills-config-paths, ref-grok-skills-bundled-dir, ref-grok-skills-doc-bundled, ref-grok-docs-skills-discovery, ref-grok-docs-skills-agents, ref-grok-docs-skills-claude, ref-grok-skills-env-paths, ref-grok-skills-config-fields, ref-grok-skills-plugin-scope]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-grok-skills-doc-what, ref-grok-skills-doc-skillmd, ref-grok-skills-doc-core-fields, ref-grok-skills-doc-optional-fields, ref-grok-skills-nameslug-test, ref-grok-skills-nofrontmatter-test, ref-grok-docs-skills-discovery, ref-grok-skills-doc-locations]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-grok-skills-priority-doc, ref-grok-skills-skills-before-commands, ref-grok-skills-no-gitignore, ref-grok-skills-nested-test, ref-grok-skills-depth-test, ref-grok-skills-parent-child-test, ref-grok-skills-doc-locations, ref-grok-skills-doc-extra-dirs, ref-grok-skills-dedupe-name, ref-grok-skills-rekey, ref-grok-skills-plugin-identity, ref-grok-skills-plugin-merge, ref-grok-skills-doc-qualified, ref-grok-docs-skills-discovery, ref-grok-skills-ignore-filter, ref-grok-skills-doc-what]
  - section_id: skills-loading-invocation
    surface_ids: [cli]
    source_refs: [ref-grok-skills-inject, ref-grok-skills-doc-run, ref-grok-skills-doc-auto, ref-grok-skills-doc-best, ref-grok-skills-doc-optional-fields, ref-grok-docs-modes-skills, ref-grok-docs-skills-discovery, ref-grok-slash-skills-section, ref-grok-slash-autocomplete, ref-grok-skills-doc-create, ref-grok-skills-doc-inspect]
  - section_id: skills-conditions-diagnostics
    surface_ids: [cli]
    source_refs: [ref-grok-skills-trust-gate, ref-grok-skills-untrusted-test, ref-grok-skills-doc-locations, ref-grok-skills-config-dirs, ref-grok-skills-doc-compat, ref-grok-skills-doc-config, ref-grok-skills-env-paths, ref-grok-skills-plugin-trusted, ref-grok-plugins-trust, ref-grok-plugins-install, ref-grok-plugins-contents, ref-grok-plugins-where, ref-grok-skills-doc-bundled, ref-grok-skills-doc-inspect, ref-grok-skills-watcher, ref-grok-skills-doc-create, ref-grok-slash-skills-cmd, ref-grok-skills-config-fields, ref-grok-skills-paths-rs, ref-grok-skills-doc-extra-dirs, ref-grok-skills-priority-doc]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-grok-skills-doc-locations, ref-grok-skills-doc-extra-dirs, ref-grok-skills-paths-rs, ref-grok-skills-config-dirs, ref-grok-skills-config-paths, ref-grok-skills-bundled-dir, ref-grok-skills-doc-bundled, ref-grok-docs-skills-discovery, ref-grok-docs-skills-agents, ref-grok-docs-skills-claude, ref-grok-skills-env-paths, ref-grok-skills-config-fields, ref-grok-skills-plugin-scope]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: partial
        source_refs: [ref-grok-skills-priority-doc, ref-grok-skills-skills-before-commands, ref-grok-skills-no-gitignore, ref-grok-skills-nested-test, ref-grok-skills-depth-test, ref-grok-skills-parent-child-test, ref-grok-skills-doc-locations, ref-grok-skills-doc-extra-dirs, ref-grok-skills-doc-what]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-grok-skills-dedupe-name, ref-grok-skills-rekey, ref-grok-skills-plugin-identity, ref-grok-skills-plugin-merge, ref-grok-skills-doc-qualified, ref-grok-skills-doc-locations, ref-grok-skills-priority-doc, ref-grok-docs-skills-discovery]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-grok-skills-doc-what, ref-grok-skills-doc-skillmd, ref-grok-skills-doc-core-fields, ref-grok-skills-doc-optional-fields, ref-grok-skills-nameslug-test, ref-grok-skills-nofrontmatter-test, ref-grok-docs-skills-discovery, ref-grok-skills-doc-locations]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-grok-skills-doc-optional-fields, ref-grok-docs-skills-discovery, ref-grok-skills-nameslug-test]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-grok-skills-inject, ref-grok-skills-doc-best, ref-grok-skills-doc-run, ref-grok-skills-doc-inspect]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-grok-skills-doc-run, ref-grok-skills-doc-auto, ref-grok-skills-doc-optional-fields, ref-grok-docs-modes-skills, ref-grok-docs-skills-discovery, ref-grok-slash-skills-section, ref-grok-slash-autocomplete, ref-grok-skills-doc-create]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: answered
        source_refs: [ref-grok-skills-trust-gate, ref-grok-skills-untrusted-test, ref-grok-skills-doc-locations, ref-grok-skills-config-dirs, ref-grok-skills-doc-compat, ref-grok-skills-doc-config, ref-grok-skills-env-paths, ref-grok-plugins-trust, ref-grok-plugins-install, ref-grok-plugins-contents, ref-grok-plugins-where, ref-grok-skills-doc-bundled, ref-grok-skills-priority-doc, ref-grok-skills-config-fields, ref-grok-skills-paths-rs]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: answered
        source_refs: [ref-grok-skills-doc-inspect, ref-grok-skills-watcher, ref-grok-skills-doc-create, ref-grok-slash-skills-cmd]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 本章的固定来源与范围 {#skills-scope}

本章只覆盖单一界面 `cli`（`surface_id: cli`）。在 Grok 里，Skill 是一个「目录包」：目录中含一个 `SKILL.md`，其 markdown 正文就是让 agent 在特定任务上遵循的指令 [@ref-grok-docs-skills-discovery]。`skills.rs` 是「把发现的 skill 注入系统提示」的入口，文件头注释写明的发现优先级为 local、intermediate、repo、user、extra paths、server、bundled，同名时高优先级来源覆盖低优先级来源 [@ref-grok-skills-priority-doc]。

固定来源为三类：

1. 仓库 `xai-org/grok-build` 提交 `2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8` 的源码与用户指南：`crates/codegen/xai-grok-agent/src/prompt/skills.rs`、`paths.rs`，以及 `crates/codegen/xai-grok-pager/docs/user-guide/` 下的 `08-skills.md`、`05-configuration.md`、`09-plugins.md`、`04-slash-commands.md`。
2. 官方文档站快照 `skills-plugins` 与 `modes`。
3. 上述 markdown 快照自身。

必须说明的边界：`skills.rs` 依赖的扫描／解析原语（`walk_for_skill_md`、`find_skill_paths`、`find_skill_md_paths`、`parse_skill_files`、`SKILL_SUBDIRS`、`MAX_SKILL_WALK_DEPTH`、`load_skill_with_body` 等）都来自 `xai_grok_tools` crate，而该 crate 不在本次固定的 checkout 内（checkout 下只有 `xai-grok-agent`、`xai-grok-config`、`xai-grok-hooks`、`xai-grok-pager`、`xai-grok-workspace`、`xai-hooks-plugins-types`）。所以「递归扫描的深度上限具体是几层」「是否跟随符号链接」这类只能在 `xai_grok_tools` 中确认的点，本章一律按缺口处理，只写 `skills.rs` 及其测试明确建立的行为。

## Skill 的查找位置与优先级 {#skills-roots}

用户指南给出的查找位置与优先级（路径按原文字面）[@ref-grok-skills-doc-locations]：

| 位置 | 作用域 | 优先级 | 说明 |
| --- | --- | --- | --- |
| `./.grok/skills/`、`./.grok/commands/` | Local（当前目录） | 最高 | 当前目录 skill／旧式命令 markdown |
| 仓库根下 `.grok/skills/`、`…/commands/` | Repo | 中 | 仓库内共享 |
| `~/.grok/skills/`、`~/.grok/commands/` | User | 最低 | 个人 skill，所有项目可用 |
| `~/.claude/skills/`、`~/.claude/commands/` | User | 最低 | Claude Code 兼容（可关闭） |
| `./.claude/skills/`、`./.claude/commands/` | Local / Repo | 高 | 项目级 Claude skill 与旧式自定义斜杠命令 |
| `~/.cursor/skills/` | User | 最低 | Cursor 兼容（可关闭） |
| `./.cursor/skills/` | Local / Repo | 高 | 项目级 Cursor skill（启用 cursor 兼容时） |

除 `.grok/` 外，Grok 还会在每一层扫描同级的 `.agents/skills/`（以及 `commands/`），并从当前工作目录逐级向上走到仓库根 [@ref-grok-skills-doc-locations]。`commands/` 下的扁平 `*.md` 文件按文件名主干（stem）变成用户可调用的斜杠命令，对齐 Claude Code 的旧式自定义命令布局 [@ref-grok-skills-doc-locations]。文档站补充：AGENTS.md 兼容侧还会发现用户级 `~/.agents/skills/` 与 `~/.agents/commands/`，并自动以零配置方式读取 Claude Code 的 skills 等 [@ref-grok-docs-skills-agents][@ref-grok-docs-skills-claude]；文档站的发现清单同样列出 `./.grok/skills/`（向上走到仓库根）、`~/.grok/skills/`、每个已启用插件的 `skills/` 目录，以及 `[skills] paths` 额外路径 [@ref-grok-docs-skills-discovery]。

路径如何随环境变化：

- home 由 `GROK_HOME` 覆盖（默认 `~/.grok`），所以 `~/.grok/...` 这一族根目录随它移动 [@ref-grok-skills-env-paths]。
- 仓库根由 git 仓库边界决定；`collect_skill_config_dirs_from_sources` 用 `StartupProjectSources` 展开项目侧目录，用户级 `.grok` 取自 `grok_home`，`~/.agents` 始终加入，而 `~/.claude`、`~/.cursor` 只有在对应兼容开关打开时才加入 [@ref-grok-skills-config-dirs]。
- 当前目录决定 Local 层以及向上扫描的起点；`[skills] paths` 条目按是否落在 git root 之内分别记 `Repo` 或 `User` 作用域 [@ref-grok-skills-config-paths]。

代码里还有三类用户指南表格未列全的来源：

- `[skills] paths` 配置项声明的额外目录。每项是一个 `SKILL.md` 文件，或一个会被递归遍历的目录；`~` 会被展开；路径在 git root 之内记 `Repo` 作用域，否则记 `User` [@ref-grok-skills-config-paths]。字段定义见 `SkillsConfig` 的 `paths` / `ignore` / `disabled`，另有启动器注入的 `server_skill_dirs`（Server 作用域）与 `bundled_skill_dirs`（Bundled 作用域）[@ref-grok-skills-config-fields]。
- 随平台分发的 bundled skill：默认缓存在 `~/.grok/bundled/skills/`，Grok 从不把它们写进 `~/.grok/skills/`；代码在全局发现阶段额外扫描 `{grok_home}/bundled` 下的 skill 路径并标记为 `Bundled` [@ref-grok-skills-doc-bundled][@ref-grok-skills-bundled-dir]。
- 插件自带的 skill：插件被停止或未受信任时不可用（见「生效条件」小节）。插件的 `PluginScope` 会映射到 skill 作用域：`CliOverride` 记为 `Local`、`Project` 记为 `Repo`、`User` 记为 `User`、`ConfigPath` 记为 `Plugin` [@ref-grok-skills-plugin-scope]。

最小配置示例（来自用户指南的 `[skills]` 块，语法有固定来源）[@ref-grok-skills-doc-extra-dirs]：

```toml
[skills]
paths = ["~/my-team-skills"]          # 额外扫描目录
ignore = ["~/my-team-skills/wip"]     # 完全隐藏的前缀路径
disabled = ["wip-skill"]              # 仍列出但不激活的 skill 名
```

`[paths] extra_skill_dirs` 是 `/import-claude` 写入的 Claude skill 位置，用来让 Claude skill 位置在运行时 `.claude/` 切断后仍保留；它**不会**注入 skill，真正的额外注入目录要放进 `[skills] paths` [@ref-grok-skills-doc-extra-dirs][@ref-grok-skills-paths-rs]。

缺口：`skills.rs` 用的 `SKILL_SUBDIRS` 是复数，而文档只列出 `skills` 一个子目录名，无法从固定来源确认它是否还包含旧式别名；`[skills] paths` 之外的目录是否支持平台相关的默认位置也未在来源中展开。

## SKILL.md 的目录结构、frontmatter 与字段 {#skills-format}

Skill 是目录包，目录内必须有一个 `SKILL.md` [@ref-grok-skills-doc-what]。用户指南给出的目录形状（`{...}` 为普通文本占位符）[@ref-grok-skills-doc-skillmd]：

```text
~/.grok/skills/
  commit/
    SKILL.md
  review-pr/
    SKILL.md
```

`SKILL.md` 以 YAML frontmatter 开头，`---` 之后是 markdown 指令正文 [@ref-grok-skills-doc-skillmd]：

```markdown
---
name: commit
description: Create well-formatted git commits following conventional commit standards. Use when the user wants to commit changes or asks for /commit.
---

# Git Commit Skill

Review staged changes and create a commit with a clear, conventional message.
```

核心 frontmatter 字段（用户指南逐字给出）[@ref-grok-skills-doc-core-fields]：

| 字段 | 说明 |
| --- | --- |
| `name` | skill 标识符；小写字母、数字与连字符，最多 64 字符；空格与下划线会被规范成连字符；省略时取目录名 |
| `description` | 做什么、何时用；Grok 据此判断是否调用；省略时取正文首段 |

可选字段（仓库用户指南表）[@ref-grok-skills-doc-optional-fields]：

| 字段 | 说明 |
| --- | --- |
| `when-to-use` | 自动调用的触发短语，与 `description` 分开保存 |
| `allowed-tools` | skill 使用的工具，YAML 列表或逗号／空格分隔字符串 |
| `argument-hint` | 斜杠命令补全提示，例如 `commit message` |
| `user-invocable` | 是否可作为斜杠命令运行，默认 `true`；设 `false` 从斜杠命令隐藏 |
| `disable-model-invocation` | 为 `true` 时只能由斜杠命令触发，模型不能自动调用；默认 `false` |
| `model` | 运行该 skill 的模型覆盖 |
| `effort` | 推理强度覆盖 |
| `license` | 许可证标识，例如 `Apache-2.0` |
| `compatibility` | 环境要求，例如 `Requires git, docker, jq` |
| `metadata` | 任意字符串键值对；Grok 会把 `metadata.author` 与 `metadata.short-description` 提升出来做展示 |

文档站快照的字段表与仓库指南大体一致，但对若干字段给出了更细的取值语义：`when-to-use` 有别名 `when_to_use`；`paths` 是「gitignore 风格 glob，未触及匹配文件前隐藏」；`user-invocable` 只有字面量 `true` 才算真（`yes` 按假处理），设 `false` 会同时对用户与模型隐藏该 skill；`allowed-tools` 既不授予也不限制工具；`model`、`effort`、`license`、`compatibility` 会被接受但**不套用**；未识别的额外键被忽略 [@ref-grok-docs-skills-discovery]。

**两个来源存在冲突，此处并列展示，不择一：**

- `model` / `effort`：仓库用户指南把 `model` 写成「运行该 skill 的模型覆盖」、`effort` 写成「推理强度覆盖」[@ref-grok-skills-doc-optional-fields]；文档站快照则明确写「接受 `model`、`effort`、`license`、`compatibility` 但不套用它们」[@ref-grok-docs-skills-discovery]。
- `allowed-tools`：仓库用户指南写「skill 使用的工具」[@ref-grok-skills-doc-optional-fields]；文档站快照写「不授予也不限制工具」[@ref-grok-docs-skills-discovery]。

两处都需要以实际运行观察为准；固定来源无法判定哪一侧描述当前二进制，故本节把两者都保留。

解析行为中，`skills.rs` 的测试建立了几条用户指南未写的规则：

- `name` 会被规范化：空格折叠并转连字符、大小写统一、去除首尾空白；非法 slug（首尾连字符、连续连字符）会被拒绝；无法规范出可用名字的（例如纯符号）整条 skill 被拒绝并报 `InvalidName` [@ref-grok-skills-nameslug-test]。
- 没有 frontmatter 的 `SKILL.md` 仍然成为 skill：名字取目录名，且默认可被用户调用（`user-invocable`）[@ref-grok-skills-nofrontmatter-test]。
- `commands/` 下的 `*.md` 与 `SKILL.md` 共用同一套解析：有 frontmatter 时用其 `name`，无 frontmatter 时用文件名主干 [@ref-grok-skills-doc-locations]。

缺口：`metadata` 之外的任意键「被忽略」这一点只有文档站快照支持，`parse_skill_frontmatter` 的实现不在固定 checkout 内，无法逐键核对；正文是否有独立长度或结构校验也未在固定来源中给出。

## 发现时机、扫描范围与同名消解 {#skills-discovery}

**时机。** 交互式启动时做一次发现；用户指南与文档站都把 skill 名单（名称与描述）描述为启动后即可见 [@ref-grok-skills-priority-doc]。技能一旦写入磁盘上的已知根目录，斜杠菜单「几秒内」就会出现，因为 Grok 在文件变化时重载 skill（见「诊断与重载」小节）[@ref-grok-skills-doc-locations]。

**扫描范围与深度。** 发现按顺序处理各配置目录：先收 skill，再收 commands，所以同名冲突中 skill 胜出（`SkillsConfig` 先 `find_skill_paths` 后 `find_command_paths`）[@ref-grok-skills-skills-before-commands]。扫描是递归的：`skills.rs` 的测试确认平铺、单层嵌套、两层嵌套以及「父目录与子目录各含一个 SKILL.md」都会被收下 [@ref-grok-skills-nested-test][@ref-grok-skills-parent-child-test]。递归有一个深度上限（测试构造了超过 `MAX_SKILL_WALK_DEPTH` 的目录链，深处 skill 未被收下，仅浅层 skill 通过）[@ref-grok-skills-depth-test]。Skill 必须是含 `SKILL.md` 的目录，不含 `SKILL.md` 的目录不会被当作 skill [@ref-grok-skills-doc-what]。

**忽略规则。** skill 与命令的发现**不使用** `.gitignore`：位于已知 skill 根（`.grok/`、`.agents/`、`.claude/`、`.cursor/`）之下的路径只要在磁盘上存在就会加载；代码注释解释了为何特意无视 gitignore（团队常把 `.claude/**` 当本地配置忽略，又指望项目命令可用）[@ref-grok-skills-no-gitignore][@ref-grok-skills-doc-locations]。要隐藏 skill 用 `[skills] ignore`；`ignore` 取文件系统路径（支持 `~`），任一 skill 的解析路径落在某个 ignore 前缀之下即被过滤掉（`filter_skills` 用 `canonical_path.starts_with(ignore)`，路径过长时 fail-open 保留）[@ref-grok-skills-doc-extra-dirs][@ref-grok-skills-ignore-filter]。被 `ignore` 命中的 skill 完全不参与发现；要临时停用但仍保留在列表中，请改用 `disabled` [@ref-grok-skills-doc-extra-dirs]。

**同名消解。** 规则分几层：

- 按名字去重，先见者胜；高优先级来源的 skill 覆盖低优先级的同名 skill [@ref-grok-skills-dedupe-name][@ref-grok-skills-priority-doc]。`Server` 与 `Bundled` 作用域按设计总是被同名者遮蔽，且不会被 re-key 救回 [@ref-grok-skills-dedupe-name]。
- 同一作用域内两个 skill 共用同一个 frontmatter `name` 时，**两者都保留**：挑战者被改按其目录主干重新命名（frontmatter 名成为显示标签）；若挑战者本身就是目录名拥有者，则让原名回归，必要时驱逐先前占用该名的一方 [@ref-grok-skills-rekey][@ref-grok-skills-dedupe-name]。
- 插件 skill 的身份是「插件的目录主干」而非 frontmatter `name`，因此插件内兄弟 skill 不会互相撞名（例如两个都叫 `deploy` 的 skill 分别变成 `deploy-prod`、`deploy-staging`，显示名仍为 `deploy`）[@ref-grok-skills-plugin-identity]。
- 原生 skill 始终赢得裸名解析；插件 skill 与原生同名时其裸名被遮蔽，但保留「限定名」形式继续可用 [@ref-grok-skills-plugin-merge]。

**限定名。** 当 skill 名与另一 skill 或内置命令冲突时，Grok 让两者都可调用：内置命令保留裸名（`/login`、`/compact` 等），skill 以作用域前缀广告，前缀为 `local:`、`repo:`、`user:` 或插件名，例如 `/local:commit`、`/user:commit`、`/acme:login`；斜杠菜单会同时列出两行并带右侧徽标区分 [@ref-grok-skills-doc-qualified]。`grok inspect` 会给冲突项加 `[collides with /login → /acme:login]` 之类的标注 [@ref-grok-skills-doc-qualified]。文档站也把跨作用域重名写成「用限定形式」[@ref-grok-docs-skills-discovery]。

缺口：`MAX_SKILL_WALK_DEPTH` 的数值、是否跟随符号链接、以及 `ignore` 之外的排除清单（例如 `.ignore`/`.grokignore`）语义，固定来源都没有建立——`walk_for_skill_md` 与常量定义在缺失的 `xai_grok_tools` 中。已检查的入口：`skills.rs` 全文与测试、`08-skills.md`、文档站 `skills-plugins` 快照。

## 加载与调用 {#skills-loading-invocation}

**加载。** 发现的产物带 `name`、`description`、`source`（含 `SKILL.md` 路径）与 `userInvocable` 标志，供 `grok inspect` 展示 [@ref-grok-skills-doc-inspect]。只有把正文装入后，正文才会作为纯 markdown 注入提示：`format_skill_for_injection` 在 skill 的 `body` 非空时用 `build_skill_message` 生成消息，多个 skill 以空行分隔拼接，外层不加 XML 包壳 [@ref-grok-skills-inject]。也就是说名称与描述用于「决定是否调用」，正文在被激活或预加载时才进入上下文。正文有内联上限：Grok 最多内联 skill 正文的前 25,000 tokens（与 `read_file` 同一上限），长参考资料应放进同目录的兄弟文件、由模型按 `read_file` 的 offset/limit 读取 [@ref-grok-skills-doc-best]。

**显式调用。** 每个 `user-invocable: true` 的已启用 skill 就是一条斜杠命令，命令名即 skill 名，例如 `~/.grok/skills/commit/SKILL.md` 运行 `/commit`；可以带参数，例如 `/commit fix typo in README`，参数写在名字之后 [@ref-grok-skills-doc-run][@ref-grok-slash-skills-section]。运行 skill 会把它的指令载入对话并指导模型遵循 [@ref-grok-skills-doc-run]。名称冲突时使用限定形式（见上一小节）[@ref-grok-slash-skills-section]。输入 `/` 打开斜杠菜单即可模糊过滤全部内置命令与 skill，每行显示命令名、描述、参数提示与来源 [@ref-grok-slash-autocomplete]。

**自动调用。** Grok 识别到相关任务时可以自行调用 skill：把提示与 skill 的 `description`、`when-to-use` 匹配，所以两者都应写清触发情境；例如描述里写「Use when the user wants to commit changes」，则「commit my changes」可能自动触发该 skill [@ref-grok-skills-doc-auto][@ref-grok-skills-doc-optional-fields]。要禁止自动调用、只允许斜杠命令，设 `disable-model-invocation: true` [@ref-grok-skills-doc-auto][@ref-grok-skills-doc-optional-fields]。反向地，`user-invocable: false` 会把 skill 从斜杠菜单与 `/{name}` 解析中隐藏 [@ref-grok-skills-doc-optional-fields]；文档站进一步说明它同时对用户与模型隐藏，且只有字面 `true` 才视为可调用 [@ref-grok-docs-skills-discovery]。文档站的 `modes` 快照把同一机制简写为「任何用户可调用的 skill 也可作为斜杠命令出现，重名用限定形式」[@ref-grok-docs-modes-skills]。

**创建与生效。** `/create-skill` 会交互式询问名称、作用域与描述，然后创建 `{scope}/.grok/skills/{name}/` 目录并写 `SKILL.md`（以及按需的 `scripts/`、`references/` 子目录），最后回读确认；内建推荐项目作用域 `{repo_root}/.grok/skills/{name}/` 或用户作用域 `~/.grok/skills/{name}/` [@ref-grok-skills-doc-create]。新建 skill 会在数秒内出现在斜杠菜单，因为 Grok 在文件变化时重载 [@ref-grok-skills-doc-create]。

缺口：发现产物「名称+描述」在系统提示中的确切排布、激活后如何按需读取 `scripts/`／`references/` 资源（读取顺序、工具调用约定）、以及 25,000-token 上限在何处截断（按字节还是按 token 计数）都没有在固定来源中逐字给出；`build_skill_message` 与 `load_skill_with_body` 的实现不在 checkout 内。

## 生效条件、诊断与重载 {#skills-conditions-diagnostics}

**文件夹信任。** 「不受信任的文件夹里，启动发现会跳过项目 skill 和命令」是用户指南开篇即点明的条件 [@ref-grok-skills-doc-locations]。代码层面，`list_skills_with_plugins` 在项目未受信任时把 `cwd` 与工作区用户目录一并传 `None`，于是项目链与工作区用户覆盖层都不被发现；`has_project_skill_dirs_in` 则对所有厂商（不理会运行时兼容开关）检查项目链上是否存在 skill/commands 目录，只要存在就仍需要信任 [@ref-grok-skills-trust-gate]。测试逐一对 `.grok`、`.agents`、`.claude`、`.cursor` 四种根目录验证：受信任时项目 skill 与命令都会加载，不受信任时都被略去 [@ref-grok-skills-untrusted-test]。

**厂商兼容开关。** Claude 与 Cursor 的 skill 目录默认扫描；要停止扫描某个厂商，在 `~/.grok/config.toml` 的 `[compat.claude]` 或 `[compat.cursor]` 下把 `skills` 设为 `false`，或把 `GROK_CURSOR_SKILLS_ENABLED`、`GROK_CLAUDE_SKILLS_ENABLED` 环境变量设为 `false`；无论这些设置如何，已知的厂商自带默认 skill（如 Cursor 的 `shell`、`canvas`、`statusline`）总会被过滤掉 [@ref-grok-skills-doc-locations]。解析顺序是环境变量覆盖 config.toml、config.toml 覆盖默认（开）；需要会话启动才能解析的单元在 `grok inspect` 里先显示 `?`，显式环境变量或 TOML 值的单元用该值 [@ref-grok-skills-doc-compat]。代码只在 `compat.claude.skills` / `compat.cursor.skills` 为真时把 `~/.claude` / `~/.cursor` 加入配置目录，而 `~/.agents` 始终加入 [@ref-grok-skills-config-dirs]。

**`[skills]` 配置生效。** `paths` 增加扫描目录，`ignore` 取路径前缀把 skill 完全隐藏，`disabled` 取 skill 名——被 disabled 的 skill 仍保留在列表里（与 `ignore` 的「彻底隐藏」不同），但被排除出系统提示与 skill 工具调用 [@ref-grok-skills-doc-extra-dirs][@ref-grok-skills-config-fields]；`grok inspect` 会给它们加 `[disabled]` 标签 [@ref-grok-skills-doc-inspect]。配置键 `skills.paths`、`skills.disabled` 在配置参考中登记为大小写 `yes`、`user`（用户可设置）；`paths.extra_skill_dirs` 被标注为「skill 注入会忽略、应改用 `[skills] paths`」 [@ref-grok-skills-doc-config][@ref-grok-skills-paths-rs]。`GROK_HOME` 覆盖配置目录，进而改变 `~/.grok/...` 一族根目录 [@ref-grok-skills-env-paths]。

**插件来源的 skill 依赖插件状态。** 插件的 `skills/` 目录是其可选组件之一（与 commands、agents、hooks、MCP、LSP 并列）[@ref-grok-plugins-contents]。已启用插件必须先受信任才加载 skills、commands、hooks、MCP、LSP：`~/.grok/plugins/` 下的插件自动受信任，项目 `.grok/plugins/` 下的需要信任，用 `grok plugin install {source} --trust` 授予 [@ref-grok-plugins-trust][@ref-grok-plugins-install]。代码侧 `collect_plugin_skills` 只遍历 `registry.active_plugins()`（已启用且受信任的插件），未受信任的插件 skill 对模型不可见 [@ref-grok-skills-plugin-trusted]。插件按位置有不同的作用域与信任（会话注入、`--plugin-dir`、项目、用户、`[plugins].paths`）[@ref-grok-plugins-where]。

**bundled 与插件的覆盖差异。** 同名的 local、repo 或 user skill 会覆盖 bundled 副本；发现优先级里 server 排在 bundled 之前，所以同名时 server 侧胜出 [@ref-grok-skills-doc-bundled][@ref-grok-skills-priority-doc]。但**同名的插件 skill 不会覆盖原生 skill**，它只保留限定名形式 [@ref-grok-skills-doc-bundled]。

**诊断。** `grok inspect` 列出每种 skill 及其来源，来源取值为 `project`、`user`、`bundled`、`config`（来自 `[skills].paths` 条目）、`server`（托管工作区从 skill store 同步）或 `plugin: {name}`；报告会像实时会话一样遵守 `[skills]` 配置：`paths` 的 skill 被列出、`ignore` 前缀下的被隐藏、`disabled` 中的仍列出但带 `[disabled]` 标签 [@ref-grok-skills-doc-inspect]。`grok inspect --json` 给出每个 skill 的完整细节：`name`、`description`、`source`（含 SKILL.md 路径）与 `userInvocable` 标志；裸名有争议的 skill 还包含 `collidesWith`（争议名）与 `invocableAs`（可输入的限定命令）[@ref-grok-skills-doc-inspect]。TUI 侧的 `/skills` 打开扩展模态框的 Skills 标签页查看已装 skill [@ref-grok-slash-skills-cmd]。

**重载。** Grok 在文件变化时重载 skill，所以新建或改动 skill 会在数秒内反映到斜杠菜单 [@ref-grok-skills-doc-create]。代码把 `collect_skill_config_dirs` 标为「skill 发现与文件监视共用同一函数，以保证二者对哪些目录重要达成一致」，即 watcher 监视的正是这套配置目录集合 [@ref-grok-skills-watcher]。

缺口：`grok inspect` 在 skill 解析失败时如何报错／在面板中如何标注没有专门说明；`--json` 输出的完整载荷结构与 `grok inspect` 对 `[compat]` 单元解析的逐字段语义，固定来源只给出上面列出的字段名；文件监视的具体去抖与「几秒」的确切阈值也未量化。
