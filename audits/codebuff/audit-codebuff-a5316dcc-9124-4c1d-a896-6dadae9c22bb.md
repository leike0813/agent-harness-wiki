# codebuff 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:04:30.674Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 configuration、custom_providers 主题的 4 道固定问题。

## 变化的意义与证据边界

1 个 Git 仓库来源变更（111 个文件）。已发布引用落在 cli/src/utils/settings.ts（新增 displayAds、displayAdSplashHiddenOn 两个设置项与校验）与 sdk/src/impl/byok-request.ts（新增 isOpenAIReasoningModel：GPT-5 及以后与 o 系列按模型或部署名判定，不含 gpt-4o、gpt-4.1）的行定位不再命中。

cli/src/utils/logger.ts 新增 error-log-redaction 的 clipErrorLogString、sanitizeErrorLogData 脱敏调用；agents/base2/base2.ts 的 free 模式默认模型由 FREEBUFF_MINIMAX_M3_MODEL_ID 改为 FREEBUFF_MIMO_V25_MODEL_ID；cli/src/commands/command-registry.ts 新增 deals 命令。

config.sources/config.diagnostics 对应新增设置项的读写与校验路径；providers.forwarding/providers.responses 对应 BYOK 请求中 reasoning effort 的剥离规则变化。

### 派发问题与证据入口

- `config.sources`：cited source file changed at the published locator；cli/src/utils/settings.ts (cli/src/utils/settings.ts:84-130)
- `config.diagnostics`：cited source file changed at the published locator；cli/src/utils/settings.ts (cli/src/utils/settings.ts:84-130)
- `providers.forwarding`：cited source file changed at the published locator；sdk/src/impl/byok-request.ts (sdk/src/impl/byok-request.ts:235-323)
- `providers.responses`：cited source file changed at the published locator；sdk/src/impl/byok-request.ts (sdk/src/impl/byok-request.ts:235-323)

## 待处理与独立复核

**审计记录：** `audits/codebuff/audit-codebuff-a5316dcc-9124-4c1d-a896-6dadae9c22bb.yaml`。**待处理旧审计：** audit-codebuff-1c23337c-6204-49c1-a163-096fdaf80896、audit-codebuff-d8c97acc-bd10-4208-b191-091fbae8bbcd、audit-codebuff-0671d492-ab49-4906-8bfb-81cb980f31de、audit-codebuff-942168de-bfea-482d-a384-2eac2690e5de。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-codebuff-repo` | 6a83aef15ec7 → 2ce179012eb9 | changed |
| `source-codebuff-docs-skills` | a6ea24958295 → c3ee399e0bc2 | changed |
| `source-codebuff-docs-mcp` | 466a29321b60 → 81ba51373fa2 | changed |
| `source-codebuff-docs-agent-reference` | 2515c7b27df9 → 20b85820f565 | changed |
| `source-codebuff-docs-agents` | 8da6f65e9991 → d258c52a8e40 | changed |
| `source-codebuff-docs-knowledge` | 1cd29497231d → d4ca3b2be19f | changed |
| `source-codebuff-docs-troubleshooting` | 25f718731ca9 → 518183844663 | changed |
| `source-codebuff-docs-agent-troubleshooting` | 915634b96cd9 → 7d73e4d0ba33 | changed |
| `source-codebuff-docs-how` | 5cc57153dbaf → cd061ee47295 | changed |
| `source-codebuff-docs-quickstart` | 35aebb24bcc4 → 8188260bf219 | changed |
| `source-codebuff-docs-sdk` | f58cc903834b → ebd7cc10c548 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
