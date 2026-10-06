# Warp 上游审阅报告 · 2026-10-06

## 给维护者的结论

Warp 官方文档本轮有四个来源发生语义变化：模型清单页、BYOK 页、Rules 页与 Slash Commands 页。真正需要动章节的是前两个和第四个。模型清单页重写了几乎所有供应商表（OpenAI 新增 `gpt-6-1-sol-*`、下线 `gpt-5-3-codex-*`，Anthropic 表换成「Supported model_id values + Default model_id」两列，Fireworks 表换掉四个 ID），BYOK 页新增 ChatGPT 订阅这条路线、同时**删掉了**原来描述 SuperGrok 连接步骤的整段。已发布的 `custom_providers` 章节正好点名了三个被下线的 `model_id`，并把 SuperGrok 的授权路径写成了事实——两处都必须改。

改动落在三个新版本上：`warp-desktop-custom_providers-v3`、`warp-desktop-custom_agents-v2`、`warp-desktop-skills-v2`。原有的 v2/v1 版本原样保留，因为 v2 已经合入 main，不能原地改。

SuperGrok 的处理值得单独说一句：那一段被删掉之后，BYOK 页还能支撑的只剩「订阅可连接、token 存本机」，入口路径和浏览器授权流程在任何已登记来源里都查不到了——它们其实在 `grok-subscription` 与 `chatgpt-subscription` 两个独立文档页上，而这两页没有登记为本产品的固定来源，本轮归档集合里也没有它们的原件。因此 `providers.auth` 从 answered 降级为 partial，并写明已查入口与缺口，而不是硬撑一个看起来完整的答案。

`configuration` 与 `hooks` 两个主题本轮不需要新版本：Rules 页删掉的是 `/add-rule` 与 `/init` 的输入模式限定，而这两条限定从未出现在 configuration 章节里；Slash Commands 的适用范围改写也不影响「桌面端没有 agent 生命周期 hook」这个结论。

风险集中在四个本轮无法判定的来源上，详见「待处理与独立复核」。

## 变化的意义与证据边界

### 模型清单重写（custom_providers）

影响 `providers.models`、`providers.metadata`、`providers.diagnostics` 三个问题与 `{#providers-models}`、`{#providers-diagnostics}` 两个小节。上一版的 Fireworks 清单点名了 `glm-5.2-fireworks`、`kimi-k27-code-fireworks`、`deepseek-v4-pro-fireworks`，本轮全部下线，改为 `glm-5.3-fireworks` 与 `deepseek-v4.1-flash-fireworks`。

引用能证明到的边界：新的 `model_id` 表来自 `snapshot-warp-docs-model-choice-20261006`，分供应商逐段固定（OpenAI 表头与前两行、OpenAI 表尾与 ChatGPT 说明、Anthropic 表头与 Opus 两行、`-thinking` 两行、Google 表、Fireworks 表、xAI 表）。仍然缺的是结构化能力元数据——上下文窗口、输出上限、视觉与工具字段在页面上不存在，所以 `providers.metadata` 维持 partial，只是把「推理档位如何编码」这一半写得更准（OpenAI 的后缀词表与各家族实际取值范围、Anthropic 的 `-xhigh-fast` / `-thinking` 与每族默认 ID）。

顺带修掉一处旧引用错位：上一版把「`model_id` 可用于 Automation Platform 或 CLI」和 xAI 分档 ID 都挂在 `ref-warp-models-available-20261004` 上，而那条摘录实际只有 Auto 模型表的两行。新版本分别用 `ref-warp-models-scope-20261006` 与 `ref-warp-models-xai-20261006` 固定原文。

模型清单仍然是滚动变化的，不因为本轮差异就建立任何版本映射；三个新快照的 `version_applicability` 都是 unknown。

### SuperGrok 依据失效（custom_providers）

影响 `providers.auth`、`providers.entry`、`{#providers-auth}`、`{#providers-entry}`。旧章节的「在 Settings > Agents > Warp Agent 里选择连接，Warp 打开浏览器完成授权；token 存本机」整句，唯一页内依据就是被删除的那一段。

