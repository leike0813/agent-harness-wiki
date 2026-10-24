---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-configuration-v3
harness_id: mistral-vibe
topic: configuration
title: "Mistral Vibe CLI 的配置机制：九层栈、字段级合并与原子写回"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-mv-301-config-layers, ref-mv-301-config-sources, ref-mv-301-config-defaults]
  - section_id: config-merge
    surface_ids: [cli]
    source_refs: [ref-mv-301-config-merge, ref-mv-301-config-toml-write]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-mv-301-config-env, ref-mv-301-config-layers]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-mv-301-config-sources]
  - section_id: config-defaults-migration
    surface_ids: [cli]
    source_refs: [ref-mv-301-config-defaults, ref-mv-301-config-auto-compact, ref-mv-301-config-auto-compact-constants, ref-mv-301-config-migration, ref-mv-301-changelog]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-301-config-fingerprint, ref-mv-301-config-toml-write, ref-mv-301-config-env, ref-mv-301-config-merge]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-mv-301-config-layers, ref-mv-301-config-sources]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-merge
        status: answered
        source_refs: [ref-mv-301-config-merge, ref-mv-301-config-toml-write]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-mv-301-config-env, ref-mv-301-config-layers]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-mv-301-config-sources]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-mv-301-config-defaults, ref-mv-301-config-auto-compact, ref-mv-301-config-auto-compact-constants]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-mv-301-config-migration]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-mv-301-config-fingerprint, ref-mv-301-config-toml-write, ref-mv-301-config-env]
---

本章固定的源码提交是 `mistralai/mistral-vibe` 的 `dd2c04ce717c417731ab89c333cd0a72541e33ba`（变更日志中对应 3.0.1），界面只有 `cli`。这是源码树版本身份，不代表任何已发布分发包。仓库同时包含 Python 前端（`vibe/`）、Rust 前端（`vibe/cli-rust/`）与本地 harness 包（`harness/`）；本章只描述 Python CLI 在这个提交上的配置机制。

## 配置来源与层栈 {#config-sources}

配置被构建成一条有序层栈，每个层要么是 TOML 文件、要么是内存字典，最后按字段合并成一个 `VibeConfigSchema`。层从低到高依次是：schema 默认值 → 模型目录 → GrowthBook 实验 → 用户 TOML → 项目 TOML → `VIBE_*` 环境变量 → 运行时覆盖 → agent profile → 组织强制配置。[@ref-mv-301-config-layers]

| 入口 | 位置 | 生效条件 | 写回目标 |
| :-- | :-- | :-- | :-- |
| 用户 TOML | `$VIBE_HOME/config.toml`（默认 `~/.vibe/config.toml`） | `user` 源启用（CLI 默认） | 是，默认写回目标 |
| 宿主提供的用户配置 | 嵌入方传入的 TOML 字典 | `HarnessFilesManager.user_config` 非空 | 否，改动只留在内存 |
| 项目 TOML | `PROJECT/.vibe/config.toml` | 项目源启用且工作目录受信任 | 是，仅当没有用户层 |
| `--add-dir` 目录 | 各目录根下的 `.vibe/` | 隐式受信任，无需信任提示 | 否 |
| 模型目录 | 运行时拉取的目录缓存 | `experimental_enable_model_catalog` 开启 | 否，只读层 |
| 运行时覆盖 | 内存层（CLI 会话选项） | 总是存在 | 否 |
| agent profile | 内存层 | 选定 agent 时由 AgentManager 填充 | 否 |
| 组织强制 | `${vibe_base_url}/api/v1/code/managed-config` | 组织启用 | 否，只读且永久最高 |

项目层与用户层会**同时**安装（只要各自来源启用），因此受信任的项目文件只覆盖它写到的字段，未写的值仍从用户层继承，两者都高于 GrowthBook 与模型目录。[@ref-mv-301-config-layers] 项目层的开关有两个条件：`sources` 里包含 `project`，且当前工作目录的 `.vibe` 不是用户配置目录本身；工作目录未受信任时项目层完全不参与。[@ref-mv-301-config-sources] 项目文件发现从工作目录逐级向上，直到 `$VIBE_HOME` 的父目录（通常是 home）为止；`--add-dir` 目录只检查自身根目录，不再向上递归。[@ref-mv-301-config-sources]

