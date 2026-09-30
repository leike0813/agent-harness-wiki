---
schema_version: 3
record_kind: production
edition_id: bolt-web-custom_agents-v1
harness_id: bolt
topic: custom_agents
title: "Bolt 的 Agent：内置 Standard/Max/Forge、单一主 Agent 运行链与选择/默认值/限制"
sections:
  - section_id: agents-scope
    surface_ids: [web]
    source_refs: [ref-bolt-repo-system-prompt, ref-bolt-docs-index-listing]
  - section_id: agents-builtin-selection
    surface_ids: [web]
    source_refs: [ref-bolt-docs-agents-list, ref-bolt-docs-agents-switch, ref-bolt-docs-agents-switch-home, ref-bolt-docs-agents-switch-project, ref-bolt-docs-account-default-agent, ref-bolt-docs-forge-what, ref-bolt-docs-account-addons, ref-bolt-docs-agents-standard, ref-bolt-docs-agents-max, ref-bolt-docs-forge-get, ref-bolt-docs-account-dynamic]
  - section_id: agents-runtime
    surface_ids: [web]
    source_refs: [ref-bolt-repo-stream-text, ref-bolt-repo-system-prompt, ref-bolt-repo-api-chat, ref-bolt-repo-message-parser-tags, ref-bolt-repo-action-types, ref-bolt-repo-use-message-parser, ref-bolt-repo-chat-send, ref-bolt-repo-continue-prompt]
  - section_id: agents-limits
    surface_ids: [web]
    source_refs: [ref-bolt-repo-llm-constants, ref-bolt-docs-chat-queue, ref-bolt-docs-chat-queue-pause, ref-bolt-docs-llms-context, ref-bolt-docs-plan-mode-features, ref-bolt-repo-message-parser-tags]
  - section_id: agents-diagnostics
    surface_ids: [web]
    source_refs: [ref-bolt-docs-agents-switch, ref-bolt-docs-account-default-agent, ref-bolt-docs-forge-what, ref-bolt-docs-project-agent, ref-bolt-repo-logger-level]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [web]
        section_id: agents-builtin-selection
        status: not_applicable
        source_refs: [ref-bolt-docs-agents-list, ref-bolt-docs-forge-what]
  - question_id: agents.format
    answers:
      - surface_ids: [web]
        section_id: agents-builtin-selection
        status: not_applicable
        source_refs: [ref-bolt-docs-agents-list]
  - question_id: agents.roles
    answers:
      - surface_ids: [web]
        section_id: agents-runtime
        status: partial
        source_refs: [ref-bolt-repo-system-prompt, ref-bolt-repo-stream-text, ref-bolt-repo-message-parser-tags]
  - question_id: agents.invocation
    answers:
      - surface_ids: [web]
        section_id: agents-builtin-selection
        status: answered
        source_refs: [ref-bolt-docs-agents-switch, ref-bolt-docs-agents-switch-home, ref-bolt-docs-agents-switch-project, ref-bolt-docs-account-default-agent]
  - question_id: agents.overrides
    answers:
      - surface_ids: [web]
        section_id: agents-builtin-selection
        status: not_applicable
        source_refs: [ref-bolt-docs-agents-list, ref-bolt-docs-account-addons, ref-bolt-docs-account-dynamic]
  - question_id: agents.limits
    answers:
      - surface_ids: [web]
        section_id: agents-limits
        status: partial
        source_refs: [ref-bolt-repo-llm-constants, ref-bolt-docs-chat-queue, ref-bolt-docs-chat-queue-pause, ref-bolt-docs-llms-context]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [web]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-bolt-docs-agents-switch, ref-bolt-docs-account-default-agent, ref-bolt-docs-forge-what, ref-bolt-docs-project-agent]
---

## 固定来源与范围 {#agents-scope}

本章的固定来源有两组：托管产品的帮助文档（Agent 选择、Forge、账户设置、项目设置）与开源仓库
提交 `eda10b121221b30825a4c16eec5da1fd3eb1eb99` 的模型/提示/流式输出实现
[@ref-bolt-repo-system-prompt]。官方文档索引把相关页面列为 "Choose an agent" 与
"Bolt Forge" [@ref-bolt-docs-index-listing]。

