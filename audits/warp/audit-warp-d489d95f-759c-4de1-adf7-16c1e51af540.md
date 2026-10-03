# Warp 上游审阅报告 · 2026-10-04

## 给维护者的结论

本轮 21 个登记来源中 15 个变化、6 个未变。逐个对照已归档原件与已发布章节后，只有两处构成读者可见的内容变化：`File and folder locations` 页被重写并新增 WSL 软链小节，`Agent model choice` 页刷新模型清单并新增 Zero Data Retention 小节。其余 13 个来源的变化是 Astro 部署标识（`dpl=` 查询串）、重新生成的 `tab-panel-*` 锚点编号和折行差异，没有推翻或修改任何已发布断言，因此没有为它们新建章节版本。

本次发布两个新章节版本：`warp-desktop-configuration-v2` 与 `warp-desktop-custom_providers-v2`。v1 文件原样保留，历史引用仍指向各自带日期的快照。

值得知道的风险：`warp-desktop-custom_providers-v2` 的 `providers.models` 明确写出模型清单是滚动变化的，某个具体 `model_id` 当时是否可用需要重新核对当前页面，不构成版本映射依据。Warp 是闭源产品，两章的 `version_applicability` 仍为 unknown。

## 变化的意义与证据边界

### 文件位置页重写并新增 WSL 软链（configuration）

`source-warp-docs-file-locations` 从散文式摘要改写为逐平台的项目列表，并新增 `Symlinking Warp’s config from WSL` 一节。影响 `config.sources`（answered）、`config.overrides`（partial）、`config.runtime`（answered）、`config.defaults`（answered）与 `config.diagnostics`（answered），小节 `config-sources`、`config-merge`、`config-runtime`、`config-diagnostics`。

