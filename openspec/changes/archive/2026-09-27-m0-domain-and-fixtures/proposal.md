# Proposal

## Why

仓库目前只有占位文件，无法验证 PRD 中的版本、条件、证据和覆盖语义。M0 需要先用明确虚构的数据建立可信的输入契约和可运行校验，再构建发布与查询链路。

## What Changes

- 固定 Node/pnpm/TypeScript 工具链、依赖和离线测试入口，并验证官方 MCP SDK 的基本 stdio 连通。
- 建立严格的领域 schema、JSON Schema 导出、YAML 数据集加载与跨记录校验。
- 提供两个明显虚构的 harness 数据集，覆盖六类主题、配置优先级、精确版本、平台、条件、证据、复核与未知覆盖。
- 将异常数据集与成功数据集隔离，验证关键错误不会成为可发布知识。

## Capabilities

### New Capabilities

- `knowledge-records`: 定义结构化知识记录的身份、Target、断言、条件、证据、复核、覆盖和 fixture 语义。
- `dataset-validation`: 将受限 YAML 数据集解析为领域记录，报告 schema、关系、语义和发布资格错误。

### Modified Capabilities

无。

## Impact

涉及主程序和文档站 workspace 的依赖与脚本、`src/domain/`、`src/validation/`、`schemas/`、`tests/fixtures/datasets/`、相关测试及当前阶段的开发文档。此 change 不生成 KnowledgeRelease，不实现 CLI 查询、正式 MCP 工具或站点页面。
