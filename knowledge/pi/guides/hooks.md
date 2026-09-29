---
schema_version: 1
record_kind: production
guide_id: guide-pi-hooks
coverage_ref: coverage-pi-hooks
claim_refs: []
title: Pi 扩展中的事件回调
---

Pi 的包内 `docs/extensions.md:55–108,266–337` 通过扩展工厂与 `pi.on(event, handler)` 描述事件订阅，生命周期图中可以找到 `session_start`、`before_agent_start`、`tool_call` 等位置。该文档还区分自动发现的全局/项目扩展与 `pi -e ./file.ts` 临时试用；`:7` 说明自动发现扩展可以用 `/reload` 热重载。这里的 hook 是**扩展事件回调**，不能套用其他产品的 JSON hook 文件格式。

尚未接受具体事件的时序或失败处理 Claim，也没有一份已加载扩展的执行日志。最小补证应固定一个无副作用回调，先确认扩展工厂被执行，再分别触发 `session_start` 与 `tool_call`，记录回调返回、错误及 `/reload` 后状态。来源是 npm 包快照（`snapshot-pi-npm`）中的 `docs/extensions.md`；当前 Coverage `partial`。
