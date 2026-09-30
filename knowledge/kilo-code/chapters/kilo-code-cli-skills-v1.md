---
schema_version: 3
record_kind: production
edition_id: kilo-code-cli-skills-v1
harness_id: kilo-code
topic: skills
title: "Kilo Code CLI — Skills：目录发现、格式、优先级、信任边界与诊断"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-kilo-code-cli-package, ref-kilo-code-skills-global, ref-kilo-code-skills-project, ref-kilo-code-skills-compat, ref-kilo-code-skills-paths, ref-kilo-code-skills-src-external, ref-kilo-code-skills-src-configdirs, ref-kilo-code-skills-src-paths]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-kilo-code-skills-format, ref-kilo-code-skills-frontmatter, ref-kilo-code-skills-troubleshoot, ref-kilo-code-skills-paths, ref-kilo-code-skills-src-paths]
  - section_id: skills-precedence
    surface_ids: [cli]
    source_refs: [ref-kilo-code-skills-priority, ref-kilo-code-skills-src-collision, ref-kilo-code-skills-src-builtin]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-kilo-code-skills-workflow, ref-kilo-code-skills-decision, ref-kilo-code-skills-loading, ref-kilo-code-skills-modes, ref-kilo-code-skills-src-tool, ref-kilo-code-skills-src-tool-files, ref-kilo-code-skills-priority]
  - section_id: skills-security
    surface_ids: [cli]
    source_refs: [ref-kilo-code-skills-shell, ref-kilo-code-skills-src-inject, ref-kilo-code-skills-src-display, ref-kilo-code-skills-src-flags, ref-kilo-code-skills-src-builtin, ref-kilo-code-skills-src-external, ref-kilo-code-skills-src-configdirs, ref-kilo-code-skills-src-paths]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kilo-code-cli-slash, ref-kilo-code-cli-debug-skill, ref-kilo-code-skills-troubleshoot]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-kilo-code-skills-global, ref-kilo-code-skills-project, ref-kilo-code-skills-compat, ref-kilo-code-skills-paths, ref-kilo-code-skills-src-external, ref-kilo-code-skills-src-configdirs, ref-kilo-code-skills-src-paths]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-kilo-code-skills-src-configdirs, ref-kilo-code-skills-src-external, ref-kilo-code-skills-src-paths]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-precedence
        status: answered
        source_refs: [ref-kilo-code-skills-priority, ref-kilo-code-skills-src-collision, ref-kilo-code-skills-src-builtin]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: conflict
        source_refs: [ref-kilo-code-skills-format, ref-kilo-code-skills-frontmatter]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-kilo-code-skills-format, ref-kilo-code-skills-paths, ref-kilo-code-skills-src-paths]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-kilo-code-skills-workflow, ref-kilo-code-skills-loading, ref-kilo-code-skills-src-tool, ref-kilo-code-skills-src-tool-files]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-kilo-code-skills-decision, ref-kilo-code-skills-modes, ref-kilo-code-skills-src-tool]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-security
        status: answered
        source_refs: [ref-kilo-code-skills-shell, ref-kilo-code-skills-src-inject, ref-kilo-code-skills-src-display, ref-kilo-code-skills-src-flags]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-kilo-code-cli-slash, ref-kilo-code-cli-debug-skill, ref-kilo-code-skills-troubleshoot]
---

## 来源与扫描顺序 {#skills-roots}

本界面是 Kilo Code 的 CLI：命令行二进制 `kilo` / `kilocode`，由 npm 包 `@kilocode/cli` 构建而来（`packages/opencode/package.json` 中 `"name": "@kilocode/cli"`）[@ref-kilo-code-cli-package]。CLI 实现 Agent Skills 这套格式，一个 Skill 就是一个包含 `SKILL.md` 的目录。

CLI 按下面的顺序扫描 Skill 根目录；因为后扫到的同名条目会覆盖先扫到的（见「同名覆盖与优先级」），**这个顺序同时就是覆盖顺序**：

