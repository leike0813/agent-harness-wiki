---
schema_version: 3
record_kind: production
edition_id: devin-cli-native_plugins-v1
harness_id: devin
topic: native_plugins
title: "Devin CLI 的 Plugins：包格式、安装、治理、扩展点与诊断"
sections:
  - section_id: plugins-scope-model
    surface_ids: [cli]
    source_refs: [ref-devin-plug-format, ref-devin-plug-skillsrules, ref-devin-ext-how, ref-devin-controls-limits, ref-devin-plug-install]
  - section_id: plugins-package-manifest
    surface_ids: [cli]
    source_refs: [ref-devin-plug-format, ref-devin-plug-compat, ref-devin-plug-manifest, ref-devin-plug-metadata, ref-devin-plug-skillsrules, ref-devin-plug-mcp]
  - section_id: plugins-install-lifecycle
    surface_ids: [cli]
    source_refs: [ref-devin-plug-install, ref-devin-cmd-plugins, ref-devin-plug-manage, ref-devin-plug-deps, ref-devin-cmd-doctor]
  - section_id: plugins-discovery-api
    surface_ids: [cli]
    source_refs: [ref-devin-plug-levels, ref-devin-plug-authority, ref-devin-plug-deny, ref-devin-plug-deps, ref-devin-plug-conflicts, ref-devin-plug-compat, ref-devin-plug-skillsrules, ref-devin-plug-format, ref-devin-plug-mcp]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-devin-plug-manage, ref-devin-cmd-plugins, ref-devin-plug-conflicts, ref-devin-plugqs-fork, ref-devin-plugqs-make, ref-devin-plugqs-test, ref-devin-plugqs-dist, ref-devin-plugqs-govern, ref-devin-auth-access]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-scope-model
        status: answered
        source_refs: [ref-devin-plug-format, ref-devin-plug-skillsrules, ref-devin-ext-how, ref-devin-controls-limits, ref-devin-plug-install]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package-manifest
        status: answered
        source_refs: [ref-devin-plug-format, ref-devin-plug-compat, ref-devin-plug-manifest, ref-devin-plug-metadata, ref-devin-plug-skillsrules, ref-devin-plug-mcp]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install-lifecycle
        status: answered
        source_refs: [ref-devin-plug-install, ref-devin-cmd-plugins, ref-devin-plug-manage, ref-devin-plug-deps, ref-devin-cmd-doctor]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-api
        status: answered
        source_refs: [ref-devin-plug-levels, ref-devin-plug-authority, ref-devin-plug-deny, ref-devin-plug-deps, ref-devin-plug-conflicts, ref-devin-plug-compat, ref-devin-plug-skillsrules, ref-devin-plug-format, ref-devin-plug-mcp]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-api
        status: partial
        source_refs: [ref-devin-plug-levels, ref-devin-plug-authority, ref-devin-plug-deny, ref-devin-plug-deps, ref-devin-plug-conflicts, ref-devin-plug-compat, ref-devin-plug-skillsrules, ref-devin-plug-format, ref-devin-plug-mcp]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-install-lifecycle
        status: partial
        source_refs: [ref-devin-plug-install, ref-devin-cmd-plugins, ref-devin-plug-manage, ref-devin-plug-deps, ref-devin-cmd-doctor]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: answered
        source_refs: [ref-devin-plug-manage, ref-devin-cmd-plugins, ref-devin-plug-conflicts, ref-devin-plugqs-fork, ref-devin-plugqs-make, ref-devin-plugqs-test, ref-devin-plugqs-dist, ref-devin-plugqs-govern, ref-devin-auth-access]
---

## 插件模型与边界 {#plugins-scope-model}

