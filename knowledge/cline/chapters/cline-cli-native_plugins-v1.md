---
schema_version: 3
record_kind: production
edition_id: cline-cli-native_plugins-v1
harness_id: cline
topic: native_plugins
title: "Cline CLI 的原生插件：清单、安装、加载与诊断"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-cline-plugin-alias, ref-cline-plugin-extension-iface, ref-cline-plugin-capabilities, ref-cline-plugin-mcp-cap, ref-cline-plugin-skill-dirs, ref-cline-plugin-wrapper, ref-cline-paths-agent-plugins, ref-cline-cli-plugin-sections, ref-cline-plugins-doc-install, ref-cline-sdk-plugins-doc-what, ref-cline-sdk-plugins-doc-glossary]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-cline-plugin-declared-entry, ref-cline-plugin-wrapper, ref-cline-plugin-file-ext, ref-cline-plugin-export, ref-cline-plugin-validate, ref-cline-plugin-install-consts, ref-cline-plugins-doc-peer, ref-cline-plugin-targeting, ref-cline-writing-plugins-doc-structure, ref-cline-writing-plugins-doc-cli, ref-cline-plugin-skill-dirs, ref-cline-plugins-doc-manifest]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-cline-cli-plugin-cmd, ref-cline-plugin-install-consts, ref-cline-plugin-install-path, ref-cline-plugin-install-force, ref-cline-cli-config-refresh, ref-cline-plugin-mcp-sync, ref-cline-plugin-uninstall, ref-cline-plugin-uninstall-cleanup, ref-cline-plugins-doc-dirs, ref-cline-cli-plugin-json]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-cline-plugin-paths, ref-cline-paths-plugins, ref-cline-paths-plugin-entries, ref-cline-plugin-timeouts, ref-cline-plugin-idle, ref-cline-plugin-duplicate, ref-cline-plugin-load-report, ref-cline-plugin-failed-retry]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-cline-plugin-api, ref-cline-plugin-hooks-cap, ref-cline-plugin-mcp-cap, ref-cline-plugin-capabilities, ref-cline-plugin-timeouts, ref-cline-sdk-plugins-doc-glossary]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-cline-settings-plugin-inspection, ref-cline-plugin-summary, ref-cline-plugin-load-report, ref-cline-cli-plugin-error-label, ref-cline-cli-config-refresh, ref-cline-plugin-wrapper, ref-cline-cli-plugin-json]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-cline-plugin-alias, ref-cline-plugin-capabilities, ref-cline-plugin-skill-dirs, ref-cline-plugin-mcp-cap]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-cline-plugin-declared-entry, ref-cline-plugin-export, ref-cline-plugin-validate]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-cline-plugin-install-path, ref-cline-cli-plugin-cmd, ref-cline-plugin-install-force]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-cline-plugin-paths, ref-cline-plugin-duplicate, ref-cline-plugin-timeouts]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-cline-plugin-api, ref-cline-plugin-capabilities]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-cline-settings-plugin-inspection, ref-cline-plugin-summary]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-cline-plugin-load-report, ref-cline-cli-plugin-error-label, ref-cline-plugin-wrapper]
---

## 什么算 Cline 原生插件 {#plugins-model}

固定来源：仓库提交 `3435f72fcf4cb843bee946b8f9e981683564c9e3` 的 `sdk/packages/core/src/index.ts`、`sdk/packages/shared/src/extensions/`、`sdk/packages/core/src/extensions/plugin/`、`sdk/packages/core/src/services/plugin-*.ts`、`apps/cli/src/commands/plugin.ts`，以及 `docs/customization/plugins.mdx`、`docs/sdk/plugins.mdx`、`docs/sdk/guides/writing-plugins.mdx`。官方文档站 `https://docs.cline.bot/customization/plugins.md` 与 `https://docs.cline.bot/sdk/plugins.md` 的快照作佐证，软件版本未知。

原生插件就是导出一个 `AgentExtension` 的模块；公开名 `AgentPlugin` 只是别名，从 `@cline/core` 导出，并被 `@cline/sdk` 再导出。[@ref-cline-plugin-alias]

接口形状：`name`、`manifest`（必带 `capabilities`）、可选 `hooks`、可选 `setup(api, ctx)`；`setup` 在宿主完成注册后返回。[@ref-cline-plugin-extension-iface]

能力是**封闭词表**，不是互相独立的子系统：`hooks`、`tools`、`commands`、`rules`、`skills`、`messageBuilders`、`providers`、`automationEvents`、`mcp`。因此：

