---
schema_version: 3
record_kind: production
edition_id: qwen-code-cli-configuration-v2
harness_id: qwen-code
topic: configuration
title: "Qwen Code CLI 的配置机制：来源、覆盖、运行时、信任、默认、迁移与诊断"
sections:
  - section_id: config-scope
    surface_ids: [cli]
    source_refs: [ref-qwen-readme-acknowledgments, ref-qwen-architecture-configuration-and-state, ref-qwen-settings-configuration-layers, ref-qwen-mem0-connect]
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-qwen-settings-configuration-layers, ref-qwen-settings-settings-files, ref-qwen-settings-environment-variables-table, ref-qwen-settings-the-qwen-directory-in-your-project, ref-qwen-settings-available-settings-in-settings-json, ref-qwen-qwen-ignore-how-it-works, ref-qwen-qwen-ignore-how-to-use-ignore-files, ref-qwen-settings-context-files-hierarchical-instructional-context, ref-qwen-settings-shell-history, ref-qwen-configuration-models-dev-environment, ref-qwen-configuration-models-dev-project-exclusion]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-qwen-settings-configuration-layers, ref-qwen-settings-tools, ref-qwen-settings-permissions, ref-qwen-settings-slashcommands, ref-qwen-settings-skills, ref-qwen-settings-tool-execution-sandbox, ref-qwen-settings-review, ref-qwen-settings-ui, ref-qwen-settings-security, ref-qwen-configuration-memory-mem0, ref-qwen-configuration-mem0-workspace-restricted, ref-qwen-configuration-mem0-operator-scope]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-qwen-settings-configuration-layers, ref-qwen-auth-step-2-set-environment-variables, ref-qwen-settings-environment-variables-table, ref-qwen-settings-environment-variables-env-files, ref-qwen-settings-command-line-arguments, ref-qwen-settings-command-line-arguments-table, ref-qwen-settings-tool-execution-sandbox, ref-qwen-configuration-tools-freeform, ref-qwen-mcp-mem0-bundled-server-gate, ref-qwen-mem0-scope-and-writes, ref-qwen-mem0-connect]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-qwen-trusted-folders-enabling-the-feature, ref-qwen-settings-security, ref-qwen-trusted-folders-how-it-works-the-trust-dialog, ref-qwen-trusted-folders-why-trust-matters-the-impact-of-an-untrusted-workspace, ref-qwen-trusted-folders-the-trust-check-process-advanced, ref-qwen-trusted-folders-managing-your-trust-settings, ref-qwen-qwen-ignore-how-it-works, ref-qwen-mem0-scope-and-writes]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-qwen-settings-configuration-layers, ref-qwen-settings-available-settings-in-settings-json, ref-qwen-settings-example-settings-json, ref-qwen-settings-general, ref-qwen-settings-output, ref-qwen-settings-ui, ref-qwen-settings-privacy, ref-qwen-settings-model, ref-qwen-settings-context, ref-qwen-settings-tools, ref-qwen-settings-memory, ref-qwen-settings-agents, ref-qwen-settings-permissions, ref-qwen-settings-skills, ref-qwen-settings-mcp, ref-qwen-settings-security, ref-qwen-settings-advanced, ref-qwen-settings-experimental, ref-qwen-configuration-memory-mem0, ref-qwen-configuration-mem0-settings-schema, ref-qwen-configuration-tools-freeform, ref-qwen-mem0-options-and-troubleshooting]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-qwen-settings-configuration-migration, ref-qwen-settings-available-settings-in-settings-json, ref-qwen-settings-consolidation-policy-for-disableautoupdate-and-disableup, ref-qwen-settings-security, ref-qwen-settings-model, ref-qwen-settings-ui, ref-qwen-auth-removed-qwen-auth-cli-command, ref-qwen-mem0-options-and-troubleshooting]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-qwen-commands-1-10-information-settings-and-help, ref-qwen-settings-context-files-hierarchical-instructional-context, ref-qwen-settings-command-line-arguments, ref-qwen-settings-environment-variables-env-files, ref-qwen-settings-ui, ref-qwen-settings-experimental, ref-qwen-qwen-ignore-how-it-works, ref-qwen-settings-configuration-migration, ref-qwen-architecture-direct-cli-flow, ref-qwen-mem0-options-and-troubleshooting]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-qwen-settings-configuration-layers, ref-qwen-settings-settings-files, ref-qwen-settings-the-qwen-directory-in-your-project, ref-qwen-qwen-ignore-how-it-works, ref-qwen-qwen-ignore-how-to-use-ignore-files, ref-qwen-settings-context-files-hierarchical-instructional-context, ref-qwen-settings-environment-variables-table, ref-qwen-configuration-models-dev-environment, ref-qwen-configuration-models-dev-project-exclusion]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: partial
        source_refs: [ref-qwen-settings-configuration-layers, ref-qwen-settings-tools, ref-qwen-settings-permissions, ref-qwen-settings-tool-execution-sandbox, ref-qwen-settings-ui, ref-qwen-settings-skills, ref-qwen-configuration-memory-mem0, ref-qwen-configuration-mem0-workspace-restricted, ref-qwen-configuration-mem0-operator-scope]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-qwen-settings-configuration-layers, ref-qwen-auth-step-2-set-environment-variables, ref-qwen-settings-environment-variables-env-files, ref-qwen-settings-environment-variables-table, ref-qwen-settings-command-line-arguments, ref-qwen-settings-command-line-arguments-table, ref-qwen-configuration-tools-freeform, ref-qwen-mcp-mem0-bundled-server-gate, ref-qwen-mem0-scope-and-writes, ref-qwen-mem0-connect]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-qwen-trusted-folders-enabling-the-feature, ref-qwen-trusted-folders-how-it-works-the-trust-dialog, ref-qwen-trusted-folders-why-trust-matters-the-impact-of-an-untrusted-workspace, ref-qwen-trusted-folders-the-trust-check-process-advanced, ref-qwen-trusted-folders-managing-your-trust-settings, ref-qwen-settings-security, ref-qwen-mem0-scope-and-writes]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-qwen-settings-configuration-layers, ref-qwen-settings-available-settings-in-settings-json, ref-qwen-settings-example-settings-json, ref-qwen-settings-general, ref-qwen-settings-model, ref-qwen-settings-tools, ref-qwen-settings-permissions, ref-qwen-settings-context, ref-qwen-settings-memory, ref-qwen-settings-agents, ref-qwen-settings-skills, ref-qwen-settings-mcp, ref-qwen-settings-experimental, ref-qwen-configuration-memory-mem0, ref-qwen-configuration-mem0-settings-schema, ref-qwen-configuration-tools-freeform, ref-qwen-mem0-options-and-troubleshooting]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: answered
        source_refs: [ref-qwen-settings-configuration-migration, ref-qwen-settings-consolidation-policy-for-disableautoupdate-and-disableup, ref-qwen-settings-security, ref-qwen-settings-model, ref-qwen-settings-ui, ref-qwen-auth-removed-qwen-auth-cli-command, ref-qwen-mem0-options-and-troubleshooting]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-qwen-commands-1-10-information-settings-and-help, ref-qwen-settings-command-line-arguments, ref-qwen-settings-environment-variables-env-files, ref-qwen-settings-context-files-hierarchical-instructional-context, ref-qwen-settings-experimental, ref-qwen-architecture-direct-cli-flow, ref-qwen-mem0-options-and-troubleshooting]