固定来源是官方文档站 `docs.devin.ai` 的 Devin CLI markdown 快照：`cli/extensibility/plugins/overview.md`、`cli/extensibility/plugins/quickstart.md`、`cli/extensibility/index.md`、`cli/extensibility/configuration.md`、`cli/reference/configuration/global-vs-local.md`、`cli/reference/commands.md`、`cli/enterprise/controls.md`、`cli/enterprise/devin-auth.md`、`cli/extensibility/skills/overview.md`。文档未标注软件版本，全章为来源级知识；插件机制跨 Devin cloud sessions、CLI 与 Devin Desktop 三个界面，存在界面差异（例如插件 subagent 只在本地 agent 加载）[@ref-devin-plug-format]。

**plugins.model**：插件是**安装单位**——一个包含 skills 和可选 rules、hooks、MCP servers、custom subagents 的包，来源可以是 GitHub repo、git URL、repo 的子目录或本地文件夹 [@ref-devin-plug-format]。它不引入新的 skill 格式：插件里的 skill 就是普通 `SKILL.md` [@ref-devin-plug-skillsrules]，插件提供的 subagent 就是普通 `agents/NAME.md`，插件提供的 MCP 就是普通 MCP 声明 [@ref-devin-plug-format]。安装插件后其 skill 以 `/PLUGIN:SKILL` 斜杠命令暴露；不能只装插件里的单个 skill——要单独分发就把 skill 拆成不同插件 [@ref-devin-plug-format]。插件与 Skill、MCP server、Hook 脚本、普通包的关系因此是"打包与治理层"：它把前述机制装订成可安装、可继承、可被企业治理的单元，并补充了 Cascade 里没有的等价机制 [@ref-devin-ext-how][@ref-devin-controls-limits]。企业可以为其成员**关闭 CLI 插件**，此时已安装插件不被应用 [@ref-devin-plug-install]。

## 插件包格式与清单 {#plugins-package-manifest}

**plugins.package**：原生布局以 `.devin-plugin/plugin.json` 为清单，目录形状是 [@ref-devin-plug-format]：

```text
my-plugin/
├── .devin-plugin/plugin.json   # 清单（唯一必需）
├── AGENTS.md                   # 可选：always-on rule
├── rules/                      # 可选：带 trigger frontmatter 的规则
├── agents/NAME.md              # 可选：自定义 subagent
├── hooks.json                  # 可选：生命周期 hook
├── .mcp.json                   # 可选：MCP server
└── skills/NAME/SKILL.md        # 普通 skill
```

一个 repo（或一个 `git-subdir` 子目录）就是一个插件；同一 repo 可以放多个子目录插件，各自用自己的 `git-subdir` 源引用 [@ref-devin-plug-format]。兼容三种布局，清单优先级为 `.devin-plugin/plugin.json` > `.claude-plugin/plugin.json` > 根 `plugin.json` [@ref-devin-plug-compat]：

| 布局 | 清单 | MCP 约定 |
| - | - | - |
| Devin 原生 | `.devin-plugin/plugin.json` | 根 `.mcp.json` |
| Claude 插件 | `.claude-plugin/plugin.json` | 根 `.mcp.json` 与清单 `mcpServers`；`${CLAUDE_PLUGIN_ROOT}` 展开为插件根 |
| Agent Plugins 1.0.0 | 根 `plugin.json` | 根 `mcp.json`（在 `.mcp.json` 之后读取，同名冲突时 `.mcp.json` 胜） |

Agent Plugins 布局还带规范约定的运行时行为：`${PLUGIN_DATA}` 在 `args`、`env` 值与 `cwd` 里展开为按插件身份（非版本）持久、可写的每插件数据目录（内容跨插件更新保留，卸载时删除）；`stdio` server 进程额外获得 `PLUGIN_ROOT` 与 `PLUGIN_DATA` 环境变量；server 可设 `cwd`（相对插件根，默认插件根）；`./` 前缀的 `command` 相对插件根解析，使插件能自带可执行文件；两者都校验不越出插件根或数据目录；MCP 条目可用规范的 `type`（`stdio`/`streamable-http`/`sse`）代替 `transport`；无法识别的 `$schema` 版本只警告并 best-effort 加载 [@ref-devin-plug-compat]。

