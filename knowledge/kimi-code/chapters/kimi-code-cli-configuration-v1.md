---
schema_version: 3
record_kind: production
edition_id: kimi-code-cli-configuration-v1
harness_id: kimi-code
topic: configuration
title: "Kimi Code CLI 的配置机制：来源、优先级、默认值、信任、迁移与排错"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-kimi-code-config-location, ref-kimi-code-data-root, ref-kimi-code-env-home, ref-kimi-code-src-bootstrap, ref-kimi-code-data-layout, ref-kimi-code-data-sessions, ref-kimi-code-config-project-local, ref-kimi-code-overrides-priority, ref-kimi-code-src-local-toml, ref-kimi-code-config-tui]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-kimi-code-overrides-doc, ref-kimi-code-overrides-env, ref-kimi-code-overrides-priority, ref-kimi-code-env-switches, ref-kimi-code-src-deepmerge, ref-kimi-code-overrides-credentials, ref-kimi-code-config-models, ref-kimi-code-config-secondary, ref-kimi-code-overrides-cli, ref-kimi-code-cmd-options, ref-kimi-code-cmd-flags, ref-kimi-code-env-model]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-kimi-code-cmd-doctor, ref-kimi-code-config-top, ref-kimi-code-config-loop-control, ref-kimi-code-config-thinking, ref-kimi-code-config-background, ref-kimi-code-config-subagent, ref-kimi-code-config-swarm, ref-kimi-code-env-switches, ref-kimi-code-config-watch, ref-kimi-code-config-identity]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-kimi-code-mcp-config, ref-kimi-code-env-switches, ref-kimi-code-agents-locations, ref-kimi-code-plugins-security, ref-kimi-code-config-permission, ref-kimi-code-overrides-priority]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-kimi-code-migration-doc, ref-kimi-code-migration-what, ref-kimi-code-legacy-stub, ref-kimi-code-legacy-pyproject, ref-kimi-code-cmd-subcommands, ref-kimi-code-slash-builtin-skills, ref-kimi-code-config-thinking]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kimi-code-cmd-doctor, ref-kimi-code-slash-session, ref-kimi-code-config-watch, ref-kimi-code-env-switches, ref-kimi-code-env-home, ref-kimi-code-slash-info, ref-kimi-code-slash-account, ref-kimi-code-env-logs, ref-kimi-code-data-layout, ref-kimi-code-data-clearing]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-kimi-code-config-location, ref-kimi-code-data-root, ref-kimi-code-env-home, ref-kimi-code-src-bootstrap, ref-kimi-code-data-layout, ref-kimi-code-data-sessions, ref-kimi-code-config-project-local, ref-kimi-code-overrides-priority, ref-kimi-code-src-local-toml, ref-kimi-code-config-tui]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-kimi-code-overrides-doc, ref-kimi-code-overrides-env, ref-kimi-code-overrides-priority, ref-kimi-code-env-switches, ref-kimi-code-src-deepmerge, ref-kimi-code-overrides-credentials, ref-kimi-code-config-models, ref-kimi-code-config-secondary, ref-kimi-code-overrides-cli, ref-kimi-code-cmd-options, ref-kimi-code-cmd-flags, ref-kimi-code-env-model]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: partial
        source_refs: [ref-kimi-code-overrides-doc, ref-kimi-code-overrides-env, ref-kimi-code-overrides-priority, ref-kimi-code-env-switches, ref-kimi-code-src-deepmerge, ref-kimi-code-overrides-credentials, ref-kimi-code-config-models, ref-kimi-code-config-secondary, ref-kimi-code-overrides-cli, ref-kimi-code-cmd-options, ref-kimi-code-cmd-flags, ref-kimi-code-env-model]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-kimi-code-cmd-doctor, ref-kimi-code-config-top, ref-kimi-code-config-loop-control, ref-kimi-code-config-thinking, ref-kimi-code-config-background, ref-kimi-code-config-subagent, ref-kimi-code-config-swarm, ref-kimi-code-env-switches, ref-kimi-code-config-watch, ref-kimi-code-config-identity]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-kimi-code-mcp-config, ref-kimi-code-env-switches, ref-kimi-code-agents-locations, ref-kimi-code-plugins-security, ref-kimi-code-config-permission, ref-kimi-code-overrides-priority]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: answered
        source_refs: [ref-kimi-code-migration-doc, ref-kimi-code-migration-what, ref-kimi-code-legacy-stub, ref-kimi-code-legacy-pyproject, ref-kimi-code-cmd-subcommands, ref-kimi-code-slash-builtin-skills, ref-kimi-code-config-thinking]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-kimi-code-cmd-doctor, ref-kimi-code-slash-session, ref-kimi-code-config-watch, ref-kimi-code-env-switches, ref-kimi-code-env-home, ref-kimi-code-slash-info, ref-kimi-code-slash-account, ref-kimi-code-env-logs, ref-kimi-code-data-layout, ref-kimi-code-data-clearing]
