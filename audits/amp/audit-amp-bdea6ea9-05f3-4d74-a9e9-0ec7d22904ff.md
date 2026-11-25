# amp 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:03:57.654Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 custom_agents、custom_providers 主题的 6 道固定问题。

## 变化的意义与证据边界

13 个官方文档来源变更、1 个 npm 来源版本自 0.0.1792670445-ge8d5b3 前进到 0.0.1792857622-ge1551c（纯发布身份变化，未下载或比较包内容）。

已发布引用 ref-amp-dial-preset-follow、ref-amp-dial-preset-role-override、ref-amp-dial-tune-subagents、ref-amp-dial-chatgpt-preset、ref-amp-dial-chatgpt-signin、ref-amp-dial-system-models 的摘录已不在新页面中：这些摘录在各自快照字节中存在、在本轮新字节中消失，属本轮可归因的引用失效，不是早于本轮的漂移。

受影响固定问题限 custom_agents 的 agents.roles/agents.limits/agents.overrides 与 custom_providers 的 providers.auth/providers.metadata/providers.models；其余主题的引用本轮仍命中。

source-amp-manual 页面正文新增 Integrations 与 Self-Hosted 两个入口，但该页是整站导航壳，其字节每次请求都带不同 nonce，不作为证据入口；其新增内容需由 worker 在具体机制页面确认。

### 派发问题与证据入口

- `agents.limits`：published excerpt left the source；ref-amp-dial-preset-follow；ref-amp-dial-preset-role-override
- `agents.overrides`：published excerpt left the source；ref-amp-dial-preset-follow；ref-amp-dial-preset-role-override
- `agents.roles`：published excerpt left the source；ref-amp-dial-preset-follow；ref-amp-dial-tune-subagents
- `providers.auth`：published excerpt left the source；ref-amp-dial-chatgpt-preset；ref-amp-dial-chatgpt-signin；ref-amp-dial-preset-follow；ref-amp-dial-preset-role-override
- `providers.metadata`：published excerpt left the source；ref-amp-dial-system-models
- `providers.models`：published excerpt left the source；ref-amp-dial-system-models

## 待处理与独立复核

**审计记录：** `audits/amp/audit-amp-bdea6ea9-05f3-4d74-a9e9-0ec7d22904ff.yaml`。**待处理旧审计：** audit-amp-2b69fca7-dcf4-40ed-8ff6-b789e1663779、audit-amp-20261006t134000z、audit-amp-2ef3f03a-a1b9-41b8-9418-a16b119f8e7b、audit-amp-5d3bb590-619d-4cac-bcb0-e9bbf8087b70、audit-amp-03817bfe-6995-4e53-8aac-1f22282e70fc、audit-amp-4449c23b-bea8-4b2a-a49f-e74e5cf364da、audit-amp-428aa07e-ea91-48d7-95e0-e1c8f0167232、audit-amp-3fa6440d-37f9-4ec7-97fa-77b808081120、audit-amp-4e705fb1-01a6-413f-b206-1c7fa00fdcef、audit-amp-9c59cf63-1c9f-43df-82a8-86a8557e8800。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-amp-manual` | b93d2f52a48d → 941fd058f997 | changed |
| `source-amp-docs-index` | bd93012d6ae6 → a33da2d9e122 | changed |
| `source-amp-docs-cli-settings` | 5dfbab2b2a8e → 8b4c56f73a9e | changed |
| `source-amp-docs-cli-streaming-json` | b6eb562b3923 → 573c5767cc41 | changed |
| `source-amp-docs-cli-runners` | b77e6d22336f → ad6b6d65281c | changed |
| `source-amp-docs-cli-remote-control` | 8655e8736980 → 32e79cc3bc72 | changed |
| `source-amp-docs-customize-mcp` | 05935b2a3968 → f23bc47676b6 | changed |
| `source-amp-docs-customize-plugins` | 298b5e8b9588 → 44f87fb222ac | changed |
| `source-amp-docs-plugin-api` | fc8c058d5e00 → fa7ef73a4aff | changed |
| `source-amp-docs-the-dial` | 8b28fb76dec4 → e3af2b062276 | changed |
| `source-amp-docs-models-and-subagents` | 5a01ebff0aeb → a44be5f9025a | changed |
| `source-amp-docs-tools` | 3157b7a4f040 → c41b71a94edd | changed |
| `source-amp-docs-enterprise-mcp-registry` | fd6e6e5a55d4 → 45928dc6677f | changed |
| `source-amp-npm` | 0.0.17926704 → 0.0.17928576 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
