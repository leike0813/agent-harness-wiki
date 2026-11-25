# lovable 上游审阅报告 · 2026-11-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-11-25T00:29:33.212Z，37 个登记来源中 16 个有实质差异，其余 21 个 unchanged。差异集中在四处机制变化：

1. `docs-ai` 新增工作区级 **ElevenLabs** 开关（可选 provider，默认关，EU inference 工作区不可用，无需 ElevenLabs 账号或 key）。
2. `docs-project-settings` + `docs-skills` + `docs-hosting`：Project settings 由标签页改为 **General settings + More 面板的 Settings 分组**，Domains 移到 `More → Domains`，Skills 从项目侧移除、只在 `Workspace settings → Skills`。
3. `docs-privacy-security` + `docs-project-settings`：**Abandoned projects → Inactive projects**，取消删除动作改为 **Postpone / Postpone deletion**，永久豁免改为 **Keep forever / Keep it**；`Connector policies` 默认值改为"工作区变为 Enterprise 时开启"。
4. `docs-api-keys`：新增每用户每工作区 **10 个 key** 上限（过期未吊销仍占名额）、IP 清单菜单（文本编辑/CSV 导出）、IPv4 必需条目的新解释。

另有 `docs-desktop-app` 删除 Paper 本地 MCP、`docs-chat-connectors` 新增 Paper 远程 chat connector，二者互为证据。其余变化为导航/配图/术语措辞，按噪声排除。

## 逐来源 triage

| 来源 | 变化 | 结论 |
| :-- | :-- | :-- |
| docs-ai | 新增 Enable ElevenLabs 整节；音乐/TTS 模型行与 FAQ 默认规则；删除"每个模型条目都链到 provider 官方页" | providers.entry/auth/models、config.defaults/trust、agents.overrides 更新 |
| docs-project-settings | 设置结构改写；Domains/Skills 移出；新增 Secrets/Logs/Instructions/Memory 分组；Lifecycle 改 Keep forever | config.sources、skills、local_transcripts 更新 |
| docs-privacy-security | Inactive projects 全套改名与新动作；Connector policies 默认值；术语 scans→checks；Sensitive data 视图措辞 | config.trust/defaults、local_transcripts.archive-cleanup、hooks 更新；Sensitive data 未被本轮章节引用 |
| docs-api-keys | 10-key 上限；空 allowlist 措辞；IPv6-only 清单风险；⋯ 菜单编辑/导出 | config.runtime/diagnostics、custom_providers.diagnostics 更新 |
| docs-skills | 删除 Project settings → Skills 两处，自动使用仅工作区侧 | skills.roots/loading/conditions 更新 |
| docs-desktop-app | 删除 Connect Paper 小节与 FAQ Paper 条目；Windows 关闭窗口留在托盘 | mcp、native_plugins 的 Paper 归属更新；托盘行为未进答案 |
| docs-chat-connectors | 新增 Paper accordion（远程 MCP，读设计上下文/编辑画布） | 与 desktop-app 共同证明 Paper 改为 chat connector |
| docs-workspace-admin-settings | Security 分组描述改 inactive、Security center 术语改 advanced checks | 仅措辞，无答案改写 |
| docs-index | llms.txt 音乐/安全/项目设置/2FA 摘要改 | 被引用的 chat、Chats、cross-project、header/listing 条目未变，排除 |
| docs-agent-integrations | 安全扫描段改 advanced checks + Findings 页面，新增配图 | 工具定义/面板/权限未变，无答案变化 |
| docs-mcp-server | 同一 accordion 内 Deep scan→advanced checks | 400/type/finding_refs 未变，无答案变化 |
| docs-publish | Quick scan→automatic checks；结果行改写；新增 Publish to Databricks | 本轮主题未引用这些段落，无答案变化 |
| docs-payments | Payments tab 拆段 + 配图，webhook 文本未变 | 无答案变化 |
| docs-connectors | 仅新增 More → Connectors 配图 | 噪声 |
| docs-git-sync | 仅锚点 `#git-tab` → `#git` | 导航/URL churn |
| docs-hosting | 域名状态路径 `Project → Settings → Domains` → `More → Domains` | 本轮主题未引用，无答案变化 |

