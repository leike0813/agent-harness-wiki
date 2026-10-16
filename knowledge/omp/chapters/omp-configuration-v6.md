---
schema_version: 3
record_kind: production
edition_id: omp-configuration-v6
harness_id: omp
topic: configuration
title: OMP 配置来源、优先级与诊断
sections:
  - section_id: config-roots
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-roots-doc-69e8
      - ref-omp-config-layers-doc-69e8
      - ref-omp-config-provider-order-doc-69e8
      - ref-omp-cfg4-sources-natives-dir-code
      - ref-omp-cfg4-sources-natives-dir-doc
      - ref-omp-cfg5-sources-natives-dir-doc-4b5e
      - ref-omp-cfg5-sources-grammars-build-url-doc
      - ref-omp-cfg5-sources-contextfiles-extra-provider-table-doc
      - ref-omp-cfg5-sources-contextfiles-extra-priority-doc
      - ref-omp-cfg5-sources-contextfiles-extra-provider-code
      - ref-omp-cfg5-sources-contextfiles-extra-agentdir-code
  - section_id: config-precedence
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-layers-doc-69e8
      - ref-omp-config-precedence-doc-69e8
      - ref-omp-cfg5-sources-contextfiles-extra-provider-doc
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-layers-doc-69e8
      - ref-omp-config-project-write-doc-69e8
      - ref-omp-cfg5-sources-contextfiles-extra-project-hide-code
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: []
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs:
      - ref-omp-cfg6-defaults-task-structured-code
      - ref-omp-cfg6-defaults-task-agent-soft-request-budget-code
      - ref-omp-cfg6-defaults-task-agent-soft-request-budget-validate-code
      - ref-omp-cfg6-defaults-tui-auto-graph-code
      - ref-omp-cfg6-defaults-tui-auto-graph-doc
      - ref-omp-config-layers-doc-69e8
      - ref-omp-config-scope-loading-doc-69e8
      - ref-omp-cfg4-defaults-compaction-model-thresholds-code
      - ref-omp-cfg4-defaults-compaction-model-thresholds-doc
      - ref-omp-cfg4-defaults-compaction-model-threshold-rules-doc
      - ref-omp-cfg4-defaults-tui-auto-graph-code
      - ref-omp-cfg4-defaults-tui-auto-graph-doc
      - ref-omp-cfg4-defaults-task-agent-account-pools-code
      - ref-omp-cfg4-defaults-task-agent-account-pools-doc
      - ref-omp-cfg4-defaults-title-settings-code
      - ref-omp-cfg4-defaults-title-generator-code
      - ref-omp-cfg4-defaults-title-refresh-on-replan-code
      - ref-omp-cfg4-defaults-title-domain-registered-code
      - ref-omp-cfg5-sources-contextfiles-extra-code
      - ref-omp-cfg5-sources-contextfiles-extra-name-rules-code
  - section_id: config-migration
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-migration-doc-69e8
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-layers-doc-69e8
      - ref-omp-config-project-write-doc-69e8
      - ref-omp-cfg5-diagnostics-extra-names-doc
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-roots
        status: answered
        source_refs:
          - ref-omp-config-roots-doc-69e8
          - ref-omp-config-provider-order-doc-69e8
          - ref-omp-cfg4-sources-natives-dir-code
          - ref-omp-cfg4-sources-natives-dir-doc
          - ref-omp-cfg5-sources-natives-dir-doc-4b5e
          - ref-omp-cfg5-sources-grammars-build-url-doc
          - ref-omp-cfg5-sources-contextfiles-extra-provider-table-doc
          - ref-omp-cfg5-sources-contextfiles-extra-priority-doc
          - ref-omp-cfg5-sources-contextfiles-extra-provider-code
          - ref-omp-cfg5-sources-contextfiles-extra-agentdir-code
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-precedence
        status: answered
        source_refs:
          - ref-omp-config-layers-doc-69e8
          - ref-omp-config-precedence-doc-69e8
          - ref-omp-cfg5-sources-contextfiles-extra-provider-doc
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs:
          - ref-omp-config-layers-doc-69e8
          - ref-omp-config-project-write-doc-69e8
          - ref-omp-cfg5-sources-contextfiles-extra-project-hide-code
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: unknown
        source_refs: []
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: partial
        source_refs:
          - ref-omp-cfg6-defaults-task-structured-code
          - ref-omp-cfg6-defaults-task-agent-soft-request-budget-code
          - ref-omp-cfg6-defaults-task-agent-soft-request-budget-validate-code
          - ref-omp-cfg6-defaults-tui-auto-graph-code
          - ref-omp-cfg6-defaults-tui-auto-graph-doc
          - ref-omp-config-layers-doc-69e8
          - ref-omp-config-scope-loading-doc-69e8
          - ref-omp-cfg4-defaults-compaction-model-thresholds-code
          - ref-omp-cfg4-defaults-compaction-model-thresholds-doc
          - ref-omp-cfg4-defaults-compaction-model-threshold-rules-doc
          - ref-omp-cfg4-defaults-tui-auto-graph-code
          - ref-omp-cfg4-defaults-tui-auto-graph-doc
          - ref-omp-cfg4-defaults-task-agent-account-pools-code
          - ref-omp-cfg4-defaults-task-agent-account-pools-doc
          - ref-omp-cfg4-defaults-title-settings-code
          - ref-omp-cfg4-defaults-title-generator-code
          - ref-omp-cfg4-defaults-title-refresh-on-replan-code
          - ref-omp-cfg4-defaults-title-domain-registered-code
          - ref-omp-cfg5-sources-contextfiles-extra-code
          - ref-omp-cfg5-sources-contextfiles-extra-name-rules-code
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: answered
        source_refs:
          - ref-omp-config-migration-doc-69e8
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs:
          - ref-omp-config-layers-doc-69e8
          - ref-omp-config-project-write-doc-69e8
          - ref-omp-cfg5-diagnostics-extra-names-doc
