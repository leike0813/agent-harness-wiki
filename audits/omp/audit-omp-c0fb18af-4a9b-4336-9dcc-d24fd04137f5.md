# omp 维护报告（2026-11-25）

## 范围与来源身份

- 产品：`omp`
- Git：`source-omp-repo`，`e4fe8782978e19c5de8b8830d050b95e63fc89ca` → `7f5fdfa3e4c5621cab857de46a8d75fbf3547e70`
- npm：`source-omp-npm`，`19.1.1@sha512-x/7xQXQ5F/ga4LTNOCSQs+cggWY1H5EF34+juTPP9QOyoFgfmOFVspXA4cBCp9EH8D967oje/HiCPpoNsWAyhw==`（unchanged，不造映射）
- 只读 22 个被引用文件的 compare hunk；另补读 `docs/mcp-protocol-transports.md`（确认冲突）与 `src/mcp/host/peers.ts`（探针实现）、`docs/extensions.md`（CHANGELOG 指向的迁移节）。未重扫来源，未运行产品。

## 逐文件 triage

| 文件 | 结论 |
| --- | --- |
| README.md | pi-tui 包描述文案；无固定问题变化 |
| docs/cli-reference.md | `--no-tools`、`--no-extensions`、`--offline`；configuration `config.runtime` |
| docs/environment-variables.md | Otari 区域登录/复合 baseUrl 说明 → `providers.auth`；通知变量不在八主题 |
| docs/provider-quirks.md | Otari 登录与复合凭据 → `providers.auth`；aiand 默认模型、StepFun 过滤属 provider 细节；alibaba 路径搬迁 |
| docs/providers.md | agy OAuth 刷新保留原生会话 → `providers.responses` |
| docs/session-operations-export-share-fork-resume.md | Tern 内 `/fork` 落位；交互操作，不改记录机制 |
| docs/session-switching-and-recent-listing.md | picker 路径从 packages/tui 迁到 coding-agent；无行为变化 |
| docs/session.md | `model_change.fallback` 与脱敏导出 → `transcripts.schema`；角色归属表仅模块搬迁 |
| docs/settings.md | `eval.tools.enabled` 默认 `true`→`false` → `config.defaults` |
| packages/coding-agent/CHANGELOG.md | 扩展 UI breaking change、retry fallback、--no-tools、crossInstance、--no-extensions、MCP step-up/stdio 探针/工具顺序、PI_CONFIG_DIR 路径 |
| src/config/settings-ui.ts | UI 能力探测内部实现；无设置语义变化 |
| src/config/settings.ts | `isLightTheme` import 搬迁；无迁移/层序变化 |
| src/main.ts | `--no-tools` 同时 `restrictToolNames` + `disableExtensionDiscovery` |
| src/mcp/host/peers.ts | stdio 探针 initialize-first；与官方文档冲突（hold） |
| src/mcp/tool-bridge.ts | HTTP 403 `insufficient_scope` step-up（hold，mcp.auth）；渲染器方法移除（plugins.api 旁证） |
| src/modes/settings.ts | `tui.tight` effect 修复与常量搬移；默认值表未变 |
| src/session/session-anonymizer.ts | `fallback` 的 identity/enum/error 脱敏规则 |
| src/session/session-entries.ts | `ModelFallbackCause` 与 `ModelChangeEntry.fallback` |
| src/session/session-manager.ts | `appendModelChange` 据 `fallback` 推导 `resolvedModelIsFallback` |
| src/session/session-paths.ts | ttyid import 搬迁；路径解析未变 |
| src/session/session-tools.ts | `presentationOrder` 固定非内置工具顺序（hold，mcp.exposure）；find-hint 重建非固定问题 |
| src/task/settings.ts | `task.crossInstance` 默认 `false`→`true` |
| src/stats/src/parser.ts | 注释文案 |
| docs/extensions.md（补读） | 扩展 UI 导入契约、迁移表与加载错误 → plugins.api / hooks |

