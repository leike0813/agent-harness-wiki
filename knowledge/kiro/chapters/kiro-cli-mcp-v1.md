---
schema_version: 3
record_kind: production
edition_id: kiro-cli-mcp-v1
harness_id: kiro
topic: mcp
title: "Kiro CLI 的 MCP 配置、传输与能力暴露"
sections:
  - section_id: mcp-config
    surface_ids: [cli]
    source_refs: [ref-kiro-mcpfile-locations, ref-kiro-config-paths, ref-kiro-mcp-setup, ref-kiro-clicmd-mcp, ref-kiro-mcp-agent, ref-kiro-agentref-includemcp, ref-kiro-mcpfile-structure, ref-kiro-mcpfile-props, ref-kiro-mcpfile-env, ref-kiro-mcpregistry-add, ref-kiro-mcpregistry-hidden]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-kiro-mcp-setup, ref-kiro-mcpfile-props, ref-kiro-v3agent-mcp, ref-kiro-mcpusage-manage]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-kiro-mcpfile-oauth, ref-kiro-mcpfile-structure, ref-kiro-mcpfile-refresh, ref-kiro-mcpfile-creds, ref-kiro-slash-mcp]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-kiro-mcpfile-priority, ref-kiro-mcpfile-hotreload, ref-kiro-mcpfile-disable, ref-kiro-settings-mcp, ref-kiro-headless-run, ref-kiro-exitcodes, ref-kiro-mcpregistry-hidden]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-kiro-mcpusage-tools, ref-kiro-mcpusage-manage, ref-kiro-mcpusage-prompts, ref-kiro-mcpusage-resources, ref-kiro-mcpusage-elicitation, ref-kiro-permissions-capabilities, ref-kiro-toolsearch-enable, ref-kiro-toolsearch-how, ref-kiro-mcp-troubleshooting]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kiro-slash-mcp, ref-kiro-clicmd-mcp, ref-kiro-mcpfile-troubleshooting, ref-kiro-mcp-troubleshooting, ref-kiro-mcpusage-trouble]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: answered
        source_refs: [ref-kiro-mcpfile-locations, ref-kiro-mcp-setup, ref-kiro-mcp-agent, ref-kiro-mcpregistry-add]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: answered
        source_refs: [ref-kiro-mcpfile-structure, ref-kiro-mcpfile-props, ref-kiro-mcpfile-env]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-kiro-mcpfile-props, ref-kiro-v3agent-mcp]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-kiro-mcpfile-oauth, ref-kiro-mcpfile-creds, ref-kiro-mcpfile-refresh]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-kiro-mcpfile-priority, ref-kiro-mcpfile-hotreload, ref-kiro-settings-mcp]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-kiro-mcpusage-tools, ref-kiro-mcpusage-prompts, ref-kiro-mcpusage-resources, ref-kiro-mcpusage-elicitation]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-kiro-mcpusage-manage, ref-kiro-permissions-capabilities, ref-kiro-toolsearch-enable]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-kiro-slash-mcp, ref-kiro-clicmd-mcp, ref-kiro-mcp-troubleshooting]
---

## 配置入口、作用域与字段 {#mcp-config}

MCP server 有两个配置文件作用域，都是 JSON：工作区 `.kiro/settings/mcp.json`（只对本工作区生效）与用户级 `~/.kiro/settings/mcp.json`（对所有工作区生效）。两个文件同时存在时**合并，工作区设置优先**。[@ref-kiro-mcpfile-locations]

配置作用域参考页把这两条路径与 `settings/permissions.yaml`、`agents/`、`steering/`、`skills/`、`hooks/`、`powers/` 并列为 "File paths" 表的一行，说明 MCP 配置属于同一个 `.kiro` 配置体系。[@ref-kiro-config-paths]

CLI 还提供命令行与斜杠入口，用来在不手写 JSON 的情况下增删 server：[@ref-kiro-mcp-setup][@ref-kiro-clicmd-mcp]

```bash
kiro-cli mcp add \
  --name "fetch" \
  --scope global \
  --command "uvx" \
  --args "mcp-server-fetch"
```

