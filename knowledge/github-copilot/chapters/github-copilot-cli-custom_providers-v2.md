---
schema_version: 3
record_kind: production
edition_id: github-copilot-cli-custom_providers-v2
harness_id: github-copilot
topic: custom_providers
title: "GitHub Copilot CLI 的自定义 Provider：BYOK 入口、凭据、协议、模型元数据与诊断"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-github-copilot-byok-prereqs, ref-github-copilot-byok-requirements, ref-github-copilot-conc-models, ref-github-copilot-conc-models-extended, ref-github-copilot-conc-byok, ref-github-copilot-best-model, ref-github-copilot-admin-model, ref-github-copilot-cfgdir-models-allowlist, ref-github-copilot-auth-unauthenticated]
  - section_id: providers-entry-auth
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-providers, ref-github-copilot-cmdref-env, ref-github-copilot-byok-configure, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-byok-prereqs, ref-github-copilot-auth-unauthenticated, ref-github-copilot-auth-tokens, ref-github-copilot-auth-envvars, ref-github-copilot-progref-env, ref-github-copilot-auth-offline, ref-github-copilot-byok-offline]
  - section_id: providers-protocol-models
    surface_ids: [cli]
    source_refs: [ref-github-copilot-byok-providers, ref-github-copilot-byok-openai, ref-github-copilot-byok-azure, ref-github-copilot-byok-anthropic, ref-github-copilot-byok-configure, ref-github-copilot-byok-azure-env, ref-github-copilot-cmdref-models, ref-github-copilot-cmdref-models-20261003, ref-github-copilot-cmdref-options, ref-github-copilot-progref-model, ref-github-copilot-conc-models, ref-github-copilot-byok-requirements, ref-github-copilot-admin-model, ref-github-copilot-best-model]
  - section_id: providers-metadata-forwarding
    surface_ids: [cli]
    source_refs: [ref-github-copilot-byok-configure, ref-github-copilot-byok-azure-env, ref-github-copilot-conc-models-extended, ref-github-copilot-cmdref-options, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cfgdir-mdm-keys, ref-github-copilot-progref-model-precedence, ref-github-copilot-cfgdir-models-allowlist, ref-github-copilot-admin-model, ref-github-copilot-best-byok]
  - section_id: providers-responses-diagnostics
    surface_ids: [cli]
    source_refs: [ref-github-copilot-byok-requirements, ref-github-copilot-conc-byok, ref-github-copilot-cmdref-env, ref-github-copilot-cmdref-commands, ref-github-copilot-best-byok, ref-github-copilot-cmdref-models, ref-github-copilot-progref-model, ref-github-copilot-auth-offline]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry-auth
        status: partial
        source_refs: [ref-github-copilot-cfgdir-providers, ref-github-copilot-cmdref-env, ref-github-copilot-byok-configure, ref-github-copilot-cfgdir-user-settings]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-entry-auth
        status: partial
        source_refs: [ref-github-copilot-byok-configure, ref-github-copilot-byok-prereqs, ref-github-copilot-auth-unauthenticated, ref-github-copilot-auth-tokens, ref-github-copilot-auth-envvars, ref-github-copilot-progref-env, ref-github-copilot-byok-offline, ref-github-copilot-auth-offline]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: answered
        source_refs: [ref-github-copilot-byok-providers, ref-github-copilot-byok-openai, ref-github-copilot-byok-azure, ref-github-copilot-byok-anthropic, ref-github-copilot-byok-configure]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: partial
        source_refs: [ref-github-copilot-byok-configure, ref-github-copilot-byok-azure-env, ref-github-copilot-cmdref-models, ref-github-copilot-cmdref-models-20261003, ref-github-copilot-cmdref-options, ref-github-copilot-progref-model, ref-github-copilot-conc-models, ref-github-copilot-byok-requirements]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata-forwarding
        status: partial
        source_refs: [ref-github-copilot-byok-configure, ref-github-copilot-byok-azure-env, ref-github-copilot-conc-models-extended, ref-github-copilot-cmdref-options, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cfgdir-mdm-keys]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata-forwarding
        status: partial
        source_refs: [ref-github-copilot-byok-configure, ref-github-copilot-byok-azure-env, ref-github-copilot-progref-model-precedence, ref-github-copilot-cfgdir-models-allowlist, ref-github-copilot-admin-model, ref-github-copilot-best-byok]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-responses-diagnostics
        status: partial
        source_refs: [ref-github-copilot-byok-requirements, ref-github-copilot-conc-byok, ref-github-copilot-cmdref-env]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-responses-diagnostics
        status: partial
        source_refs: [ref-github-copilot-cmdref-commands, ref-github-copilot-best-byok, ref-github-copilot-cmdref-models, ref-github-copilot-progref-model, ref-github-copilot-auth-offline]
