---
schema_version: 3
record_kind: production
edition_id: openhands-cli-mcp-v1
harness_id: openhands
topic: mcp
title: "OpenHands CLI 的 MCP：配置文件、传输、认证、连接、暴露与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-readme-status, ref-openhands-cli-pyproject, ref-openhands-canvas-boundaries]
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-mcp-utils, ref-openhands-cli-locations, ref-openhands-cli-mcp-parser, ref-openhands-cli-mcp-commands, ref-openhands-docs-cli-mcp-commands, ref-openhands-docs-cli-mcp-format, ref-openhands-docs-mcp-add-custom]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-mcp-utils, ref-openhands-cli-mcp-crud, ref-openhands-cli-mcp-enabled-list, ref-openhands-sdk-skills-expand, ref-openhands-cli-acp-local, ref-openhands-docs-mcp-fields]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-mcp-parser, ref-openhands-cli-mcp-display, ref-openhands-docs-mcp-supported, ref-openhands-cli-acp-mcp, ref-openhands-docs-cli-mcp-stdio, ref-openhands-docs-cli-mcp-http]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-mcp-parser, ref-openhands-cli-mcp-crud, ref-openhands-docs-mcp-oauth, ref-openhands-sdk-skills-expand, ref-openhands-cli-mcp-display, ref-openhands-cli-runtime-config2]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-runtime-config2, ref-openhands-cli-mcp-enabled-list, ref-openhands-sdk-mcp-agent, ref-openhands-sdk-mcp-connect, ref-openhands-sdk-mcp-tool, ref-openhands-cli-mcp-enable, ref-openhands-docs-mcp-how]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-mcp-connect, ref-openhands-sdk-mcp-tool-def, ref-openhands-sdk-mcp-agent]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-runtime-config2, ref-openhands-cli-setup-agent, ref-openhands-sdk-mcp-merge, ref-openhands-sdk-mcp-agent, ref-openhands-sdk-mcp-tool-def, ref-openhands-sdk-mcp-namespacing, ref-openhands-cli-acp-mcp]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-openhands-docs-cli-mcp-commands, ref-openhands-cli-mcp-status, ref-openhands-cli-mcp-panel, ref-openhands-cli-resources, ref-openhands-sdk-mcp-connect, ref-openhands-cli-acp-local, ref-openhands-docs-cli-mcp-troubleshooting, ref-openhands-cli-mcp-parser]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-openhands-cli-mcp-utils, ref-openhands-cli-locations, ref-openhands-cli-mcp-parser, ref-openhands-docs-cli-mcp-format, ref-openhands-docs-mcp-add-custom]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-openhands-cli-mcp-crud, ref-openhands-cli-mcp-enabled-list, ref-openhands-sdk-skills-expand, ref-openhands-docs-mcp-fields]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-openhands-cli-mcp-parser, ref-openhands-cli-mcp-display, ref-openhands-docs-mcp-supported, ref-openhands-cli-acp-mcp]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-openhands-cli-mcp-crud, ref-openhands-docs-mcp-oauth, ref-openhands-sdk-skills-expand, ref-openhands-cli-mcp-display]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-openhands-cli-runtime-config2, ref-openhands-cli-mcp-enabled-list, ref-openhands-sdk-mcp-agent, ref-openhands-sdk-mcp-connect, ref-openhands-cli-mcp-enable]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-openhands-sdk-mcp-connect, ref-openhands-sdk-mcp-tool-def]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-openhands-cli-setup-agent, ref-openhands-sdk-mcp-merge, ref-openhands-sdk-mcp-agent, ref-openhands-sdk-mcp-namespacing, ref-openhands-cli-acp-mcp]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-openhands-docs-cli-mcp-commands, ref-openhands-cli-mcp-status, ref-openhands-cli-mcp-panel, ref-openhands-cli-resources, ref-openhands-docs-cli-mcp-troubleshooting]
---

## 固定来源与调查范围 {#mcp-scope}

本页只回答 CLI 界面（`surface_id: cli`）。固定来源：CLI 仓库 `OpenHands/OpenHands-CLI@954f2ba`（包 `openhands` 1.16.0，入口 `openhands` / `openhands-acp`）[@ref-openhands-cli-pyproject]，其 README 说明仓库已不再积极维护并建议改用 Agent Canvas [@ref-openhands-cli-readme-status]；MCP 的客户端实现来自 CLI 依赖的 `openhands-sdk==1.28.1`（本目录固定 v1.28.1，提交 `edaac806`）[@ref-openhands-cli-pyproject]；产品 Web 端位于另一官方仓库 [@ref-openhands-canvas-boundaries]。官方文档站点页面作为文档快照来源，其适用软件版本未知。

