---
schema_version: 3
record_kind: production
edition_id: roo-code-vscode-native_plugins-v1
harness_id: roo-code
topic: native_plugins
title: "Roo Code 的原生插件面：自定义工具的文件格式、API 边界与生命周期，以及 Marketplace 的文档与源码缺口"
sections:
  - section_id: plugins-model
    surface_ids: [vscode]
    source_refs: [ref-roo-plugin-code-manifest, ref-roo-plugin-doc-customtools-what, ref-roo-plugin-code-esbuild]
  - section_id: plugins-package
    surface_ids: [vscode]
    source_refs: [ref-roo-plugin-code-types, ref-roo-plugin-code-validate, ref-roo-plugin-doc-customtools-env, ref-roo-plugin-doc-customtools-limits, ref-roo-plugin-code-envcopy]
  - section_id: plugins-install
    surface_ids: [vscode]
    source_refs: [ref-roo-plugin-doc-marketplace-overview, ref-roo-plugin-doc-marketplace-scope, ref-roo-plugin-doc-marketplace-install, ref-roo-plugin-doc-marketplace-trouble, ref-roo-plugin-code-manifest, ref-roo-plugin-code-refresh, ref-roo-plugin-code-types, ref-roo-plugin-doc-customtools-dirs, ref-roo-plugin-code-dirs]
  - section_id: plugins-discovery
    surface_ids: [vscode]
    source_refs: [ref-roo-plugin-code-build-tools, ref-roo-plugin-code-discovery, ref-roo-plugin-code-validate, ref-roo-plugin-code-dirs, ref-roo-plugin-code-stale, ref-roo-plugin-code-esbuild, ref-roo-plugin-doc-customtools-create]
  - section_id: plugins-api
    surface_ids: [vscode]
    source_refs: [ref-roo-plugin-code-types, ref-roo-plugin-code-build-tools, ref-roo-plugin-code-format-native, ref-roo-plugin-code-execute, ref-roo-plugin-doc-customtools-limits, ref-roo-plugin-code-esbuild]
  - section_id: plugins-lifecycle
    surface_ids: [vscode]
    source_refs: [ref-roo-plugin-code-experiment-ids, ref-roo-plugin-code-experiment-default, ref-roo-plugin-code-build-tools, ref-roo-plugin-code-refresh, ref-roo-plugin-code-stale, ref-roo-plugin-code-esbuild, ref-roo-config-doc-vscode, ref-roo-plugin-code-validate]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [vscode]
        section_id: plugins-model
        status: answered
        source_refs: [ref-roo-plugin-code-manifest, ref-roo-plugin-code-esbuild]
  - question_id: plugins.package
    answers:
      - surface_ids: [vscode]
        section_id: plugins-package
        status: answered
        source_refs: [ref-roo-plugin-code-types, ref-roo-plugin-code-validate, ref-roo-plugin-code-envcopy]
  - question_id: plugins.install
    answers:
      - surface_ids: [vscode]
        section_id: plugins-install
        status: conflict
        source_refs: [ref-roo-plugin-doc-marketplace-install, ref-roo-plugin-doc-marketplace-scope, ref-roo-plugin-code-dirs]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [vscode]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-roo-plugin-code-discovery, ref-roo-plugin-code-dirs, ref-roo-plugin-code-esbuild]
  - question_id: plugins.api
    answers:
      - surface_ids: [vscode]
        section_id: plugins-api
        status: answered
        source_refs: [ref-roo-plugin-code-types, ref-roo-plugin-code-format-native, ref-roo-plugin-code-execute]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [vscode]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-roo-plugin-code-experiment-ids, ref-roo-plugin-code-experiment-default, ref-roo-plugin-code-refresh]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-roo-plugin-code-refresh, ref-roo-plugin-code-validate]
---

## 什么算 Roo Code 的原生插件 {#plugins-model}

固定来源是官方仓库提交 `b867ec9145750d0ae1ff7f02d35406e9bf2a0b16`（扩展清单 `src/package.json`），本章只描述 `vscode` 界面。

