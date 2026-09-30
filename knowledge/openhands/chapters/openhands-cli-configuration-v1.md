---
schema_version: 3
record_kind: production
edition_id: openhands-cli-configuration-v1
harness_id: openhands
topic: configuration
title: "OpenHands CLI 的配置机制：来源、优先级、运行时参数、信任边界与诊断"
sections:
  - section_id: config-scope
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-pyproject, ref-openhands-cli-readme-status, ref-openhands-canvas-boundaries]
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-readme-config, ref-openhands-cli-locations, ref-openhands-cli-cli-settings, ref-openhands-cli-mcp-utils, ref-openhands-cli-entrypoint, ref-openhands-docs-config-where, ref-openhands-docs-cli-config-files, ref-openhands-docs-cli-first-run, ref-openhands-cli-conversation-persistence]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-runtime-config, ref-openhands-cli-env-overrides, ref-openhands-cli-env-flag, ref-openhands-cli-runtime-config2, ref-openhands-cli-skills-context, ref-openhands-cli-setup-agent]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-locations, ref-openhands-cli-cli-settings, ref-openhands-cli-env-overrides, ref-openhands-cli-main-flags, ref-openhands-docs-cli-global-options, ref-openhands-docs-env-naming, ref-openhands-docs-env-core, ref-openhands-docs-env-llm, ref-openhands-docs-config-vars, ref-openhands-docs-cli-env, ref-openhands-sdk-llm-profile-store]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-setup-conversation, ref-openhands-cli-main-flags, ref-openhands-cli-readme-modes, ref-openhands-docs-cli-global-options, ref-openhands-sdk-hooks-executor, ref-openhands-cli-acp-local]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-llm-model, ref-openhands-sdk-llm-fields, ref-openhands-sdk-llm-retry, ref-openhands-sdk-llm-reasoning, ref-openhands-cli-env-overrides, ref-openhands-cli-cli-settings, ref-openhands-cli-entrypoint, ref-openhands-docs-cli-install-methods, ref-openhands-cli-locations]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-openhands-docs-cli-install-methods, ref-openhands-docs-cli-mcp-format, ref-openhands-cli-cli-settings, ref-openhands-sdk-settings-migrations, ref-openhands-sdk-skills-user, ref-openhands-docs-env-deprecated, ref-openhands-docs-config-legacy]
  - section_id: config-modes
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-main-flags, ref-openhands-cli-readme-modes, ref-openhands-cli-entrypoint, ref-openhands-docs-cli-subcommands, ref-openhands-docs-cli-exit-codes, ref-openhands-docs-cli-palette, ref-openhands-docs-cli-global-options]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-locations, ref-openhands-cli-cli-settings, ref-openhands-docs-env-naming, ref-openhands-docs-config-vars, ref-openhands-cli-env-overrides, ref-openhands-cli-runtime-config, ref-openhands-cli-mcp-status, ref-openhands-cli-restart-notice, ref-openhands-cli-settings-tab]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-openhands-cli-readme-config, ref-openhands-cli-locations, ref-openhands-cli-cli-settings, ref-openhands-cli-mcp-utils, ref-openhands-docs-config-where]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-openhands-cli-runtime-config, ref-openhands-cli-env-overrides, ref-openhands-cli-env-flag, ref-openhands-cli-runtime-config2, ref-openhands-cli-setup-agent]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-openhands-cli-locations, ref-openhands-cli-main-flags, ref-openhands-cli-env-overrides, ref-openhands-docs-cli-global-options, ref-openhands-docs-env-core, ref-openhands-docs-cli-env]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-openhands-cli-setup-conversation, ref-openhands-cli-main-flags, ref-openhands-cli-readme-modes, ref-openhands-sdk-hooks-executor, ref-openhands-cli-acp-local]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-openhands-sdk-llm-model, ref-openhands-sdk-llm-fields, ref-openhands-sdk-llm-reasoning, ref-openhands-cli-env-overrides, ref-openhands-cli-cli-settings, ref-openhands-docs-cli-install-methods]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: answered
        source_refs: [ref-openhands-docs-cli-install-methods, ref-openhands-docs-cli-mcp-format, ref-openhands-cli-cli-settings, ref-openhands-sdk-settings-migrations, ref-openhands-sdk-skills-user, ref-openhands-docs-env-deprecated]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-openhands-cli-locations, ref-openhands-cli-cli-settings, ref-openhands-docs-env-naming, ref-openhands-cli-env-overrides, ref-openhands-cli-runtime-config, ref-openhands-cli-restart-notice]
