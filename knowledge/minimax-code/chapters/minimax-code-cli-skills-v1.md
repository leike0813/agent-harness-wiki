---
schema_version: 3
record_kind: production
edition_id: minimax-code-cli-skills-v1
harness_id: minimax-code
topic: skills
title: "MiniMax Code CLI 的 Skills：根目录、发现、格式、调用与诊断"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-minimax-code-skills-roots-order, ref-minimax-code-skills-roots-external, ref-minimax-code-skills-builtin-candidates, ref-minimax-code-skills-config-defaults]
  - section_id: skills-discovery-collision
    surface_ids: [cli]
    source_refs: [ref-minimax-code-skills-watch, ref-minimax-code-skills-listfiles, ref-minimax-code-tui-capabilities-skills, ref-minimax-code-skills-precedence, ref-minimax-code-skills-visibility]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-minimax-code-skills-frontmatter, ref-minimax-code-skills-precedence, ref-minimax-code-skills-lint, ref-minimax-code-skills-plugin-reader, ref-minimax-code-skills-config-defaults, ref-minimax-code-skills-evolve-auto]
  - section_id: skills-loading-invocation
    surface_ids: [cli]
    source_refs: [ref-minimax-code-skills-catalog-render, ref-minimax-code-skills-spi, ref-minimax-code-skills-catalog-budget, ref-minimax-code-skills-catalog-inject, ref-minimax-code-skills-tool-def, ref-minimax-code-skills-tool-output, ref-minimax-code-skills-files-api, ref-minimax-code-skills-slash, ref-minimax-code-skills-acp, ref-minimax-code-doc-skills-mcp, ref-minimax-code-skills-enabled, ref-minimax-code-skills-plugin-state]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-minimax-code-skills-visibility, ref-minimax-code-skills-plugin-state, ref-minimax-code-skills-builtin-candidates, ref-minimax-code-skills-enabled, ref-minimax-code-skills-spi]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-minimax-code-skills-precedence, ref-minimax-code-skills-frontmatter, ref-minimax-code-skills-slash, ref-minimax-code-skills-watcher-shared, ref-minimax-code-skills-watch, ref-minimax-code-skills-catalog-budget, ref-minimax-code-doc-config-checks]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-minimax-code-skills-roots-order, ref-minimax-code-skills-roots-external, ref-minimax-code-skills-builtin-candidates, ref-minimax-code-skills-config-defaults]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: answered
        source_refs: [ref-minimax-code-skills-watch, ref-minimax-code-skills-listfiles, ref-minimax-code-tui-capabilities-skills, ref-minimax-code-skills-precedence, ref-minimax-code-skills-visibility]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: answered
        source_refs: [ref-minimax-code-skills-watch, ref-minimax-code-skills-listfiles, ref-minimax-code-tui-capabilities-skills, ref-minimax-code-skills-precedence, ref-minimax-code-skills-visibility]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-minimax-code-skills-frontmatter, ref-minimax-code-skills-precedence, ref-minimax-code-skills-lint, ref-minimax-code-skills-plugin-reader, ref-minimax-code-skills-config-defaults, ref-minimax-code-skills-evolve-auto]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-minimax-code-skills-frontmatter, ref-minimax-code-skills-precedence, ref-minimax-code-skills-lint, ref-minimax-code-skills-plugin-reader, ref-minimax-code-skills-config-defaults, ref-minimax-code-skills-evolve-auto]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-minimax-code-skills-catalog-render, ref-minimax-code-skills-spi, ref-minimax-code-skills-catalog-budget, ref-minimax-code-skills-catalog-inject, ref-minimax-code-skills-tool-def, ref-minimax-code-skills-tool-output, ref-minimax-code-skills-files-api, ref-minimax-code-skills-slash, ref-minimax-code-skills-acp, ref-minimax-code-doc-skills-mcp, ref-minimax-code-skills-enabled, ref-minimax-code-skills-plugin-state]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-minimax-code-skills-catalog-render, ref-minimax-code-skills-spi, ref-minimax-code-skills-catalog-budget, ref-minimax-code-skills-catalog-inject, ref-minimax-code-skills-tool-def, ref-minimax-code-skills-tool-output, ref-minimax-code-skills-files-api, ref-minimax-code-skills-slash, ref-minimax-code-skills-acp, ref-minimax-code-doc-skills-mcp, ref-minimax-code-skills-enabled, ref-minimax-code-skills-plugin-state]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: answered
        source_refs: [ref-minimax-code-skills-visibility, ref-minimax-code-skills-plugin-state, ref-minimax-code-skills-builtin-candidates, ref-minimax-code-skills-enabled, ref-minimax-code-skills-spi]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-minimax-code-skills-precedence, ref-minimax-code-skills-frontmatter, ref-minimax-code-skills-slash, ref-minimax-code-skills-watcher-shared, ref-minimax-code-skills-watch, ref-minimax-code-skills-catalog-budget, ref-minimax-code-doc-config-checks]
