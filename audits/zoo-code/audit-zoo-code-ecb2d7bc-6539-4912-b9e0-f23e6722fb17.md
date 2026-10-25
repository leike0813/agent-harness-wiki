# zoo-code 维护报告（2026-10-22）

- 审计：`audit-zoo-code-ecb2d7bc-6539-4912-b9e0-f23e6722fb17`
- 观察：2026-10-22T12:57:23.673Z；`source-zoo-code-repo` 58341d8 → 05d01f3（486 个文件）、`source-zoo-code-docs` dfd2628 → d596980（3 个文件）、`source-zoo-code-docs-site` unchanged。
- 交付方式：`pr`，本 worker 只写隔离候选，不发布、不切指针、不跑二进制。

## 处理的固定问题

| topic | question | 结论 |
| --- | --- | --- |
| custom_providers | providers.entry / auth | 答案不变（档案仍在 SecretStorage，字段与作用域未变） |
| custom_providers | providers.protocol | **改写** → edition v6：删除并行 Vercel AI SDK 兼容实现，兼容层只剩 `BaseOpenAiCompatibleProvider` |
| custom_providers | providers.models | **改写** → edition v6：模型切换的受限 patch、Bedrock ARN 与组织白名单校验、公共目录后台刷新新增 IO Intelligence |
| custom_providers | providers.metadata | **改写** → edition v6：`ModelInfo.supportsToolCalling` |
| local_transcripts | transcripts.format | 答案不变（整份 JSON、原子 rename、锁内读-改-写） |
| local_transcripts | transcripts.scope | **改写** → edition v2：新增 `say` 值 `ignored_disabled_tools_warning` 会落盘 |
| local_transcripts | transcripts.schema | **改写** → edition v2：`say` 闭合枚举可读，新增该值；缺口收窄 |
| local_transcripts | transcripts.diagnostics | **改写** → edition v2：`TaskMessagesReadError` 区分 not_found/io_error/invalid 并附底层原因 |
| configuration | config.migration | 无知识变化（`nullableOptional` 只是类型断言；迁移标记与顺序不变） |
| custom_agents | agents.format / overrides | 无知识变化（`schemas/roomodes.json` 约束重排、语义等价；`mode.ts` 只改类型断言） |
| hooks | entry/input/output/order/conditions/diagnostics | 无知识变化（tool-policy 只剥离协议工具上的用户禁用权重，未新增事件或回调入口） |
| mcp | mcp.capabilities / mcp.exposure | 无知识变化（McpHub 为 Zod 4 API 迁移；能力枚举与暴露规则不变） |
| native_plugins | plugins.discovery/api/lifecycle/diagnostics | 无知识变化（build-tools 只删除未调用的包装函数） |

## 证据与候选

- 新快照：`snapshot-zoo-code-repo-20261022` + `artifact-zoo-code-repo-20261022`（commit `05d01f33d03a7fd54baf8b7c61acf53824c56358`，README.md sha256 `0b301f7ec7fa4705919c998aa9683723744458aab68accbb212dadd9970db76c`）。
- 新引用均固定到该快照，locator 与摘录逐条核对在范围内：`ref-zoo-code-src-openai-compatible-type-only-05d`、`ref-zoo-code-src-provider-model-patch-keys-05d`、`ref-zoo-code-src-provider-model-patch-05d`、`ref-zoo-code-src-provider-model-bedrock-05d`、`ref-zoo-code-src-provider-model-allowlist-05d`、`ref-zoo-code-src-provider-model-patch-webview-05d`、`ref-zoo-code-src-model-id-keys-05d`、`ref-zoo-code-src-model-info-tool-calling-05d`、`ref-zoo-code-src-model-cache-public-refresh-05d`、`ref-zoo-code-src-model-cache-public-providers-05d`、`ref-zoo-code-lt-cline-says-doc-05d`、`ref-zoo-code-lt-cline-says-list-05d`、`ref-zoo-code-lt-ignored-disabled-tools-say-05d`、`ref-zoo-code-lt-ignored-disabled-tools-comment-05d`、`ref-zoo-code-lt-task-messages-error-detail-05d`。
- 新章节：`zoo-code-vscode-custom_providers-v6`、`zoo-code-vscode-local_transcripts-v2`；旧版 v5 / v1 字节未动，`registry/chapter-current.yaml` 已切到新版。

## 行定位漂移为何没有全部改写

本轮 22 条（复核后范围更大）已发布引用的行号在新提交上不再命中，但每条引用绑定的是自己的固定快照（bf3bc78、d7963fc2、496bd11、1d37994、2baac5e 或 docs d596980 之前的 dfd2628），摘录与其自身 commit 一致；漂移来自同一文件较靠前的插入。只有支撑本轮**新事实**的定位改用新 id 并固定到 05d01f3，其余保持原引用，避免用无机制变化的行号刷新制造假修订。

## 未处理（超出本轮固定问题）

MCP OAuth 数据按 issuer 绑定（`mcp.auth`）、`collapseCommandOutputByDefault` 新设置（`config.defaults`）、协议工具不受用户 `disabledTools` 约束的完整规则（`mcp.exposure` 细节）、Task 的 API handler 释放与 abort 状态机重构。已在审计 `investigation_notes` 记录，留给后续按固定问题派发的轮次。

## 阻塞

无。`pending_audit_refs` 中四份历史审计仍为 pending，各有独立 blocker；本审计未关闭它们。
