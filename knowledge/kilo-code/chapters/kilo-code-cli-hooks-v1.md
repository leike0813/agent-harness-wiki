---
schema_version: 3
record_kind: production
edition_id: kilo-code-cli-hooks-v1
harness_id: kilo-code
topic: hooks
title: "Kilo Code CLI — 插件 Hook 事件体系：注册、契约、顺序与生效条件"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-kilo-code-hooks-events, ref-kilo-code-hooks-reference, ref-kilo-code-hooks-tools, ref-kilo-code-hooks-chat, ref-kilo-code-hooks-providers, ref-kilo-code-hooks-experimental, ref-kilo-code-hooks-src-interface, ref-kilo-code-plugins-what]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-config-file, ref-kilo-code-plugins-dir, ref-kilo-code-plugins-order, ref-kilo-code-plugins-types, ref-kilo-code-plugins-tools, ref-kilo-code-plugins-src-hooks, ref-kilo-code-plugins-src-load]
  - section_id: hooks-contract
    surface_ids: [cli]
    source_refs: [ref-kilo-code-hooks-src-interface, ref-kilo-code-hooks-src-plugin, ref-kilo-code-plugins-tools, ref-kilo-code-plugins-what, ref-kilo-code-hooks-tools]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-order, ref-kilo-code-plugins-src-hooks, ref-kilo-code-plugins-src-load, ref-kilo-code-hooks-src-interface]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-src-load, ref-kilo-code-plugins-troubleshoot, ref-kilo-code-plugins-engine]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kilo-code-plugins-troubleshoot, ref-kilo-code-plugins-types]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-kilo-code-hooks-events, ref-kilo-code-hooks-reference, ref-kilo-code-hooks-tools, ref-kilo-code-hooks-chat, ref-kilo-code-hooks-providers, ref-kilo-code-hooks-experimental, ref-kilo-code-hooks-src-interface, ref-kilo-code-plugins-what]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-kilo-code-plugins-config-file, ref-kilo-code-plugins-dir, ref-kilo-code-plugins-order, ref-kilo-code-plugins-types, ref-kilo-code-plugins-tools, ref-kilo-code-plugins-src-hooks, ref-kilo-code-plugins-src-load]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-contract
        status: answered
        source_refs: [ref-kilo-code-hooks-src-interface, ref-kilo-code-hooks-src-plugin, ref-kilo-code-plugins-what]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-contract
        status: answered
        source_refs: [ref-kilo-code-hooks-src-interface, ref-kilo-code-plugins-tools, ref-kilo-code-hooks-tools]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs: [ref-kilo-code-plugins-order, ref-kilo-code-plugins-src-hooks, ref-kilo-code-plugins-src-load, ref-kilo-code-hooks-src-interface]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-kilo-code-plugins-src-load, ref-kilo-code-plugins-troubleshoot, ref-kilo-code-plugins-engine]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-kilo-code-plugins-troubleshoot, ref-kilo-code-plugins-types]
---

本章说明 Kilo Code CLI 的第一方事件机制：即**插件 hook 体系**。Kilo 的插件是启动时加载的 TypeScript/JavaScript 模块，导出一个接收上下文的函数，返回一组 hook；CLI 与 VS Code 扩展共用同一套 hook 定义，但本章只写能定位到 CLI 运行时（`packages/opencode/**`，CLI 是其构建产物）或官方文档页中明确标注 CLI 的机制。固定来源为官方仓库提交 `0b1e01409a2f2255eff7e1c47c6dc894eaed5288` 下的 `packages/kilo-docs/pages/automate/extending/plugins.md` 与 `packages/plugin/src/index.ts`、`packages/opencode/src/plugin/index.ts`。文档给出 hook 清单与用途，源码给出注册、执行顺序与启用条件。

## 第一方事件与 hook 清单 {#hooks-events}