---

## 配置范围与出处 {#config-scope}

本章的固定源是仓库 `QwenLM/qwen-code` 的提交 `2c591ecc08a6fa080342f9b1b9f7f43215178cbb`。主要依据 `docs/users/configuration/settings.md`（配置层、设置文件、迁移、设置参考、环境变量、CLI 参数、上下文文件），并补充 `docs/users/features/mem0.md`、`docs/users/configuration/trusted-folders.md`、`docs/users/configuration/qwen-ignore.md`、`docs/users/configuration/auth.md`（仅用于凭据配置与设置文件的关系）以及 `docs/developers/architecture.md` 的 "Configuration and state"。Qwen Code 最初基于 Google Gemini CLI v0.8.2，自 v0.1 起停止与上游同步并开始独立开发；因此本仓库在固定提交下的文档才是当前行为的权威 [@ref-qwen-readme-acknowledgments]。本仓库文档中凡是明确标注了与其它 agent 兼容的字段（例如 Claude Code 兼容字段、Claude Code marketplace），都只按“已文档化的兼容性”陈述，不臆测为 Gemini 继承行为。

CLI 在构造核心运行时之前，把命令行参数、环境变量、用户设置、工作区设置与默认值解析成一份“有效配置”，核心运行时只接收解析后的结果，不再读取展示层输入 [@ref-qwen-architecture-configuration-and-state]。总体优先级从低到高为：默认值 < 系统默认文件 < 用户设置文件 < 项目设置文件 < 系统设置文件 < 环境变量 < 命令行参数 [@ref-qwen-settings-configuration-layers]。后面的章节分别展开“来源、覆盖、运行时、信任、默认、迁移、诊断”。

## 配置来源 {#config-sources}

配置按层级顺序应用：第 1 层是应用内硬编码默认值，第 2 层是系统默认文件，第 3 层是用户设置文件，第 4 层是项目设置文件，第 5 层是系统设置文件，第 6 层是环境变量（可能来自 `.env` 文件），第 7 层是命令行参数 [@ref-qwen-settings-configuration-layers]。

