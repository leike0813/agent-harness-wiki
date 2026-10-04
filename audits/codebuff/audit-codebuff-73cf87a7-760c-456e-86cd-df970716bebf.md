# Codebuff 上游审阅报告 · 2026-10-03

## 给维护者的结论

这一轮真正变了的是仓库提交 `639e3f3` 到 `9fbc44c`。对读者影响最大的一处，是远程 agent 模板的发布者
信任门：它此前只拦带字符串 `handleSteps` 的模板，现在连"只声明了 `mcpServers`、没有任何
`handleSteps`"的模板也一起拦，错误文案同步改成 "contains executable handleSteps or MCP servers from an
untrusted publisher"。这条同时改动了自定义 Agent、配置机制和 MCP 三个主题的正文——远程模板的 MCP
server 会在第一个 agent 步骤就在本机起进程或把 `$VAR` 请求头发往模板给的 URL，因此它和
`handleSteps` 属于同一类可执行内容。

另外三处是：agent 定义新增 `completionCheck` 布尔字段；`settings.json` 新增 `freebuffModelKey` 与
`freebuffCatalogReasoningEfforts` 两个模型目录键；`/byok` 一组命令的参考与 `/byok help` 改成分步向导、
`/byok update` 多一个可选环境变量名、`/byok validate` 的结果多出模型清单字段与凭据分流文案，另外补了
本轮花费封顶（429）的不可重试处理、`retry-after` 头白名单，以及兼容不发 `index` 的流式工具调用。

十个官方文档来源本轮全部报 `changed`，但这不能当内容变化：同一 URL 连抓两次字节就不同，重新抓取的
字节也与扫描记录的 `observed` 不同。逐条比对既有引用后确认正文没有读者可见变化，因此没有为它们新建快照，
也没有因此改写任何文档驱动的结论。这批来源会在后续每轮继续报 `changed`，请维护者决定是否把 URL 换成同一
页面的稳定渲染（例如站点提供的 markdown 端点），否则每轮都要重新做一次同样的排除。

## 变化的意义与证据边界

### 发布者信任门扩大到远程模板的 MCP server

判定函数从只检查 `handleSteps` 变成 `hasExecutableContent`，后者是"字符串 `handleSteps` 或 `mcpServers`
非空"。影响的问题与小节：`agents.roles`（自定义 Agent）、`config.trust`（配置机制）、`mcp.entry`（MCP）。
证据是 `sdk/src/agent-publisher-trust.ts` 在新提交下的函数与错误文案，以及 `common/src/.../agent-definition.ts`
里 `mcpServers` 字段本身的定义。没有验证的部分：这道门只在模板来自公开注册表时生效，本地 `.agents` 文件与
SDK 传入的 `agentDefinitions` 仍不受限；纯数据模板（只有提示词、工具列表、可 spawn 的子 agent）仍照旧加载。

### BYOK 的命令面与错误面

`/byok update` 新增可选的第四个位置参数 `ENV_VAR`，让换端点时显式写出新端点读哪个环境变量；
`/byok validate` 的成功结果新增 `statusCode`、`modelListed`、`availableModels`，CLI 把"模型不在端点列表里"
渲染成带清单的警告；凭据错误分成"本进程没设这个变量"与"provider 拒收这个变量里的密钥"两句。这三处都由
`cli/src/commands/byok.ts` 与 `sdk/src/byok.ts` 在新提交下的实现直接支撑。仍缺的是：没有把"配置可读 /
凭据可读 / 模型可选 / 请求已发"拆开输出的单一命令，`/byok validate` 仍同时覆盖凭据与连通性。

### 重试与流式解析的两处边界

本轮花费封顶（HTTP 429 且响应体 `error: 'turn_spend_limit'`）被显式改写成不可重试错误，理由写在函数注释
里：同一 run id 重试只会继续被拒，默认退避只会产出"Failed after 4 attempts"这种看不出原因的结果。
失败响应只保留 `retry-after` 与 `retry-after-ms` 两个纯数字头。另外内嵌的 OpenAI 兼容 provider 新增
`inferToolCallIndex`，处理不发 `index` 的工具调用分片。三处都在 `sdk/src/impl/model-provider.ts` 与
`packages/llm-providers/.../openai-compatible-chat-language-model.ts`，属于实现行为，未在本轮做运行验证。

### 无变化的部分

