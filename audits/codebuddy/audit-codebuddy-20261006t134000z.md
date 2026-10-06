# CodeBuddy 上游审阅报告 · 2026-10-06

## 给维护者的结论

CodeBuddy Code 的文档仓库从 `8c7caf7a…` 前进到 `a70dea0b…`，这一轮只有一个提交，改动落在 `docs/acp.md`、`docs/slash-commands.md`、`docs/web-ui.md` 三个文件上，各一处，其余文件（含 `CHANGELOG.md`）逐字未变。改动量看着很小，但它动的是两条**读者会直接照着做**的路径：`/export` 导出到哪里，以及 ACP 客户端能看到哪些命令。

`/export` 过去是一条不分前端的描述，现在官方自己按前端拆开了：终端里导出当前对话到文件或剪贴板，Web UI 里下载当前会话的 ZIP 归档，含对话记录和可用的会话日志，共享工作区日志只收录含当前会话 ID 的行。归档还多了一句明确的敏感性提示——可能包含提示词、本地路径和敏感信息。这意味着以前「导出=拿到一份对话」的理解不再完整：Web UI 侧导出的是一个带日志的会话包，分享前要人工检查。已发布的 `local_transcripts` v1 把两种行为写在同一段里且没有界面区分，因此升到 v2 重写这一节。

ACP 命令列表的过滤口径也换了：不再过滤「本地命令」，改为过滤客户端专属与终端面板专属命令，于是 `/clear`、`/compact` 这类会话控制命令会下发给客户端触发。`skills` 升到 v3 记录这个可见性变化，同时把它与 `skillOverrides` 的两层过滤区分开，避免读者把「Skill 不可见」和「终端面板命令不下发」当成同一个开关。

六个主题（`mcp`、`custom_agents`、`custom_providers`、`hooks`、`native_plugins`、`configuration`）本轮没有证据支持变更，章节一律不改写。CodeBuddy Code 闭源，官方只发布文档与 npm 包，因此本轮仍是来源级知识，未新增任何版本映射。

## 变化的意义与证据边界

### `/export` 在 Web UI 上多了一条带日志的 ZIP 通道

斜杠命令表把 `/export` 改成了一句双行为描述：「终端中导出当前对话到文件或剪贴板；Web UI 中下载当前会话的对话记录与可用调试日志 ZIP。归档可能包含敏感信息，分享前请检查。」Web UI 能力页的「复制与导出」条目补上了细节：ZIP 含对话记录及可用的会话日志，共享工作区日志只收录含当前会话 ID 的行，归档可能包含提示词、本地路径和敏感信息。

落在 `transcripts.archive`（导出通道与归档）和 `transcripts.cleanup`（保留边界）两题。界面边界在这里最要紧：catalog 中 codebuddy 只声明了 `cli` 一个界面，终端 TUI 与 `--serve` 的 Web UI 是同一进程的两个前端，官方文本把它们并列写在同一行，但**这一行不构成「终端也能下 ZIP」的证据**。v2 正文按前端分列成表，并写明按分号切开读即可；Web UI 右上角原有的「整轮对话导出 Markdown / JSON」仍在文档中，v2 明确区分了它（单轮、两种文本格式）与 `/export` ZIP（整会话加日志）不是同一条通道的两种编码。

`transcripts.scope` 一并记进 impact，但答案状态不变，要说明白：这轮变的是**导出通道**，不是记录范围——归档含提示词与本地路径是导出内容的性质，不代表 CLI 记录了什么新东西。答案状态保持不变。

证据能证明到哪里：官方只给了归档的内容清单与敏感性提示，没有给 ZIP 的内部目录结构、日志文件名、导出文件能否反向恢复会话，也没有说导出归档是否受 `cleanupPeriodDays` 或 `cleanup` / `project purge` 影响。终端侧的目标是用户自选文件或剪贴板、Web UI 侧是浏览器下载，都在 `~/.codebuddy/` 之外，**不能假设清理命令会删掉已导出的副本**——这属于依据路径边界的推断，正文已标注不是官方明文规则。

### ACP 命令列表按新口径过滤，会话控制命令会下发

`docs/acp.md` 的命令列表推送段落把过滤规则从「过滤掉本地命令（如 `/clear`、`/exit`）和客户端专属命令」改为「过滤掉客户端专属命令（如 `/theme`、`/config`）和终端面板专属命令（如 `/stats`、`/rewind`）」，并新增一句「`/clear`、`/compact` 等会话控制命令会下发，由 ACP 客户端触发后由服务端执行」。前半段未变：列表仍包含当前可调用的项目级、用户级和插件 Skill，并在 Skill 加载完成或可见性配置变化后自动刷新。

