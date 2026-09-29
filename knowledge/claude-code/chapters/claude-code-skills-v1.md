---
schema_version: 2
record_kind: production
edition_id: claude-code-skills-v1
harness_id: claude-code
topic: skills
title: Claude Code 的 Skills 位置、结构与调用
sections:
  - section_id: skills-locations
    source_refs:
      - ref-cc-skills-locations
      - ref-cc-skills-discovery
      - ref-cc-skills-collision
  - section_id: skills-format
    source_refs:
      - ref-cc-skills-frontmatter
      - ref-cc-skills-supporting
  - section_id: skills-invocation
    source_refs:
      - ref-cc-skills-lifecycle
      - ref-cc-skills-invocation
      - ref-cc-skills-permissions
      - ref-cc-skills-overrides
      - ref-cc-skills-subagent
      - ref-cc-skills-adddir
      - ref-cc-skills-synced
      - ref-cc-skills-livechange
  - section_id: skills-diagnostics
    source_refs:
      - ref-cc-skills-diagnostics
      - ref-cc-skills-budget
      - ref-cc-skills-livechange
      - ref-cc-npm-readme
questions:
  - question_id: skills.roots
    section_id: skills-locations
    status: answered
    source_refs:
      - ref-cc-skills-locations
  - question_id: skills.discovery
    section_id: skills-locations
    status: answered
    source_refs:
      - ref-cc-skills-discovery
  - question_id: skills.collision
    section_id: skills-locations
    status: answered
    source_refs:
      - ref-cc-skills-collision
  - question_id: skills.format
    section_id: skills-format
    status: answered
    source_refs:
      - ref-cc-skills-frontmatter
  - question_id: skills.extensions
    section_id: skills-format
    status: answered
    source_refs:
      - ref-cc-skills-frontmatter
      - ref-cc-skills-supporting
  - question_id: skills.loading
    section_id: skills-invocation
    status: answered
    source_refs:
      - ref-cc-skills-lifecycle
  - question_id: skills.invocation
    section_id: skills-invocation
    status: answered
    source_refs:
      - ref-cc-skills-invocation
      - ref-cc-skills-permissions
      - ref-cc-skills-subagent
  - question_id: skills.conditions
    section_id: skills-invocation
    status: partial
    source_refs:
      - ref-cc-skills-overrides
      - ref-cc-skills-adddir
      - ref-cc-skills-synced
      - ref-cc-skills-livechange
  - question_id: skills.diagnostics
    section_id: skills-diagnostics
    status: answered
    source_refs:
      - ref-cc-skills-diagnostics
      - ref-cc-skills-budget
      - ref-cc-skills-livechange
      - ref-cc-npm-readme
---

## Skill 位置、发现与重名 {#skills-locations}

官方 Skills 页把 Skill 的位置、发现范围和同名解析分开描述，本节按这三条线给出可操作的结论。

**skills.roots**：第一方来源给出六类位置：企业 managed 目录、个人 `~/.claude/skills/NAME/SKILL.md`、项目 `.claude/skills/NAME/SKILL.md`、嵌套子目录、用 `--add-dir` 额外加入的目录，以及插件携带的 `skills/NAME/SKILL.md`；此外还有从 claude.ai 账号同步下来的 Skill。个人位置随 home 目录变化，项目与嵌套位置随会话启动目录和仓库根变化，`--add-dir` 以传入路径为准。`CLAUDE_CONFIG_DIR` 会把 home 下的配置目录整体搬走，从而改变个人 Skill 的解析根。 [@ref-cc-skills-locations]

**skills.discovery**：项目 Skill 从启动目录开始，向上扫描到仓库根，所以从 `packages/frontend/` 启动仍能拿到根目录定义的 Skill；位于启动目录之下的嵌套 Skill 不在启动时加载，而在 Claude 首次读写该子目录文件时加载并保留到会话结束。符号链接目录会被跟随，但同一目标只加载一次；保留名 `synced` 与 `anthropic-skills` 有特殊解析规则。 [@ref-cc-skills-discovery]

**skills.collision**：同名时由来源决定 `/name` 运行哪一个，优先级为 enterprise 高于 personal、personal 高于 project；插件 Skill 因为带 `/plugin:skill` 命名空间而与其他位置并存；项目根的 Skill 与嵌套同名 Skill 都保留，嵌套的用 `/subdir:name` 单独调用。 [@ref-cc-skills-collision]

