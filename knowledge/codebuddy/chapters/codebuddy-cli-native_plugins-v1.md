---
schema_version: 3
record_kind: production
edition_id: codebuddy-cli-native_plugins-v1
harness_id: codebuddy
topic: native_plugins
title: "CodeBuddy Code（CLI）原生插件机制"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-codebuddy-plugins-model, ref-codebuddy-pluginsref-components, ref-codebuddy-funchooks-mod]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-codebuddy-plugins-structure, ref-codebuddy-pluginsref-required, ref-codebuddy-pluginsref-metadata, ref-codebuddy-pluginsref-paths, ref-codebuddy-pluginsref-env, ref-codebuddy-plugins-defaults]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-codebuddy-marketplaces-overview, ref-codebuddy-pluginsref-scope, ref-codebuddy-pluginsref-cli, ref-codebuddy-marketplaces-manage, ref-codebuddy-marketplaces-official, ref-codebuddy-marketplaces-runtime, ref-codebuddy-pluginsref-dep]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-codebuddy-marketplaces-runtime, ref-codebuddy-pluginsref-dep, ref-codebuddy-pluginsref-cache]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-codebuddy-pluginsref-components, ref-codebuddy-pluginsref-userconfig, ref-codebuddy-funchooks-tier]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuddy-marketplaces-runtime, ref-codebuddy-pluginsref-cli, ref-codebuddy-marketplaces-manage, ref-codebuddy-plugins-troubleshoot, ref-codebuddy-marketplaces-troubleshoot, ref-codebuddy-plugins-test]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-codebuddy-plugins-model, ref-codebuddy-pluginsref-components, ref-codebuddy-funchooks-mod]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-codebuddy-plugins-structure, ref-codebuddy-pluginsref-required, ref-codebuddy-pluginsref-metadata, ref-codebuddy-pluginsref-paths]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-codebuddy-marketplaces-overview, ref-codebuddy-pluginsref-scope, ref-codebuddy-pluginsref-cli, ref-codebuddy-marketplaces-manage]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-codebuddy-marketplaces-runtime, ref-codebuddy-pluginsref-dep, ref-codebuddy-pluginsref-cache]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-codebuddy-pluginsref-components, ref-codebuddy-pluginsref-userconfig, ref-codebuddy-funchooks-tier]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: partial
        source_refs: [ref-codebuddy-marketplaces-runtime, ref-codebuddy-pluginsref-dep]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: answered
        source_refs: [ref-codebuddy-pluginsref-cli, ref-codebuddy-plugins-troubleshoot, ref-codebuddy-marketplaces-troubleshoot]
---

本章固定来源为 CodeBuddy Code 官方文档仓库 `https://cnb.cool/codebuddy/codebuddy-code` 提交 `47ec6f132a3f52925ee999deb782807bf6d82a2b` 的 `docs/plugins.md`、`docs/plugins-reference.md`、`docs/plugin-marketplaces.md`、`docs/function-hooks.md`、`docs/settings.md`、`docs/cli-reference.md`。CodeBuddy Code（CLI）为闭源，本章按来源级知识记录。

机制边界：这里的「原生插件」指 CodeBuddy Code 自有的插件系统（目录 + `.codebuddy-plugin/plugin.json` 清单 + 市场分发），它把 Skills、Agents、Hooks、MCP server、LSP server、命令、输出样式打包成一个可版本化的分发单元；与 Skill、独立 MCP server、裸 hook 脚本、普通 npm 包不是同一层概念。

## 插件模型与边界 {#plugins-model}

官方给出「独立配置 vs 插件」的选择表：`.codebuddy/` 目录下的独立配置使用短名（如 `/hello`），适合个人工作流、项目定制与实验；插件（含 `.codebuddy-plugin/plugin.json` 的目录）使用命名空间名（如 `/plugin-name:hello`），适合团队共享、社区分发、版本化与跨项目复用，命名空间用于避免插件间冲突。[@ref-codebuddy-plugins-model]

插件可携带六类组件：Skills、Agents、Hooks、MCP Servers、LSP Servers 以及命令/输出样式；组件路径可由清单覆盖。[@ref-codebuddy-pluginsref-components] 除声明式插件外，还有 Function Hooks 的 **Mod**——用 TypeScript middleware 扩展引擎关键路径的插件形态，`plugin.json` + `hooks/register.ts` 组成一个 Mod，通过 `--plugin-dir` 装载，且能跨 TUI / Web UI / ACP 客户端复用同一份代码。[@ref-codebuddy-funchooks-mod]

