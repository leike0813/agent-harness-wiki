# Claude Code 上游审阅报告 · 2026-11-25

## 给维护者的结论

本轮观察为 2026-11-25T00:27:30Z，npm 来源未变（`2.1.331@sha512-E6IE…`），三个官方文档来源各有实质文本变化：Skills 页四个 hunk、MCP 页约 165 行（含两个全新小节群）、设置页三个 hunk。变化新增 MCP server 提供 Skill 的能力与 MCP task 的子代理/无特性开关/云端条件，收窄 Skill `model` 字段的生效范围，并公开 `-p` 运行丢弃设置时的 stderr 报告。据此维护四个主题：skills v8、mcp v8、configuration v7、custom_agents v5；其余主题与问题按“引用文本未变”结案。三页仍无适用版本标注，npm 版本与 README 身份未变，本轮不新增软件版本映射。

`delivery=pr`：worker 未切换发布指针、未运行 `harness-binary`；本轮无来源冲突、没有推翻已发布配置步骤，新增能力为增量，故按普通更新由作者自检后交协调者集成。

## 变化的意义与证据边界

### MCP server 现在可以提供 Skill

MCP 页新增 `## Use skills from MCP servers` 整节：Skills over MCP 是公开 beta，需要 Claude Code v2.1.331 或更高；claude.ai connector、手动添加的 server 与插件 server 都能提供；技能名为 `server:skill`，connector 与插件 server 各加前缀（`claude_ai_Docs:pdf`、`plugin_my-plugin_docs:pdf`），server 名里的空格与除 `-` 外的标点变成 `_`。审批独立于工具：auto mode 由分类器决定且不读内容，Manual 或 `acceptEdits` 会提示并可 **Allow this version**；权限规则用 `Skill(mcp__docs__*)`、`Skill(docs:pdf)`、`mcp__docs`，allow 规则只对用户/本地作用域 server 与托管 server 生效，deny 不影响正常 resource 读取。可用性按登录方式（`/login` 计划、长期 token、API key/Console 灰度）、模型（Fable 或 Opus 4.8、Sonnet 5、Haiku 5.5 及更新）、直连 Anthropic 与特性开关决定；cloud session、`claude -p`、GitHub Actions、Agent SDK、桌面端 connector/Desktop extension/`claude_desktop_config.json` server 与网关/凭据覆盖都不支持。组织侧有 **Skills over MCP** 开关、托管 `disableDirectMcpSkills` 与 connector 的 **Restrict to Ask/Blocked**。

Skills 页同一轮新增对应小节：MCP Skill 的支撑文件按 MCP resources 读取，且 frontmatter 的 `allowed-tools`、`disallowed-tools`、`hooks`、`model`、`effort`、`context`、`agent`、`background`、`shell`、`paths`、`metadata` 被忽略，`!` 命令不执行、`@` 引用不附带、`${CLAUDE_PROJECT_DIR}` 与 `${CLAUDE_SESSION_ID}` 不替换；它没有 `allowed-tools` 授权，也不能用 Skill 名 allow 规则跳过提示。

影响 `mcp.capabilities`（新能力与限制）、`mcp.exposure`（审批与规则）、`mcp.diagnostics`（`claude --debug=mcp`）、`skills.roots`（新来源）、`skills.conditions`（受限特性与审批）。新引用 `ref-cc-mcp-skills-*`（snapshot `snapshot-claude-code-mcp-doc-20261125`，raw sha256 `c3cf5494…`）与 `ref-cc-skills-mcpservers-20261125`、`ref-cc-skills-mcpfeaturelimits-20261125`、`ref-cc-skills-mcpallogtools-20261125`、`ref-cc-skills-mcpnoskip-20261125`（snapshot `snapshot-claude-code-skills-doc-20261125`，raw sha256 `537004c0…`）。

### MCP task 的来源与表面条件改变

MCP 页的 MCP tasks 小节不再标注 public beta，只要有 v2.1.304 即可。`What a call needs to become an MCP task` 的条件改写为：

- 子代理调用从“一律排除”改为“主对话启动的非 fork 子代理，在拉取特性开关的交互终端里，v2.1.331 起可以成为 task；server 不能来自该子代理自己文件里的定义，终端会话里子代理等待结果”。
- 特性开关关闭（如 Amazon Bedrock 或关闭遥测）不再直接排除会话，而是要求 v2.1.317 以上的交互终端会话。
- VS Code 扩展与桌面端本地会话在 v2.1.331 起也能有 task，前提是会话拉取特性开关。
- 云端单独一套：只有支持 tasks 的 claude.ai connector（2026-07-28 修订）能产生 task，`.mcp.json` 与插件 server 没有 task。
- 任务提问在非交互会话里的处理按表面分开：`claude -p` 与 Agent SDK 让 server 取消任务，且不运行 `Elicitation` hook、不调用 `onElicitation`。

影响 `mcp.lifecycle`。新引用 `ref-cc-mcp-tasks-main/version/subagent/subagentwait/flags/questions/vscode/cloud/cloudlimits-20261125`，全部固定在 MCP 页 2026-11-25 快照。

### Skill `model` 字段只在显式运行时生效

Skills 页 frontmatter 表的 `model` 行从“Skill 生效期间的模型，仅本轮”改为：模型只用于你用 `/name` 运行该 Skill 的那一轮；Claude 自行运行时会话保持自己的模型，组织白名单排除该值、plan mode 的模型升级生效、或 auto mode 分类器不支持该模型时同样保持会话模型；`context: fork` 时它是 fork 出的子代理本次调用的模型。旧的例外句（`ref-cc-skills-modelrow-20261022`）仍然成立，用于支持白名单与分类器例外。

