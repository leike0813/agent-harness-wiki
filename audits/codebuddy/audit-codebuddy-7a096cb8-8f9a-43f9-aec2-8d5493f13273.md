# CodeBuddy Code 上游审阅报告 · 2026-10-13

## 给维护者的结论

本轮唯一变化的来源是官方文档仓库 `codebuddy-code`（`ac025a2f75b0` → `7576ffa88f81`），8 个文件、+122/-1。逐个 hunk 读完后，只有两处是真正的知识变化：`docs/settings.md` 新增第一方设置键 `daemon.autoRestartOnUpdate`，`docs/mcp.md` 新增「MCP 工具并发执行」规则（服务器声明 `readOnlyHint` 才并发）。据此新建两个章节 edition——`configuration` 升到 v4、`mcp` 升到 v2，并切换 `registry/chapter-current.yaml`；`codebuddy-cli-mcp-v1` 与 `codebuddy-cli-configuration-v3` 已在 `origin/main`（提交 b1a7455c），旧文件逐字保留。

其余六个文件都不需要动章节：`docs/env-vars.md` 只改了 Shell 输出截断流程图里的一行注释，`docs/startup-profiling.md` 只在文末加了一条指向仓库外 Bun PGO 说明的链接，`docs/tools-reference.md` 新增的两节（同一轮多工具执行顺序、Bash 命令失败显示）在候选 references 里没有任何 locator 指向，八个主题章节也没有陈述这些机制。`CHANGELOG.md` 与 `docs/release-notes/v2.165.0.md` 只新增 2.165.0 段落，**不能**当作本轮结论的依据：npm 身份本轮 unchanged，仍是 2.164.0，仓库 main 的 2.165.0 记录描述的是尚未由该 npm 身份发布的构建。

值得知道的风险：变更记录里「MCP OAuth 登录自动续期」「ToolSearch 隐藏被禁工具」「PTC 安全审批交互」三条看起来会改写已发布结论（其中 OAuth 那条正对应 `mcp.auth` 目前显式记录的 `partial` 缺口），但它们只有变更记录这一个来源，本轮按「不作 2.164.0 行为证据」处理，`mcp.auth` 状态与缺口表述原样保留，等 npm 身份推进到包含 2.165.0 的发行版后复查。

## 变化的意义与证据边界

### 新增设置键 `daemon.autoRestartOnUpdate`（configuration / config.defaults）

`docs/settings.md` 的「可用设置」表新增一行：daemon 自动安装新版本或检测到磁盘上的 CLI 已被升级后，是否在空闲时自动重启到新版本（默认 `true`）；关闭时保持待重启，可在 Web UI / Desktop 手动重启；状态取 `GET /api/v1/info` 的 `autoUpdate`，立即检查用 `POST /api/v1/update/check`。configuration v3 的 `config-defaults` 引用的正是这张表（`ref-codebuddy-settings-keys`），新增段落按「默认值与功能开关」归入该问题。

同名的 `CODEBUDDY_DAEMON_AUTO_RESTART_DISABLED` 在 `docs/env-vars.md:269` 已有既有行（本轮 diff 未改这一行）：设为 `1`/`true` 时 daemon **仍继续检查并安装更新**，只是不自己重启。因此章节同时引用 settings 行与 env 行，避免读者把它误当作「关闭 `autoUpdates`」。新引用固定到 `7576ffa88f81`，`content_sha256` 由 pinned workspace 字节计算。

### MCP 工具并发执行（mcp / mcp.capabilities）

`docs/mcp.md` 新增「工具并发执行」一节：宿主只让只读调用并发，其余按模型给出的顺序依次执行；**MCP 工具默认按顺序执行**，只有 server 在 `tools/list` 的工具注解里声明 `"annotations": { "readOnlyHint": true }` 才并发，经 `ToolSearch` 延迟加载的工具同一规则。官方明确要求只给真正无副作用的工具声明，因为标为只读的工具会与同轮其他只读调用同时运行。

mcp v1 的 `mcp-capabilities` 讲工具 / Prompts / Apps 的可用面，但没有执行调度语义，属该问题下的新增第一方字段，故按 `mcp.capabilities` 改写。宿主侧「哪些内置工具算只读、审批如何阻塞后续调用」的完整规则只存在于 `docs/tools-reference.md`，本次不在 MCP 章内扩写，只在正文点名该文档小节——没有为它单开引用，因为候选里没有该文件的既有引用面可循。

### 已核查并结案为无知识影响的部分

