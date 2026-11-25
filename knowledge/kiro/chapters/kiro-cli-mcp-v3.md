---
schema_version: 3
record_kind: production
edition_id: kiro-cli-mcp-v3
harness_id: kiro
topic: mcp
title: "Kiro CLI 的 MCP 配置、传输与能力暴露"
sections:
  - section_id: mcp-config
    surface_ids: [cli]
    source_refs: [ref-kiro-mcpfile-locations, ref-kiro-config-paths, ref-kiro-mcp-setup, ref-kiro-clicmd-mcp, ref-kiro-mcp-agent, ref-kiro-agentref-includemcp, ref-kiro-mcpfile-structure, ref-kiro-mcpfile-props, ref-kiro-mcpfile-env, ref-kiro-mcpregistry-add, ref-kiro-mcpregistry-hidden, ref-kiro-mcpcli-add-flags, ref-kiro-mcp-timeout, ref-kiro-mcp-registry-v3]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-kiro-mcp-setup, ref-kiro-mcpfile-props, ref-kiro-v3agent-mcp, ref-kiro-mcpusage-manage, ref-kiro-mcp-timeout, ref-kiro-mcp-web-mobile-support, ref-kiro-mcp-web-oauth-unused]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-kiro-mcpfile-oauth, ref-kiro-mcpfile-structure, ref-kiro-mcpfile-refresh, ref-kiro-mcpfile-creds, ref-kiro-slash-mcp, ref-kiro-mcp-orgsignin, ref-kiro-mcp-oauthscope-precedence, ref-kiro-mcpcli-idp, ref-kiro-mcp-elicitation-v3, ref-kiro-slash-mcp-orgsignin]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-kiro-mcpfile-priority, ref-kiro-mcpfile-hotreload, ref-kiro-mcpfile-disable, ref-kiro-settings-mcp, ref-kiro-headless-run, ref-kiro-exitcodes, ref-kiro-mcpregistry-hidden, ref-kiro-mcp-timeout, ref-kiro-mcp-registry-v3]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-kiro-mcpusage-tools, ref-kiro-mcpusage-manage, ref-kiro-mcpusage-prompts, ref-kiro-mcpusage-resources, ref-kiro-mcpusage-elicitation, ref-kiro-permissions-capabilities, ref-kiro-toolsearch-enable, ref-kiro-toolsearch-how, ref-kiro-mcp-troubleshooting, ref-kiro-mcp-toolsearch-auto, ref-kiro-mcp-toolsearch-v3, ref-kiro-mcp-toolsearch-verify, ref-kiro-mcp-untrusted-approvals, ref-kiro-mcp-elicitation-v3]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kiro-slash-mcp, ref-kiro-clicmd-mcp, ref-kiro-mcpfile-troubleshooting, ref-kiro-mcp-troubleshooting, ref-kiro-mcpusage-trouble, ref-kiro-mcpcli-idp, ref-kiro-mcp-registry-v3, ref-kiro-slash-mcp-orgsignin]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: answered
        source_refs: [ref-kiro-mcpfile-locations, ref-kiro-mcp-setup, ref-kiro-mcp-agent, ref-kiro-mcpregistry-add, ref-kiro-mcpcli-add-flags]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: answered
        source_refs: [ref-kiro-mcpfile-structure, ref-kiro-mcpfile-props, ref-kiro-mcpfile-env, ref-kiro-mcp-timeout]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-kiro-mcpfile-props, ref-kiro-v3agent-mcp, ref-kiro-mcp-web-mobile-support]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-kiro-mcpfile-oauth, ref-kiro-mcpfile-creds, ref-kiro-mcpfile-refresh, ref-kiro-mcp-orgsignin, ref-kiro-mcp-oauthscope-precedence]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-kiro-mcpfile-priority, ref-kiro-mcpfile-hotreload, ref-kiro-settings-mcp, ref-kiro-mcp-timeout]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-kiro-mcpusage-tools, ref-kiro-mcpusage-prompts, ref-kiro-mcpusage-resources, ref-kiro-mcpusage-elicitation, ref-kiro-mcp-elicitation-v3, ref-kiro-mcp-toolsearch-auto]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-kiro-mcpusage-manage, ref-kiro-permissions-capabilities, ref-kiro-toolsearch-enable, ref-kiro-mcp-untrusted-approvals, ref-kiro-mcp-toolsearch-v3]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-kiro-slash-mcp, ref-kiro-clicmd-mcp, ref-kiro-mcp-troubleshooting, ref-kiro-mcpcli-idp]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。正文中的 "V3"、"3.x" 等版本标记均来自来源原文，不是本章自行推断的版本映射。

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

