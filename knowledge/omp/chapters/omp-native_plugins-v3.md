---
schema_version: 3
record_kind: production
edition_id: omp-native_plugins-v3
harness_id: omp
topic: native_plugins
title: OMP 原生插件清单、安装与加载
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs:
      - ref-omp-extensions-load-doc-69e8
  - section_id: plugins-manifest
    surface_ids: [cli]
    source_refs:
      - ref-omp-extension-loading-manifest-doc-69e8
      - ref-omp-plugins-manifest-code
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs:
      - ref-omp-plugins-command-code
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs:
      - ref-omp-extension-loading-native-doc-69e8
      - ref-omp-extension-loading-order-doc-69e8
      - ref-omp-extension-loading-paths-doc-69e8
      - ref-omp-plugins-loader-code
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs:
      - ref-omp-extensions-load-doc-69e8
      - ref-omp-extensions-settings-doc-69e8
      - ref-omp-extensions-provider-doc-69e8
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-omp-extension-loading-allowlist-doc-69e8
      - ref-omp-extensions-load-doc-69e8
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-omp-extension-loading-allowlist-doc-69e8
      - ref-omp-extensions-load-doc-69e8
      - ref-omp-plugins-command-code
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs:
          - ref-omp-extensions-load-doc-69e8
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-manifest
        status: answered
        source_refs:
          - ref-omp-extension-loading-manifest-doc-69e8
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
          - ref-omp-extension-loading-order-doc-69e8
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: partial
        source_refs:
          - ref-omp-extensions-settings-doc-69e8
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs:
          - ref-omp-extension-loading-allowlist-doc-69e8
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs:
          - ref-omp-extension-loading-allowlist-doc-69e8
---
本章材料主要来自源码修订 69e8c9e 的官方文档 `docs/extensions.md` 与 `docs/extension-loading.md`。加载顺序、运行时模型、设置句柄与精确模块白名单取自该修订的文档正文；插件清单字段与 `omp plugin` 命令动作仍沿用上一版基于 npm 包 `@oh-my-pi/pi-coding-agent` 18.3.4 的包内证据，本轮没有为它们重新取证。相对上一版的变化是实质性的：模块导入改为并发、工厂按路径顺序串行绑定并支持为子会话复用，新增 `--trusted-extension` 精确模块白名单，字符串路径式的设置读写已被移除。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有安装或加载任何插件。

## 插件模型与加载 {#plugins-model}

扩展加载先构造一个有序的模块入口文件列表，用 Bun **并发**导入这些模块，再按路径顺序**串行**绑定它们的工厂。返回值除了加载到的扩展定义与按路径的导入/工厂错误（不影响其它模块的加载）外，还包含一份共享的扩展运行时对象供 `ExtensionRunner` 后续使用，以及可用于在不解算模块图的情况下重绑到新会话的已准备工厂。 [@ref-omp-extensions-load-doc-69e8]

运行时模型的五个阶段是：导入模块并绑定工厂（此时只有注册方法可用，会话动作尚未初始化）；`ExtensionRunner.initialize(...)` 为当前模式接上真实的动作与上下文；会话/agent/tool 生命周期事件发给 handler；注册工具被包装以接受 `tool_call` / `tool_result` 拦截。 [@ref-omp-extensions-load-doc-69e8]

`loader.ts` 的硬约束值得单独记住：在扩展加载期调用 `pi.sendMessage()` 这类动作方法会抛 `ExtensionRuntimeNotInitializedError`，正确的做法是先注册、再从事件、命令或工具里做运行时行为；`pi.exec()` 在加载期直接可用，而 provider 注册被排队到会话建立时才执行。子会话复用已导入的工厂，但会绑定全新的 API 与扩展注册，模块级变量仍在这些会话之间共享。 [@ref-omp-extensions-load-doc-69e8]

## 插件清单 {#plugins-manifest}

插件清单解析自包 `package.json` 的 `omp` 字段，回退到旧的 `pi` 字段。字段包括 `name`（缺省用包名）、`version`、`description`、`tools`、`hooks`、`extensions`、`commands`、`features` 与 `settings`；`extensions` 是入口路径数组，`features` 里每个特性可再带 extensions、tools、hooks、commands 入口。 [@ref-omp-plugins-manifest-code]

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

本版扩展了已安装插件的清单解析面：显式文件接受 `.ts`、`.js`、`.mjs` 与 `.cjs`；清单条目若指向目录，识别 `index.ts`、`index.js`、`index.mjs` 与 `index.cjs`，扩展目录展开同样用这四种后缀，这比原生与已配置目录的自动扫描（仍限于 `.ts` 与 `.js`）更宽。已安装插件的扩展目录解析顺序是：先看目录自身非空的 `omp.extensions` / `pi.extensions` 清单，再看直接 index，最后做排序后的一层扫描，该扫描跳过声明文件（`*.d.ts`、`*.d.mts`、`*.d.cts`）；而显式声明的文件条目不受后缀过滤。 [@ref-omp-extension-loading-manifest-doc-69e8]

## 安装、更新与卸载 {#plugins-install}

`omp plugin` 的动作集包含 `install`、`uninstall`、`list`、`link`、`doctor`、`features`、`config`、`enable`、`disable`、`marketplace`、`discover` 与 `upgrade`；安装作用域通过 `--scope user` 或 `--scope project` 区分。动作集里没有独立的 npm 插件 update，更新通过带新版本号重新安装完成。 [@ref-omp-plugins-command-code]

一个项目作用域的安装与启停序列：

```bash
omp plugin install @acme/omp-plugin@0.1.0 --scope project
omp plugin list
omp plugin disable @acme/omp-plugin
```

