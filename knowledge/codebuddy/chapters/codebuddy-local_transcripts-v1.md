---
schema_version: 3
record_kind: production
edition_id: codebuddy-local_transcripts-v1
harness_id: codebuddy
topic: local_transcripts
title: "CodeBuddy Code（CLI）本地 Transcript"
sections:
  - section_id: transcripts-recording-scope
    surface_ids: [cli]
    source_refs: [ref-codebuddy-lt-daemon-log-types, ref-codebuddy-lt-env-session-max-items, ref-codebuddy-lt-hooks-pretooluse-example, ref-codebuddy-lt-cli-no-session-persistence, ref-codebuddy-lt-sdk-session-options, ref-codebuddy-lt-changelog-mcp-spill-path, ref-codebuddy-lt-btw-not-persisted]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-codebuddy-lt-dir-runtime-data, ref-codebuddy-lt-env-session-max-items, ref-codebuddy-lt-daemon-pid-registry, ref-codebuddy-lt-cli-purge-scope, ref-codebuddy-lt-env-config-dir, ref-codebuddy-lt-install-config-dir, ref-codebuddy-lt-subagent-storage-tree, ref-codebuddy-lt-daemon-log-types, ref-codebuddy-lt-changelog-mcp-spill-path, ref-codebuddy-lt-hooks-pretooluse-example, ref-codebuddy-lt-slash-resume-fork]
  - section_id: transcripts-record-shape
    surface_ids: [cli]
    source_refs: [ref-codebuddy-lt-env-session-max-items, ref-codebuddy-lt-acp-conversation-request-id, ref-codebuddy-lt-changelog-transcript-id, ref-codebuddy-lt-cli-no-session-persistence, ref-codebuddy-lt-changelog-replay-after-write, ref-codebuddy-lt-hooks-input-common, ref-codebuddy-lt-hooks-pretooluse-example]
  - section_id: transcripts-session-lifecycle
    surface_ids: [cli]
    source_refs: [ref-codebuddy-lt-changelog-replay-after-write, ref-codebuddy-lt-hooks-pretooluse-example, ref-codebuddy-lt-sdk-session-options, ref-codebuddy-lt-sdk-resume-option, ref-codebuddy-lt-slash-resume-fork, ref-codebuddy-lt-subagent-storage-tree, ref-codebuddy-lt-checkpoint-tracking]
  - section_id: transcripts-retention-and-purge
    surface_ids: [cli]
    source_refs: [ref-codebuddy-lt-settings-cleanup-days, ref-codebuddy-lt-checkpoint-tracking, ref-codebuddy-lt-settings-cleanup-command, ref-codebuddy-lt-cli-purge-command, ref-codebuddy-lt-cli-purge-options, ref-codebuddy-lt-cli-purge-scope, ref-codebuddy-lt-cli-purge-all, ref-codebuddy-lt-slash-export, ref-codebuddy-lt-webui-export, ref-codebuddy-lt-env-config-dir, ref-codebuddy-lt-install-config-dir]
  - section_id: transcripts-inspection
    surface_ids: [cli]
    source_refs: [ref-codebuddy-lt-hooks-input-common, ref-codebuddy-lt-hooks-pretooluse-example, ref-codebuddy-lt-keybindings-transcript-view, ref-codebuddy-lt-btw-not-persisted, ref-codebuddy-lt-daemon-log-types, ref-codebuddy-lt-env-session-max-items, ref-codebuddy-lt-settings-cleanup-command, ref-codebuddy-lt-cli-purge-options, ref-codebuddy-lt-daemon-pid-registry]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recording-scope
        status: answered
        source_refs: [ref-codebuddy-lt-daemon-log-types, ref-codebuddy-lt-env-session-max-items, ref-codebuddy-lt-cli-no-session-persistence, ref-codebuddy-lt-sdk-session-options, ref-codebuddy-lt-btw-not-persisted]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-codebuddy-lt-dir-runtime-data, ref-codebuddy-lt-env-config-dir, ref-codebuddy-lt-install-config-dir, ref-codebuddy-lt-daemon-log-types, ref-codebuddy-lt-subagent-storage-tree, ref-codebuddy-lt-changelog-mcp-spill-path, ref-codebuddy-lt-daemon-pid-registry]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-codebuddy-lt-daemon-log-types, ref-codebuddy-lt-subagent-storage-tree, ref-codebuddy-lt-changelog-mcp-spill-path, ref-codebuddy-lt-hooks-pretooluse-example, ref-codebuddy-lt-slash-resume-fork]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-shape
        status: partial
        source_refs: [ref-codebuddy-lt-env-session-max-items, ref-codebuddy-lt-changelog-transcript-id, ref-codebuddy-lt-changelog-replay-after-write, ref-codebuddy-lt-cli-no-session-persistence]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-shape
        status: partial
        source_refs: [ref-codebuddy-lt-hooks-input-common, ref-codebuddy-lt-hooks-pretooluse-example, ref-codebuddy-lt-acp-conversation-request-id, ref-codebuddy-lt-changelog-transcript-id]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-session-lifecycle
        status: partial
        source_refs: [ref-codebuddy-lt-sdk-session-options, ref-codebuddy-lt-sdk-resume-option, ref-codebuddy-lt-slash-resume-fork, ref-codebuddy-lt-checkpoint-tracking, ref-codebuddy-lt-changelog-replay-after-write]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-codebuddy-lt-dir-runtime-data, ref-codebuddy-lt-env-session-max-items, ref-codebuddy-lt-subagent-storage-tree, ref-codebuddy-lt-changelog-mcp-spill-path, ref-codebuddy-lt-cli-purge-scope]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-purge
        status: partial
        source_refs: [ref-codebuddy-lt-slash-export, ref-codebuddy-lt-webui-export, ref-codebuddy-lt-cli-purge-scope]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-purge
        status: partial
        source_refs: [ref-codebuddy-lt-settings-cleanup-days, ref-codebuddy-lt-settings-cleanup-command, ref-codebuddy-lt-cli-purge-command, ref-codebuddy-lt-cli-purge-options, ref-codebuddy-lt-cli-purge-scope, ref-codebuddy-lt-cli-purge-all]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-inspection
        status: partial
        source_refs: [ref-codebuddy-lt-keybindings-transcript-view, ref-codebuddy-lt-daemon-log-types, ref-codebuddy-lt-env-session-max-items, ref-codebuddy-lt-cli-purge-options, ref-codebuddy-lt-settings-cleanup-command, ref-codebuddy-lt-daemon-pid-registry]
