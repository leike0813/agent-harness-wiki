# Trae 上游审阅报告 · 2026-11-25

## 给维护者的结论

本轮 24 个登记来源全部取得，2026-11-25 的观察文档均存在且与归档原件哈希一致（此前的瞬时抓取失败已恢复，无 blocked 来源）。保留原件的逐字比较显示，内容变化集中在 5 个页面：`/ide/rules`、`/ide/troubleshoot-mcp-server-related-issues`、`/ide/models`、`/ide/settings`、`/ide/ignore-files`；其余 19 个页面在全部保留轮次中可见文本完全一致，只有构建脚本与 CDN 噪声。

有知识影响的变化落在 4 个主题：configuration、mcp、custom_providers、skills，各自新建 `v2` 完整章节并切换 selection。hooks、custom_agents、native_plugins、local_transcripts 的选章保持不变。未新增软件版本映射：Trae 无官方 npm 包，全部来源仍是 `version_applicability: unknown` 的来源级知识。

最需要维护者知道的风险：Trae 文档除 models 外的页面在 2026-10-11 的保留原件中已把客户端称呼从 "TraeCode" 改成 "TRAE"，models 页直到 2026-11-25 才改名；规则与上下文引用符号从 `#` 改成 `@` 发生在 2026-11-25 这一轮。`/ide/ignore-files` 同时出现了 `Indexing & Docs` 功能停用公告（针对 2026-10-22 及之后发布的客户端版本）与仍然存在的 `.ignore` 流程。本轮按页面自身给出的版本边界并列呈现两者，没有把停用公告外推到旧客户端。

## 变化的意义与证据边界

### 证据边界：09-30 基线原件未保留

24 个来源的当前快照都是 2026-09-30 抓取，`raw_sha256` 与冻结审计的 `checks.baseline` 一致；但 artifact 指向的 `archive/trae/artifact-<source>/raw.txt` 未被保留，09-30 原文不可读。逐源比较改用 archive 中保留的观察原件：24 个来源在 2026-10-11、2026-10-12 两轮审计的 observed 原件都在，另有每源 2 份日期不明的保留原件。因此**已验证窗口是 2026-10-11 → 2026-11-25**；2026-10-22 与 2026-10-24 两轮只留下哈希、原件未保留，不能声称这两轮之间没有变化；09-30 至 10-11 段只能通过已发布 reference 的摘录间接核对（本轮未发现摘录与 11-25 文本的机制性矛盾）。

### `#` → `@`：引用符号更名（rules、ignore、mcp-trouble、settings）

- `/ide/rules`：`#Rule` 的 3 处全部改为 `@Rule`（Application Mode 表、Reference rules in a chat 两段）。
- `/ide/ignore-files`：Important note 的 `#Workspace`/`#Folder` 改为 `@Folder`。
- `/ide/troubleshoot-mcp-server-related-issues`：上下文引用列表 `#File, #Doc, #Folder` 改为 `@File, @Folder`（`#Doc` 不再出现）。
- `/ide/settings`：Docs 行的引用链接 `# symbol` 改为 `@ symbol`，同表 Code Index Management 改名为 Code Index Build 并重写描述。

机制语义不变（同一引用入口、同一优先级与生效条件），但已发布章节的示例符号因此过时；configuration 与 mcp 的 v2 章节已按新文本改写，skills 章对该语法的旁注同步为 `@Rule`。

### `Indexing & Docs` 停用公告（ignore-files）

页面顶部新增公告：该功能对 2026-10-22 及之后发布的客户端版本停止提供，旧版本不受影响；停用后已有索引与文档不可访问，本地缓存的索引数据会被清除（源代码不删除），要求需要保留数据的用户在此日期前自行保存，并以 "Upload Attachment" 作为后续基于文件的问答方式。同页仍保留 `.ignore` 创建与重建索引流程。本轮把这一矛盾解释为版本边界，并在 configuration 的 config-sources 与 config-diagnostics 两处披露；没有断言新客户端仍能执行该流程。

### 模型清单与价格重构（models）

`Built-in models` + `Model pricing` 两节改为 `Model list and pricing`：`Models available for new plans`（12 个需升级新套餐的模型，含新增的 GPT-6.1-Sol）、`Non-U.S. regions`（25 个模型）与 `U.S.`（17 个模型）两张区域表，新增 Context length 列与 GPT-6.2/6.1、DeepSeek-V4.1/V4-Pro、Grok-4.6/4.7、Gemini-2.5 系列、Kimi-K2-0905 等条目；旧页「美国不可用 Seed/MiniMax/GLM」的单条说明被区域表取代。custom_providers 的 providers-scope 与 providers.models 答案已改写；价格是计费事实，不构成版本映射。

### 未改版的变更

