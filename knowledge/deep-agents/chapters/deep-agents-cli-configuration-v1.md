---
schema_version: 3
record_kind: production
edition_id: deep-agents-cli-configuration-v1
harness_id: deep-agents
topic: configuration
title: "Deep Agents CLI 配置机制：来源作用域、优先级合并、信任边界与诊断迁移"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-deep-agents-config-sources, ref-deep-agents-config-resolve-doc, ref-deep-agents-config-inspect-doc, ref-deep-agents-config-dotenv-doc, ref-deep-agents-config-managed-doc, ref-deep-agents-config-home-doc]
  - section_id: config-merge
    surface_ids: [cli]
    source_refs: [ref-deep-agents-config-ranks, ref-deep-agents-config-union-paths, ref-deep-agents-config-merge-core, ref-deep-agents-config-merge-strategy, ref-deep-agents-config-threat, ref-deep-agents-config-resolve-doc]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-deep-agents-config-ranks, ref-deep-agents-config-resolve-doc, ref-deep-agents-config-dotenv-doc, ref-deep-agents-config-home-doc]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-deep-agents-config-writer-guard, ref-deep-agents-config-threat, ref-deep-agents-config-managed-doc, ref-deep-agents-config-dotenv-doc]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-deep-agents-config-defaults, ref-deep-agents-config-resolve-doc, ref-deep-agents-config-managed-doc]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-deep-agents-config-architecture, ref-deep-agents-config-doctor, ref-deep-agents-config-resolve-doc, ref-deep-agents-config-inspect-doc, ref-deep-agents-config-migration-env, ref-deep-agents-config-deprecated-key, ref-deep-agents-config-threat]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-deep-agents-config-sources, ref-deep-agents-config-resolve-doc, ref-deep-agents-config-inspect-doc, ref-deep-agents-config-dotenv-doc, ref-deep-agents-config-managed-doc, ref-deep-agents-config-home-doc]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-merge
        status: answered
        source_refs: [ref-deep-agents-config-ranks, ref-deep-agents-config-union-paths, ref-deep-agents-config-merge-core, ref-deep-agents-config-merge-strategy, ref-deep-agents-config-threat, ref-deep-agents-config-resolve-doc]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-deep-agents-config-ranks, ref-deep-agents-config-resolve-doc, ref-deep-agents-config-dotenv-doc, ref-deep-agents-config-home-doc]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-deep-agents-config-writer-guard, ref-deep-agents-config-threat, ref-deep-agents-config-managed-doc, ref-deep-agents-config-dotenv-doc]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-deep-agents-config-defaults, ref-deep-agents-config-resolve-doc, ref-deep-agents-config-managed-doc]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-deep-agents-config-migration-env, ref-deep-agents-config-deprecated-key]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-deep-agents-config-architecture, ref-deep-agents-config-doctor, ref-deep-agents-config-resolve-doc, ref-deep-agents-config-inspect-doc, ref-deep-agents-config-threat]
---

## 配置来源与作用域 {#config-sources}

注：catalog 为该 surface 登记的参考页是 Deep Agents overview（`https://docs.langchain.com/oss/python/deepagents/overview`），该页描述 Python SDK 的 `create_deep_agent`，不描述 CLI；本页因此改用官方 CLI 文档树与固定提交的 `libs/code` 源码作为固定来源。

本主题的固定来源是 deep-agents CLI（`dcode`）在提交 `c9b2ce194e422d2a61b9faf3732da15d90623c13` 的 `libs/code` 源码，以及官方文档页 `configuration`、`config-file` 与 `cli-reference`。PyPI 上已弃用的 `deepagents-cli` 部署工具不是本 surface 的 CLI，本文不涉及；Python SDK（`create_deep_agent`）是底层 harness，其配置入口也不在本页。

`dcode` 的键值配置只有少数几个固定入口，且进程真正合并的 TOML 快照只有“托管层”和“用户层”两份：`configuration/service.py` 的 `get_config_sources` 就是按这一签名取两份快照 [@ref-deep-agents-config-sources]。

