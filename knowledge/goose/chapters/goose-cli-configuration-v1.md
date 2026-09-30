---
schema_version: 3
record_kind: production
edition_id: goose-cli-configuration-v1
harness_id: goose
topic: configuration
title: "Goose CLI 配置机制：来源、覆盖、运行时、信任、默认与迁移"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-example, ref-goose-config-doc-files, ref-goose-config-doc-observability, ref-goose-config-doc-overview, ref-goose-config-doc-searchpaths, ref-goose-config-doc-slash, ref-goose-config-src-config-dir, ref-goose-config-src-pathroot, ref-goose-config-src-permission-file, ref-goose-config-src-secrets, ref-goose-config-src-system, ref-goose-plugin-src-settings-files, ref-goose-providers-src-dir]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-priority, ref-goose-config-doc-security, ref-goose-config-src-envname, ref-goose-config-src-getparam, ref-goose-config-src-merge, ref-goose-config-src-secret, ref-goose-config-src-set, ref-goose-config-src-sources-order]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-provider, ref-goose-config-env-advanced, ref-goose-config-env-basic, ref-goose-config-env-network, ref-goose-config-env-passthrough, ref-goose-config-env-security, ref-goose-config-env-tools, ref-goose-config-src-cli-flags, ref-goose-config-src-cli-model, ref-goose-config-src-cli-noprofile, ref-goose-perms-doc-settings]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-goose-allowlist-doc, ref-goose-config-env-enterprise, ref-goose-config-src-cli-flags, ref-goose-config-src-cli-serve, ref-goose-config-src-permission-corrupt, ref-goose-config-src-permission-file, ref-goose-perms-doc-tool]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-settings, ref-goose-config-src-defaults, ref-goose-config-src-extdefaults, ref-goose-config-src-init, ref-goose-config-src-migration-platform, ref-goose-config-src-migration-provider, ref-goose-config-src-migrations, ref-goose-mcp-src-sse]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-configure, ref-goose-config-doc-security, ref-goose-config-doc-updating, ref-goose-config-src-cli-info, ref-goose-config-src-getparam, ref-goose-config-src-pathroot, ref-goose-config-src-secret]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-goose-config-doc-example, ref-goose-config-doc-files, ref-goose-config-doc-observability, ref-goose-config-doc-overview, ref-goose-config-doc-searchpaths, ref-goose-config-doc-slash, ref-goose-config-src-config-dir, ref-goose-config-src-pathroot, ref-goose-config-src-permission-file, ref-goose-config-src-secrets, ref-goose-config-src-system, ref-goose-plugin-src-settings-files, ref-goose-providers-src-dir]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-goose-config-doc-priority, ref-goose-config-doc-security, ref-goose-config-src-envname, ref-goose-config-src-getparam, ref-goose-config-src-merge, ref-goose-config-src-secret, ref-goose-config-src-set, ref-goose-config-src-sources-order]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-goose-config-doc-provider, ref-goose-config-env-advanced, ref-goose-config-env-basic, ref-goose-config-env-network, ref-goose-config-env-passthrough, ref-goose-config-env-security, ref-goose-config-env-tools, ref-goose-config-src-cli-flags, ref-goose-config-src-cli-model, ref-goose-config-src-cli-noprofile, ref-goose-perms-doc-settings]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: partial
        source_refs: [ref-goose-allowlist-doc, ref-goose-config-env-enterprise, ref-goose-config-src-cli-flags, ref-goose-config-src-cli-serve, ref-goose-config-src-permission-corrupt, ref-goose-config-src-permission-file, ref-goose-perms-doc-tool]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-goose-config-doc-settings, ref-goose-config-src-defaults, ref-goose-config-src-extdefaults, ref-goose-config-src-init, ref-goose-config-src-migration-platform, ref-goose-config-src-migration-provider, ref-goose-config-src-migrations, ref-goose-mcp-src-sse]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-goose-config-doc-settings, ref-goose-config-src-defaults, ref-goose-config-src-extdefaults, ref-goose-config-src-init, ref-goose-config-src-migration-platform, ref-goose-config-src-migration-provider, ref-goose-config-src-migrations, ref-goose-mcp-src-sse]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-goose-config-doc-configure, ref-goose-config-doc-security, ref-goose-config-doc-updating, ref-goose-config-src-cli-info, ref-goose-config-src-getparam, ref-goose-config-src-pathroot, ref-goose-config-src-secret]