---

## 来源、适用范围与两条模型路径 {#providers-scope}

本章的固定来源是 `docs.github.com` 上 GitHub Copilot CLI 的归档文档页——自带密钥（BYOK）页、CLI 概念页、命令参考、配置目录参考、企业管理员页、认证页、编程接口参考与最佳实践页——以及公开仓库 `github.com/github/copilot-cli`（只含 `README.md`、`changelog.md`、`install.sh`）和 npm 包 `@github/copilot` 的元数据。
GitHub Copilot CLI 是闭源产品，文档是唯一可核验的证据，因此本章是来源级知识，不绑定任何已发布的 npm 版本。

Provider 在本产品里指"模型推理的提供方"，有两条互不相同的路径。
第一条是 GitHub 托管的内置模型：企业策略决定哪些模型对用户可见，用户用 `/model` 斜杠命令或 `--model` 命令行选项切换 [@ref-github-copilot-conc-models]。
第二条是 BYOK（Bring Your Own Key）——自己提供 API key 连接外部提供方，文档明确区分：企业/组织可以为企业侧配置自定义模型的密钥，而用户"在本地提供自己的 LLM 密钥"这件事不受企业策略控制 [@ref-github-copilot-admin-model]。

准入方面：使用 Copilot CLI 需要分配 GitHub Copilot 席位，内置模型受企业级开关约束，用户用 `/model` 查看自己可用的模型 [@ref-github-copilot-admin-model]。
BYOK 的前置条件只有两条：CLI 已安装，以及"有一个受支持提供方的 API key，或本地已运行模型（例如 Ollama）" [@ref-github-copilot-byok-prereqs]。
文档的 BYOK 页开宗明义说明它面向"在本机配置自己的 LLM 提供方 API key"的用户，企业为成员设置自定义模型则走另一篇管理员文档。

BYOK 与内置模型在能力面上有差异。
模型必须支持**工具调用**（function calling）与**流式输出**，缺少任一项 CLI 会返回错误；文档建议上下文窗口至少 128k token [@ref-github-copilot-byok-requirements]。
内置模型里有"扩展能力模型"支持 100 万 token 上下文窗口与可配置推理强度，选择这类模型后会被提示在默认上下文与扩展（100 万 token）上下文之间二选一；更大的上下文或更高的推理强度会增加 AI credits 消耗 [@ref-github-copilot-conc-models-extended][@ref-github-copilot-conc-byok]。

企业/组织用它们自己的密钥配置的自定义模型也会出现在 `/model` 列表中，位置在列表底部 [@ref-github-copilot-best-model]。
最后一条容易误解的边界：仓库级模型 allowlist（`.github/allowed_models.txt`）只约束 **Copilot 内置模型**，无法过滤 BYOK 自定义模型；BYOK 模型始终列出、始终可选，`fallback:` 指令也永远不会作用到它们 [@ref-github-copilot-cfgdir-models-allowlist]。
此外，BYOK 不要求 GitHub 认证，但 `/delegate`、GitHub MCP server、GitHub Code Search 这类 GitHub 托管功能在无认证时不可用 [@ref-github-copilot-auth-unauthenticated]。

## 入口与凭据 {#providers-entry-auth}

