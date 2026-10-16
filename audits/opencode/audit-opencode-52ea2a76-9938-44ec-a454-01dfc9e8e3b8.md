# audit-opencode-52ea2a76-9938-44ec-a454-01dfc9e8e3b8 — opencode configuration

- harness: opencode
- checked_at: 2026-10-13T18:03:04.270Z
- previous_audit_id: audit-opencode-12691d48-1a45-4b04-bc22-ef7201bd564e
- role/delivery: worker / pr
- 本报告只覆盖 configuration 主题的固定问题；其余主题的问题仍留在 YAML 的 pending_question_ids 中。

## 来源观察

| source | kind | baseline | observed | 结果 |
|---|---|---|---|---|
| source-opencode-npm | npm_registry | 1.19.0 | 1.19.0（同一 identity） | unchanged |
| source-opencode-repo | git_repository | c57c448d31c390880e06493f81b91a2c92536ad9 | 0af756b30fa12764cec7affc52c400043d24ffa2（refs/heads/dev） | changed |

仓库差异为单提交 `0af756b3 docs(console): show Gemini 4 Argon discount with strikethrough pricing (#55206)`，456 个文件。证据取自固定工作区 `ws-0af756b30fa1-d8f00cc0-dc9a-4d2a-bd22-0e1d4d390562`（检出 0af756b3），直接读 `c57c448d..0af756b3` 的 hunk；未重新扫描来源，未运行 `sources:workspace open`。

## 提交主题与实际改动的关系

提交 subject 指向 Console 定价展示，但配置发现/合并路径同时发生了实质移动，因此不按 subject 排除。三个已引证据文件的逐文件 delta：

### packages/core/src/config.ts（+43 行）

- 加载数组新增 `systemSupplementary`，并在返回数组最前面展开（最低优先级）：
  `...systemSupplementary,` 位于 `...(yield* loadWellknown()...)` 之前（config.ts:250-253、262-270）。
- 新增 `loadPreferences`（config.ts:189-207）：`plutil -convert json -o - <plist>`，超时 10 秒，失败仅 `Effect.logWarning` 并返回空数组；成功后经 `ConfigVariable.substitute` 与 `parseInfo` 产出一个 `Document` 条目。
- `Options` 新增 `system: Schema.optional(Schema.Union([Schema.Boolean, Schema.String]))`（config.ts:52）；`global` 的注释由“false skips the global config dir …”改为“false skips the system and global config dirs …”。
- `configured()` 的 `deps` 新增 `AppProcess.node`（config.ts:404）。
- 新增 `import { AppProcess } from "@opencode/util/process"` 与 `import { ChildProcess } from "effect/process"`。

### packages/core/src/config/discovery.ts（+66 行）

- 新增 `systemDirectory()`（discovery.ts:27-32）：darwin → `/Library/Application Support/opencode`，win32 → `%ProgramData%\opencode`（缺省 `C:\ProgramData`），其余 → `/etc/opencode`。
- 新增 `preferencePaths()`（discovery.ts:34-40）：`/Library/Managed Preferences/<user>/ai.opencode.managed.plist` 优先于 `/Library/Managed Preferences/ai.opencode.managed.plist`。
- 新增 `preferenceMetadata` 集合与 `stripPreferenceMetadata()`（discovery.ts:42-57）：剔除 PayloadDisplayName / PayloadIdentifier / PayloadType / PayloadUUID / PayloadVersion / _manualProfile。
- `Sources` 接口新增 `system?: { path, present }` 与 `preferences?: AbsolutePath`（discovery.ts:16-18）。
- `configDirectories = [...(system ? [system] : []), globalDirectory]`（discovery.ts:71），并同时参与 `globalRoots`、`globalFiles` 以及项目遍历去重的 `globalRoots.slice(0, configDirectories.length)` 比较。
- `preferences` 仅在 `globalEnabled && (options?.system ?? true) === true && process.platform === "darwin"` 时选取（discovery.ts:110-117），注释说明自定义系统目录会取代平台发现并因此跳过本机偏好。

### packages/web/src/content/docs/config.mdx（+1/-1）

- 唯一 hunk 在 396 行：`chunkTimeout` 默认值由 `300000, or 5 minutes` 改为 `900000, or 15 minutes`。文档 154-178 行的 Managed settings 段落逐字未变。

### 同提交中作为默认值证据的实现文件

`packages/core/src/provider.ts` 把两个默认常量拆开：`DEFAULT_TIMEOUT_MS = 300_000` 保持不变，新增 `DEFAULT_CHUNK_TIMEOUT_MS = 900_000`（provider.ts:172-177、185-191），注释给出的理由是 DeepSeek 等 provider 要求客户端至少容忍 15 分钟。

## 逐固定问题结论

