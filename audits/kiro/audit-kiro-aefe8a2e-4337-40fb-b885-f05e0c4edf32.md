# Kiro 上游审阅报告 · 2026-11-25

## 给维护者的结论

本轮 kiro 共 43 个登记来源，其中 40 个 changed、3 个 unchanged。逐页比对后按主题处理如下：

| 主题 | 处理 | 当前选择 |
| --- | --- | --- |
| mcp | 已发布新 edition `kiro-cli-mcp-v3` | v3 |
| custom_providers | 已发布新 edition `kiro-cli-custom_providers-v3` | v3 |
| native_plugins | 已发布新 edition `kiro-cli-native_plugins-v2` | v2 |
| skills | 已发布新 edition `kiro-cli-skills-v2` | v2 |
| local_transcripts | 已发布新 edition `kiro-local_transcripts-v3` | v3 |
| configuration | **保留旧版**，新结论待独立复核 | configuration-v1 |
| hooks | **保留旧版**，新结论待独立复核 | hooks-v2 |
| custom_agents | **保留旧版**，新结论待独立复核 | custom_agents-v1 |

保留的三个主题属于高影响类别：hooks 的 Prompt Submit 阻断语义被来源反转；custom_agents 的 agent profile 加载门槛改变（含旧信任字段的 2.x profile 会被 V3 跳过）；configuration 的 `KIRO_HOME` 路径规则与 `kiro-cli settings` 作用域改变，是跨主题的路径/优先级机制。它们的旧 edition 字节未改，本轮不新建未复核的 edition；`pending_question_ids` 列出这三个主题的全部问题，审计保持 `review_status: pending`，等待独立复核后再选版。

## 证据与比对方式

全部 40 个 changed 来源都与候选内最新保留原件逐字 diff：

- 38 个来源的 audit `baseline` 与保留原件 sha256 完全一致，窗口为保留快照抓取时间（2026-09-30）至本轮观察 2026-11-25T00:27Z。
- `source-kiro-docs-cli-commands` 与 `source-kiro-docs-slash-commands` 的 audit baseline 没有保留原件，改用最新的 monitored snapshot（`snapshot-kiro-lt-cli-commands-20261022`、`snapshot-kiro-lt-slash-commands-20261022`，2026-10-22 抓取），窗口为 2026-10-22/23 至 2026-11-25T00:27Z。结论不覆盖这两个窗口之外未观察的时段。
- `/tmp/kiro-diff-1125/<source-id>.diff` 保存每个来源的 unified diff；`/tmp/kiro-diff-1125/manifest.json` 记录每个来源的基线路径、sha256、抓取时间与增删行数。

排除项：链接域名迁移（`cli/acp.md`→`acp.md`、`v3/tangent.md`→`chat/tangent.md`、页内锚点）、`llms.txt` 导航块、示例里的模型名/占位符替换、UI 文案大小写。没有 CDN、nonce 或构建 hash 参与判断。

## 已发布主题的实质变化

### MCP（`kiro-cli-mcp-v3`）

- Tool Search：IDE 1.3+ 与 CLI 本地 V3 2.31+ **默认按需加载**，V2 仍是 `toolSearch.enabled` 可选；V3 2.31.1+ 应用已保存的阈值，但只有同时保存 `enabled` 才应用；活动表现为 `tool_load`→`tool_call`，旧的 `tool_search` 参数表属 V2 路径。
- 认证：新增组织统一登录（`identityProvider` 只读用户级 `~/.kiro/settings/mcp.json`、`oauth.mode` 为 `browser|enterprise|auto`、`kiro-cli mcp idp setup/show/remove`、`/mcp` 的 `org sign-in` 行）；`oauthScopes` 与 `oauth.oauthScopes` 的优先级按客户端与版本改写（V3 3.4.0+ 顶层优先）。
- 配置/生命周期：两类 server 都接受 `timeout`，V3 3.4.0+ 接受 `timeoutMs` 且 `timeout` 优先；`kiro-cli mcp add` 新增 `--url`、`--args`、`--oauth-mode`、`--oauth-client-id`、`--disabled`，`--agent` 语义明确为写入 agent 配置。
- registry：管理员 registry 设置不适用于 Kiro Web；V3 仅名字命中不够，自带 `command`/`url` 的同名条目会被跳过。**来源缺陷**：该句的 inline code 为空（"declared as ``."），章节未猜测其形状，已写入缺口。
- 跨界面：Web/Mobile 现支持远程 HTTP/SSE，但 `oauth` 设置不生效；不受信任工作区对所有 MCP 调用强制审批；elicitation 自 CLI 2.34 的本地 V3 会话支持。
- 旧章节"Web 只支持沙箱内本地 stdio"的表述被来源否定，已改写。

### Custom providers（`kiro-cli-custom_providers-v3`）

- 模型清单：Luna 1.1x→0.6x；新增 Fable 5.2、Fable 5.1、Sonnet 5.5、Haiku 5.5、Grok 4.7、Kimi K3；DeepSeek 3.2 与 GLM-5 改为 US-only。
- 路由：模型页路由表改为 source of truth，EU profile 出现 `Global`；US 地理不再包含 GovCloud（独立模型目录）。
- 治理：`Disabled` 时 Fable 5.2/5.1 与 Kimi K3 不可用、其余模型自动可用；`Enabled` 时只有保存进 **Manage approved list** 的模型可用；Fable 5.2 Preview、Fable 5.1 GA；Enterprise Management preview 把设置托管为 `model_use`/`default_model`。
- 诊断：新增退出码 4（agent/mode 不可用）；`kiro-cli doctor` 退役并提示 `diagnostic`/`issue`。
- `providers.entry`/`protocol`/`forwarding` 的 `not_applicable` 判定未变：配置参考仍无 provider/base URL/请求参数入口。

