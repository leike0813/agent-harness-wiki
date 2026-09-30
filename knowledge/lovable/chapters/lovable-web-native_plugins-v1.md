---
schema_version: 3
record_kind: production
edition_id: lovable-web-native_plugins-v1
harness_id: lovable
topic: native_plugins
title: "Lovable Web 的原生插件：不存在插件体系，扩展面是 connector 与 MCP"
sections:
  - section_id: plugins-model
    surface_ids: [web]
    source_refs: [ref-lovable-connectors-faq, ref-lovable-index-header, ref-lovable-index-listing, ref-lovable-figma-plugin, ref-lovable-mcpsrv-clients, ref-lovable-desktop-mcp, ref-lovable-connectors-types, ref-lovable-adminconn-chat]
  - section_id: plugins-local-mcp
    surface_ids: [web]
    source_refs: [ref-lovable-desktop-requirements, ref-lovable-desktop-mcp, ref-lovable-desktop-figma, ref-lovable-desktop-custom-local, ref-lovable-desktop-security, ref-lovable-priv-mcpconn, ref-lovable-adminconn-chat, ref-lovable-figma-plugin, ref-lovable-figma-mcp, ref-lovable-figma-upload]
  - section_id: plugins-foreign
    surface_ids: [web]
    source_refs: [ref-lovable-mcpsrv-clients]
  - section_id: plugins-foreigncheck
    surface_ids: [web]
    source_refs: [ref-lovable-figma-plugin, ref-lovable-mcpsrv-clients, ref-lovable-desktop-mcp, ref-lovable-connectors-faq, ref-lovable-connectors-types]
  - section_id: plugins-diagnostics
    surface_ids: [web]
    source_refs: [ref-lovable-desktop-security, ref-lovable-desktop-mcp, ref-lovable-figma-mcp, ref-lovable-priv-mcpconn, ref-lovable-adminconn-chat, ref-lovable-desktop-faq, ref-lovable-mcpsrv-clients, ref-lovable-mcpsrv-troubleshoot]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [web]
        section_id: plugins-model
        status: answered
        source_refs: [ref-lovable-connectors-faq, ref-lovable-index-header, ref-lovable-index-listing, ref-lovable-figma-plugin, ref-lovable-mcpsrv-clients, ref-lovable-desktop-mcp, ref-lovable-connectors-types, ref-lovable-adminconn-chat]
  - question_id: plugins.package
    answers:
      - surface_ids: [web]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-lovable-connectors-faq, ref-lovable-index-header, ref-lovable-index-listing, ref-lovable-figma-plugin, ref-lovable-mcpsrv-clients, ref-lovable-desktop-mcp, ref-lovable-connectors-types, ref-lovable-adminconn-chat]
  - question_id: plugins.install
    answers:
      - surface_ids: [web]
        section_id: plugins-local-mcp
        status: partial
        source_refs: [ref-lovable-desktop-requirements, ref-lovable-desktop-mcp, ref-lovable-desktop-figma, ref-lovable-desktop-custom-local, ref-lovable-desktop-security, ref-lovable-priv-mcpconn, ref-lovable-adminconn-chat, ref-lovable-figma-plugin, ref-lovable-figma-mcp, ref-lovable-figma-upload]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [web]
        section_id: plugins-local-mcp
        status: partial
        source_refs: [ref-lovable-desktop-requirements, ref-lovable-desktop-mcp, ref-lovable-desktop-figma, ref-lovable-desktop-custom-local, ref-lovable-desktop-security, ref-lovable-priv-mcpconn, ref-lovable-adminconn-chat, ref-lovable-figma-plugin, ref-lovable-figma-mcp, ref-lovable-figma-upload]
  - question_id: plugins.api
    answers:
      - surface_ids: [web]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-lovable-connectors-faq, ref-lovable-index-header, ref-lovable-index-listing, ref-lovable-figma-plugin, ref-lovable-mcpsrv-clients, ref-lovable-desktop-mcp, ref-lovable-connectors-types, ref-lovable-adminconn-chat]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [web]
        section_id: plugins-local-mcp
        status: partial
        source_refs: [ref-lovable-desktop-requirements, ref-lovable-desktop-mcp, ref-lovable-desktop-figma, ref-lovable-desktop-custom-local, ref-lovable-desktop-security, ref-lovable-priv-mcpconn, ref-lovable-adminconn-chat, ref-lovable-figma-plugin, ref-lovable-figma-mcp, ref-lovable-figma-upload]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [web]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-lovable-desktop-security, ref-lovable-desktop-mcp, ref-lovable-figma-mcp, ref-lovable-priv-mcpconn, ref-lovable-adminconn-chat, ref-lovable-desktop-faq, ref-lovable-mcpsrv-clients, ref-lovable-mcpsrv-troubleshoot]