---

## 固定来源与调查范围 {#config-scope}

本页只回答 CLI 界面（`surface_id: cli`）。固定来源：CLI 仓库 `OpenHands/OpenHands-CLI@954f2ba`（包 `openhands` 1.16.0，入口 `openhands` / `openhands-acp`）[@ref-openhands-cli-pyproject]（该仓库已不再积极维护 [@ref-openhands-cli-readme-status]）；配置对象的模型与默认值来自 CLI 依赖的 `openhands-sdk==1.28.1`（本目录固定提交 `edaac806`）[@ref-openhands-cli-pyproject]；产品 Web 端位于另一官方仓库 [@ref-openhands-canvas-boundaries]。官方文档站点页面作为文档快照来源，适用软件版本未知，与源码不一致处会明确标注。

## 配置来源与路径 {#config-sources}

CLI 的配置集中在状态目录 `~/.openhands`（可由环境变量改写），README 明确列出三个文件 [@ref-openhands-cli-readme-config]：

| 文件 | 内容 | 路径决定方式 |
| --- | --- | --- |
| `agent_settings.json` | 序列化后的 Agent：LLM（模型、base URL、密钥、超时、max tokens）、工具、MCP、压缩器、critic 等 | `OPENHANDS_PERSISTENCE_DIR`（默认 `~/.openhands`）[@ref-openhands-cli-locations] |
| `cli_config.json` | CLI/TUI 偏好与 critic 参数 | 读 `PERSISTENCE_DIR`（默认 `~/.openhands`）[@ref-openhands-cli-cli-settings] |
| `mcp.json` | MCP server 列表 | `OPENHANDS_PERSISTENCE_DIR` [@ref-openhands-cli-mcp-utils] [@ref-openhands-cli-locations] |

其他路径由 `locations.py` 统一给出：会话数据 `OPENHANDS_CONVERSATIONS_DIR`（默认 `<状态目录>/conversations`）、工作目录 `OPENHANDS_WORK_DIR`（默认当前目录）、项目目录 `<状态目录>/projects/<工作目录路径的 sha256>/`（内含 `prompt_history.json`）[@ref-openhands-cli-locations]。另外当前目录下的 `.env` 会被加载（`load_dotenv(..., override=False)`，即不覆盖已存在的进程环境），环境变量 `DEBUG` 取 `1`/`true` 才打开调试日志 [@ref-openhands-cli-entrypoint]。

会话自身的状态也在同一状态目录下：会话数据放在 `<状态目录>/conversations/`，恢复旧会话时会优先读取该会话持久化的工具集（`base_state.json`），保证老会话继续用创建时的工具，而不是当前默认工具 [@ref-openhands-cli-conversation-persistence]。

官方文档给出的 V1 配置落点同样是 `~/.openhands` 状态目录 [@ref-openhands-docs-config-where]，CLI 配置文件名清单见命令参考页（其“Configuration Files”小节）[@ref-openhands-docs-cli-config-files]。文档“首次运行”一节把 LLM 设置写成保存到 `~/.openhands/settings.json`，与固定源码的 `agent_settings.json` 命名不同，以源码为准 [@ref-openhands-docs-cli-first-run]。

## 优先级与合并 {#config-overrides}

