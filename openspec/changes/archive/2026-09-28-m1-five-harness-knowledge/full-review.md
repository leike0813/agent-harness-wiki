# 首批五个 Harness 的调查结论与复核清单

本次调查固定了五个 CLI 的 Linux/x64 原生 npm 版本，并逐项检查七类主题，共有 **35 条可定位的首轮调查记录**。每项都留下了所查材料、具体发现或缺口；目前仍是 `partial`，表示既定调查尚有未解决的问题，**不是功能只支持一部分，也不是某项能力已获确认**。工作区另有 7 条来自已复核 Codex Git 增量审计的 `source-tree` Coverage，它们属于另一个 Target，不算作这 35 项。维护者于 2026-09-28 接受这 35 项调查结论及两条限定范围的精确版本 Claim；正式发布 `five-harness-reviewed-20260928` 含三条已接受事实。

按 `harness-investigation` 固定模板撰写的审阅入口：[Codex CLI](../../../../audits/codex-cli/target-20260927T161424Z.md)、[Claude Code](../../../../audits/claude-code/target-20260927T161424Z.md)、[OpenCode](../../../../audits/opencode/target-20260927T161424Z.md)、[Pi](../../../../audits/pi/target-20260927T161424Z.md)、[OMP](../../../../audits/omp/target-20260927T161424Z.md)。每份先解释结论与证据边界，再列七主题索引；本文件保留跨产品汇总。

## 五个产品分别查明了什么

**Codex CLI `@openai/codex@0.157.1`。**包内 `bin/codex.js` 会选择平台对应的可选原生包并启动其中的二进制；它没有提供 Skills、MCP、hooks 等配置规则。安装包 README 也只介绍安装与使用入口；归档的官方文档讨论了这些机制，却没有注明适用的包版本。因此目前能明确告知维护者在哪里继续追查，不能把网页内容写成这个 npm 包的能力事实。另一次已复核的[上游增量审计](../../../../audits/codex-cli/audit-codex-cli-079462d0-b4be-4793-aa9a-ee283e0ac4fe.md)发现新的源码 commit 只改了两处日志输出；这个 commit 仍不能替 `0.157.1` 证明配置行为。要缩小缺口，需找到发行包与源码的可验证映射，或另行对该精确包做受控观察。

**Claude Code `@anthropic-ai/claude-code@2.1.283`。**包内 README 指向官方文档，但不说明 MCP、Skills、agent、plugin 和设置规则在此精确版本中的对应关系。当前隔离包集按设计禁用了安装脚本，`bin/claude.exe` 因而仍是提示安装脚本未运行的文本桩；平台可选包在独立包集中，不能把“已取得包”说成“CLI 已启动”。归档文档提供了配置范围、传输和插件的调查线索，却不能单独证明已选包的实际加载或执行。此时不应声称该包的插件 `loaded/active/healthy`，也不应把缺少版本证据说成 `unsupported`。

**OpenCode `opencode-ai@1.18.32`。**所选 npm 包是分发二进制的包装包；禁用安装脚本后，`bin/opencode.exe` 同样保留提示桩，平台二进制位于可选包。固定源码中的文档和实现说明了 agents、providers、MCP、插件及配置层级，但本轮没有建立该源码 revision 与包装包内二进制的构建对应关系。这些来源能定位后续要查的实现，尚不足以把源码结论外推到 `1.18.32` 的二进制。最有价值的下一步是核对官方构建或制品身份，再针对已映射的版本作能力复核。

**Pi `@mariozechner/pi-coding-agent@0.73.1`。**这个精确包附带主题文档。[用户 Skills 目录](../../../../knowledge/pi/claims/claim-pi-user-skills-path.yaml)有包内文档定位，并已被人工接受。包内 README 第 470 行还明确写出核心**没有内置 MCP**，并把 MCP 实现指向外部扩展；维护者已接受仅针对“核心内置 MCP client”的[窄结论](../../../../knowledge/pi/claims/claim-pi-core-mcp.yaml)，不能用来否定外部扩展。其他文档也说明 providers、hooks 和包扩展的入口，但具体扩展的安装、激活与运行没有被观察，主题覆盖仍为 `partial`。

