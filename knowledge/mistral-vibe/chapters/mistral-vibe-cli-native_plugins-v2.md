---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-native_plugins-v2
harness_id: mistral-vibe
topic: native_plugins
title: "Mistral Vibe CLI 的原生插件：Agent Plugins 1.0 目录包与 Unified Harness 条件"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-mv-plugin-format-markers, ref-mv-plugin-format-detect, ref-mv-plugin-resolved-set, ref-mv-plugin-no-entrypoint, ref-mv-plugin-materialize-env]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-mv-plugin-manifest, ref-mv-plugin-doc-manifest, ref-mv-plugin-doc-structure, ref-mv-plugin-doc-extension, ref-mv-plugins-reserved-namespaces-2-26-0, ref-mv-builtin-plugin-manifest]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-mv-plugin-doc-locations, ref-mv-cli-plugin-commands, ref-mv-plugin-bind, ref-mv-plugin-catalog-entry, ref-mv-plugin-doc-workflow]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-mv-plugin-resolve, ref-mv-plugin-format-markers, ref-mv-plugin-collisions, ref-mv-plugin-doc-compat, ref-mv-plugin-limits, ref-mv-plugins-builtin-roots, ref-mv-plugin-reserved-namespaces, ref-mv-plugins-reserved-namespaces-2-26-0, ref-mv-changelog-2-26-0]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-mv-plugin-resolved-set, ref-mv-plugin-doc-extension, ref-mv-plugin-doc-structure, ref-mv-plugin-materialize-env]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-mv-cli-plugin-commands, ref-mv-plugin-doc-diagnostics, ref-mv-plugin-catalog-entry, ref-mv-plugin-host-only, ref-mv-plugin-bind]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-mv-plugin-format-markers, ref-mv-plugin-resolved-set, ref-mv-plugin-no-entrypoint]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-mv-plugin-manifest, ref-mv-plugin-doc-structure, ref-mv-plugin-doc-extension]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: partial
        source_refs: [ref-mv-plugin-doc-locations, ref-mv-cli-plugin-commands, ref-mv-plugin-catalog-entry]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-mv-plugin-resolve, ref-mv-plugin-collisions, ref-mv-plugin-doc-compat, ref-mv-plugins-builtin-roots, ref-mv-plugins-reserved-namespaces-2-26-0]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-mv-plugin-resolved-set, ref-mv-plugin-doc-extension, ref-mv-plugin-materialize-env]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-mv-plugin-bind, ref-mv-plugin-catalog-entry, ref-mv-plugin-host-only]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-mv-plugin-doc-diagnostics, ref-mv-cli-plugin-commands, ref-mv-plugin-catalog-entry]
---

固定来源是官方仓库提交 `7cb91894c40bb25173abcfa36e5ea2b4b81eb28c`（仓库内自带一份第一方插件作者指南）；该提交在变更日志里对应版本 2.26.0，这是源码树版本身份，不代表任何已发布的分发包。[@ref-mv-changelog-2-26-0] **先说要害**：Vibe 有原生插件系统，但"安装"的含义是"把插件目录放到磁盘上的约定位置"，而不是跑某个包管理器或 CLI 子命令；而且插件解析只在 Unified Harness 后端生效，旧后端根本不解析插件。这条前提决定了本章所有"不可用"结论的边界。本提交起 Unified Harness 已是默认运行时（见配置主题 `config.runtime`），旧后端要显式用 `--legacy-harness` 选。

## 什么算原生插件 {#plugins-model}

原生插件是一个目录，目录里的 `plugin.json` 带有**精确**的 Agent Plugins 1.0 schema 标识 `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`；schema 前缀对但版本不对会被判为"不支持的 schema"并作为致命错误丢弃该插件。[@ref-mv-plugin-format-markers] 格式枚举里除了原生，还有四个外来格式（Codex、Claude Code、Kimi Code、OpenCode）与 `unknown`、`ambiguous` 两种异常态。[@ref-mv-plugin-format-detect]

一个插件声明的是**声明式组件集合**：skills、MCP server、hooks、knowledge、agents、libraries、connectors，以及由 MCP/connector 来源暴露出来的工具。[@ref-mv-plugin-resolved-set] 它和 Skill / MCP server / hook 脚本的关系是"包与组件"：插件里的 skill 会变成普通的 skill（运行时名字按插件命名空间加前缀），插件里的 hook 会变成运行时 hook，插件里的 MCP server 会变成普通的 MCP 来源。

它和"普通包"有本质区别：插件代码**不会被导入 Vibe 的 Python 进程**。项目里声明为可执行入口的只有 `vibe`、`vibe-acp`、`vibe-app-server` 三个脚本，插件没有 Python entry point，清单里也没有 `activate()` 之类的入口字段。[@ref-mv-plugin-no-entrypoint] 插件能声明的"库"只是文件系统路径别名（node/python），会被前置到会话子进程的 `PYTHONPATH` / `NODE_PATH` 上供 MCP server 等外部进程使用，而不是被宿主导入。[@ref-mv-plugin-materialize-env]

## 包格式、清单与组件布局 {#plugins-package}

