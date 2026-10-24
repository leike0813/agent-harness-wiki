# Factory Droid 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮有三个主题的机制结论被固定来源推翻，需要读者可见的正文改写：配置章里旧 `~/.factory/config.json` 的加载方式、Skills 章里「org 托管设置与命令行设置可以再压一层」的优先级，以及自定义 Provider 章里 `apiKeyHelper` 的生效层与 Bedrock provider 映射。三份新版章节 `factory-droid-cli-configuration-v2`、`factory-droid-cli-custom_providers-v2`、`factory-droid-cli-skills-v2` 已写好并通过候选校验，但**当前选章没有切到 v2**：独立复核返回 `changes_requested`，本审计仍是 `review_status: pending`，按契约这期间读者继续看到 v1。

真正值得你判断的是决策方式，而不是个别句子：本轮两处结论属于「新证据推翻已发布配置步骤」，按 Skill §5 必须有独立 reviewer。复核已完成，五道固定问题的 verdict 全是 `upheld`（没有 `corrected`/`rejected`）；返回的问题集中在证据链——新版章节还挂着 7 条摘录已与固定来源不符的旧 reference，两条正文仍写着被推翻的旧说法，审计的 `review_status` 与实际流程不符，`impacts` 漏记被改写的小节，且缺少同名 `.md` 报告。这些都已按复核意见修正，仍需再走一次独立复核才能切选章。

## 变化的意义与证据边界

### 旧 `config.json` 由「两文件合并」改为「启动时复制」

BYOK 页现在写的是：Droid 启动时把 `~/.factory/config.json` 里的自定义模型复制进 `settings.json`，旧文件保持不变，**此后对已复制模型的改动会被忽略**（`archive/factory-droid/artifact-source-factory-droid-docs-byok-c694a58bc236/source.md:54`）。已发布的 v1 与新交付的 `configuration-v2` 原先都写着「两个文件都会加载合并、`settings.json` 优先」，与本轮 `providers.entry` 的结论自相矛盾。`config-defaults` 已改为复制语义并改引 `ref-fd-byok-legacy-config-20261022`；`custom_providers-v2` 的 `providers-entry` 本来就是这个说法，两份 edition 现在一致。

### Skills 优先级：org 插件压过全部来源

Skills 页替换了原来的「Organization-managed and command-line settings can take precedence…」一句，改为：组织插件技能压过清单里全部来源（包括 mission 与 automation 技能），mission 会话中 mission 技能压过 project 技能，automation 会话中 automation 自带技能压过清单全部（skills 原件 :219-222）。`skills-v2` 的 `skills-resolution` 已删除那句「org 托管设置与命令行设置…可以再压一层」，改按现行表述，并新增 `ref-fd-skills-precedence-20261022`（整段优先级）与 `ref-fd-skills-duplicates-20261022`（同来源撞名）。同一节还把 `/skills` 的最后一个标签页改为 **Import from Claude**（skills 原件 :160-162），不再是 **Import**。

### 引用链：7 条旧 reference 已换出 v2

复核点名 `ref-fd-skills-precedence`、`ref-fd-byok-providers`、`ref-fd-byok-fields`、`ref-fd-byok-troubleshooting`、`ref-fd-byok-bedrock`、`ref-fd-byok-bedrock-fields`、`ref-fd-skills-manage` 的摘录在固定页面已不命中。本轮新增 20261022 记录并换掉全部引用：`ref-fd-byok-providers-20261022`（四类 provider 表前三行）、`ref-fd-byok-troubleshooting-20261022`（选择器与 Invalid provider 两项）、`ref-fd-byok-bedrock-20261022`（Bedrock provider 映射）、`ref-fd-byok-bedrock-fields-20261022`（含 `authMethod` 的字段表）、`ref-fd-skills-precedence-20261022`、`ref-fd-skills-duplicates-20261022`、`ref-fd-skills-manage-20261022`。`ref-fd-byok-fields` 在 v2 中已无引用（早先已换成 `ref-fd-byok-fields-20261022`）。旧记录保留给 v1，不改写其指向的历史快照。

另外两处小漂移一并修正：`droid exec` 的输出格式补上 `acp`（exec 原件 :39），provider 取值按路径拆开——个人 BYOK 四类，组织托管条目另有 `factory`、`google`、`xai`、`voyage`（org-control 原件 :395-397，`ref-fd-org-provider-values-20261022`）。

### settings 页新增 `legacyModelOverrides` 行

settings 页两版逐行 diff 只有一行新增：`legacyModelOverrides`（Array of model IDs，默认 `[]`，「Legacy models you chose to keep. Droid neither warns about nor upgrades them. Read from user settings only.」）。本轮没有引用这条行，也没有章节依赖它，因此只记录影响判定，不改写正文。

### models / plugins / plugin-marketplaces：只有身份变化，triage 受限

这三页的观察原件没有写进 archive（`51f38f2d5c3d…`、`9c53c4547152…`、`3dd36376831f…`），候选里无法逐字节复核。冻结任务把它记为「models 页移除一行」，该说法本轮**无法从候选重新验证**；`ref-fd-models-custom` 因此仍指向被取代的基线快照，`providers.models` 保持 `partial`。mcp 页的观察原件（`405b5335d528…`）实际已在 archive，不受此限制。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | factory-droid-cli-configuration-v2（新）；当前选章 v1 | config.runtime：answered；config.trust：partial；config.defaults：answered；config.migration：answered；config.diagnostics：answered | v2 已写好但保留未选；独立复核未结束 |
| custom_providers | factory-droid-cli-custom_providers-v2（新）；当前选章 v1 | providers.entry：answered；providers.auth：answered；providers.metadata：answered；providers.models：partial；providers.protocol：answered；providers.diagnostics：answered；providers.responses：partial | 同上 |
| skills | factory-droid-cli-skills-v2（新）；当前选章 v1 | skills.conditions：partial；skills.collision：answered；skills.diagnostics：answered | 同上 |

