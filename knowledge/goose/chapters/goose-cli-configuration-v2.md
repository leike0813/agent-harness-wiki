---
schema_version: 3
record_kind: production
edition_id: goose-cli-configuration-v2
harness_id: goose
topic: configuration
title: "Goose CLI 配置机制：来源、覆盖、运行时、信任、默认与迁移"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-example, ref-goose-config-doc-files, ref-goose-config-doc-observability, ref-goose-config-doc-overview, ref-goose-config-doc-searchpaths, ref-goose-config-doc-slash, ref-goose-config-src-config-dir, ref-goose-config-src-pathroot, ref-goose-config-src-permission-file, ref-goose-config-src-secrets, ref-goose-config-src-system, ref-goose-plugin-src-settings-files, ref-goose-providers-src-dir]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-priority, ref-goose-config-doc-security, ref-goose-config-src-envname, ref-goose-config-src-getparam, ref-goose-config-src-merge, ref-goose-config-src-secret, ref-goose-config-src-set, ref-goose-config-src-sources-order, ref-goose-config-src-tom-message-keys]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-provider, ref-goose-config-env-advanced, ref-goose-config-env-basic, ref-goose-config-env-network, ref-goose-config-env-passthrough, ref-goose-config-env-security, ref-goose-config-env-tools, ref-goose-config-src-cli-flags, ref-goose-config-src-cli-model, ref-goose-config-src-cli-noprofile, ref-goose-config-src-experiments, ref-goose-config-src-experiments-prune, ref-goose-config-src-goose-mode-strict, ref-goose-perms-doc-settings]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-goose-allowlist-doc, ref-goose-config-env-enterprise, ref-goose-config-src-cli-flags, ref-goose-config-src-cli-serve, ref-goose-config-src-permission-corrupt, ref-goose-config-src-permission-file, ref-goose-perms-doc-tool]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-settings, ref-goose-config-src-defaults, ref-goose-config-src-extdefaults, ref-goose-config-src-first-time-mode, ref-goose-config-src-goose-mode-default, ref-goose-config-src-goose-mode-strict, ref-goose-config-src-init, ref-goose-config-src-migration-platform, ref-goose-config-src-migration-provider, ref-goose-config-src-migrations, ref-goose-config-src-mode-dialog, ref-goose-mcp-src-sse]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-configure, ref-goose-config-doc-security, ref-goose-config-doc-updating, ref-goose-config-src-all-values, ref-goose-config-src-cli-info, ref-goose-config-src-doctor, ref-goose-config-src-getparam, ref-goose-config-src-info-check, ref-goose-config-src-info-check-exit, ref-goose-config-src-info-check-ok, ref-goose-config-src-info-verbose, ref-goose-config-src-mode-dialog, ref-goose-config-src-pathroot, ref-goose-config-src-secret]
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
        source_refs: [ref-goose-config-doc-priority, ref-goose-config-doc-security, ref-goose-config-src-envname, ref-goose-config-src-getparam, ref-goose-config-src-merge, ref-goose-config-src-secret, ref-goose-config-src-set, ref-goose-config-src-sources-order, ref-goose-config-src-tom-message-keys]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-goose-config-doc-provider, ref-goose-config-env-advanced, ref-goose-config-env-basic, ref-goose-config-env-network, ref-goose-config-env-passthrough, ref-goose-config-env-security, ref-goose-config-env-tools, ref-goose-config-src-cli-flags, ref-goose-config-src-cli-model, ref-goose-config-src-cli-noprofile, ref-goose-config-src-experiments, ref-goose-config-src-experiments-prune, ref-goose-config-src-goose-mode-strict, ref-goose-perms-doc-settings]
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
        source_refs: [ref-goose-config-doc-settings, ref-goose-config-src-defaults, ref-goose-config-src-extdefaults, ref-goose-config-src-first-time-mode, ref-goose-config-src-goose-mode-default, ref-goose-config-src-goose-mode-strict, ref-goose-config-src-init, ref-goose-config-src-migration-platform, ref-goose-config-src-migration-provider, ref-goose-config-src-migrations, ref-goose-config-src-mode-dialog, ref-goose-mcp-src-sse]
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
        source_refs: [ref-goose-config-doc-configure, ref-goose-config-doc-security, ref-goose-config-doc-updating, ref-goose-config-src-all-values, ref-goose-config-src-cli-info, ref-goose-config-src-doctor, ref-goose-config-src-getparam, ref-goose-config-src-info-check, ref-goose-config-src-info-check-exit, ref-goose-config-src-info-check-ok, ref-goose-config-src-info-verbose, ref-goose-config-src-mode-dialog, ref-goose-config-src-pathroot, ref-goose-config-src-secret]
