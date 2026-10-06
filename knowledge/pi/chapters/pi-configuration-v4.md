---
schema_version: 3
record_kind: production
edition_id: pi-configuration-v4
harness_id: pi
topic: configuration
title: Pi 配置机制：文件作用域、项目信任与工具集合（固定源码 56b25ff）
sections:
  - section_id: config-files
    surface_ids: [cli]
    source_refs:
      - ref-pi-config-agent-dir
      - ref-pi-config-agent-instructions
      - ref-pi-config-project-dir
      - ref-pi-config-context-files
      - ref-pi-config-env-dotenv-files
      - ref-pi-config-binary-dotenv-autoload-off
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs:
      - ref-pi-config-default-tools
      - ref-pi-config-builtin-tool-names
      - ref-pi-config-codemode-mode
      - ref-pi-config-retry
      - ref-pi-config-cli-tools-modifiers
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs:
      - ref-pi-config-tool-merge
      - ref-pi-config-cli-tools-reload
      - ref-pi-config-cli-tools-modifiers
      - ref-pi-config-cli-tools-validation
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs:
      - ref-pi-config-trust-protected
      - ref-pi-config-trust-grant
      - ref-pi-config-trust-setting
      - ref-pi-config-trust-sessiondir
      - ref-pi-config-context-files
      - ref-pi-providers-auth-order
  - section_id: config-migration
    surface_ids: [cli]
    source_refs:
      - ref-pi-migrations-code-run
      - ref-pi-settings-migration
      - ref-pi-config-update-release-retention
      - ref-pi-config-update-release-prune
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-pi-config-resources
      - ref-pi-config-builtin-extensions
      - ref-pi-config-tool-merge
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-files
        status: partial
        source_refs:
          - ref-pi-config-agent-dir
          - ref-pi-config-project-dir
          - ref-pi-config-env-dotenv-files
          - ref-pi-config-binary-dotenv-autoload-off
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs:
          - ref-pi-config-tool-merge
          - ref-pi-config-cli-tools-reload
          - ref-pi-config-cli-tools-modifiers
          - ref-pi-config-cli-tools-validation
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs:
          - ref-pi-providers-auth-order
          - ref-pi-config-trust-sessiondir
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs:
          - ref-pi-config-trust-protected
          - ref-pi-config-trust-grant
          - ref-pi-config-trust-setting
          - ref-pi-config-trust-sessiondir
          - ref-pi-config-context-files
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs:
          - ref-pi-config-default-tools
          - ref-pi-config-builtin-tool-names
          - ref-pi-config-cli-tools-modifiers
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: partial
        source_refs:
          - ref-pi-migrations-code-run
          - ref-pi-settings-migration
          - ref-pi-config-update-release-retention
          - ref-pi-config-update-release-prune
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs:
          - ref-pi-config-resources
          - ref-pi-config-builtin-extensions
---
固定来源为 pi 仓库提交 56b25ff4 的 Pi coding agent 包（`packages/coding-agent/docs/settings.md`、`packages/coding-agent/src/cli/args.ts`、`packages/coding-agent/src/core/settings-manager.ts`、`packages/coding-agent/src/package-manager-cli.ts`、`scripts/build-binaries.sh`、`packages/coding-agent/CHANGELOG.md`）。相对 pi-configuration-v3 有四处结论被上游改写：`--tools` 多出第三种形态，`/reload` 与 `--tools` 的关系随之变化，独立二进制多了一组 dotenv 来源，`pi update` 的受管安装保留策略收紧。v3 中未被本章重写的小节按其原固定来源范围阅读。

新增事实集中在本提交的 `CHANGELOG` `[Unreleased]` 段与对应源码，属发布前状态；该提交上最后一个已发布版本是 1.0.4。本库未为 Pi 建立软件版本映射，按 source_only 阅读，不把这些结论外推到任何 npm 发行版。

## 配置文件与作用域 {#config-files}

配置分成 agent 目录与项目 `.pi` 两层。agent 目录的位置由 `PI_CODING_AGENT_DIR` 环境变量或 SDK 的 `agentDir` 选项决定。[@ref-pi-config-agent-dir] agent 目录承担全局设置、键绑定、MCP、可兼容端点与模型、凭据以及跨工作目录的用户指令与系统提示增补：

```text
{agent-dir}/settings.json      用户级设置，含偏好、默认值、资源路径、包声明
{agent-dir}/keybindings.json   终端 UI 与应用键绑定
{agent-dir}/mcp.json           所有项目通用的 MCP server
{agent-dir}/models.json        可兼容端点、模型与模型覆盖
{agent-dir}/auth.json          已保存的 API key 与 OAuth 凭据
{agent-dir}/SYSTEM.md          替换 Pi 默认系统提示
{agent-dir}/APPEND_SYSTEM.md   追加系统提示指令
```

[@ref-pi-config-agent-instructions] 项目层同样按文件分工：

```text
.pi/settings.json      项目设置、资源路径与包声明
.pi/mcp.json           项目 MCP server
.pi/extensions/        项目扩展
.pi/skills/            项目 skill 及配套文件
.pi/prompts/           以斜杠命令暴露的项目 prompt 模板
.pi/themes/            项目主题文件
```

