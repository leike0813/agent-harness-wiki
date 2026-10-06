---
schema_version: 3
record_kind: production
edition_id: warp-desktop-custom_agents-v2
harness_id: warp
topic: custom_agents
title: "Warp 桌面端的自定义 Agent：Agent Profile 与父/子多代理编排"
sections:
  - section_id: agents-profiles
    surface_ids: [desktop]
    source_refs: [ref-warp-profiles-overview, ref-warp-allsettings-agents, ref-warp-profiles-permissions, ref-warp-profiles-ask, ref-warp-profiles-allowlist, ref-warp-profiles-denylist, ref-warp-models-per-profile, ref-warp-profiles-mcp, ref-warp-profiles-yolo]
  - section_id: agents-orchestration
    surface_ids: [desktop]
    source_refs: [ref-warp-orchestration-model, ref-warp-orchestration-configure, ref-warp-orchestration-where, ref-warp-slash-static, ref-warp-slash-modes-20261006, ref-warp-orchestration-states, ref-warp-orchestration-messaging]
  - section_id: agents-limits
    surface_ids: [desktop]
    source_refs: [ref-warp-orchestration-model, ref-warp-orchestration-configure, ref-warp-orchestration-states, ref-warp-agentnotif-orchestrated]
  - section_id: agents-diagnostics
    surface_ids: [desktop]
    source_refs: [ref-warp-profiles-denylist, ref-warp-orchestration-states, ref-warp-slash-static, ref-warp-agentnotif-inapp, ref-warp-allsettings-agents]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [desktop]
        section_id: agents-profiles
        status: partial
        source_refs: [ref-warp-profiles-overview, ref-warp-allsettings-agents]
  - question_id: agents.format
    answers:
      - surface_ids: [desktop]
        section_id: agents-profiles
        status: partial
        source_refs: [ref-warp-profiles-overview, ref-warp-allsettings-agents]
  - question_id: agents.roles
    answers:
      - surface_ids: [desktop]
        section_id: agents-orchestration
        status: partial
        source_refs: [ref-warp-orchestration-model, ref-warp-orchestration-configure, ref-warp-orchestration-where]
  - question_id: agents.invocation
    answers:
      - surface_ids: [desktop]
        section_id: agents-orchestration
        status: answered
        source_refs: [ref-warp-slash-static, ref-warp-slash-modes-20261006, ref-warp-orchestration-states]
  - question_id: agents.overrides
    answers:
      - surface_ids: [desktop]
        section_id: agents-profiles
        status: answered
        source_refs: [ref-warp-models-per-profile, ref-warp-profiles-mcp, ref-warp-profiles-yolo, ref-warp-profiles-permissions]
  - question_id: agents.limits
    answers:
      - surface_ids: [desktop]
        section_id: agents-limits
        status: partial
        source_refs: [ref-warp-orchestration-model, ref-warp-orchestration-configure, ref-warp-agentnotif-orchestrated]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [desktop]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-warp-profiles-denylist, ref-warp-orchestration-states, ref-warp-slash-static, ref-warp-agentnotif-inapp]
---

## Agent 的定制入口与字段 {#agents-profiles}

固定来源是 Warp 官方文档站 Markdown 快照（Agent Profiles、model choice、orchestration、slash commands、agent notifications 等页）。Warp 是闭源桌面产品，来源为文档快照，本章保持 source-level 与 unknown 版本适用性。

桌面端没有"agent 定义文件"这一类入口：定制 Agent 的方式是 **Agent Profiles**，在 **Settings > Agents > Profiles** 里创建和编辑 [@ref-warp-profiles-overview]。每个用户自带一个 default profile，可随时编辑，新建 profile 会复制它的设置作为起点 [@ref-warp-profiles-overview]。

每个 Profile 可配置的字段（来自「Agent Profiles」小节）[@ref-warp-profiles-overview]：

| 字段 | 含义 |
| :-- | :-- |
| 名称 | Profile 名字 |
| Base model | Agent 的核心模型，处理大部分交互并在需要时调用其他模型；默认也用于 Planning，但可以单独配 planning model |
| 自主性与权限 | 见下一节的分项 |

这套 Profile 集合同时被 Agent Mode 与终端 agent 共用，落在配置文件的对象是 `[agents] execution_profiles`（结构化对象，文档要求通过 UI 管理而非手改），默认值是 `{}`，即 Warp 内置 profile [@ref-warp-allsettings-agents]。

权限分项共六类：Apply code diffs、Read files、Create plans、Execute commands、Interact with running commands（经 Full Terminal Use）、Ask clarifying questions（经 Agent questions）[@ref-warp-profiles-permissions]。每项的自主性等级为 `Agent Decides` / `Always ask` / `Always allow` / `Never`；其中 **Apply code diffs 的 `Agent decides` 当前等同于 `Always ask`**，只有 `Always allow` 才跳过 diff 复核 [@ref-warp-profiles-permissions]。

三个具体子机制：

- **Ask questions**（`Ask questions` 权限的子档位）：`Never ask` 不停下来提问、自行判断继续；`Ask unless auto-approve` 正常对话可提问但 auto-approve 打开时跳过；`Always ask` 即使 auto-approve 打开也能停下来问 [@ref-warp-profiles-ask]。
- **Command allowlist**：默认空列表，命中即免确认执行；文档给出的常见条目是 `which .*`、`ls(\s.*)?`、`grep(\s.*)?`、`find .*`、`echo(\s.*)?` 这类只读命令的正则 [@ref-warp-profiles-allowlist]。
- **Command denylist**：默认包含 `wget`、`curl`、`rm`、`eval` 等风险命令的正则；**denylist 优先于 allowlist 和 `Agent decides`**，命中即弹批准 [@ref-warp-profiles-denylist]。

