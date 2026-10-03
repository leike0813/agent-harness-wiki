---
schema_version: 3
record_kind: production
edition_id: deepseek-harness-skills-v1
harness_id: deepseek-harness
topic: skills
title: "DeepSeek Harness 的 Skills：加载位置、发现规则、frontmatter、调用与诊断"
sections:
  - section_id: skill-roots
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-skills-roots-table, ref-dsh-skills-provider-roots, ref-dsh-skills-provider-ctor, ref-dsh-base-bundle-skill-rows, ref-dsh-skills-web-preset-rows]
  - section_id: skill-discovery
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-skills-discover-root, ref-dsh-skills-watch-event, ref-dsh-skills-change-detection]
  - section_id: skill-priority
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-skills-merge-layers, ref-dsh-skills-compare]
  - section_id: skill-frontmatter
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-skills-identity, ref-dsh-skills-parse-file, ref-dsh-skills-parse-frontmatter, ref-dsh-skills-invocation-policy, ref-dsh-skills-provider-config, ref-dsh-skills-registry-use]
  - section_id: skill-catalog
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-skills-catalog-message, ref-dsh-skills-prestep-visibility, ref-dsh-skills-session-catalog]
  - section_id: skill-loading
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-skills-render-content, ref-dsh-skills-user-gesture]
  - section_id: skill-invocation
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-skills-tool-execute, ref-dsh-skills-user-gesture, ref-dsh-skills-policy-matrix, ref-dsh-skills-web-picker]
  - section_id: skill-surface-parity
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-base-bundle-skill-rows, ref-dsh-skills-web-preset-rows, ref-dsh-skills-prestep-visibility]
  - section_id: skill-observability
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-skills-observable, ref-dsh-skills-change-event, ref-dsh-skills-cold-catalog]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: skill-roots
        status: answered
        source_refs: [ref-dsh-skills-roots-table, ref-dsh-skills-provider-roots, ref-dsh-skills-provider-ctor]
  - question_id: skills.discovery
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: skill-discovery
        status: answered
        source_refs: [ref-dsh-skills-discover-root, ref-dsh-skills-watch-event]
  - question_id: skills.collision
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: skill-priority
        status: answered
        source_refs: [ref-dsh-skills-merge-layers, ref-dsh-skills-compare]
  - question_id: skills.format
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: skill-frontmatter
        status: answered
        source_refs: [ref-dsh-skills-identity, ref-dsh-skills-parse-file, ref-dsh-skills-parse-frontmatter]
  - question_id: skills.extensions
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: skill-frontmatter
        status: partial
        source_refs: [ref-dsh-skills-invocation-policy, ref-dsh-skills-provider-config]
  - question_id: skills.loading
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk]
        section_id: skill-catalog
        status: answered
        source_refs: [ref-dsh-skills-catalog-message, ref-dsh-skills-prestep-visibility, ref-dsh-skills-session-catalog]
      - surface_ids: [sdk-minimal]
        section_id: skill-surface-parity
        status: not_applicable
        source_refs: [ref-dsh-base-bundle-skill-rows]
  - question_id: skills.invocation
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: skill-invocation
        status: answered
        source_refs: [ref-dsh-skills-tool-execute, ref-dsh-skills-user-gesture, ref-dsh-skills-policy-matrix]
  - question_id: skills.conditions
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: skill-surface-parity
        status: answered
        source_refs: [ref-dsh-base-bundle-skill-rows, ref-dsh-skills-web-preset-rows, ref-dsh-skills-prestep-visibility]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: skill-observability
        status: answered
        source_refs: [ref-dsh-skills-observable, ref-dsh-skills-change-event, ref-dsh-skills-cold-catalog]
---

## Skill 从哪些位置被发现 {#skill-roots}

