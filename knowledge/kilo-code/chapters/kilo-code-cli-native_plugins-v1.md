---
schema_version: 3
record_kind: production
edition_id: kilo-code-cli-native_plugins-v1
harness_id: kilo-code
topic: native_plugins
title: "Kilo Code CLI — 原生插件（TS/JS 模块的注册、加载、扩展点与诊断）"
sections:
  - section_id: native_plugins-model
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-what, ref-kilo-code-plugins-create, ref-kilo-code-plugins-use]
  - section_id: native_plugins-sources
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-config-file, ref-kilo-code-plugins-dir, ref-kilo-code-plugins-cmd, ref-kilo-code-cli-plugin-cmd, ref-kilo-code-config-src-paths, ref-kilo-code-config-src-files]
  - section_id: native_plugins-package
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-structure, ref-kilo-code-plugins-module, ref-kilo-code-plugins-manifest, ref-kilo-code-plugins-engine, ref-kilo-code-plugins-types, ref-kilo-code-plugins-deps]
  - section_id: native_plugins-loading
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-install, ref-kilo-code-plugins-order, ref-kilo-code-plugins-pure, ref-kilo-code-plugins-src-scandir, ref-kilo-code-plugins-src-loader, ref-kilo-code-plugins-src-resolve, ref-kilo-code-plugins-src-load, ref-kilo-code-plugins-src-install]
  - section_id: native_plugins-api
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-tools, ref-kilo-code-plugins-src-hooks]
  - section_id: native_plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-troubleshoot]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: native_plugins-model
        status: answered
        source_refs: [ref-kilo-code-plugins-what, ref-kilo-code-plugins-create, ref-kilo-code-plugins-use]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: native_plugins-package
        status: answered
        source_refs: [ref-kilo-code-plugins-structure, ref-kilo-code-plugins-module, ref-kilo-code-plugins-manifest, ref-kilo-code-plugins-engine, ref-kilo-code-plugins-types]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: native_plugins-sources
        status: answered
        source_refs: [ref-kilo-code-plugins-config-file, ref-kilo-code-plugins-cmd, ref-kilo-code-cli-plugin-cmd, ref-kilo-code-plugins-dir]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: native_plugins-loading
        status: answered
        source_refs: [ref-kilo-code-plugins-order, ref-kilo-code-plugins-src-scandir, ref-kilo-code-plugins-src-loader, ref-kilo-code-plugins-src-resolve, ref-kilo-code-plugins-src-load, ref-kilo-code-plugins-install, ref-kilo-code-plugins-src-install]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: native_plugins-api
        status: answered
        source_refs: [ref-kilo-code-plugins-tools, ref-kilo-code-plugins-src-hooks]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: native_plugins-loading
        status: answered
        source_refs: [ref-kilo-code-plugins-src-load, ref-kilo-code-plugins-pure, ref-kilo-code-plugins-install, ref-kilo-code-plugins-order]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: native_plugins-diagnostics
        status: answered
        source_refs: [ref-kilo-code-plugins-troubleshoot]
---

本章只覆盖 Kilo Code CLI（`surface_id: cli`）的原生插件机制，依据固定源码提交中的文档页 `packages/kilo-docs/pages/automate/extending/plugins.md`、CLI 参考文档与 `packages/opencode/src/plugin/**`、`packages/opencode/src/config/plugin.ts`。官方文档中仅对 VS Code 扩展成立的 Marketplace 安装路径不在本界面结论内。

## 原生插件是什么 {#native_plugins-model}

Kilo Code CLI 的原生插件（plugin）是 TypeScript 或 JavaScript **模块**，由 CLI 在启动时加载、常驻同一进程运行 [@ref-kilo-code-plugins-what]。一个插件就是默认导出的模块描述符：其中 `server` 是接收插件上下文、返回一组 hooks 的函数 [@ref-kilo-code-plugins-module]。官方定义直接写明 "A plugin is a module that exports a function returning a set of hooks" [@ref-kilo-code-plugins-create]。

把它与相邻机制区分开：

- **Skill**：`SKILL.md` 指令文件（提示词与附带资源），由 Agent 按名称/描述调用，本身不是可执行模块。
- **MCP server**：在 `mcp` 配置段声明的外部进程或远程端点，通过协议暴露工具；插件则在同一进程内注册能力。
- **Hook 脚本**：独立配置的外部命令；插件的 hooks 是同进程内被调用的 JS 回调。
- **普通 npm 包**：只是依赖，被 import 才有行为；要成为插件还必须在 `package.json` 声明匹配运行时的入口点。

