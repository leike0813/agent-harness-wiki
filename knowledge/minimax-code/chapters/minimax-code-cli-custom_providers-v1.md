---
schema_version: 3
record_kind: production
edition_id: minimax-code-cli-custom_providers-v1
harness_id: minimax-code
topic: custom_providers
title: "MiniMax Code CLI 的自定义 Provider：入口、鉴权、协议、模型元数据与前向"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-minimax-code-providers-keys, ref-minimax-code-providers-types, ref-minimax-code-providers-reserved, ref-minimax-code-providers-parse, ref-minimax-code-providers-managed-override, ref-minimax-code-doc-config-layers, ref-minimax-code-providers-cli, ref-minimax-code-readme-byok]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-minimax-code-providers-authmode, ref-minimax-code-providers-envkey, ref-minimax-code-examples-providers, ref-minimax-code-providers-file-mode, ref-minimax-code-providers-create, ref-minimax-code-doc-signin, ref-minimax-code-doc-sec-credentials]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-minimax-code-providers-formats, ref-minimax-code-doc-feat-providers, ref-minimax-code-providers-identity, ref-minimax-code-providers-default-api, ref-minimax-code-providers-headers, ref-minimax-code-providers-normalize, ref-minimax-code-doc-custom-providers]
  - section_id: providers-models-meta
    surface_ids: [cli]
    source_refs: [ref-minimax-code-providers-cli, ref-minimax-code-doc-feat-providers, ref-minimax-code-providers-modelmeta, ref-minimax-code-providers-fallback-limits, ref-minimax-code-examples-providers, ref-minimax-code-providers-models-urls, ref-minimax-code-providers-discovery, ref-minimax-code-providers-fingerprint]
  - section_id: providers-forwarding-responses
    surface_ids: [cli]
    source_refs: [ref-minimax-code-providers-wire-headers, ref-minimax-code-providers-modelmeta, ref-minimax-code-providers-probe, ref-minimax-code-providers-retry]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-minimax-code-doc-ref-provider, ref-minimax-code-providers-fingerprint, ref-minimax-code-doc-faq-providers, ref-minimax-code-providers-probe]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-minimax-code-providers-keys, ref-minimax-code-providers-types, ref-minimax-code-providers-reserved, ref-minimax-code-providers-parse, ref-minimax-code-providers-managed-override, ref-minimax-code-doc-config-layers, ref-minimax-code-providers-cli, ref-minimax-code-readme-byok]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-minimax-code-providers-authmode, ref-minimax-code-providers-envkey, ref-minimax-code-examples-providers, ref-minimax-code-providers-file-mode, ref-minimax-code-providers-create, ref-minimax-code-doc-signin, ref-minimax-code-doc-sec-credentials]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-minimax-code-providers-formats, ref-minimax-code-doc-feat-providers, ref-minimax-code-providers-identity, ref-minimax-code-providers-default-api, ref-minimax-code-providers-headers, ref-minimax-code-providers-normalize, ref-minimax-code-doc-custom-providers]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models-meta
        status: answered
        source_refs: [ref-minimax-code-providers-cli, ref-minimax-code-doc-feat-providers, ref-minimax-code-providers-modelmeta, ref-minimax-code-providers-fallback-limits, ref-minimax-code-examples-providers, ref-minimax-code-providers-models-urls, ref-minimax-code-providers-discovery, ref-minimax-code-providers-fingerprint]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models-meta
        status: answered
        source_refs: [ref-minimax-code-providers-cli, ref-minimax-code-doc-feat-providers, ref-minimax-code-providers-modelmeta, ref-minimax-code-providers-fallback-limits, ref-minimax-code-examples-providers, ref-minimax-code-providers-models-urls, ref-minimax-code-providers-discovery, ref-minimax-code-providers-fingerprint]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: answered
        source_refs: [ref-minimax-code-providers-wire-headers, ref-minimax-code-providers-modelmeta, ref-minimax-code-providers-probe, ref-minimax-code-providers-retry]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: answered
        source_refs: [ref-minimax-code-providers-wire-headers, ref-minimax-code-providers-modelmeta, ref-minimax-code-providers-probe, ref-minimax-code-providers-retry]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-minimax-code-doc-ref-provider, ref-minimax-code-providers-fingerprint, ref-minimax-code-doc-faq-providers, ref-minimax-code-providers-probe]
---

