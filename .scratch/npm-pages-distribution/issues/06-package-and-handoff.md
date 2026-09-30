# 确定 npm 分发、验收与规格交接范围

Type: grilling
Label: wayfinder:grilling
Status: resolved
Assignee: codex
Parent: [确定 GitHub Pages 与 npm 在线知识分发规格](../map.md)
Blocked by: 01, 02, 03, 04, 05

## Question

消费者包应包含哪些入口、依赖和使用说明，首次 npx 调用及 MCP 接入的具体体验是什么？公开包名称、代码与知识许可、Node 24 的最低版本及平台范围如何明确，消费者程序怎样报告和处理不兼容的数据协议？

把前序决策合成可实施的产品规格，明确真实 npm 打包安装、远程静态数据读取、五工具 stdio、自动发布失败、固定发布及三个平台的验收标准，以及 PRD、OpenSpec 和 ADR 的修订范围。此议题交付规格及验收口径，不实施或发布。

## Inputs

- [确定可选语义检索的获取与调用方式](05-optional-semantic-search.md)：用户明确决定发布版MCP不提供语义检索能力；明确消费者CLI范围、包依赖与公共搜索状态字段，区分仓库现有本地混合检索及原M1验收要求。
- [确定自动发布与历史资源保留规则](04-automatic-publication.md)：落实有限在线历史及`history_not_available`结果、裁剪标记及软件选版、协议退役提示／初始化错误DTO；消费者说明区分在线stdio进程、按需离线缓存及读取本地全历史发布的MCP。
- 发布交接须包含真实生产词法构建、同发布页面与JSON、GitHub Release归档、main自动发布／PR验证／手动恢复、容量超限和失败保留、保留期限及协议退役验收。现有生产语义门槛、离线查询及发布身份要求的调整须明确记录到PRD、OpenSpec及相关ADR，不能把原本地发布删减后沿用其身份。

## Discussion

