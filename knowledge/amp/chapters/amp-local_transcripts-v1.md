---
schema_version: 3
record_kind: production
edition_id: amp-local_transcripts-v1
harness_id: amp
topic: local_transcripts
title: "Amp CLI 的本地 Transcript：thread 记录、事件流与未公开的本机存储"
sections:
  - section_id: transcripts-source-base
    surface_ids: [cli]
    source_refs: [ref-amp-docs-index-pages, ref-amp-manual-intro, ref-amp-cli-update]
  - section_id: transcripts-thread-model
    surface_ids: [cli]
    source_refs:
      [
        ref-amp-pluginapi-context,
        ref-amp-plugins-session-start,
        ref-amp-plugins-events,
        ref-amp-dial-first-message,
        ref-amp-execute-mode,
        ref-amp-plugins-ui-input,
        ref-amp-stream-json-output,
        ref-amp-plugins-subagent,
        ref-amp-cli-accounts,
      ]
  - section_id: transcripts-record-stream
    surface_ids: [cli]
    source_refs:
      [
        ref-amp-stream-json-output,
        ref-amp-pluginapi-context,
        ref-amp-plugins-events,
        ref-amp-execute-mode,
      ]
  - section_id: transcripts-save-and-share
    surface_ids: [cli]
    source_refs: [ref-amp-manual-intro]
  - section_id: transcripts-local-state-boundaries
    surface_ids: [cli]
    source_refs:
      [
        ref-amp-settings-locations,
        ref-amp-plugins-locations,
        ref-amp-settings-keys,
        ref-amp-cli-accounts,
        ref-amp-cli-update,
        ref-amp-stream-json-output,
      ]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-stream
        status: partial
        source_refs: [ref-amp-stream-json-output, ref-amp-plugins-events]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-local-state-boundaries
        status: unknown
        source_refs: [ref-amp-settings-locations, ref-amp-plugins-locations, ref-amp-settings-keys]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-thread-model
        status: partial
        source_refs: [ref-amp-stream-json-output, ref-amp-pluginapi-context, ref-amp-plugins-subagent]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-stream
        status: partial
        source_refs: [ref-amp-stream-json-output, ref-amp-execute-mode]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-stream
        status: partial
        source_refs: [ref-amp-stream-json-output]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-thread-model
        status: partial
        source_refs:
          [
            ref-amp-plugins-session-start,
            ref-amp-plugins-events,
            ref-amp-dial-first-message,
            ref-amp-execute-mode,
            ref-amp-plugins-ui-input,
          ]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-local-state-boundaries
        status: unknown
        source_refs: [ref-amp-settings-locations, ref-amp-plugins-locations]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-save-and-share
        status: partial
        source_refs: [ref-amp-manual-intro]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-local-state-boundaries
        status: unknown
        source_refs: [ref-amp-cli-accounts, ref-amp-settings-locations]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-local-state-boundaries
        status: unknown
        source_refs: [ref-amp-stream-json-output, ref-amp-cli-update, ref-amp-cli-accounts]
---

本章是 Amp 的 `local_transcripts` 首采，只覆盖 catalog 中登记的 CLI 界面。Amp 没有登记仓库来源，固定来源全部是官方文档站快照，而每个文档快照的 `version_applicability` 都是 `unknown`，因此本章描述的是「官方文档如此说明」，不能绑定到任何已安装的 `@ampcode/cli` 版本 [@ref-amp-cli-update]。 Amp 的文档目录页列出了这份文档站的页面集合 [@ref-amp-docs-index-pages]。

一句话结论：**本轮可得的官方文档描述了 thread 的语义与事件流，但没有描述 Amp 在用户机器上如何持久化会话记录。** 下面逐节区分被证实的部分与剩余缺口。

## 证据基础与已查入口 {#transcripts-source-base}

Amp 登记的来源是 20 个官方文档页加 1 个 npm 来源，没有 git 仓库来源。因此本章没有任何源码级证据：`session_id`、thread id 与事件对象的字段名只能按文档里出现过的写法引用，不能当作某个发行包的实现事实。

本轮只有 manual 的原件被归档：`archive/amp/artifact-source-amp-manual-9440684f1673/source.md`，字节 sha256 与本轮 scan 对 `source-amp-manual` 的 observed 值一致。对它做了全文检索（thread、conversation、session、transcript、local、storage、privacy、delete、export、retention、sync、history、sqlite、ampfile 等词），命中全部是界面文案与前端渲染样板注释，没有一条说明会话记录写到哪里、怎么命名、怎么删除 [@ref-amp-manual-intro]。其余 19 个文档来源在本候选与项目 `archive/` 下都没有保留原件，无法逐页全文检索；能读到的只有既有引用已经引用的摘录，这也是下文多条「已查入口」的实际范围。