---
本章材料来自源码修订 69e8c9e 的官方文档 `docs/config-usage.md`，并在 `788cf9ef10c82634b2a685fb2d1455362acf81b9` 与 `4b5e4fb7ea8ec2d37b8b6b138ea01125fe0a17dc` 两个修订上逐节复核（新增引用前缀 `ref-omp-cfg5-`）。相对上一版的实质变化有三处，都由 `4b5e4fb7` 引入：新增 `contextFiles.extra` 设置与其对应的 `custom-context` discovery provider（优先级 9），并新增“项目层提供的名单不读用户 agent 目录”的来源隔离；`PI_NATIVES_DIR` 的官方说明改写为“也搬移下载的 tree-sitter 语法包”；环境变量表新增 `PI_BUILD_URL` 与 `PI_GRAMMARS_URL`。层序、合并规则、写入目标、迁移三步与信任门控缺口沿用上一版的取证，未在本轮重新取证。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。

本版按 `adc7fed5c9d6837d77b590bc313a705e2b4136b0` 再复核一次（新增引用前缀 `ref-omp-cfg6-`）。该 commit 对本章的实质变化只有两处：新增 `task.structured` 与 `task.agentSoftRequestBudget` 两个设置，以及 `tui.autoGraph` 的 `smart` 档描述扩写；**层序、合并规则、运行时覆盖、写入目标、信任边界与迁移路径在该区间都没有改动**，上文相关取证继续成立。`packages/utils/src/dirs.ts` 在同一区间只新增 `getMnemopiEmbedRuntimeDir()`（记忆后端嵌入服务的 state 域运行时目录），`getNativesDir()` 与 `PI_NATIVES_DIR` 的解析未变，因此配置来源一节的结论不变。新增的环境变量（`CLOUDFLARE_API_TOKEN`、`CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` 等）属于 provider 侧而非配置来源入口，按主题归入“自定义 Provider”，本章不重复。

下面的文件与配置示例是固定来源给出的形态，用来说明位置和字段，不代表本轮运行过的配置。

## 配置来源与文件位置 {#config-roots}

`src/config.ts` 固定一组来源优先级：`.omp`（原生）、`.claude`、`.codex`、`.gemini`。用户级基目录是 OMP 原生 agent 目录（默认 `~/.omp/agent`，根目录名由 `PI_CONFIG_DIR` 改写）、Claude 的活动配置目录（默认 `~/.claude`，`CLAUDE_CONFIG_DIR` 改写它）、`~/.codex` 与 `~/.gemini`；项目级是 `<工作目录>` 下的同名四个目录。 [@ref-omp-config-roots-doc-69e8]

