---
schema_version: 2
record_kind: production
edition_id: antigravity-cli-configuration-v1
harness_id: antigravity-cli
topic: configuration
title: Antigravity CLI 的配置来源、优先级、运行时覆盖与诊断
sections:
  - section_id: config-sources
    source_refs:
      - ref-agy-configuration-settings-path
      - ref-agy-configuration-settings-keybindings-location
      - ref-agy-configuration-settings-scopes
      - ref-agy-configuration-settings-project-scope
      - ref-agy-configuration-rules-global
      - ref-agy-configuration-rules-cli
      - ref-agy-configuration-agents-location
      - ref-agy-configuration-skills-cli
      - ref-agy-configuration-mcp-entry
      - ref-agy-configuration-hooks-cli
      - ref-agy-configuration-plugins-manual
      - ref-agy-configuration-plugins-location
      - ref-agy-configuration-sidecars-config
      - ref-agy-configuration-changelog-precedence
      - ref-agy-configuration-changelog-scan
      - ref-agy-configuration-install-auth
  - section_id: config-overrides
    source_refs:
      - ref-agy-configuration-perms-presets
      - ref-agy-configuration-sandbox-cli
      - ref-agy-configuration-perms-cli
      - ref-agy-configuration-perms-cli-lists
      - ref-agy-configuration-perms-precedence
      - ref-agy-configuration-perms-examples
      - ref-agy-configuration-perms-implicit
      - ref-agy-configuration-perms-guardrails
      - ref-agy-configuration-rules-precedence
      - ref-agy-configuration-rules-budget
      - ref-agy-configuration-rules-sharing
      - ref-agy-configuration-changelog-precedence
      - ref-agy-configuration-changelog-merge
      - ref-agy-configuration-changelog-preserve
      - ref-agy-configuration-changelog-ask-preserved
      - ref-agy-configuration-changelog-configjson
      - ref-agy-configuration-changelog-rulesjson
  - section_id: config-runtime
    source_refs:
      - ref-agy-configuration-cli-overrides
      - ref-agy-configuration-settings-override-warning
      - ref-agy-configuration-sandbox-flags
      - ref-agy-configuration-cli-ref-example
      - ref-agy-configuration-cli-ref-commands
      - ref-agy-configuration-install-modelprovider
      - ref-agy-configuration-install-api-key
      - ref-agy-configuration-install-endpoint
      - ref-agy-configuration-install-env-trouble
      - ref-agy-configuration-install-revert
      - ref-agy-configuration-trouble-updater
      - ref-agy-configuration-trouble-path
      - ref-agy-configuration-changelog-headless
      - ref-agy-configuration-changelog-editor-env
      - ref-agy-configuration-changelog-mode-setting
  - section_id: config-trust
    source_refs:
      - ref-agy-configuration-cli-ref-defaults2
      - ref-agy-configuration-perms-platform
      - ref-agy-configuration-perms-presets
      - ref-agy-configuration-perms-cli
      - ref-agy-configuration-perms-guardrails
      - ref-agy-configuration-agent-perms
      - ref-agy-configuration-agent-win-exec
      - ref-agy-configuration-settings-strict-mode
      - ref-agy-configuration-settings-strict-effects
      - ref-agy-configuration-settings-sandbox
      - ref-agy-configuration-sandbox-cli
      - ref-agy-configuration-sandbox-integration
      - ref-agy-configuration-sandbox-windows-presets
      - ref-agy-configuration-sandbox-prompts
      - ref-agy-configuration-changelog-write-review
      - ref-agy-configuration-changelog-review-mode
      - ref-agy-configuration-changelog-unsandboxed
      - ref-agy-configuration-changelog-hooks-trust
      - ref-agy-configuration-changelog-trust-dialog
  - section_id: config-defaults
    source_refs:
      - ref-agy-configuration-cli-ref-keys
      - ref-agy-configuration-cli-ref-defaults
      - ref-agy-configuration-cli-ref-defaults2
      - ref-agy-configuration-settings-scopes
      - ref-agy-configuration-settings-telemetry
      - ref-agy-configuration-settings-sandbox
      - ref-agy-configuration-sidecars-config
      - ref-agy-configuration-agent-win-exec
      - ref-agy-configuration-agent-non-workspace
      - ref-agy-configuration-sandbox-windows-presets
      - ref-agy-configuration-perms-platform
      - ref-agy-configuration-changelog-budget
      - ref-agy-configuration-changelog-configjson
      - ref-agy-configuration-changelog-plugin-uninstall
      - ref-agy-configuration-changelog-pickergrouping
      - ref-agy-configuration-settings-path
  - section_id: config-migration
    source_refs:
      - ref-agy-configuration-migration-onboarding
      - ref-agy-configuration-migration-context
      - ref-agy-configuration-migration-plugins
      - ref-agy-configuration-migration-skills
      - ref-agy-configuration-migration-mcp
      - ref-agy-configuration-migration-mcp-schema
      - ref-agy-configuration-rules-frontmatter
      - ref-agy-configuration-changelog-unsandboxed
      - ref-agy-configuration-changelog-preserve
      - ref-agy-configuration-changelog-unparsed
      - ref-agy-configuration-changelog-refused-save
      - ref-agy-configuration-changelog-legacy-mcp-path
      - ref-agy-configuration-changelog-rulesjson
      - ref-agy-configuration-changelog-pickergrouping
      - ref-agy-configuration-changelog-mode-setting
  - section_id: config-diagnostics
    source_refs:
      - ref-agy-configuration-settings-panel
      - ref-agy-configuration-settings-override-warning
      - ref-agy-configuration-settings-keybindings-format
      - ref-agy-configuration-cli-ref-commands
      - ref-agy-configuration-sandbox-prompts
      - ref-agy-configuration-rules-frontmatter
      - ref-agy-configuration-changelog-log-path
      - ref-agy-configuration-changelog-refused-save
      - ref-agy-configuration-changelog-unparsed
      - ref-agy-configuration-changelog-atomic
      - ref-agy-configuration-changelog-ask-preserved
      - ref-agy-configuration-changelog-hooks-trust
      - ref-agy-configuration-changelog-headless
      - ref-agy-configuration-trouble-path
      - ref-agy-configuration-settings-path
      - ref-agy-configuration-mcp-entry
