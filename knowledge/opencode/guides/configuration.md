---
schema_version: 1
record_kind: production
guide_id: guide-opencode-configuration
coverage_ref: coverage-opencode-configuration
claim_refs: []
title: OpenCode 的配置优先级
---

固定源码 `config.mdx:10–58` 描述 JSON/JSONC 配置，并列出远端、全局、项目、自定义路径、`.opencode` 目录等加载层；`:42–56` 给出优先级次序，`:99–150` 细分用户、项目和环境变量指定目录。排查“我的设置为何被覆盖”时，要先确认读取了哪几层，再分辨某个键是整体替换还是深合并，不能只背一个总顺序。

这些规则属于 固定源码快照（`snapshot-opencode-repo`），没有证据表明所选 `1.18.32` 二进制由该 revision 构建。当前也没有同键冲突或重载观察，故本库没有精确包的已接受优先级 Claim。补证先核构建映射，再用隔离目录给同一简单标量设不同值，检查最终值与诊断；复杂对象应另测。
