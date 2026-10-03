# 0009 — 在线知识分发与静态投影

状态：accepted
日期：2026-10-02
对应：PRD §1、§5、§6、§9，OpenSpec `online-data-and-site-projection`

## 背景

本地生产发布同时要求完整 JSON、SQLite、生成的站点 Markdown 和本机 Ollama 语义索引，只能从维护者工作区读取，轻量消费者无法从干净 checkout 按需取得知识。已结案的 [GitHub Pages 与 npm 在线分发地图](../../.scratch/npm-pages-distribution/map.md) 确定先交付独立的静态在线投影，再接入消费者包和公开发布流水线。本 ADR 记录第一个投影 change 的已定选择。

## 决策

### 独立身份与输入

- 在线身份为 `web-v1-<完整 Git commit SHA>`，协议分区固定为 `data/v1/`；协议、程序、知识发布、章节版本和被调查软件版本各自独立。
- 输入是干净 checkout 的 catalog、registry、结构化知识、固定问题与锁定工具，发布时间由调用方固定。构建不依赖本地 `releases/`、`archive/` 原件、SQLite 或语义模型，不联网补事实、不执行 harness、不读用户配置，生产输出拒绝 fixture。
- 投影前先对完整真源做与本地相同的章节校验，再选择在线历史；资源 hash 复用现有 SHA-256 逻辑。同名成功产物只复用或拒绝，不原地改写。

### 有限历史与裁剪标记

- 每个产品 × 主题在线保留显式当前版与最近一个其他历史版（不足两版时保留实际存在的版本），各自带完整来源与软件版本映射；本地真源与本地发布保留完整历史。
- 最近历史版按指定 commit 的 first-parent 树历史中“该 edition 首次进入树”的先后排序，最近者优先，同次引入按稳定 edition ID 打破平局。只有需要排序多个非 current 版本时才要求足够 Git 历史，此时缺少历史即失败，不用文件时间或软件版本猜测。
- 未保留章节在主题索引里保留 `availability: trimmed` 轻量标记，只含选版所需的 edition 身份、界面／小节范围、软件映射及依据 ID，不带正文入口或全文摘录。选版先在完整可选集合按既有 exact／prefix／approximate／source_only 规则解析；标记与 schema 保留足够元数据，供后续消费者为命中裁剪版本生成正常 `history_not_available` 而不是改选另一章，本轮不在 CLI／MCP 输出该结果。

### 资源布局

资源都在 `data/v1/releases/<release-id>/` 内，入口指针与清单保持精简，不含全库正文、全部来源或完整文件 inventory：

```text
data/v1/current.json
data/v1/releases/<release-id>/manifest.json
data/v1/releases/<release-id>/catalog.json
data/v1/releases/<release-id>/topics/<harness-id>/<topic>/index.json
data/v1/releases/<release-id>/chapters/<edition-id>.json
data/v1/releases/<release-id>/sources/<reference-id>.json
data/v1/releases/<release-id>/sources/index/index.json
data/v1/releases/<release-id>/sources/index/blocks/<block-id>.json
```

`catalog.json` 保留产品、界面、运行时、绑定和身份引用，并从当前答案派生 topic／界面覆盖，足以在不读章节时完成 registry／catalog 范围列表；已声明但章节没有答案的界面派生为 `not_investigated`。`chapters/<edition-id>.json` 是一份完整章节加上由引用投影的来源范围摘要，小节读取从同一章提取，不拆正文分片。`sources/<reference-id>.json` 保持与本地相同的引用身份（reference ID、固定快照身份、官方链接与定位），但省略 catalog source 的 `archive_path`，在线不记录原件路径。来源存在性目录由本发布实际收录的引用生成，只含引用 ID 与所属产品，用于区分正常不存在和已声明文件缺失。

### 词法检索

