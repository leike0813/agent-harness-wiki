---
schema_version: 3
record_kind: production
edition_id: codex-cli-skills-v1
harness_id: codex
topic: skills
title: "Codex CLI 主题章节：Skills"
sections:
  - section_id: skills-discovery-roots
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-skills-roots-doc
      - ref-codex-cli-skills-source-roots
      - ref-codex-cli-skills-source-scan
      - ref-codex-cli-skills-source-depth
      - ref-codex-cli-skills-symlink-doc
  - section_id: skills-format-loading
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-skills-format-doc
      - ref-codex-cli-skills-source-parser
      - ref-codex-cli-skills-metadata-doc
      - ref-codex-cli-skills-source-metadata
      - ref-codex-cli-skills-progressive-doc
      - ref-codex-cli-skills-budget-doc
  - section_id: skills-invocation-conditions
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-skills-invocation-doc
      - ref-codex-cli-skills-config-doc
      - ref-codex-cli-skills-metadata-doc
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-skills-install-doc
      - ref-codex-cli-skills-budget-doc
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-roots
        status: answered
        source_refs:
          - ref-codex-cli-skills-roots-doc
          - ref-codex-cli-skills-source-roots
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-roots
        status: answered
        source_refs:
          - ref-codex-cli-skills-source-scan
          - ref-codex-cli-skills-source-depth
          - ref-codex-cli-skills-symlink-doc
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-roots
        status: answered
        source_refs:
          - ref-codex-cli-skills-roots-doc
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format-loading
        status: answered
        source_refs:
          - ref-codex-cli-skills-format-doc
          - ref-codex-cli-skills-source-parser
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format-loading
        status: answered
        source_refs:
          - ref-codex-cli-skills-metadata-doc
          - ref-codex-cli-skills-source-metadata
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-format-loading
        status: answered
        source_refs:
          - ref-codex-cli-skills-progressive-doc
          - ref-codex-cli-skills-budget-doc
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation-conditions
        status: answered
        source_refs:
          - ref-codex-cli-skills-invocation-doc
          - ref-codex-cli-skills-config-doc
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation-conditions
        status: partial
        source_refs:
          - ref-codex-cli-skills-metadata-doc
          - ref-codex-cli-skills-config-doc
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs:
          - ref-codex-cli-skills-install-doc
          - ref-codex-cli-skills-budget-doc
---

## 来源边界与发现位置 {#skills-discovery-roots}

本节的两个固定来源是官方 Skills 文档快照（snapshot-codex-cli-skills-doc，抓取于 2026-09-27，resolved_url 为 learn.chatgpt.com/docs/build-skills.md，version_applicability 为 unknown）与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照没有任何证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文把"文档描述的位置与处理链"和"某个已安装 CLI 版本的行为"分开，凡涉及包版本的推断都标为未验证。

**skills.roots**：Codex 从仓库、用户、管理、系统四类位置发现本地 Skill。仓库层按"仓库根到当前工作目录"的每一级探测 `.agents/skills`；用户层是 `$HOME/.agents/skills`，并保留旧位置 `$CODEX_HOME/skills` 作兼容；管理层为 `/etc/codex/skills`；系统层随 Codex 内置分发。目录名 `.agents` 与 `skills` 写死在源码里，路径随 home、CWD 和仓库根移动。[@ref-codex-cli-skills-roots-doc][@ref-codex-cli-skills-source-roots] 未验证项：文档没有给出用环境变量直接替换技能目录的开关；源码把 `$CODEX_HOME/skills` 标为 deprecated 但仍在读取。

**skills.discovery**：源码在仓库层先按项目根标记文件定位项目根，再取"根到 CWD"之间各级目录，逐级探测 `.agents/skills`。扫描有硬上限：深度 `MAX_SCAN_DEPTH = 6`，每个技能根的目录数上限 2000；技能文件名固定为 `SKILL.md`，可选元数据文件名固定为 `agents/openai.yaml`。文档明确 Codex 支持符号链接的技能目录并跟随链接目标。[@ref-codex-cli-skills-source-scan][@ref-codex-cli-skills-source-depth][@ref-codex-cli-skills-symlink-doc] 未验证项：文档未列出忽略规则；技能根内部是递归查找还是只看直接子目录由哪个条件选择，本次没有在固定来源里定位到判断点。

