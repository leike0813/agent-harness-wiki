# Lovable 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮 37 个官方文档来源全部 `changed`，其中 12 页的差异被写进了新引用。知识侧新建了 5 个完整章节版本并已写入候选的主题选择：`configuration` → `lovable-web-configuration-v4`、`local_transcripts` → `lovable-local_transcripts-v2`、`mcp` → `lovable-web-mcp-v3`、`hooks` → `lovable-web-hooks-v2`、`native_plugins` → `lovable-web-native_plugins-v2`；`custom_agents` 与 `custom_providers` 复核后固定问题答案未变，保留各自的 `v2`；`skills` 无变化。

本轮**没有执行发布**：候选内只改了 `registry/chapter-current.yaml` 的 5 条选择，没有 staging 构建、验收或切换记录，读者是否看到新内容取决于后续 merge。审计 YAML 的 `review_status` 仍是 `pending`，本轮**没有**结掉 `pending_audit_refs` 里的 10 个旧审计。

最需要维护者注意的是改写的性质：项目 Secrets 入口从 `More → Cloud → Secrets` 改成 `More → Settings → Secrets`，文档正文把 "Lovable Cloud" 统一改称 **built-in backend**，后端工具权限只在 `Account settings → Agent permissions` 调整，项目删除从"永久不可恢复"改成 **60 天内可自助恢复**，发布受众新增组织选项、旧的 `Who can publish externally` 被 Enterprise publishing policies 取代，桌面应用最低系统改为 macOS 13+/Windows 10+。这些都是对已发布操作步骤的实质改写，按旧版本操作的读者会找不到入口或误判删除不可逆。

## 变化的意义与证据边界

### 产品改名与入口重排：Cloud → built-in backend，Secrets 与后端权限换入口

`features/cloud.md`（观察 `147e9555bbd5…`）把 "Lovable Cloud" 统一改称 built-in backend，只在产品界面的 Cloud 积分用量与 `Enable Cloud` 权限上保留 Cloud 字样，后端工具入口从 `More → Cloud` 改为 More 下的 Database / Logs / Usage 等独立分区；`features/secrets.md`（`39f16987…`）把项目 Secrets 入口改为 `More → Settings → Secrets`；`features/agent-integrations.md`（`5fa145d0…`）把面板移到 `More → AI → Agent integrations`；`features/ai.md`（`67f3fb56…`）把 AI activity 移到 `More → AI` 并写明 AI app context 的默认值（Free/Pro 开、Business/Enterprise 关）与 EU inference 例外。

受影响问题：`config.sources`、`config.runtime`、`config.trust`、`config.diagnostics`（均 `answered`），以及 `mcp.diagnostics`、`mcp.capabilities`。引用落在 `ref-lovable-cloud-backend-147e9555`、`ref-lovable-secrets-path-39f16987`、`ref-lovable-cloud-perms-147e9555`、`ref-lovable-agentint-panel-5fa145d0`、`ref-lovable-ai-activity-67f3fb56` 等。

证据边界：只能证明官方文档这样写、入口路径这样描述。文档的 `version_applicability` 为 `unknown`，没有产品界面截图或版本号，因此"界面是否已经这样改名"没有证据；章节只按文档措辞记录。

### 删除不再永久：60 天恢复窗口与 Enterprise 废弃项目清理

`features/projects/settings.md`（`8cf90079…`）、`features/workspace-admin-settings.md`（`9b9f5404…`）、`features/privacy-and-security-settings.md`（`bcda0c10…`）三页合起来推翻了旧的"永久删除"结论：项目删除会立刻下线 app 与预览链接，但可在 60 天内从 `Workspace settings → Workspace → Recently deleted projects` 恢复；工作区删除在 Free/Pro/Business 上由 owner 自助恢复；Enterprise 新增 `Abandoned projects`（60 天无活动标记、宽限期 7/14/30 天、删除默认关闭、提前 5 天与 1 天预警、`Abandonment protection` 永久豁免）。这一条同时改写了三个主题：`transcripts.archive`、`transcripts.cleanup`、`transcripts.diagnostics`，`hooks.diagnostics`（问题仍为 `not_applicable`，但其相邻观测入口的行被修正），`config.defaults`、`config.migration`，以及 `mcp.lifecycle`。

证据边界：文档没有说明"恢复项目是否连同对话历史一起恢复"，章节把这一点留成缺口，恢复窗口不被当成会话级保留承诺。旧版 hooks 里"需联系 support 恢复"的表述已被 `ref-lovable-priv-restore-bcda0c10` 推翻。

