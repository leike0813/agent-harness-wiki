---
schema_version: 3
record_kind: production
edition_id: kimi-code-cli-mcp-v2
harness_id: kimi-code
topic: mcp
title: "Kimi Code CLI 的 MCP：声明、传输、生命周期、认证与能力暴露"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-kimi-code-mcp-config, ref-kimi-code-data-files, ref-kimi-code-plugins-mcp, ref-kimi-code-slash-builtin-skills, ref-kimi-code-slash-info, ref-kimi-code-config-mcp-table]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-kimi-code-mcp-transports, ref-kimi-code-mcp-config, ref-kimi-code-src-mcp-schema]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-kimi-code-src-mcp-discovery, ref-kimi-code-mcp-config, ref-kimi-code-config-mcp-table, ref-kimi-code-env-switches, ref-kimi-code-src-mcp-auth-gate, ref-kimi-code-plugins-mcp]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-kimi-code-mcp-config, ref-kimi-code-data-files, ref-kimi-code-src-mcp-auth-gate]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-kimi-code-src-mcp-client-interface, ref-kimi-code-mcp-doc, ref-kimi-code-mcp-naming, ref-kimi-code-src-mcp-naming, ref-kimi-code-mcp-config, ref-kimi-code-config-tools, ref-kimi-code-config-permission, ref-kimi-code-mcp-deferred]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kimi-code-mcp-config, ref-kimi-code-slash-info, ref-kimi-code-cmd-doctor, ref-kimi-code-src-mcp-auth-gate, ref-kimi-code-data-files, ref-kimi-code-env-logs, ref-kimi-code-plugins-security]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-kimi-code-mcp-config, ref-kimi-code-data-files, ref-kimi-code-plugins-mcp, ref-kimi-code-slash-builtin-skills, ref-kimi-code-slash-info, ref-kimi-code-config-mcp-table]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-kimi-code-mcp-transports, ref-kimi-code-mcp-config, ref-kimi-code-src-mcp-schema]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-kimi-code-mcp-transports, ref-kimi-code-mcp-config, ref-kimi-code-src-mcp-schema]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: partial
        source_refs: [ref-kimi-code-mcp-config, ref-kimi-code-data-files, ref-kimi-code-src-mcp-auth-gate]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-kimi-code-src-mcp-discovery, ref-kimi-code-mcp-config, ref-kimi-code-config-mcp-table, ref-kimi-code-env-switches, ref-kimi-code-src-mcp-auth-gate, ref-kimi-code-plugins-mcp]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-kimi-code-src-mcp-client-interface, ref-kimi-code-mcp-doc, ref-kimi-code-mcp-naming, ref-kimi-code-src-mcp-naming, ref-kimi-code-mcp-config, ref-kimi-code-config-tools, ref-kimi-code-config-permission, ref-kimi-code-mcp-deferred]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-kimi-code-src-mcp-client-interface, ref-kimi-code-mcp-doc, ref-kimi-code-mcp-naming, ref-kimi-code-src-mcp-naming, ref-kimi-code-mcp-config, ref-kimi-code-config-tools, ref-kimi-code-config-permission, ref-kimi-code-mcp-deferred]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-kimi-code-mcp-config, ref-kimi-code-slash-info, ref-kimi-code-cmd-doctor, ref-kimi-code-src-mcp-auth-gate, ref-kimi-code-data-files, ref-kimi-code-env-logs, ref-kimi-code-plugins-security]
---

