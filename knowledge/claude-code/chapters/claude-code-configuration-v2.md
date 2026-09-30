---
schema_version: 3
record_kind: production
edition_id: claude-code-configuration-v2
harness_id: claude-code
topic: configuration
title: Claude Code 的配置来源、优先级与诊断
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-files
      - ref-cc-config-find
      - ref-cc-config-home
      - ref-cc-config-cloud
      - ref-cc-config-local
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-precedence
      - ref-cc-config-envpair
      - ref-cc-config-lists
      - ref-cc-config-exceptions
      - ref-cc-config-onesession
      - ref-cc-config-troubleshoot
      - ref-cc-config-local
      - ref-cc-config-confirm
      - ref-cc-npm-readme
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-confirm
      - ref-cc-config-reload
      - ref-cc-config-broken
      - ref-cc-npm-readme
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-cc-config-files
          - ref-cc-config-home
          - ref-cc-config-cloud
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: partial
        source_refs:
          - ref-cc-config-find
          - ref-cc-config-local
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: partial
        source_refs:
          - ref-cc-config-local
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs:
          - ref-cc-config-precedence
          - ref-cc-config-lists
          - ref-cc-config-exceptions
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs:
          - ref-cc-config-envpair
          - ref-cc-config-onesession
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs:
          - ref-cc-config-troubleshoot
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs:
          - ref-cc-config-confirm
          - ref-cc-config-reload
          - ref-cc-config-broken
---

Claude Code 从若干 JSON 设置文件读取键值，文件所在位置决定它对谁生效；同一键出现在多处时按层级取值，环境变量与命令行在运行时介入。下面按“有哪些文件、优先级与信任、怎么排查”三段展开；固定来源为官方设置页，本章末尾说明它与已选定 npm 包快照的版本关系。

## 配置文件与作用域 {#config-sources}

Claude Code 从四个文件读取设置，组织还可以从 claude.ai 控制台下发托管设置。每个来源都有作用域，即一份设置对哪些人和项目生效。 [@ref-cc-config-files]

| 作用域 | 文件 | 对谁生效 | 用途 |
| --- | --- | --- | --- |
| User | `~/.claude/settings.json` | 你在本机每个项目 | 个人偏好：主题、编辑器模式、默认模型、你自己的权限规则 |
| Shared project | `.claude/settings.json` | 该文件夹里的所有人；在 git 仓库里提交后队友同样获得 | 团队权限、hooks、插件，以及项目需要的环境变量 |
| Project local | `.claude/settings.local.json` | 只你在该项目；Claude Code 创建时不会提交 | 单个项目的个人覆盖，或在共享前的试验 |
| Managed | `managed-settings.json` 等托管来源 | 组织部署到的所有人；你的设置不能覆盖，安全敏感键除外 | 安全策略与合规要求 |

文件本身是严格 JSON：`//` 注释或尾随逗号都是语法错误。一个放在 `~/.claude/settings.json` 的完整示例是：

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

`permissions` 下每条是一个命名工具及其允许范围；`$schema` 指向发布的设置 JSON Schema，供编辑器给出补全与校验。 [@ref-cc-config-files]

除了这四个文件，Claude Code 还自写第五个文件 `~/.claude.json`，存放登录会话、MCP server 配置、按项目记录的状态（如信任决定）以及 `/config` 写入的 global config 键。 [@ref-cc-config-find]

安装 Claude Code 不会创建任何设置文件。已有的文件来自：托管来源（组织部署，你不创建也不编辑）；提交过的共享项目文件，否则可在项目文件夹里新建 `.claude/settings.json`；以及你自己创建、或由 Claude Code 创建的用户与项目本地文件——它会在你第一次在 `/config` 菜单改动存到用户文件的选项（如主题）时写入 `~/.claude/settings.json`，在你第一次对权限提示选择“Yes, and don't ask again”时写入 `.claude/settings.local.json`。少数 `/config` 选项（如 Show tips）写项目本地文件。 [@ref-cc-config-find]

平台与迁移：Windows 上 `~/.claude` 指 `%USERPROFILE%` 下的 `.claude`；把 home 目录文件改存到别处可设置 `CLAUDE_CONFIG_DIR`，Claude Code 随后把设置、会话历史与插件存到那里。项目本地文件自 v2.1.211 起固定在仓库根：在 git 仓库的子目录启动时，它读写根目录的该文件，并把批准应用到整个仓库；宿主仍会读取旧版本留在启动目录里的同名文件，两处同键时根文件的值优先，而权限规则两边都生效。 [@ref-cc-config-home] [@ref-cc-config-local]

云会话是例外：它在仓库的新克隆上运行，不读你的用户文件与项目本地文件；项目的共享文件在单仓库会话里会读取（多仓库会话只读每个仓库的 `enabledPlugins` 与 `extraKnownMarketplaces`），托管设置里也只有 server-managed settings 会到达云会话。 [@ref-cc-config-cloud]