缺口一律按纪律处理：不写成「不支持」，也不写成「可以安全删除」。

## 记录单位：thread 及其生命周期 {#transcripts-thread-model}

Amp 的会话单位叫 thread。插件 API 的事件上下文是 thread-scoped 的，每个处理函数拿到的 `ctx.thread` 就是当前线程对象 [@ref-amp-pluginapi-context]。

线程会话的开始有明确定义：`session.start` 在 Amp 启动一个 thread session 时触发——用户在**新**线程发出第一条消息，或**打开/切换到已有**线程；同一个 CLI 进程内可以有多个线程同时运行；文档明确写了「没有 `session.end` 事件」 [@ref-amp-plugins-session-start]。回合内的顺序是 `session.start` → `agent.start` → `tool.call` / `tool.result`（每个工具一次）→ `agent.end`，插件事件跟随 thread session 的 agent 生命周期 [@ref-amp-plugins-events]（事件机制本身归 hooks 主题，见 `hooks.events`）。

也就是说：官方事件面只定义了线程的开始与回合序列，**没有**定义关闭、刷盘、回收或落盘时刻的钩子。线程的其它固定语义：

- 模式：线程保留你发第一条消息时选的 mode，之后不能改，要换 mode 就开新线程 [@ref-amp-dial-first-message]；
- 交互式 CLI 线程会记住上次用的 Fast 模式，而 execute 模式与其它非交互式线程创建每次默认 Standard [@ref-amp-execute-mode]；
- 线程的实际创建触发点可从插件示例侧面确认：`ctx.thread` 不存在时提示「No active thread. Send any message to create one」 [@ref-amp-plugins-ui-input]；
- 子代理用 `parentThreadID` 选项把子代理运行挂回调用它的线程，这是文档里唯一的父子线程关联写法（子代理定义本身归 custom_agents 主题，见 `agents.invocation`）[@ref-amp-plugins-subagent]；
- 每个运行中的 CLI 进程固定在它启动时的账号，切换账号需要新开进程 [@ref-amp-cli-accounts]。

**标识与命名。** `--stream-json` 的示例输出里每个事件都带 `session_id`，形如 `T-` 加一个 UUID [@ref-amp-stream-json-output]；插件 API 侧对应字段是 `event.thread.id` [@ref-amp-plugins-session-start]；父子关系用 `parentThreadID` 表达 [@ref-amp-plugins-subagent]。这三处是文档里唯一能证实的线程标识与父子关系。但**没有任何来源说明 thread id 与本机文件名的对应关系**，也没有说明目录布局、时间戳编码或分片规则；`T-` 前缀只出现在 stdout 事件流里，不能据此断言本机记录也这样命名。

## 已文档化的记录形态：--stream-json 事件流 {#transcripts-record-stream}

Amp 唯一有文档的记录形态接口是 `amp --execute "..." --stream-json`，它在 stdout 上逐行输出 JSON 对象 [@ref-amp-stream-json-output]。示例里：

- 第一行是 init 记录，字段有 `type`、`subtype`、`cwd`、`session_id`、`tools`（本次会话可用的工具清单）与 `mcp_servers`（名称与连接状态）；
- 第二行是 user 记录，含 `message.role`、`message.content[].type` / `text`，以及 `parent_tool_use_id`。

由此能证实记录内容包含工作目录、线程/会话 id、可用工具清单、MCP 连接状态、用户消息原文，以及工具调用的父子关联标识——即**消息与工具事件**，而不是输入历史或调试日志。每个用户回合里的工具调用与工具结果也在同一序列上：插件事件跟随 thread session 的 agent 生命周期，顺序是 `session.start` → `agent.start` → `tool.call` / `tool.result` → `agent.end` [@ref-amp-plugins-events]。

边界必须同时写清：**这是进程输出流，不是本机存储。** 文档没有说这些对象会被写进任何文件或数据库，也没有给出写入位置。本节只能支撑记录内容与输出格式，不能支撑落盘位置 [@ref-amp-stream-json-output]。

另一条性质不同的线索在插件上下文里：`logger` 是 scoped logger，插件输出被追加到 handler 的 trace span events [@ref-amp-pluginapi-context]。这说明宿主存在 trace span 这样的运行轨迹容器，但文档没有给出它的存储形式、位置或保留期；按本主题范围（只覆盖会话记录及其存储依赖，不逐项审计日志与遥测）这一点只作为边界记录。

格式层面的确定结论：记录是**逐行 JSON 对象**，不是 JSONL 文件、不是数据库行、不是二进制，文档没有压缩或分片说明；execute 模式在打印最终消息后退出 [@ref-amp-execute-mode]。schema 层面能证实的只有上面两行出现的字段与嵌套结构；字段完整枚举、必填项、版本迁移与落盘后的 schema 都没有来源。