---

本节固定来源：仓库 `block/goose` 提交 `591edd47` 的官方配置文档与 Rust 源码（`crates/goose/src/config/*`、`crates/goose-provider-types/src/goose_mode.rs`、`crates/goose-cli/src/cli.rs` 与 `crates/goose-cli/src/commands/{configure,info,doctor}.rs`）。上一版 `goose-cli-configuration-v1` 固定在提交 `ac15f938`；本版只改写受本轮提交影响的判断，未变动的段落沿用 v1 的引用与结论，`crates/goose/src/config/{base,paths,permission,extensions,migrations,declarative_providers}.rs` 等文件在该提交未变，引用仍绑定旧快照。文档快照不含适用软件版本号。

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

这条链不只作用于 core 配置键。平台扩展自有的键同样走 `Config::get_param`：Tom 扩展读取 `GOOSE_MOIM_MESSAGE_TEXT` 与 `GOOSE_MOIM_MESSAGE_FILE` 时用的是配置访问器而不是裸环境变量读取，因此这两个键既可以用环境变量设置，也可以写进 `config.yaml` 的同一层 [@ref-goose-config-src-tom-message-keys]。

密钥另走一条解析链：环境变量（大写键名）优先，其次系统钥匙串；`GOOSE_DISABLE_KEYRING` 被设置（或配置里同名键为 `true`/`"true"`/`"1"`）时改用 `secrets.yaml`；钥匙串不可用时报一次警告、把 `GOOSE_DISABLE_KEYRING=1` 写进进程环境并回落到文件存储 [@ref-goose-config-src-secret]。`get_secrets(primary, others)` 的行为是「主键存在于环境变量则其余键也从环境变量取，否则全部走密钥存储」 [@ref-goose-config-src-secret]。

文档给出的优先级表述与源码一致（环境变量 > 配置文件 > 默认值）[@ref-goose-config-doc-priority]，并特别提醒：provider 的 API key **不写进 `config.yaml`**，写在里面会被忽略并表现为 `No api key passed in` 之类鉴权失败；密钥应放钥匙串（`goose configure`）或 `secrets.yaml`，也可用 provider 自己的环境变量（优先级高于已存密钥）[@ref-goose-config-doc-security]。

## 运行时覆盖：环境变量、CLI 参数与开关 {#config-runtime}

* `GOOSE_PROVIDER` / `GOOSE_MODEL` 仍是受支持的环境变量，会覆盖该进程的配置文件值；旧配置里扁平的这两个键会被读取并在更新时迁移 [@ref-goose-config-doc-provider]。
* `GOOSE_MODE` 走的是同一条专用读取路径 `get_goose_mode_strict`：先查 `GOOSE_MODE` 环境变量（按 JSON 解析），未设置才读合并后的配置文件，两处都没有时返回 `ConfigError::NotFound` [@ref-goose-config-src-goose-mode-strict]。
* CLI 的 `--provider` 与 `--model` 覆盖本次运行的 `GOOSE_PROVIDER`/`GOOSE_MODEL`（帮助文本原文：`Override the GOOSE_PROVIDER environment variable for this run`）[@ref-goose-config-src-cli-model]。
* 会话级标志：`--with-extension`、`--with-streamable-http-extension`（可带 `timeout=N`）、`--with-builtin`，以及 `--no-profile`（不加载默认扩展，只用命令行指定的扩展）[@ref-goose-config-src-cli-noprofile]。
* 其它运行期覆盖：`--debug`、`--max-tool-repetitions`、`--max-turns`、`--container`；`goose serve` 的 `--tls`/`--tls-cert-path`/`--tls-key-path` 会回落到配置键 `GOOSE_TLS`/`GOOSE_TLS_CERT_PATH`/`GOOSE_TLS_KEY_PATH` [@ref-goose-config-src-cli-flags]。
* 环境变量目录：基本 provider 配置（`GOOSE_PROVIDER`、`GOOSE_MODEL`、`GOOSE_TEMPERATURE`、`GOOSE_MAX_TOKENS`、`GOOSE_CACHE_TTL`）[@ref-goose-config-env-basic]；高级 provider 配置（`GOOSE_PROVIDER__TYPE`、`GOOSE_PROVIDER__HOST`、`GOOSE_PROVIDER__API_KEY`）[@ref-goose-config-env-advanced]；工具与会话行为（`GOOSE_MODE`、`GOOSE_TOOLSHIM`、`GOOSE_CLI_MIN_PRIORITY`、`GOOSE_SEARCH_PATHS`、`GOOSE_SHELL` 等）[@ref-goose-config-env-tools]；网络（`GOOSE_OAUTH_CALLBACK_PORT`、HTTP 代理）[@ref-goose-config-env-network]；安全（`GOOSE_ALLOWLIST`、`GOOSE_DISABLE_KEYRING`、`SECURITY_PROMPT_*`）[@ref-goose-config-env-security]。
* **功能开关（experiment）机制已确立**：它就是配置键 `experiments`（名字到布尔的映射），读写都经 `get_param`/`set_param`；权威清单是源码常量 `ALL_EXPERIMENTS`，每次读取前先与该清单对齐——清单里的名字按默认值补入，用户清单里不在清单中的名字被移除 [@ref-goose-config-src-experiments] [@ref-goose-config-src-experiments-prune]。当前提交中 `ALL_EXPERIMENTS` 是**空数组**，因此现阶段没有任何实验处于激活状态，用户手写的实验名会在读取时被清掉。交互菜单里的「Toggle Experiment」入口仍然存在 [@ref-goose-perms-doc-settings]。
* 缺口：仓库里存在 `--no-profile` 这个唯一与「profile」相关的开关，但**没有命名 profile 机制**；上文的环境变量清单来自官方文档，本轮未逐键核对源码里是否还有未文档化的环境变量，因此本节不宣称该清单穷尽。
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