`kiro-cli mcp add` 的字段在 3.5.0 前后扩充过：除 `--name`、`--command`、`--scope workspace|global`、`--env key1=value1,key2=value2`、`--timeout`、`--force` 外，现有 `--args`（可重复、逗号列表或 JSON 数组）、`--url`（HTTP server）、`--oauth-mode browser|enterprise|auto`（3.5.0+，需要 `--url`）、`--oauth-client-id`（3.5.0+，需要 `--url`）、`--agent AGENT`（写进指定 agent 的配置）与 `--disabled`（加入时即禁用）。`--command` 与 `--url` 二选一；`--oauth-mode`/`--oauth-client-id` 在缺少 `--url` 时报参数错误，组织 registry 管理该 server 的 OAuth 时这两个参数被拒绝。其余子命令为 `remove`、`list [SCOPE]`、`import --file CFG [SCOPE]`、`status --name SERVER` 与 `idp`（见认证一节）。[@ref-kiro-clicmd-mcp][@ref-kiro-mcpcli-add-flags]

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

字段表（官方 "Configuration properties"）：本地 server 用 `command`（必需）、`args`、`env`、`disabled`（默认 `false`）、`autoApprove`（可用 `"*"` 表示全部）、`disabledTools`；远程 server 用 `url`（必需，HTTPS，或 localhost 的 HTTP）、`headers`、`env`、`oauth`（含 `oauth.mode`）、`oauthScopes`、`disabled`、`autoApprove`、`disabledTools`。[@ref-kiro-mcpfile-props]

**连接超时字段**：在 Kiro CLI 中，stdio 与 HTTP 两类 server 都接受 `timeout`（毫秒）。V2 会话还接受拼写 `timeoutMs`；3.4.0 起的 V3 也接受 `timeoutMs`，但两者同时设置时 `timeout` 生效、`timeoutMs` 无效。[@ref-kiro-mcp-timeout]

**环境变量展开**：`env` 值支持 `${VAR}` 语法在运行时展开。CLI 不在启动时自动读取项目 `.env`，官方要求先在 shell 中 `export`，Kiro CLI 才能取到；固定来源出于安全只展开被显式批准的环境变量（IDE 侧有 "Mcp Approved Env Vars" 设置项，CLI 侧文档只强调先 export）。[@ref-kiro-mcpfile-env]

**企业注册表（registry）模式**：使用 IAM Identity Center 的团队可由管理员集中控制可用 server。启用后 registry 是唯一来源，`mcp.json` 里名字不在 registry 中的 server 会被隐藏且从不启动；`mcp.json` 中名字命中的条目仍可用于提供本机专属取值（如密钥、路径），其 `env`/`headers` 按 key 合并覆盖 registry 默认值。[@ref-kiro-mcpregistry-add][@ref-kiro-mcpregistry-hidden]

**V3 的 registry 匹配更严格**：在 CLI V3 会话里，仅名字命中不够；registry server 只有在 `mcp.json` 条目"按 registry 要求声明"时才运行，自带 `command` 或 `url` 的同名条目会被跳过，`/mcp` 会列出被 registry 隐藏的已配置 server，`kiro-cli mcp list` 把这类 server 标为 skipped。来源原文在此处写作 "declared as ``."，inline code 内容为空（正文缺失），因此**registry 条目到底要声明成什么形状无法从该快照确认**，本章不补写猜测语法。[@ref-kiro-mcp-registry-v3]

