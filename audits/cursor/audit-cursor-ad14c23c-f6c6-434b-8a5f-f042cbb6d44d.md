# Cursor 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮上游变化集中在**套餐与计费口径**，外加 Projects 的可用套餐范围和一段 Bugbot 模型访问条款。四处实质变化都命中已发布章节（`agents-roles`、`agents-limits`、`custom_providers-models`），所以必须出新 edition。候选里已新建 `cursor-cli-custom_agents-v4` 与 `cursor-cli-custom_providers-v3` 两个完整 edition，旧 edition（v3 / v2）逐字未动，候选的 `registry/chapter-current.yaml` 把 `custom_agents`、`custom_providers` 两个选择指向新 edition。旧章节里指向失效摘录的三条 reference 原样保留，新 edition 改挂本轮新建的 6 条 reference。

本轮没有把任何 `partial` 问题补成 `answered`：`agents.limits`（两界面）与 `providers.models` 的 `cursor` 面仍是 `partial`，因为上游文档本身没有补上并发上限、子代理超时、BYOK 模型计费归属这些缺口，不是本轮漏写。`pending_question_ids` 为空只表示本轮派发的三个问题都写到了现有证据允许的程度。

两条风险要先说清。第一，4 份文档原件**还没有**写进项目 `archive/cursor/`：候选只登记了 artifact 记录的 `archive_path` 与 sha256，集成前必须由协调者按路径归档字节，否则 `sources:audit` 会判原件缺失。第二，`custom_providers-byok` 小节仍按 2026-09-30 快照写「两个按月重置的用量池」，与新版 `models-pricing` 的「周池 + 预付额度」并读会互相矛盾；该小节属于 `providers.auth` / `providers.entry`，本轮未派发，也没有改写。

## 变化的意义与证据边界

### Projects 的可用范围：从「所有付费套餐」收窄为「含 Cloud Agents 的套餐」

`agent/projects.md` 原文由 `Projects is available on all paid plans` 改为 `available on every plan that includes Cloud Agents: Premium and higher, Teams, Enterprise, and legacy paid Cursor plans`，并把 Free、Plus 与旧版 Hobby 明确写成不可用（它们不含 Cloud Agents）；Privacy Mode (Legacy) 的排除条件仍在，企业团队的 Cursor 3.21.9 门槛未变。命中 `agents.roles` 的 `agents-roles` 小节（`cli`、`cursor` 两个界面），正文已按新原文重写协调者一段。

证据只能到「哪些套餐包含 Cloud Agents」这一句：来源没有给套餐价格，也没有说明旧版付费套餐与 The X Subscription 的对应关系。同页新增的「Add and remove chats」一节本轮未被引用，审计也没有把它计入这三个固定问题。

### 第三方模型的扣费口径：从「Other Models 池」改为按套餐分层

`subagents.md` 的父模型/用量池段把计费句改成：具名第三方模型按第三方用量结算——The X Subscription 上从预付额度扣，旧版 Cursor 套餐上从 Other Models 池扣，即使父会话在 Auto、Grok 或 Composer 上也一样；Teams 与 Enterprise 上只有**符合条件**的第三方请求才叠加 Cursor Token Rate，且定价页列出的部分第三方模型被排除在该费率之外。命中 `agents.limits` 的 `agents-limits` 小节（两个界面，仍 `partial`）。

边界在于本页只说「eligible / excluded」存在，豁免清单本身不在这一页；新 edition 用 `ref-cur-custom_agents-subagents-pools-billing-20261022` 固定这段，再用两份定价 reference 在 `custom_providers-models` 写出分层与豁免，两侧不互相充当证据。

### 新增 Bugbot 模型访问条款：内置评审角色受团队模型访问约束

`enterprise/model-and-integration-management.md` 新增「Bugbot and model access」一段：Bugbot 只用团队允许的模型做评审；当团队模型设置封掉全部 Bugbot 可用的模型时，评审直接停止而不是改用一个被封的模型，pull request 上 Bugbot 检查以 `neutral` 结束。命中 `agents.roles`，`agents-roles` 因此从「角色都由子代理文件定义」的读法改成三类并列：内置子代理、Project 协调者、产品内置的评审角色。