## 配置入口与作用域 {#mcp-entry}

CLI 的 MCP 配置只有一个文件：`{OPENHANDS_PERSISTENCE_DIR}/mcp.json`，默认 `~/.openhands/mcp.json`；路径由 `locations.get_persistence_dir()` 与常量 `MCP_CONFIG_FILE = "mcp.json"` 拼出，写文件前会创建父目录 [@ref-openhands-cli-mcp-utils] [@ref-openhands-cli-locations]。没有项目级 MCP 文件：`~/.openhands` 下的 `projects/{hash}/` 只放提示历史等项目态数据 [@ref-openhands-cli-locations]，官方文档也明确每个项目没有独立的 MCP 配置文件，只能通过 UI 或该 JSON 编辑 [@ref-openhands-docs-cli-mcp-format] [@ref-openhands-docs-mcp-add-custom]。

用户可用的操作方式：

```bash
openhands mcp list                 # 列出已配置 server
openhands mcp get SERVER_NAME      # 查看单个 server 详情
openhands mcp add SERVER_NAME --transport http https://api.example.com/mcp
openhands mcp enable SERVER_NAME   # 还有 disable / remove
```

命令由 `argparsers/mcp_parser.py` 定义并在 `entrypoint.py` 中分发 [@ref-openhands-cli-mcp-parser]；`add` 会先解析、校验并写入 `mcp.json`，随后提示需要重启会话才能生效 [@ref-openhands-cli-mcp-commands]。文档列出的命令与参数（`--transport`、`--header`、`--env`、`--auth`、`--enabled/--disabled`）与源码一致 [@ref-openhands-docs-cli-mcp-commands]。Agent Canvas（Web 端）把同一批 server 存在它自己的设置文件（默认 `~/.openhands/settings.json`，凭据加密）里，与本 CLI 的 `mcp.json` 不通用，本页不展开 [@ref-openhands-docs-mcp-add-custom]。

## Server 定义格式 {#mcp-definition}

文件格式是 FastMCP 的 MCPConfig：顶层对象只有 `mcpServers` 映射，键是 server 名，值是 server 对象；CLI 用 `MCPConfig.from_file` 读取、`write_to_file` 写回 [@ref-openhands-cli-mcp-utils] [@ref-openhands-cli-mcp-crud]。

| 位置 | 字段 | 说明 |
| --- | --- | --- |
| stdio server | `command`、`args`、`env`、`transport="stdio"` | 由 CLI 的 `add_server` 构造 `StdioMCPServer` [@ref-openhands-cli-mcp-crud] |
| 远程 server | `url`、`transport`（`"http"` 或 `"sse"`）、`headers`、`auth` | 由 `add_server` 构造 `RemoteMCPServer` [@ref-openhands-cli-mcp-crud] |
| 通用 | `enabled` | CLI 额外写入的布尔字段；模型允许额外字段，缺省视为启用 [@ref-openhands-cli-mcp-crud] [@ref-openhands-cli-mcp-enabled-list] |

最小示例（字段来自 CLI 自身写出的结构，可放进 `~/.openhands/mcp.json`）：

```json
{
  "mcpServers": {
    "local-tools": {
      "command": "python",
      "args": ["-m", "my_mcp_server"],
      "env": {"API_KEY": "${MY_API_KEY}"},
      "transport": "stdio",
      "enabled": true
    }
  }
}
```

`${VAR}` / `${VAR:-default}` 形式的占位符由 SDK 在会话初始化时展开：解析顺序是显式变量（例如 Skill 的 `SKILL_ROOT`）、secret 回调、`os.environ`，最后才是默认值；只有会话初始化那一处会应用默认值，无法解析的占位符按原样保留 [@ref-openhands-sdk-skills-expand]。不带花括号的 `$VAR` 不做展开 [@ref-openhands-sdk-skills-expand]。`setattr(server, "enabled", ...)` 写入的 `enabled` 不在 FastMCP 的 schema 内，因此读取端要用“缺省即启用”的语义 [@ref-openhands-cli-mcp-enabled-list]；解析失败（例如 JSON 语法错误）时用户在 ACP/本地 Agent 路径会看到指向 `~/.openhands/mcp.json` 的提示 [@ref-openhands-cli-acp-local]。官方文档给出的字段表（Server 名、URL、认证、超时；stdio 的 Command、参数、环境变量）描述的是 Web UI 表单，其中“超时”字段在 CLI 的 JSON/解析器中没有对应键 [@ref-openhands-docs-mcp-fields]。