持久化配置使用 JSON 设置文件，共四个位置，路径与作用域如下 [@ref-qwen-settings-settings-files]：

- 系统默认文件：Linux `/etc/qwen-code/system-defaults.json`，Windows `C:\ProgramData\qwen-code\system-defaults.json`，macOS `/Library/Application Support/QwenCode/system-defaults.json`；路径可用环境变量 `QWEN_CODE_SYSTEM_DEFAULTS_PATH` 覆盖。它提供最低优先级的系统级基座。
- 用户设置文件：`~/.qwen/settings.json`，对当前用户的所有会话生效。
- 项目设置文件：项目根目录下的 `.qwen/settings.json`，仅从该项目运行 Qwen Code 时生效，覆盖用户设置。
- 系统设置文件：Linux `/etc/qwen-code/settings.json`，Windows `C:\ProgramData\qwen-code\settings.json`，macOS `/Library/Application Support/QwenCode/settings.json`；路径可用 `QWEN_CODE_SYSTEM_SETTINGS_PATH` 覆盖，覆盖用户与项目设置，供企业管理员控制。

全局配置目录默认是 `~/.qwen`，可用 `QWEN_HOME` 环境变量改指（接受绝对或相对路径，相对路径从当前工作目录解析，前导 `~` 展开）；设置 `QWEN_HOME` 不影响项目级 `.qwen/` 目录。运行期输出目录（会话、日志、todos）默认同样位于 `QWEN_HOME`，可用 `QWEN_RUNTIME_DIR` 单独分离 [@ref-qwen-settings-environment-variables-table]。

除设置文件外，项目的 `.qwen` 目录还承载与运行相关的项目专属文件，例如自定义沙箱 profile（`.qwen/sandbox-macos-custom.sb`、`.qwen/sandbox.Dockerfile`）以及 `.qwen/skills/` 下的 Agent Skills（每个 Skill 是一个含 `SKILL.md` 的目录）[@ref-qwen-settings-the-qwen-directory-in-your-project]。

设置文件的组织方式：设置在 JSON 中按顶层分类对象组织，多数设置应放进对应分类；少数顶层键（如 `proxy`、`plansDirectory`）为兼容性保留为根键 [@ref-qwen-settings-available-settings-in-settings-json]。字符串值里可用 `$VAR_NAME` 或 `${VAR_NAME}` 引用环境变量，加载时自动解析 [@ref-qwen-settings-settings-files]。

文件忽略规则也是项目根目录下的配置：默认读取 `.qwenignore`、`.agentignore`、`.aiignore`，其中 `.qwenignore` 在 `context.fileFiltering.respectQwenIgnore` 启用时始终包含，自定义文件由 `context.fileFiltering.customIgnoreFiles` 指定且相对项目根目录，遵循 `.gitignore` 语法（`#` 注释、`*`/`?`/`[]` glob、`/` 锚定与目录匹配、`!` 取反）[@ref-qwen-qwen-ignore-how-it-works] [@ref-qwen-qwen-ignore-how-to-use-ignore-files]。

```json
{
  "context": {
    "fileFiltering": {
      "customIgnoreFiles": [".cursorignore"]
    }
  }
}
```

上面的 `customIgnoreFiles` 语法来自 `docs/users/configuration/qwen-ignore.md` 的“How to use ignore files”一节 [@ref-qwen-qwen-ignore-how-to-use-ignore-files]。

指令上下文文件（默认 `QWEN.md`，名称由 `context.fileName` 配置）按层级加载：先读全局目录 `~/.qwen/` 下配置的上下文文件名，再从当前工作目录向上直到项目根（以 `.git` 目录识别）或用户主目录查找；找到的内容带来源分隔符拼接进 system prompt，可用 `/memory` 对话框查看拼接顺序与最终上下文 [@ref-qwen-settings-context-files-hierarchical-instructional-context]。

Shell 命令历史为按项目隔离存储：`~/.qwen/tmp/PROJECT_HASH/shell_history`，其中 `PROJECT_HASH` 是由项目根路径生成的唯一标识 [@ref-qwen-settings-shell-history]。

来源还有一类“只允许运维作用域”的环境变量：`QWEN_CODE_MODELS_DEV`、`QWEN_CODE_MODELS_DEV_REFRESH`、`QWEN_CODE_MODELS_DEV_URL` 三个 models.dev 目录键，项目级 `.env` 文件与 `settings.json` 的顶层 `env` 段都不能设置它们，重载也不能改变，只能由 shell 环境或用户级文件给出 [@ref-qwen-configuration-models-dev-environment]。源码把这三个键写进项目级硬编码排除表，理由是模型目录写入所有项目共读的全局缓存，仓库自己的配置不应决定其它工作区的目录行为；该拒绝是静默的，不会有其他诊断报告它 [@ref-qwen-configuration-models-dev-project-exclusion]。

