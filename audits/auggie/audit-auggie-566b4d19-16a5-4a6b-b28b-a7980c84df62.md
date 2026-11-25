# auggie 上游审阅报告 · 2026-11-25（1.x 文档线迁移，changes_requested 修订）

## 给维护者的结论

本轮观察（2026-11-25T00:28Z）发现官方文档站已整体切到 **Auggie 1.x 文档线**：每个 CLI 页面顶部新增 “You're viewing docs for **Auggie 1.x.x** (prerelease)” 与 `/cli/v0/` 旧版链接。`source-auggie-docs-cli-config` 的登记 URL 仍是 `config.md`，但观察解析到 `settings.md`。

这不是只加 banner：`settings`、`permissions`、`hooks`、`skills`、`subagents`、`plugins`、`integrations`、`auth`、`reference`、`interactive` 等页面都有 1.x 语义重写。按 coordinator 指示，本轮为八个主题各建一个完整 1.x edition，旧 edition 与旧引用字节未改。

**复核状态：** 八个 1.x edition 全部通过独立复核。`configuration`、`hooks`、`native_plugins`、`skills` 在 1–9 项修订后批准；`local_transcripts` 的残余行（lifecycle 摘要仍写 `--resume` 接受 ID 前缀）由 coordinator 按 reviewer 的精确句子在 `auggie-cli-local_transcripts-v2.md:128` 修订后批准。本审计 `review_status: reviewed`，`pending_question_ids: []`。

## 复核修订（changes_requested 1–9）

1. **configuration**：在 0.x 旧名兼容段加入 `terminal`——它不在 1.x 旧名表中，用 `terminal` 写的权限规则在 1.x 不匹配，必须改写为 `bash`（`ref-auggie-1x-perms-legacy`）。
2. **configuration**：更正“1.x 没有重复裸字符串 permission 说明”的说法；1.x “Basic Rule Structure” 仍写明裸字符串 `permission` 会被丢弃并在启动告警，新增 `ref-auggie-1x-perms-basic` 引用。
3. **configuration**：补充工作区规则 frontmatter 的 `always_apply`/`agent_requested`/`manual` 三种类型与 `$rule-name` 用法（`ref-auggie-1x-rules-types`、`ref-auggie-1x-rules-manual`），同时修掉 skills 章节指向 rules 的死链。
4. **hooks**：`PreToolUse`/`PostToolUse` 的 hook 一次一个、按定义顺序执行；某 hook 阻断时该调用后续 hook 不再运行；其它事件并发执行（`ref-auggie-1x-hooks-execution`）。删除旧的“顺序执行、1.x 未重述”说法。
5. **hooks**：删除 `Stop` 的 `decision: "block"` 1.x 断言；1.x 输出参考没有 Stop 小节，该行为只标为 0.x 记录。
6. **skills**：同时呈现 1.x 页面内的矛盾：frontmatter 表写 `name` “should match directory name”，Skill Name Requirements 写 “Match the directory name”；本章按更严格的一处处理，并说明放宽时的边界（`ref-auggie-1x-skills-names`）。
7. **native_plugins**：分别列出两页的插件根变量：插件页 `${AUGMENT_PLUGIN_ROOT}`/`${AUGGIE_PLUGIN_ROOT}`/`${CLAUDE_PLUGIN_ROOT}`（`ref-auggie-1x-plugins-envvars`）；hooks 页 `${PLUGIN_ROOT}`/`${CLAUDE_PLUGIN_ROOT}`/`${AUGMENT_PLUGIN_ROOT}`（`ref-auggie-1x-hooks-plugin-roots`）。
8. **local_transcripts**：把 `--resume` 限定为 1.x 的交互式选择；按 ID／前缀直接恢复标为 0.x 行为，1.x 只给 `--fork` 文档化 ID 前缀。CLI `--export`（导出 HTML 后退出）与 slash `/export`（HTML 默认或 JSONL）分开表述。
9. **audit/report**：记录 `source-auggie-repo` 的全部 7 个 changed path（README.md、CHANGELOG.md、docs/1.x-preview-guide.md、四个 `.github/workflows/*` 删除）并说明 README/workflow 属发布/CI 元数据、无新增源码目录、不构成知识影响；新增 Overview 渠道声明的 snapshot/artifact/reference（`ref-auggie-1x-overview-channels`）。

