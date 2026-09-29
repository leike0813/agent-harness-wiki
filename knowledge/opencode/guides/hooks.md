---
schema_version: 1
record_kind: production
guide_id: guide-opencode-hooks
coverage_ref: coverage-opencode-hooks
claim_refs: []
title: OpenCode 的插件 Hook
---

固定源码的 `plugins.mdx:67–104,142–202` 把 hooks 放在插件函数中，并举出 `tool.execute.before`、`tool.execute.after` 及事件订阅。这与“在独立 JSON hook 文件中写命令”不是同一机制。排查时先看插件是否被发现，再看 hook 是否注册，最后才看目标工具调用是否触发。

此材料属于 固定源码快照（`snapshot-opencode-repo`），尚未证明它构建了 `opencode-ai@1.18.32` 平台二进制；本轮也没有安装最小插件或观察回调。下一步先确认制品身份，再在隔离环境让插件把一次无副作用工具调用的前后事件写入测试输出，并记录异常处理。当前没有适用于该 npm Target 的已接受事件时机 Claim。
