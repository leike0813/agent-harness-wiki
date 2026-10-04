# MiniMax Code 上游审阅报告 · 2026-10-03

## 给维护者的结论

这一轮 MiniMax Code 的源码真的动了：仓库从 `c8a39a5a` 前进到 `564e9166`，77 个文件、净增约 1800 行。但绝大部分是 TUI 渲染与交互的重写，真正落到七个固定问题里的只有两块。

一块是**模型侧安全拒答的处理**。以前 Claude 之类的后端用 HTTP 200 加 `stop_reason: "refusal"` 表达安全分类器拒答，宿主把它一并当成 `error`，显示成 `An unknown error occurred`：分类与解释被丢掉，下游看不见这是拒答，BYOK 还会把它当未知失败重试一遍。现在拒答有独立信号、可被识别、不再重试、也不会被推导出错误码。另一块小得多：OpenAI 兼容格式不再给「有工具历史但没有工具定义」的请求补 `tools: []`。

因此本轮新写两章：`custom_providers` 出 v2，`configuration` 出 v2。其余五个主题复查后确认不受影响，保留原版本。

有一处需要你注意：`custom_agents` 我判定**不受影响**，理由写在下面「已复查但不改写」里，这是一条判断而非扫描器的结论。

## 变化的意义与证据边界

### 安全拒答成为一类可识别、且确定不重试的失败

涉及 `providers.protocol`、`providers.responses`、`providers.diagnostics`。

后端以 HTTP 200 送达 `stop_reason: "refusal"`，anthropic 兼容流保留 `stop_details` 里的 `category` 与 `explanation`，拼成 `Model declined the request (stop_reason: refusal[; category: …])[: explanation]` 抛出。改动前后 `stopReason` 都仍是 `error`——这一点没有变，变的是错误消息里有没有可供识别的标记。

宿主侧新增 `refusal` 信号，命中时同时打上 `refusal` 与 `content_filter` 并**提前返回**，不再继续做状态码与网络启发式解析。三个下游后果：指标归到 `content_filter`；`classifyLLMErrorToCode` 对拒答返回空，不从后端控制的解释文本里猜状态码；BYOK 的 `retryAllErrors` 兜底被显式排除——原本 BYOK 会把所有「尚未产生输出」的失败一律当可重试，因为自定义网关报错口径不一致，现在拒答不再走这条路。

读者能感知的差别有两条：拒答不会被反复重发（可能重复计费），以及**这类失败没有错误码**，不会落进 `provider test` 那套 `http_STATUS` 之类的分类。排查时按 `content_filter` 与拒答标记定位，不要去找一个并不存在的错误码。

证据边界：`MINIMAX_CHANGES.md` 的条目写明 `stop_reason` 映射、消息格式与「宿主据标记识别而不解析解释文本」的约定；分类与重试的代码行为由 `@mavis/shared` 与 `@mavis/agent-core` 的测试覆盖。该条目同时声明未调用过线上服务，vendored 上游测试也不在本次分发的验证范围内——所以这是源码与离线测试层面的结论，不是对真实后端行为的观测。

### OpenAI 兼容格式不再补空 `tools`

涉及 `providers.protocol`。

压缩/检查点请求会保留工具调用历史但不携带工具定义。过去 provider 一看到工具历史就无条件补 `tools: []`，部分后端会以 HTTP 400 拒绝压缩（公开 issue `MiniMax-AI/minimax-code#194`）。现在没有非空工具定义时整个 `tools` 字段都不发送，与工具历史和缓存兼容性无关；非空定义的行为不变。

对读者的意义是**行为差异点**：自定义 provider 如果依赖空 `tools` 数组的旧行为，升级后请求形状会变。证据取自 fork 变更记录，代码侧的验证是发行版自有的集成测试，用本地 HTTP fixture 拒绝空 tools；该条目同样声明离线 fixture 不能证明 LiteLLM/vLLM、OpenAI 或 Anthropic 代理的真实接受度。

### 预设默认模型换了一个具体模型 ID

涉及 `config.defaults`，跨主题指向 `providers.models`。

区域×构建环境的 provider 预设把 `defaultModel` 从 `minimax/MiniMax-M3` 改为 `minimax/MiniMax-M3.1-Flash-Preview`。这是写死的具体模型 ID，会随宿主版本漂移，不是「默认模型族」的稳定承诺；要固定行为就应在 `config.yaml` 里显式写 `defaultModel`。这正是「默认值随版本变化」的一个具体样本，配置机制本身（数据目录、合并、迁移、诊断）没有任何改动。

### 已复查但不改写

扫描器因为拿不到 `changed_paths`，给全部七个主题都标了「investigate all themes」。我打开工作区实际比对了 77 个文件，逐主题结论如下。

`skills`、`mcp`、`hooks`、`native_plugins`：改动集中在 `packages/tui` 的 transcript、engine、shell、renderer 与对应测试，属于终端渲染与交互，没有触及这四个主题的入口、格式、加载顺序或生命周期机制。

