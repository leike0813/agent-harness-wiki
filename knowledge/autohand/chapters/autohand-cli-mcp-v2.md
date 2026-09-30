---
schema_version: 3
record_kind: production
edition_id: autohand-cli-mcp-v2
harness_id: autohand
topic: mcp
title: "Autohand Code CLI 的 MCP 配置、传输与工具暴露"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-autohand-config-mcp, ref-autohand-mcp-config, ref-autohand-config-overlays, ref-autohand-docs-config-overlay, ref-autohand-docs-mcp-cli, ref-autohand-docs-mcp-slash, ref-autohand-src-workspace-trust, ref-autohand-hooks-workspace-trust]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-mcp-config, ref-autohand-mcp-config, ref-autohand-mcp-fields, ref-autohand-config-mcp, ref-autohand-docs-mcp-fields, ref-autohand-src-mcp-transports, ref-autohand-docs-config-mcphooks]
  - section_id: mcp-transport-auth
    surface_ids: [cli]
    source_refs: [ref-autohand-src-mcp-transports, ref-autohand-docs-mcp-transports, ref-autohand-mcp-overview, ref-autohand-config-mcp, ref-autohand-docs-mcp-config, ref-autohand-mcp-config]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-autohand-mcp-startup, ref-autohand-docs-mcp-startup, ref-autohand-config-mcp, ref-autohand-docs-mcp-slash, ref-autohand-docs-mcp-config, ref-autohand-mcp-config]
  - section_id: mcp-capabilities-exposure
    surface_ids: [cli]
    source_refs: [ref-autohand-mcp-overview, ref-autohand-docs-mcp-transports, ref-autohand-mcp-tool-naming, ref-autohand-docs-mcp-naming, ref-autohand-config-mcp, ref-autohand-docs-mcp-slash, ref-autohand-config-permissions]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-mcp-slash, ref-autohand-mcp-troubleshooting, ref-autohand-config-doctor]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-autohand-config-mcp, ref-autohand-mcp-config, ref-autohand-config-overlays, ref-autohand-docs-config-overlay, ref-autohand-docs-mcp-cli, ref-autohand-src-workspace-trust, ref-autohand-hooks-workspace-trust]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-autohand-mcp-fields, ref-autohand-config-mcp, ref-autohand-docs-mcp-fields, ref-autohand-src-mcp-transports, ref-autohand-docs-config-mcphooks]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: conflict
        source_refs: [ref-autohand-src-mcp-transports, ref-autohand-docs-mcp-transports, ref-autohand-mcp-overview, ref-autohand-config-mcp]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: partial
        source_refs: [ref-autohand-docs-mcp-config, ref-autohand-mcp-config]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-autohand-mcp-startup, ref-autohand-docs-mcp-startup, ref-autohand-config-mcp, ref-autohand-docs-mcp-slash, ref-autohand-mcp-config]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: partial
        source_refs: [ref-autohand-mcp-overview, ref-autohand-docs-mcp-transports, ref-autohand-docs-mcp-naming]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: answered
        source_refs: [ref-autohand-mcp-tool-naming, ref-autohand-docs-mcp-naming, ref-autohand-config-mcp, ref-autohand-config-permissions, ref-autohand-docs-mcp-slash]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-autohand-docs-mcp-slash, ref-autohand-mcp-troubleshooting, ref-autohand-config-doctor]
---