- 首版用 JSON 倒排索引和 Node 原生 `Intl.Segmenter` 分词，精确入口（问题编号、配置键与完整路径、完整问法、别名）与正文词法入口分开；正文覆盖标题、正文和问法，支持中文词语／短语与英文关键词组合，不承诺任意字符子串、拼写纠错或语义召回。
- 关联按排序词项、含信封的实际解码字节打包，目标每块约 64 KiB，热门词关联可跨块续接；产品／主题由范围头共享，界面过滤在排序前完成。只有过滤条件时读取稳定 ID 排序的小节目录，不扫描倒排或全文。
- 构建与消费者共享同一份分词、规范化与排序规则并记录版本；排序类别为问题编号 → 配置／路径 → 完整问法 → 别名 → 正文词法／过滤，再按关键词覆盖数、字段权重（标题 3、问法 2、正文 1，同字段重复不放大）和稳定 edition／section ID 打破平局。cursor 绑定 release、规范化查询、实际词项、过滤条件、排序版本和位置，变化时返回 `invalid_cursor`。
- 处理预算按每次查询的不同解码资源计：索引／导航／过滤元数据 2 MiB、过滤后去重排序候选 20,000、当页章节 8 MiB；超限返回 `query_too_broad`，不截断候选或改页大小。

### 页面、容量与后续边界

- 页面与数据从同一份已验证投影生成，主题索引的裁剪标记独立于正文投影；站点支持项目子路径，页面只链接本发布可读的章节与来源。接受候选前联合验证页面与数据身份、引用和来源，失败保留既有已接受输出，不切换指针。
- VitePress 启用原生 `metaChunk`，全站页面哈希与站点元数据使用一个共享静态文件，避免在每份 HTML 中重复嵌入完整目录。完整目录仍计入容量，页面和数据不删减。
- 组装器接受显式给定的旧部署目录，只并入其中的 `data/`（旧发布／协议资源）；旧站点页面留在各自恢复归档，不随新站点重建。容量按整个部署目录解包后的普通文件实际字节计，含静态资源、旧协议与裁剪标记，上限 768 MiB，超限报告总量与主要占用且不自动清理。
- 本轮只交付可离线构建、校验的在线产物。消费者 CLI／MCP 包的在线 DTO、HTTP／缓存／取消／离线读取与网络失败政策属于第二个 change；CI、归档／恢复、在线发布保留、Pages 与 npm 发布属于第三个 change。本轮不创建远程资源、不部署、不发包、不切换在线 current。

## 后果

2026-10-02 文档站改版发布时，候选与三份受保护旧发布的完整部署为 615,258,640 字节（586.8 MiB），触及原 512 MiB 上限。维护者确认将预算调整为 768 MiB；该预算低于 [GitHub Pages 的 1 GB 平台上限](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)。容量按完整解包目录计量，当日的 30 天历史保留及超限拒绝规则照此执行。

在线发布保留规则在 2026-10-03 由维护者改为 current／恢复两指针，768 MiB 预算不变，见 [ADR 0011](0011-public-publication.md)。起因是当日部署已达 839,764,825 字节，超出该预算。上段 30 天窗口的实测数字保留为当日记录，不再是当前规则。

本地能力线不受影响：本地生产的语义模型门禁、完整历史发布和混合检索继续独立验收（见 [ADR 0007](0007-offline-hybrid-search.md)），在线发布使用独立 schema 与验证器，不复用也不放松本地完整验证。完整引用、选择、覆盖、来源摘要与 fixture 隔离由在线构建校验；消费者只校验实际读取的资源结构与绑定身份，不做整库验证。

## 词法资源实测

2026-10-02，Linux x64、Node 24.12.0、ICU 77.1，以提交 `b03493e4167cf30aa375df95ade495bdd5318e27` 的干净知识输入投影：完整输入 455 章，在线 449 章、343 个产品主题、7,566 条来源；10,427 个 JSON 资源。倒排为 1,312 块、85,800,640 解码字节，导航为 399 份、277,297 字节，小节目录 343 份、323,517 字节。最大的倒排块为 65,536 字节，未截断热门词。

