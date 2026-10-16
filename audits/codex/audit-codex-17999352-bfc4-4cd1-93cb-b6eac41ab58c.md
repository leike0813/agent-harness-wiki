# Codex 上游审阅报告 · 2026-10-14

## 给维护者的结论

本轮源码基线 `efa159f7..1f7fe9b0` 影响已发布的 hooks、skills、native_plugins 三章，每章各出一个新版本（v3），旧版本保留。三个主题各自命中一处机制级变化，其中两处与协调者的初始 triage 结论不同，按实测更正：

- **skills 的长度上限没有被删除，而是换了执行层。** triage 记为"删除 `MAX_DESCRIPTION_LEN` / `MAX_DEPENDENCY_*`"。逐常量在固定提交全树检索后确认，这些常量搬进了本轮新建的 `codex-skills` 共享元数据模块，取值逐项相同（TYPE/TRANSPORT 64；VALUE/DESCRIPTION/COMMAND 1024），同 commit 内宿主加载器改为调用共享的 `parse_skill_metadata` 并移除了自己的 `serde_yaml` 依赖。若按"删除"结案，读者会得到"约束已放宽"的错误结论。
- **native_plugins 新增的是一条覆盖规则，不只是一个新条目。** `visualize@openai-curated-remote` 存在时配置层的 `visualize@openai-bundled` 被移除，与既有 `sites` 同构。可观察后果是：**配置里显式写出的 `visualize@openai-bundled` 会被静默丢弃**，"已配置"在这对组合下不等于"会加载"。
- **hooks 的注入上下文新增来源归因。** 注入模型的 hook 附加上下文由裸字符串改为带来源归因的结构：`HookContext` 携带 `text` 与 `metadata`，command 处理器的归因固定为 `command_hook()`，MCP tool 处理器的归因记工具命名空间。异步排空路径会重建上下文并填入 `command_hook()`，这是因为承载结果的 `HookOutputEntry` 只有 `kind` 与 `text`、不携带 metadata；该重建与处理器运行时归因等价，不存在归因丢失（详见下文更正记录）。

另有两点值得知道：skills 官方文档本轮内容变化，新观察内容未落盘因而无法逐段 diff，但基线原件在权威 archive 下可得，五个文档侧问题的恢复条件因此是具体的；hooks 与 skills 本轮共享同一套归因机制，属跨主题关键加载机制变化，按契约交独立复核，不由作者自审。

### 本次复核的两处更正

初稿有两处陈述性错误，均由独立复核指出并已由本 worker 自行复核确认后改正：

1. **异步路径的"归因丢失"结论不可达。** 初稿称 MCP tool 处理器在后台路径会丢失 `tool(namespace)` 归因。实际是：进入异步结果通道的只有 `async` 为真的 `command` 处理器——异步调度在 `mcp_tool` 处直接返回（`hooks/src/engine/command_runner.rs:134`），以 executor 作用域运行的处理器走 `dispatcher.rs:128-133` → `schedule_async_task`，不发往该通道；且 `HookOutputEntry`（`protocol/src/protocol.rs:1777-1780`）只有 `kind` 与 `text`，本就没有 metadata 字段可丢。硬编码因此是行为等价的实现事实，已删除"对比/丢失"表述并补两条引用。
2. **skills 文档的阻塞原因写错。** 初稿称"archive 下不存在该来源原件"——那是因为只查了工作树 `archive/`，而它是 `.gitignore` 的部分扫描史树；权威 archive 在原项目根。基线原件确实存在（sha256 与基线一致），真正的阻塞点只是新观察内容本轮未落盘。

## 变化的意义与证据边界

### skills：长度上限换层执行，约束未变（skills.extensions）

`codex-rs/ext/skills/src/loader/mod.rs` 在本轮删除了与 `SKILLS_METADATA_DIR` 同组的六个长度常量。该文件的 diff 单独看确实像"删除"，但全树检索显示同值的常量出现在本轮新建的 `codex-rs/skills/src/metadata.rs`，且宿主侧 `ext/skills/src/loader/metadata.rs` 改为调用 `codex_skills::parse_skill_metadata`，`ext/skills/Cargo.toml` 移除了 `serde_yaml`。

结论：`agents/openai.yaml` 的依赖字段长度约束**没有放宽也没有收紧**，改变的是执行层。可观察行为不变；架构上同一份 `openai.yaml` 在宿主与执行器两侧现在走同一套解析与校验。

未验证：来源未给出"某字段超长"时的具体报错文本或降级表现，因此正文只陈述约束归属，未推断用户可见的错误形态。[@ref-codex-cli-skills-shared-metadata-source][@ref-codex-cli-skills-metadata-parse-entry-source][@ref-codex-cli-skills-host-metadata-delegate-source][@ref-codex-cli-skills-loader-constants-source]

### skills：新增惰性发现字段（skills.discovery）

