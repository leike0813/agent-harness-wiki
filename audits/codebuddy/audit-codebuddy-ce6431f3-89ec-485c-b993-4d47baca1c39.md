# CodeBuddy 上游审阅报告 · 2026-10-09（run-20261009t020000z）

## 给维护者的结论

文档仓库从 `a70dea0b…` 前进到 `ba5e2ccf…`，单提交 8 个文件。这轮有两条实质变化：

1. **`docs/env-vars.md` 新增 4 个环境变量**。`configuration` 升到 v3，把四个开关按机制归入「默认值、开关与迁移」，其中 `CODEBUDDY_DISABLE_SENSITIVE_PROTECTION` 额外补进「优先级与合并」与「信任与权限限制」两节——它明确给出**组织层（企业托管策略）压过进程环境变量**这条第三层优先级，是本轮唯一改写优先级叙述的证据。
2. **`docs/function-hooks.md` 重命名为 `docs/mods.md`**（625 行 → 741 行）。这一层从「Function Hooks」改称 **Mods**，并且**撤销了启用闸门**：旧的 `CBC_ENABLE_FUNCTION_HOOKS` / `CLAUDE_CODE_ENABLE_FUNCTION_HOOKS` 环境变量小节整段删除，文档头部状态行与「快速开始」两处写明「默认开启，不需要设置任何环境变量」。这推翻了已发布 `hooks` v1/v2 里「Function Hooks 需显式 opt-in」的读者步骤，属维护契约第 5 节的高影响情形，候选保留 v3 但**不切换 `chapter-current` 指针**，待独立复核。

`docs/models.md` 新增 37 行（`api` 取 `openai-responses` 与对应配置示例）属 `custom_providers` 主题，不在本轮任务范围（configuration、hooks）内，记入 audit 不改写 providers 章节。`CHANGELOG.md`、`docs/release-notes/*`、`docs/codebuddy_code_docs_map.md` 按任务排除项只作线索。

## 重命名与已登记引用的逐条处置

任务要求对指向旧路径的登记引用逐条判断。候选里 locator 指向 `docs/function-hooks.md` 的登记引用共三条，全部是 `document_section` 定位（旧快照 `snapshot-codebuddy-docs` @ `47ec6f1` 的章节标题）：

| 引用 | 定位 | 使用方 | 处置 | 理由 |
| --- | --- | --- | --- | --- |
| `ref-codebuddy-funchooks-quickstart` | 旧快照「快速开始」 | `hooks` v1、v2 | **原样保留** | 只被已发布 edition 使用，其快照固定在 `47ec6f1` 的旧路径上，内容逐字未变，继续为那两版服务 |
| `ref-codebuddy-funchooks-mod` | 旧快照「Mod = plugin.json + register.ts」 | `native_plugins` v1 | **原样保留** | 同上；`native_plugins` 本轮不在任务范围，其 Mod 形态与 tier 链描述在新文件里也未变 |
| `ref-codebuddy-funchooks-tier` | 旧快照「Tier 与 `next`」 | `native_plugins` v1 | **原样保留** | 同上 |

三条引用一个字都没改：改写它们会同时改动已发布 edition 所依赖的证据身份。**新引用一律指向 `mods.md`**，固定在 `ba5e2cc` 的新快照上：`ref-codebuddy-mods-status`、`-quickstart`、`-loading`、`-compat`、`-host-bindings`（`docs/mods.md`）与 `ref-codebuddy-env-task-reminders`、`-responses-store`、`-sensitive-protection`、`-otel-raw-bodies`（`docs/env-vars.md`）。共 2 个 artifact + 2 个 snapshot，全部只记 commit、repo 相对 file 与 `content_sha256`（由固定工作区程序化计算），无临时路径、无源码副本。

值得单独记一笔：`ref-codebuddy-funchooks-quickstart` 的摘录现在**与上游现状相反**（它写着要 `export CBC_ENABLE_FUNCTION_HOOKS=1`，而新文档说默认开启）。它作为历史 edition 的证据继续成立，但任何读者检索到它都会看到过期步骤——这正是不能就地改它的代价，也是 `hooks` 必须升版并等复核的原因。

## 四个新环境变量

