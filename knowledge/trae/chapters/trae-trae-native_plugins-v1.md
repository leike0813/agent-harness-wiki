---
schema_version: 3
record_kind: production
edition_id: trae-trae-native_plugins-v1
harness_id: trae
topic: native_plugins
title: "Trae IDE 的扩展机制：VSIX 安装、启停与兼容性"
sections:
  - section_id: plugins-model
    surface_ids: [trae]
    source_refs: [ref-trae-ext-install, ref-trae-plugin-skills-vs]
  - section_id: plugins-package-install
    surface_ids: [trae]
    source_refs: [ref-trae-ext-store, ref-trae-ext-vscode, ref-trae-ext-vsix]
  - section_id: plugins-manage
    surface_ids: [trae]
    source_refs: [ref-trae-ext-disable, ref-trae-ext-uninstall, ref-trae-set-general]
  - section_id: plugins-diagnostics
    surface_ids: [trae]
    source_refs: [ref-trae-ext-version, ref-trae-ext-store]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [trae]
        section_id: plugins-model
        status: answered
        source_refs: [ref-trae-ext-install, ref-trae-plugin-skills-vs]
  - question_id: plugins.package
    answers:
      - surface_ids: [trae]
        section_id: plugins-package-install
        status: answered
        source_refs: [ref-trae-ext-vscode, ref-trae-ext-vsix]
  - question_id: plugins.install
    answers:
      - surface_ids: [trae]
        section_id: plugins-package-install
        status: answered
        source_refs: [ref-trae-ext-store, ref-trae-ext-vscode, ref-trae-ext-vsix]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [trae]
        section_id: plugins-model
        status: unknown
        source_refs: [ref-trae-ext-install]
  - question_id: plugins.api
    answers:
      - surface_ids: [trae]
        section_id: plugins-package-install
        status: partial
        source_refs: [ref-trae-ext-vscode]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [trae]
        section_id: plugins-manage
        status: answered
        source_refs: [ref-trae-ext-disable, ref-trae-ext-uninstall]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [trae]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-trae-ext-version, ref-trae-ext-store]
---

## 固定来源与"原生插件"的边界 {#plugins-model}

本章来源为 `docs.trae.ai` IDE 分册的 `/ide/manage-extensions`（Extensions）页面快照，另以 `/ide/skills`、`/ide/ide-settings-overview` 作为对照。Trae 闭源、无官方 npm 包，整章为来源级知识。

结论：**在 IDE 界面上，TraeCode 没有自成一套的原生插件包格式或插件 API**。它对外提供的唯一扩展机制是 **VS Code 兼容的扩展（extension）**：安装来源包括 TraeCode 自己的扩展商店、VS Code 的 marketplace，以及本地 `.vsix` 文件——"You can install extensions from TraeCode's extension store or from the marketplace of VS Code, or you can directly install extensions by installing local `.vsix` files into TraeCode."。[@ref-trae-ext-install]

与相邻机制的关系（按官方文档的划分）：[@ref-trae-plugin-skills-vs]

| 机制 | 定位 | 与扩展的关系 |
| :-- | :-- | :-- |
| Skill | 描述"如何完成某类任务"的指令包，按需加载 | 不是扩展包，靠目录约定发现 |
| MCP server | 向外提供工具，Agent 作为 MCP 客户端调用 | 不是扩展，靠 `mcp.json` / 设置面板配置 |
| Hook | 生命周期上自动执行的 shell 命令 | 不是扩展，靠 `hooks.json` 配置 |
| Extension | 装进客户端的第三方功能包（VSIX） | 本章对象 |

官方文档没有描述 TraeCode 专属的插件 manifest、插件注册 API 或插件沙箱边界，插件能力的边界实际上就是 VS Code 扩展 API 的兼容程度。[@ref-trae-ext-install]

**缺口（`plugins.discovery`）**：宿主如何发现、解析、校验并加载扩展（扫描目录、加载顺序、依赖解析、命名冲突处理）在固定来源里没有任何描述；已检查 `/ide/manage-extensions` 全文与 `/ide/ide-settings-overview` 的扩展相关条目，缺失的是加载流程与依赖处理说明。[@ref-trae-ext-install]

## 包格式与安装入口 {#plugins-package-install}

