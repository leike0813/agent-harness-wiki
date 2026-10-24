---
schema_version: 3
record_kind: production
edition_id: omp-custom_providers-v5
harness_id: omp
topic: custom_providers
title: OMP 自定义 Provider 与模型配置
sections:
  - section_id: providers-file
    surface_ids: [cli]
    source_refs:
      - ref-omp-providers-config-shape-doc-69e8
      - ref-omp-providers-merge-doc-69e8
      - ref-omp-providers-cache-doc-69e8
  - section_id: providers-credentials
    surface_ids: [cli]
    source_refs:
      - ref-omp-providers4-judgment-api-values-doc
      - ref-omp-providers4-workers-ai-auth-doc
      - ref-omp-providers4-beta-kill-switch-doc
      - ref-omp-providers-credentials-doc-69e8
      - ref-omp-providers-env-doc-69e8
      - ref-omp-providers5-auth-inception-doc
      - ref-omp-providers5-auth-sambanova-doc
      - ref-omp-providers5-auth-inception-env-doc
      - ref-omp-providers5-auth-sambanova-env-doc
      - ref-omp-providers5-auth-broker-pool-doc
  - section_id: providers-schema
    surface_ids: [cli]
    source_refs:
      - ref-omp-providers4-judgment-api-values-doc
      - ref-omp-providers4-workers-ai-auth-doc
      - ref-omp-providers4-beta-kill-switch-doc
      - ref-omp-providers-auth-values-doc-69e8
      - ref-omp-providers4-workers-ai-endpoint-doc
      - ref-omp-providers5-protocol-inception-doc
      - ref-omp-providers5-protocol-judge-images-doc
      - ref-omp-providers5-protocol-jev-wire-doc
      - ref-omp-providers5-protocol-judge-images-code
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs:
      - ref-omp-providers-config-shape-doc-69e8
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs:
      - ref-omp-providers4-judgment-api-values-doc
      - ref-omp-providers4-workers-ai-auth-doc
      - ref-omp-providers4-beta-kill-switch-doc
      - ref-omp-providers-merge-doc-69e8
      - ref-omp-providers5-forwarding-compression-doc
      - ref-omp-providers5-forwarding-anthropic-version-doc
  - section_id: providers-runtime
    surface_ids: [cli]
    source_refs:
      - ref-omp-providers-availability-doc-69e8
      - ref-omp-providers-scope-doc-69e8
      - ref-omp-providers-apple-doc-69e8
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-file
        status: answered
        source_refs:
          - ref-omp-providers-config-shape-doc-69e8
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-credentials
        status: answered
        source_refs:
          - ref-omp-providers-credentials-doc-69e8
          - ref-omp-providers4-workers-ai-auth-doc
          - ref-omp-providers5-auth-inception-doc
          - ref-omp-providers5-auth-sambanova-doc
          - ref-omp-providers5-auth-inception-env-doc
          - ref-omp-providers5-auth-sambanova-env-doc
          - ref-omp-providers5-auth-broker-pool-doc
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-schema
        status: answered
        source_refs:
          - ref-omp-providers-auth-values-doc-69e8
          - ref-omp-providers4-judgment-api-values-doc
          - ref-omp-providers4-workers-ai-endpoint-doc
          - ref-omp-providers5-protocol-inception-doc
          - ref-omp-providers5-protocol-judge-images-doc
          - ref-omp-providers5-protocol-jev-wire-doc
          - ref-omp-providers5-protocol-judge-images-code
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-schema
        status: answered
        source_refs:
          - ref-omp-providers-auth-values-doc-69e8
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: partial
        source_refs:
          - ref-omp-providers-config-shape-doc-69e8
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs:
          - ref-omp-providers-merge-doc-69e8
          - ref-omp-providers4-beta-kill-switch-doc
          - ref-omp-providers5-forwarding-compression-doc
          - ref-omp-providers5-forwarding-anthropic-version-doc
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-runtime
        status: partial
        source_refs:
          - ref-omp-providers-availability-doc-69e8
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-runtime
        status: partial
        source_refs:
          - ref-omp-providers-scope-doc-69e8
