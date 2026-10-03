---
schema_version: 3
record_kind: production
edition_id: antigravity-cli-skills-v2
harness_id: antigravity
topic: skills
title: Antigravity CLI 的 Skills：位置、格式、发现、调用与诊断
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-doc-cli-locations
      - ref-agy-skills-doc-20-locations
  - section_id: skills-format
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-doc-what
      - ref-agy-skills-doc-anatomy
      - ref-agy-skills-doc-manifest
      - ref-agy-skills-doc-frontmatter
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-doc-cli-locations
      - ref-agy-skills-doc-note-default
      - ref-agy-skills-doc-20-locations
      - ref-agy-skills-migration-paths
      - ref-agy-skills-wf-faq-global
      - ref-agy-skills-wf-compare
      - ref-agy-skills-plugins-structure
      - ref-agy-skills-plugins-fsloc
      - ref-agy-skills-plugins-manual
      - ref-agy-skills-changelog-plugin-install-path
      - ref-agy-skills-changelog-agents-parents
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-changelog-dirscan
      - ref-agy-skills-changelog-async
      - ref-agy-skills-changelog-dynamic
      - ref-agy-skills-changelog-standalone
      - ref-agy-skills-changelog-plugin-discovery
  - section_id: skills-collision
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-changelog-priority
      - ref-agy-skills-changelog-plugin-prefix
      - ref-agy-skills-wf-faq-collision
  - section_id: skills-extensions
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-changelog-icon
      - ref-agy-skills-changelog-disable-slash
      - ref-agy-skills-changelog-dirscan
      - ref-agy-skills-doc-frontmatter
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-doc-progressive
      - ref-agy-skills-doc-what
      - ref-agy-skills-changelog-async
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-doc-slash-conversion
      - ref-agy-skills-doc-20-invoking
      - ref-agy-skills-changelog-print
      - ref-agy-skills-changelog-disable-slash
      - ref-agy-skills-slash-cross-surface
      - ref-agy-skills-slash-learn
      - ref-agy-skills-changelog-menu-enabled
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-plugins-components
      - ref-agy-skills-changelog-plugin-discovery
      - ref-agy-skills-changelog-standalone
      - ref-agy-skills-changelog-inherit
      - ref-agy-skills-changelog-inherit-user
      - ref-agy-skills-changelog-builtin
      - ref-agy-skills-slash-plugin
      - ref-agy-skills-plugins-agy-cmds
      - ref-agy-skills-doc-plugin-manage
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-changelog-reload
      - ref-agy-skills-changelog-builtin
      - ref-agy-skills-changelog-dynamic
      - ref-agy-skills-changelog-standalone
  - section_id: skills-migration
    surface_ids: [cli]
    source_refs:
      - ref-agy-skills-wf-compare
      - ref-agy-skills-wf-migrate
      - ref-agy-skills-wf-faq-invoke
      - ref-agy-skills-migration-paths
      - ref-agy-skills-migration-ext
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs:
          - ref-agy-skills-doc-cli-locations
          - ref-agy-skills-doc-note-default
          - ref-agy-skills-doc-20-locations
          - ref-agy-skills-migration-paths
          - ref-agy-skills-wf-faq-global
          - ref-agy-skills-wf-compare
          - ref-agy-skills-plugins-structure
          - ref-agy-skills-plugins-fsloc
          - ref-agy-skills-plugins-manual
          - ref-agy-skills-changelog-agents-parents
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: partial
        source_refs:
          - ref-agy-skills-changelog-dirscan
          - ref-agy-skills-changelog-async
          - ref-agy-skills-changelog-dynamic
          - ref-agy-skills-changelog-standalone
          - ref-agy-skills-changelog-plugin-discovery
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-collision
        status: partial
        source_refs:
          - ref-agy-skills-changelog-priority
          - ref-agy-skills-changelog-plugin-prefix
          - ref-agy-skills-wf-faq-collision
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-agy-skills-doc-what
          - ref-agy-skills-doc-anatomy
          - ref-agy-skills-doc-manifest
          - ref-agy-skills-doc-frontmatter
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-extensions
        status: partial
        source_refs:
          - ref-agy-skills-changelog-icon
          - ref-agy-skills-changelog-disable-slash
          - ref-agy-skills-changelog-dirscan
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs:
          - ref-agy-skills-doc-progressive
          - ref-agy-skills-doc-what
          - ref-agy-skills-changelog-async
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-agy-skills-doc-slash-conversion
          - ref-agy-skills-doc-20-invoking
          - ref-agy-skills-changelog-print
          - ref-agy-skills-changelog-disable-slash
          - ref-agy-skills-slash-cross-surface
          - ref-agy-skills-slash-learn
          - ref-agy-skills-changelog-menu-enabled
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: partial
        source_refs:
          - ref-agy-skills-plugins-components
          - ref-agy-skills-changelog-plugin-discovery
          - ref-agy-skills-changelog-standalone
          - ref-agy-skills-changelog-inherit
          - ref-agy-skills-changelog-inherit-user
          - ref-agy-skills-changelog-builtin
          - ref-agy-skills-slash-plugin
          - ref-agy-skills-plugins-agy-cmds
          - ref-agy-skills-doc-plugin-manage
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs:
          - ref-agy-skills-changelog-reload
          - ref-agy-skills-changelog-builtin
          - ref-agy-skills-changelog-dynamic
          - ref-agy-skills-changelog-standalone