## 传输方式 {#mcp-transport}

CLI 接受三种传输：`http`、`sse`、`stdio`，`--transport` 为必填且限定这三个取值 [@ref-openhands-cli-mcp-parser]；读取配置时若传输字段缺失，显示层按“有 `command` 且无 `url` 判定 stdio，否则 http”做兜底 [@ref-openhands-cli-mcp-display]。文档描述的传输集合相同，并说明 HTTP 即 streamable HTTP [@ref-openhands-docs-mcp-supported]。

远程 server 的添加方式（CLI 语法，来自 `mcp_parser` 的帮助文本）：

```bash
openhands mcp add my-api --transport http --header "Authorization: Bearer your-token" https://api.example.com/mcp
openhands mcp add notion --transport http --auth oauth https://mcp.notion.com/mcp
openhands mcp add local-server --transport stdio --env "API_KEY=secret" python -- -m my_mcp_server
```

stdin/HTTP 之外的细节：stdio 的 `--env` 是 `KEY=value` 形式、可重复；`--` 之后的参数原样作为命令参数 [@ref-openhands-cli-mcp-parser] [@ref-openhands-docs-cli-mcp-stdio]。ACP（IDE 集成）路径不会在本地进程内连接 MCP，而是把客户端给出的 server 转成 Agent 配置字典后交给子进程：含 `command` 的转 stdio，`url` 且传输为 `sse` 的转 SSE，其余转 HTTP [@ref-openhands-cli-acp-mcp] [@ref-openhands-docs-cli-mcp-http]。

## 认证与凭据 {#mcp-auth}

- 静态 Header：`--header "Key: value"`，可重复，按第一个冒号拆分；缺少分隔符抛 `MCPConfigurationError` [@ref-openhands-cli-mcp-parser] [@ref-openhands-cli-mcp-crud]。
- 环境变量：`--env "KEY=value"`，可重复，按第一个等号拆分 [@ref-openhands-cli-mcp-crud]。
- OAuth：`--auth oauth` 是唯一的 `--auth` 取值；文档说明令牌由客户端库缓存在 `~/.fastmcp/oauth-mcp-client-cache/` 并自动刷新 [@ref-openhands-cli-mcp-parser] [@ref-openhands-docs-mcp-oauth]。
- 变量展开：Header 与 env 值里可用 `${VAR}` / `${VAR:-default}`，展开发生在会话初始化阶段，来源顺序为显式变量 → secret 回调 → 进程环境 → 默认值 [@ref-openhands-sdk-skills-expand]。
- 展示脱敏：`mcp list`/`get` 渲染时对疑似敏感值做掩码，避免把令牌原样打印 [@ref-openhands-cli-mcp-display]。

注意：CLI 把 Agent（含 `mcp_config`）以明文序列化进 `agent_settings.json`（`model_dump_json(context={"expose_secrets": True})`），因此不要把长期凭据直接写进 `mcp.json` 或依赖 CLI 的持久化文件做加密，优先用 `${VAR}` 引用环境变量 [@ref-openhands-cli-runtime-config2] [@ref-openhands-sdk-skills-expand]。

## 生命周期与连接时机 {#mcp-lifecycle}

CLI 自身从不在命令执行期间连接 MCP server；它只读写 JSON，并在每次装载 Agent 时把“启用的 server”注入 Agent 的 `mcp_config`（`list_enabled_servers()` 过滤 `enabled`，无该字段视为启用；注入发生在 `_apply_runtime_config`，且每次装载都会覆盖磁盘上的旧值）[@ref-openhands-cli-runtime-config2] [@ref-openhands-cli-mcp-enabled-list]。