---
本章材料来自源码修订 69e8c9e 的官方文档 `docs/providers.md` 与 `docs/models.md`；本版另按 `adc7fed5c9d6837d77b590bc313a705e2b4136b0` 复核（新增引用前缀 `ref-omp-providers4-`），该 commit 新增两个 judgment `api` 值、一个新的内置 provider 凭据入口和一个 Anthropic 请求裁剪开关，凭据七档顺序、`.env` 载入、可用性判定与路径作用域禁用的结论均未变；上一版引用的 npm 包内 `src/config/models-config.ts` 与 `src/config/api-key-resolver.ts` 不在本轮取证范围内。凭据解析顺序、`.env` 载入、可用性判定、路径作用域禁用与 `models.yml` 合成顺序都取自该修订的文档正文。相对上一版的变化是实质性的：凭据顺序新增“扩展配置回退”一档，`auth: oauth` 现在免除自定义 provider 的 `apiKey` 要求，`disabledProviders` 支持路径作用域条目。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有发送真实模型请求，所以“模型可选”“请求已发送”“后端可用”只按文档描述，未做运行观察；示例中的凭据一律是占位或环境变量名。

本版按 `0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0` 复核（新增引用前缀 `ref-omp-providers5-`），三处变化都落在本章的固定问题上：内置 provider 表新增 `inception` 与 `sambanova` 两条凭据入口；判定（judge）传输新增图像附件协议与由 catalog 驱动的尺寸界；请求侧新增按 catalog 端点规则自动压缩请求体、可用 `PI_REQUEST_COMPRESSION` 关掉，同时 `PI_CODEX_ZSTD` 不再存在。凭据七档顺序、`.env` 载入、可用性判定、路径作用域禁用与 `models.yml` 合成顺序在该区间未变，下文相应结论继续成立。

## 配置文件与最小 Provider {#providers-file}

自定义 provider 与 model 写在默认 profile 配置文件 `models.yml`（或 `models.yaml`）的 `providers` 下，与内置 provider 共用选择、凭据解析与禁用规则。这些路径相对 `getAgentDir()` 返回的 agent 目录：命名 profile 用 `~/.omp/profiles/NAME/agent/`，`PI_CONFIG_DIR` 改写配置根目录名，`PI_CODING_AGENT_DIR` 可以覆盖默认 profile 的 agent 目录，程序化 `ModelRegistry` 路径优先。 [@ref-omp-providers-config-shape-doc-69e8]

一个完整的 OpenAI 兼容 provider：

```yaml
providers:
  my-openai-compatible:
    baseUrl: https://api.example.com/v1
    api: openai-completions
    apiKey: MY_OPENAI_COMPATIBLE_KEY
    models:
      - id: fast-chat
        name: Fast Chat
        contextWindow: 128000
        maxTokens: 8192
```

本版把合成顺序写成了显式六步：先读 `models.yml` / `models.yaml` 建立 provider 覆写、自定义模型、模型覆写与发现配置；再加载 `@oh-my-pi/pi-catalog` 的内置模型并应用 provider 覆写与上下文策略；再合并缓存与运行时发现的行，权威 provider 目录可以替换其内置聊天阵容；再合并配置的自定义 `models`，然后是扩展注册的模型——`provider + id` 命中时替换传输元数据并按已定义字段打补丁，否则追加并用内置参考或本地默认值补齐；再折叠 effort-tier 变体、应用 `modelOverrides` 并选择配置的扩展窗口；最后应用 Bedrock provider 字段、运行时 provider 覆写、发现线策略与扩展 OAuth 目录投影。 [@ref-omp-providers-merge-doc-69e8]

## 凭据与解析顺序 {#providers-credentials}

需要密钥时按第一命中解析七档：运行时覆盖（例如 CLI `--api-key`，永不持久化）；`models.yml` 里钉在自定义 provider 上的 `apiKey`，它故意排在已存 OAuth 之前，免得把上游 OAuth 令牌转发给会拒绝它的自定义 `baseUrl` 或网关；已存 OAuth 凭据（需要时刷新，多账号自动排序轮换）；`/login` 保存的 API key；**扩展配置回退**——同时注册了 `apiKey` 引用与 OAuth/login 流程的扩展 provider，该引用排在已存 OAuth 与登录 key 之下；provider 环境变量（含 `.env` 载入值）；其它已存 API key 作为最后兜底。 [@ref-omp-providers-credentials-doc-69e8]

