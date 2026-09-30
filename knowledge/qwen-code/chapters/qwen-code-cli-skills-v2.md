---
schema_version: 3
record_kind: production
edition_id: qwen-code-cli-skills-v2
harness_id: qwen-code
topic: skills
title: "Qwen Code CLI 的 Skills：位置、格式、发现、调用、冲突、设置与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-qwen-readme-acknowledgments, ref-qwen-skills-what-are-agent-skills]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-qwen-commands-1-5-built-in-skills, ref-qwen-introduction-qwen-extension-json, ref-qwen-settings-environment-variables-table, ref-qwen-settings-skills, ref-qwen-settings-the-qwen-directory-in-your-project, ref-qwen-skills-extension-skills, ref-qwen-skills-personal-skills, ref-qwen-skills-project-skills, ref-qwen-skills-view-available-skills]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-qwen-introduction-custom-skills, ref-qwen-introduction-qwen-extension-json, ref-qwen-skills-add-supporting-files, ref-qwen-skills-extension-skills-and-the-skills-settings, ref-qwen-skills-field-requirements, ref-qwen-skills-optional-control-user-and-model-invocation, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks, ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths, ref-qwen-skills-write-skill-md]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-qwen-rules-rules-skills-and-context-files, ref-qwen-skills-add-supporting-files, ref-qwen-skills-extension-skills, ref-qwen-skills-generate-a-project-skill-with-learn, ref-qwen-skills-maintain-auto-generated-project-skills, ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths, ref-qwen-skills-update-a-skill, ref-qwen-skills-view-available-skills]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-qwen-introduction-custom-skills, ref-qwen-skills-how-extension-skills-are-named, ref-qwen-skills-how-skills-are-invoked, ref-qwen-skills-optional-control-user-and-model-invocation, ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths, ref-qwen-skills-view-available-skills]
  - section_id: skills-collision
    surface_ids: [cli]
    source_refs: [ref-qwen-introduction-conflict-resolution, ref-qwen-introduction-custom-skills, ref-qwen-skills-extension-skills-and-the-skills-settings, ref-qwen-skills-how-extension-skills-are-named]
  - section_id: skills-settings
    surface_ids: [cli]
    source_refs: [ref-qwen-settings-skills, ref-qwen-settings-slashcommands, ref-qwen-skills-extension-skills-and-the-skills-settings]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-qwen-hooks-agent-frontmatter-scope, ref-qwen-hooks-security-model, ref-qwen-skills-extension-skills, ref-qwen-skills-maintain-auto-generated-project-skills, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks, ref-qwen-skills-update-a-skill]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-qwen-skills-check-yaml-syntax, ref-qwen-skills-debug-a-skill, ref-qwen-skills-maintain-auto-generated-project-skills, ref-qwen-skills-make-the-description-specific, ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths, ref-qwen-skills-test-a-skill, ref-qwen-skills-update-a-skill, ref-qwen-skills-verify-file-path, ref-qwen-skills-view-available-skills, ref-qwen-skills-view-errors]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-qwen-skills-view-available-skills, ref-qwen-skills-personal-skills, ref-qwen-skills-project-skills, ref-qwen-skills-extension-skills, ref-qwen-settings-skills, ref-qwen-settings-the-qwen-directory-in-your-project, ref-qwen-introduction-qwen-extension-json, ref-qwen-commands-1-5-built-in-skills, ref-qwen-settings-environment-variables-table]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-qwen-skills-write-skill-md, ref-qwen-skills-field-requirements, ref-qwen-skills-add-supporting-files, ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths, ref-qwen-skills-optional-control-user-and-model-invocation, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-qwen-skills-field-requirements, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks, ref-qwen-introduction-custom-skills, ref-qwen-introduction-qwen-extension-json, ref-qwen-skills-extension-skills-and-the-skills-settings]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: partial
        source_refs: [ref-qwen-skills-view-available-skills, ref-qwen-skills-extension-skills, ref-qwen-skills-update-a-skill, ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-qwen-rules-rules-skills-and-context-files, ref-qwen-skills-add-supporting-files, ref-qwen-skills-generate-a-project-skill-with-learn, ref-qwen-skills-maintain-auto-generated-project-skills]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-qwen-skills-how-skills-are-invoked, ref-qwen-skills-view-available-skills, ref-qwen-skills-how-extension-skills-are-named, ref-qwen-skills-optional-control-user-and-model-invocation, ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths, ref-qwen-introduction-custom-skills]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-collision
        status: answered
        source_refs: [ref-qwen-skills-extension-skills-and-the-skills-settings, ref-qwen-skills-how-extension-skills-are-named, ref-qwen-introduction-custom-skills, ref-qwen-introduction-conflict-resolution]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: answered
        source_refs: [ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks, ref-qwen-hooks-agent-frontmatter-scope, ref-qwen-hooks-security-model, ref-qwen-skills-update-a-skill, ref-qwen-skills-maintain-auto-generated-project-skills, ref-qwen-skills-extension-skills]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-qwen-skills-view-available-skills, ref-qwen-skills-maintain-auto-generated-project-skills, ref-qwen-skills-verify-file-path, ref-qwen-skills-view-errors, ref-qwen-skills-make-the-description-specific, ref-qwen-skills-debug-a-skill, ref-qwen-skills-check-yaml-syntax, ref-qwen-skills-test-a-skill, ref-qwen-skills-update-a-skill, ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与范围 {#skills-scope}

本章的固定来源是 `QwenLM/qwen-code` 仓库固定提交 `e767e223c5c1d6fe13217d95faf365721e6e3437` 上的四份文档：`docs/users/features/skills.md`（Skills 主文档，含目录、格式、发现、调用、冲突、维护与诊断）、`docs/users/configuration/settings.md`（`skills` 与 `slashCommands` 设置组、`.qwen` 项目目录、环境变量表）、`docs/users/extension/introduction.md`（扩展提供的 Skills、`qwen-extension.json`、命名与冲突解析）、`docs/users/features/hooks.md`（Skill frontmatter 的 `hooks:` 作用域）。本章只陈述该快照记载的行为。

Qwen Code 最早基于 Google Gemini CLI v0.8.2 开发，但从 Qwen Code v0.1 起停止与上游同步、开始独立发展 [@ref-qwen-readme-acknowledgments]，因此判断当前行为应以上述固定文档为准。凡文档明确写成对另一个 Agent 的兼容（例如扩展安装支持的 Claude Code 插件市场/Claude Code 兼容字段），本章按“文档记载的兼容”陈述，不当作 Gemini 继承行为。

Agent Skill 是把专项能力打包成可发现目录的机制：每个 Skill 是一个含 `SKILL.md` 的文件夹，文件里是给模型的指令，另有可选的脚本、模板等支撑文件 [@ref-qwen-skills-what-are-agent-skills]。

## Skill 的目录与作用域 {#skills-roots}

宿主从四个来源发现 Skill，级别越具体优先级越高：Project > User > Extension > Bundled [@ref-qwen-skills-view-available-skills] [@ref-qwen-settings-skills]。

| 级别 | 位置 | 说明 |
| --- | --- | --- |
| Personal（用户级） | `~/.qwen/skills/` | 跨全部项目可用 [@ref-qwen-skills-personal-skills] |
| Project（项目级） | 项目根的 `.qwen/skills/` | 可提交 git、随团队共享 [@ref-qwen-skills-project-skills] |
| Extension（扩展级） | 扩展目录下的 `skills/` 子目录 | 扩展安装且启用后自动发现 [@ref-qwen-skills-extension-skills] |
| Bundled（内置） | 随 Qwen Code 分发 | 内置工作流，如 `/review`、`/coordinate`、`/loop`、`/simplify` [@ref-qwen-commands-1-5-built-in-skills] |

- 项目级 Skills 位于项目 `.qwen/` 目录下，该目录同时存放项目设置等项目相关文件 [@ref-qwen-settings-the-qwen-directory-in-your-project]。
- 扩展级目录默认名为 `skills`，由扩展清单 `qwen-extension.json` 的 `skills` 字段声明（默认值就是 `skills`），指向扩展目录内的相对路径 [@ref-qwen-introduction-qwen-extension-json] [@ref-qwen-skills-extension-skills]。
- 全局配置目录默认是 `~/.qwen`；环境变量表中的 `QWEN_HOME` 可把它改到别处，用户级 Skills 随该目录一起迁移 [@ref-qwen-settings-environment-variables-table]。
- 四个级别与设置里 `skills.disabledLevels` 的取值一一对应：`project`、`user`、`extension`、`bundled` [@ref-qwen-settings-skills]。
- `skills.directories` 声明的目录被归到 `user` 级别，因此 `skills.disabledLevels: ["user"]` 会连它们一起隐藏 [@ref-qwen-settings-skills]。

路径如何随 home 与当前目录变化：用户级固定在全局配置目录（默认 `~/.qwen`，可被 `QWEN_HOME` 重定位）；项目级随当前项目的仓库根下的 `.qwen/` 解析 [@ref-qwen-settings-the-qwen-directory-in-your-project]。

## `SKILL.md` 的格式与字段 {#skills-format}

`SKILL.md` 由 YAML frontmatter 与 Markdown 正文组成 [@ref-qwen-skills-write-skill-md]：

```yaml
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
priority: 10
---
```

解析期会校验下列字段（依据 `docs/users/features/skills.md` 的 Field requirements）[@ref-qwen-skills-field-requirements]：

| 字段 | 必选 | 规则 |
| --- | --- | --- |
| `name` | 是 | 非空字符串，须匹配 `/^[\p{L}\p{N}_:.-]+$/u`：Unicode 字母数字（CJK、西里尔、带重音拉丁均可）加 `_`、`:`、`.`、`-`；空白、斜杠、方括号等在解析期直接拒绝 |
| `description` | 是 | 非空字符串；模型据此判断何时调用 |
| `priority` | 否 | 存在时须为有限数。数值越大在 `/skills` 列表越靠前（负值允许，排在未设置项之后）；缺省或非法按未设置处理，等同 `0` |
| `paths` | 否 | glob 列表；门控模型侧发现，详见下节发现链 |
| `user-invocable` | 否 | 默认 `true`；设 `false` 后从 `/〈技能名〉` 与 `/skills` 选择器移除，但仍可被模型调用 |
| `disable-model-invocation` | 否 | 设 `true` 后对模型隐藏，保留用户直接调用 |
| `hooks` | 否 | 声明确定性的门禁钩子 |
| `allowedTools` | 否 | 允许规则；会话恢复时与 `hooks:` 一并重新应用 |

- `paths:` 只在 SkillTool 清单层面对**模型发现**生效；除非同时设 `user-invocable: false`，用户仍能用 `/〈技能名〉` 或 `/skills` 面板直接运行，用户路径无视激活状态 [@ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths]。
- 两个调用控制字段可以同时为真，但那样用户与模型的常规路径都够不到该 Skill [@ref-qwen-skills-optional-control-user-and-model-invocation]。
- 正文内容都是提示文本，是否遵守取决于模型；要让一条规则无条件成立，应改写成 frontmatter 的 `hooks:`，它作为代码运行、不依赖模型配合。`$QWEN_SKILL_ROOT` 指向 Skill 自身目录，钩子可据此引用随 `SKILL.md` 一起分发的脚本 [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。
- 支撑文件与 `SKILL.md` 同目录：`reference.md`、`examples.md`、`scripts/`、`templates/` 等，并在正文中以相对路径引用 [@ref-qwen-skills-add-supporting-files]。

### 扩展专有字段与文件

`name` 允许的冒号让扩展注册名（`rust:pdf`）与作者自写的冒号名（`rust:chat`，写在 `rust` 扩展内）共用一个模式，因此注册名里有冒号并不一定代表来自扩展 [@ref-qwen-skills-field-requirements]。

- 扩展提供的 Skills 不支持 frontmatter 的 `hooks:`，应改用扩展清单级的钩子 [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。
- 扩展清单 `qwen-extension.json` 的 `skills` 字段声明 Skill 目录（默认 `skills`），放入该目录的 Skill 自动发现并通过 `/skills` 提供 [@ref-qwen-introduction-qwen-extension-json]。
- 扩展 Skill 的注册名一律带所有者前缀，前缀在加载时加上、不写回磁盘上的 `SKILL.md` [@ref-qwen-introduction-custom-skills]。
- 设置对两种拼写不对称：`skills.disabled`、`skills.defaultDisabled`、`slashCommands.disabled` 两种拼写都匹配，而 `skills.enabled` 只匹配注册名 [@ref-qwen-skills-extension-skills-and-the-skills-settings]。

## Skill 的发现与加载 {#skills-discovery}

发现的触发与范围：

- 扩展 Skills 在扩展安装且启用时被自动发现并加载 [@ref-qwen-skills-extension-skills]。
- 正常会话中 Qwen Code 监视用户级与项目级 Skill 目录；新增、编辑、删除 Skill 会在短暂延迟后自动刷新 Skill 列表与调用状态。bare mode 不启动这些监视器，须重启 Qwen Code 才能载入 Skill 改动 [@ref-qwen-skills-update-a-skill]。
- `paths:` 门控：工具调用触及匹配文件后，该 Skill 在整个会话余下时间保持激活；一个新会话，或编辑任一 Skill 文件触发的 `refreshCache`，会重置激活状态 [@ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths]。
- `/skills` 打开的清单会包含尚未激活的 path-gated Skill，可见范围是四个发现来源 [@ref-qwen-skills-view-available-skills]。

固定来源未规定扫描的目录深度、符号链接处理以及 `paths:` 之外的忽略规则；这是一个明确的记录缺口，本章不臆测。

加载进入上下文的方式 [@ref-qwen-rules-rules-skills-and-context-files]：

| 内容 | 何时进入上下文 |
| --- | --- |
| 名称 + 描述 | 起始即在（模型的可用 Skill 清单） |
| 正文 | 模型调用该 Skill 时按需读取 |
| 支撑文件 | 由正文引用、模型按需读取 [@ref-qwen-skills-add-supporting-files] |

生成式与自动维护的 Skill：

- `/learn` 把一个知识源蒸馏成项目 Skill，产物位于 `.qwen/skills/learned-skill-〈技能名〉/SKILL.md`，frontmatter 带 `source: learned`；该命令按普通 agent turn 运行 [@ref-qwen-skills-generate-a-project-skill-with-learn]。
- Auto Skill 维护只管理名为 `.qwen/skills/auto-skill-*` 且 `SKILL.md` frontmatter 含 `source: auto-skill` 的目录；个人级、扩展级、内置与手写 Skill 永不被选中。30 天无成功使用或未编辑即标记 stale，90 天把整个目录移到 `.qwen/archived-skills/`（不永久删除）。自动维护最多每 7 天一次，且只在受信工作区运行；被 pin 的 auto-skill 排除在自动 stale/archive 转换之外。Qwen Code 会在 Auto Skill 生成被关闭时仍记录成功使用 [@ref-qwen-skills-maintain-auto-generated-project-skills]。

## Skill 的调用方式 {#skills-invocation}

- Skills 是**模型调用**的：模型根据用户请求与 Skill 描述自行决定何时使用；这与用户显式输入 `/command` 的 slash command 相反 [@ref-qwen-skills-how-skills-are-invoked]。
- 显式调用：把 Skill 名当作 slash command 输入 `/〈技能名〉`；输入 `/` 可自动补全并浏览可用 Skills [@ref-qwen-skills-how-skills-are-invoked]。
- `/skills` 命令打开 Skills 面板，可浏览、搜索、切换、启动；交互式界面下它开面板，非交互模式（ACP 等）打印只读清单 [@ref-qwen-skills-view-available-skills]。
- 模型侧调用名为 `Skill { skill: ... }`，用的是它在可用清单里读到的同一个名字 [@ref-qwen-skills-how-extension-skills-are-named]。
- 扩展 Skill 的注册名是 `〈扩展名〉:〈技能名〉`：`rust` 扩展里名为 `pdf` 的 Skill 注册为 `rust:pdf`，只能以 `/rust:pdf` 调用，裸 `/pdf` 不是别名 [@ref-qwen-skills-how-extension-skills-are-named] [@ref-qwen-introduction-custom-skills]。
- `user-invocable: false` 移除用户直接调用路径，但不隐藏于模型；`disable-model-invocation: true` 反之隐藏于模型 [@ref-qwen-skills-optional-control-user-and-model-invocation]。
- path-gated Skill 的用户调用路径不受激活状态限制，用户可直接跑其正文；但 slash 调用不会解锁模型侧激活 [@ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths]。

注意：曾用 `/skills 〈技能名〉` 运行的写法现在只打开面板并忽略尾参，运行 Skill 请用 `/〈技能名〉` [@ref-qwen-skills-how-skills-are-invoked]。

## 同名 Skill 的冲突与命名空间 {#skills-collision}

- 跨级别优先级按**注册名精确比较**：project > user > extension > bundled；个人级或项目级作者写一个名为 `rust:pdf` 的 Skill，可以压过扩展的 `pdf` [@ref-qwen-skills-extension-skills-and-the-skills-settings]。
- 两个扩展各自提供名为 `pdf` 的 Skill 时，得到 `rust:pdf` 与 `docs-suite:pdf` 两个 Skill，而不是一个胜出、一个消失 [@ref-qwen-skills-how-extension-skills-are-named] [@ref-qwen-introduction-custom-skills]。
- 扩展 Skill 始终带所有者前缀，因此不会像扩展自定义命令那样因冲突被改名或遮蔽；扩展命令才是最低优先级、冲突时前缀化（如 `/gcp.deploy`）[@ref-qwen-introduction-conflict-resolution] [@ref-qwen-introduction-custom-skills]。
- Skill 与自定义命令同名时**不由上面的优先级决定**：在 slash 层面“最后加载者胜出”，自定义命令在 Skills 之后加载，所以 `/pdf` 跑自定义命令，而同名 Skill 仍对模型可用 [@ref-qwen-skills-extension-skills-and-the-skills-settings]。
- Skill 名还会被当作文件名使用：读取调用参数的文件把 `[A-Za-z0-9._-]` 之外的每个字符替换成 `_`。因此扩展的 `rust:pdf` 与作者写的 `rust_pdf` 都落到 `qwen-skill-args-rust_pdf.txt`，共用一个参数文件；`rust_pdf:x` 与 `rust:pdf_x` 也会折叠到同一文件名。非 ASCII 字母同样折叠（`café` 与 `caf_` 都落到 `caf_`）[@ref-qwen-skills-extension-skills-and-the-skills-settings]。
- 实践建议：避免使用“另一个名字把 `:` 换成 `_`”后得到的名字 [@ref-qwen-skills-extension-skills-and-the-skills-settings]。

## 设置项与启用/禁用语义 {#skills-settings}

`skills` 组控制哪些 Skill 暴露给模型，`slashCommands` 组控制 slash 命令面 [@ref-qwen-settings-skills] [@ref-qwen-settings-slashcommands]。

| 设置 | 类型 | 语义 | 默认 |
| --- | --- | --- | --- |
| `skills.disabledLevels` | string[] | 完全跳过的发现级别：`project`、`user`、`extension`、`bundled`；跨作用域取并集。`["bundled"]` 隐藏全部内置 Skill；`["user"]` 连 `skills.directories` 一起隐藏 | 未设置 |
| `skills.disabled` | string[] | 硬禁用名；大小写不敏感、跨作用域并集，项目设置无法覆盖用户／系统条目。被禁 Skill 不出现在可用清单和 `/〈技能名〉` 中 | 未设置 |
| `skills.defaultDisabled` | string[] | 默认禁用、可由 `skills.enabled` 显式启用的名；同样按并集合并 | 未设置 |
| `skills.enabled` | string[] | 显式启用，覆盖匹配的 `defaultDisabled`；跨作用域并集，且只按**注册名**匹配（扩展 Skill 须写 `rust:pdf`，裸 `pdf` 只是取消同拼写的 `defaultDisabled`） | 未设置 |
| `slashCommands.disabled` | string[] | 隐藏并拒绝执行的 slash 命令名；按最终命令名大小写不敏感匹配，Skill 命令按两种拼写之一匹配；跨作用域并集 | 未设置 |

- 优先级：`skills.disabled` > `skills.enabled` > `skills.defaultDisabled`；任一层级的硬 `disabled` 都胜出 [@ref-qwen-settings-skills]。
- 每个列表都是字面名（trim 后大小写不敏感），不支持 glob；`skills.enabled` 只有在与 `defaultDisabled` 条目**拼写相同**时才取消它 [@ref-qwen-settings-skills]。
- `slashCommands.disabled` 之外，同一 denylist 还可由 `--disabled-slash-commands`（逗号分隔或重复）与 `QWEN_DISABLED_SLASH_COMMANDS` 环境变量提供，三者取并集 [@ref-qwen-settings-slashcommands]。
- 面板切换会写入注册名并只移除该条目，因此启用 `rust:pdf` 不会动遗留的 `disabled: ["pdf"]`；当遗留条目位于更高作用域时面板会锁行并指明要编辑的作用域与文件名（如 `skills.disabled 'pdf' (Workspace)`）[@ref-qwen-skills-extension-skills-and-the-skills-settings]。
- 限制只能减少能力：改名 Skill 不允许解除既有禁用，所以两拼写匹配的 `disabled` 写法保持有效 [@ref-qwen-skills-extension-skills-and-the-skills-settings]。

## 生效条件：信任、入口与开关 {#skills-conditions}

- **信任**：项目级 Skill 的 `hooks:` 会执行仓库提供的命令，故只在受信文件夹注册；每次钩子触发、每次权限决策都会重新读取信任值。接有 IDE companion 时该值实时生效，撤销信任会立刻静默已注册门禁并暂停其 `allowedTools`，无需重启；无 IDE 连接时该值在 CLI 启动时固定，改动要重启生效。授予信任不会追溯注册，需重新调用该 Skill [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。项目钩子在受信文件夹外不加载 [@ref-qwen-hooks-security-model]。
- **钩子作用域**：`hooks:` 会在 Skill 被调用时注册并持续整个会话；模型通过 Skill tool 加载的 Skill（含其 `allowedTools` 与 `hooks:`）在 `--continue`/`--resume` 时会被重新应用，用户自跑的 `/〈技能名〉` 不留工具调用记录、不恢复 [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。全局设置钩子与会话级 skill/function 钩子保留其既有作用域；项目 agent 钩子在每个事件前重查工作区信任 [@ref-qwen-hooks-agent-frontmatter-scope]。
- **关闭钩子的会话**：`disableAllHooks`、safe mode 与 ACP 客户端的 `skipHooks` 使这些会话不注册任何 Skill 钩子；Skill 正文与 `allowedTools` 仍生效，靠钩子强制的规则则不生效 [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。
- **bare mode**：根本不发现任何 Skill，因此正文与 `allowedTools` 也都不存在；同时不启动目录监视器，需重启才载入改动 [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks] [@ref-qwen-skills-update-a-skill]。
- **扩展状态**：扩展 Skill 只有在扩展安装且启用时才可用 [@ref-qwen-skills-extension-skills]。
- **Auto Skill 维护**：状态与 dry-run 预览在 safe mode 与不受信工作区可用；应用维护、改 pin、恢复归档需要受信工作区且不在 safe mode [@ref-qwen-skills-maintain-auto-generated-project-skills]。

## 诊断与重载 {#skills-diagnostics}

- `/skills`：打开面板（非交互模式打印只读清单），浏览、搜索、切换、启动，包含尚未激活的 path-gated Skill [@ref-qwen-skills-view-available-skills]。
- `/curator`：查看 active、stale、archived、pinned 的 auto-skill；`/curator run --dry-run` 预览维护，`/curator run` 立即执行，`pin`/`unpin`/`restore` 控制单个 Skill [@ref-qwen-skills-maintain-auto-generated-project-skills]。
- 询问模型“有哪些 Skills 可用？”只反映模型当前可见的范围；`paths:` Skill 在匹配文件被触及前不出现在该清单里 [@ref-qwen-skills-view-available-skills]。
- 文件系统检查：`ls ~/.qwen/skills/`、`ls .qwen/skills/`、`cat ~/.qwen/skills/my-skill/SKILL.md` [@ref-qwen-skills-verify-file-path]。
- 错误可见性：以 `qwen --debug` 运行可看到 Skill 加载错误 [@ref-qwen-skills-view-errors]。
- 常见原因一，描述不具体：把“Helps with documents”改成写明做什么与何时用 [@ref-qwen-skills-make-the-description-specific] [@ref-qwen-skills-debug-a-skill]。
- 常见原因二，路径不对：个人级 `~/.qwen/skills/〈技能名〉/SKILL.md`，项目级 `.qwen/skills/〈技能名〉/SKILL.md` [@ref-qwen-skills-verify-file-path]。
- 常见原因三，YAML 语法：首行必须是开 `---`，正文前有闭 `---`，不用 tab、缩进正确；非法 YAML 会让元数据无法加载 [@ref-qwen-skills-check-yaml-syntax]。
- 验收方式：用与描述匹配的问题测试，模型会自行决定是否使用该 Skill [@ref-qwen-skills-test-a-skill]。
- 重载：正常会话中增删改 Skill 会在短暂延迟后自动刷新；bare mode 不启动监视器，须重启 Qwen Code [@ref-qwen-skills-update-a-skill]。编辑任一 Skill 文件会触发 `refreshCache`，重置 path-gated 激活状态 [@ref-qwen-skills-optional-gate-a-skill-on-file-paths-paths]。
