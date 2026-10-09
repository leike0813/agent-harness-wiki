# deep-agents 维护报告 · audit-deep-agents-dc1867db-c051-4d1c-b2d6-3069a54268cd

## 来源身份变化

| 来源 | 基线 | 观察值 | 结论 |
|---|---|---|---|
| source-deep-agents-repo | `e6f59d00ea459d8797dd8d9eb23d8c0960cfd427` | `bfd9f22fc558d5e90c809cf3beccb64aa69f3556` | changed（158 文件） |
| 其余 12 个官方文档来源 | — | — | 本轮未改；memory-and-skills、providers、subagents、credentials、extensions 为 unchanged |

固定读取工作区：`ws-bfd9f22fc558-58af8f7b-4afb-4371-8363-94f13810abee`（pinned workspace，只读）。

## 语义 triage

本轮任务范围为 `skills` 与 `custom_providers` 两个主题，五道固定问题。提交内的相关改动集中在两处入口：

1. **`libs/deepagents/deepagents/middleware/skills.py`（+146/-8）** — 新增 `pinned_skills` 状态键与 `_append_skill_names` 归约，配合 `before_model`/`abefore_model` 钩子。同一提交内 `_skill_tools.py` 的 `_find_skill_reads`、`subagents.py` 的排除键集合、`graph.py` 的子代理 `SkillsMiddleware` 槽位解析同步调整。
2. **`libs/code/deepagents_code/config.py` + `model_config.py`** — 新增 `ANTHROPIC_MODEL_PROFILE_FALLBACKS`，在发现期合并进 Anthropic 档案、在 `create_model` 中于 config.toml 覆盖之前施加兜底层。

## 受影响问题与理由

| 主题 | 问题 | 界面 | 处置 |
|---|---|---|---|
| skills | skills.loading / skills.invocation / skills.conditions | sdk | 新增 `{#skills-pinning}` 小节，逐条回答固定机制 |
| skills | 同上 | cli | **答案不变**：见下方"排除依据" |
| custom_providers | providers.models / providers.metadata | cli | 更新既有小节正文，答案仍为 answered |

### skills 的界面判定

`pinned_skills` 是 `deepagents` 包 `SkillsMiddleware` 的状态键。对 `libs/code` 全仓检索 `pinned_skill` 无任何命中（仅 `openwiki/` 下上游自带文档提及，已按任务排除）；`dcode` 的 `/skill:` 命令在 `app.py` 中调用 `build_skill_invocation_envelope` 包装提示，与固定提交 `f57c6f3` 的已发布答案一致。因此 CLI 用户在本提交无法触发该机制，cli 界面的三道题保持原答案与原引用，新增内容只以 **sdk** 答案写入。这同时避免了把 SDK 能力误记成 CLI 能力。

### custom_providers 的顺序语义

兜底层插在 `create_model` 中 `_set_configured_model_metadata` 之后、`config.get_profile_overrides` 之前，因此最终优先级为：模型自带 profile < bundled fallback（仅填补上游缺失键）< config.toml profile < `--profile-override`。合并方向 `{**fallback, **upstream}` 决定了上游胜出；该层不经 `_build_entry`，故不进入 `ModelProfileEntry.overridden_keys`。

发现期是另一条独立路径：`_load_provider_profiles` 在模块恰为 `langchain_anthropic.data._profiles` 时以 `{**FALLBACKS, **profiles}` 合并，包档案优先。两条路径共同解释了为什么 `claude-haiku-5-5` 在上游包尚未收录时仍出现在 `/model` 清单并带上完整能力元数据。

## 排除依据

同一提交内以下改动**不在本任务范围**，未调查、未改写章节：新增 `terminal.tab_title` 配置项与 `DEFAULT_TERMINAL_TAB_TITLE`（configuration 主题）、`/rename` 斜杠命令（custom_agents 主题）、`threads.auto_rename` / `threads.rename_model`（configuration 主题）、`thread_titles.py`、`sessions.py`、`app.py` 的线程命名与工具显示改动（local_transcripts 主题）。`openwiki/` 下 158 个上游文档文件未被任何已登记章节引用，按任务排除。

## 证据

本轮新建 6 个 `git_source_file` artifact 与对应 `source_revision` snapshot（commit `bfd9f22f…`，逐文件 sha256），以及 14 个新 reference：`ref-deep-agents-skills-pin-{reducer,state,usage,resolve,body,message,update,hook,tool-disclosure,subagent-scope,subagent-sources}`、`ref-deep-agents-providers-anthropic-fallback-{s,discovery,apply}`。全部只记 commit、仓库相对路径与内容 hash，未写入工作区临时路径，未复制 checkout。

## 候选与复核

- 新建章节版本：`deep-agents-cli-skills-v3`（新增 `{#skills-pinning}`，`skills.loading`/`skills.invocation`/`skills.conditions` 增加 sdk 答案）、`deep-agents-cli-custom_providers-v3`（更新 `{#providers-models}` 与 `{#providers-metadata}`）。
- `registry/chapter-current.yaml` 的 skills 与 custom_providers 选择指向新版本；旧版本文件保持不变。
- 未新增 mappings：固定来源为源码提交，不能证明任何已发布 npm 版本的行为。
- 本轮为普通增量维护，不涉及来源冲突或跨主题关键加载入口变更，未触发独立复核门槛；`review_status` 保持 `pending`（仍引用两个未结案的旧审计，且本轮不写 `reviewed_by`/`reviewed_at`）。

## Blocker

无。两道主题的全部范围内问题均已回答。