# Mistral Vibe 上游审阅报告 · 2026-10-06

## 给维护者的结论

这一轮只有上游一个 commit，但内容不小：`7c19608` → `7cb9189`，1568 个文件。最要紧的一条不是任何新功能，而是**默认运行时反转了**。Vibe 现在恒定跑 Unified Harness，`--legacy-harness` 才选旧引擎，运行时缺失不再静默回退而是直接启动失败。这件事动的是以 `vibe/core/**` 为机制真源的整套运行时边界，因此我把它单独留给独立复核，没有随本批交付。

其余是有边界的增量：配置多了 `[utility_models]` 与每模型 `thinking_levels` / `max_context_length`，自动压缩阈值改成从窗口推导，跨 provider 的压缩模型从硬错误降级为警告加回落，`.env` 回退改成 0600，`/mcp` 在 Rust 前端多认一种展示名，插件内置根多接受宿主传入的一组，保留命名空间换了一批。

两处已发布章节里写死的事实已经过期并被推翻：本地 transcript 章节说 `generate_titles` 默认关闭、unified store 次版本是 7；provider 章节断言"固定来源里没有上下文窗口这个独立字段"。这三条都按新 commit 的实现改了。

`permission = "never"` 这条我建议 reviewer 特别看一眼：Unified 后端下敏感路径从"提问"变成"直接拒绝"，是收紧不是放宽，但只在 Unified 后端成立。

## 变化的意义与证据边界

### 默认运行时反转（高影响，待独立复核）

`resolve_harness_selection(*, experimental_harness, legacy_harness)` 不再读 GrowthBook 的 `vibe_cli_unified_harness_rollout`，docstring 写明理由是 rollout 缓存缺失或过期都不该选出另一套引擎；优先级只剩 `--legacy-harness` → 旧引擎，默认与 `--experimental-harness` → Unified（`vibe/_experimental_harness.py`）。`ExperimentName.UNIFIED_HARNESS_ROLLOUT` 的消费面被清成 `frozenset()`，注释解释无标记启动已无条件构造 Runtime 并快速失败，再上报曝光等于声称永不生效的处理（`vibe/core/experiments/active.py`）。

失败形态也变了：`HarnessProcess` 构造 Unified host 后的任何异常都 `raise runtime_startup_error(...)`，注释写明回退会在默认路径上构造旧 `AgentLoop`（`vibe/app_server/_runtime.py`）。`vibe-acp` 是另一条形态：先 `require_experimental_harness()`，捕获后打 stderr 并 `sys.exit(1)`，为的是让运行时缺失在开始服务前暴露（`vibe/acp/entrypoint.py`）。

影响 `config.runtime`，并连带修正 mcp、native_plugins 两章的路径边界表述——原文把 `vibe/core/tools/mcp/` 当作描述基线，现在它只是被显式选中的那条路径。证据能证明的是这个 commit 上的源码行为；commit 只代表源码树，不能推断任何已发布分发包。

### 配置面三处新增与一处降级

`[utility_models]` 是新配置组，`WithShallowMerge` 合并，`UtilityFeature` 枚举两个功能，`ACTIVE_MODEL_SELECTOR = "active"` 把功能钉到会话所用模型。`max_context_length`（`ge=1`，`None` 表示窗口未知）和 `thinking_levels` 是新的每模型字段；`auto_compact_threshold` 改用哨兵表达"未设置"，并按 `int(window * AUTO_COMPACT_WINDOW_RATIO)` 推导。跨 provider 的 `compaction_model` 过去 `raise ValueError` 让整份配置读不进来，现在只警告并回落到活动模型——`@ref-mv-cfg-compaction-provider-fallback` 的 locator 覆盖旧代码在该 commit 的现状，`_warn_cross_provider_compaction_model` 从 1060 行起。

### 权限与会话记录

`~/.vibe/.env` 写入前后各收紧一次权限，非 Windows 生效。`session_logging.generate_titles` 默认改为开启（客户端限定 CLI 与 Desktop），unified store 的 `STORE_FORMAT_MINOR` 由 7 升到 8。

### 线索核对后判定为无变化的两条

CHANGELOG 第 6 条"插件可用 `./` 命令在自己的 `mcp.json` 里启动自带 MCP server"在本变更集内没有实现变化：`_load_mcp_servers` 读 `plugin.root / "mcp.json"`、`_resolve_plugin_command` 处理 `./` 前缀，这两处在 baseline `7c19608` 即已存在且逐字相同，`_native.py` 的唯一 diff 是保留命名空间那一行。因此未改写插件章节关于自带的记述。

