---
schema_version: 3
record_kind: production
edition_id: amazon-q-cli-mcp-v1
harness_id: amazon-q
topic: mcp
title: "Amazon Q CLI 的 MCP：配置入口、Server 定义与传输、认证、加载、能力暴露与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-docs-mcp-cli-commands, ref-amazon-q-docs-mcp-security-model, ref-amazon-q-repo-format-mcpservers, ref-amazon-q-docs-command-line-kiro, ref-amazon-q-repo-intro]
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-repo-agents-local, ref-amazon-q-repo-agents-global, ref-amazon-q-repo-paths-workspace, ref-amazon-q-repo-paths-global, ref-amazon-q-docs-mcp-cli-commands, ref-amazon-q-repo-mcp-subcommands, ref-amazon-q-repo-mcp-add, ref-amazon-q-repo-format-legacymcp]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-format-mcpservers, ref-amazon-q-repo-mcp-add, ref-amazon-q-docs-mcp-cli-args, ref-amazon-q-docs-mcp-cli-remote, ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-docs-mcp-config-ide, ref-amazon-q-docs-mcp-cli-oauth, ref-amazon-q-docs-mcp-security-considerations]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-amazon-q-docs-mcp-loading, ref-amazon-q-docs-mcp-server-status, ref-amazon-q-docs-mcp-init-timeout, ref-amazon-q-repo-format-mcpservers, ref-amazon-q-repo-mcp-add, ref-amazon-q-docs-mcp-cli-commands, ref-amazon-q-docs-mcp-cli-oauth]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-amazon-q-docs-mcp-concepts, ref-amazon-q-docs-mcp-tools, ref-amazon-q-docs-mcp-discover-tools, ref-amazon-q-docs-mcp-prompts, ref-amazon-q-docs-mcp-using-tools, ref-amazon-q-repo-format-tools, ref-amazon-q-repo-format-allowedtools, ref-amazon-q-repo-format-toolssettings, ref-amazon-q-repo-tools-using, ref-amazon-q-repo-format-toolaliases, ref-amazon-q-repo-tools-permissions, ref-amazon-q-repo-tools-execute-bash, ref-amazon-q-repo-tools-fs-write, ref-amazon-q-repo-tools-use-aws, ref-amazon-q-docs-mcp-security-model]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amazon-q-docs-mcp-server-status, ref-amazon-q-docs-mcp-discover-tools, ref-amazon-q-docs-mcp-cli-oauth, ref-amazon-q-docs-mcp-prompts, ref-amazon-q-docs-mcp-cli-commands, ref-amazon-q-repo-mcp-subcommands, ref-amazon-q-docs-mcp-init-timeout, ref-amazon-q-repo-cli-verbose, ref-amazon-q-docs-mcp-security-considerations]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-repo-agents-local, ref-amazon-q-repo-agents-global, ref-amazon-q-repo-paths-workspace, ref-amazon-q-repo-paths-global, ref-amazon-q-repo-mcp-subcommands, ref-amazon-q-repo-mcp-add, ref-amazon-q-repo-format-legacymcp]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-amazon-q-repo-format-mcpservers, ref-amazon-q-repo-mcp-add, ref-amazon-q-docs-mcp-cli-args]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: partial
        source_refs: [ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-docs-mcp-cli-remote, ref-amazon-q-docs-mcp-config-ide]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: partial
        source_refs: [ref-amazon-q-docs-mcp-cli-oauth, ref-amazon-q-docs-mcp-security-considerations]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-amazon-q-docs-mcp-loading, ref-amazon-q-docs-mcp-server-status, ref-amazon-q-docs-mcp-init-timeout, ref-amazon-q-repo-format-mcpservers, ref-amazon-q-repo-mcp-add]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-amazon-q-docs-mcp-concepts, ref-amazon-q-docs-mcp-tools, ref-amazon-q-docs-mcp-discover-tools, ref-amazon-q-docs-mcp-prompts, ref-amazon-q-docs-mcp-using-tools, ref-amazon-q-repo-format-tools]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-amazon-q-repo-format-tools, ref-amazon-q-repo-format-allowedtools, ref-amazon-q-repo-format-toolssettings, ref-amazon-q-repo-tools-using, ref-amazon-q-repo-format-toolaliases, ref-amazon-q-repo-tools-permissions, ref-amazon-q-docs-mcp-discover-tools, ref-amazon-q-docs-mcp-security-model]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-amazon-q-docs-mcp-server-status, ref-amazon-q-docs-mcp-discover-tools, ref-amazon-q-docs-mcp-cli-commands, ref-amazon-q-repo-mcp-subcommands, ref-amazon-q-docs-mcp-cli-oauth, ref-amazon-q-docs-mcp-prompts, ref-amazon-q-repo-cli-verbose]
