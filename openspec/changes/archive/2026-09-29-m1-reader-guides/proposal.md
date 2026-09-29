# Proposal

## Why

首批 35 篇旧指南已有调查材料，但仍围绕精确 Target、Coverage 和已接受 Claim，读者难以按产品机制解决配置问题。章节模型建立后，需要把这些材料改写为站点与 Agent 共用的真实 Wiki 内容，并替换旧查询接口。

## What Changes

- **BREAKING**：继续使用本 change，但改写其旧 proposal、delta specs、design 和 tasks；旧勾选不算新契约完成。
- 为 Codex CLI、Claude Code、OpenCode、Pi、OMP 的七个主题各写一篇新格式章节，逐题核对固定问题、来源和版本边界。
- 在现有发布后新增 35 篇章节版本：按可独立查找的机制分节，写清配置路径、最小完整文件示例、字段、前提、生效结果和检查方法；其他适用场景给目录、命令、Hook 输入输出或优先级实例。问题编号留在可定位的小节索引中。
- 站点改为产品概览与独立主题页；CLI 和 MCP 共享新发布中的章节、问题、来源与版本解析。
- **BREAKING**：MCP 工具改为 list_harnesses、get_topic、search_knowledge、compare_topics、get_source；不为旧格式 release 提供新接口兼容。

## Capabilities

### New Capabilities

- reader-guides: 首批 35 篇章节的正文质量、来源边界和阅读验收。

### Modified Capabilities

- five-harness-investigation: 以逐题章节与固定来源代替 Coverage 清单及人工接受门禁。
- knowledge-query: 从 Claim/Target 能力查询改为章节、小节、问题、版本和来源查询。
- query-cli: CLI 暴露与新查询服务一致的章节命令。
- mcp-query: 五个只读工具及其结构化响应改用新章节契约。
- knowledge-site: 产品与主题 Wiki 页面、来源与历史入口。

## Impact

依赖 m1-chapter-model-release。已发布的 35 篇 v1 章节和 `reader-guides-20260929` 保留历史身份；新写作标准使用 v2 章节和新的不可变发布实现。复用现有来源引用、查询接口与站点生成链；调整章节校验和页面问题索引。内容、站点及真实 MCP 协议验收后才切换生产当前指针。
