# Tasks

## 1. 在线契约与能力边界

- [x] 1.1 在 `src/domain/online.ts` 定义 strict 资源信封、active／retired 指针、精简发布清单、catalog、主题索引的 available／trimmed entry、章节来源摘要、两类来源、存在性目录及搜索资源 schema；复用现有领域 schema，以代表性合法资源、跨发布／对象身份错误及裁剪项错误正文入口验证，技术依据写入 `docs/data-model.md`。
- [x] 1.2 将在线 schema 接入 `scripts/export-schemas.ts`、`scripts/check-schemas.ts` 及 `schemas/`，验证 `pnpm schema:check` 与类型检查；不将客户端历史结果／网络错误 DTO 提前写进本地查询契约。
- [x] 1.3 修订 `docs/PRD.md` 与项目 `AGENTS.md` 的本地／在线边界：完整历史＋本地混合检索、在线有限历史＋纯词法、仅读取发布数据网络、不访问上游补事实；核对两条能力线及后两个 change 的验收分离，保留现有本地生产模型要求。

## 2. 完整校验、独立身份与有限历史

- [x] 2.1 在 `src/compiler/online-release.ts` 复用完整章节校验及规范化投影，核对生产输入对应指定提交，固定 SHA／发布时间，生成独立 web 身份；用无 `releases/`、archive、SQLite 产物及模型的生产输入验证成功、fixture 混入和被裁剪章节无效引用验证失败。
- [x] 2.2 按 design 的 first-parent edition 引入顺序选择当前章及最近一个历史版，生成保留映射与轻量裁剪标记；用临时 Git 数据覆盖三版、同次引入、非当前较新 edition、浅历史不足及 partial-section mapping，确认不改源知识或本地历史。
- [x] 2.3 落实 staging、build-side 输入摘要与不可覆盖规则，同身份已成功产物仅可校验复用或拒绝；扩展 `tests/integration/chapter-release.test.ts` 或最小在线发布测试，验证固定参数重复构建、参数冲突拒绝及失败保留现有输出／本地 current。
- [x] 2.4 在 `docs/architecture.md` 和新的在线分发 ADR 中记录实际输入、历史排序、独立编译与完整校验责任；检查不再把本地 JSON／SQLite／semantic 的产物契约笼统用于在线发布。

## 3. 按需资源与来源完整性

- [x] 3.1 生成产品目录、主题索引及每 edition 一份完整章节资源；验证 registry/catalog 范围、candidate、声明未调查的界面、引言／小节／答案、mapping scope 和来源摘要与完整真源一致，目录列表无需读所有章节。
- [x] 3.2 生成保留章节／映射证据引用和 catalog 身份来源的单条资源及 ID 范围分片存在性目录；验证目录重组完整、ID与owner一致、保留历史／candidate 来源可读、未登记ID与已声明缺文件可区分，trimmed-only 来源不伪装成在线文件。
- [x] 3.3 在在线验证器核对实际资源结构、release／请求对象身份及全部引用关系；以破损JSON、混入别的release、dangling source/navigation、trimmed entry 伪入口等代表性损坏验证整体拒绝，更新 `docs/data-model.md` 的资源布局和裁剪语义。

## 4. JSON 词法索引与共享查询规则

- [x] 4.1 在 `src/query/lexical.ts` 实现独立的原生分词、NFC／大小写／空白规范化、类别与字段权重、稳定比较规则，复用既有小节／精确词／问法／别名提取；用中文词组、英文多词、配置键与带标点路径检验，确认无需导入 SQLite、Ollama 或维护模块，记录实际 Node／ICU。
- [x] 4.2 构建 exact／lexical 倒排与可分层的词项／产品主题导航，按含信封的实际解码字节打包约64 KiB块，支持热门词续块和增长导航；以实际生成JSON验证无损重组、范围提前剪枝、无整库正文或全局定位表前置下载。
- [x] 4.3 生成按稳定ID排序且可分片的 scope 小节目录，实现共享有界索引遍历与分页规则；从生成文件执行 text-only、scope-only、surface-filter 查询，验证仅过滤不扫描倒排／全文，cursor 的 release、规范化查询、实际词项、filters、排序版本或位置变化返回 `invalid_cursor`。
- [x] 4.4 实现去重计量及 `query_too_broad`：索引／导航／筛选元数据2 MiB、过滤后排序候选20,000、当页章节8 MiB；表格驱动边界检查预算恰好与超出、相同块多词只计一次、注入的内存资源仍计量，不截断候选或改页大小；真实消费者缓存命中验收留第二个change。
- [x] 4.5 完成 page window 后的同章合并读取、240 UTF-16边界的命中附近原文／节首预览及来源范围；从真实产物验证排序确定、弱关键词命中仍可返回、Unicode完整、仅页内正文读取和来源一致，不以实现调用顺序作精确断言。
- [x] 4.6 以增长产品、小节和新词的模拟语料验证实际导航／续块／候选预算，输出资源体积与代表性召回证据；在在线分发 ADR 和 `docs/data-model.md` 写明当前词法范围、字段权重、分页预算及与本地混合检索的区别，保留既有本地搜索验收。