落在 `skills.invocation`（可见性口径），`skills.discovery` 一并核对确认未受影响——发现位置与扫描规则没有变化，变的只是可调用 Skill 与命令在 ACP 客户端的呈现。v3 正文额外区分了两层过滤不是同一个开关：`skillOverrides` 按 Skill 名决定某个 Skill 是否可见，「客户端专属 / 终端面板专属」按命令归属决定某类命令是否下发；一个 Skill 可以在 `/` 菜单里可见，同时它依赖的某个终端面板命令不出现在 ACP 列表里。

证据边界：「在 Skill 加载完成或可见性配置变化后自动刷新」说的是**已推送的命令列表**何时更新，不是 Skill 热重载承诺。`skills.diagnostics` 里「非插件来源的 Skill 改动是否需重启会话」这个缺口本轮没有新证据，v3 显式写明它仍然成立。

### 旧锚点复核结果

`docs/acp.md:73`、`docs/slash-commands.md:45` 与 `:47-48` 三处原有引用在新修订下逐字未变，变化都发生在这些锚点之后，因此这三条引用继续沿用旧修订的快照，不改写已发布证据。`ref-codebuddy-lt-webui-export` 指向的 `web-ui.md:169` 内容已变，本轮新增 `ref-codebuddy-lt-webui-export-zip` 固定新修订，旧引用保留，继续供已发布的 `local_transcripts` v1 引用。

### 六个主题的排除依据

本轮三个变更文件的内容分别属于 ACP 命令列表推送与 `/export` 导出，不涉及 MCP server / transport / 认证、subagent 定义与内置 agent、provider 端点与鉴权、hook 事件与匹配规则、插件清单与安装解析、配置文件键与合并优先级。这六个主题章节 `source_refs` 所引用的文件在本修订下均未变化，因此不改写章节、不新增断言。

需要单独说明一条：`local_transcripts` v1 已把上述六个主题的问题列进跨主题链接，但那只是链接关系，不构成证据依赖，本轮不需要跟随修改。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| local_transcripts | `codebuddy-local_transcripts-v2` | `transcripts.archive`：partial（导出通道按前端拆分，新增 ZIP 内容与敏感性，状态不变）；`transcripts.cleanup`：partial（补入导出归档与保留期的边界推断，状态不变）；`transcripts.scope`：answered（归档内容含提示词与本地路径，记录范围本身未变，状态不变）；其余七题不变 | 交付工作区，待父进程集成 |
| skills | `codebuddy-cli-skills-v3` | `skills.invocation`：answered（新增 ACP 推送可见性口径，状态不变）；`skills.discovery`：partial（复核确认发现规则未变，状态不变）；其余七题不变 | 交付工作区，待父进程集成 |
| mcp | `codebuddy-cli-mcp-v1` | 本轮复核后无变化 | 保留旧版本 |
| custom_agents | `codebuddy-cli-custom_agents-v1` | 本轮复核后无变化 | 保留旧版本 |
| custom_providers | `codebuddy-cli-custom_providers-v2` | 本轮复核后无变化 | 保留旧版本 |
| hooks | `codebuddy-cli-hooks-v2` | 本轮复核后无变化 | 保留旧版本 |
| native_plugins | `codebuddy-cli-native_plugins-v1` | 本轮复核后无变化 | 保留旧版本 |
| configuration | `codebuddy-cli-configuration-v2` | 本轮复核后无变化 | 保留旧版本 |

**发布：** `delivery=pr`，本 worker 不构建 release、不切换指针、不运行 publish，候选留在 `/tmp/ahw-batch-20261006a/candidates/codebuddy` 交回巡检主进程。**受管二进制：** 未触发，`delivery=pr` 的 worker 不执行 `harness-binary`；npm 来源本轮 unchanged（`2.161.4`），观察到的版本与基线相同。

**新增固定来源记录：** 三个 artifact 与三个 snapshot 固定 `a70dea0b…` 下的 `docs/acp.md`、`docs/slash-commands.md`、`docs/web-ui.md`（`content_sha256` 由固定工作区实际计算），配三条新引用 `ref-codebuddy-skills-acp-command-list`、`ref-codebuddy-lt-slash-export-surfaces`、`ref-codebuddy-lt-webui-export-zip`。均只记 commit、file 与 hash，未复制任何源码或文档原件，未记临时工作区路径。

## 待处理与独立复核

**审计记录：** [audit-codebuddy-20261006t134000z.yaml](audit-codebuddy-20261006t134000z.yaml)。**待处理旧审计：** [audit-codebuddy-15aad900-8357-4b25-afcf-ad92cde5f78b.yaml](audit-codebuddy-15aad900-8357-4b25-afcf-ad92cde5f78b.yaml)，其 `review_status` 仍为 `pending`，`pending_question_ids` 覆盖其余主题且本轮按任务范围未解决。

**待复核问题：** 无。本轮改动不涉及来源冲突、推翻已发布的配置步骤，也不涉及跨主题关键加载机制变化（ACP 命令列表与 `/export` 导出都是能力描述层，不改变 Skill 发现位置、加载优先级或配置合并规则），按 maintenance 第 5 节不属于必须独立复核的高影响情形，由作者实际自检后结案。

