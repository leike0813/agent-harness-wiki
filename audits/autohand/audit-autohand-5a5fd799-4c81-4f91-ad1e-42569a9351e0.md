# Autohand Code CLI 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮来源有实质变化，而且落在已发布章节上。仓库 `source-autohand-repo` 从 `d01ef07e026eb9c5e4fb82ad5b12586e04022c66` 前进到 `fcd92ec12f30ea113f44ef4887ea0d8c51556331`，118 个变更路径里有 8 个被已发布引用命中；逐个读 diff 后确认 6 个文件改动了读者看到的结论。候选据此新建两个 edition：`autohand-cli-configuration-v4` 与 `autohand-local_transcripts-v2`，并把 `registry/chapter-current.yaml` 的 configuration、local_transcripts 两个指针指向它们；`autohand-cli-configuration-v3` 与 `autohand-local_transcripts-v1` 原样保留。`skills` 复核后只是行号整体后移，`skills.roots` 的结论不变，保持 `autohand-cli-skills-v1`。其余五个主题（hooks、mcp、custom_agents、custom_providers、native_plugins）本轮未派发、未改动。

需要先知道三件事：

1. **这是行为变化，不只是文档追平。** 交互式终端会话的默认模式由 `automode` 改为 `default`，auto 模式必须显式打开；`automode.maxCost` 与 `--max-cost` 从受支持改为启动即报错；`-c` 从 `--auto-commit` 改指 `--continue`，沿用旧写法的脚本会静默变成「续接本目录最近会话」。
2. **导出变了。** `/export` 改为先脱敏再落盘并打印 `Secrets redacted: N`，裸文件名不再写工作区而是写进 `$AUTOHAND_HOME/exports/`。
3. **本轮没有结案。** 审计 `review_status` 是 `pending`：上述结论推翻了已发布配置步骤，另有三条来源冲突，按 skill 需要独立复核，而候选内没有复核结论；上一轮的待续审计 `audit-autohand-6f377dcd-9544-4955-a7a9-b5c1daa4eb3d` 也没有被本轮关闭。

## 变化的意义与证据边界

### 默认交互模式从 `automode` 改为 `default`

`ui.defaultInteractionMode` 的默认值被改成 `default`，即启动时先按询问风险操作的常规模式运行。同提交的仓库配置参考第 777 行、`src/config.ts` 的 `validateConfig`（该键只接受 `default`/`plan`/`automode`/`yolo`，非法取值直接抛错并指出文件路径）与 v4 的 `config-runtime`、`config-trust-defaults` 两节构成闭环证据。[@ref-autohand-m63-docs-config-interaction-mode][@ref-autohand-m63-src-config-ui-validation]

这直接推翻了 v3 已发布的一句话「`ui.defaultInteractionMode`（默认 `automode`）」。影响问题 `config.defaults`（改判 `answered`）、小节 `config-runtime` 与 `config-trust-defaults`。显式开关 `--plan`/`--yolo`/`--restricted`/`--dry-run`/`--unrestricted`/`--yes` 与受限 `permissions.mode` 仍然压过该设置，command/RPC/ACP 运行依旧不会被切到 auto 模式——这几条旧结论未变。

证据边界：能证明的是「默认值与枚举校验来自同一 commit 的仓库文档与源码」。文档站 Configuration 页本轮 hash 变了，但项目 archive 没有留存该页新原件，候选也未新增 docs-site snapshot，所以站点原话不作为本轮证据；旧站点引用按其原 snapshot 保留，只支撑未改动的事实。

### `automode.maxCost` 退出、`-c` 改指 `--continue`、两个实验开关默认开

同一批改动里还有四处会影响升级动作：

- `--max-cost` 仍留在参数解析器里但被隐藏，一被传入就抛 `--max-cost is not supported. Use --max-iterations or --max-runtime instead.`；auto-mode 启动时若配置里仍有 `automode.maxCost`，`getAutomodeOptions` 同样直接报错，而不是忽略；`/settings` 的 auto-mode 分组已移除该项。[@ref-autohand-m63-src-index-max-cost][@ref-autohand-m63-src-automode-max-cost][@ref-autohand-m63-src-commands-settings]
- 根命令现在注册 `-c, --continue` 与 `-r, --resume [id]`，`--auto-commit` 只剩长选项。[@ref-autohand-m63-src-resume-options]
- `features.cliUsageV2` 默认开（配置参考第 3019 行），`features.autohand_inference` 默认开（同文件对应小节 + `src/featureFlags.ts` 的 `isAutohandInferenceEnabled` 返回 true）。[@ref-autohand-m63-docs-cli-usage-v2][@ref-autohand-m63-docs-autohand-inference]

