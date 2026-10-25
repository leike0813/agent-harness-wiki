# goose 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮上游确实换了机制，不只是数据刷新：子代理的调度逻辑搬进了 GDK crate `goose-agent`，`delegate` 新增续跑（`resume`），宿主首次出现并发上限，非平台扩展的工具结果会被剥掉委派元数据；自定义 provider 的模型条目新增两个缓存价字段并接入定价合并，文档同步新增「Custom Model Prices」一节。据此新建了 `goose-cli-custom_agents-v4` 与 `goose-cli-custom_providers-v4` 两个完整版本，把候选的 `registry/chapter-current.yaml` 指向它们；旧版 v3 全部保留、未原地改写。

skills 主题的 9 道固定问题本轮逐行核对后结案：发现与参数替换搬到 `goose-agent::skills` 属等价搬迁，目录顺序、`SKILL.md` 精确匹配、符号链接去环、先到先得去重、`builtin://skills/NAME` 追加次序都没变，因此没有新建 skills 版本。

需要维护者知道的三件事。其一，本轮审计的 `review_status` 仍是 `pending`，两个更早的审计（`audit-goose-703d225e-…`、`audit-goose-b3b8ec85-…`）仍在 `pending_audit_refs` 里，**本轮没有关闭它们**。其二，`agents-overrides` 小节里 max turns 默认值、并发上限、扩展继承顺序的句子被一并更正（旧文写的「默认 25」「没有并发配置项」「省略=继承全部」已不成立），但 `agents.overrides`、`agents.limits` 不在本轮固定问题内，问题状态与答案引用未动，是否另行派发由 parent 决定。其三，本轮结论全部钉在提交 `6835dd45` 上；npm 只从 1.54.0 升到 1.55.0，没有据此新建任何软件版本映射，因为仓库提交不能证明发布版行为。

## 变化的意义与证据边界

### 子代理编排迁入 GDK：调度归属、续跑与并发上限

子代理不再由 `crates/goose` 内部逐段驱动，而是交给 GDK crate `goose-agent`。`SubagentOperation` 持有一个 `SubagentRunner`，按父会话里出现过的委派记录算出待执行子代理，每一步执行表示为 `SubagentUpdate`：`ToParent(Message)` 转发消息、`Finished(SubagentOutcome)` 结束，结局只有 `Completed` / `Failed` / `Cancelled` 三种；goose CLI 侧由 `ops_subagent.rs` 的 `ForegroundSubagentRunner` 实现三个入口。

可见行为随之扩展。`delegate` 多了 `resume` 参数，只能指向本会话内尚未完成的子代理，否则报 `… does not belong to this session` / `… already completed`；续跑不新开会话，只往那个会话追加一条用户消息，省略 `instructions` 时用固定文本 `Continue the task from where you left off.`。并行度首次有宿主侧上限：`GOOSE_MAX_CONCURRENT_SUBAGENTS`，默认 5、按父会话计、超出的排队。max turns 的解析也合并成一个函数：`params.max_turns` → recipe `settings.max_turns` → `GOOSE_SUBAGENT_MAX_TURNS`（环境变量与配置文件同层）→ `default_max_turns()`（即 `GOOSE_MAX_TURNS`，未设则 1000），旧的 `DEFAULT_SUBAGENT_MAX_TURNS = 25` 常量不再存在。扩展选择改用 `resolve_extensions_for_new_session`：子 recipe 自己声明了 `extensions` 就用它的列表，否则才继承父会话。

影响 `agents.roles` 与 `agents.diagnostics`（两者候选内均为 `partial`），并顺带更正了 `agents-overrides` 小节的取值表。证据边界在这里：`delegate`/recipe/环境变量的取值顺序有源码行区间支撑，但 **5 分钟子代理超时的实现位置仍未确立**（源码侧没有 timeout 相关代码，只有文档给出该数字）；「子代理工具调用在 CLI 实时显示」仍只有文档证据。

### 委派标记只来自平台扩展，未完成结局不再静默

子代理请求靠父会话工具结果里的元数据识别——`foreground_subagent: true` 加 `subagent_session_id`。本轮在扩展工具返回处加了清洗：非平台扩展的结果会先被剥掉 `ExtensionMutation` 与 `subagent_session_id`，平台扩展不受影响。因此 MCP server 无法伪造一次委派，只有 `summon` 这类平台扩展能产生该标记。这是本轮「原生实现 / 扩展提供」分界的源码级依据。

