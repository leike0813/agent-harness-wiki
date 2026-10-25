# Auggie 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮上游只有一处读者可见的知识变化：官方仓库新增 `docs/1.x-preview-guide.md`（提交 `5f9e4efafbdd`）。它写了两件事——1.x 预览把 hook 工具名规范成短动词 `read`/`edit`/`write`/`grep`/`find`/`bash`，并把 0.x 旧名保留为兼容别名（旧名写在 hook matcher 里仍然触发）；0.x 向 shell 执行类 hook 注入的“修改文件列表”已从 `bash` hooks 的 payload 移除，并在向其它工具 hook 淘汰。这直接改了 `hooks.input` 对 `tool_name` 与 `file_changes` 的结论，因此新建完整章节版本 `auggie-cli-hooks-v3`：只增补 `hooks-input` 小节与 `hooks.input` 答案里的版本线差异，其余小节照旧，候选内 `chapter-current.yaml` 的 hooks 选择从 v2 切到 v3。

文档侧 15 个来源 hash 变了，但没有可发布的知识变化。hooks 页在页面层面净删 113 行、按排障问题重组；而按被引小节去组件标签后逐行比对，字段表、退出码、通信矩阵、JSON 输出、metadata 默认值与示例脚本都没变，差异只剩文档站迁移（`<Note>`/`<Tip>`/`<Warning>`/`<Info>` → `[!NOTE]`/`[!TIP]`/`[!WARNING]`，`<CodeGroup>` → 普通代码块，`<Steps>` → 有序步骤）。所以 `hooks.output` 与 `skills.diagnostics` 保留原答案，skills 章节未改，4 条不再命中的摘录仍绑定原固定快照。

本轮审计记的是 `review_status: pending`，并且还列着 3 个未关闭的旧审计；本轮没有关闭它们。结论固定在这些身份上：Git 提交 `5f9e4efafbdd052b6f1aa8855e0067ccdc181040`（`docs/1.x-preview-guide.md`，content sha256 `6a1eae51…`）、各官方文档快照 hash。Auggie CLI 闭源，章节仍是来源级知识（`version_applicability: unknown`）；npm 仍是 `0.36.0`，integrity 未变，所以 1.x 预览的说法不构成任何发行版的行为保证。

## 变化的意义与证据边界

### 1.x 预览改了 hook 工具名与 payload（`hooks.input`）

`Hook Tool Names Changed` 一节给出新旧对照：`read`←`view`/`read-file`/`read_file`，`edit`←`str-replace-editor`/`str_replace_editor`/`edit-file`/`edit_file`，`write`←`save-file`/`save_file`/`write-file`/`write_file`，`grep`←`grep-search`/`grep_search`，`find`←`file-search`/`file_search`/`find-by-name`，`bash`←`launch-process`/`launch_process`/`shell`。兼容范围只写明 hook matcher：用旧名的 matcher 在预览期仍触发对应 1.x 工具。它没有承诺脚本里 `tool_name` 字段也回填旧名，所以照 0.x 长名判断 `tool_name` 的脚本换到 1.x 会失配——v3 把这一点写成“按规范名判断、容忍旧名，或把旧名只留在 matcher 位置”。

`Hook Payloads: Changed Files Detection` 一节说明 0.x 会计算并注入“修改文件列表”，该行为已从 `bash` hooks 移除、正在其它工具 hook 上淘汰，需要清单的 hook 应直接查版本控制（`git status --porcelain`、`git diff --name-only`）。v3 据此把 `file_changes` 降级为“0.x 文档所述的工具事件字段”，不再当作跨版本稳定输入。

受影响的是 `hooks.input` 与 `hooks-input` 小节，新引用为 `ref-auggie-repo-1x-hooks-tool-names`（`docs/1.x-preview-guide.md` 第 77–91 行）与 `ref-auggie-repo-1x-hooks-payload`（第 93–94 行），两者绑定新快照 `snapshot-auggie-repo-1x-preview`（`version_identity: commit 5f9e4efafbdd…`）与新工件 `artifact-auggie-repo-1x-preview`（`git_source_file`，`content_sha256 6a1eae51…`）。

证据边界：来源只证明“官方迁移说明这样写”，不证明 1.x 运行时的实际字段，也不把结论挂到某个 npm 版本上。工具名规范化同样影响 matcher 取值（`hooks.entry`）和 permission 规则对旧名的匹配范围，本轮只派发 `hooks.input`，`hooks-entry` 正文未改写，只在审计里记为 `cross_topic_links: [hooks.entry, config.diagnostics]`；persona 退场、keybindings 迁移等属其它主题，未处理。

### 文档站迁移：4 条摘录不再命中，但证据未被推翻

