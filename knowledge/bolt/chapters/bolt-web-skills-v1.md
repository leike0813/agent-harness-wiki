---
schema_version: 3
record_kind: production
edition_id: bolt-web-skills-v1
harness_id: bolt
topic: skills
title: "Bolt 网页端的技能（Skills）机制：来源作用域、SKILL.md 格式、选择加载与条件诊断"
sections:
  - section_id: skills-scope
    surface_ids: [web]
    source_refs: [ref-bolt-repo-package-json, ref-bolt-repo-contributing-diff, ref-bolt-docs-index-listing]
  - section_id: skills-sources
    surface_ids: [web]
    source_refs: [ref-bolt-docs-skills-scopes, ref-bolt-docs-skills-library, ref-bolt-docs-skills-project-page, ref-bolt-docs-skills-curated, ref-bolt-docs-skills-delete, ref-bolt-docs-skills-permissions, ref-bolt-docs-skills-add, ref-bolt-docs-skills-import-github, ref-bolt-docs-skills-promote, ref-bolt-docs-skills-transfer]
  - section_id: skills-format-and-import
    surface_ids: [web]
    source_refs: [ref-bolt-docs-skills-requirements, ref-bolt-docs-skills-frontmatter, ref-bolt-docs-skills-instructions, ref-bolt-docs-skills-import-file, ref-bolt-docs-skills-import-github, ref-bolt-docs-skills-write, ref-bolt-docs-skills-safety, ref-bolt-docs-skills-download]
  - section_id: skills-selection
    surface_ids: [web]
    source_refs: [ref-bolt-docs-skills-faq, ref-bolt-docs-skills-toggle, ref-bolt-docs-skills-manual, ref-bolt-docs-skills-from-chat, ref-bolt-docs-skills-first-prompt, ref-bolt-docs-skills-add, ref-bolt-docs-skills-vs-knowledge]
  - section_id: skills-conditions-diagnostics
    surface_ids: [web]
    source_refs: [ref-bolt-docs-skills-scopes, ref-bolt-docs-skills-toggle, ref-bolt-docs-skills-permissions, ref-bolt-docs-skills-delete, ref-bolt-docs-skills-transfer, ref-bolt-docs-skills-safety, ref-bolt-docs-skills-faq, ref-bolt-docs-skills-troubleshooting, ref-bolt-docs-skills-manage]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [web]
        section_id: skills-sources
        status: partial
        source_refs: [ref-bolt-docs-skills-scopes, ref-bolt-docs-skills-library, ref-bolt-docs-skills-project-page, ref-bolt-docs-skills-curated, ref-bolt-docs-skills-delete]
  - question_id: skills.discovery
    answers:
      - surface_ids: [web]
        section_id: skills-sources
        status: partial
        source_refs: [ref-bolt-docs-skills-library, ref-bolt-docs-skills-project-page, ref-bolt-docs-skills-import-github]
  - question_id: skills.collision
    answers:
      - surface_ids: [web]
        section_id: skills-selection
        status: answered
        source_refs: [ref-bolt-docs-skills-faq, ref-bolt-docs-skills-add]
  - question_id: skills.format
    answers:
      - surface_ids: [web]
        section_id: skills-format-and-import
        status: answered
        source_refs: [ref-bolt-docs-skills-requirements, ref-bolt-docs-skills-frontmatter, ref-bolt-docs-skills-instructions]
  - question_id: skills.extensions
    answers:
      - surface_ids: [web]
        section_id: skills-format-and-import
        status: partial
        source_refs: [ref-bolt-docs-skills-frontmatter, ref-bolt-docs-skills-requirements]
  - question_id: skills.loading
    answers:
      - surface_ids: [web]
        section_id: skills-selection
        status: answered
        source_refs: [ref-bolt-docs-skills-faq]
  - question_id: skills.invocation
    answers:
      - surface_ids: [web]
        section_id: skills-selection
        status: answered
        source_refs: [ref-bolt-docs-skills-toggle, ref-bolt-docs-skills-manual, ref-bolt-docs-skills-first-prompt, ref-bolt-docs-skills-from-chat]
  - question_id: skills.conditions
    answers:
      - surface_ids: [web]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-bolt-docs-skills-scopes, ref-bolt-docs-skills-toggle, ref-bolt-docs-skills-permissions, ref-bolt-docs-skills-delete, ref-bolt-docs-skills-transfer]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [web]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-bolt-docs-skills-faq, ref-bolt-docs-skills-troubleshooting, ref-bolt-docs-skills-toggle]
