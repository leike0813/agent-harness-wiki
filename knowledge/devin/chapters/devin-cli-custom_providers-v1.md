---
schema_version: 3
record_kind: production
edition_id: devin-cli-custom_providers-v1
harness_id: devin
topic: custom_providers
title: "Devin CLI 的模型接入：模型目录、路由、元数据、代理与诊断"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-devin-fusion-availability, ref-devin-models-available]
  - section_id: providers-entry-models
    surface_ids: [cli]
    source_refs: [ref-devin-configfile-options, ref-devin-models-available, ref-devin-models-set, ref-devin-cmd-acp, ref-devin-cmd-models, ref-devin-ts-models, ref-devin-adaptive-select, ref-devin-fusion-select, ref-devin-fusion-pairing]
  - section_id: providers-metadata-forwarding
    surface_ids: [cli]
    source_refs: [ref-devin-models-reasoning, ref-devin-fusion-pairing, ref-devin-models-available, ref-devin-adaptive-how, ref-devin-fusion-how, ref-devin-adaptive-pricing, ref-devin-fusion-pricing, ref-devin-models-tips]
  - section_id: providers-auth-protocol
    surface_ids: [cli]
    source_refs: [ref-devin-auth-authenticating, ref-devin-auth-creds, ref-devin-cmd-acp, ref-devin-auth-access, ref-devin-auth-billing, ref-devin-ts-models, ref-devin-tr-net, ref-devin-configfile-options, ref-devin-sys-options, ref-devin-tr-runtime, ref-devin-tr-auth]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-devin-cmd-models, ref-devin-tr-runtime, ref-devin-models-set, ref-devin-tr-net, ref-devin-fusion-how, ref-devin-ess-slash, ref-devin-adaptive-enterprise, ref-devin-ts-models, ref-devin-cmd-doctor, ref-devin-models-available]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry-models
        status: not_applicable
        source_refs: [ref-devin-configfile-options, ref-devin-models-available, ref-devin-models-set, ref-devin-cmd-acp, ref-devin-cmd-models, ref-devin-ts-models, ref-devin-adaptive-select, ref-devin-fusion-select, ref-devin-fusion-pairing]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth-protocol
        status: partial
        source_refs: [ref-devin-auth-authenticating, ref-devin-auth-creds, ref-devin-cmd-acp, ref-devin-auth-access, ref-devin-auth-billing, ref-devin-ts-models, ref-devin-tr-net, ref-devin-configfile-options, ref-devin-sys-options, ref-devin-tr-runtime, ref-devin-tr-auth]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-auth-protocol
        status: not_applicable
        source_refs: [ref-devin-auth-authenticating, ref-devin-auth-creds, ref-devin-cmd-acp, ref-devin-auth-access, ref-devin-auth-billing, ref-devin-ts-models, ref-devin-tr-net, ref-devin-configfile-options, ref-devin-sys-options, ref-devin-tr-runtime, ref-devin-tr-auth]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-entry-models
        status: answered
        source_refs: [ref-devin-configfile-options, ref-devin-models-available, ref-devin-models-set, ref-devin-cmd-acp, ref-devin-cmd-models, ref-devin-ts-models, ref-devin-adaptive-select, ref-devin-fusion-select, ref-devin-fusion-pairing]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata-forwarding
        status: partial
        source_refs: [ref-devin-models-reasoning, ref-devin-fusion-pairing, ref-devin-models-available, ref-devin-adaptive-how, ref-devin-fusion-how, ref-devin-adaptive-pricing, ref-devin-fusion-pricing, ref-devin-models-tips]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata-forwarding
        status: partial
        source_refs: [ref-devin-models-reasoning, ref-devin-fusion-pairing, ref-devin-models-available, ref-devin-adaptive-how, ref-devin-fusion-how, ref-devin-adaptive-pricing, ref-devin-fusion-pricing, ref-devin-models-tips]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-auth-protocol
        status: partial
        source_refs: [ref-devin-auth-authenticating, ref-devin-auth-creds, ref-devin-cmd-acp, ref-devin-auth-access, ref-devin-auth-billing, ref-devin-ts-models, ref-devin-tr-net, ref-devin-configfile-options, ref-devin-sys-options, ref-devin-tr-runtime, ref-devin-tr-auth]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-devin-cmd-models, ref-devin-tr-runtime, ref-devin-models-set, ref-devin-tr-net, ref-devin-fusion-how, ref-devin-ess-slash, ref-devin-adaptive-enterprise, ref-devin-ts-models, ref-devin-cmd-doctor, ref-devin-models-available]
