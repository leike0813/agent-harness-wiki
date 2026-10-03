---
schema_version: 3
record_kind: production
edition_id: bob-cli-skills-v3
harness_id: bob
topic: skills
title: "Bob Shell 的 Skills：位置、格式、发现与调用"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-bob-skills-how, ref-bob-skills-setup, ref-bob-skills-locations]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-bob-skills-fields, ref-bob-skills-support]
  - section_id: skills-discovery-collision
    surface_ids: [cli]
    source_refs: [ref-bob-skills-locations, ref-bob-skills-fields, ref-bob-changelog-skilldir, ref-bob-ts-workspace, ref-bob-changelog-root]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-bob-skills-how, ref-bob-context-categories]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-bob-chat-skillpicker, ref-bob-slash-builtin, ref-bob-skills-how, ref-bob-skills-approve, ref-bob-tools-group-table, ref-bob-config-schema]
  - section_id: skills-conditions-diagnostics
    surface_ids: [cli]
    source_refs: [ref-bob-trust-impact, ref-bob-changelog-skilldir, ref-bob-skills-fields, ref-bob-slash-builtin, ref-bob-skills-approve]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-bob-skills-setup, ref-bob-skills-locations]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: partial
        source_refs: [ref-bob-skills-locations, ref-bob-skills-fields, ref-bob-changelog-skilldir, ref-bob-ts-workspace]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-bob-skills-locations]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-bob-skills-fields]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-bob-skills-fields, ref-bob-skills-support]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-bob-skills-how, ref-bob-context-categories]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-bob-skills-approve, ref-bob-chat-skillpicker, ref-bob-slash-builtin]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: answered
        source_refs: [ref-bob-trust-impact, ref-bob-changelog-skilldir, ref-bob-skills-fields]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-bob-slash-builtin, ref-bob-changelog-skilldir, ref-bob-skills-fields]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 位置与优先级 {#skills-roots}

Bob Shell 的 Skill 是可复用的指令集：激活后 Bob 会收到该 Skill 的指令，并能读取该 Skill 目录下的支撑文件，按定义的流程完成一类固定工作。[@ref-bob-skills-how] 官方文档给出的创建步骤是：在项目根下的 `.bob/skills/` 里建一个文件夹，或使用全局的 `~/.bob/skills/`；文件夹内放一个 `SKILL.md`。[@ref-bob-skills-setup]

文档给出的目录示例（逐字来自 Skills 页的 “Example structure”）：

```text
your-project/.bob/skills/code-review/SKILL.md
```

Skill 只定义在这两级，作用域与用途由文档明确列出：项目 `<项目根>/.bob/skills/` 只对本项目生效，全局 `~/.bob/skills/` 对所有项目生效；两级同名时项目级获胜。[@ref-bob-skills-locations]

| 位置 | 作用域 | 文档给出的用途 |
| :-- | :-- | :-- |
| `<项目根>/.bob/skills/` | 项目 | 该项目独有的工作流 |
| `~/.bob/skills/` | 全局 | 个人或组织级工作流 |

## SKILL.md 格式 {#skills-format}

`SKILL.md` 用 YAML front matter 加正文：front matter 后以 `---` 分隔，分隔线以下的全部内容就是 Skill 被激活时 Bob 收到的指令。[@ref-bob-skills-fields] 文档列出两个字段，`name` 必须与所在文件夹同名，文件夹名本身有命名约束：[@ref-bob-skills-fields]

| 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `name` | 是 | Skill 的名称，需与文件夹名一致；Bob 用文件夹名识别与引用该 Skill。文件夹名必须是小写 kebab-case（字母、数字与单个连字符），最长 64 字符，名字非法的文件夹会被跳过 |
| `description` | 否 | 帮助 Bob 判断何时激活该 Skill 的摘要；省略时 Bob 改用正文第一行 |

这条规则与此前文档的写法不同：旧版把 `name` 描述为界面显示名，并把缺少 `description` 视为直接忽略。当前页面给出的是目录名绑定与首行回退，本章按当前页面记录。

文档示例（逐字来自 Skills 页的 “SKILL.md format”）：

```markdown
---
name: code-review
description: Review code for bugs, security issues, and best practices
---
When reviewing code, check for:
- Security vulnerabilities
- Performance issues
- Missing error handling at API boundaries
- Unused imports and dead code
```

除 `SKILL.md` 外，同一目录可以并列或嵌套其它文件与子目录（清单、模板、参考文档、配置示例、`scripts/` 下的脚本等），Bob 在 Skill 激活后可以自行读取这些文件。[@ref-bob-skills-support] 文档只定义了上述两个第一方 front matter 字段与正文/支撑文件结构，没有记录任何键名、默认值或额外的专有扩展字段；因此除 `name`、`description` 之外是否还有受识别字段，公开文档未建立。

## 发现、同名去重与工作区边界 {#skills-discovery-collision}

两级目录的扫描规则、目录深度、符号链接与忽略规则在官方文档中没有说明；文档只给出目录位置与同名时的优先级。[@ref-bob-skills-locations] 已知的两条过滤规则是：文件夹名不符合小写 kebab-case、超过 64 字符时该 Skill 被跳过；[@ref-bob-skills-fields] 以及 2.0.2 起“全局 skill 目录中的 skill 不再计入工作区级 skill 发现”，即从项目视角做的一次扫描不会再带出全局目录里的条目。[@ref-bob-changelog-skilldir]

工作区根的判定会影响“项目级 `.bob/skills/`”到底指哪里：Bob Shell 从当前工作目录向上查找，命中 `.git` 或 `.bob` 的第一个目录即工作区根；都没有时用当前工作目录。[@ref-bob-ts-workspace] 2.0.1 的修复说明文档把 `.git` 排在 `.bob` 之前优先判定，从包内子目录启动时不会误把子目录当成工作区根。[@ref-bob-changelog-root]

同名冲突的处理是明确的：项目级与全局级存在同名 Skill 时项目级生效。[@ref-bob-skills-locations] 文档未定义非同名但描述相近时的合并或命名空间规则。

## 加载与上下文占用 {#skills-loading}

Skill 每次会话只加载一次，避免重复注入提示；Bob 依据你的请求与 Skill 的 `description` 自动判断何时激活。[@ref-bob-skills-how] 激活后名称、描述与正文一起进入当前会话上下文，支撑文件按需读取。[@ref-bob-skills-how]

Skill 的指令计入 270,000 token 上下文窗口中的 “Skills” 分类：它在会话建立时确定，Bob 在会话中途激活 Skill 时该分类还会增长；同一分类列表里，Rules 来自 `.bob/rules-*` 与 `AGENTS.md`，MCP Tools 来自已连接的 MCP server。[@ref-bob-context-categories] 因此“多装 Skill”会直接抬高每次请求的固定开销。

## 显式与自动调用 {#skills-invocation}

三种进入方式：

1. 交互会话里输入 `$` 加 Skill 名，打开 Skill 选择器并把 Skill 引用插入提示词。[@ref-bob-chat-skillpicker]
2. 使用 `/skills` 内建斜杠命令，把 Skill 引用插入提示词。[@ref-bob-slash-builtin]
3. 不显式指定时，Bob 按请求内容和 Skill 描述自动激活。[@ref-bob-skills-how]

默认情况下激活 Skill 需要你的许可：首次激活会弹批准提示。[@ref-bob-skills-approve] 要跳过该提示，可以在 `/settings` 中打开 `Auto-approve: Skills`，或在 `~/.bob/settings/settings.json` 里写入 `"autoApprove": { "skills": true }`（片段逐字来自 Skills 页 “Approving skills” 一节）：[@ref-bob-skills-approve]

```json
{
  "autoApprove": {
    "skills": true
  }
}
```

Skill 调用走工具权限体系：工具分组表列出 `read`、`edit`、`execute`、`mcp`、`skill`、`todo`、`subagent`、`mode` 各组及其在 Agent/Plan/Ask 三个内置模式下的默认启停状态。[@ref-bob-tools-group-table] 而 `session.mcp`、`session.subagents` 这类开关定义在 settings 中，并没有对应的 `session.skills` 开关。[@ref-bob-config-schema]

## 生效条件与诊断 {#skills-conditions-diagnostics}

信任条件：文件夹不可信时，项目自带 Skill 不加载，只有全局可用 Skill 与内建能力仍然生效；项目 `.bob/settings.json` 整体不读取。[@ref-bob-trust-impact]

可观察的失败信号：2.0.3 起 Skill 目录名非法时 Bob 会给出告警；当前 Skills 页把这条规则写得更明确——名字不合规的文件夹直接被跳过，因此“Skill 没被发现”应先检查目录名是否是小写 kebab-case 且不超过 64 字符，以及 `name` 是否与文件夹名一致。[@ref-bob-changelog-skilldir][@ref-bob-skills-fields] `/skills` 是插入 Skill 引用的入口，`/logs` 打开最新日志文件；Skill 的自动批准可在 `/settings` 的 Auto-approve 里开关。[@ref-bob-slash-builtin][@ref-bob-skills-approve] 更改 `SKILL.md` 或目录后官方文档没有说明是否需要重启；Reload 行为属于未建立项（`skills` 未提供专用校验或列表命令）。
