---
schema_version: 3
record_kind: production
edition_id: sourcecraft-code-assistant-vscode-native_plugins-v1
harness_id: sourcecraft-code-assistant
topic: native_plugins
title: "SourceCraft Code Assistant（VS Code）的插件模型、安装与生命周期"
sections:
  - section_id: plugins-model
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-concepts-agents, ref-sc-ca-index-plugin, ref-sc-ca-mcpservers-marketplace, ref-sc-ca-modes-configure, ref-sc-ca-roo, ref-sc-ca-skills-structure]
  - section_id: plugins-package
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-index-plugin, ref-sc-ca-qa-versions, ref-sc-ca-roo]
  - section_id: plugins-install
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-index-plugin, ref-sc-ca-index-remove, ref-sc-ca-index-update]
  - section_id: plugins-discovery
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-chatui-components, ref-sc-ca-index-plugin]
  - section_id: plugins-api
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-mcp-scopes, ref-sc-ca-modes-configure, ref-sc-ca-roo, ref-sc-ca-rules-locations, ref-sc-ca-skills-structure, ref-sc-ca-slash-create]
  - section_id: plugins-lifecycle
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-index-autocomplete, ref-sc-ca-index-indicator, ref-sc-ca-index-logout, ref-sc-ca-index-plugin, ref-sc-ca-index-update]
  - section_id: plugins-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-logs, ref-sc-ca-qa-versions, ref-sc-ca-qa-vsc-auth]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [vscode]
        section_id: plugins-model
        status: answered
        source_refs: [ref-sc-ca-index-plugin, ref-sc-ca-roo, ref-sc-ca-mcpservers-marketplace]
  - question_id: plugins.package
    answers:
      - surface_ids: [vscode]
        section_id: plugins-package
        status: partial
        source_refs: [ref-sc-ca-index-plugin, ref-sc-ca-qa-versions]
  - question_id: plugins.install
    answers:
      - surface_ids: [vscode]
        section_id: plugins-install
        status: answered
        source_refs: [ref-sc-ca-index-plugin, ref-sc-ca-index-update, ref-sc-ca-index-remove]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [vscode]
        section_id: plugins-discovery
        status: partial
        source_refs: [ref-sc-ca-index-plugin]
  - question_id: plugins.api
    answers:
      - surface_ids: [vscode]
        section_id: plugins-api
        status: unknown
        source_refs: [ref-sc-ca-roo]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [vscode]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-sc-ca-index-plugin, ref-sc-ca-index-autocomplete, ref-sc-ca-index-update]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-sc-ca-logs, ref-sc-ca-qa-versions]
---

## 原生插件在本产品中的含义 {#plugins-model}

VS Code 界面上的"原生插件"就是 **SourceCraft Code Assistant 插件本身**：一个以 VSIX 分发的 VS Code 扩展，安装后提供代码补全、聊天/agent 模式与全部上述能力（Skills、Modes、MCP、Auto-approve、Checkpoints 等）。官方安装文档把它称为 "the Code Assistant plugin for Visual Studio Code"，并给出 VSIX 下载与安装步骤。[@ref-sc-ca-index-plugin]

插件身份：官方在入门页底部声明 "The SourceCraft Code Assistant plugin for Visual Studio Code uses Roo Code"，并给出 Apache-2.0 许可与修改文件清单。[@ref-sc-ca-roo]

与其并列但**不是**插件的东西：

- **MCP server**：由插件在运行时连接的外部进程/服务，可来自 Code Assistant 内置 **Marketplace** 的 **MCP** 标签页（安装范围可选 Global 或 Project），属于外部工具接入而非宿主插件。[@ref-sc-ca-mcpservers-marketplace]
- **Skills / Slash 命令 / Custom rules / Modes**：都是插件内的文件或 UI 配置，不含打包、清单或版本声明，因此不属于插件生态层。[@ref-sc-ca-modes-configure][@ref-sc-ca-skills-structure]

概念页把 VS Code 侧能力统一称为 "agent mode"，并明确其它界面（JetBrains 的 chat/agent mode、CLI 的 OpenCode）走各自实现。[@ref-sc-ca-concepts-agents]

## 包格式、入口与清单 {#plugins-package}

- **VS Code**：分发物为 `.vsix` 文件，由 VS Code 的 `Extensions: Install from VSIX...` 或 `code --install-extension` 安装；安装完成提示为 `Completed installing extension`。[@ref-sc-ca-index-plugin]
- **JetBrains（对照）**：该界面以插件仓库方式分发；官方 FAQ 另有"安装报错 No plugins found 多因 IDE 版本不受支持"的说明。[@ref-sc-ca-qa-versions]
- **内部结构线索**：修改文件清单列出 `packages/Roo-Code/package.json`、`packages/Roo-Code/src/package.json`、`package.nls.json` 等，说明插件基于 Roo Code 的包结构；但官方没有公开该插件的清单字段、`activationEvents`、`contributes` 或兼容性声明。[@ref-sc-ca-roo]

**缺口**：固定来源没有给出插件包的 manifest/entry 契约、第一方元数据字段或版本兼容声明；`plugins.package` 只能记到"VSIX/ZIP 归档 + 已知内部文件"的程度。

## 安装、更新、禁用与卸载 {#plugins-install}

