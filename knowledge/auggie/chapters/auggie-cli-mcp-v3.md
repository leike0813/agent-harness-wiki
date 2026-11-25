---
schema_version: 3
record_kind: production
edition_id: auggie-cli-mcp-v3
harness_id: auggie
topic: mcp
title: "Auggie CLI 的 MCP 配置、传输、生命周期与工具可见性（1.x 文档线）"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-settings, ref-auggie-docs-config-hierarchy, ref-auggie-repo-changelog, ref-auggie-docs-mcp-cli, ref-auggie-docs-reference-mcp, ref-auggie-docs-mcp-overrides, ref-auggie-docs-mcp-native, ref-auggie-1x-mcp-cli, ref-auggie-1x-reference-mcp, ref-auggie-1x-settings-files]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-cli, ref-auggie-docs-mcp-settings, ref-auggie-docs-mcp-vars, ref-auggie-1x-mcp-cli, ref-auggie-1x-mcp-vars, ref-auggie-1x-reference-mcp]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-cli, ref-auggie-docs-mcp-settings, ref-auggie-docs-mcp-http, ref-auggie-repo-changelog, ref-auggie-docs-auth-using, ref-auggie-1x-auth-login, ref-auggie-1x-mcp-cli]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-settings, ref-auggie-docs-interactive-additional, ref-auggie-repo-changelog, ref-auggie-docs-mcp-tool-search, ref-auggie-docs-plugins-components, ref-auggie-1x-interactive-slash, ref-auggie-1x-mcp-tool-search]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-about, ref-auggie-docs-mcp-tool-search, ref-auggie-docs-perms-tools, ref-auggie-docs-hooks-mcp, ref-auggie-docs-reference-mcp-server, ref-auggie-1x-perms-tools, ref-auggie-1x-hooks-structure, ref-auggie-1x-settings-options, ref-auggie-1x-mcp-tool-search]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-cli, ref-auggie-docs-interactive-additional, ref-auggie-docs-mcp-tool-search, ref-auggie-docs-reference-diagnostics, ref-auggie-docs-logs-path, ref-auggie-repo-changelog, ref-auggie-1x-interactive-slash, ref-auggie-1x-reference-diagnostics]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-auggie-1x-settings-files, ref-auggie-1x-mcp-cli, ref-auggie-1x-reference-mcp]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-auggie-1x-mcp-cli, ref-auggie-1x-mcp-vars, ref-auggie-1x-reference-mcp]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-auggie-docs-mcp-http, ref-auggie-1x-mcp-cli]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: partial
        source_refs: [ref-auggie-docs-mcp-http, ref-auggie-repo-changelog, ref-auggie-docs-auth-using, ref-auggie-1x-auth-login]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-auggie-docs-mcp-settings, ref-auggie-1x-interactive-slash, ref-auggie-repo-changelog, ref-auggie-1x-mcp-tool-search]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-auggie-1x-mcp-tool-search, ref-auggie-1x-settings-options, ref-auggie-docs-mcp-about]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-auggie-1x-perms-tools, ref-auggie-1x-mcp-tool-search, ref-auggie-1x-hooks-structure]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-auggie-1x-interactive-slash, ref-auggie-docs-mcp-cli, ref-auggie-1x-reference-diagnostics, ref-auggie-docs-logs-path]
---

适用性说明：本章的 1.x 结论固定在 2026-11-25 观察到的官方文档 “Integrations and MCP” 页、CLI 参考页与 Settings 页（页顶标注 1.x 文档线），以及官方仓库提交 `8bd7186ea04e77d11f63e5850482643c8767666b`。文档快照的 `version_applicability` 仍为 `unknown`，不证明任何具体 npm 版本；0.x 结论保留在原 v2 edition 与旧引用中。

## 配置入口与作用域 {#mcp-entry}

1.x 的固定来源是官方文档站 “Integrations and MCP” 页、CLI 参考页与 Settings 页。MCP 机制以 Integrations 页为主，作用域与合并规则以 Settings 页为准。[@ref-auggie-1x-mcp-cli][@ref-auggie-1x-settings-files]

