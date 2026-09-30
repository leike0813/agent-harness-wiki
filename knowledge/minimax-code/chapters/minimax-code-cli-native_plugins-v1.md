---
schema_version: 3
record_kind: production
edition_id: minimax-code-cli-native_plugins-v1
harness_id: minimax-code
topic: native_plugins
title: "MiniMax Code CLI 原生插件：包格式、安装、发现、能力面与生命周期"
sections:
  - section_id: plugins-model-package
    surface_ids: [cli]
    source_refs: [ref-minimax-code-plugins-types, ref-minimax-code-plugins-manifest, ref-minimax-code-plugins-caps, ref-minimax-code-plugins-empty, ref-minimax-code-plugins-compat-reader, ref-minimax-code-plugins-hostbinding, ref-minimax-code-plugins-limits]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-minimax-code-plugins-cli-marketplace, ref-minimax-code-plugins-facade, ref-minimax-code-examples-plugins, ref-minimax-code-plugins-state, ref-minimax-code-doc-ref-plugin, ref-minimax-code-doc-plugins]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-minimax-code-plugins-local-scan, ref-minimax-code-plugins-detect, ref-minimax-code-plugins-watcher, ref-minimax-code-plugins-snapshot, ref-minimax-code-plugins-conflicts, ref-minimax-code-plugins-mcp-precedence, ref-minimax-code-plugins-reservation]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-minimax-code-plugins-types, ref-minimax-code-plugins-snapshot, ref-minimax-code-plugins-hostbinding, ref-minimax-code-plugins-caps, ref-minimax-code-tui-capabilities-plugins, ref-minimax-code-plugins-github]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-minimax-code-plugins-state, ref-minimax-code-plugins-snapshot, ref-minimax-code-plugins-facade, ref-minimax-code-tui-capabilities-plugins]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-minimax-code-plugins-cli-marketplace, ref-minimax-code-plugins-conflicts, ref-minimax-code-plugins-detect, ref-minimax-code-plugins-facade, ref-minimax-code-doc-faq-acp, ref-minimax-code-examples-plugins]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model-package
        status: answered
        source_refs: [ref-minimax-code-plugins-types, ref-minimax-code-plugins-manifest, ref-minimax-code-plugins-caps, ref-minimax-code-plugins-empty, ref-minimax-code-plugins-compat-reader, ref-minimax-code-plugins-hostbinding, ref-minimax-code-plugins-limits]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-model-package
        status: answered
        source_refs: [ref-minimax-code-plugins-types, ref-minimax-code-plugins-manifest, ref-minimax-code-plugins-caps, ref-minimax-code-plugins-empty, ref-minimax-code-plugins-compat-reader, ref-minimax-code-plugins-hostbinding, ref-minimax-code-plugins-limits]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-minimax-code-plugins-cli-marketplace, ref-minimax-code-plugins-facade, ref-minimax-code-examples-plugins, ref-minimax-code-plugins-state, ref-minimax-code-doc-ref-plugin, ref-minimax-code-doc-plugins]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-minimax-code-plugins-local-scan, ref-minimax-code-plugins-detect, ref-minimax-code-plugins-watcher, ref-minimax-code-plugins-snapshot, ref-minimax-code-plugins-conflicts, ref-minimax-code-plugins-mcp-precedence, ref-minimax-code-plugins-reservation]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-minimax-code-plugins-types, ref-minimax-code-plugins-snapshot, ref-minimax-code-plugins-hostbinding, ref-minimax-code-plugins-caps, ref-minimax-code-tui-capabilities-plugins, ref-minimax-code-plugins-github]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-minimax-code-plugins-state, ref-minimax-code-plugins-snapshot, ref-minimax-code-plugins-facade, ref-minimax-code-tui-capabilities-plugins]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: answered
        source_refs: [ref-minimax-code-plugins-cli-marketplace, ref-minimax-code-plugins-conflicts, ref-minimax-code-plugins-detect, ref-minimax-code-plugins-facade, ref-minimax-code-doc-faq-acp, ref-minimax-code-examples-plugins]
