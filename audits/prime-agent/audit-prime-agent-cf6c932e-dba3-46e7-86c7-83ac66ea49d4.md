# prime-agent 巡检维护报告（audit-prime-agent-cf6c932e-dba3-46e7-86c7-83ac66ea49d4）

## 观察到的来源变化

`source-prime-agent-repo`（`https://github.com/PrimeIntellect-ai/prime-agent.git`）由基线 `2ee7e623a70d8ccd9c72ffc6c4f25be2cc1bc02d` 变为观察提交 `e41c9c4c6ccabf700f1dfdc1653e7ef9c5e96312`（`refs/heads/main`，100 个变更路径）。本轮只读工作区：`ws-e41c9c4c6cca-5718024f-eb78-4c4a-baa7-4395658b1791`。全部结论用 `git -C <ws> diff 2ee7e623a70d e41c9c4c -- <path>` 与工作区实际字节核对，**没有运行任何二进制**；因此结论按来源级知识（`version_applicability: unknown`）记录，不新建软件版本映射。

## 写入章节的实质变更

### 1. configuration：随包 `model-prompts` 层不再是空的

`crates/pa-core/src/prompts/layers/model_prompts.toml` 在本提交去掉了注释里的示例，换成一条真实规则；`crates/pa-core/src/prompts/model_prompts.rs` 的 `MODEL_PROMPT_FILES` 由空表变成带一条内嵌文件；新增 `crates/pa-core/src/prompts/layers/bash-over-subprocess.md` 并由 `include_str!` 编进二进制。

- 随包规则：`match = ["glm-5.3*"]` → `files = ["bash-over-subprocess.md"]`；按选择器尾部段 glob 匹配，`z-ai/glm-5.3` 与 `prime-inference/internal/glm-5.3-fast` 都命中，其它模型为空。
- 该 markdown 是一段行为指令：不要经 `subprocess`/`os.system`/其包装跑 shell，一律 `h = bash(cmd)` 发起、后续 `ipython` 调用里 `await h` 取 `r.output`/`r.exit_code`，只有预计一秒内完成的命令才允许就地 await。
- 两层顺序、命中后按首次出现位置去重拼接、同名文件以用户层为准、`deny_unknown_fields` 与路径约束、任一层出错则全部追加失效——这些机制本提交**未变**，继续沿用原引用。

已发布的 `prime-agent-cli-configuration-v4` §config-sources 断言“随包层只有注释、内嵌文件表为空、实质规则全部来自用户自己的文件”，在本提交上不再成立。新版本 `prime-agent-cli-configuration-v5`，只改 §config-sources 与 `config.sources`；同节表格里 `model-prompts.toml` 的“缺失即无追加”也随之改成“缺失只是没有用户层规则”。

### 2. custom_agents：“没有 daemon”与“不能派生子 Agent”不再是同一个条件

`crates/pa-core/src/session_engine/engine.rs` 新增 `SessionEngineConfig.daemonless` 字段（注释写明由 embedding 显式设定：print 会话无论有没有内联子 Agent 宿主都是 daemonless，daemon worker 不是），并在组装系统提示时把原来的单一条件拆成两行：

- `daemonless: config.daemonless`（宿主声明）
- `can_spawn: config.rlm_subagent_host.is_some()`（有没有 RLM 子 Agent 宿主）

`crates/pa-core/src/prompts/system_prompt.rs` 的 `session_role_section` 相应分成两行提示：`can_spawn` 为真时写“没有 daemon：心跳不触发、后台 `bash()` 完成不会唤醒你，但子 Agent 回复与退出通知仍会唤醒，运行会等子 Agent 结束”；为假时写“没有 daemon：`rlm.spawn` 不可用、心跳不触发、后台 `bash()` 完成不会唤醒你”。`crates/pa-cli/src/print_runtime.rs` 证明 print 运行时同时传 `daemonless: true` 与 `rlm_subagent_host`，且 `HeadlessEmbedding::Root`/`Child` 会拿到内联子 Agent 宿主（只有 `Rpc` 没有）——也就是 print 会话“无 daemon 但仍能派生”。

已发布的 `prime-agent-cli-custom_agents-v3` §agents-roles 与 §agents-overrides-limits 把两者当同一个条件，并逐字引用了上一提交的那一行提示。新版本 `prime-agent-cli-custom_agents-v4`，只改这两个小节与 `agents.roles`、`agents.limits`；`agents-entry`、`agents-invocation`、`agents-diagnostics` 原样保留锚点与引用。

## 明确排除的变更与理由

