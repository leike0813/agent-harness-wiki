---
schema_version: 2
record_kind: production
edition_id: opencode-native_plugins-v2
harness_id: opencode
topic: native_plugins
title: OpenCode 的原生插件机制
sections:
  - section_id: plugins-model
    source_refs:
      - ref-opencode-plugins-model
      - ref-opencode-plugins-types
      - ref-opencode-plugins-package
      - ref-opencode-plugins-compat
      - ref-opencode-plugins-install
      - ref-opencode-plugins-deprecated
  - section_id: plugins-discovery
    source_refs:
      - ref-opencode-hooks-loadorder
      - ref-opencode-plugins-loader
      - ref-opencode-plugins-compat
  - section_id: plugins-api
    source_refs:
      - ref-opencode-plugins-api
      - ref-opencode-hooks-logging
      - ref-opencode-plugins-loader
questions:
  - question_id: plugins.model
    section_id: plugins-model
    status: answered
    source_refs:
      - ref-opencode-plugins-model
      - ref-opencode-plugins-types
  - question_id: plugins.package
    section_id: plugins-model
    status: answered
    source_refs:
      - ref-opencode-plugins-package
      - ref-opencode-plugins-types
      - ref-opencode-plugins-compat
  - question_id: plugins.install
    section_id: plugins-model
    status: partial
    source_refs:
      - ref-opencode-plugins-install
      - ref-opencode-plugins-deprecated
  - question_id: plugins.discovery
    section_id: plugins-discovery
    status: answered
    source_refs:
      - ref-opencode-hooks-loadorder
      - ref-opencode-plugins-loader
  - question_id: plugins.api
    section_id: plugins-api
    status: answered
    source_refs:
      - ref-opencode-plugins-api
  - question_id: plugins.lifecycle
    section_id: plugins-discovery
    status: partial
    source_refs:
      - ref-opencode-plugins-loader
      - ref-opencode-plugins-compat
  - question_id: plugins.diagnostics
    section_id: plugins-api
    status: partial
    source_refs:
      - ref-opencode-hooks-logging
      - ref-opencode-plugins-loader
---
本章依据固定源码提交 545f51d 的官方文档与实现。OpenCode 的原生插件是 JS/TS 模块，Hook 与自定义工具都由插件提供，因此本章与 Hooks 章节共享部分证据。该提交不等于 npm 包 opencode-ai@1.18.32 的运行时行为，示例中的凭据一律写成占位符。

## 定位、包格式与安装 {#plugins-model}

原生插件是一个 JS/TS 模块，用来扩展宿主行为：它接入事件，也可注册工具。它与 Skill（提示型能力）、MCP server（外部进程或 HTTP 服务）不同层，也不等于普通 npm 包——只有按宿主约定导出并在配置中声明的包才会被当作插件。一个插件函数接收上下文对象并返回 Hooks 对象。 [@ref-opencode-plugins-model] [@ref-opencode-plugins-types]

一个能注册自定义工具的最小完整插件，可放在 .opencode/plugins/custom-tools.ts：

```ts
import { type Plugin, tool } from "@opencode-ai/plugin"

export const CustomToolsPlugin: Plugin = async (ctx) => {
  return {
    tool: {
      mytool: tool({
        description: "This is a custom tool",
        args: { foo: tool.schema.string() },
        async execute(args, context) {
          return "Hello " + args.foo
        },
      }),
    },
  }
}
```

包格式上，模块默认导出一个对象，含可选 id 与 server（或 tui），二者只能有一个；检测模式还允许导出多个旧式函数，每个函数即一个插件。插件包在自己的 package.json 中用 engines.opencode 声明兼容的 opencode 版本范围：

```json
{
  "name": "my-opencode-plugin",
  "engines": { "opencode": ">=1.0.0 <2.0.0" }
}
```

运行版本不满足该范围时加载失败。入口按 package.json 的 exports 或目录内 index 系列文件解析。前提是包名与入口符合约定。生效结果是该模块被当作插件候选进入加载流程。 [@ref-opencode-plugins-package] [@ref-opencode-plugins-types] [@ref-opencode-plugins-compat]

npm 插件由配置 plugin 数组声明，写在 opencode.json 顶层（项目根 opencode.json，或用户级 ~/.config/opencode/opencode.json）：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["my-opencode-plugin", "@my-org/custom-plugin"]
}
```

源码在解析目标时调用安装流程；未带版本时按 latest 解析，因此“如何固定版本”是缺口，本项标 partial。本地插件直接从配置目录加载，可配合配置目录里的 package.json 声明依赖。源码对已内置的旧包（opencode-openai-codex-auth、opencode-copilot-auth）静默忽略。 [@ref-opencode-plugins-install] [@ref-opencode-plugins-deprecated]

## 发现与加载阶段 {#plugins-discovery}

加载顺序是全局配置、项目配置、全局插件目录、项目插件目录；同名同版本 npm 包只加载一次，本地插件与同名 npm 插件分别加载。源码把解析分成解析目标、探测入口、兼容检查、动态 import 四步，任一步失败会带阶段信息跳过该插件。 [@ref-opencode-hooks-loadorder] [@ref-opencode-plugins-loader]

由此可区分四个阶段：已安装（npm 可用）、已发现（入口解析成功）、已加载（import 成功）、已激活（插件函数执行并返回 Hooks）。源码只显式暴露解析失败阶段（install、entry、compatibility）与加载失败，文档未定义启用或健康状态，因此本项对健康度标 partial。 [@ref-opencode-plugins-loader] [@ref-opencode-plugins-compat]

## 扩展点与诊断 {#plugins-api}

插件能注册自定义工具（用 tool 定义 description、args 与 execute 并订阅 Hooks）。文档明确插件工具与内置工具同名时插件优先。插件代码在宿主进程内运行，除工具与权限配置外，文档未列出插件 API 的显式权限沙箱，因此权限边界应理解为与宿主同进程，而非受限。 [@ref-opencode-plugins-api]

诊断方面，插件内用 client.app.log() 输出结构化日志（debug、info、warn、error）：

```js
await client.app.log({
  body: { service: "my-plugin", level: "warn", message: "hook skipped" },
})
```

加载期错误按阶段报出，可据此区分安装、入口、兼容还是导入问题。文档没有列出已加载插件及其版本与健康的命令，故运行状态查询为缺口，本项标 partial。 [@ref-opencode-hooks-logging] [@ref-opencode-plugins-loader]
