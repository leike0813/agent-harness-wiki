---
schema_version: 3
record_kind: production
edition_id: codebuddy-cli-configuration-v3
harness_id: codebuddy
topic: configuration
title: "CodeBuddy Code（CLI）配置机制"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-codebuddy-settings-files, ref-codebuddy-dir-global, ref-codebuddy-dir-core, ref-codebuddy-dir-project, ref-codebuddy-install-dir, ref-codebuddy-env-fs, ref-codebuddy-memory-types]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-codebuddy-settings-priority, ref-codebuddy-dir-priority, ref-codebuddy-settings-subagents, ref-codebuddy-mcp-locations, ref-codebuddy-env-sensitive-protection]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-codebuddy-env-settings, ref-codebuddy-env-tools, ref-codebuddy-cli-args, ref-codebuddy-settings-configcmds, ref-codebuddy-settings-keys]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-codebuddy-settings-keys, ref-codebuddy-perms-trust, ref-codebuddy-perms-rules, ref-codebuddy-perms-where, ref-codebuddy-settings-exclude, ref-codebuddy-settings-permissions, ref-codebuddy-settings-plugins, ref-codebuddy-env-sensitive-protection]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-codebuddy-settings-keys, ref-codebuddy-env-shell, ref-codebuddy-env-fs, ref-codebuddy-env-tools, ref-codebuddy-env-context-usage, ref-codebuddy-changelog-context-usage, ref-codebuddy-env-image-history, ref-codebuddy-env-task-reminders, ref-codebuddy-env-responses-store, ref-codebuddy-env-sensitive-protection, ref-codebuddy-env-otel-raw-bodies, ref-codebuddy-mcp-locations, ref-codebuddy-trouble-migrate]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuddy-settings-configcmds, ref-codebuddy-perms-where, ref-codebuddy-slash-builtin, ref-codebuddy-models-hotreload, ref-codebuddy-memory-cache, ref-codebuddy-env-debug, ref-codebuddy-mcp-troubleshoot, ref-codebuddy-trouble-update, ref-codebuddy-trouble-logs]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-codebuddy-settings-files, ref-codebuddy-dir-global, ref-codebuddy-dir-project, ref-codebuddy-install-dir, ref-codebuddy-memory-types]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-codebuddy-settings-priority, ref-codebuddy-dir-priority, ref-codebuddy-settings-subagents, ref-codebuddy-mcp-locations, ref-codebuddy-env-sensitive-protection]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-codebuddy-env-settings, ref-codebuddy-cli-args, ref-codebuddy-settings-configcmds]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-codebuddy-perms-trust, ref-codebuddy-settings-keys, ref-codebuddy-settings-exclude, ref-codebuddy-settings-permissions, ref-codebuddy-settings-plugins, ref-codebuddy-env-sensitive-protection]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-codebuddy-settings-keys, ref-codebuddy-env-shell, ref-codebuddy-env-fs, ref-codebuddy-env-tools, ref-codebuddy-env-context-usage, ref-codebuddy-env-image-history, ref-codebuddy-env-task-reminders, ref-codebuddy-env-responses-store, ref-codebuddy-env-sensitive-protection, ref-codebuddy-env-otel-raw-bodies]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-codebuddy-mcp-locations, ref-codebuddy-env-tools, ref-codebuddy-trouble-migrate]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-codebuddy-settings-configcmds, ref-codebuddy-memory-cache, ref-codebuddy-env-debug, ref-codebuddy-mcp-troubleshoot]
---

本章固定来源为 CodeBuddy Code 官方文档仓库 `https://cnb.cool/codebuddy/codebuddy-code` 提交 `47ec6f132a3f52925ee999deb782807bf6d82a2b` 的 `docs/settings.md`、`docs/codebuddy-dir.md`、`docs/env-vars.md`、`docs/cli-reference.md`、`docs/memory.md`、`docs/iam.md`、`docs/permissions.md`、`docs/installation.md`、`docs/mcp.md`、`docs/troubleshooting.md`，以及提交 `694ae23f44308ca901d620d2e48c2c3d35c75fc9` 的 `docs/env-vars.md` 与 `CHANGELOG.md`（2.161.0 发行记录；`CHANGELOG.md` 只用作版本线索），以及提交 `ba5e2ccf3ab3de4e637da1b8fc2b1998e7989db7` 的 `docs/env-vars.md`。CodeBuddy Code（CLI）为闭源，本章按来源级知识记录。