官方文档直接给出根目录表，按来源分成 bundled、custom、user-agents、user-dsh、project-agents、project-dsh 六类，并说明「这些根在所有 profile 上一致；缺少的根不是错误」[@ref-dsh-skills-roots-table]。实现侧 `FileSystemSkillProvider.roots()` 生成带 rank 的有序列表：开启 `includeDefaultRoots`（默认 `true`）且 `cwd` 有定义时，从 `resolve(cwd)` 向上找最近的含 `.git` 祖先作为 project root，挂 `{projectRoot}/.dsh/skills`（rank 100，source `project-dsh`）与 `{projectRoot}/.agents/skills`（rank 200，`project-agents`）；没有 `.git` 时就把传入的 cwd 当 project root[@ref-dsh-skills-provider-roots]。

路径随 home 与环境变量变化的部分在构造函数里解决：`dshHome` 依次取显式配置、`$DSH_HOME`、`~/.dsh`；`agentsHome` 取 `config.agentsHome`、`$DSH_AGENTS_HOME`、`~/.agents`；`bundledSkillDir` 取 `config.bundledSkillDir`，否则在开启默认根时回退到 `$DSH_BUNDLED_SKILL_DIR`——这个环境变量是**默认根**而非强制值，所以 `includeDefaultRoots: false` 会把它一并去掉[@ref-dsh-skills-provider-ctor]。用户可通过 `customSkillDirs`（默认 `[]`，逐项 `resolve()`）在 rank 300 追加自定义目录。

**六个界面的差别必须单列**：`dsh-base` 把 `skill`、`skill-filesystem`、`skill-badge`（默认 `disabled: true`）与 `tool-skill` 四行一次性挂上[@ref-dsh-base-bundle-skill-rows]；`sdk-minimal` 完全没有 skill 行，因此在这个界面上所有 skill 机制都不存在，而不是「未知」；`web` 进一步把这些行放进 agent preset 作用域，改变了根注册到哪一层，而不是改变被扫描的路径[@ref-dsh-skills-web-preset-rows]。

## 什么算 Skill 文件，何时重扫 {#skill-discovery}

发现是**每次查询触发**，不是周期性后台任务。`ctx.skills.snapshot()` / `list()` 逐个调用 provider 的 `list(options)`，文件系统 provider 先按 `options.cwd` 解析根、启动监听，再对每个根调用 `discoverRoot()`[@ref-dsh-skills-discover-root]。

规则比通用 glob 窄得多：只读每个根的**直接条目**，目录形态只认 `{entry}/SKILL.md`，文件形态只认 `*.md` 正则文件本身，其余一律忽略——所以嵌套的 `**/SKILL.md` 树不会被发现，仓库里也没有声明这是有意的取舍。符号链接由 `nodeEntryKind()` 用 `stat()` 解析，断链告警后跳过；user-dsh 根上会跳过 `.system`。

新鲜度是事件驱动的。Chokidar 以 `depth: 1`、`ignoreInitial: true` 监听已存在的根，`isRelevantWatchEvent()` 只把根级目录增删、根级 `*.md`、以及 `{entry}/SKILL.md` 的增改删判为与目录相关，bundle 下方的资源文件被忽略[@ref-dsh-skills-watch-event]。尚不存在的根会从最近的已存在祖先按段跟随，用 `fs.watchFile` 轮询直到可以挂上 Chokidar；模型侧自己写文件时通过 `fs/observed` 事件同步失效，不需要等轮询。官方在 README 里把这一层概括为「监听器、哈希与文件戳一起决定条目是否真的变化」[@ref-dsh-skills-change-detection]。

## 同名时谁赢 {#skill-priority}

去重按精确 `name` 分两级，而且**没有命名空间**：一个合并视图里就是一份扁平的 kebab-case 名字空间。第一级跨 registry 层，`collectFresh()` 把 `[global, ...chainLayers(scope)]` 合成以名字为键的 `Map`，**最近**的层直接顶替更远的层，这里 rank 不参与[@ref-dsh-skills-merge-layers]。第二级在层内，`collectLayer()` 按 `compareIndexedCandidates` 排序——先 `rank`，再 provider 注册顺序，再 provider 内的局部顺序——保留第一个，其余记一条 `skill` 同名遮蔽告警，形态是 `skill "{name}" from {source} ignored because a higher-priority skill already exists`[@ref-dsh-skills-compare]。