`custom_agents`：**这条是判断，请复核我的取舍**。变更集中在 `packages/agent-modules/goal` 与 `local-runtime-v2` 的 goal 工作流资产——被接受的 `complete` 提案不再结束 Turn，改为要求 worker 在同一 Turn 写一条最终回复，后续工具调用（含 `update_goal`）一律拒绝。行为变化真实存在，但 goal 是主代理的内置工作流模块：它既不是用户自定义代理定义（数据目录下的 `agents/<名称>/agent.md`），也不属于 `explore`/`worker`/`verifier` 三个规范子代理角色。已发布的 `agents.entry`、`agents.format`、`agents.roles`、`agents.invocation`、`agents.overrides`、`agents.limits`、`agents.diagnostics` 答案依赖的是定义发现、规范文件解析、名册与委派工具面，这些都没有改变。按章节现有的 `source_refs` 反查，goal 相关文件也不在任何一道题的引用集合里。

我因此没有改写该章，也删掉了调查过程中为它临时建的两条引用记录。代价是 goal 工作流这一子系统在知识里仍然没有覆盖——补它是新增覆盖而非修订，超出本轮维护范围。如果你认为它应进入 `custom_agents`，请指派一次调查。

另外记一条未写入章节的相邻变化：`ERR_SSL_BAD_RECORD_MAC_ALERT` 被加入可重试的网络错误码集合。它只影响重试分类的内部集合，现有 `providers.retry` 引用对该小节默认重试策略的陈述仍然准确，不构成需要改写的答案。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_providers | minimax-code-cli-custom_providers-v2 | providers.protocol / providers.responses / providers.diagnostics：answered | 新建 edition，建议选为当前版本 |
| configuration | minimax-code-cli-configuration-v2 | config.defaults：answered | 新建 edition，建议选为当前版本 |
| custom_agents | minimax-code-cli-custom_agents-v2 | 无受影响问题 | 保留旧版本：goal 属内置工作流模块，代理定义与委派机制未变 |
| skills | minimax-code-cli-skills-v2 | 无受影响问题 | 保留旧版本：变更仅在 TUI 渲染层 |
| mcp | minimax-code-cli-mcp-v2 | 无受影响问题 | 保留旧版本：变更仅在 TUI 渲染层 |
| hooks | minimax-code-cli-hooks-v2 | 无受影响问题 | 保留旧版本：变更仅在 TUI 渲染层 |
| native_plugins | minimax-code-cli-native_plugins-v1 | 无受影响问题 | 保留旧版本：变更仅在 TUI 渲染层 |

**发布：** 未执行本地发布。`delivery=pr` 轮次不运行 `pnpm ahw publish` 与 `pnpm chapters:update`，也不改 `registry/chapter-current.yaml`。**受管二进制：** 未触发，`delivery=pr` 轮次不做受管二进制核对。

## 待处理与独立复核

**审计记录：** [audit-minimax-code-fe890dfe-555e-4aad-9858-85c2b16af781.yaml](audit-minimax-code-fe890dfe-555e-4aad-9858-85c2b16af781.yaml) **待处理旧审计：** 无。**待复核问题：** 无正式待复核项——本轮没有来源互斥、没有新来源推翻已发布的配置步骤、没有跨主题关键加载机制反转，按普通更新自检结案。

需要你人工过目的不是独立复核，而是上面「已复查但不改写」里 `custom_agents` 的取舍判断。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| [source-minimax-code-repo](https://github.com/MiniMax-AI/MiniMax-Code) | `c8a39a5a…` → `564e9166…` | changed；内容有变化，77 文件 +3881/-2085，已按提交固定新快照 |
| [source-minimax-code-npm](https://registry.npmjs.org/@moonshot-code/cli) | 无基线 → `0.6.2@sha512-nDmN8…` | changed（无可比对基线）；本轮未据此改写任何章节或映射 |
| source-minimax-code-docs-features | `a1230063…` → `a1230063…` | unchanged；内容无变化 |
| source-minimax-code-docs-configuration | `9429573a…` → `9429573a…` | unchanged；内容无变化 |
| source-minimax-code-docs-reference | `e35d9d1a…` → `e35d9d1a…` | unchanged；内容无变化 |
| source-minimax-code-docs-security | `a651d452…` → `a651d452…` | unchanged；内容无变化 |
| source-minimax-code-docs-faq | `39fd1c25…` → `39fd1c25…` | unchanged；内容无变化 |

npm 来源与 kimi-code 一样缺 `npm_release` 快照，观察身份因此没有基线可比对。这不影响本轮结论：npm 版本变化本身不构成章节变化或源码到包的映射，受管包刷新属于 harness-binary 职责。

## 验证与差异入口

本轮在仓库根运行 `pnpm knowledge:validate`（507 个章节版本，退出 0）、`pnpm sources:audit-log`、`git diff --check` 与 `git status --short --untracked-files=all`，结果见交付回复。校验覆盖全树，其他产品的诊断只记录不改。

本轮新增：`knowledge/minimax-code/chapters/minimax-code-cli-custom_providers-v2.md`、`-configuration-v2.md`、`references/ref-minimax-code-providers-refusal-classifier.yaml`、`-refusal-signals.yaml`、`-refusal-surfaced.yaml`、`-refusal-no-retry.yaml`、`-refusal-code-suppress.yaml`、`-refusal-changelog.yaml`、`-empty-tools-omitted.yaml`、`-config-preset-default-model.yaml`、`snapshots/snapshot-minimax-code-repo-20261003.yaml`、`artifacts/artifact-minimax-code-repo-20261003.yaml`，以及审计 YAML 与本报告。旧 edition 全部保留。

查看本轮差异：

```sh
git status --short --untracked-files=all -- knowledge/minimax-code audits/minimax-code
```