持久化入口仍是 settings 文件的 `mcpServers` 对象。1.x 的四个设置层是受管 `/etc/augment/settings.json`（Windows 为 `C:\ProgramData\augment\settings.json`）、`.augment/settings.local.json`、`.augment/settings.json` 与 `~/.augment/settings.json`。settings.json 里的 MCP 会在启动时初始化，可用 `/mcp` 检查。[@ref-auggie-docs-mcp-settings][@ref-auggie-1x-settings-files]

CLI 子命令把配置写进设置文件：默认写用户设置，`auggie mcp add --project` 写 `.augment/settings.json`，`--local` 写 `.augment/settings.local.json`；`auggie mcp remove` 也接受 `--project`／`--local`。[@ref-auggie-1x-mcp-cli]

```sh
auggie mcp add context7 --command npx --args "-y @upstash/context7-mcp@latest" --env CONTEXT7_API_KEY=your_key
auggie mcp list --json
auggie mcp remove context7
```

本次运行的临时覆盖用 `--mcp-config`，取值是 JSON 字符串或 JSON 文件路径；它与 `mcpServers` 结构相同，并且最后应用、覆盖设置文件里的同名项。`auggie mcp add-json` 使用同一套解析机制，但结果是写进设置文件。[@ref-auggie-1x-reference-mcp][@ref-auggie-docs-mcp-cli]

合并规则：0.x 的配置页明确 MCP 条目按名称整体替换、不做深合并；1.x 页面只保留“高优先级覆盖低优先级”的通用说明，没有重复 MCP 条目细则。因此“同名整体替换”是 0.x 文档结论，1.x 未重申。[@ref-auggie-docs-config-hierarchy][@ref-auggie-1x-settings-files]

除 MCP 之外还有**原生集成**（GitHub、Linear、Notion 等）：文档说明它们需要在 Augment 的 VS Code 或 JetBrains 扩展里连接，连接后 Auggie 自动可用；CLI 自身不提供原生集成的配置入口。[@ref-auggie-docs-mcp-native]

## Server 定义字段与变量展开 {#mcp-definition}

1.x 的 server 定义字段仍是 `command`、`args`、`env`（本地 stdio）与 `type`、`url`、`headers`（远程 http／sse）。`auggie mcp add` 的选项：`-c/--command PATH`、`--args ARGS`、`-e/--env KEY=VAL`（可重复）、`-t/--transport stdio|sse|http`（默认 `stdio`）、`-u/--url`（sse 与 http 必填）、`-H/--header KEY:VAL`（可重复，http 与 sse；注意 1.x 从 `-h` 改为 `-H`）、`-r/--replace`、`--project`、`--local`。[@ref-auggie-1x-mcp-cli]

文档给出的完整示例（含远程与本地形态）：[@ref-auggie-docs-mcp-settings]

```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": { "CONTEXT7_API_KEY": "YOUR_API_KEY" }
    },
    "local-tool": {
      "command": "/usr/local/bin/custom-mcp",
      "args": ["--serve", "--port", "3000"],
      "env": { "DEBUG": "true" }
    }
  }
}
```

**变量展开（1.x）**：[@ref-auggie-1x-mcp-vars]

| 语法 | 展开为 |
| :-- | :-- |
| `${workspaceFolder}` | 当前工作区根路径 |
| `${VAR}` | 环境变量 `VAR` 的值 |
| `${VAR:-default}` | `VAR` 的值，未设置时用 `default` |
| `\${VAR}` | 字面文本 `${VAR}` |
| `command` 或 `cwd` 开头的 `~` | home 目录 |

展开位置：stdio 的 `command`、`args`、`cwd`、`env` 值；http／sse 的 `url` 与 `headers` 值。环境变量未设置且没有默认值时，Auggie **跳过该 server 并报错**。变量展开对 settings.json 与 `--mcp-config` 都生效。[@ref-auggie-1x-mcp-vars]

