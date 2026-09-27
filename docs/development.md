# 开发指南

使用 Node.js 24.12.0+（24.x）和 pnpm 11.10.0；版本约束见 `.node-version`、`package.json` 和锁文件。先运行 `pnpm install --frozen-lockfile`。pnpm 的原生模块构建许可由 `pnpm-workspace.yaml` 明确列出。

## 当前目录

- `src/domain/schema.ts`：持久记录与初步查询/发布类型。
- `src/validation/dataset.ts`：有界 YAML 读取、引用与产品语义校验。
- `scripts/validate-dataset.ts`：fixture 校验命令。
- `scripts/export-schemas.ts`：JSON Schema 导出。
- `tests/fixtures/datasets/basic/`：完全虚构的正向数据；测试从此复制到临时目录形成异常数据。
- `tests/fixtures/mcp-ping-server.ts`：仅供 SDK 连通测试的服务端。

增加 fixture 时，每个 YAML 文件放一条记录；`record_kind` 写 `fixture`，来源文件放在数据集内的 `materials/`，用实际文件字节计算 SHA-256。新增 Claim 应匹配其 Snapshot 的 Target、Evidence 和 Assessment，并给对应 Target/主题写 Coverage。运行 `pnpm validate:fixtures` 检查数据。

修改 schema 时，先改 `src/domain/schema.ts`，再调整跨记录校验；执行 `pnpm schema:export` 更新生成的 `schemas/*.schema.json`，并检查对应的行为测试。不要手工改生成的 schema 或 `pnpm-lock.yaml`。

## 检查

```sh
pnpm validate:fixtures
pnpm schema:export
pnpm typecheck
pnpm build
pnpm lint
pnpm format:check
pnpm test
pnpm test:integration
openspec validate m0-domain-and-fixtures --strict --no-interactive
```

集成测试通过官方 SDK 启动测试服务端、完成连接、列出并调用 ping 工具后关闭。正式五工具 MCP 服务、CLI 查询、SQLite 发布器和文档站构建均属于后续 M0 changes，目前没有相应 smoke 命令。测试不访问网络，也不读取真实用户 harness 配置。
