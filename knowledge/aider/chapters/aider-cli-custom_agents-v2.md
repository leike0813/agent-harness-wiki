---
schema_version: 3
record_kind: production
edition_id: aider-cli-custom_agents-v2
harness_id: aider
topic: custom_agents
title: "Aider CLI 的角色机制：聊天模式、模型绑定与作用边界"
sections:
  - section_id: agents-modes
    surface_ids: [cli]
    source_refs: [ref-aider-usage-modes, ref-aider-coders-all, ref-aider-cmd-chat-mode, ref-aider-base-create]
  - section_id: agents-roles-models
    surface_ids: [cli]
    source_refs: [ref-aider-cmd-model, ref-aider-usage-architect, ref-aider-usage-askcode, ref-aider-models-resource-settings, ref-aider-models-settings-fields, ref-aider-models-init]
  - section_id: agents-definition
    surface_ids: [cli]
    source_refs: [ref-aider-config-sample-yaml, ref-aider-coders-all, ref-aider-scripting-python, ref-aider-sendchat-roles, ref-aider-base-create]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-aider-base-create, ref-aider-usage-architect, ref-aider-models-init, ref-aider-config-sample-yaml, ref-aider-usage-commands]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-aider-cmd-chat-mode, ref-aider-cmd-model, ref-aider-usage-commands, ref-aider-models-fuzzy, ref-aider-cmd-settings, ref-aider-args-show-prompts]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: partial
        source_refs: [ref-aider-coders-all, ref-aider-scripting-python, ref-aider-config-sample-yaml]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: partial
        source_refs: [ref-aider-scripting-python, ref-aider-sendchat-roles]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-modes
        status: partial
        source_refs: [ref-aider-coders-all, ref-aider-cmd-chat-mode, ref-aider-usage-modes]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-modes
        status: answered
        source_refs: [ref-aider-usage-modes, ref-aider-cmd-chat-mode]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-roles-models
        status: partial
        source_refs: [ref-aider-cmd-model, ref-aider-models-settings-fields, ref-aider-usage-architect]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-aider-usage-architect, ref-aider-models-init, ref-aider-usage-commands]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-aider-cmd-chat-mode, ref-aider-cmd-settings, ref-aider-args-show-prompts, ref-aider-models-fuzzy]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与 Aider 的"角色"实现 {#agents-modes}

固定来源是官方仓库提交 `5dc9490bb35f9729ef2c95d00a19ccd30c26339c` 的文档与实现。Aider 没有一个可注册的"自定义 Agent"概念：角色被实现为 **chat mode + coder 类**，模式名与编辑格式共用同一套选择逻辑。[@ref-aider-usage-modes][@ref-aider-coders-all]

`/chat-mode` 的实现里写明了内置模式与它们的用途 [@ref-aider-cmd-chat-mode]：

| 模式 | 用途 |
| :-- | :-- |
| `help` | 回答关于 aider 本身的问题（用法、配置、排错） |
| `ask` | 只讨论代码、不做改动 |
| `code` | 按最佳编辑格式改写代码（默认模式） |
| `architect` | 主模型提方案、editor 模型落成具体编辑 |
| `context` | 自动识别需要编辑的文件 |

切换入口 [@ref-aider-usage-modes]：

- 单条消息指定模式：`/code`、`/architect`、`/ask`、`/help`（只作用于这一条消息，下一条回到当前模式）。
- 粘性切换：`/chat-mode code|ask|architect|help|context`。
- 启动时切换：`--chat-mode {mode}`，或快捷开关 `--architect`。

模式的执行链在 `aider/coders/base_coder.py` 的 `Coder.create()`：模式名（`edit_format`）与 `aider/coders/__init__.py` 的 `__all__` 中每个 coder 类的 `edit_format` 逐一匹配，命中即构造该 coder；切换时把文件名集合、只读文件、`done_messages`、`cur_messages`、成本统计等按上下文带过去，并在编辑格式改变时先摘要旧历史，避免新格式被旧示例干扰。[@ref-aider-base-create]

提示符会显示当前模式（`> `、`ask> `、`architect> `），这是用户判断"当前由哪个角色处理"的直接信号。[@ref-aider-usage-modes]

## 角色与模型绑定 {#agents-roles-models}

同一个 coder 里最多涉及三个模型角色，全部可单独指定 [@ref-aider-cmd-model][@ref-aider-usage-architect][@ref-aider-usage-askcode]：

| 角色 | 配置入口 | 职责 |
| :-- | :-- | :-- |
| 主模型 | `--model` / `/model` | 主聊天、提案（architect 模式下的架构师） |
| weak 模型 | `--weak-model` / `/weak-model` | 生成 commit message、摘要聊天历史 |
| editor 模型 | `--editor-model`、`--editor-edit-format` / `/editor-model` | architect 模式下把方案翻译成文件编辑指令 |

architect 模式是一次请求拆成两次串行请求：主模型先给方案，editor 模型再产出编辑；`--editor-edit-format` 选择 editor 使用的编辑格式，文档推荐 `editor-diff` 与 `editor-whole`。主模型与 editor 可以是同一个模型。[@ref-aider-usage-architect]

角色的默认值来自模型设置而不是写死的全局默认：`aider/resources/model-settings.yml` 在导入时被读进 `MODEL_SETTINGS`，每条记录可以带 `weak_model_name`、`editor_model_name`、`editor_edit_format`，`Model.__init__` 先做别名映射，再按名字取设置，然后解析 weak/editor 模型，并计算 `max_chat_history_tokens`。[@ref-aider-models-resource-settings][@ref-aider-models-settings-fields][@ref-aider-models-init]

因此"给某个角色换个模型"是配置层面的覆盖，不需要写 agent 定义文件；`/model`、`/weak-model`、`/editor-model` 的实现只是把新名字写回当前 coder 的模型字段。[@ref-aider-cmd-model]

## 没有自定义 Agent 定义文件 {#agents-definition}

固定来源里没有 agent 定义格式：没有 agents 目录约定、没有清单文件、没有 frontmatter 字段、配置样例里也没有 agent 相关键。全部可选编辑格式与模式都来自包内 coder 类，用户无法用配置文件新增一个角色。[@ref-aider-config-sample-yaml][@ref-aider-coders-all]

唯一的"自定义角色"途径是进程内 Python API，文档明确标注它**不被官方支持、可能随时变动** [@ref-aider-scripting-python]：

```python
from aider.coders import Coder
from aider.models import Model

model = Model("gpt-4-turbo")
coder = Coder.create(main_model=model, fnames=["greeting.py"])
coder.run("make a script that prints hello world")
coder.run("/tokens")
```

这条路径要求调用方自己满足消息约定：`aider/sendchat.py` 的 `sanity_check_messages()` 要求非 system 消息在 user 与 assistant 之间交替，最后一条非 system 消息必须是 user，否则抛错。[@ref-aider-sendchat-roles][@ref-aider-base-create]

`Coder.create()` 接受 `main_model`、`edit_format`、`io`、`from_coder` 与任意 coder 关键字参数，并把 `kwargs` 原样传给 coder 构造函数——所以自定义角色只能通过"改 coder 参数"实现，不能通过声明发现。[@ref-aider-base-create]

## 委派、并发与上下文边界 {#agents-limits}

- **没有子代理**：固定来源里不存在"模型自己派生一个 agent"的机制，也没有并发、嵌套或递归委派的开关。用户切换模式时只是替换当前 coder 实例。[@ref-aider-base-create]
- **唯一的"多代理"是 architect 的两次串行调用**：主模型与 editor 模型顺序执行，文档说明这会变慢、变贵。[@ref-aider-usage-architect]
- **上下文边界**：`--max-chat-history-tokens` 是聊天历史软上限，超过即开始摘要；未设置时取模型的 `max_chat_history_tokens`，该值在 `Model.__init__` 中按输入窗口的十六分之一计算并夹在 1024 与 8192 之间。[@ref-aider-models-init][@ref-aider-config-sample-yaml]
- 上下文收缩靠命令而不是策略：`/tokens` 看用量，`/drop` 移除文件，`/clear` 清历史，`/reset` 全部重置；模式切换会保留对话历史，只有在编辑格式变化时才触发摘要。[@ref-aider-usage-commands][@ref-aider-base-create]

## 诊断 {#agents-diagnostics}

- `/chat-mode` 不带参数会列出全部模式与全部合法编辑格式及其说明；给出的模式名不在集合内时报错并回显可选值。[@ref-aider-cmd-chat-mode]
- `/model`、`/weak-model`、`/editor-model` 切换角色模型并回显新模型；`/models {关键词}` 按关键词搜索可用模型列表。[@ref-aider-cmd-model][@ref-aider-usage-commands][@ref-aider-models-fuzzy]
- `/settings` 打印当前生效设置，并附上主要模型、editor 模型、weak 模型的元数据字段。[@ref-aider-cmd-settings]
- `--show-prompts` 打印系统提示与消息后退出（调试用），可用来确认某个模式实际用了哪套提示。[@ref-aider-args-show-prompts]
- `/help <问题>` 走 help 模式回答关于 aider 自身的问题，是排查"为什么这个模式不按预期工作"的入口。[@ref-aider-usage-commands]