## 线程记录的归属：账号侧，不是本机文件 {#transcripts-save-and-share}

官方手册把 thread 描述为可以保存和分享的交互：「Threads: You can save and share your interactions with Amp.」同一份手册还说 Amp 在各处是同一个 agent、同一批 threads，Web 端无需安装、发一个 thread 就让 Amp 在它的服务器上开一个 orb [@ref-amp-manual-intro]。本轮归档的 manual 原件里这两句的文本逐字存在（`Threads:` 一词在 HTML 形态里被强调标签包住）。

因此能确定的只有两点：thread 是**跨界面可见的账号级交互单位**，其执行发生在 Amp 的服务端；文档从未把它描述成用户机器上的文件。手册提到的 macOS / iOS / iPad 应用用于在任何地方跟进 agent，属于账号侧历史，不是本机记录机制。

**归档与导出的可证实部分到此为止。** 原生归档开关、导出或复制单个 thread 的命令与格式、外部备份依赖哪些必要文件、恢复后在路径与可移植性上的损失，固定来源都没有说明。本节只支持一个区分结论：文档里的「保存与分享」是账号侧能力，不能当作本机归档机制；同理也不能当作「本机没有记录」的证据。

## 本机文件分工与未知的存储位置 {#transcripts-local-state-boundaries}

固定来源里能定位到的**本机路径全部是配置与插件**，没有一条是会话记录 [@ref-amp-settings-locations][@ref-amp-plugins-locations]：

| 本机位置 | 用途 |
| :-- | :-- |
| `~/.config/amp/settings.json` 或 `.jsonc`；Windows 用 `%USERPROFILE%\.config\amp\` | 用户设置 |
| `.amp/settings.json` 或 `.jsonc`，从当前目录向上搜到仓库根 | 工作区设置 |
| `--settings-file PATH` | 自定义用户设置文件 |
| `$XDG_CONFIG_HOME/amp/plugins/`，否则 macOS/Linux `~/.config/amp/plugins/`，Windows `%USERPROFILE%\.config\amp\plugins\` | 系统插件 |
| `.amp/plugins/`（项目根） | 项目插件，随代码走 |

用户设置可加 `"$schema": "https://ampcode.com/cli-settings.schema.json"` 获得校验、描述与补全 [@ref-amp-settings-keys]。已归档摘录里列出的设置键只有 `amp.fuzzy.alwaysIncludePaths` 与 `amp.showCosts`，后者只是「在 CLI 工作时显示 thread 的费用信息」，属于显示开关而不是记录开关 [@ref-amp-settings-keys]。settings schema 本身没有在本轮归档，所以**不能**断言它不含记录或保留类设置键。设置来源与优先级、托管设置等机制归 configuration 主题，见 `config.sources`、`config.defaults`、`config.diagnostics`。

由此得到的四条缺口，逐条写明：

- **位置（`transcripts.location` = unknown）。** 已查入口：manual 原件全文检索、本产品 20 个文档来源的既有引用摘录、settings 与 plugins 两处路径小节。剩余缺口：本机会话记录的目录、文件或数据库路径，以及它是否随操作系统、`XDG_CONFIG_HOME`、`--settings-file` 或项目作用域变化。不要把 `~/.config/amp/` 当作记录位置。
- **数据库（`transcripts.database` = unknown）。** 已查入口同上；没有任何来源提到 SQLite 或其它本地数据库，也没有会话文件与数据库的分工说明，因此恢复所必需的文件、可否重建、如何重建都无法回答。
- **清理（`transcripts.cleanup` = unknown）。** 文档里唯一带删除语义的本地状态入口是账号凭据：`amp logout --all` 删除所有 Amp server 上已保存的 CLI 账号，文档明确说这不影响浏览器或原生 app 会话 [@ref-amp-cli-accounts]。它与 thread 记录无关，不能当作记录清理机制。删除前必须停止哪些写入者、级联删除与孤儿记录的行为都没有来源。**缺少证据不等于可以安全删除 `~/.config/amp/` 或任何其它目录。**
- **诊断（`transcripts.diagnostics` = unknown）。** 已查入口：manual 原件全文检索、streaming-json 页面的 Example Output、`amp version` 与 `amp update` 的版本自证命令 [@ref-amp-cli-update]、账号列表命令 [@ref-amp-cli-accounts]。可证实的记录读取入口只有对**活进程**跑 `--stream-json` [@ref-amp-stream-json-output]；没有任何检查完整性、状态、修复或重建已存记录的官方工具。