结论先写清楚：**Bolt 没有"自定义 Agent"这个概念**。托管产品提供的是若干内置 Agent（Standard、
Max，以及研究预览期的 Forge），用户只能在选择器里挑一个；开源修订里则只有一个硬编码的系统
提示与一条"解析 artifact、执行 action"的运行链，没有任何 Agent 定义文件、注册表或加载器。因此
本主题多数问题按"机制不存在"或"部分"记录，并把内置 Agent 的实际行为写在下面几节。

## 内置 Agent 与选择 {#agents-builtin-selection}

**agents.entry**：内置 Agent 由产品预置，不需要也不能由用户定义。文档列出的 Agent 是 Standard
与 Max，二者的说明是 "powered by large language models"，用户选择 Agent、Bolt 在后台处理模型
选择 [@ref-bolt-docs-agents-list]。两个 Agent 的定位是产品说明的一部分：Standard 面向日常开发，
快、省 token，适合明确的任务；Max 为复杂任务做更深推理，适合大型代码库、相互耦合的功能与重构
[@ref-bolt-docs-agents-standard][@ref-bolt-docs-agents-max]。可选的第三个 Agent 是 **Bolt
Forge**，它出现在同一个选择器里，只在有权限时可用，否则显示为锁定状态
[@ref-bolt-docs-agents-list][@ref-bolt-docs-forge-what]。Forge 的获取方式是企业文档给出的：
个人 Pro 计划自带，或通过 Bolt Lite 的等待名单领取；团队与企业计划不提供
[@ref-bolt-docs-forge-get]。

**agents.format**：不存在 Agent 定义文件或配置格式——没有名称/描述/指令字段，也没有把指令包
解析成 Agent 的入口；选择器里的条目是产品内置的固定集合 [@ref-bolt-docs-agents-list]。

**agents.invocation**：切换入口有两处，外加一个默认值 [@ref-bolt-docs-agents-switch][@ref-bolt-docs-agents-switch-home][@ref-bolt-docs-agents-switch-project]：

| 入口 | 作用 |
| :-- | :-- |
| 首页聊天框底部的下拉选择器 | 开始一次构建前选定 Agent [@ref-bolt-docs-agents-switch-home] |
| 项目内聊天框左下角的当前 Agent 名 | 在项目中切换 [@ref-bolt-docs-agents-switch-project] |
| 账户设置 → General → **Default agent** | 设默认值，只影响新项目，默认 `Standard` [@ref-bolt-docs-account-default-agent] |

项目会记住所选 Agent，下次打开同一项目自动沿用；默认值不覆盖已有项目
[@ref-bolt-docs-agents-switch][@ref-bolt-docs-account-default-agent]。计划模式下也有独立的聊天
模式（见"边界与限制"一节）。调用是用户显式发起的：没有"主代理自动委派给另一个 Agent"的选择
规则。

**agents.overrides**：用户不能为某个 Agent 指定模型、provider、工具、权限或沙箱；文档明确说
模型选择由 Bolt 在后台完成，因此换 Agent 是唯一的调节手段 [@ref-bolt-docs-agents-list]。账户级
还有两个影响行为的加购开关，但它们不是 Agent 级配置：**Dynamic reasoning**（默认关，对复杂提示
启用更深推理、消耗更多 token）与 **Image generation**（默认关，允许在对话里生成图片）
[@ref-bolt-docs-account-addons][@ref-bolt-docs-account-dynamic]。

## 单 Agent 的运行链：系统提示与动作协议 {#agents-runtime}

**agents.roles**：固定来源中只有"一个主 Agent 处理一次提示"这一种角色。开源修订把这条链写死在
服务端与浏览器两侧：

1. `streamText` 用 `getAnthropicModel(...)` 取模型、把 `getSystemPrompt()` 作为 `system`
   传入，并带上 `maxTokens` 与一个 `anthropic-beta` 头 [@ref-bolt-repo-stream-text]。