---

## 固定来源与范围 {#providers-scope}

固定来源是官方文档站 `docs.devin.ai` 的 Devin CLI markdown 快照：`cli/models.md`、`cli/adaptive.md`、`cli/fusion.md`、`cli/reference/commands.md`、`cli/reference/configuration/config-file.md`、`cli/enterprise/team-settings.md`、`cli/enterprise/devin-auth.md`、`cli/troubleshooting.md`、`cli/essential-commands.md`。文档未标注软件版本；只有 Fusion 明确写了适用版本（Devin CLI 3000.10.20+、Devin Desktop 3.10.0+，且不包含免费或试用档，legacy/credit-based 计费也不可用）[@ref-devin-fusion-availability]。

Devin CLI 是闭源产品，模型由 Cognition 托管：文档列出的是**厂商模型目录**——Anthropic、OpenAI、Google、Cognition，以及 DeepSeek、Kimi、GLM 等开源模型，并声称在主流模型发布后数分钟内跟进；短名（`opus`、`sonnet`、`swe`、`codex`、`gemini`）总是解析到该家族最新版 [@ref-devin-models-available]。因此本主题里的"Provider"不是用户可定义的接入点，而是目录中的一个模型选择。下面按"宿主暴露了什么、没暴露什么"如实记录：`providers.entry` 与 `providers.protocol` 为 `not_applicable`（入口被产品取消），需要用户配置的部分记 `partial`。

## 模型入口与模型标识 {#providers-entry-models}

**providers.entry**：没有用户可写的 provider 定义。配置文件的完整选项清单里与模型相关的键只有 `agent` 段的 `model`（默认 `swe-1-6-fast`）与 `show_history_on_continue`；`Options Reference` 逐项列出的键里没有 base URL、API key、provider 数组、自定义端点或兼容层字段 [@ref-devin-configfile-options]。可选的模型集合来自厂商目录与账号策略，而不是本地声明 [@ref-devin-models-available]。因此"在哪里定义 Provider"对本产品 **not_applicable**：产品取消了这一层，只对用户开放模型选择。

**providers.models**：模型标识是三处共用的短名/别名体系 [@ref-devin-models-set]：

| 入口 | 形式 |
| - | - |
| 会话内 | `/model` 打开选择器，`/model opus`、`/model sonnet`、`/model codex` 直接切换；`/fast` 切到 SWE-1.6 Fast；`/theme` 切主题 |
| 启动参数/环境变量 | `devin --model opus -- refactor this module`，环境变量 `DEVIN_MODEL`；ACP 下 `devin acp --model opus` [@ref-devin-cmd-acp] |
| 持久默认 | `~/.config/devin/config.json`（Windows `%APPDATA%\devin\config.json`）的 `agent.model`，例如 `{"agent": {"model": "swe-1-6-fast"}}` |

列出可用模型用 `devin models list`（按模型家族分组），`devin models list --format json` 输出机器可读列表 [@ref-devin-cmd-models]。企业可以收紧可用集合（模型 allowlist）并钉一个团队默认模型：若钉的默认值不在 allowlist 内，回落到内置默认（allowlist 优先）；用户在 `/model` 里选过的模型会写进自己的 `agent.model`，新会话沿用该选择而不是每次重置回团队默认 [@ref-devin-ts-models]。两个特殊入口是 `adaptive` 与 `fusion` 两个"家族"：`/model adaptive` 走 Cognition 的模型路由 [@ref-devin-adaptive-select]；`/model fusion`（或 `/fusion`）打开 lead+sidekick 配对选择器 [@ref-devin-fusion-select]。也可以用启动参数与配置文件固定它们 [@ref-devin-adaptive-select]：

```bash
devin --model adaptive -- refactor the auth module
```

```json
// ~/.config/devin/config.json
{ "agent": { "model": "adaptive" } }
```

推荐组合按官方说法是 Fable 5.1 + SWE-2，Fusion 的指令是按每对模型协同方式调过的 [@ref-devin-fusion-pairing]。缺口：来源只给了短名解析规则与少量示例（`swe-1-6-fast`、`swe`、`gpt`、`opus`、`codex`、`gemini`），没有完整模型 ID 列表或别名映射表；partial 的部分在此。

## 能力元数据与参数转发 {#providers-metadata-forwarding}

