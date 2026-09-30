---
schema_version: 3
record_kind: production
edition_id: auggie-cli-mcp-v1
harness_id: auggie
topic: mcp
title: "Auggie CLI 的 MCP 配置、传输、生命周期与工具可见性"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-settings, ref-auggie-docs-config-hierarchy, ref-auggie-repo-changelog, ref-auggie-docs-mcp-cli, ref-auggie-docs-reference-mcp, ref-auggie-docs-mcp-overrides, ref-auggie-docs-mcp-native]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-cli, ref-auggie-docs-mcp-settings, ref-auggie-docs-mcp-vars]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-cli, ref-auggie-docs-mcp-settings, ref-auggie-docs-mcp-http, ref-auggie-repo-changelog, ref-auggie-docs-auth-using]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-settings, ref-auggie-docs-interactive-additional, ref-auggie-repo-changelog, ref-auggie-docs-mcp-tool-search, ref-auggie-docs-plugins-components]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-about, ref-auggie-docs-mcp-tool-search, ref-auggie-docs-perms-tools, ref-auggie-docs-hooks-mcp, ref-auggie-docs-reference-mcp-server]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-mcp-cli, ref-auggie-docs-interactive-additional, ref-auggie-docs-mcp-tool-search, ref-auggie-docs-reference-diagnostics, ref-auggie-docs-logs-path, ref-auggie-repo-changelog]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-auggie-docs-mcp-settings, ref-auggie-docs-config-hierarchy, ref-auggie-docs-mcp-cli, ref-auggie-docs-reference-mcp]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-auggie-docs-mcp-settings, ref-auggie-docs-mcp-cli, ref-auggie-docs-mcp-vars]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-auggie-docs-mcp-settings, ref-auggie-docs-mcp-cli, ref-auggie-docs-mcp-http]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: partial
        source_refs: [ref-auggie-docs-mcp-http, ref-auggie-repo-changelog, ref-auggie-docs-auth-using]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-auggie-docs-mcp-settings, ref-auggie-docs-interactive-additional, ref-auggie-repo-changelog, ref-auggie-docs-mcp-tool-search]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-auggie-docs-mcp-about, ref-auggie-docs-mcp-tool-search]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-auggie-docs-perms-tools, ref-auggie-docs-mcp-tool-search, ref-auggie-docs-hooks-mcp]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-auggie-docs-mcp-cli, ref-auggie-docs-interactive-additional, ref-auggie-docs-reference-diagnostics, ref-auggie-docs-logs-path]
---

## 配置入口与作用域 {#mcp-entry}

固定来源是官方仓库提交 `9cc3ead419db9486ad44e6e4bba30ecd6784ccff` 与官方文档站 `docs.augmentcode.com` 的 CLI 页面；MCP 机制以 “Integrations and MCP” 页为主，作用域与合并规则以 “Configuration Wizard” 页为准。[@ref-auggie-docs-mcp-settings][@ref-auggie-docs-config-hierarchy][@ref-auggie-repo-changelog]

持久化入口是 settings 文件的 `mcpServers` 对象。文档点名的用户级文件是 home 目录下的 `.augment/settings.json`；同一套分层还包含工作区根的 `.augment/settings.json`（项目共享）、`.augment/settings.local.json`（个人、已加入 `.gitignore`）与受管文件 `/etc/augment/settings.json`（Windows 为 `C:\ProgramData\augment\settings.json`）。settings.json 里的 MCP 会在启动时初始化，可用 `/mcp` 检查。[@ref-auggie-docs-mcp-settings][@ref-auggie-docs-config-hierarchy]

CLI 子命令把配置写进设置文件，并可用 `--project`／`--local` 选择写入项目或本地项目设置（不传时默认写用户设置）：[@ref-auggie-docs-mcp-cli][@ref-auggie-docs-config-hierarchy]

```sh
auggie mcp add context7 --command npx --args "-y @upstash/context7-mcp@latest" --env CONTEXT7_API_KEY=your_key
auggie mcp list --json
auggie mcp remove context7
```

本次运行的临时覆盖用 `--mcp-config`，取值是 JSON 字符串或 JSON 文件路径；它与 `mcpServers` 结构相同，并且最后应用、覆盖设置文件里的同名项。`auggie mcp add-json` 使用同一套解析机制，但结果是写进设置文件。[@ref-auggie-docs-mcp-cli][@ref-auggie-docs-reference-mcp]

合并规则：MCP 条目按名称整体替换，不做深合并——同名 server 由更高优先级文件整体胜出，`args`、`env` 等单个属性不会跨文件合并。[@ref-auggie-docs-config-hierarchy]

