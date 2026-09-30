---
schema_version: 3
record_kind: production
edition_id: command-code-cli-mcp-v1
harness_id: command-code
topic: mcp
title: "Command Code CLI 的 MCP：作用域与文件、传输与认证、权限暴露与诊断"
sections:
  - section_id: mcp-scopes
    surface_ids: [cli]
    source_refs: [ref-command-code-mcp-scopes, ref-cc-mcp-reference, ref-cc-settings-keys, ref-cc-settings-other]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-cc-mcp-adding, ref-cc-mcp-options, ref-cc-mcp-quickstart, ref-cc-mcp-schema]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-command-code-mcp-auth, ref-cc-mcp-reference, ref-cc-security-mcp]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-cc-mcp-menu, ref-cc-mcp-schema, ref-cc-settings-env, ref-cc-mcp-trouble]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-cc-mcp-tools, ref-cc-perm-rules, ref-cc-perm-mcp]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cc-mcp-reference, ref-cc-mcp-menu, ref-cc-trouble-mcp, ref-cc-mcp-trouble, ref-cc-trouble-mcp-auth]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-scopes
        status: answered
        source_refs: [ref-command-code-mcp-scopes, ref-cc-settings-other, ref-cc-settings-keys]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-cc-mcp-adding, ref-cc-mcp-options, ref-cc-mcp-schema, ref-cc-mcp-quickstart]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-cc-mcp-adding, ref-cc-mcp-options]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-command-code-mcp-auth, ref-cc-security-mcp]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-cc-mcp-menu, ref-cc-settings-env, ref-cc-mcp-trouble, ref-cc-mcp-schema]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-cc-mcp-tools]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-cc-perm-rules, ref-cc-perm-mcp]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-cc-trouble-mcp, ref-cc-mcp-trouble, ref-cc-trouble-mcp-auth, ref-cc-mcp-menu]
---

本章的固定来源是 Command Code 官方文档站的页面快照（`/docs/mcp`、`/docs/settings`、`/docs/permissions`、`/docs/resources/security`、`/docs/troubleshooting/common-issues`），抓取于 2026-10-01（各 snapshot 的 `source_fetched_at` 记录 UTC 时间戳 2026-09-30T17:08Z）。文档站只提供 HTML，因此引用用文档小节标题定位、摘录取自页面正文；`raw_sha256` 固定 HTML 字节。Command Code 闭源，整章为来源级知识，不绑定具体 `cmd` 版本。

Command Code 用 MCP（Model Context Protocol）把外部工具接进 agent 循环：配置在 `cmd mcp` 子命令维护的 JSON 文件里 → 启动时按作用域合并并连接 server → server 的工具以 `mcp__` 加 server 名、再 `__`、再工具名 名字进入工具集 → 每次调用仍走权限引擎。

## 配置入口与作用域 {#mcp-scopes}

MCP server 可以存在三个作用域，文档给出的文件位置与用途：[@ref-command-code-mcp-scopes]

| 作用域 | 文件位置 | 用途 |
| :-- | :-- | :-- |
| `local`（默认） | `~/.commandcode/projects/{project}/mcp.json` | 私有、按项目 |
| `project` | 项目根 `.mcp.json` | 共享、纳入版本控制 |
| `user` | `~/.commandcode/mcp.json` | 私有、跨所有项目 |

同名 server 出现在多个作用域时，`local` 覆盖 `project`，`project` 覆盖 `user`。作用域由 `cmd mcp add --scope` 选择，默认 `local`。[@ref-command-code-mcp-scopes][@ref-cc-mcp-reference]

settings.json 里还有一路内联来源：顶层 `mcp` 键接受 `{ "servers": [ … ] }`。settings 页把 MCP 的完整优先级写成（低 → 高）：settings.json 的 `mcp.servers` < 用户 `mcp.json` < 项目 `.mcp.json` < 本地 `projects/{project}/mcp.json`。[@ref-cc-settings-keys][@ref-cc-settings-other]

