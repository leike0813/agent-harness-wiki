---
schema_version: 3
record_kind: production
edition_id: claude-code-configuration-v3
harness_id: claude-code
topic: configuration
title: Claude Code 的配置来源、优先级与诊断
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-files-20261003
      - ref-cc-config-find-20261003
      - ref-cc-config-localroot-20261003
      - ref-cc-config-localgitignore-20261003
      - ref-cc-config-managedcowork-20261003
      - ref-cc-config-cloud-20261003
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-precedence-20261003
      - ref-cc-config-lists-20261003
      - ref-cc-config-exceptions-20261003
      - ref-cc-config-maxeffort-20261003
      - ref-cc-config-onesession-20261003
      - ref-cc-config-troubleshoot-20261003
      - ref-cc-config-lostsave-20261003
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-confirm-20261003
      - ref-cc-config-reload-20261003
      - ref-cc-config-broken-20261003
      - ref-cc-npm-readme
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-cc-config-files-20261003
          - ref-cc-config-find-20261003
          - ref-cc-config-localroot-20261003
          - ref-cc-config-cloud-20261003
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: partial
        source_refs:
          - ref-cc-config-find-20261003
          - ref-cc-config-localgitignore-20261003
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: partial
        source_refs:
          - ref-cc-config-localroot-20261003
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs:
          - ref-cc-config-precedence-20261003
          - ref-cc-config-lists-20261003
          - ref-cc-config-exceptions-20261003
          - ref-cc-config-maxeffort-20261003
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs:
          - ref-cc-config-onesession-20261003
          - ref-cc-config-troubleshoot-20261003
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs:
          - ref-cc-config-troubleshoot-20261003
          - ref-cc-config-lostsave-20261003
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs:
          - ref-cc-config-confirm-20261003
          - ref-cc-config-reload-20261003
          - ref-cc-config-broken-20261003
---

Claude Code 从若干 JSON 设置文件读取键值，文件所在位置决定它对谁生效；同一键出现在多处时按层级取值，环境变量与命令行在运行时介入。本章依据 2026-10-03 抓取的官方设置页快照，末尾说明它与已选定 npm 包快照的版本关系。

## 配置文件与作用域 {#config-sources}

Claude Code 读四个设置文件，组织还可以从 claude.ai 控制台下发托管设置。每个来源都带作用域，即一份设置对哪些人和项目生效。 [@ref-cc-config-files-20261003]

| 作用域 | 文件 | 对谁生效 | 用途 |
| --- | --- | --- | --- |
| User | `~/.claude/settings.json` | 你在本机每个项目 | 个人偏好：主题、编辑器模式、默认模型、你自己的权限规则 |
| Shared project | `.claude/settings.json` | 该文件夹里的所有人；在 git 仓库里提交后队友同样获得 | 团队权限、hooks、插件，以及项目需要的环境变量 |
| Project local | `.claude/settings.local.json` | 只你在该项目；Claude Code 写入时不会提交 | 单个项目的个人覆盖，或在共享前的试验 |
| Managed | `managed-settings.json` 等托管来源 | 组织部署到的所有人；你的设置不能覆盖，安全敏感键除外 | 安全策略与合规要求 |

