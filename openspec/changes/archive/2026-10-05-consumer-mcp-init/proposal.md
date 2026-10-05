# Proposal

## Why

消费者目前需要手动找到各宿主配置文件并填写 MCP 启动配置。增加可审阅的初始化命令，让用户按产品和作用域一次配置本项目 MCP。

## What Changes

- 消费者增加 `init`：ResearchSpec 风格搜索多选 TUI，以及 `--tools`、`--global`、`--yes/-y` 参数。
- 在任何写入前生成计划并确认；按已核实的宿主入口编辑配置，保留其他设置。
- 公开包版本升至 1.1.0，文档站配置使用不带版本标签的 npm 包名。

## Capabilities

### New Capabilities

- `consumer-mcp-init`: 产品选择、作用域、配置计划确认、格式保留和事务写入。

### Modified Capabilities

- `consumer-distribution`: 增加消费者 init 命令及无版本标签的默认 MCP 接入说明，查询和 MCP 保持只读。

## Impact

消费者入口、构建身份投影、实际 tarball 验收、文档与版本元数据；增加小型纯 JavaScript 交互和配置编辑依赖。