### 发布受众、发布策略、数据区域与 app 登录方式

`features/publish.md`（`2e581b42…`）与 `features/privacy-and-security-settings.md` 一起改变了配置的合并与默认值：工作区 `Default website access` 只在 Business/Enterprise 可选且默认 **Anyone**、只影响首次发布；Free/Pro 的 Invite only 每个项目最多 10 人；Enterprise 组织中的工作区多一个"组织"受众；旧的 `Who can publish externally` 被 Enterprise `Publishing policies` 的五条策略（未解决 PII、外部协作者发布、对外发布、指定类型 connector、发布者邮箱域）取代，各条可设拦截或需审批；数据区域取值改为"工作区默认 > 个人设置 > 最近区域"，启用后端后不可更改；新增 app 登录方式策略（Business/Enterprise）与 Enterprise 废弃项目行。

受影响问题：`config.overrides`、`config.trust`、`config.defaults`、`config.migration`、`config.diagnostics`。证据边界同上：只覆盖文档描述与计划门槛，没有实际工作区可验证策略是否已对现有项目生效。

### MCP：数据库工具的作用范围、面板路径与 registry 的前置条件

`integrations/lovable-mcp-server.md`（`41ef1f4c…`）把数据库类工具（`get_database_status` / `enable_database` / `query_database`）明确为作用于项目自带的内置数据库，PostgreSQL 扩展限制的措辞随之更新；`features/agent-integrations.md` 补上"删除项目会同时下线 app 与其 MCP server、60 天内可恢复"和 `MCP authentication is required` 触发的 `Publishing is blocked` 处置；`integrations/admin-controls.md`（`b8d9059d…`）补上 MCP registry 只在 Remote MCP connectors 开启时可用。

受影响问题：`mcp.definition`、`mcp.capabilities`、`mcp.lifecycle`、`mcp.diagnostics`。认证与暴露机制未变（`mcp.auth`、`mcp.exposure` 仍为 `answered` 并沿用旧引用），因此 `v3` 相对 `v2` 只补上述几点，不重写授权模型。

### 桌面应用前置条件

`integrations/desktop-app.md`（`32b29ea2…`）把前置从 macOS 12+ 改为 **macOS 13+（Apple Silicon 或 Intel）/ Windows 10+**，并明确所有计划含 Free。它只影响 `native_plugins` 的 `plugins.install` 与诊断表；原生插件体系本身仍不存在（`plugins.package`、`plugins.api` 仍为 `not_applicable`）。

### 复核后未改写的主题，以及证据边界

- `custom_agents`：`features/chat-mode`、`features/agent-mode`、`features/goal-runs`、`features/subagents`、`features/plan-mode` 除改名外规则未变，`agents.invocation` 等答案保持 `lovable-web-custom_agents-v2`。
- `custom_providers`：`features/ai` 把模型清单拆到各能力页、弃用模型单列，但"文档里的模型属于 app 的 AI 功能、不是构建代理模型"、SSE 流式、后端函数注入、OAuth 刷新失败码、gateway 限流与出口网段未变；模型名单漂移属于本轮**未派发**的 `providers.models`，因此不据此改写 edition。
- 本轮复核判定 44 条已发布文档摘录在新的页面里不再命中；`investigation_notes` 记 19 页有实质差异但只点名了 11 页，另外 8 页未点名，本报告不代为判定。候选内可核对的口径是：12 页产生了本轮新引用。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | lovable-web-configuration-v4 | config.sources / overrides / trust / diagnostics：answered；config.runtime / defaults / migration：partial | 已进入候选选择（原 v2 → v4） |
| local_transcripts | lovable-local_transcripts-v2 | transcripts.scope / location / naming / format / lifecycle / archive / cleanup / diagnostics：partial；transcripts.schema / database：unknown | 已进入候选选择（原 v1 → v2） |
| mcp | lovable-web-mcp-v3 | mcp.entry / transport / auth / exposure / diagnostics：answered；mcp.definition / lifecycle / capabilities：partial | 已进入候选选择（原 v1 → v3） |
| hooks | lovable-web-hooks-v2 | hooks.events / entry / input / output / order / conditions / diagnostics：not_applicable | 已进入候选选择（原 v1 → v2） |
| native_plugins | lovable-web-native_plugins-v2 | plugins.model：answered；plugins.package / api：not_applicable；plugins.install / discovery / lifecycle / diagnostics：partial | 已进入候选选择（原 v1 → v2） |
| custom_agents | lovable-web-custom_agents-v2 | agents.invocation 等答案未变（answered / partial / not_applicable 混合） | 保留 v2（未新建版本） |
| custom_providers | lovable-web-custom_providers-v2 | providers.* 答案未变（auth / protocol / responses / diagnostics：answered，其余 partial） | 保留 v2（未新建版本） |

