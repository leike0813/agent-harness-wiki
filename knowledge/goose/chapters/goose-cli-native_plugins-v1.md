---
schema_version: 3
record_kind: production
edition_id: goose-cli-native_plugins-v1
harness_id: goose
topic: native_plugins
title: "Goose CLI 原生插件：模型、包格式、安装、发现、能力与诊断"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-goose-plugin-doc-provide, ref-goose-plugin-src-dirs, ref-goose-plugin-src-format, ref-goose-plugin-src-manifests, ref-goose-plugin-src-markers]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-goose-plugin-doc-formats, ref-goose-plugin-doc-structure, ref-goose-plugin-src-gemini-manifest, ref-goose-plugin-src-manifest-fields, ref-goose-plugin-src-name-infer, ref-goose-plugin-src-name-rules, ref-goose-plugin-src-path-safety, ref-goose-plugin-src-version-default]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-goose-plugin-cli-doc, ref-goose-plugin-doc-disable, ref-goose-plugin-doc-install, ref-goose-plugin-src-autoupdate-select, ref-goose-plugin-src-autoupdate-trigger, ref-goose-plugin-src-cli-surface, ref-goose-plugin-src-clone, ref-goose-plugin-src-collision, ref-goose-plugin-src-install-dir, ref-goose-plugin-src-metadata, ref-goose-plugin-src-staging, ref-goose-plugin-src-update-flow]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-goose-plugin-doc-locations, ref-goose-plugin-src-config-key, ref-goose-plugin-src-dirs, ref-goose-plugin-src-precedence, ref-goose-plugin-src-settings-files]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-goose-plugin-doc-formats, ref-goose-plugin-doc-provide, ref-goose-plugin-src-gemini-skills, ref-goose-plugin-src-mcp-load, ref-goose-plugin-src-mcp-naming, ref-goose-plugin-src-mcp-validation, ref-goose-plugin-src-namespace, ref-goose-plugin-src-path-safety, ref-goose-plugin-src-skill-dirs]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-plugin-doc-install, ref-goose-plugin-src-cli-output, ref-goose-plugin-src-config-key, ref-goose-plugin-src-dirs, ref-goose-plugin-src-dispatch, ref-goose-plugin-src-gemini-defer, ref-goose-plugin-src-hooks-load, ref-goose-plugin-src-mcp-load, ref-goose-plugin-src-metadata, ref-goose-plugin-src-precedence, ref-goose-plugin-src-settings-files]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-goose-plugin-doc-provide, ref-goose-plugin-src-dirs, ref-goose-plugin-src-format, ref-goose-plugin-src-manifests, ref-goose-plugin-src-markers]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-goose-plugin-doc-formats, ref-goose-plugin-doc-structure, ref-goose-plugin-src-gemini-manifest, ref-goose-plugin-src-manifest-fields, ref-goose-plugin-src-name-infer, ref-goose-plugin-src-name-rules, ref-goose-plugin-src-path-safety, ref-goose-plugin-src-version-default]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-goose-plugin-cli-doc, ref-goose-plugin-doc-disable, ref-goose-plugin-doc-install, ref-goose-plugin-src-autoupdate-select, ref-goose-plugin-src-autoupdate-trigger, ref-goose-plugin-src-cli-surface, ref-goose-plugin-src-clone, ref-goose-plugin-src-collision, ref-goose-plugin-src-install-dir, ref-goose-plugin-src-metadata, ref-goose-plugin-src-staging, ref-goose-plugin-src-update-flow]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-goose-plugin-doc-locations, ref-goose-plugin-src-config-key, ref-goose-plugin-src-dirs, ref-goose-plugin-src-precedence, ref-goose-plugin-src-settings-files]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: partial
        source_refs: [ref-goose-plugin-doc-formats, ref-goose-plugin-doc-provide, ref-goose-plugin-src-gemini-skills, ref-goose-plugin-src-mcp-load, ref-goose-plugin-src-mcp-naming, ref-goose-plugin-src-mcp-validation, ref-goose-plugin-src-namespace, ref-goose-plugin-src-path-safety, ref-goose-plugin-src-skill-dirs]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: answered
        source_refs: [ref-goose-plugin-doc-install, ref-goose-plugin-src-cli-output, ref-goose-plugin-src-config-key, ref-goose-plugin-src-dirs, ref-goose-plugin-src-dispatch, ref-goose-plugin-src-gemini-defer, ref-goose-plugin-src-hooks-load, ref-goose-plugin-src-mcp-load, ref-goose-plugin-src-metadata, ref-goose-plugin-src-precedence, ref-goose-plugin-src-settings-files]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-goose-plugin-doc-install, ref-goose-plugin-src-cli-output, ref-goose-plugin-src-config-key, ref-goose-plugin-src-dirs, ref-goose-plugin-src-dispatch, ref-goose-plugin-src-gemini-defer, ref-goose-plugin-src-hooks-load, ref-goose-plugin-src-mcp-load, ref-goose-plugin-src-metadata, ref-goose-plugin-src-precedence, ref-goose-plugin-src-settings-files]
