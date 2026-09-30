---
schema_version: 3
record_kind: production
edition_id: amp-cli-configuration-v1
harness_id: amp
topic: configuration
title: "Amp CLI 的配置机制：来源、优先级、运行时与托管设置"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-amp-settings-locations, ref-amp-docs-index-pages, ref-amp-settings-keys, ref-amp-agentsmd-files]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-amp-settings-locations, ref-amp-keybindings-keymap, ref-amp-settings-keys, ref-amp-settings-enterprise]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-amp-settings-keys, ref-amp-execute-noninteractive, ref-amp-remote-control-terminal, ref-amp-pluginapi-system, ref-amp-settings-proxy, ref-amp-agentsmd-ignore, ref-amp-cli-accounts, ref-amp-settings-locations, ref-amp-runners-secrets, ref-amp-runners-how]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-amp-mcp-trust, ref-amp-settings-mcp-permissions, ref-amp-mcp-registry, ref-amp-settings-enterprise, ref-amp-remote-control-access, ref-amp-routing-connections]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-amp-settings-keys, ref-amp-settings-mcp-permissions, ref-amp-settings-updates, ref-amp-settings-runner, ref-amp-settings-locations, ref-amp-cli-update, ref-amp-settings-enterprise]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amp-settings-enterprise, ref-amp-settings-locations, ref-amp-settings-keys, ref-amp-mcp-trust, ref-amp-keybindings-shortcuts, ref-amp-keybindings-keymap]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-amp-settings-locations, ref-amp-settings-keys]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-amp-settings-locations, ref-amp-keybindings-keymap, ref-amp-settings-enterprise]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-amp-settings-keys, ref-amp-execute-noninteractive, ref-amp-remote-control-terminal, ref-amp-settings-proxy, ref-amp-cli-accounts]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: partial
        source_refs: [ref-amp-mcp-trust, ref-amp-settings-enterprise, ref-amp-remote-control-access, ref-amp-routing-connections]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-amp-settings-keys, ref-amp-settings-updates, ref-amp-settings-runner, ref-amp-cli-update]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: partial
        source_refs: [ref-amp-settings-enterprise]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-amp-settings-enterprise, ref-amp-settings-locations, ref-amp-mcp-trust, ref-amp-keybindings-shortcuts]
---

## 配置来源与路径 {#config-sources}

固定来源是官方文档站快照：`/docs/cli/settings`、`/docs/cli/execute-mode`、`/docs/cli/runners`、`/docs/cli/remote-control`、`/docs/cli/keybindings`、`/docs/customize/agents-md`、`/docs/customize/mcp`。Amp CLI 闭源，全部结论为来源级知识（`version_applicability: unknown`）。[@ref-amp-settings-locations][@ref-amp-docs-index-pages]

文档「Configuration」一节列出的读取位置恰好三条 [@ref-amp-settings-locations]：

| 来源 | 路径 |
| :-- | :-- |
| 用户设置 | macOS / Linux：`~/.config/amp/settings.json` 或 `~/.config/amp/settings.jsonc`；Windows：`%USERPROFILE%\.config\amp\settings.json` 或 `%USERPROFILE%\.config\amp\settings.jsonc` |
| 工作区设置 | 从当前工作目录**向上搜索到仓库根**，取最近的 `.amp/settings.json` 或 `.amp/settings.jsonc`；不在 Git 仓库里时用当前目录 |
| 自定义用户设置 | 给 `amp --settings-file PATH` 指定另一个用户设置文件 |

打开与编辑：`amp config edit` 用 `$EDITOR` 打开用户设置文件，加 `--workspace` 编辑工作区设置。[@ref-amp-settings-locations]

**所有设置都用 `amp.` 前缀**，并且可以加 JSON Schema 在编辑器里获得校验、描述与补全 [@ref-amp-settings-keys]：

```json
{
  "$schema": "https://ampcode.com/cli-settings.schema.json",
  "amp.showCosts": true
}
```

**别和指导文件混淆**：`AGENTS.md` 不是设置。它按代码库结构、构建/测试命令与约定的用途被读取，位置是当前目录与父目录（到 `$HOME`）、子树、系统级目录，以及 `$HOME/.config/amp/AGENTS.md`、`$HOME/.config/AGENTS.md`。[@ref-amp-agentsmd-files]

