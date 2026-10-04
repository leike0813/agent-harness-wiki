# Prime Agent CLI 上游审阅报告 · 2026-10-04

## 给维护者的结论

Prime Agent 在本轮基线之后被整体重写了。基线 `e2fb7bfa`（2026-09-16）还是 TypeScript 实现，观察提交 `e78f11f5`（2026-10-03）已经是 Rust 实现：`39bc99a91`「Port Prime Agent to Rust (#2524)」删掉了 `packages/` 下四个 TypeScript 包，换成 `crates/` 下的九个 Rust crate。中间的 208 个提交里还包含一次主动的功能移除——`f54551d99`「remove user extensions (#3189)」拿掉了用户扩展加载机制。

后果不是某几条引用过期，而是 prime-agent 全部七个主题的证据基础被整体替换：236 条引用里，94 条按文件行定位的 39 个源文件在观察提交下一个都不存在，142 条按文档章节定位的引用所锚定的 `packages/coding-agent/docs/`（38 个文档）整个目录已经没有了。

因此本轮没有改写任何章节。既有 7 个章节版本作为对基线提交 `e2fb7bfa` 的陈述仍然成立，它们没有变成错的，只是已经不代表上游现状。重新调查 prime-agent 需要在 Rust 树上重建整套证据基线，这是跨多轮的工作量，不是单轮维护能收尾的。

## 变化的意义与证据边界

### 证据基线整体失效，不是局部过期

逐条核对 236 条引用的定位方式：`file_lines` 类 94 条，落到 39 个去重源文件上（如 `packages/coding-agent/src/core/agent-session.ts`、`packages/ai/src/api-registry.ts`、`packages/coding-agent/src/config.ts`），在观察提交下用 `git cat-file --batch-check` 批量核对，存活数 0。`document_section` 类 142 条，锚定的 `packages/coding-agent/docs/` 38 个文档（`settings.md`、`skills.md`、`mcp-integrations.md`、`custom-provider.md`、`packages.md`、`extensions.md`、`models.md`、`providers.md`、`quickstart.md`、`rlm.md`、`sdk.md`、`usage.md` 等）在观察提交全树中已不存在，观察提交没有任何 `docs/` 目录。README 也从 139 行缩到 124 行，标题只剩 7 个。

这意味着 configuration、custom_agents、custom_providers、hooks、mcp、native_plugins、skills 七个主题的每一道固定问题，其现有引用都无法在新提交上定位。引用能证明的仍然只有基线提交那一份事实。

### 用户扩展机制被上游主动移除，hooks 与 native_plugins 的主题前提消失

`f54551d99`「remove user extensions (#3189)」在重写之后单独落地。`packages/coding-agent/examples/extensions/`（`permission-gate.ts`、`extensions/README.md`）在观察提交中不存在；在 `crates`、`prime-agent-runtime`、`skills` 下检索 `registerTool`、`registerCommand`、`ExtensionContext`、`pi.registerProvider` 全部无命中。hooks 主题的 `hooks-entry`、`hooks-input`、`hooks-output-order` 与 native_plugins 主题的 `plugins-api`、`plugins-discovery-lifecycle` 所描述的用户扩展加载机制，在观察提交里不再提供。

按 harness-maintenance 的规则，固定来源明确说明不提供某项机制时可以写出对应结论——但这里不能就这么写。用户扩展是被移除的旧机制，Rust 树里是否有等价替代、在哪个入口，尚未查证。直接写「不支持」会把一次待查证的迁移说成已确认的结论。

### 仍存活的机制（仅入口存在，未逐条复核）

顶层 `skills/` 目录在观察提交存在，含 13 个技能；MCP 相关模块 `crates/pa-core/src/mcp/`（`catalog_views.rs`、`connection_store.rs`、`login.rs`、`manager_catalog.rs` 等）与 `crates/pa-cli/src/mcp_command.rs` 存在；`settings.json` 在 `crates/pa-cli/src/client_settings.rs` 等文件有命中。这些只是说明重建证据时入口在哪，不构成任何固定问题的答案。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | prime-agent-cli-configuration-v1 | config.sources/overrides/runtime/trust/defaults/migration/diagnostics：待重新调查 | 保留旧版本；证据基线失效，需在 Rust 树重建 |
| custom_agents | prime-agent-cli-custom_agents-v2 | agents.entry/format/roles/invocation/overrides/limits/diagnostics：待重新调查 | 保留旧版本；证据基线失效，需在 Rust 树重建 |
| custom_providers | prime-agent-cli-custom_providers-v2 | providers.entry/auth/protocol/models/metadata/forwarding/responses/diagnostics：待重新调查 | 保留旧版本；证据基线失效，需在 Rust 树重建 |
| hooks | prime-agent-cli-hooks-v2 | hooks.events/entry/input/output/order/conditions/diagnostics：待重新调查 | 保留旧版本；用户扩展机制已被上游移除，待查证替代入口 |
| mcp | prime-agent-cli-mcp-v2 | mcp.entry/definition/transport/auth/lifecycle/capabilities/exposure/diagnostics：待重新调查 | 保留旧版本；证据基线失效，需在 Rust 树重建 |
| native_plugins | prime-agent-cli-native_plugins-v1 | plugins.model/package/install/discovery/api/lifecycle/diagnostics：待重新调查 | 保留旧版本；用户扩展机制已被上游移除，待查证替代入口 |
| skills | prime-agent-cli-skills-v1 | skills.roots/discovery/collision/format/extensions/loading/invocation/conditions/diagnostics：待重新调查 | 保留旧版本；证据基线失效，需在 Rust 树重建 |

**发布：** 仅结案审计，未发布。本轮 `delivery=pr`，未运行 `pnpm ahw publish`、`pnpm chapters:update`，未切换任何发布指针。`registry/chapter-current.yaml` 未改动，prime-agent 七个主题的当前版本选择保持原样。**受管二进制：** 未触发，按契约 `delivery=pr` 轮次不做受管二进制核对，留给 harness-binary。

## 待处理与独立复核

**审计记录：** `audits/prime-agent/audit-prime-agent-a6e29492-9bcd-4168-8ac2-e8cc29e14d35.yaml` **待处理旧审计：** 无（`pending_audit_refs` 为空）。**待复核问题：** 全部 53 道固定问题保持 pending，触发原因是「跨主题关键加载机制发生变化」与「新来源推翻已发布的配置步骤」同时命中——TypeScript 到 Rust 的整体重写加上用户扩展机制移除，改写了 skills、mcp、configuration、hooks、native_plugins 五个主题的加载与配置入口。

本子代理没有原生 subagent 委派入口，无法取得第二个 Agent 的只读独立复核。按 harness-maintenance 第 5 节与 PRD 的维护规则，`review_status` 保持 `pending`，不填写 `reviewed_by` / `reviewed_at`，不发布。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-prime-agent-repo | `e2fb7bfa1372552d81c33e9b3261d6a9cf82d30f` → `e78f11f5409f47ec560fff390b6158470523cb0f` | changed；实际内容有变化，208 个提交，2585 个文件、660547 行新增、437205 行删除 |

扫描身份与实际内容核对：任务输入文件记录的 observed 是 `e3870216`，本轮重新扫描得到 `e78f11f5`，多出 `e22fcd5fb`（#3268）与 `e78f11f54`（#3285）两个提交。按共享执行契约以本轮扫描观察为准。

工具侧缺陷（需维护者关注）：`pnpm sources:workspace open` 返回的 `changed_paths` 共 2585 条、覆盖整棵树含 `vendor/`，不是真实差异。受管工作区是 depth=1 浅克隆，`.git/shallow` 同时把基线提交与观察提交都记为边界提交，二者互不为祖先，`git diff` 因此退化为整树比较（646070 行新增的假差异）。在工作区内执行 `git fetch --deepen=300` 后基线恢复为祖先，才拿到真实差异。后续轮次不应直接采信浅克隆下的 `changed_paths`。

## 验证与差异入口

本轮运行：

```sh
pnpm sources:scan prime-agent
pnpm -s sources:workspace open --source-id source-prime-agent-repo \
  --commit e78f11f5409f47ec560fff390b6158470523cb0f \
  --baseline e2fb7bfa1372552d81c33e9b3261d6a9cf82d30f --owner-pid 2935516
pnpm knowledge:validate
pnpm sources:audit-log
git diff --check
git status --short --untracked-files=all
```

未运行 `pnpm ahw publish`、`pnpm chapters:update`、`pnpm managed:packages`——`delivery=pr` 轮次禁止，且本轮无已完成章节。

查看本轮改动：

```sh
git status --short --untracked-files=all -- knowledge/prime-agent audits/prime-agent
```

本轮只写入 `audits/prime-agent/` 两个文件（审计 YAML 与本报告），`knowledge/prime-agent/` 无改动。`git diff --check` 与全树校验覆盖其他产品；属于其他产品的诊断未作修改。
