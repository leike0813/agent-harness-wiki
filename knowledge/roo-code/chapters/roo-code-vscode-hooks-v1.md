---
schema_version: 3
record_kind: production
edition_id: roo-code-vscode-hooks-v1
harness_id: roo-code
topic: hooks
title: "Roo Code 的 Hook 机制判定：固定来源中不存在事件回调，以及三个等价替代机制"
sections:
  - section_id: hooks-scope
    surface_ids: [vscode]
    source_refs: [ref-roo-hooks-code-manifest, ref-roo-hooks-code-settings-keys, ref-roo-hooks-doc-features-index, ref-roo-hooks-doc-experimental]
  - section_id: hooks-adjacent
    surface_ids: [vscode]
    source_refs: [ref-roo-hooks-code-autoapproval, ref-roo-hooks-code-ignore-command, ref-roo-hooks-code-mcp-watchpaths]
  - section_id: hooks-boundaries
    surface_ids: [vscode]
    source_refs: [ref-roo-hooks-code-manifest, ref-roo-hooks-code-settings-keys, ref-roo-hooks-code-ignore-command, ref-roo-hooks-code-autoapproval, ref-roo-hooks-code-experiment-flags]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [vscode]
        section_id: hooks-scope
        status: not_applicable
        source_refs: [ref-roo-hooks-code-manifest, ref-roo-hooks-doc-features-index]
  - question_id: hooks.entry
    answers:
      - surface_ids: [vscode]
        section_id: hooks-scope
        status: not_applicable
        source_refs: [ref-roo-hooks-code-manifest, ref-roo-hooks-code-settings-keys]
  - question_id: hooks.input
    answers:
      - surface_ids: [vscode]
        section_id: hooks-boundaries
        status: not_applicable
        source_refs: [ref-roo-hooks-code-manifest, ref-roo-hooks-code-ignore-command]
  - question_id: hooks.output
    answers:
      - surface_ids: [vscode]
        section_id: hooks-boundaries
        status: not_applicable
        source_refs: [ref-roo-hooks-code-autoapproval]
  - question_id: hooks.order
    answers:
      - surface_ids: [vscode]
        section_id: hooks-boundaries
        status: not_applicable
        source_refs: [ref-roo-hooks-code-settings-keys]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [vscode]
        section_id: hooks-boundaries
        status: not_applicable
        source_refs: [ref-roo-hooks-code-autoapproval, ref-roo-hooks-code-experiment-flags]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: hooks-boundaries
        status: not_applicable
        source_refs: [ref-roo-hooks-code-autoapproval]
---

## 固定来源与结论：这批来源里没有 Hook 机制 {#hooks-scope}

固定来源是官方仓库提交 `b867ec9145750d0ae1ff7f02d35406e9bf2a0b16`（扩展清单 `src/package.json`），本章只描述 `vscode` 界面。

**结论：Roo Code 不提供 Hook（事件回调/生命周期脚本）机制。** 判定依据是四个可直接复核的入口：

1. 扩展清单的 `contributes` 段（`src/package.json` 第 53–405 行）只有 `viewsContainers`、`views`、`commands`、`menus`、`keybindings`、`submenus`、`configuration` 七个首层键，没有任何 hook 类贡献点；扩展也无法注册"在每个工具调用前后执行脚本"的能力。[@ref-roo-hooks-code-manifest]
2. 全局设置 schema（`globalSettingsSchema`）列出的第一方键里没有任何 hook/事件/回调键，只有自动批准、环境信息、检查点、终端、索引、模式等分组。[@ref-roo-hooks-code-settings-keys]
3. 官方文档的功能索引页把全部特性按"代码编辑、AI 增强、工作流、配置、集成、效率"分组列出，其中没有 Hooks 页；实验特性页列出的四项实验能力（自定义工具、后台编辑、图片生成、运行斜杠命令）也不含 Hook。[@ref-roo-hooks-doc-features-index][@ref-roo-hooks-doc-experimental]
4. 在两个技能根目录与项目目录之外，源码里没有任何 hook 配置文件的读取路径：`grep` 全仓库命中 "hook" 的位置全部是 Webview/CLI 的 React hooks（`useInputHistory`、`useToast` 等前端状态封装），与宿主事件无关。[@ref-roo-hooks-code-manifest]

因此本章 7 道题统一记录为"机制不存在"。为了让读者仍然能覆盖同类需求（"在操作前后插入行为"），下一节列出三个**等价替代机制**：批准策略、路径访问校验、文件变化触发的自动重启。

## 最接近的替代机制 {#hooks-adjacent}

