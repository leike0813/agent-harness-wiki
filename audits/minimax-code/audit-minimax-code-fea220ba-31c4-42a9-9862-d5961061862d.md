# minimax-code 巡检维护报告（audit-minimax-code-fea220ba）

## 范围与固定来源

- 本轮入口：topic `configuration`、`custom_agents`、`custom_providers`；固定问题 `agents.limits`、`agents.overrides`、`config.sources`、`providers.diagnostics`、`providers.entry`、`providers.forwarding`、`providers.protocol`、`providers.responses`。
- 固定 Git 来源：pinned 工作区 `ws-da22f11c55d4-6f854068-3c97-4f42-a23f-5db08059f101`，commit `da22f11c55d4748155d7162c1030414228a00565`，基线 `e798b460f4d8603ce732e5d319d63c8018ef6cad`；未重扫、未重新克隆。
- 固定文档来源：`agent.minimax.io/docs/cli/{features,configuration,reference,security,faq}.md`，取回内容与 observed sha256 逐份一致（`7f1dca…`、`d0ca00…`、`a72a7c…`、`741384…`、`08754e…`），未读取任何其他上游状态。
- npm `0.6.11 → 0.6.12` 只记录身份，未下载包字节，不据此改写规则，也不建立版本映射。

## 逐主题结论

### configuration / `config.sources`（不变）

- `packages/config/src/data-dir.ts` 本轮未改；`getDataDir()` 仍是五级顺序（显式 profile 数据目录 → git 自动识别 → `MINIMAX_DATA_DIR`/`MAVIS_DATA_DIR` → profile → 默认值），`getConfigPath()` 仍是数据目录下的 `config.yaml`。
- `packages/config/src/config.ts` 因新增 `contextManagement.compactionTriggerAt` 与默认模型改名整体下移 10 行，属位置变化；`docs/installation.md` 只把 npm 版本从 0.4.12 换成 0.6.9，数据目录表仍是 `~/.minimax`；官方 `configuration`/`faq` 的 Data directory 段落逐字未变。
- 结论：答案不变，保留 `minimax-code-cli-configuration-v3`。

### custom_agents / `agents.overrides`、`agents.limits`（不变）

- 本轮 61 个变更文件不含 agent 定义、canonical-tool-policy、subagent-roles、background-task 生命周期或 task 绑定代码；`config.ts` 中 `agents.default` 的证据定位仅下移 10 行。
- 能力覆盖交集、角色工具天花板、task 子会话屏蔽、准入集合与停止预算均无改动。
- 结论：答案不变，保留 `minimax-code-cli-custom_agents-v2`。

### custom_providers（实质变化，新建 v3）

| 变化 | 证据 | 影响问题 |
| --- | --- | --- |
| 客户端格式列表新增 `google-generative-ai` | `ref-minimax-code-providers-formats-20261022`（`packages/tui/src/provider/contract.ts:3-8`） | `providers.protocol`、`providers.entry` |
| 运行时允许列表同步新增该格式，`openai-codex-responses` 仍排除 | `ref-minimax-code-providers-identity-20261022`（`identity.ts:20-32`） | `providers.protocol` |
| TUI 引导新增 Google Generative AI 选项（说明 `/models`） | `ref-minimax-code-providers-format-onboarding-20261022`（`onboarding.ts:21-34`） | `providers.entry`、`providers.protocol` |
| 连接测试对 Google 改走 Pi `completeSimple` 流式，默认 30 秒（其余 10 秒），`stopReason` 错误 / 空内容分别映射 `provider_error` / `invalid_response` | `ref-minimax-code-providers-google-probe-20261022`（`test-connection.ts:62-71`）、`ref-minimax-code-providers-google-adapter-20261022`（`:100-120`） | `providers.diagnostics`、`providers.responses`、`providers.forwarding` |
| 思考协议对该格式不注入补丁（Pi 拥有 Google thinking） | `ref-minimax-code-providers-google-thinking-20261022`（`model-ref.ts:449-455`） | `providers.protocol`、`providers.forwarding` |
| OpenCode Go 头覆盖从 `/zen/go` 扩到 `/inference/go`，删除静态 `x-opencode-session`/`user-agent` 并写运行时身份 | `ref-minimax-code-providers-opencode-go-20261022`（`opencode-go-headers.ts:15-36`） | `providers.forwarding` |
| 仓库文档新增 Google 端点示例：base URL 写到 API 版本、`x-goog-api-key` | `ref-minimax-code-examples-providers-20261022`（`docs/examples.md:82-91`） | `providers.entry`、`providers.protocol`、`providers.auth` |

来源边界：官方 CLI 文档（`configuration` 的 Custom providers、`features` 的 Providers and models、`faq` 的 provider 问答）与仓库 README 仍只列三种格式；这些页面描述已发布 CLI，而本轮仓库提交在其之后。因此第四种格式按来源级知识写入，不写软件版本映射，也不推断任何已发布 npm 版本接受它。该差异可由分发/版本边界解释，无需独立复核。

## 引用与快照

- 新增 `snapshot-minimax-code-repo-20261022` 与 `artifact-minimax-code-repo-20261022`（`git_source_file`，commit `da22f11`，`README.md` 内容哈希 `885519dd…`），不含 checkout 副本。
- 新增 9 条 reference，行定位与摘录已按 pinned commit 逐行核对（范围与摘录文本完全一致）。
- 未改动的源码与官方文档引用沿用原 snapshot；四份文档的既有摘录经比对仍逐字命中，`faq` 仅 Accordion 标记改为引用块，文字未变。

## 候选改动

- 新 edition：`minimax-code-cli-custom_providers-v3`（保留 v1、v2）。
- `registry/chapter-current.yaml`：`custom_providers` 指向 v3。
- 审计：`audit-minimax-code-fea220ba-31c4-42a9-9862-d5961061862d.yaml`，`pending_question_ids: []`，`review_status: reviewed`。
- 未重审未涉及的主题与问题；未发布、未切指针、未运行 binary。

## 校验

- `pnpm -s maintenance:candidates check --candidate <candidate>`：通过（exit 0，无 stderr）。