`.mcp.json` 与用户级 `mcp.json` 的手写格式是 `{ "mcpServers": { … } }`；`project` 作用域的 OAuth client secret 写盘前会被剥离并改存到 `~/.commandcode/mcp-tokens.json`，这样 `.mcp.json` 可以安全提交。[@ref-command-code-mcp-scopes][@ref-cc-settings-other]

## Server 定义、字段与传输 {#mcp-definition}

两种传输：**http**（远程）用 `--transport http` 加 URL；**stdio**（本地进程，默认传输）用 `--` 把 server 名和命令分开。所有选项（`--transport`、`--scope`、`--env`、`--header`）必须写在 server 名之前。[@ref-cc-mcp-adding]

```bash
# HTTP（远程），来源：/docs/mcp 的 Adding MCP servers
cmd mcp add --transport http notion https://mcp.notion.com/mcp

# stdio（本地），来源同上
cmd mcp add playwright -- npx -y @playwright/mcp@latest

# 带 header / env
cmd mcp add --transport http private-api https://api.company.com/mcp \
  --header "X-API-Key: YOUR_API_KEY"
cmd mcp add --transport stdio --env API_KEY=YOUR_API_KEY my-server \
  -- npx -y my-mcp-server
```

命令选项表：[@ref-cc-mcp-options]

| 选项 | 说明 | 默认 |
| :-- | :-- | :-- |
| `-t, --transport` | `stdio` 或 `http` | `stdio` |
| `-s, --scope` | 存储作用域：`local`、`project`、`user` | `local` |
| `-e, --env` | 环境变量，可重复 | - |
| `-H, --header` | HTTP header，可重复，仅 http | - |

复杂配置用 `cmd mcp add-json` 传 JSON，字段与文件格式一致；JSON 里 `type` 是 `transport` 的别名。配置值里的环境变量在运行时解析，适用于 http 的 `headers` 与 stdio 的 `env`：`${API_KEY}` 或 `${API_KEY:-default}`（变量未设置或为空时用默认值，与 shell 一致）；变量既未设置又没有默认值时该 server 以“命名变量”的错误停止加载；写 `$${NAME}` 则发送字面文本 `${NAME}`。[@ref-cc-mcp-quickstart]

文件格式（官方给出 HTTP server 形态）：[@ref-cc-mcp-schema]

```json
{
  "mcpServers": {
    "my-server": {
      "transport": "http",
      "enabled": true,
      "url": "https://api.example.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" },
      "env": { "API_KEY": "value" }
    }
  }
}
```

## 认证 {#mcp-auth}

远程 server 需要认证时 Command Code 会自动识别并启动 **OAuth 2.0 Authorization Code + PKCE** 流程：浏览器打开授权页，授权后 token 存到 `~/.commandcode/mcp-tokens.json`，到期自动刷新；刷新失败时用 `cmd mcp auth` 重新认证。也可以事后手动认证，或在会话里的 `/mcp` 菜单交互认证。[@ref-command-code-mcp-auth]

OAuth 也能写进 JSON：`cmd mcp add-json` 支持 `"oauth":{"clientId":"…","callbackPort":8080}`，并可用 `--client-secret` 传入密钥。[@ref-command-code-mcp-auth]

API key 走环境变量（stdio 的 `--env`）或 header（http 的 `--header`）。token 管理命令：`cmd mcp auth --status`（查状态）、`cmd mcp auth --list`（列出有 token 的 server）、`cmd mcp auth --clear`（清除）。[@ref-command-code-mcp-auth][@ref-cc-mcp-reference]

安全边界：MCP 工具能访问外部服务，每个连接都要显式 `cmd mcp add`；OAuth token 本地存储；可随时用 `cmd mcp list` 或 `/mcp` 复核已连接的 server；文档的结论是只连接你信任的 MCP server。[@ref-cc-security-mcp]

## 生命周期、超时与限额 {#mcp-lifecycle}

