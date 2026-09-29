---
schema_version: 1
record_kind: production
guide_id: guide-pi-custom-providers
coverage_ref: coverage-pi-custom-providers
claim_refs: []
title: Pi 的模型与 provider 扩展
---

这一主题至少有两条路线，不能混为一个开关。精确包的 `docs/custom-provider.md:30–120` 把 `pi.registerProvider(name, config)` 用于扩展注册：仅覆盖已有 provider 的 `baseUrl`/`headers`，与带 `models`、`api`、`apiKey` 的新 provider 是不同场景。包内 README 另提 `models.json` 模型配置。文档的示例还区分 API 适配器类型，例如 `openai-completions` 与 `openai-responses`；协议选错时，即使读取配置也可能无法完成请求。

本轮只确认了这些是**0.73.1 包内文档的说明**，没有接受具体字段组合的 Claim，也未观察鉴权与请求。要补最小示例，应先选定目标端点及 API 类型，用隔离密钥测试“模型出现在列表”和“请求成功”两步，记录错误时的诊断。原始材料见 npm 包快照（`snapshot-pi-npm`）的 `docs/custom-provider.md`；当前不能把文档片段当成已验证连接。
