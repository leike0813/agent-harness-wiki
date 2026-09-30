# 确定 GitHub Pages 与 npm 在线知识分发规格

Label: wayfinder:map
Status: resolved

## Destination

形成经用户确认、可直接转为 OpenSpec 的完整实施规格：以 GitHub Pages 发布文档及机器可读知识，以轻量 npm 包提供在线查询 CLI 和本地 MCP stdio，明确数据契约、检索、缓存、发布、兼容性及验收标准。

## Notes

- 使用本项目的本地 Markdown tracker；子议题按 `issues/` 中的编号排序，以状态及阻塞关系确定下一项。
- 每轮讨论使用 `grilling` 与 `domain-modeling`；需要检验交互或数据形态时使用 `prototype`。这张地图记录决策，实施由后续 OpenSpec change 承接。
- 用户已确认的规划起点：在线按需读取知识，npm 包不携带完整知识快照；知识及文档站自动发布；保留查询 CLI；首版目标环境为 Node 24、Linux、macOS、Windows，实际通过验收后才声明支持。
- 用户已确认：MCP 启动时解析当前知识发布，进程内固定该发布，正文与来源按需读取；重启采用当前发布。
- 检索范围按[确定可选语义检索的获取与调用方式](issues/05-optional-semantic-search.md)与[确定 npm 分发、验收与规格交接范围](issues/06-package-and-handoff.md)的决议执行；现有本地M1混合检索与消费者纯词法能力分别验收，正式规格修订由后续change落实。
- 知识主稿、来源引用、问题状态、界面和软件版本映射沿用当前领域模型；npm 程序版本、知识发布身份及被调查软件版本保持区分。
- 本轮已有事实：当前查询服务整体加载 JSON 和 SQLite；站点构建只输出读者页面；生产发布校验要求语义索引并核对生成 Markdown。在线数据读取和词法分发需要正式契约，不能删减旧发布后继续使用其身份。
- 参考现有[知识库产品地图](../knowledge-product-wayfinding/map.md)、[PRD](../../docs/PRD.md)、[领域词汇](../../CONTEXT.md)；本轮复议只针对公共分发与其必要的查询变化。

## Decisions so far

- [确定在线读取的数据契约与分片粒度](issues/01-online-data-contract.md)：启动固定发布，使用独立协议路径；目录含派生覆盖，主题索引负责选版，章节与来源按需读取，构建完成整库校验。
- [确定静态站点上的词法搜索与规模边界](issues/02-online-lexical-search.md)：JSON 词项倒排按需分片，范围尽早剪枝，当页读取正文；确定性分页，索引／候选／章节预算超限明确失败，Node 分词兼容以实测为准。
- [确定在线请求的缓存与失败行为](issues/03-online-failure-and-cache.md)：有界内存与文件缓存，显式离线且不默认回退；时间／并发／资源数／重试有界，来源目录区分缺口与缺失文件，CLI与MCP统一技术错误。
- [确定自动发布与历史资源保留规则](issues/04-automatic-publication.md)：main串行自动发布并归档；本地完整历史、在线当前章加上一版；旧发布30天、总容量512 MiB，手动恢复与协议退役有明确边界。
- [确定可选语义检索的获取与调用方式](issues/05-optional-semantic-search.md)：发布版MCP不提供语义检索能力，保留仓库本地混合检索的独立范围。
- [确定 npm 分发、验收与规格交接范围](issues/06-package-and-handoff.md)：确定轻量消费者包、运行与许可、公共结果及独立npm发版，交接为三个顺序OpenSpec change和分层验收。

## Not yet specified

暂无。六张决策票均已解决，规划目的地已达到；后续创建OpenSpec规划工件，实施和上线验收不属于本地图的完成声明。

## Out of scope

- 对外分发受管二进制、上游调查执行器及维护者配置。
- 在本轮实施代码、部署 Pages、发布 npm 包、提交或切换 Git 分支。
- 为用户自动配置 harness 或运行上游制品。
- 将知识发布改为查询时生成答案。
