# Crush 上游审阅报告 · 2026-10-14

## 给维护者的结论

Crush 仓库本轮只有一个提交 `d6edc3222231a0177b88d073733413578c9a1e01`（`Merge pull request #3924 from charmbracelet/workspace-prompts`），标题写得很直白：`server: scope permission/question prompts to the current session`。它做的是在客户端/服务端模式下，按客户端当前正在查看的会话给 SSE 事件流加一层过滤，并在客户端切到某个会话时把该会话仍然挂起的权限请求/提问重新投递一次。

按本轮派发的 configuration 固定问题（`config.sources`、`config.overrides`、`config.trust`）逐题核查后，三个问题的已发布答案都没有变化：全部 24 个改动文件里没有配置读取、配置文件发现、配置目录或工作区文件加载路径的任何改动，`internal/config/**`、`internal/shellconfig/**`、`internal/skills/**`、`docs/**` 与 `schema.json` 的 diff 都是空的。因此本轮不新建章节 edition、不新增或改写 reference、不新增版本映射，`registry/chapter-current.yaml` 保持指向 `crush-cli-configuration-v2`。

需要维护者知道的两点风险：第一，“workspace prompts”这个 PR 分支名容易被读成“新增工作区提示词文件”，实际不是——它新增的是同名事件在会话维度上的投递规则，没有任何新的提示词文件被发现或读取；第二，SSE 过滤对“从未上报过当前会话”的客户端采用 fail-open（收全部事件），这属于 server/API 行为，而 catalog 目前只给 Crush 登记了 `cli` 一个 surface，等将来登记 server surface 时需要单独评估，本轮不据此推断任何配置口径。

## 变化的意义与证据边界

### 唯一与已登记证据重合的改动：internal/permission/permission.go（+29 / -0）

这是 24 个文件里唯一被本产品章节当作证据引用的文件。逐行 diff（基线 `c446d3f0ddf59089ff43a617dd4f3ee233f01892`）显示它只做两件事：

1. 给 `PermissionNotification` 增加 `SessionID string \`json:"session_id"\``（第 49 行），并在 `resolve()`（第 145-146 行）与 `Request()` 的四处 `notificationBroker.Publish`（第 204、216、226、264 行）带上会话 ID。
2. 在 `Service` 接口（第 82-86 行）新增只读方法 `ActiveRequest() (PermissionRequest, bool)`，实现在第 291-308 行：先取 `activeRequest`，再用 `pendingRequests.Get(active.ID)` 判断这个请求是否还能被 `Grant`/`Deny` 解析。

`Request()` 的放行判定顺序（`skip` → `allowedTools` 命中 → `hookApproved` → `autoApprove` → `AutoApproveSession` → `autoApproveTools`）逐字未改，`PermissionRequest` 结构本身早就带有 `SessionID`。也就是说 `--yolo`、`permissions allow` / `deny`、`PreToolUse` 预批准这些已发布的跳过/允许机制没有任何语义变化。

引用定位方面：`ref-crush-code-permission-request`（`internal/permission/permission.go` 181-240）与 `ref-crush-code-permission-service`（290-310）虽然指向被改动的文件，但它们的 `snapshot_id` 是 `snapshot-crush-repo`（commit `69c65c3d5be0a388d62047feb55d88b9bad7f1b2`），行号在各自固定快照上仍然成立，无需改写；而且这两条引用只被 hooks 与 custom_agents 章节引用——configuration 章节 `config-merge` 引用的权限证据是 `internal/shellconfig/permissions.go`（`ref-crush-code-permissions-builtin`），该文件本次未改动。

### 逐题结论

| 问题 | 结论 | 依据 |
| --- | --- | --- |
| `config.sources` | 不受影响 | `internal/config/**` 与 `internal/shellconfig/**` diff 为空；来源发现、项目边界（`git rev-parse --show-toplevel`）、候选顺序反转后“后者优先”的规则未变；无新增配置目录或文件名模式。 |
| `config.overrides` | 不受影响 | JSON 深度合并（`go-jsons`）、`crushrc` 内建命令按脚本顺序写入构建器、`option reset` / `remove` 的作用域、`permissions allow` → `allowed_tools` 与 `permissions deny` → `options.disabled_tools` 的追加语义均逐字未改。 |
| `config.trust` | 不受影响 | `crushrc` 仍以内嵌 POSIX 解释器的完整 shell 语义执行，JSON 选定字符串字段仍做 `$VAR` / `$(cmd)` 展开；本提交既没有新增 trust 相关配置键或校验分支，也没有改变任何配置读取前的授权判定。 |

