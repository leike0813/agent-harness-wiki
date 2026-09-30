---
schema_version: 3
record_kind: production
edition_id: codex-cli-native_plugins-v2
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
  - section_id: plugins-install-discovery
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-plugins-cmd-source
      - ref-codex-cli-plugins-marketplace-config
      - ref-codex-cli-plugins-discoverable-source
      - ref-codex-cli-plugins-loader-source
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-plugins-manifest-source
      - ref-codex-cli-plugins-mcp-policy-config
  - section_id: plugins-lifecycle-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-plugins-loader-source
      - ref-codex-cli-plugins-enabled-config
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
        section_id: plugins-api
        status: answered
        source_refs:
          - ref-codex-cli-plugins-manifest-source
          - ref-codex-cli-plugins-mcp-policy-config
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle-diagnostics
        status: partial
        source_refs:
          - ref-codex-cli-plugins-loader-source
          - ref-codex-cli-plugins-enabled-config
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle-diagnostics
        status: partial
        source_refs:
          - ref-codex-cli-plugins-cmd-source
          - ref-codex-cli-plugins-loader-source
---

本主题的固定来源是官方文档快照与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文只陈述来源范围内的机制。

## 插件模型与包格式 {#plugins-model-package}

插件是分发单元，可包含一个或多个 skill，并可选打包 MCP server 连接、MCP server 配置与展示资源。文档把 skill 描述为编写格式，把插件描述为把它交付给他人的打包方式，因此插件与 skill、MCP server、普通包不是同一层概念。[@ref-codex-cli-plugins-distribute-doc][@ref-codex-cli-plugins-manifest-source]

清单文件名是 `plugin.json`（源码常量 `AGENT_PLUGIN_MANIFEST_RELATIVE_PATH`）。第一方字段为 `name`、`version`、`description`、`keywords`、`skills`、`mcp_servers`、`apps`、`hooks`、`interface`、`extensions`（camelCase）；`skills` 与 `mcp_servers` 等路径字段用 `./...` 语法，解析前会先校验语法。[@ref-codex-cli-plugins-manifest-source][@ref-codex-cli-plugins-manifest-path-source]

放在插件根目录的一个完整最小清单：

```json
{
  "name": "sample",
  "version": "0.1.0",
  "description": "Bundles one skill and one tool server.",
  "skills": ["./skills/sample"],
  "mcp_servers": "./mcp.json"
}
```

字段与检查：`name` 与 `version` 标识插件，`skills` 与 `mcp_servers` 是相对插件根的路径，必须以 `./` 开头。前提是文件位于插件根且名为 `plugin.json`。结果是宿主能解析清单并加载声明的 skill 与 server；可观察的检查见本页诊断小节。

## 安装、发现与加载 {#plugins-install-discovery}

CLI 提供 `codex plugin add PLUGIN@MARKETPLACE`、`codex plugin remove`、`codex plugin list`（`--available --json`）以及 `codex plugin marketplace add/list/upgrade/remove`。[@ref-codex-cli-plugins-cmd-source] marketplace 在 config 中用 `marketplaces.NAME.source_type`（`git` 或 `local`）与 `source`、`ref` 定义，`ref` 可固定分支、标签或提交；本地源需绝对路径，且目录内包含 `.agents/plugins/marketplace.json`。[@ref-codex-cli-plugins-marketplace-config]

远程 marketplace 与本地 marketplace 的两个完整块，均写入 `~/.codex/config.toml`：

```toml
[marketplaces.my-marketplace]
source_type = "git"
source = "https://github.com/example/plugins"
ref = "main"
```

```toml
[marketplaces.local-marketplace]
source_type = "local"
source = "/srv/plugin-marketplace"
```

字段与检查：git 源用 `source` 指向仓库、`ref` 固定分支或提交；local 源必须用绝对路径，且目录内有 `.agents/plugins/marketplace.json`。前提是 marketplace 定义写在一个被加载的配置层；结果是 `codex plugin marketplace list` 能看到它，之后 `codex plugin add PLUGIN@MARKETPLACE` 才能安装其中的插件。[@ref-codex-cli-plugins-marketplace-config]

可发现的插件清单路径是 `.codex-plugin/plugin.json`、`.claude-plugin/plugin.json`、`.cursor-plugin/plugin.json`。加载时 `load_plugins_from_layer_stack` 把配置插件与远端已安装插件快照合并，并在加载阶段记录错误。[@ref-codex-cli-plugins-discoverable-source][@ref-codex-cli-plugins-loader-source]

## 扩展点与 MCP 策略 {#plugins-api}

清单可注册 `skills`、`mcp_servers`、`apps`、`hooks` 与 `interface` 等资源。插件提供的 MCP server 的策略可在 `plugins.PLUGIN.mcp_servers.SERVER` 下控制（`enabled`、`enabled_tools`、`disabled_tools`、审批模式），不必改动插件清单。[@ref-codex-cli-plugins-manifest-source][@ref-codex-cli-plugins-mcp-policy-config]

```toml
[plugins."sample@my-marketplace".mcp_servers.sample]
enabled = true
default_tools_approval_mode = "prompt"
enabled_tools = ["read", "search"]
```

字段与检查：`enabled` 控制该 server 的开关，`default_tools_approval_mode` 与 `enabled_tools` 控制审批与可见工具。前提是插件已安装，且 server 名与插件清单里声明的一致；结果是不改插件清单即可调整它的工具策略。[@ref-codex-cli-plugins-mcp-policy-config]

## 生命周期与诊断 {#plugins-lifecycle-diagnostics}

生命周期状态 partial：可区分的是"已配置（`plugins.PLUGIN.enabled`）"、"已安装（marketplace 缓存）"、"已加载（加载器返回 `LoadedPlugin` 并记录错误）"；marketplace 刷新即使插件被禁用也可能安装或刷新。固定来源没有把"已安装/启用/发现/加载/激活/健康"全部拆成各自可观察的状态。[@ref-codex-cli-plugins-loader-source][@ref-codex-cli-plugins-enabled-config]

按 `plugin-name@marketplace-name` 键关闭一个本地 marketplace 插件：

```toml
[plugins."sample@my-marketplace"]
enabled = false
```

字段与检查：键是 `plugin-name@marketplace-name`，`enabled = false` 关闭该插件。前提是它来自本地 marketplace；结果是它不再加载，但 marketplace 刷新仍可能安装或更新它的字节。[@ref-codex-cli-plugins-enabled-config]

诊断状态 partial：`codex plugin list --json` 可查看插件与 marketplace，加载错误由加载器记录。固定来源没有给出查询插件版本与运行健康状态、或定位依赖与兼容错误的专门入口。[@ref-codex-cli-plugins-cmd-source][@ref-codex-cli-plugins-loader-source]