---

## 什么算 Lovable 的原生插件 {#plugins-model}

**结论：Lovable 没有原生插件体系。** 没有插件包格式、没有插件清单、没有插件注册 API、没有插件市场，也没有"插件能注册哪些能力"的文档。官方在 connectors 概览里枚举"目录之外还能怎么扩展"时只给出三条：自定义 connector、直接集成任意 API、自定义 MCP server [@ref-lovable-connectors-faq]；官方文档全量索引 `llms.txt` 逐条列出全部页面且不含插件页面 [@ref-lovable-index-header][@ref-lovable-index-listing]。

本章固定来源是 2026-10-01 抓取的 `integrations/introduction.md`、`integrations/figma.md`、`integrations/desktop-app.md`、`integrations/lovable-mcp-server.md`、`integrations/admin-controls.md`、`features/privacy-and-security-settings.md` 与官方全量索引。

读者需要区分三类被叫做 "plugin" 的东西，它们**都不是本产品的原生插件**：

| 名字 | 实际是什么 | 谁被扩展 | 依据 |
| :-- | :-- | :-- | :-- |
| **Lovable Figma plugin** | 运行在 **Figma** 里的插件，把设计导出到 Lovable 工作区 | Figma | [@ref-lovable-figma-plugin] |
| **Lovable 的 Claude Code / Cursor / Codex 插件** | 其他宿主里的插件，内部就是连 **Lovable MCP server** 并附带一组 slash 命令 | Claude Code / Cursor / Codex | [@ref-lovable-mcpsrv-clients] |
| **Lovable 桌面应用的本地 MCP server** | MCP 协议扩展（本机进程或本机 HTTP），不是打包的插件 | Lovable 桌面应用 | [@ref-lovable-desktop-mcp] |

**在 Lovable 内部做扩展的真实形态**是下面这张表里的三种，全部通过**工作区表单**定义，而不是通过安装一个包：

| 扩展面 | 定义位置 | 谁可以定义 | 依据 |
| :-- | :-- | :-- | :-- |
| **Catalog connector**（app + chat / chat / app user 三种连接方式） | `Connectors` 目录选中工具后 `Add connection` | 连接由有权限的成员按连接的 Sharing 规则创建 | [@ref-lovable-connectors-types] |
| **Custom connector**（任意 REST API → app + chat） | `Connectors` → **+** → **Custom connector**，一个表单（Details / Authentication / Agent knowledge） | 工作区 admin/owner；连接器只对该工作区可见 | [@ref-lovable-connectors-faq] |
| **Custom MCP server / MCP registry**（工具上下文；目录） | `Connectors` → **+** → **MCP server** / **MCP registry** | MCP server 由成员自行连接（个人级）；registry 由 owner/admin 添加 | [@ref-lovable-adminconn-chat] |

**包格式与注册 API：不适用。** 登记来源中没有 manifest、入口点、兼容性声明、权限声明或宿主 API 边界的说明。唯一带"包"形态的是**技能**（`.zip` / `.skill`，内含 `SKILL.md` 与捆绑文件），但技能只提供指令、**不能注册能力或扩展点**，属于 `skills` 主题。已检查官方全量页面索引与登记来源中的 connectors、MCP、桌面应用、Figma 各页。

## 本机可安装、启用、查询的唯一扩展面：桌面应用的本地 MCP server {#plugins-local-mcp}

