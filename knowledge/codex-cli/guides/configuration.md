---
schema_version: 1
record_kind: production
guide_id: guide-codex-cli-configuration
coverage_ref: coverage-codex-cli-configuration
claim_refs: []
title: Codex CLI 的配置层级
---

归档配置参考开头把用户级配置放在 `~/.codex/config.toml`，项目级放在 `.codex/config.toml`，并说项目级加载与信任有关；它还明确列出 `model_provider`、`model_providers` 等不会被项目配置覆盖的本机键。因此“项目文件优先”不能当成不分键的通则。网页还提 `--profile` 和相邻 profile 文件，这又是独立的选择维度。

上述是**官方网页的当前描述**，没有与 `@openai/codex@0.157.1` 包绑定。要对该版本回答某设置为什么没生效，应先固定构建来源，再以一个普通标量和一个本机受限键分别测试用户/项目冲突、信任状态和 profile；重载需另查。现有材料只支持调查入口，未形成已接受的优先级 Claim。见 配置页快照（`snapshot-codex-cli-configuration-doc`）及 npm 包快照（`snapshot-codex-cli-npm`）。