替代依据是仍保留的路线表行：「Connect your SuperGrok subscription to use Grok models through your xAI account. Tokens are stored locally on your device.」，加上同页新增的 FAQ——可连接的订阅是 SuperGrok 与 ChatGPT，**Claude 订阅不可连接**。这条 FAQ 同时把 ChatGPT 订阅从「不可用」翻转成可用，因此 `{#providers-entry}` 的路线表从四条改为五条。

仍缺的是授权流程本身。`providers.auth` 因此记 partial：BYOK key 与自定义端点凭据两半是完整的，订阅类路线只保留「token 存本机」这一条有来源的事实。

### 返修轮（第 2 轮，changes_requested）

事实层全部通过，问题只在引用层，逐条处理如下。

「五条路线」这句原来引 `ref-warp-byok-compare`，而它绑定的是 10-04 旧快照，摘录里只有 BYOK 与 custom endpoint 两行——计数与所引快照直接矛盾。想新建一条固定整张表的引用，但五行表在 800 字符上限内放不下（source.md 第 26–30 行共 1247 字符）。改按行段拆分，三条引用合起来覆盖全部五行，且都锚在当前快照上：`ref-warp-byok-routes-key-endpoint-20261006`（26–27 行）、`ref-warp-byok-routes-byollm-20261006`（28 行）、已有的 `ref-warp-byok-subscription-routes-20261006`（29–32 行）。`ref-warp-byok-compare` 从 v3 的 `{#providers-entry}` 与 `providers.entry` 引用中移除，v1、v2 仍引用它。

OpenAI 后缀那处按原文收紧：第 31 行只是声明 `low`…`max` 是档位词表，实际 GPT-6 四个家族才有 `-max`，GPT-5.6 三个变体、GPT-5.5、GPT-5.4 各行止于 `-xhigh`。原来的写法容易被读成 `gpt-5-4-max` 存在。

两处差分断言原先只有「当前不在表内」这一侧证据，补上另一侧：新增 `ref-warp-models-openai-codex-20261004`（10-04 快照 raw.md 68–71 行）与 `ref-warp-models-fireworks-20261004`（同快照 162–171 行），上一轮确实在表内这件事有了固定出处，断言可以保留而不必弱化成纯当前态。

`{#providers-auth}` 清掉了正文不再引用的 `ref-warp-byok-compare` 与 `ref-warp-byok-subscription-faq-20261006`。BYOLLM 行按新快照补回了原文的「Azure Foundry coming soon」。

未改动的部分：`providers.auth` 维持 partial；platform credits 条件仍只记在审计 notes 里；`ref-warp-rules-create` 与 `ref-warp-byok-enterprise` 两条无人引用的旧摘录保持原样；`registry/chapter-current.yaml` 未修改。

### Slash Commands 适用范围改写（custom_agents、skills）

影响 `agents.invocation` 与 `skills.invocation`。表述从「Agent Mode or Auto-Detection Mode」改为「terminal mode or Agent Mode」，这是一条生效条件，属于显式调用入口。静态命令表逐行未变，因此 `ref-warp-slash-static` 的定位继续成立，新条件另立 `ref-warp-slash-modes-20261006` 固定在 `snapshot-warp-docs-slash-commands-20261006` 上。两个主题各新建一个版本，只在既有小节里补一句。

Rules 页删除 `/add-rule` 与 `/init` 的输入模式限定属于同一类事实，但它不落在任何已发布章节的小节里：`config.migration` 引用的规则文件事实（`WARP.md` 与 `AGENTS.md` 共存时的优先级、改名、继续支持）在新原件中逐字未变。按「来源变化未影响既有结论」结案，不制造没有差异的新版本。

### 四个来源无法判定

`custom-endpoint`、`custom-routers`、`orchestration`、`skills` 四个来源本轮都是 changed，但本工作树内没有与本轮 baseline 可比对的旧原件，无法逐行判定差异。已查入口与缺口如实记录，相关问题保持 pending，没有按「无影响」结案。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_providers | warp-desktop-custom_providers-v3 | providers.entry：answered；providers.auth：partial（由 answered 降级）；providers.models：answered；providers.metadata：partial；providers.diagnostics：answered | 已进入新版本，v1/v2 保留 |
| custom_agents | warp-desktop-custom_agents-v2 | agents.invocation：answered（新增生效条件引用） | 已进入新版本，v1 保留 |
| skills | warp-desktop-skills-v2 | skills.invocation：answered（新增生效条件引用） | 已进入新版本，v1 保留 |
| configuration | warp-desktop-configuration-v2 | config.migration：answered（复核后未变） | 保留旧版本，来源变化不影响既有结论 |
| hooks | warp-desktop-hooks-v1 | hooks.conditions：answered（复核后未变） | 保留旧版本，来源变化不影响既有结论 |

