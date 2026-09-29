---
schema_version: 2
record_kind: production
edition_id: codex-cli-skills-v2
harness_id: codex-cli
topic: skills
title: "Codex CLI 主题章节：Skills"
sections:
  - section_id: skills-discovery-roots
    source_refs:
      - ref-codex-cli-skills-roots-doc
      - ref-codex-cli-skills-source-roots
      - ref-codex-cli-skills-source-scan
      - ref-codex-cli-skills-source-depth
      - ref-codex-cli-skills-symlink-doc
  - section_id: skills-skill-md
    source_refs:
      - ref-codex-cli-skills-format-doc
      - ref-codex-cli-skills-source-parser
  - section_id: skills-openai-yaml
    source_refs:
      - ref-codex-cli-skills-metadata-doc
      - ref-codex-cli-skills-source-metadata
  - section_id: skills-loading
    source_refs:
      - ref-codex-cli-skills-progressive-doc
      - ref-codex-cli-skills-budget-doc
  - section_id: skills-invocation
    source_refs:
      - ref-codex-cli-skills-invocation-doc
      - ref-codex-cli-skills-config-doc
      - ref-codex-cli-skills-metadata-doc
  - section_id: skills-diagnostics
    source_refs:
      - ref-codex-cli-skills-install-doc
      - ref-codex-cli-skills-budget-doc
questions:
  - question_id: skills.roots
    section_id: skills-discovery-roots
    status: answered
    source_refs:
      - ref-codex-cli-skills-roots-doc
      - ref-codex-cli-skills-source-roots
  - question_id: skills.discovery
    section_id: skills-discovery-roots
    status: answered
    source_refs:
      - ref-codex-cli-skills-source-scan
      - ref-codex-cli-skills-source-depth
      - ref-codex-cli-skills-symlink-doc
  - question_id: skills.collision
    section_id: skills-discovery-roots
    status: answered
    source_refs:
      - ref-codex-cli-skills-roots-doc
  - question_id: skills.format
    section_id: skills-skill-md
    status: answered
    source_refs:
      - ref-codex-cli-skills-format-doc
      - ref-codex-cli-skills-source-parser
  - question_id: skills.extensions
    section_id: skills-openai-yaml
    status: answered
    source_refs:
      - ref-codex-cli-skills-metadata-doc
      - ref-codex-cli-skills-source-metadata
  - question_id: skills.loading
    section_id: skills-loading
    status: answered
    source_refs:
      - ref-codex-cli-skills-progressive-doc
      - ref-codex-cli-skills-budget-doc
  - question_id: skills.invocation
    section_id: skills-invocation
    status: answered
    source_refs:
      - ref-codex-cli-skills-invocation-doc
      - ref-codex-cli-skills-config-doc
  - question_id: skills.conditions
    section_id: skills-invocation
    status: partial
    source_refs:
      - ref-codex-cli-skills-metadata-doc
      - ref-codex-cli-skills-config-doc
  - question_id: skills.diagnostics
    section_id: skills-diagnostics
    status: answered
    source_refs:
      - ref-codex-cli-skills-install-doc
      - ref-codex-cli-skills-budget-doc
---

本主题有两处固定来源：官方 Build skills 文档快照（snapshot-codex-cli-skills-doc，抓取于 2026-09-27，resolved_url 为 learn.chatgpt.com/docs/build-skills.md，version_applicability 为 unknown）与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。两者都没有把内容绑定到 npm 包 @openai/codex 0.157.1，源码快照也只代表该提交的源码树，因此下文区分"文档描述的机制"和"某个已安装 CLI 版本的行为"，凡涉及包版本的推断都标为未验证。

## 技能位置、扫描与同名处理 {#skills-discovery-roots}

Codex 从仓库、用户、管理、系统四类位置读取本地 Skill。仓库层不是一个目录，而是沿"项目根到当前工作目录"逐级探测 `.agents/skills`：项目根由项目根标记文件决定，中间每一层目录都算一个技能根，所以团队可以把只在某个子目录生效的 Skill 放在该目录下。用户层是 `$HOME/.agents/skills`；管理层的固定位置是 `/etc/codex/skills`；系统层随 Codex 内置分发。写成一个可对照的清单：

