---
schema_version: 3
record_kind: production
edition_id: cline-cli-skills-v1
harness_id: cline
topic: skills
title: "Cline CLI 的 Skill 发现、解析与调用机制"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-cline-cli-skills-wiring, ref-cline-runtime-config-ext, ref-cline-skills-doc-loading, ref-cline-docs-skills-loading, ref-cline-paths-settings]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-cline-paths-skills, ref-cline-paths-workspace-skills, ref-cline-paths-dir-constants, ref-cline-paths-clinedir, ref-cline-plugin-skill-dirs, ref-cline-skills-managed-roots, ref-cline-paths-agent-plugins, ref-cline-skills-doc-roots, ref-cline-docs-skills-roots, ref-cline-skills-resolve-id, ref-cline-skills-ambiguous, ref-cline-cli-skill-cmd, ref-cline-skills-lock]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-cline-skills-discovery, ref-cline-skills-include-file, ref-cline-watcher-start, ref-cline-watcher-debounce, ref-cline-skills-frontmatter, ref-cline-skills-parse, ref-cline-agent-skill-fields, ref-cline-agent-skill-unknown, ref-cline-agent-skill-name, ref-cline-skills-doc-structure, ref-cline-skills-doc-formats, ref-cline-skills-managed-roots, ref-cline-plugin-skill-dirs, ref-cline-skills-lock]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-cline-skills-tool, ref-cline-skills-tool-desc, ref-cline-skills-executor, ref-cline-skills-format-invocation, ref-cline-cli-config-skills, ref-cline-cli-prompt-expand, ref-cline-skills-token-ownership, ref-cline-docs-skills-loading, ref-cline-skills-resolve, ref-cline-skills-not-found]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-cline-presets-act, ref-cline-presets-yolo, ref-cline-skills-register-tool, ref-cline-config-ext-gate, ref-cline-skills-toggle, ref-cline-settings-skill-toggle, ref-cline-skills-doc-toggling, ref-cline-docs-skills-toggling, ref-cline-cli-skills-cmd, ref-cline-settings-skill-row, ref-cline-cli-config-refresh, ref-cline-watcher-debounce, ref-cline-watcher-start]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: conflict
        source_refs: [ref-cline-paths-skills, ref-cline-paths-workspace-skills, ref-cline-skills-doc-roots]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-cline-skills-discovery, ref-cline-skills-include-file]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-cline-skills-resolve-id, ref-cline-skills-ambiguous]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-cline-skills-parse, ref-cline-agent-skill-fields, ref-cline-agent-skill-unknown]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-cline-skills-parse, ref-cline-skills-managed-roots, ref-cline-plugin-skill-dirs]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-cline-skills-tool-desc, ref-cline-skills-format-invocation]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-cline-skills-tool, ref-cline-skills-resolve, ref-cline-cli-prompt-expand, ref-cline-skills-not-found]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: answered
        source_refs: [ref-cline-presets-act, ref-cline-presets-yolo, ref-cline-skills-register-tool]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: partial
        source_refs: [ref-cline-cli-skills-cmd, ref-cline-cli-config-refresh, ref-cline-settings-skill-row]
---

## 固定来源与机制边界 {#skills-scope}

本章的固定来源是官方仓库 `https://github.com/cline/cline.git` 的提交 `3435f72fcf4cb843bee946b8f9e981683564c9e3`：`docs/customization/skills.mdx`、`docs/getting-started/config.mdx` 等官方文档，以及 `sdk/packages/shared/src/storage/paths.ts`、`sdk/packages/core/src/extensions/config/`、`sdk/packages/core/src/extensions/agent-plugin/`、`sdk/packages/core/src/extensions/tools/`、`apps/cli/src/` 的实现。另有官方文档站 `https://docs.cline.bot/customization/skills.md` 的抓取快照作为佐证；该快照的软件版本未知，只按来源级知识引用。

CLI 侧的接线链是固定的：`apps/cli/src/main.ts` 用 `createUserInstructionConfigService({ skills: { workspacePath, includePluginSkills: true, cwd }, rules: {...}, workflows: {...} })` 建服务并 `await start()`，然后把同一个服务交给 `runAgent`、`runInteractive`、`runZen` 三个入口。[@ref-cline-cli-skills-wiring]

