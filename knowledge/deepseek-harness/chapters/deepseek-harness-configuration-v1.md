---
schema_version: 3
record_kind: production
edition_id: deepseek-harness-configuration-v1
harness_id: deepseek-harness
topic: configuration
title: "DeepSeek Harness 的配置：Harness home、层优先级、运行时输入与排障"
sections:
  - section_id: config-homes
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-configuration-config-sources-e02, ref-dsh-configuration-config-sources-e03, ref-dsh-configuration-config-sources-e04, ref-dsh-configuration-config-sources-e05, ref-dsh-sdk-minimal-standalone]
  - section_id: config-layers
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-configuration-config-sources-e01, ref-dsh-configuration-config-overrides-e02, ref-dsh-configuration-config-overrides-e03, ref-dsh-configuration-config-overrides-e04, ref-dsh-configuration-config-overrides-e05]
  - section_id: config-runtime-inputs
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-configuration-config-runtime-e01, ref-dsh-configuration-config-runtime-e02, ref-dsh-configuration-config-runtime-e04, ref-dsh-configuration-config-runtime-e05]
  - section_id: config-trust-limits
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-configuration-config-trust-e01, ref-dsh-configuration-config-trust-e03, ref-dsh-configuration-config-trust-e04, ref-dsh-configuration-config-trust-e05, ref-dsh-configuration-config-trust-e06]
  - section_id: config-defaults
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-configuration-config-defaults-e01, ref-dsh-configuration-config-defaults-e02, ref-dsh-configuration-config-defaults-e03, ref-dsh-configuration-config-defaults-e04]
  - section_id: config-migration
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-configuration-config-migration-e01, ref-dsh-configuration-config-migration-e02, ref-dsh-configuration-config-migration-e03, ref-dsh-base-bundle-settings-row, ref-dsh-sdk-minimal-standalone]
  - section_id: config-diagnostics
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-configuration-config-diagnostics-e01, ref-dsh-configuration-config-diagnostics-e02, ref-dsh-configuration-config-diagnostics-e03, ref-dsh-configuration-config-diagnostics-e04, ref-dsh-configuration-config-diagnostics-e05, ref-dsh-configuration-config-diagnostics-e06, ref-dsh-configuration-config-diagnostics-e07, ref-dsh-configuration-config-diagnostics-e08]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: config-homes
        status: answered
        source_refs: [ref-dsh-configuration-config-sources-e02, ref-dsh-configuration-config-sources-e03, ref-dsh-configuration-config-sources-e04, ref-dsh-configuration-config-sources-e05]
  - question_id: config.overrides
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: config-layers
        status: answered
        source_refs: [ref-dsh-configuration-config-sources-e01, ref-dsh-configuration-config-overrides-e02, ref-dsh-configuration-config-overrides-e03, ref-dsh-configuration-config-overrides-e04, ref-dsh-configuration-config-overrides-e05]
  - question_id: config.runtime
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: config-runtime-inputs
        status: answered
        source_refs: [ref-dsh-configuration-config-runtime-e01, ref-dsh-configuration-config-runtime-e02, ref-dsh-configuration-config-runtime-e04, ref-dsh-configuration-config-runtime-e05]
  - question_id: config.trust
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: config-trust-limits
        status: answered
        source_refs: [ref-dsh-configuration-config-trust-e01, ref-dsh-configuration-config-trust-e03, ref-dsh-configuration-config-trust-e04, ref-dsh-configuration-config-trust-e05, ref-dsh-configuration-config-trust-e06]
  - question_id: config.defaults
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: config-defaults
        status: answered
        source_refs: [ref-dsh-configuration-config-defaults-e01, ref-dsh-configuration-config-defaults-e02, ref-dsh-configuration-config-defaults-e03, ref-dsh-configuration-config-defaults-e04]
  - question_id: config.migration
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk]
        section_id: config-migration
        status: partial
        source_refs: [ref-dsh-configuration-config-migration-e01, ref-dsh-configuration-config-migration-e02, ref-dsh-configuration-config-migration-e03]
      - surface_ids: [sdk-minimal]
        section_id: config-migration
        status: not_applicable
        source_refs: [ref-dsh-base-bundle-settings-row, ref-dsh-sdk-minimal-standalone]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-dsh-configuration-config-diagnostics-e01, ref-dsh-configuration-config-diagnostics-e02, ref-dsh-configuration-config-diagnostics-e03, ref-dsh-configuration-config-diagnostics-e04, ref-dsh-configuration-config-diagnostics-e05, ref-dsh-configuration-config-diagnostics-e06, ref-dsh-configuration-config-diagnostics-e07, ref-dsh-configuration-config-diagnostics-e08]
