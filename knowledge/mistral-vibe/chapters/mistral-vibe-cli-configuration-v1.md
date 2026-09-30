---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-configuration-v1
harness_id: mistral-vibe
topic: configuration
title: "Mistral Vibe CLI 的配置机制：config.toml、层栈合并与信任边界"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-mv-config-layer-stack, ref-mv-changelog-version, ref-mv-config-layer-list, ref-mv-vibe-home-paths, ref-mv-config-file-paths, ref-mv-docs-config-locations, ref-mv-readme-workdir, ref-mv-admin-config, ref-mv-docs-admin-config]
  - section_id: config-merge
    surface_ids: [cli]
    source_refs: [ref-mv-merge-markers, ref-mv-tools-field, ref-mv-docs-config-precedence]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-mv-env-layer, ref-mv-docs-config-env-vars, ref-mv-vibe-home-paths, ref-mv-docs-apikeys-methods, ref-mv-config-layer-list, ref-mv-agent-profile-layer]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-mv-trusted-store, ref-mv-docs-trusted-folders, ref-mv-docs-tool-permissions]
  - section_id: config-defaults-migration
    surface_ids: [cli]
    source_refs: [ref-mv-config-defaults, ref-mv-default-providers, ref-mv-default-models, ref-mv-recorded-defaults, ref-mv-docs-config-top-level, ref-mv-config-migration]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-docs-config-precedence, ref-mv-config-introspect, ref-mv-config-origin-labels, ref-mv-config-file-paths, ref-mv-docs-trusted-folders, ref-mv-config-fingerprint]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-mv-config-layer-stack, ref-mv-config-file-paths, ref-mv-docs-config-locations]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-merge
        status: answered
        source_refs: [ref-mv-merge-markers, ref-mv-docs-config-precedence]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-mv-env-layer, ref-mv-docs-config-env-vars, ref-mv-agent-profile-layer]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-mv-trusted-store, ref-mv-docs-trusted-folders]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-mv-config-defaults, ref-mv-default-providers, ref-mv-recorded-defaults]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-mv-config-migration]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-mv-config-introspect, ref-mv-config-origin-labels, ref-mv-config-fingerprint]
---

固定来源是官方仓库 `mistralai/mistral-vibe` 的提交 `7c19608af06f6c61d63f8f7a5c3430da73fba2ab`，加上 `docs.mistral.ai` 上 Vibe Code CLI 文档的固定快照。本章所有路径、字段名与默认值都能在来源中定位；仓库里另有一个 Rust 前端（`vibe/cli-rust/`）与一个随仓库分发的本地 harness 包（`harness/`），本章以 Python CLI 的 `vibe/` 包为准，两者不一致处会写明。

## 配置来源与层栈 {#config-sources}

本章固定的提交在变更日志里对应版本 2.25.8。[@ref-mv-changelog-version]

Vibe 把配置当成一条层栈来构建：每个层要么是 TOML 文件，要么是内存里的字典，最后按字段合并成一个 `VibeConfigSchema`。层从低到高的顺序是：schema 默认值 → GrowthBook 实验 → 用户 TOML → 项目 TOML → `VIBE_*` 环境变量 → 运行时覆盖（CLI 参数）→ agent profile 覆盖 → 组织强制配置。[@ref-mv-config-layer-stack] 同一条顺序也直接体现在构建函数里实际追加的层列表。[@ref-mv-config-layer-list]

| 入口 | 位置 | 生效条件 | 说明 |
| :-- | :-- | :-- | :-- |
| 用户 TOML | `$VIBE_HOME/config.toml`，默认 `~/.vibe/config.toml` | `user` 源启用（CLI 默认启用） | 默认的写入目标 |
| 项目 TOML | 从工作目录向父目录找 `.vibe/config.toml` | 工作目录受信任 | 只在受信任时进入层栈 |
| 工作区追加 | `--add-dir` 指定的目录 | 隐式受信任，无信任提示 | 贡献其 `.vibe/` 配置、skills、agents、prompts、hooks |
| 运行时覆盖 | 内存层 | CLI 参数产生会话选项时 | 位于环境变量之上 |
| agent profile | 内存层 | 选定 agent 时填充 | 由 AgentManager 原地替换并重建 |
| 组织强制 | `${vibe_base_url}/api/v1/code/managed-config` | 组织启用了该能力 | 只读，永不写盘 |

