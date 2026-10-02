# agent-harness-wiki

本项目把当前收录的 agent harness 产品的配置和扩展机制整理为有固定来源、逐题状态和版本边界的 Wiki。同一产品的 CLI、IDE、桌面等界面共享一份机制章节；产品与界面身份以 `catalog/harnesses.yaml` 为准。产品语义见 [PRD](docs/PRD.md)，实施路线见 [OpenSpec 路线](docs/openspec-implementation-roadmap.md)。本地查询读取离线发布，消费者按需读取在线发布；两者都不运行 harness 或调用生成式 LLM。

使用 Node.js 24.12.0+（24.x）、pnpm 11.10.0：

```sh
pnpm install --frozen-lockfile
pnpm verify
```

<a id="local-full-history-release"></a>

## 本地完整历史发布

生产章节真源位于 `knowledge/<harness-id>/chapters/`，来源引用位于同产品的 `references/`。`pnpm knowledge:validate` 校验登记产品的当前章节（6 个产品 × 7 主题 = 42 篇）；旧版 edition 仍在同一发布的历史入口可查。消费者缓存不含被裁剪章节，完整历史须克隆仓库、安装锁定工具链，再按[开发指南](docs/development.md)准备本地发布。每次编译使用新的 release ID；发布物不可覆盖。下面的查询读取已有的 `catalog-surfaces-20260930-v1`：

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

在线知识分发是另一条能力线：从同一份已校验真源生成 `data/v1/` 静态资源和同发布站点页面，每个产品 × 主题只收录当前章与最近一个历史版，其余章节退为裁剪标记，检索只有词法入口。构建需要干净真源、指定 Git commit 的完整 first-parent 历史与锁定工具，不依赖本地 release、`archive/` 原件、SQLite 或语义模型：

```sh
pnpm online:build --dataset-root . --profile production --commit <完整 SHA> --published-at <固定 ISO 时间> --base /agent-harness-wiki/ --out-dir <输出目录>
pnpm online:verify <输出目录>
```

`pnpm online:build` 由 `scripts/build-online.ts` 实现，`--retain <已验证旧部署目录...>` 可选地把这些旧部署目录的 `data/` 并入新部署（旧页面由旧归档单独保存，不随新站点重建）；`pnpm online:verify` 由 `scripts/verify-online.ts` 实现，接收一个部署目录。`pnpm docs:build --online`（`scripts/build-site.ts`）接受同一组在线参数（`--dataset-root`、`--profile`、`--commit`、`--published-at`、`--base`、`--out-dir`、`--retain`），等价于 `pnpm online:build`。输出目录不可变：已存在且校验一致的同名产物复用，内容不同则拒绝，新 release 必须用新目录。构建先写 staging，联合验证页面与数据身份、引用、来源、fixture 隔离和部署目录容量（解包字节 ≤512 MiB）后才接受候选，失败保留既有已接受输出。只有需要排序多个非 current 历史版本时才要求 Git 历史：隔离 fixture 且至多一个非 current 版本可不用。消费者 CLI／MCP 包已由 change `online-consumer-cli-mcp` 交付，见 [消费者包说明](packages/consumer/README.md) 与 [ADR 0010](docs/decisions/0010-online-consumer.md)；公开发布 CI／npm／Pages 发布属于第三个 change，本轮不部署、不发包。最低 Node 版本为 24.12.0；本机在线构建受测环境为 Linux x64、Node 24.12.0（ICU 77.1），消费者已通过 Linux x64／macOS arm64／Windows native x64 × Node 24.12.0／24.21.0 六组真实 CI 验收。

### 消费者 CLI／MCP

公开包 `agent-harness-wiki@1.0.0` 提供在线只读查询与本地 stdio MCP，按需读取已发布知识，不携带完整历史、SQLite 或语义模型。完整说明见 [消费者包说明](packages/consumer/README.md)，取舍见 [ADR 0010](docs/decisions/0010-online-consumer.md)。

当前已生成本地 tgz，尚未发布到 npm；以下命令供公开发布后使用。

```sh
npx -y agent-harness-wiki@1.0.0 query topic --harness codex --topic mcp --surface-id cli
npx -y agent-harness-wiki@1.0.0 query search --text MCP --json
npx -y agent-harness-wiki@1.0.0 mcp
```

默认入口 `https://leike0813.github.io/agent-harness-wiki/data/v1/` 尚未部署，在线启动按网络失败报告；`--data-url` 只覆盖同协议镜像，`--offline` 只读同一入口／协议下最近一次成功初始化的必需缓存，`--cache-dir` 指定目录，`--no-file-cache` 关闭文件缓存读写。缓存默认目录：Linux 有效绝对 `$XDG_CACHE_HOME/agent-harness-wiki`（无效时 `~/.cache/agent-harness-wiki`）、macOS `~/Library/Caches/agent-harness-wiki`、Windows `%LOCALAPPDATA%\agent-harness-wiki\Cache`（无效时 `%USERPROFILE%\AppData\Local\agent-harness-wiki\Cache`）。消费者检索只有词法入口；每个产品 × 主题只保留当前章与最近一个历史版，选中被裁剪章节返回正常 `history_not_available`，完整历史需单独准备本地发布。

MCP 宿主配置指向 npx 并固定精确程序版本：

```json
{
  "mcpServers": {
    "agent-harness-wiki": { "command": "npx", "args": ["-y", "agent-harness-wiki@1.0.0", "mcp"] }
  }
}
```

生产搜索发布使用本机 Ollama 的 `qwen3-embedding:4b`；模型 digest 固定在 `registry/search-model.json`。构建和查询不会下载模型。搜索只覆盖当前章节小节，返回命中原因、正文片段、来源范围及 `semantic_status`；本机模型不可用时显示 `semantic_unavailable` 并继续词法搜索。语义相似度只表示相关性，章节的软件版本仍由 `topic` 查询的映射决定。

新增章节时按 [成稿规则](docs/topic-questions.md) 写路径、配置文件示例、处理链、检查方式与固定来源，再用 [开发指南](docs/development.md) 中的 staging 编译和发布命令；已发布的 release ID 不可重用。

项目不提供自动配置管理、查询时生成答案或后台调查。真实产品的源码、文档及 npm 包版本可能不同步。开发流程见 [开发指南](docs/development.md)。

代码采用 MIT，原创知识与文档采用 CC BY 4.0，第三方来源摘录保留其原有权利，见 [LICENSE](LICENSE)、[LICENSE-knowledge](LICENSE-knowledge) 与 [NOTICE](NOTICE)。
