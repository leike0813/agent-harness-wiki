---
schema_version: 3
record_kind: production
edition_id: deepseek-harness-mcp-v1
harness_id: deepseek-harness
topic: mcp
title: "DeepSeek Harness 的 MCP：客户端行定义、传输、凭据、能力覆盖与工具暴露"
sections:
  - section_id: mcp-server-rows
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-mcp-config-scope, ref-dsh-arch-layers-once, ref-dsh-mcp-guide-patch, ref-dsh-mcp-example-insert, ref-dsh-mcp-guide-bridge]
  - section_id: mcp-definition
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-mcp-config-stdio, ref-dsh-mcp-config-http, ref-dsh-mcp-field-table, ref-dsh-mcp-example-yaml, ref-dsh-cordis-js-expressions]
  - section_id: mcp-transports
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-mcp-transport-factory, ref-dsh-mcp-sdk-negotiation, ref-dsh-mcp-protocol-results, ref-dsh-mcp-timeout-ownership]
  - section_id: mcp-credentials
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-mcp-child-env, ref-dsh-subprocess-sensitive-env, ref-dsh-mcp-guide-scrub, ref-dsh-mcp-field-table]
  - section_id: mcp-connection-lifecycle
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-mcp-reconnect-defaults, ref-dsh-mcp-supervisor, ref-dsh-mcp-reconnect-doc, ref-dsh-mcp-activation-block]
  - section_id: mcp-capability-coverage
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-mcp-tool-sync, ref-dsh-mcp-limits, ref-dsh-mcp-server-context, ref-dsh-mcp-resources-tools, ref-dsh-mcp-resources-read]
  - section_id: mcp-tool-exposure
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-mcp-naming, ref-dsh-mcp-name-conflict, ref-dsh-mcp-identity-contract, ref-dsh-mcp-raw-name, ref-dsh-tools-restriction, ref-dsh-tools-approval, ref-dsh-approval-seam, ref-dsh-mcp-trust-posture]
  - section_id: mcp-diagnostics
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-mcp-dump-config, ref-dsh-mcp-reconnect-logs, ref-dsh-mcp-resource-section, ref-dsh-mcp-agent-install, ref-dsh-mcp-call-result]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: mcp-server-rows
        status: answered
        source_refs: [ref-dsh-mcp-config-scope, ref-dsh-arch-layers-once, ref-dsh-mcp-guide-patch, ref-dsh-mcp-example-insert, ref-dsh-mcp-guide-bridge]
  - question_id: mcp.definition
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-dsh-mcp-config-stdio, ref-dsh-mcp-config-http, ref-dsh-mcp-field-table, ref-dsh-mcp-example-yaml, ref-dsh-cordis-js-expressions]
  - question_id: mcp.transport
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: mcp-transports
        status: answered
        source_refs: [ref-dsh-mcp-transport-factory, ref-dsh-mcp-sdk-negotiation, ref-dsh-mcp-protocol-results, ref-dsh-mcp-timeout-ownership]
  - question_id: mcp.auth
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: mcp-credentials
        status: partial
        source_refs: [ref-dsh-mcp-child-env, ref-dsh-subprocess-sensitive-env, ref-dsh-mcp-guide-scrub, ref-dsh-mcp-field-table]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: mcp-connection-lifecycle
        status: answered
        source_refs: [ref-dsh-mcp-reconnect-defaults, ref-dsh-mcp-supervisor, ref-dsh-mcp-reconnect-doc, ref-dsh-mcp-activation-block]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: mcp-capability-coverage
        status: answered
        source_refs: [ref-dsh-mcp-tool-sync, ref-dsh-mcp-limits, ref-dsh-mcp-server-context, ref-dsh-mcp-resources-tools, ref-dsh-mcp-resources-read]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: mcp-tool-exposure
        status: partial
        source_refs: [ref-dsh-mcp-naming, ref-dsh-mcp-name-conflict, ref-dsh-mcp-identity-contract, ref-dsh-mcp-raw-name, ref-dsh-tools-restriction, ref-dsh-tools-approval, ref-dsh-approval-seam, ref-dsh-mcp-trust-posture]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-dsh-mcp-dump-config, ref-dsh-mcp-reconnect-logs, ref-dsh-mcp-resource-section, ref-dsh-mcp-agent-install, ref-dsh-mcp-call-result]
---

