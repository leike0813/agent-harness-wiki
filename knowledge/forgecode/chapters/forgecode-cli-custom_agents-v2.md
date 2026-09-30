---
schema_version: 3
record_kind: production
edition_id: forgecode-cli-custom_agents-v2
harness_id: forgecode
topic: custom_agents
title: "ForgeCode CLI 的自定义 Agent：定义位置、字段、角色、覆盖与诊断"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-forgecode-agents-loader, ref-forgecode-agents-locations-doc]
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-forgecode-agents-anatomy-doc, ref-forgecode-agents-loader, ref-forgecode-agents-locations-doc, ref-forgecode-agents-precedence]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-forgecode-agents-anatomy-doc, ref-forgecode-agents-fields, ref-forgecode-agents-parse, ref-forgecode-agents-settings-doc]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-forgecode-agents-builtin-doc, ref-forgecode-agents-fields, ref-forgecode-agents-loader, ref-forgecode-agents-override-doc, ref-forgecode-agents-settings-doc, ref-forgecode-agents-subagent, ref-forgecode-agents-tools-doc, ref-forgecode-config-defaults]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-forgecode-agents-cli, ref-forgecode-agents-fields, ref-forgecode-agents-override-doc, ref-forgecode-agents-precedence, ref-forgecode-agents-session-defaults, ref-forgecode-agents-tools-doc]
  - section_id: agents-invocation-diagnostics
    surface_ids: [cli]
    source_refs: [ref-forgecode-agents-cli, ref-forgecode-agents-precedence, ref-forgecode-agents-readme, ref-forgecode-agents-registry, ref-forgecode-agents-reload, ref-forgecode-agents-subagent, ref-forgecode-agents-switch-doc, ref-forgecode-agents-troubleshoot-doc, ref-forgecode-list-commands]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-forgecode-agents-locations-doc, ref-forgecode-agents-loader, ref-forgecode-agents-precedence]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-forgecode-agents-fields, ref-forgecode-agents-parse, ref-forgecode-agents-settings-doc]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-forgecode-agents-builtin-doc, ref-forgecode-agents-subagent, ref-forgecode-agents-loader]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-diagnostics
        status: answered
        source_refs: [ref-forgecode-agents-switch-doc, ref-forgecode-agents-cli, ref-forgecode-agents-troubleshoot-doc]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-forgecode-agents-session-defaults, ref-forgecode-agents-override-doc, ref-forgecode-agents-tools-doc]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: partial
        source_refs: [ref-forgecode-agents-fields, ref-forgecode-agents-settings-doc]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-diagnostics
        status: answered
        source_refs: [ref-forgecode-agents-troubleshoot-doc, ref-forgecode-agents-registry, ref-forgecode-agents-readme]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与界面 {#agents-scope}

本章依据 forgecode.dev 官方文档 `/docs/creating-agents/` 与 `/docs/operating-agents/` 快照，以及官方仓库 `tailcallhq/forgecode` 固定 commit `571a28902b9c562594c02fd089fc58bf8595108f` 的检出：`crates/forge_repo/src/agent.rs`（定义加载与优先级）、`crates/forge_repo/src/agent_definition.rs`（定义字段）、`crates/forge_services/src/agent_registry.rs`（运行时注册表）、`crates/forge_repo/src/agents/*.md`（内置 agent 定义）、`crates/forge_domain/src/env.rs`（目录推导）、`crates/forge_main/src/cli.rs`（`forge agent` 子命令）。界面口径为 catalog 唯一登记的 `cli`。[@ref-forgecode-agents-loader][@ref-forgecode-agents-locations-doc]

## 定义位置与发现 {#agents-entry}

自定义 agent 是“一个 Markdown 文件 + YAML frontmatter”，放在两处之一 [@ref-forgecode-agents-locations-doc][@ref-forgecode-agents-loader]：

| 位置 | 路径 | 作用域 |
| :-- | :-- | :-- |
| 全局 | `{base_path}/agents/*.md`（文档写作 `~/forge/agents/`） | 本机所有项目 |
| 项目 | `{cwd}/.forge/agents/*.md` | 当前仓库 |

加载顺序是“内置 → 全局 → 项目”，随后按 agent `id` 去重保留**最后出现**的条目，因此项目级 agent 覆盖全局同名 agent，二者都覆盖内置 agent；目录缺失时静默跳过 [@ref-forgecode-agents-loader][@ref-forgecode-agents-precedence]。内置 agent 只有三个：`forge`、`muse`、`sage`，由 `include_str!` 从 `crates/forge_repo/src/agents/` 嵌入二进制 [@ref-forgecode-agents-loader]。

发现范围是该目录下的 `*.md` 文件集合，代码未对文件做递归与命名约束（识别键是 frontmatter 的 `id`，文件名不参与识别）——文档明确“文件名无关紧要，只有 `id` 字段用于识别” [@ref-forgecode-agents-loader][@ref-forgecode-agents-anatomy-doc]。

## 定义格式与第一方字段 {#agents-format}

文件被解析为 frontmatter（YAML）与正文两部分：frontmatter 反序列化为 agent 定义，正文整体成为 `system_prompt` 模板 [@ref-forgecode-agents-parse][@ref-forgecode-agents-anatomy-doc]。`id` 是唯一必填字段，其余字段可选 [@ref-forgecode-agents-fields]：

| 字段 | 作用 |
| :-- | :-- |
| `id` | 唯一标识；重复 id 后加载者覆盖先前条目 |
| `title`、`description` | 显示名与用途说明；`description` 缺失时该 agent 不能作为其他 agent 的工具被调用 |
| `provider`、`model` | 该 agent 使用的 provider 与模型；缺省时继承会话默认值 |
| `tools` | 工具白名单（数组）；文档说明缺省即“没有任何工具” |
| `temperature`、`top_p`、`top_k`、`max_tokens` | 采样与输出上限 |
| `max_turns`、`max_requests_per_turn`、`max_tool_failure_per_turn` | 轮次与失败上限 |
| `compact` | 该 agent 的上下文压缩配置 |
| `custom_rules` | 追加到系统提示的自定义规则 |
| `reasoning` | 推理开关、强度、`max_tokens`、是否隐藏输出 |
| `user_prompt` | 对每条用户消息做模板包装的模板 |
| `tool_supported` | 该 agent 是否可被其他 agent 作为工具调用 |

文档给出的模型与行为段示例（依据 `/docs/creating-agents/` 的 Model and behavior settings 一节）[@ref-forgecode-agents-settings-doc]：

```yaml
---
id: my-agent
title: My Agent
description: Brief description of what this agent does
model: claude-sonnet-4
provider: anthropic
temperature: 0.1
top_p: 0.9
top_k: 40
max_tokens: 8192
max_turns: 50
max_requests_per_turn: 10
max_tool_failure_per_turn: 3
tool_supported: true
reasoning:
  enabled: true
  effort: medium
  max_tokens: 2048
  exclude: false
---
```

## 工具、角色与子代理机制 {#agents-roles}

内置角色分工由三个内置定义固定：`forge` 负责实现（读写、补丁、shell 等），`muse` 负责规划分析，`sage` 只读、作为内部研究工具被其他 agent 自动调用；文档还区分“面向用户的 agent”与内部研究工具，并说明 `:muse`、`:forge`、`:agent` 的切换方式 [@ref-forgecode-agents-builtin-doc][@ref-forgecode-agents-loader]。三者使用与其他自定义 agent 完全相同的定义机制——自定义文件只要 `id` 相同就能整体替换内置定义 [@ref-forgecode-agents-override-doc]。

`tools` 字段决定 agent 可见工具，文档要求按需收窄并提醒 `*` 会把所有工具注入上下文；MCP 工具可用前缀 glob 纳入 [@ref-forgecode-agents-tools-doc]。源码层面有一个特殊处理：只有 `forge` 这个 id 会在加载时被改写——先移除 `task` 与 `sage`，再在 `config.subagents` 为真时把 `task` 插回工具列表开头（默认 `subagents = true`），因此“子代理能力”由全局配置开关控制，而不是 agent 文件本身 [@ref-forgecode-agents-subagent][@ref-forgecode-config-defaults]。

并发、递归与持续时间的边界由字段而非固定常量决定：`max_turns`、`max_requests_per_turn`、`max_tool_failure_per_turn`、`compact` 均在 agent 定义中逐项给出 [@ref-forgecode-agents-fields][@ref-forgecode-agents-settings-doc]。源码中未见对“子代理再派生子代理”的显式深度限制，该点在本轮固定来源内没有证据。

## 模型、Provider 与覆盖继承 {#agents-overrides}

每个 agent 可独立声明 `provider` 与 `model`；未声明时由仓库层传入会话默认值补齐——`get_agents()` 读取 `ForgeConfig.session` 的 provider/model 作为兜底，缺失会话配置会报错 `NoDefaultSession` [@ref-forgecode-agents-session-defaults]。采样、推理、上下文压缩等参数同样按 agent 覆盖全局配置 [@ref-forgecode-agents-fields]。

覆盖粒度是“整份定义替换”：自定义 agent 与内置 agent 同 id 时，内置定义被完全丢弃而不是字段级合并，因此覆盖 `forge` 时必须重新列全它需要的工具 [@ref-forgecode-agents-override-doc][@ref-forgecode-agents-precedence]。

工具与权限方面，agent 只能通过 `tools` 清单收窄可见工具；`permissions.yaml` 的 allow/deny/confirm 策略在受限模式下独立生效，不由 agent 定义决定 [@ref-forgecode-agents-tools-doc]。agent 定义里没有沙箱字段，沙箱来自 CLI 启动参数（`--sandbox` 等），不在 agent frontmatter 中表达 [@ref-forgecode-agents-cli]。

## 调用与诊断 {#agents-invocation-diagnostics}

调用有三条路径：交互中 `:agent` 打开选择器或 `:muse`/`:forge` 直接切换，文档还说明切换时保留会话与项目上下文；CLI 侧由 `forge agent` 子命令组管理，`forge list agent`（别名 `agents`）列出全部 agent [@ref-forgecode-list-commands]；其他 agent 通过工具调用需要该 agent 具备 `description` [@ref-forgecode-agents-switch-doc][@ref-forgecode-agents-cli][@ref-forgecode-agents-troubleshoot-doc]。

运行时注册表是惰性且带缓存的：首次访问时从仓库加载全部 agent 放入内存表，后续读取命中缓存；`reload_agents()` 会清空缓存并重新加载 [@ref-forgecode-agents-registry][@ref-forgecode-agents-reload]。因此新增或修改 agent 文件后，必须重启会话或触发重载才能生效——文档的建议同样是“重启 ForgeCode 后再用 `:agent` 查看” [@ref-forgecode-agents-troubleshoot-doc]。

诊断按以下入口排查 [@ref-forgecode-agents-troubleshoot-doc][@ref-forgecode-agents-cli]：

- 定义是否被发现：`forge list agent` 或会话内 `:agent` 列表；看不到时依次检查扩展名是否为 `.md`、frontmatter 是否为合法 YAML（缩进用空格）、`id` 是否与他者重复。
- 工具是否可用：`:tools` 显示当前 agent 的工具集合，`forge list tool --agent` 后跟 agent id 可指定 agent 查看 [@ref-forgecode-agents-readme]。
- 权限与委派失败：当别的 agent 无法把该 agent 当工具调用时，先确认 `description` 存在，再确认 `config.subagents` 未被关闭、`task` 工具仍在工具列表中 [@ref-forgecode-agents-troubleshoot-doc][@ref-forgecode-agents-subagent]。

关于重复 id，文档与实现措辞略有差异：文档说“重复 id 会让第二个 agent 被静默跳过”，实现是按 id 去重并保留最后加载者（项目级在全局级之后加载，所以项目级生效） [@ref-forgecode-agents-troubleshoot-doc][@ref-forgecode-agents-precedence]。
