---
schema_version: 1
record_kind: production
guide_id: guide-opencode-skills
coverage_ref: coverage-opencode-skills
claim_refs: []
title: OpenCode 的 Skills 调查
---

固定源码的 `packages/web/src/content/docs/skills.mdx:11–30` 描述了项目 `.opencode/skills/{name}/SKILL.md`，还提到沿当前目录向上查找 `.claude/skills` 与 `.agents/skills`；`:34–70` 规定 frontmatter 名称/描述；`:125–183` 讨论权限与按 agent 覆盖。读者若在源码上调查“Skill 为什么没出现”，要同时检查发现目录、文件名、frontmatter 和权限，不应只检查一个目录。

但 源码快照（`snapshot-opencode-repo`）是 commit `545f51d…`，本页 Target 是 `opencode-ai@1.18.32` Linux/x64 二进制包装包；两者的构建对应尚未证明。上述路径是**固定源码文档的说明**，不是已接受的 npm 包安装路径。下一步先核对发行构建标记，再用隔离 Skill 观察列表、读取和权限拒绝；在这之前本章没有可保证适用于该二进制的最小示例。
