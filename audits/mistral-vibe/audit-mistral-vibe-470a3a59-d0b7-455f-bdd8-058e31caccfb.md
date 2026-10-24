# Mistral Vibe 上游审阅报告 · 2026-10-22

## 给维护者的结论

`source-mistral-vibe-repo` 从 `4ae5c5955da8e761318916bdb1a7f46f0b50c7d0` 前进到 `dd2c04ce717c417731ab89c333cd0a72541e33ba`（变更日志 3.0.1），八个已登记主题的已发布答案全部需要修订：配置层栈、agent 委派面、provider 默认值、hook 执行位置、MCP 连接所有权、插件保留命名空间、skill frontmatter 与会话存储写入者都变了。因此本轮为每个主题写了一份新 edition，而不是局部修补。

这不是版本号噪声：变更日志 3.0.1 与代码同时表明 Python CLI 的旧会话写入器、旧 MCP 连接路径和旧 hook 执行位置都被 Unified harness 取代，配置写回改成原子替换加指纹校验。任何按旧 edition 操作配置迁移、hook 调试或会话归档的读者都会读到过期步骤，所以八个主题全部进入维护。

候选目前是 `delivery=pr` 的隔离候选，未切换本地指针、未发布、未运行 harness-binary。独立复核已发生一轮（`rev2-mistral-vibe`，`changes_requested`），本轮按意见修订后 `review_status` 仍保持 `pending`：新审计引用了更早的未完成审计，且修订后的候选仍待复核。

## 变化的意义与证据边界

### 来源身份

- Git：`source-mistral-vibe-repo`，基线 `4ae5c595`（2.26.0）→ 观察 `dd2c04ce`（3.0.1），`refs/heads/main`。
- 官方文档：八个 `source-mistral-vibe-docs-*` 来源 hash 全部变化（agents、api-keys、configuration、configuration-reference、hooks、mcp-servers、safety、skills）。
- 新 edition 的统一证据是快照 `snapshot-mv-301-repo`（`artifact-mv-301-repo`，commit `dd2c04ce`）下的 `ref-mv-301-*` 引用；旧 edition 仍绑定 2.26.0 快照，按"已发布引用保留"原则未删除。

### 八个主题的语义影响

- **configuration**：层栈加入模型目录层（九层），项目层发现与信任门控重写，写回改为临时文件 + `fsync` + `replace` 并以 `dev:ino:mtime_ns:size` 指纹拒绝并发覆盖。`auto_compact_threshold` 的解析顺序是"模型声明（低于窗口）→ 全局显式设置（低于窗口）→ 窗口的 80% → 全局默认 200000"，不是"模型声明 → 80% → 全局值"。
- **custom_agents**：内置 `plan` 移除并回退到 `ask`；委派工具由 `task` 改为 `agents.*` 五个操作；可见性新增 `enable_auto_approve` 与 `installed_agents`。并发/深度不是缺口：`SubagentLimits` 固定 `max_depth=1`、`max_children=8`、`max_concurrent_turns=4`、`max_lifetime_names=128`，控制器以 `subagent_name_limit`/`subagent_child_limit`/`subagent_concurrency_limit` 拒绝超限，depth-one 由控制器与存储状态机各自拒绝再安装。
- **custom_providers**：`ProviderConfig` 新增 `api_style`、`emits_finish_reason`、`extra_headers`、`project_id`/`region` 等字段；默认模型集合缩为单一 `mistral-medium-3.5`；凭据优先序（会话 > 环境 > 钥匙串）与探测缓存成为诊断主线。
- **hooks**：执行位置迁到 Unified harness（Core 绑定 + 运行时 handler，id 为 `source:name`），失败策略按点分化；可声明点仍为 `pre_tool`/`post_tool`/`post_agent`，Core 另有三个不可声明的点。
- **mcp**：`mcp add`/`remove` 与 `/mcp add`（仅 OAuth）语义确认；OAuth 失败面扩展为端口占用、回调超时、无钥匙串、refresh 失效；stdio 连接池迁入 harness（串行 worker + 单次重连），能力面仍只有 tools。Unified runtime 是本提交的必需运行时，不存在 `--legacy-harness` 回退开关。
- **native_plugins**：保留命名空间由六个扩为九个（新增 `agents`/`agent`/`collaboration`），扩展块新增 `displayName`，见下节冲突。
- **skills**：frontmatter 新增 `license`/`compatibility`/`metadata`/`allowed-tools`/`user-invocable`/`disable-model-invocation`，description 上限提至 1024，发现结果改为提示词/运行时/斜杠菜单三面投影。
- **local_transcripts**：旧 JSONL 会话写入器移除，unified 存储成为唯一写入者且次版本升到 9；`messages.jsonl` 只作为导入源被读取，而 `meta.json` 仍由宿主以原子替换写入 unified 会话目录。

