---
schema_version: 3
record_kind: production
edition_id: claude-code-skills-v3
harness_id: claude-code
topic: skills
title: Claude Code 的 Skills：加载位置、结构、调用与诊断
sections:
  - section_id: skills-locations
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-locations-20261003
      - ref-cc-skills-bundled-20261003
      - ref-cc-skills-bundleddoctor-20261003
      - ref-cc-skills-removebundled-20261003
      - ref-cc-skills-cowork-20261003
      - ref-cc-skills-coworkloc-20261003
      - ref-cc-skills-synced-20261003
      - ref-cc-skills-syncednames-20261003
      - ref-cc-config-home-20261003
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-monorepo-20261003
      - ref-cc-skills-nestedload-20261003
      - ref-cc-skills-adddir-20261003
      - ref-cc-skills-collision-20261003
      - ref-cc-skills-reservednames-20261003
  - section_id: skills-format
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-frontmatter-20261003
      - ref-cc-skills-specfields-20261003
      - ref-cc-skills-specerror-20261003
      - ref-cc-skills-commandname-20261003
      - ref-cc-skills-substitutions-20261003
      - ref-cc-skills-projectdir-20261003
      - ref-cc-skills-supporting-20261003
      - ref-cc-skills-supportinglayout-20261003
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-invocation-20261003
      - ref-cc-skills-lifecycle-20261003
      - ref-cc-skills-arguments-20261003
      - ref-cc-skills-injection-20261003
      - ref-cc-skills-injectionfail-20261003
      - ref-cc-skills-permissions-20261003
      - ref-cc-skills-managedperm-20261003
      - ref-cc-skills-subagent-20261003
      - ref-cc-skills-subagenttools-20261003
      - ref-cc-skills-restrict-20261003
      - ref-cc-skills-restrictnested-20261003
      - ref-cc-skills-overrides-20261003
      - ref-cc-skills-pluginoverride-20261003
      - ref-cc-skills-syncedbody-20261003
      - ref-cc-skills-livechange-20261003
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cc-skills-diagnostics-20261003
      - ref-cc-skills-budget-20261003
      - ref-cc-skills-livechange-20261003
      - ref-cc-skills-skilldoctor-20261003
      - ref-cc-skills-skilldoctorflag-20261003
      - ref-cc-skills-stopsfollowing-20261003
      - ref-cc-skills-remove-20261003
      - ref-cc-skills-pluginevals-20261003
      - ref-cc-skills-trash-20261003
      - ref-cc-skills-manifest-20261003
      - ref-cc-npm-readme
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-cc-skills-locations-20261003
          - ref-cc-skills-cowork-20261003
          - ref-cc-config-home-20261003
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs:
          - ref-cc-skills-monorepo-20261003
          - ref-cc-skills-adddir-20261003
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs:
          - ref-cc-skills-collision-20261003
          - ref-cc-skills-reservednames-20261003
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-cc-skills-frontmatter-20261003
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-cc-skills-commandname-20261003
          - ref-cc-skills-substitutions-20261003
          - ref-cc-skills-projectdir-20261003
          - ref-cc-skills-supportinglayout-20261003
          - ref-cc-skills-supporting-20261003
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-cc-skills-lifecycle-20261003
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-cc-skills-invocation-20261003
          - ref-cc-skills-arguments-20261003
          - ref-cc-skills-subagent-20261003
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: partial
        source_refs:
          - ref-cc-skills-permissions-20261003
          - ref-cc-skills-managedperm-20261003
          - ref-cc-skills-overrides-20261003
          - ref-cc-skills-pluginoverride-20261003
          - ref-cc-skills-syncedbody-20261003
          - ref-cc-skills-livechange-20261003
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs:
          - ref-cc-skills-diagnostics-20261003
          - ref-cc-skills-budget-20261003
          - ref-cc-skills-skilldoctor-20261003
          - ref-cc-skills-skilldoctorflag-20261003
          - ref-cc-skills-trash-20261003
          - ref-cc-npm-readme
---

Skill 是把一段可复用指令交给 Claude 的方式：一个目录里放一份 `SKILL.md`，Claude 在相关时自动使用它，你也可以用 `/技能名` 直接调用。正文只在被调用时进入对话，所以长参考资料放在里面几乎不占上下文。本章依据 2026-10-03 抓取的官方 Skills 页与设置页快照，末尾说明它与已选定 npm 包快照的版本关系。

