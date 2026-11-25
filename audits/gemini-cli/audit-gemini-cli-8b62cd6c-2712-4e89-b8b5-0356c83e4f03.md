# gemini-cli 上游维护报告 · 2026-11-25

## 给维护者的结论

本轮 triage 分类为 `maintain`，固定来源 `source-gemini-cli-repo` 从
`9b6e0265d16bbd29ca51e33c9e0c01dc4cec5e83` 观察到
`08e9a20f749aefcbda38622ac757899c3d6216e0`（2026-11-24），比较 diff 覆盖 479 个文件，
其中 22 个与当前章节引用相交。文档与 npm 来源未变。

最终交付两个新完整 edition：

- `configuration` → `gemini-cli-cli-configuration-v4`（旧 v1–v3 原样保留）
- `mcp` → `gemini-cli-cli-mcp-v2`（旧 v1 原样保留）

`native_plugins` 复核后未新建 edition：本轮新增的安装锁/.lock 跳过不改变固定问题答案，
白名单加载容错已由未发布的 `gemini-cli-cli-native_plugins-v2` 记录且仍在等待独立复核。

## 来源观察与基线

| 来源 | 基线 → 观察 | 结果 |
| --- | --- | --- |
| `source-gemini-cli-repo` | `9b6e0265` → `08e9a20f` | changed（22 个被引用文件命中） |
| `source-gemini-cli-docs` | `8e1b4cbe…` 未变 | unchanged |
| `source-gemini-cli-npm` | `0.71.1@sha512-FYDTjU+…` 未变 | unchanged |

比较 diff 从 9b6e0265 起算，包含已被 configuration v3 / skills v2 / custom_agents v2 /
native_plugins v2 / local_transcripts v1 吸收的中间提交。本轮增量以各章已引固定提交为基线
（configuration 的 09d81bf1 与 44d764ee，mcp 的 38700b4b，native_plugins 的 v1/v2 基线）
逐文件比对，避免把旧提交重复计入。

## 逐文件 triage

| 文件 | 实际变化 | 判定 |
| --- | --- | --- |
| `docs/reference/commands.md` | 新增 `/stats heatmap` | 不属八主题，排除 |
| `docs/reference/configuration.md` | 新增 `model.requestTimeoutMs`；模型默认数据 | configuration，维护 |
| `docs/tools/mcp-server.md` | 新增 `oauth.allowPrivateNetwork` | mcp，维护 |
| `packages/cli/src/config/settings.ts` | 系统 MCP 命令安全检查；迁移写回 originalSettings；两遍解析沿用 | configuration + mcp，维护 |
| `packages/cli/src/config/settingsSchema.ts` | `requestTimeoutMs`、`allowPrivateNetwork`、主题 `active`/`focus` | configuration + mcp；主题字段排除 |
| `packages/cli/src/config/extension-manager.ts` | 安装/更新锁，`.lock` 目录跳过，link consent 参数 | native_plugins 无固定答案变化，见下 |
| `packages/cli/src/config/extension.test.ts` | 白名单加载容错回归测试（c10f094e） | 无独立机制；属于未发布 v2 |
| `packages/cli/src/gemini.tsx` | `--list-models`；沙箱前解析文件夹信任 | configuration.trust 维护；list-models 非配置优先级 |
| `packages/core/src/config/config.ts` | `getRequestTimeoutMs()` 三层优先级与全局 fetch 超时 | 不在初始交集，但为声明实现入口，补证 configuration |
| `packages/core/src/mcp/oauth-provider.ts`、`oauth-utils.ts`、`utils/oauth-flow.ts` | `allowPrivateNetwork` 透传与企业私网校验 | mcp.auth 维护；oauth-flow 仅透传 |
| `schemas/settings.schema.json` | 生成的 `requestTimeoutMs`、主题字段 | 由 settingsSchema 覆盖；主题字段排除 |
| `packages/cli/src/utils/sessionUtils.ts` | 会话列表按 lastUpdated 排序、显示净化 | local_transcripts，未派发 |
| `packages/core/package.json` | 版本与依赖 | 元数据，排除 |
| `packages/core/src/agents/registry.ts` | 项目层 agent 加载与确认 | custom_agents，未派发 |
| `packages/core/src/core/client.ts`、`geminiChat.ts` | provider 请求重试、历史加固、压缩 | custom_providers/local_transcripts，未派发 |
| `packages/core/src/services/chatRecordingService.ts` | 追加写目录重建、分块摘要 | local_transcripts，未派发 |
| `packages/core/src/skills/skillLoader.ts` | frontmatter BOM/引号/块标量 | skills，已由 skills v2 记录 |
| `packages/core/src/telemetry/sdk.ts` | 遥测缓冲上限、错误隔离、shutdown 清空 | 配置问题不涉及；排除 |
| `packages/core/src/utils/fileUtils.ts` | BOM/编码读取重构 | skills/local_transcripts 证据，排除 |
| `packages/core/src/utils/paths.ts` | tilde 边界、IDE 目录、Android 可信路径 | 不改 settings 路径与固定问题，排除 |

