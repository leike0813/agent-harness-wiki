---
schema_version: 3
record_kind: production
edition_id: zoo-code-vscode-native_plugins-v1
harness_id: zoo-code
topic: native_plugins
title: "Zoo Code VS Code 扩展的原生扩展形态：自定义工具与 Marketplace 条目"
sections:
  - section_id: plugins-model
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-custom-tools-limits, ref-zoo-code-docs-marketplace-items, ref-zoo-code-src-extension-contrib, ref-zoo-code-src-experiments, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-custom-tools-enable]
  - section_id: plugins-package
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-custom-tool-api, ref-zoo-code-src-define-custom-tool, ref-zoo-code-docs-custom-tools, ref-zoo-code-src-custom-tools-validate, ref-zoo-code-docs-custom-tools-env, ref-zoo-code-docs-custom-tools-limits]
  - section_id: plugins-install
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-marketplace-scope, ref-zoo-code-src-marketplace-install, ref-zoo-code-docs-marketplace-use, ref-zoo-code-docs-custom-tools-dirs, ref-zoo-code-readme]
  - section_id: plugins-discovery
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-roo-dirs-for-cwd, ref-zoo-code-src-custom-tools-dirs, ref-zoo-code-src-build-tools-custom, ref-zoo-code-src-custom-tools-load, ref-zoo-code-src-custom-tools-validate, ref-zoo-code-src-marketplace-config]
  - section_id: plugins-api
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-build-tools-custom, ref-zoo-code-src-custom-tool-api, ref-zoo-code-docs-custom-tools-limits, ref-zoo-code-docs-marketplace-items, ref-zoo-code-src-marketplace-install]
  - section_id: plugins-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-custom-tools-dirs, ref-zoo-code-src-custom-tools-load, ref-zoo-code-docs-custom-tools-enable, ref-zoo-code-src-build-tools-custom, ref-zoo-code-src-custom-tools-bundle, ref-zoo-code-docs-custom-tools-limits, ref-zoo-code-docs-marketplace-trouble, ref-zoo-code-docs-custom-tools-env]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [vscode]
        section_id: plugins-model
        status: answered
        source_refs: [ref-zoo-code-docs-custom-tools-limits, ref-zoo-code-docs-marketplace-items, ref-zoo-code-src-extension-contrib, ref-zoo-code-src-experiments, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-custom-tools-enable]
  - question_id: plugins.package
    answers:
      - surface_ids: [vscode]
        section_id: plugins-package
        status: answered
        source_refs: [ref-zoo-code-src-custom-tool-api, ref-zoo-code-src-define-custom-tool, ref-zoo-code-docs-custom-tools, ref-zoo-code-src-custom-tools-validate, ref-zoo-code-docs-custom-tools-env, ref-zoo-code-docs-custom-tools-limits]
  - question_id: plugins.install
    answers:
      - surface_ids: [vscode]
        section_id: plugins-install
        status: partial
        source_refs: [ref-zoo-code-docs-marketplace-scope, ref-zoo-code-src-marketplace-install, ref-zoo-code-docs-marketplace-use, ref-zoo-code-docs-custom-tools-dirs, ref-zoo-code-readme]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [vscode]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-zoo-code-src-roo-dirs-for-cwd, ref-zoo-code-src-custom-tools-dirs, ref-zoo-code-src-build-tools-custom, ref-zoo-code-src-custom-tools-load, ref-zoo-code-src-custom-tools-validate, ref-zoo-code-src-marketplace-config]
  - question_id: plugins.api
    answers:
      - surface_ids: [vscode]
        section_id: plugins-api
        status: answered
        source_refs: [ref-zoo-code-src-build-tools-custom, ref-zoo-code-src-custom-tool-api, ref-zoo-code-docs-custom-tools-limits, ref-zoo-code-docs-marketplace-items, ref-zoo-code-src-marketplace-install]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [vscode]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-zoo-code-docs-custom-tools-dirs, ref-zoo-code-src-custom-tools-load, ref-zoo-code-docs-custom-tools-enable, ref-zoo-code-src-build-tools-custom, ref-zoo-code-src-custom-tools-bundle, ref-zoo-code-docs-custom-tools-limits, ref-zoo-code-docs-marketplace-trouble, ref-zoo-code-docs-custom-tools-env]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: plugins-diagnostics
        status: answered
        source_refs: [ref-zoo-code-docs-custom-tools-dirs, ref-zoo-code-src-custom-tools-load, ref-zoo-code-docs-custom-tools-enable, ref-zoo-code-src-build-tools-custom, ref-zoo-code-src-custom-tools-bundle, ref-zoo-code-docs-custom-tools-limits, ref-zoo-code-docs-marketplace-trouble, ref-zoo-code-docs-custom-tools-env]
