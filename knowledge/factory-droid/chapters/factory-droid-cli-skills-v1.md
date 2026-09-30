---
schema_version: 3
record_kind: production
edition_id: factory-droid-cli-skills-v1
harness_id: factory-droid
topic: skills
title: "Droid CLI 的 Skill：发现位置、frontmatter、同名解析、调用与诊断"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-fd-skills-scope, ref-fd-skills-loading, ref-fd-skills-anatomy]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-fd-skills-frontmatter, ref-fd-skills-allowed-tools, ref-fd-repo-skills-format, ref-fd-repo-skills-frontmatter]
  - section_id: skills-resolution
    surface_ids: [cli]
    source_refs: [ref-fd-skills-precedence, ref-fd-skills-manage]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-fd-skills-invoke-control, ref-fd-skills-slash, ref-fd-skills-loading, ref-fd-cmd-discovery, ref-fd-cmd-manage, ref-fd-cmd-markdown, ref-fd-cmd-exec, ref-fd-cli-slash]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-fd-skills-quickstart, ref-fd-cli-flags, ref-fd-exec-skills, ref-fd-settings-disabled-skills, ref-fd-agentsmd-surfaces, ref-fd-skills-manage]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-fd-skills-troubleshooting, ref-fd-skills-manage, ref-fd-skills-precedence, ref-fd-cmd-manage]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-fd-skills-scope, ref-fd-skills-anatomy]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-fd-skills-scope, ref-fd-skills-loading]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-resolution
        status: answered
        source_refs: [ref-fd-skills-precedence, ref-fd-skills-manage]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: conflict
        source_refs: [ref-fd-skills-frontmatter, ref-fd-repo-skills-format, ref-fd-repo-skills-frontmatter]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-fd-skills-frontmatter, ref-fd-skills-allowed-tools]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-fd-skills-loading, ref-fd-skills-slash]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-fd-skills-invoke-control, ref-fd-skills-slash, ref-fd-cmd-discovery]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: partial
        source_refs: [ref-fd-skills-quickstart, ref-fd-cli-flags, ref-fd-exec-skills, ref-fd-settings-disabled-skills, ref-fd-skills-manage]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-fd-skills-manage, ref-fd-skills-troubleshooting, ref-fd-cmd-manage]
---

## 固定来源与发现位置 {#skills-roots}

本章的固定来源是 Factory 官方文档站的 `harness/skills` 页面快照（https://docs.factory.com/harness/skills.md），辅以官方 GitHub 文档仓库 `Factory-AI/factory` 提交 `485a0c3b5d3d11c52d50cd2a8889e1a71e86905a` 中的 `docs/cli/configuration/skills.mdx`、`docs/cli/configuration/custom-slash-commands.mdx`。产品以官方 npm 包 `droid` 分发，CLI 本体不开源，因此整章按 source_only 阅读，没有软件版本映射。[@ref-fd-skills-anatomy]

Droid 把「目录下存在 `SKILL.md`」当作技能的判定条件：`skills/` 目录树中第一个包含 `SKILL.md` 的目录就是技能目录。文档给出的加载来源有九类，路径随 home、仓库根、插件与运行场景变化 [@ref-fd-skills-scope]：

| 来源 | 位置 | 作用范围 |
| :-- | :-- | :-- |
| Project | 仓库 `.factory/skills/` 下的技能目录 | 团队共享、随仓库提交 |
| Folder-specific | 仓库内更深一层项目目录的 `.factory/skills/` | 只有 Droid 检视到该目录后才适用 |
| Personal | 用户主目录 `~/.factory/skills/` | 跨项目个人技能 |
| Compatibility | 仓库 `.agents/skills/` 与 `.agent/skills/` 的递归子树 | 兼容其它 agent 目录约定 |
| Personal compatibility | 用户主目录 `.agents/skills/`、`.agent/skills/` | 个人兼容目录 |
| Mission | mission 会话目录下的 `skills/` | 只在 mission 会话内 |
| Automation | automation 目录（如 `~/.factory/automations/`）里的 `skills/` | 只在该 automation 的运行与工作目录位于其中时 |
| Plugin | 已安装插件根目录的 `skills/` | 随插件分发 |
| Built-in | 随 Droid 分发 | 受支持会话默认可用 |

扫描是递归的：Droid 会搜索这些 `skills/` 目录树，不限定深度，找到第一个含 `SKILL.md` 的目录即认定为该技能目录；目录内除入口文件外的其它文件（`checklists.md`、`schemas/`、`scripts/` 等）属于支持文件，不会自动载入，需要在 `SKILL.md` 正文里点名才会被读取或运行。[@ref-fd-skills-scope][@ref-fd-skills-anatomy]