影响问题 `config.defaults`（`answered`）与 `config.migration`（`partial`）、小节 `config-migration`、`config-diagnostics`、`config-trust-defaults`。`config.migration` 仍是 `partial` 的原因写在章节里：来源只给出逐项兼容行为，没有通用迁移框架（版本号、迁移脚本、破坏性变更清单）。

本轮记录的三条来源冲突，均以源码与同提交仓库参考为准，章节内并列保留了站点说法：

- 仓库配置参考的 `--auto-commit` 段落仍写 `-c` remains the same option，与同页旗标表（`-c, --continue`）及 `src/startup/resumeCommand.ts` 的注册冲突。
- 文档站 configuration 页 auto-mode 表仍列 `maxCost` 默认 10，而仓库参考的 Auto-Mode 旗标表已移除该项，源码在 auto-mode 启动时直接拒绝 `automode.maxCost`。
- 文档站 configuration 页写 `features.autohand_inference`「off unless deliberately enabled」，仓库参考写默认开启，`src/featureFlags.ts` 也返回 true。

这三条都属于站点落后，但审计没有据此自行裁决，`review_status` 保持 `pending`。

### 导出先脱敏、默认落到 `$AUTOHAND_HOME/exports/`，根命令新增 `-c`/`-r`

`autohand-local_transcripts-v2` 改了三处机制：

- **导出先脱敏再落盘**：`buildSessionExport` 序列化 `metadata` 与 `messages` 时逐字符串调用脱敏函数，密钥/令牌、私钥块、`KEY=value`、URL 凭据查询参数与 home 路径都会被改写；字段名像凭据时整段替换为 `[REDACTED]`，命令结束打印 `Secrets redacted: N`。文件名字段里的项目名也先脱敏再 slug 化。[@ref-autohand-m63-src-export-redaction][@ref-autohand-m63-src-export-redaction-field][@ref-autohand-m63-src-export-filename]
- **落点换了**：`resolveExportPath` 把裸文件名写到 `$AUTOHAND_HOME/exports/`（来自 `src/constants.ts` 的 `AUTOHAND_PATHS.exports`），绝对路径与 `./` 前缀表示显式目标，越界相对路径报错。[@ref-autohand-m63-src-export-path][@ref-autohand-m63-src-constants-exports][@ref-autohand-m63-docs-config-export]
- **根命令续接**：`-c/--continue` 取当前目录最近会话（可与 `-p` 同用，无历史时提示并按新会话继续），`-r/--resume [id]` 带引用解析、省略时打开选择器；`validateSessionOptions` 在启动前报互斥错误（`--ephemeral` 与 `--resume`/`--fork`/`--continue`，`--continue` 与 `--resume`/`--fork`），选择器取消时 `resolveStartupSession` 返回 false 使启动直接结束而不建空会话。[@ref-autohand-m63-src-resume-options][@ref-autohand-m63-src-resume-validate][@ref-autohand-m63-src-resume-startup][@ref-autohand-m63-docs-resume-flags]

影响问题 `transcripts.archive`、`transcripts.lifecycle`、`transcripts.diagnostics`（均 `answered`），小节 `transcripts-export-transfer-and-retention`、`transcripts-lifecycle`、`transcripts-diagnostics`。上一版关于「导出是阅读用快照、不是可恢复归档」的判断未变，本轮也没有找到会话删除命令、保留期配置或自动清理策略，`transcripts.cleanup` 仍是 `partial`。

证据边界：本章按来源级知识记录（`version_applicability: unknown`），没有新建 `mappings/`，也不把结论外推到 npm 发行版；本轮未执行真实 harness，未读取任何真实会话文件。v1 已记录的缺口仍在：原生会话中图片/附件的最终表达、普通 `appendFile` 的文件权限默认值、删除后重建索引的做法，本轮都没有新证据。

### skills：只有行号后移，不新建版本

`src/constants.ts` 本轮只新增了 `exports` 路径段，`getUserSkillLocations`、`getProjectSkillLocations` 与 `THIRD_PARTY_PROJECT_SKILL_DIRS` 的内容与上一轮一致，因此引用定位整体后移。文档站 skills 页 hash 变了，但重新核对的 Skill discovery 表仍是同样五处路径与 `**/SKILL.md`、`*/SKILL.md` 两种模式。`skills.roots` 保持 `answered`，章节保持 `autohand-cli-skills-v1`，本轮未为 skills 新增任何引用或 snapshot。

