# opencode 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮把 skills 与 local_transcripts 两个主题各推进一个完整版本：候选新增 `opencode-skills-v4` 与 `opencode-local_transcripts-v2`，候选内 `registry/chapter-current.yaml` 已分别从 v3、v1 切到这两版，旧版文件全部保留未删。技能侧的实质变化是扫描规则收进独立模块（`packages/core/src/config/plugin/skill-scan.ts`），并把 `skills.conditions` 由 partial 补成 answered（`.claude` 兼容根开关与两个环境变量入口闭合）；会话侧的实质变化是正文收敛到 `session_message` 单表，记录内容、归档／导出／删除、诊断三节按新表结构重写。两章都以 commit `e965774fa0e2a8ffb27bf02827a2c3c6a8c0f45b` 重新取证，源码结论不等于 `opencode-ai@1.19.3` 的运行时行为。

维护者需要知道三点。第一，同一提交内存在文档与实现冲突：`packages/web/src/content/docs/cli.mdx` 仍写 `opencode db [query]`、`opencode db path` 和顶层 `export`／`import`，而 `packages/cli/src/commands/commands.ts` 的注册表里没有顶层 `db`，`export`／`import` 挂在 `session` 下；章节按注册表描述实际入口，同时保留文档说法。第二，本轮改动触发高影响复核条件，审计 `review_status` 仍为 `pending`，十道受影响问题全部列在 `pending_question_ids`，本轮没有关闭任何旧审计。第三，`local_transcripts` 的另外六题（location／naming／format／schema／lifecycle／database）不在派发范围，v2 的存储布局、记录类型与 V1 形状、生命周期、数据库分工四节仍沿用 `652c090d` 的结论，读者必须按小节标注的提交判断适用性。

## 变化的意义与证据边界

### Skill 扫描从 glob 改为独立扫描模块，条件维度闭合

本轮提交把散落在加载器里的扫描逻辑收敛成一个模块，规则随之收紧：广度优先、深度上限 6 层；以 `.` 开头的条目整支跳过，`node_modules`、`.git`、`.venv`、`venv`、`__pycache__` 按忽略目录表跳过；符号链接先 stat 解析目标类型；目录内出现 `SKILL.md` 即停止向下递归；只有扫描根层额外收下散装 `.md`；结果排序后返回。`.claude` 与 `.agents` 兼容根交给同一个扫描函数，配置目录与扩展来源也走同一套规则 [@ref-opencode-skills-scan-rules] [@ref-opencode-skills-compat-scan] [@ref-opencode-skills-scan-load]。可用技能列表的增量重述新增 `changed` 段；文件与配置变化进入同一事件流，去抖 100 毫秒后重扫，INFO 级记 `skills rescanned`，DEBUG 级记 `skill source loaded` 与 `skill file skipped` [@ref-opencode-skills-context-delta] [@ref-opencode-skills-reload]。

`skills.conditions` 的缺口本轮闭合：配置发现阶段的 `claude` 选项取 false 时 `.claude` 兼容根整体为空，`.agents` 没有对应开关；命令行把 `OPENCODE_DISABLE_CLAUDE_CODE` 与 `OPENCODE_DISABLE_CLAUDE_CODE_SKILLS` 任一为真映射成 `claude: false`，`OPENCODE_DISABLE_CLAUDE_CODE_PROMPT` 只影响提示词 [@ref-opencode-skills-claude-roots] [@ref-opencode-skills-env-disable]。因此该题由 partial 改为 answered，影响 skills.discovery、skills.format、skills.collision、skills.loading、skills.conditions、skills.diagnostics 六题与 skills-locations、skills-authoring、skills-selection、skills-loading、skills-diagnostics 五节。

证据边界：引用是固定提交上的 `git_source_file` 短摘录（例如 `skill-scan.ts` 第 7–46 行，`content_sha256` = `2af4ab4c…`），只能证明这一棵源码树；文档层面的六项查找位置仍成立，但实现入口是配置发现结果加兼容插件，两者不能互相代替。

### 会话正文收敛到单表，三节随之改写

当前表集合把会话正文收进 `session_message`：以 id 为主键，带 `session_id`、`type`、单调 `seq` 与 JSON `data` 列，对会话行级联删除，唯一索引为 `(session_id, seq)`；会话元数据与汇总计数在 `session_v2`。上一版描述的 V1 `message`／`part` 双表已不在当前 `session/sql.ts` 的表集合中 [@ref-opencode-transcripts-message-table]。摘要式压缩以 `metadata.keepID` 指向被逐字保留的第一条消息，读取历史时在内存中重建 recent 文本，被保留消息只存一份 [@ref-opencode-transcripts-compaction-keepid] [@ref-opencode-transcripts-compaction-rebuild]。