- Hook 是插件的一项能力（要在 manifest 里声明 `hooks`），与文件 hook 是两条不同的注册路径；[@ref-cline-plugin-capabilities]
- 插件可以通过 `registerMcpServer` 贡献 MCP server，宿主把它物化进 MCP 设置文件并打上 `metadata.source: "plugin"`；[@ref-cline-plugin-mcp-cap]
- **Skill 不能通过 API 注册**：插件包在自己的包根放一个 `skills/` 目录，且该包的 `package.json` 必须真的声明了这个插件入口，宿主的 `resolvePluginSkillDirectoriesFromPaths` 才会把它当 skill 源；[@ref-cline-plugin-skill-dirs]
- 普通 npm 包不等于插件：安装器会给它套一个只含 `cline.plugins` 的 `package.json` 包装。见下一节。[@ref-cline-plugin-wrapper]

第二条独立通道是厂商中立的 **Agent Plugin**（agent-plugins.org 规范）：包根带 `plugin.json`，只从 `~/.agents/plugins` 自动发现，按名字禁用；CLI 的配置视图刻意把两条通道分成「Cline Plugins」与「Agent Plugins」两段。[@ref-cline-paths-agent-plugins][@ref-cline-cli-plugin-sections]

官方文档明确把插件能力限定为 SDK / CLI / Kanban，VS Code 与 JetBrains 扩展暂不适用。[@ref-cline-plugins-doc-install]

概念上插件是「打包单位」：文档的扩展术语表把 Tool（模型可调用的动作）、Command（斜杠命令）、Hook（生命周期策略）、Rule（常驻提示）、Event（外部事件触发）分列，插件负责把它们打包成一个可复用模块。[@ref-cline-sdk-plugins-doc-what][@ref-cline-sdk-plugins-doc-glossary]

## 包格式、入口、清单与依赖 {#plugins-package}

清单字段是 `package.json` 的 `cline.plugins`，取值是数组，元素可以是纯字符串路径，也可以是 `{ paths: [...], capabilities: [...] }`；加载器只读其中的 `paths`，安装器生成的包装清单也回写 `{ paths: [...] }` 这个形状。[@ref-cline-plugin-declared-entry][@ref-cline-plugin-wrapper]

入口文件必须是 `.js` 或 `.ts`，并且必须把插件导出为**默认导出**或名为 `plugin` 的具名导出。[@ref-cline-plugin-file-ext][@ref-cline-plugin-export]

加载时校验：导出必须是对象、`name` 是非空字符串、`manifest` 是对象、`manifest.capabilities` 是非空字符串数组；`manifest.providerIds`/`modelIds` 若存在必须是字符串数组。运行期唯一的必填 manifest 字段就是 `capabilities`。[@ref-cline-plugin-validate]

第一方 `@cline/*` 依赖由宿主提供：安装时会从 `dependencies`/`devDependencies`/`optionalDependencies`/`peerDependencies` 里删掉所有 `@cline/*` 键，删掉已装的 `node_modules/@cline/*`，然后跑 `npm install`；因此插件应把 `@cline/*` 声明为**可选** peer 依赖。[@ref-cline-plugin-install-consts][@ref-cline-plugins-doc-peer]

兼容声明不是 semver，而是「定向」：`manifest.providerIds`/`modelIds` 在会话 provider/model 不匹配时把插件跳过；没有插件 API 版本或宿主版本字段。[@ref-cline-plugin-targeting]

单文件插件与包插件都支持：文档给出「单文件从 URL 安装」与「包内声明 `cline.plugins`」两种做法；包内 `skills/` 会随包一起成为 skill 源。[@ref-cline-writing-plugins-doc-structure][@ref-cline-writing-plugins-doc-cli][@ref-cline-plugin-skill-dirs]

一个最小清单（字段名来自加载器与安装器实现）[@ref-cline-plugin-declared-entry][@ref-cline-plugins-doc-manifest]：

```json
{
  "name": "my-cline-plugin",
  "version": "1.0.0",
  "cline": {
    "plugins": [{ "paths": ["./index.ts"], "capabilities": ["tools", "hooks"] }]
  },
  "peerDependencies": { "@cline/sdk": "*" },
  "peerDependenciesMeta": { "@cline/sdk": { "optional": true } }
}
```

## 安装、版本固定、禁用与卸载 {#plugins-install}

CLI 面只有两个子命令：`cline plugin install 〈source〉`（别名 `i`，选项 `--npm`、`--git`、`--force`、`--json`、`--cwd`）与 `cline plugin uninstall 〈name〉`（别名 `remove`、`rm`）。没有 `plugin list`、`plugin enable/disable`、`plugin update`。列出与开关都在 `cline config` 里做。[@ref-cline-cli-plugin-cmd]

