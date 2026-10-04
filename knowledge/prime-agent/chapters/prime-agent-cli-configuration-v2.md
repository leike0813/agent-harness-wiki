---
schema_version: 3
record_kind: production
edition_id: prime-agent-cli-configuration-v2
harness_id: prime-agent
topic: configuration
title: "Prime Agent CLI 的配置来源、合并、运行时覆盖与迁移"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-prime-agent-settings-locations, ref-prime-agent-settings-paths, ref-prime-agent-code-configdir, ref-prime-agent-code-agentdir, ref-prime-agent-sdk-dirs, ref-prime-agent-providers-authfile, ref-prime-agent-usage-context, ref-prime-agent-usage-sysprompt, ref-prime-agent-usage-shell, ref-prime-agent-pkg-enable, ref-prime-agent-factory-types-rust, ref-prime-agent-factory-scope-rust, ref-prime-agent-factory-scope-setter-rust, ref-prime-agent-factory-gate-py, ref-prime-agent-factory-refinement-host-rust, ref-prime-agent-factory-tui-command-rust, ref-prime-agent-factory-tui-restart-rust, ref-prime-agent-factory-cli-command-rust]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-prime-agent-settings-merge, ref-prime-agent-settings-ctor, ref-prime-agent-settings-globalonly, ref-prime-agent-settings-telemetry-getter, ref-prime-agent-pkg-filtering, ref-prime-agent-pm-apply, ref-prime-agent-settings-overrides, ref-prime-agent-factory-scope-rust]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-prime-agent-code-configdir, ref-prime-agent-code-sessiondir, ref-prime-agent-settings-sessions, ref-prime-agent-usage-env, ref-prime-agent-usage-modelopts, ref-prime-agent-providers-order, ref-prime-agent-usage-resourceopts, ref-prime-agent-args-flags, ref-prime-agent-settings-autonomous]
  - section_id: config-trust-defaults-migration
    surface_ids: [cli]
    source_refs: [ref-prime-agent-mcp-generic, ref-prime-agent-settings-telemetry, ref-prime-agent-pkg-install, ref-prime-agent-settings-globalonly, ref-prime-agent-settings-model, ref-prime-agent-settings-autonomous, ref-prime-agent-settings-compaction, ref-prime-agent-settings-resources-getter, ref-prime-agent-retry-defaults, ref-prime-agent-code-pkgdir, ref-prime-agent-settings-migrate, ref-prime-agent-code-migrations-run, ref-prime-agent-code-migrations-hooks, ref-prime-agent-factory-types-rust, ref-prime-agent-factory-gate-py]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-prime-agent-diag-main, ref-prime-agent-settings-locations, ref-prime-agent-pkg-enable, ref-prime-agent-settings-errors, ref-prime-agent-settings-persist, ref-prime-agent-diag-reload, ref-prime-agent-settings-ctor, ref-prime-agent-diag-interactive]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-prime-agent-settings-locations, ref-prime-agent-settings-paths, ref-prime-agent-code-configdir, ref-prime-agent-code-agentdir, ref-prime-agent-sdk-dirs, ref-prime-agent-usage-shell, ref-prime-agent-factory-types-rust, ref-prime-agent-factory-scope-rust, ref-prime-agent-factory-scope-setter-rust, ref-prime-agent-factory-gate-py, ref-prime-agent-factory-refinement-host-rust, ref-prime-agent-factory-tui-command-rust, ref-prime-agent-factory-tui-restart-rust, ref-prime-agent-factory-cli-command-rust]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-prime-agent-settings-merge, ref-prime-agent-settings-ctor, ref-prime-agent-settings-globalonly, ref-prime-agent-settings-telemetry-getter, ref-prime-agent-pkg-filtering, ref-prime-agent-pm-apply, ref-prime-agent-settings-overrides, ref-prime-agent-factory-scope-rust]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-prime-agent-code-configdir, ref-prime-agent-code-sessiondir, ref-prime-agent-settings-sessions, ref-prime-agent-usage-env, ref-prime-agent-usage-modelopts, ref-prime-agent-usage-resourceopts, ref-prime-agent-args-flags, ref-prime-agent-settings-autonomous]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust-defaults-migration
        status: answered
        source_refs: [ref-prime-agent-mcp-generic, ref-prime-agent-settings-telemetry, ref-prime-agent-pkg-install, ref-prime-agent-settings-globalonly]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-trust-defaults-migration
        status: answered
        source_refs: [ref-prime-agent-settings-model, ref-prime-agent-settings-autonomous, ref-prime-agent-settings-compaction, ref-prime-agent-settings-resources-getter, ref-prime-agent-retry-defaults, ref-prime-agent-code-pkgdir, ref-prime-agent-factory-types-rust, ref-prime-agent-factory-gate-py]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-trust-defaults-migration
        status: answered
        source_refs: [ref-prime-agent-settings-migrate, ref-prime-agent-code-migrations-run, ref-prime-agent-code-migrations-hooks]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-prime-agent-diag-main, ref-prime-agent-pkg-enable, ref-prime-agent-settings-errors, ref-prime-agent-settings-persist, ref-prime-agent-diag-reload, ref-prime-agent-settings-ctor]
