---
schema_version: 3
record_kind: production
edition_id: crush-cli-configuration-v2
harness_id: crush
topic: configuration
title: "Crush 的配置机制：crushrc/JSON 来源、合并优先级、运行时覆盖与诊断"
sections:
  - section_id: config-scope
    surface_ids: [cli]
    source_refs: [ref-crush-readme-config, ref-crush-skilldoc-config, ref-crush-schema-root]
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-crush-configdoc-where, ref-crush-readme-config, ref-crush-code-config-lookup, ref-crush-code-boundary, ref-crush-code-load-startup, ref-crush-code-system-config, ref-crush-code-system-config-win, ref-crush-code-global-paths, ref-crush-readme-lsp, ref-crush-configdoc-lsp-add, ref-crush-code-config-defaults, ref-crush-code-reload, ref-crush-configdoc-security, ref-crush-code-config-load-readfile, ref-crush-code-config-fileretry-read, ref-crush-code-config-fileretry-backoff, ref-crush-code-config-fileretry-windows, ref-crush-code-config-fileretry-unix]
  - section_id: config-merge
    surface_ids: [cli]
    source_refs: [ref-crush-code-config-merge, ref-crush-code-config-bytes, ref-crush-configdoc-where, ref-crush-code-config-lookup, ref-crush-code-crushrc-builder, ref-crush-code-option-reset, ref-crush-configdoc-composing, ref-crush-code-option-specs, ref-crush-code-permissions-builtin, ref-crush-configdoc-permissions, ref-crush-readme-allow-tools, ref-crush-readme-deny-tools, ref-crush-configdoc-cmdref, ref-crush-readme-config, ref-crush-configdoc-provider-add, ref-crush-code-provider-resolve]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-crush-code-global-paths, ref-crush-code-config-defaults, ref-crush-code-metrics, ref-crush-readme-apikeys, ref-crush-code-provider-resolve, ref-crush-code-flag-kinds, ref-crush-code-cli-flags, ref-crush-readme-yolo, ref-crush-code-store-overrides, ref-crush-code-crushrc-load, ref-crush-configdoc-versioning, ref-crush-configdoc-composing, ref-crush-code-crushrc-builtins, ref-crush-configdoc-why-bash]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-crush-code-config-defaults, ref-crush-readme-context, ref-crush-readme-init, ref-crush-code-options, ref-crush-code-option-specs, ref-crush-code-option-ui, ref-crush-code-request-timeout, ref-crush-configdoc-option, ref-crush-code-tool-opts, ref-crush-configdoc-option-ui, ref-crush-code-skill-dirs, ref-crush-code-provider-update, ref-crush-readme-auto-update-off, ref-crush-readme-auto-update]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-crush-configdoc-legacy-json, ref-crush-configdoc-json, ref-crush-configdoc-where, ref-crush-skilldoc-config, ref-crush-code-install-migration, ref-crush-code-tui-legacy-theme, ref-crush-code-attribution, ref-crush-code-config-attribution-default, ref-crush-code-mcp-struct, ref-crush-configdoc-future-state]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-crush-code-dirs-cmd, ref-crush-readme-logging, ref-crush-configdoc-option, ref-crush-code-info-perms, ref-crush-code-info-tool, ref-crush-code-info-staleness, ref-crush-code-info-mcp, ref-crush-code-info-skills, ref-crush-code-info-hooks, ref-crush-code-staleness, ref-crush-code-reload, ref-crush-code-store-field, ref-crush-configdoc-future-realtime, ref-crush-code-schema-cmd, ref-crush-code-config-atomicwrite-rename, ref-crush-code-config-fileretry-backoff, ref-crush-code-config-fileretry-windows]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-crush-configdoc-where, ref-crush-code-config-lookup, ref-crush-code-system-config, ref-crush-code-global-paths, ref-crush-code-boundary, ref-crush-code-config-load-readfile]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: partial
        source_refs: [ref-crush-configdoc-security, ref-crush-readme-config, ref-crush-code-config-lookup]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-merge
        status: answered
        source_refs: [ref-crush-code-config-lookup, ref-crush-code-config-merge, ref-crush-configdoc-where, ref-crush-code-option-specs, ref-crush-code-permissions-builtin]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-crush-code-cli-flags, ref-crush-code-config-defaults, ref-crush-code-store-overrides, ref-crush-code-global-paths, ref-crush-code-metrics, ref-crush-configdoc-versioning, ref-crush-code-crushrc-load]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-crush-code-config-defaults, ref-crush-code-options, ref-crush-code-option-specs, ref-crush-code-option-ui, ref-crush-code-request-timeout, ref-crush-code-skill-dirs, ref-crush-code-provider-update]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: answered
        source_refs: [ref-crush-code-install-migration, ref-crush-code-tui-legacy-theme, ref-crush-code-attribution, ref-crush-configdoc-json, ref-crush-configdoc-future-state, ref-crush-code-mcp-struct]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-crush-code-dirs-cmd, ref-crush-code-info-tool, ref-crush-code-info-staleness, ref-crush-code-staleness, ref-crush-code-reload, ref-crush-code-store-field, ref-crush-configdoc-future-realtime, ref-crush-readme-logging, ref-crush-code-config-atomicwrite-rename, ref-crush-code-config-fileretry-backoff, ref-crush-code-config-fileretry-windows]
