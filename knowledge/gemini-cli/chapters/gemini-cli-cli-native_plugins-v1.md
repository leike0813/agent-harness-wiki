---
schema_version: 3
record_kind: production
edition_id: gemini-cli-cli-native_plugins-v1
harness_id: gemini-cli
topic: native_plugins
title: "Gemini CLI 的 extensions：打包格式、安装、发现、扩展点与生命周期"
sections:
  - section_id: plugins-scope
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-plugins-doc-intro]
  - section_id: plugins-model-package
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-mcp-doc-override, ref-gemini-cli-plugins-ref-manifest, ref-gemini-cli-plugins-ref-skills, ref-gemini-cli-skills-manager-discover, ref-gemini-cli-plugins-ref-hooks, ref-gemini-cli-hooks-registry-sources, ref-gemini-cli-plugins-ref-subagents, ref-gemini-cli-agents-doc-extension, ref-gemini-cli-plugins-ref-commands, ref-gemini-cli-plugins-ref-themes, ref-gemini-cli-plugins-ref-policy, ref-gemini-cli-plugins-ref-format, ref-gemini-cli-plugins-manager-load, ref-gemini-cli-plugins-manifest-type, ref-gemini-cli-plugins-manager-config, ref-gemini-cli-plugins-ref-variables, ref-gemini-cli-plugins-ref-settings, ref-gemini-cli-plugins-ref-envsanitize, ref-gemini-cli-mcp-doc-sanitize]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-plugins-ref-install, ref-gemini-cli-plugins-doc-install, ref-gemini-cli-plugins-ref-update, ref-gemini-cli-plugins-ref-link, ref-gemini-cli-plugins-write-link, ref-gemini-cli-plugins-ref-new, ref-gemini-cli-plugins-ref-uninstall, ref-gemini-cli-plugins-ref-disable, ref-gemini-cli-plugins-ref-enable, ref-gemini-cli-plugins-enablement-store, ref-gemini-cli-plugins-enablement-is-enabled, ref-gemini-cli-settings-security-git]
  - section_id: plugins-discovery-api
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-plugins-manager-load, ref-gemini-cli-plugins-manager-build, ref-gemini-cli-plugins-storage, ref-gemini-cli-plugins-ref-manifest, ref-gemini-cli-plugins-ref-conflict, ref-gemini-cli-hooks-registry-sources, ref-gemini-cli-plugins-manager-install, ref-gemini-cli-plugins-ref-format, ref-gemini-cli-plugins-ref-commands, ref-gemini-cli-plugins-ref-hooks, ref-gemini-cli-plugins-ref-skills, ref-gemini-cli-plugins-ref-subagents, ref-gemini-cli-plugins-ref-policy, ref-gemini-cli-plugins-manager-activation, ref-gemini-cli-plugins-ref-envsanitize]
  - section_id: plugins-lifecycle-diagnostics
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-plugins-manager-load, ref-gemini-cli-plugins-enablement-is-enabled, ref-gemini-cli-plugins-manager-activation, ref-gemini-cli-plugins-manager-build, ref-gemini-cli-plugins-ref-hooks, ref-gemini-cli-plugins-ref-format, ref-gemini-cli-settings-experimental-extensions, ref-gemini-cli-plugins-doc-manage, ref-gemini-cli-cmd-extensions, ref-gemini-cli-cli-extensions, ref-gemini-cli-plugins-manager-enable, ref-gemini-cli-plugins-ref-update, ref-gemini-cli-plugins-manager-config, ref-gemini-cli-plugins-ref-envsanitize, ref-gemini-cli-mcp-doc-debug]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model-package
        status: answered
        source_refs: [ref-gemini-cli-plugins-ref-manifest, ref-gemini-cli-plugins-ref-skills, ref-gemini-cli-plugins-ref-hooks, ref-gemini-cli-plugins-ref-subagents, ref-gemini-cli-plugins-ref-commands, ref-gemini-cli-plugins-ref-themes, ref-gemini-cli-plugins-ref-policy, ref-gemini-cli-plugins-ref-format, ref-gemini-cli-mcp-doc-override]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-model-package
        status: answered
        source_refs: [ref-gemini-cli-plugins-ref-format, ref-gemini-cli-plugins-ref-manifest, ref-gemini-cli-plugins-manager-load, ref-gemini-cli-plugins-manifest-type, ref-gemini-cli-plugins-manager-config, ref-gemini-cli-plugins-ref-variables, ref-gemini-cli-plugins-ref-settings, ref-gemini-cli-plugins-ref-envsanitize, ref-gemini-cli-mcp-doc-sanitize]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: partial
        source_refs: [ref-gemini-cli-plugins-ref-install, ref-gemini-cli-plugins-doc-install, ref-gemini-cli-plugins-ref-update, ref-gemini-cli-plugins-ref-link, ref-gemini-cli-plugins-write-link, ref-gemini-cli-plugins-ref-new, ref-gemini-cli-plugins-ref-uninstall, ref-gemini-cli-plugins-ref-disable, ref-gemini-cli-plugins-ref-enable, ref-gemini-cli-plugins-enablement-store, ref-gemini-cli-plugins-enablement-is-enabled, ref-gemini-cli-settings-security-git]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-api
        status: answered
        source_refs: [ref-gemini-cli-plugins-manager-load, ref-gemini-cli-plugins-manager-build, ref-gemini-cli-plugins-storage, ref-gemini-cli-plugins-ref-format, ref-gemini-cli-plugins-ref-manifest, ref-gemini-cli-plugins-ref-conflict, ref-gemini-cli-hooks-registry-sources, ref-gemini-cli-plugins-manager-install]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-api
        status: partial
        source_refs: [ref-gemini-cli-plugins-ref-manifest, ref-gemini-cli-plugins-ref-commands, ref-gemini-cli-plugins-ref-hooks, ref-gemini-cli-plugins-ref-skills, ref-gemini-cli-plugins-ref-subagents, ref-gemini-cli-plugins-ref-policy, ref-gemini-cli-plugins-manager-activation, ref-gemini-cli-plugins-ref-envsanitize]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle-diagnostics
        status: answered
        source_refs: [ref-gemini-cli-plugins-manager-load, ref-gemini-cli-plugins-enablement-is-enabled, ref-gemini-cli-plugins-manager-activation, ref-gemini-cli-plugins-manager-build, ref-gemini-cli-plugins-ref-hooks, ref-gemini-cli-plugins-ref-format, ref-gemini-cli-settings-experimental-extensions]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle-diagnostics
        status: partial
        source_refs: [ref-gemini-cli-plugins-doc-manage, ref-gemini-cli-cmd-extensions, ref-gemini-cli-cli-extensions, ref-gemini-cli-plugins-manager-enable, ref-gemini-cli-plugins-ref-update, ref-gemini-cli-plugins-manager-config, ref-gemini-cli-plugins-manager-build, ref-gemini-cli-plugins-ref-envsanitize, ref-gemini-cli-mcp-doc-debug]