`plugin.json` 是严格清单：未知字段直接拒绝，`$schema` 必须是上面那串字面量，`name` 必须满足 `^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$`（1–64 字符），版本、描述、作者、主页、仓库、许可证、关键词都是可选字段。[@ref-mv-plugin-manifest] 仓库自带的清单模型与第一方作者指南对字段的说明一致，指南另外写明"名字不得含 `--` 或 `..`"。[@ref-mv-plugin-doc-manifest]

目录布局（第一方指南的原文结构）：[@ref-mv-plugin-doc-structure]

```
my-plugin/
  plugin.json                 # 必需：Agent Plugins 1.0 清单
  mcp.json                    # 可选：MCP server 定义
  libraries.json              # 可选：Node/Python 库依赖
  connectors.json             # 可选：托管 connector 需求
  skills/                     # 可选：每个子目录一个 skill，内含 SKILL.md
  ai.mistral.vibe/            # 可选：Vibe 专有扩展
    hooks.toml
    knowledge/topic-name/KNOWLEDGE.md
    agents/researcher.toml
    INSTRUCTIONS.md           # 可选，插件级说明（不加载）
```

关键约束：**不加 `extensions["ai.mistral.vibe"]` 时，Vibe 只加载 `plugin.json`、`skills/` 与 `mcp.json`**；hooks、knowledge、agents、libraries、connectors 必须先声明这个扩展。扩展块里 `schemaVersion` 必须为 1，`toolNamespace` 默认由插件名派生的 TypeScript 标识符，且不得使用保留命名空间。[@ref-mv-plugin-doc-extension] 保留命名空间集合是 `file_system`、`self`、`process`、`skill`、`subagent`、`vibe`，其中 `vibe` 只留给随 CLI 分发的内置插件。[@ref-mv-plugins-reserved-namespaces-2-26-0]

扩展块的最小形态（来自第一方作者指南）：[@ref-mv-plugin-doc-extension]

```json
{
  "extensions": {
    "ai.mistral.vibe": {
      "schemaVersion": 1,
      "toolNamespace": "myPlugin",
      "toolOverrides": {
        "lookup": { "name": "search", "exposure": "direct_and_programmatic" }
      }
    }
  }
}
```

内置的第一方插件就是最好的样例：它的清单只有 `$schema`、`name: "vibe"`、`version`、`description`、`author` 与一个 `ai.mistral.vibe` 扩展（`toolNamespace: "vibe"`），组件只有 skills。[@ref-mv-builtin-plugin-manifest]

## 安装、版本与更新 {#plugins-install}

"安装"= 放置目录，位置只有两处：

| 作用域 | 路径 | 条件 |
| :-- | :-- | :-- |
| 项目 | 项目根 `.vibe/plugins/插件名/` | 工作目录受信任 |
| 用户全局 | `$VIBE_HOME/plugins/插件名/` | 总是 |

第一方指南用一张表给出这两个位置与"每个子目录就是一个插件包"。[@ref-mv-plugin-doc-locations]

固定来源里**没有**安装/卸载/启用/禁用命令。CLI 的子命令解析里只有 `mcp add` / `mcp remove`；会话内的插件相关命令只有 `/plugins`（查看本会话正在跑的插件）与 `/reload-plugins`（重新钉住并报告变化），两者都以 `experimental_harness` 为可用条件。[@ref-mv-cli-plugin-commands] 这是本主题的一个显式缺口：插件的"安装/更新/卸载"没有第一方命令入口，只能靠文件系统操作加 `/reload-plugins`。

版本固定发生在**会话级**而不是安装级：每个会话把解析结果投影成一份不含宿主路径与密钥的便携快照，Runtime 会为它重建只读检出，因此插件会话可以比"插件被升级或卸载"活得更久。[@ref-mv-plugin-bind] 目录条目的身份字段包括名字、版本、来源格式、清单摘要、内容 sha256，以及 `installed_root`（当前安装路径）与 `pinned_root`（本会话钉住时的路径）。[@ref-mv-plugin-catalog-entry] 因此"更新"就是替换目录后 `/reload-plugins`，"卸载"就是删除目录、当前会话继续跑它钉住的副本。指南末尾给作者的工作流也是"建目录 → 写清单 → 加组件 → 让用户用 `/reload` 重新加载"。[@ref-mv-plugin-doc-workflow]

## 发现、解析与冲突 {#plugins-discovery}

解析顺序是"先算三个作用域的插件集合，再按优先级挑选"：项目 → 用户 → 内置；同一名字命中多个作用域时取第一个。[@ref-mv-plugin-resolve] 每个插件还会走格式检测与清单解析，致命错误丢弃整个插件，非致命错误只丢弃对应组件并记录诊断。[@ref-mv-plugin-format-markers] 同一个作用域内出现两个同名插件时，**两者都被丢弃**并各记一条 `Duplicate plugin name ... at the same precedence`。[@ref-mv-plugin-collisions] 命名空间冲突同样会丢弃所有相关插件。

