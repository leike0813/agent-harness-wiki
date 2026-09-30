---
schema_version: 3
record_kind: production
edition_id: factory-droid-cli-configuration-v1
harness_id: factory-droid
topic: configuration
title: "Droid CLI 的配置机制：来源层级、优先级、运行期覆盖与迁移"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-fd-settings-where, ref-fd-settings-local, ref-fd-org-levels, ref-fd-org-system-file, ref-fd-agentsmd-discovery, ref-fd-agentsmd-filenames, ref-fd-agentsmd-budget, ref-fd-styles-create, ref-fd-styles-choose]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-fd-org-levels, ref-fd-org-precedence, ref-fd-org-merge, ref-fd-org-perm-rules, ref-fd-perm-scope, ref-fd-settings-permission-rules, ref-fd-perm-create]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-fd-cli-flags, ref-fd-cli-auth, ref-fd-cli-updates, ref-fd-settings-access, ref-fd-exec-tools, ref-fd-exec-skills, ref-fd-exec-policy, ref-fd-exec-failfast, ref-fd-exec-exit, ref-fd-exec-output, ref-fd-autonomy-levels, ref-fd-autonomy-approvals, ref-fd-autonomy-change, ref-fd-autonomy-where, ref-fd-cli-autonomy, ref-fd-exec-model, ref-fd-cli-commands]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-fd-org-perm-rules, ref-fd-perm-scope, ref-fd-styles-scope, ref-fd-byok-helper, ref-fd-org-merge, ref-fd-org-system-file, ref-fd-autonomy-enterprise]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-fd-settings-available, ref-fd-settings-where, ref-fd-settings-enterprise, ref-fd-settings-legacy, ref-fd-settings-autonomy, ref-fd-settings-command-lists, ref-fd-perm-migrate, ref-fd-hooks-config, ref-fd-byok-config, ref-fd-settings-example, ref-fd-settings-display, ref-fd-settings-compaction, ref-fd-settings-spec, ref-fd-settings-infra, ref-fd-settings-session-defaults, ref-fd-settings-reasoning, ref-fd-settings-mission]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-fd-settings-access, ref-fd-cli-rules-check, ref-fd-perm-check, ref-fd-perm-scope, ref-fd-byok-troubleshooting, ref-fd-styles-troubleshooting, ref-fd-hooks-debug, ref-fd-repo-hooks-safety, ref-fd-org-precedence, ref-fd-cli-exit, ref-fd-org-manage-rules]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-fd-settings-where, ref-fd-settings-local, ref-fd-org-levels, ref-fd-org-system-file, ref-fd-agentsmd-discovery, ref-fd-agentsmd-filenames]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-fd-org-levels, ref-fd-org-precedence, ref-fd-org-merge, ref-fd-org-perm-rules]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-fd-cli-flags, ref-fd-cli-auth, ref-fd-cli-updates, ref-fd-settings-access, ref-fd-exec-policy]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: partial
        source_refs: [ref-fd-org-perm-rules, ref-fd-perm-scope, ref-fd-styles-scope, ref-fd-byok-helper, ref-fd-org-merge, ref-fd-org-system-file]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-fd-settings-available, ref-fd-settings-where, ref-fd-settings-enterprise]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-fd-settings-legacy, ref-fd-settings-autonomy, ref-fd-settings-command-lists, ref-fd-perm-migrate, ref-fd-hooks-config, ref-fd-byok-config]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-fd-cli-rules-check, ref-fd-perm-check, ref-fd-settings-access, ref-fd-byok-troubleshooting, ref-fd-styles-troubleshooting, ref-fd-hooks-debug, ref-fd-repo-hooks-safety]
---

## 配置来源与路径 {#config-sources}

本章的固定来源是官方文档站 `droid-cli/settings`、`droid-cli/cli-reference`、`enterprise/hierarchical-settings-and-org-control`、`harness/agents-md`、`autonomy-and-safety/permission-rules` 与 `droid-cli/output-styles` 页面快照。CLI 本体不开源，整章按 source_only 阅读。

