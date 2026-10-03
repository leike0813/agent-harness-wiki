---
schema_version: 3
record_kind: production
edition_id: zed-zed-native_plugins-v2
harness_id: zed
topic: native_plugins
title: "Zed 的原生插件：extension.toml 清单、wasm 代码、能力授予与安装状态"
sections:
  - section_id: plugins-model
    surface_ids: [zed]
    source_refs: [ref-zed-plugins-doc-manifest, ref-zed-plugins-manifest, ref-zed-mcp-repo-doc-extension, ref-zed-plugins-doc-wasm]
  - section_id: plugins-package
    surface_ids: [zed]
    source_refs: [ref-zed-plugins-manifest, ref-zed-plugins-context-entry, ref-zed-plugins-doc-manifest, ref-zed-plugins-doc-wasm, ref-zed-plugins-api-version, ref-zed-plugins-manifest-opt-in-languages, ref-zed-plugins-manifest-opt-in-accessors, ref-zed-plugins-repo-doc-categories]
  - section_id: plugins-install-discovery
    surface_ids: [zed]
    source_refs: [ref-zed-plugins-extensions-dir, ref-zed-plugins-repo-doc-install, ref-zed-plugins-doc-dev, ref-zed-plugins-manifest, ref-zed-plugins-granted-caps, ref-zed-plugins-repo-doc-caps, ref-zed-mcp-repo-doc-extension, ref-zed-plugins-api-context-server, ref-zed-plugins-repo-doc-categories]
  - section_id: plugins-api
    surface_ids: [zed]
    source_refs: [ref-zed-plugins-api-trait, ref-zed-plugins-api-context-server, ref-zed-plugins-capability-enum, ref-zed-plugins-granted-caps, ref-zed-plugins-repo-doc-caps, ref-zed-plugins-doc-wasm]
  - section_id: plugins-lifecycle-diagnostics
    surface_ids: [zed]
    source_refs: [ref-zed-plugins-extensions-dir, ref-zed-plugins-doc-dev, ref-zed-plugins-granted-caps, ref-zed-plugins-manifest, ref-zed-plugins-api-version, ref-zed-plugins-doc-wasm]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [zed]
        section_id: plugins-model
        status: answered
        source_refs: [ref-zed-plugins-manifest, ref-zed-plugins-doc-manifest, ref-zed-plugins-doc-wasm, ref-zed-mcp-repo-doc-extension]
  - question_id: plugins.package
    answers:
      - surface_ids: [zed]
        section_id: plugins-package
        status: partial
        source_refs: [ref-zed-plugins-manifest, ref-zed-plugins-doc-manifest, ref-zed-plugins-doc-wasm, ref-zed-plugins-api-version, ref-zed-plugins-manifest-opt-in-languages, ref-zed-plugins-manifest-opt-in-accessors, ref-zed-plugins-repo-doc-categories]
  - question_id: plugins.install
    answers:
      - surface_ids: [zed]
        section_id: plugins-install-discovery
        status: answered
        source_refs: [ref-zed-plugins-extensions-dir, ref-zed-plugins-repo-doc-install, ref-zed-plugins-doc-dev]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [zed]
        section_id: plugins-install-discovery
        status: partial
        source_refs: [ref-zed-plugins-manifest, ref-zed-plugins-granted-caps, ref-zed-plugins-repo-doc-caps, ref-zed-plugins-repo-doc-categories]
  - question_id: plugins.api
    answers:
      - surface_ids: [zed]
        section_id: plugins-api
        status: answered
        source_refs: [ref-zed-plugins-api-trait, ref-zed-plugins-capability-enum, ref-zed-plugins-granted-caps, ref-zed-plugins-api-context-server]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [zed]
        section_id: plugins-lifecycle-diagnostics
        status: partial
        source_refs: [ref-zed-plugins-extensions-dir, ref-zed-plugins-doc-dev, ref-zed-plugins-granted-caps]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [zed]
        section_id: plugins-lifecycle-diagnostics
        status: answered
        source_refs: [ref-zed-plugins-doc-dev, ref-zed-plugins-doc-wasm, ref-zed-plugins-granted-caps]
---

本章固定来源：官方仓库提交 `5d80b4e784636899e209cae89626c3be4487e14f` 与 `a84689073d296dfd39987bc7dd478e43ef76d83a` 的 `crates/extension/src/extension_manifest.rs`、`crates/extension/src/capabilities.rs`、`crates/extension_api/src/extension_api.rs`、`crates/settings_content/src/extension.rs`、`crates/paths/src/paths.rs`，以及官方文档站的 `docs/extensions/developing-extensions.md`、`docs/extensions/capabilities.md` 快照和仓库内的 `docs/src/extensions/developing-extensions.md`。文档快照不含适用软件版本号，本章按来源级知识阅读；`language_servers` 条目的 opt-in 字段与画廊分类只在新提交上核实过。

