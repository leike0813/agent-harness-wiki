# Mistral Vibe 上游审阅报告 · 2026-11-25

## 给维护者的结论

仓库从 `e76235b`（3.1.4）前进到 `fb7511a`（3.1.5）。本轮不是纯排版变化：**模型目录开关改名并默认开启**、GrowthBook 模型路由字段被删除、内置模型换成 Large 4 / Medium 3.5、subagent 生命周期名字上限被移除、插件新增远端库作用域、会话存储次版本从 9 走到 10/11 并支持 gzip 块。这些变化直接推翻或扩写了 5 个主题的已发布表述，因此新建 5 个完整 edition 并切换选择；MCP、Skills、Hooks 三个主题的当前引用文件与符号在本次 delta 中没有变化，保持原 edition 与选择。

官方文档 8 个来源继续以 HTML 观察入口重新取到内容；当前任何 edition 都不引用这些 docs 快照（去重后 0 条），因此文档取回方式变化本身不构成知识变化。历史 pending 审计（`21f18606`、`a1dfa350`、`470a3a59`、`88a19df8`、`5af77669`、`20261006t134000z`）保持原状态，本审计没有关闭它们。

## 变化的意义与证据边界

### 配置与模型选择（configuration / custom_providers）

- `experimental_enable_model_catalog` → `enable_model_catalog`，默认值从关闭变为**开启**；迁移规则只保留旧值 `false`（旧 `true` 直接丢弃），环境变量改名 `VIBE_ENABLE_MODEL_CATALOG`，旧变量不再读取。旧配置不会报错，但按旧键写 `true` 已没有任何作用。
- `enable_builtin_models`（默认开）与 `experimental_enable_remote_plugins`（默认关）是新的配置面。
- `resolve_default_model_alias` 不再读取 `routed_*` 路由字段：链变成 目录默认（`catalog_default_model`）→ 目录推荐 → 内置默认 `mistral-large-4-0` → 可用第一个。**GrowthBook 仍能影响默认模型**：它仍读取 `model_catalog_filter`，过滤结果的 `catalog_default_model` 由过滤规格的 `default` 决定并排在链首；被移除的只是 `routed_default_model`/`routed_model_config`/`routed_extra_models`。
- 内置模型有两个：Large 4（默认，1M 窗口、`auto_compact_threshold = 400000`）与 Medium 3.5；目录列出模型时内置模型不参与合并（`_catalog_filter.with_remote_models`）。
- 模型的 `provider` 不在已配置 provider 列表时分两种：还有别的模型时被留出并警告；**全部**模型都缺 provider 时保留、配置照常加载，只有会话选中其中一个才回落到默认模型并点名 provider；让配置加载失败的是模型集合为空（如关掉目录与内置模型又没有自己的 `[[models]]`）。
- `ProviderConfig.tool_result_images` 新字段：未设置时只对已知端点（`internal-ai-gateway.mistralai.com`）开启；`false` 用 `[Image]` 占位；`mistral` 后端始终发送工具图片。
- `[tools.*] permission` 拼错从启动期 "Invalid request parameters" 变成配置构建期点名工具的错误。
- 证据边界：`tool_result_images` 的请求侧行为由 `models.py` 字段与派生属性直接证明；"流中途瞬时错误重试"只有 CHANGELOG 条目，未逐行核对重试实现。

### 子会话上限（custom_agents）

`SubagentLimits` 现在只有三项：深度恒 1、存活上限、并发 turn 上限（默认各 32，配置 `max_subagents` / `max_concurrent_subagents` 可覆盖）。达到存活上限时先关闭等待最久的子会话，只有没有可关闭者才报 `subagent_child_limit`；并发超限报 `subagent_concurrency_limit`；3.1.5 起没有"会话生命周期内名字总数 128"的限制，但关闭过的名字不能重用（`subagent_name_conflict`）。`agents.list` 只列存活子会话，`/reload` 会重读新增/编辑的 subagent profile。

### 远端插件库与扩展字段（native_plugins）

`experimental_enable_remote_plugins` 开启后，插件库启用的插件同步到 `$VIBE_HOME/remote-plugins`（默认 `~/.vibe/remote-plugins`）并以 REMOTE 作用域加载，副本只读；运行时数据在 `$VIBE_HOME/plugin-data/remote`。库名归插件库所有（开或关），同名本地插件不加载并报 `plugin.name.library_owned`；与内置同名的远端插件不加载。`defaultEnabled` 只影响项目/用户级本地插件，`disabled_plugins` 对本地插件仍优先；远端插件是否加载由库端开关决定，`disabled_plugins` 不能关掉它。扩展块现有字段：`schemaVersion`、`displayName`、`starterPrompt`、`toolNamespace`、`toolOverrides`、`volumes`、`defaultEnabled`。文档只说明同步与加载行为，没有说明库端去重/版本固定的细节，`plugins.install` 仍记 `partial`。