## Skill 的加载位置与作用域 {#skills-locations}

保存位置决定哪些会话会加载这个 Skill。官方 Skills 页把可选位置列成企业、个人、项目、嵌套、附加目录、插件与 claude.ai 账号七类。个人位置的根是 home 下的 `~/.claude/skills/`；项目位置从会话启动目录向上解析到仓库根；嵌套位置相对于启动目录下的子目录；附加目录以 `--add-dir` 传入的路径为准。设置页说明可用 `CLAUDE_CONFIG_DIR` 把 home 目录下的设置、会话历史与插件改存到别处，Windows 上 `~/.claude` 指 `%USERPROFILE%` 下的 `.claude`。 [@ref-cc-skills-locations-20261003] [@ref-cc-config-home-20261003]

以命令名为 `deploy` 的 Skill 为例，常见的几种落点如下。

| 位置 | 路径 | 生效范围 |
| --- | --- | --- |
| 企业 | managed settings 目录内的 `.claude/skills/deploy/SKILL.md`，Linux 上例如 `/etc/claude-code/.claude/skills/deploy/` | 组织部署到的机器上所有用户 |
| 个人 | `~/.claude/skills/deploy/SKILL.md` | 你在这台机器上的所有项目，Cowork 与云会话除外 |
| 项目 | `.claude/skills/deploy/SKILL.md` | 本仓库的会话；提交后克隆该仓库的团队同样获得 |
| 嵌套 | `apps/web/.claude/skills/deploy/SKILL.md` | 在 `apps/web` 或其下层启动的会话 |
| 附加目录 | `--add-dir` 传入目录下的 `.claude/skills/deploy/SKILL.md` | 该会话 |
| 插件 | `my-plugin/skills/review/SKILL.md` | 插件启用的地方，命令形如 `/my-plugin:review` |
| claude.ai 账号 | 你在 claude.ai 启用的 Skill | Cowork 会话、云会话，以及用该账号登录的终端会话 |

内置 Skill 是第八类，随宿主分发：`/doctor`、`/code-review`、`/batch`、`/debug`、`/loop`、`/claude-api` 属于捆绑 Skill，多数内置命令则直接执行固定逻辑。用 `disableBundledSkills` 设置可以整体关掉捆绑 Skill；关掉后 `/doctor` 的安装自检仍可输入，需要隐藏时用 `DISABLE_DOCTOR_COMMAND` 环境变量，或在 `skillOverrides` 里写 `"doctor": "off"`，这需要 Claude Code v2.1.205 或更高。 [@ref-cc-skills-bundled-20261003] [@ref-cc-skills-bundleddoctor-20261003] 单个捆绑 Skill 也可以在 `skillOverrides` 里设 `"off"` 隐藏。 [@ref-cc-skills-removebundled-20261003]

个人目录里的 Skill 在 Cowork 与云会话里读不到，包括定时例程触发的运行：这类会话每次都从全新云环境开始，只加载 claude.ai 账号里启用的 Skill，以及云会话中提交进克隆仓库的项目 Skill；桌面端的计划任务在你本机运行，因此仍会加载 `~/.claude/skills/`。 [@ref-cc-skills-cowork-20261003] [@ref-cc-skills-coworkloc-20261003]

终端会话里用 claude.ai 账号登录时，Claude Code 会在会话启动时把账号的 Skill 下载到 `~/.claude/skills/synced/`，运行期间大约每十分钟检查一次变更，Claude Code v2.1.273 起支持在终端同步。 [@ref-cc-skills-synced-20261003] 同步 Skill 短名被别的命令占用时只能用全名运行：`/skills`、`/context` 与 `/` 菜单把它们归在 `claude.ai sync` 分组下，名称比较忽略大小写、空格与不可见字符，并把全角字母与不同写法的破折号视为同一名称，这些检查需要 Claude Code v2.1.228 或更高。 [@ref-cc-skills-syncednames-20261003]

## 发现范围、符号链接与重名 {#skills-discovery}

项目 Skill 的扫描从会话启动目录开始，一直向上到仓库根，所以在 `packages/frontend/` 里启动仍能拿到根目录定义的 Skill；用 `/cd` 移动会话时，v2.1.246 起会把新目录的项目 Skill 一并加入。在链接的 git worktree 里，向上搜索止于 worktree 根；当 worktree 根没有 `.claude/skills` 目录时，v2.1.277 起改为加载主检出里的项目 Skill。 [@ref-cc-skills-monorepo-20261003]

