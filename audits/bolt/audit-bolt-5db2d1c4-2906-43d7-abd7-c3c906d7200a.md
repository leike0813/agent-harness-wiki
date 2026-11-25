# Bolt 上游审阅报告 · 2026-11-25

## 给维护者的结论

14 个官方文档来源在 frozen audit 里全部报 changed，Git 仓库仍停在 `eda10b12`。按保留原件做可见文本比较后，真正落到读者身上的变化集中在四处：设置面的导航入口与工作区用量页改名、三处 Knowledge 的保存流程与角色条件、Forge 的预览结束与获取方式、技能从 GitHub 导入后的更新生命周期。本轮维护 `configuration`（v3）与 `custom_providers`（v2）；`skills` 与 `custom_agents` 的两处已发布说法被新文本直接推翻，按维护规则保留旧 edition 并请求独立复核。

比较窗口必须先说清楚：只有 `account-settings`、`forge`、`security` 三个来源的最新登记快照（2026-10-03）就是 frozen baseline 且原件在档；其余 11 个来源的最新登记快照仍是 2026-09-30（比 frozen baseline 更旧）且归档文件不在本工作树，只能改用 2026-10-14 那次观察的保留原件。因此前 3 源的结论覆盖 2026-10-03 → 2026-11-25，其余覆盖 2026-10-14 → 2026-11-25；更早的差异不在本轮结论内。`index` 的保留原件不对应任何历史审计值，只做了原位比较，不能断言 9 月 30 日到 10 月 14 日之间的变化。

## 变化的意义与证据边界

### 设置面：入口、页面名与 Knowledge 流程

`account-settings`、`workspace-settings`、`project-settings`、`team-settings` 四页都重写了打开入口。账户设置改为「首页侧栏点账户/工作区名 → **Account settings**」，个人工作区同一菜单的 **Settings** 齿轮也进入账户设置，团队工作区则必须用 **Account settings**（齿轮打开的是团队设置）；项目内统一为顶部菜单头像 → Settings。工作区设置改为「账户/工作区名 → **Settings**（齿轮）」或项目内头像 → Settings；项目设置改为「项目内左上角项目名 → **All project settings**」，并新增移动端路径；团队设置改为「账户/工作区名 → Settings」再在左侧栏点 **Team settings**，删除了原来的团队页齿轮步骤。

页面内容也有实质变化：`Subscription & Tokens` 改名为 **Billing & usage**，并拆出 Billing details（付款方式、账单历史、换计划、取消/恢复）与团队视图（管理员看到下次账单、下次 token 补充与 Token consumption 表，非管理员只看到自己的 Usage）；团队区的 **Team** 改为 **Manage members**，并新增 **Team settings** 页说明。三处 Knowledge 都补了显式保存流程：账户是 **Global instructions** + `System prompt updated`，团队是管理员限定的 **Knowledge** + `Team prompt updated`，项目是 **Project instructions** + `Project prompt updated`，且 Viewers 可见、只有 Editors 与 Co-owners 能改。`Display token usage in chat` 的默认值仍是关，但语义改为「剩余余额」，关闭时低余额仍会提示，文档明确说看不到单条提示的消耗；Add-on features 注明仅对付费计划开放。

证据边界：以上全部来自四页的 2026-11-25 观察原件，已在候选内新建四个快照与 11 条引用；`configuration` 因此升到 `bolt-web-configuration-v3`，`config.sources`、`config.overrides`、`config.defaults`、`config.diagnostics` 的答案按上述事实重写，`config.migration` / `config.trust` 的结论不变。

### Forge：预览结束日期与获取方式

`forge` 页把预览结束日期从 10 月 14 日改为 11 月 30 日，删除「Pro 计划自带」和「加入 Lite 等待名单」两条获取路径与相应 FAQ，新增「What happens when the preview ends on November 30」：Lite 保持 $9/月并继续使用 Forge，取消或换计划后不能再获得 Lite；Pro 的 Forge 访问在 11 月 30 日结束，项目下次打开切到 Standard，Forge 用量不折算成普通 token。附件上限同时改为 Free 5 个/每文件 5 MB、Lite 与 Pro 20 个/每文件 5 MB（原为 10 MB 与 100 MB）。用量条所在页从 `Subscription & Tokens` 改为 **Billing & usage**，路径为首页侧栏账户/工作区名 → **Subscription** → 左侧栏 **Billing & usage**。