1. **内建 Skill**：随二进制发布，在发现阶段之前先写入技能表 [@ref-kilo-code-skills-src-builtin]。
2. **用户级兼容目录**：`~/.claude/skills/`（Claude Code 兼容，可用开关关闭）与 `~/.agents/skills/`（开放 agent 标准，默认加载）[@ref-kilo-code-skills-compat]。
3. **项目级兼容目录**：仓库内的 `.claude/skills/` 与 `.agents/skills/`，会沿当前目录向项目根逐级向上查找 [@ref-kilo-code-skills-src-external]。
4. **配置目录**：全局配置目录 `~/.config/kilo`、项目内 `.kilo/` 与 `.kilocode/`、用户主目录 `.kilo/`（即 `~/.kilo/`），以及显式设置的 `$KILO_CONFIG_DIR`；每个配置目录用模式 `{skill,skills}/**/SKILL.md` 扫描，即扫描 配置目录下的 `skill/` 与 `skills/` 下的 `SKILL.md` [@ref-kilo-code-skills-src-configdirs]。
5. **`skills.paths`**：用户在 `kilo.jsonc` 里声明的额外本地路径 [@ref-kilo-code-skills-src-paths]。
6. **`skills.urls`**：远程 Skill 目录，先拉取后扫描 [@ref-kilo-code-skills-src-paths]。

用户级的 `~/.kilo/skills/` 目录（Mac/Linux）或 Windows 的 `\Users\yourUser\.kilo\skills\` 是全局 Skill 的常规位置，目录结构是 `~/.kilo/skills/技能名/SKILL.md` [@ref-kilo-code-skills-global]。项目 Skill 放在仓库的 `.kilo/skills/技能名/SKILL.md` [@ref-kilo-code-skills-project]。`~/.agents/skills/` 属于默认发现位置，无需 `skills.paths` 或插件注册即可生效；`~/.claude/skills/` 只在 Claude Code 兼容打开时才加入扫描 [@ref-kilo-code-skills-compat]。

`skills.paths` 接受绝对路径、`~/` 主目录相对路径、以及相对项目根的路径；`skills.urls` 接受一个提供 `index.json` 清单的远程目录 URL [@ref-kilo-code-skills-paths]。一个以 `/` 或 `\` 开头、但没有盘符的条目（例如 `/.github/skills`）先按绝对路径尝试，目录不存在时再相对项目根解析，因此 `/.github/skills` 与 `.github/skills` 加载同一批仓库内 Skill；通过该回退加载的条目按项目 Skill 处理 [@ref-kilo-code-skills-paths]。源码侧对 `skills.paths` 的处理是：`~/` 展开到主目录，其余交给 `resolve`；找不到目录时记录 `skill path not found` 警告并跳过 [@ref-kilo-code-skills-src-paths]。

远程 URL 的服务端必须在对应路径提供 `index.json`，结构为 `{"skills":[{"name":"skill-name","version":"2","files":["SKILL.md","references/file.md"]}]}`：`name` 必须等于目录名，`version` 可选、用于刷新缓存，`files` 必须包含 `SKILL.md`；文件从 `{url}/{skill-name}/{file}` 下载 [@ref-kilo-code-skills-paths]。修改远程 Skill 内容或文件清单时也要改 `version`，下次重新发现（`/reload` 或新会话）会先下载完整新版本再原子替换缓存目录；任一文件下载失败则保留旧缓存 [@ref-kilo-code-skills-paths]。

扫描细节：各目录用 glob 匹配 `SKILL.md` 并跟随符号链接；外部兼容目录扫描开启 `dot`（包含点目录），配置目录与 `skills.paths` 的扫描未开启 `dot`。匹配模式上，外部目录用 `skills/**/SKILL.md` [@ref-kilo-code-skills-src-external]，配置目录用 `{skill,skills}/**/SKILL.md` [@ref-kilo-code-skills-src-configdirs]，`skills.paths` 用 `**/SKILL.md`（任意深度）[@ref-kilo-code-skills-src-paths]。文档要求 `SKILL.md` 直接位于 Skill 目录内、不要再嵌套更深 [@ref-kilo-code-skills-troubleshoot]。

信任判定决定 shell 注入能否执行（见「信任边界与开关」）。配置目录的规则是：显式 `$KILO_CONFIG_DIR` 以及项目边界之外的目录视为受信任，项目内和主检出目录内的 Skill 仍被限制在当前项目边界 [@ref-kilo-code-skills-src-configdirs]。`skills.paths` 的信任跟随**声明该路径的配置来源**而非最终解析出的目录：一个回退到项目根的 `/x` 条目仍按项目内容处理、不受信任，只有声明来源受信任、展开后是绝对路径且与最终目录一致时才受信任 [@ref-kilo-code-skills-src-paths]。用户级兼容目录的扫描带 `trusted: true` [@ref-kilo-code-skills-src-external]。

## SKILL.md 格式与字段 {#skills-format}

`SKILL.md` 由 YAML frontmatter 加 Markdown 正文组成：frontmatter 写元数据，正文写给 Agent 的指令 [@ref-kilo-code-skills-format]。最小可加载示例（依据 [@ref-kilo-code-skills-format] 的字段约定）：

```markdown
---
name: my-skill-name
description: A brief description of what this skill does and when to use it
---

