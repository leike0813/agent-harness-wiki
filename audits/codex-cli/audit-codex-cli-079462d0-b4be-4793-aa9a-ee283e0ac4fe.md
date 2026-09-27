# Codex CLI 上游审阅报告 · 2026-09-27

## 给维护者的结论

**维护者已采纳四个文档扫描地址的修正，保留两次审计，不新增能力 Claim，也不切换发布。**旧地址如今跳转到另一个域名，扫描器按来源边界拒绝了跳转；把跳转目标登记为新来源后，四份文档均可取得，且内容与旧快照逐字节相同。这是来源维护，没有发现文档所述配置规则改变。

Git 默认分支前进了一个 commit。它从两处 `info` 日志中移除了 WebSocket 响应头和工具调用参数预览。**这可能减少这些日志暴露敏感数据的机会，但尚无运行观察，也不能据此声称所有日志都已脱敏。**差异没有修改配置、Skills、MCP、agent、provider、hook 或插件的加载与执行路径；本轮没有证据要求改变这七类知识。npm 包仍为 `@openai/codex@0.157.1` 且 integrity 未变，源码 commit 不能证明该包的行为。

维护者已决定让后续扫描使用新文档地址，并将这次源码差异按日志变更结案。七主题原有的完整调查缺口仍然存在，但它们并非本次两个文件的新增发现。

## 变化的意义与证据边界

### 文档扫描失败是入口问题，不是文档内容更新

首次扫描的四个文档请求都被跨域跳转阻断。旧[文档快照](../../knowledge/codex-cli/snapshots/snapshot-codex-cli-doc.yaml)已经记录了解析到 `learn.chatgpt.com` 的地址；复扫时以这些地址建立新的[登记来源](../../registry/harnesses/codex-cli.yaml)。逐字节比较四份新旧归档，内容分别完全相同。因此复扫 YAML 中的 `changed` 是**新来源没有审计基线**，不能解读为四份文档同时更新。旧 Source 与 Snapshot 继续保留历史请求身份。

这项修复让后续扫描可以继续比较文档内容。四份页面没有注明适用的 CLI 版本，即使内容相同，也不能用它们为 npm `0.157.1` 补充精确版本能力结论。维护者已确认使用新来源 URL；没有待采纳的文档事实变更。

### 源码差异影响日志内容，未显示扩展机制变化

