# 开发指南

使用 Node.js 24.12.0+（24.x）和 pnpm 11.10.0；版本约束见 `.node-version`、`package.json` 与锁文件。先执行 `pnpm install --frozen-lockfile`。pnpm 的原生模块构建许可由 `pnpm-workspace.yaml` 列出。

主要入口：`src/domain/schema.ts` 定义记录；`src/validation/dataset.ts` 校验 YAML、引用和语义；`src/compiler/` 建立并验证 JSON、SQLite、Markdown 发布；`src/query/schema.ts` 与 `service.ts` 定义并执行五类查询；`src/cli/index.ts` 和 `src/mcp/server.ts` 提供用户接口；`scripts/build-site.ts` 从已验证 release 构建站点。虚构正向数据位于 `tests/fixtures/datasets/basic/`，异常测试在临时目录构造。

真实来源元数据位于根目录 `registry/` 与 `knowledge/codex-cli/`。首次检出后运行 `git submodule update --init upstream/codex-cli` 获取固定源码；归档文档原件不随 Git 分发，需按 snapshot URL 和 hash 单独恢复。`pnpm sources:audit` 离线检查本机 checkout commit、选定文件及归档字节，缺少原件会报错。普通 `pnpm ahw validate --dataset-root . --profile production`、编译和 `pnpm verify` 不读取这些原件，也不联网。维护原件时只记录实际抓取时间、最终 URL 和字节 hash；源码 commit 不能冒充安装包版本。

增加 fixture 时，每个 YAML 文件放一条记录，`record_kind` 写 `fixture`；来源文件放数据集内 `materials/`，SHA-256 由实际字节计算。Claim 的 Snapshot Target、Evidence、Assessment 和 Coverage 必须相符。运行 `pnpm validate:fixtures` 检查。

修改持久 schema 时，先改 `src/domain/schema.ts`，再调整跨记录校验；执行 `pnpm schema:export` 更新 `schemas/*.schema.json`，检查行为测试。`pnpm schema:check` 只检查导出是否最新。不要手工修改生成 schema 或锁文件。

从全新安装运行 `pnpm verify` 即可完成离线验收。单项命令：`pnpm typecheck`、`pnpm lint`、`pnpm format:check`、`pnpm test`、`pnpm test:integration`、`pnpm build`、`pnpm docs:build` 和 `pnpm mcp:smoke`。MCP 集成测试启动真实子进程，用官方 SDK 调用五个工具并关闭连接；站点测试检查构建后的 HTML 和 release 不变性。

手动发布用 `pnpm fixtures:build`，固定 ID 为 `fixture-query`，不可覆盖。查询时显式传 `--release-id fixture-query`；MCP 用 `pnpm ahw mcp --release-id fixture-query`。`query capability` 需完整 Target scope；`--conditions` 接受 JSON 数组，`query compare --requests` 接受 2–5 个请求。CLI 列表和搜索每页最多 100 条；MCP 同类工具最多 20 条，证据摘录最多 2000 个 Unicode 字符，单响应最多 128 KiB。

`pnpm docs:build` 自建临时 fixture release；`pnpm docs:build --release-id fixture-query` 使用显式 release。构建产物位于 `site/.vitepress/dist/`。`openspec validate m1-source-and-artifact-boundary --strict` 检查当前 change。默认测试不访问网络、不读取真实用户 harness 配置；Windows 尚未运行验证。
