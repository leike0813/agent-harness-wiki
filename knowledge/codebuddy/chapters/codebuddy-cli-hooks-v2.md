---
schema_version: 3
record_kind: production
edition_id: codebuddy-cli-hooks-v2
harness_id: codebuddy
topic: hooks
title: "CodeBuddy Code（CLI）Hook 机制"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-codebuddy-hooks-overview, ref-codebuddy-hooks-events, ref-codebuddy-pluginsref-components]
  - section_id: hooks-config
    surface_ids: [cli]
    source_refs: [ref-codebuddy-hooks-config, ref-codebuddy-settings-keys, ref-codebuddy-hooks-structure, ref-codebuddy-hooks-project, ref-codebuddy-hooksguide-start]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-codebuddy-hooks-input, ref-codebuddy-hooks-output]
  - section_id: hooks-execution
    surface_ids: [cli]
    source_refs: [ref-codebuddy-hooks-exec, ref-codebuddy-hooks-frontmatter, ref-codebuddy-hooks-prompt, ref-codebuddy-hooks-mcp, ref-codebuddy-changelog-filechanged-batch]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-codebuddy-hooks-config, ref-codebuddy-hooks-frontmatter, ref-codebuddy-skills-hooks, ref-codebuddy-pluginsref-components, ref-codebuddy-funchooks-quickstart, ref-codebuddy-hooks-security]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuddy-hooks-debug, ref-codebuddy-env-debug, ref-codebuddy-hooks-config, ref-codebuddy-hooks-frontmatter]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-codebuddy-hooks-overview, ref-codebuddy-hooks-events, ref-codebuddy-pluginsref-components]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-config
        status: answered
        source_refs: [ref-codebuddy-hooks-config, ref-codebuddy-hooks-structure, ref-codebuddy-hooks-project, ref-codebuddy-settings-keys]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-codebuddy-hooks-input]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-codebuddy-hooks-output]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-execution
        status: answered
        source_refs: [ref-codebuddy-hooks-exec, ref-codebuddy-hooks-frontmatter, ref-codebuddy-changelog-filechanged-batch]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-codebuddy-hooks-config, ref-codebuddy-hooks-frontmatter, ref-codebuddy-pluginsref-components, ref-codebuddy-hooks-security]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-codebuddy-hooks-debug, ref-codebuddy-env-debug, ref-codebuddy-hooks-config]
---

本章固定来源为 CodeBuddy Code 官方文档仓库 `https://cnb.cool/codebuddy/codebuddy-code` 提交 `47ec6f132a3f52925ee999deb782807bf6d82a2b` 的 `docs/hooks.md`、`docs/hooks-guide.md`、`docs/function-hooks.md`、`docs/plugins-reference.md`、`docs/skills.md`、`docs/settings.md`、`docs/env-vars.md`，以及同一仓库提交 `694ae23f44308ca901d620d2e48c2c3d35c75fc9` 的 `CHANGELOG.md`（2.161.0 发行记录；被引的 `docs/*.md` 在两个提交之间逐字未变）。文档把 Hook 功能标为 **Beta**，且 Hook 参考针对 v1.16.0 及以上；本章按来源级知识记录，发行记录里的版本号只用来标注行为自哪个 CLI 版本起成立。

机制边界：Hook 有三条来源路径——`settings.json` 的 `hooks` 配置、插件 `hooks/hooks.json`、以及 Agent/Skill 的 frontmatter `hooks`。Function Hooks 是并行的类型化 TypeScript middleware 层，不替换传统 shell/prompt hooks。

## 事件家族 {#hooks-events}

官方参考列出完整事件家族（27+ 种），覆盖工具生命周期（`PreToolUse`、`PostToolUse`、`PostToolUseFailure`）、会话与子代理（`SessionStart`、`SessionEnd`、`Stop`、`SubagentStart`、`SubagentStop`、`StopFailure`）、用户交互（`UserPromptSubmit`、`Notification`、`PermissionRequest`、`PermissionDenied`、`Elicitation`、`ElicitationResult`）、上下文（`PreCompact`、`PostCompact`、`InstructionsLoaded`、`ConfigChange`）、任务与团队（`TaskCreated`、`TaskCompleted`、`TeammateIdle`）、文件与环境（`FileChanged`、`CwdChanged`、`WorktreeCreate`、`WorktreeRemove`）以及启动/维护（`Setup`）。[@ref-codebuddy-hooks-overview]