Registry 的 URL 与其它管理员 MCP 设置**不适用于 Kiro Web 会话**；Web 的 MCP 配置来自沙箱设置或仓库内的 `.kiro/settings/mcp.json`。[@ref-kiro-mcpregistry-hidden]

## 传输类型 {#mcp-transport}

文档开头的能力表（CLI 列）确认本地 stdio server 与远程 HTTP/SSE server 在 CLI 都可用；同一张表也把 Web 与 Mobile 的本地、远程与 JSON 配置列为可用，只有 server 提供的 prompts/resources 不在 Mobile。[@ref-kiro-mcp-setup][@ref-kiro-mcpfile-props][@ref-kiro-mcp-web-mobile-support]

两种传输的判别完全落在字段上：**有 `command` 的是本地 stdio**，**有 `url` 的是远程 HTTP/SSE**（`url` 要求 HTTPS，localhost 可用 HTTP），`headers` 只对远程生效。[@ref-kiro-mcp-setup][@ref-kiro-mcpfile-props]

Agent 内联的 `mcpServers` 同样支持两种传输：stdio server 接受 `timeout`（毫秒，连接握手超时），HTTP server 接受 `headers`；两者的值都用 `$` 语法在运行时展开环境变量。[@ref-kiro-v3agent-mcp] 配置文件层面的 `timeout`/`timeoutMs` 规则见上一节。[@ref-kiro-mcp-timeout]

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

**Web 与 Mobile 的传输边界**：两者都支持远程 HTTP/SSE，但 `mcp.json` 里的 `oauth` 设置不生效——远程 server 用 URL 加可选 headers（如带 secret 的 `Authorization`），需要 OAuth 登录的服务要改用它对应的 Power 并选择 **Authorize**。这是跨界面的差异，不影响 CLI（CLI 的 `oauth` 配置见认证一节）。[@ref-kiro-mcp-web-mobile-support][@ref-kiro-mcp-web-oauth-unused][@ref-kiro-mcpusage-manage]

## 认证与凭据 {#mcp-auth}

**远程 OAuth**：文档写明 Kiro 在连接需要 OAuth 的 server 时"handles the browser-based OAuth flow automatically"。多数 server 用 Dynamic Client Registration（DCR），无需额外配置；不支持 DCR 的服务（文档点名 Figma、Slack、GitHub）可自带凭据。OAuth 属性表：[@ref-kiro-mcpfile-oauth]

| 属性 | 说明 |
| :-- | :-- |
| `oauth.clientId` | 预注册的 client ID；设置后完全跳过 DCR |
| `oauth.clientSecret` | 需要机密客户端时的密钥；**仅 CLI 支持**（IDE 只支持 PKCE 公共客户端） |
| `oauth.redirectUri` | 自定义 loopback 回调地址；格式支持完整 URL、`127.0.0.1:port`、`:port`，省略时由操作系统分配随机端口 |
| `oauth.clientMetadataUrl` | 托管 Client ID Metadata Document 的 HTTPS URL；与 `clientId` 互斥 |
| `oauth.oauthScopes` | 请求的 scope；与顶层 `oauthScopes` 的优先级随客户端与版本变化 |
| `oauth.mode` | `browser`（默认）、`enterprise` 或 `auto`：V3 会话如何取得该 HTTP server 的 token（3.5.0+；V2 忽略） |

**scope 优先级**：V2 会话中 `oauth.oauthScopes` 优先；CLI V3 在 3.4.0 及以后、IDE 在 1.4.215 及以后改为**顶层 `oauthScopes` 优先**，只有顶层未设置时才读 `oauth.oauthScopes` 再读 `oauth.scopes`；3.4.0 之前的 V3 完全忽略嵌套值。跨客户端要一致就只写一处。顶层与嵌套都未设置时，Kiro 请求默认 scope 集 `openid`、`email`、`profile`、`offline_access`。[@ref-kiro-mcp-oauthscope-precedence][@ref-kiro-mcpfile-oauth]

