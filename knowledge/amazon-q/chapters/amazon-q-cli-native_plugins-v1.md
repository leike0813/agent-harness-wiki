---
schema_version: 3
record_kind: production
edition_id: amazon-q-cli-native_plugins-v1
harness_id: amazon-q
topic: native_plugins
title: "Amazon Q CLI 没有原生插件系统：固定来源检查入口与替代扩展方式"
sections:
  - section_id: plugins-scope
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-intro, ref-amazon-q-docs-command-line-kiro, ref-amazon-q-repo-readme-status]
  - section_id: plugins-absence
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-agent-schema, ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands, ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-repo-format-mcpservers]
  - section_id: plugins-alternatives
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-format-mcpservers, ref-amazon-q-repo-format-tools, ref-amazon-q-docs-mcp-benefits, ref-amazon-q-docs-mcp-concepts, ref-amazon-q-repo-format-hooks, ref-amazon-q-repo-experiments-manage]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-agent-schema]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-agent-schema]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-slash-commands]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-docs-mcp-config-cli]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-root-subcommands, ref-amazon-q-repo-format-sections]
---

## 固定来源与适用范围 {#plugins-scope}

本章的固定来源是官方仓库 `aws/amazon-q-developer-cli`（提交 `15cc8f3cd18c4272925ce1c7053268eedff1ea0a`）的登记文档与源码，以及 AWS 官方用户指南的 CLI/MCP 页面 [@ref-amazon-q-repo-intro][@ref-amazon-q-docs-command-line-kiro]。

产品状态：AWS 用户指南写明 Q CLI 已变为 Kiro CLI [@ref-amazon-q-docs-command-line-kiro]；仓库 README 写明项目不再积极维护、Amazon Q Developer CLI 以闭源 Kiro CLI 继续提供 [@ref-amazon-q-repo-readme-status]。以下结论按该提交的来源级知识阅读，只覆盖 `cli` 界面。

## 结论：固定来源未建立原生插件机制 {#plugins-absence}

"插件"在 Amazon Q CLI 里没有对应实现，检查到的直接入口如下。

- agent 配置字段清单是可枚举的：`name`、`description`、`prompt`、`mcpServers`、`tools`、`toolAliases`、`allowedTools`、`toolsSettings`、`resources`、`hooks`、`useLegacyMcpJson`、`model`；没有插件清单、插件版本、插件入口或兼容声明字段 [@ref-amazon-q-repo-format-sections]。
- 仓库中唯一的 agent schema 是 `schemas/agent-v1.json`，即上述字段的 JSON Schema，没有插件 schema [@ref-amazon-q-repo-agent-schema]。
- 会话内斜杠命令集合（`/agent`、`/context`、`/tools`、`/prompts`、`/hooks`、`/mcp`、`/model`、`/experiment` 等）里没有插件安装、启用或卸载命令 [@ref-amazon-q-repo-slash-commands]。
- 顶层子命令 `agent`、`chat`、`login`、`logout`、`whoami`、`profile`、`settings`、`diagnostic`、`issue`、`version`、`mcp` 里同样没有插件子命令 [@ref-amazon-q-repo-root-subcommands]。
- AWS 文档给出的 CLI 扩展方式是"在 agent 配置里登记 MCP server"，本地与远程 server 都在 agent 的 `mcpServers` 对象下定义，而不是通过插件包安装 [@ref-amazon-q-docs-mcp-config-cli][@ref-amazon-q-repo-format-mcpservers]。

因此本章 7 道题都按 `not_applicable` 记录。缺口说明：以上基于该提交的文档与命令面，不能排除后续开发分支新增能力，也不替代对实际发行版二进制的反查。

## 替代性的扩展方式 {#plugins-alternatives}

固定来源里承担"扩展宿主"职责的是三套既有机制，读者应按它们的入口使用。

其一是 **MCP server**：外部能力在 agent 配置的 `mcpServers` 下用 `command`/`args`/`env`/`timeout`（本地）或 `type`/`url`（远程）声明，工具以 `@server`、`@server/tool` 形式暴露，并被 `tools`、`allowedTools`、`toolsSettings` 约束 [@ref-amazon-q-repo-format-mcpservers][@ref-amazon-q-repo-format-tools]。AWS 文档把其价值总结为可扩展、可定制、生态整合、标准协议、可切换后端与本地数据不出境 [@ref-amazon-q-docs-mcp-benefits]；工具、提示、资源三类能力是其能力面 [@ref-amazon-q-docs-mcp-concepts]。

其二是 **Hook**：在 agent 配置的 `hooks` 字段里，用命令在 `agentSpawn`、`userPromptSubmit`、`preToolUse`、`postToolUse`、`stop` 五个时点插入自定义逻辑，可阻断工具执行 [@ref-amazon-q-repo-format-hooks]。

其三是 **实验特性开关**：这些是宿主自带的实验功能（如 checkpointing、knowledge、delegate），通过 `/experiment` 交互式开关并在设置中持久化，属于第一方功能的灰度开关，不是第三方可安装的插件 [@ref-amazon-q-repo-experiments-manage]。这三者都没有"插件包格式 / 安装来源 / 版本固定 / 启用与禁用生命周期"这一整套东西。
