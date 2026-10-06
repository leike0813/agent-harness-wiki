# 验证记录

2026-10-06，Linux x64，Node 24.12.0，ICU 77.1。

- `pnpm verify` 通过：类型检查、lint、格式、导出 schema 一致性、70 条审计、16 个虚构章节、539 个生产章节、编译、文档站和消费者工件验收。
- 单元测试 165 项通过；集成测试 246 项通过。3 项既有可选环境测试未运行：两项需要 `AHW_SANDBOX_TEST=1` 的 bwrap 测试，一项需要指定 NFS 环境；未增加跳过用例。
- 消费者 1.2.0 的实际 tgz 安装验收 30 项通过，包含本地 Transcript 的 CLI/MCP 一致性，以及缺章的 `not_investigated` 结果。
- `openspec validate add-local-transcripts-topic --strict` 与 `git diff --check` 通过。

新主题有十个固定问题，完整目录共 63 问。回归覆盖必答问题缺失、已写主题缺少当前选择、登记产品没有内容、缺章查询、搜索、比较与根路径/子路径站点展示。缺章标签不带不可读链接；搜索仍只索引当前章节。

本机现有生产发布 `deepseek-harness-onboarding-20261003`（builder 6）通过 `verifyChapterRelease` 完整校验。虚构回归同时验证 builder 7 输出和 builder 6 的只读校验，校验前后文件摘要一致。

生产指针及清单摘要保持不变：

```text
releases/current.json
cb640c9b6c17cb1f1534ea9951e1677fe04ee63216c4110dca59328b9a60cbee
releases/deepseek-harness-onboarding-20261003/manifest.json
e9d5cc5c185fb282eec2682d2352aa7622cc0a5661e4eb8b7e28ee01f7937586
```

最终 diff 未修改生产 `knowledge/`、`registry/`、`catalog/` 或 `pnpm-lock.yaml`。未提交、推送或发布。真实产品的新主题章节由后续维护调查补写；公开在线数据包含新主题前须先交付支持它的消费者。