| 变量 | 机制 | 默认 | 归入小节 |
| --- | --- | --- | --- |
| `CODEBUDDY_DISABLE_TASK_REMINDERS` | 设 `1` 关掉长任务运行中的任务列表提醒（含恢复会话已保存的提醒）；标准模式直连任务工具、PTC 模式 REPL 沙箱内 `TaskCreate`/`TaskUpdate`（或旧版 `TodoWrite`）长期未更新时给隐藏提醒，不改任务状态、不强制顺序；Minimal 与未开放任务工具的沙箱不触发 | 开启 | `config-defaults` |
| `CODEBUDDY_RESPONSES_STORE_ENABLED` | 设 `1`/`true`/`yes`/`on` 强制开启 `ResponsesStore`，把 `api: "openai-responses"` 请求的 `store` 由默认 `false` 改为 `true` | 关闭 | `config-defaults` |
| `CODEBUDDY_DISABLE_SENSITIVE_PROTECTION` | 设 `1`/`true`/`yes`/`on` 关闭本进程敏感数据防护，效果同 `settings.json` 的 `sensitiveProtection.enabled: false` 但**不改共享设置文件**；**企业托管策略下发的值仍然优先** | 开启防护 | `config-defaults` + `config-overrides` + `config-trust` |
| `OTEL_LOG_RAW_API_BODIES` | `file:<dir>` 把完整模型 API 请求/响应体写入本地目录（`*.request.json` / `*.response.json` + `index.jsonl`），其他真值记为 span events（60KB 截断） | 关闭 | `config-defaults` |

前三个的 `wb --features '{"rollout":true}'` 转交路径按原文记录，未做推断。`CODEBUDDY_DISABLE_SENSITIVE_PROTECTION` 是本轮唯一给出**文件配置与环境变量之外**的组织层优先级的条目，因此同时进入 `config-overrides`（优先级链）与 `config-trust`（组织策略）两节，而不是只当普通开关。

`OTEL_LOG_RAW_API_BODIES` 在同轮的 `docs/monitoring.md` 里从「预留，暂未实现」改为已实现并给出两种形态。`monitoring.md` 不是任何登记章节的来源文件，故只作为该变量行为的旁证记入 audit，不单独成条引用。

## Mods 变更对已发布 hooks 章节的推翻

`docs/mods.md` 相对旧文件有三处语义变化：

- **启用闸门撤销**（第 8 行状态行、第 246–248 行「快速开始」、第 452–462 行 CLI 参数三处独立表述）：「默认开启，不需要设置任何环境变量」「无需额外开关或环境变量」。对 `docs/` 全库检索 `ENABLE_FUNCTION_HOOKS` 无命中——按来源只能说这两个变量在本修订中不存在，不能断言它们「已废弃」或「仍可用」。
- **能力授权翻转**：`$.http.fetch` / `$.process.run` 在 core 层 `HostBindings.allowHttp`/`allowProcess` 默认关闭，但 CodeBuddy CLI 宿主与官方 Claude Code CLI 对齐、**默认开启**，管理员可用 `CBC_MODS_ALLOW_HTTP=0` / `CBC_MODS_ALLOW_PROCESS=0` 逐项关闭（每次调用时读取）。这是本修订中唯一还起作用的 Mods 侧环境变量，也是「整层是否装载」与「能力是否授权」被拆成两件事的地方。
- **通道分流规则**：`--plugin-dir` 目录的 `hooks/hooks.json` 里有 `modules` 才走 Mods 通道，否则走老通道；每一个老 `HookEvent` 枚举值对应一个 `classic.<HookEvent>` 中间件事件，`decision:'block'` / exit 2 被翻译成 `{ deny }`。落在 `hooks.events`。

章节升版：`codebuddy-cli-hooks-v3`（`hooks.events` / `hooks.entry` / `hooks.conditions`）与 `codebuddy-cli-configuration-v3`。v1、v2 逐字未动。`native_plugins` v1 本轮不改写——它的 Mod 形态与 tier 链在新文档中未变，且不在任务范围。

## 待处理与独立复核

**审计记录：** [audit-codebuddy-ce6431f3-89ec-485c-b993-4d47baca1c39.yaml](audit-codebuddy-ce6431f3-89ec-485c-b993-4d47baca1c39.yaml)，同名报告即本文件。

**需独立复核的问题：`hooks.conditions`。** 依据是维护契约第 5 节的「新证据推翻已发布配置步骤」——`hooks` v1/v2 明确写着 Function Hooks 需 `CBC_ENABLE_FUNCTION_HOOKS=1` 或别名 opt-in，新来源两处独立写明默认开启且该小节整段删除。复核范围应限于：证据定位是否支持「该变量在本修订中不存在」这一表述边界、是否需要区分「文档删除」与「功能废弃」、以及 `chapter-current` 指针切换时机。本 worker 不自审替代复核，也未运行 `maintenance:candidates plan` 或 publish。

