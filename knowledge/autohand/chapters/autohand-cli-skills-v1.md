---
schema_version: 3
record_kind: production
edition_id: autohand-cli-skills-v1
harness_id: autohand
topic: skills
title: "Autohand Code CLI 的 Skill 发现、格式与调用"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-autohand-src-skill-locations, ref-autohand-src-thirdparty-skill-dirs, ref-autohand-src-skill-collision, ref-autohand-skills-discovery, ref-autohand-docs-skills-discovery, ref-autohand-skills-auto, ref-autohand-config-locations]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-autohand-src-skill-collision, ref-autohand-src-skill-extension, ref-autohand-src-skill-locations]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-autohand-skills-format, ref-autohand-docs-skills-format, ref-autohand-config-skills, ref-autohand-config-skill-discovery, ref-autohand-docs-skills-frontmatter]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-autohand-skills-agents, ref-autohand-docs-skills-using, ref-autohand-config-skills, ref-autohand-skills-bootstrap, ref-autohand-src-skill-extension, ref-autohand-skills-discovery]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-autohand-config-skills, ref-autohand-skills-bootstrap, ref-autohand-src-skill-extension, ref-autohand-skills-discovery]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-autohand-src-skill-locations, ref-autohand-src-thirdparty-skill-dirs, ref-autohand-skills-discovery, ref-autohand-docs-skills-discovery, ref-autohand-skills-auto, ref-autohand-config-locations]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: partial
        source_refs: [ref-autohand-src-skill-collision, ref-autohand-src-skill-locations]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-autohand-src-skill-collision, ref-autohand-src-skill-extension]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-autohand-skills-format, ref-autohand-docs-skills-format, ref-autohand-docs-skills-frontmatter]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-autohand-config-skills, ref-autohand-config-skill-discovery]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-autohand-skills-agents, ref-autohand-docs-skills-using]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-autohand-config-skills, ref-autohand-docs-skills-using, ref-autohand-skills-agents, ref-autohand-skills-bootstrap]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-autohand-src-skill-extension, ref-autohand-skills-discovery, ref-autohand-config-skills]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-autohand-config-skills, ref-autohand-skills-bootstrap, ref-autohand-src-skill-extension]
---

本页固定来源为 Autohand Code CLI 官方仓库 `autohandai/code-cli`（commit `a248656e78244f8387c0d0e436786fe801ad6599`）中的 Skills 文档与发现代码，以及官方文档站 `docs.autohand.ai` 的 Skills 页面。固定问题只针对 `cli` 界面回答；仓库与文档站给出的发现顺序、字段与调用方式按来源分别标注。

## 技能发现位置与优先级 {#skills-roots}

Skill 是带 YAML frontmatter 的 markdown 指令包，文件固定名为 `SKILL.md`。Autohand 从内置目录、用户目录、项目目录与扩展包四处发现，**后加载的来源覆盖先加载的同名技能**（代码注释：`Later sources override earlier ones with the same name`）。[@ref-autohand-src-skill-collision]

用户级搜索位置按优先级从低到高为：[@ref-autohand-src-skill-locations]

| 顺序 | 路径 | source | 递归 |
| --- | --- | --- | --- |
| 1 | `~/.codex/skills/` | `codex-user` | 是 |
| 2 | `~/.claude/skills/` | `claude-user` | 否（只一层） |
| 3 | `~/.agent/skills/` 与 `~/.agents/skills/` | `agent-user` | 是 |
| 4 | `~/.autohand/skills/`（`AUTOHAND_HOME` 下的 `skills`） | `autohand-user` | 是 |

项目级在用户级之后加载，因此项目技能优先于同名用户技能：`项目根/.claude/skills/`（一层）、一批第三方 agent 目录（`.augment/skills`、`.continue/skills`、`.kiro/skills`、`.qwen/skills`、`.roo/skills`、`.windsurf/skills` 等，均递归）、`项目根/skills/`、`项目根/.agent/skills/`、`项目根/.agents/skills/`，最后是 `项目根/.autohand/skills/`。[@ref-autohand-src-thirdparty-skill-dirs][@ref-autohand-skills-discovery]

完整来源表把内置包（`dist/skills/builtin/**/SKILL.md`，`builtin`）排在最先，把已启用扩展的 `contributes.skills` 条目（`extension`）排在最后；官方文档站另给出一份只列 `.autohand`、`.claude`、`.codex` 五处位置的简表。[@ref-autohand-skills-discovery][@ref-autohand-docs-skills-discovery]

