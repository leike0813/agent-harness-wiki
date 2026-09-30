---
schema_version: 3
record_kind: production
edition_id: omp-native_plugins-v2
harness_id: omp
topic: native_plugins
title: OMP 原生插件清单、安装与加载
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs:
      - ref-omp-extensions-doc
  - section_id: plugins-manifest
    surface_ids: [cli]
    source_refs:
      - ref-omp-plugins-manifest-code
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs:
      - ref-omp-plugins-command-code
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs:
      - ref-omp-plugins-loader-code
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs:
      - ref-omp-extensions-doc
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-omp-plugins-installed-code
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-omp-plugins-command-code
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs:
          - ref-omp-extensions-doc
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-manifest
        status: answered
        source_refs:
          - ref-omp-plugins-manifest-code
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs:
          - ref-omp-plugins-command-code
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs:
          - ref-omp-plugins-loader-code
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: partial
        source_refs:
          - ref-omp-extensions-doc
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs:
          - ref-omp-plugins-installed-code
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs:
          - ref-omp-plugins-command-code
---
本章材料来自源码修订 dff728c 的官方文档 `docs/extensions.md` 与 npm 包 `@oh-my-pi/pi-coding-agent` 18.3.4 的包内实现 `src/extensibility/plugins/types.ts`、`src/extensibility/plugins/loader.ts` 与 `src/commands/plugin.ts`。插件模型来自文档，清单字段、加载枚举与命令动作来自包内代码。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有真正安装或加载受管插件，所以安装、启用、加载与健康状态只按源码描述，未做运行观察。

## 插件模型 {#plugins-model}

OMP 的原生插件建立在扩展模块之上：扩展是默认导出工厂的 TS/JS 模块，一个模块可以同时注册事件处理、LLM 可调用工具、slash 命令、快捷键与标志、自定义消息渲染，以及会话与消息注入 API。插件包用 manifest 声明工具、钩子、扩展与命令入口。插件与 Skill、MCP server、Hook 脚本属于不同的层。 [@ref-omp-extensions-doc]

## 清单字段与目录 {#plugins-manifest}

插件清单解析自包 `package.json` 的 `omp` 字段，回退到旧的 `pi` 字段。字段包括 `name`（缺省用包名）、`version`（从 package.json 的 version 复制）、`description`、`tools`、`hooks`、`extensions`、`commands`、`features` 与 `settings`；`extensions` 是入口路径数组，`features` 里每个特性可再带 extensions、tools、hooks、commands 入口。 [@ref-omp-plugins-manifest-code]

一个在插件根目录的 `package.json`：

```json
{
  "name": "acme-omp-plugin",
  "version": "0.1.0",
  "omp": {
    "name": "Acme Tools",
    "description": "Extra tools and a guard hook.",
    "tools": "./src/tools.ts",
    "hooks": "./src/hooks.ts",
    "extensions": ["./src/index.ts"],
    "commands": ["./commands/handoff.md"]
  }
}
```

`omp.extensions` 指向会被导入并执行工厂的模块，`tools` 与 `hooks` 是基础入口（单个相对路径），`commands` 是命令文件，`features` 用来按安装参数选择可选入口。生效结果是启用该插件后这些入口被加载并注册；检查方式是安装后运行 `omp plugin list` 确认版本与启用状态。 [@ref-omp-plugins-manifest-code]

## 安装、更新与卸载 {#plugins-install}

`omp plugin` 的动作集包含 `install`、`uninstall`、`list`、`link`、`doctor`、`features`、`config`、`enable`、`disable`、`marketplace`、`discover` 与 `upgrade`；安装作用域通过 `--scope user` 或 `--scope project` 区分。动作集里没有独立的 npm 插件 update，更新通过带新版本号重新安装完成。 [@ref-omp-plugins-command-code]

一个项目作用域的安装与启停序列：

```bash
omp plugin install @acme/omp-plugin@0.1.0 --scope project
omp plugin list
omp plugin disable @acme/omp-plugin
```

`@acme/omp-plugin@0.1.0` 是展示命令形状的占位包名，运行前须换成实际存在且适配的插件版本。`install` 会把包装进对应作用域的插件根，并在 `omp-plugins.lock.json` 里记录版本、启用状态与所选特性；`list` 读依赖表与锁文件的并集，因此能同时看到 npm 安装与只 link 的插件。前提是有可访问的包源；检查方式是 `omp plugin list` 看版本与 enabled，或 `omp plugin doctor` 看诊断输出。 [@ref-omp-plugins-command-code]

缺口：本轮没有真正安装插件，`list` 与 `doctor` 的实际输出、以及 `loaded`、`active`、`healthy` 的判定方式都未取证。 [@ref-omp-plugins-command-code]

## 发现与加载枚举 {#plugins-discovery}

加载器对每个插件根枚举三处来源：该根下的 `node_modules`、`package.json` 的 dependencies，以及 `omp-plugins.lock.json` 的 plugins；同时遵循项目级 `projectOverrides.disabled` 与 `projectOverrides.features` 覆盖。根下还没有 `node_modules` 时返回空数组。 [@ref-omp-plugins-loader-code]

缺口：多个插件之间的加载顺序与命名冲突处理本章未验证。 [@ref-omp-plugins-loader-code]

## 插件 API 边界 {#plugins-api}

扩展 API 面包括 `pi.on`、`pi.registerTool`、`pi.registerCommand` 与若干注册方法；加载阶段只允许注册，运行时动作要等 `ExtensionRunner` 初始化之后才可用，加载期调用运行时会抛 `ExtensionRuntimeNotInitializedError`。 [@ref-omp-extensions-doc]

缺口：宿主给插件的权限边界本章未取证，属部分结论。 [@ref-omp-extensions-doc]

## 生命周期状态 {#plugins-lifecycle}

已安装记录里区分 `enabled` 与 `enabledFeatures`：`enabledFeatures` 为 `null` 表示用默认（所有 `default: true` 的特性），为数组时表示只启用列出的特性；运行态另有 `version` 与 `enabled`。 [@ref-omp-plugins-installed-code]

缺口：要区分已安装、启用、发现、加载、激活与健康，需要运行态观察，本章未做，属部分结论。 [@ref-omp-plugins-installed-code]

## 诊断缺口 {#plugins-diagnostics}

`doctor` 动作用于诊断，相关命令另有 `--json` 输出。本轮没有安装受管插件，所以 `list` 与 `doctor` 的实际输出、以及 `loaded`、`active`、`healthy` 如何判定均未取证。 [@ref-omp-plugins-command-code]