两个环境变量作用不同，这是上一版没有区分清楚的一点：`PI_CONFIG_DIR` 改写通用 helper 使用的 OMP 用户根；`PI_CODING_AGENT_DIR` 只影响默认 profile 下 `getAgentDir()` 的消费者（原生发现、设置、运行时状态），不影响通用的 `getConfigDirs()` / `findConfigFile()`，命名 profile 直接忽略它。 [@ref-omp-config-roots-doc-69e8]

跨来源的优先级来自 capability provider 的数值优先级，native 100 最高，依次是 omp-plugins 90、claude 80、agent-plugins 75、codex/agents/claude-plugins 70、gemini 60、opencode 55、cursor/windsurf 50、cline 40、github 30、vscode 20、agents-md/claude-md 10、mcp-json/ssh-json/managed-skills 5、builtin-defaults 1。 [@ref-omp-config-provider-order-doc-69e8]

`4b5e4fb7` 在这张表里插入了第十九个 provider：`custom-context`，优先级 **9**，落在 `agents-md`/`claude-md`（10）与 `mcp-json`/`ssh-json`（5）之间 [@ref-omp-cfg5-sources-contextfiles-extra-priority-doc]。它对应的文件名不写死，而是取自设置 `contextFiles.extra`；未配置时该 provider 贡献为空 [@ref-omp-cfg5-sources-contextfiles-extra-provider-table-doc]。查找位置有三个：与 `agents-md` 同样的项目向上遍历、用户 agent 目录，以及当会话处于 linked worktree 时的主 checkout 根 [@ref-omp-cfg5-sources-contextfiles-extra-provider-table-doc]。注册代码确认了 id、显示名与优先级 [@ref-omp-cfg5-sources-contextfiles-extra-provider-code]。

这个 provider 带一条新的来源隔离规则：`configuredNames()` 用 `cfgContextFilesExtra.provenance(settings) !== "project"` 决定 `includeAgentDir`，因此名单来自项目配置（`.omp/config.yml`）时**不**读用户 agent 目录，仓库无法把 `~/.omp/agent/config.yml` 之类的文件拉进提示 [@ref-omp-cfg5-sources-contextfiles-extra-agentdir-code]。名单为空时 provider 直接返回空结果，且 `boundSettings()` 尚未就绪时 `includeAgentDir` 同为 false [@ref-omp-cfg5-sources-contextfiles-extra-agentdir-code]。

各能力按 scope 从固定位置加载，例如设置能力是 `settings.json` 然后 `config.yml`，托管技能是 `~/.omp/agent/managed-skills/*/SKILL.md` 并经独立的优先级 5 provider 加载。 [@ref-omp-config-scope-loading-doc-69e8]

上一版复核（`788cf9e`）确认**配置读取入口本身未变**：该 commit 对目录解析的改动只覆盖 worktree 基址与原生插件根。`getNativesDir()` 现在接受 `PI_NATIVES_DIR` 覆盖，值会被 trim、`~` 展开并归一化，相对值被忽略，否则回落到 `dirs.rootSubdir("natives", "cache")` [@ref-omp-cfg4-sources-natives-dir-code]；文档把它归在“影响 coding-agent 把数据存在哪里”的环境变量表里，并明确它 **不移动 sessions、plugins 或其它数据**，因此它不是配置来源入口 [@ref-omp-cfg4-sources-natives-dir-doc]。

这条边界在 `4b5e4fb7` 上被收窄了一处：同一行的说明改成了“也搬移下载的 tree-sitter 语法包（`grammars/`）”，仍然不移动 sessions、plugins 或其它数据 [@ref-omp-cfg5-sources-natives-dir-doc-4b5e]。也就是说 `PI_NATIVES_DIR` 依然不是配置来源入口，但它现在多覆盖一类语言语法资产，把它当成纯粹的 addon 暂存根会漏掉语法包。同一张表新增两条与来源位置相关的变量：`PI_BUILD_URL`（独立二进制的下载源 origin，默认 `https://build.stencil.so`，`omp update`、二进制接管与启动时更新检查都查 `{origin}/api/products/omp/latest/{target}?channel=stable|canary`）与 `PI_GRAMMARS_URL`（tree-sitter WebAssembly 语法包基址，落地到 `(natives dir)/grammars`）[@ref-omp-cfg5-sources-grammars-build-url-doc]。两者都是下载来源而不是配置读取入口。

