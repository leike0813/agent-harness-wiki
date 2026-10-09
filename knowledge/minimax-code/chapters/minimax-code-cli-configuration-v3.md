---
schema_version: 3
record_kind: production
edition_id: minimax-code-cli-configuration-v3
harness_id: minimax-code
topic: configuration
title: "MiniMax Code CLI 的配置机制：数据目录、优先级、默认值、提示词覆盖、迁移与诊断"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-minimax-code-doc-config-layers, ref-minimax-code-config-path, ref-minimax-code-config-brand, ref-minimax-code-config-datadir-paths, ref-minimax-code-config-datadir-primary, ref-minimax-code-config-datadir-precedence, ref-minimax-code-config-env, ref-minimax-code-config-tui-datadir, ref-minimax-code-doc-data-dir, ref-minimax-code-install-accounts, ref-minimax-code-doc-sec-workspace, ref-minimax-code-doc-runtime-settings, ref-minimax-code-doc-faq-data]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-minimax-code-config-merge, ref-minimax-code-config-defaults, ref-minimax-code-config-tui-null, ref-minimax-code-config-sandbox-strict, ref-minimax-code-config-sandbox-network, ref-minimax-code-config-perm-default, ref-minimax-code-config-byok-migrate, ref-minimax-code-config-update-api]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-minimax-code-config-flags, ref-minimax-code-config-profile, ref-minimax-code-config-datadir-precedence, ref-minimax-code-doc-ref-entry, ref-minimax-code-config-prompt-flags, ref-minimax-code-config-prompt-inherit, ref-minimax-code-config-prompt-reject, ref-minimax-code-config-prompt-resolve]
  - section_id: config-prompt-overrides
    surface_ids: [cli]
    source_refs: [ref-minimax-code-config-prompt-flags, ref-minimax-code-config-prompt-inherit, ref-minimax-code-config-prompt-reject, ref-minimax-code-config-prompt-resolve, ref-minimax-code-config-prompt-surfaces, ref-minimax-code-config-prompt-assembly, ref-minimax-code-config-prompt-composition, ref-minimax-code-config-prompt-doc]
  - section_id: config-trust-defaults
    surface_ids: [cli]
    source_refs: [ref-minimax-code-config-fs-permission, ref-minimax-code-providers-managed-override, ref-minimax-code-config-defaults, ref-minimax-code-config-presets, ref-minimax-code-config-preset-default-model, ref-minimax-code-config-sandbox-defaults, ref-minimax-code-config-beta, ref-minimax-code-doc-sec-baseline]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-minimax-code-config-migrate, ref-minimax-code-config-compat-link, ref-minimax-code-config-byok-migrate, ref-minimax-code-config-asr-retired, ref-minimax-code-config-skills-alias, ref-minimax-code-doc-faq-data]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-minimax-code-config-inspect, ref-minimax-code-config-doctor-runtime, ref-minimax-code-config-telemetry, ref-minimax-code-config-reload, ref-minimax-code-doc-config-checks, ref-minimax-code-config-prompt-resolve]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-minimax-code-config-path, ref-minimax-code-config-brand, ref-minimax-code-config-datadir-paths, ref-minimax-code-config-datadir-primary, ref-minimax-code-config-datadir-precedence, ref-minimax-code-config-env, ref-minimax-code-config-tui-datadir, ref-minimax-code-doc-data-dir, ref-minimax-code-install-accounts, ref-minimax-code-doc-sec-workspace, ref-minimax-code-doc-runtime-settings, ref-minimax-code-doc-faq-data]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-minimax-code-config-merge, ref-minimax-code-config-defaults, ref-minimax-code-config-tui-null, ref-minimax-code-config-sandbox-strict, ref-minimax-code-config-sandbox-network, ref-minimax-code-config-perm-default, ref-minimax-code-config-byok-migrate, ref-minimax-code-config-update-api]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-minimax-code-config-flags, ref-minimax-code-config-profile, ref-minimax-code-config-datadir-precedence, ref-minimax-code-doc-ref-entry, ref-minimax-code-config-prompt-flags, ref-minimax-code-config-prompt-inherit, ref-minimax-code-config-prompt-reject, ref-minimax-code-config-prompt-resolve]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust-defaults
        status: answered
        source_refs: [ref-minimax-code-config-fs-permission, ref-minimax-code-providers-managed-override, ref-minimax-code-config-defaults, ref-minimax-code-config-presets, ref-minimax-code-config-preset-default-model, ref-minimax-code-config-sandbox-defaults, ref-minimax-code-config-beta, ref-minimax-code-doc-sec-baseline]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-trust-defaults
        status: answered
        source_refs: [ref-minimax-code-config-fs-permission, ref-minimax-code-providers-managed-override, ref-minimax-code-config-defaults, ref-minimax-code-config-presets, ref-minimax-code-config-preset-default-model, ref-minimax-code-config-sandbox-defaults, ref-minimax-code-config-beta, ref-minimax-code-doc-sec-baseline]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: answered
        source_refs: [ref-minimax-code-config-migrate, ref-minimax-code-config-compat-link, ref-minimax-code-config-byok-migrate, ref-minimax-code-config-asr-retired, ref-minimax-code-config-skills-alias, ref-minimax-code-doc-faq-data]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-minimax-code-config-inspect, ref-minimax-code-config-doctor-runtime, ref-minimax-code-config-telemetry, ref-minimax-code-config-reload, ref-minimax-code-doc-config-checks, ref-minimax-code-config-prompt-resolve]