## 覆盖与合并 {#config-overrides}

层级间是逐层覆盖：编号更大的来源覆盖更小的来源，最高层是命令行参数 [@ref-qwen-settings-configuration-layers]。合并语义按键而定，固定源中明确记载的有：

- 多数数组类设置是“跨作用域取并集”而不覆盖。`tools.disabled`、`tools.visible` 均按并集合并 [@ref-qwen-settings-tools]；`permissions.allow` 在 user + project + system 全部作用域合并（它是纯自动批准，不会移除或隐藏工具），`permissions.ask` 优先于 `allow`，`permissions.deny` 优先级最高（整工具 deny 规则还会把工具移出注册表，MCP 工具除外）[@ref-qwen-settings-permissions]；`slashCommands.disabled` 按并集合并，因此工作区只能追加、不能删除用户或系统里定义的条目 [@ref-qwen-settings-slashcommands]；`skills.disabled`、`skills.enabled`、`skills.defaultDisabled`、`skills.disabledLevels` 也都按并集合并，且 `skills.disabled` > `skills.enabled` > `skills.defaultDisabled` [@ref-qwen-settings-skills]。
- 例外一：`tools.executionSandbox` 是仅限运维的 Linux 策略，系统策略会整体替换 User/SystemDefaults 对象，工作区值被忽略 [@ref-qwen-settings-tool-execution-sandbox]。
- 例外二：部分键只从运维作用域读取，工作区 `.qwen/settings.json` 的值被忽略——`review.*` 的整体（策略）仅在 User、System、SystemDefaults 生效 [@ref-qwen-settings-review]；`ui.brand.name`、`ui.brand.logoPath` 也只从运维作用域读取 [@ref-qwen-settings-ui]；`security.allowedInsecureVoiceBaseUrls` 仅 User、System、SystemDefaults 被尊重 [@ref-qwen-settings-security]；`memory.mem0`（外部 Mem0 记忆服务）同样被列入工作区受限设置，工作区无法配置该绑定 [@ref-qwen-configuration-mem0-workspace-restricted] [@ref-qwen-configuration-memory-mem0]。

`memory.mem0` 的作用域解析有专门规则：它只在系统默认文件、用户设置、系统设置三个运维来源中按顺序取值（系统设置最后取值因而优先），任一运维来源把 `memory` 显式置为 `null` 会把合并结果里的 `mem0` 整个删除；项目设置的 `memory.mem0` 不参与该合并 [@ref-qwen-configuration-mem0-operator-scope]。因此同一项目内不同 `settings.json` 叠加时，写入路径不是通用的逐层覆盖，而是"运维来源择一"。

已知缺口：固定提交的这批文档没有描述用于“删除/注销某个已继承键”的 null 或删除标记（delete marker）机制；也没有给出通用对象深合并的完整规则，只对上述具体键说明了并集或整体替换。要判断某个未列出的键究竟并集还是覆盖，需要看该键在设置参考表格中的逐行说明，或以源码为准。因此本问题标为 partial。

## 运行时覆盖：环境变量与 CLI 参数 {#config-runtime}

运行时覆盖发生在设置文件之后：环境变量是第 6 层，命令行参数是第 7 层，二者都压过所有设置文件 [@ref-qwen-settings-configuration-layers]。环境变量要么来自系统环境，要么来自 `.env` 文件。`.env` 的加载规则是：从当前目录向上查找，**只加载找到的第一个** `.env` 文件，多个文件之间**不合并**，且只写入 `process.env` 中尚不存在的变量；在同一层内的搜索顺序是 `.qwen/.env` 优先于 `.env`（向上走到 `/`），若都没有则回退到主目录 `~/.qwen/.env`，再 `~/.env` [@ref-qwen-auth-step-2-set-environment-variables]。

环境变量覆盖面很广，例如 `QWEN_HOME`/`QWEN_RUNTIME_DIR` 决定全局与运行期目录，`QWEN_SANDBOX` 作为 `sandbox` 设置的替代，`QWEN_SANDBOX_IMAGE` 覆盖 `tools.sandboxImage`，`QWEN_CODE_MAX_OUTPUT_TOKENS`、`QWEN_TELEMETRY_*` 等各自覆盖同名设置项 [@ref-qwen-settings-environment-variables-table]。默认情况下 `DEBUG`、`DEBUG_MODE` 会被排除在项目 `.env` 之外，但 `.qwen/.env` 中的变量永不被该默认列表排除，可用 `advanced.excludedEnvVars` 定制；而影响 Node/OS 加载器的变量（如 `NODE_OPTIONS`、`NODE_PATH`、`LD_PRELOAD` 等）在任何 `.env` 作用域以及顶层 `settings.json` 的 `env` 段中都会被拒绝 [@ref-qwen-settings-environment-variables-env-files]。

