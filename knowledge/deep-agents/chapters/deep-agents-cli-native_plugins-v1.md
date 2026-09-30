---
schema_version: 3
record_kind: production
edition_id: deep-agents-cli-native_plugins-v1
harness_id: deep-agents
topic: native_plugins
title: "Deep Agents Code 原生插件与 Python 扩展：包结构、安装、发现、API 与诊断"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-deep-agents-plugins-doc-create, ref-deep-agents-plugins-doc-usecases, ref-deep-agents-plugins-manifest-fields, ref-deep-agents-plugins-doc-ext-source]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-deep-agents-plugins-doc-create, ref-deep-agents-plugins-manifest-paths, ref-deep-agents-plugins-manifest-load, ref-deep-agents-plugins-doc-manifest, ref-deep-agents-plugins-doc-marketplace]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-deep-agents-plugins-doc-interactive, ref-deep-agents-plugins-doc-cli, ref-deep-agents-plugins-install, ref-deep-agents-plugins-doc-marketplace, ref-deep-agents-plugins-doc-autoupdate]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-deep-agents-plugins-discover, ref-deep-agents-plugins-identity, ref-deep-agents-plugins-ext-order, ref-deep-agents-plugins-doc-ext-source, ref-deep-agents-plugins-doc-usecases]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-deep-agents-plugins-doc-ext-capabilities, ref-deep-agents-plugins-ext-api]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-deep-agents-plugins-install, ref-deep-agents-plugins-enabled, ref-deep-agents-plugins-discover, ref-deep-agents-plugins-ext-prepare, ref-deep-agents-plugins-doc-cli, ref-deep-agents-plugins-doc-cli-ext, ref-deep-agents-plugins-doc-failures]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-deep-agents-plugins-manifest-fields, ref-deep-agents-plugins-doc-create, ref-deep-agents-plugins-doc-usecases, ref-deep-agents-plugins-doc-ext-source]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-deep-agents-plugins-manifest-paths, ref-deep-agents-plugins-manifest-load, ref-deep-agents-plugins-doc-manifest, ref-deep-agents-plugins-doc-marketplace, ref-deep-agents-plugins-doc-create]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-deep-agents-plugins-doc-interactive, ref-deep-agents-plugins-doc-cli, ref-deep-agents-plugins-install, ref-deep-agents-plugins-doc-marketplace, ref-deep-agents-plugins-doc-autoupdate]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-deep-agents-plugins-discover, ref-deep-agents-plugins-identity, ref-deep-agents-plugins-ext-order, ref-deep-agents-plugins-doc-ext-source, ref-deep-agents-plugins-doc-usecases]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-deep-agents-plugins-doc-ext-capabilities, ref-deep-agents-plugins-ext-api]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-deep-agents-plugins-install, ref-deep-agents-plugins-enabled, ref-deep-agents-plugins-discover, ref-deep-agents-plugins-ext-prepare, ref-deep-agents-plugins-doc-cli-ext]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-deep-agents-plugins-doc-cli, ref-deep-agents-plugins-doc-cli-ext, ref-deep-agents-plugins-doc-failures, ref-deep-agents-plugins-enabled, ref-deep-agents-plugins-install]
---

## 原生插件的定位：plugin、Skill、MCP、Hook 与 Python extension {#plugins-model}

注：catalog 为该 surface 登记的参考页是 Deep Agents overview（`https://docs.langchain.com/oss/python/deepagents/overview`），该页描述 Python SDK 的 `create_deep_agent`，不描述 CLI；本页因此改用官方 CLI 文档树与固定提交的 `libs/code` 源码作为固定来源。

本站点只讨论 Deep Agents CLI 的两层原生扩展机制，依据固定提交 `c9b2ce194e422d2a61b9faf3732da15d90623c13` 的 `libs/code` 与官方文档快照；以下路径若未特别说明，均相对 `libs/code/`。已废弃的 PyPI 包 `deepagents-cli`（部署工具，命令 `deepagents init/dev/deploy`）不在范围内，它与本 CLI 的插件机制无关。

