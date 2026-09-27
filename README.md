# agent-harness-wiki

> M0 的虚构数据闭环已实现；当前页面和查询结果只用于验证系统，不代表真实 harness 调查结论。

本项目把 agent harness 的配置与扩展能力整理为带版本、Target、条件、覆盖和证据的结构化知识，并通过离线 CLI、只读 MCP stdio 和文档站查询。产品范围见 [PRD](docs/PRD.md)，实施阶段见 [路线图](docs/roadmap.md)。

需要 Node.js 24.12.0+（24.x）和 pnpm 11.10.0。安装并完整验证：

```sh
pnpm install --frozen-lockfile
pnpm verify
```

`pnpm verify` 检查类型、lint、格式、导出 schema、fixture、单元和集成测试、编译及文档站构建。它不需要预先建立 release；文档站默认从临时 fixture release 构建，输出到 `site/.vitepress/dist/`。

要手动查询虚构数据，先建立一次固定发布：

```sh
pnpm fixtures:build
pnpm ahw query --release-id fixture-query list --json
pnpm ahw query --release-id fixture-query capability --harness demo-package-cli --surface cli --distribution demo-package --os windows --arch x64 --execution-mode native --policy latest_upstream --topic native_plugins --json
pnpm ahw query --release-id fixture-query search --text 技能 --json
pnpm ahw query --release-id fixture-query evidence --evidence-id evidence-demo-package-plugin --json
```

`pnpm fixtures:build` 使用不可覆盖的 ID；重复手动构建需另选 ID 或输出目录。`pnpm ahw validate`、`pnpm ahw compile` 和 `pnpm ahw query compare` 也可用，参数见 `--help`。精确版本不回退，`latest_upstream` 只是已发布快照中发现的版本，`latest_verified` 选择单个已复核版本。

MCP 客户端可把以下命令作为 stdio server 启动命令：

```sh
pnpm ahw mcp --release-id fixture-query
```

服务启动时固定已校验的 release，暴露 `list_harnesses`、`get_capability`、`compare_capabilities`、`search_knowledge`、`get_evidence` 五个只读工具。可用 `pnpm mcp:smoke` 检查 SDK 客户端到服务端的实际协议通信。命令的 stdout 仅供 MCP 协议使用。

```sh
pnpm docs:build
pnpm docs:build --release-id fixture-query
```

默认文档构建使用临时 fixture release；第二个命令构建显式指定、已校验的 release。页面中的事实来自同一个发布物，虚构内容有醒目标记。项目不提供自动配置管理、联网查询、查询时 LLM 调用或自动调查。目前没有正式产品知识、M1 本地 embedding 和 M2 增量维护；Windows 尚未实际验证。

开发步骤见 [开发指南](docs/development.md)，领域语义见 [数据模型](docs/data-model.md)，边界见 [架构](docs/architecture.md)。