- 本议题经三轮用户确认形成决议；最终交接约束集中于下方Answer，讨论记录保留各轮选择。
- 当前主package.json为private、版本0.0.0、license为UNLICENSED，仅有ahw二进制入口；pnpm workspace为根包与site，没有消费者包。2026-09-30只读请求公开npm registry的agent-harness-wiki记录返回404，仅表明当时未取得该名字的包，不代表已占用名字或确保可发布；仓库origin为github.com/leike0813/agent-harness-wiki。
- 继承模型的只读子代理核查：src/cli/index.ts同时注册维护和只读命令，顶层引入compiler；QueryService自身引入better-sqlite3及本地Ollama路径。当前入口无法直接作为轻量在线消费者发布，须按已定在线数据契约调整查询读取与打包依赖；复用领域语义及MCP适配，不把当前静态依赖当成未来消费者必须携带的依赖。
- 第一轮待确认：公开包名agent-harness-wiki、命令名ahw；npm消费者仅包含在线五类查询与MCP，消费者CLI也仅词法，不携带维护命令／本地数据库／语义模型路径，不公开JS库API，仓库本地全历史及既有混合检索保留独立入口；代码MIT、原创知识与文档CC BY 4.0，第三方摘录保持其原有权利及来源声明。均为推荐，未选择许可、未修改正式package或创建LICENSE。
- 后续轮次确定Node最低版本及支持平台、npx／MCP启动参数、默认数据入口、缓存路径、公共状态及协议兼容、程序发版事件与正式验收和OpenSpec交接。许可资料：https://opensource.org/license/mit 、https://creativecommons.org/licenses/by/4.0/ 。
- 用户确认第一轮Q1、Q2、Q3全部推荐：公开npm包名agent-harness-wiki、命令ahw；消费者包仅在线五类查询CLI与本地MCP stdio，CLI同样只提供词法检索、共用查询实现，不携带维护命令／SQLite／完整知识快照／语义模型路径，首版不提供JS库API，仓库本地全历史及混合检索入口保留。代码MIT，原创知识与文档CC BY 4.0，第三方摘录保留原有权利与来源声明。示例npx -y agent-harness-wiki@<版本> mcp与query search为规划体验，尚未可用，包名没有保留、正式package及LICENSE尚未修改。
- 第二轮待确认：消费者最低Node24.12.0，首版支持24.x、目标Linux／macOS／Windows native，按实际OS／架构／Node矩阵验收后声明支持，使用npm／npx不需pnpm或克隆仓库；默认数据协议入口https://leike0813.github.io/agent-harness-wiki/data/v1/，提供启动参数--data-url覆盖同协议镜像，工具调用不接受URL或发布切换；MCP与CLI共用--offline、--cache-dir、--no-file-cache，无参数默认在线与文件缓存，文件缓存目录Linux使用有效绝对XDG_CACHE_HOME下agent-harness-wiki（否则~/.cache/agent-harness-wiki）、macOS ~/Library/Caches/agent-harness-wiki、Windows有效绝对LOCALAPPDATA下agent-harness-wiki/Cache（否则用户home下AppData/Local/agent-harness-wiki/Cache），关闭文件缓存则关闭其读写，显式离线缺必需缓存按既定offline_cache_miss失败。均为推荐，未形成第二轮决议、默认URL尚未部署。
- 运行时现有锁为.node-version 24.12.0与engines >=24.12.0 <25；官方资料已核对Node24仍在LTS、npm-exec支持按包版本执行，以及三个平台的缓存目录惯例。资料：https://nodejs.org/en/about/previous-releases 、https://docs.npmjs.com/cli/v11/commands/npm-exec/ 、https://specifications.freedesktop.org/basedir/ 、https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/MacOSXDirectories/MacOSXDirectories.html 、https://learn.microsoft.com/windows/win32/shell/knownfolderid 。未读取或创建真实用户缓存目录。
- 用户确认第二轮Q4、Q5、Q6全部推荐：消费者最低Node24.12.0，首版24.x、目标Linux／macOS／Windows native，按实际平台／架构验收后声明支持，npm／npx无需pnpm／克隆／编译工具；默认入口https://leike0813.github.io/agent-harness-wiki/data/v1/，启动--data-url可覆盖同协议镜像，工具不接URL或发布切换；CLI／MCP共用--offline、--cache-dir、--no-file-cache，默认在线并启用文件缓存，默认路径按上述平台惯例，离线缺必需缓存明确失败、不联网。尚未部署该URL或实现参数。
- 第三轮待确认：消费者成功响应统一release_id、knowledge_published_at、access_mode（online／offline），版本结果注明在线历史保留范围；消费者搜索移除semantic_status并在工具说明声明仅词法、不用semantic_unavailable假装降级，仓库本地搜索字段不因此修改；history_not_available为领域结果，协议不兼容unsupported_protocol、明确退役protocol_retired为初始化技术错误，CLI非零／MCP不开放工具，不跨协议猜读。程序版本由ahw --version及MCP serverInfo表达，与知识时间／发布区分。
- 第三轮发版推荐（尚未确认）：首个正式程序版本1.0.0，人工选版并推送npm-vX.Y.Z tag触发独立发布工作流，tag与包版本一致、来源为main已验证提交；先通过真实tgz消费者安装及CLI／stdio验收，发布至next标签，再从公开npm精确版本安装并对真实Pages验证，成功才推进latest，失败保留旧latest；不随main普通知识push发npm。后续程序按SemVer更新；GitHub托管runner采用npm Trusted Publishing／OIDC，首次包创建与信任配置是独立上线准备，未配置如实记录、不声称能自动发布。官方资料：https://docs.npmjs.com/trusted-publishers/ 、https://docs.npmjs.com/about-semantic-versioning/ 、https://docs.npmjs.com/cli/v11/commands/npm-pack/ 。
- 第三轮交接推荐（尚未确认）：后续实施顺序为三个OpenSpec change——在线数据与站点投影、消费者CLI／MCP包、公开发布流水线与交付。每项更新相关PRD／主规格／ADR／文档并保留本地全历史及混合检索的独立范围；先在受控HTTP／临时目录验收真实tgz、共享五查询、SDK stdio、缓存／取消／故障及分发一致性，再对Linux／macOS／Windows native与Node最低及最新24.x实测；真实Pages、归档保留／恢复、公开npm精确版本安装单列上线验收。只规划交接，不在本轮创建或实施OpenSpec change。
- 用户确认第三轮Q7、Q8、Q9全部推荐：消费者公共结果与词法能力声明、初始化协议错误；首个正式程序1.0.0，人工选版tag触发、next公开精确版验收后推广latest、OIDC；三个顺序OpenSpec change及分层验收，保留仓库本地全历史／混合检索的独立范围。以下Answer为最终决议。

