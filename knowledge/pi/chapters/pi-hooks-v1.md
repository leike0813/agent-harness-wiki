---
schema_version: 2
record_kind: production
edition_id: pi-hooks-v1
harness_id: pi
topic: hooks
title: Pi Hooks：扩展事件回调（固定源码 781152f）
sections:
  - section_id: hooks-events
    source_refs:
      - ref-pi-ext-lifecycle
      - ref-pi-ext-locations
      - ref-pi-ext-register
  - section_id: hooks-io
    source_refs:
      - ref-pi-ext-tool-call
      - ref-pi-ext-tool-result
      - ref-pi-ext-input
      - ref-pi-ext-before-agent-start
      - ref-pi-ext-tool-call-behavior
  - section_id: hooks-run
    source_refs:
      - ref-pi-ext-tool-result
      - ref-pi-ext-tool-call-behavior
      - ref-pi-ext-lifecycle
      - ref-pi-ext-locations
      - ref-pi-readme-philosophy
      - ref-pi-packages-dedupe
      - ref-pi-ext-reload
      - ref-pi-ext-resources-discover
questions:
  - question_id: hooks.events
    section_id: hooks-events
    status: answered
    source_refs:
      - ref-pi-ext-lifecycle
      - ref-pi-ext-locations
  - question_id: hooks.entry
    section_id: hooks-events
    status: answered
    source_refs:
      - ref-pi-ext-locations
      - ref-pi-ext-register
  - question_id: hooks.input
    section_id: hooks-io
    status: answered
    source_refs:
      - ref-pi-ext-tool-call
      - ref-pi-ext-tool-result
      - ref-pi-ext-input
      - ref-pi-ext-before-agent-start
  - question_id: hooks.output
    section_id: hooks-io
    status: answered
    source_refs:
      - ref-pi-ext-tool-call-behavior
      - ref-pi-ext-tool-result
      - ref-pi-ext-input
      - ref-pi-ext-before-agent-start
  - question_id: hooks.order
    section_id: hooks-run
    status: answered
    source_refs:
      - ref-pi-ext-tool-result
      - ref-pi-ext-tool-call-behavior
      - ref-pi-ext-lifecycle
  - question_id: hooks.conditions
    section_id: hooks-run
    status: partial
    source_refs:
      - ref-pi-ext-locations
      - ref-pi-readme-philosophy
      - ref-pi-packages-dedupe
  - question_id: hooks.diagnostics
    section_id: hooks-run
    status: partial
    source_refs:
      - ref-pi-ext-reload
      - ref-pi-ext-resources-discover
body: |-
  Pi 的 hook 是扩展订阅的事件回调，不是 JSON 规则文件。以下事件与返回值来自固定来源的扩展文档，未做运行观察。

  ## 事件与注册 {#hooks-events}

  **hooks.events**：第一方事件由扩展订阅：序列从 session_start、resources_discover 开始，用户提交后依次是 input、before_agent_start、agent_start 与消息事件，每轮有 turn_start、context、before_provider_request、after_provider_response，工具处为 tool_execution_start、tool_call、tool_execution_update、tool_result、tool_execution_end，最后 turn_end、agent_end；会话切换、fork、compact、tree 导航和模型选择另有事件。[@ref-pi-ext-lifecycle] 不存在独立的插件事件来源：Pi 只有扩展这一种。[@ref-pi-ext-locations]

  **hooks.entry**：Hook 不是 JSON 规则，而是扩展代码里的 `pi.on(event, handler)`。[@ref-pi-ext-register] 扩展从 `~/.pi/agent/extensions` 与 `.pi/extensions` 的 `.ts` 文件或子目录 `index.ts` 自动发现，或在 settings 的 packages/extensions 中引入。[@ref-pi-ext-locations]

  ## 输入与输出 {#hooks-io}

  **hooks.input**：回调收到事件对象与 ctx，字段随事件不同：tool_call 有 toolName、toolCallId、input（可改）；tool_result 有 content、details、isError、input；input 有 text、images、source；before_agent_start 有 prompt、images、systemPrompt 与 systemPromptOptions（含 cwd、contextFiles、skills 等）。[@ref-pi-ext-tool-call][@ref-pi-ext-tool-result][@ref-pi-ext-input][@ref-pi-ext-before-agent-start] 敏感内容没有专门过滤：文档只要求只安装信任来源的扩展。

  **hooks.output**：返回值语义因事件而异：tool_call 只通过 block 与 reason 阻断，改 input 会直接影响实际执行且之后不再校验；tool_result 返回 content、details、isError 的局部补丁；input 返回 continue、transform 或 handled；before_agent_start 可注入 message 或替换 systemPrompt。[@ref-pi-ext-tool-call-behavior][@ref-pi-ext-tool-result][@ref-pi-ext-input][@ref-pi-ext-before-agent-start]

  ## 顺序、条件与诊断 {#hooks-run}

  **hooks.order**：tool_result 的处理链按扩展加载顺序运行，每个处理器看到前一个改后的结果并返回局部补丁；tool_call 的改动对后续处理器可见；并行工具模式下 tool_result 与 tool_execution_end 按完成顺序交错，最终 toolResult 消息仍按助手源顺序发出。[@ref-pi-ext-tool-result][@ref-pi-ext-tool-call-behavior][@ref-pi-ext-lifecycle] 文档未给出同名事件是否重复触发或统一超时的说明，属本地缺口。

  **hooks.conditions**：扩展以完整系统权限运行，只能安装信任来源的扩展；核心没有权限弹窗机制。[@ref-pi-ext-locations][@ref-pi-readme-philosophy] 启用与禁用走 settings 或 `pi config` 的资源过滤（`[]` 全关、`!pattern` 排除、`+path` 与 `-path` 精确增删）。[@ref-pi-packages-dedupe] 文档没有把沙箱或项目信任作为事件生效的前置条件，这一点属缺口。

  **hooks.diagnostics**：位于自动发现目录的扩展可用 `/reload` 热重载，重载会再次触发 resources_discover（reason 为 reload）。[@ref-pi-ext-reload][@ref-pi-ext-resources-discover] 缺口：没有统一的“列出已加载扩展或其订阅事件”的命令，定位未触发的事件需要扩展自身输出或另做运行观察。

