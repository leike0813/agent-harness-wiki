# omp 定向维护报告（20261011T015904Z worker）

## 来源与固定身份

- `source-omp-repo`：基线 `788cf9ef10c82634b2a685fb2d1455362acf81b9` → 观察 `4b5e4fb7ea8ec2d37b8b6b138ea01125fe0a17dc`，区间 966 个改动文件。
- 读取位置：协调者固定的 source workspace `/tmp/ahw-source-workspaces/ws-4b5e4fb7ea8e-f54640a7-4c18-488e-abfb-ad701c8174ce`（只读，未在候选内复制任何 checkout）。
- 新增证据一律以 `git_source_file` 记录 `commit` + 仓库相对 `file` + `content_sha256`，未记录任何临时路径。
- `source-omp-npm` 本轮未取证。

## 调查的文件

`git log/diff 788cf9e..4b5e4fb7 --` 逐个核对了：
`docs/environment-variables.md`、`docs/mcp-config.md`、`docs/context-files.md`、`docs/settings.md`、
`packages/coding-agent/src/discovery/custom-context-files.ts`、`packages/coding-agent/src/session/context-settings.ts`、`packages/coding-agent/src/config/settings-ui.ts`。

未对 966 个文件的整体范围做评审。

## configuration 的语义 triage

`contextFiles.extra` 在基线 `788cf9e` 中不存在（`git grep` 命中 0 次），在 `4b5e4fb7` 中作为新设置与新 discovery provider 出现，属实质变化：

- 新设置 `contextFiles.extra`（array，默认 `[]`，加载时校验：非数组、空条目、含 `/` `\` `\0` `.` `..`、四个内置名均报错）。
- 新 provider `custom-context`，优先级 9，位于 `agents-md`/`claude-md`（10）与 `mcp-json`/`ssh-json`（5）之间。
- 新来源隔离：名单 provenance 为 `project` 时不读用户 agent 目录；`/settings` 面板那一行同时被隐藏，避免把项目名单写进全局层。
- 数组语义沿用既有规则（高优先层替换而非追加）。

`docs/environment-variables.md` 确实影响了一条已录答案：`PI_NATIVES_DIR` 的说明改写为“也搬移下载的 tree-sitter 语法包（`grammars/`）”。已录结论“它不是配置来源入口”仍然成立，但边界收窄，因此新增 `ref-omp-cfg5-sources-natives-dir-doc-4b5e` 并列取代，旧引用保留。同表新增 `PI_BUILD_URL` 与 `PI_GRAMMARS_URL`，二者是下载来源而非配置读取入口。

`config.trust` 复核后维持 `unknown`：新增的隔离逻辑只按该键的 provenance 是否为 `project` 分支，源码注释与官方文档给出的动机都是“不要把仓库名单或 agent 目录文件带进提示”，没有用户确认、目录白名单或组织策略出现，不足以改写信任结论。

结论：新出 `omp-configuration-v5` 完整 edition，`omp-configuration-v4` 保留未改。

## mcp 的语义 triage

`docs/mcp-config.md` 在该区间的 diff 只是在第 118 行末尾追加一句：交互式与 `--mode rpc-ui` 会话首轮最多等 1.5 秒 MCP 启动，因此首轮系统提示包含到那时已连上的 server，更慢的 server 改变下一轮提示。

配置位置、文件形状、传输、认证的已录答案均未变。只有 `mcp.exposure` 与 `mcp.diagnostics` 受影响：新出 `omp-mcp-v4`，`omp-mcp-v3` 保留未改。

## 未展开但已发现的相邻证据（未据此改写任何已录答案）

`docs/settings.md` 在同一区间还有 `retry.fallbackOn`、`bash.gitGuard`、`compaction.modelThresholds` 新语义（token 基值 / `f` 前缀固定触发 / 扩展窗口）、`tts.localSpeed` 与 `speech.speed`、`ask.timeout` 扩展等改动。这些不在本轮任务点名的范围内，未展开调查，也未改写 `config.defaults` 已录的 `compaction.modelThresholds` 条目。若协调者认为应覆盖 `config.defaults` 的 compaction 语义，需要在下一轮把该问题明确纳入范围。

## 明确排除

merge commits、session / resumed-request 推理内部、editor / `@annotate` UI、relay target 行为、compaction 内部，以及全部 test / bazel / patch 文件。另按任务要求未触碰 skills、custom_agents、custom_providers、hooks、native_plugins、local_transcripts 六个主题。

## 复核

`review_status: reviewed`（作者自检，`reviewed_by` / `reviewed_at` 已填，`pending_question_ids` 为空）。本轮是纯增量（一个新设置 + 一个新 provider + 一句启动时序说明），未推翻任何已发布的配置步骤，也未改变跨主题的关键加载机制，不属高影响结论，因此不需要独立 reviewer。

自检记录：`pnpm maintenance:candidates check --candidate <omp 候选根>` 通过。剩余的 `COVERAGE_INCOMPLETE` 诊断是 severity=warning 的既有状态（7 个 omp coverage 记录全部为 `partial`，与批次基线一致），不是本轮引入的错误。

## 阻塞

无。