机制边界：CodeBuddy Code 用分层配置系统——设置文件（JSON）、环境变量、CLI 参数、记忆文件（CODEBUDDY.md / rules）各有一条加载链；本主题说明来源、优先级、运行时介入、信任与诊断。

## 配置来源与路径 {#config-sources}

设置文件是官方机制，分三层：用户设置 `~/.codebuddy/settings.json`（应用于所有项目）、项目共享设置 `.codebuddy/settings.json`（检入版本控制）、项目本地 `.codebuddy/settings.local.json`（不检入，CodeBuddy Code 会自动把它加入 git 忽略）。[@ref-codebuddy-settings-files]

全局目录 `~/.codebuddy/` 另含 `settings.local.json`、`CODEBUDDY.md`（用户级记忆）、`mcp.json`（全局 MCP）、`agents/`、`rules/`、`skills/` 与运行时数据目录（`projects/`、`logs/`、`traces/`、`history.jsonl`、`plugins/` 等）。[@ref-codebuddy-dir-global][@ref-codebuddy-dir-core] 项目目录 `.codebuddy/` 含 `settings.json`、`settings.local.json`、`CODEBUDDY.md`、`agents/`、`rules/`、`skills/`、`commands/`。[@ref-codebuddy-dir-project]

配置目录默认在 macOS/Linux 为 `~/.codebuddy`、Windows 为 `%USERPROFILE%\.codebuddy`，可用 `CODEBUDDY_CONFIG_DIR` 自定义位置（多实例隔离、企业统一管理、与 WorkBuddy 共引擎时避免冲突）。[@ref-codebuddy-install-dir][@ref-codebuddy-env-fs]

记忆来源有四类：用户记忆 `~/.codebuddy/CODEBUDDY.md`、用户规则 `~/.codebuddy/rules/*.md`、项目记忆 `./CODEBUDDY.md` 或 `./.codebuddy/CODEBUDDY.md`、项目规则 `./.codebuddy/rules/*.md`，以及本地记忆 `./CODEBUDDY.local.md`。[@ref-codebuddy-memory-types] 记忆在启动时自动加载到上下文。[@ref-codebuddy-memory-types]

## 优先级与合并 {#config-overrides}

设置按优先级从高到低应用：命令行参数 → 本地项目设置 `.codebuddy/settings.local.json` → 共享项目设置 `.codebuddy/settings.json` → 用户设置 `~/.codebuddy/settings.json` → 产品内置默认。[@ref-codebuddy-settings-priority] 目录说明给出同一顺序的图示，并写明「设置被合并，更具体的设置添加或覆盖更广泛的设置」。[@ref-codebuddy-dir-priority]

代理/技能/规则的优先级是**项目级 > 用户级 > 插件级**，同名时项目级优先。[@ref-codebuddy-dir-priority] 具体到 `subagents` 与 `variantModels` 这类对象键，按名称合并：项目级覆盖 `Explore` 不会删除用户级的其他子代理配置。[@ref-codebuddy-settings-subagents] MCP 配置则是另一套：同名 server 的作用域优先级为 `local > project > user`，且同一作用域内不使用多个文件、只用第一个存在的。[@ref-codebuddy-mcp-locations]

这条「文件 → 环境变量」的顺序不是无边界的：`CODEBUDDY_DISABLE_SENSITIVE_PROTECTION` 关闭敏感数据防护时**不改共享的设置文件**（效果等同 `settings.json` 的 `sensitiveProtection.enabled: false`），且**企业托管策略下发的值仍然优先**——即组织层可以压过进程环境变量。[@ref-codebuddy-env-sensitive-protection]

## 运行时介入：环境变量、CLI 与 profile {#config-runtime}

环境变量可在启动前设置，也可写在 `settings.json` 的 `env` 字段以便对每个会话自动应用；文档给出示例（`CODEBUDDY_API_KEY`、`HTTPS_PROXY`、`MAX_THINKING_TOKENS`、`CODEBUDDY_DISABLE_AUTO_MEMORY`）。[@ref-codebuddy-env-settings] 例外是 `CODEBUDDY_IS_SANDBOX`：它只认进程环境变量，**不会**从 `settings.json` 的 `env`（含项目级）注入，以避免仓库静默提权。[@ref-codebuddy-env-tools]