---

Kimi Code CLI 把长期偏好写进 `~/.kimi-code/` 下的 TOML：运行时设置放 `config.toml`，终端 UI 偏好放同目录的 `tui.toml` [@ref-kimi-code-config-doc]。本章固定来源是固定 commit 上的 `docs/en/configuration/{config-files,overrides,env-vars,data-locations}.md`、`docs/en/guides/migration.md`、`docs/en/reference/*` 与 `packages/agent-core-v2/src/app/{bootstrap,config}`、`persistence/backends/node-fs`。

## 配置来源与路径 {#config-sources}

| 文件 | 路径 | 作用域 |
| --- | --- | --- |
| 运行时配置 | `$KIMI_CODE_HOME/config.toml`（默认 `~/.kimi-code/config.toml`） | 用户级，首次运行自动创建 |
| 终端 UI 偏好 | `$KIMI_CODE_HOME/tui.toml` | 用户级，`/config`、`/theme`、`/editor` 会写它 |
| 项目本地配置 | `<项目根>/.kimi-code/local.toml` | 项目级，含 `[workspace] additional_dir` |
| 用户 MCP 声明 | `$KIMI_CODE_HOME/mcp.json` | 用户级（详见 MCP 章） |
| 全局指令 | `$KIMI_CODE_HOME/AGENTS.md`、`$KIMI_CODE_HOME/SYSTEM.md` | 用户级（详见自定义 Agent 章） |

- 数据根默认是 `~/.kimi-code/`（macOS/Linux/Windows 各自解析到对应 home：`/Users/用户名/.kimi-code`、`/home/用户名/.kimi-code`、`C:\Users\用户名\.kimi-code`），配置文件名始终是 `config.toml`，与目录位置无关 [@ref-kimi-code-config-location] [@ref-kimi-code-data-root]。
- `KIMI_CODE_HOME` 覆盖数据根：设置后配置、会话、日志、OAuth 凭据、Kimi 专属用户技能、全局 `AGENTS.md` 全部落到新路径下；源码的解析顺序是「显式参数 > `KIMI_CODE_HOME` > `osHome + /.kimi-code`」，配置文件路径即「数据根 + `/config.toml`」[@ref-kimi-code-env-home] [@ref-kimi-code-src-bootstrap]。
- 数据根的最小布局 [@ref-kimi-code-data-layout]：

```text
$KIMI_CODE_HOME
├── config.toml
├── tui.toml
├── AGENTS.md
├── mcp.json
├── skills/
├── plugins/{installed.json, managed/}
├── credentials/{名称.json, mcp/}
├── sessions/目录键/会话 id/
├── logs/kimi-code.log
└── user-history/md5(工作目录).jsonl
```