skills 主题的加载器、frontmatter 解析、skill 工具与 `skill:` 命令分支均未变；native_plugins 的工具名清单、
主题配置与工作区声明未变。hooks 主题的结论在本提交仍成立：没有第一方生命周期钩子，`run_file_change_hooks`
的 SDK 路径仍是显式 no-op。`sdk/src/run.ts` 新增的 `requestHeaders` 与 `deadlineAt` 是宿主回调，不是用户可配置
的钩子，因此不改写 hooks 章节；该主题里两条引用（`run-options`、`sdk-host-callbacks`）的摘录在新提交下已
不逐字命中，但它们指向的旧快照仍然有效，留在旧版本里即可。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_agents | codebuff-cli-custom-agents-v2 | agents.format: answered；agents.roles: answered | 已交付，等 PR 合入后由既有 CI 发布 |
| configuration | codebuff-cli-configuration-v2 | config.trust: answered；config.sources/migration: partial | 已交付，等 PR 合入后由既有 CI 发布 |
| custom_providers | codebuff-cli-custom-providers-v2 | providers.entry/diagnostics: answered；providers.responses: partial | 已交付，等 PR 合入后由既有 CI 发布 |
| mcp | codebuff-cli-mcp-v3 | mcp.entry: answered | 已交付，等 PR 合入后由既有 CI 发布 |
| hooks | codebuff-cli-hooks-v1 | 未变 | 保留当前版本 |
| skills | codebuff-cli-skills-v1 | 未变 | 保留当前版本 |
| native_plugins | codebuff-cli-native-plugins-v1 | 未变 | 保留当前版本 |

**发布：** 本轮 delivery=pr，未运行 `pnpm chapters:update`、`pnpm ahw publish`，未切换本地发布指针。
**受管二进制：** 未调用 harness-binary，codebuff 的受管包最新版本留给该 Skill 单独核对。

## 待处理与独立复核

**审计记录：** `audits/codebuff/audit-codebuff-73cf87a7-760c-456e-86cd-df970716bebf.yaml`。
**待处理旧审计：** 无（`pending_audit_refs` 为空）。**待复核问题：** 无。本轮的四处变化都由单一固定提交
直接支撑，不存在来源冲突、也没有推翻已发布的配置步骤；跨主题的加载机制变化（发布者信任门同时影响 agents、
configuration、mcp）已在本轮把三个主题一起改写，事实源是同一处代码，不属于需要第二个 Agent 独立复核的
分歧情形。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-codebuff-repo | `639e3f3c7a96…` → `9fbc44c44464…` | changed；350 个文件变化，38 处引用所在文件在变化集中，8 条引用摘录失效，四处读者可见变化已改写 |
| source-codebuff-npm | 无基线 → `1.0.688@sha512-lPbN…` | changed；版本变化本身不构成章节变化或版本映射，未做映射 |
| source-codebuff-docs-skills | `83233ecc…` → `d45ce92d…` | changed；重新抓取得到第三个 hash（`aad0aa9d`），既有引用逐字命中，无内容变化 |
| source-codebuff-docs-mcp | `4f13c1ad…` → `12b5be54…` | changed；同上，引用正文逐字命中，无内容变化 |
| source-codebuff-docs-agent-reference | `80d55f92…` → `7fb375ea…` | changed；同上，无内容变化 |
| source-codebuff-docs-agents | `09e1beb0…` → `532338c4…` | changed；同上，无内容变化 |
| source-codebuff-docs-knowledge | `ddfa12d9…` → `1f96e686…` | changed；同上，无内容变化 |
| source-codebuff-docs-troubleshooting | `6886504a…` → `f84f5b61…` | changed；同上，聊天历史路径段落逐字命中 |
| source-codebuff-docs-agent-troubleshooting | `a0ef4255…` → `47fd0879…` | changed；同上，无内容变化 |
| source-codebuff-docs-how | `c06e97a4…` → `ededcb82…` | changed；同上，编排器与子 agent 段落逐字命中（子 agent 现补了各自模型名） |
| source-codebuff-docs-quickstart | `05cac476…` → `31241ebf…` | changed；同上，无内容变化 |
| source-codebuff-docs-sdk | `46f7c467…` → `75da610a…` | changed；同上，无内容变化 |

## 验证与差异入口

`pnpm knowledge:validate` 通过（0 error，其余为其他产品的既有 warning）；`pnpm sources:audit-log` 通过，
共校验 11 份审计记录；`git diff --check` 与 `git status --short --untracked-files=all` 已运行。新增的 7 份
快照与原件记录用 `git_source_file` 固定 `9fbc44c` 下的 commit、文件与内容 hash，不保留 checkout。

本轮改动入口：`knowledge/codebuff/chapters/codebuff-cli-custom-agents-v2.md`、
`codebuff-cli-configuration-v2.md`、`codebuff-cli-custom-providers-v2.md`、`codebuff-cli-mcp-v3.md`，
对应的 11 条新来源引用与 7 组快照／原件，以及 `registry/chapter-current.yaml` 中 codebuff 的四个条目。
本地查看：`git status --short --untracked-files=all` 与 `git diff -- registry/chapter-current.yaml`。