两个跳版需要留意：`configuration` 从 `v2` 直接选到 `v4`、`mcp` 从 `v1` 直接选到 `v3`，中间的 `configuration-v3`、`mcp-v2` 此前存在但未进入选择，因此它们的内容（API keys & OAuth 分区、MCP 授权模型改写）会随本次选择一并生效。`v4`/`v3` 相对上一版只做增量，没有删除前版结论。

**发布：**本候选未执行 staging 构建、验收或切换；只有 `registry/chapter-current.yaml` 的 5 条选择改为新版本，是否对外可见由后续 merge 决定。**受管二进制：**未触发——Lovable 是托管 Web 产品，没有可接管的 CLI 二进制。

## 待处理与独立复核

**审计记录：**本轮审计 `audits/lovable/audit-lovable-ea6b6898-cd7b-4519-a315-e2240fd76deb.yaml`（`status: changed`）。该文件字段写的是 `review_status: pending`，而 `investigation_notes` 最后一句说"已按作者自检 + 候选 check 结论置为 reviewed"——两者不一致，本报告以字段为准，按 **pending** 处理，未把本轮视为已复核。

**待处理旧审计：**10 个，本轮没有关闭其中任何一个：`audit-lovable-b0a04022-44c3-4405-b93c-56cf96d127ea`、`audit-lovable-20261004t061205z`、`audit-lovable-e2b6a679-0098-4a2d-b3e2-eac5591d07bc`、`audit-lovable-20261006t134000z`、`audit-lovable-37ac768b-1b61-4f9d-b51e-c3b8f75ad794`、`audit-lovable-60beb139-d374-4173-8e8c-4bae258a7947`、`audit-lovable-8f408ac9-66e0-4f2e-b0c3-3942b7ab138c`、`audit-lovable-964024ac-6d6e-46d7-8fb0-1654dc0b7486`、`audit-lovable-7982c9db-2409-4798-b4b7-31a1cbc01e54`、`audit-lovable-7961c88f-38a8-4ee3-90a1-ee11684d4036`。

**待复核问题（24 个，全部仍为 pending）：**`agents.invocation`、`config.defaults`、`config.diagnostics`、`config.migration`、`config.overrides`、`config.runtime`、`config.sources`、`config.trust`、`hooks.diagnostics`、`mcp.auth`、`mcp.capabilities`、`mcp.definition`、`mcp.diagnostics`、`mcp.lifecycle`、`mcp.transport`、`plugins.diagnostics`、`providers.diagnostics`、`providers.entry`、`providers.forwarding`、`providers.metadata`、`providers.responses`、`transcripts.archive`、`transcripts.cleanup`、`transcripts.diagnostics`。

触发原因分三类：一是来源推翻了已发布配置步骤（Secrets 入口、删除与恢复、发布受众与策略、数据区域）；二是跨主题加载机制被改写（配置入口变化同时影响 `transcripts.*` 与 `mcp.*` 的观测入口）；三是保留旧版本的 `agents.invocation`、`providers.*` 需要 reviewer 确认"答案未变"的判断。建议独立复核优先看 `lovable-web-configuration-v4` 的入口/受众/区域改写与 `lovable-web-mcp-v3` 的数据库工具范围与 scope 表述。

## 来源核查记录

