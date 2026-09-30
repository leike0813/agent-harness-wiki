---
schema_version: 3
record_kind: production
edition_id: lingma-jetbrains-skills-v1
harness_id: lingma
topic: skills
title: "Lingma（Qoder CN）JetBrains 插件的 Skills：目录、格式、调用与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-product-rename, ref-lingma-install-jetbrains, ref-lingma-compat-jetbrains, ref-lingma-skills-overview, ref-lingma-product-family]
  - section_id: skills-roots
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-skills-roots, ref-lingma-plugins-manifest]
  - section_id: skills-format
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-plugins-skill, ref-lingma-skills-overview]
  - section_id: skills-loading-invocation
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-skills-roots, ref-lingma-skills-usage, ref-lingma-changelog-skillsjar]
  - section_id: skills-extensions-diagnostics
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-changelog-skillsjar, ref-lingma-plugins-manifest, ref-lingma-skills-roots, ref-lingma-skills-usage]
  - section_id: skills-vs-rules
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-skills-usage, ref-lingma-skills-roots]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [jetbrains]
        section_id: skills-roots
        status: answered
        source_refs: [ref-lingma-skills-roots]
  - question_id: skills.discovery
    answers:
      - surface_ids: [jetbrains]
        section_id: skills-roots
        status: partial
        source_refs: [ref-lingma-skills-roots]
  - question_id: skills.collision
    answers:
      - surface_ids: [jetbrains]
        section_id: skills-roots
        status: answered
        source_refs: [ref-lingma-skills-roots]
  - question_id: skills.format
    answers:
      - surface_ids: [jetbrains]
        section_id: skills-format
        status: partial
        source_refs: [ref-lingma-plugins-skill]
  - question_id: skills.extensions
    answers:
      - surface_ids: [jetbrains]
        section_id: skills-extensions-diagnostics
        status: partial
        source_refs: [ref-lingma-changelog-skillsjar, ref-lingma-plugins-manifest]
  - question_id: skills.loading
    answers:
      - surface_ids: [jetbrains]
        section_id: skills-loading-invocation
        status: partial
        source_refs: [ref-lingma-skills-usage]
  - question_id: skills.invocation
    answers:
      - surface_ids: [jetbrains]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-lingma-skills-usage]
  - question_id: skills.conditions
    answers:
      - surface_ids: [jetbrains]
        section_id: skills-loading-invocation
        status: partial
        source_refs: [ref-lingma-skills-roots]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [jetbrains]
        section_id: skills-extensions-diagnostics
        status: partial
        source_refs: [ref-lingma-skills-roots, ref-lingma-skills-usage]
---

## 固定来源与界面 {#skills-scope}

本章依据官方文档站点 docs.qoder.cn 的 Qoder CN 用户指南（原“智能编码助手通义灵码”，Lingma）。界面口径为 catalog 唯一登记的 `jetbrains`（JetBrains IDE 插件，kind `ide`）。产品自 2026-05-20 起更名为 Qoder CN 系列，编码桌面应用现名 Qoder CN IDE，Qoder CN JetBrains 插件继续提供；插件相关进程与目录名仍沿用 `.lingma` / `Lingma.exe`。[@ref-lingma-product-rename]

插件兼容 IntelliJ IDEA、PyCharm、GoLand、WebStorm、Android Studio 等 JetBrains IDEs 2020.3 及以上，可经插件市场或 zip 安装包安装。[@ref-lingma-install-jetbrains][@ref-lingma-compat-jetbrains]

官方把 Qoder CN 描述为一个 AI 智能体产品系列，包含 Qoder CN IDE、Qoder CN JetBrains 插件、QoderWork CN、Qoder CN CLI、Cloud Agents 等子产品；编码场景的插件仍是本章的界面口径。[@ref-lingma-product-family]

Lingma 的“技能（Skills）”与“项目专属规则（Rules）”是两套机制：规则是注入上下文的指令文本（存于 `.lingma/rules`），技能是可复用能力包（每个技能是一个目录，内含 `SKILL.md`）。本章只写技能，规则与其它配置入口见配置机制一章。[@ref-lingma-skills-overview]

## 技能来源目录与作用域 {#skills-roots}

技能按作用域分两级，官方给出固定路径 [@ref-lingma-skills-roots]：

| 位置 | 路径 | 作用域 |
| :-- | :-- | :-- |
| 用户级 | `~/.lingma/skills/{skill-name}/SKILL.md` | 当前用户的所有项目 |
| 项目级 | `.lingma/skills/{skill-name}/SKILL.md` | 仅当前项目 |

同名时**项目级 Skill 覆盖用户级 Skill**，这是文档明确写出的唯一优先级规则 [@ref-lingma-skills-roots]。技能是“可复用能力的打包单位”，官方同时把技能列为插件（Plugins）可打包的组件之一，插件内 `skills/` 目录下的每个含 `SKILL.md` 的子目录都会被加载；插件清单的 `skills` 字段还可精确声明只加载哪些技能路径 [@ref-lingma-plugins-manifest]。

