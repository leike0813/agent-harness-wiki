# 知识怎样进入读者章节

读者从产品概览进入 Skills、MCP、自定义 Agent、自定义 Provider、Hooks、原生插件与配置机制七个主题页。每篇章节按 [53 个固定问题](topic-questions.md)记录 `answered`、`partial`、`unknown`、`not_applicable` 或 `conflict`，在正文相应位置说明机制、条件和缺口。状态属于问题 × 界面：一条答案按其 `surface_ids` 适用；产品已声明、但章节没有答案的界面由查询派生为 `not_investigated`（界面已知但本轮未调查），不写成 `unknown`；同一页中已知与未知可以并存。

## 来源和版本

`catalog/harnesses.yaml` 固定产品与界面身份（产品 id 命名产品，`surface_id` 命名同一产品的一个前端），`registry/` 登记产品 id 与官方来源。`knowledge/<harness-id>/artifacts/` 和 `snapshots/` 固定所查的源码提交、文档内容或包身份；`references/` 把短摘录与文件行号、符号或文档章节绑定到某个快照。章节正文的 `[@reference-id]` 可在站点打开，也能用 CLI `query source` 或 MCP `get_source` 查询。归档原件位于 Git 忽略的 `archive/`，供显式审计；普通阅读只使用发布内的短摘录和来源定位。源码不再复制进仓库：新的 Git 原件记录为 `git_source_file`，只保存提交、文件与内容 hash，读取用的临时 checkout 在项目之外，用完即回收。

章节默认说明固定来源中发现的机制。源码提交和未标软件版本的网页不能自动证明某个 npm 版本。只有 `mappings/` 中有对应包快照及逐小节证据时，查询才选出映射版本；版本映射按界面分别成立；带版本的读取必须同时指定界面，否则返回 `ambiguous`。无映射时返回 `source_only`，请求版本仍为 `not_verified`。前缀或最近较早版本匹配也不把请求版本变成已验证版本。

## 新收录产品

新 CLI 由维护者调用 `$harness-investigation <harness-id>` 接入：先在 catalog 固定产品 id 与界面（`surface_id`），登记产品与官方来源、固定来源身份、按 53 个固定问题逐界面采写七章、自检（高影响时另请 Agent 复核）后分段发布知识。知识发布成功后，由维护者决定是否继续调用 `harness-binary` 接入受管二进制；二进制不进入知识发布。

## 手动观察与审计

用户手动调用维护 Skill（默认 `$harness-maintenance <harness-id>...`）时先运行 `pnpm sources:scan <harness-id>...`，逐个观察登记来源。扫描是元数据优先的：Git 源用 `ls-remote` 取精确 HEAD 和默认分支 ref；官方文档取固定字节并算 sha256；npm 源只读 registry 元数据里的 `dist-tags.latest` 与对应版本 integrity，不下载包字节。三类身份各自与上次基线比对，互不证明：新包版本只是线索，不能说明章节改变，也不能说明某个源码提交对应到这个包。读源码或文档原件时走 `pnpm sources:workspace open --source-id ... --commit ... --owner-pid ...`，在项目外的临时 pinned checkout 读取、读完 `close`、残留按 owner PID `recover`；官方文档原件按保留策略留在忽略归档，源码只留 `git_source_file` 的提交、文件与内容 hash。包字节由受管环境流程另行获取。ID 模式每一轮还会另行调用 `harness-binary` 核对受管二进制最新版本；定向模式只在维护者明确要求时核对。

`pnpm sources:check` 是与扫描同基线的只读入口，供每日巡检使用：它输出每个产品的 `checks`、`pending_audit_refs` 与 `requires_maintenance`，不写审计、不下载包字节、不创建 clone。落审计的仍是 `sources:scan` 或维护 Skill 写出的 YAML 与报告。