是否处理 rules/skills/workflows/plugins/hooks 这些「配置扩展」由运行时配置的扩展种类决定；不传时用默认全集，因此 CLI 默认启用 skill 处理，VS Code 扩展之类自带一层指令文件的宿主才会显式排除某一类。[@ref-cline-runtime-config-ext]

官方文档把 skill 描述为按需加载的三层：元数据（启动时常驻，约 100 token/skill）、`SKILL.md` 正文（触发时加载）、捆绑资源（用到才读）。[@ref-cline-skills-doc-loading][@ref-cline-docs-skills-loading]

本章只覆盖 `cli` 界面：CLI 与 SDK/桌面共用同一套 discovery 与解析实现，但入口、开关与诊断命令是 CLI 自己的。所有配置路径都以数据目录解析函数为准：数据目录来自 `CLINE_DATA_DIR`，否则是 `resolveClineDir()` 下的 `data/`，而 `resolveClineDir()` 取进程内设置（`--config`）、再取 `CLINE_DIR`、最后是 `$HOME/.cline`。[@ref-cline-paths-settings]

## 存放位置、搜索顺序与同名消解 {#skills-roots}

一株 skill 是一个目录，目录里有 `SKILL.md`。搜索根由 `resolveSkillsConfigSearchPaths(workspacePath)` 给出，顺序为：

1. 工作区：`{workspace}/.clinerules/skills`、`{workspace}/.cline/skills`、`{workspace}/.agents/skills`；
2. 全局：`~/.cline/skills`（实际是 `resolveClineDir()/skills`）；
3. 全局兼容位：`~/.agents/skills`。

三个工作区目录名分别来自常量 `DEPRECATED_CONFIG_DIR = ".clinerules"`、`CLINE_CONFIG_DIR = ".cline"`、`LEGACY_AGENT_SKILLS_CONFIG_DIR = ".agents"`。[@ref-cline-paths-skills][@ref-cline-paths-workspace-skills][@ref-cline-paths-dir-constants]

`resolveClineDir()` 是 `~/.cline` 的两层覆盖点：环境变量 `CLINE_DIR`，或 CLI 的 `--config` 参数（它会先于 commander 解析，直接调用 `setClineDir`）。所以 `--config` 改的是全局 skill 根，不是数据目录。[@ref-cline-paths-clinedir]

插件还会追加两类 skill 目录：Cline JS/TS 插件里被 `package.json` 声明为该插件入口的包根下的 `skills/`；以及 `{workspace}/.cline` 下带 `managed.json` 的受管插件根的 `skills/`。[@ref-cline-plugin-skill-dirs][@ref-cline-skills-managed-roots]

厂商中立的 Agent Plugin（`~/.agents/plugins/*`）会被读取，但只从用户 home 读取；工作区里的 `.agents/plugins` 不参与自动发现，目的是让「打开一个仓库」不会激活仓库自带的 MCP server 或插件 skill。[@ref-cline-paths-agent-plugins]

官方文档列出的位置与代码有出入，需要按代码为准：文档说项目 skill 可放 `.cline/skills/`（推荐）、`.clinerules/skills/`、`.claude/skills/`，全局放 `~/.cline/skills/`；但固定提交里没有任何代码读取 `.claude/skills`，全仓检索 `.claude` 只命中会话导入与 Claude Code provider 相关代码。[@ref-cline-skills-doc-roots][@ref-cline-docs-skills-roots]

同名消解：所有记录进同一张以 `id` 为键的表，普通 skill 的 id 是小写去空格的 name，Agent Plugin skill 的 id 是 `插件名:skill名`；按目录顺序写入、后写的覆盖先写的，所以上面「工作区在前、全局在后」的顺序意味着**全局同名 skill 覆盖项目同名 skill**，与官方文档「global takes precedence」一致。[@ref-cline-skills-resolve-id][@ref-cline-skills-doc-roots]

当同一个会话叠加了多个指令服务（例如 hub 覆盖层）时，`listRecords` 保留第一个服务的同名记录，而执行器在同名条目多于一个且都启用时返回 `Skill "x" is ambiguous. Use one of: ...`，工具调用也接受 `插件名:skill名` 后缀匹配。[@ref-cline-skills-ambiguous]

安装/更新 skill 不走运行时：`cline skill` 只是把参数原样转发给开放的 `skills` npm CLI（`npx -y skills@latest`），并在 add/install/update/remove 等子命令上补 `--agent cline`；仓库里的 `apps/cli/skills-lock.json` 由那个外部 CLI 维护，固定提交里没有代码读它。[@ref-cline-cli-skill-cmd][@ref-cline-skills-lock]

