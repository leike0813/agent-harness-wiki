# OpenCode 上游审阅报告 · 2026-10-04

## 给维护者的结论

OpenCode 的源码分支从 545f51d 前进到 907b3bc，npm 上的 opencode-ai 从 1.18.32 变为 1.18.34。官方文档一个字没动，本轮改动的英文文档只有 ecosystem、go、zen 三篇，没有任何一篇被现有引用指向。真正影响读者的是 `packages/opencode/src` 里的 12 个文件，分成三处。

`opencode debug config` 现在先脱敏再打印，新增的 `cli/cmd/debug/redact.ts` 会把凭据类的键值、`headers` 下的全部字符串、含用户名密码或敏感查询参数的 http(s) URL 一律换成 `***`。这个命令还能用来核对某个键最终有没有生效，但已经不能用来核对凭据填得对不对。已发布的配置步骤没有被推翻，只是用途变窄了，这一点写进了新章节。

Provider 侧有两个值得知道的变化。一是超时参数以前对 Cloudflare AI Gateway 路径不生效，现在统一了；二是 `x-opencode-session-id` 变成对所有 provider 都发，不再只发给 opencode 自家的 provider。另外 Gemini 的推理档位改用两条正则区分，旧式命名的 Gemini 1.x 与 2.0 之前拿不到宿主自动设的 high 档位。

MCP 侧给授权跳转加了协议校验（只接受 http/https），并修掉了 Windows 与 WSL 上拉起浏览器失败的漏判。

skills、custom_agents、hooks、native_plugins 四个主题不需要改写。既有 14 条引用指向的 14 个文件在两个提交之间 blob 完全相同，原有结论继续成立。

## 变化的意义与证据边界

### `opencode debug config` 的输出被脱敏（configuration）

新增 `packages/opencode/src/cli/cmd/debug/redact.ts` 定义 `redactConfig`，`cli/cmd/debug/config.ts` 的 handler 改为 `JSON.stringify(redactConfig(config), null, 2)`。命中规则有四类：键名匹配 api key／secret／password／以 token、authorization、cookie 结尾／credential／private key；`headers` 键下的所有字符串取值；带用户名或密码的 http(s) URL；带敏感查询参数名的 http(s) URL。无法解析的 http(s) 字符串也直接替换。

影响到 `config.diagnostics` 与 `config.trust`（受管键的核对方式也提到这条命令）。既有引用 `ref-opencode-config-diagnostics` 引的是官方文档 `config.mdx`，该文件未变，原文“受管键出现在解析后配置里”仍然成立；脱敏只影响凭据类取值。这不是推翻已发布的配置步骤，而是同一条命令的适用面变窄。`config.diagnostics` 仍为 partial，原因未变：文档没有给出显示每个键来自哪个文件的命令。 [@ref-opencode-config-redact] [@ref-opencode-config-debug-cmd]

### Provider 超时统一到 fetch 层（custom_providers）

`provider.ts` 把原先内联在 SDK 路径里的超时逻辑提取为 `timeoutFetch`，并在 Cloudflare AI Gateway 的自定义加载器里单独构造一个带超时的 fetch。该加载器自建客户端、不走通用 SDK，所以 `timeout`、`headerTimeout`、`chunkTimeout` 以前对它无效，现在与其它 provider 语义一致。三个超时先收进一个 `AbortSignal[]`，再由 `AbortSignal.any` 合成一个，任一触发即整体中止；发请求时底层 fetch 的 `timeout` 被强制置为 false 以免重复计时。影响到 `providers.forwarding`（仍 answered）、`providers.responses`（仍 partial，重试语义缺口未变）、`providers.diagnostics`（补一段按被中断阶段区分的排查思路）。 [@ref-opencode-providers-timeout-fetch] [@ref-opencode-providers-timeout-combine] [@ref-opencode-providers-aigateway-timeout]

### 会话头改为对所有 provider 发送（custom_providers）

`session/llm/request.ts` 把 `x-opencode-session-id` 提到 provider 判断之外，不再限定于 opencode provider；子会话另加 `x-opencode-parent-session-id`。原来那组带项目、会话、用户、客户端与 User-Agent 的头仍只对 provider id 以 `opencode` 开头的请求附加。自有网关可以据此做路由与计费归集，第三方端点则多出两个不可关闭的头。 [@ref-opencode-providers-session-headers]

### Gemini 推理档位按模型 id 分档（custom_providers）

`provider/transform.ts` 引入 `GEMINI_2_5_RE` 与 `GEMINI_LEGACY_RE` 两条正则。`googleThinkingLevelEfforts` 改为逐条匹配：含 gemma 走 minimal／high，旧式命名走 low／high，其余按 flash-image、pro-image、flash 与默认分支。可选的档位不是配置字段，而是宿主推断后写进请求的，因此这条只补充 `providers.metadata` 的实现细节，该项仍为 partial——配置层并未定义视觉、推理强度等元数据。 [@ref-opencode-providers-gemini-efforts] [@ref-opencode-providers-gemini-defaults]

