# Zed 上游审阅报告 · 2026-10-04

## 给维护者的结论

Zed 仓库来源本轮从 `5d80b4e` 前进到 `a846890`，其中三处变化会改变读者手上的配置写法：Copilot 企业实例端点从 `edit_predictions.copilot.enterprise_uri` 搬到了新的顶层 `copilot` 对象；AWS Bedrock 的 `available_models` 换掉了 `mode`、改用 `supports_tools`／`supports_images`／`thinking` 三个新字段；扩展清单的语言服务器条目多了 `opt_in_languages`，可以让扩展只对指定语言默认启用 LSP。已发布章节没有被推翻——v1 三个主题都没有记载过 `enterprise_uri` 的键位，也没有断言 Bedrock 的模型字段或扩展清单条目的内部字段——所以这轮是补充与限定，不是纠错。skills、hooks、mcp、custom_agents 四章的引用结论逐个核过补丁后仍成立，保留原版本。

剩下的风险只有一处：`opt_in_languages` 目前只有仓库内源码（`crates/extension/src/extension_manifest.rs`）这一处依据，官方文档站页面本轮 hash 未变、尚未收录该字段，仓库内文档页也未描述它；因此 `plugins.package` 的状态记为 `partial`。Copilot 端点那条**不是**风险：迁移 `m_2026_09_29` 的源路径与旧键位置精确对应，属于有配套迁移的键位改名，唯一未验证的只是迁移的触发时机。

## 变化的意义与证据边界

### Copilot 企业端点换了键位（custom_providers / configuration）

新提交在默认设置里新增顶层 `"copilot": { "enterprise_uri": null }`，注释写明是「Copilot Chat 与编辑预测共用」；运行时由新增的 `settings::CopilotSettings` 读取，它实现 `Settings` 并从 `SettingsContent.copilot` 取值。这个键改名前一直写在 `edit_predictions.copilot` 下；新提交里那一块保留的是代理与编辑预测自身相关字段（`proxy`、`proxy_no_verify`、`enable_next_edit_suggestions`、`prediction_debounce`），企业端点随顶层对象一起搬走。`language_models` 下从来没有 `copilot` 段。

搬运由新增迁移 `m_2026_09_29::move_copilot_enterprise_uri` 承担，按 `MigrationType::Json` 注册，经 `migrate_settings` 对根对象、发行渠道覆盖键、平台覆盖键与每个命名 profile 各执行一次，目标位置用 `or_insert` 写入因而不覆盖已写值。迁移的源路径 `edit_predictions.copilot.enterprise_uri` 与旧键位置精确对应，因此这是一次有配套迁移的键位改名，不构成来源冲突。

影响 `providers.entry`（provider 端点不一定在 `language_models` 下）与 `config.migration`（键改名类迁移的作用范围）。引用能证明设置结构、迁移函数签名与覆盖范围；证明不了的只有迁移的触发时机（启动、升级或用户确认），这一点已作为未验证写进章节正文。

### Bedrock 模型字段换了一套（custom_providers）

`BedrockAvailableModel` 去掉 `mode`，新增 `supports_tools`、`supports_images` 与 `thinking`；`thinking` 是无 tag 枚举，可以是布尔值，也可以是带 `adaptive`、`has_xhigh`、`budget_tokens` 的对象。官方文档同批新增 «Custom Bedrock Models» 一节，说明用 `available_models` 补内置之外的模型、`name` 写完整模型 ID（含地理前缀或 ARN），并要求对拒绝 `temperature` 字段的模型不设 `default_temperature`。

影响 `providers.models`、`providers.metadata` 与 `providers.forwarding`。这与已发布的兼容端点结论并列而非冲突：兼容端点的能力位收在 `capabilities` 子对象里，Bedrock 的能力位是模型条目上的平铺字段，两种写法不能互换。Bedrock 能力位如何改变实际请求，本轮只核到设置结构与文档说明，没有运行观测。

### 扩展清单的按语言 opt-in 语言服务器（native_plugins）

