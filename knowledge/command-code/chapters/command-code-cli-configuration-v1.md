---
schema_version: 3
record_kind: production
edition_id: command-code-cli-configuration-v1
harness_id: command-code
topic: configuration
title: "Command Code CLI 的配置机制：config.json 与 settings.json、优先级、运行期覆盖与信任"
sections:
  - section_id: config-files
    surface_ids: [cli]
    source_refs: [ref-cc-settings-files, ref-cc-settings-config, ref-cc-settings-scopes, ref-cc-settings-other, ref-cc-import-what, ref-cc-import-behavior]
  - section_id: config-keys
    surface_ids: [cli]
    source_refs: [ref-cc-settings-config, ref-cc-settings-keys, ref-cc-settings-permissions, ref-cc-settings-attribution, ref-cc-settings-featuremodels]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-cc-settings-precedence, ref-cc-settings-permissions, ref-cc-perm-precedence]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-cc-settings-env, ref-cc-cli-flags, ref-cc-perm-switch, ref-cc-telemetry-off, ref-cc-headless-json]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-cc-security-trust, ref-cc-mods-trust, ref-cc-perm-modes, ref-cc-perm-safety, ref-cc-security-headless]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cc-settings-precedence, ref-cc-perm-switch, ref-cc-settings-state, ref-cc-byok-invalid, ref-cc-trouble-reload, ref-cc-hooks-debug, ref-cc-cli-subcommands]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-files
        status: answered
        source_refs: [ref-cc-settings-files, ref-cc-settings-config, ref-cc-settings-scopes, ref-cc-settings-other]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-cc-settings-precedence, ref-cc-settings-permissions, ref-cc-perm-precedence]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-cc-settings-env, ref-cc-cli-flags, ref-cc-perm-switch]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: partial
        source_refs: [ref-cc-security-trust, ref-cc-perm-modes, ref-cc-perm-safety, ref-cc-mods-trust]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-keys
        status: answered
        source_refs: [ref-cc-settings-config, ref-cc-settings-keys, ref-cc-settings-featuremodels]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-files
        status: partial
        source_refs: [ref-cc-settings-scopes, ref-cc-import-what, ref-cc-import-behavior]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-cc-trouble-reload, ref-cc-settings-state, ref-cc-byok-invalid, ref-cc-cli-subcommands]
---

本章的固定来源是 Command Code 官方文档站的页面快照（`/docs/settings`、`/docs/permissions`、`/docs/resources/security`、`/docs/resources/telemetry` 的同源页 `/docs/troubleshooting/telemetry`、`/docs/reference/cli`、`/docs/mods`、`/docs/import`、`/docs/hooks`），抓取于 2026-10-01（各 snapshot 的 `source_fetched_at` 记录 UTC 时间戳 2026-09-30T17:08Z）；文档站只提供 HTML，引用按文档小节标题定位、摘录取自页面正文。Command Code 闭源，整章为来源级知识（`version_applicability: unknown`）。

Command Code 的配置分成两类文件：`config.json` 是**个人偏好**（单文件、不在仓库里、由 CLI 自己维护），`settings.json` 一族是**项目行为**（多作用域、深合并）。此外还有几个小文件承载 MCP、keybinding、凭据与定时任务。

## 配置来源与文件全景 {#config-files}

官方给出的文件地图：[@ref-cc-settings-files]

```text
USER  ~/.commandcode/
├── config.json      你的偏好
├── settings.json    hooks、permissions、MCP
├── auth.json        凭据 · 不要手改
├── providers.json   自定义 BYOK provider
├── keybindings.json 按键覆盖
├── mcp.json         用户级 MCP server
├── cron/jobs.json   定时任务 · 机器管理
└── projects/{project}/
    ├── config.json  按项目的机器状态
    └── mcp.json     本地 MCP server
PROJECT （项目根）/
├── .commandcode/
│   ├── settings.json        提交
│   └── settings.local.json  gitignore
└── .mcp.json                提交
```

没有文件会因为“启动 Command Code”而被创建：文件在第一次写入时出现（第一次改模型或主题生成 `config.json`，为某个项目批准一条命令生成 `settings.local.json`），在那之前全是内置默认值。[@ref-cc-settings-files]