**结论：Roo Code 没有插件系统。** 扩展清单的 `contributes` 段（`src/package.json` 第 53–405 行）只有 `viewsContainers`、`views`、`commands`、`menus`、`keybindings`、`submenus`、`configuration` 七个首层键，没有任何第三方扩展点（不存在 `contributes.plugins`、`contributes.agentPlugins` 之类的贡献点），扩展源码里也没有"加载插件包"的注册表。[@ref-roo-plugin-code-manifest]

因此在 Roo Code 语境下，可扩展的东西只有四类，本章只讲真正"运行用户代码"的那一类，其余各有专章：

| 机制 | 形态 | 是否有宿主 API | 见 |
| :-- | :-- | :-- | :-- |
| MCP server | 独立进程/远端服务，通过 MCP 协议通信 | 协议级（tools/resources），不是宿主 API | MCP 章 |
| Skill | `SKILL.md` 指令包（可带脚本资源） | 无 API，只是指令 | Skills 章 |
| 自定义模式 | YAML/JSON 配置记录 | 无 API，只是配置 | 自定义 Agent 章 |
| **自定义工具（Custom Tools）** | 工作区里的 `.ts`/`.js` 文件，导出工具对象 | 有：`defineCustomTool` 契约 + `execute` 上下文 | 本章 |

与"普通包"的关系：自定义工具是**被宿主加载并执行的用户代码**，不是 npm 包；它可以 `import` 自己目录下 `node_modules` 里的依赖，但宿主不管理依赖、不发布、也不校验包身份。[@ref-roo-plugin-doc-customtools-what][@ref-roo-plugin-code-esbuild]

## 自定义工具的包格式与"清单" {#plugins-package}

自定义工具**没有清单文件**。一个工具就是一个导出工具对象的 `.ts` 或 `.js` 文件，判定条件是"导出值是对象且带 `execute` 函数"，名称与描述取自对象字段：[@ref-roo-plugin-code-types][@ref-roo-plugin-code-validate]

```ts
import { parametersSchema as z, defineCustomTool } from "@roo-code/types"

export default defineCustomTool({
	name: "fetch_api",
	description: "Fetch data from an API endpoint",
	parameters: z.object({ url: z.string().describe("API endpoint URL") }),
	async execute({ url }, context) {
		return JSON.stringify(await (await fetch(url)).json(), null, 2)
	},
})
```

- 第一方字段：`name`（非空字符串，进入模型的工具名）、`description`（非空字符串）、`parameters`（Zod schema，序列化为 JSON Schema）、`execute(args, context)`（异步、返回字符串）。可选 `source` 由宿主在加载时写入实际文件路径，用户不必填。[@ref-roo-plugin-code-types]
- 没有 `version`、`engines`、`compatibility`、`dependencies`、`id` 这类包元数据；唯一"兼容声明"是工具目录旁可放 `package.json` 与 `node_modules`，由 esbuild 打包时解析。[@ref-roo-plugin-code-types][@ref-roo-plugin-doc-customtools-env]
- 返回类型受限：工具必须返回字符串（宿主协议约束），不能交互式提问。[@ref-roo-plugin-doc-customtools-limits]
- `.env` 处理：加载时把工具目录下的 `.env`、`.env.*` 复制到该工具的缓存目录，但**不会注入 `process.env`**，工具需要自己用 `dotenv` 从 `__dirname` 读取。[@ref-roo-plugin-code-envcopy][@ref-roo-plugin-doc-customtools-env]
- 因此 `plugins.package` 的可靠答案是"以单个入口文件为包，无清单、无版本、无兼容声明"；想固定版本只能在工具目录里用自己的 `package.json`/lockfile 管理依赖，宿主不参与。[@ref-roo-plugin-code-types]

## 安装、卸载与"固定版本" {#plugins-install}

这里固定来源自相矛盾，两组证据都要看：

