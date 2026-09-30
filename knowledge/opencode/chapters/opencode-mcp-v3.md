---
schema_version: 3
record_kind: production
edition_id: opencode-mcp-v3
harness_id: opencode
topic: mcp
title: OpenCode 的 MCP server 机制
sections:
  - section_id: mcp-config
    surface_ids: [cli]
    source_refs:
      - ref-opencode-mcp-config
      - ref-opencode-mcp-local
      - ref-opencode-mcp-remote
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs:
      - ref-opencode-mcp-local
      - ref-opencode-mcp-remote
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs:
      - ref-opencode-mcp-auth
      - ref-opencode-mcp-remote
  - section_id: mcp-runtime
    surface_ids: [cli]
    source_refs:
      - ref-opencode-mcp-code
      - ref-opencode-mcp-lifecycle
      - ref-opencode-mcp-catalog
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs:
      - ref-opencode-mcp-manage
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-mcp-debug
      - ref-opencode-mcp-auth
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: answered
        source_refs:
          - ref-opencode-mcp-config
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-config
        status: answered
        source_refs:
          - ref-opencode-mcp-local
          - ref-opencode-mcp-remote
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs:
          - ref-opencode-mcp-local
          - ref-opencode-mcp-remote
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs:
          - ref-opencode-mcp-auth
          - ref-opencode-mcp-remote
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-runtime
        status: partial
        source_refs:
          - ref-opencode-mcp-code
          - ref-opencode-mcp-lifecycle
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-runtime
        status: answered
        source_refs:
          - ref-opencode-mcp-code
          - ref-opencode-mcp-catalog
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs:
          - ref-opencode-mcp-manage
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs:
          - ref-opencode-mcp-debug
          - ref-opencode-mcp-auth
---
本章依据固定源码提交 545f51d 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.18.32 的运行时行为；以下字段、超时与命令属于固定源码知识，对 1.18.32 二进制的适用性尚未建立映射。示例中的凭据一律写成占位符。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 配置入口与两种 server 形态 {#mcp-config}

MCP server 在配置文件的 mcp 对象下定义，键名即服务器名，可在提示中按名引用。项目级写在项目根的 opencode.json，用户级写在 ~/.config/opencode/opencode.json，两处结构相同；作用域沿用配置文件的加载顺序，组织默认来自 .well-known/opencode，随后是全局、自定义、项目与受管配置。本地条目可以覆盖组织默认，例如把默认停用的服务器改为 enabled 为 true；把 enabled 设为 false 可在不删除条目的前提下暂时停用。 [@ref-opencode-mcp-config]

两种形态写在同一个 mcp 对象里，用 type 区分。下面这段放入项目根 opencode.json 或 ~/.config/opencode/opencode.json 的顶层：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "my-local-mcp-server": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-everything"]
    }
  }
}
```

字段含义如下。type 必填，取 local。command 必填，是命令与参数数组。cwd 可选，是子进程工作目录，相对路径从 workspace 解析。environment 可选，设置子进程环境变量。enabled 可选。timeout 可选，是拉取工具的超时，默认 5000 毫秒。前提是 command 指向的可执行文件在运行环境可用。生效结果是启动时按 command 拉起子进程并连接，把该服务器声明的工具加入会话。检查方式见诊断一节。 [@ref-opencode-mcp-local]

上面的 command 含一个需要从网络安装的第三方包，固定来源只支持这样的配置语法，不保证 npx 能取到该包或该 server 真能提供工具，实际可用性必须在目标环境另行验证。

远程形态把 type 设为 remote 并给出 url：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "my-remote-mcp": {
      "type": "remote",
      "url": "https://my-mcp-server.example.com/mcp",
      "enabled": true,
      "headers": { "Authorization": "Bearer {placeholder-token}" }
    }
  }
}
```

字段含义如下。type 必填，取 remote。url 必填，是远端地址。enabled 可选。headers 可选，随请求发送。oauth 可选，见认证一节。timeout 同样默认 5000 毫秒。前提是网络可达且端点实现 MCP。生效结果是启动时连接该端点。示例里的地址与令牌都是占位，example.com 域不是可连端点，凭据也不要写进仓库。 [@ref-opencode-mcp-remote]

