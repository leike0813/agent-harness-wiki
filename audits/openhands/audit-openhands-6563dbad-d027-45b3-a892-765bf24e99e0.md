# openhands 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:06:24.647Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 custom_providers、custom_agents 主题的 5 道固定问题。

## 变化的意义与证据边界

3 个 Git 仓库来源变更（169、61、2 个文件）、1 个 npm 来源版本自 1.30.1 前进到 1.33.0、20 个官方文档来源变更。已发布引用落在 openhands-sdk/openhands/sdk/llm/options/chat_options.py 的行定位不再命中：该文件新增 is_openrouter 导入与 openrouter 参数。

packages/openhands/src/... 与 README.md、package.json 的版本与依赖变化（certifi 因 eMudhra CA 不信任而加入）属发布与依赖层；pyproject.toml 的 exclude-newer-package 增补 certifi 同理。

本轮派发 providers 四道题（对应 chat_options 的请求选项）与 agents.roles（对应 ref-openhands-docs-agent-legacy 的摘录失效）。npm 版本前进属纯发布身份变化。

### 派发问题与证据入口

- `providers.forwarding`：cited source file changed at the published locator；openhands-sdk/openhands/sdk/llm/options/chat_options.py (openhands-sdk/openhands/sdk/llm/options/chat_options.py:9-80)
- `providers.metadata`：cited source file changed at the published locator；openhands-sdk/openhands/sdk/llm/options/chat_options.py (openhands-sdk/openhands/sdk/llm/options/chat_options.py:9-80)
- `providers.protocol`：cited source file changed at the published locator；openhands-sdk/openhands/sdk/llm/options/chat_options.py (openhands-sdk/openhands/sdk/llm/options/chat_options.py:9-80)
- `providers.responses`：cited source file changed at the published locator；openhands-sdk/openhands/sdk/llm/options/chat_options.py (openhands-sdk/openhands/sdk/llm/options/chat_options.py:9-80)
- `agents.roles`：published excerpt left the source；ref-openhands-docs-agent-legacy

## 待处理与独立复核

**审计记录：** `audits/openhands/audit-openhands-6563dbad-d027-45b3-a892-765bf24e99e0.yaml`。**待处理旧审计：** audit-openhands-72fdbc68-ec2f-4d17-9267-75b7c46c43f5、audit-openhands-9af885fb-475c-47f5-8fb1-9c7bd64e189e、audit-openhands-e6a9b08b-babb-4a9d-b369-8d5b39acf756、audit-openhands-47261bfb-8a32-463b-a0f2-216d27887ddf。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-openhands-cli-repo` | 0403f1a79a9f → 283c6ac3610f | changed |
| `source-openhands-docs-agent-file-based` | 7840cf3a9502 → 09ac788a653f | changed |
| `source-openhands-docs-agent-plugins` | da6fca8cda96 → 19d4da078dc8 | changed |
| `source-openhands-docs-agent-settings` | f45cd7c0f92b → 73d4a2d523cf | changed |
| `source-openhands-docs-agents` | 816de10f262c → 068c300c40b8 | changed |
| `source-openhands-docs-cli-commands` | 5eda54ed4bb9 → 4a7cdfa5dfc3 | changed |
| `source-openhands-docs-cli-installation` | 692a4bab72b4 → 0854663fe58e | changed |
| `source-openhands-docs-cli-mcp` | c811f8d0a7ee → 868e525008d0 | changed |
| `source-openhands-docs-config-options` | c5ced6d660a9 → d5dbaa8d23ca | changed |
| `source-openhands-docs-custom-llm` | f83d62d1d2e3 → 894e6d14e883 | changed |
| `source-openhands-docs-env-vars` | 41f454244ff6 → e391ce627da8 | changed |
| `source-openhands-docs-hooks` | 29ee27fca490 → 15b6f7664991 | changed |
| `source-openhands-docs-llm-settings` | 0765ce9bbd70 → 7480df50bf8a | changed |
| `source-openhands-docs-mcp-settings` | dc5f30f7dd3b → 6c58556be7c3 | changed |
| `source-openhands-docs-plugins` | 7942b1801850 → f0da57116768 | changed |
| `source-openhands-docs-sdk-hooks` | e57ba534e6b2 → bf56efbb58de | changed |
| `source-openhands-docs-sdk-plugins` | 43dbff347728 → d1057cfc00f0 | changed |
| `source-openhands-docs-sdk-skills` | 7f31b3212702 → 42ba36961dc7 | changed |
| `source-openhands-docs-skills` | d88133a159e2 → 5630939cb455 | changed |
| `source-openhands-docs-skills-path` | 3408c4bd7218 → 7c83e5099ef4 | changed |
| `source-openhands-docs-task-tool` | 7b083d2978ac → 36715754c3b4 | changed |
| `source-openhands-npm` | 1.30.1@sha51 → 1.33.0@sha51 | changed |
| `source-openhands-repo` | 9508e7246825 → fee10e3d2909 | changed |
| `source-openhands-sdk-repo` | b3d93b6caa5b → acd96e6fa424 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
