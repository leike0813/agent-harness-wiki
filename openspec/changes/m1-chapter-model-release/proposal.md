# Proposal

## Why

现有 Claim/Coverage/Assessment 真源和精确 Target 指南无法表达以主题章节为主的知识，也无法让新 MCP 在固定发布内读取历史章节。先建立新章节与发布格式，后续内容和接口才有一致的输入。

## What Changes

- **BREAKING**：以不可变产品 × 主题 Markdown 章节版本、固定问题索引、来源引用和软件版本映射替换旧通用 Claim 真源及逐条人工接受门禁。
- 发布清单显式记录当前章节和可查询的历史章节；JSON、SQLite、Markdown 从同一批校验后的输入生成。
- 旧格式 release 无兼容义务；本项用 fixture 验证新格式，不切换生产当前指针。

## Capabilities

### New Capabilities

- topic-chapters: 章节版本、问题索引、稳定小节和软件版本映射的知识契约。

### Modified Capabilities

- knowledge-records: 删除以 Claim/Assessment/Coverage 为中心的知识身份与状态要求，保留来源和 fixture 身份。
- dataset-validation: 校验章节、问题、小节、引用及软件版本映射，取代旧 Claim 关系门禁。
- knowledge-release: 发布当前与历史章节，并验证新格式的一致性和原子切换。
- source-provenance: 增加可在发布中读取的固定来源引用。

## Impact

src/domain、src/validation、src/compiler、schemas、fixture、knowledge 输入和发布完整性测试。复用现有 Source、Artifact、Snapshot 的固定身份；旧格式 release 可留在本地，但新实现不为其建立读取适配层。
