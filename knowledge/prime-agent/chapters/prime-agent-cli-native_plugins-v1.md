---
schema_version: 3
record_kind: production
edition_id: prime-agent-cli-native_plugins-v1
harness_id: prime-agent
topic: native_plugins
title: "Prime Agent CLI 的原生插件：扩展、包格式、安装与加载"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-prime-agent-ext-overview, ref-prime-agent-pkg-creating, ref-prime-agent-pkg-structure]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-prime-agent-ext-code-manifest, ref-prime-agent-pkg-creating, ref-prime-agent-pkg-gallery, ref-prime-agent-pkg-structure, ref-prime-agent-ext-code-resolve, ref-prime-agent-ext-code-discovery, ref-prime-agent-ext-styles, ref-prime-agent-pkg-deps, ref-prime-agent-ex-withdeps-pkg, ref-prime-agent-ext-imports, ref-prime-agent-ext-writing]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-prime-agent-pkg-install, ref-prime-agent-pkg-sources, ref-prime-agent-pm-installpaths, ref-prime-agent-pkg-enable, ref-prime-agent-pm-overrides, ref-prime-agent-pkg-scope, ref-prime-agent-pm-identity]
  - section_id: plugins-discovery-lifecycle
    surface_ids: [cli]
    source_refs: [ref-prime-agent-rl-reload, ref-prime-agent-pm-precedence, ref-prime-agent-ext-runner-conflict, ref-prime-agent-ext-code-errors, ref-prime-agent-pkg-install, ref-prime-agent-ext-code-reload, ref-prime-agent-ext-code-discovery]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-prime-agent-ext-on, ref-prime-agent-ext-registertool, ref-prime-agent-ext-registercommand, ref-prime-agent-ext-registerprovider, ref-prime-agent-ext-types-provider, ref-prime-agent-ext-overview, ref-prime-agent-ext-ctx, ref-prime-agent-ext-state, ref-prime-agent-ext-modes]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-prime-agent-pkgcli-list, ref-prime-agent-diag-main, ref-prime-agent-diag-interactive, ref-prime-agent-diag-snapshot, ref-prime-agent-ext-error, ref-prime-agent-pkg-enable, ref-prime-agent-diag-reload]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-prime-agent-ext-overview, ref-prime-agent-pkg-creating, ref-prime-agent-pkg-structure]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-prime-agent-ext-code-manifest, ref-prime-agent-pkg-creating, ref-prime-agent-pkg-structure, ref-prime-agent-ext-code-resolve, ref-prime-agent-pkg-deps, ref-prime-agent-ex-withdeps-pkg]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-prime-agent-pkg-install, ref-prime-agent-pkg-sources, ref-prime-agent-pkg-enable, ref-prime-agent-pkg-scope, ref-prime-agent-pm-identity]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-lifecycle
        status: answered
        source_refs: [ref-prime-agent-rl-reload, ref-prime-agent-pm-precedence, ref-prime-agent-ext-runner-conflict, ref-prime-agent-ext-code-errors, ref-prime-agent-ext-code-discovery]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-prime-agent-ext-registertool, ref-prime-agent-ext-registercommand, ref-prime-agent-ext-registerprovider, ref-prime-agent-ext-types-provider, ref-prime-agent-ext-ctx, ref-prime-agent-ext-on]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-lifecycle
        status: partial
        source_refs: [ref-prime-agent-pkg-install, ref-prime-agent-ext-code-reload]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-prime-agent-pkgcli-list, ref-prime-agent-diag-main, ref-prime-agent-diag-interactive, ref-prime-agent-ext-error, ref-prime-agent-diag-reload]
---

## 原生插件的定义与边界 {#plugins-model}

Prime Agent 里“原生插件”的名字是**扩展（extension）**：TypeScript 模块，可订阅生命周期事件、注册模型可调用的自定义工具、添加命令与自定义 UI。它与其它机制的关系是[@ref-prime-agent-ext-overview][@ref-prime-agent-pkg-creating]：