`LanguageServerManifestEntry` 新增 `opt_in_languages` 语言名集合，注释为「除非用户在 `language_servers` 设置里显式列出，否则不启动该语言服务器」，缺省为空集合；宿主侧由 `opt_in_languages()` 与 `is_opt_in_for()` 读取。同时新增 `SchemaVersion::CURRENT = 1`，并留下一组在 `CURRENT` 抬高后才开始断言的「下一版 schema」前置测试，因此 `schema_version = 1` 仍是当前格式，清单格式的破坏性变更尚未生效。

影响 `plugins.package` 与 `plugins.discovery`。仓库内文档另新增画廊自动分类说明（分类按扩展声明的功能自动派生，一个扩展可出现在多个分类）与发布前置条件说明。`opt_in_languages` 只有仓库内源码一处依据，官方文档站 `developing-extensions` 页面本轮未变、尚未收录该字段，仓库内 `docs/src/extensions/developing-extensions.md` 也未描述它，因此 `plugins.package` 记为 `partial`，缺口已写进章节正文。

### 未受影响的主题与一处记录冲突核对

skills、hooks、mcp 三章引用的多数机制文件未出现在 `changed_paths` 中；`crates/agent_skills/agent_skills.rs` 只有注释改动，`crates/task`、`crates/paths`、`crates/context_server`、`crates/prompt_store`、`crates/agent_settings` 全部未变。需要说明的是 `crates/agent/src/agent.rs`（+5/-2，ACP 包装相关）、`crates/settings_content/src/agent.rs` 与 `crates/settings_content/src/project.rs` 确实在变更集内，前者还被 skills 章节的 5 条引用覆盖；逐个核对了这三个文件的 patch，改动 hunk 未触及章节所引用的行区间，因此判定无读者可见变化。

custom_agents 逐个核对了引用文件：`crates/agent_servers/src/custom.rs` 与 `agent_servers.rs` 的改动是把 `acp_schema::v1` 的类型别名换成 `acp_v2`（同一协议的 schema 版本），`agent_servers` 设置条目形状未变。

记录冲突核对：`ExtensionManifest` 的字段集合在两个提交之间逐字段比对完全一致；本次删除的 `AgentServerManifestEntry` 与 `TargetConfig` 并不是该结构体的字段（属未被清单引用的类型），因此已发布的「扩展能力由清单字段穷举」结论不受影响，删除也不构成能力移除。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | zed-zed-configuration-v2 | config.migration：answered（新增 m_2026_09_29 迁移与其覆盖范围；触发时机留作未验证） | 建议选为当前版本 |
| custom_providers | zed-zed-custom_providers-v2 | providers.entry：answered；providers.models：answered；providers.metadata：answered；providers.forwarding：answered | 建议选为当前版本 |
| native_plugins | zed-zed-native_plugins-v2 | plugins.package：partial（opt_in_languages 缺文档入口）；plugins.discovery：partial | 建议选为当前版本 |
| skills | zed-zed-skills-v1 | 全部保留原状态 | 保留旧版本：引用文件未变 |
| hooks | zed-zed-hooks-v1 | 全部保留原状态 | 保留旧版本：引用文件未变 |
| mcp | zed-zed-mcp-v1 | 全部保留原状态 | 保留旧版本：引用文件未变 |
| custom_agents | zed-zed-custom_agents-v1 | 全部保留原状态 | 保留旧版本：设置条目形状未变 |

**发布：** delivery=pr，本轮不切换本地发布指针、未运行 `ahw publish` / `chapters:update` / `managed:packages`，也未修改 `registry/chapter-current.yaml`；由父进程在聚合阶段统一选择当前版本。**受管二进制：** delivery=pr 轮次不进入 harness-binary 核对。

## 待处理与独立复核

