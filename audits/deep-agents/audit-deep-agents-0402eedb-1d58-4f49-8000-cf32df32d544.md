# deep-agents 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮上游有两处机制级变化，都在 `cli` 界面上，都需要换版：

1. **MCP server 定义新增 `oauth` 应用凭据对象。** 远程条目可以在 `auth: "oauth"` 之外再写一个 `oauth` 映射：`client_id` 必填、`client_secret` 可选，值先做 `${VAR}` 展开再校验；适用范围被写死为 Slack 主机，`client_id` 进入 OAuth token 文件名的哈希输入，Slack provider 派发改用配置里的凭据而不是内置公共 client。官方 `mcp-tools` 页**没有**记录这个对象，所以这一段只能以固定提交的源码为准。
2. **会话记录侧新增三条机制。** 空闲压缩（`history.idle_compaction_tokens`，默认 `0` 即关闭）在提示缓存保留窗口的尾部自动触发 offload；恢复改由 `resume_policy.py` 统一执行 `threads.max_resume_age` / `threads.resume_after` 截止，无头 `-r` 不再回退到新线程，并受工作区绑定与归属预留约束；`threads delete` 的级联里新增 `dcode_thread_message_counts`。

因此新建了 `deep-agents-cli-mcp-v2` 与 `deep-agents-local_transcripts-v2`，并把 `registry/chapter-current.yaml` 中 mcp、local_transcripts 两个选择指过去；两章的 v1 均按原字节保留。configuration、custom_agents、custom_providers、hooks、skills 五章逐题复核后未改版：区间内的源码改动（`config_manifest.py` 新增一个选项、`agent.py` 的 async subagent webhook 透传、`model_retry.py` 的 Groq 工具上限错误类型、`configuration/interpreter.py`）和六页文档的 JSX 转 Markdown 排版改写都不改变已发布答案。

三点须知：

- 12 个官方文档页本轮**全部**换哈希，但候选里没有新增这些页的归档原件，`archive/deep-agents/` 下也没有本轮观察哈希对应的目录。因此"文档只是排版改写"这一判断能在本地复核到的程度只到审计记录里的 sha256，逐字节 diff 需要按 `resolved_url` 重新取回后再对齐。
- `transcripts.archive` 在新版里仍是 `partial`：自动压缩写的是同一份 Markdown 归档，但归档与 checkpoint 之间的一致性依旧没有官方命令或源码入口可核对。
- 本轮审计 `review_status` 仍是 `pending`，旧审计 `audit-deep-agents-d34c5b04-d211-4c06-a62d-90eb6656a90f` 仍列在 `pending_audit_refs` 中。本轮覆盖了它留下的工作面，但**没有关闭它**。

## 变化的意义与证据边界

### MCP 的 OAuth 应用凭据：文档没有，源码有

影响 `mcp.definition` 与 `mcp.auth`，落在 `mcp-entry` 与 `mcp-transport` 两个小节，界面 `cli`。证据是固定到提交 `b4ac8829692785a221150658401ae558f4bff3f3` 的 11 条新引用（本轮共 12 份 per-file 快照，两处变化共用），覆盖 `mcp_config.py`、`mcp_auth.py`、`mcp_tools.py`、`mcp_providers/_registry.py`、`mcp_providers/slack.py`。

能证明到的是解析期行为：`oauth` 只接受 `client_id` 与 `client_secret` 两个键，出现其他键或缺 `client_id` 时整个条目在解析阶段报错而不是被静默忽略；条目必须同时满足 `auth: "oauth"` 且 URL 主机是 `slack.com` 或 `*.slack.com`；配置了 `client_id` 后 token 文件名哈希输入变成 `[server_url, client_id]` 的序列化，未配置时文件名规则与 v1 完全一致；`resolve_provider` 命中 Slack 且带配置凭据时新建 `SlackProvider`，`client_secret` 存在时 `token_endpoint_auth_method` 为 `client_secret_post`，否则为 `none`。