## 包格式与清单 {#plugins-package}

插件目录约定（取自 `docs/plugins.md`「插件结构概述」）：`.codebuddy-plugin/` 只放 `plugin.json` 清单；`commands/`、`agents/`、`skills/`、`hooks/`、`.mcp.json`、`.lsp.json`、`bin/`、`settings.json` 都在插件根目录层级。官方特别提示不要把 `commands/`、`agents/` 等放进 `.codebuddy-plugin/` 内。[@ref-codebuddy-plugins-structure]

清单可选：省略时会自动发现默认位置组件并从目录名派生插件名。包含清单时唯一必需字段是 `name`（kebab-case），它用于组件命名空间（如插件 `plugin-dev` 的代理 `agent-creator` 显示为 `plugin-dev:agent-creator`）。[@ref-codebuddy-pluginsref-required]

元数据与组件字段（同节表格）：`version`（语义化版本，`plugin.json` 优先于 marketplace 条目）、`description`、`author`、`homepage`、`repository`、`license`、`keywords`、`defaultEnabled`（默认 `true`）、`dependencies`；组件路径字段 `commands`、`agents`、`skills`、`hooks`、`mcpServers`、`outputStyles`、`lspServers`、`userConfig`、`channels`。[@ref-codebuddy-pluginsref-metadata]

路径规则：`commands`、`agents`、`skills`、`outputStyles` 的自定义路径**替换**默认目录（不合并），路径须相对于插件根目录并以 `./` 开头；要保留默认目录可把默认目录写进数组。[@ref-codebuddy-pluginsref-paths] 环境变量上有 Claude Code 兼容的三类路径变量，`CLAUDE_*` 与 `CODEBUDDY_*` 互为别名。[@ref-codebuddy-pluginsref-env] 插件根目录的 `settings.json` 可携带默认设置，目前仅支持 `agent` 键，用于把某个自定义代理激活为主线程。[@ref-codebuddy-plugins-defaults]

## 安装、来源与版本 {#plugins-install}

市场（Marketplace）是插件目录文件，支持 GitHub 仓库、Git URL、本地路径、HTTP URL 四类来源，两步流程为「先添加市场、再安装插件」。[@ref-codebuddy-marketplaces-overview] 安装作用域四档：`user`（`~/.codebuddy/settings.json`，默认）、`project`（`.codebuddy/settings.json`）、`local`（`.codebuddy/settings.local.json`）、`managed`（托管设置，只读、仅支持更新）。[@ref-codebuddy-pluginsref-scope]

命令面：`/plugin install <插件名>@<市场名>`（可加 `--scope project`）、`/plugin disable`、`/plugin enable`、`/plugin uninstall`，以及 CLI 侧 `codebuddy plugin install/uninstall/prune/enable/disable/update/list` 与 `codebuddy plugin marketplace add/list/update/remove`。[@ref-codebuddy-pluginsref-cli][@ref-codebuddy-marketplaces-manage] 官方市场在启动时自动可用，示例为 `/plugin install github@codebuddy-plugins-official`。[@ref-codebuddy-marketplaces-official]

`install` 与 `enable` 语义不同：显式 install 会同步解析依赖、写入版本化 `cache/〈marketplace〉/〈plugin〉/〈version〉`、提交 `installed_plugins.json` 并写 enabled state；enable 只声明期望状态，不写 cache/registry。[@ref-codebuddy-marketplaces-runtime] 版本约束通过 Git tag 解析，发布方用 `{plugin-name}--v{version}` 命名 tag，CodeBuddy 合并所有已启用插件对同一依赖的范围并选满足交集的最高版本；缓存目录用声明版本加 12 位 commit SHA 后缀，避免被强移 tag 复用旧内容。[@ref-codebuddy-pluginsref-dep]

## 发现、解析与加载 {#plugins-discovery}

首轮插件投影是 **cache-first** 的：进程只读取各设置作用域的 `enabledPlugins`、`installed_plugins.json` registry 以及 registry 指向的不可变插件 cache；首轮不扫描市场、不访问远端、不修复磁盘状态，已启用插件的依赖闭包也只从同一份 registry 与 cache 解析。具备管理权限的 runtime 会在提交后启动一次后台 reconcile，负责同步市场、补齐插件、迁移旧 cache、应用策略、清理孤儿状态。[@ref-codebuddy-marketplaces-runtime]