### MCP 授权跳转的协议校验与浏览器拉起判定（mcp）

`mcp/oauth-provider.ts` 在跳转前拒绝非 http(s) 的授权地址，错误信息带上服务器地址与实际协议。`mcp/browser.ts` 把退出处理提取为 `onExit`，注册监听后立刻用当时的退出码再判一次，修掉 Windows 与 WSL 上拉起命令直到启动器退出才返回、只等事件会漏判失败的情形。两处都落在 `mcp.auth`（仍 answered），并补进 `mcp.diagnostics`（仍 partial，工具可见性与调用成功仍无专用入口）。 [@ref-opencode-mcp-oauth-scheme] [@ref-opencode-mcp-browser-exit]

### 未触发的变化

`plugin/digitalocean.ts`、`plugin/snowflake-cortex.ts`、`plugin/openai/codex.ts` 本轮只有 `open` 到 `openUrl` 的导入替换。`codex.ts` 的 `ALLOWED_MODELS` 增加了 `gpt-6-sol` 与 `gpt-6-luna`，但既有章节从未记录这个白名单，本轮不据此扩写范围。skills、custom_agents、hooks 三个主题的引用文件全部未变。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | opencode-configuration-v3 | config.diagnostics：partial；config.trust：answered | 已交付，建议选为当前版本 |
| custom_providers | opencode-custom_providers-v4 | providers.forwarding：answered；providers.metadata：partial；providers.responses：partial；providers.diagnostics：partial | 已交付，建议选为当前版本 |
| mcp | opencode-mcp-v4 | mcp.auth：answered；mcp.diagnostics：partial | 已交付，建议选为当前版本 |
| skills | opencode-skills-v2 | 无变化 | 保留旧版本 |
| custom_agents | opencode-custom_agents-v3 | 无变化 | 保留旧版本 |
| hooks | opencode-hooks-v2 | 无变化 | 保留旧版本 |
| native_plugins | opencode-native_plugins-v2 | 无变化 | 保留旧版本 |

**发布：** delivery=pr，未运行 `ahw publish`、`chapters:update` 或 `managed:packages`，未修改 `registry/chapter-current.yaml`；请在聚合阶段把 opencode-configuration-v3、opencode-custom_providers-v4、opencode-mcp-v4 选为当前版本。 **受管二进制：** 本轮未核对，delivery=pr 不进入受管二进制流程。

npm 侧 1.18.34 只作身份记录。新章节的固定源码提交是 907b3bc，与 opencode-ai@1.18.34 之间没有建立版本映射，正文保留了这条适用性缺口——按契约不因 npm 版本变化制造映射。

## 待处理与独立复核

**审计记录：** [audit-opencode-ce0d3f6d](../../audits/opencode/audit-opencode-ce0d3f6d-b79a-426b-85cf-c335bf5fc2ba.yaml) **待处理旧审计：** 无。 **待复核问题：** 无。三个触发条件都不成立：官方文档未变、与实现无冲突；`opencode debug config` 的配置步骤没有被推翻，只是脱敏后不能核对凭据取值，已在新章节写明；本轮没有跨主题关键加载机制变化。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-opencode-repo | `545f51d26cc39a907d2867492d498d9607ea5fa4` → `907b3bc518fa48e90e8ec24dd327d13eee71c36c`（refs/heads/dev） | changed。239 个路径变化，其中 `packages/opencode/src` 12 个文件与本产品知识相关；六个主题文档 blob 未变 |
| source-opencode-npm | `1.18.32@sha512-SCrZWd…` → `1.18.34@sha512-9WUS2T…` | changed。仅版本与 integrity 变化，未据此制造章节变化或版本映射 |

两个来源都成功观察，无失败。源码经受管入口在项目外临时工作区读取，读到的内容用 `git_source_file` 固定 commit、file 与 `content_sha256`，不保留 checkout。

## 验证与差异入口

`pnpm knowledge:validate` 通过（0 error）。`pnpm sources:audit-log` 通过，Validated 35 upstream audit records。`git diff --check` 无输出。全树的 `COVERAGE_INCOMPLETE` 警告对所有已登记产品一致出现，属既有状态，未在本轮处理。

新增来源记录：`knowledge/opencode/artifacts/artifact-opencode-repo-20261003.yaml`、`knowledge/opencode/snapshots/snapshot-opencode-repo-20261003.yaml`，以及 10 条引用（config-redact、config-debug-cmd、providers-timeout-fetch、providers-timeout-combine、providers-aigateway-timeout、providers-session-headers、providers-gemini-efforts、providers-gemini-defaults、mcp-oauth-scheme、mcp-browser-exit）。

本轮改动的章节版本：`opencode-configuration-v3.md`、`opencode-custom_providers-v4.md`、`opencode-mcp-v4.md`。查看入口：

```sh
git status --short --untracked-files=all -- knowledge/opencode audits/opencode
git diff -- knowledge/opencode audits/opencode
```
