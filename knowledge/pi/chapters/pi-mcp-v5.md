---
schema_version: 3
record_kind: production
edition_id: pi-mcp-v5
harness_id: pi
topic: mcp
title: Pi MCP：内置服务器、配置与暴露（固定源码 6fb2e781 与 7bd01fb9）
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
      - ref-pi-mcp-send-options
      - ref-pi-mcp-structured-content
      - ref-pi-mcp-oauth-storage
      - ref-pi-mcp-ext-registration
      - ref-pi-mcp-diagnostics-list
      - ref-pi-mcp-diagnostics-log
      - ref-pi-mcp-diagnostics-inspect
      - ref-pi-mcp-list-resources-flag
      - ref-pi-mcp-resources-not-listed
      - ref-pi-mcp-changelog-resources-listing
      - ref-pi-mcp-changelog-list-json
      - ref-pi-mcp-login-timeout
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs:
      - ref-pi-mcp-capabilities
      - ref-pi-mcp-resource-tools
      - ref-pi-mcp-exposure
      - ref-pi-mcp-permissions
      - ref-pi-mcp-cli-tools-keep-mcp
      - ref-pi-mcp-cli-tools-mcp-pattern-example
      - ref-pi-mcp-namespace-aliases
      - ref-pi-mcp-reaches-tools-doc
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-pi-mcp-lifecycle
      - ref-pi-mcp-lifecycle-stop
      - ref-pi-mcp-reaches-tools-wait
  - section_id: mcp-route
    surface_ids: [cli]
    source_refs:
      - ref-pi-mcp-ext-registration
      - ref-pi-mcp-ext-replaced
      - ref-pi-config-builtin-extensions
      - ref-pi-mcp-reaches-tools-activate
      - ref-pi-mcp-reaches-tools-mcp-doc
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
          - ref-pi-mcp-send-options
          - ref-pi-mcp-structured-content
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
          - ref-pi-mcp-reaches-tools-wait
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs:
          - ref-pi-mcp-capabilities
          - ref-pi-mcp-resource-tools
          - ref-pi-mcp-namespace-aliases
          - ref-pi-mcp-reaches-tools-doc
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs:
          - ref-pi-mcp-exposure
          - ref-pi-mcp-permissions
          - ref-pi-mcp-cli-tools-keep-mcp
          - ref-pi-mcp-cli-tools-mcp-pattern-example
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
          - ref-pi-mcp-list-resources-flag
          - ref-pi-mcp-resources-not-listed
          - ref-pi-mcp-changelog-resources-listing
          - ref-pi-mcp-changelog-list-json
---
固定来源分两段。内置 MCP、配置字段、传输、凭据、`--tools` 一层暴露与生命周期基线仍按 pi 仓库提交 56b25ff4 阅读（`packages/coding-agent/docs/mcp.md`、`docs/extensions.md`、`packages/coding-agent/src/cli/args.ts`）；工具命名空间的 `aliases`、工具定义的 `reachesTools` 及其对激活与等待的影响、以及 `pi mcp list` 资源输出与连接期资源列举的改动，改按提交 7bd01fb92485c06f92ecfff7ccf3197148bc16af 阅读（`docs/mcp.md`、`docs/extensions.md`、`src/extensions/mcp/{index,runtime,cli}.ts`、`packages/coding-agent/CHANGELOG.md`）。相对 pi-mcp-v4 的实质变化有四处：新增 `reachesTools` 决定替换工具能否为 MCP 工具激活与调用前等哪些 server；命名空间新增 `aliases`；连接时不再列举资源，`pi mcp list` 改为输出 `offers resources`、JSON 的 `resources` 变布尔；以上都未改变 v4 已写明的 server 配置字段、传输类型与凭据归属。MCP 已是内置能力这一基线来自 pi-mcp-v3，本章保留。v4 中未被本章重写的小节按其原固定来源范围阅读。本库未为 Pi 建立软件版本映射，按 source_only 阅读。

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