- `/ide/settings` 的 Code Index Build 行与 `@ symbol` 链接没有被任何选中章节引用（`ref-trae-set-context` 未被章节使用），记为 changed 但不产生章节 impact。
- 其余 19 个页面在保留原件中逐字一致，无机制变化。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | trae-trae-configuration-v2 | config.sources：answered；config.overrides：answered；config.diagnostics：partial | 进入候选并切换 selection |
| mcp | trae-trae-mcp-v2 | mcp.diagnostics：answered | 进入候选并切换 selection |
| custom_providers | trae-trae-custom_providers-v2 | providers.models：answered | 进入候选并切换 selection |
| skills | trae-trae-skills-v2 | skills.invocation：answered（仅交叉引用旁注） | 进入候选并切换 selection |
| hooks / custom_agents / native_plugins / local_transcripts | 保持 v1 | 无变化 | 保留旧版本 |

**发布：** 未发布（worker 不运行 `chapters:update` / `ahw publish`）。候选通过 `maintenance:candidates check`，交回 coordinator 集成。**受管二进制：** 未触发（本轮为 monitor worker，binary 由 coordinator 处理）。

## 待处理与独立复核

**审计记录：** [audit-trae-a35ce5c0-43f4-41ce-9404-42f4d340dbbd](audit-trae-a35ce5c0-43f4-41ce-9404-42f4d340dbbd.yaml)，`status: changed`、`review_status: reviewed`、`pending_question_ids: []`。**待处理旧审计：** 8eee37b0、b70a36bf、66abde99、5dac7eff、49940e42 保留各自原状态供追溯，本审计不清空其记录。**待复核问题：** 无独立复核触发项。判据：ignore 的公告/流程矛盾由页面自述的客户端版本边界解释，不属于无法解释的来源冲突；`#`→`@` 是同一引用机制的符号更名，未推翻机制语义；没有跨主题关键加载机制变化。若 coordinator 认为符号更名属于高影响配置步骤变更，应在集成前追加独立 reviewer。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-trae-docs-skills | 16b9ab9d…（09-30）→ 68290e87… | changed；5 份保留原件文本一致，无内容变化 |
| source-trae-docs-rules | e9aecc76… → b3853c07… | changed；`#Rule`→`@Rule` 3 处 |
| source-trae-docs-memories | ccb65168… → c256e5e4… | changed；文本一致，无内容变化 |
| source-trae-docs-commands | 8b01b591… → 55813b46… | changed；文本一致 |
| source-trae-docs-mcp | 4c4a6e85… → 17831bc7… | changed；文本一致 |
| source-trae-docs-mcp-add | 69901b6e… → 37c67b77… | changed；文本一致 |
| source-trae-docs-mcp-install | 9e97eba3… → 695a037b… | changed；文本一致 |
| source-trae-docs-mcp-agents | 6a5acab0… → 51dd60d8… | changed；文本一致 |
| source-trae-docs-mcp-logs | 0cb04e11… → 59d254c3… | changed；文本一致 |
| source-trae-docs-mcp-trouble | 95ddd77b… → 3cf7009f… | changed；`#File/#Doc/#Folder`→`@File/@Folder` |
| source-trae-docs-agents | 187f314c… → 02fe22d8… | changed；文本一致 |
| source-trae-docs-agents-overview | 95441dae… → 06b4ee87… | changed；文本一致 |
| source-trae-docs-subagents | a7452bc1… → 40aa44ae… | changed；文本一致 |
| source-trae-docs-agent-builtin | 70608853… → 6d9dd807… | changed；文本一致 |
| source-trae-docs-models | d627ab4d… → d9fb99e2… | changed；模型清单/价格重构、增删模型、TraeCode→TRAE |
| source-trae-docs-hooks | 64316e67… → eb0bc051… | changed；文本一致 |
| source-trae-docs-hooks-ref | c10b66dd… → 0f389913… | changed；文本一致 |
| source-trae-docs-extensions | 93cfbbd0… → 58569bb2… | changed；文本一致 |
| source-trae-docs-settings | 276d049f… → 70243349… | changed；Code Index Build 行与 `@ symbol`，无章节引用 |
| source-trae-docs-permissions | 5996e6cf… → 26219978… | changed；文本一致 |
| source-trae-docs-permission-mode-ref | 8e7cdcb0… → 6f048dd8… | changed；文本一致 |
| source-trae-docs-permission-global-ref | ae859f58… → 64c44833… | changed；文本一致 |
| source-trae-docs-auto-run | decfea14… → 218eb836… | changed；文本一致 |
| source-trae-docs-ignore | 99107432… → 2cd78938… | changed；新增停用公告、`@Folder` |

## 验证与差异入口

- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/trae`：通过（文件归属、章节/引用/快照/审计 schema）。
- 4 个新 artifact 的 `archive/trae/artifact-source-*-<hash>/source.md` 经 `sha256sum` 与 observed 哈希一致。
- 7 条新 reference 的摘录均能在 2026-11-25 提取文本中定位（表格行与 mention 名称按页面渲染还原，省略处用 `…`）。
- 未运行：`pnpm knowledge:validate`、`sources:audit-log`、publish（coordinator 集成后执行）。
- 查看差异：`diff -ru /tmp/ahw-batch-11/baseline/trae /tmp/ahw-batch-11/candidates/trae`。