**发布：** 未发布。本轮为 `delivery=pr` 的隔离候选，worker 不切换本地指针、不运行 `ahw publish`、不执行受管二进制；章节当前版本的选择由父进程在集成阶段统一更新。 **受管二进制：** 未触发，`delivery=pr` 下 worker 永不执行。

## 待处理与独立复核

**审计记录：** `audits/warp/audit-warp-maint-20261006t134000z.yaml`。 **待处理旧审计：** `audit-warp-9a15fd51-3107-4a94-a23b-8bdf65b9a29b`、`audit-warp-20261006t134000z`、`audit-warp-d5ea839e-1575-4b9d-98e9-619637fcd19f` 三份仍未结案。 **待复核问题：** 无高影响项待独立复核。本轮改动是文档措辞与清单更新，没有来源冲突、没有推翻已发布配置步骤的机制变化、没有跨主题加载机制改变；`providers.auth` 的降级是保守方向（少断言），不构成高影响结论。

未判定问题（保持 pending）：`providers.protocol`、`providers.forwarding`（custom-endpoint / custom-routers）、`agents.roles`、`agents.limits`（orchestration）、`skills.format`、`skills.extensions`、`skills.collision`（skills 文档页）。解除条件是拿到与 baseline 可比的旧原件，或把上述来源登记为固定来源并归档后重新判定。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-warp-docs-model-choice | f24a7b468938… → 3750069e8c27… | changed；模型表重写，含 ChatGPT 订阅接入说明 |
| source-warp-docs-byok | cd5e911993c2… → 34c598319cc9… | changed；新增 ChatGPT 订阅行与 FAQ 反转，删除 SuperGrok 连接步骤段 |
| source-warp-docs-rules | 60c31de8620e… → 562e81998199… | changed；仅删除 `/add-rule`、`/init` 的输入模式限定 |
| source-warp-docs-slash-commands | 102f50030c77… → 54ab6fa568fc… | changed；适用范围改为 terminal mode / Agent Mode |
| source-warp-docs-custom-endpoint | d5a3f299004d… → 650fa5e5bb17… | changed；无可比旧原件，未判定 |
| source-warp-docs-custom-routers | 761fe76435ff… → 2ca45fc15602… | changed；无可比旧原件，未判定 |
| source-warp-docs-orchestration | d4510d74a122… → f23741496ee5… | changed；无可比旧原件，未判定 |
| source-warp-docs-skills | cf1a50cba91e… → 5fd081c21e5f… | changed；无可比旧原件，未判定 |

父进程已排除的 11 个构建噪声来源（agent-notifications、agent-profiles、env-vars、file-locations、integrations、launch-configs、mcp、notifications、ssh-extension、warp-drive、yaml-workflows）本轮未重复调查，也未列入本审计的 checks。

## 验证与差异入口

已运行：

```sh
pnpm maintenance:candidates check --candidate /tmp/ahw-batch-20261006a/candidates/warp
```

结果为 exit 0，候选单产品校验通过（章节数据集 + 审计台账）。此外逐条核对了 16 条新引用的摘录在其 `file_lines` 区间内与 archive 原件逐字一致、长度均不超过 800 字符，三个新快照的 `raw_sha256` 与原件内容一致。本候选相对基线共新增 27 个文件，未修改任何既有文件。

未在本候选运行：`pnpm knowledge:validate`、`pnpm sources:audit-log`、`pnpm verify`、`pnpm online:build`——这些是父进程集成后的聚合门禁，需要全库输入，候选阶段运行会误报其他产品缺失。`registry/chapter-current.yaml` 未修改。

查看本轮改动：

```sh
diff -ru /tmp/ahw-batch-20261006a/baseline/warp /tmp/ahw-batch-20261006a/candidates/warp
```
