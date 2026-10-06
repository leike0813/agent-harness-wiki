# claude-code 巡检与 local_transcripts 首采报告

- audit_id：`audit-claude-code-9fe2e58d-c70a-4aa0-977a-0684460b1936`
- 巡检时间：2026-10-06T04:33:06Z
- 上游：audit-claude-code-20261004t061205z
- delivery：pr（只交付知识与审计，不做本地发布）

## 来源身份

本轮没有使用任何源码工作区。claude-code 未登记 git 仓库来源，registry 中只有 npm 与三份官方文档来源，因此：

- `source-claude-code-npm`：2.1.289 → 2.1.291。受管包刷新属于 `harness-binary`，本轮不更新 npm 快照。
- `source-claude-code-configuration-doc`：`5d20e2c92742…`，原件 `archive/claude-code/artifact-source-claude-code-configuration-doc-5d20e2c92742/source.md`（https://code.claude.com/docs/en/settings.md）。
- `source-claude-code-mcp-doc`：`5ee6d143c3cf…`，原件 `archive/claude-code/artifact-source-claude-code-mcp-doc-5ee6d143c3cf/source.md`（https://code.claude.com/docs/en/mcp.md）。
- `source-claude-code-skills-doc`：`cf869f4c734b…`，原件 `archive/claude-code/artifact-source-claude-code-skills-doc-cf869f4c734b/source.md`（https://code.claude.com/docs/en/skills.md）。

sha256 全部由原件真实内容计算。三份页面均未标注适用版本，`version_applicability` 保持 unknown。

## triage 理由

巡检到三份文档同时变化，先按固定问题判断是否真的影响知识：MCP 页的输出限制、图片与后台任务章节给出了会话目录与持久化开关的具体表述，Skills 页的压缩与检查点边界给出了生命周期表述，设置页给出了配置目录可搬与 `.claude.json` 备份表述。这些表述此前没有被任何主题引用，因此判定为需要新建 `local_transcripts` 章节，而不是改写既有七章。本次改动只新增章节、引用与快照记录，不改动已发布的其它主题章节。

## 受影响与排除的题

十题全部实际调查，全部给出可用答案（允许 partial/unknown），因此不新增 `pending_question_ids`：

| 问题 | 状态 | 主要依据 |
|---|---|---|
| transcripts.scope | partial | MCP 输出上限写文件、50,000 字符门槛、图片原字节另存、`--no-session-persistence` / `CLAUDE_CODE_SKIP_PROMPT_HISTORY` 不写文件 |
| transcripts.location | partial | 会话 `tool-results` 目录在 `~/.claude/projects/` 下；`CLAUDE_CONFIG_DIR` 改存 settings、session history、plugins；Windows 为 `%USERPROFILE%\.claude` |
| transcripts.naming | unknown | 只确认目录名 `tool-results`；会话目录命名、时间戳、父/子与分支关系无证据 |
| transcripts.format | partial | 文本结果写文件、图片保存原始字节；会话正文编码与写入方式无陈述 |
| transcripts.schema | unknown | 三份页面无任何记录类型、字段或迁移规则 |
| transcripts.lifecycle | partial | 两分钟转后台、结果以任务通知到达、退出会话不存活；压缩后重挂载 5,000/25,000 tokens 预算；分叉 Skill 编辑在检查点之外 |
| transcripts.database | partial | 未出现数据库；`~/.claude.json` 保存登录会话、MCP 配置、每项目状态与全局配置键 |
| transcripts.archive | unknown | 无导出/归档开关陈述；官方备份只覆盖 `.claude.json` |
| transcripts.cleanup | partial | `.trash/` 加 retention sweep 模式与 30 天默认期限（仅限 Skill 文件）；会话文件的删除与手动删除后果无证据 |
| transcripts.diagnostics | partial | `/tasks`、`/status`、`claude doctor`、`.claude.json` 损坏处理；读取会话文件的入口未提供 |

排除面：只调查 `cli` 界面；桌面、Web、VS Code、JetBrains 未调查，未手工写 `not_investigated`。缓存、日志与遥测文件不逐项审计。

## 证据与未决缺口

共同缺口是 `/docs/en/claude-directory`（含 `cleaned-up-automatically` 与 `ce-claude-json` 锚点）未纳入本轮固定快照，CLI reference 与 env-vars 页同样缺失。三处引用都指向该页，这是三题记 unknown 的直接原因。

按证据纪律，未把“快照里没有”写成“不支持”，也未推出任何文件可以安全删除：尤其没有把 Skill 的 30 天回收期限外推到会话记录文件。

## 复核结果与 blocker

本轮为来源新增、无来源互斥、无已发布步骤被推翻，按普通更新自检结案，未触发第二 Agent 独立复核。

- blocker：本产品未登记 Claude directory reference、CLI reference 与 env-vars 三页作为固定来源。补齐这三页来源后，`transcripts.naming`、`transcripts.schema`、`transcripts.archive` 可从 unknown 升级，其余题的缺口也可收窄。
- `review_status` 保持 pending：本次巡检中其它主题仍有遗留 `pending_question_ids`，按规则不改写它们，也不写 `reviewed_by` / `reviewed_at`。