`.env` 的载入规则本版也明确了：`omp` 在 provider 查找前主动加载四个 `.env` 文件进进程环境，每个变量取第一个**非空**来源，优先级从高到低是进程环境中已有的非空值、项目 `.env`、活动 agent 目录的 `.env`（默认 `~/.omp/agent/.env`）、活动配置根的 `.env`（默认 `~/.omp/.env`）、`~/.env`。已有的非空进程值不会被覆盖，空值可以被更靠后的文件填充。 [@ref-omp-providers-env-doc-69e8]

`apiKey` 的值是“环境变量名或字面值”：字符串正好是精确大小写匹配且非空的环境变量名时用该变量的值，否则字符串本身就是密钥；以 `!` 开头则执行命令并取裁剪后的标准输出。下面把密钥留在环境里而只写变量名：

```yaml
providers:
  my-gateway:
    baseUrl: https://gateway.example.com/v1
    api: openai-completions
    apiKey: MY_GATEWAY_API_KEY
    models:
      - id: claude-sonnet
        contextWindow: 200000
        maxTokens: 8192
```

生效结果是该 provider 的 baseUrl 收到以解析出的密钥发出的请求；检查方式是启动时确认没有凭据缺失错误，并用一次真实请求确认后端接受该密钥，这一步本轮没有执行。 [@ref-omp-providers-credentials-doc-69e8]

**本轮变化：一个"同一 provider 两个环境变量名"的实例**。commit `adc7fed5` 新增内置 provider `cloudflare-workers-ai`，其凭据入口文档写的是 `CLOUDFLARE_API_TOKEN`，`CLOUDFLARE_AUTH_TOKEN` 作为回退，再加 `CLOUDFLARE_ACCOUNT_ID` 做账户路由；`/login cloudflare-workers-ai` 则交互式索取一个具备 Workers AI Read 与 Edit 权限的 Cloudflare API token 和 account ID 并一并存储 [@ref-omp-providers4-workers-ai-auth-doc]。它服务的两个模型 `@cf/cloudflare/clef` 与 `@cf/cloudflare/clef-flash` 是判决模型，要分配给 `judge` 角色才会被使用 [@ref-omp-providers4-workers-ai-auth-doc]。本章的七档解析顺序不变，但这条说明了一件此前没写明的事：**环境变量入口可以有多个候选名按序回退，而 `/login` 存的是同一份凭据的另一种形态**——排查"为什么没找到 key"时，两个名字都要查。

**本轮新增两条内置凭据入口**。`inception` 用 `INCEPTION_API_KEY`，`/login inception` 是同一份凭据的交互形态 [@ref-omp-providers5-auth-inception-doc][@ref-omp-providers5-auth-inception-env-doc]；`sambanova` 用 `SAMBANOVA_API_KEY`，也可 `/login sambanova` [@ref-omp-providers5-auth-sambanova-doc][@ref-omp-providers5-auth-sambanova-env-doc]。两者都仍走上面的七档顺序与 `.env` 载入，没有新的解析层；`inception` 的登录会用一次单 token 的 Mercury 3 请求校验密钥，因为它的 `/v1/models` 是公开端点，不能用来判断密钥有效性 [@ref-omp-providers5-auth-inception-env-doc]。

**另一层容易被误当成“解析顺序”的是 broker 模式的凭据可见性**。`OMP_AUTH_BROKER_ACCOUNT_POOL_FILE` 的语义本轮从“按 OAuth 账号路由”改为“进程内可见的凭据集合”：JSON 里每个 provider 键可以是 `identityKey` 数组（`[]` 只隐藏该 provider 的 OAuth 账号，API key 仍可见）、`true`/`false`（全给/全不给），或 `{ "accounts"?: [...], "apiKeys"?: boolean }`；没有条目的 provider 跟随 `"*"` 规则，`"*": false` 就把整个文件变成允许名单 [@ref-omp-providers5-auth-broker-pool-doc]。它在启动时解析一次、非法输入 fail closed，并且不是 broker 授权——直连客户端仍持有 broker token [@ref-omp-providers5-auth-broker-pool-doc]。排查“这条凭据为什么不见了”时，先分清是七档解析没找到，还是被这个过滤器藏了起来。