Deep Agents Code 的 **plugin 是一个目录**，里面可以放四类受支持组件：skills、MCP server、hooks 与 Python extensions；plugin 自身不是可执行单元，而是分发容器 [@ref-deep-agents-plugins-doc-create]。用户安装的是 plugin，实际生效的却是它携带的组件，因此 `/plugins` 管理的是"包"，而技能、MCP、hook、扩展各自仍走原有加载链。

四类组件与宿主既有机制的关系：
- **Skill**：plugin 的 `skills/` 目录内容按同一份 `SKILL.md` 格式解析，但对外名以 plugin id 作命名空间，避免与项目、用户及他人 plugin 的技能冲突；调用形如 `/skill:plugin-name@marketplace-name:skill-name` [@ref-deep-agents-plugins-doc-usecases]。
- **MCP server**：plugin 里的 `.mcp.json` 或清单内联 `mcpServers` 是标准 MCP 定义，加载后与常规 MCP 配置**合并**，server 名会被加上 plugin 前缀后并入可见工具集 [@ref-deep-agents-plugins-doc-usecases]。
- **Hook**：plugin hooks 与用户/项目 hooks 共用同一批生命周期事件与 handler 格式；唯一的同意门槛是"启用该 plugin"，站点信任只作用于项目 hooks，不作用于 plugin hooks [@ref-deep-agents-plugins-doc-usecases]。
- **Python extension**：需要 plugin 清单在 `com.langchain.deepagents.code` 命名空间下声明 `pythonExtensions`；这是真正向宿主注册 middleware、工具与存储路由的代码层，且要求 `DEEPAGENTS_CODE_EXPERIMENTAL=1` [@ref-deep-agents-plugins-doc-usecases]。

**plugin 与 Python extension 的区分**是本章主线：plugin 有稳定身份 `name@marketplace`、版本、安装缓存与更新记录；extension 只是一个入口文件，注册的中介、工具、路由会改变 agent 图或模型请求。宿主解析出的 plugin 清单字段见 `PluginManifest`：`name`、`version`、`component_paths`、`inline_mcp`、`inline_hooks`、`python_extensions`、`display_name`、`auto_update` [@ref-deep-agents-plugins-manifest-fields]。与之相对，普通 Python 包不含 marketplace 目录、版本快照与插件数据目录；它只能作为一种 extension 来源暴露模块，因此在能力上属于 extension 层而非 plugin 层 [@ref-deep-agents-plugins-doc-ext-source]。

## 插件包与清单：目录结构、plugin.json 与 marketplace.json {#plugins-package}

一个 plugin 目录的典型形态（官方文档给出的布局）是：`my-plugin/` 下可选 `.claude-plugin/plugin.json`、`skills/review/SKILL.md`、`hooks/hooks.json`、`.mcp.json` [@ref-deep-agents-plugins-doc-create]。清单本身**可选**：当组件都放在默认位置时，宿主直接按默认约定发现——`skills/` 目录（或没有 `skills/` 时根目录的单个 `SKILL.md`）、根目录 `.mcp.json`、`hooks/hooks.json` [@ref-deep-agents-plugins-doc-create]。

宿主查找清单文件时按固定顺序取第一个存在的文件：`plugin.json`、`.claude-plugin/plugin.json`、`.codex-plugin/plugin.json` [@ref-deep-agents-plugins-manifest-paths]。因此 `plugin.json` 放在插件根目录即可生效，`.claude-plugin/` 与 `.codex-plugin/` 是兼容 Claude / Codex 风格清单的别名。

清单字段及其解析规则（源码 `load_manifest`）[@ref-deep-agents-plugins-manifest-load]：
- `name`：有清单时必需；无清单的 plugin 由 marketplace 条目的名字回退填充。
- `version`：字符串，可空。它同时是安装缓存的版本目录名与自动更新比对的依据。
- `skills`、`mcpServers`、`hooks`：接受路径字符串或路径数组，也可为内联对象；每条路径必须以 `./` 开头、位于 plugin 根目录内且不含 `..`。
- `extensions.com.langchain.deepagents.code.pythonExtensions`：一个或多个 Python 入口文件；**声明了它就必须有非空 `version`**，否则该项被忽略并产生告警 [@ref-deep-agents-plugins-manifest-load]。
- `extensions.com.langchain.deepagents.code.autoUpdate`：仅当显式为 `true` 时该 plugin 才允许自动更新。
- `displayName`：可读标签。