## 层优先级与合并规则 {#config-precedence}

设置的有效优先级从高到低是：定义上声明的环境变量（按设置类型解析，无法解析视为未设置；布尔走 `parseFlag`，空为未设置，`1`/`y`/`true`/`yes`/`on` 为真，其余文本为假）、内存且不持久的运行时覆盖、配置 overlay（`PI_CONFIG_FILES` 的平台路径列表在先，其后是重复的 `omp --config <路径>`，都按 `config.yml` 风格 YAML 加载且只对本进程有效）、经 settings capability 发现的项、全局设置（`~/.omp/agent/config.yml` 与 `config.yaml` 中第一个存在的）、定义默认值。 [@ref-omp-config-layers-doc-69e8]

overlay 列表内后面的文件覆盖前面的，`PI_CONFIG_FILES` 的条目先于 `--config` 文件加载。对象深度合并，标量与数组由高优先层整体替换，高优先层的数组不追加到低优先层数组。 [@ref-omp-config-layers-doc-69e8]

这里有一条上一版没有记录的例外，必须单独记住：settings capability 的项**不**去重，`Settings.#loadProjectSettings()` 按返回顺序深合并，后面的项覆盖前面的；而 provider 是从高优先级往低优先级访问的，因此低优先级 provider 的项目设置可以覆盖高优先级 provider 的设置。同一 native provider 内部，项目 `config.yml` 在后并覆盖 `settings.json`，随后 `.omp/config.yml` 的模型角色会作为权威的项目模型角色层重新应用。 [@ref-omp-config-precedence-doc-69e8]

`contextFiles.extra` 沿用同一条数组规则，而不是追加：高优先层替换整个列表 [@ref-omp-cfg5-sources-contextfiles-extra-provider-doc]。所以在全局 `config.yml` 列了三个名字、在项目 `.omp/config.yml` 只列一个时，项目会话里生效的就是那一个，全局另外两个不参与。

一份全局文件与一份项目文件：

```yaml
# ~/.omp/agent/config.yml
tools:
  approval:
    bash: prompt
    read: allow
disabledProviders:
  - anthropic
  - openai
```

```yaml
# 项目 .omp/config.yml
tools:
  approval:
    bash: allow
disabledProviders:
  - groq
```

在该项目里生效的结果是 `tools.approval.bash` 变成 `allow`，`tools.approval.read` 保留全局的 `allow`，而 `disabledProviders` 被项目数组整体替换成只剩 `groq`，全局列出的 anthropic、openai 在这个项目里重新可用。要在一个项目里追加禁用项，必须把全局的 ID 也在项目数组里重写一遍。 [@ref-omp-config-layers-doc-69e8]

## 运行时覆盖与写入目标 {#config-runtime}

运行时覆盖写在内存层，不持久化，来源是 CLI 标志、`PI_CONFIG_FILES` / `--config` overlay、以及子代理收到的 `parent.overlay(overrides)`——子代理的读取穿透到父层实时值，而覆盖与后续写入留在子层且永不持久化。 [@ref-omp-config-layers-doc-69e8]

写入目标本版写得很明确：通用设置句柄的写入目标是全局层，config overlay 是只读的。模型角色有专门的项目写 API，`setProjectModelRole()` / `clearProjectModelRole()` 更新项目层并只把变更的角色持久化到 `<工作目录>/.omp/config.yml`；若已有运行时覆盖会遮蔽该角色，设置项目角色会临时替换它，清除时移除该运行时槽，原覆盖被捕获以便恢复。 [@ref-omp-config-project-write-doc-69e8]

