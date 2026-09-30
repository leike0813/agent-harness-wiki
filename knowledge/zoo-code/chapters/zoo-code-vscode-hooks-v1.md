---
schema_version: 3
record_kind: production
edition_id: zoo-code-vscode-hooks-v1
harness_id: zoo-code
topic: hooks
title: "Zoo Code VS Code 扩展没有 Hook 机制：检查过的入口与相邻替代"
sections:
  - section_id: hooks-events
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-extension-contrib, ref-zoo-code-docs-feature-index, ref-zoo-code-docs-feature-index-experimental, ref-zoo-code-src-experiments, ref-zoo-code-docs-marketplace-items]
  - section_id: hooks-entry
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-mcp-watchpaths, ref-zoo-code-src-mcp-config-schema, ref-zoo-code-docs-auto-approve, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-boomerang-considerations, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-tool-policy, ref-zoo-code-src-mdm, ref-zoo-code-src-extension-contrib, ref-zoo-code-docs-marketplace-items, ref-zoo-code-docs-modes-regex, ref-zoo-code-docs-feature-index]
  - section_id: hooks-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-mcp-init-fetch, ref-zoo-code-src-custom-tools-load, ref-zoo-code-src-mcp-global-watch, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-use-mcp-tool, ref-zoo-code-docs-access-mcp-resource, ref-zoo-code-src-extension-contrib, ref-zoo-code-src-tool-policy, ref-zoo-code-docs-marketplace-items]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [vscode]
        section_id: hooks-events
        status: not_applicable
        source_refs: [ref-zoo-code-src-extension-contrib, ref-zoo-code-docs-feature-index, ref-zoo-code-docs-feature-index-experimental, ref-zoo-code-src-experiments, ref-zoo-code-docs-marketplace-items]
  - question_id: hooks.entry
    answers:
      - surface_ids: [vscode]
        section_id: hooks-entry
        status: not_applicable
        source_refs: [ref-zoo-code-src-mcp-watchpaths, ref-zoo-code-src-mcp-config-schema, ref-zoo-code-docs-auto-approve, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-boomerang-considerations, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-tool-policy, ref-zoo-code-src-mdm, ref-zoo-code-src-extension-contrib, ref-zoo-code-docs-marketplace-items, ref-zoo-code-docs-modes-regex, ref-zoo-code-docs-feature-index]
  - question_id: hooks.input
    answers:
      - surface_ids: [vscode]
        section_id: hooks-entry
        status: not_applicable
        source_refs: [ref-zoo-code-src-mcp-watchpaths, ref-zoo-code-src-mcp-config-schema, ref-zoo-code-docs-auto-approve, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-boomerang-considerations, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-tool-policy, ref-zoo-code-src-mdm, ref-zoo-code-src-extension-contrib, ref-zoo-code-docs-marketplace-items, ref-zoo-code-docs-modes-regex, ref-zoo-code-docs-feature-index]
  - question_id: hooks.output
    answers:
      - surface_ids: [vscode]
        section_id: hooks-entry
        status: not_applicable
        source_refs: [ref-zoo-code-src-mcp-watchpaths, ref-zoo-code-src-mcp-config-schema, ref-zoo-code-docs-auto-approve, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-boomerang-considerations, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-tool-policy, ref-zoo-code-src-mdm, ref-zoo-code-src-extension-contrib, ref-zoo-code-docs-marketplace-items, ref-zoo-code-docs-modes-regex, ref-zoo-code-docs-feature-index]
  - question_id: hooks.order
    answers:
      - surface_ids: [vscode]
        section_id: hooks-entry
        status: not_applicable
        source_refs: [ref-zoo-code-src-mcp-watchpaths, ref-zoo-code-src-mcp-config-schema, ref-zoo-code-docs-auto-approve, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-boomerang-considerations, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-tool-policy, ref-zoo-code-src-mdm, ref-zoo-code-src-extension-contrib, ref-zoo-code-docs-marketplace-items, ref-zoo-code-docs-modes-regex, ref-zoo-code-docs-feature-index]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [vscode]
        section_id: hooks-entry
        status: not_applicable
        source_refs: [ref-zoo-code-src-mcp-watchpaths, ref-zoo-code-src-mcp-config-schema, ref-zoo-code-docs-auto-approve, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-boomerang-considerations, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-tool-policy, ref-zoo-code-src-mdm, ref-zoo-code-src-extension-contrib, ref-zoo-code-docs-marketplace-items, ref-zoo-code-docs-modes-regex, ref-zoo-code-docs-feature-index]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: hooks-diagnostics
        status: not_applicable
        source_refs: [ref-zoo-code-src-mcp-init-fetch, ref-zoo-code-src-custom-tools-load, ref-zoo-code-src-mcp-global-watch, ref-zoo-code-docs-custom-tools, ref-zoo-code-docs-use-mcp-tool, ref-zoo-code-docs-access-mcp-resource, ref-zoo-code-src-extension-contrib, ref-zoo-code-src-tool-policy, ref-zoo-code-docs-marketplace-items]