**三条安装路径**：[@ref-trae-ext-store][@ref-trae-ext-vscode][@ref-trae-ext-vsix]

1. **TraeCode 扩展商店**——左侧导航栏点扩展商店图标，搜索目标扩展并在 `Available` 列表里选中，详情页点 `Install`，安装完成后出现在 `Installed` 列表；
2. **VS Code marketplace**——适用于商店里没有的扩展。官方给出可复现的手工流程：在 VS Code marketplace 找到扩展后打开 `Version History`，从详情页 URL 与版本信息里取出 `itemName`（形如 `denoland.vscode-deno`，按 `.` 分成 `fieldA`/`fieldB`）与 `version`，用下面的模板下载 `.vsix`，再把文件拖进 TraeCode 的扩展面板自动安装；[@ref-trae-ext-vscode]

```bash
https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${itemName.fieldA}/vsextensions/${itemName.fieldB}/${version}/vspackage
```

3. **本地 VSIX**——扩展面板右上角 `··· > Install from VSIX`，选择本地 `.vsix` 文件导入。

由此可以确认的**包格式**是 VS Code 的 `.vsix`，标识是 `publisher.name` 与 `version`；这三点来自官方示例 URL 的字段拆解，而不是 TraeCode 自己的清单文档。[@ref-trae-ext-vscode]

**平台相关扩展的例外**：官方明确提示 "The C/C++ extensions and other platform-specific extensions cannot be installed using this method. You need to manually download the VSIX package for the platform-specific extension you are using."，即通过 marketplace URL 手工下载这条路对含原生二进制的扩展不适用。[@ref-trae-ext-vscode]

**版本固定**：URL 模板里 `version` 段是显式版本号，因此按该方法安装时可以指定精确版本；固定来源没有说明商店安装是否可指定版本。[@ref-trae-ext-vscode]

**缺口（`plugins.api`）**：文档没有列出扩展能注册的扩展点、可调用的宿主 API，也没有权限模型；唯一相关线索是 FAQ 里"某版本扩展依赖更新版 VS Code 的 API 时可能与 TraeCode 不兼容"，说明兼容性由 VS Code API 版本决定，但官方没有给出 TraeCode 对应的 API 版本区间。[@ref-trae-ext-vscode]

## 启用、禁用与卸载 {#plugins-manage}

三个可观察状态通过扩展面板管理：[@ref-trae-ext-disable][@ref-trae-ext-uninstall]

- **已安装**——出现在扩展面板的 `Installed` 列表；
- **已禁用**——在 `Installed` 列表悬停后 `Settings > Disable`，或进入扩展详情页点 `Disable`；
- **已卸载**——悬停后 `Uninstall`，或详情页点 `Uninstall`。

文档没有描述"已安装但加载失败""被平台禁用"等更细的状态，也没有提供扩展级日志或健康检查入口。[@ref-trae-ext-disable]

**配置迁移**：设置中心的 General 里有 `Import Configuration`，可从外部 IDE 导入 plugins、settings、code snippets 与快捷键配置（菜单可选 `Import from VS Code` 或 `Import from Cursor`），官方警告"Importing configurations from external IDEs will overwrite the current TraeCode configuration, and this operation cannot be undone."——导入是覆盖而不是合并。[@ref-trae-set-general]

## 版本兼容与诊断 {#plugins-diagnostics}

**已知的兼容性问题**及其官方处置方式：当某个扩展版本依赖更新版 VS Code 的 API 时，可能与 TraeCode 不兼容；"You can check the extension's version history and download an earlier version."——即回退版本是官方给出的唯一途径。[@ref-trae-ext-version]

**可观察点**：扩展面板的 `Available`/`Installed` 两个列表（安装结果）、扩展详情页的详细介绍与 changelog、以及详情页/悬停菜单里的 `Disable`/`Uninstall`；插件安装是否成功没有独立的日志面板。[@ref-trae-ext-store]

**缺口（`plugins.diagnostics`）**：固定来源没有给出查询扩展实际版本与运行状态的位置（除详情页的版本历史外），也没有加载错误、依赖缺失或不兼容的报错入口；已检查 `/ide/manage-extensions` 全文（含 FAQ）与 `/ide/ide-settings-overview`。[@ref-trae-ext-version]