`config.json` 是单文件用户级配置，永不在仓库里，由 CLI 随使用自动更新（例如 `/model` 选模型、`/theme` 换主题），并以 `0600` 权限写入；文档建议少手改，交给 `/model`、`/theme`、`/effort`、`/config` 管理。[@ref-cc-settings-config]

`settings.json` 一族则有三个作用域并且**深合并**：[@ref-cc-settings-scopes]

| 作用域 | 文件 | 用途 |
| :-- | :-- | :-- |
| 项目本地 | `.commandcode/settings.local.json` | 单项目个人覆盖；批准过的权限写在这里；应加入 `.gitignore` |
| 项目 | `.commandcode/settings.json` | 团队共享规则；提交，让所有人拿到同样的 hooks 与权限 |
| 用户 | `~/.commandcode/settings.json` | 跨所有项目的个人默认值 |

旧的 `~/.commandcode/config.json` 还作为**最低优先级**来源供给这一层，但只覆盖六个重叠键：`model`、`theme`、`compactMode`、`tasteLearning`、`featureModels`、`reasoningEffort`。[@ref-cc-settings-scopes]

其余文件的作用与“是否手改”：`providers.json`（手改或用 `/connect`）、`auth.json`（不要手改，由 `/login`、`/logout`、`/connect` 管理，`0600`）、`keybindings.json`（手改，`id → key` 或 `id → key[]`，覆盖默认值）、`mcp.json`/`.mcp.json`（手改）、`projects/{project}/mcp.json`（经 CLI）、`cron/jobs.json`（机器管理）、`telemetry-install-id`（机器管理）。[@ref-cc-settings-other]

**迁移与兼容（`config.migration`）**：固定来源给出的规则只有两条——① 旧的 `config.json` 仍作为最低优先级层供给六个重叠键；② `/import` 可以把其他编码代理（Claude Code、Codex、Cursor、Pi、OpenCode、Gemini CLI）的 skills、自定义 agent、自定义斜杠命令、MCP 配置与 memory 文件搬到 Command Code 对应位置，已在目标位置存在的内容保持不变（`skipped-existing`），并会把来源的 memory 文件名改写（`CLAUDE.md` 变成 `AGENTS.md`）。文档没有 config key 重命名表、弃用标记或版本化迁移脚本的说明。[@ref-cc-settings-scopes][@ref-cc-import-behavior][@ref-cc-import-what]

## 顶层键、默认值与功能开关 {#config-keys}

`config.json` 的个人偏好键（节选官方完整表）：[@ref-cc-settings-config]

| 键 | 类型 | 作用 | 默认 |
| :-- | :-- | :-- | :-- |
| `provider` | string | 选中的认证 provider：`anthropic`、`github-copilot`、`codex`、`command-code` | - |
| `model` | string | 新会话的默认模型 | 精选默认模型 |
| `theme` | `dark`/`light`/`auto` | 终端主题，`auto` 自动探测背景 | `auto` |
| `compactMode` | `default`/`fast` | 自动压缩激进度 | `default` |
| `reasoningEffort` | object | 按模型 id 的推理强度（`low`…`max`） | provider 默认 |
| `featureModels` | object | 后台功能的模型覆盖（`titleGeneration`、`compaction`、`toolDescription`、`tasteOnboarding`、`tasteLearning`、`branchSummarization`） | 精选默认 |
| `collapsePastedText` | boolean | 把超 300 字符的粘贴折叠成 token | `true` |
| `tasteLearning` | boolean | taste 学习总开关 | `true` |
| `ideContextEnabled` | boolean | IDE 上下文集成 | `true` |
| `autoInstallExtension` | boolean | 启动时自动安装 IDE 扩展 | `true` |
| `defaultExportFormat` | `html`/`jsonl`/`md` | 裸 `/export` 的格式 | `html` |
| `treeFilterMode` | string | `/tree` 默认过滤器 | `default` |
| `onDemandToolDescriptions` | boolean | 权限提示里的命令解释只在按 `ctrl+e` 时生成 | `true` |
| `installed` / `firstMessageSent` | boolean | 首次安装/首条消息探测（机器写） | - |

`settings.json` 的顶层键（节选）：`model`、`effort`、`reasoningEffort`、`permissions`、`permissionMode`（legacy）、`hooks`、`theme`、`tasteLearning`、`compactMode`、`featureModels`、`providers`、`plugins`、`skills`、`disableSkillShellExecution`（默认 `false`）、`disableScratchpad`（默认 `false`）、`mcp`、`mods`、`disabledSkills`、`attribution`。[@ref-cc-settings-keys]

