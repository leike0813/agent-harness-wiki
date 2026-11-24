# opencode 2026-11-23 观察：git HEAD 前进与配置/会话文件 triage（复核修正版）

**审计 ID：** `audit-opencode-d3211b54-c07d-479d-ac4b-21d3686fe0bd`
**观察时间：** 2026-11-23T18:02:26.293Z
**固定来源：** `source-opencode-npm`（`opencode-ai` 1.19.6，unchanged）、`source-opencode-repo`（`refs/heads/dev`，`62d07aa01de35cc06ec461edb0dff6ee77c77c8a` → `292cb5a164786f73f4f32e5caec0c7aafe98b494`，74 个提交、501 个变更路径）
**复核状态：** `review_status: pending`。独立复核已返回 `changes_requested`，本轮按意见修正；修正后的草稿未进入候选，等待同一 reviewer 再复核。

## 结论

- **configuration**：`config.sources`、`config.defaults`、`config.migration` 与 `config.overrides` 的表述需要更新。完整修正写在候选外的草稿 `opencode-configuration-v6` 中。
- **local_transcripts**：`compaction.ts` 与 `projector.ts` 的两处 hunk 均为 bug fix，答案不变，未改章。
- 选择：`registry/chapter-current.yaml` 保持 `opencode-configuration-v4`；草稿 `knowledge/opencode/chapters/opencode-configuration-v6.md` 已移到 `/tmp/ahw-opencode-v6-draft/`，候选内不保留该 edition。
- 审计 `impacts` 只能指向已发布 v4 中存在的小节与引用（候选校验要求 impact 的 question/section/source_refs 在 topic 的某个 chapter 内）；本轮新增证据的 ref id 记录在 `investigation_notes`，完整正文在草稿。

## 复核意见的修正（全部固定在 292cb5a1）

### 1. 加载顺序：补入 integration 文档层与条件插入的 project_overlay

`packages/core/src/config.ts`：

- `382-391`：`below = [...managedPolicies, ...integrated, ...wellknownDocuments.flat(), ...globalSupplementary, ...explicit, ...direct, ...projectSupplementary]`，`above = [...content, ...managedSettings]`。
- `394-403`：`project_overlay` 由 `FlagResolve` 解析，开启且目录存在时在 `below` 与 `above` 之间插入 `overlay.path` 的目录。
- `344-345`：注释说明 integration 文档紧跟受管 policies：其普通设置低于远端、用户与项目配置，其 policies 反超这些来源，只有受管 policies 高于它。
- `51-55`：`integration` 接口注释同样写明“loads right after managed policies”。

草稿的 `config-sources` 与 `config.sources` 已按上述十条层级的真实数组重写，包含 `experimental.project_overlay` 条件项，并明确这是 `below`/`above` 的拼接结果而不是一个简化列表。新增引用：`ref-opencode-config-load-array`、`ref-opencode-config-integration-order`、`ref-opencode-config-overlay-layer`。

### 2. 策略权威与 Console 机制

`services/site/src/docs/content/policies.mdx`（旧 `services/www` 文档树在固定提交已不存在）：

- `276-283` 权威表（高到低）：macOS 受管偏好域 → 系统 `opencode.json(c)` → 连接的 OpenCode Console 工作区 → 全局配置 → 直接 `opencode.json(c)`（外层胜过内层）→ `.opencode/opencode.json(c)`（外层胜过内层）。
- `303-308`：Console 工作区把 Providers/Tools 策略编译成普通 `policies` 语句，“ranks right below managed preferences and the system file”，且“Managed preferences and the system file still override the workspace”。

`packages/core/src/managed-policy.ts`：

- `9-22`：`statements()` 只取文档条目、`toReversed()` 后按文档拼接 `policies`；integration 文档的 policies 来自其连接的组织，`organization` 只用于拒绝消息，不存在单独的组织语句参数。
- `28-39`：`match()` 用 `findLast`，`decision()` 无匹配时返回 `allow`。

草稿已删除“Console 最高、其次受管偏好”的旧表述，改为上述顺序；跨文档段说明 Console 策略作为 `ConfigIntegration.Document` 进入同一数组、与普通文档同路求值。同时删除“另一棵文档树……第 7、8 位”的旧说法（`packages/web` 文档树停更在更早提交，不再用于本章结论），并去掉受管层推导里“权威表第 2、3 行”的行号引用。新增引用：`ref-opencode-config-doc-precedence`、`ref-opencode-config-doc-console`、`ref-opencode-config-policy-source-order`、`ref-opencode-config-policy-find-last`。

### 3. 策略 action 的八个取值

`packages/schema/src/config/policy.ts`：

- `18-27`：`provider.use`、`tool.use`、`integration.connect`、`integration.use`、`mcp.use`、`skill.use`、`plugin.use`、`websearch.use`。
- `36-43`：`integration.use` 的 `mcp:`/`skill:`/`plugin:` 资源前缀在解码时转换为对应 action；裸 `integration.use`（含 `*`）保留动作，改按 provider 与账号解释。

草稿的 `config-policies` 段已改为八值，并补一行 legacy 前缀迁移说明。新增引用：`ref-opencode-config-policy-actions`、`ref-opencode-config-policy-legacy`。

### 4. 迁移段的 normalizeAction

`packages/core/src/v1/config/migrate.ts:28-34`：`normalizeAction` 把 write/patch/apply_patch → edit、task → subagent、bash → shell，再落到 `renamedTool` 的媒体工具映射。草稿的迁移段已补这条规则，并注明新的 `permissions` 数组只做媒体工具改名、不经过这层键改写。新增引用：`ref-opencode-config-normalize-action`。