文件本身是严格 JSON：`//` 注释或尾随逗号都是语法错误。下面这个放在 `~/.claude/settings.json` 的完整示例让 lint 与 test 命令免批准，并禁止读取 `.env`：

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  }
}
```

`permissions` 下每条是一个命名工具及其允许范围；`$schema` 指向发布的设置 JSON Schema，供编辑器补全与校验，官方同时提醒该 schema 可能落后于最新 CLI 版本，因此对新文档键的校验告警不等于配置无效。 [@ref-cc-config-files-20261003]

第五个文件 `~/.claude.json` 由 Claude Code 自写，不需要手工编辑：登录会话、MCP server 配置、按项目记录的状态（如信任决定），以及 `/config` 写入的 global config 键都在其中。 [@ref-cc-config-find-20261003]

安装 Claude Code 不创建任何设置文件。用户与项目本地文件来自你手工创建，或由 Claude Code 在你第一次改动对应选项时创建：改一个存在用户文件里的 `/config` 选项（如主题）写 `~/.claude/settings.json`，在权限提示上选“Yes, and don't ask again”写 `.claude/settings.local.json`。 [@ref-cc-config-find-20261003]

项目本地文件的落点是本轮来源中变化最大的一条规则。在 git 仓库里，你保存一条常驻批准时，Claude Code 把它作为 `allow` 规则写进 `.claude/settings.local.json`；在子目录启动时，它读写仓库根目录的该文件，并把批准应用到整个仓库，在 worktree 里则用主检出的根文件。 [@ref-cc-config-localroot-20261003]

该文件由 Claude Code 首次写入时会被加入全局 git 忽略文件，因此不会进入提交；全局忽略文件是全局 git 配置里的 `core.excludesFile`（当它被设为绝对路径或以 `~` 开头时），否则是 `$XDG_CONFIG_HOME/git/ignore`，未设置该变量时为 `~/.config/git/ignore`。你手工创建、Claude Code 尚未写过的文件需要自己加进 `.gitignore`。 [@ref-cc-config-localgitignore-20261003]

平台与迁移边界：Windows 上 `~/.claude` 指 `%USERPROFILE%` 下的 `.claude`；把 home 目录文件改存到别处可设置 `CLAUDE_CONFIG_DIR`，Claude Code 随后把设置、会话历史与插件存到那里。自 v2.1.211 起项目本地文件固定在仓库根，宿主仍会读取旧版本留在启动目录里的同名文件，两处同键时根文件的值优先，而权限规则两边都生效。 [@ref-cc-config-localroot-20261003]

云会话是例外：它在仓库的新克隆上运行，不读你的用户文件与项目本地文件；项目的共享文件在单仓库会话里会读取，多仓库会话只读每个仓库的 `enabledPlugins` 与 `extraKnownMarketplaces`，且这两个键声明的 marketplace 与插件在云会话里仍不加载。 [@ref-cc-config-cloud-20261003]

托管设置在本机由 claude.ai 控制台、MDM 或系统目录文件投递；在桌面应用里运行于你机器的 Cowork 会话不从 claude.ai 管理控制台拉取 server-managed 设置，只读已下发到本机的策略。 [@ref-cc-config-managedcowork-20261003]

## 优先级、运行时与信任 {#config-overrides}

同一键出现在多处时，取设置它的最高层级：托管设置高于命令行参数，命令行高于项目本地，项目本地高于共享项目，共享项目高于用户设置。 [@ref-cc-config-precedence-20261003]

特殊规则分两类。列表键跨文件合并而不是覆盖，例如多个文件里的 `permissions.allow` 会被合成一份，每个文件都能新增条目而不移除别人的。四个持有模型列表或按模型条目的键例外：`fallbackModel` 是有序链，取定义它的最高层级的整条值；`modelPicker` 只在托管设置、`--settings`、用户设置三者中取整条，忽略项目与本地文件，并需要 Claude Code v2.1.242 或更高；`availableModels` 在托管层生效时按原样应用、忽略你在低层级新增的条目，非托管作用域之间仍按常规合并；`modelSettings` 按模型逐个解析。 [@ref-cc-config-lists-20261003]

限制性键的例外表在本轮来源中扩到九个：任何作用域的 `true` 都能压过托管的 `false`（`disableClaudeAiConnectors`、`isolatePeerMachines`），任何作用域的 `false` 压过托管的 `true`（`enableArtifact`、`remoteControlAtStartup`，后者只认项目与本地文件），`crossSessionInbound` 在 `accept` 小于 `hold` 小于 `refuse` 的阶梯上取更严格的一侧，`useAutoModeDuringPlan`、`syncClaudeAiSkills` 与 `syncClaudeAiPlugins` 认 `false`，`maxEffortLevel` 取任何作用域（含 `--settings`）给出的更低上限，需要 Claude Code v2.1.267 或更高。 [@ref-cc-config-exceptions-20261003] [@ref-cc-config-maxeffort-20261003]

嵌入宿主也是一条例外：应用内运行 Claude Code 并设置 `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` 时，该应用提供的模型配置压过所有 managed 来源的 `model`、`fallbackModel`、`modelPicker`、`modelOverrides`，以及 managed `env` 里的模型选择变量；托管的 `availableModels` 白名单仍然生效，除非该应用自己提供清单。 [@ref-cc-config-exceptions-20261003]

个人偏好与项目覆盖可以用同一个 `model` 键说明。第一份是用户文件 `~/.claude/settings.json`，作用域是你在本机的每个项目：

```json
{
  "model": "claude-sonnet-5"
}
```

第二份是项目本地文件 `.claude/settings.local.json`，作用域是只你在该项目：

```json
{
  "model": "claude-opus-5-5"
}
```

两份同时存在时，项目本地层级高于用户设置，该项目的会话最终使用 `claude-opus-5-5`，其他项目仍是 `claude-sonnet-5`。若该项目另有共享文件也设同名键，它介于两者之间，个人覆盖要写在项目本地文件里。 [@ref-cc-config-precedence-20261003]

运行时介入有三种方式。`--settings` 可传 JSON 或文件路径，位于用户、项目、本地之上、托管之下，能设置用户文件能设的任何键，但不能设 `Managed` 与 `Global config` 键；部分键另有专属旗标；环境变量不是层级，而是按键成对决定：`ANTHROPIC_MODEL` 覆盖任何文件中的 `model`，`ANTHROPIC_DEFAULT_MODEL` 只在无文件设置 `model` 时生效，文件内的 `env` 块是普通键，仍按层级生效。 [@ref-cc-config-onesession-20261003]

部分键在某些文件里写也不生效。`permissions.defaultMode` 的 `auto` 与 `bypassPermissions` 不从项目或本地文件生效，要写在用户或托管设置里，或者用 `--permission-mode` 只影响一个会话；v2.1.257 之前 `bypassPermissions` 从任何文件都生效。 `env` 里的遥测导出变量同样不从项目或本地文件生效，只有少数关闭值例外。 [@ref-cc-config-troubleshoot-20261003]

项目文件里的另一批键要等信任后才生效：`permissions.allow` 规则、`permissions.additionalDirectories`、`extraKnownMarketplaces` 以及多数 `env` 值在队友信任该目录前不生效，而 `deny` 与 `ask` 规则立即生效。项目本地文件若未被 git 跟踪，其 `allow` 规则无需信任步骤即可生效，一旦被跟踪就要走信任流程。 [@ref-cc-config-troubleshoot-20261003]

还有一类“我改了却丢了”的情况与信任无关：会话内保存的选择会写进用户文件，如果那个文件由别的工具生成或链接到只读副本，写入失败时改动只在当前会话有效，下次会话即失效。 [@ref-cc-config-lostsave-20261003]

## 诊断与版本边界 {#config-diagnostics}

在 Claude Code 里运行 `/status`，Status 标签的 `Setting sources` 行列出本次会话加载的每个设置文件，托管设置生效时还会用括号说明它如何到达本机。它只说明读过哪些文件，不指出每个键来自哪个文件；要列出被拒绝的条目可运行 `claude doctor`，项目或托管设置设定的模型会在启动头部标明来源文件。 [@ref-cc-config-confirm-20261003]

文件保存后 Claude Code 会热重载并把多数改动应用到运行中的会话，包括 `permissions`、`hooks` 与 `apiKeyHelper` 这类凭据 helper；重载覆盖用户、项目、本地与托管设置，并为每次检测到的设置文件变更运行 `ConfigChange` hook，来自 MDM 或 claude.ai 控制台的托管设置不在此列，它们按各自的投递计划到达而不是保存即生效。少数键只在会话启动时读取，例如 `model` 与 `effortLevel`，要中途改变需用 `/model` 或 `/effort`。 [@ref-cc-config-reload-20261003]

JSON 非法或值被 schema 拒绝时，Claude Code 在启动时提示，形式取决于受影响范围：用户、项目或本地文件整体非法时报 Settings Error；只有单项失败（如未知 hook 事件名、格式错误的权限规则）时报 Settings Warning 并跳过该项，文件其余部分继续生效；`~/.claude.json` 无法解析时报 Configuration error，把损坏文件复制到 `~/.claude/backups/.claude.json.corrupted.时间戳`，并可从 `~/.claude/backups/` 里最近五个 `.claude.json.backup.时间戳` 文件恢复。 `-p` 非交互运行不弹对话框，只打印错误或跳过。 [@ref-cc-config-broken-20261003]

关于版本：本章所引设置页未标注适用版本，`version_applicability` 为 unknown，正文涉及多处 v2.1.x 门槛。选定的 npm 包快照记录 `@anthropic-ai/claude-code` 版本为 2.1.283，包内 README 只指向在线文档，不能据此把上述规则固定到该精确版本。 [@ref-cc-npm-readme]
