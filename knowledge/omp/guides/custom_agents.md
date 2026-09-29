---
schema_version: 1
record_kind: production
guide_id: guide-omp-custom-agents
coverage_ref: coverage-omp-custom-agents
claim_refs: [claim-omp-user-agents-path]
title: OMP 原生用户 agent 的发现入口
---

### 已复核：用户定义的发现目录

上方已复核事实卡给出原生用户 agent 定义的发现目录。证据来自 `18.3.4` 精确包内 `src/task/discovery.ts:5,91–109`：文件头列出用户目录，`discoverAgents` 又调用用户级 `getConfigDirs("agents", { project: false })`，并将目录加入扫描。`:49–71` 只读取 `.md` 文件，交给 `parseAgent`；所以“放入目录”“解析成功”“被任务工具调用”仍是不同结果。

同文件注释还列出项目 `.omp/agents`、扩展包 agent、Claude 插件 agent 与 bundled agent 的合并关系，但本库没有逐项接受这些优先级结论。要完成可用示例，应以隔离 HOME 放置一个带 frontmatter 的最小 `.md`，记录发现、解析警告和一次调用；再用同名用户/项目定义测试覆盖。原始包身份与两处 Evidence 可从上方事实卡追溯；Coverage 仍为 `partial`。
