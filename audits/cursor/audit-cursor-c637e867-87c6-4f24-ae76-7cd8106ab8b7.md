# Cursor 上游巡检维护报告 · 2026-10-09

- 审计记录：`audit-cursor-c637e867-87c6-4f24-ae76-7cd8106ab8b7`（status `changed`，review_status `pending`）
- 上一审计：`audit-cursor-bafb664a-24a9-4bec-92ad-f77599826496`
- 仍未结案的引用审计：`audit-cursor-517f9565-ac53-4884-b927-d74fa7b8377d`、`audit-cursor-20261004t061205z`
- 本轮范围：topics `configuration`、`custom_agents`；questions `config.trust`、`config.defaults`、`config.overrides`、`agents.entry`、`agents.roles`
- 本轮来源：`source-cur-agent-run-modes-doc`、`source-cur-agent-projects-doc`（均为官方文档，无 Git 来源）

## 来源身份变化

| 来源 | 基线 | 观察 | 原件 |
| :-- | :-- | :-- | :-- |
| source-cur-agent-run-modes-doc | `940e4bed8022…` | `7373592c3e2e…` | `archive/cursor/artifact-source-cur-agent-run-modes-doc-7373592c3e2e/source.md` |
| source-cur-agent-projects-doc | `7573eccd51d1…` | `fdb3a331e679…` | `archive/cursor/artifact-source-cur-agent-projects-doc-fdb3a331e679/source.md` |

两份原件都存在于原项目 `archive/cursor/`，逐字比对可做，无「无可比旧原件」的情况。

## 语义 triage 与理由

### source-cur-agent-run-modes-doc：新增 Read access 机制

新增 `### Read access` 一节（含 `#### Read Allowlist`、`#### Configure read access in sandbox.json`、`#### Team read policy` 三个子节），`## Team controls` 首句加入团队读取策略，`## Changelog` 新增 3.23（2026-10-01）条目。实质变化是**读取边界成为与 Run Modes 并列的独立审批轴**：默认 System；Workspace 模式需要批准、检索跳过边界外文件、macOS/Linux 上沙箱命令可见范围收窄；`sandbox.json` 以替换语义覆盖设置值。命中 `config.trust` / `config.defaults` / `config.overrides`。

**界面边界（重要）**：Settings > Agents > Approvals & Execution > Read Access 是 IDE 侧入口。本轮**没有**把它写成 CLI 的配置项。Run Modes 页同节显式给出 CLI 等价物——`cli-config.json` 的 `sandbox.readBoundary`、`permissions.allow` 的 `Read(...)` 条目，并声明 `sandbox.json` 同时覆盖两者；章节只按这一句计入 `cli` 界面答案，并在正文注明 Settings 开关属于 IDE 侧。

### source-cur-agent-projects-doc：Projects 套餐范围

「available on all plans」→「available on all paid plans」，新增「isn't available on the free Hobby plan, which doesn't include Cloud Agents」；Privacy Mode (Legacy) 的排除条件**仍然保留**（任务说明中「不再以 Privacy Mode 为排除条件」与原文不符，以原文为准）。命中 `agents.roles`（Project 协调者段落）。

### 排除项

- `source-cur-sdk-typescript-doc`：getUsage 一行描述文字调整，不构成事实变化，不进入本轮范围（任务已排除）。
- `cli/changelog`、`models-pricing`、`rules` 等 changed 来源本轮未在任务范围内，也未在候选中做任何「无影响」结论——它们在本次交付里不作判断。

## 交付

| 文件 | 变更 |
| :-- | :-- |
| `knowledge/cursor/chapters/cursor-cli-configuration-v3.md` | 新建 edition（v2 保留）：config-trust / config-overrides / config-defaults / config-scope 增补 Read access |
| `knowledge/cursor/chapters/cursor-cli-custom_agents-v3.md` | 新建 edition（v2 保留）：agents-roles 补写 Projects 套餐限制 |
| `references/ref-cur-configuration-runmodes-read-access-modes.yaml` | 新增 |
| `references/ref-cur-configuration-runmodes-read-access-workspace.yaml` | 新增 |
| `references/ref-cur-configuration-runmodes-read-allowlist.yaml` | 新增 |
| `references/ref-cur-configuration-runmodes-read-access-sandbox-cli.yaml` | 新增 |
| `references/ref-cur-configuration-runmodes-team-read-policy.yaml` | 新增 |
| `references/ref-cur-configuration-runmodes-changelog-3-23-read-access.yaml` | 新增 |
| `references/ref-cur-custom_agents-projects-plans.yaml` | 新增 |
| `snapshots/snapshot-source-cur-agent-run-modes-doc-20261008.yaml` / `artifacts/artifact-source-cur-agent-run-modes-doc-7373592c3e2e.yaml` | 新增 |
| `snapshots/snapshot-source-cur-agent-projects-doc-20261008.yaml` / `artifacts/artifact-source-cur-agent-projects-doc-fdb3a331e679.yaml` | 新增 |
| `registry/chapter-current.yaml` | configuration → v3，custom_agents → v3 |

## 未完工作

`agents.entry` 未被本轮两个来源触及；两个主题的其余问题也不在本轮范围。`pending_question_ids` 为空：本轮范围内的问题全部完成。审计仍引用两条 `review_status=pending` 的旧审计，按契约保持 `pending`，不写 `reviewed_by`。

## 复核

未触发高影响独立复核条件：无来源冲突、无已发布配置步骤被推翻、无跨主题关键加载机制改变。