---


---

本章固定来源为 CodeBuddy Code 官方**文档仓库** `https://cnb.cool/codebuddy/codebuddy-code` 的提交 `8c7caf7ad5edd6ec9367a51fbeec2f4f167aa109`，抓取时间 `2026-10-06T04:33:10Z`；对应本轮快照为 `snapshot-codebuddy-lt-docs-daemon-md`、`snapshot-codebuddy-lt-docs-codebuddy-dir-md`、`snapshot-codebuddy-lt-docs-env-vars-md`、`snapshot-codebuddy-lt-docs-installation-md`、`snapshot-codebuddy-lt-docs-interactive-mode-md`、`snapshot-codebuddy-lt-docs-cli-reference-md`、`snapshot-codebuddy-lt-docs-sub-agents-md`、`snapshot-codebuddy-lt-docs-hooks-md`、`snapshot-codebuddy-lt-docs-acp-md`、`snapshot-codebuddy-lt-docs-checkpointing-md`、`snapshot-codebuddy-lt-docs-settings-md`、`snapshot-codebuddy-lt-docs-sdk-typescript-md`、`snapshot-codebuddy-lt-docs-sdk-sessions-md`、`snapshot-codebuddy-lt-docs-slash-commands-md`、`snapshot-codebuddy-lt-docs-web-ui-md`、`snapshot-codebuddy-lt-docs-keybindings-md` 与 `snapshot-codebuddy-lt-changelog-md`。

必须先说清三条边界，它们决定了下文每条结论能用到什么程度：

- **来源是文档仓库，不是产品实现源码。** 本章能证明的是"官方文档在该提交上写了什么"，不能证明某个已安装的 `@tencent-ai/codebuddy` 发行包在运行时确实如此。凡是需要读实现才能确定的细节——记录类型枚举、必填字段、刷盘时机、写入原子性、目录 id 的哈希算法——下文一律标为缺口，不做推断。
- **版本适用性为 unknown。** 文档未对 transcript 存储形态声明适用版本；`CHANGELOG.md` 中出现的版本号只用来标注某条行为"自哪个发行版起在文档里被记录"，不构成对读者已安装版本的断言。
- **界面只有 `cli`。** catalog 中 codebuddy 只声明了一个界面，本章全部答案只对 CLI 生效；`--serve` 提供的 Web UI 是同一 CLI 进程的前端，其 transcript 读取入口在文内单独标注，不外推到 IDE 或桌面形态。

## 记录范围与开关 {#transcripts-recording-scope}

CodeBuddy Code 把会话记录称为 **transcript**，官方日志体系表把它列为四类日志来源之一，路径 `~/.codebuddy/projects/{id}/{sessionId}.jsonl`，内容"对话历史"，触发条件"始终"——即默认一直记录，没有默认关闭。[@ref-codebuddy-lt-daemon-log-types]