“事件”在这里有两层含义：一层是插件返回对象里的 **hook**（宿主在固定时点调用它），另一层是 `event` hook 收到的**内部总线事件**。每个 hook 都是可选的，插件只返回自己关心的那些[@ref-kilo-code-hooks-reference]。

Lifecycle 组[@ref-kilo-code-hooks-reference]：

| Hook | 触发时点与作用 |
| :-- | :-- |
| `config` | 启动时收到解析完成的完整配置，只读，用于检查 |
| `event` | 内部总线上的**每一个**事件都会触发（见下） |

Tools 组[@ref-kilo-code-hooks-tools]：`tool` 是“工具名 → 工具定义”的映射，加入的工具可被模型调用；`tool.execute.before` 在工具执行前触发，可改 `output.args`；`tool.execute.after` 在工具返回后触发，可改 `output.title`、`output.output`、`output.metadata`；`tool.definition` 在工具定义送给模型前修改 `description` 与 `parameters`。自定义工具用 `tool()` helper 注册，`execute(args, context)` 拿到 `{ sessionID, messageID, agent, directory, worktree, abort, metadata, ask }`[@ref-kilo-code-plugins-tools]。

Chat 组[@ref-kilo-code-hooks-chat]：`chat.message` 在新用户消息到达时触发，可检查或修改 `parts`；`chat.params` 修改 `temperature`、`topP`、`topK`、`maxOutputTokens` 与 provider `options`；`chat.headers` 增删 LLM 请求的 HTTP header；`permission.ask` 自动允许或拒绝权限询问；`command.execute.before` 拦截斜杠命令执行、修改结果 `parts`；`shell.env` 为 Kilo 执行的每条 shell 命令注入环境变量。

Providers & auth 组[@ref-kilo-code-hooks-providers]：`auth` 为 provider 注册认证方式（OAuth 或 API key，带交互提示）；`provider` 动态提供某个 provider 的模型目录，返回“模型 ID → 模型元数据”的映射。

Experimental 组带 `experimental.` 前缀，可能随版本变化[@ref-kilo-code-hooks-experimental]：`experimental.chat.messages.transform`（改写发给模型的完整消息历史）、`experimental.chat.system.transform`（修改 system prompt 数组）、`experimental.session.compacting`（追加 `output.context` 或用 `output.prompt` 整体替换压缩提示）、`experimental.compaction.autocontinue`（关闭压缩后合成“继续”回合）、`experimental.text.complete`（后处理最终文本片段）。

这些名字与签名在 `Hooks` 接口里逐条声明，`tool.execute.before/after`、`chat.params`、`chat.headers`、`permission.ask`、`command.execute.before`、`shell.env`、`tool.definition` 以及四个 `experimental.*` 都是 `(input, output)` 形式的异步函数[@ref-kilo-code-hooks-src-interface]；`dispose`、`event`、`config`、`tool`、`auth`、`provider` 不是这种触发形态，由宿主单独接线。

`event` hook 收到的总线事件按域分类，常见清单[@ref-kilo-code-hooks-events]：Session（`session.created`、`session.updated`、`session.idle`、`session.error`、`session.deleted`、`session.compacted`、`session.diff`、`session.status`）、Message（`message.updated`、`message.removed`、`message.part.updated`、`message.part.removed`）、Tool（`tool.execute.before`、`tool.execute.after`）、Permission（`permission.asked`、`permission.replied`）、File（`file.edited`、`file.watcher.updated`）、Shell（`shell.env`）、Command（`command.executed`）、LSP（`lsp.updated`、`lsp.client.diagnostics`）、Todo（`todo.updated`）、Server（`server.connected`）、Installation（`installation.updated`）。注意 Tool / Shell 这类名字与同名 hook 重名，但它们是总线事件而非 hook。

文档概括了这套 hook 能做的事，作为清单的用途索引[@ref-kilo-code-plugins-what]：加工具、拦截工具调用（改参数、改输出、阻断危险操作）、订阅事件、注册认证 provider、注册模型 provider、改聊天参数或 header、定制压缩、注入 shell 环境变量。

