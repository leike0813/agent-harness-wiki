# Codebuff 上游审阅报告 · 2026-10-22

## 给维护者的结论

这一轮仓库从 `cd44dda` 走到 `6a83aef`（398 个改动路径），其中与本产品固定问题相关的只有 11 个文件；真正改变读者
可见行为的是三处：skill 工具结果与 `/skill:` 命令现在都先给"基准目录"再给正文；CLI 不再把远程 agent 校验的传输
失败过滤掉，而是带 HTTP 状态码写进错误列表；BYOK 的推理档取值集合改为按 provider 决定，Anthropic 预算查表补了兜底。

据此发出三个新 edition：skills v3、custom_agents v5、custom_providers v4，旧 edition 全部保留；configuration 判定无
知识变化，继续用 v2。npm 包 `1.0.688` 未变，10 个官方文档来源只有原始字节的构建产物变化，归一化正文差异为 0 行，
因此没有改写文档引用。

需要维护者知道的两件事：本轮审计 `review_status` 仍是 `pending`，六个固定问题都没有独立复核，也没有关闭更早的三个
待处理审计；另外新引用 `ref-codebuff-skills-tool-result-20261022` 的行区间末端少一行（见"验证与差异入口"），不影响
正文结论，但复核时应一并改掉。

结论固定在上游提交 `6a83aef15ec76d149cd424e4b431a01248e3ec0b`（基线 `cd44ddada1bcae3405904410b7d66c1a348e0185`）；保留的
原始字节在固定工作区 `ws-6a83aef15ec7-419981e5-628f-4e81-a5fe-61c52322c2eb`，候选里的
artifact/snapshot 只记 `file`、`commit` 与 `content_sha256`，不内联正文。

## 变化的意义与证据边界

### Skills：工具与用户入口统一加上基准目录

`common/src/util/skills.ts` 新增 `formatSkillContent`（`skills.ts:7-19`）：先写一行 `Base directory for this skill: "<目录>/"`，
再写"按这个目录、而不是项目工作目录去解析 `scripts/`、`references/`、`assets/`"的说明，空行后才是完整 `SKILL.md`。
工具结果（`packages/agent-runtime/src/tools/handlers/tool/skill.ts:138-150`）与用户路径的 `buildSkillPrompt`
（`cli/src/commands/prompt-builders.ts:45-63`）都走它，注释要求两条入口逐字节一致；`dispatchSkillPrompt` 的参数类型也相应
要求 `filePath`（`cli/src/commands/command-registry.ts:894-905`）。流式输出或多轮进行中时，这条提示改为排队而不是打断。

影响 `skills.loading`、`skills.invocation`、`skills.extensions`。前两条在 v3 里仍记 `answered`；第三条从"固定来源没有确立
任何资源目录约定"改为"运行时把这三个目录当资源目录，但没有字段或校验规则"，仍记 `partial`。能证明到哪里：基准目录的
构造规则（反斜杠换正斜杠、截到最后一个 `/`、无分隔符退回 `./`、不在本机重新解析）与 `available_skills` 列表的 XML
转义都在引用行内，仓库自己的 `docs/agents-and-tools.md:90-98` 用同一句话描述两条入口。缺什么：文档站提到的
`npx skills add` 实现不在固定提交里，资源目录也没有 schema，这两点仍按缺口读。

### 自定义 Agent：远程校验的传输失败不再被吞掉

`cli/src/hooks/use-agent-validation.ts` 不再用 `filterNetworkErrors` 过滤远程校验的传输失败，`network_error` 条目带
`Failed to validate via API (HTTP <状态码>)` 文案进入错误列表并阻止发送（`use-agent-validation.ts:64-101`），错误弹窗对
该条目只显示消息、不配 agent id；SDK 侧 `sdk/src/validate-agents.ts:113-128` 负责把 HTTP 失败映射成该条目。于是
"发送被中止却没有任何错误条目"这条诊断路径消失。

影响 `agents.diagnostics`，v5 里仍记 `partial`：启动期 agent 加载错误依旧没有面向用户的清单，这是本轮没有触及的原有
缺口。证据只覆盖校验入口与错误呈现规则，不覆盖服务端 `/api/agents/validate` 的行为。

### BYOK：推理档集合按 provider 决定，Anthropic 预算兜底