**安装（VS Code）**：下载 VSIX → 打开命令面板（Windows/Linux `Ctrl` + `Shift` + `P`，macOS `Command` + `Shift` + `P`）→ 执行 `Extensions: Install from VSIX...` → 选择文件；或 `code --install-extension VSIX 文件的路径`。[@ref-sc-ca-index-plugin]

**认证绑定**：安装后在 **No active session found. Log in please** 弹窗点 **Go to browser** 完成 SourceCraft 登录；重新认证或切换账号用命令面板的 **SourceCraft Code Assistant: Login**。[@ref-sc-ca-index-plugin]

**更新**：插件运行时会自动检查并安装更新；强制更新在底栏插件图标菜单里选 **Check For Updates**。[@ref-sc-ca-index-update]

**卸载**：`Ctrl`/`Command` + `Shift` + `X` 打开已装插件列表 → SourceCraft Code Assistant 行 → 齿轮 → **Uninstall**。[@ref-sc-ca-index-remove]

**版本固定**：官方没有提供固定版本或回滚到指定版本的入口；`plugins.install` 的"版本固定"部分因此为缺口。JetBrains 侧另有插件仓库地址 `https://proxy.src.yandexcloud.net/proxy/plugin/jetbrains/stable` 与自动更新开关，属于该界面。[@ref-sc-ca-index-plugin]

## 发现与加载 {#plugins-discovery}

插件安装后由 VS Code 扩展宿主加载，在编辑器活动栏出现插件图标；图标出现在底栏即表示"插件已启用并就绪"。[@ref-sc-ca-index-plugin] 聊天面板由该图标打开，界面组件包括聊天历史、输入框、动作按钮与新任务按钮。[@ref-sc-ca-chatui-components]

**缺口**：固定来源没有描述插件激活时机（VS Code `activationEvents`）、依赖声明或加载顺序，也没有任何"第三方插件注册/发现"的机制说明；`plugins.discovery` 只能覆盖"宿主扩展的可观察现象"，第三方扩展发现记为 unknown。

## 扩展点与宿主 API 边界 {#plugins-api}

固定来源**没有公开面向第三方的插件 API**。官方文档把可扩展性表达为插件内的用户配置面，而不是宿主 API：

- Skills（`.codeassistant/skills/`、`.agents/skills/`、`SKILL.md`）；[@ref-sc-ca-skills-structure]
- Slash 命令（`.codeassistant/commands/`、`~/.codeassistant/commands/`，Markdown + `description`/`argument-hint`）；[@ref-sc-ca-slash-create]
- Custom rules（`rules/`、`rules-{modeSlug}/`、`.codeassistantrules`、AGENTS.md）；[@ref-sc-ca-rules-locations]
- Modes（工具组与行为指令）；[@ref-sc-ca-modes-configure]
- MCP server（`mcpServers` 定义）。[@ref-sc-ca-mcp-scopes]

修改文件清单显示插件内部存在多个管理器（如 `CustomModesManager.ts`、`ProviderSettingsManager.ts`、`services/mcp/McpHub.ts`、`services/marketplace/MarketplaceManager.ts`、`services/customization/customizationProvider.ts`），可作为实现边界的旁证，但这些是插件内部模块，不是对外 API。[@ref-sc-ca-roo]

**结论**：`plugins.api` 记为 unknown——没有官方记载的注册能力清单、权限模型或宿主 API 边界。

## 生命周期状态 {#plugins-lifecycle}

官方可观察到的状态与动作：

- **启用/就绪**：底栏插件图标出现，点击可看到 **Logged in as …** 一行（未认证时该行缺失）。[@ref-sc-ca-index-plugin]
- **自动补全开关**：图标菜单里有 **Enable/Disable SourceCraft Code Assistant autocomplete**；官方注明该开关**仅 VS Code 可用**。[@ref-sc-ca-index-autocomplete]
- **Suggestion indicator 开关**：Settings → **Autocompletion** 中可开关 **Code Assistant suggestion indicator** 与 **Code Assistant load indicator**，默认开启。[@ref-sc-ca-index-indicator]
- **更新状态**：自动检查更新 / 手动 **Check For Updates**。[@ref-sc-ca-index-update]
- **退出登录**：图标菜单 **Logout** 或命令面板 **SourceCraft Code Assistant: Logout**。[@ref-sc-ca-index-logout]

**缺口**：官方没有给出"已安装 / 已启用 / 已发现 / 已加载 / 已激活 / 健康"这些状态的独立区分入口，也没有版本号查询命令；`plugins.lifecycle` 只能记到上述可观察状态与动作。

## 诊断 {#plugins-diagnostics}

- **日志**：底栏插件图标菜单 → **Export Logs** → 生成 `logs.zip`，用于提交支持工单。[@ref-sc-ca-logs]
- **启动/认证故障**：VS Code 侧 FAQ 给出认证库报 `crypto is not defined` 时的处理方式（升级 VS Code），并附一个支持该插件的 VS Code 构建示例。[@ref-sc-ca-qa-vsc-auth]
- **支持版本**：插件支持 VS Code、VSCodium 与 JetBrains IDE 的 2026.2、2026.1、2025.3、2025.2、2025.1、2024.3、2024.2、2024.1 版本；FAQ 把安装报错 "No plugins found" 归因于 IDE 版本不受支持（JetBrains 侧）。[@ref-sc-ca-qa-versions]

**缺口**：VS Code 侧没有"插件未能加载"的独立错误页或兼容性检查入口；`plugins.diagnostics` 的落点只有日志导出与版本对照。