2. 系统提示声明"You are Bolt, an expert AI assistant…"，随后给出 WebContainer 约束、代码缩进、
   可用的 HTML 元素、diff 规范、artifact 指令与示例；artifact 的标识符与动作类型都写在这段
   提示里 [@ref-bolt-repo-system-prompt]。
3. 服务端收到回复后把文本流回客户端；客户端用流式解析器识别 artifact 与 action，再交给
   `WorkbenchStore` 执行 [@ref-bolt-repo-api-chat][@ref-bolt-repo-message-parser-tags]。
4. 动作类型只有两种：`file` 与 `shell`；文件动作写文件、shell 动作在 WebContainer 里起进程
   [@ref-bolt-repo-action-types][@ref-bolt-repo-use-message-parser]。

没有子代理、没有 Agent 委派、没有原生/扩展两套实现的区分；固定来源里也不存在任何"Agent 角色"
字段 [@ref-bolt-repo-system-prompt][@ref-bolt-repo-message-parser-tags]。

用户侧与这条链的接口是"用户改动回灌"：发送提示前先把未保存文件写盘，收集文件改动并转成
文件修改区块，前缀拼进这一轮用户消息；发完后清空改动记录，让模型以最新内容为准
[@ref-bolt-repo-chat-send]。单轮输出被 token 上限截断时，服务端会追加 `CONTINUE_PROMPT` 并要求
模型从中断处继续，最多续写 `MAX_RESPONSE_SEGMENTS` 次 [@ref-bolt-repo-continue-prompt]。

## 边界与限制 {#agents-limits}

**agents.limits**：固定来源能确认的限制有四类：

| 限制 | 数值/行为 | 来源 |
| :-- | :-- | :-- |
| 单轮输出 token | 仓库常量 `MAX_TOKENS = 8192`，截断后最多续写 2 段 | [@ref-bolt-repo-llm-constants] |
| 提示排队 | 可排队最多 20 条，聊天里同时显示前 5 条；可暂停队列 | [@ref-bolt-docs-chat-queue][@ref-bolt-docs-chat-queue-pause] |
| 上下文 | 文档把 context 描述成"短期记忆"（近期对话 + 代码与改动的理解），会随使用增长但不是无限 | [@ref-bolt-docs-llms-context] |
| 计划模式 | Plan Mode 下的讨论消息也带项目代码库上下文，并可联网检索 | [@ref-bolt-docs-plan-mode-features] |

没有"并发子 Agent""递归委派""嵌套深度"这类参数，因为不存在子 Agent
[@ref-bolt-repo-message-parser-tags]。队列暂停时 Bolt 会跑完当前提示再停，新提示追加到队尾，
没有绕过队列的入口 [@ref-bolt-docs-chat-queue-pause]。计划模式与构建模式是同一个 Agent 的两种
聊天模式，不是两个 Agent [@ref-bolt-docs-plan-mode-features]。

## 诊断 {#agents-diagnostics}

**agents.diagnostics**：可以确认"当前用哪个 Agent"的入口有三处 [@ref-bolt-docs-agents-switch][@ref-bolt-docs-account-default-agent][@ref-bolt-docs-forge-what]：

- 项目聊天框左下角显示当前 Agent 名，点开即选择器；
- 账户设置 → General → **Default agent** 显示新项目的默认值；
- 项目设置 → General → **Project agent** 说明"所有项目都使用 Bolt Agent，可在聊天框切换
  Standard 与 Max" [@ref-bolt-docs-project-agent]。

Forge 不可见或显示锁定时，文档给出的原因是：不属于个人 Pro 计划、或尚未从等待名单领取 Lite 席位
[@ref-bolt-docs-forge-what]。开源修订侧的诊断手段是日志级别：`VITE_LOG_LEVEL` 决定初始日志级别
（生产环境不允许调到 trace/debug）[@ref-bolt-repo-logger-level]。

**缺口**：固定来源没有提供"查看本次请求实际使用的模型版本""查看 Agent 内部工具调用"或"排查
委派失败"的入口——因为不存在委派；这一点只能由"无子 Agent 机制"这一事实回答，而不是由某个
诊断页面回答。
