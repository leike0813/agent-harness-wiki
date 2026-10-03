# SourceCraft Code Assistant 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮 26 个登记来源全部报 `changed`，但**没有一条读者可见的知识变化**。

变化是同一个原因造成的：SourceCraft 文档站重新渲染了一遍输出。26 份新归档原件都多出同一行站点样板 `> **Documentation Index:** Fetch the complete configuration index at https://sourcecraft.dev/portal/docs/en/llms.txt`，正文段落之间的空行被整体去掉，列表行留下尾随空格，frontmatter 里多出 Diplodoc Platform 的生成器版本。被引用的正文一个字没动。

七个主题的已发布章节全部原样保留，不新建 edition，不新增引用，不改 `registry/chapter-current.yaml`。本轮只结案审计。

值得你知道的是下面这条方法限制，它不是本轮引入的，但会一直影响这个产品的巡检强度：上一轮的基线原件不在本工作树里。

## 变化的意义与证据边界

### 26 个文档来源同时变更是渲染样板，不是正文改版

扫描器按字节身份判断 `changed`，所以一次站点重新渲染就会把 26 个来源全部点亮。判断依据有三条。

一是结构：新原件的 frontmatter 仍带 `<!-- source: en/_includes/code-assistant/... -->` 与 `<!-- endsource: ... -->` 的 include 标记，说明这些页面是模板拼装后由 Diplodoc 统一输出的，不是作者逐页改写。

二是逐条引用复核：把 `knowledge/sourcecraft-code-assistant/references/` 的 121 条摘录与本轮归档原件做空白归一（去空行、去尾随空格）后逐字比对，**121 条全部命中**；121 条 locator 标题在新原件中一个都没有被删改或改名。

三是机制抽查：skills 页的渐进式披露三步、八级覆盖优先序（含"同一项目层级下 `.codeassistant/` 优先于 `.agents/`"）、mode 专属目录与符号链接；chat-rules 页的规则文件位置与合并顺序；mcp 页的 stdio／Streamable HTTP／legacy SSE 三种传输、网络超时与工具自动批准；profiles 页的创建、切换、固定、编辑删除与 mode 绑定。这些都与已发布章节的表述逐条一致，例如 skills 章节的八级优先序与原件第 214 行起的列表完全对应。

另外做了一次新增面检查：新原件里反引号点号标识共 14 个，8 个未出现在章节正文中，逐一确认全部是示例文件名（`fibonacci.py`、`server.cpp`、`idea.log`、`cmd.exe`、`opencode.json`、`hello.py`、`review.md`），不是新的配置键或扩展点。

### 方法限制：拿不到基线字节，这轮结论的强度低于逐行 diff

既有 artifact 记录指向的 `archive/sourcecraft-code-assistant/artifact-<artifact-id>/raw.md` 在本工作树里全部不存在，本轮扫描只写入了按 observed hash 命名的 `artifact-<source-id>-<hash12>/source.md`。`archive/` 被 Git 忽略，所以历史原件无法从仓库恢复。

这意味着本轮做的是表示无关的复核，不是逐行 diff。如果某页在保持全部被引段落与全部 locator 标题逐字不变的同时，改写了未被任何引用覆盖的内容，本轮不会发现。对 SourceCraft 这种七章齐全、121 条引用密集覆盖的产品，这个残余风险不高；但它会持续存在，直到原件保留路径与 `artifact` 记录对齐。

### 本轮没有为既有 unknown／partial 带来新信息

`hooks` 七题全部 `unknown`——26 个登记来源里没有任何 hooks 页面，这是来源缺口而不是本轮变化造成的。`providers.metadata`、`plugins.api`、`config.migration` 为 `unknown`，`mcp.capabilities`、`mcp.diagnostics`、`config.trust`、`config.diagnostics` 及 `agents`／`providers`／`plugins` 的其余题为 `partial`。这些状态本轮既没有恶化也没有改善，按原样保留。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | sourcecraft-code-assistant-vscode-configuration-v1 | 7 题：answered 4（sources／overrides／runtime／defaults）、partial 2（trust／diagnostics）、unknown 1（migration） | 保留旧版本：被引小节与摘录逐字未变 |
| custom_agents | sourcecraft-code-assistant-vscode-custom_agents-v2 | 7 题：answered 3、partial 4（format／overrides／limits／diagnostics） | 保留旧版本：被引小节与摘录逐字未变 |
| custom_providers | sourcecraft-code-assistant-vscode-custom_providers-v2 | 8 题：answered 2、partial 5、unknown 1（metadata） | 保留旧版本：profiles 页机制小节未变 |
| hooks | sourcecraft-code-assistant-vscode-hooks-v1 | 7 题：unknown 7 | 保留旧版本：登记来源仍无 hooks 页面 |
| mcp | sourcecraft-code-assistant-vscode-mcp-v1 | 8 题：answered 6、partial 2（capabilities／diagnostics） | 保留旧版本：三种传输与作用域小节未变 |
| native_plugins | sourcecraft-code-assistant-vscode-native_plugins-v1 | 7 题：answered 2、partial 4、unknown 1（api） | 保留旧版本：插件安装与组件类型小节未变 |
| skills | sourcecraft-code-assistant-vscode-skills-v2 | 9 题：answered 9 | 保留旧版本：八级优先序与加载机制逐字未变 |