---

## 配置文件与作用域 {#config-sources}

Prime Agent 的配置入口是**两份 JSON 设置文件**，项目覆盖全局[@ref-prime-agent-settings-locations][@ref-prime-agent-settings-paths][@ref-prime-agent-code-configdir]：

| 位置 | 作用域 |
| :-- | :-- |
| `~/.prime/agent/settings.json` | 全局（所有项目） |
| `.prime/agent/settings.json` | 项目（当前目录） |

目录名来自包内的 `piConfig.configDir`（值为 `.prime/agent`），用户目录由 `getAgentDir()` 给出：优先读环境变量 `PRIME_AGENT_CODING_AGENT_DIR`，否则用 `join(homedir(), CONFIG_DIR_NAME)`。项目设置文件由 `join(cwd, CONFIG_DIR_NAME, "settings.json")` 决定，因此**切换进程的工作目录就会换一份项目设置**。[@ref-prime-agent-code-agentdir]

同一目录下的其它第一方文件（各自的读取时机不同）[@ref-prime-agent-sdk-dirs][@ref-prime-agent-providers-authfile][@ref-prime-agent-usage-context][@ref-prime-agent-usage-sysprompt]：

| 文件 | 作用 |
| :-- | :-- |
| `auth.json` | API 密钥与 OAuth 凭据（0600 权限） |
| `models.json` | 自定义 provider 与模型（每次打开 `/model` 重读） |
| `AGENTS.md` / `CLAUDE.md` | 上下文文件：全局一份，加上从 cwd 向上到根目录的各级，`--no-context-files` 关闭 |
| `SYSTEM.md` / `APPEND_SYSTEM.md` | 替换或追加系统提示（项目或全局各一份） |
| `extensions/`、`skills/`、`prompts/`、`themes/` | 资源目录（见对应主题章节） |
| `sessions/` | 会话存储，可用 `sessionDir` 或环境变量改址 |

**`factory` 段的键名与作用域**。这是 agent factory（内核 `rlm.factory` 命名空间）的 opt-in 闸门，键路径是 `factory.enabled`，写在 agent 目录的 `settings.json` 里，与 `compaction`、`agentTraces` 等段并列[@ref-prime-agent-factory-types-rust]。这条键有两条绕过类型化设置层的读法：内核的 `rlm.factory`[@ref-prime-agent-factory-gate-py] 与 Rust 侧的 refinement host[@ref-prime-agent-factory-refinement-host-rust] 各自直接解析 `settings.json` 的原始 JSON 读它；设置管理器则通过 `Settings` 上的可选 `factory` 字段读同一份文档，`FactorySettings` 在 `#[serde(rename_all = "camelCase")]` 下只有一个可选布尔字段 `enabled`，并同步进了加载器的已知字段表。三条路径的判定一致——缺失、类型不对或文档损坏都读作未设置。

作用域上它**只认全局**：读取走 `self.global_settings()`[@ref-prime-agent-factory-scope-rust]，写入走 `self.global_mut()` 并保存全局作用域[@ref-prime-agent-factory-scope-setter-rust]。所以在项目 `.prime/agent/settings.json` 里写 `factory.enabled` 不会打开闸门——这与 `mcpServers` 一样属于下面例外表里的全局键，而不是普通的“项目覆盖全局”。

