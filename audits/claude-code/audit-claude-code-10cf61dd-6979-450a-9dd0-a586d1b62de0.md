# Claude Code 上游审阅报告 · 2026-11-24

## 给维护者的结论

本轮观察为 2026-11-23T18:01:06.472Z，npm 来源未变（`2.1.330@sha512-KQMl…`），三个官方文档来源各有实质文本变化：设置页两个 hunk、MCP 页两个 hunk、Skills 页一个 hunk。变化收窄了已发布的两条云会话说法，补充了一条 `--settings` 键限制和一条 MCP connector 优先级例外，并新增一条云会话插件条件。据此维护四个主题：configuration v6、mcp v7、skills v7、native_plugins v4；其余主题与问题按“引用文本未变”结案。三页仍无适用版本标注，npm 版本与 README 身份未变，本轮不新增软件版本映射。

`delivery=pr`：worker 未切换发布指针、未运行 `harness-binary`；候选先经独立复核 ReviewClaudeCode（20261124）返回 `changes_requested`，本轮修复后四个选章在带独立复核的情况下交协调者集成。

## 变化的意义与证据边界

### `--settings` 不能再设部分用户设置键

设置页“Change a setting for one session”中，`--settings` 条目从“It can set any key your user settings file can set; it can't set `Managed` or `Global config` keys”改为“With `--settings`, you can't set `Managed` or `Global config` keys or some user settings keys, such as `prependPlugins`”。层级位置（用户、项目、本地之上，托管之下）未变。

影响 `config.runtime` 与 `config.overrides`：已发布章节此前写“能设置用户文件能设的任何键”，现收窄为“部分用户设置键如 `prependPlugins` 也不能设”。新引用 `ref-cc-config-onesession-20261123`（snapshot `snapshot-claude-code-configuration-doc-20261123`，raw sha256 `417b611c…`），原 `ref-cc-config-onesession-20261003` 仍用于层级位置。

### 多仓库云会话只声明 marketplace 不添加，不再笼统声明插件不加载

设置页“Settings in cloud sessions”的多仓库条目把“The marketplaces and plugins those two keys declare still don't load in a cloud session”改为“The marketplaces a repository declares still aren't added in a cloud session”。同时 Skills 页云会话插件条目从“Plugins declared in the repository's `.claude/settings.json` and plugins enabled only in your user settings don't load in cloud sessions”改为“Plugins enabled only in your user settings don't load in cloud sessions”。

两处共同移除了“仓库设置声明的插件不加载”这一后果声明，保留“仓库声明的 marketplace 不会被添加”与“只在用户设置里启用的插件不加载”。章节相应改写 `config.sources` 的云会话段落、`skills.conditions` 的插件条件，以及 `plugins.install` 原句“云会话不加载仓库声明的 marketplace 与插件”。不推断仓库声明的插件现在会加载：页面只删除了旧说法，没有给出新的加载结论。复核指出多仓库规则只适用于 Anthropic 托管环境，`plugins.install` 已补“在 Anthropic 托管的环境里”限定与自托管云环境的独立仓库设置规则；仍含旧“marketplaces and plugins … don't load”摘录的 `ref-cc-config-cloud-20261003` 已从 `config-sources` 与 `plugins-install` 的引用列表移除（引用文件与旧 edition 保留）。

### MCP connector 在无交互会话里排在插件 server 之前

MCP 页“Scope hierarchy and precedence”的列表第 5 项新增：“In `claude -p`, Agent SDK, and VS Code sessions, connectors rank above plugin-provided servers.”编号顺序（local、project、user、插件 server、connector）与按端点判重规则未变；同页 form mode 示例改成“such as a project name and a due date”，只是措辞。

