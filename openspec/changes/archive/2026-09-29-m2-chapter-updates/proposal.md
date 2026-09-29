# Proposal

## Why

现有扫描与调查 Skill 只产出 Claim 候选并等待人工接受，无法把上游变化定位到新章节问题与小节，也不能完成已授权的本地自动发布流程。

## What Changes

- **BREAKING**：手动观察登记的源码、官方文档和 npm 版本后，按问题、小节、引用和跨主题链接判断知识影响；扫描不预先把候选包下载为知识证据。
- 调查 Agent 引用固定来源、自检并直接采纳一般更新；冲突、高影响或跨主题关键机制由另一 Agent 独立复核。
- 每次观察写审计 YAML，必要时附简短 Markdown；已完成内容通过校验后自动发布，阻塞部分保留原章节和审计。
- 同次手动流程可尝试刷新受管二进制，但其失败不阻断知识发布。

## Capabilities

### New Capabilities

- chapter-update-workflow: 来源变化到章节修订、Agent 复核和发布结果的端到端契约。

### Modified Capabilities

- manual-investigation-skill: 从候选交接改为可完成章节调查、复核和发布的项目 Skill。
- upstream-incremental-audit: 审计记录问题/小节影响，扫描只观察登记来源并保留失败状态。
- knowledge-release: 增量发布保留受阻章节的原固定来源与可查询历史。

## Impact

依赖章节模型、阅读接口与受管环境；涉及 .agents/skills/harness-investigation、src/sources/scan.ts、audits、知识输入、发布指针与端到端验证。已归档旧 change 只作历史记录。
