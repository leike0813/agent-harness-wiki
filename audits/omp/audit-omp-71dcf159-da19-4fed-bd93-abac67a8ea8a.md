# omp 维护报告 — audit-omp-71dcf159-da19-4fed-bd93-abac67a8ea8a

- 产品：`omp`（`@oh-my-pi/pi-coding-agent`），界面 `cli`
- 固定来源：`source-omp-repo` `4b5e4fb7ea8ec2d37b8b6b138ea01125fe0a17dc` → `adc7fed5c9d6837d77b590bc313a705e2b4136b0`（609 changed paths）；`source-omp-npm` `18.8.9` → `18.10.2`
- 证据工作区：`ws-adc7fed5c9d6-e22b16f5-4ffc-4b02-bcce-91df8c5dbedf`（只读）
- 结论：`status: changed`，`review_status: pending`（见"需要独立复核"）

## 一、来源身份与 triage 结论

| 来源 | 结论 | 依据 |
|---|---|---|
| `source-omp-repo` | 有知识影响 | 609 changed paths；下述四章改动逐条对到 `adc7fed5` 的实际代码与随仓文档 |
| `source-omp-npm` | `reviewed_no_knowledge_impact` | 18.8.9→18.10.2 是常规发行身份变更（integrity 随版本一起变）。没有任何小节级证据把已记录的机制绑定到已发布的 18.10.2 产物，本轮也未取到该版本的会话/配置文件。仓库 HEAD 本身不能证明已发布包的行为，因此不改章节、不新建软件版本映射。 |

扫描器把八个主题全部标为 `shared or unknown impact; assess relevant entrypoints`。本次按各章实际引用逐条收敛，四个主题修订、四个主题结案。

## 二、章节修订

### local_transcripts — `omp-local_transcripts-v3`

`omp gc` 的 sessions 阶段新增一类回收对象，跨机搬运有了官方命令，resume 路径多一道分叉守卫。

- **重写临时文件回收**。`docs/session.md`（`adc7fed5` L583）写明 sessions 阶段会删除超过 5 分钟写宽限的 `.<name>.jsonl.<snowflake>.tmp`（含已登记 `--session` 文件旁的同形文件），理由是活的重写在毫秒级内 rename 到位，留下的必然来自被 kill 或崩溃的写者。代码侧对应 `collectSessionStagingFiles()`（`**/.*.jsonl.*.tmp`，`dot: true`，并按 basename 前缀补扫已登记会话旁）与 `sweepSessionStagingFiles()`（按 `GC_WRITE_GRACE_MS` 过滤，`--apply` 才 unlink，计数进 `wouldDeleteTemps`/`deletedTemps`/`tempBytes`）。它属于 sessions 阶段而非 stale 阶段，因此不需要 `gc.stale` opt-in。
- **配套语义变化**。`collectRegisteredSessionFiles()` 更名 `collectRegisteredSessionPaths()`，不再要求登记目标存在；blob 清扫那侧仍保留 `isFile()` 过滤。`runGcCommand()` 的注释解释了为什么必须在 stale 清理之前收集登记路径。
- **新命令 `omp session pack|unpack|moved`**。档案是普通 tar，成员固定为 `manifest.json` / `session.jsonl` / `artifacts/<path>` / `blobs/<sha256>`。`pack` 拒绝别的活进程持有的会话并持租约读文件，本地缺失的 blob 只 warn 并列入 `missingBlobs`；`unpack` 在写任何东西之前整体校验（manifest 版本、成员布局、每个 blob 的 sha256），落位分 `created`/`replaced`/`forked` 三态；`moved` 给留下的副本追加 `departed` 标记。
- **新条目类型 `session-transfer`**。落盘形态是 `custom_message` + `customType: "session-transfer"`，`details.kind` 分 `arrived`/`departed`/`forked`。它不像 `system-prompt-digest` 那样是旁路——`lastSessionTransfer()` 会读它并改变 resume 行为。
- **resume 守卫**。`createSessionManager()` 把每条 resume 路径（路径式 `--resume`、按 id/cwd 解析的 `--resume`、两处会话移动后的恢复、`--continue`、auto-resume、选择器选中）都包进 `forkIfMovedAway()`。排错含义已写进诊断小节。
- **未变部分已在正文写明**：默认布局与 XDG 拍平、`history.db` 路径、header/条目类型全集、v1→v2→v3 迁移、惰性落盘门槛、归档三道闸、标题行随归档删除。
- `transcripts.archive` 仍记 `partial`：`.jsonl.gz` 归档目录的恢复缺口没有被填上，新命令不读该归档。