| 作用域 | 位置 | 判定方式 |
|---|---|---|
| 用户 profile | `~/.deepagents/config.toml` | 模块常量 `DEFAULT_CONFIG_PATH`；`DEEPAGENTS_HOME` 可整体搬迁该 profile [@ref-deep-agents-config-sources] |
| 用户全局 dotenv | `~/.deepagents/.env` | 所有项目共用的环境变量回退 [@ref-deep-agents-config-dotenv-doc] |
| 项目 dotenv | 从启动目录向上查找的第一个 `.env` | 项目级；随仓库分发，按不可信输入处理 [@ref-deep-agents-config-dotenv-doc] |
| 托管（管理员） | 各操作系统固定路径的 `managed_config.toml` | 只读、优先级最高，见信任小节 [@ref-deep-agents-config-managed-doc] |
| 进程环境 | 继承的 shell 环境 | 运行时实时读取，不是文件 [@ref-deep-agents-config-resolve-doc] |
| CLI 参数 | 当前 argv | 解析完成后安装为独立 provider 档 [@ref-deep-agents-config-resolve-doc] |

官方文档把用户配置的位置总结为 profile 目录加项目级 dotfile：`DEEPAGENTS_HOME` 未设置时 profile 默认 `~/.deepagents/`，`config.toml`、全局 `.env`、`.mcp.json`、`hooks.json`、`extensions/` 以及 per-agent 目录都在其中 [@ref-deep-agents-config-home-doc]。托管设置来自固定的系统路径，并且在解析顺序中排在用户环境变量与 `config.toml` 之前 [@ref-deep-agents-config-resolve-doc]。

需要明确的负面结论：**不存在项目级 `config.toml`**。provider 链只有托管、CLI、环境、用户 `config.toml`、内置默认五档，没有“项目 `config.toml`”这一档；项目维度只通过项目 `.env`、项目 Hook/MCP 文件与项目信任参与，键值配置始终读用户 profile 的那一份 `config.toml` [@ref-deep-agents-config-dotenv-doc]。固定提交里检索 `--config` 只命中 `client/launch/server.py` 中给 `langgraph dev` 子进程构造的参数，那是服务器配置路径，不是“换一个用户配置文件”的开关。

管理员策略可以改从远端加载：本地 `managed_config.toml` 只写 `[managed_config].source = "https://config.example.com/dcode-policy.toml"`，远端文档整体成为策略，且不能再指向另一个来源 [@ref-deep-agents-config-managed-doc]。

`dcode config path` 会逐行列出已知位置及存在状态：`managed config`、`config.toml`、project `.env`、global `.env`、`hooks.json` 与托管状态；当 `startup.read_project_dotenv` 关闭时，project `.env` 一行显示为 `disabled` 而不是“可用来源” [@ref-deep-agents-config-inspect-doc]。

## 优先级与合并规则 {#config-merge}

解析按数值 rank，**数值越小越强**；rank 是源码常量，用户无法改写 [@ref-deep-agents-config-ranks]。

| rank | 档位 | 来源 |
|---|---|---|
| 200 | managed | `managed_config.toml`（或远端策略） |
| 300 | CLI | 本次 argv |
| 350 | reload | 会话内保留的重载值 |
| 400 | environment | 实时 `os.environ` |
| 500 | user | `~/.deepagents/config.toml` |
| 1000 | default | manifest 内置默认 |

官方文档给出的通用顺序与此一致：托管配置 → `DEEPAGENTS_CODE_` 前缀环境变量 → 规范环境变量 → 用户 `config.toml` → 内置默认（350 档只出现在代码中，文档未单列）[@ref-deep-agents-config-resolve-doc]。

每个选项在 manifest 上声明一种合并策略：`replace`（默认）、`union`、`deep_merge` [@ref-deep-agents-config-merge-strategy]。

- **replace**：取第一个有值的档位。若某档是 durable 档（托管、用户文件、默认值），它会把比它弱的非 durable 档置为 masked；遮蔽是单向的，持久化的用户值不会反过来盖住更高优先级的实时环境值 [@ref-deep-agents-config-ranks]。
- **union**：只用于拒绝名单式列表。各层按 rank 从弱到强累积并去重；任一层不是列表式值就退化为“最强档整体替换”。更强的层若放不进名单（类型不对），会被直接忽略而不是清空低层名单——这是 fail-closed [@ref-deep-agents-config-merge-core]。
- **deep_merge**：多个映射档逐层深合并；某一层不是映射时退化为最强档替换 [@ref-deep-agents-config-merge-strategy]。

对象、数组、空值的处理：

