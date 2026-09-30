---
schema_version: 3
record_kind: production
edition_id: grok-cli-configuration-v1
harness_id: grok
topic: configuration
title: "Grok Build CLI 的配置机制：来源、合并、运行时覆盖、信任与诊断"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-grok-config-ref-how, ref-grok-config-ref-requirements, ref-grok-config-doc-config-toml, ref-grok-config-doc-project-scoped, ref-grok-config-doc-file-locations, ref-grok-config-doc-paths-env, ref-grok-config-doc-harness-compat, ref-grok-config-headless-locations, ref-grok-config-headless-project-root, ref-grok-config-loader-consts, ref-grok-config-loader-managed-layers, ref-grok-config-paths-system, ref-grok-config-validation-requirements, ref-grok-config-perm-scopes, ref-grok-docs-config-overview-path]
  - section_id: config-precedence
    surface_ids: [cli]
    source_refs: [ref-grok-config-doc-precedence, ref-grok-config-doc-version-pinning, ref-grok-config-doc-harness-compat, ref-grok-config-ref-how, ref-grok-config-ref-managed, ref-grok-config-ref-features, ref-grok-config-layers-merge, ref-grok-config-layers-requirements-order, ref-grok-config-loader-deep-merge, ref-grok-config-loader-normalize, ref-grok-config-perm-evaluation, ref-grok-config-compat-resolution, ref-grok-config-paths-system, ref-grok-config-sandbox-platform]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-grok-config-doc-overlay, ref-grok-config-doc-env-vars, ref-grok-config-headless-update, ref-grok-config-headless-flags, ref-grok-config-env-overlay-consts, ref-grok-config-env-overlay-resolve, ref-grok-config-env-overlay-finalize, ref-grok-config-overlay-allow, ref-grok-config-sandbox-resume, ref-grok-config-auth-precedence, ref-grok-config-ref-how]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-grok-config-perm-best-practices, ref-grok-config-perm-scopes, ref-grok-config-perm-disable, ref-grok-config-ref-requirements, ref-grok-config-ref-managed, ref-grok-config-ref-refused, ref-grok-config-validation-requirements, ref-grok-config-signed-policy, ref-grok-config-sandbox-writeprotect]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-grok-config-version-overrides, ref-grok-config-ref-version-overrides, ref-grok-config-loader-version-overrides, ref-grok-config-ref-ui, ref-grok-config-doc-version-pinning, ref-grok-config-doc-harness-compat, ref-grok-config-claude-import]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-grok-config-ref-inspect, ref-grok-config-doc-harness-compat, ref-grok-config-doc-save, ref-grok-config-doc-screen-mode, ref-grok-config-doc-notifications, ref-grok-config-resolved-source, ref-grok-config-env-overlay-resolve, ref-grok-config-auth-hot-reload, ref-grok-docs-config-overview-path]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-grok-config-ref-how, ref-grok-config-ref-requirements, ref-grok-config-doc-config-toml, ref-grok-config-doc-project-scoped, ref-grok-config-doc-file-locations, ref-grok-config-doc-paths-env, ref-grok-config-headless-locations, ref-grok-config-headless-project-root, ref-grok-config-loader-consts, ref-grok-config-loader-managed-layers, ref-grok-config-paths-system, ref-grok-config-validation-requirements, ref-grok-config-perm-scopes, ref-grok-docs-config-overview-path]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-precedence
        status: answered
        source_refs: [ref-grok-config-doc-precedence, ref-grok-config-doc-version-pinning, ref-grok-config-ref-how, ref-grok-config-ref-managed, ref-grok-config-layers-merge, ref-grok-config-layers-requirements-order, ref-grok-config-loader-deep-merge, ref-grok-config-loader-normalize, ref-grok-config-perm-evaluation]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-precedence
        status: answered
        source_refs: [ref-grok-config-ref-features, ref-grok-config-compat-resolution, ref-grok-config-doc-harness-compat, ref-grok-config-paths-system, ref-grok-config-sandbox-platform]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-grok-config-doc-overlay, ref-grok-config-doc-env-vars, ref-grok-config-headless-update, ref-grok-config-headless-flags, ref-grok-config-env-overlay-consts, ref-grok-config-env-overlay-resolve, ref-grok-config-env-overlay-finalize, ref-grok-config-overlay-allow, ref-grok-config-sandbox-resume, ref-grok-config-auth-precedence, ref-grok-config-ref-how]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-grok-config-perm-best-practices, ref-grok-config-perm-scopes, ref-grok-config-perm-disable, ref-grok-config-ref-requirements, ref-grok-config-ref-managed, ref-grok-config-ref-refused, ref-grok-config-validation-requirements, ref-grok-config-signed-policy, ref-grok-config-sandbox-writeprotect]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: partial
        source_refs: [ref-grok-config-version-overrides, ref-grok-config-ref-version-overrides, ref-grok-config-loader-version-overrides, ref-grok-config-ref-ui, ref-grok-config-doc-version-pinning, ref-grok-config-doc-harness-compat, ref-grok-config-claude-import]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-grok-config-ref-inspect, ref-grok-config-doc-harness-compat, ref-grok-config-doc-save, ref-grok-config-doc-screen-mode, ref-grok-config-doc-notifications, ref-grok-config-resolved-source, ref-grok-config-env-overlay-resolve, ref-grok-config-auth-hot-reload, ref-grok-docs-config-overview-path]