---

MiniMax Code CLI 的原生插件是一个带受识别清单的**包目录**：清单声明能力引用（Apps、MCP server、Skills、Hooks、Host Bindings、MiniApp），宿主解析、校验内容摘要并按快照启用 [@ref-minimax-code-plugins-types]。独立技能、独立 MCP server 与 Hook 脚本都不算插件，它们只是插件可以**承载**的能力，并且会先在插件快照之前预留名字，避免被插件静默覆盖 [@ref-minimax-code-plugins-snapshot]。本章固定来源是 `MiniMax-AI/MiniMax-Code` 仓库 commit `c8a39a5` 上的 `packages/local-runtime-v2/src/service/plugin-system`、`packages/tui/src/cli/plugin-command.ts` 与 `docs/examples.md`、`docs/tui-capabilities.md`，以及官方 CLI 文档 `configuration`、`features`、`reference`、`faq` 的快照。

## 什么算插件、包格式与清单 {#plugins-model-package}

- 包来源枚举为 `OFFICIAL`、`LOCAL_MINIMAX`、`LOCAL_AGENT_PLUGIN`、`LOCAL_CLAUDE`、`LOCAL_CODEX`；清单类型枚举为 `MINIMAX`、`AGENT_PLUGINS_V1`、`CLAUDE_CODE`、`CODEX` [@ref-minimax-code-plugins-types]。
- 第一方清单路径固定为 `.minimax-plugin/plugin.json`，字段集合为 `$schema`、`schemaVersion`、`name`、`displayName`、`version`、`description`、`author`、`icon`、`darkIcon`、`category`、`exampleQueries`、`apps`、`mcpServers`、`skills`、`hooks`、`hostBindings` [@ref-minimax-code-plugins-manifest]。
- 信封校验：出现未知字段或 `schemaVersion` 不等于 1 即整包失败；`name` 上限 80 字符，`version` 必须是 semver，`description` 与 `author` 必填 [@ref-minimax-code-plugins-manifest]。
- 能力引用是**声明式路径**而不是可执行代码：`apps` 指向 `*.app.json`，`mcpServers` 指向 `*.mcp.json`，`skills` 指向 `skills/<名称>/SKILL.md`，`hooks` 指向 `*.json`，`hostBindings` 指向 `bindings/*.binding.json` [@ref-minimax-code-plugins-caps]。
- 插件必须声明至少一项可执行能力；空包被拒绝（错误文案：MiniMax Plugin has no executable capability） [@ref-minimax-code-plugins-empty]。
- 兼容格式：Agent Plugins 1.0.0 的根 `plugin.json`、Claude Code 的 `.claude-plugin/plugin.json`、Codex 的 `.codex-plugin/plugin.json` [@ref-minimax-code-plugins-compat-reader]。
- 宿主绑定文档是「声明式能力请求」，声明本身不授予任何权限，解析与否是宿主策略 [@ref-minimax-code-plugins-hostbinding]。
- 包体积与路径限制：压缩包上限 64 MiB、条目上限 2048、文件上限 1024、单文件 16 MiB、路径段与段长都有限制；摘要算法为 `sha256-tree-v1` [@ref-minimax-code-plugins-limits]。
- **没有**清单版本范围或最低应用版本兼容声明字段；唯一的兼容令牌是 `schemaVersion: 1` 与 semver `version` 字符串 [@ref-minimax-code-plugins-manifest]。

## 安装、更新与卸载 {#plugins-install}