questions:
  - question_id: config.sources
    section_id: config-sources
    status: conflict
    source_refs:
      - ref-agy-configuration-settings-path
      - ref-agy-configuration-settings-keybindings-location
      - ref-agy-configuration-rules-cli
      - ref-agy-configuration-mcp-entry
      - ref-agy-configuration-plugins-location
      - ref-agy-configuration-changelog-precedence
  - question_id: config.overrides
    section_id: config-overrides
    status: partial
    source_refs:
      - ref-agy-configuration-perms-precedence
      - ref-agy-configuration-changelog-merge
      - ref-agy-configuration-changelog-precedence
      - ref-agy-configuration-rules-precedence
      - ref-agy-configuration-changelog-preserve
  - question_id: config.runtime
    section_id: config-runtime
    status: answered
    source_refs:
      - ref-agy-configuration-cli-overrides
      - ref-agy-configuration-settings-override-warning
      - ref-agy-configuration-sandbox-flags
      - ref-agy-configuration-install-api-key
      - ref-agy-configuration-trouble-updater
  - question_id: config.trust
    section_id: config-trust
    status: partial
    source_refs:
      - ref-agy-configuration-perms-presets
      - ref-agy-configuration-agent-perms
      - ref-agy-configuration-settings-strict-mode
      - ref-agy-configuration-changelog-hooks-trust
      - ref-agy-configuration-perms-platform
  - question_id: config.defaults
    section_id: config-defaults
    status: answered
    source_refs:
      - ref-agy-configuration-cli-ref-defaults
      - ref-agy-configuration-cli-ref-defaults2
      - ref-agy-configuration-settings-telemetry
      - ref-agy-configuration-sidecars-config
      - ref-agy-configuration-sandbox-windows-presets
  - question_id: config.migration
    section_id: config-migration
    status: answered
    source_refs:
      - ref-agy-configuration-migration-onboarding
      - ref-agy-configuration-migration-skills
      - ref-agy-configuration-migration-mcp
      - ref-agy-configuration-migration-mcp-schema
      - ref-agy-configuration-changelog-unsandboxed
  - question_id: config.diagnostics
    section_id: config-diagnostics
    status: partial
    source_refs:
      - ref-agy-configuration-settings-panel
      - ref-agy-configuration-settings-override-warning
      - ref-agy-configuration-changelog-log-path
      - ref-agy-configuration-changelog-refused-save
---

本章的固定来源有两类：官方文档站的页面快照，取于 2026-09-30，以及官方仓库提交 `77b1aad` 登记的快照（其内只有 README、CHANGELOG 与 `examples/`，没有产品源码，因此凡引用仓库处都用行号定位 CHANGELOG）。文档没有注明适用软件版本；产品没有官方 npm 包，也不做软件版本映射，所以整章按 source_only 阅读。文档站的这些页面是 Antigravity 2.0、Antigravity CLI 与 Antigravity IDE 三个形态的共页，每页用 tab 区块分别叙述；本章只把 CLI tab 描述的机制当作 Antigravity CLI 的机制，其他形态的说法只在能说明边界时引用。另需注意：Antigravity CLI 是闭源 Go 二进制，下面的路径、键名与默认值都来自上述文档与 CHANGELOG，没有在本机运行 `agy` 观察验证。

## 配置来源与作用域 {#config-sources}

Antigravity CLI 的配置不是一个文件，而是若干按作用域分开的目录树加一组 JSON 文件：最上层是用户级 CLI 设置文件，往下是用户级“定制”目录（技能、规则、子代理、插件、MCP、hooks、sidecars），再往下是工作区内的 `.agents/` 目录与各级上下文文件。全局设置文件是 `~/.gemini/antigravity-cli/settings.json`，采用“稀疏持久化”：只把与系统默认值不同的值写到盘上，以便文件保持精简并对未来版本向前兼容。[@ref-agy-configuration-settings-path] 键位映射存放在同级目录的另一个文件里，格式是“TUI 命令名到按键序列数组”的 JSON 映射。[@ref-agy-configuration-settings-keybindings-location]

官方设置页还把可配置项分成四个作用域：全局设置（账号与遥测、全局权限、外观、浏览器集成、模型使用、定制）、项目设置、独立会话、以及杂项（快捷键与反馈）；项目作用域里包含该项目的文件夹列表（为这些文件夹自动识别 Git 配置，并据此决定会话是按本地文件夹工作还是新建 worktree）、项目级权限与从两侧汇总来的定制视图。[@ref-agy-configuration-settings-scopes] [@ref-agy-configuration-settings-project-scope] **但这一段 tab 区块描述的是 Antigravity 2.0 的设置面板**（侧边栏入口、齿轮图标、项目文件夹、独立会话的临时目录都是图形形态的概念），不是 CLI 的作用域划分：CLI 没有这套四分类面板，它的作用域边界表现为“全局稀疏设置文件加共享配置根 + 项目根的 `.agents/` 与上下文文件 + `~/.gemini/config/projects/` 里的项目级权限”，因此上面这一段只作为对比信息保留，不应当成 CLI 的作用域清单。

**全局配置根存在两套说法，必须并列看待。** 固定页面里同时出现两个“全局配置目录”，它们各自的适用对象不同，文档没有说明彼此关系：