用户层路径由 `VIBE_HOME` 决定，未设置时是 `~/.vibe`；该目录下还固定放着 `.env`、`hooks.toml`、`agents/`、`skills/`、`plugins/`、`tools/`、`prompts/`、`logs/`、`trusted_folders.toml`。持久化目标按"用户层 → 受信任的项目层 → 内存覆盖层"依次回退。[@ref-mv-301-config-layers]

最低层是 schema 自带的默认值：默认层把 `VibeConfigSchema` 的字段默认实例物化成可合并的字典，因此任何字段在没有更高层提供值时都有确定取值。[@ref-mv-301-config-defaults]

## 字段级合并与优先级 {#config-merge}

合并不是整文件替换。`VibeConfigSchema` 与各 `ConfigFragment` 的每个字段都必须声明一个合并标记（否则类定义阶段直接报错），构建时按标记逐字段合并低优先（base）与高优先（override）两个方向的值。[@ref-mv-301-config-merge]

| 标记 | 语义 | 使用它的字段举例 |
| :-- | :-- | :-- |
| `WithReplaceMerge` | 高层整体替换低层 | `active_model`、`allowed_models`、`enabled_tools`、`default_agent`、各布尔开关、`auto_compact_threshold` |
| `WithConcatMerge` | 列表拼接，低层在前 | `disabled_tools`、`tool_paths`、`skill_paths`、`agent_paths`、`enabled_agents`、`disabled_agents`、`installed_agents`、`enabled_skills`、`disabled_skills`、`applied_migrations` |
| `WithUnionMerge(merge_key)` | 按 key 并集，同 key 高层胜 | `providers`、`mcp_servers`、`connectors`（key 均为 `name`） |
| `WithDeepMerge` | 字典递归合并 | `models`（按 alias）、`tools`（按工具名） |
| `WithShallowMerge` | 只覆盖出现过的键 | `compaction_model`、`vision_model`、`utility_models`、`project_context`、`session_logging`、`experiments` |
| `WithConflictMerge` | 多个层同时提供值即报错 | 供需要唯一来源的字段使用 |

`WithUnionMerge` 不带 `merge_key` 会在构造时抛 `TypeError`；字段同时声明两个标记会抛 `DuplicateMergeMetadataError`。[@ref-mv-301-config-merge]

几个读者容易踩的点：

- 同名 `[[mcp_servers]]`、`[[providers]]` 是**叠加字段**而非整条替换；整条替换只能把该表在更高层写全。写成 `[mcp_servers.name]` 这类表形式会得到 `ConfigMergeError`，消息直接提示改用 `[[mcp_servers]]`。
- `models` 内部始终以 alias 为键的映射承载：TOML 里的 `[[models]]` 数组在层加载时被归一化成映射（保存时再序列化回数组，保持扩展兼容），因此补丁可以按 alias 深合并单个模型的字段。[@ref-mv-301-config-toml-write]
- 同一字段在不同层给了不同形状（标量对表）时，构建阶段报错并指出字段名与层名，而不是静默丢弃。

## 运行时覆盖：环境变量、参数与 profile {#config-runtime}

环境变量是一个真正的层，位于 TOML 之上、运行时覆盖之下。它由 schema 反向生成：前缀 `VIBE_`、大小写不敏感、嵌套用 `__`、空值忽略。某个顶层字段对应的变量解析失败时，该字段被忽略并记录一条警告，不会阻止启动；嵌套字段（如 `VIBE_SESSION_LOGGING__ENABLED`）解析失败会丢掉整个 `VIBE_SESSION_LOGGING` 组。[@ref-mv-301-config-env]

