# Design

## Context

动机与交接顺序见 [proposal](proposal.md)。规范输入是已结案的[分发地图](../../../.scratch/npm-pages-distribution/map.md)，具体约束分别见[在线资源](../../../.scratch/npm-pages-distribution/issues/01-online-data-contract.md)、[词法检索](../../../.scratch/npm-pages-distribution/issues/02-online-lexical-search.md)、[缓存与失败](../../../.scratch/npm-pages-distribution/issues/03-online-failure-and-cache.md)、[自动发布](../../../.scratch/npm-pages-distribution/issues/04-automatic-publication.md)、[语义范围](../../../.scratch/npm-pages-distribution/issues/05-optional-semantic-search.md)、[顺序交接](../../../.scratch/npm-pages-distribution/issues/06-package-and-handoff.md)。本设计落实第一个 change；后两个 change 实施时以同步后的主规格为准。

已检查的实现：

- `loadAndValidateChapters` 校验完整 catalog、来源、章节、映射与当前选择；`projectChapters` 已生成规范化章节集。
- `compileChapterDataset` 的 production 分支强制核对本机 Ollama 模型并生成向量；`verifyChapterRelease` 要求整库文件、SQLite、hash 和 Markdown 一致。不应拿这个验证器校验精简在线资源，也不应放松它来通过在线构建。
- `buildSearchSections` 已提取当前小节、精确配置词／路径、问法和别名；在线可复用这些事实提取。其模块同时包含本地语义 schema，消费者共享的词法规则须保持独立导入边界。
- `renderChapterDocs` 从同一知识对象生成目录、章节和来源页。当前历史页未复用当前主题页的来源链接处理，在线保留历史需要补齐这一阅读行为。
- `scripts/build-site.ts` 未指定发布时生成 fixture，指定发布时完整验证本地 release 后运行 VitePress；它没有在线生产投影、base 配置或联合产物验证。
- `ChapterEdition` 没有调查时间或可排序版号；不能用 edition ID、文件 mtime 或软件版本猜测“最近历史版”。
- `docs/PRD.md` 的查询不联网、全历史和生产混合检索契约须正式分出在线能力线；实施路线还指向已归档 change 的旧位置，文档任务一并修正与本次交接相关的链接。

## Goals / Non-Goals

**Goals:**

- 保留完整输入校验、既有版本／界面语义及本地发布能力，交付静态在线数据和同发布页面。
- 在线 schema 与纯词法规则成为后续消费者可直接复用的契约；构建检查证明实际产物可有界定位，不依赖试验脚本冒充生产检索。
- 输出可交给后续流水线的已验证目录与构建侧完整性记录。

**Non-Goals:**

- 本轮不改 `QueryService` 的本地打开方式或 CLI／MCP 公共结果 DTO，不提供在线进程、缓存、HTTP 重试、tgz 或用户缓存参数。
- 本轮不选择远端发布台账存储、不执行期限清理、不实现 CI／GitHub Release／Pages／npm 发布。台账跨 CI 持久化结构及恢复由第三个 change 的 design 明确。
- 不新增搜索库、向量资源、配置数据库或长期服务；不为旧协议预建第二套发布器。

## Decisions

### 1. 复用校验与投影，分别编译两种发布

在线入口直接调用完整章节校验，再复用规范化投影；不先调用本地 production 编译器，不生成或删减 SQLite／semantic 文件。维持本地 production 的模型门禁，在线有独立 schema 与验证器。

建议新增 `src/domain/online.ts`、`src/compiler/online-release.ts`、`src/query/lexical.ts` 三个模块，分别负责公共资源契约、在线投影及完整验证、独立的共享词法规则与有界索引遍历。复用 `src/query/search-index.ts` 的事实提取；必要时只移动共同的纯数据提取，避免复制别名表。构建脚本做参数适配，不在入口复写领域判断。模块无需工厂、插件接口或泛化存储层。