---

本节固定来源：仓库 `block/goose` 提交 `ac15f938` 的官方 Plugins 文档与 Rust 源码快照。插件（plugin）是 goose 的原生扩展打包单位：一个磁盘目录，可以携带技能、钩子（以及按格式声明的 MCP server 定义），用 `goose plugin install` 从 git 安装到用户插件目录 [@ref-goose-plugin-doc-install]。文档快照不含适用软件版本号，本章为来源级知识。

## 什么算宿主原生插件 {#plugins-model}

在固定源码里，插件不是运行时加载的动态库，而是「被发现的目录」：`discover_enabled_plugins` 只枚举插件目录的直接子目录，逐个判断格式并过滤启用状态 [@ref-goose-plugin-src-dirs]。格式枚举只有两种：`gemini` 与 `open-plugins` [@ref-goose-plugin-src-format]。

与其它机制的关系，按源码可核对的部分：

| 机制 | 与插件的关系 |
| --- | --- |
| Skill | 插件可提供技能目录；Open Plugins 安装时把技能名改写为 `PLUGIN:SKILL`，Gemini 格式保留原名 |
| Hook | 插件可提供 `ROOT/hooks/hooks.json`，由钩子加载器对已启用插件逐个读取 |
| MCP server | 插件可提供 `.mcp.json` 或清单内 `mcpServers`，转换为 `ExtensionConfig::Stdio`，名字形如 `PLUGIN:SERVER` |
| 普通包 | 插件没有包管理器、没有版本兼容声明，安装即「把目录克隆到插件目录」 |

Open Plugins 的识别条件是三种清单之一（`.goose-plugin/plugin.json`、`.plugin/plugin.json`、`plugin.json`，按此顺序取第一个存在的）或者任一组件标记 [@ref-goose-plugin-src-manifests]。组件标记是 `hooks/hooks.json`、`commands`、`agents`、`.mcp.json` 这四个路径（文件或目录皆可）[@ref-goose-plugin-src-markers]。官方文档把可提供组件概括为技能与钩子，并给出「插件是容器、技能与钩子是容器里的组件」的说法 [@ref-goose-plugin-doc-provide]。

缺口：`commands` 与 `agents` 只参与格式判定，本次快照中没有任何代码在运行时消费这两类组件，因此它们是否真的提供能力未被来源确立。

## 插件包格式、清单与命名规则 {#plugins-package}

两种格式的清单与必需字段完全不同：

| 格式 | 清单文件 | 字段 | 备注 |
| --- | --- | --- | --- |
| Open Plugins | `plugin.json`（或 `.plugin/plugin.json`、`.goose-plugin/plugin.json`） | `name`、`version`、`skills`、`mcpServers`，**全部可选** | 未知字段忽略；`skills`/`mcpServers` 可为字符串、数组或 `{paths, exclusive}` 对象 |
| Gemini extensions | `gemini-extension.json` | `name`、`version`，**均必需**（字符串） | 解析失败即安装失败；只支持技能 |

