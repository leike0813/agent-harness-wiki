---
schema_version: 3
record_kind: production
edition_id: replit-agent-web-native_plugins-v1
harness_id: replit-agent
topic: native_plugins
title: "Replit Agent 的原生插件机制：检查结论与扩展面"
sections:
  - section_id: plugins-scope
    surface_ids: [web]
    source_refs: [ref-replit-index-chat, ref-replit-index-enterprise, ref-replit-int-types, ref-replit-agent-skills-what, ref-replit-mcp-list, ref-replit-mcp-concept-primitives, ref-replit-conn-scope, ref-replit-int-custom-create, ref-replit-mcp-server-tools]
  - section_id: plugins-model-absence
    surface_ids: [web]
    source_refs: [ref-replit-agent-skills-what, ref-replit-mcp-concept-primitives, ref-replit-int-types, ref-replit-agent-what]
  - section_id: plugins-install-discovery
    surface_ids: [web]
    source_refs: [ref-replit-agent-skills-dir-install, ref-replit-mcp-install-link, ref-replit-mcp-connect-custom, ref-replit-int-custom-create, ref-replit-agent-cust-manage, ref-replit-conn-scope]
  - section_id: plugins-api-lifecycle
    surface_ids: [web]
    source_refs: [ref-replit-mcp-security, ref-replit-mcp-server-tools, ref-replit-mcp-server-connect, ref-replit-conn-scope, ref-replit-agent-cust-manage, ref-replit-mcp-connect-custom]
  - section_id: plugins-diagnostics
    surface_ids: [web]
    source_refs: [ref-replit-conn-scope, ref-replit-mcp-connect-custom, ref-replit-agent-skills-dir-install, ref-replit-mcp-server-trouble, ref-replit-index-chat]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [web]
        section_id: plugins-model-absence
        status: not_applicable
        source_refs: [ref-replit-agent-skills-what, ref-replit-mcp-concept-primitives, ref-replit-int-types, ref-replit-agent-what]
  - question_id: plugins.package
    answers:
      - surface_ids: [web]
        section_id: plugins-model-absence
        status: not_applicable
        source_refs: [ref-replit-agent-skills-what, ref-replit-mcp-concept-primitives, ref-replit-int-types, ref-replit-agent-what]
  - question_id: plugins.install
    answers:
      - surface_ids: [web]
        section_id: plugins-install-discovery
        status: partial
        source_refs: [ref-replit-agent-skills-dir-install, ref-replit-mcp-install-link, ref-replit-mcp-connect-custom, ref-replit-int-custom-create, ref-replit-agent-cust-manage, ref-replit-conn-scope]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [web]
        section_id: plugins-install-discovery
        status: partial
        source_refs: [ref-replit-agent-skills-dir-install, ref-replit-mcp-install-link, ref-replit-mcp-connect-custom, ref-replit-int-custom-create, ref-replit-agent-cust-manage, ref-replit-conn-scope]
  - question_id: plugins.api
    answers:
      - surface_ids: [web]
        section_id: plugins-api-lifecycle
        status: not_applicable
        source_refs: [ref-replit-mcp-security, ref-replit-mcp-server-tools, ref-replit-mcp-server-connect, ref-replit-conn-scope, ref-replit-agent-cust-manage, ref-replit-mcp-connect-custom]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [web]
        section_id: plugins-api-lifecycle
        status: partial
        source_refs: [ref-replit-mcp-security, ref-replit-mcp-server-tools, ref-replit-mcp-server-connect, ref-replit-conn-scope, ref-replit-agent-cust-manage, ref-replit-mcp-connect-custom]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [web]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-replit-conn-scope, ref-replit-mcp-connect-custom, ref-replit-agent-skills-dir-install, ref-replit-mcp-server-trouble, ref-replit-index-chat]
---

## 固定来源与检查范围 {#plugins-scope}

本章固定来源是 Replit 官方文档站的 markdown 快照：官方文档索引的 Chat 与 Enterprise 两节
[@ref-replit-index-chat][@ref-replit-index-enterprise]、Agent Integrations
[@ref-replit-int-types]、Agent Skills [@ref-replit-agent-skills-what]、MCP 服务器参考
[@ref-replit-mcp-list]、MCP 概念页 [@ref-replit-mcp-concept-primitives]、Managed
connectors [@ref-replit-conn-scope]、Custom connectors
[@ref-replit-int-custom-create]、Replit MCP Server
[@ref-replit-mcp-server-tools]。界面为 `web`；快照未标注软件版本。

检查范围：官方文档索引列出的全部 Replit 文档页、Project Editor / Workspace Settings
的设置面、以及 Integrations 页面。结论是：Replit Agent（web
界面）**没有原生插件系统**——没有插件包格式、清单文件、入口约定、宿主 API
或插件生命周期；文档中可用的"扩展"全部是 Skills、MCP server、Connectors / Custom
connectors 与 Integrations，它们不是可安装的插件包。

## 什么算原生插件 {#plugins-model-absence}

