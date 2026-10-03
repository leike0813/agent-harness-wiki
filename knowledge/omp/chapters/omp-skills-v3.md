---
schema_version: 3
record_kind: production
edition_id: omp-skills-v3
harness_id: omp
topic: skills
title: OMP Skills 来源、格式与调用
sections:
  - section_id: skills-locations
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-providers-doc-69e8
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-discovery-doc-69e8
      - ref-omp-skills-providers-doc-69e8
  - section_id: skills-collision
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-collision-doc-69e8
      - ref-omp-skills-namespaced-doc-69e8
      - ref-omp-skills-discovery-doc-69e8
  - section_id: skills-format
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-format-doc-69e8
      - ref-omp-skills-discovery-doc-69e8
  - section_id: skills-extensions
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-format-doc-69e8
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-filters-doc-69e8
      - ref-omp-skills-providers-doc-69e8
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-exposure-doc-69e8
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-invocation-doc-69e8
      - ref-omp-skills-exposure-doc-69e8
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-omp-skills-collision-doc-69e8
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-omp-skills-providers-doc-69e8
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs:
          - ref-omp-skills-discovery-doc-69e8
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-collision
        status: answered
        source_refs:
          - ref-omp-skills-collision-doc-69e8
          - ref-omp-skills-namespaced-doc-69e8
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-omp-skills-format-doc-69e8
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-extensions
        status: partial
        source_refs:
          - ref-omp-skills-format-doc-69e8
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs:
          - ref-omp-skills-exposure-doc-69e8
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-omp-skills-invocation-doc-69e8
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: answered
        source_refs:
          - ref-omp-skills-filters-doc-69e8
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs:
          - ref-omp-skills-collision-doc-69e8
---
本章材料来自源码修订 69e8c9e 的官方文档 `docs/skills.md`。来源集合、发现管线、同名冲突与命名空间规则、frontmatter 字段、过滤顺序、系统提示暴露与调用投递方式都取自该修订的文档正文。相对上一版的变化是实质性的：技能来源新增 `skillshare` 与 `agent-plugins` 两个 provider，同名技能不再简单丢弃，而是给低优先级变体加 `<命名空间>/<名称>` 后缀并保留。当前发布仍没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有在隔离 HOME 下实际放置技能并读取警告列表，改动文件后的重载时机与 omp-managed 的运行时刷新仍未取证。

下面的文件与目录示例是固定来源给出的形态，用来说明位置和字段，不代表本轮运行过的配置。

## Skill 来源与优先级 {#skills-locations}

技能根按 provider 优先级排列，高者先被发现；同优先级内按注册顺序。`native` 优先级 100，覆盖用户与项目的 `.omp` 技能且不可关闭；新增的 `skillshare` 优先级 95，来自项目 `.omp/skills.lock.json` 或用户 agent 目录 `skills.lock.json` 固定的包（`omp skill install` 安装），同名时仍让位给作者自己写的技能；`omp-plugins` 优先级 90；`claude` 优先级 80；新增的 `agent-plugins` 优先级 75 处理带 `plugin.json` 的可移植包；70 这一组按注册顺序是 claude-plugins、agents、codex；`opencode` 55；`github` 30；`omp-managed` 5，位于 `~/.omp/agent/managed-skills`，无条件发现，只有写入与提醒受 `autolearn.enabled` 控制。 [@ref-omp-skills-providers-doc-69e8]

相对上一版，`skillshare` 排在几乎所有作者来源之前，而文档同时声明作者技能在同名冲突时压过它——这构成一条独立于纯优先级排序的覆盖规则，不能只按数字解读。

## 发现管线与文件布局 {#skills-discovery}

`loadSkills()` 分三遍：先经 capability provider 加载（managed/自动学习那一路在此跳过），再以 `requireDescription: true` 扫描 `skills.customDirectories` 下的 `*/SKILL.md`，最后解析 omp-managed 技能。`skills.enabled` 为 false 时直接返回空。provider 扫描与自定义目录扫描都是非递归的单层枚举，嵌套目录不会被发现。 [@ref-omp-skills-discovery-doc-69e8]