---

## 固定来源与适用范围 {#mcp-scope}

本章的固定来源是 AWS 官方用户指南的 MCP 相关页面（`qdev-mcp.md`、`command-line-mcp-config-CLI.md`、`command-line-mcp-security.md`，均抓取于 2026-10-01）与官方仓库 `aws/amazon-q-developer-cli` 在提交 `15cc8f3cd18c4272925ce1c7053268eedff1ea0a` 上的登记文档与源码 [@ref-amazon-q-docs-mcp-config-cli][@ref-amazon-q-docs-mcp-cli-commands][@ref-amazon-q-docs-mcp-security-model][@ref-amazon-q-repo-format-mcpservers]。

AWS 用户指南已经把 Q CLI 指向 Kiro CLI，MCP 章节是仍保留 CLI 细节的部分 [@ref-amazon-q-docs-command-line-kiro]。仓库自带的 `docs/` 说明自己描述的是开发构建、仍在变动 [@ref-amazon-q-repo-intro]。因此本章结论按来源级知识阅读，不绑定具体发行版。本章只覆盖 `cli` 界面；`mcp-ide.md` 描述的 IDE 图形界面配置在文中显式标注为对照，不作为 CLI 的答案依据。

## 配置入口与作用域 {#mcp-entry}

MCP server 在 CLI 里通过 **agent 配置文件**登记。AWS 文档写：CLI 的全局 MCP 配置位于 `~/.aws/amazonq/cli-agents` [@ref-amazon-q-docs-mcp-config-cli]。仓库文档把这一目录展开为两级 agent 位置：工作区级是当前目录下的 `.amazonq/cli-agents/`，用户级是 `~/.aws/amazonq/cli-agents/`（注意 `amazonq` 目录在 `.aws` 下），每个 agent 是其中一个 JSON 文件 [@ref-amazon-q-repo-agents-local][@ref-amazon-q-repo-agents-global]。源码里这两个路径由常量固定为 `.amazonq/cli-agents` 与 `.aws/amazonq/cli-agents`，另有对应的 `mcp.json` 常量 [@ref-amazon-q-repo-paths-workspace][@ref-amazon-q-repo-paths-global]。

除手写 agent JSON 外，`q mcp` 子命令提供了第二组入口：`add`、`remove`、`list`、`import`、`status`、`help` [@ref-amazon-q-docs-mcp-cli-commands][@ref-amazon-q-repo-mcp-subcommands]。`q mcp add` 的 `--agent NAME` 决定写入哪个 agent 的配置文件；不给 `--agent` 时改写 legacy `mcp.json`，此时 `--scope workspace` 选工作区文件、缺省写全局文件 [@ref-amazon-q-repo-mcp-add]。agent 是否把 legacy `mcp.json` 里的 server 一并纳入，由该 agent 的 `useLegacyMcpJson` 字段决定：为 `true` 时同时加载全局 `~/.aws/amazonq/mcp.json` 与工作区 `.amazonq/mcp.json` [@ref-amazon-q-repo-format-legacymcp]。

这就是 **mcp.entry** 的完整答案：作用域由"工作区 agent 目录 / 全局 agent 目录"与"工作区 mcp.json / 全局 mcp.json"两条线决定，agent 配置文件里的 `mcpServers` 是主入口。缺口：AWS 文档把全局位置简写成 `cli-agents` 目录本身，没有写清目录内的文件粒度，需要结合仓库文档才能操作。

