# Cline 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮 Cline 仓库从 `789f79e4` 前进到 `c441897f`，其中确实有知识层面的变化，但只落在 MCP 主题的一侧：Cline 新增了 MCP Apps（`io.modelcontextprotocol/ui` 扩展）、客户端与管理器层的 `readResource`，以及按工具 `_meta.ui.visibility` 过滤模型可见工具的能力。已发布的 `cline-cli-mcp-v3` 写的是「只实现 tools、resources/prompts 没有任何调用点」，这句话在本提交上不再成立，因此新建了完整版 `cline-cli-mcp-v4` 作为候选；独立复核要求改正两处正文事实后再复核，故本产品 mcp 选择暂不切换（仍为 `cline-cli-mcp-v3`，旧版文件原样保留）。`mcp.lifecycle`、`transcripts.lifecycle`、`skills.loading` 三个问题逐处复核后答案未变，对应章节不动。

需要维护者注意的边界：MCP Apps 的扩展声明是按客户端工厂选项（`mcpApps`）开启的，CLI 运行时构建两个工厂时都没有传这个选项，所以 **CLI 会话本身并不声明该扩展**；核心管理器的 `readResource` 在 `c441897f` 没有生产消费者（只有测试文件调用：`manager.test.ts`、`client-url.test.ts`、`client-apps.test.ts`；`apps/` 下也没有实例化 `InMemoryMcpManager`），VS Code 扩展读 resource 走的是它自带的 `McpHub`（`apps/vscode/src/sdk/vscode-runtime-builder.ts:49-51` 转调 `apps/vscode/src/services/mcp/McpHub.ts:1756-1771`），不经过 SDK 核心管理器；CLI 仍未把 MCP resources 交给模型。新版正文把这两层区别写清楚了，避免读成「CLI 现在支持 resources 与 apps」。

本轮只交付候选，不发布、不切换指针、不处理受管二进制。

## 变化的意义与证据边界

### MCP 能力面：apps、resources 与工具可见性

提交 `c441897f` 新增 `sdk/packages/core/src/extensions/mcp/apps.ts`，定义扩展 id `io.modelcontextprotocol/ui`、MIME `text/html;profile=mcp-app`、`ui:` 资源 URI 方案，以及 `createMcpAppsClientCapabilities()`。[@ref-cline-mcp-apps-extension]

- `client.ts` 的 stdio initialize 语句为 `capabilities: this.mcpApps ? createMcpAppsClientCapabilities() : {}`；`mcpApps` 是 `DefaultMcpServerClientFactoryOptions` 的可选项，默认不设。[@ref-cline-mcp-client-app-capabilities] `runtime-builder.ts` 里两个工厂（设置文件与 Agent Plugin）都只传了路径或 origin 限制，没有传 `mcpApps`。[@ref-cline-mcp-runtime-apps-off] 结论：CLI 会话不声明 MCP Apps。
- `McpServerClient` 与 `McpManager` 新增可选 `readResource`；stdio 客户端发 `resources/read` 并用 `ReadResourceResultSchema` 校验，远程客户端转调 SDK 同名方法。[@ref-cline-mcp-client-read-resource] 管理器侧做连接复用与委派，缺实现时抛 `client does not support reading resources`。[@ref-cline-mcp-manager-read-resource]
- 工具描述符保留 `_meta`，`createMcpTools` 用 `isMcpToolVisibleToModel` 过滤，判定来自 `_meta.ui.visibility`（缺省 `model`+`app`）。[@ref-cline-mcp-client-tool-meta][@ref-cline-mcp-app-tool-visibility][@ref-cline-mcp-model-tool-filter]

缺口：CLI 运行时只从管理器取 tools 与 shutdown，没有把管理器或 resource 工具交给会话；本轮没有找到 CLI 侧读取 resources 的入口，因此 `mcp.capabilities` 只按「CLI 可见/可用」回答，`mcp.diagnostics` 增加「工具被静默过滤」与 resources 错误文本两条观察点，状态仍为 `partial`。

### 未变的问题：生命周期、Transcript 与 Skill 加载

