# 0012 — 每日巡检编排与临时来源工作区

状态：accepted（每日调度保持禁用，启用条件见文末）
日期：2026-10-03
对应：PRD §3、§7、§9、§10，OpenSpec `daily-harness-monitor`

## 背景

上游观察此前只在维护者手动调用 `harness-maintenance` 时发生，调查 Agent 需要自己准备临时 checkout、自己找包字节、自己决定交付方式。观察与采写混在同一次调用里，使得「今天哪些来源变了」和「知识是否值得发布」两个问题无法分开回答，来源原件也会随每次手工调查散落在仓库内外各处。

本决定把每日观察固定下来，并把来源读取改成一次性、受管、可回收的临时工作区。调度与知识判断仍由既有 Skill 承担，编排层不重复实现章节语义。

## 调度、工作区与会话

每日巡检由编排工具侧的固定调度项执行：时刻 02:00，时区 `Asia/Shanghai`，宽限 60 分钟。宽限表示错过的轮次可在窗口内补跑，补跑与正常轮次走同一条流程。

互斥使用项目已有 SQLite 的事务记录 owner PID、报告路径与临时根目录，不引入常驻进程。`monitor:session start` 原子取得运行锁；已有 owner 存活时拒绝启动，owner 已死亡时接管并释放旧临时输出，同时回收本项目已死亡 owner 的源码工作区。正常收尾先显式关闭本轮源码工作区，再用 `monitor:session finish` 释放临时输出和运行锁。

巡检在编排工具管理的固定专用 worktree 中运行，该 worktree 不属于主工作区、必须干净。每轮以全新会话启动，不复用上一轮上下文：会话历史里的临时路径、判断过程和失败中间态都不进入下一轮。

主会话通过项目 `.codex/config.toml` 选择 `minimax-cn/MiniMax-M3.1-Flash-Preview`，此配置也作用于其他可信项目会话。维护与独立复核 Subagent 在原生工具的模型参数中显式选择同一模型。主 Agent 决定维护与复核的并行规模，每产品一个 worker 写入独立候选，共享 catalog 与当前章节选择由主 Agent 合并。

## 观察范围与基线

观察范围是 catalog 与 registry 的交集：catalog 中已声明登记、且存在 `registry/harnesses/<product-id>.yaml` 的产品。catalog 候选没有登记来源，不进入本轮。

同一产品内的多个来源可以并发读取，通过必要性判断的产品在独立候选中并行维护，任一产品失败不影响其他产品继续。观察区分三类身份——登记 Git 的精确 HEAD、登记官方文档的固定内容、登记 npm 的 latest 版本与 integrity——并把未结案的旧审计一并读出。`sources:check` 是只读入口，与 `sources:scan` 共享同一基线和审计目录，不写文件、不下载包字节、不创建 clone；父进程按同一 schema 固定观察与审计，需要保留文档候选时在委派前完成。

## 委派与交付

按产品 id 稳定排序，先检查实际变化、固定问题和现有章节的关系。`requires_maintenance` 与 `impacts` 仅提示候选：单纯 npm 版本变化、无关代码与排版变化可由父进程记录理由并结案审计；配置字段、加载条件、来源定位和版本映射的实质线索触发定向维护。影响不明先检查相关入口，再按证据扩展；来源失败无修复线索只保留 blocked，重复阻塞无新证据不重复派发。旧 pending 只恢复未完成且可执行的问题。

对每个需要调查的产品至多委派一次，传入已固定的 observation、问题范围、候选 root、原项目根目录与 owner PID、`role=worker`、`delivery=pr`。worker 不重新扫描来源，只编辑自己的候选。`maintenance:candidates prepare/check/plan` 复用已有校验器，裁剪单产品 dataset，在候选外保留基线副本，生成临时聚合数据与 before/after 清单；按产品合并 catalog、来源、章节、审计及产品 × 主题选章，不用裁剪文件覆盖共享真源。基线变化、范围越界和 ID 冲突拒绝相关产品，其他已完成内容继续。父进程用内置编辑工具集成，手动 local 模式统一发布一次；不新增调度框架或依赖。

高影响复核由父进程协调，复核 Agent 读取同一候选和固定原件。全部 worker 与 reviewer 确认停止后才集成、发布和清理；等待超时不代表使用者停止。来源工作区以原项目根目录与长期存活的 coordinator PID 登记，任务记录唯一 workspace ID；并行期间只按任务 ID 管理，整轮列表清理放在最后。

