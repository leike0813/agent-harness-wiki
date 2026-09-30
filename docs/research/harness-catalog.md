# Harness Catalog 调研报告

调查日期：2026-09-30（UTC）。交付：[`catalog/harnesses.yaml`](../../catalog/harnesses.yaml)（生产数据）与本报告；原始抓取件在 Git 忽略的 `archive/catalog/`。

## 范围与方法

候选集是两份固定官方名单的全量并集，再加用户指定的五个编程 agent 产品（OpenHands、Warp、Replit Agent、Lovable、Bolt）。名单按固定快照抓取，未依赖任何摘要计数；下表 sha256 由保存的原始字节计算。

| 固定名单 | 官方地址 | 本地原件 | sha256 |
|---|---|---|---|
| Orca Supported agents | https://www.onorca.dev/docs/agents/supported | `archive/catalog/orca-supported.html` | `e9809ce72d05b713898a1b34aa41cc7903fb3716edebb0011c668922ad326a54` |
| OpenSpec Supported Tools | https://raw.githubusercontent.com/Fission-AI/OpenSpec/fe429a13dc875bf48588ce8239cd57c8d8905955/docs/supported-tools.md | `archive/catalog/openspec-supported-tools.md` | `f8c7a2d30976ba1e925ebe6546d7df50081eaea7455c93a0e7829371c4350faf` |

从原件实际抽出的候选：Orca 表格 37 个具名 agent，OpenSpec 工具目录 40 个工具 ID（`--tools` 列表另含 39 个，`rovodev` 只出现在目录表）。跨名单重叠产品合并为一个 candidate，只接入一次。每个 included 产品至少一份官方一手来源；excerpt 是抓取件中的连续原文片段。

总计：候选 58 个（48 included、6 excluded、4 blocked），一手抓取 53 份。

## 候选处置总表

