# lovable 上游审阅报告 · 2026-11-24

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-11-23T18:02:17.525Z，本轮只有 `source-lovable-docs-app-user-connectors` 一个来源变化（97168480315f → da0b53229080），其余 36 个登记来源 unchanged。变化本身是一行新增的可用 app user connector 表项，不推翻任何已发布配置步骤。

## 变化的意义与证据边界

该来源是 Markdown 原格式，逐行 diff 只有一行新增：

```text
| **Lovable** | Lovable API | [Register an OAuth client](https://docs.lovable.dev/features/oauth-clients.md#register-an-oauth-client) in your Lovable workspace, then follow [Let each user connect their own Lovable account](https://docs.lovable.dev/integrations/lovable-api-connector.md#let-each-user-connect-their-own-lovable-account) |
```

含义：`Available app user connectors` 表新增 **Lovable / Lovable API** 一行——Lovable 自己的 API 也可作为 app user connector，让每位终端用户连接自己的 Lovable 账号；它的 OAuth app 注册不在第三方控制台，而是在 Lovable 工作区注册 OAuth client，随后按 `integrations/lovable-api-connector.md` 的每用户连接说明接入。

证据边界：该行只给出入口与顺序。它链接的 `features/oauth-clients.md` 与 `integrations/lovable-api-connector.md` 都不是登记来源，OAuth client 的注册字段、scope 与每用户接入细节未在本轮验证。原章节关于配额、导出等缺口不受此行影响。

## 受影响与排除的问题

- `providers.auth`：已更新。在 `providers-auth` 小节补充 Lovable API 行的含义、OAuth client 注册位置与随后的每用户连接说明，并引用新快照。
- `providers.entry`：检查后答案不变。定义入口、字段和作用域没有变化；可用 provider 清单本就不在 entry 小节枚举。
- `providers.protocol`、`providers.responses`、`providers.diagnostics`：检查后答案不变。该行未涉及协议、响应、错误或诊断细节。
- `providers.models`、`providers.metadata`、`providers.forwarding`：本轮未派发，也未读相关来源的新内容。

## 固定证据与章节选择

- 原件：`archive/lovable/artifact-lovable-docs-app-user-connectors-da0b5322/raw.md`，`raw_sha256 = extracted_sha256 = da0b5322908075e92cc270542598715597bc3510c8cb1b918c331784a7410df4`。
- 快照：`snapshot-lovable-docs-app-user-connectors-da0b5322`，`requested_url`/`resolved_url` 均为 `https://docs.lovable.dev/integrations/app-user-connectors.md`，`source_fetched_at` 取本轮检查时间 2026-11-23T18:02:14.465Z。
- 引用：`ref-lovable-appuser-lovable-row`，定位 `Available app user connectors` 小节，摘录为该行原文。
- 章节：新建 `lovable-web-custom_providers-v4`（基于当前选中 v2 全文），只改 `providers-auth`；`registry/chapter-current.yaml` 的 `custom_providers` 改选 v4。未采用未选中的 v3 文本，旧 v1/v2/v3 与旧 snapshot/reference 均未改动。

## 待处理与独立复核

**审计记录：** `audits/lovable/audit-lovable-5b29e5a4-104d-4348-b2ca-8fd5b91c366f.yaml`。本轮五道派发问题已完成 triage，`pending_question_ids` 置空并标 `reviewed`。`pending_audit_refs` 中的 12 条旧审计未在本轮派发，保持原样，不因本审计标 reviewed 而视为解决。

本次变化是新增一个可选用的 app user connector，不推翻已发布步骤、无来源冲突、不改变跨主题加载机制，无需独立高影响复核。

## 验证与差异入口

作者自检：逐行 diff 冻结原件，确认只有一行新增；摘录与归档原件逐字匹配；章节相对 v2 的 diff 只有 edition_id、`providers-auth` 引用列表与新增段落。`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-1/candidates/lovable` 通过。
