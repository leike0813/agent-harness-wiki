---
schema_version: 1
record_kind: production
guide_id: guide-codex-cli-custom-providers
coverage_ref: coverage-codex-cli-custom-providers
claim_refs: []
title: Codex CLI 的 provider 配置
---

归档配置参考将 `model_provider` 写成选择 provider ID 的键，`model_providers.{id}` 写成自定义定义；其字段表列 `base_url`、`env_key`、`wire_api`、重试与 header。页面还提醒项目级 `.codex/config.toml` 中的 provider/auth 键不会覆盖本机用户配置。排查“写了 provider 但没生效”时，这个作用域限制比单看字段拼写更关键。

不过这些是**未标精确包版本的网页描述**。`0.157.1` 包内 README 无 schema，尚无构建映射或解析观察；当前既不能推荐某个 `model_providers` 示例，也不能判断私有端点是否可连接。补证要先查该二进制的解析代码，再在隔离环境验证字段来源、模型选择、鉴权与一次真实请求。见 配置页快照（`snapshot-codex-cli-configuration-doc`）；Coverage `partial`。
