---
schema_version: 3
record_kind: production
edition_id: qoder-qoder-custom_providers-v1
harness_id: qoder
topic: custom_providers
title: "Qoder IDE 的模型 Provider 与自定义模型"
sections:
  - section_id: providers-overview
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-models-tiers, ref-qoder-ide-custom-models-add]
  - section_id: providers-entry
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-custom-models-providers, ref-qoder-ide-custom-models-add, ref-qoder-ide-custom-models-manage]
  - section_id: providers-auth
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-custom-models-add, ref-qoder-ide-custom-models-keys]
  - section_id: providers-models
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-models-specific, ref-qoder-ide-custom-models-add, ref-qoder-ide-models-switch]
  - section_id: providers-parameters
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-models-params, ref-qoder-ide-models-context, ref-qoder-ide-models-thinking, ref-qoder-ide-models-supported]
  - section_id: providers-diagnostics
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-custom-models-add, ref-qoder-ide-custom-models-manage, ref-qoder-ide-custom-models-fail]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [qoder]
        section_id: providers-entry
        status: answered
        source_refs: [ref-qoder-ide-custom-models-add, ref-qoder-ide-custom-models-manage, ref-qoder-ide-custom-models-providers]
  - question_id: providers.auth
    answers:
      - surface_ids: [qoder]
        section_id: providers-auth
        status: answered
        source_refs: [ref-qoder-ide-custom-models-add, ref-qoder-ide-custom-models-keys]
  - question_id: providers.protocol
    answers:
      - surface_ids: [qoder]
        section_id: providers-overview
        status: unknown
        source_refs: [ref-qoder-ide-custom-models-add]
  - question_id: providers.models
    answers:
      - surface_ids: [qoder]
        section_id: providers-models
        status: answered
        source_refs: [ref-qoder-ide-models-specific, ref-qoder-ide-custom-models-add]
  - question_id: providers.metadata
    answers:
      - surface_ids: [qoder]
        section_id: providers-parameters
        status: answered
        source_refs: [ref-qoder-ide-models-params, ref-qoder-ide-models-context, ref-qoder-ide-models-thinking, ref-qoder-ide-models-supported]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [qoder]
        section_id: providers-parameters
        status: partial
        source_refs: [ref-qoder-ide-models-params]
  - question_id: providers.responses
    answers:
      - surface_ids: [qoder]
        section_id: providers-diagnostics
        status: unknown
        source_refs: [ref-qoder-ide-custom-models-fail]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [qoder]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-qoder-ide-custom-models-add, ref-qoder-ide-custom-models-manage, ref-qoder-ide-custom-models-fail]
---

## 固定来源与模型接入边界 {#providers-overview}

本章按 Qoder IDE（catalog 的 `qoder` 界面）采写，固定来源为官方文档站的 IDE 页面快照：Model Selector（模型选择器与参数）与 Custom Models（自带密钥接入第三方 provider）。Qoder 是闭源产品，没有官方源码仓库可固定 commit；本章为来源级知识，不绑定具体发行版本。所有来源都取自 `docs.qoder.com`（`qoder.com` 指向的官方文档站）；`docs.qoder.cn` 是另一条国内产品线（通义灵码 / Lingma）的文档，本章不引用。

Qoder IDE 的模型接入分两层：**内置模型**（官方提供的 SOTA 模型池，用 Tier Selection 或 Specific Model 选择）与**自定义模型**（用户用自己的 API key 接入第三方 provider）。官方明确：除内置模型外，可以通过 API key 连接自己的模型。[@ref-qoder-ide-models-tiers][@ref-qoder-ide-custom-models-add]

Tier Selection 提供四个"模型池"：Auto（智能路由，约 0.5× Credit）、Ultimate（约 2.0×）、Performance（约 1.1×）、Efficient（标称 0.3×，限时活动对付费用户 0.0×）。Specific Model 则直接挑某个 provider 的具体模型。[@ref-qoder-ide-models-tiers]

**协议缺口（`providers.protocol`）**：固定来源没有记录自定义 provider 的请求协议、端点形态或兼容层——官方只说明"通过 API key 访问第三方 provider 的模型资源"、provider 与模型由界面下拉选择、连接由系统自动校验。以下入口已检查但均未给出协议细节：Custom Models 页的"Adding Custom Models"与 FAQ、Model Selector 页的"Specific Model"。因此协议一项按未建立处理，不编造端点或语法。[@ref-qoder-ide-custom-models-add]

## 定义入口与可用 Provider {#providers-entry}

适用范围与 provider 清单由官方给出：**Individual 计划**用户可用；支持 Alibaba Cloud Model Studio、DeepSeek、Z.ai、Kimi、MiniMax、Xiaomi MIMO。官方同时提示 Repo Wiki 使用固定模型并单独计费，生成时会提示额外的 Credit 消耗。[@ref-qoder-ide-custom-models-providers]

添加步骤（原文顺序）：[@ref-qoder-ide-custom-models-add]

1. 打开 **Qoder IDE Settings**；
2. 左侧导航选择 **Models**；
3. 点 **+ Add**，选择 provider 与需要的模型，填入 API key（界面提供 **Get API Key** 跳到该 provider 的密钥管理页）；
4. 点 **Add**，系统自动校验连接状态；
5. 配置完成后在聊天界面选择该模型即可使用。

已有自定义模型的管理操作：**Edit**（改模型别名）、**Delete**（删除后不可用）、**Enable/Disable**（控制是否出现在选择列表）。[@ref-qoder-ide-custom-models-manage]