技能目录列表查询新增 `executor_capability_discovery_v2`，源码注释写明"惰性的 V2 清单；未提供时为空，既有发现不变"；配套开关 `executor_capability_discovery_v2` 的 stage 为 `UnderDevelopment`、`default_enabled` 为 `false`。默认配置下该字段恒为空，技能发现行为不变。这是"新增但不改变现状"，正文显式写出以免读者误以为发现路径已变。[@ref-codex-cli-skills-discovery-v2-inert-source][@ref-codex-cli-skills-capability-v2-feature-source]

### hooks：注入上下文带来源归因，且同步/异步不一致（hooks.output、hooks.order）

`additional_contexts` 由 `Vec<String>` 改为携带归因的结构。沿字段追到完整链条：`HookContext`（text + metadata）→ `append_additional_context` 保存 metadata → command 处理器 `context_metadata` 固定为 command-hook 归因 → `HookAdditionalContext::content_metadata()` 直接返回该 metadata → provenance 枚举中 `Harness { hook }` 的注释明确区分 command-hook 输出与内置上下文。

需要说明的一处实现事实：`drain_async_hook_results` 在取出异步条目后**重新构造**上下文并把归因填为 `command_hook()`。原因是承载通道的 `HookOutputEntry` 只有 `kind` 与 `text` 两个字段、不携带 metadata，排空时只能重建。这不构成归因损失：能进入该通道的只有 `async` 为真的 `command` 处理器（`mcp_tool` 在异步调度中直接返回，executor 作用域处理器走另一条路径），而 command 处理器的运行时归因本就是 `command_hook()`，两者等价。未验证：来源未把该调度分支写成独立说明，结论由调用关系逐段核对得出。

输出状态维持 `partial`：除注入归因外，退出码/返回值如何阻断操作的语义在 Hooks 指南内，不在本 change 的固定来源内。[@ref-codex-cli-hooks-context-attribution-source][@ref-codex-cli-hooks-append-context-metadata-source][@ref-codex-cli-hooks-command-runner-metadata-source][@ref-codex-cli-hooks-harness-fragment-metadata-source][@ref-codex-cli-hooks-provenance-source][@ref-codex-cli-hooks-async-context-metadata-source]

### native_plugins：bundled 条目被远端缓存安装覆盖（plugins.discovery）

远程全局目录生效时，合并函数先按名移除 bundled 条目再合并远端配置。新增的是 `visualize` 一对，既有 `sites` 一对在同一分支。二者的注释解释动机是旧版桌面客户端仍可能把 bundled 插件同步到独立更新的 SSH app-server，因此即使远端安装处于禁用状态也优先采用。[@ref-codex-cli-plugins-bundled-override-source]

### 扩展判定：源码 HEAD 之外的边界

本轮新增的 `PluginListQuery.snapshots` 与 skills 的同名字段都是**惰性输入**（注释写明云端列举时为空 / 既有发现不变），不构成插件或技能行为变化，正文按此表述。归因机制（`ContentItemMetadata`）对模型可见内容、审批与信任判断的下游效果，全部来源未给出，三章均标为未验证而非推断。npm 版本仍为 0.162.1 未变，所有结论只陈述源码树范围，不绑定发行包行为。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| hooks | codex-cli-hooks-v3 | hooks.output：partial（新增注入归因）；hooks.order：partial（新增同步/异步归因差异）；hooks.input：partial（未变）；其余 answered/partial 未变 | 新版本留在候选，等待独立复核 |
| skills | codex-cli-skills-v3 | skills.extensions：answered（更正"上限删除"为"换层执行"）；skills.discovery：answered（新增惰性字段）；skills.loading：answered（新增清单归因）；skills.roots/format/invocation/conditions/diagnostics 维持原状态并转 pending | 新版本留在候选；文档侧五问 pending |
| native_plugins | codex-cli-native_plugins-v3 | plugins.discovery：answered（新增 bundled 覆盖规则）；plugins.api：answered（新增惰性输入）；其余 partial 未变 | 新版本留在候选，等待独立复核 |

**发布：** 无。`delivery=pr`，本 worker 不运行 `pnpm ahw publish`，不切换 `registry/chapter-current.yaml` 的选章指针；三个 v3 版本均为未发布的新 edition，旧版本 v2 原样保留。**受管二进制：** 未触发（worker 与 PR 模式不执行 `harness-binary`）。

## 待处理与独立复核

**审计记录：** `audits/codex/audit-codex-17999352-bfc4-4cd1-93cb-b6eac41ab58c.yaml`。**待处理旧审计：** `audit-codex-1e99ac2e-274d-4179-a6bc-5d7c8dd49f35`、`audit-codex-911e2546-2762-49cf-a33c-2e59c98062b9`，本轮未结案，审计保持 `pending_audit_refs` 与 `review_status: pending`。