## MCP server 配置在哪里 {#mcp-server-rows}

MCP server 是**选择性启用**的：每个 server 在目标 Cordis 作用域里配置一个 `@deepseek-ai/dsh-mcp-client` 条目，每个出厂 profile 提供工具注册表并只挂载一次共享资源服务，用户只配置客户端条目；没有可见已配置 server 的调用方在任何模式下都拿不到 MCP 提示文本或工具 [@ref-dsh-mcp-config-scope]。

条目通过普通的 `cordis.yml` 层栈插入：各 bundle 层、profile 的 `cordis.patch.yml`、home 层，然后是 `--patch` 覆盖层；patch 按 id 命中一行并替换其整块 config，或插入新行 [@ref-dsh-arch-layers-once]。出厂示例是 `apps/cli/config/examples/mcp-memory/*.cordis.yml` 的 `insert` 覆盖层，作为 `dsh web --patch {file}` 传入；官方指引要求把选中文件的单个 `insert` patch 合并进某个用户 patch 层以跨运行保持选择，并明确警告不要覆盖已存在的文件（它可能已经含有无关的用户 patch）[@ref-dsh-mcp-guide-patch]。最小形态就是这样一行：

```yaml
- insert:
    - id: memory-memorix
      name: '@deepseek-ai/dsh-mcp-client'
      config:
        serverName: memorix
        transport: stdio
        command: memorix
        args: [serve]
        cwd: !!js process.cwd()
```

[@ref-dsh-mcp-example-insert] 可见性按 Cordis 注册作用域：条目住在它被挂载的行所在处，`serverName` 在每个作用域内保留，Agent 作用域可以复用同一个 `serverName`，因为它们的传输与工具是隔离的。DSH 解析选中的 Cordis 覆盖层、启动已配置的 stdio 命令或连接已配置的 Streamable HTTP URL、发现 MCP 工具，并把它们以 `mcp__{serverName}__{tool}` 的形状暴露；它**不**下载 server、初始化其数据库、选择模型或 embedding provider、创建云账号、迁移厂商数据，也不监督独立的 HTTP 服务[@ref-dsh-mcp-guide-bridge]。禁用用通用的 `disabled` 条目字段，Plugin Manager 把它写进 profile patch 层。

**出厂组合里没有 `mcp-client` 行**，`dsh-base` 与独立的 `sdk-minimal` 树都只挂载 `mcp-resources`，`apps/cli/package.json` 携带 `@deepseek-ai/dsh-mcp-client` 作为 workspace 依赖只是为了让 patch 层能命名它。**没有专门的 MCP 设置卡片或 Web 表单**，配置途径是 YAML patch、Plugin Manager 行开关，或 Creator 模式下用 `plugin_manager` 的 Agent。「工作区作用域」在本代码库里不是 MCP 的独立概念——作用域就是该行被挂载进的 Cordis 上下文。

## Server 定义格式与变量展开 {#mcp-definition}

定义就是插件的 `config` 对象，由 `packages/mcp/mcp-client/src/index.ts` 里按 `transport` 判别的 Schemastery `Config` 联合校验。第一方字段恰好是：`transport`（`'stdio'` 或 `'streamable-http'`）、`serverName`（必填，模式 `/^[A-Za-z0-9_-]{1,32}$/`，工具名的本地命名空间）[@ref-dsh-mcp-config-stdio]，以及按传输分支——stdio 的 `command`（必填）、`args`（默认 `[]`）、`env`（默认 `{}`）、`cwd`（默认 `''`）[@ref-dsh-mcp-config-stdio]；streamable-http 的 `url`（必填）、`headers`（默认 `{}`）[@ref-dsh-mcp-config-http]。两分支共享 `toolCallTimeoutMs`（默认 60000）、`failOnStartupError`（默认 `false`）、`maxInstructionBytes`（默认 32768）与 `reconnect` 对象（`enabled` `true`、`initialDelayMs` `500`、`maxDelayMs` `30000`、`maxAttempts` `10`）。字段表与默认值见 [@ref-dsh-mcp-field-table]，未知键被 schema 拒绝。

