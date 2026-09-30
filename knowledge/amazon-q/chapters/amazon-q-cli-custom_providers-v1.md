---
schema_version: 3
record_kind: production
edition_id: amazon-q-cli-custom_providers-v1
harness_id: amazon-q
topic: custom_providers
title: "Amazon Q CLI 的模型与服务端点：选择、认证、协议、模型元数据与诊断"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-intro, ref-amazon-q-docs-command-line-kiro, ref-amazon-q-repo-readme-status]
  - section_id: providers-entry-auth
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-settings-keys, ref-amazon-q-repo-settings-parse, ref-amazon-q-repo-endpoints, ref-amazon-q-repo-root-subcommands]
  - section_id: providers-models-metadata
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-format-model, ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-settings-keys, ref-amazon-q-repo-model-info, ref-amazon-q-repo-model-context]
  - section_id: providers-protocol-responses
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-endpoints, ref-amazon-q-repo-model-info, ref-amazon-q-repo-settings-keys]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands, ref-amazon-q-repo-settings-cli, ref-amazon-q-repo-cli-verbose, ref-amazon-q-repo-model-info, ref-amazon-q-repo-model-context, ref-amazon-q-repo-settings-keys, ref-amazon-q-repo-settings-parse]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry-auth
        status: partial
        source_refs: [ref-amazon-q-repo-settings-keys, ref-amazon-q-repo-settings-parse, ref-amazon-q-repo-endpoints, ref-amazon-q-repo-root-subcommands]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-entry-auth
        status: partial
        source_refs: [ref-amazon-q-repo-endpoints, ref-amazon-q-repo-root-subcommands]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-responses
        status: partial
        source_refs: [ref-amazon-q-repo-endpoints, ref-amazon-q-repo-model-info]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models-metadata
        status: partial
        source_refs: [ref-amazon-q-repo-format-model, ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-settings-keys, ref-amazon-q-repo-model-info]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models-metadata
        status: partial
        source_refs: [ref-amazon-q-repo-model-info, ref-amazon-q-repo-model-context]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-responses
        status: unknown
        source_refs: [ref-amazon-q-repo-settings-keys]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-responses
        status: partial
        source_refs: [ref-amazon-q-repo-endpoints, ref-amazon-q-repo-settings-keys]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands, ref-amazon-q-repo-settings-cli, ref-amazon-q-repo-model-info, ref-amazon-q-repo-model-context]
---

## 固定来源与适用范围 {#providers-scope}

本章的固定来源是官方仓库 `aws/amazon-q-developer-cli`（提交 `15cc8f3cd18c4272925ce1c7053268eedff1ea0a`）的登记文档与源码，以及 AWS 官方用户指南的 CLI 页面 [@ref-amazon-q-repo-intro][@ref-amazon-q-docs-command-line-kiro]。

先明确一个边界：Amazon Q CLI 没有"Provider"这一层用户配置。它不是可对接任意兼容 API 的客户端，而是连接 AWS 的 Amazon Q / CodeWhisperer 后端服务；因此下面记录的是"模型选择"和"后端服务端点"两类可配置项，而不是通用 provider 注册表。官方仓库 README 说明项目已不再积极维护、Q Developer CLI 以闭源 Kiro CLI 继续提供 [@ref-amazon-q-repo-readme-status]；仓库 `docs/` 自述描述开发构建 [@ref-amazon-q-repo-intro]。全章为来源级知识，只覆盖 `cli` 界面。

## 入口、认证与后端端点 {#providers-entry-auth}

**providers.entry**：没有 provider 定义文件或 provider 列表。可写入配置的两处是——agent 配置的 `model` 字段（见下一节），以及设置系统里的服务端点键。源码中设置键名是 `api.codewhisperer.service` 与 `api.q.service`，两者都作为设置对象存储 [@ref-amazon-q-repo-settings-keys][@ref-amazon-q-repo-settings-parse]。端点解析逻辑读取 `api.codewhisperer.service` 对象里的 `endpoint` 与 `region` 两个键；若没有该对象而存在认证 profile，则从 profile ARN 的第 4 段取区域，并在两个内置端点中匹配 [@ref-amazon-q-repo-endpoints]。这两个键在 AWS 用户指南的 CLI 页面里没有出现，属于源码级依据，按 partial 记录。