Droid 的配置以 `.factory/` 目录为单位分四级存放，同一套 schema 在各层复用 [@ref-fd-org-levels]：

| 层级 | 位置 | 归属 |
| :-- | :-- | :-- |
| Org | 托管设置端点、org `.factory/` 包，或系统级 `settings.json` | 组织管理员 |
| Folder | 仓库内子目录的 `.factory/` | monorepo 子树维护者 |
| Project | 仓库根的 `.factory/` | 仓库维护者 |
| User | 用户主目录 `~/.factory/` | 个人开发者 |

每个 `.factory/` 目录可以放：`settings.json`（模型、安全、偏好、遥测）、`hooks.json`（hook 定义）、`mcp.json`（MCP server 配置），以及 `droids/`、`commands/`、`skills/`、`output-styles/` 定义目录。[@ref-fd-org-levels]

个人 `settings.json` 的平台路径 [@ref-fd-settings-where]：

| 平台 | 路径 |
| :-- | :-- |
| macOS / Linux | `~/.factory/settings.json` |
| Windows | `%USERPROFILE%\.factory\settings.json` |

文件不存在时第一次运行 droid 会按默认值创建它。[@ref-fd-settings-where]

`settings.local.json` 与同名 `settings.json` 并排放在任意 `.factory/` 目录中（用户级 `~/.factory/settings.local.json`、项目级项目 `.factory/settings.local.json`），它在该层之上合并，并遵循同一套层级优先级；要避免机器相关偏好进版本库就把它加进 `.gitignore`。[@ref-fd-settings-local]

在需要「任何用户登录之前」就应用组织策略的部署（托管笔记本、未认证到 Factory 的 CI、气隙或受限网络），IT/MDM 可以把 `settings.json` 放到固定路径：macOS `/Library/Application Support/Factory/settings.json`、Linux 与 WSL `/etc/factory/settings.json`、Windows `C:\Program Files\Factory\settings.json`。该文件存在时就是该机器的权威 org 设置来源，会短路 API 拉取；文件缺失时回落到常规 org 设置流程，文件存在但格式非法时 org 设置解析为空策略并记录失败，不会静默绕过。[@ref-fd-org-system-file]

指令类输入单独走一套路径：仓库指令从当前工作目录向上搜到 git 根，每层检查该目录自身与 `.factory/`、`.agents/`、`.agent/` 三个上下文目录，另外检查 home 下的 `~/.factory/`、`~/.agents/`、`~/.agent/`；可用文件名包括 `AGENTS.md`、`agents.md`、`Agents.md`，以及兼容用的 `CLAUDE.md`、`Claude.md`。这些是指令而不是配置 schema，但同样按层级生效；指令文件会计入会话上下文，官方给出的上限是初始指引加载 80,000 字符、动态 Read 路径发现 40,000 字符，属于上限而非目标。[@ref-fd-agentsmd-discovery][@ref-fd-agentsmd-filenames][@ref-fd-agentsmd-budget]

同一套层级也用于输出样式：用户 `~/.factory/output-styles/`、项目与更深目录的 `.factory/output-styles/`、插件根的 `output-styles/`；Droid 只加载这些目录的直接 `.md` 子文件，嵌套文件与其它类型被忽略，选择结果保存为 `outputStyle` 设置。[@ref-fd-styles-create][@ref-fd-styles-choose]

## 优先级与合并语义 {#config-overrides}

四个撰写层会被放进更长的构建顺序里（从高到低）：Org（含 org 插件）、命令行 `--settings` 覆盖层（Runtime）、Folder、Project、User、远程动态配置（Dynamic）、硬编码内置默认（BuiltIn）。[@ref-fd-org-levels]

关键是**两套方向相反的优先级同时存在** [@ref-fd-org-precedence]：