载入时机是「先只看名字和描述、命中才读正文」的三段式：发现阶段 Droid 找出全部 `SKILL.md` 并读取 `name` 与 `description`；选择阶段把用户请求与描述比对；命中后调用阶段才把完整 `SKILL.md` 正文载入上下文。[@ref-fd-skills-loading]

## 技能文件与 frontmatter {#skills-format}

每个技能是一个目录，入口只能是名为 `SKILL.md` 的文件，YAML frontmatter 之后是 Markdown 指令正文。[@ref-fd-skills-frontmatter]

```markdown
---
name: summarize-diff
description: Summarize the staged git diff in 3-5 bullets. Use when the user asks for a summary of pending changes.
---

# Summarize Diff

### Instructions

1. Run `git diff --staged`.
2. Summarize the changes in 3-5 bullets.
```

上例来自官方 `harness/skills` 页面的最小技能示例；同一页面的 Note 明确「入口文件必须是 `SKILL.md`，不要用 `skill.mdx`」。[@ref-fd-skills-frontmatter]

该页面给出的 frontmatter 字段与默认值 [@ref-fd-skills-frontmatter]：

| 字段 | 必填 | 默认 | 作用 |
| :-- | :-- | :-- | :-- |
| `name` | 是 | 无 | 技能标识，小写字母、数字与连字符 |
| `description` | 是 | 无 | 路由描述，说明做什么、何时使用 |
| `allowed-tools` | 否 | 无 | 声明该技能打算用的工具；只是元数据，不增加工具，也不构成沙箱 |
| `enabled` | 否 | `true` | 设为 `false` 即保留文件但停用 |
| `user-invocable` | 否 | `true` | 设为 `false` 则不出现在斜杠调用菜单 |
| `disable-model-invocation` | 否 | `false` | 设为 `true` 则 Droid 不会自动调用 |
| `license`、`compatibility`、`version`、`metadata` | 否 | 无 | 共享/打包与自有工具链用的元数据 |

`allowed-tools` 不是运行期沙箱：技能不能借它拿到当前会话没有的工具，需要强制工具边界时应改用带工具策略的自定义 droid。[@ref-fd-skills-allowed-tools]

官方页面给出的完整 frontmatter 示例（含全部可选字段）[@ref-fd-skills-frontmatter]：

```yaml
---
name: review-api-change
description: Review API changes for backward compatibility. Use when a user edits public routes, schemas, or SDK-facing types.
allowed-tools:
  - Read
  - Grep
  - Glob
enabled: true
user-invocable: true
disable-model-invocation: false
license: MIT
compatibility: droid
version: 1.0.0
---
```

该页面同时说明：旧技能文件里可能出现的 `tools` 字段属于已弃用的旧元数据，工具限制应改用 `allowed-tools`；`metadata` 是可选的自由结构字段，用来放自有工具链需要的标记（不要放密钥）。[@ref-fd-skills-frontmatter]

**来源分歧**：官方文档仓库同一主题的旧版页面写入口是「`SKILL.md` 或 `skill.mdx`」，并把 `name` 记为可选、默认取目录名；而当前官方文档站页面写死只能是 `SKILL.md`，且 `name` 为必填。两处定位分别是仓库 `docs/cli/configuration/skills.mdx` 第 33–40 行与第 103–124 行的 frontmatter 表，和文档站 `harness/skills` 页的「Frontmatter reference」。若你的 Droid 只认 `SKILL.md`，按文档站执行更安全；把 `skill.mdx` 当入口属于旧行为，需要自己验证当前 CLI 版本是否仍接受。[@ref-fd-repo-skills-format][@ref-fd-repo-skills-frontmatter][@ref-fd-skills-frontmatter]

## 同名去重与优先级 {#skills-resolution}

多个来源出现同一个「净化后技能名」时，Droid 只保留一个生效版本，其余在 `/skills` 的 Effective 页显示为 overridden。非 mission、非 automation 会话的主要优先级从高到低是：Folder-specific 与 Project 技能、Project 插件技能、Personal 技能、User 插件技能、Built-in 技能；mission 会话中 mission 技能可以优先，automation 会话中 automation 自带技能压过上述全部，org 托管设置与命令行设置在这些作用域启用时可以再压一层。[@ref-fd-skills-precedence]

同一来源桶内出现重名属于无效配置，需要改名或删除后再用 `/diagnostics` 确认冲突消失。[@ref-fd-skills-precedence]

`/skills` 管理器把技能分成 Effective、User、Project、Plugins、Built-in、Import 几个标签页，Effective 页按状态分组：Enabled 表示当前可调用的版本，Disabled 表示被 frontmatter 或设置台账关闭，Overridden 表示同名更高优先级技能胜出，Invalid 表示找到了但名称、frontmatter 或提示词不合法。选中技能按空格切换启用状态；User 页把选择写进 `~/.factory/settings.json` 的 `disabledSkills`，Project 页写进项目 `.factory/settings.json`，如果停用来自其它作用域或 frontmatter，管理器会指出真正的来源而不是改错文件。[@ref-fd-skills-manage]