MiniMax Code CLI 的第三方模型接入走「自定义 provider」（BYOK）机制：provider 是活动 profile 的 `config.yaml` 里一个保留子树 `custom_provider`，官方 MiniMax 端点则独占 `minimax_api` 子树 [@ref-minimax-code-providers-keys] [@ref-minimax-code-examples-providers]。本章固定来源是 `MiniMax-AI/MiniMax-Code` 仓库 commit `c8a39a5` 上的 `packages/config/src/byok-config.ts`、`packages/local-runtime-v2/src/service/model-system`、`packages/tui/src/provider` 与 `docs/examples.md`，以及官方 CLI 文档 `configuration`、`features`、`reference`、`faq`、`quick-start` 与 `security` 的快照。

## Provider 入口与作用域 {#providers-entry}

- 顶层配置键：`custom_provider` 是「用户创建的外部 provider」，与 `minimax_api` 共享同一写入边界；同级还有 `minimaxModelSource`（`token_plan` 或 `minimax_api_key`）[@ref-minimax-code-providers-keys]。
- 类型：`CustomProvidersConfig` 是 「字符串到 CustomProviderConfig 的记录」，键（provider_key）在创建时由显示名生成、之后不可变，重命名只改 `name` [@ref-minimax-code-providers-types]。
- 保留键：`minimax`、`minimax_api`、`provider`、`custom_provider` 不能再被当作自定义 provider 名 [@ref-minimax-code-providers-reserved]。
- 解析在读取时按「任意普通对象」接受，不在读取阶段做 schema 校验 [@ref-minimax-code-providers-parse]；托管运行时会在读取时恢复并保护 `provider.minimax` 子树 [@ref-minimax-code-providers-managed-override]。
- 作用域只有一个：当前数据目录的配置文件。切换 profile 或 `MINIMAX_DATA_DIR` 就切换整套 provider 配置 [@ref-minimax-code-doc-config-layers]。
- 命令行入口：`mcode provider add` 至少需要一个模型；`--use` 会在保存前先测试第一个模型，测试失败则不保存、也不改变默认模型 [@ref-minimax-code-providers-cli] [@ref-minimax-code-readme-byok]。

```yaml
# 依据 docs/examples.md 的「自定义 provider」小节
custom_provider:
  my-provider:
    name: My compatible service
    api: openai-completions
    options:
      baseURL: https://api.example.com/v1
      apiKey: <你的密钥>
      authMode: api-key
    models:
      my-model:
        name: my-model
```

## 凭据、环境变量与 base URL {#providers-auth}

- 认证模式：`managed-login`、`api-key`、`oauth` 三态；显式 `authMode` 优先，命中受管主机白名单（`agent.minimax.io`、`agent.minimax.cn`、`agent.minimaxi.com`）则推断为 `managed-login`，否则默认 `api-key` [@ref-minimax-code-providers-authmode]。
- 命令行从环境变量读取密钥：默认变量 `MCODE_PROVIDER_API_KEY`，可用 `--api-key-env` 换名；缺密钥时报错提示设置该变量或换用 `--api-key-env` [@ref-minimax-code-providers-envkey]。
- `--api-key-env` 是「读当前变量的值并写入配置文件」，写的是明文值而不是变量引用 [@ref-minimax-code-examples-providers]。
- 落盘保护：含密钥的本地配置文件以 `0600` 权限写入（`LOCAL_CONFIG_FILE_MODE`）[@ref-minimax-code-providers-file-mode]。
- 写入方式：创建 provider 时写入 `options: { apiKey, baseURL, authMode: 'api-key' }` [@ref-minimax-code-providers-create]。
- 官方文档明确「CLI 读取密钥但不打印」；`provider list` 只显示托管登录状态或掩码后的密钥状态 [@ref-minimax-code-doc-signin] [@ref-minimax-code-doc-sec-credentials]。
- 示例中凭据只用占位值；不要把真实密钥写进仓库、`AGENTS.md`、提示词或 CI 日志 [@ref-minimax-code-doc-sec-credentials]。

## 协议与端点 {#providers-protocol}

- 支持的 API 格式为三个：`anthropic-messages`、`openai-completions`、`openai-responses` [@ref-minimax-code-providers-formats] [@ref-minimax-code-doc-feat-providers]。
- 运行时拥有同一份允许列表；配置里能出现但被刻意排除在通用 BYOK 重写之外的 `openai-codex-responses` 不参与该路径 [@ref-minimax-code-providers-identity]。
- 省略 `api` 时按 `anthropic-messages` 处理 [@ref-minimax-code-providers-default-api]。
- 端点拼接：`anthropic-messages` → `/v1/messages`，`openai-responses` → `/responses`，其余 → `/chat/completions` [@ref-minimax-code-providers-headers]。
- base URL 会被规范化：去掉结尾的 `/v1/messages`、`/messages`、`/v1`（anthropic）或 `/chat/completions`、`/responses` [@ref-minimax-code-providers-normalize]。
- 请求头随格式不同：anthropic 发送 `x-api-key` 与 `anthropic-version: 2023-06-01`；OpenAI 兼容格式发送 `Authorization: Bearer` [@ref-minimax-code-providers-headers]；官方文档给出同样结论 [@ref-minimax-code-doc-custom-providers]。

