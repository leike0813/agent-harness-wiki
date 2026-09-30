---
schema_version: 3
record_kind: production
edition_id: gemini-cli-cli-mcp-v1
harness_id: gemini-cli
topic: mcp
title: "Gemini CLI 的 MCP 集成：配置入口、传输、认证、生命周期与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-mcp-doc-arch]
  - section_id: mcp-entry-definition
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-mcp-doc-setup, ref-gemini-cli-plugins-ref-manifest, ref-gemini-cli-config-doc-files, ref-gemini-cli-mcp-doc-add, ref-gemini-cli-mcp-doc-global, ref-gemini-cli-settings-mcp, ref-gemini-cli-mcp-doc-override, ref-gemini-cli-config-enterprise-mcpmerge, ref-gemini-cli-settings-mcpservers, ref-gemini-cli-mcp-doc-props, ref-gemini-cli-mcp-doc-structure, ref-gemini-cli-mcp-doc-examples, ref-gemini-cli-mcp-doc-envexpansion, ref-gemini-cli-mcp-doc-sanitize, ref-gemini-cli-mcp-doc-explicit]
  - section_id: mcp-transport-auth
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-mcp-doc-transports, ref-gemini-cli-mcp-doc-connect, ref-gemini-cli-mcp-doc-add, ref-gemini-cli-mcp-doc-examples, ref-gemini-cli-mcp-doc-envexpansion, ref-gemini-cli-mcp-doc-oauth, ref-gemini-cli-mcp-doc-authflow, ref-gemini-cli-mcp-doc-redirect, ref-gemini-cli-mcp-doc-tokens, ref-gemini-cli-mcp-doc-oauthprops, ref-gemini-cli-mcp-doc-authprovider, ref-gemini-cli-mcp-doc-oauthmanage, ref-gemini-cli-cmd-mcp]
  - section_id: mcp-lifecycle-capabilities
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-mcp-doc-connect, ref-gemini-cli-mcp-doc-tooldiscovery, ref-gemini-cli-mcp-doc-namespace, ref-gemini-cli-mcp-doc-connmanage, ref-gemini-cli-cmd-mcp, ref-gemini-cli-mcp-doc-enabledisable, ref-gemini-cli-mcp-doc-resources, ref-gemini-cli-mcp-doc-resdisc, ref-gemini-cli-mcp-res-list, ref-gemini-cli-mcp-res-read, ref-gemini-cli-mcp-doc-prompts, ref-gemini-cli-mcp-doc-promptinvoke, ref-gemini-cli-mcp-doc-instructions, ref-gemini-cli-mcp-doc-richer, ref-gemini-cli-mcp-doc-trustbypass, ref-gemini-cli-mcp-doc-allowlist, ref-gemini-cli-mcp-doc-confirm, ref-gemini-cli-mcp-doc-props, ref-gemini-cli-mcp-doc-global, ref-gemini-cli-config-doc-args, ref-gemini-cli-mcp-policy-syntax, ref-gemini-cli-settings-admin]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-mcp-doc-mcpcmd, ref-gemini-cli-mcp-doc-list, ref-gemini-cli-mcp-doc-status, ref-gemini-cli-mcp-doc-discovery-state, ref-gemini-cli-cmd-mcp, ref-gemini-cli-mcp-doc-issues, ref-gemini-cli-mcp-doc-diagnostics, ref-gemini-cli-mcp-doc-debug]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: answered
        source_refs: [ref-gemini-cli-mcp-doc-setup, ref-gemini-cli-plugins-ref-manifest, ref-gemini-cli-config-doc-files, ref-gemini-cli-mcp-doc-add, ref-gemini-cli-mcp-doc-global, ref-gemini-cli-settings-mcp, ref-gemini-cli-mcp-doc-override, ref-gemini-cli-config-enterprise-mcpmerge]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: partial
        source_refs: [ref-gemini-cli-settings-mcpservers, ref-gemini-cli-mcp-doc-props, ref-gemini-cli-mcp-doc-structure, ref-gemini-cli-mcp-doc-examples, ref-gemini-cli-mcp-doc-envexpansion, ref-gemini-cli-mcp-doc-sanitize, ref-gemini-cli-mcp-doc-explicit]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-gemini-cli-mcp-doc-transports, ref-gemini-cli-mcp-doc-connect, ref-gemini-cli-mcp-doc-add, ref-gemini-cli-mcp-doc-examples]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-gemini-cli-mcp-doc-examples, ref-gemini-cli-mcp-doc-envexpansion, ref-gemini-cli-mcp-doc-oauth, ref-gemini-cli-mcp-doc-authflow, ref-gemini-cli-mcp-doc-redirect, ref-gemini-cli-mcp-doc-tokens, ref-gemini-cli-mcp-doc-oauthprops, ref-gemini-cli-mcp-doc-authprovider, ref-gemini-cli-mcp-doc-oauthmanage, ref-gemini-cli-cmd-mcp]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-capabilities
        status: partial
        source_refs: [ref-gemini-cli-mcp-doc-connect, ref-gemini-cli-mcp-doc-tooldiscovery, ref-gemini-cli-mcp-doc-namespace, ref-gemini-cli-mcp-doc-connmanage, ref-gemini-cli-cmd-mcp, ref-gemini-cli-mcp-doc-enabledisable]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-capabilities
        status: answered
        source_refs: [ref-gemini-cli-mcp-doc-namespace, ref-gemini-cli-mcp-doc-resources, ref-gemini-cli-mcp-doc-resdisc, ref-gemini-cli-mcp-res-list, ref-gemini-cli-mcp-res-read, ref-gemini-cli-mcp-doc-prompts, ref-gemini-cli-mcp-doc-promptinvoke, ref-gemini-cli-mcp-doc-instructions, ref-gemini-cli-mcp-doc-richer]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-capabilities
        status: answered
        source_refs: [ref-gemini-cli-mcp-doc-trustbypass, ref-gemini-cli-mcp-doc-allowlist, ref-gemini-cli-mcp-doc-confirm, ref-gemini-cli-mcp-doc-props, ref-gemini-cli-mcp-doc-global, ref-gemini-cli-config-doc-args, ref-gemini-cli-mcp-policy-syntax, ref-gemini-cli-mcp-doc-namespace, ref-gemini-cli-settings-admin]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-gemini-cli-mcp-doc-mcpcmd, ref-gemini-cli-mcp-doc-list, ref-gemini-cli-mcp-doc-status, ref-gemini-cli-mcp-doc-discovery-state, ref-gemini-cli-cmd-mcp, ref-gemini-cli-mcp-doc-issues, ref-gemini-cli-mcp-doc-diagnostics, ref-gemini-cli-mcp-doc-debug]