`common/src/constants/reasoning-effort.ts:101-120` 给出两套集合：`chatgpt` 连接是 `low|medium|high|xhigh|max|ultra`，其余
仍是 `low|medium|high`；`sdk/src/byok.ts:478-499` 在解析连接时按集合过滤，集合外的值被丢弃，等于不发任何推理字段。
`sdk/src/impl/byok-request.ts:47-53` 的 `anthropicThinkingBudget` 给三档之外的档位兜底到 `high` 的 16384，不再查表得到
`undefined`。CLI 的 `/byok effort` 仍只保存三档（`cli/src/commands/byok.ts:531-553`），因此 `xhigh`/`max`/`ultra` 只会来自
直接构造已解析连接的宿主。

影响 `providers.forwarding`（v4 记 `answered`）与 `providers.responses`（仍 `partial`）。证据边界：能证明的是本仓库声明的
取值集合、过滤时机与兜底表；`chatgpt` 后端是否接受这些档位、实际效果如何，固定来源里没有。

### 证据边界与排除项

11 个文件的 diff 与本报告描述逐条对应；其余 387 个改动路径没有进入已发布正文，也没有被任何 codebuff 章节引用。

明确排除 configuration：`cli/src/utils/settings.ts`、`cli/src/cli-args.ts`、`sdk/src/skills/load-skills.ts` 本轮未改；
`load-agents` 仍导出同一组默认目录（cwd、父目录、`~/.agents`）；run-state 的知识文件选择与 home 优先级逻辑只是行号前移，
`cli/src/index.tsx` 的改动全是 analytics funnel。因此 `config.overrides` 与 `config.diagnostics` 的既有答案在新提交上仍
成立，不新建 edition。另有一处刻意不写：SDK 的 `initialSessionState` 在未显式传入 `agentDirs` 时只加载 `~/.agents`
（并新增 `agentDirs` 选项与 `skipSymbolIndex`），属于 `agents.entry` / `config.sources` 的界面，不在本轮六个固定问题内。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | `codebuff-cli-skills-v3` | `skills.loading`：answered；`skills.invocation`：answered；`skills.extensions`：partial | 已进入新发布（选择指针已切到 v3）；`-v2` 保留 |
| custom_agents | `codebuff-cli-custom-agents-v5` | `agents.diagnostics`：partial | 已进入新发布；`-v4` 保留 |
| custom_providers | `codebuff-cli-custom-providers-v4` | `providers.forwarding`：answered；`providers.responses`：partial | 已进入新发布；`-v3` 保留 |
| configuration | `codebuff-cli-configuration-v2`（未新建） | `config.overrides`、`config.diagnostics`：维持既有答案 | 保留旧版本：本轮判定无知识变化 |

MCP、hooks、native_plugins、local_transcripts 四个主题本轮未改，选择不变。

**发布：** `registry/chapter-current.yaml` 的三条选择已指向新 edition；候选内没有 release 或 staging 记录，本轮未做构建验收
与生产切换。**受管二进制：** 未触发（source-tree 分发，`source-codebuff-npm` 仍是 `1.0.688`，integrity 未变）。

## 待处理与独立复核

**审计记录：** `audits/codebuff/audit-codebuff-942168de-bfea-482d-a384-2eac2690e5de.yaml`，status `changed`，
`review_status` 为 `pending`。

**待处理旧审计：** `audit-codebuff-1c23337c-6204-49c1-a163-096fdaf80896`、
`audit-codebuff-d8c97acc-bd10-4208-b191-091fbae8bbcd`、`audit-codebuff-0671d492-ab49-4906-8bfb-81cb980f31de`，三条都是
`changed` + `pending`。本轮未关闭其中任何一条，`pending_audit_refs` 原样保留。记录末尾的 investigation note 写着"6 个
固定问题全部结案、`pending_question_ids` 为空并写了 `reviewed_by`/`reviewed_at`"，与实际字段不符——YAML 里六个问题仍在
`pending_question_ids`，也没有 `reviewed_by`/`reviewed_at`。以字段为准：本轮未结案。

**待复核问题：**

- `skills.loading`、`skills.invocation`：`formatSkillContent` 进入两条入口，已发布正文多出基准目录两行，属推翻已发布描述。
- `skills.extensions`：从"没有资源目录约定"改为"有约定但没有字段与校验"，结论口径变了。
- `agents.diagnostics`：诊断路径被删除，会改变读者对"校验失败时看到什么"的预期。
- `providers.forwarding`：推理档不再是固定三档，属已发布配置行为的修正。
- `providers.responses`：本轮只补了 Anthropic 兜底与按 provider 过滤这半边，该条整体仍 `partial`。

