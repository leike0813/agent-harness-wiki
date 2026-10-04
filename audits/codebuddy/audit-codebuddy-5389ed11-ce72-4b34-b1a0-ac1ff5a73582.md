# CodeBuddy 上游审阅报告 · 2026-10-03

## 给维护者的结论

CodeBuddy Code 的文档仓库从 `47ec6f1…` 前进到 `694ae23…`，实际改动只有五个文件：`CHANGELOG.md`、`docs/env-vars.md` 和三份发行记录。七个已发布章节引用的 `docs/*.md` 除 `env-vars.md` 之外逐字未变，所以本轮的读者可见变化集中在「发行记录带来的新行为」和「一行新增环境变量」上，机制主体没有移动。

改写落在四个主题：`custom_providers` 升到 v2（错误码 4100、流式中断不再被误判为空流），`hooks` 升到 v2（`FileChanged` 改为按批次触发），`skills` 升到 v2（只有显式 `/skill-name` 才展开 Skill），`configuration` 升到 v2（两个新环境变量）。`mcp`、`custom_agents`、`native_plugins` 复核后没有读者可见变化，沿用 v1——本轮与这三个主题相关的发行条目要么是 Server 库或 Web UI 的修复，要么是模型可见描述与内部调度的一致性修复，Web UI 不是本产品已登记的界面。

CodeBuddy Code 闭源，官方只发布文档与 npm 包，因此本轮仍然是来源级知识：章节里出现的 2.161.0/2.161.1 只用来标注「自哪个 CLI 版本起成立」，不代表验证过任何具体发行版的二进制行为，本轮也没有新建任何版本映射。

## 变化的意义与证据边界

### 缺配置不再伪装成鉴权失败

2.161.0 给本地自定义模型缺接口地址或 API Key 的情况引入了错误码 `4100`：请求不再发往供应商端点，而是直接返回 4100 与「前往配置」指引；`4100` 及其之后的编号由 Agent CLI 统一维护。旧行为是带着账号凭据发出请求、再被报成「密钥无效」，把配置问题说成鉴权问题——排查路径因此完全不同。指向本机回环地址的模型（如本地 Ollama）本就不需要 API Key，行为不变。

这条改写落在 `providers.auth` 与 `providers.diagnostics` 两处：前者补上「请求前拦截」这一环节，后者把「先查 `models.json` 的 `url`/`apiKey` 及其 `${VAR_NAME}` 环境变量、再怀疑凭据」写成可执行的排查顺序。`models.json` 文档本身没有随这次发布改写（`docs/models.md` 逐字未变），所以引用落在 `CHANGELOG.md` 第 35 行，绑定本轮新建的 `snapshot-codebuddy-docs-changelog-20261003`。

同一条发行记录还带走了流式中断的误判：模型已输出一部分内容、紧接着上游报错且两段数据同时到达时，旧行为把已输出内容整段丢弃、按「没有任何输出」反复重试并提示「上游返回空流」，现在保留已输出内容并从中断处继续。这与 `providers.responses` 已记录的「重试严格发生在流式内容产出之前」方向一致，但发行记录只给出修复后的结果，没有引入新参数，所以正文只写行为、明确不写成可配置项。

### `FileChanged` 不再逐文件触发

2.161.0 把 `FileChanged` 钩子改为按批次依次执行：短时间内同一文件的多次变化合并为一次触发；一次性变化的文件超过 1000 个时，这一波不再逐个触发钩子，改为记录一条告警。依赖「一次改动对应一次触发」的 hook 作者会直接受影响，因此写进 `hooks.order` 对应的 `hooks-execution` 小节。

证据边界要说明白：官方把这条变更记在「后台服务文件变更资源泄漏」条目下，与 Web UI 的文件监听同源，发行记录没有区分 CLI 会话与 Server 运行时。正文按 CLI 记录，并写明 Server 侧是否同样适用未在来源中验证。

### Skill 的用户侧触发条件收紧

2.161.0 修复了以已安装 Skill 名开头、但不带斜杠的普通文本被误判为 Skill 命令的问题：此前模型收到的是 Skill 全文而不是用户原话，下一轮之后历史中的用户原始消息还会被覆盖；现在只有显式输入 `/skill-name` 才触发展开。`skills.loading` 小节原本只写了「`/skill-name` 显式触发 + 模型按任务匹配自动调用」，没有承诺裸文本会触发，所以这是补充边界而不是推翻已发布的结论。

### 配置开关：两个环境变量

`docs/env-vars.md` 本轮只新增一行：`CODEBUDDY_SKIP_READ_TOOL_IMAGE_REHYDRATION_IN_HISTORY=true` 让 `-p` 历史回放中的 `Read` 图片保留 blob 引用、不内联 base64，实时输出与模型上下文不受影响。另有 `CODEBUDDY_SHOW_CONTEXT_USAGE`（常驻上下文占用率）随 2.161.0 发布，env 表里的行在基线提交就存在，但发行记录是本轮才出现的，因此两条都写进 `config-defaults`，版本归属各自有引用。

