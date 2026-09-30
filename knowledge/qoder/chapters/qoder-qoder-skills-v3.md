---
schema_version: 3
record_kind: production
edition_id: qoder-qoder-skills-v3
harness_id: qoder
topic: skills
title: "Qoder IDE 的 Skill 机制"
sections:
  - section_id: skills-overview
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-skills-overview, ref-qoder-ide-skills-full]
  - section_id: skills-roots
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-skills-paths-v2, ref-qoder-ide-skills-install, ref-qoder-cli-skills-where, ref-qoder-cli-configdir]
  - section_id: skills-format
    surface_ids: [qoder]
    source_refs: [ref-qoder-cli-skills-structure, ref-qoder-cli-skills-frontmatter, ref-qoder-ide-skills-full]
  - section_id: skills-loading
    surface_ids: [qoder]
    source_refs: [ref-qoder-cli-skills-work, ref-qoder-ide-skills-usage, ref-qoder-ide-skills-paths-v2, ref-qoder-cli-skills-update]
  - section_id: skills-invocation
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-skills-usage, ref-qoder-cli-skills-work, ref-qoder-cli-skills-trouble, ref-qoder-ide-skills-overview, ref-qoder-cli-skills-vs-commands, ref-qoder-ide-skills-paths-v2, ref-qoder-cli-skills-where]
  - section_id: skills-diagnostics
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-skills-paths-v2, ref-qoder-cli-skills-view, ref-qoder-cli-skills-trouble, ref-qoder-cli-skills-update, ref-qoder-ide-skills-full]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [qoder]
        section_id: skills-roots
        status: partial
        source_refs: [ref-qoder-ide-skills-paths-v2, ref-qoder-cli-skills-where, ref-qoder-cli-configdir]
  - question_id: skills.discovery
    answers:
      - surface_ids: [qoder]
        section_id: skills-loading
        status: partial
        source_refs: [ref-qoder-cli-skills-work, ref-qoder-ide-skills-paths-v2]
  - question_id: skills.collision
    answers:
      - surface_ids: [qoder]
        section_id: skills-invocation
        status: conflict
        source_refs: [ref-qoder-ide-skills-paths-v2, ref-qoder-cli-skills-where]
  - question_id: skills.format
    answers:
      - surface_ids: [qoder]
        section_id: skills-format
        status: answered
        source_refs: [ref-qoder-cli-skills-frontmatter, ref-qoder-cli-skills-structure]
  - question_id: skills.extensions
    answers:
      - surface_ids: [qoder]
        section_id: skills-format
        status: partial
        source_refs: [ref-qoder-cli-skills-structure, ref-qoder-ide-skills-full]
  - question_id: skills.loading
    answers:
      - surface_ids: [qoder]
        section_id: skills-loading
        status: answered
        source_refs: [ref-qoder-cli-skills-work, ref-qoder-ide-skills-usage]
  - question_id: skills.invocation
    answers:
      - surface_ids: [qoder]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-qoder-ide-skills-usage, ref-qoder-cli-skills-work, ref-qoder-ide-skills-overview]
  - question_id: skills.conditions
    answers:
      - surface_ids: [qoder]
        section_id: skills-overview
        status: partial
        source_refs: [ref-qoder-ide-skills-overview, ref-qoder-ide-skills-full]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [qoder]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-qoder-ide-skills-paths-v2, ref-qoder-cli-skills-view, ref-qoder-cli-skills-trouble]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与机制边界 {#skills-overview}

本章的固定来源是 Qoder 官方文档站 `https://docs.qoder.com/` 的 Markdown 页面快照。Qoder 是闭源产品：没有可固定的官方源码仓库，界面按 `catalog/harnesses.yaml` 的 `qoder`（Qoder IDE）采写。文档站同时覆盖 Qoder IDE、Qoder CLI 与桌面/移动产品，官方页面自己把 Skill 写成跨入口机制——"Skills work identically in both Qoder IDE and CLI"，并在 IDE 的 Skills 页把完整规范指向 CLI 的 `Skills Full Documentation`。[@ref-qoder-ide-skills-full] 因此本章以 IDE 页面为主证据，只在 IDE 页面明确指向共享定义时引用 CLI 页面，并在正文标出这一边界。本章引用的全部是 `docs.qoder.com`——`qoder.com` 指向的官方文档站；`docs.qoder.cn` 属于另一条国内产品线（通义灵码 / Lingma），不是本产品来源，本章不引用。

结论：技能（Skill）是可复用的领域能力包，最小形态是一个含 `SKILL.md` 的目录；模型按描述自动匹配并加载正文，用户也可以用 `/技能名` 手动触发。[@ref-qoder-ide-skills-overview]

Qoder IDE 自带一组内置技能，在聊天或 Quest 输入 `/` 即可看到，文档举出的例子包括 `/create-skill`（脚手架）、`/create-skill-ui`（生成交互式 HTML 控件）、`/vercel-deploy`（Vercel 部署）、`/create-subagent`（子代理脚手架）、`/canvas`（可视化画板）。这些内置技能随 IDE 发布，不由用户目录决定。[@ref-qoder-ide-skills-overview]

生效条件：本章来源没有为 IDE 记录任何"按开关禁用 Skill"的机制，也没有记录信任门或沙箱门槛；可以确定的只有两点——内置技能随 IDE 发布即用，用户/项目 Skill 放入目录即可被加载。[@ref-qoder-ide-skills-overview] 插件也可以携带 Skill，但那部分由插件整体管理，见"原生插件"章；固定来源没有给出 IDE 侧对 Skill 的独立开关、信任提示或权限门。[@ref-qoder-ide-skills-full]

## 发现位置与作用域 {#skills-roots}

Skill 只有两个作用域，都是目录约定，没有集中登记表：

| 位置 | 路径 | 作用域 |
| :-- | :-- | :-- |
| 用户级 | `~/.qoder/skills/{skill-name}/SKILL.md` | 当前用户的所有项目 |
| 项目级 | `.qoder/skills/{skill-name}/SKILL.md` | 仅当前项目 |

IDE 页面给出的做法是手工创建 `SKILL.md` 并放入上述目录之一，然后重启 Qoder IDE，在对话框输入 `/` 查看已加载的技能列表。同一页还给出第二条安装路径：用第三方的 skills CLI 从 skills.sh 市场或 GitHub 安装，命令带 `-a qoder` 参数指向 Qoder 作为目标代理（例如 `npx skills add vercel-labs/agent-browser -a qoder`）。[@ref-qoder-ide-skills-paths-v2][@ref-qoder-ide-skills-install]

CLI 页面把同一组位置写成"存储位置决定可用性"的表格，并补充两点：`.qoder/skills/` 可随项目提交共享；`~/.qoder/skills/` 只对当前用户可见。[@ref-qoder-cli-skills-where]

同名冲突的结论在固定来源之间**不一致**，两个官方页面给出相反的优先级，见下节。[@ref-qoder-ide-skills-paths-v2][@ref-qoder-cli-skills-where]

用户级根目录本身由用户配置目录决定：文档站记录用户级数据（`settings.json`、认证状态、插件）默认存放在 `~/.qoder`，可用环境变量 `QODER_CONFIG_DIR` 改写；据此 `~/.qoder/skills` 会随该变量整体移动，但 Skills 页面本身没有写这条规则，视为跨页推断。[@ref-qoder-cli-configdir]

**缺口**：固定来源没有给出扫描深度、是否跟随符号链接、目录大小上限、忽略规则（`.gitignore`/`.qoderignore` 是否影响 Skill 扫描）等发现细节，也没有给出随 `HOME`/环境变量展开 Skill 路径的说明。官方只承诺"放入上述目录之一即可用"。[@ref-qoder-ide-skills-paths-v2]

## SKILL.md 的格式与目录结构 {#skills-format}

一个 Skill 是一个目录，必需文件是 `SKILL.md`；官方给出的目录结构示例包含可选文件与子目录：[@ref-qoder-cli-skills-structure]

```text
{skill-name}/
├── SKILL.md              # Required: main file
├── REFERENCE.md          # Optional: reference
├── EXAMPLES.md           # Optional: documentation examples
├── scripts/              # Optional: helper scripts
└── templates/            # Optional: template files
```

`SKILL.md` 以 YAML frontmatter 开头，之后是 Markdown 指令。官方给出的最小示例（原样抄录 frontmatter 部分；正文部分为 Markdown 指令，此处略去以免与章节标题混淆）：[@ref-qoder-cli-skills-frontmatter]

```markdown
---
name: skill-name
description: Brief description of functionality and when to use
---
```

frontmatter 字段表原文：[@ref-qoder-cli-skills-frontmatter]

| 字段 | 必需 | 说明 | 约束 |
| :-- | :--: | :-- | :-- |
| `name` | 是 | 唯一标识符 | 只用小写字母、数字、连字符；最长 64 字符 |
| `description` | 是 | 描述功能与何时使用，供模型判断是否调用 | 最长 1024 字符 |

`references/`、`scripts/`、`templates/` 这类附加目录不在 frontmatter 里声明，而是在正文里用相对路径指向，模型按需读取（渐进式披露）：[@ref-qoder-cli-skills-structure]

```markdown
For better usage, see [REFERENCE.md]. For examples, see [EXAMPLES.md].

Run the helper script:

python scripts/helper.py input.txt
```

**边界**：`SKILL.md` 的完整 frontmatter 规范写在 CLI 的 Skills 页，IDE 的 Skills 页只说要 `SKILL.md` 并指向该页；本章因此把 `name`/`description` 之外的字段视为"官方文档未对 IDE 单独声明"。[@ref-qoder-ide-skills-full]

## 进入上下文的时机与调用方式 {#skills-loading}

官方把处理链写成三段：[@ref-qoder-cli-skills-work]

1. **发现（Discovery）**：启动时只加载每个 Skill 的 `name` 与 `description`，让模型知道该 Skill 适用什么场景；
2. **激活（Activation）**：请求内容与某个 Skill 的 description 匹配时，模型请求使用该 Skill 并加载完整 `SKILL.md`；
3. **执行（Execution）**：模型按指令执行，并在需要时加载被引用的辅助文件或运行脚本。

IDE 页面把调用方式写成两条：**自动触发**（直接描述需求，模型自行判断是否使用某个 Skill）和**手动触发**（用 `/skill-name` 显式调用）。IDE 页面给出的 `/skills reload` 不适用，IDE 侧的刷新方式是重启 IDE 后再输入 `/` 查看列表。[@ref-qoder-ide-skills-usage][@ref-qoder-ide-skills-paths-v2]

**缺口（`skills.discovery`）**：来源确认"启动时加载元数据""按 description 匹配激活"，但没有 IDE 的目录递归深度、文件大小/数量上限与忽略规则；CLI 页面给出的 `/skills reload` 是 CLI 的热重载入口，IDE 未声明同等能力。[@ref-qoder-cli-skills-update][@ref-qoder-ide-skills-paths-v2]

## 显式调用、禁用与冲突消解 {#skills-invocation}

- 手动调用：输入 `/` 加技能名。IDE 页面的表单写法是 `/skill-name`，并给出 `/log-analyzer` 等例子；CLI 页面同样支持 `/skill-name`。[@ref-qoder-ide-skills-usage][@ref-qoder-cli-skills-work]
- 自动调用：模型按请求文本匹配 Skill 的 description。官方建议 description 里写清用途、触发场景与关键词，触发不灵时先检查 description 是否足够具体。[@ref-qoder-cli-skills-trouble]
- 内置技能是斜杠命令的直接来源（`/create-skill`、`/create-skill-ui`、`/vercel-deploy`、`/create-subagent`、`/canvas`）。[@ref-qoder-ide-skills-overview]
- CLI 页面补充了一条实现说明：Skill 在内部转换为特殊 Command 类型，和命令共享执行机制；两者的差别是触发方式（Skill 可自动触发或手动 `/skill-name`，Command 只能手动 `/command-name`）与存储目录（`skills/` 对 `commands/`）。[@ref-qoder-cli-skills-vs-commands]

同名冲突的规则在固定来源之间**冲突**：IDE 的 Skills 页明确写"当用户级与项目级存在同名 Skill 时，项目级优先"；CLI 的 Skills 页写"当名称冲突时，用户级 Skill 覆盖项目级 Skill"。两处都是官方文档，读者应以自己实际使用的入口为准并验证，本章不替官方裁定。[@ref-qoder-ide-skills-paths-v2][@ref-qoder-cli-skills-where]

## 诊断与刷新 {#skills-diagnostics}

- 查看已加载技能：IDE 重启后在对话框输入 `/`；CLI 可以问 "What Skills are available?" 或运行 `/skills`，也可以用文件系统检查 `~/.qoder/skills/*/SKILL.md` 与 `.qoder/skills/*/SKILL.md`。[@ref-qoder-ide-skills-paths-v2][@ref-qoder-cli-skills-view]
- 官方排查表（原文要点）：技能不触发 → 确认 `SKILL.md` 在正确路径、YAML 无缩进/引号错误、description 足够具体；技能执行报错 → 检查依赖是否自动安装、脚本是否有可执行权限（`chmod +x .qoder/skills/my-skill/scripts/*.py`）；多个技能互相干扰 → 用不同的触发词区分 description。[@ref-qoder-cli-skills-trouble]
- 改动生效时机：新会话启动时加载；已运行的 CLI 会话用 `/skills reload`（别名见 Skills 页的"Update a Skill"）。IDE 页面未给出会话内热重载入口，只给出"重启后查看列表"。[@ref-qoder-cli-skills-update][@ref-qoder-ide-skills-paths-v2]

**缺口**：固定来源没有提供 IDE 侧的 Skill 加载日志、冲突告警或"某个 Skill 为何未被选中"的可观察诊断入口；可用的只有列表查看与上表的排查项，以及把完整规范页当作字段参考。[@ref-qoder-ide-skills-full]