**providers.entry**：Provider 有两类登记入口。
文档化的第一方入口是配置文件 `providers.json`：一个 JSON 对象，含 `providers` 与 `models` 两个键，默认位于 `~/.copilot/providers.json`，可用环境变量 `COPILOT_PROVIDERS_CONFIG` 覆盖其路径；当该文件声明了任何 provider 或 model 时，它**优先于**旧式 `COPILOT_PROVIDER_*` 环境变量 [@ref-github-copilot-cfgdir-providers][@ref-github-copilot-cmdref-env]。

第二类入口是环境变量：你在启动 Copilot CLI **之前**设置它们 [@ref-github-copilot-byok-configure]。
配置目录里的用户设置文件 `~/.copilot/settings.json`（可用 `COPILOT_HOME` 改路径）是模型键 `model` 的持久化位置，但它不登记 provider [@ref-github-copilot-cfgdir-user-settings]。

缺口：文档只给出 `providers.json` 有 `providers`、`models` 两个顶层键，**没有公开任一键内部的字段名、类型或示例**。
因此"扩展入口"（除文件名与两个顶层键之外的可写入字段）与"第一方字段清单"在登记来源中不可核验，本问题按 partial 阅读。
仓库 `changelog.md` 里出现过 BYOK 的若干行为条目，但登记来源中没有任何 providers 配置结构的机器可读 schema。

**providers.auth**：前置条件是有 API key 或本地模型 [@ref-github-copilot-byok-prereqs]。
凭据与端点通过环境变量提供如下，全部来自 BYOK 页的配置表 [@ref-github-copilot-byok-configure]：

- `COPILOT_PROVIDER_BASE_URL`（**必需**）：提供方 API 端点的 base URL。
- `COPILOT_PROVIDER_TYPE`：`openai`（默认）、`azure` 或 `anthropic`。
- `COPILOT_PROVIDER_API_KEY`：提供方 API key；不使用认证的提供方（例如本地 Ollama）不需要。
- `COPILOT_PROVIDER_BEARER_TOKEN`：不使用 API key 认证时作为 bearer token 使用。
- `COPILOT_PROVIDER_WIRE_API`：与提供方通信时使用的 API 协议。
- `COPILOT_MODEL`（**必需**）：要使用的模型标识，也可用 `--model` 命令行选项设置。

补充的凭据机制在命令参考的环境变量表中：`COPILOT_PROVIDER_API_KEY_COMMAND` 是一个 shell 命令，在每个提供方请求前打印一枚新 key，**优先于** `COPILOT_PROVIDER_API_KEY`，其输出会替换匹配的凭据请求头——即便该请求头被 `COPILOT_PROVIDER_HEADERS` 另行设置也会被覆盖；`COPILOT_PROVIDERS_CONFIG` 则给出 providers 注册表路径并优先于旧式 `COPILOT_PROVIDER_*` [@ref-github-copilot-cmdref-env]。
`COPILOT_PROVIDER_HEADERS` 在上述描述中被提到，但登记来源**没有展开它的取值格式**。

凭据不写进示例的做法：BYOK 页的全部示例都用占位符字符串（例如 `YOUR-OPENAI-API-KEY`、`YOUR-AZURE-API-KEY`、`YOUR-ANTHROPIC-API-KEY`），不出现真实密钥 [@ref-github-copilot-byok-configure]。

认证侧：BYOK 下 GitHub 认证**不是必需的**，CLI 直接连到配置的提供方 [@ref-github-copilot-auth-unauthenticated]。
若同时做 GitHub 认证，支持令牌类型为 OAuth（`gho_`）、fine-grained PAT（`github_pat_`，须为个人账户所有且带 Copilot Requests 权限）与 GitHub App user-to-server（`ghu_`），classic PAT（`ghp_`）不支持 [@ref-github-copilot-auth-tokens]。
令牌可用 `COPILOT_GITHUB_TOKEN`、`GH_TOKEN`、`GITHUB_TOKEN` 环境变量提供，按此顺序取优先级 [@ref-github-copilot-auth-envvars]；编程参考重复了同一优先级 [@ref-github-copilot-progref-env]。