---

MiniMax Code CLI 的技能机制是一套文件系统注册表：宿主按有序的根目录列表扫描 `SKILL.md`，把「名称 + 描述」渲染成技能目录注入系统提示词，正文只在被调用时由宿主自有的 `skill` 工具读取 [@ref-minimax-code-skills-tool-def]。当前检出里同时存在两套栈：`packages/agent-modules/skills` 与 `packages/local-runtime/src/skills` 组成的 V1 注册表，以及在其之上叠加插件技能（运行时名为「插件名:技能名」）的 V2 路径 [@ref-minimax-code-skills-plugin-reader]。本章固定来源是 `MiniMax-AI/MiniMax-Code` 仓库 commit `c8a39a5` 上的 `packages/agent-modules/skills`、`packages/local-runtime/src/skills`、`packages/local-runtime-v2/src/service/plugin-system/skill`、`packages/agent-tools/src/desktop` 与 `docs/tui-capabilities.md`，以及官方 CLI 文档 `configuration`、`features` 的快照。

## 技能根目录 {#skills-roots}

扫描根按固定顺序组装，再按「种类 + 规范化路径 + 作用域」去重 [@ref-minimax-code-skills-roots-order]：

| 顺序 | 根目录 | 来源开关 |
| --- | --- | --- |
| 1 | 工作区 `.minimax/skills`、`.claude/skills`、`.agents/skills` | `skills.external` 及各来源 `enabled` |
| 2 | 用户 `~/.claude/skills`、`~/.codex/skills`、`~/.agents/skills` | 同上 |
| 3 | 代理用户目录 `<数据目录>/agents/<代理名>/skills` | 规范代理优先级 100，兼容旧代理 90 |
| 4 | 用户全局 `<数据目录>/skills` | 始终扫描 |
| 5 | 播种的内置技能 `<数据目录>/.builtin-skills` | 优先级 20 |
| 6 | 随包内置的代理技能与全局技能资产目录 | 优先级 10 或 0 |

- 工作区根目录支持向上查找（`walkUp`），越靠近工作区的目录在同优先级下优先 [@ref-minimax-code-skills-roots-external]。
- 内置资产目录的候选顺序包含环境变量覆盖（`MAVIS_BUILTIN_SKILLS_DIR`、`MAVIS_BUILTIN_AGENTS_DIR`），再回落到包内 `assets/skills` 与仓库布局路径 [@ref-minimax-code-skills-builtin-candidates]。
- 外部来源的优先级默认值：`workspace-minimax` 65、`workspace-cc` 60、`workspace-agents` 55、`user-cc` 40、`user-codex` 35、`user-agents` 30，且 `duplicateWarn` 只控制诊断输出，可见名册仍只保留优先级胜者 [@ref-minimax-code-skills-config-defaults]。

```yaml
# 依据 packages/config/src/skills-config.ts 的默认值与解析器
skills:
  external:
    enabled: true
    walkUp: true
    sources:
      workspace-cc:
        enabled: true
        priority: 60
```

## 发现与同名冲突 {#skills-discovery-collision}