- 说法 A（CLI 专属根 `~/.gemini/antigravity-cli/`）：设置文件 `settings.json` 与键位文件 `keybindings.json` 在这里；技能从 `~/.gemini/antigravity-cli/skills/` 读取（插件自带的技能则在 `~/.gemini/antigravity-cli/plugins/` 下的插件目录里）；插件安装后被暂存到这个全局配置目录下的插件目录中；规则也承认 `~/.gemini/antigravity-cli/rules/` 这一处全局位置。[@ref-agy-configuration-skills-cli] [@ref-agy-configuration-plugins-location] [@ref-agy-configuration-rules-cli]
- 说法 B（共享配置根 `~/.gemini/config/`）：MCP 服务器写在 `~/.gemini/config/mcp_config.json`；hooks 写在 `~/.gemini/config/hooks.json`；手放的全局插件目录是 `~/.gemini/config/plugins/`；sidecar 从 `~/.gemini/config/sidecars/` 发现，其启停开关写在 `~/.gemini/config/config.json`；子代理从 `~/.gemini/config/agents/` 发现；规则承认 `~/.gemini/config/rules/`。[@ref-agy-configuration-mcp-entry] [@ref-agy-configuration-hooks-cli] [@ref-agy-configuration-plugins-manual] [@ref-agy-configuration-sidecars-config] [@ref-agy-configuration-agents-location] [@ref-agy-configuration-rules-global]

CHANGELOG 里还能找到第三个相关位置：项目级权限配置位于 `~/.gemini/config/projects/`，并且它的优先级高于 `~/.gemini/antigravity-cli/settings.json`。[@ref-agy-configuration-changelog-precedence] 也就是说，同一份 CHANGELOG 同时提到了两个根目录并直接比较了它们的优先级，这支持“两套说法都真实存在、各自承担不同文件”的判断，但仍无法从固定来源判定诸如 `skills/`、`rules/`、`plugins/` 这类同名目录到底读哪一个、还是两个都读。这一点需要在本机运行 `agy` 并分别投放同名条目观察，本章不做择一。

目录扫描规则也影响“哪些东西算被读到”。CHANGELOG 明确：`skills.json`、`rules.json`、`agents.json`、`plugins.json` 里的目录条目只加载该目录的直接子项（与 `.agents/skills/` 的行为一致），不再递归；要加载嵌套项必须写进 `include_only`。[@ref-agy-configuration-changelog-scan] 这与规则页“只扫描 `.agents/rules/` 的直接 `.md` 子文件、子目录里的文件除非登记否则被忽略”的说法互相印证。[@ref-agy-configuration-rules-global]

工作区一级的入口集中在项目根的 `.agents/` 下：技能在 `.agents/skills/`，子代理在 `.agents/agents/`，规则在 `.agents/rules/`，hooks 在 `.agents/hooks.json`，MCP 在 `.agents/mcp_config.json`，手放的插件在 `.agents/plugins/`。全局上下文文件与工作区上下文文件是另一条独立入口：`AGENTS.md` 与 `GEMINI.md` 可以放在项目任意子目录（读取或编辑文件时会向上逐级加载），也可以作为全局文件放在 `~/.gemini/AGENTS.md`、`~/.gemini/GEMINI.md` 或 `~/.gemini/config/AGENTS.md`、`~/.gemini/config/GEMINI.md`；CLI 在提示词展开时会同时评估工作区、目录、全局与插件四类规则。[@ref-agy-configuration-rules-global] [@ref-agy-configuration-rules-cli] [@ref-agy-configuration-mcp-entry] [@ref-agy-configuration-hooks-cli] [@ref-agy-configuration-plugins-manual] [@ref-agy-configuration-agents-location] [@ref-agy-configuration-skills-cli]

还有一类“配置”不在文件里：登录凭据。CLI 使用操作系统钥匙串（Apple Keychain、Linux secret-service/dbus、Windows Credential Manager）保存令牌 profile，有有效 profile 时静默登录，否则打开浏览器或（SSH 下）打印授权 URL 走手动码流程；`/logout` 清除的是钥匙串里的这些 profile，而不是本章的 JSON 文件。[@ref-agy-configuration-install-auth]

MCP、技能、hooks、插件、子代理各自的第一方字段清单不在本章展开，只在这里给出配置入口位置：MCP 见 [@ref-agy-configuration-mcp-entry]，技能见 [@ref-agy-configuration-skills-cli]，hooks 见 [@ref-agy-configuration-hooks-cli]，插件见 [@ref-agy-configuration-plugins-manual]，子代理见 [@ref-agy-configuration-agents-location]。sidecar 的发现目录与启停开关见 [@ref-agy-configuration-sidecars-config]。

## 覆盖与合并优先级 {#config-overrides}

权限是文档里唯一把合并顺序写全的部分。权限用 `action(target)` 表示，落在三张表里：`deny` 立即阻止、`ask` 暂停并征求同意、`allow` 免提示放行；三者冲突时严格按 **Deny 大于 Ask 大于 Allow** 取值，例如 `ask` 里的 `command(*)` 会压过 `allow` 里的 `command(git)`。[@ref-agy-configuration-perms-cli-lists] [@ref-agy-configuration-perms-precedence] 这三张表配置在全局设置文件里。[@ref-agy-configuration-perms-cli] 官方权限页给出的最小完整形态如下，可以直接放进 `~/.gemini/antigravity-cli/settings.json`，路径与项目按需替换（示例逐字取自该页的 CLI 示例）：[@ref-agy-configuration-perms-examples]

```json
{
    "permissions": {
        "allow": [
            "command(git)",
            "command(regex:npm run (build|lint|test))",
            "unsandboxed(git push)",
            "read_file(/var/log/app)",
            "write_file(src/)",
            "read_url(google.com)",
            "mcp(linter/*)"
        ],
        "deny": [
            "command(rm -rf)",
            "command(regex:curl .*)",
            "command(sudo)",
            "write_file(.git/)",
            "write_file(/home/user/.ssh)"
        ],
        "ask": ["command(*)", "execute_url(aws.amazon.com)", "mcp(sql/execute_mutation)"]
    }
}
```

写好后按 Deny 大于 Ask 大于 Allow 的顺序自检：上例里 `ask` 的 `command(*)` 会压过 `allow` 里的 `command(git)`，所以每条命令仍会先提问；`sudo`、`rm -rf` 这类命中 `deny` 的命令则被直接阻断。要真的让 `git` 免提示，就得把 `command(*)` 从 `ask` 里收窄（例如换成更具体的模式）。

