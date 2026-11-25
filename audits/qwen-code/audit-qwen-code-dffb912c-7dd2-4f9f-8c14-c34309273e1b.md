# qwen-code 上游审阅报告 · 2026-11-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察窗口 `source-qwen-code-repo` `c134a03e5adf7631069269bb96a65cbf5c90f01a` → `e3c02d15dd292425f08b8355df920f66a3e4248b`；`source-qwen-code-npm` 无新观察（0.28.4 未变）。11 个已引用文件发生变化，派发 `config.defaults`、`config.overrides` 与 `hooks.output` 三道固定问题；其余引用文件的变化经函数级核对排除。

## 变化的意义与证据边界

- `docs/users/configuration/settings.md`：新增 `general.displayLanguage` 行；`experimental.eventBusAgentLoop` 行改为“未设置时 headless 会话与 Ink TUI 走事件总线内核”。两处都与同提交 `settingsSchema.ts` 一致。
- `packages/cli/src/config/settingsSchema.ts`：新增 `general.displayLanguage`（enum `off`/`zh-CN`/`en`，默认 `off`，`requiresRestart`；每个翻译块一次快速模型调用，未设快速模型时用会话模型；无需 `experimental.mods`）；`experimental.eventBusAgentLoop` 的未设置默认从“仅 headless”扩到“headless 与 Ink TUI”。同一 hunk 还给 `review.sandbox` 增加 `tiered` 选项（默认仍 `off`），但本章只记录 `review.*` 的运维作用域归属，不逐项记录 review 分组键，故不构成答案变化。
- `packages/cli/src/config/settingsUtils.ts`：`WORKSPACE_RESTRICTED_SETTINGS` 新增 `{ section: 'general', key: 'displayLanguage' }`，沿用既有的剥离/告警/daemon 拒写消费方。
- `packages/cli/src/config/config.ts`：`onPersistPermissionRule` 改为从调用方 workspace 目录加载设置、user 作用域跳过工作区设置，并在写入前同时对照原始与合并规则去重。属于既有批准/规则持久化路径的实现修正，未改变已记录的权限合并顺序。
- `packages/cli/src/services/interactive-mod-session.ts` 与 `packages/cli/src/services/mod-session.ts`：创建门控从 `experimental.mods` 改为 `modsWanted()`（`experimental.mods` 或已设 `general.displayLanguage`）；`allowed()` 拆成 `permitsMods()` 与信任检查，已安装 Mod 仍要求 `experimental.mods` 和受信任工作区，翻译路径可在不受信任工作区运行。对固定问题而言，已安装第三方 Mod 的启用条件未变，故 `native_plugins` 不改写；`docs/users/extension/mods.md` 新增的只是“中文/英文可直接用内置 `displayLanguage`”提示，示例中的正则改写为等价的 Unicode 转义。
- `packages/core/src/core/coreToolScheduler.ts`：`PermissionRequest` Hook 的 `updatedPermissions` 现在会在允许路径上应用；其余 diff 是 Code Mode/取消语义（`waitForNestedToolSettlement`、`handoffAfterAbandonment`、`retired`、遥测会话门控等），不改 Hook 事件清单/顺序、MCP 暴露或 transcript 形态。
- `packages/core/src/services/chatRecordingService.ts`、`packages/core/src/services/sessionService.ts`、`packages/core/src/utils/jsonl-utils.ts`：会话索引/目录读取的流式与上限实现（逐行上限、`ARTIFACT_LIBRARY_MAX_RETAINED_ESTIMATE_BYTES = 128 MiB`、`SESSION_TRANSCRIPT_MAX_INDEX_BYTES`、外部 stream + abort）、分支取消信号与运行期压缩提示剥离。记录路径、JSONL 格式、记录类型与清理语义未变，`local_transcripts` 不改写。

## 派发问题与证据入口

- `config.defaults` / `config.overrides`：`packages/cli/src/config/settingsSchema.ts:747-761`（`general.displayLanguage` 默认与描述）、`packages/cli/src/config/settingsSchema.ts:4683-4692`（`eventBusAgentLoop` 的未设置语义）、`packages/cli/src/config/settingsUtils.ts:278-280`（受限清单）、`docs/users/configuration/settings.md:106`（用户可见行）。
- `hooks.output`：`packages/core/src/core/permission-helpers.ts:259-304`（`HOOK_RULE_SCOPES`、仅 `addRules`、作用域映射），`packages/core/src/core/coreToolScheduler.ts:6486-6496`（获准后、启动前应用）。

## 候选产物

- 新 editions：`qwen-code-cli-configuration-v8`（只改 `config-defaults`、`config-overrides`）、`qwen-code-cli-hooks-v4`（只改 `hooks-output`）。
- 新 snapshots/artifacts：`snapshot-qwen-code-e3c02d15-cli-settings-schema`、`-cli-settings-utils`、`-cli-settings-doc`、`-core-permission-helpers`、`-core-tool-scheduler` 及对应 `git_source_file`（commit + file + `content_sha256`）。
- 旧 artifacts、references、mappings 与 editions 未改动；`registry/chapter-current.yaml` 只切换 configuration 与 hooks 两个 topic。

## 待处理与独立复核

**审计记录：** `audits/qwen-code/audit-qwen-code-dffb912c-7dd2-4f9f-8c14-c34309273e1b.yaml`。**历史 pending 审计：** audit-qwen-code-42d06e9b-b1b5-410a-8c7c-948096791695、audit-qwen-code-888916ad-b2ec-4dba-9e92-2b032d361ba0、audit-qwen-code-09fdd70c-8546-4453-9976-314fe6b62dfd、audit-qwen-code-67a32536-c8ca-43c6-a77f-3a97c7e748df、audit-qwen-code-0f50e3fc-90e5-4b45-b494-07cb7d8cc6b8 保持原状态，不因本审计被关闭。**独立复核：** 本轮未推翻已发布配置步骤，也未出现来源冲突，不触发高影响复核要求。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-qwen-code-repo` | c134a03e → e3c02d15 | changed（11 个已引用文件） |
| `source-qwen-code-npm` | 0.28.4 未变 | unchanged |

## 验证入口

`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/qwen-code` 通过（exit 0）。引用行的 `content_sha256` 由 `raw.githubusercontent.com/QwenLM/qwen-code/<commit>/<path>` 下载后计算。