---

## 固定来源与范围 {#skills-scope}

Bolt 的固定来源有两组：官方开源仓库 `stackblitz/bolt.new` 的提交
`eda10b121221b30825a4c16eec5da1fd3eb1eb99`（Remix + WebContainer 的 bolt.new
应用本体），以及官方帮助站 `support.bolt.new` 的文档页。仓库 `package.json` 只声明
`name: "bolt"`、`private: true`，依赖里没有任何技能加载器或指令包清单
[@ref-bolt-repo-package-json]；`CONTRIBUTING.md` 把该仓库定位成"用核心组件搭建自己的
AI 开发工具"的示例应用，而商业产品 Bolt.new 是另外的托管服务 [@ref-bolt-repo-contributing-diff]。

因此本主题的结论分成两层：

- **开源修订里没有 Skill 机制**。仓库中没有 `SKILL.md`、没有技能目录约定、没有技能注册表，
  也没有任何按名称或按描述选择指令的代码路径。判定依据是上一段的 `package.json` 依赖清单，
  以及仓库文件清单中不存在技能相关文件 [@ref-bolt-repo-package-json]。
- **技能只存在于托管产品**。`support.bolt.new` 的《Use skills to apply reusable
  instructions》是整个技能机制的官方来源；它描述的是网页端工作区/项目里的技能库，不是
  文件系统目录。

帮助站的文档索引 `https://support.bolt.new/llms.txt` 列出了全部官方页面，技能机制对应
`/building/skills` 一页 [@ref-bolt-docs-index-listing]。

下面各节把技能机制按"来源作用域 → 文件格式与导入 → 选择与加载 → 条件与诊断"写成处理链。
引用到的文档快照没有标注适用软件版本，本章是来源级知识。

## 技能的来源与作用域 {#skills-sources}

**skills.roots**：Bolt 的技能有三个来源，全部由网页端的库管理，不由目录扫描决定
[@ref-bolt-docs-skills-scopes]。

| 来源 | 在哪里管理 | 可见范围 |
| :-- | :-- | :-- |
| 工作区技能 | 账户下拉 → Settings → **Skills library** [@ref-bolt-docs-skills-library] | 该工作区的所有项目，逐个项目开关 |
| 项目技能 | 项目内齿轮图标 → **Skills** [@ref-bolt-docs-skills-project-page] | 只在该项目，始终开启 |
| Bolt 内置技能 | 与上两者并列显示，不可编辑或删除 [@ref-bolt-docs-skills-curated] | 需要逐个项目开启 |

项目技能"存储在该项目的代码里"，因此删除项目会连同技能一起删除；工作区技能独立于任何单个
项目保存 [@ref-bolt-docs-skills-delete]。文档没有给出项目技能在代码里的具体路径或文件名，
也没有说明工作区技能存放位置；这些属于托管实现细节，固定来源无法确定。

团队工作区里标签改成团队名，团队管理员才能在 Skills library 里添加、编辑、删除技能，普通成员
可以查看并把技能按项目开关，也可以直接在项目里添加技能 [@ref-bolt-docs-skills-permissions]。
个人工作区中用户在哪个作用域添加都行 [@ref-bolt-docs-skills-add]。

内置技能（Bolt-curated）固定为四个：SEO/GEO、Skill Creator、Web Design Guidelines、
Writing Guidelines；Skill Creator 始终开启，其余默认关闭 [@ref-bolt-docs-skills-curated]。

**skills.discovery**：固定来源没有"扫描目录"这个环节。技能的发现是网页端的库列举：Skills
library 列出工作区可用技能，项目 Skills 页列出该项目可用技能，聊天框的 Skills 菜单列出"当前
项目里可用的技能" [@ref-bolt-docs-skills-library][@ref-bolt-docs-skills-project-page]。
从 GitHub 导入时，Bolt 自动扫描该公开仓库里的技能目录，仓库技能过多时只展示前 100 个；导入
完成后技能与源仓库脱钩，后续更新要重新导入 [@ref-bolt-docs-skills-import-github]。
扫描深度、忽略规则、符号链接处理都没有文档依据，保持未知。