自带身份提供方时，文档要求授权服务器在 RFC 8414 的 well-known 地址提供元数据并支持 JWKS 校验，且 `issuer` 必须**逐字符**匹配（含末尾斜杠）——`https://auth.example.com` 与 `https://auth.example.com/` 视为不同 issuer，不匹配即中止发现。[@ref-kiro-mcpfile-oauth]

**组织统一登录（Organization sign-in）**：IDE 1.4.236+ 与 CLI 3.5.0+ 可让多个 HTTP MCP server 共用组织身份提供方的一次登录。`identityProvider` 块（`issuer`、`clientId`，可选 `name`、`authorizationEndpoint`、`tokenEndpoint`）**只从用户级 `~/.kiro/settings/mcp.json` 读取**，写在 workspace 文件里会被忽略；每个非 registry 管理的 server 用 `oauth.mode` 选择模式：`browser`（逐 server 浏览器登录）、`enterprise`（只用组织登录，未配置时失败）、`auto`（server 支持时用组织登录，否则回退浏览器）。registry 管理 OAuth 的 server 不得设置 `oauth.mode`。[@ref-kiro-mcp-orgsignin][@ref-kiro-mcpcli-idp]

CLI 侧的配置入口是 `kiro-cli mcp idp setup --issuer URL --client-id ID`（`setup` 只写配置，不登录、不连接）、`idp show` 与 `idp remove`；URL 必须是 HTTPS，只有 `localhost`/`127.0.0.1`/`[::1]` 的 loopback 地址允许 HTTP。配置完成后在 V3 会话的 `/mcp` 面板的 `org sign-in` 行按 Enter 完成登录，该行显示提供方名称与登录状态（`not signed in`、`session expired`、`signing in` 等）。[@ref-kiro-mcpcli-idp][@ref-kiro-slash-mcp-orgsignin]

**Header token**：非 OAuth 的远程 server 用 `headers` 传 `Authorization: Bearer ${API_TOKEN}` 这类值，凭据来自环境变量，不写死在配置里。[@ref-kiro-mcpfile-structure]

**刷新**：会话内 token 过期且无 refresh token 时，Kiro 自动触发新的浏览器认证流程，server 用新 token 重连，无需重启会话。[@ref-kiro-mcpfile-refresh]

**手工管理（CLI）**：`/mcp auth [server]` 强制重新认证，`/mcp cancel-auth [server]` 中止卡住的认证流程，`/mcp logout [server]` 删除本地缓存的凭据；MCP 面板状态下对应快捷键 `^A`、`^X`、`^R`。若配置了组织统一登录，面板第一行是 `org sign-in`：`Enter` 登录，`^R` 登出/取消进行中的登录。[@ref-kiro-mcpfile-creds][@ref-kiro-slash-mcp][@ref-kiro-mcpcli-idp]

## 加载、优先级与生命周期 {#mcp-lifecycle}

**加载优先级**（高到低）：Agent 配置的 `mcpServers` → 工作区 `.kiro/settings/mcp.json` → 全局 `~/.kiro/settings/mcp.json`。同名 server 由高优先级**整体覆盖**，不同名则相加；在 agent 中把同名条目设为 `disabled: true` 可以屏蔽下层配置且不启动该 server。[@ref-kiro-mcpfile-priority]

**热重载**：文件监视器监听 `.kiro/agents` 目录与 `mcp.json`；保存磁盘上的改动后，Kiro 在下一个空闲边界（两轮之间）做协调。只有变化的 server 会重启，键顺序变化不算改动，会话中通过 `/mcp add` 注入的 server 会在协调时重新合并。[@ref-kiro-mcpfile-hotreload]