其中两个键在官方文档里另有专节：`permissions` 的四个规则列表 `allow`/`ask`/`deny`/`additionalDirectories` **跨所有作用域并集**而不是被覆盖，`defaultMode` 默认 `default`，`disableBypass` 可让 `yolo`（权限旁路）不可进入；`attribution` 控制提交尾注（默认是 `Co-authored-by: CommandCodeBot` 加邮箱 `noreply@commandcode.ai`，非空值必须是一条合法的 `Co-authored-by:` 单行尾注且不超过 200 字符，空字符串关闭，优先级 `settings.local.json` > 项目 > 用户）。[@ref-cc-settings-permissions][@ref-cc-settings-attribution]

`featureModels` 还承载**主循环的两条泳道**：planning（会话处于 plan 模式时）与 implementation（批准计划后）。两者都可选、默认关闭；未设置或该 id 不被计划覆盖的泳道跑会话模型而不是让该回合失败；`/model` 一旦显式选过模型，两条泳道都让位到下一次 planning 回合。[@ref-cc-settings-featuremodels]

## 优先级与合并规则 {#config-overrides}

同一设置在多处定义时，更具体的作用域获胜：[@ref-cc-settings-precedence]

1. `.commandcode/settings.local.json` —— 最高
2. `.commandcode/settings.json`
3. `~/.commandcode/settings.json`
4. `~/.commandcode/config.json`（仅 legacy 字段）—— 最低

映射是**深合并**、标量覆盖，**例外**是权限规则列表（`allow`、`ask`、`deny`、`additionalDirectories`）在所有层之间**并集**。[@ref-cc-settings-precedence][@ref-cc-settings-permissions]

会话模型的解析是单独一条链：`--model` 参数（最高）→ 会话中 `/model` 选的 → settings.json / config.json 里的 `model` → 内置默认（最低）。**运行中的会话只在启动时读一次默认模型**：在另一个终端改默认值（或手改文件）不会影响已经在跑的会话，新会话才会拿到。[@ref-cc-settings-precedence]

权限页另给了一条更细的合并说明口径：`deny` 胜 `ask` 胜 `allow`，模式只决定规则未覆盖的调用。[@ref-cc-perm-precedence]

## 运行期介入：环境变量与 CLI 参数 {#config-runtime}

Command Code 读取的环境变量：[@ref-cc-settings-env]

| 变量 | 作用 |
| :-- | :-- |
| `COMMAND_CODE_API_KEY` | Command provider 的 API key；设置后覆盖 `auth.json` |
| `CMD_ZDR` | `1` 开启零数据保留模式（暂停不兼容的特征模型） |
| `COMMANDCODE_SKIP_UPDATES` | 跳过自动更新 |
| `COMMANDCODE_SCRATCHPAD` / `COMMANDCODE_SCRATCHPAD_BASE` | 覆盖每会话 scratchpad 位置或基目录 |
| `MCP_TOOL_TIMEOUT` | 单次 MCP 工具请求超时（毫秒） |
| `MAX_MCP_OUTPUT_TOKENS` | MCP 工具输出 token 上限（默认 `25000`） |
| `DO_NOT_TRACK` | 标准遥测退出开关 |
| `HOME` / `USERPROFILE` | 解析 `~/.commandcode` 的 home 目录 |

CLI 参数提供同一批设置的命令行形式，例如 `--model`、`--effort`、`--theme`、`--config key=value`（`/config` 的无头形式，可重复，非法键/值以非零退出）、`--permission-mode`、`--yolo`、`--accept-edits`、`--plan`、`--add-dir`、`--skill`、`--no-skills`、`--mod`、`--mod-option`、`--no-auto-update`、`--skip-onboarding`、`--local-only`。[@ref-cc-cli-flags]

权限模式也可在会话中切换：`shift+tab` 在 `default → accept-edits → plan → yolo` 间循环（`dont-ask` 不是循环中的一级），`/mode` 及其变体切换；模式切换还会回答屏幕上已有的提示——`accept-edits`/`yolo` 批准它、`plan` 拒绝它，但由安全强制的提示不会被这样回答。[@ref-cc-perm-switch]

