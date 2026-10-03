# GitHub Copilot CLI 上游审阅报告 · 2026-10-04

## 给维护者的结论

本轮登记来源里有 9 个发生变化，但只有 2 处构成读者可见的知识变化，都来自命令参考页：内置模型清单里 `gemini-3.5-flash` 与 `gemini-3.6-flash` 被移除（保留 `gemini-3.7-flash`），以及新增了 `copilot sandbox ca` 这一组沙箱代理 CA 管理命令。其余 7 个官方文档页只是 Markdown 表格的列对齐与分隔行重排，已发布章节引用的摘录逐条比对后全部仍然成立，因此不改写。仓库源码只动了 `changelog.md`（新增 1.0.90、1.0.91 发布说明），没有任何源码机制位移，没有从发布说明单独推出配置结论。

据此改写 3 个章节：配置机制 v3 补入沙箱 CA 的信任链与运行约束，自定义 Provider v2 更新模型清单，MCP v2 记录一条尚未被官方文档覆盖的鉴权标志并把 `mcp.auth` 从 `answered` 降为 `partial`。其余四个主题经复查无需改写，保留现有版本。

值得知道的风险有两条，都不是本轮能解决的：`--mcp-github-auth` 只有发布说明级别的证据；以及 changelog 的 “GPT-6.1 Sol” 与文档的 `gpt-6-sol` 命名未对齐，章节只按文档拼写陈述。

## 变化的意义与证据边界

### `copilot sandbox ca`：沙箱 CA 信任进入配置与信任主题

命令参考页新增 “Using `copilot sandbox ca`” 一节，说明该命令在交互会话之外管理沙箱代理的证书颁发机构，镜像 `/sandbox ca` 斜杠命令并多一个 `status`；子命令覆盖 `status`、`create`、`trust [CA.PEM]`、`rotate`、`remove`，并明确要求以运行 CLI 的普通用户身份执行（不提权、不以 `SYSTEM` 或 `root`），因为 CA 存放在该用户的 Copilot CLI home 目录。它还明确不接受已弃用的 `--config-dir`，指向非默认 home 只能用 `COPILOT_HOME`。

影响 `config.trust`（证书信任属于信任链的一环）与 `config.runtime`（`COPILOT_HOME` 与 `--config-dir` 的边界例外），落在 `configuration-trust-defaults` 与 `configuration-runtime` 两个小节。证据只到命令参考页这一份固定快照，没有跨产品或跨主题的加载机制变化，因此不需要独立复核。

### 内置模型清单收缩

“Supported models” 表从 11 行减到 9 行，移除 `gemini-3.5-flash` 与 `gemini-3.6-flash`。`custom_providers` v1 原本只写“若干 `gemini-3.x-flash`”，并未被证伪，但读者无法据此知道当前确切清单。v2 改为列出当前文档化的 9 个模型，并说明较早快照曾列有两个已移除的 Gemini 条目，使读者能看出这是一份会随上游变动的清单。影响 `providers.models`，状态维持 `partial`。

### `--mcp-github-auth`：只有发布说明，未写成配置事实

仓库 `changelog.md` 在 1.0.90 记录新增 `--mcp-github-auth`，用于把 GitHub 账号鉴权限定到已批准的 MCP server origin。本轮登记的全部官方文档页（命令参考、MCP 概念与 how-to、配置目录参考）都没有描述它的取值、默认值与适用传输，因此 MCP v2 只按发布说明陈述该标志存在，明确写出语义未覆盖，不给出配置写法，并把 `mcp.auth` 降为 `partial`。等 GitHub 发布该标志的参考文档后需要复查。

### 六个文档页只有排版变化