---


## 配置入口、文件与路径 {#config-sources}

Grok Build 的配置由三份职责不同的 TOML 承担，由不同的人书写 [@ref-grok-config-ref-how]：

| 文件 | 写入者 | 典型位置 | 作用 |
| :-- | :-- | :-- | :-- |
| `config.toml` | 开发者本人 | `~/.grok/config.toml`、项目内 `.grok/config.toml` | 个人默认值，可被本机使用者改动 |
| `managed_config.toml` | 管理员 / 控制台 / 部署工具 | `/etc/grok/managed_config.toml`、`$GROK_HOME/managed_config.toml` | 团队默认起点，开发者自己的文件可覆盖 |
| `requirements.toml` | 管理员（签名） | `/etc/grok/requirements.toml`、`$GROK_HOME/requirements.toml`、macOS MDM | 开发者不可改的强制值 |

用户主配置是 `$GROK_HOME/config.toml`，默认 `$GROK_HOME` 为 `~/.grok`；Windows 上是 `%USERPROFILE%\.grok\config.toml` [@ref-grok-config-doc-config-toml][@ref-grok-docs-config-overview-path]。`GROK_HOME` 环境变量整体改写该目录，从而改写其中所有配置文件的落点 [@ref-grok-config-doc-paths-env]。文件名常量集中在 `loader.rs`：`config.toml`、`managed_config.toml`、`requirements.toml`、`trusted_folders.toml`、`sandbox.toml` [@ref-grok-config-loader-consts]。

`~/.grok/` 下还有 `pager.toml`（TUI 外观）、`auth.json`、`sessions/`、`memory/`、`skills/`、`agents/`、`plugins/`、`lsp.json`、`crash/` 等 [@ref-grok-config-doc-file-locations][@ref-grok-config-headless-locations]。

项目级配置放在仓库内的 `.grok/` 下，但不是整份 `config.toml` 都生效：`.grok/config.toml` 只贡献 `[mcp_servers]`、`[plugins]`、`[permission]` 与 `[mcp] max_output_bytes`，其它小节只从用户 `~/.grok/config.toml` 读取 [@ref-grok-config-doc-project-scoped][@ref-grok-config-ref-how]。项目根由「从 `--cwd`（或当前目录）向上找 `.git`」确定 [@ref-grok-config-headless-project-root]；权限规则则读取「从仓库根一路向下到当前工作目录的每一层」的 `.grok/config.toml` [@ref-grok-config-perm-scopes]。

系统级来源：`system_config_dir()` 在 Unix 返回 `/etc/grok/`，在 Windows 返回 `None` [@ref-grok-config-paths-system]。`managed_config.toml` 按「先 `/etc/grok`、后 `$GROK_HOME`」两层加载，后者覆盖前者 [@ref-grok-config-loader-managed-layers]。`requirements.toml` 按「用户 `$GROK_HOME` → 系统 `/etc/grok` → macOS MDM」顺序合并，MDM 被标记为 `is_system` 并最后压入从而胜出 [@ref-grok-config-validation-requirements][@ref-grok-config-ref-requirements]。

