---
schema_version: 3
record_kind: production
edition_id: bolt-web-mcp-v1
harness_id: bolt
topic: mcp
title: "Bolt 网页端的 MCP 连接器：配置入口、自定义服务器字段、认证、生命周期与工具暴露"
sections:
  - section_id: mcp-scope
    surface_ids: [web]
    source_refs: [ref-bolt-docs-index-listing, ref-bolt-repo-package-json]
  - section_id: mcp-entry
    surface_ids: [web]
    source_refs: [ref-bolt-docs-mcp-access, ref-bolt-docs-mcp-toggle, ref-bolt-docs-mcp-builtin, ref-bolt-docs-account-connectors, ref-bolt-docs-mcp-practices]
  - section_id: mcp-definition-transport
    surface_ids: [web]
    source_refs: [ref-bolt-docs-mcp-builtin, ref-bolt-docs-mcp-custom, ref-bolt-docs-mcp-start]
  - section_id: mcp-auth
    surface_ids: [web]
    source_refs: [ref-bolt-docs-mcp-auth, ref-bolt-docs-mcp-start, ref-bolt-docs-mcp-builtin]
  - section_id: mcp-lifecycle
    surface_ids: [web]
    source_refs: [ref-bolt-docs-mcp-refresh, ref-bolt-docs-mcp-toggle, ref-bolt-docs-mcp-builtin]
  - section_id: mcp-capabilities-diagnostics
    surface_ids: [web]
    source_refs: [ref-bolt-docs-mcp-tools, ref-bolt-docs-mcp-toggle, ref-bolt-docs-mcp-refresh, ref-bolt-docs-mcp-edit, ref-bolt-docs-mcp-builtin, ref-bolt-docs-mcp-practices]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [web]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-bolt-docs-mcp-access, ref-bolt-docs-mcp-toggle, ref-bolt-docs-account-connectors, ref-bolt-docs-mcp-builtin]
  - question_id: mcp.definition
    answers:
      - surface_ids: [web]
        section_id: mcp-definition-transport
        status: answered
        source_refs: [ref-bolt-docs-mcp-builtin, ref-bolt-docs-mcp-custom, ref-bolt-docs-mcp-start]
  - question_id: mcp.transport
    answers:
      - surface_ids: [web]
        section_id: mcp-definition-transport
        status: answered
        source_refs: [ref-bolt-docs-mcp-custom]
  - question_id: mcp.auth
    answers:
      - surface_ids: [web]
        section_id: mcp-auth
        status: partial
        source_refs: [ref-bolt-docs-mcp-auth, ref-bolt-docs-mcp-start, ref-bolt-docs-mcp-builtin]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [web]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-bolt-docs-mcp-refresh, ref-bolt-docs-mcp-toggle, ref-bolt-docs-mcp-builtin]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [web]
        section_id: mcp-capabilities-diagnostics
        status: partial
        source_refs: [ref-bolt-docs-mcp-tools, ref-bolt-docs-mcp-refresh]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [web]
        section_id: mcp-capabilities-diagnostics
        status: answered
        source_refs: [ref-bolt-docs-mcp-tools, ref-bolt-docs-mcp-toggle, ref-bolt-docs-mcp-practices]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [web]
        section_id: mcp-capabilities-diagnostics
        status: partial
        source_refs: [ref-bolt-docs-mcp-edit, ref-bolt-docs-mcp-refresh, ref-bolt-docs-mcp-builtin]
---

## 固定来源与范围 {#mcp-scope}

本章的固定来源是官方帮助站文档页 `/building/using-bolt/connect-mcp`（官方文档索引把它列为
"Connect to an MCP server"）[@ref-bolt-docs-index-listing]，以及开源仓库提交
`eda10b121221b30825a4c16eec5da1fd3eb1eb99` 的 `package.json`
[@ref-bolt-repo-package-json]。

两条边界先说清楚：

- **开源修订里没有 MCP**。仓库依赖清单中不存在任何 MCP 客户端或传输实现，仓库里也没有
  MCP 配置文件、连接器注册表或服务器定义的解析代码 [@ref-bolt-repo-package-json]。