真正的连接在会话初始化：`AgentBase._initialize` 发现 `mcp_config` 非空时在线程池提交 `create_mcp_tools(self.mcp_config, 30)` [@ref-openhands-sdk-mcp-agent]，该函数先 `connect()` 再 `list_tools()`，默认 30 秒超时，超时抛出带 server 名的 `MCPTimeoutError` [@ref-openhands-sdk-mcp-connect]。单次工具调用另有 300 秒上限（`MCP_TOOL_TIMEOUT_SECONDS`）[@ref-openhands-sdk-mcp-tool]。`enable`/`disable` 只改文件，命令执行后会提示需要重启会话才生效 [@ref-openhands-cli-mcp-enable]；文档同样说明新增或修改的 server 只对新会话生效 [@ref-openhands-docs-mcp-how]。

## 能力发现 {#mcp-capabilities}

固定源码只接入 tools：连接成功后调用 `client.list_tools()`，把每个 MCP 工具包装成 `MCPToolDefinition`，其动作 schema 由 MCP 的 `inputSchema` 动态生成 pydantic 模型 [@ref-openhands-sdk-mcp-connect] [@ref-openhands-sdk-mcp-tool-def]。SDK 的 MCP 模块没有调用 `list_resources` / `list_prompts` 的任何代码，因此 resources 与 prompts 既不发现也不暴露给模型 [@ref-openhands-sdk-mcp-connect]。工具会与内置工具一起登记进 Agent 的工具集，可用性由 Agent 的 `filter_tools_regex` 统一约束 [@ref-openhands-sdk-mcp-agent]。

## 暴露、过滤与命名 {#mcp-exposure}

- 合并顺序：CLI 装载 Agent 时把启用的 server 写入 `mcp_config` [@ref-openhands-cli-runtime-config2]；`load_agent_specs` 允许调用方额外传入 server 并与已有配置合并，传入者优先（覆盖同名）[@ref-openhands-cli-setup-agent]；会话初始化还会把插件自带的 MCP 配置合并进来并做变量展开 [@ref-openhands-sdk-mcp-merge]。
- 过滤：MCP 工具与内置工具合并后统一经过 Agent 的 `filter_tools_regex`；同名工具会抛错（工具名必须唯一）[@ref-openhands-sdk-mcp-agent]。
- 命名：工具名默认为 MCP server 提供的原名；MCP 工具名默认就是 server 提供的原名；SDK 测试显示同时配置多个 server 时客户端库按“server 名_工具名”加前缀以避免冲突，单 server 时保持原名 [@ref-openhands-sdk-mcp-tool-def] [@ref-openhands-sdk-mcp-namespacing]。
- ACP 路径：MCP server 被转发给 ACP 子进程而不是在本进程连接，能力受对端声明的 `mcp_capabilities` 限制（例如对端不支持 http/sse 时远程 server 会被丢弃）[@ref-openhands-cli-acp-mcp]。

## 诊断 {#mcp-diagnostics}

按“配置被读取 → 已连接 → 工具可见 → 调用成功”分层排查：

1. 配置是否被读取：`openhands mcp list` / `get SERVER_NAME` 直接渲染文件内容；为空时会打印配置路径建议 [@ref-openhands-docs-cli-mcp-commands]。`get_config_status()` 返回 `{exists, valid, servers, message}` 供内部与测试判断文件是否存在、是否可解析 [@ref-openhands-cli-mcp-status]。
2. 会话内已装载哪些 server：TUI 的 MCP 侧栏显示“当前 Agent 的 server”（来自 Agent 的 `mcp_config`）与“重启后将生效的变更”（来自文件与内存差异），`/skills` 视图也会列出 MCP 条目及传输类型 [@ref-openhands-cli-mcp-panel] [@ref-openhands-cli-resources]。
3. 连接与调用失败：连接超时会得到包含 server 名的 `MCPTimeoutError`；MCP server 的日志由 SDK 转发到 Python logging [@ref-openhands-sdk-mcp-connect]。ACP 本地路径在配置解析失败时会提示检查 `~/.openhands/mcp.json` 的 JSON 语法 [@ref-openhands-cli-acp-local]。
4. 官方文档的排障清单（server 未出现、server 启动失败、配置文件位置）可用于对照，但它描述的交互式 `/mcp` 命令在固定快照的 CLI 源码中并不存在：命令清单里只有 `/skills` 等图标命令，`/mcp` 未注册，属于文档与源码的差别 [@ref-openhands-docs-cli-mcp-troubleshooting] [@ref-openhands-cli-mcp-parser]。
