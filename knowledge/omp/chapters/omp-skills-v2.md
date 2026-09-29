---
schema_version: 2
record_kind: production
edition_id: omp-skills-v2
harness_id: omp
topic: skills
title: OMP Skills 来源、格式与调用
sections:
  - section_id: skills-locations
    source_refs:
      - ref-omp-skills-providers-doc
  - section_id: skills-discovery
    source_refs:
      - ref-omp-skills-discovery-doc
      - ref-omp-skills-providers-doc
  - section_id: skills-collision
    source_refs:
      - ref-omp-skills-collision-doc
      - ref-omp-skills-discovery-doc
  - section_id: skills-format
    source_refs:
      - ref-omp-skills-frontmatter-code
      - ref-omp-skills-discovery-doc
  - section_id: skills-extensions
    source_refs:
      - ref-omp-skills-frontmatter-code
  - section_id: skills-conditions
    source_refs:
      - ref-omp-skills-providers-doc
  - section_id: skills-loading
    source_refs:
      - ref-omp-skills-runtime-doc
  - section_id: skills-invocation
    source_refs:
      - ref-omp-skills-invoke-code
      - ref-omp-skills-runtime-doc
  - section_id: skills-diagnostics
    source_refs:
      - ref-omp-skills-collision-doc
questions:
  - question_id: skills.roots
    section_id: skills-locations
    status: answered
    source_refs:
      - ref-omp-skills-providers-doc
  - question_id: skills.discovery
    section_id: skills-discovery
    status: answered
    source_refs:
      - ref-omp-skills-discovery-doc
  - question_id: skills.collision
    section_id: skills-collision
    status: answered
    source_refs:
      - ref-omp-skills-collision-doc
  - question_id: skills.format
    section_id: skills-format
    status: answered
    source_refs:
      - ref-omp-skills-frontmatter-code
  - question_id: skills.extensions
    section_id: skills-extensions
    status: partial
    source_refs:
      - ref-omp-skills-frontmatter-code
  - question_id: skills.loading
    section_id: skills-loading
    status: answered
    source_refs:
      - ref-omp-skills-runtime-doc
  - question_id: skills.invocation
    section_id: skills-invocation
    status: answered
    source_refs:
      - ref-omp-skills-invoke-code
  - question_id: skills.conditions
    section_id: skills-conditions
    status: answered
    source_refs:
      - ref-omp-skills-providers-doc
  - question_id: skills.diagnostics
    section_id: skills-diagnostics
    status: partial
    source_refs:
      - ref-omp-skills-collision-doc
---
本章材料来自源码修订 dff728c 的官方文档与 npm 包 `@oh-my-pi/pi-coding-agent` 18.3.4 的包内源码。来源集合、发现管线、过滤与合并规则来自文档，frontmatter 类型来自包内 `src/capability/skill.ts`，调用解析来自 `src/extensibility/skills.ts`。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有在隔离 HOME 下实际放置技能并读取警告列表，改动文件后的重载时机与 omp-managed 的运行时刷新仍未取证。

下面的文件与目录示例是固定来源给出的形态，用来说明位置和字段，不代表本轮运行过的配置。

## Skill 来源与优先级 {#skills-locations}

OMP 的 Skill 是磁盘上的 `SKILL.md` 目录。技能根按 provider 优先级排列，优先级高者先被发现：native 优先级 100，覆盖用户与项目的 `.omp` 技能；omp-plugins 优先级 90，扫描扩展包旁边或已安装插件里的 `skills/`；claude 优先级 80；70 这一组依次是 claude-plugins、agents 与 codex；opencode 优先级 55；github 优先级 30，只认项目里的 `.github/skills`；omp-managed 优先级 5，是用户级自动学习目录。 [@ref-omp-skills-providers-doc]

用户级路径随 profile 或 `OMP_PROFILE` 变化，项目级路径来自当前工作目录。原生 provider 会从当前工作目录向上、经过仓库根或 home 边界的每个 `.omp/skills` 收集技能，再加上用户 agent 目录下的 `skills`。具体展开仍由各 provider 的发现代码决定，本节只确证优先级与来源集合。 [@ref-omp-skills-providers-doc]

## 发现管线与文件布局 {#skills-discovery}

`loadSkills()` 分三遍：先经 capability provider 加载（managed/自动学习那一路在此跳过），再扫描 `skills.customDirectories` 下的 `*/SKILL.md`，最后追加 omp-managed 技能。`skills.enabled` 为 false 时直接返回空。provider 扫描是非递归的单层枚举，嵌套目录不会被发现。 [@ref-omp-skills-discovery-doc]

一个会被发现的布局如下：

```text
.omp/skills/
  release-notes/
    SKILL.md          # discovered
  team/
    internal/
      SKILL.md        # not discovered by provider loaders
```