表之上还有一层“预设”。官方权限页描述的预设（Default / Request Review / Turbo）决定终端命令、文件访问、MCP 与网页在无显式规则时的行为，而 allow/deny/ask 三表叠在预设之上并且始终优先；**该预设小节属于该页的 Antigravity 2.0 区块**，CLI 侧的同类层次是 `settings.json` 里的 `toolPermission` 取值（见 [@ref-agy-configuration-sandbox-cli]），三表本身同样是 CLI 的机制。[@ref-agy-configuration-perms-presets] [@ref-agy-configuration-perms-cli-lists]

权限配置的来源不止一处。CHANGELOG 记录系统会合并“项目级权限”“与 Antigravity 共享的用户设置里的权限”和“CLI 自己的 `settings.json` 里的权限”，同时项目级配置目录 `~/.gemini/config/projects/` 的优先级高于 `~/.gemini/antigravity-cli/settings.json`。[@ref-agy-configuration-changelog-merge] [@ref-agy-configuration-changelog-precedence] 这是本章能给出的最具体的跨作用域优先级证据；它只覆盖权限相关键，文档没有把它推广成“所有键都按此顺序覆盖”的通用规则。

除优先级外，权限还有两条隐式蕴含规则：允许某路径上的 `write_file` 自动获得该路径的 `read_file`，拒绝某路径上的 `read_file` 立即阻止该路径的 `write_file`。[@ref-agy-configuration-perms-implicit] 显式规则也始终压过系统默认：未配置的动作落到安全默认（工作区内读写自动允许、`read_url`/`execute_url` 与 MCP 默认 Ask），但一条 `ask` 规则即使命令本该在沙箱里免提示运行，也仍然会提问。[@ref-agy-configuration-perms-guardrails]

规则的合并语义与权限不同：规则是**累加**而不是替换，全局、工作区、目录三级发现的规则会一起进入上下文；只有内容互相冲突时，更具体的目录规则优先。[@ref-agy-configuration-rules-precedence] 累加有上限：所有生效的全局规则与 `always_on` 规则共享一个 20,000 token 预算（与技能、MCP 等定制预算分开），超预算时最大的规则文件会从内联正文降级成“路径加描述”的指针，让 agent 按需读取。[@ref-agy-configuration-rules-budget]

跨项目复用规则时有一份显式的合并清单：`.agents/rules.json` 用 `inherits` 引入其它 `rules.json`，用 `entries` 的 `include_only` 与 `exclude` 决定收哪些文件或子目录。这是文档里少见的、由用户自己书写的合并/排除机制。[@ref-agy-configuration-rules-sharing] CHANGELOG 也确认插件可以带一个顶层 `rules.json` 来声明它随包发布的规则文件。[@ref-agy-configuration-changelog-rulesjson]

防丢失的合并不变量同样有据可查：读、写、合并 `settings.json` 时都会保留无法识别的字段，避免在不同 CLI 版本或不同构建之间切换时设置被静默清空；[@ref-agy-configuration-changelog-preserve] 早期还有一个已修缺陷是“更新设置时 `ask` 权限被丢掉”。[@ref-agy-configuration-changelog-ask-preserved] 插件的启用/禁用状态则被收敛到 `config.json` 这一处，只从插件清单播种一次，避免插件自己发行的默认值变化影响既有用户。[@ref-agy-configuration-changelog-configjson]

**仍然存在的缺口。** 固定来源没有说明 `settings.json` 跨作用域合并时对象、数组的具体合并算法，也没有任何“空值”或“删除标记”的写法（例如是否能用 `null` 删除某个键、数组是追加还是整体替换、某个键是否例外）。上面给出的只有权限三表、权限来源顺序、规则累加与降级、`rules.json` 的 `inherits`/`include_only`/`exclude` 这几条已写明的规则；其余按未查明处理，需要运行观察。因此本节问题状态记为 partial。

## 运行时介入：命令行、环境变量与凭据 {#config-runtime}

命令行标志在会话启动时覆盖持久化设置。文档给的例子是 `agy --sandbox --model="Gemini 3.5 Flash"`：可以按会话临时覆盖持久偏好。[@ref-agy-configuration-cli-overrides] 覆盖期间交互式 `/config` 面板会在被覆盖的项旁边显示警示，例如 `! Tool Permission: strict (overridden by command flag)`；此时你仍然可以编辑磁盘上的持久值，但 CLI 在该会话内一直以运行期标志为准，直到会话结束。[@ref-agy-configuration-settings-override-warning] 沙箱标志的行为与之一致：`--sandbox` 为本次会话打开沙箱并覆盖 `settings.json`。[@ref-agy-configuration-sandbox-flags]

同一份 CLI 参考页把持久化键名、类型与默认值列成表，并提供一段最小 `settings.json` 示例：[@ref-agy-configuration-cli-ref-example]

```json
{
    "colorScheme": "tokyo night",
    "altScreenMode": "always",
    "toolPermission": "request-review",
    "notifications": true,
    "enableTerminalSandbox": true
}
```

环境变量是第二类运行时输入，除了上文的启动标志之外，最典型的用途是切换模型供给：只有把 `modelProvider` 设为 `gemini` 时，`GEMINI_API_KEY` 才有意义——单独导出这个变量没有作用；用自定义 Gemini 兼容端点还要设 `GOOGLE_GEMINI_BASE_URL`。[@ref-agy-configuration-install-api-key] 该键写在 `~/.gemini/antigravity-cli/settings.json` 里，配好后 CLI 跳过登录界面并在标题里显示 `Gemini API key` 而不是账号邮箱。[@ref-agy-configuration-install-modelprovider] 自定义端点通过导出一个环境变量指向别的 Gemini 兼容地址。[@ref-agy-configuration-install-endpoint] 想回到账号登录，就从设置文件里删掉 `modelProvider` 并重启；此时若仍把 `modelProvider` 留在 `gemini` 却取消了 `GEMINI_API_KEY`，CLI 无法启动。[@ref-agy-configuration-install-revert] 文档另外点明两个易踩的点：CLI 只从环境里的 `GEMINI_API_KEY` 读凭据，不加载 `.env` 文件，用 `GOOGLE_API_KEY` 设的键无效。[@ref-agy-configuration-install-env-trouble]