Open Plugins 清单字段来自 `OpenPluginsManifest`，四个字段都用 `serde(default)`，因此一个只有组件目录、没有清单的仓库也能被识别 [@ref-goose-plugin-src-manifest-fields]。Gemini 清单要求 `name` 与 `version` 都存在 [@ref-goose-plugin-src-gemini-manifest]。

版本语义很弱：Open Plugins 缺少 `version` 时写入字面量 `"unknown"` [@ref-goose-plugin-src-version-default]，两种格式都没有 minimum-goose-version / API 版本 / semver 校验字段。

名称规则与推断：清单 `name` 缺失或为空时，从源 URL 的最后一个非空路径段推断（去掉尾部 `/` 与 `.git`），否则用插件目录名，最后兜底为 `"plugin"` [@ref-goose-plugin-src-name-infer]。校验规则是 1–64 字符、只允许小写字母数字与 `-`/`.`、首尾必须是字母数字、不得包含连续 `--` 或 `..`，违规直接安装失败并给出说明 [@ref-goose-plugin-src-name-rules]；Gemini 侧的名字只允许 ASCII 字母数字与 `-` [@ref-goose-plugin-src-gemini-manifest]。

文档给出的清单示例只有 `name`、`version`、`description` [@ref-goose-plugin-doc-structure]；源码不读取 `description`，它只作为清单里的自由字段存在。文档另外列出两种格式的常见文件与「无清单时可从 `hooks/hooks.json` 发现钩子型插件、名称由来源或目录名推断」的说明 [@ref-goose-plugin-doc-formats]。

组件路径安全：清单里声明的组件路径必须以 `./` 开头、不得是绝对路径、不得包含 `..`，否则安装失败 [@ref-goose-plugin-src-path-safety]。

## 安装、更新与禁用 {#plugins-install}

安装只接受 git 源：`goose plugin install URL` 会浅克隆该仓库，检测格式、把内容复制进插件目录并汇报导入的组件 [@ref-goose-plugin-doc-install]。源码对应实现为 `git clone --depth 1 SOURCE TEMP/checkout`，克隆失败会把 git 的 stderr/stdout 带进错误信息 [@ref-goose-plugin-src-clone]。

* 安装位置：用户插件目录 `~/.agents/plugins/PLUGIN_NAME/`；源码里 `plugin_install_dir()` 就是 `Paths::plugins_dir()`，在设置了绝对路径的 `GOOSE_PATH_ROOT` 时变成 `GOOSE_PATH_ROOT/.agents/plugins`，否则是 `HOME/.agents/plugins` [@ref-goose-plugin-src-install-dir]。
* 覆盖率检测：目标目录已存在（或同名插件已安装）时直接报错中止，不改动已有目录 [@ref-goose-plugin-src-collision]。
* 原子性：安装先在插件目录下建临时目录写全，再用一次 `fs::rename` 落位，失败不会留下半个插件 [@ref-goose-plugin-src-staging]。
* 元数据：每次安装写入 `.goose-plugin-install.json`，字段为 `source`、`source_type`（固定 `"git"`）、`format`、`auto_update`、`last_update_check` [@ref-goose-plugin-src-metadata]。
* 自动更新：`--auto-update` 会把 `auto_update: true` 写进元数据；自动更新只在用户插件目录里挑选「元数据可读、`source_type == "git"`、`auto_update: true` 且距上次检查满 24 小时」的插件，并在重新克隆前先标记检查时间 [@ref-goose-plugin-src-autoupdate-select]（间隔常量 `AUTO_UPDATE_INTERVAL_HOURS = 24` 与元数据文件名同处声明 [@ref-goose-plugin-src-metadata]）。触发时机是「收集插件技能目录」这一动作的副作用，单个插件更新失败只记警告并继续用已装版本 [@ref-goose-plugin-src-autoupdate-trigger]。
* 手动更新：`goose plugin update NAME` 要求该名字是已安装目录且元数据可读、`source_type == "git"`，重新克隆后校验新名字一致，再交换目录并保留原有的 `auto_update` 状态 [@ref-goose-plugin-src-update-flow]。
* 禁用：把插件名加入 `disabledPlugins` 后，它在发现阶段就被跳过，技能不加载、钩子不运行 [@ref-goose-plugin-doc-disable]。设置文件的作用域与优先级见下一节。

