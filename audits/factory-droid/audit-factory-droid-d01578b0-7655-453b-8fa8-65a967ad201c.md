# factory-droid 上游审阅报告 · 2026-11-25

## 结论

本轮观察时间 2026-11-25T00:28:53Z（冻结审计 `audit-factory-droid-d01578b0-7655-453b-8fa8-65a967ad201c`）。维护 5 个主题的新 edition：configuration v3、custom_agents v2、mcp v2、native_plugins v2、local_transcripts v2；skills v2、custom_providers v2 与 hooks v1 保持当前选择。

hooks 按高影响处理：官方 `harness/hooks` 页面从 2026-09-30 快照到 2026-11-25 观察整体改写（约 +552/−115 行，整段 Configuration 重写），已推翻已发布 hooks 章节的多项配置步骤与结论。按任务要求**不选新 hooks edition**（仍为 `factory-droid-cli-hooks-v1`），在审计中保留 7 道 hooks 问题 pending，交独立复核。其余主题的固定问题均已在本轮候选内回答。

## 证据窗口

所有结论只覆盖下表“窗口”一栏的可见文本变化。基线原件来自原项目 `archive/factory-droid/artifact-factory-droid-docs-*` 的保留原件；观察文本来自 `/home/joshua/Git/JavaScript/agent-harness-wiki.git/agent-harness-wiki-monitor/documents/<sha>.txt`。对于已有 2026-10-22 保留原件的来源，同时用该原件核对“2026-10-22 → 观察”的增量，避免把更早的变化重复计入。

| 来源 | 基线抓取 | 观察 | 增量 | 结论 |
| --- | --- | --- | --- | --- |
| `docs-skills` | 2026-09-30 / 2026-10-22 | 2026-11-25 | 相对 2026-10-22 仅 automation 链接移动 | 无知识变化；skills v2 继续 |
| `docs-mcp` | 2026-09-30 | 2026-11-25 | +12/−3 | 维护 mcp v2：`droid mcp auth`、`enabledTools` |
| `docs-subagents` | 2026-09-30 | 2026-11-25 | +11/−9 | 维护 custom_agents v2：read-only 上限、`allowSubagentModelOverrides` |
| `docs-hooks` | 2026-09-30 | 2026-11-25 | +552/−115 | 高影响，hold；不选新 edition |
| `docs-plugins` | 2026-09-30 | 2026-11-25 | +86/−26 | 维护 native_plugins v2 |
| `docs-plugin-marketplaces` | 2026-09-30 | 2026-11-25 | +58/−10 | 维护 native_plugins v2 |
| `docs-byok` | 2026-10-22 | 2026-11-25 | 0（2026-10-22 原件与观察一致） | 无新文本；custom_providers v2 继续 |
| `docs-models` | 2026-09-30 | 2026-11-25 | +40/−16 | 仅模型目录与弃用标记变化；无机制答案变化 |
| `docs-settings` | 2026-09-30 | 2026-11-25 | +26/−13 | 维护 configuration v3 与 local_transcripts v2 |
| `docs-cli-reference` | 2026-10-22 | 2026-11-25 | +648/−20 | 新增命令与模型/会话段；未改现有固定问题答案，不新建 edition |
| `docs-org-control` | 2026-10-22 | 2026-11-25 | +81 行 | 维护 configuration v3、custom_agents v2、native_plugins v2、local_transcripts v2 |
| `docs-agents-md` | 2026-09-30 | 2026-11-25 | +5/−3 | 维护 configuration v3 |
| `docs-permission-rules` | 2026-09-30 | 2026-11-25 | +1/−1 | 仅支持邮箱域名 `.ai`→`.com`；无知识变化 |
| `docs-autonomy` | 2026-09-30 | 2026-11-25 | +4/−4 | 维护 configuration v3 与 custom_agents v2 |
| `docs-output-styles` | 2026-09-30 | 2026-11-25 | +13/−9 | 维护 native_plugins v2（作用范围经 plugins 页同文确认） |
| `docs-exec` | 2026-10-22 | 2026-11-25 | autonomy 表 4 行、hooks 新节、示例/链接 | autonomy 分档进 configuration v3；hooks 新节随 hooks hold |
| `repo` | 2026-10-22（485a0c3b） | 2026-11-25（ddd7d36e） | 3 个被引用文件 | 见下节；configuration v3 增补 JSON-RPC 警告 |
| `npm` | 1.19.0 | 1.19.0 | 0 | 无变化 |

## 逐来源说明

### docs-hooks（高影响，hold）