# Instructions

Your detailed instructions for the AI agent go here.
```

frontmatter 字段按 Agent Skills 规范 [@ref-kilo-code-skills-frontmatter]：

| 字段 | 必填 | 约束/用途 |
|---|---|---|
| `name` | 是 | 最长 64 字符；只允许小写字母、数字和连字符；不能以连字符开头或结尾 |
| `description` | 是 | 最长 1024 字符；说明这个 Skill 做什么、何时使用 |
| `license` | 否 | 许可证名或随包许可证文件引用 |
| `compatibility` | 否 | 环境要求（目标产品、系统依赖、网络访问等） |
| `metadata` | 否 | 任意键值映射，放置附加元数据 |

除 `SKILL.md` 外，Skill 目录可以另放可选资源目录：`scripts/`（可执行代码）、`references/`（文档）、`assets/`（模板等），指令里可按需引用 [@ref-kilo-code-skills-format]。CLI 加载 Skill 时会把同目录下的文件抽样列进 `skill_files` 文件列表（见「加载与调用」）。frontmatter 解析失败、或缺少可用字段时，该文件被跳过：加载阶段记录 `failed to load skill` 日志并发布会话错误事件，其余 Skill 继续加载 [@ref-kilo-code-skills-src-collision]。

**名称与目录名的关系存在来源冲突**，两边都列出：

- 文档「Name Matching Rule」要求 frontmatter 的 `name` 与父目录名完全一致：`skills/frontend-design/SKILL.md` 的 `name` 必须是 `frontend-design`，写成别的值即为错误 [@ref-kilo-code-skills-format]，常见错误表也把 `name doesn't match directory` 列为错误 [@ref-kilo-code-skills-troubleshoot]。
- 同一页的 CLI 版「Troubleshooting」却说 `name` 不必等于目录名，只要在所有已加载 Skill 中唯一即可 [@ref-kilo-code-skills-troubleshoot]。

源码里定义了 `NameMismatchError` 类型，但在该提交的检出树中找不到抛出点 [INFERENCE]；因此无法从源码确认当前 CLI 是否实际校验目录名匹配。

`skills.paths` / `skills.urls` 是 Skill 机制暴露的配置键：它们在 `kilo.jsonc` 的 `skills` 对象下，源码读取为 `cfg.skills.paths` 与 `cfg.skills.urls`，JSON 里写作 `"skills": { "paths": [...], "urls": [...] }` [@ref-kilo-code-skills-paths] [@ref-kilo-code-skills-src-paths]。

## 同名覆盖与优先级 {#skills-precedence}

发现结果按扫描顺序写入以 Skill 名为键的技能表，因此**同名 Skill 是覆盖而不是合并或保留命名空间**：后扫描到的条目直接替换先前的，并在覆盖时记录一条 `duplicate skill name` 警告，携带 `existing`（被覆盖的位置）与 `duplicate`（新位置）[@ref-kilo-code-skills-src-collision]。

内建 Skill 在发现阶段之前先被写入技能表，注释明确说明这样一来用户同名 Skill 可以覆盖它；内建条目的 `location` 标记为 `builtin`、`trusted: true` [@ref-kilo-code-skills-src-builtin]。结合扫描顺序，覆盖关系（箭头方向为后者覆盖前者）是：内建 → 兼容目录 → 配置目录（`~/.config/kilo`、项目 `.kilo`/`.kilocode`、`~/.kilo`、`$KILO_CONFIG_DIR`）→ `skills.paths` → `skills.urls`。

文档给出的优先级结论是：同名时项目级 Skill（`.kilo/skills/`）优先于全局 Skill（`~/.kilo/skills/`），兼容目录与额外配置路径与项目/全局 Skill 一起加载 [@ref-kilo-code-skills-priority]。这与源码的逐条覆盖语义共同构成实际结果：读者只需记住「后扫描者胜」，其余按上面的顺序推算。