---

## 固定来源与共页边界 {#skills-scope}

本章的固定来源限于：官方文档站 `skills.md` 快照（取于 2026-09-30）、同站其它已登记页面，以及官方仓库提交 `77b1aad` 的登记文档与示例；本版新增的两条 CHANGELOG 条目固定在提交 `65a3c69`（CHANGELOG 1.2.16）。产品**没有官方 npm 包**，也没有软件版本映射，因此整章按 source_only 阅读；正文不绑定任何软件版本号，因为登记文档本身未注明适用软件版本。

`skills.md` 是一个多形态共享页：同一页面里并列出现 Antigravity 2.0、Antigravity CLI、Antigravity IDE 三个标签区块。只有 CLI 区块（例如标题为 `CLI skill locations`、`Slash command conversion`、`Managing skills with plugins` 的段落）所描述的行为，才在这里当作 Antigravity CLI 的机制；2.0 与 IDE 区块仅作对照，并在正文里逐处标注其形态，避免把 2.0 的路径或斜杠命令行为误记成 CLI 的行为 [@ref-agy-skills-doc-cli-locations][@ref-agy-skills-doc-20-locations]。

## Skill 的目录结构与 SKILL.md 格式 {#skills-format}

一个 Skill 是「目录包」而不是单文件：目录内必须有一个 `SKILL.md`，其余是可选的资源子目录（官方给出的示例包含 `scripts/`、`examples/`、`resources/`）[@ref-agy-skills-doc-anatomy]。Skill 是一个开放标准，`SKILL.md` 里的指令就是 agent 在特定任务上要遵循的协议 [@ref-agy-skills-doc-what]。

目录形状（占位符 `{...}` 为普通文本，不是标签）：

```
{skill-folder}/
  SKILL.md
  scripts/
  examples/
  resources/
```

`SKILL.md` 以 YAML frontmatter 开头，frontmatter 之后是正文（markdown 指令）。官方示例：

```
---
name: code-review
description: Reviews code changes for bugs, style issues, and best practices. Use when reviewing pull requests or checking code quality.
---

When reviewing code, follow these steps: ...
```

[@ref-agy-skills-doc-manifest]

Frontmatter 字段（官方表格逐字给出）[@ref-agy-skills-doc-frontmatter]：

| 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `name` | 否 | skill 的唯一标识（小写、用连字符代替空格）；未提供时默认取目录名。 |
| `description` | 是 | 描述 skill 做什么、何时使用；这是 agent 决定是否采用该 skill 时看到的内容。 |

文档建议 `description` 用第三人称并写出能让 agent 识别相关性的关键词；正文其余部分（instructions/best practices）按普通 markdown 解析，官方只给出「frontmatter 之后即正文」这一条规则，未描述正文长度上限（workflows 迁移页反而特别指出 skill 包的体积限制已从旧 workflows 的 12,000 字符限制中解放，见迁移小节）[@ref-agy-skills-doc-frontmatter]。

## CLI 查找 Skill 的位置 {#skills-roots}

CLI 区块给出的查找位置表如下（占位符为普通文本）[@ref-agy-skills-doc-cli-locations]：

| 位置 | 作用域 |
| :-- | :-- |
| 工作区根目录/.agents/skills/{skill-folder}/ | 工作区级 |
| ~/.gemini/antigravity-cli/skills/{skill-folder}/ | 全局（所有工作区） |
| ~/.gemini/antigravity-cli/plugins/{name}/skills/ | 插件自带 skill |