### 插件保留命名空间的冲突与边界

代码的 `_RESERVED_NAMESPACES` 是九个（含 `agent`、`agents`、`collaboration`），同一提交的作者指南仍列六个（`file_system`、`self`、`process`、`skill`、`subagent`、`vibe`）。两者无法用版本或分发差异解释，属于同一提交内的文档/实现分歧。章节按代码为执行依据（九个），保留指南的六项原文并写明边界：按指南写插件不会触发拒绝，但要让命名空间真正可用，仍需以代码集合为准。`vibe` 只在 builtin 范围豁免，用户插件不能使用。

### 官方文档原件无法归档的限制

本次观察的八个文档来源 hash 都已变化，但官方文档原件必须落在项目 `archive/` 下，worker 不可写该路径。因此本轮没有生成新的文档快照/artifact，也没有 impact 引用新文档文本；新 edition 的结论全部改由仓库内第一方文件（内置 vibe skill 的 MCP/agent 章节、插件作者指南、CHANGELOG）与源码承担证据。已发布 edition 仍引用被取代的旧文档快照；审计里为这八个来源各记了一条待办来源项（`question_ids: []` 的专用 impact），说明"新原件未归档、旧快照被源码证据取代、可归档时需重新 triage"。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `mistral-vibe-cli-configuration-v3` | config.sources/overrides/runtime/trust/defaults/migration/diagnostics：answered | 候选新 edition，待复核 |
| custom_agents | `mistral-vibe-cli-custom_agents-v4` | agents.entry/format/roles/invocation/overrides/limits/diagnostics：answered | 候选新 edition，待复核 |
| custom_providers | `mistral-vibe-cli-custom_providers-v4` | providers.entry/auth/protocol/models/metadata/forwarding/responses/diagnostics：answered | 候选新 edition，待复核 |
| hooks | `mistral-vibe-cli-hooks-v3` | hooks.events/entry/input/output/order/conditions/diagnostics：answered | 候选新 edition，待复核 |
| mcp | `mistral-vibe-cli-mcp-v3` | mcp.entry/definition/transport/auth/lifecycle/capabilities/exposure/diagnostics：answered | 候选新 edition，待复核 |
| native_plugins | `mistral-vibe-cli-native_plugins-v3` | plugins.model/package/install/discovery/api/lifecycle/diagnostics：install partial，其余 answered | 候选新 edition，待复核 |
| skills | `mistral-vibe-cli-skills-v2` | skills.roots/discovery/collision/format/extensions/loading/invocation/conditions/diagnostics：answered | 候选新 edition，待复核 |
| local_transcripts | `mistral-vibe-local_transcripts-v3` | transcripts.scope/location/naming/format/schema/lifecycle/database/archive/cleanup/diagnostics：archive 与 cleanup partial，其余 answered | 候选新 edition，待复核 |

**发布：**`delivery=pr`，未运行 `pnpm ahw publish`、未切换本地指针、未执行 harness-binary。**受管二进制：**worker 与 `delivery=pr` 不执行。

