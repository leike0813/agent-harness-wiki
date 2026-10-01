# 0008 — 受管包共享存储布局

状态：accepted  
日期：2026-10-01  
对应：PRD §3、§8，OpenSpec `managed-artifact-startup`、`harness-binary`、`source-provenance`

## 背景

本机迁移前的历史候选约 114 GiB，当前包集约 6.3 GiB，pnpm store 约 5.8 GiB。迁移动机是缓解这台主机的磁盘占用，同时保留历史候选。已批准的方案将包字节和 pnpm store 的文件内容移到 NFS，保留本地清单、锁文件、SQLite 索引与操作状态；存储位置不改变制品身份或知识查询边界。

## 决策

本机 `var/managed-packages/storage.json`（Git 忽略）是存储配置入口，本次部署使用以下内容：

```json
{
  "bytesRoot": "/mnt/Data/agent-harness-wiki/managed-packages",
  "mountPoint": "/mnt/Data",
  "mountSource": "192.168.13.89:/mnt/WorkData/Data"
}
```

配置严格校验这三个必填字符串字段，拒绝未知字段和无效值。仅文件不存在时保持本地行为；文件不可读、JSON 损坏或字段无效均报阻塞，不静默回退。远端布局仅在配置有效且挂载校验通过时使用：

- `<bytesRoot>/candidates/<UUID>/`：完整包集快照，含 `package.json`、`pnpm-lock.yaml`、`pnpm-workspace.yaml` 和完整 `node_modules/`。成功晋升保留整个快照；安装失败的未完成候选也保留，不能作为完整快照晋升。
- `<bytesRoot>/current` → `candidates/<UUID>`：用同目录临时符号链接经 rename 原子替换；候选目录与包字节不搬走、不覆盖。
- `<bytesRoot>/store/v11/files`、`store/v11/tmp`：pnpm store 的共享字节。

本地布局：

- `research/package-set/{package.json,pnpm-lock.yaml}`：Git 跟踪的选中包集身份，晋升时更新。`pnpm-workspace.yaml` 是 Git 跟踪的本地固定配置，创建候选时复制进快照，晋升不替换它。
- `research/package-set/node_modules` → `<bytesRoot>/current/node_modules`。
- `var/managed-packages/candidates` → `<bytesRoot>/candidates`。
- `.pnpm-store/v11/files`、`.pnpm-store/v11/tmp` → 远端 store 对应目录；`.pnpm-store/v11/index.db`、WAL 和 `projects/` 登记留在本地。不能将整个 `.pnpm-store/v11/` 链接到 NFS。
- `var/managed-packages/` 下保留本地 update 操作锁、审计、小文件备份与恢复记录；锁串行化本机修改包集状态的 update 操作。`check-current` 读取包集，遇未完成恢复记录时报阻塞；`observe` 只观察元数据，两者不持 update 锁。

接触远端字节前校验实际 NFS 挂载点和来源，不能仅凭 `/mnt/Data` 目录存在判断已挂载。校验 `bytesRoot` 的真实路径位于该挂载内，以及目标读写权限、沙箱所需的读取与执行权限。候选、`current` 和 store 链接必须解析到约定目录，包入口及平台依赖必须留在选定快照的 `node_modules/.pnpm/` 内；校验失败报阻塞，不能写入未挂载时的本地同名目录。隔离启动固定解析出的真实快照，只读挂载进禁网 bwrap，不经可变化的 `current` 路径绑定。

update 取得本地操作锁，并先处理遗留恢复记录。晋升校验候选的 `package.json`、`pnpm-lock.yaml` 和 `node_modules`；workspace 配置在创建候选时由本地固定文件复制。官方身份核验和全部选中 CLI 隔离启动均通过后，本地恢复记录保存旧 `current` 目标，以及 `package.json`、`pnpm-lock.yaml` 两个文件的晋升前内容，先原子替换本地清单和锁文件，再原子替换远端指针，最后删除恢复记录。远端指针与本地文件不是跨文件系统事务；恢复记录存在期间读取报阻塞。

晋升失败时用本地备份和旧指针恢复上一个一致包集。中断后下一次更新先恢复再观察或安装新候选；恢复未完成时保留备份和记录并阻止新晋升，不报告成功。恢复不移动或删除远端快照。历史、失败候选和 store 字节不自动清理。

hard NFS 断连时，读取、写入、rename 和恢复操作都可能持续等待。子进程超时不保证内核文件操作已结束，也不保证已回滚；操作未结束时不能宣称失败已恢复或释放操作锁后发起另一次晋升。

