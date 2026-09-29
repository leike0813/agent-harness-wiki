# Proposal

## Why

新知识入口是章节小节，现有 Claim FTS 与指南字符串包含搜索无法可靠找到这些内容。M1 已确定本地 embedding 混合检索为必交付项。

## What Changes

- **BREAKING**：search_knowledge 只搜索当前发布的最新章节小节，不按安装版本筛选或返回旧 Claim 命中。
- 为问题编号、配置键、路径和别名提供精确入口；合并全文和离线语义召回，按小节稳定去重。
- 模型与索引固定到发布；缺失时明确降级为词法结果，M1 验收仍要求语义路径运行。

## Capabilities

### New Capabilities

- offline-hybrid-search: 当前章节小节的离线语义索引、召回与降级状态。

### Modified Capabilities

- knowledge-query: 修改有界搜索与分页为章节小节候选、来源范围和命中方式。
- mcp-query: search_knowledge 返回可回读小节与语义检索状态。
- query-cli: CLI 搜索共享同一结果和降级语义。

## Impact

依赖 m1-reader-guides 已发布的真实章节语料；涉及 src/compiler、src/query、src/cli、src/mcp、SQLite 发布索引、archive/models 和离线搜索验证。具体模型及推理依赖在真实语料上核验后锁定。