在固定的 [Git 差异](https://github.com/openai/codex/commit/41f9084b30812db321a0b592def4f500d1e79cf4)中，[WebSocket 连接代码第 518 行](https://github.com/openai/codex/blob/41f9084b30812db321a0b592def4f500d1e79cf4/codex-rs/codex-api/src/endpoint/responses_websocket.rs#L518)不再把响应头写入成功日志；邻近的连接与响应头读取逻辑仍在。[工具响应处理第 340–344 行](https://github.com/openai/codex/blob/41f9084b30812db321a0b592def4f500d1e79cf4/codex-rs/core/src/stream_events_utils.rs#L340-L344)不再生成参数预览，后续记录响应项与调度工具的逻辑仍在。这支持“所检查差异只改变日志内容”的判断；日志泄露范围是否实际缩小，需要运行或更广的日志链检查才能确认。

扫描器因变更文件未映射到现有证据，把七类主题全部列为初步影响。检查两个文件的实际差异后，没有发现这七类配置和扩展行为的改动。故[新源码快照](../../knowledge/codex-cli/snapshots/snapshot-codex-repo-41f9084b.yaml)下的七份 Coverage 只记录此次差异检查，均为 `partial`；它们不表示七个主题已完成调查。此次也未建立新 Claim、Evidence 或 Assessment。本轮没有发现相反证据，但调查范围仅是两个变更文件，不能证明整个源码树不存在其他问题。

### npm 发布边界保持独立

两次扫描都观察到相同的 `0.157.1` 版本及 registry integrity。Git HEAD 的变化没有附带该 commit 与现有 npm 包构建产物的对应证据。因此无需用源码差异改写 npm Target 的既有 Coverage，也不应把日志改动记成 `0.157.1` 的运行事实。

## 建议维护者决定

维护者于 2026-09-27T15:22:27Z 采纳本报告建议：

- [x] 接受[新的登记 URL](../../registry/harnesses/codex-cli.yaml)作为后续扫描入口；旧 Source/Snapshot 保留历史身份。
- [x] 将本轮能力影响判为“无待改知识”。[两文件差异](https://github.com/openai/codex/commit/41f9084b30812db321a0b592def4f500d1e79cf4)只支持日志内容变化的判断；七份 Coverage 保持 `partial`。日志隐私效果仍需另行取证。
- [x] 将[首次审计](audit-codex-cli-923a5028-6fb9-4e44-9974-139f4b06ce7e.yaml)与[复扫审计](audit-codex-cli-079462d0-b4be-4793-aa9a-ee283e0ac4fe.yaml)标为 `reviewed`；不建立新 Claim，不切换 KnowledgeRelease。

## 调查结果索引

**审计记录：**[首次扫描](audit-codex-cli-923a5028-6fb9-4e44-9974-139f4b06ce7e.yaml)（Git 变化，文档阻断）、[复扫](audit-codex-cli-079462d0-b4be-4793-aa9a-ee283e0ac4fe.yaml)（新 URL 可读）。**待处理旧审计：**无；首次扫描已复核，复扫的 `pending_audit_refs` 保留扫描当时的关联。

**Target：**`codex-cli / cli / source-tree / linux / x64 / native / commit 41f9084b30812db321a0b592def4f500d1e79cf4`。表内各项共用上文的两文件差异及[固定源码快照](../../knowledge/codex-cli/snapshots/snapshot-codex-repo-41f9084b.yaml)；均无新能力断言、适用条件或 delivery 判断。

<!-- prettier-ignore -->
| 主题 | 结论、候选与复核状态 | 证据定位或缺口 |
| --- | --- | --- |
| Skills | [Coverage](../../knowledge/codex-cli/coverage/coverage-codex-repo-41f9084b-skills.yaml) `partial`；无新 Claim | 两文件差异见上；完整加载链和 npm 映射仍待调查。 |
| MCP | [Coverage](../../knowledge/codex-cli/coverage/coverage-codex-repo-41f9084b-mcp.yaml) `partial`；无新 Claim | 两文件差异见上；完整 MCP 行为和 npm 映射仍待调查。 |
| Custom agents | [Coverage](../../knowledge/codex-cli/coverage/coverage-codex-repo-41f9084b-custom-agents.yaml) `partial`；无新 Claim | 两文件差异见上；定义与发现规则仍待调查。 |
| Custom providers | [Coverage](../../knowledge/codex-cli/coverage/coverage-codex-repo-41f9084b-custom-providers.yaml) `partial`；无新 Claim | WebSocket 日志位置见上；provider 配置与 npm 映射仍待调查。 |
| Hooks | [Coverage](../../knowledge/codex-cli/coverage/coverage-codex-repo-41f9084b-hooks.yaml) `partial`；无新 Claim | 两文件差异见上；注册及执行路径仍待调查。 |
| Native plugins | [Coverage](../../knowledge/codex-cli/coverage/coverage-codex-repo-41f9084b-native-plugins.yaml) `partial`；无新 Claim | 两文件差异见上；安装到激活的生命周期仍待调查。 |
| Configuration | [Coverage](../../knowledge/codex-cli/coverage/coverage-codex-repo-41f9084b-configuration.yaml) `partial`；无新 Claim | 两文件差异见上；解析、优先级和 npm 映射仍待调查。 |

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| npm `@openai/codex` | `0.157.1` → `0.157.1`，integrity 相同 | 两次 `unchanged`；无新发布包 Target。 |
| [Git 默认分支](https://github.com/openai/codex/commit/41f9084b30812db321a0b592def4f500d1e79cf4) | `67a7096…` → `41f9084…` | 首次 `changed`，复扫 `unchanged`；实际差异为两处日志内容。 |
| [CLI 文档](https://learn.chatgpt.com/docs/codex/cli.md) | 旧地址 → 新来源 | 首次 `blocked`，复扫 `changed`；内容 hash 与旧快照相同。 |
| [Skills 文档](https://learn.chatgpt.com/docs/build-skills.md) | 旧地址 → 新来源 | 首次 `blocked`，复扫 `changed`；内容 hash 与旧快照相同。 |
| [MCP 文档](https://learn.chatgpt.com/docs/extend/mcp.md?surface=cli) | 旧地址 → 新来源 | 首次 `blocked`，复扫 `changed`；内容 hash 与旧快照相同。 |
| [配置参考](https://learn.chatgpt.com/docs/config-file/config-reference.md) | 旧地址 → 新来源 | 首次 `blocked`，复扫 `changed`；内容 hash 与旧快照相同。 |

## 验证与差异入口

首次 `pnpm sources:scan codex-cli` 因旧文档跨域跳转返回非零，但写入了各来源结果；改用新登记 URL 后复扫通过。`pnpm ahw validate --dataset-root . --profile production` 有效，`partial` Coverage 产生预期的 `COVERAGE_INCOMPLETE` 警告；`pnpm sources:audit-log` 校验两份审计，`pnpm sources:audit` 核对本地原件，相关格式检查与 `git diff --check` 均通过。未运行下载的二进制或行为实验，也未构建发布。

本轮改动包括[来源列表](../../registry/harnesses/codex-cli.yaml)与四个新 Source、[源码 Snapshot](../../knowledge/codex-cli/snapshots/snapshot-codex-repo-41f9084b.yaml)及[Artifact](../../knowledge/codex-cli/artifacts/artifact-codex-repo-41f9084b.yaml)、上表七份 Coverage、两份审计、这份报告和[`.gitignore`](../../.gitignore)。`.gitignore` 修正使其他产品此前被误忽略的 Coverage 文件也显示为未跟踪文件；它们不是本次 Codex CLI 调查新写的文件。

查看本地改动：`git diff -- .gitignore registry/harnesses/codex-cli.yaml`，并用 `git status --short --untracked-files=all` 找出普通 `git diff` 不显示的新文件。固定源码差异可用 `git -C archive/codex-cli/git/41f9084b30812db321a0b592def4f500d1e79cf4/checkout diff 67a709665ac7b50311b93e32612c9a8281684787 41f9084b30812db321a0b592def4f500d1e79cf4 -- codex-rs/codex-api/src/endpoint/responses_websocket.rs codex-rs/core/src/stream_events_utils.rs` 查看。