其中「工作区根目录」由当前工作目录/仓库根决定（文档用 `workspace-root` 指代）；全局路径锚定在用户 home 下的 `~/.gemini/antigravity-cli/`。Gemini CLI 迁移页给出的对应关系与此一致：全局共享路径由 `~/.gemini/skills/` 变为 `~/.gemini/antigravity-cli/skills/`，工作区路径由 `.gemini/skills/` 变为 `.agents/skills/` [@ref-agy-skills-migration-paths]。另外，skill 页注明 Antigravity 默认使用 `.agents/skills`，但仍保留对 `.agent/skills` 的向后兼容 [@ref-agy-skills-doc-note-default]。

**并列但相互冲突的说法**（不择一，需运行观察才能判定 CLI 实际生效的根目录）：

1. **全局 skills 路径**：CLI 页与 Gemini CLI 迁移页都写 `~/.gemini/antigravity-cli/skills/` [@ref-agy-skills-doc-cli-locations][@ref-agy-skills-migration-paths]；但 workflows 迁移页在「全局路径」一栏及 FAQ 中把全局 skill 写成 `~/.gemini/config/skills/{name}/SKILL.md`，与 Antigravity 2.0 的全局表（`~/.gemini/config/skills/{skill-folder}/`）完全相同 [@ref-agy-skills-wf-compare][@ref-agy-skills-wf-faq-global][@ref-agy-skills-doc-20-locations]。后者很可能是把 2.0 的通用说法写进了面向「Antigravity」的迁移页，无法从文档判断它是否也适用于 CLI。
2. **插件 skill 的根目录**：skill 页把插件 skill 定位在 `~/.gemini/antigravity-cli/plugins/{name}/skills/` [@ref-agy-skills-doc-cli-locations]；plugins 页则给出两套并存的说法——插件本身的目录结构是 `plugins/{plugin-name}/skills/{skill-name}/SKILL.md` [@ref-agy-skills-plugins-structure]，安装后 CLI 把插件资产暂存到 `~/.gemini/antigravity-cli/plugins/{plugin_name}/` [@ref-agy-skills-plugins-fsloc]，但同一页的「Manual plugin installation」又让用户把插件放进工作区 `.agents/plugins/` 或全局 `~/.gemini/config/plugins/` [@ref-agy-skills-plugins-manual]。前两者与 skill 页一致；第三处出自同一页未标注形态的「Manual plugin installation」小节，与 CLI 暂存目录不同根。但仓库 CHANGELOG 又记录过 `plugin` 子命令被改为把下载的插件直接装进共享配置目录 `~/.gemini/config/`（而不是私有 app data 目录），以便被立即发现 [@ref-agy-skills-changelog-plugin-install-path]，因此这两套位置里哪些是 CLI 真正会读取的，仍待运行观察。

其余与路径有关的变量：登记文档中**没有任何**影响 skill 查找路径的环境变量（例如改写 home、改写配置目录的环境变量）被提及；路径如何随 home 与当前目录变化只能按上面的字面路径理解，这一点属于缺口。

当前目录如何影响工作区查找范围，CHANGELOG 给出了一条明确规则：会话在子目录里启动时，位于**父级** `.agents/` 目录的 `skills.json`、`rules.json` 等定制清单原本会被忽略，现在清单从当前工作目录到项目根之间的**每一个** `.agents/` 目录加载 [@ref-agy-skills-changelog-agents-parents]。这一定义了上表里「工作区根目录」在多级 `.agents/` 布局下的含义：查找与清单加载覆盖的是当前目录到项目根这条链，而不是只看仓库根那一层。它只约束清单文件（`skills.json` 一类）的加载，`skills/` 目录本身是否也按这条链查找，固定来源没有说明。

## 发现时机与扫描范围 {#skills-discovery}

**时机**：对话开始时 agent 已能看到可用 skill 的名单（名称与描述），因此发现至少发生在会话冷启动阶段；CHANGELOG 说明交互式启动改为**异步加载 skill**，不再在启动路径上同步阻塞于一次文件系统密集的发现遍历 [@ref-agy-skills-changelog-async]。会话切换或 `/add-dir` 时会**动态重发现**自定义 skill 与系统斜杠命令 [@ref-agy-skills-changelog-dynamic]。

