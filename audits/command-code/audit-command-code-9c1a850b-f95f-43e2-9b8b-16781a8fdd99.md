# Command Code 上游审阅报告 · 2026-10-03

## 给维护者的结论

Command Code 的 18 个官方文档来源本轮全部 hash 变化，npm 也从无基线变为 1.74.1。**但文档内容没有变化，已发布的七个主题章节一句都不用改。**

变化的成因是站点表示层，不是知识内容。登记的 `https://commandcode.ai/docs/*` URL 现在返回服务端渲染的 HTML 页面（每页头部带同一个构建期标记 `<!--KnGDj9QRlEA08PBPFzYOM-->`），而 2026-09-30 固定的原件是 Markdown。`/docs/agents.md`、`/llms.txt`、`/docs/agents/index.md` 现在都是 404，站点不再提供 Markdown 端点。为排除「每次响应都变的噪声」这一可能，我对同一 URL 连续抓取两次，sha256 完全一致，所以这是真实的内容变更被记录成了字节变更，不是抖动。

因此本轮只做了两件事：把新 hash 固定下来，以及核对既有引用是否还站得住。**没有新章节版本，没有新 reference，没有版本映射。**

## 变化的意义与证据边界

### 既有引用逐行核对后仍然成立（全部七个主题）

`knowledge/command-code/references/` 的 132 条短摘录逐行与新原件比对：116 条逐行原样命中；其余 16 条的差异全部落在 HTML 渲染差异上——有序列表的序号被渲染成独立标记、表格分隔线、代码块旁的 `Copy` 按钮、选项卡标签（例如 `BasicWith auth headerWith env vars` 是三个选项卡文本被拼接）。这些位置人工核对后原意与上下文都没变。

抽样复核的三个关键位置确认内容确实在页面里：settings 的四层优先级（`settings.local.json` → 项目 `settings.json` → 用户 `settings.json` → 旧 `config.json`）、skills 的渐进式披露三步（discovery / activation / execution）、provider 的四个端点（`/provider/v1/chat/completions`、`/responses`、`/messages`、`/models`）。

定位方面，全部 `document_section` 标题在新页面结构中都能解析，缺失 0 条。所以引用没有失效，只是不能按字面在 HTML 里 grep 到。

**证据边界要说清楚：逐行命中只能证明「被引用的内容还在、没被改写」，不能证明页面没有新增或删除别处的内容。** 我另外比对了各页的章节结构，agents / byok / context / headless / hooks / mcp / mods / permissions / settings / skills 的标题层级与已发布章节覆盖的机制一一对应，没有出现未覆盖的新机制小节。这是判断「无读者可见变化」的依据，不是逐字证明。

### 固定身份推进到新 hash（18 个文档来源）

为每个文档来源建立了 `-20261003` 快照与归档原件（`archive/command-code/artifact-source-*-20261003/source.md`），2026-09-30 的旧快照与旧 artifact 记录原样保留。扫描器的基线取该来源最新快照，所以下一轮不会把同一次站点重建反复判成变化——否则这 18 个来源会每轮都触发一次全主题复查。

### 遗留条件：原件是 HTML，摘录是 Markdown

既有 reference 的短摘录是 Markdown 字面（`**Source**| **Path**` 这种管道表），新的归档原件是 HTML，`extractor` 字段仍记为 `identity-markdown@1`。该字段在「字节恒等、raw=extracted」的意义上诚实（哈希确实相等），但语义已不贴合：以后按字面核对摘录必须先抽取可见文本再规范化比对。若要长期稳定核对，需要维护者决定是调整来源表示方式（例如重新指向一个 Markdown 端点）还是接受规范化比对。`registry/sources/` 不在本轮写入范围，我没有改动任何来源定义。

### npm 来源：观察到版本，不建立映射

`source-command-code-npm` 本轮观察到 `1.74.1@sha512-AEr4cPm08RQ86xKZTCOIOgf9ohob/L5ugB2ZO8X/iPzOQVk4nxDInRAofKy6/eQTfDlfb49J1y+Nyx3ngXMBFA==`，上一轮无基线。npm 版本变化本身不构成章节变化，也不构成源码到包的映射，所以本轮没有固定 npm 快照、没有建立任何软件版本映射。受管包与受管二进制核对按 `delivery=pr` 不在本轮范围，交给 `harness-binary`。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | command-code-cli-configuration-v1 | 全部 7 题复核后不变 | 保留旧版本：引用逐行一致 |
| custom_agents | command-code-cli-custom_agents-v1 | 全部 7 题复核后不变 | 保留旧版本：引用逐行一致 |
| custom_providers | command-code-cli-custom_providers-v1 | 全部 8 题复核后不变 | 保留旧版本：引用逐行一致 |
| hooks | command-code-cli-hooks-v1 | 全部 7 题复核后不变 | 保留旧版本：引用逐行一致 |
| mcp | command-code-cli-mcp-v1 | 全部 8 题复核后不变 | 保留旧版本：引用逐行一致 |
| native_plugins | command-code-cli-native_plugins-v1 | 全部 7 题复核后不变 | 保留旧版本：引用逐行一致 |
| skills | command-code-cli-skills-v1 | 全部 9 题复核后不变 | 保留旧版本：引用逐行一致 |