每个已加载 Skill 同时也是一个斜杠命令；当 Skill 与自定义命令或 MCP prompt 同名时，命令保留 `/name`，Skill 以 `/name:skill` 出现在自动补全中，两者都可调用 [@ref-kilo-code-skills-priority]。

## 加载与调用 {#skills-loading}

处理链分三步 [@ref-kilo-code-skills-workflow]：

1. **发现**：会话初始化时扫描各 Skill 目录，此阶段只读元数据（`name`、`description`、文件路径），不读完整指令 [@ref-kilo-code-skills-workflow]。
2. **写入提示**：模式激活时，相关 Skill 的元数据（名称与描述清单）进入系统提示，Agent 因此能看到可用 Skill 及其描述 [@ref-kilo-code-skills-workflow]。
3. **按需加载**：当 Agent 判断任务与某个 Skill 描述匹配时，它把完整 `SKILL.md` 读入上下文并照做，必要时再读取被引用的文件或执行随包代码 [@ref-kilo-code-skills-workflow]。

是否使用某个 Skill 完全由模型依据 `description` 判断，没有关键词匹配或语义检索；模型会评估请求与所有可用描述，判断某个 Skill 是否「明确且无歧义地适用」。因此描述措辞直接影响命中：显式点名（如「use the api-design skill」）总会触发，因为模型能看到 Skill 名字 [@ref-kilo-code-skills-decision]。

CLI 里 Skill 在启动新会话或运行 `kilo run` 时加载；每个新会话开始时重新扫描。要在不新开会话的情况下拾取新增或修改的 Skill，用 `/reload` [@ref-kilo-code-skills-loading]。新版平台不使用按模式区分的 Skill 目录：所有 Skill 进入同一个共享池，由 Agent 按 `description` 与当前任务上下文决定调用 [@ref-kilo-code-skills-modes]。

模型侧通过 `skill` 工具加载：工具参数是 `name`（必须来自系统提示中列出的可用 Skill），执行时先弹出 `skill` 权限询问，再渲染正文并返回。对普通文件系统 Skill，工具输出把正文包进 `skill_content` 元素，并附 `Base directory for this skill` 与一个抽样（最多 10 个）的 `skill_files` 文件列表；相对路径以该基础目录解析 [@ref-kilo-code-skills-src-tool]。内建 Skill 没有文件系统目录，直接返回 `location` 为 `builtin` 的正文，不带文件列表 [@ref-kilo-code-skills-src-tool-files]。

用户侧除了显式点名让 Agent 使用，也可以把 Skill 当作斜杠命令直接触发：每个已加载 Skill 同时是一个斜杠命令；若与自定义命令或 MCP prompt 同名，命令占用 `/name`，Skill 以 `/name:skill` 出现 [@ref-kilo-code-skills-priority]。

## 信任边界与开关 {#skills-security}

`SKILL.md` 正文可用 `` !`command` `` 语法嵌入 shell 命令；Agent 加载该 Skill 时命令执行，标准输出在内容送达模型之前替换占位符。因为由 Agent 决定何时加载，命令不会静默执行 [@ref-kilo-code-skills-shell]：

- **仅受信任的 Skill**：命令只在来自受信任位置的 Skill 中执行，包括全局 Skill（`~/.kilo/skills/`、`~/.agents/skills/`、`~/.claude/skills/`）、内建 Skill，以及全局配置里声明的绝对 Skill 路径。项目 Skill（仓库内 `.kilo/skills/`）和从远程 URL 获取的 Skill 永不执行命令，其占位符被替换为标注该 Skill 不受信任的标记 [@ref-kilo-code-skills-shell]。
- **需要批准**：Agent 加载含命令的受信任 Skill 时，文件里的每条命令都会集中列在一次权限提示中；批准则全部运行，拒绝则中止本次加载。该提示即使 bash 命令平时被自动批准也会出现，任一命令上的 deny 规则仍会阻断 [@ref-kilo-code-skills-shell]。
- **总开关**：设置环境变量 `KILO_DISABLE_SKILL_SHELL` 可完全禁用嵌入命令执行 [@ref-kilo-code-skills-shell]。

各来源的默认信任状态汇总如下（信任决定正文里的 shell 占位符是否执行，以及项目外文件引用能否读取）：