| harness_id | 产品名 | 名单出处 | 处置 | 一手来源数 | 依据 |
|---|---|---|---|---|---|
| `codex` | Codex | OpenSpec `codex` · Orca "Codex" | included | 2 | 见来源清单 |
| `antigravity` | Antigravity | OpenSpec `antigravity` · Orca "Antigravity" | included | 3 | 见来源清单 |
| `claude-code` | Claude Code | OpenSpec `claude` · Orca "Claude Code" | included | 2 | 见来源清单 |
| `opencode` | opencode | OpenSpec `opencode` · Orca "OpenCode" | included | 1 | 见来源清单 |
| `pi` | Pi | OpenSpec `pi` · Orca "Pi" | included | 1 | 见来源清单 |
| `omp` | Oh My Pi | OpenSpec `oh-my-pi` · Orca "OMP" | included | 1 | 见来源清单 |
| `gemini-cli` | Gemini CLI | OpenSpec `gemini` · Orca "Gemini" | included | 1 | 见来源清单 |
| `cursor` | Cursor | OpenSpec `cursor` · Orca "Cursor CLI" | included | 1 | 见来源清单 |
| `cline` | Cline | OpenSpec `cline` · Orca "Cline" | included | 1 | 见来源清单 |
| `zoo-code` | Zoo Code | OpenSpec `roocode`（链接指向 Zoo Code 仓库） | included | 1 | 见来源清单 |
| `kilo-code` | Kilo Code | OpenSpec `kilocode` · Orca "Kilocode" | included | 1 | 见来源清单 |
| `kiro` | Kiro | OpenSpec `kiro` · Orca "Kiro" | included | 1 | 见来源清单 |
| `aider` | Aider | Orca "Aider" | included | 1 | 见来源清单 |
| `goose` | Goose | Orca "Goose" | included | 1 | 见来源清单 |
| `amp` | Amp | Orca "Amp" | included | 1 | 见来源清单 |
| `auggie` | Auggie | OpenSpec `auggie` · Orca "Auggie" | included | 1 | 见来源清单 |
| `continue` | Continue | OpenSpec `continue` · Orca "Continue" | included | 1 | 见来源清单 |
| `qwen-code` | Qwen Code | OpenSpec `qwen` · Orca "Qwen Code" | included | 1 | 见来源清单 |
| `trae` | Trae | OpenSpec `trae` · Orca "Trae" | included | 1 | 见来源清单 |
| `zed` | Zed | OpenSpec `zed` | included | 1 | 见来源清单 |
| `amazon-q` | Amazon Q Developer | OpenSpec `amazon-q` | included | 1 | 见来源清单 |
| `command-code` | Command Code | OpenSpec `command-code` · Orca "Command Code" | included | 1 | 见来源清单 |
| `codebuddy` | CodeBuddy | OpenSpec `codebuddy` | included | 1 | 见来源清单 |
| `junie` | Junie | OpenSpec `junie` | included | 1 | 见来源清单 |
| `kimi-code` | Kimi Code | OpenSpec `kimi` · Orca "Kimi" | included | 1 | 见来源清单 |
| `minimax-code` | MiniMax Code | OpenSpec `minimax-code` · Orca "MiniMax" | included | 1 | 见来源清单 |
| `mistral-vibe` | Mistral Vibe | OpenSpec `vibe` · Orca "Mistral Vibe" | included | 1 | 见来源清单 |
| `qoder` | Qoder | OpenSpec `qoder` | included | 1 | 见来源清单 |
| `github-copilot` | GitHub Copilot | OpenSpec `github-copilot` · Orca "GitHub Copilot CLI" | included | 1 | 见来源清单 |
| `devin` | Devin | OpenSpec `devin`（别名 windsurf） · Orca "Devin" | included | 1 | 见来源清单 |
| `crush` | Crush | OpenSpec `crush` · Orca "Charm Crush" | included | 1 | 见来源清单 |
| `factory-droid` | Droid | OpenSpec `factory` · Orca "Droid (Factory)" | included | 1 | 见来源清单 |
| `forgecode` | ForgeCode | OpenSpec `forgecode` | included | 1 | 见来源清单 |
| `costrict` | CoStrict | OpenSpec `costrict` | included | 1 | 见来源清单 |
| `bob` | Bob Shell | OpenSpec `bob` | included | 1 | 见来源清单 |
| `lingma` | Lingma | OpenSpec `lingma` | included | 1 | 见来源清单 |
| `autohand` | Autohand | Orca "Autohand" | included | 1 | 见来源清单 |
| `codebuff` | Codebuff | Orca "Codebuff" | included | 1 | 见来源清单 |
| `grok` | Grok Build | Orca "Grok" | included | 1 | 见来源清单 |
| `prime-agent` | Prime Agent | Orca "Prime Agent" | included | 1 | 见来源清单 |
| `rovodev` | Rovo Dev | OpenSpec `rovodev` · Orca "Rovo Dev" | included | 1 | 见来源清单 |
| `openhands` | OpenHands | 用户指定补充 | included | 1 | 见来源清单 |
| `warp` | Warp | 用户指定补充 | included | 1 | 见来源清单 |
| `replit-agent` | Replit Agent | 用户指定补充 | included | 1 | 见来源清单 |
| `lovable` | Lovable | 用户指定补充 | included | 1 | 见来源清单 |
| `bolt` | Bolt | 用户指定补充 | included | 1 | 见来源清单 |
| `roo-code` | Roo Code | 独立条目（fork 规则） | included | 1 | 见来源清单 |
| `sourcecraft-code-assistant` | SourceCraft Code Assistant |  | included | 2 | 见来源清单 |
| `hermes` | Hermes Agent | OpenSpec `hermes` · Orca "Hermes" | excluded | 0 | 通用 agent 宿主（Nous Research Hermes），不是编程 agent 产品。出现在 Orca 具名名单，但不在编程 agent 范围内。 |
| `openclaw` | OpenClaw | Orca "OpenClaw" | excluded | 0 | 通用 AI 助手宿主，不是编程 agent 产品。 |
| `agents` | .agents shared target | OpenSpec `agents` | excluded | 0 | OpenSpec 的厂商中立 skills 目标目录，不是产品（决策：不把共享 .agents 目标计作 harness）。 |
| `claude-agent-teams` | Claude Agent Teams | Orca "Claude Agent Teams" | excluded | 0 | Orca 中的启动模式/功能（orca claude-teams），属于 claude-code 的一个能力，不是独立产品。 |
| `windsurf` | Windsurf | OpenSpec 中 `devin` 的别名 | excluded | 0 | Devin 的旧品牌（2026-06-02 改名 Devin Desktop），同一产品的别名，不单列。 |
| `iflow` | iFlow | OpenSpec `iflow` | excluded | 0 | iFlow CLI 已宣布 2026-04-17 停止服务（README 首页公告），不再是可收录的在营产品。 |
| `muse-code` | Muse Code | Orca "Muse Code" | blocked | 0 | Meta 官方站点（meta.ai 等）对本环境返回 401/403，无法取得可复核的官方原件。 |
| `zcode` | ZCode | OpenSpec `zcode` · Orca "ZCode" | blocked | 0 | 未找到官方产品来源：zcode.dev 是无关个人博客，zcode.app 是停放域名（/lander 跳转）。 |
| `ante` | Ante | Orca "Ante" | blocked | 0 | 官方域名 ante.ai 是停放域名（/lander 跳转），GitHub 同名账号无产品仓库。 |
| `codearts` | CodeArts | OpenSpec `codeartsagent` | blocked | 0 | 华为云官方产品页为 JS 混淆/风控页，未获得可读官方原件。 |