## 优先级、运行时与信任 {#config-overrides}

同一键出现在多处时，取设置它的最高层级：托管设置高于命令行参数，命令行高于项目本地，项目本地高于共享项目，共享项目高于用户设置。 [@ref-cc-config-precedence]

特殊规则分两类。列表键跨文件合并而不是覆盖：例如在多个文件里设置 `permissions.allow`，Claude Code 会把各文件的条目合起来，所以每个文件都能新增条目而不移除别人的。四个持有模型列表或按模型条目的键例外：`fallbackModel` 是有序链，取定义它的最高层级的整条值；`modelPicker` 只在托管设置、`--settings`、用户设置三者中取整条且忽略项目与本地文件；`availableModels` 在托管层生效时按原样应用、忽略你在低层级新增的条目；`modelSettings` 按模型逐个解析。另有少数限制性键（如 `disableClaudeAiConnectors`、`isolatePeerMachines`）会采纳更严格的低层级值以覆盖托管设置。 [@ref-cc-config-lists] [@ref-cc-config-exceptions]

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

两份同时存在时，项目本地层级高于用户设置，因此该项目的会话最终使用 `claude-opus-5-5`，而其他项目仍是 `claude-sonnet-5`。若该项目另有共享文件 `.claude/settings.json` 也设同名键，它介于两者之间，个人覆盖要用项目本地文件写。 [@ref-cc-config-local] [@ref-cc-config-precedence]

检查命令：运行 `/status` 后，Status 标签的 `Setting sources` 行会列出本次会话加载了哪些设置文件，据此确认两份文件都已加载；它只说明读过哪些文件，不指出每个键来自哪个文件，键的层级归属按上面的优先级规则判断。 [@ref-cc-config-confirm]

版本边界：示例里的模型名取自设置页，页面未标注适用版本，选定的 npm 包快照也不能把它们固定到该精确版本。 [@ref-cc-npm-readme]

运行时介入有三种方式。命令行与环境变量在运行时覆盖文件：`--settings` 可传 JSON 或文件路径，位于用户、项目、本地之上、托管之下，例如 `claude --settings '{"model": "claude-opus-5-5"}'` 只对该会话生效；部分键有专属旗标（如 `--model` 对应 `model`）；环境变量不是层级，而是按键成对决定：`ANTHROPIC_MODEL` 覆盖任何文件中的 `model`，`ANTHROPIC_DEFAULT_MODEL` 只在无文件设置 `model` 时生效，而文件内的 `env` 块是普通键，仍按层级生效。 [@ref-cc-config-onesession] [@ref-cc-config-envpair]

项目文件里的部分键要等信任后才生效：`permissions.allow` 规则、`permissions.additionalDirectories`、`extraKnownMarketplaces` 以及多数 `env` 值在队友信任该目录前不生效，而 `deny` 与 `ask` 规则立即生效。项目本地文件若未被 git 跟踪，其 `allow` 规则无需信任步骤即可生效；一旦被跟踪，就要走信任流程。 [@ref-cc-config-troubleshoot]

## 诊断与版本边界 {#config-diagnostics}

在 Claude Code 里运行 `/status` 可看到哪些设置来源已加载：Status 标签的 `Setting sources` 行列出本次会话加载的每个文件，并有托管设置如何到达本机的括号说明。它只说明读过哪些文件，不指出每个键来自哪个文件；要列出被拒绝的条目可运行 `claude doctor`，项目或托管设置设定的模型会在启动头部标明来源文件。 [@ref-cc-config-confirm]

文件保存后 Claude Code 会热重载，把多数改动应用到运行中的会话，包括 `permissions`、`hooks` 与 `apiKeyHelper` 这类凭据 helper，并为每次检测到的设置文件变更运行 `ConfigChange` hook；托管设置经 MDM 或 claude.ai 控制台到达时按各自的投递计划生效，而不是保存即生效。少数键只在会话启动时读取，例如 `model` 与 `effortLevel`，要中途改变需用 `/model` 或 `/effort`。 [@ref-cc-config-reload]

JSON 非法或值被 schema 拒绝时，Claude Code 在启动时提示，形式取决于受影响范围：用户、项目或本地文件整体非法时报 Settings Error；只有单项失败（如未知 hook 事件名）时报 Settings Warning 并跳过该项，文件其余部分继续生效；`~/.claude.json` 无法解析时报 Configuration error，并把损坏文件复制到 `~/.claude/backups/` 下的带时间戳文件，同时询问是退出修复还是重置。修复后可用 `/status` 看受影响文件、用 `claude doctor` 看具体错误。 [@ref-cc-config-broken]

关于版本：本章所引设置页未标注适用版本，`version_applicability` 为 unknown，正文涉及多处 v2.1.x 门槛。选定的 npm 包快照记录 `@anthropic-ai/claude-code` 版本为 2.1.283，包内 README 只指向在线文档，不能据此把上述规则固定到该精确版本。 [@ref-cc-npm-readme]