离线模式：设置 `COPILOT_OFFLINE=true` 后 CLI 不联系 GitHub 服务器，不尝试 GitHub 认证，只对配置的 BYOK 提供方发网络请求，遥测完全关闭 [@ref-github-copilot-auth-offline]。
BYOK 页补充说明：`export COPILOT_OFFLINE=true` 后启动 CLI 即可，但离线模式**只有在提供方本身是本地的或处于同一隔离环境时才是完全气隙**；若 `COPILOT_PROVIDER_BASE_URL` 指向远端端点，提示与代码上下文仍会经网络送到该提供方；不开启离线模式时，即使 BYOK 不认证，遥测仍会正常发送 [@ref-github-copilot-byok-offline]。

缺口：`providers.json` 里如何声明 base URL、API key、bearer token 等字段（即在文件内替代环境变量的写法）在登记来源中不可见，本问题按 partial 阅读。

## 协议与模型 {#providers-protocol-models}

**providers.protocol**：CLI 支持三种 provider 类型 [@ref-github-copilot-byok-providers]：

| 类型 | 兼容服务 |
| ---- | -------- |
| `openai` | OpenAI、Ollama、vLLM、Foundry Local，以及任何兼容 OpenAI Chat Completions API 的端点。这是默认类型。 |
| `azure` | Azure OpenAI Service。 |
| `anthropic` | Anthropic（Claude 模型）。 |

端点形态由 BYOK 页的三个连接示例给出。
OpenAI 兼容：本地 Ollama 设 `COPILOT_PROVIDER_BASE_URL=http://localhost:11434`；远端 OpenAI 设 `COPILOT_PROVIDER_BASE_URL=https://api.openai.com/v1` 并附 `COPILOT_PROVIDER_API_KEY` [@ref-github-copilot-byok-openai]。
Azure：base URL 形如 `https://YOUR-RESOURCE-NAME.openai.azure.com`，`COPILOT_PROVIDER_TYPE=azure`，另加 `COPILOT_PROVIDER_AZURE_API_VERSION` [@ref-github-copilot-byok-azure]。
Anthropic：`COPILOT_PROVIDER_TYPE=anthropic`、`COPILOT_PROVIDER_BASE_URL=https://api.anthropic.com` 与 `COPILOT_PROVIDER_API_KEY` [@ref-github-copilot-byok-anthropic]。
协议选择另有 `COPILOT_PROVIDER_WIRE_API`，用于指定通信所用的 API 协议 [@ref-github-copilot-byok-configure]。
文档没有把"兼容层/插件/原生接入"拆成三条独立通道来描述，上面三种类型即全部登记形态。

**providers.models**：模型标识是两层的。
`COPILOT_PROVIDER_MODEL_ID` 是"广为人知的模型名"，CLI 用它识别模型能力与 token 限制；`COPILOT_PROVIDER_WIRE_MODEL` 是**实际发送给提供方 API 做推理的模型名**，对 Azure OpenAI 应填部署名（Azure 通过部署而非模型名路由请求）[@ref-github-copilot-byok-configure][@ref-github-copilot-byok-azure-env]。
也就是说别名（well-known id）与线上名（wire model / 部署名）可以分开。

选择与列出：用 `--model=MODEL` 或 `COPILOT_MODEL` 选择模型，传 `auto` 让 Copilot 自动挑选 [@ref-github-copilot-cmdref-models]。
命令参考页列出的内置模型是 `claude-sonnet-4.6`（默认）、`gpt-5.4`、`gpt-6-astra`、`gpt-6-sol`、`gpt-6-luna`、`claude-opus-5.5`、`claude-haiku-4.5`、`gpt-5.3-codex` 和 `gemini-3.7-flash`；`gpt-6-astra`、`gpt-6-sol`、`gpt-6-luna` 标为需显式选择、不是自动默认 [@ref-github-copilot-cmdref-models-20261003]。这份清单随上游变动——较早的快照还列有 `gemini-3.5-flash` 与 `gemini-3.6-flash`，本轮已从文档中移除 [@ref-github-copilot-cmdref-models]。交互会话里也可用 `/model` 斜杠命令切换 [@ref-github-copilot-cmdref-options]。
编程参考补充：交互会话里用 `/model` 可看到所有可用模型的模型字符串，`/model` 的选择会写入配置文件 [@ref-github-copilot-progref-model]；概念页同样把 `/model` 与 `--model` 并列为切换入口 [@ref-github-copilot-conc-models]。
能力门槛：模型必须支持工具调用与流式输出，否则返回错误；建议上下文窗口至少 128k [@ref-github-copilot-byok-requirements]。