影响 `mcp.entry` 与 `mcp.exposure`：已发布章节的顺序句补充该例外，暴露小节补充“重复定义决定哪一份 server 的工具进入会话”。新引用 `ref-cc-mcp-precedence-20261123`（snapshot `snapshot-claude-code-mcp-doc-20261123`，raw sha256 `683f1caf…`）。该句没有版本门槛，正文不改既有 v2.1.259 等标注。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | claude-code-configuration-v6 | config.sources：answered；config.overrides：answered；config.runtime：answered | 进入候选，选为当前版本 |
| mcp | claude-code-mcp-v7 | mcp.entry：answered；mcp.exposure：answered | 进入候选，选为当前版本 |
| skills | claude-code-skills-v7 | skills.conditions：partial（新增云会话插件条件，其余缺口保留） | 进入候选，选为当前版本 |
| native_plugins | claude-code-native_plugins-v4 | plugins.install：partial（云会话插件说法按新措辞改写） | 进入候选，选为当前版本 |
| 其他四主题 | 未改 | 引用摘录未命中任何变化行 | 保留旧版本 |

**发布：**交付为 PR，worker 不运行 `chapters:update` 或 `ahw publish`。**受管二进制：**未触发（`delivery=pr`）。

## 待处理与独立复核

**审计记录：**`audits/claude-code/audit-claude-code-10cf61dd-6979-450a-9dd0-a586d1b62de0.yaml`，`review_status: reviewed`，`reviewed_by` 记录协调者与独立复核者，`pending_question_ids: []`，`pending_audit_refs: []`。**独立复核：**ReviewClaudeCode（20261124）先返回 `changes_requested`；已修复移除过期摘录引用、补自托管边界、扩展 MCP 优先级与 Skills 云插件证据，四个选章在带独立复核的情况下发布，跨主题云插件与 MCP 优先级的高影响触发条件由此解决。**待处理旧审计：**audit-claude-code-83bc808d-8048-4a53-8fe3-bd5767789cac、audit-claude-code-2489084b-1bc7-4844-8ccc-6e140ed4c79f、audit-claude-code-f61355c3-9d69-4b81-a562-161406d121c1 保持原样且不由此审计关闭；本审计已把 `pending_audit_refs` 置空并在此说明，不复述引用，因此 `reviewed` 状态不会隐式关闭它们。**待复核问题：**无。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-claude-code-configuration-doc | `d94a7f2f…` → `417b611c…` | changed；两个 hunk：`--settings` 键限制、云会话多仓库 marketplace 措辞。新原件 `archive/claude-code/artifact-source-claude-code-configuration-doc-417b611cbc5a/raw.md` |
| source-claude-code-mcp-doc | `8a5fcd23…` → `683f1caf…` | changed；两个 hunk：connector 优先级例外、form mode 示例措辞。新原件 `archive/claude-code/artifact-source-claude-code-mcp-doc-683f1caf3fd9/raw.md` |
| source-claude-code-skills-doc | `12bb7fba…` → `0e2505f3…` | changed；一个 hunk：云会话插件条目删除仓库声明插件的说法。新原件 `archive/claude-code/artifact-source-claude-code-skills-doc-0e2505f3bb6b/raw.md` |
| source-claude-code-npm | `2.1.330@sha512-KQMl…` | unchanged；不下载包字节，不新增映射 |

## 验证与差异入口

- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-1/candidates/claude-code`：通过（仅既有 coverage `partial` 警告，非本轮引入）。
- 四条新引用按各自 snapshot 源头验证：heading 与 excerpt 在观察文本中逐字存在（空白归一后）。
- 新 snapshot 的 `raw_sha256`/`extracted_sha256` 与对应 artifact 及归档原件一致；`identity-markdown@1` 保持字节不变。
- 未运行：聚合 `pnpm knowledge:validate`、章节构建、发布与 MCP/站点集成测试，按流程由协调者集成后执行。
- 差异入口：`knowledge/claude-code/chapters/claude-code-{configuration-v6,mcp-v7,skills-v7,native_plugins-v4}.md`、`knowledge/claude-code/{artifacts,snapshots,references}/` 下新增文件、`registry/chapter-current.yaml`、本审计 YAML 与报告。
