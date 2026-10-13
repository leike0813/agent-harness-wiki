# Factory Droid custom_providers 增量维护报告 · 2026-10-13

## 结论

`source-factory-droid-docs-models` 确实变了，但**不改变任何已发布答案**：两版原件在 archive 中都保留，逐行 diff 只有一行新增，落在章节并未枚举的原生模型目录里。因此本轮不新建章节版本、不新增模型行，triage 从派发时的 `maintain` 改判为 `reviewed_no_impact`。`source-factory-droid-npm` 0.238.0→0.240.1 只作发布身份记录。

## 变化的内容与证据边界

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 原件 | 语义判断 |
| --- | --- | --- | --- |
| [source-factory-droid-docs-models](https://docs.factory.com/models.md) | `0dc5d70e…` → `362ccf13…` | 基线与新一版都保留在 archive（`artifact-source-factory-droid-docs-models-0dc5d70e3233/`、`-362ccf13844d/`） | changed；唯一文本差异是 Anthropic 模型表新增一行，逐字节 diff 可做 |
| [source-factory-droid-npm](https://www.npmjs.com/package/@factory-ai/droid) | `0.238.0@sha512-Gyq4WkmK…` → `0.240.1@sha512-b65gVO6K…` | 不保留包字节 | 排除：仅发布身份，新版本仍未验证 |

新增行的原文（`## <span className="provider-heading">…Anthropic</span>` 小节表格）：

> `| Claude Haiku 5.5 | `claude-haiku-5-5` | 0.04× | `off`, `low`, `medium` (default), `high`, `xhigh`, `max` |`

该行的自身取值为：model id `claude-haiku-5-5`、价格系数 0.04×、reasoning 档位 `off`/`low`/`medium`/`high`/`xhigh`/`max`，其中默认是 `medium`。这是**这一行自己的默认值**，不推广为其他模型或全局默认（同一文档中 Claude Sonnet 4.5 / Claude Haiku 4.5 默认 `off`、Claude Opus 5.5 默认 `medium` 而无 `off`）。

## 为什么 providers.models / providers.metadata 不受影响

1. 被引小节逐字节相同：`ref-fd-models-custom` 的 locator 是 `document_section / heading: Custom models`，两版中该小节（正文 + `<RelatedLinks>` 三行）完全一致，短摘录逐行仍命中，无需改写引用。
2. 已发布章节 `factory-droid-cli-custom_providers-v1` 不枚举原生模型目录。`providers-entry` 讲 `customModels` 定义与作用域，`providers-metadata` 讲能力字段、Bedrock 字段与 `requestMetadata`，正文只声明「可用模型由你写入的 `customModels` 数组与 Factory 自带模型表共同决定」——引用目录存在这一事实，不列举行。新增一行属于 Factory 自带模型表内部变动，不改变该机制表述。
3. 因此不按「完整性」补一行到章节：那会引入一个章节本身并未主张的枚举面。

`providers.models` 仍保持已发布的 `partial` 状态（其缺口是文档没有「向提供方拉取模型清单」的发现机制，与本轮变化无关）。

## 未解决分歧（保持 pending）

`providers.entry` 继续保持 pending，来源是 [audit-factory-droid-a13bddc0…](./audit-factory-droid-a13bddc0-67d0-4107-bb78-be0210f27af2.yaml) 记录的组织托管静态 `apiKey` 表述冲突。本轮问题范围只含 `providers.models`、`providers.metadata`，该问题未在范围内，正文未改写，也未由本审计关闭。

## 本次改动

- `audits/factory-droid/audit-factory-droid-bdec1310-37d4-4bbe-93f4-fee45a4d0c98.yaml`：收窄 impact 到 custom_providers 的两个问题，补 `candidate_path`，`pending_question_ids` 只留 `providers.entry`，重写 triage 理由与调查记录。
- 本报告（同名 `.md`）。
- 未新增/修改章节、引用、快照、artifact 或版本映射；未触碰 `catalog/harnesses.yaml` 与 `registry/chapter-current.yaml`。

## 验证

`pnpm maintenance:candidates check --candidate <candidate_root>` 通过。`delivery=pr`：未运行 `publish`、`chapters:update`、`managed:packages`，未切换发布指针，未打开任何 `sources:workspace`（本轮无 Git 来源变化）。