启动目录之下的嵌套 Skill 不在启动时加载，而是在 Claude 第一次读取或编辑该子目录里的文件时加载，并在此后保持可用；在那之前它们不出现在 `/` 菜单里，也无法按名字调用。想在启动时就加载，可以用 `/add-dir` 把该子目录显式加进来，这需要 v2.1.257 或更高。 [@ref-cc-skills-nestedload-20261003]

用 `--add-dir` 或 `/add-dir` 加入的目录会连同它的 `.claude/skills/`、`.claude/commands/` 和 `.claude/agents/` 一起加载；Agent SDK 的 `additionalDirectories` 与 `add_dirs` 走同一条路径，因为 SDK 就是把它们作为 `--add-dir` 传入。而设置里的 `permissions.additionalDirectories` 只授予文件访问，不加载上面任何一项。 [@ref-cc-skills-adddir-20261003]

符号链接目录会被跟随，但同一个目标只会加载一次，即使多个位置都指向它。重名时由来源决定 `/名字` 实际运行哪一个：企业高于个人，个人高于项目；你写的 Skill 会替换同名的内置命令或捆绑 Skill，但不会接管它的别名，项目里的 `code-review` 替换 `/code-review`，内置别名 `/review` 仍跑内置 Skill，项目里的 `usage` 替换 `/usage`、别名 `/cost` 仍跑内置命令；同名时 Skill 优先于 `.claude/commands/` 里的命令文件；插件 Skill 带 `/插件名:技能名` 命名空间，因此与其他位置并存。 [@ref-cc-skills-collision-20261003]

同步 Skill 有一条保留命名空间：名为 `anthropic-skills` 的技能目录、frontmatter `name`、`.claude/commands/` 里的文件或子目录，以及保存的工作流都不加载，启动时会提示改哪个名字；名为 `anthropic-skills` 的插件照常加载，而同名 MCP server 能连接、工具可用，但它的 prompts 不再作为命令出现。 [@ref-cc-skills-reservednames-20261003]

## SKILL.md 结构与第一方字段 {#skills-format}

Skill 由 `SKILL.md` 顶部的 YAML frontmatter 和其后的 Markdown 正文组成。只有开头 `---` 位于文件第一行时 Claude Code 才解析 frontmatter，否则整份文件都被当作正文。所有字段都是可选的，只有 `description` 被推荐，因为宿主用它判断何时加载。字段名必须与官方表完全一致，连字符不能省；无法识别的字段被静默忽略而不报错。布尔字段除 `true` 与 `false` 外还接受 `yes`、`no`、`on`、`off`、`1`、`0`，大小写皆可，v2.1.218 之前只认 `true` 与 `false`。`.claude/commands/` 里的旧式命令文件支持同一批字段，但 `name` 与 `paths` 除外。 [@ref-cc-skills-frontmatter-20261003]

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

逐字段看：`name` 是 `/` 菜单里显示并用于调用的命令名，缺省取目录名；`description` 说明 Skill 做什么、何时使用，Claude 据此决定自动加载；`disable-model-invocation` 设为 `true` 时只有你能调用；`allowed-tools` 列出在调用该 Skill 的那一轮内无需逐次批准即可使用的工具，授权在你发送下一条消息时清除。 `model` 字段接受与 `/model` 相同的取值，也接受 `inherit` 保持当前模型；若该取值被组织的 `availableModels` 白名单排除，宿主不会使用它而保持会话现有模型。 [@ref-cc-skills-frontmatter-20261003]

第一方字段在官方表里逐项列出，用途与生效条件如下。

| 字段 | 是否必须 | 用途与条件 |
| --- | --- | --- |
| `name` | 否 | `/` 菜单里的命令名，缺省用目录名 |
| `description` | 推荐 | 做什么、何时使用；缺省取正文首行非空文本 |
| `when_to_use` | 否 | 补充触发场景，追加到 `description`，计入 1536 字符上限 |
| `argument-hint` | 否 | 自动补全时提示参数，如 `[issue-number]` |
| `arguments` | 否 | 命名位置参数，供正文里的美元加名字替换 |
| `disable-model-invocation` | 否 | 设为 `true` 时禁止 Claude 自动加载，也不预载进子代理 |
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