`GOOSE_MODE` 的默认值需要分开看：它用两参数形式声明，**没有键级默认值** [@ref-goose-config-src-goose-mode-strict]；实际生效的默认值来自枚举本身——`GooseMode` 的 `Auto` 变体带 `#[default]`，调用方普遍以 `get_goose_mode().unwrap_or_default()` 读取，因此两处都没有该键时结果是 Auto [@ref-goose-config-src-goose-mode-default]。这与文档默认值表里 `GOOSE_MODE` 默认 `"auto"` 的说法一致 [@ref-goose-config-doc-settings]，本轮已在源码侧核对，不再是缺口。

**首次运行会询问 goose mode。** provider 配置完成后，若配置文件存在，goose 会检查 `get_goose_mode()`：能取到值（来自 `GOOSE_MODE` 环境变量或已有配置）就直接跳过；只有返回 `NotFound` 才弹出选择界面，界面说明 Auto 是默认值、可稍后在 `goose configure` 改，选择结果经 `set_goose_mode` 写回配置 [@ref-goose-config-src-first-time-mode]。选择列表是 Auto / Approve / SmartApprove / Chat 四项，初始选中项为 Auto [@ref-goose-config-src-mode-dialog]。这一顺序由单元测试固定：环境变量已设时不弹界面且不创建 `config.yaml`，配置里已有值时保持原值 [@ref-goose-config-src-mode-first-time-tests]。

文档侧的其它默认值（如 `GOOSE_MAX_TURNS` 默认 1000、`GOOSE_AUTO_COMPACT_THRESHOLD` 默认 0.8、`SECURITY_PROMPT_ENABLED` 默认 false、`GOOSE_TELEMETRY_ENABLED` 默认 false）以官方配置页为准 [@ref-goose-config-doc-settings]。

迁移在读取链路里自动执行，分两类 [@ref-goose-config-src-migrations]：

* **读路径迁移**（每次 `load`/`get_param` 都会跑，非破坏性）：只做平台扩展条目对齐（按宿主已知的平台扩展定义重写 description/display_name，保留 `enabled` 与 `available_tools`，已经是 `builtin` 类型的不会被改成 `platform`）[@ref-goose-config-src-migration-platform]。
* **写入路径迁移**（`load_write_config`，读完成后若发生改动会立即保存）：额外执行 provider 迁移——把旧的扁平 `GOOSE_PROVIDER`/`GOOSE_MODEL` 与所有 `*_configured` 标记改写成 `active_provider` 加 `providers:` 块（`enabled`/`configured` 置真，`model` 只写给当前激活的 provider），随后删除扁平键；`providers:` 已存在时只补齐 `active_provider` 并清理残留扁平键。该迁移是幂等的，且被**排除在读路径之外**，因为删除扁平键会影响仍直接读取它们的调用方 [@ref-goose-config-src-migration-provider]。