---

## 配置从哪里读起 {#config-homes}

全部配置挂在唯一一个 **Harness home** 之下。`resolveDshHome()` 的优先级是*显式配置的路径 > `$DSH_HOME` > `~/.dsh`*，空白的 `$DSH_HOME` 当作未设置，然后做波浪号展开并转绝对路径；默认目录名是常量 `DSH_HOME_DIR_NAME = '.dsh'`[@ref-dsh-configuration-config-sources-e02]。home 之下是 `profiles/` 子目录，一个 profile 目录是 `$DSH_HOME/profiles/{name}`。

每个 profile 目录里放三样东西：`package.json`（树外插件依赖加 `dsh.profile.bundles` 有序列表）、一份内容为空条目列表的根 `cordis.yml`（文件里自带注释「编辑 cordis.patch.yml，不要编辑本文件」），以及用户 patch `cordis.patch.yml`[@ref-dsh-configuration-config-sources-e03]。第二层用户 patch 在 home 层：`$DSH_HOME/cordis.patch.yml`。bundle patch 由各包通过 `dsh.bundle.patch` 声明，可以是单文件或有序文件列表，解析成绝对路径；profile 目录与清单字段的完整常量与命名由 `profile-context.ts` 与 `profile-boot.ts` 固定[@ref-dsh-configuration-config-sources-e04]。

另有两个被发现的**环境值**文件，它们供环境变量而不供配置：`<调用目录>/.env` 与 `$DSH_HOME/.env`，启动时由 `loadLayeredEnv` 读取一次，快照在 Cordis 启动前冻结[@ref-dsh-configuration-config-sources-e05]。**没有组织级或管理员托管的配置层**——在整棵树里检索「managed config / organisation / org-wide / enterprise / MDM」找不到这样的机制，这也是 `config.trust` 之所以值得单列的原因。

六个界面的差别集中在 `sdk-minimal`：它的 bundle 头注释写明自己**不叠加在 `dsh-base` 之上**，这份 insert 就是完整的 Cordis 树，用户 profile、home 与调用期 patch 仍在它之上生效[@ref-dsh-sdk-minimal-standalone]。因此凡是 `dsh-base` 提供的行，`sdk-minimal` 都要单独确认，不能按其它界面的行为推断。

## 层优先级与合并语义 {#config-layers}

有效条目树是从一个空根出发，按下面顺序叠加的**patch 层**，逐行后者胜出：**(1)** profile 清单 `dsh.profile.bundles` 所列的每个 bundle patch，按列表顺序；**(2)** profile 自己的 `cordis.patch.yml`；**(3)** home 级 `$DSH_HOME/cordis.patch.yml`（机器本地偏好，被所有 profile 共享，所以它压过 per-profile 层）；**(4)** 每个 `--patch {path}` 覆盖层，按 argv 顺序。`readProfilePatches()` 在源码里就是按这个次序字面实现的[@ref-dsh-configuration-config-sources-e01]。

**合并语义是最该记住的一条**：一个 patch 用 id 命中某行时，替换该行的**完整 `config` 值**，不做键级深合并。数组因此整体替换，想保留一个 bundle 字段就必须把同级字段重写一遍。patch 也可以 `insert` 新行，插入的名字可以是绝对路径、file URL 或包标识符，`insert` 行里 patch 相对的 `./`/`../` 名字在 patch 文件旁解析[@ref-dsh-configuration-config-overrides-e02]。

删除与重置也各有一种方式：删行用 `disabled: true`（接受布尔、`null` 与 `!!js` 标记），而带 `disabled` 但没有 `group: true` 的行**根本不参与求值**，其 Config 可以整个省略；设置表单的 `mutate` 取消勾选会移除该值让继承回来，取消数组下标则删掉该元素[@ref-dsh-configuration-config-overrides-e03]。例外要说清楚：设置表单的写入路径会拒绝那些会被 home patch 或命令行覆盖层盖掉的写入，因为那些层位更高，配置编辑器也从不写 home 层与 CLI 层[@ref-dsh-configuration-config-overrides-e04]。另外「profile patch 优先级最高」只对配置成立——schema 默认值在所有层之下，字段级重置能恢复继承值，但删不掉低层提供的值[@ref-dsh-configuration-config-overrides-e05]。

