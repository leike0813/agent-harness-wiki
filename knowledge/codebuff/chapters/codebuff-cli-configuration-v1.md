---
schema_version: 3
record_kind: production
edition_id: codebuff-cli-configuration-v1
harness_id: codebuff
topic: configuration
title: "Codebuff 的配置机制：来源、优先级、运行时、信任与诊断"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-codebuff-config-dir, ref-codebuff-settings-path, ref-codebuff-settings-defaults, ref-codebuff-agentdir-trust-store, ref-codebuff-doc-troubleshoot-history, ref-codebuff-settings-byok, ref-codebuff-agents-filter, ref-codebuff-skills-dirs, ref-codebuff-knowledge-constants, ref-codebuff-init-write, ref-codebuff-doc-quickstart, ref-codebuff-knowledge-home, ref-codebuff-doc-knowledge-home]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-codebuff-agents-filter, ref-codebuff-mcp-load, ref-codebuff-skills-dirs, ref-codebuff-cli-agent-merge, ref-codebuff-knowledge-select, ref-codebuff-knowledge-derive, ref-codebuff-cli-flags, ref-codebuff-agentdir-trust-decision, ref-codebuff-settings-validate]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-codebuff-sdk-env, ref-codebuff-runtime-app-url-vars, ref-codebuff-runtime-app-url, ref-codebuff-cli-flags, ref-codebuff-cli-startup, ref-codebuff-knowledge-prompt, ref-codebuff-settings-byok]
  - section_id: config-trust-defaults
    surface_ids: [cli]
    source_refs: [ref-codebuff-agentdir-trust-doc, ref-codebuff-agentdir-trust, ref-codebuff-publisher-trust, ref-codebuff-cli-startup, ref-codebuff-settings-defaults, ref-codebuff-knowledge-constants, ref-codebuff-sdk-env]
  - section_id: config-migration-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuff-settings-validate, ref-codebuff-settings-defaults, ref-codebuff-byok-schema, ref-codebuff-settings-path, ref-codebuff-cli-logs, ref-codebuff-doc-troubleshoot-config, ref-codebuff-cli-startup, ref-codebuff-knowledge-select, ref-codebuff-doc-knowledge-home, ref-codebuff-knowledge-home, ref-codebuff-knowledge-constants]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: partial
        source_refs: [ref-codebuff-config-dir, ref-codebuff-settings-path, ref-codebuff-agentdir-trust-store, ref-codebuff-doc-troubleshoot-history, ref-codebuff-knowledge-constants, ref-codebuff-knowledge-home, ref-codebuff-doc-knowledge-home, ref-codebuff-init-write, ref-codebuff-doc-quickstart]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-codebuff-agents-filter, ref-codebuff-mcp-load, ref-codebuff-cli-agent-merge, ref-codebuff-knowledge-select, ref-codebuff-knowledge-derive, ref-codebuff-cli-flags, ref-codebuff-settings-validate]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-codebuff-sdk-env, ref-codebuff-runtime-app-url-vars, ref-codebuff-runtime-app-url, ref-codebuff-cli-flags, ref-codebuff-knowledge-prompt]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust-defaults
        status: answered
        source_refs: [ref-codebuff-agentdir-trust-doc, ref-codebuff-agentdir-trust, ref-codebuff-publisher-trust, ref-codebuff-cli-startup]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-trust-defaults
        status: partial
        source_refs: [ref-codebuff-settings-defaults, ref-codebuff-knowledge-constants, ref-codebuff-sdk-env]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration-diagnostics
        status: partial
        source_refs: [ref-codebuff-settings-validate, ref-codebuff-settings-defaults, ref-codebuff-byok-schema]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-migration-diagnostics
        status: partial
        source_refs: [ref-codebuff-settings-path, ref-codebuff-cli-logs, ref-codebuff-doc-troubleshoot-config, ref-codebuff-cli-startup, ref-codebuff-knowledge-select, ref-codebuff-doc-knowledge-home, ref-codebuff-knowledge-home, ref-codebuff-knowledge-constants]
---

## 配置来源与路径 {#config-sources}

**config.sources**：CLI 的配置目录由 `getConfigDir()` 决定：设置了 `FREEBUFF_CONFIG_DIR` 就用它
（必须是绝对路径，否则报错，避免相对当前项目写设置），否则用 `~/.config/manicode`，并在非生产
构建下追加 `-<环境名>` 后缀 [@ref-codebuff-config-dir]。

该目录下的文件（本章能确证的）：

