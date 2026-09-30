---
schema_version: 3
record_kind: production
edition_id: codex-cli-native_plugins-v1
harness_id: codex
topic: native_plugins
title: "Codex CLI 主题章节：Native plugins"
sections:
  - section_id: plugins-model-package
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-plugins-distribute-doc
      - ref-codex-cli-plugins-manifest-source
      - ref-codex-cli-plugins-manifest-path-source
      - ref-codex-cli-plugins-discoverable-source
  - section_id: plugins-install-discovery
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-plugins-marketplace-config
      - ref-codex-cli-plugins-discoverable-source
      - ref-codex-cli-plugins-cmd-source
      - ref-codex-cli-plugins-loader-source
      - ref-codex-cli-plugins-enabled-config
  - section_id: plugins-api-lifecycle-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-plugins-manifest-source
      - ref-codex-cli-plugins-enabled-config
      - ref-codex-cli-plugins-mcp-policy-config
      - ref-codex-cli-plugins-loader-source
      - ref-codex-cli-plugins-cmd-source
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model-package
        status: answered
        source_refs:
          - ref-codex-cli-plugins-distribute-doc
          - ref-codex-cli-plugins-manifest-source
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-model-package
        status: answered
        source_refs:
          - ref-codex-cli-plugins-manifest-source
          - ref-codex-cli-plugins-manifest-path-source
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install-discovery
        status: answered
        source_refs:
          - ref-codex-cli-plugins-cmd-source
          - ref-codex-cli-plugins-marketplace-config
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-install-discovery
        status: answered
        source_refs:
          - ref-codex-cli-plugins-discoverable-source
          - ref-codex-cli-plugins-loader-source
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api-lifecycle-diagnostics
        status: answered
        source_refs:
          - ref-codex-cli-plugins-manifest-source
          - ref-codex-cli-plugins-mcp-policy-config
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-api-lifecycle-diagnostics
        status: partial
        source_refs:
          - ref-codex-cli-plugins-loader-source
          - ref-codex-cli-plugins-enabled-config
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-api-lifecycle-diagnostics
        status: partial
        source_refs:
          - ref-codex-cli-plugins-cmd-source
          - ref-codex-cli-plugins-loader-source
---

## 插件模型与包格式 {#plugins-model-package}

本节的固定来源是官方文档快照与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文只陈述来源范围内的机制，不把源码提交或未标版本的文档当作某个已安装包版本的行为。

**plugins.model**：插件是分发单元，可包含一个或多个 skill，并可选打包 MCP server 连接、MCP server 配置与展示资源。文档把 skill 描述为编写格式，把插件描述为把它交付给他人的打包方式；因此插件与 skill、MCP server、普通包不是同一层概念。[@ref-codex-cli-plugins-distribute-doc][@ref-codex-cli-plugins-manifest-source]

**plugins.package**：清单文件名是 `plugin.json`（源码常量 `AGENT_PLUGIN_MANIFEST_RELATIVE_PATH`），第一方字段为 `name`、`version`、`description`、`keywords`、`skills`、`mcp_servers`、`apps`、`hooks`、`interface`、`extensions`（camelCase）。`skills` 与 `mcp_servers` 等路径字段用 `./...` 语法，解析前会先校验语法。[@ref-codex-cli-plugins-manifest-source][@ref-codex-cli-plugins-manifest-path-source]

## 安装与发现 {#plugins-install-discovery}

**plugins.install**：CLI 提供 `codex plugin add PLUGIN@MARKETPLACE`、`codex plugin remove`、`codex plugin list`（`--available --json`）以及 `codex plugin marketplace add/list/upgrade/remove`。marketplace 在 config 中用 `marketplaces.NAME.source_type`（`git` 或 `local`）与 `source`、`ref` 定义，`ref` 可固定分支、标签或提交；本地源需绝对路径且目录内包含 `.agents/plugins/marketplace.json`。[@ref-codex-cli-plugins-cmd-source][@ref-codex-cli-plugins-marketplace-config]

**plugins.discovery**：可发现的插件清单路径为 `.codex-plugin/plugin.json`、`.claude-plugin/plugin.json`、`.cursor-plugin/plugin.json`。加载时 `load_plugins_from_layer_stack` 把配置插件与远端已安装插件快照合并，并在加载阶段记录错误。[@ref-codex-cli-plugins-discoverable-source][@ref-codex-cli-plugins-loader-source]

## 扩展点、生命周期与诊断 {#plugins-api-lifecycle-diagnostics}

**plugins.api**：清单可注册 `skills`、`mcp_servers`、`apps`、`hooks` 与 `interface` 等资源。插件提供的 MCP server 的策略可在 `plugins.PLUGIN.mcp_servers.SERVER` 下控制（`enabled`、`enabled_tools`、`disabled_tools`、审批模式），不必改动插件清单。[@ref-codex-cli-plugins-manifest-source][@ref-codex-cli-plugins-mcp-policy-config]

**plugins.lifecycle**：状态 partial。可区分的是"已配置（`plugins.PLUGIN.enabled`）""已安装（marketplace 缓存）""已加载（加载器返回 `LoadedPlugin` 并记录错误）"。`marketplace` 刷新即使插件被禁用也可能安装或刷新。固定来源没有把"已安装/启用/发现/加载/激活/健康"全部拆成各自可观察的状态。[@ref-codex-cli-plugins-loader-source][@ref-codex-cli-plugins-enabled-config]

**plugins.diagnostics**：状态 partial。`codex plugin list --json` 可查看插件与 marketplace，加载错误由加载器记录。固定来源没有给出查询插件版本与运行健康状态、或定位依赖与兼容错误的专门入口。[@ref-codex-cli-plugins-cmd-source][@ref-codex-cli-plugins-loader-source]
