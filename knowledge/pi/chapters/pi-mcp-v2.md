---
schema_version: 2
record_kind: production
edition_id: pi-mcp-v2
harness_id: pi
topic: mcp
title: Pi MCP：核心缺失与扩展路线（固定源码 781152f）
sections:
  - section_id: mcp-core
    source_refs:
      - ref-pi-readme-philosophy
  - section_id: mcp-capabilities
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-register
  - section_id: mcp-route
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-locations
      - ref-pi-ext-register
questions:
  - question_id: mcp.entry
    section_id: mcp-core
    status: answered
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.definition
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.transport
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.auth
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.lifecycle
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.capabilities
    section_id: mcp-capabilities
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-register
  - question_id: mcp.exposure
    section_id: mcp-capabilities
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-register
  - question_id: mcp.diagnostics
    section_id: mcp-route
    status: partial
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-locations
      - ref-pi-ext-register
---
固定来源为 pi-mono 仓库提交 781152fc 的 Pi coding agent 包（包内文档与源码）。该来源明确说明 Pi 核心不含 MCP；本章据此给出核心范围的逐题结论。任何 MCP 能力只能由扩展或第三方包提供，不在本固定来源的结论内；本库未为 Pi 建立软件版本映射，按 source_only 阅读。

## 核心范围：没有 MCP 配置 {#mcp-core}

README 在开头列出 Pi 缺省不做的能力，其中直接写 No MCP，并给出两条替代路线：把 CLI 工具连同 README 当作 Skill，或写一个扩展来加入 MCP 支持。[@ref-pi-readme-philosophy] 因此核心没有 MCP server 的配置入口，也没有用户级或项目级的 MCP 配置文件。下列问法在核心范围里都不适用，它们描述的能力要由扩展实现：

- server 定义（命令、参数、环境变量、工作目录）：核心不定义这些字段。[@ref-pi-readme-philosophy]
- 传输：核心不含 stdio 或 HTTP 传输配置；应读作“核心不提供传输配置”，而不是“Pi 完全不支持 MCP”，README 只要求通过扩展引入。[@ref-pi-readme-philosophy]
- 凭据：核心没有 MCP 的 header、token 或 OAuth 配置，鉴权由引入 MCP 的扩展负责。[@ref-pi-readme-philosophy]
- 生命周期：核心不启动或连接 server，连接、重连、超时与缓存都由扩展决定。[@ref-pi-readme-philosophy]

本节没有可写的最小配置块，因为核心不存在这样一个文件；这一点本身就是该固定来源给出的结论。[@ref-pi-readme-philosophy]

## 能力暴露的前提 {#mcp-capabilities}

即便由扩展引入 MCP，能力也要先转成 Pi 工具才能被模型调用。核心不暴露 MCP 的 tools、resources 或 prompts；扩展用 `pi.registerTool` 注册的自定义工具在加载期或运行期都可以注册，运行期新增的工具立即出现在当前会话，可直接被模型调用而不必 `/reload`。[@ref-pi-readme-philosophy][@ref-pi-ext-register] 模型实际可见的工具还取决于 `setActiveTools` 的启停。[@ref-pi-ext-register]

## 引入 MCP 的路径与缺口 {#mcp-route}

固定来源只给出方向，不给可复制配方。扩展放在自动发现目录，或用 settings 的 packages/extensions 引入，可用 `/reload` 热重载。[@ref-pi-ext-locations][@ref-pi-ext-register] 自动发现的位置是：

```text
~/.pi/agent/extensions/my-extension.ts           全局
~/.pi/agent/extensions/my-extension/index.ts     全局（子目录）
项目根目录/.pi/extensions/my-extension.ts         项目
项目根目录/.pi/extensions/my-extension/index.ts   项目（子目录）
```

缺口：固定来源没有给出任何具体的 MCP 扩展名称与版本，也没有安装、握手、工具列表、首次调用四步证据，因此本章不给 MCP 配置示例或验证步骤；能力是否可见、握手是否成功、调用是否可用，都要另做运行观察。[@ref-pi-readme-philosophy][@ref-pi-ext-locations][@ref-pi-ext-register]