**1. 自动批准策略（相当于"操作前的门"）。** Roo Code 没有 Hook 式的 pre-tool 脚本，但有一套集中式决策：`checkAutoApproval` 会针对不同动作类别（只读、写入、MCP、模式切换、子任务、命令执行、追问）返回 `approve` / `deny` / `ask` / `timeout` 四种决定，并读取 `autoApprovalEnabled` 及各类 `alwaysAllow*` 设置、`allowedCommands`/`deniedCommands` 列表。[@ref-roo-hooks-code-autoapproval]

- **触发时点**：每次工具调用需要用户拍板时。
- **输入**：动作类型、工具名与参数、当前设置。
- **输出效果**：批准、拒绝或继续询问；`deny` 是唯一的"阻断"语义。
- **改配置何时生效**：设置存在 globalState，改动经设置界面写入后下一次决策即生效（不需要重载）。
- **边界**：决策只能批准/拒绝，不能改写工具参数或注入额外输出——这是与 Hook 的关键差别。[@ref-roo-hooks-code-autoapproval]

**2. `.rooignore`（相当于"操作前的路径拦截"）。** 项目根 `.rooignore` 由控制器加载并监听变化，`validateAccess(path)` 拦截文件读写，`validateCommand(command)` 进一步拦截会读取文件内容的 shell 命令（`cat`、`grep`、`head`、`Get-Content` 等），返回被拒的路径/命令名；控制器还会把忽略规则注入提示。[@ref-roo-hooks-code-ignore-command]

- **触发时点**：文件访问前、命令执行前。
- **输入/输出**：输入是路径或命令行字符串，输出是"允许/拒绝"以及被拒对象。
- **生效条件**：仅当工作区存在 `.rooignore`；`filterPaths` 出错时选择失败关闭（返回空列表）。[@ref-roo-hooks-code-ignore-command]

**3. 文件变化触发的自动重启（相当于"文件事件 → 动作"）。** 这是固定来源里唯一的"事件驱动执行外部进程"机制：MCP server 的 `watchPaths` 用 chokidar 监视给定文件，命中变化即重启该 server；`项目根/.roo/mcp.json` 与全局 `mcp_settings.json` 被改动时也会重连对应 server。它能表达"某文件变了就执行某动作"，但动作被限定为"重启指定 MCP server"，不能执行任意脚本。[@ref-roo-hooks-code-mcp-watchpaths]

三者合起来的边界：可以约束"能不能做"（批准策略）与"对哪些路径做"（`.rooignore`），可以在文件变化时重启 MCP；但不能在工具调用前后运行自定义代码、不能修改工具入参/结果、也没有统一的事件总线。

## 逐题的口径与残留缺口 {#hooks-boundaries}

对这 7 道固定问题，本章的口径是"不适用"，并说明各自的检查入口：

- **`hooks.events`**：没有第一方事件列表；`contributes` 中没有事件贡献点，设置 schema 中没有事件键。[@ref-roo-hooks-code-manifest][@ref-roo-hooks-code-settings-keys]
- **`hooks.entry`**：没有 hook 配置位置；不存在 hook 目录、hook 字段或 matcher。会话内可写"在某个操作前发生什么"的只有上述批准策略与 `.rooignore`。[@ref-roo-hooks-code-manifest][@ref-roo-hooks-code-ignore-command]
- **`hooks.input`**：没有回调，因此没有输入结构、环境变量或工作目录约定。[@ref-roo-hooks-code-manifest]
- **`hooks.output`**：没有退出码/返回值约定；只有批准决策的 `approve|deny|ask|timeout`。[@ref-roo-hooks-code-autoapproval]
- **`hooks.order`**：没有多 hook 顺序、并发、超时语义；请求超时（`roo-cline.apiRequestTimeout`，默认 600 秒）是 API 层面的，不是 hook 超时。[@ref-roo-hooks-code-settings-keys]
- **`hooks.conditions`**：没有 hook 的启用/信任/沙箱条件；真正影响行为的是自动批准开关与实验特性开关。[@ref-roo-hooks-code-autoapproval][@ref-roo-hooks-code-experiment-flags]
- **`hooks.diagnostics`**：没有"hook 被发现/匹配/执行"的诊断；相关可观察对象是设置页的自动批准开关、MCP 视图的 server 状态与重启按钮。[@ref-roo-hooks-code-autoapproval]

**残留缺口**：以上判断基于固定提交的扩展源码与同提交文档；官方文档站（`https://docs.roocode.com`）是 `apps/docs/docs/` 的发布版本，两者内容一致，因此没有"文档提到但源码找不到"的 Hook 描述。若未来版本引入 Hook，需要重新核对的入口是：`src/package.json` 的 `contributes`、`packages/types/src/global-settings.ts` 的设置键、以及 `src/core/auto-approval/` 是否出现事件分发代码。[@ref-roo-hooks-code-manifest][@ref-roo-hooks-code-settings-keys][@ref-roo-hooks-code-autoapproval]