作用域之间的选择规则：同名时**项目技能优先于工作区技能** [@ref-bolt-docs-skills-add]。把一个
项目技能"Add to Skill library"到工作区后两份副本互相独立，编辑任一份不影响另一份；项目转移
时只有直接加在项目里的技能跟着走，工作区技能不随项目转移 [@ref-bolt-docs-skills-promote][@ref-bolt-docs-skills-transfer]。

## 技能文件格式与导入 {#skills-format-and-import}

**skills.format**：技能文件就是 `SKILL.md`，由两部分组成——frontmatter 与 instructions
[@ref-bolt-docs-skills-requirements]。唯一的合法 frontmatter 示例（来自该页）[@ref-bolt-docs-skills-frontmatter]：

```text
---
name: write-app-copy
description: "Use when writing or editing any text that appears in an app's interface. Covers button labels, calls to action, headings, and empty states. Doesn't apply to placeholder content or sample user data like names or emails."
---
```

字段约束（文档表格逐条给出）[@ref-bolt-docs-skills-frontmatter]：

| 字段 | 必填 | 允许 | 禁止 | 上限 |
| :-- | :-- | :-- | :-- | :-- |
| `name` | 是 | 小写字母、数字、连字符 | 空格、下划线、XML 标签、保留词（如 `anthropic`、`claude`） | 64 字符 |
| `description` | 是 | 任意自由文本，可含空格、完整句子、标点 | XML 标签 | 1024 字符 |

`description` 是控制"何时应用"的主要手段：文档要求它写成"Use when"开头的一段，覆盖触发条件、
适用范围与边界 [@ref-bolt-docs-skills-frontmatter]。正文 instructions 没有结构化字段，只是
Markdown；文档建议一个技能只覆盖一个主题，并用标题分隔子主题 [@ref-bolt-docs-skills-instructions]。

**skills.extensions**：固定来源只承认 `name` 与 `description` 两个 frontmatter 字段，没有列出
任何其他专有字段、附加文件或项目配置项；多文件能力仅体现为 `.zip` 里可以附带示例 Markdown
[@ref-bolt-docs-skills-requirements]。除这两个字段之外的键是否被忽略、是否报错，文档没有说明，
保持未知。

导入与写入方式与体积限制 [@ref-bolt-docs-skills-import-file][@ref-bolt-docs-skills-import-github][@ref-bolt-docs-skills-write]：

| 方式 | 输入 | 体积限制 |
| :-- | :-- | :-- |
| From GitHub | 公开仓库 URL，自动列出技能目录供选择 | 导入的 GitHub 技能最大 2 MB |
| Import from file | `.md`、`.mdx`，或只含一个技能文件（可附带示例 Markdown）的 `.zip` | 单个 `.md`/`.mdx` 最大 256 KB；`.zip` 最大 2 MB，其中技能文件 256 KB |
| Write manually | 在界面上填 Skill name / Description / Instructions | 最大 256 KB |
| Build with Bolt | 在项目 Skills 页或聊天里让 Bolt 生成 | 与项目技能同规则 |

导入时 Bolt 会校验文件开头是否有合法 frontmatter、格式是否正确，不合法会报错
[@ref-bolt-docs-skills-requirements]。手工写入时界面会自动把小写以外的字符规范化成
`your-skill-name` 形式 [@ref-bolt-docs-skills-frontmatter]。

安全前提：文档要求导入前完整阅读 `SKILL.md`，只信任已知来源；含不认识的 URL、索要凭据或 API
密钥、或要求改变任务范围外行为的技能可能不安全 [@ref-bolt-docs-skills-safety]。项目技能可以
用技能条目的三点菜单 Download 出 `SKILL.md` 再分发 [@ref-bolt-docs-skills-download]。

## 技能的选择、加载与调用 {#skills-selection}

**skills.loading**：技能进入上下文的时机分两段。开启中的技能，Bolt 平时只看它的 `name` 与
`description`；当某条提示与描述匹配时，才读入完整 instructions 并应用 [@ref-bolt-docs-skills-faq]。
也就是说开启数量本身不显著增加 token，匹配命中时才产生读取成本。