最小用户配置（语法取自官方页面「config.toml (main configuration)」的 `[models]` 小节）：

```toml
[models]
default = "grok-4.5"        # 新会话使用的模型
```

若文件缺失，Grok 使用编译进二进制里的默认值，所以只需写想覆盖的键 [@ref-grok-config-doc-config-toml]。

厂商兼容目录（`~/.cursor/`、`~/.claude/`、`~/.codex/` 等由 `[compat]` 控制）也属于配置来源之一 [@ref-grok-config-doc-harness-compat]。

**已知缺口**：固定来源给出的是 cwd→仓库根的读取顺序与 `.git` 查找规则，但没有说明多层 `.grok/config.toml` 同时存在时更细的覆盖算法，也没有说明路径包含符号链接越出仓库时的处理；这些需要运行 `grok inspect` 观察。

## 优先级、逐层合并与默认值 {#config-precedence}

官方页面「Precedence」列出 7 个层级，按最高优先先解析 [@ref-grok-config-doc-precedence]：

1. CLI flags（如 `--yolo`、`--model`、`--sandbox`）
2. 环境变量（如 `XAI_API_KEY`、`GROK_MEMORY`）
3. `requirements.toml` / MDM（组织强制，压住下面所有层）
4. `GROK_CONFIG` / `GROK_CONFIG_PATH` overlay
5. `config.toml`（`~/.grok/config.toml`）
6. `managed_config.toml`（组织下发的默认，低于 `config.toml`）
7. 内置默认值

`26-config-reference.md` 给出的规范层序（后面的行胜出，除非被 pin 或 Managed 列改写）[@ref-grok-config-ref-how]：

1. 编译默认
2. `/etc/grok/managed_config.toml` → `$GROK_HOME/managed_config.toml`
3. `$GROK_HOME/config.toml`
4. 项目 `.grok/config.toml`（仅 `[mcp_servers]`、`[plugins]`、`[permission]`、`[mcp] max_output_bytes`）
5. `GROK_CONFIG`（内联 JSON）或 `GROK_CONFIG_PATH`（JSON/TOML 文件），仅允许白名单键
6. `$GROK_HOME/requirements.toml` → `/etc/grok/requirements.toml` → macOS MDM
7. `GROK_*` 环境变量
8. CLI flags

文件层之间是「从低到高」的 deep-merge：`managed_config.toml` → `config.toml` → overlay → `requirements.toml` / MDM [@ref-grok-config-doc-precedence]。`config_layers.rs::merge` 就是这个顺序：以 `system_managed` 起底，依次合并 `managed`、`user`、overlay，最后合并 requirements 各层 [@ref-grok-config-layers-merge]。requirements 层的应用顺序是 user → system → MDM [@ref-grok-config-layers-requirements-order]。

逐值类型的合并语义来自 `deep_merge_toml` [@ref-grok-config-loader-deep-merge]：

| 值类型 | 规则 |
| :-- | :-- |
| 表（table） | 递归合并，同键继续下钻 |
| 标量 | 被覆盖层整体替换 |
| 数组 | 被覆盖层整体替换，不做元素级合并 |
| 键不存在 | 直接插入 |

有一处**例外键**：`[toolset.web_search]` 的 `allowed_domains` 与 `excluded_domains` 互斥。每个层在合并前由 `normalize_config_layer` 规范化——只设一个时把另一个置为空数组 `[]`，让胜出层整体替换该策略，而不是跨层拼出两个键 [@ref-grok-config-loader-normalize]。`managed_config.toml` 里唯一相对用户 `config.toml` 反向胜出的键是 `features.remote_fetch` [@ref-grok-config-ref-managed]。

版本边界（`minimum_version` / `maximum_version` 等）跨层合并时**只收紧不放松**：下限取最高值、上限取最低值，用户或环境不能取消管理层设的硬边界 [@ref-grok-config-doc-version-pinning]。

