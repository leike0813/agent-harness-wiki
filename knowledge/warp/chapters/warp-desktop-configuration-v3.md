---
schema_version: 3
record_kind: production
edition_id: warp-desktop-configuration-v3
harness_id: warp
topic: configuration
title: "Warp 桌面端的配置机制：settings.toml、文件位置与热重载"
sections:
  - section_id: config-sources
    surface_ids: [desktop]
    source_refs: [ref-warp-files-buckets-20261004, ref-warp-files-macos-20261004, ref-warp-files-linux-20261004, ref-warp-files-windows-20261004, ref-warp-files-cross-20261004, ref-warp-files-preview-20261004, ref-warp-files-wsl-20261004, ref-warp-settings-location, ref-warp-settings-format, ref-warp-allsettings-knowledge, ref-warp-allsettings-mcp, ref-warp-allsettings-profiles, ref-warp-allsettings-warp-agent, ref-warp-integrations-docker, ref-warp-integrations-raycast, ref-warp-files-cli-macos-20261008, ref-warp-files-cli-windows-20261008, ref-warp-files-cli-linux-20261008]
  - section_id: config-merge
    surface_ids: [desktop]
    source_refs: [ref-warp-settings-apply, ref-warp-settings-troubleshoot, ref-warp-settings-migrate, ref-warp-files-preview-20261004, ref-warp-profiles-denylist, ref-warp-profiles-yolo, ref-warp-allsettings-warp-agent, ref-warp-rules-project, ref-warp-mcp-security]
  - section_id: config-runtime
    surface_ids: [desktop]
    source_refs: [ref-warp-settings-intro, ref-warp-settings-apply, ref-warp-settings-open, ref-warp-settings-common, ref-warp-slash-static, ref-warp-files-linux-20261004, ref-warp-files-wsl-20261004, ref-warp-skills-extra, ref-warp-envvars-manage, ref-warp-envvars-static, ref-warp-envvars-dynamic, ref-warp-envvars-use, ref-warp-yaml-workflows-save, ref-warp-yaml-workflows-create, ref-warp-launch-create, ref-warp-launch-format, ref-warp-allsettings-keys, ref-warp-endpoint-managed]
  - section_id: config-diagnostics
    surface_ids: [desktop]
    source_refs: [ref-warp-settings-open, ref-warp-settings-apply, ref-warp-settings-troubleshoot, ref-warp-settings-intro, ref-warp-files-wsl-20261004]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [desktop]
        section_id: config-sources
        status: answered
        source_refs: [ref-warp-files-buckets-20261004, ref-warp-files-macos-20261004, ref-warp-files-linux-20261004, ref-warp-files-windows-20261004, ref-warp-files-cross-20261004, ref-warp-settings-location, ref-warp-files-cli-macos-20261008, ref-warp-files-cli-windows-20261008, ref-warp-files-cli-linux-20261008]
  - question_id: config.overrides
    answers:
      - surface_ids: [desktop]
        section_id: config-merge
        status: partial
        source_refs: [ref-warp-settings-apply, ref-warp-profiles-denylist, ref-warp-allsettings-warp-agent, ref-warp-files-preview-20261004]
  - question_id: config.runtime
    answers:
      - surface_ids: [desktop]
        section_id: config-runtime
        status: answered
        source_refs: [ref-warp-settings-intro, ref-warp-slash-static, ref-warp-files-linux-20261004, ref-warp-files-wsl-20261004, ref-warp-skills-extra, ref-warp-envvars-manage, ref-warp-yaml-workflows-save, ref-warp-launch-create]
  - question_id: config.trust
    answers:
      - surface_ids: [desktop]
        section_id: config-merge
        status: partial
        source_refs: [ref-warp-mcp-security, ref-warp-profiles-yolo]
  - question_id: config.defaults
    answers:
      - surface_ids: [desktop]
        section_id: config-sources
        status: answered
        source_refs: [ref-warp-allsettings-knowledge, ref-warp-allsettings-mcp, ref-warp-allsettings-profiles, ref-warp-integrations-docker, ref-warp-files-windows-20261004, ref-warp-files-cli-macos-20261008, ref-warp-files-cli-windows-20261008, ref-warp-files-cli-linux-20261008]
  - question_id: config.migration
    answers:
      - surface_ids: [desktop]
        section_id: config-merge
        status: answered
        source_refs: [ref-warp-settings-migrate, ref-warp-rules-project]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [desktop]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-warp-settings-troubleshoot, ref-warp-settings-intro, ref-warp-settings-open, ref-warp-files-wsl-20261004]