每次调用为每个 Harness 写一份 Git 跟踪的审计 YAML `audits/<harness-id>/<audit-id>.yaml`，未变化和失败来源一并记录。`checks` 逐来源给出 `baseline`、`observed`、`status`（`unchanged`、`changed`、`blocked`）和错误；扫描把引用落在受影响小节的当前章节映射成 `impacts` 的 `question_ids`、`section_ids`、`surface_ids`、`source_refs` 与 `cross_topic_links`，npm 版本变化不进章节影响。`pnpm sources:audit-log` 校验审计资产、来源种类与当前章节一致。

未处理完的审计保持 `review_status: pending`，并在后续扫描的 `pending_audit_refs` 里逐轮传递，直到被调查完并写入 `reviewed_by`、`reviewed_at` 标为 `reviewed`；`no_change` 审计直接记 `not_required`。任一来源失败时该来源记 `blocked`、保留上次成功基线，其他来源照常记录，扫描命令以非零退出码结束但不覆盖已写内容。恢复时先处理 `pending_audit_refs` 指出的旧审计，再逐条调查本次 `changed`、`blocked` 项；没有读者可见影响时该轮只结案审计，不切换发布。

下面是一份 Pi Skills 审计的节选，`question_ids`、`section_ids` 和 `source_refs` 都取自当前 Pi 章节：

```yaml
schema_version: 2
audit_id: audit-pi-<uuid>
harness_id: pi
status: changed
review_status: pending
pending_audit_refs: []
checks:
  - source_id: source-pi-repo
    kind: git_repository
    status: changed
    baseline: 781152fc24841dc54b22284514604048ebe5e2c9
    observed: <新的精确 commit>
    remote_ref: refs/heads/main
    changed_paths:
      - packages/coding-agent/docs/skills.md
  - source_id: source-pi-npm
    kind: npm_registry
    status: unchanged
    baseline: 0.73.1@sha512-...
    observed: 0.73.1@sha512-...
impacts:
  - topic: skills
    question_ids:
      - skills.roots
      - skills.discovery
      - skills.collision
      - skills.format
    section_ids: [skills-locations, skills-authoring]
    surface_ids: [cli]
    source_refs: [ref-pi-skills-locations, ref-pi-skills-format]
    cross_topic_links: []
    reason: "source-pi-repo: cited source changed; check shared loading paths and cross-topic effects"
pending_question_ids:
  [skills.roots, skills.discovery, skills.collision, skills.format]
investigation_notes: []
```

`question_ids`、`section_ids` 与 `source_refs` 的取值必须能在 `registry/chapter-current.yaml` 选中的章节里找到；`pnpm sources:audit-log` 会拒绝与已发布章节不符的影响映射。有实质变化、来源失败或未解决分歧时，同目录另写简短 Markdown 报告（[报告模板](../.agents/skills/harness-maintenance/assets/review-report.md)）；完全未变化只需 YAML。

## 从编辑到发布

```text
固定官方来源 → 逐题调查（Agent 自检，高影响按需独立复核） → 章节和来源校验
    → staging 构建不可变 release → 站点、CLI、MCP 验收 → 切换 current
```

Git 中的章节 Markdown、来源引用 YAML、版本映射 YAML 与 `registry/chapter-current.yaml` 是知识真源。编译器从同一份输入生成 JSON、SQLite 与站点 Markdown，在 staging 中核对 hash、数据库和页面后保存不可变发布。手动增量调用 `pnpm chapters:update` 选入已完成内容、校验 staging 并切换 `releases/current.json`；首次发布仍可用 `pnpm ahw compile ... --stage` 和 `pnpm ahw publish --release-id <id>`。运行中的 MCP 进程固定启动时选定的发布，切换指针后需要重启才会读取新版本。

由每日巡检委派的 `delivery=pr` 轮次到审计与报告为止：改动留在工作区交回巡检，不选新版本、不切换 `releases/current.json`，也不调用 `harness-binary`。PR 合并到 `main` 后的对外发布由既有发布 CI 处理，受管二进制是独立流程，不会被合并触发。

