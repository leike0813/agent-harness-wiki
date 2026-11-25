# Command Code 上游审阅报告 · 2026-11-25

## 给维护者的结论

本轮 19 个登记来源里 18 个官方文档来源 hash 变化、npm 未变。逐页比对可见文本（去掉 `script`/`style`/标签后按行 diff）后，**只有三份文档有语义变化**，其余 15 份是站点重建造成的 markup/build 噪声：

- `/docs/byok`：Provider fields 表新增 provider 级 `zdr` 字段，规定只有声明 `zdr: true` 的 provider 其模型才在 `CMD_ZDR=1` 下运行，否则被拒绝；非 boolean 值给警告并被忽略。
- `/docs/settings`：`effort` 的说明从 “Global reasoning effort” 改为 “Reasoning effort for every model. Set in a project's settings files, it outranks the per-model `reasoningEffort` that `/effort` saves”。
- `/docs/reference/cli`：`--effort <level>` 从 “set for the session” 改为 “this session only … Not saved: use `/effort` or `--config effort=<level>` to change the default”。

因此本轮产出两个新章节版本：`custom_providers` → `command-code-cli-custom_providers-v2`，`configuration` → `command-code-cli-configuration-v3`。其余六个主题不动，旧 edition、旧快照与旧引用字节不变。

## 变化与问题映射

### `zdr`（custom_providers，同时是 configuration 的 cross-topic 事实）

新行（逐字）：`zdr` | `true` | “You vouch that this endpoint keeps no data (a local model, or your own gateway enforcing ZDR). Only then do its models run under `CMD_ZDR=1`; without it they are refused there. Any non-boolean value warns and is ignored”。

这是 provider 定义的字段，不是请求体参数：它决定 `CMD_ZDR=1` 时该 provider 的模型是否被放行。按固定问题归属落在：

- `providers.forwarding`：问题明确问“哪些配置仅影响界面/路由”；`zdr` 不进请求体、只改路由门控，原答案“文档没有给出路由字段清单”因此补上这一已知例外。
- `providers.responses`：补 BYOK 端在 `CMD_ZDR=1` 下的放行/拒绝条件，与既有的 Provider API 侧 `x-cmd-zdr` 语义并列。
- `providers.auth` / `providers.metadata` 未改：`zdr` 不是凭据、环境变量或 base URL，也不是模型级能力元数据（`contextWindow`/`maxOutput`/`reasoning*`）；把它塞进这两题会误导读者。

新引用 `ref-cc-byok-zdr-field` 固定在观察到的 `/docs/byok` 快照；configuration 的 `config.runtime` 在 `CMD_ZDR` 行下补一句 BYOK 附带要求并引用同一条，保证跨主题说法一致。

### `effort` 作用域（configuration）

- `config.overrides`：新增独立段落。项目 settings 文件里的 `effort` 压过 `/effort` 保存的按模型 `reasoningEffort`。文档只给了这一条相对顺序，未说明用户级 `settings.json` 的 `effort` 与按模型值谁先，也未说明与旧 `config.json` 的 `reasoningEffort` 之间的顺序——这些在正文里写为缺口。
- `config.runtime`：`--effort` 只作用于当次会话、不保存；改默认值用 `/effort` 或 `--config effort=<level>`。

`config.defaults` 未改：该题的键表只列 key 名与默认值，`effort` 默认值仍是 `-`，变化的不是默认值而是与其他来源的相对优先级。

## 排除的噪声（15 份来源）

`agents`、`context`、`headless`、`hooks`、`import`、`mcp`、`memory`、`mods`、`permissions`、`provider`、`reference/slash-commands`、`resources/security`、`skills`、`troubleshooting/common-issues`、`troubleshooting/telemetry`：去掉 `script`/`style`/注释/标签后，可见文本逐行 diff **0 行**；只有 Next.js buildId/chunk 引用、内联样式与空白差异。这些主题的章节、答案与引用未改。

npm 来源仍是 `1.93.3@sha512-iupga…`，不涉及包字节、版本映射或受管二进制（`delivery=pr`）。

## 本次候选与保留