## Hook 的注册入口 {#hooks-entry}

插件来源与来源优先级在文档中列出。配置文件的 `plugin` 数组每项可以是：裸包名（npm `latest`）、`包名@版本`（锁定版本）、`["包名", { options }]`（把 options 作为插件函数第二个参数）、或 `./path/plugin.ts` / `file:///绝对路径` 本地文件（相对配置文件解析）[@ref-kilo-code-plugins-config-file]。`Plugin` 类型就是接收 `(input, options?)`、返回 `Hooks` 的异步函数，配置文件里的 `plugin` 是“字符串或 `[string, PluginOptions]` 元组”的数组；插件必须默认导出一个模块描述符 `{ id, server }`，本地文件插件的 `id` 必填，npm 插件从 `package.json#name` 推断[@ref-kilo-code-hooks-src-plugin]。

示例（依据 config file 小节的确切语法）[@ref-kilo-code-plugins-config-file]：

```json
{
  "$schema": "https://app.kilo.ai/config.json",
  "plugin": [
    "your-plugin@1.2.3",
    ["your-plugin", { "apiKey": "{env:MY_API_KEY}" }],
    "./plugins/local.ts"
  ]
}
```

目录方式：把 `.ts`/`.js` 放进任意配置目录下的 `plugin/` 或 `plugins/` 文件夹——全局 `~/.config/kilo/plugin/`，项目 `.kilo/plugin/` 或旧版 `.kilocode/plugin/`；目录中每个文件启动时自动注册，无需在配置里列出[@ref-kilo-code-plugins-dir]。还有 `kilo plugin NAME` 命令，把包解析后写入对应配置文件的 `plugin` 数组（`--global` 写全局）[@ref-kilo-code-plugins-config-file]。

文档给出的加载顺序[@ref-kilo-code-plugins-order]：1. 内置插件（Kilo Gateway auth、Codex auth、Copilot auth、Cloudflare 等）；2. 全局配置 `plugin` 数组（`~/.config/kilo/kilo.json`）；3. 全局插件目录（`~/.config/kilo/plugin/`）；4. 项目配置 `plugin` 数组（`kilo.json` / `opencode.json`）；5. 项目插件目录（`.kilo/plugin/` 等）。相同包、相同版本会被去重。

源码里内置插件是直接 import 的函数列表（`KiloAuthPlugin`、`AtomicChatPlugin`、`AnacondaDesktopPlugin`、`CodexAuthPlugin`、`CopilotAuthPlugin`、`ModalPlugin`、`GitlabAuthPlugin`、`PoeAuthPlugin`、`CloudflareWorkersAuthPlugin`、`CloudflareAIGatewayAuthPlugin`、`AzureAuthPlugin`、`DigitalOceanAuthPlugin`、`SnowflakeCortexAuthPlugin`、`XaiAuthPlugin`、`CerebrasPlugin`），逐个调用 `plugin(input)` 后把返回的 `Hooks` push 进 `hooks` 数组[@ref-kilo-code-plugins-src-load]。外部插件经 `PluginLoader.loadExternal` 加载后同样 push；`applyPlugin` 先尝试 `readV1Plugin` 读 `{ id, server }` 形态，否则回退到遍历模块命名导出（legacy）[@ref-kilo-code-plugins-src-hooks][@ref-kilo-code-plugins-tools]。

类型支持：本地装 `@kilocode/plugin` 即可拿到 `Plugin`、`tool` 的类型；含 `plugin/` 目录的配置目录会由 Kilo 自动创建 `package.json` 并安装类型包[@ref-kilo-code-plugins-types]。

## Hook 的输入、输出与阻断 {#hooks-contract}