用户层的实际路径由 `VIBE_HOME` 决定，未设置时是 `~/.vibe`；`$VIBE_HOME` 下还固定放着 `.env`、`agents/`、`prompts/`、`logs/`、`trusted_folders.toml` 等。[@ref-mv-vibe-home-paths] 项目层先取受信任的工作目录，再找该目录下的 `.vibe/config.toml`，找不到就退回用户配置文件；不受信任时项目层根本不参与。[@ref-mv-config-file-paths] 官方文档给出的用户可见表述是"先找 `./.vibe/config.toml`，再找 `~/.vibe/config.toml`，项目级优先"，并明确项目配置只在工作目录受信任时加载。[@ref-mv-docs-config-locations]

工作目录可以被重新指定：`--workdir` 改变会话根目录，`--add-dir`（可重复）把额外目录加入项目根集合。官方文档说明这些追加目录隐式受信任、无需信任提示，并把它们的 `.vibe/` 配置（工具、skills、agents、prompts、hooks）与 `AGENTS.md` 一并纳入本次会话。[@ref-mv-readme-workdir] 需要区分的是"读取"与"写回"：默认持久化目标是用户层，其次才是受信任的项目层。[@ref-mv-config-layer-stack]

组织入口独立于上面这些：admin 层从 `${vibe_base_url}/api/v1/code/managed-config` 拉取由组织分发的 TOML，只存在内存里，永不写进用户的 `config.toml`。[@ref-mv-admin-config] 官方文档同样写明"CLI 在每次会话开始时拉取 admin config 并保存在内存中，从不写入本地 `config.toml`"。[@ref-mv-docs-admin-config]

## 字段级合并与优先级 {#config-merge}

合并不是整文件替换：`VibeConfigSchema` 上每个字段都声明一个合并标记，构建时按标记逐字段合并两个方向的值（低优先为 base，高优先为 override）。

| 标记 | 语义 | 用到的字段举例 |
| :-- | :-- | :-- |
| WithReplaceMerge | 高优先层的值整体替换低层 | `active_model`、`allowed_models`、`enabled_tools`、`default_agent`、各布尔开关 |
| WithConcatMerge | 列表拼接（低优先在前） | `disabled_tools`、`skill_paths`、`agent_paths`、`enabled_agents`、`applied_migrations` |
| WithUnionMerge(merge_key) | 按 key 并集，同 key 以高层为准 | `providers`（key=`name`）、`mcp_servers`（key=`name`）、`connectors`（key=`name`） |
| WithDeepMerge | 递归合并映射 | `models`（按 alias）、`tools`（按工具名） |
| WithShallowMerge | 只覆盖出现过的键 | `compaction_model`、`vision_model`、`project_context`、`session_logging`、`experiments` |

标记类本身在 `vibe/core/config/schema.py` 定义，`WithUnionMerge` 不带 `merge_key` 会直接报错。[@ref-mv-merge-markers] 字段与标记的对应关系可以在 schema 定义处逐条核对，例如 `tools` 是深合并、`enabled_tools` 是替换、`disabled_tools` 是拼接。[@ref-mv-tools-field]

几条容易踩的边界：

- 显式 `null` 被当作"该层没有这个值"，不会清空低层的值；空的 TOML 表在列表字段上同样按缺失处理。
- 固定来源里没有提供合并层的删除标记，删除只能通过配置补丁的 `remove` 操作完成。
- 同一字段在不同形状之间冲突（标量 vs 表）时，构建阶段会抛带字段名与层名的错误，而不是静默丢弃。

官方文档给出的用户可见优先级与代码一致：admin > 命令行参数 > 环境变量 > 项目 `config.toml` > 用户 `config.toml`。[@ref-mv-docs-config-precedence]

实际写配置时最容易混的是同名表的合并方向。`[[providers]]`、`[[mcp_servers]]`、`[[models]]` 都按 `name`/`alias` 并集，所以用户在用户层写一个同名 provider 只是**叠加字段**，不是替换整条记录；要整条替换只能把该表在更高优先的层写全。

