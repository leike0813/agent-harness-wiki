---
schema_version: 3
record_kind: production
edition_id: devin-cli-configuration-v1
harness_id: devin
topic: configuration
title: "Devin CLI 的配置机制：来源、覆盖、运行期、信任、默认与迁移"
sections:
  - section_id: config-scope
    surface_ids: [cli]
    source_refs: [ref-devin-mcpc-file, ref-devin-config-locations, ref-devin-configfile-jsonc, ref-devin-ext-where, ref-devin-index-vs]
  - section_id: config-sources-overrides
    surface_ids: [cli]
    source_refs: [ref-devin-configfile-locations, ref-devin-config-locations, ref-devin-rules-local, ref-devin-ts-overview, ref-devin-ts-perms, ref-devin-precedence-root, ref-devin-import-how, ref-devin-import-cursor, ref-devin-import-windsurf, ref-devin-import-claude, ref-devin-import-copilot, ref-devin-import-opencode, ref-devin-import-zed, ref-devin-precedence-layers, ref-devin-config-precedence, ref-devin-precedence-merge, ref-devin-config-projectvsuser, ref-devin-perm-paths]
  - section_id: config-runtime-trust
    surface_ids: [cli]
    source_refs: [ref-devin-cmd-flags, ref-devin-configfile-options, ref-devin-tr-net, ref-devin-cmd-acp, ref-devin-cmd-utilities, ref-devin-ts-perms, ref-devin-perm-precedence, ref-devin-ts-models, ref-devin-ts-websearch, ref-devin-ts-mcp, ref-devin-sys-location, ref-devin-sys-options, ref-devin-sys-behavior, ref-devin-sys-example, ref-devin-ts-sandbox, ref-devin-sandbox-mode, ref-devin-sandbox-how, ref-devin-sandbox-net, ref-devin-sandbox-excl]
  - section_id: config-defaults-migration
    surface_ids: [cli]
    source_refs: [ref-devin-configfile-options, ref-devin-configfile-full, ref-devin-configfile-locations, ref-devin-skills-locations, ref-devin-config-projectvsuser, ref-devin-config-limitations, ref-devin-mcpc-file, ref-devin-precedence-layers, ref-devin-cmd-migrate, ref-devin-import-how, ref-devin-import-disable, ref-devin-import-windsurf, ref-devin-import-copilot, ref-devin-controls-enterprise]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-devin-cmd-utilities, ref-devin-precedence-layers, ref-devin-cmd-doctor, ref-devin-cmd-setup, ref-devin-tr-net, ref-devin-sys-verify, ref-devin-sys-behavior, ref-devin-auth-creds, ref-devin-tr-auth, ref-devin-tr-install, ref-devin-sys-example]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources-overrides
        status: answered
        source_refs: [ref-devin-configfile-locations, ref-devin-config-locations, ref-devin-rules-local, ref-devin-ts-overview, ref-devin-ts-perms, ref-devin-precedence-root, ref-devin-import-how, ref-devin-import-cursor, ref-devin-import-windsurf, ref-devin-import-claude, ref-devin-import-copilot, ref-devin-import-opencode, ref-devin-import-zed, ref-devin-precedence-layers, ref-devin-config-precedence, ref-devin-precedence-merge, ref-devin-config-projectvsuser, ref-devin-perm-paths]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-sources-overrides
        status: partial
        source_refs: [ref-devin-configfile-locations, ref-devin-config-locations, ref-devin-rules-local, ref-devin-ts-overview, ref-devin-ts-perms, ref-devin-precedence-root, ref-devin-import-how, ref-devin-import-cursor, ref-devin-import-windsurf, ref-devin-import-claude, ref-devin-import-copilot, ref-devin-import-opencode, ref-devin-import-zed, ref-devin-precedence-layers, ref-devin-config-precedence, ref-devin-precedence-merge, ref-devin-config-projectvsuser, ref-devin-perm-paths]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime-trust
        status: answered
        source_refs: [ref-devin-cmd-flags, ref-devin-configfile-options, ref-devin-tr-net, ref-devin-cmd-acp, ref-devin-cmd-utilities, ref-devin-ts-perms, ref-devin-perm-precedence, ref-devin-ts-models, ref-devin-ts-websearch, ref-devin-ts-mcp, ref-devin-sys-location, ref-devin-sys-options, ref-devin-sys-behavior, ref-devin-sys-example, ref-devin-ts-sandbox, ref-devin-sandbox-mode, ref-devin-sandbox-how, ref-devin-sandbox-net, ref-devin-sandbox-excl]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-runtime-trust
        status: answered
        source_refs: [ref-devin-cmd-flags, ref-devin-configfile-options, ref-devin-tr-net, ref-devin-cmd-acp, ref-devin-cmd-utilities, ref-devin-ts-perms, ref-devin-perm-precedence, ref-devin-ts-models, ref-devin-ts-websearch, ref-devin-ts-mcp, ref-devin-sys-location, ref-devin-sys-options, ref-devin-sys-behavior, ref-devin-sys-example, ref-devin-ts-sandbox, ref-devin-sandbox-mode, ref-devin-sandbox-how, ref-devin-sandbox-net, ref-devin-sandbox-excl]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-devin-configfile-options, ref-devin-configfile-full, ref-devin-configfile-locations, ref-devin-skills-locations, ref-devin-config-projectvsuser, ref-devin-config-limitations, ref-devin-mcpc-file, ref-devin-precedence-layers, ref-devin-cmd-migrate, ref-devin-import-how, ref-devin-import-disable, ref-devin-import-windsurf, ref-devin-import-copilot, ref-devin-controls-enterprise]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-migration
        status: partial
        source_refs: [ref-devin-configfile-options, ref-devin-configfile-full, ref-devin-configfile-locations, ref-devin-skills-locations, ref-devin-config-projectvsuser, ref-devin-config-limitations, ref-devin-mcpc-file, ref-devin-precedence-layers, ref-devin-cmd-migrate, ref-devin-import-how, ref-devin-import-disable, ref-devin-import-windsurf, ref-devin-import-copilot, ref-devin-controls-enterprise]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-devin-cmd-utilities, ref-devin-precedence-layers, ref-devin-cmd-doctor, ref-devin-cmd-setup, ref-devin-tr-net, ref-devin-sys-verify, ref-devin-sys-behavior, ref-devin-auth-creds, ref-devin-tr-auth, ref-devin-tr-install, ref-devin-sys-example]
