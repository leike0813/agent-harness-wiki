# agent-harness-wiki

按需读取已发布 agent-harness-wiki 知识的只读消费者程序。提供五类在线查询和本地 stdio MCP；不携带完整知识快照、SQLite、语义模型或维护命令。

## 运行环境

需要 Node `>=24.12.0 <25`。安装与运行不需要 pnpm、克隆仓库、TypeScript 或本机编译工具。包不运行安装脚本，也不安装任何 harness；依赖闭包只包含纯 JavaScript 运行时。

## 使用

当前交付为本地 tgz，尚未发布到 npm，默认知识入口也尚未部署。下面的固定版本 npx 示例与 MCP 配置供公开发布后使用；本地工件可通过 `npm exec --yes --package /path/to/agent-harness-wiki-1.0.0.tgz -- ahw --data-url <已发布的同协议入口> query list` 运行。

```sh
npx -y agent-harness-wiki@1.0.0 query topic --harness codex --topic mcp --surface-id cli
npx -y agent-harness-wiki@1.0.0 query search --text MCP
npx -y agent-harness-wiki@1.0.0 --version
npx -y agent-harness-wiki@1.0.0 --help
```

命令为 `query list`、`query topic`、`query search`、`query compare`、`query source`、`mcp`、`--version` 与 `--help`；查询输入沿用公共五工具 schema。`--json` 可放在启动参数或子命令的任意位置，输出结构化结果。精确知识版本不是启动参数，在线查询始终绑定启动时确认的发布。

## 启动参数

| 参数 | 作用 |
|---|---|
| `--data-url <URL>` | 覆盖默认数据入口，只用于同协议镜像 |
| `--offline` | 不发起网络请求，只读同一入口／协议下最近一次成功初始化的必需缓存 |
| `--cache-dir <目录>` | 显式缓存目录，按调用工作目录解析并优先于平台默认 |
| `--no-file-cache` | 关闭文件缓存读写，进程内缓存仍可用 |

启动参数可放在子命令前或后。默认在线并启用文件缓存。默认入口是 `https://leike0813.github.io/agent-harness-wiki/data/v1/`；该地址在规划时尚未部署，未部署时在线启动按网络失败报告，不会假装已经取得知识。

## 缓存目录

| 平台 | 默认目录 |
|---|---|
| Linux | 有效绝对 `$XDG_CACHE_HOME/agent-harness-wiki`；未设置、为空或相对时用 `~/.cache/agent-harness-wiki` |
| macOS | `~/Library/Caches/agent-harness-wiki` |
| Windows native | 有效绝对 `%LOCALAPPDATA%\agent-harness-wiki\Cache`；无效时用 `%USERPROFILE%\AppData\Local\agent-harness-wiki\Cache` |

目录内按规范化数据入口、协议、发布和资源位置分隔。内存内容上限 32 MiB，文件内容目标 128 MiB 并按最近最少使用回收；这是软上限，不是严格磁盘配额。`--offline` 只保证已缓存资源，容量回收后可能缺资源，它不是完整知识副本。

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

宿主配置指向 npx 并固定精确程序版本与 `mcp` 子命令，不自动改写宿主配置：

```json
{
  "mcpServers": {
    "agent-harness-wiki": {
      "command": "npx",
      "args": ["-y", "agent-harness-wiki@1.0.0", "mcp"]
    }
  }
}
```

服务恰好暴露 `list_harnesses`、`get_topic`、`search_knowledge`、`compare_topics`、`get_source` 五个只读工具，不暴露 Resources、Prompts 或写工具。响应内容上限 128 KiB，来源摘录最多 2000 字符；整章超限返回 `response_too_large` 与小节索引，每个小节仍可单独完整读取。

## 许可

代码采用 MIT，原创知识与文档采用 CC BY 4.0，第三方来源摘录保留其原有权利。见仓库 `LICENSE`、`LICENSE-knowledge` 与 `NOTICE`。