- **文档描述的 Marketplace**：官方文档有一个 Marketplace 功能页，说明可在扩展内一键安装 MCP 与 Modes，安装前选择项目级或全局级；项目级写进 `.roo/mcp.json` 与 `.roomodes`，全局级写进 `mcp_settings.json` 与 `custom_modes.yaml`；MCP 还要选择 NPX/Docker 安装方式并填参数，卸载时按作用域从对应文件移除；安装失败在配置语法损坏时**拒绝写入**以保护文件。[@ref-roo-plugin-doc-marketplace-overview][@ref-roo-plugin-doc-marketplace-scope][@ref-roo-plugin-doc-marketplace-install][@ref-roo-plugin-doc-marketplace-trouble]
- **同一提交的源码**：`src/`、`packages/`、`webview-ui/src/` 下没有任何 marketplace 实现（没有 marketplace 组件、没有相关 webview 消息类型），`src/package.json` 里 "marketplace" 只出现在 `publish:marketplace` 打包脚本中，`webview-ui` 的字符串里也只提到 VS Code 自身的 Marketplace。[@ref-roo-plugin-code-manifest][@ref-roo-plugin-code-refresh]

也就是说，文档所述的"一键安装/卸载"在固定提交的扩展代码里找不到实现，实际可用的安装方式仍是手工编辑 `.roo/mcp.json`、`.roomodes` 或全局设置文件（再由各自的文件监听生效），这与 MCP 章、自定义模式章的描述一致。**没有版本概念**：Marketplace 条目按文档也没有版本选择，自定义工具与 MCP 定义同样不带版本字段。[@ref-roo-plugin-doc-marketplace-scope][@ref-roo-plugin-code-types]

安装自定义工具的方式就是放文件：把 `.ts`/`.js` 放进 `项目根/.roo/tools/`（项目级）或 `~/.roo/tools/`（全局级）。没有安装命令、没有卸载流程；删除文件即卸载，同名工具由后者覆盖。[@ref-roo-plugin-doc-customtools-dirs][@ref-roo-plugin-code-dirs]

## 发现、校验与加载顺序 {#plugins-discovery}

- **目录**：`getRooDirectoriesForCwd(cwd)` 给出的每个 `.roo` 目录下再拼 `tools/`，即 `~/.roo/tools/` 与 `项目根/.roo/tools/`。[@ref-roo-plugin-code-build-tools]
- **扫描**：`loadFromDirectory` 用 `readdirSync` 列出目录，只接受以 `.ts` 或 `.js` 结尾的文件，逐个 `import` 后遍历其导出，对每个导出调用 `validate`，合格者以 `def.name` 为键写入工具表。[@ref-roo-plugin-code-discovery]
- **校验**：`validate` 要求导出值是对象且 `execute` 是函数；`name`、`description` 必须是非空字符串；`parameters` 必须是 Zod schema。不合格的导出被跳过并记入 `failed` 列表（不抛错、不影响其它工具）。[@ref-roo-plugin-code-validate]
- **顺序与冲突**：`loadFromDirectories` 按传入顺序依次加载，注释说明"后面的目录可以覆盖前面的工具"，因此项目级 `项目根/.roo/tools/` 中的同名工具覆盖全局 `~/.roo/tools/`；同名导出在同一目录内先出现者先写入，后出现者覆盖。[@ref-roo-plugin-code-dirs]
- **增量加载**：`loadFromDirectoryIfStale` 比较目录 mtime，未变化就跳过重新加载；真正触发加载的是构建工具列表时的 `loadFromDirectoriesIfStale(...)`。[@ref-roo-plugin-code-stale][@ref-roo-plugin-code-build-tools]
- **编译**：`.ts` 文件不走 tsc，而是按 `绝对路径:mtime` 的 sha256 前 16 位做缓存键，把文件用 esbuild 打成 ESM bundle 落到系统临时目录 `dynamic-tools-cache/HASH/bundle.mjs`，再 `import()`；打包时把工具目录下的 `node_modules` 加进 `nodePaths`，Node 内置模块标为 external，并注入 CommonJS `require` 兼容垫片。`.js`/`.mjs` 直接 import。[@ref-roo-plugin-code-esbuild][@ref-roo-plugin-doc-customtools-create]

## 插件（自定义工具）能拿到什么 API 与权限 {#plugins-api}