**skills.collision**：同名 Skill 不合并也不覆盖，两个都会出现在选择器里，"后写覆盖先写"的直觉在这里不成立。[@ref-codex-cli-skills-roots-doc] 未验证项：固定来源没有说明选择器对同名项的排序，也没有给出基于作用域的优先规则。

## 格式、扩展与加载 {#skills-format-loading}

解析链是：扫描目录、读取 `SKILL.md` frontmatter、校验、汇总成初始清单、按需读取正文。

**skills.format**：一个 Skill 是含 `SKILL.md` 的目录，另可有 `scripts/`、`references/`、`assets/` 与 `agents/openai.yaml`。`SKILL.md` 必须有 YAML frontmatter，其中 `name` 与 `description` 为必需，正文是给模型的指令。源码校验 `name` 长度上限 64，`description` 为空时报 `MissingField("description")`；对第三方 Skill 中常见的非法标量（例如描述里带冒号）按行做定向修复。[@ref-codex-cli-skills-format-doc][@ref-codex-cli-skills-source-parser]

**skills.extensions**：第一方扩展文件是技能目录下的 `agents/openai.yaml`（源码常量 `SKILLS_METADATA_DIR = "agents"`、`SKILLS_METADATA_FILENAME = "openai.yaml"`）。字段分三组：`interface`（`display_name`、`short_description`、`icon_small`、`icon_large`、`brand_color`、`default_prompt`），`policy.allow_implicit_invocation`（默认 `true`），`dependencies.tools`（如 `type: "mcp"`、`transport`、`url`）。它用于 ChatGPT 桌面端的界面元数据、调用策略与工具依赖声明。[@ref-codex-cli-skills-metadata-doc][@ref-codex-cli-skills-source-metadata] 未验证项：文档只给出字段示例，未逐字段说明默认值之外的解析与校验规则。

**skills.loading**：加载用渐进披露。初始只把每个 Skill 的 name 与 description 放进上下文（Codex 还会带上文件路径），只有决定使用某个 Skill 时才读取完整 `SKILL.md`。初始清单有预算：最多占模型上下文窗口的 2%，上下文窗口未知时为 8000 字符；超限时先压缩描述，仍过多则省略部分 Skill 并给出警告。该预算只约束初始清单。[@ref-codex-cli-skills-progressive-doc][@ref-codex-cli-skills-budget-doc]

## 调用与生效条件 {#skills-invocation-conditions}

**skills.invocation**：显式路径是在 Codex CLI 中运行 `/skills` 或输入 `$` 提及某个 Skill；隐式路径是任务匹配 Skill 的 `description` 时由 Codex 自动选择，因此描述要写清适用范围。`[[skills.config]]` 用 `path` 加 `enabled` 关闭某个 Skill 而不删除文件。[@ref-codex-cli-skills-invocation-doc][@ref-codex-cli-skills-config-doc]

**skills.conditions**：已知两项条件。`agents/openai.yaml` 里 `policy.allow_implicit_invocation = false` 只禁止隐式调用，显式 `$` 提及仍可用；`~/.codex/config.toml` 中 `[[skills.config]]` 的启停改动需要重启 Codex。本项状态为 partial：固定来源说明项目配置层要"信任项目"才加载，但没有直接说明仓库或项目来源的 `.agents/skills` 是否随项目信任一起被跳过，这一交叉点本次未确认。[@ref-codex-cli-skills-metadata-doc][@ref-codex-cli-skills-config-doc]

## 诊断 {#skills-diagnostics}

**skills.diagnostics**：Codex 会自动检测 Skill 的新增与修改；若改动没有出现在选择器中，重启 Codex。当 Skill 数量过多导致初始清单被截断时 Codex 会显示警告，这是判断"是否被发现"的第一个可观察信号。[@ref-codex-cli-skills-install-doc][@ref-codex-cli-skills-budget-doc] 未验证项：固定来源没有给出单独列出"当前已加载 Skill 及作用域"的命令，`/skills` 选择器与初始清单的差异也未在来源中说明。
