# Claude Code 上游审阅报告 · 2026-10-03

## 给维护者的结论

三份官方文档页（Skills、Settings、MCP）本轮都换了内容，MCP 页在巡检阶段抓取失败、由维护 Agent 重新抓取后确认同样发生变化。变化方向是扩写而不是改写既有结论：Skills 页新增了捆绑 Skill、claude.ai 同步 Skill 的完整生命周期、frontmatter 字段与字符串替换的细则、注入命令的执行与失败语义；Settings 页把“托管设置例外”从零散几条扩成九键表，并补上项目本地文件的落点规则、全局 git 忽略与 `/cd` 行为；MCP 页新增工具输入 schema 的宿主侧处理、tool search 的取值表、每 server 超时与空闲超时、以及恢复会话时等待连接的处理。已发布的七章结论没有被推翻，但每章都有可写进正文的读者可见增量，因此本轮为 claude-code 的全部七个主题各出一版 v3 章节并切换当前版本。

版本边界保持不变：三份文档页都不标注适用版本，页面里新出现的 2.1.x 门槛一律写成页面级说明。npm 来源观察到 2.1.288，但受管包刷新不在本轮范围，章节仍以已记录的 2.1.283 快照作为版本锚点。

## 变化的意义与证据边界

### Skills 页重写了同步 Skill 与捆绑 Skill 的位置

旧版把 `~/.claude/skills/synced/` 与 `anthropic-skills` 保留名写成一组命名规则，新版把它补成一条完整链路：终端会话在登录 claude.ai 账号后后台下载并每约十分钟查一次变更（v2.1.273 起），短名被占用时只能用 `anthropic-skills:名字` 调用，名称比较忽略大小写、空格与全角等兼容写法（v2.1.228 起），`/skills` 与 `/context` 把它们归在 `claude.ai sync` 分组；同步 Skill 的正文按会话位置处理，云会话保留本地行为，桌面 Cowork 把 `!` 命令换成占位符，本机其他会话干脆不执行 `!`、不附加 `@` 引用文件、不替换两个 `CLAUDE_` 变量。同页新增的捆绑 Skill 一节给出 `disableBundledSkills`、`DISABLE_DOCTOR_COMMAND` 与 `skillOverrides` 三层开关。这些内容影响 `skills.roots`、`skills.collision` 与 `skills.conditions`，落在 `skills-locations` 与 `skills-invocation` 小节。

仍缺的部分没有变化：来源仍未给出 `skillOverrides` 之外的组织级可见性策略细节，也没有说明同步 Skill 与插件同名时的完整解析顺序。

### Settings 页的托管例外表与项目本地文件规则

例外表从旧版提到的少数限制性键扩到九个，并首次给出 `modelPicker` 需要 v2.1.242、`maxEffortLevel` 需要 v2.1.267 的门槛，以及 `enableArtifact`、`remoteControlAtStartup`、`crossSessionInbound`、`useAutoModeDuringPlan`、`syncClaudeAiSkills`、`syncClaudeAiPlugins` 的具体取值方向。项目本地文件一节新增两条读者会踩的规则：文件由 Claude Code 首次写入时会被加进全局 git 忽略文件（`core.excludesFile`，否则 `$XDG_CONFIG_HOME/git/ignore` 或 `~/.config/git/ignore`），以及该文件在仓库根的位置带有例外情形（不在 git 仓库、仓库根是 home、Windows、根目录或 `.git`/`.claude` 不属于当前用户）。另有一条此前没写过的运行时限制：`permissions.defaultMode` 的 `auto` 与 `bypassPermissions` 不再从项目或本地文件生效（v2.1.257 起）。这些落在 `config-sources`、`config-overrides` 与 `config-diagnostics`。

### MCP 页的工具 schema、超时与诊断状态

MCP 页新增两节说明宿主如何处理 server 的坏 schema：顶层组合子被压平成单对象并把参数分组写进描述，非法 schema 则被排除掉以免整次请求被拒（v2.1.216 起才运行这两项检查）。超时方面，条目级 `timeout` 字段覆盖 `MCP_TOOL_TIMEOUT`，另有默认 5 分钟（stdio 30 分钟）的空闲超时，stdio 从 v2.1.203 起才纳入。诊断状态补齐了 `Rejected`（被 `disabledMcpjsonServers` 拒绝，只在 `claude mcp get` 显示）与“失败详情会抹掉疑似凭据、从不显示展开 URL”两条边界。`mcp.discovery` 缓存默认关闭这一点与旧版描述不同，已按新页改写。

### 跨主题连带影响