**plugins.model**（not_applicable）：登记来源没有出现"plugin""extension"这类第一方扩展单元。官方把扩展
Agent 的方式明确归为几类，且都不是插件：**Skills** 是"目录 +
`SKILL.md`"的可复用指令包，属于提示层 [@ref-replit-agent-skills-what]；**MCP servers**
通过协议暴露 tools，是外部进程/服务而非宿主内插件
[@ref-replit-mcp-concept-primitives]；**Integrations** 分为 Replit
managed、Connectors、External integrations、Agent services 四类，是服务连接而非代码扩展
[@ref-replit-int-types]；**Replit AI Integrations** 是给被构建 app 的模型凭据
[@ref-replit-int-types]。没有发现任何"插件能注册能力/扩展点"的机制
[@ref-replit-agent-what]。

**plugins.package**（not_applicable）：不存在插件包格式、入口点、清单（manifest）或兼容性声明字段。文档中最接近"包"的对象是
skill 目录（`SKILL.md` +
可选支撑文件）[@ref-replit-agent-skills-what]，它没有可执行入口、没有版本/依赖声明。

## 存在的安装与发现面 {#plugins-install-discovery}

**plugins.install**（partial）：没有插件安装通道，但可以列出与实际存在的三条"从外部引入能力"的通道，并说明它们各安装了什么：

| 通道 | 安装动作 | 落地形态 |
| - | - | - |
| Skills | 项目 Skills 面板 Discover 页签 **Install**、聊天 **+ → Use a skill**、或在 Workspace 上传/写/从 GitHub 导入 | 项目 `/.agents/skills` 下的目录，或 Workspace 库条目 [@ref-replit-agent-skills-dir-install] |
| MCP server | Integrations 页一键 **Add to Replit** 安装链接，或 **+ Add MCP server** 手填 URL | 平台侧的远端 server 连接记录，不是本地包 [@ref-replit-mcp-install-link][@ref-replit-mcp-connect-custom] |
| Custom connector | **Integrations → Add custom → Add custom connector**（Pro/Enterprise，beta） | Workspace 级 API 连接器配置，含 Base URL、Agent instructions、认证方式 [@ref-replit-int-custom-create] |

版本固定/更新/卸载：Skills 侧可在 Workspace Settings 里编辑、禁用、删除
[@ref-replit-agent-cust-manage]；MCP 与 connector 侧可 **Manage**/**删除**（删除会对该
Workspace
或组织的所有使用者生效）[@ref-replit-conn-scope]。文档**没有**任何"固定某个插件的版本"或"用户级与项目级插件安装"的概念——因为不存在插件包。

**plugins.discovery**（partial）：宿主不解析插件包，因此没有插件发现、校验、加载顺序或命名冲突规则。可确认的发现行为只有
Skill 的元数据扫描（Agent 每轮读所有已安装 skill 的名称与描述）与其在 Workspace 库/项目
Skills 面板中的可见性 [@ref-replit-agent-skills-dir-install]；MCP server 连接后 Agent
自动拉取工具清单
[@ref-replit-mcp-connect-custom]。缺口：没有插件目录、没有加载顺序、没有依赖解析。

## 扩展点与生命周期 {#plugins-api-lifecycle}

**plugins.api**（not_applicable）：不存在宿主
API、注册点或权限边界这样的概念。可对比的"能力边界"是：MCP
工具在运行前经安全扫描器评估、可疑工具被阻断，被拒时 Agent 告知用户
[@ref-replit-mcp-security]；反向的 Replit MCP Server
暴露固定的一组工具（`create_app_from_prompt`、`search_apps`、`resolve_app_by_name`、`list_apps`、`ask_question`、`update_app_using_prompt`、`publish_app`、`get_publish_status`）[@ref-replit-mcp-server-tools]；接入方式为
Streamable HTTP + OAuth protected-resource discovery，客户端读取元数据后引导登录
[@ref-replit-mcp-server-connect]。这些都是**协议接口**，不是插件宿主 API。

**plugins.lifecycle**（partial）：没有"已安装/已启用/已发现/已加载/已激活/健康"这条插件状态链。可观察的相邻状态是：MCP
连接在 **Your integrations** 表里带 **Default permission**、**Scope**、**Connected
apps**、**Connection status** [@ref-replit-conn-scope]；Skill 可在 Workspace Settings
中被编辑、禁用、删除 [@ref-replit-agent-cust-manage]；自定义 MCP server 保存后连接出现在
MCP Servers 列表并显示状态
[@ref-replit-mcp-connect-custom]。缺口：没有激活/健康检查语义。

## 诊断 {#plugins-diagnostics}

**plugins.diagnostics**（partial）：没有插件版本查询、兼容性检查或依赖错误诊断，因为不存在插件。可用的替代观察点：Integrations
页的连接状态与 scope 列 [@ref-replit-conn-scope]；自定义 MCP server 的 **Test & save**
即时连接结果 [@ref-replit-mcp-connect-custom]；项目 Skills 面板的 Discover 页签与
Workspace 库中的 skill
卡片（含筛选与搜索）[@ref-replit-agent-skills-dir-install]；反向接入的三类排错项（重新认证、找不到
app、请求仍在运行）[@ref-replit-mcp-server-trouble]。缺口：官方文档索引中没有任何插件/扩展页面可供对照
[@ref-replit-index-chat]。
