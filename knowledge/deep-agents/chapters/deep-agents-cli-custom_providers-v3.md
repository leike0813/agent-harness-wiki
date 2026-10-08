---
schema_version: 3
record_kind: production
edition_id: deep-agents-cli-custom_providers-v3
harness_id: deep-agents
topic: custom_providers
title: "自定义 Provider：声明入口、凭据解析、协议形态、模型清单与请求装配"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-deep-agents-providers-reference-doc, ref-deep-agents-providers-config-doc, ref-deep-agents-providers-provider-typedict, ref-deep-agents-providers-inspect-doc]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-deep-agents-providers-auth-store, ref-deep-agents-providers-key-order-doc, ref-deep-agents-providers-stored-pairing, ref-deep-agents-providers-dotenv-doc, ref-deep-agents-providers-endpoints-doc, ref-deep-agents-providers-config-doc, ref-deep-agents-providers-inspect-doc]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-deep-agents-providers-reference-doc, ref-deep-agents-providers-arbitrary-doc, ref-deep-agents-providers-class-path, ref-deep-agents-providers-compatible-doc]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-deep-agents-providers-default-model-doc, ref-deep-agents-providers-switcher-doc, ref-deep-agents-providers-discovery, ref-deep-agents-providers-config-doc, ref-deep-agents-providers-anthropic-fallbacks, ref-deep-agents-providers-anthropic-fallback-discovery]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-deep-agents-providers-profile-doc, ref-deep-agents-providers-profiles-merge, ref-deep-agents-providers-arbitrary-doc, ref-deep-agents-providers-reasoning-effort, ref-deep-agents-providers-anthropic-fallbacks, ref-deep-agents-providers-anthropic-fallback-apply]
  - section_id: providers-request
    surface_ids: [cli]
    source_refs: [ref-deep-agents-providers-config-doc, ref-deep-agents-providers-provider-kwargs, ref-deep-agents-providers-model-params-doc, ref-deep-agents-providers-endpoints-doc, ref-deep-agents-providers-retries-doc, ref-deep-agents-providers-arbitrary-doc, ref-deep-agents-providers-reference-doc, ref-deep-agents-providers-retry-middleware, ref-deep-agents-providers-inspect-doc, ref-deep-agents-providers-switcher-doc, ref-deep-agents-providers-auth-states]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-deep-agents-providers-provider-typedict, ref-deep-agents-providers-config-doc, ref-deep-agents-providers-reference-doc]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-deep-agents-providers-auth-store, ref-deep-agents-providers-key-order-doc, ref-deep-agents-providers-stored-pairing, ref-deep-agents-providers-endpoints-doc]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-deep-agents-providers-class-path, ref-deep-agents-providers-arbitrary-doc, ref-deep-agents-providers-compatible-doc, ref-deep-agents-providers-reference-doc]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-deep-agents-providers-switcher-doc, ref-deep-agents-providers-discovery, ref-deep-agents-providers-default-model-doc, ref-deep-agents-providers-config-doc, ref-deep-agents-providers-anthropic-fallbacks, ref-deep-agents-providers-anthropic-fallback-discovery]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-deep-agents-providers-profile-doc, ref-deep-agents-providers-profiles-merge, ref-deep-agents-providers-reasoning-effort, ref-deep-agents-providers-arbitrary-doc, ref-deep-agents-providers-anthropic-fallbacks, ref-deep-agents-providers-anthropic-fallback-apply]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-request
        status: answered
        source_refs: [ref-deep-agents-providers-model-params-doc, ref-deep-agents-providers-provider-kwargs, ref-deep-agents-providers-config-doc, ref-deep-agents-providers-endpoints-doc]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-request
        status: partial
        source_refs: [ref-deep-agents-providers-retries-doc, ref-deep-agents-providers-retry-middleware, ref-deep-agents-providers-arbitrary-doc, ref-deep-agents-providers-reference-doc]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-request
        status: answered
        source_refs: [ref-deep-agents-providers-auth-states, ref-deep-agents-providers-inspect-doc, ref-deep-agents-providers-switcher-doc]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 提供方声明的三类入口 {#providers-entry}

注：catalog 为该 surface 登记的参考页是 Deep Agents overview（`https://docs.langchain.com/oss/python/deepagents/overview`），该页描述 Python SDK 的 `create_deep_agent`，不描述 CLI；本页因此改用官方 CLI 文档树与固定提交的 `libs/code` 源码作为固定来源。

Deep Agents Code 的模型提供方（provider）由三个入口共同决定，彼此不互斥：

1. **内置注册表**。CLI 从 `langchain.chat_models.base` 的 `_BUILTIN_PROVIDERS`（旧版名 `_SUPPORTED_PROVIDERS`）枚举 `init_chat_model` 认识的 provider，并把每个包根名推导成 `包根名.data._profiles` 来读模型档案。官方文档以表格列出内置 provider、所需 LangChain 包、凭据环境变量，以及该 provider 是否自带 model profiles：OpenAI、Anthropic、Gemini 默认可用，其余以可选 extra 安装 [@ref-deep-agents-providers-reference-doc]。
2. **配置文件**。`~/.deepagents/config.toml` 的 `[models.providers]` 表，每个 provider 一张子表；这是自建或任意 provider 的唯一声明处 [@ref-deep-agents-providers-config-doc]。
3. **运行时选择**。`/model` 交互选择器、`/model provider:model`、`dcode --model provider:model`、`--default-model`。这些只挑选模型，不改变 provider 的声明来源。

`[models.providers]` 的键与代码里的 `ProviderConfig`（TypedDict，`total=False`，故全部可选）一一对应 [@ref-deep-agents-providers-provider-typedict][@ref-deep-agents-providers-config-doc]：

| 键 | 含义 |
| - | - |
| `enabled` | 是否出现在 `/model` 选择器，默认 `true`；设为 `false` 可隐藏随包自动发现的 provider（典型的传递依赖），但仍可用 `provider:model` 直接调用 |
| `models` | 供选择器展示的模型名列表；对自带 profile 的 provider 是**追加**在内置清单之后，且绕过 profile 过滤 |
| `api_key_env` | 保存密钥的**环境变量名**（不是密钥值），启动时用它做凭据预检 |
| `display_name` / `short_name` | `/auth` 中的可读名称 / 空间受限处的短名 |
| `api_key_url` | `/auth` 里链接到的密钥申请页（是 URL，不是凭据） |
| `base_url` / `base_url_env` | 端点字面量 / 端点所在环境变量名；两者同时设置时 `base_url` 胜出 |
| `params` | 转发给模型构造函数的额外关键字参数，可按模型名建子表覆盖 |
| `profile` | 覆盖模型运行时 profile 字段（如 `max_input_tokens`），同样支持按模型子表 |
| `class_path` | `module.path:ClassName`，直接实例化任意 `BaseChatModel` 子类，绕过 `init_chat_model` |

作用域上，用户层是 profile 目录（默认 `~/.deepagents`，可用 `DEEPAGENTS_HOME` 整体迁移）下的 `config.toml`。`[models.providers]` 与 `[async_subagents]` 一样按深合并解析且被标记为 redacted：`dcode config` 只报告取值来源与是否存在，从不打印内容 [@ref-deep-agents-providers-inspect-doc]。`params` 尤其不能放凭据——`api_key` 要在 `api_key_env` 指向的环境变量里给，早期凭据检查在读取 `params` 之前就已执行 [@ref-deep-agents-providers-config-doc]。

最小自建 provider（语法依 [@ref-deep-agents-providers-config-doc]）：

```toml
[models.providers.my_custom]
display_name = "My Custom Provider"
api_key_url = "https://my-provider.example.com/keys"
class_path = "my_package.models:MyChatModel"
api_key_env = "MY_API_KEY"
base_url = "https://my-endpoint.example.com"
models = ["my-model-v1"]

[models.providers.my_custom.params]
temperature = 0
max_tokens = 4096
```

## 凭据与端点的成对解析 {#providers-auth}

密钥有两个来源：`/auth` 管理器（`dcode auth set/list/status/remove/path` 是它的脚本化等价物）写出本机凭据库，以及环境变量。凭据库位于 `~/.deepagents/.state/auth.json`，文件权限 `0600`、父目录 `0700`，先写临时文件再原子替换；其模块约定是所有取值永不写日志、永不 `%r` 格式化、永不出现在异常消息里，只报告"为 provider X 存了凭据"这类结构事实 [@ref-deep-agents-providers-auth-store]。

密钥解析顺序（从高到低）：

1. `DEEPAGENTS_CODE_` 前缀的环境变量（如 `DEEPAGENTS_CODE_OPENAI_API_KEY`），这是"只在 Deep Agents Code 里生效"的显式覆盖；
2. `/auth` 存下的密钥；
3. 厂商原本的环境变量（如 `OPENAI_API_KEY`），可来自 shell，也可来自 `.env` 文件。

要点是**存下的密钥优先于普通环境变量，而前缀变量优先于存下的密钥**，因此可以在不清除已存密钥的前提下为单次运行覆盖它 [@ref-deep-agents-providers-key-order-doc]。`.env` 的加载顺序是：从启动目录向上找到的最近项目 `.env`（先命中者胜），再是 `~/.deepagents/.env`；shell 导出始终胜过 `.env` [@ref-deep-agents-providers-dotenv-doc]；`DEEPAGENTS_CODE_` 前缀对第三方凭据变量同样有效 [@ref-deep-agents-providers-key-order-doc]。

代码路径解释了"成对"这件事：LangChain 的 chat-model 工厂只读进程环境变量，所以 `/auth` 存下的密钥要先被复制到该 provider 的规范环境变量名上才生效。`apply_stored_credentials()` 因此把密钥与端点作为一对原子处理 [@ref-deep-agents-providers-stored-pairing]：

- 存有 `base_url` 时，写入该 provider 的规范端点变量，并清掉 SDK 可能读取的其余端点变量，避免继承来的网关 URL 从别名变量漏进来；
- `base_url` 为空（用户在 `/auth` 里留空）时清掉该 provider 的**全部**端点变量，让请求回到厂商默认端点，从而不会把个人密钥发到网关；同时清掉注入自定义头的变量（如 `ANTHROPIC_CUSTOM_HEADERS`），否则网关密钥会顶着原生端点被拒；
- 只写不带前缀的规范名，因此 `DEEPAGENTS_CODE_{VAR}` 覆盖仍然优先。

端点的解析顺序与密钥对齐（先命中者胜）：`config.toml` 里的 `base_url` 字面量 → 该 provider 的端点环境变量（每个名字都先查 `DEEPAGENTS_CODE_` 前缀版）→ `/auth` 存下的端点（对没有端点变量的 provider 是唯一步骤）→ provider SDK 自带默认值。`base_url_env` 让不在内置表里的 provider 也能加入同一套解析与配对，静态 `base_url` 仍胜过它 [@ref-deep-agents-providers-endpoints-doc]。示例（语法依该文档）：

```toml
[models.providers.myprovider]
api_key_env = "MYPROVIDER_API_KEY"
base_url_env = "MYPROVIDER_BASE_URL"
models = ["my-model"]
```

凭据绝不写进示例：示例里一律用变量引用（`$OPENAI_API_KEY`、`MYPROVIDER_API_KEY`）而不是字面密钥；`params` 里禁止写 `api_key`，要用 `api_key_env` 指环境变量 [@ref-deep-agents-providers-config-doc]。`dcode config` 对凭据只报 configured / not configured，从不打印取值 [@ref-deep-agents-providers-inspect-doc]。

## 协议、端点形态与接入层 {#providers-protocol}

请求出厂走两条路：

- **标准路径**：调 LangChain 的 `init_chat_model(model_name, model_provider=provider, **kwargs)`，由 provider 对应的集成包负责真实线协议。OpenAI、Anthropic、Gemini 随 CLI 安装；其余 provider 先用 `/install` 或 `dcode --install` 装对应 extra，也可在初始安装时用 `DEEPAGENTS_CODE_EXTRAS` 预装 [@ref-deep-agents-providers-reference-doc]。包缺失会得到带安装提示的错误，已安装但 import 失败则直接抛出真实错误。
- **原生类路径**：provider 配了 `class_path` 时，CLI 用 importlib 载入该 `BaseChatModel` 子类并直接实例化，完全跳过 `init_chat_model`。类必须真的是 `BaseChatModel` 子类（否则报"不是子类"），选中的模型名以 `model=` 关键字参数传入；类所在包必须能被运行 `dcode` 的同一环境 import，自建包用 `dcode --install 包名 --package` 装进去；导入失败时该 provider 及其模型不会出现在 `/model` 里 [@ref-deep-agents-providers-arbitrary-doc][@ref-deep-agents-providers-class-path]。

**线协议兼容层**：只要服务端与 OpenAI 或 Anthropic 的线协议兼容，就能复用 `langchain-openai` / `langchain-anthropic`，把 `base_url` 指向对方端点即可；代价是厂商在原协议上追加的特性不会被捕获，有专门集成包时应优先用专门包 [@ref-deep-agents-providers-compatible-doc]。内置表里还有两个端点语义特殊的条目：`openai_codex` 用 ChatGPT 订阅登录而不是 API key，端点与 auth 都独立；`google_anthropic_vertex` 在 Vertex 上跑 Anthropic Messages API，用 Google Cloud ADC 认证 [@ref-deep-agents-providers-reference-doc]。

**Responses API 这一条要特别小心**：OpenAI provider 默认走 Responses API，而多数 OpenAI 兼容网关并未实现它；网关只支持 Chat Completions 时需要在 provider 参数里显式关掉，否则调用大概率失败 [@ref-deep-agents-providers-compatible-doc]：

```toml
[models.providers.openai.params]
use_responses_api = false
```

## 模型 ID、清单与刷新 {#providers-models}

模型标识统一写成 `provider:model`；不加前缀的裸名在 provider 可判定时也可用，CLI 会先推断 provider 再构造模型 [@ref-deep-agents-providers-default-model-doc]。`/model` 选择器的清单是动态拼出来的，一个模型会出现需要同时满足三点：provider 包已安装、该模型来自 provider 包 `data/_profiles.py` 的档案数据（或本地 provider、或 `config.toml` 的 `models` 列表）、且其 profile 未把文本输入/输出标为不支持 [@ref-deep-agents-providers-switcher-doc]。发现逻辑在代码里就写明了这条过滤：只保留 `tool_calling` 为真、且 `text_inputs`/`text_outputs` 不为 `False` 的模型，随后按名字排序 [@ref-deep-agents-providers-discovery]。

清单的组成与刷新规则：

- **随包发现**：从 `_BUILTIN_PROVIDERS` 推导出的 provider 档案合并而成；`enabled = false` 的 provider 在发现阶段就被跳过 [@ref-deep-agents-providers-discovery]。**Anthropic 兜底档案**：当读取的档案模块恰是 `langchain_anthropic.data._profiles` 时，加载结果会与内置的 `ANTHROPIC_MODEL_PROFILE_FALLBACKS` 合并，且**包自带档案优先**（`{**FALLBACKS, **profiles}`）；因此上游包尚未收录的新模型也能出现在清单里，而上游已有的字段不会被兜底值改写 [@ref-deep-agents-providers-anthropic-fallback-discovery]。本提交内置的兜底项只有 `claude-haiku-5-5` [@ref-deep-agents-providers-anthropic-fallbacks]。
- **配置追加**：`[models.providers.NAME].models` 里的名字追加到清单尾部（已发现的重名不重复）。这批名字**绕过**上面的 profile 过滤，因此新发布、尚未进包的模型，或 profile 缺 `tool_calling` 的模型，靠它就能出现在选择器里；对 `class_path` 且不在注册表里的 provider，若既没给 `models` 也没发现档案，还会尝试从该包自己的档案模块补齐 [@ref-deep-agents-providers-switcher-doc]。
- **本地点发现**：安装 `langchain-ollama` 且守护进程可达时，本地已拉取的模型会自动并入（可用 `DEEPAGENTS_CODE_OLLAMA_DISCOVERY=0` 关闭）[@ref-deep-agents-providers-config-doc]。
- **Codex 镜像**：`openai` 档案中属于 Codex 白名单的模型会以 `openai_codex:` 前缀再挂一份，以便在 ChatGPT 登录的认证上下文下选择 [@ref-deep-agents-providers-switcher-doc]。

**凭据状态不影响是否列出**：即使某 provider 缺密钥，模型仍可被选中，认证错误在请求时才由 provider 报出 [@ref-deep-agents-providers-switcher-doc]。清单在进程内缓存，安装/卸载 extra 或拉取新本地模型后需要重新发现（会话内 `/reload`，或重启）[@ref-deep-agents-providers-discovery]。

**启动时的默认模型解析顺序**：`--model` 标志 → `[models].default` → `[models].recent`（`/model` 切换时自动写入，永不覆盖 `default`）→ 环境自动检测，依次检查 `OPENAI_API_KEY`、`ANTHROPIC_API_KEY`、`GOOGLE_API_KEY`、`GOOGLE_CLOUD_PROJECT`（Gemini Enterprise Agent Platform）。这个回退只认这四个凭据，其他 provider 仍可经 `--model`、`/model` 或保存的默认值使用 [@ref-deep-agents-providers-default-model-doc]。不带前缀的裸名、未装包、profile 缺失都不会阻止直接按名字指定，provider 会在请求时校验模型名 [@ref-deep-agents-providers-switcher-doc]。

## 能力元数据、profile 与推理强度 {#providers-metadata}

模型能力由 **profile** 表达，键包括 `max_input_tokens`、`tool_calling`、`text_inputs`、`text_outputs`、`reasoning_output` 等；它先来自 provider 包 `data/_profiles.py` 的 `_PROFILES`，再与 `config.toml` 的 `[models.providers.NAME.profile]` 合并，模型名子表在冲突时胜过 provider 级键（浅合并），最后叠加 CLI 的 `--profile-override`，优先级是 模型默认 < config.toml profile < CLI `--profile-override`；`--profile-override` 的值在会话中 `/model` 热切换后会继续套用到新模型 [@ref-deep-agents-providers-profile-doc][@ref-deep-agents-providers-profiles-merge]。

**Anthropic 兜底 profile 层（模型创建时）。** 对 `provider = "anthropic"` 的模型，`create_model` 在读完 config.toml 的 profile 覆盖**之前**先施加一层内置兜底：若模型名命中 `ANTHROPIC_MODEL_PROFILE_FALLBACKS`，就把该表项与模型实例自带的 `profile` 合并后写回，标签为 `bundled fallback` [@ref-deep-agents-providers-anthropic-fallback-apply]。合并方向是 `{**fallback, **upstream}`，所以**模型自身已有的字段胜出**，兜底只填补上游缺失的键；它也不进入 `overridden_keys`，因此 UI 不会把它当作用户改写。由于它排在 config.toml 覆盖之前，用户在 `config.toml` 与 `--profile-override` 里写的值仍然最终胜出。本提交内置的兜底项为 `claude-haiku-5-5`，给出 `max_input_tokens = 1_000_000`、`max_output_tokens = 128_000`、文本/图像输入与文本输出、`reasoning_output`、`tool_calling`、`tool_choice`、`structured_output`、`temperature = false`，推理档位 `low/medium/high/xhigh/max`、默认 `medium`；其 docstring 注明取值来自 Anthropic 官方 Haiku 5.5 概览页 [@ref-deep-agents-providers-anthropic-fallbacks]。兜底键的匹配按**裸模型名**进行，因此 `anthropic:claude-haiku-5-5` 形式的 spec 会在解析出 provider 与模型名后命中。

profile 覆盖是在模型创建**之后**合并进 `model.profile` 的，所以上下文占用显示、自动摘要阈值、各项能力检查读到的都是覆盖后的值；`ModelProfileEntry.overridden_keys` 另外记录哪些键来自配置文件而非上游包，供 UI 区分"原生能力"与"被改写的能力" [@ref-deep-agents-providers-profiles-merge][@ref-deep-agents-providers-profile-doc]。降低 `max_input_tokens` 是最常见的用法——它会让自动摘要在更早的位置触发：

```toml
[models.providers.anthropic.profile]
max_input_tokens = 4096

[models.providers.anthropic.profile."claude-sonnet-4-5"]
max_input_tokens = 8192
```

对任意（`class_path`）provider，profile 的声明从"可选优化"变成"必须交代"：`tool_calling = true` 不写，模型会被当成不支持工具调用；`max_input_tokens` 不写则状态栏无法显示上下文占用，自动摘要退回约 170,000 token 的固定触发点，小窗口模型可能在触顶前等不到摘要 [@ref-deep-agents-providers-arbitrary-doc]。

**推理强度**同样由 profile 承载：`reasoning_output` 为真才认为该模型可配置推理，`reasoning_effort_levels` 给出可选档位，`reasoning_effort_default` 给出默认档；标准构造参数 `reasoning_effort` 由各 provider 集成翻译成各自的原生请求形态，因此同一个档位名（如 `low`/`medium`/`high`）在不同后端落到不同字段 [@ref-deep-agents-providers-reasoning-effort]。

## 请求装配、重试与四级诊断 {#providers-request}

**参数分层与转发。** 先分清哪些键根本不上请求：`display_name`、`short_name`、`api_key_url` 只影响 `/auth` 与选择器的展示，`enabled` 只影响 `/model` 里是否可见，它们不会被交给模型构造函数 [@ref-deep-agents-providers-config-doc]。构造模型的 kwargs 按固定顺序叠加：`config.toml` 的 provider/按模型 `params` → 解析出的 `base_url` → 凭据（`api_key`）→ provider profile 注入（如 OpenRouter 的归属参数）→ `--model-params` / `/model --model-params`（会话级最高优先级）。`ModelConfig.get_effective_kwargs()` 明确固定了"params → base_url → 运行时覆盖"这个次序，需要判断"真实请求会带什么"的调用方都应走它，而不是单独看某一处配置 [@ref-deep-agents-providers-provider-kwargs]。`params` 是原样转发给构造函数的，读取顺序是 flat 键作 provider 级默认、模型名子表浅合并覆盖；底层 chat-model 类不认识的 kwarg 会继续透传到上游 API 请求，所以新发布的参数不必等 CLI 更新 [@ref-deep-agents-providers-model-params-doc]。

只有进入模型构造与请求的参数才真正生效：`params` 里的 `api_key` 不会生效（早期凭据检查先于 `params` 读取，应改用 `api_key_env`）[@ref-deep-agents-providers-config-doc]；解析出的 `base_url` 是以构造参数 `base_url` 交给模型类的，若某个类把该字段命名成别的名字，Pydantic 默认 `extra="ignore"` 会静默丢弃它，此时端点只能用 `params` 里的字段名表达 [@ref-deep-agents-providers-endpoints-doc]。OpenAI 风格推理强度可直接写进参数，例如 `--model-params '{"reasoning": {"effort": "high"}}'`；Anthropic 的扩展思考用 `thinking` 映射 [@ref-deep-agents-providers-model-params-doc]。

**重试。** 重试预算由模型节点中间件掌管，默认在首次请求之后重试 5 次；优先级为 `--max-retries` > `[retries.NAME].max_retries` > `[retries].max_retries` > 内置默认 5，取值 `0` 表示关闭。为免嵌套重试把尝试次数相乘，CLI 会在构造时强制关掉 provider SDK 自带的重试循环；对 CLI 不认识的 provider，需在 `[retries.NAME].param` 里指出它自己的重试参数名 [@ref-deep-agents-providers-retries-doc]：

```toml
[retries]
max_retries = 2

[retries.my_custom]
param = "retries"
max_retries = 4
```

**后端约定（流式、工具调用与重试边界）。** 宿主要求后端是 LangChain `BaseChatModel`、并且支持 tool calling；自定义类若支持但 CLI 不知道，必须在 profile 里声明 `tool_calling = true` [@ref-deep-agents-providers-arbitrary-doc]。文档层同样把"支持 tool calling 的 chat model"作为所有 provider 的共同前提 [@ref-deep-agents-providers-reference-doc]。重试只包住**模型节点**而不是整个回合，因此瞬时连接失败被重试时已完成的工具调用不会重跑；重试预算随构造好的模型一起携带，`/model` 热切换后新模型带自己的预算进入请求，中间件自己拥有"哪些错误算瞬时、退避曲线、重试期间给用户看的状态"这套策略 [@ref-deep-agents-providers-retry-middleware]。流式输出已开始后才发生的重试，通过 `model_attempt` 生命期事件按 `call_id` 关联，客户端据此回收被取代尝试已产出的内容；线协议级的流式载荷形态（如各后端的增量事件格式）在本轮固定来源中没有建立，属于未覆盖部分 [@ref-deep-agents-providers-retry-middleware]。

**四级诊断**，从"读得到"到"真能用"依次为：

1. **配置可读**：`dcode config` / `dcode config get KEY` / `dcode config path` 打印每个设置的有效值与来源，凭据与其它秘密只显示 configured / not configured [@ref-deep-agents-providers-inspect-doc]。
2. **模型可选**：选择器清单只取决于包安装与 profile，与凭据无关；`dcode auth status NAME` 给出该 provider 的解析来源（stored / env: VAR / missing），与 `/auth` 界面上的徽标一致 [@ref-deep-agents-providers-switcher-doc]。
3. **请求已发送**：模型创建前会做凭据预检，把状态区分成 `CONFIGURED`（有明确凭据来源）、`MISSING`（要求凭据但缺失，直接阻断创建/切换）、`NOT_REQUIRED`（本地无需密钥）、`IMPLICIT`（走环境外认证）、`MANAGED`（`class_path` 自定义类自管认证）、`UNKNOWN`（无法判定，交给 provider SDK）[@ref-deep-agents-providers-auth-states]。
4. **后端实际可用**：前三步都不构成后端会用这次请求的证明——`IMPLICIT`、`MANAGED`、`UNKNOWN` 都只是把判断推迟，网关/隐式凭据也可能在真正调用时才被拒；只有实际请求的错误码才说明后端是否接受这对端点、密钥与模型 [@ref-deep-agents-providers-auth-states][@ref-deep-agents-providers-switcher-doc]。
