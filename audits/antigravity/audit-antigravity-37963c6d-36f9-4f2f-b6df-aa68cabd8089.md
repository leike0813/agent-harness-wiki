# Antigravity 上游审阅报告 · 2026-10-03

## 给维护者的结论

这一轮 Antigravity 的 20 个登记来源全部变化，但真正需要动手的只有两件事。仓库 HEAD 从 `77b1aad` 走到 `65a3c69`，只有一个文件改动：`CHANGELOG.md` 在开头插入了 1.2.14、1.2.15、1.2.16 三节共 45 行。这三节里有若干条会改变读者配置与使用方式的结论，本轮据此发布了四个章节新版本：`antigravity-cli-configuration-v3`、`antigravity-cli-custom_agents-v2`、`antigravity-cli-mcp-v2`、`antigravity-cli-skills-v2`，其余三个主题（custom_providers、hooks、native_plugins）没有对应的 CHANGELOG 条目，保持原版本。

另一件事更值得注意，也更麻烦：19 个官方文档页面全部变了，而且变的是行文本身。本轮工作树和主检出目录都没有保留上一版文档原件，因此无法做逐行 diff；改为重新抓取当前页面（sha256 与扫描观察值逐条一致）并逐条复核既有 319 条引用后确认，文档站做过一次整体改写——标题从 Title Case 改成 sentence case，一部分小节被合并或改名。抽查确认机制描述本身仍在（例如权限页的 `Deny > Ask > Allow`、`action(target)` 与全局通配语法；设置页的 Default / Request Review / Turbo 预设），但 178 条文档类引用里有 107 条已经不能逐字复核上游。141 条 `file_lines` 引用中，139 条落在 CHANGELOG.md 且只是整体平移 45 行（短摘录没有变），另 2 条落在文档页（skills.md 平移 -17 行，plugins.md 行号未变）。

结论是：本轮发布的四个新版本只在 CHANGELOG 明确变化的部分是新的，其余小节沿用上一版的固定来源范围；**53 道固定问题全部保留为待处理**，因为每道题当前都至少有一条引用不再逐字命中上游。这批引用需要一次专门的重锚，而不是在各主题改写时顺带处理。

## 变化的意义与证据边界

### 定制清单按目录链加载（1.2.16）

过去会话在子目录启动时，父级 `.agents/` 目录里的 `skills.json`、`rules.json` 等清单会被忽略；现在从当前工作目录到项目根之间的每一个 `.agents/` 目录都会加载。这条同时回答了「工作区根目录」在多级布局下的含义，影响 `config.sources`（配置来源与作用域）与 `skills.roots`（CLI 查找 Skill 的位置）。它只约束清单文件，`skills/` 目录本身是否也按这条链查找，固定来源没有说明，章节里按此留了缺口。证据是 CHANGELOG 第 18 行，固定在 `65a3c69`。

### agent 对全局配置根的可达性（1.2.15）

过去 agent 读不到 `~/.gemini/config` 里的全局规则与定制文件，现在可以读 `rules/`、`AGENTS.md`、`GEMINI.md`、`skills.json`、`rules.json`、`plugins.json`、`agents.json`，写之前仍会询问，该目录下其它文件依旧不可达。这条影响 `config.trust`，把「可读」与「可写」分成两档，是排查「agent 看不到我的全局规则」时缺的一条线索。

### 三条会改变配置写法的结论（1.2.14–1.2.16）

- `settings.json` 新增 `"queuedMessages": "send-immediately"`，此前写了这个键也会被忽略（`config.defaults`）。
- `--json-schema` 拒绝纯文本、裸类型名和不存在的文件，根节点不是 `"type": "object"` 的 schema 也在启动时报错并以退出码 1 结束；脚本里传错 schema 从此直接失败而不是静默降级（`config.runtime`）。
- `~/.gemini/config/config.json` 带 UTF-8 BOM 时设置加载失败，Notepad 与 PowerShell 的 `Set-Content` 在 Windows 上就会这样保存（`config.diagnostics`）。同节还记录了 `go` 命令的「总是允许」按子命令授权，`go run` / `go test` / `go generate` / `go install` / `go tool` 仍要求精确命令。

另外，全局上下文文件互为符号链接时按同一文件去重（`config.overrides`）。

### 两个子代理侧变化（1.2.15–1.2.16）

图片生成改为交给内置 `image-generator` 子代理，图片生成因此在对话里表现为一次子代理运行；这把内置名册推到了 2026-09-30 的 `subagents.md` 之前，章节里据此说明文档页的名册只是该快照时点的状态（`agents.roles`）。权限请求未获批准时 agent 尊重拒绝、不再用其它命令或工具绕行，这与子代理的冒泡审批是同一条链的两端（`agents.overrides`）。

### MCP 动态客户端注册的兼容细节（1.2.15）

注册端点返回 HTTP 200（而非规范要求的 201）时曾直接报 `registration failed with status 200`，现已能完成注册。`mcp.auth` 的 OAuth 兼容细节由两条增至三条。

### 没有变化的三个主题

