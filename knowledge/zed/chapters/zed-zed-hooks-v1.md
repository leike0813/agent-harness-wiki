---
schema_version: 3
record_kind: production
edition_id: zed-zed-hooks-v1
harness_id: zed
topic: hooks
title: "Zed 的任务钩子：create_worktree 事件、tasks.json 注册与无决策输出"
sections:
  - section_id: hooks-scope-events
    surface_ids: [zed]
    source_refs: [ref-zed-hooks-field, ref-zed-hooks-enum, ref-zed-hooks-doc-hooks, ref-zed-plugins-manifest]
  - section_id: hooks-entry
    surface_ids: [zed]
    source_refs: [ref-zed-hooks-tasks-file, ref-zed-hooks-local-tasks, ref-zed-hooks-doc-hooks, ref-zed-hooks-field, ref-zed-hooks-doc-template]
  - section_id: hooks-input
    surface_ids: [zed]
    source_refs: [ref-zed-hooks-doc-template, ref-zed-hooks-doc-vars, ref-zed-hooks-doc-hooks]
  - section_id: hooks-output-order
    surface_ids: [zed]
    source_refs: [ref-zed-hooks-field, ref-zed-hooks-enum, ref-zed-hooks-doc-hooks, ref-zed-hooks-doc-template]
  - section_id: hooks-conditions-diagnostics
    surface_ids: [zed]
    source_refs: [ref-zed-hooks-tasks-file, ref-zed-hooks-local-tasks, ref-zed-hooks-doc-template]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [zed]
        section_id: hooks-scope-events
        status: answered
        source_refs: [ref-zed-hooks-enum, ref-zed-hooks-doc-hooks]
  - question_id: hooks.entry
    answers:
      - surface_ids: [zed]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-zed-hooks-field, ref-zed-hooks-tasks-file, ref-zed-hooks-local-tasks, ref-zed-hooks-doc-hooks]
  - question_id: hooks.input
    answers:
      - surface_ids: [zed]
        section_id: hooks-input
        status: answered
        source_refs: [ref-zed-hooks-doc-vars, ref-zed-hooks-doc-template]
  - question_id: hooks.output
    answers:
      - surface_ids: [zed]
        section_id: hooks-output-order
        status: not_applicable
        source_refs: [ref-zed-hooks-field, ref-zed-hooks-enum]
  - question_id: hooks.order
    answers:
      - surface_ids: [zed]
        section_id: hooks-output-order
        status: partial
        source_refs: [ref-zed-hooks-field, ref-zed-hooks-doc-hooks, ref-zed-hooks-doc-template]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [zed]
        section_id: hooks-conditions-diagnostics
        status: partial
        source_refs: [ref-zed-hooks-doc-template, ref-zed-hooks-tasks-file]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [zed]
        section_id: hooks-conditions-diagnostics
        status: answered
        source_refs: [ref-zed-hooks-doc-template]
---

本章固定来源：官方仓库提交 `5d80b4e784636899e209cae89626c3be4487e14f` 的 `crates/task/src/task_template.rs` 与 `crates/paths/src/paths.rs`，以及官方文档站的 `docs/tasks.md` 快照。文档快照不含适用软件版本号，本章按来源级知识阅读。

**先给出边界结论**：Zed 目前唯一的第一方 Hook 机制是「任务钩子」——把一条 task 模板挂到某个宿主事件上，事件触发时按普通任务启动它。它不是回调式钩子：没有 stdin 负载、没有退出码决策、不能修改或阻断宿主操作。Agent 生命周期（会话开始/结束、工具调用前后等）没有对应的 hook 面。

## 事件清单与触发时点 {#hooks-scope-events}

task 模板上的 `hooks` 字段类型是一个 `TaskHook` 的 `HashSet`，即一个任务可以登记到多个 hook、同一个 hook 也可以被多个任务登记。[@ref-zed-hooks-field] `TaskHook` 枚举当前只有一个变体：`CreateWorktree`（并接受旧的别名 `create_git_worktree`），serde 使用 snake_case，因此配置里写的字符串是 `create_worktree`。[@ref-zed-hooks-enum]

`create_worktree` 的语义（文档）：Zed 创建新的**链接 Git worktree** 之后运行，触发途径包括 CLI 与 worktree 选择器；任务启动时 `ZED_WORKTREE_ROOT` 指向新建的 worktree、`ZED_MAIN_GIT_WORKTREE` 指向原仓库，因此适合拷贝未跟踪文件（例如 `.env`）或跑每个 worktree 的初始化命令。[@ref-zed-hooks-doc-hooks]

除此之外文档没有列出其它 hook 名；枚举里也确实没有第二个变体，因此「哪些第一方事件存在」的答案就是这一条。[@ref-zed-hooks-enum][@ref-zed-hooks-doc-hooks] 问题里提到的「同名插件事件是否另有来源」在这里不适用：Zed 的扩展系统不提供 hook 注册点，扩展能提供的是语言、主题、片段、调试器、MCP server 等能力，而不是任务事件。[@ref-zed-plugins-manifest]

## 注册位置与作用域 {#hooks-entry}

钩子写在**任务模板**里，而不是单独的 hooks 文件。任务模板的来源有两处：

| 作用域 | 路径 | 说明 |
| :-- | :-- | :-- |
| 全局 | config 目录下的 `tasks.json`（Linux 为 `~/.config/zed/tasks.json`） | 由 `paths::tasks_file()` 给出，对所有项目可用 [@ref-zed-hooks-tasks-file] |
| 项目本地 | worktree 根的 `.zed/tasks.json` | 相对路径常量由 `local_tasks_file_relative_path()` 给出，只在该项目内可用 [@ref-zed-hooks-local-tasks] |

