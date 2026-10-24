# command-code 维护报告（2026-10-22）

- audit_id: `audit-command-code-7b51087b-3d6d-4e39-80a2-9ca8ef1e3944`
- 观察时间：2026-10-22T12:53:34.877Z（会话 `4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns`）
- 派发范围：topics `native_plugins`、`configuration`、`custom_agents`；固定问题 `plugins.model`、`plugins.install`、`plugins.discovery`、`plugins.api`、`plugins.lifecycle`、`config.sources`、`config.overrides`、`config.defaults`、`agents.entry`、`agents.format`
- 观察结果：18 个官方文档来源全部 changed；npm `1.82.1` → `1.87.1`

## 来源身份

| 来源 | baseline | observed |
| --- | --- | --- |
| docs/mods | `c465da32d8c8…` | `14e4c167d85f…` |
| docs/settings | `391b6942a1a3…` | `89c473c6aa43…` |
| docs/agents | `d4f92b8db742…` | `124060480d57…` |
| docs/reference/slash-commands | `1d34afc02091…` | `6dda621bd7e2…` |
| docs/headless | `f327f129d113…` | `6c51f0b02ab5…` |
| docs/provider | `d98a506beda8…` | `d4bef0bd978d…` |

## 语义 triage

- **docs/mods（实质改写，652 → 871 行，字节 853,893 → 1,072,390）**：新增 `ModHooks` 完整清单与逐钩子契约、
  `ModContext`（每个钩子的最后一个参数）与 `ModContext.session` 的三种条目语义、
  `modState` 约定、钩子执行顺序与失败语义、UI 面（状态行/widget/pane/toast/override/
  shortcut）、`cmd.addAgent`/`addSkillsPath`/`addShortcut`/`expose`、`cmd mods inspect`、
  热重载（保存即重载、`onSessionEnd reason: 'reload'`、注册被 dispose、`addTool` 工具保留
  到下一会话、`/mods reload`、`COMMANDCODE_MODS_HOT_RELOAD=0`）、`--safe-mode` 与
  `mods.disableAll`、opt-in 内置 mod（`todos`）。旧版“每进程只加载一次、必须 `/reload`
  重启才能拾取”“widget 不渲染任何东西”的结论被新页明确推翻。
- **docs/settings（同步更新）**：新增用户可见默认键 `statusline`、`artifactsEnabled`；
  `settings.mods` 形状扩为 `{ sources?, paths?, disabled?, enabled?, disableAll? }`
  （`disableAll: true` 只加载内置 mod）。文件地图、三层作用域、优先级与并集例外、
  模型解析链逐字未变。
- **docs/agents（非本轮问题）**：归档留存的 baseline `d4f92b8db742` 与 2026-10-17 归档副本
  `839e9b6cb1f4` 的 `Where agents load from` 与 `Reference` 的 frontmatter 字段表、工具分类表
  逐字一致（第 150-162 行 diff 为空），与已发布 `agents.entry` / `agents.format` 答案一致，故
  不新建 edition；本轮 observed `124060480d57` 的原件未在本项目 archive 留存，作者无法比对
  observed 页，因此不对该页 hash 变化的落点作断言。
- **未复查**：docs/reference/slash-commands（净增 109 行新命令）、docs/headless（无头登录
  与 `COMMAND_CODE_API_KEY`）、docs/provider 等属于本轮未派发 topic，仅记录身份。

## 结论

- `native_plugins` 的五个派发问题连同随之重写的 `plugins-package` 小节全部改写，新建 edition
  `command-code-cli-native_plugins-v2`；旧 `…-v1` 与旧引用保持原字节。
- `configuration` 只有 `config.defaults` 变化，新建 edition
  `command-code-cli-configuration-v2`（其余小节逐字沿用）。
- `custom_agents` 的 `agents.entry` / `agents.format` 核对为无变化，不新建 edition。
- 本轮属**高影响更新**：v2 推翻已发布的 v1 热重载与 widget 渲染步骤，并改变 mod 发现/优先级、
  三层设置禁用与钩子分发等跨主题加载机制，按 SKILL §5 须由作者之外的 Agent 独立复核。现已提交
  独立复核 `rev2-command-code`：11 个复核问题（本轮派发 10 个，另含 `plugins.package`）全部
  `upheld`，无 `corrected`/`rejected`；复核提出的审计元数据问题（自审、行数、impact 缺项）已按
  要求修正，审计 `review_status` 保持 `pending`，`reviewed_by`/`reviewed_at` 留待协调者按复核
  结论记录。第二轮独立复核 `rev3b-command-code` 判定 `changes_requested`：其两项要求（更正
  custom_agents 的 triage 断言、六条新摘录恢复为来源原文）已按要求落实；审计 `review_status`
  仍为 `pending`，留待协调者复核后记录。
- 新增 snapshot/artifact：`snapshot-source-command-code-docs-mods-14e4c167d85f`、
  `snapshot-source-command-code-docs-settings-89c473c6aa43`（文档原件仍由项目根
  `archive/` 长期保留，候选不复制原件）。

## 证据与校验

- 新建引用 22 条（`ref-cc-mods-*-v2`）与 2 条（`ref-cc-settings-*-v2`），全部
  `document_section` 定位到新抓取页面并附短摘录。
- `pnpm -s maintenance:candidates check --candidate <candidate>` 通过。
- 本轮是高影响更新，已由独立复核 `rev2-command-code` 复核：11 个问题全部 `upheld`，复核指出的
  审计元数据问题已修正；npm 版本变化未用于任何章节结论或映射。
- 第二轮独立复核 `rev3b-command-code` 判定 `changes_requested`：审计与报告里 custom_agents 的
  triage 断言已按留存原件更正（删除“hash 变化落在模型示例与委派叙述部分”的断言，改为只陈述
  baseline `d4f92b8db742` 与 2026-10-17 副本 `839e9b6cb1f4` 的逐字一致结果，并说明 observed
  原件未留存、无法比对）；六条新摘录（fields/register/toggle/ordering/context/package）已恢复为
  所引小节的来源原文；`review_status` 仍为 `pending`。
