---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-native_plugins-v4
harness_id: mistral-vibe
topic: native_plugins
title: "Mistral Vibe CLI 的原生插件：Agent Plugins 1.0 目录包、组件与命名空间"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-mv-301-plugin-structure, ref-mv-301-plugin-extension-doc, ref-mv-301-plugin-limits, ref-mv-315-changelog-remote-plugins, ref-mv-315-plugin-remote-resolve, ref-mv-315-plugin-remote-dir]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-mv-301-plugin-extension, ref-mv-301-plugin-extension-doc, ref-mv-301-plugin-structure, ref-mv-315-plugin-extension-fields, ref-mv-315-plugin-enablement]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-mv-301-plugin-locations, ref-mv-301-plugin-resolver, ref-mv-315-changelog-remote-plugins, ref-mv-315-plugin-remote-resolve, ref-mv-315-plugin-remote-dir]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-mv-301-plugin-resolver, ref-mv-301-plugin-limits, ref-mv-315-plugin-precedence, ref-mv-315-plugin-library-name]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-mv-301-plugin-reserved, ref-mv-301-plugin-extension, ref-mv-301-plugin-extension-doc, ref-mv-315-plugin-extension-fields]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-mv-301-plugin-resolver, ref-mv-301-plugin-diagnostics, ref-mv-301-plugin-limits, ref-mv-315-plugin-library-name]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-mv-301-plugin-structure, ref-mv-301-plugin-limits, ref-mv-315-changelog-remote-plugins, ref-mv-315-plugin-remote-dir]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-mv-301-plugin-extension, ref-mv-301-plugin-structure, ref-mv-315-plugin-extension-fields, ref-mv-315-plugin-enablement]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: partial
        source_refs: [ref-mv-301-plugin-locations, ref-mv-301-plugin-resolver, ref-mv-315-changelog-remote-plugins, ref-mv-315-plugin-remote-resolve, ref-mv-315-plugin-remote-dir]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-mv-301-plugin-resolver, ref-mv-301-plugin-limits, ref-mv-315-plugin-precedence, ref-mv-315-plugin-library-name]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-mv-301-plugin-reserved, ref-mv-301-plugin-extension, ref-mv-315-plugin-extension-fields]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-mv-301-plugin-resolver, ref-mv-301-plugin-diagnostics, ref-mv-315-plugin-library-name]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-mv-301-plugin-diagnostics, ref-mv-301-plugin-limits, ref-mv-315-plugin-library-name]
---

固定来源是官方仓库提交 `fb7511a791f80516a57b06525707215b6a00ebd1`（变更日志 3.1.5）与它之前的 `dd2c04ce717c417731ab89c333cd0a72541e33ba`（3.0.1）：插件包格式与保留命名空间沿用 3.0.1 的固定快照，3.1.5 新增的远端插件库与扩展字段按新提交复核。界面为 `cli`。插件是一个目录包，声明式组件由宿主装配；插件代码不会被导入宿主进程。

## 什么算原生插件 {#plugins-model}

原生插件是一个目录，根上有 Agent Plugins 1.0 的 `plugin.json`，另有可选组件：`mcp.json`、`libraries.json`、`connectors.json`、`skills/`，以及 Vibe 专有扩展目录 `ai.mistral.vibe/`（其中可有 `hooks.toml`、`knowledge/`、`agents/`、`INSTRUCTIONS.md`）。[@ref-mv-301-plugin-structure]

它与 Skill / MCP server / hook 的关系是"包与组件"：插件里的 skill 变成普通 skill（运行时名字带命名空间前缀），插件里的 MCP server 变成普通 MCP 来源，插件里的 hook 变成运行时 hook。

3.1.5 起多了一个来源：开启 `experimental_enable_remote_plugins` 后，插件库里启用的插件被下载到 `$VIBE_HOME/remote-plugins`（默认 `~/.vibe/remote-plugins`）并以独立作用域加载。同步下来的包与本地插件同格式，但**只读**：磁盘上的副本被改动后会被重新下载覆盖。插件库列出的名字归插件库所有（开或关都算），同名的本地插件不会被加载并会被告知改名。[@ref-mv-315-changelog-remote-plugins][@ref-mv-315-plugin-remote-resolve][@ref-mv-315-plugin-remote-dir]