## 什么算 Zed 的原生插件 {#plugins-model}

Zed 的「原生插件」是 **extension**：一个 Git 仓库，根目录带 `extension.toml` 清单；需要代码能力的部分用 Rust 写、编译成 WebAssembly 后由 Zed 加载。[@ref-zed-plugins-doc-manifest] 它与本章之外的三类机制边界清晰：

| 机制 | 形态 | 谁执行 |
| :-- | :-- | :-- |
| Extension | Git 仓库 + `extension.toml`（+ wasm 模块） | Zed 内部的扩展宿主，按清单注册能力 [@ref-zed-plugins-manifest] |
| Skill | `SKILL.md` 目录 | 交给模型的指令文本，不执行代码 [@ref-zed-plugins-doc-manifest] |
| MCP server | 由 Zed 或扩展启动的独立进程/远端服务 | 进程自己按 MCP 协议与 Zed 通信 [@ref-zed-mcp-repo-doc-extension] |
| 任务钩子 | `tasks.json` 里的任务模板 | Zed 在事件触发时按普通任务启动 [@ref-zed-plugins-doc-manifest] |

扩展能提供的能力由清单字段穷举：语言、语法、图标主题与主题、语言服务器、MCP server、斜杠命令、代码片段、调试适配器与定位器、语言模型 provider。[@ref-zed-plugins-manifest] 也就是说，扩展是**声明式注册**加上可选的 wasm 实现，而不是把任意代码注入 Zed 进程。[@ref-zed-plugins-doc-wasm]

文档明确只有语言服务器、上下文服务器（MCP）与调试器扩展需要自带 Rust 代码，其余大多数扩展不需要。[@ref-zed-plugins-doc-wasm]

## 插件包格式与元数据 {#plugins-package}

`extension.toml` 的必填字段是 `id`、`name`、`version`、`schema_version`；另有可选的 `description`、`repository`、`authors` 以及一批能力字段。[@ref-zed-plugins-manifest] 清单在源码中的完整形状（默认空集合）：

| 清单键 | 类型 | 作用 |
| :-- | :-- | :-- |
| `themes` / `icon_themes` | 路径数组 | 主题与图标主题 [@ref-zed-plugins-manifest] |
| `languages` | 路径数组 | 语言配置目录 [@ref-zed-plugins-manifest] |
| `grammars` | 名字到条目的映射 | Tree-sitter 语法 [@ref-zed-plugins-manifest] |
| `language_servers` | 名字到条目的映射 | 语言服务器 [@ref-zed-plugins-manifest] |
| `context_servers` | 名字到条目的映射 | MCP server（条目结构为空，命令由代码返回） [@ref-zed-plugins-context-entry] |
| `slash_commands` | 名字到条目的映射 | 斜杠命令 [@ref-zed-plugins-manifest] |
| `snippets` | 单个路径或路径数组 | 片段文件 [@ref-zed-plugins-manifest] |
| `debug_adapters` / `debug_locators` | 名字到条目的映射 | 调试支持 [@ref-zed-plugins-manifest] |
| `language_model_providers` | 名字到条目的映射 | 自定义语言模型 provider [@ref-zed-plugins-manifest] |
| `capabilities` | `ExtensionCapability` 数组 | 扩展声明的所需能力 [@ref-zed-plugins-manifest] |
| `lib` | `LibManifestEntry` | wasm 入口相关声明 [@ref-zed-plugins-manifest] |

`schema_version` 目前仍以 `1` 为当前值，源码里新增了显式的 `SchemaVersion::CURRENT = 1` 常量，并留了一组「下一版 schema」的前置测试：这些测试在 `CURRENT` 仍小于下一版本号时直接跳过，等常量被抬高后才开始断言清单格式（例如把 `languages`、`language_ids` 与 opt-in 语言列表折叠成单一映射）。也就是说扩展作者现在写 `schema_version = 1` 仍是当前格式，清单格式的破坏性变更要等那次抬高才会生效。[@ref-zed-plugins-doc-manifest]