核心事件的触发时点与 matcher 支持情况（同节表格）：`PreToolUse` 在工具执行前触发、支持工具名 matcher；`PostToolUse` 在工具成功执行后触发；`UserPromptSubmit` 在用户提交消息时触发、不支持 matcher；`Stop` 在主代理响应结束时触发；`SubagentStop` 在子代理（TaskTool）结束时触发；`PreCompact` 支持 `manual`/`auto` matcher；`SessionStart` 支持 `startup`/`resume`/`clear`/`compact`；`SessionEnd` 的 `reason` 为 `clear`/`logout`/`prompt_input_exit`/`other`。[@ref-codebuddy-hooks-events]

插件 hooks 响应同一批生命周期事件，且额外列出 `PermissionRequest`、`PermissionDenied`（返回 `{retry: true}` 告知模型可重试）、`InstructionsLoaded`、`ConfigChange`、`CwdChanged`、`FileChanged`（matcher 指定要监视的文件名）等。[@ref-codebuddy-pluginsref-components]

## 注册与配置 {#hooks-config}

Hook 配置写在设置文件里：用户级 `~/.codebuddy/settings.json`、项目级 `<项目根>/.codebuddy/settings.json`、项目本地 `.codebuddy/settings.local.json`，以及企业策略文件。不同作用域的 hooks **合并而非覆盖**，同一事件的所有匹配 hooks 都会执行。[@ref-codebuddy-hooks-config] `settings.json` 另有两个总闸：`disableAllHooks` 禁用全部 hooks，`allowUntrustedFrontmatterHooks` 控制非内置来源的 frontmatter hooks（默认 `false`）。[@ref-codebuddy-settings-keys]