`kiro-cli mcp` 的子命令为 `add`（`--name`/`--command` 必填，另有 `--scope workspace|global`、`--env key1=value1,key2=value2`、`--timeout`、`--force`）、`remove`、`list [SCOPE]`、`import --file CFG [SCOPE]`、`status --name SERVER`。文档另给出 `kiro-cli mcp add --name git-server --agent rust-dev` 形式，把 server 写进某个 agent 的配置。[@ref-kiro-clicmd-mcp][@ref-kiro-mcpfile-locations]

**Agent 作用域**：自定义 agent 用 `mcpServers` 字段定义自己的 server；`includeMcpJson` 决定是否同时纳入工作区/用户 `mcp.json` 里的 server，为 `true` 时两者叠加。[@ref-kiro-mcp-agent][@ref-kiro-agentref-includemcp]

配置文件结构（官方原文，`mcpServers` 为顶层键）：[@ref-kiro-mcpfile-structure]

```json
{
  "mcpServers": {
    "local-server-name": {
      "command": "command-to-run-server",
      "args": ["arg1", "arg2"],
      "env": {
        "ENV_VAR1": "hard-coded-variable",
        "ENV_VAR2": "${EXPANDED_VARIABLE}"
      },
      "disabled": false,
      "autoApprove": ["tool_name1", "tool_name2"],
      "disabledTools": ["tool_name3"]
    },
    "remote-server-name": {
      "url": "https://endpoint.to.connect.to",
      "headers": { "HEADER1": "value1" },
      "disabled": false,
      "autoApprove": ["tool_name1"],
      "disabledTools": ["tool_name3"]
    }
  }
}
```

字段表（官方 "Configuration properties"）：本地 server 用 `command`（必需）、`args`、`env`、`disabled`（默认 `false`）、`autoApprove`（可用 `"*"` 表示全部）、`disabledTools`；远程 server 用 `url`（必需，HTTPS，或 localhost 的 HTTP）、`headers`、`env`、`oauth`、`oauthScopes`、`disabled`、`autoApprove`、`disabledTools`。[@ref-kiro-mcpfile-props]

**环境变量展开**：`env` 值支持 `${VAR}` 语法在运行时展开。CLI 不在启动时自动读取项目 `.env`，官方要求先在 shell 中 `export`，Kiro CLI 才能取到；固定来源出于安全只展开被显式批准的环境变量（IDE 侧有 "Mcp Approved Env Vars" 设置项，CLI 侧文档只强调先 export）。[@ref-kiro-mcpfile-env]

**企业注册表（registry）模式**：使用 IAM Identity Center 的团队可由管理员集中控制可用 server。启用后 registry 是唯一来源，`mcp.json` 里名字不在 registry 中的 server 会被隐藏且从不启动；`mcp.json` 中名字命中的条目仍可用于提供本机专属取值（如密钥、路径），其 `env`/`headers` 按 key 合并覆盖 registry 默认值。[@ref-kiro-mcpregistry-add][@ref-kiro-mcpregistry-hidden]

## 传输类型 {#mcp-transport}

文档开头的能力表（CLI 列）确认本地 stdio server 与远程 HTTP/SSE server 在 CLI 都可用。两种传输的判别完全落在字段上：**有 `command` 的是本地 stdio**，**有 `url` 的是远程 HTTP/SSE**（`url` 要求 HTTPS，localhost 可用 HTTP），`headers` 只对远程生效。[@ref-kiro-mcp-setup][@ref-kiro-mcpfile-props]

Agent 内联的 `mcpServers` 同样支持两种传输：stdio server 接受 `timeout`（毫秒，连接握手超时），HTTP server 接受 `headers`；两者的值都用 `$` 语法在运行时展开环境变量。[@ref-kiro-v3agent-mcp]

示例（官方 "Remote server with headers"，凭据用占位符）：[@ref-kiro-mcpfile-props]

```json
{
  "mcpServers": {
    "api-server": {
      "url": "https://api.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${API_TOKEN}",
        "X-Custom-Header": "value"
      }
    }
  }
}
```

注意：Kiro Web 只支持沙箱内配置的本地 stdio server，远程 HTTP/SSE 在 Web 不可用——这是 Web 侧的限制，不影响 CLI。[@ref-kiro-mcpusage-manage]

## 认证与凭据 {#mcp-auth}

**远程 OAuth**：文档写明 Kiro 在连接需要 OAuth 的 server 时"handles the browser-based OAuth flow automatically"。多数 server 用 Dynamic Client Registration（DCR），无需额外配置；不支持 DCR 的服务（文档点名 Figma、Slack、GitHub）可自带凭据。OAuth 属性表：[@ref-kiro-mcpfile-oauth]