- `docs/env-vars.md`：唯一 diff 是 ASCII 流程图里 placeholder 注释改为「preview 取命令输出开头，命令失败时先给 Exit Code」。不是配置键、默认值、优先级层级或写入目标；现有 env-vars 引用定位在「Shell 配置」「性能和输出」「工具和功能开关」及若干变量行，都不命中该图。
- `docs/startup-profiling.md`、`docs/tools-reference.md`：无引用、无章节陈述，见上文。
- `custom_agents` / `custom_providers` / `hooks` / `native_plugins`：虽然同引 `ref-codebuddy-settings-keys`，但引用点分别是 `agent`、`variantModels` / `reasoningEffort`、`disableAllHooks` / `allowUntrustedFrontmatterHooks`、`enableAllProjectMcpServers` / `enabledMcpjsonServers` / `disabledMcpjsonServers`，本轮 diff 未改动其中任何一个键，也未改动其默认值或优先级。
- `skills`、`local_transcripts`：不引用本轮改动的任何段落。
- 未新增软件版本映射：npm 身份未变，仓库 main 的 2.165.0 记录不足以证明已发布包行为。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | codebuddy-cli-configuration-v4 | config.defaults：answered（新增段落） | 已进入候选发布（新建 edition，v3 保留） |
| mcp | codebuddy-cli-mcp-v2 | mcp.capabilities：answered（新增执行调度规则） | 已进入候选发布（新建 edition，v1 保留） |
| custom_agents / custom_providers / hooks / native_plugins / skills / local_transcripts | 原 edition | 状态不变 | 保留旧版本：对应 locator 未被本轮 diff 触及 |

**发布：** 本轮为 `delivery=pr`，worker 不发布、不切换本地指针。**受管二进制：** 未触发（monitor PR 模式）。

## 待处理与独立复核

**审计记录：** [`audit-codebuddy-7a096cb8-8f9a-43f9-aec2-8d5493f13273.yaml`](./audit-codebuddy-7a096cb8-8f9a-43f9-aec2-8d5493f13273.yaml)。**待处理旧审计：** 无。**待复核问题：** 无——两处改写都是新增字段/规则，无来源冲突、未推翻已发布配置步骤，也未改动 settings 分层优先级或 MCP 工具命名/权限规则这类跨主题关键加载机制。

`pending_question_ids` 为空。`mcp.auth` 仍是章节内显式记录的 `partial` 缺口，本轮无可据以改写的新证据，不计入 pending。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-codebuddy-docs`（`https://cnb.cool/codebuddy/codebuddy-code.git`） | `ac025a2f75b0a2d4e1b9a05ee343b854168f888a` → `7576ffa88f81540b71d4326cfbca779f78132073` | changed；8 个文件 +122/-1，逐 hunk 读；两处进入章节，六处结案 |
| `source-codebuddy-npm` | `2.164.0@sha512-1DvSEz…` → 同 | unchanged；未取包字节，未新增映射 |
| `source-codebuddy-site` | `6041efd96529c902…` → 同 | unchanged |

## 验证与差异入口

```sh
pnpm maintenance:candidates check --candidate /tmp/ahw-batch-1791831061/candidates/codebuddy
# 通过（exit 0，仅列出候选文件）

git -C /tmp/ahw-source-workspaces/ws-7576ffa88f81-f1f5c41c-1ceb-4ded-a57e-59738ae1813d \
  diff ac025a2f75b0a2d4e1b9a05ee343b854168f888a 7576ffa88f81540b71d4326cfbca779f78132073 -- <path>
```

未运行：`pnpm verify`、聚合 `pnpm knowledge:validate`、`pnpm sources:audit-log`——由 coordinator 在集成全部产品后统一执行。

本轮新增/改动：`knowledge/codebuddy/chapters/codebuddy-cli-mcp-v2.md`、`codebuddy-cli-configuration-v4.md`、`registry/chapter-current.yaml`、`audits/codebuddy/audit-codebuddy-7a096cb8-*.{yaml,md}`，以及 artifacts / snapshots / references 各 3 条（`artifact-codebuddy-docs-{settings,mcp,env-vars}-20261012`、`snapshot-codebuddy-docs-{settings,mcp,env-vars}-20261012`、`ref-codebuddy-settings-daemon-restart`、`ref-codebuddy-env-daemon-auto-restart`、`ref-codebuddy-mcp-tool-concurrency`）。旧 edition `codebuddy-cli-mcp-v1.md`、`codebuddy-cli-configuration-v3.md` 未改一个字节。