**providers.auth**：认证走 CLI 自身的登录体系，顶层子命令包括 `q login`、`q logout`、`q whoami` 与 `q profile`（后者打印当前 idc 用户关联的 profile），其中 `q chat` 与 `q profile` 要求已登录，未登录时提示执行 `q login` [@ref-amazon-q-repo-root-subcommands]。端点解析在存在认证 profile 时依赖该 profile 的 ARN 取区域；检测到自定义端点时则跳过 profile ARN 这一步 [@ref-amazon-q-repo-endpoints]。缺口：注册来源没有给出 API key 或静态 token 这类凭据的配置方式，也没有描述凭据刷新规则，按 partial 记录。凭据不要写进 agent 配置或示例。

## 模型选择与能力元数据 {#providers-models-metadata}

**providers.models**：模型在 agent 配置里用 `model` 字段指定，值是模型 ID，必须匹配 Q CLI 模型服务返回的可用模型之一；未指定则用默认模型，指定的模型不可用时会回退默认并显示警告 [@ref-amazon-q-repo-format-model]。会话内用 `/model` 命令查看并选择当前会话的模型 [@ref-amazon-q-repo-slash-commands]。全局默认模型由设置键 `chat.defaultModel` 保存 [@ref-amazon-q-repo-settings-keys]。缺口：模型别名机制没有依据，模型列表的缓存与刷新规则也没有在登记文档中说明；列表来自服务端调用 [@ref-amazon-q-repo-model-info]。按 partial 记录。

**providers.metadata**：模型元数据由服务返回的模型对象承载，CLI 侧结构包含 `model_id`（真正发给 API 的 ID）、`model_name`、`description` 与 `context_window_tokens`（上下文窗口，单位 token） [@ref-amazon-q-repo-model-info]。上下文窗口优先取服务返回的 `token_limits.max_input_tokens`，取不到时用默认值 200000 [@ref-amazon-q-repo-model-info][@ref-amazon-q-repo-model-context]。缺口：工具调用、视觉、推理强度这类能力元数据没有在登记来源中出现，按 partial 记录。

## 协议、参数转发与响应处理 {#providers-protocol-responses}

**providers.protocol**：请求打向 AWS 服务端点，内置两个默认值——`https://q.us-east-1.amazonaws.com`（区域 us-east-1）与 `https://q.eu-central-1.amazonaws.com/`（区域 eu-central-1） [@ref-amazon-q-repo-endpoints]。协议层由仓库内的 AWS SDK 客户端承担（`amzn-codewhisperer-client`、`amzn-qdeveloper-streaming-client` 等 crate），"真正发给 API 的是 `model_id`" 说明模型以字符串 ID 传到后端 [@ref-amazon-q-repo-model-info]。缺口：登记来源没有说明请求体的协议形态、兼容层或插件接入方式；自定义端点的语义只从这一处解析逻辑得出，按 partial 记录。

**providers.forwarding**：登记来源中没有"用户可写参数如何映射到请求"的说明。检查过的直接入口是设置键清单：与请求相关的只有 `api.timeout`（以及端点键 `api.codewhisperer.service`、`api.q.service`），没有温度、最大输出等模型参数键，agent 配置字段里也没有请求参数段 [@ref-amazon-q-repo-settings-keys]。因此本项按 `unknown` 记录：无法从固定来源确定是否存在参数转发，也无法确定其映射规则。

**providers.responses**：可依据的只有端点与超时——请求发往上述服务端点 [@ref-amazon-q-repo-endpoints]，`api.timeout` 是存在的设置键 [@ref-amazon-q-repo-settings-keys]。缺口：流式响应、工具调用回合、错误重试策略都没有在登记文档中说明，按 partial 记录。

## 诊断入口 {#providers-diagnostics}

可用入口：`/model` 查看与选择模型 [@ref-amazon-q-repo-slash-commands]；`/usage` 显示当前会话的上下文窗口用量 [@ref-amazon-q-repo-slash-commands]；`q diagnostic`（别名 `diagnostics`）运行诊断测试 [@ref-amazon-q-repo-root-subcommands]；`q settings` 直接读写单个键，`q settings open` 打开设置文件、`q settings list --all` 列出全部设置 [@ref-amazon-q-repo-settings-cli]；`q -v` 到 `q -vvv` 提高日志级别 [@ref-amazon-q-repo-cli-verbose]；模型不可用时 CLI 会提示用 `/model` 换一个模型 [@ref-amazon-q-repo-model-info]。

设置键的完整清单可从设置的键名解析表读到 [@ref-amazon-q-repo-settings-keys][@ref-amazon-q-repo-settings-parse]。

**providers.diagnostics** 按 partial 记录：可以区分"设置可读"（`q settings`）与"模型可选"（`/model`），但登记来源没有给出确认"请求已发送"或"后端实际可用"的专门入口，模型元数据也只说明上下文窗口一项 [@ref-amazon-q-repo-model-context]。