从恢复侧可以反推它落盘了什么：`session/load` 回放时"逆序读取 JSONL"，达到最大条数阈值且遇到 user message 就停。[@ref-codebuddy-lt-env-session-max-items] 这说明 JSONL 里至少有 user 消息条目，且条目之间存在可被顺序扫描的先后关系；工具事件与助手回复也在同一文件里——Hook 的 `transcript_path` 在 `PreToolUse`、`PostToolUse` 等事件中都指向同一个 `.jsonl`，即工具调用发生的那一刻该文件就已经存在并可被外部进程读取。[@ref-codebuddy-lt-hooks-pretooluse-example] 但文档**没有**给出 JSONL 内的记录类型枚举，因此"每种条目有哪些字段"属于缺口，见 `transcripts.schema`。

**记录开关有三个层级：**

| 层级 | 开关 | 效果 | 来源 |
|---|---|---|---|
| CLI 全局 | `--no-session-persistence` | 会话上下文只在内存中，"不创建或追加本地 transcript"；仍可只读加载已有会话；不影响 stream-json 模式已启用的 `--replay-user-messages` 回显 | [@ref-codebuddy-lt-cli-no-session-persistence] |
| SDK（TypeScript） | `persistSession: false` | 会话只保留在内存，不写本地 transcript，**文件检查点也一并跳过**；恢复已有会话仍可用，只是不再写入。文档标注需要 CLI >= 2.125.1 | [@ref-codebuddy-lt-sdk-session-options] |
| MCP 超大响应 | `CODEBUDDY_DISABLE_MCP_LARGE_OUTPUT_FILES=1` | 强制不走落盘，MCP 超大响应直接截断降级，跳过 `tool-results/` 文件 | [@ref-codebuddy-lt-changelog-mcp-spill-path] |

值得注意的耦合：`persistSession: false` 同时关掉 transcript 和文件检查点，所以想保留 `/rewind` 能力就不能只关 transcript。

**明确不落盘的内容。** `/btw` 本地 shell 模式的命令与输出只在当前 TUI 会话内瞬态展示，"从不进入会话历史（既不入模型上下文，也不写 JSONL）"，因此续聊、恢复、上下文压缩和 `/fork` 都看不到这些本地 shell 内容；它的回显是"有上限的进程内展示，不落盘"，`Ctrl+O` 详细视图能看到但进程退出即失。[@ref-codebuddy-lt-btw-not-persisted] 本地命令的输入历史召回同样只留在内存，不写输入历史文件，重启 CLI 后不再保留。

**已查入口与剩余缺口。** 本题已查 `docs/daemon.md` 日志体系、`docs/env-vars.md` 回放变量、`docs/cli-reference.md` 参数表、`docs/sdk-typescript.md` 选项表、`docs/interactive-mode.md` 本地 shell 段、`docs/hooks.md` 输入 schema、`CHANGELOG.md` 关键词扫描。未确证的部分：JSONL 内是否记录 reasoning 全文、工具输出的内联形式（大输出已证实走 `tool-results/` 文件，小输出是否内联未说明）、以及除 `/btw` 外还有哪些内容被排除在记录之外。

## 存储位置、命名与格式 {#transcripts-storage-layout}

### 目录布局

会话记录住在配置目录下，官方把这一整片归为"运行时数据目录"，标注"由 CodeBuddy Code 自动维护，通常无需手动操作"：[@ref-codebuddy-lt-dir-runtime-data]

```
~/.codebuddy/
├── projects/      # 各项目运行时数据：会话记录（.jsonl）与子代理工具输出（tool-results/）
├── sessions/      # 活跃会话数据（CLI 进程 PID 注册表）
├── history.jsonl  # 全局对话历史，用于 /resume 恢复
├── file-history/  # 每个会话中操作过的文件快照，用于 /rewind 回退
├── blobs/         # 图片、截图等二进制资源，按内容哈希存储
└── local_storage/ # CLI 内部键值持久化存储（内容哈希命名的 .info 文件）
```

维持 transcript 读取所需的旁路文件各有分工：`blobs/` 存图片截图（按内容寻址，transcript 里应是引用而非内联 base64——`docs/env-vars.md` 另有 `CODEBUDDY_SKIP_READ_TOOL_IMAGE_REHYDRATION_IN_HISTORY` 控制历史回放时是否内联 base64，本章未展开）；`file-history/` 是 `/rewind` 的代码侧状态；`history.jsonl` 是 `/resume` 的输入侧索引。对话正文本身则由恢复侧按 `session/load` 逆序读取 JSONL 的行为侧证，[@ref-codebuddy-lt-env-session-max-items] 即读取的是 `projects/` 下的 `.jsonl` 而非这些旁路文件。

`~/.codebuddy/sessions/` 不是会话正文，而是**进程注册表**：每个 CLI 进程启动时注册一个以 PID 命名的 `.json`（`{pid}.json`、远程 Worker 为 `manual-{token}.json`），内容含 `pid`、`sessionId`、`cwd`、`startedAt`、`kind`、`url`、`mode`、`version`、`hostname`。要按进程反查会话，读这里，不要遍历 `projects/`。[@ref-codebuddy-lt-daemon-pid-registry]