| 属性 | 说明 |
| :-- | :-- |
| `oauth.clientId` | 预注册的 client ID；设置后完全跳过 DCR |
| `oauth.clientSecret` | 需要机密客户端时的密钥；**仅 CLI 支持**（IDE 只支持 PKCE 公共客户端） |
| `oauth.redirectUri` | 自定义 loopback 回调地址；格式支持完整 URL、`127.0.0.1:port`、`:port`，省略时由操作系统分配随机端口 |
| `oauth.clientMetadataUrl` | 托管 Client ID Metadata Document 的 HTTPS URL；与 `clientId` 互斥 |
| `oauth.oauthScopes` | 请求的 scope，优先于顶层 `oauthScopes` |

顶层 `oauthScopes` 与 `oauth.oauthScopes` 都未设置时，Kiro 请求默认 scope 集 `openid`、`email`、`profile`、`offline_access`。自带身份提供方时，文档要求授权服务器在 RFC 8414 的 well-known 地址提供元数据并支持 JWKS 校验，且 `issuer` 必须**逐字符**匹配（含末尾斜杠）——`https://auth.example.com` 与 `https://auth.example.com/` 视为不同 issuer，不匹配即中止发现。[@ref-kiro-mcpfile-oauth]

**Header token**：非 OAuth 的远程 server 用 `headers` 传 `Authorization: Bearer ${API_TOKEN}` 这类值，凭据来自环境变量，不写死在配置里。[@ref-kiro-mcpfile-structure]

**刷新**：会话内 token 过期且无 refresh token 时，Kiro 自动触发新的浏览器认证流程，server 用新 token 重连，无需重启会话。[@ref-kiro-mcpfile-refresh]

**手工管理（CLI）**：`/mcp auth [server]` 强制重新认证，`/mcp cancel-auth [server]` 中止卡住的认证流程，`/mcp logout [server]` 删除本地缓存的凭据；MCP 面板状态下对应快捷键 `^A`、`^X`、`^R`。[@ref-kiro-mcpfile-creds][@ref-kiro-slash-mcp]

## 加载、优先级与生命周期 {#mcp-lifecycle}

**加载优先级**（高到低）：Agent 配置的 `mcpServers` → 工作区 `.kiro/settings/mcp.json` → 全局 `~/.kiro/settings/mcp.json`。同名 server 由高优先级**整体覆盖**，不同名则相加；在 agent 中把同名条目设为 `disabled: true` 可以屏蔽下层配置且不启动该 server。[@ref-kiro-mcpfile-priority]

**热重载**：文件监视器监听 `.kiro/agents` 目录与 `mcp.json`；保存磁盘上的改动后，Kiro 在下一个空闲边界（两轮之间）做协调。只有变化的 server 会重启，键顺序变化不算改动，会话中通过 `/mcp add` 注入的 server 会在协调时重新合并。[@ref-kiro-mcpfile-hotreload]

**禁用**：`disabled: true` 暂时停用 server 而不删配置；`disabledTools` 让 server 保持连接但从 agent 可见工具中剔除指定工具。[@ref-kiro-mcpfile-disable]

**超时设置**：`mcp.initTimeout`（MCP server 初始化超时，默认 `5000` 毫秒）与 `mcp.noInteractiveTimeout`（非交互运行的初始化超时，默认 `30000` 毫秒）通过 `kiro-cli settings` 调整。[@ref-kiro-settings-mcp]

**脚本/CI 场景**：非交互运行默认只把 MCP 启动失败记为警告；加 `--require-mcp-startup` 会在运行前等待 MCP server，V3 下若 server 启动失败、状态无法确定或 30 秒内未上报状态，CLI 以退出码 `3`（MCP Startup Failure）退出。[@ref-kiro-headless-run][@ref-kiro-exitcodes]

registry 模式下，"server 是否可能启动"还受管理员名单限制：名字不在 registry 中的 server 直接被隐藏，不进入启动流程。[@ref-kiro-mcpregistry-hidden]

## 能力暴露：tools、prompts、resources 与审批 {#mcp-capabilities}

MCP server 可以向 Kiro 暴露三类内容，文档分别说明：[@ref-kiro-mcpusage-tools]