证明不到的：本轮没有运行 `dcode`，也没有对真实 Slack 工作区做登录，因此"配置凭据能成功走完 OAuth 授权码流程"只是从代码路径读出，不是观察结果。另外这段机制官方文档尚未记录，读者若以 `mcp-tools` 页为准会看不到 `oauth` 对象——新章节里已明确标注这一点。

### 空闲压缩与恢复策略改写会话记录的自动路径

影响 `transcripts.lifecycle`（answered）、`transcripts.archive`（partial）、`transcripts.cleanup`（answered），落在 `transcripts-thread-lifecycle` 与 `transcripts-archive-and-cleanup` 两个小节。证据同样固定到 `b4ac8829`：`app.py`、`sessions.py`、`resume_policy.py`、`client/headless_resume.py`、`client/non_interactive.py`、`config_manifest.py`、`_env_vars.py`。

新增内容的要点：空闲压缩的触发条件是"阈值大于 0、当前上下文 tokens 已达阈值、计数来自真实模型回合、线程存在、提示缓存保留窗口剩余不超过 `min(窗口 20%, 120 秒)`、界面空闲、已连接 dcode server"，同一缓存窗口内每线程最多一次；排程后开跑前还要复核，任一变化即放弃；自动路径对 `empty`/`noop` 结果静默。恢复截止取 `threads.max_resume_age` 与 `threads.resume_after` 算出的两个时间点中**更晚**的那个，`updated_at` 缺失或无法解析时在策略生效期间直接拒绝恢复，四个恢复入口共用同一个判定函数。无头 `-r` 只接受同一目录、同一组参数创建的线程，恢复前先取归属锁再复查线程是否已被删。删除级联的顺序是 `dcode_btw_costs` 墓碑 → `dcode_thread_names` 与该线程的 `dcode_thread_message_counts` 行 → `checkpoints` / `writes` → 归档与 handoff 快照。

证据边界：以上都是源码与模块文档串的内容，本轮没有实际触发空闲压缩、没有构造被删除的线程做恢复、也没有在真实 profile 上跑 `threads delete`；`120 秒`与`20%`是代码常量的读数，不是实测阈值。归档可写性退回临时目录这条风险维持 v1 的表述，`partial` 状态未变。

### 文档侧全部换哈希，但只有三处是内容改写

12 个官方文档页在冻结的 `resolved_url` 上重新取回后哈希全部变化。逐页核对的结果是：`cli-reference`、`hooks`、`mcp-tools`、`plugins`、`providers`、`subagents` 六页只有 JSX 转 Markdown 的排版改写；`config-file` 新增 Name threads automatically 一节；`configuration` 把技能符号链接的包含规则改写为"允许根或已批准信任目录（无头需 `extra_allowed_dirs`）"；`quickstart` 把 `/skill` 改成"agent server 解析并加载正文"。后三处与本产品既有章节的结论一致（v4 已记录 server 侧解析与交互式信任中断），因此不构成答案变化，也不另建文档快照。

`credentials`、`extensions`、`memory-and-skills` 三页同样换了哈希，但审计记录没有给出这三页的内容差异结论，本轮也没有任何章节引用依赖它们的新内容——这是一个已知的、未被使用的缺口，不是"已核对无变化"。要复核应按各自的 `resolved_url` 取回后与审计里的 sha256 对齐。

### 逐条核对但结论不变的五个主题

本轮 triage 记录过 10 条已发布引用的行定位在新提交上不再命中、6 条文档摘录不再命中，原因是旧引用仍钉在旧 commit 与旧文档哈希上（旧引用与旧 edition 字节本轮未改，作为历史证据保留）。判定"不变"用的是新提交上的 per-file 快照，而不是旧行号：