---

本章采写 Zoo Code 的「原生插件」形态。该产品没有一套名为 plugin 的宿主 API；能扩展宿主的本地机制有两类：**Custom Tools**（用户编写的 TS/JS 工具，运行在扩展进程里、注册为模型可见的工具）与 **Marketplace 条目**（声明式地安装 mode 或 MCP server 配置）。固定来源是 Zoo-Code 仓库固定 commit `bf3bc781b813a2a6cbdb29dfd7c86f423589090e` 上的 `packages/core/src/custom-tools/`、`packages/types/src/custom-tool.ts`、`src/services/marketplace/`、`src/package.json`，以及 Zoo-Code-Docs 仓库固定 commit `dfd2628c31073ec6b111bfedbcd071d197d37ad2` 上的 `docs/features/experimental/custom-tools.md` 与 `docs/features/marketplace.mdx`。

## 什么算这里的“插件” {#plugins-model}

| 形态 | 它是什么 | 与其他机制的关系 |
| --- | --- | --- |
| Custom Tools | `.roo/tools/` 或 `~/.roo/tools/` 下的 `.ts`/`.js` 文件，被加载并转译后注册成模型可调用的工具 | 与 MCP 分工：MCP 面向外部服务，自定义工具面向仓库内逻辑；官方也把它们列为两种并行扩展路径 [@ref-zoo-code-docs-custom-tools-limits] |
| Marketplace 条目 | 官方 marketplace 里的两类条目：MCP server 与 mode（模式） | 只是把声明写进 `.roo/mcp.json`、`mcp_settings.json`、`.roomodes` 或 `custom_modes.yaml`，不加载可执行代码 [@ref-zoo-code-docs-marketplace-items] |
| VS Code 扩展本身 | Zoo Code 自身作为 VS Code 扩展被安装/更新 | 扩展清单只声明视图、命令、菜单、快捷键与设置等标准贡献点，没有第三方插件 API [@ref-zoo-code-src-extension-contrib] |

- 自定义工具默认关闭，由实验开关 `customTools` 控制；功能索引把它列为实验性能力 [@ref-zoo-code-src-experiments] [@ref-zoo-code-docs-custom-tools]。
- 自定义工具执行的是真实代码，因此官方明确提示：启用后这些工具**自动批准**，不会先询问，只应在信任工具代码时启用 [@ref-zoo-code-docs-custom-tools-enable]。
- 它不同于 Skill（只注入指令文本、不执行代码），也不同于 Hook（本产品没有事件回调机制）。

## 工具包格式与元数据 {#plugins-package}

- 一个工具文件导出（默认导出或具名导出皆可）一个工具定义对象，字段为 `name`、`description`、`parameters`（Zod schema）与 `execute(args, context)`；`execute` 必须返回字符串 [@ref-zoo-code-src-custom-tool-api]。
- `defineCustomTool` 只是类型推断辅助函数，运行时等价于返回原对象；官方推荐从 `@roo-code/types` 导入 `defineCustomTool` 与 `parametersSchema as z` [@ref-zoo-code-src-define-custom-tool] [@ref-zoo-code-docs-custom-tools]。
- 参数 schema 用 Zod 定义，运行时校验 Zod 对象（检查 `_def`），再序列化成 JSON Schema 提供给模型 [@ref-zoo-code-src-custom-tools-validate]。
- 没有插件清单文件、版本号、兼容声明或签名机制：加载器仅做「看起来像不像工具」的字段校验——`name`、`description` 必须是非空字符串，`parameters` 存在时必须是 Zod schema，`execute` 必须存在且为函数 [@ref-zoo-code-src-custom-tools-validate]。
- 依赖与资源：工具目录内可以 `npm install`，打包时会带上该目录的 `node_modules`；`.env` 与 `.env.*` 会被复制到每个工具独立的缓存子目录（互不覆盖），但**不会**自动注入 `process.env`，需要工具自己用 dotenv 读取 [@ref-zoo-code-docs-custom-tools-env]。
- 结果形态受限：只能返回字符串，不能在执行中向用户提问 [@ref-zoo-code-docs-custom-tools-limits]。