[@ref-pi-config-project-dir] `SYSTEM.md` 与 `APPEND_SYSTEM.md` 在项目层同名文件优先于 agent 目录的对应文件，同名文件不做合并。[@ref-pi-config-project-dir]

上下文文件与项目 `.pi` 配置是两套机制：Pi 从 agent 目录、工作目录及其各级父目录加载上下文文件，同一目录内 `AGENTS.override.md` 替换 `AGENTS.md`／`CLAUDE.md`，但它不压制 agent 目录或其他目录的上下文文件；上下文文件的发现不需要项目信任。[@ref-pi-config-context-files]

独立二进制还有一组不属于 `.pi` 的来源：启动时从启动目录读 `.env`、`.env.local`、`.env.development`，把它们载入 Pi 的进程环境。[@ref-pi-config-env-dotenv-files] 构建侧有对应的反向改动——编译独立二进制时关掉 bun 的 cwd dotenv 自动加载，理由写明是避免项目环境文件泄漏进 Pi 的环境。[@ref-pi-config-binary-dotenv-autoload-off] 两条证据合起来确定的是"读哪个目录、读哪三个文件"，没有确定的事有三项：三个文件之间的优先级、与进程既有环境变量谁覆盖谁、以及 npm 安装的 CLI 是否同样加载（本轮只在独立二进制上取证）。`docs/environment-variables.md` 只区分进程标记、shell 工具会话环境与 provider 凭据三类用途，未记载 dotenv 文件，因此本问题按 `partial` 记录。

## 默认值与工具集合 {#config-defaults}

`defaultTools` 默认是 `read`、`bash`、`edit`、`write`：纯名称替换默认集合，`+name` 增工具、`-name` 减工具，空数组关掉全部内置工具（不影响扩展或 SDK 工具）。[@ref-pi-config-default-tools] 可选的内置工具比默认集合大：`read`、`bash`、`powershell`、`edit`、`write`、`grep`、`find`、`ls`；`defaultTools` 还能写 `codemode` 与 `tool_search`（内置扩展以未激活方式注册）以及其它以未激活方式注册的扩展工具。[@ref-pi-config-builtin-tool-names] 相对 v2 只记 `read`、`bash`、`edit`、`write` 的写法，可用工具集已扩到八个。

这套增减记法现在也用在命令行上：`--tools` 只给 `+name`／`-name` 时改的是已解析出的默认选择，`--tools +codemode` 在默认四个之外加一个 `codemode`，而不是把默认集合换成单项。[@ref-pi-config-cli-tools-modifiers]

`codemode.mode` 取 `"on"` 或 `"only"`：前者给已声明工具在描述后追加“从脚本调用”的说明、且 `codemode` 只列未声明工具；后者让 `codemode` 列出脚本可调用的全部工具，并把激活中的内置与扩展工具对模型隐藏。[@ref-pi-config-codemode-mode]

重试有独立一组默认值：`retry.enabled` 为 `true`、`maxRetries` 为 `3`、`baseDelayMs` 为 `2000`、`maxAgentDelayMs` 为 `60000`；provider 侧 `retry.provider.timeoutMs` 默认取 `httpIdleTimeoutMs`，`maxRetries` 默认 `0`，`maxRetryDelayMs` 默认 `60000` 且设为 `0` 表示不设上限。[@ref-pi-config-retry] 文档同时提醒：`retry.provider.maxRetries` 保持 `0`，除非确实需要 provider 层重试，因为 provider 重试会拖慢 Pi 自己处理配额与用量上限错误。

## 覆盖与合并 {#config-overrides}

工具集合的合并规则有精确说明：项目设置叠加在用户设置之上，项目列表只含 `+name`／`-name` 时是对用户选择做增减，项目列表含纯名称时整体替换；同一列表内纯名称先构成选择，随后 `+name`、`-name` 按序生效。[@ref-pi-config-tool-merge] 例如把 `bash` 换成 `powershell` 并启用 `grep`，写成：

```json
{ "defaultTools": ["-bash", "+powershell", "+grep"] }
```

`--tools` 在命令行上不再是单一动作，v3 那句"`--tools`、`--no-tools`、`--no-builtin-tools` 覆盖 `defaultTools`"只对其中一支成立。[@ref-pi-config-cli-tools-reload]

```text
pi --tools read,grep            纯名称 allowlist，整体替换 defaultTools，与 --no-tools、
                                --no-builtin-tools 同属覆盖，/reload 时同样生效
pi --tools +codemode            只含 +name/-name，改默认选择而非替换；/reload 时作用于
                                重载后的设置，用 -name 关掉的工具不会因 reload 回来
pi --tools read,+grep           报错：纯名称不能与 +name/-name 混写
pi --tools +tools*             报错：+name/-name 只接受精确工具名，不接受 *
```

