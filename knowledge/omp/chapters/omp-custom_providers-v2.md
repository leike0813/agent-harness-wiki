---
schema_version: 2
record_kind: production
edition_id: omp-custom_providers-v2
harness_id: omp
topic: custom_providers
title: OMP 自定义 Provider 与模型配置
sections:
  - section_id: providers-file
    source_refs:
      - ref-omp-providers-custom-doc
      - ref-omp-models-file-doc
      - ref-omp-models-validation-doc
  - section_id: providers-credentials
    source_refs:
      - ref-omp-providers-cred-doc
  - section_id: providers-schema
    source_refs:
      - ref-omp-models-fields-doc
      - ref-omp-models-discovery-doc
  - section_id: providers-metadata
    source_refs:
      - ref-omp-models-checks-doc
  - section_id: providers-forwarding
    source_refs:
      - ref-omp-models-fields-doc
  - section_id: providers-runtime
    source_refs:
      - ref-omp-providers-retry-code
      - ref-omp-models-code
questions:
  - question_id: providers.entry
    section_id: providers-file
    status: answered
    source_refs:
      - ref-omp-providers-custom-doc
      - ref-omp-models-file-doc
      - ref-omp-models-validation-doc
  - question_id: providers.auth
    section_id: providers-credentials
    status: answered
    source_refs:
      - ref-omp-providers-cred-doc
  - question_id: providers.protocol
    section_id: providers-schema
    status: answered
    source_refs:
      - ref-omp-models-fields-doc
  - question_id: providers.models
    section_id: providers-schema
    status: answered
    source_refs:
      - ref-omp-models-discovery-doc
  - question_id: providers.metadata
    section_id: providers-metadata
    status: partial
    source_refs:
      - ref-omp-models-checks-doc
  - question_id: providers.forwarding
    section_id: providers-forwarding
    status: partial
    source_refs:
      - ref-omp-models-fields-doc
  - question_id: providers.responses
    section_id: providers-runtime
    status: partial
    source_refs:
      - ref-omp-providers-retry-code
  - question_id: providers.diagnostics
    section_id: providers-runtime
    status: partial
    source_refs:
      - ref-omp-models-code
---
本章材料来自源码修订 dff728c 的官方文档 `docs/providers.md` 与 `docs/models.md`，以及 npm 包 `@oh-my-pi/pi-coding-agent` 18.3.4 的包内校验代码 `src/config/models-config.ts` 与凭据重试代码 `src/config/api-key-resolver.ts`。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有发送真实模型请求，所以“模型可选”“请求已发送”“后端可用”只按文档与源码描述，未做运行观察；示例中的凭据一律是占位或环境变量名。

## 配置文件与最小 Provider {#providers-file}

自定义 provider 与 model 写在用户级 `~/.omp/agent/models.yml`（或 `models.yaml`）的 `providers` 下，和内置 provider 共用选择、凭据解析与 `disabledProviders` 规则。默认路径先取 `models.yml` 再取 `models.yaml`；两者都缺失而同目录存在 `models.json` 时，会先迁移成 `models.yml`。 [@ref-omp-providers-custom-doc] [@ref-omp-models-file-doc]

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

`baseUrl` 必填，指向端点根；`apiKey` 除非 `auth: none` 否则必填，值按“环境变量名或字面值”解析；`api` 在 provider 级或每个 model 级给出其一；`models[].id` 必填，`name`、`contextWindow`、`maxTokens` 可选。 [@ref-omp-models-validation-doc]

前提是把 `MY_OPENAI_COMPATIBLE_KEY` 设成有效密钥；生效结果是该 provider 参与模型选择，模型以 `my-openai-compatible/fast-chat` 这样的选择器出现。检查方式是用 `omp models` 列出，或用 `omp models find fast-chat` 定位到一个 provider。 [@ref-omp-providers-custom-doc]

## 凭据与解析顺序 {#providers-credentials}