- configuration：`configuration/` 下的 resolver、service、writer 与 trust 代码在两个提交之间无差异，页面只有排版改写与 threads 命名段；`config_manifest.py` 新增的选项默认 `0`，属于会话记录行为，已写进 local_transcripts。`config.sources`、`config.runtime`、`config.trust`、`config.defaults`、`config.migration` 五题继续成立。
- custom_agents：`agent.py` 只多出 async subagent 规格的 `webhook` 字段透传，`subagents.py`、`graph.py` 与 `subagents` 文档无语义变化。`agents.entry`、`agents.roles`、`agents.invocation` 继续成立。
- custom_providers：`model_config.py`、`auth_store.py`、`config.py` 无机制变化，页面只有排版改写；`model_retry.py` 新增的是 Groq 128 工具上限的错误类型，归 `providers.responses`，本轮不在范围。`providers.entry`、`providers.models`、`providers.forwarding` 继续成立。
- hooks：`libs/code/deepagents_code/hooks/` 零改动，文档页只有排版改写，`command`/`argv`/`timeout`/`statusMessage` 语义未变。`hooks.entry` 继续成立。
- skills：`middleware/skills.py`、`_skill_tools.py` 与 `libs/code/deepagents_code/skills/` 零改动。`skills.extensions`（partial）、`skills.invocation`（answered）、`skills.conditions`（cli partial / sdk answered）继续成立。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| mcp | deep-agents-cli-mcp-v2 | mcp.definition：answered；mcp.auth：answered | 已进入新发布（选择已切换）；v1 保留 |
| local_transcripts | deep-agents-local_transcripts-v2 | transcripts.lifecycle：answered；transcripts.archive：partial；transcripts.cleanup：answered | 已进入新发布（选择已切换）；v1 保留 |
| configuration | deep-agents-cli-configuration-v2 | config.sources、config.runtime、config.trust、config.defaults、config.migration：answered（复核未变） | 保留（新增选项不改变解析、合并与信任） |
| custom_agents | deep-agents-cli-custom_agents-v3 | agents.entry、agents.roles、agents.invocation：answered（复核未变） | 保留（webhook 属定义字段） |
| custom_providers | deep-agents-cli-custom_providers-v4 | providers.entry、providers.models、providers.forwarding：answered（复核未变） | 保留（Groq 错误类型属 responses） |
| hooks | deep-agents-cli-hooks-v2 | hooks.entry：answered（复核未变） | 保留（hooks 代码零改动） |
| skills | deep-agents-cli-skills-v4 | skills.extensions：partial；skills.invocation：answered；skills.conditions：cli partial / sdk answered（复核未变） | 保留（skills 代码零改动，文档改写与 v4 一致） |

**发布：** delivery=pr。候选内已写入两个新 edition、25 条新 reference、12 对 per-file 快照与原件记录（`snapshot-`/`artifact-deep-agents-20261022-*.yaml`），并切换了 `registry/chapter-current.yaml` 的 mcp 与 local_transcripts 选择；候选里没有 `ahw publish` 的产物——无 release 记录，发布指针未变，发布发生在合并阶段。**受管二进制：** 未触发——`registry/harnesses` 与基线逐字节一致，本轮没有受管二进制变更，delivery=pr 也不做该项核对。

## 待处理与独立复核

**审计记录：** [audit-deep-agents-0402eedb-1d58-4f49-8000-cf32df32d544.yaml](audit-deep-agents-0402eedb-1d58-4f49-8000-cf32df32d544.yaml)，`status: changed`、`review_status: pending`，`pending_question_ids` 为空。**待处理旧审计：** [audit-deep-agents-d34c5b04-d211-4c06-a62d-90eb6656a90f.yaml](audit-deep-agents-d34c5b04-d211-4c06-a62d-90eb6656a90f.yaml)——它当时的记录是"来源已固定、维护面未派发"，本轮已按它留下的工作面复核 skills 等主题，但在审计里**仍列为未解决的旧审计**，需要复核者确认后才能关闭。**待复核问题：** 无。三个触发条件（来源冲突、推翻已发布配置步骤、跨主题加载机制改变）本轮均不成立，因此按普通更新由作者自检，不做独立复核派发。

