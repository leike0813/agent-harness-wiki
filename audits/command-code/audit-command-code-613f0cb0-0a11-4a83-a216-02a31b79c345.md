# audit-command-code-613f0cb0-0a11-4a83-a216-02a31b79c345

- 产品：command-code（Command Code）
- 上游审计：coordinator 冻结于 2026-10-13T18:01:50.001Z，`status: changed`，`review_status: pending`
- 本任务：`monitor-20261013-command-code`，`role=worker delivery=pr`，范围 native_plugins、skills
- 候选根：`/tmp/ahw-monitor-fa60cb88-ac51-446f-83dd-ae9a5d0a45e2-QlS6z6/batch-1/candidates/command-code`
- 结论：**实质变化，需要独立复核**。新的一方插件 API 面已写入新章节版本，但选章未切换。

## 1. 观察到的来源身份变化

| 来源 | baseline | observed | 本轮 triage |
| :-- | :-- | :-- | :-- |
| source-command-code-docs-mods | `f82ee3c9…` | `7a846e17…` | maintain（实质正文变化） |
| source-command-code-docs-provider | `eb67955d…` | `4534bdfb…` | reviewed_no_impact（商业条款，排除） |
| source-command-code-docs-reference-cli | `874b13e7…` | `9102481f…` | reviewed_no_impact（导航标签） |
| 其余 15 个官方文档来源 | 见 YAML checks | 见 YAML checks | reviewed_no_impact（导航标签） |
| source-command-code-npm | `1.79.2@sha512-e7seLyy…` | `1.81.0@sha512-3FwVr1EU…` | reviewed_no_knowledge_impact（仅发布身份） |

正文比对方法：逐页把 HTML 抽取为可见文本、压缩空白后按行 diff，剔除每页首行（构建期 head，含随机 build 标记与 webpack chunk 名）与末行（`self.__next_f` flight payload）。结果是 **只有 mods（63 行）与 provider（3 行）有正文差异**，其余 16 页正文逐行一致。原件全部保留在原项目 `archive/command-code/`（基线与新一版并存），候选内不含任何 checkout 或原件副本。

## 2. mods 页的语义变化与问题映射

新 API 面（写入 `plugins-api` 小节，逐句核对后引用）：

- `cmd.addShortcut(keys, {description, handler})` → `plugins.api`。`keys` 必须是含 Ctrl 或 Alt 的 `modifier+key` 和弦。拒绝并警告的四类：无修饰/仅 Shift（会同时打进输入框）；`Ctrl+Shift` 且键以裸控制字节到达终端（字母、数字、Enter、Tab、Backspace，因为 Shift 到不了；方向键保留修饰键故 `ctrl+shift+up` 合法）；`ctrl+m`/`ctrl+i`/`ctrl+h`/`ctrl+[`（终端把它们发成 Enter/Tab/Backspace/Escape）；已被内置绑定（`ctrl+c`、`ctrl+o`、`ctrl+k` 类编辑器键）或输入框自己处理（`alt+w`、`ctrl+z`、`ctrl+g`、`ctrl+s`、`ctrl+v`、`alt+v`，重绑定后仍占用）的和弦。handler 拿到与命令 handler 相同的 `{args, ui, cwd, exec}` 上下文，可返回同样的 `{message}`/`{prompt}`；宿主在自身绑定**之后**派发，mod 永远无法遮蔽中断、退出、模式循环或 transcript 切换，Esc 归宿主；同一和弦首个注册获胜；`/hotkeys` 列在 Mods 下；headless 从不触发。
- `cmd.addSkillsPath(path)` → 同时进入 `plugins.api` 与 `skills.roots`。返回 `Disposable`；相对路径相对 **mod 自身文件**解析；工厂时收集。
- `commandcode.skills`（manifest）→ `skills.roots`。条目相对包根解析，越界条目丢弃，进入包被加载的每个会话。
- 运行期方法表新增 `sendUserMessage`、`getSessionName`/`getModel`/`getEffort`、`getContextUsage`、`getCommands`、`isIdle`、`shutdown`、`getToolInfo` → `plugins.api`。
- UI surface 新增 `notify(message, level?)` 的三档 level 与 `cmd.ui.setTitle(text | null)`；headless 降级矩阵新增 `setTitle`/`addShortcut`/`sendUserMessage`/`shutdown` 四行 → `plugins.api` 与 `plugins-lifecycle`。

`plugins.model` 与 `plugins.discovery`（关系定义、发现位置表、加载顺序、信任门控）逐节比对后与基线逐行一致，答案未变，保留原有引用与原文。

**观察但未写入**：新增的 curated registry 小节（`mods/registry.json`、`commandcode.ai/mods.json`、official 徽标、hidden 列表）描述发布与分发路径，不属本轮固定问题，仅在本审计记录。

## 3. skills 答案的变化与缺口

`skills.roots` 新增一类来源（标准四目录 + `.agents/` 向上 10 层 + settings `skills` 数组 + `--skill` 之外）：mod 贡献的 Skill 位置。

