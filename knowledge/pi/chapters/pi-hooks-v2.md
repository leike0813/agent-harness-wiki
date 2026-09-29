---
schema_version: 2
record_kind: production
edition_id: pi-hooks-v2
harness_id: pi
topic: hooks
title: Pi Hooks：扩展事件回调（固定源码 781152f）
sections:
  - section_id: hooks-events
    source_refs:
      - ref-pi-ext-lifecycle
      - ref-pi-ext-locations
  - section_id: hooks-entry
    source_refs:
      - ref-pi-ext-locations
      - ref-pi-ext-register
      - ref-pi-readme-philosophy
      - ref-pi-packages-dedupe
  - section_id: hooks-input
    source_refs:
      - ref-pi-ext-tool-call
      - ref-pi-ext-tool-result
      - ref-pi-ext-input
      - ref-pi-ext-before-agent-start
  - section_id: hooks-output
    source_refs:
      - ref-pi-ext-tool-call-behavior
      - ref-pi-ext-tool-result
      - ref-pi-ext-input
      - ref-pi-ext-before-agent-start
  - section_id: hooks-order
    source_refs:
      - ref-pi-ext-tool-result
      - ref-pi-ext-tool-call-behavior
      - ref-pi-ext-lifecycle
  - section_id: hooks-diagnostics
    source_refs:
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
    section_id: hooks-entry
    status: answered
    source_refs:
      - ref-pi-ext-locations
      - ref-pi-ext-register
  - question_id: hooks.input
    section_id: hooks-input
    status: answered
    source_refs:
      - ref-pi-ext-tool-call
      - ref-pi-ext-tool-result
      - ref-pi-ext-input
      - ref-pi-ext-before-agent-start
  - question_id: hooks.output
    section_id: hooks-output
    status: answered
    source_refs:
      - ref-pi-ext-tool-call-behavior
      - ref-pi-ext-tool-result
      - ref-pi-ext-input
      - ref-pi-ext-before-agent-start
  - question_id: hooks.order
    section_id: hooks-order
    status: answered
    source_refs:
      - ref-pi-ext-tool-result
      - ref-pi-ext-tool-call-behavior
      - ref-pi-ext-lifecycle
  - question_id: hooks.conditions
    section_id: hooks-entry
    status: partial
    source_refs:
      - ref-pi-ext-locations
      - ref-pi-readme-philosophy
      - ref-pi-packages-dedupe
  - question_id: hooks.diagnostics
    section_id: hooks-diagnostics
    status: partial
    source_refs:
      - ref-pi-ext-reload
      - ref-pi-ext-resources-discover
---
固定来源为 pi-mono 仓库提交 781152fc 的 Pi coding agent 包（包内文档与源码）。Pi 的 hook 是扩展订阅的事件回调，不是 JSON 规则文件。以下事件与返回值来自该固定来源的扩展文档，未做运行观察，也未与任何精确 npm 版本建立映射，按 source_only 阅读。

## 第一方事件 {#hooks-events}

事件序列大致是：会话开始处的 session_start、resources_discover；用户提交后的 input、before_agent_start、agent_start 与消息事件；每一轮的 turn_start、context、before_provider_request、after_provider_response；工具处的 tool_execution_start、tool_call、tool_execution_update、tool_result、tool_execution_end；收尾的 turn_end、agent_end。会话切换、fork、compact、tree 导航和模型选择另有事件。[@ref-pi-ext-lifecycle] Pi 只有扩展这一种事件来源，不存在独立的插件事件。[@ref-pi-ext-locations]

## 注册扩展与启用条件 {#hooks-entry}

Hook 在扩展代码里用 `pi.on(event, handler)` 注册。[@ref-pi-ext-register] 扩展从 `~/.pi/agent/extensions/` 与 `.pi/extensions/` 的 `.ts` 文件或子目录 `index.ts` 自动发现，或在 settings 的 packages/extensions 中引入。[@ref-pi-ext-locations] 自动发现的位置是：

