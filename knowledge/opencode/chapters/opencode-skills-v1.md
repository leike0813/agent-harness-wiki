---
schema_version: 2
record_kind: production
edition_id: opencode-skills-v1
harness_id: opencode
topic: skills
title: OpenCode 的 Skills 机制
sections:
  - section_id: skills-sources
    source_refs:
      - ref-opencode-skills-locations
      - ref-opencode-skills-code
      - ref-opencode-skills-builtin
  - section_id: skills-authoring
    source_refs:
      - ref-opencode-skills-frontmatter
      - ref-opencode-skills-listing
      - ref-opencode-skills-extensions
  - section_id: skills-runtime
    source_refs:
      - ref-opencode-skills-loading
      - ref-opencode-skills-permissions
      - ref-opencode-skills-listing
      - ref-opencode-skills-code
      - ref-opencode-skills-diagnostics
questions:
  - question_id: skills.roots
    section_id: skills-sources
    status: answered
    source_refs:
      - ref-opencode-skills-locations
      - ref-opencode-skills-code
  - question_id: skills.discovery
    section_id: skills-sources
    status: answered
    source_refs:
      - ref-opencode-skills-code
  - question_id: skills.collision
    section_id: skills-sources
    status: partial
    source_refs:
      - ref-opencode-skills-code
      - ref-opencode-skills-builtin
  - question_id: skills.format
    section_id: skills-authoring
    status: answered
    source_refs:
      - ref-opencode-skills-frontmatter
  - question_id: skills.extensions
    section_id: skills-authoring
    status: partial
    source_refs:
      - ref-opencode-skills-extensions
  - question_id: skills.loading
    section_id: skills-runtime
    status: answered
    source_refs:
      - ref-opencode-skills-loading
      - ref-opencode-skills-listing
  - question_id: skills.invocation
    section_id: skills-runtime
    status: answered
    source_refs:
      - ref-opencode-skills-permissions
      - ref-opencode-skills-listing
  - question_id: skills.conditions
    section_id: skills-runtime
    status: partial
    source_refs:
      - ref-opencode-skills-permissions
      - ref-opencode-skills-code
  - question_id: skills.diagnostics
    section_id: skills-runtime
    status: answered
    source_refs:
      - ref-opencode-skills-diagnostics
---
本章依据固定源码提交 545f51d 的官方文档与实现。该提交的源码树不等于 npm 包 opencode-ai@1.18.32 的运行时行为；下文路径与开关属于固定源码知识，对 1.18.32 二进制的适用性尚未建立映射，因此不给出只对某个包版本成立的配方。

## 来源与发现 {#skills-sources}

**skills.roots**：OpenCode 从三组位置寻找 Skill。内置位置是项目 `.opencode/skills/{name}/SKILL.md` 与全局 `~/.config/opencode/skills/{name}/SKILL.md`；兼容位置是 `.claude/skills/`、`~/.claude/skills/`、`.agents/skills/`、`~/.agents/skills/`。全局根取用户 home，项目根随当前目录与 Git worktree 变化。源码以 `{skill,skills}/**/SKILL.md` 扫描配置目录，并对兼容目录用 `skills/**/SKILL.md`，据此也能解释旧版单数 `skill/` 目录为何仍被接受。 [@ref-opencode-skills-locations] [@ref-opencode-skills-code]

**skills.discovery**：项目内与兼容目录沿父目录向上查找，直到 Git worktree 根（`up({ targets, start: directory, stop: worktree })`）；全局位置只读 home 下固定目录。扫描经 Glob 完成，`symlink: true`，隐藏目录只有在传入 `dot` 时才纳入，递归深度由 `**` 决定；源码没有单独的忽略清单，跨根去重发生在加载阶段而非扫描阶段。 [@ref-opencode-skills-code]

**skills.collision**：以 Skill 名去重，后处理到的同名条目直接覆盖先前条目（`state.skills[name] = {...}`），只打印一条 `duplicate skill name` 警告并记录原 location，不合并正文、不保留命名空间。内置的 `customize-opencode` 在磁盘扫描之前注册，所以同名磁盘 Skill 会覆盖内置内容。这条覆盖顺序来自源码，尚未在该包二进制上观察，故标 partial。 [@ref-opencode-skills-code] [@ref-opencode-skills-builtin]

## 编写与扩展 {#skills-authoring}

**skills.format**：`SKILL.md` 必须以 YAML frontmatter 开头，识别字段只有 `name`、`description`（必填）、`license`、`compatibility`、`metadata`（可选），未知字段被忽略。`name` 须为 1–64 字符、小写字母数字加单个连字符分隔、不以 `-` 起止、不含 `--`，并与所在目录名一致；`description` 为 1–1024 字符。 [@ref-opencode-skills-frontmatter]

**skills.extensions**：专有扩展写在配置的 `skills.paths` 与 `skills.urls`。`paths` 支持 `~/` 展开，相对路径基于当前目录解析，目录不存在时记录 `skill path not found` 警告后跳过；`urls` 按远端索引（index.json）拉取技能文件到缓存目录，再按 `**/SKILL.md` 扫描。frontmatter 约束同样作用于这些来源。文档页只描述内置与兼容目录，扩展入口以源码为准，二进制适用性未验证，故标 partial。 [@ref-opencode-skills-extensions]

## 加载、调用与诊断 {#skills-runtime}

**skills.loading**：发现阶段解析 frontmatter 与正文后缓存在内存，名称与描述进入 `skill` 工具描述中的可用技能列表 [@ref-opencode-skills-listing]。真正加载发生在模型调用 `skill` 工具：先做 `permission: "skill"` 询问，再返回正文，并附上该 Skill 的基目录、资源相对路径说明，以及最多 10 个同目录文件的采样路径。调用后 Skill 内的 `scripts/`、`reference/` 等相对路径以 Skill 目录为基准，文件清单是采样而非完整列举。 [@ref-opencode-skills-loading]

**skills.invocation**：由模型按名调用 `skill({ name })`，用户没有单独的“运行 Skill”命令。可见性受 `permission.skill` 的通配规则控制：`allow` 立即可加载，`ask` 需用户批准，`deny` 从可用列表隐藏并拒绝访问；可在 agent frontmatter 或 `opencode.json` 的 `agent.plan.permission.skill` 覆盖全局默认，也可用 `tools.skill: false` 彻底移除该工具，此时可用技能段落整体消失。 [@ref-opencode-skills-permissions] [@ref-opencode-skills-listing]

**skills.conditions**：已知两类生效条件。其一是运行特性开关：源码的 `RuntimeFlags` 中 `disableExternalSkills` 关闭全部外部目录发现，`disableClaudeCodeSkills` 单独关闭 `.claude/` 兼容目录。其二是权限：`deny` 使 Skill 隐藏且不可访问。源码发现路径没有项目信任判断，文档也未把信任列为条件，因此信任维度是已知缺口，本项标 partial。 [@ref-opencode-skills-permissions] [@ref-opencode-skills-code]

**skills.diagnostics**：`opencode debug skill` 会把全部已加载 Skill 以 JSON 输出，含名称、描述、位置和正文，是核验发现结果的主要入口。官方排查清单另要求检查文件名是否全大写 `SKILL.md`、frontmatter 是否含 `name` 与 `description`、名称是否在所有位置唯一、以及是否被 `deny` 隐藏。源码未声明 Skill 目录的热重载入口，文档也未给出重载命令，改动后是否需要重启进程尚无固定来源说明。 [@ref-opencode-skills-diagnostics]