### configuration — `omp-configuration-v6`

- 新增 `task.structured`（boolean，默认 `false`）：关时 task 子代理没有 yield 工具、以最终消息原文返回；开时才把 `outputSchema`/`schemaMode` 暴露到 task 工具并按 schema 校验。eval 的 `agent()`/`workpool` spawn 始终保留结构化结果，不受此开关影响。
- 新增 `task.agentSoftRequestBudget`（record，默认 `{}`）：精确 agent 名 → 非负安全整数，`0` 关掉该 agent 的守卫，`null` 清掉低优先层继承值，非法值在加载设置阶段抛错。
- `tui.autoGraph` 的**取值与默认值未变**（`smart`/`always`/`off`，默认 `always`），变的是 `smart` 档的描述扩写。
- 这两个键在 `docs/settings.md` 的表格里**没有对应行**，取证只能落在 `register()` 定义上，正文已如实标注"先有注册定义、后补文档"。
- 层序、合并规则、运行时覆盖、写入目标、信任边界、迁移路径在该区间均无改动，正文写明沿用上一版取证。

### custom_providers — `omp-custom_providers-v4`

上一版引用的九处证据全部落在 `docs/models.md` 与 `docs/providers.md` 的若干小节，这些小节在两个 commit 之间**逐字节相同**，因此没有需要纠正的旧结论。本次覆盖的是同一文件里新出现的相邻事实：

- `api` 取值列表新增 `openai-decisions` 与 `workers-ai-systemone`；四个 judgment API 的请求形状并不相同（`{baseUrl}/v1/systemone`、`{baseUrl}/decisions`、OpenAI Decisions API 形状、`{baseUrl}/{model id}` 且 `<account>` 逐请求填充）。
- 新增内置 provider `cloudflare-workers-ai`：环境变量入口 `CLOUDFLARE_API_TOKEN` → 回退 `CLOUDFLARE_AUTH_TOKEN`，加 `CLOUDFLARE_ACCOUNT_ID` 做账户路由；`/login` 交互式索取并一并存储。凭据七档顺序不变。
- `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` 是一个直接改写请求体形状的开关，列举了被裁掉的字段与 `anthropic-beta` token、保留的能力，以及由 compat 轴 `honors-claude-code-beta-kill-switch` 决定哪些 provider 遵守它。

### custom_agents — `omp-custom_agents-v4`

八处引用中有七处所在小节逐字节相同，只有 `Model and structured-output precedence` 变了：新增 `task.agentSoftRequestBudget[agentName]`，**双向覆盖**全局 `task.softRequestBudget` 与随包 scout/sonic 上限（压缩触发器的 per-agent 条目只压过模型条目，方向不同，正文已点明这个区别）。

## 三、排除的主题与理由

| 主题 | 结论 | 排除依据 |
|---|---|---|
| skills | `reviewed_no_knowledge_impact` | `omp-skills-v3` 的引用全部落在未变更路径上；变更文档里也不含它引用的任何小节标题 |
| mcp | `reviewed_no_knowledge_impact` | 唯一落在变更文档里的引用是 `models.md` 的 `oauth` 小节，两 commit 间逐字节相同 |
| hooks | `reviewed_no_knowledge_impact` | 同 skills：引用未指向任何变更文件 |
| native_plugins | `reviewed_no_knowledge_impact` | 唯一引用 `models.md` 的 `Runtime model` 小节，逐字节相同 |

## 四、`dirs.ts` 的跟随结果

`packages/utils/src/dirs.ts` 在 `788cf9e..adc7fed5` 区间**只新增一个函数** `getMnemopiEmbedRuntimeDir()` → `~/.omp/run/mnemopi`（state 域），唯一消费者是 `mnemopi/embed-client.ts` 的 per-model 嵌入服务。`getSessionsDir`、`getBlobsDir`、`getArchivedSessionsDir`、`getTerminalSessionsDir`、`getCustomSessionFilesDir`、`getSessionOwnersDir` 与 `history.db` 解析全部未改。

- **延伸进 local_transcripts**：该章明确陈述了上述路径，因此写入"路径解析未变、新增的是另一个域"的复核记录。
- **延伸进 configuration**：同样写入 `config-roots`，确认 `getNativesDir()`/`PI_NATIVES_DIR` 解析未变。
- **未延伸进 skills / plugins / mcp**：这三章都不引用 `dirs.ts`，也都不陈述由它推导的数据或配置路径，新函数无从推翻任何现有表述。记忆后端的运行时目录本身也不是配置来源、会话记录或扩展安装根，因此没有为它单独改任何章节。

