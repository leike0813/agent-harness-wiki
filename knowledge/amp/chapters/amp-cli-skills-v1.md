---
schema_version: 3
record_kind: production
edition_id: amp-cli-skills-v1
harness_id: amp
topic: skills
title: "Amp CLI 的 Skill：来源目录、优先级、格式与加载"
sections:
  - section_id: skills-sources
    surface_ids: [cli]
    source_refs: [ref-amp-docs-index-pages, ref-amp-manual-intro, ref-amp-skills-precedence, ref-amp-settings-skills, ref-amp-global-local, ref-amp-skills-create, ref-amp-skills-repos]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-amp-skills-format, ref-amp-plugins-bundled-skill, ref-amp-pluginapi-skilldef, ref-amp-skills-mcp]
  - section_id: skills-mcp
    surface_ids: [cli]
    source_refs: [ref-amp-skills-mcp, ref-amp-mcp-loading, ref-amp-mcp-config]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-amp-skills-format, ref-amp-skills-reload, ref-amp-global-publish, ref-amp-global-update, ref-amp-plugins-bundled-skill, ref-amp-settings-skills]
  - section_id: skills-repos
    surface_ids: [cli]
    source_refs: [ref-amp-skills-repos, ref-amp-global-share, ref-amp-global-publish, ref-amp-skills-limits, ref-amp-global-update]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amp-skills-reload, ref-amp-skills-repos, ref-amp-global-repos, ref-amp-global-publish, ref-amp-skills-precedence, ref-amp-settings-skills]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-sources
        status: answered
        source_refs: [ref-amp-skills-precedence, ref-amp-settings-skills, ref-amp-global-local, ref-amp-skills-repos]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-sources
        status: partial
        source_refs: [ref-amp-skills-precedence, ref-amp-skills-repos]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-sources
        status: answered
        source_refs: [ref-amp-skills-precedence]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-amp-skills-format]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-amp-plugins-bundled-skill, ref-amp-pluginapi-skilldef, ref-amp-skills-mcp]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-amp-skills-format, ref-amp-skills-reload, ref-amp-global-publish]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-amp-skills-reload, ref-amp-plugins-bundled-skill]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-sources
        status: answered
        source_refs: [ref-amp-settings-skills, ref-amp-skills-precedence]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-amp-skills-reload, ref-amp-skills-repos]
---

## 固定来源与 Skill 查找位置 {#skills-sources}

本主题的固定来源是官方文档站 ampcode.com 的页面快照：`/docs/customize/skills`、`/docs/customize/global-plugins-and-skills`、`/docs/cli/settings`、`/docs/plugin-api` 与 `/docs/markdown`（文档索引）。Amp CLI 是闭源服务，没有可固定的源码提交，因此全部结论都是来源级知识（snapshot 的 `version_applicability` 为 `unknown`），不代表某个具体发行版的行为。[@ref-amp-docs-index-pages][@ref-amp-manual-intro]

Skill 是「包含指令和可选资源的目录」。Amp 自带内置 skill，用户也可以把它放在项目里、只装在这台机器上，或发布给自己与工作区使用。官方文档给出的查找顺序（同名 skill 取第一个）是 [@ref-amp-skills-precedence]：

1. `~/.config/agents/skills/`
2. `~/.agents/skills/`
3. `~/.config/amp/skills/`
4. 项目及向上搜索的父目录中的 `.agents/skills/`
5. 这些目录中的 `.claude/skills/`
6. `~/.claude/skills/`
7. `~/.claude/plugins/cache/`
8. `amp.skills.path` 中列出的目录，按配置顺序
9. 内置 skill
10. 个人（personal）skill 仓库
11. 当前生效的 workspace skill 仓库

顺序的直接后果：本地与内置 skill 会遮蔽仓库中同名 skill，personal skill 会遮蔽同名 workspace skill。[@ref-amp-skills-precedence]

`amp.skills.path` 是唯一由设置直接追加的目录：它是字符串，支持冒号分隔（Windows 用分号），`~` 表示 home，相对路径相对 workspace 根解析——所以 workspace 的 `.amp/settings.json` 可以写 `.amp/skills`。[@ref-amp-settings-skills]

三个作用域的仓库之外，项目与机器本地还有固定位置：`.agents/skills/`（随项目走）与 `~/.config/agents/skills/`（只在这台机器上）。`amp skill add --global` 安装到 `~/.config/agents/skills/`。[@ref-amp-global-local][@ref-amp-skills-create]

**发现范围**：Amp 在每个 skills 根下递归搜索，深度最多五层目录（例如 `~/.agents/skills/something/deep/SKILL.md`），包含 `SKILL.md` 的那个目录就是 skill 目录；但 personal 与 workspace skill 仓库的布局不同——每个 skill 必须是仓库根的直接子目录。[@ref-amp-skills-precedence][@ref-amp-skills-repos]