基线窗口：16 个变化来源的 baseline 哈希全部存在于 `documents/`，因此全部是基线对基线的逐字 diff，没有用到"最近保留原件"回退。

## 固定证据与章节选择

- 新增 artifact/snapshot 7 组：`artifact-source-lovable-docs-ai-5966b6985164`、`...-api-keys-ab8bba41a7d1`、`...-chat-connectors-3caffe8e2607`、`...-desktop-app-996ca0f070f8`、`...-privacy-security-0ffe4ee40977`、`...-project-settings-c34de6752d17`、`...-skills-61757d014c2f`；archive 均为 `archive/lovable/<artifact-id>/source.md`，`raw_sha256 = extracted_sha256` 为观察哈希，`identity-markdown@1`。
- 新增 22 条 reference：`ref-lovable-ai-elevenlabs-5966b6`、`ai-music-row-5966b6`、`ai-faq-music-5966b6`、`ai-model-pages-5966b6`、`projset-settings-group-c34de6`、`projset-noskills-c34de6`、`projset-general-c34de6`、`projset-domains-faq-c34de6`、`projset-lifecycle-c34de6`、`skills-ws-only-61757d`、`skills-disable-ws-61757d`、`apikeys-limit-ab8bba`、`apikeys-iplist-rules-ab8bba`、`apikeys-iplist-actions-ab8bba`、`priv-inactive-0ffe4e`、`priv-inactive-delete-0ffe4e`、`priv-inactive-keep-0ffe4e`、`priv-inactive-insights-0ffe4e`、`priv-connectorreq-0ffe4e`、`desktop-mcp-996ca0`、`desktop-faq-996ca0`、`chatconn-paper-3caffe`。旧 artifact/snapshot/reference 未改动。
- 章节：八主题各新建完整 edition（configuration v5、custom_providers v5、custom_agents v3、mcp v4、local_transcripts v3、skills v3、native_plugins v3、hooks v3），旧 edition 文件保留；`registry/chapter-current.yaml` 改选新 edition。未改动的小节沿用原来源与结论。

## 高影响标记与独立复核

**Paper 的本地 MCP → 远程 chat connector** 是跨主题（`mcp` × `native_plugins`）的入口/加载位置变化：桌面应用不再自动探测 Paper，Paper 改出现在 `Connectors` 目录的 chat connectors 中。两个来源的直述一致，没有冲突；已按高影响规则标记并送独立复核。

独立复核返回 **changes_requested**，九项发现（F1–F9）与 P3 已全部应用到同一候选：技能补 Personal skills 三种类型与同名冲突优先级（collision 改 `partial`）；配置修正 2FA/SSO 关系、四条发布策略与改名、随改随保存（删除 Update 按钮说法）、工作区级 IP allowlist 强制与 `403 ip_allowlist_required`；hooks 同步保存语义；本地 MCP 路径改为 `Connectors → All connectors → Local MCPs / Custom`，Figma 流程去掉 Dev Mode/重启；对话/图像起步模型与零保留例外按新表修正；八章固定来源窗口改为 2026-11-25 观察并补宽限期开始邮件。新增 15 条 reference，全部 pin 到已有快照。`review_status` 保持 `pending`，等待复核复查。

## 待处理与独立复核

**审计记录：** `audits/lovable/audit-lovable-d0710dab-cfb0-4aa7-80ee-2ea63d916836.yaml`。`pending_question_ids` 置空仅表示本轮问题均已 triage；`review_status` 为 `pending`。`pending_audit_refs` 中的 12 条历史审计未在本轮派发，保持各自状态与未完成问题，不因本审计而视为解决。

## 验证与差异入口

作者自检：逐来源 diff 冻结原件；每条新引用对应新 snapshot 的归档原件并逐字摘录；章节答案的引用均在小节内出现；`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-10/candidates/lovable` 通过（exit 0）。差异文件保留在 `/tmp/lvdiff/`（临时，不入候选）。