- 发现由注册表刷新触发，并在每次文件监视器触发或显式 `refresh()` 时重跑 [@ref-minimax-code-skills-watch]。
- **深度只有一层**：只读取根目录的直接子目录，并在其中查找 `SKILL.md`；嵌套目录（例如 `references/`、`scripts/`）是资源而不是新技能 [@ref-minimax-code-skills-listfiles]。
- 只有目录或符号链接会被当作候选；`SKILL.md` 必须是普通文件，符号链接形式的 `SKILL.md` 会被拒绝 [@ref-minimax-code-skills-listfiles]；官方能力文档记录了同样的边界（技能来源目录与符号链接限制）[@ref-minimax-code-tui-capabilities-skills]。
- 文件只有在「位置 + dev + ino + size + mtime」变化时才重新读取；stat 与读之间发生变化的文件会被推迟并记 `skill_changed_during_read` [@ref-minimax-code-skills-watch]。
- 同名冲突按解析后的技能名分组，胜者由排序决定：来源等级（project 0、workspace 1、agent 2、global/user 3、builtin 4）→ 显式根优先级（高者胜）→ 名称 → 位置 URI [@ref-minimax-code-skills-precedence]。
- 落选者不会被静默丢弃：它们作为 `losers` 出现在注册表视图与导出中，理由形如「被某来源的某路径遮蔽」 [@ref-minimax-code-skills-precedence]。
- 代理作用域的旧根若在多个可见代理下同时存在，读/删会以 `AMBIGUOUS_SKILL_NAME` 失败，且这些名字被排除出目录 [@ref-minimax-code-skills-visibility]。

## SKILL.md 格式与专有字段 {#skills-format}

- frontmatter 必须由首行 `---` 开始并以 `---` 行闭合；未闭合记错误 `frontmatter_unclosed`，YAML 非法记警告并保留正文 [@ref-minimax-code-skills-frontmatter]。
- 只保留标量顶层值；识别字段包括 `name`（缺失即错误并丢弃条目）、`description`（缺失只告警）、`title`、`listed`（`false` 时从注入中隐藏）、`requiresBeta`/`requires_beta`、以及嵌套的语言映射 `displayNames`/`descriptions` [@ref-minimax-code-skills-frontmatter]。
- 名称来源：frontmatter 的 `name`，否则回落到目录名 [@ref-minimax-code-skills-precedence]。
- 正文是闭合 `---` 之后的全部内容，其中的 `{{DATA_DIR}}` 占位符会被替换为数据目录 [@ref-minimax-code-skills-frontmatter]。
- **没有** `allowed-tools`、`argument-hint`、`model`、`disable-model-invocation` 的解析：技能拿的是自由指令而不是类型化参数；随包分发的技能 linter 还把 `allowed-tools`、`license`、`model` 列为禁用字段 [@ref-minimax-code-skills-lint]。
- 插件/代理技能走更严格的解析：frontmatter 必填、`name` 与 `description` 必填；代理技能形态会额外校验可选的 `license`、`allowed-tools`、`compatibility`（1–500 字符）与字符串映射 `metadata` [@ref-minimax-code-skills-plugin-reader]。
- 专有配置项：`skills.external`（开关、walkUp、重复告警、各来源开关与优先级）[@ref-minimax-code-skills-config-defaults]；`skillEvolve`（会话内扫描、生命周期与提案设置），当所有已配置模型都以禁用前缀开头时自动置为关闭 [@ref-minimax-code-skills-evolve-auto]。

## 加载与调用 {#skills-loading-invocation}