覆盖关系（overrides）：Profile 决定 base model，而 base model 也是 Planning 默认模型，可在 Profile 内单独指定 planning model [@ref-warp-models-per-profile]；MCP 调用权限同样按 Profile 的 allowlist / denylist / “Agent decides” 生效 [@ref-warp-profiles-mcp]。会话级还有一个绕过路径：`Run until completion`（macOS `⌘+Shift+I`，Windows/Linux `Ctrl+Shift+I`）在当前任务内自动批准一切，**默认也绕过 command denylist**；要保留 denylist，需在 Settings > Agents > Warp Agent > Input 关掉 “Allow auto-approve to bypass command denylist”，而企业通过 Admin Panel 下发的 denylist 永不被绕过 [@ref-warp-profiles-yolo]。

## 主代理、子代理与委派 {#agents-orchestration}

Warp 用**父/子模型**实现多代理：父代理决定要做什么、spawn 子代理、（可选）合并结果；任何代理第一次 spawn 子代理时就成为父代理。子代理有自己的 prompt、环境，可选不同模型或不同 agent runtime，并且**不会再生子代理** [@ref-warp-orchestration-model]。因此原始机制上，父与子**不是同一份定义**：父是当前 Warp Agent 会话，子由父在 spawn 时给定 prompt，模型/harness/执行设置对整个批次生效 [@ref-warp-orchestration-configure]。

运行位置的四种组合（都算同一机制）[@ref-warp-orchestration-where]：

- **local → local**：Warp 应用里的 Warp Agent 会话在本机 spawn 子会话，适合在起云基础设施之前先试编排模式。
- **local → cloud**：本地父代理 spawn 云端子代理，父代理继续工作。
- **cloud → cloud**：云父 spawn 各自环境的云子。
- **cloud → cloud-local**：云父在自身环境里 spawn 子，子共享父的文件系统/进程/会话。

子代理还可以与父使用不同 runtime：默认 Warp Agent 的父可以 spawn 跑 Claude Code 或 Codex 的子，反之亦然 [@ref-warp-orchestration-where]。

调用入口：用户可用斜杠命令 `/orchestrate` 把任务拆成子任务并并行跑多个代理，`/plan` 让 Agent 先产出计划（计划里也可以包含多代理编排）[@ref-warp-slash-static]。这类显式调用入口的适用范围按输入模式划分，文档当前写作 terminal mode 与 Agent Mode（Auto-Detection Mode 不再出现在该表述里）[@ref-warp-slash-modes-20261006]。委派状态的观察点是 Warp 应用内**父代理视图上方的 orchestration pill bar**，每个 pill 显示子代理名字与实时状态徽章 [@ref-warp-orchestration-states]。

子状态集合为 `INPROGRESS`、`SUCCEEDED`、`FAILED`、`BLOCKED`、`ERROR`、`CANCELLED`；父代理通过同一事件流观察，不需要轮询 [@ref-warp-orchestration-states]。代理之间通过服务端持久消息总线通信，每个代理有自己的 inbox（以 agent ID 寻址），消息与状态转换共用一个全局序号，保证父代理不会先看到 `SUCCEEDED` 再看到产生该结果的消息 [@ref-warp-orchestration-messaging]。

`agents.roles` 的边界：桌面上没有用户可写的"子代理定义文件"；需要**带常驻配置的具名代理**时，文档指向 Warp Factories（属于云/平台面，不在本 surface 的范围内），ad hoc 子代理的 prompt 完全来自父代理 [@ref-warp-orchestration-configure]。

## 边界与并发限制 {#agents-limits}


- **嵌套深度**：编排恰好**一层**——一个父加它的直接子；子不会再生子 [@ref-warp-orchestration-model]。
- **批次配置**：模型、harness、执行设置按**批次**应用，不能给同一批里的每个子单独换模型（用 skill 做可复用指令）[@ref-warp-orchestration-configure]。
- **状态可见性**：云子代理在 Oz web app 的父 run 详情里以 **Sub-agents** 标签展示 [@ref-warp-orchestration-states]。
- **通知范围**：app 内通知（toast、通知信箱）只对父会话触发，子会话被排除以避免刷屏；要看单个子代理状态得用 pill bar [@ref-warp-agentnotif-orchestrated]。

并发上限、单次编排可 spawn 的子代理数量、递归防护以外的时长限制，固定来源均未给出数值，按缺口处理 [@ref-warp-orchestration-model]。

## 诊断 {#agents-diagnostics}

- **Profile 生效与否**：在 Settings > Agents > Profiles 直接看/改；会话内用 `/profile` 切换当前 execution profile [@ref-warp-slash-static]。
- **权限被拒绝**：若 Agent 仍频繁要求批准 `curl`、`rm`、`wget`，先查 Settings > Agents > Profiles 里的 command denylist，它是优先级最高的闸门 [@ref-warp-profiles-denylist]。
- **委派失败**：用 orchestration pill bar 逐个看子代理状态，`BLOCKED` 表示在等用户输入（如命令批准），`ERROR`/`FAILED` 表示启动失败或终态失败 [@ref-warp-orchestration-states]。
- **上报材料**：`/copy-debugging-id` 把当前会话的调试信息复制到剪贴板，供反馈问题时附带 [@ref-warp-slash-static]。
- **通知排查**：agent 通知按类型分 Complete / Request / Error，信箱有 All / Unread / Errors 过滤 [@ref-warp-agentnotif-inapp]；桌面通知需要操作系统授权 [@ref-warp-agentnotif-inapp]。

未验证：Profile 的列表上限、profile 之间的继承/合并细节，以及 Profile 配置被企业策略覆盖时的具体行为，固定来源没有描述 [@ref-warp-allsettings-agents]。
