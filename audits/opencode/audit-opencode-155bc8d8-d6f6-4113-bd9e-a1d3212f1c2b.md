# opencode 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:06:16.957Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 skills、mcp、configuration、custom_agents、custom_providers、local_transcripts 主题的 17 道固定问题。

## 变化的意义与证据边界

1 个 Git 仓库来源变更（786 个文件，基线 e965774fa0e2 前进到 17b79f4e0c16）、1 个 npm 来源版本自 1.19.3 前进到 1.19.4。已发布引用落在 packages/web/src/content/docs/{agents,config,mcp-servers,providers,skills}.mdx、packages/core/src/config/normalize.ts、packages/core/src/session/compaction.ts、packages/cli/src/commands/commands.ts、packages/schema/src/config/experimental.ts 的行定位不再命中。

这些文件是本产品已发布配置归一化、会话压缩、命令面与官方文档页面的直接证据，属跨主题的关键机制。

本轮派发这十七道题。npm 版本前进属纯发布身份变化，未比较包内容。

### 派发问题与证据入口

- `skills.format`：cited source file changed at the published locator；packages/web/src/content/docs/skills.mdx (packages/web/src/content/docs/skills.mdx:34-70)；packages/web/src/content/docs/skills.mdx (packages/web/src/content/docs/skills.mdx:45-53)
- `mcp.definition`：cited source file changed at the published locator；packages/web/src/content/docs/mcp-servers.mdx (packages/web/src/content/docs/mcp-servers.mdx:115-127)；packages/web/src/content/docs/mcp-servers.mdx (packages/web/src/content/docs/mcp-servers.mdx:130-163)
- `mcp.auth`：cited source file changed at the published locator；packages/web/src/content/docs/mcp-servers.mdx (packages/web/src/content/docs/mcp-servers.mdx:130-163)
- `mcp.transport`：cited source file changed at the published locator；packages/web/src/content/docs/mcp-servers.mdx (packages/web/src/content/docs/mcp-servers.mdx:115-127)；packages/web/src/content/docs/mcp-servers.mdx (packages/web/src/content/docs/mcp-servers.mdx:130-163)
- `mcp.exposure`：cited source file changed at the published locator；packages/web/src/content/docs/mcp-servers.mdx (packages/web/src/content/docs/mcp-servers.mdx:293-394)
- `config.overrides`：cited source file changed at the published locator；packages/web/src/content/docs/config.mdx (packages/web/src/content/docs/config.mdx:32-38)
- `config.diagnostics`：cited source file changed at the published locator；packages/cli/src/commands/commands.ts (packages/cli/src/commands/commands.ts:115-143)
- `providers.models`：cited source file changed at the published locator；packages/web/src/content/docs/providers.mdx (packages/web/src/content/docs/providers.mdx:51-84)
- `providers.forwarding`：cited source file changed at the published locator；packages/web/src/content/docs/config.mdx (packages/web/src/content/docs/config.mdx:377-399)
- `providers.responses`：cited source file changed at the published locator；packages/web/src/content/docs/config.mdx (packages/web/src/content/docs/config.mdx:377-399)
- `agents.entry`：cited source file changed at the published locator；packages/web/src/content/docs/agents.mdx (packages/web/src/content/docs/agents.mdx:142-184)；packages/web/src/content/docs/agents.mdx (packages/web/src/content/docs/agents.mdx:188-216)
- `agents.format`：cited source file changed at the published locator；packages/web/src/content/docs/agents.mdx (packages/web/src/content/docs/agents.mdx:142-184)；packages/web/src/content/docs/agents.mdx (packages/web/src/content/docs/agents.mdx:188-216)
- `agents.invocation`：cited source file changed at the published locator；packages/web/src/content/docs/agents.mdx (packages/web/src/content/docs/agents.mdx:142-184)
- `agents.roles`：cited source file changed at the published locator；packages/web/src/content/docs/agents.mdx (packages/web/src/content/docs/agents.mdx:16-39)
- `transcripts.scope`：cited source file changed at the published locator；packages/core/src/session/compaction.ts (packages/core/src/session/compaction.ts:326-334)；packages/web/src/content/docs/config.mdx (packages/web/src/content/docs/config.mdx:745-764)
- `transcripts.cleanup`：cited source file changed at the published locator；packages/cli/src/commands/commands.ts (packages/cli/src/commands/commands.ts:418-470)
- `transcripts.diagnostics`：cited source file changed at the published locator；packages/cli/src/commands/commands.ts (packages/cli/src/commands/commands.ts:115-146)；packages/cli/src/commands/commands.ts (packages/cli/src/commands/commands.ts:418-470)

## 待处理与独立复核

**审计记录：** `audits/opencode/audit-opencode-155bc8d8-d6f6-4113-bd9e-a1d3212f1c2b.yaml`。**待处理旧审计：** audit-opencode-0f16a4f4-327b-41be-bbbb-d7da9bfdd6c0、audit-opencode-2aa143e4-1b45-4f8f-8bba-c200a6007522、audit-opencode-12691d48-1a45-4b04-bc22-ef7201bd564e、audit-opencode-52ea2a76-9938-44ec-a454-01dfc9e8e3b8、audit-opencode-1a190643-5d32-4b65-930f-ec54bdf330bc、audit-opencode-6b2f4d18-7c05-4e91-a3d6-5f18c02b7e44、audit-opencode-60e50849-c85d-456f-a3dd-90450aee400d。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-opencode-npm` | 1.19.3@sha51 → 1.19.4@sha51 | changed |
| `source-opencode-repo` | e965774fa0e2 → 17b79f4e0c16 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