**扫描深度**：CHANGELOG 明确，`skills.json`、`rules.json`、`agents.json`、`plugins.json` 里的目录条目**只加载该目录的直接子项**，其行为与 `.agents/skills/` 文件夹一致，不再递归加载其下所有内容；要加载嵌套项必须在条目里用 `include_only` 指名，例如 `{"path": "shared_skills", "include_only": ["category/my-skill"]}` [@ref-agy-skills-changelog-dirscan]。这同时说明 CLI 侧存在一个 `skills.json` 目录清单机制（详见「宿主专有字段与附加配置」小节）。

**插件目录**：CLI 会自动扫描已安装插件目录，使插件自带的 skill 可用于执行 [@ref-agy-skills-changelog-plugin-discovery]。

**回退发现**：Standalone 模式下即使标准配置目录缺失，也会走回退发现加载自定义/回退 skill，并做路径去重 [@ref-agy-skills-changelog-standalone]。

**缺口**：登记文档没有描述扫描是否跟随符号链接、是否有忽略规则（ignore/排除清单）、`SKILL.md` 以外的文件名是否参与识别、扫描的目录深度上限等；只能确认上述「目录条目只取直接子项」的深度规则。这些点状态为 partial，已检查的入口是 skills 页 CLI 区块、plugins 页与 CHANGELOG 相关条目。

## 同名冲突与优先级 {#skills-collision}

已知的三条规则：

1. **显式配置的路径优先**：CHANGELOG 修复了「显式配置的 skill 与 plugin 路径被邻近自动发现的定制项压过」的问题，现在在自己配置里指定的路径在同名冲突中胜出 [@ref-agy-skills-changelog-priority]。
2. **插件命名空间前缀**：CHANGELOG 修复了插件 skill 斜杠命令被双重前缀（形如 `/{plugin}:{plugin}:{skill}`）的问题——当 skill 的 frontmatter `name` 已包含插件前缀时不再重复加前缀；以及多个插件定义了同一短名 skill 时会互相遮蔽的问题 [@ref-agy-skills-changelog-plugin-prefix]。这说明插件 skill 在斜杠命令上带插件前缀命名空间，但确切去重/合并算法文档未展开。
3. **skill 优先于同名旧 workflow**：若 `.agents/skills/deploy/` 与 `.agents/workflows/deploy.md` 同名并存，Antigravity 执行 skill [@ref-agy-skills-wf-faq-collision]。

**缺口**：用户级（全局）与工作区级同名 skill 之间谁覆盖谁、内置 skill 与用户 skill 同名时如何取舍、多个插件同名短名的具体消解结果——登记文档都没有给出通用搜索顺序说明，状态 partial。要判定实际优先级只能运行 `/skills` 目录并观察同名项的分组与消解结果。

## 宿主专有字段与附加配置 {#skills-extensions}

除标准 frontmatter 的 `name`/`description` 外，登记来源还记录了下列 CLI 识别项：

| 项 | 位置 | 默认/类型 | 用途 | 解析规则 |
| :-- | :-- | :-- | :-- | :-- |
| `metadata.icon` | `SKILL.md` frontmatter | 未声明则不显示；emoji 文本 | 在 `/skills` 目录列表、详情头部、斜杠命令补全弹窗中展示图标 | 按多字节 Unicode 显示宽度计算以保持终端对齐 [@ref-agy-skills-changelog-icon] |
| `disable-slash-command` | `SKILL.md` frontmatter | 布尔，默认 false | 设为 `true` 时把该 skill 从 `/` 菜单与 `/{name}` 解析中隐藏，但仍可被发现、仍可由模型调用 | 为 `true` 才隐藏 [@ref-agy-skills-changelog-disable-slash] |
| `skills.json` 目录条目 | 配置目录中的 `skills.json`（`rules.json`/`agents.json`/`plugins.json` 同构） | 每条含 `path`，可选 `include_only` 列表 | 声明 skill 目录来源并控制加载哪些子项 | 条目只加载目录直接子项；嵌套项须在 `include_only` 中指名，例如 `{"path": "shared_skills", "include_only": ["category/my-skill"]}` [@ref-agy-skills-changelog-dirscan] |

标准字段 `name` 在未提供时回退为目录名、`description` 必填 [@ref-agy-skills-doc-frontmatter]。