| 机制 | 与扩展的关系 |
| :-- | :-- |
| Skill | 同级资源类型，不是插件类型；包可以同时装扩展与技能 |
| Prompt 模板、Theme | 同级资源类型，同一份 `pi` manifest 或约定目录声明 |
| MCP server | **另一套子系统**：只由设置的 `mcpServers` 配置，`pi` manifest 里没有 mcp 键，也不是插件 |
| Hook 脚本 | 没有独立的脚本插件类型；Hook 就是扩展的事件处理器 |
| 普通 npm 包 | 扩展可以通过自己的 `package.json` 与 `node_modules` 引用；要作为可分发的资源包则需要 `pi` manifest 或约定目录 |

分发单位是 **Prime Agent package**：把 extensions、skills、prompt templates、themes 打包，通过 npm 或 git 共享；包用 `package.json` 的 `pi` 键声明资源，也可以只用约定目录。[@ref-prime-agent-pkg-creating][@ref-prime-agent-pkg-structure]

安全边界很直白：扩展以你的完整系统权限运行、可执行任意代码，官方只要求“只从信任的来源安装”。[@ref-prime-agent-ext-overview]

## 包格式、入口与清单 {#plugins-package}

`pi` manifest 的键是固定的四个[@ref-prime-agent-ext-code-manifest][@ref-prime-agent-pkg-creating]：

```json
{
  "name": "my-package",
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["./extensions"],
    "skills": ["./skills"],
    "prompts": ["./prompts"],
    "themes": ["./themes"]
  }
}
```

- 路径相对包根；数组支持 glob 与 `!` 排除；`keywords` 里的 `pi-package` 是发现用标记，可选 `video`/`image` 作为展示素材（同时存在时 video 优先）。[@ref-prime-agent-pkg-gallery]
- 没有 manifest 时按约定目录自动识别：`extensions/` 载入 `.ts`/`.js`、`skills/` 递归找 `SKILL.md` 并载入顶层 `.md`、`prompts/` 载入 `.md`、`themes/` 载入 `.json`；**没有 `agents/` 约定**。[@ref-prime-agent-pkg-structure]
- 扩展入口解析顺序：`package.json` 的 `pi.extensions`（只保留实际存在的路径）→ `index.ts` → `index.js`；单层目录发现规则为 `*.ts|*.js`、`*/index.ts|index.js`、`*/package.json`。[@ref-prime-agent-ext-code-resolve][@ref-prime-agent-ext-code-discovery]

写扩展的三种形态[@ref-prime-agent-ext-styles]：

```
extensions/my-extension.ts                # 单文件
extensions/my-extension/index.ts          # 多文件目录
extensions/my-extension/package.json      # 带依赖的包
```

依赖规则[@ref-prime-agent-pkg-deps][@ref-prime-agent-ex-withdeps-pkg]：

| 位置 | 放什么 |
| :-- | :-- |
| `dependencies` | 运行期第三方依赖；安装包时宿主会跑 `npm install --omit=dev`，所以 `devDependencies` 在运行期不可用 |
| `peerDependencies`（范围写 `"*"`） | 由宿主提供的核心包：`@earendil-works/pi-ai`、`@earendil-works/pi-agent-core`、`@earendil-works/pi-coding-agent`、`@earendil-works/pi-tui`、`typebox`；不要打包它们 |
| `dependencies` + `bundledDependencies` | 其它资源包；通过 `node_modules/` 路径引用其资源，宿主以独立模块根加载，互不串扰 |

TypeScript 不需要预编译：扩展由 jiti 直接加载；扩展内 `import` 的 npm 依赖在扩展目录（或上级目录）跑一次 `npm install` 后即可解析。可导入的包只有上表的核心包、`typebox` 与 Node 内置模块。[@ref-prime-agent-ext-imports][@ref-prime-agent-ext-writing]

## 安装、来源、版本与开关 {#plugins-install}

命令（注意是单数 `package`）[@ref-prime-agent-pkg-install]：

```bash
prime-agent package install npm:@scope/pkg@1.0.0
prime-agent package install git:github.com/user/repo@v1
prime-agent package install /absolute/path/to/package
prime-agent package remove npm:@scope/pkg
prime-agent package list
prime-agent package update [SOURCE]
```

