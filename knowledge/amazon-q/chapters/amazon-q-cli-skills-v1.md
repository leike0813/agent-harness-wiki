---
schema_version: 3
record_kind: production
edition_id: amazon-q-cli-skills-v1
harness_id: amazon-q
topic: skills
title: "Amazon Q CLI 没有 Skill 机制：固定来源检查入口与最接近的替代能力"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-intro, ref-amazon-q-repo-readme-status, ref-amazon-q-docs-command-line-kiro]
  - section_id: skills-absence
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-agent-schema, ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands, ref-amazon-q-repo-kb-enable, ref-amazon-q-repo-kb-how]
  - section_id: skills-alternatives
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-format-resources, ref-amazon-q-repo-migration-context, ref-amazon-q-repo-default-builtin, ref-amazon-q-repo-kb-commands, ref-amazon-q-repo-kb-isolation, ref-amazon-q-repo-format-tools, ref-amazon-q-docs-mcp-concepts]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-agent-schema, ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-slash-commands]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-agent-schema]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-repo-kb-enable, ref-amazon-q-repo-kb-how]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-format-sections]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-absence
        status: not_applicable
        source_refs: [ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands]
---

## 固定来源与产品状态 {#skills-scope}

本章的固定来源有两类。其一是 AWS 官方用户指南中与命令行相关的页面：`https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line.md`（该页现在只说明 Q CLI 已改名为 Kiro CLI）。其二是官方仓库 `aws/amazon-q-developer-cli` 在提交 `15cc8f3cd18c4272925ce1c7053268eedff1ea0a` 上的登记文档与源码。两类来源都只按抓取时刻阅读，文档未注明对应软件版本，因此全章是来源级知识，不绑定任何已发布的 CLI 版本 [@ref-amazon-q-repo-intro][@ref-amazon-q-repo-readme-status][@ref-amazon-q-docs-command-line-kiro]。

AWS 用户指南正文现在写着 "The Q CLI has become the Kiro CLI."，并指向 Kiro 用户指南 [@ref-amazon-q-docs-command-line-kiro]。官方仓库 README 也说明该项目已不再积极维护、只接受关键安全修复，Amazon Q Developer CLI 以闭源的 Kiro CLI 形式继续提供 [@ref-amazon-q-repo-readme-status]。仓库自带的 `docs/` 是补充性开发者文档，明确写着这些文档"experimental, work in progress"，描述的是开发构建而不是最新稳定构建 [@ref-amazon-q-repo-intro]。

本章调查的界面是 `cli`（`q` 命令）。目录中的 `vscode`、`jetbrains` 两个 IDE 界面本轮不调查。

## 结论：固定来源未建立任何 Skill 机制 {#skills-absence}

在登记的固定来源里找不到 Skill 这一层机制，具体检查到的直接入口如下。

- Agent 配置文件的字段清单是可枚举的：`name`、`description`、`prompt`、`mcpServers`、`tools`、`toolAliases`、`allowedTools`、`toolsSettings`、`resources`、`hooks`、`useLegacyMcpJson`、`model`。清单里没有任何 skill、package 或能力包字段 [@ref-amazon-q-repo-format-sections]。
- 仓库中唯一的 agent 配置 schema 是 `schemas/agent-v1.json`，它就是上面字段的 JSON Schema，没有 skill 相关定义 [@ref-amazon-q-repo-agent-schema]。
- CLI 的斜杠命令集合里没有 skill 类命令：`/agent`、`/context`、`/knowledge`、`/tools`、`/prompts`、`/hooks`、`/mcp`、`/model`、`/experiment` 等 [@ref-amazon-q-repo-slash-commands]。
- 顶层子命令是 `agent`、`chat`、`login`、`logout`、`whoami`、`profile`、`settings`、`diagnostic`、`issue`、`version`、`mcp`，同样没有 skill 或 plugin 子命令 [@ref-amazon-q-repo-root-subcommands]。
- 最容易被误当作 Skill 的 `/knowledge` 是检索型知识库（beta，需 `q settings chat.enableKnowledge true` 开启），它把文件切块索引后供检索，不是"名称 + 描述 + 正文按需激活"的 skill 包 [@ref-amazon-q-repo-kb-enable][@ref-amazon-q-repo-kb-how]。

因此本章 9 道题都按 `not_applicable` 记录：固定来源能枚举出 Agent 的全部配置字段与 CLI 的全部命令，其中不存在 Skill 机制。缺口说明：以上结论基于该提交的文档与命令面，不能排除开发分支之后新增能力，也不能替代对实际发行版二进制的反查。

## 最接近的替代机制 {#skills-alternatives}

虽然不存在 Skill，固定来源里有三类机制承担类似作用，读者应按它们各自的入口使用。

其一是 `resources`（旧文档里的 "context files"）：在 agent 配置里用 `file://` URI 声明要纳入上下文的文件或 glob，例如 `file://README.md`、`file://.amazonq/rules/**/*.md`；profile 时代的 `"paths"` 数组已迁移为 `resources` [@ref-amazon-q-repo-format-resources][@ref-amazon-q-repo-migration-context]。内置默认 agent 默认就带上 `file://AmazonQ.md`、`file://README.md`、`file://.amazonq/rules/**/*.md`，这些是常驻上下文，不是按需加载的能力包 [@ref-amazon-q-repo-default-builtin]。

其二是知识库：`/knowledge add`、`/knowledge show`、`/knowledge remove` 等命令按 agent 隔离地建立可检索上下文，数据落在 `~/.aws/amazonq/knowledge_bases/` 下每个 agent 各自的目录里 [@ref-amazon-q-repo-kb-commands][@ref-amazon-q-repo-kb-isolation]。

其三是 MCP 工具：外部能力通过 agent 配置的 `mcpServers` 接入，工具用 `@server` 或 `@server/tool` 形式引用，并被 `tools`、`allowedTools`、`toolsSettings` 约束 [@ref-amazon-q-repo-format-tools][@ref-amazon-q-docs-mcp-concepts]。这三者都不涉及"Skill 目录 + SKILL.md frontmatter"这一形式。