NFSv4 权限检查还需本机 `getfattr`。专属目录的有效及继承 ACL 仅允许 `OWNER@` 写入、删除或更改授权；具名用户、组或 `EVERYONE@` 的额外写授权均报阻塞。`chmod 0755` 与安装进程的 `umask` 不能替代 ACL 检查。本 NAS 的继承规则会覆盖新对象的创建模式，迁移时用本机 `setfattr` 将专属树的 ACL 设为所有者可写、其他身份可读及按原执行位执行，目录继承同样的规则；不改变包文件内容或链接目标。

## 影响

- pnpm store 的 SQLite 索引与登记留在本地；远端承载文件内容和完整快照。
- 符号链接只定位字节，不改变包名、精确版本和 integrity；固定来源身份不能绑定可变化的 `current` 指针。
- 保留全部历史候选会持续占用共享存储；是否清理由维护者显式决定，工具不自动执行。
- 历史 ADR 0005 的人工清理安排由本决策的保留策略替代。

## 本机迁移验收（2026-10-02）

已迁移全部 61 个既有候选及备份目录，另存当前包集为完整快照，共 62 个远端目录；`current` 指向 `candidates/aca497ca-24dd-4181-b795-ac4fe9a18cac`。本地四处链接已启用，SQLite 索引仍在本地，`integrity_check` 返回 `ok`。复制后的 64 个校验式 dry-run 范围均无差异，覆盖约 129.3 GB 的文件内容、链接和执行权限；完成 NAS ACL 修正后才切换环境，验收后仅清理本次已核对的本地副本。

真实 NFS 与 bwrap 集成测试共 49 项通过，覆盖候选晋升、元数据写入失败恢复、中断恢复、挂载身份及路径阻塞、隐藏 ACL 写授权拒绝。小包实测确认远端 store 硬链接、本地 SQLite 索引和 UID 65534 禁网执行可配合工作。迁移前后当前入口均为 25 项启动成功、3 项未选中；来源审计均为 26 项通过、1 项既有阻塞。既有阻塞是 OpenCode 历史来源 `opencode-ai@1.18.32` 的选中路径不可用，当前选中版本为 `1.18.33`，本次未改变其知识记录。

空间验收尚未达到净释放目标。同步后本地 `df` 已用空间从 418,246,209,536 字节变为 419,311,931,392 字节，差值为增加 1,065,721,856 字节；不能将迁移的文件大小报告为已释放空间。本地副本已删除，未发现本项目已删除但仍打开的文件。

维护者提供的只读清单显示 `/home/.btrfs-snaps` 尚有 14 份迁移前快照，日期为 2026-09-18 至 2026-10-01（子卷 ID 541–554）。Btrfs 快照共享原文件的数据块，因此这些快照很可能仍引用旧包字节；快照目录为 root `0700`，本次未逐一读取其中的包目录，不能精确归因每份快照的占用。

已只读核对 `btrfs-snap-backup.timer` 与 `/usr/local/sbin/btrfs-snap-backup.sh`：每天本地时间 03:30 创建快照，在 root 与 home 的冷盘 send/receive 都成功后保留最新 14 份。若每日备份及清理持续成功，最后一份迁移前快照预计在 2026-10-15 轮换；空间回收仍取决于其他引用和 Btrfs 回收进度。本次未修改快照、备份脚本或保留策略。实际记录保存在 Git 忽略的 `var/managed-packages/migration-{state,acceptance,layout-after,checksum-status,acl-status}.json`。

## 技术依据

pnpm 11.10.0 的 [store 索引源码](https://github.com/pnpm/pnpm/blob/v11.10.0/pnpm11/store/index/src/index.ts) 在 `index.db` 启用 SQLite WAL；[SQLite 的网络文件系统说明](https://www.sqlite.org/useovernet.html) 解释了远端文件锁与同步的限制，因此索引及其 WAL 保持本地。Linux [nfs(5)](https://man7.org/linux/man-pages/man5/nfs.5.html) 规定 hard 请求无限重试，本次不改变挂载选项。

[RFC 7530 §6.2、§6.4](https://www.rfc-editor.org/rfc/rfc7530) 定义 NFSv4 的 ACL 授权、继承，以及 ACL 与 mode 的交互。权限检查同时核对两者；迁移前的小包实测已复现 mode 为 `0755`、具名及继承 ACL 仍含额外写授权的情况。

[Btrfs 子卷说明](https://btrfs.readthedocs.io/en/latest/btrfs-subvolume.html) 说明快照与原子卷共享数据块，删除子卷后的数据回收也可能延迟完成。