**`language_servers` 条目可以按语言选择默认不启动**。条目上的 `opt_in_languages` 是一个语言名集合，注释写明其中的语言「除非用户在 `language_servers` 设置里显式列出，否则不启动该语言服务器」；字段缺省为空集合，等于所有语言都照旧启动。宿主侧由 `opt_in_languages()` 取出集合、由 `is_opt_in_for(language)` 判断某个语言是否属于 opt-in。[@ref-zed-plugins-manifest-opt-in-languages][@ref-zed-plugins-manifest-opt-in-accessors]

这条字段解决的是扩展自带语言服务器的实际问题：装一个扩展后，它声明的所有语言都会自动拉起对应服务器，而 opt-in 让扩展作者可以只对少数语言默认启用、其余语言等用户显式启用。判断「某语言为什么没有自动启动 LSP」时，除了用户设置里的 `language_servers`，还要看扩展清单里是否把它列进了 opt-in。

它的依据目前只有仓库内源码一处：`crates/extension/src/extension_manifest.rs` 的字段定义与两个访问器。[@ref-zed-plugins-manifest-opt-in-languages][@ref-zed-plugins-manifest-opt-in-accessors] 已检查但未收录该字段的入口有三处——官方文档站的 «Directory Structure of a Zed Extension» 与 «Rust and WebAssembly» 两节、仓库内 `docs/src/extensions/developing-extensions.md`（该页说明目录结构与画廊分类，未描述 opt-in）、以及「下一版 schema」那组尚未生效的前置测试。因此 `plugins.package` 记为 `partial`：清单的整体格式、必填字段与 wasm 入口有文档依据，`opt_in_languages` 暂时只有源码依据，官方文档站页面本轮内容 hash 未变、尚未收录该字段。[@ref-zed-plugins-doc-manifest][@ref-zed-plugins-doc-wasm][@ref-zed-plugins-repo-doc-categories]

文档给出同样形状的最小清单（`id`、`name`、`version`、`schema_version`、`authors`、`description`、`repository`）：[@ref-zed-plugins-doc-manifest]

```toml
id = "my-extension"
name = "My extension"
version = "0.0.1"
schema_version = 1
authors = ["Your Name (you at example.com)"]
description = "Example extension"
repository = "https://github.com/your-name/my-zed-extension"
```

需要代码的扩展另配 `Cargo.toml`（`crate-type = ["cdylib"]`，依赖 `zed_extension_api`），在 `src/lib.rs` 里实现 `zed::Extension` 并用 `zed::register_extension!` 注册；Zed 使用的目标三元组是 `wasm32-wasip2`。[@ref-zed-plugins-doc-wasm] 宿主侧则通过一个编译期写入的 API 版本常量来做兼容判断：`ZED_API_VERSION` 是 6 字节数组，由构建脚本生成。[@ref-zed-plugins-api-version]

## 安装、发现与加载 {#plugins-install-discovery}

**安装位置**由 `paths::extensions_dir()` 决定，即 Zed 数据目录下的 `extensions/`；该目录有两个子目录，`installed` 放各扩展源码，`work` 放扩展自己产生的文件（例如下载下来的语言服务器）。[@ref-zed-plugins-extensions-dir][@ref-zed-plugins-repo-doc-install] 文档列出各平台的具体路径：macOS 为 `~/Library/Application Support/Zed/extensions`，Linux 为 `$XDG_DATA_HOME/zed/extensions` 或 `~/.local/share/zed/extensions`，Windows 为 `%LOCALAPPDATA%\Zed\extensions`。[@ref-zed-plugins-repo-doc-install]

**安装途径**：

- 通过扩展画廊（`zed::Extensions` 动作或菜单里的 Zed > Extensions）浏览安装。[@ref-zed-plugins-repo-doc-install]
- 开发期用 `Install Dev Extension`（`zed::InstallDevExtension`）选择本地目录安装；若同名扩展已发布安装，发布版本会先被卸载，安装成功后画廊会标注该上游扩展「Overridden by dev extension」。[@ref-zed-plugins-doc-dev]
- 自动化安装/卸载可用设置里的 `auto_install_extensions`。[@ref-zed-plugins-repo-doc-install]

**发现与加载**：宿主按已安装目录识别扩展并读取 `extension.toml`（`ExtensionManifest` 的字段就是加载期的契约），扩展声明 `capabilities` 后由宿主按 `granted_extension_capabilities` 决定实际授予哪些能力。[@ref-zed-plugins-manifest][@ref-zed-plugins-granted-caps] 授予清单里，能力项形如 `{"kind":"process:exec", …}`、`{"kind":"download_file", …}`、`{"kind":"npm:install", …}`；把某项从用户设置里删掉或收窄（例如把 `download_file` 的 host 从 `*` 改成 `github.com`），对应的扩展 API 调用就会返回错误。[@ref-zed-plugins-granted-caps][@ref-zed-plugins-repo-doc-caps]