## 受影响问题与证据

### configuration（v4）

新增证据固定到 `08e9a20f`：

- `ref-gemini-cli-config-request-timeout-doc`（configuration.md 550-556）
- `ref-gemini-cli-config-request-timeout-schema`（settingsSchema.ts 1094-1106）
- `ref-gemini-cli-config-request-timeout-precedence`（core/config.ts 3693-3705）
- `ref-gemini-cli-config-request-timeout-apply`（core/config.ts 1428-1431）
- `ref-gemini-cli-config-migrate-original-settings`（settings.ts 1946-1965）
- `ref-gemini-cli-config-sandbox-trust`（gemini.tsx 755-767）

逐题：`config.overrides` 增加"同一键上 env > setting > 实验 flag"的第二个例外；
`config.runtime` 增加请求超时的环境变量覆盖路径；`config.defaults` 记录 schema 无 default
但文档有效默认 60000；`config.migration` 记录迁移同时改写 originalSettings、保留占位符；
`config.trust` 记录沙箱前的信任解析。`config.sources`、`config.diagnostics` 未变。

### mcp（v2）

新增证据固定到 `08e9a20f`：

- `ref-gemini-cli-mcp-doc-allow-private-network`（mcp-server.md 436-441）
- `ref-gemini-cli-mcp-allow-private-schema`（settingsSchema.ts 3145-3149）
- `ref-gemini-cli-mcp-oauth-private-hint` / `-literal` / `-dns`（oauth-utils.ts 54-63、134-148、159-171）
- `ref-gemini-cli-mcp-oauth-provider-private`（oauth-provider.ts 420-431）
- `ref-gemini-cli-mcp-system-server-sanitize` / `-command-sanitize` / `-block-excluded` / `-sanitize-scope`（settings.ts 1526-1549、1584-1598、1615-1635、1845-1855）

逐题：`mcp.auth` 增加 `oauth.allowPrivateNetwork` 的默认值、放行范围与仍然受限的地址；
`mcp.definition` 在字段清单中指向该 oauth 字段；`mcp.entry` 增加系统作用域的命令路径安全检查
（解包 `env`、解释器脚本、`mcp.serverCommand`、`mcp.excluded` 自动加入与跨作用域删除）；
`mcp.lifecycle` 说明被自动排除的名字同样阻止连接；`mcp.diagnostics` 增加两条 warning 文本。
`mcp.transport`、`mcp.capabilities`、`mcp.exposure` 未变（后者只受既有 `mcp.excluded` 语义影响）。

### native_plugins（不新建 edition）

`acquireExtensionInstallLock` 串行化同一扩展的并发安装/更新（15s 过期、约 7s 重试后报错），
`_buildExtension` 跳过 `.lock` 目录；安装源、`--ref`、link、uninstall 语义未变。这些是并发与
发现健壮性细节，不构成 `plugins.install`/`plugins.discovery`/`plugins.diagnostics` 的答案变化。
白名单加载容错（c10f094e）已经写在 `gemini-cli-cli-native_plugins-v2`，该 edition 仍未被选入
当前版本，仍需要独立复核；本轮不修改它，也不借新审计关闭它。

## 复核与自检

- 所有新增引用逐字取自 `08e9a20f` 的固定文件内容并按 file_lines 校验，excerpt 与源文件行完全一致。
- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/gemini-cli` 通过（exit 0）。
- 无来源冲突；新增结论是字段/条件增量，没有推翻已发布配置步骤，按普通更新由作者自检并记录
  `reviewed_by`/`reviewed_at`。mcp 新增的系统安全检查与 configuration 的逐键优先级属于同主题机制
  增量，未触及跨主题共享加载顺序本身。
- `pending_audit_refs` 按任务要求清空；历史 pending 审计
  （cc261cb8、dc9c7fa2、5e25c33c、cede4603）保持未结案。
- 未新增软件版本映射：证据均来自源码提交，npm 0.71.1 与官方文档未变，不能证明发行版行为。