<!-- prettier-ignore -->
| 事项 | 内容 |
| --- | --- |
| 新章节版本 | `command-code-cli-custom_providers-v2`、`command-code-cli-configuration-v3` |
| 新快照/引用 | `snapshot-source-command-code-docs-byok-be12831717b0` → `ref-cc-byok-zdr-field`；`snapshot-source-command-code-docs-settings-4b85ed0a6e86` → `ref-cc-settings-effort-scope`；`snapshot-source-command-code-docs-reference-cli-d56bfc7f4622` → `ref-cc-cli-effort-flag` |
| 选章 | `custom_providers` → v2；`configuration` → v3；其余六个主题保持原 edition |
| 保留 | 旧快照、旧 artifact、旧引用与 v1/v2 章节字节未动 |
| 发布 | `delivery=pr`：未运行 `chapters:update` / `ahw publish` / `managed:packages`，未切发布指针 |

## 待处理与独立复核

三类高影响触发都不成立：三份改动来源之间没有冲突；`zdr` 是新增字段而非推翻已发布的配置步骤（`CMD_ZDR` 行为只是补充 BYOK 侧条件）；没有跨主题加载机制变化。因此按普通更新由作者自检结案，`review_status: reviewed`。

**审计：** `audit-command-code-2d2ea310-b42c-4760-aede-8bf6f069f38c.yaml`。**待复核问题：无（`pending_question_ids: []`）。**

`pending_audit_refs` 置空只表示本审计不再引用 `de61b740`、`613f0cb0`、`89f93372`、`7b51087b`、`3b6b4b85` 五份历史审计；它们各自的未完成 pending 状态**未被本审计关闭或改写**，历史 pending 审计原样保留。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察（前 12 位） | 结论 |
| --- | --- | --- |
| source-command-code-docs-agents | 37a46377933e → 00d129184cee | changed；可见文本 0 行差异，markup 噪声 |
| source-command-code-docs-byok | e9d5ac4105a7 → be12831717b0 | changed；Provider fields 新增 `zdr` 5 行 → 维护 custom_providers v2 + configuration v3 |
| source-command-code-docs-context | 5e5e56112e33 → b295925b462d | changed；0 行差异 |
| source-command-code-docs-headless | 1431c1b7e95f → 19a8e781bb27 | changed；0 行差异 |
| source-command-code-docs-hooks | dbdedfb4f60f → d753551ab36e | changed；0 行差异 |
| source-command-code-docs-import | 5f25331618b0 → b49d8a9763fd | changed；0 行差异 |
| source-command-code-docs-mcp | cfd665c9a867 → 5277bf7444fb | changed；0 行差异 |
| source-command-code-docs-memory | ce3f4e10f415 → 9bfbe6b052c3 | changed；0 行差异 |
| source-command-code-docs-mods | 08c303b19402 → d0813d003534 | changed；0 行差异 |
| source-command-code-docs-permissions | 5f3383c23955 → 7785b835858a | changed；0 行差异 |
| source-command-code-docs-provider | 3bee839b7b43 → e172251ce502 | changed；0 行差异 |
| source-command-code-docs-reference-cli | fb4ba75f3f39 → d56bfc7f4622 | changed；`--effort` 7 行改写 → 维护 configuration v3 `config.runtime` |
| source-command-code-docs-reference-slash-commands | d4adc1fc0188 → 7946118d8d44 | changed；0 行差异 |
| source-command-code-docs-resource-security | 3d545be0b49b → 180448a7e4e9 | changed；0 行差异 |
| source-command-code-docs-settings | 5b777ad99a1b → 4b85ed0a6e86 | changed；`effort` 6 行改写 → 维护 configuration v3 `config.overrides` |
| source-command-code-docs-skills | d2d5961533d9 → c18bf6b2be38 | changed；0 行差异 |
| source-command-code-docs-troubleshooting-common-issues | 0618b01759cc → 2a9a06765924 | changed；0 行差异 |
| source-command-code-docs-troubleshooting-telemetry | b9778348267e → 9b360cb887fe | changed；0 行差异 |
| source-command-code-npm | 1.93.3 → 1.93.3（integrity 未变） | unchanged；不建映射 |