---

## 固定来源与适用范围 {#mcp-scope}

本章的固定来源是官方仓库 `google-gemini/gemini-cli` 提交
`38700b4b38bf387dafded6c97c3f190d084b49e9` 的
`docs/tools/mcp-server.md`、`docs/tools/mcp-resources.md`、`docs/reference/configuration.md`（`mcp`
与 `mcpServers` 段）与 `packages/core/src/tools/mcp-client.ts` 等源码。仓库快照固定到
commit，文档未注明适用的软件版本，因此本章是来源级知识，不绑定已发布的 npm 版本。MCP 集成分两层：发现层 `mcp-client.ts` 的
`discoverMcpTools()`，执行层 `mcp-tool.ts` 的 `DiscoveredMCPTool`
[@ref-gemini-cli-mcp-doc-arch]。

## 配置入口与 server 定义 {#mcp-entry-definition}

**mcp.entry**：MCP server 写在 `settings.json` 的 `mcpServers` 对象里，作用域由读入的 settings
文件决定：用户级 `~/.gemini/settings.json`、项目级 `项目根/.gemini/settings.json`、系统级
settings，以及扩展的 `gemini-extension.json`（扩展用 `mcpServers` 字段贡献 server，启动时与
settings 一并加载，扩展里的 server 不支持 `trust`
字段）[@ref-gemini-cli-mcp-doc-setup][@ref-gemini-cli-plugins-ref-manifest][@ref-gemini-cli-config-doc-files]。终端管理命令默认写项目作用域：`gemini mcp add`
的 `-s, --scope` 取 `user` 或 `project`，默认 `project`
[@ref-gemini-cli-mcp-doc-add]。另有一个全局 `mcp`
段用于整体开关：`mcp.serverCommand`、`mcp.allowed`（只连列表内的
server）、`mcp.excluded`（排除列表）[@ref-gemini-cli-mcp-doc-global][@ref-gemini-cli-settings-mcp]。