`~/.codex/skills/` 与 `~/.claude/skills/`、`项目根/.claude/skills/` 中发现的技能会被自动复制到对应的 Autohand 位置（`~/.autohand/skills/`、`项目根/.autohand/skills/`），**已存在的 Autohand 技能不被覆盖**；共享 agent 目录与第三方项目目录就地加载，不复制。用户可通过 `AUTOHAND_HOME` 改变 `~/.autohand` 的基准路径。[@ref-autohand-skills-auto][@ref-autohand-config-locations]

账号技能是另一层来源：Console 的 Configure → Skills 管理的技能同步到独立的 `.account-skills/` 缓存，登录且开启同步时在启动时与默认 5 分钟的后台同步周期内拉取；同名账号技能只要存在于账号库就优先，包括其被禁用时。[@ref-autohand-skills-discovery]

## 发现范围、扫描深度与同名冲突 {#skills-discovery}

发现发生在注册表初始化与工作区绑定两个时点：`initialize()` 加载内置技能与全部用户位置，`setWorkspace(workspaceRoot)` 再加载项目位置；扩展提交的技能在下一次生命周期变更时整体替换。[@ref-autohand-src-skill-collision][@ref-autohand-src-skill-extension]

扫描规则（源码 `findSkillFiles`）：遍历目录项，若子目录内含 `SKILL.md` 即收为技能，递归开关为真时继续深入子目录；因此 `~/.autohand/skills/`、`项目根/.autohand/skills/` 支持多级嵌套，而 `~/.claude/skills/`、`项目根/.claude/skills/` 只认一层子目录。[@ref-autohand-src-skill-locations][@ref-autohand-src-skill-collision]

同名去重策略是按来源覆盖而非合并：后加载来源以其技能名写入表，后者胜出。扩展提交的技能反而**不覆盖**已有同名技能——`setExtensionSkills` 遇到表中已存在的名字直接跳过，只填补空缺；扩展自身在 enable/disable/remove 时会清理上一批扩展技能并按激活状态重建。[@ref-autohand-src-skill-extension]

**未证实项**：固定来源没有说明发现阶段对符号链接的处理、忽略规则（如 `.gitignore`）、单文件大小上限或发现失败时的告警。检查过的入口：`src/skills/SkillsRegistry.ts` 的 `loadFromDirectory`/`findSkillFiles`、`docs/agent-skills.md` 的 Skill Discovery 与 Auto-Copy 小节；这些入口均未提及上述规则。

## `SKILL.md` 格式与专有字段 {#skills-format}

解析要求文件以 `---` 开头，第一个独立成行的 `---` 结束 frontmatter；frontmatter 用 YAML 解析并校验，正文为结束标记之后的全部内容。缺少合法 frontmatter 时解析失败并给出 `No valid YAML frontmatter found...`。[@ref-autohand-skills-format]

| 字段 | 必填 | 限制 | 说明 |
| --- | --- | --- | --- |
| `name` | 是 | ≤64 字符，小写字母数字与连字符 | 技能唯一标识，也是去重键 |
| `description` | 是 | ≤1024 字符 | 列表面板与自动选择使用 |
| `license` | 否 | — | 共享许可 |
| `compatibility` | 否 | ≤500 字符 | 兼容性说明 |
| `allowed-tools` | 否 | — | 空格分隔的工具白名单 |
| `metadata` | 否 | — | 任意键值对，如 `author`、`version` |

最小可用示例（字段与结构来自官方文档的 SKILL.md 小节）：[@ref-autohand-docs-skills-format]

```markdown
---
name: changelog-generator
description: Generates a changelog from git history. Use for releases.
allowed-tools: read_file run_command git_log
---

# Changelog Generator
Build the changelog from commits since the last tag.
```

官方文档站另给出一份更简的字段表，确认只有 `name` 与 `description` 必填，`allowed-tools`（空格分隔的工具列表）、`license`、`compatibility` 均为可选：技能据此既能只声明用途，也能同时限定可用工具。[@ref-autohand-docs-skills-frontmatter]