配置目录参考、about Copilot CLI、hooks 参考、custom instructions 支持、添加 LSP 服务器、编程参考这六页与各自固定快照的差异，仅限表格列宽填充与分隔行。把 7 个变化快照绑定的全部 110 条引用摘录逐条与新抓取页面比对，在归一化表格填充与分隔行之后，除上面那条模型清单摘录外全部逐字成立，因此这些主题不改写章节，快照身份也保持原样（快照是固定身份，不是实时页面）。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `github-copilot-cli-configuration-v3` | `config.trust`：answered；`config.runtime`：partial | 已交付，建议选为当前版本 |
| custom_providers | `github-copilot-cli-custom_providers-v2` | `providers.models`：partial | 已交付，建议选为当前版本 |
| mcp | `github-copilot-cli-mcp-v2` | `mcp.auth`：answered → partial | 已交付，建议选为当前版本 |
| custom_agents | `github-copilot-cli-custom_agents-v1` | 无变化 | 保留旧版本 |
| hooks | `github-copilot-cli-hooks-v1` | 无变化 | 保留旧版本 |
| native_plugins | `github-copilot-cli-native_plugins-v1` | 无变化 | 保留旧版本 |
| skills | `github-copilot-cli-skills-v2` | 无变化 | 保留旧版本 |

**发布：** 本轮为 `delivery=pr`，只交付知识与审计，未运行 `pnpm ahw publish`、`pnpm chapters:update` 或 `pnpm managed:packages`，未切换任何发布指针，也未改 `registry/chapter-current.yaml`。上述 3 个 edition 需要由父进程在聚合阶段选为当前版本。 **受管二进制：** `delivery=pr` 轮次不执行 harness-binary 核对。

## 待处理与独立复核

**审计记录：** [audit-github-copilot-c78f08d2-c841-44ae-9fbd-eb58e4a6d250.yaml](audit-github-copilot-c78f08d2-c841-44ae-9fbd-eb58e4a6d250.yaml)。 **待处理旧审计：** 无（`pending_audit_refs` 为空）。 **待复核问题：** 无——本轮没有出现来源冲突、推翻已发布配置步骤或跨主题加载机制变化，三类高影响情形均未触发，因此未委派独立复核。两条遗留缺口（`--mcp-github-auth` 语义、GPT-6.1 Sol 命名）属于来源本身尚未提供，不是需要第二个 Agent 裁决的分歧，已写入审计的 `investigation_notes`。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| [github/copilot-cli](https://github.com/github/copilot-cli) | `8dfa6009c4a04b3a22a5ca4a7c36a056edd718dd` → `a9ba11a191255b3f7b323b425b717f7db14b6c74` | changed；`changed_paths` 仅 `changelog.md`，无源码机制位移 |
| [@github/copilot](https://www.npmjs.com/package/@github/copilot) | 无基线 → `1.0.91@sha512-eWFqf382RGhBb…` | changed；版本身份变化本身不构成章节变化，未据此制造版本映射 |
| [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference.md) | `ec19817f…` → `66198ea4…` | changed；模型清单收缩 + 新增 `copilot sandbox ca`；其余为表格排版 |
| [CLI config dir reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference.md) | `055e024a…` → `25543caf…` | changed；仅表格排版 |
| [About Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli.md) | `d4cddbe4…` → `d88b94d9…` | changed；仅表格排版 |
| [Hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference.md) | `881e5275…` → `81cebd7f…` | changed；仅表格排版 |
| [Custom instructions support](https://docs.github.com/en/copilot/reference/custom-instructions-support.md) | `173302aa…` → `bc7a4ee4…` | changed；仅表格排版 |
| [Add LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers.md) | `d131a3bb…` → `6e4f416e…` | changed；仅表格排版 |
| [Programmatic reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-programmatic-reference.md) | `666c1840…` → `41add277…` | changed；仅表格排版 |
| 其余 26 个登记文档来源 | 不变 | unchanged |

## 验证与差异入口

在仓库根运行 `pnpm knowledge:validate`（0 error，退出码 0；输出中的 `COVERAGE_INCOMPLETE` 警告全部属于 claude-code、codex、omp、opencode、pi 等其他产品，未改动）、`pnpm sources:audit-log`（Validated 27 upstream audit records）、`git diff --check`（无输出）与 `git status --short --untracked-files=all`。本轮新增记录：2 个 artifact、2 个 snapshot、5 个 reference、3 个章节 edition，全部 `record_kind: production`；5 条新摘录已逐条校验为对应固定来源的逐字子串。源码工作区 `ws-a9ba11a19125-b4804218-0d3e-4a4b-9332-7c4c996c11fe` 在自检通过后已关闭。

查看本轮改动：

```sh
git status --short --untracked-files=all -- knowledge/github-copilot audits/github-copilot
```