### 有没有数据库参与

按固定来源能确证的分工是**纯文件**：会话正文在 `projects/{projectDir}/{sessionId}.jsonl`，大输出在 `tool-results/*.txt`，子代理在 `subagents/agent-{agentId}.jsonl`，图片在 `blobs/`，恢复时从 JSONL 逆序读。[@ref-codebuddy-lt-env-session-max-items] 与这些文件最接近"索引/辅助状态"的三个存储也都是文件：`local_storage/` 是"CLI 内部键值持久化存储（以内容哈希命名的 `.info` 文件）"，`blobs/` 按内容哈希寻址，`sessions/` 是进程注册表。[@ref-codebuddy-lt-dir-runtime-data]

**必须说清的是：这份固定来源从头到尾没有描述任何用于会话存储的数据库**，已查 `docs/codebuddy-dir.md` 运行时数据表、`docs/env-vars.md`、`docs/cli-reference.md`、`docs/daemon.md`、`docs/hooks.md`、`docs/sub-agents.md`、`docs/sdk-*.md` 与 `CHANGELOG.md` 关键词扫描，均无数据库表、schema、连接配置或迁移脚本的描述。**这不等于产品不使用数据库**——文档仓库不暴露实现，缺证据不能推出"不支持"。因此本题按可确证的部分作答：恢复所必需的文件可从来源推断为 transcript `.jsonl` 及其 `tool-results/`、`subagents/`、`blobs/` 旁路；`local_storage/` 是否参与会话恢复、`projects/` 之下是否另有索引或状态文件、这些文件能否从 transcript 重建，固定来源都没有回答。`project purge` 的安全边界提到"与 `memory`、`sessions`、`storage.json` 项目级状态重名的异常 session 会被保守跳过"，[@ref-codebuddy-lt-cli-purge-scope] 暗示还存在名为 `storage.json` 的项目级状态文件，但它既不在运行时数据表里，也没有格式说明，本章不做推断。

### 路径怎样变化

三条变化轴：

1. **环境变量覆盖根目录。** `CODEBUDDY_CONFIG_DIR` "自定义 CodeBuddy Code 存储配置和数据文件的位置"，即上表所有 `~/.codebuddy/...` 一起搬家。[@ref-codebuddy-lt-env-config-dir] 官方给出的用法是 shell 导出：

   ```bash
   export CODEBUDDY_CONFIG_DIR="$HOME/.my-codebuddy-config"
   ```

   列出的适用场景是多实例隔离、企业统一管控，以及与共用同一引擎的其他应用（如 WorkBuddy）并存。[@ref-codebuddy-lt-install-config-dir]

2. **项目作用域由第二层目录承载。** 会话正文不是直接放在 `projects/` 下，而是 `projects/{projectDir}/{sessionId}.jsonl`，所以"哪个项目的记录"由路径层级决定，不需要读文件内容。同一项目在不同机器上的目录名是否一致，见下节缺口。

3. **子代理挂在父会话之下。** [@ref-codebuddy-lt-subagent-storage-tree]

   ```
   ~/.codebuddy/projects/{projectDir}/
     └── {parentSessionId}/
         ├── tool-results/{callId}.txt          主会话工具输出
         └── subagents/
             ├── agent-{agentId}.jsonl          子代理对话历史
             └── agent-{agentId}/tool-results/{callId}.txt
   ```

   注意子代理 transcript 是**独立文件**，不是父文件里的嵌套条目；`sub-agents.md` 同时写明"子代理的对话历史和工具结果存储在父 session 的 `subagents/` 子目录中"，且"在恢复期间禁用记录以避免重复消息"。

**操作系统边界。** 文档中所有示例路径都是 POSIX 家目录形式（`~/.codebuddy/...`），Hook 输入示例里出现过 macOS 风格的 `/Users/.../...`。固定来源没有给出 Windows 家目录形式，因此本章的路径结论不外推到 Windows。

### 命名规则

| 元素 | 形态 | 证据 |
|---|---|---|
| 项目目录 | `{projectDir}`；变更记录里写作尖括号占位的 `project-hash` | [@ref-codebuddy-lt-daemon-log-types]、[@ref-codebuddy-lt-changelog-mcp-spill-path] |
| 会话文件 | `{sessionId}.jsonl`；Hook 示例中为一个 UUID 形态文件名 | [@ref-codebuddy-lt-daemon-log-types]、[@ref-codebuddy-lt-hooks-pretooluse-example] |
| 子代理记录 | `agent-{agentId}.jsonl` | [@ref-codebuddy-lt-subagent-storage-tree] |
| 工具输出 | `{callId}.txt` | [@ref-codebuddy-lt-subagent-storage-tree] |
| MCP 溢出输出 | `mcp-` 前缀加 server、tool、timestamp、rand 四段占位组成的 `.txt` | [@ref-codebuddy-lt-changelog-mcp-spill-path] |
| 进程注册 | `{pid}.json`、`manual-{token}.json` | `docs/daemon.md` PID 文件注册表段 |

