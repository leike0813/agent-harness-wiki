---
schema_version: 1
record_kind: production
guide_id: guide-claude-code-skills
coverage_ref: coverage-claude-code-skills
claim_refs: []
title: Claude Code 的 Skills 路径
---

归档官方 Skills 页的“Where skills live”列出个人 `~/.claude/skills/{name}/SKILL.md`、项目 `.claude/skills/{name}/SKILL.md`、嵌套目录及插件 Skill；后续文字解释启动目录到仓库根的发现、按需读取子目录，以及同名项可能并存。这些信息能指导排查：先查会话启动位置与文件是否包含 `SKILL.md`，再看 Skill 是未发现、未在 `/` 菜单出现，还是尚未被调用。

这份网页有多处带版本门槛的新行为，不能整体套给 `@anthropic-ai/claude-code@2.1.283`。包内 README 只指向文档；隔离包集禁用安装脚本，主入口还是提示桩，故没有本版发现观察。先确认可运行的精确制品，再在隔离仓库放置最小 Skill，记录启动、嵌套目录读取与重名行为。当前没有该 npm Target 的已接受路径 Claim；材料见 Skills 页面快照（`snapshot-claude-code-skills-doc`）与 包快照（`snapshot-claude-code-npm`）。
