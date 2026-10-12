# Autohand Code CLI 上游审阅报告 · 2026-10-13

## 给维护者的结论

`source-autohand-repo` 从 `8e62478053e9` 前进到 `6e69ad6b9c5c`。25 个变更路径里只有一组影响已发布知识：Autohand AI Cloud 的限流重试范围、单次请求的工具数量上限，以及云端 prompt caching 的工具播种方式。`custom_providers` 章节的「参数转发与响应处理」小节据此新建 `autohand-cli-custom_providers-v2`，其余七个主题的当前章节一字未动。

扫描器把这次差异铺到了全部八个主题，本次逐个 hunk 复核后确认那是过宽的推断：`docs/config-reference.md` 只新增了一个 Computer Use 环境变量行，`src/mcp/McpClientManager.ts` 与 `src/core/toolFilter.ts` 的改动全部落在托管光标会话或工具打分之内，`src/computer/*`、`src/testing/*`、`tests/*` 属另一个子系统。没有发现来源冲突，也没有已发布配置步骤被推翻。

## 变化的意义与证据边界

### Autohand AI 限流：token 吞吐也进入重试预算

`docs/providers.md` 的 Rate Limiting 段落改写为「请求/分钟限流**与输入/输出 token 吞吐限流**都在配置的尝试预算内重试，遵守有界 `Retry-After` 且等待期间可取消；5 小时/24 小时/周/月配额立即结束回合」。旧文档写的是输入/输出 token 吞吐限流与长窗口配额一样会立即结束回合。

已发布句子没有被推翻，但遗漏了 token 吞吐这一类。运行时确认：`src/providers/LLMGatewayClient.ts` 596-628 行早已把 token 吞吐桶按「分钟内回填」的短暂节流处理，本次并未修改该文件——即文档这次是在追平既有实现，而不是行为刚变。因此 `providers.responses` 的重试范围按新文档补齐，证据定位到 `docs/providers.md` 的 Rate Limiting 小节。

### 单次请求能带多少工具，改由 provider 声明

`src/providers/LLMProvider.ts:14-18` 给 provider 能力契约加了可选 `maxTools`（单次请求可接受的 function 定义上限，不声明即不限制）；`src/providers/AutohandAIProvider.ts:212-223` 只对 `grok-4.7` 声明 `maxTools: 128`，其余云端模型与本地 provider 不声明。

超限时不是简单截断：`src/core/toolFilter.ts` 新增 `limitToolSelection` 打分后保留前 N 个（`tool_search`/`tools_registry` 100、用户消息命中类别 80、近期已调用工具 70、`tool_search` 发现命中 60、Computer Use 意图 50、`always` 类别 40、当前相关工具 20），`src/core/agent/ReactLoopRunner.ts:765-768` 每轮套用；云端缓存路径 `ReactLoopRunner.ts:294-303` 用 `maxTools ?? 128` 给初始播种封顶。这属于 `providers.forwarding`（哪些内容进入请求）与 `providers.responses`（工具调用如何处理）。

云端缓存的默认开启与 `features.promptCaching: false` 退出方式来自同一段落；运行时门控位于 `selectCacheStableTools`（要求 Autohand AI Cloud 且 `isPromptCachingEnabled() === true`）。注意 `src/core/agent/PromptCache.ts:30-34` 在未显式配置时按是否使用 Autohand AI Cloud 取默认，而 `src/features/featureRegistry.ts:190-191` 把同一键登记为 `defaultEnabled: false` 的实验项——两处口径不同，本次只按固定文档陈述默认值，未对该差异下结论。

## 本次发布与保留

| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_providers | autohand-cli-custom_providers-v2 | providers.forwarding：partial；providers.responses：partial | 新建版本并切换 current 指针，保留 v1 文件 |
| configuration | autohand-cli-configuration-v3 | 无（新增的 `AUTOHAND_COMPUTER_USE_GLIDE_MS` 未被任何已发布句子陈述） | 保留旧版本 |
| mcp | autohand-cli-mcp-v2 | 无（改动全在托管 Computer Use 光标会话分支内） | 保留旧版本 |
| skills / hooks / native_plugins / custom_agents / local_transcripts | 各自当前版本 | 无 | 保留旧版本 |

**发布：** worker 不发布、不切换本地指针；候选交付交回 monitor（`delivery=pr`）。**受管二进制：** 本轮为 `delivery=pr`，不执行 `managed:packages`。

## 待处理与独立复核

**审计记录：** `audits/autohand/audit-autohand-51724e1f-9bea-4ce2-b7c5-1b244a663db9.yaml`。**待处理旧审计：** 无。**待复核问题：** 无——本轮结论是单一主题内的补充，没有来源冲突、没有推翻已发布配置步骤、没有跨主题关键加载机制变化，按普通更新由作者自检结案（`review_status: reviewed`）。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-autohand-repo | `8e62478053e907977636a7a726ac0ddba2179276` → `6e69ad6b9c5c2d9655834d4c13a28cf5be636a18` | changed；25 个路径，逐个读 hunk；provider 与工具上限部分进入章节，Computer Use / CI / 测试部分排除 |
| source-autohand-npm | `0.9.8@sha512-cCtxlU3K…` → 同 | unchanged；因此不创建任何版本映射 |
| source-autohand-docs-*（9 个官方文档源） | 内容 hash 未变 | unchanged |

## 验证与差异入口

```sh
pnpm maintenance:candidates check --candidate /tmp/ahw-batch-1791831061/candidates/autohand
```

通过（`harness_id: autohand`）。未运行全库 `pnpm verify`（由协调者统一执行）。

本轮新增：`knowledge/autohand/chapters/autohand-cli-custom_providers-v2.md`、5 个 `ref-autohand-m62-*` 引用及其 `m62` snapshot/artifact（`git_source_file`，commit `6e69ad6b9c5c2d9655834d4c13a28cf5be636a18`，hash 取自 workspace 字节），`registry/chapter-current.yaml` 的 `custom_providers` 指针，以及本报告与审计 YAML。所有 `git_source_file` 只记 commit、仓库相对路径与内容 hash，候选内不含任何 checkout 副本。