| 作用域 | 位置 | 典型用途 |
|---|---|---|
| 仓库 | `$CWD/.agents/skills` | 只与当前工作目录相关的 Skill |
| 仓库 | `$CWD/../.agents/skills` 等上层目录 | 仓库内共享区域的 Skill |
| 仓库 | `$REPO_ROOT/.agents/skills` | 全仓库共用的根级 Skill |
| 用户 | `$HOME/.agents/skills` | 跨仓库的个人 Skill |
| 管理 | `/etc/codex/skills` | 机器或容器级共享 Skill |
| 系统 | 随 Codex 内置 | skill-creator、plan 等内置 Skill |

目录名 `.agents` 与 `skills` 写死在源码常量里，实际路径随 home、CWD 和仓库根移动。[@ref-codex-cli-skills-roots-doc][@ref-codex-cli-skills-source-roots] 源码的 `resolve_skill_roots` 还会读取旧位置 `$CODEX_HOME/skills`，源码注释把它标为 deprecated，为向后兼容而保留。[@ref-codex-cli-skills-source-roots]

扫描沿"项目根到 CWD"之间每一级目录进行，逐级检查该层的 `.agents/skills` 是否存在。[@ref-codex-cli-skills-source-scan] 扫描有硬上限：目录深度 `MAX_SCAN_DEPTH = 6`，每个技能根的技能目录数上限 2000，技能文件名固定为 `SKILL.md`，可选元数据文件名固定为 `agents/openai.yaml`。[@ref-codex-cli-skills-source-depth] Codex 支持符号链接的技能目录，扫描时跟随链接目标。[@ref-codex-cli-skills-symlink-doc] 未验证：固定来源没有列出忽略规则，也没有定位到"技能根内部递归查找还是只看直接子目录"的判断点。

同名 Skill 不合并也不覆盖，两个都会出现在选择器里，"后写覆盖先写"在这里不成立。[@ref-codex-cli-skills-roots-doc] 未验证：固定来源没有说明选择器对同名项的排序，也没有给出基于作用域的优先规则。

## 技能目录与 SKILL.md 格式 {#skills-skill-md}

一个 Skill 是一个目录，其中必须有 `SKILL.md`，另可有脚本、参考文档、资源和可选的元数据子目录。文档给出的目录形状是：

```text
skill-name/
├── SKILL.md            # 必需：指令与元数据
├── scripts/            # 可选：可执行代码
├── references/         # 可选：文档
├── assets/             # 可选：模板、资源
└── agents/
    └── openai.yaml     # 可选：外观与依赖
```

`SKILL.md` 必须带 YAML frontmatter，`name` 与 `description` 两个字段必需，正文写给模型执行。下面的示例目录名为 `skill-name`，frontmatter 的 `name` 与之对应；把它放到上文任一发现位置下即可：

```md
---
name: skill-name
description: Explain exactly when this skill should and should not trigger.
---

Skill instructions for ChatGPT or Codex to follow.
```

字段作用：`name` 是唯一名，`description` 决定隐式匹配是否命中，正文在 Skill 被选中后才读。前提是文件落在上文任一技能根内。源码对这个 frontmatter 做校验，`name` 长度上限 64，`description` 缺失时报 `MissingField("description")`，对第三方 Skill 常见的非法标量（例如描述里带冒号）按行做定向修复后才能解析。[@ref-codex-cli-skills-format-doc][@ref-codex-cli-skills-source-parser] 一个可观察的检查是：新目录出现在选择器里即表示被发现，具体见下方诊断小节。

## 可选元数据 agents/openai.yaml {#skills-openai-yaml}

技能目录下可放第一方扩展文件 `agents/openai.yaml`（源码常量 `SKILLS_METADATA_DIR = "agents"`、`SKILLS_METADATA_FILENAME = "openai.yaml"`）。它控制桌面端界面元数据、调用策略和声明的工具依赖。文档给出的完整示例：