### 核查范围与排除项

118 个变更路径中，除上面 6 个文件外，其余 diff 逐个看过并排除：`PermissionManager` 的 `readOnlyReview`/`READ_ONLY_REVIEW_TOOLS` 属审查期权限门控，不在八个固定问题内；`src/config.ts` 的 `applyCliModelOverride` 属 `config.runtime`，本轮未复审该题；`src/feedback/sessionTranscript.ts` 的脱敏计数是 `exportSession` 的实现细节；`AutomodeManager` 的其余改动属 auto-mode 运行时而非配置问题；`tests/`、`install.*`、`.github/workflows/`、`src/review/`、`src/testing/` 属其他子系统。`docs/config-reference` 的多语言副本未逐份引用，本轮结论只引英文原件。跨主题链接（`providers.*`、`hooks.*`、`mcp.*`、`plugins.diagnostics`）指向的章节本轮均未改动。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | autohand-cli-configuration-v4 | config.defaults：answered；config.diagnostics：answered；config.migration：partial | 已进入候选并把 `chapter-current` 指向 v4；v3 保留 |
| local_transcripts | autohand-local_transcripts-v2 | transcripts.lifecycle：answered；transcripts.archive：answered；transcripts.diagnostics：answered | 已进入候选并把 `chapter-current` 指向 v2；v1 保留 |
| skills | autohand-cli-skills-v1（无新 edition） | skills.roots：answered（结论未变） | 保留旧版本 |
| hooks / mcp / custom_agents / custom_providers / native_plugins | 各自当前版本 | 无（未派发） | 保留旧版本 |

**发布：** 本轮 `delivery=pr`，worker 不发布：候选内没有 release 记录，也没有 staging 构建或验收产物，读者可见的合并与发布由 monitor 在其 PR 流程完成，本报告不声明已完成发布。候选内新增 `autohand-cli-configuration-v4`、`autohand-local_transcripts-v2` 两个 edition，25 个 `ref-autohand-m63-*` 引用，10 个 `source_revision` snapshot 与 10 个 `git_source_file` artifact（commit `fcd92ec12f30ea113f44ef4887ea0d8c51556331`），并改写了 `registry/chapter-current.yaml` 的两行选择。**受管二进制：** 未触发——worker 与 `delivery=pr` 均不执行 `managed:packages`，候选内也没有受管二进制或候选路径记录。

## 待处理与独立复核

**审计记录：** `audits/autohand/audit-autohand-5a5fd799-4c81-4f91-ad1e-42569a9351e0.yaml`（`status: changed`、`review_status: pending`）。**待处理旧审计：** `audit-autohand-6f377dcd-9544-4955-a7a9-b5c1daa4eb3d`——上一轮「只观察、未派发」的待续审计，待续入口是 custom_agents/custom_providers 的 `ReactLoopRunner.ts`、`CheckpointAdvisor.ts`、`openAIEventStream.ts` 与 `docs/providers.md`。这些入口不在本轮冻结范围内，本轮没有解决它，其自身仍是 `pending`；本轮只把它列入 `pending_audit_refs`，没有据此关闭任何阻塞。

**待复核问题：** 本轮结论需要独立复核，状态 `pending`，候选内没有 reviewer 结论。