---

本章回答「Zoo Code 的 Hook 机制」。固定来源是 Zoo-Code 仓库固定 commit `bf3bc781b813a2a6cbdb29dfd7c86f423589090e` 上的扩展清单 `src/package.json`、实验开关 `src/shared/experiments.ts` 与相关实现，以及 Zoo-Code-Docs 仓库固定 commit `dfd2628c31073ec6b111bfedbcd071d197d37ad2` 上的官方功能索引与各机制文档。结论是：**该产品没有 Hook 机制**——既没有第一方事件清单，也没有“注册回调 / 执行外部脚本 / 用返回值决定是否放行”的处理链。以下小节给出检查过的入口、判定依据，以及与 Hook 最接近但仍然不同的机制。

## 是否存在第一方事件 {#hooks-events}

Zoo Code 是 VS Code 扩展，它对外的扩展点全部写在扩展清单 `contributes` 里：`viewsContainers`、`views`、`commands`、`menus`、`keybindings`、`submenus`、`configuration` [@ref-zoo-code-src-extension-contrib]。其中没有任何与“工具调用前后、会话开始/结束、消息发送前后”对应的贡献点，也没有声明可被用户脚本订阅的事件。

- 官方功能索引把产品功能按「代码编辑与导航 / AI 增强 / 工作流 / 配置与定制 / 集成 / 效率工具」分组列全，其中没有 Hook、事件或回调类功能页 [@ref-zoo-code-docs-feature-index]；实验功能同样只列出 Custom Tools、Concurrent File Edits 等条目 [@ref-zoo-code-docs-feature-index-experimental]。
- 实验开关的完整枚举只有五项：`preventFocusDisruption`、`imageGeneration`、`runSlashCommand`、`customTools`、`parallelToolExecution`，没有 Hook 开关 [@ref-zoo-code-src-experiments]。
- 对固定 commit 的 `src/` 与 `packages/types/` 做 hook 关键字检索，命中的都是无关内容（React 开发环境注入、Vitest 的 `hookTimeout`、git 模板参数、代码注释里的 “settle hook”），没有任何事件注册表、回调分发器或脚本执行入口；这段检索是对固定来源的自查，不是来源中的机制说明 [@ref-zoo-code-src-extension-contrib] [@ref-zoo-code-src-experiments]。

因此 `hooks.events` 判定为不适用：产品不提供第一方事件，也不存在“同名插件事件另有来源”的情况——插件体系本身（marketplace 的 mode/MCP 条目、自定义工具）不提供事件订阅 [@ref-zoo-code-docs-marketplace-items]。

## 注册入口、输入输出与顺序 {#hooks-entry}

既然没有事件，也就没有 Hook 的配置入口、matcher、回调输入（stdin/环境变量/工作目录）、退出码语义、顺序与并发控制。以下机制常被误认为 Hook，但它们都是**静态配置或显式调用**，没有“事件 → 回调 → 决定是否放行”的链路：

| 机制 | 触发方式 | 为什么不是 Hook |
| --- | --- | --- |
| MCP server 的 `watchPaths` | 监视指定文件，变化时重启该 server | 动作固定在“重启 server”，不可自定义处理逻辑 [@ref-zoo-code-src-mcp-watchpaths] |
| MCP 的 `disabledTools` / `alwaysAllow` | 静态过滤与预授权 | 配置项决定可见性与是否询问，不执行用户代码 [@ref-zoo-code-src-mcp-config-schema] |
| 自动批准（Auto-Approve） | 用户预设的权限开关 | 只是跳过确认，不注入回调 [@ref-zoo-code-docs-auto-approve] |
| 自定义工具（Custom Tools） | 模型显式调用工具名 | 工具由模型在对话中调用，不由宿主事件触发 [@ref-zoo-code-docs-custom-tools] |
| 子任务创建/完成审批 | 每次委派事件发生时的询问 | 由内置流程决定，用户只能批准或拒绝，无法挂脚本 [@ref-zoo-code-docs-boomerang-considerations] |
| 调试代理（debugProxy） | 打开后所有 API 请求经本地代理转发 | 是网络层旁路，只能观察报文，不能改写行为 [@ref-zoo-code-docs-settings-vscode] |
| 工具抑制（`disabledTools` / 模型 `excludedTools`） | 静态剔除名单里的工具 | 配置决定“不给模型看”，不执行用户代码 [@ref-zoo-code-src-tool-policy] |
| 组织策略（MDM） | 部署侧文件要求登录受管组织 | 宿主启动时读取并校验合规，用户侧无法挂逻辑 [@ref-zoo-code-src-mdm] |