12 页的原件保留在项目 archive：`archive/lovable/artifact-lovable-docs-<slug>-<hash12>/source.md`（在项目根 `harness-monitor/` 下，不在本候选内），其内容即 checks 里的 `observed` 值；本轮新建 12 个 artifact、12 个 snapshot、25 条 reference，25 条新引用全部被 5 个新版本正文引用。结论建立在 2026-10-22T12:54:54–12:55:01Z 的这批固定身份上，主要承重的四页完整 sha256 为：cloud `147e9555bbd5608cea099f6654cedf96a1da6aa51b93bfb6fcd8ffccf0894f2d`、secrets `39f169878f46bde9ce45d840a1789cce4c9a5b76b82f54965780e095c86c65dd`、privacy-and-security-settings `bcda0c101e95f6d3d045117e0fa8f5e192de3bd8fd60749dab03eba011107b0a`、projects/settings `8cf90079a242abf6cfebbffc52653710daba4ce317983df5083fe61c494e2d43`。

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-lovable-docs-admin-controls（integrations/admin-controls.md） | c68cde285de5 → b8d9059d0f84 | changed；实质差异，候选新增引用 `ref-lovable-adminconn-registry-b8d9059d`（registry 依赖 Remote MCP connectors） |
| source-lovable-docs-agent-integrations（features/agent-integrations.md） | a1a0f23621ce → 5fa145d027c3 | changed；实质差异，新增引用 `ref-lovable-agentint-panel-5fa145d0`、`ref-lovable-agentint-remove-5fa145d0` |
| source-lovable-docs-agent-mode（features/agent-mode.md） | ef8a2e68d2b2 → 2e2843599c96 | changed；notes 归为 MDX 排版改写，无实质差异 |
| source-lovable-docs-ai（features/ai.md） | 5c741917588d → 67f3fb566908 | changed；实质差异，新增引用 `ref-lovable-ai-activity-67f3fb56` 等 3 条（AI activity/app context 位置与默认值） |
| source-lovable-docs-any-api（integrations/any-api.md） | 6840cef550a4 → 5f724c84a6e6 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-api-keys（features/api-keys.md） | 41e97deaf6b9 → fb90cd42b0b3 | changed；notes 归为 MDX 排版改写，无实质差异 |
| source-lovable-docs-app-connectors（integrations/app-connectors.md） | bdab1059e957 → d1047ce58987 | changed；notes 归为排版改写，但候选新增引用 `ref-lovable-appconn-approval-d1047ce5`（connect 设置内的审批入口） |
| source-lovable-docs-app-user-connectors（integrations/app-user-connectors.md） | 7d41559b1725 → c9ace5824988 | changed；notes 归为 MDX 排版改写，无实质差异 |
| source-lovable-docs-build-secrets（features/build-secrets.md） | db0f18097ee8 → 3eb2f6df3a9e | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-chat-connectors（integrations/chat-connectors.md） | 742a6c47b1c5 → 54ed14e9db3b | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-chat-mode（features/chat-mode.md） | 0848b5ad9ec9 → 4693e5ec24ed | changed；notes 归为 MDX 排版改写，无实质差异 |
| source-lovable-docs-cloud（features/cloud.md） | e456eb6fd9f3 → 147e9555bbd5 | changed；实质差异，新增引用 `ref-lovable-cloud-backend-147e9555`、`ref-lovable-cloud-perms-147e9555`、`ref-lovable-cloud-region-147e9555` |
| source-lovable-docs-connectors（integrations/introduction.md） | abfdd7eafee1 → b9ba4e4bd90d | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-create-connector（integrations/create-connector.md） | 1a973186ffec → 5029b07c4c14 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-custom-mcp（integrations/custom-mcp.md） | 9816ec778472 → 4095618ba566 | changed；notes 归为 MDX 排版改写，无实质差异 |
| source-lovable-docs-desktop-app（integrations/desktop-app.md） | 47f94b18ded5 → 32b29ea2c9c3 | changed；实质差异，新增引用 `ref-lovable-desktop-requirements-32b29ea2`（macOS 13+/Windows 10+） |
| source-lovable-docs-figma（integrations/figma.md） | 5b148fda118e → d2b8be18e0c0 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-git-sync（integrations/git-sync-overview.md） | 8d3a443cfc07 → f4bd753b3bc7 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-goal-runs（features/goal-runs.md） | 7a91daac1653 → 42ee7ff22e08 | changed；复核后规则未变，答案沿用 |
| source-lovable-docs-hosting（features/hosting.md） | 5d8d6b6c1662 → efa23ec4f298 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-index（llms.txt） | 8e38de5ab688 → 303bf0efd862 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-integration-security（integrations/security.md） | 9019f6d02775 → ba19d009cadc | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-knowledge（features/knowledge.md） | f31ed55e7662 → b07150391b92 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-lovable-api（integrations/lovable-api.md） | fb314f9e6e6c → ca761dbe0999 | changed；notes 归为 MDX 排版改写，无实质差异 |
| source-lovable-docs-managed-registry（features/managed-registry.md） | dec841b16784 → c649ccf8bf13 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-mcp-registries（integrations/mcp-registries.md） | 5a76694a449a → acb497591c85 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-mcp-server（integrations/lovable-mcp-server.md） | 0bfb8e353896 → 41ef1f4c1322 | changed；实质差异，新增引用 `ref-lovable-mcpsrv-dbtools-41ef1f4c`、`ref-lovable-mcpsrv-pgext-41ef1f4c` |
| source-lovable-docs-payments（features/payments.md） | 56e649d5f2dd → 8efef17e1126 | changed；notes 归为 MDX 排版改写，无实质差异 |
| source-lovable-docs-plan-mode（features/plan-mode.md） | 73f2975ffc08 → 6df3a8b8ceca | changed；复核后规则未变，答案沿用 |
| source-lovable-docs-privacy-security（features/privacy-and-security-settings.md） | 91ae9e0b2f1a → bcda0c101e95 | changed；实质差异，新增引用 5 条（发布受众/策略、废弃项目、恢复、登录方式、区域） |
| source-lovable-docs-project-settings（features/projects/settings.md） | 1e1da563319c → 8cf90079a242 | changed；notes 记为"大部分排版改写"，但新增引用 `ref-lovable-projset-delete-8cf90079`、`ref-lovable-projset-lifecycle-8cf90079`（60 天恢复、Abandonment protection） |
| source-lovable-docs-publish（features/publish.md） | d1f817c84529 → 2e581b4242a6 | changed；实质差异，新增引用 `ref-lovable-publish-audience-2e581b42`、`ref-lovable-publish-inviteonly-2e581b42` |
| source-lovable-docs-secrets（features/secrets.md） | 3879e2d3ca21 → 39f169878f46 | changed；实质差异，新增引用 `ref-lovable-secrets-path-39f16987`（项目 Secrets 入口改为 More → Settings） |
| source-lovable-docs-skills（features/skills.md） | 67d923fcde6e → 663aa94c4346 | changed；notes 未点名，章节未新增引用 |
| source-lovable-docs-subagents（features/subagents.md） | 252ca2ce87e5 → c1852e04b44a | changed；复核后规则未变，答案沿用 |
| source-lovable-docs-workspace-admin-settings（features/workspace-admin-settings.md） | 6a328db0c084 → 9b9f54047c01 | changed；实质差异，新增引用 `ref-lovable-wsadmin-delete-9b9f5404`（Recently deleted projects、工作区自助恢复） |
| source-lovable-docs-workspace-identity（features/workspace-identity.md） | 22a14e8744c2 → 11a118451ef9 | changed；notes 未点名，章节未新增引用 |