以上六条均未独立复核。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-codebuff-repo` | `cd44ddada1bcae3405904410b7d66c1a348e0185` → `6a83aef15ec76d149cd424e4b431a01248e3ec0b` | changed；398 个路径，11 个进入固定问题核查并新建引用 |
| `source-codebuff-npm` | `1.0.688@sha512-lPbNFl8D…` → 同一 identity | unchanged |
| `source-codebuff-docs-skills`（docs/tips/skills） | `ac74378642a9…` → `a6ea24958295…` | changed（字节）；归一化正文差异 0 行 |
| `source-codebuff-docs-mcp`（docs/tips/mcp-servers） | `12db11bcdd63…` → `466a29321b60…` | changed（字节）；归一化正文差异 0 行 |
| `source-codebuff-docs-agent-reference`（docs/agents/agent-reference） | `aaeb9a606fa8…` → `2515c7b27df9…` | changed（字节）；归一化正文差异 0 行 |
| `source-codebuff-docs-agents`（docs/agents/overview） | `e53ef287b53d…` → `8da6f65e9991…` | changed（字节）；归一化正文差异 0 行 |
| `source-codebuff-docs-knowledge`（docs/tips/knowledge-files） | `1358e88d1cd8…` → `1cd29497231d…` | changed（字节）；归一化正文差异 0 行 |
| `source-codebuff-docs-troubleshooting`（docs/advanced/troubleshooting） | `33b2f4d05442…` → `25f718731ca9…` | changed（字节）；归一化正文差异 0 行 |
| `source-codebuff-docs-agent-troubleshooting`（docs/agents/troubleshooting-agent-customization） | `3e5de03c733e…` → `915634b96cd9…` | changed（字节）；归一化正文差异 0 行 |
| `source-codebuff-docs-how`（docs/advanced/how-does-it-work） | `c4bc4a099335…` → `5cc57153dbaf…` | changed（字节）；归一化正文差异 0 行 |
| `source-codebuff-docs-quickstart`（docs/help/quick-start） | `b5a14106ce3b…` → `35aebb24bcc4…` | changed（字节）；归一化正文差异 0 行 |
| `source-codebuff-docs-sdk`（docs/advanced/sdk） | `2906f8afb078…` → `f58cc903834b…` | changed（字节）；归一化正文差异 0 行 |

哈希为 64 位内容哈希的前 12 位，完整值见 `audits/codebuff/audit-codebuff-942168de-bfea-482d-a384-2eac2690e5de.yaml`。
十份文档来源的原始字节变了，但按 triage 归一化后正文差异为 0 行，因此没有新建文档引用，也没有改写旧引用。

## 验证与差异入口

本轮实际执行（只读）：

- `diff -rq baseline/codebuff candidates/codebuff`：新增 11 个 artifact、16 个 reference、11 个 snapshot、3 个 chapter edition，
  外加 `registry/chapter-current.yaml` 与审计 YAML 的修改；没有其他文件变化。
- 快照哈希：11/11 与固定工作区 `git cat-file blob` 的 sha256 一致。
- 引用摘录：16 条中 15 条与固定提交的行区间逐字相同；`ref-codebuff-skills-tool-result-20261022` 的 `end` 写 149，摘录
  实际覆盖 138–150（`}) satisfies CodebuffToolHandlerFunction<ToolName>` 在第 150 行），复核时把 `end` 改为 150 即可，
  摘录本身逐字正确。
- 三个新 edition 的 `source_refs` 无悬空引用；registry 指向的三个 edition 文件都存在。
- 未运行：`pnpm maintenance:candidates check`、构建与测试套件（本轮只写报告）。

本地差异入口：

```bash
diff -ru baseline/codebuff candidates/codebuff

# 本轮固定检出 ws-6a83aef15ec7-419981e5-628f-4e81-a5fe-61c52322c2eb 已在聚合闸门后释放；
# 重新检出该 commit 后可执行同一对比：
git diff cd44ddada1bcae3405904410b7d66c1a348e0185 6a83aef15ec76d149cd424e4b431a01248e3ec0b -- <path>
```

改动章节：`knowledge/codebuff/chapters/codebuff-cli-skills-v3.md`、`codebuff-cli-custom-agents-v5.md`、
`codebuff-cli-custom-providers-v4.md`。新增引用见 `knowledge/codebuff/references/*-20261022.yaml`，快照与工件同名同目录。
