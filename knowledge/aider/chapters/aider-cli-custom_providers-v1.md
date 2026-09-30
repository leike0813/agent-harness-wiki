---
schema_version: 3
record_kind: production
edition_id: aider-cli-custom_providers-v1
harness_id: aider
topic: custom_providers
title: "Aider CLI 的 Provider 接入：模型前缀、凭据、元数据与设置"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-aider-llms-other, ref-aider-llms-openai-compat, ref-aider-llms-ollama, ref-aider-config-aliases, ref-aider-config-aliases-priority, ref-aider-config-aliases-builtin, ref-aider-models-aliases, ref-aider-main-env-writes, ref-aider-config-sample-yaml]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-aider-config-apikeys, ref-aider-config-dotenv, ref-aider-main-env-writes, ref-aider-config-apikeys-other, ref-aider-models-sanity]
  - section_id: providers-model-metadata
    surface_ids: [cli]
    source_refs: [ref-aider-config-metadata, ref-aider-main-metadata, ref-aider-models-sanity, ref-aider-models-fuzzy]
  - section_id: providers-model-settings
    surface_ids: [cli]
    source_refs: [ref-aider-config-settings-locations, ref-aider-config-model-settings, ref-aider-models-settings-fields, ref-aider-models-register, ref-aider-config-extra-params, ref-aider-models-configure]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-aider-config-extra-params, ref-aider-llms-ollama, ref-aider-config-reasoning, ref-aider-config-accepts, ref-aider-config-reasoning-tag, ref-aider-config-reasoning-limits, ref-aider-base-stream, ref-aider-config-sample-yaml]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-aider-main-model-settings, ref-aider-main-metadata, ref-aider-main-verbose-dotenv, ref-aider-models-fuzzy, ref-aider-main-verbose-model, ref-aider-cmd-settings, ref-aider-models-sanity, ref-aider-llms-warnings, ref-aider-usage-commands]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-aider-llms-other, ref-aider-llms-openai-compat, ref-aider-llms-ollama, ref-aider-config-aliases-priority, ref-aider-models-aliases, ref-aider-main-env-writes]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-aider-config-apikeys, ref-aider-config-apikeys-other, ref-aider-config-dotenv, ref-aider-models-sanity]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: partial
        source_refs: [ref-aider-llms-other, ref-aider-llms-openai-compat, ref-aider-config-aliases]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-aider-llms-other, ref-aider-config-aliases, ref-aider-config-aliases-builtin, ref-aider-models-aliases]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-model-metadata
        status: answered
        source_refs: [ref-aider-config-metadata, ref-aider-main-metadata, ref-aider-models-sanity]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-aider-config-extra-params, ref-aider-config-reasoning, ref-aider-config-accepts, ref-aider-config-reasoning-limits, ref-aider-base-stream, ref-aider-config-sample-yaml]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-aider-config-extra-params, ref-aider-config-reasoning-tag, ref-aider-base-stream]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-aider-main-verbose-model, ref-aider-cmd-settings, ref-aider-models-fuzzy, ref-aider-models-sanity, ref-aider-main-model-settings]
---


## 固定来源与 provider 的接入方式 {#providers-entry}

固定来源是官方仓库提交 `5dc9490bb35f9729ef2c95d00a19ccd30c26339c` 的文档与实现。Aider 自己不实现各家协议，而是把连接层交给 litellm：`aider --model {model-name}` 可以选用 litellm 支持的数百个模型，用 `aider --list-models {关键词}` 探索可用名字。[@ref-aider-llms-other]

provider 由**模型名前缀**决定，这就是"自定义 provider"的入口：

- **OpenAI 兼容端点**：把模型名前缀写成 `openai/`，并设置 `OPENAI_API_BASE` 与 `OPENAI_API_KEY`（文档同时给出 shell 与 `setx` 两种写法）。[@ref-aider-llms-openai-compat]
- **本地 Ollama**：设 `OLLAMA_API_BASE`（默认 `http://127.0.0.1:11434`），用 `ollama_chat/{model}`（文档推荐 `ollama_chat/` 而不是 `ollama/`）；需要鉴权时设 `OLLAMA_API_KEY`。[@ref-aider-llms-ollama]
- **其它 provider**：直接用 litellm 的 provider 前缀与模型名，密钥用对应环境变量。[@ref-aider-llms-other]

别名是给长模型名起短名的方式：命令行 `--alias "fast:gpt-4o-mini"`（可重复），或配置文件里的 `alias:` 列表；解析优先级为命令行 > 配置文件 > 内置别名。内置别名由 `aider/models.py` 的 `MODEL_ALIASES` 提供（例如 `sonnet`、`4o`、`deepseek`、`r1`）。[@ref-aider-config-aliases][@ref-aider-config-aliases-priority][@ref-aider-config-aliases-builtin][@ref-aider-models-aliases]