## Server 定义、传输与认证 {#mcp-definition}

**mcp.definition**：agent 配置的 `mcpServers` 是"名字到 server 定义"的对象。每个本地 server 可带 `command`（必填，启动命令）、`args`、`env`（环境变量表）、`timeout`（每次 MCP 请求超时，毫秒，默认 120000） [@ref-amazon-q-repo-format-mcpservers]。`q mcp add` 的开关与之一一对应：`--name`、`--command`、`--args`、`--env`、`--timeout`，另有 `--disabled`（登记但不加载）与 `--force`（覆盖同名 server） [@ref-amazon-q-repo-mcp-add]。`--args` 支持三种写法：重复 `--args`、转义逗号、JSON 数组字符串 [@ref-amazon-q-docs-mcp-cli-args]。

AWS 文档给出的最小配置（远程 server，来自 `command-line-mcp-config-CLI.md`）[@ref-amazon-q-docs-mcp-cli-remote]：

```json
{
  "mcpServers": {
    "find-a-domain": {
      "type": "http",
      "url": "https://api.findadomain.dev/mcp"
    }
  }
}
```

**mcp.transport**：AWS 文档把 CLI 支持的 server 分成两类——作为进程运行的本地 server，以及通过 HTTP 通信的远程 server；远程 server 可以要求 OAuth，也可以不要求认证 [@ref-amazon-q-docs-mcp-config-cli]。远程 server 在 agent 配置里用 `type` 和 `url` 两个字段声明 [@ref-amazon-q-docs-mcp-cli-remote]。IDE 章节另写明 MCP 客户端与 server 之间的两种主要传输是 STDIO 和 HTTP（该段属于 IDE 语境，此处仅作对照） [@ref-amazon-q-docs-mcp-config-ide]。缺口：CLI 侧"本地 server 用什么传输字段名声明 stdio"没有在登记文档里写出，按 partial 阅读。

**mcp.auth**：要求认证的远程 server 走 OAuth 交互流程——带着该 server 的 agent 启动会话后，server 先显示为 "not yet loaded"，用 `/mcp` 开始认证，CLI 给出 URL，在浏览器完成授权并保持会话，回到 CLI 后即为已登录，工具随后可用 [@ref-amazon-q-docs-mcp-cli-oauth]。把敏感配置放进环境变量、只从可信来源安装 server、审阅工具描述与标注，是安全文档给出的做法 [@ref-amazon-q-docs-mcp-security-considerations]。缺口：CLI 侧自定义 header 或静态 token 的配置键没有在登记文档中出现，按 partial 阅读；凭据请一律用环境变量或浏览器授权，不要写进 agent JSON 明文。

## 加载与生命周期 {#mcp-lifecycle}

CLI 在后台加载 MCP server，允许你先开始交互，不必等所有 server 初始化完成；各 server 的工具随其加载完成逐步可用 [@ref-amazon-q-docs-mcp-loading]。用 `/tools` 可以看到哪些 server 仍在加载、哪些工具已经可用 [@ref-amazon-q-docs-mcp-server-status]。等待初始化的时长用 `q settings mcp.initTimeout [value]` 调整，单位是毫秒 [@ref-amazon-q-docs-mcp-init-timeout]。单次 MCP 请求超时是 server 定义里的 `timeout` 字段，默认 120000 毫秒 [@ref-amazon-q-repo-format-mcpservers]。`q mcp add --disabled` 可以把 server 登记为不加载，`q mcp remove` 可从配置里移除 [@ref-amazon-q-repo-mcp-add][@ref-amazon-q-docs-mcp-cli-commands]。需要 OAuth 的 server 在完成认证前保持 "not yet loaded"，认证完成后工具才出现 [@ref-amazon-q-docs-mcp-cli-oauth]。

**mcp.lifecycle** 按 partial 记录：启动时机（会话启动时后台加载）、超时与"未加载"状态都有依据，但重连、失败重试、结果缓存的规则，以及 `mcp.noInteractiveTimeout`、`mcp.loadedBefore` 这两个设置键的语义，都没有在登记文档中说明 [@ref-amazon-q-docs-mcp-loading]。

