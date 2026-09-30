---
schema_version: 3
record_kind: production
edition_id: omp-skills-v1
harness_id: omp
topic: skills
title: OMP Skills 机制
sections:
  - section_id: skills-sources
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-providers-doc
      - ref-omp-skills-discovery-doc
      - ref-omp-skills-collision-doc
  - section_id: skills-format
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-frontmatter-code
  - section_id: skills-use
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-runtime-doc
      - ref-omp-skills-invoke-code
      - ref-omp-skills-discovery-doc
      - ref-omp-skills-collision-doc
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-sources
        status: answered
        source_refs:
          - ref-omp-skills-providers-doc
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-sources
        status: answered
        source_refs:
          - ref-omp-skills-discovery-doc
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-sources
        status: answered
        source_refs:
          - ref-omp-skills-collision-doc
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-omp-skills-frontmatter-code
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs:
          - ref-omp-skills-frontmatter-code
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-use
        status: answered
        source_refs:
          - ref-omp-skills-runtime-doc
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-use
        status: answered
        source_refs:
          - ref-omp-skills-invoke-code
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-sources
        status: answered
        source_refs:
          - ref-omp-skills-providers-doc
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-use
        status: partial
        source_refs:
          - ref-omp-skills-collision-doc
---
## Skill 来源与发现 {#skills-sources}

OMP 的 Skill 是磁盘上的 `SKILL.md` 目录，加载入口在 npm 包 18.3.4 的 `src/extensibility/skills.ts`。下面按固定问题说明来源、过滤与合并链；文档结论来自固定源码修订 dff728c 的官方文档。

**skills.roots**：Skill 根目录按 provider 优先级排列，最高是原生 `.omp`（用户 agentDir 与项目 `.omp`），其后依次是 omp-plugins、claude、优先级 70 组的 claude-plugins/agents/codex、opencode、github，最后是 omp-managed 自动学习目录。用户级路径随 profile（OMP_PROFILE 或 --profile）变化，项目级路径来自当前工作目录。具体展开仍由各 provider 的发现代码决定，本章只确证优先级与来源集合。 [@ref-omp-skills-providers-doc]

**skills.discovery**：`loadSkills()` 分三遍：先经 capability provider 加载，再扫描 `skills.customDirectories`（单层 `SKILL.md`），最后追加 omp-managed 技能；`skills.enabled: false` 时直接返回空。扫描为单层，嵌套目录（skills/group/name/SKILL.md）不会被 provider 发现。 [@ref-omp-skills-discovery-doc]

**skills.collision**：同名去重按 provider 顺序先到先得；`extensibility/skills.ts` 额外用 realpath 去重同一文件（符号链接安全），并对后到的同名项发出 collision 警告。自定义目录中的技能会覆盖默认 provider 的同名技能，自定义目录之间仍是先到先得。 [@ref-omp-skills-collision-doc]

**skills.conditions**：来源开关由 `skills.enablePiUser`、`enablePiProject`、`enableAgentsUser` 等设置控制；`disabledExtensions` 中的 skill 前缀项、`ignoredSkills`（glob）与 `includeSkills`（glob 白名单）继续过滤，顺序为未被禁用、来源已启用、不在忽略列表、命中白名单。第三方用户级来源默认需显式启用，项目级默认加载。 [@ref-omp-skills-providers-doc]

## Skill 文件格式 {#skills-format}

**skills.format**：`SKILL.md` frontmatter 的类型字段为 name、description、globs、alwaysApply、hide、disableModelInvocation，并允许未知键（保留为元数据）。name 缺省取目录名；原生 `.omp`、omp-plugins、github provider 与自定义目录要求 description。 [@ref-omp-skills-frontmatter-code]

**skills.extensions**：OMP 专有字段目前可确证 hide 与 Agent Skills 标准的 disable-model-invocation（规范化为 disableModelInvocation），二者只把技能从系统提示列表隐藏，不移除加载。是否还有该类型未列出的附加文件或配置项本章未取证，属明确缺口。 [@ref-omp-skills-frontmatter-code]

## 加载、调用与诊断 {#skills-use}

**skills.loading**：名称与描述进入系统提示的技能列表；hide 为真（或 disableModelInvocation）的技能不列入提示，但仍可经 skill 协议与 /skill 命令读取。任务子代理按常规会话获得同一技能列表，没有逐任务技能固定。 [@ref-omp-skills-runtime-doc]

**skills.invocation**：`parseSkillInvocation()` 识别行首的 /skill:NAME 与正文中嵌入的同名记号；嵌入形式会把周围正文并入参数，且该形式经 allowsSkillTokens 门控。是否注册为命令由 `skills.enableSkillCommands` 控制。 [@ref-omp-skills-invoke-code]

**skills.diagnostics**：可确证的观察点是加载时产生的 collision 警告与 capability provider 的警告数组，二者由 `loadSkills()` 汇总返回。本轮没有在隔离 HOME 下实际放置技能并读取警告列表，改动文件后的重载时机与 omp-managed 的运行时刷新仍未取证。 [@ref-omp-skills-collision-doc]
