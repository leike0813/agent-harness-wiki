---
schema_version: 3
record_kind: production
edition_id: deepseek-harness-native_plugins-v1
harness_id: deepseek-harness
topic: native_plugins
title: "DeepSeek Harness 的原生插件：everything-is-a-plugin 模型、bundle 清单与插件管理"
sections:
  - section_id: plugin-model
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-arch-profiles-bundles, ref-dsh-arch-no-core, ref-dsh-bundle-base-manifest, ref-dsh-manifest-dsh-field, ref-dsh-cookbook-feature-table]
  - section_id: bundle-format
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-manifest-dsh-field, ref-dsh-manifest-bundle-profile, ref-dsh-bundle-base-manifest, ref-dsh-compat-peer-scope]
  - section_id: plugin-installation
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-cli-plugin-verb, ref-dsh-cli-profile-directory, ref-dsh-pm-toggle-semantics, ref-dsh-cli-compose-order]
  - section_id: plugin-discovery
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-appboot-profile-contract, ref-dsh-appboot-bundle-load, ref-dsh-appboot-two-anchor, ref-dsh-cli-bundle-resolution]
  - section_id: extension-points
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-cookbook-feature-table, ref-dsh-arch-no-core, ref-dsh-pm-manager-surface]
  - section_id: plugin-lifecycle
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-inventory-row-shape, ref-dsh-pm-broken-bundle, ref-dsh-boot-plugin-entry-id]
  - section_id: plugin-diagnostics
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-cli-startup-diagnostics, ref-dsh-pm-version-exemptions, ref-dsh-inventory-snapshot, ref-dsh-pm-manager-surface]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: plugin-model
        status: answered
        source_refs: [ref-dsh-arch-profiles-bundles, ref-dsh-arch-no-core, ref-dsh-bundle-base-manifest, ref-dsh-manifest-dsh-field, ref-dsh-cookbook-feature-table]
  - question_id: plugins.package
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: bundle-format
        status: answered
        source_refs: [ref-dsh-manifest-dsh-field, ref-dsh-manifest-bundle-profile, ref-dsh-bundle-base-manifest, ref-dsh-compat-peer-scope]
  - question_id: plugins.install
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: plugin-installation
        status: answered
        source_refs: [ref-dsh-cli-plugin-verb, ref-dsh-cli-profile-directory, ref-dsh-pm-toggle-semantics]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: plugin-discovery
        status: answered
        source_refs: [ref-dsh-appboot-profile-contract, ref-dsh-appboot-bundle-load, ref-dsh-appboot-two-anchor, ref-dsh-cli-bundle-resolution]
  - question_id: plugins.api
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: extension-points
        status: answered
        source_refs: [ref-dsh-cookbook-feature-table, ref-dsh-arch-no-core, ref-dsh-pm-manager-surface]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: plugin-lifecycle
        status: answered
        source_refs: [ref-dsh-inventory-row-shape, ref-dsh-pm-broken-bundle, ref-dsh-boot-plugin-entry-id]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: plugin-diagnostics
        status: answered
        source_refs: [ref-dsh-cli-startup-diagnostics, ref-dsh-pm-version-exemptions, ref-dsh-inventory-snapshot]
---

## 什么算原生插件 {#plugin-model}

DeepSeek Harness 没有单独的「原生插件」类别：任何被挂载进 Loader 树的 Cordis 插件包都是原生插件，宿主不存在需要被 patch 的特权内核。官方架构文档把扩展方式说成「在其它插件旁边挂一个插件，注册项是插件卸载时回卷的 effect」[@ref-dsh-arch-no-core]。

真正的分发单位叫 **bundle**。运行中的 `dsh` 是启动时按有序层组合出的插件树；**profile** 是存放在 Harness home 里的具名组合，记录它堆叠哪些 bundle、装哪些树外插件，并保留用户自己的 `cordis.patch.yml`；`web`、`headless`、`sdk`、`sdk-minimal`、`acp` 以模板形式随产品发布。**bundle** 是 Cordis 配置行及其所挂载代码的分发格式，因此它插入的内容仍可被上层 patch。两者都通过各自 `package.json` 的 `dsh` 字段自我声明：`dsh.profile` 列出 profile 的 bundle 列表，`dsh.bundle` 指向 bundle 的 patch 文件[@ref-dsh-arch-profiles-bundles]。

