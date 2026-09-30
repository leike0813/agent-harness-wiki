---
schema_version: 3
record_kind: production
edition_id: bolt-web-hooks-v1
harness_id: bolt
topic: hooks
title: "Bolt 的 Hook 边界：不存在第一方事件与回调入口，只有内部 artifact/action 执行链"
sections:
  - section_id: hooks-scope
    surface_ids: [web]
    source_refs: [ref-bolt-repo-package-json, ref-bolt-docs-index-listing, ref-bolt-repo-message-parser-tags, ref-bolt-repo-action-types, ref-bolt-repo-use-message-parser]
  - section_id: hooks-runtime
    surface_ids: [web]
    source_refs: [ref-bolt-repo-message-parser-tags, ref-bolt-repo-use-message-parser, ref-bolt-repo-workbench-actions, ref-bolt-repo-action-runner, ref-bolt-repo-action-runner-shell, ref-bolt-repo-action-types]
  - section_id: hooks-absence
    surface_ids: [web]
    source_refs: [ref-bolt-repo-package-json, ref-bolt-repo-settings-store, ref-bolt-docs-index-listing]
  - section_id: hooks-alternatives
    surface_ids: [web]
    source_refs: [ref-bolt-repo-api-enhancer, ref-bolt-docs-account-addons, ref-bolt-docs-account-dynamic, ref-bolt-repo-logger-level]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [web]
        section_id: hooks-runtime
        status: not_applicable
        source_refs: [ref-bolt-repo-action-types, ref-bolt-repo-use-message-parser, ref-bolt-repo-message-parser-tags]
  - question_id: hooks.entry
    answers:
      - surface_ids: [web]
        section_id: hooks-absence
        status: not_applicable
        source_refs: [ref-bolt-repo-package-json, ref-bolt-repo-settings-store, ref-bolt-docs-index-listing]
  - question_id: hooks.input
    answers:
      - surface_ids: [web]
        section_id: hooks-runtime
        status: not_applicable
        source_refs: [ref-bolt-repo-action-runner, ref-bolt-repo-action-types]
  - question_id: hooks.output
    answers:
      - surface_ids: [web]
        section_id: hooks-runtime
        status: not_applicable
        source_refs: [ref-bolt-repo-action-runner, ref-bolt-repo-action-runner-shell]
  - question_id: hooks.order
    answers:
      - surface_ids: [web]
        section_id: hooks-runtime
        status: not_applicable
        source_refs: [ref-bolt-repo-use-message-parser, ref-bolt-repo-workbench-actions]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [web]
        section_id: hooks-absence
        status: not_applicable
        source_refs: [ref-bolt-repo-package-json, ref-bolt-docs-index-listing]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [web]
        section_id: hooks-alternatives
        status: not_applicable
        source_refs: [ref-bolt-repo-logger-level, ref-bolt-docs-account-addons]
---

## 固定来源与机制边界 {#hooks-scope}

本章的固定来源是官方开源仓库提交 `eda10b121221b30825a4c16eec5da1fd3eb1eb99`（运行时与设置
实现、依赖清单）以及官方帮助站的文档索引 [@ref-bolt-repo-package-json][@ref-bolt-docs-index-listing]。

结论：**Bolt 没有 Hook 机制**。既没有第一方生命周期事件，也没有可供用户或插件注册回调的配置
入口。开源修订里存在的是"模型输出的动作协议"——解析器识别 artifact 与 action，工作台按顺序
执行——它是产品内部的数据流，不是暴露给使用者的钩子 [@ref-bolt-repo-message-parser-tags]。

固定来源里的可复核依据有三条：

1. `package.json` 的依赖与脚本清单里没有任何 hook / lifecycle-callback / 插件宿主相关的包或
   脚本（`dependencies` 与 `devDependencies` 逐项可读）[@ref-bolt-repo-package-json]。
2. 唯一的运行时扩展面是动作执行器：动作类型被定死为 `file` 与 `shell` 两种，执行路径是
   "解析 → 加入队列 → 顺序执行 → 更新状态"，没有插入用户代码的位置
   [@ref-bolt-repo-action-types][@ref-bolt-repo-use-message-parser]。
3. 官方帮助站文档索引列出的全部页面中没有 hooks 页面 [@ref-bolt-docs-index-listing]。

