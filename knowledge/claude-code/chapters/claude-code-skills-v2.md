---
schema_version: 3
record_kind: production
edition_id: claude-code-skills-v2
harness_id: claude-code
topic: skills
title: Claude Code 的 Skills：加载位置、结构、调用与诊断
sections:
  - section_id: skills-locations
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-locations
      - ref-cc-config-home
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-discovery
      - ref-cc-skills-collision
  - section_id: skills-format
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-frontmatter
      - ref-cc-skills-supporting
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-lifecycle
      - ref-cc-skills-invocation
      - ref-cc-skills-permissions
      - ref-cc-skills-subagent
      - ref-cc-skills-overrides
      - ref-cc-skills-adddir
      - ref-cc-skills-synced
      - ref-cc-skills-livechange
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-diagnostics
      - ref-cc-skills-budget
      - ref-cc-skills-livechange
      - ref-cc-npm-readme
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-cc-skills-locations
          - ref-cc-config-home
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs:
          - ref-cc-skills-discovery
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs:
          - ref-cc-skills-collision
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-cc-skills-frontmatter
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-cc-skills-frontmatter
          - ref-cc-skills-supporting
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-cc-skills-lifecycle
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-cc-skills-invocation
          - ref-cc-skills-permissions
          - ref-cc-skills-subagent
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: partial
        source_refs:
          - ref-cc-skills-overrides
          - ref-cc-skills-adddir
          - ref-cc-skills-synced
          - ref-cc-skills-livechange
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs:
          - ref-cc-skills-diagnostics
          - ref-cc-skills-budget
          - ref-cc-skills-livechange
          - ref-cc-npm-readme
---

Skill 是把一段可复用指令交给 Claude 的方式：一个目录里放一份 `SKILL.md`，Claude 在相关时自动使用它，你也可以用 `/技能名` 直接调用。它的正文只在被调用时进入对话，所以长参考资料放在里面不会像 `CLAUDE.md` 那样常驻上下文。下面按“放在哪里、如何被找到、文件怎么写、如何被调用、怎么排查”五段展开；固定来源为官方 Skills 页与设置页，本章末尾说明它与已选定 npm 包快照的版本关系。

## Skill 的加载位置与作用域 {#skills-locations}

保存位置决定哪些会话会加载这个 Skill。官方 Skills 页把可选位置列成企业、个人、项目、嵌套、附加目录、插件与 claude.ai 账号七类。个人位置的根是 home 下的配置目录 `~/.claude/skills/`；项目位置从会话启动目录向上解析到仓库根；嵌套位置相对于启动目录下的子目录；附加目录以 `--add-dir` 传入的路径为准。设置页说明可用 `CLAUDE_CONFIG_DIR` 把 home 目录文件（设置、会话历史与插件）改存到别处。 [@ref-cc-skills-locations] [@ref-cc-config-home]

以命令名为 `deploy` 的 Skill 为例，常见的几种落点如下。

| 位置 | 路径 | 生效范围 |
| --- | --- | --- |
| 企业 | managed settings 目录内的 `.claude/skills/deploy/SKILL.md`，Linux 上例如 `/etc/claude-code/.claude/skills/deploy/` | 组织部署到的机器上所有用户 |
| 个人 | `~/.claude/skills/deploy/SKILL.md` | 你在这台机器上的所有项目，Cowork 与云会话除外 |
| 项目 | `.claude/skills/deploy/SKILL.md` | 本仓库的会话；提交后克隆该仓库的团队同样获得 |
| 嵌套 | `apps/web/.claude/skills/deploy/SKILL.md` | 在 `apps/web` 或其下层启动的会话 |
| 附加目录 | `--add-dir` 传入目录下的 `.claude/skills/deploy/SKILL.md` | 该会话 |
| 插件 | `my-plugin/skills/review/SKILL.md` | 插件启用的地方，命令形如 `/my-plugin:review` |
| claude.ai 账号 | 你在 claude.ai 启用的 Skill | Cowork、云会话，以及用该账号登录的终端会话 |

选择位置时按用途分：想在所有项目里都能用，放个人目录；想让团队共享并随仓库演进，放项目目录并提交；想随插件分发，放插件的 `skills/` 目录。还有两条命名规则要避开：Skill 目录不要叫 `synced`，那是 Claude Code 存放下载的 claude.ai Skill 的位置，同名的企业、个人、项目 Skill 会被跳过；插件之外的名字 `anthropic-skills` 及其命名空间也保留给同步来的 Skill，用这些名字的目录或命令文件不会加载。 [@ref-cc-skills-locations]