**开关在哪个界面上要单独说清。** 固定来源只在 TUI 客户端里实现了斜杠命令 `/factory [on|off|status]`，注释写明它就是这个 opt-in 闸门并由它持久化 `factory.enabled`[@ref-prime-agent-factory-tui-command-rust]；`on` 分支经客户端设置缝写入该键，成功后提示**需要重启客户端**才会显示 factory 分组[@ref-prime-agent-factory-tui-restart-rust]。CLI 侧注册的 `factory` 是另一套命令，固定来源列出的子命令是 `list`、`import`、`export` 三个，管的是机器库，没有 on/off/status[@ref-prime-agent-factory-cli-command-rust]。

`catalog/harnesses.yaml` 为本产品只声明了 `surface_id: cli`，没有声明承载 `/factory` 的那个客户端界面，因此这条斜杠命令的界面绑定按来源归属规则记为 `unknown`：**它不是 `cli` 界面的结论，也不能外推成 CLI 界面的行为**；`cli` 界面上是否存在等价的开关，固定来源没有给出。键本身的语义（键名、只读全局、失败关闭）与界面无关，属于本节的产品级事实。

同一条键被两侧读取，daemon 的 `factory_activity` 通道广播与内核的 factory gate 读的是同一个设置项，因此客户端界面上的 `/factory status` 显示与内核的实际行为不会分叉[@ref-prime-agent-factory-types-rust]。固定来源没有给出该键对应的环境变量。

**固定来源中没有组织级配置入口**：没有管理策略文件、没有 `trustedFolders`、没有 `--settings` 文件覆盖参数、也没有 profile 机制；可用命令是 `prime-agent config`（逐个开关资源）与交互模式里的 `/settings` 菜单。[@ref-prime-agent-usage-shell][@ref-prime-agent-pkg-enable]

## 作用域合并与优先级 {#config-overrides}

合并算法 `deepMergeSettings(global, project)` 的实际语义[@ref-prime-agent-settings-merge][@ref-prime-agent-settings-ctor]：

- 跳过值为 `undefined` 的覆盖项；
- 两边同为非数组对象时做**一层**展开（`{ ...base, ...override }`）：嵌套子对象是整体替换，不是递归合并；
- 其它类型（数组、字符串、布尔、`null`）整体替换；
- **没有删除标记**：把键设为 `null` 就是写入 `null`，删除键只能改文件。

运行时层再叠一层：`applyOverrides()` 把运行期覆盖与合并结果再合并一次，因此优先级是 运行期覆盖 > 项目设置 > 全局设置。[@ref-prime-agent-settings-ctor]

**例外（并非所有键都服从“项目覆盖全局”）**[@ref-prime-agent-settings-globalonly][@ref-prime-agent-settings-telemetry-getter][@ref-prime-agent-factory-scope-rust]：

| 键 | 特殊规则 |
| :-- | :-- |
| `mcpServers` | 只读全局；项目条目在执行时被忽略（安全考虑） |
| `factory.enabled` | 只读全局；项目作用域无法打开该 opt-in 闸门 |
| `updateChannel` | 只读全局 |
| `idleEvictionMinutes` | 只读全局；`"off"` 或 `"none"` 关停 |
| `rlmMaxDepth` | 只读全局 |
| `telemetry.enabled` | 全局 ∧ 项目 ∧ 运行期三者相与：项目设置只能进一步限制，不能重新开启全局已关闭的遥测 |

数组类设置（`packages`、`extensions`、`skills`、`prompts`、`themes`）支持 glob 与四种前缀：`!pattern` 排除、`+path` 强制包含精确路径、`-path` 强制排除精确路径、裸模式为包含；应用顺序是 include → exclude → force-include → force-exclude，包的对象式过滤在此基础上进一步收窄 manifest 允许的范围。文档给出的对象式示例[@ref-prime-agent-pkg-filtering][@ref-prime-agent-pm-apply]：

```json
{
  "packages": [
    "npm:simple-pkg",
    {
      "source": "npm:my-package",
      "extensions": ["extensions/*.ts", "!extensions/legacy.ts"],
      "skills": [],
      "prompts": ["prompts/review.md"],
      "themes": ["+themes/legacy.json"]
    }
  ]
}
```

文档《Project Overrides》给出的最小合并示例（`compaction.reserveTokens` 被项目覆盖，`compaction.enabled` 与 `theme` 保留全局值）[@ref-prime-agent-settings-overrides]：

```json
// ~/.prime/agent/settings.json（全局）
{ "theme": "dark", "compaction": { "enabled": true, "reserveTokens": 16384 } }

// .prime/agent/settings.json（项目）
{ "compaction": { "reserveTokens": 8192 } }
```