**专有字段会改变这里的结论**：`amp.skills.disableClaudeCodeSkills`（默认 `false`）跳过 `.claude/skills/`、`~/.claude/skills/`、`~/.claude/plugins/cache/`；`amp.skills.disableGlobalAgentsSkills`（默认 `false`）跳过 `~/.config/agents/skills/` 与 `~/.agents/skills/`。两者都不影响 `~/.config/amp/skills/`、`amp.skills.path`、内置、personal 与 workspace skill。[@ref-amp-settings-skills]

固定来源没有描述符号链接、忽略文件（如 `.gitignore`）或大小写折叠对发现的影响，这些点未验证。

## SKILL.md 的格式与附加文件 {#skills-format}

每个 skill 是一个目录，目录里有一份带 YAML frontmatter 的 `SKILL.md`。文档给出的最小形式是 [@ref-amp-skills-format]：

```markdown
---
name: my-skill
description: A description of what this skill does
---

# My Skill Instructions

Detailed instructions for the agent...
```

Amp 把「每个被发现的 skill」列给模型：模型看到的是 `name` 与 `description`，并用它们决定何时加载；`SKILL.md` 的其余正文只有在该 skill 被调用时才加载。skill 目录里可以放脚本、模板与参考文件，Agent 用相对 skill 目录的路径访问它们。[@ref-amp-skills-format]

固定来源只把 `name` 与 `description` 作为被解析的字段来讨论，没有列出必填/可选的完整字段表，也没有说明未知字段、非法 frontmatter 或编码错误时的行为——这些是明确缺口。

**插件的专有扩展**：目录型插件可以打包 skill，但 Amp 不会自动扫描插件的 `skills/` 目录，插件必须在加载时调用 `await amp.registerSkill({ path: 'skills/deploy-guide' })` 注册；路径相对插件目录，且必须指向含 `SKILL.md` 的目录，frontmatter 的 `name` 必须与目录名一致。这样注册出来的 skill 带限定名 `plugin-name:skill-name`，因此不与上面的裸名竞争。单文件插件不能注册 skill；重载或禁用插件会一并移除它带的 skill。[@ref-amp-plugins-bundled-skill][@ref-amp-pluginapi-skilldef]

**`builtin-tools` frontmatter 字段**是另一个专有字段：插件自带的 skill 可以把「同一个插件注册的工具」列进去，这些工具在被列出的 skill 加载前对模型隐藏，加载后才把完整 schema 写进 skill 内容并变为可调用；没有被任何 skill 列出的插件工具始终可见。[@ref-amp-plugins-bundled-skill]

**兄弟文件 `mcp.json`** 与 frontmatter 的 `mcpServers` 字段见下一节。[@ref-amp-skills-mcp]

## Skill 中声明 MCP server {#skills-mcp}

skill 可以在同级目录的 `mcp.json` 里、或在 `SKILL.md` frontmatter 的 `mcpServers` 字段里定义 MCP server；两者同时存在时以 `mcpServers` 为准，`mcp.json` 被忽略。Amp 在发现该 skill 时就连接它的 MCP server，但「仅由 skill 定义」的 server 的工具在 skill 被加载前对模型隐藏；如果同名 server 还由 CLI flag 或直接配置提供，则后者优先且其工具始终可见。[@ref-amp-skills-mcp]

文档给出的两个最小示例（同一个文件中的 stdio 与 HTTP 两种写法）[@ref-amp-skills-mcp]：

```json
{
	"chrome-devtools": {
		"command": "npx",
		"args": ["-y", "chrome-devtools-mcp@latest"],
		"includeTools": ["navigate_*", "take_screenshot", "click", "fill*"]
	}
}
```

```json
{
	"linear": {
		"url": "https://mcp.linear.app/sse",
		"includeTools": ["list_issues", "create_issue", "update_issue"]
	}
}
```

字段分为三组：本地 server 用 `command`（string）、`args`（string[]，可选）、`env`（object，可选）；远程 server 用 `url`（string）、`headers`（object，可选）；两者共用的 `includeTools`（string[]，可选但官方建议给出）是工具名或 glob 模式，用来挑选暴露哪些工具。[@ref-amp-skills-mcp]

就本地配置而言，同名 MCP server 的优先级是：CLI flag（`--mcp-config`）→ workspace 配置 → user 配置 → skills。也就是说 skill 提供的 server 优先级最低，可以被用户自己的配置覆盖。[@ref-amp-mcp-loading]

官方对大多数场景的建议是「把 MCP server 打包进 skill」而不是加进用户设置，理由是工具列表更干净、只在需要时才加载；只有当 server 必须一直在上下文里时才放进 `amp.mcpServers`。[@ref-amp-mcp-config]

## 进入上下文、调用与生效条件 {#skills-loading}

名称与描述在发现阶段就进入模型上下文，正文在调用时才读入。[@ref-amp-skills-format]

**显式调用入口**有三类：