扩展提供的 MCP server 会被登记为一条 `context_servers` 条目，运行时由扩展代码返回启动命令；文档提醒这条路只适合以二进制或 npm 分发的本地 server，远端 server 用原生 UI 添加。[@ref-zed-mcp-repo-doc-extension][@ref-zed-plugins-api-context-server]

**画廊里的分类是自动派生的**：Zed 按扩展声明的功能把它归入 Extensions 页面的分类，一个扩展提供多项功能时可能同时出现在多个分类里；因此分类位置不能当作扩展身份或优先级的判据。另外，已发布的扩展必须满足官方列出的发布前置条件，其中包含对所提供功能的要求。[@ref-zed-plugins-repo-doc-categories]

## 扩展 API 边界 {#plugins-api}

扩展侧可实现的接口集中在 `Extension` trait，方法名即能力面：语言服务器命令与初始化选项、工作区配置及其 schema、补全/符号标签、斜杠命令的参数补全与执行、MCP server 的命令与配置、文档索引建议、调试适配器二进制与调试场景转换、调试定位器。[@ref-zed-plugins-api-trait][@ref-zed-plugins-api-context-server]

宿主侧的权限边界是 **能力授予**，只有三种：`process:exec`（调用外部命令及其参数白名单）、`download_file`（按 host 与路径白名单下载）、`npm:install`（按包名安装 npm 包）。[@ref-zed-plugins-capability-enum] 用户设置里的 `granted_extension_capabilities` 是数组，逐项写出允许的模式；空数组表示不授予任何能力，文档提示这会让许多扩展失去功能。[@ref-zed-plugins-granted-caps][@ref-zed-plugins-repo-doc-caps]

文档补充了两条对官方扩展 API 的事实：扩展编译到 wasm 后部分 Rust 能力行为不同（例如 `std::env::var` 不按预期工作，应改用 `current_platform` 与 Worktree 相关方法读环境变量与 `PATH`）；`stdout`/`stderr` 会被转发到 Zed 进程，因此可以用 `--foreground` 启动 Zed 看扩展的打印输出。[@ref-zed-plugins-doc-wasm]

## 状态区分与诊断 {#plugins-lifecycle-diagnostics}

固定来源能确证的状态维度：

- **已安装**：扩展目录里存在该扩展的源码目录（`installed` 子目录）。[@ref-zed-plugins-extensions-dir]
- **覆盖关系**：开发扩展安装后，上游发布版本被卸载并由画廊标注为「Overridden by dev extension」，这是「当前生效的是哪一个」的可观察证据。[@ref-zed-plugins-doc-dev]
- **能力授予**：`granted_extension_capabilities` 决定扩展能否调用对应 API；调用被拒时会返回错误，而不是静默降级。[@ref-zed-plugins-granted-caps]
- **语言服务器是否默认启动**：由清单条目的 `opt_in_languages` 与用户 `language_servers` 设置共同决定，opt-in 语言需要用户显式启用。[@ref-zed-plugins-manifest-opt-in-accessors]
- **加载/激活**：扩展的注册能力在清单中声明，宿主按清单识别；具体「哪些扩展已激活、失败原因」的界面入口在固定来源中没有列出。[@ref-zed-plugins-manifest]

**诊断入口**（文档）：排查扩展问题时查看 Zed.log（`zed::OpenLog` 动作）；需要更啰嗦的 INFO 级日志时从命令行用 `zed --foreground` 启动。[@ref-zed-plugins-doc-dev]

**缺口**：固定来源没有给出扩展的启用/禁用开关、版本回退或依赖解析规则，也没有列出「已安装但加载失败」的具体报错展示位置；`extension_api` 的版本兼容矩阵（哪个 `zed_extension_api` 版本对应哪个 Zed 版本）只在文档中以链接形式提到，未落在本次签出的文件集中。[@ref-zed-plugins-api-version][@ref-zed-plugins-doc-wasm] 清单字段 `opt_in_languages` 只有仓库内源码依据，官方文档站 `developing-extensions` 页面本轮 hash 未变、尚未收录该字段，仓库内文档页也未描述它；这一缺口已写进「插件包格式与元数据」一节，并把 `plugins.package` 的状态限制在 `partial`。[@ref-zed-plugins-manifest-opt-in-languages][@ref-zed-plugins-repo-doc-categories]