- 只有两个来源：`official`（registry）与 `local`（数据目录下的 `plugins` 子目录） [@ref-minimax-code-plugins-cli-marketplace]。
- 官方插件的安装/启用/禁用/卸载受登录门控：先等待官方鉴权就绪（否则报 `PLUGIN_AUTH_REQUIRED` 或 `PLUGIN_AUTH_SYNC_TIMEOUT`），再向云端发起变更 [@ref-minimax-code-plugins-facade]。
- 本地插件的「安装」是**发现**：把包放进 `plugins` 的直接子目录即视为已安装；显式的 `mcode plugin add 名称@local` 不受支持并报错 [@ref-minimax-code-plugins-facade] [@ref-minimax-code-examples-plugins]。
- 本地启用/禁用状态落库（处于禁用行集合中即为禁用），卸载会删除已安装目录并进入隔离区 [@ref-minimax-code-plugins-state]。
- 更新模型：没有单个插件的升级命令，`mcode plugin marketplace upgrade` 只是刷新市场快照，随后官方对账采用目录中的当前包；版本由目录全量状态给出，内容按摘要缓存 [@ref-minimax-code-plugins-facade]。
- 作用域：用户级安装位于数据目录（注册表状态加 `plugins` 目录）；项目级只存在「工作区 MiniApp」形式，没有独立的项目插件注册表 [@ref-minimax-code-plugins-state]。
- 官方文档给出的命令行集合为 `plugin list/add/remove/enable/disable` 与 `plugin marketplace list/upgrade`，冲突时用 `@official`/`@local` 或 `-m` 指定市场，`--json` 供脚本使用 [@ref-minimax-code-doc-ref-plugin] [@ref-minimax-code-doc-plugins]。

```bash
# 依据 docs/examples.md 与官方「Plugins」文档
mcode plugin marketplace list
mcode plugin list --available
mcode plugin add my-plugin@official
mcode plugin enable my-plugin@official
```

## 发现、解析、加载顺序与冲突 {#plugins-discovery}

- 本地扫描只枚举直接子目录（跳过符号链接与非目录），并发度 4，按 realpath 再按名称排序 [@ref-minimax-code-plugins-local-scan]。
- 清单探测优先级：根 `plugin.json`（仅在完整可校验时采用）→ `.minimax-plugin/plugin.json` → `.claude-plugin/plugin.json` → `.codex-plugin/plugin.json`；因此普通或格式错误的根 `plugin.json` 不会遮蔽合法的 MiniMax/兼容清单 [@ref-minimax-code-plugins-detect]。
- 变更发现：对 `plugins` 目录做递归 `fs.watch`，150 毫秒去抖，失败开放 [@ref-minimax-code-plugins-watcher]。
- 快照加载顺序：官方包先入，按冲突键与摘要排序；本地包后入，按规范化根路径排序 [@ref-minimax-code-plugins-snapshot]。
- 冲突策略：同名时官方胜出，本地同名包被丢弃并记 `LOCAL_PLUGIN_NAME_CONFLICT`；技能名与工具名冲突另有 `OFFICIAL_/LOCAL_*_NAME_CONFLICT`、`*_SKILL_NAME_CONFLICT` 诊断 [@ref-minimax-code-plugins-conflicts]。
- MCP server 名经共享注册表分配，优先级为「已配置 > 官方 > 本地」 [@ref-minimax-code-plugins-mcp-precedence]。
- 没有插件依赖图，唯一的依赖声明是 Host Binding 的 `requiredSkills`：读取时校验必须引用已声明技能，快照时再校验可用性 [@ref-minimax-code-plugins-conflicts]。
- 插件名可用性策略在安装时生效（例如官方安装会阻止本地同名），已存在时报 `PLUGIN_ALREADY_EXISTS` [@ref-minimax-code-plugins-reservation]。

## 能力面与权限边界 {#plugins-api}