未关闭项集中在证据侧而非结论侧：文档页没有本轮归档原件（12 页只能凭 sha256 说明变化）；`transcripts.archive` 仍为 `partial`；旧引用在新提交上不再逐行命中但有新快照替代。这三项都不阻断本轮候选，需要在合并与复核时知悉。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-deep-agents-repo（`refs/heads/main`） | e6d4fbf5260b… → b4ac88296927… | changed；本轮 triage 记录 259 个路径变更，其中 16 个被章节引用；逐文件复核结论见上文，实际影响只在 MCP 与会话记录两处 |
| source-deep-agents-docs-cli-reference | 48c4099900b0… → b1436a4c4e71… | changed；排版改写（JSX 转 Markdown），无内容删除 |
| source-deep-agents-docs-config-file | 71b3ea8270b2… → a70116c0b3a1… | changed；新增 Name threads automatically 一节 |
| source-deep-agents-docs-configuration | 83aa7347dd39… → 2d0ad96a550f… | changed；排版改写 + threads 命名段；技能包含规则改写为"允许根或已批准信任目录" |
| source-deep-agents-docs-credentials | 3906ae3f72a2… → 0116fde263e8… | changed；仅记录哈希，审计未给出该页内容差异结论，本轮无引用依赖其新内容 |
| source-deep-agents-docs-extensions | c668ad4b95e9… → bac1eab06041… | changed；同上，未做内容差异结论 |
| source-deep-agents-docs-hooks | 1ca55db658fb… → 4ebfa5436fd5… | changed；排版改写，`command`/`argv`/`timeout`/`statusMessage` 语义未变 |
| source-deep-agents-docs-mcp-tools | f82c11a2f548… → df99c47d8027… | changed；排版改写；该页仍只记录 `auth: "oauth"` 与内置 Slack client，未记录 `oauth` 对象 |
| source-deep-agents-docs-memory-and-skills | a7c10524f14f… → 9c96a3c5ffb6… | changed；仅记录哈希，未做内容差异结论 |
| source-deep-agents-docs-plugins | 6a2acf7e181f… → af2e504acea8… | changed；排版改写 |
| source-deep-agents-docs-providers | 8cb0429c6f03… → 3c72aab5a8e0… | changed；排版改写 |
| source-deep-agents-docs-quickstart | 15e875c35889… → b2631e50e7c0… | changed；`/skill` 改写为"agent server 解析并加载正文" |
| source-deep-agents-docs-subagents | a7732ab7e5eb… → c33c1f507604… | changed；排版改写，无内容删除 |

## 验证与差异入口

本轮只写这份报告，未运行 `pnpm knowledge:validate`、`pnpm sources:audit-log`、`git diff --check`，也未运行任何构建、lint 或测试（本次为文档任务，校验入口留给合并阶段）。

合并阶段可直接使用：

```bash
pnpm knowledge:validate    # 章节 edition、引用、快照与 artifact 的引用完整性
pnpm sources:audit-log     # 审计记录结构
git diff --check
```

候选与基线的差异用 `diff -rq <baseline>/deep-agents <candidate>/deep-agents` 即可复现：本轮相对基线只多出两章正文、25 条 reference、12 对 snapshot/artifact，改动的只有 `registry/chapter-current.yaml` 与审计 YAML（后者补全了 `reason` 与引用清单，不另计为知识改动）。

本轮改动入口：

- 章节 [deep-agents-cli-mcp-v2.md](../../knowledge/deep-agents/chapters/deep-agents-cli-mcp-v2.md)、[deep-agents-local_transcripts-v2.md](../../knowledge/deep-agents/chapters/deep-agents-local_transcripts-v2.md)
- 选择 [chapter-current.yaml](../../registry/chapter-current.yaml)
- 新证据 [references/](../../knowledge/deep-agents/references)、[snapshots/](../../knowledge/deep-agents/snapshots)、[artifacts/](../../knowledge/deep-agents/artifacts) 下 `*20261022*` 的记录（`artifact-*.yaml` 只含 commit、相对路径与 `content_sha256`，不含 checkout 路径）
- 保留原件：源码侧固定提交 `b4ac8829692785a221150658401ae558f4bff3f3`，源码树本身不在候选内，本地要复核需按该 commit 取回；文档侧对应 `resolved_url` 的归档原件在仓库外 `archive/deep-agents/`，本轮没有新增条目；旧版 `deep-agents-cli-mcp-v1.md`、`deep-agents-local_transcripts-v1.md` 与旧引用按原字节保留在同一目录，作为历史证据。