## 5. 同发布站点与完整部署目录

- [x] 5.1 复用页面渲染，补齐历史版小节引用与来源导航，展示当前在线选择、有限历史及本地入口；扩展 `tests/integration/site.test.ts` 验证 current／retained／trimmed 页面行为、问题／界面索引和来源可读，以语义或链接关系检查而非整页snapshot。
- [x] 5.2 扩展 `scripts/build-site.ts` 的显式在线输入、base 和 staging输出，联合生成页面、assets、`data/v1`与候选pointer；保留默认fixture及显式本地release行为，用非根子路径站点构建验证所有必要链接和页面／数据同release。
- [x] 5.3 生成 build-side 完整文件inventory及hash记录，验证最终页面、导航、来源和索引与投影一致；注入页面／数据release不符或缺源文件，确认整个候选失败且旧accepted目录保持完整，`docs/architecture.md` 记录公开manifest与构建完整性记录的分工。
- [x] 5.4 接受显式给定的保留旧发布／协议集合原样组装完整部署目录，校验各资源并累计实际解包文件字节；用含旧资源／assets／markers的目录检验512 MiB恰好与超限、链接逃逸与缺资源，失败报告总量及主要占用、不删除或缩短保留集合。
- [x] 5.5 在 `docs/knowledge-workflow.md` 说明产物与保留集合接缝：本轮不选择30／90天到期集合，不执行线上current切换；第三个change根据持久台账／归档履行承诺，核对文档与实际构建能力一致。

## 6. 构建入口及交接文档

- [x] 6.1 新增最小在线构建／校验脚本并接入 `package.json` 的 `online:build`、`online:verify`，显式要求数据profile、commit、固定时间、base和输出位置；验证命令可重复执行、非法参数非零、生产不fallback到fixture，保持维护者工具与未来消费者包分离。
- [x] 6.2 更新 README、`docs/development.md` 的实际在线离线构建／校验示例、Node最低24.12.0及本机受测环境，补齐 `docs/openspec-implementation-roadmap.md` 的三步交接和相关归档链接；逐条运行新增文档命令，未做跨平台、HTTP／stdio、tgz、CI或公网交付不得标为通过。
- [x] 6.3 在 `docs/decisions/0007-offline-hybrid-search.md` 的现行适用范围处引用新的在线分发ADR，保留原决策历史；核对本地 `offline-hybrid-search` 与 `chapter-update-workflow` 主规格、`knowledge-query`／CLI／MCP的后续修订范围，文档不提前宣称在线进程已可用。

## 7. 集成验收

- [x] 7.1 运行类型、lint、格式、schema检查及相关章节／query／site／在线测试，再运行本地完整 `pnpm verify`，确认共享投影及渲染变更不破坏本地完整历史、真实五工具stdio与混合检索契约；实际失败须修复或明确记录原因，不用词法测试替代语义验收。
- [x] 7.2 从干净生产输入执行实际在线构建、完整产物验证及固定参数重复构建，记录Git身份、Node／ICU、页面和各类资源体积／目录总量、实际通过环境；验证无本地模型／release／archive依赖，不访问上游或真实用户配置。
- [x] 7.3 执行 `openspec validate online-data-and-site-projection --strict`，核对所有任务的实际完成证据，并输出第二个消费者change可依赖的资源schema／共享规则／有限历史与容量契约；只报告已实现和已构建，不宣称已部署或已发npm。