父子关系由目录表达：`{parentSessionId}/subagents/agent-{agentId}/`。`/fork [name]` 的官方描述是"复制活跃对话历史并沿用会话设置，自动切换到新分支"，并注明含子代理历史的对话会提示暂不支持、可用 `/resume` 返回原对话。[@ref-codebuddy-lt-slash-resume-fork]

**本题缺口。** 已查 `docs/codebuddy-dir.md`、`docs/env-vars.md`、`docs/installation.md`、`docs/daemon.md`、`docs/sub-agents.md`、`docs/mcp.md`、`docs/hooks.md`、`CHANGELOG.md`。未确证：变更记录里 `project-hash` 的哈希算法与输入（是否对绝对路径取哈希、大小写与符号链接如何归一），因此**无法推导用户在别的机器上重建同一项目目录名**；`{sessionId}` 的生成规则只知其 UUIDv7（见下节）而未见于本文档；`/fork` 新分支的会话 id 与原会话之间是否有可解析的父子字段未知；`{timestamp}` 的精度与时区未知。

## 记录格式与 schema {#transcripts-record-shape}

### 格式

可以确证的是**逐行 JSON（JSONL）**：`projects/{id}/{sessionId}.jsonl` 用 `.jsonl` 扩展名，恢复时"逆序读取 JSONL"并在遇到 user message 时停止，[@ref-codebuddy-lt-env-session-max-items] CLI 也"不扫描 JSONL 历史做碰撞检测"，[@ref-codebuddy-lt-acp-conversation-request-id] 变更记录把"传播到 transcript"与"不扫描 JSONL 历史"并列陈述。[@ref-codebuddy-lt-changelog-transcript-id]

写入语义是**追加**：`--no-session-persistence` 的官方措辞是"不创建或追加本地 transcript"，[@ref-codebuddy-lt-cli-no-session-persistence] `--replay-user-messages` 的实现描述是"仅在主 session 的外部用户消息**成功写入 transcript 后**回显一次"，即写入成功是回显的前置条件。[@ref-codebuddy-lt-changelog-replay-after-write]

**本题缺口。** 固定来源未说明：字符编码；是否有分片（单文件增长上限）或轮转；是否压缩；`session/load` 逆序读遇到半行（写入被中断）时如何处理；除 MCP 大输出外是否还有别的内容外置到文件。读者不应假定"JSONL 可被任意 JSON 解析器逐行安全消费"。

### 已知的记录内字段

文档没有给出 transcript 记录的完整 schema，但多处一致地暴露了其中几个字段，可以作为最小可信锚点：

| 字段 | 来源与说明 |
|---|---|
| `providerData.conversationRequestId` | 轮次 ID，UUIDv7；ACP 侧"普通 prompt 真正进入 history 后"该值会写入 JSONL 的这个字段 [@ref-codebuddy-lt-acp-conversation-request-id] |
| `message.id` | 完整 assistant 消息的 `message.id` 表示**模型 generation**；"逐条 transcript 去重请使用 `uuid`" [@ref-codebuddy-lt-changelog-transcript-id] |
| `uuid` | 语义消息的稳定 UUID，用于 transcript 逐条去重；`providerData.messageId` 用于按模型 generation 分组 [@ref-codebuddy-lt-changelog-transcript-id] |
| 消息 `_meta` | 会话 transcript 的消息 `_meta` 会记录其对应的 W3C carrier（链路追踪信息不进模型上下文）— 见 `CHANGELOG.md` 同批记录 |

与 transcript 并行但**不是** transcript schema 的是 Hook 输入：它的公共字段为 `session_id`、`transcript_path`（注释写作"对话 JSON 的路径"）、`cwd`、`permission_mode`、`generation_id`（可选，`conversationRequestId` 可用时等同 session Request ID）、`hook_event_name`。[@ref-codebuddy-lt-hooks-input-common] 值得利用的是：`transcript_path` 是官方在运行期把当前 transcript 的绝对路径交给外部进程的正式途径，`PreToolUse` 示例里的取值形如 `/Users/.../.codebuddy/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl`。[@ref-codebuddy-lt-hooks-pretooluse-example] 这是**定位** transcript 的推荐方式，而不是从中读取记录的推荐方式。

