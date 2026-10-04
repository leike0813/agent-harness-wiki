# Kiro 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮只读扫描报告 22 份官方文档变化；当前响应均已重新获取，SHA-256 与扫描观察值逐一吻合。Kiro 当前归档目录缺失，已有文档工件登记的基线原件无法读取；本轮写入范围也不允许补写 archive/kiro/。因此无法可靠比较旧版与新版被引段落，七个主题均保留当前章节版本并将受影响问题留在审计待处理状态。

本轮没有读者可见的章节或版本映射变化，属于「仅结案审计」。临时获取的文档只用于确认观察哈希，未把临时路径写入知识记录。

## 变化的意义与证据边界

输入将全部变化来源关联到以下主题，影响面均为 cli。由于基线原件缺失，下面的问题仍待复核，并不表示来源已证明答案变化：

<!-- prettier-ignore -->
| 主题 | 当前章节 | 受影响问题 | 本轮结果 |
| --- | --- | --- | --- |
| configuration | kiro-cli-configuration-v1 | config.sources, config.overrides, config.runtime, config.trust, config.defaults, config.migration, config.diagnostics | 保留旧版；7 题 pending |
| custom_agents | kiro-cli-custom_agents-v1 | agents.format, agents.roles, agents.invocation, agents.overrides, agents.limits | 保留旧版；5 题 pending |
| custom_providers | kiro-cli-custom_providers-v2 | providers.entry, providers.auth, providers.protocol, providers.models, providers.metadata, providers.forwarding, providers.responses, providers.diagnostics | 保留旧版；8 题 pending |
| hooks | kiro-cli-hooks-v2 | hooks.entry, hooks.order | 保留旧版；2 题 pending |
| mcp | kiro-cli-mcp-v2 | mcp.entry, mcp.definition, mcp.transport, mcp.auth, mcp.lifecycle, mcp.capabilities, mcp.exposure, mcp.diagnostics | 保留旧版；8 题 pending |
| native_plugins | kiro-cli-native_plugins-v1 | plugins.api, plugins.diagnostics | 保留旧版；2 题 pending |
| skills | kiro-cli-skills-v1 | skills.roots, skills.discovery, skills.collision, skills.format, skills.extensions, skills.loading, skills.invocation, skills.conditions, skills.diagnostics | 保留旧版；9 题 pending |

现有章节原件引用采用 archived_document，其登记路径均在 archive/kiro/。本轮未能访问这些基线字节，故不能判断文档差异是否只来自页面模板，也不能确认具体问题答案是否发生变化。没有新增结论或引用。

## 本次发布与保留

审计：audit-kiro-e07643f7-d229-46b0-ab8f-8acdabebcfed.yaml。本轮没有章节 edition 或当前映射变化；七个主题沿用上表所列版本。delivery=pr，仅交付工作区审计与报告；未做本地发布。受管二进制未做核对。

## 待处理与独立复核

待处理旧审计：无（输入 pending_audit_refs 为空）。待处理问题：config.sources, config.overrides, config.runtime, config.trust, config.defaults, config.migration, config.diagnostics, agents.format, agents.roles, agents.invocation, agents.overrides, agents.limits, providers.entry, providers.auth, providers.protocol, providers.models, providers.metadata, providers.forwarding, providers.responses, providers.diagnostics, hooks.entry, hooks.order, mcp.entry, mcp.definition, mcp.transport, mcp.auth, mcp.lifecycle, mcp.capabilities, mcp.exposure, mcp.diagnostics, plugins.api, plugins.diagnostics, skills.roots, skills.discovery, skills.collision, skills.format, skills.extensions, skills.loading, skills.invocation, skills.conditions, skills.diagnostics。待补齐旧归档原件并按固定问题完成逐题差异复核后再结案。当前证据不足以判断是否触发跨主题关键加载机制变化，因此本轮没有形成供独立复核的事实结论。

## 来源核查记录

- source-kiro-docs-agents-builtin: 7c4bdb6b382a… → 2d3f50fc1b0d…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-agents-config-ref: 80484017b111… → f103f560ddec…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-agents-subagents: 79b49a54f57b… → e3de265e6ff2…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-auth: b3008f8088f4… → 80bd226a9fff…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-cli-chat-settings: 90eab7182946… → 9a239bef760c…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-cli-v3: 57e0fd0049d5… → 3e29831895fa…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-cli-v3-new: c5c000002022… → 2f6f3a990f16…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-configuration: 318f74531e79… → 0c49aafafada…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-firewalls: 9760e6c00b36… → 925a949bc730…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-headless: 3ae6494a4a3c… → e0ab8e7dff05…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-how-it-works: 381d45f4bbb3… → c60531450826…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-install: f938f8112cc0… → 67eb2e7c7514…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-mcp: a0846943b94e… → e8ea84644342…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-mcp-configuration: 322d15d103e9… → be8074cbc7dd…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-mcp-registry: 5d1c59753f88… → 713a9561f650…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-mcp-usage: 8f89302fd290… → bd7c9eef84a0…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-models: 73135c84bfa0… → 0af6014af62d…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-permissions: c2d1b2c9a84d… → a15c7eac948e…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-settings: ea091e73bafc… → f78280294237…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-skills: bec2e34ac470… → bc946aad4580…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-slash-commands: e594b7939d98… → c154c79126a8…；当前响应 SHA-256 与 observed 一致，基线原件未取得。
- source-kiro-docs-steering: c9419024bcba… → 6fd16fe3d34d…；当前响应 SHA-256 与 observed 一致，基线原件未取得。

其他输入来源均按扫描结果记录为 unchanged；没有来源失败记录。

## 验证与差异入口

pnpm knowledge:validate 通过，校验 489 个章节 edition；输出只有其他产品既有的 COVERAGE_INCOMPLETE 警告。pnpm sources:audit-log 通过，校验 12 份审计。git diff --check 通过。git status --short --untracked-files=all 显示本轮 Kiro 新增审计 YAML 与报告，并显示工作区既有其他产品文件和 chapter-current 差异；本轮未改动这些文件。本轮没有创建章节、引用、快照或版本映射。