**禁用**：`disabled: true` 暂时停用 server 而不删配置；`disabledTools` 让 server 保持连接但从 agent 可见工具中剔除指定工具。[@ref-kiro-mcpfile-disable]

**超时设置**：配置文件里的 `timeout`/`timeoutMs` 管连接握手；`mcp.initTimeout`（MCP server 初始化超时，默认 `5000` 毫秒）与 `mcp.noInteractiveTimeout`（非交互运行的初始化超时，默认 `30000` 毫秒）通过 `kiro-cli settings` 调整。[@ref-kiro-mcp-timeout][@ref-kiro-settings-mcp]

**脚本/CI 场景**：非交互运行默认只把 MCP 启动失败记为警告；加 `--require-mcp-startup` 会在运行前等待 MCP server，V3 下若 server 启动失败、状态无法确定或 30 秒内未上报状态，CLI 以退出码 `3`（MCP Startup Failure）退出。[@ref-kiro-headless-run][@ref-kiro-exitcodes]

registry 模式下，"server 是否可能启动"还受管理员名单限制：名字不在 registry 中的 server 直接被隐藏，不进入启动流程；V3 会话里名字命中但自带 `command`/`url` 的条目同样被跳过。[@ref-kiro-mcpregistry-hidden][@ref-kiro-mcp-registry-v3]

## 能力暴露：tools、prompts、resources 与审批 {#mcp-capabilities}

MCP server 可以向 Kiro 暴露三类内容，文档分别说明：[@ref-kiro-mcpusage-tools]

- **Tools**：Kiro 按问题语义自动选择工具；也可显式描述要调用的操作。CLI 用 `/tools` 查看所有可用 MCP 工具及其 token 占用。[@ref-kiro-mcpusage-manage]
- **Prompts**：server 提供的可复用提示模板，在 CLI 里通过输入 `#` 打开上下文提供方菜单选择；带参数的 prompt 会先弹表单填参数再插入会话。文档强调 prompt 始终由用户发起，"Kiro never sends a prompt to a server without you selecting it"。[@ref-kiro-mcpusage-prompts]
- **Resource templates**：参数化的 URI 模板，同样出现在 `#` 菜单；选模板后填参数，Kiro 解析 URI 并把资源内容作为上下文加入会话。[@ref-kiro-mcpusage-resources]
- **Elicitation**：工具执行中 server 可反向向用户索取信息。Kiro 在时间线里渲染内联表单（文本/数字/是否/选项）或带 Open 按钮的 URL；用户可提交、拒绝或忽略。CLI 从 2.34 起在本地 V3 会话支持 elicitation。[@ref-kiro-mcpusage-elicitation][@ref-kiro-mcp-elicitation-v3]

**可见与会话过滤**：`autoApprove` 数组里的工具跳过审批提示（`"*"` 表示全部）；`disabledTools` 从 agent 可调用集合中剔除工具。逐个 server 的启用/禁用、重连、禁用全部工具是面板操作，CLI 侧以配置字段与 `/tools` 为准。[@ref-kiro-mcpusage-manage]

不受信任的工作区会覆盖 `autoApprove`：每次 MCP 工具调用都要审批，server 请求登录或打开 URL 后重试的调用还会再次询问；执行前 Kiro 会重新核对审批是否仍然有效。[@ref-kiro-mcp-untrusted-approvals]

**权限层**：MCP 调用还受 capability-based `permissions` 约束——`mcp` 是独立 capability，可用 `match` 匹配 `server/*`、`exclude` 排除危险工具，`effect` 取 `allow`/`ask`/`deny`，并按 deny-overrides（deny > ask > allow）判定。[@ref-kiro-permissions-capabilities]