| 文件 / 目录 | 作用 | 来源 |
| --- | --- | --- |
| `settings.json` | CLI 设置；缺失时写入默认值 `mode: DEFAULT`、`adsEnabled: true` | [@ref-codebuff-settings-path][@ref-codebuff-settings-defaults] |
| `credentials.json` | 登录凭据 | [@ref-codebuff-agentdir-trust-store] |
| `trusted-agent-dirs.json` | 仓库 `.agents` 目录的信任记录（0600） | [@ref-codebuff-agentdir-trust-store] |
| `projects/<项目名>/chats/...` | 每项目、每会话记录 | [@ref-codebuff-doc-troubleshoot-history] |
| `connections.json`（默认在 `~/.config/freebuff/byok`） | BYOK 连接元数据 | [@ref-codebuff-settings-byok] |

项目侧：`.agents/`（agent 定义与 `mcp.json`）、`.claude/skills` 与 `.agents/skills`（Skill）、
`AGENTS.md`/`CLAUDE.md`/`*.knowledge.md`（知识文件）[@ref-codebuff-agents-filter][@ref-codebuff-skills-dirs]
[@ref-codebuff-knowledge-constants]。`/init` 会把 `AGENTS.md`（知识文件名列表的第一项）与
`.agents/types/` 下的类型文件写进项目 [@ref-codebuff-init-write]，文档站的 Quick Start 也把
`AGENTS.md`/`CLAUDE.md` 描述为会被读取的项目文件 [@ref-codebuff-doc-quickstart]。

home 目录的知识文件是特例：实现只接受点号开头的 `.AGENTS.md`/`.CLAUDE.md`（大小写不敏感、
按优先级取第一个），而文档站写的是 `~/.knowledge.md` 优先、其次 `~/.AGENTS.md`、`~/.CLAUDE.md`
[@ref-codebuff-knowledge-home][@ref-codebuff-doc-knowledge-home]。两者不一致，见下文"迁移与诊断"的
缺口说明。没有发现组织/企业级配置入口（管理员下发或托管设置）。这一条按 partial 阅读
[@ref-codebuff-config-dir]。

## 作用域优先级与合并 {#config-overrides}

**config.overrides**：目录级顺序统一是"后者覆盖前者"。agent 搜索顺序
`{cwd}/.agents` → `{cwd}/../.agents` → `~/.agents` [@ref-codebuff-agents-filter]；`mcp.json` 用同一组目录
[@ref-codebuff-mcp-load]；Skill 顺序 `~/.claude/skills` → `~/.agents/skills` → `{cwd}/.claude/skills` →
`{cwd}/.agents/skills` [@ref-codebuff-skills-dirs]。合并方式按对象类型不同：agents 与 MCP server 按
名字整体覆盖（不做字段级合并），同名本地 agent 替换 bundled 定义
[@ref-codebuff-cli-agent-merge][@ref-codebuff-mcp-load]；知识文件是"每个目录只选一个"，优先级
`AGENTS.md` > `CLAUDE.md`，未显式传入时从项目文件里自动挑出
[@ref-codebuff-knowledge-select][@ref-codebuff-knowledge-derive]。

CLI 参数覆盖文件配置：模式默认来自 `settings.json`，而 `--lite`/`--max`/`--plan` 在解析时写入本次
运行的初始模式（后写的参数获胜），`--cwd` 改工作目录，`--agent` 整体跳过本地 `.agents`，
`--trust-agents` 让本次运行信任所有仓库目录但不写信任记录
[@ref-codebuff-cli-flags][@ref-codebuff-agentdir-trust-decision]。设置文件本身在读取时会被校验与过滤：
非法值（例如不在模式枚举里的 `mode`）被丢弃，而不是原样保留 [@ref-codebuff-settings-validate]。

## 运行时字段、环境变量与参数介入时机 {#config-runtime}

**config.runtime**：环境变量分两类。一类是 SDK 直接透传的运行时变量：`CODEBUFF_RG_PATH`、
`CODEBUFF_WASM_DIR`、`CODEBUFF_TRUSTED_AGENT_PUBLISHERS`、`VERBOSE`、`OVERRIDE_TARGET`/
`OVERRIDE_PLATFORM`/`OVERRIDE_ARCH` [@ref-codebuff-sdk-env]。另一类是后端地址覆盖：
`NEXT_PUBLIC_CODEBUFF_APP_URL` 与 `CODEBUFF_APP_URL` 按顺序读取，只接受 HTTPS（或 loopback 的
HTTP），且主机必须是一方域名（`codebuff.com`/`freebuff.com` 及其子域）或 loopback，否则忽略并每
进程告警一次；要在别的域名上自建后端必须显式设置 `CODEBUFF_ALLOW_CUSTOM_APP_URL=1`
[@ref-codebuff-runtime-app-url-vars][@ref-codebuff-runtime-app-url]。