缺口：用户级路径只在文档中以 `~/.lingma/skills`（或 Windows 用户目录）表述，未说明是否受 `HOME`、`XDG` 或环境变量影响；也没有工作区级（workspace）目录或插件的用户级安装目录列表。发现深度、符号链接与忽略规则同样未在文档中给出。

## SKILL.md 的格式与加载 {#skills-format}

官方对技能文件格式的描述集中在插件章节：每个技能是一个独立目录，包含一个 `SKILL.md`，文件使用 YAML frontmatter 加 Markdown 正文 [@ref-lingma-plugins-skill]：

| 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `description` | 建议必填 | 最重要的字段，模型据此决定何时自动调用该技能 |
| `name` | 否 | 技能名称，默认取目录名 |

最小结构（字段与示例依据插件文档中的技能示例）[@ref-lingma-plugins-skill]：

```markdown
---
description: 对当前项目执行代码规范检查并自动修复
name: lint-check
---

工作流程：
1. 读取项目的 lint 配置
2. 运行检查，汇总问题
3. 经用户确认后自动修复
```

技能的“核心特点”是智能调用、模块化设计、支持用户级与项目级自定义 [@ref-lingma-skills-overview]。缺口：`SKILL.md` 是否允许 `license`、`compatibility`、`metadata`、`allowed-tools` 等其它 frontmatter 字段，是否限制名称字符集或长度，正文之外是否为资源目录（scripts/references/assets）作预加载，文档均未给出；也没有校验失败的错误信息说明。

## 发现、加载与调用 {#skills-loading-invocation}

**发现时机**：手动拷贝技能文件到上述路径后，需要**重启 IDE**，才能在对话框内通过 `/` 看到已加载的 Skills 列表 [@ref-lingma-skills-roots]。文档没有在其它位置描述技能目录的扫描时机、缓存或热加载；结合 Hooks 文档“当前版本暂不支持热加载，修改配置文件后需要重启 IDE”的同一口径，可判断该插件的技能与配置均在 IDE 启动时载入 [@ref-lingma-skills-roots]。本节把“重启后加载”作为已证实的重载方式。

**调用方式** [@ref-lingma-skills-usage]：

- 自动触发：直接描述需求，模型根据技能描述自动判断是否调用（例如说“分析这个日志文件中的错误”，模型可自动识别并调用 `log-analyzer`）。
- 手动触发：输入 `/skill-name`（例如 `/log-analyzer`）。

**创建方式** [@ref-lingma-skills-roots]：

- 手动创建：把目标技能目录拷到用户级或项目级路径，重启 IDE。
- 内置技能自动创建：内置 `create-skill` 技能以交互式对话引导生成符合规范的 `SKILL.md`，调用形式为 `/create-skill` 加技能描述。

JetBrains 插件从 2.9.0（2026-03-13）起支持用户添加自定义 Skills，并支持在输入框中通过 `/` 唤起；同一版本还提供 SkillsJars，可在 Lingma Files 菜单下把 Jar 包内 Skill 快速创建出来 [@ref-lingma-changelog-skillsjar]。

缺口：文档没有说明技能名称、描述与正文分别在哪个时刻进入模型上下文（描述常驻、正文按需加载，还是整段注入），也没有说明模型自动选择技能的阈值、可同时激活的数量或与规则（Rules）的优先级。技能调用失败或未被发现的提示同样未记录。

## 扩展项与诊断 {#skills-extensions-diagnostics}

**扩展项** [@ref-lingma-changelog-skillsjar][@ref-lingma-plugins-manifest]：

| 项 | 位置 | 说明 |
| :-- | :-- | :-- |
| `create-skill` | 内置技能 | 交互式生成 `SKILL.md` 模板 |
| SkillsJars | JetBrains 插件 | 在 Lingma Files 菜单下创建 Jar 包内 Skill |
| 插件 `skills` 字段 | `.qoder-plugin/plugin.json` | 精确声明加载哪些技能路径；指向目录时加载该目录下所有含 `SKILL.md` 的子目录 |

**诊断** [@ref-lingma-skills-roots][@ref-lingma-skills-usage]：

- 在对话框输入 `/`，可查看当前已加载的 Skills 列表，并据此确认某技能是否被发现。
- 调用结果由对话窗口呈现；文档未提供独立的“技能列表”命令或日志项。
- 改动技能文件后需要重启 IDE 才能重新加载，这是已验证的生效方式。

缺口：没有面向用户的技能校验错误汇总入口，也没有查看到底哪些路径被扫描的界面；上述观察依赖对话框 `/` 列表与重启，文档未提到更细的诊断命令。

## 技能与规则的关系 {#skills-vs-rules}

技能是可被自动或手动调用的能力单元，规则是持久注入上下文的指令，两者目录与触发方式不同（技能 `/.lingma/skills`，规则 `/.lingma/rules`，规则以 `@rule` 唤起）[@ref-lingma-skills-usage][@ref-lingma-skills-roots]。
