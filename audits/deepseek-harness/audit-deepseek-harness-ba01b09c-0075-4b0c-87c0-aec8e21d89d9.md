# DeepSeek Harness 上游审阅报告 · 2026-10-04

## 给维护者的结论

本轮唯一的实质变化是上游仓库前进了一个**发布提交**：版本号从 `0.2.0-rc.2` 提到 `0.2.1-alpha.1`，外加发布脚本、CI 工作流和发布流程笔记的改动。没有任何机制代码被触碰——`packages/*/src`、`apps/*` 和 `docs/` 全部零改动。我们已发布的 213 条引用在新提交上逐条复核，全部仍逐字成立。

因此七个主题**都不需要改写**，本轮仅结案审计。真正值得你留意的是另外两点：npm registry 上的 latest 仍是 `0.2.0-rc.2`，源码树已经跑到它前面；以及文档来源与 npm 来源在本产品下都没有基线快照，所以它们每轮都会报 `changed`——那是「没有可比基线」，不是内容变化。

## 变化的意义与证据边界

### 上游是一次纯发布提交，不触及任何主题机制

`da00f7f5…` 到 `5badb150…` 之间只有一个提交（`release-dsh-0.2.1-alpha.1` 的合并）。342 个改动文件里，除去 340 个 `package.json` 的版本字段和 `pnpm-lock.yaml`，实际只有 9 个文件：

- `scripts/release/publish.ts`（+89）与新增的 `scripts/release/publish.spec.ts`（312 行）
- `scripts/ci-workflow.spec.ts`、`scripts/tests/ci-release-selfhosted.spec.ts`
- `.github/workflows/release-vendor-publish.yml`
- 根 `package.json`（版本 + `semver`/`@types/semver` 两个 devDependency）
- 三份 `.agents/notes` 发布流程记录

这些都属于上游自身的发布工程，不构成读者可见的配置步骤、加载机制或界面行为变化。`README.md` 的 sha256 在两个提交上都是 `0f5516be…`，与既有快照记录一致。

### 213 条引用逐条复核通过

按各自 `file_lines` 定位在新提交上取回原文，与记录的短摘录比对：213 条中 196 条与定位区间完全相等，其余是区间内的子串（如 `ref-dsh-pm-manager-surface` 的摘录是 `plugin-manager/README.md:31` 的行内片段）或末行换行差异，无一条失配。被引用的 95 个文件在新提交上全部存在。跨主题的 bundle/profile 组合顺序、MCP 客户端重连、skill 目录优先级、插件生命周期等关键加载机制均未变化。

### npm 与文档来源的基线缺口

这两个来源在本产品下没有任何 Snapshot，`initialBaseline` 取不到基线，扫描因此报 `changed`。这是**首次观察、无比可比基线**，不是内容发生了可判定变化。

- **npm**：观察到 `0.2.0-rc.2@sha512-EAJ3gPN…`。源码树 HEAD 已是 `0.2.1-alpha.1`，即源码领先于 registry 的 latest。按契约，npm 版本身份本身不构成章节变化，也不据此建立源码到包的版本映射——本轮未写任何 `mappings/` 记录。
- **文档**：观察到的原件是 VitePress 客户端渲染外壳，正文只有站点样式与导航清单，机制内容在客户端 chunk 里，抓取字节不含 `cordis.patch`、`dsh.profile`、`plugin_manager` 等机制表述。已发布七章全部由仓库源码引用支撑，**没有任何一条引用指向该文档来源**，所以它本轮不改变任何章节内容。它可以作为站点可用性与导航结构的信号，不能当作机制内容的可引用原件。

本轮**没有**为这两个来源补建基线快照：在没有内容差异证据的情况下把一个观察值固化成事实基线，会让下一轮的「未变化」结论建立在本轮从未真正比对过的假设上。这个缺口建议由维护者决定是否补齐（补齐需要对应主题的 `harness-investigation` 采写流程，而不是巡检轮次）。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `deepseek-harness-configuration-v1` | config.* 七题：全部复核为未受影响，答案状态不变 | 保留旧版本；上游未触及配置机制 |
| custom_agents | `deepseek-harness-custom_agents-v1` | agents.* 七题：全部复核为未受影响 | 保留旧版本 |
| custom_providers | `deepseek-harness-custom_providers-v1` | providers.* 八题：全部复核为未受影响 | 保留旧版本 |
| hooks | `deepseek-harness-hooks-v1` | hooks.* 七题：全部复核为未受影响 | 保留旧版本 |
| mcp | `deepseek-harness-mcp-v1` | mcp.* 八题：全部复核为未受影响 | 保留旧版本 |
| native_plugins | `deepseek-harness-native_plugins-v1` | plugins.* 七题：全部复核为未受影响 | 保留旧版本 |
| skills | `deepseek-harness-skills-v1` | skills.* 九题：全部复核为未受影响 | 保留旧版本 |

**发布：** 仅结案审计——无读者可见的章节、来源定位或版本映射变化，未新建任何章节版本。**受管二进制：** 未触发（`delivery=pr` 轮次不做受管二进制核对，按契约交由合并后的流程处理）。

## 待处理与独立复核

**审计记录：** [`audit-deepseek-harness-ba01b09c-0075-4b0c-87c0-aec8e21d89d9.yaml`](./audit-deepseek-harness-ba01b09c-0075-4b0c-87c0-aec8e21d89d9.yaml)。**待处理旧审计：** 无（本产品此前没有审计记录，这是首次巡检）。**待复核问题：** 无——未出现来源冲突、没有新来源推翻已发布的配置步骤、跨主题关键加载机制未变化，三项触发条件都不满足。53 道固定问题全部复核为「未受影响」，`pending_question_ids` 已清空。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-deepseek-harness-repo` | `da00f7f5358f…` → `5badb15009ae…` | `changed`；实际是纯发布提交，仅版本字段与发布脚本变化，无机制文件改动；213 条引用全部复核通过 |
| `source-deepseek-harness-docs` | 无基线 → `665aa28b1c3a…` | `changed`（首次观察，无基线）；抓取到 VitePress SPA 外壳，无机制文本；无任何章节引用指向它，内容影响为零 |
| `source-deepseek-harness-npm` | 无基线 → `0.2.0-rc.2@sha512-EAJ3gPN…` | `changed`（首次观察，无基线）；源码 HEAD 已领先至 `0.2.1-alpha.1`；未据此建立版本映射 |

## 验证与差异入口

```sh
pnpm sources:scan deepseek-harness   # 三个来源均成功，无 blocked
pnpm knowledge:validate              # 通过
pnpm sources:audit-log               # 通过
git diff --check                     # 通过
git status --short --untracked-files=all
```

本轮改动只有 `audits/deepseek-harness/` 下的审计 YAML 与本报告，`knowledge/deepseek-harness/` 无改动。查看本轮差异：

```sh
git diff -- audits/deepseek-harness
git status --short --untracked-files=all -- audits/deepseek-harness knowledge/deepseek-harness
```

源码调查在受管来源工作区 `ws-5badb15009ae-a996d0ff-7fd7-42b0-a1fc-8ecc00c29a92` 中完成并已关闭，其临时路径未写入任何知识或审计记录。
