---
schema_version: 3
record_kind: production
edition_id: codebuff-cli-mcp-v2
harness_id: codebuff
topic: mcp
title: "Codebuff 的 MCP：配置入口、传输、生命周期与工具暴露"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-codebuff-mcp-file-schema, ref-codebuff-mcp-transport, ref-codebuff-agentdir-trust, ref-codebuff-doc-mcp-file, ref-codebuff-doc-mcp-env]
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-codebuff-mcp-file-schema, ref-codebuff-mcp-dirs, ref-codebuff-mcp-load, ref-codebuff-doc-mcp-file, ref-codebuff-cli-startup, ref-codebuff-cli-agent-registry, ref-codebuff-agentdir-trust-doc, ref-codebuff-cli-flags]
  - section_id: mcp-definition-transport
    surface_ids: [cli]
    source_refs: [ref-codebuff-mcp-file-schema, ref-codebuff-mcp-schema, ref-codebuff-doc-mcp-transports, ref-codebuff-mcp-env, ref-codebuff-mcp-env-subst, ref-codebuff-doc-mcp-env, ref-codebuff-mcp-transport]
  - section_id: mcp-lifecycle-exposure
    surface_ids: [cli]
    source_refs: [ref-codebuff-mcp-transport, ref-codebuff-mcp-request, ref-codebuff-mcp-tools, ref-codebuff-mcp-tooldata, ref-codebuff-mcp-separator, ref-codebuff-agent-tools, ref-codebuff-cli-agent-merge, ref-codebuff-agents-env, ref-codebuff-mcp-names]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuff-cli-agent-registry, ref-codebuff-mcp-load, ref-codebuff-mcp-transport, ref-codebuff-mcp-tooldata, ref-codebuff-mcp-tools, ref-codebuff-cli-logs, ref-codebuff-doc-mcp-file, ref-codebuff-doc-mcp-env]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-codebuff-mcp-dirs, ref-codebuff-mcp-load, ref-codebuff-doc-mcp-file, ref-codebuff-cli-startup, ref-codebuff-agentdir-trust-doc, ref-codebuff-cli-flags]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition-transport
        status: answered
        source_refs: [ref-codebuff-mcp-file-schema, ref-codebuff-mcp-schema, ref-codebuff-mcp-env, ref-codebuff-mcp-env-subst, ref-codebuff-doc-mcp-transports]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition-transport
        status: answered
        source_refs: [ref-codebuff-mcp-transport, ref-codebuff-mcp-schema, ref-codebuff-doc-mcp-transports]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition-transport
        status: partial
        source_refs: [ref-codebuff-mcp-schema, ref-codebuff-mcp-transport, ref-codebuff-doc-mcp-env]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-exposure
        status: partial
        source_refs: [ref-codebuff-mcp-transport, ref-codebuff-mcp-request, ref-codebuff-mcp-tools, ref-codebuff-mcp-tooldata]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-exposure
        status: partial
        source_refs: [ref-codebuff-mcp-tools, ref-codebuff-mcp-request, ref-codebuff-mcp-tooldata]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-exposure
        status: answered
        source_refs: [ref-codebuff-cli-agent-merge, ref-codebuff-agents-env, ref-codebuff-agent-tools, ref-codebuff-mcp-names, ref-codebuff-mcp-separator, ref-codebuff-mcp-tooldata]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-codebuff-cli-agent-registry, ref-codebuff-mcp-load, ref-codebuff-mcp-transport, ref-codebuff-mcp-tooldata, ref-codebuff-cli-logs, ref-codebuff-doc-mcp-file]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与适用范围 {#mcp-scope}

MCP 主题同样以仓库 `CodebuffAI/codebuff` @ `639e3f3c7a96658035d008e935398417843067fc`
的源码为主：配置读取在 `sdk/src/agents/load-mcp-config.ts`，协议与传输在
`common/src/mcp/`，工具暴露在 `packages/agent-runtime/src/mcp.ts`，CLI 侧的合并与信任门在
`cli/src/utils/local-agent-registry.ts` 与 `cli/src/utils/agent-dir-trust.ts`
[@ref-codebuff-mcp-file-schema][@ref-codebuff-mcp-transport][@ref-codebuff-agentdir-trust]。文档站提供字段与
`$VAR_NAME` 用法的读者说明 [@ref-codebuff-doc-mcp-file][@ref-codebuff-doc-mcp-env]。

## 配置入口、作用域与信任 {#mcp-entry}

**mcp.entry**：MCP server 写在一个 `mcp.json` 里，顶层键是 `mcpServers`
[@ref-codebuff-mcp-file-schema]。CLI 与 SDK 搜索同一组目录：`{cwd}/.agents`、
`{cwd}/../.agents`（便于 monorepo 共享）、`{homedir}/.agents`，**后面的目录覆盖前面的**
[@ref-codebuff-mcp-dirs][@ref-codebuff-mcp-load]，文档站描述的搜索顺序与覆盖关系相同
[@ref-codebuff-doc-mcp-file]。

CLI 的启动顺序决定了哪些目录真的会被读：先跑信任门，再把它保留下来的目录传给 agent 注册表，
而注册表同时用同一批目录读 `mcp.json` [@ref-codebuff-cli-startup][@ref-codebuff-cli-agent-registry]。
仓库内的 `.agents`（`cwd` 及其父目录）会执行代码、会拉起 `mcp.json` 里的 stdio server，因此
必须先被信任：交互式启动时在纯终端提示里列出目录、agent 文件（最多 10 个）以及
`mcp.json` 将执行的命令或 URL，回答 y 才加载；非交互运行不会提问，直接跳过并打印提示，除非
设置了 `CODEBUFF_TRUST_AGENT_DIRS=1` 或传了 `--trust-agents` [@ref-codebuff-agentdir-trust-doc]。
`~/.agents` 是用户自己的目录，永不需要信任 [@ref-codebuff-agentdir-trust-doc]。

另有一个会整体跳过项目 MCP 的开关：传 `--agent` 指定 agent 时 CLI 不加载本地 `.agents`
（因此 `mcp.json` 也不生效），该说明写在参数帮助里 [@ref-codebuff-cli-flags]。

## 定义格式、字段与传输 {#mcp-definition-transport}

**mcp.definition**：`mcp.json` 的模式是"一个 mcpServers 对象，把 server 名映射到 server 定义"，未写
`mcpServers` 时默认空对象 [@ref-codebuff-mcp-file-schema]。server 定义是两种 `strictObject` 之一，
因此**未列出的字段会被拒绝**（严格模式）[@ref-codebuff-mcp-schema]：

| 形态 | 字段 | 默认值 | 说明 |
| --- | --- | --- | --- |
| stdio | `type` | `"stdio"` | 本地进程形态 |
| stdio | `command` | 必填 | 可执行命令 |
| stdio | `args` | `[]` | 传给命令的参数 |
| stdio | `env` | `{}` | 子进程环境变量，值可写 `$VAR_NAME` |
| http/sse | `type` | `"http"` | `"http"` 或 `"sse"` |
| http/sse | `url` | 必填 | 远端 MCP 端点 |
| http/sse | `params` | `{}` | 追加到 URL 的查询参数 |
| http/sse | `headers` | `{}` | 请求头，值可写 `$VAR_NAME` |

表格字段与文档站的 Configuration Reference 一致 [@ref-codebuff-doc-mcp-transports]。

环境变量展开有两条路径。配置加载阶段：`env` 里以 `$` 开头的值会被替换为 `process.env`
中同名变量的值，取不到就抛错，该文件被整体跳过并只在 verbose 时打印
[@ref-codebuff-mcp-env]。连接阶段：`common/src/mcp/client.ts` 还会对 `env` 与 `headers` 的值做
一次 `$UPPER_SNAKE` 正则替换，未命中的引用原样保留 [@ref-codebuff-mcp-env-subst]。文档站把它写成
"用 `$VAR_NAME` 引用 shell 环境变量，先在 shell 里 export，或在项目根放 `.env`"
[@ref-codebuff-doc-mcp-env]。注意两条路径的宽松程度不同：配置阶段缺变量是硬错误，连接阶段
缺变量会把字面量 `$VAR` 发出去——这是本提交可观察到的差异 [@ref-codebuff-mcp-env][@ref-codebuff-mcp-env-subst]。

**mcp.transport**：stdio 用 MCP 官方 SDK 的 `StdioClientTransport`，并把 stderr 设为
`pipe` 以便收集启动失败原因；http 用 `StreamableHTTPClientTransport`，sse 用
`SSEClientTransport`，两者的 `params` 会依次 `searchParams.set` 进 URL [@ref-codebuff-mcp-transport]。
没有发现 OAuth、登录流程或凭据刷新实现，认证只能靠 `headers`/`env` 里写引用
[@ref-codebuff-mcp-transport][@ref-codebuff-mcp-schema]。**mcp.auth** 因此按 partial 阅读：header 与
token 位置明确，OAuth/登录/刷新机制在固定来源中缺失 [@ref-codebuff-doc-mcp-env]。

## 生命周期、能力与暴露 {#mcp-lifecycle-exposure}

**mcp.lifecycle**：server 不是在启动时连接的。第一次需要某个 agent 的 MCP 工具数据时才按需
发起：`requestMcpToolData` 调用 `getMCPClient(config)`，客户端按"配置内容的哈希"缓存，
同一进程内相同配置只建一次连接 [@ref-codebuff-mcp-transport][@ref-codebuff-mcp-request]。工具列表
另有缓存：`listMCPTools` 只对同一个 clientId 调一次 `listTools` 并记住 Promise
[@ref-codebuff-mcp-tools]。加载某个 server 失败只影响它自己的工具——错误被记成 warn 日志
（`Failed to load tools from MCP server ...`），当步继续 [@ref-codebuff-mcp-tooldata]。缺口：固定来源
没有给出连接超时、重连、退避或"禁用某个 server"的配置项；stdio 启动失败时错误消息里会带
被截断到 8192 字节的 stderr [@ref-codebuff-mcp-transport]。按 partial 阅读。

**mcp.capabilities**：当前只用到 tools。运行时对每个 server 调 `listTools`，再按需
`callTool`，并把 MCP 内容映射成工具结果 [@ref-codebuff-mcp-tools][@ref-codebuff-mcp-request]；固定来源里
没有 resources 或 prompts 的读取路径，也没有让模型感知它们的暴露点
[@ref-codebuff-mcp-tooldata]。按 partial 阅读：tools 已确认可用，resources/prompts 只有"未发现实现"
这一结论 [@ref-codebuff-mcp-request]。

**mcp.exposure**：CLI 把 `mcp.json` 里的 server 合并进**所有 id 以 `base` 开头的 agent** 的
`mcpServers`（用户配置覆盖 agent 自带同名 server），这样主 agent 直接拿到这些工具
[@ref-codebuff-cli-agent-merge]。单 agent 也自带 `mcpServers` 字段，写法与 `mcp.json` 内的一致，其中
stdio 的 `$VAR` 在加载 agent 文件时就解析并注入 [@ref-codebuff-agents-env]。工具名的转换规则是：模型
看到的名称是 `server__tool`（双下划线），若这个名字不合法（长度超过 128、含 `.`、空格、`/`、`:`）
则清洗并在超长时追加 8 位哈希；用户侧在 `toolNames` 里用 `server/tool` 形式限定某 server 的哪些
工具可见 [@ref-codebuff-mcp-names][@ref-codebuff-mcp-separator][@ref-codebuff-agent-tools]。服务器加载失败或工具被过滤时，
该工具不会出现在模型可见列表里 [@ref-codebuff-mcp-tooldata]。

## 诊断 {#mcp-diagnostics}

**mcp.diagnostics**：可区分的观察点有三层。配置被读取：CLI 在加载到非空 `mcp.json` 时写一条
debug 日志（列出 server 名与来源文件路径），解析失败只在 verbose 下打印
[@ref-codebuff-cli-agent-registry][@ref-codebuff-mcp-load]。server 已连接/工具可见：连接失败会写 warn
日志并附带被捕获的 stderr 或 URL，工具列表请求失败使该 server 的工具在本步不可用
[@ref-codebuff-mcp-transport][@ref-codebuff-mcp-tooldata]。调用成功：工具以 `server__tool` 名出现在
模型工具表里，调用走 `callTool` 并按内容映射结果 [@ref-codebuff-mcp-tools]。

其它可查入口：CLI 每会话日志（项目 `debug/` 与每会话目录下的 `log.jsonl`）承载上述
debug/warn 记录，`--clear-logs` 可在启动前清理 [@ref-codebuff-cli-logs]；文档站的排障清单要求先
校验 `mcp.json` 是合法 JSON、确认文件位置、重启 Codebuff，并手工运行 server 命令验证
[@ref-codebuff-doc-mcp-file][@ref-codebuff-doc-mcp-env]。仓库里存在一个 `getLoadedMCPServers()` 取值
函数，但在本提交的 `cli/src` 中除定义外未发现调用点，因此不能算作用户可见的清单命令
[@ref-codebuff-cli-agent-registry]。缺口：没有"列出 MCP server 与工具名"的 CLI 子命令，也没有
把"配置可读/已连接/工具可见/调用成功"分开输出的诊断入口。按 partial 阅读。