### Native plugins（`kiro-cli-native_plugins-v2`）

- power 组件由四项改为三项，`dev.kiro/` 不再出现在组件清单与目录示例；章节相应删除了"Kiro 专有 dev.kiro/ 扩展"的注册面，并明确来源未说明旧目录是否仍兼容。
- 安装：GitHub 或 GitLab（自建 GitLab 需 `kiroAgent.powers.trustedGitLabHosts`）；一个仓库可含多个 power；无分支 URL 从 `main` 安装。
- 元数据：IDE 1.4.26+ 的 Installed/详情页读取 `plugin.json` 或 `POWER.md` front matter；CLI 安装的 power 也出现在 IDE。
- Web 管理入口改为 **Agent Config > Powers & MCP**；新增 Security and trust 小节；分享步骤改为 `git add .`。

### Skills（`kiro-cli-skills-v2`）

- 可用性表新增"上传本地 Skill 到 cloud configuration"（CLI `Opt-in`、Web ✓），`skills.roots` 增加账户级来源。
- `KIRO_HOME` 的绝对路径规则同步到 roots 说明。
- `skills.loading` 增加 IDE 1.4.178+ 的 30,000 字符完整加载例外，明确标注仅 IDE；CLI 行为未变。
- IDE 的 GitLab 导入与 `trustedGitLabHosts` 属于 IDE 导入入口，CLI 章节正文未展开，在此记录为未覆盖的 surface 差异。

### Local transcripts（`kiro-local_transcripts-v3`）

- V3 与 V2 会话存储分离；V3 把 V2 会话导入为副本，V2 打不开 V3 会话；生命周期一节补充"跨引擎延续"。
- `KIRO_HOME` 改为必须绝对路径（相对路径、文件系统根、家目录及其祖先回退 `~/.kiro`），V3 覆盖配置/登录/会话/agent 状态。
- 新增 `/sessions rename`；headless `stream-json` 新增终止性 `runError` 记录。
- 当前 settings 环境变量表不再列出 `KIRO_ACP_RECORD_PATH`，slash-commands 页不再包含 `/stats`；章节移除了这两项作为**现行**入口的表述，并明确记录为来源缺口（不声称实现已被删除）。
- zip 归档/JSON 导出、schema unknown、清理范围等原有结论未变。

## 待独立复核的三个主题（未选版）

1. **hooks**：`Prompt Submit` 在 CLI V3 不能阻断（exit 2 也不阻断，输出与退出码加入上下文）；`Stop` 语义改为 block=continue、exit 1 也继续；新增 `SubagentStop`/`PreCompact`/`PostCompact`/`PermissionRequest`；Hook 位置双轨（profile 内联数组 + 独立文件）并新增全局 `~/.kiro/hooks/`；matcher 扩为 tool selector/tag/`@server`；MCP tool_name 改为 `mcp_<server>_<tool>`。这些问题在 `pending_question_ids` 中保持 pending。
2. **custom_agents**：含 `allowedTools`/`toolsSettings` 而无 `permissions` 的 2.x profile 被 V3 跳过直到 `/upgrade-agent`；`toolAliases`/`keyboardShortcut` 退出 V3 schema；内联 hooks 改为数组；子 agent 工具调用受父会话策略与自身 permissions 双重重查（父无规则即询问、headless 拒绝），`trustedAgents` 不再跳过工具审批；新增 Validation/Introspect 子 agent；agent 的 model 不可用可能让首个 prompt 失败。
3. **configuration**：`kiro-cli doctor` 退役；`kiro-cli settings` 新增 `--global`/`--workspace` 与仅全局键、`KIRO_DEFAULT_SETTINGS`；`KIRO_HOME` 绝对路径规则；Cloud configuration 作用域与 `sandbox.json`；Tool Search 在 V3 默认按需加载；Windows `UpdateMode=none` 注册表策略；firewalls 的 EU/WAF/GovCloud 端点。

复核建议：先看对应来源 diff（`hooks-actions`、`hooks-types`、`hooks-migration`、`agents-config-ref`、`agents-subagents`、`cli-v3`、`configuration`、`settings`、`permissions`），再决定是否按本章草稿方向发布。本轮没有把这些主题的新 edition 写入候选，避免未复核结论进入当前版。

## 审计与历史 pending

- 本审计 `pending_audit_refs: []`：本轮调查不再被历史 pending 阻塞。**历史 pending 审计不会因此关闭**——`e07643f7`、`20261004t061205z`、`a0cd3d52`、`a3dedb86`、`7b3ca25c`、`0454758c`、`bbdcf364`、`350adf7a`、`98f0f73b` 仍各自保持 pending，其未完成问题不因本审计的 `review_status` 改变。
- 因三个高影响主题待复核，本审计 `review_status: pending`、`pending_question_ids` 非空；`reviewed_by`/`reviewed_at` 留空，等复核完成后填写。

## 候选验证

`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-10/candidates/kiro` 通过（exit 0，462 个文件）。新增内容：

- 17 个 snapshot + 17 个 artifact（全部指向 monitor 已归档的 `archive/kiro/artifact-source-<source>-<sha12>/source.md`；未复制原件进候选）。
- 33 个 reference，均为新快照的 `document_section`/`file_lines` 定位 + 原文短摘录。
- 5 个 chapter edition，`registry/chapter-current.yaml` 仅切换这 5 个主题；configuration/hooks/custom_agents 仍指向旧版。
- 全部快照 `version_applicability: unknown`，未新增软件版本映射。

## 边界

delivery 为候选交付：未发布、未切换本地指针、未运行受管二进制、未创建 source workspace（kiro 没有 Git 来源，`workspaceIDs: []`）。