缺口：登记来源没有描述 BYOK 模型的**发现/刷新机制**——没有列出模型清单的端点、没有"刷新自定义模型列表"的命令，也没有说明 `/model` 中 BYOK 条目是从 `providers.json`、环境变量还是向提供方查询得来。
因此"列表和发现规则如何定义或刷新"按 partial 阅读；可确认的是内置模型列表会随企业开关变化 [@ref-github-copilot-admin-model]，以及企业自定义模型出现在 `/model` 底部 [@ref-github-copilot-best-model]。

## 能力元数据与参数转发 {#providers-metadata-forwarding}

**providers.metadata**：在环境变量层面，BYOK 的能力元数据由以下项表达（均来自 BYOK 配置表）[@ref-github-copilot-byok-configure]：

- `COPILOT_PROVIDER_MODEL_ID`：广为人知的模型名，CLI 据此识别模型能力与 token 限制。
- `COPILOT_PROVIDER_MAX_PROMPT_TOKENS`：单个请求允许的最大 prompt token 数。
- `COPILOT_PROVIDER_MAX_OUTPUT_TOKENS`：一次响应生成的最大 token 数。

Azure 页把 `COPILOT_PROVIDER_MODEL_ID` 与 `COPILOT_PROVIDER_WIRE_MODEL`（部署名）单列，并再次说明 MODEL_ID 用于让 CLI 识别能力与 token 限制 [@ref-github-copilot-byok-azure-env]。

上下文与推理强度是**会话级**的能力轴。
扩展能力模型支持 100 万 token 上下文窗口与可配置推理强度，选择后提示在默认与扩展上下文间二选一 [@ref-github-copilot-conc-models-extended]。
`--context TIER` 选项可取 `default` 或 `long_context`，覆盖已持久化的设置 [@ref-github-copilot-cmdref-options]；`--effort=LEVEL`（别名 `--reasoning-effort`）可取 `low`、`medium`、`high`、`xhigh`、`max`，`max` 是 Anthropic 模型的最高档 [@ref-github-copilot-cmdref-options]。
用户设置里有 `effortLevel`（默认 `"medium"`，取值 `low`/`medium`/`high`/`xhigh`）与 `model`（设为 `"auto"` 让 CLI 自动挑选）[@ref-github-copilot-cfgdir-user-settings]；仓库级 `contextTier`/`effortLevel`/`model` 只在工作目录受信时生效 [@ref-github-copilot-cfgdir-repo-settings]。
MDM 托管键里 `model` 可为所有用户设默认模型，且与它并列的 `effortLevel`、`contextTier` 只在被托管的模型支持显式 effort/context 选项时才生效 [@ref-github-copilot-cfgdir-mdm-keys]。

**providers.forwarding**：配置中会经过客户端并映射到请求的项，登记来源可确认的有：`COPILOT_PROVIDER_WIRE_MODEL`（决定发送给提供方的模型名，Azure 用部署名）、`COPILOT_PROVIDER_WIRE_API`（通信协议）、`COPILOT_PROVIDER_AZURE_API_VERSION`（Azure 请求版本）、`COPILOT_PROVIDER_BASE_URL`（请求目标）[@ref-github-copilot-byok-configure][@ref-github-copilot-byok-azure-env]。
`COPILOT_PROVIDER_MAX_PROMPT_TOKENS`/`MAX_OUTPUT_TOKENS` 约束请求与响应的 token 预算 [@ref-github-copilot-byok-configure]。

