# Proposal

## Why

本机受管候选、备份、当前运行包与 pnpm store 文件累计约 129.3 GB，需要迁到 NFS 缓解本地占用，同时保留全部既有历史。pnpm 11.10.0 的 SQLite WAL 索引需要留在本地，迁移还必须维持精确版本、来源审计和隔离启动边界。

本 change 补录本次已授权并已实施的迁移：对应三个主规格已在同一工作区更新，delta 以迁移前的 Git HEAD 为基线。实施和启动验收已通过，磁盘空间尚未净释放，Btrfs 快照轮换后的复测单独记录为待办。

## What Changes

- 新增忽略的本机 `storage.json`，统一选择本地或 NFS 布局；无效配置、挂载身份、权限或真实路径不符时报阻塞，仅配置不存在时使用本地布局。
- 远端保留完整候选快照和既有备份，`current` 原子切换快照；本地逻辑路径通过链接定位远端字节。仅 store 的 `files`、`tmp` 外置，SQLite 索引、WAL、项目登记及控制文件留本地。
- 晋升使用本地操作锁、元数据原子替换和恢复记录，失败恢复旧包集；中断后的下一次更新先恢复，未恢复时阻止当前环境检查和新晋升。
- 来源审计接受受控远端快照，包和入口仍不得逃出专属虚拟 store；bwrap 只读绑定已解析的真实快照。
- 修正并核验 NFSv4 有效及继承 ACL，保持仅维护者可写、沙箱 UID 65534 可读取及执行；说明 hard NFS 文件操作可能持续等待。
- 同步 Skill、AGENTS、PRD、包集说明、开发文档与 ADR；记录真实迁移校验、启动及审计结果，按实际 `df` 差值报告空间，保留 Btrfs 备份策略。

## Capabilities

### New Capabilities

无。扩展既有受管包与来源能力。

### Modified Capabilities

- `managed-artifact-startup`: 存储配置、挂载与权限边界、完整快照、真实路径隔离启动、晋升恢复和 hard NFS 等待语义。
- `harness-binary`: Skill 遵循当前存储布局、恢复及历史保留规则，布局失效时阻塞。
- `source-provenance`: 通过本地精确身份与受控快照定位包字节，保留固定来源及历史，`current` 不作为固定来源身份。

## Impact

涉及 `src/sources/managed-storage.ts`、`managed.ts`、`audit.ts`，既有受管包和来源审计集成测试，三份规格及相关文档、Skill、忽略规则。本机包字节部署到 `/mnt/Data/agent-harness-wiki/managed-packages/`，配置与实际验收见 ADR 0008。

不新增 npm 依赖；NFSv4 权限检查使用已安装的 `getfattr`，本次 ACL 修正使用 `setfattr`。CLI 命令、知识逻辑路径及本地发布查询契约保持一致。受管二进制运行和维护依赖 NFS 可用性；本 change 不增加自动历史删除策略，不删除 Btrfs 快照，不修改备份策略，也不变更已有知识版本或发布。