固定来源没有描述组织级/企业级之外的第四种本地配置来源（例如 `.amp/settings.local.json`），也没有说明 settings 与 settings.jsonc 同时存在时怎么选；这是缺口。[@ref-amp-settings-locations]

## 作用域优先级与合并 {#config-overrides}

**同一设置出现在多处时，工作区设置覆盖用户设置。**[@ref-amp-settings-locations]

**唯一的例外是 keymap**：`amp.keymap` 条目在用户设置里会覆盖工作区设置里的条目——「与其它设置不同，`~/.config/amp/settings.json` 里的 keymap 覆盖 `.amp/settings.json` 里的条目。」设置清单里也重复了这一点。[@ref-amp-keybindings-keymap][@ref-amp-settings-keys]

**企业托管设置**是第三层，合并规则单独定义。管理员有两种下发方式 [@ref-amp-settings-enterprise]：

1. Workspace Settings → Advanced → Managed Settings 里放一份 JSON 文档，键与 `managed-settings.json` 相同；每次保存产生一个新 revision，记录作者与时间，可查看修订历史并比较任意两份。「workspace 文档正在向 Enterprise 工作区推出」。
2. 每台机器部署本地 `managed-settings.json`，路径为 macOS `/Library/Application Support/ampcode/managed-settings.json`、Linux `/etc/ampcode/managed-settings.json`、Windows `%ProgramData%\ampcode\managed-settings.json`。

**合并语义**（workspace 文档与本地设置冲突时）[@ref-amp-settings-enterprise]：

- 标量：工作区值胜出；
- 列表：合并，工作区条目在前；
- 对象：按键逐个合并，冲突时工作区值胜出；
- 本地 `managed-settings.json` 用同样方式合并，并且**优先于** workspace 文档。

客户端大约 10 分钟内收到工作区改动，或在下一次启动时收到。[@ref-amp-settings-enterprise]

固定来源没有描述数组的删除标记或空值语义（例如「set to null 以删除」），也没有说明 `settings.jsonc` 注释在合并时的处理；这部分未验证。[@ref-amp-settings-enterprise]

## 环境变量与 CLI 参数 {#config-runtime}

**环境变量**在固定来源里被明确写出的有 [@ref-amp-settings-keys][@ref-amp-execute-noninteractive]：

| 变量 | 作用 |
| :-- | :-- |
| `AMP_API_KEY` | 非交互环境用的访问令牌（来自 Settings，以 `sgamp_` 开头）。CLI 拒绝 `amp login` 存下的短时会话令牌，因为它在 1 小时内过期且无法从环境变量刷新。设置后它在该 shell 里保持有效并**优先于已保存的账号**，直到你 unset 它 |
| `AMP_SKIP_UPDATE_CHECK=1` | 覆盖 `amp.updates.mode`，关闭所有更新检查 |
| `AMP_DISABLE_AMP_THREAD_TRAILER=1` | 等价于关掉 `amp.git.commit.ampThread.enabled` |
| `AMP_DISABLE_AMP_COAUTHOR_TRAILER=1` | 等价于关掉 `amp.git.commit.coauthor.enabled` |
| `AMP_FORCE_BEL` | 让通知走终端 bell 而不是主机音频 |
| `AMP_IGNORE_GUIDANCE_FILES` | 冒号分隔的 glob 列表，跳过匹配的指导文件（见下） |
| `AMP_REMOTE_CONTROL_TERMINAL=1` / `=0` | 开关跨客户端终端访问；显式 CLI flag 优先 [@ref-amp-remote-control-terminal] |
| `AMP_URL` | 自定义域名（插件 API 的系统信息里被提到「例如通过 `AMP_URL` 配置的自定义域名」）[@ref-amp-pluginapi-system] |

**代理与证书**走 Node 的标准变量，写在 shell profile 或 CI 环境里 [@ref-amp-settings-proxy]：

```bash
export HTTP_PROXY=your-proxy-url
export HTTPS_PROXY=your-proxy-url
export NODE_EXTRA_CA_CERTS=/path/to/your/certificates.pem
```