- 内置流程里的“事件点”（例如工具调用请求）由宿主自身消费：需要批准时弹出确认，其余直接执行；没有暴露给用户扩展的中间钩子 [@ref-zoo-code-docs-auto-approve] [@ref-zoo-code-src-extension-contrib]。
- 因此 `hooks.entry`、`hooks.input`、`hooks.output`、`hooks.order`、`hooks.conditions` 均判定为不适用：没有可注册的位置，也就谈不上输入契约、返回值语义、执行顺序或启用条件。需要外部扩展行为时，产品的官方路径是 MCP server（提供工具/资源）或自定义工具（提供本地工具），两者都由模型显式调用 [@ref-zoo-code-docs-marketplace-items] [@ref-zoo-code-docs-custom-tools]。

常见的“想用 Hook 做的事”在本产品里的对应做法（都是配置或显式调用，不是回调）：

| 想要的效果 | 本产品可用的替代 | 来源 |
| --- | --- | --- |
| 危险命令一律拦住 | VS Code 设置里的 `deniedCommands`（始终阻断）与 `allowedCommands`（免确认白名单） | [@ref-zoo-code-docs-settings-vscode] |
| 限制某个模式只能改某些文件 | 模式的 `groups` 里给 `edit` 配 `fileRegex`，越界编辑报 `FileRestrictionError` | [@ref-zoo-code-docs-modes-regex] |
| 在任务里跑项目自定义逻辑 | 自定义工具（模型显式调用），或 MCP server 暴露的工具 | [@ref-zoo-code-docs-custom-tools] |
| 编辑保存后自动格式化 | 无宿主级触发点；只能在指令里要求模型自行运行格式化命令 | [@ref-zoo-code-docs-feature-index] |

这些替代都不能改写宿主自身的操作结果：`deniedCommands` 只是拒绝执行，`fileRegex` 只是拒绝编辑，自定义工具只能被模型调用 [@ref-zoo-code-docs-settings-vscode] [@ref-zoo-code-docs-modes-regex] [@ref-zoo-code-docs-custom-tools]。

## 诊断 {#hooks-diagnostics}

- 没有 Hook 就没有“Hook 是否被发现/匹配/执行/失败”的诊断入口；可观察的相邻信息是 MCP server 的连接状态与工具列表、自定义工具的加载日志（加载失败会打印 `[CustomToolRegistry]` 前缀的错误行）[@ref-zoo-code-src-mcp-init-fetch] [@ref-zoo-code-src-custom-tools-load]。
- 配置修改的生效方式取决于具体机制：MCP 配置文件有文件监视器会即时重连，自定义工具需要显式刷新或重载窗口，变化不是通过 Hook 分发 [@ref-zoo-code-src-mcp-global-watch] [@ref-zoo-code-src-custom-tools-load]。
- 在这些相邻机制里，唯一能执行用户提供的代码的是自定义工具，但它的入口是“模型调用工具”，不是宿主事件；因此即便把自定义工具当作 Hook 使用，也只能在模型主动调用的时机运行，无法拦截宿主自身的工具执行、文件写入或命令运行 [@ref-zoo-code-docs-custom-tools]。
- 同理，MCP server 提供的能力同样以工具与资源的形式暴露给模型，由模型决定何时调用；MCP 侧没有“工具调用前/后必须回调”的协议约定被本产品用于扩展点 [@ref-zoo-code-docs-use-mcp-tool] [@ref-zoo-code-docs-access-mcp-resource]。
- 如果按“配置的 Hook 事件清单 + 匹配规则 + 输入契约 + 退出码语义”这四项来判定，Zoo Code 在固定来源中四项都为空：清单无从枚举，匹配规则无从编写，输入输出契约不存在，放行/阻断语义由内置的自动批准与工具策略独占 [@ref-zoo-code-src-extension-contrib] [@ref-zoo-code-src-tool-policy]。
- 如果维护者需要在 Zoo Code 上实现“工具调用前后执行自定义逻辑”，按本文固定来源，只能走 MCP server 或自定义工具的路径，这两条路径都作用于“模型可见的工具集”，不能拦截或改写宿主自身的操作 [@ref-zoo-code-docs-custom-tools] [@ref-zoo-code-docs-marketplace-items]。这一点属于未提供机制的直接结论，而不是尚未查明的缺口。