**OMP `@oh-my-pi/pi-coding-agent@18.3.4`。**这个精确包带有可读的 TypeScript 源码。调查者在包内定位到 agent、MCP、hooks、providers、插件命令及设置层级代码，其中已接受的[用户 agent 路径结论](../../../../knowledge/omp/claims/claim-omp-user-agents-path.yaml)有目录声明和目录发现调用链两处固定证据。结论只说 OMP 原生用户 agent 定义的发现路径；它不宣称已经放入一个 agent，也不宣称加载或执行成功。其余机制虽有代码入口，具体配置优先级、连接、插件健康状态仍需分别验证。

## 维护者的语义决定

1. 接受下方 35 项 Coverage 的**调查过程与缺口记录**；这不意味着七类能力均已确认，也不要求把 `partial` 改为 `complete`。
2. 接受 Pi 核心内置 MCP client 与 OMP 原生用户 agent 发现路径两条窄 Claim，Evidence 和 Target 保持原限定。外部扩展与实际加载仍需另行取证。
3. 已校验结构化数据并构建固定发布。CLI、MCP 和站点读取同一 `five-harness-reviewed-20260928`；三条已接受事实与 35 项 `partial` 调查进度并存。

本 change 的目标是**精确来源身份、逐主题调查和人工复核门禁**；五个制品的隔离启动、本地 embedding 搜索属于后续 M1 工作，不能通过勾选本 change 的任务来冒充完成。

<!-- prettier-ignore -->
| 产品 | 固定 npm 版本 | 来源边界 |
|---|---|---|
| Codex | `@openai/codex@0.157.1` | Package README is sparse; captured official docs have unknown version applicability. Older checkout is a separate identity. |
| Claude | `@anthropic-ai/claude-code@2.1.283` | Package README is sparse; captured official docs have unknown version applicability. |
| OpenCode | `opencode-ai@1.18.32` | npm wrapper ships a binary; pinned source tag is not yet mapped to the binary build. |
| Pi | `@mariozechner/pi-coding-agent@0.73.1` | Package ships topic docs; selected source files are tied to the npm integrity. |
| OMP | `@oh-my-pi/pi-coding-agent@18.3.4` | Package ships the inspected TypeScript source; execution and installed extension state remain unobserved. |

## 35 项调查索引

每个链接都指向完整 Coverage，内有精确 Target、固定来源、所查文件或章节及剩余缺口。表中的短句是调查索引，不是已发布的能力事实。

