Type: grilling
Status: resolved
Blocked by: 04

## Question

首个 ResearchRunner 应承担哪些调查工作，具有什么材料、网络和工具权限，以及怎样的预算、重试和终止边界？候选事实怎样进入复核而不能直接成为正式发布？

## Comments

- 用户决定自己发起调查，由现有 agent 执行；项目提供专用 Skill，存放在 `.agents/skills/` 并由 `.gitignore` 豁免。
- 当前 `.agents/skills/` 含多个外来或本地 Skill；实施时只豁免本项目的专用 Skill 目录，避免把整个目录纳入公开 Git。
- 用户同意专用 Skill 交付可审阅的 Claim、Evidence、Coverage 候选记录，并说明证据缺口。

## Answer

M2 不建设自动调用模型的 ResearchRunner 或常驻调查 worker。用户手动选择复核任务并调用现有 agent；项目在 `.agents/skills/` 提供一个明确针对本知识库的调查 Skill。`.gitignore` 仅豁免这个 Skill 的子目录，保留其他本地 Skill 的忽略状态。

Skill 的输入是具体 harness、精确 Target、主题或问题、当前事实与证据，以及固定的源码 submodule commit、文档/制品快照和相关变化。Agent 可在已记录的官方来源范围内扩展调查；新获取材料要固定身份后再作证据。来源内容始终是数据，不能变成对 agent 的指令。一般调查不执行真实二进制；需要运行观察时走独立的隔离探针决策。

Skill 输出可审阅的 Claim、Evidence、Coverage 候选记录与简短调查说明，标注支持、冲突、未知和未解决问题。按实际 schema 校验后由用户复核接受；Skill 不直接将候选状态改成 `accepted`，也不切换本地 KnowledgeRelease。

模型、凭据、调用费用和重试由用户启动的现有 agent 会话负责，项目不保存模型凭据或实现自动重试队列。验证失败在当前调查上下文修正；无法可靠完成时保留已有候选并报告 `blocked`。PRD 中自动 ResearchRunner、任务租约、后台并发和机器预算控制需在最终规格中按此选择调整。