装载顺序是固定的三段式 [@ref-openhands-cli-runtime-config]：

1. 读磁盘：`agent_settings.json` 反序列化成 Agent（解析失败会打印“配置已损坏”并按无配置处理）[@ref-openhands-cli-runtime-config]。
2. 环境覆盖（可选）：仅当传入 `--override-with-envs` 时生效，且只读 `LLM_API_KEY`、`LLM_MODEL`、`LLM_BASE_URL` 三个变量，做**字段级局部覆盖**（未提供的字段保留磁盘值），覆盖结果不写回磁盘 [@ref-openhands-cli-env-overrides] [@ref-openhands-cli-env-flag]。
3. 运行时配置（总是重新计算，且最后写回 Agent 对象）：工具集、LLM 指标元数据、Agent 上下文（含 Skills）、MCP（重新读 `mcp.json`）、压缩器、critic [@ref-openhands-cli-runtime-config2] [@ref-openhands-cli-skills-context]。

因此“磁盘上写了什么”与“实际生效什么”并不总是一致：工具与 MCP 以磁盘为基础但会被运行时重建覆盖，`llm` 字段则来自磁盘加环境覆盖 [@ref-openhands-cli-runtime-config2]。调用方（如 ACP 客户端）还能在构造 Agent 时传入额外的 MCP server，同名时传入者优先 [@ref-openhands-cli-setup-agent]。

## 环境变量与命令行参数 {#config-runtime}

CLI 自身读取的环境变量（源码可见的全部）：`OPENHANDS_PERSISTENCE_DIR`、`OPENHANDS_CONVERSATIONS_DIR`、`OPENHANDS_WORK_DIR`、`PERSISTENCE_DIR`（仅 CLI 偏好文件使用）、`DEBUG`、`LLM_API_KEY`、`LLM_MODEL`、`LLM_BASE_URL`（后三者需配合 `--override-with-envs`）、以及在云/登录相关命令中的服务器地址变量 [@ref-openhands-cli-locations] [@ref-openhands-cli-cli-settings] [@ref-openhands-cli-env-overrides]。

全局参数（`argparsers/main_parser.py`）：`-v/--version`、`-t/--task`、`-f/--file`、`--resume [ID]`、`--last`、`--headless`（要求 `--task`/`--file`）、`--json`（需配合 `--headless`）、互斥的 `--always-approve`/`--yolo` 与 `--llm-approve`、`--exit-without-confirmation`、`--override-with-envs`；子命令 `acp`、`serve`、`web`、`mcp`、`cloud`、`login`、`logout`、`view` [@ref-openhands-cli-main-flags]。官方文档的“Global Options”表与之一致，并额外说明 `--exp` 为兼容保留、`--headless` 需要任务来源 [@ref-openhands-docs-cli-global-options]。

CLI 没有配置档案（profile）机制：参数表里没有 profile 相关开关，`agent_settings.json` 记录一份当前 Agent，切换模型只能改这份配置或临时用环境覆盖；SDK 侧虽有按名字保存模型的档案存储（`~/.openhands/profiles`），CLI 未接入 [@ref-openhands-cli-main-flags] [@ref-openhands-sdk-llm-profile-store]。

环境变量的通用规则与完整清单在官方参考页：命名约定、核心变量、LLM 变量与云端/沙箱变量分节列出 [@ref-openhands-docs-env-naming] [@ref-openhands-docs-env-core] [@ref-openhands-docs-env-llm]；常用 V1 变量另见配置选项页 [@ref-openhands-docs-config-vars]。CLI 与文档的差别：文档中的多数变量用于 Web/服务端或旧版应用，CLI 只消费上面列出的那几个，其余设置需写入 `agent_settings.json` [@ref-openhands-docs-cli-env]。

## 信任、权限与沙箱边界 {#config-trust}