## 发现范围、符号链接与重名 {#skills-discovery}

项目 Skill 的扫描从会话启动目录开始，一直向上到仓库根，所以在 `packages/frontend/` 里启动仍能拿到根目录定义的 Skill。启动目录之下的嵌套 Skill 不在启动时加载，而是在 Claude 第一次读取或编辑该子目录里的文件时加载，并在此后保持可用；在那之前它们不出现在 `/` 菜单里，也无法按名字调用。想在启动时就加载，可以用 `/add-dir` 把该子目录显式加进来。用 `/cd` 移动会话时，新目录的项目 Skill 会被一并加入。在链接的 git worktree 里，向上搜索止于 worktree 根；当 worktree 根没有 `.claude/skills` 时，Claude Code 会改为加载主检出里的项目 Skill。 [@ref-cc-skills-discovery]

符号链接目录会被跟随，但同一个目标只会加载一次，即使多个位置都指向它。重名时由来源决定 `/名字` 实际运行哪一个：企业高于个人，个人高于项目；你写的 Skill 会替换同名的内置命令，但不会接管它的别名，例如项目里的 `code-review` 替换 `/code-review`，而内置别名 `/review` 不会运行你的 Skill；同名时 Skill 优先于 `.claude/commands/` 里的命令文件；插件 Skill 带 `/插件名:技能名` 命名空间，因此与其他位置并存；项目根与嵌套的同名 Skill 都保留，嵌套的用目录限定名单独调用，例如 `/apps/web:deploy`。同步自 claude.ai 的 Skill 若与本地命令重名，短名归本地命令，同步 Skill 只能用 `/anthropic-skills:名字` 运行。 [@ref-cc-skills-collision]

## SKILL.md 结构与第一方字段 {#skills-format}

Skill 由 `SKILL.md` 顶部的 YAML frontmatter 和其后的 Markdown 正文组成。只有开头 `---` 位于文件第一行时 Claude Code 才解析 frontmatter，否则整份文件都被当作正文。所有字段都是可选的，只有 `description` 被推荐，因为宿主用它判断何时加载。字段名必须与官方表完全一致，连字符不能省；无法识别的字段被静默忽略而不报错。布尔字段除 `true` 与 `false` 外还接受 `yes`、`no`、`on`、`off`、`1`、`0`，大小写皆可。`.claude/commands/` 里的旧式命令文件支持同一批字段，但 `name` 与 `paths` 除外。 [@ref-cc-skills-frontmatter]

一个最小可用文件如下，设置了四个字段：

```yaml
---
name: my-skill
description: What this skill does
disable-model-invocation: true
allowed-tools: Read Grep
---

Your skill instructions here...
```

逐字段看：`name` 是 `/` 菜单里显示并用于调用的命令名，缺省取目录名；`description` 说明 Skill 做什么、何时使用，Claude 据此决定自动加载；`disable-model-invocation` 设为 `true` 时只有你能调用，Claude 不能自动触发；`allowed-tools` 列出在调用该 Skill 的那一轮内无需逐次批准即可使用的工具，授权在你发送下一条消息时清除。还有两个常用字段：`user-invocable` 设为 `false` 时只有 Claude 能调用并从 `/` 菜单隐藏；`paths` 用 glob 限制自动激活的文件范围，接受逗号分隔字符串或 YAML 列表。除命令文件外，给一个 Skill 目录加上 `.claude-plugin/plugin.json` 能让它作为插件加载，因此可携带 agents、hooks 与 MCP servers，项目 `.claude/skills/` 下的这种目录需要先接受 workspace 信任对话框。 [@ref-cc-skills-frontmatter]

第一方字段在官方表里逐项列出，用途与生效条件如下。