两个通用注入开关 [@ref-aider-main-env-writes]：

- `--set-env VARNAME=value`（与配置文件 `set-env:` 同义）把变量写进当前进程环境，用来控制 provider 侧设置。
- `--api-key provider={key}` 等价于设置 `{PROVIDER}_API_KEY={key}`，provider 名会被转成大写。

所有与 provider 有关的配置键都出现在自动生成的样例配置里（`openai-api-base`、`api-key`、`set-env`、`alias`、`model-settings-file`、`model-metadata-file` 等）。[@ref-aider-config-sample-yaml]

`--openai-api-base` 在启动时被写回环境变量 `OPENAI_API_BASE`，`--openai-api-type`、`--openai-api-version`、`--openai-api-deployment-id`、`--openai-organization-id` 已弃用并提示改用 `--set-env`。[@ref-aider-main-env-writes]

## 凭据与 base URL {#providers-auth}

凭据有四种来源，作用域按文件位置区分 [@ref-aider-config-apikeys][@ref-aider-config-dotenv]：

| 来源 | 写法 | 适用范围 |
| :-- | :-- | :-- |
| 命令行 | `--openai-api-key`、`--anthropic-api-key` | 仅 OpenAI 与 Anthropic 有专用开关 |
| `.aider.conf.yml` | `openai-api-key:`、`anthropic-api-key:`、`api-key:` 列表 | YAML 里只支持 OpenAI 与 Anthropic 的专用键；其它 provider 用 `api-key` 列表 |
| 环境变量 / `.env` | `OPENAI_API_KEY`、`ANTHROPIC_API_KEY`、`GEMINI_API_KEY`… | 所有 provider |
| `--api-key provider={key}` | 设置 `{PROVIDER}_API_KEY` | 所有 provider [@ref-aider-main-env-writes] |

`.env` 的搜索顺序是：用户主目录、git 仓库根、当前目录，以及 `--env-file` 指定文件；都在则按该顺序加载，后加载者优先。[@ref-aider-config-dotenv] 非 OpenAI/Anthropic 的 provider 只在 `.env` 或环境变量里放 `{PROVIDER}_API_KEY`，配置文件里则写成 `api-key:` 列表。[@ref-aider-config-apikeys-other]

示例（键名取自 api-keys 页，值一律用占位符）[@ref-aider-config-apikeys-other]：

```yaml
api-key:
  - gemini={your-gemini-key}
  - openrouter={your-openrouter-key}
```

凭据缺失时 Aider 在启动阶段给出可读诊断：逐个列出模型期望的环境变量并标注 Set / Not set（Windows 下另提示重启终端生效）；如果连"需要哪些变量"都不知道，则警告 unknown which environment variables are required。[@ref-aider-models-sanity]

## 模型元数据：上下文窗口与成本 {#providers-model-metadata}

对 Aider 不认识的模型，可以注册上下文窗口与价格。文件名为 `.aider.model.metadata.json`，搜索位置为：用户主目录、git 仓库根、当前启动目录，或用 `--model-metadata-file {file}` 指定；都存在时按该顺序加载，后加载者优先。[@ref-aider-config-metadata]

字段与最小示例（来自官方文档，模型名必须写成带 `provider/` 前缀的全名，且与 `litellm_provider` 一致）[@ref-aider-config-metadata]：

```json
{
  "deepseek/deepseek-chat": {
    "max_tokens": 4096,
    "max_input_tokens": 32000,
    "max_output_tokens": 4096,
    "input_cost_per_token": 0.00000014,
    "output_cost_per_token": 0.00000028,
    "litellm_provider": "deepseek",
    "mode": "chat"
  }
}
```

实现上，包内的 `aider/resources/model-metadata.json` 永远排在最前，其后才是用户搜索路径；加载结果写入本地元数据表，`--verbose` 时会打印实际加载了哪些文件。[@ref-aider-main-metadata]

不知道元数据并不致命：文档明确 Aider 从不强制 token 上限，只是转述 provider 的报错；缺少元数据时会警告 "Unknown context window size and costs, using sane defaults"，并用模糊匹配建议相近模型名。[@ref-aider-config-metadata][@ref-aider-models-sanity][@ref-aider-models-fuzzy]

## 模型设置文件与合并规则 {#providers-model-settings}

`.aider.model.settings.yml`（或 `--model-settings-file {file}`）用来覆盖或补充每个模型的行为。搜索位置与元数据文件相同：主目录、git 仓库根、当前目录，或显式指定；后加载者优先。文件内容是"字典对象的列表"，文档示例 [@ref-aider-config-settings-locations][@ref-aider-config-model-settings]：