其余已登记的环境变量各自负责一个子系统：`AGY_CLI_DISABLE_AUTO_UPDATE` 设为 `true` 可以关闭后台自动更新；[@ref-agy-configuration-trouble-updater] 安装脚本会往 shell profile 追加 `PATH`（`--skip-path` 可跳过），PATH 不对时表现为 `agy: command not found`。[@ref-agy-configuration-trouble-path] 外部编辑器由 `editor` 设置决定，默认 `auto` 即遵循 `$EDITOR`；该变量的解析曾被修复过含 `=` 的参数被错误切分的问题。[@ref-agy-configuration-changelog-editor-env]

关于“profile”：本章能确认的 profile 只有凭据 token profile 这一种（存于钥匙串），以及模型侧通过 `modelProvider` 选择的供给方式；固定来源没有描述类似命令行工具那种命名 profile 集合，也没有 `--profile` 之类的入口。执行模式则是另一种可持久化的运行期状态：`/settings` 面板里的 Agent Mode 选项可以把默认执行模式（`default`、`accept-edits`、`plan`）存下来，从而不必手改 `settings.json` 或每次启动传 `--mode`。[@ref-agy-configuration-changelog-mode-setting]

启动入口本身也属于运行时：会话内用 `/config`（别名 `/settings`）打开设置编辑器；配置类命令还有 `/permissions`、`/keybindings`、`/model`、`/statusline`、`/title` 等。[@ref-agy-configuration-cli-ref-commands] 非交互运行同样读持久化设置：headless（`-p` / `--print`）现在会遵守 `settings.json` 里的策略，包括 `permissions`、文件访问、沙箱模式、自动执行与工件审查。[@ref-agy-configuration-changelog-headless]

## 信任、权限与沙箱对配置的约束 {#config-trust}

平台差异先决定用哪套信任模型：更新后的统一权限引擎目前只在 **macOS 与 Linux** 上可用；Windows 仍然使用上一代权限系统，文档说未来版本才会统一。[@ref-agy-configuration-perms-platform] 这套引擎把每个敏感操作表示成 `action(target)`，并把它放进 `deny`、`ask`、`allow` 三张表，三张表配置在全局设置文件 `~/.gemini/antigravity-cli/settings.json` 里（即前文列出的 `permissions.deny`、`permissions.ask`、`permissions.allow`）。[@ref-agy-configuration-perms-cli] 未配置的动作落到安全默认：工作区内读写自动允许，Web 与 MCP 默认 Ask，显式规则压过默认。[@ref-agy-configuration-perms-guardrails]

在这套引擎之上还有一层“预设”，但要注意形态边界：官方权限页的预设表（**Default**：终端命令在沙箱内运行、沙箱外需批准，文件访问限于工作区与临时目录；**Request Review**：关闭沙箱、每条终端命令都要批准；**Turbo**：不做隔离与限制、代理对文件系统有完全读写权）位于该页的 Antigravity 2.0 区块，并且用图形面板路径（Settings → General → Permission Settings）描述，可在项目层覆盖。[@ref-agy-configuration-perms-presets] Agent Settings 页用同样三个名字描述同一层，并且明确这批规则叠在预设之上、始终优先。[@ref-agy-configuration-agent-perms] CLI 侧有 CLI 专属文档支撑的对应层次是 `settings.json` 里的 `toolPermission`（`request-review`、`proceed-in-sandbox`、`strict`、`always-proceed`），沙箱页的 CLI 章节就把它与 `enableTerminalSandbox` 并列解释。[@ref-agy-configuration-sandbox-cli] 无论哪一层，allow/deny/ask 表都不会被放宽：被 `deny` 的动作不会被任何预设放行。[@ref-agy-configuration-perms-cli]

官方设置页还有一组更强的、由开关统辖的约束叫“严格模式”：开启后终端自动执行被强制为 Request Review，并且**终端 allowlist 被忽略**；浏览器 JavaScript 执行与工件审查同样被强制为 Request Review；文件系统方面代理遵守 `.gitignore`，工作区之外的访问被禁用。[@ref-agy-configuration-settings-strict-mode] 后三条具体行为在同一页的“终端、浏览器与工件审查策略”一节里逐条列出。[@ref-agy-configuration-settings-strict-effects] **注意形态边界**：这一节与它所在的“命令执行与文件访问”“终端沙箱”两节都属于设置页的第三个 tab 区块（Antigravity IDE），文档没有说明 CLI 是否有同名开关；CLI 侧可比对的、有 CLI 专属文档支撑的对应物是 `settings.json` 里的 `toolPermission: "strict"`（对所有非只读工具提问）与 `enableTerminalSandbox`。[@ref-agy-configuration-cli-ref-defaults2] [@ref-agy-configuration-settings-strict-mode]

沙箱与权限配置是双向绑定的，这是“配置是否生效”最容易踩的地方。设置页（第三个 tab 区块，Antigravity IDE）说 sandboxing 默认关闭、未来可能改变，只支持 macOS 与 Linux，macOS 用 Seatbelt（`sandbox-exec`）、Linux 用 `nsjail` 做进程隔离；[@ref-agy-configuration-settings-sandbox] 沙箱页把“沙箱由权限预设决定”的那两张表写在页首的 macOS/Linux 与 Windows 小节里（该页的 tab 是 2.0 与 CLI，这几节没有标注形态），而真正带 CLI 字样的是该页的 `How it works`（首句即写明 Antigravity CLI 在操作系统级隔离边界内执行命令）、`CLI configuration`、`CLI flags`、`CLI permissions integration` 与 `Interactive prompts` 几节，本节凡涉及 CLI 的结论都以后者为准。 相应的 CLI 默认值以 CLI 参考页为准：`enableTerminalSandbox` 默认 `false`。[@ref-agy-configuration-cli-ref-defaults2] 在 CLI 侧，沙箱由 `settings.json` 里的 `enableTerminalSandbox` 与 `toolPermission` 一起控制，也可以由 `--sandbox` 会话级覆盖。[@ref-agy-configuration-sandbox-cli] 沙箱的边界直接来自权限配置：工作区目录以读写挂载，`read_file` 放行的路径以只读挂载，`write_file` 放行的路径以读写挂载，被拒绝的路径被阻断，其余不可见；网络默认切断，`read_url` 放行的域名被加进出站白名单。[@ref-agy-configuration-sandbox-integration] 需要逃出沙箱的命令可以用 `unsandboxed(...)` 规则放行；批准交互提示里的“总是允许”记录的正是 `unsandboxed(...)` 而不是普通 `command(...)`。[@ref-agy-configuration-sandbox-prompts] 该规则写法已经被弃用，启动时会跨 CLI、共享、项目三类配置文件发出迁移提示。[@ref-agy-configuration-changelog-unsandboxed]

