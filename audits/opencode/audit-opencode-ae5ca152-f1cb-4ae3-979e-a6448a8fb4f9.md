# opencode 2026-11-25 增量维护报告

- 审计：`audit-opencode-ae5ca152-f1cb-4ae3-979e-a6448a8fb4f9`
- 固定来源：`source-opencode-repo`，commit `d62d2db9bcff0fe039567f6666d0d8a5bdf2e96f`（refs/heads/dev）；npm `opencode-ai@1.19.6` 未变。
- 基线：`3f393d78bfc3f0826b2c7080e57964c235704695`；diff 见 `/tmp/gitdiff-1125/opencode--source-opencode-repo.diff`。
- 范围：只抽取 `/tmp/git-intersect-1125.json` 中 `opencode` 键的 58 个 cited 文件 hunk，并用同路径 base/observed 对照区分“旧轮已覆盖的移动/重命名”和“相对当前 edition 的新语义”。

## 变更的文件与结论

### skills → `opencode-skills-v5`（已选）

固定提交把技能文档整体重写（`services/site/src/docs/content/skills.mdx`），实现也从 SkillV2 迁到新的 Skill/Discovery 服务。新建完整 edition，问题 9 项全部 answered，v4 保留为历史。实质变化：

- 来源优先级明确为内置、`.claude`、`.agents`、全局、项目、显式 `skills` 六层；后注册来源覆盖同 ID。
- http(s) 来源改为 HTTP catalog：`index.json` + `version` + 每文件下载与缓存刷新。
- 原生权限写法改为 `permissions` 规则数组（action/resource/effect，最后匹配生效）；旧 `permission.skill` 仍由 normalize 转换。
- frontmatter 全部可选；`opencode/autoinvoke` 优先于 `disable-model-invocation`；ID 由路径派生，V2 不强制命名正则。
- 新增内置技能 `opencode`/`report`、MCP 技能（`server:skill`，`mcp_skills` 标志）与按需正文/虚拟文件（`skill://`、`/api/experimental/skill/:skillID/file/*`）。
- 扫描规则（深度 6、忽略点目录、SKILL.md 停止递归、根层 `.md`）、重载去抖与日志入口沿用，但定位到新模块。

新增证据：`artifact/snapshot/reference` 均以 `d62d2db9` 为固定身份，覆盖站点 skills 文档与 skill-scan/skill/skill-file/compatibility/instructions/tool-skill/discovery/mcp-skill/builtin-skill/protocol/normalize/server-process。

### local_transcripts → `opencode-local_transcripts-v3`（已选）

相对 e965774，会话存储有实质变化，重建存储、记录内容、生命周期、数据库分工、归档与诊断六节；V1 记录类型节保留 652c090 结论并标注历史。

- 助手内容片段拆到 `session_part`（`experimental.part_rows`，默认 true）；`session_message.data.content` 置空。
- `session_pending` 删除；排队输入表为 `session_inbox`。
- 新增 `blob`/`blob_ref` 与 `media_blob` 标志；`session_v2` 新增 `time_busy`。
- 打开数据库不再执行 PASSIVE checkpoint；文件库导入旧凭据并收紧权限；迁移以 `session`/`session_v2` 判定已有库。
- `session import` 只写 `session_v2`/`session_message`，按目标位置决定是否把内联媒体拆成 blob；新增 `--directory`。
- 删除顺序改为先父后子并取消后台任务；截断提示新增“最后一行被截断”与“全文无法保存”两种状态。

## 保持不动 / 挂起

### configuration（held）

configuration v6 草稿仍在候选外 `/tmp/ahw-opencode-v6-draft`，选择保持 `opencode-configuration-v4`。本轮未写、未选、未移动 v6。核对 292cb5a1（v6 复核基线）→ d62d2db9：config.ts、normalize.ts、discovery.ts、managed-policy.ts、schema/config.ts、schema/config/policy.ts、policies.mdx、cli commands/migrate、v1 config、compatibility.ts 逐字未变；`schema/config/flag.ts` 仅新增 `mcp_skills` 描述。v6 的加载顺序/策略/迁移事实仍成立；如 v6 列举全部标志，复核时需补 `mcp_skills`。

### custom_agents（high-impact，hold + flag）

固定提交推翻两处已发布步骤：

1. 顶层 `subagent_depth` 已列入 `unsupportedTopLevel`（归一化标 unsupported 并忽略），限制改由 `experimental.subagent_depth` 控制，默认 1。
2. `opencode agent create` 已从命令注册表移除，可用入口是 `debug agents`。

同时原生配置改为 `agents` 记录（request/color/steps/disabled/permissions 等字段），旧的 `agent`/`mode`、`permission`、`tools` 仍由 V1 迁移接受；委派工具由 `task` 改名 `subagent`，权限动作为 `subagent`。按高影响推翻规则不写 edition、不切换选择；v3 继续为当前版本，`agents.limits` 与 `agents.diagnostics` 记 `pending_question_ids`，待独立复核后再出 v4。

### custom_providers / mcp / native_plugins / hooks

- custom_providers：原生键已是 `providers`（package、settings/headers/body、models capabilities/variants/cost），旧 `provider` 仍由 normalize 迁移；provider 实现已移出 cited 范围，故只记录原生/旧键分歧，不凭不完整证据改写 v5。
- mcp：native `{ servers, timeout }`，旧映射仍被迁移；仅 `enabled` 的旧条目会标 unsupported。v4 描述的旧映射仍可用，不建 edition。
- native_plugins：native `plugins` 数组，旧 `plugin` 数组仍被迁移；hooks 无本批 cited 文件变化。两者不建 edition。
- 以上均不是已发布配置步骤被推翻，本轮只记录观察，等待聚焦复核。

## 检查

- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-15/candidates/opencode`：exit 0；剩余诊断只有 7 条既有 `COVERAGE_INCOMPLETE` 警告（历史 coverage 记录 `partial`，非 error）。
- 复核状态：`review_status: pending`，未写 `reviewed_by`/`reviewed_at`；`pending_audit_refs` 保留 9 条旧审计（含 held 的配置复核与 config.trust 冲突）。
