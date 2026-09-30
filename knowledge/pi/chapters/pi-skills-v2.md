---
schema_version: 3
record_kind: production
edition_id: pi-skills-v2
harness_id: pi
topic: skills
title: Pi Skills：发现、格式、加载与调用（固定源码 781152f）
sections:
  - section_id: skills-locations
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-locations
      - ref-pi-skills-discovery
      - ref-pi-skills-code-discovery
      - ref-pi-res-code-project-order
      - ref-pi-res-code-user-order
      - ref-pi-skills-validation
      - ref-pi-skills-code-collision
  - section_id: skills-authoring
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-structure
      - ref-pi-skills-format
      - ref-pi-skills-validation
  - section_id: skills-extension-fields
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-format
      - ref-pi-settings-overview
      - ref-pi-settings-resources
      - ref-pi-packages-structure
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-loading
      - ref-pi-skills-structure
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-invocation
      - ref-pi-skills-format
      - ref-pi-settings-overview
      - ref-pi-settings-resources
      - ref-pi-skills-discovery
      - ref-pi-packages-dedupe
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-validation
      - ref-pi-skills-code-collision
      - ref-pi-ext-resources-discover
      - ref-pi-ext-reload
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-pi-skills-locations
          - ref-pi-skills-discovery
          - ref-pi-res-code-project-order
          - ref-pi-res-code-user-order
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-pi-skills-discovery
          - ref-pi-skills-code-discovery
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-pi-skills-validation
          - ref-pi-skills-code-collision
          - ref-pi-res-code-project-order
          - ref-pi-res-code-user-order
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-authoring
        status: answered
        source_refs:
          - ref-pi-skills-structure
          - ref-pi-skills-format
          - ref-pi-skills-validation
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-extension-fields
        status: answered
        source_refs:
          - ref-pi-skills-format
          - ref-pi-settings-resources
          - ref-pi-packages-structure
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs:
          - ref-pi-skills-loading
          - ref-pi-skills-structure
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-pi-skills-invocation
          - ref-pi-skills-format
          - ref-pi-settings-resources
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-pi-skills-discovery
          - ref-pi-settings-resources
          - ref-pi-packages-dedupe
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs:
          - ref-pi-skills-validation
          - ref-pi-skills-code-collision
          - ref-pi-ext-resources-discover
          - ref-pi-ext-reload
---
固定来源为 pi-mono 仓库提交 781152fc 的 Pi coding agent 包，包含包内文档与源码。本章只描述该提交记录的机制，不据此断言某个 npm 安装版本已具备相同行为；本库尚未为 Pi 建立软件版本映射，因此按 source_only 阅读。下文路径模板取自固定文档，不代表本机实际目录。

## Skill 的发现位置与扫描规则 {#skills-locations}

Pi 从五类位置装载 Skill：全局、项目、包、settings 和命令行。[@ref-pi-skills-locations] 全局根是 `~/.pi/agent/skills/` 与 `~/.agents/skills/`；项目侧是当前目录下的 `.pi/skills/`，以及从当前目录逐级向上、直到 git 仓库根（不在仓库时到文件系统根）的每一级 `.agents/skills/`。[@ref-pi-skills-locations] 这些根随 home、当前工作目录和 git 根变化；固定来源没有给出用环境变量改写它们的方法，这是本地缺口。

两种作用域的典型布局：

```text
~/.pi/agent/skills/            全局，直接 .md 或含 SKILL.md 的目录
~/.agents/skills/              全局，只按目录发现
项目根目录/.pi/skills/          项目（以当前目录为准）
项目根目录/.agents/skills/      项目，含逐级祖先目录
```