同名冲突与合并规则（扩展与本地配置之间）：settings 里同名的 server 覆盖扩展提供的
server；工具清单按"最严格策略获胜"合并——`excludeTools` 取并集、`includeTools` 取交集、`excludeTools`
优先于 `includeTools`；`env` 合并且本地值覆盖；`command`、`url`、`timeout` 等标量由本地值替换
[@ref-gemini-cli-mcp-doc-override]。企业文档另有一节讲 MCP server 配置如何在系统 settings
与用户配置之间合并 [@ref-gemini-cli-config-enterprise-mcpmerge]。

**mcp.definition**：每个 server 是 `mcpServers` 下的一个键，键名即 server 别名。必填项是
`command`、`url`、`httpUrl` 三者之一；三者同时出现时优先级为 `httpUrl` → `url` → `command`
[@ref-gemini-cli-settings-mcpservers]。可选字段（文档表格逐条给出）：`args`、`env`、`cwd`、`headers`、`timeout`（毫秒，默认
600000 即 10 分钟）、`trust`（默认 false，true 时跳过该 server
的所有工具确认）、`includeTools`、`excludeTools`、`description`，以及 Google 侧的
`targetAudience`、`targetServiceAccount`（配合
`authProviderType: service_account_impersonation`）[@ref-gemini-cli-mcp-doc-props]。最小
stdio 与 HTTP 示例（来自官方 MCP
文档）[@ref-gemini-cli-mcp-doc-structure][@ref-gemini-cli-mcp-doc-examples]：

```json
{
  "mcpServers": {
    "pythonTools": {
      "command": "python",
      "args": ["-m", "my_mcp_server"],
      "cwd": "./mcp-servers/python",
      "env": { "API_KEY": "$MY_API_TOKEN" },
      "timeout": 15000
    },
    "httpServer": {
      "httpUrl": "http://localhost:3000/mcp",
      "headers": { "Authorization": "Bearer MY_TOKEN" },
      "timeout": 5000
    }
  }
}
```

`env` 中的值支持 `$NAME`、`${NAME}`（全平台）与 `%NAME%`（仅 Windows）展开，未定义的变量解析为空串
[@ref-gemini-cli-mcp-doc-envexpansion]；文档没有描述 `args`、`cwd`、`headers`
是否参与同一套展开（`headers` 的展开在源码里存在，但文档只在 `env` 一节说明），这一项按 partial 阅读。启动 MCP
子进程时会做环境净化：从宿主继承的环境中按名字（`*TOKEN*`、`*SECRET*`、`*PASSWORD*`、`*KEY*`、`*AUTH*`、`*CREDENTIAL*`
等）与值模式（私钥、证书、含凭据的 URL、各类 API key）自动脱敏，只有用户在 `env` 里显式写出的变量视为知情同意而不脱敏
[@ref-gemini-cli-mcp-doc-sanitize][@ref-gemini-cli-mcp-doc-explicit]。

## 传输与认证 {#mcp-transport-auth}

**mcp.transport**：支持三种传输——Stdio（子进程，stdin/stdout）、SSE、Streamable HTTP
[@ref-gemini-cli-mcp-doc-transports]。配置与传输的对应关系由字段决定：`httpUrl` →
StreamableHTTPClientTransport，`url` → SSEClientTransport，`command` →
StdioClientTransport [@ref-gemini-cli-mcp-doc-connect]。终端命令的 `-t, --transport` 取
`stdio`、`sse`、`http`，默认 `stdio` [@ref-gemini-cli-mcp-doc-add]。