## Resolution

用户确认三轮全部九项推荐：包名与许可、纯词法消费者边界、运行环境及缓存参数、结果契约、独立程序发版和三个顺序OpenSpec change的交接。至此，本地图的分发规划决策全部确定；实施及公开发布由后续工作承接。

## Answer

### 消费者包、入口与许可

公开npm包名为`agent-harness-wiki`，命令为`ahw`，首个正式程序版本为`1.0.0`。包名须在首次发布前重新核验，规划期registry返回404不代表名字已保留。根工作区当前private／0.0.0／UNLICENSED不是已发布消费者包。

消费者包只提供在线只读CLI与本地MCP stdio：

```text
ahw query list
ahw query topic
ahw query search
ahw query compare
ahw query source
ahw mcp
ahw --version
ahw --help
```

查询参数及五工具语义沿用前序票与正式公共schema；CLI和MCP共用查询实现。MCP恰好暴露`list_harnesses`、`get_topic`、`search_knowledge`、`compare_topics`、`get_source`，不暴露Resources、Prompts或维护命令。

消费者CLI与MCP都只提供词法检索，不提供语义启用参数、不调用Ollama、不下载模型或向量索引。包不携带维护命令、SQLite依赖、完整知识快照、上游制品、原件或维护者配置。当前根CLI与QueryService的静态依赖链不能直接照搬为消费者包；需要复用领域解析及适配，落实已确定的在线读取边界。

首版不提供可供其他程序导入的JS库API；打包只包含运行所需编译代码、元数据及消费者说明／许可，不把工作区、测试或研究材料打进公开包。消费者安装不要求pnpm、克隆仓库、TypeScript编译或原生编译工具。

仓库读取本地完整历史的CLI／MCP及本地混合检索继续保留独立入口和验收范围；消费者`--offline`只是按需缓存读取，不代替本地全历史发布。公开程序的纯词法验收不能冒充原M1离线混合检索验收。

第二个change的design须明确消费者包与private根工作区的包名／bin归属，公开agent-harness-wiki只能绑定消费者入口，不能直接把维护者根包解除private后发布；仓库本地命令说明使用项目pnpm入口，与消费者npx入口区分。根包改名或从独立staging打包是实施组织方式，由design选择最小方案，不新增产品能力。