**本题缺口。** 已查 `docs/hooks.md`（输入 schema 与各事件示例）、`docs/acp.md`（`session/new` / `session/load` / `session/resume` 与 `_meta` 语义）、`docs/headless.md`（stream-json 输入输出）、`docs/sdk-typescript.md` 与 `docs/sdk-python.md`（消息类型）、`CHANGELOG.md` 关键词扫描、`docs/troubleshooting.md`。未确证：JSONL 的顶层键名与嵌套结构、每种记录类型的必填项、user / assistant / tool_use / tool_result / system 条目各自的字段、条目之间的关系（父子工具调用如何引用）、图片等二进制在文件内是 blob 引用还是内联、以及版本迁移规则。唯一与迁移相关的官方陈述是 UUIDv7 统一时的"不重写旧历史或外部 ID；仅接受 UUIDv4 的消费方需要放宽校验"，[@ref-codebuddy-lt-changelog-transcript-id] 这说明历史条目**保持原样**、不做回填重写——这既是迁移规则也是缺口：新旧两种 UUID 形态可以共存于同一文件。因此**本章不提供"脱敏最小完整记录示例"**：固定来源不足以支撑一个真实可信的示例，硬写会变成编造。

## 会话生命周期 {#transcripts-session-lifecycle}

按官方记录能重建的链条是：**创建 → 追加 → 恢复 / 分支 / 交给子代理 → 关闭**。创建与追加的时点由两条记录确定：用户消息成功写入 transcript 才触发 `--replay-user-messages` 回显，[@ref-codebuddy-lt-changelog-replay-after-write] 工具调用在 `PreToolUse` 阶段 transcript 路径已可用。[@ref-codebuddy-lt-hooks-pretooluse-example]

**恢复**有四个入口，语义不同：

| 入口 | 用法 | 官方描述 |
|---|---|---|
| `/resume` | `[list \| session-id]` | 不带参数打开交互式面板；`list` 列出所有会话；带 session-id 直接切换。来源为 `history.jsonl` |
| `codebuddy -c` | — | 继续最近的对话 |
| `codebuddy -r "abc123" "查询"` | — | 通过 ID 恢复会话 |
| SDK `resume` / `continue` | `resume: "abc123"`、`continue: true` | 恢复指定会话 / 自动继续最近会话 |

SDK 侧还提供 `resumeSessionAt`（恢复到特定消息位置）与 `forkSession`（分叉会话）。[@ref-codebuddy-lt-sdk-session-options] `docs/sdk-sessions.md` 给出的是同一能力的使用形态：保存 `system` 初始化消息中的 `session_id`，后续用 `resume` 传回。[@ref-codebuddy-lt-sdk-resume-option]

**分支**：`/fork [name]`（`/branch` 别名）复制活跃对话历史并沿用会话设置后切换到新分支；含子代理历史的对话提示暂不支持；`/resume` 可返回原对话。[@ref-codebuddy-lt-slash-resume-fork]

**交给子代理**：子代理 transcript 落在父会话 `subagents/agent-{agentId}.jsonl`，"在恢复期间禁用记录以避免重复消息"，同步代理和后台代理都可恢复，`resume` 参数接受来自之前执行的代理 ID。[@ref-codebuddy-lt-subagent-storage-tree]

**上下文压缩后延续**：压缩本身不写独立记录；与压缩相关的是检查点——"每个用户提示都会创建一个新的检查点"、"检查点会跨会话持久保存，因此你可以在恢复的对话中访问它们"、"检查点会随会话在 30 天后自动清理（可配置）"。[@ref-codebuddy-lt-checkpoint-tracking] 检查点是**文件状态**记录，与对话 transcript 是两套东西：`/rewind` 可分别选择仅回退对话、仅回退代码或两者都回退。

**本题缺口。** 已查 `docs/checkpointing.md`、`docs/sdk-sessions.md`、`docs/sdk-typescript.md`、`docs/slash-commands.md`、`docs/cli-reference.md`、`docs/hooks.md`（`SessionStart` matcher 含 `resume` / `clear` / `compact`；`SessionEnd` 的 `reason` 取值）、`docs/sub-agents.md`、`CHANGELOG.md`。未确证：文件创建的确切时刻（首个用户消息前是否已建空文件）、flush / fsync 时机与断电后的完整性、压缩是否在 transcript 内留下可见条目、正常退出与 `/clear` 对 transcript 的处置差异、`/fork` 后新旧文件的复制还是重建。此外 `SessionEnd` 的 `reason` 只记录在 Hook 输入里，文档未说 transcript 内是否落这条。

## 保留、导出与删除 {#transcripts-retention-and-purge}

### 保留期

`settings.json` 的 `cleanupPeriodDays`："根据最后活动日期本地保留聊天记录的时长（默认：30 天）"。[@ref-codebuddy-lt-settings-cleanup-days] 检查点用同一个 30 天默认值。[@ref-codebuddy-lt-checkpoint-tracking]

最小配置块（依据 `docs/settings.md` 字段表）：