## 运行时覆盖：环境变量、参数与 profile {#config-runtime}

环境变量是一个真正的层，位于 TOML 之上、运行时覆盖之下。它由 schema 反向生成：前缀 `VIBE_`、大小写不敏感、嵌套用 `__`、空值忽略。[@ref-mv-env-layer] 因此任何 schema 字段都能用环境变量覆盖，例如：

```bash
VIBE_ACTIVE_MODEL=local        # 覆盖 active_model
VIBE_ENABLE_TELEMETRY=false    # 覆盖 enable_telemetry
```

`VIBE_HOME`、`LOG_LEVEL` 属于不在 schema 内的特例；官方参考把 `VIBE_HOME` / `MISTRAL_API_KEY` / 各提供方的 `api_key_env_var` 列为"配置模型的一部分，但不是 `config.toml` 的键"。[@ref-mv-docs-config-env-vars]

凭据有一条独立通道：`$VIBE_HOME/.env` 在启动时被读入进程环境，如果同名变量在进程环境里已有非空值，则以进程环境为准。[@ref-mv-vibe-home-paths] 官方文档给用户的顺序是"环境变量优先于 `~/.vibe/.env`"，并说明 `.env` 只放凭据、其余配置放 `config.toml`。[@ref-mv-docs-apikeys-methods]

CLI 参数不直接写进配置文件，而是变成会话选项，再由会话产出层栈里的"运行时覆盖"层。[@ref-mv-config-layer-list] 目前映射进去的主要是工具列表与 MCP 服务器等会话级设置。

agent profile 层是留给 agent 覆盖的空槽，由 AgentManager 在选定 agent 时填充并重建 orchestrator；这一层有 `vibe_base_url`、`console_base_url`、`vibe_code_sessions_base_url` 三个受保护字段会被直接忽略，避免不受信任的目录借 agent 文件改动凭据流向。[@ref-mv-agent-profile-layer]

需要说明的缺口：固定来源里没有 `--config` 或 `--profile` 这样的"指定配置文件/配置档"参数；用户能选的只有 `--agent`（agent profile）与上述环境变量。

## 信任、组织策略与配置生效条件 {#config-trust}

项目级配置的开关是信任状态。`$VIBE_HOME/trusted_folders.toml` 只存两个字符串数组 `trusted` 与 `untrusted`，判断时从当前目录向父目录走，取最近的一条决定，因此结果可能是"信任""显式不信任"或"未知"三态。[@ref-mv-trusted-store]

```toml
# $VIBE_HOME/trusted_folders.toml 的结构（字段名来自 trust store 的读写实现）
trusted = ["/home/me/project"]
untrusted = ["/home/me/project/third-party"]
```

官方文档描述的行为一致：只有显式信任过的目录才会加载其 `.vibe/` 配置；未信任时项目级配置被忽略并打印警告，用户级 `~/.vibe/` 仍然生效；信任状态记录在 `~/.vibe/trusted_folders.toml`。[@ref-mv-docs-trusted-folders] 交互式会话会弹信任对话框（列出探测到的可信任文件与风险），命令行可用 `--trust` 做仅本次调用的临时信任。

组织策略是另一条独立约束：admin 层永远在最上面，它的取值覆盖其它所有层，而且这一层是只读的（不允许保存）。如果 admin 下发的 `allowed_models` 与本机可用模型一个都不匹配，合并阶段会直接报错而不是静默放行。

工具权限与信任是配套的：`[tools.工具名]` 的 `permission`、`bash` 的 `allow`/`deny` 列表、以及 `enabled_tools`/`disabled_tools` 过滤都是配置项，因此项目里能写这些内容正是信任门槛存在的原因。[@ref-mv-docs-tool-permissions]

## 默认值与配置迁移 {#config-defaults-migration}

最低层就是 schema 自己的字段默认值，构建时把 schema 默认实例 dump 成可合并的字典。[@ref-mv-config-defaults] 供应商与模型的默认集合也在这一层。内置 provider：