Roo/Windsurf：`roo-code` 是独立条目——Zoo Code 是社区 fork/续作，按 fork 分开 ID 的规则与 `zoo-code` 分别登记，已抓取其官方仓库；`windsurf` 是 Devin 改名前的品牌，同一产品，只作为 `devin` 的 alias，不单列。

## Included 产品的来源与形态

| harness_id | 产品名 | aliases | 一手来源 | surfaces（binding 状态） |
|---|---|---|---|---|
| `codex` | Codex | — | `cat-codex-readme`, `cat-codex-appserver-doc` | cli(cli)；vscode(ide)；desktop(desktop)；cloud(web) / cli=unknown；vscode=documented；desktop=unknown；cloud=unknown |
| `antigravity` | Antigravity | agy | `cat-antigravity-index`, `cat-antigravity-2`, `cat-antigravity-cli-reference` | cli(cli)；desktop(desktop)；ide(ide)；sdk(sdk) / cli=unknown；desktop=unknown；ide=unknown；sdk=unknown |
| `claude-code` | Claude Code | — | `cat-claude-code-readme`, `cat-claude-code-platforms` | cli(cli)；vscode(ide)；jetbrains(ide)；desktop(desktop)；web(web) / cli=unknown；vscode=unknown；jetbrains=unknown；desktop=unknown；web=unknown |
| `opencode` | opencode | — | `cat-opencode-readme` | cli(cli)；desktop(desktop) / cli=unknown；desktop=unknown |
| `pi` | Pi | — | `cat-pi-readme` | cli(cli)；sdk(sdk) / cli=unknown；sdk=unknown |
| `omp` | Oh My Pi | — | `cat-omp-readme` | cli(cli) / cli=unknown |
| `gemini-cli` | Gemini CLI | — | `cat-gemini-cli-readme` | cli(cli) / cli=unknown |
| `cursor` | Cursor | — | `cat-cursor-docs` | cli(cli)；cursor(ide) / cli=unknown；cursor=unknown |
| `cline` | Cline | — | `cat-cline-readme` | cli(cli)；vscode(ide)；jetbrains(ide)；desktop(desktop) / cli=unknown；vscode=unknown；jetbrains=unknown；desktop=unknown |
| `zoo-code` | Zoo Code | — | `cat-zoo-code-readme` | vscode(ide) / vscode=unknown |
| `kilo-code` | Kilo Code | — | `cat-kilo-code-readme` | cli(cli)；vscode(ide)；jetbrains(ide) / cli=unknown；vscode=unknown；jetbrains=unknown |
| `kiro` | Kiro | — | `cat-kiro-docs` | cli(cli)；kiro(ide)；web(web) / cli=unknown；kiro=unknown；web=unknown |
| `aider` | Aider | — | `cat-aider-readme` | cli(cli) / cli=unknown |
| `goose` | Goose | — | `cat-goose-readme` | cli(cli)；desktop(desktop) / cli=unknown；desktop=unknown |
| `amp` | Amp | — | `cat-amp-manual` | cli(cli) / cli=unknown |
| `auggie` | Auggie | — | `cat-auggie-readme` | cli(cli) / cli=unknown |
| `continue` | Continue | — | `cat-continue-readme` | cli(cli)；vscode(ide)；jetbrains(ide) / cli=unknown；vscode=unknown；jetbrains=unknown |
| `qwen-code` | Qwen Code | — | `cat-qwen-code-readme` | cli(cli)；vscode(ide)；jetbrains(ide) / cli=unknown；vscode=unknown；jetbrains=unknown |
| `trae` | Trae | — | `cat-trae-site` | cli(cli)；trae(ide) / cli=unknown；trae=unknown |
| `zed` | Zed | — | `cat-zed-readme` | zed(ide) / zed=unknown |
| `amazon-q` | Amazon Q Developer | — | `cat-amazon-q-docs` | cli(cli)；vscode(ide)；jetbrains(ide) / cli=unknown；vscode=unknown；jetbrains=unknown |
| `command-code` | Command Code | — | `cat-command-code-site` | cli(cli) / cli=unknown |
| `codebuddy` | CodeBuddy | — | `cat-codebuddy-site` | cli(cli) / cli=unknown |
| `junie` | Junie | — | `cat-junie-site` | cli(cli)；jetbrains(ide) / cli=unknown；jetbrains=unknown |
| `kimi-code` | Kimi Code | kimi | `cat-kimi-code-readme` | cli(cli) / cli=unknown |
| `minimax-code` | MiniMax Code | — | `cat-minimax-code-readme` | cli(cli) / cli=unknown |
| `mistral-vibe` | Mistral Vibe | — | `cat-mistral-vibe-readme` | cli(cli) / cli=unknown |
| `qoder` | Qoder | — | `cat-qoder-site` | qoder(ide) / qoder=unknown |
| `github-copilot` | GitHub Copilot | — | `cat-github-copilot-docs` | cli(cli)；vscode(ide)；jetbrains(ide)；web(web) / cli=unknown；vscode=unknown；jetbrains=unknown；web=unknown |
| `devin` | Devin | windsurf | `cat-devin-docs` | cli(cli)；desktop(desktop) / cli=unknown；desktop=unknown |
| `crush` | Crush | — | `cat-crush-readme` | cli(cli) / cli=unknown |
| `factory-droid` | Droid | factory | `cat-factory-docs` | cli(cli) / cli=unknown |
| `forgecode` | ForgeCode | — | `cat-forgecode-site` | cli(cli) / cli=unknown |
| `costrict` | CoStrict | — | `cat-costrict-docs` | cli(cli) / cli=unknown |
| `bob` | Bob Shell | — | `cat-bob-site` | cli(cli) / cli=unknown |
| `lingma` | Lingma | — | `cat-lingma-site` | jetbrains(ide) / jetbrains=unknown |
| `autohand` | Autohand | — | `cat-autohand-site` | cli(cli) / cli=unknown |
| `codebuff` | Codebuff | — | `cat-codebuff-readme` | cli(cli) / cli=unknown |
| `grok` | Grok Build | — | `cat-grok-readme` | cli(cli) / cli=unknown |
| `prime-agent` | Prime Agent | — | `cat-prime-agent-readme` | cli(cli) / cli=unknown |
| `rovodev` | Rovo Dev | — | `cat-rovodev-docs` | cli(cli) / cli=unknown |
| `openhands` | OpenHands | — | `cat-openhands-readme` | cli(cli)；web(web) / cli=unknown；web=unknown |
| `warp` | Warp | — | `cat-warp-docs` | desktop(desktop) / desktop=unknown |
| `replit-agent` | Replit Agent | — | `cat-replit-agent-docs` | web(web) / web=unknown |
| `lovable` | Lovable | — | `cat-lovable-docs` | web(web) / web=unknown |
| `bolt` | Bolt | — | `cat-bolt-readme` | web(web) / web=unknown |
| `roo-code` | Roo Code | — | `cat-roo-code-readme` | vscode(ide) / vscode=unknown |
| `sourcecraft-code-assistant` | SourceCraft Code Assistant | — | `cat-sourcecraft-code-assistant`, `cat-sourcecraft-cli` | vscode(ide)；jetbrains(ide)；cli(cli)；web(web)；zed(ide) / vscode=unknown；jetbrains=unknown；cli=unknown；web=unknown；zed=unknown |

