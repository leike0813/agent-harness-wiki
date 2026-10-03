---
schema_version: 3
record_kind: production
edition_id: omp-configuration-v3
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
  - section_id: config-precedence
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-layers-doc-69e8
      - ref-omp-config-precedence-doc-69e8
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-layers-doc-69e8
      - ref-omp-config-project-write-doc-69e8
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: []
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-layers-doc-69e8
      - ref-omp-config-scope-loading-doc-69e8
  - section_id: config-migration
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-migration-doc-69e8
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-layers-doc-69e8
      - ref-omp-config-project-write-doc-69e8
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-roots
        status: answered
        source_refs:
          - ref-omp-config-roots-doc-69e8
          - ref-omp-config-provider-order-doc-69e8
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-precedence
        status: answered
        source_refs:
          - ref-omp-config-layers-doc-69e8
          - ref-omp-config-precedence-doc-69e8
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs:
          - ref-omp-config-layers-doc-69e8
          - ref-omp-config-project-write-doc-69e8
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
          - ref-omp-config-layers-doc-69e8
          - ref-omp-config-scope-loading-doc-69e8
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
---
本章材料来自源码修订 69e8c9e 的官方文档 `docs/config-usage.md`。来源优先级、层序、合并规则、写入目标与 provider 数值优先级都取自该修订的文档正文；上一版引用的包内 `src/config/settings.ts` 与 `src/commands/config.ts` 不在本轮取证范围内。相对上一版的变化是实质性的：层序被明确写成六级具名序列并区分 `PI_CONFIG_DIR` 与 `PI_CODING_AGENT_DIR`，设置层不再去重因而低优先级 provider 可以覆盖高优先级项目设置。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。

下面的文件与配置示例是固定来源给出的形态，用来说明位置和字段，不代表本轮运行过的配置。

## 配置来源与文件位置 {#config-roots}

`src/config.ts` 固定一组来源优先级：`.omp`（原生）、`.claude`、`.codex`、`.gemini`。用户级基目录是 OMP 原生 agent 目录（默认 `~/.omp/agent`，根目录名由 `PI_CONFIG_DIR` 改写）、Claude 的活动配置目录（默认 `~/.claude`，`CLAUDE_CONFIG_DIR` 改写它）、`~/.codex` 与 `~/.gemini`；项目级是 `<工作目录>` 下的同名四个目录。 [@ref-omp-config-roots-doc-69e8]

两个环境变量作用不同，这是上一版没有区分清楚的一点：`PI_CONFIG_DIR` 改写通用 helper 使用的 OMP 用户根；`PI_CODING_AGENT_DIR` 只影响默认 profile 下 `getAgentDir()` 的消费者（原生发现、设置、运行时状态），不影响通用的 `getConfigDirs()` / `findConfigFile()`，命名 profile 直接忽略它。 [@ref-omp-config-roots-doc-69e8]

跨来源的优先级来自 capability provider 的数值优先级，native 100 最高，依次是 omp-plugins 90、claude 80、agent-plugins 75、codex/agents/claude-plugins 70、gemini 60、opencode 55、cursor/windsurf 50、cline 40、github 30、vscode 20、agents-md/claude-md 10、mcp-json/ssh-json/managed-skills 5、builtin-defaults 1。 [@ref-omp-config-provider-order-doc-69e8]

各能力按 scope 从固定位置加载，例如设置能力是 `settings.json` 然后 `config.yml`，托管技能是 `~/.omp/agent/managed-skills/*/SKILL.md` 并经独立的优先级 5 provider 加载。 [@ref-omp-config-scope-loading-doc-69e8]

## 层优先级与合并规则 {#config-precedence}

设置的有效优先级从高到低是：定义上声明的环境变量（按设置类型解析，无法解析视为未设置；布尔走 `parseFlag`，空为未设置，`1`/`y`/`true`/`yes`/`on` 为真，其余文本为假）、内存且不持久的运行时覆盖、配置 overlay（`PI_CONFIG_FILES` 的平台路径列表在先，其后是重复的 `omp --config <路径>`，都按 `config.yml` 风格 YAML 加载且只对本进程有效）、经 settings capability 发现的项、全局设置（`~/.omp/agent/config.yml` 与 `config.yaml` 中第一个存在的）、定义默认值。 [@ref-omp-config-layers-doc-69e8]

overlay 列表内后面的文件覆盖前面的，`PI_CONFIG_FILES` 的条目先于 `--config` 文件加载。对象深度合并，标量与数组由高优先层整体替换，高优先层的数组不追加到低优先层数组。 [@ref-omp-config-layers-doc-69e8]