与普通包的区别：没有 Python entry point，插件代码不被导入宿主；插件声明的 libraries 只是给会话子进程用的路径别名（Node/Python），随子进程环境提供，供 MCP server 等外部进程使用。每个组件的规模都有上限：hooks 文件 64 KiB、最多 128 条；knowledge 目录最多 100 个、入口文件 256 KiB；agents 最多 128 个、每个 64 KiB；组件路径最长 1024 字符。[@ref-mv-301-plugin-limits]

## 包格式与扩展块 {#plugins-package}

目录布局是固定的：`plugin.json` 必需；`mcp.json`、`libraries.json`、`connectors.json`、`skills/` 可选；Vibe 专有组件必须放在 `ai.mistral.vibe/` 下。[@ref-mv-301-plugin-structure]

扩展块 `extensions["ai.mistral.vibe"]` 是严格模型，`schemaVersion` 必须为 1，接受这些字段：[@ref-mv-301-plugin-extension][@ref-mv-315-plugin-extension-fields]

| 字段 | 说明 |
| :-- | :-- |
| `schemaVersion` | 必须为 1 |
| `displayName` | 可选标题，1 到 100 字符；插件身份仍是 `name` |
| `starterPrompt` | 可选的开场提示；`prompt` 按 locale 给出且必须含 `en`，`submit` 表示是否立即发送。Vibe Work 与 Vibe Desktop 的插件列表使用它 |
| `toolNamespace` | 工具命名空间，必须是 TypeScript 标识符；缺省由插件名派生 |
| `toolOverrides` | 按发现的工具名重命名或限制暴露，`exposure` 取 `programmatic`、`direct` 或 `direct_and_programmatic` |
| `volumes` | 可选卷声明（`name` + `mode = "ro"` 或 `"rw"`）；只被支持共享卷的宿主挂载，其他宿主接受但不使用 |
| `defaultEnabled` | 默认是否启用；缺省为真。只对项目级/用户级本地插件生效：设为假时插件保持已安装但不参与会话，直到列进 `enabled_plugins`；`disabled_plugins` 仍优先于它（列进即关闭）。远端库插件不受它控制——库端开关决定同步哪些插件，`disabled_plugins` 也不能关掉远端插件。[@ref-mv-315-plugin-enablement] |

**没有这个扩展块时，只加载 `plugin.json`、`skills/` 与 `mcp.json`**；hooks、knowledge、agents、libraries、connectors 必须先声明扩展。[@ref-mv-301-plugin-extension-doc]

## 安装与作用域 {#plugins-install}

"安装"就是把插件目录放到约定位置：项目级放 `PROJECT/.vibe/plugins/名字/`（仅受信任目录），用户级放 `$VIBE_HOME/plugins/名字/`（总是生效）。插件根下每个子目录就是一个包，同名时项目优先。[@ref-mv-301-plugin-locations] 3.1.5 起还有第四个来源：`experimental_enable_remote_plugins` 开启时，插件库中启用的插件被同步到 `$VIBE_HOME/remote-plugins`（默认 `~/.vibe/remote-plugins`），以独立的 REMOTE 作用域加载；同步副本只读，磁盘改动会被下一次同步覆盖。[@ref-mv-315-changelog-remote-plugins][@ref-mv-315-plugin-remote-resolve][@ref-mv-315-plugin-remote-dir]

同名优先级不是文件系统顺序，而是解析器显式的选择顺序：项目 → 用户 → 内置；远端库插件不参与这条链，它与本地插件互斥（库名归库，内置名归内置）。[@ref-mv-301-plugin-resolver][@ref-mv-315-plugin-precedence]

本地没有包管理器子命令来安装、升级或固定插件版本；来源里可观察到的只有目录发现、目录删除与库同步。这是 `plugins.install` 记为 `partial` 的原因：**缺口**是版本固定、更新检查与卸载入口都没有第一方文档或代码依据。这也是为什么插件分发在 Vibe 里通常靠"把目录放进仓库或 home"。[@ref-mv-315-changelog-remote-plugins]