`@acme/omp-plugin@0.1.0` 是展示命令形状的占位包名，运行前须换成实际存在且适配的插件版本。 [@ref-omp-plugins-command-code]

本轮没有为 `omp plugin` 的命令动作重新取证，这一节沿用上一版基于 npm 18.3.4 包内命令定义的证据；它不构成对 69e8c9e 的运行确认。

## 发现与加载顺序 {#plugins-discovery}

`discoverAndLoadExtensions()` 由 `discoverExtensionPaths()` 与 `loadExtensions()` 组合而成，SDK 通常先发现路径，并可为子会话复用已导入/已准备的工厂。顺序是四段：原生自动发现的模块、经发现的 JS/TS hook 工厂、已安装插件的扩展条目、显式配置路径（按给定顺序）。 [@ref-omp-extension-loading-order-doc-69e8]

在 `sdk.ts` 里，显式路径的顺序是先 CLI 追加路径、后设置的 `extensions`。去重按绝对路径、先到先得、后出现的重复被忽略，因此同一模块路径同时被自动发现和显式配置时只会在自动发现那一段加载一次；去重不用 realpath，所以指向同一文件的不同符号链接按不同路径处理。 [@ref-omp-extension-loading-order-doc-69e8]

原生发现现在以 `providers: ["native"]` 过滤加载 `extension-module` 能力，因此外部的扩展模块 provider 不会被这个加载器扫描；原生自动发现来自项目 `.omp/extensions`、用户 agent 目录的 `extensions/`（默认 `~/.omp/agent/extensions`）以及 `settings.json#extensions` 这两类遗留 JSON 列表。设置侧的有效 `extensions` 值来自设置层与 `--config` 覆盖，按数组替换语义而非拼接。 [@ref-omp-extension-loading-paths-doc-69e8]

## 插件 API 边界 {#plugins-api}

设置读写本版换了接口：字符串路径式的 `settings.get` / `set` / `override` 已在 18.3 移除。扩展改从 `@oh-my-pi/pi-coding-agent/config/registry` 子路径用 `lookup(id)` 解析句柄（`all()` 枚举），再把 `pi.pi.settings` 当作 scope 传进去；`lookup` 对未知 id 返回 `undefined`。 [@ref-omp-extensions-settings-doc-69e8]

`override(scope, value)` 写入内存运行时层，永不持久化，并且压过项目、全局与 `--config` 层；设置的环境变量绑定通常仍然优先，而用 `envFallback` 的定义才让位于已配置的设置。`clearOverride(scope)` 释放覆盖，`isConfigured(scope)` / `provenance(scope)` 区分用户配置值与默认值（来源枚举为 `"env"`、`"runtime"`、`"overlay"`、`"project"`、`"global"`、`"default"`），`get(scope)` 读有效值、`listen(scope, cb)` 观察变化；写入走设置存储，因此变更监听与实时副作用会触发。 [@ref-omp-extensions-settings-doc-69e8]

`pi.registerProvider(name, config)` 可带可选的 `usage` 字段，内含从 `@oh-my-pi/pi-ai` 导入的 `UsageProvider`；它的 `fetchUsage` 收到归一化凭据并返回归一化 `UsageReport`，随后由宿主的 AuthStorage 缓存、历史与用量展示按内置 provider 的同一条路径处理。 [@ref-omp-extensions-provider-doc-69e8]

缺口：宿主给插件的权限边界、注册工具的实际拦截行为本章未取证，属部分结论。 [@ref-omp-extensions-load-doc-69e8]

## 生命周期与精确白名单 {#plugins-lifecycle}

本版新增了精确模块白名单：CLI 的 `--trusted-extension 绝对文件路径` 可重复，只加载这些扩展模块文件，绕过发现与包目录展开。路径必须是绝对的、已存在的文件，加载前解析符号链接；它不能与 `-e`/`--extension` 或 `--hook` 组合，且白名单模块加载失败会中止启动而不是静默丢弃。 [@ref-omp-extension-loading-allowlist-doc-69e8]

白名单的授权范围也写清了：与显式扩展包目录不同，白名单文件不授权同级的 hooks、tools、commands、skills、rules、prompts 或 MCP 配置；它仍是进程内模块白名单，不是沙箱，也不是关闭其它发现子系统的开关。 [@ref-omp-extension-loading-allowlist-doc-69e8]

`disabledExtensions` 的过滤面也扩大了：ambient 扩展模块、已安装插件条目以及从已配置目录展开的条目都按扩展 id 过滤（`extension-module:名字` 形态），而显式配置文件路径绕过该名称过滤。 [@ref-omp-extension-loading-manifest-doc-69e8]

缺口：要区分已安装、启用、发现、加载、激活与健康，需要运行态观察，本轮未做，属部分结论。 [@ref-omp-extensions-load-doc-69e8]

## 诊断缺口 {#plugins-diagnostics}

本版新增了两条可确证的失败面：白名单模块的加载失败会中止启动（这是与普通静默跳过不同的信号），以及在扩展加载期调用会话动作方法会抛 `ExtensionRuntimeNotInitializedError`——看到这条异常通常说明代码放错了阶段，而不是模块坏了。 [@ref-omp-extension-loading-allowlist-doc-69e8]

按路径的导入/工厂错误在加载期被逐路径收集而不影响其它模块，因此“部分插件生效、部分插件静默缺失”是这一子系统的正常失败形态。 [@ref-omp-extensions-load-doc-69e8]

本轮没有安装受管插件，所以 `omp plugin list` 与 `omp plugin doctor` 的实际输出、以及 `loaded`、`active`、`healthy` 如何判定均未取证。 [@ref-omp-plugins-command-code]