模板字段中与钩子直接相关的是 `hooks`（字符串数组）与任务本来就有的执行字段（`command`、`args`、`env`、`cwd`、`shell`、`reveal`、`hide`、`save`、`tags` 等）。文档说明 hook 任务与手动任务从同一批 `tasks.json` 解析、享有同样的任务字段，并且**同一个 hook 可以登记多个任务，触发时全部运行**；带 `hooks` 的任务仍然出现在任务选择器里，可手动复用同一模板。[@ref-zed-hooks-doc-hooks] 文档给出的完整示例（字段名与模板结构一致）：[@ref-zed-hooks-doc-hooks]

```json
[
  {
    "label": "copy .env into new worktree",
    "command": "cp",
    "args": ["$ZED_MAIN_GIT_WORKTREE/.env", "$ZED_WORKTREE_ROOT/.env"],
    "hooks": ["create_worktree"],
    "reveal": "no_focus",
    "hide": "on_success"
  }
]
```

模板可用变量与优先级由任务机制决定；这里没有 matcher、过滤表达式或只在特定条件下才注册的字段，模板是否携带 hooks 就是唯一的筛选条件。[@ref-zed-hooks-field][@ref-zed-hooks-doc-template]

## 回调输入：环境变量与工作目录 {#hooks-input}

没有回调负载。hook 任务拿到的「输入」就是普通任务的那套东西：任务进程的环境变量、`cwd`、`command`/`args` 以及模板上的 `env` 覆盖。[@ref-zed-hooks-doc-template]

对 `create_worktree` 来说，两个专用变量是输入的关键：`ZED_WORKTREE_ROOT` 指向新建 worktree 的绝对路径，`ZED_MAIN_GIT_WORKTREE` 指向主仓库的工作目录；对普通检出两者相同，对链接 worktree 才有区别。[@ref-zed-hooks-doc-vars] 除此之外任务变量集还包括当前文件/选区/语言相关的一批 `ZED_*` 变量，以及 Git Graph 命令专用的 `ZED_GIT_*`；变量在 `command`、`args`、`cwd`、`label` 里都可用，缺失变量可以用带默认值的写法。[@ref-zed-hooks-doc-vars][@ref-zed-hooks-doc-template]

任务默认在项目根目录启动，`cwd` 可以改写；`env` 会追加到终端环境之上，`shell` 决定用哪个 shell 启动。[@ref-zed-hooks-doc-template]

**敏感内容**：固定来源没有针对 hook 任务的环境变量做额外脱敏说明；凭据应通过任务自己的 `env` 或外部文件传入，示例里给出的 `.env` 拷贝方式即是文档推荐的做法。[@ref-zed-hooks-doc-hooks][@ref-zed-hooks-doc-template]

## 输出与顺序：没有决策通道 {#hooks-output-order}

**输出**：hook 任务就是一条被自动触发的任务，它的 stdout/stderr 进的是任务终端，固定来源里没有任何「读取输出/退出码 → 继续、修改或阻断」的字段或语义；`TaskTemplate` 与 `TaskHook` 都没有决策返回面。[@ref-zed-hooks-field][@ref-zed-hooks-enum] 因此对「输出、退出码、异常或返回值可怎样继续、修改或阻断操作」这一问题，Zed 的答案是**不适用**：钩子只能产生副作用，不能改变宿主已发生的操作。[@ref-zed-hooks-field]

**顺序与并发**：文档确认同一 hook 的多个任务都会运行，但没有给出它们之间的启动顺序、是否并发或失败传播规则；`hooks` 是 `HashSet`，本身不保留配置顺序，因此「谁先跑」在固定来源里没有保证。[@ref-zed-hooks-doc-hooks][@ref-zed-hooks-field] 任务层面的并发约束是可配的：模板的 `allow_concurrent_runs` 默认为 `false`（重复触发同一任务时等待上一次结束），`use_new_terminal` 默认为 `false`（复用同一终端）。[@ref-zed-hooks-doc-template]

超时：固定来源没有给 hook 任务设置超时字段；任务一旦启动就按普通任务的生命周期运行。[@ref-zed-hooks-doc-template]

## 生效条件与诊断 {#hooks-conditions-diagnostics}

**生效条件**：

- 任务模板必须能被解析到——全局 `tasks.json` 或该 worktree 的 `.zed/tasks.json`；后者只在该项目打开时生效，因此同一个 hook 在不同项目里可以有不同的任务集。[@ref-zed-hooks-tasks-file][@ref-zed-hooks-local-tasks]
- 任务模板里带变量的条目在变量缺失时会被过滤掉（例如引用 `ZED_SELECTED_TEXT` 的任务在没有选区时不出现在任务列表里），这是任务机制本身的筛选规则，同样适用于 hook 任务。[@ref-zed-hooks-doc-template]
- 固定来源**没有**说明工作区信任（Restricted Mode）是否阻止本地 `tasks.json` 里的 hook 任务执行；文档把 Restricted Mode 的拦截对象限定为项目设置解析、语言服务器与 MCP server，未提及任务。这一点留作未验证。[@ref-zed-hooks-doc-template]

**诊断**：

- hook 任务和手动任务一样会出现在任务终端里，模板的 `reveal`/`hide`/`show_command`/`show_summary` 决定它在 UI 里的可见程度，因此「有没有跑起来」最直接的证据是终端 pane 与其中打印的命令行。[@ref-zed-hooks-doc-template]
- 任务选择器列出所有已解析的任务（包括带 hooks 的），可以用它确认模板是否被读到、`label` 是否如预期。[@ref-zed-hooks-doc-template]
- 修改 `tasks.json` 后何时生效：固定来源没有给出重载保证，需要重新触发事件或重启才能确证；文档只描述任务本身的解析与运行行为。[@ref-zed-hooks-doc-template]