运行时只从版本化快照加载插件，不把可变 market source 直接当已安装插件；远端市场先在独立 staging 目录完成下载与完整清单校验，再原子替换 live source；Git 源先浅克隆并在新 commit 就绪后才备份+改名晋升，同 commit 视为 no-op。单个 cache 缺失或加载失败只让对应插件缺席并记录错误，其他插件与 Agent 继续运行。[@ref-codebuddy-marketplaces-runtime]

依赖：`dependencies` 可同时写在 `plugin.json` 与 marketplace 条目中（两处合并）。跨 marketplace 自动安装默认被阻止，须在根插件所属 marketplace 的 `marketplace.json` 里用 `allowCrossMarketplaceDependenciesOn` 显式授权，且不传递信任。启用插件只传递启用已安装的依赖，缺失依赖时启用失败；禁用或卸载仍被依赖的插件会被阻止。[@ref-codebuddy-pluginsref-dep]

路径遍历限制与外部依赖解析规则见 `docs/plugins-reference.md`「四、插件缓存和文件解析」：插件被复制到缓存，引用插件目录外的文件路径无法工作。[@ref-codebuddy-pluginsref-cache]

## 扩展点与宿主 API {#plugins-api}

插件可注册的能力面对应六类组件：Skills（`skills/` 或 `commands/`，`SKILL.md` 目录或简单 Markdown 命令）、Agents（`agents/`，插件代理不支持 `hooks`/`mcpServers`/`permissionMode`）、Hooks（`hooks/hooks.json` 或清单内联，支持 `command`/`http`/`prompt`/`agent` 四种类型）、MCP Servers（`.mcp.json` 或内联）、LSP Servers（`.lsp.json`，提供诊断/跳转/悬停等代码智能）、以及 `outputStyles`。[@ref-codebuddy-pluginsref-components]

插件清单还支持 `userConfig`：声明启用时提示用户输入的值，键须为有效标识符，值可用 `${user_config.KEY}` 在 MCP/LSP 配置与 hook 命令中替换，非敏感值还能在技能/命令/代理内容中替换，并作为 `CODEBUDDY_PLUGIN_OPTION_〈KEY〉` 环境变量导出到插件子进程；非敏感值存 `settings.json` 的 `pluginConfigs[〈plugin-id〉].options`，敏感值存系统密钥链（不可用时存 `~/.codebuddy/.credentials.json`）。[@ref-codebuddy-pluginsref-userconfig]

Mod（Function Hooks）的扩展面更大：把引擎关键路径暴露成带类型的 middleware 事件，可观察/改写/拒绝/替换宿主默认实现，并往 `$` 上挂自定义 noun；mod 组织成 `prepend → user → append → builtin → core` 五层中间件链，外层先执行。[@ref-codebuddy-funchooks-tier]

## 生命周期与诊断 {#plugins-diagnostics}

可观察状态：`installed_plugins.json` 记录已安装插件与依赖（自动安装的依赖标记 `auto: true`），`enabledPlugins` 记录启用状态，`cache/〈marketplace〉/〈plugin〉/〈version〉` 是加载实体。[@ref-codebuddy-marketplaces-runtime] `plugin update` 按不可变 cache 语义执行：声明版本与当前安装版本相同时直接视为 up to date，版本变化时写新版本目录并原子切换 registry，旧 Session 继续引用旧目录。[@ref-codebuddy-marketplaces-runtime]

命令与校验：`codebuddy plugin list`、`/plugin` 交互界面（Discover/Installed/Marketplaces 三个标签）、`codebuddy plugin validate 〈path〉` 与 `/plugin-validate [path]` 校验目录结构与 manifest、`/reload-plugins` 重新加载所有插件（显示插件数、技能数、代理数、钩子数、MCP/LSP server 数统计，无需重启）。[@ref-codebuddy-pluginsref-cli][@ref-codebuddy-marketplaces-manage]

排查（`partial`）：插件未加载时确认已启用、检查 `plugin.json` 格式、运行 `/reload-plugins`、用 `--debug` 查看加载日志；命令不可用时确认命令文件在插件根目录 `commands/` 而非 `.codebuddy-plugin/` 内。[@ref-codebuddy-plugins-troubleshoot] 市场无法加载时验证 URL 可访问且路径中存在 `.codebuddy-plugin/marketplace.json`；安装后文件找不到是缓存复制的预期结果；插件技能不显示时可清缓存 `rm -rf ~/.codebuddy/plugins/cache` 后重启重装。[@ref-codebuddy-marketplaces-troubleshoot] `codebuddy --plugin-dir ./my-plugin` 可在开发期直接加载本地插件，与已安装市场插件同名时本地副本在该会话优先。[@ref-codebuddy-plugins-test]