介入时机的可观察点：CLI 参数在 TUI 挂载前解析，`--trust-agents` 与 `CODEBUFF_TRUST_AGENT_DIRS=1`
在同一处生效 [@ref-codebuff-cli-flags]；`.agents`/`mcp.json`/Skills 在启动的一次性初始化里读取
[@ref-codebuff-cli-startup]；知识文件在每轮 run 的状态初始化里加载并注入上下文，系统提示还会告诉
模型这些文件存在、home 目录下的那份不可编辑 [@ref-codebuff-knowledge-prompt]。BYOK 的选择与推理档
保存在设置文件里，在每次 run 开始时解析成运行期连接 [@ref-codebuff-settings-byok]。没有发现 profile
概念。这一条按 partial 阅读 [@ref-codebuff-sdk-env]。

## 信任、策略与默认值 {#config-trust-defaults}

**config.trust**：两处信任门。其一，仓库 `.agents` 目录：只有包含可执行 agent 文件或
`mcp.json` 时才需要用户确认一次（`~/.agents` 永不询问，仅含 Skills 的目录也不需要）；非交互运行
不提示，直接跳过并打印说明 [@ref-codebuff-agentdir-trust-doc][@ref-codebuff-agentdir-trust]。其二，注册表
agent 的发布者信任：带字符串 `handleSteps` 的远程模板只有 `codebuff`、`CODEBUFF_TRUSTED_AGENT_PUBLISHERS`
或运行时 `trustedAgentPublishers` 才允许在本机被 `eval` [@ref-codebuff-publisher-trust]。CLI 启动顺序把
信任门放在加载之前 [@ref-codebuff-cli-startup]。

**config.defaults**：默认值来自代码常量而不是配置文件。`settings.json` 的默认是
`mode: DEFAULT` 与 `adsEnabled: true`，缺失字段按默认补齐 [@ref-codebuff-settings-defaults]；知识文件名
默认集合是 `AGENTS.md`、`CLAUDE.md` 加 `*.knowledge.md` 模式
[@ref-codebuff-knowledge-constants]；SDK 那边另有各自的默认（如 Skills 默认只读项目目录、
`maxAgentSteps` 默认 200）[@ref-codebuff-cli-startup]。缺口：没有在固定来源里找到平台差异开关（除了
Windows 相关的路径/终端变量透传）[@ref-codebuff-sdk-env]。这一条按 partial 阅读。

## 迁移与诊断 {#config-migration-diagnostics}

**config.migration**：设置读取时做两类迁移：旧值 `mode: FREE` 归一化为 `LITE`；超出目录的
`freebuffModel` 会在每次加载时被"已被取代"的迁移函数换成新默认模型；保存的推理档会按模型自身
的档位表过滤；界面里还保留了几个标为 `@deprecated` 的旧键（如 `alwaysUseALaCarte`）
[@ref-codebuff-settings-validate][@ref-codebuff-settings-defaults]。BYOK 连接用 revision 做版本化，编辑会
递增并轮换凭据引用 [@ref-codebuff-byok-schema]。缺口：没有通用的配置键迁移框架或旧格式导入工具。按
partial 阅读 [@ref-codebuff-settings-validate]。

**config.diagnostics**：设置文件损坏或非法时 `loadSettings` 只写 debug 日志并返回空对象，不会报错
——这可能表现为"文件已写但没生效"的直观感受 [@ref-codebuff-settings-path]。可用入口：每会话日志
（项目 `debug/` 与每会话目录下的 `log.jsonl`；`--clear-logs` 在启动前清理）
[@ref-codebuff-cli-logs]；官方排障文档给出 `~/.config/manicode` 下删除本地二进制后重启、以及
`codebuff --version` 核对版本的自更新流程 [@ref-codebuff-doc-troubleshoot-config]。改动 `.agents`、
`mcp.json` 或 Skills 后需要重启 CLI（启动时一次性加载）
[@ref-codebuff-cli-startup][@ref-codebuff-knowledge-select]。已知不一致：文档站说 home 目录优先读
`~/.knowledge.md`，而实现只接受点号开头的 `.AGENTS.md`/`.CLAUDE.md`
[@ref-codebuff-doc-knowledge-home][@ref-codebuff-knowledge-home]；项目内 `*.knowledge.md` 虽被
`isKnowledgeFile` 认作知识文件，但"每目录选一个"的选择器只在 `AGENTS.md`/`CLAUDE.md` 里挑
[@ref-codebuff-knowledge-constants][@ref-codebuff-knowledge-select]。缺口：没有"查看实际生效来源"的
命令。按 partial 阅读 [@ref-codebuff-cli-logs]。