<!-- prettier-ignore -->
| 产品 | 主题 | 已查结果与剩余证明 |
|---|---|---|
| Codex | [Skills](../../../../knowledge/codex-cli/coverage/coverage-codex-cli-skills.yaml) | Official page describes paths; package README does not bind those paths to 0.157.1. |
| Codex | [MCP](../../../../knowledge/codex-cli/coverage/coverage-codex-cli-mcp.yaml) | Official page describes server configuration; exact package applicability unverified. |
| Codex | [Custom agents](../../../../knowledge/codex-cli/coverage/coverage-codex-cli-custom-agents.yaml) | Configuration reference mentions agent settings, but no exact-package definition/loading contract was established. |
| Codex | [Custom providers](../../../../knowledge/codex-cli/coverage/coverage-codex-cli-custom-providers.yaml) | `model_provider(s)` appears in unversioned configuration reference; exact-package schema unverified. |
| Codex | [Hooks](../../../../knowledge/codex-cli/coverage/coverage-codex-cli-hooks.yaml) | Reference lists hook settings and events; 0.157.1 applicability and execution unverified. |
| Codex | [Native plugins](../../../../knowledge/codex-cli/coverage/coverage-codex-cli-native-plugins.yaml) | Skills and MCP pages mention plugin distribution; binary plugin loading unverified. |
| Codex | [Configuration](../../../../knowledge/codex-cli/coverage/coverage-codex-cli-configuration.yaml) | Page describes user/project precedence; exact-package precedence unverified. |
| Claude | [Skills](../../../../knowledge/claude-code/coverage/coverage-claude-code-skills.yaml) | Captured page describes locations and duplicate names; package version binding absent. |
| Claude | [MCP](../../../../knowledge/claude-code/coverage/coverage-claude-code-mcp.yaml) | Captured page describes transport/scope; exact-package behavior unverified. |
| Claude | [Custom agents](../../../../knowledge/claude-code/coverage/coverage-claude-code-custom-agents.yaml) | Captured pages refer to agent files and scoped servers; definition/loading for 2.1.283 unverified. |
| Claude | [Custom providers](../../../../knowledge/claude-code/coverage/coverage-claude-code-custom-providers.yaml) | Settings page mentions model/provider options; general custom-provider contract unknown. |
| Claude | [Hooks](../../../../knowledge/claude-code/coverage/coverage-claude-code-hooks.yaml) | Settings page mentions hook configuration/reload; exact package execution unverified. |
| Claude | [Native plugins](../../../../knowledge/claude-code/coverage/coverage-claude-code-native-plugins.yaml) | Pages mention plugins, trust and plugin-provided MCP; loaded/active/healthy state unverified. |
| Claude | [Configuration](../../../../knowledge/claude-code/coverage/coverage-claude-code-configuration.yaml) | Captured page describes scopes/precedence; exact-package applicability unverified. |
| OpenCode | [Skills](../../../../knowledge/opencode/coverage/coverage-opencode-skills.yaml) | Pinned source documents Skills; source-to-binary mapping unverified. |
| OpenCode | [MCP](../../../../knowledge/opencode/coverage/coverage-opencode-mcp.yaml) | Pinned source documents local/remote servers; binary behavior unverified. |
| OpenCode | [Custom agents](../../../../knowledge/opencode/coverage/coverage-opencode-custom-agents.yaml) | Pinned source defines configurable primary/subagents; binary mapping and loading unverified. |
| OpenCode | [Custom providers](../../../../knowledge/opencode/coverage/coverage-opencode-custom-providers.yaml) | Pinned source has provider configuration; binary mapping and connection unverified. |
| OpenCode | [Hooks](../../../../knowledge/opencode/coverage/coverage-opencode-hooks.yaml) | Pinned source documents plugin event/tool hooks; binary mapping and invocation unverified. |
| OpenCode | [Native plugins](../../../../knowledge/opencode/coverage/coverage-opencode-native-plugins.yaml) | Pinned source documents local/npm plugins; binary mapping and activation unverified. |
| OpenCode | [Configuration](../../../../knowledge/opencode/coverage/coverage-opencode-configuration.yaml) | Pinned source describes config precedence; binary mapping unverified. |
| Pi | [Skills](../../../../knowledge/pi/coverage/coverage-pi-skills.yaml) | Package docs identify user path; one narrow path Claim was previously accepted. |
| Pi | [MCP](../../../../knowledge/pi/coverage/coverage-pi-mcp.yaml) | Package README excludes built-in MCP and points to extensions; narrow accepted Claim below. |
| Pi | [Custom agents](../../../../knowledge/pi/coverage/coverage-pi-custom-agents.yaml) | Package README excludes built-in subagents and points to external composition; extension behavior unobserved. |
| Pi | [Custom providers](../../../../knowledge/pi/coverage/coverage-pi-custom-providers.yaml) | Package docs describe `models.json` and `registerProvider`; registration/authentication unobserved. |
| Pi | [Hooks](../../../../knowledge/pi/coverage/coverage-pi-hooks.yaml) | Package docs describe extension event callbacks; event execution unobserved. |
| Pi | [Native plugins](../../../../knowledge/pi/coverage/coverage-pi-native-plugins.yaml) | Package docs describe `pi install` and manifests; installed package activation unobserved. |
| Pi | [Configuration](../../../../knowledge/pi/coverage/coverage-pi-configuration.yaml) | Package docs state project/global settings precedence; exact rule remains under semantic review. |
| OMP | [Skills](../../../../knowledge/omp/coverage/coverage-omp-skills.yaml) | Packaged source has discovery and duplicate resolution; path outcomes unverified. |
| OMP | [MCP](../../../../knowledge/omp/coverage/coverage-omp-mcp.yaml) | Packaged source has MCP manager/transports; server health unobserved. |
| OMP | [Custom agents](../../../../knowledge/omp/coverage/coverage-omp-custom-agents.yaml) | Packaged discovery code names OMP agent roots; narrow user path accepted below. |
| OMP | [Custom providers](../../../../knowledge/omp/coverage/coverage-omp-custom-providers.yaml) | Packaged config validates custom providers/models; connection unobserved. |
| OMP | [Hooks](../../../../knowledge/omp/coverage/coverage-omp-hooks.yaml) | Packaged hook loader/runner and pre/post definitions inspected; execution unobserved. |
| OMP | [Native plugins](../../../../knowledge/omp/coverage/coverage-omp-native-plugins.yaml) | Packaged `plugin` command has install/list/enable/doctor; installed plugin health unobserved. |
| OMP | [Configuration](../../../../knowledge/omp/coverage/coverage-omp-configuration.yaml) | Packaged settings code layers sources; setting-specific precedence unverified. |