Windows 侧用的是另一套名字与语义（这些小节同样没有标注形态，只说明 Windows 继续使用上一代权限系统，因此把下面几点当作“Windows 行为”而不是“CLI 专属键”看待）：终端命令自动执行有三档（Require Review、Proceed in Sandbox、Always Proceed），沙箱模式在全局设置里是一个“预览”开关，项目层把每个设置都变成带 Inherit General 的下拉项，另有一个 Security Preset 下拉把终端与文件夹外访问策略打包（Default、Full machine、Turbo mode），并且这些预设都不会打开沙箱——一旦手动打开沙箱模式，预设就切换为 Custom。[@ref-agy-configuration-agent-win-exec] [@ref-agy-configuration-sandbox-windows-presets]

工作区信任决定工作区级配置何时被加载。CHANGELOG 记录过一个已修问题：工作区根的 `.agents/hooks.json` 里定义的 hooks 在信任文件夹之后没有加载，修法是在工作区变化时重新加载 hooks；[@ref-agy-configuration-changelog-hooks-trust] 同一份 CHANGELOG 也提到界面上存在工作区信任对话框。[@ref-agy-configuration-changelog-trust-dialog] 这说明工作区级配置的生效被一道信任步骤门控，但固定来源没有说明信任状态存在哪里、如何预先声明、如何在非交互模式下跳过——因此本节只能给出“存在这道门”的结论，无法给出配置方法。

另有两条与信任直接相关的行为值得记住：预授权的文件写可以免审查，即默认模式会尊重 `settings.json` 里 `permission.allow` 放行的 `write_file`；[@ref-agy-configuration-changelog-write-review] 而默认审查模式又会自动授予工作区范围内的读访问，以减少重复批准。[@ref-agy-configuration-changelog-review-mode] 至于组织级策略（例如企业托管配置、强制下发的默认值），固定来源没有描述对应机制；文档只在安装与认证页提到企业访问需要在 onboarding 时连接 GCP 项目。这一部分记为未查明，故本节问题状态为 partial。

## 默认值、功能开关与平台差异 {#config-defaults}

CLI 参考页给出了 `settings.json` 的主键表，含键名、值类型与系统默认值，是判断“我是否改过默认值”的第一手依据。[@ref-agy-configuration-cli-ref-keys] 其中安全与权限相关的默认值是：`toolPermission` 默认 `request-review`、`artifactReviewPolicy` 默认 `asks-for-review`、`allowNonWorkspaceAccess` 默认 `false`、`enableTerminalSandbox` 默认 `false`。[@ref-agy-configuration-cli-ref-defaults] [@ref-agy-configuration-cli-ref-defaults2] 显示与集成相关的默认值是：`colorScheme` 默认 `terminal`（继承外壳配色）、`altScreenMode` 默认 `default`（自适应）、`verbosity` 默认 `high`、`runningLightSpeed` 默认 `medium`、`editor` 默认 `auto`、`editorMode` 默认 `default`、`notifications` 默认 `false`、`showTips` 与 `showFeedbackSurvey` 默认 `true`、`enableTelemetry` 默认 `true`、`useG1Credits` 默认 `false`（仅外部构建可用）、`vimInsertFirst` 默认 `false`（需先把 `editorMode` 设为 `vim`）。[@ref-agy-configuration-cli-ref-defaults] [@ref-agy-configuration-cli-ref-defaults2]

默认值由谁继承取决于作用域，而 CLI 与图形形态在这里并不共用一套描述：CLI 只有一份全局稀疏设置文件、一堆全局配置根，加项目根的 `.agents/` 文件与上下文文件，项目级权限另放在 `~/.gemini/config/projects/`；官方设置页那套“全局/项目/独立会话/杂项”的四分类属于 Antigravity 2.0 的面板，只可作概念对照。[@ref-agy-configuration-settings-scopes] CLI 侧的沙箱默认开关是 `enableTerminalSandbox`，默认 `false`；设置页把它描述为“默认关闭、未来可能改变，只支持 macOS 与 Linux”，那一段位于该页的 Antigravity IDE 区块。[@ref-agy-configuration-cli-ref-defaults2] [@ref-agy-configuration-settings-sandbox] 稀疏持久化改变了“默认值在哪里”的读法：磁盘上只有与默认不同的键，所以某个键缺席等于它在用系统默认，而不是未配置或被禁用。[@ref-agy-configuration-settings-path] 这也意味着回退某项设置的最简方式是把它写回默认值或删掉该键，而不是去某个“默认文件”里查。

功能开关分三类。第一类是账号与遥测：CLI 侧可写的键是 `enableTelemetry`，默认 `true`。[@ref-agy-configuration-cli-ref-defaults2] 设置页用图形面板的措辞把同一个开关描述为 Account 区的 `Enable Telemetry`（打开后收集交互用于评估与改进产品，可随时退出），但那段位于 Antigravity 2.0 区块，只作对照。[@ref-agy-configuration-settings-telemetry] 第二类是带平台的开关，例如 AI 额度 `useG1Credits` 标注为“仅外部构建”，说明它由构建形态而非用户配置决定可用性。[@ref-agy-configuration-cli-ref-defaults] 第三类是扩展子系统的默认关闭：sidecar **默认禁用**，必须在全局配置文件 `~/.gemini/config/config.json` 里按 sidecar ID 显式写 `enabled: true` 才会运行；插件同理，启用/禁用状态的唯一存放处是 `config.json`，只从插件清单播种一次，卸载后不留残余条目。[@ref-agy-configuration-sidecars-config] [@ref-agy-configuration-changelog-configjson] [@ref-agy-configuration-changelog-plugin-uninstall] 新增设置键有时只出现在 CHANGELOG 里，例如 `pickerGrouping` 用于决定 `/resume` 会话列表是平铺还是按工作区分组。[@ref-agy-configuration-changelog-pickergrouping]

