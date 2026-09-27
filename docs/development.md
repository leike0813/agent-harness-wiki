# 开发指南

使用 Node.js 24.12.0+（24.x）和 pnpm 11.10.0；版本约束见 `.node-version`、`package.json` 与锁文件。先执行 `pnpm install --frozen-lockfile`。pnpm 的原生模块构建许可由 `pnpm-workspace.yaml` 列出。

主要入口：`src/domain/schema.ts` 定义记录；`src/validation/dataset.ts` 校验 YAML、引用和语义；`src/compiler/` 建立并验证 JSON、SQLite、Markdown 发布；`src/query/schema.ts` 与 `service.ts` 定义并执行五类查询；`src/cli/index.ts` 和 `src/mcp/server.ts` 提供用户接口；`scripts/build-site.ts` 从已验证 release 构建站点。虚构正向数据位于 `tests/fixtures/datasets/basic/`，异常测试在临时目录构造。

真实来源元数据位于根目录 `registry/` 与五个 `knowledge/<harness-id>/`。首次检出后初始化四个 submodule；在 `research/package-set/` 中用其独立锁文件、`--ignore-workspace --ignore-scripts --ignore-pnpmfile` 和 `--store-dir ../../archive/pnpm-store` 安装五个精确包，并用 `--offline --frozen-lockfile` 复核。归档 Markdown 原件不随 Git 分发，按 snapshot URL 和 hash 单独恢复。`pnpm sources:audit` 离线核对 checkout commit、归档字节、包名/版本、锁文件 integrity、选定文件 SHA-256 及包内 Evidence 摘录。普通 production 校验、编译和 `pnpm verify` 不读取这些原件。源码 commit 不能冒充安装包版本。

更新受管包时只修改 `research/package-set/package.json` 的精确版本，再由 pnpm 更新其锁文件；在新包集离线安装与 `sources:audit` 均成功后，才对项目专属 store 运行 `pnpm store prune --store-dir ../../archive/pnpm-store`。旧 release 继续可查，旧包原件若已清理，显式审计会报告不可用。文档原件及模型另按各自保留规则处理。

增加 fixture 时，每个 YAML 文件放一条记录，`record_kind` 写 `fixture`；来源文件放数据集内 `materials/`，SHA-256 由实际字节计算。Claim 的 Snapshot Target、Evidence、Assessment 和 Coverage 必须相符。运行 `pnpm validate:fixtures` 检查。

修改持久 schema 时，先改 `src/domain/schema.ts`，再调整跨记录校验；执行 `pnpm schema:export` 更新 `schemas/*.schema.json`，检查行为测试。`pnpm schema:check` 只检查导出是否最新。不要手工修改生成 schema 或锁文件。

从全新安装运行 `pnpm verify` 即可完成离线验收。单项命令：`pnpm typecheck`、`pnpm lint`、`pnpm format:check`、`pnpm test`、`pnpm test:integration`、`pnpm build`、`pnpm docs:build` 和 `pnpm mcp:smoke`。MCP 集成测试启动真实子进程，用官方 SDK 调用五个工具并关闭连接；站点测试检查构建后的 HTML 和 release 不变性。

维护者默认以 `$harness-investigation codex-cli pi` 等一个或多个 registry harness ID 调用项目 Skill；也可指定完整精确 Target 与问题，直接调查固定来源。Skill 位于 `.agents/skills/harness-investigation/SKILL.md`，审阅报告模板位于其 `assets/review-report.md`。ID 调用先执行 `pnpm sources:scan codex-cli pi`，只检查各 Harness 的 `source_refs`，每次在 `audits/<harness-id>/` 写可跟踪审计记录；扫描有来源失败时仍检查已写记录。新 npm tarball 和 Git checkout 保存在忽略的 `archive/`，不安装、执行或移动受管包/submodule。Skill 沿固定来源生成 `draft` Claim/Evidence/Assessment 或带具体缺口的 Coverage，运行 `pnpm ahw validate --dataset-root . --profile production` 与 `pnpm sources:audit-log`。需要人工复核时先读同目录、同名主干的 Markdown 报告，再按链接查看审计 YAML、候选和原件；未跟踪的新文件还须用 `git status --short --untracked-files=all` 检查。五产品七主题的首轮结果见 `openspec/changes/archive/2026-09-28-m1-five-harness-knowledge/full-review.md`。来源原件在本机可用时再运行 `pnpm sources:audit`；Skill 不接受事实、不切换 release。

手动发布用 `pnpm fixtures:build`，固定 ID 为 `fixture-query`，不可覆盖。查询时显式传 `--release-id fixture-query`；MCP 用 `pnpm ahw mcp --release-id fixture-query`。`query capability` 需完整 Target scope；`--conditions` 接受 JSON 数组，`query compare --requests` 接受 2–5 个请求。CLI 列表和搜索每页最多 100 条；MCP 同类工具最多 20 条，证据摘录最多 2000 个 Unicode 字符，单响应最多 128 KiB。

`pnpm docs:build` 自建临时 fixture release；`pnpm docs:build --release-id five-harness-reviewed-20260928` 使用正式 release。构建产物位于 `site/.vitepress/dist/`。归档后的规格可用 `openspec validate --specs` 检查。默认测试不访问网络、不读取真实用户 harness 配置；Windows 尚未运行验证。
