# qwen-code 维护报告（2026-10-22）

审计：`audit-qwen-code-67a32536-c8ca-43c6-a77f-3a97c7e748df`
观察：`source-qwen-code-repo` 9dacfdbe1a2047c85b29ebe504c40657daeab3bd → 9a83f1080e1432c72a07502417c97bff493b2ea2（3347 个文件）；`source-qwen-code-npm` 0.25.1 → 0.26.0。

## 变更来源与语义 triage

改动文件中被章节引用的有 14 个；逐条比对后确认的机制级变化：

- `packages/cli/src/config/settingsSchema.ts`：新增 `ui.allowedApprovalModes`（array、`mergeStrategy: REPLACE`、默认 `undefined`、仅运维作用域、`showInDialog: false`）、`model.loopProtection`（enum `warn|stop|off`、默认 `warn`、`requiresRestart: true`）、`experimental.generatedUi`（布尔、默认 `false`、`requiresRestart: true`）；`experimental.mods` 标签改为 **Mods (Experimental)**、`showInDialog` 改为真、描述扩为“受信任的本地交互终端与 headless 会话”。
- `packages/cli/src/config/settingsUtils.ts`：`WORKSPACE_RESTRICTED_SETTINGS` 新增 `{ section: 'ui', key: 'allowedApprovalModes' }`。
- `packages/cli/src/config/config.ts`：`resolveLoopProtection` 对非法值打印一次告警并回落 `warn`；同时注册新的 `qwen daemon` 子命令（与本章问题无关）。
- `docs/users/configuration/settings.md`：同步上述行，并补 `skills.directories` 的说明（已存在键的文档补充，归属 skills 主题）。
- `docs/users/extension/mods.md` + 新增 `packages/cli/src/services/interactive-mod-session.ts`、`packages/cli/src/services/mod-session.ts`：Mod 运行面从 headless 扩展到本地交互终端，补齐交互宿主字段、工具中间件、预算与重启语义。
- `docs/users/features/headless.md`：新增工具 schema 预算指导（`--max-tool-calls 0` 不移除 schema、`--safe-mode` 忽略 settings 来源的 `tools.eager`），属 headless/工具主题，未进入本轮固定问题。

## 受影响问题与处理

| 问题 | 结论 | 处理 |
| --- | --- | --- |
| `config.defaults` | 变化 | 新 edition v6：补三组默认值（`ui.allowedApprovalModes`、`model.loopProtection`、`experimental.generatedUi`）并改写 `experimental.mods` |
| `config.overrides` | 变化 | 新 edition v6：新增“例外三”运维作用域键及 `REPLACE` 合并、受限键剥离 |
| `config.diagnostics` | 变化 | 新 edition v6：新增非法 `loopProtection` 告警与 `/settings` Mods 开关两个可观察信号 |
| `config.sources` | 未变 | 层级、路径与来源入口无变化，保留原答案 |
| `mcp.entry` | 未变 | `mcp` 分组、`mcpServers` 作用域文件与 `qwen mcp add` 均未改动 |
| `plugins.api` | 变化 | 新 edition v3：Mod 运行时扩展到本地交互终端、交互工具中间件与预算/重启边界 |
| `transcripts.scope` | 未变 | 记录类型、`general.chatRecording` 开关与本地 CLI 记录范围未变；新增的是 Web Shell/daemon 消息组删除、hosted 会话的 `clientInitiatedSkills` 标记与写租约替换 |

## 排除项

- `skills.directories` 文档补充：键在本轮之前已存在，归属 skills 主题，本轮不重审。
- `docs/users/features/headless.md` 新增段：headless 工具 schema 预算与 safe-mode 排障指导，不改变本轮四个配置问题的来源/覆盖/默认值结论。
- npm 版本 0.25.1 → 0.26.0：本轮没有逐小节证据把结论对应到发行包，不新建映射。

## 复查

- 新引用均绑定提交 `9a83f1080e1432c72a07502417c97bff493b2ea2` 的 `git_source_file`（仅 commit、file、`content_sha256`），未复制原件。
- 旧 edition（configuration-v5、native_plugins-v2）字节未动，选择指向新 edition。
- `pending_audit_refs` 原样保留；其中 `audit-qwen-code-888916ad-b2ec-4dba-9e92-2b032d361ba0` 仍列有 `config.runtime`/`config.trust` 的历史 pending 标记，属本轮范围外既有阻塞，未在本审计中改写或关闭。
- `pnpm -s maintenance:candidates check --candidate <candidate>` 通过（exit 0）。
