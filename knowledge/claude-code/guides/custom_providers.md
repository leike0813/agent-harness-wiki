---
schema_version: 1
record_kind: production
guide_id: guide-claude-code-custom-providers
coverage_ref: coverage-claude-code-custom-providers
claim_refs: []
title: Claude Code 的自定义 provider 问题
---

归档设置页把 `model`、`--model`、`ANTHROPIC_MODEL` 放在模型**选择**层，另提 `apiKeyHelper` 和服务地址环境变量。MCP 页提到 `ANTHROPIC_BASE_URL` 可能指向代理；这说明“换模型”“改请求出口”“注册全新协议 provider”是不同问题。当前材料没有一个统一的 `providers.{name}` 定义契约，不能把能指定 base URL 当成可任意注册 provider。

网页未给 `2.1.283` 精确包的适用证明，隔离包也未完成启动与请求。因此本库没有 `supported` 或 `unsupported` Claim，更没有可信的私有端点配置示例。下一轮应先确定目标是兼容端点还是新协议，检查精确包识别的变量/设置、凭据来源、请求格式和失败诊断。线索在 设置页快照（`snapshot-claude-code-configuration-doc`）与 MCP 页面快照（`snapshot-claude-code-mcp-doc`）。