两个容易踩的后果：项目级 skill 会遮蔽同名的用户级 skill，**即使**那个用户 skill rank 更高；但在同一层内 rank 表仍然决定胜负。运行时 `ctx.skills.register()` 的条目在每层最先收集，带 `RUNTIME_RANK = 250` 与 `providerOrder = -1`，所以层内高于 provider。

## SKILL.md 的字段与解析规则 {#skill-frontmatter}

`parseFrontmatter()` 要求第 1 行是字面量 `---`，到下一个恰好为 `---` 的行为止，中间用 `yaml` 解析且必须是非数组对象[@ref-dsh-skills-parse-frontmatter]。`parseSkillFile()` 随后要求 `name` 与 `description` 都是非空字符串，缺失即告警，形态是 `skill file {path} ignored: frontmatter requires name and description`[@ref-dsh-skills-parse-file]。名字必须满足 `isSkillName` 即 `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`[@ref-dsh-skills-identity]。

宿主的专有字段很少。`disable-model-invocation` 映射为 `modelInvocable: value !== true`，`user-invocable` 映射为 `userInvocable: value !== false`，两者省略时都默认为 `true`；布尔解析除 YAML 布尔外还接受 `1`/`0` 与大小写不敏感的 `yes/no`、`on/off`，否则抛一条 `frontmatter field ... must be a boolean` 错误并连带丢弃整个 skill，而不是静默取默认值；旧式驼峰拼写 `disableModelInvocation`、`modelInvocable`、`userInvocable` 被硬拒绝[@ref-dsh-skills-invocation-policy]。`whenToUse`（非空字符串）与 `metadata`（YAML 映射）原样透传但宿主不解释。

可配置项按文件分属三个包：`@deepseek-ai/dsh-skill` 的 `collectCacheMaxEntries`（默认 128），`@deepseek-ai/dsh-skill-filesystem` 的 `providerName`、`includeDefaultRoots`、`dshHome`、`agentsHome`、`customSkillDirs`、`watch*` 系列与 `bundledSkillDir`，以及 `@deepseek-ai/dsh-tool-skill` 的 `catalogDescriptionMaxLength`（默认 500，最小 3）[@ref-dsh-skills-provider-config]。registry 本身只负责登记与查找：它把 `get()` 转发给胜出的 provider，不缓存定义，内容渲染交给调用方的 `renderSkillContent()`，宿主 API 因此只有 `ctx.skills` 这一个入口[@ref-dsh-skills-registry-use]。

## 模型在加载任何正文之前看到什么 {#skill-catalog}

`dsh-tool-skill` 在第一个符合条件的 `agent/pre-step` 上注入一条持久的 user 角色 `system-reminder` 目录，包在 `available_skills` 标签之间，只含按名排序的条目行，形态是「`- `{name}`: {转义后的 description}`」，别无其它——没有正文、路径、来源、provider 或 `whenToUse`；描述先做空白归一化，再截到 `catalogDescriptionMaxLength` 并加 `...` 结尾[@ref-dsh-skills-catalog-message]。目录监听器要求该 agent 解析到的**恰好是**注册的 `skill` 工具定义，跳过不完整快照，按 `isModelInvocable` 过滤，并对条目做 SHA-256 摘要，只有摘要变化才重新发布[@ref-dsh-skills-prestep-visibility]。

对冷读提供一个宿主服务 `ctx.sessionSkillCatalog.list({ sessionId })`（客户端侧为 `ctx.remote.skills.list`），返回可用户调用的条目及 `name`、`path`、`description` 与可选 `whenToUse`、`modelInvocable`，不加载正文[@ref-dsh-skills-session-catalog]。它只面向人：这些字段从不进入模型上下文。

正文只在 `load` 时进入上下文：模型调用 `skill({ name })`，registry **不缓存**定义，每次 `get()` 都从胜出的 provider 重新读文件。

## 加载正文与资源 {#skill-loading}

两条加载路径共用 `renderSkillContent()`，输出一个 `skill_content` 元素，形状是 `skill_content name="..."` 内含一个 `skill_resources` 元素与一个 `skill_instructions` 元素，资源列表在前、正文在后[@ref-dsh-skills-render-content]。资源指引由 `resourceBase` 决定：目录形态给出 `Base directory for this skill: {path}` 并要求把正文提到的相对路径解析到该基目录，URL 形态给基 URL，opaque 形态给 provider 自述。