- 配置作用域从 User/Project/Enterprise/Legacy 四层改写为 Org/Runtime/Folder/Project/User 五层，并新增同目录内 `settings.local.json` → `hooks.json`（或旧 `hooks/hooks.json`）→ `settings.json` 的文件优先级与按 handler 去重规则。
- matcher 语法改变：仅含 ASCII 字母、数字、`_`、`-`、空格、`|`、`,` 的值按“名字列表”解析，其它值才按正则；新增 Claude Code 工具名别名。MCP 正则改为对 Droid 内部名（server 名 + `___` + tool 名）测试，`mcp__.*` 不再匹配全部 MCP 工具。
- `hooksDisabled` 从全局开关变为按层级决定：成员层 `true` 不停用 org 托管 hook 与 org 启用插件的 hook；org 的 `hooks.hooksDisabled: true` 才能全停。
- 生效方式从“启动快照 + `/hooks` 复核”改为“设置文件变化自动重载”，并新增 `hook_settings_changed` 通知。
- 输出/失败契约新增 `onFailure`、`preserveRiskLevel`、`args`/exec form、stdout JSON 识别、插件 manifest hooks、`DROID_PLUGIN_DATA` 等。
- 结论：这些变化共同推翻已发布章节的 `hooks.entry`、`hooks.structure`、`hooks.output`、`hooks.conditions`、`hooks.diagnostics` 多处步骤，满足“跨主题关键加载机制改变/推翻已发布步骤”。本轮不写 hooks v2，不把 hooks v1 以外的新 edition 放进章节目录；保留 7 道 hooks 问题 pending，交独立复核。

### docs-agents-md

- 动态发现不再只由 `Read` 触发：读取、编辑、列目录或搜索文件都会触发；`Execute` 的 shell 命令不触发；一个会话可以在其它仓库目录里拾取该仓库的指令。
- 40,000 字符上限明确为“每次工具调用”的动态发现额度，而不是“Read 路径发现”。
- configuration v3 的 config-sources 与 config.sources 答案已改写并新增 `ref-fd-agentsmd-nested-20261125`、`ref-fd-agentsmd-budget-20261125`。

### docs-autonomy

- Medium 档现在包含 push 与 `gh pr create`；High 档改为 force push 等高风险动作；“Use it safely” 的建议同步改为 Medium 处理 commit/push/PR、High 处理 force push。
- configuration v3 的 config-runtime 与 custom_agents v2 的 agents-limits 已更新，并新增 `ref-fd-autonomy-levels-20261125`、`ref-fd-autonomy-safe-20261125`。

### docs-settings 与 docs-org-control

- `hooksDisabled` 的配置位置改为 `settings.json` 的 `hooks` 键（或 `hooks.json` 顶层），并补充层级语义。
- `outputStyle` 的作用范围扩展到 CLI、`droid exec`、Automations、Missions 与 Factory App。
- 新增 `legacyModelOverrides`（仅用户设置，旧模型不告警不升级）与 `vimMode`。
- `cloudSessionSync` 变为可被 org 的 **Session Contents Sync** 锁定；Factory 始终保存会话元数据，会话内容只在同步开启时上传，另有 Store Session Titles / Store Shared Folders 控制。
- 系统级 settings 文件存在但不可读/非法时不再回退，org 策略视为不可用并拒绝插件与 marketplace 变更。
- `allowSubagentModelOverrides` 让 org 档位模型变为默认值；`strictKnownMarketplaces: []` 仍保持严格模式；org 插件策略加载失败时的报错与等待行为。
- 结论：configuration v3、custom_agents v2、native_plugins v2、local_transcripts v2 分别吸收相关段落；非本固定问题范围的 image generation、API key lifetime、Remote Control 改名等只记录为排除项。

### docs-mcp、docs-subagents、docs-plugins、docs-plugin-marketplaces

- MCP：新增 `droid mcp auth`（逐 server 浏览器登录、退出码 `0`/`1`）与 `enabledTools`（非空时只加载列出的工具；与 `disabledTools` 同时命中仍排除）；mcp v2 更新定义、认证、暴露与诊断段。
- Subagents：`tools: read-only` 的子代理永远不高于 Low；工具类别 `read-only` 改为“只读模式的工具”；enterprise 增加 `allowSubagentModelOverrides` 与默认锁定的 `subagentModelSettings`；custom_agents v2 更新 agents-format、agents-limits 与企业段。
- Plugins：原生 `.factory-plugin/` 原样复制，Claude Code 布局仅在缺少原生目录时重命名；`plugin.json` 唯一读取字段是 `hooks`；插件可停用而不卸载；输出样式范围；插件根变量与 `CLAUDE_PLUGIN_DATA`；`github` 插件源；外部提交纳入版本追踪。native_plugins v2 更新组件表、包/清单、安装、能力、版本与诊断段。
- Marketplaces：严格 marketplace 空数组语义、org 策略加载失败、私有仓库凭据与 Droid Computers 凭据；native_plugins v2 的发现与诊断段新增对应引用。