```yaml
- name: some-provider/my-special-model
  extra_params:
    extra_headers:
      Custom-Header: value
    max_tokens: 8192
```

每个条目的字段就是 `ModelSettings` 数据类的字段，默认值可用于初始化未声明的选项：`edit_format`、`weak_model_name`、`use_repo_map`、`send_undo_reply`、`lazy`、`overeager`、`reminder`、`examples_as_sys_msg`、`extra_params`、`cache_control`、`caches_by_default`、`use_system_prompt`、`use_temperature`、`streaming`、`editor_model_name`、`editor_edit_format`、`reasoning_tag`、`remove_reasoning`、`system_prompt_prefix`、`accepts_settings`。[@ref-aider-models-settings-fields]

合并语义由 `register_models()` 决定：读入的每个条目会**先删掉同名旧条目再追加**，因此后加载的文件整体替换同名模型设置，而不是逐字段合并。[@ref-aider-models-register]

有一个特殊名字 `aider/extra_params`：它的 `extra_params` 会应用到所有模型，并与模型自身的 `extra_params` 做深合并；直接冲突时 `aider/extra_params` 优先。[@ref-aider-config-extra-params][@ref-aider-models-configure]

## 参数如何进入请求 {#providers-forwarding}

- `extra_params` 是任意透传字典，会被交给 `litellm.completion()`；文档示例用 `extra_headers`（额外 HTTP 头）和 `max_tokens`。Ollama 页另给出用 `extra_params.num_ctx` 固定上下文窗口的例子。[@ref-aider-config-extra-params][@ref-aider-llms-ollama]
- 推理参数：`--reasoning-effort`（OpenAI 风格模型的 low/medium/high）与 `--thinking-tokens`（支持 thinking 预算的模型，`0` 表示关闭；会话内用 `/reasoning-effort`、`/thinking-tokens`）。是否真正下发由模型的 `accepts_settings` 决定：不在列表里的设置会被忽略并给出 "does not support ..., ignoring" 警告，`--no-check-model-accepts-settings` 可强制执行。[@ref-aider-config-reasoning][@ref-aider-config-accepts]
- 推理输出可用 `reasoning_tag` 声明（例如 Fireworks 上的 DeepSeek R1 用 `think`）：标签内的思考内容会展示但不进入编辑指令与聊天历史。[@ref-aider-config-reasoning-tag]
- 温度、流式与系统提示由模型设置里的 `use_temperature`、`streaming`、`use_system_prompt` 控制；某些推理模型要求把它们设为 `false`，文档把这三项列为常见限制。[@ref-aider-config-reasoning-limits]
- 命令行的 `--stream`/`--no-stream` 与模型设置共同决定是否流式：coder 里用的是二者的与运算。[@ref-aider-base-stream]
- 连接参数：`--timeout`（API 调用超时，默认未设置）与 `--verify-ssl`/`--no-verify-ssl`（默认校验证书）。[@ref-aider-config-sample-yaml]

**缺口**：固定来源没有描述 Aider 自身的重试次数、退避策略、流中断恢复与错误分类处理；这些属于 litellm 与 `aider/llm.py`、`aider/coders/base_coder.py` 的实现细节，本章未取得对应引用，因此"错误与重试"保持未验证。

## 诊断：配置可读、模型可选、参数已下发 {#providers-diagnostics}

- **配置可读**：`--verbose` 打印 "Loaded model settings from:" 与 "Searched for model settings files:"、"Loaded model metadata from:"，以及 `.env` 加载结果。[@ref-aider-main-model-settings][@ref-aider-main-metadata][@ref-aider-main-verbose-dotenv]
- **模型可选**：`--list-models {关键词}`（别名 `--models`）与 `/models {关键词}` 用同一套模糊匹配搜索已知模型；匹配基于 litellm 的模型表加上本地元数据表，先按子串匹配、再按近似拼写建议。[@ref-aider-models-fuzzy]
- **实际生效的设置**：`--verbose` 在启动时先打印 "Model metadata" 段落 的完整 JSON，再逐字段打印全部 `ModelSettings` 值。[@ref-aider-main-verbose-model] 会话内 `/settings` 打印当前设置，并附主模型、editor、weak 三个模型的元数据字段。[@ref-aider-cmd-settings]
- **警告等级**：缺少密钥、未知所需环境变量、未知上下文窗口与成本各有专属警告；`--no-show-model-warnings` 可关闭这套检查。[@ref-aider-models-sanity][@ref-aider-llms-warnings]
- `/settings`、`/models`、`/model` 都是聊天内命令，`/help` 走 help 模式回答配置问题。[@ref-aider-usage-commands]