- 嵌套表（对象）递归深合并，同名字段各自按优先级决定 [@ref-deep-agents-config-merge-core]。
- 数组默认**整体替换**；例外只有两个累积路径：`mcp.disabled_project_servers` 与 `mcp.disabled_servers`，它们按并集累积、低优先级在前、按值去重 [@ref-deep-agents-config-union-paths]。
- 托管层的显式 allow/trust 列表（例如 `[models].allowed`）**整体替换**低层授权，而不是并集 [@ref-deep-agents-config-threat]。
- 空值与删除标记：TOML 没有 `null`，合并实现只区分“表对表递归”“表遇标量则标量替换”“叶子互相覆盖”三种情形，源码中不存在“删除键”语义；撤销一个键就是删掉它，让解析回落到下一档 [@ref-deep-agents-config-merge-core]。

托管层的形状规则是上述规则的加强版：类型不符的托管标量被跳过，低优先级值继续生效；托管标量可在任意深度替换冲突的用户表，避免用户靠改键的形状绕开策略 [@ref-deep-agents-config-threat]。

## 环境变量、CLI 参数与 profile {#config-runtime}

**环境变量档（400）始终是实时的**：环境 provider 每次解析都读进程环境，因为 dotenv 引导和每次切换工作目录都会改写进程环境；这与文件档的“一代快照”不同 [@ref-deep-agents-config-ranks]。

dotenv 的加载顺序与覆盖关系 [@ref-deep-agents-config-dotenv-doc]：

1. 从启动目录向上走，取**最近的**项目 `.env`（先找到者胜）。
2. 全局 `~/.deepagents/.env` 兜底。
3. shell 中已经导出的值始终压过 `.env`（dotenv 以“不覆盖已存在值”的方式注入）。

也就是项目 `.env` 胜全局 `.env`，两者都胜不过 shell 导出。`startup.read_project_dotenv`（或 `DEEPAGENTS_CODE_READ_PROJECT_DOTENV`）可整体跳过项目 `.env`，只保留全局那一份；该开关自身从托管配置、环境变量、用户 `config.toml` 解析，这些都先于项目 `.env` 生效，所以项目 `.env` 无法把自己打开或关掉 [@ref-deep-agents-config-dotenv-doc]。

`DEEPAGENTS_CODE_` 前缀既命名本产品专属变量，也作为任意变量的覆盖槽：解析时先看 `DEEPAGENTS_CODE_{NAME}`，它排在规范的 `{NAME}` 之前，因此同名变量总是前者生效 [@ref-deep-agents-config-resolve-doc]。

dotenv 中被禁用的键（可能改变可执行文件查找、解释器或 shell 启动、Git 行为与信任设置的变量）一律忽略，例如 profile 与信任根（`DEEPAGENTS_HOME`、`DEEPAGENTS_HOME_IS_DEFAULT`、`DEEPAGENTS_CODE_READ_PROJECT_DOTENV`）、动态链接器（`LD_PRELOAD`、`LD_LIBRARY_PATH`、`LD_AUDIT` 等）、解释器启动路径（`PATH`、`PYTHONHOME`、`PYTHONPATH` 等）、shell 启动钩子（`BASH_ENV`、`ENV` 等）、凭据提示劫持（`GIT_ASKPASS`、`SSH_ASKPASS`）以及 `GIT_*` 注入系列；项目 `.env` 还额外不能设置 `DEEPAGENTS_CODE_DANGEROUSLY_ENABLE_PROJECT_MCP_SERVERS`、`DEEPAGENTS_CODE_FORKED_SUBAGENTS`、`TERM_PROGRAM` 等，这些只能写在 shell 或全局 `.env` [@ref-deep-agents-config-dotenv-doc]。

**CLI 参数何时介入**：argv 在 `argparse` 之后安装为 rank 300 的 provider，因此它强于环境变量与用户文件，但弱于托管策略 [@ref-deep-agents-config-ranks]。所以 `--recursion-limit`、`--model` 这类会话参数只在本进程内覆盖文件值，而管理员在托管层钉住的值仍会获胜：`runtime.recursion_limit` 的 managed 值高于 `--recursion-limit`，flag 又高于 `DEEPAGENTS_CODE_RECURSION_LIMIT` 与 `[runtime].recursion_limit`，与上表的 rank 顺序一致 [@ref-deep-agents-config-ranks]。

