---
schema_version: 3
record_kind: production
edition_id: autohand-cli-native_plugins-v1
harness_id: autohand
topic: native_plugins
title: "Autohand Code CLI 的扩展包、安装与扩展点"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-extapi-layers, ref-autohand-docs-extcli-contribute, ref-autohand-docs-extapi-runtime, ref-autohand-docs-extapi-surfaces]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-extapi-layout, ref-autohand-docs-extapi-manifest, ref-autohand-ext-manifest, ref-autohand-docs-extapi-constraints, ref-autohand-docs-extapi-tool, ref-autohand-docs-extapi-agent, ref-autohand-docs-extapi-skill, ref-autohand-ext-layout, ref-autohand-ext-trust]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-extcli-install, ref-autohand-config-locations, ref-autohand-docs-extapi-compat, ref-autohand-docs-extcli-manage, ref-autohand-extensions-install]
  - section_id: plugins-discovery-api
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-extcli-validate, ref-autohand-docs-extcli-precedence, ref-autohand-docs-extcli-contribute, ref-autohand-docs-extapi-compat, ref-autohand-docs-extapi-surfaces, ref-autohand-extensions-security, ref-autohand-ext-runtime, ref-autohand-extensions-precedence]
  - section_id: plugins-lifecycle-diagnostics
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-extcli-manage, ref-autohand-extensions-manage, ref-autohand-config-doctor, ref-autohand-docs-extcli-session, ref-autohand-docs-extcli-install, ref-autohand-hooks-manage, ref-autohand-ext-trust]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-autohand-docs-extapi-layers, ref-autohand-docs-extcli-contribute, ref-autohand-docs-extapi-surfaces]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-autohand-docs-extapi-layout, ref-autohand-docs-extapi-manifest, ref-autohand-docs-extapi-constraints, ref-autohand-docs-extapi-tool, ref-autohand-ext-layout, ref-autohand-ext-trust]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-autohand-docs-extcli-install, ref-autohand-config-locations, ref-autohand-docs-extapi-compat, ref-autohand-docs-extcli-manage]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-api
        status: answered
        source_refs: [ref-autohand-docs-extcli-validate, ref-autohand-docs-extcli-precedence, ref-autohand-docs-extapi-compat, ref-autohand-extensions-precedence]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-api
        status: answered
        source_refs: [ref-autohand-docs-extapi-surfaces, ref-autohand-extensions-security, ref-autohand-ext-runtime]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle-diagnostics
        status: answered
        source_refs: [ref-autohand-docs-extcli-manage, ref-autohand-extensions-manage, ref-autohand-docs-extcli-session, ref-autohand-ext-trust]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle-diagnostics
        status: answered
        source_refs: [ref-autohand-config-doctor, ref-autohand-extensions-manage]
---

本页固定来源为 Autohand Code CLI 仓库 commit `a248656e78244f8387c0d0e436786fe801ad6599` 的扩展文档（`docs/extensions.md`、`docs/extension-authoring.md`），以及官方文档站 CLI Extensions 与 Extension API v1 页面。固定问题只针对 `cli` 界面回答。

## 什么算原生插件 {#plugins-model}

Autohand Code 的原生插件机制是 **CLI extensions**（Extension API v1），它在一个包内统一打包三类声明式贡献与一类需要显式信任的运行时贡献：[@ref-autohand-docs-extapi-layers][@ref-autohand-docs-extcli-contribute]

- 声明式安全层：`tools`（名称、描述、JSON Schema 参数与 handler 模板）、`agents`（聚焦的 system prompt、描述、可选 model 与工具白名单）、`skills`（可移植的 `SKILL.md` 指令包）。这一层按有界数据校验，不导入也不执行包内代码。
- 受信运行时层：编译后的 `.js`/`.mjs`/`.cjs` 入口，只有带 `--trust` 安装后才激活，可注册斜杠命令、Ink 视图、状态/帮助行、键位、CLI 标志、hooks、providers 与权限策略。

与相邻概念的关系：Skill 本身是独立机制，扩展只是**可以**贡献 Skill；Hook 可由受信运行时通过 `api.hooks.on` 注册，也可继续用配置式 hook；provider 可由受信运行时注册为 `extension:` 命名空间；扩展不是 MCP server，也不通过 npm 安装——v1 只从本地目录安装。受信运行时**不进沙箱**，与 Autohand 进程同等的操作系统权限。[@ref-autohand-docs-extcli-contribute][@ref-autohand-docs-extapi-runtime][@ref-autohand-docs-extapi-surfaces]

## 包格式与清单 {#plugins-package}

包布局（只有清单中声明的文件才贡献能力）：[@ref-autohand-docs-extapi-layout]

```text
company.release-helper/
  autohand.extension.json
  tools/release-range.json
  agents/release-planner.md
  skills/release-workflow/SKILL.md
  dist/extension.mjs
```