`contextFiles.extra` 的面板编辑器因此被条件隐藏：`/settings` → Context → Extra Context Files 的那一行只在 `cfgContextFilesExtra.provenance(s) !== "project"` 时显示，理由写进注释——编辑器写的是全局层，项目的名单不该被提升成全局值 [@ref-omp-cfg5-sources-contextfiles-extra-project-hide-code]。这项的 UI 定义用 `editor: "json"`（设置在 Context 页签、General 组），是这类“数组无 UI 选项”设置的少数例外 [@ref-omp-cfg5-sources-contextfiles-extra-code]。改动后需要新开会话才会加载更新的文件 [@ref-omp-cfg5-sources-contextfiles-extra-provider-doc]。

还有两条协议默认值的软钉住规则：带 `protocolDefault: ["rpc", "acp"]` 的定义在启动时由 `applyProtocolDefaults` 把默认值钉为软运行时覆盖（已配置则不动），并由该设置的 `set`/`unset`/`setEntry`/`setMember`、发现持久层配置的 reload、或 re-scope/clone 进配置了它的项目来释放。 [@ref-omp-config-layers-doc-69e8]

## 信任边界 {#config-trust}

本章未找到项目信任或组织策略门控配置读取的直接机制。已检查的直接入口是来源目录顺序、provider 优先级与设置层序列；是否存在信任门控仍未确认，属明确缺口，不能据此断言不存在。

`4b5e4fb7` 新增的来源隔离不是信任机制：`includeAgentDir` 判定与面板隐藏条件都只按该设置键的 provenance 是否为 `project` 分支 [@ref-omp-cfg5-sources-contextfiles-extra-agentdir-code]，源码与文档都把动机写成“不要让仓库把自己的名单带进你的全局配置 / 把 `~/.omp/agent` 的文件拉进提示”，没有出现用户确认、目录白名单或组织策略 [@ref-omp-cfg5-sources-contextfiles-extra-provider-doc]。因此本节结论不变，仍为 `unknown`。

## 默认值与功能开关 {#config-defaults}

默认值来自每个设置的定义；没有更高层配置时取该默认值。定义也可以声明 `env: { name, fallback: true }`，此时该变量只替换默认值，任何配置了非空值的层都压过它（`SEARXNG_BASIC_*` 用这一形态）；`fallback: "blank"` 让变量还能压过已配置的空串或纯空白（`SEARXNG_ENDPOINT`、`SEARXNG_TOKEN`、`MNEMOPI_EMBEDDING_MODEL`）。 [@ref-omp-config-layers-doc-69e8]

托管技能的加载是另一类容易误判的默认值：发现是无条件的，`autolearn.enabled` 只管写入与提醒，不管加载，且其它 provider 的作者技能在同名时胜出。 [@ref-omp-config-scope-loading-doc-69e8]

本轮在 `4b5e4fb7` 上补齐的是 `contextFiles.extra` 的默认值与校验，它定义在 `packages/coding-agent/src/session/context-settings.ts`：`type: "array"`、默认 `EMPTY_STRING_ARRAY`（空列表，即默认不发现任何额外文件）[@ref-omp-cfg5-sources-contextfiles-extra-code]。

| 设置 | 类型 | 默认值 | 取证 |
|---|---|---|---|
| `contextFiles.extra` | array | `[]` | [@ref-omp-cfg5-sources-contextfiles-extra-code] |