**变量展开不是 MCP 功能**：必须在加载期计算的值用 loader 的 `!!js` 标签写在 `config` 里，例如 `cwd: !!js process.cwd()`、`env: {GITHUB_TOKEN: !!js process.env.GITHUB_TOKEN}`，而 `args` 原样传给子进程、没有 shell 插值。`@deepseek-ai/cordis-plugin-include` 把 `!!js` 解析成表达式节点，Loader 在声明的注入激活之后针对该插件上下文插值 `config`、针对 loader 上下文插值 `disabled`，嵌套行表达式则被保留到目标激活 [@ref-dsh-cordis-js-expressions]。完整示例见 [@ref-dsh-mcp-example-yaml]。

有一处文档不准要避免照抄：`StreamableHttpConfig` 的文档注释把该传输称作「Streamable HTTP (SSE)」，但实现构造的是 `@modelcontextprotocol/client` 的 `StreamableHTTPClientTransport`，**没有**独立的遗留 SSE 传输。

## 传输与协议协商 {#mcp-transports}

恰好两种本地传输，由 `transport` 判别器选择并在 `createTransport` 中实例化：`stdio` 用 `command`、`args`、清除后的父环境合并 `env`、`cwd` 构造 `StdioClientTransport`，spawn 由 MCP SDK 拥有，子进程随插件生命周期启停；`streamable-http` 用 `StreamableHTTPClientTransport(new URL(config.url), { requestInit: { headers: config.headers } })`，上游服务必须已经在运行且 harness 不监督它 [@ref-dsh-mcp-transport-factory]。

**协议修订不可配置**：SDK 客户端以 `versionNegotiation: { mode: 'auto' }` 构造，在可用时选择 2026-07-28 协议并回落到受支持的遗留修订 [@ref-dsh-mcp-sdk-negotiation]。两种传输在协商、发现、协议校验与取消上完全一致 [@ref-dsh-mcp-protocol-results]。失败处理上唯一的传输差异是：重连负责失败的协商或崩溃的 stdio 子进程，而 HTTP 连上之后的按请求恢复归 SDK 传输管；**启动与发现超时继承自 MCP SDK，插件没有单独的超时设置** [@ref-dsh-mcp-timeout-ownership]。没有 WebSocket、没有仅遗留 SSE、没有进程内传输。

## 凭据与环境变量 {#mcp-credentials}

这一题只能答 partial：**OAuth、浏览器/设备登录流程、token 刷新与任何第一方秘密存储都不存在**。检查过 `packages/mcp/**`（README、`src/**`、测试）、`packages/credentials/**`、`docs/subsystems/credentials.md` 与 `docs/subsystems/mcp.md`，没有找到任何 MCP 认证机制。

真实存在的只有两条供给秘密的路径。stdio 的 `config.env` 合并**在**清除后的环境之上：清除会丢掉任何名字匹配 `SENSITIVE_ENV_PATTERN = /KEY|PASSWORD|SECRET|TOKEN/i` 的继承变量以及任何 `DSH_*` 名字，然后重新加上已解析的代理名，所以显式 `env` 条目能在清除后存活 [@ref-dsh-mcp-child-env] [@ref-dsh-subprocess-sensitive-env]；官方文档也说明 stdio 桥在启动子进程前刻意移除这类环境变量名与全部 `DSH_*` 变量，其它环境变量仍然继承，需要额外秘密时应把它加进行内的 `config.env` 而不是直接写进 YAML [@ref-dsh-mcp-guide-scrub]。streamable-http 的 `config.headers` 直接进每次 MCP 请求的 `requestInit.headers` [@ref-dsh-mcp-field-table]。秘密以 `!!js` 对 `process.env` 的表达式写在 YAML 里，而不是内联 [@ref-dsh-mcp-example-yaml]。

必须区分的边界：`$DSH_HOME/.credentials.yaml`、调用目录 `.env`、`$DSH_HOME/.env` 这条凭据链是 **harness 级的 provider 凭据链**，**不**供给 MCP 的 `env` 或 `headers`；MCP 的秘密来自启动环境加 YAML。因为 `headers` 与 `env` 是没有刷新路径的普通值，轮换 token 需要改配置，而只有开启热重载的 profile 才能原地生效。

## 连接生命周期、重连与重载 {#mcp-connection-lifecycle}

`apply` 刻意是 `async` 并 await `connection.ready`，所以首次连接加工具发现在 Cordis fiber 激活前落定，工具在 harness 开始第一轮之前就已存在；失败时默认 `failOnStartupError: false` 记日志并让 harness 以无该 server 工具的方式启动，`true` 则抛错并拒绝插件激活（可选行在 app-boot 的启动策略下仍不能中止整个 harness）[@ref-dsh-mcp-activation-block]。