- **硬控制（hard controls）**：取**最高**层级，Org 权威。低层只能在 schema 允许处扩展，不能削弱、移除或重新启用。属于这一类的字段包括 `modelPolicy`、`mcpPolicy`、`permissionRules`、`sandbox`、托管 `hooks`、`strictEnabledPlugins`、`strictKnownMarketplaces`、`subagentModelSettings`，以及 `maxAutonomyLevel`、`subagentAutonomyLevel`、`cloudSessionSync`、`wikiCloudSync`、`sessionRetentionDays` 等标量。
- **会话默认（session defaults）**：取**最本地**层级，Runtime 高于 Folder、Project、User、Org、Dynamic、BuiltIn。属于这一类的是 `sessionDefaultSettings` 里的 `model`、`reasoningEffort`、`interactionMode`、`autonomyLevel`、`specModeModel` 等键，以及 `missionOrchestratorModel` 与 `missionModelSettings` 里的模型和推理档位。用户设的偏好可以覆盖 org 默认，但始终被硬控制的天花板压住（例如 `modelPolicy` 决定哪些模型存在、`maxAutonomyLevel` 压住自主级别）。

合并模式按数据类型区分 [@ref-fd-org-merge]：

| 合并模式 | 行为 | 例子 |
| :-- | :-- | :-- |
| 简单值，先到先得 | 标量硬控制取第一个设置它的层级，低层不能改也不能删 | `maxAutonomyLevel`、`cloudSessionSync`、`sessionRetentionDays` |
| 数组，并集 | 数组字段跨层累积，org 条目总在，低层只能新增 | 旧式命令行清单、启用的 hooks |
| 具名数组，条目锁定 | 按标识符合并，低层可加新标识符但不能改动或删除高层条目 | 按 `id` 归并的 `customModels` |
| 对象，键锁定 | 高层定义的键被锁定，低层可加新键但不能改删既有键 | MCP server 定义 |

用户侧的规则容器形如 `{ "permissionRules": { "version": 1, "rules": [ ... ] } }`，每条规则包含 `id`、`decision`（`allow`/`ask`/`block`）、`match.prefix` 的有序令牌与 `tests` 示例；个人规则放用户设置，项目规则放仓库 `.factory/settings.json`，文件夹规则放嵌套 `.factory/settings.json`，本地覆盖放任意 `settings.local.json`，组织策略走 Enterprise Controls。[@ref-fd-settings-permission-rules][@ref-fd-perm-create]

`permissionRules.rules` 是特例，不走普通数组并集 [@ref-fd-org-perm-rules]：候选来源按 Org、Runtime、Folder、Project、User 排序，高优先级的合法定义占用重复的规则 ID，不同 ID 累积；同一文件夹内 `settings.local.json` 先于 `settings.json`；项目与文件夹规则**需要工作区信任**；插件与动态配置不能撰写原生权限规则。ID 解析完成后，匹配的 block 优先于 ask、ask 优先于 allow；org 的 allow 不会取消不同 ID 的项目 block；空的 rules 数组不会清空继承来的规则。[@ref-fd-org-perm-rules][@ref-fd-perm-scope]

## 运行时覆盖：CLI 参数、环境变量与交互设置 {#config-runtime}