## 协议与模型发现 {#providers-schema}

`auth` 允许 `apiKey`（默认）、`none` 或 `oauth`。本版的关键变化是：`none` 与 `oauth` 都免除自定义 provider 的 `apiKey` 要求，但 `oauth` 不创建凭据、也不注册登录流程，它只是强制 OAuth 风格的请求整形，可用凭据仍须来自已存 auth、环境变量或配置的 key。自定义 `anthropic-messages` 模型在省略 `auth` 时同样走 OAuth 风格整形，要用纯 API-key 整形就显式写 `auth: apiKey`。 [@ref-omp-providers-auth-values-doc-69e8]

`discovery.type` 允许 `ollama`、`llama.cpp`、`lm-studio`、`openai-models-list`、`proxy`、`litellm` 与新增的 `apple-foundation-models`；Apple 的传输在受支持的 Mac 上隐式注册，而 `apple-foundation-models` 不是这份 YAML schema 允许的 `api` 值。同层的 `discovery.injectV1`（默认 `true`）控制 `openai-models-list` 是否注入 `/v1`。 [@ref-omp-providers-auth-values-doc-69e8]

**本轮变化：允许的 `api` 值新增两个 judgment 传输。** commit `adc7fed5` 的 `api` 取值列表在 `typesafe` 与 `openrouter-decisions` 之后新增 `openai-decisions` 与 `workers-ai-systemone` [@ref-omp-providers4-judgment-api-values-doc]。文档同段把四个 judgment API 的定位写清：它们不是聊天传输，而是"用 `judge` 模型角色选中的判决请求后端"，端点形态各不相同——`typesafe` 把 System One body POST 到 `{baseUrl}/v1/systemone`；`openrouter-decisions` 把同一 body POST 到 `{baseUrl}/decisions`；`openai-decisions` 把问题与答案翻译成 OpenAI Decisions API 的形状后 POST 到 `{baseUrl}/decisions`（随仓的 `openai/gpt-6-luna-decisions` 行在线上传 `gpt-6-luna`）；`workers-ai-systemone` 把 System One body POST 到 Cloudflare Workers AI 的 `{baseUrl}/{model id}`，base URL 里的 `〈account〉` **逐请求从已存凭据的 account ID 解析，取不到则回落到 `CLOUDFLARE_ACCOUNT_ID`** [@ref-omp-providers4-workers-ai-endpoint-doc]。对本章的意义是：自定义 provider 声明模型时，除了聊天传输还可以声明判决传输，而这四者的请求形状并不相同——写自定义 provider 时不能假设"换一个 `api` 值只是换 URL"。

**本轮变化：判定传输现在也承载图像附件**。原生 OpenAI Decisions、TypeSafe Jev、OpenRouter Jev 与 Workers AI 四类判定，加上被提示的视觉聊天模型，都能接收图像；纯文本候选在图像请求里直接跳过，整条链没有可用的图像判定时显式失败，而不是把图丢掉 [@ref-omp-providers5-protocol-judge-images-doc]。图像先按候选的尺寸界装配再发送：两条 Jev 路径接受 280–1568 像素每边、78,400–2,458,624 像素总量的 PNG/JPEG，界外的图等比缩放、必要时补边后重编码，界内的图保持原始字节 [@ref-omp-providers5-protocol-jev-wire-doc]。

线上形态因传输而异，这是本题需要单独记住的一点：直连 TypeSafe 把每张图作为一条被 `state` 引用的 `assets` 条目，只有附图时才带 `TypeSafe-Danger-Zone-Images: true`；OpenRouter 把图编码成 `image_url` data URL part，既不带该头也不带顶层 `images` 字段 [@ref-omp-providers5-protocol-jev-wire-doc]。盒式（box）问题只发给 TypeSafe 与 OpenRouter Decisions 判定，链会跳过其它候选，也没有聊天模型兜底 [@ref-omp-providers5-protocol-jev-wire-doc]。