把个人 Skill 启用到 claude.ai 账号（用于 Cowork 与云会话）意味着上传，上传与 Skills API 打包只接受规范里的六个字段：`name`、`description`、`license`、`compatibility`、`metadata`、`allowed-tools`；出现规范之外的字段会直接报错而不是忽略。 [@ref-cc-skills-specfields-20261003] [@ref-cc-skills-specerror-20261003]

命令名由布局与 frontmatter 共同决定，插件 Skill 的 `name` 只替换命令的最后一段；写出的 `name` 已经带插件前缀时，v2.1.246 起不会重复加前缀，v2.1.216 至 v2.1.245 会重复加。 [@ref-cc-skills-commandname-20261003]

正文支持字符串替换：`$ARGUMENTS`、按下标取值的 `$ARGUMENTS[0]` 与简写 `$0`、frontmatter 里声明的具名参数，以及 `${CLAUDE_SESSION_ID}`、`${CLAUDE_EFFORT}`、`${CLAUDE_SKILL_DIR}`、`${CLAUDE_PROJECT_DIR}`、`${CLAUDE_PLUGIN_ROOT}`、`${CLAUDE_PLUGIN_DATA}` 等环境式变量。 `${CLAUDE_SKILL_DIR}` 与 `${CLAUDE_PROJECT_DIR}` 会同时在正文和 `allowed-tools` 的 Bash 规则里替换，因此脚本路径与权限规则可以写成同一变量，脚本就不必再逐次批准；`${CLAUDE_PROJECT_DIR}` 的替换需要 v2.1.196 或更高。 [@ref-cc-skills-substitutions-20261003] [@ref-cc-skills-projectdir-20261003]

Skill 目录里可以放多个文件，让 `SKILL.md` 只保留要点，细节按需读取。 [@ref-cc-skills-supporting-20261003] 官方给的布局如下：

```text
my-skill/
├── SKILL.md (required - overview and navigation)
├── reference.md (detailed API docs - loaded when needed)
├── examples.md (usage examples - loaded when needed)
└── scripts/
    └── helper.py (utility script - executed, not loaded)
```

正文里用相对链接指向这些文件，Claude 就知道每份文件包含什么、何时读取；`scripts/` 里的脚本按需执行而不进入上下文。 [@ref-cc-skills-supportinglayout-20261003]

## 加载、调用与生效条件 {#skills-invocation}

会话启动时进入上下文的是 Skill 的名称与描述清单，正文只在被调用时作为一条消息进入对话，并在之后的轮次里继续保留；宿主不会在后续轮次重读文件。Claude 再次调用一个渲染内容与上下文中完全相同的 Skill 时，只提示该 Skill 已加载而不重复追加内容，渲染内容不同（参数变了或动态注入命令产生了新输出）才追加完整正文。 [@ref-cc-skills-lifecycle-20261003]

默认你与 Claude 都能调用：你输入 `/skill-name`，Claude 依据描述自动加载。两个字段可以收窄调用方：`disable-model-invocation` 设为 `true` 只允许你调用，Claude 若仍尝试，宿主会拦下这次调用并要求它不要再换一种方式重做步骤；`user-invocable` 设为 `false` 只允许 Claude 调用。 [@ref-cc-skills-invocation-20261003]

参数既可以整体传 `$ARGUMENTS`，也可以按下标或名字取；同一条消息开头可以叠放多个 Skill，宿主展开第一个再加最多五个，展开在第一个不是可内联调用的 Skill 处停止，例如作为隔离子代理运行的 `/code-review` 或参数本身可能以斜杠命令开头的 `/loop`。 [@ref-cc-skills-arguments-20261003]