仓库的 Package layout 与 Manifest 小节给出同一布局与字段，并补充机器可读契约：清单的 `$schema` 指向 `code-extensions` 仓的 `schema/autohand.extension.schema.json`；要求 `schemaVersion` 与 `extensionApi` 恰为 `1`、`id` 为限定小写段、`version` 为严格 semver、贡献路径用 `/` 且位于包内、必须是包根内的常规文件（贡献符号链接被拒绝）、至少贡献一个 tool/agent/skill/runtime；未知键、重复路径、冲突名、路径穿越、非法 UTF-8 与缺失文件一律拒绝。运行时包可以携带源码与捆绑依赖，但 `contributes.runtime` 必须指向已编译的 `.js`/`.mjs`/`.cjs`。[@ref-autohand-ext-layout][@ref-autohand-ext-manifest][@ref-autohand-ext-trust]

清单字段：[@ref-autohand-docs-extapi-manifest][@ref-autohand-ext-manifest]

| 字段 | 约束 |
| --- | --- |
| `schemaVersion` | 必填，且必须为 `1` |
| `extensionApi` | 必填，且必须为 `1` |
| `id` | 小写限定 id（如 `company.extension-name`），3–100 字符 |
| `version` | 严格 `major.minor.patch` 语义化版本 |
| `name` / `description` | 必填的可读元数据 |
| `license` / `repository` | 可选发布元数据 |
| `contributes` | 至少一个非空的 `tools`/`agents`/`skills`/`runtime` 列表；每个列表最多 100 条路径 |

清单是严格模式：未知字段与重复 JSON 键都会被拒绝，避免拼写错误静默改变包行为。路径与输入限制：贡献路径用 `/`、相对包根、列表内唯一、不超过 240 字符；拒绝绝对路径、盘符路径、反斜杠、空段、`.`、`..`、NUL 字节与路径穿越；声明的贡献必须是真实包根内的常规文件，贡献符号链接被拒绝；清单上限 64 KiB、单贡献上限 256 KiB，且必须是合法 UTF-8。[@ref-autohand-docs-extapi-constraints]

工具贡献的 handler 是带占位符的命令模板：占位符必须全部声明且必填，渲染时做 shell 转义，校验阶段筛查不安全模式，调用时仍走正常授权；Agent 贡献的 JSON 形式用既有字段（`description`、`systemPrompt`、`tools`、可选 `model`），markdown 形式以文件名作 agent 名；Skill 贡献以 `SKILL.md` 为入口。**凭据不得写进扩展包**，应让命令从用户环境读取。[@ref-autohand-docs-extapi-tool][@ref-autohand-docs-extapi-agent][@ref-autohand-docs-extapi-skill]

## 安装、版本固定与卸载 {#plugins-install}

| 作用域 | 命令 | 存储 | 适用 |
| --- | --- | --- | --- |
| 用户 | `autohand extensions install ./pkg` | `$AUTOHAND_HOME/extensions`（通常 `~/.autohand/extensions`） | 能力随用户跨工作区可用 |
| 项目 | `autohand --path . extensions install ./pkg --scope project` | 工作区 `.autohand/extensions` | 仓库自带或需固定团队配置 |

[@ref-autohand-docs-extcli-install][@ref-autohand-config-locations]

- 安装流程：整包经临时目录复制 → 校验副本 → 原子改名入位；内容完全相同的重装是幂等的，替换不同内容需 `--replace`。[@ref-autohand-docs-extcli-install]
- `--link` 记录开发者链接而不复制包；禁用或删除只移除已注册的链接与状态，绝不删除源目录。[@ref-autohand-docs-extcli-install]
- 版本固定：v1 只支持从**本地目录**安装。要分发就发布不可变 tag 或 release，让使用者检出该固定版本后再装本地目录；直接从非固定远程 URL 或 Git 分支安装被有意排除。[@ref-autohand-docs-extapi-compat]
- 卸载与禁用：`extensions disable/enable 包 id`、`extensions remove 包 id --yes`（`uninstall` 为别名）；非交互删除必须带 `--yes`。[@ref-autohand-docs-extcli-manage][@ref-autohand-extensions-install]

## 发现、校验、加载与扩展点 {#plugins-discovery-api}

发现与加载：安装时先 `validate`（只读：解析清单、解析每个声明路径、校验贡献、检查 handler 安全性，不复制也不执行任何东西），随后按前文流程复制并原子入位；**发现采用失败即关闭**（fail closed）——一个损坏的扩展只是不贡献能力，不会阻止 Autohand 启动，也不会部分激活。[@ref-autohand-docs-extcli-validate][@ref-autohand-docs-extcli-precedence]

优先级与冲突（官方顺序，仓库扩展文档给出同一份列表）：[@ref-autohand-docs-extcli-precedence][@ref-autohand-extensions-precedence]