本轮按已发布章节引用逐条核对，`ref-auggie-docs-skills-first`、`ref-auggie-docs-hooks-event-json`、`ref-auggie-docs-hooks-security`、`ref-auggie-docs-hooks-troubleshooting` 四条摘录在新页面里不再逐字命中，差异全部落在组件标签行。这四条引用的原件仍留在项目 archive：例如 hooks 页原件是 `archive/auggie/artifact-source-auggie-docs-cli-hooks-93f421dccdd0/source.md`，sha256 `93f421dccdd0…` 与 baseline 完全一致。摘录绑定的快照没有变、正文证据没有被推翻，所以按“已发布引用保持不变”保留原引用，不重写、不改绑。

页面级 diff 与被引小节比对是两件事：审计同时记了 hooks 页“净删 113 行并重组为排障式章节”和“去组件标签后逐行一致”。前者是整页统计，后者只覆盖被引小节；本报告只用后者支撑“已发布答案成立”，不把整页改写当作被引结论的新证据。

### `hooks.output` 与 `skills.diagnostics` 复核后不变

`hooks.output` 的通信矩阵、退出码语义、`hookSpecificOutput` 字段与限制，在 hooks 页去组件标签后与基线原件逐行一致；`skills.diagnostics` 依赖的 `/skills` 弹窗列与重启要求也未变。1.x 指南只提到 `/reload` 用于 keybindings、选择器 type-to-filter（model picker／worktree／settings），未涉及 `/skills` 或设置热重载，所以 skills 答案不变、章节不改。两者都不产生新 edition，仅在本轮审计里结案。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| hooks | `auggie-cli-hooks-v3` | `hooks.input`：answered（增补版本线）；同版本内其余问题状态照旧（`hooks.order` 仍为 partial） | 候选内已新建完整 edition |
| hooks | `auggie-cli-hooks-v2` | `hooks.output`：answered（复核后不变） | 保留旧版本，原文件未改 |
| skills | `auggie-cli-skills-v1` | `skills.diagnostics`：answered（复核后不变） | 保留旧版本 |

**发布：** `delivery=pr`，本轮不构建 release、不切 `releases/current.json`；候选内 `registry/chapter-current.yaml` 的 hooks 选择已从 `auggie-cli-hooks-v2` 切到 `auggie-cli-hooks-v3`，等待主进程集成后发布。**受管二进制：** 未触发；`source-auggie-npm` 的 observed 值仍是 `0.36.0@sha512-jb4kq97…`，与 baseline 完全相同，没有需要交给 `harness-binary` 的版本。

## 待处理与独立复核

**审计记录：** [audit-auggie-e9d98412-325f-43ea-9b76-27bf5b8b094c.yaml](audit-auggie-e9d98412-325f-43ea-9b76-27bf5b8b094c.yaml)，`status: changed`、`review_status: pending`、`pending_question_ids: []`。本轮在范围的三个问题（`hooks.input`、`hooks.output`、`skills.diagnostics`）都已结案。

**待处理旧审计：** [audit-auggie-b525ac17-ab2f-490e-bae8-74ed6d8829aa.yaml](audit-auggie-b525ac17-ab2f-490e-bae8-74ed6d8829aa.yaml)、[audit-auggie-2f9f9161-eb9d-42be-b918-4b93f3486ab5.yaml](audit-auggie-2f9f9161-eb9d-42be-b918-4b93f3486ab5.yaml)、[audit-auggie-fa639a7e-892c-45e4-ac81-e8eeedaf0450.yaml](audit-auggie-fa639a7e-892c-45e4-ac81-e8eeedaf0450.yaml)。三者的 `review_status` 都还是 `pending`，本轮没有关闭它们，也没有对它们做新判断。

一处记录不一致需要说明：本轮审计最后一条 investigation note 称“3 个旧审计的 `pending_question_ids` 均为空”，但 `audit-auggie-2f9f9161` 的 YAML 仍列 `providers.entry`、`providers.protocol`、`providers.responses`、`providers.diagnostics` 为待复核。本报告按 YAML 原文记录；无论按哪种说法，“旧审计未关闭”的结论不变。

