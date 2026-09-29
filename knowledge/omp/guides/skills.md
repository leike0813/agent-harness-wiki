---
schema_version: 1
record_kind: production
guide_id: guide-omp-skills
coverage_ref: coverage-omp-skills
claim_refs: []
title: OMP 的 Skills 发现
---

这个精确 npm 包携带实现源码。`src/extensibility/skills.ts:141–220` 的 `loadSkills` 先处理总开关 `enabled`，再按来源检查用户、项目、Claude、Codex 和通用 agents 目录的开关；`:214–220` 特别避免让**被禁用来源**的同名 Skill 遮住较低优先级的可用 Skill。`:330–400` 另处理自定义目录和受管 Skill 的同名问题。这说明“找不到 Skill”可能是来源开关、忽略规则或去重造成的，单看文件是否存在不够。

具体目录由 `src/capability/skill.ts` 与发现模块给出，尚未针对各条件逐条形成已接受 Claim；这里不把源码中的所有目录合并成一份保证生效的安装清单。下一步在隔离环境分别放入用户、项目和自定义目录的最小 Skill，记录发现列表、警告与 `skill://` 读取；再针对同名和 `ignoredSkills` 做对照。证据身份见 18.3.4 包快照（`snapshot-omp-npm`），Coverage `partial`。
