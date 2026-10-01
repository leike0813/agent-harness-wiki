# Tasks

本清单补录已授权迁移的完成情况。实现、迁移与启动验收已完成；空间验收仅记录了当前无净释放，快照轮换后的复测保留未完成。验证细节见 [ADR 0008](../../../docs/decisions/0008-managed-package-storage.md)，实际运行记录位于 Git 忽略的 `var/managed-packages/`。

## 1. Storage boundary

- [x] 1.1 新增 `src/sources/managed-storage.ts` 的严格配置、挂载、路径与权限判定，更新操作统一复用；集成测试确认配置缺失使用本地布局、配置无效及挂载缺失或来源错误均阻塞，不写未挂载路径。
- [x] 1.2 保持 SQLite 索引、WAL、projects 和控制状态本地，仅外置候选、运行包、store files/tmp 与安装缓存；迁移后核对四处链接、62 个远端目录及本地索引 `integrity_check=ok`。
- [x] 1.3 验证 NFSv4 有效及继承 ACL，修正本机专属树授权；真实 NFS 测试确认 mode 0755 下的隐藏具名写授权也被拒绝，小包实测确认沙箱可读及执行。
- [x] 1.4 同步 `.gitignore`、AGENTS、PRD、ADR 0008 与开发、包集说明，记录配置、权限和 hard NFS 边界；文档路径及格式检查通过。

## 2. Promotion and recovery

- [x] 2.1 update 使用本地操作锁；复用集成测试确认并发 update 被拒绝，操作结束后锁可再次取得。
- [x] 2.2 外置晋升保留完整快照，本地元数据和 NFS current 分别在同一文件系统原子替换；测试确认晋升后身份匹配、旧快照仍保留、本地固定 workspace 不被替换。
- [x] 2.3 用本地恢复记录保存旧指针与小型元数据，失败和中断后恢复一致状态；测试确认元数据写入失败恢复旧环境、遗留记录先恢复、逃逸恢复路径被拒绝。
- [x] 2.4 候选复核校验完整元数据和全部选中版本，阻止旧候选回滚其他产品；相关集成测试确认缺失、损坏、空或标量锁文件及其他产品身份变化均阻塞。
- [x] 2.5 同步 `harness-binary` Skill 的布局、恢复、历史保留与等待语义；核对其引用的 ADR、包集说明及实际 CLI 命令一致。

## 3. Startup and provenance

- [x] 3.1 当前检查与 bwrap 使用选中真实快照，包、入口和平台依赖限定在专属虚拟 store；本地及真实 NFS 集成测试确认正常启动、包或虚拟 store 逃逸被拒绝。
- [x] 3.2 来源审计接受受控外置布局并继续核对精确版本、integrity 与字节；集成测试确认正常审计、版本或 integrity 不一致及路径逃逸被拒绝。
- [x] 3.3 保持来源固定身份及知识发布独立，保留全部既有历史；迁移前后来源审计与入口结果一致，未修改知识、发布或历史版本映射。

## 4. Real migration and integrated acceptance

- [x] 4.1 记录迁移前目录、版本、启动、来源审计和 df 基线；记录存在于 migration-baseline、migration-audit-baseline 与 migration-state 工件。
- [x] 4.2 rsync 复制全部历史、当前完整包集及 store 字节，修正远端 ACL；64 个校验式 dry-run 范围无差异，ACL 修正记录通过。
- [x] 4.3 切换配置与链接，复核真实当前入口、审计、候选晋升与失败恢复后仅清理已核对本地副本；验收记录确认 25 个入口与 26 项审计通过，既有 3 个未选中及 1 项旧 OpenCode 阻塞保持基线。
- [x] 4.4 运行类型检查、lint、格式检查及构建，以及真实 NFS 和 bwrap 下的受管包、来源审计集成测试；这些检查通过，相关两份测试共 49 项通过，未跳过 NFS 验收。
- [x] 4.5 实测远端包文件与硬链接、本地 SQLite 及 bwrap 的配合；小包记录确认相同 inode、链接数 2、SQLite 完整性正常和 UID 65534 禁网启动成功。
- [x] 4.6 同步后记录真实 df 差值并只读核对 Btrfs 保留策略；已用空间增加 1,065,721,856 字节，未报告虚假的释放量，14 份迁移前快照及每日成功后保留 14 份的策略已记录，未修改备份。

## 5. Change traceability and remaining space acceptance

- [x] 5.1 补齐 proposal、design 与三份 delta specs；以迁移前 Git HEAD 为基线，逐条核对新增和修改要求与主规格一致，不覆盖工作区已有改动。
- [x] 5.2 运行 `openspec validate migrate-managed-packages-to-nfs --strict`、change 文档格式与 `git diff --check`；严格验证和格式检查通过，delta 的 10 个要求与主规格语义一致。主规格已有新增要求，CLI 的重复归档提示及后续 `--skip-specs` 处理已记录在 design。
- [x] 5.3 迁移前 Btrfs 快照自然轮换后重新测量本地 df，记录实际净释放量并更新 ADR 与验收记录；若每日备份和清理成功，最后一份旧快照预计 2026-10-15 轮换，本项尚待时间条件满足。
