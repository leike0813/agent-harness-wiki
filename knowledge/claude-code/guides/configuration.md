---
schema_version: 1
record_kind: production
guide_id: guide-claude-code-configuration
coverage_ref: coverage-claude-code-configuration
claim_refs: []
title: Claude Code 的配置范围与优先级
---

归档设置页把用户 `~/.claude/settings.json`、共享项目 `.claude/settings.json`、项目私有 `.claude/settings.local.json` 与 managed 设置分开；`:624–649` 又提醒普通标量优先级、列表合并和部分模型键的特殊规则不同。`:597–608` 给出 `/status`、`/config` 与 `claude doctor` 的诊断入口。若某设置未生效，先确定它是哪个键、来自哪个文件、是否受信任或环境变量影响，再讨论覆盖顺序。

此网页可随上游更新，且含多处按版本细分的规则；包内 README 没有证明所有说明属于 `2.1.283`，隔离入口也未运行。补证应以精确制品对一个标量和一个列表键分别设置冲突值，记录有效结果、重载与诊断；不能把一条总优先级概述外推到所有键。来源：设置页快照（`snapshot-claude-code-configuration-doc`）及 npm 包快照（`snapshot-claude-code-npm`）。