插件函数收到的上下文 `PluginInput` 固定包含[@ref-kilo-code-hooks-src-plugin]：`client`（本地 server 的 SDK 客户端）、`project`（项目元数据）、`directory`（会话工作目录）、`worktree`（git worktree 根）、`experimental_workspace.register(type, adapter)`（注册 workspace 适配器）、`serverUrl`（本地 server URL）、`$`（Bun shell API）。

触发形态的 hook 统一是 `(input, output)` 形式的异步函数：`input` 只读，`output` 由插件原地修改——例如 `tool.execute.before` 的 `input` 是 `{ tool, sessionID, callID }`、`output.args` 可改；`tool.execute.after` 的 `output` 是 `{ title, output, metadata }`；`shell.env` 的 `output.env` 是环境变量表；`chat.params` 的 `output` 含 `temperature`/`topP`/`topK`/`maxOutputTokens`/`options`；`permission.ask` 的 `output.status` 取 `"ask" | "deny" | "allow"`[@ref-kilo-code-hooks-src-interface]。

阻断操作的方式是**抛错**：文档的 `.env` 守卫示例在 `tool.execute.before` 里对需要拦截的调用 `throw new Error(...)`；这也是“拦截工具调用、阻断危险操作”的标准写法[@ref-kilo-code-plugins-tools][@ref-kilo-code-plugins-what]。工具名冲突时自定义工具胜出（会覆盖内置同名工具，可用于给 `bash` 加校验）[@ref-kilo-code-plugins-tools]。

每个 hook 可选；不返回的 hook 不会被调用[@ref-kilo-code-hooks-reference]。`tool`（工具映射）与 `tool.execute.before/after`、`tool.definition` 是两件不同的事：前者注册新工具，后三者拦截或改写已有执行[@ref-kilo-code-hooks-tools]。

## 顺序、并发与失败处理 {#hooks-order}

多个插件按加载顺序串行执行。`Plugin.trigger(name, input, output)` 遍历 `hooks` 数组，跳过没有该 hook 的插件，并对每个实现 `await fn(input, output)`；前一个插件对 `output` 的修改对后一个可见，最终返回累改后的 `output`[@ref-kilo-code-hooks-src-interface]。

加载阶段同样保持顺序：源码注释明确写“Keep plugin execution sequential so hook registration and execution order remains deterministic across plugin runs”，对 `loaded` 里每个插件逐个 `applyPlugin`[@ref-kilo-code-plugins-src-hooks]。文档也确认“Hooks from multiple plugins run sequentially in load order”，且相同包相同版本去重[@ref-kilo-code-plugins-order]。

`event` 的调用是并发 fire-and-forget：监听器对每个 hook 执行 `void hook["event"]?.(...)`，不 await，因此事件回调不阻塞也不保证多个插件间完成顺序[@ref-kilo-code-plugins-src-hooks]。单个插件内部 `event` 按事件到达顺序被调用。

失败处理分层：内置插件或外部插件**加载期**抛错会被捕获、记 `Effect.logError("failed to load internal plugin"/"failed to load plugin")` 并丢弃该插件，不影响其余插件[@ref-kilo-code-plugins-src-load]；外部插件安装/兼容/入口阶段的失败会发布为 session error（`Failed to install plugin …`、`Plugin … skipped: …`、`Failed to load plugin …`）[@ref-kilo-code-plugins-src-hooks]。触发期没有单独的 try/catch 包装，hook 内抛错即向调用方传播（即阻断语义）[@ref-kilo-code-hooks-src-interface]。

生命周期收尾：插件加载完成后会逐个调用 `config` hook（传入完整 `cfg`）；服务销毁时调用每个 hook 的 `dispose`，回调中先取消事件订阅[@ref-kilo-code-plugins-src-hooks]。这些 hook 都有错误日志但不会中止其它 hook。

## 生效条件与开关 {#hooks-conditions}

两个环境变量在 `RuntimeFlags` 中定义（默认 `false`）并在插件加载时参与判断[@ref-kilo-code-plugins-src-load]：

