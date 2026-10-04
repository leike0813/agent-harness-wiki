# Zoo Code 上游审阅报告 · 2026-10-03

## 给维护者的结论

Zoo Code 的主仓库从 `bf3bc781…` 前进到 `72143527…`（扩展清单版本 3.84.0 → 3.86.0），共 158 个文件变化。实际影响读者的是两块：**配置**多了一个默认关闭的命令自动拒绝开关，**自定义 provider** 的内置模型表新增两个模型并修正了一个模型的推理元数据。技能、MCP、自定义 agent、原生插件四个主题在这次提交区间内没有任何源码改动，已发布章节保持原样。

需要先说清一件与扫描状态有关的事：父进程交办的输入文件把本产品记为 `blocked`（`source-zoo-code-docs` 传输层失败）。我这一轮自己重跑扫描时该来源已恢复可达且 HEAD 未动，因此它不再阻塞任何问题。输入文件里 `changed` 的仓库来源，观察到的提交也已经不是同一个了——上游又往前走了一次。我以自己这次观察到的 `72143527…` 为准完成调查。

本轮改写两个章节：配置与自定义 provider。其余五个主题经目录级复查确认无需改写。没有建立任何软件版本映射（zoo-code 没有登记 npm 来源，也没有证据把 3.86.0 绑定到章节）。

## 变化的意义与证据边界

### 命令自动拒绝：新增 `alwaysDenyUnapprovedCommands`

`packages/types/src/global-settings.ts` 新增一个全局布尔项，默认 `false`，只在 `autoApprovalEnabled` 与 `alwaysAllowExecute` 都打开时才起作用。命令判定路径新增结构化拒绝原因，六类：`dcg`、`denylist`、`not_allowlisted`、`dangerous_substitution`、`malformed_command`、`guard_unavailable`；`getCommandDecisionDetailed` 会额外返回命中的子命令与拒绝前缀。这些原因文本是发给模型看的，不是聊天界面文案。

影响 `config.sources`、`config.runtime`、`config.defaults`、`config.diagnostics` 四个小节。值得单独提一句的是配置层次：这项设置不在扩展清单的 `contributes.configuration` 里，只定义在类型 schema 中，所以往 `settings.json` 写同名字段不会有任何效果——这是读者最容易踩的一类问题，已写进 `config-sources`。

`guard_unavailable` 是其中唯一不代表策略判定的一类：来源明确说明它是守卫状态不一致，并标注为可重试、不中止本轮其余工具调用。

证据能证明到代码分支与类型定义层面。来源没有提供官方文档对该开关的说明（docs 仓库本轮无变化），所以「这是官方推荐配置」一类结论没有来源支持，我没有写。

### 内置模型表：新增与修正

`gpt-6.1-sol` 在两条路径上元数据不同：OpenAI 原生路径上下文 1,050,000、默认推理强度 `medium`、带 272,000 token 阈值的长上下文加价与 flex/priority 分层；OpenAI Codex 订阅路径上下文 872,000、默认 `low`、价格记 0。同一模型还带 `includedTools`/`excludedTools`，只放行 `apply_patch`、排除 `apply_diff` 与 `write_to_file`——这直接影响实际请求用哪套编辑工具。OpenCode Go 新增 `deepseek-v4.1-flash`（1,000,000 上下文、允许 `reasoningEffort: disable`，价格用峰值近似分时定价，来源注释说明这是权宜之计）。

`claude-opus-5-5` 则被修正：移除 `supportsReasoningBudget`，并去掉「关闭推理时 maxTokens 下调到 8k」的注释，改为固定 adaptive thinking。这属于既有条目的元数据修正，不是新增能力。

影响 `providers.models` 与 `providers.metadata`（同在 `providers-models` 小节）。

### 复查后确认无需改写的四个主题

`src/services/mcp/**`、`src/services/skills/**`、`src/core/modes/**`、`src/core/roomodes/**` 在该区间内零改动（后两个目录在固定提交中已不存在），因此 MCP、技能、自定义 agent、原生插件章节不动。

`hooks` 单独看过：它把「自动批准（Auto-Approve）」列为常被误认为 Hook 的机制，理由是「只是跳过确认，不注入回调」。新增的 blanket deny 分支不改变这个判定——它仍是一个布尔设置在 `ask` 与 `deny` 之间切换，没有引入事件注册或回调分发，`hooks.events` 与 `hooks.entry` 的 `not_applicable` 结论成立。

### 一处记录在案的分歧

