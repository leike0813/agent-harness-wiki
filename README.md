# agent-harness-wiki

本项目把五个 agent CLI 的配置和扩展机制整理为有固定来源、逐题状态和版本边界的离线 Wiki。产品语义见 [PRD](docs/PRD.md)，实施路线见 [OpenSpec 路线](docs/openspec-implementation-roadmap.md)。查询不会联网、运行 harness 或调用 LLM。

使用 Node.js 24.12.0+（24.x）、pnpm 11.10.0：

```sh
pnpm install --frozen-lockfile
pnpm verify
```

生产章节真源位于 `knowledge/<harness-id>/chapters/`，来源引用位于同产品的 `references/`。`pnpm knowledge:validate` 校验这五个产品的 35 篇当前章节。每次编译使用新的 release ID；发布物不可覆盖：

```sh
pnpm ahw validate --dataset-root . --profile production
pnpm ahw compile --dataset-root . --profile production --release-id reader-guides-20260929 --published-at 2026-09-29T00:00:00Z --stage
pnpm ahw query --release-id reader-guides-20260929 list --json
pnpm ahw query --release-id reader-guides-20260929 topic --harness pi --topic skills --json
pnpm ahw query --release-id reader-guides-20260929 topic --harness pi --topic skills --version 0.73.1 --json
pnpm ahw query --release-id reader-guides-20260929 search --topic mcp --text server --json
pnpm ahw query --release-id reader-guides-20260929 compare --topic skills --targets '[{"harness":"pi"},{"harness":"omp"}]' --json
pnpm ahw query --release-id reader-guides-20260929 source --reference-id ref-pi-skills-locations --json
pnpm docs:build --release-id reader-guides-20260929
pnpm ahw publish --release-id reader-guides-20260929
```

要查虚构 fixture，可在独立输出目录生成一次发布：

```sh
pnpm fixtures:build
pnpm ahw query --releases-root var/chapter-release-fixture/releases --release-id fixture-chapters topic --harness demo-open-cli --topic skills --json
```

`pnpm fixtures:build` 使用固定且不可覆盖的 ID；再次运行时改用 `pnpm ahw compile` 指定新 ID。fixture 与生产知识隔离，页面会标出虚构数据。

MCP 以 stdio 固定一个已验证发布，提供 `list_harnesses`、`get_topic`、`search_knowledge`、`compare_topics`、`get_source` 五个只读工具：

```sh
pnpm ahw mcp --release-id reader-guides-20260929
pnpm mcp:smoke
pnpm docs:build --release-id reader-guides-20260929
```

`pnpm docs:build` 无参数时构建临时 fixture release；显式指定 release 时先校验其完整性。站点页面、CLI 和 MCP 读取同一个不可变发布。软件版本映射只在来源证据足够时建立；`source_only` 不表示安装版本已验证。

项目不提供自动配置管理、查询时生成答案或后台调查。真实产品的源码、文档及 npm 包版本可能不同步。开发流程见 [开发指南](docs/development.md)。
