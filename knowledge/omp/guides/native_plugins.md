---
schema_version: 1
record_kind: production
guide_id: guide-omp-native-plugins
coverage_ref: coverage-omp-native-plugins
claim_refs: []
title: OMP 的插件命令与状态
---

`src/commands/plugin.ts:14–55` 在精确包中枚举 `install`、`list`、`enable`、`disable`、`doctor`、`discover`、`upgrade` 等动作；同一入口有 `--scope user|project`、`--local`、`--dry-run` 与 `--json`。它将参数交给 `src/cli/plugin-cli.ts`，因此命令声明仅证明有入口，执行规则仍需读后者。`doctor` 可以作为诊断入口，但尚无实际输出可解释。

本轮未安装受管插件。读者应把“包被登记”“发现 manifest”“启用功能”“扩展运行”分开看；`list` 返回一项不足以说明后面三步。下一轮选一个固定的本地最小插件，以隔离作用域记录 `list`、`doctor`、启用结果和一次真实回调。来源见 npm 包快照（`snapshot-omp-npm`）；当前没有任何插件 `healthy` 的 Claim。