正文里的 `!` 反引号命令在内容发给 Claude 之前执行，用输出替换该行；替换只对原始文件做一遍，命令输出不会被再次扫描出新的占位符，行内形式也只在 `!` 位于行首或紧跟空白时才识别，多行命令用 ` ```! ` 围栏代码块。 [@ref-cc-skills-injection-20261003]

注入命令失败会让整次 Skill 调用作废，而不只是那一个占位符：Claude 在这次调用里看不到 Skill 正文，错误形如 `Shell command failed for pattern`，并带上命令写在 `[stderr]` 下的输出。 [@ref-cc-skills-injectionfail-20261003]

`allowed-tools` 只在调用该 Skill 的那一轮内免批准，你发送下一条消息时授权清除，Skill 正文却仍留在上下文里。工作区信任不卡这个字段：项目 Skill 的 `allowed-tools` 在从未信任过的目录里用 `-p` 运行也照样生效，所以提交进仓库的 Skill 自带很宽的工具授权时应当先审一遍。 [@ref-cc-skills-permissions-20261003] 组织在托管设置里打开 `allowManagedPermissionRulesOnly` 后，项目与个人 Skill 的 `allowed-tools` 被忽略，这些工具改走组织的托管规则与常规提示，`/status` 会列出本会话被忽略的 Skill，这需要 v2.1.282 或更高。 [@ref-cc-skills-managedperm-20261003]

想在隔离子代理里运行，给 frontmatter 加 `context: fork`，并用 `agent` 指定子代理类型；Claude Code 用该类型开一个不共享当前对话历史的新子代理，把 Skill 正文作为它的提示词，`agent` 可填内置的 `Explore`、`Plan`、`general-purpose`，也可填 `.claude/agents/` 下的自定义 agent，省略时用 `general-purpose`。子代理默认在后台运行，你继续工作、结果完成时回到对话；写 `background: false` 才在本轮等待，v2.1.218 之前 fork 一定阻塞本轮。 [@ref-cc-skills-subagent-20261003]

后台 fork 使用后台子代理的较窄工具集，Skill 步骤依赖该集合之外的工具时要写 `background: false` 才能保留完整工具集。 [@ref-cc-skills-subagenttools-20261003]

控制 Claude 能调用哪些 Skill 有三种方式。在 `/permissions` 里 deny 掉 `Skill` 工具可禁用全部 Skill；用 `Skill(名字)` 规则可以精确匹配或用 `Skill(review-pr *)` 匹配前缀；要批准同步 Skill 必须写在其保留命名空间内，`Skill(anthropic-skills:pdf)` 批准单个同步 Skill，`Skill(anthropic-skills *)` 批准全部，而 `Skill(anthropic *)` 不覆盖命名空间内的名字。 [@ref-cc-skills-restrict-20261003] deny 规则写不带限定名的名字时，v2.1.260 起也会拦住以限定名列出的嵌套 Skill。 [@ref-cc-skills-restrictnested-20261003]

不编辑 Skill 文件也能改变它的可见性：设置键 `skillOverrides` 按名字覆盖状态，`/skills` 菜单高亮后按空格循环、按 `Esc` 写入 `.claude/settings.local.json`。四种状态是 `on`（列出名字与描述）、`name-only`（只列名字）、`user-invocable-only`（只对 `/` 菜单可见，菜单里显示为 `user-only`）与 `off`（全部隐藏，用全名调用也报错）。`off` 同时把该 Skill 从 Remote Control 客户端与 Agent SDK 调用方看到的命令清单里去掉。未出现在 `skillOverrides` 里的 Skill 视为 `on`。 [@ref-cc-skills-overrides-20261003] 插件提供的 Skill 不受 `skillOverrides` 影响，要用 `/plugin` 管理。 [@ref-cc-skills-pluginoverride-20261003]

运行期重载方面，Claude Code 会监视 `~/.claude/skills/`、项目 `.claude/skills/` 以及 `--add-dir` 目录里的 `.claude/skills/`，增删改在会话内即生效；bare mode 下不监视文件变化。 [@ref-cc-skills-livechange-20261003]

同步 Skill 的正文按会话位置处理：在云会话里保留本地 Skill 的行为；在桌面端 Cowork 会话里，每个 `!` 命令行被替换成 `disableSkillShellExecution` 占位符；在你机器上的其他会话里，`!` 命令不执行、`@` 引用不附带文件、`${CLAUDE_PROJECT_DIR}` 与 `${CLAUDE_SESSION_ID}` 不替换，这些都以字面文本到达 Claude。 [@ref-cc-skills-syncedbody-20261003]

## 诊断与版本边界 {#skills-diagnostics}

排查一个 Skill 不触发，按官方顺序检查：`description` 是否包含用户会自然说出的关键词；它是否出现在可用 Skill 列表里；换一种更贴近描述的措辞；能手动调用就直接用 `/技能名`。如果 frontmatter 的 YAML 解析失败，正文仍会加载但元数据为空，表现为 `/技能名` 可用而自动匹配失效，用 `--debug` 查看解析错误。要找出 frontmatter 解析不了的 `SKILL.md`，对目录运行 `claude plugin validate`，例如项目技能用 `claude plugin validate .claude/skills`，个人技能用 `claude plugin validate ~/.claude/skills`，这需要 v2.1.233 或更高。 [@ref-cc-skills-diagnostics-20261003]

清单占用与裁剪：Claude Code 把 Skill 名称与描述加载进上下文，名称一定完整，描述则在超过字符预算时被裁剪，剪掉的正是 Claude 用来匹配关键词的部分。预算约为模型上下文窗口的 1%，超预算时从你最常少用的 Skill 开始丢描述，所以常用的保留全文。`/doctor` 给出清单上下文开销及其最大来源的估计，`/context` 的 Skills 行报告应用预算后的大小，v2.1.196 之前该行统计的是每条描述的完整文本，可能显示远大于实际预算的值。提高预算可用设置键 `skillListingBudgetFraction`（如 `0.02` 表示 2%）或环境变量 `SLASH_COMMAND_TOOL_CHAR_BUDGET`；单条 `description` 与 `when_to_use` 的合并文本上限为 1536 字符，可用 `skillListingMaxDescChars` 调整。 [@ref-cc-skills-budget-20261003]

改动文件后的重载：新增一个此前不存在的顶层 Skill 目录后，需要 `/reload-skills` 才会被监视，之后每次改动都要再运行一次；监视只覆盖 `SKILL.md` 文本，同一个目录同时是插件时，`hooks/`、`.mcp.json`、`agents/`、`output-styles/` 的改动需要 `/reload-plugins`。 [@ref-cc-skills-livechange-20261003]

找哪些 Skill 值得关掉用 `/skill-doctor`：交互会话里报告开在 `/plugin` 管理器的 **Stats** 标签，`-p` 模式下以文本打印；报告覆盖会话里除捆绑 Skill 与企业 Skill 之外的 Skill，标出从未被调用过的那些并指出在哪里关掉，还列出近期没用过的插件。 [@ref-cc-skills-skilldoctor-20261003] 它需要 v2.1.252 或更高，在跳过特性开关拉取的会话里不可用，用 Remote Control 从手机或浏览器运行时宿主直接回复该连接不支持用量报告，应在运行会话的机器上于终端执行。 [@ref-cc-skills-skilldoctorflag-20261003]

Skill 跟随久了却被忽略有三种情况：必须每次都成立的规则应改写成 hook，其中随 Skill 走的那条就写在 Skill 的 `hooks` frontmatter 里，它从 Skill 被调用起一直有效到会话结束；需要判断力的指导应写成覆盖整个任务的措辞；对话被压缩后重新调用一次 Skill 即可恢复完整内容，因为压缩后宿主可能只保留已调用 Skill 的开头，所以最重要的指令要放在 `SKILL.md` 靠前的位置。 [@ref-cc-skills-stopsfollowing-20261003]

移除方式取决于来源：个人与项目 Skill 直接删掉目录，当前会话的 `/skills` 列表随即不再列出它，但已经加载进上下文的内容仍按内容生命周期留在会话里。 [@ref-cc-skills-remove-20261003] 想比较有没有这个 Skill 的效果，可以做基线对照：个人或项目 Skill 在 `skillOverrides` 里设 `"off"` 重跑，插件提供的 Skill 用 `claude plugin eval` 的无插件基线重跑。 [@ref-cc-skills-pluginevals-20261003]

个人 Skill 目录消失时先看 `~/.claude/skills/.trash/`：被移除的 Skill 会移进带时间戳的回收目录，把文件夹移回 `~/.claude/skills/` 即可恢复，但要在保留期清理之前，默认是移入回收目录后 30 天。 [@ref-cc-skills-trash-20261003] v2.1.280 之前，`~/.claude/skills/` 里一个名为 `manifest.json` 的文件会让 Claude Code 把其中列出的 Skill 目录移进回收目录并停止加载。 [@ref-cc-skills-manifest-20261003]

关于版本：本章所引官方 Skills 页与设置页均未标注适用版本，`version_applicability` 为 unknown，正文出现的多处 2.1.x 门槛也是页面级说明。选定的 npm 包快照记录 `@anthropic-ai/claude-code` 版本为 2.1.283，但包内 README 只指向在线文档，不能据此把上述机制固定到该精确版本。 [@ref-cc-npm-readme]