影响 `skills.format` 与 `custom_agents` 的 `agents.overrides`（该章原句把 `model` 描述为“只作用于当前轮”，未限定显式调用，属于需要修正的重复知识）。

### `-p` 运行公开丢弃的设置

设置页新增 `#### Broken settings in a \`-p\` run`：默认 `text` 输出格式下 stderr 分两类报告——整份文件没有加载时该文件里的内容都不生效（含 hooks、权限规则与沙箱设置，已设置的环境变量可能保留）；只跳过条目时同一来源的其余部分仍生效。每行给出文件、键与原因，修好后重启，`applyFlagSettings` 的 SDK inline settings 要重新发送；事后可用 `claude doctor` 查看。影响 `config.diagnostics`，新引用 `ref-cc-config-brokenp-20261125`、`-stderr`、`-doctor`（snapshot `snapshot-claude-code-configuration-doc-20261125`，raw sha256 `db27bceb…`）。

### 保留名与排除项

Skills 页重名表中新增保留名行：你的 Skill 或 command 名为 `ship`、`ship-local`、`steward` 时，在有 `/ship` 的地方不加载你的版本，由捆绑 `/ship` 或 `/steward` 运行；其余名字仍按原表替换捆绑命令。影响 `skills.collision`，新引用 `ref-cc-skills-reservedbundled-20261125`。

排除的文本：Skills 页的 NOTE/TIP callout 转换、`never runs` → `doesn't run your skill`、删除 `without a restart` 与 `so there are no packages to install`、以及把“默认 30 天”回收期改为保留链接（未与已发布说法冲突，旧引用仍固定旧快照）；MCP 页把 `interactive session` 改写为 `interactive terminal session`（与 task 条件同一收窄，已由 task 段落覆盖）、删除 local scope 的“其他项目不出现”解释句、以及云端 `pollIntervalMs` 的调度细节（server 作者指南，不对应固定问题）；设置页删除“settings files stay as they were”与 `/config` 云入口改名为 Settings > Code。**轮次提示的两处设置表删除未出现**：观察文本第 330–331 行仍保留 `crossSessionInbound` 与 `useAutoModeDuringPlan` 两行，因此限制性键例外段与引用均未改动。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | claude-code-skills-v8 | skills.roots：answered；skills.collision：answered；skills.format：answered；skills.conditions：partial（MCP Skill 条件已补，其余缺口保留） | 进入候选，选为当前版本 |
| mcp | claude-code-mcp-v8 | mcp.lifecycle：answered；mcp.capabilities：answered；mcp.exposure：answered；mcp.diagnostics：answered | 进入候选，选为当前版本 |
| configuration | claude-code-configuration-v7 | config.diagnostics：answered | 进入候选，选为当前版本 |
| custom_agents | claude-code-custom_agents-v5 | agents.overrides：partial（模型覆盖范围按新行收窄） | 进入候选，选为当前版本 |
| 其他四主题 | 未改 | 引用摘录未命中任何变化行 | 保留旧版本 |

**发布：**交付为 PR，worker 不运行 `chapters:update` 或 `ahw publish`。**受管二进制：**未触发（`delivery=pr`）。**映射：**三页均无适用版本标注，npm 仍为 2.1.331 且 README 只指向在线文档，不新增 mapping。

## 待处理与独立复核

**审计记录：**`audits/claude-code/audit-claude-code-db3c3b2f-aad6-4edd-94b9-da90cf4167dc.yaml`，`review_status: reviewed`，`reviewed_by` 记录协调者身份，`pending_question_ids: []`，`pending_audit_refs: []`。**独立复核：**本轮无来源冲突、无推翻已发布步骤的结论、也没有改变既有共享加载入口或优先级（MCP Skill 是新增来源，原重名表与优先级规则未变），按普通更新处理。**待处理旧审计：**audit-claude-code-83bc808d-8048-4a53-8fe3-bd5767789cac、audit-claude-code-2489084b-1bc7-4844-8ccc-6e140ed4c79f、audit-claude-code-f61355c3-9d69-4b81-a562-161406d121c1 保持原样且不由本审计关闭。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-claude-code-skills-doc | `0e2505f3…` → `537004c0…` | changed；重名表保留名、MCP server Skill 小节、`model` 行收窄、restrict 节新增 MCP Skill 两条限制。新原件 `archive/claude-code/artifact-source-claude-code-skills-doc-537004c08aad/source.md` |
| source-claude-code-mcp-doc | `683f1caf…` → `c3cf5494…` | changed；MCP task 条件与云端/VS Code/桌面端小节、Skills over MCP 整节（命名、审批、扫描、可用性、限制、组织开关、排错）。新原件 `archive/claude-code/artifact-source-claude-code-mcp-doc-c3cf54941780/source.md` |
| source-claude-code-configuration-doc | `417b611c…` → `db27bceb…` | changed；新增 `-p` 破坏设置小节（stderr 两类报告与 `claude doctor` 后续），其余为措辞与 UI 改名。新原件 `archive/claude-code/artifact-source-claude-code-configuration-doc-db27bceb6478/source.md` |
| source-claude-code-npm | `2.1.331@sha512-E6IE…` | unchanged；不下载包字节，不新增映射 |

## 验证与差异入口

- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-9/candidates/claude-code`：通过（仅既有 coverage `partial` 警告，非本轮引入）。
- 32 条新引用按各自 snapshot 源头验证：heading 与 excerpt 在观察文本中逐字存在（脚本 `includes` 比对，未归一空白）。
- 新 snapshot 的 `raw_sha256`/`extracted_sha256` 与对应 artifact 及归档原件一致；`identity-markdown@1` 保持字节不变。