最小清单示例（依据前述字段来源）：
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "skills": "./skills",
  "mcpServers": "./.mcp.json",
  "hooks": "./hooks/hooks.json"
}
```
同一清单若要携带扩展：
```json
{
  "name": "shared-memory",
  "version": "1.0.0",
  "extensions": {
    "com.langchain.deepagents.code": {
      "pythonExtensions": "./extension.py"
    }
  }
}
```
该扩展写法由官方文档"Add Python extensions"与 `libs/code/EXTENSIONS.md` 共同支撑 [@ref-deep-agents-plugins-doc-manifest]。

**marketplace** 是一份 JSON 目录，含 `name` 与 `plugins` 数组；宿主识别三个存放路径：`.claude-plugin/marketplace.json`、`.agents/plugins/marketplace.json`、`.agents/plugins/api_marketplace.json` [@ref-deep-agents-plugins-doc-marketplace]。每个 plugin 条目必需 `name` 与 `source`，可选 `description`、`author`。`source` 可以是本地相对路径（必须以 `./` 开头且留在 marketplace 根目录内，可用 `metadata.pluginRoot` 改基准目录），也可以是外部源对象 `github`、`url`、`git-subdir`，其中远程 URL 必须为 HTTPS [@ref-deep-agents-plugins-doc-marketplace]。一个直接以 JSON URL 添加的 marketplace 不能引用同仓库内的相对插件目录，因为只下载了目录文件本身。

## 安装、版本固定、更新与卸载 {#plugins-install}

**添加来源**：`/plugins` 面板的 Marketplaces 页支持四类输入——GitHub 的 `owner/repo`（可跟 `@branch-or-tag`）、HTTPS Git URL（可跟 `#branch-or-tag`）、返回 marketplace JSON 的 HTTPS URL、以及本地 marketplace 目录或 JSON 文件 [@ref-deep-agents-plugins-doc-interactive]；命令行对应 `dcode plugin marketplace add` [@ref-deep-agents-plugins-doc-cli]。解析由 `parse_marketplace_source` 完成，本地路径与 `owner/repo` 简写、HTTPS URL、SCP 式 `git@host:owner/repo.git#ref` 分别落入 `directory|file|github|git|url` 五种来源类型。

**安装链**：`dcode plugin install code-review@acme-tools` 或面板安装后，宿主把 plugin 源**拷贝进版本化缓存** `plugins/cache/{marketplace}/{plugin}/{version}/`，写入 `installed_plugins.json`，并**立即把该 plugin 置为启用** [@ref-deep-agents-plugins-install]。未声明版本的 plugin 落入 `unversioned` 缓存键。因此"已安装"与"已启用"是两个可分别操作的状态，安装成功即默认启用。

**状态文件位置**：安装记录在 `~/.deepagents/.state/installed_plugins.json`，启用开关在 `~/.deepagents/.state/plugin_state.json` 的 `enabledPlugins` 映射，marketplace 记录在 `~/.deepagents/.state/plugin_marketplaces.json`；插件缓存根为 `~/.deepagents/plugins`（可被 `DEEPAGENTS_CODE_PLUGIN_CACHE_DIR` 覆盖）[@ref-deep-agents-plugins-install]。

**作用域**：plugin 的 marketplace 与安装状态是**用户级**的，落在配置目录下，CLI 没有"项目级插件安装"入口——项目级机制出现在 Python extension 的 `.deepagents/extensions/`，那是 extension 来源而非 plugin 安装 [@ref-deep-agents-plugins-doc-cli]。

**命令与生效**：`dcode plugin list|install|uninstall|enable|disable`、`dcode plugin marketplace add|list|remove`，`list` 与 `marketplace list` 支持 `--json` [@ref-deep-agents-plugins-doc-cli]。改动后在新会话或运行 `/reload` 时生效；带 Python 扩展的 plugin 需要 `/restart` 重建 agent 图 [@ref-deep-agents-plugins-doc-interactive]。

**版本固定**：marketplace 条目的外部源可带 `ref`（如 `"ref": "v1.0.0"`）以锁定分支或标签 [@ref-deep-agents-plugins-doc-marketplace]；安装缓存目录名取自 plugin 清单的 `version`，实现按版本隔离与回滚 [@ref-deep-agents-plugins-install]。