**mcp.auth**：四种凭据来源。其一，静态 `headers`（例如 `Authorization: Bearer ...`），适合 HTTP/SSE
[@ref-gemini-cli-mcp-doc-examples]。其二，`env` 中通过变量展开引用宿主环境里的 token
[@ref-gemini-cli-mcp-doc-envexpansion]。其三，OAuth 2.0：连接返回 401
时自动发现授权端点，必要时动态注册客户端，打开本地浏览器完成授权码流程，拿到 token 后重试；token 存在
`~/.gemini/mcp-oauth-tokens.json`，过期时用 refresh token 刷新，无效时清理；授权回调固定走
`http://localhost:端口/oauth/callback`，因此无浏览器的 headless/容器环境不可用
[@ref-gemini-cli-mcp-doc-oauth][@ref-gemini-cli-mcp-doc-authflow][@ref-gemini-cli-mcp-doc-redirect][@ref-gemini-cli-mcp-doc-tokens]。CLI
校验回调里的 `iss` 参数（RFC 9207），缺失或不匹配时以 HTTP 400 拒绝
[@ref-gemini-cli-mcp-doc-oauth]。`oauth` 对象可写
`enabled`、`clientId`、`clientSecret`、`authorizationUrl`、`issuer`、`tokenUrl`、`scopes`、`redirectUri`、`tokenParamName`、`audiences`，除
`enabled` 外大多可省略并自动发现 [@ref-gemini-cli-mcp-doc-oauthprops]。其四，`authProviderType`
选择凭据来源：`dynamic_discovery`（默认）、`google_credentials`（用 ADC，需在 `oauth.scopes` 里写
scope）、`service_account_impersonation`（配合 `targetAudience` 与
`targetServiceAccount`，为访问 IAP
保护的服务设计）[@ref-gemini-cli-mcp-doc-authprovider]。交互式登录入口是
`/mcp auth SERVER_NAME`，不带参数时列出支持 OAuth 的 server
[@ref-gemini-cli-mcp-doc-oauthmanage][@ref-gemini-cli-cmd-mcp]。示例（凭据用占位值，来自官方文档的
SA impersonation 段）[@ref-gemini-cli-mcp-doc-authprovider]：

```json
{
  "mcpServers": {
    "myIapProtectedServer": {
      "url": "https://my-iap-service.run.app/sse",
      "authProviderType": "service_account_impersonation",
      "targetAudience": "IAP_CLIENT_ID.apps.googleusercontent.com",
      "targetServiceAccount": "sa@project.iam.gserviceaccount.com"
    }
  }
}
```

## 生命周期、能力与暴露 {#mcp-lifecycle-capabilities}

**mcp.lifecycle**：启动时对每个配置的 server 依次做状态置 `CONNECTING`、按字段选传输、按 `timeout`
连接、失败则置 `DISCONNECTED` 并记录错误 [@ref-gemini-cli-mcp-doc-connect]。连接成功后拉取工具定义、按
`includeTools`/`excludeTools` 过滤、清洗工具名（非法字符替换为下划线，超 63
字符做中段截断）[@ref-gemini-cli-mcp-doc-tooldiscovery]，并给每个工具无条件加 `mcp_SERVER_TOOL`
形式的全限定名 [@ref-gemini-cli-mcp-doc-namespace]。注册了可用工具的 server 维持长连接，没有可用工具的 server
连接被关闭，最终状态收敛为 `CONNECTED`/`DISCONNECTED`
[@ref-gemini-cli-mcp-doc-connmanage]。重载与开关：`/mcp reload` 重新连接并重发现
[@ref-gemini-cli-cmd-mcp]；`gemini mcp enable|disable NAME [--session]`（斜杠形式
`/mcp enable|disable`）保留配置但阻止连接，启用状态存于
`~/.gemini/mcp-server-enablement.json`，禁用项在 `/mcp` 里显示为 Disabled
[@ref-gemini-cli-mcp-doc-enabledisable]。超时不重试：文档只给出连接超时与"失败即断开、错误记录"，没有描述自动重连或退避策略，这一项按
partial 阅读 [@ref-gemini-cli-mcp-doc-connect]。