### 已检查并排除的差异文件

- 13 个 `*_test.go`（`bash_test.go`、`multiedit_test.go`、`view_test.go`、`backend_test.go`、`prompts_test.go`、`permission_test.go`、`question_test.go`、`e2e_test.go`、`events_filter_test.go`、`sessions_isbusy_test.go`、`client_workspace_test.go` 等）：只断言新行为，不构成用户可依赖的配置机制。
- `internal/ui/model/session.go`：只改 `reportCurrentSession` 的注释，说明上报现在会限定事件流；按派发范围显式排除。
- `internal/server/sessions_isbusy_test.go`：sessions isbusy 的回归测试；按派发范围显式排除。
- `.github/cla-signatures.json`、`.github/workflows/release.yml`：仓库治理与发布流程。
- `internal/backend/backend.go`、`internal/backend/events.go`、`internal/workspace/client_workspace.go`、`internal/server/{endpoints,events,proto}.go`、`internal/proto/{permission,proto}.go`、`internal/question/question.go`：客户端/服务端 SSE 按会话过滤、pending 提示重发、`RootSessionID` 父链解析（上限 `maxSessionAncestryDepth = 4`）。这些是 server/API 行为，且不对应任何配置键、路径或加载顺序；Crush 只登记了 `cli` 一个 surface，按范围不纳入本轮 configuration 结论。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `crush-cli-configuration-v2` | config.sources：answered（不变）／config.overrides：answered（不变）／config.trust：partial（不变） | 保留旧版本；本轮无机制变化，不新建 edition |

**发布：** 仅结案审计，无章节发布。**受管二进制：** 本轮为 worker／`delivery=pr`，未执行 harness-binary。

## 待处理与独立复核

**审计记录：** `audits/crush/audit-crush-c605cca6-663b-42e6-aa68-24b9b3ed29eb.yaml`（定向模式手工审计，基于巡检 `checks.json` 的观察）。**待处理旧审计：** 无（`pending_audit_refs` 为空）。

**待复核问题：** 本轮没有改变任何已发布机制，因此不触发高影响独立复核。`review_status` 维持 `pending`，原因是 `pending_question_ids` 里仍有未派发完成的问题：`config.runtime`、`config.defaults`、`config.migration`、`config.diagnostics`，以及 `custom_agents`／`custom_providers`／`hooks`／`mcp`／`native_plugins`／`skills`／`local_transcripts` 七个主题的固定问题。这些不在本轮派发范围，不重开也不结案。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-crush-repo`（https://github.com/charmbracelet/crush.git） | `c446d3f0ddf59089ff43a617dd4f3ee233f01892` → `d6edc3222231a0177b88d073733413578c9a1e01` | changed；单提交 merge PR #3924，24 个文件（+1162 / -41）。内容变化仅限会话级提示投递，无配置机制变化。读取自固定来源工作区 `ws-d6edc3222231-e90b7699-7de1-48a8-af86-cf4fa3c5592a`，未重新扫描。 |
| `source-crush-npm` | `0.98.1@sha512-TWjk5My+…KPRGT2SQ8g==` → 同上 | unchanged；仅发布身份，无版本或 integrity 变化。 |

## 验证与差异入口

- `pnpm maintenance:candidates check --candidate /tmp/ahw-monitor-fa60cb88-ac51-446f-83dd-ae9a5d0a45e2-QlS6z6/batch-2/candidates/crush`：通过（见 worker 返回的 `audit` 字段）。
- 本轮未运行 `sources:scan`、`chapters:update`、`publish`、`managed:packages` 与合并计划；聚合校验（`knowledge:validate`、`sources:audit-log`、`git diff --check`、`pnpm verify`）由协调者在集成后运行。
- 本候选相对基线只改了一个文件：`audits/crush/audit-crush-c605cca6-663b-42e6-aa68-24b9b3ed29eb.yaml`（以及新增同名 `.md`）。查看方式：
  `diff -ru /tmp/ahw-monitor-fa60cb88-ac51-446f-83dd-ae9a5d0a45e2-QlS6z6/batch-2/baseline/crush /tmp/ahw-monitor-fa60cb88-ac51-446f-83dd-ae9a5d0a45e2-QlS6z6/batch-2/candidates/crush`
