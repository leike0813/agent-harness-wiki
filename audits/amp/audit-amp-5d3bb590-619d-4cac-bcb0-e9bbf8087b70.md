# Amp 上游审阅报告 · 2026-10-09

## 给维护者的结论

本轮两处官方文档变化里，只有 `the-dial` 的 Tune Modes 改写推翻了已发布断言。`custom_providers` 与 `custom_agents` 各新建一个 edition 并已在候选内切换 current：`amp-cli-custom_providers-v3` 与 `amp-cli-custom_agents-v2`。两处旧版保留不动。

`cli/runners` 的变量更新语义变化同样是真的，但受影响断言只存在于 `configuration` 主题的 `config-runtime` 节，超出本轮冻结主题范围，因此该问题保持 pending，未擅自改动 configuration 选章。

## 变化的意义与证据边界

### Tune Modes：跟随 preset 的角色（source-amp-docs-the-dial）

原件对照：`archive/amp/artifact-source-amp-docs-the-dial-3d6c53a9be34/source.md` → `archive/amp/artifact-source-amp-docs-the-dial-f25a28ed3310/source.md`（sha256 `f25a28ed…`，与本审计 `observed` 一致）。变化集中在 *Use a ChatGPT Subscription* 一节的末尾两段：

- 原文「These are ordinary pins: press the preset again or change any role to undo them.」被替换为「Each of these roles follows the preset instead of holding its own copy of the model.」，并新增单角色覆盖与角色级 **Preset** / **Auto** 按钮语义。
- 同一节的 *Tune the Modes* / *Automatic Models and Reasoning Effort* 各段逐字未变，因此 `providers.models`、`providers.metadata`、`providers.responses`、`agents.limits` 的答案维持原样。

被推翻的已发布断言两处，均在 `providers-auth`：

1. `amp-cli-custom_providers-v2` 把 preset 写成「把各个角色钉到 OpenAI 模型上」，并引用 `ref-amp-dial-chatgpt-pins` 的「2026-09-28 之前登录的订阅，Amp 已经替你保存了这些 pin」。新观测原件里**没有**这一日期句，且不再把这些角色称作普通 pin。
2. `amp-cli-custom_agents-v1` 的 `agents-roles` / `agents-overrides` 完全没有这一层跟随语义。

新增证据：`snapshot-amp-docs-the-dial-20261006` + `artifact-source-amp-docs-the-dial-f25a28ed3310`（指向原项目 archive，不复制进候选），以及 `ref-amp-dial-preset-follow`、`ref-amp-dial-preset-role-override`、`ref-amp-dial-subscription-auto-off`。旧的 `ref-amp-dial-chatgpt-pins` 保留文件但不再被 v3 引用。

仍然缺的：官方文档为无版本网页，`version_applicability` 维持 `unknown`，本轮不产生任何软件版本映射。

### runner 变量更新语义（source-amp-docs-cli-runners）

原件对照：`1fccd189…` → `9e6c8a49…`。*How It Works* 由「每 30 秒重取」改为「This works like an orb, which gets its variables when it starts」；*What to Expect* 改为「该目录下一个新启动的线程拿到新值，已在运行的线程保持旧值直到同目录新线程启动」，并保留「不需重启 runner」。

`custom_providers` / `custom_agents` 两章没有 runner 变量断言，无需修订。断言在 `amp-cli-configuration-v2` 的 `config-runtime`（「并每 30 秒重新取」），已登记为 impact 并保持 `config.runtime` pending。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_providers | amp-cli-custom_providers-v3 | providers.auth：answered（重写依据）；providers.models/metadata/responses 状态不变 | 候选内已切换 current |
| custom_agents | amp-cli-custom_agents-v2 | agents.roles：answered；agents.overrides：answered | 候选内已切换 current |
| configuration | amp-cli-configuration-v2（保留） | config.runtime：partial，待修订 | 保留旧版，问题 pending |

**发布：** 未发布（`delivery=pr`，由 monitor/coordinator 集成）。**受管二进制：** 未触发。

## 待处理与独立复核

**审计记录：** `audits/amp/audit-amp-5d3bb590-619d-4cac-bcb0-e9bbf8087b70.yaml`。**待处理旧审计：** `audit-amp-2b69fca7-dcf4-40ed-8ff6-b789e1663779`、`audit-amp-20261006t134000z`、`audit-amp-2ef3f03a-a1b9-41b8-9418-a16b119f8e7b`（均 `review_status: pending`）。

**待复核问题：** 无。本轮属来源语义修订、未推翻运行机制本身，也无来源冲突，按常规更新由作者自检即可；`review_status` 仍为 `pending`，因为引用了未解决的旧审计。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-amp-docs-the-dial | 3d6c53a9be34… → f25a28ed3310… | changed；仅 ChatGPT 订阅一节末尾改写，已逐段复核 |
| source-amp-docs-cli-runners | 1fccd189945c… → 9e6c8a498c09… | changed；变量更新语义改写，已逐段复核 |
| source-amp-docs-cli-execute-mode / customize-global-plugins-and-skills / customize-mcp / customize-plugins / plugin-api | 无可比对旧原件 → 各自 observed | changed；本工作树内无可比对旧原件，按 unknown 处理，未写成无影响 |
| source-amp-manual | 27b549765116… → e5896f5ae2d2… | changed；长期假阳性（SSR 逐请求生成 CSP nonce），未据此改写任何事实 |
| source-amp-npm | 0.0.1791288059-gdc93b0 → 0.0.1791476260-g06c5ed | changed；版本身份变化本身不构成章节影响，未造映射 |

## 验证与差异入口

```
pnpm maintenance:candidates check --candidate var/harness-monitor/run-20261009t020000z/batch/candidates/amp
```

通过（exit 0）。未运行全库 `knowledge:validate` / `sources:audit-log`（由父进程在集成后运行）。

改动入口：`knowledge/amp/chapters/amp-cli-custom_providers-v3.md`、`amp-cli-custom_agents-v2.md`、`registry/chapter-current.yaml`、`audits/amp/audit-amp-5d3bb590-*.yaml` 与同名 `.md`，以及新增的 1 个 artifact、1 个 snapshot、3 个 reference 记录。
