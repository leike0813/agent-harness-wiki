---
schema_version: 3
record_kind: production
edition_id: forgecode-cli-configuration-v2
harness_id: forgecode
topic: configuration
title: "ForgeCode CLI 的配置机制：来源、优先级、运行时覆盖、信任与诊断"
sections:
  - section_id: config-scope
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-paths, ref-forgecode-config-settings-doc]
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-agentsmd, ref-forgecode-config-agentsmd-doc, ref-forgecode-config-agentsmd-how, ref-forgecode-config-defaults, ref-forgecode-config-dir-doc, ref-forgecode-config-dotenv, ref-forgecode-config-layers, ref-forgecode-config-legacy, ref-forgecode-config-migrate, ref-forgecode-config-paths, ref-forgecode-config-settings-doc]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-agentsmd, ref-forgecode-config-dotenv, ref-forgecode-config-layers, ref-forgecode-config-paths, ref-forgecode-config-read-order]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-cli, ref-forgecode-config-dir-doc, ref-forgecode-config-layers, ref-forgecode-config-ops, ref-forgecode-config-session-commands, ref-forgecode-config-setget]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-agentsmd, ref-forgecode-config-paths, ref-forgecode-config-permissions-doc, ref-forgecode-config-policy-eval-doc, ref-forgecode-config-policy-scope-doc, ref-forgecode-config-restricted-doc, ref-forgecode-config-restricted-path]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-cli, ref-forgecode-config-info, ref-forgecode-config-ops, ref-forgecode-config-settings-doc]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-forgecode-config-paths, ref-forgecode-config-defaults, ref-forgecode-config-dotenv, ref-forgecode-config-agentsmd]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-forgecode-config-read-order, ref-forgecode-config-layers]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-forgecode-config-layers, ref-forgecode-config-cli, ref-forgecode-config-ops]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-forgecode-config-restricted-path, ref-forgecode-config-restricted-doc, ref-forgecode-config-policy-eval-doc]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-forgecode-config-defaults, ref-forgecode-config-settings-doc]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-forgecode-config-migrate, ref-forgecode-config-legacy]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-forgecode-config-cli, ref-forgecode-config-info, ref-forgecode-config-ops]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与界面 {#config-scope}

本章依据 forgecode.dev 官方文档快照（`/docs/forgecode-config/` 的 `.forge.toml` 设置清单、`/docs/forge-config/` 的 `$FORGE_CONFIG` 目录、`/docs/permissions/` 的策略文件、`/docs/custom-rules/` 的 `AGENTS.md`、`/docs/proxy-configuration/` 的代理变量），以及官方仓库 `tailcallhq/forgecode` 固定 commit `571a28902b9c562594c02fd089fc58bf8595108f` 的检出：`crates/forge_config/src/{reader.rs,config.rs,legacy.rs}` 与内嵌默认文件 `crates/forge_config/.forge.toml`、`crates/forge_domain/src/env.rs`（路径推导）、`crates/forge_infra/src/env.rs`（配置缓存与写回）、`crates/forge_main/src/cli.rs` 与 `crates/forge_main/src/ui.rs`（`forge config`/`forge info` 与迁移）。界面口径为 catalog 唯一登记的 `cli`。[@ref-forgecode-config-paths][@ref-forgecode-config-settings-doc]

## 配置来源、默认值与迁移 {#config-sources}

配置是“全局单一 + 多层合并”的模型：只有一份用户可写的 TOML，路径由 `ConfigReader::config_path()` 给出为 `{base_path}/.forge.toml`；同目录下另有若干专用文件（凭据 `.credentials.json`、策略 `permissions.yaml`、MCP `.mcp.json`、provider 覆盖 `provider.json`、历史 `.config.json`）与 `{base_path}/AGENTS.md` [@ref-forgecode-config-paths][@ref-forgecode-config-agentsmd]。

`base_path` 的解析顺序写死在 `resolve_base_path()` 中 [@ref-forgecode-config-paths][@ref-forgecode-config-dir-doc]：

1. 设置了环境变量 `FORGE_CONFIG` 就用它（目录必须存在；目录内缺少 `.forge.toml` 时按默认值启动）。
2. 否则若 `~/forge` 已存在，沿用它（历史路径，避免打断老用户）。
3. 否则用 `~/.forge`。

内嵌默认值是二进制里的 `crates/forge_config/.forge.toml`（`include_str!` 载入），包含 `max_tokens = 20480`、`top_k = 30`、`top_p = 0.8`、`restricted = false`、`subagents = true`、`tool_supported = true`、`[retry]`、`[http]`、`[compact]`、`[updates]`、`[reasoning]` 等段落，是理解“未写任何配置时行为从哪来”的权威来源 [@ref-forgecode-config-defaults][@ref-forgecode-config-layers]。文档的 `.forge.toml` 页面把同一批键整理成带注释的清单（含每个键的含义与取值域），可与之对照 [@ref-forgecode-config-settings-doc]。

其他来源 [@ref-forgecode-config-legacy][@ref-forgecode-config-dotenv][@ref-forgecode-config-agentsmd-how]：

- 旧版 JSON `{base_path}/.config.json`：只承载 `provider`/`model`/`commit`/`suggest` 四类信息，读入后转成 TOML 参与合并，字段缺省即不覆盖下层。
- `.env` 文件：启动时从当前目录向根目录逐级向上查找每一层 `.env` 并加载，越靠近工作目录的越先加载（先加载者生效），进程内只执行一次。
- `AGENTS.md`：项目 `{cwd}/AGENTS.md` 与全局 `{base_path}/AGENTS.md` 作为持久规则进入系统提示的 `project_guidelines` 块；文档说明它与 `CLAUDE.md` 等价，可原样复制 [@ref-forgecode-config-agentsmd-doc]。

迁移有两条：`forge config migrate` 把 `~/forge` 整体改名为 `~/.forge`（旧目录不存在或目标已存在都会报错退出）；凭据侧存在 `migrate_env_credentials` 流程，README 记录首次运行时会把环境变量中的 provider 凭据迁移到文件存储 [@ref-forgecode-config-migrate][@ref-forgecode-config-settings-doc]。README 里仍保留一节 `forge.yaml` 配置示例（`model:`/`commands:` 等键），但固定 commit 的配置读取路径只解析 `.forge.toml`、`.config.json` 与 `FORGE_` 环境变量，没有任何代码读取 `forge.yaml`；该节属于历史文档残留，不能作为可用配置面 [@ref-forgecode-config-layers][@ref-forgecode-config-paths]。

## 作用域优先级与合并 {#config-overrides}

`ForgeConfig::read()` 的层序是：旧版 JSON → 内嵌默认值 → 全局 TOML → `FORGE_` 环境变量，后者覆盖前者 [@ref-forgecode-config-read-order][@ref-forgecode-config-layers]。`.env` 在 `build()` 阶段被触发加载，其效果是填充进程环境变量，从而被 `FORGE_` 前缀规则与各 provider 的 `api_key_var` 读到 [@ref-forgecode-config-dotenv][@ref-forgecode-config-layers]。

合并语义 [@ref-forgecode-config-layers]：

- 对象（如 `[retry]`、`[http]`）逐键深度合并，只覆盖写入的键。
- 标量直接覆盖。
- 数组由环境变量提供时用逗号分隔，并对 `retry.status_codes`、`http.root_cert_paths` 做列表解析。
- 单字段缺省即“不参与覆盖”，没有发现空值删除标记或数组替换的特殊语义。

作用域只有全局一层：没有“项目级 `.forge.toml`”读取路径，项目级差异通过 `.forge/` 下的 agent/skill/command、项目根 `AGENTS.md` 与项目 `.mcp.json` 表达 [@ref-forgecode-config-paths][@ref-forgecode-config-agentsmd]。

## 运行时覆盖与环境变量 {#config-runtime}

运行时覆盖有四条通道 [@ref-forgecode-config-layers][@ref-forgecode-config-cli][@ref-forgecode-config-setget]：

| 通道 | 用法 |
| :-- | :-- |
| `FORGE_` 环境变量 | 前缀 `FORGE`，层级用 `__` 分隔：如 `FORGE_RETRY__MAX_ATTEMPTS=3`、`FORGE_HTTP__READ_TIMEOUT_SECS=120`；值会按类型解析 |
| `.env` / shell 变量 | 同上，便于写入主机或密钥（代理用 `HTTP_PROXY`/`HTTPS_PROXY`/`NO_PROXY`） |
| `forge config set/get/list/path` | 写回全局 TOML 的类型化字段：`session`/`commit`/`suggest` 的 provider+model，以及 `reasoning-effort` |
| 会话内命令 | `:config-edit` 打开配置文件、`:config-model` 持久化默认模型、`:config-reload` 放弃会话覆盖回到全局配置；README 区分“仅本次会话”（`:model`、`:reasoning-effort`、`:agent`）与“写入配置文件”（`:config-*`）[@ref-forgecode-config-session-commands] |

写回是“按操作增量修改”：CLI 侧把 `ConfigSetField` 映射为 `ConfigOperation`（`SetSessionConfig`、`SetCommitConfig`、`SetSuggestConfig`、`SetReasoningEffort`），由环境层原子写入并失效内存缓存，因此同进程内的后续读取立即看到新值 [@ref-forgecode-config-ops][@ref-forgecode-config-setget]。

产品没有 profile/多环境切换概念；文档给出的替代做法是用 `FORGE_CONFIG` 指向不同目录（例如工作/个人两套配置） [@ref-forgecode-config-dir-doc]。

## 信任与权限边界 {#config-trust}

配置读取本身没有项目信任门：项目内的 `.forge/agents`、`.forge/skills`、`.forge/commands` 与 `AGENTS.md` 都会被直接读取（唯一例外是项目 `.mcp.json`，它必须通过信任确认才生效） [@ref-forgecode-config-paths][@ref-forgecode-config-agentsmd]。

对“配置如何限制行为”的约束落在策略文件上：`permissions.yaml` 位于 `{base_path}/permissions.yaml`，**只有** `.forge.toml` 中 `restricted = true` 时才参与判定；文件不存在时会被创建为“全部 allow”的默认策略，因此打开 `restricted` 本身不会收紧任何行为，限制来自写入的规则 [@ref-forgecode-config-restricted-path][@ref-forgecode-config-restricted-doc][@ref-forgecode-config-permissions-doc]。

判定顺序与兜底也对读者重要：规则自上而下扫描，命中的 `deny` 立即拒绝、命中的 `confirm` 立即询问、命中的 `allow` 只是记住并继续扫描；**没有任何规则命中时默认是 confirm 而不是 allow**。规则可带 `dir` 限定工作目录，支持 `all`/`any`/`not` 逻辑组合；内置工具被映射为 `read`/`write`/`command`/`url` 四类，`SemSearch`、`Undo`、`Plan`、`Task` 豁免，MCP 工具完全不受该文件约束 [@ref-forgecode-config-policy-eval-doc][@ref-forgecode-config-policy-scope-doc]。

## 诊断与重载 {#config-diagnostics}

按“文件在哪 → 实际生效值 → 是否被缓存/是否已重载”三步排查 [@ref-forgecode-config-cli][@ref-forgecode-config-info][@ref-forgecode-config-ops]：

- 文件位置：`forge config path` 直接打印全局配置文件路径；`:config-edit` 用 `$EDITOR` 打开同一个文件；`forge config list` 输出当前配置（支持 `--porcelain`）。
- 实际生效来源：`forge info` 汇总配置、活动模型与环境状态；`forge info --porcelain` 便于脚本消费。
- 覆盖来源：`forge config get session|commit|suggest|reasoning-effort` 读取类型化字段，可与文件内容对照判断是文件生效还是被环境变量覆盖。
- 缓存与重载：配置在进程内被缓存，修改文件后需要重启 CLI/会话才会重新读取（文档亦写明“变更在下次启动时生效”）；`forge config set` 走的写回路径会主动失效缓存，因此命令式修改立即生效 [@ref-forgecode-config-ops][@ref-forgecode-config-settings-doc]。
- 日志：`forge logs` 流式输出 forge 日志（默认取最新日志文件），用于确认配置读取与网络请求行为 [@ref-forgecode-config-cli]。