### docs-exec、docs-cli-reference、docs-models、docs-output-styles、docs-permission-rules、docs-byok、docs-skills

- `docs-exec`：autonomy 表示例改为 Medium 含 push/PR、High 含 force push；新增 Hooks 与 droid exec 交互段（随 hooks hold）；其余为示例、链接与措辞整理。configuration v3 的 JSON-RPC 例外来自 Git 源码变更，不把 exec 页面新增的 hooks 细节写进已选章节。
- `docs-cli-reference`：新增 `droid loop`、`droid work-item`、`droid analytics`、`droid computer list`、legacy models、session tree 等命令说明；worktree 分支命名改为 `<current-branch>-<id>` 与托管目录。现有固定问题没有引用这些新段，故不新建 edition；`worktreeDirectory` 默认值在 configuration v2/v3 中未被本次变更推翻。
- `docs-models`：新增/删除模型、促销价与弃用标记。模型目录不是固定问题的机制答案，不维护章节。
- `docs-output-styles`：作用范围扩展到 `droid exec`/Automations/Missions/Factory App，subagents 与 mission workers 仍用标准样式；native_plugins v2 通过 plugins 页同文引用该结论。
- `docs-permission-rules`：仅支持邮箱域名变更，按噪声排除。
- `docs-byok`：2026-10-22 保留原件与 2026-11-25 观察文本一致（`c694a58b…`），本轮无新文本；custom_providers v2 已覆盖 `bedrock-converse`、`authMethod`、`apiKeyHelper` 个人作用域等既有变化。
- `docs-skills`：相对 2026-10-22 原件仅 automation 链接移动；v2 已覆盖同名忽略、org 插件优先级、`${DROID_PLUGIN_ROOT}` 等。

## Git 来源

`source-factory-droid-repo` 从 485a0c3b 前进到 ddd7d36e，`/tmp/git-intersect-1125.json` 列出 3 个被当前引用命中的文件：

1. `docs/reference/hooks-reference.mdx`：Notification 新增 AskUser 工具的 `elicitation_dialog` 来源。属于 hooks 主题，随 hooks hold；不新增 hooks 章节。
2. `docs/cli/droid-exec/overview.mdx`：长期 `stream-jsonrpc` 模式下 `--auto`、`--model`、`--reasoning-effort`、`--disable-builtin-skills` 只校验不配置会话。configuration v3 的 config-runtime 已加入该例外，并在审计中记录为 Git diff 证据（未新增 Git 引用记录，因为本轮没有源码 workspace 与可复核的完整文件 hash）。
3. `docs/reference/cli-reference.mdx`：`--worktree` 改为托管目录 `<worktree root>/<id>/<repo>/` 与 `<current-branch>-<id>` 分支。当前 configuration 章节只写 `worktreeDirectory` 默认值，local_transcripts 未引用 worktree 段，故不改章节。

未受影响的 Git 变更（`.factory/review.yaml`、GitHub workflows、sandbox、enterprise identity/roles/service accounts、analytics API、ask-user、droid-execute-api、docs.json）不在被引用文件内，按任务边界不展开。

## 噪声排除

- 文档站点迁移：`/software-factory/*` → `/automations/*`、`/missions/*` 等链接改写，不改变机制。
- 支持邮箱 `support@factory.ai` → `support@factory.com`。
- 模型 ID/示例更新（如 `claude-sonnet-4-5` → `claude-opus-5-5`、GPT-6.2 等）与促销/弃用标记；不构成固定问题答案。
- 纯措辞、示例缩进、命令换行、表格列宽、标题大小写、`auth_success` 等目录性枚举变化；仅在同时改变触发条件或字段语义时才计入。
- 远端构建/CDN hash、nonce、抓取时间等不可见文本不在比较范围。

## 候选与验证

- 候选：`/tmp/ahw-batch-10/candidates/factory-droid`。新增 5 个 edition、9 个观察快照/原件、30 个新引用；旧 edition、旧引用与旧快照未改动。
- 验证命令：`cd /home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor && pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-10/candidates/factory-droid`，通过。
- 引用摘录已逐条与观察原件比对（含空白归一化），30 条全部命中。
- hooks 独立复核未完成：本审计 `review_status` 保持 `pending`，`pending_question_ids` 仅保留 hooks 7 题；历史 pending audits 未关闭，`pending_audit_refs` 置空仅表示本轮不把它们作为阻塞引用。