### Transcript 格式与清理（local_transcripts）

写入次版本是 10；读取端接受 ≤11。11 是"读取先行"：某代引用了只以 gzip 保存的池化块时该代写 11，否则写 10；除 gzip 块外的破坏性变化才会到 12。块名是未压缩规范化字节的摘要，文件可以是 `DIGEST.json` 或 `DIGEST.json.gz`，gzip 解压上限 1 GiB。加载无法解析的稀疏历史位置时丢弃并每次加载警告一次。`/cd` 只改写记录中的工作目录/原目录并丢弃 `repository_root`/`checkout_root`，不动存储目录。`/resume` 打开 Sessions 页面，列所有目录的会话；归档把 `archived_at` 写进 unified 会话 `meta.json` 且不移动目录，恢复清空该字段——归档仍记 `partial` 的原因只剩 worktree/跨机器可移植性未说明。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | mistral-vibe-cli-configuration-v4 | config.sources/runtime/defaults/migration/diagnostics：answered | 已进入候选，切换 current |
| custom_providers | mistral-vibe-cli-custom_providers-v5 | providers.entry/models/metadata/forwarding/responses/diagnostics：answered | 已进入候选，切换 current |
| custom_agents | mistral-vibe-cli-custom_agents-v5 | agents.invocation/limits/diagnostics：answered | 已进入候选，切换 current |
| native_plugins | mistral-vibe-cli-native_plugins-v4 | plugins.model/package/install(partial)/discovery/api/lifecycle/diagnostics：answered/partial | 已进入候选，切换 current |
| local_transcripts | mistral-vibe-local_transcripts-v4 | transcripts.location/format/schema/lifecycle/database/archive(partial)/cleanup(partial)/diagnostics | 已进入候选，切换 current |
| mcp | mistral-vibe-cli-mcp-v3 | 全部 answered，保持 | 保留（引用文件与符号无变化） |
| skills | mistral-vibe-cli-skills-v2 | 全部 answered，保持 | 保留（引用文件与符号无变化） |
| hooks | mistral-vibe-cli-hooks-v3 | 全部 answered，保持 | 保留（引用文件与符号无变化） |

**发布：**worker 不发布；候选经 `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/mistral-vibe` 通过（exit 0，577 个文件）。**受管二进制：**worker 不执行。

## 待处理与独立复核

**审计记录：**`audits/mistral-vibe/audit-mistral-vibe-6a3f2d18-9c47-4f0b-8b6e-2d5a9e7c4b13.yaml`（status `changed`，review `reviewed`，reviewed_by 含 coordinator 与 `independent reviewer ReviewMistralVibe (20261125)`，pending_question_ids 为空）。**待处理旧审计：**`21f18606`、`a1dfa350`、`470a3a59`、`88a19df8`、`5af77669`、`20261006t134000z` 保持原状态，本审计不关闭它们。**复核轮次：**第一版被独立复核判 `changes_requested`（GrowthBook 默认模型、缺 provider 两种情形、providers 旧 ref、远端插件目录、归档语义、defaultEnabled 语义、审计状态 7 项）；修正后候选 check 通过，已按复核要求记录 reviewed_by。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-mistral-vibe-repo` | e76235b → fb7511a | changed：CHANGELOG 3.1.5；vibe_schema/models/_migration/_native/_storage/_session_catalog/_subagents/saved_sessions 的符号级变化按主题拆分 |
| `source-mistral-vibe-docs-*`（8 个） | 各 docs hash → 新 HTML 页 hash | changed：观察入口迁移后的重新取回；当前 edition 不引用任何 docs 快照，无知识影响 |
| 其余引用文件 | — | 当前 edition 引用的 hooks/skills/mcp 文件在本 delta 中无对应符号变化，no_change |

## 验证与差异入口

- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/mistral-vibe` → exit 0（章节、问题、引用、映射、审计结构通过）。
- 新引用 excerpt 均 ≤800 字符；locator 行号按 `fb7511a` 的原始文件重新取。
- 未运行：聚合 `pnpm knowledge:validate`、发布构建、二进制更新（由 coordinator 在集成后执行）。
- 查看改动：`diff -ru /tmp/ahw-batch-11/baseline/mistral-vibe /tmp/ahw-batch-11/candidates/mistral-vibe`。