- 触发原因一，推翻已发布配置步骤：`config.defaults`（默认模式 `automode` → `default`）与 `config.migration`（`-c` 语义改变、`automode.maxCost` 从受支持改为硬报错）都改写了 v3 已发布的句子。
- 触发原因二，来源冲突：上面记录的三条（`-c` 段落、站点 `maxCost` 默认值、站点 `autohand_inference` 默认值），章节内已并列保留两种说法，但未裁决。
- 触发原因三，跨主题加载机制：无。`skills.roots` 未变，`cross_topic_links` 指向的章节本轮未改。
- 未完成项：本轮三条来源冲突与两处被推翻的配置步骤都没有复核记录，按 skill 不得以作者自检替代独立复核。另一个未处理的变化是 `source-autohand-docs-providers`（`722fe443…` → `89b5e31d…`）：custom_providers 未派发，该页新内容未复核，`autohand-cli-custom_providers-v2` 中依赖 providers 文档的句子可能已经滞后。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-autohand-repo | `d01ef07e026eb9c5e4fb82ad5b12586e04022c66` → `fcd92ec12f30ea113f44ef4887ea0d8c51556331`（refs/heads/main） | changed；118 个路径，其中 8 个被已发布引用命中；确认 6 个文件为机制级变化（`src/config.ts`、`src/permissions/PermissionManager.ts`、`src/session/exportSession.ts`、`src/startup/resumeCommand.ts`、`src/constants.ts`、`docs/config-reference.md`），另取 `src/index.ts`、`src/commands/settings.ts`、`src/core/AutomodeManager.ts`、`src/feedback/sessionTranscript.ts` 作为证据；其余路径排除 |
| source-autohand-npm | `0.9.8@sha512-cCtxlU3K…` → 同 | unchanged；未新建版本映射或 revision |
| source-autohand-docs-configuration | `f71cc1d2…` → `89f3dded…` | changed；站点页未在项目 archive 留存新原件，因此未新增 docs-site snapshot，结论改用同提交的仓库文档与源码；旧站点引用按原 snapshot 保留 |
| source-autohand-docs-skills | `db3d3b8c…` → `14a89e13…` | changed；Skill discovery 表内容与上一轮相同，仓库 skill 位置函数内容相同，仅行号后移；skills 保持 v1，未新增引用 |
| source-autohand-docs-mcp | `e9cc742a…` → 同 | unchanged |
| source-autohand-docs-hooks-events | `5247a674…` → 同 | unchanged |
| source-autohand-docs-hooks-reference | `07e80379…` → 同 | unchanged |
| source-autohand-docs-extension-api | `bb54d025…` → 同 | unchanged |
| source-autohand-docs-extensions-cli | `d7d5ff91…` → 同 | unchanged |
| source-autohand-docs-subagents | `6ab313e1…` → 同 | unchanged |
| source-autohand-docs-agent-teams | `60d409ea…` → 同 | unchanged |
| source-autohand-docs-providers | `722fe443…` → `89b5e31d…` | changed；custom_providers 未派发，未复核，候选内未更新该页的 snapshot/artifact |

## 验证与差异入口

固定身份：本轮全部结论固定在 commit `fcd92ec12f30ea113f44ef4887ea0d8c51556331`（只读观察时间 `2026-10-22T12:53:00.739Z`，会话 `4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns`）。原件留在 monitor 的固定 Git 工作区 `ws-fcd92ec12f30-1b51cb7d-0011-4620-82ca-449f7936b3c6`；候选内只记 commit、仓库相对路径与 `content_sha256`，没有复制 checkout。旧文档站原件仍按各自 snapshot 留在项目 archive，本轮没有 configuration/skills 的新副本。

改动入口：

- `knowledge/autohand/chapters/autohand-cli-configuration-v4.md`：`config-runtime`（默认模式）、`config-trust-defaults`（默认值表与实验开关）、`config-migration`（`maxCost`、`-c`、弃用别名）、`config-diagnostics`（`/settings` 分组变化）。
- `knowledge/autohand/chapters/autohand-local_transcripts-v2.md`：`transcripts-lifecycle`（`-c`/`-r` 与互斥）、`transcripts-export-transfer-and-retention`（脱敏与落点）、`transcripts-diagnostics`（续接落点与导出排错）。
- 引用与证据：`references/ref-autohand-m63-src-export-redaction.yaml`（`src/session/exportSession.ts` 的 `buildSessionExport`）、`ref-autohand-m63-src-export-path.yaml`、`ref-autohand-m63-src-constants-exports.yaml`、`ref-autohand-m63-src-resume-options.yaml`、`ref-autohand-m63-src-index-max-cost.yaml`、`ref-autohand-m63-src-automode-max-cost.yaml`、`ref-autohand-m63-docs-config-interaction-mode.yaml`；对应 `snapshots/snapshot-autohand-m63-*.yaml` 记 commit 与 `content_sha256`。
- `registry/chapter-current.yaml`：configuration → `autohand-cli-configuration-v4`，local_transcripts → `autohand-local_transcripts-v2`。无 `mappings/` 变更。

本地差异查看：

```sh
cd batch-20261022
diff -rq baseline/autohand candidates/autohand
diff -ruN baseline/autohand candidates/autohand
```

（`batch-20261022` 是本轮候选批次的相对标识；该批次目录与固定检出在聚合闸门后已释放，路径只作本轮溯源标记。）

写入本报告前的结果：差异仅为本轮的 2 个新章节、25 个 `ref-autohand-m63-*` 引用、10 个 snapshot、10 个 artifact、`registry/chapter-current.yaml` 与审计 YAML；写入后另加本报告。未运行 `pnpm maintenance:candidates check` 与全库 `knowledge:validate`（本任务为文档任务，不运行构建/校验），因此候选自检结论不由本报告代述。