**发布：** delivery=pr，本轮无读者可见章节变化，未运行 `ahw publish` / `chapters:update` / `managed:packages`，未切换发布指针，也未修改 `registry/chapter-current.yaml`。 **受管二进制：** delivery=pr 不进入受管二进制核对。

**建议选为当前版本的 edition：** 七个主题全部沿用现有版本（configuration/custom_agents/custom_providers/hooks/mcp/native_plugins/skills 各自的 `-v1`），本轮没有新候选，父进程聚合阶段不需要为本产品改动指针。

## 待处理与独立复核

**审计记录：** `audit-command-code-9c1a850b-f95f-43e2-9b8b-16781a8fdd99.yaml`。 **待处理旧审计：** 无（`pending_audit_refs` 为空）。 **待复核问题：无。**

三类高影响触发条件都不成立：来源之间没有冲突（18 个来源指向同一站点、互相印证），没有新来源推翻已发布的配置步骤（四层 settings 优先级、providers.json schema、hooks 顺序等均原样成立），跨主题关键加载机制没有变化。因此按普通更新自检结案，`review_status: reviewed`。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-command-code-docs-agents | a8b36ab3… → 9db1277c… | changed；表示层由 Markdown 改为 HTML，正文未变 |
| source-command-code-docs-byok | bffd17f9… → faa85ddf… | changed；同上，providers.json schema 未变 |
| source-command-code-docs-context | c136ad27… → 479f474d… | changed；同上，context 与压缩策略未变 |
| source-command-code-docs-headless | bc62fc9e… → 99a053fe… | changed；同上，NDJSON 输出与 `--yolo` 权限未变 |
| source-command-code-docs-hooks | 7ffbe3cd… → 84ada510… | changed；同上，事件、schema、退出码未变 |
| source-command-code-docs-import | d0b3beed… → 36872e5e… | changed；同上，导入行为未变 |
| source-command-code-docs-mcp | 6874d89e… → 410cf47b… | changed；同上，MCP 定义、认证、生命周期未变 |
| source-command-code-docs-memory | 848b7adf… → fb4d2f43… | changed；同上，memory 文件位置未变 |
| source-command-code-docs-mods | 795e3cb8… → 0fda50ca… | changed；同上，mods 注册与 `on` 事件未变 |
| source-command-code-docs-permissions | 04a90c29… → 0093868a… | changed；同上，权限模式与优先级未变 |
| source-command-code-docs-provider | 0a3f9f7f… → 8293f679… | changed；同上，provider 端点未变 |
| source-command-code-docs-reference-cli | d53dc145… → 4cc82c93… | changed；同上，flag 与子命令表未变 |
| source-command-code-docs-reference-slash-commands | 539d3184… → 6ea1f6fa… | changed；同上，斜杠命令优先级未变 |
| source-command-code-docs-resource-security | e18293c3… → 067155b7… | changed；同上，凭据与信任边界未变 |
| source-command-code-docs-settings | f5c3911b… → 3484ca9d… | changed；同上，四层优先级与键表未变 |
| source-command-code-docs-skills | c03c737c… → 83892f23… | changed；同上，skill 目录与优先级未变 |
| source-command-code-docs-troubleshooting-common-issues | 1b1502e3… → c7782e76… | changed；同上，故障排查条目未变 |
| source-command-code-docs-troubleshooting-telemetry | b4eb2523… → be690ec2… | changed；同上，telemetry 关闭方式未变 |
| source-command-code-npm | 无基线 → 1.74.1@sha512-AEr4cPm0… | changed；仅观察到 registry 身份，未固定快照、未建立映射 |

## 验证与差异入口

在仓库根实际运行：

- `pnpm knowledge:validate` —— 通过（`Validated 494 chapter editions.`）。输出中的 `COVERAGE_INCOMPLETE` 警告全部属于 codex、omp、opencode、pi 等其他产品，不是本产品问题，按契约未改动。
- `pnpm sources:audit-log` —— 见下方回复中的实际结果。
- `git diff --check`、`git status --short --untracked-files=all` —— 见下方回复中的实际结果。

本轮改动只在两个目录内：`knowledge/command-code/snapshots/*-20261003.yaml`（18 个）、`knowledge/command-code/artifacts/*-20261003.yaml`（18 个）、`audits/command-code/`（1 个 YAML + 本报告）。归档原件在 Git 忽略的 `archive/command-code/artifact-source-*-20261003/`。

查看本轮差异：

```sh
git status --short --untracked-files=all -- knowledge/command-code audits/command-code
git diff -- audits/command-code
```

**本轮未做的事：** 未读取任何 Git 源码（command-code 只有文档与 npm 来源，无 `git_repository` 来源），因此没有打开也没有关闭任何来源工作区；未提交、未推送、未切分支。