`dsh` 字段本身是同一包可声明多种角色的容器，公开作者字段为 `manifestVersion`、`bundle`、`profile`、`client`[@ref-dsh-manifest-dsh-field]。自带的 `@deepseek-ai/dsh-base` 就是这种形状：普通 npm 包，`package.json` 里只有 `"dsh": { "bundle": { "patch": "./cordis.patch.yml" } }`[@ref-dsh-bundle-base-manifest]。

关键区分在于：第一方能力不是一种插件类型。Skill、MCP 客户端、Hook、子代理、LLM 适配器和工具各自是普通 Cordis 包，由 bundle 挂载。官方 cookbook 直接把两者并列为「每个 server 一个插件：发现工具后 `ctx.tools.register()`」与「小节加工具注册，调用时 `inject()` 注入 skill 内容」[@ref-dsh-cookbook-feature-table]。所以「普通包」与「插件」的差别仅在于清单里有没有 `dsh.bundle`；没有它的依赖保持为普通包，不贡献任何配置层。

本产品**没有**插件市场、集中式插件注册表或跨机插件同步。官方文档在可发现性上只指向一个 GitHub topic，最近的等价机制就是普通 npm/pnpm registry，以及 profile `package.json` 里的 `dsh.profile.bundles`。

## 包格式、清单与兼容声明 {#bundle-format}

bundle 没有专用文件格式，入口就是一份 Cordis patch 文档；最小的自证形态是 `@deepseek-ai/dsh-base` 那个普通 npm 包，`package.json` 里只有 `"dsh": { "bundle": { "patch": "./cordis.patch.yml" } }`[@ref-dsh-bundle-base-manifest]。`DshBundleManifest.patch` 是 `string | string[]`：一个文件路径，或按序应用的文件列表，路径都相对声明它的包根；`DshProfileManifest.bundles` 则是 profile 声明的有序 bundle 层列表，使用已安装的包名[@ref-dsh-manifest-bundle-profile]。

第一方展示元数据来自普通 npm 字段加 `dsh` 消费面（`name`、`version`、`description`、`icon`、`private`、`dependencies`、`peerDependencies` 以及 `engines`）。`client` 子字段承载 Web 客户端模块与构建元数据，浏览器侧的 UI 扩展点依赖它[@ref-dsh-manifest-dsh-field]。

兼容声明走 `peerDependencies`：实际校验只对 `@deepseek-ai/dsh` 与 `@deepseek-ai/dsh-` 前缀的包生效，`workspace:^`、`workspace:~`、`workspace:*` 会被替换为实际运行时版本，其余按原样用 `semver.satisfies` 判定，不满足即记入未满足的 `peers`[@ref-dsh-compat-peer-scope]。`engines.dsh` 是声明性的，不是强制通道；强制通道是 peer 范围加 profile 内的版本豁免。

## 安装、启用、更新与卸载 {#plugin-installation}

全部经由 profile 目录里的 pnpm 完成。`dsh plugin --profile {name} {pnpm args}` 的语义就是「把参数转发给 profile 目录下的 pnpm」[@ref-dsh-cli-plugin-verb]，因此 `add`、`remove`、`update`、`why` 等 pnpm 动词原样可用；树外 bundle 就来自普通 npm registry。`dsh.profile.bundles` 里的层顺序与 `cordis.patch.yml` 的用户层都在 profile 目录内，profile 目录同时持有 `package.json`、锁文件与自己的 patch 层[@ref-dsh-cli-profile-directory]。

**版本固定就是 pnpm 固定**：落在 profile `package.json` 与锁文件里的范围即固定值，没有独立的 pin 文件，也不与 `dsh` 版本锁步。

启用与禁用是两个不同的旋钮，必须分开看。插件条目开关只改 profile `cordis.patch.yml` 里最后一个匹配 override 的 `disabled`（无匹配则追加一条），匹配依据是 entry id 与模块名断言；bundle 开关改的是 `package.json` 里 `dsh.profile.bundles` 的有序列表。禁用保留依赖项；启用会把 bundle 追加到列表末尾，这会改变配置优先级——因为组合顺序就是各 bundle 的 `dsh.profile.bundles` 顺序，其后才是 profile 与 home 的 `cordis.patch.yml`，最后是 `--patch` 覆盖层[@ref-dsh-cli-compose-order]；安装默认启用新 bundle；home 层与调用期 patch 保持更高优先级[@ref-dsh-pm-toggle-semantics]。