内置作用域本身变宽了。"内置"根不再只来自打包位置：`packaged_builtin_plugin_roots()` 返回 `vibe.plugins.builtins` 包所在目录（导入失败则返回空列表），而 `HarnessProcess` 把内置根算成 `[*packaged_builtin_plugin_roots(), *additional_builtin_plugin_roots]`——后者由宿主应用传入，于是嵌入方自带的内置插件目录与包内内置插件一起参与发现。[@ref-mv-plugins-builtin-roots] 边界：这是 app-server 侧传入的根，取决于宿主是否提供，不改变"内置"作用域的优先级位置。

保留命名空间集合也变了：`_RESERVED_NAMESPACES` 从 `{"file_system", "self", "process", "agent", "vibe"}`[@ref-mv-plugin-reserved-namespaces] 改成 `{"file_system", "self", "process", "skill", "subagent", "vibe"}`[@ref-mv-plugins-reserved-namespaces-2-26-0]，即 `agent` 不再保留、`skill` 与 `subagent` 转为保留。这直接影响命名冲突判定：名字取 `skill` 或 `subagent` 的插件现在会被拒，而取 `agent` 的不再因保留名被拒。

外来格式的适配边界要记住：Claude Code（`.claude-plugin/plugin.json`）、Codex（`.codex-plugin/plugin.json`）、Kimi Code 标记文件、OpenCode（`.opencode/` 目录）都能被识别；多个格式标记同时出现会被判为 `ambiguous` 拒绝；原生格式始终优先。适配结果只保留 skills 与 MCP server，hooks、knowledge、agents、libraries、connectors 属于原生专有，OpenCode 的可执行模块明确拒绝导入。[@ref-mv-plugin-doc-compat]

各类组件的数量/体积上限（来自实现常量）：hooks 最多 128 条、单文件 64 KB；knowledge 目录最多 100 个、入口文件 256 KB；agent 最多 128 个、单文件 64 KB；组件路径长度上限 1024。[@ref-mv-plugin-limits]

## 插件能注册什么，边界在哪 {#plugins-api}

可注册的扩展点是声明式的六类：skills、MCP server、hooks、knowledge、agents（仅 subagent）、libraries（node/python 路径别名）与 connectors（托管连接器需求）。[@ref-mv-plugin-resolved-set]

宿主 API 的边界体现在三处：

1. **不导入代码**：没有 Python entry point，插件不能往宿主进程里塞可执行代码；OpenCode 的可执行插件会被明确拒绝；声明的 node/python 库只被前置到会话子进程的搜索路径，不进宿主解释器。[@ref-mv-plugin-materialize-env]
2. **变量与路径受控**：MCP 定义里可用 `${PLUGIN_ROOT}` / `${PLUGIN_DATA}`，这两个名字也被注入到子进程环境里并作为保留名禁止用户自行设置；组件路径必须以 `./` 开头且必须落在插件根内。[@ref-mv-plugin-doc-extension]
3. **工具暴露可控**：插件的 MCP/connector 工具通过 `toolOverrides` 改名或限制暴露面，`exposure` 取 `programmatic`、`direct` 或 `direct_and_programmatic`。[@ref-mv-plugin-doc-extension]

插件内的 agent 只能是 subagent（`agentType = "subagent"` 是唯一支持值），文件名必须是 kebab-case，运行时名字按"插件命名空间 + 冒号 + 文件名"命名空间化；插件内的 hook 运行目录是插件根，环境里带 `PLUGIN_ROOT`/`PLUGIN_DATA`，运行时名字以"插件名 + 冒号 + hook 名"为前缀。[@ref-mv-plugin-doc-structure]

## 生命周期状态与诊断 {#plugins-lifecycle}

可观察的状态是：**已安装**（磁盘上的目录）→ **已发现**（枚举到子目录）→ **已解析**（清单与组件通过校验）→ **已物化**（knowledge/libraries 落到插件数据目录、MCP/connector 接成工具组与路由）→ **已钉住**（会话快照）→ **已绑定**（Runtime 依据请求里给出的各个安装根建立只读检出并执行）。健康度是**按组件**的：致命诊断丢整包，非致命诊断只丢该组件；每条工具路由另有 `live`/`stale`/`unavailable` 的漂移状态。没有"启用/禁用"这一档。[@ref-mv-plugin-bind]

诊断从三处看：

1. **`/plugins`**：显示本会话正在跑的插件，包括版本、来源格式、组件与"自钉住后被卸载"的提示。[@ref-mv-cli-plugin-commands]
2. **诊断码**：一条插件问题带 `plugin.*` 形式的代码、文件与消息，致命与非致命由代码决定；第一方指南把常见代码列成一张表，并给出"fatal 丢整包、非 fatal 只丢组件"的规则。[@ref-mv-plugin-doc-diagnostics]
3. **目录条目**：`installed_root` 为空表示"自钉住后被卸载"，`drifted` 计数表示有多少路由与重新连接的来源不一致。[@ref-mv-plugin-catalog-entry]

最后再强调一遍前置条件：以上解析、物化、快照与绑定只在 Unified Harness 后端发生，旧后端从不解析插件；如果插件的 skill/MCP 看起来"没生效"，先确认会话是否跑在 Unified Harness 上，再检查目录作用域、命名空间保留字与清单 schema。[@ref-mv-plugin-host-only]