这些界来自 catalog 的 compat 规则而不是写死在客户端：`packages/catalog/src/compat/judgment-images.ts` 从模型的 catalog 策略解析 `mimeTypes`、`maxCount`、`maxBytes`、`maxTotalBytes`、`maxPixels`、`minPixels`、`minSide`、`maxSide`，任一非法或自相矛盾的界会让整份策略作废 [@ref-omp-providers5-protocol-judge-images-code]。所以一个自定义判定 provider 的图像能力取决于它命中的 catalog 规则，不是 `models.yml` 里的布尔开关。

同一个“端点形态随 `api` 变化”的结论也适用于新增的 `inception`：它是 Inception 原生 Mercury API，客户端从 `/v1/models` 发现聊天模型并排除 FIM/edit 与仅 Decisions 的模型，随后把模型 id 拼在 base URL 下使用 [@ref-omp-providers5-protocol-inception-doc]。

一个从端点发现模型的 provider：

```yaml
providers:
  team-proxy:
    baseUrl: https://models.example.com/v1
    api: openai-completions
    apiKey: TEAM_PROXY_API_KEY
    discovery:
      type: proxy
```

生效结果是 OMP 在运行时从该端点取回模型列表。 [@ref-omp-providers-auth-values-doc-69e8]

## 模型元数据 {#providers-metadata}

`providers` 是注册表唯一消费的根键：本版明确未知的根键**不再**被 schema 拒绝，但它们不配置任何模型行为，因此写错根键不会报错、只是不生效。自定义 `models` 条目可以自带 `baseUrl`，否则继承 provider 的 URL；对内置模型，provider 级 `baseUrl` 覆写的作用域被限定为继承它的自定义模型的有效 API，或在只有覆写的配置里限定为该 provider 的 `api`，两者都没有时才是 provider 全局。 [@ref-omp-providers-config-shape-doc-69e8]

缺口：上下文窗口、输出上限、工具、视觉与推理强度等能力元数据如何表达并生效，本章未逐项取证，属部分结论。 [@ref-omp-providers-config-shape-doc-69e8]

## 参数转发 {#providers-forwarding}

`preferWebsockets`（在模型或 `modelOverrides` 条目上）控制 Codex 请求是否优先用 WebSocket 传输；`omitMaxOutputTokens` 省略由模型推导的输出上限。`transport: pi-native` 则始终把网关 URL 按 provider 全局应用。 [@ref-omp-providers-merge-doc-69e8]

**本轮变化：一个直接改写请求体形状的环境变量开关**。`CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS`（布尔样式字符串 `1`/`true`/`yes`/`on` 为真）让 provider `anthropic` 的请求省掉预发布字段及对应的 `anthropic-beta` token：`context_management`、beta 工具字段（`strict`、`defer_loading`、`eager_input_streaming`）与回合间工具变更、`output_config.format` 与 `output_config.task_budget`、`thinking.block_binding`，以及 Anthropic 服务端压缩 [@ref-omp-providers4-beta-kill-switch-doc]。三处细节决定了它的实际影响范围：

- **它与 Claude Code 的同名开关有一处刻意差异**：除了请求体里的字段，调用方自己传入的 betas 与 `anthropic-beta` 头里的对应 token 也会被移除 [@ref-omp-providers4-beta-kill-switch-doc]。
- **保留的能力**：effort、自适应 thinking、interleaved thinking 与 extended context 不受影响 [@ref-omp-providers4-beta-kill-switch-doc]。
- **哪些 provider 认这个开关是 catalog 的 compat 轴**，轴名 `honors-claude-code-beta-kill-switch`（`models.yml` 里写作 `compat.honorsClaudeCodeBetaKillSwitch`）——也就是说，一个把 `ANTHROPIC_BASE_URL` 指向企业网关的自定义 provider，可以按模型行声明自己是否遵守该开关 [@ref-omp-providers4-beta-kill-switch-doc]。适用场景是网关拒绝这些预发布字段时，且它在 Foundry 模式开或关时都生效。