**指针处理：** `registry/chapter-current.yaml` 的 `hooks` 保持指向 `codebuddy-cli-hooks-v2`，`configuration` 已改指 `codebuddy-cli-configuration-v3`。复核通过后由父进程把 `hooks` 改指 v3。`pending_question_ids` 只保留 `hooks.conditions`。

**审计状态说明：** `review_status` 保持 `pending`，原因是它通过 `pending_audit_refs` 引用两份未结案的旧审计（`audit-codebuddy-15aad900…`、`audit-codebuddy-20261006t134000z`），且本轮自身有上述高影响复核未完成，按约定不写 `reviewed_by` / `reviewed_at`。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-codebuddy-docs` | `a70dea0b…` → `ba5e2ccf…` | changed；单提交 8 个文件：`CHANGELOG.md`、`docs/codebuddy_code_docs_map.md`、`docs/env-vars.md`（+4）、`docs/models.md`（+37）、`docs/function-hooks.md` → `docs/mods.md`（261+/145-）、`docs/monitoring.md`、`docs/release-notes/README.md`、`docs/release-notes/v2.162.0.md` |
| `source-codebuddy-site` | `6041efd9…` → `6041efd9…` | unchanged |
| `source-codebuddy-npm` | `2.161.4@sha512-JBoVzj8r…` → `2.162.0@sha512-kIygqpaG…` | changed；仅记录身份，未取包字节，未新增软件版本映射 |

## 验证与差异入口

`pnpm maintenance:candidates check --candidate <candidate-root>` 通过（退出码 0，返回 `harness_id: codebuddy` 与完整文件清单）。该命令内部同时执行章节校验与审计台账校验，本轮新增的 2 个章节版本、9 条引用、2 个快照、2 个 artifact 与改写后的审计记录均零诊断。首次运行报出 `CHAPTER_UNSAFE_MARKUP`（正文里的 `file:<dir>`、`$.<noun>.<op>()`、`--plugin-dir <dir>`、`classic.<HookEvent>` 被判为活动 HTML），已改写为不含尖括号的等义表述后复跑通过——引用摘录里的原文尖括号不受影响。

固定工作区内的只读核对：`docs/env-vars.md:95/104/105/252`、`docs/mods.md:6-8/246-248/452-462/618/682-692` 均已逐行确认；`grep -rn 'ENABLE_FUNCTION_HOOKS' docs/ CHANGELOG.md` 在新修订下零命中；`grep -rn 'CBC_MODS' docs/` 只在 `mods.md` 的第 610、611、618 三行命中。旧文件已取出到临时路径逐节 diff，确认事件家族计数（Middleware 38 / Op 54）与 `classic.` 桥接段落未变，变的只是命名与启用条件。未复制任何源码或文档原件进候选。

未运行项及原因：`pnpm knowledge:validate`、`pnpm sources:audit-log`、`pnpm verify`、`maintenance:candidates plan`、`publish` 属父进程集成后的聚合闸门与发布动作，本 worker 只编辑隔离候选。

本轮使用的固定源码工作区：`ws-ba5e2ccf3ab3-a451c13b-2b84-4c16-a8fe-136fdf48d9fd`（`source-codebuddy-docs` @ `ba5e2ccf3ab3de4e637da1b8fc2b1998e7989db7`），由父进程打开；本 worker 未关闭、未新建工作区，也未重扫来源。

本轮改动文件：

```text
knowledge/codebuddy/chapters/codebuddy-cli-hooks-v3.md           （新增）
knowledge/codebuddy/chapters/codebuddy-cli-configuration-v3.md   （新增）
knowledge/codebuddy/references/ref-codebuddy-mods-*.yaml          （新增 5 个）
knowledge/codebuddy/references/ref-codebuddy-env-*.yaml           （新增 4 个）
knowledge/codebuddy/artifacts/artifact-codebuddy-docs-{mods,env-vars}-20261009.yaml  （新增 2 个）
knowledge/codebuddy/snapshots/snapshot-codebuddy-docs-{mods,env-vars}-20261009.yaml （新增 2 个）
registry/chapter-current.yaml                                     （configuration 改指 v3）
audits/codebuddy/audit-codebuddy-ce6431f3-….yaml                 （改写）
audits/codebuddy/audit-codebuddy-ce6431f3-….md                   （新增）
```