**更新**：安装后的 plugin 在第一条提示之后可在后台自动更新，但只针对**已启用、已声明版本、且在清单里 `autoUpdate: true`** 的 plugin，且新版本号必须与已装版本不同；运行中的会话继续用旧版本直到 `/reload` [@ref-deep-agents-plugins-doc-autoupdate]。全局关闭用 `[plugins].auto_update = false` 或环境变量 `DEEPAGENTS_CODE_PLUGIN_AUTO_UPDATE=false`。

**卸载**：`dcode plugin uninstall` 或面板卸载会清记录并删除孤立缓存；`dcode plugin marketplace remove` 会卸载该 marketplace 下的全部 plugin 并清理托管缓存，但本地来源的 marketplace 目录本身不被删除 [@ref-deep-agents-plugins-doc-interactive]。禁用只把 plugin 从 `enabledPlugins` 移除而保留安装，`/reload` 后其技能、MCP、hooks 不再注入；Python 扩展在 `/restart` 或新会话前仍留在当前图中 [@ref-deep-agents-plugins-doc-interactive]。

## 发现、校验与加载顺序 {#plugins-discovery}

**plugin 发现**由 `discover_plugins` 执行：读取启用集合，按**字典序**遍历每个 plugin id，经 `installed_plugins.json` 找到安装路径，校验目录存在，再解析清单并构建组件清单；任何损坏的 marketplace/plugin 只产生 warning，绝不阻断其他 plugin [@ref-deep-agents-plugins-discover]。仅"已启用"的 plugin 进入发现；启用但缺安装记录、或缓存缺失，都会给出可定位的告警。

**身份校验**：发现的 plugin 必须满足 `plugin_id == f"{name}@{marketplace}"`，否则构造 `PluginInstance` 时抛错并跳过 [@ref-deep-agents-plugins-identity]。`PluginInstance` 同时携带 `version`、`root`、`data_dir`、`manifest`、`inventory`，作为下游 adapters 的输入。

**Python extension 的发现顺序**（`discover_extensions`，按此顺序拼接后按规范化路径去重，后者重复即忽略）[@ref-deep-agents-plugins-ext-order]：
1. `~/.deepagents/extensions/` 下的松散文件；
2. `[extensions].extra_paths` 中的文件或目录；
3. `-e` / `--extension` 传入的路径；
4. 已启用且带版本的 plugin 所声明的 `pythonExtensions`；
5. 已安装发行版通过 `dcode.extensions` entry point 暴露的模块；
6. 获得信任的项目目录 `.deepagents/extensions/`。

**门控与信任**：整条链要求 `DEEPAGENTS_CODE_EXPERIMENTAL=1`；`[extensions].enabled`（或 `DEEPAGENTS_CODE_EXTENSIONS`）为假时**所有**来源都被跳过，包括 `-e` 传入的路径 [@ref-deep-agents-plugins-doc-ext-source]。项目扩展只在授予项目信任后执行，策略 `[extensions].trust`（`ask|always|never`，或 `DEEPAGENTS_CODE_EXTENSIONS_TRUST`），交互式会询问并可记住项目路径，headless 可用 `--trust-project-extensions` 为单次运行授权 [@ref-deep-agents-plugins-doc-ext-source]。

**命名冲突与加载顺序**：宿主**不做依赖解析**，plugin 按 id 字典序加载；extension 注册单元（middleware、tool、backend route）按"同名先到先得"处理，重复注册被忽略并记日志 [@ref-deep-agents-plugins-ext-order]。plugin 技能用 plugin id 命名空间隔离，plugin 的 MCP server 名加前缀后并入常规配置，从而避免跨来源冲突 [@ref-deep-agents-plugins-doc-usecases]。

## Python extension 可注册的能力与边界 {#plugins-api}