```json
{
  "cleanupPeriodDays": 20
}
```

写在 `~/.codebuddy/settings.json`（用户级）或项目级 `.codebuddy/settings.json`。生效方式是"按最后活动日期"滚动判定，不是一次性截止时间；也可用 CLI 写入：`codebuddy config set -g cleanupPeriodDays 30`。

### 官方清理命令

**按保留期清理：**

```bash
codebuddy cleanup                  # 按默认保留天数
codebuddy cleanup --days 7         # 清理 7 天以前
codebuddy cleanup --days 7 --dry-run   # 只预览
```

文档写明清理内容为"过期会话记录、会话生成文件、traces、logs、diagnostics 和 cache"。[@ref-codebuddy-lt-settings-cleanup-command] 注意 `traces` / `logs` / `diagnostics` / `cache` 超出本章范围（本地 transcript 主题不逐项审计这些），但 `codebuddy cleanup` 会**同时**删掉它们，所以运行前要意识到这一点。

**按项目清理：** `codebuddy project purge [path]` "用于删除 CodeBuddy 为项目保存在本机的运行时状态"；省略 `[path]` 时交互式终端弹项目选择器，传 `--all` 则清理所有项目。[@ref-codebuddy-lt-cli-purge-command] 选项为 `[path]` / `--dry-run` / `-y`--`--yes` / `-i`--`--interactive` / `--all` / `-h`；`-i` 与 `--all` 互斥，非 TTY 环境实际删除还需配 `--yes`，可先 `--dry-run` 预览。[@ref-codebuddy-lt-cli-purge-options]

单项目模式清理：已验证归属该项目的 transcript、子代理 transcript 关联产物、任务列表、debug 日志、文件编辑历史和 file rollback sidecar；`~/.codebuddy/history.jsonl` 中属于该项目的输入历史行；`~/.codebuddy.json` 中该项目的 `projects[路径]` 配置项；`~/.codebuddy/settings.json` 中匹配的 `trustedDirectories` 规则。官方安全边界写得很明确——"为避免误删，单项目模式只清理能可靠验证归属的数据"，仅凭压缩路径推断出的旧格式项目记忆目录、未验证项目目录，以及与 `memory`、`sessions`、`storage.json` 项目级状态重名的异常 session 都会保守跳过并告警。[@ref-codebuddy-lt-cli-purge-scope]

`--all` 额外清理 `~/.codebuddy/projects/` 下的全部项目状态、全部 session 任务列表与文件编辑历史与 debug 日志与 `history.jsonl`、`~/.codebuddy.json` 中全部项目级配置项、全部项目 trust rules，以及旧格式项目记忆目录（保留 `~/.codebuddy/memories/global/`）。[@ref-codebuddy-lt-cli-purge-all] 官方同时声明 `project purge` 不修改项目源码仓库，不删除全局 MCP 配置，也不删 `memories/global/`。

**删除前必须停止哪些写入者。** 固定来源没有直接回答，但给出了两条可用判据：Purge 的安全边界基于"可靠验证归属"，说明归属信息本身参与删除决策；`sessions/` 目录是活进程注册表。合理做法是先用 `--dry-run` 看 plan、执行前确认没有该项目的活跃 CLI / `--serve` Worker / daemon 托管会话（可查 `~/.codebuddy/sessions/*.json` 的 `pid` 与 `startedAt`）。这属于依据来源的合理推断，**不是**官方明文规则。

**本题缺口。** 手动 `rm` transcript 文件的后果、级联行为、孤儿记录如何处理、能否从残留文件重建会话、固定来源均未说明。"缺少证据不等于可以安全删除"——这里不给出任何手动删除的推荐。

### 导出与归档

CodeBuddy Code 提供的是**导出**，不是归档开关：

- `/export`：导出当前对话到文件或剪贴板。[@ref-codebuddy-lt-slash-export] 文档只给去向（文件 / 剪贴板），未给目标文件格式、命名规则或路径。
- Web UI（`--serve` 同一进程的浏览器前端）：右上角支持"整轮对话导出为 Markdown / JSON（JSON 保留完整时间线）"。[@ref-codebuddy-lt-webui-export] "JSON 保留完整时间线"是本章唯一一条关于导出保真度的官方陈述，但未说明该 JSON 与磁盘上的 JSONL 是否同构。

与"复制 / 移动 / 外部备份"的区别：官方没有把整目录打包或迁移 transcript 的命令。可用 `CODEBUDDY_CONFIG_DIR` 把整个配置目录（含 `projects/`）整体指向新位置，这实现的是**切换**而非导出——旧目录内容不会自动迁移。[@ref-codebuddy-lt-env-config-dir]、[@ref-codebuddy-lt-install-config-dir]

