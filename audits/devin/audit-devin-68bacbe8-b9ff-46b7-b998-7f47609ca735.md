# Devin CLI 审阅报告 · 2026-10-06（local_transcripts 首采）

## 给维护者的结论

本轮扫描 31 个来源：4 个官方文档页报 changed（`cli/reference/commands.md`、`cli/essential-commands.md`、`cli/index.md`、`cli/adaptive.md`），其余 27 个 unchanged，npm 来源 `3000.6.11` 未变。四个 changed 页面正是本轮 `archive/devin/` 实际留存的原件，字节与审计观察值一致。

本轮任务是 `local_transcripts` 主题的首采：新增章节 `devin-local_transcripts-v1` 与对应 selection，其余七章未改写。**读者最需要知道的一件事是：官方文档至今没有说明本机会话记录落在哪里、以什么格式存储。** 四页原里唯一给出的本机路径是配置文件 `~/.config/devin/config.json`（Windows `%APPDATA%\devin\config.json`），那是模型默认值配置，不是会话记录。因此 `transcripts.location` 与 `transcripts.database` 记为 unknown，其余八题为 partial，全部带来源。

Devin 是云端会话为主的产品形态，文档同时存在三样容易混淆的东西：本地 CLI 的会话记录、云端会话的服务端状态、以及通过命令拉取的列表/导出。本章把三者分开写：`/archive` 只作用于云端会话，本地侧对应的是 `--export` 逐轮写出的 ATIF 文件，且文档没有给出把导出文件再导回 CLI 的入口。

## 影响与排除

- **受影响并新写**：`local_transcripts` 十题，首采 v1。
- **未受影响**：`configuration`、`custom_agents`、`custom_providers`、`hooks`、`mcp`、`native_plugins`、`skills` 七章的 impact 由扫描器按"引用来源变化"自动生成，本轮 worker 未改写这些章节正文，其 pending 问题原样保留，因此 `review_status` 仍为 `pending`。
- **未调查的界面**：catalog 还声明了 `desktop`（Devin Desktop）。本轮没有任何桌面端原件，不写答案，由查询派生为 `not_investigated`。

## 证据边界

`devin` 没有登记 git 仓库来源，本轮全部证据是官方文档快照（`version_applicability: unknown`），不绑定任何已发布 CLI 版本，也没有运行时观察。

产品登记了 31 个来源，但本轮 `archive/devin/` 只留存的 4 个原件，其余来源（`cli/troubleshooting.md`、`cli/cloud.md`、`cli/handoff.md`、`cli/subagents.md` 等）没有原件可查，**本轮对它们只字未提即成结论**。它们最可能补上落盘位置与压缩行为，缺口在章节的 `transcripts-gaps` 一节里照实列出。既有 artifact 记录的 `archive_path`（`archive/devin/artifact-<source-id>/raw.md`）在本工作树同样全部缺失，与上一轮报告记录的工作树级现象一致，不是本产品缺陷。

写为 partial 的答案都保留了缺口位置：记录内容全集（工具事件、后台 shell 输出、调试日志、缓存是否落盘）、磁盘命名与时间戳/项目路径编码、ATIF 字段结构与写入规则、刷盘与关闭时机、压缩后续写、级联删除与孤儿记录、备份恢复完整性损失，全部无来源。手动删除文件是否安全没有任何来源，章节明确拒绝由此推断。

## 复核

首采、纯文档来源、无冲突、无来源失败、无高影响改动，不请求独立复核。`pnpm maintenance:candidates check --candidate <devin candidate>` 与 `var/lt-verify.py` 均通过。