入口文件必须暴露**异步** `extension` 装配函数，宿主在构建 agent 图前逐一 await；它收到一个 `ExtensionAPI` 注册器，带只读会话上下文与四个注册方法 [@ref-deep-agents-plugins-doc-ext-capabilities]：
- `register_middleware(class_or_instance)`：加 LangChain `AgentMiddleware`；传类时须能零参构造，需要配置时传实例 [@ref-deep-agents-plugins-ext-api]。
- `register_tool(function_or_tool)`：把可调用对象或 `BaseTool` 暴露给模型；普通可调用对象由 LangChain 依据签名与 docstring 推断 schema。
- `register_backend_route(prefix, backend)`：把 `BackendProtocol` 挂到虚拟路径，前缀须为小写绝对路径、前后都带 `/`（如 `/memories/`）。
- `on_shutdown(callback)`：注册会话结束时的同步或异步清理回调。

只读上下文为 `d.cwd`、`d.mode`（`interactive`/`headless`）、`d.has_ui`、`d.path`（入口文件）[@ref-deep-agents-plugins-doc-ext-capabilities]。

**边界与权限**：扩展以用户权限运行任意 Python，工具**不会自动加入人工批准映射表**，涉及敏感操作的扩展必须自行通过 middleware 施加审批或策略 [@ref-deep-agents-plugins-doc-ext-capabilities]。注册路由会校验：不得与宿主内部 artifact / 会话历史存储路由重叠，沙箱模式下拒绝直接挂载 `FilesystemBackend`（含子类）[@ref-deep-agents-plugins-ext-api]。扩展工具与 middleware 会**替换同名内置实现**；扩展之间同一路由前缀或同名单元先注册者胜 [@ref-deep-agents-plugins-doc-ext-capabilities]。

**生效时机**：启动后注册的工具在下一次模型请求即可见；middleware 与 backend route 参与 agent 图构建，须 `/reload` 重建，`/extensions` 会报告是否需要重启 [@ref-deep-agents-plugins-doc-ext-capabilities]。此 API 不含自定义斜杠命令。

## 生命周期状态与诊断入口 {#plugins-lifecycle}

可观察的状态分四层：
- **installed**：`installed_plugins.json` 中存在安装记录，含 `install_path` 与（可空的）`version` [@ref-deep-agents-plugins-install]。
- **enabled**：`plugin_state.json` 的 `enabledPlugins` 中该 id 为 `true`；读取由 `load_enabled_plugin_ids` 完成，映射非法时按 `strict` 抛错或返回空集 [@ref-deep-agents-plugins-enabled]。
- **discovered/loaded**：`discover_plugins` 成功产出 `PluginInstance`（损坏项变成 warning）[@ref-deep-agents-plugins-discover]。
- **active / restart_required**：扩展加载整体是否激活，以及是否有图绑定注册需要重建；由 `ExtensionLoadResult.active` 与注册表的 `restart_required` 反映 [@ref-deep-agents-plugins-ext-prepare]。

扩展运行时是否启动，取决于 `_prepare` 的连续门控：`DEEPAGENTS_CODE_EXPERIMENTAL` 为假直接返回空；`[extensions].enabled` 为假同样跳过；项目扩展还须通过 `trust` 策略或显式授权 [@ref-deep-agents-plugins-ext-prepare]。

**诊断命令**：
- `dcode plugin list [--json]` 列出各 marketplace 中的 plugin 及 `enabled` 字段；`plugin marketplace list` 列出 marketplace 及其来源 [@ref-deep-agents-plugins-doc-cli]。
- `/plugins` 面板可看 marketplace 与已装 plugin、启停与卸载。
- `/extensions` 列出每个扩展注册的 kind、name、scope 与源路径，并显示加载失败与"是否需要 `/restart`"；该命令与扩展加载都要求 `DEEPAGENTS_CODE_EXPERIMENTAL=1` [@ref-deep-agents-plugins-doc-cli-ext]。

**失败处理**：每个扩展的装配是事务性的——导入或初始化失败会回滚该扩展已产生的部分注册，失败记入调试日志与 `/extensions`，后续扩展继续加载；某个 plugin 的 hooks/MCP 加载失败也不会拖垮其他来源 [@ref-deep-agents-plugins-doc-failures]。

**改动何时生效**：安装/启用/禁用/更新 plugin 的技能、MCP、hooks 在 `/reload` 或新会话生效；Python 扩展的 middleware、backend route、插件扩展的启用/禁用，须 `/restart` 或新会话重建 agent 图 [@ref-deep-agents-plugins-doc-cli-ext]。只读版本信息可用 `dcode config show` 与 `dcode doctor` 辅助定位安装与依赖问题。
