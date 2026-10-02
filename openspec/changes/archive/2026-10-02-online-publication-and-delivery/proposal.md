# Proposal

## Why

在线投影和消费者包已完成受控验收，但默认 Pages 入口与公开 npm 包尚不存在。读者需要实际可用的公开入口，维护者需要能跨 CI 保留历史、识别失败并从可信归档恢复的发布流程。

## What Changes

- main 自动发布联合验证的生产页面与数据，PR 只验证，支持手动重跑、恢复和状态核对。
- 在独立 publication-state 分支持久化发布台账，以真实切换记录决定 30 天旧发布和 90 天旧协议保留；状态不确定时停止发布和清理。
- 不可变 GitHub Release 保存每份候选的页面与本发布数据；从这些归档重组完整部署目录，复用 512 MiB 和完整性校验。
- 独立 npm-vX.Y.Z 工作流产出真实 tgz，以 next 的公开精确版本和真实 Pages 验收后推广 latest；后续通过 OIDC 发版，首次 1.0.0 由维护者交互建包后配置信任。
- 实际验证公开 Pages、归档恢复和 npm 安装，分别记录实现、部署、验证与发包状态。

## Capabilities

### New Capabilities

- `online-publication`: 跨 CI 台账、自动知识发布、不可变归档、保留、恢复、协议生命周期、独立程序发版与真实交付验收。

### Modified Capabilities

- `online-knowledge-release`: 不可变单发布工件与可变部署目录组装分离。
- `knowledge-site`: 联合静态产物的公开部署与有界回读。
- `consumer-distribution`: 独立 tag 发版、OIDC、next/latest 和一次性建包责任。

## Impact

新增维护者侧 publication 模块、脚本与两个工作流；扩展在线组装器和现有消费者验收，补充发布行为测试和运维文档。复用 Node、Zod、Commander、tar 和 SDK，不新增依赖或持续服务。消费者 v1 DTO、五查询、五工具及本地完整历史／混合检索契约保持原定义。用户已授权真实上线、提交并推送 dev、PR 合入 main；npm 登录和 2FA 由维护者完成，不读取已有用户凭据。