- **`--settings PATH`** 把一份设置文件合并到正常层级之上，只对当前进程生效。[@ref-fd-cli-flags]
- 常用覆盖型 flag：`-m/--model` 选模型，`-r/--reasoning-effort` 改推理档位（在 `droid exec` 中 `-r` 即此 flag），`--auto low|medium|high` 设自主级别，`--use-spec` 以规划模式启动，`--spec-model`/`--spec-reasoning-effort` 覆盖 spec 阶段，`--append-system-prompt` 与 `--append-system-prompt-file` 追加系统提示，`--cwd` 指定工作目录，`--restrict-tools`/`--additional-tools`/`--disabled-tools` 收放工具，`--disable-builtin-skills` 关掉内置技能。[@ref-fd-cli-flags]
- 环境变量：`FACTORY_API_KEY` 是登录凭据（在 app.factory.ai 生成后持久化到 shell profile）；`FACTORY_DROID_AUTO_UPDATE_ENABLED=false` 关闭独立安装的进程内自动更新，npm 发行版在构建时就已关闭自动更新。[@ref-fd-cli-auth][@ref-fd-cli-updates]
- 交互式设置：运行 `droid` 后 `/settings` 调整偏好，改动立即生效并写回设置文件；`--settings` 与 `/settings` 分别覆盖运行期与持久层。[@ref-fd-settings-access]
- `droid exec`（非交互）的覆盖方式：`--auto` 分级、`--restrict-tools`/`--disabled-tools` 控制工具、`--disable-builtin-skills` 控制技能、输出格式 `text`/`json`/`stream-json`/`stream-jsonrpc`；命令策略在自动化里同样生效，`--skip-permissions-unsafe` 也只是跳过授权提示，命令 block 依然适用。[@ref-fd-exec-tools][@ref-fd-exec-skills][@ref-fd-exec-policy]
- `droid exec` 的失败与退出语义独立于交互模式：非零退出、fail-fast 行为与 JSON 输出的字段决定自动化脚本如何判断结果。[@ref-fd-exec-failfast][@ref-fd-exec-exit][@ref-fd-exec-output]
- **自主级别控制的是自动批准，而不是工具可用性**：shell 命令与 MCP 工具带风险级别，风险不高于当前级别时自动运行；命令策略里 `allow` 跳过批准、`ask` 即使在 High 也要批准、`block` 直接拒绝且没有批准路径。[@ref-fd-autonomy-levels][@ref-fd-autonomy-approvals]
- 运行中按 Ctrl+L 在 `Off → Low → Medium → High` 间循环（org 策略可压低最高可用档），Shift+Tab 在 Normal 与 Spec 模式间切换，未来会话的默认值在 `/settings` 中设置。[@ref-fd-autonomy-change]
- 同一套级别在不同入口的差异：交互式 `droid` 使用会话当前级别，带初始提示词的 `droid "..."` 首个任务也使用配置的默认级别；`droid exec` 默认处于只读的 spec 模式，需要编辑与命令时显式用 `--auto low|medium|high` 打开。[@ref-fd-autonomy-where][@ref-fd-cli-autonomy][@ref-fd-exec-model]
- 子命令族（会话、`exec`、`search`、`rules check`、`mcp`、`plugin`、`computer`、`daemon`、`update`）决定了覆盖参数出现在哪一层：`droid` 与 `droid exec` 是两种执行模型，交互 REPL 与单次非交互执行各有自己的标志集合。[@ref-fd-cli-commands]

## 信任、权限与策略边界 {#config-trust}

文档明确写出「工作区信任」这个机制存在，但没有单独页面描述授予或撤销流程；可以确认的行为有：

- **项目与文件夹级权限规则需要工作区信任**；未受信任的项目与文件夹规则会被排除，非法规则或重复 ID 会让该来源整体被跳过。[@ref-fd-org-perm-rules][@ref-fd-perm-scope]
- **输出样式**：当 Droid 询问是否信任某个工作目录时，应先检查该目录的样式文件；项目与文件夹样式（包括项目级插件提供的样式）在该目录被信任之前不可用，Droid 会保留这个选择但在样式可用前使用 **Default**。[@ref-fd-styles-scope]
- **需要受信任层才生效的设置**：`customModels` 的 `apiKeyHelper` 会执行 shell 命令，因此只从 org 托管设置生效，会从 user、project、folder 设置中剥离；组织注入的环境变量块也只认 org 托管层，其它层（包括 `--settings` 运行期覆盖）会被忽略，以免不受信任的仓库或命令行参数注入变量。[@ref-fd-byok-helper][@ref-fd-org-merge]
- 组织侧的系统级 `settings.json` 是本机的权威 org 来源，用户无法覆盖或削弱。[@ref-fd-org-system-file]
- 组织可以用 **Default Autonomy Level** 设定新会话的起始级别、用 **Maximum Autonomy Level** 限制成员能升到的高度（上限设为 Medium 时 CLI 里根本没有 High），这些边界与权限规则、旧命令清单、MCP 限制、sandbox 与 Missions 访问控制叠加生效。[@ref-fd-autonomy-enterprise]