---

MiniMax Code CLI（命令 `mcode`）的配置模型只有一个事实源文件：启动时选定的**数据目录**里的 `config.yaml`。没有用户级与项目级配置文件的叠加合并，也没有组织策略文件；作用域差异全部体现在「选哪个数据目录」上，项目目录只贡献技能、命令与 `AGENTS.md` 这类工作区资产。本章固定来源是 `MiniMax-AI/MiniMax-Code` 仓库 commit `c8a39a5`（0.5.9 发布提交）上的 `packages/config/src`、`packages/tui/src/cli`、`packages/local-runtime-v2` 与 `docs/installation.md`，以及官方 CLI 文档 `agent.minimax.io/docs/cli/configuration`、`/reference`、`/security`、`/faq` 的快照。官方文档描述的是已发布 CLI 的行为，仓库快照是同一产品的源码引用；两者版本身份都未逐项核对，记录保持来源级适用性。

本版新增的内容来自仓库 commit `8348311`（2026-10-08 观察）：该提交引入了**启动期主 Agent 提示词覆盖**这一新的配置入口，作用在提示词装配层而不是 `config.yaml`。其源码定位见 [@ref-minimax-code-config-prompt-flags] [@ref-minimax-code-config-prompt-assembly]，仓库文档描述见 [@ref-minimax-code-config-prompt-doc]。

## 配置入口与数据目录 {#config-sources}

宿主只读一个配置文件，路径由数据目录决定：`getConfigPath()` 直接返回 `<数据目录>/config.yaml` [@ref-minimax-code-config-path]，数据目录基名常量是 `.minimax`，环境变量前缀是 `minimax` [@ref-minimax-code-config-brand]。官方文档把配置入口按 Layer、Entry point、Scope 三列列出 [@ref-minimax-code-doc-config-layers]，下面的实现细节说明这些层最终如何落到同一个数据目录上。

| 入口 | 取值 | 作用域 |
| --- | --- | --- |
| 数据目录 | 默认 `~/.minimax`；选中 profile 时为 `~/.minimax-PROFILE` | 决定唯一配置文件与全部运行时数据 |
| 配置文件 | `<数据目录>/config.yaml` | 默认模型、权限模式、MiniMax 凭据来源等运行时设置 |
| 环境变量覆盖 | `MINIMAX_DATA_DIR`，回退 `MAVIS_DATA_DIR` | 覆盖数据目录本身 |
| CLI 参数 | `--data-dir`、`--profile`、`--port`、`--disable-git-auto-config`、`--managed`，以及启动期提示词覆盖 `--system-prompt*`、`--append-system-prompt*` | 仅本次进程 |
| 项目规则 | 工作区里的 `AGENTS.md` | 项目约定与验证方式，不是配置键 |