**providers.metadata**：文档明确的模型能力元数据只有**推理强度**：部分模型支持可配置的 reasoning level，控制回答前"思考"的算力，会话中用 `Alt+T`（macOS `Opt+T`）循环切换 [@ref-devin-models-reasoning]。Fusion 的 picker 里另有三个可选项——**Lead**（驱动规划的前沿模型）、**Effort**（lead 回答前的算力）、**Sidekick**（执行落地的高性价比模型，每个 lead 都有推荐值），以及 **Fast Mode**（换成同模型的更快变体，智能相同、速度更快、成本更高）[@ref-devin-fusion-pairing]。上下文窗口、输出上限、视觉支持、工具调用支持等元数据在来源中没有逐模型列出 [@ref-devin-models-available]；Adaptive 也不向用户展示底层模型的能力声明，只按提示复杂度路由 [@ref-devin-adaptive-how]。因此 metadata 按 partial 阅读：推理强度与 Fusion 的 effort/fast 有明确用户入口，其余能力面未记载。

**providers.forwarding**：用户可写的参数极少，且都不直接映射成请求体字段。可确认的是：模型名决定服务端用哪个模型；推理强度由 `Alt+T` 调节 [@ref-devin-models-reasoning]；Fusion 下 lead 与 sidekick 的配对由选择器决定，双方按各自费率计费（lead 按其前沿价、sidekick 按其更低价），配对内部的信息传递由厂商调优、用户不控制 [@ref-devin-fusion-pairing][@ref-devin-fusion-how]；Fast Mode 影响的是速度与成本档位 [@ref-devin-fusion-pairing]；Adaptive 下路由完全在服务端，用户只选 `adaptive`，官方建议保持同一模型跨轮以利用 prompt caching，Adaptive 路由时会把这一点纳入考虑 [@ref-devin-adaptive-how]。哪些参数只影响界面展示、哪些真正上送后端，来源没有区分；partial。

计费口径也随入口不同，属于"选型时要看"的转发外结果 [@ref-devin-adaptive-pricing][@ref-devin-fusion-pricing]：

| 入口 | 自服务 | 企业（Cognition Platform） | 企业（legacy credits） |
| - | - | - | - |
| Adaptive | 固定每 token 费率（输入 $0.50/1M、输出 $2.00/1M、缓存读 $0.10/1M），超出配额同价 | 按 ACU 计费，消耗随 token 与 router 选中的模型变化 | 变量 token 折扣计费，按实际 token 与选中模型换算 |
| Fusion | lead 与 sidekick 各自按自己的每 token 费率扣配额 | 按 ACU，按双方各自费率累计 | 不适用（Fusion 不包含 legacy/credit-based 计费客户） |

官方选型建议是"多试几个模型"，至少试 `swe`、`gpt`、`opus`：复杂重构与架构改动用 `opus`/`gpt`，快速小改与成本敏感场景用 `swe`（快且便宜） [@ref-devin-models-tips]。

## 凭据、协议与响应处理 {#providers-auth-protocol}

**providers.auth**：没有 per-provider 的 API key、base URL 或环境变量。模型访问凭据来自账号登录 [@ref-devin-auth-authenticating]：

| 平台 | `credentials.toml` 位置 |
| - | - |
| macOS / Linux | `$XDG_DATA_HOME/devin/credentials.toml`（设了 `XDG_DATA_HOME` 时），否则 `~/.local/share/devin/credentials.toml` |
| Windows | `%APPDATA%\devin\credentials.toml`（通常 `C:\Users\YOU\AppData\Roaming\devin\credentials.toml`） |

`devin auth login` 后 token 默认持久不过期，可在自己的多台机器间复制该文件复用登录，但必须当作敏感文件、不要提交 [@ref-devin-auth-creds]；`devin auth logout` 删除 [@ref-devin-auth-creds]。ACP（`devin acp`）这条路径例外：优先读环境变量 `WINDSURF_API_KEY`，否则读 `devin auth login` 存的凭据，也接受 ACP `authenticate` 请求在运行时给凭据 [@ref-devin-cmd-acp]。企业侧访问由自定义角色与 RBAC 控制：需要 **Use Devin CLI** 权限的角色，按 enterprise 或 organization 分配，也可用 SSO IdP 组自动分配；用量按 ACU（Agent Compute Unit）计费并计入组织既有分配 [@ref-devin-auth-access][@ref-devin-auth-billing]。团队级模型策略（allowlist 与默认模型）在 Team Settings 配置 [@ref-devin-ts-models]。缺口：任何自定义端点、自带密钥、兼容层都不存在——`providers.auth` 只能记录"账号凭据 + 企业访问控制"，partial。