**mcp.capabilities**：四类能力分别有各自入口。Tools：发现后以全限定名注册进全局工具注册表并可调用
[@ref-gemini-cli-mcp-doc-namespace]。Resources：发现时读取各 server 的
`resources/list`，`/mcp` 会在每个已连接 server 下显示 Resources 段；对话中用
`@SERVER://resource/path` 引用（与文件引用共用补全菜单），提交时 CLI 调 `resources/read` 并把内容注入会话
[@ref-gemini-cli-mcp-doc-resources][@ref-gemini-cli-mcp-doc-resdisc]；模型侧还有
`list_mcp_resources` 与 `read_mcp_resource` 两个工具
[@ref-gemini-cli-mcp-res-list][@ref-gemini-cli-mcp-res-read]。Prompts：server 注册的
prompt 以斜杠命令形式暴露（`/poem-writer --title="X"` 或位置参数），执行时 CLI 调 `prompts/get`
[@ref-gemini-cli-mcp-doc-prompts][@ref-gemini-cli-mcp-doc-promptinvoke]。instructions：server
在 initialize 返回的 instructions 会追加到系统指令
[@ref-gemini-cli-mcp-doc-instructions]。工具返回值支持多段内容（text、image、audio、embedded
resource、resource_link），CLI 把文本合并进 functionResponse、二进制作为 inlineData
[@ref-gemini-cli-mcp-doc-richer]。

**mcp.exposure**：三层控制。server 级：`trust: true` 直接跳过该 server
全部工具确认；未信任时每次调用需要用户选择"本次执行 / 总是允许此工具 / 总是允许此 server / 取消"，后两者分别写入工具级与 server
级内部允许清单
[@ref-gemini-cli-mcp-doc-trustbypass][@ref-gemini-cli-mcp-doc-allowlist][@ref-gemini-cli-mcp-doc-confirm]。配置级：`includeTools`
白名单与 `excludeTools` 黑名单（黑名单优先），从源头决定模型能否看到工具
[@ref-gemini-cli-mcp-doc-props]；`mcp.allowed`/`mcp.excluded` 决定哪些 server 整体参与连接
[@ref-gemini-cli-mcp-doc-global]；会话级还可用 `--allowed-mcp-server-names` 限定
[@ref-gemini-cli-config-doc-args]。策略级：策略引擎按 `mcp_SERVER_TOOL` 全限定名匹配，且官方明确警告
server 别名里不要用下划线，否则解析会错位并使通配规则静默失效
[@ref-gemini-cli-mcp-policy-syntax][@ref-gemini-cli-mcp-doc-namespace]。管理面还有
`admin.mcp.enabled`、`admin.mcp.config`（允许清单）、`admin.mcp.requiredConfig`（强制注入）[@ref-gemini-cli-settings-admin]。

## 诊断 {#mcp-diagnostics}

分四个可分别观察的层次。配置是否被读到：`/mcp list` 会列出所有已配置
server（连同配置摘要，敏感字段省略）[@ref-gemini-cli-mcp-doc-mcpcmd]；终端等价物 `gemini mcp list`
对每个 server 打印 transport 与 Connected/Disconnected
[@ref-gemini-cli-mcp-doc-list]。server 是否连上：状态取
`CONNECTING`/`CONNECTED`/`DISCONNECTED`，发现阶段状态取
`NOT_STARTED`/`IN_PROGRESS`/`COMPLETED`，`/mcp` 输出末尾会打印 Discovery State
[@ref-gemini-cli-mcp-doc-status][@ref-gemini-cli-mcp-doc-discovery-state]。工具是否可见：`/mcp desc`
带描述、`/mcp schema` 带描述与 JSON Schema，`/mcp list` 只列名字
[@ref-gemini-cli-cmd-mcp]。调用是否成功：由确认与执行阶段的错误消息体现，常见失败（连接失败、无工具、调用失败、沙箱不兼容）在文档里各有排查清单
[@ref-gemini-cli-mcp-doc-issues]。

两个易踩的观察点：其一，启动期 MCP 连接错误默认静默，只在检测到问题时给一行提示 "MCP issues detected. Run /mcp list
for status."，而运行 `/mcp list`、`/mcp auth`、调用该 server 的工具或 prompt 会自动恢复该 server
的详细诊断 [@ref-gemini-cli-mcp-doc-diagnostics]。其二，在不受信任的目录里 stdio 类型 server 在
`gemini mcp list` 中会显示为 Disconnected（需要先
`gemini trust`）[@ref-gemini-cli-mcp-doc-list]。另有 `--debug`（交互模式 F12 打开调试台）与
server 的 stderr 捕获（INFO 级被过滤）[@ref-gemini-cli-mcp-doc-debug]。