---

## 固定来源与适用范围 {#plugins-scope}

本章的固定来源是官方仓库 `google-gemini/gemini-cli` 提交
`38700b4b38bf387dafded6c97c3f190d084b49e9` 的
`docs/extensions/*`、`docs/reference/configuration.md`（`experimental.extension*`、`security`
中与扩展有关的项）、`docs/reference/commands.md` 的 `/extensions` 段，以及
`packages/cli/src/config/extension-manager.ts`、`extension.ts`、`extensions/storage.ts`、`extensions/extensionEnablement.ts`
源码。固定来源未注明适用软件版本，本章是来源级知识。

Gemini CLI 的原生插件机制叫 **extensions**：它把 MCP server、slash 命令、主题、hooks、subagent 与
agent skill 打包成一个可安装、可分享的单元 [@ref-gemini-cli-plugins-doc-intro]。

## 插件模型与包格式 {#plugins-model-package}

**plugins.model**：扩展是"打包与分发单元"，不是一种独立的运行时扩展点。它承载的能力与其它主题的关系：MCP server 通过清单的
`mcpServers` 字段注入，加载方式与 `settings.json` 里的 server 相同（同名时 settings 获胜，扩展 server
不支持
`trust`）[@ref-gemini-cli-mcp-doc-override][@ref-gemini-cli-plugins-ref-manifest]；skill
放在扩展目录的 `skills/` 下，随扩展激活而参与发现
[@ref-gemini-cli-plugins-ref-skills][@ref-gemini-cli-skills-manager-discover]；hooks
放在 `hooks/hooks.json`，与 settings 里的 hook 一起注册
[@ref-gemini-cli-plugins-ref-hooks][@ref-gemini-cli-hooks-registry-sources]；subagent
放在 `agents/`
目录（preview）[@ref-gemini-cli-plugins-ref-subagents][@ref-gemini-cli-agents-doc-extension]；自定义命令放在
`commands/` 的 TOML 文件里，按目录结构生成命令名 [@ref-gemini-cli-plugins-ref-commands]；主题写在清单的
`themes` 数组里 [@ref-gemini-cli-plugins-ref-themes]；策略规则放在 `policies/` 的 TOML
里，进入单独的一层（tier 2），且其中的 `allow` 与 yolo 配置被忽略
[@ref-gemini-cli-plugins-ref-policy]。因此"插件与 Skill / MCP server / Hook 脚本 /
普通包"的区别是：扩展不是新的机制，而是这些既有机制的分发外壳；普通 npm 包不会自动变成扩展，必须提供清单与目录结构
[@ref-gemini-cli-plugins-ref-format]。