代码采用MIT，原创知识与文档采用CC BY 4.0。第三方源码／文档摘录保留其原有权利、来源与必要声明，不由本项目许可覆盖。实施时更新正式package许可、许可文件及站点／分发说明，知识归档注明知识许可。许可依据：[MIT](https://opensource.org/license/mit)、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。

### 运行环境及启动体验

消费者首版要求Node`>=24.12.0 <25`。Linux、macOS、Windows native为目标环境，仅对实际通过的OS／架构／Node组合声明支持。验收覆盖最低24.12.0及实施时最新24.x，记录实际版本，不把其他主版本或未测架构默认列为已验证。

公开包安装与启动的目标体验：

```bash
npx -y agent-harness-wiki@1.0.0 mcp
npx -y agent-harness-wiki@1.0.0 query search --text MCP
npx -y agent-harness-wiki@1.0.0 query topic --harness codex --topic mcp --surface-id cli
```

消费者说明提供固定精确程序版本的MCP接入模板，宿主配置指向npx并传入包版本和mcp子命令；不自动改写宿主配置。Windows命令发现、路径含空格与stdio启动需实际验证，不以Linux启动冒充全平台兼容。`--help`与`--version`不需要读取在线知识。

默认数据协议入口为：

```text
https://leike0813.github.io/agent-harness-wiki/data/v1/
```

该地址在规划时尚未部署，不能声称已在线。`--data-url <URL>`只在启动时覆盖为相同协议的镜像入口；相对资源按协议入口及清单位置解析，支持站点项目子路径。协议不兼容明确失败，不猜读其他分区。MCP工具输入不接URL、路径或发布切换；CLI一次查询、MCP整个进程固定初始化选定的发布。

消费者首次在线启动先确认current、校验清单及产品目录，再提供查询／开放工具。无交互登录或用户配置迁移；npx的包获取时间不计入已定30秒知识初始化预算。标准输出仍严格区分CLI业务与MCP协议，诊断写stderr。下载包需要网络与npm已有机制，不承诺第一次npx在断网时仍能取得程序。

### 参数与缓存位置

MCP和CLI共用`--data-url`、`--offline`、`--cache-dir <目录>`、`--no-file-cache`。默认在线并启用文件缓存；JSON输出继续由查询CLI的`--json`选择。精确知识版本不是消费者启动参数，不能把仓库本地`--release-id`入口误写进在线包说明。

| 平台 | 默认文件缓存目录 |
| --- | --- |
| Linux | 有效绝对`XDG_CACHE_HOME`下的`agent-harness-wiki`；未设置、为空或相对路径时，使用用户home下`.cache/agent-harness-wiki`。 |
| macOS | 用户home下`Library/Caches/agent-harness-wiki`。 |
| Windows native | 有效绝对`LOCALAPPDATA`下的`agent-harness-wiki/Cache`；未有效设置时，使用用户home下`AppData/Local/agent-harness-wiki/Cache`。 |

显式`--cache-dir`优先；相对显式目录按调用工作目录解析。目录内继续按标准化数据入口、协议、发布和资源位置分隔，避免镜像／发布混用。平台约定见[XDG](https://specifications.freedesktop.org/basedir/)、[macOS Library](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/MacOSXDirectories/MacOSXDirectories.html)、[Windows LocalAppData](https://learn.microsoft.com/windows/win32/shell/knownfolderid)。

`--no-file-cache`关闭文件缓存的读取与写入，进程内缓存仍可用，不秘密读取旧文件缓存。`--offline`不发网络请求，只使用同一入口／协议下最近一次成功初始化的必需缓存；缺缓存返回`offline_cache_miss`。离线不是完整知识副本，系统或容量回收缓存后可能不可用。

容量、原子落盘、重试、取消、并发、资源数及时间预算按[确定在线请求的缓存与失败行为](03-online-failure-and-cache.md)执行，本票不重复建立另一套规则。

### 公共响应与协议边界

消费者成功响应统一保留：

| 字段／信息 | 含义 |
| --- | --- |
| `release_id` | 初始化固定的在线知识发布身份，不能用npm版本替代。 |
| `knowledge_published_at` | 该知识发布中固定的发布时间，不能用缓存命中／抓取时间替代。 |
| `access_mode` | `online`或`offline`，表达启动选择的访问模式；在线命中缓存仍为online。 |
| 版本结果中的历史范围 | 注明在线历史保留范围，并区分正常裁剪结果、未调查状态、近似映射及来源边界。 |

程序版本通过`ahw --version`及MCP初始化`serverInfo.version`表达。协议主版本由数据入口和发布元数据表达，仍独立于程序、发布、章节及被调查软件版本。

消费者搜索去掉`semantic_status`，工具说明明确只提供词法检索，不返回`semantic_unavailable`假装功能降级。仓库本地混合检索字段不因消费者DTO变化而删除。消费者CLI和MCP共享消费者契约，本地CLI和MCP共享本地契约；同名工具的契约范围由对应服务入口、工具说明和schema声明，初始化确定后不接受单次调用切换。公共spec须分别描述两种入口，不能把共享实现误解为两种DTO必须完全相同。正常空搜索、unknown、not_found、ambiguous、not_investigated及冲突保留已有领域含义。

按选版规则命中裁剪章节时返回正常`history_not_available`并提示本地完整发布；轻量裁剪标记及比较表达按[自动发布决议](04-automatic-publication.md)执行。它不是HTTP404、网络失败或未调查。消费者说明提供仓库本地完整发布的获取／构建与查询文档链接，明确该路径需要独立准备本地发布，不能暗示npm包本身有全库或--offline能补齐裁剪章节。

初始化遇协议不兼容返回`unsupported_protocol`；读到明确机器可读退役标记时返回`protocol_retired`，提示升级。两者均为技术错误，CLI非零、MCP不开放工具；无发布身份时不能编造release_id。不可达入口或404仍按网络／资源失败契约处理，不能推断协议已退役。消费者不跨协议自动读取，不因新协议上线改变旧进程绑定。

其他技术错误、结构化内容及CLI JSON／MCP isError适配沿用缓存失败票；语义、历史与协议的新字段／状态通过正式schema同步到CLI、MCP与数据发布校验，而非靠消息字符串判断。

### 程序发版与知识发布

程序与知识使用不同事件：main push触发知识／页面自动发布；维护者选定程序版本并推送`npm-vX.Y.Z`标签，才触发独立npm工作流。tag与包版本一致、提交来自main并通过相应验收；归档用的web-v1身份及GitHub Release不能触发npm程序发版。

首个正式程序目标1.0.0，后续按SemVer选版。发布流程为：

1. 从固定提交构建，生成真实tgz并检查文件和运行依赖；在源码树之外安装该包，验收CLI及真实SDK stdio。
2. 将同一候选包发布到npm的next标签，不立即推进latest。
3. 从公开npm安装精确版本，对真实Pages执行CLI和五工具stdio验证。
4. 全部交付检查成功后才推进latest；失败保留旧latest，记录失败版本及原因，不声称稳定版已就绪。

首次尚无latest时，失败意味着稳定渠道尚未建立；公开next候选本身不等于正式交付成功。已发布npm版本不复写，修正使用新程序版本。同一工作流重跑需辨认已有候选状态，不因标签已存在就报告所有验证成功。

程序发版也须防止较旧候选在较新稳定版后推进latest；维护者明确选版与发布记录决定升级次序，不能仅按任务完成时间更新。知识current与npm latest分别记录，失败不互相改写。

使用GitHub托管runner与npm Trusted Publishing／OIDC。首次建包、配置npm信任和相应GitHub环境属于上线准备；未完成时明确记录阻塞，不把准备工作声称已完成、不存长期发布token作为默认方案。发布工具链固定满足OIDC要求的版本，消费者不因此被要求安装pnpm。依据：[npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)、[SemVer说明](https://docs.npmjs.com/about-semantic-versioning/)、[npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack/)。

### 三个顺序实施change

本地图是决议及交接索引；后续按项目OpenSpec流程创建三个change，不在本轮生成规划工件或实施代码。

| 顺序 | Change范围 | 可独立验证的完成边界 |
| --- | --- | --- |
| 1 | 在线数据与站点投影 | 完整真源校验；独立在线身份与data/v1资源；JSON词法倒排及有界分片；有限历史与裁剪标记；同发布页面／来源；可重复离线构建及512 MiB完整部署目录校验。不要求此时已部署公网。 |
| 2 | 消费者CLI／MCP包 | 纯词法在线读取、固定发布、异步共享查询、公共schema、缓存及故障边界；真实tgz可脱离源码安装；CLI与真实SDK五工具stdio读取受控HTTP；三个平台及最低／最新24.x的实际验收。不把已打包声称为已发npm。 |
| 3 | 公开发布流水线与交付 | main／PR发布边界、串行及过期任务处理、Release归档、保留期限、容量失败、回读和手动恢复；独立npm tag发版／OIDC／next到latest；真实Pages与公开npm精确版本的实际验收。不以CI配置文件存在代替上线成功。 |

各change的proposal、delta specs、design和tasks需覆盖其稳定可观察行为，依赖前置change同步后的主规格。继承前五票的具体资源布局、检索分页、请求预算和发布规则，不能仅复制本票摘要后遗漏细则。

第三个change的design须明确维护者侧发布台账的跨CI持久化位置、记录结构及失败恢复。台账记录实际部署目标、验证状态、每次退出current时间与恢复候选，属于部署状态、与不可变知识归档分开；不能使用客户端最近初始化缓存或归档创建时间代替。必需状态无法取得或状态不确定时停止清理及发布并报告，不能按猜测的时间删除仍受保护资源。具体台账存储方式在发布design落实，不引入额外持续服务。

PRD正式区分两条能力线：维护者本地完整历史与离线混合检索；公开在线有限历史与纯词法消费者。查询可访问发布数据网络，但仍不访问上游补事实、不调用生成式LLM、不执行harness或写知识真源。在线构建不依赖语义模型，不静默削弱现有本地混合检索验收。

主要修订对象：`knowledge-release`、`knowledge-query`、`query-cli`、`mcp-query`、`knowledge-site`及涉及的章节／来源schema；核对`offline-hybrid-search`、`chapter-update-workflow`等边界，保留本地契约。`docs/PRD.md`、项目AGENTS、README、架构／数据模型／开发／知识工作流文档和OpenSpec路线随对应change更新到真实状态。搜索ADR、在线分发／发布技术选择的ADR按实际决定记录，不把旧ADR历史改写成早已支持在线分发。

### 验收与交付记录

| 层次 | 实际验收内容 |
| --- | --- |
| 默认受控验收 | 临时真源与缓存、本地受控HTTP，验证各票的资源／版本／历史／搜索／分页／缓存／超时／取消／错误语义；新发布失败不替换，旧进程固定旧发布。默认不访问公网、真实HOME或付费模型。 |
| 消费者产物 | 检查npm实际tgz及依赖闭包；源码树之外的真实安装／CLI／SDK stdio，恰好五工具、无日志污染、无维护／SQLite／语义依赖、无需编译工具；不是workspace链接或内部handler冒充安装验证。 |
| 平台运行 | Linux、macOS、Windows native，最低24.12.0与实施时最新24.x；记录OS、架构、Node／npm及实际结果，检查中文分词、路径含空格、命令发现、缓存和取消。未执行的组合不声明通过。 |
| Pages交付 | 真实URL的指针／数据／来源／页面可读且同发布；归档取回、30天旧数据及90天旧协议规则、容量超限不部署、过期候选不倒灌、发布回读及手动恢复。尚未发生的未来期限通过受控时间验收，不声称已等满期限。 |
| npm交付 | 从公开npm安装精确候选版本、读真实Pages、运行五工具及CLI；成功后推进latest，记录包版本、tag／提交、知识发布及实际验证。 |

外部安装／部署／发包是显式交付阶段，不混入默认离线测试；相关授权、账户与平台状态在执行时核对，不在本轮创建远程资源。默认测试优先复用现有稳定行为用例，仅为真正新的网络、打包和发布边界增加必要检查，不锁死提示文案或页面格式。

消费者文档至少说明：Node要求、npx与固定版本MCP接入、五类CLI查询、默认地址及镜像覆盖、缓存／离线参数、程序与知识版本区别、在线历史范围及本地查询入口、错误／退役升级、纯词法能力与许可。维护者文档说明知识自动发布、程序选版tag、归档、保留和恢复、next到latest验收及首次账户配置。

交付记录分别报告已实现、已打包、已部署、已发布及各平台已验证能力。规划期已完成的是代码与官方资料只读核查、用户决议、Markdown tracker及链接／依赖检查；在线读取、消费者包、CI、真实Pages和npm均未实现或验收。许可证文件、正式package及PRD尚未按本决议修改，后续change负责落实。

本票未暴露需新增独立决策票的范围。六票可作为三个OpenSpec change的输入，下一步是创建第一个change的规划工件，而非继续替实施细节制造决策票。