```yaml
interface:
  display_name: "Optional user-facing name"
  short_description: "Optional user-facing description"
  icon_small: "./assets/small-logo.svg"
  icon_large: "./assets/large-logo.png"
  brand_color: "#3B82F6"
  default_prompt: "Optional surrounding prompt to use the skill with"

policy:
  allow_implicit_invocation: false

dependencies:
  tools:
    - type: "mcp"
      value: "openaiDeveloperDocs"
      description: "OpenAI Docs MCP server"
      transport: "streamable_http"
      url: "https://developers.openai.com/mcp"
```

字段分三组：`interface` 下的 `display_name`、`short_description`、`icon_small`、`icon_large`、`brand_color`、`default_prompt` 是界面展示项；`policy.allow_implicit_invocation` 默认 `true`；`dependencies.tools` 逐项声明依赖的工具，示例里用 `type: "mcp"`、`transport` 与 `url` 指向一个 MCP server。前提是文件位于具体 Skill 目录内，结果是桌面端展示与调用策略按此处取值。未验证：文档只给出字段示例，没有逐字段说明默认值之外的解析与校验规则。[@ref-codex-cli-skills-metadata-doc][@ref-codex-cli-skills-source-metadata]

## 加载方式与上下文预算 {#skills-loading}

Skill 用渐进披露控制上下文：ChatGPT 与 Codex 初始只把每个 Skill 的 `name` 与 `description` 放进上下文，Codex 还会带上文件路径；只有在决定使用某个 Skill 时才读取完整的 `SKILL.md`。[@ref-codex-cli-skills-progressive-doc] 这个初始清单有预算：最多占模型上下文窗口的 2%，上下文窗口未知时为 8000 字符。数量过多时先压缩描述，仍然太多就省略部分 Skill 并显示警告。预算只约束初始清单，被选中的 Skill 仍会读完整正文。[@ref-codex-cli-skills-budget-doc]

## 调用方式与启停条件 {#skills-invocation}

调用分两条路径。显式路径是在 Codex CLI 里运行 `/skills` 或输入 `$` 提及某个 Skill；隐式路径是任务匹配 Skill 的 `description` 时由 Codex 自动选择，所以描述要把触发范围写清楚。[@ref-codex-cli-skills-invocation-doc] 隐式调用可以在 Skill 自身的元数据里关闭：`agents/openai.yaml` 里 `policy.allow_implicit_invocation = false` 只禁止隐式调用，显式 `$` 提及仍然可用。[@ref-codex-cli-skills-metadata-doc]

要在不删除文件的前提下关闭某个 Skill，改用户配置。路径与作用域是 `~/.codex/config.toml`，一个最小配置块是：

```toml
[[skills.config]]
path = "/home/you/.agents/skills/skill-name/SKILL.md"
enabled = false
```

`path` 必须是该 Skill 实际 `SKILL.md` 的绝对路径，`enabled` 是布尔开关。上例对应用户级位置里的 `$HOME/.agents/skills/skill-name/SKILL.md`；照抄占位路径不会匹配任何 Skill，规则不会生效。前提是写入用户级配置；结果是该 Skill 不再可选而不必删除目录。检查方式是：改动 `~/.codex/config.toml` 后重启 Codex，重启后该 Skill 既不出现在 `/skills` 选择器里，也不会被隐式匹配。[@ref-codex-cli-skills-config-doc] 本项状态 partial：固定来源说明项目配置层要"信任项目"才加载，但没有直接说明仓库或项目来源的 `.agents/skills` 是否随项目信任一起被跳过，这一交叉点本次未确认。[@ref-codex-cli-skills-metadata-doc][@ref-codex-cli-skills-config-doc]

## 诊断与重载 {#skills-diagnostics}

Codex 会自动检测 Skill 的新增与修改；若改动没有出现在选择器里，重启 Codex。[@ref-codex-cli-skills-install-doc] 当 Skill 数量过多导致初始清单被截断时，Codex 会显示警告，这是判断"是否被发现"的第一个可观察信号。[@ref-codex-cli-skills-budget-doc] 未验证：固定来源没有给出单独列出"当前已加载 Skill 及作用域"的命令，`/skills` 选择器与初始清单之间的差异也未在来源中说明。