**审计记录：** [audit-zed-d0a7dce9-cf57-4fbf-a94c-f5d0c84464ab.yaml](./audit-zed-d0a7dce9-cf57-4fbf-a94c-f5d0c84464ab.yaml)。**待处理旧审计：** 无（`pending_audit_refs` 为空）。**待复核问题：** `config.migration`（迁移触发时机未验证）与 `plugins.package`（`opt_in_languages` 缺文档入口，已降为 `partial`）——两项都写进了 `pending_question_ids`，审计的 `review_status` 保持 `pending`。

父进程委派的只读 verifier 已完成独立复核，结论为 PARTIAL：三类高影响条件（来源冲突、推翻已发布配置步骤、跨主题关键加载机制变化）都不成立；但本轮自报的两条结论有实质性事实错误并已传播到正文与审计——把 Copilot 端点的配套键位迁移写成来源冲突，以及把 `default.json` 1952-1957 行那块内容误标为 `language_models.copilot`（该键在任何提交里都不存在）。两处已按复核结论改正。`review_status` 不自行置 `reviewed`：本维护子代理没有原生 subagent 委派入口，复核由父进程委派完成，处置（是否接受 `plugins.package` 降级、是否结案）留给父进程。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-zed-repo | 5d80b4e784636899e209cae89626c3be4487e14f → a84689073d296dfd39987bc7dd478e43ef76d83a | changed；本轮自扫时 TLS 握手已恢复，内容有变化（三处主题相关改动） |
| source-zed-docs-skills | 764f294e… → 764f294e… | unchanged；内容无变化 |
| source-zed-docs-mcp | 4b63e486… → 4b63e486… | unchanged；内容无变化 |
| source-zed-docs-agents | 08b1b983… → 08b1b983… | unchanged；内容无变化 |
| source-zed-docs-providers | b164ec18… → b164ec18… | unchanged；内容无变化 |
| source-zed-docs-hooks | d7b3f034… → d7b3f034… | unchanged；内容无变化 |
| source-zed-docs-plugins | 146fa9b6… → 146fa9b6… | unchanged；内容无变化 |
| source-zed-docs-config | cd8932ca… → cd8932ca… | unchanged；内容无变化 |

来源状态与巡检输入文件不一致，如实记录：输入文件（`audit-zed-deff6c8f-…`）把 `source-zed-repo` 记为 blocked，失败原因为 `git ls-remote https://github.com/zed-industries/zed.git` 报 `gnutls_handshake() failed: The TLS connection was non-properly terminated`，整体 status=blocked；本代理自行运行 `pnpm sources:scan zed` 时该来源已恢复为 changed，其余七个文档来源 hash 与基线完全一致。任务说明里「8 个来源 blocked」与输入文件不符——输入文件只有 1 个 blocked。本轮因此没有仍在阻塞的来源。

## 验证与差异入口

`pnpm knowledge:validate` 通过（532 个章节版本，无 error）；输出中的 `COVERAGE_INCOMPLETE` 警告属于 codex、omp、opencode、pi 等其他产品的 coverage 记录，未改动。`pnpm sources:audit-log`、`git diff --check`、`git status --short --untracked-files=all` 均已运行，结果见交付回复。

本轮改动入口：三份章节 `knowledge/zed/chapters/zed-zed-{configuration,custom_providers,native_plugins}-v2.md`；九条新引用 `knowledge/zed/references/ref-zed-providers-copilot-*.yaml`、`ref-zed-providers-bedrock-available-model.yaml`、`ref-zed-providers-repo-doc-bedrock-models.yaml`、`ref-zed-config-copilot-enterprise-migration.yaml`、`ref-zed-plugins-manifest-opt-in-*.yaml`、`ref-zed-plugins-repo-doc-categories.yaml`；新原件与快照 `knowledge/zed/artifacts/artifact-zed-repo-20261003.yaml`、`knowledge/zed/snapshots/snapshot-zed-repo-20261003.yaml`。旧版本 v1 章节与旧快照 `snapshot-zed-repo` 一律保留未动。

```sh
git status --short --untracked-files=all -- knowledge/zed audits/zed
git diff -- knowledge/zed audits/zed
```