## 命名规则

- `harness_id` 稳定：产品改名不改 ID（Windsurf→Devin 仍是 `devin`），fork 另立 ID（Roo Code 与 Zoo Code 分开）。
- 已有六个对象改名：`codex-cli`→`codex`、`antigravity-cli`→`antigravity`；`claude-code`、`opencode`、`pi`、`omp` 保持；Gemini 用 `gemini-cli`。旧 ID 不作 alias。
- 产品名不附带 "CLI"，除非官方名本身如此（Gemini CLI）。alias 只登记官方使用的其他名称（`agy`、`windsurf`、`factory`、`kimi`）。

- OpenSpec 名单 ID `codeassistant` 对应的产品官方名为 SourceCraft Code Assistant，故用完整产品名做稳定 ID `sourcecraft-code-assistant`。它是多形态 agent（VS Code/VSCodium、JetBrains IDE、SourceCraft CLI、Zed、SourceCraft 界面），不因缺少独立 CLI 而排除。

## 形态与绑定

- surface 只登记有来源支撑的界面，`vscode` 与 `jetbrains` 分开。六个 registry 产品：`codex` cli/VS Code/桌面/云（官方 README）；`antigravity` CLI/Antigravity 2.0/IDE/SDK（官方 llms.txt 与 2.0 产品页）；`claude-code` cli/VS Code/JetBrains/桌面/web（官方 platforms.md）；`opencode` cli/Desktop App（官方 README 的 Desktop App (BETA) 段）；`pi` cli 与 pi-agent-core agent runtime/SDK（官方 README 的包表）；`omp` 只有 cli（官方 README 未给出独立界面）。
- 每条 binding 显式给出 status。`documented` 仅用于来源明确写出关系处：目前只有 Codex `vscode→app-server`，依据 https://learn.chatgpt.com/docs/app-server（app-server 用于支撑 rich clients，如 VS Code 扩展）。Codex `cli→app-server` 记为 unknown：该文档只描述可选的远端 TUI 模式连接 app-server，未说明本地 CLI TUI 由 app-server 提供服务，故不据此断言绑定。
- 同品牌不同产品不假定共享 runtime；未验证关系一律 `unknown` 且 refs 为空。