**版本线**：0.x 只支持 `${workspaceFolder}`，且只在工作区上下文展开；1.x 增加了 `${VAR}`、`${VAR:-default}`、`\${VAR}`、`~` 与 `cwd`／`env`／`headers` 位置，并把“没有工作区时保持原样”改为“缺变量时跳过 server 并报错”。旧 v2 edition 保留 0.x 说法。[@ref-auggie-docs-mcp-vars][@ref-auggie-1x-mcp-vars]

1.x 的 server 定义没有新增其它字段的文档；`cwd` 只在变量展开条目中被点名，`--mcp-config` 仍是最上层的覆盖手段。[@ref-auggie-1x-reference-mcp]

## 传输类型与凭据 {#mcp-transport}

- **stdio**（默认）：`command`＋`args`＋`env`，本地可执行文件；`--transport` 不写时即 stdio。[@ref-auggie-1x-mcp-cli]
- **sse**：`type: "sse"`＋`url`，可带 `headers`。[@ref-auggie-docs-mcp-settings][@ref-auggie-docs-mcp-http]
- **http**：`type: "http"`＋`url`，可带 `headers`，用于 Streamable HTTP；文档示例中出现 `Mcp-Session-Id` 头用于管理会话。[@ref-auggie-docs-mcp-http]

`headers` 接受任意合法 HTTP 头键值对，常见用途是 `Authorization: Bearer ...`、API key 与服务器自定义参数。文档同时提醒不要把敏感信息直接写进配置文件；headers 只对 http 与 sse 有意义，stdio 走标准输入输出不使用 HTTP 头。[@ref-auggie-docs-mcp-http]

**认证（partial）**：CLI 文档只提供了 headers 这一条凭据通道，没有给出 MCP server 的 OAuth 登录流程或 token 刷新字段。CHANGELOG 记录过托管 MCP OAuth 会话过期后的恢复改进、OAuth 回调的 WAF 解除与空 token 拒绝，说明存在 OAuth 流程，但配置语法未被文档化。Auggie 自身的登录凭据（1.x 为 `auggie auth login`、session JSON、服务账号 API token）用于访问 Augment 服务，不是 MCP server 的凭据。[@ref-auggie-docs-mcp-http][@ref-auggie-repo-changelog][@ref-auggie-1x-auth-login][@ref-auggie-docs-auth-using]

## 生命周期 {#mcp-lifecycle}

- **启动**：settings.json 中定义的 server 在启动时初始化；`/mcp` 查看全部已配置 server 的状态。[@ref-auggie-docs-mcp-settings][@ref-auggie-1x-interactive-slash]
- **重启**：交互模式 `/restart-mcp` 重启所有 MCP server。[@ref-auggie-1x-interactive-slash]
- **可靠性行为**：CHANGELOG 记录服务端主动可用性探测、卡死 server 的自动重启、健康监控、空凭据防护，以及支持 `tools/list_changed` 通知以动态刷新 agent 缓存的工具列表。这些是发布说明中的行为记录，具体超时值、重试次数与缓存时长没有文档数字。[@ref-auggie-repo-changelog]
- **预加载与开关**：默认把所有 server 的所有工具加载进上下文；`--enable-tool-search`（单次运行）或 settings 的 `enableToolSearch`（持久）改为按需加载；1.x 另有 `disableToolSearch` 用于关闭“自动 MCP 工具发现”。[@ref-auggie-docs-mcp-tool-search][@ref-auggie-1x-mcp-tool-search]
- **插件提供的 server**：插件用 `.mcp.json` 或 `plugin.json` 内的 `mcpServers` 声明 server，随插件启用而生效。[@ref-auggie-docs-plugins-components]

**缺口**：连接超时、重连退避、失败重试次数与工具缓存失效时间没有文档化的数值。[@ref-auggie-repo-changelog][@ref-auggie-docs-mcp-settings]

## 能力与可见性 {#mcp-capabilities}

文档只描述了 **tools** 一类能力：MCP server 通过标准协议向 Auggie 提供外部工具，默认全部预加载进上下文；服务器数量多时会明显占用上下文窗口。[@ref-auggie-docs-mcp-about][@ref-auggie-1x-mcp-tool-search]