弃用项：`type: sse` 的扩展不会被迁移，只在配置警告里提示「迁移到 streamable_http」[@ref-goose-mcp-src-sse]。

## 诊断：查看生效值、重载与改而不生效 {#config-diagnostics}

`goose info` 固定打印三段内容 [@ref-goose-config-src-info-verbose]：

* **版本**：`env!("CARGO_PKG_VERSION")`。
* **路径**：`Config dir:`、`Config yaml:`、`Sessions DB (sqlite):`、`Logs dir:`，每条路径后跟一个状态标记——存在时不打印，缺失时向上找到第一个存在的父目录并区分 `missing (can create)`、`missing (read-only parent)`、`missing (cannot check)`、`missing (no writable parent)`。这解释了「配置写在了一个 goose 根本读不到的位置」这类问题。
* **生效配置**（仅 `-v`）：打印 `goose Configuration` 段，内容是 `config.all_values()` 按键排序后的 YAML；没有任何值时打印 `No configuration values set` 并提示运行 `goose configure` [@ref-goose-config-src-info-verbose]。这里有一个重要边界：`all_values()` 取的是**合并后的配置文件**再加上解析后的 `GOOSE_PROVIDER`/`GOOSE_MODEL` [@ref-goose-config-src-all-values]，它不把任意环境变量灌进这份清单，所以「环境变量覆盖了某个键」不会在 `-v` 输出里显式出现——判断覆盖仍要回到「环境变量 > 配置文件」的优先级 [@ref-goose-config-src-getparam]。

`goose info --check` 是真正的连通性检查，而不是只读配置：它解析 provider 与 model、创建 provider 客户端，然后真的发出一条 `Say 'ok'` 的补全请求并计时 [@ref-goose-config-src-info-check]。成功时打印 `Provider:`、`Model:`、`Auth: ok`、`Connection: ok (verified in N.Ns)` [@ref-goose-config-src-info-check-ok]；失败按四类区分——未配置、模型无效、provider 构造失败、provider 请求失败，并且**故意**把「凭据问题」与「provider 构造问题」分成 `Auth: FAILED` 和 `Provider: FAILED` 两个标签，以免把排查方向误导到换 API key [@ref-goose-config-src-info-check-exit]。检查失败时命令返回错误，使 `goose info --check` 可以直接当 CI、安装检查或健康探针的前置验证 [@ref-goose-config-src-info-check-exit]。

`goose doctor` 与上面两个不同：它不打印配置，而是构造一个不落库的交互会话并在其中执行 `/doctor` [@ref-goose-config-src-doctor]。因此它是会话层的诊断入口，具体检查项在会话/agent 层而不在 CLI 命令里 [@ref-goose-config-src-cli-info]。

`goose configure` 交互式改 provider、扩展、goose settings（模式、工具权限、工具输出、最大轮次、实验开关、recipe 仓库、scheduler 类型等）[@ref-goose-config-doc-configure]；其中模式一项的选择初始值是 Auto，与实际默认行为一致 [@ref-goose-config-src-mode-dialog]。

改而不生效的常见原因：直接编辑配置文件后，**已存在的会话**不会重新加载，需要重启 goose 才生效；通过 Settings 保存的 provider 凭据会刷新 provider 清单，但当前聊天会话仍用它启动时的 provider 实例 [@ref-goose-config-doc-updating]。API key 写进 `config.yaml` 会被忽略并表现为鉴权失败 [@ref-goose-config-doc-security]。

排查顺序（按本章证据）：先用 `goose info -v` 确认实际读到的配置文件与值（注意它显示合并结果、不显示环境变量覆盖）[@ref-goose-config-src-info-verbose]，再检查是否有同名环境变量覆盖文件（环境变量优先）[@ref-goose-config-src-getparam]，再检查 `GOOSE_PATH_ROOT` 是否把配置目录整体改走 [@ref-goose-config-src-pathroot]，密钥类问题再看钥匙串/`secrets.yaml` 与 `GOOSE_DISABLE_KEYRING` [@ref-goose-config-src-secret]，最后用 `goose info --check` 区分「配置能读」与「后端真的可用」 [@ref-goose-config-src-info-check]。

剩余缺口：`goose doctor` 实际执行的检查项、以及 `goose info` 之外是否还有别的配置重载入口，本轮未追进会话/agent 层，因此本节仍为 `partial`。