平台差异除了信任模型本身（见上节，统一权限引擎只在 macOS 与 Linux 可用）[@ref-agy-configuration-perms-platform]，还体现在默认行为、开关命名和行为边界三处；下面这些预设小节都写在各自页面的非 CLI 区块里（上节已说明形态边界），因此行文上把它们当作平台行为描述，准确的 CLI 键名仍以 CLI 参考页与沙箱页 CLI 章节为准。默认行为上，macOS/Linux 的 Default 预设默认开着沙箱，而 Windows 的 Security Preset 三档都不打开沙箱，必须另开“Enable Sandbox Mode”，此开关会把预设切成 Custom。[@ref-agy-configuration-sandbox-windows-presets] 开关命名上，macOS/Linux 用“Permission Settings + 预设”，Windows 用“Terminal Command Auto Execution + Security Preset”。[@ref-agy-configuration-agent-win-exec] 行为边界上，非工作区文件访问涉及的“应用数据目录”在两个来源里写法不同：设置页的 Antigravity IDE 区块写作 `~/.gemini/antigravity-ide/`（含工件、知识条目与配置文件），而 Agent Settings 页的 Windows 小节写作 `~/.gemini/antigravity/`（含工件、知识条目等）。[@ref-agy-configuration-agent-non-workspace] 两处分别对应 IDE 形态与 Windows 上一代权限系统，**不能直接当成同一个 CLI 值自相矛盾**；CLI 侧能确定的对应键是 `allowNonWorkspaceAccess`（默认 `false`，控制代理能否读写工作区之外的文件）。由于文档没有给出 CLI 在 macOS/Linux 与 Windows 上各自的应用数据目录，这个路径在 CLI 语境下仍属未查明项。[@ref-agy-configuration-cli-ref-defaults]

定制内容也有一处默认值与预算相关的行为差异：早期版本里规则和技能、workflows、子代理、MCP 抢同一个定制预算，后来给用户与工作区规则划出独立的 20,000 token 预算，超预算的规则按换行边界截断，并列成“路径加描述”。[@ref-agy-configuration-changelog-budget] 预算是全局生效的裁决，因此“规则写了却没全文进入上下文”不一定代表文件没被读到。

## 迁移、弃用与兼容 {#config-migration}

配置文件层面的迁移由首次启动的 onboarding 完成：在一个存在旧 Gemini CLI 配置的环境里第一次执行 `agy` 时，CLI 会检测已有 profile 并弹出一份交互清单，让你勾选要转换的扩展与全局配置，同时把会话令牌迁进操作系统钥匙串，并把默认的视觉参数与渲染缓冲映射到新的设置 profile。[@ref-agy-configuration-migration-onboarding] 文档明确承认这是“部分对齐”：工作区技能、规则与 MCP 服务器会被保留支持，但某些自定义终端主题或实验性视觉叠加不被支持。[@ref-agy-configuration-migration-onboarding]

各子系统的迁移规则是分开写的：

- 工作区与全局上下文文件不变：`GEMINI.md` 与 `AGENTS.md` 继续按原语义解析，全局约束继续读 `~/.gemini/GEMINI.md`。[@ref-agy-configuration-migration-context]
- 技能路径变了：全局共享路径从 `~/.gemini/skills/` 变成 `~/.gemini/antigravity-cli/skills/`，工作区路径从 `.gemini/skills/` 变成 `.agents/skills/`；后者被标为“需要动作”，即旧目录里的工作区技能必须手动改名或搬到 `.agents/skills/` 才会被识别。[@ref-agy-configuration-migration-skills] 全局路径另有一种说法（workflows 迁移页写 `~/.gemini/config/skills/`），两处尚未判定，详见 Skills 章「CLI 查找 Skill 的位置」小节。
- MCP 从内联变成独立文件：旧做法是把服务器写在 `~/.gemini/settings.json` 里，新做法是写单独的 `mcp_config.json`，全局在 `~/.gemini/config/mcp_config.json`、工作区在 `.agents/mcp_config.json`。[@ref-agy-configuration-migration-mcp]
- 远程 MCP 定义的键名变了：旧的 `url` 或 `httpUrl` 必须改成 `serverUrl`，同一页给出的示例用的就是 `serverUrl`。[@ref-agy-configuration-migration-mcp-schema] 但 `url` 与 `serverUrl` 的并存说法尚未判定（仓库 CHANGELOG 记录过新增对 `url` 的支持），详见 MCP 章「Server 定义、字段与变量展开」小节。
- 扩展变成插件：可以手动执行 `agy plugin import gemini`，它会搜索旧的本地目录、解析扩展清单并转换成原生插件布局；输出的清单逐项报告每个扩展的 skills、agents、commands、mcpServers 是“已转换”还是“跳过（未检测到）”。[@ref-agy-configuration-migration-plugins]

弃用提示也是迁移的一部分。最明确的一条是 `unsandboxed` 权限规则已被弃用：启动警告会跨 CLI、共享与项目三种配置文件列出每一个受影响文件的路径、最多五条问题规则，以及迁移到 `command` 规则的分步指引。[@ref-agy-configuration-changelog-unsandboxed] 命令层面的同类变化包括用 `/plan` 取代旧的 `/planning` 并移除 `/fast`，执行模式收敛到 `shift+tab` 循环与 `/plan` 前缀。[@ref-agy-configuration-changelog-mode-setting] 另有一个路径写错导致功能失效的历史缺陷：MCP 面板的禁用按钮曾写到旧的 `mcp_config.json` 位置而不是迁移后的 `config/mcp_config.json`，这提醒读者判断“改了没生效”时要确认写的是哪一份文件。[@ref-agy-configuration-changelog-legacy-mcp-path]