**待复核问题：** 无独立复核项。`hooks.input` 的改动是版本线增补，未推翻已发布配置步骤，也不改变跨主题加载机制；若需二次确认，复核点是 v3 的 `hooks-input` 两段版本差异表述与 `ref-auggie-repo-1x-hooks-tool-names`（77–91 行）、`ref-auggie-repo-1x-hooks-payload`（93–94 行）是否逐字对应。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-auggie-repo` | `9cc3ead4…` → `5f9e4efa…` | changed；新增 `docs/1.x-preview-guide.md`（另有 `README.md` 改动），已新建 artifact／snapshot／2 条引用 |
| `source-auggie-npm` | `0.36.0@sha512-jb4kq97…` → 同值 | unchanged |
| `source-auggie-docs-index` | `0df5ac39…` → `2aeabb2f…` | changed；本轮未逐字复核该页，未新增引用或快照 |
| `source-auggie-docs-cli-overview` | `8d21b733…` → `13bc47d2…` | changed；页面改写，未新增引用或快照 |
| `source-auggie-docs-cli-config` | `d4c6bbcf…` → `4746aa7b…` | changed；`Advanced: How settings are merged in detail` 仅标题行化（基线已是 Accordion 标题），去标签后逐行一致 |
| `source-auggie-docs-cli-reference` | `06e4af1d…` → `beaa9b39…` | changed；本轮未逐字复核，未新增引用或快照 |
| `source-auggie-docs-cli-skills` | `7326aab9…` → `46414289…` | changed；去组件标签后与被引小节逐行一致 |
| `source-auggie-docs-cli-subagents` | `c38d57d1…` → `ebcd1a3d…` | changed；页面改写，未新增引用或快照 |
| `source-auggie-docs-cli-integrations` | `16b47d1e…` → `fdf09ef6…` | changed；页面改写，未新增引用或快照 |
| `source-auggie-docs-cli-hooks` | `93f421dc…` → `8a556948…` | changed；净删 113 行并按排障问题重组，被引小节去标签后逐行一致；原件仍在 `archive/auggie/artifact-source-auggie-docs-cli-hooks-93f421dccdd0/source.md` |
| `source-auggie-docs-cli-plugins` | `3de1273a…` → `69dac386…` | changed；本轮未逐字复核，未新增引用或快照 |
| `source-auggie-docs-cli-rules` | `556b123a…` → `4ba0c7d5…` | changed；本轮未逐字复核，未新增引用或快照 |
| `source-auggie-docs-cli-permissions` | `3de8bb33…` → `7a598bdb…` | changed；本轮未逐字复核，未新增引用或快照 |
| `source-auggie-docs-cli-custom-commands` | `49a158f4…` → 同值 | unchanged |
| `source-auggie-docs-cli-interactive` | `64d818b9…` → `1f670e8b…` | changed；去组件标签后逐行一致（另有页内联图片组件的正文修复） |
| `source-auggie-docs-models` | `e1dba56b…` → 同值 | unchanged |
| `source-auggie-docs-auth` | `8c5c0a41…` → `1e1ce0b2…` | changed；本轮未逐字复核，未新增引用或快照 |
| `source-auggie-docs-automation` | `0e23674e…` → `28f9e78d…` | changed；本轮未逐字复核，未新增引用或快照 |
| `source-auggie-docs-service-accounts` | `42bc3c79…` → 同值 | unchanged |
| `source-auggie-docs-workspace-context` | `82516189…` → 同值 | unchanged |
| `source-auggie-docs-autoupgrade` | `f747b693…` → 同值 | unchanged |
| `source-auggie-docs-logs` | `fb7e86dd…` → `81886df2…` | changed；本轮未逐字复核，未新增引用或快照 |

## 验证与差异入口

本报告只做只读核对，没有运行 `pnpm -s maintenance:candidates check`、`pnpm knowledge:validate`、lint 或测试；这些留给主进程在集成前执行。已执行的三项身份校验：pinned checkout `ws-5f9e4efafbdd-729d57ca-9860-4166-b194-5adfbd8c4a43` 的 `git rev-parse HEAD` 得 `5f9e4efafbdd052b6f1aa8855e0067ccdc181040`，该目录 `docs/1.x-preview-guide.md` 的 sha256 为 `6a1eae51685499f07d09932f55794b194f45ae321b6b5ea726e533bf92d6ec26`，与 artifact／snapshot 一致；`archive/auggie/artifact-source-auggie-docs-cli-hooks-93f421dccdd0/source.md` 的 sha256 为 `93f421dccdd017099d87b12ffd7fe8f272d8adf750856ddfb200d9b55c695378`，与 baseline 一致。

本轮候选改动：新建 `knowledge/auggie/chapters/auggie-cli-hooks-v3.md`、`knowledge/auggie/artifacts/artifact-auggie-repo-1x-preview.yaml`、`knowledge/auggie/snapshots/snapshot-auggie-repo-1x-preview.yaml`、`knowledge/auggie/references/ref-auggie-repo-1x-hooks-tool-names.yaml`、`knowledge/auggie/references/ref-auggie-repo-1x-hooks-payload.yaml`，修改 `registry/chapter-current.yaml`（hooks → v3）与本轮审计 YAML，另加本报告。查看候选与基线的完整差异：`diff -ruN batch-20261022/baseline/auggie batch-20261022/candidates/auggie`；只看未跟踪文件：`git status --short --untracked-files=all`。（`batch-20261022` 是本轮候选批次的相对标识；该批次目录与固定检出在聚合闸门后已释放，路径只作本轮溯源标记。）章节内的版本差异见 `auggie-cli-hooks-v2.md` 到 `v3` 的 diff（`hooks-input` 小节与 `hooks.input` 的 source_refs，共 11 增 5 删）。