```text
~/.pi/agent/extensions/my-extension.ts           全局
~/.pi/agent/extensions/my-extension/index.ts     全局（子目录）
项目根目录/.pi/extensions/my-extension.ts         项目
项目根目录/.pi/extensions/my-extension/index.ts   项目（子目录）
```

一个最小扩展文件导出一个接收 ExtensionAPI 的工厂，在工厂里注册回调；下面的文件保存为 `~/.pi/agent/extensions/my-extension.ts`：[@ref-pi-ext-register][@ref-pi-ext-locations]

```typescript
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async (event, ctx) => {
    // 扩展加载后在这里处理事件
  });
}
```

前提是扩展被放入上述位置，或以 packages/extensions 引入。条件方面：扩展以完整系统权限运行，只能安装信任来源的扩展，核心没有权限弹窗机制。[@ref-pi-ext-locations][@ref-pi-readme-philosophy] 启用与禁用走 settings 或 `pi config` 的资源过滤（`[]` 全关、`!pattern` 排除、`+path` 与 `-path` 精确增删）。[@ref-pi-packages-dedupe] 缺口：文档没有把沙箱或项目信任列为事件生效的前置条件，这一点属本地缺口。

## 回调输入 {#hooks-input}

回调收到事件对象与 ctx，字段随事件不同：tool_call 有 toolName、toolCallId、input（可改）；tool_result 有 content、details、isError、input；input 有 text、images、source；before_agent_start 有 prompt、images、systemPrompt 与 systemPromptOptions（含 cwd、contextFiles、skills 等）。[@ref-pi-ext-tool-call][@ref-pi-ext-tool-result][@ref-pi-ext-input][@ref-pi-ext-before-agent-start] 敏感内容没有专门过滤：文档只要求只安装信任来源的扩展。

## 返回值与作用 {#hooks-output}

返回值语义因事件而异：tool_call 只通过 block 与 reason 阻断，改 input 会直接影响实际执行且之后不再校验；tool_result 返回 content、details、isError 的局部补丁；input 返回 continue、transform 或 handled；before_agent_start 可注入 message 或替换 systemPrompt。[@ref-pi-ext-tool-call-behavior][@ref-pi-ext-tool-result][@ref-pi-ext-input][@ref-pi-ext-before-agent-start] 下面的回调在工具执行前拦截 bash：

```typescript
pi.on("tool_call", async (event) => {
  if (event.toolName === "bash") {
    return { block: true, reason: "blocked by policy" };
  }
});
```

前提是该扩展已加载。生效结果是本次工具调用被阻断并带上 reason；若改为原地修改 `event.input`，则直接改写实际执行参数，且之后不再校验。检查方式是触发一次目标工具调用，观察是否被阻断或参数是否被改写。[@ref-pi-ext-tool-call-behavior][@ref-pi-ext-tool-call]

## 顺序与并发 {#hooks-order}

tool_result 的处理链按扩展加载顺序运行，每个处理器看到前一个改后的结果并返回局部补丁；tool_call 的改动对后续处理器可见；并行工具模式下 tool_result 与 tool_execution_end 按完成顺序交错，最终 toolResult 消息仍按助手源顺序发出。[@ref-pi-ext-tool-result][@ref-pi-ext-tool-call-behavior][@ref-pi-ext-lifecycle] 文档未给出同名事件是否重复触发或统一超时的说明，属本地缺口。

## 诊断与重载 {#hooks-diagnostics}

位于自动发现目录的扩展可用 `/reload` 热重载，重载会再次触发 resources_discover（reason 为 reload）。[@ref-pi-ext-reload][@ref-pi-ext-resources-discover] 缺口：没有统一的“列出已加载扩展或其订阅事件”的命令，定位未触发的事件需要扩展自身输出或另做运行观察。