- 会话数据按 `sessions/目录键/会话 id/` 存放，另有顶层 `session_index.jsonl` 索引；会话目录内含 `state.json`、`agents/main/`（`wire.jsonl`、`plans/`）、子 Agent 目录、`tasks/` 与 `cron/` [@ref-kimi-code-data-sessions]。
- **没有项目级 `config.toml`**：CLI 只读一个用户级配置文件，需要按项目隔离时把 `KIMI_CODE_HOME` 指向不同数据目录。项目级只有 `.kimi-code/local.toml`，它由 `/add-dir` 选择「为项目记住该目录」时自动创建，用于 `[workspace] additional_dir`（绝对路径数组），建议加入项目的 `.gitignore` [@ref-kimi-code-config-project-local] [@ref-kimi-code-overrides-priority]。
- 项目根的定义是「向上找到的第一个含 `.git` 的目录」，实现与 `local.toml` 的写入路径一致 [@ref-kimi-code-src-local-toml] [@ref-kimi-code-config-project-local]。
- TOML 字段名一律 snake_case；键里含 `.` 必须加引号（`[models."gpt-4.1"]`），否则 TOML 会当作嵌套表分隔符 [@ref-kimi-code-config-location]。
- `tui.toml` 在首次运行按默认值创建，文件损坏时回退默认值并给出提示而不是启动失败；字段覆盖主题、布局、LaTeX 渲染、通知、自动更新、状态栏等 [@ref-kimi-code-config-tui]。

## 作用域优先级与合并 {#config-overrides}

三处可以影响运行时参数：配置文件、命令行选项、环境变量。它们不是一条简单优先级链，而是分工不同的三种来源 [@ref-kimi-code-overrides-doc]：

- **配置文件**：长期偏好（模型、密钥、循环控制等），每次启动生效。
- **命令行选项**：仅对本次启动生效，退出即丢弃。
- **环境变量**：主要处理数据目录定位、OAuth 端点切换与少量运行期开关，**不是配置字段的通用兜底机制** [@ref-kimi-code-overrides-env]。

普通运行参数的优先级从高到低是：命令行选项 > 用户配置文件。少数环境变量显式覆盖对应字段（例如 `KIMI_CODE_BACKGROUND_KEEP_ALIVE_ON_EXIT` 高于 `[background].keep_alive_on_exit`），这些例外在字段说明与 Runtime switches 表中逐个标注 [@ref-kimi-code-overrides-priority] [@ref-kimi-code-env-switches]。

合并语义（源码为准，文档未单独成节）[@ref-kimi-code-src-deepmerge]：

- 两个值都是普通对象时按同名键递归合并，子对象逐键覆盖，其余键保留。
- 非对象值（标量、数组）直接整体替换，不做逐元素合并；裸 `null` 不是「删除标记」，没有文档化的删除约定。
- 明确的例外：provider 凭据（`api_key` / `api_key_env` 二选一，且不回退到 shell 环境变量）、`[models.别名.overrides]` 用来在 provider 模型刷新后保留用户覆盖（不接受身份/路由字段）、以及 `[secondary_model]` 段不会被自动改写 [@ref-kimi-code-overrides-credentials] [@ref-kimi-code-config-models] [@ref-kimi-code-config-secondary]。

```toml
# 依据 configuration/config-files.md 的 Model overrides 一节
[models."kimi-code/kimi-for-coding"]
provider = "managed:kimi-code"
model = "kimi-for-coding"
max_context_size = 262144

[models."kimi-code/kimi-for-coding".overrides]
max_context_size = 131072
display_name = "Kimi for Coding (custom)"
```

命令行选项及其互斥规则（启动即拒绝冲突组合）[@ref-kimi-code-overrides-cli] [@ref-kimi-code-cmd-options] [@ref-kimi-code-cmd-flags]：

| 选项 | 作用 |
| --- | --- |
| `-S, --session [id]` | 恢复指定会话；不带 id 进入交互选择 |
| `-c, --continue` | 恢复当前工作目录下最近的会话 |
| `-m, --model 别名` | 本次启动使用指定模型别名 |
| `-p, --prompt 提示` | 非交互执行单条提示后退出 |
| `--output-format text\|stream-json` | 仅与 `-p` 同用 |
| `-y, --yolo` / `--auto` | Ask When Needed / Never Ask 权限模式 |
| `--plan` | 以 Plan 模式启动 |
| `--skills-dir DIR` | 替换自动发现的技能目录（可重复，仅本次会话） |
| `--agent NAME` / `--agent-file PATH` | 指定主 Agent（互斥，且不能与恢复类选项同用） |
| `--add-dir DIR` | 追加工作区目录（可重复） |