## 证据窗口与baseline保留

- 20 个官方文档来源均为 2026-11-25T00:28Z 观察；processed baseline 多数为 2026-10-03，`source-auggie-docs-models` 为 2026-10-25。
- `documents/` 扫描缓存只保留 `service-accounts` 与 `autoupgrade` 两个 baseline；但项目 `archive/auggie/artifact-source-<source>-<baseline-sha>/source.md` 保留了全部 20 个 baseline 原件，逐项 sha256 与冻结审计的 baseline 一致。因此所有来源都能做“2026-10-03/10-25 → 2026-11-25”的文本比较。
- 新建的 2026-11-25 文档原件在 `archive/auggie/artifact-auggie-docs-<page>-20261125/raw.md`，sha256 与 audit observed 一致。
- Git `source-auggie-repo` 从 `9cc3ead4…` 到 `8bd7186e…`：8 个提交、7 个 changed path。`CHANGELOG.md`（sha256 `4ee83fd8…`）与 `docs/1.x-preview-guide.md`（sha256 `29256dc0…`）各建新 artifact/snapshot；`README.md` 与四个 `.github/workflows/*` 删除只记录路径，不作为章节证据。
- 文档快照的 `version_applicability` 仍为 `unknown`；八个新 edition 在开头声明只覆盖 1.x 文档线，不映射到具体 npm 版本。

## 逐主题改变的已发布陈述（复审范围）

### configuration（`auggie-cli-configuration-v2`，held）

1. `/config` 向导 → `/settings` 菜单（1.x 明确 `/settings` 取代 0.x `/config`）。
2. “存在多个可写设置文件时 `/config` 会提示保存到哪一层” → 1.x `/settings` **总是**写 `~/.augment/settings.json`，不再提示；项目/本地只能直接编辑或 `--project`/`--local`。
3. `theme` 默认 `default-dark` → 1.x 内置 `dark`/`light`/`ansi`；`default-dark` 仅作为旧值按 `dark` 处理，1.x 页面未写默认主题。
4. 设置示例键 `shell`/`startupScript`/`enableChatInputCompletions`/`autoUpdateMarketplaces` → 1.x 新名 `shellPath`/`shellCommandPrefix`（0.x 名仍可用）；`chatInputCompletions` 被忽略；`autoUpdateMarketplaces` 等键在 1.x 插件页不再出现。
5. 权限文件“CLI 只读用户与项目两个文件” → 1.x 列四个（受管、local、project、user）；权限类型四类 → 五类（新增 `ask-user`）；跨策略顺序加入 `ask-user`（`deny > webhook-policy > script-policy > ask-user > allow`）。
6. 权限工具名 `terminal` → `bash`，新增 `grep`/`find`/`ls`；`terminal` 不在 1.x 旧名表中，旧规则必须改写为 `bash`；旧名兼容子集仅限页面表格。
7. `permission` 裸字符串处理：1.x 仍写明对象+`type`、裸字符串丢弃并在启动告警（修订项 2）。
8. 规则加载顺序与 `--rules` → 1.x `--rule`/`--no-rules`、AGENTS.md 优先于同目录 CLAUDE.md、`.md`/`.mdc`、新增 `.augment/SYSTEM.md`/`APPEND_SYSTEM.md`、三种规则类型与 `$rule-name`（修订项 3）。
9. CLI flag 清单 → 新增 `--thinking`、`--models`、`--tools`/`--no-tools`、`--skill`/`--no-skills`、`--rule`/`--no-rules`、`--prompt-template`、`--theme`、`--mode stream|json`、`--show-cost`、sessions 系列；删除或不再出现的 `--shell`、`--startup-script`、`--persona`、`--quiet`、`--github-api-token`。
10. 环境变量清单 → 1.x 参考页只列 `AUGMENT_SESSION_AUTH` 与 `AUGMENT_DISABLE_AUTO_UPDATE`；`GITHUB_API_TOKEN`、`AUGMENT_AGENT` 不再出现。
11. 自动更新 → 新增 prerelease/stable 通道与“不跨大版本自动升级”；`autoUpdate: false` / `AUGMENT_DISABLE_AUTO_UPDATE=1` 仍是关闭方式。
12. 迁移 → 新增 `shell`→`shellPath`、`startupScript`→`shellCommandPrefix`、`default-dark`→`dark`、`chatInputCompletions` 忽略、`/persona` 退场、0.x 会话需 `/import-legacy-sessions`。

