# agent-harness-wiki

> 状态：**M0 初始化中**。首个 OpenSpec change 已实现领域 schema、虚构 fixture、数据集校验及 MCP SDK 连通验证；查询发布尚未实现。
> 详见 `AGENTS.md`、`docs/PRD.md`、`openspec/`。

## 项目定位

面向 AI coding agent 及其他 agent harness 的、证据驱动的配置与扩展能力知识库。

跟踪各 harness 的源码、发布包、二进制与官方文档，将调查结论整理为带版本、环境、条件与证据的结构化事实，通过文档站、CLI 和只读 MCP Server 提供查询。

## 当前阶段

已实现带精确版本和 Target 的结构化记录、两个明确虚构的 harness 数据集、YAML 与跨记录校验，以及真实 stdio 的 MCP SDK ping 测试。能力路线按 M0 → M1 → M2 推进；harness catalog 在 M1 接入首批五个 CLI，之后按 Orca、OpenSpec 官方名单分两期扩容。产品契约见 `docs/PRD.md`，实施顺序见 `docs/roadmap.md`。当前 change 见 `openspec/changes/m0-domain-and-fixtures/`。

## 本地开发

需要 Node.js 24.12.0 或同一主版本中更新的版本，以及 pnpm 11.10.0。

```sh
pnpm install --frozen-lockfile
pnpm validate:fixtures
pnpm schema:export
pnpm typecheck
pnpm build
pnpm lint
pnpm format:check
pnpm test
pnpm test:integration
```

`pnpm validate:fixtures` 校验 `tests/fixtures/datasets/basic/`；其数据只用于开发和测试，不代表真实产品。`pnpm schema:export` 从 Zod schema 生成 `schemas/` 下的 JSON Schema。集成测试只检查 MCP SDK 的 stdio 客户端与测试服务端通信。

当前尚无可查询的 release，因此 CLI 查询、五工具 MCP 服务、SQLite 索引及文档站构建命令要在后续 M0 changes 完成；也尚未调查真实 harness。项目不提供自动配置管理、联网查询或查询时的 LLM 调用。

## 文档

- `AGENTS.md`：工程规则与执行边界。
- `docs/PRD.md`：产品需求与阶段验收。
- `docs/roadmap.md`：M0–M2 实施路线与 catalog 扩容波次。
- `docs/openspec-implementation-roadmap.md`：M0 的 OpenSpec change 划分。
- `docs/data-model.md`、`docs/development.md`：当前已实现模型和开发命令。
- `openspec/`：变更与 spec 跟踪。

## 许可

待定。