## 已接受的精确版本结论

第一行此前已由用户接受并发布在 `first-wave-pi-skills-20260927`。后两行于本轮被接受；三条现均进入 `five-harness-reviewed-20260928`。

<!-- prettier-ignore -->
| 状态 | Claim / Target | 断言与条件 | 待核证据 |
|---|---|---|---|
| Accepted | [Pi Skills user path](../../../../knowledge/pi/claims/claim-pi-user-skills-path.yaml), Pi 0.73.1 | User Skills directory `~/.pi/agent/skills`; no extra condition | [Evidence](../../../../knowledge/pi/evidence/evidence-pi-user-skills-path.yaml): `snapshot-pi-npm`, `docs/skills.md:27`, documented. |
| Accepted | [Pi core MCP](../../../../knowledge/pi/claims/claim-pi-core-mcp.yaml), Pi 0.73.1 | Built-in MCP client in Pi core is unsupported; does **not** judge external extensions | [Evidence](../../../../knowledge/pi/evidence/evidence-pi-core-mcp.yaml): `snapshot-pi-readme-npm`, `README.md:470`, documented. |
| Accepted | [OMP user agent path](../../../../knowledge/omp/claims/claim-omp-user-agents-path.yaml), OMP 18.3.4 | OMP-native user agent definitions discovered from `~/.omp/agent/agents/*.md`; no extra condition | [Path evidence](../../../../knowledge/omp/evidence/evidence-omp-user-agents-path.yaml): `src/task/discovery.ts:5`; [discovery evidence](../../../../knowledge/omp/evidence/evidence-omp-user-agents-discovery.yaml): lines 91-109. Both cite the exact-package `snapshot-omp-agent-discovery-npm`; source inspected, runtime unobserved. |

两条新 Assessment 记录维护者的接受决定。若要进一步声称扩展可用或 agent 实际加载，需要独立的运行证据。

## 验证与边界

`pnpm ahw validate --dataset-root . --profile production`、`pnpm sources:audit`、`openspec validate m1-five-harness-knowledge --strict` 与完整离线 `pnpm verify` 均通过；`COVERAGE_INCOMPLETE` 是上述缺口的预期警告。正式发布 `five-harness-reviewed-20260928` 经过完整性核验：五个 Harness、**42 条** `partial` Coverage（35 条首轮 npm Target，加上 7 条另属 Codex `source-tree` Target）、三条已接受事实。CLI 和真实 MCP 客户端查询 Pi MCP、OMP Custom agents 均返回一条已接受事实，主题状态仍为 `partial`。站点从这一正式发布构建，`releases/current.json` 指向该 ID。此前的隔离候选 `var/review-full/five-topic-review-20260928/` 保留接受前的零事实检查记录，不能代表当前发布。