**发布：** 仅结案审计，无读者可见变化。`delivery=pr`，本轮未运行 `pnpm ahw publish`、`pnpm chapters:update`、`pnpm managed:packages`，未切换发布指针。**受管二进制：** 未触发（`pr` 轮次不做受管二进制核对，且本产品未登记受管二进制来源）。

## 待处理与独立复核

**审计记录：** `audits/sourcecraft-code-assistant/audit-sourcecraft-code-assistant-be3bf284-1297-471b-9d58-dd7f7d52c777.yaml`（`review_status: reviewed`，`pending_question_ids: []`）。**待处理旧审计：** 无。**待复核问题：** 无——本轮不触发三类高影响情况：没有来源之间冲突，没有新来源推翻已发布的配置步骤，没有跨主题关键加载机制变化，因此不需要第二个 Agent 独立复核。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-sc-ca-index` | `f601baec…` → `ef7b5ef9…` | changed；仅渲染样板，locator 标题与摘录逐字未变 |
| `source-sc-ca-concepts` | `5a964c80…` → `1b74ac50…` | changed；仅渲染样板 |
| `source-sc-ca-src-cli` | `dc1b673c…` → `1bbefd3b…` | changed；仅渲染样板 |
| `source-sc-ca-agent-skills` | `30effa54…` → `f0580922…` | changed；仅渲染样板，八级优先序与加载机制未变 |
| `source-sc-ca-slash-commands` | `4405f3ac…` → `b30a55a8…` | changed；仅渲染样板 |
| `source-sc-ca-chat-prompts` | `25cbe300…` → `f02aa9c9…` | changed；仅渲染样板，mode 列表未变 |
| `source-sc-ca-chat-rules` | `c49b1356…` → `49c4f18d…` | changed；仅渲染样板，规则位置与合并顺序未变 |
| `source-sc-ca-mcp-overview` | `11ded13a…` → `290516c1…` | changed；仅渲染样板 |
| `source-sc-ca-mcp-plugin` | `9b2875c6…` → `d609047b…` | changed；仅渲染样板，三种传输、作用域、超时、自动批准未变 |
| `source-sc-ca-mcp-transports` | `877065c0…` → `b61eb377…` | changed；仅渲染样板 |
| `source-sc-ca-mcp-work` | `6e792e70…` → `aedbeed7…` | changed；仅渲染样板 |
| `source-sc-ca-mcp-servers` | `46b388fd…` → `45c2f3c4…` | changed；仅渲染样板 |
| `source-sc-ca-profiles` | `1570c7ec…` → `7c14a3f5…` | changed；仅渲染样板，profile 生命周期小节未变 |
| `source-sc-ca-chat-interface` | `b0c76dd2…` → `6d1ba411…` | changed；仅渲染样板 |
| `source-sc-ca-auto-approve` | `5728b92f…` → `b4ec2c8a…` | changed；仅渲染样板 |
| `source-sc-ca-tools` | `8ebb097f…` → `aec8be5f…` | changed；仅渲染样板 |
| `source-sc-ca-ignore` | `ae0c942a…` → `3d096543…` | changed；仅渲染样板，忽略语法小节未变 |
| `source-sc-ca-context` | `43d202f9…` → `7915f6c5…` | changed；仅渲染样板 |
| `source-sc-ca-checkpoints` | `d106a750…` → `ad9ab075…` | changed；仅渲染样板 |
| `source-sc-ca-fast-edits` | `ba90896f…` → `e59e5e92…` | changed；仅渲染样板 |
| `source-sc-ca-terminal` | `b585bf95…` → `068e708c…` | changed；仅渲染样板，输出上限与进度条压缩未变 |
| `source-sc-ca-concurrent` | `91d7f9b8…` → `b2c1d377…` | changed；仅渲染样板 |
| `source-sc-ca-logs` | `f8881bb2…` → `f0fc45ea…` | changed；仅渲染样板 |
| `source-sc-ca-roo-files` | `4875e0e1…` → `5d309978…` | changed；仅渲染样板 |
| `source-sc-ca-qa` | `987460d6…` → `caaa475c…` | changed；仅渲染样板 |
| `source-sc-ca-quick-actions` | `88e29d85…` → `9b33d9da…` | changed；仅渲染样板 |

## 验证与差异入口

在仓库根运行：

- `pnpm sources:scan sourcecraft-code-assistant` —— 生成 26 条来源检查，全部 `changed`，无 `blocked`，无失败。
- `pnpm knowledge:validate` —— 通过，`Validated 527 chapter editions.`；警告均为其他产品的 `COVERAGE_INCOMPLETE`（`knowledge/omp/`、`knowledge/opencode/`、`knowledge/pi/`），不属于本产品，未改动。
- `pnpm sources:audit-log` —— 通过，`Validated 43 upstream audit records.`
- `git diff --check`、`git status --short --untracked-files=all` —— 无空白错误；本产品的改动仅 `audits/sourcecraft-code-assistant/` 下的新审计 YAML 与本报告，`knowledge/sourcecraft-code-assistant/` 零改动。

本轮没有打开任何来源工作区（登记来源全部是官方文档，没有 Git 来源需要检出），因此没有需要关闭的 workspace id。本轮也没有新增引用、快照、artifact 或版本映射。

查看本轮改动：

```sh
git status --short --untracked-files=all -- audits/sourcecraft-code-assistant/ knowledge/sourcecraft-code-assistant/
git diff -- registry/chapter-current.yaml
```

`registry/chapter-current.yaml` 的修改来自本轮其他产品，不是本产品的；本产品没有需要切换的章节版本，建议维持现有七个 edition 为当前版本。