用户可见的措辞也变了，三条都属于诊断信号而非内部重构：开始时父会话先收到内联通知 `Running subagent ID (任务摘要)`（摘要取子会话 recipe 的 `prompt`，折成单行并截断到 160 字符）；结束时按结局再发一条——`Completed` 为 `Subagent ID completed`（仍有待交付子代理或被取消时附可读输出），`Failed` 为 `Subagent ID failed: 原因首行`，`Cancelled` 不发通知。结账消息由 GDK 写成对用户不可见、对模型可见的用户消息，元数据记 `delivered: ID` 或 `cancelled: [ID…]`；取消文案改为 `Subagent ID was cancelled before it finished.`，v3 记录的「…and will not run again」已不存在。流在没有 `Finished` 的情况下结束（如 runner 提前断开）记为失败，原因 `it ended without an outcome`；子代理任务 panic 也报告为 `Failed`。

这些字符串只证明「宿主会这样记账与提示」，不能证明具体终端渲染样式——渲染侧代码不在本轮签出范围。

### 缓存价字段与声明式定价的合并规则

`ModelInfo` 新增 `cache_read_token_cost` / `cache_write_token_cost`，单位「美元/令牌」，均为 `Option`，serde `default` 且为空不序列化；`pricing_from_model_info` 把它们乘 `1e6` 转成每百万令牌价。生效规则同时来自文档与源码：输入价与输出价必须同时存在才启用计价，缺一项整体回落到目录价；缓存价独立可选，写 `0` 也算显式声明；输入与输出都写 `0` 时视为免费，不再补回目录缓存价；合并时声明价优先、只补缺失。优先级为 provider 自报成本 → 配置文件声明价 → canonical 目录 → 内置声明式定义，后两者只补缺；配置文件里的价格实时读取、不缓存。`currency` 只影响显示符号（`USD`/空 → `$`，`EUR`/`GBP`/`JPY` 各有映射，其它原样输出）。

影响 `providers.models`、`providers.metadata`（候选内均为 `answered`），章节另在诊断小节补了成本回退的两条警告串与 `CostSource`（`ProviderReported` / `Estimated`）线索。证据边界：两个字段、倍数换算、合并分支都有行区间；但 `crates/goose-providers` 的请求构造、重试与错误映射仍未逐一核对，`providers.diagnostics` 的既有机制（错误串、`providers()`、`goose info --check`）本轮未变。

### 已核对但排除的变化

`crates/goose-provider-types/src/canonical/data/*.json` 只是目录数据刷新（新模型、`provider model_count`、按 id 重排），属数据不属机制；`openrouter.rs` 的内置 provider 模型发现缓存属内置 provider，不在自定义主题现状范围内；`agent.rs` 的自动 thinking effort（`GOOSE_AUTO_EFFORT_ENABLED`、`TYPESAFE_API_KEY`）与 provider session resume 属代理循环与 `providers.responses`；`prompt_manager.rs` 删掉的 `enable_subagents` 字段未被模板引用；`ops_auto_effort.rs`、ACP/UI/打包与 CI 变更与三个主题无关。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_agents | `goose-cli-custom_agents-v4` | `agents.roles`：partial；`agents.diagnostics`：partial | 已进入新发布（v1–v3 保留） |
| custom_providers | `goose-cli-custom_providers-v4` | `providers.models`：answered；`providers.metadata`：answered | 已进入新发布（v1–v3 保留） |
| skills | `goose-cli-skills-v1`（未改动） | 本轮 9 道固定问题：全部结案 | 保留旧版本：等价搬迁，无读者可见变化 |

**发布：** 候选内已改 `registry/chapter-current.yaml` 的两个指针（`custom_agents` → v4、`custom_providers` → v4），基线中对应的是 v3。本轮候选**不含 release 记录**，因此 staging 构建与验收结果无法从候选判断，切换的最终确认留给合并阶段。**受管二进制：** 未触发。`registry/harnesses/goose.yaml` 只列 `source-goose-repo` 与 `source-goose-npm` 两个来源、没有 binary 段，且与基线逐字节一致；npm 1.55.0 只登记版本身份，未接入受管二进制。

本次新增证据：22 条 `git_source_file` 引用（`*-20261022.yaml`）、12 份 snapshot、12 份 artifact，全部绑定提交 `6835dd45` 并记录仓库相对路径与 `content_sha256`，无临时路径；多条引用指向同一文件的不同行区间时共用一份快照。

## 待处理与独立复核