**指导文件的环境变量**：`AMP_IGNORE_GUIDANCE_FILES` 是冒号分隔的 glob，Amp 用**绝对路径**匹配（含隐藏目录），路径分隔符用 `/`，`**` 跨目录；`'*'` 表示忽略所有指导文件，阻止 Amp 自动加载任何 `AGENTS.md`。被忽略的文件不会被当作指导读入，但 agent 仍可用工具显式读取。[@ref-amp-agentsmd-ignore]

`AMP_API_KEY` 的优先级来自 CLI 账号管理一节：CLI 会为每个 Amp server 分别保存账号，`amp account switch` 只影响之后启动的进程；而设置了 `AMP_API_KEY` 时它在该 shell 中优先于已保存账号，直到 unset。[@ref-amp-cli-accounts]

**CLI 参数**：`--settings-file PATH` 换用户设置文件；`--mcp-config JSON` 一次性注入 MCP server 而不改设置；`--amp-env` 等价于把 `amp.runner.env.enabled` 置 true；`--remote-control-terminal` / `--no-remote-control-terminal` 覆盖环境变量。参数在**命令行层**介入，与文件配置同时存在时的先后在固定来源里只为少数几组写明（见上表 `AMP_REMOTE_CONTROL_TERMINAL`、`--amp-env` 与设置键等价、`--settings-file` 替换用户设置文件）。[@ref-amp-settings-locations][@ref-amp-execute-noninteractive][@ref-amp-runners-secrets]

runner 的另一个环境来源是 ampcode.com 上的 Secrets & Env Vars：开启后，runner 每次为线程取一遍变量注入 shell 命令与 stdio MCP server，并每 30 秒重新取。同名变量的优先级是 personal → project → workspace → runner 进程环境（前面的覆盖后面的）。[@ref-amp-runners-secrets][@ref-amp-runners-how]

固定来源没有给出「CLI 参数 vs 设置文件」的完整覆盖优先级表（只给了上面几组），也没有描述 profile 概念；这部分未验证。[@ref-amp-settings-locations]

## 信任、策略与生效限制 {#config-trust}

- **工作区 MCP server 需要批准**：`.amp/settings.json` 里的 MCP server 必须先批准才能运行；未批准时 `amp mcp doctor` 显示 `awaiting approval`，用 `amp mcp approve NAME` 批准。用户级设置与 `--mcp-config` 不需要批准。[@ref-amp-mcp-trust]
- **用户级 MCP 策略**：`amp.mcpPermissions` 按**第一条匹配**的规则决定放行或拒绝，无匹配则放行；企业还可以配置 MCP registry，使只有被批准的 server 对成员可用，registry 不可达时全部封锁。[@ref-amp-settings-mcp-permissions][@ref-amp-mcp-registry]
- **托管设置不能碰的键**：`amp.url` 与 `amp.proxy`（会让客户端连不上提供设置的服务器）、`amp.mcpServers`（改由服务端 MCP registry 与托管 MCP server 负责）、`amp.workspaces` 与 `amp.mcpTrustedServers`（只在本机有效）。[@ref-amp-settings-enterprise]
- **跨客户端访问由工作区策略控制**：Workspace 管理员在 Member Settings 里管理 **Cross-Client Access**，默认开启；关闭后成员不能从 web 给 CLI 线程发消息，也不能在 CLI 之外在 runner 上开新线程（web 命令面板隐藏 runner，`create_thread` 工具、Puck 与自动化都无法以 runner 为目标）。[@ref-amp-remote-control-access]
- **只允许工作区 connection**：Enterprise 工作区管理员可以禁止 personal connection，让只有工作区的生效。[@ref-amp-routing-connections]

固定来源没有描述「项目信任」这种本地交互式授权（类似别的工具打开未信任仓库时的提示），除了 MCP server 批准这一条；这部分未验证。[@ref-amp-mcp-trust]

## 默认值、平台差异与迁移 {#config-defaults}

**默认值来自设置清单本身**：每个键都写明 `Type` 与 `Default`，例如 `amp.showCosts` 默认 `true`、`amp.mcpPermissions` 默认 `[]`、`amp.updates.mode` 默认 `"auto"`、`amp.runner.env.enabled` 默认 `false`、`amp.skills.disableClaudeCodeSkills` 默认 `false`、`amp.terminal.detailsExpandedByDefault` 默认 `false`。清单同时给出每个键的用途与生效条件。[@ref-amp-settings-keys][@ref-amp-settings-mcp-permissions][@ref-amp-settings-updates][@ref-amp-settings-runner]