- `mcp.lifecycle`：连接预算（stdio 与远程各 10 秒）、禁用不连接、工具缓存 5000 毫秒、stdin 写失败的 250 毫秒宽限与错误文本都没有改动，`mcp-transport` 正文保持。
- `transcripts.lifecycle`：`local-runtime-host.ts` 新增插件命令 API、`prepareApiMessages` 与 `pluginCommandsClosing`，`chat-commands.ts` 新增未知命令 fallback，只造成已发布引用的行号偏移；创建、整体重写落盘、按 `messagesPath`/manifest 回退恢复、`/fork` 与 `metadata.fork`、压缩边车与 `compaction_path` 回填均未变，`cline-local_transcripts-v1` 保持。
- `skills.loading`：离线对比 2026-10-09 归档原件与新抓取页面，差异只是 MDX 组件改写为 Markdown（Note 引用块、Steps 改为加粗编号），分层加载与 skills 工具的描述/正文语义一致；`definitions.ts` 只新增 PowerShell 引号说明（使 skills 工具描述行号下移），`user-instruction-plugin.ts` 未改。`cline-cli-skills-v3` 保持。
- `cline skill` 命令改为复用 `@cline/core` 的 `SKILLS_CLI_PACKAGE`（`package.json` 固定 `skills` 1.7.2），属安装入口，不在 `skills.loading` 范围内，本轮不改写。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| mcp | cline-cli-mcp-v4（候选） | mcp.capabilities：answered（复核后改写）；mcp.diagnostics：partial；mcp.lifecycle：answered（未变） | 未切换：当前版本仍为 cline-cli-mcp-v3，v4 保留待再次复核 |
| local_transcripts | cline-local_transcripts-v1（保留） | transcripts.lifecycle：answered（机制未变） | 保留旧版本 |
| skills | cline-cli-skills-v3（保留） | skills.loading：answered（机制未变） | 保留旧版本 |

**发布：**仅交付候选，未构建、未切换指针。**受管二进制：**本轮 `delivery=pr`，按契约未触发。

## 待处理与独立复核

**审计记录：** `audits/cline/audit-cline-b00e3eee-6c27-4080-a9e1-bbbf86a2887d.yaml`。**待处理旧审计：** `audit-cline-0e842971` 仍自行携带 `plugins.lifecycle`、`plugins.diagnostics` 未决，本审计不代替其结案。**待复核问题：**独立复核 `rev2-cline` 判定 `changes_requested`。需更正 mcp.capabilities 的两处表述（resources 消费者归属、prompts 调用点范围）并把 mcp-exposure 的 tools.ts/client.ts 引用改钉 2026-10-22 快照；三项已在本报告与章节中改正，`cline-cli-mcp-v4` 仍待再次复核，因此 mcp 选择保持 `cline-cli-mcp-v3`。其余四个问题（mcp.diagnostics、mcp.lifecycle、skills.loading、transcripts.lifecycle）复核为 upheld。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-cline-repo | 789f79e4 → c441897f | changed；290 个文件，其中 MCP、skill 命令、插件命令、本地运行时宿主为机制级变化，其余为发布流程、测试与文档 |
| source-cline-npm | 3.0.71@sha512-THSC… → 3.0.73@sha512-4lx7… | changed；只记录身份，未制造版本映射 |
| source-cline-docs-skills | 4bb4766e → 6ebad683 | changed；MDX 到 Markdown 的排版改写，语义不变 |
| source-cline-docs-mcp | 47f5e46c（不变） | unchanged |
| source-cline-docs-cli | 2d46cc4e（不变） | unchanged |
| source-cline-docs-plugins | d1015410 → 868c44b2 | changed；属 native_plugins 主题，本轮不审 |
| source-cline-docs-install-plugins | 8f84c960 → 8f995630 | changed；属 native_plugins 主题，本轮不审 |
| source-cline-docs-config | 76f4d40e → b81e94c7 | changed；属 configuration 主题，本轮不审 |

## 验证与差异入口

候选自检：`pnpm -s maintenance:candidates check --candidate <candidate-root>` 通过（本轮唯一运行的检查）。未运行项目构建、lint、typecheck 或测试，按分工由父进程在集成后校验。

本轮新增：`knowledge/cline/chapters/cline-cli-mcp-v4.md`；8 条引用（`ref-cline-mcp-apps-extension`、`ref-cline-mcp-app-tool-visibility`、`ref-cline-mcp-client-app-capabilities`、`ref-cline-mcp-client-tool-meta`、`ref-cline-mcp-client-read-resource`、`ref-cline-mcp-manager-read-resource`、`ref-cline-mcp-model-tool-filter`、`ref-cline-mcp-runtime-apps-off`）；5 组 snapshot/artifact（apps、client、manager、tools、runtime-builder，提交 `c441897f`）。复核后追加：`ref-cline-mcp-tools-20261022`、`ref-cline-mcp-proto-20261022`（把 mcp-exposure 的 tools.ts/client.ts 引用改钉 2026-10-22 快照，旧引用仍服务旧版），以及 `artifact-cline-docs-skills-mdx-20261022` / `snapshot-cline-docs-skills-mdx-20261022`（`docs/customization/skills.mdx` @ `c441897f` 的留存锚点，用于复核 skills 文档的排版差异判定）。