**待复核问题：** `hooks.output`、`hooks.order`（注入归因机制；异步排空重建归因的实现事实与"仅 command 处理器可进入该通道"这一等价性结论）、`skills.extensions`、`skills.discovery`（跨主题加载机制：hooks 与 skills 本轮共享 `ContentItemMetadata` 归因，skills 的元数据解析从加载器上移到共享 crate）。触发原因为跨主题关键加载机制变化，按维护契约由独立 reviewer 复核，不由作者自审；`native_plugins` 的 `plugins.discovery` 因与 skills 的同名字段共享惰性机制，一并纳入同一复核范围。本版已按首轮复核意见改正两处陈述性错误，现返回 `agent://CodexReview` 复审。

**pending 问题：** `skills.roots`、`skills.format`、`skills.invocation`、`skills.conditions`、`skills.diagnostics` —— 官方 Build skills 文档的新观察内容本轮未落盘，无法 diff。基线原件已读通（229 行），段落与问题的对应关系明确，**恢复条件因此是具体的**：保留 `ed6e324f…` 原件后，只需 diff 六段即可判定——技能位置表与扫描规则（"Where Codex loads local skills"）、SKILL.md 格式（"Create a skill"）、显式/隐式调用（"How ChatGPT and Codex use skills"）、启停配置（"Enable or disable local Codex skills"）、`openai.yaml` 字段（"Optional metadata"）、初始清单 2% 预算与截断警告（开头段落）。小节归属为 `skills-discovery-roots`、`skills-skill-md`、`skills-invocation`、`skills-diagnostics`。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-codex-repo | efa159f7aa3fcdb23a2f3aaf1f6f1249376bffc7 → 1f7fe9b0afb301f895b2d56ae8c05c2cfb19e440 | changed；395 个改动文件。逐个读 diff 后判定：四处机制级变化进入结论，见上；`config/src/types.rs` 与 `core/src/config/mod.rs` 经核对只是 `tui.copy_on_select` 文案从 transcript/footer 扩到 composer，无字段、路径、加载顺序或条件变化，按描述级排除，不因此打开 configuration 主题 |
| source-codex-cli-skills-doc-learn | d15791562748e… → ed6e324f747d… | changed，**新内容未能核对**：观察到的 ed6e324f… 本轮未落盘。基线原件在权威 archive（原项目根 `/home/joshua/Workspace/Code/JavaScript/agent-harness-wiki/archive/codex/`）下可得并已读通，sha256 与基线一致；按契约不重新扫描，故无法与新内容 diff。五个文档侧问题保持 pending，恢复条件见下 |
| source-codex-cli-mcp-doc-learn | adb28990c0c7… → ed03f227b54c… | changed，但 mcp 主题本轮不在派发范围，未打开 |
| source-codex-cli-configuration-doc-learn | ff9a198c4e39… → b3158464b335… | changed，但 configuration 主题本轮不在派发范围，未打开 |
| source-codex-cli-doc-learn | 36066e8647cf… → 36066e8647cf… | unchanged |
| source-codex-cli-npm | 0.162.1@sha512-NWZdi… → 0.162.1@sha512-NWZdi… | unchanged |

范围备注（交协调者判断，非本轮结论）：`cli/src/doctor.rs`、`rollout/src/list.rs`、`thread-store/src/local/rollout_lineage.rs` 本轮有改动但属 local_transcripts 主题，未派发；`exec-server-protocol/src/protocol.rs` 与 `protocol/src/protocol.rs` 只改文档注释并新增 `ConversationStartParams.voice_session_id`（Realtime 语音会话标识），按无知识影响排除。

## 验证与差异入口

`pnpm maintenance:candidates check --candidate var/harness-monitor/batch-d04f3514/candidates/codex` 通过。过程中的真实失败已修复，未放宽检查：章节正文的 `<...>` 泛型写法与 `data:` 子串触发 `CHAPTER_UNSAFE_MARKUP`，已改写措辞；pending 问题缺少对应 impact 触发 `Pending question lacks audit impact`，已补 skills 文档侧 impact；本轮更正中一度在 YAML 双引号字符串内写入未转义引号导致该文件不可解析，已改为单引号标量并复验可解析。基线预检确认 `COVERAGE_INCOMPLETE` 警告在未改动的 baseline 上同样存在，非本轮引入。

新增 18 条引用的 excerpt 已逐条在固定提交的对应文件内容中做字面子串校验，全部命中；所有新记录均为 `git_source_file`（commit + 仓库相对路径 + `content_sha256`），无临时路径。此前章节引用的 13 个 locator 全部在 1f7fe9b0 重新定位成功，属定位未失效，未改写。复核指出的行号偏差（`ref-codex-cli-hooks-runtime-context-type-source` 72-78 → 76-79）已用 `awk` 复核结构体边界后更正。

未运行：`pnpm knowledge:validate`、`pnpm verify`、online 构建与 publish —— 属协调者集成后的聚合闸门，PR 模式下不由 worker 执行。

查看本轮改动：

```sh
diff -ru var/harness-monitor/batch-d04f3514/baseline/codex \
        var/harness-monitor/batch-d04f3514/candidates/codex
```