## 环境变量、CLI 参数与 profile 何时介入 {#config-runtime-inputs}

profile 由 `dsh {name}` 或 `--profile {name}` 在任何东西挂载之前选定，`resolveProfileDir` 拒绝空名、路径分隔符、`.`/`..` 与 `node_modules`。随后 `loadLayeredEnv('dsh')` 先行运行，把「继承环境 > `{cwd}/.env` > `$DSH_HOME/.env`」冻结成 `LaunchEnvironmentSnapshot`，被接受的值只在继承值为 undefined 时才落到 `process.env`；任何文件被拒绝都在两个文件生效前抛错。

CLI 参数在**启动器不认识的第一个 token** 处切分：启动器 flag（`--profile`、可重复的 `--patch`、`--dump-config`、`--dump-default-config`、`--dump-config-schema`、`--from-default-profile`、`-V`/`--version`）在前，其余原样经 `ctx.cmdlineArgs` 交给注入的 app 插件[@ref-dsh-configuration-config-runtime-e01]。**app flag 之所以能压过旁边的配置，只因为那一行保留了表达式**——例如 `port: !!js ctx.webStartup.port ?? 3080`；一旦用户 patch 用字面量替换整块 `config`，运行时读取消失，flag 就不再优先[@ref-dsh-configuration-config-runtime-e02]。

源码确认的环境变量有：`DSH_HOME`、`DSH_SNAPSHOT`（只有取值 `replay` 会把 `cordis.yml` 基名换成 `cordis.snapshot.yml`）、`DSH_TELEMETRY_DISABLED`（任意非空值，含 `0`/`false`，都会追加一层 patch 停用 `session-telemetry-otel` 行）、`DSH_TELEMETRY_MODE`、`DSH_TELEMETRY_OTLP_URL`、`DSH_PERMISSION_MODE`（`?? 'workspace-write'`）与 `DSH_TOOLS_MODE`（`native`|`ptc`|`both`，其它取值启动即失败）[@ref-dsh-configuration-config-runtime-e04]。`DSH_PERMISSION_MODE` 的读法就是 base bundle 里那一行的 `!!js` 表达式，Web 默认服务 `http://127.0.0.1:3080` 也是同样形态[@ref-dsh-configuration-config-runtime-e05]。`HTTP_PROXY`/`HTTPS_PROXY` 从启动快照在任何条目挂载前解析，不需要额外 flag。一个例外要说清：`DSH_TELEMETRY_DISABLED` 不是把这四层之一顶掉，而是在它们之后**追加**一层 patch 来停用遥测行，所以它不能用来撤销 bundle 或 home 层的设置。

## 项目信任与环境引导拒绝 {#config-trust-limits}

这里有两套互不相同的机制，必须分清。

**（一）对发现的环境文件的引导限制**。调用目录所在的 checkout **默认被信任，没有提示也没有存储的信任记录**。被拒绝的不是「这个项目」，而是一类固定的 **bootstrap** 变量：`isBootstrapOnly()` 拒绝 `BOOTSTRAP_NAMES`（PATH、HOME、SHELL、NODE_OPTIONS、LD_PRELOAD、BASH_ENV、GIT_*、EDITOR/PAGER/BROWSER、DEEPSEEK_BASE_URL、SSL_CERT_*、代理与 CA 相关名等）以及任何以 `DSH_`、`XDG_`、`DYLD_`、`BASH_FUNC_` 为前缀的名字，大小写不敏感，所以 `https_proxy` 不是绕过口子。唯一豁免是四个代理名 `HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY`/`NO_PROXY`，且**只**接受来自 `$DSH_HOME/.env` 的值，绝不接受来自调用目录文件的值[@ref-dsh-configuration-config-trust-e01]。任一拒绝都在两个文件生效前抛错，且没有开关。

**（二）配置读取的准入**。`prepareProfilePatches`/`prepareProfileEntries` 在 DSH 拥有的每个组合边界运行，所以被拒的行永不 import 其模块：被拒的普通行变成游离的 `disabled: true` 行，被拒的 group 保持挂载而其子项不加载，触达被拒插件的原生 Include 整体省略，因为它的文件从不被改写[@ref-dsh-configuration-config-trust-e03]。