## 模型 ID、列表与能力元数据 {#providers-models-meta}

- `mcode provider add --model` 可重复传入，至少一个；`--use` 把第一个模型设为默认 [@ref-minimax-code-providers-cli]。
- 模型引用形如 `provider/model`，可带变体：`provider/model#variant`；`mcode exec --model` 只覆盖当前一次运行 [@ref-minimax-code-doc-feat-providers]。
- 单个模型的元数据字段清单：`attachment`、`reasoning`、`temperature`、`tool_call`、`interleaved`、`cost`、`limit`、`contextWindowOptions`、`modalities`、`thinking`、`thinking_config`、`options`、`headers`、`capabilities`、`variants`、`defaultVariant` [@ref-minimax-code-providers-modelmeta]。
- 上下文与输出上限通过 `limit.context`、`limit.output` 表达，只接受正安全整数 [@ref-minimax-code-providers-modelmeta]；未配置的未知模型回落到 `contextWindow: 200000`、`maxTokens: 16384` [@ref-minimax-code-providers-fallback-limits]。
- 官方文档把这两个值读作 `contextLimit` 与 `maxOutputTokens`，并给出同样的回落数字 [@ref-minimax-code-examples-providers]。
- 模型发现：宿主向 provider 的模型列表端点发 GET 请求，`anthropic-messages` 先试 `/v1/models`，再回落到同基址 `/models` 与源站根 `/models`；其他格式直接用 `/models`，端点缺失时继续按候选顺序尝试，鉴权/限流/服务端错误则立即返回 [@ref-minimax-code-providers-models-urls] [@ref-minimax-code-providers-discovery]。
- 连接测试的判定指纹包含 provider 的合并请求头，因此改动请求头会作废已缓存的测试结论 [@ref-minimax-code-providers-fingerprint]。

## 参数前向与响应约定 {#providers-forwarding-responses}

- 配置里的请求头按「provider 级 `options.headers` 与模型级 `headers` 合并」后进入请求 [@ref-minimax-code-providers-wire-headers]。
- 除配置头之外，宿主总会附加 `X-Mavis-Session-Id`、`X-Mavis-Agent-Id`、`X-Mavis-Timezone-Offset`；只有受管 provider 才额外带 `User-Agent: MiniMaxAgent` 与路由头，BYOK 不带 [@ref-minimax-code-providers-wire-headers]。
- 仅供宿主解析、不会上线的字段：`options.authMode`、`options.baseURL`、`enabled`、`kind`；仅影响界面的字段包括显示名、`model_order`、`variants`、`configuration_source` 等 [@ref-minimax-code-providers-modelmeta]。
- 连接测试是非流式的轻量探测：请求体带 `stream:false` 与一条 ping 消息，默认 10 秒超时 [@ref-minimax-code-providers-probe]。
- 真实会话经框架的流式通道执行，重试策略由宿主显式开启：默认最多重试 5 次、退避 1 秒起、上限 30 秒、总时长上限 120 秒，且 provider 原生重试被关闭 [@ref-minimax-code-providers-retry]。
- 后端契约由所选 API 格式决定；工具调用、用量与流式语义由协议实现负责，运行时只提供 Model、请求头与兼容开关 [@ref-minimax-code-providers-probe]。

## 诊断与排错 {#providers-diagnostics}

- `mcode provider list`（`--json`）输出 provider 快照；`mcode provider test ID --model ID`（`--json`）做单 provider/单模型测试 [@ref-minimax-code-doc-ref-provider]。
- 测试结果是按配置指纹缓存的状态条目，包含 `state`（`unknown`/`available`/`failed`）、最后测试时间与错误码/错误消息；凭据在视图中被掩码 [@ref-minimax-code-providers-fingerprint]。
- 官方 FAQ 的排查顺序：先 `mcode provider test PROVIDER-ID`；官方模型不可用时先 `mcode login`，再看 `/status` 与 `/model` [@ref-minimax-code-doc-faq-providers]。
- 区分层次：配置可读（`provider list`）→ 模型可选（可用性按路由解析）→ 请求已发送（`provider test` 的 `unauthorized`/`timeout`/`network`/`http_STATUS`/`provider_error`/`invalid_response` 分类）→ 后端实际可用（按协议校验响应形状）。四步各自失败的现象不同，不要用其中一步替代其余 [@ref-minimax-code-providers-probe]。