其余五个主题的核查范围：`mcp` 复核了 2.161.0 的会话级 MCP ToolSearch 描述统一（`_meta.shortDescription` 复用），属模型可见描述的内部一致性；`custom_agents` 复核了专家团并发汇报与成员唤醒的内部调度修复，以及 Web UI 智能体选择串改；`native_plugins` 复核了 Server 库运行时 Skill 工具混入 CLI 内置命令。三者都没有改变对应文档已记录的机制，Web UI 也不在 `catalog/harnesses.yaml` 登记的界面里，因此不新建章节版本。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_providers | `codebuddy-cli-custom_providers-v2` | `providers.auth`/`providers.responses`/`providers.diagnostics`：answered（描述更新，状态不变）；其余五题不变 | 交付工作区，待父进程发布 |
| hooks | `codebuddy-cli-hooks-v2` | `hooks.order`：answered（新增 `FileChanged` 批量触发语义，状态不变）；其余六题不变 | 交付工作区，待父进程发布 |
| skills | `codebuddy-cli-skills-v2` | `skills.loading`：answered（触发条件收紧，状态不变）；其余八题不变 | 交付工作区，待父进程发布 |
| configuration | `codebuddy-cli-configuration-v2` | `config.defaults`：answered（新增两个环境变量，状态不变）；其余六题不变 | 交付工作区，待父进程发布 |
| mcp | `codebuddy-cli-mcp-v1` | 本轮复核后无变化 | 保留旧版本 |
| custom_agents | `codebuddy-cli-custom_agents-v1` | 本轮复核后无变化 | 保留旧版本 |
| native_plugins | `codebuddy-cli-native_plugins-v1` | 本轮复核后无变化 | 保留旧版本 |

**发布：** `delivery=pr`，本轮不构建 release、不切换 `releases/current.json`，改动留在工作区交回巡检主进程。**受管二进制：** 未触发，`@tencent-ai/codebuddy-code` 观察到的 2.161.1 与受管记录里的 2.160.0 不同，但本轮不取包字节，留给 `harness-binary` 核对。

## 待处理与独立复核

**审计记录：** [audit-codebuddy-5389ed11-ce72-4b34-b1a0-ac1ff5a73582.yaml](audit-codebuddy-5389ed11-ce72-4b34-b1a0-ac1ff5a73582.yaml)。**待处理旧审计：** 无，这是 codebuddy 的第一份审计。**待复核问题：** 无。改动不涉及来源冲突、推翻已发布的配置步骤或跨主题加载机制变化，按 maintenance 第 4 节由本 Agent 自检。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-codebuddy-docs` | `47ec6f13…` → `694ae23f…` | changed；`CHANGELOG.md` 新增 2.161.0/2.161.1 两条发行记录，`docs/env-vars.md` 新增一行环境变量，两份 release-notes 与其索引为同内容呈现；被引 `docs/*.md` 其余逐字未变 |
| `source-codebuddy-site` | `6041efd9…` → `6041efd9…` | unchanged |
| `source-codebuddy-npm` | `2.160.0`（受管记录） → `2.161.1@sha512-Ii1ziKuv…` | changed；只观察版本与 integrity，未取包字节，不构成章节变化或版本映射 |

## 验证与差异入口

`pnpm knowledge:validate` 只报出一条与 codebuddy 无关的错误：`knowledge/cline/references/ref-cline-provider-source-auth.yaml` 的 excerpt 超过 800 字符（同一轮里由 cline 的维护子代理新增的文件，本轮未改动）。codebuddy 的 4 个章节版本、7 条引用、2 个快照与 2 个 artifact 没有产生任何诊断。`pnpm sources:audit-log` 因此在加载章节数据集时中止（报 `Production chapter dataset is invalid.`），走不到审计台账检查；为确认本轮审计记录本身成立，另外用 `upstreamAuditSchema` 单独解析该文件通过，并逐条核对了台账会检查的引用关系：7 个 impact 的 `question_ids`、`section_ids`、`source_refs` 都能在对应主题的章节里找到，`surface_ids` 只有已登记的 `cli`，`review_status: reviewed` 与 `pending_question_ids: []` 一致。`git diff --check` 通过。

本轮 7 条引用的摘录已与固定提交 `694ae23…` 的原文逐字比对通过，长度分别为 71、94、109、160、161、204、235 字符，均小于 800。Git 来源的 checkout 不保留，记录形态为 `git_source_file`，来源审计会报 `not_retained`。查看本地差异用 `git diff -- knowledge/codebuddy/ audits/codebuddy/ registry/chapter-current.yaml`，新文件见 `git status --short --untracked-files=all`。

本轮打开并已关闭的来源工作区：`ws-694ae23f4430-79c7d374-f8c2-4449-9f3c-e5e436fc1e6f`（`source-codebuddy-docs` @ `694ae23f44308ca901d620d2e48c2c3d35c75fc9`）。没有保留未关闭的来源工作区。
