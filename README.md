# agent-harness-wiki

> M0 的虚构数据闭环已实现。M1 已固定五个真实 CLI 的 Linux/x64/glibc npm 包，并调查各自七类主题；当前有三条经人工接受的精确版本事实。

本项目把 agent harness 的配置与扩展能力整理为带版本、Target、条件、覆盖和证据的结构化知识，并通过离线 CLI、只读 MCP stdio 和文档站查询。想先理解调查、人工复核与发布的关系，可读[知识如何流转](docs/knowledge-workflow.md)；产品范围见 [PRD](docs/PRD.md)，实施阶段见 [路线图](docs/roadmap.md)。

需要 Node.js 24.12.0+（24.x）和 pnpm 11.10.0。安装并完整验证：

```sh
pnpm install --frozen-lockfile
pnpm verify
```

`pnpm verify` 检查类型、lint、格式、导出 schema、fixture、单元和集成测试、编译及文档站构建。它不需要预先建立 release；文档站默认从临时 fixture release 构建，输出到 `site/.vitepress/dist/`。

真实来源记录位于 `registry/` 与五个 `knowledge/<harness-id>/` 目录。当前固定的 npm 版本为 Codex CLI 0.157.1、Claude Code 2.1.283、OpenCode 1.18.32、Pi 0.73.1 和 OMP 18.3.4。Codex 源码仍固定在较早的独立 commit；OpenCode、Pi、OMP 源码 submodule 固定在各自的官方标签。源码 commit 不自动证明 npm 包行为。

本机取证包使用独立的 pnpm 清单及锁文件，内容只放在项目专属、Git 忽略的 store 和安装目录。首次准备原件：

```sh
git submodule update --init upstream/codex-cli upstream/opencode upstream/pi upstream/omp
cd research/package-set
pnpm install --frozen-lockfile --ignore-workspace --ignore-scripts --ignore-pnpmfile --store-dir ../../archive/pnpm-store
pnpm install --offline --frozen-lockfile --ignore-workspace --ignore-scripts --ignore-pnpmfile --store-dir ../../archive/pnpm-store
cd ../..
pnpm sources:audit
```

受管包只保留最近一次人工选定的稳定版本；换版先审计新包，再对**项目专属** store 执行 `pnpm store prune --store-dir ../../archive/pnpm-store`（在 `research/package-set/` 内）。官方 Markdown 原件位于 `archive/<harness-id>/`，不随 Git 分发；恢复后需由 `sources:audit` 核对 URL 元数据与字节 hash。普通校验、编译及 `pnpm verify` 不需要这些原件。

当前生产数据可离线构建为正式 release；以下构建命令使用不可覆盖的固定 ID，已构建时直接运行查询命令：

```sh
pnpm ahw validate --dataset-root . --profile production
pnpm ahw compile --dataset-root . --profile production --release-id five-harness-reviewed-20260928 --published-at 2026-09-27T16:26:16Z
pnpm ahw query --release-id five-harness-reviewed-20260928 list --json
pnpm ahw query --release-id five-harness-reviewed-20260928 capability --harness pi --surface cli --distribution npm:@mariozechner/pi-coding-agent:linux-x64-glibc --os linux --arch x64 --execution-mode native --policy exact --version 0.73.1 --topic mcp --json
```

该 release 含五个 Target、35 条首轮覆盖与来源元数据，以及三条经人工复核的窄事实：Pi Skills 用户目录、Pi 核心内置 MCP client 的缺失、OMP 原生用户 agent 的发现目录。证据来自精确版本包内文档或源码，尚无运行观察。35 项调查结论及剩余缺口见[完整复核清单](openspec/changes/archive/2026-09-28-m1-five-harness-knowledge/full-review.md)。官方网页文档快照未注明精确 CLI 包版本，不能据此推断安装包能力。

继续调查时可在支持项目 Skill 的 agent 中调用 `$harness-investigation codex-cli pi`（换成任意一个或多个 registry harness ID）。Skill 按登记来源扫描 npm、Git 和官方 Markdown，逐 harness 写入 `audits/`；未变化也留记录。新 npm tarball 和 Git commit 在忽略的 `archive/` 中只读调查，不安装或执行。也可指定完整精确 Target 和问题直接调查。新结论留作待审候选或写明证据缺口，人工复核后才由维护者另行发布。直接运行扫描与检查：`pnpm sources:scan codex-cli pi`、`pnpm sources:audit-log`。

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
pnpm ahw mcp --release-id five-harness-reviewed-20260928
```

服务启动时固定已校验的 release，暴露 `list_harnesses`、`get_capability`、`compare_capabilities`、`search_knowledge`、`get_evidence` 五个只读工具。可用 `pnpm mcp:smoke` 检查 SDK 客户端到服务端的实际协议通信。命令的 stdout 仅供 MCP 协议使用。

```sh
pnpm docs:build
pnpm docs:build --release-id five-harness-reviewed-20260928
```

默认文档构建使用临时 fixture release；第二个命令构建显式指定、已校验的 release。页面中的事实来自同一个发布物，虚构内容有醒目标记。项目不提供自动配置管理、联网查询、查询时 LLM 调用或后台调查。目前没有真实制品启动记录和 M1 本地 embedding；Windows 尚未实际验证。`sources:scan` 是维护者显式调用的联网维护命令，不影响离线查询与构建。

开发步骤见 [开发指南](docs/development.md)，领域语义见 [数据模型](docs/data-model.md)，边界见 [架构](docs/architecture.md)。