同一领域记录继续使用现有 schema 版本；在线资源使用 `protocol_version: 1`、`release_id`、`resource_kind` 与各类型的顶层字段，由 strict discriminated union 校验。协议版本不替代 chapter schema 3、source-reference schema 2 或 catalog schema 1。新增 schema 接入既有导出／检查脚本，不修改知识记录来迁就 HTTP 形态。

### 2. 先确定完整输入及在线身份，再选择历史

生产入口接收数据根、完整 Git commit、固定发布时间、站点 base、输出根及显式保留资源集合。确认生产输入对应指定提交且没有影响产物的未提交修改；构建不替用户提交，也不联网补 Git 历史。fixture 在隔离根中显式构建且仍标记 fixture。

`release_id` 为 `web-v1-<完整 SHA>`。发布时间由调用方固定，后续流水线首次保存后复用；程序版本不参与知识 ID。发布内容内仅使用相对资源位置，输出根、机器路径和临时目录不得进入 JSON。base 等影响页面的配置及工具锁纳入构建输入；同一身份遇到不一致已保存配置／内容时拒绝覆盖，需要新提交。

当前版只取 `registry/chapter-current.yaml` 的显式选择。最近历史版按指定 Git 提交的 first-parent 树历史中“该 edition 首次进入树”的先后排序，最近者优先，同次引入按稳定 edition ID 打破平局；再从非当前、仍在完整输入中的 editions 取一个。该规则不把 Git 历史当查询数据：Git 只提供构建排序，选中正文、来源与映射仍来自当前完整已校验输入。需要足够 Git 历史才能证明顺序，浅克隆或不能定位引入点明确失败；第三个 change 的 checkout 须提供完整历史。测试用临时 Git fixture 模拟多次引入，不增加手写历史表或章节时间字段。

这是当前无时间字段下的最小确定性选择；相比按任意 ID／mtime 排序，它能复核；相比新增并回填所有章节元数据，它不迁移知识模型。

### 3. 数据资源只保存各自读取需要的内容

资源布局遵循在线 delta，均在 `data/v1/releases/<release-id>/` 内。主要 payload 如下：

| 资源 | Payload 与校验 |
| --- | --- |
| `current.json` | 判别联合：`state: active` 携带协议、release 与 manifest 相对位置；`state: retired` 携带协议、明确退役日与升级信息，无可读 release。首版只生成 active，retired 只交付 schema。 |
| `manifest.json` | release、协议、发布时间、profile、在线历史策略以及 catalog／topics／sources／search 入口；不带整库 inventory。 |
| `catalog.json` | catalog 的产品、界面、运行时及绑定，registered/candidate、reference IDs；从当前答案派生 topic／surface 覆盖，支持不读章节的 list。 |
| `topics/<product>/<topic>/index.json` | current、可读 edition entries、trimmed entries；软件 version、surface、scope、section IDs 及 mapping/evidence 身份由原映射投影。正文和问题答案不放入此处。 |
| `chapters/<edition>.json` | 原完整 ChapterEdition（包括引言），加由引用投影的 snapshot／official URL 来源范围摘要；整章一个资源，小节读取不得依赖额外正文分片。 |
| `sources/<reference>.json` | 判别 chapter reference／catalog reference，保留各自固定快照身份、official URL、locator、excerpt；包含映射证据所需且实际收录的引用，不包含原件。 |
| `sources/index/` | 按 reference ID 范围导航，叶块只有 reference ID 与 harness ID；从上述实际来源集合生成。根导航增大时递归分区，仍按需定位。 |

trimmed entry 使用 `availability: trimmed`，只保留既有选版所需 edition 身份、界面／小节范围、软件映射及依据 ID，不携带正文入口和全文摘录；可读 entry 用 `availability: available` 且有章节位置。选版必须先在两类 entry 的完整可选集合中按现有 exact／prefix／approximate／source_only 规则解析，再判断 availability。不能先删除旧映射再寻找另一章，也不能把一个 section 映射视作整章依据。来源存在性目录只收录本发布实际有文件的引用；trimmed 依据 ID 不伪造为可读 source entry。

