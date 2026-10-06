# agent-harness-wiki

按需读取已发布 agent-harness-wiki 知识的消费者程序。提供五类在线查询、本地 stdio MCP 和显式配置命令 `init`；查询与 MCP 只读，`init` 按产品写入宿主 MCP 配置。不携带完整知识快照、SQLite、语义模型或维护命令。

## 运行环境

需要 Node `>=24.12.0 <25`。安装与运行不需要 pnpm、克隆仓库、TypeScript 或本机编译工具。包不运行安装脚本，也不安装任何 harness；依赖闭包只包含纯 JavaScript 运行时。

## 使用

当前源码版本为 1.2.0，支持 `local_transcripts`（本地 Transcript），尚未发布到 npm。读取含该主题的在线知识需要 1.2.0 或更高版本：旧消费者校验闭合主题枚举，会拒绝新主题。`data/v1/` 协议与资源布局不变；产品尚无该主题章节时正常返回 `not_investigated`。该功能只查询知识，不读取用户实际会话或提供清理命令。

默认使用 npm `latest`，不需要版本标签；需要固定时再指定精确版本（例如 `@1.2.0`）。也可通过 `npm exec --yes --package /path/to/agent-harness-wiki-1.2.0.tgz -- ahw --data-url <同协议入口> query list` 运行本地工件。公开发布和平台验收记录见[发布指南](https://github.com/leike0813/agent-harness-wiki/blob/main/docs/publication.md)。

```sh
npx -y agent-harness-wiki query topic --harness codex --topic mcp --surface-id cli
npx -y agent-harness-wiki query search --text MCP
npx -y agent-harness-wiki@1.2.0 --version   # 可选：固定精确版本
npx -y agent-harness-wiki mcp
npx -y agent-harness-wiki init
npx -y agent-harness-wiki --help
```

命令为 `query list`、`query topic`、`query search`、`query compare`、`query source`、`mcp`、`init`、`--version` 与 `--help`；查询输入沿用公共五工具 schema。`--json` 可放在启动参数或子命令的任意位置，输出结构化结果。精确知识版本不是启动参数，在线查询始终绑定启动时确认的发布。查询与 MCP 只读；`init` 是唯一的写命令，见下节。

## 配置 MCP 宿主（`init`）

`ahw init` 把本项目的 MCP 启动配置写入选定产品的本机宿主配置。它使用搜索多选界面：输入过滤，↑/↓ 移动，Space 勾选，Enter 完成，Ctrl+C 取消，默认不预选；该界面移植自 ResearchSpec，其本身改编自 OpenSpec 1.5.0，均为 MIT，归属见 `NOTICE`。

```sh
ahw init                          # 交互选择产品与作用域，然后确认计划
ahw init --tools codex,pi         # 跳过选择；默认项目级，写入当前工作目录
ahw init --tools codex --global   # 显式选择全局作用域
ahw init --tools codex -y         # 参数模式跳过确认，仍打印计划
```

产品身份来自 catalog；`--tools` 接受逗号分隔的产品 id、名称或别名，未知的产品 ID 视为非法输入被拒绝。写入前先展示计划，列出产品、作用域、文件路径、动作与跳过原因，确认默认否；只有非 TUI 的参数模式接受 `--yes`／`-y`。非交互输入必须同时给出 `--tools` 与 `--yes`。项目级作用域默认是当前工作目录；全部所选产品缺少项目级入口时显式禁用项目级，只能选全局，部分缺少时在选择说明、警告和计划中列出。仅有界面级入口、没有已核实配置入口的条目按原因跳过；同名服务器配置相同则保持不动，不同才在确认后更新，其他服务器与设置保留。预检发现非法或不可写目标时整轮不写。生成的启动使用服务器名 `agent-harness-wiki`，命令为 `npx -y agent-harness-wiki mcp`（不带版本标签），显式传入的 `--data-url`、`--offline`、`--cache-dir`、`--no-file-cache` 会写进配置。

`init` 不访问网络、不初始化在线查询、不执行 harness、不写知识真源；查询与 MCP 仍然只读。写入成功只表示配置已就位，不代表运行时健康。

## 启动参数

| 参数                 | 作用                                                             |
| -------------------- | ---------------------------------------------------------------- |
| `--data-url <URL>`   | 覆盖默认数据入口，只用于同协议镜像                               |
| `--offline`          | 不发起网络请求，只读同一入口／协议下最近一次成功初始化的必需缓存 |
| `--cache-dir <目录>` | 显式缓存目录，按调用工作目录解析并优先于平台默认                 |
| `--no-file-cache`    | 关闭文件缓存读写，进程内缓存仍可用                               |

启动参数可放在子命令前或后。默认在线并启用文件缓存。默认入口是 `https://leike0813.github.io/agent-harness-wiki/data/v1/`；入口不可达时按网络失败报告。

## 缓存目录

| 平台           | 默认目录                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| Linux          | 有效绝对 `$XDG_CACHE_HOME/agent-harness-wiki`；未设置、为空或相对时用 `~/.cache/agent-harness-wiki`                 |
| macOS          | `~/Library/Caches/agent-harness-wiki`                                                                               |
| Windows native | 有效绝对 `%LOCALAPPDATA%\agent-harness-wiki\Cache`；无效时用 `%USERPROFILE%\AppData\Local\agent-harness-wiki\Cache` |

目录内按规范化数据入口、协议、发布和资源位置分隔。内存内容上限 32 MiB，文件内容目标 128 MiB 并按最近最少使用回收；这是软上限，不是严格磁盘配额。`--offline` 只保证已缓存资源，容量回收后可能缺资源，它不是完整知识副本。

服务端每个受支持协议在线只保留 current 和最近一个已验证的恢复发布。更早的发布退出在线后，绑定它的 MCP 进程可能必须重启，已缓存资源也不足以继续完整读取；需要某一历史发布时改用本地发布。

## 程序版本与知识版本

`ahw --version` 与 MCP 初始化 `serverInfo.version` 报告程序版本。响应中的 `release_id` 和 `knowledge_published_at` 是知识发布身份与发布时间，不是 npm 包版本，也不是被调查软件的版本。软件版本由 `topic` 查询的映射决定。

## 检索能力

只提供词法检索。结果不含 `semantic_status`，也没有语义开关或模型下载；仓库本地发布的混合检索是独立的维护者能力。

## 在线历史

每个产品 × 主题只保留当前章与最近一个历史版。按选版规则选中被裁剪章节时返回正常的 `history_not_available`，带上请求目标与解析结果，不会改选另一章或伪装成 `unsupported`、`unknown`。查看完整章节历史需要单独准备仓库本地发布，见[知识工作流](https://github.com/leike0813/agent-harness-wiki/blob/main/docs/knowledge-workflow.md)与[开发指南](https://github.com/leike0813/agent-harness-wiki/blob/main/docs/development.md)；`--offline` 不能补齐被裁剪章节。

## 错误与协议升级

技术错误有稳定代码、简短原因、`retryable` 和已绑定发布（如已知）。CLI 技术失败以非零退出码结束，`--json` 时 stdout 输出同一结构化错误；MCP 用 `isError` 返回同一结构的文本与结构化内容。网络失败、缓存缺口、限流与发布资源缺失是技术错误；`unknown`、`not_found`、`ambiguous`、`not_investigated`、`history_not_available` 是正常领域结果。

初始化读到不兼容协议返回 `unsupported_protocol`；读到明确的机器可读退役标记返回 `protocol_retired` 并提示升级。两者都不开放工具，也不编造 release ID。

## MCP 接入

在线与本地 MCP 宿主配置、默认数据入口、`init` 配置方式及完整历史选项见[仓库 MCP 配置指南](https://github.com/leike0813/agent-harness-wiki/blob/main/docs/mcp-configuration.md)。在线服务使用不带版本标签的 `npx` 配置；本地服务使用仓库编译后的 CLI 和本地 release。

服务恰好暴露 `list_harnesses`、`get_topic`、`search_knowledge`、`compare_topics`、`get_source` 五个只读工具，不暴露 Resources、Prompts 或写工具。响应内容上限 128 KiB，来源摘录最多 2000 字符；整章超限返回 `response_too_large` 与小节索引，每个小节仍可单独完整读取。

## 许可

代码采用 MIT，原创知识与文档采用 CC BY 4.0，第三方来源摘录保留其原有权利。见仓库 `LICENSE`、`LICENSE-knowledge` 与 `NOTICE`。