**审计记录：** `audits/goose/audit-goose-0b2f073c-eabc-4c2e-8faa-876cf3eed0e3.yaml`（`status: changed`，`review_status: pending`，`pending_question_ids: []`）。**待处理旧审计：** `audit-goose-703d225e-c7ce-402d-8f1e-d6a2419b387e` 与 `audit-goose-b3b8ec85-01cd-4143-9159-9871989fd17b`，本轮保持原样，**未关闭**，其阻塞不因本轮结论而解除。**待复核问题：** 本轮 `pending_question_ids` 为空，没有单独挂起的固定问题；但两个 v4 章节整体仍待独立复核，尤其「子代理执行宿主与调度归属改变」「委派元数据清洗」「定价合并把声明价置于目录价之上」三处推翻了已发布判断，按契约不由本 worker 自审替代。

未解决缺口（不阻塞本轮结论）：子代理 5 分钟超时的实现位置仍未确立；agent 文件解析失败、重名与权限拒绝的细粒度诊断输出未记录；CLI 侧「子代理工具调用实时显示」仍只有文档证据；`crates/goose-providers` 的请求构造、重试与错误映射未核对。`agents.overrides`、`agents.limits` 的正文更正未配套调整这两个问题的状态与答案引用，留待 parent 判断。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-goose-repo`（https://github.com/block/goose，`refs/heads/main`） | `9686d674000a5fbb8139214863289e4820714771` → `6835dd45a21a701b017abe38aa4204e18fed9213` | changed：217 个变更路径。机制变化集中在 `crates/goose-agent/src/subagent/`（新增 `SubagentOperation`/`SubagentRunner`/`SubagentUpdate`）、`crates/goose/src/agents/state_machine/ops_subagent.rs`（`ForegroundSubagentRunner`）、`summon`（`resume`、`resolve_max_turns`、`resolve_extensions_for_new_session`）、扩展工具返回处的元数据清洗，以及 `ModelInfo` + `canonical_cost.rs` 的缓存价与合并规则；文档侧新增并发上限与自定义模型价格两节。 |
| `source-goose-npm` | `1.54.0@sha512-Y7wh…rrQ==` → `1.55.0@sha512-EuAU…tjew==` | changed：仅登记版本号与完整性摘要。本轮未据 npm 版本新建或修改任何软件版本映射，全部章节结论只引用提交 `6835dd45` 的源码与文档。 |

固定身份与原件位置：结论钉在提交 `6835dd45a21a701b017abe38aa4204e18fed9213`；上游原件留在只读工作区 `ws-6835dd45a21a-ed682a81-2ea7-47ce-9f39-7cf89fecfab9`（HEAD 即观察提交，未复制任何 checkout 或文档原件进候选），候选内以 `commit` + 仓库相对 `file` + `content_sha256` 固定，`official_url` 指向该提交的 GitHub blob。旧版章节 `goose-cli-custom_agents-v3.md`、`goose-cli-custom_providers-v3.md` 与其他主题的既有版本原样保留在 `knowledge/goose/chapters/`，也是本轮的对比基线。

## 验证与差异入口

本轮是文档交付任务，**未运行**项目构建、lint 或测试套件。审计记录（`investigation_notes`）记载候选自检 `pnpm -s maintenance:candidates check --candidate <candidate>` 已通过；我没有重跑该检查，除本报告外未改动候选内任何文件。

关键差异入口：

```bash
# 候选与基线的整体差异（只应看到两个 v4 章节、22 条引用、12 快照、12 artifact 与 registry 指针）
diff -rq batch-20261022/baseline/goose batch-20261022/candidates/goose

# 两个新版章节的正文变化
diff batch-20261022/baseline/goose/knowledge/goose/chapters/goose-cli-custom_agents-v3.md \
     batch-20261022/candidates/goose/knowledge/goose/chapters/goose-cli-custom_agents-v4.md
diff batch-20261022/baseline/goose/knowledge/goose/chapters/goose-cli-custom_providers-v3.md \
     batch-20261022/candidates/goose/knowledge/goose/chapters/goose-cli-custom_providers-v4.md

# 指针切换
diff batch-20261022/baseline/goose/registry/chapter-current.yaml \
     batch-20261022/candidates/goose/registry/chapter-current.yaml
```

引用与快照的核对方式：`knowledge/goose/references/*-20261022.yaml` 的 `locator` 给出文件与行区间，`official_url` 固定到提交；`knowledge/goose/snapshots/` 的 `version_identity.kind=commit`、`value` 与 `content_sha256` 可逐条比对；`knowledge/goose/artifacts/` 记录同一提交下的完整文件哈希。未跟踪文件查看：`git status --porcelain` 与 `git diff --stat`（在 wiki 仓库根执行）应只显示本报告与上述候选路径。