**缺口**：固定来源没有给出「如何触发信任提示、信任记录存在哪里、如何撤销或查看已信任目录」的说明，也没有列出除上述机制外还有哪些配置受信任门控；这些点保持未验证。[@ref-fd-styles-scope][@ref-fd-perm-scope]

## 默认值与迁移 {#config-defaults}

**默认值来源**分三处：产品内置默认（在未设置时生效，例如 `diffMode` 默认 `github`、`sessionDefaultSettings.autonomyLevel` 默认 `off`、`cloudSessionSync` 默认 `true`、`hooksDisabled` 默认 `false`、`blockOnMcpLoad` 默认 `false`）、模型相关默认（`reasoningEffort` 的可用档位与默认由各模型决定，`compactionTokenLimit` 默认随模型变化）、以及组织级默认（例如 `maxAutonomyLevel` 默认 `high`）。文件不存在时第一次运行会按默认值创建 `~/.factory/settings.json`，另外部分偏好（如用量告警 `disableUsageLimitAlerts`）只存在 Factory App 的个人资料里，不能写进 `settings.json`。[@ref-fd-settings-available][@ref-fd-settings-where][@ref-fd-settings-enterprise]

平台差异目前只体现为路径（Windows 用 `%USERPROFILE%\.factory\settings.json`）。[@ref-fd-settings-where]

官方页面给出的 `settings.json` 示例，可作为理解键名与值的起点 [@ref-fd-settings-example]：

```json
{
  "model": "claude-opus-4-7",
  "reasoningEffort": "low",
  "outputStyle": "concise",
  "diffMode": "github",
  "cloudSessionSync": true,
  "completionSound": "fx-ok01",
  "awaitingInputSound": "fx-ack01",
  "soundFocusMode": "always"
}
```

除上表中的键外，还有一批带明确默认值的可调项：`theme`（默认随系统）、`statusLine`（默认不设，用 `/statusline` 交互配置，命令 stdout 渲染在输入框上方）、`worktreeDirectory`（默认 `~/.factory/worktrees`）、`compactionTokenLimit`（默认随模型）、`compactionTokenLimitPerModel`（默认空对象）、`compactionModel`（默认 `same`）、`specSaveDir`（默认 `~/.factory/specs`）、`toolResultDisplay`（默认 `expanded`）、`logoAnimation`（默认 `once`）、`subagentSounds`（默认 `off`）。[@ref-fd-settings-display][@ref-fd-settings-compaction][@ref-fd-settings-spec][@ref-fd-settings-infra]

会话默认族决定新会话的起点：`sessionDefaultSettings.interactionMode`（`auto` 或 `spec`，默认 `auto`）、`sessionDefaultSettings.autonomyLevel`（默认 `off`），以及只在 spec 阶段生效的 `specModeModel`（默认继承主模型）与 `specModeReasoningEffort`（默认随模型）。[@ref-fd-settings-session-defaults]

推理档位 `reasoningEffort` 的可用值与默认由**模型自身**决定：目录里从最省到最深依次是 `off`/`none`、`dynamic`、`minimal`、`low`、`medium`、`high`、`xhigh`、`max`，每个模型只接受其中一个子集，默认值也在该子集内（例如 Claude Opus 4.8 默认 `high`，Claude Sonnet 4.5 默认 `off`）。[@ref-fd-settings-reasoning]

Mission 相关的默认族在 `missionModelSettings`（worker 与 validation worker 的模型/推理档位、`skipScrutiny`、`skipUserTesting`）与 `missionOrchestratorModel`/`missionOrchestratorReasoningEffort`：六个模型与推理字段可由组织下发默认，并按会话默认优先级被更本地的设置覆盖（仍受组织模型策略约束），而 `skipScrutiny`/`skipUserTesting` 只由用户管理、不被托管设置接受。[@ref-fd-settings-mission]