---

## 固定来源与界面 {#config-scope}

本章事实来源是官方仓库 `charmbracelet/crush` 在固定 commit `69c65c3d5be0a388d62047feb55d88b9bad7f1b2` 的检出：仓库自带的配置文档 `docs/config/README.md`、README 的 Configuration 一节、内置配置技能 `internal/skills/builtin/crush-config/SKILL.md`，以及 `internal/config/`、`internal/shellconfig/` 的实现。界面口径：catalog 只登记了 `cli`（kind `cli`），本章所有答案都记在 `cli` 上。

检出内的 `schema.json` 是 `crush schema` 生成的配置 JSON Schema，顶层键只有 `$schema`、`models`、`providers`、`mcp`、`lsp`、`options`、`permissions`、`tools`、`hooks`、`env`；该文件的 `$id` 指向仓库内的 Go 包路径，配置示例里的 `$schema` 字段写的则是官方发布地址，本轮没有单独登记文档来源，因此正文只引用检出内的字节。[@ref-crush-readme-config][@ref-crush-skilldoc-config][@ref-crush-schema-root]

## 配置来源与作用域 {#config-sources}

Crush 有两套并存、会被一起发现并深度合并的配置格式 [@ref-crush-configdoc-where]：

| 格式 | 项目级 | 全局级 |
| :-- | :-- | :-- |
| Bash（`crushrc`，官方称首选） | `./.crushrc`、`./crushrc` | `$XDG_CONFIG_HOME/crush/crushrc`（默认 `~/.config/crush/crushrc`） |
| 旧版 JSON | `./.crush.json`、`./crush.json` | `$XDG_CONFIG_HOME/crush/crush.json` |

Windows 对应 `.\.crushrc`、`.\crushrc`、`%USERPROFILE%\.config\crush\crushrc`，JSON 同理 [@ref-crush-readme-config][@ref-crush-configdoc-where]。

实现上的查找顺序在 `lookupConfigs` 里：先把系统级路径、全局用户配置目录、全局用户配置目录旁的 `crushrc`、以及全局数据目录的 `crush.json` 放进候选列表，再从当前目录向上走到项目边界收集 `.{app}rc`、`{app}rc`、`.{app}.json`、`{app}.json` 四种名字，最后整体反转，让“后出现的配置文件优先级更高”。项目边界是 git 工作树根（`git rev-parse --show-toplevel`），不是 git 仓库时就是当前目录，因此不会误读项目之上的同名文件。[@ref-crush-code-config-lookup][@ref-crush-code-boundary]