精确版本的**豁免**存在 profile 自己的 `compatibility.json` 里，绝不放进 `package.json`，所以一次授权不会碰到依赖清单、bundle 列表或 patch 文件；映射形式是 `package-name@version` 到一组精确的 DSH 版本，文件损坏时按只读处理而不是被覆写[@ref-dsh-configuration-config-trust-e04]。**没有组织策略层**：最接近的真实机制是 home 级 `cordis.patch.yml`，但它由用户可写，不是运维可写，也不提供完整性或只读保证。权限与沙箱约束的是**Agent 的动作**，不是配置的编写；base-backed profile 的新会话默认落在 `workspace-write` preset，而独立的 `sdk-minimal` 树改为钉住 `danger-full-access` 并且不挂载批准或权限设置服务——这些是会话属性，不是配置治理[@ref-dsh-configuration-config-trust-e06]。SAFETY.md 则明确说明沙箱、批准提示与权限控制能降低风险但不保证隔离，也阻止不了对被授权资源的破坏[@ref-dsh-configuration-config-trust-e05]。

## 默认值、功能开关与平台差异 {#config-defaults}

默认值来自三处。**schema 默认值**声明在各插件的 Schemastery `Config` 里，由 `--dump-config-schema` 投影成 JSON Schema；关键是它们是**注解而非默认注入**——字段默认值记录在 schema 里，不会被写进你的文件，想改就必须显式写出；角色元数据（`secret`、`credential-ref`、`ms`）与 `volatile` 实时更新元数据保留在 `x-cordis` 注解里。该投影会把一些情形标成 `partial`（回调校验、不支持的正则语义、非有限边界）[@ref-dsh-configuration-config-defaults-e02] [@ref-dsh-configuration-config-defaults-e01]。精确键名与默认值的权威索引是 `docs/config-catalog.md` 这份生成文件。

**出厂 bundle 默认值**写在 `packages/bundle/base/cordis.patch.yml` 与各模式 bundle 里，同样是读环境的 `!!js` 表达式：沙箱模式 `process.env.DSH_PERMISSION_MODE ?? 'workspace-write'`，批准策略只在 `danger-full-access` 下为 `'never'`、否则 `'ask'`，遥测 `mode: !!js process.env.DSH_TELEMETRY_MODE || 'FEEDBACK_ONLY'`，`bash-sandbox.timeoutMs: 60000`。`permission.presets` 表里已配置的条目是 `workspace-write`（`workspace-write` + `ask`）与 `danger-full-access`（`danger-full-access` + `never`），`custom` 与 `auto` 是保留值且不可配置[@ref-dsh-configuration-config-defaults-e04]。

**平台差异**用 Loader 的 `disabled` 表达式表达而不是分支：`bash-sandbox` 是 `disabled: !!js process.platform === 'win32'`，`pwsh-sandbox` 是 `disabled: !!js process.platform !== 'win32'`[@ref-dsh-configuration-config-defaults-e03]。要改默认值就在某个 patch 层覆盖该键，但因为 patch 替换整块 `config`，你必须把想保留的同级字段重写出来。

## 键迁移、弃用与旧文档导入 {#config-migration}

**本产品没有通用的配置键迁移、弃用或改名系统。** 未知键不会被静默升级：配置 schema 从原生声明收集，缺少 Config 意味着「未知字段」而不是「禁止的配置」，一条 `status: 'unsupported'` 的记录表示该声明无法投影，而不是某个键已弃用[@ref-dsh-configuration-config-migration-e03]。

真实存在的只有**一项**旧文档导入，针对已移除的全局设置文档。旧路径 `$DSH_HOME/settings.yaml` 曾经在组合之上占一层，随实配置迁入归属它的 profile 而被删除。首次运行该变更后的版本时，等 Settings 启动后所有后续条目沉降完毕，`SettingsForms.importLegacyDocument()` 检查该文件：存在就**在首次写入之前**把它改名为 `settings.yaml.imported`（避免部分导入重复执行），然后把每个 section 写入 id 匹配的 profile 条目，并应用一个小的改名表 `LEGACY_SECTION_ENTRIES`[@ref-dsh-configuration-config-migration-e02]：`ui-developer-tools` → `ui-settings`，`ui-onboarding` → `ui-settings-general`，`shell` → 平台对应的 shell 执行器条目（win32 上是 `pwsh-sandbox`，其它是 `bash-sandbox`）。运行中组合拒绝的 section 记告警并只留在改名后的文件里[@ref-dsh-configuration-config-migration-e01]。