- 冲突规则：`--continue` 与 `--session` 互斥；`--yolo` 与 `--auto` 互斥；`--prompt` 不能与 `--yolo`、`--auto`、`--plan` 同用；`--output-format` 只能配 `--prompt` [@ref-kimi-code-cmd-flags]。
- 环境变量的三类角色：定位配置文件（`KIMI_CODE_HOME`，先于其它解析）、运行期开关（如 `KIMI_DISABLE_TELEMETRY`，语义是「额外关闭」而不是普通覆盖）、运行期端点与诊断（`KIMI_CODE_OAUTH_HOST`、`KIMI_CODE_BASE_URL`、`KIMI_LOG_LEVEL` 等）[@ref-kimi-code-overrides-env]。
- `KIMI_MODEL_*` 家族是唯一能在不改配置文件的情况下换模型的通道：设置 `KIMI_MODEL_NAME` 时在内存中合成临时 provider 与模型别名，优先于 `default_model`，但 `-m` 仍然最高 [@ref-kimi-code-env-model]。
- 固定来源没有描述 profile（配置档）机制：配置文件、命令行与环境变量之外，没有第三类可切换的命名配置集 [@ref-kimi-code-overrides-doc]。

## 默认值、首次运行与功能开关 {#config-defaults}

- 缺失的默认文件「按内置默认值处理」：`kimi doctor` 会把缺失的默认文件报为跳过而不是错误，说明内置默认值可以生效 [@ref-kimi-code-cmd-doctor]。
- 顶层字段的默认值（节选，完整表见固定文档的 Top-level fields 一节）[@ref-kimi-code-config-top]：

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `default_model` | string | — | 默认模型别名，必须在 `models` 中定义 |
| `default_permission_mode` | string | `manual` | 新会话默认权限模式：`manual`、`yolo`、`auto` |
| `default_plan_mode` | boolean | `false` | 新会话是否默认进入 Plan 模式 |
| `merge_all_available_skills` | boolean | `true` | 是否合并所有可用目录的技能 |
| `extra_skill_dirs` / `extra_agent_dirs` | array | — | 追加的技能 / agent 搜索目录 |
| `builtin_product_skills` | boolean | `true` | 是否把描述 Kimi Code 自身的内置技能提供给模型 |
| `telemetry` | boolean | `true` | 匿名遥测；只有显式 `false` 才关闭 |
| `auto_session_title` | boolean | `true` | 是否允许客户端自动生成会话标题 |

- 子表各有自己的默认值，例如 `[loop_control] max_attempts_per_step = 10`、`compaction_max_attempts = 5`；`[thinking] enabled = true`、`keep = "all"`；`[background] keep_alive_on_exit = false`、`kill_grace_period_ms = 5000`、`bash_task_timeout_s = 600`、`print_background_mode = "steer"`；`[subagent] timeout_ms` 与 `[swarm] timeout_ms` 默认 7200000 [@ref-kimi-code-config-loop-control] [@ref-kimi-code-config-thinking] [@ref-kimi-code-config-background] [@ref-kimi-code-config-subagent] [@ref-kimi-code-config-swarm]。
- 平台与运行时差异通过环境变量表达而不是配置文件分支：Windows 上 Git Bash 路径可用 `KIMI_SHELL_PATH` 覆盖；`CI` 非空且不为 `0` 时禁用主题探测并回退深色主题；`NO_COLOR` / `FORCE_COLOR` 控制颜色输出 [@ref-kimi-code-env-switches]。
- 文件监视开关 `[watch] enabled`（默认 `true`，可被 `KIMI_CODE_WATCH` 覆盖）决定是否挂载文件系统监视器；关掉之后 `config.toml`、`local.toml`、`AGENTS.md`、技能与 MCP 配置的改动都不会被自动拾取，直到重启 [@ref-kimi-code-config-watch]。
- `[identity]` 可用 `name`（agent 自称的显示名，填充 `${product_name}`）与 `slug`（协议字段标识，省略时由 name 派生）定制身份；两字段可用 `KIMI_CODE_IDENTITY_NAME` / `KIMI_CODE_IDENTITY_SLUG` 覆盖且不回写配置，适合容器与 CI [@ref-kimi-code-config-identity]。