旧 `claims/`、`evidence/`、`assessments/`、`coverage/` 与 `guides/` 保留为调查材料，不由新查询接口读取，也不作为新章节的人工接受门禁。完成内容由调查 Agent 引用固定来源自检后直接采纳；只有来源冲突、推翻已发布配置步骤或跨主题关键机制变化才请另一 Agent 独立复核，复核未完成的问题保留在待处理状态，其他已完成章节仍可发布，依据见 [PRD](PRD.md) 第 7 节。查询不会联网、执行 harness 或调用 LLM。

## 每日巡检

`harness-monitor` 每天 02:00（`Asia/Shanghai`，宽限 60 分钟）在编排工具管理的专用 worktree 中开一个全新会话，观察范围是 catalog 与 registry 的交集，即有登记来源的已登记产品。互斥由巡检主进程持有的 PID 锁实现，没有守护进程：`start` 清掉上一次遗留的临时输出后取得锁，来源工作区残留用显式 `sources:workspace recover` 回收，正常路径由 `finish` 释放并清理。主会话模型由项目 `.codex/config.toml` 决定；子代理模型必须作为显式参数传入 `minimax-cn/MiniMax-M3.1-Flash-Preview`，不由配置隐式继承，也不继承编排协调方的模型，委派串行进行。

每个需要处理的产品（有变化来源或未结案审计）只委派一次维护。交付单位是一个持续到合并为止的滚动 pull request：PR 合并前，每日轮次切回同一分支、普通合并 `origin/main` 后继续提交；PR 内同一产品 × 主题只保留一个候选，当天的新变化修订该候选而不追加第二个 edition，也不顺延或丢弃。`knowledge:validate`、`sources:audit-log`、`git diff --check`、`verify` 与在线构建校验全部通过才推送，任一失败只保留本地提交与报告；本轮无变化时不推送。合并按普通合并处理，不 force、不 rebase 已推送分支。收尾在 `finish` 时清理本轮自有来源工作区与验证输出：源码读取是临时的，官方文档原件、章节文档、来源元数据、审计与报告保留。调度参数与启用顺序见 [自动化](automations.md) 与 [ADR 0012](decisions/0012-daily-harness-monitor.md)。

## 在线投影与保留接缝

在线分发是独立于本地发布的读取路径：从同一份已校验真源生成 `data/v1/` 机器资源与同发布页面，每个产品 × 主题只收录当前章与最近一个历史版，其余章节退为裁剪标记，检索只有词法入口；身份为 `web-v1-<完整 Git commit SHA>`。最近历史版按指定 commit 的 first-parent 树引入顺序排序；只有存在多个非 current 版本时才需要完整 Git 历史，浅克隆或定位不到引入点时构建失败。生产 main 发布由 `knowledge-publication.yml` 承接；构建、归档、部署与公开可用性分别验收。

`publication-state/state.json` 保存发布预约、current／恢复目标、退出时间及未完成部署；`src/publication/state.ts` 按固定时间选择至少 30 天内的旧发布及永久保护目标，旧协议冻结公告至少 90 天。每份不可变 Release 归档仅保存本发布页面与数据，部署组装保留目标页面并选入受保护数据，解包字节上限 768 MiB。未知部署阻止后续发布，超限保留现站；只在经验证的后续部署中排除过期数据，不自动删除归档。恢复和真实 Pages／npm 验收见 [发布指南](publication.md)。

消费者侧：公开 `agent-harness-wiki` 包的 `ahw` 只做词法在线读取，每个产品 × 主题只看到当前章与最近一个历史版。按既有选版规则选中被裁剪章节时返回正常 `history_not_available` 并指向本地完整历史；它不是 `unsupported` 或从未调查。完整历史不随包分发，需要按本仓库流程单独准备本地发布，`--offline` 只读已缓存资源、不能补齐被裁剪章节。说明与接入见 [消费者包说明](../packages/consumer/README.md) 与 [ADR 0010](decisions/0010-online-consumer.md)。