```ts
// 依据 docs/features/experimental/custom-tools.md 的 Basic structure 一节
import { parametersSchema as z, defineCustomTool } from "@roo-code/types"

export default defineCustomTool({
  name: "tool_name",
  description: "What the tool does (shown to AI)",
  parameters: z.object({ param1: z.string().describe("Parameter description") }),
  async execute(args, context) {
    return "Result string shown to AI"
  },
})
```

## 安装、作用域与卸载 {#plugins-install}

- Marketplace 安装时选择 **Project** 或 **Global** 作用域；Project 写入工作区的 `.roo/mcp.json` 与 `.roomodes`，Global 写入全局 `mcp_settings.json` 与 `custom_modes.yaml`；文件不存在时会被创建并打开供检查 [@ref-zoo-code-docs-marketplace-scope]。
- 安装是“写配置”而非“装包”：mode 条目被追加进 `customModes` 数组（同 `slug` 先移除再加），MCP 条目被写进 `mcpServers`；目标文件语法错误时拒绝改动以保护数据 [@ref-zoo-code-src-marketplace-install]。
- 卸载从同一份配置里移除对应条目，安装在两个作用域时会让用户选择从哪个作用域移除，且没有二次确认 [@ref-zoo-code-docs-marketplace-use]。
- 自定义工具没有“安装”步骤：把文件放进 `.roo/tools/`（项目）或 `~/.roo/tools/`（全局）即可；同名工具后者被前者覆盖 [@ref-zoo-code-docs-custom-tools-dirs]。
- 扩展本体走 VS Code 扩展渠道安装/更新（README 顶部给出 VS Code Marketplace 与 Open VSX 的入口），版本固定与更新由 VS Code 的扩展管理负责 [@ref-zoo-code-readme]。
- 固定来源没有为 marketplace 条目或自定义工具提供版本约束字段（如版本区间、固定版本），也没有“禁用但不卸载”的状态位；作用域是唯一的安装维度 [@ref-zoo-code-src-marketplace-install] [@ref-zoo-code-docs-custom-tools-dirs]。

## 发现、解析与加载顺序 {#plugins-discovery}

- 自定义工具的目录列表来自 `getRooDirectoriesForCwd(cwd)` 加上各自的 `tools` 子目录，即「全局 `~/.roo/tools` → 项目 `.roo/tools`」，后处理的目录可覆盖先处理的同名工具 [@ref-zoo-code-src-roo-dirs-for-cwd] [@ref-zoo-code-src-custom-tools-dirs]。
- 加载时机是构建工具集时：只有实验开关打开时才调用 `customToolRegistry.loadFromDirectoriesIfStale(toolDirs)`；每个目录用 mtime 判断是否过期（比上次加载时间新才重扫），未过期就沿用内存中的注册表 [@ref-zoo-code-src-build-tools-custom] [@ref-zoo-code-src-custom-tools-load]。
- 扫描只处理目录顶层的 `.ts`/`.js` 文件（不递归子目录）；每个文件被动态 import，导出项逐个校验，合法项写入注册表（同名覆盖），非法项抛错并计入 `failed`，不影响同目录其他文件 [@ref-zoo-code-src-custom-tools-load] [@ref-zoo-code-src-custom-tools-validate]。
- Marketplace 条目来自扩展自带资源而非远端：`ConfigLoader` 从扩展的 `assets/marketplace/modes.yml` 与 `mcps.yml` 读取并做 schema 校验后合并成条目列表 [@ref-zoo-code-src-marketplace-config]。
- 命名冲突规则：工具名即注册键，后加载者覆盖；没有命名空间前缀（与 MCP 的 `mcp--server--tool` 命名不同）[@ref-zoo-code-src-custom-tools-load]，这一点在混用 MCP 与自定义工具时需要注意。