- **能力注册**：不存在"注册新能力"的通用扩展点。自定义工具做的唯一一件事，是把一个函数注册成模型可调用的工具：`execute` 返回的字符串会作为工具结果回到会话。[@ref-roo-plugin-code-types]
- **暴露方式**：构建工具列表时把 `getAllSerialized()` 的结果经 `formatNative` 转成 OpenAI 函数工具（`type: "function"`、`strict: true`，无 `parameters` 时强制 `type: "object"`），与内置工具、MCP 工具一起进入提示。[@ref-roo-plugin-code-build-tools][@ref-roo-plugin-code-format-native]
- **执行上下文**：`execute(args, context)` 的 `context` 提供 `mode`（当前模式 slug）与 `task`；参数已按 Zod schema 校验。[@ref-roo-plugin-code-types][@ref-roo-plugin-code-execute]
- **权限边界**：
  - 工具是**自动批准**的——启用该实验特性后不会弹确认框，文档明确把它列为安全取舍。[@ref-roo-plugin-doc-customtools-limits]
  - 工具运行在扩展宿主进程内（Node 环境），因此它拥有与扩展相同的进程权限；固定来源里没有沙箱、没有按工具授权、没有网络或文件系统白名单。[@ref-roo-plugin-code-esbuild][@ref-roo-plugin-code-execute]
  - 与 `.rooignore`、模式 `fileRegex` 的关系：这些限制作用于**内置工具**的文件访问与编辑校验，`execute` 内部的直接 `fs` 调用不经过它们。[@ref-roo-plugin-code-execute]
  - 结果只能是字符串；需要返回图片/富内容做不到。[@ref-roo-plugin-doc-customtools-limits]
- **与 Skill 的边界**：Skill 只是指令文本（见 Skills 章），自定义工具是会被执行的代码；文档给出的选型建议是"仓库内逻辑用自定义工具、外部服务用 MCP"。[@ref-roo-plugin-doc-customtools-limits][@ref-roo-plugin-code-types]

## 生命周期、状态与诊断 {#plugins-lifecycle}

**状态分层**：没有"已安装/已激活"的登记表，可观察的状态只有四层：[@ref-roo-plugin-code-experiment-ids][@ref-roo-plugin-code-experiment-default][@ref-roo-plugin-code-build-tools][@ref-roo-plugin-code-refresh]

1. **文件存在**：`.roo/tools/` 下有 `.ts`/`.js` 文件。
2. **功能启用**：实验开关 `customTools` 必须为真——它属于 `experiments` 设置，`experimentIds` 里包含 `customTools`，默认值 `enabled: false`（即默认关闭）。只有在开启时才会调用 `loadFromDirectoriesIfStale` 并把工具注入提示。
3. **加载成功**：文件被 import、通过 `validate`、进入工具表并出现在模型可见的工具列表里。
4. **执行健康**：调用时由 `execute` 返回或抛错；宿主不保留每个工具的调用健康记录。

**刷新与重载**：[@ref-roo-plugin-code-refresh][@ref-roo-plugin-code-stale]

- 命令 `Refresh Custom Tools` 对应的 webview 消息是 `refreshCustomTools`，宿主重新执行 `loadFromDirectories` 并把结果用 `customToolsResult`（含 `tools` 或 `error`）回传给界面。
- 文件 mtime 变化会让下一次构建工具列表时增量重载；但因为没有可靠的自动重载保证，文档建议改完工具后用 `Refresh Custom Tools` 主动刷新，必要时重载窗口。
- 编译缓存键包含 mtime，改文件会生成新的 bundle 目录（旧缓存不清理，只堆在系统临时目录里）。[@ref-roo-plugin-code-esbuild]

**诊断入口**：[@ref-roo-plugin-code-refresh][@ref-roo-config-doc-vscode][@ref-roo-plugin-code-validate]

- 设置页的 Experimental 分页里有 "Enable custom tools" 开关与自定义工具设置面板（`CustomToolsSettings.tsx`），刷新结果的 `tools`/`error` 会显示在这里。
- 加载失败（导出不合格、Zod schema 非法、编译报错）只记录在返回的 `failed`/错误信息里，不会弹窗。
- `roo-cline.debug` 打开后可在扩展输出面板看到更细的日志；这是排查"文件放了但工具没出现"的主要手段。
- 排查顺序：文件扩展名是否是 `.ts`/`.js` → 是否在 `.roo/tools/` 且目录名正确 → 实验开关是否开启 → 导出是否为合格工具对象 → 是否被同名工具覆盖（项目级优先）。