除上述 frontmatter 外，Autohand 还识别：
- `allowed-tools` 与 `metadata` 是 Autohand/Agent Skills 契约里的扩展字段，`metadata` 常用于生成型技能标记（如 `agentskill-source: llm-generated`、`agentskill-project-hash`），供 `/learn update` 判断代码库变化后重新生成。[@ref-autohand-config-skills]
- 技能的附带资源（例如扩展包声明的 `skills/技能名/SKILL.md` 及其目录内被引用的文件）按扩展包路径解析；扩展只能提供 `contributes.skills` 中声明的入口文件。[@ref-autohand-config-skill-discovery]

**未证实项**：来源没有列出「未声明字段是否被忽略」的逐项规则，也没有给出 `agents/openai.yaml` 之类附加文件在 CLI 侧的解析规则。检查过的入口：`src/skills/SkillParser.ts`、`docs/agent-skills.md` 的 SKILL.md Format、`docs/config-reference.md` 的 Skills System。

## 加载、调用与生效条件 {#skills-loading}

技能名与描述在注册表列出时进入模型可见的技能清单；`$` 前缀的精确提及会激活该技能并把指令注入同一回合。技能不限于主会话：每个被委派的子代理与 teammate 共用同一注册表，声明的技能会完整放进该代理的 system prompt，其余技能只按名字列出，由代理用 `skill` 工具自行激活，激活结果只对该代理可见。[@ref-autohand-skills-agents][@ref-autohand-docs-skills-using]

调用入口：
- 交互式：`/skills` 列出，`/skills use 技能名` 激活，`/skills info 技能名` 查看详情，`/skills deactivate 技能名` 停用。[@ref-autohand-config-skills]
- 提示词：`$skill-name` 精确提及即激活并注入本回合指令；`autohand -p "Use the frontend-ui skill. ..."` 也可在一次性命令中命名技能。[@ref-autohand-config-skills][@ref-autohand-docs-skills-using]
- 自动：`computer-control` 等内置技能在请求明确指向原生应用时自动激活；`autohand --auto-skill` 先分析项目再安装并激活匹配的社区技能。[@ref-autohand-skills-agents][@ref-autohand-skills-bootstrap]
- 安装/生成：`/skills install`、`/skills search`、`/skills new`、`/learn`（LLM 顾问，含 `agentskill-*` 元数据生成）。[@ref-autohand-config-skills]

生效条件：
- 扩展技能只有在扩展已安装、启用且校验通过时才出现；`extensions disable`/`remove` 后其技能不再贡献。[@ref-autohand-src-skill-extension]
- 账号技能需要已登录并开启同步，离线时沿用最后一次成功同步的快照。[@ref-autohand-skills-discovery]
- 技能被激活后，其 `allowed-tools` 用于约束该技能声明的工具集合；`agents/openai.yaml` 型的 Codex 兼容既有约定在 Codex Skill Compatibility 小节给出 `CODEX_HOME` → `AUTOHAND_HOME` 的映射。[@ref-autohand-config-skills]

**未证实项**：固定来源没有说明 Skills 是否受工作区信任（workspace trust）门控——信任门控只被明确写明于项目 hooks 与项目 MCP server。检查过的入口：`src/permissions/workspaceTrust.ts`（只记录 `hooks` 与 `mcpServers`）、`docs/config-reference.md` 的 Skills System。

## 诊断与刷新 {#skills-diagnostics}

- 列出与查看：`/skills` 列出全部可用技能，`/skills info 技能名` 显示详情，`$` 提及的预览面板显示名称、描述与激活状态。[@ref-autohand-config-skills]
- 项目适配：`/learn`（快速扫描）、`/learn deep`（读源码的深度扫描）、`/learn update`（按项目哈希重生成过期技能）；`autohand --auto-skill` 打印扫描结果、安装与自动激活清单。[@ref-autohand-skills-bootstrap][@ref-autohand-config-skills]
- 重载：扩展执行 disable/enable/remove 等改动会刷新当前会话的声明式与运行时注册，技能随之一并刷新；扩展开发循环也可用「改源码 → validate → disable/enable」在会话内刷新，正式验证仍需新会话。[@ref-autohand-src-skill-extension]
- 账号技能：运行时注册表在列出/激活时重新检查 `.account-skills/` 快照，因此禁用或删除的账号技能无需重启即不可见。[@ref-autohand-skills-discovery]

**未证实项**：没有专门的「技能诊断」命令（例如 `extensions doctor` 之于扩展）；也没有说明技能文件改动后是否自动热重载。检查过的入口：`/skills` 子命令表、`/learn`、扩展生命周期命令。