custom_providers、hooks、native_plugins 在 1.2.14–1.2.16 里没有对应条目，本轮不改写这三个章节。它们同样受文档改写影响：models.md 与 cli/install.md 影响 23 条引用，hooks.md 影响 29 条，plugins.md 与 marketplace.md 影响 38 条。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | antigravity-cli-configuration-v3 | config.sources：conflict；config.overrides：partial；config.runtime：answered；config.trust：partial；config.defaults：answered；config.migration：answered；config.diagnostics：partial | 已选入当前版本 |
| custom_agents | antigravity-cli-custom_agents-v2 | agents.entry/roles/invocation：answered；agents.format/overrides/limits/diagnostics：partial | 已选入当前版本 |
| mcp | antigravity-cli-mcp-v2 | mcp.definition：conflict；mcp.capabilities：partial；mcp.entry/transport/auth/lifecycle/exposure/diagnostics：answered | 已选入当前版本 |
| skills | antigravity-cli-skills-v2 | skills.format/loading/invocation/diagnostics：answered；skills.roots/discovery/collision/extensions/conditions：partial | 已选入当前版本 |
| custom_providers | antigravity-cli-custom_providers-v1 | 全部保持原状态 | 保留旧版本，引用重锚待下一轮 |
| hooks | antigravity-cli-hooks-v1 | 全部保持原状态 | 保留旧版本，引用重锚待下一轮 |
| native_plugins | antigravity-cli-native_plugins-v1 | 全部保持原状态 | 保留旧版本，引用重锚待下一轮 |

**发布：** delivery=pr，本轮由 harness-monitor 委派，不切换本地发布指针；合并后由既有 CI 负责发布。**受管二进制：** 本轮未做（pr 轮次不进入该步骤）。

新增记录：`snapshot-agy-repo-20261003` 与 `artifact-agy-repo-20261003`（CHANGELOG.md 在 `65a3c69` 的 `git_source_file`，不保留 checkout），以及 12 条固定在该快照的新引用。已发布引用一律未改写。

## 待处理与独立复核

**审计记录：** [audit-antigravity-37963c6d-36f9-4f2f-b6df-aa68cabd8089.yaml](./audit-antigravity-37963c6d-36f9-4f2f-b6df-aa68cabd8089.yaml)，`review_status: pending`。**待处理旧审计：** 无。

**待复核问题：** 全部 53 道固定问题，触发原因是文档站整体改写触及所有主题的引用基础（属于「新来源推翻已发布证据基础」一类），且本轮维护子代理上下文中没有可用的原生 subagent 委派工具，无法取得第二个 Agent 的独立复核。按维护规则，涉及全部主题的证据基础改写应先完成逐条重锚并复核，再考虑结案。

**下一轮的具体工作：** 为本轮 19 个页面建立文档快照与归档原件，然后按主题把 107 条文档类引用逐条重锚（短摘录重新逐字取自新页面，`document_section` 的 heading 改为新标题，`file_lines` 行号加 45 或按新文本定位）。CHANGELOG 行号引用有两种处理方式：保留旧引用继续描述 `77b1aad`，或在重锚时改用 `snapshot-agy-repo-20261003`；本轮选择前者，新条目一律用新快照。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-agy-skills-doc | eb11a56a… → 3db1ead6… | changed；重新抓取后 sha256 与观察值一致；行文大小写与部分小节结构调整 |
| source-agy-slash-commands-doc | c04f3ec6… → c3adb333… | changed；同上 |
| source-agy-mcp-doc | 894da6ab… → 9820c39a… | changed；同上 |
| source-agy-hooks-doc | c1ce6447… → 92ef7603… | changed；同上，事件与字段表所在小节改名 |
| source-agy-plugins-doc | 5768a2dd… → a5b7f3e5… | changed；同上 |
| source-agy-marketplace-doc | 4efd06bd… → 135522a3… | changed；同上 |
| source-agy-sidecars-doc | 7763d96c… → 518b7cc3… | changed；同上 |
| source-agy-subagents-doc | da1e45f9… → 7d7f9d0b… | changed；同上，内置子代理一节改名 |
| source-agy-agent-settings-doc | cd8229aa… → a2e6c9da… | changed；预设小节合并进 macOS/Linux 与 Windows 两节 |
| source-agy-install-doc | 0706cc98… → 403673e1… | changed；同上 |
| source-agy-models-doc | f70a1beb… → 9726408b… | changed；同上 |
| source-agy-settings-doc | f867637b… → daa341f6… | changed；同上 |
| source-agy-rules-doc | f2d38ef2… → b8b30704… | changed；同上 |
| source-agy-permissions-doc | f2dc8d81… → 649be204… | changed；同上，CLI 章节小节层级调整 |
| source-agy-sandbox-doc | 90c58347… → 885a33a1… | changed；同上 |
| source-agy-cli-reference-doc | 81a88de5… → afba197c… | changed；同上 |
| source-agy-cli-migration-doc | 26803485… → 4697b2b5… | changed；同上 |
| source-agy-cli-troubleshooting-doc | cee8cb62… → c9fa04ce… | changed；同上 |
| source-agy-workflows-to-skills-doc | f71ee835… → 28c544a6… | changed；同上 |
| source-agy-repo | 77b1aad0… → 65a3c69e… | changed；`changed_paths` 只有 `CHANGELOG.md`，新增 1.2.14–1.2.16 三节共 45 行 |

## 验证与差异入口

在仓库根运行：`pnpm knowledge:validate` 通过（`Validated 468 chapter editions.`，警告全部来自 codex / omp / opencode / pi 的历史 coverage 记录，与本产品无关）；`pnpm sources:audit-log` 通过（`Validated 4 upstream audit records.`）；`git diff --check` 无输出。

本轮改动：四个章节新版本、一条快照、一条 `git_source_file` 原件、12 条新引用、审计 YAML 与本报告，以及 `registry/chapter-current.yaml` 中 antigravity 的四个 edition 选择。查看方式：

```sh
git status --short --untracked-files=all
git diff -- registry/chapter-current.yaml
```

未运行：`pnpm ahw publish`、`pnpm chapters:update`、`pnpm managed:packages`（pr 轮次不做发布与受管二进制核对）。
