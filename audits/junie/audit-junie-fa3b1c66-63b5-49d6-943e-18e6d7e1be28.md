# Junie 上游审阅报告 · 2026-10-06（local_transcripts 首采）

## 结论

本轮 `audit-junie-fa3b1c66` 的 21 个登记来源里 20 个报 `changed`、npm 报 `unchanged`。变化本身
不是知识变化，而是本轮首次采写 `local_transcripts` 所用的固定来源已经换代：文档来源的原件捕获形态
与仓库提交都换了基线。仓库从 `b1e2839df1566cefaca6d12b63d3b1860338b36d` 前进到
`e75d6eef6bb955495d3b3c72befdb5166147195e`，二十个文档页面的 observed hash 与既有快照记录的
`raw_sha256` 逐页不同。

据此新建了一个章节 `junie-local_transcripts-v1`，只回答 `cli` 界面，其余七个 v1 章节与
`registry/chapter-current.yaml` 中既有 selection 原样保留。

## 首采范围与来源

- 界面：catalog 为 junie 登记 `cli` 与 `jetbrains` 两个界面。本轮固定来源全部是终端界面资料，
  因此只写 `cli` 的答案；`jetbrains` 界面不写答案，由查询派生为 `not_investigated`。
- 文档来源：`junie-cli.html`、`junie-cli-configuration.html`、`environment-variables.html`、
  `parameters.html`、`junie-cli-hooks.html` 五个既有快照（抓取于 2026-09-30，
  `version_applicability: unknown`），复用其 artifact 与 snapshot，只新增 17 条 reference。
- 源码来源：`JetBrains/junie` 提交 `e75d6eef6bb9` 的 `templates/junie.shim.sh`，新增一个
  `git_source_file` artifact、一个 `source_revision` snapshot 与三条 `file_lines` 引用。该仓库
  只有安装脚本、渠道清单与 Hermes ACP 插件，不含 CLI 会话实现，因此源码只能用于说明受管启动
  脚本怎样把数据目录环境变量交给二进制；本轮没有写 `mappings/`。
- 没有新建 `archived_document`：本轮没有需要新登记的文档原件。

## 十题结论

| 题 | 状态 | 主要证据 |
| --- | --- | --- |
| `transcripts.scope` | partial | `Ctrl+O` transcript 含全部先前提示与 agent 输出；Task history 保存完整会话上下文（LLM 用量、提示与回应历史）；沙箱拒绝留在 transcript（限开启沙箱的构建）；hook 输出与 `--system-prompt` 明确不落盘 |
| `transcripts.location` | partial | `transcript.md` 与 `events.jsonl` 同目录、子代理在 `subagents`；会话目录绝对路径未记载；`JUNIE_HOME`、`--cache-dir`、`JUNIE_DATA`、未信任项目的临时目录 |
| `transcripts.naming` | partial | 固定文件名 `events.jsonl` / `transcript.md` / `subagents`；会话 ID 与 `junie://sessions/` 链接，示例 ID `session-251209-172932-1ze8` |
| `transcripts.format` | partial | JSON Lines 事件流 + 持续更新的 Markdown；追加/覆盖语义、编码、分片、压缩无记载 |
| `transcripts.lifecycle` | answered | `/new`、后台继续运行、`SessionStart` 的 `resume`/`clear`/`compact`、切换不分发 `SessionEnd`、`/quit`、`/history`、`--resume`、`--session-id`、子代理 transcript |
| `transcripts.schema` | unknown | 只有 hook 载荷暴露 `session_id`/`cwd`/`project_path`；`events.jsonl` 的记录类型与字段未公开 |
| `transcripts.database` | unknown | 固定来源没有出现数据库、索引或辅助表 |
| `transcripts.archive` | unknown | 无原生归档开关与导出入口的记载；`/remote` 是活会话交接而非归档 |
| `transcripts.cleanup` | unknown | 官方只讲保留；唯一自动清理是未信任项目的临时目录，且对象是会话期新增的 MCP/skill/command |
| `transcripts.diagnostics` | partial | `Ctrl+O`、`/settings` 的 Transcript 视图、`/history`、`--resume`、hook 载荷里的 `session_id`、启动脚本的 `logs/upgrade.log` |

## 已查入口与剩余缺口

- 20 份归档文档页面全文检索 `transcript`、`events.jsonl`、`session`、`Task history`、`history`、
  `storage`、`jsonl`、`sqlite`、`database`。
- 固定仓库提交全树检索 `session`、`jsonl`、`transcript`、`history`、`.junie`、`storage`。
- 缺口集中在记录形态本身：`events.jsonl` 的事件类型与字段、`transcript.md` 与事件流的派生关系、
  会话目录的绝对路径与命名、是否存在索引或数据库、会话保留期限与删除机制、导出或归档能力。这些
  都没有被写成"不支持"或"可以安全删除"。

## 需要复核者注意的两点

1. **既有文档 artifact 的 `archive_path` 已过期。** 20 个 `archived_document` artifact 记录的
   `archive_path` 形如 `archive/junie/artifact-junie-docs-*/raw.txt`，而当前原件实际位于
   `archive/junie/artifact-source-junie-docs-*/source.md`。这是上一轮抓取管线换形态留下的既有
   状态，本轮七个 v1 章节共用同一批 artifact，校验器不检查该路径，故未改动既有记录。本轮新增的
   17 条文档引用没有新建 artifact，因此不受影响。
2. **既有文档引用的摘录形态与当前原件不一致。** 既有 119 条引用的摘录是按更早的 Markdown 捕获写成
   的（含 `### ` 小节标题与反引号），在当前 HTML 原件上不能逐字命中。本轮新增的 17 条摘录按当前
   原件的去标签文本逐字生成；只有 `ref-junie-lt-session-id` 里的 `junie://sessions/` 链接涉及
   Writerside 的双重实体转义，按读者形态（`<id>`）记录——与既有引里的 `%USERPROFILE%` 处理方式
   一致。

## 复核状态

其它主题（`configuration`、`custom_agents`、`custom_providers`、`hooks`、`mcp`、
`native_plugins`、`skills`）仍有遗留 pending 题，因此本审计保持 `review_status: pending`，
未写 `reviewed_by` / `reviewed_at`。本轮 `local_transcripts` 十题全部给出可用答案，没有加入
`pending_question_ids`。