`custom_providers` 只涉及用量入口这一处用户可见事实，已升到 `bolt-web-custom_providers-v2`（新建 forge 2026-11-25 快照与 2 条引用）。Forge 的获取方式与可用性诊断推翻的是 `custom_agents` 已发布的步骤，本轮不改该章。

### 被推翻的已发布陈述：skills 与 custom_agents 暂不发布

`skills` 页现在说 GitHub 导入的技能**保持**与仓库文件夹的链接，新增 **Update from GitHub**（改名会同步斜杠命令、同名冲突会阻止更新、2 MB 上限、workspace 技能更新后可能重新开启），并警告手动编辑会断开链接变成独立副本；三点菜单从 Edit/Delete/Download/Add to Skill library 变为 Update from GitHub/Edit/Add to Skill library/Download/**Remove**。`skills` v1 明确写着「导入完成后技能与源仓库脱钩，后续更新要重新导入」，属于被推翻的配置步骤。

`custom_agents` v1 写着 Forge「个人 Pro 计划自带，或通过 Bolt Lite 的等待名单领取」，并把「尚未领取 Lite 席位」当作 Forge 锁定的原因；新文本是 Pro 在 11 月 30 日失去 Forge、Lite 不再向新订阅者开放、预览结束后只有既有 Lite 订阅者能用 Forge。`plan-mode` 还新增了 Plan Mode 的数据库限制（可读结构/内容，但不能建库、改数据或表结构、部署或删除 server functions，需切 Build Mode），这是 `agents.limits` 的新证据。

按维护规则，这两类「新证据推翻已发布步骤」需要独立复核，本轮**不写** skills v2 / custom_agents v2，selection 保持 v1；证据固定在 `archive/bolt/artifact-source-bolt-docs-skills-3219f083c49d/source.md`、`...-forge-3c68763532bd/...`、`...-plan-mode-7fded8a7f7d4/...`、`...-agents-d167b5b54ea5/...`。

### 其余来源：markup 与未引用小节

`mcp`、`chat-tools`、`security`、`llms` 的变化止于 Mintlify 组件改写、CDN 资源 hash 和相对链接绝对化，被引小节逐字未变；`agents` 正文未变（只有 `#general-account-settings` → `#default-agent` 的锚点更新）；`faq` 只改了 Free 计划协作文案（每项目最多 3 名协作者、转让条件），不属于已写主题的引用范围；`index` 只改页面描述并新增 business-guides 三页，仍无 hooks/plugins 页。`hooks`、`native_plugins`、`local_transcripts` 依赖的引用小节都未变，四个主题沿用 v1。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `bolt-web-configuration-v3` | `config.sources`：partial；`config.overrides`：partial；`config.defaults`：answered；`config.diagnostics`：partial；`config.migration`：unknown；`config.trust`：partial | 已进入候选并切换 selection |
| custom_providers | `bolt-web-custom_providers-v2` | `providers.diagnostics`：partial | 已进入候选并切换 selection |
| skills | 沿用 `bolt-web-skills-v1` | `skills.discovery`、`skills.diagnostics` 待复核 | 保留旧版本：GitHub 导入/更新流程被推翻 |
| custom_agents | 沿用 `bolt-web-custom_agents-v1` | `agents.entry`、`agents.limits`、`agents.diagnostics` 待复核 | 保留旧版本：Forge 获取方式与可用性被推翻 |
| mcp / hooks / native_plugins / local_transcripts | 沿用 v1 | 引用小节未变 | 保留旧版本 |

**发布：** `delivery=pr`，本轮不构建 release、不切换 `releases/current.json`，改动留在候选交回巡检主进程。**受管二进制：** 未触发，Bolt 的 npm 接收渠道核对留给 `harness-binary`。

## 待处理与独立复核

**审计记录：** [audit-bolt-5db2d1c4-2906-43d7-abd7-c3c906d7200a.yaml](audit-bolt-5db2d1c4-2906-43d7-abd7-c3c906d7200a.yaml)。**待处理旧审计：** 无（`pending_audit_refs: []`）；13d66c1f、fad734a8、2194e4af、1a127ec7、39936642 属扫描期 triage，其泛化影响已按本轮保留原件逐源重做。**待复核问题：** `skills.discovery`、`skills.diagnostics`、`agents.entry`、`agents.limits`、`agents.diagnostics`，触发原因是新文本推翻已发布步骤；`review_status` 保持 `pending`，等待只读 reviewer 核对上述两条新机制后再决定是否发布 skills v2 / custom_agents v2。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-bolt-repo` | `eda10b12…` → `eda10b12…` | unchanged；未打开来源工作区 |
| `source-bolt-docs-account-settings` | `2cb0bdf9…`（2026-10-03，原件在档）→ `7376fce1…` | changed；入口、token 显示、Knowledge、Add-on features 变化，已建快照与 4 条引用 |
| `source-bolt-docs-workspace-settings` | `e9b0a36a…`（2026-10-14）→ `5f6db59c…` | changed；入口、Billing & usage、Manage members/Team settings、团队 Knowledge 变化，已建快照与 4 条引用 |
| `source-bolt-docs-project-settings` | `f05d9a0d…`（2026-10-14）→ `b1a0b5f4…` | changed；入口（含移动端）、Rename、Knowledge 变化，已建快照与 2 条引用 |
| `source-bolt-docs-team-settings` | `1c81bcc9…`（2026-10-14）→ `65bd1813…` | changed；打开入口步骤变化，已建快照与 1 条引用 |
| `source-bolt-docs-forge` | `dff74b77…`（2026-10-03，原件在档）→ `3c687635…` | changed；预览日期、获取方式、附件上限、用量页名变化，已建快照与 2 条引用 |
| `source-bolt-docs-skills` | `7b8ee4a9…`（2026-10-14）→ `3219f083…` | changed；GitHub 导入/更新流程与菜单被推翻，保留旧章待复核 |
| `source-bolt-docs-agents` | `80b81488…`（2026-10-14）→ `d167b5b5…` | changed；正文未变，仅链接与锚点 |
| `source-bolt-docs-plan-mode` | `28340574…`（2026-10-14）→ `7fded8a7…` | changed；新增数据库交互限制，随 custom_agents 待复核 |
| `source-bolt-docs-index` | `fcd22536…`（保留原件，无审计对应）→ `5bee49ef…` | changed；页面描述与 business-guides 三页，无 hooks/plugins 页 |
| `source-bolt-docs-mcp` | `0e079fc5…`（2026-10-14）→ `96cc03b2…` | changed；markup/链接改写，引用小节逐字未变 |
| `source-bolt-docs-chat-tools` | `96b24dbc…`（2026-10-14）→ `815c7e75…` | changed；markup/链接改写，引用小节逐字未变 |
| `source-bolt-docs-security` | `ec8ef2e4…`（2026-10-03，原件在档）→ `6336a422…` | changed；markup/链接改写，引用小节逐字未变 |
| `source-bolt-docs-llms` | `98706cfe…`（2026-10-14）→ `78ed18df…` | changed；markup/链接改写，引用小节逐字未变 |
| `source-bolt-docs-faq` | `aba5bc40…`（2026-10-14）→ `96e8c4b5…` | changed；Free 计划协作文案，未落入已写主题引用 |

## 验证与差异入口

`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/bolt` 通过（候选归属、章节/问题/引用关系、快照与引用 schema、审计 schema）；新引用摘录均对 2026-11-25 归档原件核读且短于 800 字符；新快照的 `raw_sha256` 与归档原件及 frozen audit 的 observed 值逐条相等。本轮未运行 `sources:scan`、未打开 source workspace、未新增 mapping、未发布、未处理受管二进制。查看差异：`diff -ru /tmp/ahw-batch-11/baseline/bolt/knowledge/bolt/chapters /tmp/ahw-batch-11/candidates/bolt/knowledge/bolt/chapters` 与本报告同目录的审计 YAML。
