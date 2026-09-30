---
schema_version: 3
record_kind: production
edition_id: lingma-jetbrains-mcp-v1
harness_id: lingma
topic: mcp
title: "Lingma（Qoder CN）JetBrains 插件的 MCP：配置、传输、认证与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-product-rename, ref-lingma-mcp-prereq]
  - section_id: mcp-entry
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-mcp-config, ref-lingma-plugins-mcp]
  - section_id: mcp-definition-transport
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-mcp-protocol, ref-lingma-mcp-config, ref-lingma-plugins-mcp]
  - section_id: mcp-auth-lifecycle
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-mcp-config, ref-lingma-mcp-protocol, ref-lingma-mcp-faq-tools]
  - section_id: mcp-exposure-diagnostics
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-mcp-usage, ref-lingma-mcp-faq-service, ref-lingma-mcp-faq-tools, ref-lingma-changelog-mcp-policy, ref-lingma-tools-list]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [jetbrains]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-lingma-mcp-config]
  - question_id: mcp.definition
    answers:
      - surface_ids: [jetbrains]
        section_id: mcp-definition-transport
        status: partial
        source_refs: [ref-lingma-mcp-config, ref-lingma-plugins-mcp]
  - question_id: mcp.transport
    answers:
      - surface_ids: [jetbrains]
        section_id: mcp-definition-transport
        status: answered
        source_refs: [ref-lingma-mcp-protocol, ref-lingma-plugins-mcp]
  - question_id: mcp.auth
    answers:
      - surface_ids: [jetbrains]
        section_id: mcp-auth-lifecycle
        status: partial
        source_refs: [ref-lingma-mcp-config]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [jetbrains]
        section_id: mcp-auth-lifecycle
        status: partial
        source_refs: [ref-lingma-mcp-protocol, ref-lingma-mcp-faq-tools]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [jetbrains]
        section_id: mcp-exposure-diagnostics
        status: partial
        source_refs: [ref-lingma-mcp-usage]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [jetbrains]
        section_id: mcp-exposure-diagnostics
        status: partial
        source_refs: [ref-lingma-mcp-usage, ref-lingma-changelog-mcp-policy]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [jetbrains]
        section_id: mcp-exposure-diagnostics
        status: answered
        source_refs: [ref-lingma-mcp-faq-service, ref-lingma-mcp-faq-tools]
---

## 固定来源与界面 {#mcp-scope}

本章依据官方文档站点 docs.qoder.cn 的 Qoder CN（原通义灵码，2026-05-20 更名）用户指南，界面口径为 catalog 唯一登记的 `jetbrains`（JetBrains IDE 插件，kind `ide`），插件相关进程与目录仍为 `.lingma` / `Lingma.exe`。[@ref-lingma-product-rename]

前提条件：JetBrains 插件需更新至 **v2.5.0 及以上**；MCP 在**智能体模式**下使用，需配合 qwen3 模型；同时最多连接 **10 个** MCP 服务 [@ref-lingma-mcp-prereq]。

## MCP 服务的配置入口与作用域 {#mcp-entry}

入口固定为插件内的**个人设置**：单击右上角头像进入**个人设置**，再单击 **MCP 服务** [@ref-lingma-mcp-config]。该页面属于账号级个人设置，文档明确“MCP 添加后，可跨本地工程和 IDE 使用”，即 MCP 服务定义是**用户级**而非项目级，配置一次即可在同一账号的本地工程与 IDE 间复用 [@ref-lingma-mcp-config]。

添加方式有两种 [@ref-lingma-mcp-config]：

- **MCP 广场**：在 MCP 广场标签中浏览或搜索服务，单击安装完成一键添加；部分服务需要额外环境变量（如 `API_KEY`、`ACCESS_TOKEN`）。注意 Qoder CN IDE 暂不支持搜索 MCP 广场内容。
- **手动添加**：在 MCP 服务页面右上角单击 `+`，可选“手工添加”（填名称与类型字段）或“配置文件添加”（在 JSON 配置文件中增加服务对应的 JSON 配置）。

除个人设置外，插件（Plugins）也可自带 MCP 服务器配置，插件根目录的 `mcp.json`（或 `.mcp.json`）顶层使用 `mcpServers` 字段；插件清单的 `mcpServers` 字段可指向该 JSON 文件 [@ref-lingma-plugins-mcp]。

缺口：文档未给出“配置文件添加”所读写的确切文件路径与文件名（只有界面入口），也未说明该文件是账号级还是设备级、是否随账号同步。

## Server 定义与传输模式 {#mcp-definition-transport}

支持两种通信模式 [@ref-lingma-mcp-protocol]：

| 模式 | 通信方式 | 服务位置 |
| :-- | :-- | :-- |
| **STDIO** | 标准输入输出流 | 本地运行 |
| **SSE** | 服务器发送事件（SSE）协议 | 远端或本地 |