界面边界要说准：这个导入是 `@deepseek-ai/dsh-settings` 提供的能力，而该行由 `dsh-base` 挂载[@ref-dsh-base-bundle-settings-row]，所以 base-backed 的五个界面都具备它，但用户真正能看见的消费面是 Web 与 Desktop 的设置表单；`sdk-minimal` 因为不叠加 `dsh-base` 而不挂载这个服务，结论是**不适用**而不是未知[@ref-dsh-sdk-minimal-standalone]。

## 怎样看生效来源与为什么改动没生效 {#config-diagnostics}

三个工具回答「哪一层赢了」和「我的编辑为什么没生效」。

**（1）dump 家族**。`--dump-default-config` 只显示 bundle 层，`--dump-config` 再叠加 profile patch、home patch 与 `--patch` 覆盖层；两者都把组合结果作为一份可加载 YAML 打印出来，**不启动**运行时，并发出 `#` 注释指明每一行来自哪个文件、每个覆盖层改了哪里，`!!js` 表达式保持未求值，dump 会初始化缺失的 profile 文件且从不运行 app 命令行 provider，因此它展示的是任何 app 参数被解析之前的组合树，并拒绝携带 app 参数的调用[@ref-dsh-configuration-config-diagnostics-e01]，未命中的 patch 目标在 stderr 上带层标签报告[@ref-dsh-configuration-config-diagnostics-e02]。`--dump-config-schema` 用同样的层打印 JSON Schema 2020-12，输出里 `$defs` 单独描述 profile/home/CLI 覆盖层的 patch 片段，校验该片段时必须保留 `$defs`；三个 dump flag 互斥，且都拒绝 app 参数与保留的 `desktop` profile 名[@ref-dsh-configuration-config-diagnostics-e08]。

**（2）热重载与失败表**。启用 `dsh-hmr` 后会监听 profile 清单与两个用户 patch 文件，把重载与 Plugin Manager 写入串行化，并按失败表处理：格式错误的 live patch **被拒绝且不改变运行中配置**（合法编辑则生效）；schema 校验失败对新条目是「保持未激活」、对已存在条目是「保留先前实例与 config」，而合法修正则生效[@ref-dsh-configuration-config-diagnostics-e03]；`!!js` 求值抛错被报告并保留同级项；注入服务不可用则条目继续等待。沉降后 `reconcileProfilePatches` 发出 `app-boot/config-reload`。精确配置监听默认开 `awaitWriteFinish`，即编辑要等 Chokidar 的 2 秒写入稳定窗口，以避开它有损的 change-event 节流；关掉它可能漏掉快速连续编辑，而直接的 Plugin Manager 操作不等待文件事件[@ref-dsh-configuration-config-diagnostics-e07]。

**（3）启动诊断**。必需插件激活失败时，报告先打印失败插件及其原始堆栈，随后是待定插件（必需插件排在前面）与缺失服务，`Full diagnostics:` 一行指向 `$DSH_HOME/logs/`（默认 `~/.dsh/logs/`）下唯一的 `startup-{timestamp}-{uuid}.log`，CLI 在写完报告与 stderr 后显式以退出码 1 退出，不覆盖也不自动删除旧报告[@ref-dsh-configuration-config-diagnostics-e04]。报告内含 DSH 与 Node 版本、平台、profile、**根配置路径**、每个未激活插件的模块与状态、原始错误与启动告警；它不收集环境变量或配置内容，但原始插件错误里可能含配置或凭据取值，因此报告头提示分享前先审阅[@ref-dsh-configuration-config-diagnostics-e05]。挂载之前，`Config.listConfigs` 用 `preset-{id}` 这类 entry id 查询会返回命名空间键与该插件的 schema 信封，可用来定位声明归属[@ref-dsh-configuration-config-diagnostics-e06]。Web UI 的设置表单直接展示有效分层：每个字段带解析后的 `value`、继承的 `base` 与原始 `user` section。