权限规则不走 deep-merge，而是**所有来源合并成一个规则集合**，按严重度求值：任何匹配的 `deny` 拒绝，其次 `ask`，再次 `allow`；全局 `deny` 无法被项目 `allow` 覆盖 [@ref-grok-config-perm-evaluation]。

默认值与功能开关：`[features]` 表逐项列出开关及默认（例如 `features.lsp_tools` 默认 false、`features.telemetry` 企业默认 off）[@ref-grok-config-ref-features]。厂商兼容各 cell 默认全开，解析链是「环境变量 → config TOML → 远程设置 → 默认 ON」[@ref-grok-config-compat-resolution][@ref-grok-config-doc-harness-compat]。

平台差异：系统配置目录仅 Unix 有 `/etc/grok/`，Windows 没有 [@ref-grok-config-paths-system]；沙箱机制在 Linux 用 Landlock、在 macOS 用 Seatbelt，网络限制仅在 Linux 生效 [@ref-grok-config-sandbox-platform]。

**已知缺口**：固定来源没有给出 overlay 与 campaigns / version_overrides 的完整键级例外清单；个别键（例如 `[telemetry] otel_*`）另有自己的 pin 与「剥离兄弟键」语义，只能按 `26-config-reference.md` 对应表格逐键查看。

## 运行期介入：环境变量、CLI 与 overlay {#config-runtime}

环境变量 `GROK_*`（tier 7）与 CLI flags（tier 8）在文件层之后生效 [@ref-grok-config-ref-how]。常见项有 `XAI_API_KEY`、`GROK_MEMORY`、`GROK_SUBAGENTS`、`GROK_SANDBOX`、`GROK_HOME`、`GROK_RESPECT_GITIGNORE` 等 [@ref-grok-config-doc-env-vars]。headless / CI 更新抑制由高到低为：`--no-auto-update`（会话级）、`GROK_DISABLE_AUTOUPDATER=1`（进程级）、`[cli] auto_update = false`（持久）；`GROK_DISABLE_AUTOUPDATER` 的假值（`0`/`false`/`off`/`no`/空）视为未设 [@ref-grok-config-headless-update]。

**`GROK_CONFIG` / `GROK_CONFIG_PATH` overlay** 是一层「并入配置」的特殊入口，而不是像 `XAI_API_KEY` 那样直接设定值的环境变量 [@ref-grok-config-doc-overlay]：

- `GROK_CONFIG` 是内联 JSON 对象；`GROK_CONFIG_PATH` 是**额外**的 JSON/TOML 文件，按扩展名解析（`.json` → JSON，否则 TOML）[@ref-grok-config-doc-overlay][@ref-grok-config-env-overlay-consts]。
- 两者同时存在时 `GROK_CONFIG` 胜；内联候选只要为空、解析失败或后处理被拒，就整体回退到 path 候选 [@ref-grok-config-env-overlay-resolve]。
- overlay 经过 `finalize_overlay`：展开 `$VAR`、应用 `version_overrides`、取走 campaigns、再按**只读白名单**保留允许的键，最后规范化 [@ref-grok-config-env-overlay-finalize]。
- 白名单（`OVERLAY_ALLOW_PATHS`）当前允许 `models`、`features`、`toolset.bash.login_shell_capture`、`toolset.web_search` 的两个域列表，以及 `shell_environment_policy` 的若干过滤字段（注意 `shell_environment_policy.set` 不在其中，overlay 不能注入环境值）[@ref-grok-config-overlay-allow]。

官方文档给出的最小示例：

```bash
GROK_CONFIG='{"models": {"default_reasoning_effort": "high"}}' grok agent stdio
```

[@ref-grok-config-doc-overlay]

headless 常用 flag：`-m/--model`、`--permission-mode`、`--allow`/`--deny`、`--tools`/`--disallowed-tools`、`--sandbox`、`--no-auto-update` 等 [@ref-grok-config-headless-flags]。沙箱 profile 的解析顺序是：显式 `--sandbox {profile}` 或 `GROK_SANDBOX` → 配置里的 `[sandbox] profile` → `off` [@ref-grok-config-sandbox-resume]。

认证解析顺序说明「配置与令牌谁先」：per-model `api_key`/`env_key` → 活动会话令牌（`~/.grok/auth.json`）→ `XAI_API_KEY` [@ref-grok-config-auth-precedence]。