手工添加时的字段 [@ref-lingma-mcp-config]：

- **STDIO 类型**：名称、命令、参数、环境变量（选填）。
- **SSE 类型**：名称、服务地址。

配置文件添加使用 `mcpServers` 结构，官方给出 weather 示例 [@ref-lingma-mcp-config]：

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@h1deya/mcp-server-weather"]
    }
  }
}
```

插件侧还展示了远程服务模式（声明式 Connector）中的 `streamable-http` 类型与占位符 `{{USER_CONFIG}}`，以及 `_setup` 引导字段（`configUrl`、`guide`、`required`），用于需要在安装时由用户填入个人凭证的 MCP 服务 [@ref-lingma-plugins-mcp]：

```json
{
  "mcpServers": {
    "dingtalk-log": {
      "type": "streamable-http",
      "url": "{{USER_CONFIG}}",
      "_setup": {
        "configUrl": "https://example.com/detail?mcpId=9639",
        "guide": "登录后获取您的个人 MCP Server URL",
        "required": true
      }
    }
  }
}
```

缺口：STDIO 的 `env`、`cwd` 字段虽有示例涉及 `env`（插件文档），但个人设置界面的“环境变量”填写规则、变量展开（如 `${ENV}` 占位）与工作目录设置在用户指南里没有成文说明；SSE 与 `streamable-http` 在插件中的适用边界也未写明。

## 认证、连接与生命周期 {#mcp-auth-lifecycle}

**认证**：用户指南对凭据的说明是“部分 MCP Server 运行需额外提供环境变量，例如 `API_KEY` 或 `ACCESS_TOKEN`”，并在参数（args）中携带认证信息的服务（如 Mastergo、Figma）需在安装后手动补填参数 [@ref-lingma-mcp-config]。文档未描述 OAuth 登录流程、token 刷新或凭据存储位置。

**连接与生命周期** [@ref-lingma-mcp-protocol][@ref-lingma-mcp-faq-tools]：

- 最多同时连接 10 个 MCP 服务。
- 添加成功后服务图标显示连接状态，展开详情可看到该服务提供的工具列表。
- 若服务连接中断，可在界面右侧单击，系统自动尝试重新启动该 MCP 服务。
- 服务列表持续加载中时，可重启 IDE；仍不生效时可手动启动 Qoder CN 服务（`.lingma/bin/x.x.x/...` 目录下执行 `Lingma.exe start` 或 `lingma start`）。

缺口：未记录连接超时值、启动时机（IDE 启动即连还是使用时才连）、禁用/启用单条服务的开关、失败重试次数与缓存行为。

## 工具暴露、使用与诊断 {#mcp-exposure-diagnostics}

**使用与暴露** [@ref-lingma-mcp-usage]：Qoder CN 根据用户提示词，结合 MCP 工具的名字与描述自动判断所需调用的 MCP 工具，并把结果输入下一步流程。调用前系统会弹出提示，需用户确认后继续；执行完成后交互窗口展示结果，可展开查看详细输入与输出。使用 MCP 必须先加载工程目录并切换到**智能体**模式，否则仅进入智能问答模式、无法调用 MCP 工具 [@ref-lingma-mcp-faq-tools]。

MCP 工具在插件内与内置工具共同构成工具集：内置工具分为检索、文件编辑、命令执行、问题获取、记忆五类，MCP 是在内置工具集之上“扩展额外能力” [@ref-lingma-tools-list]。企业策略可拦截 MCP 服务，被拦截的服务会展示为禁用状态 [@ref-lingma-changelog-mcp-policy]。

**诊断** [@ref-lingma-mcp-faq-service][@ref-lingma-mcp-faq-tools]：

- 服务状态：查看服务图标是否连接成功，展开详情核对工具列表。
- 依赖缺失：`exec: "npx": executable file not found in $PATH` 需安装 Node.js（v18 及以上，npm v8 及以上）；`exec: "uvx": executable file not found in $PATH` 需安装 uv。
- 初始化失败：`failed to initialize MCP client: context deadline exceeded` 常见于参数配置错误、资源拉取失败或安全组件拦截；排查方式是单击复制完整命令并在终端运行以获取详细异常。
- 调用异常：展开工具调用详情查看具体错误；参数（args）中携带的 `API_KEY`/`TOKEN` 需在“我的服务”页面编辑补填。
- 命名歧义：避免多个 MCP 服务或工具使用相似命名。
- 页面空白：Android Studio 下若 `idea.log` 报 JCEF 相关错误，需启用 `ide.browser.jcef.enabled`、关闭 `ide.browser.jcef.sandbox.enable`，并选择较新的 JCEF Runtime 后重启 IDE。

缺口：文档没有说明如何查看“配置文件是否被读取”、协议握手细节或单个工具的成功率统计；resources 与 prompts 两类 MCP 能力在文档中均未出现，无法确认本界面是否支持（不能以 tools 代表全部）。
