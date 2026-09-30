---
schema_version: 3
record_kind: production
edition_id: opencode-skills-v2
harness_id: opencode
topic: skills
title: OpenCode 的 Skills 机制
sections:
  - section_id: skills-locations
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-locations
      - ref-opencode-skills-code
      - ref-opencode-skills-builtin
  - section_id: skills-authoring
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-frontmatter
      - ref-opencode-skills-listing
      - ref-opencode-skills-diagnostics
  - section_id: skills-extension-paths
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-extensions
      - ref-opencode-skills-diagnostics
  - section_id: skills-selection
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-permissions
      - ref-opencode-skills-listing
      - ref-opencode-skills-code
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-loading
      - ref-opencode-skills-listing
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-diagnostics
      - ref-opencode-skills-code
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-opencode-skills-locations
          - ref-opencode-skills-code
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-opencode-skills-code
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: partial
        source_refs:
          - ref-opencode-skills-code
          - ref-opencode-skills-builtin
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-authoring
        status: answered
        source_refs:
          - ref-opencode-skills-frontmatter
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-extension-paths
        status: partial
        source_refs:
          - ref-opencode-skills-extensions
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs:
          - ref-opencode-skills-loading
          - ref-opencode-skills-listing
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-selection
        status: answered
        source_refs:
          - ref-opencode-skills-permissions
          - ref-opencode-skills-listing
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-selection
        status: partial
        source_refs:
          - ref-opencode-skills-permissions
          - ref-opencode-skills-code
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs:
          - ref-opencode-skills-diagnostics
---
本章依据固定源码提交 545f51d 的官方文档与实现。该提交的源码树不等于 npm 包 opencode-ai@1.18.32 的运行时行为；下文路径、字段与命令属于固定源码知识，对 1.18.32 二进制的适用性尚未建立映射，因此不给出只对某个包版本成立的配方。示例中的凭据一律写成占位符。

## Skill 的存放位置与扫描范围 {#skills-locations}

OpenCode 以“一个目录一个 Skill”为单位组织能力，每个目录里的 SKILL.md 是入口文件。查找范围分成三组：项目与全局的配置目录，以及 Claude 和 agents 两套兼容目录。项目位置不只看当前目录，而是从当前工作目录向上逐级查找到最近的 Git worktree 根，沿路命中的都纳入；全局位置固定读取用户 home 下的对应目录。 [@ref-opencode-skills-locations] [@ref-opencode-skills-code]

```text
.opencode/skills/{name}/SKILL.md           # 项目配置位置
~/.config/opencode/skills/{name}/SKILL.md  # 全局配置位置
.claude/skills/{name}/SKILL.md             # 项目 Claude 兼容位置
~/.claude/skills/{name}/SKILL.md           # 全局 Claude 兼容位置
.agents/skills/{name}/SKILL.md             # 项目 agents 兼容位置
~/.agents/skills/{name}/SKILL.md           # 全局 agents 兼容位置
```

这里的示例是想让读者看清目录形状，{name} 代表 Skill 名这个变量，不是要照抄的字面路径。扫描按模式匹配：配置目录用 `{skill,skills}/**/SKILL.md`，因此旧的单数 skill/ 目录仍被接受；两套兼容目录用 skills/**/SKILL.md；扩展路径与远端目录用 **/SKILL.md。递归深度由 ** 决定，匹配跟随符号链接，隐藏目录只有在显式开启 dot 时才纳入。扫描阶段没有单独的忽略清单，跨位置去重发生在后续加载阶段。 [@ref-opencode-skills-code]

同名 Skill 以名称去重：后处理到的条目整体覆盖先前条目，源码只打印一条 duplicate skill name 警告并保留原 location，既不合并正文也不保留命名空间。内置的 customize-opencode 在磁盘扫描之前注册，因此磁盘上同名 Skill 会覆盖内置正文。覆盖顺序来自源码，尚未在该包二进制上观察，故本项标 partial。 [@ref-opencode-skills-code] [@ref-opencode-skills-builtin]

固定引用没有显示 Skill 位置受环境变量影响，环境变量是否改变 Skill 根目录属未决项，需要后续核对配置目录接口再补。

## 编写一个 SKILL.md {#skills-authoring}

SKILL.md 是可编辑的文本入口。项目级放在 .opencode/skills/{name}/SKILL.md，全局级放在 ~/.config/opencode/skills/{name}/SKILL.md，两者格式相同。下面以项目级 Skill git-release 为例，给出可放入 .opencode/skills/git-release/SKILL.md 的最小完整示例： [@ref-opencode-skills-frontmatter]

```markdown
---
name: git-release
description: 根据已合并的 PR 起草发布说明，并给出 gh release create 命令
license: MIT
compatibility: opencode
---

Use this skill when preparing a tagged release.
```

字段含义与约束如下。name 必填，须为 1–64 字符，小写字母数字加单个连字符分隔，不以 - 起止、不含连续 --，等价正则为 ^[a-z0-9]+(-[a-z0-9]+)*$，并且必须与所在目录名一致，这是最容易写错的字段。description 必填，1–1024 字符，写清用途以便模型选择。license 与 compatibility 可选。还有一个可选的 metadata 字段，是字符串到字符串的映射，可用来挂作者、受众等自定义键；示例为简洁没有写它，加上它仍合法。未列出的 frontmatter 字段被忽略，正文在该 Skill 被调用时作为指令返回。