1. 让 Agent 去做：「List the skills available in this thread and where each one came from」「Reload my skills」这类自然语言请求。[@ref-amp-skills-reload]
2. `reload_skills` 工具：重新扫描本地目录，并拉取最新的 personal 与 workspace skill；在另一个 shell 里跑 `amp skills list` 不会重载已有会话。[@ref-amp-skills-reload]
3. 模型自动匹配：模型依据 `name` 与 `description` 决定何时加载 skill 正文。[@ref-amp-skills-format]

**生效条件**：新线程会自动加载已发布的 skill；已有线程不会在 push 后自动重载插件（skill 同理，需要显式重载）。个人/工作区 skill 仓库的改动要先 commit 再 push 才算发布。[@ref-amp-global-publish][@ref-amp-global-update]

插件带来的 `builtin-tools` 门控是「加载才可见」的典型条件：未加载时那些工具不出现在模型上下文里。[@ref-amp-plugins-bundled-skill]

被禁用或被 `amp.skills.disable*` 设置排除的目录不参与发现，见第一节。[@ref-amp-settings-skills]

## 个人与工作区 Skill 仓库 {#skills-repos}

Amp 把每个作用域存成一个独立的 Git 仓库：personal skill 处处可用，workspace skill 由工作区管理员管理、对全体成员可用。官方给出的操作方式主要是对话式——让 Agent 找到正确的仓库、准备改动、评审并 commit，推送前询问；push 即发布。仓库也可以直接编辑，此时每个 skill 必须是顶层目录且 `SKILL.md` 直接位于其中，目录名必须与 `SKILL.md` 的 `name` 一致 [@ref-amp-skills-repos]：

```text
release-notes/
├── SKILL.md
├── scripts/
└── references/
```

命令行入口：`amp skills repositories` 列出仓库与 clone 命令，`amp clone user-skills` / `amp clone workspace-skills` 克隆仓库，`amp skill import` / `amp skill update` 管理共享导入。仓库所有者可以在仓库的 Advanced 设置里要求签名提交。[@ref-amp-skills-repos]

共享路径：在 Personal Settings 的 Skills 里选中某项 → Share → 对工作区可见 → 复制 URL。拿到 URL 的人可以把它粘进线程或导入自己的仓库，改自己的副本不影响原作者的。[@ref-amp-global-share]

管理员的发布路径：把测试好的共享项复制进 workspace 仓库（`Copy the shared release-notes skill into our workspace skills: 共享 skill 的 URL` 这类请求），Amp 准备可评审的改动并在 push 前询问；push 之后新线程自动加载新版。[@ref-amp-global-publish]

**宿主仓库限制**（对 personal 与 workspace 仓库各自生效，不影响项目或机器本地目录）[@ref-amp-skills-limits]：每个仓库最多 200 个 skill；超过时只按字母序取前 200 个目录，其余不可用，且重载或新线程都无法恢复。其余限制在选出前 200 个之后继续检查：每个 skill 含 `SKILL.md` 最多 200 个文件、单文件最大 10 MiB、单个 skill 总计 25 MiB、仓库总计 25 MiB；托管的 skill 文件必须是文本文件。

导入项不会被无声覆盖：可以要求 Agent 检查哪些导入已过期并准备更新，或对某个 checkout 执行 `amp plugins update NAME` / `amp skill update NAME`，评审、commit、push 之后才发布。[@ref-amp-global-update]

## 诊断与重载 {#skills-diagnostics}

| 入口 | 能看到什么 | 生效范围 |
| :-- | :-- | :-- |
| `amp skills list` | 已发现的 skill（可加 `--json` 得到机器可读输出） | 只读；在另一个 shell 运行不会重载已有会话 [@ref-amp-skills-reload] |
| 命令面板（`Ctrl+O`）→ `skills: list` | 交互式查看 | 当前会话 [@ref-amp-skills-reload] |
| 提问「List the skills available in this thread and where each one came from」 | 每个 skill 的来源 | 当前线程 [@ref-amp-skills-reload] |
| `reload_skills` 工具 / 「Reload my skills」 | 重新扫描本地目录并拉取最新 personal、workspace skill | 当前线程 [@ref-amp-skills-reload] |
| `amp skills repositories` | 可用的仓库与 clone 命令，以及能否写入 | 只读 [@ref-amp-skills-repos] |
| `amp plugins repositories` | 同名插件仓库列表 | 只读 [@ref-amp-global-repos] |

改动文件后的重载规则：本地 skill 目录用 `reload_skills` 重扫；仓库里的 skill 要 push 后在新线程自动加载，或在当前线程显式重载。[@ref-amp-skills-reload][@ref-amp-global-publish]

如果 skill 没有出现，按第一节的 11 级顺序核对它是否被更高优先级的同名 skill 遮蔽，或是否落在被 `amp.skills.disableClaudeCodeSkills` / `amp.skills.disableGlobalAgentsSkills` 排除的目录里；固定来源没有提供逐条「发现失败原因」的日志入口，这是缺口。[@ref-amp-skills-precedence][@ref-amp-settings-skills]