| provider | api_base | 凭据环境变量 | backend |
| :-- | :-- | :-- | :-- |
| `mistral` | `https://api.mistral.ai/v1` | `MISTRAL_API_KEY` | `mistral` |
| `llamacpp` | `http://127.0.0.1:8080/v1` | 空（无鉴权） | `generic` |

[@ref-mv-default-providers] 内置模型里带一个 `mistral-vibe-cli-latest`（别名 `mistral-medium-3.5`，temperature 1.0、thinking high、价格 1.5/7.5/0.15、支持图片）与一个本地 `devstral`（别名 `local`）。[@ref-mv-default-models]

与用户界面相关的默认开关包括 `enable_telemetry=True`、`enable_update_checks=True`、`enable_auto_update=True`、`enable_notifications=True`，以及 `system_prompt_id` 与 `compaction_prompt_id` 的默认提示词编号。[@ref-mv-recorded-defaults] 官方参考把这些默认值逐项列出，例如 `default_agent` 在程序化模式下被忽略并回退到 `auto-approve`，`allowed_models` 按"发送给推理 API 的模型名"而不是本地别名匹配。[@ref-mv-docs-config-top-level]

迁移是"读入时改写并写回"的：`migrate_config_layers` 只处理用户层与项目层这类 TOML 层，一旦某条规则改动了数据，就用一次 replace 补丁写回原文件。[@ref-mv-config-migration] 规则表包括：

| 规则 | 作用 |
| :-- | :-- |
| 模型改名 | `mistral-vibe-cli-latest` 且别名为 `devstral-2` 时改写到 `mistral-medium-3.5` 的取值（temperature、价格、thinking、图片支持），`active_model` 同步改写 |
| 移除的模型 | 稀疏的 `devstral-small` 覆盖被丢弃（缺省值不全，无法独立成立），指向它的 `active_model` 重置为空 |
| 工具改名 | `read`→`read_file`、`search_replace`→`edit`，并丢弃已移除的工具选项 |
| agent 改名 | `default`→`ask` |
| bash 只读白名单 | 一次性补齐只读命令，并记录在 `applied_migrations` 里避免重复 |

旧格式本身也被兼容读取：`[[models]]` 数组与以别名为键的映射都归一化成同一份内部映射；旧版 MCP 的顶层 `headers`/`api_key_env`/`api_key_header`/`api_key_format` 会被提升成 `[auth] type = "static"`，与显式 `[auth]` 混用则报错。[@ref-mv-config-migration]

## 诊断：查看真正生效的来源 {#config-diagnostics}

会话内的 `/config` 页会逐字段列出各层的取值，并把最上面那一层标成来源（`defaults`、`env`、`temporary`、`your administrator` 或某个 config 文件）；这些来源标签就是配置诊断的主要入口，admin 下发的字段带锁标记且只读。[@ref-mv-docs-config-precedence] 这条链路对应代码里的层内省（按优先级从高到低收集每个字段在各层的取值）与来源标签渲染（组织层显示为 `your administrator`）。[@ref-mv-config-introspect][@ref-mv-config-origin-labels]

"文件已经写了但没生效"通常有四种原因，可以从 `/config` 的来源列直接判断：

1. 层被缓存：层只在尚未加载或被强制加载时才重新读盘，改完文件需要 `/reload`；项目层同样先经过"找到受信任工作目录下的 `.vibe/config.toml`"这一步。[@ref-mv-config-file-paths]
2. 信任缺失：不受信任的项目目录整层被跳过，此时项目文件里写什么都没用。[@ref-mv-docs-trusted-folders]
3. 被更高层遮蔽：`VIBE_*` 环境变量、会话覆盖、agent profile 或 admin 提供了同名值。
4. admin 层永远最高，且不可被本地改写。

并发写有指纹保护：层在应用补丁前会比较 `dev:ino:mtime:size` 形式的文件指纹，指纹不一致说明文件在读取后被别人改过，补丁会被拒绝而不是覆盖别人的修改。[@ref-mv-config-fingerprint]

修改 `config.toml` 后如果不想重启进程，用 `/reload` 重建层栈；只改 hooks 而不动配置时会走带 hooks 重载的路径（见 Hooks 章节）。