`--mcp-config` 的取值既可以是 JSON 字符串也可以是 JSON 文件路径，CLI 参考页明确它“最后应用并覆盖设置”，并同时列出 `auggie --mcp-config {key: value}` 与 `auggie --mcp-config /path/to/mcp.json` 两种写法。文档 “MCP overrides” 给出一个临时覆盖实例（安装 `gitlab-mr-mcp` 后经 `--mcp-config` 传入，结构与 settings.json 相同）：[@ref-auggie-docs-reference-mcp][@ref-auggie-docs-mcp-overrides]

```json
{
  "mcpServers": {
    "gitlab-mr-mcp": {
      "command": "node",
      "args": ["/path/to/gitlab-mr-mcp/index.js"],
      "env": { "MR_MCP_GITLAB_TOKEN": "your_gitlab_token" }
    }
  }
}
```

除 MCP 之外还有**原生集成**（GitHub、Linear、Notion 等）：文档说明它们需要在 Augment 的 VS Code 或 JetBrains 扩展里连接，连接后 Auggie 自动可用；CLI 自身不提供原生集成的配置入口。[@ref-auggie-docs-mcp-native]

## Server 定义字段与变量展开 {#mcp-definition}

文档给出的 server 定义字段是 `command`、`args`、`env`（本地 stdio）与 `type`、`url`、`headers`（远程 http／sse）。`auggie mcp add` 的选项与字段一一对应：`--command`、`--args`、`-e/--env KEY=VAL`（可重复）、`-t/--transport stdio|sse|http`（默认 `stdio`）、`-u/--url`（sse 与 http 必填）、`-h/--header KEY:VAL`（可重复，http 与 sse）、`-r/--replace`（覆盖同名项不再交互确认）。[@ref-auggie-docs-mcp-cli]

文档给出的完整示例（含四种 transport 形态）：[@ref-auggie-docs-mcp-settings]

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

变量展开：支持 `${workspaceFolder}`，展开为当前工作区根路径。文档明确它可用于 `command`（stdio）、`args` 数组元素（stdio）与 `url`（http 和 sse）字段；只在工作区上下文中展开，没有工作区时保持原样；对 settings.json 与 `--mcp-config` 覆盖都生效。[@ref-auggie-docs-mcp-vars]

文档没有列出工作目录字段（如 `cwd`）；server 声明中可用字段以本节所列为准，其余字段在固定来源中没有证据。[@ref-auggie-docs-mcp-settings][@ref-auggie-docs-mcp-cli]

## 传输类型与凭据 {#mcp-transport}

- **stdio**（默认）：`command`＋`args`＋`env`，本地可执行文件；`--transport` 不写时即 stdio。[@ref-auggie-docs-mcp-cli]
- **sse**：`type: "sse"`＋`url`，可带 `headers`。[@ref-auggie-docs-mcp-settings][@ref-auggie-docs-mcp-http]
- **http**：`type: "http"`＋`url`，可带 `headers`，用于 Streamable HTTP；文档示例中出现 `Mcp-Session-Id` 头用于管理会话。[@ref-auggie-docs-mcp-http]

`headers` 接受任意合法 HTTP 头键值对，常见用途是 `Authorization: Bearer ...`、API key 与服务器自定义参数。文档同时提醒不要把敏感信息直接写进配置文件，应改用凭据管理方式；headers 只对 http 与 sse 有意义，stdio 走标准输入输出不使用 HTTP 头。[@ref-auggie-docs-mcp-http]

**认证（partial）**：CLI 文档只提供了 headers 这一条凭据通道，没有给出 OAuth 登录流程或 token 刷新字段。CHANGELOG 记录过托管 MCP OAuth 会话过期后的恢复改进、OAuth 回调的 WAF 解除与空 token 拒绝，说明存在 OAuth 流程，但配置语法在固定来源中未被文档化。Auggie 自身的登录凭据（`auggie login`、session JSON、服务账号 API token）用于访问 Augment 服务，不是 MCP server 的凭据。[@ref-auggie-docs-mcp-http][@ref-auggie-repo-changelog][@ref-auggie-docs-auth-using]

## 生命周期 {#mcp-lifecycle}

