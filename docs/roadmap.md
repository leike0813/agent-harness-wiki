# 项目路线

本路线描述目标产品契约与实施顺序；细节以 [PRD](PRD.md) 和对应 OpenSpec change 为准。M0 的虚构 Claim 数据、旧五工具与旧格式 release 是已运行的历史基线。首批 35 篇旧指南和当前未完成的 m1-reader-guides 是迁移素材，不能据此宣布新 M1 完成。

## 主线

| 阶段 | 交付 | 验收边界 |
|---|---|---|
| M1-1 章节模型与发布 | 不可变产品 × 主题 Markdown 版本；固定问题、小节、来源引用、软件版本映射；当前/历史章节发布索引 | fixture 数据可离线校验与重复构建；错误引用、伪造版本映射、损坏发布不切换当前指针 |
| M1-2 阅读内容与接口 | 六产品 × 七主题的 42 篇 Wiki 页；共享 CLI/QueryService；list_harnesses、get_topic、search_knowledge、compare_topics、get_source 五个只读 MCP 工具 | 逐题有结论或具体缺口；读者能理解机制、配置、条件、来源与诊断；站点和真实 stdio 客户端读取同一新发布 |
| M1-3 离线混合搜索 | 当前最新章节小节的精确、全文与本地 embedding 召回 | 固定模型离线补足代表性中英词法漏检；来源和版本边界不变；缺模型显式降级且不算完成 |
| M1-4 受管二进制 | 五个 npm 产品的最新官方候选、锁定平台依赖、直接入口与 Linux bwrap 最小启动检查 | 各产品记录成功或具体阻塞；仅检查成功者称可运行；失败保留旧环境，不阻断知识发布 |
| M2 手动增量更新 | 登记来源观察、逐问题/小节影响分析、Agent 自检及按需独立复核、自动发布完成内容 | 每次调用留审计；无变化只结案；来源冲突保留边界；部分阻塞时旧章节与审计保持可查 |

M1-1 → M1-2 → M1-3 是知识主链；M1-4 可独立推进，但四项均完成才宣称新 M1。M2 依赖可用的章节发布与受管更新入口。二进制能否启动与知识是否可发布分别判断。先改 PRD/OpenSpec，再实施和验收，不以旧任务勾选代替新契约。

## 内容与发布

首批登记产品为 Codex、Antigravity、Claude Code、OpenCode、Pi、OMP（即 catalog 中的产品 id）；产品名称与界面（`surface_id`）以 `catalog/harnesses.yaml` 为准。共同导航为 Skills、MCP、Custom agents、Custom providers、Hooks、原生插件、配置机制。每个产品的 53 个固定调查问题按主题落入章节索引，允许局部 unknown、partial、not_applicable 和 conflict，必须说明来源及缺口。旧 35 篇正文、三条已接受 Claim 与 Coverage 可作调查线索，需逐项重查，不自动生成软件发行版映射。

Git 记录章节、固定来源元数据、映射与审计；完整原件、二进制、模型和日志在忽略的本地目录。发布先写 staging，验证后原子切换；文档站、CLI 和 MCP 从同一发布读取。当前发布索引新格式历史章节；旧格式 release 不承担兼容义务，也无需为它们保留旧查询适配器。正在运行的 MCP 进程继续读取启动时固定的发布，重启后才读新当前发布。

## 来源与更新

开源产品主要调查固定官方源码，闭源产品主要调查固定官方文档；npm 包、源码提交和文档快照各有独立身份，只有有证据的映射才能说明某章节适用于某软件发行版。手动调用 `harness-maintenance` 时分别观察 Git HEAD、官方文档内容、npm latest 版本与 integrity；ID 模式每一轮另行调用 `harness-binary` 核对受管二进制最新版本，定向模式只在明确要求时核对。扫描不顺手下载新包；包字节交受管环境流程在 staging 获取和核验。调查 Agent 按问题与小节更新章节，必要时请另一 Agent 复核；校验完成后可直接切换新本地发布，不设逐条人工接受门禁。

## 后续 catalog

在线分发分三步推进：`online-knowledge-release` 与 `online-consumer-cli-mcp` 已归档；`online-publication-and-delivery` 实现 main／PR／手动 Pages 工作流、独立持久台账、不可变归档与恢复、30／90 天保留政策及 tag 触发的 npm next／latest。真实 Pages、恢复演练和公开包六组平台验收各自记录，未通过前保持相应任务未完成，见 [发布指南](publication.md)。

`catalog/harnesses.yaml` 是产品与界面的唯一事实源，并记录完整候选并集：登记产品与候选共用同一套产品 id、名称和界面声明，候选只提供身份、不产生章节或事实。候选晋升为登记产品时沿用 catalog 中既有的 id、名称和界面，注册一步只加 registry 来源与知识。名录修订从 Orca 官方具名支持名单、OpenSpec 官方支持工具名单等固定来源汇总；每波先固定名单 revision 与日期、扣除已有对象，再逐个调查七主题并建立来源边界。每个新产品先由 `harness-investigation` 采写七章知识；知识发布成功后由维护者决定是否交由 `harness-binary` 接入受管二进制。扩容波次与 M2 手动维护分开规划；名单不证明产品能力。
