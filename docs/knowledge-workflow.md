# 知识怎样进入读者章节

读者从产品概览进入 Skills、MCP、自定义 Agent、自定义 Provider、Hooks、原生插件与配置机制七个主题页。每篇章节按 [53 个固定问题](topic-questions.md)记录 `answered`、`partial`、`unknown`、`not_applicable` 或 `conflict`，在正文相应位置说明机制、条件和缺口。状态属于具体问题；同一页中已知与未知可以并存。

## 来源和版本

`registry/` 登记产品与官方来源。`knowledge/<harness-id>/artifacts/` 和 `snapshots/` 固定所查的源码提交、文档内容或包身份；`references/` 把短摘录与文件行号、符号或文档章节绑定到某个快照。章节正文的 `[@reference-id]` 可在站点打开，也能用 CLI `query source` 或 MCP `get_source` 查询。归档原件位于 Git 忽略的 `archive/`，供显式审计；普通阅读只使用发布内的短摘录和来源定位。

章节默认说明固定来源中发现的机制。源码提交和未标软件版本的网页不能自动证明某个 npm 版本。只有 `mappings/` 中有对应包快照及逐小节证据时，查询才选出映射版本；无映射时返回 `source_only`，请求版本仍为 `not_verified`。前缀或最近较早版本匹配也不把请求版本变成已验证版本。

## 新收录产品

新 CLI 由维护者调用 `$harness-investigation <harness-id>` 接入：登记产品与官方来源、固定来源身份、按 53 个固定问题采写七章、自检（高影响时另请 Agent 复核）后分段发布知识。知识发布成功后，由维护者决定是否继续调用 `harness-binary` 接入受管二进制；二进制不进入知识发布。

## 手动观察与审计

用户手动调用维护 Skill（默认 `$harness-maintenance <harness-id>...`）时先运行 `pnpm sources:scan <harness-id>...`，逐个观察登记来源。扫描是元数据优先的：Git 源用 `ls-remote` 取精确 HEAD 和默认分支 ref；官方文档取固定字节并算 sha256；npm 源只读 registry 元数据里的 `dist-tags.latest` 与对应版本 integrity，不下载包字节。三类身份各自与上次基线比对，互不证明：新包版本只是线索，不能说明章节改变，也不能说明某个源码提交对应到这个包。Git 提交和文档变化可把候选原件留在忽略的 `archive/` 供调查；包字节由受管环境流程另行获取。ID 模式每一轮还会另行调用 `harness-binary` 核对受管二进制最新版本；定向模式只在维护者明确要求时核对。

每次调用为每个 Harness 写一份 Git 跟踪的审计 YAML `audits/<harness-id>/<audit-id>.yaml`，未变化和失败来源一并记录。`checks` 逐来源给出 `baseline`、`observed`、`status`（`unchanged`、`changed`、`blocked`）和错误；扫描把引用落在受影响小节的当前章节映射成 `impacts` 的 `question_ids`、`section_ids`、`source_refs` 与 `cross_topic_links`，npm 版本变化不进章节影响。`pnpm sources:audit-log` 校验审计资产、来源种类与当前章节一致。

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

旧 `claims/`、`evidence/`、`assessments/`、`coverage/` 与 `guides/` 保留为调查材料，不由新查询接口读取，也不作为新章节的人工接受门禁。完成内容由调查 Agent 引用固定来源自检后直接采纳；只有来源冲突、推翻已发布配置步骤或跨主题关键机制变化才请另一 Agent 独立复核，复核未完成的问题保留在待处理状态，其他已完成章节仍可发布，依据见 [PRD](PRD.md) 第 7 节。查询不会联网、执行 harness 或调用 LLM。