需要密钥时，OMP 按第一命中解析：运行时覆盖（例如 CLI `--api-key`，永不持久化）优先；其后是 `models.yml` 里钉在自定义 provider 上的 `apiKey`；再往后依次是已存 OAuth、`/login` 保存的 key、provider 环境变量（含 `.env` 载入的值）、其它已存 key，最后是 `models.yml` 的 fallback resolver。`models.yml` 的 `apiKey` 故意排在已存 OAuth 之前，避免把上游 OAuth 令牌转发给自定义网关。 [@ref-omp-providers-cred-doc]

`apiKey` 的值是“环境变量名或字面值”：若字符串正好是一个已存在的环境变量名，就用该变量的值，否则字符串本身就是密钥；以 `!` 开头则执行命令并取裁剪后的标准输出。下面把密钥留在环境里而只写变量名：

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

生效结果是该 provider 的 baseUrl 收到以解析出的密钥发出的请求；检查方式是启动时确认没有凭据缺失错误，并用一次真实请求确认后端接受该密钥，这一步本轮没有执行。 [@ref-omp-providers-cred-doc]

## 协议与模型发现 {#providers-schema}

provider 的 `api` 决定请求协议，允许值包括 `openai-completions`、`openai-responses`、`openai-codex-responses`、`azure-openai-responses`、`anthropic-messages`、`bedrock-converse-stream`、`google-generative-ai`、`google-gemini-cli`、`google-vertex`、`typesafe` 与 `openrouter-decisions`；其中 `typesafe` 与 `openrouter-decisions` 是判断 API，由 `judge` 模型角色选用，不是聊天传输。 [@ref-omp-models-fields-doc]

模型条目必填 `id`。provider 另外可选 `discovery`，其 `type` 允许 `ollama`、`llama.cpp`、`lm-studio`、`openai-models-list`、`proxy` 或 `litellm`；provider 级 `discovery` 除 `proxy` 外都要求 provider 级 `api`。 [@ref-omp-models-discovery-doc]

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

生效结果是 OMP 在运行时从该端点取回模型列表；`auth` 允许 `apiKey`（默认）、`none` 或 `oauth`，但对 `models.yml` 的自定义模型，`oauth` 只被 schema 接受，不免除 `apiKey` 要求。模型的刷新时机与缓存本章未取证。 [@ref-omp-models-discovery-doc]

## 模型元数据 {#providers-metadata}

`contextWindow` 与 `maxTokens` 若提供必须为正；`maxContextWindow` 是扩展上下文窗口，须为不小于 `contextWindow` 的正整数。这些值是 OMP 的本地上下文预算，端点是否接受所配置的请求大小仍需实测。 [@ref-omp-models-checks-doc]

缺口：上下文窗口、输出上限、工具、视觉与推理强度等能力元数据如何表达并生效，本章只取到上述校验级结论，未逐项取证，属部分结论。 [@ref-omp-models-checks-doc]

## 参数转发 {#providers-forwarding}

可写参数（如 `baseUrl`、`headers`、`compat`、`modelOverrides`）会被合并进请求；把 `transport` 设为 `pi-native` 时，该 provider 的全部模型改走 `auth-gateway` 兼容 baseUrl 的流式端点。 [@ref-omp-models-fields-doc]

缺口：字段到请求的完整映射本章未逐项取证，哪些参数只影响界面或路由也仍未区分，属部分结论。 [@ref-omp-models-fields-doc]

## 重试与诊断 {#providers-runtime}

认证失败与配额耗尽走上层 a/b/c 重试策略：初始解析，然后强制刷新同账号，最后轮换兄弟凭据；没有兄弟凭据时停止并交由外层整轮重试。流式与工具调用的逐字节行为本章未验证。 [@ref-omp-providers-retry-code]

`models-config` 校验会在定义模型却缺 `baseUrl`、缺 `apiKey`（除非 `auth: none`）或 model 缺 `api` 时报错，可作为“配置可读”的诊断。要区分“模型可选、请求已发送、后端可用”，需要真实请求，本轮没有做。 [@ref-omp-models-code]