- 模型可见的只是目录：V1 渲染为 `available_skills` 块，逐条给出「名称 + 描述」[@ref-minimax-code-skills-catalog-render]；SPI 渲染器给出「名称 + 描述 + location_uri」并由宿主包裹成同样的块 [@ref-minimax-code-skills-spi]。
- 目录是**预算受限**的：上限 5000 token 且不超过上下文窗口的 2%，描述上限 1024 码点；`mcode-tools-master` 与 `minimax-code-product` 为受保护项，预算不足时按档位截断并给出提示 [@ref-minimax-code-skills-catalog-budget]。
- 渲染结果作为系统提示词的一层注入（层级标记为 SKILLS） [@ref-minimax-code-skills-catalog-inject]。
- 模型侧调用靠宿主自有的 `skill` 工具，参数是精确的技能名；工具描述要求「用户显式点名或目录中名称与描述明显匹配时才加载」，并保留 `plugin:skill` 前缀 [@ref-minimax-code-skills-tool-def]。
- 正文返回形式为「`# Skill: 名称` + 位置 + 内容」 [@ref-minimax-code-skills-tool-output]。
- 资源通过技能目录内受限的文件 API 读取：递归列出目录、逐文件读取，路径必须落在技能目录内且拒绝点文件 [@ref-minimax-code-skills-files-api]。
- 用户侧：TUI 把每个已启用技能注册成斜杠命令，`invocationKind` 为 skill，用法为 `/技能名 [指令]`，且内置命令名始终优先 [@ref-minimax-code-skills-slash]。
- ACP 侧通过 `available_commands_update` 发布技能命令，名称保留 `a-z0-9._-` 与可选的 `:片段` 形式（即 `plugin:skill`） [@ref-minimax-code-skills-acp]。
- `/skills [filter]` 在 TUI 与 ACP 都用于检索；官方文档说明可用条目取决于数据目录、项目与宿主 [@ref-minimax-code-doc-skills-mcp]。
- 启用/禁用按位置 URI 记录，禁用的 URI 从列表、目录与读取中一律过滤；删除会清掉禁用记录 [@ref-minimax-code-skills-enabled]；V2 路径把禁用状态持久化到偏好键 `standalone-skill-disabled-state` [@ref-minimax-code-skills-plugin-state]。

## 生效条件 {#skills-conditions}

- 代理作用域：代理类根只对其所属代理与兼容名可见；当所有者实例无法核实时整类根被排除 [@ref-minimax-code-skills-visibility]。
- beta 门控：`requiresBeta` 指向的开关必须在 `betaFlags` 中为真，否则该技能被丢弃 [@ref-minimax-code-skills-visibility]。
- 能力白名单：代理档案的技能选择与「内置技能名集合」共同限定可见技能；由能力独占的技能不能直接被列入 [@ref-minimax-code-skills-visibility]。
- 插件状态：只有**已启用**插件的技能会进入目录；选中插件参与一次 turn 不等于安装或启用它 [@ref-minimax-code-skills-plugin-state]。
- 区域差异：`x-link-reader` 内置技能在 CN 区域被禁用 [@ref-minimax-code-skills-builtin-candidates]。
- 写入策略：用户创建的技能写入要过内容安全闸（阻断策略下直接拒绝），删除内置技能返回 `protected` [@ref-minimax-code-skills-enabled]。
- 入口差异：TUI 与 ACP 使用同一套运行时技能列表接口；SPI 变体则由宿主注册，只贡献声明式目录 [@ref-minimax-code-skills-spi]。

## 诊断与重载 {#skills-diagnostics}

- 注册表可导出完整快照，包含根目录（含规范化路径）、条目（剥离内容）、胜者、落选者、诊断与刷新/渲染指标 [@ref-minimax-code-skills-precedence]。
- 诊断码覆盖 `root_unreadable`、`skill_symlink_rejected`、`skill_outside_root`、`skill_file_unreadable`、`skill_file_not_file`、`skill_changed_during_read`、`skill_read_failed`、`frontmatter_unclosed`、`frontmatter_invalid_yaml`、`frontmatter_not_mapping`、`missing_name`、`missing_title`、`missing_description`，除标注为 error 的项外都是失败开放警告 [@ref-minimax-code-skills-frontmatter]。
- 用户可见列表是 TUI/ACP 的 `/skills [filter]`，检查面板把技能分成 Built-in、User、Other 三组 [@ref-minimax-code-skills-slash]。
- 编辑文件后**自动重载**：注册表安装共享 `fs.watch` 订阅，去抖 200 毫秒、最大等待 1000 毫秒，同一「路径 + dev + ino」只保留一个监视器 [@ref-minimax-code-skills-watcher-shared]。
- 显式刷新：创建或安装后服务会刷新对应句柄；注册表句柄按「代理实例 + 根列表」缓存，LRU 上限 16 [@ref-minimax-code-skills-watch]。
- 指标入口包括 `skill_load_total`、`skill_catalog_overflow_observed_total` 与 `skill_catalog_description_cap_observed_total` [@ref-minimax-code-skills-catalog-budget]。
- 官方文档把 `/skills` 与 `/doctor`、`/status` 并列为检查入口 [@ref-minimax-code-doc-config-checks]。