## Blocked 与限制

四个候选无法取得可复核官方原件，记 blocked：Muse Code（Meta 站点 401/403）、ZCode（无官方产品站点，`zcode.dev` 为无关博客、`zcode.app` 为停放域名）、Ante（`ante.ai` 为停放域名）、CodeArts（华为云页面为 JS 混淆/风控页）。

其余限制：多数产品的 runtime/后端关系没有官方来源，binding 保持 unknown。excerpt 一律取抓取件中的连续原文，并优先选择能支撑该产品 surface 的片段；HTML 文档源（Cursor、Kiro、Warp、Lovable 等）常用 meta description 或标题，少数仅有 HTML 页面的产品（Trae、OpenHands、GitHub Copilot、Devin、Junie）的片段可能只点名部分 surface，完整 surface 依据见该条目引用的来源。

## 来源清单

| reference_id | harness_id | kind | official_url | sha256 | locator |
|---|---|---|---|---|---|
| `cat-aider-readme` | `aider` | git_commit | https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/README.md | `e40e05367ceacf7138a2605484bf7d1cb5a262d2dba03f52a5327c023b3cd0dc` | README.md @ 5dc9490bb35f9729ef2c95d00a19ccd30c26339c |
| `cat-amazon-q-docs` | `amazon-q` | document | https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html | `254d88209eeeed92d67a040eda3b78a30946dc6cb04c8ee6029f99fe578d774b` | What is Amazon Q Developer? |
| `cat-amp-manual` | `amp` | document | https://ampcode.com/manual | `e64526adeef5c7365bf1ed1b847cbcb0b26285b7dca6c3c71ea05a3b8146dc70` | Introduction |
| `cat-antigravity-2` | `antigravity` | document | https://antigravity.google/product/antigravity-2 | `7a99035e5fc4fc8328694a9d0c26c7e0a0f7c4e37f66ff20a69a8aceb35811c0` | Antigravity 2.0 product page |
| `cat-antigravity-cli-reference` | `antigravity` | document | https://antigravity.google/docs/cli/reference.md | `81a88de5f81e5e86a208253170d5335e8087bc537e7ee114d80bb6cccd6d9976` | # CLI reference |
| `cat-antigravity-index` | `antigravity` | document | https://antigravity.google/llms.txt | `5772272655dae859a7cfb717b55ef04adf01b12dfdde4a935872898b30333adf` | ## Products |
| `cat-auggie-readme` | `auggie` | git_commit | https://github.com/augmentcode/auggie/blob/9cc3ead419db9486ad44e6e4bba30ecd6784ccff/README.md | `075c99c10158c16472825d33848302e366ef14e1597e2f395214999f522ada7b` | README.md @ 9cc3ead419db9486ad44e6e4bba30ecd6784ccff |
| `cat-autohand-site` | `autohand` | document | https://autohand.ai/ | `09464c70f972de80cf15189243ec3575cc60c59e0f09e288645a31a8a8e84952` | Autohand AI |
| `cat-bob-site` | `bob` | document | https://www.ibm.com/products/bob | `f967172b888c5486a7bbc0ef2000a4c0a1b6d255c9632815bf20b91468c0edcd` | IBM Bob |
| `cat-bolt-readme` | `bolt` | git_commit | https://github.com/stackblitz/bolt.new/blob/eda10b121221b30825a4c16eec5da1fd3eb1eb99/README.md | `a05eee33d5b3748a48ac15b4b5f2ee8ecff4e2573736b9197632ce2ec26796d2` | README.md @ eda10b121221b30825a4c16eec5da1fd3eb1eb99 |
| `cat-claude-code-platforms` | `claude-code` | document | https://code.claude.com/docs/en/platforms.md | `b81507d7c272e44f678bec719f39c7571b31f1bf8d5a28dff5eb6ed4d4737349` | # Platforms and integrations |
| `cat-claude-code-readme` | `claude-code` | git_commit | https://github.com/anthropics/claude-code/blob/732e167ee9d71296b4b63d6f529ac1334513826a/README.md | `aa0d8b80ac083e1591be0789273f447058cc9187b4331634a5614155da27778d` | README.md @ 732e167ee9d71296b4b63d6f529ac1334513826a |
| `cat-cline-readme` | `cline` | git_commit | https://github.com/cline/cline/blob/3435f72fcf4cb843bee946b8f9e981683564c9e3/README.md | `e68470af087a1f3a7abe00a725e42e5d4a9da56c204047df2211986ddd844d24` | README.md @ 3435f72fcf4cb843bee946b8f9e981683564c9e3 |
| `cat-codebuddy-site` | `codebuddy` | document | https://copilot.tencent.com/ | `05d9372df6153b8224a17f65a8816aedf9d296e8eed33669d63fd7a7b014209e` | CodeBuddy |
| `cat-codebuff-readme` | `codebuff` | git_commit | https://github.com/CodebuffAI/codebuff/blob/639e3f3c7a96658035d008e935398417843067fc/README.md | `0e6b734488aeb38d98a7964578d7005915fc75eb111903b0767e451a16fbf05b` | README.md @ 639e3f3c7a96658035d008e935398417843067fc |
| `cat-codex-appserver-doc` | `codex` | document | https://learn.chatgpt.com/docs/app-server.md | `14c29f997cffff66125e710c1746425c53262eb4e636eb0bbcd5c8b4ec7e4464` | Codex app-server |
| `cat-codex-readme` | `codex` | git_commit | https://github.com/openai/codex/blob/bcd6d9ab6b9f26f85d76d0c680b3f88b367bffa0/README.md | `ba4e1f69ff48386e72a9c5e1edaf76aad64a475c2d51af79ccba6d1128261ba7` | README.md @ bcd6d9ab6b9f26f85d76d0c680b3f88b367bffa0 |
| `cat-command-code-site` | `command-code` | document | https://commandcode.ai/ | `904ca9244c5cc6e93e1d9160068399037f64f1f29dfdc53e2e929baa70f23a88` | Command Code |
| `cat-continue-readme` | `continue` | git_commit | https://github.com/continuedev/continue/blob/5522c6f44ca0ac3528b37244818fbfa39b5af470/README.md | `054b77f9573011fa4ebf89d960300aabd1ebecc37d8f6f261341ba7d27d885e7` | README.md @ 5522c6f44ca0ac3528b37244818fbfa39b5af470 |
| `cat-costrict-docs` | `costrict` | document | https://costrict.ai/docs | `438164bf4431739bd1612b66d08ac2c870fd2ff8413a600f5f4c72caf02b4383` | CoStrict |
| `cat-crush-readme` | `crush` | git_commit | https://github.com/charmbracelet/crush/blob/69c65c3d5be0a388d62047feb55d88b9bad7f1b2/README.md | `4a72550d9d6d9b8274f1639ef4fbef3ee14c917b9dec0fad71ca7c3bb5d2cfc6` | README.md @ 69c65c3d5be0a388d62047feb55d88b9bad7f1b2 |
| `cat-cursor-docs` | `cursor` | document | https://cursor.com/docs | `72dd3f8f96ed17f099f459ef8710f0e8034a2f813c421d65f52f12c9330aae06` | Cursor Docs |
| `cat-devin-docs` | `devin` | document | https://docs.devin.ai/ | `db9e5841f4da6000cf0c1b481b5572e0c3cb129c1361cf04996b66c0b52d5db4` | Introducing Devin |
| `cat-factory-docs` | `factory-droid` | document | https://docs.factory.ai/ | `ad4edd8aa6bbbf2f1f1ad3de90245247571ab7b798219b017118fca362474251` | Start Here |
| `cat-forgecode-site` | `forgecode` | document | https://forgecode.dev/ | `e87af0636f052dcc6b408b38a960ea08199ff0bf247fc49005a1c9252d87868d` | ForgeCode |
| `cat-gemini-cli-readme` | `gemini-cli` | git_commit | https://github.com/google-gemini/gemini-cli/blob/38700b4b38bf387dafded6c97c3f190d084b49e9/README.md | `bacf354f3f674d57679ebf7b42dd69311bb9ef14200e18ca703d82aba48bf833` | README.md @ 38700b4b38bf387dafded6c97c3f190d084b49e9 |
| `cat-github-copilot-docs` | `github-copilot` | document | https://docs.github.com/en/copilot | `762617252e4af999efd5bafec4e52f88d76466a5f0ba0fba52f61a84dd9ab301` | GitHub Copilot documentation |
| `cat-goose-readme` | `goose` | git_commit | https://github.com/block/goose/blob/ac15f938151bb8c0efd93ed9c2c1cf61298934bf/README.md | `0f1df85a0c457caf1f3c4e1c0370f2da3887fffa588d207862cfc298c1d39755` | README.md @ ac15f938151bb8c0efd93ed9c2c1cf61298934bf |
| `cat-grok-readme` | `grok` | git_commit | https://github.com/xai-org/grok-build/blob/2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8/README.md | `322066de9f5bc136295bd0ae4f1752cef3d8dcb1a8f9d88044609e7b6d7abcf7` | README.md @ 2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8 |
| `cat-junie-site` | `junie` | document | https://www.jetbrains.com/junie/ | `34083d173f0e7f0990e4017fd84dc904e40180f5706d6634c95176b181ba5d09` | Junie by JetBrains |
| `cat-kilo-code-readme` | `kilo-code` | git_commit | https://github.com/Kilo-Org/kilocode/blob/0b1e01409a2f2255eff7e1c47c6dc894eaed5288/README.md | `b0f214bc5c1a01324edd41e2424a91ab028c7d98e880173bb4475d74df8aab21` | README.md @ 0b1e01409a2f2255eff7e1c47c6dc894eaed5288 |
| `cat-kimi-code-readme` | `kimi-code` | git_commit | https://github.com/MoonshotAI/kimi-cli/blob/9ab1286b8fe4e6bcd116949a27ce5e0ac3389c82/README.md | `2775bc6253bc2a0366140cd0697dce62f82797ce3ff66ee1d3336bb60a379784` | README.md @ 9ab1286b8fe4e6bcd116949a27ce5e0ac3389c82 |
| `cat-kiro-docs` | `kiro` | document | https://kiro.dev/docs/ | `371a451b121f640bb95212bbd2e6e0d69a4ab78731834caa501d7ff1e821b7cc` | Docs - Kiro |
| `cat-lingma-site` | `lingma` | document | https://lingma.aliyun.com/ | `c9844852762b6d3dccde2c8acec899ef4d2bba7941c0db8168f459bb3b6e1e9e` | 通义灵码 |
| `cat-lovable-docs` | `lovable` | document | https://docs.lovable.dev/ | `821931f3b831a6159b8c48e07e2b611d62f88c21650125206920db4e05df400f` | Welcome to Lovable |
| `cat-minimax-code-readme` | `minimax-code` | git_commit | https://github.com/MiniMax-AI/MiniMax-Code/blob/c8a39a5ab4d19388367be2ad5fa6bac82eeba332/README.md | `f6c6740ef0d5e08fd40b9c19caf13a81ad40066bbf87c8b39322b7dd056268aa` | README.md @ c8a39a5ab4d19388367be2ad5fa6bac82eeba332 |
| `cat-mistral-vibe-readme` | `mistral-vibe` | git_commit | https://github.com/mistralai/mistral-vibe/blob/7c19608af06f6c61d63f8f7a5c3430da73fba2ab/README.md | `3c8e7e7648115175f2c985d5dbda819ec3ee0e17d584b2314fc35a5e2b4858e9` | README.md @ 7c19608af06f6c61d63f8f7a5c3430da73fba2ab |
| `cat-omp-readme` | `omp` | git_commit | https://github.com/can1357/oh-my-pi/blob/2b023d1b80133c523d66412602d99b5427408395/README.md | `5c8e5be1f2c95c2b5c640f8a33296076cb6c96d1406f6dcf7020dddf686190d2` | README.md @ 2b023d1b80133c523d66412602d99b5427408395 |
| `cat-opencode-readme` | `opencode` | git_commit | https://github.com/sst/opencode/blob/2fa3363c924c5c3e367b84a87ae478296a0ed59b/README.md | `400890a3082e225c440561825270a911cd7df90a9f64f85166aed330201e50ba` | README.md @ 2fa3363c924c5c3e367b84a87ae478296a0ed59b |
| `cat-openhands-readme` | `openhands` | git_commit | https://github.com/All-Hands-AI/OpenHands/blob/1ec86616bc0511b1e56269fd6ba5872438f4fb7f/README.md | `b7c1e6e52f95654bbf812ed442d28955392fa238c3fb50a49e3e2bb24b862159` | README.md @ 1ec86616bc0511b1e56269fd6ba5872438f4fb7f |
| `cat-pi-readme` | `pi` | git_commit | https://github.com/badlogic/pi-mono/blob/1b347794e2a630e4359f2584f4eea388145d0ddf/README.md | `fe13915e217f905739b64124cbb03b72758fa2081b7198cabeefaee4914a6f14` | README.md @ 1b347794e2a630e4359f2584f4eea388145d0ddf |
| `cat-prime-agent-readme` | `prime-agent` | git_commit | https://github.com/PrimeIntellect-ai/prime-agent/blob/e2fb7bfa1372552d81c33e9b3261d6a9cf82d30f/README.md | `8ac017cfe431bd63d5873ab04c8fe1b4500a53163c5f98484a14099b5a7f7856` | README.md @ e2fb7bfa1372552d81c33e9b3261d6a9cf82d30f |
| `cat-qoder-site` | `qoder` | document | https://qoder.com/ | `cdde846b7184c2af016cce65da4ec73ee3b6edf7eec754f8a6a05f0c294ec2bf` | Qoder |
| `cat-qwen-code-readme` | `qwen-code` | git_commit | https://github.com/QwenLM/qwen-code/blob/e767e223c5c1d6fe13217d95faf365721e6e3437/README.md | `0370888b25018bef847a5edb740947bd02e06cf785e1923797a8f901b7c835f7` | README.md @ e767e223c5c1d6fe13217d95faf365721e6e3437 |
| `cat-replit-agent-docs` | `replit-agent` | document | https://docs.replit.com/replitai/agent | `5fa499fb808abfcbf45a44c5f96ae0478e6f8c272d6c05609946885e64e7f256` | Replit Agent |
| `cat-roo-code-readme` | `roo-code` | git_commit | https://github.com/RooCodeInc/Roo-Code/blob/b867ec9145750d0ae1ff7f02d35406e9bf2a0b16/README.md | `bcabc1221142dc7d7161d089dcd945bb50ff8d7498d7c6b8774b10a8cd5c164f` | README.md @ b867ec9145750d0ae1ff7f02d35406e9bf2a0b16 |
| `cat-rovodev-docs` | `rovodev` | document | https://support.atlassian.com/rovo/docs/use-rovo-dev-cli/ | `b810236c8e2ddb8e210204b629863452c882c0256b78652603efb26d64d7e588` | Use Rovo Dev CLI |
| `cat-sourcecraft-cli` | `sourcecraft-code-assistant` | document | https://sourcecraft.dev/portal/docs/en/code-assistant/operations/src-cli | `25865a9f38443b10948ac9e39a26a085d274e83fd213ba3936d09f93a854607c` | SourceCraft CLI |
| `cat-sourcecraft-code-assistant` | `sourcecraft-code-assistant` | document | https://sourcecraft.dev/portal/docs/en/code-assistant/ | `a10c5c730b38b7f1ee852c9b62f88d198eadd2b330b650e5e166fdae568b23d8` | Install and configure the plugin |
| `cat-trae-site` | `trae` | document | https://www.trae.ai/ | `14f1f2877f7f86c639ee1ff9792ee7a181cdd8f42f15dc483ea71c5952db2841` | TRAE |
| `cat-warp-docs` | `warp` | document | https://docs.warp.dev/ | `12f1602e86e9ec496720aa810d5fd4f7ac0b5b4bfa560a7c31d40ca35370c329` | Getting started with Warp |
| `cat-zed-readme` | `zed` | git_commit | https://github.com/zed-industries/zed/blob/5d80b4e784636899e209cae89626c3be4487e14f/README.md | `0a1b8417d31d53dfd6b4f1c5cc1a1a6f7ae6d3ac044bdb1938bd49cbd09d8198` | README.md @ 5d80b4e784636899e209cae89626c3be4487e14f |
| `cat-zoo-code-readme` | `zoo-code` | git_commit | https://github.com/Zoo-Code-Org/Zoo-Code/blob/bf3bc781b813a2a6cbdb29dfd7c86f423589090e/README.md | `9414e83241662831378169f6e9c8f03811365beb6f6e317305f475a8b0caf2e8` | README.md @ bf3bc781b813a2a6cbdb29dfd7c86f423589090e |