因此本主题 7 道题全部按"机制不存在"记录，理由与检查入口写在下面两节。

## 运行时执行链："事件"的实际形态 {#hooks-runtime}

虽然不存在 Hook，把这条链写清楚有助于读者理解为什么"事件"不能被利用。

- **解析**：浏览器端用 `StreamingMessageParser` 边流边解析模型输出，识别 artifact 与 action
  的开闭标签；每条消息维护自己的解析状态 [@ref-bolt-repo-message-parser-tags]。
- **回调**：解析器暴露四个内部回调 `onArtifactOpen`、`onArtifactClose`、`onActionOpen`、
  `onActionClose`，由 `useMessageParser` 订阅。它们只是前端控制流的接线，不接受用户配置，也不能
  被替换 [@ref-bolt-repo-use-message-parser]。
- **入队与执行**：`WorkbenchStore.addAction` 把动作交给该 artifact 的 `ActionRunner`；
  `runAction` 把执行串接到 `#currentExecutionPromise` 上，保证按顺序执行；每个动作的 `status`
  在 `pending → running → complete | aborted | failed` 之间变化 [@ref-bolt-repo-workbench-actions][@ref-bolt-repo-action-runner]。
- **动作语义**：`shell` 动作在 WebContainer 里 `spawn('jsh', ['-c', content])`，并把
  `npm_config_yes: true` 注入环境；`file` 动作先 `mkdir -p` 再写文件
   [@ref-bolt-repo-action-runner-shell][@ref-bolt-repo-action-types]。

这条链的输入是模型输出文本、输出是对 WebContainer 文件系统与进程的副作用，全程没有"事件订阅
/ 回调注册 / 外部进程"的概念，也没有任何键可以指向用户脚本。

## 用户可注册 Hook 的入口：检查结果 {#hooks-absence}

**hooks.entry**、**hooks.conditions**：固定来源里能配置的东西只有三类，都不构成 Hook 入口
[@ref-bolt-repo-package-json][@ref-bolt-repo-settings-store]：

| 检查过的入口 | 内容 | 是否 Hook |
| :-- | :-- | :-- |
| `app/lib/stores/settings.ts` | 唯一的 settings store 只保存键盘快捷键（`toggleTerminal`）[@ref-bolt-repo-settings-store] | 否 |
| `package.json` | 依赖与脚本中没有 hook 宿主或回调注册 API [@ref-bolt-repo-package-json] | 否 |
| 官方文档全站索引 | 没有 hooks 相关页面 [@ref-bolt-docs-index-listing] | 否 |

因此"启用状态、权限、信任和沙箱怎样影响 Hook 生效"没有可回答的对象：不存在 Hook，也就不存在
影响它生效的条件。产品中确实存在的信任/权限概念（技能导入的安全检查、团队角色、连接器凭据）
属于各自主题，不是 Hook 的条件 [@ref-bolt-docs-index-listing]。

## 与 Hook 最接近的现有能力 {#hooks-alternatives}

读者若需要"Hook 式"的干预能力，固定来源中能对应上的只有下面这些非 Hook 机制：

- **提示增强端点**：`POST /api/enhancer` 把用户输入包进一段改写指令后交给模型，客户端把返回的
  文本填回输入框。它是产品内置的一次改写，不是用户可挂载的钩子 [@ref-bolt-repo-api-enhancer]。
- **账户级加购开关**：**Dynamic reasoning** 与 **Image generation** 是设置页里的开关，影响
  Bolt 的行为，但只对产品自身生效，不能关联到用户脚本 [@ref-bolt-docs-account-addons][@ref-bolt-docs-account-dynamic]。
- **对话级设置**：技能、knowledge、连接器都通过对话与设置面板影响提示内容，作用点在"提示
  构造"，而不是"操作前后的事件" [@ref-bolt-docs-account-dynamic]。

**hooks.diagnostics**：因为没有 Hook，"被发现 / 匹配 / 执行 / 失败"没有对应入口。可用的排障手段
只有通用日志级别 `VITE_LOG_LEVEL`（生产环境不允许调到 trace/debug）
[@ref-bolt-repo-logger-level]，以及设置页里加购开关的开关状态 [@ref-bolt-docs-account-addons]。