扫描在启动阶段进行。在 `~/.pi/agent/skills/` 与 `.pi/skills/` 内，根目录下的直接 `.md` 文件各自算一个 Skill；在所有位置，含 `SKILL.md` 的目录按一个 Skill 根处理，不再下钻；`.agents/skills` 忽略根目录的 `.md`。[@ref-pi-skills-discovery] 源码把规则写成三条：目录内命中 `SKILL.md` 即返回、不再递归；否则加载根目录的直接 `.md` 子文件；再递归子目录寻找 `SKILL.md`。[@ref-pi-skills-code-discovery] 固定来源没有规定目录深度上限，也没有说明符号链接环如何终止，这两点是本地缺口。

默认自动发现的登记顺序是项目组在前、用户组在后：先登记 `.pi/skills` 与项目祖先 `.agents/skills`，再登记用户 `~/.pi/agent/skills` 与 `~/.agents/skills`。[@ref-pi-res-code-project-order][@ref-pi-res-code-user-order] 同名 Skill 产生 warning 并保留先发现者，后出现的同名项不单独载入。[@ref-pi-skills-validation] 源码按 name 建 Map：先到者写入，后到的同名项只记录 collision 诊断（含 winnerPath 与 loserPath）；同一文件经符号链接重复出现则静默跳过。[@ref-pi-skills-code-collision] 结合默认登记顺序，同名时项目侧更可能胜出；此判断来自源码顺序，未在运行中观察。[@ref-pi-res-code-project-order][@ref-pi-res-code-user-order]

## 编写一个 SKILL.md {#skills-authoring}

一个 Skill 是含 `SKILL.md` 的目录，其余内容自由组织；`SKILL.md` 由 YAML frontmatter 和正文组成，正文即指令，脚本与资源用相对 Skill 目录的路径引用。[@ref-pi-skills-structure] 固定来源给出的目录结构：

```text
my-skill/
├── SKILL.md
├── scripts/
│   └── process.sh
└── references/
    └── api-reference.md
```

把下面这份文件保存为 `my-skill/SKILL.md`，就是一个最小可用 Skill：frontmatter 用一行三连字符括起，`name` 须与父目录同名，正文写给模型执行。[@ref-pi-skills-structure][@ref-pi-skills-format]

```markdown
---
name: my-skill
description: What this skill does and when to use it. Be specific.
---

# My Skill

Read references/api-reference.md for details, then run scripts/process.sh.
```

frontmatter 字段列全如下。[@ref-pi-skills-format]

| 字段 | 必填 | 说明 |
|---|---|---|
| `name` | 是 | 最长 64；小写字母、数字、连字符；须与父目录同名 |
| `description` | 是 | 最长 1024；说明 Skill 做什么、何时使用 |
| `license` | 否 | 许可证名或对随包文件的引用 |
| `compatibility` | 否 | 最长 500；环境要求 |
| `metadata` | 否 | 任意键值映射 |
| `allowed-tools` | 否 | 空格分隔的预批准工具列表（experimental） |
| `disable-model-invocation` | 否 | 为 true 时从系统提示隐藏，只能显式 `/skill:name` 调用 |

Pi 按 Agent Skills 标准校验：名称不符目录、超长或含非法字符、首尾或连续连字符、描述超 1024，这些多数只 warning 并仍加载；未知字段被忽略；唯一例外是 description 完全缺失的 Skill 不加载。[@ref-pi-skills-validation]

## 第一方扩展字段与外部来源 {#skills-extension-fields}

两个 frontmatter 字段是第一方扩展：`disable-model-invocation` 为 true 时把 Skill 从系统提示隐藏，只能显式 `/skill:name` 调用；`allowed-tools` 是文档标注 experimental 的预批准工具列表。[@ref-pi-skills-format]

除自动发现的位置外，settings 的两个键可以追加 Skill 来源。全局设置写在 `~/.pi/agent/settings.json`，项目设置写在 `.pi/settings.json`，两者的相对路径分别相对各自所在目录（全局相对 `~/.pi/agent`，项目相对 `.pi`），项目文件覆盖全局。[@ref-pi-settings-overview] `skills` 是本地文件或目录路径数组，`packages` 是从包加载资源的数组。下列全局块把 Claude Code 与 Codex 的 Skill 目录也纳入 Pi：