**MCP Tool Search（手动开关）**：开启后隐藏单个 MCP 工具，改为暴露 `find-tool` 与 `execute-tool` 两个元工具，agent 只在实际使用时加载对应工具的完整 schema。启用方式：单次运行加 `--enable-tool-search`，持久开启在 settings.json 设 `"enableToolSearch": true`；1.x 页面仍写默认关闭。`find-tool` 调用在用量面板中单独计为 “Tool Search”，权限仍作用于经 `execute-tool` 发起的底层 MCP 工具调用。[@ref-auggie-1x-mcp-tool-search]

**自动 MCP 工具发现**：1.x Settings 页新增 `disableToolSearch` 选项，描述为“关闭自动 MCP 工具发现——当工具定义占用过多上下文时，把 MCP 工具藏到 `find-tool` 与 `execute-tool` 后面”；该选项只在自动发现可用时出现。它与手动 `enableToolSearch` 是两个不同层：前者关闭自动发现，后者显式开启 Tool Search。[@ref-auggie-1x-settings-options]

**工具命名与权限**：1.x 的 MCP 工具仍按 `{toolName}_{serverName}` 命名并参与 `toolPermissions`；1.x 权限页把内置工具名改为 `bash`、`read`、`edit`、`write`、`grep`、`find`、`ls`，MCP 工具不受这份内置清单限制。[@ref-auggie-1x-perms-tools]

**Hook 视角**：hook 事件带 `is_mcp_tool`；1.x 的 matcher 规则是：只有 `".*"`（或不写 matcher）能匹配 MCP 工具，`"bash"` 这类具体名字永远不会匹配 MCP 工具；`mcp:*` 匹配全部 MCP 工具，`mcp:.*_my-server$` 匹配某个 server 的工具。开启 `includeMCPMetadata` 后事件里出现 server 名与工具计数等字段。[@ref-auggie-1x-hooks-structure][@ref-auggie-docs-hooks-mcp]

**缺口（partial）**：MCP 的 resources 与 prompts 在 CLI 文档、CLI 参考页与 CHANGELOG 记录中都没有出现，无法确认是否可被发现或使用；不能以 tools 的实现推断它们存在。工具的逐项启用／禁用开关也未在文档中给出（只有全局的 Tool Search、自动发现开关与 `toolPermissions` 规则）。[@ref-auggie-docs-mcp-about][@ref-auggie-1x-mcp-tool-search]

**反向用法：Auggie 作为 MCP server**。`auggie --mcp` 把 Auggie 本身作为 MCP 工具服务器运行，向 Claude Code、Cursor 等外部客户端暴露 `codebase-retrieval` 工具；默认以当前工作目录为工作区，`-w` 指定工作区路径，`--mcp-auto-workspace` 开启按客户端请求的动态工作区发现。该段来自 0.x 参考页，1.x 参考页未重述。[@ref-auggie-docs-reference-mcp-server]

## 诊断 {#mcp-diagnostics}

| 要确认的事 | 1.x 可用的入口 |
| :-- | :-- |
| 配置是否被读取 | `auggie mcp list`（表格含状态）、`auggie mcp list --json`；`/mcp` 状态视图 [@ref-auggie-docs-mcp-cli][@ref-auggie-1x-interactive-slash] |
| server 是否连接 | `/mcp` 查看状态，`/restart-mcp` 重新连接；`/status` 汇总 MCP servers 与 rules [@ref-auggie-1x-interactive-slash] |
| 工具是否可见 | `/mcp` 状态视图；Tool Search 开启后由 `find-tool` 查询 [@ref-auggie-1x-mcp-tool-search] |
| 调用是否成功 | `--log-level debug` 输出到日志文件（`--log-file` 可指定路径）[@ref-auggie-1x-reference-diagnostics][@ref-auggie-docs-logs-path] |

CHANGELOG 提到 TUI 会显示 MCP server 的来源（provenance），用于区分某个 server 来自哪个插件或组织；被丢弃的注册表 server 也会在诊断中报出。[@ref-auggie-repo-changelog]
