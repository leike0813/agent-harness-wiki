# 自动化

每日巡检由 [harness-monitor](../.agents/skills/harness-monitor/SKILL.md) 执行：观察已收录产品的上游来源，先判断知识影响，仅把需要调查的问题交给维护 Skill 处理，校验后更新每日滚动的 pull request。本文件记录调度参数与启用顺序；调度器的实际注册由维护者在编排工具侧完成，Skill 自己不做编排工具的写入。

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
| provider   | `omp`                                               |
| 协调者模型 | `.omp/config.yml` 的 `modelRoles.default`       |
| 子代理模型 | `minimax-code-cn/MiniMax-M3.1-Flash-Preview`（显式指定） |
| 维护并行 | 主 Agent 决定规模，每产品一个独立候选 writer |

宽限 60 分钟表示当次错过后仍可在窗口内补跑；补跑与正常轮次走同一流程，会话锁保证同一时刻只有一个实例。

工作区必须是专用 worktree 且处于干净状态：巡检要落本地提交并推送分支，共用主工作区会把维护者的未提交改动卷进 PR。

每轮用全新会话：会话历史里的临时路径、判断过程和失败中间态都不进入下一轮。

协调者模型由自动化工作树的 `.omp/config.yml` 中 `modelRoles.default` 声明。OMP 启动参数 `--model` 可覆盖该默认值，配置须放在实际运行工作树根目录。子代理模型另外在每次委派时显式写明，不按可用性回退。

滚动 PR：未合并时每天在同一分支上更新同一个 PR，合并后下一轮另开分支。合并后既有 CI 自动完成发布，维护者不需要再手动跑一次本地发布或受管二进制核对。

## 手动触发

`pnpm monitor:run` 是与每日调度等价的触发入口，走同一条 Skill、同一把会话锁、同一套交付闸门：

```sh
pnpm -s monitor:run start --owner-pid "$PPID"
pnpm -s monitor:run finish <session-id>
```

命令只做与 harness 无关的确定性前置：确认当前目录是 linked worktree 而非主工作区、确认工作区干净、`fetch origin`、决定并切换滚动分支、取得会话锁、运行一次只读观察并写入交接单给出的 `checksPath`。语义判断、隔离候选、复核、集成和 PR 更新仍由协调者按 `harness-monitor` Skill 执行。

因此触发它的是哪个 harness，取决于哪个 harness 发起了会话：在本项目 Skill 可见的会话里发起就用该会话的模型和子代理能力，不受编排工具支持的 harness 列表限制。命令本身不启动、不调用任何 harness，也不接受 harness 参数。

必须从专用 worktree 发起。会话锁写在各自的 `var/harness-monitor/session.sqlite`，主工作区持有的是另一条互不相关的记录；在那里运行既得不到正确互斥，也会把维护者的未提交改动卷进 PR。脚本据此直接拒绝主工作区并以非零退出。专用 worktree 还要有可用依赖，`pnpm install` 只在该 worktree 内执行一次。

前置不满足时命令只把原因写到 stderr，不切换分支、不留会话锁、不产出交接单。协调者报告原因并停止本轮。

每轮的来源观察只由该命令运行一次；协调者读取 `checksPath` 做 triage，不重复观察。

## 启用顺序

每日调度首次注册时保持禁用，启用前完成四项核对：

1. 巡检依赖的仓库内命令已在 `main` 上可用：`pnpm monitor:run start`／`finish`、`pnpm sources:workspace open`／`close`、`pnpm maintenance:candidates prepare`／`check`／`plan`。
2. 专用工作树已同步到当前 `origin/main`，其中确有上述命令。工作树停在旧提交时入口命令尚不存在，巡检无法启动；快进到最新 `origin/main` 即可，本次入口改动没有新增依赖，无需重装 `node_modules`。
3. 项目模型在 `.omp/config.yml` 中已配置并实测可用，`minimax-code-cn/MiniMax-M3.1-Flash-Preview` 能被原生 subagent 工具选中。
4. 在专用工作树运行 `omp config get modelRoles`，确认 `default` 是 `minimax-code-cn/MiniMax-M3.1-Flash-Preview`，并核对 Orca 启动参数没有覆盖它。

四项都通过后，手动触发一次巡检验证整条链路（会话锁、只读观察、影响判断、隔离并行候选、聚合闸门、推送），再打开每日调度。链路未验证时保持禁用，不用一次真实调度去试基础设施。