**已知缺口**：固定来源未逐一给出「CLI flag 与同名配置键」的完整对照表；`--model`/`-m` 覆盖 `models.default`、`--yolo` 覆盖 `[ui] yolo` 这类关系只能从各键的 Details 列与示例推断。

## 信任、组织策略与沙箱写保护 {#config-trust}

项目级来源默认不生效，直到该文件夹被信任：folder trust 门控 `.grok/config.toml` 与 `.claude/settings.json` 里的项目权限规则，以及项目指令与项目 skill 的启动加载；headless 启动需要 `--trust` 或先前的授权 [@ref-grok-config-perm-best-practices]。权限规则的作用域包含全局 `~/.grok/config.toml`、项目 `.grok/config.toml`、项目个人的 `.claude/settings.local.json`，以及 Grok 内部保存的交互式授权 [@ref-grok-config-perm-scopes]。

组织层 `requirements.toml` 是「开发者不可改」的一层：Requirement 列标 `pin` 的键无法被其它文件、环境变量或命令行覆盖，`yes` 表示该键也允许出现在 requirements 中，`—` 表示该文件不读取它 [@ref-grok-config-ref-requirements]。`requirements.toml` 只接受部分专属键，例如 `fail_closed`、`features.image_edit`、`ui.disable_bypass_permissions_mode`；后者用于锁定 always-approve，且**仅在 requirements 层生效**（用户或托管文件里的同名键被忽略）[@ref-grok-config-ref-requirements][@ref-grok-config-perm-disable]。

托管层 `managed_config.toml` 用于「可调默认」，用户 `config.toml` 覆盖它（唯一例外是 `features.remote_fetch`）[@ref-grok-config-ref-managed]。

设置被拒时的行为 [@ref-grok-config-ref-refused]：

| 情形 | 行为 |
| :-- | :-- |
| 开发者设置了被 pin 的键 | 应用 pin 值，`grok inspect` 列出贡献的 requirements 文件 |
| 开发者设置了 `managed_config.toml` 里的键 | 用户值生效（除 `features.remote_fetch`） |
| requirements 缺失或签名不通过 | pin 不生效并正常启动；设 `fail_closed = true` 可改为拒绝启动 |
| pin 键的值本版本不认识 | 忽略该键，文件其余部分仍生效 |

requirements 层的加载与校验在 `validation.rs`：用户层与系统层之外再加 macOS MDM，MDM 标记为 `is_system`，安全判定必须信任该标记而不是从来源重新推导 [@ref-grok-config-validation-requirements]。`requirements.toml` 采用 Ed25519 签名信封：服务端签 policy、principal 与 expiry，客户端用内置公钥集验证、绑定主体并核对磁盘字节是否与签名一致 [@ref-grok-config-signed-policy]。

沙箱层面，`workspace`、`read-only`、`strict` 及继承它们的自定义 profile 会对 Grok 自己的配置与信任文件做内核级写保护（`~/.grok/config.toml`、`~/.grok/trusted_folders.toml`、`~/.grok/managed_config.toml`、`~/.grok/requirements.toml`、`~/.grok/sandbox.toml` 等）：它们可读但不可写，因此该状态下的改动只对当前会话生效 [@ref-grok-config-sandbox-writeprotect]。

**已知缺口**：固定来源未给出 `requirements.toml` 签名字段与服务端下发/缓存刷新周期的完整细节（`signed_policy.rs` 只显示算法与内置公钥集）；folder trust 的底层存储格式本章只从文档获知存在 `~/.grok/trusted_folders.toml`。

## 迁移、弃用与兼容导入 {#config-migration}

`[[version_overrides]]` 是版本门控的配置补丁：按 `minimum_version` 升序对匹配项做 deep-merge，并无论是否匹配都从结果里移除该小节 [@ref-grok-config-version-overrides][@ref-grok-config-ref-version-overrides]。

```toml
[[version_overrides]]
minimum_version = "1.7.0"
[version_overrides.features]
logging = true
```

