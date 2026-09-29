---
schema_version: 1
record_kind: production
guide_id: guide-pi-configuration
coverage_ref: coverage-pi-configuration
claim_refs: []
title: Pi 的全局与项目设置
---

包内 `docs/settings.md:1–8` 把设置分成用户 `~/.pi/agent/settings.json` 和项目 `.pi/settings.json`，并写了项目设置覆盖用户设置。这是**该包文档的概述**，尚无针对具体键的已接受优先级 Claim；尤其数组、资源路径与模型设置未必能由同一句话推导出相同的合并结果。

读者排查时至少要先确认正在改哪个键。`docs/settings.md:14–22` 列出 `defaultProvider`、`defaultModel` 和 `defaultThinkingLevel`；`:190–205` 把 `packages`、`extensions`、`skills` 等资源路径放在另一组，并说明相对路径按所属设置文件解析。后者意味着把同一字符串从用户文件移到项目文件，目标位置可能变化。这个解释来自文档，当前没有隔离运行观察。

要发布一份可照做的冲突示例，需要为一个具体键记录两层 JSON、程序读取后的值及重新加载时机。当前能确认的是调查入口和 npm 包快照（`snapshot-pi-npm`）；Coverage `partial`，不把文档概述外推成所有键的事实。