**审计状态说明：** 本审计的 `review_status` 保持 `pending` 而非 `reviewed`，原因是它通过 `pending_audit_refs` 引用了上面那份未结案的旧审计，按「新审计引用未解决的旧审计时保持 pending，不能通过标 reviewed 间接关闭其阻塞」的约定，本轮不写 `reviewed_by` / `reviewed_at`。`pending_question_ids: []` 表示本轮观察没有遗留未答问题，**不等同于被引用的旧审计已结案**。这是父进程需要决定的一项记账问题。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-codebuddy-docs` | `8c7caf7a…` → `a70dea0b…` | changed；单提交，`git diff --name-only` 确认改动文件恰为 `docs/acp.md`、`docs/slash-commands.md`、`docs/web-ui.md`，各 1 处；`CHANGELOG.md` 与其余 `docs/*` 逐字未变 |
| `source-codebuddy-site` | `6041efd9…` → `6041efd9…` | unchanged |
| `source-codebuddy-npm` | `2.161.4@sha512-JBoVzj8r…` → `2.161.4@sha512-JBoVzj8r…` | unchanged；版本与 integrity 均未变，未取包字节，不构成章节变化或版本映射 |

## 验证与差异入口

`pnpm maintenance:candidates check --candidate /tmp/ahw-batch-20261006a/candidates/codebuddy` 通过（退出码 0，返回 `harness_id: codebuddy` 与 278 个文件清单）。该命令内部同时执行 `loadAndValidateChapters` 与 `validateAuditLedger`，因此本轮新增的 2 个章节版本、3 条引用、3 个快照、3 个 artifact 与改写后的审计记录都通过了单产品数据集校验和审计台账校验，零诊断。

审计台账的关键约束已逐条核对：两个 impact 的 `question_ids`、`section_ids`、`source_refs` 都能在对应主题的章节里找到；`surface_ids` 仅为已登记的 `cli`；`pending_question_ids: []` 是 impacts 所含问题集合的子集；`status: changed` 与 checks 中存在 changed 来源相符；`pending_audit_refs` 指向的旧审计在时序上已出现。

锚点复核在固定工作区内以只读方式逐行执行：`docs/acp.md:73`、`docs/slash-commands.md:45`、`:47-48` 文本与行号与基线一致；新引用定位 `docs/acp.md:110`、`docs/slash-commands.md:45`、`docs/web-ui.md:169` 均命中预期文本。三条新摘录由固定工作区文件程序化提取，未经手工转录，长度分别为 191、91、255 字符，均小于 schema 上限 800。

未运行项及原因：`pnpm knowledge:validate`、`pnpm sources:audit-log`、`pnpm verify` 属于父进程集成后的聚合闸门，本 worker 只编辑隔离候选、不集成真源，故不在此运行；`maintenance:candidates plan` 与 publish 由父进程在确认所有 worker 停止后统一执行。

父进程集成时需要更新的选择：`registry/chapter-current.yaml` 中 `local_transcripts` 指向 `codebuddy-local_transcripts-v1`、`skills` 指向 `codebuddy-cli-skills-v2`，本 worker 未改动该文件，应分别改指 `codebuddy-local_transcripts-v2` 与 `codebuddy-cli-skills-v3`。其余六个主题的选择保持不变。

查看差异：候选与基线比对用 `pnpm maintenance:candidates plan`（由父进程执行）；本轮改动文件为

```text
knowledge/codebuddy/chapters/codebuddy-local_transcripts-v2.md   （新增）
knowledge/codebuddy/chapters/codebuddy-cli-skills-v3.md           （新增）
knowledge/codebuddy/references/ref-codebuddy-lt-slash-export-surfaces.yaml   （新增）
knowledge/codebuddy/references/ref-codebuddy-lt-webui-export-zip.yaml        （新增）
knowledge/codebuddy/references/ref-codebuddy-skills-acp-command-list.yaml    （新增）
knowledge/codebuddy/artifacts/artifact-codebuddy-lt-docs-*-20261006.yaml      （新增 3 个）
knowledge/codebuddy/snapshots/snapshot-codebuddy-lt-docs-*-20261006.yaml     （新增 3 个）
audits/codebuddy/audit-codebuddy-20261006t134000z.yaml                       （改写）
audits/codebuddy/audit-codebuddy-20261006t134000z.md                         （新增）
```

已发布版本 `codebuddy-local_transcripts-v1` 与 `codebuddy-cli-skills-v2` 原样保留，未作任何修改（v1 与 main HEAD 逐字一致已确认）。

本轮使用的固定源码工作区：`ws-a70dea0bfddb-8abf2a45-e326-4648-a737-425d12f436af`（`source-codebuddy-docs` @ `a70dea0bfddb9c0c22f7d300e3f3fa61f718e6f6`），由父进程以 coordinator PID 3221207 打开并保留至复核结束；本 worker 未关闭、未新建工作区，也未重扫来源。