```bash
VIBE_ACTIVE_MODEL=mistral-medium-3.5
VIBE_ENABLE_TELEMETRY=false
VIBE_SESSION_LOGGING__ENABLED=false
```

`VIBE_HOME` 是唯一不在 schema 内的特例，它决定整个配置目录的位置；`log_level` 则是真正的 schema 字段（可用 `VIBE_LOG_LEVEL` 覆盖，写入时会规范化大小写）。

凭据有一条独立通道：启动时读取 `$VIBE_HOME/.env`，只有当进程环境里没有同名非空值时才会注入，并记录"这个值来自 Vibe 还是父 shell"的来源。因此 shell 里显式导出的值总是优先于 `.env`；凭据最终来源（会话、环境还是钥匙串）的展示见 Custom providers 的 auth 小节。

CLI 参数不直接写 TOML，而是先变成会话选项，再由会话产出层栈里的"运行时覆盖"内存层，位置在环境变量之上、agent profile 之下。[@ref-mv-301-config-layers] 该层随会话存在，不会持久化。

agent profile 层是留给选中 agent 的空槽，由 AgentManager 填充并重建 orchestrator。该层有三个受保护字段会被剥离并记录警告：`vibe_base_url`、`console_base_url`、`vibe_code_sessions_base_url`，避免不受信任目录里的 agent 文件改写凭据流向。

缺口说明：固定来源里没有 `--config` 或 `--profile` 这类"指定配置文件/配置档"的参数；用户能选的只有 `--agent`（agent profile）与环境变量。

## 信任与组织策略 {#config-trust}

项目层是否参与合并由信任状态决定：只有工作目录被信任为真时项目文件才会被读取，显式不信任与未知都不会加载；`--add-dir` 由命令行显式给出，因此被当作隐式信任。信任记录在 `$VIBE_HOME/trusted_folders.toml`，判断从当前目录向父目录取最近的一条决定。[@ref-mv-301-config-sources]

组织强制层永远在最上面，且只读：它的值覆盖所有其它层，保存操作对它直接抛 `NotImplementedError`，因此任何本地配置都无法改写管理员下发的值。合并阶段还有一条针对 `allowed_models` 的校验：管理员允许的模型若与本机可用模型一个都不匹配，构建直接报错而不是静默放行。

工具权限与过滤（`enabled_tools`、`disabled_tools`、`[tools.*]` 的 `permission` 等）都是普通配置项，所以"项目里能写这些内容"正是项目层需要信任门槛的原因。

## 默认值、模型选择与迁移 {#config-defaults-migration}

`active_model` 的默认值是一个"未固定"哨兵（空字符串），并非具体别名。取值链是：GrowthBook 路由的默认模型 → 模型目录推荐的模型 → 内置默认别名 → 可用模型中的第一个。这样管理员或实验可以改默认模型而无需用户改配置。[@ref-mv-301-config-defaults]

内置 provider 有两个：

| provider | api_base | 凭据环境变量 | backend |
| :-- | :-- | :-- | :-- |
| `mistral` | `https://api.mistral.ai/v1` | `MISTRAL_API_KEY` | `mistral`（另带浏览器登录用的 console 与 API 基址） |
| `llamacpp` | `http://127.0.0.1:8080/v1` | 空（无鉴权） | `generic` |

内置模型在本提交只剩一个：`mistral-vibe-cli-latest`，别名 `mistral-medium-3.5`，声明 262144 的上下文窗口、`thinking_levels = ["off", "high"]`、默认 thinking `high`、支持图片，价格 1.5/7.5/0.15（每百万输入/输出/缓存输入 token）。[@ref-mv-301-config-defaults] 默认模型不再包含本地 `devstral` 别名，旧配置里的这条会被迁移规则清理。[@ref-mv-301-config-migration]

新增或改变默认值的配置面（都会改变用户可见行为）：