要分层组织时，把 `skills.customDirectories` 指向那个嵌套父目录；扫描本身仍是非递归的。下面这段用户级 `~/.omp/agent/config.yml` 打开技能、追加一个自定义目录，并把第三方 claude 用户级来源纳入发现：

```yaml
skills:
  enabled: true
  customDirectories:
    - ~/shared-skills
enabledProviders:
  - claude
```

`skills.enabled: false` 会让发现返回空；`skills.customDirectories` 里的技能覆盖默认 provider 的同名技能；`enabledProviders` 是第三方用户级来源的开关，默认空表示它们不加载，而项目级来源默认仍然加载。检查方式是 /skill 命令列表或系统提示里的技能清单，以及加载时产生的 collision 警告。 [@ref-omp-skills-discovery-doc] [@ref-omp-skills-providers-doc]

## 同名合并与冲突 {#skills-collision}

同名技能按 provider 顺序先到先得。`extensibility/skills.ts` 还会用 realpath 去掉指向同一文件的重复项，并对后到的同名项发出 collision 警告；自定义目录里的技能在 provider 技能之后合并，覆盖默认路径 provider 的同名技能，而自定义目录之间仍是先到先得。 [@ref-omp-skills-collision-doc] [@ref-omp-skills-discovery-doc]

## SKILL.md 格式 {#skills-format}

`SKILL.md` 的 frontmatter 类型声明了 `name`、`description`、`globs`、`alwaysApply`、`hide` 与 `disableModelInvocation`，并允许未知键保留为元数据。`name` 缺省取目录名；原生 `.omp`、omp-plugins、github provider 与自定义目录要求 `description`。 [@ref-omp-skills-frontmatter-code] [@ref-omp-skills-discovery-doc]

一个能放进自己目录的最小 `SKILL.md`：

```md
---
name: release-notes
description: Draft release notes from merged changes using repository conventions.
globs:
  - "CHANGELOG.md"
---

Collect merged pull requests, group them by type, and draft entries that match the existing changelog style.
```

`name` 是技能名与去重键，`description` 是系统提示里展示的那一行，也是模型判断是否使用该技能的依据；`globs` 与 `alwaysApply` 虽在类型中声明，固定片段没有说明它们的运行时效果，属明确缺口。生效结果是宿主把该目录注册为一个技能，正文按需读取；检查方式是在系统提示的技能清单里看到它的 description，并确认加载没有同名 collision 警告。 [@ref-omp-skills-frontmatter-code] [@ref-omp-skills-discovery-doc]

## 专有字段 {#skills-extensions}

目前可确证的专有字段是 `hide` 与 Agent Skills 标准的 `disable-model-invocation`（规范化为 `disableModelInvocation`）。两者都只把技能从系统提示的技能列表里隐藏，不移除加载。 [@ref-omp-skills-frontmatter-code]

缺口：固定片段只给出这一处的字段列表，是否还有该类型未列出的附加文件、配置项或其它专有键还没有取证。 [@ref-omp-skills-frontmatter-code]

## 来源开关与过滤条件 {#skills-conditions}

来源开关由 `skills.enablePiUser`、`enablePiProject`、`enableAgentsUser` 等设置控制；`disabledExtensions` 中带 `skill:` 前缀的条目、`ignoredSkills`（glob 排除）与 `includeSkills`（glob 白名单，为空表示全部包含）继续过滤。过滤顺序是：未被 `disabledExtensions` 禁用、来源已启用、不在忽略列表、命中白名单。第三方用户级来源默认需要显式启用，项目级默认加载；agents provider 是 OMP 原生位置，关掉 Claude、Codex 或 Pi 不会连带关掉它。 [@ref-omp-skills-providers-doc]

## 提示暴露与加载 {#skills-loading}

技能的名称与描述进入系统提示的技能列表；`hide` 为真或 `disableModelInvocation` 的技能不列入该列表，但仍会被加载，并可通过 `skill://NAME` 与 `/skill:NAME` 读取。任务子代理按常规会话获得同一份技能列表，没有逐任务的技能固定。 [@ref-omp-skills-runtime-doc]

## 显式调用 {#skills-invocation}

`parseSkillInvocation()` 识别行首的 `/skill:NAME` 记号，也识别嵌入在正文中的同名记号；嵌入形式会把周围正文并入参数。是否注册为可用的斜杠命令由 `skills.enableSkillCommands` 控制。 [@ref-omp-skills-invoke-code] [@ref-omp-skills-runtime-doc]

## 诊断缺口 {#skills-diagnostics}

可确证的观察点是加载时产生的 collision 警告与 capability provider 的警告数组，二者由 `loadSkills()` 汇总返回。本轮没有在隔离 HOME 下实际放置技能并读取这两个列表，所以“改动文件后何时重载、omp-managed 何时刷新”仍缺运行证据，属部分结论。 [@ref-omp-skills-collision-doc]