**迁移与弃用规则** [@ref-fd-settings-legacy][@ref-fd-settings-autonomy][@ref-fd-settings-command-lists]：

- `.droid.yaml` 是旧的项目配置面，已被 `.factory/` 取代：偏好与本地覆盖用 `settings.json`/`settings.local.json`，仓库指令改用 `AGENTS.md`，集成与自动化改用 MCP、hooks 与 skills。
- `sessionDefaultSettings.autonomyMode` 已弃用，仅为兼容旧配置保留。
- `commandAllowlist`、`commandDenylist`、`commandBlocklist` 已弃用但**未移除**，仍然被尊重：`allow` 对应 allowlist、`ask` 对应 denylist（不是 block）、`block` 对应 blocklist；新策略应改用 `permissionRules`，迁移前先读共存与迁移说明。
- 旧命令清单与原生规则共存时，同来源的原生规则可以替代自定义的旧限制，其它来源的限制仍然参与。[@ref-fd-perm-migrate]
- hook 配置的旧位置 `.factory/hooks/hooks.json` 仍会加载，下一次保存会写到 `.factory/hooks.json` 并把旧文件归档为 `hooks/hooks.migrated.json`。[@ref-fd-hooks-config]
- 自定义模型的旧写法：`~/.factory/config.json` 的 snake_case 字段（`custom_models`、`base_url` 等）仍被支持，两个文件都会加载合并、`settings.json` 优先，但环境变量展开不作用于旧文件。[@ref-fd-byok-config]

## 诊断与重载 {#config-diagnostics}

- 查看当前生效值：`/settings` 交互式读取与修改，改动立即生效并写回文件；`--settings` 只影响当前进程。[@ref-fd-settings-access]
- 校验权限规则：`droid rules check` 校验解析后的设置；`--file FILE` 检查独立的 `{version, rules}` 对象或裸规则数组（不接受完整的 `settings.json` 包装），`--command` 预览某个命令的策略判定，`--json` 输出单对象报告。退出码 0 表示检查本身成功（即使预览结果是 block），非法规则或失败示例返回 1；预览只覆盖命令策略，不含 hooks、sandbox、自主级别或会话授权。[@ref-fd-cli-rules-check][@ref-fd-perm-check]
- 改动设置后先跑 `droid rules check`，再依赖诊断输出定位重复 ID、非法容器或未受信任的项目规则。[@ref-fd-perm-scope]
- 「文件已写但没生效」的常见原因与检查点 [@ref-fd-byok-troubleshooting][@ref-fd-styles-troubleshooting]：设置改动由文件监听自动检测，先确认 JSON 语法与必填字段；输出样式要确认是 `output-styles/` 的直接 `.md` 子文件、正文非空、来自受信任目录且插件已启用，`/diagnostics` 会给出源路径与校验错误（不包含样式正文）；hook 改动需要 `/hooks` 复核才生效。
- hook 相关的问题用 `droid --debug` 观察匹配与执行；直接编辑 hooks 不会立即生效，Droid 在启动时做快照、外部修改时告警。[@ref-fd-hooks-debug][@ref-fd-repo-hooks-safety]
- 脚本判定：CLI 退出码 `0` 成功、`1` 一般运行错误、`2` 参数非法。[@ref-fd-cli-exit]
- 组织侧编辑规则走 Enterprise Controls 的 **Permission Rules**：选 **Manage rules** → 选 **Allow** / **Ask for approval** / **Block** → 在 **Command starts with** 填有序令牌并给正反例 → **Review Changes** 保存；JSON 视图只导入规则并保留 ID，而 `droid rules check --file` 不接受完整的 settings 包装。[@ref-fd-org-manage-rules]
- 层次冲突类问题（用户改了但 org 策略压住）按上文两套优先级判断：硬控制取最高层，会话默认取最本地层。[@ref-fd-org-precedence]