归档改为发布 `Archived`／`Unarchived` 事件，投影器只写会话行的 `time_archived`；列表的 `archived` 过滤是可选参数，省略即包含归档，而 `opencode session list` 不传该参数，所以归档会话仍出现在列表里 [@ref-opencode-transcripts-archive-service] [@ref-opencode-transcripts-archive-projector] [@ref-opencode-transcripts-list-archived-filter] [@ref-opencode-transcripts-cli-session-commands]。导出取会话元数据加当前消息表，`--sanitize` 用占位标记替换敏感字段；导入先查同名会话，冲突即报已存在，父会话必须已存在，消息重编号为 seq 1..n，并在创建事件提交里回填费用、token、创建时间与归档时间 [@ref-opencode-transcripts-transfer-export] [@ref-opencode-transcripts-transfer-import]。删除依次中断执行、等待空闲、关闭传输、递归删除子会话，最后发布 `Deleted` 事件，消息靠外键级联消失；保留策略仍只覆盖 `tool-output`（`tool_` 加 12 位十六进制命名、7 天、全局每小时扫描一次）[@ref-opencode-transcripts-remove] [@ref-opencode-transcripts-tool-output-cleanup-v2] [@ref-opencode-transcripts-tool-output-schedule-v2]。分享不再是记录机制的一部分：上游删除了 share 文档页，`share_url` 列仍在但会话层没有读写实现。

这组变化命中 transcripts.scope、transcripts.archive、transcripts.cleanup、transcripts.diagnostics 四题与 transcripts-record-content、transcripts-retention-and-recovery、transcripts-diagnostics 三节。证据边界：表结构、事件与命令面都有固定引用；但迁移前旧库的实际读取路径、以及 npm 发行包是否已带这套表，本轮都没有验证。v2 导语已声明源码树不等于任何发行包运行时行为。

### 同一提交内文档与实现冲突（复核触发点之一）

`cli.mdx` 第 536、552 行仍列 `opencode db [query]` 与 `opencode db path`，并介绍顶层 `export`／`import`；命令注册表里没有顶层 `db`，`export`／`import` 位于 `session` 子命令下，实际可用的是 `debug paths`、`session list`、`session export`。章节按注册表写实际入口并保留文档说法，排错时以实际输出为准。该冲突在基线 `8ffbcc2c` 已存在，不是本轮引入，但它属于“来源冲突不能由版本差异解释”，是本轮保持 pending 的原因之一。另一个触发点是跨主题加载机制：Skill 扫描同时服务 `.claude`／`.agents` 兼容根与配置扩展来源，会话表切换又同时影响记录、归档、导入导出与诊断。

### 未重审的残留

`local_transcripts` 的 location、naming、format、schema、lifecycle、database 六题不在本轮派发范围，未重新审计。v2 中存储布局、记录类型与 V1 形状、生命周期、数据库分工四节沿用 `652c090d` 的结论；页首导语只列了“存储布局、生命周期、数据库分工”三节，记录类型一节在正文单独标注沿用。这些旧小节仍按 `message`／`part` 与旧三表导入描述，与新版的 `session_message` 结论并存，读者需靠导语与标注区分，存在误读风险。npm 侧从 `1.19.0` 到 `1.19.3` 只是 registry 身份变化，本轮没有建立它与源码树的映射，也没有据此改写运行时行为。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | `opencode-skills-v4` | skills.discovery、skills.format、skills.collision、skills.loading、skills.conditions、skills.diagnostics：候选章节均为 answered（conditions 由 partial 改为 answered） | 新建完整 edition 写入候选；候选选章由 `opencode-skills-v3` 切到 v4；v1–v3 保留未删。审计仍列为 pending，独立复核完成前不算结案。 |
| local_transcripts | `opencode-local_transcripts-v2` | transcripts.scope、transcripts.archive、transcripts.cleanup、transcripts.diagnostics：候选章节均为 answered | 新建完整 edition；候选选章由 `opencode-local_transcripts-v1` 切到 v2；v1 保留未删。其余六题未重审，对应小节沿用 `652c090d`。审计仍列为 pending。 |

**发布：** 无 release ID。`delivery=pr` 候选只新增两章、26 个 reference、17 个 snapshot 与 17 个 artifact，并切换候选内 `registry/chapter-current.yaml`；未运行 staging 构建，未做站点／CLI／MCP 验收，未切换 `releases/current.json`，发布由父进程合并后按既有 CI 执行。 **受管二进制：** 未触发。本轮 npm 观察到 `opencode-ai@1.19.3`，但任务规则禁止调用 `harness-binary`；候选 `registry/sources` 与 `registry/harnesses` 与基线一致，无受管包变更。

## 待处理与独立复核

**审计记录：** `audits/opencode/audit-opencode-60e50849-c85d-456f-a3dd-90450aee400d.yaml`（`status: changed`、`review_status: pending`，未写 `reviewed_by`／`reviewed_at`）。

**待处理旧审计：** 以下六条全部仍为 `changed`／`pending`，本轮只引用、没有关闭：

