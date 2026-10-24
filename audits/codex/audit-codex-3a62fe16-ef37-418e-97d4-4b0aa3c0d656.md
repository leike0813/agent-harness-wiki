# audit-codex-3a62fe16-ef37-418e-97d4-4b0aa3c0d656

- 产品：`codex`；主题：`local_transcripts`；固定问题：`transcripts.archive`、`transcripts.database`、
  `transcripts.format`、`transcripts.location`、`transcripts.naming`
- 观察：`source-codex-repo` 基线 `1f7fe9b0`，观察到 `2f3fb111be71d277c80bd5b96d9019748b921f5a`；
  本章 v1 的旧引用固定在更早的 `822e58cc3d666166c7446c5b1ea2e52f5d09594c`
- 交付：新 edition `codex-local_transcripts-v2`，`codex-local_transcripts-v1` 原样保留并切换 current

## 来源变化与 triage

Git 提交 `2f3fb111` 一次 squash 改动 1772 个文件。与本章旧引用相关的路径逐个比对：

| 文件 | 变化 | 判断 |
| --- | --- | --- |
| `codex-rs/state/src/sqlite.rs` | logs 库改走 `logs_home()`；新增 `memories_v2_1.sqlite`；空库初始化 incremental auto_vacuum + WAL；`retry_on_busy`、5 秒 busy_timeout | 机制级，重写 database/location |
| `codex-rs/cli/src/migrate_nfs_db.rs`（新） | `codex migrate-nfs-db`：WAL → DELETE 就地迁移、确认、全客户端停止、POSIX 锁、`--staging-dir` | 机制级，新增 database 段落 |
| `codex-rs/cli/src/migrate_nfs_db/replacement.rs`（新） | 备份目录 `<库路径>_wal_migration_backup/`、`delete.sqlite` 暂存 | 机制级，证据 |
| `codex-rs/rollout/src/compression.rs` | 压缩/物化保留 owner、权限、mtime；物化临时文件改 `.rollout-materialize-`；发布取线程 writer 锁；新增 `compression/{access_metadata,read_diagnostics}.rs` | 机制级，重写 format 段落；常量未变 |
| `codex-rs/rollout/src/recorder.rs` | `open_log_file` 仅在明文不存在时刷新 mtime，ACL 拒绝时间戳视为可接受；`SessionMeta`/`Compacted` 改 Box；新增 `unpersisted_session_meta` | append 规则变化，format 重写 |
| `codex-rs/history/src/lib.rs` | `RolloutItem::SessionMeta/Compacted` 改 Box（wire 不变） | 非语义变化，不重写 schema 结论 |
| `codex-rs/protocol/src/protocol.rs` | `SessionMeta` 字段未变；新增 `PrivateSessionEvent`、`HookEventName::{Pre,Post}ModelRequest` | 与本章无关 |
| `codex-rs/thread-store/src/local/{archive_thread,delete_thread}.rs` | 未变 | archive/cleanup 结论保持 |
| `codex-rs/thread-store/src/local/rollout_lineage.rs` | 仅位移 | naming 结论保持 |
| `codex-rs/rollout/src/list.rs`、`list_files.rs` | 新增 `prefetch_sibling_rollout_paths`（同 thread 兄弟 rollout，上限 64） | 属分页历史加载优化，不改变命名规则，未写入命名结论 |
| `codex-rs/cli/src/doctor/thread_inventory.rs` | 仅测试改为 Box | 非语义变化 |
| `codex-rs/cli/src/main.rs` | 新增 `MigrateNfsDb` 子命令、`config_override_args`、app-server startup 参数 | 子命令枚举引用重定，archive 段落更新 |

`source-codex-cli-mcp-doc-learn` 与 `source-codex-cli-configuration-doc-learn` 本轮 changed，但属于
`mcp`／`configuration` 主题，不在本轮派发范围，未做语义判断。

## 逐问题结论

- `transcripts.location`：answered。sqlite home 三级来源与 `CODEX_SQLITE_HOME` 字面量可引用；库文件集合
  新增 `memories_v2_1.sqlite`；`logs_2.sqlite` 跟随 logs 目录（仅显式 `log_dir` 且 requirements 未固定
  `sqlite_home` 时，默认 `codex_home/log`），否则回落 `sqlite_home`；`codex_home/session_index.jsonl`
  路径确认。旧引用 `location-sqlite-db-files` 的"六库同目录"表述不再成立。
- `transcripts.naming`：answered，结论未变。`RolloutFileName` 三分量与渲染规则、`history_base`/`parent_thread_id`
  语义在 2f3fb111 上一致。
- `transcripts.format`：answered。信封、逐行追加、每线程一个文件、无分片均不变；新增/修正的压力点是
  mtime 刷新条件、ACL 容忍、压缩与物化的元数据复制与发布顺序、物化临时文件前缀、压缩发布锁。
- `transcripts.database`：partial（保留）。`threads` 表仍是元数据索引、`rollout_path` 指向正文、backfill
  可重建、`BackupAndRebuild` 恢复不变；新增 WAL/incremental 初始化、SQLITE_BUSY 重试与
  `migrate-nfs-db`。仍缺：除 `0001_threads.sql` 外的逐表角色、`thread_history_1.sqlite` 是否恢复硬依赖、
  迁移失败回滚细则。
- `transcripts.archive`：partial（保留）。归档移动、锁冲突与删除顺序未变；可移植性损失、删除级联范围、
  手动 `rm` 后的孤儿行仍无来源，照实保留缺口。

## 候选与自检

- 新增 9 组 `git_source_file` + `source_revision` 快照（`*-2f3fb111-*`）：`state/src/sqlite.rs`、
  `state/src/lib.rs`、`core/src/config/mod.rs`、`rollout/src/session_index.rs`、
  `cli/src/migrate_nfs_db.rs`、`cli/src/migrate_nfs_db/replacement.rs`、`rollout/src/recorder.rs`、
  `rollout/src/compression.rs`、`cli/src/main.rs`。只记 commit、文件与 `content_sha256`，未复制 checkout。
- 新增 19 条引用（`ref-codex-cli-transcripts-*-v2`），逐条校验摘录确实出现在声明的行区间、长度 ≤ 800。
- 旧引用文件全部保留；新 edition 不再引用 `location-sqlite-db-files`、`format-append-open`、
  `format-compression-constants` 等已被正确表述取代的条目。
- 自检：`pnpm -s maintenance:candidates check --candidate <candidate>` 通过。
- 未做独立复核：本轮无来源冲突，也不涉及跨主题的关键加载机制，按普通更新由作者自检填写。
  `review_status` 保持 `pending` 是本审计 `pending_audit_refs` 指向的旧审计仍未结案所致，不是本轮问题未完成。