这里有一条上一版没有记录的例外，必须单独记住：settings capability 的项**不**去重，`Settings.#loadProjectSettings()` 按返回顺序深合并，后面的项覆盖前面的；而 provider 是从高优先级往低优先级访问的，因此低优先级 provider 的项目设置可以覆盖高优先级 provider 的设置。同一 native provider 内部，项目 `config.yml` 在后并覆盖 `settings.json`，随后 `.omp/config.yml` 的模型角色会作为权威的项目模型角色层重新应用。 [@ref-omp-config-precedence-doc-69e8]

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

还有两条协议默认值的软钉住规则：带 `protocolDefault: ["rpc", "acp"]` 的定义在启动时由 `applyProtocolDefaults` 把默认值钉为软运行时覆盖（已配置则不动），并由该设置的 `set`/`unset`/`setEntry`/`setMember`、发现持久层配置的 reload、或 re-scope/clone 进配置了它的项目来释放。 [@ref-omp-config-layers-doc-69e8]

## 信任边界 {#config-trust}

本章未找到项目信任或组织策略门控配置读取的直接机制。已检查的直接入口是来源目录顺序、provider 优先级与设置层序列；是否存在信任门控仍未确认，属明确缺口，不能据此断言不存在。

## 默认值与功能开关 {#config-defaults}

默认值来自每个设置的定义；没有更高层配置时取该默认值。定义也可以声明 `env: { name, fallback: true }`，此时该变量只替换默认值，任何配置了非空值的层都压过它（`SEARXNG_BASIC_*` 用这一形态）；`fallback: "blank"` 让变量还能压过已配置的空串或纯空白（`SEARXNG_ENDPOINT`、`SEARXNG_TOKEN`、`MNEMOPI_EMBEDDING_MODEL`）。 [@ref-omp-config-layers-doc-69e8]

托管技能的加载是另一类容易误判的默认值：发现是无条件的，`autolearn.enabled` 只管写入与提醒，不管加载，且其它 provider 的作者技能在同名时胜出。 [@ref-omp-config-scope-loading-doc-69e8]

缺口：功能开关与平台差异的完整清单、以及各自如何改变生效结果，本章未逐项取证，属部分结论。 [@ref-omp-config-layers-doc-69e8]

## 旧格式迁移 {#config-migration}

迁移仍然在文档里，而且不是残留的旁注，标题就是 “Migration behavior still active”。触发条件很窄：启动时只有当全局 `config.yml` 与 `config.yaml` 都不存在才走；一旦你已经有全局 `config.yml`，这一步就不会运行，旧文件也不会被合并进来。 [@ref-omp-config-migration-doc-69e8]

三步按顺序执行：先从 `~/.omp/agent/settings.json` 迁移，成功后把该文件重命名为 `.bak`；再与 `agent.db` 里的遗留 DB 设置合并，冲突时以 DB 值为准；最后把合并结果写入 `config.yml`。 [@ref-omp-config-migration-doc-69e8]

此外 `#migrateRawSettings` 还做字段级改名，共两条：扁平的 `queueMode` 改为 `steeringMode`，扁平的 `theme: "..."` 改为 `theme.dark` / `theme.light` 结构。 [@ref-omp-config-migration-doc-69e8]

两点使用上的后果：因为合并规则是 DB 值优先，想丢掉旧 DB 设置的某个键就不能指望删除 `settings.json` 就能生效；同时这套流程只写 `config.yml`，不会回写 `config.yaml`，若两者都不存在则生成 `config.yml`。 [@ref-omp-config-migration-doc-69e8]

## 诊断与实际生效来源 {#config-diagnostics}

回答“文件已写但没有生效”时，先按层序逐层排除：环境变量层的布尔要用 `parseFlag` 解析、`false` 之类的文本是真的被当作关闭；overlay 层按 `PI_CONFIG_FILES` 在前、`--config` 在后的顺序，后面的覆盖前面的；项目层要同时看 `settings.json` 与 `config.yml` 的相对顺序；最后才是全局文件与默认值。 [@ref-omp-config-layers-doc-69e8]

写入方向也要分清：想改全局配置就用通用设置写入；想在项目里改模型角色必须走 `setProjectModelRole()` / `clearProjectModelRole()`，因为通用写入只落全局层、直接改项目 `config.yml` 里的 `modelRoles` 不属于文档给出的写入路径。 [@ref-omp-config-project-write-doc-69e8]