```toml
# 依据 configuration/config-files.md 的 identity 一节
[identity]
name = "Acme Dev Agent"
slug = "acme-dev"
```

## 项目信任与权限 {#config-trust}

- 工作区信任：项目级 MCP server 出现在未受信任目录时，会随信任提示展示每个 server 的传输方式与启动目标（提示默认选中「信任此文件夹」），确认后才为该工作区启用；无头运行（如 `kimi -p`）无法弹提示，项目级 MCP server 默认保持禁用，除非工作区已被信任，或用 `KIMI_CODE_TRUST_WORKSPACE=1` 为本次进程标记信任（不写持久记录）[@ref-kimi-code-mcp-config] [@ref-kimi-code-env-switches]。
- 信任模型也被明确记录在 agent 文件一章：项目级 agent 文件来自仓库本身，命名 `agent.md` 并声明 `override: true` 可替换默认主 Agent 的整个 system prompt，`coder.md` + `override: true` 可替换默认子 Agent 类型；与作为参考数据注入的 `AGENTS.md` 不同，override 文件**就是** system prompt，且没有 `tools` 列表时保留全部工具。因此在陌生仓库里应先审阅 `.kimi-code/agents/` 与 `.agents/agents/` 再运行 [@ref-kimi-code-agents-locations]。
- 插件路径同样受限制：所有路径在符号链接解析后必须仍在插件根内，不安全路径与损坏清单只出现在 `/plugins info` 诊断里 [@ref-kimi-code-plugins-security]。
- 权限与配置是两套控制：`[permission] dangerous_command_guard = false` 可整体关闭内置危险命令策略（Always Ask 与 Ask When Needed 模式下不再确认，Never Ask 模式本就不启用该策略），可用 `KIMI_CODE_DANGEROUS_COMMAND_GUARD=false` 覆盖；`[[permission.rules]]` 按顺序匹配，第一条命中生效 [@ref-kimi-code-config-permission]。
- 固定来源没有描述组织级策略或集中式配置下发：可见的作用域只有用户级文件、项目级 `local.toml` 与信任提示，没有企业策略入口 [@ref-kimi-code-overrides-priority]。

## 迁移、弃用与兼容 {#config-migration}