## 待处理与独立复核

**审计记录：**`audits/mistral-vibe/audit-mistral-vibe-470a3a59-d0b7-455f-bdd8-058e31caccfb.yaml`。**待处理旧审计：**`audit-mistral-vibe-21f18606-7f25-4fce-a084-57d2004339d2`、`audit-mistral-vibe-a1dfa350-8732-4527-893f-bc2f5f0ad076`（`pending_audit_refs` 原样保留）。**待复核问题：**本轮自主结论均已结案（`pending_question_ids: []`），但审计引用了未完成旧审计，且新 edition 尚未通过独立复核，故 `review_status` 保持 `pending`，不写 `reviewed_by`/`reviewed_at`。

已发生的独立复核：`rev2-mistral-vibe` 返回 `changes_requested`；逐问题 verdict 除 `config.defaults` 与 `mcp.entry` 为 `corrected`、`agents.limits` 为 `rejected` 外，其余全部 `upheld`。触发的复核条件仍是跨主题加载机制改变（配置九层栈含模型目录、hook 执行迁入 harness、会话存储写入者与次版本变更）与同提交插件命名空间冲突。

修订已应用：`agents.limits` 改写为真实上限并新增三个引用；`ref-mv-301-legacy-import` 与全部 `ref-mv-301-*` 摘录按 pinned workspace 逐字重取、locator 收紧；configuration impact 补齐问题与小节；`auto_compact_threshold` 优先级改正；mcp 前言删除 `--legacy-harness`；transcripts 开头拆分 `messages.jsonl` 与 `meta.json`；补写本报告；八个文档来源记为待办来源项。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-mistral-vibe-repo` | `4ae5c5955da8…` → `dd2c04ce717c…` | changed；八主题均有机制级变化，见上节 |
| `source-mistral-vibe-docs-agents` | `087fa322eb4f…` → `28495614ee27…` | changed；原件未归档，记待办来源项 |
| `source-mistral-vibe-docs-api-keys` | `926431a0e275…` → `75f588a08b05…` | changed；原件未归档，记待办来源项 |
| `source-mistral-vibe-docs-configuration` | `6dcf543b738d…` → `ab1722a29882…` | changed；原件未归档，记待办来源项 |
| `source-mistral-vibe-docs-configuration-reference` | `d4c6981b051a…` → `b09e575dd34c…` | changed；原件未归档，记待办来源项 |
| `source-mistral-vibe-docs-hooks` | `1693ed841513…` → `cc82106acc63…` | changed；原件未归档，记待办来源项 |
| `source-mistral-vibe-docs-mcp-servers` | `6cbb4e5628bb…` → `8df363d6c48b…` | changed；原件未归档，记待办来源项 |
| `source-mistral-vibe-docs-safety` | `1b1bc3c91f44…` → `41f9e3692e0f…` | changed；原件未归档，记待办来源项 |
| `source-mistral-vibe-docs-skills` | `a87ce0619d88…` → `1d88b8610113…` | changed；原件未归档，记待办来源项 |

## 验证与差异入口

```sh
pnpm -s maintenance:candidates check --candidate /tmp/ahw-monitor-4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns/batch-20261022/candidates/mistral-vibe
```

结果通过（返回产品与文件清单）。摘录保真另用只读核对：80 条既有 `ref-mv-301-*` 加 6 条新增引用，共 86 条；`file_lines` 记录的每个摘录块都能在 `locator` 行区间内逐字命中，四个 `document_section` 记录的摘录都能在内置插件作者指南的对应小节内逐字命中，且全部 ≤800 字符（schema 上限）。

`ref-mv-301-*` 引用与章节位于 `knowledge/mistral-vibe/references/` 与 `knowledge/mistral-vibe/chapters/`；差异可用 `git diff --no-index <baseline> <candidate>` 或直接对比候选与项目根同名文件查看。
