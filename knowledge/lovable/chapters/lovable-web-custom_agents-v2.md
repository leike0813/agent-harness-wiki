---
schema_version: 3
record_kind: production
edition_id: lovable-web-custom_agents-v2
harness_id: lovable
topic: custom_agents
title: "Lovable Web 的 Agent 角色：模式、子代理、Goal 与可定制边界"
sections:
  - section_id: agents-entry
    surface_ids: [web]
    source_refs: [ref-lovable-subagents-how, ref-lovable-knowledge-intro, ref-lovable-skills-custom-builtin, ref-lovable-chatmode-overview, ref-lovable-planmode-overview, ref-lovable-buildmode-overview, ref-lovable-knowledge-faq]
  - section_id: agents-format
    surface_ids: [web]
    source_refs: [ref-lovable-skills-anatomy, ref-lovable-skills-bundled, ref-lovable-knowledge-workspace, ref-lovable-knowledge-project, ref-lovable-knowledge-faq]
  - section_id: agents-roles
    surface_ids: [web]
    source_refs: [ref-lovable-buildmode-overview, ref-lovable-subagents-types, ref-lovable-goal-buildmode, ref-lovable-buildmode-use, ref-lovable-subagents-how, ref-lovable-goal-set, ref-lovable-chatmode-overview]
  - section_id: agents-invocation
    surface_ids: [web]
    source_refs: [ref-lovable-chatmode-context, ref-lovable-goal-set, ref-lovable-skills-invoke, ref-lovable-chatmode-overview, ref-lovable-subagents-prompting, ref-lovable-subagents-faq, ref-lovable-subagents-how, ref-lovable-goal-buildmode, ref-lovable-planmode-pricing, ref-lovable-chatmode-limits, ref-lovable-chatmode-pricing, ref-lovable-goal-cost, ref-lovable-goal-how]
  - section_id: agents-overrides-limits
    surface_ids: [web]
    source_refs: [ref-lovable-subagents-how, ref-lovable-subagents-faq, ref-lovable-priv-data, ref-lovable-subagents-types, ref-lovable-ai-models, ref-lovable-appconn-approve, ref-lovable-buildmode-duration, ref-lovable-knowledge-workspace]
  - section_id: agents-diagnostics
    surface_ids: [web]
    source_refs: [ref-lovable-subagents-how, ref-lovable-buildmode-visibility, ref-lovable-subagents-faq]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [web]
        section_id: agents-entry
        status: partial
        source_refs: [ref-lovable-subagents-how, ref-lovable-knowledge-intro, ref-lovable-skills-custom-builtin, ref-lovable-chatmode-overview, ref-lovable-planmode-overview, ref-lovable-buildmode-overview, ref-lovable-knowledge-faq]
  - question_id: agents.format
    answers:
      - surface_ids: [web]
        section_id: agents-format
        status: not_applicable
        source_refs: [ref-lovable-skills-anatomy, ref-lovable-skills-bundled, ref-lovable-knowledge-workspace, ref-lovable-knowledge-project, ref-lovable-knowledge-faq]
  - question_id: agents.roles
    answers:
      - surface_ids: [web]
        section_id: agents-roles
        status: answered
        source_refs: [ref-lovable-buildmode-overview, ref-lovable-subagents-types, ref-lovable-goal-buildmode, ref-lovable-buildmode-use, ref-lovable-subagents-how, ref-lovable-goal-set, ref-lovable-chatmode-overview]
  - question_id: agents.invocation
    answers:
      - surface_ids: [web]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-lovable-chatmode-context, ref-lovable-goal-set, ref-lovable-skills-invoke, ref-lovable-chatmode-overview, ref-lovable-subagents-prompting, ref-lovable-subagents-faq, ref-lovable-subagents-how, ref-lovable-goal-buildmode, ref-lovable-planmode-pricing, ref-lovable-chatmode-limits, ref-lovable-chatmode-pricing, ref-lovable-goal-cost, ref-lovable-goal-how]
  - question_id: agents.overrides
    answers:
      - surface_ids: [web]
        section_id: agents-overrides-limits
        status: not_applicable
        source_refs: [ref-lovable-subagents-how, ref-lovable-subagents-faq, ref-lovable-priv-data, ref-lovable-subagents-types, ref-lovable-ai-models, ref-lovable-appconn-approve, ref-lovable-buildmode-duration, ref-lovable-knowledge-workspace]
  - question_id: agents.limits
    answers:
      - surface_ids: [web]
        section_id: agents-overrides-limits
        status: partial
        source_refs: [ref-lovable-subagents-how, ref-lovable-subagents-faq, ref-lovable-priv-data, ref-lovable-subagents-types, ref-lovable-ai-models, ref-lovable-appconn-approve, ref-lovable-buildmode-duration, ref-lovable-knowledge-workspace]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [web]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-lovable-subagents-how, ref-lovable-buildmode-visibility, ref-lovable-subagents-faq]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 是否存在自定义 Agent 的定义入口 {#agents-entry}

**结论：Lovable 没有可让用户定义"自定义 Agent"的入口。** 官方文档全集索引 `llms.txt` 与全部已登记的 `features/`、`integrations/` 页面里，不存在 agent 定义文件、agent 目录或 agent 注册表的概念；`features/subagents.md` 明确写着 **"You do not need to configure subagents or choose when they run. Lovable decides when subagents are useful based on your request."** [@ref-lovable-subagents-how]. 本章固定来源是 2026-10-01 抓取的 `features/subagents.md`、`features/agent-mode.md`、`features/plan-mode.md`、`features/chat-mode.md`、`features/goal-runs.md`、`features/skills.md`、`features/knowledge.md`，以及用于证明页面全集的 `llms.txt`。

读者能"定制行为"的三条真实路径都不是 agent 定义，而是对**同一个主代理**加指令或换模式：

| 想做的事 | 平台里的对应机制 | 作用域 |
| :-- | :-- | :-- |
| 让 Lovable 永远遵守某些规则 | 工作区知识 / 项目知识（纯文本字段，始终进入上下文）[@ref-lovable-knowledge-intro] | 工作区 / 单个项目 |
| 让 Lovable 在特定任务按固定流程做 | 工作区技能（按 description 匹配后加载）[@ref-lovable-skills-custom-builtin] | 工作区 |
| 换一种工作方式（讨论 / 出计划 / 直接改） | 项目聊天的 Chat、Plan、Build 模式 [@ref-lovable-chatmode-overview][@ref-lovable-planmode-overview][@ref-lovable-buildmode-overview] | 单条消息到一次会话 |
| 仓库内的指令文件 | 根目录 `AGENTS.md`（始终读取）或 `CLAUDE.md` [@ref-lovable-knowledge-faq] | 项目仓库 |

`features/knowledge.md` 的 FAQ 给出仓库侧入口：**根目录 `AGENTS.md` 无论会话多长都会被 Lovable agent 读取**，`CLAUDE.md` 之类指令文件同样能提供指导 [@ref-lovable-knowledge-faq]。这是产品自带的读取行为，不需要在 Lovable 里注册。

**缺口**：来源没有说明除 `AGENTS.md` / `CLAUDE.md` 之外还识别哪些文件名、是否支持子目录级指令文件，也没有说明这些文件的优先级。已检查 `features/knowledge.md` 全文、`features/skills.md`、`features/subagents.md` 与 `llms.txt` 的页面全集。

## 定义文件的格式与字段 {#agents-format}

**不适用**：既然没有 agent 定义入口，就没有对应的"第一方字段"。可类比的三种可编辑载体的字段如下，它们都不描述一个 agent 实例：

* **技能**：Name（1–64 字符、小写字母数字连字符、创建后不可改）、Description（"Use when..." 触发描述）、Instructions（markdown 正文，整包 ≤100,000 字符），外加捆绑文件（单文件 ≤1 MB，≤200 个，合计 ≤10 MB）[@ref-lovable-skills-anatomy][@ref-lovable-skills-bundled]；
* **知识**：`Workspace knowledge` 与 `Project knowledge` 都是纯文本，各 ≤10,000 字符；每个工作区只有一份工作区知识 [@ref-lovable-knowledge-workspace][@ref-lovable-knowledge-project]；
* **指令文件**：`AGENTS.md` / `CLAUDE.md` 放在项目 Git 仓库里，作为上下文来源之一被读取 [@ref-lovable-knowledge-faq]。

**缺口**：来源没有给出 `SKILL.md` 的 frontmatter 键名（`features/skills.md` 只以 Name/Description/Content 三段描述），因此"哪些字段必填、可选或被忽略"无法确定；`AGENTS.md` 也只说明"会被读取"，没有格式规定。已检查上述三页与 `llms.txt`。

## 主代理、子代理与特殊角色 {#agents-roles}

Lovable 只有**一套原生实现**，没有扩展提供的代理实现，角色划分如下 [@ref-lovable-buildmode-overview][@ref-lovable-subagents-types][@ref-lovable-goal-buildmode]：

* **主代理（Lovable agent）**：唯一会改动项目的执行者。项目聊天有三种模式，**Build 模式**（原 Agent mode）是默认且自主执行的模式，负责跨文件落地改动并自我验证 [@ref-lovable-buildmode-overview][@ref-lovable-buildmode-use]；
* **子代理（subagents）**：任务需要更多调查时，Lovable 会启动**临时、只读**的子代理做聚焦调查，可并行。子代理只把结论交回主代理，**不能改动项目**——所有文件改动仍来自主代理 [@ref-lovable-subagents-how]；
* 子代理有两类 [@ref-lovable-subagents-types]：
  | 类型 | 用途 | 特征 |
  | :-- | :-- | :-- |
  | **Generic subagents** | 需要特定形状的结果（对比、清单、摘要、评审、建议） | 卡片标题就是任务，例如 `Check how notifications are implemented` |
  | **Explore** | 需要可追溯证据的问题（"怎么运作的""在哪里处理的""为什么这样"） | 使用**当前可用的最强模型**，遵循结构化研究流程 |
* **Goal**：`/goal` 把一条 Build 模式消息变成"做到目标达成为止"的长任务；`Goal` 作为内置技能列在 Skills 列表里 [@ref-lovable-goal-set]；
* **Chats**：项目之外的另一种对话形态，但它是聊天入口，不是另一个 agent 定义 [@ref-lovable-chatmode-overview]。

子代理每次都用**全新上下文**启动，不自动看到完整聊天、先前消息或 Lovable 已经读过的内容；只知道自己任务简报里的内容（调查问题、相关项目背景、文件路径、约束）[@ref-lovable-subagents-how]。

## 显式调用与自动委派 {#agents-invocation}

**用户侧显式入口** [@ref-lovable-chatmode-context][@ref-lovable-goal-set][@ref-lovable-skills-invoke]：

* **模式选择器**：聊天输入框旁的下拉在 Chat / Plan / Build 之间切换，三种模式的对话内容连续；桌面外也可以 **Option+P**（macOS）/ **Alt+P** 循环切换 [@ref-lovable-chatmode-overview]；
* **`/goal` 命令**：在消息任意位置输入 `/goal`，或从 `/` 列表选 **Goal**；命令会从消息文本中移除，消息在聊天里标记为 **Goal** [@ref-lovable-goal-set]；
* **Skills 列表**：`/` 打开技能列表，选中的技能作为标签附着在消息上 [@ref-lovable-skills-invoke]。

**自动委派**：子代理**不由用户触发**，Lovable 根据请求自行决定是否值得拆分；官方给的建议是**在提示词里点名 subagents 并描述要调查什么**，可以提升被使用的概率，但不保证 [@ref-lovable-subagents-prompting][@ref-lovable-subagents-faq]。子代理之间**不互相协调**，各自把结论交回 Lovable，由主代理合并后再决定下一步 [@ref-lovable-subagents-how]。

**模式与命令的自动切换**：`/goal` 消息**总是**在 Build 模式运行；如果发送时选择器停在 Plan，Lovable 会把选择器切到 Build，并一直保持到你再次更改；消息发送失败则选择器留在 Plan [@ref-lovable-goal-buildmode]。目标只作用于发送它的那一条消息，下一条消息回到选择器当前模式 [@ref-lovable-goal-buildmode]。在 Plan 模式下输入 `/goal` 也一样会被切到 Build [@ref-lovable-planmode-pricing]。

**从 Chat 升到 Plan/Build 的显式确认**：在 Chat 模式下要求 Lovable 构建、修复、生成图片或视频、发布时，它会给出 **Start building** 卡片并标注 **(Uses credits)**——选 **Build** 即切到 Build 模式并开始改动（卡片随后显示 `Switched to Build mode`），选 **Skip** 则留在 Chat 模式、卡片显示 `Kept Chat mode` 且项目不变；也可以自己在模式选择器里切 [@ref-lovable-chatmode-overview]。Chat 模式下 Lovable 明确不做的事包括：创建/编辑项目文件、改数据库或跑迁移、生成或编辑图片视频、启用 Cloud/认证/邮件、发布、在 Plan 视图里生成计划 [@ref-lovable-chatmode-limits]。

**模式与成本的对应**（影响"该用哪种 agent 角色"的选择）[@ref-lovable-chatmode-pricing][@ref-lovable-planmode-pricing][@ref-lovable-goal-cost]：Chat 模式按 chat 计价（通常不到 1 积分，工作区每日 chat 额度优先抵扣，Free/Pro/Business 有额度、Enterprise 无）；Plan 模式每条消息 **1 积分 + 子代理研究用量**；Build 模式按工作量计价，无预估；Goal 是 Build 模式的延伸，成本明显高于普通 Build 消息。

**不能设置 goal 的时刻**：Lovable 正在处理**普通消息**时发 `/goal` 不会生效（输入框上方会先警告，命令作为普通文本留在消息里）；正在处理 **goal** 时发的消息则作为 follow-up 并入同一个目标 [@ref-lovable-goal-how]。重试一条失败的消息时不需要重新输入 `/goal`——重试会按 goal 再次发送 [@ref-lovable-goal-how]。

## 覆盖与边界：模型、工具、权限、并发、时长 {#agents-overrides-limits}

**按 agent 指定模型 / provider / 工具 / 权限 / 沙箱：不适用。** 来源里没有任何逐 agent 的配置面 [@ref-lovable-subagents-how][@ref-lovable-subagents-faq][@ref-lovable-priv-data]：

* 子代理不可配置；`Explore` 自动"使用当前可用的最强模型"，其余调查按需路由到更轻的模型 [@ref-lovable-subagents-types][@ref-lovable-subagents-faq]；
* 主代理用的模型不由用户选择（`features/ai.md` 明确 AI 功能模型"**不是** Lovable 用来写、改、推理代码的模型"）[@ref-lovable-ai-models]；
* 唯一与"模型池"有关的开关是工作区级的 **Extended-retention models**：开启后工作区可使用 provider 保留 prompt/output 至少 30 天的模型，关闭则只能用零数据保留模型 [@ref-lovable-priv-data]；
* 工具与权限属于**主代理一次任务**的授权面（connector 审批、Cloud 工具权限三档），不是 agent 级配置 [@ref-lovable-appconn-approve]。

**边界**： [@ref-lovable-subagents-how][@ref-lovable-subagents-faq][@ref-lovable-buildmode-duration][@ref-lovable-knowledge-workspace]

| 维度 | 行为 |
| :-- | :-- |
| 只读性 | 子代理不能创建、编辑、删除文件；**所有项目改动来自主代理** |
| 并发 | 一个请求里有多个独立部分时，可以**并行**运行多个子代理 |
| 递归/嵌套 | 来源没有说明子代理能否再派生（"do not coordinate directly with each other"是唯一相关表述），按 `unknown` 记录 |
| 上下文 | 子代理各自独立、全新上下文；长会话中项目知识/工作区知识"可能不会被一致遵循" |
| 单条消息时长 | Build 模式一条消息最长 **10 小时**，最后半小时收尾并总结 |
| 用量 | 子代理消耗模型用量；Plan 模式一条消息 = 1 积分 + 规划期子代理研究的用量 |
| 暂停 | 积分检查点（默认 20 积分）会暂停长消息；goal 同样会暂停 |

**缺口**：递归/嵌套限制、子代理数量上限、单条消息的工具调用次数上限都没有来源；已检查 `features/subagents.md` 全文（含 FAQ）、`features/agent-mode.md`、`features/plan-mode.md` 与 `features/privacy-and-security-settings.md`。

## 诊断：确认派生、查看调查过程 {#agents-diagnostics}

可观察入口 [@ref-lovable-subagents-how][@ref-lovable-buildmode-visibility][@ref-lovable-subagents-faq]：

* **activity card**：Lovable 启动子代理时项目聊天里出现活动卡片，逐行显示每个子代理在调查什么、当前状态；点击某一行可以看到它检查过的文件、跑过的搜索、用过的工具和返回的发现 [@ref-lovable-subagents-how]；
* **Details view**：点击进行中的活动卡片或已完成改动上的 **Details**，在原本显示预览的位置打开详情视图——**Timeline** 标签逐个列出 Lovable 做过的步骤（含工具调用），**Changes** 标签显示最终文件改动 [@ref-lovable-buildmode-visibility]；
* 主代理层面的"派生了几个子代理、花了多少"没有独立面板；成本只在响应的 **More options → Credits used** 里看到 [@ref-lovable-buildmode-visibility]。

**失败定位**：来源没有给出"子代理被拒绝/失败"的错误码或日志入口，也没有 agent 定义校验（因为没有定义）；Plan 模式下"启发式子代理研究"是唯一被明确标注为可变的成本项 [@ref-lovable-subagents-faq]。已检查 `features/subagents.md`、`features/agent-mode.md`、`features/plan-mode.md`、`features/goal-runs.md` 与 `features/chat-mode.md`。
