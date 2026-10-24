# kilo-code — 2026-10-22 维护报告

审计：`audit-kilo-code-a6ddbaed-77d1-4a1e-96d4-d3c0cf16e5cc`
固定观察：`2026-10-22T12:54:38.524Z`，Git `4ee8d1b3b1f8cadefa925c9959dcbda7f87100da` → `e08cc5429ae10c2e9ee106c1274edf627e02644d`，npm `7.8.8` → `7.8.15`。

## 变更来源

Git 来源 394 个变更文件中，4 个被已发布章节引用且构成机制级变化：

| 文件 | 变化 |
|---|---|
| `packages/opencode/src/mcp/index.ts` | 连接前刷新过期 OAuth 令牌；两个远程传输共用 `oauthGuard(probe(...))` |
| `packages/opencode/src/mcp/oauth-provider.ts` | `invalidateCredentials` 改为按失败请求指纹条件清除，并记录失效结果日志 |
| `packages/opencode/src/mcp/auth.ts` | 新增 `McpAuth.invalidate`，在读改写流程内比较后清除 |
| `packages/opencode/src/kilocode/tool/task.ts` | 继承上限的 edit 规则集按调用方来源区分；新增 `refresh` |
| `packages/opencode/src/tool/task.ts` | 恢复子会话时改用 `KiloTask.refresh` |

新增文件：`kilocode/mcp/{refresh,invalidation,oauth-fetch}.ts`、`kilocode/permission/allowlist.ts`；`kilocode/mcp/sse-probe.ts` 把探测限定到 MCP 端点的 SSE GET。

## 语义判断

- **mcp**：`mcp.lifecycle` 新增“连接前的过期令牌刷新”“远端 fetch 包装”“条件式自动失效”三段；`mcp.diagnostics` 新增刷新与失效日志的判读。`mcp.lifecycle` 仍记为 `conflict`：`using-in-cli.md` 写 `timeout` 默认 5000ms，运行时常量仍为 30000ms。→ 新 edition `kilo-code-cli-mcp-v4`。
- **custom_agents**：`agents.overrides` 增加 edit 继承边界（自定义委派者的 edit 策略不外溢、会话级拒绝仍约束后代、允许列表基线不被压平）；`agents.limits`/`agents.diagnostics` 增加恢复子会话对旧通配拒绝的重算说明。嵌套深度、并发与超时缺口不变。→ 新 edition `kilo-code-cli-custom_agents-v5`。
- **configuration**：`packages/kilo-docs/pages/code-with-ai/platforms/cli-reference.md` 仅新增 `kilo auto` 章节，`kilo config`、`kilo debug config`、`kilo help` 文本逐字未变；配置文件与 `kilo config check` 源码本轮未改。`config.diagnostics` 答案维持，不新建 edition。
- **native_plugins**：`kilo plugin` 段落整体下移 112 行但文本未变；`packages/opencode/src/plugin/**` 与插件命令源码未改。`plugins.install` 答案维持。

## 排除

- `packages/opencode/src/session/llm.ts` 的自定义自动路由（ADR 0005）属 custom_providers 机制，不在本轮固定主题内；`kilo auto` 命令同属该主题。
- `kilo pr` 的 `--session` 选项、VS Code / JetBrains 扩展改动、社区 triage 脚本、包版本提升与 `.kilo/skills/pr-track-v1` 均不在本轮固定问题内。

## 证据

新引用固定到 `e08cc5429ae10c2e9ee106c1274edf627e02644d` 的 `git_source_file`，只记 commit、仓库相对路径与 `content_sha256`；旧引用保留在各自更早的快照提交上。关键定位：`mcp/index.ts:348-365`、`kilocode/mcp/refresh.ts:43-61,86-93,96-126`、`mcp/auth.ts:167-184`、`kilocode/mcp/invalidation.ts:44-58`、`mcp/oauth-provider.ts:204-236`、`kilocode/mcp/oauth-fetch.ts:45-58`、`kilocode/tool/task.ts:100-108,128-138,177-187`、`kilocode/permission/allowlist.ts:4-24`、`tool/task.ts:210-219`、`test/kilocode/subagent-edit-allowlist.test.ts:154-173`。

## 结果

七个固定问题全部结案：`config.diagnostics`、`plugins.install` 维持原答案；`agents.overrides`、`agents.limits`、`agents.diagnostics`、`mcp.lifecycle`、`mcp.diagnostics` 由新 edition 承载。候选 `pnpm -s maintenance:candidates check` 通过。无来源失败、无阻塞；旧审计 `audit-kilo-code-7daf232a`、`audit-kilo-code-a24ae2b5` 的未结案问题保持引用，不因本次结案关闭。
