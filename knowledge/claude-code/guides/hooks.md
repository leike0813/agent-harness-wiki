---
schema_version: 1
record_kind: production
guide_id: guide-claude-code-hooks
coverage_ref: coverage-claude-code-hooks
claim_refs: []
title: Claude Code 的 Hook 事件
---

归档设置页将 hooks 放在共享项目 `.claude/settings.json` 可能承载的内容中；`:582–608` 说明一般设置文件变更的重载与 `ConfigChange` 事件，并把未知 hook event 作为“单项设置警告”的例子。这提示两类不同问题：hook 配置是否被解析，以及某事件发生时命令是否执行。项目文件还可能受目录信任限制。

页面并未提供本库所选 `2.1.283` 包的事件派发证据；隔离包主入口未运行，故没有回调日志。补证应使用精确可执行制品与无副作用命令，分别检查解析警告、目标事件触发、修改文件后的重载及失败处理。不能把网页上的重载描述直接写成该版本的运行事实。材料见 设置页快照（`snapshot-claude-code-configuration-doc`），Coverage `partial`。