「用户级」与「项目级」在本产品里不是全局概念，而是**按 profile 划分**：每个 `$DSH_HOME/profiles/{name}` 拥有自己的 `package.json`、`pnpm-lock.yaml`、`cordis.patch.yml` 和兼容豁免文件；唯一的跨 profile 层是 home 级 `cordis.patch.yml`，它承载偏好而不是包。

界面差异：npm 版 CLI 拒绝 `desktop` 这个保留 profile 名的引导与插件管理请求，Desktop 通过自己的捆绑 pnpm 和由 `@deepseek-ai/dsh/profile-boot` 提供的共享 profile 生命周期操作它；Web 有 Plugins 侧栏页与 `plugin_manager` 工具；`web` 模板启用配置热重载，其余发布 profile 是仅启动期，插件变更报「需重启」。

## 发现、解析、校验与加载顺序 {#plugin-discovery}

发现是启动时按层进行，不是注册表扫描。`loadProfileDirectory` 按 `dsh.profile.bundles` 顺序遍历，对每个名字用两个锚点解析：先 dsh 安装自身的包，再 profile 目录；解析到的包读清单后要求存在 `dsh.bundle`（缺失即以「declares no dsh.bundle」跳过），随后跑 `evaluatePluginCompatibility`，校验 `dsh.bundle.patch` 是文件路径或文件列表，再按声明顺序拼接各 patch 文件解析出的条目列表。bundle 本身不是插件行，所以行的准入不会读自己的 peer；任何单 bundle 失败都会被捕获并记入 `skippedBundles`，不改变已选层[@ref-dsh-appboot-bundle-load]。

profile 目录契约把这条链写得更清楚：profile 是 `$DSH_HOME/profiles/{name}` 下的目录，持有 `package.json`（树外插件依赖加 `dsh.profile` 及其有序 `bundles` 列表）和 `cordis.patch.yml`（用户自己的 patch 层，在所有 bundle 层之后生效）；bundle 是清单声明了 `dsh` 字段中 bundle patch 的 npm 包，组合方式是按 `dsh.profile.bundles` 顺序把各 bundle 的 patch 列表应用到**空条目列表**上，再应用 profile 自己的 patch，最后是调用方层[@ref-dsh-appboot-profile-contract]。

模块解析按构造就是双锚点：bundle 名先从 dsh 安装解析，再从 profile 目录解析；profile `node_modules` 里 pnpm 管理的条目优先。启动时启动器先遍历安装与所选 bundle，把得到的不可变运行时解析装入 Node 的 ESM 与 CommonJS 解析器，且不创建任何共享或 profile 自有的回退链接[@ref-dsh-appboot-two-anchor]；官方行为参考给出同一事实的产品级表述，并列出随安装发布的六个 in-box bundle 名称[@ref-dsh-cli-bundle-resolution]。

排序完全由 `dsh.profile.bundles` 顺序加层优先级决定，**依赖**就是普通 npm 依赖——没有 dsh 层的依赖求解器。命名冲突在两个层面解决：包层面由上述双锚点顺序决定（安装优先于 profile），行层面由 entry id 加模块名断言决定；一个模块名映射到多个 Config 定义时，在 config-schema dump 中报歧义诊断，而不是静默合并。界面差异只影响生效时机：`web` 在清单或 patch 变化时重新组合全部层，其余发布 profile 在启动时应用一次。

## 扩展点与宿主 API 边界 {#extension-points}

插件导出 Cordis 的 `name`、可选 `inject`（服务依赖）、可选 `Config`（Schemastery schema，宿主可投影为 JSON Schema）以及 `apply(ctx)`。在 `apply` 内它可以注册服务（`ctx.tools.register()`、`ctx.approval`、`ctx.sandbox`、`ctx.subagents`、`ctx.goal`、`ctx.workflowEngine`、`ctx.compaction`、系统提示小节）、注册 LLM 适配器或 Web 业务行、订阅带类型的事件与 waterfall、注入持久内容（`agent.inject()`）以及增加 Remote 方法。官方的能力→机制对照就是这种「一个能力一个插件」写法[@ref-dsh-cookbook-feature-table]。