## 环境变量与命令行如何介入 {#config-runtime}

- 环境变量前缀由包内 `piConfig.name` 推导为 `PRIME_AGENT_`；`PRIME_AGENT_CODING_AGENT_DIR` 改配置目录，`PRIME_AGENT_SESSION_DIR` 改会话目录，旧的 `PRIME_AGENT_CODING_AGENT_SESSION_DIR` 仍作为别名被读取。[@ref-prime-agent-code-configdir][@ref-prime-agent-code-sessiondir]
- 会话目录的完整优先级是：`--session-dir` > `PRIME_AGENT_SESSION_DIR` > `PRIME_AGENT_CODING_AGENT_SESSION_DIR` > `settings.json` 的 `sessionDir`。[@ref-prime-agent-settings-sessions]
- 常用环境变量（官方表节选）[@ref-prime-agent-usage-env]：`PI_OFFLINE`（关闭启动期网络，含更新检查与包更新检查）、`PI_SKIP_VERSION_CHECK`（跳过版本检查）、`PI_PACKAGE_DIR`、`PI_CACHE_RETENTION=long`、`PRIME_API_KEY`、`PRIME_AGENT_KERNEL_PYTHON`、`PRIME_AGENT_DOWNLOAD_BASE_URL`、`VISUAL`/`EDITOR`。
- 命令行覆盖模型与凭据：`--provider`、`--model`（支持 `provider/id` 与 `:thinking` 后缀）、`--api-key`（运行期覆盖，不落盘）、`--models`（Alt+M 轮换候选）；密钥解析顺序里 `--api-key` 排第一。[@ref-prime-agent-usage-modelopts][@ref-prime-agent-providers-order]
- 资源开关：`--skill`、`--no-skills`、`-e/--extension`、`--no-extensions`、`--prompt-template`、`--no-prompt-templates`、`--theme`、`--no-themes`、`--no-context-files`；`--no-*` 与显式加载组合可以做到“忽略设置，只加载我要的”。[@ref-prime-agent-usage-resourceopts][@ref-prime-agent-args-flags]
- 自主模式的预算既能在命令行（`--autonomous-max-*`、`--autonomous-timeout-ms`）也给，也能持久化进设置（`autonomous.*`）；某次运行的显式参数优先于设置里的默认值，非法值按字段回退到内置默认。[@ref-prime-agent-settings-autonomous]

## 信任、默认值与迁移 {#config-trust-defaults-migration}

**信任边界**[@ref-prime-agent-mcp-generic][@ref-prime-agent-settings-telemetry][@ref-prime-agent-pkg-install]：

- 没有文件夹信任模型（无 `trustedFolders`、无 `--trust`、无组织策略），限制是逐键实现的：`mcpServers` 项目条目被忽略，遥测只能被项目收紧；[@ref-prime-agent-settings-globalonly]
- 反过来，项目设置本身是可以带来执行的：项目 `settings.json` 里 `packages` 声明的包会在启动时自动安装（离线模式除外），因此克隆一个不受信任的仓库并启动 agent 前应当先看这些文件；
- 配置文件写入是原子的（临时文件 + 重命名，权限 `0600`），保存时按字段 diff，只写改动过的键。

**读者常用的默认值**[@ref-prime-agent-settings-model][@ref-prime-agent-settings-autonomous][@ref-prime-agent-settings-compaction][@ref-prime-agent-settings-resources-getter][@ref-prime-agent-retry-defaults]：

| 键 | 默认 |
| :-- | :-- |
| `defaultThinkingLevel` | `"xhigh"` |
| `autonomous.maxContinuations` / `maxTurns` / `maxTokens` / `timeoutMs` | `3` / `12` / `80000` / `1800000` |
| `compaction.enabled` / `reserveTokens` / `keepRecentTokens` | `true` / `16384` / `20000` |
| `retry.enabled` / `maxRetries` / `baseDelayMs` / `provider.maxRetryDelayMs` | `true` / `3` / `2000` / `60000` |
| `factory.enabled` | 未设置 / `false`，即默认关闭 |
| `enableSkillCommands` / `enableBuiltinSkills` / `bundledSkills.websearch` | `true` / `true` / `true` |
| `treeFilterMode` | `"user-only"` |
| `idleEvictionMinutes` | `90` |