以下读取消费真正生成的 JSON 信封，索引和章节按每次查询的不同资源计量；均满足 2 MiB／8 MiB 预算：

| 查询 | 结果数 | 索引解码字节 | 当页章节解码字节 |
| --- | ---: | ---: | ---: |
| `mcp.servers` | 3 | 190,110 | 51,591 |
| `MCP 配置` | 10 | 789,306 | 233,099 |
| `skills.roots`，codex | 1 | 190,038 | 14,607 |
| `skills`，codex / skills | 6 | 386,388 | 14,607 |
| 仅 codex / skills | 6 | 7,804 | 14,607 |

增长测试另用 20,000 个长词和 1,000 个产品让词项导航及产品导航实际分层，检查每个信封不超过 64 KiB、新词可定位、正文只读当页章节。热门词以 600 个目标小节和 1,200 个其他产品小节检查跨块重组与范围剪枝。构建规模和查询预算独立；超预算查询仍须明确失败。

## 联合构建验收

同日以完整 Git 历史的干净输入 `/tmp/ahw-online-production-rUSFA2/input` 构建；该目录没有 `archive/`、`releases/`、`var/` 或 `node_modules/`，使用维护者工作区已锁定的工具链，没有安装依赖或访问上游。实际执行：

```sh
pnpm docs:build --online --dataset-root /tmp/ahw-online-production-rUSFA2/input --profile production --commit b03493e4167cf30aa375df95ade495bdd5318e27 --published-at 2026-10-02T00:00:00Z --base /agent-harness-wiki/ --out-dir /tmp/ahw-online-production-rUSFA2/accepted
pnpm online:verify /tmp/ahw-online-production-rUSFA2/accepted
pnpm online:build --dataset-root /tmp/ahw-online-production-rUSFA2/input --profile production --commit b03493e4167cf30aa375df95ade495bdd5318e27 --published-at 2026-10-02T00:00:00Z --base /agent-harness-wiki/ --out-dir /tmp/ahw-online-production-rUSFA2/accepted
```

联合构建与独立校验均返回 `web-v1-b03493e4167cf30aa375df95ade495bdd5318e27`。固定参数重跑校验并复用不可变目录；集成测试另在不同输出目录验证同参数文件 inventory 与 hash 一致。生产目录共 35,681 个文件、243,601,057 字节（约 232.3 MiB），低于 512 MiB：

| 类别 | 文件数 | 实际字节 |
| --- | ---: | ---: |
| 页面 | 8,413 | 82,216,054 |
| 静态 assets | 16,839 | 52,197,110 |
| `data/`（含候选指针） | 10,428 | 103,999,163 |
| 构建完整性记录 | 1 | 5,188,730 |

最终 `pnpm verify` 通过类型、lint、格式、schema、审计记录、fixture／生产知识校验、38 个单元测试、110 个集成测试、TypeScript 构建和默认 fixture 站点构建。3 个既有 opt-in 测试未运行：2 个 Linux 沙箱测试、1 个 NFS 环境测试；Windows、真实消费者 HTTP／npx、线上 Pages／npm 均不在本次实测范围。生产章节校验报告既有 M0 Coverage 警告，未影响章节发布校验。

第二个 change 可直接复用 [在线资源 schema](../../src/domain/online.ts)、[共享词法构建与查询](../../src/query/lexical.ts)及导出的 [资源 JSON Schema](../../schemas/online_resource.schema.json)、[指针 JSON Schema](../../schemas/online_pointer.schema.json)。在线读取应按有限历史标记选版，并遵守每块 64 KiB、查询 2 MiB／20,000／8 MiB 的既定预算；本地全历史与语义检索继续使用各自契约。产物验收不代表公开部署或 npm 发布。