- **连接状态**：`/mcp` 菜单列出所有已配置 server 及其连接状态，用颜色区分——绿（已连接）、青（已认证）、黄（需要认证）、红（错误），并显示每个已连接 server 的工具数量。[@ref-cc-mcp-menu]
- **启用开关**：文件格式里有 `enabled` 布尔字段（见上一节的 schema），文档在 schema 与作用域示例中把 server 条目当作可启停对象。[@ref-cc-mcp-schema]
- **超时与输出上限**：环境变量 `MCP_TOOL_TIMEOUT`（单次 MCP 工具请求超时，毫秒）与 `MAX_MCP_OUTPUT_TOKENS`（MCP 工具输出 token 上限，默认 `25000`）。[@ref-cc-settings-env]
- **初始化延迟**：工具在 server 连接后出现，排查页注明“server 启动后可能要几秒才初始化完成”。[@ref-cc-mcp-trouble]
- **重连 / 重试 / 缓存**：文档没有给出重连退避、失败重试次数或工具缓存策略的字段；排查页给的办法是重认证或重启会话。[@ref-cc-mcp-trouble]

**缺口（`mcp.lifecycle`）**：固定来源确认了连接状态的观察入口（`/mcp`）、`enabled` 开关、超时与输出上限环境变量，以及“初始化需要几秒”的行为，但没有写明 server 是“会话启动即连接”还是“首次调用才连接”、失败后的自动重试/退避策略、工具列表缓存时长，也没有给出“禁用某个 server 后何时生效”的说明。这些保持未验证。[@ref-cc-mcp-menu][@ref-cc-settings-env]

## 工具能力与权限暴露 {#mcp-capabilities}

server 连接后其工具与内置工具并列，命名约定为 `mcp__` 加 server 名、再 `__`、再工具名（文档示例：`mcp__notion__search_page`、`mcp__github__create_issue`）。模型按自然语言选择工具，Command Code 自动发现并调用。[@ref-cc-mcp-tools]

权限引擎用同一套规则控制 MCP 工具的可见/可调用性，规则键就是规范名 `mcp__server__tool`（显示名从不作为键）：`mcp__github__get_issue`（单个工具）、`mcp__github__*`（某 server 全部工具）、`mcp__github__get_*`（前缀匹配）、`mcp__*`（所有 server，仅 `deny`/`ask` 支持）。`deny` 胜 `ask` 胜 `allow`，在任何模式（包括 `yolo`）下都生效。[@ref-cc-perm-rules][@ref-cc-perm-mcp]

子代理走同一条有序管线，但主循环会弹交互提示的地方，子代理策略**自动允许**（无人可答）；硬边界仍然成立：子代理不能运行被 `deny` 规则挡住的工具，安全类提示（破坏性命令、敏感文件、工作区外写入、显式 `ask` 规则）**失败关闭**（拒绝）。[@ref-cc-perm-mcp]

**缺口（`mcp.capabilities`）**：文档详述了 tools，并明确“有些 server 只暴露 resources”，但没有说明 Command Code 是否把 MCP **resources** 或 **prompts** 暴露给模型、以什么入口读取资源。因此 tools 可确认可用，resources/prompts 保持未验证。[@ref-cc-mcp-tools]

## 诊断 {#mcp-diagnostics}

- **列表与详情**：`cmd mcp list` 列出全部已配置 server；`cmd mcp get` 加 server 名 查看单个 server 的详情（排查页第一步就是它）；`cmd mcp remove` 删除配置。[@ref-cc-mcp-reference]
- **会话内**：`/mcp` 显示每个 server 的连接状态、颜色指示灯、工具数量，并提供连接、认证、移除操作。[@ref-cc-mcp-menu]
- **连不上**：核对 URL/命令是否正确（`cmd mcp get`）、stdio 命令是否已安装并在 `PATH` 里、用 `/mcp` 看具体错误信息。[@ref-cc-trouble-mcp][@ref-cc-mcp-trouble]
- **认证失败**：`cmd mcp auth` 加 server 名 重认证；`cmd mcp auth --clear` 加 server 名、再 `cmd mcp auth` 加 server 名；`cmd mcp auth --status` 加 server 名 查 token 状态。[@ref-cc-trouble-mcp-auth]
- **工具不出现**：确认 server 已连接、给 server 几秒初始化、确认该 server 确实暴露工具（有些只暴露 resources）。[@ref-cc-mcp-trouble]