**plugins.package**：包根目录必须有一个 `gemini-extension.json`，CLI 从
`~/.gemini/extensions` 的每个子目录加载它
[@ref-gemini-cli-plugins-ref-format][@ref-gemini-cli-plugins-manager-load]。清单字段（文档逐条给出）[@ref-gemini-cli-plugins-ref-manifest]：

| 字段 | 说明 |
| :-- | :-- |
| `name` | 扩展名，用于唯一标识与命令冲突消解；建议小写、用连字符，且与目录名一致 |
| `version` | 版本号 |
| `description` | 展示在扩展页 |
| `migratedTo` | 新仓库地址；设置后 CLI 会去新源检查更新并迁移安装 |
| `mcpServers` | server 名到配置的映射，加载方式同 `settings.json`（不支持 `trust`） |
| `contextFileName` | 上下文文件名；未设置时若扩展目录有 `GEMINI.md` 则用它 |
| `excludeTools` | 从模型可见工具中排除的清单，支持 `run_shell_command(rm -rf)` 这类命令级限制 |
| `settings` | 安装时向用户索取的设置项数组（`name`、`description`、`envVar`、`sensitive`） |
| `themes` | 自定义主题数组 |
| `plan.directory` | 规划产物目录，作为用户未设置时的回退 |

源码里的清单接口 `ExtensionConfig`
与上表一致（`name`、`version`、`mcpServers`、`contextFileName`、`excludeTools`、`settings`、`themes`、`plan.directory`、`migratedTo`），并要求
`name` 与 `version` 必须存在，否则该扩展加载失败
[@ref-gemini-cli-plugins-manifest-type][@ref-gemini-cli-plugins-manager-config]。清单与
`hooks/hooks.json`
里支持三个变量替换：`${extensionPath}`（扩展目录绝对路径）、`${workspacePath}`（当前工作区绝对路径）、`${/}`（平台路径分隔符）[@ref-gemini-cli-plugins-ref-variables]。扩展设置的敏感值存入系统
keychain 并在界面中混淆，非敏感值写入扩展目录下的 `.env`
[@ref-gemini-cli-plugins-ref-settings]；子进程（扩展与 MCP server）只继承安全变量与清单 `settings`
中显式声明的变量，其余被过滤
[@ref-gemini-cli-plugins-ref-envsanitize][@ref-gemini-cli-mcp-doc-sanitize]。

## 安装、固定版本与卸载 {#plugins-install}

