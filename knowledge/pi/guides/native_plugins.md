---
schema_version: 1
record_kind: production
guide_id: guide-pi-native-plugins
coverage_ref: coverage-pi-native-plugins
claim_refs: []
title: Pi 包管理与扩展装载
---

Pi 的“插件”主要应沿**Pi package 与 extension** 查，而不能预设另有与包无关的独立插件清单。`docs/packages.md:18–45,151–161,213–220` 说明 `pi install` / `pi list` / `pi config` 的不同职责：安装来源可为 npm、git 或本地路径；包能携带 extensions、skills 等资源；配置决定资源启用。文档还区分全局设置和带 `-l` 的项目设置。`pi list` 看到包只说明设置中登记了它，并不能证明扩展回调已执行。

本轮没有安装第三方包，也没有验证任何包的清单、信任或激活。下一步应选一个固定版本的最小本地 package，在隔离目录依次记录安装结果、资源发现、启用状态及一次回调；每一步单独留证。原始入口是 npm 包快照（`snapshot-pi-npm`）内的 `docs/packages.md`。没有这些记录时，本章不给出某插件“healthy”的结论。