用户的 `/name` 手势走另一条入口：另一个 `agent/pre-step` 监听器只扫描 `source.kind === 'user'` 的已认领消息，用空白分隔的 `/` 技能名手势匹配，对每个解析成功且 `isUserInvocable` 的名字追加一条 user 角色消息，内容是同一份 `skill_content` 渲染；未知或被禁的名字仍是普通散文[@ref-dsh-skills-user-gesture]。

## 用户或模型怎样启动一个 Skill {#skill-invocation}

两个独立入口，各由 `SkillInvocationPolicy` 的不同一半把关。模型显式调用 `skill` 工具（只有必填 `name` 一个参数），会拒绝非 kebab-case 名字、解析不到的名字，以及不可模型调用的技能，且在 `ctx.skills.get()` 前后各校验一次[@ref-dsh-skills-tool-execute]；模型自动触发则靠目录文本指示它在用户点名或任务明显匹配某条描述时调用。用户在消息里打 `/` 技能名手势触发上面的 pre-step 路径，由 `SKILL_GESTURE` 白空格边界界定并逐个解析为 `isUserInvocable` 的定义[@ref-dsh-skills-user-gesture]。

没有 skill 之间的依赖声明，除两个 frontmatter 布尔以外没有逐个启停开关，也没有额外策略门[@ref-dsh-skills-policy-matrix]。客户端差异：Web 与 Desktop 客户端先用命令注册表在本地解析 `/name`，所以与宿主命令同名的技能会解析成命令；`/` 触发的选择器只列出可用户调用的技能，并对模型禁用的加 `menu.userOnly` 标记[@ref-dsh-skills-web-picker]。

## 界面差异与信任条件 {#skill-surface-parity}

`dsh-base` 提供的四个 skill 行是 web、desktop、headless、sdk、acp 的共同基线，`sdk-minimal` 一行也没有[@ref-dsh-base-bundle-skill-rows]。因此查 `sdk-minimal` 的 skill 相关问题时，正确结论是「该界面不挂载 skill 服务」，而不是「机制未确认」。

影响行为的条件共五类：frontmatter 里的两个调用开关；组合行的 `disabled`（`skill-badge` 出厂即禁用）；工具可见性（目录与工具都要求 `ctx.tools.get` 解析到的正是注册的 `skill` 定义，限制或同名遮蔽会同时移除两者）[@ref-dsh-skills-prestep-visibility]；作用域与 preset 分层（注册落到调用上下文的层，preset 挂载的 provider 形成 per-agent 层并遮蔽 host 全局层）[@ref-dsh-skills-web-preset-rows][@ref-dsh-skills-web-preset-rows]；以及发现完整性——provider 返回不完整观测、抛错或监听失败会让 `snapshot().complete` 为假，消费者保留上一次良好视图而不发布有损目录。信任不是独立轴：bundled 根带 `trustedHost: true`，它只决定用 Node `fs` 还是 `ctx.fs` 读取。

## 诊断入口 {#skill-observability}

这个 checkout 里**没有** `dsh skills list` 这样的专用命令。可观测性来自四处：运行时 stderr 日志（逐文件的解析拒绝原因、同名遮蔽告警、provider 跳过、监听失败）[@ref-dsh-skills-observable]；转录里的 `system-reminder` 目录与 `skill` 工具结果；冷读服务 `ctx.sessionSkillCatalog.list()`，错误是 `session/not-found` 或 `gateway/internal`[@ref-dsh-skills-cold-catalog]；以及 `skills/change` 事件，它只是一个不带 diff 的失效通知，消费者需用自己的选项重新取数[@ref-dsh-skills-change-event]。

一个必须说清的边界：模型侧目录**没有**逐技能诊断——一个非法技能和一个不存在的技能，对模型来说是无法区分的。Web 与 Desktop 另有面向人的 `/` 选择器与右侧栏指令文件预览；`sdk-minimal` 没有可诊断的对象。