凭据类值有独立的分层（从高到低）：CLI 标志（如 `--openai-api-key`）> 系统环境（`export`/内联）> `.env` 文件 > `settings.json` 的 `env` 段；`.env` 只在不与系统环境冲突时写入，`settings.json` 的 `env` 是最低优先级回退 [@ref-qwen-auth-step-2-set-environment-variables]。`settings.json` 的 `env` 段语法如下（来自 `docs/users/configuration/auth.md`）[@ref-qwen-auth-step-2-set-environment-variables]：

```json
{
  "env": {
    "OPENAI_API_KEY": "your-api-key"
  }
}
```

CLI 参数只对“本次运行”生效，可覆盖其它配置。例如沙箱镜像的选择优先级为 `--sandbox-image` > `QWEN_SANDBOX_IMAGE` > `tools.sandboxImage` > 内置默认镜像，这正好演示了“CLI 参数 > 环境变量 > 设置文件 > 默认值”的链路 [@ref-qwen-settings-command-line-arguments]。参数表还列出 `--model`/`-m`、`--prompt`/`-p`、`--output-format`/`-o`、`--approval-mode`、`--allowed-tools`、`--sandbox`、`--proxy`、`--include-directories`、`--output-style` 等，并注明它们对设置项的覆盖关系（例如 `--output-style` 覆盖 `general.outputStyle`）[@ref-qwen-settings-command-line-arguments-table]。CLI 参数同样能在纯命令行入参上覆盖环境变量层 [@ref-qwen-settings-tool-execution-sandbox]。

已知缺口：固定提交的这批文档没有定义面向配置的 “profile” 机制——文档中出现的 “profile” 仅指 macOS 沙箱 profile（`SEATBELT_PROFILE`、自定义 `.qwen/sandbox-*.sb`）或启动性能剖析（`QWEN_CODE_PROFILE_STARTUP`），都不是可切换的配置档。因此“profile 如何覆盖文件配置”在本固定源下无法确立，本问题标为 partial。

两个新设置是典型的“条件生效 + 需重启”组合：

- `tools.freeform`（默认 `false`，需重启，不在设置对话框中显示，只能在设置文件里编辑）让 Code Mode 的 `exec` 在 OpenAI Responses 模型上以原始文本发送输入；它只在 `tools.codeModeOnly` 同时为 `true` 且所选模型的 `wireApi` 为 `"responses"` 时才生效，只应对支持 Responses Custom Tools 的端点启用 [@ref-qwen-configuration-tools-freeform]。
- `memory.mem0` 的绑定在多个条件下才建立：处于 bare/safe 模式、SSH 工作区、临时（provisional）工作区、工作区未受信任，或 `settings.memory.mem0` 缺失时都不建立该本地绑定 [@ref-qwen-mcp-mem0-bundled-server-gate]。官方文档把同一组条件表述为"bare/safe 模式、不受信任或临时目录、SSH 工作区都不激活该本地绑定；工作区设置无法配置它" [@ref-qwen-mem0-scope-and-writes]。凭据可以完全来自设置文件：`envKey` 指定变量名（默认 `MEM0_API_KEY`），值可由非空进程环境、`.env` 文件或顶层 `env` 段提供，优先级为进程环境 > `.env` > `settings.env`；JSON 中的凭据是明文，官方要求只放在用户设置里、不要提交进仓库 [@ref-qwen-mem0-connect]。写入能力需在 `memory.mem0` 内加 `"enableWrites": true` 并重启交互式 CLI；非交互/ACP 会话与禁用了 Hook 的会话只有搜索能力 [@ref-qwen-mem0-scope-and-writes]。

## 信任与工作区门控 {#config-trust}

Trusted Folders 是一项安全设置，用于控制哪些项目可以使用 Qwen Code 的全部能力；在 CLI 从某个目录加载任何项目专属配置之前先请求批准 [@ref-qwen-trusted-folders-enabling-the-feature]。该功能**默认关闭**，需要在用户 `settings.json` 中启用 [@ref-qwen-trusted-folders-enabling-the-feature]：

```json
{
  "security": {
    "folderTrust": {
      "enabled": true
    }
  }
}
```

上面键路径来自 `docs/users/configuration/trusted-folders.md` 的“Enabling the Feature”一节 [@ref-qwen-trusted-folders-enabling-the-feature]；`security.folderTrust.enabled` 即记录该开关的设置项 [@ref-qwen-settings-security]。