## 能力发现与工具暴露 {#mcp-capabilities}

**mcp.capabilities**：MCP server 暴露三类能力——工具、提示（prompts）与资源（resources） [@ref-amazon-q-docs-mcp-concepts]。工具是可执行函数，带名称、描述、JSON Schema 形式的输入模式与可选标注 [@ref-amazon-q-docs-mcp-tools]；`/tools` 会同时列出内置工具与 MCP 工具 [@ref-amazon-q-docs-mcp-discover-tools]。提示用 `/prompts` 列出，用 `@prompt-name arg1 arg2` 调用 [@ref-amazon-q-docs-mcp-prompts]。工具可以由自然语言触发，也可以显式点名调用 [@ref-amazon-q-docs-mcp-using-tools]。缺口：资源在文档里只作为 MCP 概念介绍，CLI 如何读取或展示 resources 没有说明，按 partial 阅读。

**mcp.exposure**：agent 的 `tools` 字段决定可见工具集合，支持 `fs_read` 这类内置名、`@git`（整个 server）、`@git/tool`（单个工具）、`*`（全部，含内置与 MCP）与 `@builtin`（仅内置） [@ref-amazon-q-repo-format-tools]。免确认的白名单是 `allowedTools`，支持精确名、`fs_*` 这类通配、`@server` 与 `@server/read_*`，匹配区分大小写、精确匹配优先，且不接受 `"*"` [@ref-amazon-q-repo-format-allowedtools]。逐工具参数写在 `toolsSettings`，键可以是内置工具名或 `@server/tool`；注意同时出现在 `allowedTools` 里的模式会被覆盖 [@ref-amazon-q-repo-format-toolssettings][@ref-amazon-q-repo-tools-using]。MCP 工具与内置工具重名时用 `toolAliases` 重映射 [@ref-amazon-q-repo-format-toolaliases]。工具分三档权限：自动批准、每次需批准、标记为危险 [@ref-amazon-q-docs-mcp-discover-tools]；内置工具里 `fs_read` 与 `report_issue` 默认受信，`execute_bash`、`fs_write`、`use_aws` 默认每次询问，可用 `allowedCommands`/`deniedCommands`、`allowedPaths`/`deniedPaths`、`allowedServices`/`deniedServices` 细化 [@ref-amazon-q-repo-tools-permissions][@ref-amazon-q-repo-tools-execute-bash][@ref-amazon-q-repo-tools-fs-write][@ref-amazon-q-repo-tools-use-aws]。安全模型把它总结为显式授权、本地执行、每个 server 独立进程、可审计 [@ref-amazon-q-docs-mcp-security-model]。

## 诊断入口 {#mcp-diagnostics}

可用入口：会话内 `/tools` 查看 server 加载状态与工具可用性 [@ref-amazon-q-docs-mcp-server-status][@ref-amazon-q-docs-mcp-discover-tools]；`/mcp` 触发并查看远程 server 认证 [@ref-amazon-q-docs-mcp-cli-oauth]；`/prompts` 查看提示清单 [@ref-amazon-q-docs-mcp-prompts]；终端侧 `q mcp list` 与 `q mcp status` 分别列出已配置 server 和查看某个 server 状态，`q mcp help` 打印子命令 [@ref-amazon-q-docs-mcp-cli-commands][@ref-amazon-q-repo-mcp-subcommands]；`q settings mcp.initTimeout` 调整初始化等待 [@ref-amazon-q-docs-mcp-init-timeout]；`q -v` 到 `q -vvv` 逐级提高日志级别（1 为 WARN、2 为 INFO、3 为 DEBUG、更高为 TRACE），且 `q chat` 会把日志写入 `qchat.log` [@ref-amazon-q-repo-cli-verbose]。安全文档建议监控 MCP 日志以发现异常活动 [@ref-amazon-q-docs-mcp-security-considerations]。

**mcp.diagnostics** 按 partial 记录：以上都是可观察入口，但登记来源没有给出 MCP 日志的具体路径，也没有说明配置修改后是否需要重启会话才生效。