- **MCP 只存在于托管产品**，且完全通过网页端的连接器（Connectors）页面配置，不是文件。文档对
  配置入口、认证、传输、工具开关和刷新都有明确描述。

以下各节按"入口 → 定义与传输 → 认证 → 生命周期 → 能力与诊断"展开。文档快照没有标注适用
软件版本，本章是来源级知识。

## 配置入口与作用域 {#mcp-entry}

**mcp.entry**：MCP server 只在网页端注册，入口是账户设置里的 **Connectors (MCP)** 页；
它可以从首页聊天框的加号菜单 → Connectors → Manage connectors 打开，也可以在账户设置的左侧
导航里直接进入 "Connectors (MCP)" [@ref-bolt-docs-mcp-access][@ref-bolt-docs-account-connectors]。

作用域是"账户级注册 + 项目级启用"：

| 层级 | 在哪里设置 | 生效范围 |
| :-- | :-- | :-- |
| 账户 | Connectors (MCP) 页：添加内置或自定义 server、认证、工具开关 [@ref-bolt-docs-mcp-access] | 该账户的全部项目 |
| 项目 | 项目聊天框加号菜单 → Connectors 里的开关 [@ref-bolt-docs-mcp-toggle] | 仅当前项目 |
| 新项目默认 | 添加连接器时的 **Auto-enable for all projects** 勾选项 [@ref-bolt-docs-mcp-builtin] | 之后新建的项目 |

没有"项目文件里写 MCP 配置"的入口，因此不存在随仓库根目录或 home 目录变化的配置路径。
文档建议只在需要的项目里开启连接器，避免上下文与 token 膨胀 [@ref-bolt-docs-mcp-practices]。

## 服务器定义与传输 {#mcp-definition-transport}

**mcp.definition**：两种添加方式 [@ref-bolt-docs-mcp-builtin][@ref-bolt-docs-mcp-custom]。

内置连接器（Notion、Linear、GitHub 等）：server 信息由 Bolt 预置，用户只需提供凭据并点
**Connect** [@ref-bolt-docs-mcp-builtin]。

自定义连接器（**Custom MCP server**）的第一方字段，文档逐项给出 [@ref-bolt-docs-mcp-custom]：

| 字段 | 含义 | 备注 |
| :-- | :-- | :-- |
| `Name` | 在连接器设置里显示的名字 | 仅用于辨识 |
| `URL` | 服务器地址 | 文档示例为 `https://support.bolt.new/mcp` |
| `Transport type` | 与服务器通信的方式 | `HTTP` 是标准类型；只有服务器文档要求时才用 `SSE` |
| `Authentication` | 访问校验方式 | `API key` 或 `MCP OAuth` |

**mcp.transport**：文档只列出两种传输类型——`HTTP`（默认、标准）与 `SSE`
[@ref-bolt-docs-mcp-custom]。没有 stdio 或本地进程传输的配置字段；URL 是必填项，说明连接对象
是远程 HTTP 端点而不是本地命令 [@ref-bolt-docs-mcp-custom]。两种传输各自的启动时序、超时与
重试参数在固定来源中没有描述。

前置条件：多数连接器需要先拿到外部应用的凭据（密钥或登录），Bolt 在建立连接时验证这些凭据
[@ref-bolt-docs-mcp-start]。

## 认证 {#mcp-auth}

**mcp.auth**：文档给出三种取值 [@ref-bolt-docs-mcp-auth]：

1. `API key`——从被连接应用的开发者或账户设置里取得 API key，填入连接器配置。文档强调它等同于
   密码，需要保密。
2. `MCP OAuth`——用登录流程授权，行为与用 Google 等第三方账号登录应用一致。
3. `None`——仅用于公开、无登录的站点（文档给的例子是 Bolt Help Center）。文档同时说明这种
   情况不常见。