## 发现、优先级与冲突 {#plugins-discovery}

解析器按作用域加载后做选择：项目 → 用户 → 内置，先到先得；远端库插件单独加载，且先被两道名字规则过滤——与内置插件同名的远端插件不加载并报问题，与插件库列出的名字同名的本地插件不加载并报 `plugin.name.library_owned`。随后移除命名空间冲突（两个插件声明同一命名空间时该命名空间不可用，并记一条致命诊断），再按名字排序输出稳定的插件集合。[@ref-mv-301-plugin-resolver][@ref-mv-315-plugin-precedence][@ref-mv-315-plugin-library-name]

同一份解析结果还产出四类汇总：skill 表、MCP server 表（被配置里同名 server 遮蔽的插件 MCP 会被移除）、运行时 hook 列表、以及插件 agent 列表。组件名与路径有约束：组件名必须是小写字母/数字/连字符，路径必须是规范化的 POSIX 相对路径且不得越出插件根。[@ref-mv-301-plugin-limits]

## 插件能注册什么，边界在哪 {#plugins-api}

插件可以提供的组件是：skills、MCP servers、hooks、knowledge、agents、libraries、connectors，以及由 MCP/connector 暴露出来的工具。命名空间是核心边界：

- `toolNamespace` 不得使用保留命名空间。代码里的保留集合有九个：`agent`、`agents`、`collaboration`、`file_system`、`process`、`self`、`skill`、`subagent`、`vibe`；其中 `vibe` 只留给随 CLI 分发的内置插件，在判断用户插件时会被单独豁免给内置用途。[@ref-mv-301-plugin-reserved]
- 扩展块的字段本身也是边界：`extra="forbid"` 加 strict，未知键直接拒绝，因此写错字段名不会静默生效；当前字段集见包格式小节的表（`schemaVersion`、`displayName`、`starterPrompt`、`toolNamespace`、`toolOverrides`、`volumes`、`defaultEnabled`）。[@ref-mv-301-plugin-extension][@ref-mv-315-plugin-extension-fields]

来源冲突需要点明：同一提交里，第一方作者指南仍把保留命名空间写成六个（`file_system`、`self`、`process`、`skill`、`subagent`、`vibe`），没有列出 `agent`、`agents`、`collaboration`。[@ref-mv-301-plugin-extension-doc] 代码是执行处（声明命中保留集合即报错），因此以代码的九个为准；指南文本落后于实现。这个差异只影响"哪些命名空间会立刻失败"，不影响组件装配机制。

## 生命周期状态与诊断 {#plugins-lifecycle}

可区分四个阶段：**已安装**（目录存在）→ **被发现**（解析器读到清单）→ **被选中**（通过了项目/用户/内置优先级与命名空间冲突过滤）→ **组件生效**（skill/MCP/hook/agent 进入会话能力集合）。任一阶段失败都会落到解析结果的问题列表，而不是让整个会话失败。[@ref-mv-301-plugin-resolver]

诊断码里与本主题直接相关的两条是致命的：`plugin.namespace.reserved`（命名空间被保留）与 `plugin.namespace.collision`（两个插件抢同一命名空间）；收到其中的任一条时，先改 `toolNamespace` 或移除冲突插件，再排查组件级问题。[@ref-mv-301-plugin-diagnostics] 第三类是 `plugin.name.library_owned`：本地插件与插件库中的名字相同，因此没有被加载，改名后才能在本机使用。[@ref-mv-315-plugin-library-name]

组件级问题通常表现为"插件在列表里但某个组件不生效"，按上限表核对最有效：hooks 超过 128 条或文件超过 64 KiB、knowledge 目录超过 100 个、agent 超过 128 个或单个超过 64 KiB、组件路径超过 1024 字符，都会被拒绝或忽略。[@ref-mv-301-plugin-limits] 改完插件后需要新会话，插件集合在会话建立时解析并固定。