| 变量 | 效果 |
| :-- | :-- |
| `KILO_PURE` | 跳过所有外部插件，只加载内置插件；用于可复现的 CI 或调试 |
| `KILO_DISABLE_DEFAULT_PLUGINS` | 跳过内置插件 |

源码里 `flags.disableDefaultPlugins ? [] : internalPlugins(flags)` 控制内置，`flags.pure ? [] : (cfg.plugin_origins ?? [])` 控制外部[@ref-kilo-code-plugins-src-load]；文档把 `KILO_PURE=1` 描述为“只加载内置插件”[@ref-kilo-code-plugins-order]。

**Engine 兼容**：npm 插件的 `package.json` 可声明 `engines.opencode` 版本范围（示例 `{ "engines": { "opencode": "^7.0.0" } }`）；运行中的 CLI 不满足范围时插件被跳过并给出 warning[@ref-kilo-code-plugins-engine]。

**运行时入口匹配**：server 插件需要 `exports["./server"]` 或 legacy `main`；TUI 插件需要 `exports["./tui"]` 或有效 `oc-themes`。只支持另一种运行时的包会被跳过并给出 warning，而不是致命加载错误[@ref-kilo-code-plugins-troubleshoot]。

**“加载了但 hook 不触发”** 的常见原因是默认导出没带 `server`（正确形态 `export default { id: "my-plugin", server }`）；命名函数导出仅为向后兼容，属于 legacy[@ref-kilo-code-plugins-troubleshoot]。

配置变更的生效时机：插件在启动时加载注册，`plugin` 数组或 `plugin/` 目录的改动需要在下次启动才生效；同一次会话内不再重扫[@ref-kilo-code-plugins-src-load]。

## 诊断 {#hooks-diagnostics}

- **插件加载失败**：用 `kilo --print-logs --log-level DEBUG` 看 CLI 日志；加载失败也会作为 session error 出现在 TUI 和 VS Code 扩展里。带 `--log-level DEBUG` 还能看到安装输出[@ref-kilo-code-plugins-troubleshoot]。
- **插件加载了但 hook 不触发**：确认默认导出含 `server` 字段[@ref-kilo-code-plugins-troubleshoot]。
- **某个运行时里不生效**：核对包的 `exports` 入口是否匹配目标运行时（server 需 `./server` 或 `main`；TUI 需 `./tui` 或 `oc-themes`），不匹配的包被跳过而非报错[@ref-kilo-code-plugins-troubleshoot]。
- **本地插件找不到 npm import**：在配置目录放 `package.json`，Kilo 启动时运行 `bun install` 解析依赖[@ref-kilo-code-plugins-troubleshoot]。
- **开发能加载、CI 不能**：确认 `KILO_PURE` 未被设置，并检查 npm 插件的缓存目录（当前 CLI XDG 缓存目录下的 `packages/`，默认 `~/.cache/opencode/packages/`，设置 `XDG_CACHE_HOME` 时为 `$XDG_CACHE_HOME/opencode/packages/`）[@ref-kilo-code-plugins-troubleshoot]。
- **重置插件缓存**：删除 CLI 的 `packages/` 缓存目录下对应包（或配置目录下的 `node_modules` 缓存）后重启 Kilo[@ref-kilo-code-plugins-troubleshoot]。
- **插件日志**：优先用 `client.app.log({ body: { service, level, message, extra } })` 而不是 `console.log`，让日志进入 Kilo 的日志管线；`level` 可取 `debug`、`info`、`warn`、`error`[@ref-kilo-code-plugins-types]。

改配置或插件文件后需要重新启动 CLI 才能看到新的注册结果；`--print-logs --log-level DEBUG` 是同时观察“是否被发现/解析/加载”和运行期日志的统一入口[@ref-kilo-code-plugins-troubleshoot][@ref-kilo-code-plugins-types]。