## 可注册的能力与边界 {#plugins-api}

- 自定义工具唯一能注册的是「模型可见的工具」：名称、描述、参数 schema 与执行函数；构建工具集时它们被序列化成原生工具定义，与其他原生工具一同下发 [@ref-zoo-code-src-build-tools-custom] [@ref-zoo-code-src-custom-tool-api]。
- 执行上下文只提供 `mode` 与 `task`，返回值自动回填为工具结果字符串 [@ref-zoo-code-src-custom-tool-api]。
- 权限边界：工具代码运行在扩展进程里，拥有与扩展相同的文件系统与网络能力；宿主不提供沙箱，也没有逐工具授权，唯一的安全开关是全局启用/停用 [@ref-zoo-code-docs-custom-tools-limits]。
- Marketplace 条目的能力边界更窄：只能新增/移除 mode 与 MCP server 条目，不能注册工具、命令或事件 [@ref-zoo-code-docs-marketplace-items] [@ref-zoo-code-src-marketplace-install]。
- 工具对模型可见不等于必然被调用：模型按名称与描述自行决定调用时机，宿主不提供“强制触发”或“禁用单个工具”的第三方接口 [@ref-zoo-code-docs-custom-tools-limits]。

## 生命周期、启用与诊断 {#plugins-diagnostics}

可区分的状态与观察点：

| 状态 | 判定依据 |
| --- | --- |
| 已安装（文件存在） | 工具文件位于 `.roo/tools/` 或 `~/.roo/tools/` [@ref-zoo-code-docs-custom-tools-dirs] |
| 已加载 | 注册表读到该名字；加载结果分 `loaded` 与 `failed` 两组 [@ref-zoo-code-src-custom-tools-load] |
| 已启用 | 实验开关 `customTools` 打开，且构建工具集时把注册表内容加入工具定义 [@ref-zoo-code-docs-custom-tools-enable] [@ref-zoo-code-src-build-tools-custom] |
| 已转译/已缓存 | TS 文件经 esbuild 打包到缓存目录下按内容哈希命名的子目录，命中缓存则直接复用 [@ref-zoo-code-src-custom-tools-bundle] |

- 「激活」与「健康」没有独立状态位：固定来源中自定义工具只有“加载/未加载”与“启用开关”，没有心跳、健康检查或运行状态查询入口；Marketplace 条目也只有“在配置文件里/不在”这一种状态。这是 `plugins.lifecycle` 只作部分作答的原因。
- 改动工具文件后自动重载不可靠：文件监视不作为保证，官方要求用 **Refresh Custom Tools** 命令立即生效，必要时重载窗口；缓存目录按内容哈希区分，清理入口是注册表的 `clearCache()` [@ref-zoo-code-docs-custom-tools-limits] [@ref-zoo-code-src-custom-tools-bundle]。
- 加载失败的可观察入口是日志：`[CustomToolRegistry] import(路径) failed: 原因` 与 `loadFromDirectory` 的汇总错误；失败项不会进入工具列表 [@ref-zoo-code-src-custom-tools-load]。
- 目录级失败（目录不存在）静默返回空结果，不报错 [@ref-zoo-code-src-custom-tools-load]。
- Marketplace 条目的诊断：配置语法错误会阻止安装/卸载并给出提示，装完不生效时按“检查配置文件 → 重启 VS Code → 核对前置条件 → 查看 Zoo Code 输出面板”的顺序排查 [@ref-zoo-code-docs-marketplace-trouble]。
- 环境变量没有自动注入，工具读不到 `.env` 是常见“装了不工作”的原因；`.env` 被复制到工具专属缓存目录，需配合 `__dirname` 读取 [@ref-zoo-code-docs-custom-tools-env]。