```json
{
  "skills": ["~/.claude/skills", "~/.codex/skills"]
}
```

数组支持 glob 与 `!pattern`、`+path`、`-path` 过滤，两个键的默认值都是空数组。[@ref-pi-settings-resources] 写好后这些目录里的 Skill 与自动发现的位置一起进入候选；检查方式是确认目标 Skill 出现在可用列表里，具体入口见本页诊断小节。前提是这些目录真实存在。

包也可以在 `package.json` 的 `pi` 清单里用 `skills` 声明 Skill 目录，清单里的路径相对包根，数组同样支持 glob 与 `!exclusions`；这部分的安装与管理见原生插件章。[@ref-pi-packages-structure] 这些字段的默认值与逐项解析细节文档未全列，属本地缺口。

## 加载时机与渐进披露 {#skills-loading}

加载分两步。启动时 Pi 只抽取每个 Skill 的 name 与 description，并把可用 Skill 以 XML 列进系统提示；当任务匹配时，模型用 `read` 工具读取完整 `SKILL.md`，正文里的相对路径按 Skill 目录解析，文档也明说模型不总会主动读取，可用提示或 `/skill:name` 强制。[@ref-pi-skills-loading] 这是渐进式披露：只有描述常驻上下文，完整指令按需加载。[@ref-pi-skills-structure] 因此“Skill 已被发现”不等于“正文已进入上下文”，描述承担帮助模型选择的作用。

## 调用、开关与优先级 {#skills-invocation}

已经发现的 Skill 注册为 `/skill:name` 命令。下面两行是调用形态：第一行载入并执行同名 Skill，第二行在命令名后带参数，命令后的参数会以 `User:` 前缀追加到 Skill 内容。[@ref-pi-skills-invocation]

```bash
/skill:brave-search
/skill:pdf-tools extract
```

是否注册这类命令由 `enableSkillCommands` 控制，默认 true，可在 `/settings` 交互界面或 settings 文件关闭。[@ref-pi-skills-invocation] 下面的全局块把命令关闭，也可写入项目的 `.pi/settings.json`。[@ref-pi-settings-overview]

```json
{
  "enableSkillCommands": false
}
```

改写后重新进入会话，`/skill:name` 不再注册为命令，但 Skill 本身仍可被模型自动读取；`/settings` 里可以看到该键的当前取值。[@ref-pi-settings-resources]

自动调用由模型依据 description 判断，并受 `disable-model-invocation` 与 `enableSkillCommands` 影响。[@ref-pi-skills-format][@ref-pi-settings-resources] 另有几项条件改变发现范围：`--no-skills` 关闭默认发现，但显式 `--skill` 路径仍加载。[@ref-pi-skills-discovery] settings 的 `skills` 数组与包内 Skill 都要经过启用/禁用过滤，可用 `pi config` 或 `!pattern`、`-path` 收窄。[@ref-pi-settings-resources][@ref-pi-packages-dedupe] 固定来源没有说明项目信任级别对 Skill 的额外限制，也没有说明 interactive、rpc、sdk 等启动入口是否改变发现范围，这些条件尚未覆盖。

## 诊断与重载 {#skills-diagnostics}

能观察到的是发现阶段的 warning：名称不合规、描述过长、同名冲突，以及 description 缺失即不加载。[@ref-pi-skills-validation] 冲突诊断带 winnerPath 与 loserPath，可用来定位“改了却没生效”的同名问题。[@ref-pi-skills-code-collision] 扩展可在 `resources_discover` 事件里追加 Skill 路径，自动发现目录中的扩展还可用 `/reload` 热重载。[@ref-pi-ext-resources-discover][@ref-pi-ext-reload] 缺口：固定来源没有“列出当前已加载 Skill 及其来源”的命令，也没有单独重载 Skill 的入口，验证发现结果需要另做运行观察。