兼容性的三条硬规则值得单独记住：一是未知字段在读、写、合并时都被保留，避免跨版本切换时设置被清空；[@ref-agy-configuration-changelog-preserve] 二是遇到无法解析的 `settings.json`，CLI 不再用默认值覆盖它——历史上会静默回写并把所有设置恢复默认，修好之后拒绝保存会让文件保持逐字节不变；[@ref-agy-configuration-changelog-refused-save] 更早的一次修复还记录了“遇到无法识别的设置值或语法错误就丢弃未解析配置”的行为。[@ref-agy-configuration-changelog-unparsed] 三是规则文件的格式是**严格**的：`rules/` 下的每个 `.md` 必须带合法 `trigger` 的 YAML frontmatter，缺 frontmatter 或 trigger 拼错（例如写成 camelCase 的 `alwaysOn`）会导致该规则被静默丢弃——迁移旧规则集时这是最容易误判成“配置没生效”的一类。[@ref-agy-configuration-rules-frontmatter] 插件则可以带顶层 `rules.json` 声明它随包的规则文件。[@ref-agy-configuration-changelog-rulesjson] 也存在只在新版本里出现、旧文档完全没有的键（例如控制 `/resume` 分组方式的 `pickerGrouping`），升级后如果发现某个键“文档里查不到”，先查 CHANGELOG 里该版本的条目。[@ref-agy-configuration-changelog-pickergrouping]

缺口：固定来源没有描述一套通用的配置键重命名/别名/弃用机制（没有键级迁移表、没有版本化的配置 schema 迁移说明），也没有说明旧格式设置文件是否会被自动重写。上面列出的都是按子系统分散写明的规则，因此把它们当作“逐项规则”用，不要当成统一策略。

## 诊断与重载 {#config-diagnostics}

查看与修改生效配置的第一入口是会话内的设置编辑器：输入 `/config`（别名 `/settings`）打开全屏设置覆盖层，用上下键移动、回车切换或打开文本输入、Esc 保存并关闭。[@ref-agy-configuration-settings-panel] 当某项正被命令行标志覆盖时，面板会在该项旁边显示警示文字，这是“为什么改了设置没生效”的第一条线索。[@ref-agy-configuration-settings-override-warning] 需要按子系统查看时，还有 `/permissions`（交互式权限管理面板）、`/hooks`、`/mcp`、`/skills`、`/agents`、`/plugins` 等命令。[@ref-agy-configuration-cli-ref-commands]

命令行本身也是诊断入口：`/help` 菜单里会给出一条 CLI 日志文件路径，便于排查启动期与配置解析期的问题。[@ref-agy-configuration-changelog-log-path] 保存被拒绝时不能只靠猜：CLI 会在状态行里点名出错的文件，且保留原文件逐字节不变以便手工修复。[@ref-agy-configuration-changelog-refused-save] 更早的版本在解析失败时会丢弃未解析配置，这个行为已被修复；如果你怀疑设置被吞掉，先确认版本。[@ref-agy-configuration-changelog-unparsed] 另一处持久化文件 `config.json` 曾因非原子写入被并发写者或崩溃截断，修法改成原子写。[@ref-agy-configuration-changelog-atomic]

各子系统的“已生效”证据分散在各自面板里：权限可以用 `/permissions` 看，hooks 用 `/hooks` 看，MCP 在 `/mcp` 里看连接状态并手动重载配置。批准一次操作时，交互提示允许把它固化成规则，选项里明确区分“仅本次对话”和“持久化到 settings.json”，这样你能确认一条规则究竟写进了哪里。[@ref-agy-configuration-sandbox-prompts] 权限更新还曾有过“`ask` 规则被丢弃”的缺陷并被修复，说明核对持久化结果（而不是只看当前会话行为）是必要的。[@ref-agy-configuration-changelog-ask-preserved]

重载行为按子系统而定：hooks 会在工作区变化时重新加载，这正是信任文件夹后 hooks 才生效的修复方式。[@ref-agy-configuration-changelog-hooks-trust] 设置文件没有文档化的热重载命令，交互式面板保存即生效，其余情况需要重启 CLI。headless 运行读取的是同一份持久化策略，因此排查脚本里的行为差异时不必假设它是另一套默认值。[@ref-agy-configuration-changelog-headless]

“文件已写但没有生效”的排查顺序可以按下面几步收敛：

1. 确认写对文件：全局配置根存在两套并存的路径（见 [@ref-agy-configuration-settings-path] 与 [@ref-agy-configuration-mcp-entry]），沙箱、权限等键在 `settings.json`，MCP、hooks、sidecar 启停在 `~/.gemini/config/` 下。
2. 确认没有被运行期覆盖：看 `/config` 面板是否显示 `overridden by command flag`，检查本次启动是否带了 `--sandbox`、`--model`、`--mode` 之类的标志。[@ref-agy-configuration-settings-override-warning]
3. 确认文件没被拒绝保存：看状态行是否点名了文件，若点名了就先修语法再重启。[@ref-agy-configuration-changelog-refused-save]
4. 对规则类配置，检查 frontmatter 与 `trigger` 是否合法，非法值会被静默丢弃。[@ref-agy-configuration-rules-frontmatter]
5. 检查环境是否满足前提：`modelProvider` 与 `GEMINI_API_KEY` 必须成对，PATH 里必须能找到 `agy`。[@ref-agy-configuration-trouble-path]
6. 仍不生效时，用 `/help` 给出的 CLI 日志路径查启动期报错。[@ref-agy-configuration-changelog-log-path]

要恢复键位默认值，删除键位配置文件即可；如果键位 JSON 语法错误或结构不合法，CLI 会只对这些动作回退到系统默认，并继续加载其余合法映射。[@ref-agy-configuration-settings-keybindings-format]

缺口：固定来源没有描述打印“合并后生效配置及其来源”的命令（没有类似 dump/explain 的入口），也没有文档化的配置热重载命令，因此第 1、2 步只能靠人肉比对文件、面板与启动标志。据此本问题记为 partial，需要在本机运行 `agy` 观察是否存在未公开的等效入口。