CLI 表面只有 `install [--auto-update] URL` 与 `update NAME` 两个子命令，`goose plugin --help` 之外没有 uninstall/list/enable/disable [@ref-goose-plugin-src-cli-surface]；文档同样只记录这两条命令 [@ref-goose-plugin-cli-doc]。

缺口：快照内没有卸载实现，也没有 CLI 级卸载入口——要移除插件只能手动删除目录（源码内检索 `uninstall`/`remove_plugin` 无结果）；安装始终写用户插件目录，没有项目级安装开关；`clone_git_repo` 使用环境里的 `git`，不接受分支/tag/子模块参数，也没有认证处理。

## 发现、作用域与启用判定 {#plugins-discovery}

发现范围是两层直接子目录：项目目录 `PROJECT/.agents/plugins`（当传入项目根且它与用户目录不是同一路径时）加上用户插件目录 `Paths::plugins_dir()` [@ref-goose-plugin-src-dirs]。只取直接子目录，不做嵌套或递归发现 [@ref-goose-plugin-src-dirs]。

启用判定是三道闸门，按顺序：

1. 设置文件：`enabledPlugins`/`disabledPlugins` 两个字符串数组，作用域优先 Local > Project > User，第一个列出该名字的作用域说了算（disabled 判否、enabled 判是），都没列出则默认启用 [@ref-goose-plugin-src-precedence]。设置文件路径：用户 `~/.config/goose/settings.json`（`GOOSE_PATH_ROOT` 存在时为 `ROOT/.config/goose/settings.json`）、项目 `PROJECT/.config/goose/settings.json`、本地 `PROJECT/.config/goose/settings.local.json`；文件不可读或解析失败记警告并跳过 [@ref-goose-plugin-src-settings-files]。
2. `config.yaml` 的 `plugins:` 映射，键是插件的绝对路径，值形如 `{enabled: bool}`；显式 `false` 的插件被剔除，新发现的插件会被自动写成 `enabled: true` 并持久化（持久化失败只记警告）[@ref-goose-plugin-src-config-key]。
3. 排序与去重：启用插件按作用域（Project=0、User=1）、插件名、根路径排序后，按名字去重保留第一条，因此同名项目插件会遮蔽用户插件；若项目副本被 `config.yaml` 关掉，用户副本仍会被保留 [@ref-goose-plugin-src-dirs]。

文档从用户视角列出两处插件位置与「用户插件目录同时容纳 `goose plugin install` 安装的插件和手工拷贝的插件；只有 git 安装的插件能被 `goose plugin update` 更新」[@ref-goose-plugin-doc-locations]。

## 插件提供的能力与校验 {#plugins-api}

插件在运行时能贡献三类内容：

| 组件 | 来源位置 | 处理方式 |
| --- | --- | --- |
| 技能 | 默认 `skills/` 目录，或清单 `skills` 声明的路径 | 每个含 `SKILL.md` 的目录一层深扫描；Open Plugins 名称改写为 `PLUGIN:SKILL` |
| 钩子 | `hooks/hooks.json` | 由钩子管理器对已启用插件逐个加载 |
| MCP server | 默认 `.mcp.json` 的 `mcpServers`，或清单内 `mcpServers` | 转成 `ExtensionConfig::Stdio`，名字为 `PLUGIN:SERVER`，展开 `${PLUGIN_ROOT}` 并注入 `PLUGIN_ROOT` 环境变量 |

技能根目录的取值规则：插件 `skills/` 目录；清单 `skills` 声明的路径；仅当既无 `skills/` 目录、清单也没有 `skills` 且根下直接有 `SKILL.md` 时，把插件根本身作为技能根 [@ref-goose-plugin-src-skill-dirs]。技能名取 frontmatter `name`，缺失时取目录名，再兜底 `unnamed` [@ref-goose-plugin-src-skill-dirs]。Open Plugins 的技能名在安装时被就地改写成带插件名前缀的形式并写回 `SKILL.md` [@ref-goose-plugin-src-namespace]，文档同样说明导入的技能名带命名空间（如 `my-plugin:review`），Gemini 格式不带前缀 [@ref-goose-plugin-doc-formats]。