Skills 页的 fork 语义变化同时改写了 custom agents：后台 fork 使用较窄的工具集、编辑落在会话 checkpoint 之外、Explore 与 Plan 会跳过 `CLAUDE.md` 与 git status；`disable-model-invocation: true` 还会阻止 Skill 被预载进子代理。Settings 页的模型类键（`modelPicker`、`maxEffortLevel`、`availableModels`、托管 `model`）改写了 custom providers 的模型清单小节。Skills 页的 `hooks` 字段与“hook 从 Skill 被调用起持续到会话结束”补进 hooks 主题；`skillOverrides` 不作用于插件 Skill、插件前缀命名规则补进 native plugins。

## 本次发布与保留

| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | claude-code-skills-v3 | roots/discovery/collision/format/extensions/loading/invocation/diagnostics: answered；conditions: partial | 已交付（delivery=pr，未在本地切换发布指针） |
| configuration | claude-code-configuration-v3 | sources/overrides/runtime/trust/diagnostics: answered；defaults/migration: partial | 已交付 |
| mcp | claude-code-mcp-v3 | 全部 8 题 answered | 已交付 |
| custom_agents | claude-code-custom_agents-v3 | entry/format/roles/invocation/overrides/limits: partial；diagnostics: unknown | 已交付 |
| custom_providers | claude-code-custom_providers-v3 | entry/auth/models/forwarding/diagnostics: partial；protocol/metadata/responses: unknown | 已交付 |
| hooks | claude-code-hooks-v3 | events/entry/input/conditions/diagnostics: partial；output/order: unknown | 已交付 |
| native_plugins | claude-code-native_plugins-v3 | 全部 7 题 partial | 已交付 |

**发布：** delivery=pr，本轮只做第 1–6 节的调查、采写、自检与审计，未运行 `pnpm chapters:update` 或 `pnpm ahw publish`，未切换本地发布指针。**受管二进制：** delivery=pr 未进入 harness-binary，本轮没有核对受管包，npm 的 2.1.288 观察值只记在审计里。

## 待处理与独立复核

**审计记录：** [audit-claude-code-0703d7d0-9805-406e-bad2-221090fd30ef.yaml](audit-claude-code-0703d7d0-9805-406e-bad2-221090fd30ef.yaml)，review_status 为 reviewed，pending_question_ids 为空。**待处理旧审计：** 无（`audits/claude-code/` 下只有 `target-20260927T161424Z.md` 目标报告，不是待处理审计）。**待复核问题：** 无。本轮没有出现来源互斥、没有来源推翻已发布的配置步骤、跨主题的加载机制也只是新增分支，因此按普通更新自检结案。

未解决的缺口是来源本身的：subagent、hooks、plugins 的专页仍未纳入固定来源，因此 custom agents、hooks、native plugins 三个主题继续保留 partial/unknown 状态，`agents.diagnostics`、`hooks.output`、`hooks.order`、`providers.protocol`、`providers.metadata`、`providers.responses` 仍是 unknown 或缺口。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| [Skills 页](https://code.claude.com/docs/en/skills.md) | 86137b62… → efdc4152… | changed；新增捆绑 Skill、同步 Skill 全流程、frontmatter 与替换细则、注入命令语义 |
| [Settings 页](https://code.claude.com/docs/en/settings.md) | 9987a0a1… → 41ea72eb… | changed；例外表扩到九键，项目本地文件与 git 忽略规则细化，新增 `permissions.defaultMode` 限制 |
| [MCP 页](https://code.claude.com/docs/en/mcp.md) | dcd898d3… → df42327c… | 巡检报 fetch failed；维护 Agent 重取成功并确认内容变化，schema 处理、超时、诊断状态均有新增 |
| `@anthropic-ai/claude-code` | 2.1.283 → 2.1.288 | changed；本轮未取包字节，npm 身份变化不构成章节变化，留给受管包流程 |

## 验证与差异入口

在仓库根运行 `pnpm knowledge:validate` 通过（481 个章节版本，无 error；剩余 warning 全部来自 codex、omp、opencode、pi 等其他产品的历史 coverage 记录）。`pnpm sources:audit-log`、`git diff --check` 与 `git status --short --untracked-files=all` 的结果见本轮答复。

本轮新增的固定来源是 `artifact-claude-code-{configuration,skills,mcp}-doc-20261003` 及其快照与对应引用（`* -20261003`），原件按保留策略留在忽略的 `archive/claude-code/` 下。查看差异：

```bash
git status --short --untracked-files=all | rg claude-code
git diff registry/chapter-current.yaml
```
