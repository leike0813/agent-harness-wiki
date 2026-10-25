---
schema_version: 3
record_kind: production
edition_id: lingma-jetbrains-custom_providers-v2
harness_id: lingma
topic: custom_providers
title: "Lingma（Qoder CN）JetBrains 插件的自定义模型（BYOK）：入口、凭据与边界"
sections:
  - section_id: providers-scope
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-product-rename, ref-lingma-changelog-byok]
  - section_id: providers-entry-auth
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-providers-add, ref-lingma-providers-faq, ref-lingma-changelog-byok]
  - section_id: providers-models-metadata
    surface_ids: [jetbrains]
    source_refs:
      - ref-lingma-providers-manage
      - ref-lingma-providers-faq
      - ref-lingma-models-tiers
      - ref-lingma-models-list-20261022
      - ref-lingma-models-list-tail-20261022
      - ref-lingma-models-coefficients
      - ref-lingma-models-context-window
      - ref-lingma-models-thinking-depth
      - ref-lingma-models-save-settings
      - ref-lingma-models-manage-20261022
  - section_id: providers-forwarding-responses
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-providers-add, ref-lingma-providers-faq, ref-lingma-changelog-migration]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [jetbrains]
        section_id: providers-entry-auth
        status: answered
        source_refs: [ref-lingma-providers-add, ref-lingma-changelog-byok]
  - question_id: providers.auth
    answers:
      - surface_ids: [jetbrains]
        section_id: providers-entry-auth
        status: answered
        source_refs: [ref-lingma-providers-add, ref-lingma-providers-faq]
  - question_id: providers.protocol
    answers:
      - surface_ids: [jetbrains]
        section_id: providers-forwarding-responses
        status: partial
        source_refs: [ref-lingma-providers-add]
  - question_id: providers.models
    answers:
      - surface_ids: [jetbrains]
        section_id: providers-models-metadata
        status: partial
        source_refs:
          - ref-lingma-providers-manage
          - ref-lingma-models-tiers
          - ref-lingma-models-list-20261022
          - ref-lingma-models-list-tail-20261022
          - ref-lingma-models-coefficients
  - question_id: providers.metadata
    answers:
      - surface_ids: [jetbrains]
        section_id: providers-models-metadata
        status: partial
        source_refs:
          - ref-lingma-models-context-window
          - ref-lingma-models-thinking-depth
          - ref-lingma-models-save-settings
          - ref-lingma-models-manage-20261022
  - question_id: providers.forwarding
    answers:
      - surface_ids: [jetbrains]
        section_id: providers-forwarding-responses
        status: unknown
        source_refs: []
  - question_id: providers.responses
    answers:
      - surface_ids: [jetbrains]
        section_id: providers-forwarding-responses
        status: unknown
        source_refs: []
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [jetbrains]
        section_id: providers-entry-auth
        status: partial
        source_refs: [ref-lingma-providers-add, ref-lingma-providers-faq]
---

## 固定来源与界面 {#providers-scope}

本章依据官方文档站点 docs.qoder.cn 的 Qoder CN 用户指南，界面口径为 catalog 唯一登记的 `jetbrains`（JetBrains IDE 插件，kind `ide`）；产品自 2026-05-20 起由通义灵码更名为 Qoder CN 系列，进程与目录仍为 `.lingma` / `Lingma.exe`。[@ref-lingma-product-rename]

Lingma 是闭源的托管编码助手，模型选择以官方内置模型为主、以“自定义模型（BYOK）”为扩展。JetBrains 插件从 3.3.0 起“支持企业自定义内置模型、专属模型、BYOK provider”，随后“BYOK 支持配置自定义模型” [@ref-lingma-changelog-byok]。个人版的 BYOK 面向**个人专业版**。

## Provider 入口与凭据 {#providers-entry-auth}

**入口**：点击 IDE 左上角 Qoder CN，选择“首选项 - Qoder CN 设置”，在左侧导航栏选择**模型**；模型管理页面显示已配置的自定义模型列表，每个模型卡片包含模型名称、标签及来源信息，并提供编辑、删除和启用/禁用开关；单击右上角 **+ 添加** 添加新模型 [@ref-lingma-providers-add]。

**添加步骤** [@ref-lingma-providers-add]：

1. 进入 Qoder CN 设置，打开模型面板。
2. 点击“添加”，选择服务商，按需选择所需的模型，并填写 API 密钥；点击“获取 API 密钥”可跳转至对应服务商的密钥管理页面。
3. 点击“添加”后，系统将自动验证连接状态。
4. 配置完成后，可在对话框中选择配置的模型开始使用。

**支持的供应商**（BYOK）：阿里云百炼、智谱（GLM）、Kimi、MiniMax [@ref-lingma-providers-add]。

**凭据**：API 密钥在设置界面填入，只填写密钥本身；密钥获取入口为各服务商的密钥管理页——GLM（open.bigmodel.cn）、Kimi（platform.moonshot.cn）、MiniMax（platform.minimaxi.com）、Bailian（bailian.console.aliyun.com）[@ref-lingma-providers-faq]。自定义模型**不消耗** Qoder CN 额度，费用由服务商 API 账户直接结算 [@ref-lingma-providers-faq]。企业侧还可由管理员自定义内置模型、专属模型与 BYOK provider [@ref-lingma-changelog-byok]。