---
Pi 的 hook 是扩展订阅的事件回调，不是 JSON 规则文件。以下事件与返回值来自固定来源的扩展文档，未做运行观察。

## 事件与注册 {#hooks-events}

**hooks.events**：第一方事件由扩展订阅：序列从 session_start、resources_discover 开始，用户提交后依次是 input、before_agent_start、agent_start 与消息事件，每轮有 turn_start、context、before_provider_request、after_provider_response，工具处为 tool_execution_start、tool_call、tool_execution_update、tool_result、tool_execution_end，最后 turn_end、agent_end；会话切换、fork、compact、tree 导航和模型选择另有事件。[@ref-pi-ext-lifecycle] 不存在独立的插件事件来源：Pi 只有扩展这一种。[@ref-pi-ext-locations]

**hooks.entry**：Hook 不是 JSON 规则，而是扩展代码里的 `pi.on(event, handler)`。[@ref-pi-ext-register] 扩展从 `~/.pi/agent/extensions` 与 `.pi/extensions` 的 `.ts` 文件或子目录 `index.ts` 自动发现，或在 settings 的 packages/extensions 中引入。[@ref-pi-ext-locations]

## 输入与输出 {#hooks-io}

**hooks.input**：回调收到事件对象与 ctx，字段随事件不同：tool_call 有 toolName、toolCallId、input（可改）；tool_result 有 content、details、isError、input；input 有 text、images、source；before_agent_start 有 prompt、images、systemPrompt 与 systemPromptOptions（含 cwd、contextFiles、skills 等）。[@ref-pi-ext-tool-call][@ref-pi-ext-tool-result][@ref-pi-ext-input][@ref-pi-ext-before-agent-start] 敏感内容没有专门过滤：文档只要求只安装信任来源的扩展。

**hooks.output**：返回值语义因事件而异：tool_call 只通过 block 与 reason 阻断，改 input 会直接影响实际执行且之后不再校验；tool_result 返回 content、details、isError 的局部补丁；input 返回 continue、transform 或 handled；before_agent_start 可注入 message 或替换 systemPrompt。[@ref-pi-ext-tool-call-behavior][@ref-pi-ext-tool-result][@ref-pi-ext-input][@ref-pi-ext-before-agent-start]

## 顺序、条件与诊断 {#hooks-run}

**hooks.order**：tool_result 的处理链按扩展加载顺序运行，每个处理器看到前一个改后的结果并返回局部补丁；tool_call 的改动对后续处理器可见；并行工具模式下 tool_result 与 tool_execution_end 按完成顺序交错，最终 toolResult 消息仍按助手源顺序发出。[@ref-pi-ext-tool-result][@ref-pi-ext-tool-call-behavior][@ref-pi-ext-lifecycle] 文档未给出同名事件是否重复触发或统一超时的说明，属本地缺口。

**hooks.conditions**：扩展以完整系统权限运行，只能安装信任来源的扩展；核心没有权限弹窗机制。[@ref-pi-ext-locations][@ref-pi-readme-philosophy] 启用与禁用走 settings 或 `pi config` 的资源过滤（`[]` 全关、`!pattern` 排除、`+path` 与 `-path` 精确增删）。[@ref-pi-packages-dedupe] 文档没有把沙箱或项目信任作为事件生效的前置条件，这一点属缺口。

**hooks.diagnostics**：位于自动发现目录的扩展可用 `/reload` 热重载，重载会再次触发 resources_discover（reason 为 reload）。[@ref-pi-ext-reload][@ref-pi-ext-resources-discover] 缺口：没有统一的“列出已加载扩展或其订阅事件”的命令，定位未触发的事件需要扩展自身输出或另做运行观察。

