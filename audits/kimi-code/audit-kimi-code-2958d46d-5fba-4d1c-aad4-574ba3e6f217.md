# Kimi Code 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮 Kimi Code 的上游没有真正移动，七个主题的章节一个字都不用改。扫描报出的 `changed` 全部来自 npm 来源，而它是缺少基线造成的假阳性：观察到的 `2.1.1@sha512-xClqcn…/li5JaJNyw==` 与已登记的 `artifact-kimi-code-npm` 逐字一致。

两个 Git 仓库同样停在原提交上，所以我没有打开来源工作区、没有读源码、没有新增任何引用或映射。这一轮只结案审计。

需要你留意的不是知识，而是这个假阳性会一直复发：只要 kimi-code 缺 `npm_release` 快照，每轮巡检都会把 npm 报成 changed，把 `requires_maintenance` 永远点亮。

## 变化的意义与证据边界

### npm 来源的 changed 是基线缺失，不是版本变化

`source-kimi-code-npm` 的 check 里没有 `baseline` 字段。原因在扫描器的基线来源：它只从同来源的历史审计，或者 `knowledge/<产品>/snapshots/` 下 `kind: npm_release` 的快照取基线。kimi-code 两个快照都是 `source_revision`（对应两个 Git 仓库），npm 的身份只记在 `artifact-kimi-code-npm`，而那条记录是 `kind: managed_package`，不参与基线计算。

基线为空时 `observed === baseline` 恒为 false，状态就固定为 `changed`。这解释了为什么本轮输入文件和我的扫描给出同样的 npm 状态，也解释了为什么它不会因为版本没动而变回 unchanged。

判定「没有版本变化」依据的是两处一致，而不是版本号本身：npm registry 当次返回的 `2.1.1@sha512-xClqcn…`，与 `artifact-kimi-code-npm` 里的 `version: 2.1.1` 加同一条 `integrity` 完全吻合。

### 两个 Git 来源

`source-kimi-code-repo` 观察值 `21406fb4c805cc8c715e6d1f16ad3fb5f25f4fe3` 与基线相同；`source-kimi-code-legacy-repo` 观察值 `9ab1286b8fe4e6bcd116949a27ce5e0ac3389c82` 与基线相同。两者都没有 `changed_paths`，但既然连提交都未移动，就没有需要展开复查的候选路径，读取源码不会产出新证据。

章节引用的快照正是这两个提交（`references/` 里 115 条指向 `snapshot-kimi-code-repo`，2 条指向 legacy），来源范围未变，因此小节与问题 ID 的引用范围保持原样。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | kimi-code-cli-skills-v1 | 无受影响问题 | 保留旧版本：来源未变 |
| mcp | kimi-code-cli-mcp-v2 | 无受影响问题 | 保留旧版本：来源未变 |
| custom_agents | kimi-code-cli-custom_agents-v2 | 无受影响问题 | 保留旧版本：来源未变 |
| custom_providers | kimi-code-cli-custom_providers-v1 | 无受影响问题 | 保留旧版本：来源未变 |
| hooks | kimi-code-cli-hooks-v2 | 无受影响问题 | 保留旧版本：来源未变 |
| native_plugins | kimi-code-cli-native_plugins-v1 | 无受影响问题 | 保留旧版本：来源未变 |
| configuration | kimi-code-cli-configuration-v2 | 无受影响问题 | 保留旧版本：来源未变 |

**发布：** 仅结案审计，无本地发布。`delivery=pr` 轮次不运行 `pnpm ahw publish` 与 `pnpm chapters:update`，也不改 `registry/chapter-current.yaml`；上面七个 edition 已与 `registry/chapter-current.yaml` 中的选择一致，建议维持现状，无需父进程改动选版。**受管二进制：** 未触发，`delivery=pr` 轮次不做受管二进制核对。

## 待处理与独立复核

**审计记录：** [audit-kimi-code-2958d46d-5fba-4d1c-aad4-574ba3e6f217.yaml](audit-kimi-code-2958d46d-5fba-4d1c-aad4-574ba3e6f217.yaml) **待处理旧审计：** 无。**待复核问题：** 无。本轮没有来源互斥，没有新来源推翻已发布配置步骤，也没有跨主题加载机制变化，按普通更新自检结案。

留给维护者的一项待办（不属于本轮知识范围）：若希望 npm 来源日后如实报 unchanged，需要补一条 `snapshot-kimi-code-npm`（`kind: npm_release`，指向已有的 `artifact-kimi-code-npm`）。我没有代写，因为该记录的 `target.distribution` 需要平台三元组，而这个值只能由受管包核对得出；猜测填写会把未经核验的平台身份写进知识。同批的 claude-code、codex、omp、opencode、pi 都已有 `npm_release` 快照，kimi-code 是缺的那一个。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| [source-kimi-code-repo](https://github.com/MoonshotAI/kimi-code.git) | `21406fb4…` → `21406fb4…` | unchanged；内容无变化，HEAD 未移动 |
| [source-kimi-code-legacy-repo](https://github.com/MoonshotAI/kimi-cli.git) | `9ab1286b…` → `9ab1286b…` | unchanged；内容无变化，HEAD 未移动 |
| [source-kimi-code-npm](https://registry.npmjs.org/@moonshot-ai/kimi-code) | 无基线 → `2.1.1@sha512-xClqcn…/li5JaJNyw==` | changed（假阳性）；内容无变化，观察身份与 `artifact-kimi-code-npm` 一致 |

## 验证与差异入口

本轮在仓库根运行 `pnpm knowledge:validate`、`pnpm sources:audit-log`、`git diff --check` 与 `git status --short --untracked-files=all`，结果见交付回复。这些命令覆盖全树，属于其他产品的诊断只记录不改。

本轮改动仅两个文件，均在 `audits/kimi-code/`：审计 YAML（补 `investigation_notes`、`reviewed_by`、`reviewed_at`，`review_status` 置 `reviewed`）与本报告。`knowledge/kimi-code/` 未改动。

查看本轮差异：

```sh
git status --short --untracked-files=all -- audits/kimi-code knowledge/kimi-code
```