`cmd -p`（print 模式）也受配置影响：`--output-format json` 把 print 模式变成机器可读流——换行分隔的 JSON（NDJSON），逐行走一个 `{"type":"event","event":{…}}` 事件帧，最后固定一行 `{"type":"result","subtype":"success","sessionId":"…","stopReason":"…","usage":{…},"durationMs":…,"finalText":"…"}`。[@ref-cc-headless-json]

遥测的关闭方式也是配置的一部分：`~/.commandcode/config.json` 里 `{ "telemetry": false }`，或环境变量 `DO_NOT_TRACK`（单次会话可写 `DO_NOT_TRACK=1 cmd`）。[@ref-cc-telemetry-off]

## 信任与安全边界 {#config-trust}

- **项目信任**：第一次在某个目录里运行 `cmd` 时会询问是否信任该目录，以防在不可信位置意外执行；`cmd --trust` 跳过信任提示。[@ref-cc-security-trust]
- **项目内容的门控**：项目 mod（以及项目 Skill）只有在工作区信任提示通过后才加载；用户级与 `--mod` 的 mod 总是加载。[@ref-cc-mods-trust]
- **权限模式的基线**：`default` 对任何会改东西的操作提示、读操作免费；`accept-edits` 自动做普通工作区编辑与安全文件系统 shell；`plan` 只读（只有 plan 文件可写）；`yolo` 权限旁路；`dont-ask` 从不提示、只跑已批准的、其余拒绝。别名 `auto-accept` → `accept-edits`、`bypass` → `yolo`，Claude Code 写法也接受。[@ref-cc-perm-modes]
- **安全行为的例外**：有些提示由安全检查强制，只提供一次性的 Yes/No 且会话/项目选择被隐藏（不会缓存）：破坏性命令、敏感路径、工作区外写入、显式 `ask` 规则；唯一能在 `yolo` 下存活的检查是“删除文件系统根或 home”这道断路器。[@ref-cc-perm-safety]
- **无头默认**：`cmd -p` 默认**阻断所有写操作**；要在无头模式里允许写入必须显式 `--yolo`（`--dangerously-skip-permissions` 是别名），官方警告只在可信环境（如自己的 CI）里这样做。[@ref-cc-security-headless]

**缺口（`config.trust`）**：固定来源说明了项目信任提示与 `--trust`、项目 mod/Skill 的信任门控、五种权限模式与安全例外，但没有给出组织/企业管理策略（例如强制禁用某模式或集中下发配置）、也没有说明 `.commandcode/settings.json` 内的内容是否会在信任前被部分读取。这些保持未验证。[@ref-cc-security-trust][@ref-cc-perm-modes]

## 诊断与“文件已写但没生效” {#config-diagnostics}

- **写盘但没生效**：权限“允许且记住”写进 `settings.local.json`；环境变量与 CLI 参数在启动时介入；运行中的会话不会重读默认模型（另一终端改的默认值不影响它）。[@ref-cc-settings-precedence][@ref-cc-perm-switch]
- **按项目状态**：`~/.commandcode/projects/{project}/config.json` 保存机器写入的按项目状态（目前是 taste onboarding 进度：completed/skipped 标记、学习与跳过过的会话、最后学习日期），由 Command Code 全权管理，不需要手改。[@ref-cc-settings-state]
- **坏配置文件不会拖垮产品**：`providers.json` 里格式错误的条目只跳过自己并在 `/connect` 与 `--list-models` 下给具体警告，无法解析的文件给 `invalid JSON (details redacted)` 警告，本次运行 provider 全消失而不是 CLI 崩溃；`/connect` 的写入器从不碰解析不了的文件。[@ref-cc-byok-invalid]
- **重载**：新增/修改 mod、skill、keybinding 后用 `/reload`（重启当前会话）即可拾取，不必手工重启。[@ref-cc-trouble-reload]
- **通用调试日志**：`cmd --debug` 会把信任检查、配置加载、matcher 决策、stdin/stdout 载荷与非零退出码写进 `~/.commandcode/logs/command.log`（日志只在 `--debug` 期间存在）。[@ref-cc-hooks-debug]
- **子命令入口**：`cmd info`（系统信息，`--verbose`/`--text`）、`cmd status`（认证状态，`--json` 输出单行 JSON）、`cmd update --check-only`（只检查更新）。[@ref-cc-cli-subcommands]