- **Tools**：Kiro 按问题语义自动选择工具；也可显式描述要调用的操作。CLI 用 `/tools` 查看所有可用 MCP 工具及其 token 占用。[@ref-kiro-mcpusage-manage]
- **Prompts**：server 提供的可复用提示模板，在 CLI 里通过输入 `#` 打开上下文提供方菜单选择；带参数的 prompt 会先弹表单填参数再插入会话。文档强调 prompt 始终由用户发起，"Kiro never sends a prompt to a server without you selecting it"。[@ref-kiro-mcpusage-prompts]
- **Resource templates**：参数化的 URI 模板，同样出现在 `#` 菜单；选模板后填参数，Kiro 解析 URI 并把资源内容作为上下文加入会话。[@ref-kiro-mcpusage-resources]
- **Elicitation**：工具执行中 server 可反向向用户索取信息。Kiro 在时间线里渲染内联表单（文本/数字/是否/选项）或带 Open 按钮的 URL；用户可提交、拒绝或忽略。[@ref-kiro-mcpusage-elicitation]

**可见与会话过滤**：`autoApprove` 数组里的工具跳过审批提示（`"*"` 表示全部）；`disabledTools` 从 agent 可调用集合中剔除工具。逐个 server 的启用/禁用、重连、禁用全部工具是面板操作，CLI 侧以配置字段与 `/tools` 为准。[@ref-kiro-mcpusage-manage]

**权限层**：MCP 调用还受 capability-based `permissions` 约束——`mcp` 是独立 capability，可用 `match` 匹配 `server/*`、`exclude` 排除危险工具，`effect` 取 `allow`/`ask`/`deny`，并按 deny-overrides（deny > ask > allow）判定。[@ref-kiro-permissions-capabilities]

**Tool Search（按需加载工具）**：MCP 工具定义过多时可启用 `toolSearch.enabled`，把完整 JSON schema 换成 `server_name::tool_name: description` 的紧凑列表，模型按需调用内置 `tool_search` 工具（参数 `tool_id` 或 `query`，可选 `max_results`，默认 5）再加载完整 schema。激活阈值由 `toolSearch.minPct`（默认 5，上下文占比）与 `toolSearch.minTokens`（默认 50000）控制，任一超阈即激活；两者都设为 0 表示只要有 MCP 工具就启用。[@ref-kiro-toolsearch-enable][@ref-kiro-toolsearch-how]

**工具校验告警**：名字超过 64 字符（含 server 前缀）、不匹配 `^[a-zA-Z][a-zA-Z0-9_]*$` 或 description 为空的工具会被"excluded due to validation errors"；description 超过 10,000 字符会触发 "large descriptions" 告警（仍可用，但可能拖慢响应）。[@ref-kiro-mcp-troubleshooting]

## 诊断 {#mcp-diagnostics}

- `/mcp`：列出当前活动的 MCP server、其可用工具与受管 server 的 registry 状态；组织禁用 MCP 时会显示 `MCP has been disabled by your administrator` 或 `Failed to retrieve MCP settings — MCP disabled`（不可达治理 API 时 fail closed）。[@ref-kiro-slash-mcp]
- `kiro-cli mcp list [workspace|global]` 查看已配置 server；`kiro-cli mcp status --name SERVER` 取单个 server 状态。[@ref-kiro-clicmd-mcp]
- 排查顺序（官方）：校验 JSON 语法 → 确认命令在 PATH 中 → 检查环境变量是否已 export → 对照加载优先级 `cat .kiro/settings/mcp.json` / `cat ~/.kiro/settings/mcp.json`。[@ref-kiro-mcpfile-troubleshooting]
- 症状对照：连接失败查依赖是否安装；权限错误查 token/key 是否有效；工具无响应看 MCP 日志；配置不加载先校验 JSON 语法。CLI 侧用 `/mcp` 看状态并观察启动时的终端输出。[@ref-kiro-mcp-troubleshooting]
- 工具可用性排查：确认 server 已配置且运行、检查是否需要审批、必要时换更具体的请求措辞。[@ref-kiro-mcpusage-trouble]

**缺口**：固定来源没有给出 server 启动/重连的重试次数与退避策略、MCP 日志的独立文件路径（IDE 有 "Kiro - MCP Logs" 输出通道，CLI 侧只说看终端输出），以及 `/tools` 之外的工具级健康检查入口。这些点保持未验证。