## 发现、解析与两套 frontmatter 规则 {#skills-discovery}

扫描只做一层：对每个搜索根 `readdir`，名字正好是 `SKILL.md` 的**文件**本身成为一个候选（其名称回退为所在目录名），每个**目录**（含指向目录的符号链接）成为候选「该目录/SKILL.md」；不递归进 skill 目录内部，因此 `docs/`、`scripts/`、`templates/` 永远不会被自动扫描。名称判断由 `includeFile: (fileName) => fileName === "SKILL.md"` 收紧。[@ref-cline-skills-discovery][@ref-cline-skills-include-file]

忽略规则只有一类：`ENOENT`/`ENOTDIR`/`EACCES`/`EPERM` 之类的目录错误按「没有结果」处理，不中断整个扫描；没有 `.clineignore`/`.gitignore` 过滤。[@ref-cline-skills-discovery]

时机上，服务 `start()` 先做一次全量 `refreshAll()`，再对每个搜索根与已发现的 skill 目录挂 `fs.watch`；文件变化进 pending，默认 `debounceMs = 75` 毫秒后 flush，并用内容 SHA-1 指纹判断是否真的变了。[@ref-cline-watcher-start][@ref-cline-watcher-debounce]

frontmatter 有两条解析通道，不能混为一谈。Cline 自有 skill 走宽松通道：先剥 UTF-8 BOM，用 `^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$` 匹配，YAML 必须是映射，正文必须非空（否则报 `Missing instructions body in skill file.`）；`name` 可选、缺省取目录名，`description` 可选，`disabled: true` 或 `enabled: false` 表示停用，**其它字段全部接受并保存在 `frontmatter` 里，不报错也不限长**。[@ref-cline-skills-frontmatter][@ref-cline-skills-parse]

Agent Plugin 的 skill 走严格通道（Agent Skills 规范）：字段表是封闭集合 `name`、`description`、`license`、`compatibility`、`metadata`、`allowed-tools`，出现其它字段直接抛 `Unexpected frontmatter field...`；`name` 必填、≤64 字符、必须 NFKC 规范后小写、只含小写字母/数字/连字符、不能以连字符开头或结尾、不能有连续连字符，且必须与目录名一致；`description` 必填且 ≤1024 字符；`compatibility` ≤500；`metadata` 必须是字符串到字符串的映射。[@ref-cline-agent-skill-fields][@ref-cline-agent-skill-unknown][@ref-cline-agent-skill-name]

文档把「name 必须等于目录名」「description ≤1024」写成通用规则，但固定提交里这两条只在 Agent Plugin 通道强制，Cline 自有 skill 不受限；这是文档与实现的差异，写 skill 时按自己的通道判断。[@ref-cline-skills-doc-structure][@ref-cline-skills-doc-formats]

宿主还会识别三类附加文件，它们决定某株 skill 是否进入扫描范围：`managed.json` 标记 `{workspace}/.cline/插件名` 是受管插件根，其 `skills/` 子树按下层目录扫描 [@ref-cline-skills-managed-roots]；Cline 插件的 `package.json` 必须把入口声明在 `cline.plugins` 下，其包根的 `skills/` 才算数 [@ref-cline-plugin-skill-dirs]；`apps/cli/skills-lock.json` 是外部 `npx skills` CLI 的锁文件，宿主不读它 [@ref-cline-skills-lock]。

## 进入上下文的时机与调用方式 {#skills-invocation}

工具面：运行时注册一个名字就叫 `skills` 的工具（配置型子代理里的 `use_skill` 只是它的别名），输入 `{skill, args?}`，默认超时 15000 毫秒，不重试；描述里写明「当请求匹配某个 skill 时，调用本工具是阻塞性要求」。工具描述是惰性 getter，会把当前**启用**的 skill id/名字拼成 `Available skills: a, b` 追加在描述后面，这就是「元数据常驻上下文」的具体形态。[@ref-cline-skills-tool][@ref-cline-skills-tool-desc]

正文面：只有调用时才读。执行器先解析记录，再返回 `formatSkillInvocation` 生成的信封——包含 command-name、可选 command-args、以及指令正文；Agent Plugin skill 会额外附上 skill 根目录标签，供模型用 `read_files`/`run_commands` 去读捆绑资源。[@ref-cline-skills-executor][@ref-cline-skills-format-invocation]