工具列表变化通过遗留通知或现代订阅到达，并被排进一条串行同步链原子地换代：抓取失败保留上一代，注册冲突回滚整次尝试。重连是**按一次故障**的尝试预算：延迟从 `initialDelayMs` 翻倍到 `maxDelayMs`，连续失败达 `maxAttempts` 次后工具被注销且停止重连，直到重载或重启；超过 `maxDelayMs` 仍保持的连接会重置预算；`reconnect.enabled: false` 完全停掉循环 [@ref-dsh-mcp-reconnect-defaults] [@ref-dsh-mcp-supervisor]。官方文档确认这套语义：故障期间最后已知的工具仍然列出但调用失败，连续十次失败后工具被移除，重连进度在日志里可见 [@ref-dsh-mcp-reconnect-doc]。每次调用超时是 `toolCallTimeoutMs`（默认 60 秒）。

禁用用通用 `disabled` 字段（或 Plugin Manager 开关）；编辑该行在开启热重载处原地重载连接，未改的名字保持不变。**没有**健康检查、ping 或状态端点，**也没有**磁盘或持久化工具缓存——唯一的缓存是 SDK 的发现列表，而 `syncTools` 用 `{ cacheMode: 'refresh' }` 刻意绕过它。界面差异只是重载粒度：`web`/desktop 开启配置热重载，其余出厂 profile 需要重启。

## 能力覆盖：tools、resources、prompts {#mcp-capability-coverage}

三类 MCP 能力**支持程度不同**，不能笼统说成「MCP 已支持」。

**Tools：已实现且是一等公民。** `syncTools` 调 `listTools(undefined, { cacheMode: 'refresh' })`，把每个原始名映射为 `mcp__{serverName}__{rawName}` 并注册到 `ctx.tools`；宣告能力里省略 `tools` 的 server 连上后工具集为空 [@ref-dsh-mcp-tool-sync]。

**Resources：已实现，但由另一个包和另一种调用形状提供。** 客户端把 `McpResourceProvider`（`resources/list`、`resources/templates/list`、`resources/read` 的并集）暴露给 `ctx.mcpResources`，而独立的 `mcp-resources` 包贡献三个共享工具 `list_mcp_resources`、`list_mcp_resource_templates`、`read_mcp_resource` [@ref-dsh-mcp-resources-tools]，它们要求一个显式的 `server` 名并在调用方 Agent 的作用域内解析 [@ref-dsh-mcp-resources-read]。客户端还把 server 的 *instructions* 作为字面、不插值的 `mcp:{server}` 系统提示小节发布，上限由 `maxInstructionBytes` 约束 [@ref-dsh-mcp-server-context]。

**Prompts：未实现。** `packages/mcp/**` 里没有任何 `prompts/list` 或 `prompts/get` 调用，文档给出的替代就是上面那个 server instructions 小节。官方明确列为不支持的还有：MCP 提示模板、人工输入征询（human-input elicitation）、基于任务的执行扩展（宣告 `execution.taskSupport === 'required'` 的工具在调用时抛错）以及资源订阅与更新通知 [@ref-dsh-mcp-limits]。没有 tools 能力的 server 连上后工具集为空；连接与发现超时随 SDK。

## 工具命名、过滤、权限与信任 {#mcp-tool-exposure}

MCP 工具就是普通 harness 工具，暴露分两级。**命名**是 `(serverName, rawName)` 的纯函数，产出 `mcp__{serverName}__{rawName}`；命名空间是本地配置，**绝不**取远端 `serverInfo.name`，因为远端名不可信、跨部署不唯一、升级还可能变，这些都不能静默重命名面向模型的工具；公开名满足 DeepSeek 函数名契约，有损归一会追加 12 位十六进制 SHA-256 以免不同身份塌缩 [@ref-dsh-mcp-identity-contract]。`tools/call` 永远收到原始名，公开名从不发给服务器，也从不被反向解析 [@ref-dsh-mcp-raw-name]。这个稳定性让会话历史与权限规则能挺过重启、热重载换代与重新同步，两个 server 也因此可以同时提供 `search` 而共存为 `mcp__github__search` 与 `mcp__web__search` [@ref-dsh-mcp-naming]。冲突处理是明确规则：两个条目用同一 `serverName` 时后者加载失败并给出清晰错误；同一 server 两次列出同名工具时整份工具列表被判为非法并保留先前工具集；与已注册工具名冲突的更新被整体拒绝，绝不给半份工具集 [@ref-dsh-mcp-name-conflict]。

