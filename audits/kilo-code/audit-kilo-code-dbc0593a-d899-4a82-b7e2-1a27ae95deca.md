# Kilo Code 维护报告 — audit-kilo-code-dbc0593a-d899-4a82-b7e2-1a27ae95deca

## 来源观察

- `source-kilo-code-repo`：`9d0f7a1dd8e843457f1166f64fb87b2275d00b35` → `974723450caa7c91f140b128e2f2e3b4a932ade8`，507 个文件；workspace `ws-974723450caa-24b28442-c63c-46de-be8d-74dfa45fe782`。
- `source-kilo-code-npm`：7.8.3 → 7.8.8，仅发布身份，不计为章节 impact。

## 语义 triage

三处命中已登记引用的变更，全部落在既有机制小节内，属增量维护而非全库重审：

1. `packages/opencode/src/config/config.ts`：`Config.warnings` 由只返回 `s.warnings` 改为 `[...s.warnings, ...ReservedCommand.warnings(s.config.command)]`。配套新增文件 `packages/opencode/src/kilocode/command/reserved.ts` 提供 `warnings()`（按 `command` 键名过滤保留名，产出 `path: command.<name>` 的告警）与 `notice()` 文本。这是**告警来源**增加，不改配置来源、合并优先级或信任判定 → configuration 的 `config-diagnostics`。
2. `packages/opencode/src/mcp/auth.ts`：`Tokens` / `ClientInfo` 各新增可选 `issuer`。配套新增 `packages/opencode/src/kilocode/mcp/oauth-issuer.ts`，并改写 `packages/opencode/src/mcp/oauth-provider.ts` 的读写路径：预注册 clientId 只落盘 client ID + issuer 绑定，不再落盘 secret；授权服务器变更时 SDK 重新注册。属 OAuth 凭据语义 → mcp 的 `mcp-auth` / `mcp-diagnostics`。
3. `packages/opencode/src/tool/task.ts`：工具 description 拼装新增 `KiloTask.usageDescription`（`packages/opencode/src/kilocode/tool/task.ts`），说明 Task 启动的 subagent 只在当前会话内。属委派边界表述 → custom_agents 的 `custom-agents-limits`。

## 受影响问题

| 问题 | 判定 | 处理 |
|---|---|---|
| config.diagnostics | 受影响 | configuration-v4 新增保留命令告警小节 |
| mcp.auth / mcp.diagnostics | 受影响 | mcp-v2 补 issuer 绑定与凭据写入语义 |
| agents.limits | 受影响 | custom_agents-v3 补 Task 工具自述 |
| config.defaults | 未受影响 | 变更未触及 schema 默认值、formatter/lsp 默认或 memory_model 回落 |
| agents.entry / agents.format | 未受影响 | 变更只在工具 description 拼装处，未改定义入口或 frontmatter 字段 |

## 排除依据

507 个文件中的其余部分（VS Code 扩展、文档站 `packages/kilo-docs`、发布/机器人脚本、UI 包）按任务排除说明不是已登记的 CLI 界面；npm 版本变化仅作发布身份记录。

## 冲突处理

- `config.trust` 保持 `conflict`，本轮既未重开也未关闭：三处变更都不涉及 `{env:}` / `{file:}` 引用或项目配置可信度。
- `mcp.lifecycle` 的 5000（文档）与 30000（源码 `DEFAULT_TIMEOUT`）冲突保持原样，本轮未触碰超时常量。

## 版本映射

无。来源为源码树提交，不能证明任何 npm 发布版本的行为，故未新增或修改 mapping。

## 复核

普通增量更新，作者自检通过 `pnpm maintenance:candidates check --candidate <candidate-root>`。本审计 `review_status` 保持 `pending`：仍 `pending_audit_refs` 引用 review_status=pending 的旧审计，不写 `reviewed_by` / `reviewed_at`。