校验规则是这一轮唯一可确证的“默认值改变生效结果”的新机制，在加载设置时抛错而非静默丢弃 [@ref-omp-cfg5-sources-contextfiles-extra-code]：值不是数组报 “must be a list of file names”；条目不是字符串、空串、或含 `/`、`\`、`\0`、`.`、`..` 的一律按“不是文件名的路径”拒绝；四个内置名 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`copilot-instructions.md`（大小写不敏感）被拒绝，因为它们已有 provider，列进来会重复加载或绕过遮蔽 [@ref-omp-cfg5-sources-contextfiles-extra-name-rules-code]。文档侧同一段还写明：这是硬编码 `.local.md` 兄弟文件发现的配置化替代，未设置列表就什么也不发现 [@ref-omp-cfg5-sources-contextfiles-extra-provider-doc]。

`4b5e4fb7` 之后新增文件不改既有设置的取值：额外文件是 additive 的，不占用每层唯一槽，同层时排在胜出文件之后注入；空文件不贡献内容，父目录名以 `.` 开头的路径被跳过 [@ref-omp-cfg5-sources-contextfiles-extra-provider-doc]。开关口径上，单个名字用 `disabledExtensions`（`context-file:project:AGENTS.local.md` 或 `context-file:user:AGENTS.local.md`）关掉，整个 provider 用 `disabledProviders: [custom-context]` 关掉 [@ref-omp-cfg5-sources-contextfiles-extra-provider-doc]。

上一版在 `788cf9e` 上记录的新增设置默认值保持不变，逐项对照文档表格与 `register()` 定义：

| 设置 | 类型 | 默认值 | 取证 |
|---|---|---|---|
| `compaction.modelThresholds` | record | `{}` | [@ref-omp-cfg4-defaults-compaction-model-thresholds-code][@ref-omp-cfg4-defaults-compaction-model-thresholds-doc] |
| `compaction.modelThresholdsEnabled` | boolean | `true` | 同上 |
| `tui.autoGraph` | enum `smart`/`always`/`off` | `always` | [@ref-omp-cfg4-defaults-tui-auto-graph-code][@ref-omp-cfg4-defaults-tui-auto-graph-doc] |
| `task.agentAccountPools` | record | `{}` | [@ref-omp-cfg4-defaults-task-agent-account-pools-code][@ref-omp-cfg4-defaults-task-agent-account-pools-doc] |
| `title.icons` | enum | `nf+emoji` | [@ref-omp-cfg4-defaults-title-settings-code] |
| `title.generator` | enum `fork`/`tiny` | `fork` | [@ref-omp-cfg4-defaults-title-generator-code] |
| `title.refreshOnReplan` | boolean | `true` | [@ref-omp-cfg4-defaults-title-refresh-on-replan-code] |

`title.*` 是上一版新接入注册的设置域：`packages/coding-agent/src/config/all-settings.ts` 把 `../utils/title-settings` 加进 `DOMAINS` 列表，与其它设置域一样被聚合 [@ref-omp-cfg4-defaults-title-domain-registered-code]。

`adc7fed5` 新增两个 `task.*` 设置，取证来自 `packages/coding-agent/src/task/settings.ts` 的 `register()` 定义：

| 设置 | 类型 | 默认值 | 取证 |
|---|---|---|---|
| `task.structured` | boolean | `false` | [@ref-omp-cfg6-defaults-task-structured-code] |
| `task.agentSoftRequestBudget` | record | `{}` | [@ref-omp-cfg6-defaults-task-agent-soft-request-budget-code] |

`task.structured` 关着时，task 子代理没有 yield 工具、以最终消息原文返回；开着才把 `outputSchema`/`schemaMode` 暴露到 task 工具上，并让子代理结果经 yield 工具按调用方或 agent 的 schema 校验 [@ref-omp-cfg6-defaults-task-structured-code]。一个例外写在同一段描述里：**eval 的 `agent()`/`workpool` spawn 始终保留结构化结果**，不受这个开关影响 [@ref-omp-cfg6-defaults-task-structured-code]。`docs/settings.md` 在本 commit 上没有这个键的表格行，因此它是先有注册定义、后补文档的设置——读者在 `omp config list` 里能看到它，但官方设置表格里查不到。

`task.agentSoftRequestBudget` 的注册块给出类型 `record`、默认值 `EMPTY_AGENT_SOFT_REQUEST_BUDGET`（即空 map）与校验入口 [@ref-omp-cfg6-defaults-task-agent-soft-request-budget-code]；校验器本身规定值必须是非负安全整数，`0` 关掉该 agent 的守卫，`null` 条目清掉低优先层继承来的值，值不是 map 或条目不是非负整数时在加载设置阶段抛错而非静默丢弃 [@ref-omp-cfg6-defaults-task-agent-soft-request-budget-validate-code]。它与既有 `task.agentCompactionThresholdOverrides`、`task.agentAccountPools` 是同一种 per-agent 覆盖形态（精确名 + `null` 清除），所以按层合并时沿用同一套规则：一个 `null` 条目清除低优先层的同名条目，非空条目整体替换。

`tui.autoGraph` 的**枚举取值与默认值没有变**（仍是 `smart`/`always`/`off`，默认 `always`），变的是 `smart` 这一档的描述：文档与代码两侧都从“judge 模型挑图表种类和列”扩成“judge 模型精修每一张图——种类、列、行名与分组、刻度与参考行、每个度量哪边更好、焦点行以及标题”，适用面也从“有若干数值列的表”扩到“有若干数值列**或有编号行**的表” [@ref-omp-cfg6-defaults-tui-auto-graph-doc][@ref-omp-cfg6-defaults-tui-auto-graph-code]。默认值层面的作用范围不变：`always` 只作用于主会话的 TUI，子代理 transcript、print、RPC 与 ACP 输出保持纯文本 [@ref-omp-cfg6-defaults-tui-auto-graph-doc]。

`compaction.modelThresholds` 的生效条件同样值得单独记住，因为它们不是单纯的“取不到就用默认”：命中时它**取代** `compaction.threshold*` 对该模型的作用，键是精确 `provider/model-id` 或以 `*` 结尾的前缀（只有最长匹配前缀生效，`*` 只能出现在末尾，每个键都必须带 `provider/`），而某 agent 一旦有 `task.agentCompactionThresholdOverrides` 条目，子代理派生时就把 `modelThresholdsEnabled` 置为该 agent 的关闭态，使 per-agent 条目压过所有模型条目（含运行期间新增的）[@ref-omp-cfg4-defaults-compaction-model-threshold-rules-doc]。

缺口：功能开关与平台差异的完整清单、以及各自如何改变生效结果，本章未逐项取证，属部分结论。 [@ref-omp-config-layers-doc-69e8]

## 旧格式迁移 {#config-migration}

迁移仍然在文档里，而且不是残留的旁注，标题就是 “Migration behavior still active”。触发条件很窄：启动时只有当全局 `config.yml` 与 `config.yaml` 都不存在才走；一旦你已经有全局 `config.yml`，这一步就不会运行，旧文件也不会被合并进来。 [@ref-omp-config-migration-doc-69e8]

三步按顺序执行：先从 `~/.omp/agent/settings.json` 迁移，成功后把该文件重命名为 `.bak`；再与 `agent.db` 里的遗留 DB 设置合并，冲突时以 DB 值为准；最后把合并结果写入 `config.yml`。 [@ref-omp-config-migration-doc-69e8]

此外 `#migrateRawSettings` 还做字段级改名，共两条：扁平的 `queueMode` 改为 `steeringMode`，扁平的 `theme: "..."` 改为 `theme.dark` / `theme.light` 结构。 [@ref-omp-config-migration-doc-69e8]