| 维度 | 规则 |
| :-- | :-- |
| 来源 | npm（`npm:NAME[@VERSION]`）、git（`git:HOST/PATH[@REF]`、`https://`、`ssh://`；无 `git:` 前缀时只接受协议 URL）、本地路径（绝对或相对，相对路径按所在设置文件解析） |
| 作用域 | 默认写全局 `~/.prime/agent/settings.json`；`--local` 写项目 `.prime/agent/settings.json`；项目条目可随仓库共享，启动时自动补装缺失的包 |
| 安装位置 | 全局 npm 装在 npm 全局根，项目 npm 在 `.prime/agent/npm/`；git 全局克隆到 `~/.prime/agent/git/HOST/PATH`，项目在 `.prime/agent/git/HOST/PATH`；`-e` 的临时包在系统临时目录 |
| 版本固定 | npm 版本号与 git ref 都会标记为 pinned，`package update` 跳过它们；`package update` 无参数时更新全部未固定包 |
| 临时试用 | `prime-agent -e SOURCE`（可重复）装到临时目录，仅本次运行有效 |
| 启用/停用 | `prime-agent config` 对已解析资源逐个开关，写入 `+PATTERN`/`-PATTERN` 或包的对象式过滤键 |

[@ref-prime-agent-pkg-sources][@ref-prime-agent-pm-installpaths][@ref-prime-agent-pkg-enable][@ref-prime-agent-pm-overrides]

同名包同时出现在全局与项目设置时**项目条目获胜**；包身份按 npm 包名、git 仓库 URL（去掉 ref）、本地路径的绝对解析结果判定。[@ref-prime-agent-pkg-scope][@ref-prime-agent-pm-identity]

## 发现、加载顺序与生命周期状态 {#plugins-discovery-lifecycle}

启动时 `DefaultResourceLoader.reload()` 先重读设置，再解析包与路径，然后加载扩展、运行内联工厂、做冲突检测。解析优先级（数字越小越先，冲突时先到者胜）为：项目+设置 → 项目自动目录 → 用户+设置 → 用户自动目录 → 包 → 内置；同一真实路径只保留第一次出现的条目。[@ref-prime-agent-rl-reload][@ref-prime-agent-pm-precedence]

加载与冲突处理[@ref-prime-agent-ext-runner-conflict][@ref-prime-agent-ext-code-errors]：

- 加载顺序就是上表的解析顺序（数组顺序），逐个路径用 jiti 载入；目录型条目按单层发现规则（`extensions/*.ts|*.js`、`*/index.ts|index.js`、`*/package.json`）先解析出入口；[@ref-prime-agent-ext-code-discovery]
- 工具与命令行标记**同名先注册者胜**；快捷键后注册者胜并给冲突诊断；命令重名全部保留，按加载顺序加数字后缀（形如 `review:1`）；
- 每个路径的失败都收集进 `errors` 数组（`Failed to load extension: ...`、非法工厂 `Extension does not export a valid factory function: ...`），单个扩展失败不影响其它扩展与 agent 运行。

可观察的状态与不可观察的状态[@ref-prime-agent-pkg-install][@ref-prime-agent-ext-code-reload]：

| 状态 | 观察方式 |
| :-- | :-- |
| 已配置/已安装 | `prime-agent package list`（按 User/Project 分组，带 `(filtered)` 与安装路径） |
| 已解析/已启用 | 解析结果里每个资源的 `enabled` 由 `+`/`-`/`!` 模式决定 |
| 已加载 | 资源加载器记录的“本次实际加载路径”清单；`--verbose` 时在交互界面打印 |
| 已激活 | 工具、命令、标记、快捷件、provider 注册完成后即可通过 `pi.getAllTools()` 等观察 |
| 版本与健康 | **没有按扩展追踪的版本或健康状态**：`package list` 不打印 npm 版本，也没有健康检查或状态字段 |

`/reload` 会换一个新 runner：旧扩展实例收到 `session_shutdown`，资源重新加载后重新绑定并收到 `session_start(reason: "reload")`，此前注册的工具/命令随之重建。

