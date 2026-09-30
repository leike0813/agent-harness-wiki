---
schema_version: 3
record_kind: production
edition_id: forgecode-cli-native_plugins-v1
harness_id: forgecode
topic: native_plugins
title: "ForgeCode CLI 的原生插件：确认无插件系统与“插件”一词的实际所指"
sections:
  - section_id: plugins-scope
    surface_ids: [cli]
    source_refs: [ref-forgecode-plugins-workspace, ref-forgecode-plugins-zsh-cli]
  - section_id: plugins-absence
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-defaults, ref-forgecode-config-schema-top, ref-forgecode-hooks-nocommand, ref-forgecode-plugins-workspace]
  - section_id: plugins-zsh
    surface_ids: [cli]
    source_refs: [ref-forgecode-install-zsh, ref-forgecode-plugins-zsh-cli, ref-forgecode-plugins-zsh-doc, ref-forgecode-plugins-zsh-readme]
  - section_id: plugins-alternatives
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-permissions-doc, ref-forgecode-config-schema-top, ref-forgecode-plugins-workspace]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-forgecode-plugins-workspace, ref-forgecode-config-schema-top]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-forgecode-plugins-workspace, ref-forgecode-config-schema-top]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-zsh
        status: not_applicable
        source_refs: [ref-forgecode-plugins-zsh-cli, ref-forgecode-install-zsh, ref-forgecode-plugins-zsh-doc]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-forgecode-plugins-workspace, ref-forgecode-hooks-nocommand]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-alternatives
        status: not_applicable
        source_refs: [ref-forgecode-plugins-workspace, ref-forgecode-config-permissions-doc]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-forgecode-plugins-workspace, ref-forgecode-config-schema-top]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-zsh
        status: not_applicable
        source_refs: [ref-forgecode-plugins-zsh-doc, ref-forgecode-plugins-zsh-cli]
---

## 固定来源与界面 {#plugins-scope}

本章依据官方仓库 `tailcallhq/forgecode` 固定 commit `571a28902b9c562594c02fd089fc58bf8595108f` 的检出与 forgecode.dev 官方文档快照。检查过的入口包括：`Cargo.toml` 的工作区成员（是否存在第三方扩展 crate 或宿主 API 层）、`forge.schema.json` 顶层配置键（是否存在插件清单或启用开关）、`crates/forge_main/src/cli.rs` 的 `zsh`/`extension` 子命令组与 `crates/forge_main/src/zsh/plugin.rs`（“plugin”一词的实际所指）、`shell-plugin/` 目录（随仓库发布的 shell 集成）、以及文档站的 `/docs/zsh-support/` 与 `/docs/forge-bin/` 页面。界面口径为 catalog 唯一登记的 `cli`。[@ref-forgecode-plugins-workspace][@ref-forgecode-plugins-zsh-cli]

结论：ForgeCode 的 `cli` 界面**没有原生插件系统**——不存在插件清单、安装/启用命令、宿主 API 或加载器，本篇对应问题全部记 `not_applicable`。产品语境中的“plugin”专指 ZSH 集成脚本，与 Skill、MCP server、Hook 脚本、普通包都不是同一层概念。

## 不存在原生插件模型、包格式与安装通道 {#plugins-absence}

工作区是单一第一方 Rust 工作区：`Cargo.toml` 声明 `members = ["crates/*"]`，所有成员（`forge_api`、`forge_app`、`forge_config`、`forge_domain`、`forge_main`、`forge_repo`、`forge_services` 等）都在本仓库内维护，没有面向第三方插件的 SDK crate 或 dylib/wasm 加载路径 [@ref-forgecode-plugins-workspace]。

配置面同样没有插件入口：`forge.schema.json` 的顶层 `properties` 是运行参数与 `providers`/`retry`/`http`/`[compact]` 等设置，不存在 plugin、extension 或 manifest 键；`.forge.toml` 默认值文件也不含相关段落 [@ref-forgecode-config-schema-top][@ref-forgecode-config-defaults]。CLI 顶层子命令中没有 install/enable/disable 插件的命令族 [@ref-forgecode-hooks-nocommand]。

因此以下问题在固定来源内无机制可述：`plugins.model`（什么算原生插件）、`plugins.package`（包格式与清单）、`plugins.discovery`（发现/校验/依赖/加载顺序）、`plugins.lifecycle`（安装/启用/加载/激活状态）、`plugins.api`（可注册的能力与宿主 API 边界）。它们记 `not_applicable`，依据是“应有而确认不存在”的三处入口检查（工作区成员、schema 顶层键、CLI 子命令），而不是缺少资料。

## “插件”在产品中的唯一含义：ZSH 集成 {#plugins-zsh}

`forge zsh`（别名 `forge extension`）子命令组只做 shell 集成：`plugin` 输出 shell 插件脚本、`theme` 输出主题、`doctor` 做环境诊断、`rprompt` 输出右提示符信息、`setup` 把集成写进 `.zshrc`、`keyboard` 显示行编辑器快捷键、`format` 把文件路径包装成 `@[...]` 语法 [@ref-forgecode-plugins-zsh-cli]。随仓库发布的 `shell-plugin/` 目录就是这套集成的实现（`forge.plugin.zsh`、`forge.setup.zsh`、`forge.theme.zsh`、`lib/actions/*.zsh`），README 说明它的职责是命令改写、文件标注、会话连续性等 shell 侧能力 [@ref-forgecode-plugins-zsh-readme]。

安装方式属于 shell 配置而不是包管理：`forge zsh setup` 写 `.zshrc`，插件启动时用 `source <($FORGE_BIN extension zsh)` 拉取脚本，`$FORGE_BIN` 决定实际使用的二进制路径；文档据此给出多版本并存与本地构建的用法 [@ref-forgecode-install-zsh][@ref-forgecode-plugins-zsh-doc]。所以 `plugins.install`（从哪里安装、如何固定版本/更新/禁用/卸载）与 `plugins.diagnostics`（查询版本与运行状态）在本产品中对应的是“编辑 shell 配置 + `forge --version` + `forge zsh doctor`”，而不是插件管理器；两条问题记 `not_applicable`，其替代入口写在下一节 [@ref-forgecode-plugins-zsh-doc][@ref-forgecode-plugins-zsh-cli]。

## 实际扩展点对照 {#plugins-alternatives}

需要扩展 ForgeCode 行为时，产品提供的四条路径分别对应独立章节，均不构成插件系统：

- MCP server：进程或 HTTP 服务形态的外部工具，导入后自动注册给所有 agent（受项目级 `.mcp.json` 信任门约束）。
- 自定义 agent（`.forge/agents/*.md` 与 `{base_path}/agents/*.md`）与项目级 `AGENTS.md` 规则。
- Skill（`.forge/skills/{name}/SKILL.md`）与自定义命令（`.forge/commands/*.md`）。
- 配置层扩展：`.forge.toml` 的 `[[providers]]` 自定义 provider、`permissions.yaml` 策略 [@ref-forgecode-config-permissions-doc]

这些机制都不提供插件清单、版本声明、依赖解析或宿主 API 生命周期钩子，因此 `plugins.*` 的 `not_applicable` 结论不因它们而改变。[@ref-forgecode-plugins-workspace][@ref-forgecode-config-schema-top]