（示例取自 `version_overrides.rs` 模块文档。）加载时 `apply_version_overrides_with_registered` 用当前 CLI 版本套用补丁；若版本无法解析（例如开发环境里损坏的 `GROK_TEST_VERSION`），则静默剥离该小节以保持 CLI 可用 [@ref-grok-config-loader-version-overrides]。

**弃用键**：`26-config-reference.md` 标注了若干已弃用项，例如 `ui.approval_mode`（改用 `ui.permission_mode`）、`ui.ui_theme`（改用 `ui.theme`）、每个模型的 `reasoning_effort` 与 `supports_reasoning_effort`（改用 `reasoning_efforts`）[@ref-grok-config-ref-ui]。`[cli] minimum_version` 已由硬边界改为更新器软防降级，硬边界改用 `required_minimum_version` [@ref-grok-config-doc-version-pinning]。

**旧格式 / 别家格式导入**：

- `[compat.*]` 控制是否扫描 Cursor / Claude / Codex 的配置、规则、skill、hook、MCP、agent 与 session；每个 cell 可用环境变量或 `config.toml` 设置，解析链为「环境变量 → `config.toml` → 默认开」[@ref-grok-config-doc-harness-compat]。
- Claude 设置导入以标记记录状态：`is_claude_import_marked` 读取用户 `config.toml` 的 `claude_compat.imported` 布尔值；文件缺失、键缺失或 TOML 非法都算「未导入」[@ref-grok-config-claude-import]。

**已知缺口**：固定来源没有给出旧键到新键的完整迁移映射表，也没有说明弃用键是否会自动改写磁盘文件（`05-configuration.md` 只说 `/settings` 等写入会重写对应键）。`claude_import.rs` 只显示标记读取，未显示导入的执行逻辑。

## 诊断、重载与「写了没生效」 {#config-diagnostics}

查看实际生效来源：运行 `grok inspect`（或 `grok inspect --json`），它列出每个贡献了配置的文件，包括 requirements 与 managed 层，因此「策略没生效」一条命令即可看见 [@ref-grok-config-ref-inspect]。`grok inspect` 也会把仍待会话启动解析的 compat cell 报告为 `?` [@ref-grok-config-doc-harness-compat]，并展示「当前目录发现了什么」，包括 config 来源、指令、skill、plugin、hook 与 MCP server [@ref-grok-docs-config-overview-path]。

配置值带来源标签：`ConfigSource` 枚举覆盖 `Requirement`、`Cli`、`Env`、`SystemManagedConfig`、`ManagedConfig`、`UserConfig`、`EnvOverlay`、`Config`、`Remote`、`Default` [@ref-grok-config-resolved-source]。overlay 另有 `resolved_env_overlay()` 专门供 `grok inspect` 使用 [@ref-grok-config-env-overlay-resolve]。

交互式查看与修改：`/settings`（别名 `/config`、`/preferences`、`/prefs`）打开设置模态；`[ui] screen_mode` 等项既可从该模态设置，也会写回 `config.toml` [@ref-grok-config-doc-screen-mode]。TUI 会话内 `/doctor` 检查终端、剪贴板、颜色、输入、通知与沙箱问题并给出修复步骤 [@ref-grok-config-doc-notifications]。

写入语义：写 `~/.grok/config.toml` 会跟随叶级符号链接（原子 rename 写的是被指向的 dotfiles 文件，链接保持为链接）；写项目 `.grok/config.toml` 会把符号链接替换为普通文件；无法解析的用户 `config.toml` 不会被覆盖 [@ref-grok-config-doc-save]。

重载：`~/.grok/auth.json` 的改动会被自动拾取，下一次 API 调用即生效，无需重启 [@ref-grok-config-auth-hot-reload]。普通配置文件的多项设置在「下一个会话启动」或重启后生效（权限规则按文档是每个会话启动时读取一次）。

**已知缺口**：「文件已写但没有生效」时，固定来源只文档化了 `grok inspect`、`/doctor`、`/settings` 与 auth 热重载四条路径；固定的文档快照与 `xai-grok-config` 源码里没有出现 `grok doctor` 子命令或通用的配置热重载 / `--reload`。可操作的第一步仍是用 `grok inspect` 确认该文件是否真的被计入。