两点使用上的后果：因为合并规则是 DB 值优先，想丢掉旧 DB 设置的某个键就不能指望删除 `settings.json` 就能生效；同时这套流程只写 `config.yml`，不会回写 `config.yaml`，若两者都不存在则生成 `config.yml`。 [@ref-omp-config-migration-doc-69e8]

`4b5e4fb7` 未触及迁移路径：`settings.json` → DB 合并 → 写 `config.yml` 的三步与两条字段改名在该区间没有改动记录，`contextFiles.extra` 是纯新增键，不参与旧格式改名。

## 诊断与实际生效来源 {#config-diagnostics}

回答“文件已写但没有生效”时，先按层序逐层排除：环境变量层的布尔要用 `parseFlag` 解析、`false` 之类的文本是真的被当作关闭；overlay 层按 `PI_CONFIG_FILES` 在前、`--config` 在后的顺序，后面的覆盖前面的；项目层要同时看 `settings.json` 与 `config.yml` 的相对顺序；最后才是全局文件与默认值。 [@ref-omp-config-layers-doc-69e8]

写入方向也要分清：想改全局配置就用通用设置写入；想在项目里改模型角色必须走 `setProjectModelRole()` / `clearProjectModelRole()`，因为通用写入只落全局层、直接改项目 `config.yml` 里的 `modelRoles` 不属于文档给出的写入路径。 [@ref-omp-config-project-write-doc-69e8]

对 `contextFiles.extra`，官方排查清单新增了一条对应项：不在 `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`copilot-instructions.md` 之列的名字，只有写进 `contextFiles.extra` 才会被发现；会话在 linked worktree 时，除非设了该设置，否则看不到主 checkout 里的那份，因为常规遍历停在 worktree [@ref-omp-cfg5-diagnostics-extra-names-doc]。这是“文件存在但没进提示”的第一顺位解释，优先于层序排查。