清单里只有 `name` 必需，且必须在已安装插件中唯一（它就是 `/NAME:...` 的命名空间）；名字是小写字母数字加单个 `-` 或 `.` 分隔符（如 `review-tools`、`acme.tools`） [@ref-devin-plug-manifest]。完整清单示例（来自官方）[@ref-devin-plug-manifest]：

```jsonc
{
  "name": "review-tools",
  "version": "1.0.0",
  "description": "Code-review skills for our team",
  "requiredPlugins": ["acme/secure-base", { "source": "github", "repo": "acme/audit-logging" }],
  "optionalPlugins": ["acme/deploy-tools", { "source": "url", "url": "https://gitlab.com/acme/extra.git" }],
  "forbiddenPlugins": ["sketchy-org/bad-plugin", "acme/*", "*"]
}
```

元数据字段还包括 `version`、`description`、`author`（`{name,email}`）、`homepage`、`repository`、`license`、`keywords`；其中只有 `name` 参与身份与命名空间，其余只是描述性、由 `devin plugins info` 展示 [@ref-devin-plug-metadata]。

`skills` 字段替换默认的 `skills/` 目录，接受单个或一组插件根相对路径（如 `"skills": ["skills", "extra/skills"]`）；空数组 `[]` 关闭 skill 加载；绝对路径、`~`、`..` 越界会被拒绝并使**整个清单**失效 [@ref-devin-plug-skillsrules]。rules 独立于 `skills`：根 `AGENTS.md` 是 always-on，`rules/` 下的 markdown 按 `trigger` frontmatter 与 Windsurf 的激活类型加载 [@ref-devin-plug-skillsrules]。`mcpServers` 接受四种形状 [@ref-devin-plug-mcp]：

| 形状 | 含义 |
| - | - |
| `"config/mcp.json"` | 一个声明文件 |
| `["config/mcp.json", "config/extra.json"]` | 多个，按列出顺序读取 |
| `{ "paths": [...], "exclusive": true }` | 只用这些文件，抑制根 `.mcp.json` 约定 |
| 内联 server map | 非空时抑制根约定；空 map 不抑制 |

声明路径越界时**丢弃该条**而不使清单失效；`mcpServers` 无效只关闭 MCP 加载，skills/rules/hooks 照常；空数组不抑制根约定；同名 server 第一个来源获胜 [@ref-devin-plug-mcp]。

## 安装、版本与治理 {#plugins-install-lifecycle}

**plugins.install**：安装源是 GitHub `owner/repo`、git URL 或本地路径；插件在 repo 子目录时追加 `#path/to/plugin` [@ref-devin-plug-install][@ref-devin-cmd-plugins]：

```bash
devin plugins install acme/review-tools
devin plugins install acme/plugins#plugins/review
devin plugins install https://gitlab.com/acme/review-tools.git
devin plugins install --local ./my-plugin
```

安装前会显示该插件带来什么（提供的 skill、会自动装的必需插件、引入的策略，例如禁止其它插件），`-y/--yes` 跳过确认 [@ref-devin-plug-install]。插件安装在**用户级**、跨所有项目可用；默认 `install` 会把插件记入 Devin Cloud 里的个人清单，从而在每台登录机器与云会话生效；`--local` 只装本机，本地文件夹插件只能用 `--local`（直接链接到源目录，编辑即时生效，无需 `update`）[@ref-devin-plug-install][@ref-devin-plug-manage]。管理命令 [@ref-devin-plug-manage]：