缺口：文档未说明密钥的落盘位置与加密方式、是否支持环境变量或企业统一注入、以及 base URL 是否可改（入口只要求选择服务商与模型）。

## 模型定义与管理 {#providers-models-metadata}

**选择方式与档位**：模型选择器提供 **Auto 智能路由**（0.5×）、**Fast（快速）** 档位（0.8×，文档描述为响应更快、Credits 消耗更低）与**指定模型**三种入口；一般任务可从 Auto 开始，目标清楚、需快速交付时可选 Fast，有明确偏好或需要特定能力时直接指定模型。[@ref-lingma-models-tiers]

**内置模型清单与系数**（括号内为 Credits 用量参考系数）：Qwen3.8-Max（0.5×）、Qwen3.8-Flash（0.1×）、Qwen3.7-Max（0.5×）、Qwen3.7-Plus（0.1×）、DeepSeek-V4-Pro（0.5×）、DeepSeek-Flash（0.1×）、GLM-5.3（0.8×）、GLM-5.3-Flash（0.1×）、Kimi-K3（1.4×）、Kimi-K2.8-Preview（0.8×）、MiniMax-M3.1-Flash（0.1×）。[@ref-lingma-models-list-20261022][@ref-lingma-models-list-tail-20261022]

**列表与系数的权威边界**：文档明确“可用模型及系数以客户端为准”；参考系数只用于比较同类型任务的预估用量，不是每条消息的固定扣费，活动期间选择器还可能同时显示常规系数、折扣系数与低峰折扣提示。因此这里记录的是快照观察值，实际可选集合与显示系数以下发到客户端的列表为准。[@ref-lingma-models-coefficients]

**自定义模型的模型来源与别名**：自定义模型的模型项来自所选服务商的列表——添加时按服务商选择所需模型，文档没有提供手工填写模型 ID 或 Base URL 的入口；已添加模型可“编辑”修改**模型名称别名**、“删除”（删除后不可继续使用）、“启用/禁用”（控制是否显示在选择列表中），并可为同一服务商添加不同版本的模型或使用不同的 API 密钥。查看与变更都通过模型面板完成，文档未描述额外的模型发现或刷新命令。[@ref-lingma-providers-manage][@ref-lingma-providers-faq]

缺口：文档未说明自定义模型 ID 能否手工覆盖、模型列表的缓存与刷新时机，以及企业侧自定义内置模型/专属模型是否进入同一选择列表。

**元数据：上下文窗口与思考强度**（partial）：内置模型的元数据在“模型管理”的**默认**分类中配置，不同模型支持的参数和可选范围不同。**上下文窗口**用对应模型行内的滑块选择该模型支持的大小 [@ref-lingma-models-context-window]；**思考强度**对支持的模型通过下拉菜单选择档位（例如 Qwen3.8-Max 提供**关闭思考**、**低**、**中**和**极高**），显示“不支持”或固定思考状态的模型没有相同可调项，以所选模型显示的控件为准 [@ref-lingma-models-thinking-depth]。修改后点击**保存设置**：偏好对所有任务生效，正在生成的回复保持当前设置、下一轮开始使用新设置，点击**取消**可放弃修改 [@ref-lingma-models-save-settings]。模型是否出现在选择器中由**默认**分类的“显示状态”开关控制；需要配置自己的 API 密钥时切换到**自定义**分类 [@ref-lingma-models-manage-20261022]。

缺口：自定义模型是否可单独设置上下文窗口、输出上限、工具/视觉能力或推理强度等元数据，文档仍未说明；自定义模型卡片只描述名称、标签、来源与启停状态，也没有说明这些元数据如何映射到请求。

## 请求处理与诊断 {#providers-forwarding-responses}

**协议与端点（`providers.protocol`，partial）**：文档只说明“选择服务商、选择模型、填写 API 密钥”，即由客户端内置的供应商适配（Coding Plan）承担接入，用户不指定请求协议或端点形态；是否存在 Base URL 覆盖、是否支持 OpenAI 兼容 / Anthropic 兼容端点，文档均未给出，故记为部分。[@ref-lingma-providers-add]

**参数映射与响应处理（`providers.forwarding`、`providers.responses`，unknown）**：官方文档没有描述自定义模型请求会携带哪些参数、参数如何映射到请求体，也没有描述流式输出、工具调用、错误与重试在后端的约定。已检查的直接入口为自定义模型文档（`user-guide/custom-model.md`）、模型选择器文档（`user-guide/model-selector.md`）与 JetBrains 更新日志；可写字段只有服务商、模型与 API 密钥，缺一个描述请求协议与响应语义的官方页面或字段清单。

**诊断** [@ref-lingma-providers-add][@ref-lingma-providers-faq]：

- 添加时“系统将自动验证连接状态”。
- 添加失败时核对：API 密钥是否正确且无多余空格；密钥是否过期或被禁用；服务商账户余额是否充足；网络连接是否正常。
- 凭据异常：更新日志记录了 BYOK 自定义模型凭据保存与迁移的修复——“升级后自动迁移旧版凭据”，并优化凭据异常提示与恢复指引；遇到凭据问题时以升级到修复版本为手段。[@ref-lingma-changelog-migration]

缺口：无法区分“请求已发送”与“后端实际可用”，也没有请求日志或用量明细入口来描述自定义模型调用。
