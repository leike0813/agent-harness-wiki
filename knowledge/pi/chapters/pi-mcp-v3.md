---
schema_version: 3
record_kind: production
edition_id: pi-mcp-v3
harness_id: pi
topic: mcp
title: Pi MCP：内置服务器、配置与暴露（固定源码 8369268）
sections:
  - section_id: mcp-core
    surface_ids: [cli]
    source_refs:
      - ref-pi-mcp-capabilities
      - ref-pi-mcp-cli-entry
  - section_id: mcp-config
    surface_ids: [cli]
    source_refs:
      - ref-pi-mcp-config-files
      - ref-pi-mcp-server-fields
      - ref-pi-mcp-config-rules
      - ref-pi-mcp-oauth-storage
      - ref-pi-mcp-ext-registration
      - ref-pi-mcp-diagnostics-list
      - ref-pi-mcp-diagnostics-log
      - ref-pi-mcp-diagnostics-inspect
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs:
      - ref-pi-mcp-capabilities
      - ref-pi-mcp-resource-tools
      - ref-pi-mcp-exposure
      - ref-pi-mcp-permissions
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-pi-mcp-lifecycle
      - ref-pi-mcp-lifecycle-stop
  - section_id: mcp-route
    surface_ids: [cli]
    source_refs:
      - ref-pi-mcp-ext-registration
      - ref-pi-mcp-ext-replaced
      - ref-pi-config-builtin-extensions
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-core
        status: answered
        source_refs:
          - ref-pi-mcp-capabilities
          - ref-pi-mcp-cli-entry
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: answered
        source_refs:
          - ref-pi-mcp-config-files
          - ref-pi-mcp-config-rules
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: answered
        source_refs:
          - ref-pi-mcp-server-fields
          - ref-pi-mcp-config-rules
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: answered
        source_refs:
          - ref-pi-mcp-server-fields
          - ref-pi-mcp-oauth-storage
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs:
          - ref-pi-mcp-lifecycle
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs:
          - ref-pi-mcp-capabilities
          - ref-pi-mcp-resource-tools
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs:
          - ref-pi-mcp-exposure
          - ref-pi-mcp-permissions
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: partial
        source_refs:
          - ref-pi-mcp-config-rules
          - ref-pi-mcp-diagnostics-list
          - ref-pi-mcp-diagnostics-log
          - ref-pi-mcp-diagnostics-inspect
---
固定来源为 pi 仓库提交 83692682 的 Pi coding agent 包（`packages/coding-agent/docs/mcp.md`、`docs/extensions.md`）。该版本的核心已经内置 MCP，本章取代 pi-mcp-v2 关于“核心不含 MCP”的结论；v2 的结论在提交 781152fc 时成立，随上游把 MCP 移入核心而失效。本库未为 Pi 建立软件版本映射，按 source_only 阅读。

## 内置 MCP 与入口 {#mcp-core}

Pi 通过 stdio 或 streamable HTTP 连接 MCP server，并把 server 的 tools 与 resources 交给模型。[@ref-pi-mcp-capabilities] 上一版把 MCP 记为“核心不做、要靠扩展”，这一结论在当前固定来源下不再成立；本章不再保留扩展自建路线的结论。这一判断的依据是 `docs/mcp.md` 给出的内置连接流程与内置扩展 `builtin:mcp`，不是 README：根 README 与 `packages/coding-agent/README.md` 在本提交里都没有列出 MCP，旧版“核心不做 MCP”的说法出自后者。

交互式会话内用 `/mcp` 查看连接、登录、重连、改暴露、启停 server；会话外改完 `mcp.json` 要执行 `/reload` 才生效。[@ref-pi-mcp-cli-entry] 命令行入口：

```bash
pi mcp add tools --env API_KEY='${TOOLS_KEY}' -- uvx tools-mcp
pi mcp add -l tools --env API_KEY='${TOOLS_KEY}' -- uvx tools-mcp
```

默认写用户级配置，加 `--local`／`-l` 写项目配置。[@ref-pi-mcp-cli-entry]

## 配置、传输与凭据 {#mcp-config}

用户级 server 读 `~/.pi/agent/mcp.json`，项目级读 `.pi/mcp.json`；项目配置只有在授予项目信任之后才读。同名时项目条目整体替换用户级条目；若项目条目不含 `command`、`url`、`type`，它只覆盖同名用户级 server 的 `enabled`、`exposure`、`toolExposure`，其余字段（含 `env`、`headers`、`auth`）保留。[@ref-pi-mcp-config-files] 最小项目覆盖示例：

```json
{
  "mcpServers": {
    "internal-tools": { "enabled": false }
  }
}
```