Kimi Code CLI 作为 MCP 客户端连接外部 server，把其工具与内置工具（`Read`、`Bash`、`Grep` 等）一起暴露给 Agent；MCP 工具结果的文本与结构化数据都会交给模型，嵌入式图片、音频、视频会被保留在会话媒体存储中 [@ref-kimi-code-mcp-doc]。本章固定来源是 `MoonshotAI/kimi-code` 固定 commit 上的 `docs/en/customization/mcp.md`、`docs/en/configuration/*`、`docs/en/reference/*` 与 `packages/agent-core-v2/src/mcpCore` 实现。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 在哪里声明 server {#mcp-entry}

MCP server 写在 `mcp.json`，只分两级，同名条目由项目级覆盖用户级 [@ref-kimi-code-mcp-config]：

| 作用域 | 路径 | 生效范围 |
| --- | --- | --- |
| 用户级 | `~/.kimi-code/mcp.json`（或 `$KIMI_CODE_HOME/mcp.json`） | 跨项目共享 |
| 项目级 | 工作目录下的 `.kimi-code/mcp.json` | 仅当前仓库 |

- `mcp.json` 位于数据根目录下，随 `KIMI_CODE_HOME` 迁移；会话数据、凭据等也在同一目录树中 [@ref-kimi-code-data-files]。
- 插件可以在清单中声明 `mcpServers`，这些 server 默认启用，可在 `/plugins` 中禁用或重新启用 [@ref-kimi-code-plugins-mcp]。
- 交互入口：`/mcp-config`（内置技能，交互式增删改 server 并处理 MCP OAuth 登录）、`/mcp`（查看当前会话所有 server 的连接状态）[@ref-kimi-code-slash-builtin-skills] [@ref-kimi-code-slash-info]。
- 项目级 server 在未受信任的目录中会出现在工作区信任提示里（列出传输方式与启动目标，默认选中「信任此文件夹」）；无头运行（如 `kimi -p`）无法弹提示，需设置 `KIMI_CODE_TRUST_WORKSPACE=1` 才启用 [@ref-kimi-code-mcp-config]。
- 同名条目的覆盖关系可以直接在文件层面对照：用户级声明一个 server，项目级 `.kimi-code/mcp.json` 里再声明同名条目即可覆盖它，其余用户级条目继续生效 [@ref-kimi-code-mcp-config]。

```json
// 依据 customization/mcp.md 的 Configuration 一节（用户级 ~/.kimi-code/mcp.json 与项目级 .kimi-code/mcp.json 同名覆盖）
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
    }
  }
}
```

- 声明入口只有文件与 `/mcp-config` 两条；`config.toml` 的 `[mcp]` 段只用于全局超时默认值，不用于声明 server [@ref-kimi-code-mcp-config] [@ref-kimi-code-config-mcp-table]。

## 定义字段与传输方式 {#mcp-definition}

支持三种连接方式：`stdio`（宿主启动本地子进程，走标准输入输出）、`http`（连接已运行的 HTTP 端点）、`sse`（旧式 HTTP+SSE 端点，新 server 建议用 HTTP）[@ref-kimi-code-mcp-transports]。

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
    },
    "linear": { "url": "https://mcp.linear.app/mcp" },
    "legacy-events": { "transport": "sse", "url": "https://mcp.example.com/sse" }
  }
}
```

上例来自 `docs/en/customization/mcp.md` 的 Configuration 一节 [@ref-kimi-code-mcp-config]。判定规则是：含 `command` 的条目按 stdio 处理，含 `url` 且未写 `transport` 的按 HTTP 处理，旧式 SSE 必须显式写 `transport: "sse"`；实现上 schema 会按同样的规则补出 `transport` 字段再做判别式校验 [@ref-kimi-code-src-mcp-schema]。

第一方字段（源码 schema 为准，文档对可选字段的说明一致）[@ref-kimi-code-src-mcp-schema] [@ref-kimi-code-mcp-config]：

| 字段 | 类型 | 适用 | 说明 |
| --- | --- | --- | --- |
| `command` | string（非空） | stdio | 可执行命令 |
| `args` | string[] | stdio | 参数数组 |
| `env` | 字符串映射 | stdio | 注入子进程的环境变量 |
| `cwd` | string | stdio | 子进程工作目录 |
| `executor` | `local` 或 `kaos` | stdio | 执行容器选择（仅源码可见，文档未描述） |
| `runtime_id` | string（非空） | stdio | 远程运行时标识（仅源码可见，文档未描述） |
| `url` | string（URL） | http、sse | 端点地址 |
| `headers` | 字符串映射 | http、sse | 每个请求附带的静态请求头 |
| `auth` | 字面量 `oauth` | http、sse | 显式声明使用 OAuth |
| `bearerTokenEnvVar` | string（非空） | http、sse | 提供 bearer token 的环境变量名 |
| `enabled` | boolean | 全部 | 设为 `false` 禁用该 server |
| `deferred` | boolean | 全部 | 实验特性：工具按需加载（默认 `false`） |
| `startupTimeoutMs` | 1–2147483647 的整数 | 全部 | 连接超时，默认 `30000` |
| `toolTimeoutMs` | 1–2147483647 的整数 | 全部 | 单次工具调用超时 |
| `enabledTools` | string[] | 全部 | 工具允许列表 |
| `disabledTools` | string[] | 全部 | 工具阻止列表 |

`executor` 与 `runtime_id` 只出现在固定 commit 的 schema 中，官方文档没有描述其语义；把它们当作未文档化字段，不要在没有源码依据时假定行为。

## 启动时机、超时与移除 {#mcp-lifecycle}

- Server 在会话启动时连接并发现工具（`connect()` 之后立即 `listTools()`）[@ref-kimi-code-src-mcp-discovery]。
- 中途改动 `mcp.json` 或安装插件带来的新 server 不会加入已经打开的会话，只对之后创建的会话生效 [@ref-kimi-code-mcp-config]。
- 超时优先级：`mcp.json` 的每 server 字段 > 环境变量 > `config.toml` 的 `[mcp]` 表 > 内置默认值 [@ref-kimi-code-mcp-config] [@ref-kimi-code-config-mcp-table] [@ref-kimi-code-env-switches]。

```toml
# 依据 configuration/config-files.md 的 mcp 一节
[mcp]
startup_timeout_ms = 30000
tool_timeout_ms = 60000
```

- `[mcp] startup_timeout_ms` 默认 `30000`（连接含工具发现），`tool_timeout_ms` 默认 `60000`；可用 `KIMI_MCP_STARTUP_TIMEOUT_MS` / `KIMI_MCP_TOOL_TIMEOUT_MS` 覆盖配置表，但 `mcp.json` 的 per-server 字段仍然优先 [@ref-kimi-code-config-mcp-table]。
- 从配置中删除 server 不会打断已打开的会话：该 server 在 `/mcp` 里显示为 `removed`，工具仍可见但对它们的调用会以移除提示失败；新会话则完全不注册这些工具 [@ref-kimi-code-mcp-config]。
- 固定来源没有描述失败后的自动重连策略、重试次数或背压细节；源码中只可见连接失败会被记录并按 OAuth 情形标记为需要授权，重连/退避规则不构成已证实的结论 [@ref-kimi-code-src-mcp-auth-gate]。
- 逐 server 开关：`enabled: false` 直接禁用该条目；`enabledTools` / `disabledTools` 在 server 级收窄工具集合，两者与其他过滤条件的叠加顺序在下面「能力」一节说明 [@ref-kimi-code-mcp-config]。
- 安全提示：项目级 `mcp.json` 里的 stdio 条目会在会话启动时执行本地命令，只应在信任的仓库中启用；插件声明的 MCP server 也遵循同一条「启用才连接」的规则 [@ref-kimi-code-mcp-config]。
- 插件带来的 server 例外：安装或启用插件声明的新 server 会在已打开的会话中立即连接，禁用或移除则使已打开会话中的调用以移除提示失败；这条通路与手工编辑 `mcp.json` 的「新会话才生效」不同 [@ref-kimi-code-plugins-mcp]。

## 认证与凭据 {#mcp-auth}

- 静态凭据：HTTP/SSE server 可用 `headers` 写静态请求头，或用 `bearerTokenEnvVar` 指定一个环境变量名提供 bearer token [@ref-kimi-code-mcp-config]。
- OAuth：需要时运行 `/mcp-config login 服务器名` 完成浏览器授权 [@ref-kimi-code-mcp-config]。MCP 凭据存放在数据根的 `credentials/mcp/` 目录（目录权限 0700、文件 0600），`/logout` 不会清除 MCP 凭据，需删除该目录 [@ref-kimi-code-data-files]。
- 显式声明的 `bearerTokenEnvVar` 会关闭该 server 的 OAuth 路径：源码在判断是否标记「需要授权」时，先排除非远程配置、已声明 `bearerTokenEnvVar` 的配置，以及显式写了 `headers` 且 `auth` 不是 `oauth` 的配置 [@ref-kimi-code-src-mcp-auth-gate]。
- 固定来源没有说明 token 的刷新周期与失效处理；凭据文件的读写与权限有描述，刷新策略没有 [@ref-kimi-code-data-files]。

## 能力、命名、过滤与批准 {#mcp-capabilities}

- 可用能力只有工具：客户端接口只定义 `listTools()`、`callTool()`、`ping()`，没有列出或读取 resources / prompts 的调用；工具结果可携带 `content` 与 `structuredContent` [@ref-kimi-code-src-mcp-client-interface]。因此 resources 与 prompts 不能按工具来理解：会话可读取 MCP 结果中嵌入的附件（以 `kimi-file://` 引用，可传给 `Read` / `ReadMediaFile`），但资源链接不会被自动下载 [@ref-kimi-code-mcp-doc]。
- 命名：MCP 工具统一命名为 mcp__服务器名__工具名 的形式（文档写作 mcp__SERVER__TOOL）；实现会把两段名字里的非 `[A-Za-z0-9_-]` 字符替换为下划线并折叠连续下划线，超过 64 字符时截断并追加 8 位哈希，避免模型侧名称冲突 [@ref-kimi-code-mcp-naming] [@ref-kimi-code-src-mcp-naming]。
- 过滤：`enabledTools` / `disabledTools` 在 server 级收窄可用工具；`config.toml` 的 `[tools] enabled` / `[tools] disabled` 是全局开关，对所有 Agent 生效，并与每个 agent 自身的 `tools` / `disallowedTools` 求交（MCP 工具用 glob 匹配，如 `mcp__github__*`）[@ref-kimi-code-mcp-config] [@ref-kimi-code-config-tools]。
- 批准：权限规则支持 `*` 与 `**` 通配，MCP 工具参数不参与匹配；未命中任何规则的调用会触发批准请求，「本会话批准」会放行同类后续调用；也可在 `[[permission.rules]]` 里预置 allow/deny [@ref-kimi-code-mcp-naming] [@ref-kimi-code-config-permission]。