**profile 的含义**：`DEEPAGENTS_HOME` 选择整个用户 profile 目录，未设置时默认 `~/.deepagents`；`config.toml`、全局 `.env`、`.mcp.json`、`hooks.json`、`extensions/` 以及 `.state/` 下的会话与凭据都随之搬迁 [@ref-deep-agents-config-home-doc]。它被归入“profile 与信任根”一组禁键，只能来自继承的 shell 环境，任何 `.env` 都不得设置它，否则项目控制的 `.env` 就能把信任根搬到自己控制的文件上 [@ref-deep-agents-config-dotenv-doc]。注意 `~/.agents/skills/` 这一工具无关别名按启动 home 解析，不随 `DEEPAGENTS_HOME` 迁移 [@ref-deep-agents-config-home-doc]。

## 信任边界与管理员策略 {#config-trust}

托管策略是唯一能压过环境变量与 CLI 参数的档位，其规则在源码威胁模型中逐条给出 [@ref-deep-agents-config-threat]：

- 解析器只读一个固定的操作系统路径；写入器显式拒绝该路径并返回“managed config is read-only”，所以托管层是按代码只读，而不只是约定 [@ref-deep-agents-config-writer-guard]。
- 有效托管值优先级最高；表深合并、拒绝名单取并集、显式 allow/trust 列表整体替换下层授权。
- `[models].allowed` 是本地模型上限，条目为精确 `provider:model` 或 `provider:*` 通配；校验发生在凭据桥接、provider hook、导入与构造之前，被拦下的规格不会触碰任何已存密钥。
- 强制键（`startup.mode`、`startup.yolo_switcher`、`shell.allow_list`、`skills.extra_allowed_dirs`、`interpreter.enable_interpreter`、`interpreter.ptc`、`interpreter.ptc_acknowledge_unsafe`、`models.allowed`、`models.auto_classifier`、`runtime.recursion_limit`、`sandboxes.default`、`tracing.langsmith_redact`）一旦托管值无法应用，就停止除诊断命令外的所有命令并阻塞 `/reload`，因为跳过它会让用户的 flag 或环境变量重新生效。
- 存在但不可读、不可解码或语法损坏的托管文件，会阻塞除 `--help`、`--version`、`help`、`config`、`doctor`、`auth path` 之外的所有命令（含 `/reload`）；使用配置的命令以退出码 78 结束 [@ref-deep-agents-config-threat][@ref-deep-agents-config-managed-doc]。
- 缺失文件被接受且不施加任何策略；一次失败的 `/reload` 保留最后一代可强制执行的快照，策略不会在会话中途被悄悄丢弃。

固定路径按操作系统不同，全部由管理员部署、`dcode` 只读 [@ref-deep-agents-config-managed-doc]：

| 操作系统 | 路径 |
|---|---|
| macOS | `/Library/Application Support/dcode/managed_config.toml` |
| Linux | `/etc/dcode/managed_config.toml` |
| Windows | ProgramData 下的 `dcode\managed_config.toml` |

Windows 上用注册表定位 ProgramData，不读 `%ProgramData%` 环境变量；注册表不可用且回退路径也没有文件时，命令无法判断管理员是否配置了策略，于是停止而不是按“无策略”运行 [@ref-deep-agents-config-managed-doc]。

远端策略：本地文件只放 `[managed_config].source`，URL 必须是 HTTPS、不含凭据/查询串/片段、不超过 2048 个 ASCII 字符；请求不跟随重定向、不使用代理环境变量、不落盘，5 秒总超时、最大 1 MiB，且必须返回完整 TOML [@ref-deep-agents-config-managed-doc]。

项目信任：项目 `.env` 随仓库分发，被视为不可信输入；文档明确警告在不可信项目目录中运行会把进程环境与执行内容暴露给项目控制的文件（`.env`、`Makefile`、构建脚本），并建议改用远程沙箱 [@ref-deep-agents-config-dotenv-doc]。项目级 Hook、MCP server 与 Python 扩展另需各自的信任授权或显式 flag，属对应主题，不在本节展开。

## 默认值来源 {#config-defaults}

内置默认在最弱档（rank 1000）才生效，顺序上是托管 → 环境 → 用户 `config.toml` → 内置默认 [@ref-deep-agents-config-resolve-doc]。它有两个来源：

- manifest 静态默认：每个 `ConfigOption` 声明 `default`，由 rank 1000 的默认 provider 提供。数值类常量集中在 `config_manifest.py` 顶部，是选项、中间件与解析器共用的单一事实来源，并有测试钉住三者不漂移 [@ref-deep-agents-config-defaults]。
- 无静态默认的开关：`BOOL_MODE_DEFAULT` 一类选项不允许声明 `default`，其默认值在解析时由 debug 或 experimental 模式现场推导 [@ref-deep-agents-config-defaults]。