本轮用产物检查验证这些信息足以区分已裁剪映射与从未调查，不增加 `edition_id` 工具参数。`history_not_available` 的公共结果及比较中每个目标的呈现由第二个 change 落实，正常状态不改为技术错误。

### 4. JSON 倒排从实际查询定位，不携带整库正文

搜索构建复用当前小节提取；exact 与 lexical 分开索引。关联记录携带 edition／section locator、surface IDs、类别及字段命中信息；产品／主题可由分片范围头共享。不要求先加载全局数字 ID 定位表。

根导航只定位词项范围，下级节点按词项范围及 product/topic 范围递归拆分。查询先用词项定位再按可用 scope 剪枝，禁止依靠一个会随全库线性增长的根词项字典。叶块按完整 JSON 解码字节打包，以 64 KiB 为目标上界，包含信封；热门词将关联列表跨块续接，元数据导航也分片，不截断关联。来源目录复用这一有界范围打包做法，但不建通用索引框架。

只有过滤条件时直接定位 scope 小节目录，该目录按稳定 edition／section ID 排序；超过块目标时以可导航的 ID 范围分片。product/topic 对应目录以 manifest 与 catalog 声明为准，无需探测一组猜测 URL。surface 过滤在取页前应用，所有处理字节计入预算。

### 5. 共享词法规则及可重算分页

`src/query/lexical.ts` 只依赖标准库、领域类型和在线 schema，不导入 SQLite、Ollama 或维护执行器。首版使用 `Intl.Segmenter('zh', { granularity: 'word' })` 的 word-like 项；英文同样进入该分词规则。输入作 Unicode NFC、固定小写与空白归一化；精确词整体匹配，保留路径／配置标点。去重词项后按稳定字符串比较排序，不隐式裁掉输入词。分词、规范化、排序分别记录版本，Node／ICU 只作为构建诊断信息。

排序键为类别（question ID → config/path → full wording → alias → lexical/filter）、不同查询词覆盖数、固定字段权重、edition／section ID。首版字段权重采用 title 3、question wording 2、body 1，同词在同字段的重复频次不放大权重；所有常量只在共享规则声明。精确提取同时可能提供多个类别，保留最优类别作结果 match；正文 lexical 映射为既有 `full_text`。无文本按稳定 ID 顺序。

共享遍历／排序支持受控资源读取函数，构建测试从真正生成的 JSON 文件读，不建完整在线 QueryService。第二个 change 使用同一规则及遍历核心，提供 HTTP／缓存／取消读取。cursor 数据绑定 release、规范化输入、实际 normalized terms、filters、排序版本和 position；不存查询会话。ICU 字符串不同不直接拒绝，实际词项变化则拒绝 cursor。

预算常量在搜索 manifest 与共享规则中一致：索引／导航／过滤元数据 2 MiB，过滤后去重排序候选 20,000，页内章节 8 MiB；按解码资源字节、每请求不同资源计，不因缓存豁免。读 JSON 前后均能检测大小，不将先全量解码再判断当作无限处理许可。超限 `query_too_broad`，不做候选截断或自动改页。HTTP 并发4、调用资源数64、30秒总期限、单请求10秒、两次尝试及缓存32／128 MiB属第二个 change 的同时生效边界，本轮不实现网络政策。

排序完成只读取当页 editions，同章合并一次读取；正文 hit 取命中附近 240 UTF-16 code units 内的原文，只有 metadata／filter hit 取节首，按 Unicode 边界截取。源码范围直接来自章内摘要，完整来源继续单条读取。工具页默认10／最大20、MCP128 KiB由消费者适配保持，词法核心不吞掉字段来达标。

### 6. 页面与数据从同一在线选择生成

将已保留章节、相应来源／映射及完整 catalog 交给现有页面渲染逻辑，而不从 HTML 或生成 Markdown 回读事实。主题索引中的裁剪标记独立于正文投影，站点显示有限历史说明与本地查询入口，不生成其历史页或来源假链接。