固定路径的事实：加载入口是 `config.Load`（`config.Init` 是它的薄包装），Unix 上系统级路径是 `/etc/crush/crush.json`，Windows 上没有系统级配置（该常量为空串）[@ref-crush-code-load-startup][@ref-crush-code-system-config][@ref-crush-code-system-config-win]；全局用户配置是 `$CRUSH_GLOBAL_CONFIG/crush.json` 或 `~/.config/crush/crush.json`；全局数据配置是 `$CRUSH_GLOBAL_DATA/crush.json`、`$XDG_DATA_HOME/crush/crush.json` 或 `~/.local/share/crush/crush.json`，Windows 为 `%LOCALAPPDATA%\crush\crush.json` [@ref-crush-code-global-paths]。

MCP、LSP、hooks、技能路径等实体同样写在这批文件里（LSP 用 `lsp` 段定义，见 README 的 LSPs 一节与 `lsp add` 参考），因此它们共享同一套来源与优先级 [@ref-crush-readme-lsp][@ref-crush-configdoc-lsp-add]。项目数据目录默认 `.crush`（`options.data_directory` 可改，相对路径按工作目录解析），其中的 `.crush/crush.json` 作为最高优先级的“工作区配置”在最后合并加载 [@ref-crush-code-config-defaults][@ref-crush-code-reload]。

数据目录是机器自有状态：官方明确说数据目录只放 JSON 状态、Crush 不会从那里执行 `crushrc`，`lookupConfigs` 也只把数据目录的 `crush.json` 放进候选、不放 `crushrc` [@ref-crush-configdoc-where][@ref-crush-code-config-lookup]。

读取这一层现在统一走 `readFile` 而不是 `os.ReadFile`：`loadFromConfigPaths` 遍历候选路径时用它读每一个文件，文件不存在仍按原样跳过，其它错误仍按 `failed to open config file %s` 报出。`readFile` 是 `os.ReadFile` 包了一层重试，用于 Windows 上文件被短暂独占的情况（并发写者的 renameFile、杀毒软件、搜索索引器）；注释要求“任何由 `atomicWriteFile` 写出的文件都要经它读取”。重试预算 2 秒，指数退避从 1 毫秒起、上限 50 毫秒；判定“瞬时错误”的谓词按平台分文件实现：非 Windows 恒为 false（没有这类错误），Windows 上匹配 `ERROR_ACCESS_DENIED` 与 `ERROR_SHARING_VIOLATION`。也就是说这套重试在 Linux/macOS 上是纯 no-op，不改变任何读取结果。[@ref-crush-code-config-load-readfile][@ref-crush-code-config-fileretry-read][@ref-crush-code-config-fileretry-backoff][@ref-crush-code-config-fileretry-unix][@ref-crush-code-config-fileretry-windows]

**信任模型（`config.trust`）**：两种格式都被当作可信代码。`crushrc` 用内嵌 POSIX 解释器以完整 shell 语义执行，JSON 里被选定的字符串字段（API key、URL、MCP/LSP 命令与参数、header）在加载时做 `$VAR`/`$(cmd)` 展开，因此任何一条配置都会在 UI 出现之前以你的用户权限跑起来 [@ref-crush-configdoc-security][@ref-crush-readme-config]。固定来源没有提到项目信任提示、组织策略或沙箱会限制配置读取；实现里也没有 trust 相关的配置键或校验分支。真实边界是：能写这两个文件的人就已经能执行代码。至于“是否存在任何未文档化的信任门”，本轮只检查了 `docs/config/README.md` 的 Security 一节、README 的 security 提示和 `internal/config/` 的加载路径，没有发现，但这是证据缺失而不是官方声明，所以记为已知边界、留作缺口。[@ref-crush-configdoc-security]

## 合并顺序与占位语义 {#config-merge}

