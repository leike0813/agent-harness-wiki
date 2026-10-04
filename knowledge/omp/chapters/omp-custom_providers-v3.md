---
schema_version: 3
record_kind: production
edition_id: omp-custom_providers-v3
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
      - ref-omp-providers-credentials-doc-69e8
      - ref-omp-providers-env-doc-69e8
  - section_id: providers-schema
    surface_ids: [cli]
    source_refs:
      - ref-omp-providers-auth-values-doc-69e8
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs:
      - ref-omp-providers-config-shape-doc-69e8
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs:
      - ref-omp-providers-merge-doc-69e8
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
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-schema
        status: answered
        source_refs:
          - ref-omp-providers-auth-values-doc-69e8
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
本章材料来自源码修订 69e8c9e 的官方文档 `docs/providers.md` 与 `docs/models.md`；上一版引用的 npm 包内 `src/config/models-config.ts` 与 `src/config/api-key-resolver.ts` 不在本轮取证范围内。凭据解析顺序、`.env` 载入、可用性判定、路径作用域禁用与 `models.yml` 合成顺序都取自该修订的文档正文。相对上一版的变化是实质性的：凭据顺序新增“扩展配置回退”一档，`auth: oauth` 现在免除自定义 provider 的 `apiKey` 要求，`disabledProviders` 支持路径作用域条目。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有发送真实模型请求，所以“模型可选”“请求已发送”“后端可用”只按文档描述，未做运行观察；示例中的凭据一律是占位或环境变量名。

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

## 协议与模型发现 {#providers-schema}

`auth` 允许 `apiKey`（默认）、`none` 或 `oauth`。本版的关键变化是：`none` 与 `oauth` 都免除自定义 provider 的 `apiKey` 要求，但 `oauth` 不创建凭据、也不注册登录流程，它只是强制 OAuth 风格的请求整形，可用凭据仍须来自已存 auth、环境变量或配置的 key。自定义 `anthropic-messages` 模型在省略 `auth` 时同样走 OAuth 风格整形，要用纯 API-key 整形就显式写 `auth: apiKey`。 [@ref-omp-providers-auth-values-doc-69e8]

`discovery.type` 允许 `ollama`、`llama.cpp`、`lm-studio`、`openai-models-list`、`proxy`、`litellm` 与新增的 `apple-foundation-models`；Apple 的传输在受支持的 Mac 上隐式注册，而 `apple-foundation-models` 不是这份 YAML schema 允许的 `api` 值。同层的 `discovery.injectV1`（默认 `true`）控制 `openai-models-list` 是否注入 `/v1`。 [@ref-omp-providers-auth-values-doc-69e8]

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

缺口：字段到请求的完整映射本章未逐项取证，哪些参数只影响界面或路由也仍未区分，属部分结论。 [@ref-omp-providers-merge-doc-69e8]

## 重试与诊断 {#providers-runtime}

“可用”是一次快速的配置检查而不是凭据校验请求：它不执行命令型密钥、不刷新 OAuth token，因此一个无效的已配置密钥可能显示为可用、直到推理时才失败。这条边界决定了诊断顺序——先用配置层判断，再谈后端。 [@ref-omp-providers-availability-doc-69e8]

`disabledProviders` 可以混写全局字符串条目与路径作用域条目；作用域条目在当前工作目录正好是配置路径或其子目录时生效，`~` 展开到 home 目录，路径键接受 `path`、`paths`、`pathPrefix`、`pathPrefixes`，值键接受 `providers`、`values`、`items`。路径作用域在设置合并**之后**解析，而高优先层会整体替换数组，所以项目级 `disabledProviders` 会丢掉只存在于全局数组里的作用域条目；`enabledModels` 与 `enabledProviders` 也支持同一形态。 [@ref-omp-providers-scope-doc-69e8]

缓存方面，按 provider 的模型列表持久化在 `models.db` 里，materialization-policy 戳含应用版本、构建器版本与编译规则 hash，不兼容的行会失效；请求头值从不持久化。 [@ref-omp-providers-cache-doc-69e8]

还有一个新的隐式发现面：在 Apple Silicon macOS 上，未配置且未禁用的 `apple` provider 会经进程内 Foundation Models 桥探测，桥报告可用时 `apple/on-device` 无需凭据即可用，上下文大小、推理、图像输入与工具支持由桥元数据推导；不合格的设备、关闭的 Apple Intelligence 与不含该桥的构建都不产生模型。 [@ref-omp-providers-apple-doc-69e8]