CLI 参数是最高优先级的临时覆盖，例如 `--settings`（从 JSON 文件或字符串加载额外设置）、`--setting-sources user,project,local`（选择加载哪些来源）、`--model`、`--permission-mode`、`--add-dir`、`--plugin-dir`、`--agents`、`--mcp-config`/`--strict-mcp-config`。[@ref-codebuddy-cli-args]

`settings.json` 支持 `codebuddy config` 命令管理：`get`/`set`/`list`/`add`/`remove`，`set` 用 `-g, --global` 写全局、省略则写项目级。[@ref-codebuddy-settings-configcmds] 若干键有明确的生效时机：`model` 与 `outputStyle` 直接改文件后已开启的会话不生效，需重启进程或 `/clear` 新建会话，经 `/model` 或 `/config set` 切换则立即生效。[@ref-codebuddy-settings-keys]

## 信任与权限限制 {#config-trust}

目录信任：`trustedDirectories` 列出已信任的工作目录，命中的目录启动时不再弹授权提示；`trustAll` 信任所有工作目录，但**仅**免除目录信任授权，不跳过工具执行权限（工具审批仍由 `permissions.defaultMode`/`bypassPermissions` 决定）。两个字段通常由首次启动弹窗自动写入，也可手动编辑。[@ref-codebuddy-settings-keys][@ref-codebuddy-perms-trust]

权限规则分三类行为：`deny`（最高优先级）、`ask`（覆盖 allow）、`allow`。规则在 `/permissions`、CLI 启动参数与配置文件中管理。[@ref-codebuddy-perms-rules][@ref-codebuddy-perms-where] 敏感文件可在 `permissions.deny` 中用 `Read(./.env)`、`Read(./secrets/**)` 等模式屏蔽，匹配的文件对 CodeBuddy Code 完全不可见。[@ref-codebuddy-settings-exclude] `permissions.disableBypassPermissionsMode: "disable"` 可禁止 `bypassPermissions`，同时禁用 `-y`/`--dangerously-skip-permissions` 并阻止 `CODEBUDDY_IS_SANDBOX` 打开 full pass。[@ref-codebuddy-settings-permissions]

组织策略：企业可通过托管设置与市场限制约束用户可添加的市场（`extraKnownMarketplaces` 由项目声明、成员信任文件夹后被提示安装），安装遵守信任边界并需要明确同意。[@ref-codebuddy-settings-plugins] 同一「组织优先」规则也作用于敏感数据防护：企业托管策略下发的 `sensitiveProtection` 取值压过 `CODEBUDDY_DISABLE_SENSITIVE_PROTECTION`，企业不能用关掉环境变量来绕过托管策略，用户本地关闭也不会写回共享设置文件。[@ref-codebuddy-env-sensitive-protection]

## 默认值、开关与迁移 {#config-defaults}

`settings.json` 的键给出明确默认值，例如 `cleanupPeriodDays`（默认 30 天）、`includeCoAuthoredBy`（默认 `true`）、`promptSuggestionEnabled`（默认 `true`）、`showTurnDuration`（默认 `true`）、`autoCompactEnabled`。功能开关与平台差异主要由环境变量承载，例如 `CODEBUDDY_CODE_SHELL` 覆盖自动 shell 检测、`CODEBUDDY_USE_POWERSHELL_TOOL` 控制 Windows 上 PowerShell 工具、`USE_BUILTIN_RIPGREP=0` 改用系统 `rg`、`CODEBUDDY_SANDBOX_IMAGE` 指定容器沙箱镜像（默认 `node:20-alpine`）、`CODEBUDDY_DISABLE_HOT_RELOAD` 关闭热更新。[@ref-codebuddy-settings-keys][@ref-codebuddy-env-shell][@ref-codebuddy-env-fs][@ref-codebuddy-env-tools]

界面显示类的开关同样走环境变量：`CODEBUDDY_SHOW_CONTEXT_USAGE` 设为 `1`/`true`/`yes`/`on` 时常驻显示当前会话的上下文窗口使用率，覆盖默认的阈值显示行为；该开关随 CLI 2.161.0 发布。[@ref-codebuddy-env-context-usage][@ref-codebuddy-changelog-context-usage] 面向下游集成的图片开关：通用图片 blob 复水打开后，`CODEBUDDY_SKIP_READ_TOOL_IMAGE_REHYDRATION_IN_HISTORY=true` 让 `-p` 历史回放中的 `Read` 图片仍保留 blob 引用、不内联 base64，实时 `Read` 输出与模型上下文不受影响。[@ref-codebuddy-env-image-history]

