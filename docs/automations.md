# 自动化

每日巡检由 [harness-monitor](../.agents/skills/harness-monitor/SKILL.md) 执行：观察已收录产品的上游来源，把变化交给维护 Skill 处理，校验后更新每日滚动的 pull request。本文件记录调度参数与启用顺序；调度器的实际注册由维护者在编排工具侧完成，Skill 自己不做编排工具的写入。

## 每日巡检

| 参数       | 值                                                    |
| ---------- | ----------------------------------------------------- |
| 名称       | `daily-harness-monitor`                                             |
| 技能       | `harness-monitor`                                     |
| 时区       | `Asia/Shanghai`                                       |
| 时刻       | `02:00`                                               |
| 宽限       | 60 分钟                                               |
| 会话       | `--fresh-session`，每轮全新会话                       |
| 工作区     | 固定专用 worktree，与主工作区分离                     |
| provider   | `codex`                                               |
| 协调者模型 | `.codex/config.toml` 声明的模型，经可信项目继承       |
| 子代理模型 | `minimax-cn/MiniMax-M3.1-Flash-Preview`（唯一，串行） |

宽限 60 分钟表示当次错过后仍可在窗口内补跑；补跑与正常轮次走同一流程，会话锁保证同一时刻只有一个实例。

工作区必须是专用 worktree 且处于干净状态：巡检要落本地提交并推送分支，共用主工作区会把维护者的未提交改动卷进 PR。

每轮用全新会话：会话历史里的临时路径、判断过程和失败中间态都不进入下一轮。

协调者模型在项目 `.codex/config.toml` 中声明，经可信项目继承，所以巡检会话与它的维护子代理用同一套模型配置。子代理模型另外在每次委派时显式写明，不按可用性回退。

滚动 PR：未合并时每天在同一分支上更新同一个 PR，合并后下一轮另开分支。合并后既有 CI 自动完成发布，维护者不需要再手动跑一次本地发布或受管二进制核对。

## 启用顺序

每日调度先注册为禁用状态，启用前完成三项核对：

1. 巡检依赖的仓库内命令已在 `main` 上可用：`pnpm sources:check`、`pnpm sources:workspace open`／`close`、`pnpm monitor:session start`／`finish`。
2. 项目模型在 `.codex/config.toml` 中已配置并实测可用，`minimax-cn/MiniMax-M3.1-Flash-Preview` 能被原生 subagent 工具选中。
3. 维护者在 Codex 首次打开专用工作树时确认信任该目录，使项目模型配置能够加载。目录信任涉及用户级配置，由维护者确认。

三项都通过后，手动触发一次巡检验证整条链路（会话锁、只读观察、串行委派、闸门、推送），再打开每日调度。链路未验证时保持禁用，不用一次真实调度去试基础设施。

当前本机注册：工作树为 `/home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor`，自动化 ID 为 `93f32c61-1d0d-4da3-97ac-3861a74af596`，初始状态为禁用。该工作树与已复制的现有依赖合计约 349 MiB，未检出任何上游源码；每轮的源码检出和验证产物在临时目录中使用后释放。首次 Orca 手动启动已到达目录信任提示，完整维护试跑尚待确认信任及合入实现 PR。

## 会话锁

每轮用 `pnpm -s monitor:session start --owner-pid "$PPID"` 起会话：`-s` 让 stdout 只剩 JSON（`id`、`projectRoot`、`ownerPid`、`tempRoot`、`reportPath`），`--owner-pid` 传本轮长期存活的 codex 进程 PID，命令会校验它存活。原生工具执行的 shell 里 `$PPID` 就是该 codex 进程，来源工作区的 `--owner-pid` 用返回的 `ownerPid`。

互斥是一条持久锁记录，写在 `var/harness-monitor/session.sqlite` 的单行 `session` 表里。`start` 在一个 immediate 事务里读旧记录、判活、写入本次记录，读判与写入同属一个事务，并发的过期 owner 回收因此不会互相踩到。记录里的 owner 仍存活时本轮不启动第二个实例，命令非零退出；owner 已死则释放它留下的临时目录后接管。命令随后对本项目已无存活 owner 的来源工作区做一次回收。没有守护进程、没有超时，锁活到 `pnpm -s monitor:session finish <id>`。

来源租约按记录里的 owner 身份管理：回收只处理 owner 已不存活的工作区，不碰仍存活 owner 持有的工作区。巡检自己开的工作区由父进程按记下的 `id` 显式关闭，并且关在独立复核之后——读完第一遍就释放，会让复核失去可复看的原件。

收尾先用 `sources:workspace list --owner-pid <ownerPid>` 找齐本轮工作区并逐个关闭，再把结果写进 `var/harness-monitor/latest.json`，最后 `finish`。报告只保留最近一次运行，不按天归档；它在会话临时目录之外，`finish` 后仍然有效。

## 与手动维护的关系

巡检只更新 pull request，不切换本地发布指针，不更新受管二进制。PR 由维护者手动合并，合并触发既有 CI 自动发布。

手动调用 `$harness-maintenance` 仍按本地发布流程走：暂存构建、验收后 `pnpm ahw publish` 切换指针，并按 ID 模式核对受管二进制。这条路径与巡检并存，各自按自己的交付方式收尾。

来源原件的保留策略不因巡检改变：读过的源码文件用 `git_source_file` 记录 `commit`、`file` 与 `content_sha256`，不保留 checkout；官方文档原件用 `archived_document` 加 `archive_path` 留在归档。巡检每轮只清理本轮登记的来源工作区与临时输出，不删除既有归档。