### 复核后的更正（第二轮）

独立复核提出 7 项，本轮已逐项修正：

1. `forkIfMovedAway` 的引用原先指向 `session-transfer.ts:480-502`（`setAside` 区域），已改指真正的实现 `659-670`；守卫包裹全部 resume 路径的调用点为 `main.ts` 1242/1257/1272/1278/1281/1294/2156。
2. 原来用一个模块文档注释引用承载四条行为断言，已拆成各自承载代码的引用：`pack-lease`（`claimSessionOrRefuse`，211-222）、`pack-atomic`（`writeArchiveAtomically` 与 `packSession` 文档注释，252-264）、`pack-missing-blobs`（319-333）、`unpack-mode`（`UnpackMode`，102-108）、`unpack-placement`（`unpackSession` 文档注释，550-562）、`unpack-forked`（分叉分支，596-601）。模块注释引用保留，仅用于 tar 成员布局这一条。
3. Workers AI 的 `〈account〉` 解析更正为"逐请求从已存凭据的 account ID 解析，取不到回落到 `CLOUDFLARE_ACCOUNT_ID`"，依据改用 `docs/provider-quirks.md:2302`（该行明确写出 `else CLOUDFLARE_ACCOUNT_ID`）。`docs/models.md:149` 单行即 912 字节，超过 800 字节 excerpt 上限，无法直接作为 excerpt，因此新增该引用而非扩展原引用。
4. `task.agentSoftRequestBudget` 的类型与默认值拆到 `436-441`（`register()` 块），校验规则留在 `415-430`（`validateAgentSoftRequestBudget()`），两条引用分工明确。
5. `tui.autoGraph` 的代码引用从 `455-461` 扩到 `455-479`，覆盖到重写后的 `smart` 描述。
6. `pending_question_ids` 原为空是错的。当前选章中仍有 18 道题不是 `answered`（16 道 partial，`config.trust` 为 unknown），已全部恢复；`review_status` 因此保持 `pending`。
7. impact 的 `section_ids` 已对齐实际改动：`local_transcripts` 补上确实改动的 `transcripts-scope`（第三个固定 commit 与 `dirs.ts` 复核段落写在该节），`configuration` 去掉没有正文改动的 `config-roots`。

另：为四个本轮无来源变化但仍有未完成问题的章节（`skills`、`mcp`、`hooks`、`native_plugins`）补了 impact，使每道 pending 题都有归属小节与真实引用。这些题本轮未调查，只做归属，不改章节。

## 五、需要独立复核

`review_status: pending`。`omp session pack|unpack|moved` 改变了会话跨机搬运的方式，新增了一个会被回放逻辑读取的第一方 `custom_message` 类型（新写标记被旧版本读取时的行为本轮未验证），并改动了 `main.ts` 里**每一条** resume 路径。这属于跨主题的生命周期/加载机制变更，按 skill 第 5 节应交独立 reviewer，因此本章未自我签署为 `reviewed`。

具体请复核的问题：

1. `forkIfMovedAway()` 挂在全部 resume 路径上是否与既有 `--continue` 面包屑策略、选择器行为存在未记录的交互？
2. `unpackSession()` 的 `forked` 模式（新 id + `parentSession` 指向原 id）是否与本章陈述的"父子关系落在 header 的 `parentSession` 字符串上"完全一致？
3. sessions 阶段的 temp 清扫与归档移动同处一个阶段、共享同一个 5 分钟宽限，是否存在归档正在移动会话时误删其 temp 的窗口？

## 六、候选自检

```
cd /home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor
pnpm maintenance:candidates check --candidate /tmp/ahw-batch-1791831061/candidates/omp
```

退出码 0。复核修正后共 27 条新 `git_source_file` 引用（`ref-omp-lt3-*` / `ref-omp-cfg6-*` / `ref-omp-providers4-*` / `ref-omp-agents3-*`）的 excerpt 已逐条与 workspace 字节比对，全部 verbatim；新增 `docs/provider-quirks.md` 的 artifact/snapshot，hash 由 workspace 字节计算；artifact 的 `content_sha256` 由 workspace 文件字节计算，未臆造。四份新章节的 frontmatter 声明引用与正文行内标记完全一致，无悬空引用、无未使用声明；audit 的 18 道 pending 题全部有归属 impact。

未运行仓库级 `pnpm verify`（按分工由协调者统一执行）。