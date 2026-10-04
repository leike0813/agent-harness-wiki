# Proposal

## Why

上游观察只在维护者手动调用 `harness-maintenance` 时发生，「今天哪些来源变了」与「知识是否值得发布」两个问题混在同一次调用里；调查 Agent 自行准备 checkout，源码副本可能散落在仓库内外，新的 Git 来源记录也保存了会失效的 checkout 路径。上游变化因此通常要等到维护者手动运行时才被发现。

本 change 固定每天一次只读观察，把来源变化与知识判断分开：编排层做范围、PID 锁、知识影响判断、隔离并行委派、聚合闸门和 pull request 交付，章节语义仍由维护 Skill 承担。来源读取同时改为项目外的临时 pinned checkout，让记录只保留可复核的身份而非本地路径。

## What Changes

- 新增每日巡检能力：固定专用 worktree 的全新会话、每日 02:00（Asia/Shanghai，宽限 60 分钟）、主进程持有 PID 锁而无守护进程、范围为 catalog 与 registry 交集、只读观察 Git／官方文档／npm 与未结案审计。
- 主会话模型由项目 `.codex/config.toml` 选定；子代理模型不由配置隐式继承，而由每次委派显式传入 `minimax-cn/MiniMax-M3.1-Flash-Preview`，主 Agent 决定并行规模，每产品一个独立候选 writer。巡检不继承编排协调方的模型。
- 每轮每产品至多一次委派，`delivery=pr` 只做调查、采写、自检与审计：不开本地发布指针，不核对受管二进制。
- 原始观察与自动 impacts 仅提示候选。先对照固定问题和实际内容判断；无知识影响结案、失败无修复线索保持 blocked、未完成问题有新证据才恢复。影响不明限定入口，再按证据扩展。
- 维护支持 coordinator/worker 角色，使用 prepare/check/plan 的单产品候选；主 Agent 决定并行规模并协调独立复核，统一集成共享 catalog 与选章。相关基线变化或全局 ID 冲突只拒绝该产品，工具只生成临时数据，不写 tracked 真源。使用者全部停止后才集成与释放临时资源，local 聚合发布一次。
- 仓库增加本地完整历史与在线消费者的 MCP 配置指南；站点首页通过同一指南的 Markdown 区域展示在线配置，指南进入导航与在线构建输入摘要。
- 交付单位是一个持续到合并为止的滚动 pull request：合并前每日切回同一分支、普通合并 `origin/main` 后继续提交；未合并的 PR 内同一产品 × 主题只保留一个候选，新变化修订它，不顺延也不丢弃。
- 新的 Git 来源读取统一走项目外临时 pinned checkout，知识记录只保存 `git_source_file` 的 commit、file 与 content_sha256；catalog Git 快照始终带精确 revision，`archive_path` 可选。
- 离线来源审计逐条返回 `verified` 或 `not_retained`；`not_retained` 是元数据状态而非原件校验通过，应保留的原件缺失或 hash 不符仍报错。查询与构建离线不依赖来源原件。
- 调度在依赖命令合入 `main` 且固定模型实测可用之前保持禁用。

## Capabilities

### New Capabilities

- `harness-monitor`: 每日只读上游观察、固定会话与显式子代理模型、影响判断与隔离并行委派、持续到合并的滚动 pull request 及其每个产品 × 主题一个候选的规则，以及受管临时来源工作区与保留边界。

### Modified Capabilities

- `source-provenance`: 固定提交的项目外临时 pinned checkout、`git_source_file` 元数据、可选 `archive_path` 与精确 revision、离线审计的 `not_retained` 状态。
- `chapter-update-workflow`: `delivery=pr` 轮次不发布本地知识、不刷新受管二进制，合并后由既有发布流水线自行推进。

## Impact

来源扫描与审计、来源工作区与巡检锁脚本、候选工具与业务测试，`src/domain/schema.ts`、`src/domain/catalog.ts`、`src/sources/`、`src/validation/`、站点编译器与站点测试，两个维护 Skill、AGENTS、PRD、数据模型、开发与工作流文档、MCP 指南、README、ADR 0012 与当前 delta。

不新增运行时依赖、MCP 工具、查询能力或在线投影内容；不改变不可变 release、发布指针与受管二进制的既有语义。每日调度在启用前不产生任何外部写入。