这段只证明「内置角色也受团队模型访问约束」，没有给 Bugbot 的配置入口、计费或与子代理的关系，正文没有外推。

### models-pricing 的订阅与用量池重写

`models-and-pricing.md` 的订阅与用量池表述重写（10-18 起）在本轮补上最后一块：Teams/Enterprise 改为 `API list price plus the Cursor Token Rate on eligible models`，并列出豁免模型。命中 `providers.models` 的 `custom_providers-models` 小节（`cli` 为 `answered`、`cursor` 为 `partial`）。新版正文按套餐分层写扣费来源：The X Subscription 付费套餐只有一个每周重置、与 Grok 共用的 Cursor 模型池，第三方模型不在池内、Premium 及以上按 API 列表价从预付额度支付；旧版 Cursor 套餐仍是两个按月池；Token Rate 只对 Teams/Enterprise 上符合条件的第三方请求生效，Cursor 模型（含 Grok、Composer）与 Cost 模式不适用。

`cursor` 面保持 `partial` 的原因写在章节缺口里：BYOK 与 Bedrock 模型在选择器层面的计费归属、同名模型去重都没有文档；本轮没有把未文档化的部分写成结论。

### 排除项与未覆盖项

审计明确排除、也没有据此改写任何小节：`sdk/typescript`（只改 cloud agent 的 usage/cost 记账说明，属 `providers.metadata`/`providers.diagnostics`）、`help/models-and-usage/api-keys`（只改 BYOK 的 Token Rate 适用范围，属未派发的 `providers.auth` 与 BYOK 小节）、`index`（新增 Muse Wonder、把 Muse Spark 1.3 标为 Hidden by default，属目录行变化，不改变模型发现机制）、`cursor-router` / `hooks` / `mcp` / `plugins` / `skills`（与三个派发问题无关；router 相关引用在新页面上仍逐条命中）。

`source-cur-agent-run-modes-doc` 也在 13 个 changed 来源里，但本轮审计没有为它记录逐页 diff 结论。它不在派发的两个 topic 内，本报告不对它下任何判断，只把它列进「待处理」作为覆盖缺口。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_agents | `cursor-cli-custom_agents-v4` | `agents.roles`：answered（cli / cursor）；`agents.limits`：partial（cli / cursor） | 新建 edition，v3 原样保留；候选选择已切到 v4，release 未构建（见下） |
| custom_providers | `cursor-cli-custom_providers-v3` | `providers.models`：cli answered / cursor partial | 新建 edition，v2 原样保留；候选选择已切到 v3，release 未构建（见下） |

**发布：** 本轮是 worker 候选（`delivery: pr`），候选内没有 release / staging 目录，也没有 `chapters:update` 的构建记录；候选只把 `registry/chapter-current.yaml` 的两个 `edition_id` 改到新版本。release ID、staging 验收与 publish 由协调者在合并后执行，本报告不声称已完成发布。**受管二进制：** 未触发——按 Skill 约定，worker 与 `delivery=pr` 永不执行 `harness-binary`。

## 待处理与独立复核

**审计记录：** `audits/cursor/audit-cursor-ad14c23c-f6c6-434b-8a5f-f042cbb6d44d.yaml`（`status: changed`、`review_status: pending`、`pending_question_ids: []`）。**待处理旧审计：** `audit-cursor-607611f4-277b-4201-9fd4-c772f4593f02`（2026-10-13，13 个未结问题：`config.sources`、`config.overrides`、`config.runtime`、`config.trust`、`config.defaults`、`config.migration`、`config.diagnostics`、`providers.entry`、`providers.forwarding`、`providers.diagnostics`、`hooks.conditions`、`mcp.exposure`、`plugins.api`）与 `audit-cursor-3bba47fe-58f7-4773-a3bb-ae2ef03bd063`（2026-10-14，自身无未结问题，但引用前者而保持 `pending`）。**这两条旧审计本轮都没有被关闭**：本轮既未派发它们的问题，也未据此改动任何章节，`review_status` 因此保持 `pending`。**待复核问题：** 无独立复核记录；审计没有记录来源冲突、没有已发布配置步骤被推翻、没有跨主题加载机制改变。本轮改写的几处是套餐与计费口径及角色可用范围，不是配置步骤，因此不构成高影响复核触发条件——`review_status: pending` 的原因是旧审计未结案，不是待复核。