代码常量的默认值与边界示例 [@ref-deep-agents-config-defaults]：

| 键 | 默认值 | 边界与行为 |
|---|---|---|
| `interpreter.enable_interpreter` | `True` | 仅本地会话接线 |
| `interpreter.timeout_seconds` | `5.0` | 每次调用 |
| `interpreter.memory_limit_mb` | `64` | 会话内共享 |
| `interpreter.max_ptc_calls` | `256` | 每次调用 |
| `interpreter.max_result_chars` | `4000` | 截断前上限 |
| `interpreter.ptc` | `"safe"` | 只读预设 `read_file`/`glob`/`grep` |
| `models.auto_classifier_timeout` | `20.0` | 1–300，越界被拒并回落 |
| `mcp.tool_timeout` | `120.0` | 1–900，越界被拒并回落 |

平台差异主要体现在托管配置的定位：路径随操作系统变化，Windows 的 ProgramData 由注册表决定 [@ref-deep-agents-config-managed-doc]。

用户改变默认值的方式就是在 `~/.deepagents/config.toml` 写同名键，或在 shell / `.env` 中设对应环境变量；这两层都能覆盖内置默认，而 CLI 参数与托管策略仍可再覆盖它们 [@ref-deep-agents-config-resolve-doc]。

## 生效核对、重载与迁移 {#config-diagnostics}

**查看实际生效来源**：`dcode config` 命令组在不启动会话的情况下报告每项的当前值与来源档，来源档的语义与解析顺序一致（托管 → 环境 → 用户 `config.toml` → 默认）[@ref-deep-agents-config-resolve-doc]。

| 命令 | 作用 |
|---|---|
| `dcode config`（`config show`） | 列出每个设置、当前值及其来源 |
| `dcode config get KEY` | 单个键或前缀的值与来源，如 `interpreter.memory_limit_mb` |
| `dcode config path` | 各配置文件位置及存在状态（含 managed、project/global `.env`、`hooks.json`） |
| `--verbose` / `--all` | 追加描述、默认值以及该键可在哪里设置 |
| `--json` | 机器可读输出；与 `--verbose` 合用还带类型等参考信息 |

凭据类选项只报告 `configured` / `not configured`，命令绝不打印其值 [@ref-deep-agents-config-inspect-doc]。

**“文件已写但没有生效”的成因与观察方式**：配置在首次读取时构建为一份进程级 generation，之后复用，通过共享解析器读取的人都看到同一代，不会就同一设置互相矛盾。运行中编辑 `config.toml` 在该代前进之前不生效，而代的前进只发生在两处——对默认配置路径的应用内写入（写回即自刷新），以及 `/reload`；每个来源保留自己最后一份可用快照，所以解析失败的文件只会让那一档维持原状而不是被清空。应用**不监听**文件变更，因为半套生效的配置比“过期但一致”更糟 [@ref-deep-agents-config-architecture]。

**`dcode doctor`** 不启动会话，直接给出各档健康度 [@ref-deep-agents-config-doctor]：

- `Managed config` 行给出位置（远端策略会再显示 URL）、解析健康、被拒绝的强制键与被忽略的键；刷新失败但仍沿用上一代时明确写出“仍在执行最后一次可读到的策略”，避免被读成“没有策略在生效”。
- `Config file` 行给出用户 `config.toml` 的位置与**解析**健康：文件存在但解析失败会被显式标出，并提示其中每个选项都会回落到默认值——这正是“设置不生效”最常见的成因。
- 同节还会输出 `Data directory`，以及在无法解析 home 时把 profile 安全检查标为 skipped，避免把未检查当成通过。

**迁移与弃用**：

- 旧环境变量 `DEEPAGENTS_CODE_ENABLED_PROJECT_MCP_SERVERS` 已被移除但保留为迁移侦测：设置它不会生效，而是给出指向 `DEEPAGENTS_CODE_DANGEROUSLY_ENABLE_PROJECT_MCP_SERVERS` 的迁移提示 [@ref-deep-agents-config-migration-env]。
- 旧键 `[mcp].enabled_project_servers` 是弃用的扁平项目 MCP 白名单，在 `config.toml` 中被忽略，替代品是 `mcp.enabled_project_server_approvals` [@ref-deep-agents-config-deprecated-key]。
- 用户 `config.toml` 不可用时只丢用户层，托管策略仍然生效 [@ref-deep-agents-config-threat]。