本版明确了第二遍的覆盖语义：自定义目录里的技能覆盖同名 provider 技能，而被挤掉的 provider 技能仍然以它的命名空间名字可达，除非正文完全相同。自定义目录与 omp-managed 都排在 provider 之后，managed 最后落位，因此任何已启用的同名作者技能都优先于它。 [@ref-omp-skills-discovery-doc-69e8]

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

## 同名合并与命名空间 {#skills-collision}

这是本版改动最大的机制。capability 层按技能名去重，`items` 视图里同名保留先到的那一个；`loadSkills()` 则从去重前的超集上工作，低优先级的副本仍会被检查。随后 `extensibility/skills.ts` 依次处理：用 realpath 去掉指向同一文件的重复项；正文与 frontmatter 深度相等的同名技能被静默丢弃，被覆盖方连带它自己的命名空间别名一起丢弃；正文不同的同名技能里，高优先级者保留裸名，其余每个变体加上 `<命名空间>/<名称>` 后缀，并发出指明路径的 collision 警告。 [@ref-omp-skills-collision-doc-69e8]

裸名的归属顺序是：作者写的技能压过 registry 安装的包（`skillshare`）；自定义目录里的技能压过 provider 技能（#7190）；其余情况是先被接纳的那个保留裸名——provider 之间按 provider 优先级，自定义目录之间按 `skills.customDirectories` 的数组顺序。命名空间取自 provider 元数据里的插件身份，`claude-plugins` 与 `agent-plugins` 用插件名，`omp-plugins` 用扩展包名，`skillshare` 用包名；没有插件身份时退回拥有 `skills/` 树的目录或技能根目录名，再退回 provider id。命名空间本身被占用时再加 `~2`、`~3` 后缀。 [@ref-omp-skills-collision-doc-69e8]

还有两条硬规则：frontmatter 里含 `/` 或 `\` 的原始 `name` 一律拒绝并告警，因为分隔符留给命名空间形态和 `skill://<名称>/<路径>` 解析；命名空间技能通过 `skill://<命名空间>/<名称>[/<路径>]` 与 `/skill:<命名空间>/<名称>` 记号解析，行首与句中都生效，句中记号只接受恰好一层 `/`。 [@ref-omp-skills-namespaced-doc-69e8]

## SKILL.md 格式 {#skills-format}

`SKILL.md` 支持的 frontmatter 字段是 `name`、`description`、`globs`、`alwaysApply`、`hide` 与 `disableModelInvocation`（由 kebab-case 的 `disable-model-invocation` 归一而来），额外键按惯例扫描器保留为未知元数据。`name` 缺省取目录名；`description` 对原生 `.omp` provider、`omp-plugins` 扩展包技能、`github` provider（`.github/skills/`）与 `skills.customDirectories` 扫描是必需的，claude/codex/agents/opencode/claude-plugins 则可无描述加载。 [@ref-omp-skills-format-doc-69e8]

注意两条来源用不同的校验器：常规扫描器宽松，允许未知键；而 `agent-plugins` 按 Agent Skills 规范严格校验，要求 name/description、与目录名一致、命名合法、frontmatter 字段集封闭，`hide` 和 `enabled` 这类 OMP 专有字段在那里不被接受。 [@ref-omp-skills-format-doc-69e8]

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

`name` 是技能名与去重键，也是裸名与命名空间地址的一部分；`description` 是系统提示里展示的那一行，也是模型判断是否使用该技能的依据。`globs` 与 `alwaysApply` 在类型中声明，但文档明确它们是元数据，不是自动触发调用的开关，属明确缺口。 [@ref-omp-skills-format-doc-69e8]

## 专有字段 {#skills-extensions}

可确证的专有字段是 `hide`、`disableModelInvocation`，以及本版新增的 `enabled: false`——它让常规扫描器与 Skillshare 发现跳过该技能。`hide` 与 `disableModelInvocation` 只把技能从系统提示的技能列表里隐藏，不移除加载。 [@ref-omp-skills-format-doc-69e8]

缺口：文档只给出这一组字段列表，且明确 `agent-plugins` 不接受 `hide` 与 `enabled`。是否还有该类型未列出的附加文件、配置项或其它专有键仍没有取证；`enabled: false` 在 omp-managed 自动学习技能上的确切效果也没有单独说明。 [@ref-omp-skills-format-doc-69e8]