[@ref-pi-config-cli-tools-modifiers] 两条互斥性规则由 `getToolListError` 判定：列表里只要出现一个 `+name`／`-name`，其余条目就必须是同类记法；这些记法里带 `*` 同样被拒。[@ref-pi-config-cli-tools-validation] 其余嵌套键的逐键合并语义本固定来源仍未逐键说明，仍是缺口。

## 运行时与项目信任 {#config-runtime}

凭据优先级已变：运行时 `--api-key` 优先，其次 `auth.json` 中已存凭据，再次是 `models.json` 里的 `apiKey`，最后才是 provider 环境变量或环境中的云凭据；provider 扩展可自定义鉴权行为。[@ref-pi-providers-auth-order] v2 把环境变量排在 `models.json` 之前，该顺序不再成立。

核心现在有项目信任。发现工作目录下的下列资源时，Pi 要求一次信任决定：`.pi/settings.json`、`.pi/mcp.json`、`.pi/extensions`、`.pi/skills`、`.pi/prompts`、`.pi/themes`、`.pi/SYSTEM.md`、`.pi/APPEND_SYSTEM.md`，以及当前目录或祖先目录下的项目 `.agents/skills`；空的 `.pi` 目录不触发信任。[@ref-pi-config-trust-protected] 授予信任后 Pi 才会加载项目设置、项目 MCP、`.pi` 下的扩展／skill／prompt 模板／主题／系统提示文件、项目设置里声明但缺失的包，以及项目级与项目包的扩展；拒绝信任则跳过这些受保护资源。[@ref-pi-config-trust-grant]

两处边界要说清。其一，`AGENTS.override.md`、`AGENTS.md`、`CLAUDE.md` 这类上下文文件不受信任阻断（除非你关掉上下文加载），所以拒绝信任后仍应把目录里的指令当作不可信输入。[@ref-pi-config-trust-grant] 上下文文件本身不要求项目信任。[@ref-pi-config-context-files] 其二，项目信任不是完整启动边界：Pi 在选择或创建会话时就已经读过项目的 `sessionDir` 设置，这一步早于信任判定，拒绝信任也无法撤销。[@ref-pi-config-trust-sessiondir]

兜底行为由 `defaultProjectTrust` 控制，取 `"ask"`（默认）、`"always"`、`"never"`，且只能写在 agent 目录的设置里。[@ref-pi-config-trust-setting] 项目信任不限制工具调用的权限，工具仍以 Pi 进程的系统权限运行。[@ref-pi-config-trust-protected]

## 键迁移 {#config-migration}

启动时依次执行：凭据迁移（`oauth.json` 与 `settings.json` 的 `apiKeys` 合入 `auth.json`）、会话文件迁移（从 agent 根目录的 `*.jsonl` 迁到 `sessions/<编码后的 cwd>/`）、受管二进制迁移（`tools/` 下的 `fd`、`rg` 迁到 `bin/`）、键绑定配置迁移，以及扩展系统迁移（`commands/` 改名为 `prompts/`，并对已废弃的 `hooks/`、`tools/` 目录给出告警）。[@ref-pi-migrations-code-run] 相对 v2 只记了键重命名与凭据迁移，当前固定来源的迁移集合更大。v2 记录的设置键重命名（`queueMode`→`steeringMode`、旧 websockets 布尔→`transport` 枚举、旧 skills 对象→数组）来自上一固定来源，本章未在新提交上逐键复核，仍按 v2 范围阅读。[@ref-pi-settings-migration]

受管安装自身的保留策略也变了。`pi update` 不再把全部旧版本留在盘上，只保留新版本与被升级的那一版。[@ref-pi-config-update-release-retention] 实现是激活新版本后调用 `pruneManagedReleases`：遍历 `releases/`，跳过激活版本、当前运行版本（`VERSION`）以及不匹配版本号正则的目录，其余递归删除；删除失败被吞掉，注释写明文件可能仍被占用（Windows 上已加载的原生模块），下次更新再试。[@ref-pi-config-update-release-prune] 这条只覆盖受管安装路径，本固定来源没有说明 npm 安装或 Nix 安装是否有对应清理。缺口仍在：本固定来源未公布迁移的弃用时间表与回滚方式。

## 诊断与重载 {#config-diagnostics}

资源数组 `packages`、`extensions`、`skills`、`prompts`、`themes` 默认空，`enableSkillCommands` 默认 `true`（即把 skill 注册成 `/skill:name` 命令）；数组支持 `!pattern` 排除、`+path` 精确包含、`-path` 精确排除，且用户级与项目设置里列出的资源都会加载。[@ref-pi-config-resources]

内置扩展有固定名字：`builtin:mcp`、`builtin:llama.cpp`、`builtin:codemode`、`builtin:tool-search` 默认加载，`-builtin:mcp` 可停用单个，项目设置里的 `+builtin:NAME`／`-builtin:NAME` 覆盖用户设置，`pi config` 在 Built-in 分组下列出它们，`--no-extensions` 一并关掉，`-e builtin:NAME` 可显式加载。[@ref-pi-config-builtin-extensions] 排查"文件改了没生效"时，除了 `/reload` 的工具集合语义（见覆盖一节），仍缺少打印某键最终生效值与来源的命令。