- 插件可注册的扩展点全部是声明式的：Apps（连接器 provider 引用）、MCP server（stdio / streamable-http / sse）、Skills（SKILL.md）、Hooks（命令处理器）、Host Bindings 与 MiniApp [@ref-minimax-code-plugins-types]。
- 一个 turn 实际拿到的是冻结的能力视图：已启用插件、技能（运行时名为「插件名:技能名」）、运行时工具、Host Bindings 与 Hook 处理器 [@ref-minimax-code-plugins-snapshot]。
- Host Binding 不授予权限：包不提供可执行实现，解析与否由宿主策略决定 [@ref-minimax-code-plugins-hostbinding]。
- 宿主能力调用按插件与进程代次中介，并有显式 provider 允许列表；MiniApp 通过 `hostConnectorAccess.providers` 声明可用的连接器 [@ref-minimax-code-plugins-hostbinding]。
- MCP 执行边界：stdio 命令必须是裸可执行文件名或以 `./` 开头的相对路径，`${PLUGIN_ROOT}`/`${PLUGIN_DATA}` 会被展开，保留的环境变量名被拒绝 [@ref-minimax-code-plugins-caps]。
- Hook 执行只对已启用插件开放 [@ref-minimax-code-plugins-snapshot]。
- GitHub 导入在运行时存在，但**不在 CLI/TUI 暴露**：官方文档明确任意市场注册与 GitHub URL 导入未在 CLI/TUI 提供 [@ref-minimax-code-tui-capabilities-plugins] [@ref-minimax-code-plugins-github]。

## 生命周期状态 {#plugins-lifecycle}

- 官方安装态记录为「已安装/已启用/安装策略/包版本/缓存包」，不变量是「启用但未安装」为非法 [@ref-minimax-code-plugins-state]。
- 快照激活采用「准备 → 提交 → 收尾」的版本化发布，结果可能是 `disposed`、`superseded` 或正常完成；快照版本号形如 `plugin-snapshot-N`、`full-state-摘要`、`target-state-摘要` [@ref-minimax-code-plugins-snapshot]。
- 官方鉴权生命周期为 `logged_out`、`pending`、`ready` 三态；鉴权轮换会触发作用域边界与缓存恢复 [@ref-minimax-code-plugins-facade]。
- 用户可见的项目是「已安装列表」与「已启用插件及其技能摘要」 [@ref-minimax-code-plugins-facade]。
- 选择某个插件参与一次 turn 并不会顺带安装或启用它 [@ref-minimax-code-tui-capabilities-plugins]。

## 诊断 {#plugins-diagnostics}

- `mcode plugin list --json` 与 `plugin list --available` 给出已安装/可用插件及其版本；版本来自清单或官方目录记录的包版本 [@ref-minimax-code-plugins-cli-marketplace]。
- 兼容、依赖与加载问题以快照诊断形式落盘，码包括 `PLUGIN_NAME_INVALID`、`OFFICIAL_/LOCAL_PLUGIN_NAME_CONFLICT`、`LOCAL_PLUGIN_NO_SUPPORTED_CAPABILITY`、`MCP_SERVER_NAME_INVALID`、`HOST_BINDING_SKILL_UNAVAILABLE` [@ref-minimax-code-plugins-conflicts]。
- 读取层另有自己的诊断码与错误载体（含 `capability` 标记，取值 `MCP`/`SKILL`/`APP`/`HOOK`），本地扫描也有独立的扫描诊断 [@ref-minimax-code-plugins-detect]。
- 常见失败：`PLUGIN_AUTH_REQUIRED`、`PLUGIN_NOT_FOUND`、`LOCAL_PLUGIN_INSTALL_UNSUPPORTED`、`PLUGIN_IMPORT_UNAVAILABLE`、`PLUGIN_MUTATION_SOURCE_INVALID` [@ref-minimax-code-plugins-facade]。
- 官方 FAQ 的排查顺序：先 `mcode plugin marketplace list` 与 `mcode plugin list --available`，名字冲突时指定 `@official`/`@local`，再用 `mcode plugin marketplace upgrade` 刷新市场快照 [@ref-minimax-code-doc-faq-acp]。
- 本地插件目录就是数据目录下的 `plugins`，把受支持的包放进其直接子目录后在 `/plugins` 刷新即可 [@ref-minimax-code-examples-plugins]。
