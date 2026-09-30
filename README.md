# agent-harness-wiki

本项目把当前收录的 agent harness 产品的配置和扩展机制整理为有固定来源、逐题状态和版本边界的离线 Wiki。同一产品的 CLI、IDE、桌面等界面共享一份机制章节；产品与界面身份以 `catalog/harnesses.yaml` 为准。产品语义见 [PRD](docs/PRD.md)，实施路线见 [OpenSpec 路线](docs/openspec-implementation-roadmap.md)。查询不会联网、运行 harness 或调用 LLM。

使用 Node.js 24.12.0+（24.x）、pnpm 11.10.0：

```sh
pnpm install --frozen-lockfile
pnpm verify
```

生产章节真源位于 `knowledge/<harness-id>/chapters/`，来源引用位于同产品的 `references/`。`pnpm knowledge:validate` 校验登记产品的当前章节（6 个产品 × 7 主题 = 42 篇）；旧版 edition 仍在同一发布的历史入口可查。每次编译使用新的 release ID；发布物不可覆盖。下面的查询读取 `catalog-surfaces-20260930-v1`：

```sh
pnpm ahw validate --dataset-root . --profile production
pnpm ahw query --release-id catalog-surfaces-20260930-v1 list --json
pnpm ahw query --release-id catalog-surfaces-20260930-v1 topic --harness pi --topic skills --json
pnpm ahw query --release-id catalog-surfaces-20260930-v1 topic --harness pi --topic skills --surface-id cli --version 0.73.1 --json
pnpm ahw query --release-id catalog-surfaces-20260930-v1 search --topic mcp --text '怎样让代理调用外部工具？' --json
pnpm ahw query --release-id catalog-surfaces-20260930-v1 search --harness claude-code --topic mcp --text mcpServers --json
pnpm ahw query --release-id catalog-surfaces-20260930-v1 compare --topic skills --targets '[{"harness":"pi"},{"harness":"omp"}]' --json
pnpm ahw query --release-id catalog-surfaces-20260930-v1 list --scope catalog --json
pnpm ahw query --release-id catalog-surfaces-20260930-v1 topic --harness codex --topic skills --surface-id cli --json
pnpm ahw query --release-id catalog-surfaces-20260930-v1 source --reference-id ref-pi-skills-locations --json
pnpm docs:build --release-id catalog-surfaces-20260930-v1
```

要查虚构 fixture，可在独立输出目录生成一次发布：

```sh
pnpm fixtures:build
pnpm ahw query --releases-root var/chapter-release-fixture/releases --release-id fixture-chapters topic --harness demo-open-cli --topic skills --json
```

`pnpm fixtures:build` 使用固定且不可覆盖的 ID；再次运行时改用 `pnpm ahw compile` 指定新 ID。fixture 与生产知识隔离，页面会标出虚构数据。

MCP 以 stdio 固定一个已验证发布，提供 `list_harnesses`、`get_topic`、`search_knowledge`、`compare_topics`、`get_source` 五个只读工具：

```sh
pnpm ahw mcp --release-id catalog-surfaces-20260930-v1
pnpm mcp:smoke
pnpm docs:build --release-id catalog-surfaces-20260930-v1
```

`pnpm docs:build` 无参数时构建临时 fixture release；显式指定 release 时先校验其完整性。站点页面、CLI 和 MCP 读取同一个不可变发布。软件版本映射只在来源证据足够时建立；`source_only` 不表示安装版本已验证。读取可带 `--surface-id`；省略界面时按整个产品解析，已声明但章节没有答案的界面返回 `not_investigated`。带 `--version` 时必须同时给 `--surface-id`，否则返回 `ambiguous`。`list --scope catalog` 返回 catalog 中登记与候选产品；`get_source` 在没有已发布来源引用时返回 catalog 来源引用（官方链接、固定快照 hash、定位与短摘录），它不建立能力事实或版本映射。

生产搜索发布使用本机 Ollama 的 `qwen3-embedding:4b`；模型 digest 固定在 `registry/search-model.json`。构建和查询不会下载模型。搜索只覆盖当前章节小节，返回命中原因、正文片段、来源范围及 `semantic_status`；本机模型不可用时显示 `semantic_unavailable` 并继续词法搜索。语义相似度只表示相关性，章节的软件版本仍由 `topic` 查询的映射决定。

新增章节时按 [成稿规则](docs/topic-questions.md) 写路径、配置文件示例、处理链、检查方式与固定来源，再用 [开发指南](docs/development.md) 中的 staging 编译和发布命令；已发布的 release ID 不可重用。

项目不提供自动配置管理、查询时生成答案或后台调查。真实产品的源码、文档及 npm 包版本可能不同步。开发流程见 [开发指南](docs/development.md)。