- `audit-opencode-0f16a4f4-327b-41be-bbbb-d7da9bfdd6c0`（2026-10-08）
- `audit-opencode-2aa143e4-1b45-4f8f-8bba-c200a6007522`（2026-10-11）
- `audit-opencode-12691d48-1a45-4b04-bc22-ef7201bd564e`（2026-10-12）
- `audit-opencode-52ea2a76-9938-44ec-a454-01dfc9e8e3b8`（2026-10-13）
- `audit-opencode-1a190643-5d32-4b65-930f-ec54bdf330bc`（2026-10-14）
- `audit-opencode-6b2f4d18-7c05-4e91-a3d6-5f18c02b7e44`（2026-10-15，上一轮）

按仓库规则，新审计引用未解决的旧审计时保持 pending，不能以 `reviewed` 间接关闭其阻塞。因此本轮只到“候选已完成”，不是“已复核”。

**待复核问题：** skills.collision、skills.conditions、skills.diagnostics、skills.discovery、skills.format、skills.loading、transcripts.archive、transcripts.cleanup、transcripts.diagnostics、transcripts.scope，即审计 `pending_question_ids` 的全部十项。触发原因是三类高影响条件：同一提交内文档与命令注册表对 `db`／`export`／`import` 入口的冲突；Skill 扫描被兼容根复用的跨主题加载机制变化；会话正文表由 V1 双表改为 `session_message` 单表，替换了已发布章节的表结构与命令面结论。复核人尚未指定，结论未定；这十题在候选章节里虽已给出 answered 答案，复核完成前不视为结案。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-opencode-npm`（`opencode-ai`） | `1.19.0@sha512-lddJhFwZI3GLlw8VyOo4yNwBVGeVN/mxH6ORh60h69zAXL7QhjSWY9orj10rwO2kxVnxH9dh45uDCWNuiqPb8A==` → `1.19.3@sha512-wDRcUlMDibaLzecIGvVGUA9naghXVqzCWcUE7N3qagpGiLSUlU4VbixI+bpsErwJp+AAuSO2lhSr/XxJl7XbrQ==` | changed。仅 registry 上的发行身份变化；本轮未建立该包与源码树的映射，章节不据此改写运行时行为。 |
| `source-opencode-repo`（`https://github.com/anomalyco/opencode.git`，`refs/heads/dev`） | `8ffbcc2c81d1ff558618137204c36954797d7a6f` → `e965774fa0e2a8ffb27bf02827a2c3c6a8c0f45b` | changed。扫描记录 1352 个 changed 文件，其中 18 个被章节引用并逐个比对；机制级变化集中在 `skill-scan.ts` 独立扫描模块、`session/sql.ts` 的 `session_message` 单表、归档事件与投影、`session/transfer.ts` 导入导出、`commands.ts` 命令注册表。同一提交内 `cli.mdx` 仍写 `opencode db`，与注册表冲突。 |

## 验证与差异入口

固定来源身份为本报告全部结论所依赖的 commit `e965774fa0e2a8ffb27bf02827a2c3c6a8c0f45b`；原件留在源码工作区 `/tmp/ahw-source-workspaces/ws-e965774fa0e2-a731bf82-b371-4e32-a4cb-19eaeade96f5`（`git log -1` 为该 commit，重算 `packages/core/src/config/plugin/skill-scan.ts` 的 sha256 得 `2af4ab4ca137e727d71bda2f480bbf38ba0def3ef6c216d4fcc067d536a01b0e`，与候选 snapshot 记录一致）。候选内只存 snapshot／artifact 的 commit、file 与 content_sha256，没有复制 checkout。

已做的只读核对：两章正文与 frontmatter 引用的 reference 全部存在（本轮新增 26 个，其余沿用旧引用）；17 个 `-20261022` snapshot 均带 `content_sha256`；`[@ref-…]` 标记全部能在 `knowledge/opencode/references/` 命中。本轮是文档任务，**未运行** `pnpm -s maintenance:candidates check --candidate <candidate-root>`、`pnpm knowledge:validate`、`pnpm sources:audit-log`、构建／lint／测试；父进程合并前应运行这四条校验与 `git diff --check`。

本轮改动的章节版本：`knowledge/opencode/chapters/opencode-skills-v4.md`、`knowledge/opencode/chapters/opencode-local_transcripts-v2.md`；来源引用在 `knowledge/opencode/references/`（新增 26 个），固定快照在 `knowledge/opencode/snapshots/`（新增 17 个），映射在 `registry/chapter-current.yaml`。

查看完整差异与未跟踪文件：

```sh
diff -ru /tmp/ahw-monitor-4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns/batch-20261022/baseline/opencode \
         /tmp/ahw-monitor-4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns/batch-20261022/candidates/opencode
find /tmp/ahw-monitor-4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns/batch-20261022/candidates/opencode -type f | sort
```
