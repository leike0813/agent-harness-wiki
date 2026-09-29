---
schema_version: 1
record_kind: production
guide_id: guide-omp-configuration
coverage_ref: coverage-omp-configuration
claim_refs: []
title: OMP 的设置层级
---

`18.3.4` 的 `src/config/settings.ts:797–806` 提供 `getProvenance(setting)`：按运行时覆盖、配置 overlay、项目、全局、父 overlay、默认值寻找某项设置的来源。`:3623–3645` 说明层合并顺序，并提醒某些消费者在意对象键顺序。由此能定位“值从哪里来”，却不能直接断言所有列表、嵌套对象和路径项都遵循一个简单的覆盖公式。

要排查一个设置，先选具体键，沿该键的 schema 和消费代码看它是标量还是合并结构；随后在隔离用户/项目文件中设置冲突值，记录有效值与 `getProvenance`。当前没有这样的逐键观察，也没有已接受的通用优先级 Claim。包内代码位置见 npm 包快照（`snapshot-omp-npm`）；Coverage `partial`。