- 数据目录由 `resolveDataDir()` 解析；主目录路径为 home 目录下的 `.minimax[-PROFILE]`，历史目录为 home 目录下的 `.mavis[-PROFILE]` [@ref-minimax-code-config-datadir-paths] [@ref-minimax-code-config-datadir-primary]。
- 选择顺序（源码注释即规范）：显式 profile 作用域数据目录 → git 自动识别（仅限 `agent-archon`/`mavis` 远端，且 npm 构建禁用）→ `MINIMAX_DATA_DIR`/`MAVIS_DATA_DIR` → profile 环境变量 → 默认值 [@ref-minimax-code-config-datadir-precedence]。
- 公开覆盖只认 `MINIMAX_DATA_DIR`，其次 `MAVIS_DATA_DIR` [@ref-minimax-code-config-env]；TUI 包装层同样先取 `MINIMAX_DATA_DIR`，再退回 profile 默认目录，并把解析结果写回子进程环境 [@ref-minimax-code-config-tui-datadir]。
- 官方文档给出同样结论：默认数据根 `~/.minimax`，配置为 `<数据目录>/config.yaml`，`MINIMAX_DATA_DIR` 优先于 `MAVIS_DATA_DIR`，官方还明确 `AGENTS.md` 是「项目规则」而非运行时配置 [@ref-minimax-code-doc-data-dir] [@ref-minimax-code-install-accounts]。
- 数据目录按用途区分：远程主机、共享机器与 CI runner 应使用独立数据目录，避免共享会话、日志与 provider 配置 [@ref-minimax-code-doc-sec-workspace]。

```yaml
# 依据官方 CLI 文档的「Data directory, configuration, and proxy」小节与「Runtime settings」表
defaultModel: "minimax/MiniMax-M3"
defaultModelVariant: standard
permissionMode: auto
minimaxModelSource: token_plan
```

把上述键写进当前数据目录的 `config.yaml` 即生效；`defaultModel` 用 `provider/model` 形式并可带 `#variant`，`permissionMode` 接受 `default`、`auto`、`bypassPermissions`、`off`，`mcode exec --model` 只覆盖当次运行 [@ref-minimax-code-doc-runtime-settings] [@ref-minimax-code-doc-faq-data]。

## 优先级、合并与解析例外 {#config-overrides}

因为只有一个配置文件，所谓「作用域优先级」实际是**选择哪个文件**；文件内部按顶层键逐项解析，缺省回落到 `DEFAULTS` [@ref-minimax-code-config-merge] [@ref-minimax-code-config-defaults]。