启用后，首次从某目录运行会弹出信任对话框，选项为：Trust folder（信任当前目录）、Trust parent folder（信任父目录并连带其所有子目录）、Don't trust（标记为不信任，CLI 以受限“safe mode”运行）。选择保存在中心文件 `~/.qwen/trustedFolders.json`，每个目录只会询问一次 [@ref-qwen-trusted-folders-how-it-works-the-trust-dialog]。

当工作区**不被信任**时，进入受限 safe mode，以下机制被禁用 [@ref-qwen-trusted-folders-why-trust-matters-the-impact-of-an-untrusted-workspace]：

1. 工作区设置被忽略——不加载项目的 `.qwen/settings.json`；
2. 项目 `.env` 文件不被加载；
3. 扩展的安装、更新、卸载被限制；
4. 工具的自动接受被禁用——即使全局开启了自动接受，运行任何工具前仍会询问；
5. 自动记忆加载被禁用——不会自动把本地设置中指定目录的文件载入上下文。

信任检查的优先级顺序为：先询问 IDE 集成（若已连接，IDE 的回答优先级最高），否则检查中心文件 `~/.qwen/trustedFolders.json` [@ref-qwen-trusted-folders-the-trust-check-process-advanced]。要更改决定或查看规则：在 CLI 内运行 `/permissions` 可重新弹出同一对话框修改当前目录的信任级别，或直接查看 `~/.qwen/trustedFolders.json` [@ref-qwen-trusted-folders-managing-your-trust-settings]。

可见信任同时是“配置读取”的门控：不信任直接决定工作区设置与项目 `.env` 是否生效，从而限制前面几节所述的来源与覆盖范围。此外 `.qwenignore`/自定义忽略文件的改动需要重启 Qwen Code 会话才生效 [@ref-qwen-qwen-ignore-how-it-works]。新增的 `memory.mem0` 绑定同样服从这一门控：不受信任的目录不激活该本地绑定 [@ref-qwen-mem0-scope-and-writes]。

## 默认值与分组 {#config-defaults}

默认值来自第 1 层“应用内硬编码默认值”与第 2 层“系统默认文件”，二者都处于最低优先级，可被用户、项目、系统覆盖文件覆盖 [@ref-qwen-settings-configuration-layers]。设置按顶层分类组织，多数设置放进对应分类对象，少数键（如 `proxy`、`plansDirectory`）保留为根键 [@ref-qwen-settings-available-settings-in-settings-json]。要在用户配置中改变默认值，编辑 `~/.qwen/settings.json` 对应分类即可 [@ref-qwen-settings-example-settings-json]。各分组及示例默认值：

- `general`：`general.vimMode` 默认 `false`、`general.enableAutoUpdate` 默认 `true`、`general.defaultFileEncoding` 默认 `"utf-8"`、`general.language` 默认 `"auto"` [@ref-qwen-settings-general]。
- `output`：`output.format` 默认 `"text"`（可选 `"text"`/`"json"`/`"stream-json"`），`output.showTimestamps` 默认 `false` [@ref-qwen-settings-output]。
- `ui`：`ui.theme`、`ui.hideTips`、`ui.hideBanner`、`ui.compactMode`（已 RETIRED）、`ui.useTerminalBuffer` 等 [@ref-qwen-settings-ui]。
- `privacy`：`privacy.usageStatisticsEnabled` 默认 `true`，可用 `QWEN_USAGE_STATISTICS_ENABLED=false` 关闭且环境变量优先 [@ref-qwen-settings-privacy]。
- `model`：`model.name`、`model.reasoningEffort`、`model.maxSessionTurns`、`model.generationConfig` 等 [@ref-qwen-settings-model]。
- `context`：`context.fileName`、`context.autoCompactThreshold`（内部默认 0.85）、`context.includeDirectories`、`context.fileFiltering.*` 等 [@ref-qwen-settings-context]。
- `tools`：`tools.executionSandbox`、`tools.disabled`、`tools.visible`、`tools.eager`、`tools.approvalMode`、`tools.sandbox` 等 [@ref-qwen-settings-tools]。
- `memory`：`memory.enableManagedAutoMemory` 默认 `true`、`memory.enableTeamMemory` 默认 `false`、`memory.enableStructuredRecall` 默认 `false` 等 [@ref-qwen-settings-memory]；新增 `memory.mem0` 指向随主 CLI 包分发的外部 Mem0 服务连接，默认未设置（`undefined`），需重启，且明确不在设置对话框中显示，只应在用户或系统设置里配置 [@ref-qwen-configuration-memory-mem0] [@ref-qwen-configuration-mem0-settings-schema]。
- `agents`：`agents.builtin.exploreModel`、`agents.modelGrades`、`agents.crossSessionMessaging` 等 [@ref-qwen-settings-agents]。
- `permissions`：`permissions.allow`、`permissions.ask`、`permissions.deny`，决策优先级 `deny` > `ask` > `allow` > 默认交互 [@ref-qwen-settings-permissions]。
- `skills`：`skills.disabledLevels`（可选 `project`/`user`/`extension`/`bundled`）、`skills.disabled`、`skills.defaultDisabled`、`skills.enabled` [@ref-qwen-settings-skills]。
- `mcp`：`mcp.serverCommand`、`mcp.allowed`、`mcp.excluded`、`mcp.toolIdleTimeoutMs` 等 [@ref-qwen-settings-mcp]。
- `security`：`security.folderTrust.enabled`、`security.auth.selectedType`、`security.auth.enforcedType`、`security.auth.apiKey`/`baseUrl`（已弃用）等 [@ref-qwen-settings-security]。
- `advanced`：`advanced.autoConfigureMemory` 默认 `false`、`advanced.excludedEnvVars` 默认 `["DEBUG","DEBUG_MODE"]`、`plansDirectory`（根键）[@ref-qwen-settings-advanced]。
- `experimental`：`experimental.cron` 默认 `true`、`experimental.artifact` 默认 `true`、`experimental.agentTeam`、`experimental.sessionWriterLease` 等（实验性开关，可能变动）[@ref-qwen-settings-experimental]。