如果只问"有没有能在本机装上、启用、禁用、查看、移除的东西"，答案是**有一个，但它属于 MCP 主题**：

* **前置**：macOS 12+（Apple Silicon 或 Intel）或 Windows；桌面应用所有计划免费，账号、积分与工作区设置与 Web 共用 [@ref-lovable-desktop-requirements]；
* **自动发现**：桌面应用 `Connectors → Local MCP servers` 列出本机正在运行并暴露 MCP server 的工具。官方两个例子是 **Figma Desktop**（打开 Design 文件 → 切到 Dev Mode → 点 **Enable desktop MCP server**）与 **Paper**（保持运行）[@ref-lovable-desktop-mcp][@ref-lovable-desktop-figma]；
* **手工安装**：`Connectors → Local MCP servers → Custom MCP`，填名称，再填"本地进程的命令与参数"或"本地 HTTP server 的 URL"，点 **Add server** 并批准 [@ref-lovable-desktop-custom-local]；
* **授权即生效**：本地 server 首次申请访问时桌面应用弹出批准；已连接的本地 server 可在 `Connectors → Local MCP servers` 里复查与移除 [@ref-lovable-desktop-security]；
* **工作区管控**：`Privacy & security → Local desktop MCP servers`（所有计划，**Enterprise 默认关**）与 `Remote MCP connectors` 必须**同时**开启，本地 server 才可用 [@ref-lovable-priv-mcpconn]；`Connectors → Admin settings → Chat connectors` 里没有逐条本地 server 的条目，本地 server 只受这两层总开关约束 [@ref-lovable-adminconn-chat]。

**版本固定、更新、依赖解析、加载顺序与命名冲突：来源未提供**，这一组按 `unknown` 记录（已检查 `integrations/desktop-app.md` 与 `integrations/figma.md`）。可确定的是没有版本号与更新通道的概念——`Add server` 只接受名称与连接细节。

**Figma 的三条路径**是本地扩展面最完整的例子，可按所需形态选择 [@ref-lovable-figma-plugin][@ref-lovable-figma-mcp][@ref-lovable-figma-upload]：

| 路径 | 需要什么 | 得到什么 |
| :-- | :-- | :-- |
| **Figma plugin** | Figma 侧至少 **Dev seat**；不需要 Lovable 桌面应用，也不需要 Figma 桌面应用 | 把选中 frame/component 导出成 code/image/font 文件（单次 ≤100 个文件、每文件 ≤20 MB）；配对码校验后进入 `+` 菜单的 **Figma designs**，且导出物**属于你自己的账号**、不共享给工作区 |
| **Figma MCP** | Lovable 桌面应用 + Figma 桌面应用 + Dev Mode + Figma Dev/Full seat | 实时读取打开的 Figma 文件（组件、属性、布局、样式） |
| **上传 `.fig` 文件** | 无额外安装 | 变量集合、颜色、字体、frame 结构与预览缩略图；**不含**交互设计 |

## 面向其他宿主的 Lovable 插件 {#plugins-foreign}

这些是"把 Lovable 装进别人家"的插件，可在对方宿主里安装，安装方式各自不同：

* **Claude Code**：两条路——`claude mcp add --transport http lovable "https://mcp.lovable.dev"`，或 `/plugin install lovable@claude-plugins-official`（后者附带常用任务的 slash 命令）。首次调用工具时浏览器登录 Lovable [@ref-lovable-mcpsrv-clients]；
* **Cursor**：安装 Cursor 里的 **Lovable** 插件，会代为连接 MCP server 并加上 `/lovable-new`、`/lovable-iterate`、`/lovable-db`、`/lovable-deploy`；也可手工写 `~/.cursor/mcp.json` 或项目内 `.cursor/mcp.json` [@ref-lovable-mcpsrv-clients]；
* **ChatGPT / Claude Desktop / claude.ai / VS Code**：按文档配置 `https://mcp.lovable.dev`，或在客户端连接器目录里搜到 Lovable 添加 [@ref-lovable-mcpsrv-clients]；
* **其他 MCP 客户端**：支持 OAuth 即可连接；本机运行、在 localhost 完成登录的客户端会自动注册，浏览器/托管型客户端需要 Lovable 事先批准其登录回调地址 [@ref-lovable-mcpsrv-clients]。

