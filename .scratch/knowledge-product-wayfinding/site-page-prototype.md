# 文档站 Wiki 页面草样

供[“定义文档站的页面组织与阅读样例”](issues/05-site-presentation.md)讨论。以下两页只演示阅读结构和若干真实来源支撑的段落；正式页面仍须回答[七类主题调查契约](topic-contract.md)中该主题的全部问题。草样依据已固定的 Codex 源码及两份官方文档快照，不据此推断某个未映射安装包的行为。

## 站点导航

```text
产品目录
└── Codex CLI
    ├── 概览：产品定位、来源范围、七个主题入口、最近变化
    ├── Skills：章节正文 → 常见问题 → 来源
    ├── MCP
    └── 其余五个主题

主题目录
└── Skills → Codex CLI、Claude Code、OpenCode、Pi、OMP
```

每个“产品 × 主题”有独立页面。页内目录指向稳定的问题锚点；正文按该产品的机制分章，不强制把调查清单机械排成九问九答。搜索结果可以直达对应章节。以下横线隔开两张独立页面的示意。

主题页默认显示当前已发布的调查结果。页首的“历史版本”入口列出该主题过去的知识发布及各自的源码提交或文档快照；打开旧页面时，页首始终显示当时的来源范围。这里的来源版本不等于已验证的安装包版本。

---

# Codex CLI / Skills

依据：Codex 源码提交 `67a7096…` 与 2026-09-27 采集的官方 Skills 文档。本文描述这些固定来源；尚未建立它们与某个 npm 包版本的构建对应。

目录：**发现位置** · **文件格式与专有配置** · **加载与调用** · **排查** · **常见问题** · **来源**

## 发现位置 {#skills-roots}

官方文档列出项目 `.agents/skills/`、用户 `$HOME/.agents/skills/`、管理员 `/etc/codex/skills` 和内置 Skill。项目范围从 Codex 的启动目录沿父目录查到仓库根目录；在仓库子目录启动时，不必把共享 Skill 复制到每个子目录。两个 Skill 若具有相同 `name`，文档说明不会把它们合并。[D1](#codex-sources)

项目 Skill 的最小目录如下。它依照官方文档的项目位置与必需字段写成，正文是示意指令：[D1](#codex-sources)

```text
my-repo/
└── .agents/skills/review-changes/SKILL.md
```

```md
---
name: review-changes
description: Review local changes when asked for a code review.
---

Review the changed files and report concrete findings.
```

## 文件格式与专有配置 {#skills-extensions}

`SKILL.md` 包含名称、描述和正文；Skill 目录还可有资源文件。Codex 的 `agents/openai.yaml` 是单独的宿主配置文件，不能把其中的字段写进 `SKILL.md` frontmatter 后期待同样效果。固定源码的加载逻辑分别读取两个文件；附加配置分为 `interface`、`dependencies`、`policy`。[D1](#codex-sources) [S1](#codex-sources) [S2](#codex-sources)

例如，在上述目录添加 `agents/openai.yaml`，可设置：

```yaml
policy:
  allow_implicit_invocation: false
```

固定源码说明：此值关闭模型默认的自动调用，仍允许显式调用。正式页面在此章列出全部第一方字段、默认值和限制；`dependencies.tools` 涉及的 MCP server 连接细节链接到 Codex CLI 的 MCP 主题。[S2](#codex-sources) [S3](#codex-sources)

## 加载与调用 {#skills-loading}

官方文档描述了两步：Codex 先向模型提供 Skill 的名称、描述和路径；当 Skill 被选中时，再读取完整 `SKILL.md`。用户可通过 `/skills` 或 `$` 显式选择，模型也可依据描述自动选择。因此“发现了 Skill”和“读入了正文”是不同阶段。[D1](#codex-sources)

## 排查 {#skills-diagnostics}

如果 Skill 没出现在预期位置，先核对启动目录、沿途 `.agents/skills/` 和 `SKILL.md` 的名称及描述；再检查是否被配置禁用。文档说 Codex 会检测新安装的 Skill；若未出现，可重启 Codex。[D1](#codex-sources)

## 常见问题 {#codex-faq}

**把 `allow_implicit_invocation` 设为 `false` 后，还能手动用 Skill 吗？** 可以。它限制自动选择；使用 `$skill-name` 显式调用的入口仍在。[S3](#codex-sources)

**仓库里有 `SKILL.md`，为什么当前会话看不到？** 先看 Codex 从哪个目录启动，以及该 Skill 是否落在从启动目录到仓库根目录的搜索范围；再核对文件和禁用配置。[D1](#codex-sources)

## 来源 {#codex-sources}

- **D1**：Codex 官方 [Build skills](https://learn.chatgpt.com/docs/build-skills.md) 快照，采于 2026-09-27；仓库记录 `snapshot-codex-cli-skills-doc`。对应 “Where Codex loads local skills”“Optional metadata”“How ChatGPT and Codex use skills”。
- **S1**：Codex 源码 `67a7096…`，[Skill 加载函数](../../upstream/codex-cli/codex-rs/ext/skills/src/loader/host.rs)，分别读取正文与附加元数据。
- **S2**：同一源码，[附加配置结构](../../upstream/codex-cli/codex-rs/ext/skills/src/loader/metadata.rs)，定义 `interface`、`dependencies` 和 `policy`。
- **S3**：同一源码，[`openai.yaml` 字段说明](../../upstream/codex-cli/codex-rs/skills/src/assets/samples/skill-creator/references/openai_yaml.md)。

---

# Claude Code / Skills

依据：2026-09-27 采集的 Claude Code 官方 Skills 文档快照。该文档含分别注明版本门槛的新行为；本页逐项说明门槛，不把整份文档套到任意一个安装版本。[C1](#claude-sources)

目录：**Skill 放置位置** · **嵌套目录与同名处理** · **常见问题** · **来源**

## Skill 放置位置 {#claude-skills-roots}

官方文档把项目 Skill 放在 `.claude/skills/{name}/SKILL.md`，个人 Skill 放在 `~/.claude/skills/{name}/SKILL.md`。从仓库子目录启动时，会话还会向上查找父目录的项目 Skill。项目作者可把 Skill 随仓库提交；个人目录只供本机用户使用。[C1](#claude-sources)

```text
my-repo/
└── .claude/skills/review-changes/SKILL.md
```

## 嵌套目录与同名处理 {#claude-skills-collision}

官方文档说明，启动目录以下的 Skill 可在会话首次读取或编辑相应子目录的文件时加入，而无需在启动时全部装入。文档还把个人、项目、嵌套和插件 Skill 的同名处理分开说明；个人与项目同名时，短命令优先使用个人 Skill，插件 Skill 则有自己的命名空间。带版本门槛的嵌套发现行为要在正式页面贴着相应规则标注。[C1](#claude-sources)

## 常见问题 {#claude-faq}

**项目里已有 Skill，为什么启动时菜单里没有？** 先看文件是否在启动目录以下的子项目；该目录的 Skill 可能要等到会话处理其中的文件后才出现。再检查当前会话是否启用了项目设置，以及有没有同名 Skill。[C1](#claude-sources)

## 来源 {#claude-sources}

- **C1**：Claude Code 官方 [Skills](https://code.claude.com/docs/en/skills.md) 快照，采于 2026-09-27；仓库记录 `snapshot-claude-code-skills-doc`。对应 “Choose where skills load”“Load skills in monorepos and subdirectories”“Resolve skills that share a name”。