HTTP server 用 `url`、`headers`、`oauth`；旧式 SSE 传输不受支持。[@ref-pi-mcp-server-fields] 传输层多了一个取消契约：`McpTransport.send()` 现在接受可选的 `signal`，语义是「发送方不再等回复时（请求被取消、超时、已应答或客户端关闭）即中止」，传输层此后不得再发出该消息——例如在刷新授权后重试时；已经发出的消息不可撤回。[@ref-pi-mcp-send-options] 这修掉的是流式 HTTP 传输在授权刷新后重试一个已被取消或已超时的请求、导致服务端仍然执行它的问题。工具结果的形状也放宽了：`CallToolResult.structuredContent` 的类型从「字符串键的记录」放宽为 `unknown`，按 MCP 2026-07-28 接受任意 JSON 值（含数组与 `null`），不再以「Invalid MCP tools/call structured content」失败。[@ref-pi-mcp-structured-content] 两种 server 类型都支持 `timeout`（默认 60 秒，进度通知会重置它）、`enabled: false`、`exposure` 与 `toolExposure`、以及 `description`。[@ref-pi-mcp-server-fields] 字段判读规则：`type` 可省，省略时 `command` 选 stdio、`url` 选 streamable HTTP；`sse` 会被拒绝；`command` 是单个可执行文件加 `args`，不是 shell 命令串；`env`、`headers` 支持 `${VAR}` 插值和 `!command`，但命令必须构成整个值。[@ref-pi-mcp-config-rules] 非法条目会被报告并跳过，不影响其他 server 连接。[@ref-pi-mcp-config-rules] 配置侧的确定结论到此为止，其余 diagnostics 问法要靠运行观察：`pi mcp list` 会连接每个启用的 server 并打印状态、工具与错误，条目非法或有启用的 server 未连上时退出码为 1；`/mcp` 给出完整连接错误与失败 stdio server 的 stderr 尾部。[@ref-pi-mcp-diagnostics-list] 诊断输出里资源一项也变了：`pi mcp list` 不再输出资源与 URI 模板的计数，而是打印一行 `offers resources`；JSON 输出的 `resources` 字段从数字变成布尔 `true`，`resourceTemplates` 字段被删除——实现上 `ServerReport.resources` 的类型就是 `true`。[@ref-pi-mcp-list-resources-flag] 原因写在连接层注释里：列出每个资源可能很慢（例如一个大挂载盘），因此连接时不再列举资源，`hasResources` 只记录 server 声明了 resources 能力，由资源工具按需列举与读取。[@ref-pi-mcp-resources-not-listed] `CHANGELOG` 把这组改动同时记为 breaking change 与对应修复：带 resources 的 server 不再要等全部资源列举完才注册工具。[@ref-pi-mcp-changelog-resources-listing] [@ref-pi-mcp-changelog-list-json] 前面说的资源工具仍然存在，只是列举时机从连接时改为调用时。

配置错误、连接失败与待登录项在启动后集中报告一次，server 的日志通知按“时间、server 名、级别、logger、消息”的固定格式追加到 `~/.pi/agent/mcp.log`，超过 5 MB 后轮转为 `mcp.log.1`。[@ref-pi-mcp-diagnostics-log] `/mcp` 同时给出每个 server 的状态、工具数、`exposure` 与配置来源，需要注意的 server 排在最前；选中某个 server 可以查看它的工具与连接详情，并就地重连、登录登出、改 `exposure` 或启停。[@ref-pi-mcp-diagnostics-inspect] 扩展侧的可观察错误信号见扩展注册一节。缺口：本固定来源没有给出按 `exposure` 逐个确认工具对模型可见、或确认单次工具调用是否成功的检查步骤，`mcp.diagnostics` 因此按 `partial` 记录。

`pi mcp login` 的 `--timeout` 语义也修过：帮助文本从「等浏览器的时长」改为「整个登录流程的时间上限」，默认仍是 300 秒。[@ref-pi-mcp-login-timeout] 凭据方面，Pi 注册到授权服务器，令牌存在 `~/.pi/agent/mcp-auth.json`，过期或被服务器拒绝时刷新；服务器追加 scope 时会重新要求登录，退出登录会删除已存凭据。[@ref-pi-mcp-oauth-storage] 凭据按“server 名称 + URL”归属：同名同 URL 的不同 `mcp.json` 共享一次登录，同 URL 不同名（每账户一个）则各自登录。[@ref-pi-mcp-oauth-storage]

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

`exposure` 管的是工具怎么到达模型，命令行上的 `--tools` 管的是哪些工具被启用，两层不是一回事，值得单独说。`--tools` 的帮助文本写明它虽是纯名称 allowlist（可带 `*` 通配），但默认保留 MCP 工具，除非有条目以 `mcp__` 开头。[@ref-pi-mcp-cli-tools-keep-mcp] 换句话说，`pi --tools read,grep` 并不会把已连上的 server 工具关掉；真要收窄到某一个 server，得显式给出带前缀的模式：

```bash
# Codemode with only the tools of one MCP server
pi --tools read,bash,codemode,'mcp__radius__*'
```

[@ref-pi-mcp-cli-tools-mcp-pattern-example] 本提交新增的第三种形态把这件事又搅了一层：`--tools` 只含 `+name`／`-name` 时改的是默认工具选择而不是替换 allowlist，这种形态不带任何 `mcp__` 条目，因此也就无从触发上面那条保留规则；`mcp__` 前缀只对纯名称 allowlist 有意义。三种形态的判别与 `--tools` 之外的默认选择语义见 `pi-configuration-v4` 的覆盖与合并一节。本轮只在这条帮助文本上取证到 `mcp__` 保留规则，它在上一固定提交 28dcce2 已经存在；本轮新增的是 `+name`／`-name` 形态。缺口：`mcp__` 条目与 server 级 `exposure`、`toolExposure` 三者的叠加顺序，本固定来源没有给出说明。