- 从旧版 Python 版 kimi-cli 迁移到 Node.js 版 Kimi Code CLI：首次运行 `kimi` 时会检查 `~/.kimi/` 下的旧数据并弹出迁移提示（可立即迁移、稍后或不再询问），也可随时手动运行 `kimi migrate` [@ref-kimi-code-migration-doc]。
- 迁移内容：配置（`config.toml`）、MCP server 配置、输入历史与用户选择的聊天会话；**不迁移** OAuth 登录凭据与 MCP 服务授权（需重新 `/login` 并重新授权），旧版插件也不在迁移范围内 [@ref-kimi-code-migration-what]。
- 迁移不修改或删除 `~/.kimi/` 下的旧数据，旧 CLI 照常可用，二者互不干扰；迁移可以重复执行，已迁移过的会话不会被重复导入。迁移后从旧版导入的会话在会话列表中标记 `[imported]` [@ref-kimi-code-migration-what]。
- 本仓库固定来源里还登记了旧版仓库的对应 commit：其 `kimi-code` PyPI 包自 1.51.0 起只打印迁移指引，包描述明确写着它不是新版 Kimi Code CLI [@ref-kimi-code-legacy-stub]；旧仓库的 `pyproject.toml` 也标注为 archived、不再维护 [@ref-kimi-code-legacy-pyproject]。因此旧仓库的机制描述不能当作本产品的行为。
- 子命令入口：`kimi` 提供 `login`、`acp`、`web`、`doctor`、`export`、`migrate`、`upgrade`、`provider` 等子命令，`kimi migrate` 即交互式迁移 [@ref-kimi-code-cmd-subcommands]。
- 其他工具的导入：内置技能 `/import-from-cc-codex` 可把 Claude Code 与 Codex 的指令、技能与 MCP 设置导入 Kimi Code [@ref-kimi-code-slash-builtin-skills]。
- 配置键弃用：`default_thinking`（0.21.0 起）与 `thinking.mode`（0.21.0 起）被 `[thinking] enabled` 取代；`loop_control.max_retries_per_step` 与 `loop_control.max_steps_per_run`（0.32.0 起）分别被 `max_attempts_per_step`、`max_steps_per_turn` 取代，旧键被忽略并在启动时告警，需要在 `config.toml` 中改名 [@ref-kimi-code-config-thinking]。
- 固定来源没有提供通用配置版本号或自动升级（migration）框架：已知的兼容规则只有上述「旧键忽略 + 启动告警」与「首次运行提示迁移旧版数据」两条 [@ref-kimi-code-migration-doc]。

## 诊断与排错 {#config-diagnostics}

- 校验文件：`kimi doctor` 在不启动 TUI、不修改文件的前提下校验 `config.toml` 与 `tui.toml`（默认检查 `KIMI_CODE_HOME` 下的文件）；`kimi doctor config [path]`、`kimi doctor tui [path]` 可只校验一份并用显式路径替换默认文件。显式路径必须存在；全部合法或被跳过时退出码 `0`，任一请求的文件缺失或非法时退出码 `1` [@ref-kimi-code-cmd-doctor]。
- 重新加载：`/reload` 重新加载当前会话并应用最新的 `config.toml` 与 `tui.toml` 设置（providers、models 等）而无需重启；`/reload-tui` 只重载 `tui.toml` 的 UI 偏好 [@ref-kimi-code-slash-session]。
- 「文件已写但没有生效」的常见原因与对应入口 [@ref-kimi-code-config-watch] [@ref-kimi-code-env-switches] [@ref-kimi-code-env-home]：`[watch] enabled = false` 或 `KIMI_CODE_WATCH=0` 关闭了监视器（需重启）；进程启动后环境变量不再变化（`api_key_env` 指向的变量需要重启 `kimi`/TUI 进程）；`tui.toml` 只影响 UI，`/reload` 才会重新读取；改的是另一份数据根下的文件（`KIMI_CODE_HOME` 与默认路径不一致）。
- 实际生效来源：`/status` 显示版本、模型、工作目录、权限模式等运行时状态，`/usage` 显示 token 与配额，可用来确认会话真正采用的模型与模式；`/experimental` 打开实验特性面板，`/settings`（别名 `/config`）在 TUI 内编辑配置 [@ref-kimi-code-slash-info] [@ref-kimi-code-slash-account]。
- 日志：`KIMI_LOG_LEVEL`（`off`/`error`/`warn`/`info`/`debug`）与文件滚动参数在进程启动时读取一次；全局日志在 `logs/kimi-code.log`，会话级日志在 `<会话目录>/logs/kimi-code.log`，`kimi export` 默认带上全局日志 [@ref-kimi-code-env-logs] [@ref-kimi-code-data-layout]。
- 重置与清理：删数据根即清空全部运行数据；只清部分数据可删除对应文件——重置配置删 `config.toml`，重置 UI 偏好删 `tui.toml`，清会话删 `sessions/` 与 `session_index.jsonl`，清日志删 `logs/`，清 provider 登录态用 `/logout` 或删 `credentials/名称.json`，清 MCP 登录态删 `credentials/mcp/` [@ref-kimi-code-data-clearing]。