**保留的缺口**：文档没有保证多个已注册路径之间的优先级顺序，也没有说明它们相对 settings `skills` 数组与 `--skill` 参数在六段查找链（项目 `.commandcode` → 项目 `.agents` → 用户 `.commandcode` → 用户 `.agents` → 额外位置 → 内置）中的插入位置；`addShortcut` 的重复注册与 `Disposable` 交互、冲突提示文案同样无证据。问题状态保持 `answered`（机制本身有直接逐字证据），缺口写在小节正文内。

## 4. 可用界面徽标核查（catalog 结论）

18 个变化页面（agents、byok、context、headless、hooks、import、mcp、memory、mods、permissions、provider、reference/cli、reference/slash-commands、resource-security、settings、skills、troubleshooting/common-issues、troubleshooting/telemetry）正文页首的导航条目一律由「VS Code Extension」（`href="/docs/vscode-extension"`）改为「IDE Extensions」（`href="/docs/ide"`），对应站点路由表里 `/vscode-extension` 消失、`/ide` 出现。

另外：`reference/cli` 的 PREV 页导航标签由「Desktop App」变为「Studio」，`headless` 的 NEXT 相应变为「Desktop App」。

**结论：不提 catalog 改动。** 依据是 Skill §4 的 catalog 触发条件——只有出现**新界面身份或新的界面↔运行时关系**才更新 catalog 身份与 binding。本轮两者都没有出现：改名的是文档站自身的导航标签与路由，catalog 中本产品只登记 `surface_id: cli`（名称 CLI），published 名称不因此改变；页序导航也不是新界面。`bindings` 中 cli 仍为 `unknown`——没有任何直接来源证据把界面绑定到具体运行时或包版本，按契约保持 `unknown`，不猜测新绑定。

**已知的既存缺口（本轮不修，留给后续轮次）**：站点路由表里 `/docs/ide` 同时覆盖 `Install`、`VS Code`、`Cursor` 三个页面，但 catalog 中本产品没有任何已登记的 `ide` 界面。这是本轮之前就存在的 catalog↔文档不一致，不是本轮改名引入的新界面，因此不在本次变更范围内补登记。

## 5. 排除项及理由

- **docs/provider 的定价与额度改写**：deepseek-v4.1-flash 由 boosted usage 改为定额、glm-5.3-flash 的 DEAL 条目移除、新增 minimax-m3 与 mimo-v2.5 的 DEAL、一次请求最多 100 个问题及 64K/32K token 预算说明。属商业条款，不属八个固定主题的任一问题。
- **npm 1.79.2→1.81.0**：仅发布身份变化。未固定 npm 快照、未建立软件版本映射；`delivery=pr` 不执行受管包与受管二进制流程。

## 6. 交付内容

新增（均在候选内）：

- `knowledge/command-code/artifacts/artifact-source-command-code-docs-mods-7a846e17383e.yaml`
- `knowledge/command-code/snapshots/snapshot-source-command-code-docs-mods-20261013.yaml`
- 引用 `ref-cc-mods-registration-20261013`、`ref-cc-mods-shortcut-chords`、`ref-cc-mods-shortcut-dispatch`、`ref-cc-mods-skillspath`、`ref-cc-mods-package-skills`、`ref-cc-mods-live-20261013`、`ref-cc-mods-live-state-20261013`、`ref-cc-mods-ui-notify-title`、`ref-cc-mods-headless-surface`
- 章节版本 `command-code-cli-native_plugins-v2`、`command-code-cli-skills-v2`（v1 原样保留，未改字节）
- 本报告

未改动：`catalog/harnesses.yaml`、`registry/chapter-current.yaml`（选章仍指向 v1）、基线快照与旧 artifact、所有其他主题的章节。

## 7. 复核与阻塞

- **需要独立复核**：新的一方插件 API 面属高影响变更（新增注册动词、扩展 ModApi 表面）。建议 reviewer 逐项核对：`addShortcut` 四类拒绝规则与派发顺序、`addSkillsPath` 与 `commandcode.skills` 的路径基准与收集时机、运行期方法表的语义、headless 降级矩阵四行、`notify` level 与 `setTitle`。本审计保持 `review_status: pending`，`reviewed_by`/`reviewed_at` 未填。
- **选章未切换**：新章节版本未进入 `registry/chapter-current.yaml`。在独立复核结论回来之前，native_plugins 与 skills 的 current 仍是 v1。
- **来源阻塞**：无。18 个文档来源的原件全部保留在原项目 archive，基线与新一版均可读。
- **未派发问题的遗留**：本审计的 `pending_question_ids` 只保留本轮实际派发的两个主题（native_plugins 七题、skills 九题），它们随新插件 API 面一起等待独立复核。本轮未派发的六个主题（configuration、custom_agents、custom_providers、hooks、mcp、local_transcripts）继续由 `pending_audit_refs` 中的 `audit-command-code-de61b740` 承载，本审计既未重复结案也未关闭它们。