**skills.collision**：Bolt 查看项目里所有可用的技能，并应用其中与当前提示相关的那些；一个提示
可以自动应用多个技能，技能之间不能互相引用，文档建议不要保留会互相冲突的技能 [@ref-bolt-docs-skills-faq]。
同名时项目技能覆盖工作区技能 [@ref-bolt-docs-skills-add]。除此之外的"同名去重 / 命名空间保留"
规则没有文档依据。

**skills.invocation**：两种路径 [@ref-bolt-docs-skills-toggle][@ref-bolt-docs-skills-manual]：

- 自动：技能必须在当前项目里处于"开启"状态，且提示与技能描述匹配。
- 手动：在聊天框用斜杠命令 `/$skill-name`，或点加号图标后在 Skills 菜单里选择。手动方式
  每条提示只能选一个技能。

技能必须先在项目里开启才能用；关闭后既不能手选也不会被自动应用 [@ref-bolt-docs-skills-toggle]。
项目里添加或由聊天创建的技能对该项目始终开启；工作区技能在个人工作区默认开启，在团队工作区
默认关闭（管理员添加后由成员按项目开启）[@ref-bolt-docs-skills-toggle]。共享项目里开启状态对
所有协作者生效 [@ref-bolt-docs-skills-toggle]。

从聊天创建技能走内置的 `/skill-creator`：在对话里描述工作流，或让 Bolt 把已经做过的工作总结成
技能；创建出的技能保存在该项目、自动开启 [@ref-bolt-docs-skills-from-chat]。第一个提示要用技能
时，只能在首页聊天框先用 Skills 菜单选中，选中后该项目保持开启 [@ref-bolt-docs-skills-first-prompt]。

技能与 knowledge 的分工：技能只在描述匹配时生效，knowledge 对每条提示都生效
[@ref-bolt-docs-skills-vs-knowledge]。

## 条件、诊断与重载 {#skills-conditions-diagnostics}

**skills.conditions**：改变技能行为的外部条件有三类。

1. **工作区类型**。个人工作区里工作区技能默认开启；团队工作区里由管理员添加、默认关闭，成员
   按项目开启 [@ref-bolt-docs-skills-scopes][@ref-bolt-docs-skills-toggle]。
2. **团队权限**。管理员可增删改工作区技能，删除会对所有成员生效并从他们的项目里移除；成员不能
   添加工作区技能，但可以在项目内添加并编辑/下载/删除自己添加的技能
   [@ref-bolt-docs-skills-permissions]。
3. **项目生命周期**。项目技能随项目代码存在，删除项目即删除；转移项目只带走项目技能；复制项目
   留在同一工作区因而技能集合不变 [@ref-bolt-docs-skills-delete][@ref-bolt-docs-skills-transfer]。

`SKILL.md` 自带的 URL 或对凭据的索取不会触发任何额外的信任流程——固定来源中不存在技能签名、
来源校验或策略开关，唯一的把关是导入前的"Use skills safely"人工检查 [@ref-bolt-docs-skills-safety]。

**skills.diagnostics**：可观察的入口有三个 [@ref-bolt-docs-skills-faq][@ref-bolt-docs-skills-troubleshooting][@ref-bolt-docs-skills-toggle]：

- 技能被触发时，技能名会出现在聊天里；应用了多个技能时，需要展开聊天里的 "actions taken" 面板
  才能看到各自的名字。
- 自动应用失效时的排查顺序是：先确认技能在当前项目里已开启，再按提示与描述中的 trigger /
  scope / boundary 是否吻合调整措辞，或改用手动斜杠命令。
- 技能条目的三点菜单提供 Edit / Delete / Download / Add to Skill library，用来核对与修正已保存
  的内容 [@ref-bolt-docs-skills-manage]；团队工作区里最新保存的编辑即为所有人使用的版本
  [@ref-bolt-docs-skills-faq]。

固定来源没有给出"列出本次实际注入的完整技能正文"或"强制重载"的入口；改动技能后新的一轮对话即
使用最新内容，这是文档描述的默认行为而非可验证的重载命令，保持未验证。

**缺口**：本节没有覆盖技能在代码里的落盘路径、工作区技能的存储介质、frontmatter 的未知字段
行为，以及导入的 GitHub 扫描深度/忽略规则——这些点固定来源都没有写。
