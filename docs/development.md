# 开发指南

使用 Node.js 24.12.0+（24.x）和 pnpm 11.10.0；版本约束见 `.node-version`、`package.json` 和锁文件。先运行 `pnpm install --frozen-lockfile`。pnpm 的原生模块构建许可由 `pnpm-workspace.yaml` 明确列出。

## 当前目录

- `src/domain/schema.ts`：持久记录与初步查询/发布类型。
- `src/validation/dataset.ts`：有界 YAML 读取、引用与产品语义校验。
- `src/compiler/`：已复核数据的统一投影、SQLite、Markdown、发布与完整性验证。
- `scripts/validate-dataset.ts`：fixture 校验命令。
- `scripts/compile-release.ts`：显式参数的离线发布命令。
- `scripts/export-schemas.ts`：JSON Schema 导出。
- `tests/fixtures/datasets/basic/`：完全虚构的正向数据；测试从此复制到临时目录形成异常数据。
- `tests/fixtures/mcp-ping-server.ts`：仅供 SDK 连通测试的服务端。

增加 fixture 时，每个 YAML 文件放一条记录；`record_kind` 写 `fixture`，来源文件放在数据集内的 `materials/`，用实际文件字节计算 SHA-256。新增 Claim 应匹配其 Snapshot 的 Target、Evidence 和 Assessment，并给对应 Target/主题写 Coverage。运行 `pnpm validate:fixtures` 检查数据。

修改 schema 时，先改 `src/domain/schema.ts`，再调整跨记录校验；执行 `pnpm schema:export` 更新生成的 `schemas/*.schema.json`，并检查对应的行为测试。不要手工改生成的 schema 或 `pnpm-lock.yaml`。

## 检查

```sh
pnpm validate:fixtures
pnpm fixtures:build
pnpm schema:export
pnpm typecheck
pnpm build
pnpm lint
pnpm format:check
pnpm test
pnpm test:integration
openspec validate m0-reproducible-release --strict --no-interactive
```

`pnpm fixtures:build` 使用固定 ID 与时间构建一次 `releases/fixture-basic/`；release 不可覆盖。需要再验证时，可用不同 ID 或临时输出根目录运行：

```sh
pnpm exec tsx scripts/compile-release.ts --dataset-root tests/fixtures/datasets/basic --profile fixture --release-id fixture-check --published-at 2026-09-27T00:00:00Z --releases-root /tmp/ahw-releases
```

集成测试验证发布重复性、损坏检测、旧发布保护，并通过官方 SDK 启动测试服务端完成 ping 后关闭。正式五工具 MCP 服务、CLI 查询和文档站构建属于后续 M0 changes。测试不访问网络，也不读取真实用户 harness 配置。Windows 尚未运行验证。