**缺口**：登记文档未列举 `allowed-tools`、`model`、依赖声明等其它可能的专有 frontmatter 字段，也未说明 `skills.json` 的完整 schema（作用域、与 `.agents/skills/` 的合并顺序、`include_only` 的路径基准）。这些状态 partial。

## 加载：名称、描述与正文何时进入上下文 {#skills-loading}

Skill 采用**渐进披露**模式，分三步 [@ref-agy-skills-doc-progressive]：

1. **发现（Discovery）**：对话开始时，agent 看到的是可用 skill 的名称与描述列表。
2. **激活（Activation）**：若某 skill 看起来与任务相关，agent 读取完整的 `SKILL.md` 正文。
3. **执行（Execution）**：agent 按 skill 的指令完成任务。

也就是说，**只有名称与描述在会话开始就进入上下文**，正文与资源在激活时才被读取；用户无需显式要求使用 skill，模型自行判断，也可以点名以确保被采用 [@ref-agy-skills-doc-progressive]。名称与描述列表在会话开始即可见这一点在 skill 页开篇重复出现 [@ref-agy-skills-doc-what]。启动期该发现过程被改为异步，以免阻塞交互式 bring-up [@ref-agy-skills-changelog-async]。

**缺口**：文档没有给出「激活后读取哪些资源文件、如何按需拉取 `scripts/`」的确切读取顺序或工具调用约定，只有「正文按需加载」这一层描述。

## 调用：自动、显式与斜杠命令 {#skills-invocation}

- **自动调用**：agent 根据 prompt 自动读取并遵循相关 skill；在 Antigravity 2.0 区块明确写成「autonomous invocation」 [@ref-agy-skills-doc-20-invoking]。CLI 的对应行为是斜杠命令转换之外的自主采用。
- **斜杠命令转换（CLI 专有）**：CLI 在交互式 TUI 中**自动把每个 skill 转成一条斜杠命令**——例如定义名为 `deploy-staging` 的 skill 后，输入框里立刻可用 `/deploy-staging` [@ref-agy-skills-doc-slash-conversion]。注意：2.0 区块描述的是「在提示面板里输入 `/{skill-name}` 显式调用」，两者措辞相近，但「自动把 skill 转成斜杠命令」这一机制明确写在 CLI 标签下 [@ref-agy-skills-doc-20-invoking][@ref-agy-skills-doc-slash-conversion]。
- **点名调用**：用户可以在 prompt 里提到 skill 名称来确保其被使用 [@ref-agy-skills-doc-20-invoking]。
- **无头（print）模式**：`-p` 运行现在会展开斜杠命令与 skill，例如 `-p "/my-skill review this diff"` 会解析并应用该 skill，而不是当作字面文本发送；`--disable-slash-commands` 可关闭这一展开 [@ref-agy-skills-changelog-print]。
- **从菜单隐去**：frontmatter 里 `disable-slash-command: true` 会把该 skill 从 `/` 菜单与 `/{name}` 解析中隐藏，但保留其可发现、可被模型调用 [@ref-agy-skills-changelog-disable-slash]。
- **菜单按当前 agent 的启用状态过滤**：`/` 菜单曾经会列出当前 agent 并未启用的内置 skill，选中后等于把该 agent 用不上的工具说明插入上下文；这一行为已修复，菜单现在只列出当前 agent 启用的内置 skill [@ref-agy-skills-changelog-menu-enabled]。
- **由会话生成 skill**：`/learn` 会把会话中的纠正与反馈蒸馏成项目 Rules（`.antigravity/rules.md`）或可复用的 Agent Skill（`SKILL.md`） [@ref-agy-skills-slash-learn]。
- **跨形态差异**：斜杠命令在 2.0 与 CLI 上输入方式一致（在输入框/提示框键入 `/`），CLI 侧的导航面板是 `/agents`、Alt+J、Ctrl+O [@ref-agy-skills-slash-cross-surface]。

**缺口**：文档未描述「禁用/依赖某 skill」的策略字段（如让某个 skill 依赖另一个）、也没有工具级别的调用（agent 通过工具而非斜杠命令触发 skill）的专门说明；可用性受插件启停影响的机制见「生效条件」小节。

## 生效条件：插件状态、信任与启动入口 {#skills-conditions}

