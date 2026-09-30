---
schema_version: 3
record_kind: production
edition_id: replit-agent-web-custom_agents-v1
harness_id: replit-agent
topic: custom_agents
title: "Replit Agent 的 Agent 形态、调用、并发边界与诊断"
sections:
  - section_id: agents-scope
    surface_ids: [web]
    source_refs: [ref-replit-agent-what, ref-replit-genagent-what, ref-replit-modes-choices, ref-replit-plan-what, ref-replit-tasks-what, ref-replit-config-cp-what, ref-replit-index-chat, ref-replit-index-enterprise]
  - section_id: agents-surfaces
    surface_ids: [web]
    source_refs: [ref-replit-agent-what, ref-replit-genagent-what, ref-replit-genagent-access, ref-replit-plan-what, ref-replit-tasks-what, ref-replit-genagent-availability, ref-replit-modes-choices]
  - section_id: agents-invocation
    surface_ids: [web]
    source_refs: [ref-replit-agent-getting-started, ref-replit-plan-approval, ref-replit-tasks-background, ref-replit-modes-auto]
  - section_id: agents-limits-overrides
    surface_ids: [web]
    source_refs: [ref-replit-modes-shared, ref-replit-prov-selector-manual, ref-replit-modes-choices, ref-replit-tasks-availability, ref-replit-tasks-lifecycle-queued, ref-replit-agent-availability]
  - section_id: agents-diagnostics
    surface_ids: [web]
    source_refs: [ref-replit-tasks-background, ref-replit-tasks-lifecycle-archive, ref-replit-config-cp-what, ref-replit-config-cp-finding]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [web]
        section_id: agents-surfaces
        status: not_applicable
        source_refs: [ref-replit-agent-what, ref-replit-genagent-what, ref-replit-genagent-access, ref-replit-plan-what, ref-replit-tasks-what, ref-replit-genagent-availability, ref-replit-modes-choices]
  - question_id: agents.format
    answers:
      - surface_ids: [web]
        section_id: agents-surfaces
        status: not_applicable
        source_refs: [ref-replit-agent-what, ref-replit-genagent-what, ref-replit-genagent-access, ref-replit-plan-what, ref-replit-tasks-what, ref-replit-genagent-availability, ref-replit-modes-choices]
  - question_id: agents.roles
    answers:
      - surface_ids: [web]
        section_id: agents-surfaces
        status: partial
        source_refs: [ref-replit-agent-what, ref-replit-genagent-what, ref-replit-genagent-access, ref-replit-plan-what, ref-replit-tasks-what, ref-replit-genagent-availability, ref-replit-modes-choices]
  - question_id: agents.invocation
    answers:
      - surface_ids: [web]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-replit-agent-getting-started, ref-replit-plan-approval, ref-replit-tasks-background, ref-replit-modes-auto]
  - question_id: agents.overrides
    answers:
      - surface_ids: [web]
        section_id: agents-limits-overrides
        status: partial
        source_refs: [ref-replit-modes-shared, ref-replit-prov-selector-manual, ref-replit-modes-choices, ref-replit-tasks-availability, ref-replit-tasks-lifecycle-queued, ref-replit-agent-availability]
  - question_id: agents.limits
    answers:
      - surface_ids: [web]
        section_id: agents-limits-overrides
        status: partial
        source_refs: [ref-replit-modes-shared, ref-replit-prov-selector-manual, ref-replit-modes-choices, ref-replit-tasks-availability, ref-replit-tasks-lifecycle-queued, ref-replit-agent-availability]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [web]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-replit-tasks-background, ref-replit-tasks-lifecycle-archive, ref-replit-config-cp-what, ref-replit-config-cp-finding]
---

## 固定来源与适用范围 {#agents-scope}

本章固定来源是 Replit 官方文档站的 markdown 快照：Replit Agent 总览
[@ref-replit-agent-what]、General Agent [@ref-replit-genagent-what]、Agent Modes
[@ref-replit-modes-choices]、Plan Mode [@ref-replit-plan-what]、Task system
[@ref-replit-tasks-what]、Checkpoints [@ref-replit-config-cp-what]，以及官方文档索引的
Chat [@ref-replit-index-chat] 与 Enterprise [@ref-replit-index-enterprise] 两节。界面为
`web`，快照未标注软件版本，全章为来源级知识。

先说结论：登记来源中**不存在"用户自定义 Agent"这一机制**——没有 agent
定义文件、定义目录、字段清单或注册入口。Replit 提供的是**固定的几个内置 Agent
形态**与**用户级设置**，再通过 Task system
把工作拆成可隔离执行的后台任务。官方文档索引的 Chat 与 Enterprise 两节列出的可扩展点只有
Skills、MCP、Custom Instructions、Memory、Integrations/Connectors 与模型控制，没有任何
agent 定义页 [@ref-replit-index-chat][@ref-replit-index-enterprise]。

## 内置 Agent 形态（入口与格式） {#agents-surfaces}

