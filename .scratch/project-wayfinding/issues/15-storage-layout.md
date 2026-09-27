Type: grilling
Status: resolved

## Question

在已决定“官方源码用固定 revision 的 Git submodule、可公开的结构化知识进入 Git、原始包与二进制留在仓库内持久本地归档、release 可重建且不入 Git”的前提下，源码 checkout、原始文档/包/二进制/日志、提取后的知识、手写项目文档、运行状态及生成发布应分别放在哪些具体目录？目录布局如何支持按 harness 审阅、证据定位、备份和防止误清理？

## Comments

- 用户接受三项推荐：官方源码 submodule 放在 `upstream/<harness-id>/`；长期原始归档使用独立的 `archive/`，与临时 `var/` 分开；正式知识先按 harness 分目录。

## Answer

目录以所有权和生命周期划界；目录名不是证据或发布状态。按实际接入逐步创建，不预建空的 harness 子树。

| 路径 | 内容与边界 | Git |
|---|---|---|
| `upstream/<harness-id>/` | 可取得的官方源码仓库，以 Git submodule 固定 commit；SourceDefinition 记录仓库身份与对应路径。没有可用官方源码仓库时不创建占位 submodule。 | 跟踪 gitlink 与 `.gitmodules`，不复制上游文件进入本仓库历史 |
| `registry/harnesses/<harness-id>.yaml`、`registry/sources/<source-id>.yaml` | 产品身份、别名、关系及官方仓库、文档和分发渠道的来源定义；跨记录用稳定 ID 引用。 | 跟踪 |
| `knowledge/<harness-id>/{claims,evidence,snapshots,assessments,coverage}/` | 该产品的结构化 Claim、Evidence、SnapshotManifest、Assessment、CoverageRecord。记录仍以全局唯一 ID 和显式 Target 相连；路径不隐式赋予版本、平台或事实继承关系。 | 跟踪 |
| `archive/<harness-id>/<artifact-id>/` | 原始网页/文档、下载包、二进制、解包后的可执行目录、完整探针日志及需要复核的提取全文。原件与派生文件保留各自 hash 和关系；正式记录引用稳定 artifact ID、hash 与仓库相对路径。官方源码已有 submodule 时不默认重复归档。 | 整个 `archive/` 忽略；本地持久保存，不作临时缓存 |
| `docs/`、`site/` | `docs/` 保存本项目手写的 PRD、架构、开发说明和决策；`site/` 保存文档站配置与模板。两处都不另写一份配置事实。 | 跟踪手写内容 |
| `releases/<release-id>/` | 离线构建出的 `manifest.json`、`knowledge.json`、`knowledge.sqlite`、`docs/`；站点构建输出仍在 `site/.vitepress/dist/`。 | 忽略，可重建且发布目录不可变 |
| `var/` | 临时下载、运行工作目录及任务状态；不存放需要长期复核的唯一原件。 | 忽略，可清理 |
| `tests/fixtures/datasets/` | M0 虚构来源和知识，继续与正式 `registry/`、`knowledge/` 隔离。 | 跟踪 |

“文档”有三种不同物件：上游原始页面及完整提取文本默认留在 `archive/`；其 URL、抓取时间、原始与提取 hash、提取器版本和定位信息进入对应 `knowledge/<harness-id>/snapshots/`，经审核的短摘录进入 Evidence。确有必要且适合公开的小型上游文档快照可作为对应 snapshot 的附件进入同一 Git 目录，这是先前证据决策允许的例外。本项目手写说明留在 `docs/`；若有某个 harness 的解释性指南，放在 `knowledge/<harness-id>/guides/` 并引用结构化事实，不另立事实真源。面向查询者的事实页面从正式知识生成到 `releases/<release-id>/docs/`。完整提取文本只是可复核来源材料，不自动成为已接受知识。

实施前同步 `docs/PRD.md` §6、§12、§18、根目录 `AGENTS.md` §7 及 `.gitignore`。当前 `knowledge/{claims,evidence,...}/.gitkeep` 和 `.gitignore` 中把原始下载归到 `var/` 的注释反映旧布局；建立真实数据时迁移或移除这些占位文件。`archive/` 的备份、恢复和保留期限仍按地图中的待定事项，在首批原始制品出现时细化；不得因其被 Git 忽略而自动清理。
