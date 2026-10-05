# MCP 配置

本项目提供两种 stdio MCP 接入方式：在线消费者按需读取公开静态发布；本地 CLI 读取仓库构建的完整章节发布。两种方式都只提供只读查询工具。

<!-- #region online-mcp -->

## 在线 MCP 接入

在线方式使用 npm 消费者包，通过 `npx` 启动。宿主和运行环境需要安装 Node.js **24.x，版本不低于 24.12.0**。配置中的默认数据入口是 `https://leike0813.github.io/agent-harness-wiki/data/v1/`；程序启动时读取并固定一个在线发布。

将下面的通用 `mcpServers` 配置合并到 MCP 宿主的配置文件中：

```json
{
  "mcpServers": {
    "agent-harness-wiki": {
      "command": "npx",
      "args": ["-y", "agent-harness-wiki", "mcp"]
    }
  }
}
```

配置使用不带版本标签的包名 `agent-harness-wiki`，由 npm 解析到当前最新发布。`ahw init` 可自动生成并合并这段配置，细节见下文。

在线服务提供 `list_harnesses`、`get_topic`、`search_knowledge`、`compare_topics`、`get_source` 五个只读工具。每个产品主题只保留当前章节和最近一个历史版，其余历史会返回 `history_not_available`。搜索使用词法检索。

在线包不携带完整知识快照。它按需缓存已成功读取的资源，`--offline` 只能读取同一数据入口和协议下已有的缓存；缓存缺项时会报告错误，也不能补回已裁剪的章节。需要更换同协议镜像时，可在 `args` 的 `mcp` 前加入 `--data-url` 和入口地址。默认数据入口及缓存参数的完整说明见[消费者包说明](https://github.com/leike0813/agent-harness-wiki/blob/main/packages/consumer/README.md)。
<!-- #endregion online-mcp -->

## 自动配置 MCP 宿主（`ahw init`）

`ahw init` 是消费者包 1.1.0 引入的可选配置命令。它在写文件前先生成计划并请求确认，再按产品写入该产品所有已核实的本机 MCP 配置入口，缺失的已知有效文件会被创建。它只编辑宿主配置文件，不查询知识、不初始化在线服务、不访问网络、不执行任何 harness，也不修改知识真源。

```sh
ahw init                            # 交互选择产品与作用域，然后确认计划
ahw init --tools codex,claude-code  # 跳过选择；默认项目级，写入当前工作目录
ahw init --tools codex --global     # 显式选择全局作用域
ahw init --tools codex -y           # 参数模式跳过确认，仍打印计划
```

产品选择使用搜索多选界面：输入过滤，↑/↓ 移动，Space 勾选，Enter 完成，Ctrl+C 取消，默认不预选。该界面移植自 ResearchSpec，其本身改编自 OpenSpec 1.5.0，均为 MIT，归属见仓库 `NOTICE`。

- 产品身份来自 `catalog/harnesses.yaml`；`--tools` 接受逗号分隔的产品 id、名称或别名，并跳过选择界面。
- 作用域默认项目级，即当前工作目录；`--global` 选择全局。全部所选产品都没有项目级入口时，项目级选项被显式禁用，只提供全局，此时须使用全局；部分产品缺少项目级入口时，作用域提示、警告和计划都会在确认前列出被跳过的产品。
- 计划列出产品、作用域、具体文件路径、将要执行的动作和被跳过条目的原因。确认默认否；只有非 TUI 的参数模式接受 `--yes`／`-y` 跳过确认，且仍会输出计划。非交互输入必须同时给出显式产品（`--tools`）和 `--yes`。
- 只有界面级入口、没有已核实配置入口的条目按原因跳过；`--tools` 中未知的产品 ID 是非法输入，命令拒绝而非跳过。同名服务器已存在且配置相同时保持不动，不同时才在确认后更新；其他服务器和设置保留。
- 确认前完成全部解析、编辑和可写性预检，任一目标非法或不可写则整轮不写。确认后核对基线、备份并替换，失败时尽力恢复本轮写入，不覆盖并发修改。
- 生成的启动配置使用服务器名 `agent-harness-wiki`，命令为 `npx -y agent-harness-wiki mcp`，不带版本标签；显式传入的 `--data-url`、`--offline`、`--cache-dir`、`--no-file-cache` 会写进生成的启动配置，`--tools`／`--global`／`--yes` 只作为 `init` 的参数，不写入配置。
- 命令成功只表示配置已写入，不代表运行时健康，也不建立或验证任何产品能力事实。`--json` 的结构化结果只走 stdout。

`init` 与只读查询、MCP 是相互独立的职责：查询和 MCP 只读取已发布数据，不写任何配置；`init` 不读取知识、不调用 MCP 工具，也不发起知识查询。

## 本地完整历史 MCP

本地方式由仓库编译后的 CLI 启动，查询仓库准备的完整本地 release。环境需要 Node.js **24.x，版本不低于 24.12.0**，并按[开发指南](https://github.com/leike0813/agent-harness-wiki/blob/main/docs/development.md)安装依赖、构建 CLI、准备并验收生产章节发布。发布目录和 release ID 必须指向实际存在且通过校验的发布。

先取得仓库和发布目录的绝对路径，再把配置中的示例路径及 release ID 替换为本机值。绝对路径让宿主从任意工作目录启动时仍能找到 CLI 和发布：

```json
{
  "mcpServers": {
    "agent-harness-wiki-local": {
      "command": "node",
      "args": [
        "/absolute/path/to/agent-harness-wiki/dist/cli/index.js",
        "mcp",
        "--releases-root",
        "/absolute/path/to/agent-harness-wiki/releases",
        "--release-id",
        "<已准备的 release ID>"
      ]
    }
  }
}
```

本地服务也提供上述五个只读工具。它读取完整本地知识，包括章节历史，并使用本地发布的混合检索。显式 `--release-id` 固定该发布，切换 current 指针不会改变它；读取新发布时要更新配置中的 ID 并重启 MCP 进程。省略该参数时，进程启动时解析一次本地 current 指针，重启后才重新解析。

| 能力 | 在线消费者                   | 本地完整历史                         |
| ---- | ---------------------------- | ------------------------------------ |
| 数据 | 远程静态发布，按需读取       | 仓库构建的本地 release               |
| 历史 | 每主题当前版和最近一个历史版 | release 中保留的完整章节历史         |
| 检索 | 词法检索                     | 词法与本地语义混合检索（模型可用时） |
| 离线 | 仅使用已缓存资源，可能缺项   | 读取本地 release，不需要在线知识入口 |
| 更新 | 在线发布切换后重启进程       | 更新显式 release ID 后重启；默认 current 则重启重新解析 |

在线和本地 MCP 都在进程启动时选定知识发布，并在进程存续期间保持绑定。工具响应中的知识 release 身份不代表程序包版本，也不代表被调查产品的版本。