**plugins.install**：安装源是 GitHub 仓库或本地路径，两者都可带 `--ref` 固定分支、tag 或
commit；`--auto-update` 打开自动更新，`--pre-release` 允许预发布版本，`--consent`
跳过安全确认，`--skip-settings` 跳过安装时的配置流程
[@ref-gemini-cli-plugins-ref-install][@ref-gemini-cli-plugins-doc-install]。安装是**复制**而非引用：装完之后要拉取源上的新内容必须运行
`gemini extensions update NAME`（或 `--all`），从 GitHub 安装需要本机有 `git`
[@ref-gemini-cli-plugins-ref-install][@ref-gemini-cli-plugins-ref-update]。开发期用
`gemini extensions link PATH` 建立符号链接，改完立刻生效，不必重装
[@ref-gemini-cli-plugins-ref-link][@ref-gemini-cli-plugins-write-link]。`gemini extensions new PATH [TEMPLATE]`
从内置模板（如 `mcp-server`、`context`、`custom-commands`）生成骨架
[@ref-gemini-cli-plugins-ref-new]。卸载用
`gemini extensions uninstall NAME...`，可一次多个
[@ref-gemini-cli-plugins-ref-uninstall]。作用域：扩展默认全局启用，`gemini extensions enable|disable NAME [--scope user|workspace]`
按用户或工作区切换；实现上的启用状态是按当前工作目录路径匹配的覆盖规则表，最后一条匹配规则生效，存在
`~/.gemini/extensions/extension-enablement.json`（源码）[@ref-gemini-cli-plugins-ref-disable][@ref-gemini-cli-plugins-ref-enable][@ref-gemini-cli-plugins-enablement-store][@ref-gemini-cli-plugins-enablement-is-enabled]。版本固定来自清单的
`version` 与安装时的 `--ref`；文档没有给出把已安装扩展钉死在某个版本并禁止更新的开关（`--auto-update`
只控制自动更新），这一点按 partial 阅读 [@ref-gemini-cli-plugins-ref-install]。企业侧还可用
`security.blockGitExtensions` 禁止从 Git 安装与加载、`security.allowedExtensions`
用正则白名单（非空时按白名单过滤，且优先于前者）[@ref-gemini-cli-settings-security-git]。

## 发现、加载与可扩展点 {#plugins-discovery-api}

**plugins.discovery**：加载入口是 `ExtensionManager.loadExtensions()`，只扫描
`~/.gemini/extensions` 的直接子目录（`Storage(homedir()).getExtensionsDir()`，即
`~/.gemini/extensions`），每个子目录按 `gemini-extension.json` 解析成一个扩展
[@ref-gemini-cli-plugins-ref-format]；没有该目录时返回空列表；同名扩展会抛错；单个扩展构建失败只记录警告并跳过该扩展
[@ref-gemini-cli-plugins-manager-load][@ref-gemini-cli-plugins-manager-build][@ref-gemini-cli-plugins-storage]。会话启动时加载全部扩展并合并配置，冲突时工作区配置优先
[@ref-gemini-cli-plugins-ref-manifest]。命令名的冲突消解：扩展命令优先级最低，与用户/项目命令同名时给扩展命令加前缀（形如
`/gcp.deploy`）[@ref-gemini-cli-plugins-ref-conflict]。加载顺序：`admin.extensions.enabled`
为 false 时直接不加载任何扩展（源码），扩展提供的 hook 在 hook 注册表里排在 settings 之后
[@ref-gemini-cli-plugins-manager-load][@ref-gemini-cli-hooks-registry-sources]。完整性：管理器在安装时把安装元数据写入扩展目录并存储完整性记录，加载时可调用
`verifyExtensionIntegrity` 校验 [@ref-gemini-cli-plugins-manager-install]。

