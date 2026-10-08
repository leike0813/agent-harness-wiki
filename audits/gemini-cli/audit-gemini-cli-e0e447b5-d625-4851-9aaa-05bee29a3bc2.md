# gemini-cli 维护报告（audit-gemini-cli-e0e447b5-d625-4851-9aaa-05bee29a3bc2）

## 来源观察

- `source-gemini-cli-repo`：`fb972b2f87fe7d5b06d37eac711490162d98de2c` → `44d764ee579610bf73c43107f5e0422cd92588b9`
  （提交标题 `fix(auth): prevent infinite verification and OAuth retry loops`），79 个文件。
- `source-gemini-cli-docs`：hash 未变。
- `source-gemini-cli-npm`：`0.62.0` → `0.63.0`。

## 语义 triage

本轮分类 `maintain`。理由：变更中包含两处"同一配置键上有多个来源"的机制，并新增了两个
第一方设置键（`telemetry.otlpHeaders`、`mcpServers.*.oauth.authorizationResponseIssParameterSupported`），
属于配置字段、优先级与加载条件变化，不是排版或无关代码。

新增键的实际链路（均在 commit `44d764ee` 核实）：

1. `telemetry.otlpHeaders`（`packages/cli/src/config/settingsSchema.ts:3242-3246`、
   `schemas/settings.schema.json:4285-4291`）为对象、值全字符串、无 `default`。
2. 解析与合并在 `packages/core/src/telemetry/config.ts`：`parseOtlpHeaders` 支持 JSON 对象串或
   逗号分隔 `k=v`；`resolveTelemetrySettings` 按 `settings.otlpHeaders` →
   `OTEL_EXPORTER_OTLP_HEADERS` → `GEMINI_TELEMETRY_OTLP_HEADERS` → argv 的顺序合并并按大小写
   不敏感覆盖；解析失败抛致命配置错误并点名变量，不回显原值。
3. 生效点：`packages/core/src/telemetry/sdk.ts:283-300`，HTTP 协议传给三个导出器的 `headers`，
   空对象时传 `undefined`。
4. `oauth.authorizationResponseIssParameterSupported`（`settingsSchema.ts:3117-3128` 与
   `3190-3201`，两处 schema 定义）优先级为
   `requireIssInResponse = 配置值 ?? Boolean(config.issuer)`（`oauth-provider.ts:411-422`）；
   元数据发现时 `authorization_response_iss_parameter_supported` 被归一化成显式布尔，只有严格
   `true` 才置真（`oauth-utils.ts:316-331`）；回调侧缺失 `iss` 时拒绝
   （`utils/oauth-flow.ts:280-288`）。文档口径一致（`docs/tools/mcp-server.md:336-347`）。
5. 附带发现：`packages/cli/src/config/settings.ts` 为不可写的 workspace 设置文件补上两条明确
   错误消息（home 目录场景与不受信任场景），属于 `config.diagnostics` 的"文件已写但没生效"
   可观察线索。

## 受影响与排除

- 受影响问题：`config.overrides`（两处逐键优先级）、`config.defaults`（新增键无默认值）、
  `config.diagnostics`（写回错误与启动期致命错误）；`config.sources` 仅在新增键的落盘位置上受影响。
- 排除项 `packages/core/src/core/client.ts`、`geminiChat.ts`、`services/chatRecordingService.ts`：
  改动是丢弃未应答工具调用回合、会话初始化幂等与 `messages ?? []` 兼容，未触及 settings 加载、
  环境变量解析或 schema 校验入口，因此不进入配置章节，也不据此扩到 `local_transcripts`。
- `packages/core/src/agents/auth-provider/oauth2-provider.ts`（并发认证合并、401 重试计数）属
  认证机制而非配置加载，超出本任务固定问题范围，未写入；如需覆盖应由协调者另开范围。

## 官方文档来源未验证

`source-gemini-cli-docs` 与 `source-gemini-cli-npm` 在本工作树内没有可比较的旧原件
（`archive/` 下不存在 gemini-cli 目录），因此本轮**不能**判定这两个来源"无影响"；它们的状态
记为未验证。本章引用的文档内容全部取自仓库内 `docs/` 树在 commit `44d764ee` 的原文，按
`source-gemini-cli-repo` 的 `git_source_file` 记录，未建立任何 npm 发行版映射。

## 候选结果

- 新建 edition `gemini-cli-cli-configuration-v2`（v1 原样保留），新增小节
  `config-per-key-precedence`，给出两处逐键优先级、最小 JSON 示例与明确缺口。
- 新增 10 个 artifact（`git_source_file`，commit `44d764ee`）、11 个 snapshot、17 条 reference。
- `registry/chapter-current.yaml` 的 configuration 选择改指 v2。
- `pnpm maintenance:candidates check --candidate …/candidates/gemini-cli` 通过（exit 0）。
- 复核：`review` 未安排独立 reviewer。本轮是来源级增量维护，未出现来源冲突，也未推翻已发布的
  配置步骤，故按简报记为不需要独立复核；`config.overrides` 仍为 `partial`。