**本题缺口。** 已查 `docs/slash-commands.md`、`docs/web-ui.md`、`docs/cli-reference.md`、`docs/settings.md`、`docs/installation.md`。未确证：导出文件的格式与 schema、导出内容是否脱敏、能否把导出文件重新导入恢复会话、跨机器恢复的路径与可移植性损失（`{projectDir}` 是否可移植正是上一节的缺口）。恢复能力方面只确证了**同一台机器同一配置目录内**的恢复路径（`/resume`、`-c`、`-r`、SDK `resume`）。

## 定位、读取与排错 {#transcripts-inspection}

**拿到当前 transcript 的绝对路径。** 官方途径是 Hook 输入的 `transcript_path` 公共字段，注释写作"对话 JSON 的路径"，在 `PreToolUse`、`PostToolUse` 等事件中都可获得。[@ref-codebuddy-lt-hooks-input-common]、[@ref-codebuddy-lt-hooks-pretooluse-example] 在 TUI 里用 Ctrl+O 打开"详细转录"视图（`app:toggleTranscript`），在 `Transcript` 上下文内 `Ctrl+E` 切换显示全部内容、`Q` / `Ctrl+C` / `Escape` 退出。[@ref-codebuddy-lt-keybindings-transcript-view] 注意"显示全部内容"是**视图**开关：本地 shell 的 `/btw` 回显能在 `Ctrl+O` 里看到，是因为它仍在进程内，不是因为它被落盘。[@ref-codebuddy-lt-btw-not-persisted]

**按类型取日志。** 日志 API 支持四类来源，`transcript` 是其中一类，路径即 `~/.codebuddy/projects/{id}/{sessionId}.jsonl`，触发条件"始终"。[@ref-codebuddy-lt-daemon-log-types] 同一张表也给出 `debug` 类型（`~/.codebuddy/debug/{sessionId}.txt`，需 `--debug`）与 `telemetry`（`~/.codebuddy/logs/{date}/{workspace}.log`）——排查 transcript 相关问题时这三者要分开看，日志里提到的路径未必在 JSONL 里。

**会话长到回放被截断时。** `CODEBUDDY_SESSION_MAX_ITEMS` 默认为 1000：达到阈值且遇到 user message 时停止逆序读取 JSONL。需要支持超长会话（如沙箱场景）时可调大（例如 2000 或更多）；零 / 负数 / 非数字会回退到默认值。[@ref-codebuddy-lt-env-session-max-items] 这条同时是"恢复不完整"的常见原因——**恢复出来的历史比预期短，不一定是文件被截断，也可能是回放条数上限**。库存在沙箱等超长会话场景时，把它调大；调大前回放会静默变慢。

**清理前先预览。** `codebuddy cleanup --days N --dry-run` 预览保留期清理范围，[@ref-codebuddy-lt-settings-cleanup-command] `codebuddy project purge [path] --dry-run` 预览按项目的 purge plan，[@ref-codebuddy-lt-cli-purge-options] 后者还提供 `-i/--interactive` 按 Project state、Prompt history、Project configuration、Project trust 四个逻辑类别逐项确认——这是核对"哪些文件被判为属于某项目"的直接手段，也是排查误删/漏删的唯一官方窗口。

**按进程反查。** 活进程在 `~/.codebuddy/sessions/` 注册 `{pid}.json`（含 `pid`、`sessionId`、`cwd`、`startedAt`、`kind`、`mode`、`version`、`hostname`），进程存活用 `kill -0` 检测。[@ref-codebuddy-lt-daemon-pid-registry] "最近活跃了哪些会话"这类问题应先看这里再进 `projects/`。

**本题缺口。** 已查 `docs/keybindings.md`、`docs/daemon.md`、`docs/env-vars.md`、`docs/cli-reference.md`、`docs/settings.md`、`docs/troubleshooting.md`（日志定位与 TAG 排查段）、`docs/hooks.md`。未确证：官方没有提供 transcript 完整性校验工具、损坏条目的检测或修复命令、文件锁与并发写入说明、多进程同时写同一 transcript 的行为。`troubleshooting.md` 现有条目针对 TUI 权限弹框等 UI 问题，其日志 TAG 与本章的 transcript 定位无重叠。

## 与其它主题的交叉

- 通用配置加载顺序、`settings.json` 作用域与合并规则写在配置机制章节；本章只涉及 `cleanupPeriodDays`、`CODEBUDDY_CONFIG_DIR` 这两个直接影响记录路径与保留期的字段。
- 检查点（`checkpointing.md`）与 transcript 是两套记录：前者是文件状态、默认 30 天、可分别回退；后者是对话历史。本章已在生命周期与保留两节标出两者的关系，细节归检查点机制。
- Hook 的完整事件与执行语义归 Hook 主题；本章只使用 `transcript_path` / `session_id` / `generation_id` 这三个与记录定位直接相关的输入字段。