| 命令 | 作用 |
| - | - |
| `devin plugins list` | 列出已装插件、版本与是否被策略阻止 |
| `devin plugins info NAME` | 展示插件的 skills、hooks、rules 及 required/optional/forbidden 列表 |
| `devin plugins update [NAME]` | 重新拉取到最新版本（省略名字则全部更新） |
| `devin plugins remove NAME` | 从个人插件移除（自动装的必需插件保留）；`--local` 只从本机移除（对个人清单里的插件会失败）；`--force` 忽略治理要求强删（被治理要求的插件会在下次会话被重装并警告） |
| `devin plugins prune` | 丢弃磁盘上已不存在的 repo 的需求并回收未引用内容 |

依赖项支持固定版本：对象形式的 `sha` 钉死 commit（在你改条目之前永不变）、`ref` 跟踪分支或 tag（每次刷新重新解析）、二者互斥且可配在 `github`/`url`/`git-subdir` 所有对象形式上；不给则跟踪默认分支；同一 GitHub repo 的各种写法（`owner/repo`、HTTPS、`.git`、SSH）视为同一身份 [@ref-devin-plug-deps]。治理要求 `devin auth login`（管理插件需登录），企业可关闭 CLI 插件 [@ref-devin-plug-install]。

**plugins.lifecycle**：状态可观察为"已安装 / 被策略阻止 / 会话中加载"。阻止在**两个时点**执行：安装时拒绝安装被阻止的插件（或其必需依赖无法满足、或名字与已装插件冲突）；加载时对已装但随后被阻止的插件保留磁盘内容，但在会话开始时跳过其 skill 并给出指名 forbidder 的警告（**soft-fail**，不中断会话）[@ref-devin-plug-deps]。`devin plugins list` 显示版本与 blocked 状态、`info` 显示各清单、`update` 重新拉取 [@ref-devin-plug-manage]。权限/依赖的细粒度健康检查没有专门入口，`devin doctor` 的检查项也不覆盖插件 [@ref-devin-cmd-doctor]；因此 lifecycle 按 partial 阅读。

## 发现、加载、扩展点 {#plugins-discovery-api}

**plugins.discovery**：插件不在单一位置声明。除了自己的安装，还会被 repo 与组织管理员要求、背书或禁止，形成四个**权威层级**（高到低）[@ref-devin-plug-levels]：

| 层级 | 来源 | 说明 |
| - | - | - |
| 1 Enterprise | 账号级托管清单，企业管理员配置 | 最高权威 |
| 2 Org | org 级托管清单 | 层叠在企业之下，可增不可越；云会话用会话所在 org 的清单，CLI 与 Desktop 用主 org 的清单 |
| 3 Repo | checkout 里 `.devin/config.json` 的三张清单 | 从工作目录向上查找 |
| 4 User | 自己 `devin plugins install` 装的（经个人清单同步）或 `--local` | 最低权威 |

CLI 在登录时从 Devin Cloud 拉取 enterprise、org 与个人清单；前两者由管理员在网页端维护 [@ref-devin-plug-levels]。层级规则是 **higher authority wins**：低层不能重新允许高层禁止的插件，也不能禁止高层要求的插件（该 forbid 被忽略、插件照样加载）[@ref-devin-plug-authority]。denylist 只能在同一层级用自己的 `optionalPlugins`/`requiredPlugins` 开例外（不跨层），单清单内 `forbiddenPlugins: ["*"]` 加 `optionalPlugins: [...]` 就是"只允许我列的"；`*` 通配可匹配任意字符含 `/`（`acme/*`、`*/secrets`、`https://gitlab.com/acme/*`），单独的 `"*"` 匹配其余一切（完全锁定） [@ref-devin-plug-deny][@ref-devin-plug-deps]。require 与 forbid 在同一层但来自**不同**清单时以 forbid 为准；被治理阻止的插件软失败；成为依赖不带来豁免（传递依赖仍受所有适用 forbid 约束，并继承要求它的插件的最高权威层）；两清单把同一插件钉到不同 `sha` 属 pin 冲突，应由高层或对齐解决；托管清单在会话开始时拉取失败时该层 **fail open**（不装也不执行禁止）[@ref-devin-plug-conflicts]。清单优先级、兼容布局、`skills`/`mcpServers` 的路径校验与"越界即失效/丢弃"规则见上节 [@ref-devin-plug-compat][@ref-devin-plug-skillsrules]。本地多来源之间的加载顺序与命名冲突（除清单优先级外）未记载。