---

本节固定来源：仓库 `block/goose` 提交 `ac15f938` 的官方配置文档与 Rust 源码快照（`crates/goose/src/config/*`、`crates/goose-cli/src/cli.rs`）。快照未包含 `config/experiments.rs`、`config/mod.rs` 与 `goose-cli/src/commands/{info,doctor,configure}.rs`，涉及它们的结论均标注为未验证。文档快照不含适用软件版本号。

## 配置来源与路径 {#config-sources}

配置文件与其它持久状态都放在同一个 config 目录下，由 directories crate 的 app 策略解析（顶层域与作者 `Block`、应用名 `goose`；注释说明保留 `Block` 是为兼容既有安装目录），设置绝对路径的 `GOOSE_PATH_ROOT` 时整体改到该根下 [@ref-goose-config-src-config-dir]。

| 文件 | 路径 | 内容 | 来源 |
| --- | --- | --- | --- |
| 用户主配置 | `CONFIG_DIR/config.yaml`（macOS/Linux `~/.config/goose/config.yaml`，Windows `%APPDATA%\Block\goose\config\config.yaml`） | provider、扩展、通用设置 | [@ref-goose-config-doc-files] |
| 系统配置 | Unix `/etc/goose/config.yaml`；Windows `%PROGRAMDATA%\goose\config.yaml`（回退 `C:\ProgramData\goose\config.yaml`） | 最低优先级层 | [@ref-goose-config-src-system] |
| 附加层 | `GOOSE_ADDITIONAL_CONFIG_FILES`（OS 路径列表，`env::split_paths` 解析） | 插在系统层与用户层之间 | [@ref-goose-config-src-system] |
| 密钥 | `CONFIG_DIR/secrets.yaml` | 钥匙串不可用/被禁用时的明文密钥 | [@ref-goose-config-src-secrets] |
| 工具权限 | `CONFIG_DIR/permission.yaml` | 由 `goose configure` 写入 | [@ref-goose-config-src-permission-file] |
| 运行时权限决策 | `CONFIG_DIR/permissions/tool_permissions.json` | 自动管理 | [@ref-goose-config-doc-files] |
| 提示模板 | `CONFIG_DIR/prompts/` | 自定义提示模板 | [@ref-goose-config-doc-files] |
| 自定义 provider | `CONFIG_DIR/custom_providers/*.json` | 见 Custom providers 主题 | [@ref-goose-providers-src-dir] |
| 插件设置 | 用户 `~/.config/goose/settings.json`；项目 `PROJECT/.config/goose/settings.json` 与 `settings.local.json` | `enabledPlugins`/`disabledPlugins` | [@ref-goose-plugin-src-settings-files] |

`GOOSE_PATH_ROOT` 只在值是**绝对路径**时生效，空值或相对路径被忽略 [@ref-goose-config-src-pathroot]；生效时各子目录为 `ROOT/config`、`ROOT/data`、`ROOT/state`、`ROOT/.agents/plugins`、`ROOT/.agents/agents` [@ref-goose-config-src-config-dir]。

官方文档把配置来源概括为「YAML 配置文件为主，环境变量可覆盖，配置文件提供持久化偏好」，并列出 Desktop 的 Settings 页与 CLI 的 `goose configure` 两个图形/交互入口 [@ref-goose-config-doc-overview]。

同一个 `config.yaml` 还承载三类约定键：搜索路径 `GOOSE_SEARCH_PATHS`（扩展命令的 PATH 前置目录）[@ref-goose-config-doc-searchpaths]；观测导出 `otel_exporter_otlp_endpoint` 与 `otel_exporter_otlp_timeout` [@ref-goose-config-doc-observability]；recipe 斜杠命令 `slash_commands: [{command, recipe_path}]` [@ref-goose-config-doc-slash]。文档给出的完整示例把 provider、模型、工具、recipe 仓库、文档根、搜索路径、安全开关与 `extensions` 放在同一文件，可作为字段组合的参照 [@ref-goose-config-doc-example]。