| 字段 | 是否必须 | 用途与条件 |
| --- | --- | --- |
| `name` | 否 | `/` 菜单里的命令名，缺省用目录名 |
| `description` | 推荐 | 做什么、何时使用；缺省取正文首行非空文本 |
| `when_to_use` | 否 | 补充触发场景，追加到 `description`，计入 1536 字符上限 |
| `argument-hint` | 否 | 自动补全时提示参数，如 `[issue-number]` |
| `arguments` | 否 | 命名位置参数，供正文里的美元加名字替换 |
| `disable-model-invocation` | 否 | 设为 `true` 时禁止 Claude 自动加载 |
| `user-invocable` | 否 | 设为 `false` 时只有 Claude 能调用，缺省 `true` |
| `allowed-tools` | 否 | 调用该轮内免批准的工具，下一条消息时清除 |
| `disallowed-tools` | 否 | Skill 生效期间从可用工具池移除的工具 |
| `model` | 否 | Skill 生效期间使用的模型，仅本轮，不写入设置 |
| `effort` | 否 | Skill 生效期间的 effort 级别，覆盖会话值 |
| `context` | 否 | 设为 `fork` 时在子代理上下文中运行 |
| `agent` | 否 | `context` 为 `fork` 时使用的子代理类型 |
| `background` | 否 | 仅配合 `context` 为 `fork`，设 `false` 时在本轮等待结果 |
| `hooks` | 否 | Skill 被调用时注册、并在会话余下时间继续运行的 hook |
| `paths` | 否 | 限制自动激活的 glob，接受字符串或 YAML 列表 |
| `shell` | 否 | 正文里感叹号命令使用的 shell，`bash`（默认）或 `powershell` |
| `metadata` | 否 | 供你自己工具读取的自由格式映射，宿主不据此行为 |
| `license` | 否 | 许可证，属于 Agent Skills 规范，宿主接受但不据此行为 |
| `compatibility` | 否 | 环境要求，最大 500 字符，宿主接受但不据此行为 |

Skill 目录里可以放多个文件，让 `SKILL.md` 只保留要点，细节按需读取。官方给的布局如下：

```text
my-skill/
├── SKILL.md
├── reference.md
├── examples.md
└── scripts/
    └── helper.py
```

正文里用相对链接指向这些文件，例如在补充资料小节写下 `reference.md` 与 `examples.md` 的说明，Claude 就知道每份文件包含什么、何时读取；`scripts/` 里的脚本按需执行而不进入上下文。 [@ref-cc-skills-supporting]

## 加载、调用与生效条件 {#skills-invocation}

会话启动时进入上下文的是 Skill 的名称与描述清单，正文只在被调用时作为一条消息进入对话，并在之后的轮次里继续保留。自动压缩时，Claude Code 会在摘要之后重新挂上每个 Skill 最近一次调用的内容，各保留前 5000 token，合计 25000 token 预算，从最近调用的 Skill 开始填充，因此调用过很多 Skill 时较早的会被整体丢弃。 [@ref-cc-skills-lifecycle]

默认你与 Claude 都能调用：你输入 `/skill-name`，Claude 依据描述自动加载。两个字段可以收窄调用方：`disable-model-invocation` 设为 `true` 只允许你调用，`user-invocable` 设为 `false` 只允许 Claude 调用。下面这个 Skill 只由你触发，并阻止 Claude 换一种方式重做部署步骤。 [@ref-cc-skills-invocation]

```yaml
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
---

Deploy $ARGUMENTS to production:

1. Run the test suite
2. Build the application
3. Push to the deployment target
4. Verify the deployment succeeded
```

控制 Claude 能调用哪些 Skill 还有第三种方式：在权限里写 `Skill(名字)` 规则。`Skill(commit)` 精确匹配，`Skill(review-pr *)` 匹配带任意参数的前缀；`deny` 规则里写 `Skill(deploy *)` 可阻止调用，写裸名 `Skill(review)` 也能通过别名阻止内置的 `/code-review`。作为对照，在 `allow` 规则中，同步命名空间之外的 `Skill(anthropic *)` 不会覆盖 `anthropic-skills:pdf`，要批准同步 Skill 得写 `Skill(anthropic-skills:pdf)` 或 `Skill(anthropic-skills *)`。你还可以直接在 `/permissions` 里 deny 掉 `Skill` 工具以禁用全部 Skill。 [@ref-cc-skills-permissions]

想在隔离子代理里运行，给 frontmatter 加 `context: fork`，并用 `agent` 指定子代理类型；Claude Code 用该类型开一个不共享当前对话历史的新子代理，把 Skill 正文作为它的提示词。`agent` 可填内置的 `Explore`、`Plan`、`general-purpose`，也可填 `.claude/agents/` 下的自定义 agent；省略时用 `general-purpose`。下面这个 Skill 在 Explore 子代理里做只读研究。 [@ref-cc-skills-subagent]

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:

1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

反过来，自定义子代理可以用自身的 `skills` 字段预加载 Skill，此时是子代理的 Markdown 正文当提示词，Skill 作为它的参考资料。 [@ref-cc-skills-subagent]