新记录固定到新快照 `snapshot-warp-docs-file-locations-20261004`（`59c2e927…`），旧快照保留。新增的读者可见事实：Windows 存在 `%APPDATA%` 与 `%LOCALAPPDATA%` 两个 `data\` 目录；macOS 的崩溃报告 `~/Library/Logs/DiagnosticReports/`；Windows 与 Linux 各自的独立 cache 目录；Preview 按平台各自换名（macOS `-preview` 后缀、Windows `WarpPreview` 且注册表键无连字符、Linux 每个 `warp-terminal` 目录追加 `-preview`）；非 Stable 通道使用带通道后缀的目录，例如 OSS 的 `~/.warp-oss/`；Windows 当前不加载 `~/.warp/tab_configs/` 与 `~/.warp/themes/`，这两个路径只在 macOS 生效；WSL 的 `$HOME` 与 Windows 用户目录是两个文件系统，同名 `~/.warp/`、`~/.agents/` 需要逐目录软链，且目标已存在时 `ln` 会在既有目录内部建链。

边界：`ref-warp-files-linux-20261004` 因 XDG 变量前缀过长，超出 800 字符上限，改用 `file_lines` 定位到 94–103 行，只摘录非迁移配置与非迁移状态两段；主题与 tab config 路径仍由该引用定位但不在摘录内。WSL 软链示例命令未逐条录入，只保留"必须逐目录软链"与"已存在时先移除或备份"两条可核对的边界。

### 模型清单刷新与 ZDR 条件（custom_providers）

`source-warp-docs-model-choice` 的 `model_id` 清单明显变动，并新增 `Zero data retention policies` 一节。影响 `providers.models`（answered）、`providers.metadata`（partial），新增小节 `providers-privacy`。

新记录固定到 `snapshot-warp-docs-model-choice-20261004`（`8375c96d…`）。新增的读者可见事实：清单按供应商分四组加 Fireworks 托管的开放权重模型；`auto-genius` 文档点名的适用场景是深度调试、架构决策与 `/plan` 会话；每个 Agent Profile 可单独配置 base model，位置在 Settings > Agents > Profiles，同一 base model 也用于 Planning；Warp 与 OpenAI、Anthropic、Google、xAI、Fireworks AI 签有 ZDR 协议，但只覆盖受支持模型；已记录的一条例外是 Claude Fable 5 与 5.1 在 ZDR 下不可用，Enterprise 下默认关闭需管理员启用。

条件边界按来源如实记录：ZDR 是 Warp 与其 provider 之间的协议，不覆盖 BYOK 请求——BYOK 的 prompt 与响应同样经过 Warp 后端，但 provider 侧保留策略取决于用户自己的账号设置。

### 其余 13 个来源：核查后无需改写

`source-warp-docs-agent-notifications`、`-agent-profiles`、`-byok`、`-env-vars`、`-integrations`、`-launch-configs`、`-mcp`、`-notifications`、`-rules`、`-slash-commands`、`-ssh-extension`、`-warp-drive`、`-yaml-workflows` 均有变化，但用逐行比对确认：所有已发布引用摘录的实质内容仍出现在新原件中，差异仅为 `dpl=` 部署标识、`tab-panel-*` 锚点编号和折行。25 处初筛差异全部落在这些类别内。因此 skills、mcp、custom_agents、hooks、native_plugins 五章保持 v1，不新建版本。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `warp-desktop-configuration-v2` | config.sources: answered；config.overrides: partial；config.runtime: answered；config.trust: partial；config.defaults: answered；config.migration: answered；config.diagnostics: answered | 已进入新发布 |
| custom_providers | `warp-desktop-custom_providers-v2` | providers.entry: answered；providers.auth: answered；providers.protocol: answered；providers.models: answered；providers.metadata: partial；providers.forwarding: partial；providers.responses: answered；providers.diagnostics: answered | 已进入新发布 |
| skills / mcp / custom_agents / hooks / native_plugins | v1 | 状态不变 | 保留：变化仅为部署标识、锚点编号与折行 |

**发布：** `delivery=pr`，未运行 `pnpm ahw publish`、`pnpm chapters:update` 或任何发布指针切换；新版本待父进程在聚合阶段选为当前版本。**受管二进制：** 未触发，`delivery=pr` 不做受管二进制核对。

## 待处理与独立复核

**审计记录：** `audits/warp/audit-warp-d489d95f-759c-4de1-adf7-16c1e51af540.yaml`。**待处理旧审计：** 无（`pending_audit_refs: []`）。**待复核问题：** 无。本轮不满足契约第 9 节三类高影响情况中的任何一类——没有来源冲突、没有新来源推翻已发布的配置步骤、没有跨主题关键加载机制变化；两处变化都是在既有机制内细化事实与新增条件。因此未委派 `verifier`，`review_status: reviewed`，`pending_question_ids: []`。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-warp-docs-file-locations | `d01f0b80…` → `59c2e927…` | changed；重写为逐平台列表，新增 WSL 软链节 |
| source-warp-docs-model-choice | `a2f9b7c4…` → `8375c96d…` | changed；模型清单刷新，新增 ZDR 节 |
| source-warp-docs-agent-notifications | `cefaa18a…` → `175b10ed…` | changed；仅部署标识与折行 |
| source-warp-docs-agent-profiles | `51d89b0c…` → `b03ac2dd…` | changed；仅部署标识与折行 |
| source-warp-docs-byok | `f45982e5…` → `43390b75…` | changed；仅部署标识与折行 |
| source-warp-docs-env-vars | `6d33e371…` → `1433e3dc…` | changed；仅部署标识与折行 |
| source-warp-docs-integrations | `1eaf7a76…` → `1eaf7a76…` 级别变化 | changed；仅 `tab-panel-*` 锚点重编号 |
| source-warp-docs-launch-configs | `41f62764…` → `41f62764…` 级别变化 | changed；仅锚点重编号与折行 |
| source-warp-docs-mcp | `cea6893e…` → `cea6893e…` 级别变化 | changed；仅锚点重编号；`mcpServers` 段落新增一句"示例中的 server 全部自动添加"，不影响已发布断言 |
| source-warp-docs-notifications | `14a23584…` | changed；仅部署标识 |
| source-warp-docs-rules | `6b4d9e8a…` | changed；仅部署标识与折行 |
| source-warp-docs-slash-commands | `141272ed…` | changed；仅部署标识 |
| source-warp-docs-ssh-extension | `96b19015…` | changed；仅部署标识 |
| source-warp-docs-warp-drive | `51a34610…` | changed；仅部署标识 |
| source-warp-docs-yaml-workflows | `80bd9ebf…` | changed；仅锚点重编号 |
| source-warp-docs-all-settings / -custom-endpoint / -custom-routers / -settings / -skills / -skills-extra / -orchestration 等 6 项 | 各自固定身份 | unchanged |

## 验证与差异入口

实际运行的校验：`pnpm knowledge:validate` 通过（`Validated 529 chapter editions.`；无 warp 相关 error，剩余输出为其他产品 omp / opencode / pi 的既有 `COVERAGE_INCOMPLETE` 警告，本轮未触碰）、`pnpm sources:audit-log` 通过（`Validated 46 upstream audit records.`）、`git diff --check` 无输出、`git status --short --untracked-files=all` 已核对。

本轮改动文件：`knowledge/warp/chapters/warp-desktop-configuration-v2.md`、`knowledge/warp/chapters/warp-desktop-custom_providers-v2.md`、`knowledge/warp/artifacts/artifact-warp-docs-file-locations-20261004.yaml`、`knowledge/warp/artifacts/artifact-warp-docs-model-choice-20261004.yaml`、`knowledge/warp/snapshots/snapshot-warp-docs-file-locations-20261004.yaml`、`knowledge/warp/snapshots/snapshot-warp-docs-model-choice-20261004.yaml`、`knowledge/warp/references/` 下 11 个新引用、`audits/warp/audit-warp-d489d95f-759c-4de1-adf7-16c1e51af540.yaml` 及本报告。归档原件在 Git 忽略的 `archive/warp/artifact-warp-docs-{file-locations,model-choice}-20261004/raw.md`。

查看差异：`git status --short --untracked-files=all -- knowledge/warp audits/warp`、`git diff -- registry/chapter-current.yaml`。本轮未修改 `registry/chapter-current.yaml`（当前工作区中该文件已有其他产品的未提交改动，非本轮产生）。