来源五类：官方 slug（形如 `名字`，从 `https://github.com/cline/plugins.git` 的 `plugins` 目录下同名子目录克隆）、npm（`npm:@scope/name` 或 `--npm`）、git（`--git`、形式或 scp 形式，浅克隆且排除 `.git`）、https 单文件（GitHub `blob` URL 会归一成 raw，30 秒超时、10 MiB 上限）、本地文件或目录（`~` 展开，过滤 `.git`/`node_modules`，然后 `npm install`）。[@ref-cline-plugin-install-consts]

安装目录按来源类型和源标识的 12 位十六进制哈希命名，落在 `_installed/npm|git|remote|official|local/` 之下。[@ref-cline-plugin-install-path]

版本固定：git 源支持 `@ref`（分支/标签，如 `repo.git@v1.2.0`），npm 源靠 npm spec 本身；`--force` 会替换同一来源键的既有安装（原子重命名 + 备份）。没有插件自动更新（全局设置里的 `autoUpdateEnabled` 管的是 CLI 自身）。[@ref-cline-plugin-install-force]

禁用：`cline config` 里切换插件行会调用 `setDisabledPlugin(路径, !enabled)`（路径键的 `disabledPlugins`）；启用前会先同步该插件的 MCP server，禁用前先移除其 MCP 条目。Agent Plugin 用名字键的 `disabledAgentPlugins`。被禁用的路径在加载时被过滤掉。[@ref-cline-cli-config-refresh][@ref-cline-plugin-mcp-sync]

卸载：按名字（安装目录 basename、去哈希 basename、`package.json` 的 name、入口 basename）或显式路径在全部插件根里找候选，多个匹配则中止；随后移除该插件的 MCP 条目、`rmSync` 安装目录、从 `disabledPlugins` 里摘掉路径，并清理空掉的 `_installed/...` 父目录。[@ref-cline-plugin-uninstall][@ref-cline-plugin-uninstall-cleanup]

用户级 vs 项目级：带 `--cwd` 时根是 `{path}/.cline/plugins`，相对本地路径也相对该路径解析；不带时是全局的 `~/.cline/plugins`。文档给出的目录树与之一致（`_installed/npm|git|remote|local` 分类）。[@ref-cline-plugins-doc-dirs]

`--json` 输出裁剪后的安装结果（source、installPath、entryPaths、mcpSyncFailures）。[@ref-cline-cli-plugin-json]

## 发现、解析、校验、加载与冲突 {#plugins-discovery}

路径解析顺序：先显式 `pluginPaths`（相对 cwd 解析；缺失路径会抛错；目录则按 `cline.plugins` → `index.ts`/`index.js` → 递归扫描解析），再搜索根，最后按绝对路径去重并去掉全局禁用的路径。搜索根固定为：`{workspace}/.cline/plugins`、`~/.cline/plugins`、`~/Documents/Cline/Plugins`。[@ref-cline-plugin-paths][@ref-cline-paths-plugins]

目录扫描 `discoverPluginModulePaths` 会跳过 `node_modules`、任何点目录、以及带 `plugin.json` 的 Agent Plugin 目录；在含 `package.json` 的目录取 `cline.plugins` 声明的入口（若都指向存在的文件），否则退到 `index.ts`/`index.js`，都没有才继续下探；结果按 `localeCompare` 排序。[@ref-cline-paths-plugin-entries]

加载默认在**子进程沙箱**里执行（`mode === "in_process"` 是唯一例外）：import 预算 4000 毫秒、hook 3000 毫秒、contribution 60000 毫秒、空闲 30 分钟，可用 `CLINE_PLUGIN_IMPORT_TIMEOUT_MS`、`CLINE_PLUGIN_IDLE_TIMEOUT_MS` 覆盖。[@ref-cline-plugin-timeouts][@ref-cline-plugin-idle]

顺序与冲突：配置路径在前、搜索根按序在后，串行加载；出现重复 `name` 时**后者替换前者**并发出 `duplicate_plugin_override` 警告（同时给两个路径）；provider/model 不匹配的插件被静默跳过；单个插件失败不会中断其它插件，而是产出一条 `PluginInitializationFailure`。[@ref-cline-plugin-duplicate][@ref-cline-plugin-load-report]

加载失败的重试是短暂记忆：CLI 的斜杠命令宿主按 `路径:mtime` 缓存，失败只记 30 秒就允许重试。[@ref-cline-plugin-failed-retry]

