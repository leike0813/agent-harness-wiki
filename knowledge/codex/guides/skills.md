---
schema_version: 1
record_kind: production
guide_id: guide-codex-cli-skills
coverage_ref: coverage-codex-cli-skills
claim_refs: []
title: Codex CLI 的 Skills 如何定位
---

归档的官方 Skills 页在“Where Codex loads local skills”列出仓库内 `.agents/skills`、用户 `$HOME/.agents/skills` 及管理员/系统位置；还说明从当前工作目录向仓库根扫描，并提醒同名 Skill 不会被合并。这些是**未标明 `0.157.1` 适用性的网页规则**，不是本库对该 npm 二进制接受的路径事实。它们至少告诉维护者：查找失败时需同时检查启动目录、仓库层级和 Skill 名称，不能只看一个固定目录。

`@openai/codex@0.157.1` 的包入口选择平台原生程序，包内 README 没有给出上述发现规则；另一个源码 checkout 的 commit 也尚未与包建立构建映射。因此本章不建议读者把网页目录当作该版本的可靠安装路径。补证要先确认二进制对应源码，再在隔离 HOME/仓库放入两个最小 `SKILL.md`，记录是否发现和如何处理同名项。材料入口见 Skills 页面快照（`snapshot-codex-cli-skills-doc`）与 npm 包快照（`snapshot-codex-cli-npm`）。