| 变更 | 处理 | 理由 |
| --- | --- | --- |
| `crates/pa-daemon/src/rlm_ledger.rs` | 不改 `local_transcripts` | 已发布的 `prime-agent-local_transcripts-v2` 只断言 `rlm_ledger_path()` 的 `{agent-dir}/rlm-ledger/{hash}.jsonl` 布局，未变。本提交是把回放逻辑抽成 `resolve_live_edges`/`fold_records`/`read_records` 并新增只折叠某个父会话自己子 Agent 的 `live_edges_of_parent()`，属内部实现与新 API，本章没有对应问题可推翻。 |
| `crates/pa-daemon/src/worker/create.rs` | 不改 `local_transcripts` | 该文件只把 `reseed_rlm_children()` 收进 `if opened_existing_session`（新建会话不再全量扫描账本），不影响本章引用的“续接已存在会话时先取租约再修复”的顺序。 |
| `crates/pa-types/src/ai/mod.rs`（新增 `PYTHON_TOOL_NAME = "python_repl"` 与 `is_python_tool_name`，兼容 `python_repl`/`python`/`ipython`） | 本轮三章不动 | configuration 与 custom_agents 正文都不提该工具名。但同一改名波及 `prime-agent-cli-skills-v1`（“模型用 `ipython` 工具读取完整 `SKILL.md`”）与 `prime-agent-cli-native_plugins-v1`（“同名可覆盖内置 `ipython`/`bash`/`edit`”），这两个主题不在本任务范围内，按 worker 契约不自行扩范围，留给协调者决定是否另派。 |
| `crates/pa-core/src/session_engine/rlm_host.rs` | 不改 custom_agents | 只是把既有错误文本（`rlm.create_session requires a daemon-backed depth-0 session`、名称占用、深度上限）与默认深度 2 抽成共享 helper；已在基线与观察提交两边逐字比对，文本未变。 |
| scanner 给出的 `custom_providers`、`hooks`、`mcp`、`native_plugins`、`skills`、`local_transcripts` 与 configuration/custom_agents 其余问题 | 全部排除 | scanner 的 `impacts` 与 `pending_question_ids` 是“共享或未知影响”的候选线索（63 条 pending 全是这层噪声）。本轮只按实际差异取证，纳入范围见上；其余问题在 changed paths 里没有对应证据入口，不做无依据的改写。 |

## 本次交付与保留

| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `prime-agent-cli-configuration-v5` | `config.sources`: answered | 新建 edition，`registry/chapter-current.yaml` 指向 v5；v4 保留 |
| custom_agents | `prime-agent-cli-custom_agents-v4` | `agents.roles`: answered，`agents.limits`: answered | 新建 edition，`registry/chapter-current.yaml` 指向 v4；v3 保留 |
| local_transcripts | `prime-agent-local_transcripts-v2` | 无变化 | 保留旧版本与原来源范围 |

**发布：** 未发布。本轮为 `delivery=pr`，不切换本地指针、不运行 `pnpm ahw publish`、不处理受管二进制。**来源原件：** 新增 6 条 `git_source_file` artifact、6 条 `source_revision` snapshot、8 条 reference，全部钉在 `e41c9c4c6ccabf700f1dfdc1653e7ef9c5e96312`，`content_sha256` 由工作区字节计算；未把工作区路径写进任何记录，也未把源码复制进候选。已发布的旧引用（`ref-prime-agent-modelprompts-toml`、`ref-prime-agent-daemonless-role-rust`、`ref-prime-agent-daemonless-wiring-rust` 等）保持不变，只在新正文中作为“上一提交的行为”对照出现。

## 待处理与独立复核

**审计记录：** `audits/prime-agent/audit-prime-agent-cf6c932e-dba3-46e7-86c7-83ac66ea49d4.yaml`（`status: changed`，`review_status: pending`，`pending_question_ids: []`）。**待处理旧审计：** `audit-prime-agent-fe998a91-5291-4f0c-8bbc-45887d1f607b`、`audit-prime-agent-1f7dab30-5252-4281-99c4-6a1fb619a7c2`（两者自身仍是 `review_status: pending` 且没有 `reviewed_by`，因此本审计不能通过自标 `reviewed` 间接关闭它们）。**待复核问题：** 无——本轮没有来源冲突、没有推翻用户可照做的配置步骤、也没有跨主题的关键加载机制变更，按 `harness-maintenance` §5 不触发强制独立复核；如协调者认为“已发布断言被源码推翻”本身需要二次核对，可对 `agents.roles`、`agents.limits`、`config.sources` 追加只读复核。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-prime-agent-repo`（`https://github.com/PrimeIntellect-ai/prime-agent.git`） | `2ee7e623a70d8ccd9c72ffc6c4f25be2cc1bc02d` → `e41c9c4c6ccabf700f1dfdc1653e7ef9c5e96312` | changed，无来源失败。本轮引用的 7 个文件逐个核对：`layers/model_prompts.toml`、`prompts/model_prompts.rs`（内嵌文件表）、`session_engine/engine.rs`（daemonless/can_spawn 拆分）有语义变化并已据此改章；`worker/create.rs` 有语义变化但本章引用不受影响；`prompts/system_prompt.rs`、`pa-daemon/src/rlm_ledger.rs` 的被引行区间在新提交上位移（旧引用仍绑定旧提交、在其提交内有效，本轮另立新 ID 指向新提交）；`pa-types/src/ai/mod.rs` 只新增常量 |

## 验证与差异入口

```sh
pnpm maintenance:candidates check --candidate /tmp/ahw-batch-1791831061/candidates/prime-agent
```

通过（返回 `{harness_id: "prime-agent", files: [...]}`）。未运行 `pnpm verify` 等聚合闸门——按本轮契约由协调者在集成后统一运行一次。本轮改动入口：`knowledge/prime-agent/chapters/prime-agent-cli-custom_agents-v4.md`、`knowledge/prime-agent/chapters/prime-agent-cli-configuration-v5.md`、`registry/chapter-current.yaml`、`audits/prime-agent/audit-prime-agent-cf6c932e-dba3-46e7-86c7-83ac66ea49d4.yaml`，以及新增的 6 artifact / 6 snapshot / 8 reference 记录。
