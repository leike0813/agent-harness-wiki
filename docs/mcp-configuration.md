# MCP 配置

本项目提供两种 stdio MCP 接入方式：在线消费者按需读取公开静态发布；本地 CLI 读取仓库构建的完整章节发布。两种方式都只提供只读查询工具。

<!-- #region online-mcp -->

## 在线 MCP 接入

在线方式使用固定版本的 npm 消费者包，通过 `npx` 启动。宿主和运行环境需要安装 Node.js **24.x，版本不低于 24.12.0**。配置中的默认数据入口是 `https://leike0813.github.io/agent-harness-wiki/data/v1/`；程序启动时读取并固定一个在线发布。

将下面的通用 `mcpServers` 配置合并到 MCP 宿主的配置文件中：

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

在线服务提供 `list_harnesses`、`get_topic`、`search_knowledge`、`compare_topics`、`get_source` 五个只读工具。每个产品主题只保留当前章节和最近一个历史版，其余历史会返回 `history_not_available`。搜索使用词法检索。

在线包不携带完整知识快照。它按需缓存已成功读取的资源，`--offline` 只能读取同一数据入口和协议下已有的缓存；缓存缺项时会报告错误，也不能补回已裁剪的章节。需要更换同协议镜像时，可在 `args` 的 `mcp` 前加入 `--data-url` 和入口地址。默认数据入口及缓存参数的完整说明见[消费者包说明](https://github.com/leike0813/agent-harness-wiki/blob/main/packages/consumer/README.md)。
<!-- #endregion online-mcp -->

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