**改默认值的方式**就是在自己的设置文件里写同名键（工作区设置会覆盖用户设置；keymap 例外）。开关类键都是布尔，默认即关闭或开启，写反值即改变行为。[@ref-amp-settings-locations]

**更新的默认行为**：Amp 会在后台自动检查并安装新版本，「你不需要做别的，只要定期重启 Amp」，也可以用 `amp update` 手动检查、`amp version` 查看当前版本；`amp.updates.mode` 决定 `"auto"`（默认，自动安装）、`"warn"`（只提示）或 `"disabled"`（不检查）。[@ref-amp-cli-update][@ref-amp-settings-updates]

**平台差异**在固定来源里出现三处 [@ref-amp-settings-locations][@ref-amp-settings-keys]：

- 路径：Windows 用 `%USERPROFILE%\.config\amp\settings.json`，托管文件在 `%ProgramData%\ampcode\`；
- 分隔符：`amp.skills.path` 在类 Unix 用冒号分隔，Windows 用分号；
- 通知：通过 SSH 或设置了 `AMP_FORCE_BEL` 时，Amp 用终端 bell 代替主机音频。

**迁移与兼容**：托管设置（workspace 文档与本地 `managed-settings.json`）支持一个额外字段 `amp.admin.compatibilityDate`，类型 string，格式 `YYYY-MM-DD`，它是「用来决定 Amp 必须为向后兼容应用哪些迁移」的日期。[@ref-amp-settings-enterprise]

固定来源没有描述普通（非托管）配置键的弃用、改名或旧格式导入规则，也没有给出默认值的 schema 全量导出方式；这部分未验证。[@ref-amp-settings-enterprise][@ref-amp-settings-keys]

## 诊断：查看实际生效的来源与重载 {#config-diagnostics}

| 想确认 | 入口 | 来源 |
| :-- | :-- | :-- |
| 工作区托管了哪些键、值是什么、是替换还是合并 | 命令面板（`Ctrl+O`）或空提示里输入 `/`，运行 `settings: show managed`——它列出每个托管键、其值，以及它是替换还是与本地值合并 | [@ref-amp-settings-enterprise] |
| 编辑用户 / 工作区设置 | `amp config edit`，加 `--workspace` 编辑工作区设置 | [@ref-amp-settings-locations] |
| 键名、类型、默认值是否正确 | 在设置文件里加 `"$schema": "https://ampcode.com/cli-settings.schema.json"`，由编辑器校验、提示与补全 | [@ref-amp-settings-keys] |
| 托管键为何没生效 | 核对它是否属于被禁用的五个键（`amp.url`、`amp.proxy`、`amp.mcpServers`、`amp.workspaces`、`amp.mcpTrustedServers`），以及是否被本地 `managed-settings.json` 覆盖 | [@ref-amp-settings-enterprise] |
| 工作区改动何时到达 | 约 10 分钟内或下次启动 | [@ref-amp-settings-enterprise] |
| 工作区 MCP server 为何没跑 | `amp mcp doctor` 看 `awaiting approval`，再 `amp mcp approve NAME` | [@ref-amp-mcp-trust] |
| 键位与可用命令清单 | `amp config keymap` 打印完整键位表与所有可用命令 | [@ref-amp-keybindings-shortcuts] |

**「文件已写但没有生效」的常见原因**（按来源可判定的部分）：写到了错误的 OS 路径；把键写在了 workspace 文件但被用户文件的 keymap 例外规则反过来覆盖（仅 keymap）；键属于托管设置禁用清单；改动的是托管设置但客户端还没到 10 分钟窗口或还没重启；MCP server 属于 workspace 作用域且尚未批准。[@ref-amp-settings-locations][@ref-amp-keybindings-keymap][@ref-amp-settings-enterprise][@ref-amp-mcp-trust]

固定来源没有提供「打印最终合并结果」的命令（托管键有一个，普通键没有），也没有 `amp config get`/`show` 这类子命令的记载；能在 shell 里确认设置的手段只有 `amp config edit` 与 `amp config keymap`、`amp config model-providers`，其余要靠 TUI 面板或让 agent 读取。这是明确缺口。[@ref-amp-settings-enterprise][@ref-amp-settings-locations]