模型选择本身有明确的优先级链（高到低）：自定义 agent 定义里指定的模型 → `--model` → `COPILOT_MODEL` → 配置文件 `model` 键 → CLI 默认模型 [@ref-github-copilot-progref-model-precedence]。

允许清单与回退方面：`.github/allowed_models.txt` 用 glob 匹配内置模型 ID 并需要一条 `fallback:` 指令指定回退模型，但该清单**只管内置模型**，BYOK 模型不受其过滤、`fallback:` 也不作用于它们 [@ref-github-copilot-cfgdir-models-allowlist]。
企业侧：用户只能访问企业级启用的模型，企业/组织可为自定义模型提供密钥，用户用模型选择器、`--model` 或环境变量选择它们；本地 BYOK 不受这些策略控制 [@ref-github-copilot-admin-model]。
BYOK 的运行时行为：内置子代理（`/review`、`/task`、explore、`/fleet`）会自动继承你的提供方配置 [@ref-github-copilot-best-byok]。

缺口："哪些配置项仅影响界面或路由"在登记来源中没有系统说明——文档没有列出被客户端消费但不转发的参数，也没有说明 `COPILOT_PROVIDER_HEADERS`、`COPILOT_PROVIDER_BEARER_TOKEN` 在请求中的确切头名与合并顺序。
视觉（vision）能力元数据的声明字段同样未出现在 BYOK 环境变量表中。
上述内容按 partial 阅读。

## 响应、错误与诊断 {#providers-responses-diagnostics}

**providers.responses**：宿主要求后端满足两条约定——**工具调用**与**流式输出**；模型缺少任一能力时 CLI 返回错误 [@ref-github-copilot-byok-requirements]。
概念页重复了同一门槛，并说明"返回错误"是不支持时的行为 [@ref-github-copilot-conc-byok]。
BYOK 推理 token 在会话恢复时的处理有一条明确规则：`COPILOT_STRIP_REASONING_ON_RESUME` 设为 `0` 或 `false` 可保留 BYOK 的推理 token，默认行为是剥离 [@ref-github-copilot-cmdref-env]。

缺口：登记来源没有描述流式分片、工具调用往返、错误分类与**重试策略**的具体约定（哪些错误重试、退避方式、超时）。
仓库 `changelog.md` 里有若干 BYOK 行为条目，但其中多数位于未被登记的变更区间，且登记来源未提供任何请求/响应层级的协议规范。
本问题按 partial 阅读。

**providers.diagnostics**：可用于区分不同失败层的入口如下。
`copilot help providers` 在终端给出提供方配置的完整教程，BYOK 页与最佳实践页都把它列为官方入口 [@ref-github-copilot-cmdref-commands][@ref-github-copilot-best-byok]；`copilot help [TOPIC]` 的 `providers` 是受支持的帮助主题之一 [@ref-github-copilot-cmdref-commands]。
模型可选性用 `/model`（交互）确认，`--model` / `COPILOT_MODEL` 用于指定 [@ref-github-copilot-cmdref-models]；编程参考指出非交互模式下 CLI 会在响应输出中显示实际使用的模型（除非传 `-s`/`--silent`）[@ref-github-copilot-progref-model]。
BYOK 下的费用显示差异也是诊断信号：使用自带提供方时**费用估算被隐藏**，但仍显示 token 用量（输入、输出与缓存计数）[@ref-github-copilot-best-byok]。
离线模式可用于确认"没有联系 GitHub 服务器"这一层 [@ref-github-copilot-auth-offline]。

缺口：登记来源**没有**把"配置可读、模型可选、请求已发送、后端实际可用"拆成四条独立的可观测状态。
文档未给出确认 `providers.json` 解析成功的校验命令、未给出"请求已发往提供方"的日志或追踪开关、也未定义后端不可用时的错误形态与重试线索；`copilot help providers` 的具体输出内容也不在归档中。
因此本问题只能按 partial 阅读，能确认的是上述四个入口各自覆盖到哪一层。