客户端要真正可用，还需要工作区允许第三方 MCP 客户端访问：Free/Pro 恒开且不可配置，Business 默认开可关，**Enterprise 默认关**需管理员在 `Privacy & security → Third-party MCP clients` 打开 [@ref-lovable-mcpsrv-clients]。

## 看到"Lovable 插件"时怎么核对 {#plugins-foreigncheck}

引用来源时按下面三步判定它到底扩展了谁，避免把外部宿主的插件写成 Lovable 的插件系统：

1. **看安装位置**：在 Figma 的 Plugins 面板里装 → 是 **Figma 插件**，产出物是导出到 Lovable 的设计文件 [@ref-lovable-figma-plugin]；在 Claude Code / Cursor 里 `/plugin install` 或装扩展 → 是**对方宿主的插件**，内部是 MCP 连接 [@ref-lovable-mcpsrv-clients]；在 Lovable 桌面应用 `Connectors → Local MCP servers` 里启用 → 是**本地 MCP server**，属于 MCP 主题 [@ref-lovable-desktop-mcp]。
2. **看有没有"包"**：Lovable 侧唯一有包形态的产物是**技能**（`.zip` / `.skill`），且只能提供指令、不能注册扩展点 [@ref-lovable-connectors-faq]；除此之外没有 manifest 或入口点。
3. **看能力从哪来**：如果能力来自"调一个 API"，正确归类是 **custom connector** 或 **直接集成**；如果来自"读某个工具的上下文"，正确归类是 **chat connector（MCP server）** [@ref-lovable-connectors-types]。

## 可查询的状态与诊断 {#plugins-diagnostics}

由于没有插件体系，可查询的只有连接与开关状态，逐项如下 [@ref-lovable-desktop-security][@ref-lovable-desktop-mcp][@ref-lovable-figma-mcp][@ref-lovable-priv-mcpconn][@ref-lovable-adminconn-chat]：

| 要确认的事 | 入口 |
| :-- | :-- |
| 本机有哪些本地 MCP server、哪些已连接 | 桌面应用 `Connectors → Local MCP servers` |
| 自定义本地 server 是否被识别 | 同上列表；或 **Custom MCP** 手工添加后再看是否出现 |
| Figma / Paper 没被自动探测到 | Figma 需有 Design 文件、处于 Dev Mode 且点过 **Enable desktop MCP server**；Paper 需保持运行；必要时重启 Lovable 桌面应用，或改用 **Custom MCP** 手工添加 [@ref-lovable-desktop-faq] |
| 本地 server 是否被工作区禁用 | `Privacy & security → Local desktop MCP servers`（Enterprise 默认关）与 `Remote MCP connectors` 两层开关必须同时开 [@ref-lovable-priv-mcpconn] |
| 工作区是否允许第三方 MCP 客户端 | `Privacy & security → Third-party MCP clients`（Enterprise 默认关）[@ref-lovable-mcpsrv-clients] |
| 外部客户端连 Lovable 失败 | 跑 `tools/list` 确认；UI/OAuth 连接的删除条目重加，配置文件连接的检查 JSON 合法性与 `mcpServers` 嵌套（重复的 `mcpServers` 块会让文件非法），改完重启客户端；Claude Code 用 `/mcp` 查看 [@ref-lovable-mcpsrv-troubleshoot] |
| 哪些 connector 在工作区被启用/禁用 | `Connectors → Admin settings → Chat connectors` 表（含 **Custom MCP** 行）与 `Remote MCP connectors` 总开关 [@ref-lovable-adminconn-chat] |

**缺口**：来源没有提供本地 server 的加载错误明细、连接版本号、健康检查接口或插件级日志；上述都是连接层面的状态。桌面应用也没有列出已安装组件或扩展的清单。已检查 `integrations/desktop-app.md`、`integrations/figma.md`、`integrations/lovable-mcp-server.md`、`features/privacy-and-security-settings.md`、`integrations/admin-controls.md`、`integrations/introduction.md` 与官方全量页面索引。