用户面：每个启用的 skill/workflow 都会暴露成一条 `/名字` 运行时命令，CLI 的斜杠命令注册表与 `/skills` 选择器都从同一份 `listRuntimeCommands()` 取；选择器在输入框里插入 `/名字 `，并提示可以用 `npx skills add owner/repo` 安装。[@ref-cline-cli-config-skills]

斜杠命令有两种落地方式：当会话注册了 `skills` 工具时，`/名字` 原样保留并由模型调用工具，指令作为工具结果返回（持久化记录保持用户输入）；当工具不可用（如 yolo 模式）时，`shouldExpandSkillSlashCommands` 返回 true，用户输入被就地替换成指令正文再提交。[@ref-cline-cli-prompt-expand]

冲突消解：skill 对自己的规范化命令名有独占权，同名 workflow 会被丢弃而不是改名；同种类冲突按 `(name, id)` 排序取第一个，保证与发现顺序无关。[@ref-cline-skills-token-ownership]

资源不会被自动加载：`docs/`、`templates/`、`scripts/` 只是普通文件，是否读取由 `SKILL.md` 正文里的引用和模型决定；文档描述的「用 `read_file` 读文档、直接跑脚本、只有输出进上下文」是模型行为，不是宿主预加载。[@ref-cline-skills-format-invocation][@ref-cline-docs-skills-loading]

调用失败的可读错误：名字匹配不到给 `Skill "x" not found. Available skills: ...` 或 `No skills are currently available.`；命中但被停用给 `Skill "x" is configured but disabled.`；同一个执行器实例重入给 `Skill "x" is already running.`。[@ref-cline-skills-not-found][@ref-cline-skills-resolve][@ref-cline-skills-executor]

## 生效条件、开关与诊断 {#skills-conditions}

预置工具组决定默认可用性：`act` 与 `plan` 预设 `enableSkills: true`，`search`/`minimal`/`yolo` 为 false；yolo 下没有 `skills` 工具，`/名字` 退化为文本展开。[@ref-cline-presets-act][@ref-cline-presets-yolo]

注册条件还要求：工具总开关打开、`skills` 这类配置扩展启用、存在指令服务、至少一个启用的 skill（`hasConfiguredSkills`），并且会话级工具路由允许 `skills`。[@ref-cline-skills-register-tool][@ref-cline-config-ext-gate]

全局设置里 `disabledTools` 含 `skills` 会摘掉该工具，并连带把斜杠命令处理切到文本展开。设置文件是 `{数据目录}/settings/global-settings.json`。[@ref-cline-skills-register-tool]

单个 skill 的启停写进它自己的 `SKILL.md`：停用写 `disabled: true`，启用则删掉 `disabled`（以及值为 false 的 `enabled`）。Agent Plugin 提供的 skill 不允许单独切换——严格解析器会拒绝 `disabled` 字段，所以 CLI 只允许切它的插件，尝试单独切换会报错。[@ref-cline-skills-toggle][@ref-cline-settings-skill-toggle]

文档描述的「每个 skill 有开关、默认启用、可先禁用不删目录」与实现一致。[@ref-cline-skills-doc-toggling][@ref-cline-docs-skills-toggling]

诊断入口：

- `cline config skills` 按名字排序打印 `Enabled skills:` 与「名字 (SKILL.md 路径)」，跳过 `disabled === true` 与重名项；`--json` 输出带 `path` 的数组。[@ref-cline-cli-skills-cmd]
- `cline config`（TUI）的 Skills 面板列出 id、name、path、enabled、source、description，插件的 skill 带 `pluginName`/`pluginPath` 且不可单独开关；切换后调用 `refreshType("skill")` 并重建会话。[@ref-cline-settings-skill-row][@ref-cline-cli-config-refresh]
- 改动 `SKILL.md` 不需要重启：watcher 按 75 毫秒去抖重新解析并比对指纹；工具描述 getter 每次访问都重读启用列表。[@ref-cline-watcher-debounce]

缺口：Cline 自有 skill 文件的解析失败默认被静默丢弃——watcher 只有在 `emitParseErrors: true` 时才上报，而 CLI 没有打开它；因此「文件写错但没生效」在 CLI 上没有直接的报错出口，只能靠 `cline config skills` 里条目消失来推断。[@ref-cline-watcher-start]
