# Tasks

## 1. Onboarding

- [x] 1.1 改写 `.agents/skills/harness-investigation/SKILL.md`：登记身份与来源、直接固定来源身份、七章/53 问采写、全七章与当前选择后再校验、`--stage` 构建并 `ahw publish` 切换、发布后询问是否接入受管二进制。
- [x] 1.2 首次接入不运行 `pnpm sources:scan`、不写审计 YAML、不复制报告模板；官方 npm 来源只登记身份，不造 npm snapshot/artifact/映射。
- [x] 1.3 用 fixture 演练七章校验与分段发布，记录未运行项。fixture 暂存、CLI 查询与站点构建通过；生产语义索引演练等待过久后停止。

## 2. Maintenance

- [x] 2.1 迁移维护说明与报告模板到 `.agents/skills/harness-maintenance/`，更新全部文档链接。
- [x] 2.2 ID 模式对每个请求 ID 调用一次 `harness-binary`（来源未变化也调用），定向模式只在明确要求时调用；结果分别报告。
- [x] 2.3 以只读前向场景验收 ID 模式的逐 ID 二进制核对与独立报告；真实产品更新不在本次迁移范围。

## 3. Binary

- [x] 3.1 新增 `.agents/skills/harness-binary/SKILL.md`：模型调用、先登记 `managedPackages`、`observe <id>`、`update <id>`，区分首次 `selected` 为空与更新，非 npm 或缺少已核对官方 npm 来源报告 unsupported。
- [x] 3.2 用本地假包分别验收首次接入和后续更新的 bwrap 隔离启动、选中版本与报告字段。

## 4. Publisher and docs

- [x] 4.1 同步 AGENTS.md、docs/PRD.md、docs/roadmap.md、docs/knowledge-workflow.md、docs/development.md、docs/openspec-implementation-roadmap.md、research/package-set/README.md 的三 Skill、发布与二进制描述。
- [x] 4.2 `.gitignore` 跟踪三个 Skill 目录；清理 `--managed-audits`、`managed_outcomes` 等已移除的 publisher 字段。
- [x] 4.3 运行 `openspec validate new-harness-onboarding --strict` 并复核 Skill 引用路径。