---

## 配置来源与默认值 {#config-sources}

固定来源是 Warp 官方文档站的 Markdown 快照（Settings file、All settings、File and folder locations、Warp Drive、YAML Workflows、Launch Configurations、Environment variables 等页）。File and folder locations 页的最新固定快照是 2026-10-08 观察到的 `25fd32b5785a`，本节的 Warp Agent CLI 安装位置来自该快照。Warp 是闭源桌面产品，来源是文档快照而非源码提交，本章保持 source-level 知识与 unknown 版本适用性。

Warp 把自己的文件分成三类，目录因平台而异；理解这个分类才能解释为什么主题与设置分居不同根目录（macOS 与 Linux 恰好都落在同一个根下，Windows 不是）[@ref-warp-files-buckets-20261004]：

| 类别 | 内容 | macOS（Stable） | Linux | Windows |
| :-- | :-- | :-- | :-- | :-- |
| 可迁移用户数据 | themes、tab_configs、default_tab_configs、workflows、launch_configurations | `~/.warp/*` | `${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/*` | `%APPDATA%\warp\Warp\data\*`（Roaming） |
| 非迁移配置 | `settings.toml`、`keybindings.yaml` | `~/.warp/` | `${XDG_CONFIG_HOME:-$HOME/.config}/warp-terminal/` | `%LOCALAPPDATA%\warp\Warp\config\` |
| 非迁移状态 | 日志、本地数据库、Codebase Context 索引、MCP 日志、cache | `~/Library/Logs/warp.log*`、Group Containers 目录、`~/Library/Logs/DiagnosticReports/` | `${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/`、`${XDG_CACHE_HOME:-$HOME/.cache}/warp-terminal/` | `%LOCALAPPDATA%\warp\Warp\data\`、`%LOCALAPPDATA%\warp\Warp\cache\` |

三平台的原始路径见对应引用 [@ref-warp-files-macos-20261004][@ref-warp-files-linux-20261004][@ref-warp-files-windows-20261004]。每类都多出一项本轮新增的细节：macOS 记录了崩溃报告 `~/Library/Logs/DiagnosticReports/`（Warp 的 `.ips` 文件），Windows 与 Linux 各自记录了独立 cache 目录，Linux 另外明确所有路径走 XDG 规范并逐项带默认回退。Windows 侧值得单独记住的是：可迁移数据在 `%APPDATA%`、状态在 `%LOCALAPPDATA%`，因此**存在两个 `data\` 目录**，定位文件时必须看完整路径 [@ref-warp-files-windows-20261004]。

另有一组**跨平台、永远落在 home 下**的文件：MCP server 配置 `~/.warp/.mcp.json`、bundled skills `~/.warp/skills/`、agent config `~/.agents/`；Stable 与 Preview 共用 `~/.warp/` 这一部分，所以装 Preview 会共享同一批 MCP server 与 skills。其他发布通道则使用带通道后缀的目录，例如 OSS 通道的 `~/.warp-oss/` [@ref-warp-files-cross-20261004]。

2026-10-08 的快照给这组跨平台路径新增了一项 **Warp Agent CLI 安装位置**（标注为"安装脚本的默认值"，即只是默认而非唯一可改的安装点）[@ref-warp-files-cli-macos-20261008][@ref-warp-files-cli-windows-20261008]：

| 平台 | CLI 安装目录 | 启动入口 |
| :-- | :-- | :-- |
| macOS | `~/.warp/tui/` | `~/.local/bin/` 下的 `warp` 符号链接 |
| Linux | `~/.warp/tui/` | `~/.local/bin/` 下的 `warp` 符号链接 |
| Windows | `%LOCALAPPDATA%\Warp\tui\` | Stable 启动器 `%LOCALAPPDATA%\Warp\bin\warp.cmd` |

注意 Windows 上 CLI 的两处路径都落在 `%LOCALAPPDATA%` 下，与上一节 Windows 桌面端自身的 `%LOCALAPPDATA%\warp\Warp\`（注意 `warp` 与 `Warp` 大小写不同、目录名也不同）是两套路径；卸载 CLI 而保留桌面端走的是另一篇文档 [@ref-warp-files-cli-linux-20261008]。CLI 安装目录位于文档所说的跨平台 `~/.warp/` carve-out 内，但 Preview 通道一小节只把 MCP 配置与 skills 列为 Stable/Preview 共享，**没有**把 CLI 安装目录写进共享列表，因此 Preview 下 CLI 落在哪个目录在本轮固定来源中没有依据 [@ref-warp-files-preview-20261004]。

`settings.toml` 的准确位置按平台与发布通道区分（例如 macOS Stable `~/.warp/settings.toml`、Preview `~/.warp-preview/settings.toml`；Linux Stable `~/.config/warp-terminal/settings.toml`；Windows Stable `%LOCALAPPDATA%\warp\Warp\config\settings.toml`）[@ref-warp-settings-location]。Preview 通道按平台各自换目录名：macOS 把 `~/.warp/` 换成 `~/.warp-preview/`；Windows 把 `\warp\Warp\` 换成 `\warp\WarpPreview\`，注册表键为 `HKCU:\Software\Warp.dev\WarpPreview`（无连字符，`Warp-Preview` 是 macOS bundle id 而非 Windows 应用名）；Linux 给每个 `warp-terminal` 目录追加 `-preview`（例如 `~/.config/warp-terminal-preview/settings.toml`）。唯一例外是上面那组 `~/.warp/` 共享文件 [@ref-warp-files-preview-20261004]。

`settings.toml` 用 **TOML v1.1**，按 TOML 表分区，点号表示子表：`[general]`、`[appearance]`（含 `[appearance.text]`、`[appearance.themes]`、`[appearance.cursor]`）、`[agents]`（含 `[agents.profiles]`、`[agents.warp_agent.input]`）、`[terminal]`（含 `[terminal.input]`）[@ref-warp-settings-format]。随应用附带一份**只读 JSON schema**，可用于编辑器补全与校验，路径同样按平台与通道区分（例如 Linux Stable `/opt/warpdotdev/warp-terminal/resources/settings_schema.json`）[@ref-warp-settings-location]。

**默认值**由内置 schema 与应用提供，`All settings reference` 逐项列出类型与默认值。与 agent 主题相关的默认值举例：`[agents.knowledge] rules_enabled` 默认 `true`、`warp_drive_context_enabled` 默认 `true` [@ref-warp-allsettings-knowledge]；`[agents.mcp_servers] file_based_mcp_enabled` 默认 `false`（即第三方 agent 的全局文件型 MCP server 要显式打开才自动 spawn）[@ref-warp-allsettings-mcp]；`[agents.profiles] agent_mode_coding_permissions` 默认 `"always_ask_before_reading"`、`agent_mode_execute_readonly_commands` 默认 `false`、命令 allowlist/denylist 各有一组默认正则 [@ref-warp-allsettings-profiles]；`[agents.warp_agent] is_any_ai_enabled` 默认 `true`，其 `Input`/`Other` 子表还有 `auto_approve_bypasses_command_denylist` 默认 `true` 等开关 [@ref-warp-allsettings-warp-agent]。

**平台差异**也属于"默认/可用性"的一部分：Docker 扩展与 Raycast 扩展当前仅 macOS 可用 [@ref-warp-integrations-docker][@ref-warp-integrations-raycast]；Windows 上 Warp 当前不加载 `~/.warp/tab_configs/` 与 `~/.warp/themes/` 这两个 home 路径，它们只在 macOS 生效，从别的机器带来的文件必须先复制或软链到 `%APPDATA%\warp\Warp\data\` 才会起作用 [@ref-warp-files-wsl-20261004]；Warp Agent CLI 的安装目录同样是按平台取不同默认值（macOS/Linux `~/.warp/tui/`、Windows `%LOCALAPPDATA%\Warp\tui\`），且文档明确把这几个路径标为安装脚本的默认值而非强制路径 [@ref-warp-files-cli-macos-20261008][@ref-warp-files-cli-windows-20261008][@ref-warp-files-cli-linux-20261008]。

## 作用域、优先级与迁移 {#config-merge}

`settings.toml` 与图形 Settings 面板**代表同一份配置**：面板里改开关会写入文件，手改文件下次读取时反映到面板 [@ref-warp-settings-apply]。因此桌面端是**单一用户级配置文件**，没有按项目覆盖 `settings.toml` 的机制——固定来源给出的配置作用域只有"用户级 + 发布通道隔离"（Stable 与 Preview 各一套）[@ref-warp-files-preview-20261004]；需要按项目生效的配置改用项目内文件（见下一节）。

已记录的优先级规则：

- **配置对象内部**：`Apply code diffs` 的 `Agent decides` 等同于 `Always ask`；command denylist 优先于 allowlist 与 `Agent decides` [@ref-warp-profiles-denylist]；`Run until completion` 默认绕过 command denylist，可用 `auto_approve_bypasses_command_denylist = false`（`[agents.warp_agent.other]`，默认 `true`）关闭，企业经 Admin Panel 下发的 denylist 永不被绕过 [@ref-warp-profiles-yolo][@ref-warp-allsettings-warp-agent]。
- **同目录规则文件**：如果 `WARP.md` 与 `AGENTS.md` 同时存在，`WARP.md` 优先 [@ref-warp-rules-project]。

**信任闸门**：MCP 配置文件能启动本地命令并外发数据，因此对 MCP 配置文件的编辑必须显式批准，且任何 provider 的项目级 MCP server 永不自启、要逐个手动批准（会话级）[@ref-warp-mcp-security]。

文件级合并/删除标记：TOML 没有数组"追加 vs 替换"的删除标记语义记录；文档只说明**值不合法时**（无效 TOML 或未识别取值）Warp 显示警告横幅并对受影响项回退默认，删掉 `settings.toml` 则整体回到内置默认 [@ref-warp-settings-apply][@ref-warp-settings-troubleshoot]。

**迁移**：升级到带 settings 文件的版本时，Warp 自动把既有偏好迁移进 `settings.toml`，之后文件成为所有设置的 source of truth [@ref-warp-settings-migrate]。更早的偏好存放位置在文档里被标为 legacy：macOS 的 `defaults` 域 `dev.warp.Warp-Stable`、Windows 注册表键 `HKCU:\Software\Warp.dev\Warp` [@ref-warp-settings-migrate]。项目规则文件也有迁移路径：`WARP.md` 可随时改名为 `AGENTS.md`，二者都继续被支持 [@ref-warp-rules-project]。

## 运行时的介入点：profile、环境变量与项目文件 {#config-runtime}

- **热重载**：Warp 监听 `settings.toml`，保存即生效，无需重启；修正错误后横幅自动消失 [@ref-warp-settings-intro][@ref-warp-settings-apply]。
- **文件入口**：Settings 面板底部 **Open settings file**；会话内 `/open-settings-file` 直接用 Warp 代码编辑器打开；Agent 侧的 `modify-settings` skill 可用自然语言改设置 [@ref-warp-settings-open][@ref-warp-slash-static][@ref-warp-settings-intro]。
- **profile**：Agent 的 execution profile 用 `/profile` 在会话内切换 [@ref-warp-slash-static]；Profile 的权限字段也可以直接写在 `settings.toml` 的 `[agents.profiles]` 下（文档给了示例）[@ref-warp-settings-common]。
- **环境变量**：三个 XDG 变量（`XDG_DATA_HOME`、`XDG_CONFIG_HOME`、`XDG_STATE_HOME`，各自带默认回退）决定 Linux 上的全部路径 [@ref-warp-files-linux-20261004]。云运行的 skill 发现额外目录由 `WARP_SKILL_DIRS` 控制 [@ref-warp-skills-extra]。
- **Warp Drive 环境变量**：可把静态值与动态密钥（1Password、LastPass、HashiCorp Vault 等）保存到 Warp Drive，点击即载入终端会话 [@ref-warp-envvars-manage]；静态变量是 name/value 对 [@ref-warp-envvars-static]，动态变量引用外部密钥管理器 [@ref-warp-envvars-dynamic]，载入后即可在会话中使用 [@ref-warp-envvars-use]。
- **项目内文件**：YAML Workflows 可放本机（`~/.warp/workflows/` 等）或仓库内 `{{path_to_git_repo}}/.warp/workflows/` [@ref-warp-yaml-workflows-save]；workflow 是 `.yaml`/`.yml`，必填 `name` 与 `command`，可选 `tags`、`description`、`source_url`、`author`、`author_url`、`shells`（限 `zsh|bash|fish`）与 `arguments`（`name`/`description`/`default_value`）[@ref-warp-yaml-workflows-create]。Launch Configuration（legacy）同样是 YAML，按窗口/标签/分屏组织并可在启动时执行命令 [@ref-warp-launch-create][@ref-warp-launch-format]。
- **跨系统共享配置**：Windows + WSL 场景下，WSL 的 `$HOME` 与 Windows 用户目录是两个文件系统，同名的 `~/.warp/` 与 `~/.agents/` **不会**自动指向同一份内容；要共享必须为每个想共享的目录单独建软链，指向 Windows 侧路径 [@ref-warp-files-wsl-20261004]。
- **凭据类设置**：Bedrock 相关开关与 profile 名写在 `[cloud_platform.third_party_api_keys]`；文档明确 BYOK 的 key 不进 `settings.toml`，而是落本机安全存储 [@ref-warp-allsettings-keys][@ref-warp-endpoint-managed]。

## 诊断 {#config-diagnostics}

- **文件是否被读取**：Settings 面板的 **Open settings file** 与手改文件后的双向同步是最直接的检查 [@ref-warp-settings-open][@ref-warp-settings-apply]。
- **"文件已写但没生效"**：如果 `settings.toml` 有语法或取值错误，Warp 在工作区顶部显示可关闭的警告横幅并带 **Open settings file** 按钮，同时对该设置回退默认；修好保存后横幅自动消失。文档列出的常见错误是缺引号、缺方括号、值类型不对 [@ref-warp-settings-troubleshoot]。
- **恢复默认**：删除（或改名）`settings.toml` 后重启 Warp；文件会在下次经 Settings 面板改动设置时重建 [@ref-warp-settings-troubleshoot]。
- **重载**：保存即热重载，不需要重启；这覆盖 `settings.toml`，但固定来源没有说明这些项目内文件（workflows、launch configurations）是否需要重启才被重新读取 [@ref-warp-settings-intro]。
- **WSL 软链没生效**：若 WSL 内 `~/.warp` 或 `~/.agents` 已经存在，`ln` 会在既有目录**内部**建链而不是替换它；正确做法是先移除或备份这两个目录再建链。另外主题与 tab config 只能软链到 `%APPDATA%\warp\Warp\data\`，链到 WSL `$HOME` 下无效 [@ref-warp-files-wsl-20261004]。

未验证：`settings.toml` 未知键是否报错、schema 校验失败时的逐键提示内容，以及桌面端是否存在组织级配置下发（Admin Panel 只被记录为 team-managed keys / routers / denylist 的入口，见 custom_providers 与 custom_agents 章） [@ref-warp-settings-troubleshoot]。