- **插件提供的 skill 取决于插件状态**：插件的 `skills/` 子目录是可选组件，其中的子目录各含一个 `SKILL.md` [@ref-agy-skills-plugins-components]；CLI 会自动扫描已安装插件目录使这些 skill 可用 [@ref-agy-skills-changelog-plugin-discovery]。插件可通过 `/plugin`（或别名 `/plugins`）的 Plugins Manager 或内联子命令启用/禁用/安装 [@ref-agy-skills-slash-plugin]；shell 侧还可用 `agy plugin list` 查看各插件加载的组件、用 `agy plugin install {path}` 暂存本地包、用 `agy plugin enable`/`agy plugin disable` 启停而不删除文件 [@ref-agy-skills-plugins-agy-cmds]，skill 页也把「把 skill 打包进插件并用 `agy plugin list`、`agy plugin install {path}` 管理」列为 CLI 的做法 [@ref-agy-skills-doc-plugin-manage]。因此插件被禁用时其 skill 也应随之不可用（文档未逐字给出这一因果的显式句，属合理推断）。
- **内置 skill 随 CLI 发布**：CLI 自带 skill，且带 `builtin` 标志 [@ref-agy-skills-changelog-builtin]；把 agent 的 `inherit_user` 设为 `false` 只表示不采用个人定制，**不会**移除随 CLI 发布的内置 skill/rules/plugins [@ref-agy-skills-changelog-inherit-user]。
- **agent 的继承开关**：markdown 定义的 agent 用单一 `inheritCustomizations` 开关决定是否采纳你的 skills、rules、plugins、subagents 与 MCP servers，取代了此前互相不一致的逐类默认值 [@ref-agy-skills-changelog-inherit]。
- **启动入口**：Standalone 模式下即使标准配置目录缺失也会走回退发现 [@ref-agy-skills-changelog-standalone]。
- **缺口**：信任模型（是否对某工作区的 skill 请求确认）、沙箱是否限制 skill 中的脚本执行、功能开关等对 skill 行为的改变，登记文档没有描述，状态 partial。

## 诊断与重载 {#skills-diagnostics}

- **查看发现与分组**：`/skills` 面板会分组展示 skill，且 CLI 自带 skill 的 `builtin` 标志在 `--output-format json` 下准确输出 [@ref-agy-skills-changelog-builtin]。
- **重载**：`/skills reload` 子命令可**异步重载**已发现的 skill 与斜杠命令，无需重启会话、也不阻塞输入 [@ref-agy-skills-changelog-reload]。
- **动态重发现**：切换会话或 `/add-dir` 时自定义 skill 与系统斜杠命令会被即时重新发现并出现在补全中 [@ref-agy-skills-changelog-dynamic]。
- **回退与去重**：Standalone 模式下的回退发现会自动去重，避免重复项 [@ref-agy-skills-changelog-standalone]。

**缺口**：文档未给出「某条 `SKILL.md` 解析失败时如何报错/如何在面板里标红」的专门诊断路径；`/skills` 的确切列字段与 `--output-format json` 的完整载荷结构也未在登记来源中逐字列出。

## 迁移：从 Workflows 与 Gemini CLI {#skills-migration}

- **Workflows 到 Skills**：旧 workflows 已弃用，将于 2026-11-01 退役；对比表显示 workspace 路径由 `.agents/workflows/{name}.md` 变为 `.agents/skills/{name}/SKILL.md`，全局路径由 `~/.gemini/config/workflows/{name}.md` 变为 `~/.gemini/config/skills/{name}/SKILL.md`（注意：这一全局路径属于通用/2.0 说法，与 CLI 全局路径的冲突见「位置」小节），加载方式由整文件进 prompt 变为渐进披露 [@ref-agy-skills-wf-compare]。`/migrate-workflows` 会扫描全局与工作区 workflow 目录、解析 frontmatter 与正文、脚手架生成 `.agents/skills/{workflow-name}/SKILL.md`，并把原文件改名加 `.bak` [@ref-agy-skills-wf-migrate]。迁移后的 skill 可继续用 `/{name}` 调用 [@ref-agy-skills-wf-faq-invoke]。
- **Gemini CLI 到 Antigravity CLI**：`agy plugin import gemini` 会检索旧本地目录、解析扩展清单并把文件转成原生布局；导入输出里可见 commands 被转成 skills、skills 被处理 [@ref-agy-skills-migration-ext]。路径变更与「必须手动把 `.gemini/skills/` 改名/迁移到 `.agents/skills/` 才能被识别为活动斜杠命令」的强制动作见 [@ref-agy-skills-migration-paths]。
