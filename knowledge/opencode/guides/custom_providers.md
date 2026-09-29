---
schema_version: 1
record_kind: production
guide_id: guide-opencode-custom-providers
coverage_ref: coverage-opencode-custom-providers
claim_refs: []
title: OpenCode 的 provider 扩展
---

固定源码 `providers.mdx:25–85` 用 `provider` 配置块描述模型条目，`:2543` 起专门讨论 custom provider；解析路径可从 `packages/core/src/config/provider.ts` 继续追。要分清三件事：注册一个内置 provider 的模型、指向兼容 API 的自有端点，以及实现新的协议适配器。它们对字段、鉴权和请求适配的要求不同。

源码快照（`snapshot-opencode-repo`）不能自动证明 npm 二进制 `1.18.32` 接受同样的配置，现有记录也没有一次成功请求。因此本章只定位源码材料，不给端点 JSON 配方。补证应先确认构建映射，再固定协议和本地测试端点，分别验证配置通过、模型列出、鉴权与请求结果；只有前两步不能宣布 provider 可用。