## 调用方式与上下文载入 {#skills-invocation}

默认情况下用户与 Droid 都能调用一个合法且启用的技能。`disable-model-invocation: true` 让技能只对用户开放；当同名自定义斜杠命令存在时，斜杠命令占用该名字，技能仍可被 Droid 自动选中。[@ref-fd-skills-invoke-control][@ref-fd-skills-slash]

用户在提示词里以 `/技能名` 触发技能：提示词按原样发送，命中的技能指令会附在其后；提示词里可以同时点名多个技能，同一个技能重复出现只载入一次。识别要求技能名是整词匹配，因此 `/tmp` 这类路径保持普通文本；提示词开头的非技能斜杠命令会占用整行，其后的技能标记不再生效。[@ref-fd-skills-slash]

自动调用侧依赖 `description` 做匹配，重复调用与自动调用的边界在描述里写清「何时使用」最能影响命中率。[@ref-fd-skills-loading]

旧的 `.factory/commands/` 斜杠命令机制仍在生效：Markdown 命令文件与可执行命令文件只在两项根目录（仓库 `.factory/commands` 与用户 `~/.factory/commands`）的顶层被识别，文件名 slug 化后成为命令名，仓库版压过同名个人版；`/commands` 管理器可以浏览与 `R` 重载。[@ref-fd-cmd-discovery][@ref-fd-cmd-manage]

两种命令文件的处理链不同 [@ref-fd-cmd-markdown][@ref-fd-cmd-exec]：

- **Markdown 命令**渲染成一条系统通知，用来播种 droid 的下一回合；可选 frontmatter 的 `description` 覆盖斜杠建议里的摘要、`argument-hint` 追加用法提示，`$ARGUMENTS` 替换为命令名之后键入的全部内容（不支持 `$1`/`$2` 位置参数）。
- **可执行命令**必须以合法 shebang 开头，参数按位置传入（`/deploy feature/login` 对应 `$1`），脚本在当前工作目录下以你的环境运行，其 stdout/stderr（最多 64 KB）与脚本内容回贴到会话记录，失败也会显示日志。

CLI 自身还提供一组内置斜杠命令（`/account`、`/archive`、`/mcp`、`/skills`、`/settings`、`/hooks`、`/droids` 等），它们与自定义命令、技能共用同一个 `/` 命名空间。[@ref-fd-cli-slash]

## 生效条件与开关 {#skills-conditions}

- 启动入口：技能在会话启动时被发现；新建技能后若没有立即可见，官方 Quickstart 要求新开一个 Droid 会话重新载入。[@ref-fd-skills-quickstart]
- 内置技能开关：`droid --disable-builtin-skills` 在交互或 exec 会话中关掉 Factory 自带技能，同时保留其它来源的技能。[@ref-fd-cli-flags]
- 会话级开关：`droid exec` 的 Skill controls 同样支持在单次非交互运行中关闭内置技能。[@ref-fd-exec-skills]
- 设置台账：`disabledSkills` 是技能名的停用清单，用户与项目两级数组会合并，任一级停用即停用；名字对尚未安装的技能无副作用。[@ref-fd-settings-disabled-skills]
- 与 AGENTS.md 的分工：AGENTS.md 是启动即载入的常驻指令，技能只在相关时载入，二者不要互相复制内容。[@ref-fd-agentsmd-surfaces]

**缺口**：固定来源没有说明项目技能是否受「工作区信任」提示约束（输出样式与项目权限规则明确受信任约束），也没有给出技能数量或体积上限；这些点保持未验证。[@ref-fd-skills-manage]

## 诊断与排错 {#skills-diagnostics}

- `/skills` 打开管理器，Effective 页显示生效版本与其它副本被覆盖的原因，User/Project 页显示并写入停用台账。[@ref-fd-skills-manage]
- `/diagnostics` 用来确认同一个来源桶内的重名冲突是否已经解决。[@ref-fd-skills-precedence]
- 官方排错清单按症状给出入口：技能没出现在斜杠菜单时检查文件名是否为 `SKILL.md`、`name`/`description` 是否存在、`enabled` 是否为 `false`；Droid 不自动调用时先确认没设 `disable-model-invocation: true` 再收紧描述；技能内工具不可用说明 `allowed-tools` 不会授予工具；选错技能时把名称与描述写具体。[@ref-fd-skills-troubleshooting]
- 修改 `.factory/commands/` 后可在 `/commands` 里按 `R` 重载而不重启。[@ref-fd-cmd-manage]