这是本章少有的一个"配置项 → 具体请求体字段"的完整可核对映射，但它只覆盖这一个开关。

**本轮变化：请求体压缩变成通用规则，旧的 Codex 专用开关消失。** 1 KiB 及以上的请求体会在“对端能解码”的 provider 自带端点上压缩，具体由 catalog 的 `request-encodings` / `endpoint-hosts` 规则声明：官方 Anthropic API 用 gzip、ChatGPT Codex 后端用 zstd、GitHub Copilot API（`api[.individual|.business|.enterprise].githubcopilot.com`）用 zstd 并可回落 gzip；代理、中继、`models.yml` 网关（即使挂在某内置 provider id 下）与其它主机一律收到未压缩 JSON [@ref-omp-providers5-forwarding-compression-doc]。若某端点、或它前面的 TLS 检查代理拒绝该编码，而未压缩重发成功，该主机在本进程余下时间不再使用该编码 [@ref-omp-providers5-forwarding-compression-doc]。`PI_REQUEST_COMPRESSION=0`/`false`/`no`/`off` 关闭全部压缩（默认开启）；上一版记录的 `PI_CODEX_ZSTD` 已不在环境变量表里，它的作用由这个通用开关承担 [@ref-omp-providers5-forwarding-compression-doc]。这条规则说明“哪些 provider 收到压缩请求”由 catalog 端点匹配决定，配置文件里没有对应字段。

**另一个直接改写请求参数的开关是 Anthropic API 版本。** `PI_ANTHROPIC_API_VERSION` 决定发往官方 Anthropic API（`api.anthropic.com`）的 `anthropic-version` 头：默认 `2023-06-01`，可选 `2026-10-21`；在新版本下 `temperature`/`top_p`/`top_k` 会被省略，因为该版本拒绝它们 [@ref-omp-providers5-forwarding-anthropic-version-doc]。Bedrock、Foundry、Copilot、网关与 Anthropic 兼容 provider 仍用 `2023-06-01`，未知值记警告并回落 [@ref-omp-providers5-forwarding-anthropic-version-doc]。这是一条“开关 → 具体请求字段”的可核对映射：同一个 `temperature` 会因为环境变量而根本不进入请求体。

缺口：字段到请求的完整映射本章未逐项取证，哪些参数只影响界面或路由也仍未区分，属部分结论；上表之外的 `api`/模型行字段到请求的映射本轮仍未逐项取证。 [@ref-omp-providers-merge-doc-69e8]

## 重试与诊断 {#providers-runtime}

“可用”是一次快速的配置检查而不是凭据校验请求：它不执行命令型密钥、不刷新 OAuth token，因此一个无效的已配置密钥可能显示为可用、直到推理时才失败。这条边界决定了诊断顺序——先用配置层判断，再谈后端。 [@ref-omp-providers-availability-doc-69e8]

`disabledProviders` 可以混写全局字符串条目与路径作用域条目；作用域条目在当前工作目录正好是配置路径或其子目录时生效，`~` 展开到 home 目录，路径键接受 `path`、`paths`、`pathPrefix`、`pathPrefixes`，值键接受 `providers`、`values`、`items`。路径作用域在设置合并**之后**解析，而高优先层会整体替换数组，所以项目级 `disabledProviders` 会丢掉只存在于全局数组里的作用域条目；`enabledModels` 与 `enabledProviders` 也支持同一形态。 [@ref-omp-providers-scope-doc-69e8]

缓存方面，按 provider 的模型列表持久化在 `models.db` 里，materialization-policy 戳含应用版本、构建器版本与编译规则 hash，不兼容的行会失效；请求头值从不持久化。 [@ref-omp-providers-cache-doc-69e8]

还有一个新的隐式发现面：在 Apple Silicon macOS 上，未配置且未禁用的 `apple` provider 会经进程内 Foundation Models 桥探测，桥报告可用时 `apple/on-device` 无需凭据即可用，上下文大小、推理、图像输入与工具支持由桥元数据推导；不合格的设备、关闭的 Apple Intelligence 与不含该桥的构建都不产生模型。 [@ref-omp-providers-apple-doc-69e8]