### hooks（`auggie-cli-hooks-v4`，held）

1. 事件清单只展开五类 → 1.x 正式文档化 `PromptSubmit` 与 `Notification`（并接受 Cursor 风格事件别名）。
2. 公共输入字段 `hook_event_name`/`conversation_id`/`workspace_roots` → 1.x 增加 `hook_type`、`cwd`。
3. `file_changes` 只作为“0.x 文档所述、正在退场” → 1.x 明确它是 `write`/`edit` 的 PostToolUse 字段；`bash` 不报告。
4. `SessionStart` 退出码 0 的 stdout 注入 agent 上下文 → 1.x 明确 SessionStart 后台运行、输出**不**加入上下文。
5. `updatedInput` 未实现 → 1.x 已实现（合并进原工具输入；多个 hook 依次应用）。
6. `PostToolUse` 的 `decision: "block"` 阻止 agent 结束 → 1.x 只把 `reason` 追加给 agent，工具不撤销、agent 不停止。
7. `Stop` 的 `decision: "block"` 阻止结束 → 1.x 输出参考无 Stop 小节，只保留为 0.x 记录（修订项 5）。
8. `matcher` 大小写敏感 → 1.x 大小写不敏感；`command` 必须以四种扩展名结尾 → 1.x 任意命令行、无扩展名要求，新增 `args`。
9. `Stop` 同步运行 → 1.x 只有 PreToolUse/PostToolUse 同步；工具事件一次一个按顺序、阻断后跳过后续 hook，其它事件并发；只有 PreToolUse 能阻断；PreToolUse 超时/崩溃 fail open（修订项 4）。
10. `includeConversationData` 只作用于 Stop → 1.x 还给 PreToolUse/PostToolUse 注入 `user_prompt`。
11. 日志标记 `[HookExecutor]` 等 → 1.x 使用 `pi-hooks` 前缀，`/hooks` 会标出旧工具名 matcher。

### mcp（`auggie-cli-mcp-v3`，approved）

1. 变量展开只支持 `${workspaceFolder}` → 1.x 新增 `${VAR}`、`${VAR:-default}`、`\${VAR}`、`~`；位置扩到 `command`/`args`/`cwd`/`env` 与 `url`/`headers`。
2. “没有工作区时变量保持原样” → 1.x 缺环境变量且无默认值时跳过 server 并报错。
3. `auggie mcp add` 的 header 短选项 `-h` → `-H`；`--project`/`--local` 文档化。
4. MCP 工具匹配：1.x 只有 `.*`/省略 matcher 能匹配 MCP 工具，具体工具名不会匹配；`mcp:*` 仍可用。
5. Settings 新增 `disableToolSearch`（关闭自动 MCP 工具发现），与手动 `enableToolSearch` 区分。
6. `auggie login` → `auggie auth login`（凭据边界不变）。

### skills（`auggie-cli-skills-v2`，held）

1. 调用 `/<skill-name>` → `/skill:<name>`；命令后文本随 Skill 指令传入。
2. `/skills` 弹窗（Source/Tokens/导航）→ 1.x 页面不再文档化；诊断改为 `/skill:` 自动补全与 `/reload`。
3. 新增 `--skill`/`--no-skills` 与 settings 的 `skills` 数组；`--skill` 在 `--no-skills` 下仍加载。
4. 工作区发现从固定目录 → 当前目录及父目录的 `.augment/skills/`、`.claude/skills/`、`.agents/skills/`，向上到 git 根。
5. 目录名匹配：frontmatter 表写 “should match”，Skill Name Requirements 写 “Match the directory name”，页面自相矛盾；本章按严格要求处理并写明放宽时的边界（修订项 6）。
6. 新增 `enableSkillCommands` 开关；agent 现在按名称/描述自动加载 Skill。

