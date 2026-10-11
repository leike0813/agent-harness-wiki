# Amp 上游审阅报告 · 2026-10-11（native_plugins / configuration）

## 结论

本 worker 的冻结范围只有两个主题，两处官方文档的语义变化都落在这两个主题上，各自新建一个 edition 并在候选内切换 current：`amp-cli-native_plugins-v2` 与 `amp-cli-configuration-v3`。两章旧版保留不动。

其余四个 changed 来源在本轮被判为无知识影响，排除依据逐条写在下文，不产生章节改动。

## 变化的原件对照与语义

| 来源 | 原件对照 | 实际内容变化 |
| --- | --- | --- |
| source-amp-docs-plugin-api | `0ce9e72dc78c…` → `a8a2c2572e6b…` | `RunAgentOptions` 与 `CreateAgentThreadOptions` 各新增一个 `project?: string` 字段及其 JSDoc |
| source-amp-docs-customize-plugins | `ae4f674e3dee…` → `fbebb8b34b73…` | *Use a Built-in Agent* 一节末尾新增一段，说明默认按 Git remote 选项目以及如何用 `project` 覆盖 |
| source-amp-docs-cli-runners | `9e6c8a498c09…` → `e0abf9d7f7ba…` | 新增 *Use Claude Code on a Runner* 一节；*Troubleshoot a Runner* 新增一条；`PULSE_SERVER` 段落的 GUI 去向由 `Desktop` 页签改写为 `Portals → Desktop` |
| source-amp-manual | `8e74df9eeb8f…` → `866375071c55…` | 仅站点构建身份：CSP `nonce`、`_app/immutable/assets/*.css` 摘要、`.svelte-xxxxxxx` 作用域类名、`__sveltekit_*` 变量名 |
| source-amp-docs-the-dial | `f25a28ed3310…` → `b910105c6adf…` | 新增 *Costs and Limitations*（本机 runner 免费、orb 付费、Painter 与 web/voice 走 Amp credits）与一段企业 *Allowed Models* 说明 |
| source-amp-docs-index | `86f9ca34b43f…` → `69ef4ec675ee…` | 无本范围固定问题可答 |
| source-amp-npm | `0.0.1791476260-g06c5ed` → `0.0.1791676897-g77c125` | 纯发布身份变化 |

排除依据均为直接 diff 原件后确认：manual 的 30 行差异全部落在 nonce / 资产摘要 / CSS 类哈希；the-dial 的新增段落是定价与 credits 措辞，本范围没有以定价为答案的固定问题，因此记为「reviewed，无知识影响」，不新造答案。

## native_plugins：新增 `project` 选项

两份来源一致：线程归属哪个项目默认由工作目录的 Git remote 匹配（在 Orb 里即它的仓库 checkout），`project` 用来显式指定。取值是 `amp --project` 接受的任意引用——项目 ID、`namespace/name`、`owner/repo`、仓库 URL——必须恰好匹配一个可访问项目；线程随后使用该项目的 repository、secrets、Orb 设置与 workspace，因此 workspace 项目才能用 multiplayer 与 workspace 可见性；要求 `executor` 为 `orb`。两份来源都显式警告不要从 webhook payload 之类不可信输入取该值。

落到 `plugins-api`（正文新增两段）与 `plugins-lifecycle`（状态表新增「新线程落在哪个项目」一行）。`plugins.api` 维持 `answered`，`plugins.lifecycle` / `plugins.diagnostics` 维持 `partial`——新增的是可观察项，不是插件健康度或版本查询入口，原有缺口陈述不变。未改动的 `plugins.model` / `plugins.package` / `plugins.install` / `plugins.discovery` 沿用原有来源与措辞。

新增证据：`snapshot-amp-docs-plugin-api-20261011` + `artifact-source-amp-docs-plugin-api-a8a2c2572e6b`、`snapshot-amp-docs-customize-plugins-20261011` + `artifact-source-amp-docs-customize-plugins-fbebb8b34b73`（原件留在原项目 archive，不复制进候选），以及 `ref-amp-pluginapi-project-option`、`ref-amp-plugins-project-option`。

## configuration：runner 上的 Claude Code

`cli/runners` 新增 *Use Claude Code on a Runner*：Claude Code 模式的线程在 runner 那台机器上跑 `claude` 程序，需要 2.1.276 或更新、以运行 `amp --no-tui` 的那个用户登录 Pro/Max、runner 以普通用户运行（Claude Code 不以 root 运行），并在启动 runner 的 shell 里用 `command -v claude` 验证。*Troubleshoot a Runner* 相应新增 **Claude Code Not Found** / **Claude Code Could Not Start** 两条。这落在 `config-runtime`（运行时环境前提）与 `config-diagnostics`（排查条目）两节。

同一来源的 *What to Expect* 段落还推翻了 v2 里「每 30 秒重新取」的说法：现行原文是每个线程启动时取一遍变量，变量改动只对**该目录下新启动的线程**生效，已运行线程保持旧值，目录变量变化时 runner 重启该目录的 MCP server 与插件。这一条正是 `audit-amp-5d3bb590` 留下的 `config.runtime` pending，v3 一并更正并把状态恢复为有据可依。

`PULSE_SERVER` 段落的 `Desktop` → `Portals → Desktop` 只影响 GUI 去向措辞，本范围章节没有任何断言依赖它，故不改章节。

`config.runtime` 仍为 `partial`：完整覆盖优先级表与 profile 概念依旧没有来源。`config.diagnostics` 仍为 `partial`：仍无「打印最终合并结果」的命令。

## 本次变更与保留

| 主题 | 章节版本 | 受影响问题 | 结果 |
| --- | --- | --- | --- |
| native_plugins | amp-cli-native_plugins-v2 | plugins.api、plugins.lifecycle、plugins.diagnostics | 候选内已切换 current |
| configuration | amp-cli-configuration-v3 | config.runtime、config.diagnostics | 候选内已切换 current |

旧 edition `amp-cli-native_plugins-v1`、`amp-cli-configuration-v2` 文件保留不动。未产生任何软件版本映射（官方文档为无版本网页，`version_applicability` 维持 `unknown`）。

## 待处理与复核

未发布（`delivery=pr`，由 monitor/coordinator 集成）；未触发受管二进制。

`review_status` 保持 `pending`：本章引用了未解决的旧审计（`audit-amp-2b69fca7-…`、`audit-amp-20261006t134000z`、`audit-amp-2ef3f03a-…`、`audit-amp-5d3bb590-…`、`audit-amp-03817bfe-…`）。本轮变更属来源语义修订，未推翻宿主运行机制本身，无来源冲突，由作者自检；独立复核由协调者按本轮约定统一安排。

本 audit 的 `pending_question_ids` 为空，仅表示本 worker 范围内无未完问题；本轮其余主题由同一轮其他范围处理。

## 验证与差异入口

```
pnpm maintenance:candidates check --candidate /tmp/ahw-monitor-ae5885a4-b44d-4571-8acc-55d0bcefbcff-clr5On/batch/candidates/amp
```

改动入口：`knowledge/amp/chapters/amp-cli-native_plugins-v2.md`、`amp-cli-configuration-v3.md`、`registry/chapter-current.yaml`、本审计的 yaml 与 md，以及新增 3 个 artifact、3 个 snapshot、5 个 reference 记录。