| Skill 来源 | 是否受信任 | 正文中的 shell 命令 |
|---|---|---|
| 内建 Skill（随二进制发布） | 是 | 允许（仍受批准提示与总开关约束） |
| 全局 Skill `~/.kilo/skills/`、`~/.agents/skills/`、`~/.claude/skills/` | 是 | 允许 |
| 全局配置里声明的、未回退的绝对 `skills.paths` | 是 | 允许 |
| 项目内与主检出目录内的 Skill（`.kilo/skills/`、项目 `.claude`/`.agents`） | 否，受项目边界限制 | 禁止，占位符替换为不受信任标记 |
| `skills.urls` 下载到缓存的 Skill | 否 | 禁止 |

依据：内建与用户级兼容目录的信任来源 [@ref-kilo-code-skills-src-builtin] [@ref-kilo-code-skills-src-external]，配置目录的信任判定 [@ref-kilo-code-skills-src-configdirs]，`skills.paths` 的按来源信任 [@ref-kilo-code-skills-src-paths]，以及脚本化的执行门槛与标记 [@ref-kilo-code-skills-shell] [@ref-kilo-code-skills-src-inject]。

源码实现补全了边界：占位符替换只发生在**模型发起**的加载路径，不作用于用户发起的 `/skill` 路径；受信任判断、`KILO_DISABLE_SKILL_SHELL` 总开关、以及一次性列出全部命令的批量 bash 询问共同把关，且越权路径会先触发 `external_directory` 询问。替换只运行一次，输出不会被再次扫描，因此命令无法输出一个会被后续再次执行的占位符 [@ref-kilo-code-skills-src-inject]。执行上限为每条命令 `TIMEOUT_MS = 2 * 60 * 1000`（2 分钟）、批量总计 `BUDGET_MS = 5 * 60 * 1000`（5 分钟）、输出上限 `MAX_OUTPUT_BYTES = 32 * 1024`、命令数上限 `MAX_COMMANDS = 32`，超出时写入 `[skill shell command limit reached]` [@ref-kilo-code-skills-src-inject]。

未执行的占位符会被替换成统一标记，两个加载路径渲染一致：总开关关闭时写 `[skill shell execution disabled by policy]`，不受信任时写 `[skill shell execution disabled for untrusted skill]` [@ref-kilo-code-skills-src-display]。

运行时开关（均来自环境变量，默认 `false`）[@ref-kilo-code-skills-src-flags]：

- `KILO_DISABLE_SKILL_SHELL`：禁用 Skill 正文里的 shell 注入。
- `KILO_DISABLE_EXTERNAL_SKILLS`：跳过用户级/项目级兼容目录（`.claude`、`.agents`）的扫描。
- `KILO_DISABLE_CLAUDE_CODE`（broad）或 `KILO_DISABLE_CLAUDE_CODE_SKILLS`（direct）：关闭 Claude Code 兼容 Skill 的加载；两者任一为真即生效。

## 诊断与重载 {#skills-diagnostics}

- **列出已加载 Skill**：`kilo debug skill` 会输出所有可用 Skill 的 JSON（`describe` 为 "list all available skills"，处理器把 `skill.all()` 序列化到 stdout），可用来确认某个 Skill 是否被发现 [@ref-kilo-code-cli-debug-skill]。
- **重载**：`/reload` 从磁盘重载项目的每个实例，覆盖配置、Skill、Agent 和命令；它不保留当前会话的状态，且会在项目内有会话运行时拒绝执行——需等会话结束或先中止 [@ref-kilo-code-cli-slash]。
- **Skill 未加载的排查步骤** [@ref-kilo-code-skills-troubleshoot]：确认 frontmatter 含 `name` 与 `description`；用 `/reload` 或新开会话拾取改动；确认 `SKILL.md` 直接位于 Skill 目录内（如 `.kilo/skills/my-skill/SKILL.md`），没有更深嵌套；若用了 `skills.paths` 或 `skills.urls`，核对 `kilo.jsonc` 中的路径与 URL [@ref-kilo-code-skills-troubleshoot]。
- **确认可用与是否被用**：可直接问 Agent「有哪些可用 Skill」；Agent 使用某 Skill 时会在对话里出现一次 `skill` 工具调用，其输出包含注入上下文的完整 Skill 内容 [@ref-kilo-code-skills-troubleshoot]。
- **常见错误**：`missing required 'name' field` 表示 frontmatter 缺 `name`；`name doesn't match directory` 表示名称与目录名不一致；Skill 不出现通常意味着目录结构不符合 `skills/技能名/SKILL.md` [@ref-kilo-code-skills-troubleshoot]。