### custom_agents（`auggie-cli-custom_agents-v3`，approved）

1. `name` 必填 → 全部 frontmatter 字段可选，`name` 默认文件名。
2. `color` 合法 ANSI 颜色名 → 枚举 `red`/`blue`/`green`/`yellow`/`orange`/`purple`/`pink`/`cyan`。
3. `tools` 与 `disabled_tools` 不能同用、同用时 denylist 优先 → 同用时取交集（必须在 tools 且不在 disabled_tools）。
4. `tools` allowlist 可含任意工具 → 只接受内置工具，设置后移除 `codebase-retrieval`/`web-search`/集成/MCP。
5. 新增 `thinking`、`max_turns`、`replace_system_prompt`、`skills`、`disable_skills`、`disable_rules`、`isolation`、`run_in_background`、`enabled`。
6. 新增内置 agent `general-purpose`/`explore`/`plan`，同名自定义 agent 覆盖；`/agents` 向导支持 Generate with Auggie。
7. `auggie models list` → `auggie model list`；`model` 支持部分名匹配。
8. Personas（`/persona`、`auggie persona`）在 1.x 退场。

### custom_providers（`auggie-cli-custom_providers-v3`，approved）

1. 仍无自定义 provider/BYOK/base URL；八题仍 `not_applicable`。
2. 模型选择入口更新：`/model`（Tab 调 effort）、`--model name:effort`、`--thinking`、`--models`、`auggie model list --json`；0.x `auggie models list --full-info` 属旧版。
3. 模型清单增删：新增 Opus 5.5、Haiku 5.5、DeepSeek V4.1 Flash/1017、Gemini 4 Argon/Neon、GPT-6.1 Terra、GPT-6 Sol/Luna、Grok 4.7 等；移除 GLM 5.2、Kimi K2.7 Code 等；Sonnet 5、GPT-6 Sol 退到 More；Haiku 4.5 与 Gemini 3.7 Flash 有退役日期。
4. `auggie login`/`auggie logout` → `auggie auth login`/`logout`，新增 `auggie auth status`、`/login`、`--headless`。
5. 认证页有一处自述把 “1.x 的 `auggie auth login` 和 `auggie auth logout` 被 `auggie auth login` 和 `auggie auth logout` 取代” 写成同义重复，属页面文案错误，不改变命令。

### native_plugins（`auggie-cli-native_plugins-v2`，held）

1. 插件浏览器两个标签 → 三个（Plugins/Marketplace/Errors）；Space 启停、Enter 详情。
2. CLI 安装/列表/更新/删除命令 → 只保留 `plugin marketplace add` 与 `--plugin-dir`；启停移到 `/plugins`。
3. `autoUpdateMarketplaces`/`recommendedMarketplaces`/`dismissedMarketplaces` 与市场后台自动更新、推荐市场流程 → 1.x 页面不再描述；只保留 `enabledPlugins`。
4. 组件清单去掉 `rules/`、加入 `skills/`；命令名 `/plugin-name:hello` → `/plugin-name--marketplace-name:hello`。
5. 插件根变量：插件页列 `${AUGMENT_PLUGIN_ROOT}`/`${AUGGIE_PLUGIN_ROOT}`/`${CLAUDE_PLUGIN_ROOT}`；hooks 页列 `${PLUGIN_ROOT}`/`${CLAUDE_PLUGIN_ROOT}`/`${AUGMENT_PLUGIN_ROOT}`；两页集合不一致，按各自页面记录（修订项 7）。
6. 新增 pi 扩展线：`auggie install/remove/update/list/config`、`--extension`/`--no-extensions`；第三方扩展风险提示。