凭据由 Bolt 在设置连接时验证，验证通过后界面右上角显示 `Connected` 状态
[@ref-bolt-docs-mcp-builtin]；文档要求连接前先确认已从服务提供方拿到所需凭据
[@ref-bolt-docs-mcp-start]。固定来源没有描述 token 的存放位置、刷新时机、过期后的重新授权
流程，也没有说明自定义 header 字段，因此"凭据来源与刷新"只能回答到"在连接器设置里提供并被
Bolt 托管"这一层。

## 生命周期与刷新 {#mcp-lifecycle}

**mcp.lifecycle**：可确认的生命周期行为有三条 [@ref-bolt-docs-mcp-refresh][@ref-bolt-docs-mcp-toggle][@ref-bolt-docs-mcp-builtin]：

- **连接建立**：添加连接器时（内置或自定义）由用户在页面上点 Connect 触发，成功后状态变为
  `Connected`。
- **项目级启用**：连接器在项目里由开关控制；文档建议按需开启、用完关闭，以减小上下文
  [@ref-bolt-docs-mcp-toggle]。**Auto-enable for all projects** 决定新建项目时是否自动开启。
- **工具刷新**：服务方更新 MCP server 后，Bolt 会自动发现新工具；用户也可以手动
  **Refresh connection** 主动检查新工具，并在使用前复核；连接器显示 offline 时刷新可用来确认
  是否恢复 [@ref-bolt-docs-mcp-refresh]。

固定来源没有描述超时、重试次数、断线自动重连或连接缓存策略；这些属性和"多久探测一次"一样
没有文档依据。**缺口**：禁用与重连的自动化程度只到"手动刷新 + 有 Connected/offline 状态"。

## 能力暴露与诊断 {#mcp-capabilities-diagnostics}

**mcp.capabilities**：文档描述的能力单位是 **tools**——"连接器包含工具，即服务器允许 Bolt 执行的
动作，例如读取、创建或编辑数据"。可用工具的数量和类型由各应用决定 [@ref-bolt-docs-mcp-tools]。
资源（resources）与提示（prompts）这两类 MCP 能力在固定来源中没有出现，因此不能从 tools
推断它们已被支持；本章只确认 tools。刷新连接可以检查服务方新增的工具
[@ref-bolt-docs-mcp-refresh]。

**mcp.exposure**：暴露控制有两层 [@ref-bolt-docs-mcp-tools][@ref-bolt-docs-mcp-toggle]：

- **工具级**：连接器里所有可用工具默认全部开启；文档建议复核并关闭不需要的（例如只允许创建、
  不允许删除）。工具开关作用在连接器上、对**所有项目**生效，不能按项目分别开关。
- **项目级**：连接器本身可以按项目开关；关闭的连接器不贡献上下文，Bolt 也就看不到它的工具
  [@ref-bolt-docs-mcp-toggle]。

工具名在提示里如何呈现、是否有前缀或命名空间、是否有"每次调用需批准"的信任流程，文档都没有
描述。文档能确认的最细粒度就是"按连接器开关工具"；实践建议是关掉不用的连接器、并按需临时开启
，以免上下文与 token 消耗上升 [@ref-bolt-docs-mcp-practices]。

**mcp.diagnostics**：可观察入口 [@ref-bolt-docs-mcp-builtin][@ref-bolt-docs-mcp-refresh][@ref-bolt-docs-mcp-edit]：

| 要确认的事 | 可观察入口 |
| :-- | :-- |
| 连接是否建立 | 连接器页面右上角的 `Connected` 状态；offline 表示不可用 |
| 服务方是否新增工具 | 连接器的三点菜单 → Edit → **Refresh connection** |
| 工具是否可见、是否会被调用 | 连接器 Edit 页的 Tools 列表，勾选状态即"Bolt 可调用"的范围 |
| 如何移除或改写配置 | 三点菜单 → Edit（保存修改）或 Delete（确认 Delete server） |

这三条分别是"配置被读取/连接已建立"和"工具可见"的检查手段。文档没有提供查看单次工具调用请求
与返回的入口，也没有独立的诊断日志页；**调用是否成功**只能从对话结果推断。这一项在本主题内
保持未验证。
