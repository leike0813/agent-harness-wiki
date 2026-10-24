# Kiro 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮 23 个官方文档来源 changed，逐页比对后只有两处正文语义变化落在本地 Transcript 主题：

1. `/chat save` 与 `/chat load` 改为按引擎分流：V3 写读 zip 会话归档，CLI 2.x 仍用 JSON 会话文件。
2. settings 参考的 `KIRO_HOME` 行重写为 V3 作用域，并新增“非法路径回退到 `~/.kiro`”规则。

第 1 项使已发布的 `transcripts.format` 与 `transcripts.archive` 答案失效（旧版把 `/chat save` 产物写成单个 JSON 文档），已用新快照重写为 `kiro-local_transcripts-v2`，指向新 edition；旧 edition 字节未改。`transcripts.schema` 仍为 `unknown`：zip 容器内部条目与记录字段依旧没有来源，本章继续不编造样例。第 2 项归属 `transcripts.location` / `transcripts.naming`，不在本轮派发范围，保留 `snapshot-kiro-lt-settings` 的既有摘录，留待后续轮次。

## 证据与比对方式

全部页面按 `doc_sources` 的 `resolved_url` 取回，sha256 与本轮 `observed` 逐一吻合：

<!-- prettier-ignore -->
| 来源 | 页面 | observed sha256 前缀 |
| --- | --- | --- |
| source-kiro-docs-slash-commands | reference/slash-commands.md | 809bbc71e465 |
| source-kiro-docs-cli-commands | reference/cli-commands.md | bac48ddf0e80 |
| source-kiro-docs-settings | reference/settings.md | e03f0a7baa91 |
| source-kiro-docs-headless | cli/headless.md | 2e9ae846eab6 |
| source-kiro-docs-install | getting-started/installation.md | 821430c6adf6 |
| source-kiro-docs-cli-chat-settings | cli/chat/settings.md | 47816f1f944a |

旧版从 `archive/kiro/` 已保留的基线原件读取，因此下面是正文差异，不是模板噪声：

- slash-commands：`/chat` 的示例与子命令说明（283-290、296-299）、`/model fallback` 段落、`/title` 说明。
- cli-commands：`--resume-id` 改为“local or cloud session”，新增 `--cloud` / `--repo`，`/chat save|load` 示例改为 `.zip` 与 zip 归档说明（833-840）。
- settings：`KIRO_HOME` 行重写（353）、`chat.terminalTitle` 新增行、`toolSearch.*` 默认值描述改写。
- headless：新增“Run a prompt or SOP as the first message”“Saved V3 settings”“Cloud sessions in V3”小节，已有段落未删改。
- install：本工作树没有保留该页基线原件，无法逐字比对；已发布的日志路径摘录在当前页面逐行都命中，只有块缩进不同，故摘录维持不变。
- cli chat settings：Output style 与 Terminal title 两处行内措辞。
- 其余 17 个 changed 来源本轮未逐页复查，只按输入 triage 记录；triage 的“差异全是权限模式措辞与 /plan 入口”与上述四页的实测不符，以实测为准。

## 逐题结论

<!-- prettier-ignore -->
| 问题 | 旧状态 | 新状态 | 结论 |
| --- | --- | --- | --- |
| transcripts.format | partial | partial | V3 `/chat save` 写 zip 会话归档、`/chat load` 读 zip；CLI 2.x 为 JSON 且可省略 `.json`；脚本扩展点仍交换 JSON。zip 内部编码、自动保存的落盘格式仍无来源。 |
| transcripts.schema | unknown | unknown | 仍无任何记录类型、字段、必填项或版本迁移说明；`/chat save-via-script` 的“chat session JSON”只说明脚本边界格式，不足以推出 schema。 |
| transcripts.archive | partial | partial | 官方把 V3 产物称为 session archive（zip 容器），但未列出条目、未说明是否含工具输出/思考块/spec 文档，也未说明跨引擎或跨机器还原；把归档当完整备份仍不安全。清理部分维持原结论。 |

## 本次发布与版本边界

- 新 edition：`kiro-local_transcripts-v2`（`local_transcripts`），小节 ID 与旧版一致，三题答案与两处正文重写。
- 新增引用：`ref-kiro-lt-slash-chat-subcommands-v2`、`ref-kiro-lt-slash-chat-archive-examples`（snapshot-kiro-lt-slash-commands-20261022）、`ref-kiro-lt-clicmd-chat-archive`（snapshot-kiro-lt-cli-commands-20261022）。
- 新增快照与工件：`snapshot-kiro-lt-slash-commands-20261022`（artifact-source-kiro-docs-slash-commands-809bbc71e465）、`snapshot-kiro-lt-cli-commands-20261022`（artifact-source-kiro-docs-cli-commands-bac48ddf0e80）。原件按 scan 约定登记在 `archive/kiro/<artifact-id>/source.md`；本轮 monitor 未保留原件（checks 无 `candidate_path`），hash 已与取回页面逐字节核对。
- 当前选择：`registry/chapter-current.yaml` 的 kiro × local_transcripts 指向 v2。
- 全部快照 `version_applicability` 仍为 `unknown`，本轮不新增软件版本映射。
- delivery=pr：未发布、未切换指针、未运行受管二进制。

## 待处理与独立复核

- 本审计 `pending_question_ids` 为空。`pending_audit_refs` 保留输入中的 7 份旧审计；它们记录的 config 类问题与更早的 slash-commands/headless 差异仍各自 pending，本审计的 `review_status: reviewed` 不关闭它们。
- 未要求独立复核：变化由两份官方页面（slash-commands 子命令表、cli-commands 会话小节）独立复述，并由每页示例佐证，不存在来源冲突；结论是对原文的直接复述，未外推未支持的行为。
- 唯一遗留的阅读风险：文档自身在 `/save` 小节仍以 `.json` 作示例，与 `/chat save` 的 zip 说明并存。章节已把该不一致写入 `transcripts-format-schema` 的缺口段落，不据此推断 V3 会写 JSON。

## 验证

`pnpm -s maintenance:candidates check --candidate <candidate root>` 通过（exit 0，388 个数据文件）。候选与基线差异仅为本轮新增的 2 个 artifact、2 个 snapshot、3 个 reference、1 个 chapter edition，以及审计 YAML 与 chapter-current 选择。
