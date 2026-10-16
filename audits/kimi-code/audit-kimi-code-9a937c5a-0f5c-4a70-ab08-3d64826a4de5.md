# kimi-code 维护报告 · audit-kimi-code-9a937c5a

- 产品：`kimi-code`，界面：`cli`，日期：2026-10-13
- 观察：`source-kimi-code-repo` `c9f01f07388abc2cdca40c9c5267f58c65086710` → `cbd754049a114ee36d1b27675c82819e4963c692`（108 个 changed paths，单提交 `chore: remove unused kaos package and MCP kaos executor option (#4184)`）
- 其余来源 unchanged：legacy repo 停在 `9ab1286b`，npm 仍为 `2.1.1` 且 integrity 相同
- 工作区：`/tmp/ahw-source-workspaces/ws-cbd754049a11-d52fb2c7-ea0f-45b5-9295-417409c1982f`（coordinator 已 pin，只读）

## 语义 triage

scanner 以「shared or unknown impact」把八个主题全部标记为受影响。逐组读实际 hunk 后只有一处落在已发布知识上：

**MCP stdio server 的 `executor` 字段枚举收窄。**

- `packages/agent-core-v2/src/mcpCore/config-schema.ts`：`executor: z.enum(['local','kaos'])` → `z.enum(['local'])`
- `packages/klient/src/contract/mcp.ts`、`packages/node-sdk/src/config/schema.ts`：同名字段同样收窄（三处一致，无冲突来源）
- `packages/agent-core-v2/src/mcpCore/client-stdio.ts`：删除「非 `local` 取值抛 `NOT_IMPLEMENTED`」的分支，随枚举收窄成为死代码
- `packages/kaos/**` 整包删除（实现该取值的包，从未写入已发布章节）
- `docs/en|zh/customization/mcp.md` 未改动：官方文档从未描述 `executor`

已发布的 `kimi-code-cli-mcp-v2` 在「定义字段与传输方式」表中写的是 `local` 或 `kaos`，与新固定提交不符。

## 章节变更

新建 `knowledge/kimi-code/chapters/kimi-code-cli-mcp-v3.md`（v2 保留为历史 edition），只改 `{#mcp-definition}` 一节：

- 字段表 `executor` 行改为 `local`，并注明该取值已在本固定提交移除
- 紧随其后的未文档化字段提示句补一句：写 `executor: "kaos"` 的旧配置在本提交上校验失败，迁移时删掉该字段
- 该节与 `mcp.definition`、`mcp.transport` 两条答案的 `source_refs` 改指新引用

新增固定证据（均 pin 到 cbd7540，sha256 取自工作区字节）：

- `artifacts/artifact-kimi-code-src-mcp-config-schema-ts.yaml`（`git_source_file`）
- `snapshots/snapshot-kimi-code-src-mcp-config-schema-ts.yaml`
- `references/ref-kimi-code-src-mcp-schema-cbd7540.yaml`（`file_lines` 6–26）

`registry/chapter-current.yaml`：mcp 主题选择切到 `kimi-code-cli-mcp-v3`。其余七主题选择不变。未新增版本映射——源码 HEAD 不能证明 npm 2.1.1 的行为，且 npm 来源本轮 unchanged。

## 排除的主题与理由

| 主题 | 结论 | 依据 |
| --- | --- | --- |
| configuration | 已复核、无知识影响 | 新增 `KIMI_CODE_LLM_HEADERS_TIMEOUT_MS`（env-vars.md 的 Runtime switches 表 + `requester/timeout.ts`）是新的请求头超时开关；v2 对环境变量的表述是分工与举例，不含封闭变量清单，无已发布结论被推翻。`ref-kimi-code-env-switches` 的 section 定位与摘录未受影响 |
| skills | 已复核、无知识影响 | 108 个路径中无 Skill 发现/解析/注册表相关文件，`features/skill` 未改动 |
| custom_agents | 已复核、无知识影响 | 仅 `profile-shared.ts` 的 NotifyUser 提示文案与 readMediaFile 的 AbortSignal 透传；章节全文 grep `NotifyUser`/`Updates`/`notify_user` 零命中 |
| custom_providers | 已复核、无知识影响 | 协议、端点、凭据字段未变 |
| hooks | 已复核、无知识影响 | Hook 事件、matcher、执行与退出路径代码未改动 |
| native_plugins | 已复核、无知识影响 | 插件清单/store/安装/发现未触及；改动只是随 `packages/kaos` 删除而调整的构建脚本与 workspace 配置 |
| local_transcripts | 已复核、无知识影响 | 无会话记录、wire schema、blob、索引或数据根代码改动；node-sdk 删除的 RPC 条目属 SDK 传输面 |

## 复核与阻塞

- 无来源失败，无未解决冲突，`pending_question_ids: []`
- 判定不构成高影响：单一来源无冲突，只收窄一个从未被官方文档描述的字段取值，不涉及跨主题关键加载机制；按作者自检 `review_status: reviewed`
- 阻塞项：无

## 候选与验证

`pnpm maintenance:candidates check --candidate /tmp/ahw-batch-1791831061/candidates/kimi-code` 通过。delivery=pr：未 apply merge plan、未发布、未刷新受管二进制、未写主工作树或他产品候选。