此外 `mcpServers`、`telemetry`、`modelPricing`、`fastModel`/`visionModel` 等也是顶层分组；`mcpServers` 用于配置 MCP 服务器连接 [@ref-qwen-settings-example-settings-json]。许多开关在改动后需要重启才生效（表格中以“Requires restart”标注），这是默认值变更的常见运行期约束 [@ref-qwen-settings-experimental]。

`memory.mem0` 的字段与默认值：`baseUrl` 必填，是不带凭据、查询串与 fragment 的 HTTP(S) URL；`protocol` 为预设枚举（`mem0-v2`、`mem0-v3`、`mem0-oss-2026-08`、`aliyun-polardb-mysql-2026-08`、`mem0-platform-v3`、`mem0-oss-rest-2026-08`），默认 `mem0-v2`；`envKey` 默认 `MEM0_API_KEY`；`scope` 可含 `userId`、`agentId`、`appId`；`enableWrites` 与 `allowInsecureHttp` 默认 `false`；`timeoutMs` 默认 5000，取值 1–30000 [@ref-qwen-configuration-mem0-settings-schema] [@ref-qwen-mem0-options-and-troubleshooting]。`tools.freeform` 则是新增的布尔实验开关，默认 `false`，见前文运行时一节 [@ref-qwen-configuration-tools-freeform]。

## 迁移与弃用 {#config-migration}

Qwen Code 会自动把旧格式设置迁移为新格式，旧设置文件在迁移前会先备份 [@ref-qwen-settings-configuration-migration]。设置文件的格式已更新为更规整的嵌套结构（示例备注为 “new as of v0.3.0”），旧格式会自动迁移 [@ref-qwen-settings-available-settings-in-settings-json]。迁移中从负向命名（`disable*`）改为正向命名（`enable*`），并做布尔取反；例如 `disableAutoUpdate: true` 变成 `enableAutoUpdate: false` [@ref-qwen-settings-configuration-migration]。

| 旧设置 | 新设置 |
| --- | --- |
| `disableAutoUpdate` + `disableUpdateNag` | `general.enableAutoUpdate` |
| `disableLoadingPhrases` | `ui.accessibility.enableLoadingPhrases` |
| `disableFuzzySearch` | `context.fileFiltering.enableFuzzySearch` |
| `disableCacheControl` | `model.generationConfig.enableCacheControl` |

上表来自 `docs/users/configuration/settings.md` 的“Configuration migration”一节 [@ref-qwen-settings-configuration-migration]。

对于 `disableAutoUpdate` 与 `disableUpdateNag` 合并为 `general.enableAutoUpdate` 的合并策略：只要二者中**任一**为 `true`，迁移后的 `enableAutoUpdate` 即为 `false`（即 `false,false` → `true`；其余三种组合 → `false`）[@ref-qwen-settings-consolidation-policy-for-disableautoupdate-and-disableup]。

旧格式的导入兼容还体现在几类“已移除/弃用”的键上：

