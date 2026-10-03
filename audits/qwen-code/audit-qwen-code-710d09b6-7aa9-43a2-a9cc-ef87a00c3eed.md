# Qwen Code 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮 Qwen Code 仓库从 `e767e223` 前进到 `2c591ecc`，虽然只是一个提交，却带来 1321 个文件的变化。对读者而言，实质变化集中在一件事上：新增了随主 CLI 包分发的外部记忆服务 Mem0，它由一个新的 `memory.mem0` 设置驱动，并同时向 MCP 与 Hook 两个系统注入条目。另有两个新的配置面：`tools.freeform`（Code Mode 在 OpenAI Responses 模型上的原始文本输入）和三个只允许运维作用域的 models.dev 环境变量。npm 包版本未变（仍为 0.24.7，integrity 未变），本轮也未据此制造任何版本映射。

已发布章节的既有结论没有被推翻：七层配置优先级、`.env` 只取第一个文件、运维受限键清单、信任门控与迁移表在新提交中原样保留。`custom_agents`、`custom_providers`、`native_plugins`、`skills` 四个主题的 diff 集中在托管调度与遥测管道，未产生读者可见的机制或配置步骤变化，因此本轮不改写这四章。

## 变化的意义与证据边界

### `memory.mem0` 同时改动配置、MCP 与 Hook 三个主题

新增的 `memory.mem0` 是本轮唯一真正改变使用方式的机制：设置 `baseUrl` 后，Qwen 自动注册一个名为 `external-context` 的 stdio MCP server 并发现 `context_search` 工具；开启 `"enableWrites": true` 并重启后，还会自动装一条 `PreToolUse` 确认 Hook，逐条批准要写入的确切内容。

关键边界有四条。第一，它只能配在运维作用域——源码把 `memory.mem0` 列入 `WORKSPACE_RESTRICTED_SETTINGS`，并且合并阶段在系统默认、用户、系统三个来源中择一（系统设置最后取值因而优先），任一来源把 `memory` 置 `null` 会删除该键；项目设置不参与，这不是通用的逐层覆盖。第二，它不信任工作区：bare/safe 模式、SSH 工作区、临时工作区、未受信任目录或该键缺失时都不建立绑定。第三，同名冲突按来源分级：运维作用域的 `mcpServers["external-context"]`、会话配置或 `--mcp-config` 中的同名 server 与 `memory.mem0` 互斥，启动直接报错；工作区设置与项目 `.mcp.json` 的同名条目被内置绑定覆盖。第四，该 server 的 `trust` 恒为 `false`，工具白名单随 `enableWrites` 收缩或扩展。

证据来自 `docs/users/features/mem0.md`（本次新增）与 `packages/cli/src/config/{mem0-settings,config,settings,settingsUtils}.ts`、`packages/cli/src/config/hook-settings.ts`。写入确认 Hook 被合并进 system 作用域，而 system 是目录信任不门控的那一个作用域——这一点是源码注释与合并代码共同给出的，文档只说“自动安装的 Hook”，没有点明作用域。

### `tools.freeform` 与 models.dev 环境变量

`tools.freeform` 默认 `false`、需重启、不在设置对话框中显示，只在 `tools.codeModeOnly` 为 `true` 且模型 `wireApi` 为 `"responses"` 时生效。`QWEN_CODE_MODELS_DEV`、`QWEN_CODE_MODELS_DEV_REFRESH`、`QWEN_CODE_MODELS_DEV_URL` 三个键项目级 `.env` 与 `settings.json` 的 `env` 段都设不了，重载也改不了；源码把拒绝做成静默的，文档与代码在此一致。

## 本次发布与保留

| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `qwen-code-cli-configuration-v2` | config.sources/overrides/trust/defaults/migration：answered；config.runtime/diagnostics：partial | 留在工作区待父进程聚合 |
| mcp | `qwen-code-cli-mcp-v2` | mcp.entry/definition/exposure：answered；mcp.diagnostics：partial | 留在工作区待父进程聚合 |
| hooks | `qwen-code-cli-hooks-v3` | hooks.conditions/entry：answered（其余状态沿用 v2） | 留在工作区待父进程聚合 |
| custom_agents | 无 | agents.* 沿用 v2 | 已复查，无读者可见变化 |
| custom_providers | 无 | providers.* 沿用 v2 | 已复查，无读者可见变化 |
| native_plugins | 无 | plugins.* 沿用 v1 | 已复查，无读者可见变化 |
| skills | 无 | skills.* 沿用 v2 | 已复查，无读者可见变化 |

**发布：** 无。`delivery=pr` 轮次未运行 `pnpm ahw publish`／`pnpm chapters:update`／`pnpm managed:packages`，未切换任何发布指针，未做受管二进制核对，未修改 `registry/chapter-current.yaml`。建议父进程把上面三个新 edition 选为当前版本。

## 待处理与独立复核

**审计记录：** [audit-qwen-code-710d09b6-7aa9-43a2-a9cc-ef87a00c3eed.yaml](audit-qwen-code-710d09b6-7aa9-43a2-a9cc-ef87a00c3eed.yaml)。**待处理旧审计：** 无。**待复核问题：** 无。

需要父进程知情的一点：本会话没有原生 subagent 委派入口，无法执行第二个 Agent 的独立复核。我按契约第 9 节逐条判断三项触发条件均不成立——来源无冲突、已发布配置步骤未被推翻、跨主题加载机制未改变（per-scope Hook 解析、MCP 分层、Skill 根、agent frontmatter、provider 解析逻辑都未变，Mem0 是在既有机制下按新设置追加的可选条目）。该判断连同"若从严按跨主题机制变化处理则需先复核"一并写入审计的 `investigation_notes`。审计状态因此记为 `reviewed`，`pending_question_ids` 为空；若父进程不认可该判断，应在选定当前版本前补一次独立复核。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-qwen-code-repo` | `e767e223c5c1d6fe13217d95faf365721e6e3437` → `2c591ecc08a6fa080342f9b1b9f7f43215178cbb` | changed；1 个提交、1321 文件；已按 changed_paths 逐目录复查，配置/MCP/Hook 三个目录有读者可见变化 |
| `source-qwen-code-npm` | `0.24.7@sha512-NE+Ps9ju…` → 同上 | changed 状态来自与上轮基线的比较，实际身份未变；未据此建立版本映射 |

读源码用的受管工作区：`ws-2c591ecc08a6-14a2e526-01a3-403e-bd40-7abf200d7335`，本轮自检完成后关闭。

## 验证与差异入口

`pnpm knowledge:validate` 通过（退出 0）。首次运行曾报两处 `QUESTION_SOURCE_MISSING`，均为我新写章节里"问题引用缺少正文标记"，已补标记后复跑通过。树内仍有大量 `COVERAGE_INCOMPLETE` 警告，来自 claude-code、codex、omp、opencode、pi 等其他产品，不属本轮范围，未改动。`pnpm sources:audit-log` 通过（Validated 40 upstream audit records）。`git diff --check` 无输出。

查看改动：

```sh
git status --short --untracked-files=all -- knowledge/qwen-code audits/qwen-code
git diff --no-index /dev/null knowledge/qwen-code/chapters/qwen-code-cli-configuration-v2.md
```