不编辑 Skill 文件也能改变它的可见性：设置键 `skillOverrides` 按名字覆盖状态，`/skills` 菜单高亮后按空格循环、按 `Esc` 写入 `.claude/settings.local.json`。四种状态是 `on`（列出名字与描述）、`name-only`（只列名字）、`user-invocable-only`（只对 `/` 菜单可见，菜单里显示为 `user-only`）与 `off`（全部隐藏，用全名调用也报错）。未出现在 `skillOverrides` 里的 Skill 视为 `on`。 [@ref-cc-skills-overrides]

```json
{
  "skillOverrides": {
    "legacy-context": "name-only",
    "deploy": "off"
  }
}
```

在 managed settings 或 `--settings` 里，别名条目会落到别名背后的 Skill 上，且只能收窄可见性，不能放宽；插件 Skill 不受 `skillOverrides` 影响，改由 `/plugin` 管理。 [@ref-cc-skills-overrides]

附加目录的加载取决于 `project` 设置来源（默认开启），`strictPluginOnlyCustomization` 策略、bare mode 与 `--safe-mode` 会进一步限制它；被加入的目录同时带来它的 `.claude/commands/` 与 `.claude/agents/`，但这三者里只有 `.claude/skills/` 会被监视文件变化。来自 claude.ai 的同步只在以 claude.ai 账号登录且会拉取特性开关的会话里发生，用 API key、`ANTHROPIC_AUTH_TOKEN`、`CLAUDE_CODE_OAUTH_TOKEN` 或 `apiKeyHelper` 提供凭据的会话不同步，bare mode、`--safe-mode` 与把 Skill 锁到插件来源的 `strictPluginOnlyCustomization` 策略也会阻止同步。运行期重载方面，Claude Code 会监视个人、项目与附加目录的 `.claude/skills/`，增删改在会话内即生效；但全新创建、此前不存在的顶层 skills 目录要运行 `/reload-skills` 才会被监视，之后每次改动都要再运行一次；对同时作为插件的 Skill 目录，`hooks/`、`.mcp.json`、`agents/`、`output-styles/` 的改动需要 `/reload-plugins`，而 bare mode 下不监视文件变化。来源只给出这些开关与路径级结论，没有把每个开关对应到精确包版本，因此这些条件仍是文档级结论。 [@ref-cc-skills-adddir] [@ref-cc-skills-synced] [@ref-cc-skills-livechange]

## 诊断与版本边界 {#skills-diagnostics}

排查一个 Skill 不触发，按官方顺序检查：`description` 是否包含用户会自然说出的关键词；它是否出现在可用 Skill 列表里；换一种更贴近描述的措辞；能手动调用就直接用 `/技能名`。如果 frontmatter 的 YAML 解析失败，正文仍会加载但元数据为空，表现为 `/技能名` 可用而自动匹配失效，用 `--debug` 查看解析错误。要找出 frontmatter 解析不了的 `SKILL.md`，对目录运行 `claude plugin validate`，例如项目技能用 `claude plugin validate .claude/skills`，个人技能用 `claude plugin validate ~/.claude/skills`。 [@ref-cc-skills-diagnostics]

清单占用与裁剪：Claude Code 把 Skill 名称与描述加载进上下文，名称一定完整，描述则在超过字符预算时被裁剪，剪掉的正是 Claude 用来匹配关键词的部分。预算约为模型上下文窗口的 1%，超预算时从你最常少用的 Skill 开始丢描述，所以常用的保留全文。`/doctor` 给出清单上下文开销及其最大来源的估计，`/skill-doctor` 列出每个 Skill 的成本与使用频率，`/context` 的 Skills 行报告应用预算后的大小。提高预算可用设置键 `skillListingBudgetFraction`（如 `0.02` 表示 2%）或环境变量 `SLASH_COMMAND_TOOL_CHAR_BUDGET`；单条 `description` 与 `when_to_use` 的合并文本上限为 1536 字符，可用 `skillListingMaxDescChars` 调整。 [@ref-cc-skills-budget]

改动文件后的重载：新增一个此前不存在的顶层 Skill 目录后，需要 `/reload-skills` 才会被监视，之后每次改动都要再运行一次。 [@ref-cc-skills-livechange]

关于版本：本章所引官方 Skills 页与设置页均未标注适用版本，`version_applicability` 为 unknown，正文出现的多处 2.1.x 门槛（如 `/skill-doctor` 需要 2.1.252）也是页面级说明。选定的 npm 包快照记录 `@anthropic-ai/claude-code` 版本为 2.1.283，但包内 README 只指向在线文档，不能据此把上述机制固定到该精确版本。 [@ref-cc-npm-readme]
