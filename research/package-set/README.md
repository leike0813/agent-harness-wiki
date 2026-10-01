# 受管 CLI 包集

`package.json` 和 `pnpm-lock.yaml` 记录当前选中版本及依赖闭包，是 Git 跟踪的本机包集身份；`node_modules` 定位 Git 忽略的实际字节，配置 NFS 后链接到远端当前快照。官方 npm 渠道、Linux/x64/glibc 直接入口和运行时登记在 `src/sources/managed.ts`。不要通过 `.bin` 占位命令判断 Claude Code 或 OpenCode 是否可运行。

NFS 布局契约与本机迁移验收见 [ADR 0008](../../docs/decisions/0008-managed-package-storage.md)：

- `var/managed-packages/storage.json`（Git 忽略）严格记录三个必填字符串字段：`bytesRoot=/mnt/Data/agent-harness-wiki/managed-packages`、`mountPoint=/mnt/Data`、`mountSource=192.168.13.89:/mnt/WorkData/Data`。仅文件不存在时保持本地行为；不可读、损坏、缺项、未知字段或无效值均阻塞，不回退本地。
- 远端 `<bytesRoot>/candidates/<UUID>/` 保存完整包集快照，含 `package.json`、`pnpm-lock.yaml`、`pnpm-workspace.yaml` 和完整 `node_modules/`；`<bytesRoot>/current -> candidates/<UUID>` 用同目录临时链接经 rename 原子替换。晋升保留整个快照，安装失败的未完成候选不能晋升。
- `pnpm-workspace.yaml` 是 Git 跟踪的本地固定配置，创建候选时复制入快照，晋升不替换；晋升校验候选的 `package.json`、`pnpm-lock.yaml` 和 `node_modules`。
- 本地 `research/package-set/node_modules` 链接到 `<bytesRoot>/current/node_modules`；`var/managed-packages/candidates` 链接到 `<bytesRoot>/candidates`。
- pnpm store 的 `.pnpm-store/v11/files` 与 `tmp` 分别链接到远端 `store/v11/files` 与 `tmp`；`index.db`、WAL 和 `projects/` 登记留在本地。清单、锁文件、操作锁、审计、小文件备份和恢复记录也在本地。

从仓库根目录执行：

```bash
pnpm managed:packages observe
pnpm managed:packages check-current
pnpm managed:packages update opencode
pnpm managed:packages update opencode <candidate-id>
```

`observe` 读取官方 registry 元数据并记录 latest 的精确版本、integrity、观察时间、回退或同版漂移。`check-current` 对选中的真实包集做 bwrap 离线版本检查；核对官方 integrity 的阶段可能联网，禁网约束适用于沙箱内启动。`update <harness-id>` 按生效布局安装候选，保持 `--ignore-scripts`，核对主包及平台依赖的官方 integrity，并检查所有选中 CLI（含本次候选）。NFS 模式全部通过后才原子替换 `current` 并同步本地包集文件；未配置 NFS 时使用本地候选和项目 store。历史、失败候选和 store 字节不自动清理。

接触远端字节前校验实际 NFS 挂载点、来源、权限和真实路径边界，不能将同名本地目录当作已挂载存储。候选、`current` 和 store 链接须落在约定目录，入口及平台依赖须留在选中快照的 `node_modules/.pnpm/` 内。隔离启动固定真实快照并只读绑定进禁网 bwrap（`--unshare-all`、非 root、临时 HOME/配置根/工作区、有界时间与输出），不经可变化的 `current` 路径绑定。

NFSv4 模式需本机 `getfattr` 核对有效及继承 ACL，写入、删除和更改授权只允许 `OWNER@`。目录显示 `0755` 仍可能含额外具名授权；专属树的 ACL 与新建对象继承规则须按 ADR 配置，不能只依赖 `chmod` 或 `umask`。

修改包集状态的 `update` 使用本地操作锁；`check-current` 读取包集，遇恢复记录时报阻塞，`observe` 只观察元数据，两者不持 update 锁。晋升前恢复记录保存旧指针和本地 `package.json`、`pnpm-lock.yaml` 两个文件的旧内容；指针替换与本地文件更新不是跨文件系统原子事务。失败据备份恢复，中断后下一次 `update` 先恢复再观察或安装；恢复未完成时保留备份和记录并阻止新晋升。hard NFS 断连可使文件操作和恢复持续等待，子进程超时不能证明这些操作已结束或已回滚。

审计 JSON 记录实际入口、运行时、bwrap 参数、退出状态及有界输出。启动只证明制品在此隔离条件下能响应版本命令，不证明知识主题能力，也不参与知识发布。当前平台边界为 Linux/x64/glibc；其他平台需单独登记入口与隔离方案。

首次接入与后续更新由 [harness-binary](../../.agents/skills/harness-binary/SKILL.md) Skill 统一执行：先确认 `registry/sources/` 已有该产品的官方 `npm_registry` 来源，并在 `src/sources/managed.ts` 的 `managedPackages` 登记包名、直接入口、运行时、`identity` 与平台依赖，再运行 `pnpm managed:packages update <harness-id>`。非 npm 分发的产品报告 unsupported。