**agents.entry**：没有用户可创建的 Agent。可"进入"的形态有：默认的 **Replit Agent**（在
Project Editor 里直接对话，Agent
自己写代码、搭基础设施、测试结果）[@ref-replit-agent-what]；**General
Agent**（不预选产物类型，从对话起步，可生成 CSV/PDF/文档、做研究，再升级为完整
app；入口包括主页选 **General** 后写提示词、打开任意已有项目直接对话、从 GitHub
导入的项目自动获得 General
Agent）[@ref-replit-genagent-what][@ref-replit-genagent-access]；**Plan Mode**（同一个
Agent 的规划模式，开关在聊天输入框右下角，只在构建 Replit App
时可用）[@ref-replit-plan-what]；以及 **background task** 线程（Task system
的一部分）[@ref-replit-tasks-what]。General Agent 面向所有用户可用
[@ref-replit-genagent-availability]。

**agents.format**：不存在定义文件或字段。可配置的不是"Agent
是什么"，而是"用哪个模式"——Free / Power / Max，以及 Enterprise 上单一的 Auto 模式
[@ref-replit-modes-choices]。因此 agents.format 判为
**not_applicable**：没有名称/描述/指令/资源这样的 Agent 定义字段可供解析。

**agents.roles**：主 Agent
与后台任务使用**同一套构建能力**，区别只在执行位置与隔离：主线程是用户描述、修改方向、决定应用哪些改动的对话；后台任务是
Agent 在**项目的隔离副本**里独立工作的独立线程，在你审阅并应用之前不会改动主版本
[@ref-replit-tasks-what]。Task system 自动检测任务间依赖（例如"建仪表盘"依赖"建数据库
schema"），被依赖的任务会等待前置任务完成 [@ref-replit-tasks-what]。此外 General Agent
与标准 Agent 的差别是环境：General Agent 自己搭环境与运行命令，标准 Agent 使用预配置环境
[@ref-replit-genagent-what]。没有"子代理"定义或第三方提供的 agent 实现。

## 调用与委派 {#agents-invocation}

**agents.invocation**：用户是唯一的触发者。起始流程是：在 Project Editor
里直接用自然语言描述要建的东西（可顺带选项目类型），Agent
自动决定设置并开始构建，之后在同一个对话里反复打磨、随时发布
[@ref-replit-agent-getting-started]。Plan Mode 是显式的规划入口：点聊天框里的
**Plan**（或直接要求 Agent 规划），Agent 产出有序任务清单，用户可以 **Revise**
修订、**Cancel** 丢弃、**Build here** 在当前会话实施、或 **Build in background**
作为独立任务运行
[@ref-replit-plan-approval]。接受任务集后，任务在隔离副本中并行/排队执行，完成后由用户
**Apply changes to main version** 或 **Dismiss** [@ref-replit-tasks-background]。Auto
模式下由 Replit 为每个任务挑选模式与已授权的模型，用户也可以在 Power/Max 下手动选模型
[@ref-replit-modes-auto]。**没有**"主 Agent 自动把活派给另一个具名
Agent"的机制；委派对象只有任务线程。

## 每个 Agent 的覆盖项与边界 {#agents-limits-overrides}

**agents.overrides**：文档化的"按 Agent 覆盖"只有两类。其一，Agent
设置是**绑定到人而不是项目**：每个协作者各自持有自己的
Mode（Free/Power/Max）、可选的主模型与 Effort、Plan
Mode、后台任务的自动合并、以及计划自动批准开关；队友切到 Max
不会改变你的设置，你发下一条消息时生效的就是你自己的设置
[@ref-replit-modes-shared]。其二，Core/Pro 用户可以在 Power 或 Max 下从 **Primary
model** 列表手动选模型，Effort 是**按模型**的滑块（Low 到
Max）[@ref-replit-prov-selector-manual]。没有按 Agent 指定工具集、权限、沙箱或 provider
的定义项；模式集合与含义见 [@ref-replit-modes-choices]。

**agents.limits**：并发边界有明确数字——Starter 不支持后台任务，Core 同时 1 个，Pro 最多
10 个，Enterprise 最多 64 个活跃后台任务；达到上限后新任务排队，槽位释放后自动开始
[@ref-replit-tasks-availability][@ref-replit-tasks-lifecycle-queued]。Project Editor 的
Availability 表同样给出 Core = 1、Pro = 10 的活跃后台任务数
[@ref-replit-agent-availability]。缺口：递归/嵌套深度、单任务持续时间上限、上下文边界都没有来源说明。

## 诊断与恢复 {#agents-diagnostics}

**agents.diagnostics**：可观察入口有三处。其一，**线程视图**：每个任务在自己的线程里带实时状态指示，可随时进入该任务的对话；**看板视图**按
Drafts / Active / Ready / Done 四列展示所有任务
[@ref-replit-tasks-background]。其二，任务完成后会展示工作日志、测试结果与改动预览，再决定应用或丢弃
[@ref-replit-tasks-background]。其三，生命周期操作：**Archive** 只适用于还没开始构建的
Draft 规划会话（可恢复，会出现在 Done 列），**Cancel** 适用于已进入构建的
Active/Queued/Ready
任务（不可恢复，工作被丢弃）[@ref-replit-tasks-lifecycle-archive]。恢复层面由
checkpoints 兜底：Agent 在功能完成、重大里程碑、稳定状态、错误修复前自动创建
checkpoint，保存项目文件、AI 对话上下文、环境配置、Agent memory 与数据库内容
[@ref-replit-config-cp-what]；checkpoint 可在 Agent 标签页、History 视图与 Git pane
中查看并回滚 [@ref-replit-config-cp-finding]。缺口：没有"Agent
定义未加载/权限被拒"这类诊断，因为不存在可加载的定义；后台任务的失败重试策略也没有来源说明。