**plugins.api**：插件能贡献的扩展点有 [@ref-devin-plug-format][@ref-devin-plug-mcp]：

| 扩展点 | 载体 | 生效范围与限制 |
| - | - | - |
| skills | `skills/`（或 `skills` 字段指定的目录） | 三界面均生效；普通 SKILL.md |
| rules | 根 `AGENTS.md`（always-on）+ `rules/*.md`（triggered） | 与项目自身规则并存 |
| custom subagents | `agents/NAME.md` 或 `agents/NAME/AGENT.md` | 仅本地 agent（CLI、Desktop），不进云会话 |
| hooks | 根 `hooks.json` | 仅本地会话；best effort、fail open |
| MCP servers | 根 `.mcp.json`（或清单 `mcpServers`） | 随会话启动；OAuth server 用 `devin mcp login` 认证；插件 MCP 配置可写 OAuth client ID 与 scopes，但**永不**可带 client secret——带 secret 的配置在激活时被拒，密钥要写成 `${NAME}`，字面值会被剥离 |

除这些声明式扩展点外，来源没有给出插件可用的宿主 API、权限模型或运行时沙箱边界；因此 api 按 partial 阅读。

## 诊断与团队分发 {#plugins-diagnostics}

`devin plugins list` 给出已装插件、版本与是否被策略阻止；`devin plugins info NAME` 给出该插件的 skills、hooks、rules 及其 required/optional/forbidden 清单 [@ref-devin-plug-manage][@ref-devin-cmd-plugins]。会话开始时被阻止的插件会打印指名 forbidder 的警告，`remove --force` 时 CLI 也会警告是哪个企业/组织/仓库配置仍在要求它 [@ref-devin-plug-conflicts][@ref-devin-plug-manage]。`devin plugins prune` 清掉失效需求与未引用内容，`devin plugins update` 刷新本地内容；若 CLI 有插件而 Customize 页面显示缺失或过期，需要在网页端 **Reindex plugins**；`--local` 安装留在本设备 [@ref-devin-plug-manage]。

团队分发走官方模板流程 [@ref-devin-plugqs-fork][@ref-devin-plugqs-make][@ref-devin-plugqs-test][@ref-devin-plugqs-dist][@ref-devin-plugqs-govern]：fork `CognitionAI/team-marketplace-template`，根目录本身是 **meta-plugin**（其 `requiredPlugins` 拉入基线、`optionalPlugins` 背书可选、`forbiddenPlugins` 拦截），`plugins/NAME/` 子目录各自是独立插件并各有自己的 `.devin-plugin/plugin.json`；本地验证用 `node scripts/validate-template.mjs`（CI 也跑）与 `devin plugins install --local .`，然后 `devin plugins list` 看它拉进了什么；管理员在 Customize 的 **Add plugin → From repository** 里按 org/enterprise scope 安装该 repo（等价于向托管清单加一条 `requiredPlugins`），全 scope 成员自动获得；私有 repo 对 CLI 用户需要其自己的 git 凭据；合并到默认分支即发布，用 `sha` 钉住更新节奏；锁定账号时用 `forbiddenPlugins: ["*"]` 并显式列出全部获批插件（含 meta-plugin 的依赖，传递依赖不豁免）[@ref-devin-plugqs-fork][@ref-devin-plugqs-dist][@ref-devin-plugqs-govern]。企业还能通过 `devin auth login` 的 RBAC 控制插件管理权限（需要相应角色权限）[@ref-devin-auth-access]。