```toml
# 依据 configuration/config-files.md 的 permission 一节
[[permission.rules]]
decision = "allow"
pattern = "mcp__github__*"

[[permission.rules]]
decision = "deny"
pattern = "mcp__filesystem__write_file"
```

- 按需加载（实验）：把 server 标为 `deferred: true` 后，其工具不进顶层工具列表，模型先看到可加载清单，再通过内置 `select_tools` 加载完整定义，并在同一轮内调用。前置条件有两个——实验开关 `tool-select` 打开（`KIMI_CODE_EXPERIMENTAL_TOOL_SELECT=1` 或 `[experimental] tool-select = true`，总开关 `KIMI_CODE_EXPERIMENTAL_FLAG=1` 亦可），且当前模型声明 `dynamically_loaded_tools` 能力；缺任一条件时该字段被忽略 [@ref-kimi-code-mcp-deferred]。
- 注意：在 Ask When Needed 模式下 MCP 工具调用会被自动批准 [@ref-kimi-code-mcp-naming]。

## 诊断 {#mcp-diagnostics}

- 连接状态：`/mcp` 列出当前会话的 server 及其连接状态，删除后的 server 以 `removed` 出现在这里，工具也仍会显示 [@ref-kimi-code-mcp-config] [@ref-kimi-code-slash-info]。
- 配置是否被读取：`mcp.json` 不是 `config.toml` 的一部分，`kimi doctor` 只校验 `config.toml` 与 `tui.toml`，不能用来确认 MCP 声明 [@ref-kimi-code-cmd-doctor]。
- 调用是否成功：调用结果与失败提示直接返回给模型；被删除 server 的调用会返回移除提示，未授权的远程 server 会被标记为需要授权 [@ref-kimi-code-mcp-config] [@ref-kimi-code-src-mcp-auth-gate]。
- 日志：全局诊断日志位于 `~/.kimi-code/logs/kimi-code.log`，server 不可用时会写入包含 server 名称、传输方式、状态与原因的日志条目；日志级别与文件滚动由 `KIMI_LOG_LEVEL` 等变量控制 [@ref-kimi-code-data-files] [@ref-kimi-code-env-logs]。
- 插件声明的 server 及其诊断（清单损坏、路径不安全等）在 `/plugins info 插件 id` 中给出，不影响其他会话 [@ref-kimi-code-plugins-security]。
- 缺口：固定来源没有给出「列出每个 server 已发现的具体工具及其超时配置来源」的专门命令；这一层信息目前只能从 `/mcp` 的会话视图与日志推断 [@ref-kimi-code-slash-info]。
