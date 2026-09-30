---
schema_version: 3
record_kind: production
edition_id: rovodev-cli-hooks-v1
harness_id: rovodev
topic: hooks
title: "Rovo Dev CLI 的事件钩子：入口、事件与已知缺口"
sections:
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-rovodev-hooks-create, ref-rovodev-commands-interactive, ref-rovodev-hooks-log, ref-rovodev-config-file, ref-rovodev-features-org, ref-rovodev-features-site]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-rovodev-hooks-what, ref-rovodev-hooks-motivation, ref-rovodev-hooks-examples, ref-rovodev-hooks-create, ref-rovodev-hooks-future]
  - section_id: hooks-commands
    surface_ids: [cli]
    source_refs: [ref-rovodev-hooks-create, ref-rovodev-hooks-examples]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-rovodev-hooks-what, ref-rovodev-hooks-future]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-rovodev-hooks-log, ref-rovodev-config-file, ref-rovodev-config-logging, ref-rovodev-commands-interactive, ref-rovodev-help-interactive]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: partial
        source_refs: [ref-rovodev-hooks-what, ref-rovodev-hooks-future]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: partial
        source_refs: [ref-rovodev-hooks-create, ref-rovodev-commands-interactive, ref-rovodev-hooks-log]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: unknown
        source_refs: []
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: unknown
        source_refs: []
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: unknown
        source_refs: []
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: partial
        source_refs: [ref-rovodev-features-org, ref-rovodev-features-site]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-rovodev-hooks-log, ref-rovodev-config-logging, ref-rovodev-commands-interactive]
---

固定来源范围：事件钩子（event hooks）在 Atlassian 官方支持文档中没有独立页面；本章唯一的第一方机制来源是 Atlassian 官方开发者博客《Streamlining your Rovo Dev CLI workflow with event hooks》（www.atlassian.com），辅以支持文档《Rovo Dev CLI commands》《Manage Rovo Dev CLI settings》《Get help in Rovo Dev CLI》《Turn Rovo Dev features on and off》的固定快照。Rovo Dev CLI 为闭源产品，`surface_id: cli`；博客与页面均未标注适用的软件版本，本章为来源级知识，未建立的部分一律标为未知。

已知与未知一览（细节见各小节）：

| 固定问题 | 状态 | 依据 |
| --- | --- | --- |
| `hooks.events` | partial | 事件概念与三个示例时点明确；完整事件名清单未给出 |
| `hooks.entry` | partial | `/hooks` 交互配置与 `eventHooks` 日志明确；YAML 字段与作用域未给出 |
| `hooks.input` | unknown | 无事件负载/环境变量文档 |
| `hooks.output` | unknown | 无退出码/阻断约定；官方称输入输出仍在探索 |
| `hooks.order` | unknown | 无顺序/并发/超时/失败处理文档 |
| `hooks.conditions` | partial | 受组织级与站点级的 Rovo Dev 开关约束 |
| `hooks.diagnostics` | partial | `eventHooks` 日志文件与 `/config` 可查 |

## 配置入口 {#hooks-entry}

事件钩子在交互模式中配置：在 `acli rovodev run` 会话里运行 `/hooks`，选择事件（示例为 `on_tool_permission`），再选 "+ Add new command"，输入要执行的 shell 命令。配置完成后，当 agent 请求工具权限时就会触发该命令。[@ref-rovodev-hooks-create]

官方命令表把 `/hooks` 描述为 "Manage event hook configurations"，即管理事件钩子配置，与 `/config`、`/changelog` 等并列在交互命令的 System 分组中。[@ref-rovodev-commands-interactive]

配置的落点是主配置文件：钩子配置出现在 `eventHooks` 段，其中列出 event hooks 的日志文件路径。主配置文件默认位于 `~/.rovodev/config.yml`，可用 `acli rovodev config` 或交互式 `/config` 打开编辑。[@ref-rovodev-hooks-log][@ref-rovodev-config-file]

固定来源没有给出 `eventHooks` 段的完整 YAML schema、可用字段（超时、启用/禁用、工作目录、环境变量）、作用域（用户级/项目级）、能否纯手工编辑文件，以及事件与命令的匹配规则（matcher）。博客只介绍了交互式配置路径，字段细节需要以运行时的 `/hooks` 界面为准。[@ref-rovodev-hooks-create]

**上层条件**：Rovo Dev 功能必须在组织级与站点级同时开启才能使用，因此钩子也随 CLI 一起受这两个开关约束——组织级需要组织管理员权限（Rovo > Rovo Settings > Rovo Dev），站点级需要 Rovo Dev 的应用管理员权限（Rovo Dev > Settings）。固定来源没有钩子自身的信任、权限或沙箱条件描述。[@ref-rovodev-features-org][@ref-rovodev-features-site]