## 受影响问题与排除理由

- 已交付：`config.runtime`、`config.defaults`、`agents.entry`、`agents.limits`、`providers.auth`、`providers.responses`、`hooks.input`、`hooks.conditions`、`hooks.diagnostics`、`plugins.discovery`、`plugins.api`、`plugins.diagnostics`、`skills.roots`、`transcripts.schema`。
- 保持原样：`config.sources/overrides/migration/diagnostics`、`agents.format/roles/invocation`、`providers.entry/protocol/models/metadata/forwarding/diagnostics`、`hooks.events/entry/output/order`、`plugins.model/package/install/lifecycle`、`skills.discovery/collision/format/extensions/loading/invocation/conditions/diagnostics`、`transcripts.scope/location/naming/format/lifecycle/database/archive/cleanup/diagnostics` —— 该区间没有对应 hunk 改变其答案。
- 排除：bash/内置命令、TUI 渲染、图像处理、LSP、daemon 等 CHANGELOG 条目不在八主题的固定问题内；npm 版本未变，不造软件映射。

## 章节与记录

新建 7 个完整 edition 并切换 current：

- `omp-configuration-v10`（`--no-tools` / `--no-extensions` / `--offline`、`eval.tools.enabled`、`task.crossInstance`）
- `omp-custom_agents-v6`（crossInstance、`--no-tools` 继承）
- `omp-custom_providers-v7`（Otari 区域登录与复合凭据、agy 刷新连续性）
- `omp-hooks-v4`（UI 导入契约、`--no-tools` 互斥、加载错误）
- `omp-local_transcripts-v7`（`model_change.fallback` 与脱敏规则）
- `omp-native_plugins-v5`（扩展渲染 breaking change、`--no-extensions` 范围）
- `omp-skills-v5`（`PI_CONFIG_DIR` 下项目 manifest 路径）

新增 13 个 `git_source_file` artifact 与同数 snapshot（commit `7f5fdfa3`，仅仓库相对路径与 content_sha256），以及 26 条 reference（`ref-omp-cfg10-` 9、`ref-omp-providers7-` 4、`ref-omp-lt7-` 6、`ref-omp-plugins5-` 6、`ref-omp-skills5-` 1）。旧记录未改字节。

## 阻塞与复核

- `mcp.transport`：同一 commit 内官方文档仍写 stdio 探针 discover-first（`docs/mcp-protocol-transports.md` 62-63 行），而 CHANGELOG 113 行与 `src/mcp/host/peers.ts` 的 `probeStdio()` 是 initialize-first。不能由版本、分发或条件差异解释，按高影响 hold，`omp-mcp-v6` 保持 current；草稿与证据清单在 `/tmp/omp-hold/`（`omp-mcp-v7-draft.md`、`README.md`），待独立 reviewer 确认后再决定是否建 edition 与 refs。
- `mcp.auth`（403 `insufficient_scope` step-up）与 `mcp.exposure`（非内置工具名序）证据完整，但与 `mcp.transport` 同主题，随 mcp edition 一并 hold。
- 上游文案疑似发布错误：CHANGELOG 7-8 行与 `docs/extensions.md` 1565 行把新旧包名写成同一个 `@oh-my-pi/pi-tui`（"X was replaced by X"），同段列出的上游包名是 `@mariozechner/pi-tui` / `@earendil-works/pi-tui`。章节按上下文写"旧的 pi-tui 包"并保留两个上游包名，未断言被移除包的确切名字；建议复核时一并确认。
- 历史 pending 审计（`71dcf159`、`217604e7`、`3c1ebdef`、`b55d7a06`、`2bb2e7b7`）保持原状态；本审计不引用它们，也不通过 reviewed 状态间接关闭。
- 作者自检：`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/omp` 通过（exit 0）。因存在待审问题，本审计保持 `review_status: pending`、`pending_question_ids: [mcp.transport]`。