**providers.protocol**：面向用户的接入协议配置不存在。CLI 对模型后端使用什么传输没有文档化；只在调试日志的 target 名单里出现 `connect_rpc`、`windsurf_api_client` 等名字，用于打开 trace [@ref-devin-tr-net]。用户能配置的只有 CLI 自身的出站代理：`proxy.mode` = `system`（默认，读 `HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY` 与平台 PAC）/ `manual`（走给定 `url`，支持 `http://`、`https://`、`socks5://`）/ `off`（直连），另有 `no_proxy` 逗号分隔绕过列表；它作用于 API 调用、更新与 MCP server，但**不**影响沙箱子进程的网络 [@ref-devin-configfile-options][@ref-devin-tr-net]。企业级的 `system.json` 可以强制同一 `proxy` 段，`devin-updater` 也读它 [@ref-devin-sys-options]。除此之外宿主不暴露协议、端点形态或请求改写；因此 protocol 记 **not_applicable**。

**providers.responses**：流式输出与工具调用循环由 CLI 内部处理，文档没有给后端需要满足的约定。可观察的响应侧行为都与失败有关：

- **模型不可用**：先查企业 Team Settings 是否限制了模型集合，再用 `/model` 确认名字，再换模型重试（`devin --model sonnet -- ...` 可作对照）[@ref-devin-tr-runtime]。
- **限流/配额**：等待几分钟再试、查组织用量面板、必要时联系管理员 [@ref-devin-tr-runtime]。
- **网络**：可开 `RUST_LOG` 看完整请求生命周期（DNS、连接池、TLS 握手、header、重定向、重试分别由 `reqwest`/`hyper`/`hyper_util`/`rustls` target 覆盖），并警告 trace 日志可能含 `Authorization` 头等敏感数据 [@ref-devin-tr-net]。企业代理做 TLS 检查时，CLI 用操作系统证书库，需在 OS 层安装代理根 CA [@ref-devin-tr-net]。
- **凭据被吊销**：`devin auth logout && devin auth login` 更换凭据；API token 默认不过期 [@ref-devin-tr-auth]。

重试次数、超时、流式中断后的续传规则未记载；partial。

## 诊断 {#providers-diagnostics}

分层入口 [@ref-devin-cmd-models][@ref-devin-tr-runtime]：

- **配置可读 / 模型可选**：`devin models list`（`--format json` 便于脚本）列出当前账号可用模型，`/model` 打开选择器、`/model NAME` 切换 [@ref-devin-cmd-models][@ref-devin-models-set]。
- **模型未生效**：企业模型限制 → 名字拼写 → 换模型三步排查 [@ref-devin-tr-runtime]。
- **请求层**：`RUST_LOG="chisel=trace,windsurf_api_client=trace,connect_rpc=trace,reqwest=trace,hyper=trace,hyper_util=trace,rustls=trace"` 配合 `CHISEL_LOG_STDOUT=1` 打终端；日志同时写 `~/.local/share/devin/cli/logs/devin_TIMESTAMP_PID.log`（Windows `%APPDATA%\devin\cli\logs\`），48 小时未动过的日志启动时 gzip，可用 `zgrep`/`rg -z` 检索 [@ref-devin-tr-net]。要看完整请求/响应体则需外挂拦截代理（如 mitmproxy）并把其 CA 装进系统信任库 [@ref-devin-tr-net]。
- **路由/配对**：`/session-stats`（别名 `/stats`）显示实际计费所用模型、token 用量、按模型成本与 Fusion 估算节省；`/usage` 是更薄的 credit/ACU 摘要；Totals 跨 resume 累加 [@ref-devin-fusion-how][@ref-devin-ess-slash]。
- **企业侧**：Adaptive 对企业组织**默认关闭**，需管理员在设置页打开 **Adaptive model router**（Devin Desktop 在 Settings > Devin Desktop > Models，Windsurf 在 Team Settings > Models）；模型 allowlist 与默认模型也在 Team Settings [@ref-devin-adaptive-enterprise][@ref-devin-ts-models]。

缺口：仍无法区分"请求已发送"与"后端已接受但排队"等更细状态；没有独立的连通性/探活命令（`devin airgap doctor` 只在 air-gapped 构建里探测模型端点，普通构建不含该子命令）[@ref-devin-cmd-doctor]；模型完整清单与其能力元数据未文档化 [@ref-devin-models-available]。