## SKILL.md 结构与专有字段 {#skills-format}

**skills.format**：只有当开头 `---` 位于文件首行时 Claude Code 才解析 frontmatter，否则整份文件都被当作正文。所有字段都是可选的，只有 `description` 被推荐，因为宿主用它判断何时加载；字段名必须与官方表完全一致（含连字符），无法识别的字段被静默忽略而不报错；布尔值除 `true`/`false` 外还接受 `yes`/`no`/`on`/`off`/`1`/`0`。 [@ref-cc-skills-frontmatter]

**skills.extensions**：第一方字段包括 `name`、`description`、`when_to_use`、`argument-hint`、`arguments`、`disable-model-invocation`、`user-invocable`、`allowed-tools`、`disallowed-tools`、`model`、`effort`、`context`、`agent`、`background`、`hooks`、`paths`、`shell`、`metadata`、`license`、`compatibility`；附加文件放在 Skill 目录内并在正文中引用，宿主只为被引用的内容按需加载。`.claude/commands/` 里的旧式命令文件支持同一批字段，但 `name` 与 `paths` 除外；给一个 Skill 目录添加 `.claude-plugin/plugin.json` 能让它作为插件加载。配置项 `skillOverrides` 可在不编辑文件的情况下改变可见性。 [@ref-cc-skills-frontmatter] [@ref-cc-skills-supporting]

## 加载、调用与生效条件 {#skills-invocation}

**skills.loading**：会话启动时进入上下文的是 Skill 名称与描述清单，正文只在被调用时作为一条消息进入对话，并在之后的轮次里持续保留；自动压缩时每个 Skill 保留最近一次调用的前 5000 token、合计 25000 token 预算。 [@ref-cc-skills-lifecycle]

**skills.invocation**：默认用户与 Claude 都能调用，用户用 `/skill-name`，Claude 依据描述自动加载；`disable-model-invocation: true` 只允许用户调用，`user-invocable: false` 只允许 Claude 调用。可用权限规则 `Skill(name)` 限制 Claude 能调用哪些 Skill；`context: fork` 让 Skill 在指定 `agent` 类型的子代理中隔离运行。调用时可传参数，`/a /b args` 形式会展开首个 Skill 及其后最多五个。 [@ref-cc-skills-invocation] [@ref-cc-skills-permissions] [@ref-cc-skills-subagent]

**skills.conditions**：条件分为三类。来源开关上，`strictPluginOnlyCustomization` 策略、bare mode 与 `--safe-mode` 都会限制额外目录带来的加载；从 claude.ai 同步的 Skill 只在以 claude.ai 账号登录且会话会拉取特性开关时同步，用 API key 登录的会话不同步。信任上，把 Skill 目录当插件加载需要先接受 workspace 信任对话框，而项目 Skill 的 `allowed-tools` 不受信任门限制。运行期重载上，bare mode 下不监视文件变化。来源未给出各开关与精确包版本的对应证明，因此这些条件仍是文档级结论。 [@ref-cc-skills-overrides] [@ref-cc-skills-adddir] [@ref-cc-skills-synced] [@ref-cc-skills-livechange]

## 诊断与来源边界 {#skills-diagnostics}

**skills.diagnostics**：`/skills` 列出已发现的 Skill 及其来源，`/context` 显示清单占用，`/doctor` 给出描述预算的估计，`/skill-doctor` 报告每个 Skill 的上下文成本与使用频率。frontmatter 解析失败时正文仍会加载但元数据为空，导致 `/skill-name` 能用而自动匹配失效，用 `--debug` 查看解析错误；可用 `claude plugin validate` 校验某个 Skill 目录。技能清单按上下文窗口约 1% 预算裁剪描述，超预算时从最少使用的 Skill 开始丢弃描述，`/context` 的 Skills 行反映裁剪后的实际值。新增一个此前不存在的顶层 Skill 目录后，需要 `/reload-skills` 才会被监视。 [@ref-cc-skills-diagnostics] [@ref-cc-skills-budget] [@ref-cc-skills-livechange]

关于版本：本章所引官方页面没有标注适用版本，其 `version_applicability` 为 unknown，页面也出现 `v2.1.x` 级别的行为门槛。选定的 npm 包快照 `snapshot-claude-code-npm` 记录 `@anthropic-ai/claude-code` 版本为 2.1.283，但包内 README 只指向在线文档，不能据此把上述机制固定到该精确版本。 [@ref-cc-npm-readme]