- `security.auth.apiKey` 与 `security.auth.baseUrl` 已弃用，历史版本中用于存放 UI 输入的凭据；凭据输入流程在 0.10.1 版本被移除，字段将在未来版本彻底删除，官方建议迁移到 `modelProviders` 并用 `envKey` 引用环境变量 [@ref-qwen-settings-security]。
- `model.chatCompression.contextPercentageThreshold` 被标记为 **REMOVED**，由 `context.autoCompactThreshold` 取代，旧键被静默忽略（无启动警告）[@ref-qwen-settings-model]。
- `ui.compactMode` 被标记为 **RETIRED everywhere**，键仅为让旧设置文件不报警而保留，写入被接受但无人读取 [@ref-qwen-settings-ui]。
- 独立的 `qwen auth` CLI 命令已被移除，取而代之的是交互式 `/auth`、`/doctor` 查看当前认证，以及相应的环境变量或 `settings.json` 配置 [@ref-qwen-auth-removed-qwen-auth-cli-command]。

新出现的兼容别名属于同类：`memory.mem0.credentialEnv` 是 `envKey` 的历史别名，两者的值必须一致（默认取 `envKey`）；不一致时报错而不是静默挑选某个凭据 [@ref-qwen-mem0-options-and-troubleshooting]。

## 诊断：生效来源、重载与排错 {#config-diagnostics}

查看当前生效值与重载/排错手段如下：

- `/config` 按点路径键读写单个设置（例如 `general.vimMode`），无参数时列出所有可设置键及其类型与当前值；对布尔键，`/config KEY` 会切换值，`/config KEY=VALUE` 设值，改动写入用户设置 `~/.qwen/settings.json`。只有 `boolean`/`string`/`number`/`enum` 可这样改，`array` 与 `object` 必须直接编辑 `settings.json`；敏感值在输出中被打码，把 `tools.approvalMode` 设为 `yolo` 会被阻止。`/settings` 打开交互式设置编辑器，`/doctor` 运行安装与环境诊断（含认证与环境检查）[@ref-qwen-commands-1-10-information-settings-and-help]。
- 上下文/记忆来源：`/memory` 打开记忆管理对话框，可查看实际加载了哪些上下文文件及其拼接顺序，并从对话框“刷新记忆”以重新扫描并重载所有已配置位置的文件 [@ref-qwen-settings-context-files-hierarchical-instructional-context]。
- 详细日志：`--debug`/`-d` 为本次会话开启更详细输出；`DEBUG`/`DEBUG_MODE` 设为 `true`/`1` 也可开启 verbose 调试日志，但这两个变量默认会被排除在项目 `.env` 之外（用 `.qwen/.env` 可为 Qwen Code 单独设置）[@ref-qwen-settings-command-line-arguments] [@ref-qwen-settings-environment-variables-env-files]。

重载行为：不同设置生效时机不同，这是“文件已写但没生效”的头号原因。许多设置在表格中标注 “Requires restart”（如 `general.language`、`general.chatRecording`、`general.batchAutoCollect` 等），需要在改动后重启会话或进程；也有“Takes effect in the next session”（如 `ui.showResponseTokensPerSecond`）[@ref-qwen-settings-ui]；少数则无需重启（如 `experimental.sessionWorkflow` 明确“Changes take effect without restarting”，而 `experimental.sessionWriterLease` 的值在 ACP/daemon 进程启动时冻结）[@ref-qwen-settings-experimental]。此外 `general.outputStyle` 的手工编辑“next start”才生效 [@ref-qwen-settings-ui]，`.qwenignore` 的改动需重启会话才应用 [@ref-qwen-qwen-ignore-how-it-works]。配置文件格式若为旧版会被自动迁移并备份 [@ref-qwen-settings-configuration-migration]。启动链路本身是：CLI 解析参数并解析用户、工作区、环境、命令行配置，随后才构造运行时 [@ref-qwen-architecture-direct-cli-flow]。

已知缺口：固定源的文档说明了如何查看“当前值”（`/config`、`/settings`）与环境/认证诊断（`/doctor`），但没有记载任何“把一个有效值归属到具体来源文件/作用域”的命令或输出——即无法直接回答“这个值到底来自哪个 `settings.json`”。要确认来源需逐个文件比对，或以源码为准。因此本问题标为 partial。

外部 Mem0 另有自己的排错入口：先看 MCP 连接状态以区分“缺凭据/服务端错误”；超时要查端点路由、来源 IP 白名单与服务可用性，401/403 要查凭据与所选协议，并要求不要把凭据粘进日志或问题报告 [@ref-qwen-mem0-options-and-troubleshooting]。另外，源码检出版本必须先构建打包出 `dist/mem0/main.js` 与 `dist/mem0/write-confirmation.js`，已安装的主包自带这两个文件；该功能需要包含此变更的主 CLI 版本，单独发布 Mem0 包不是前提 [@ref-qwen-mem0-options-and-troubleshooting]。