CLI 没有“项目信任”概念：固定源码中不存在 trust 相关实现或开关，项目目录里的文件（`.agents/skills`、`.openhands/agents`、`.openhands/hooks.json`、`AGENTS.md` 等）在会话建立时会被直接读取并进入上下文 [@ref-openhands-cli-setup-conversation]。权限控制落在**工具动作的确认策略**上：默认逐个动作询问，`--always-approve`（别名 `--yolo`）全部放行、`--llm-approve` 交给 LLM 安全分析器判断，二者互斥 [@ref-openhands-cli-main-flags] [@ref-openhands-cli-readme-modes]；文档对这三种模式的说明一致 [@ref-openhands-docs-cli-global-options]。

Hook 子进程是另一条边界：它继承进程环境，但 `SESSION_API_KEY` 会被剥离，避免把会话密钥透给项目脚本 [@ref-openhands-sdk-hooks-executor]。远程/云执行时，Hook 配置与会话请求一起发往服务端，由服务端执行，本地不再是信任边界 [@ref-openhands-cli-acp-local]。

## 默认值 {#config-defaults}

- LLM 默认值来自 SDK 模型：`model` 默认 `gpt-5.5`、`api_key`/`base_url` 默认空、`usage_id` 默认 `default` [@ref-openhands-sdk-llm-model]；重试 5 次、退避 8/64 秒、请求超时 300 秒、`stream` 默认关闭、`drop_params`/`modify_params` 默认开启 [@ref-openhands-sdk-llm-fields] [@ref-openhands-sdk-llm-retry]；推理强度默认 `high` [@ref-openhands-sdk-llm-reasoning]。
- CLI 侧的环境覆盖默认 base URL 是官方代理 `https://llm-proxy.app.all-hands.dev/`，变量名与警告文案都在同一处定义 [@ref-openhands-cli-env-overrides]。
- CLI 偏好默认值：`default_cells_expanded=False`、`auto_open_plan_panel=True`；critic 默认启用（阈值 0.6 / 0.75，迭代上限 3），headless 模式下 critic 被禁用以免交互式提示 [@ref-openhands-cli-cli-settings] [@ref-openhands-cli-entrypoint]。
- 平台差异：官方安装页要求在 Windows 上通过 WSL 运行 CLI [@ref-openhands-docs-cli-install-methods]；配置文件里没有以平台为条件的默认分支，路径处理使用普通文件系统 API [@ref-openhands-cli-locations]。
- 状态目录不可写时的表现、其他存储后端等未在固定来源中出现 [@ref-openhands-cli-locations]。

## 迁移与兼容 {#config-migration}

- CLI 版本迁移：官方安装页说明从 1.0.0 之前的 CLI 升级需要重做设置，因为配置格式已变 [@ref-openhands-docs-cli-install-methods]；MCP 配置从 TOML 迁移到 JSON 也发生在同一时期，旧的 `config.toml` 形式不再读取 [@ref-openhands-docs-cli-mcp-format]。
- CLI 偏好迁移：`cli_config.json` 支持把旧版顶层 `enable_critic` 等字段迁移到 `critic` 子对象并回写 [@ref-openhands-cli-cli-settings]。
- Agent 配置迁移：SDK 的 AgentSettings 定义了 v0→v4 的逐级迁移（补 `agent_kind`、改写取值、删除旧字段、规范化代理模型名）[@ref-openhands-sdk-settings-migrations]。
- 目录遗留：Skills 仍兼容 `.openhands/skills/` 与 `.openhands/microagents/`，新位置是 `.agents/skills/` [@ref-openhands-sdk-skills-user]。
- 变量遗留：官方参考页把旧版变量集中列在“Deprecated Variables”小节，升级时需要逐项替换 [@ref-openhands-docs-env-deprecated]；文档也说明了需要旧版选项时去哪里查找 [@ref-openhands-docs-config-legacy]。

## 运行模式与子命令 {#config-modes}