本页固定来源为 Autohand Code CLI 仓库 commit `a248656e78244f8387c0d0e436786fe801ad6599` 的 MCP 文档与 `src/mcp/` 源码，以及官方文档站 MCP 页面。仓库文档 `docs/mcp.md` 与文档站/源码在传输支持上不一致，本页在对应小节同时列出。问题只针对 `cli` 界面回答。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 配置入口与作用域 {#mcp-entry}

MCP server 定义在配置文件 `mcp.servers` 数组下；`mcp.enabled`（默认 `true`）是全局开关，为 `false` 时启动不连接任何 server、MCP 工具不可用。[@ref-autohand-config-mcp][@ref-autohand-mcp-config]

作用域三层，均以 JSON 为准：

| 作用域 | 文件 | 读取内容 |
| --- | --- | --- |
| 用户级 | `~/.autohand/config.json`（或 `--config`、`AUTOHAND_CONFIG` 指定） | 全部配置，含 `mcp` |
| 项目共享 | `项目根/.autohand/config.{json,toml,yaml,yml}` | 只读 `hooks` 与 `mcp` |
| 项目个人 | `项目根/.autohand/settings.local.json` | `hooks`、`mcp`、`permissions`、`agent`、`network`、`telemetry`、`provider`、`model` |

项目层在内置层之上叠加；MCP server 追加到全局列表，项目条目与全局同名时替换全局条目；`settings.local.json` 优先于共享项目文件。[@ref-autohand-config-overlays][@ref-autohand-docs-config-overlay]

命令行与斜杠入口不必手写 JSON：`autohand mcp add 名称 命令...`、`autohand mcp add -t http 名称 url --header "KEY: value"`、`autohand mcp list`、`autohand mcp remove 名称`；会话内用 `/mcp add`、`/mcp list`、`/mcp remove`、`/mcp connect`、`/mcp disconnect`，`/mcp install` 是 `/mcp add` 的兼容别名。[@ref-autohand-docs-mcp-cli][@ref-autohand-docs-mcp-slash]

项目级 MCP 属于**工作区信任**门控的对象：首次在声明了项目 server 的工作区启动时会列出每个 server 的启动方式并要求 Trust this workspace / Not now；拒绝或无法弹窗的运行（`-p`、auto mode、patch mode、RPC、ACP）会跳过不受信的项目 server 并向 stderr 提示；不受信期间项目文件的 `mcp` 段整体被忽略。信任决定存在 `~/.autohand/trusted-workspaces.json`，带 hooks 与 server 的指纹，指纹变化会重新询问。[@ref-autohand-src-workspace-trust][@ref-autohand-hooks-workspace-trust]

**未证实项**：仓库源码只是把 `hooks` 与 `mcpServers` 记入信任条目，未说明组织级策略；也未发现独立于用户/项目/工作区的第四种 MCP 作用域。检查过的入口：`src/permissions/workspaceTrust.ts`、`docs/config-reference.md` 的 MCP Settings 与 Project config overlays。

## Server 定义字段 {#mcp-definition}

完整定义（结构与字段取自官方文档站与仓库文档）：[@ref-autohand-docs-mcp-config][@ref-autohand-mcp-config]

```json
{
  "mcp": {
    "enabled": true,
    "servers": [
      {
        "name": "database",
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres"],
        "env": { "DATABASE_URL": "postgresql://localhost:5432/mydb" },
        "autoConnect": true
      },
      {
        "name": "context7",
        "transport": "http",
        "url": "https://mcp.context7.com/mcp",
        "headers": { "CONTEXT7_API_KEY": "your-key" },
        "autoConnect": true
      }
    ]
  }
}
```

| 字段 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | string | 是 | — | 唯一 server 标识，也是工具命名空间 |
| `transport` | `"stdio"` \| `"sse"` \| `"http"` | 是 | — | 连接类型 |
| `command` | string | stdio 必填 | — | 启动 server 的命令 |
| `args` | string[] | 否 | `[]` | 命令参数 |
| `stdioFraming` | `"content-length"` \| `"newline"` | 否 | 自动检测 | stdio 的 JSON-RPC 分帧方式，默认 Content-Length 并带兼容回退 |
| `url` | string | sse/http 必填 | — | server 端点 |
| `headers` | object | 否 | `{}` | http/sse 的自定义 HTTP 头（认证令牌等） |
| `env` | object | 否 | `{}` | 传给 server 进程的环境变量 |
| `autoConnect` | boolean | 否 | `true` | 启动时是否自动连接 |

[@ref-autohand-mcp-fields][@ref-autohand-config-mcp][@ref-autohand-docs-mcp-fields]

官方配置文档对同一组约束给出更短的说法：server 至少需要 `name` 与 `transport`，`stdio` 需要 `command`，`http` 与 `sse` 需要 `url`，可选字段为 `args`、`env`、`headers`、`autoConnect`，并可用 `autohand mcp` 或 `/mcp` 管理。[@ref-autohand-docs-config-mcphooks]

源码校验：`transport` 只接受 `stdio`、`sse`、`http`；`stdio` 缺少 `command` 会报 `requires a "command" field`；`sse`/`http` 需要 `url`；非法 `stdioFraming` 会拦下。[@ref-autohand-src-mcp-transports]

**未证实项**：来源没有说明 `env`、`headers`、`args`、`url` 中是否支持变量展开（如 `${VAR}`）。检查过的入口：MCP Server Config Fields 表、`src/mcp/types.ts` 的校验函数。

## 传输与认证 {#mcp-transport-auth}

源码定义 `transport: 'stdio' | 'sse' | 'http'`，`VALID_TRANSPORTS` 三项全部可用：`stdio` 生成子进程并以 JSON-RPC 2.0 走 stdin/stdout，`http` 走 MCP Streamable HTTP（发送 `Accept: application/json, text/event-stream`，跟踪 `Mcp-Session-Id`，兼容直接 JSON 与 SSE 包装响应），`sse` 走 HTTP Server-Sent Events。[@ref-autohand-src-mcp-transports][@ref-autohand-docs-mcp-transports]

**来源冲突**：仓库文档 `docs/mcp.md` 的 Overview 写「SSE transport -- not yet supported; use stdio or Streamable HTTP instead」，并把 `transport` 类型写作 `"stdio" | "http"`；同一 commit 的源码、`docs/config-reference.md` 的 Server Entry Fields 表与官方文档站都把 `sse` 列为受支持传输。以源码与文档站为准时 `sse` 可用，但仓库文档未同步。[@ref-autohand-mcp-overview][@ref-autohand-src-mcp-transports][@ref-autohand-config-mcp][@ref-autohand-docs-mcp-transports]

认证：远程 server 通过 `headers` 提供令牌（示例 `"CONTEXT7_API_KEY": "your-key"`、`"Authorization": "Bearer sk-your-token"`）；stdio server 通过 `env` 传入连接串等敏感值；不要在示例或仓库中写入真实凭据。[@ref-autohand-docs-mcp-config][@ref-autohand-mcp-config]

**未证实项**：源码存在 OAuth 桥接（初始化超时 `MCP_OAUTH_INITIALIZE_TIMEOUT_MS`、退出注释提到 OAuth 桥会阻塞浏览器），但固定来源没有给出 OAuth 的配置字段、登录流程或凭据刷新规则。检查过的入口：`src/mcp/McpClientManager.ts`、MCP 文档的 Server Config Fields 与 Transports。

## 生命周期 {#mcp-lifecycle}

- 启动：`autoConnect` 非 false 的 server 在 CLI 启动时**并行**发起连接，不阻塞提示符；连接失败只记日志，不阻止 agent 启动；工具随各自 server 上线逐步可用；agent 在 server 尚未连上时调用其工具会做一次即时的按 server 等待。[@ref-autohand-mcp-startup][@ref-autohand-docs-mcp-startup]
- 禁用与手动连接：`mcp.enabled=false` 关闭全部 MCP；单个 server 设 `autoConnect: false` 后可用 `/mcp connect 名称` 手动连接，`/mcp disconnect 名称` 断开，`/mcp` 交互列表可上下切换开关。[@ref-autohand-config-mcp][@ref-autohand-docs-mcp-slash][@ref-autohand-docs-mcp-config]
- 手工改完配置需要重启进程（文档原文：Restart Autohand and the server connects automatically），即新 server 不会在运行中的会话里热加载。[@ref-autohand-mcp-config]
- **未证实项**：重连/重试次数、连接超时的可配置字段、连接缓存与失败退避时间没有出现在固定来源里。检查过的入口：Non-Blocking Startup 小节、MCP Settings 字段表、`/mcp` 子命令表。

## 能力发现与暴露 {#mcp-capabilities-exposure}

发现的 MCP 能力是 **tools**：server 连上后其工具被自动发现并注册，agent 像调用内置工具一样调用它们。[@ref-autohand-mcp-overview][@ref-autohand-docs-mcp-transports]

工具命名空间为 `mcp__` 加 server 名再加 `__` 再加工具名，例如名为 `database` 的 server 的 `query` 工具暴露为 `mcp__database__query`，`context7` 的 `resolve-library-id` 暴露为 `mcp__context7__resolve-library-id`；不同 server 的同名工具因此不冲突。[@ref-autohand-mcp-tool-naming][@ref-autohand-docs-mcp-naming]

实际可见性由三处共同决定：`mcp.enabled` 全局开关、单 server 的连接状态（未连接/被禁用则不暴露其工具）、以及权限策略——MCP 工具按普通工具名进入 allow/deny 与 permission 流程，扩展工具与内置工具共享同一套可用性检查。[@ref-autohand-config-mcp][@ref-autohand-docs-mcp-slash][@ref-autohand-config-permissions]

**未证实项（partial）**：固定来源只确立 tools 的发现与调用；MCP resources、prompts、elicitation 等能力是否被发现或暴露，源码与文档均未给出证据。检查过的入口：MCP Overview 的能力清单、Tool Naming 小节、`src/mcp/McpClientManager.ts` 的 `getToolsForServer`。

## 诊断 {#mcp-diagnostics}

- 会话内：`/mcp list` 列出已连接 server 的全部工具，`/mcp` 显示各 server 的连接状态与开关，`/mcp connect 名称` 可重试连接。[@ref-autohand-docs-mcp-slash][@ref-autohand-mcp-troubleshooting]
- 一次性检查：`autohand doctor` 会逐个检查已配置的 MCP server，条目标为 ok / warning / failure，任一失败时退出码为 1；`--json` 输出结构化报告，`--skip-mcp` 跳过实际连接。[@ref-autohand-config-doctor]
- 失败定位：仓库文档 Troubleshooting 给出常见错误、server 日志与「禁用 MCP」的排查路径；典型手段是先看状态再重连。[@ref-autohand-mcp-troubleshooting]

**未证实项**：没有独立的 MCP 日志文件路径或日志级别配置项被固定来源记录。检查过的入口：`docs/mcp.md` 的 Troubleshooting（Server logs 小节）、`autohand doctor` 说明。
