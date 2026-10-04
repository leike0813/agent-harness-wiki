# Grok CLI 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮没有需要改写的知识。派给我的巡检输入把 grok 记成 `blocked`，但那是单一来源的一次取数失败，不是 grok 的真实上游状态：我自己重跑 `pnpm sources:scan grok` 之后，10 个登记来源全部观察成功，9 个未变，唯一的 `changed` 是 npm 包 `@xai-official/grok` 的版本前移。

grok 已发布的九个章节版本全部锚在固定源码提交 `2bdd1d6a` 与已归档的官方文档上，没有任何 `source_refs` 指向 npm 来源，产品也没有 `mappings/`。因此这次版本前移落不到任何固定问题或小节上，本轮只结案审计，不新建章节、不动 `registry/chapter-current.yaml`。

唯一值得后续处理的是：受管包记录的 1.0.44 已落后上游两个版本。取得包字节属于受管刷新，`delivery=pr` 不执行，留给合并后的 `harness-binary` 核对。

## 变化的意义与证据边界

### npm 来源先失败、后恢复，并暴露版本差

父进程导出的巡检输入 `audit-grok-1276c724-a4ae-4000-89f8-fa5ea715110a`（`status: blocked`）记录 `source-grok-npm` 的 `error` 为 `fetch failed`，其余 9 个来源 `unchanged`。我在同一天 17:04Z 重跑本产品扫描，npm 来源恢复并返回身份 `1.0.46@sha512-qXO4myJFAQCIZNjMJWAaJ0TTUgi2WrQpnYYtrdd9hQ8TYezPH0slSHBYgxqedlwgcHVdqBiiDXULHkIdBDzkyQ==`。失败方式是那一次观察的网络取数，不是来源不可得，也没有任何问题被它阻塞——所以本轮没有残留的 `pending`。

grok 此前没有 `npm_release` 快照，扫描器取不到基线，npm 检查因此按「无基线观察」记 `changed` 而非「相对上一版本变化」。已知的受管包身份来自 `knowledge/grok/artifacts/artifact-grok-npm.yaml`（`research/package-set` 锁定 1.0.44），与观察到的 1.0.46 相差两个发布版本。

这层差异的证据只到 registry 元数据：版本号与 integrity。我没有取包字节，因此不知道 1.0.45/1.0.46 改了什么，也不据此写任何版本映射——按 maintenance 第 3 节，npm 版本变化本身不构成章节变化或源码到包的映射。

### 复述型不变：固定提交与文档快照逐字相同

Git 来源 HEAD 仍是 `2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8`，与 `snapshot-grok-repo` 固定的提交相同；8 个 `official_documentation` 来源的 observed 与各自快照的 `raw_sha256` 逐字相同。被引用小节的正文字节未变，扫描器的 `impacts` 为空，因此本轮没有打开任何来源工作区，也没有新增 `git_source_file`。

### 既有 conflict 未被本轮触碰

已发布的两处 `conflict` 答案——`custom_agents` 的 `agents.limits`（`subagents.max_depth` 是否可配置）与 `native_plugins` 的 `plugins.install`——其来源 `subagents.md` 与 `skills-plugins-marketplaces.md` 本轮内容未变。冲突两侧与各自边界已在正文并列，本轮不重新判定。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | grok-cli-skills-v2 | 无（来源未变） | 保留旧版本 |
| mcp | grok-cli-mcp-v1 | 无（来源未变） | 保留旧版本 |
| custom_agents | grok-cli-custom_agents-v1 | 无（`agents.limits` 仍为既有 conflict） | 保留旧版本 |
| custom_providers | grok-cli-custom_providers-v1 | 无（来源未变） | 保留旧版本 |
| hooks | grok-cli-hooks-v2 | 无（来源未变） | 保留旧版本 |
| native_plugins | grok-cli-native_plugins-v1 | 无（`plugins.install` 仍为既有 conflict） | 保留旧版本 |
| configuration | grok-cli-configuration-v1 | 无（来源未变） | 保留旧版本 |

**发布：** 无读者可见变化，仅结案审计；`delivery=pr` 未运行 `pnpm ahw publish`／`pnpm chapters:update`，未切换发布指针。**受管二进制：** 本轮不触发（`delivery=pr`）；`@xai-official/grok` 的 1.0.44 → 1.0.46 差异作为 `harness-binary` 的后续输入。

## 待处理与独立复核

**审计记录：** [audit-grok-16f5e9a9-cfc4-4ed8-8074-6f995d1d55e6.yaml](audit-grok-16f5e9a9-cfc4-4ed8-8074-6f995d1d55e6.yaml)。**待处理旧审计：** 无（`audits/grok` 在本轮之前没有记录）。**待复核问题：** 无。本轮无来源冲突、无来源推翻已发布配置步骤、无跨主题关键加载机制变化，三类高影响情形都未触发，未委派独立复核 Agent。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| [source-grok-repo](https://github.com/xai-org/grok-build.git) | 2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8 → 同 | unchanged；源码树未变 |
| [source-grok-docs-overview](https://docs.x.ai/build/overview.md) | 8c85c95a… → 同 | unchanged；正文未变 |
| [source-grok-docs-skills-plugins](https://docs.x.ai/build/features/skills-plugins-marketplaces.md) | 8a43a340… → 同 | unchanged；正文未变 |
| [source-grok-docs-mcp](https://docs.x.ai/build/features/mcp-servers.md) | e0b9ce6b… → 同 | unchanged；正文未变 |
| [source-grok-docs-hooks](https://docs.x.ai/build/features/hooks.md) | 4f013d76… → 同 | unchanged；正文未变 |
| [source-grok-docs-subagents](https://docs.x.ai/build/features/subagents.md) | 42511685… → 同 | unchanged；正文未变 |
| [source-grok-docs-modes](https://docs.x.ai/build/modes-and-commands.md) | 606a0391… → 同 | unchanged；正文未变 |
| [source-grok-docs-headless](https://docs.x.ai/build/cli/headless-scripting.md) | a4f39daf… → 同 | unchanged；正文未变 |
| [source-grok-docs-project-rules](https://docs.x.ai/build/features/project-rules.md) | 1077d4bf… → 同 | unchanged；正文未变 |
| [source-grok-npm](https://registry.npmjs.org) | 无基线（无 `npm_release` 快照） → 1.0.46@sha512-qXO4myJF… | changed；巡检输入那次为 `blocked`（`fetch failed`），重跑后恢复取到身份。受管包记录仍为 1.0.44 |

## 验证与差异入口

在仓库根运行：`pnpm knowledge:validate`（通过）、`pnpm sources:audit-log`（通过）、`git diff --check`（无输出）、`git status --short --untracked-files=all`（grok 仅新增本审计的 `.yaml` 与 `.md`；工作区其余改动属本轮其他产品，未触碰）。

本轮 grok 没有章节版本、来源引用或映射改动可链接；唯一新增的是本审计对与本报告。

```sh
git diff -- audits/grok knowledge/grok
git status --short --untracked-files=all -- audits/grok knowledge/grok
```
