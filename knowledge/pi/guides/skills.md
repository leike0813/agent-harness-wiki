---
schema_version: 1
record_kind: production
guide_id: guide-pi-skills
coverage_ref: coverage-pi-skills
claim_refs: [claim-pi-user-skills-path]
title: Pi 的用户 Skills 目录
---

### 已确认的入口

上方已复核事实卡给出用户级目录；它来自这个精确 npm 包的 `docs/skills.md:27`，适用范围是 Linux/x64 原生 CLI。要判断一个 Skill 为什么没有出现，先区分“文件放在该目录”“启动时发现”“模型实际读取 `SKILL.md`”三个环节；这条 Claim 只回答第一个环节。

### 包内文档还说了什么

同一份 `docs/skills.md:20–60,64–90,107–149` 还列出项目 `.pi/skills/`、通用 `.agents/skills/`、`skills` 设置数组与 `--skill` 显式路径，并解释启动时先收集名称和描述，完整正文按需读取。文档区分了目录中的 `SKILL.md` 与某些目录下直接放置的 `.md` 文件，还提到 `--no-skills`。这些是**精确包内文档的说明**；本库尚未把各搜索根、同名冲突和禁用后的实际结果逐条复核为 Claim，因此这里不提供跨目录优先级或复制即可用的安装配方。

若要补全本章，应在隔离 HOME 和项目目录各放一个名称不同的最小 Skill，记录启动发现列表、`/skill:{name}` 调用和正文读取；再单独检查重名与禁用。原始定位见 npm 包快照（`snapshot-pi-npm`）及包内 `docs/skills.md`。Coverage 为 `partial`，不代表 Skills 只实现了一部分。