固定提交的 README 在 “What's New in v3.86.0” 里写了 “enforce MCP tool policy”，但这段提交区间内没有任何 `src/services/mcp/**` 改动，`src/core/prompts/tools/effective-tool-policy.ts` 也未变。可以用版本边界解释：README 描述的是整个 v3.86.0 发布，而本轮固定的只是其中一个提交区间。该 MCP 工具策略的证据仍以已发布的 `ref-zoo-code-src-tool-policy`（commit `bf3bc781…`）为准，MCP 章节不改写。这不构成推翻已发布配置步骤的分歧。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `zoo-code-vscode-configuration-v2` | `config.sources` answered、`config.runtime` partial、`config.defaults` partial、`config.diagnostics` answered | 建议选为当前版本；本轮未发布 |
| custom_providers | `zoo-code-vscode-custom_providers-v2` | `providers.models` answered、`providers.metadata` answered | 建议选为当前版本；本轮未发布 |
| custom_agents | `zoo-code-vscode-custom_agents-v1` | 无受影响问题 | 保留旧版本：区间内零源码改动 |
| mcp | `zoo-code-vscode-mcp-v2` | 无受影响问题 | 保留旧版本：区间内零源码改动 |
| skills | `zoo-code-vscode-skills-v2` | 无受影响问题 | 保留旧版本：区间内零源码改动 |
| native_plugins | `zoo-code-vscode-native_plugins-v1` | 无受影响问题 | 保留旧版本：区间内零源码改动 |
| hooks | `zoo-code-vscode-hooks-v1` | 无受影响问题 | 保留旧版本：新增机制不改变非 Hook 判定 |

**发布：** 仅结案审计 + 改写章节，未切换发布指针（`delivery=pr`）。**受管二进制：** 本轮未触发（`delivery=pr` 不进入 harness-binary）。

## 待处理与独立复核

**审计记录：**[audit-zoo-code-7a86272b-6c36-4257-9ab5-eb8af9a3c768.yaml](./audit-zoo-code-7a86272b-6c36-4257-9ab5-eb8af9a3c768.yaml)（承载变化，已结案为 `reviewed`）。另有 [audit-zoo-code-39551cf6-cccf-427c-9b3e-e554581f2c83.yaml](./audit-zoo-code-39551cf6-cccf-427c-9b3e-e554581f2c83.yaml)，是同 session 第二次扫描的基线链接产物，**不可读作本轮无变化**。**待处理旧审计：** 无。

**待复核问题：** 无。按三类高影响条件自查均未触发：来源之间无冲突（repo 与 docs 一致，站点 hash 未变）；新来源未推翻已发布配置步骤（新开关默认关闭，模型条目为新增或元数据修正）；无跨主题关键加载机制变化。

需要说明的是：本子代理在本会话内没有原生 subagent 委派入口，因此上述结论是自检判定而非独立第二 Agent 复核。若父进程认为其中任一条件成立（例如对 hooks 判定或 README 分歧有不同判断），需另行委派只读复核。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-zoo-code-repo` | `bf3bc781b813a2a6cbdb29dfd7c86f423589090e` → `72143527fd33306e5541116093c2cbf803cce9e0` | changed；158 个 changed_paths，实质影响配置与自定义 provider 两个主题 |
| `source-zoo-code-docs` | `dfd2628c31073ec6b111bfedbcd071d197d37ad2` → 同左 | 本轮 unchanged。父进程 14:50Z 记为 blocked（`git ls-remote` 传输层失败：`Failure when receiving data from the peer`），19:42Z 复查已恢复可达，HEAD 未动；失败未产生新身份，也未阻塞任何固定问题 |
| `source-zoo-code-docs-site` | `cdaf996d…2c7` → 同左 | unchanged，`https://docs.zoocode.dev/` 内容 hash 未变 |

与输入文件的差异如实记录：父进程观察到的仓库 `observed` 是 `7186191a62ee816d93bae18d34810f1e6ddf1905`，本轮实际观察到 `72143527…`，上游在两次观察之间继续前进；调查以本轮观察为准。

## 验证与差异入口

已运行（仓库根）：

- `pnpm knowledge:validate` → 退出码 0，`Validated 534 chapter editions.`，0 error。警告全部属于其他产品，本产品无诊断：`claude-code`、`codex`、`omp`、`opencode`、`pi` 的 `COVERAGE_INCOMPLETE`。
- `pnpm sources:audit-log`、`git diff --check`、`git status --short --untracked-files=all` → 见父进程聚合；本产品无 whitespace 错误。

本轮新增记录（全部 `record_kind: production`）：

- 快照与原件：`knowledge/zoo-code/snapshots/snapshot-zoo-code-repo-20261003.yaml`、`knowledge/zoo-code/artifacts/artifact-zoo-code-repo-20261003.yaml`（`git_source_file`，固定 `72143527…`，不保留 checkout）。
- 11 条来源引用：`*blanket-deny-default`、`*blanket-deny-schema`、`*auto-deny-detail`、`*auto-deny-reasons`、`*auto-deny-blanket-branch`、`*auto-deny-guard-unavailable`、`*auto-deny-ui`、`*model-openai-gpt61`、`*model-openai-gpt61-pricing`、`*model-codex-gpt61`、`*model-anthropic-opus55`、`*model-opencode-deepseek`（均在 `knowledge/zoo-code/references/`，短摘录与固定提交逐行核对一致）。

查看本轮改动：

```sh
git status --short --untracked-files=all -- knowledge/zoo-code audits/zoo-code
git diff -- knowledge/zoo-code
```