**门控**是通用工具流水线而非 MCP 专用：`ctx.tools.register(definition)` 接受桥接定义，每次桥接调用走正常的 `tools/pre-execute` → 批准 → guard → 执行 → `tools/post-execute` 链。桥接的 `ToolDefinition` 只带 `name`、`description`、`parameters`、`output`、`execute`、`projectContent`——它**不**声明逐工具的批准标志、风险级别或 MCP 专用过滤器，所以 MCP 工具继承部署的批准策略与沙箱 preset，而没有任何 MCP 信任层级。收窄可见性用 `ctx.tools.restrict(filter)`，其 `ToolRestriction` 作用于全局加祖先作用域的名字，并豁免该作用域自己的注册 [@ref-dsh-tools-restriction]；批准是 `allow`、`deny`、`cancel` 或 `ask`，缺少批准支持时 `ask` 变成拒绝 [@ref-dsh-tools-approval]。

**信任**只以「为什么默认关闭」的理由出现：MCP server 命令是「agent 沙箱之外的可信可执行代码」，所以默认不启用任何 server [@ref-dsh-mcp-trust-posture]。**没有**逐 server 允许/拒绝列表、没有「启用这个 server 前先问一次」的流程、也没有逐 MCP 工具的第一方批准 UI。批准通道由界面提供：UI 界面给人类回答者，ACP 自动化桥给自己的 Agent 一次性机器决策 [@ref-dsh-approval-seam]。

这一题标为 partial：结论是**不存在 MCP 自有的过滤、信任或批准机制**，最接近的真实机制是通用的 `ctx.tools.restrict()` 与按会话的批准策略。实践含义是——因为桥接定义不声明批准要求、且注册在调用方自己作用域内的 MCP 工具在允许/拒绝掩码之外，一个全局配置的 server 其工具在该作用域下对任何 Agent 都可达，按部署默认 `ask` 策略生效，没有 MCP 专用的收窄旋钮。

## 四步分开的诊断 {#mcp-diagnostics}

**（1）配置被读取**：`dsh --profile {name} [--patch {file}] --dump-config` 在不启动的情况下组合 bundle、profile、home 与 `--patch` 层，并打印注释指明每一行来自哪个文件、每个覆盖层改了哪里，未命中的 patch 目标在 stderr 上报告；`!!js` 保持未求值 [@ref-dsh-mcp-dump-config]。这是唯一免启动的检查。

**（2）server 已连接**：**没有** `dsh mcp status`，也没有健康探测。连接状态只能从插件日志读——每次计划重连时 `ctx.logger.warn` 带尝试计数，放弃时、注册失败时以及重连被禁用时用 `ctx.logger.error`，`failOnStartupError` 为 false 时记初始失败错误 [@ref-dsh-mcp-reconnect-logs]。对**必需**行，app-boot 把激活失败变成 `StartupError`，CLI 打印它并把 `startup-{timestamp}-{uuid}.log` 存到 `$DSH_HOME/logs/` 后以 1 退出；可选 MCP 行只告警。

**（3）工具可见**：面向模型的检查是 `mcp__{serverName}__{tool}` 是否在该 Agent 的工具集里；面向人的是 `MCP resource servers` 系统提示小节列出可见 server 名，共享资源工具要求它作为 `server` 参数 [@ref-dsh-mcp-resource-section]。

**（4）调用成功**：成功的 `tools/call` 按块序返回普通文本；只有当前模型接受图片输入且附件功能开启时才返回图片，否则模型看到清晰的诊断消息而不是空；MCP 的 `isError` 结果会抛错，模型看到失败而不是假成功 [@ref-dsh-mcp-call-result]。

在 web/desktop（热重载开启）上，Agent 驱动的安装报 `application: applied` 且工具出现在同一个运行中的会话；`restart-required` 结果意味着该行还没激活，失败的条目需要修配置 [@ref-dsh-mcp-agent-install]。这一题标为 partial，因为**没有**第一方 MCP 诊断命令、没有 `ctx` 级状态服务、也没有 `dsh mcp list` / `dsh mcp ping`；连接健康不可编程检查，只能读日志。