每次 MCP 调用都经过 Pi 的工具管线，因此扩展的 `tool_call`、`tool_result` 处理器（含权限门）同样作用到 MCP 工具上；`pi.getAllTools()` 会报告 server 声明的 `readOnlyHint`、`destructiveHint`、`idempotentHint`、`openWorldHint`，权限扩展可据此决定哪些调用需要确认，资源工具标记为只读。[@ref-pi-mcp-permissions]

同一节还新增了两个字段，二者都改变「哪些工具在何时可用」的判断。工具命名空间多了 `aliases`：`namespace: { name, aliases, description, instructions }`，`aliases` 是脚本可用来查同一命名空间的其他名字，例如 server 名 `docs` 对应 `mcp__docs`；名字与同名的脚本标识符形式（`my-docs`、`my_docs`）都能匹配。[@ref-pi-mcp-namespace-aliases] `pi.getAllTools()` 现在还会报告每个工具的 `reachesTools`。声明 `reachesTools(input)` 的工具说明「一次调用可能触达哪些别的工具」：返回 `"all"`，或返回输入里可能点名的词；一个词匹配所有名字包含它的工具与命名空间。内置 `codemode` 对搜索或列举工具的脚本返回 `"all"`、对其余脚本返回脚本本身的词，`tool_search` 恒返回 `"all"`。[@ref-pi-mcp-reaches-tools-doc]


## 生命周期 {#mcp-lifecycle}

会话启动时 Pi 在后台连接全部启用的 server；server 连上后其工具才出现，但 codemode 描述不列这些工具，所以 server 连接不会改变该描述。首个 prompt 最多等 10 秒，且只对带 `direct` 工具的 server 等待，因为这些工具必须出现在首个请求里。[@ref-pi-mcp-lifecycle] 等待规则现在按工具的 `reachesTools` 声明分派：声明该字段的工具只等待它这次调用可能触达的 server——codemode 脚本等它点名的那些 server，脚本搜索或列举工具时等全部 server，`tool_search` 等全部 server；资源工具触达每个 server，因此等全部；没有该声明的直接 MCP 调用只等自己那个 server，包括仍在关闭旧传输的重连过程。[@ref-pi-mcp-reaches-tools-wait] 扩展晚注册工具时可以在自己的 `tool_call` 处理器里用同一机制，在调用运行前补齐它需要的工具，MCP 扩展对仍在连接的 server 就是这么做的。[@ref-pi-mcp-reaches-tools-doc] 停止一个 stdio server 会先关它的 stdin，再发 SIGTERM，最后对进程组发 SIGKILL；经 `npx`、`uvx` 之类包装器启动的 server 也一并停掉。[@ref-pi-mcp-lifecycle-stop] 摘录边界：[@ref-pi-mcp-lifecycle] 取自 `docs/mcp.md` 该行的前半段，同一行后半段还写了按需等待 codemode 与 `searchTools()` 所涉 server、HTTP 网络错误与 408/429/5xx 重试两次、掉线后显示为 disconnected 并在下一次调用时重连、server 宣布工具列表变化时的增删，这些信号本轮未纳入短摘录，按未取证处理。

## 扩展注册 MCP server {#mcp-route}

扩展可在当前会话用 `pi.registerMcpServer(name, config)` 追加 server，`config` 形状与 `mcp.json` 的 `mcpServers` 条目一致。扩展加载期注册的 server 与 `mcp.json` 的 server 一起在会话启动时连接，之后注册的立即连接；`pi.unregisterMcpServer()` 关闭连接并让该 server 的工具不可达。注册不落盘，每次加载都要重新注册；`mcp.json` 中同名 server 优先，`/mcp` 会显示该覆盖。[@ref-pi-mcp-ext-registration] 这条路径的错误信号同样有明确定义：同名重复注册会替换本扩展先前的注册，而他人扩展已注册的名字、非法名字与非法配置会直接 throw。[@ref-pi-mcp-ext-registration] 当内置 MCP 支持被另一个扩展替换掉、没有任何东西去连接已注册的 server 时，每次注册都按扩展错误上报。[@ref-pi-mcp-ext-replaced]

内置 MCP 以内置扩展形式提供，`builtin:mcp`、`builtin:llama.cpp`、`builtin:codemode`、`builtin:tool-search` 默认加载，`-builtin:mcp` 可停用其中一个。[@ref-pi-config-builtin-extensions]

替换内置工具有一条新条件。扩展注册的 `codemode` 或 `tool_search` 之所以能为 MCP 工具而激活，前提是该同名工具声明了 `reachesTools`；不声明的同名工具永远不会被为 MCP 工具激活。实现是遍历 `pi.getAllTools()` 找同名且带 `reachesTools` 的工具再决定激活。[@ref-pi-mcp-reaches-tools-activate] 文档侧的同一条件写作：Pi 只在替换工具声明 `reachesTools` 时才为 MCP server 激活它并等待它所需的服务。[@ref-pi-mcp-reaches-tools-mcp-doc]
