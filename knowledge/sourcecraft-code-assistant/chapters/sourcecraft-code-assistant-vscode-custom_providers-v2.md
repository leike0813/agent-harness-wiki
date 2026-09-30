---
schema_version: 3
record_kind: production
edition_id: sourcecraft-code-assistant-vscode-custom_providers-v2
harness_id: sourcecraft-code-assistant
topic: custom_providers
title: "SourceCraft Code Assistant（VS Code）的模型档案与 Provider"
sections:
  - section_id: providers-profiles
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-concepts-agents, ref-sc-ca-profiles-create, ref-sc-ca-profiles-intro, ref-sc-ca-profiles-switch]
  - section_id: providers-auth
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-profiles-create, ref-sc-ca-profiles-edit]
  - section_id: providers-protocol
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-profiles-intro, ref-sc-ca-roo]
  - section_id: providers-models
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-profiles-create, ref-sc-ca-profiles-intro]
  - section_id: providers-options
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-fast-edits, ref-sc-ca-profiles-intro]
  - section_id: providers-responses
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-aa-retry, ref-sc-ca-roo]
  - section_id: providers-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-chatui-status, ref-sc-ca-logs, ref-sc-ca-profiles-edit, ref-sc-ca-profiles-switch, ref-sc-ca-qa-vsc-auth]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [vscode]
        section_id: providers-profiles
        status: answered
        source_refs: [ref-sc-ca-profiles-intro, ref-sc-ca-profiles-create]
  - question_id: providers.auth
    answers:
      - surface_ids: [vscode]
        section_id: providers-auth
        status: answered
        source_refs: [ref-sc-ca-profiles-create]
  - question_id: providers.protocol
    answers:
      - surface_ids: [vscode]
        section_id: providers-protocol
        status: partial
        source_refs: [ref-sc-ca-profiles-intro, ref-sc-ca-roo]
  - question_id: providers.models
    answers:
      - surface_ids: [vscode]
        section_id: providers-models
        status: partial
        source_refs: [ref-sc-ca-profiles-create, ref-sc-ca-profiles-intro]
  - question_id: providers.metadata
    answers:
      - surface_ids: [vscode]
        section_id: providers-options
        status: unknown
        source_refs: [ref-sc-ca-profiles-intro]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [vscode]
        section_id: providers-options
        status: partial
        source_refs: [ref-sc-ca-profiles-intro, ref-sc-ca-fast-edits]
  - question_id: providers.responses
    answers:
      - surface_ids: [vscode]
        section_id: providers-responses
        status: partial
        source_refs: [ref-sc-ca-aa-retry]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-sc-ca-profiles-edit, ref-sc-ca-logs]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 模型配置档案（Profile）作为 Provider 入口 {#providers-profiles}

在 VS Code 插件上，Provider 通过**模型配置档案（model configuration profile）**定义，官方称其为"Code Assistant 设置集合"，用于在不同 AI provider、模型与设置之间快速切换而不必每次重配。该功能同样标注为**仅 Visual Studio Code 可用**。[@ref-sc-ca-profiles-intro][@ref-sc-ca-concepts-agents]

官方列出的档案内容：AI providers（Yandex Cloud、OpenAI、Anthropic、OpenRouter、Glama 等）、API key 与认证数据、模型选择（`o3-mini-high`、`Claude 3.7 Sonnet`、`DeepSeek R1` 等）、temperature、computing budgets、provider 专属设置、diff 编辑方式、rate limit 设置。[@ref-sc-ca-profiles-intro]

创建与切换：**Settings** → **Profile** 选择器旁的加号 → 输入名称 → **Create Profile**；随后选择 **API Provider**、填 **API Key**、选 **Model**、设 **Rate limit**、按需启用 **Use custom temperature**。切换可在 Settings 的 Profile 或聊天底部菜单的档案下拉列表中完成。[@ref-sc-ca-profiles-create][@ref-sc-ca-profiles-switch]

**缺口（配置载体）**：固定来源只描述通过 UI 创建/编辑档案，**没有给出档案的持久化文件路径或 JSON/YAML 字段名**；因此无法给出可手写的最小配置块，此处不编造语法。

## 凭据与 base URL {#providers-auth}

API Key 按档案填写，官方明确：**API keys are securely stored in VSCode Secret Storage and are never exposed in plain text**。[@ref-sc-ca-profiles-create]

删除/重命名档案同样在 Settings → Profile 内进行；官方注明"不能删除唯一的档案"（即至少保留一个）。[@ref-sc-ca-profiles-edit]

**缺口**：固定来源没有说明 base URL / endpoint 覆盖字段、从环境变量读取 key 的方式，或凭据的其他来源；示例中只出现 UI 填写的 API Key。

## 协议与兼容层 {#providers-protocol}

官方只给出 provider 名称清单（Yandex Cloud、OpenAI、Anthropic、OpenRouter、Glama 等），并强调"可用设置随 provider 与模型而变，甚至同一 provider 内不同模型支持的范围也不同"。[@ref-sc-ca-profiles-intro]

插件的 Roo Code 修改文件清单中出现 `src/api/providers/openai.ts`、`src/api/providers/lm-studio.ts`、`src/api/providers/vscode-lm.ts`、`api/transform/vscode-lm-format.ts`，以及 UI 目录下的 `settings/providers/Anthropic.tsx`、`OpenRouter.tsx`、`LMStudio.tsx`、`Ollama.tsx`、`OpenAICompatible.tsx`。这是"插件内部按 provider 类型分别实现与配置"的间接证据；文件名不等于对外契约。[@ref-sc-ca-roo]

**缺口**：固定来源没有列出请求协议、端点形态、OpenAI 兼容层的具体路径或插件扩展 mechanism；协议层保持未验证。

## 模型 ID、别名与发现 {#providers-models}

档案内通过 **Model** 选择器指定模型；官方示例给出 `o3-mini-high`、`Claude 3.7 Sonnet`、`DeepSeek R1` 等名称，并说明设置项随 provider/model 变化。[@ref-sc-ca-profiles-intro][@ref-sc-ca-profiles-create]

档案还包含 **Rate limit**：默认值 `0`（禁用），用于设置该档案两次 API 请求之间的最小间隔（秒），官方称默认值适合多数用户，需要控成本或避开 provider 限流时才调整。[@ref-sc-ca-profiles-create]

**缺口**：固定来源没有说明模型列表从何处获取/刷新、是否支持自定义模型 ID 或别名、模型 ID 的大小写规则；这些保持未验证。

## 能力元数据与参数转发 {#providers-options}

官方在档案说明中列出的、会进入 provider 请求的参数与设置：temperature（**Use custom temperature**）、computing budgets、rate limit、provider-specific settings、以及 **Enable editing through diffs**。[@ref-sc-ca-profiles-intro]

diff 编辑是逐档案设置的：**Enable editing through diffs** 默认开启；**Match precision** 控制 AI 识别的代码段落必须多精确地匹配原文件才应用改动，`100%`（默认）要求完全匹配，`80%`–`99%` 允许不完全匹配并提高误改风险；官方说明该项内部对应 `fuzzyMatchThreshold` 参数（配合 Levenshtein 距离一类算法）。关闭 diff 编辑后，插件改用 `write_to_file` 整体覆盖文件。[@ref-sc-ca-fast-edits]

**缺口（元数据未证实）**：固定来源**没有**给出上下文窗口、输出上限、视觉能力、推理强度等能力元数据的字段或默认值，也没有说明这些参数从客户端如何映射到具体请求；`providers.metadata` 因此记为 unknown。

## 响应处理与重试 {#providers-responses}

- **自动重试**：**Retry** 权限（风险 Low）开启后，服务器返回错误时自动重试失败的 API 请求而不弹批准；**Delay before retrying the request** 默认 `10` 秒，后续延迟按 `min(baseDelay * 2^retryAttempt, 600)` 指数退避，最大 `600` 秒。官方示例序列为 10/20/40/80/160/320/600… 秒。[@ref-sc-ca-aa-retry]
- **请求上限**：Auto-approve 的 **Max Requests** 控制自动执行的请求数，与该档案的 rate limit 是两个不同的旋钮（前者限总量、后者限频率）。[@ref-sc-ca-aa-retry]

**缺口**：固定来源没有描述流式输出、工具调用协议或错误分类/重试条件的细节；重试机制只以"服务器返回错误"为触发条件。[@ref-sc-ca-roo]

## 诊断 {#providers-diagnostics}

- 在 Settings → Profile 中查看/编辑当前档案字段，可切换档案比较效果。[@ref-sc-ca-profiles-edit][@ref-sc-ca-profiles-switch]
- 聊天界面用加载指示器、红色错误消息与绿色成功消息区分请求处理状态。[@ref-sc-ca-chatui-status]
- 认证类故障另有 FAQ 条目（例如 VS Code 报 `crypto is not defined` 时建议升级 VS Code），但这些属于 SourceCraft 登录认证，不是 provider key 校验。[@ref-sc-ca-qa-vsc-auth]
- 插件日志经 **Export Logs** 导出 `logs.zip`。[@ref-sc-ca-logs]

**缺口**：固定来源没有给出"API key 无效""provider 不可达""模型不可选"这类错误的独立诊断入口或验证按钮；`providers.diagnostics` 只能给出上述通用入口。