## 验证与差异入口

本任务只写这份报告：**未**运行项目构建、lint、测试，也**未**运行 `maintenance:candidates check`。审计 `investigation_notes` 记有"作者自检 + 候选 check 通过"，本报告没有复核该结论，把它留给 independent review。

已执行的只读核对（全部为文档核对，没有产生其他写入）：

- `diff -rq baseline/lovable candidates/lovable`：差异仅为本审计 YAML、5 个新章节、25 条新 reference、12 个新 artifact、12 个新 snapshot 与 `registry/chapter-current.yaml`（5 行选择变更）。
- 5 个新版本正文引用的 163 个 reference ID 全部能在 `references/<id>.yaml` 解析。
- 25 条本轮新引用全部被 5 个新版本正文引用，没有孤立引用。
- 12 个新 artifact 的 `archive_path` 在项目 archive 下都存在对应 `source.md`。
- 63 条 reference 的 `snapshot_id` 全部能解析到候选内 snapshot。

章节与引用入口（候选内相对路径）：

- `knowledge/lovable/chapters/lovable-web-configuration-v4.md`、`lovable-local_transcripts-v2.md`、`lovable-web-mcp-v3.md`、`lovable-web-hooks-v2.md`、`lovable-web-native_plugins-v2.md`
- `knowledge/lovable/references/`（本轮新增 25 条）、`knowledge/lovable/snapshots/`、`knowledge/lovable/artifacts/`
- 选择：`registry/chapter-current.yaml`

复现差异：

```bash
cd /tmp/ahw-monitor-4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns/batch-20261022
diff -rq baseline/lovable candidates/lovable
diff -ru baseline/lovable/knowledge/lovable/chapters candidates/lovable/knowledge/lovable/chapters
diff -u baseline/lovable/registry/chapter-current.yaml candidates/lovable/registry/chapter-current.yaml
```

若在仓库内查看未跟踪文件：`git status --porcelain`。
