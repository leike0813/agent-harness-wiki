---
schema_version: 3
record_kind: production
edition_id: opencode-custom_agents-v3
harness_id: opencode
topic: custom_agents
title: OpenCode 的自定义 Agent 机制
sections:
  - section_id: agents-definition
    surface_ids: [cli]
    source_refs:
      - ref-opencode-agents-json
      - ref-opencode-agents-markdown
      - ref-opencode-agents-options
      - ref-opencode-agents-types
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs:
      - ref-opencode-agents-invocation
      - ref-opencode-agents-json
      - ref-opencode-agents-permissions
      - ref-opencode-agents-options
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs:
      - ref-opencode-agents-depth
      - ref-opencode-agents-taskperm
      - ref-opencode-agents-json
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-agents-create
      - ref-opencode-agents-taskperm
      - ref-opencode-agents-hidden
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: answered
        source_refs:
          - ref-opencode-agents-json
          - ref-opencode-agents-markdown
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: answered
        source_refs:
          - ref-opencode-agents-options
          - ref-opencode-agents-json
          - ref-opencode-agents-markdown
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: answered
        source_refs:
          - ref-opencode-agents-types
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-opencode-agents-invocation
          - ref-opencode-agents-json
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-opencode-agents-permissions
          - ref-opencode-agents-options
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs:
          - ref-opencode-agents-depth
          - ref-opencode-agents-taskperm
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs:
          - ref-opencode-agents-create
          - ref-opencode-agents-taskperm
          - ref-opencode-agents-hidden
---
本章依据固定源码提交 545f51d 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.18.32 的运行时行为；以下字段属于固定源码知识，对 1.18.32 二进制的适用性尚未建立映射。示例中的凭据一律写成占位符。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 两种定义入口与角色 {#agents-definition}

自定义 Agent 有两个定义入口。其一是项目或全局 opencode.json 里的 agent 对象，其二是 markdown 文件，放在全局 ~/.config/opencode/agents/ 或项目 .opencode/agents/，文件名即 agent 名，例如 review.md 生成 review 这个 agent。目录加载沿用配置合并规则，项目覆盖全局，.opencode 目录里的 agents 也并入同一 agent 映射。 [@ref-opencode-agents-json] [@ref-opencode-agents-markdown]

用 opencode.json 定义时（项目根 opencode.json，或用户级 ~/.config/opencode/opencode.json），键是 agent 名：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "code-reviewer": {
      "description": "Reviews code for best practices and potential issues",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-20250514",
      "permission": { "edit": "deny" }
    }
  }
}
```

用 markdown 文件定义时，路径是 .opencode/agents/review.md（或全局 ~/.config/opencode/agents/review.md），frontmatter 放同名字段，正文作为该 Agent 的系统提示：

```markdown
---
description: Reviews code for quality and best practices
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
permission:
  edit: deny
  bash: deny
---

You are in code review mode. Focus on quality, bugs and security.
```

两种形态共用的字段如下。description 是唯一必填项，说明这个 Agent 做什么、何时该用。mode 取 primary、subagent 或 all，不写时默认 all。model 形如 provider/model-id。temperature 与 top_p 控制采样，不写时用模型自身默认。prompt 相对配置文件路径，可用 {file:...} 引用文件。permission 与已弃用的 tools 控制能力，steps（旧名 maxSteps，已弃用）限制迭代次数。另有 color、disable、hidden 等界面或开关字段。前提是目录名或键名即 agent 名且不与其他定义冲突。生效结果是该 Agent 进入可调用集合并按其 mode 归类。检查方式见诊断一节。 [@ref-opencode-agents-options] [@ref-opencode-agents-json] [@ref-opencode-agents-markdown]

角色方面，内置的 primary 是 build 与 plan，另有隐藏系统 Agent（compaction、title、summary）不在界面出现；内置 subagent 是 general、explore、scout。primary 与 subagent 使用同一套配置机制，只由 mode 决定归类。本题在固定来源中未发现由扩展提供的独立 Agent 机制，故按原生实现作答。 [@ref-opencode-agents-types]

## 调用、覆盖与继承 {#agents-invocation}

primary 用 Tab 键或自定义的 switch_agent 键位切换。subagent 可由 primary 依据其 description 自动委派，或由用户在消息里以 @ 提及，例如 @general help me search for this function。default_agent 指定默认 primary，若指向不存在或 subagent，会回退到 build 并给告警。 [@ref-opencode-agents-invocation] [@ref-opencode-agents-json]

每个 Agent 可覆盖 model、prompt、temperature、top_p，以及 permission 和已弃用的 tools。permission 的键（read、edit、glob、grep、list、bash、task、external_directory、lsp、skill）取值 allow、ask、deny，其中 edit、bash 等还接受按路径或命令的 glob 对象做细粒度控制：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "build": {
      "mode": "primary",
      "permission": {
        "edit": "allow",
        "bash": { "git status": "allow", "*": "ask" }
      }
    }
  }
}
```

前提是该 Agent 名与已定义条目一致。生效结果是这些设置替换或补充父级与全局默认；未为 subagent 指定 model 时，它继承发起调用的 primary 所用模型。检查方式是在对应 Agent 会话里观察其工具权限与模型。 [@ref-opencode-agents-permissions] [@ref-opencode-agents-options]

## 迭代与委派边界 {#agents-limits}

steps 限制单个 Agent 的迭代次数，达到上限后转入总结。subagent_depth 控制嵌套深度，写在 opencode.json 顶层（项目或用户位置皆可）：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "subagent_depth": 2
}
```

默认是 1，允许 primary 启动 subagent 但不允许 subagent 再启动 subagent；设为 0 禁止一切 subagent 启动，设为 2 允许再嵌套一层。前提是顶层键拼写正确。生效结果是限制后续委派深度。 [@ref-opencode-agents-depth] [@ref-opencode-agents-json]

permission.task 用 glob 决定某个 Agent 能调用哪些 subagent，写在 opencode.json 中该 Agent 条目下：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "orchestrator": {
      "permission": {
        "task": { "*": "deny", "orchestrator-*": "allow", "code-reviewer": "ask" }
      }
    }
  }
}
```

规则按顺序求值，最后匹配者生效；设为 deny 会把该 subagent 从 Task 工具描述里移除，模型因此不会尝试调用它。用户始终可以用 @ 直接调用任意 subagent，即使 task 权限本会拒绝。前提是 agent 名与 subagent 名可被 glob 匹配。生效结果体现在 Task 工具描述与被调用行为上。 [@ref-opencode-agents-taskperm]

## 诊断 {#agents-diagnostics}

opencode agent create 可以交互式生成定义，过程中会询问写入位置（全局或项目）与允许的权限，借此确认定义落点。调用或委派失败时，先查 permission.task 是否为 deny、Agent 是否 hidden 为 true（它只影响 @ 菜单可见性，不影响模型经 Task 调用）、以及 default_agent 是否指向 primary。 [@ref-opencode-agents-create] [@ref-opencode-agents-taskperm] [@ref-opencode-agents-hidden]

文档没有列出已发现 Agent 的专用命令，也没有单独的委派失败诊断入口，因此本项标 partial。