加载流程是“逐文件执行 → 收集 JSON 字节 → 合并 → 反序列化 → 补默认值”：`crushrc` 先由 `shellconfig.LoadShellConfig` 执行成一个 JSON 对象，再和 JSON 配置的字节一起交给 `loadFromBytes` 做深度合并。合并用的是通用 JSON 合并（`go-jsons`），不是按键特判的规则，因此同名字段深合并、数组整体替换、`null` 与空值按合并库语义处理。[@ref-crush-code-config-merge][@ref-crush-code-config-bytes]

优先级由“反转后的候选顺序 + 合并顺序”决定：后加载的覆盖先加载的。文档给出的结论与代码一致——项目设置覆盖全局设置，同一目录里 `crushrc` 覆盖 JSON；同一目录里如果两种格式同时存在且键有重叠，会记一条 warn（冲突键名会列出来），但不阻止加载 [@ref-crush-configdoc-where][@ref-crush-code-config-merge]。目录内文件名优先级为 `.crushrc` 高于 `crushrc`，两者都高于 JSON，`.crush.json` 高于 `crush.json` [@ref-crush-code-config-lookup]。

`crushrc` 内部是命令式语义：内建命令按脚本执行顺序写入构建器，后面的语句覆盖前面的语句；`remove`/`rm` 与 `option reset` 作用于此前（含 `source` 进来的文件）已经设置的值，`option reset` 配列表键只是把该列表清空，之后追加的值仍然保留 [@ref-crush-code-crushrc-builder][@ref-crush-code-option-reset][@ref-crush-configdoc-composing]。

列表与集合型字段的累积语义 [@ref-crush-code-option-specs][@ref-crush-code-permissions-builtin]：

- `context-path`、`global-context-path`、`skill-path`、`disable-skill` 每次调用追加一个值，不是替换。
- `permissions allow` 追加到 `permissions.allowed_tools`（跳过询问），重复添加同一工具是 no-op。
- `permissions deny` 追加到 `options.disabled_tools`，把工具从 agent 的工具集中隐藏；官方注明两者都在时 deny 生效。[@ref-crush-configdoc-permissions][@ref-crush-readme-allow-tools][@ref-crush-readme-deny-tools]

一个最小 `crushrc`（示例逐字取自 `docs/config/README.md` 与 README 的 Configuration 一节）[@ref-crush-configdoc-cmdref][@ref-crush-readme-config]：

```bash
# ~/.config/crush/crushrc（全局）或 ./crushrc（项目）
provider add deepseek --type openai-compat \
  --base-url "https://api.deepseek.com/v1" \
  --api-key "$DEEPSEEK_API_KEY"

mcp add github --type http \
  --url "https://api.githubcopilot.com/mcp/" \
  --header Authorization "Bearer $GH_PAT"

permissions allow view edit
option skill-path ./skills
```

`--api-key` 里用的是环境变量引用，凭据不落进示例；header 值解析为空串时该 header 会被丢弃，因此“变量没设就不发这个 header”是可预期的行为 [@ref-crush-configdoc-provider-add][@ref-crush-code-provider-resolve]。

## 运行时入口：环境变量与 CLI {#config-runtime}

环境变量分三类。第一类改变配置位置：`CRUSH_GLOBAL_CONFIG`、`CRUSH_GLOBAL_DATA` 覆盖全局配置与数据目录，`XDG_CONFIG_HOME`/`XDG_DATA_HOME`/`XDG_CACHE_HOME` 参与默认路径推导，`CRUSH_CACHE_DIR` 覆盖缓存目录 [@ref-crush-code-global-paths]。第二类在加载后覆盖选项：`CRUSH_DISABLE_PROVIDER_AUTO_UPDATE`、`CRUSH_DISABLE_DEFAULT_PROVIDERS` 在补默认值阶段被读入 `options`；`CRUSH_DISABLE_METRICS=1` 与 `DO_NOT_TRACK=1` 关闭指标上报 [@ref-crush-code-config-defaults][@ref-crush-code-metrics]。第三类是 provider 凭据类变量（`ANTHROPIC_API_KEY`、`OPENAI_API_KEY`、`VERTEXAI_*`、`AWS_*`、`HYPER_API_KEY`、`CATWALK_URL` 等），在 provider 配置阶段生效 [@ref-crush-readme-apikeys][@ref-crush-code-provider-resolve]。

