# Proposal

## Why

在线资源与站点投影已经归档，但读者仍须克隆仓库并准备本地发布才能查询。消费者需要可直接安装的轻量 CLI／MCP，按需读取已发布知识，并准确区分缓存缺口、网络失败和有限历史。

## What Changes

- 新增 `agent-harness-wiki@1.0.0` 消费者 workspace，只提供五类在线只读查询、MCP stdio、help 和 version；私有维护者包保留本地完整历史与混合检索。
- 抽出共享选版、界面答案、比较与产品解析；在线资源按需校验并固定发布，复用已有 JSON 词法查询。
- 新增消费者 strict 结果与技术错误 schema，体现发布时间、访问模式、有限历史、`history_not_available`、协议退役及纯词法能力。
- 实现有界 HTTP、重试、取消、内存／文件缓存和显式离线，CLI 与 MCP 使用同一在线查询服务。
- 真实 tgz／外部安装／npx／五工具 stdio 验收，加入仅验证的三平台、最低及最新 Node 24.x CI；实际未运行组合保留未验收。
- 落实代码 MIT、原创知识和文档 CC BY 4.0，保留第三方来源权利；更新实际入口与交接文档。

## Capabilities

### New Capabilities

- `online-knowledge-query`: 固定在线发布的五查询、公共结果、历史、来源、HTTP／缓存／离线／取消及错误责任。
- `consumer-distribution`: 轻量消费者 npm 工件、入口与版本、运行环境、许可及真实包／平台验收。

### Modified Capabilities

- `knowledge-query`: 区分本地只读边界与在线发布数据读取，保持共同领域语义与本地混合搜索。
- `query-cli`: 区分维护者和消费者入口、结果契约及词法能力。
- `mcp-query`: 共享五工具适配，声明两类服务、异步取消与消费者技术错误。

## Impact

涉及 query／MCP 共享逻辑、新在线客户端及消费者入口、消费者包和构建／验收脚本、schema 导出、测试与仅验证 CI、PRD／AGENTS／README／ADR及相关开发文档。依赖已有锁定版本，不新增网络、缓存或打包框架。公开部署、npm 发布、OIDC、30／90 天服务端保留和恢复属于下一 change；Git 提交与推送按维护者明确授权执行。

依据：[分发地图](../../../.scratch/npm-pages-distribution/map.md)与其六张 resolved 决议；前置主规格为 `online-knowledge-release` 与 `online-lexical-search`。