修正历史页的引用渲染，沿用当前页的 inert text／citation 处理，保留全部小节锚点和来源定位。VitePress 接收显式 base 与输出目录；配置来自当前项目锁定工具，不引入浏览器搜索 UI。站点含页面、assets 和 `data/v1`，页面显示同一 release。

保留原 `docs:build` 默认 fixture 及显式本地 release 路径，新增显式 `online:build` 与 `online:verify`。在线 production 必须显式选择，不能把 fixture fallback 当作生产成功。

### 7. 构建完整性记录与部署集合校验

在线编译写临时 staging，完整验证后接受为不可变候选。公开 manifest 只描述读取入口；构建侧 `integrity.json` 保存输入摘要、工具／配置身份、完整文件 inventory 与复用现有 SHA-256 逻辑得到的 hashes，覆盖在线数据及对应页面，排除自身。它作为构建／后续归档的附带记录，不要求客户端预下载。

验证包括输入与投影一致、每个可读章节及来源存在、catalog coverage 与 source summary 可重新派生、trimmed entries 无正文入口、search 只指向当前小节、页面／source links 同源与同发布。不得用绕过完整输入校验的“删文件后更新 hash”达标。文件 inventory 排除原件、凭据、语义模型、本地 SQLite、临时路径与活动内容。

组装器接受候选与显式给定的旧发布／协议资源集合，将旧数据原样放入新 staging；旧站点页面留在各自恢复归档，公开根页面只用当前候选。它不根据本机时间推断保留集合，不删除未指定目录。第三个 change 根据真实发布台账计算该集合并核验归档完整性；缺必需归档必须在那里阻断。

容量遍历使用 Node 文件 API，累计整个 deployment 的实际普通文件字节（包含 assets、旧协议及裁剪标记），拒绝链接逃逸或未声明资源；512 MiB 为接受上限，超限报告总量与主要目录，不自动清理。build-side record 如放入 deployment 也计入。校验失败保留既有 accepted output，不写 `releases/current.json` 或执行远端切换。

## Risks / Trade-offs

- [Git 历史缺失无法证明最近版] → 明确检测与失败；后续 checkout 获取完整历史，本轮临时 Git 数据覆盖引入顺序、同次引入及非当前新版。
- [词汇和关联同时增长可能超过查询预算] → 正式资源含信封与范围字段；扩展产品、小节及新词验收导航、热门词续块和范围剪枝。试验脚本只作参考；冲突时报告测量，不放松预算或截断。
- [Node／ICU 分词变化] → 共享规则、实际词项绑定 cursor；本轮记录本机环境，跨平台最低24.12.0／最新24.x完整运行留第二个 change，未经执行不声明通过。
- [trimmed markers 长期增长] → 仍计入目录预算；保留映射语义，超限报告，不丢标记来制造错误的 source_only。
- [data 与页面在 CDN 非同时可见] → 本轮保证联合产物及身份一致，不声称 CDN 原子性；后续消费者身份校验及发布回读处理真实故障。
- [PRD 与现有规格边界漂移] → 本轮 delta 明确本地与在线发布；实施按真实完成能力更新文档。`knowledge-query`、`query-cli`、`mcp-query` 的网络与结果修订留第二个 change；本地 `offline-hybrid-search`、`chapter-update-workflow` 不削弱。

## Migration Plan

1. 先落实 schema／共享规则及完整输入选择，保持本地 release 入口可用。
2. 增加独立在线编译、词法索引及联合页面输出，在临时根重复构建及验证；已有本地 release 不迁移或重写。
3. 验收 production 真源离线构建、完整 deployment 合并／容量，记录实际 Node、平台与产物结果；此时只声明可构建。
4. 同步本 change 主规格后起草消费者 change，再以两个前置的最终契约起草公开发布 change。30天旧发布／90天旧协议、台账／归档／恢复及 npm next→latest 的执行与上线验证由后者负责。

本阶段回退只需继续使用本地发布入口，在线候选失败不改变本地 current 或线上站点；真正部署后的手动恢复不属于本轮实现。