`crushrc` 内建命令的旗标解析支持字符串、布尔、无值布尔（如 `--think`）、整数、浮点、键值对（如 `--env K V`）与 JSON 对象几种形态，所以 `--extra-body` 这类旗标会按 JSON 校验 [@ref-crush-code-flag-kinds]。

CLI 参数在启动时介入：持久参数有 `--cwd/-c`、`--data-dir/-D`、`--debug/-d`、`--host/-H`，根命令参数还有 `--yolo/-y`、`--session/-s`、`--continue/-C`，以及隐藏的 `--channels`（把 MCP server 启用为 channel）。`--data-dir` 直接进 `setDefaults` 的 dataDir 参数并覆盖 `options.data_directory`；`--debug` 把 `options.debug` 置真；`--yolo` 走运行时覆盖 `SkipPermissionRequests`（自动批准所有权限请求），不写回配置文件；官方对这一模式有单独的谨慎提示 [@ref-crush-code-cli-flags][@ref-crush-readme-yolo]。[@ref-crush-code-config-defaults][@ref-crush-code-store-overrides]

`crushrc` 里还能读 `CRUSH_VERSION`（当前运行版本，本地构建为字面量 `devel`）做版本分叉；`provider add` 的 `--extra-header K V` 以及 header、env、args 等值支持 `$VAR` 与 `$(cmd)` 展开 [@ref-crush-code-crushrc-load][@ref-crush-configdoc-versioning]。

没有 profile 机制：固定来源没有 profile 概念，配置分叉靠 Bash 条件语句与 `source`。[@ref-crush-configdoc-composing]

`crushrc` 的执行细节（影响“为什么这条语句没生效”的判断）[@ref-crush-code-crushrc-load][@ref-crush-code-crushrc-builtins]：

- 用的就是 `bash` 工具与 hook 同一套内嵌 POSIX 解释器，`source`、管道、命令替换、条件语句都可直接使用；工作目录是**配置文件所在目录**，不是当前项目目录，因此 `source ./x.sh` 相对的是配置目录。
- 环境继承当前进程环境，并额外注入 `CRUSH_VERSION`；每次加载有 30 秒上限，脚本挂住（例如命令替换卡死）会被取消并让本次加载报错。
- 之所以选 Bash：Crush 自带解释器（跨平台一致），而且“用户与 agent 用同一套工具改配置”是设计目标。[@ref-crush-configdoc-why-bash]
- 七个内建命令（`provider`、`model`、`mcp`、`lsp`、`hook`、`permissions`、`option`）只在“配置构建器存在”的上下文里生效；在普通 `bash` 工具调用里它们没有构建器，属于 no-op。这也是为什么同一条命令写在 `crushrc` 会改配置、写在会话里的 bash 里什么也不会发生。
- 脚本执行完把构建结果序列化成**单个 JSON 对象**，再进入与 JSON 配置相同的合并流程，因此两套格式共享同一套字段语义。

## 默认值与功能开关 {#config-defaults}

`setDefaults` 在合并后补齐：全局上下文文件默认是配置目录下的 `CRUSH.md` 与配置目录上一级的 `AGENTS.md`（可用 `option global-context-path` 覆盖，多条追加）；项目上下文默认列表包含 `.github/copilot-instructions.md`、`.cursorrules`、`.cursor/rules/`、`CLAUDE.md`、`GEMINI.md`、`crush.md`、`CRUSH.md`、`AGENTS.md` 等常见名字；数据目录默认 `.crush`；`options.initialize_as` 默认 `AGENTS.md` [@ref-crush-code-config-defaults][@ref-crush-readme-context][@ref-crush-readme-init]。