这里刻意拆成两个块：两者同在一个文件的同一层级，但语法路径不同，不能把 local 的 command 与 remote 的 url 混写。

## 本地与远程传输 {#mcp-transport}

OpenCode 支持本地进程与远程 HTTP 两类传输，都用 type 选择。本地以 command 启动子进程并走标准输入输出协议，远程以 url 加可选 headers 连接。文档给出的本地示例用 npx 或 bun x 启动命令，远程示例是标准 HTTP 端点。 [@ref-opencode-mcp-local] [@ref-opencode-mcp-remote]

文档没有区分 SSE 与 Streamable HTTP 的字段差异，因此本项只按文档明确的两类传输作答；同一 url 在不同传输协议下的差异属未决项。

## 远端认证 {#mcp-auth}

远程服务器返回 401 时，OpenCode 自动进入 OAuth 流程：检测 401 后发起授权，服务器支持时使用 RFC 7591 动态客户端注册，并把令牌存到 ~/.local/share/opencode/mcp-auth.json。也可以在 oauth 中提供 clientId、clientSecret、scope 走预注册，或设 oauth 为 false 改用 headers 里的静态令牌。相关命令是 opencode mcp auth、opencode mcp list、opencode mcp logout。 [@ref-opencode-mcp-auth] [@ref-opencode-mcp-remote]

前提是远程条目已经可达并能返回 401 或授权元数据；生效结果是令牌落盘并在后续请求中自动使用。检查方式是 opencode mcp list 看认证状态，具体见诊断一节。

## 生命周期与能力 {#mcp-runtime}

启动时对每个启用条目建立连接。源码的连接函数另有约 30 秒的连接超时；enabled 为 false 时直接返回停用结果，不做连接。连接关闭时 onclose 清空该服务器的客户端、工具与指令缓存并把状态置为 failed，同时发布 ToolsChanged；服务器发出 ToolListChanged 通知时会重新拉取工具列表。源码未实现自动重连循环，因此本项对“重连”标 partial。 [@ref-opencode-mcp-code] [@ref-opencode-mcp-lifecycle]

要注意两个默认值作用在不同阶段：配置项 timeout 的文档默认值 5000 毫秒约束的是“连接之后拉取工具”这一步，源码连接函数自己的约 30 秒超时约束的是“建立连接”这一步，两者不是同一个值，看到哪个数字要看清它描述的是哪一步。

能力方面，自动注册到 Agent 的只有工具。创建路径仅在服务器声明 tools 能力时拉取工具，若该能力为假则列表为空；resources 与 prompts 不会因此自动注册为可用能力。源码另有 prompts、resources、resourceTemplates 三个拉取函数，并在服务 API 暴露 prompts 与 resources，但它们不参与本地工具创建路径。因此 tools、resources、prompts 必须分别判断，不能用其一代表全部。 [@ref-opencode-mcp-code] [@ref-opencode-mcp-catalog]

## 工具可见性与权限 {#mcp-exposure}

MCP 工具以服务器名加下划线为前缀注册，因此可以用 tools 的通配规则管理可见性。下面这段同样写在 opencode.json 顶层（项目或用户皆可），关闭某个服务器的全部工具：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "tools": { "mymcpserver_*": false }
}
```

通配是简单模式：星号匹配任意字符序列，问号匹配单个字符，其余字符按字面匹配。前提是前缀与服务器名一致。生效结果是匹配到的工具从可用集合移除。也可以反过来只在某个 Agent 条目的 tools 里启用需要的那组。permission 的键同样按工具名通配匹配。文档未描述交互式批准流程的细节，批准语义需要按权限键推断。 [@ref-opencode-mcp-manage]

## 诊断 {#mcp-diagnostics}

要区分配置已读、已连接、工具可见、调用成功四个层次。认证与连接两层有命令：opencode mcp auth list 看认证状态，opencode mcp debug my-oauth-server 显示当前认证状态、测试 HTTP 连通并尝试 OAuth 发现流程，opencode mcp list 列出服务器与认证状态。 [@ref-opencode-mcp-debug] [@ref-opencode-mcp-auth]

工具可见性需要回到 Agent 的工具集或会话行为确认，调用成功也没有专用入口，因此本项标 partial。配置改动何时生效同样没有热重载说明，改完通常需要重启进程再观察。