- **启动**：settings.json 中定义的 server 在启动时初始化；`/mcp` 查看全部已配置 server 的状态。[@ref-auggie-docs-mcp-settings][@ref-auggie-docs-interactive-additional]
- **重启**：交互模式下 `/restart-mcp` 重启所有 MCP server。[@ref-auggie-docs-interactive-additional]
- **可靠性行为**：CHANGELOG 记录服务端主动可用性探测、卡死 server 的自动重启、健康监控、空凭据防护，以及支持 `tools/list_changed` 通知以动态刷新 agent 缓存的工具列表。这些是发布说明中的行为记录，具体超时值、重试次数与缓存时长在固定来源中没有数字。[@ref-auggie-repo-changelog]
- **预加载与开关**：默认把所有 server 的所有工具加载进上下文；`--enable-tool-search`（单次运行）或 settings 的 `enableToolSearch`（持久）改为按需加载。[@ref-auggie-docs-mcp-tool-search]
- **插件提供的 server**：插件用 `.mcp.json` 或 `plugin.json` 内的 `mcpServers` 声明 server，随插件启用而生效。[@ref-auggie-docs-plugins-components]

**缺口**：连接超时、重连退避、失败重试次数与工具缓存失效时间没有文档化的数值。[@ref-auggie-repo-changelog][@ref-auggie-docs-mcp-settings]

## 能力与可见性 {#mcp-capabilities}

文档只描述了 **tools** 一类能力：MCP server 通过标准协议向 Auggie 提供外部工具，默认全部预加载进上下文；服务器数量多时会明显占用上下文窗口。[@ref-auggie-docs-mcp-about][@ref-auggie-docs-mcp-tool-search]

**MCP Tool Search**：开启后隐藏单个 MCP 工具，改为暴露 `find-tool` 与 `execute-tool` 两个元工具，agent 只在实际使用时加载对应工具的完整 schema。启用方式：单次运行加 `--enable-tool-search`，持久开启在 settings.json 设 `"enableToolSearch": true`；默认关闭。`find-tool` 调用在用量面板中单独计为 “Tool Search”，权限仍然作用于经 `execute-tool` 发起的底层 MCP 工具调用。[@ref-auggie-docs-mcp-tool-search]

**工具命名与权限**：MCP 工具名为 `{toolName}_{serverName}`，超过 64 字符会被截断，之后与内置工具一样参与 `toolPermissions`。[@ref-auggie-docs-perms-tools]

**Hook 视角**：hook 事件带 `is_mcp_tool` 字段；matcher 可用 `mcp:*` 匹配全部 MCP 工具，或用 `mcp:.*_my-server$` 匹配某个 server 的工具；开启 `includeMCPMetadata` 后事件里出现 server 名与工具计数等字段。[@ref-auggie-docs-hooks-mcp]

**缺口（partial）**：MCP 的 resources 与 prompts 在 CLI 文档、CLI 参考页与 CHANGELOG 记录中都没有出现，无法确认是否可被发现或使用；不能以 tools 的实现推断它们存在。工具的逐项启用／禁用开关也未在文档中给出（只有全局的 Tool Search 与 `toolPermissions` 规则）。[@ref-auggie-docs-mcp-about][@ref-auggie-docs-mcp-tool-search]

**反向用法：Auggie 作为 MCP server**。`auggie --mcp` 把 Auggie 本身作为 MCP 工具服务器运行，向 Claude Code、Cursor 等外部客户端暴露 `codebase-retrieval` 工具；默认以当前工作目录为工作区，`-w` 指定工作区路径，`--mcp-auto-workspace` 开启按客户端请求的动态工作区发现（工具接受 `directory_path` 参数、工作区按需索引、单个会话内可搜索多个工作区；可与 `-w` 组合以预热主工作区）。[@ref-auggie-docs-reference-mcp-server]

## 诊断 {#mcp-diagnostics}

按文档可观察到的四个层次：

| 要确认的事 | 可用的入口 |
| :-- | :-- |
| 配置是否被读取 | `auggie mcp list`（表格含状态）、`auggie mcp list --json`；`/mcp` 状态视图 [@ref-auggie-docs-mcp-cli][@ref-auggie-docs-interactive-additional] |
| server 是否连接 | `/mcp` 查看状态，`/restart-mcp` 重新连接；`/status` 汇总 MCP servers 与 rules [@ref-auggie-docs-interactive-additional] |
| 工具是否可见 | `/mcp` 状态视图、MCP Tool Search 开启后由 `find-tool` 查询 [@ref-auggie-docs-mcp-tool-search] |
| 调用是否成功 | `--log-level debug` 输出到日志文件（`--log-file` 可指定路径）[@ref-auggie-docs-reference-diagnostics][@ref-auggie-docs-logs-path] |

CHANGELOG 提到 TUI 会显示 MCP server 的来源（provenance），用于区分某个 server 来自哪个插件或组织；被丢弃的注册表 server 也会在诊断中报出。[@ref-auggie-repo-changelog]
