# Proposal

## Why

首批五个 npm 产品需要保留可实际启动的最新受管二进制，以供以后按需实验。现有包集原地更新、扫描时下载 tarball 和缺少直接运行入口的做法，不能保证失败时旧环境可用。

## What Changes

- 按登记 npm latest dist-tag 观察精确候选版本与 integrity，在忽略的 staging 中取得并锁定主包及平台依赖。
- 禁用生命周期脚本，登记直接可执行入口；在 Linux bwrap 内完成无凭据、断网的离线最小启动检查。
- 通过身份与启动检查才切换受管环境；失败保留上一个可启动版本并记录阻塞，与知识发布互不阻断。

## Capabilities

### New Capabilities

- managed-artifact-startup: 受管候选取得、校验、隔离启动与安全切换。

### Modified Capabilities

- source-provenance: 更新受管包留存和替换规则，明确候选与当前可用环境边界。

## Impact

research/package-set、src/sources 或独立运行模块、Git 忽略的归档与临时目录、受管配置、审计及 opt-in 启动验证。本项不引入查询侧执行能力。