### local_transcripts（`auggie-cli-local_transcripts-v2`，held）

1. `--dont-save-session` → `--no-session`。
2. 会话位置首次可配：`--session-dir`、`--session PATH`、`--fork PATH_OR_ID`；默认路径仍未知。
3. `--resume` 在 1.x 只文档化为交互式选择；按 ID／前缀直接恢复是 0.x 行为，1.x 只给 `--fork` 文档化 ID 前缀（修订项 8）。
4. 格式证据从 JSON 扩到 JSONL：CLI `--export SESSION.jsonl [output.html]` 导出 HTML 后退出；slash `/export [path]` 可导出 HTML（默认）或 JSONL，`/import PATH` 从 JSONL 导入（修订项 8）。
5. 新增 `auggie session list`（`--all`/`--json`/`-n`）与 `auggie session stats`；恢复会恢复 `--permission` 与 `--add-workspace`。
6. 新增 `/export`、`/import`、`/import-legacy-sessions`、`/tree`、`/worktree`、`/session`、`/name`、`/new`。
7. 0.x 会话在导入前不出现在 `/resume`；无缝迁移仍在路线图。
8. Gist 会话分享被移除。
9. 1.x 删除入口未文档化（`unknown`），不再沿用 0.x `session delete` 作为 1.x 行为。

## 未解决的来源冲突

渠道说法在同一观察窗口内互相矛盾：

- `CHANGELOG.md` 1.2.0：1.2.0 是首个稳定 1.x，`npm install -g @augmentcode/auggie` 现在安装 1.x，0.x 开启自动更新会升到 1.x。
- `docs/1.x-preview-guide.md`（同一提交）：渠道表仍写 `latest`=0.x、`preview`=1.x。
- 文档 banner：1.x 仍是 prerelease；Overview 页说 1.x 在 `prerelease` 标签、0.x 在 `v0-release` 标签（`ref-auggie-1x-overview-channels`）。
- autoupgrade 页：prerelease 只更新到 1.x prerelease、stable 从 `latest` 更新、不跨大版本自动升级。

`configuration` 章节保留各自原文与适用版本线，不合并成单一结论；请 reviewer 判定当前渠道事实。

## 候选与验证

- 新 edition：`auggie-cli-configuration-v2`、`auggie-cli-hooks-v4`、`auggie-cli-mcp-v3`、`auggie-cli-skills-v2`、`auggie-cli-custom_agents-v3`、`auggie-cli-custom_providers-v3`、`auggie-cli-native_plugins-v2`、`auggie-cli-local_transcripts-v2`。
- 当前 selection：八个 1.x edition 全部选中——`skills`→v2、`mcp`→v3、`custom_agents`→v3、`custom_providers`→v3、`hooks`→v4、`native_plugins`→v2、`configuration`→v2、`local_transcripts`→v2。
- 新快照/工件：16 个官方文档页面（含 `llms.txt` index 与 Overview 渠道声明）+ 2 个 Git 文件（`CHANGELOG.md`、`docs/1.x-preview-guide.md`，commit `8bd7186e…`）。
- 新引用：`ref-auggie-1x-*` 共 90 条；所有摘录行已逐条与对应归档原件/精确提交文件比对（脚本核对：0 条缺失、0 条超 800 字符）。
- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/auggie`：通过（exit 0）。
- 未运行 `pnpm knowledge:validate` / `sources:audit-log` / 发布；留给 coordinator 集成后执行。

## 保留与发布

- 旧 edition、旧 snapshot/reference/artifact 字节未改；旧 pending 审计未改写。
- 本审计 `review_status: reviewed`，`reviewed_by: "harness-monitor coordinator (20261124T134056Z); independent reviewer ReviewAuggie/ReviewAuggie2 (20261125)"`，`reviewed_at: 2026-11-25T01:54:38Z`，`pending_question_ids: []`；`pending_audit_refs: []`，历史 pending 仍在原审计中保留，不代表已复核通过。
- `delivery=pr`：本轮不构建 release、不切换 `releases/current.json`、不运行受管二进制。