结构是按 matcher 组织的数组：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "echo done", "timeout": 30 }
        ]
      }
    ]
  }
}
```

`matcher` 是区分大小写的正则，仅对 `PreToolUse`/`PostToolUse` 有意义（简单字符串 `Write` 匹配任何含 `Write` 的工具名，`^Write$` 精确匹配，`*`/空串/省略字段匹配全部）；`hooks[]` 每项的 `type` 为 `command` 或 `prompt`，`command` 可用 `$CODEBUDDY_PROJECT_DIR`，`prompt` 仅支持 `Stop`、`UserPromptSubmit`、`PreToolUse`，`timeout` 为该 hook 的秒数上限。[@ref-codebuddy-hooks-structure]

项目脚本用 `"$CODEBUDDY_PROJECT_DIR"/.codebuddy/hooks/...` 引用；Python 脚本要显式用 `python3` 调用，因为 Windows 上 Git Bash 不保证识别 shebang。[@ref-codebuddy-hooks-project] 官方入门指南给出配置面板与 matcher/hook 的分步操作。[@ref-codebuddy-hooksguide-start]

## 输入与输出 {#hooks-io}

输入：hooks 通过 stdin 收到 JSON，公共字段为 `session_id`、`transcript_path`、`cwd`、`permission_mode`、`generation_id`（可选）与 `hook_event_name`，再带事件特定字段（如 `PreToolUse` 的 `tool_name`/`tool_input`，`PostToolUse` 的同名字段）。[@ref-codebuddy-hooks-input]

输出（简单方式）按退出码：`0` 成功（stdout 在 transcript 模式显示，`UserPromptSubmit` 与 `SessionStart` 例外，stdout 会加入上下文）；`2` 阻塞错误（消息来源优先级为 stdout 的 `reason`/`stopReason` 或纯文本 > stderr，即 stderr 仅作 fallback）；其它退出码为非阻塞错误，stderr 显示给用户后继续执行。退出码 2 的行为按事件不同：`PreToolUse` 阻止工具调用，`PostToolUse` 追加消息（可用 `updatedToolOutput` 替换工具结果），`UserPromptSubmit` 阻止提示词处理，`Stop`/`SubagentStop` 阻止停止并继续对话，`PreCompact` 阻止压缩。[@ref-codebuddy-hooks-output]

输出（高级方式）为 stdout 的 JSON。公共字段 `continue`、`stopReason`（别名 `reason`）、`suppressOutput`、`systemMessage`；`PreToolUse` 可用 `hookSpecificOutput.permissionDecision`（`allow`/`deny`/`ask`）与 `permissionDecisionReason`、以及 `modifiedInput` 在执行前改写工具入参；`PostToolUse` 可用 `additionalContext` 追加上下文、`updatedToolOutput` 替换将要发给模型的工具结果。[@ref-codebuddy-hooks-output]

## 执行顺序与失败处理 {#hooks-execution}

执行细节：默认 60 秒执行限制（可按命令配置 timeout）、所有匹配的 hooks **并行运行**、多个完全相同的 hook 命令自动**去重**。Shell 环境上，macOS/Linux 用用户默认 shell（`$SHELL`，回退 `/bin/sh`），Windows **强制使用 Git Bash**（不支持 cmd.exe/PowerShell，找不到则报错提示安装 Git for Windows），可用 `CODEBUDDY_CODE_GIT_BASH_PATH` 指定 bash 路径、`CODEBUDDY_CODE_SHELL` 覆盖默认 shell。[@ref-codebuddy-hooks-exec]

多个来源（frontmatter 与全局/插件）在同一事件下**叠加合并且全部并行触发**，不存在覆盖。[@ref-codebuddy-hooks-frontmatter] 提示词型 hooks 走 LLM 评估路径（仅 `Stop`、`UserPromptSubmit`、`PreToolUse`），内置 `/goal` 是 prompt-based Stop hook 的开箱封装。[@ref-codebuddy-hooks-prompt]

MCP 工具也可作为 hook 目标：MCP 工具名格式为 `mcp__服务器名__工具名`，在 hook 配置中按同规则匹配。[@ref-codebuddy-hooks-mcp]

`FileChanged` 的触发在 CLI 2.161.0 改为按批次依次执行：短时间内同一文件的多次变化合并为一次触发；一次性变化的文件超过 1000 个时，这一波不再逐个触发钩子，改为记录一条告警。官方把这条变更记在同一版本「后台服务文件变更资源泄漏」条目下（与 Web UI 的文件监听同源），发行记录没有区分 CLI 会话与 Server 运行时，因此这里只按 CLI 记录，Server 侧是否同样适用未在来源中验证。[@ref-codebuddy-changelog-filechanged-batch]

## 生效条件与安全闸门 {#hooks-conditions}

配置安全：直接编辑设置文件不会立即生效——CodeBuddy Code 在启动时捕获 hooks 快照、整个会话使用该快照，外部修改会发警告，须在 `/hooks` 菜单中审核后才应用。[@ref-codebuddy-hooks-config]

frontmatter hooks 的安全闸门按来源区分：Product 内置 Agent/Skill 自动放行；`.codebuddy/agents/*.md`、`.codebuddy/skills/SKILL.md`、插件市场分发的 Agent/Skill 默认**拒绝**；插件 `hooks/hooks.json`（非 frontmatter）不受该闸门约束。启用需在 `~/.codebuddy/settings.json` 设 `"allowUntrustedFrontmatterHooks": true`，被拦截时输出 `[AgentTask] Frontmatter hooks from skill 'xxx' skipped`。[@ref-codebuddy-hooks-frontmatter] Skill 侧的同一闸门与叠加合并规则见 Skills 文档。[@ref-codebuddy-skills-hooks]

插件携带 hooks 的两条路径差异：`hooks/hooks.json` 作用于整个会话（插件启用即生效，无闸门），Agent/Skill frontmatter 的 `hooks` 只在该 subagent/fork skill 生命周期内生效并受闸门约束。[@ref-codebuddy-pluginsref-components]

Function Hooks 需显式 opt-in（`CBC_ENABLE_FUNCTION_HOOKS=1` 或别名 `CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1`），未开启时整层不生效；它与传统 hooks 并行、可同时启用。[@ref-codebuddy-funchooks-quickstart]

风险声明：hooks 会以你的用户权限自动执行任意 shell 命令，文档要求自行验证与清理输入、始终引用 shell 变量、使用绝对路径、避免路径遍历与敏感文件；越权风险由用户承担。[@ref-codebuddy-hooks-security]

## 诊断 {#hooks-diagnostics}

基本排查：运行 `/hooks` 确认 hook 是否已注册，检查 JSON 设置语法，先手动运行 hook 命令，确认脚本可执行，再用 `codebuddy --debug` 查看 hook 执行详情。常见问题是引号未转义、matcher 工具名不匹配（区分大小写）、脚本未用完整路径。[@ref-codebuddy-hooks-debug]

`--debug` 会打印匹配与执行过程的调试行（如 `[DEBUG] Matched 1 hooks for query "Write"`、`Hook command completed with status 0`）；进度消息出现在 transcript 模式（Ctrl-R）。注意文档标注该「调试输出示例」功能暂未支持。[@ref-codebuddy-hooks-debug] 环境变量侧 `CODEBUDDY_DEBUG=1` 等同 `--debug`，可结合 `CODEBUDDY_CODE_DEBUG_LOGS_DIR` 指定日志目录。[@ref-codebuddy-env-debug]

改动何时生效：设置文件里的 hooks 需经 `/hooks` 面板审核（或重启会话）才应用，因为运行期使用启动快照；frontmatter hooks 与 subagent 生命周期绑定，`CODEBUDDY_DEBUG=1` 下可见 `[ScopedHookRegistry] registered N hook config(s) for scope ...` 注册行，非法定义被静默丢弃但会输出 `invalid:` 警示日志。[@ref-codebuddy-hooks-config][@ref-codebuddy-hooks-frontmatter]