HTTP server 用 `url`、`headers`、`oauth`；旧式 SSE 传输不受支持。[@ref-pi-mcp-server-fields] 两种 server 类型都支持 `timeout`（默认 60 秒，进度通知会重置它）、`enabled: false`、`exposure` 与 `toolExposure`、以及 `description`。[@ref-pi-mcp-server-fields] 字段判读规则：`type` 可省，省略时 `command` 选 stdio、`url` 选 streamable HTTP；`sse` 会被拒绝；`command` 是单个可执行文件加 `args`，不是 shell 命令串；`env`、`headers` 支持 `${VAR}` 插值和 `!command`，但命令必须构成整个值。[@ref-pi-mcp-config-rules] 非法条目会被报告并跳过，不影响其他 server 连接。[@ref-pi-mcp-config-rules] 配置侧的确定结论到此为止，其余 diagnostics 问法要靠运行观察：`pi mcp list` 会连接每个启用的 server 并打印状态、工具与错误，条目非法或有启用的 server 未连上时退出码为 1；`/mcp` 给出完整连接错误与失败 stdio server 的 stderr 尾部。[@ref-pi-mcp-diagnostics-list] 配置错误、连接失败与待登录项在启动后集中报告一次，server 的日志通知按“时间、server 名、级别、logger、消息”的固定格式追加到 `~/.pi/agent/mcp.log`，超过 5 MB 后轮转为 `mcp.log.1`。[@ref-pi-mcp-diagnostics-log] `/mcp` 同时给出每个 server 的状态、工具数、`exposure` 与配置来源，需要注意的 server 排在最前；选中某个 server 可以查看它的工具与连接详情，并就地重连、登录登出、改 `exposure` 或启停。[@ref-pi-mcp-diagnostics-inspect] 扩展侧的可观察错误信号见扩展注册一节。缺口：本固定来源没有给出按 `exposure` 逐个确认工具对模型可见、或确认单次工具调用是否成功的检查步骤，`mcp.diagnostics` 因此按 `partial` 记录。

凭据方面，Pi 注册到授权服务器，令牌存在 `~/.pi/agent/mcp-auth.json`，过期或被服务器拒绝时刷新；服务器追加 scope 时会重新要求登录，退出登录会删除已存凭据。[@ref-pi-mcp-oauth-storage] 凭据按“server 名称 + URL”归属：同名同 URL 的不同 `mcp.json` 共享一次登录，同 URL 不同名（每账户一个）则各自登录。[@ref-pi-mcp-oauth-storage]

## 能力与暴露 {#mcp-capabilities}

server 提供 resources 时，Pi 会补上 Codex 与 OpenCode 用的资源工具：`list_mcp_resources`、`list_mcp_resource_templates`、`read_mcp_resource`。[@ref-pi-mcp-resource-tools] 这些工具与 server 的 tools 都属于本节所说的“交给模型的工具与资源”。[@ref-pi-mcp-capabilities] 文本资源以文本进上下文，图片以图片进上下文，其他二进制资源落到临时文件并把路径交给模型。[@ref-pi-mcp-resource-tools] 与 v2 “核心不暴露 resources” 的结论相反。

每个 server 可设 `exposure`，四种取值的差别是工具何时、以何种方式到达模型：

| `exposure` | 行为 |
|---|---|
| `codemode`（默认） | 只能从 codemode 脚本调用，不向模型声明，也不出现在 codemode 描述里；脚本用 `searchTools()`、`describeTool()` 或 `ALL_TOOLS` 找它。 |
| `deferred` | 不声明，等 `tool_search` 命中后在下一次模型调用时载入。 |
| `direct` | 像内置工具一样直接向模型声明，codemode 也可调用。 |
| `hidden` | 注册但不可达。 |

[@ref-pi-mcp-exposure] 另可用 `toolExposure` 逐个工具收窄暴露。[@ref-pi-mcp-exposure]

每次 MCP 调用都经过 Pi 的工具管线，因此扩展的 `tool_call`、`tool_result` 处理器（含权限门）同样作用到 MCP 工具上；`pi.getAllTools()` 会报告 server 声明的 `readOnlyHint`、`destructiveHint`、`idempotentHint`、`openWorldHint`，权限扩展可据此决定哪些调用需要确认，资源工具标记为只读。[@ref-pi-mcp-permissions]

## 生命周期 {#mcp-lifecycle}

会话启动时 Pi 在后台连接全部启用的 server；server 连上后其工具才出现，但 codemode 描述不列这些工具，所以 server 连接不会改变该描述。首个 prompt 最多等 10 秒，且只对带 `direct` 工具的 server 等待，因为这些工具必须出现在首个请求里。[@ref-pi-mcp-lifecycle] 停止一个 stdio server 会先关它的 stdin，再发 SIGTERM，最后对进程组发 SIGKILL；经 `npx`、`uvx` 之类包装器启动的 server 也一并停掉。[@ref-pi-mcp-lifecycle-stop] 摘录边界：[@ref-pi-mcp-lifecycle] 取自 `docs/mcp.md` 该行的前半段，同一行后半段还写了按需等待 codemode 与 `searchTools()` 所涉 server、HTTP 网络错误与 408/429/5xx 重试两次、掉线后显示为 disconnected 并在下一次调用时重连、server 宣布工具列表变化时的增删，这些信号本轮未纳入短摘录，按未取证处理。

## 扩展注册 MCP server {#mcp-route}

扩展可在当前会话用 `pi.registerMcpServer(name, config)` 追加 server，`config` 形状与 `mcp.json` 的 `mcpServers` 条目一致。扩展加载期注册的 server 与 `mcp.json` 的 server 一起在会话启动时连接，之后注册的立即连接；`pi.unregisterMcpServer()` 关闭连接并让该 server 的工具不可达。注册不落盘，每次加载都要重新注册；`mcp.json` 中同名 server 优先，`/mcp` 会显示该覆盖。[@ref-pi-mcp-ext-registration] 这条路径的错误信号同样有明确定义：同名重复注册会替换本扩展先前的注册，而他人扩展已注册的名字、非法名字与非法配置会直接 throw。[@ref-pi-mcp-ext-registration] 当内置 MCP 支持被另一个扩展替换掉、没有任何东西去连接已注册的 server 时，每次注册都按扩展错误上报。[@ref-pi-mcp-ext-replaced]

内置 MCP 以内置扩展形式提供，`builtin:mcp`、`builtin:llama.cpp`、`builtin:codemode`、`builtin:tool-search` 默认加载，`-builtin:mcp` 可停用其中一个。[@ref-pi-config-builtin-extensions]