## 来源开关与过滤条件 {#skills-conditions}

来源开关由 `enableCodexUser`、`enableClaudeUser`、`enableClaudeProject`、`enablePiUser`、`enablePiProject`、`enableAgentsUser`、`enableAgentsProject` 控制；`disabledExtensions` 中带 `skill:<名称>` 前缀的条目、`ignoredSkills`（glob 排除）与 `includeSkills`（glob 白名单，为空表示全部包含）继续过滤。过滤顺序是：未被 `disabledExtensions` 禁用、来源已启用、不在忽略列表、命中白名单。 [@ref-omp-skills-filters-doc-69e8]

第三方用户级来源默认需要经 `enabledProviders` 显式启用，它们的项目级根目录仍默认加载；原生 OMP 来源与注册在 `~/.omp/plugins` 下的 marketplace 插件也默认加载。`agents` provider 有自己的 `enableAgentsUser`/`enableAgentsProject` 开关，关掉 Claude、Codex 或 Pi 不会连带关掉它。对 `claude-plugins` 而言，opt-in 门只作用于来自 Claude Code 自身用户注册表的插件。 [@ref-omp-skills-filters-doc-69e8]

## 提示暴露与加载 {#skills-loading}

系统提示是否列出技能，取决于是否有活动工具声明 `readsSkillUris: true`：声明了就列入已发现的技能列表并排除隐藏技能（挂载为 `xd://` 的工具在能力元数据被投影时同样计入），否则整份技能列表不进提示。没有工具元数据时，提示构建器退回以 `read` 的存在与否作兼容判断。 [@ref-omp-skills-exposure-doc-69e8]

`hide: true` 不禁用技能：隐藏技能照样加载，并在启用技能命令时通过 `skill://<名称>` 与 `/skill:<名称>` 保持可达。任务子代理经常规会话创建获得同一份技能列表，没有逐任务的技能固定覆盖。 [@ref-omp-skills-exposure-doc-69e8]

## 显式调用 {#skills-invocation}

`skills.enableSkillCommands` 为真时，交互模式为每个已发现技能注册一条斜杠命令。`/skill:<名称> [args]` 识别行首的 `/skill:<名称>`，也识别嵌在普通正文里、由空白分隔的同名记号；嵌入形式会移除记号并把周围正文当作参数，当草稿以另一条斜杠命令或本地 bash/Python 执行符开头时不视为调用。它直接按 `filePath` 读取技能文件、剥离 frontmatter，把正文连同技能名、基目录和可选用户参数包成自定义消息注入。 [@ref-omp-skills-invocation-doc-69e8]

投递方式跟随提交键绑定，本版明确没有单独的开关或模式选择器：Enter 在流式期间把技能投到 `steer` 队列，非流式时作为普通空闲提示；Ctrl+Q / Ctrl+Enter（`app.message.followUp` 的默认绑定）投到 `followUp` 队列。两条路径都经 `input-controller.ts` 的 `#invokeSkillCommand`，再委托给 `src/modes/skill-command.ts` 的 `invokeSkillCommandFromText`。 [@ref-omp-skills-invocation-doc-69e8]

被调用的技能内容按调用种类区分提示模板：用户调用（`user-invocation.md`）会声明用户调用了技能、嵌入正文并附上技能目录；自动加载（`autoload.md`）只给正文加 `Skill: <路径>` 的来源标记，用于子代理按 `autoloadSkills` 前置字段自动注入的隐藏消息，不得声称是用户调用。 [@ref-omp-skills-invocation-doc-69e8]

## 诊断缺口 {#skills-diagnostics}

可确证的观察点是加载时产生的 collision 警告与 capability provider 的警告数组，二者由 `loadSkills()` 汇总返回。本版新增了可预期的告警面：正文不同的同名技能会为每个被挤掉的变体发出带路径的警告，非法 `name`（含 `/` 或 `\`）也会告警，而正文与 frontmatter 深度相等的同名技能是被静默丢弃的、不产生警告。 [@ref-omp-skills-collision-doc-69e8]

本轮没有在隔离 HOME 下实际放置技能并读取这两个列表，所以“改动文件后何时重载、omp-managed 何时刷新”仍缺运行证据，属部分结论。 [@ref-omp-skills-collision-doc-69e8]