## 分层合并与优先级 {#config-overrides}

读取顺序是「环境变量 → 合并后的配置文件 → 默认值」[@ref-goose-config-doc-priority]。源码里的 `get_param` 实现与之相符：先把键名转大写查环境变量（命中即返回），否则读合并后的配置文件，都没有就报 `NotFound` [@ref-goose-config-src-getparam]。环境变量的值先按 JSON 解析，再按 `true`/`false`、整数、浮点、字符串依次尝试 [@ref-goose-config-src-getparam]。命名约定是「配置键 snake_case，环境变量用同名的全大写形式」，例如 `openai_api_key` 对应 `OPENAI_API_KEY`；goose 自有键建议加 `goose_` 前缀避免冲突 [@ref-goose-config-src-envname]。

配置文件之间的合并规则：只有 `extensions` 与 `providers` 两个键做**一层深合并**（逐条目、逐字段覆盖，缺失的条目插入），其余键整体替换；没有 `null` 删除或数组拼接语义 [@ref-goose-config-src-merge]。附加层与系统层都参与这份合并，用户配置是最后（优先级最高）的一层，也是唯一的写入目标 [@ref-goose-config-src-sources-order]。写操作（`set_param`/`update_param`/`delete`）只改写入目标文件，不会写回环境变量，也不会把低优先级层的值固化下来 [@ref-goose-config-src-set]。

密钥另走一条解析链：环境变量（大写键名）优先，其次系统钥匙串；`GOOSE_DISABLE_KEYRING` 被设置（或配置里同名键为 `true`/`"true"`/`"1"`）时改用 `secrets.yaml`；钥匙串不可用时报一次警告、把 `GOOSE_DISABLE_KEYRING=1` 写进进程环境并回落到文件存储 [@ref-goose-config-src-secret]。`get_secrets(primary, others)` 的行为是「主键存在于环境变量则其余键也从环境变量取，否则全部走密钥存储」 [@ref-goose-config-src-secret]。

文档给出的优先级表述与源码一致（环境变量 > 配置文件 > 默认值）[@ref-goose-config-doc-priority]，并特别提醒：provider 的 API key **不写进 `config.yaml`**，写在里面会被忽略并表现为 `No api key passed in` 之类鉴权失败；密钥应放钥匙串（`goose configure`）或 `secrets.yaml`，也可用 provider 自己的环境变量（优先级高于已存密钥）[@ref-goose-config-doc-security]。

## 运行时覆盖：环境变量、CLI 参数与开关 {#config-runtime}

* `GOOSE_PROVIDER` / `GOOSE_MODEL` 仍是受支持的环境变量，会覆盖该进程的配置文件值；旧配置里扁平的这两个键会被读取并在更新时迁移 [@ref-goose-config-doc-provider]。
* CLI 的 `--provider` 与 `--model` 覆盖本次运行的 `GOOSE_PROVIDER`/`GOOSE_MODEL`（帮助文本原文：`Override the GOOSE_PROVIDER environment variable for this run`）[@ref-goose-config-src-cli-model]。
* 会话级标志：`--with-extension`、`--with-streamable-http-extension`（可带 `timeout=N`）、`--with-builtin`，以及 `--no-profile`（不加载默认扩展，只用命令行指定的扩展）[@ref-goose-config-src-cli-noprofile]。
* 其它运行期覆盖：`--debug`、`--max-tool-repetitions`、`--max-turns`、`--container`；`goose serve` 的 `--tls`/`--tls-cert-path`/`--tls-key-path` 会回落到配置键 `GOOSE_TLS`/`GOOSE_TLS_CERT_PATH`/`GOOSE_TLS_KEY_PATH` [@ref-goose-config-src-cli-flags]。
* 环境变量目录：基本 provider 配置（`GOOSE_PROVIDER`、`GOOSE_MODEL`、`GOOSE_TEMPERATURE`、`GOOSE_MAX_TOKENS`、`GOOSE_CACHE_TTL`）[@ref-goose-config-env-basic]；高级 provider 配置（`GOOSE_PROVIDER__TYPE`、`GOOSE_PROVIDER__HOST`、`GOOSE_PROVIDER__API_KEY`）[@ref-goose-config-env-advanced]；工具与会话行为（`GOOSE_MODE`、`GOOSE_TOOLSHIM`、`GOOSE_CLI_MIN_PRIORITY`、`GOOSE_SEARCH_PATHS`、`GOOSE_SHELL` 等）[@ref-goose-config-env-tools]；网络（`GOOSE_OAUTH_CALLBACK_PORT`、HTTP 代理）[@ref-goose-config-env-network]；安全（`GOOSE_ALLOWLIST`、`GOOSE_DISABLE_KEYRING`、`SECURITY_PROMPT_*`）[@ref-goose-config-env-security]。
* 缺口：仓库里存在 `--no-profile` 这个唯一与「profile」相关的开关，但**没有命名 profile 机制**；`config/experiments.rs` 不在本次签出范围，环境变量文档里出现的「Toggle Experiment」也只在交互菜单文案中出现，因此功能开关（feature flag）机制未确立 [@ref-goose-config-src-cli-noprofile] [@ref-goose-perms-doc-settings]。
* 环境变量透传：开发者扩展的 `shell` 工具继承会话的环境变量，因此依赖环境配置的已鉴权 CLI 调用与构建流程可以直接工作 [@ref-goose-config-env-passthrough]。