`vibe/core/session/session_lease.py` 的 diff 只有一行注释里的路径改名（`vibe_sdk/harness/...` → `agents/harness/...`），无机制变化。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `mistral-vibe-cli-configuration-v2` | config.sources answered、config.runtime answered（待复核）、config.trust answered、config.defaults answered、config.diagnostics answered | 新 edition 已入候选；`config.runtime` 因高影响留 pending，selection 建议在复核通过前继续选 v1 |
| custom_providers | `mistral-vibe-cli-custom_providers-v2` | providers.metadata partial、providers.models answered | 新 edition 已入候选，selection 建议选 v2 |
| mcp | `mistral-vibe-cli-mcp-v2` | mcp.entry answered | 新 edition 已入候选，selection 建议选 v2 |
| native_plugins | `mistral-vibe-cli-native_plugins-v2` | plugins.discovery answered | 新 edition 已入候选，selection 建议选 v2 |
| local_transcripts | `mistral-vibe-local_transcripts-v2` | transcripts.scope answered、transcripts.format answered | 新 edition 已入候选，selection 建议选 v2 |

**发布：** 未发布。`delivery=pr`，worker 不切换指针、不运行 publish。**受管二进制：** 未触发（`delivery=pr` 不执行 binary）。

旧 edition 全部保留未改：configuration-v1、custom_providers-v1、mcp-v1、native_plugins-v1、local_transcripts-v1，以及 main 上已有的 custom_agents-v2、hooks-v2（本章未触及）。

## 待处理与独立复核

**审计记录：** [`audit-mistral-vibe-20261006t134000z.yaml`](./audit-mistral-vibe-20261006t134000z.yaml)，`status: changed`、`review_status: pending`。**待处理旧审计：** 无。**待复核问题：** `config.runtime`，触发原因为跨主题关键加载机制改变。复核范围建议限定在：默认运行时反转是否影响其余七章的条件边界表述、两个前端（Rust TUI / 旧 Python TUI）是否需要拆分界面 id、以及 `permission = "never"` 的 Unified-only 收紧是否需要独立确认。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-mistral-vibe-repo` | `7c19608af06f6c61d63f8f7a5c3430da73fba2ab` → `7cb91894c40bb25173abcfa36e5ea2b4b81eb28c` | changed；`refs/heads/main`；1 个 commit，1568 个文件 |
| `source-mistral-vibe-docs-{agents,api-keys,configuration,configuration-reference,hooks,mcp-servers,safety,skills}` | 各自基线 → 相同 | 全部 unchanged，8 个官方文档来源内容 hash 未变 |

官方文档本轮全部未变，因此所有机制结论都落在仓库源码引用上，没有引用文档快照来支撑新行为。

## 验证与差异入口

已运行：

```text
pnpm maintenance:candidates check --candidate <本轮候选根>/mistral-vibe
→ exit 0，候选 396 个文件通过 schema 与 publishability 校验
```

`content_sha256` 全部由固定工作区 `ws-7cb91894c40b-a9d3b8bc-084e-4f90-8d43-a7bd14a53c08` 在 commit `7cb9189` 实算，`git_source_file` 只记 commit、仓库相对 file 与 hash，未记临时路径。

未运行：aggregate `pnpm knowledge:validate`、`pnpm sources:audit-log`、`git diff --check` —— 按 SKILL 约定这三项由 coordinator 集成后执行，worker 不在候选上跑全库校验。未运行 `publish` / `plan` / 受管二进制命令（`delivery=pr` 禁止）。

新增引用与快照（均在候选内）：`snapshot-mv-26-*` 14 个、`artifact-mv-26-*` 14 个、`ref-mv-cfg-*` 15 个、`ref-mv-plugins-builtin-roots`、`ref-mv-plugins-reserved-namespaces-2-26-0`、`ref-mv-mcp-display-name`、`ref-mv-lt-store-format-minor-8`、`ref-mv-changelog-2-26-0`。

查看本轮差异：

```bash
diff -ru <本轮批次根>/baseline/mistral-vibe <本轮批次根>/candidates/mistral-vibe
```

相对本轮基线副本的差异是 56 个新增文件加 1 个修改文件（`audits/mistral-vibe/audit-mistral-vibe-20261006t134000z.yaml`）；其余既有文件逐字节未改动。
