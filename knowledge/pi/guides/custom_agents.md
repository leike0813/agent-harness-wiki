---
schema_version: 1
record_kind: production
guide_id: guide-pi-custom-agents
coverage_ref: coverage-pi-custom-agents
claim_refs: []
title: Pi 的子代理与外部组合
---

包内 `README.md:468–474` 直说核心没有内置 sub-agents，并把子代理式工作流留给扩展或独立 Pi 进程；`examples/extensions/subagent/` 给出可调查的扩展示例。这能排除“核心自带定义文件”这一未经证实的假设，但不等于某个外部扩展已经可用。本库目前没有接受 Pi 自定义 agent 的文件格式、目录或 `supported/unsupported` Claim。

如果读者需要多个执行者，应先决定要研究的是**指定扩展提供的子代理**还是**独立 Pi 进程的组合**。对前者至少核对扩展入口、参数、调用结果与失败处理；示例目录存在并不代表已安装到当前会话。即使扩展能执行，也不能把它归类为 Pi 核心的原生能力。材料来自精确 npm 包快照（`snapshot-pi-npm`）；运行证据尚缺，因此本章不给 agent 文件模板。