前提是上面列出的某个位置下确实有这样一个目录，目录名与 name 完全一致，且 frontmatter 是合法 YAML。生效结果是发现阶段解析出 name 与 description，并随 skill 工具描述进入可用技能列表 [@ref-opencode-skills-listing]。检查方式是运行 opencode debug skill，在输出 JSON 里确认该 name 与预期 location 都在其中。 [@ref-opencode-skills-diagnostics]

## 扩展目录与远端来源 {#skills-extension-paths}

除内置与兼容目录外，配置里还有两个键可以追加 Skill 来源，都写在 opencode.json 顶层的 skills 对象里（项目根 opencode.json，或用户级 ~/.config/opencode/opencode.json）：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "skills": {
    "paths": ["~/.config/opencode/skills-extra"],
    "urls": ["https://skills.example.com/catalog"]
  }
}
```

paths 是数组，每个元素是一个本地目录：以 ~/ 开头时展开到 home，绝对路径原样使用，相对路径基于当前工作目录解析，目录不存在时记录一条 skill path not found 警告并跳过该路径。urls 是数组，每个元素是一个远端索引地址，交给拉取流程（源码中的 discovery.pull）下载目录后再按 **/SKILL.md 扫描，frontmatter 约束对这些来源同样成立。示例里的 https://skills.example.com/catalog 只是示意占位，固定来源没有声明这样一个远端真实可用。 [@ref-opencode-skills-extensions]

前提是 opencode.json 已生效，paths 指向的目录真实存在，urls 指向的远端确实提供索引。生效结果是这些目录里符合模式的 Skill 与内置位置一样进入发现流程。检查方式仍是 opencode debug skill，用每个 Skill 的 location 判断它是否来自扩展来源。 [@ref-opencode-skills-diagnostics]

官方 skills 文档只描述内置与兼容目录，skills 键以源码为准；同一引用范围没有说明远端索引的文件格式与缓存位置，也未在该包二进制上验证，因此本项标 partial。

## 权限、可见性与调用 {#skills-selection}

Skill 的可用性由权限控制，权限写在 opencode.json（项目根或 ~/.config/opencode/）的 permission.skill 下，键是 Skill 名或通配模式，值是动作：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "skill": {
      "*": "allow",
      "pr-review": "allow",
      "internal-*": "deny",
      "experimental-*": "ask"
    }
  }
}
```

allow 立即加载，ask 在加载前要求用户批准，deny 把该 Skill 从可用列表隐藏并拒绝访问。模式支持通配，internal-* 因而匹配 internal-docs、internal-tools 等。前提是这段配置能生效，规则按写出的顺序对名称求值。生效结果是这些动作作用到 skill 工具描述里的可用技能列表 [@ref-opencode-skills-listing]；检查方式就是对着那份列表看目标 Skill 是否出现，或者加载时是否弹出询问。 [@ref-opencode-skills-permissions]

同一个 Skill 可以对不同 Agent 给不同权限。自定义 Agent 在自身 frontmatter 里写 permission.skill；内置 Agent 则在同一份 opencode.json 的 agent 条目下写 permission.skill：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "plan": {
      "permission": {
        "skill": { "internal-*": "allow" }
      }
    }
  }
}
```

前提是这里引用的 Agent id 确实存在（plan 是内置 Agent）。生效结果是该 Agent 得到一份独立于全局默认的 Skill 权限，检查方式是在该 Agent 会话里看可用技能列表是否随之变化。 [@ref-opencode-skills-permissions]

如果某个 Agent 完全不该用 Skill，自定义 Agent 在 frontmatter 写 tools: { skill: false }，内置 Agent 写 agent.plan.tools.skill: false，此时可用技能段落整体消失。 [@ref-opencode-skills-permissions]

调用由模型发起，用户没有单独的“运行 Skill”命令：模型按需调用 skill({ name })，加载前按 permission 的 skill 维度询问。生效条件还有运行特性开关，源码的 RuntimeFlags 中 disableExternalSkills 关闭全部外部目录发现，disableClaudeCodeSkills 单独关闭 .claude/ 兼容目录。源码发现路径没有项目信任判断，文档也未把信任列为条件，因此信任维度属已知缺口，本项标 partial。 [@ref-opencode-skills-code]

## 加载正文与资源 {#skills-loading}

发现阶段解析 frontmatter 与正文后把结果缓存在内存，name 与 description 进入 skill 工具描述中的可用技能列表 [@ref-opencode-skills-listing]。真正的加载发生在模型调用 skill 工具时，调用形态是：

```js
skill({ name: "git-release" })
```

前提是该 Skill 已通过权限检查，name 与发现阶段的名称一致。生效结果是返回该 Skill 的正文，并附上基目录、资源相对路径说明，以及最多 10 个同目录文件的采样路径。由此可以推断两件事：Skill 里的 scripts/、reference/ 等相对路径以 Skill 目录为基准解析；给出的文件清单是采样，不是完整列举，因此不要把“没列出来”当成“文件不存在”。 [@ref-opencode-skills-loading]

## 诊断与重载 {#skills-diagnostics}

opencode debug skill 会把全部已加载 Skill 以 JSON 输出，含名称、描述、位置和正文，是核验发现结果的主要入口。 [@ref-opencode-skills-diagnostics]

排查“文件写了但没出现”时，先看该命令输出里是否有目标 Skill，再对照 location 判断命中的是项目位置、全局位置还是兼容位置；如果出现重复处理的迹象，回到上面的覆盖规则，同名条目只有后处理到的那一条会留下。 [@ref-opencode-skills-code]

此外，固定来源未声明 Skill 目录的热重载入口，文档也没有给出重载命令，改动后是否需要重启进程尚无说明，这是本节仍未解决的缺口。