**与插件事件的区别**：固定来源没有提到任何「插件事件」体系；Rovo Dev CLI 的命令与配置清单中不存在插件机制（详见原生插件章节），因此本主题下的事件全部是宿主自身的生命周期事件。

## 事件与时点 {#hooks-events}

事件是「agent 生命周期中的一个具体时刻」，钩子就是把自定义行为挂到某个事件上；可以用「每当 X（事件）发生，就运行 Y（脚本）」来归纳适用场景。文档举出的时点包括：生成完一次响应之后、遇到错误时、需要用户授权运行某个工具时。[@ref-rovodev-hooks-what]

这三类时点之所以被优先支持，官方说明了动机：用户启动长任务后切到别的窗口、忘记 CLI 仍在运行；agent 看起来在处理中，实际却卡在等待用户授权，导致数分钟没有进展；以及长时间空闲后需要重建整个模型上下文，既慢又贵。事件钩子由此被定位为「通知 + 可自定义扩展」的机制，而不只是桌面通知。[@ref-rovodev-hooks-motivation]

典型用法：agent 请求工具权限时发通知或响声音；agent 完成时跑 linter、构建或测试；每次 agent 出错时打开日志文件。[@ref-rovodev-hooks-examples]

博客写明的已知事件名只有 `on_tool_permission`（快速入门示例中选取的事件）。[@ref-rovodev-hooks-create] 作者同时说明「我们还会增加更多事件」，即当前事件集合不是最终状态。[@ref-rovodev-hooks-future]

因此事件清单的可靠结论是：至少存在「工具权限请求」事件，官方示例还描述了「响应完成」与「出错」两个时点的用法，但**完整事件名列表在固定来源中未给出**，需要在 `/hooks` 界面中查看当前版本支持的事件。

## 命令与示例 {#hooks-commands}

每个事件下可以添加一条或多条 shell 命令（界面操作是 "+ Add new command"）。官方快速入门给出按操作系统播放提示音的示例命令：[@ref-rovodev-hooks-create]

| 系统 | 命令 |
| --- | --- |
| macOS | `afplay /System/Library/Sounds/Bottle.aiff` |
| Linux | `echo -e '\a'` |
| Windows (PowerShell) | `powershell [console]::Beep(1000, 300)` |

命令在宿主环境的 shell 中执行：官方建议先在自己的终端里单独运行该命令确认可行，再交给钩子。典型用途还包括「agent 完成时跑 linter、构建或测试」与「出错时打开日志文件」，说明命令预期是无参数、无返回值的副作用脚本。[@ref-rovodev-hooks-examples]

固定来源没有说明命令由哪个 shell 解释（bash、sh、PowerShell 或系统默认）、超时时间、多条命令是否按顺序执行、命令中是否支持占位符或变量替换，以及是否注入环境变量或工作目录。这部分保持未验证。

## 输入与输出（未建立） {#hooks-io}

固定来源**没有**给出钩子回调的输入约定：没有事件负载 schema、没有传给命令的环境变量清单、没有工作目录保证，也没有敏感内容处理说明；文档只把事件描述为「生命周期中的一个时刻」。[@ref-rovodev-hooks-what]

同样没有输出约定：没有说明退出码、stdout/stderr 或返回值能否继续、修改或阻断 agent 的操作。博客在结尾明确写道，团队「正在探索事件钩子的输入和输出支持」，说明截至该文发布时输入/输出协议尚未提供。[@ref-rovodev-hooks-future]

因此本主题下列问题保持未知：钩子收到什么输入、输出如何影响操作、多个钩子的顺序/并发/超时/失败处理。要确认这些行为需要实测，或等待官方补充文档。

## 诊断 {#hooks-diagnostics}

故障排查顺序（官方快速入门）：先在自己的终端里直接运行该命令，确认命令本身可用；如果命令在终端正常但钩子没触发，用 `/config` 打开配置并查看 `eventHooks` 段列出的 **event hooks 日志文件**，该日志用于定位问题。[@ref-rovodev-hooks-log]

可用的相关入口：`/hooks`（查看与修改事件配置）、`/config`（查看并编辑配置）、`acli rovodev config`（用默认编辑器打开配置文件）。[@ref-rovodev-commands-interactive][@ref-rovodev-config-file] 通用日志位于 `logging.path`（默认 `~/.rovodev/logs/rovodev.log`），但博客指出钩子的问题应优先看 `eventHooks` 段的日志文件。[@ref-rovodev-config-logging]

`/help` 后接查询词也可用于查询具体功能用法。[@ref-rovodev-help-interactive]

**缺口**：固定来源没有给出钩子执行失败的错误码、日志格式、按事件过滤日志的方法，也没有说明修改配置后是否需要重启会话或自动热重载。以上均未验证。