| question | 结论 | 依据 |
|---|---|---|
| config.sources | **答案改变**（answered） | 加载顺序新增受管系统层作为最低优先级来源；发现层新增 system 选项、平台系统目录与 MDM 偏好两条路径；系统目录进入全局去重集合 |
| config.defaults | **答案改变**（answered） | `chunkTimeout` 默认值 300000 → 900000，文档与实现一致 |
| config.overrides | 状态不变（partial） | 优先级序列位置改变，但字段级合并规则（数组拼接、例外键、空值/删除标记）在固定范围内仍无实现说明，维持 partial |
| config.runtime | 不受影响 | 新增的 `Config.Options.system` 是配置层构造参数，本提交未接到环境变量或 CLI 开关；`packages/cli/src/server-process.ts` 与 `packages/server/src/routes.ts` 的 diff 为空，`OPENCODE_CONFIG*` 四个变量的读取位置逐字未变 |
| config.migration | 不受影响 | `packages/core/src/config/normalize.ts` 与 `packages/cli/src/config/migrate.ts` 的 diff 为空 |
| config.diagnostics | 不受影响 | `opencode debug config` 仍打印按优先级排列的条目数组，`packages/cli/src/commands/commands.ts` 与 debug handler 的 diff 为空；只是列表最前面可能出现受管层条目 |
| config.trust | 答案改变（仍 conflict，触发独立复核） | 见下节 |

## config.trust：来源冲突的位置移动

v4 正文记载“按这些路径与偏好域名检索源码未再找到对应的读取入口”，这是上一固定提交的事实。本提交在 `config.ts` 与 `discovery.ts` 中恢复了两条受管读取路径，因此已发布的配置机制描述被新证据推翻。

冲突并未消失，只是换了位置：文档称“Managed settings are loaded at the highest priority tier”，实现把受管层放在加载数组最前（最低优先级），仅策略语句经反向求值取回最高权威。v5 保留 `status: conflict` 并把两条说法并列写出，未把任一方当作已解决。

这属于“新证据推翻已发布的配置机制描述”，按维护契约触发独立 reviewer。本轮未指派 reviewer，`review_status` 保持 `pending`。

## 排除的文件与理由

| 文件 | 排除理由 |
|---|---|
| `packages/ai/src/providers/google-vertex.ts`、`packages/core/src/plugin/provider/*.ts` | custom_providers 主题的 provider 实现，不改变任何已发布的配置来源、优先级或合并规则 |
| `packages/core/src/provider.ts` 的 `encoding` 键、`packages/schema/src/config/provider.ts` 的 `compatibility` 键 | provider settings schema 扩展，属 custom_providers；config 加载路径未变 |
| `packages/core/src/v1/config/migrate.ts`（V1 `setCacheKey` → `compatibility.supportsPromptCacheKey`） | V1→V2 provider 选项迁移；config.migration 的已发布答案取自 normalize.ts 与 cli/config/migrate.ts，两者未变 |
| `packages/app/**` 的 session/settings UI 与 e2e spec | 不进入任何已发布配置固定问题的证据链 |
| `packages/core/src/managed-policy.ts` | diff 为空，策略求值逻辑未变 |

逐文件核对为空的还有：`packages/core/src/config/normalize.ts`、`packages/cli/src/config/migrate.ts`、`packages/cli/src/commands/commands.ts`、`packages/cli/src/commands/handlers/debug/config.ts`、`packages/core/src/config/redact.ts`、`packages/cli/src/server-process.ts`、`packages/server/src/routes.ts`。

## 交付物

- 新建章节 `opencode-configuration-v5`（v1–v4 全部保留未删）。
- 新增 10 条 `git_source_file` 引用与 4 个固定快照，均只记 commit `0af756b30fa12764cec7affc52c400043d24ffa2`、仓库相对 file 与 `content_sha256`；未复制源码 checkout，未记录临时路径。
- `registry/chapter-current.yaml` 的 configuration 选择保持 v4：v5 是 `review_status: pending` 的未发布草稿，独立复核关闭前不切选择；其余七个主题未动。
- 未新增软件版本映射：npm 侧本轮 unchanged，仓库 HEAD 不足以证明已发布二进制行为。

## 候选自检

`pnpm maintenance:candidates check --candidate <candidate_root>` 通过（返回 `harness_id: opencode` 与文件清单，无 error 级诊断）。剩余的 `COVERAGE_INCOMPLETE` 为 warning 级，覆盖记录按目标版本未验证的既有状态，本轮未改变。

## 阻塞与待办

- 无来源阻塞：固定工作区可读，全部目标文件均可取到内容。
- 待独立复核：`config.trust` 的冲突改写（问题范围：config.trust，附带 config.sources 的受管层优先级表述）。
- 上游审计 `audit-opencode-0f16a4f4`、`audit-opencode-2aa143e4`、`audit-opencode-12691d48` 的 `review_status` 仍为 `pending`，本审计不通过标 `reviewed` 间接关闭它们。