---

## 固定来源与范围 {#config-scope}

固定来源是官方文档站 `docs.devin.ai` 的 Devin CLI markdown 快照：`cli/extensibility/configuration.md`、`cli/reference/configuration/config-file.md`、`cli/reference/configuration/global-vs-local.md`、`cli/reference/configuration/read-config-from.md`、`cli/reference/commands.md`、`cli/reference/permissions.md`、`cli/enterprise/system-config.md`、`cli/enterprise/team-settings.md`、`cli/enterprise/devin-auth.md`、`cli/enterprise/controls.md`、`cli/sandbox.md`、`cli/troubleshooting.md`、`cli/extensibility/index.md`。文档未标注软件版本；个别处区分 v3000.3（Local 3.6）前后 [@ref-devin-mcpc-file]。全章为来源级知识，不绑定任何已发布版本。

Devin CLI 用**带注释的 JSON** 配置，分用户级与项目级：用户级是个人默认值，项目级是提交进版本库的团队配置 [@ref-devin-config-locations]。配置文件支持 `//` 行注释与 `/* */` 块注释 [@ref-devin-configfile-jsonc]。所有项目级扩展配置都放在项目根的 `.devin/` 目录下，用户级放在 `~/.config/devin/`（Windows `%APPDATA%\devin\`）[@ref-devin-ext-where]。CLI 本身与云端 Devin 是两套工具，云端的 Knowledge/Playbooks/Secrets 不在 CLI 里 [@ref-devin-index-vs]。

## 配置来源与覆盖规则 {#config-sources-overrides}

**config.sources**：宿主读取的入口如下 [@ref-devin-configfile-locations][@ref-devin-config-locations]：

| 文件 | 用途 |
| - | - |
| `~/.config/devin/config.json`（Windows `%APPDATA%\devin\config.json`，通常 `C:\Users\YOU\AppData\Roaming\devin\config.json`） | 用户级设置 |
| `.devin/config.json` | 项目设置（提交） |
| `.devin/config.local.json` | 项目本地覆盖（gitignored，自动排除） |
| `~/.config/devin/mcp_config.json` | 用户级 MCP server |
| `.devin/mcp_config.json` | 项目 MCP server（提交） |
| `.devin/mcp_config.local.json` | 项目本地 MCP server（gitignored） |
| `system.json`（系统策略文件） | 机器级、管理员下发 |

`.local.` 文件名里的 `.local.` 标记表示"不提交的个人覆盖"，同理适用于 `AGENTS.local.md` [@ref-devin-rules-local]。此外企业管理员通过 Team Settings 在服务端下发组织级设置（模型 allowlist 与默认模型、MCP、终端权限、沙箱强制、web search、attribution filtering），登录后生效 [@ref-devin-ts-overview][@ref-devin-ts-perms]。项目根由向上查找 `.git` 或 `.jj` 目录确定，项目配置从项目根加载；monorepo 里嵌套的 `.devin/` 以更靠下的子目录配置优先 [@ref-devin-precedence-root]。

项目/用户配置之外还有一条"就地导入"来源：`read_config_from` 默认开启，会在会话启动时检测并读取其它工具的标准规则与配置文件——标准项目规则（`AGENTS.md`、`AGENTS.local.md`、`AGENT.md`、`.windsurfrules`）、Cursor 的 `.cursor/rules/*.md`/`*.mdc` 与 `.cursor/mcp.json`、Windsurf 的 `.windsurf/rules/` 与 skills 与 `~/.codeium/CHANNEL/mcp_config.json`、Claude Code 的 `.claude/`（规则、skills、commands、MCP）、GitHub Copilot 的 `.github/skills/`、OpenCode 的 `opencode.json`、Zed 的 `.zed/settings.json` [@ref-devin-import-how][@ref-devin-import-cursor][@ref-devin-import-windsurf][@ref-devin-import-claude][@ref-devin-import-copilot][@ref-devin-import-opencode][@ref-devin-import-zed]。

**config.overrides**：多来源优先级从高到低是 [@ref-devin-precedence-layers]：

| 优先级 | 来源 | 是否共享 |
| - | - | - |
| 1（最高） | 组织/团队设置 | 企业共享 |
| 2 | 会话内交互授权 | 否（仅内存） |
| 3 | 项目本地 `.devin/config.local.json` | 否（gitignored） |
| 4 | 项目 `.devin/config.json` | 是（提交） |
| 5（最低） | 用户 `~/.config/devin/config.json` | 否 |

组织级设置**永远**不能被项目或用户配置覆盖 [@ref-devin-config-precedence]。同一设置在多层级出现时高层胜出；合并语义按类型分三种 [@ref-devin-precedence-merge]：

- **permissions** 跨层**合并**（拼接），高层拒绝不能被低层允许推翻；
- **MCP server** 按**名字**合并，高层同名覆盖低层；
- **hooks** 从所有来源**收集**并全部运行，互不覆盖。

不是所有键都能写在每一层——项目配置只支持 `permissions`、`read_config_from`、`hooks`（`mcpServers` 另在 `mcp_config.json`），`agent`(model)、`theme_mode`、`unicode_mode`、`show_path`、`show_hints`、`include_gitignored_files`、`sandbox` 是**用户配置专有**，只能写在用户配置，且不参与上述优先级链 [@ref-devin-config-projectvsuser]。空值、数组替换与删除标记的逐键统一规则没有给出；只有 permissions 合并、MCP 同名覆盖、hooks 收集三种语义写清楚，其余 partial。一个容易踩的细节：`Read(**)` 这种不带前导 `/` 的 glob 是相对当前工作目录解析的，只匹配该目录下的文件，要匹配系统上所有文件得写 `Read(/**)` [@ref-devin-perm-paths]。

## 运行期介入与信任边界 {#config-runtime-trust}

**config.runtime**：环境变量与 CLI 参数在会话启动时介入，覆盖文件配置 [@ref-devin-cmd-flags]：

| 变量/参数 | 作用 |
| - | - |
| `DEVIN_MODEL` / `--model MODEL` | 该会话的模型 |
| `DEVIN_PERMISSION_MODE` / `--permission-mode MODE` | 权限模式：`normal`（别名 `auto`，默认）、`accept-edits`、`smart`、`dangerous`（别名 `yolo`/`bypass`）、`autonomous`（需 `--sandbox`） |
| `DEVIN_SANDBOX` / `--sandbox` | 沙箱（Research Preview，macOS seatbelt / Linux bwrap+seccomp） |
| `--config PATH` | 指定配置文件路径 |
| `--respect-workspace-trust [true\|false]` | 是否遵守工作区信任设置，默认 `true` |

代理相关变量在 `proxy.mode: "system"`（默认）下被读取：`HTTP_PROXY`、`HTTPS_PROXY`、`ALL_PROXY`（含 `socks5://`）与 `NO_PROXY`（逗号分隔、语法同 `NO_PROXY` 环境变量），macOS/Windows 还遵守平台原生 PAC [@ref-devin-configfile-options][@ref-devin-tr-net]。日志变量 `RUST_LOG` 与 `CHISEL_LOG_STDOUT`/`CHISEL_LOG_STDERR` 控制请求级 trace 输出 [@ref-devin-tr-net]。`devin acp` 这条路径优先读 `WINDSURF_API_KEY` 作为凭据，否则读 `devin auth login` 存的凭据 [@ref-devin-cmd-acp]。`/config` 打开交互式配置编辑器（命令参考把 `/config` 归在 Utilities 一类）[@ref-devin-cmd-utilities]。来源中没有 **profile（配置档案）** 概念，覆盖手段只有文件层级加环境变量/参数。

**config.trust**：四层限制。

其一，**工作区信任**：`--respect-workspace-trust` 默认 `true`；非交互 `--print` 模式无法弹信任提示，在不受信目录会失败，脚本/CI 里要显式传 `--respect-workspace-trust false` [@ref-devin-cmd-flags]。

其二，**组织策略**：Team Settings 的终端权限是一个含 `deny`/`ask`/`allow` 三字段的 JSON，deny 优先、ask 次之、allow 最后；其规则优先级最高、不可被用户本地或项目配置覆盖，deny/ask 在用户切到 Smart 或 Bypass 时依然生效 [@ref-devin-ts-perms][@ref-devin-perm-precedence]。Team Settings 还能设模型 allowlist、web search 开关（企业默认关闭）、MCP 开关与 registry、沙箱强制与组织域名过滤 [@ref-devin-ts-models][@ref-devin-ts-websearch][@ref-devin-ts-mcp]。

其三，**机器级策略** `system.json`：只允许管理员写入的目录（macOS `/Library/Application Support/Devin/system.json`、Linux `/etc/devin/system.json`、Windows `C:\ProgramData\Devin\system.json`），可钉住企业登录 host 与账号、强制出站代理 [@ref-devin-sys-location]。字段有三个：`enterprise_host`（`devin auth login` 跳过登录方式菜单并直接对配置 host 认证，拒绝其它 host 的账号，且拒绝旧的 Windsurf 登录路径；值大小写不敏感、忽略 scheme）、`account_id`（进一步限定租户，仅 host 匹配不够时用）、`proxy`（形状与用户配置相同，优先级更高且**两处都配即报错**，CLI 启动即退出并要求用户移除本地 `proxy` 段）[@ref-devin-sys-options][@ref-devin-sys-behavior]。`system.json` 按**严格 JSON** 解析，不支持注释与尾逗号（与用户配置的 JSON-with-comments 不同）[@ref-devin-sys-example]。文件缺失或解析失败时按"无强制"处理（不会禁用 CLI），未知字段被忽略，畸形字段只丢该字段 [@ref-devin-sys-behavior]。

其四，**沙箱强制与权限边界**：Team Settings 可把 `--sandbox` 设为 Required（对所有会话强制，Windows 上会因此无法运行 CLI，需先确认所有目标机器）；Enforcement mode 在**每个 prompt 开始时**重读，会话中途从 Optional 切到 Required 会让当前会话拒绝继续并提示重启 [@ref-devin-ts-sandbox][@ref-devin-sandbox-mode]。沙箱本身：可写路径来自已授予的 `Write(...)` scope 加工作区目录，其余只读；`Read(...)` deny 覆盖的路径对沙箱内命令完全隐藏；中途授予 `Write(...)` 会动态扩大沙箱 [@ref-devin-sandbox-how]。网络过滤配在用户配置的 `sandbox` 段（`allowed_domains`、`denied_domains`、`network_mode` = `full|limited`），仅在 `--sandbox` 生效；企业 allowlist 是**权威**（替换用户列表），企业 denylist 是**叠加**的 [@ref-devin-sandbox-net]。个别命令可用 `sandbox.excluded` 的 `allow/ask/deny` 排到沙箱外，规则解析是"同源内更具体者胜、跨源更严格者胜（deny > ask > allow）"，无匹配规则一律留在沙箱内 [@ref-devin-sandbox-excl]。沙箱解析失败时 CLI **拒绝启动**（fail-closed），Linux 缺 `bwrap`/`socat` 会带安装提示硬失败 [@ref-devin-sandbox-how]。

## 默认值、平台差异与迁移 {#config-defaults-migration}

**config.defaults**：默认值集中在配置参考的选项表里 [@ref-devin-configfile-options][@ref-devin-configfile-full]：

| 键 | 默认 | 备注 |
| - | - | - |
| `agent.model` | `"swe-1-6-fast"` | 用户配置专有 |
| `agent.show_history_on_continue` | `true` | 恢复会话时显示历史消息 |
| `theme_mode` | `null` | 自动检测（首次运行询问） |
| `show_path` | `false` | 在输入框边框显示 CWD |
| `unicode_mode` | `"auto"` | 可选 `"unicode"`/`"ascii"` |
| `show_hints` | `true` | 轮次间显示提示 |
| `include_gitignored_files` | `false` | 是否让被 gitignore 的文件进入 `@` 补全 |
| `respect_gitignore` | `false` | 是否阻止工具访问被 gitignore 的路径 |
| `attribution` | `true` | 提交/PR 加 `Generated with [Devin]` 与 `Co-Authored-By` |
| `subagents_enabled` | `true` | 关闭后移除 `run_subagent`/`read_subagent` |
| `auto_update` | `true` | 后台安装新版本（仅 curl 安装的自管安装） |
| `notify` | `"smart"` | 终端通知：`never`/`smart`/`always` |
| `proxy.mode` | `"system"` | 可选 `manual`/`off` |
| `sandbox.network_mode` | `"full"` | `limited` 只允许 GET/HEAD/OPTIONS |
| `read_config_from.*` | 全 `true` | `null` 视作 `true` |

平台差异主要是路径：Windows 用 `%APPDATA%\devin\` 而非 `~/.config/devin/`，`%APPDATA%` 通常解析为 `C:\Users\YOU\AppData\Roaming` [@ref-devin-configfile-locations]；`~/.config/devin/` 的 skills 在 Windows 对应 `%APPDATA%\devin\skills\` [@ref-devin-skills-locations]。功能开关的默认值都在用户配置里改，但 `agent`、`theme_mode`、`unicode_mode`、`show_path`、`sandbox` 等只能写在用户配置 [@ref-devin-config-projectvsuser]。一个行为边界：CLI 单独运行时只遵守 `.gitignore`，**不**强制 `.devinignore`/`.codeiumignore`/`.windsurfignore`；只有跑在 Devin Desktop 里时才四个都强制 [@ref-devin-config-limitations]。

**config.migration**：三类迁移。

其一，**MCP 位置迁移**：v3000.3（Local 3.6）起 MCP server 从主配置文件的 `mcpServers` 键迁到专用 `mcp_config.json`，新版本启动时自动迁移旧键 [@ref-devin-mcpc-file][@ref-devin-precedence-layers]。

其二，**显式迁移命令** [@ref-devin-cmd-migrate]：

```bash
devin migrate hooks                     # .windsurf/hooks.json -> .devin/hooks.v1.json
devin migrate workflows --scope all     # workflow 文件 -> skills，并删除原件（all|workspace|global）
```

迁移是一次性拷贝；被原地读取的配置（Cursor/Windsurf/Claude/Copilot/OpenCode/Zed 的 rules、skills、MCP）不需要迁移 [@ref-devin-cmd-migrate][@ref-devin-import-how]。

其三，**兼容读取与旧控制回落**：`read_config_from` 默认开着，就地读取其它工具格式，可用 `"read_config_from": {"windsurf": false}` 这类写法按来源关闭 [@ref-devin-import-disable]；Windsurf 的 workflows 明确**不**作为 skill 导入 [@ref-devin-import-windsurf]；Copilot 的自定义指令（`.github/copilot-instructions.md` 与 `*.instructions.md`）也**不**导入 [@ref-devin-import-copilot]。企业侧旧控制项在未配置新的 CLI 权限前仍作为回落生效：Auto Run Terminal Commands、Terminal allow/deny lists（Restrict Tool Calls to Workspace、Global tool calling disabled 等则没有对应物，需改用权限策略）[@ref-devin-controls-enterprise]。配置键的弃用时间表与版本兼容矩阵没有统一文档，partial。

## 诊断 {#config-diagnostics}

- **配置是否被读取 / 生效来源**：`/config` 打开交互式配置编辑器 [@ref-devin-cmd-utilities]；分层与合并规则以 `global-vs-local` 页面为准（上节的优先级表即来自该页）[@ref-devin-precedence-layers]。
- **本地配置体检**：`devin doctor` 诊断本地 Devin 配置，报告加载了哪些自定义 subagent profile、标记 frontmatter 无法解析的 `AGENT.md`（运行时被跳过）、对 Devin 忽略的 frontmatter 键给出警告，任何检查失败返回非零；`devin doctor --json` 输出机器可读结果 [@ref-devin-cmd-doctor]。`devin setup` 是认证与 MCP 配置的交互式向导（远程/SSH 会话可加 `--force-manual-token-flow`）[@ref-devin-cmd-setup]。
- **网络/请求层**：`RUST_LOG="chisel=trace,windsurf_api_client=trace,connect_rpc=trace,reqwest=trace,hyper=trace,hyper_util=trace,rustls=trace"` 配合 `CHISEL_LOG_STDOUT=1` 打开 trace [@ref-devin-tr-net]。日志始终写入每次运行的日志文件 `~/.local/share/devin/cli/logs/devin_TIMESTAMP_PID.log`（Windows `%APPDATA%\devin\cli\logs\`），48 小时未动过的日志启动时 gzip，可用 `zgrep`/`rg -z` 检索；trace 日志可能含 `Authorization` 头与 token，分享前需清洗；交互 REPL 与 ACP 模式会自动抑制 stdout 日志 [@ref-devin-tr-net]。
- **机器策略是否生效**：`devin auth logout && devin auth login`，设了 `enterprise_host` 时不应出现登录方式菜单、打印的登录 URL 应在配置 host 上；再用 `devin auth status` 确认会话 [@ref-devin-sys-verify]。`system.json` 的失败模式表（文件缺失/不可读/字段畸形/未知字段/空值）决定降级行为 [@ref-devin-sys-behavior]。
- **凭据位置**：`credentials.toml`（Linux/macOS `$XDG_DATA_HOME/devin/credentials.toml`，未设 `XDG_DATA_HOME` 则为 `~/.local/share/devin/credentials.toml`；Windows `%APPDATA%\devin\credentials.toml`），默认持久不过期；`devin auth logout` 删除 [@ref-devin-auth-creds]。
- **其它**：登录/授权失败、代理、安装三类问题的排查步骤集中在故障页面 [@ref-devin-tr-auth][@ref-devin-tr-install]。

缺口：没有"打印最终生效配置及每个键来源"的单一命令；`/config` 与 `devin doctor` 的输出字段未在来源中展开；`system.json` 与用户配置语法不同（严格 JSON vs JSON-with-comments）这一点容易误配 [@ref-devin-sys-example]。partial。