## 插件能注册什么、边界在哪 {#plugins-api}

注册面就是 `AgentExtensionApi` 上的七个方法：`registerTool`、`registerCommand`、`registerRule`、`registerMessageBuilder`、`registerProvider`、`registerAutomationEventType`、`registerMcpServer`；此外还能实现最多 7 个运行时 hook（`beforeRun`/`afterRun`/`beforeModel`/`afterModel`/`beforeTool`/`afterTool`/`onEvent`）。[@ref-cline-plugin-api]

能力校验是**部分强制**的：使用 `hooks` 必须有 `hooks` 能力、`registerRule` 要求 `rules`、`registerAutomationEventType` 要求 `automationEvents`、`registerMcpServer` 要求 `mcp`；而 `registerTool`、`registerCommand`、`registerMessageBuilder`、`registerProvider` 没做运行期校验（文档注释里写的「Requires the X capability」只是注释）。未知能力名会在注册表校验时硬报错。[@ref-cline-plugin-hooks-cap][@ref-cline-plugin-mcp-cap][@ref-cline-plugin-capabilities]

没有权限清单、没有按插件的批准门：宿主 API 的边界就是**子进程沙箱 + JSON IPC**。贡献以描述符穿过进程边界，hook 调用有独立超时；不可 JSON 序列化的载荷会先用 JSON-safe 克隆重试一次并告警（提示宿主对象不要放进工具上下文或 hook 载荷）。[@ref-cline-plugin-timeouts]

`setup(api, ctx)` 拿到 `PluginSetupContext`：`session`、`client`、`user`、`workspaceInfo`，以及按能力特性检测后才出现的 `automation`、`logger`、`telemetry`（沙箱里是命名空间化的桥）。[@ref-cline-plugin-hooks-cap]

文档的扩展术语表与这套注册面一一对应：Tool/Command/Hook/Rule/Event 各自对应上面的某个 `register*` 或 hook 回调。[@ref-cline-sdk-plugins-doc-glossary]

## 状态与诊断 {#plugins-lifecycle}

可以区分的状态与观察入口：

- **已安装**：文件在 `<插件根>/_installed/...` 或直接放在插件根；`CoreSettingsService.list()` 的 `plugins[]` 行给出 `path`、`name`、`source`（`global-plugin`/`workspace-plugin`）、`enabled`。[@ref-cline-settings-plugin-inspection]
- **已发现**：`discoverPluginModulePaths` 返回了入口；`cline config` 里每行一个模块路径，`listPluginToolsWithDiagnostics` 返回 `PluginContributionSummary`（含 pluginName、path、capabilities、tools、rules、hooks、commands、mcpServers）。[@ref-cline-plugin-summary]
- **已启用**：路径不在 `disabledPlugins` 里；`execution` 行的 `enabled` 布尔值即此状态。[@ref-cline-settings-plugin-inspection]
- **已加载**：模块导入并通过导出校验；失败记 `PluginInitializationFailure{phase: "load"}`，没有持久化的「已加载」标志，每次加载都重新推导。[@ref-cline-plugin-load-report]
- **已激活**：`setup(api, ctx)` 跑完并收集到注册；失败记 `phase: "setup"`。激活只能间接观察：`listPluginToolsWithDiagnostics` 会在一次性沙箱里跑一遍 `setup` 枚举贡献，然后关掉，并把每个插件的 `contributions.inspectionStatus` 标成 `available`/`disabled`/`failed`。[@ref-cline-settings-plugin-inspection]

「健康」没有独立概念，最接近的可观察量是 `inspectionStatus === "available"` 且 `loadError` 为空。[@ref-cline-settings-plugin-inspection]

诊断命令与字段：`cline config` 展示插件行并把失败附加上去（行名改成 pluginName），错误标签是 `loadError` 的第一行加 `(+N more)`，且标红；`pluginDiagnosticsLoaded` 只在调用方显式关闭插件枚举时为 false。[@ref-cline-cli-plugin-error-label][@ref-cline-cli-config-refresh]

**已知缺口：Cline 插件的版本号拿不到。** 安装器生成的包装 `package.json` 只有 `name` 与 `cline.plugins`，没有 `version`；CLI 也没有任何命令打印插件版本。只有第二条通道（厂商中立的 Agent Plugin）会在描述里渲染 `Portable Agent Plugin v{版本}`。仓库里也没有 marketplace 模块，`plugin update` 之类的入口不存在。[@ref-cline-plugin-wrapper][@ref-cline-cli-plugin-json]