仍需协调者决定的事项：

- **原件归档**：4 个新 artifact 的字节尚未写入项目 `archive/cursor/`，需按 artifact 记录的 `archive_path` 归档（`archive/cursor/artifact-source-cur-agent-projects-doc-7d7f6b16a56e/source.md`、`…-subagents-doc-264b4b00e713/source.md`、`…-ent-model-management-doc-be542f2dedde/source.md`、`…-models-pricing-doc-9fe053861f5d/source.md`），否则 `sources:audit` 判定原件缺失。
- **口径冲突**：`custom_providers-byok` 仍写两个按月池，新 `custom_providers-models` 写周池 + 预付额度；按「不重审未派发小节」的约束本轮没有改它，收口需单独派发 `providers.auth` 或 BYOK 小节。
- **覆盖缺口**：`source-cur-agent-run-modes-doc` 本轮 changed 但无逐页 diff 记录，`configuration` 主题（`cursor-cli-configuration-v3` 里的 Read access 相关引用）是否需要复核，留给协调者决定。

## 来源核查记录

本轮 40 个来源中 13 个 changed、27 个 unchanged。基线是项目 archive 中对应快照的原件，观察值是冻结的 `resolved_url` 取回后的 sha256；结论只基于与观察值逐字一致的那份字节，没有重新扫描上游。下表列出全部 changed 来源，unchanged 来源合并为一行。

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-cur-agent-projects-doc` | `fdb3a331e679…` → `7d7f6b16a56e…` | changed；采用。Projects 可用范围改写 + 新增「Add and remove chats」；原件 `archive/cursor/artifact-source-cur-agent-projects-doc-7d7f6b16a56e/source.md`（未归档） |
| `source-cur-subagents-doc` | `e9d382b12b76…` → `264b4b00e713…` | changed；采用。父模型/用量池段计费句改为按套餐分层，Token Rate 加 eligible 与豁免；原件 `archive/cursor/artifact-source-cur-subagents-doc-264b4b00e713/source.md`（未归档） |
| `source-cur-ent-model-management-doc` | `d2aa3a5c4186…` → `be542f2dedde…` | changed；采用。新增「Bugbot and model access」，Auto-review 回退模型写作 Haiku，补 Grok Bot 的 MCP 开关；原件 `archive/cursor/artifact-source-cur-ent-model-management-doc-be542f2dedde/source.md`（未归档） |
| `source-cur-models-pricing-doc` | `41b1b5cc33fa…` → `9fe053861f5d…` | changed；采用。Teams/Enterprise 改为 API 列表价 + eligible Token Rate 并给豁免清单；原件 `archive/cursor/artifact-source-cur-models-pricing-doc-9fe053861f5d/source.md`（未归档） |
| `source-cur-sdk-typescript-doc` | `44ac8bfb2e63…` → `c9e134cfe90f…` | changed；排除。只改 cloud agent 的 usage/cost 记账说明，不在派发问题内 |
| `source-cur-help-api-keys-doc` | `ea08652e0f23…` → `282089dcad16…` | changed；排除。只改 BYOK 的 Token Rate 适用范围，属未派发的 `providers.auth` / BYOK 小节 |
| `source-cur-index-doc` | `fa8fe9d247aa…` → `62109230bb5e…` | changed；排除。目录行新增 Muse Wonder、Muse Spark 1.3 标为 Hidden by default，不改变发现机制 |
| `source-cur-cursor-router-doc` | `f91093a0e4de…` → `752fb6bd6dbf…` | changed；排除。与三个派发问题无关，router 相关引用在新页面仍逐条命中 |
| `source-cur-hooks-doc` | `7294a2d63b19…` → `8436af768468…` | changed；排除。与派发问题无关（审计未记录该页 diff 明细，也未用作证据） |
| `source-cur-mcp-doc` | `8f6b54387a93…` → `dd0286ad6a5f…` | changed；排除。与派发问题无关 |
| `source-cur-plugins-doc` | `cf4ca6bb6ab2…` → `74387ff95205…` | changed；排除。与派发问题无关 |
| `source-cur-skills-doc` | `5ccb25304f16…` → `f50d0128510a…` | changed；排除。与派发问题无关 |
| `source-cur-agent-run-modes-doc` | `77f250619589…` → `3047e773f2f1…` | changed；**未记录**。审计没有该页的逐页 diff 结论，本轮不采用、也不下判断（见「待处理」） |
| 其余 27 个来源（含 `source-cur-agent-overview-doc`、`source-cur-agent-security-doc`、`source-cur-cli-*`、`source-cur-rules-doc`、`source-cur-teams-setup-doc`、`source-cur-worktrees-doc`、`source-cur-aws-bedrock-doc` 等） | 基线 = 观察 | unchanged；逐字节一致，未产生任何章节改动 |

## 验证与差异入口

本轮实际执行的检查（均为只读比对，未重扫上游、未构建、未跑 lint / 测试）：

- `diff -rq` 对照 `baseline/cursor/knowledge/cursor/{chapters,references,snapshots,artifacts}` 与候选：chapters 只多出 v4 与 v3 两个新文件，references 多出 6 个、snapshots 与 artifacts 各多出 4 个，无任何旧文件被改写。
- `diff -rq` 对照 `catalog`、`registry/sources`、`registry/harnesses`：完全一致；`registry/chapter-current.yaml` 只有 `custom_agents` → `cursor-cli-custom_agents-v4`、`custom_providers` → `cursor-cli-custom_providers-v3` 两行变化。
- 解析两个新 edition 的 frontmatter：`edition_id` / `topic` / `sections` / `questions` 可正常解析；问题状态与上文表格一致（`agents.roles` answered、`agents.limits` partial、`providers.models` cli answered / cursor partial）。
- 解析审计 YAML：40 条 `checks`（13 changed / 27 unchanged）、2 条 `impacts`、`pending_question_ids: []`、`pending_audit_refs` 两条，与报告一致。
- 每份新 reference 的 `snapshot_id` 都指向本轮新建的 snapshot，snapshot 的 `raw_sha256` 与审计观察值、artifact 的 `raw_sha256` 三者相同。

未运行项及原因：`pnpm maintenance:candidates check`、`pnpm knowledge:validate`、`pnpm sources:audit-log`、构建 / lint / 测试都没有运行——本次是纯文档任务，按约束不做项目校验，合入前应由协调者在集成后执行。

入口：

- 章节：`knowledge/cursor/chapters/cursor-cli-custom_agents-v4.md`、`knowledge/cursor/chapters/cursor-cli-custom_providers-v3.md`
- 引用：`references/ref-cur-custom_agents-projects-availability-20261022.yaml`、`…-ent-bugbot-model-access-20261022.yaml`、`…-subagents-pools-billing-20261022.yaml`、`ref-cur-custom_providers-pricing-plans-20261022.yaml`、`…-pricing-third-party-20261022.yaml`、`…-pricing-token-rate-20261022.yaml`
- 快照与原件记录：`snapshots/snapshot-source-cur-{agent-projects,subagents,ent-model-management,models-pricing}-doc-20261022.yaml` 与对应 `artifacts/`
- 选择：`registry/chapter-current.yaml`

本地差异与未跟踪文件：

```sh
git diff --stat
git diff -- knowledge/cursor registry/chapter-current.yaml
git status --short --untracked-files=all
```