**缺口**：固定来源没有给出 provider 定义的文件级入口（没有 `settings.json` 键名、没有 base URL 字段、没有 profile 概念），也没有说明自定义 provider 在多设备或多项目之间的同步方式；IDE 侧唯一被记录的入口是上述设置面板。[@ref-qoder-ide-custom-models-manage]

## 凭据与环境变量 {#providers-auth}

凭据只有一种被记录的形态：**API key**，在 Models 面板的 + Add 流程中录入，由系统自动校验连接。[@ref-qoder-ide-custom-models-add]

官方 FAQ 给出了各 provider 的 key 获取地址，可作为读者取得凭据的入口：[@ref-qoder-ide-custom-models-keys]

- DeepSeek：`platform.deepseek.com`
- GLM：`open.bigmodel.cn`
- Kimi：`platform.moonshot.cn`
- MiniMax：`platform.minimaxi.com`
- Xiaomi MIMO：`platform.xiaomimimo.com`
- Alibaba Cloud Model Studio：`bailian.console.aliyun.com`

计费边界：自定义模型的费用直接计到 provider 的 API 账户，**不消耗 Qoder Credits**；例外是 Repo Wiki 使用固定模型、消耗 Qoder Credits 并会提示。[@ref-qoder-ide-custom-models-add]

**缺口**：固定来源没有记录环境变量形式的凭据注入、凭据刷新或轮换，也没有记录 base URL 的环境变量覆盖；同一 provider 是否允许多个 key 属于 FAQ 范围（官方答"可以，能添加同一 provider 的不同模型版本或用不同 API key"），但 key 的存储位置未被记录。[@ref-qoder-ide-custom-models-keys]

## 模型列表与参数 {#providers-models}

Specific Model 页给出了当前可直接选择的具体模型清单（节选原文）：Qwen3.8-Max、Qwen3.8-Flash、Qwen3.7-Max、Qwen3.7-Plus、DeepSeek-V4-Pro、DeepSeek-Flash、GLM-5.3、GLM-5.3-Flash、Kimi-K3、Kimi-K2.8-Preview、MiniMax-M3，并各自标注 Credit 倍率。官方说明"目前只有一部分模型可以直接选择"，且模型列表会持续更新、下线或替换旧模型。[@ref-qoder-ide-models-specific]

自定义模型添加后出现在聊天的模型选择器里；官方说明切换会立即生效，并作用于当前会话的后续对话。[@ref-qoder-ide-custom-models-add][@ref-qoder-ide-models-switch]

## 能力元数据与参数传递 {#providers-parameters}

部分模型支持在模型选择器中悬停模型名、点 **Edit** 配置参数；官方列出两项：[@ref-qoder-ide-models-params]

- **Context**：可选 200K（默认档，够多数任务）、400K（更大代码库或长对话）、1M（超大规模项目）。[@ref-qoder-ide-models-context]
- **Thinking Effort**：`low` / `medium` / `high` / `xhigh` / `max`，档位随模型而异；界面会在选中模型后显示支持的档位。[@ref-qoder-ide-models-thinking]

支持的模型：Ultimate、Performance、DeepSeek-V4-Pro、DeepSeek-Flash、Qwen3.8-Max、Qwen3.8-Flash、Qwen3.7-Max、Qwen3.7-Plus、GLM-5.3、GLM-5.3-Flash、MiniMax-M3、Kimi-K3、Kimi-K2.8-Preview。其中 Qwen3.7-Max、Qwen3.7-Plus、MiniMax-M3 只支持 Context，其余同时支持 Context 与 Thinking Effort。[@ref-qoder-ide-models-supported]

官方还提示这些参数会改变实际 Credit 费率（例如改上下文窗口、思考强度或速度会改变倍率）。[@ref-qoder-ide-models-params]

**缺口（`providers.forwarding`）**：固定来源只描述了"界面上的参数如何改变费率与结果"，没有说明这些参数在请求体里映射成什么字段、哪些只影响界面或路由、哪些被客户端改写；自定义 provider 的参数透传规则也没有记录。本项按部分回答。[@ref-qoder-ide-models-params]

## 诊断 {#providers-diagnostics}

- **配置可读 / 模型可选**：Models 面板中自定义模型的 Edit / Delete / Enable-Disable 三项操作可用，说明定义已被接受；Enable 决定它是否出现在选择列表。[@ref-qoder-ide-custom-models-manage]
- **连接校验**：点 **Add** 后系统自动校验连接状态，这是 IDE 侧唯一被记录的"配置到请求"之间的检查点。[@ref-qoder-ide-custom-models-add]
- **添加失败排查**（官方 FAQ 原文四项）：API key 是否正确且没有多余空格；key 是否过期或被禁用；provider 账户余额是否充足；网络连接是否正常。[@ref-qoder-ide-custom-models-fail]
- **消耗是否走对账户**：官方 FAQ 说明自定义模型费用计到 provider API 账户、不消耗 Qoder Credits；Repo Wiki 例外，会在生成时提示消耗 Qoder Credits。[@ref-qoder-ide-custom-models-add]

**缺口（`providers.responses`）**：固定来源没有记录流式返回、工具调用、错误码与重试策略，也没有对后端提出任何约定；已检查的入口是 Custom Models 的 FAQ（只有上面四条排查项），因此响应处理一项按未建立处理。[@ref-qoder-ide-custom-models-fail]