开关类默认值（JSON 字段 / `crushrc` 键）[@ref-crush-code-options][@ref-crush-code-option-specs][@ref-crush-code-option-ui][@ref-crush-code-request-timeout][@ref-crush-configdoc-option]：

| 用途 | JSON 字段 | `crushrc` 键 | 默认 |
| :-- | :-- | :-- | :-- |
| 调试日志 / LSP 调试日志 | `options.debug` / `options.debug_lsp` | `option debug` / `option debug-lsp` | false |
| 进度指示 | `options.progress` | `option progress` | true |
| 自动配置 LSP | `options.auto_lsp` | `option auto-lsp` | true（nil 也视为 true） |
| 自动摘要 | `options.disable_auto_summarize` | `option auto-summarize`（反向） | 摘要开启 |
| 匿名指标 | `options.disable_metrics` | `option metrics`（反向） | 上报开启 |
| Provider 目录自动更新 | `options.disable_provider_auto_update` | `option provider-auto-update`（反向） | 自动更新开启 |
| 内置 provider | `options.disable_default_providers` | `option default-providers`（反向） | 内置 provider 开启 |
| 通知样式 | `options.notifications` | `option notifications` | `auto` |
| 单次请求超时（秒） | `options.request_timeout` | `option request-timeout` | 代码常量 2 分钟；`0` 表示不超时 |
| 鼠标捕获 | `options.tui.mouse` | `option ui mouse` | true |
| 滚动条 | `options.tui.scrollbar` | `option ui scrollbar` | `default` |
| 退出横幅 | `options.tui.exit_banner` | `option ui exit-banner` | `default` |
| ls/glob/grep 工具的深度、条目与超时 | `tools.ls`、`tools.glob`、`tools.grep` | 无对应键（只能用 JSON） | 未设置时由工具自己兜底（如 grep 5 秒、glob 30 秒）[@ref-crush-code-tool-opts] |

UI 相关键的完整清单与取值约束见 `option ui` 参考 [@ref-crush-configdoc-option-ui]。

反向键的含义是：用户写正向名字（`metrics`），存储时写成否定的 JSON 字段（`disable_metrics`）[@ref-crush-code-option-specs]。

平台差异：Windows 上额外扫描 `%LOCALAPPDATA%\crush\skills` 与 `%LOCALAPPDATA%\agents\skills`；Apple Terminal 会被自动打开透明背景；不在 git 工作树里时 `ls` 工具与补全的深度/条目上限被压到 2 与 100 [@ref-crush-code-skill-dirs][@ref-crush-code-config-defaults]。

内置 provider 目录来自 Catwalk（默认 `https://catwalk.charm.land`，可用 `CATWALK_URL` 改），有缓存文件、embedded 兜底与手动更新入口 `crush update-providers`；关掉自动更新后只使用随发行版内置的那一份 [@ref-crush-code-provider-update][@ref-crush-readme-auto-update-off][@ref-crush-readme-auto-update]。

## 迁移、弃用与兼容 {#config-migration}

- **JSON 转 Bash**：JSON 仍然完全支持（`docs/config/README.md` 的 Legacy JSON 一节给出完整写法与 schema 链接），但官方定位为 deprecated [@ref-crush-configdoc-legacy-json]，新配置项只加在 Bash 格式上；两者会一起发现并合并，同目录冲突时 warn [@ref-crush-configdoc-json][@ref-crush-configdoc-where][@ref-crush-skilldoc-config]。
- **通知选项迁移**：加载第一步跑 `migrateDisableNotifications`，把旧的 `options.disable_notifications` 与 `options.notification_style` 迁移成 `notifications`，并从所有含旧键的配置文件里删除旧键（`sjson.Delete` 后原子写回）[@ref-crush-code-install-migration]。
- **主题字段**：TUI 主题的旧字符串形式 `"theme": "gruvbox-dark"` 在 `TUIOptions.UnmarshalJSON` 里被提升为 `active_theme`；更早的内联主题映射也能解析但会被忽略 [@ref-crush-code-tui-legacy-theme]。
- **署名字段**：`attribution.co_authored_by` 标注为 deprecated（schema 里 `Deprecated: true`），迁移为 `trailer_style`（`co-authored-by`/`assisted-by`/`none`），缺省 `assisted-by` 且 `generated_with` 默认 true；旧布尔值在补默认值时被翻译成新的枚举 [@ref-crush-code-attribution][@ref-crush-code-config-attribution-default]。
- **孤儿 OAuth token**：MCP 条目只剩 token 而没有 command/url/type 时，加载时会被删除 [@ref-crush-code-mcp-struct]。