MCP server 的转换字段是 `command`（必需）、`args`、`env`、`cwd`，扩展名格式 `{plugin}:{server}`，并做 `${PLUGIN_ROOT}` 文本替换与同名环境变量注入；`timeout` 使用默认扩展超时 [@ref-goose-plugin-src-mcp-naming]。插件携带的 MCP server 由 `.mcp.json`（顶层 `mcpServers` 对象）或清单 `mcpServers`（内联对象或 `paths`/`exclusive` 选择器）提供 [@ref-goose-plugin-src-mcp-load]。

安装期校验：清单内联与 `.mcp.json` 引用的 server 若 `command` 为空白或 JSON 不可解析，安装失败并给出文件名 [@ref-goose-plugin-src-mcp-validation]；组件路径必须相对且不得越界 [@ref-goose-plugin-src-path-safety]；Gemini 格式要求至少有技能，否则报 `does not contain any Gemini skills` [@ref-goose-plugin-src-gemini-skills]。

宿主 API 边界：插件不能调用宿主内部 API，也没有权限清单或沙箱声明；它能做的只是被动的「提供文件」——技能文本、钩子命令、MCP server 定义。文档对安全边界的表述是「插件可能带 goose 会加载的指令和会在本机执行的钩子，只安装可信来源并先审阅内容」[@ref-goose-plugin-doc-provide]。

缺口：`enabled_plugin_mcp_servers` 在本快照中只有定义与测试，没有非测试调用点，因此「插件携带的 MCP server 是否真的接入 agent 的扩展加载」在固定来源内未被证实——安装期校验与公共 API 可读是确定的，运行期接线不确定。

## 生命周期与诊断 {#plugins-diagnostics}

可观察的状态只有四个，且都存在明确入口：已安装（用户插件目录下存在目录与 `.goose-plugin-install.json`）[@ref-goose-plugin-src-metadata] → 已发现（`discover_enabled_plugins` 枚举直接子目录）[@ref-goose-plugin-src-dirs] → 已启用（通过设置文件与 `config.yaml` 两道闸门并按名去重）[@ref-goose-plugin-src-precedence] [@ref-goose-plugin-src-config-key] → 已加载（技能被会话技能发现收进，钩子被钩子管理器读入）[@ref-goose-plugin-src-hooks-load]。没有守护进程、注册表或显式激活步骤。

诊断入口（CLI 输出）：`goose plugin install` 打印 `✓ Installed FORMAT plugin 'NAME' (VERSION)`，随后是 `Source:`、`Location:` 与「无技能导入」或逐条 `- NAME` 的导入技能列表；`update` 打印同样的块，首行是 `Updated` [@ref-goose-plugin-src-cli-output]。文档给出的示例输出把格式写成 `open-plugins`、并列出 `my-plugin:review` 这类带前缀的技能名 [@ref-goose-plugin-doc-install]。

错误分层：显式命令的问题以 anyhow 错误直接返回（清单 JSON 语法错误带文件路径、名字非法、已安装冲突、格式不支持），非致命问题记 `tracing::warn!` 后跳过（设置文件读失败、`config.yaml` 持久化失败、MCP 加载失败、`hooks.json` 非法、自动更新失败）[@ref-goose-plugin-src-mcp-load] [@ref-goose-plugin-src-settings-files]。格式探测顺序是 Open Plugins 优先，只有返回「格式不支持」才尝试 Gemini，两者都不支持时报 `No supported plugin format found` [@ref-goose-plugin-src-dispatch]；无 Open Plugins 清单但存在 `gemini-extension.json` 时会让位给 Gemini [@ref-goose-plugin-src-gemini-defer]。

缺口：没有插件列表/检查/启用禁用类命令，也没有版本对比输出；`goose plugin install` 的输出没有快照测试覆盖，其文案以源码 `println!` 为准。