- `auto_compact_threshold` 默认值是哨兵 `-1`（"没有层设置过"；手写 `-1` 与未设置同义），默认层会把字段默认值物化进合并，所以"未设置"只能作为值存在。解析时逐模型重算，优先级从高到低是：模型自己声明且低于窗口的阈值 → 全局层显式设置且低于窗口的值 → `max_context_length` 的 80% → 全局默认值（200000）；窗口未知时模型自己声明的阈值仍然保留，只有未声明阈值的模型才落到全局值，阈值不低于声明的窗口时该层值被忽略，`0` 仍是关闭自动压缩的写法。[@ref-mv-301-config-auto-compact][@ref-mv-301-config-auto-compact-constants]
- `enable_auto_approve`（默认真）：设为假时 auto-approve（YOLO）模式被禁止，`auto-approve` agent 与任何 `safety = "yolo"` 的自定义 agent 都从选择器隐藏，`--auto-approve`/`--yolo` 与 `bypass_tool_permissions` 被忽略，逐工具权限仍然生效。[@ref-mv-301-changelog]
- `enable_subagents`（默认真）：关掉后不向模型提供 `agents.*` 委派工具。
- 压缩与输出预算：`compaction_max_output_tokens`（80000）、`compaction_reasoning_limit_tokens`（32000）、`output_limit_retries`（6）、`output_token_reserve`（4096）。
- `utility_models` 浅合并组：为会话标题与 smart-approve 分类器分别指定模型别名，或写 `active` 复用当前模型；留空表示继续自动选择。

迁移是"读入时改写并写回"的：只处理用户层与项目层这类 TOML 层，任何一条规则改动了数据，就用一次整层 replace 补丁把结果原子写回原文件。规则按固定顺序执行，包括 bash 只读白名单补齐、bash 只读命令补齐、模型改名、移除稀疏的 `devstral-small`、移除已删除的本地 `local` 模型、工具改名（`read`→`read_file`、`search_replace`→`edit`）、agent 改名（`default`→`ask`）。[@ref-mv-301-config-migration] 旧格式也被兼容读取：`[[models]]` 数组与以别名为键的映射归一化成同一映射；旧版 MCP 顶层 `headers`/`api_key_env`/`api_key_header`/`api_key_format` 会被提升为 `auth.type = "static"`，与显式 `[auth]` 混用则报错。

## 诊断：确认真正生效的来源 {#config-diagnostics}

会话内的 `/config` 页按字段列出各层取值并把最高优先层标为来源（`defaults`、`env`、`temporary`、`your administrator` 或某个 config 文件）；schema 为此保留了 `origin_of(key)`（最后触碰该字段的层）与 `defined_entries_by_layer(key)`（深合并字段里每层定义过哪些条目、按栈序），后者用于解释"这个 provider/model 条目是谁定义的"。

"文件已经写了但没生效"的常见原因与检查点：

1. **层被缓存**：层只在未加载或强制加载时重新读盘；改完 `config.toml` 后需要重载配置或重开会话。
2. **项目层没参与**：工作目录未受信任、项目源被关，或工作目录的 `.vibe` 就是用户配置目录本身。[@ref-mv-301-config-sources]
3. **被更高层遮蔽**：`VIBE_*` 环境变量、会话选项、agent profile、模型目录或管理员层提供了同名值。
4. **环境变量写坏**：解析失败的顶层变量会被忽略并记警告，所以"变量已设置但没生效"通常伴随一条警告。[@ref-mv-301-config-env]
5. **形状不对**：字段在某些层之间形状冲突时构建直接报错，消息含字段名与层名。[@ref-mv-301-config-merge]

并发写有指纹保护：TOML 层在应用补丁前比较文件指纹 `dev:ino:mtime_ns:size`，指纹不一致说明文件在读取后被别人改过，补丁被拒绝而不是覆盖别人的修改；内存层的指纹是值的规范化 JSON 的 SHA-256。[@ref-mv-301-config-fingerprint] 写回本身是原子替换：先写同目录临时文件、`fsync`、再 `replace`，读侧用同一文件描述符取指纹，因此"读到的字节"与"指纹"永远描述同一版本。[@ref-mv-301-config-toml-write]