**Tool Search（按需加载工具）**：Kiro IDE 1.3+ 自动使用；Kiro CLI 本地 V3 会话从 2.31 起**默认按需加载 MCP 工具**，无需开启任何设置；没有配置 MCP server 时该机制无效果。V3 在 2.31.1 起把已保存的 `toolSearch.enabled`/`minPct`/`minTokens` 应用到交互与非交互运行，但只有同时保存了 `enabled` 才应用阈值。[@ref-kiro-mcp-toolsearch-auto][@ref-kiro-mcp-toolsearch-v3]

V2 会话仍是显式开启：`kiro-cli settings toolSearch.enabled true`，阈值 `toolSearch.minPct`（默认 5，上下文占比）与 `toolSearch.minTokens`（默认 50000）任一超阈即激活，两者都设为 0 表示只要有 MCP 工具就启用。旧的 `tool_search` 内置工具（参数 `tool_id`/`query`/`max_results`）属于 V2 路径；V3 的按需加载在活动记录里表现为 `tool_load` 后接 `tool_call`。[@ref-kiro-toolsearch-enable][@ref-kiro-toolsearch-how][@ref-kiro-mcp-toolsearch-v3][@ref-kiro-mcp-toolsearch-verify]

**工具校验告警**：名字超过 64 字符（含 server 前缀）、不匹配 `^[a-zA-Z][a-zA-Z0-9_]*$` 或 description 为空的工具会被"excluded due to validation errors"；description 超过 10,000 字符会触发 "large descriptions" 告警（仍可用，但可能拖慢响应）。[@ref-kiro-mcp-troubleshooting]

## 诊断 {#mcp-diagnostics}

- `/mcp`：列出当前活动的 MCP server、其可用工具与受管 server 的 registry 状态；组织禁用 MCP 时会显示 `MCP has been disabled by your administrator` 或 `Failed to retrieve MCP settings — MCP disabled`（不可达治理 API 时 fail closed）。配置组织统一登录后，V3 面板第一行是 `org sign-in`，显示提供方名称与登录状态，`Enter` 登录、`^R` 登出；未配置好 `identityProvider` 时该行显示错误。[@ref-kiro-slash-mcp][@ref-kiro-mcpcli-idp][@ref-kiro-slash-mcp-orgsignin]
- registry 模式下 `/mcp` 会列出被 registry 隐藏的已配置 server，并对 registry 提供的 server 给出声明方式；`kiro-cli mcp list` 把被跳过的同名条目标为 skipped。[@ref-kiro-mcp-registry-v3]
- `kiro-cli mcp list [workspace|global]` 查看已配置 server；`kiro-cli mcp status --name SERVER` 取单个 server 状态。[@ref-kiro-clicmd-mcp]
- 组织统一登录的配置可核对：`kiro-cli mcp idp show` 打印 `issuer`、`clientId` 与可选字段；`idp remove` 删除后 `enterprise` 模式的 server 会失败直到重新配置。[@ref-kiro-mcpcli-idp]
- 排查顺序（官方）：校验 JSON 语法 → 确认命令在 PATH 中 → 检查环境变量是否已 export → 对照加载优先级 `cat .kiro/settings/mcp.json` / `cat ~/.kiro/settings/mcp.json`。[@ref-kiro-mcpfile-troubleshooting]
- 症状对照：连接失败查依赖是否安装；权限错误查 token/key 是否有效；工具无响应看 MCP 日志；配置不加载先校验 JSON 语法。CLI 侧用 `/mcp` 看状态并观察启动时的终端输出。[@ref-kiro-mcp-troubleshooting]
- 工具可用性排查：确认 server 已配置且运行、检查是否需要审批、必要时换更具体的请求措辞。[@ref-kiro-mcpusage-trouble]

**缺口**：registry 条目在 V3 里被认可的确切声明形状（来源原文的 inline code 为空）、server 启动/重连的重试次数与退避策略、MCP 日志的独立文件路径，以及 `/tools` 之外的工具级健康检查入口，固定来源都没有给出。这些点保持未验证。[@ref-kiro-mcp-registry-v3]