官方还计划把机器状态从配置里拆出去（`state.json`、typed state store、`crush config convert`），文档明确标注为“尚未实现”，因此当前仍按上面这套合并路径理解 [@ref-crush-configdoc-future-state]。

## 诊断：看生效来源与判断是否需要重启 {#config-diagnostics}

- `crush dirs` 打印全局配置目录、全局数据目录以及从当前目录向上发现的项目配置目录；非终端环境下逐行输出，便于脚本消费。[@ref-crush-code-dirs-cmd]
- `crush logs`（`--tail`、`--follow`）读取数据目录下的 `logs/crush.log`，默认 tail 1000 行；`--debug` 或 `option debug true` 提高日志级别，`option debug-lsp true` 另开 LSP 调试日志。[@ref-crush-readme-logging][@ref-crush-configdoc-option]
- 面向模型的 `crush_info` 工具还会给出 `[permissions]`（是否 yolo、允许的工具）与 `[tools]`（被禁用的工具）小节 [@ref-crush-code-info-perms]。
- 面向模型的 `crush_info` 工具会输出 `[config_files]`（实际加载的文件路径列表）、`[config]`（`dirty`、`changed_paths`、`missing_paths`、`errors`）、以及 model、provider、lsp、mcp、skills、hooks、permissions、options 等小节，是判断“文件已写但没生效”的第一手入口。[@ref-crush-code-info-tool][@ref-crush-code-info-staleness][@ref-crush-code-info-mcp][@ref-crush-code-info-skills][@ref-crush-code-info-hooks]
- 脏检查实现：`ConfigStaleness` 对比启动（或上次 reload）时记录的 size 与 mtime，文件新增、修改或消失都会置 `Dirty`；`ReloadFromDisk` 会重建这份快照。[@ref-crush-code-staleness][@ref-crush-code-reload]
- 什么时候会真正重载：Crush 自己写配置（设置对话框、模型选择、MCP 开关等经 `SetConfigField` 的写入）会在写完后自动重载内存状态并通知客户端与 MCP 重新协调；而用户手改 `crushrc` 不会触发监听，官方文档明确说 `crushrc` 在启动时只跑一次，实时应用属于尚未实现的计划。[@ref-crush-code-store-field][@ref-crush-code-reload][@ref-crush-configdoc-future-realtime]
- `crush schema` 重新生成配置 JSON Schema（隐藏命令），是核对可用键的权威方式 [@ref-crush-code-schema-cmd]。

写入这一层与读取共用同一个重试：`renameFile` 不再自带重试循环，而是整体委派给 `retryTransient`（同一个 2 秒预算与同一套瞬时错误判定），`atomicWriteFile` 的写-改名流程不变。因此“重试瞬时文件错误”现在是一条统一策略，读写两侧都走它，而不是只包住改名一步。[@ref-crush-code-config-atomicwrite-rename][@ref-crush-code-config-fileretry-backoff][@ref-crush-code-config-fileretry-windows]

缺口：没有文档化的“打印当前生效配置与来源文件”的单条命令（`crush_info` 的 `[config_files]` 最接近，但它由模型调用）；手改 `crushrc` 后的重载没有官方命令，本轮只确认了 `ReloadFromDisk` 这个内部入口与“启动时执行一次”的官方表述。[@ref-crush-code-reload][@ref-crush-configdoc-future-realtime]