行为提示类开关（**默认开启**，需要时设 `1` 关闭）：`CODEBUDDY_DISABLE_TASK_REMINDERS` 关掉长任务运行中的任务列表提醒，包括恢复会话里已保存的提醒；提醒在标准模式直连任务工具、PTC 模式 REPL 沙箱内的 `TaskCreate`/`TaskUpdate`（或旧版 `TodoWrite`）长期未更新时出现，属隐藏提醒，不改变任务状态也不强制执行顺序，Minimal 与沙箱未开放任务工具的模式不触发。[@ref-codebuddy-env-task-reminders]

产品特性由环境变量本地放行（**默认关闭**，设 `1`/`true`/`yes`/`on` 开启）：`CODEBUDDY_RESPONSES_STORE_ENABLED` 强制开启 `ResponsesStore`，把 `api: "openai-responses"` 的模型请求从默认 `store: false` 改为 `store: true`；`CODEBUDDY_DISABLE_SENSITIVE_PROTECTION` 关闭本进程的敏感数据防护，效果同 `settings.json` 的 `sensitiveProtection.enabled: false` 但不改共享设置文件。两者都由 WorkBuddy 的 `--features '{"rollout":true}'` 传给 agent。[@ref-codebuddy-env-responses-store][@ref-codebuddy-env-sensitive-protection]

遥测侧有一个记录原始报文的开关：`OTEL_LOG_RAW_API_BODIES` 取 `file:` 加目录名（如 `file:./raw`）时把完整模型 API 请求/响应体写入本地目录（`*.request.json` / `*.response.json` 加 `index.jsonl`），其他真值记为 span events（60KB 截断），细节见官方 Monitoring 文档。[@ref-codebuddy-env-otel-raw-bodies]

迁移与兼容：MCP 配置保留旧路径（`~/.codebuddy/mcp.json` 已废弃、`~/.codebuddy.json` 为旧版；项目侧 `mcp.json` 已废弃），读取时按优先级取第一个存在的文件。[@ref-codebuddy-mcp-locations] 环境变量有显式弃用关系，例如 `CODEBUDDY_SHARE_LINK_ENABLED` 是 `CODEBUDDY_ARTIFACT_ENABLED` 的旧名（新变量优先）。[@ref-codebuddy-env-tools] 从 Claude Code 迁移时官方给出符号链接与复制两条路径（迁移 `settings.json`、`CODEBUDDY.md`、agents、commands、skills 等）。[@ref-codebuddy-trouble-migrate]

## 诊断 {#config-diagnostics}

查看实际生效来源：`codebuddy config list` / `codebuddy config get 〈key〉` 读配置，`/config` 面板交互式查看与修改。[@ref-codebuddy-settings-configcmds] `/permissions` 列出所有权限规则及其来源的 settings 文件。[@ref-codebuddy-perms-where] `/status` 显示当前仓库与会话状态，`/doctor` 检查 CodeBuddy Code 的状态与环境。[@ref-codebuddy-slash-builtin]

重载语义（`partial`）：`models.json` 支持热重载（1 秒防抖）；记忆文件手动修改后不重载，需重启；`/clear` 只清消息历史、不重载记忆；`/memory` 编辑记忆会自动清缓存。跟踪的表见记忆文档的「缓存与重载」一节。[@ref-codebuddy-models-hotreload][@ref-codebuddy-memory-cache]

「文件已写但没有生效」的排查入口：`CODEBUDDY_DEBUG=1`（等同 `--debug`）打开调试日志，`CODEBUDDY_CODE_DEBUG_LOGS_DIR` 指定日志目录。[@ref-codebuddy-env-debug] MCP 配置不生效时官方顺序是检查语法、确认作用域优先级、重启应用。[@ref-codebuddy-mcp-troubleshoot] 更新后仍是旧版本、npm 安装成功却执行旧版本等安装类问题见故障排查的「更新」一节。[@ref-codebuddy-trouble-update] 权限确认框无响应时文档给出日志位置与关键 TAG 的按时序排查方法。[@ref-codebuddy-trouble-logs]