**发布：** `delivery=pr`，未运行 `pnpm ahw publish`、`pnpm chapters:update` 或 `pnpm managed:packages`，未切换任何发布指针；`registry/chapter-current.yaml` 中 factory-droid 的 configuration、custom_providers、skills 三个 topic 仍指向 v1。**受管二进制：** `delivery=pr` 不执行；npm 观察到 0.241.1 → 0.247.0，版本变化本身不构成章节变化或源码到包映射，新版本仍未验证。

## 待处理与独立复核

**审计记录：** [audit-factory-droid-906a8ab3-2a87-4f2a-8133-da322763cd11.yaml](./audit-factory-droid-906a8ab3-2a87-4f2a-8133-da322763cd11.yaml)；`review_status: pending`，未填 `reviewed_by`/`reviewed_at`。

**待处理旧审计：** `a13bddc0`、`20261004t061205z`、`10a55b44`、`fc9e95f8`、`bdec1310`、`d9960210` 仍为 pending。`10a55b44` 与 `fc9e95f8` 的 `config.sources`、`config.overrides` 本轮没有处理，已与五道固定问题一起列入 `pending_question_ids`；本审计不关闭它们。

**待复核问题：** 五道固定问题全部 `upheld`（`config.runtime`、`providers.auth`、`providers.entry`、`providers.metadata`、`skills.conditions`），无需更正答案；复核返回的 9 条 changes_requested 已逐条落实（正文、引用、impacts、报告）。剩余阻塞是复核本身：独立的第二轮确认结束前，v2 不进选章。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| [source-factory-droid-docs-byok](https://docs.factory.com/model-independence/byok.md) | f994a777… → c694a58bc2… | changed；config.json 复制语义、apiKeyHelper 生效层、四类 provider、baseUrl 条件必填、Bedrock authMethod 均有实质变化 |
| [source-factory-droid-docs-skills](https://docs.factory.com/harness/skills.md) | 6a7bcaaf… → 81409d890c… | changed；优先级改写（org 插件压过全部）、/skills 标签页改名 |
| [source-factory-droid-docs-org-control](https://docs.factory.com/enterprise/hierarchical-settings-and-org-control.md) | d0d9e4a2… → 9c0a3a66… | changed；组织 customModels 字段放宽、provider 取值扩展、静态密钥限制按条目变更判断 |
| [source-factory-droid-docs-cli-reference](https://docs.factory.com/droid-cli/cli-reference.md) | 1e7c8306… → 98a283a3… | changed；工具开关改为 --only-tools/--add-tools/--remove-tools/--list-tools |
| [source-factory-droid-docs-exec](https://docs.factory.com/droid-exec/overview.md) | 9e572c09… → 48c0ee3d… | changed；Skill controls、退出语义重写，输出格式含 acp |
| [source-factory-droid-docs-settings](https://docs.factory.com/droid-cli/settings.md) | 26859c1d… → fb3e9259… | changed；新增 legacyModelOverrides 一行 |
| [source-factory-droid-docs-mcp](https://docs.factory.com/harness/mcp.md) | b6acadae… → 405b5335… | changed；原件已归档，未影响本轮题目 |
| [source-factory-droid-docs-models](https://docs.factory.com/models.md) | 362ccf13… → 51f38f2d… | changed；观察原件未归档，triage 受限 |
| [source-factory-droid-docs-plugins](https://docs.factory.com/harness/plugins.md) | 093550bf… → 9c53c454… | changed；观察原件未归档，triage 受限 |
| [source-factory-droid-docs-plugin-marketplaces](https://docs.factory.com/enterprise/internal-plugin-marketplaces.md) | d88db9c0… → 3dd36376… | changed；观察原件未归档，triage 受限 |
| source-factory-droid-repo（pinned workspace `ws-db68fa0d6be5-e22ccbf1-d26f-468b-ba1e-29780ee3c809`） | c6ea4708… → db68fa0d…（基线 c6ea4708…） | changed；仅 `docs/reference/analytics-api.mdx` 与日文版，未触及本轮主题 |
| source-factory-droid-npm | 0.241.1 → 0.247.0 | changed；仅记录身份，不据此改写章节或建立映射 |
| skills、subagents、hooks、agents-md、custom-commands、permission-rules、autonomy、output-styles 其余 8 个官方文档来源 | 与基线一致 | unchanged |

## 验证与差异入口

`pnpm -s maintenance:candidates check --candidate <candidate-root>` 通过（路径归属、章节引用、审计账本）。新增与改写的 8 条 reference 摘录已逐条验证为固定页面原文的连续切片（长度均 ≤ 800）。未运行全库 `pnpm knowledge:validate`、`pnpm sources:audit-log` 与发布流程——这些由协调者集成后执行。

改动入口：`knowledge/factory-droid/chapters/factory-droid-cli-{configuration,custom_providers,skills}-v2.md`、`knowledge/factory-droid/references/*-20261022.yaml`、`audits/factory-droid/audit-factory-droid-906a8ab3-2a87-4f2a-8133-da322763cd11.yaml`、`registry/chapter-current.yaml`。本地查看用 `git diff` 与 `git status --short`。