边界有两条，都要记住。第一条是**配置优先级**：靠后的 patch 层替换目标行完整的 `config`，所以插件没有私有配置通道——想改别人的配置只能通过层序，不能绕过组合[@ref-dsh-arch-no-core]。第二条是**权限**：`plugin_manager` 工具的每个动作都需要 `danger-full-access` 或针对本次调用的批准；较低沙箱模式下 `ask` 会请求批准，而 `never`、拒绝、取消或没有可用批准通道都会阻止执行；批准本身不改变会话的权限模式，依赖包的构建脚本批准是另一项独立权限。已安装的 Host 侧插件代码在进程内、明确运行于工作区沙箱之外；管理动作的批准要求与它同属这一节，因为 `plugin_manager` 的每个工具动作都需要 `danger-full-access` 或针对本次调用的批准，较低沙箱模式下 `ask` 会请求批准，而 `never`、拒绝、取消或没有可用批准通道都会阻止执行，批准本身不改变会话的权限模式[@ref-dsh-pm-manager-surface]。Web 与 Desktop 还存在浏览器侧的扩展点（业务行定义、按 key 的渲染器、`client` 清单字段）；`headless`、`sdk`、`sdk-minimal`、`acp` 不挂载浏览器连接也不开监听端口，这些点直接不存在。

## 安装、启用、发现、加载、激活与健康的区分 {#plugin-lifecycle}

本产品不把这些状态折叠成一个「已安装／可用」。**已选中（enabled）** 记录的是保存的选择，不是加载成功：无法加载的已选 bundle 仍留在 `listBundles` 里并带 `error`，插件页显示该错误并允许取消选择；已损坏的 bundle 不能被启用，但管理用的 bundle 在文件不可读时仍受保护[@ref-dsh-pm-broken-bundle]。

运行期阶段是公开词表 `pending | loading | active | failed | unloading | null`，由 Cordis `Fiber.state` 投影、`disposed` 折叠进 `null`；`null` 只表示没有活的根 fiber，**不区分**是从未启动还是已经释放。行条目携带 entry id、精确模块说明符、生效启用状态（含被禁用的祖先 group）与当前根 fiber 阶段，结构性 group 行被跳过[@ref-dsh-inventory-row-shape]。`PluginInfo` 另外带一个唯一 `patchId`，或一个 `readOnlyReason` 说明该行为什么不能通过 profile patch 修改（如 agent-preset 行）；`PluginEntryId` 应从 `listPlugins` 取得，而不是自行拼 patch id[@ref-dsh-boot-plugin-entry-id]。

**健康**没有独立布尔值：它是 `failed` 阶段加上启动失败报告的组合。`headless`、`sdk`、`sdk-minimal`、`acp` 没有浏览器客户端可渲染 Plugins 页或只读的 Settings 列表，可观察通道只有 CLI 与 stderr／退出码。

## 诊断入口与定位 {#plugin-diagnostics}

有五条彼此独立的通道。**启动失败报告**：必需插件激活失败会打印失败插件及其原始堆栈，随后是待定插件与缺失服务，最后一行 `Full diagnostics:` 指向 `$DSH_HOME/logs/`（默认 `~/.dsh/logs/`）下唯一的 `startup-{timestamp}-{uuid}.log`，CLI 写完报告与 stderr 后以退出码 1 显式退出，不覆盖也不自动删除旧报告[@ref-dsh-cli-startup-diagnostics]。

**被跳过的 bundle**：每次启动通过一条 `skipping profile bundle` 告警在 stderr 打印一次（带 bundle 名与原因），原因是解析、清单、兼容或 patch 加载失败。

**实时服务查询**：`ctx.pluginManager` 提供 `listPlugins`、`listBundles`、`registries()`、`inspect(spec)` 和 `listVersionExemptions()`。**只读清单**：`pluginInventory/list` 返回加载顺序快照与逐条目阶段，它是展示与诊断用的快照，不能启用、禁用、添加或移除插件，也不带历史——已失败并被移除的 fiber 不会出现；服务每次调用都读 Loader，所以答案始终反映当前组合而不是缓存视图[@ref-dsh-inventory-snapshot]。

**版本豁免**有专用 CLI：`version-exemptions`、`allow-version {package@version} --dsh-version {runtime} --accept-risk`、`revoke-version {package@version} --dsh-version {runtime}`；授权前会打印风险警告。兼容拒绝带 `incompatible-version` 码，含每个被拒包的 `name`、`version`、`runtimeVersion` 与未满足的 `peers`，CLI 拒绝时直接打印可照抄的 `allow-version` 命令[@ref-dsh-pm-version-exemptions]。管理类操作在 Web 侧需要批准这一点前面已述[@ref-dsh-pm-manager-surface]。