## 逐文件 triage（不变部分）

### `packages/core/src/config/normalize.ts` → config.migration

新增 `renameTools` 并应用到原生 `permissions` 与 `agents.*.permissions`；改名表在 `v1/config/migrate.ts:36-41`（`experimental_image_generate`→`generate_image`，`experimental_video_generate`→`generate_video`）。`packages/core/src/config/plugin/agent.ts:182-188` 对配置插件加载的 agent 文档做同样改写。加载顺序、合并顺序与 policies 编码逐字未变。

### `packages/schema/src/config/experimental.ts` → config.defaults

hunk 本身只是 schema 描述变化。语义变化在 `flag.ts`（移除 `video_generate`；新增 `model_speeds`、`opencode_api`；新增 `localOnly`，`opencode_api` 同属 optInOnly 与 localOnly）与 `tool/plugin/video-generate.ts`（无 `Flag.enabled("video_generate")` 门禁；`models.available(["video"])` 非空且 `experimental.video_generate !== false` 时注册；配置变更经 `ConfigEntryObserver` 重载）。

### `packages/core/src/session/compaction.ts` → 无知识变化（bug fix）

`recentStart` 不再强制从 user 消息边界开始，按每条消息 `+1` token 估算；最新一条自身超过 `keep` 时随摘要一起压缩；shrink 重试里 `request === shrink.history` 也改走文本。CHANGELOG 记为 “Fixed compaction retaining more recent history than `keep.tokens`…”。章节答案（`keepID`、从 `keepID` 起在内存拼回 recent 文本、只存一份）不受影响。

### `packages/core/src/session/projector.ts` → 无知识变化（bug fix）

唯一 hunk 把 `->` 换成 `json_extract`，注释与 CHANGELOG 都说明原因是 macOS 12 自带 SQLite 3.37 不支持 `->`。表结构、列、事务边界、路径未变。

### 包版本

根与各包 `package.json` 由 `2.3.0` 到 `2.4.1` 是 private 单仓版本；登记 npm `opencode-ai` 仍为 `1.19.6`，identity 未变。既有审计不记录单仓版本，也没有软件版本映射；不新增映射。

## 证据与文件处置

本轮新增并固定在 `292cb5a164786f73f4f32e5caec0c7aafe98b494` 的 9 个 artifact（每个带同 id 的 `source_revision` snapshot）：

| 文件 | 引用 |
| --- | --- |
| `packages/schema/src/config/flag.ts` | `ref-opencode-config-flag-defaults`、`-flag-tiers`、`-flag-opencode-api`、`-flag-model-speeds` |
| `packages/schema/src/config/experimental.ts` | `ref-opencode-config-experimental-video` |
| `packages/core/src/config/normalize.ts` | `ref-opencode-config-rename-native-permissions` |
| `packages/core/src/v1/config/migrate.ts` | `ref-opencode-config-renamed-tool`、`ref-opencode-config-normalize-action` |
| `packages/core/src/tool/plugin/video-generate.ts` | `ref-opencode-config-video-tool-gate` |
| `packages/core/src/config.ts` | `ref-opencode-config-load-array`、`-integration-order`、`-overlay-layer` |
| `packages/schema/src/config/policy.ts` | `ref-opencode-config-policy-actions`、`-policy-legacy` |
| `packages/core/src/managed-policy.ts` | `ref-opencode-config-policy-source-order`、`-policy-find-last` |
| `services/site/src/docs/content/policies.mdx` | `ref-opencode-config-doc-precedence`、`-doc-console` |

- **移出候选：** `knowledge/opencode/chapters/opencode-configuration-v6.md` → `/tmp/ahw-opencode-v6-draft/knowledge/opencode/chapters/opencode-configuration-v6.md`（保留路径）。
- **保留在候选：** 上述 artifact/snapshot/reference（本轮证据记录）、本审计 YAML 与本报告。
- **未动：** `registry/chapter-current.yaml`（仍为 `opencode-configuration-v4`）、旧 artifacts/references、其他七个主题的章节。

## 验证

- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-4/candidates/opencode` → 退出码 0（候选含 441 个文件；v6 移出后通过）。
- 9 份新文件在固定提交重新取回并核对 sha256；引用 locator 均在文件行数内，摘录按仓库现有去缩进约定与对应行段逐行一致，均 ≤800 字符。
- 草稿的 frontmatter/正文引用自检：每个 answer 的 `source_refs` 都在其小节 `source_refs` 中且有 `[@ref-…]` 标记；已删除不再使用的 `ref-opencode-config-trust`、`ref-opencode-config-policies-doc-precedence` 的小节引用（记录本身保留）。
- 未运行 `pnpm knowledge:validate`、`pnpm sources:audit-log`、`git diff --check`（协调者的聚合步骤）。

## 未决

- 等待同一独立 reviewer 复核修正后的草稿；批准前不切 `chapter-current.yaml`、不把草稿放回候选。
- `pending_audit_refs` 的 8 条旧审计及其未完成问题（`config.overrides`、`providers.models`、`providers.forwarding`、`providers.responses`、`agents.*`、`mcp.*`、`skills.*`、`transcripts.scope`/`cleanup`/`diagnostics` 等）本轮未派发、未改章，也不视为已解决。
- 草稿中的 `config.overrides` 仍为 `partial`：普通对象/数组的跨文件合并与空值/删除标记语义在本轮证据范围内仍未找到实现说明。