当前本机注册：工作树为 `/home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor`，自动化 ID 为 `93f32c61-1d0d-4da3-97ac-3861a74af596`，宿主为 `omp`，使用全新会话，状态为已启用（2026-10-08 核对）。该工作树与已复制的现有依赖合计约 349 MiB，未检出任何上游源码；每轮的源码检出和验证产物在临时目录中使用后释放。

全链路已完成一次真实巡检并合入 `main`：分支 `automation/harness-monitor/20261004T061205Z`，PR #11，观察 50 个产品。该分支已合入，按滚动规则不复用；工作树当前停在该已合入分支上，下一轮从 `origin/main` 切新分支。OMP 宿主切换后的整轮巡检尚未在本次配置调整中验证。

## 会话锁

每轮用 `pnpm -s monitor:run start --owner-pid "$PPID"` 启动：命令在前置检查、分支切换和观察之后取得会话锁，stdout 是交接单 JSON。`--owner-pid` 传本轮长期存活的协调者进程 PID，命令会校验它存活。原生工具执行的 shell 里 `$PPID` 就是该协调者进程，来源工作区的 `--owner-pid` 用交接单里的 `ownerPid`。

互斥是一条持久锁记录，写在 `var/harness-monitor/session.sqlite` 的单行 `session` 表里。`monitor:session start` 在一个 immediate 事务里读旧记录、判活、写入本次记录，读判与写入同属一个事务，并发的过期 owner 回收因此不会互相踩到。记录里的 owner 仍存活时本轮不启动第二个实例，命令非零退出；owner 已死则释放它留下的临时目录后接管。命令随后对本项目已无存活 owner 的来源工作区做一次回收。没有守护进程、没有超时，锁活到 `pnpm -s monitor:run finish <id>`。

来源租约按记录里的 owner 身份管理：回收只处理 owner 已不存活的工作区，不碰仍存活 owner 持有的工作区。巡检自己开的工作区由父进程按记下的 `id` 显式关闭，并且关在独立复核之后——读完第一遍就释放，会让复核失去可复看的原件。

收尾先确认所有 worker 与 reviewer 已停止，再用 `sources:workspace list --owner-pid <ownerPid>` 找齐本轮工作区并逐个关闭，把结果写进 `var/harness-monitor/latest.json`，最后 `finish`。等待超时不能作为停止的依据；仍在使用的候选、原件和会话目录保留。报告只保留最近一次运行，不按天归档；它在会话临时目录之外，`finish` 后仍然有效。

## 判断与隔离候选

`requires_maintenance` 和 `impacts` 是初步候选。父进程读相关 diff 与固定问题，记录 `investigation_notes`：版本元数据、无关代码与排版变化可直接结案；可能改变配置路径、字段、加载条件、来源定位或版本映射的变化交给维护。影响不明先限定入口，沿证据扩展；失败无修复线索只记 blocked，同一阻塞没有新证据不重复派发。旧 pending 只恢复可执行的未完成问题。

父进程先固定 observation 和必要的原件，再用候选工具创建每产品独立 dataset。worker 读取输入且不重新扫描，只写自己的候选；高影响复核由父进程调度，使用相同固定来源。工具合并 catalog 的产品和引用、产品 × 主题选章以及该产品的知识与审计，相关基线变化或 ID 冲突拒绝该产品，其他完成内容继续。输出是临时数据与 before/after 清单，由父进程通过内置编辑工具集成到工作区；之后走统一 PR 闸门。

## 与手动维护的关系

巡检只更新 pull request，不切换本地发布指针，不更新受管二进制。PR 由维护者手动合并，合并触发既有 CI 自动发布。

手动调用 `$harness-maintenance` 仍按本地发布流程走：暂存构建、验收后 `pnpm ahw publish` 切换指针，并按 ID 模式核对受管二进制。这条路径与巡检并存，各自按自己的交付方式收尾。

来源原件的保留策略不因巡检改变：读过的源码文件用 `git_source_file` 记录 `commit`、`file` 与 `content_sha256`，不保留 checkout；官方文档原件用 `archived_document` 加 `archive_path` 留在归档。巡检每轮只清理本轮登记的来源工作区与临时输出，不删除既有归档。