- 对象通常是逐字段与默认值合并，而非整体替换；数组整体替换（例如状态栏项列表）；`null` 一般视为「未设置」而回落到默认，而不是删除标记 [@ref-minimax-code-config-merge]。
- 例外：`tui.terminalTitle` 显式写 `null` 或空数组表示关闭标题更新，此时 `null` 有语义 [@ref-minimax-code-config-tui-null]。
- 解析期会**拒绝**的情况：`sandbox:` 块内的未知键直接抛错（`Unknown sandbox.KEY`），非法的 `filesystem.policy.mode` 也抛错——沙箱块是严格校验的 [@ref-minimax-code-config-sandbox-strict]。
- 会被**静默归一化**的情况：旧式 `sandbox.network` 的拒绝名单可读入但被归一为允许全部，因此写进去的网络限制不再生效 [@ref-minimax-code-config-sandbox-network]；`classifierTimeoutMs` 低于 5000 时回落为 60000 默认值 [@ref-minimax-code-config-perm-default]。
- 只有 BYOK 迁移会写「删除标记」：`custom_provider` 子树在迁移后被显式删除并记录 `migrations.byok_legacy_provider_to_custom_provider_v1` [@ref-minimax-code-config-byok-migrate]。
- 运行时/界面写配置走的是**加锁的读改写**，不是深度合并：写入受可变字段白名单约束，成功后调用 `resetConfig()` 清缓存 [@ref-minimax-code-config-update-api]。
- 提示词覆盖不属于这一层：它不写 `config.yaml`，也不参与 `DEFAULTS` 合并，机制见 {#config-prompt-overrides}。

## 环境变量、CLI 参数与 profile {#config-runtime}

参数与变量只影响**选文件**（数据目录）以及区域/构建环境，不会逐键覆盖 `config.yaml`；新引入的启动期提示词参数是唯一的例外分支，同样不落盘。

- 直接解析 `process.argv` 的开关有 `--data-dir`、`--profile`、`--port`、`--disable-git-auto-config`、`--managed`；其中只有 `--env`（取值 test/staging/pre/prod） 是声明式公开选项 [@ref-minimax-code-config-flags]。
- profile 由显式 `--profile`，否则由 git 分支推导；profile 改变数据目录基名 [@ref-minimax-code-config-profile]。
- 一旦设置了 `--data-dir` 或公开的数据目录环境变量，git 自动识别即被抑制 [@ref-minimax-code-config-datadir-precedence]。
- 命令行入口文档列出的是 `mcode [options] [prompt]` 与 `--session`/`--continue`/`--tui-mode` 等会话选项，未把配置写入作为全局选项暴露 [@ref-minimax-code-doc-ref-entry]。
- 区域与构建环境变量（`MAVIS_REGION`、`MAVIS_BUILD_ENV`）在解析时选择默认 provider 预设与 beta 通道，而不是改写配置文件内容 [@ref-minimax-code-config-datadir-precedence]。
- commit `8348311` 起另有四个**声明式公开选项**：`--system-prompt`、`--system-prompt-file`、`--append-system-prompt`、`--append-system-prompt-file` [@ref-minimax-code-config-prompt-flags]。它们不解析 `process.argv` 的裸扫描，而是由 commander 的 option 解析，并且只影响提示词装配，见 {#config-prompt-overrides}。
- 这组参数可以写在子命令之前，由 `inheritSystemPromptOptions()` 沿 parent 链按槽位向上继承 [@ref-minimax-code-config-prompt-inherit]；写给不接受它们的子命令（如 `login`、`init`）则直接报错终止启动 [@ref-minimax-code-config-prompt-reject]；文件在启动期一次性读取，失败即终止 [@ref-minimax-code-config-prompt-resolve]。

## 启动期主 Agent 提示词覆盖 {#config-prompt-overrides}

这是仓库 commit `8348311` 引入的**第三类配置入口**：不改数据目录、不改 `config.yaml`，只在本次进程内替换或扩展主 Agent 的身份提示词。

### 适用界面

四个入口接受这组参数：交互式 TUI、`mcode exec`、`mcode exec review` 与 `mcode acp`。交互式启动请求上直接携带 `systemPromptOverrides` 字段，raw 选项类型继承提示词参数 [@ref-minimax-code-config-prompt-surfaces]。官方仓库文档给出同样界面范围：交互式 TUI、`exec`、`exec review`、`mcode acp` [@ref-minimax-code-config-prompt-doc]。

### 两个槽位，四种写法

替换与追加是**互相独立的两个槽位**，每个槽位有「内联文本」与「文件」两种形式 [@ref-minimax-code-config-prompt-flags]：

| 槽位 | 内联 | 文件 | 效果 |
| --- | --- | --- | --- |
| 替换 | `--system-prompt "text"` | `--system-prompt-file path` | 顶替主 Agent 身份提示词 |
| 追加 | `--append-system-prompt "text"` | `--append-system-prompt-file path` | 紧随身份提示词之后追加文本 |

两个槽位可同时给出。源码注释明确「inline text and file are two forms of one slot」，因此同一槽位内内联与文件是**二选一**，不是叠加。

### 解析与优先级

- 参数可以写在子命令之前：`inheritSystemPromptOptions()` 沿 parent 链向上查找，在**命令行上最近给出该槽位的那一层**整体生效——子命令侧给出的槽位整体胜出，包括覆盖父级同槽位的另一种写法，而不是与之冲突 [@ref-minimax-code-config-prompt-inherit]。
- 不接受这些参数的子命令（如 `login`、`init`）会**报错终止启动**，而不是被父命令解析后静默忽略 [@ref-minimax-code-config-prompt-reject]。
- 文件在启动时一次性读取，相对当前工作目录解析；缺失、不可读或空文件会使启动失败，不会以「未打补丁的提示词」继续运行 [@ref-minimax-code-config-prompt-resolve]。同一槽位同时给内联与文件、或内联为空字符串，同样抛错终止。

### 生效范围与装配位置

- 覆盖值只存在于进程内存：配置构建器把它标注为「Applied to every surface except hidden task children; never persisted」 [@ref-minimax-code-config-prompt-assembly]，仓库文档同样说明覆盖不会写入 Session 或配置 [@ref-minimax-code-config-prompt-doc]。
- 装配点在本地 Agent 配置构建器：替换槽位非空时，身份段整体换成覆盖文本（仍叠加运行时规则与会话提示）；追加文本作为**独立片段**插在身份段之后、instructions 前导语与全局/项目指令之前 [@ref-minimax-code-config-prompt-composition]。替换不会删掉 instructions、Environment、Memory、Skills 这些后续块。
- 任务子 Agent（task child）保留打包提示词，覆盖只作用于启动它的那个交互界面 [@ref-minimax-code-config-prompt-assembly] [@ref-minimax-code-config-prompt-doc]。
- 登录后重启会保留原始参数，因此覆盖在重启后仍然生效 [@ref-minimax-code-config-prompt-doc]。

### 版本边界

这些证据全部来自仓库 commit `8348311` 的源码与仓库内文档 `docs/tui-capabilities.md`，官方站点 `agent.minimax.io/docs/cli/*` 快照本轮内容未变（unchanged），因此**不能**据此断言任何已发布 npm 版本的 CLI 暴露该参数；本章对此保持来源级知识，不建软件版本映射。

## 信任、托管策略与默认值 {#config-trust-defaults}

- **没有项目信任弹窗**：源码中不存在工作区信任状态机；项目目录的资产（技能、命令、`AGENTS.md`）按各自机制加载，不由配置文件门控。
- 配置与数据的保护是**文件级**的：权限层把数据目录与 `~/.minimax` 下的读取视为受保护运行时读取，只有 `skills` 等白名单资产可读 [@ref-minimax-code-config-fs-permission]。
- 组织策略通过**托管运行时在读取时注入**表达，且从不落盘：托管构建每次读取都会恢复可用的 `provider.minimax`，受保护构建还会把 `baseURL` 与 `authMode` 强制回预设 [@ref-minimax-code-providers-managed-override]。
- 默认值集中在 `DEFAULTS`（日志级别 `info`、权限模式 `auto`、遥测关闭、review 使用 `subagent`、runaway guard 开启等）；区域×构建环境的 provider 预设给出默认模型与 `managed-login` 认证模式 [@ref-minimax-code-config-defaults] [@ref-minimax-code-config-presets]。
- 预设的默认模型是**写死的具体模型 ID**，当前为 `minimax/MiniMax-M3.1-Flash-Preview`（此前为 `minimax/MiniMax-M3`）。它随宿主版本变化，不是一个稳定的「默认模型族」承诺；要固定行为就在 `config.yaml` 里显式写 `defaultModel` [@ref-minimax-code-config-preset-default-model]。
- 沙箱默认值在**所有平台**都是 `{ enabled: false, filesystemMode: 'full_access' }`，平台参数被保留但不再产生差异 [@ref-minimax-code-config-sandbox-defaults]。
- 功能开关走 `beta:` 块，按可见性、构建与平台解析；用户在 `config.yaml` 里改对应键即可改变默认 [@ref-minimax-code-config-beta]。
- 提示词覆盖**不是**默认值的一种：它没有对应的 `config.yaml` 默认键，只能通过命令行参数给出，且不持久化 [@ref-minimax-code-config-prompt-assembly]。
- 安全基线建议在陌生仓库先跑 `mcode init .` 并审阅 `AGENTS.md`，CI 场景显式设置 `--cwd`、`--timeout`、`--max-steps` [@ref-minimax-code-doc-sec-baseline]。

## 配置迁移与旧格式 {#config-migration}

- 数据目录迁移：历史 `~/.mavis` 会被迁入 `~/.minimax`，真实历史目录先备份，再留下兼容符号链接 `~/.mavis → ~/.minimax` [@ref-minimax-code-config-migrate] [@ref-minimax-code-config-compat-link]。
- provider 迁移：托管运行时把旧式手写 `provider.某个键` BYOK 条目迁移到 `custom_provider`，先写备份 `config.yaml.bak.byok-legacy-provider.时间戳.随机标识` [@ref-minimax-code-config-byok-migrate]。
- 弃用键：旧 `asr.seed.*` 被忽略并给出警告，提示从 `config.yaml` 删除 [@ref-minimax-code-config-asr-retired]。
- 重命名别名：技能外部来源类型 `user-claude`→`user-cc`、`workspace-claude`→`workspace-cc` 仍可读 [@ref-minimax-code-config-skills-alias]。
- 官方 FAQ 复述了同样的定位方式（默认 `~/.minimax`、`config.yaml`、`MINIMAX_DATA_DIR` 优先）与运行时可写字段样例 [@ref-minimax-code-doc-faq-data]。
- 不存在 `mcode migrate` 命令；迁移在启动解析阶段隐式完成。
- 提示词覆盖不参与任何迁移：它没有落盘形态，因此也不存在从 `config.yaml` 迁移而来的路径 [@ref-minimax-code-config-prompt-assembly]。

## 诊断与生效时机 {#config-diagnostics}

- `/doctor` 在 TUI 内做**只读**配置检查，报告状态、路径、文件是否存在、默认模型与 provider，并给出下一步；配置有问题时提示「在修复并重启前 MCode 可能继续使用内置默认值」 [@ref-minimax-code-config-inspect]。
- 运行时侧的 `validateRuntimeConfigFile()` 区分文件缺失、不可读、YAML 非法（带行列）、根不是对象、`defaultModel` 格式不符与模型不可用等情况 [@ref-minimax-code-config-doctor-runtime]。
- 不泄露密钥的定位入口：`mcode telemetry status` 输出 `configFile: <路径>` [@ref-minimax-code-config-telemetry]。
- 重载：`/reload` 只重载 TUI 配置与插件，且仅在空闲时可用；其余配置改动需要重启进程 [@ref-minimax-code-config-reload]。
- 提示词覆盖没有诊断面：它既不出现在 `/doctor`，也不写入配置文件，唯一的失败信号是**启动期报错**——文件缺失、不可读或为空时启动直接失败 [@ref-minimax-code-config-prompt-resolve]。
- 官方文档把检查入口汇总为 `mcode --version`、`mcode provider list --json`、`mcode plugin list --json` 与 TUI 内 `/doctor`、`/status`、`/model` [@ref-minimax-code-doc-config-checks]。
- 常见「文件写了却没生效」的原因：直接改文件后缓存未清（API 写入路径会调用 `resetConfig()`）；托管运行时每次读取回写受保护 provider 字段；`sandbox.network` 被归一化；旧 ASR 键被丢弃。