## 扩展能注册什么与权限边界 {#plugins-api}

`ExtensionAPI` 的方法面（官方 API 章节与实现类型一致）[@ref-prime-agent-ext-on][@ref-prime-agent-ext-registertool][@ref-prime-agent-ext-registercommand][@ref-prime-agent-ext-registerprovider][@ref-prime-agent-ext-types-provider]：

| 能力 | 入口 |
| :-- | :-- |
| 事件订阅 | `pi.on(event, handler)` |
| 自定义工具 | `pi.registerTool({ name, label, description, parameters, execute, promptSnippet?, promptGuidelines?, renderCall?, renderResult?, terminate? })`；同名可覆盖内置 `ipython`/`bash`/`edit`（TUI 会警告） |
| 命令 | `pi.registerCommand(name, { description, handler })`；命令可带参数与自定义 UI |
| 快捷键/标记 | `pi.registerShortcut(key, ...)`、`pi.registerFlag(name, { type: "boolean" \| "string", default })`，未知命令行标记会进入扩展的 flag 值 |
| Provider | `pi.registerProvider(name, config)`、`pi.unregisterProvider(name)` |
| 消息与状态 | `pi.sendMessage`、`pi.sendUserMessage`、`pi.appendEntry`、`pi.setSessionName`、`pi.setLabel`、`pi.registerMessageRenderer` |
| 工具选择 | `pi.getActiveTools()`、`pi.getAllTools()`、`pi.setActiveTools(names)` |
| 模型与思考 | `pi.setModel(model)`、`pi.getThinkingLevel()`/`pi.setThinkingLevel(level)` |
| 进程 | `pi.exec(command, args, options?)` |
| 扩展间通信 | `pi.events`（事件总线） |
| UI | `ctx.ui` 的 `select`/`confirm`/`input`/`editor`/`notify`/`setStatus`/`setWidget`/`setFooter`/`setHeader`/`custom()` 等 |

权限与宿主 API 边界[@ref-prime-agent-ext-overview][@ref-prime-agent-ext-ctx]：

- **没有权限模型**：没有签名校验、能力清单或按扩展授权；扩展与宿主同进程，拿到的是完整 Node 与 TUI API；
- 唯一的收缩手段是运行参数：`--tools` 白名单、`--no-builtin-tools`（去掉内置工具，保留扩展与自定义工具）、`--no-extensions` 关闭发现；
- 非交互模式下 UI 方法是空操作（`ctx.hasUI` 为假），扩展仍加载运行；
- 状态应当存进工具结果 `details` 并通过 `session_start` 从分支重建，这样才能正确配合会话分支与恢复。[@ref-prime-agent-ext-state][@ref-prime-agent-ext-modes]

## 诊断 {#plugins-diagnostics}

- **清单**：`prime-agent package list` 输出 `User packages:` / `Project packages:` 两段，每行是来源串，对象式过滤的条目带 `(filtered)`，存在安装路径时以暗色附在下一行；没有包时打印 `No packages installed.`。[@ref-prime-agent-pkgcli-list]
- **加载错误与冲突**：启动诊断里形如 `Failed to load extension "PATH": ERROR`，交互模式在 `[Extension errors]`/`[Extension conflicts]` 头部下集中打印；`--verbose` 强制显示已加载资源清单；daemon/agent 会话快照同样带扩展清单与诊断。[@ref-prime-agent-diag-main][@ref-prime-agent-diag-interactive][@ref-prime-agent-diag-snapshot]
- **运行期错误**：经错误边界转到聊天错误行（`Extension "PATH" error: ...`），agent 继续；`tool_call` 抛错会阻断该工具。[@ref-prime-agent-ext-error]
- **版本与状态查询**：固定来源没有提供按插件查询版本或运行状态的命令——`package list` 不打印版本，也没有健康/状态字段；`prime-agent config` 用于开关资源，`/reload` 用于让改动生效（设置文件无监听）。日志写在 `~/.prime/agent/logs/` 与 agent 目录下的调试日志里。[@ref-prime-agent-pkg-enable][@ref-prime-agent-diag-reload]
