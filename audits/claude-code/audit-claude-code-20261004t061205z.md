# Claude Code 上游巡检报告 · 2026-10-04

- 审计记录：`audit-claude-code-20261004t061205z`（status `changed`，review_status `pending`）
- 本轮观察：4 个登记来源，其中 2 个非 unchanged
- 协调者语义 triage：定向维护（maintain）
- 交付方式：`delivery=pr`，本轮不切换本地发布指针、不更新受管二进制

## 来源身份变化

| 来源 | 类型 | 状态 | 基线 | 本轮观察 |
| --- | --- | --- | --- | --- |
| `source-claude-code-npm` | npm_registry | changed | `2.1.288@sha512-tnc8XuK5xQkyE6oowhhSPIjLuNc0S…` | `2.1.289@sha512-RQWjAlalf9aomgI3JaXDCdFPvmNVn…` |
| `source-claude-code-skills-doc` | official_documentation | changed | `efdc415213d82e2aefd6f144f78b3d806fec595a89ff…` | `acdf96599200090206dd21327022aa58b21e23dfebda…` |

## 语义 triage 与理由

### skills

受影响固定问题：`skills.invocation`、`skills.conditions`

关联小节：`skills-invocation`

https://code.claude.com/docs/en/skills.md 相对已归档原件（efdc4152）出现 17 行实质差异：新增小节「Where you write the skill's name」说明把技能名放在消息开头才会直接运行、放在普通文本中只构成当轮许可而不直接运行；并把 disable-model-invocation 的权限对照表由「No」改为「Not on its own」、加载时机由「when you invoke」改为「when invoked」。两者都改变技能调用的条件与语法答案。

维护结论：需要改，已交付新 edition `claude-code-skills-v4`（v3 保留为历史）。

| 固定问题 | 处置 | 说明 |
| --- | --- | --- |
| `skills.invocation` | answered（改写） | `disable-model-invocation: true` 拦的是 Claude 自行调用而非彻底禁用；描述不进 Claude 上下文，但用户在消息中点名仍可使 Claude 在该轮运行。新增按技能名书写位置区分直接运行、当轮许可与仅提及的机制表。 |
| `skills.conditions` | partial（补条件，不升级） | 新增的书写位置规则是一个语法条件，但官方页未标注适用版本，2.1.283 精确版本的条件行为仍未验证，故保持 partial。 |

新增引用登记为 `snapshot-claude-code-skills-doc-20261004`（`version_applicability: unknown`），原件保留在 `archive/claude-code/artifact-claude-code-skills-doc-20261004/raw.md`。`source-claude-code-npm` 的 2.1.288 → 2.1.289 仅发布身份变化，受管包刷新仍属 `harness-binary` 职责，本轮未动。

## 调查记录

- 本轮协调者语义 triage 结论：maintain。已交回隔离候选做定向维护。
- 本轮 source-claude-code-skills-doc 的 observed 哈希 acdf9659 与维护 Agent 独立抓取 https://code.claude.com/docs/en/skills.md 的内容哈希一致，已逐行 diff 确认差异仅限上述调用语法小节与 disable-model-invocation 措辞。
- 遗留一致性问题：`{#skills-format}` 段落仍按未变动的 frontmatter 字段表把 `disable-model-invocation` 概括为「只有你能调用」。该段落归属 `skills.format` 与 `skills.extensions`，本轮未交回这两个固定问题，故未改动。
- source-claude-code-npm 由 2.1.288@同一包升到 2.1.289，仅发布身份变化，不单独构成章节影响。
- 本轮只交回 skills.invocation 与 skills.conditions，未重开 skills 的其他固定问题。

## 候选与复核

本产品已交回隔离候选做定向维护；候选只允许编辑本产品的 `knowledge/`、`audits/` 与本产品来源登记，逐产品 `check` 通过后由协调者生成合并计划。高影响结论按维护契约另行独立复核。本轮 `review_status` 保持 `pending`，复核判定由协调者决定。