## 信任、许可与受限项 {#config-trust}

* **工具权限**：`permission.yaml` 按分类（`user`、`smart_approve`）维护 `always_allow`/`ask_before`/`never_allow` 三个列表；查询顺序是 never_allow 优先，其次 always_allow，最后 ask_before。文件损坏时 goose 会直接拒绝启动（`Refusing to start with corrupted permission config`）[@ref-goose-config-src-permission-file] [@ref-goose-config-src-permission-corrupt]。权限等级与权限模式（auto/approve/chat/smart_approve）的配合见 MCP 章节与官方权限文档 [@ref-goose-perms-doc-tool]。
* **扩展允许清单**：`GOOSE_ALLOWLIST` 指向一个列出允许的扩展命令的 YAML；设置后只安装清单内的扩展命令，未设置则不加限制；清单在首次需要时抓取并缓存，每次重启重新抓取 [@ref-goose-allowlist-doc]。实现模块不在本次签出范围，匹配细节未验证。
* **密钥与钥匙串**：见「分层合并」一节的密钥链；无人值守环境（如 ACP 客户端）建议禁用钥匙串并用环境变量提供凭据，否则 macOS 上的钥匙串授权提示可能长时间阻塞 [@ref-goose-config-src-cli-flags]。
* **服务端入口**：`goose serve` 必须提供 `GOOSE_SERVER__SECRET_KEY`，除非显式传 `--dangerously-unauthenticated`（文档只建议用于本机可信客户端）[@ref-goose-config-src-cli-serve]。

缺口：固定来源中**没有**「项目信任（project trust）」或组织策略下发配置的机制——没有源码文件、也没有文档章节描述按项目询问是否信任其配置。文档对「企业环境」的处理方式是给出一组常用入口（网络与基础设施、安全与隐私、合规与监控），而不是一个策略文件或托管配置通道 [@ref-goose-config-env-enterprise]。因此本项目对「项目级配置是否需要批准」不给出结论，只记录在已检查的入口（`config/`、插件设置、权限文件、允许清单）中未发现该机制。

## 默认值、初始化与配置迁移 {#config-defaults}

默认值来自三处：

1. `config_value!` 宏声明的键级默认值（例如 `CLAUDE_CODE_COMMAND="claude"`、`CODEX_COMMAND="codex"`、`CODEX_ENABLE_SKILLS="true"`、`CODEX_SKIP_GIT_CHECK="false"`、`CHATGPT_CODEX_REASONING_EFFORT="medium"`）；两参数形式（无默认值）只生成访问器，取不到时返回错误，例如 `GOOSE_SEARCH_PATHS`、`GOOSE_MODE`、`GOOSE_DEFAULT_EXTENSION_TIMEOUT` [@ref-goose-config-src-defaults]。
2. 扩展相关常量：默认扩展 `developer`、默认超时 `300` 秒、默认描述空串、默认展示名 `Developer` [@ref-goose-config-src-extdefaults]。
3. 首次运行初始化：可从「工作区或可执行文件根目录」下的 `init-config.yaml` 载入默认值，仅在配置文件**不存在**时写入 [@ref-goose-config-src-init]。