默认运行是终端界面（Textual TUI），此时所有参数作用于同一个本地会话；子命令改变宿主行为，而不是改配置 [@ref-openhands-cli-main-flags] [@ref-openhands-cli-readme-modes]：

| 入口 | 作用 | 关键参数 |
| --- | --- | --- |
| `openhands` | 终端界面（默认） | `-t/--task`、`-f/--file`、`--resume [ID]`、`--last`、确认模式三选一 |
| `openhands --headless` | 无界面运行，自动设置“退出不确认”，并禁用 critic 以免交互提示；`--json` 输出 JSONL（必须与 `--headless` 同用，且需要 `--task`/`--file`）[@ref-openhands-cli-entrypoint] | `--headless`、`--json` |
| `openhands web` | 把 CLI 作为 Web 应用提供 | `--host`、`--port`、`--debug` [@ref-openhands-docs-cli-subcommands] |
| `openhands serve` | 用 Docker 启动 Web GUI | `--mount-cwd`、`--gpu` [@ref-openhands-docs-cli-subcommands] |
| `openhands acp` | 以 Agent Client Protocol 服务端运行，供 IDE 调用 | `--always-approve`、`--llm-approve` 等 [@ref-openhands-cli-main-flags] |
| `openhands cloud` / `login` / `logout` | 在 OpenHands Cloud 上创建会话、登录/登出 | `--server-url` [@ref-openhands-docs-cli-subcommands] |
| `openhands mcp ...`、`openhands view ...` | 管理 MCP 配置、查看会话 | 见 MCP 章节 [@ref-openhands-docs-cli-subcommands] |

退出码（文档给出，可用于脚本判断）：`0` 成功、`1` 错误或任务失败、`2` 参数非法 [@ref-openhands-docs-cli-exit-codes]；`--headless` 缺 `--task`/`--file` 时参数解析阶段就会报错退出 [@ref-openhands-cli-entrypoint]。交互界面内的命令（`/new`、`/history`、`/settings`、`/confirm`、`/condense`、`/skills`、`/feedback`、`/exit`）通过命令面板触发 [@ref-openhands-docs-cli-palette]。参数列表见文档全局选项表 [@ref-openhands-docs-cli-global-options]。

## 诊断：文件写了为什么不生效 {#config-diagnostics}

1. 先确认读的是哪个目录：CLI 的 Agent/会话/MCP 使用 `OPENHANDS_PERSISTENCE_DIR`，而 `cli_config.json` 使用 `PERSISTENCE_DIR`，文档又写作 `OH_PERSISTENCE_DIR`——三者不对齐，设置其中一个只会移动部分状态 [@ref-openhands-cli-locations] [@ref-openhands-cli-cli-settings] [@ref-openhands-docs-env-naming] [@ref-openhands-docs-config-vars]。排查时同时检查环境变量与文件实际位置。
2. 确认环境变量是否被忽略：未加 `--override-with-envs` 时 `LLM_*` 变量会被忽略并打印警告；加了才生效，且只覆盖三个字段 [@ref-openhands-cli-env-overrides]。
3. 确认文件可解析：`agent_settings.json` 损坏时 CLI 打印“Agent configuration file is corrupted!”并按无配置继续，表现为设置被重置 [@ref-openhands-cli-runtime-config]；MCP 配置可通过状态查询区分“文件不存在/内容非法/服务器数量” [@ref-openhands-cli-mcp-status]。
4. 确认改动时机：设置界面保存后对**新会话**生效，已有会话会提示“请重启 CLI 使更改生效” [@ref-openhands-cli-restart-notice]；设置界面帮助文本写的“保存后立即生效”与之冲突，以重启提示为准 [@ref-openhands-cli-settings-tab]。
5. 恢复方式：把状态目录整体备份后删除对应文件即可回到首次运行向导；由于默认目录是 `~/.openhands`，也可以临时指向另一个目录做对照实验 [@ref-openhands-cli-locations]。