`delivery=pr` 轮次只做调查、采写、自检与审计：它不切换本地发布指针，不运行 `pnpm ahw publish`，不调用 `harness-binary`，不更新受管二进制。PR 合并到 `main` 后的对外发布由既有发布 CI 处理，不需要维护者再补一步；受管二进制是独立流程，不在巡检范围内，合并后也不会被自动触发。

交付单位是一个持续存在的滚动 PR，分支 `automation/harness-monitor/<UTC 时间戳>`：PR 合并前，后续每日轮次都 fetch `origin`、切回这条已开分支、普通合并 `origin/main` 后继续提交，而不是每天新开一条分支。候选上限落在这个未合并 PR 的整体上：同一个产品 × 主题在 PR 里最多有一个候选，当天的新变化直接修订已有候选，不追加第二个 edition／topic，也没有任何顺延或丢弃。PR 内容始终是该分支与 `main` 的全部差异。合并按普通合并处理，不 force push、不 rebase 已推送分支、不改写 `main` 历史。

闸门按 `knowledge:validate`、`sources:audit-log`、`git diff --check`、`verify` 顺序执行，本轮完整验证只跑一次，随后在干净生产输入上做在线构建与独立校验。任一闸门失败都不推送，保留本地提交与报告等待维护者处理；本轮无变化时不推送，PR 保持原样等待后续轮次。

## 临时来源工作区与原件保留

新的 Git 来源读取统一走 `sources:workspace open --source-id --commit --owner-pid`，在项目之外的临时 pinned checkout 中固定到观察到的精确提交，读完 `close`，异常残留由 `sources:workspace recover` 按 owner PID 回收。知识记录只保存 `git_source_file` 的 `commit`、`file` 与 `content_sha256`，不保存 checkout 路径；临时路径不进入任何记录。

巡检只承诺三件事的保留：官方文档原件按既有保留策略留在忽略归档，章节文档与来源元数据、审计、报告作为 Git 历史永久保留。源码读取是临时的——读的是哪一次提交由 `git_source_file` 的 `commit`、`file` 与 `content_sha256` 记录，checkout 本身用完即清理；本轮自有来源工作区与验证输出在 `finish` 收尾时清理。巡检不接管二进制与完整日志的保留。catalog 的 Git 快照必须带精确 revision，归档路径可选。

清理只删本轮明确登记的自有对象；目录归属不明、owner PID 不匹配或仍在被使用的对象一律保留并在报告中点名，不用 `rm -rf` 扫目录。巡检每日本身不写入受保护数据，因此不承诺固定的峰值占用。

## 离线来源审计的状态

离线来源审计对每条记录返回 `verified` 或 `not_retained`。只保留身份元数据的记录（`git_source_file`，以及无归档原件的 Git catalog 引用）报 `not_retained`：这是元数据状态，不是原件字节校验通过，不能被当作已验证原件。应当保留的原件缺失或 hash 不符仍然是错误并中止审计。普通查询与构建在离线状态下不依赖来源原件。

## 后果

- 「今天哪些来源变了」有固定答案：只读观察，范围为 catalog ∩ registry，基线与手动扫描一致。
- 章节判断仍由调查与维护 Agent 完成，编排层不做章节语义。一个 PR 可能跨多个产品并持续数日，回退以 PR 为单位而不是以单页为单位。
- 巡检不改变发布语义：合并到 `main` 后的对外发布由既有发布 CI 推进，受管二进制是独立流程。
- 临时来源工作区短命，调查可复核性依赖记录下来的 commit 与内容 hash，而不是仓库内的源码副本。
- `not_retained` 让「未保留原件」与「原件校验通过」在审计输出里可区分，避免把元数据存在当作原件可用。

## 启用顺序

每日调度先注册为禁用状态。启用前完成两项核对：

1. 巡检依赖的仓库内命令已在 `main` 可用：`sources:check`、`sources:workspace open`／`close`／`recover`、`monitor:session start`／`finish`。
2. `.codex/config.toml` 选定的主会话模型可用，且 `minimax-cn/MiniMax-M3.1-Flash-Preview` 能作为显式模型参数被原生 subagent 工具实际选中。

两项都通过后手动触发一次巡检，验证 PID 锁、只读观察、必要性判断、隔离并行委派、聚合闸门与推送整条链路，再打开每日调度。候选工具也须在 main 可用。链路未验证时保持禁用，不用一次真实调度去试基础设施。模型或命令任一项变更，先停调度，改完按同样顺序复核。