插件能注册或改写的扩展点包括：添加模型可调用的自定义工具、拦截并改写/阻断工具调用、订阅事件（会话、消息、权限、LSP 诊断、文件变更等）、注册认证方式（OAuth 或 API key）、注册（动态）模型 provider、改写发送给 LLM 的 chat 参数或请求头、定制会话压缩提示词、为 agent 或用户执行的命令注入 shell 环境变量 [@ref-kilo-code-plugins-what]。

插件有多个加载入口（详见 [注册与发现入口](#native_plugins-sources)）；本界面涉及配置文件里的 `plugin` 数组、配置目录下的 `plugin/` 或 `plugins/` 文件夹、以及 `kilo plugin` 命令。文档另列 VS Code Marketplace 面板安装，那属于扩展界面而非 CLI [@ref-kilo-code-plugins-use]。

## 注册与发现入口 {#native_plugins-sources}

**一、配置数组。** 在配置文件里用 `plugin` 键写一个 specifier 数组 [@ref-kilo-code-plugins-config-file]：

```json
{
  "$schema": "https://app.kilo.ai/config.json",
  "plugin": [
    "@your-org/your-plugin",
    "your-plugin@1.2.3",
    ["your-plugin", { "apiKey": "{env:MY_API_KEY}" }],
    "./plugins/local.ts",
    "file:///abs/path/plugin.ts"
  ]
}
```

四种条目形态各由不同的位置加载 [@ref-kilo-code-plugins-config-file]：

| 形态 | 加载来源 |
|---|---|
| `"package-name"` | npm 最新版 |
| `"package-name@1.2.3"` | npm 固定版本 |
| `["package-name", { options }]` | npm 包，选项对象作为第二参数传给插件函数 |
| `"./path/plugin.ts"` 或 `"file:///..."` | 本地文件，相对声明它的配置文件解析，或绝对 `file:` URL |

**二、目录自动注册。** 把 TypeScript 或 JavaScript 文件放进任意配置目录下的 `plugin/` 或 `plugins/` 文件夹，目录内每个 `.ts`/`.js` 都在启动时自动注册，无需写进配置数组 [@ref-kilo-code-plugins-dir]。位置为：

- Global：`~/.config/kilo/plugin/`
- Project：`.kilo/plugin/`，或旧版 `.kilocode/plugin/`

**三、`kilo plugin` 命令。** 一步安装 npm 插件并改写配置 [@ref-kilo-code-plugins-cmd]：

```bash
kilo plugin my-plugin          # 写入当前项目的配置
kilo plugin my-plugin --global # 写入全局配置
kilo plugin my-plugin --force  # 替换已有条目
```

命令会解析包、读取其 `package.json` 的插件入口，把条目写入对应配置文件（本地安装写 `.kilo/opencode.jsonc` / `.kilo/tui.jsonc`，`--global` 写 `~/.config/kilo/opencode.jsonc` / `~/.config/kilo/tui.jsonc`），并保留 JSONC 注释 [@ref-kilo-code-plugins-cmd]。CLI 参考列出该命令的参数：位置参数 `module`（npm 模块名），选项 `-g, --global`（默认 `false`）与 `-f, --force`（替换已有版本） [@ref-kilo-code-cli-plugin-cmd]。

**配置目录位置。** 运行时识别的文件名集合为 `["kilo.jsonc", "kilo.json", "opencode.jsonc", "opencode.json"]` [@ref-kilo-code-config-src-files]；项目级配置目录按 `ConfigPaths.projectFiles` 的规则定位 [@ref-kilo-code-config-src-paths]。

## 插件包结构与兼容声明 {#native_plugins-package}

最小本地插件是一个默认导出描述符的文件 [@ref-kilo-code-plugins-structure]：

```ts
// .kilo/plugin/hello.ts
import type { Plugin } from "@kilocode/plugin"

const hello: Plugin = async ({ project, client, $, directory, worktree }) => {
  console.log("hello plugin loaded")
  return {}
}

export default { id: "hello", server: hello }
```

插件函数收到的上下文对象含 `project`、`directory`、`worktree`、`client`（Kilo SDK 客户端）、`$`（Bun shell API）、`serverUrl`、`experimental_workspace`（注册 workspace adaptor） [@ref-kilo-code-plugins-structure]。

**模块形态。** 插件必须默认导出模块描述符；本地文件插件的 `id` 必填，npm 插件的 `id` 从 `package.json#name` 推断。`server` 与 `tui` 是两个互相独立的模块，npm 插件可额外暴露 TUI 入口 [@ref-kilo-code-plugins-module]。

**包清单与入口。** 发布的 npm 插件应声明各运行时对应的入口点，Kilo 从 `package.json` 检测 [@ref-kilo-code-plugins-manifest]：

- `exports["./server"]` 标记 server 插件（CLI 运行时即消费它）。
- `exports["./tui"]` 标记 TUI 插件。
- `main` 是在不使用 `exports` 时的 server-only 回退。
- `oc-themes` 标记主题包，即使没有 `./tui` 导出。

导出项上的可选 `config` 对象会成为首次安装写入用户配置的默认选项元组；`oc-themes` 条目必须是包内相对路径，绝对路径、`file://` URL 和逃逸包目录的路径会被拒绝 [@ref-kilo-code-plugins-manifest]。

**引擎兼容。** 插件可用 `engines` 声明支持的 CLI 版本范围 [@ref-kilo-code-plugins-engine]：

```json
{ "name": "my-plugin", "engines": { "opencode": "^7.0.0" } }
```

运行中的 CLI 不满足该范围时，插件被跳过并给出警告 [@ref-kilo-code-plugins-engine]。

**TypeScript 支持。** 本地安装插件包并引入其类型：`bun add -d @kilocode/plugin`，随后可 `import type { Plugin } from "@kilocode/plugin"` 与 `import { tool } from "@kilocode/plugin/tool"`；含 `plugin/` 文件夹的配置目录会被自动创建 `package.json` 并安装 `@kilocode/plugin`，让类型开箱可得 [@ref-kilo-code-plugins-types]。

**依赖。** 本地插件和自定义工具可以 import 外部 npm 包：在配置目录放 `package.json`（如 `.kilo/package.json`）声明依赖，Kilo 启动时运行 `bun install`，使 import 能解析 [@ref-kilo-code-plugins-deps]。

## 安装、加载与顺序 {#native_plugins-loading}

**安装。** npm 插件在启动时用 Bun 自动安装，包及其依赖缓存在 CLI XDG 缓存目录的 `packages/` 下（默认 `~/.cache/opencode/packages/`，设置了 `XDG_CACHE_HOME` 时为 `$XDG_CACHE_HOME/opencode/packages/`）。固定版本 `my-plugin@1.2.3` 会安装该确切版本、不检查更新；裸包名解析为 `latest`，缓存副本过期时可刷新。npm 插件的 install 脚本被禁用（`install`、`postinstall` 等生命周期脚本被阻断）。本地插件直接从目录加载；若 import 外部包，则在配置目录放 `package.json`，启动时跑 `bun install` [@ref-kilo-code-plugins-install]。

**加载顺序与去重。** 各来源的插件在每个会话都会运行，顺序为 [@ref-kilo-code-plugins-order]：

1. 内置插件（Kilo Gateway auth、Codex auth、Copilot auth、Cloudflare 等）
2. 全局配置数组（`~/.config/kilo/kilo.json`）
3. 全局 plugin 目录（`~/.config/kilo/plugin/`）
4. 项目配置数组（`kilo.json` / `opencode.json`）
5. 项目 plugin 目录（`.kilo/plugin/` 等）

同一包同一版本会被去重；多个插件的 hooks 按加载顺序**顺序**执行 [@ref-kilo-code-plugins-order]。

**纯模式。** 设置环境变量 `KILO_PURE=1` 会跳过全部外部插件，只加载内置插件，适合可复现的 CI 运行或调试 [@ref-kilo-code-plugins-pure]。

**目录扫描。** 目录自动注册由 `ConfigPlugin.load(dir)` 完成，glob 模式为 `{plugin,plugins}/*.{ts,js}`，并开启 `dot` 与 `symlink`，每个命中文件转成 `file:` URL [@ref-kilo-code-plugins-src-scandir]。

**加载管线。** 加载按阶段拆分，便于区分插件被跳过的确切原因 [@ref-kilo-code-plugins-src-loader]：

- `plan`：把配置项归一化为 `spec`、`options` 与 `deprecated`（已废弃、现已内置的插件包被静默忽略）。
- `resolve`：先把 spec 解析为具体安装目标（npm 插件按需安装），再对目标检测 server/tui 入口，最后做兼容检查；引擎门禁只对 npm 来源执行，文件插件被视为本地开发代码而跳过 [@ref-kilo-code-plugins-src-resolve]。
- `load`：`await import(row.entry)` 动态导入入口模块；导入失败按永久失败处理（Bun 会缓存失败的模块解析）。

安装阶段的 `installPlugin(spec, dep)` 解析目标，失败返回 `install_failed` [@ref-kilo-code-plugins-src-install]。

**运行时装配。** 会话初始化时先循环注册内置插件（`flags.disableDefaultPlugins` 为真时该列表为空）；外部插件列表在 `flags.pure` 时置空，否则取合并后的 `cfg.plugin_origins`；若存在外部插件，先 `config.waitForDependencies()` 再调用 `PluginLoader.loadExternal` [@ref-kilo-code-plugins-src-load]。

## 扩展点与宿主边界 {#native_plugins-api}

插件返回对象中的 `tool` 段注册模型可调用的自定义工具，用 `tool()` helper 保证类型安全 [@ref-kilo-code-plugins-tools]：

```ts
// .kilo/plugin/database.ts
import type { Plugin } from "@kilocode/plugin"
import { tool } from "@kilocode/plugin/tool"

const DatabasePlugin: Plugin = async () => ({
  tool: {
    query: tool({
      description: "Run a read-only SQL query against the project database",
      args: { sql: tool.schema.string().describe("SQL query to execute") },
      async execute(args, context) {
        return `ran: ${args.sql}`
      },
    }),
  },
})

export default { id: "database", server: DatabasePlugin }
```

`args` 使用 Zod schema（`tool.schema`）；`execute` 收到经校验的 `args` 与 `context`（`sessionID`、`messageID`、`agent`、`directory`、`worktree`、`abort`、`metadata`、`ask`）。若自定义工具与内置工具同名，**自定义工具胜出**；不需要完整插件上下文的工具也可放进 `tool/` 或 `tools/` 目录，文件名即工具名 [@ref-kilo-code-plugins-tools]。

宿主把模块并入运行时的接缝在 `applyPlugin`：它读取已加载模块的导出，能识别出版本化插件时执行 `hooks.push(await plugin.server(input, load.options))`，即用插件上下文与配置选项调用 `server` 函数，把返回的 hooks 收集起来；否则回退遍历 legacy 的命名导出，逐个调用并同样传入 `options` [@ref-kilo-code-plugins-src-hooks]。因此描述符里的 `server` 函数是插件能力真正进入宿主 hooks 列表的边界。各 hooks 类别（lifecycle、tools、chat、providers 与 auth、experimental）与事件总线的完整清单见插件的 hooks reference，不在本主题来源范围内。

## 生命周期与诊断 {#native_plugins-diagnostics}

可观察的阶段是：**安装**（npm 包缓存进 `packages/` 目录或本地文件就位）→ **加载**（入口模块 import 成功、`server` 被调用产出 hooks）→ **激活**（hooks 进入运行时并按顺序触发）。引擎不匹配的 npm 插件在这一步之前就被跳过（见 [插件包结构与兼容声明](#native_plugins-package)）。

诊断入口是 CLI 日志：加载失败时用 `kilo --print-logs --log-level DEBUG` 查看；加载失败也会作为 session error 出现在 TUI 和 VS Code 扩展 [@ref-kilo-code-plugins-troubleshoot]。

常见现象与定位 [@ref-kilo-code-plugins-troubleshoot]：

- **插件加载失败** —— 用 `--print-logs --log-level DEBUG` 看日志，并留意 session error。
- **加载了但 hooks 从不触发** —— 确认默认导出含 `server`；具名函数导出仅为向后兼容，应视为 legacy。
- **包装好了但某个运行时里不活跃** —— 缺少匹配入口点：server 插件需 `exports["./server"]` 或 `main`，TUI 插件需 `exports["./tui"]` 或有效的 `oc-themes`；只有另一运行时入口的包会被跳过并警告，而不是致命错误。
- **本地插件找不到 npm import** —— 在配置目录补 `package.json` 让 `bun install` 接管。
- **本地能加载、CI 不能** —— 确认没有设置 `KILO_PURE`，并确认 npm 插件已缓存在 XDG 缓存的 `packages/` 下；用 `--log-level DEBUG` 查看安装输出。
- **重置插件缓存** —— 删除 CLI `packages/` 缓存目录下的插件包文件夹（或配置目录里的 `node_modules` 缓存）后重启。