1. 内置 tool/agent/skill/command/provider/CLI 标志与保留键位不可被替换。
2. 既有独立 meta-tool 与用户/外部 agent 仍优先于扩展贡献。
3. 项目包按整包替换同 id 的用户包。
4. 包 id 与贡献名按确定性顺序处理。
5. 无效、不兼容、不安全或冲突的包不贡献任何内容，并出现在 `doctor` 中。
6. 被禁用的包仍可被查看，但不贡献声明式或运行时能力。

依赖与顺序：Autohand 不会转译 TypeScript、也不会为扩展安装依赖；作者必须声明已编译的 `.js`/`.mjs`/`.cjs` 并自行捆绑依赖。[@ref-autohand-docs-extcli-contribute][@ref-autohand-docs-extapi-compat]

扩展点（受信运行时的注册面）：`api.commands.register`（斜杠命令）、`api.ui.registerView`（Ink 视图/菜单/对话框）、`api.ui.setStatusLine`/`setHelpLine`、`api.keybindings.register`（Escape、Enter、Ctrl+C、Ctrl+D、Shift+Tab 保留）、`api.cli.registerFlag`（唯一的长 `--kebab-case` 标志，必须在 Commander 解析前注册）、`api.hooks.on`（生命周期处理器）、`api.providers.register`（`extension:` 命名空间 provider）、`api.permissions.registerPolicy`（可追加 allow/deny 列表、规则、工具模式与路径/URL 策略，但不能替换模式、决策缓存或不可变安全策略）。注册按扩展事务化：任一非法、重复、保留或冲突的注册会拒绝该扩展的激活，而不是留下部分命令/UI/provider/策略。[@ref-autohand-docs-extapi-surfaces]

运行时入口契约：模块必须导出 `activate(api)`、一个默认激活函数，或含 `activate` 的默认对象；激活可返回清理函数，另有可选的 `deactivate` 在重载、禁用或移除时调用；`api.version` 为 `1`；TypeScript 作者可从 `autohand-cli` 导入 `ExtensionRuntimeAPI` 类型做源码检查后再交付编译产物；一个扩展的全部注册是事务性的。[@ref-autohand-ext-runtime]

授权不被绕过：声明式工具只在 agent 或用户调用时运行，参数值做 shell 转义，并经过工具可用性检查、不可变安全规则、权限管理器、pre-tool hook、审批流程、生命周期事件与用量统计；扩展贡献的权限策略约束的是 Autohand 管理的动作，不能绕过不可变黑名单，也不约束受信入口内的任意代码。[@ref-autohand-docs-extcli-precedence][@ref-autohand-extensions-security]

## 生命周期状态与诊断 {#plugins-lifecycle-diagnostics}

可观察的状态与转换：validate（只读校验）→ install（复制/链接并入位）→ enable/disable → activate（受信运行时入口激活，失败该扩展不贡献任何内容）→ remove；`show` 报告 id、版本、描述、作用域、state、linked/已复制、trust、包根，以及当前活跃的 tool/agent/skill 与运行时入口；`doctor` 报告非法状态、清单、贡献、包目录、不可读根、命名冲突、缺失信任与运行时激活失败。[@ref-autohand-docs-extcli-manage][@ref-autohand-extensions-manage]

- 安装级检查：`autohand doctor` 在整体安装检查中包含扩展诊断，任一失败退出码为 1，`--json` 给结构化输出。[@ref-autohand-config-doctor]
- 会话内同一套生命周期：`/extensions list|show|validate|install|doctor|disable|enable|remove`，成功的变更会刷新当前会话的声明式与运行时注册，避免禁用/删除后残留旧工具、agent、skill、命令、UI、hooks、provider 与策略。[@ref-autohand-docs-extcli-session][@ref-autohand-extensions-manage]
- 开发循环：编辑链接源 → validate → 用 disable/enable 之类的会话内变更刷新，发布级验证则启动新会话。[@ref-autohand-docs-extcli-install]
- 信任状态存在包外的 Autohand 状态中，能跨 disable/enable 保留，随卸载消失；disable 与 removal 会停用该扩展的全部注册，激活失败则贡献为空、只出现在 `extensions doctor`，不影响其他健康扩展或 CLI 启动。[@ref-autohand-ext-trust]
- 扩展注册的 hook 会出现在 `/hooks` 浏览器并标注所属扩展。[@ref-autohand-hooks-manage]

**未证实项**：固定来源没有给出扩展运行状态的持久日志路径，也没有扩展 API 版本的兼容矩阵（只要求针对 `extensionApi: 1` 并用团队支持的最旧版本做校验）。检查过的入口：`extensions list/show/doctor` 说明、Extension API v1 的 Compatibility 小节、`autohand doctor`。