`factory.enabled` 的默认值是**失败关闭**而不是简单的缺省 false：内核侧读取 agent 目录的 `settings.json` 时，文件缺失、键缺失、值类型不对、文档损坏都按未设置处理，只有 `enabled` 恰好是 `true` 才算打开[@ref-prime-agent-factory-gate-py]。也就是说设置文件读不出来时是拒绝启用，而不是静默放行——这一点与上表其它“非法值按字段回退到内置默认”的键不同，后者回退后功能是开着的。类型化侧把这个默认值表达为可选布尔加 `unwrap_or(false)`，两层读到的结果一致[@ref-prime-agent-factory-types-rust]。

平台差异体现在实现里：`expandTildePath` 在 win32 上按 `\` 与 Windows 家目录规则展开；`getPackageDir()` 区分打包二进制（可执行文件旁的资源目录）与源码/分发形态（`dist/`）；安装方式检测能区分 win32、npm、pnpm、yarn、bun、homebrew。[@ref-prime-agent-code-pkgdir]

**迁移规则分两层**[@ref-prime-agent-settings-migrate][@ref-prime-agent-code-migrations-run][@ref-prime-agent-code-migrations-hooks]：

1. 设置键迁移（每次读取与每次保存前都会跑）：`queueMode` → `steeringMode`、布尔 `websockets` → `transport: "websocket"/"sse"`、旧对象形 `skills: { enableSkillCommands, customDirectories }` → 顶层 `enableSkillCommands` 与数组 `skills`、`retry.maxDelayMs` → `retry.provider.maxRetryDelayMs`、布尔 `telemetry` → `{ enabled }`；迁移后旧键被删除。
2. 启动迁移（`runMigrations`）：`oauth.json` 与设置里的 `apiKeys` 迁到 `auth.json`，散落在 agent 目录的会话文件归位到 `sessions/`（含旧式按 cwd 命名的嵌套目录扁平化），`commands/` → `prompts/`，`tools/` 目录里的 fd/rg 二进制迁到 `bin/`，keybindings 格式升级；已废弃的 `hooks/` 目录只产生一条 `Hooks have been renamed to extensions.` 告警。

`factory` 段不需要键迁移：它没有旧名字，键名就是 `factory.enabled`，形状从一开始就是一个可选布尔值，不属于上面任何一类改名或改形规则[@ref-prime-agent-factory-types-rust]。

## 诊断与“文件写了却没生效” {#config-diagnostics}

- **查看当前设置**：交互模式用 `/settings` 菜单，资源开关用 `prime-agent config`；启动时把设置诊断（`applyOverrides` 与解析错误）汇总成 `(上下文, 作用域 settings) 错误` 形式的告警打印到 stderr。[@ref-prime-agent-diag-main][@ref-prime-agent-settings-locations][@ref-prime-agent-pkg-enable]
- **解析失败的行为**：某个作用域解析失败时该作用域整体按空对象读取，并且**拒绝回写**——保存时给出 `Global settings not saved: settings file failed to parse: ...` 或对应的项目版本提示，避免用内存里的残缺配置覆盖坏文件。[@ref-prime-agent-settings-errors]
- **写入是异步且按字段 diff**：保存只合并改动过的字段/嵌套字段，原子写盘；进程退出前需要 `flush()` 才保证落盘。[@ref-prime-agent-settings-persist]
- **改动何时生效**：内存里持有合并结果，设置改动需要 `/reload`（或重开会话）才重新读取；`/reload` 的第一步就是 `settingsManager.reload()`，随后重新解析包并重载资源，再向扩展发 `session_shutdown` → `session_start(reason: "reload")`。设置文件没有文件监听。[@ref-prime-agent-diag-reload]
- **daemon 场景的坑**：项目设置按**进程 cwd** 解析，daemon 启动的 worker 与客户端 cwd 可能不同，同一个仓库在两处看到的项目设置可能不同。[@ref-prime-agent-settings-ctor]

**缺口**：固定来源没有提供“显示每个键最终取值与来源”的命令（可用面只有 `/settings` 菜单、启动告警与资源清单），也没有说明 `flush()` 的调用时机[@ref-prime-agent-diag-interactive]。`factory.enabled` 的生效时机只覆盖了客户端界面这一条路径：斜杠命令明确要求重启客户端才会显示 factory 分组[@ref-prime-agent-factory-tui-restart-rust]；`/reload` 是否足够、关闭时是否也要重启，固定来源没有说明，保持未验证。