文档侧的默认值表（如 `GOOSE_MODE` 默认 `"auto"`、`GOOSE_MAX_TURNS` 默认 1000、`GOOSE_AUTO_COMPACT_THRESHOLD` 默认 0.8、`SECURITY_PROMPT_ENABLED` 默认 false、`GOOSE_TELEMETRY_ENABLED` 默认 false）以官方配置页为准 [@ref-goose-config-doc-settings]；本快照未包含 `config/mod.rs`，`GooseMode` 的 `Default` 实现无法在源码侧核对。

迁移在读取链路里自动执行，分两类 [@ref-goose-config-src-migrations]：

* **读路径迁移**（每次 `load`/`get_param` 都会跑，非破坏性）：只做平台扩展条目对齐（按宿主已知的平台扩展定义重写 description/display_name，保留 `enabled` 与 `available_tools`，已经是 `builtin` 类型的不会被改成 `platform`）[@ref-goose-config-src-migration-platform]。
* **写入路径迁移**（`load_write_config`，读完成后若发生改动会立即保存）：额外执行 provider 迁移——把旧的扁平 `GOOSE_PROVIDER`/`GOOSE_MODEL` 与所有 `*_configured` 标记改写成 `active_provider` 加 `providers:` 块（`enabled`/`configured` 置真，`model` 只写给当前激活的 provider），随后删除扁平键；`providers:` 已存在时只补齐 `active_provider` 并清理残留扁平键。该迁移是幂等的，且被**排除在读路径之外**，因为删除扁平键会影响仍直接读取它们的调用方 [@ref-goose-config-src-migration-provider]。

弃用项：`type: sse` 的扩展不会被迁移，只在配置警告里提示「迁移到 streamable_http」[@ref-goose-mcp-src-sse]。

## 诊断：查看生效值、重载与改而不生效 {#config-diagnostics}

* `goose info`：显示版本、配置文件位置、会话存储与日志位置；`-v/--verbose` 显示详细配置（含 `config.yaml` 内容），`--check` 测试 provider 连接并显示状态 [@ref-goose-config-src-cli-info]。文档把 `goose info -v` 描述为「显示全部生效设置及其当前值」，并作为改完配置后的核对手段 [@ref-goose-config-doc-updating]。
* `goose doctor`：`Check that your Goose setup is working`（命令与分发存在，实现文件不在签出范围）[@ref-goose-config-src-cli-info]。
* `goose configure`：交互式改 provider、扩展、goose settings（模式、工具权限、工具输出、最大轮次、实验开关、recipe 仓库、scheduler 类型等）[@ref-goose-config-doc-configure]。
* 改而不生效的常见原因：直接编辑配置文件后，**已存在的会话**不会重新加载，需要重启 goose 才生效；通过 Settings 保存的 provider 凭据会刷新 provider 清单，但当前聊天会话仍用它启动时的 provider 实例 [@ref-goose-config-doc-updating]。API key 写进 `config.yaml` 会被忽略并表现为鉴权失败 [@ref-goose-config-doc-security]。

排查顺序（按本章证据）：先用 `goose info -v` 确认实际读到的配置文件与值，再检查是否有同名环境变量覆盖文件（环境变量优先）[@ref-goose-config-src-getparam]，再检查 `GOOSE_PATH_ROOT` 是否把配置目录整体改走 [@ref-goose-config-src-pathroot]，密钥类问题再看钥匙串/`secrets.yaml` 与 `GOOSE_DISABLE_KEYRING` [@ref-goose-config-src-secret]。

缺口：`goose info -v` 与 `goose doctor` 的具体输出条目其实现文件不在本次签出范围，因此「先打印哪一层来源」「是否显示被环境变量覆盖的原始值」等细节未验证。