**plugins.api**：扩展能注册的能力就是清单字段加固定目录：[清单字段
`mcpServers`/`contextFileName`/`excludeTools`/`settings`/`themes`/`plan`/`migratedTo`][@ref-gemini-cli-plugins-ref-manifest]；目录
`commands/`（TOML 命令）、`hooks/hooks.json`、`skills/`、`agents/`、`policies/`（tier
2，`allow` 与 yolo
被忽略，因此扩展无法自动批准工具调用）[@ref-gemini-cli-plugins-ref-commands][@ref-gemini-cli-plugins-ref-hooks][@ref-gemini-cli-plugins-ref-skills][@ref-gemini-cli-plugins-ref-subagents][@ref-gemini-cli-plugins-ref-policy]。源码侧把这些汇总成
`GeminiCLIExtension` 对象（含
`contextFiles`、`mcpServers`、`excludeTools`、`hooks`、`skills`、`agents`、`themes`、`rules`、`checkers`、`settings`、`plan`、`installMetadata`、`isActive`、`id`）[@ref-gemini-cli-plugins-manager-activation]。权限边界：扩展不能绕过确认对话框（策略里的
`allow` 被忽略），敏感环境变量默认不传递，必须显式声明
[@ref-gemini-cli-plugins-ref-policy][@ref-gemini-cli-plugins-ref-envsanitize]。缺口：登记来源没有给出扩展可用的宿主
API/SDK（例如扩展能否直接调用 CLI 内部接口）；文档描述的能力全部是"声明式贡献"，没有命令式 API 层。partial。

## 生命周期与诊断 {#plugins-lifecycle-diagnostics}

**plugins.lifecycle**：可观察状态分几层。已安装：`~/.gemini/extensions` 下的子目录
[@ref-gemini-cli-plugins-manager-load]。已启用：由 `extension-enablement.json`
的路径覆盖规则决定，`isActive` 即该判定的结果；`gemini -e none` 之类只启用列表中的扩展属于会话级覆盖
[@ref-gemini-cli-plugins-enablement-is-enabled][@ref-gemini-cli-plugins-manager-activation]。已加载：`loadExtensions()`
构建完成的对象；构建失败会跳过并记录 [@ref-gemini-cli-plugins-manager-build]。已激活的贡献：主题在启动时注册、命令在
`/commands` 中可见、MCP server 参与发现、skill 参与发现、hook 进入注册表
[@ref-gemini-cli-plugins-manager-activation][@ref-gemini-cli-plugins-ref-hooks]。管理操作（安装、更新、启停）在交互模式里不支持，需在终端执行；对斜杠命令的更新要重启会话才生效
[@ref-gemini-cli-plugins-ref-format]。`experimental.extensionManagement`（默认
true）、`experimental.extensionConfig`（默认
true）、`experimental.extensionRegistry`（默认
false）、`experimental.extensionRegistryURI`（默认官方 extensions
目录）、`experimental.extensionReloading`（默认
false，允许在会话内加载/卸载扩展）这些开关都会改变上述状态的可达性，且都标记需要重启
[@ref-gemini-cli-settings-experimental-extensions]。

**plugins.diagnostics**：查询入口——`/extensions list`
查看已安装扩展及其状态，`/extensions config|enable|disable|install|link|uninstall|update|restart|explore`
在会话内管理
[@ref-gemini-cli-plugins-doc-manage][@ref-gemini-cli-cmd-extensions]；终端等价物是
`gemini extensions list` 等一组命令，另有 `gemini extensions validate PATH` 校验扩展结构
[@ref-gemini-cli-cli-extensions]。版本可见性：`gemini extensions list`
输出扩展名与版本（源码里的状态行形如 `NAME (VERSION)`），`gemini extensions update` 会打印原版本与新版本
[@ref-gemini-cli-plugins-manager-enable][@ref-gemini-cli-plugins-ref-update]。加载错误的定位：清单缺失
`name`/`version` 会直接失败 [@ref-gemini-cli-plugins-manager-config]；单个扩展构建异常只写警告并跳过
[@ref-gemini-cli-plugins-manager-build]；扩展与 MCP server
的环境变量被过滤、设置项未声明都会导致运行期行为缺失，文档建议用 `--debug` 与扩展设置入口排查
[@ref-gemini-cli-plugins-ref-envsanitize][@ref-gemini-cli-mcp-doc-debug]。缺口：没有把"已安装
/ 已启用 / 已加载 / 已激活 / 依赖或兼容错误"拆成独立诊断输出的命令，也没有列出扩展依赖声明机制（清单里没有 dependencies 字段）；这两点
partial。
