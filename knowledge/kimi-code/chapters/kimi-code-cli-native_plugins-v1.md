---
schema_version: 3
record_kind: production
edition_id: kimi-code-cli-native_plugins-v1
harness_id: kimi-code
topic: native_plugins
title: "Kimi Code CLI 的原生插件：清单、安装、发现、扩展点与诊断"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-kimi-code-plugins-doc, ref-kimi-code-plugins-mcp, ref-kimi-code-plugins-skills, ref-kimi-code-plugins-agents, ref-kimi-code-plugins-hooks, ref-kimi-code-plugins-security, ref-kimi-code-plugins-manifest]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-kimi-code-src-plugin-manifest, ref-kimi-code-plugins-manifest, ref-kimi-code-plugins-commands, ref-kimi-code-plugins-skills]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-kimi-code-plugins-install, ref-kimi-code-src-plugin-store, ref-kimi-code-env-switches, ref-kimi-code-slash-session, ref-kimi-code-plugins-manifest, ref-kimi-code-plugins-official]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-kimi-code-src-plugin-manifest, ref-kimi-code-plugins-agents, ref-kimi-code-plugins-skills, ref-kimi-code-plugins-security]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-kimi-code-plugins-manifest, ref-kimi-code-plugins-skills, ref-kimi-code-plugins-agents, ref-kimi-code-plugins-mcp, ref-kimi-code-plugins-hooks, ref-kimi-code-plugins-commands, ref-kimi-code-src-plugin-manifest, ref-kimi-code-plugins-security]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kimi-code-plugins-install, ref-kimi-code-plugins-security, ref-kimi-code-src-plugin-manifest, ref-kimi-code-slash-info, ref-kimi-code-env-logs, ref-kimi-code-plugins-manifest]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-kimi-code-plugins-doc, ref-kimi-code-plugins-mcp, ref-kimi-code-plugins-skills, ref-kimi-code-plugins-agents, ref-kimi-code-plugins-hooks, ref-kimi-code-plugins-security, ref-kimi-code-plugins-manifest]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-kimi-code-src-plugin-manifest, ref-kimi-code-plugins-manifest, ref-kimi-code-plugins-commands, ref-kimi-code-plugins-skills]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-kimi-code-plugins-install, ref-kimi-code-src-plugin-store, ref-kimi-code-env-switches, ref-kimi-code-slash-session, ref-kimi-code-plugins-manifest, ref-kimi-code-plugins-official]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-kimi-code-src-plugin-manifest, ref-kimi-code-plugins-agents, ref-kimi-code-plugins-skills, ref-kimi-code-plugins-security]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-kimi-code-plugins-manifest, ref-kimi-code-plugins-skills, ref-kimi-code-plugins-agents, ref-kimi-code-plugins-mcp, ref-kimi-code-plugins-hooks, ref-kimi-code-plugins-commands, ref-kimi-code-src-plugin-manifest, ref-kimi-code-plugins-security]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-kimi-code-plugins-install, ref-kimi-code-src-plugin-store, ref-kimi-code-env-switches, ref-kimi-code-slash-session, ref-kimi-code-plugins-manifest, ref-kimi-code-plugins-official]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-kimi-code-plugins-install, ref-kimi-code-plugins-security, ref-kimi-code-src-plugin-manifest, ref-kimi-code-slash-info, ref-kimi-code-env-logs, ref-kimi-code-plugins-manifest]
---

插件把可复用的 Kimi Code 能力打包成可安装单元：可以添加 Agent Skills、自定义 agent、在会话启动时自动加载指定技能、向 system prompt 贡献指令，并声明 MCP server 以提供真正的工具能力 [@ref-kimi-code-plugins-doc]。本章固定来源是固定 commit 上的 `docs/en/customization/plugins.md`、`docs/en/customization/{skills,agents,mcp,hooks}.md`、`docs/en/configuration/*`、`docs/en/reference/*` 与 `packages/agent-core-v2/src/app/plugin`。

## 什么算原生插件 {#plugins-model}

- 插件是一个含清单（manifest）的目录或 zip；安装后由 CLI 管理的副本运行，Kimi Code 自身实现加载，不需要额外运行时 [@ref-kimi-code-plugins-doc]。
- 与其它机制的关系：插件是**分发容器**，本身不发明新机制——插件里的技能就是普通 Agent Skill，agent 文件就是普通自定义 agent，MCP 声明复用 `mcp.json` 的 schema，hook 复用全局 `[[hooks]]` 的字段。差别在作用域与来源标记：插件技能以「插件 id + 名称」单独索引，插件 agent 优先级低于所有文件来源，插件 hook 只在插件启用时生效 [@ref-kimi-code-plugins-mcp] [@ref-kimi-code-plugins-skills] [@ref-kimi-code-plugins-agents] [@ref-kimi-code-plugins-hooks]。
- 与普通包的区别在于加载范围：安装或启动会话时**不会**执行命令型插件工具与遗留 tool runtime；清单里的 `tools`、`apps`、`inject`、`configFile` 等运行期字段被识别为不支持并只作为诊断出现，不产生行为 [@ref-kimi-code-plugins-security] [@ref-kimi-code-plugins-manifest]。

## 包格式与清单 {#plugins-package}

清单可以放在两个位置，两个都存在时以根目录的 `kimi.plugin.json` 为准；源码对缺失、非 JSON 对象、`name` 缺失或不符合命名规则（`[a-z0-9][a-z0-9_-]{0,63}`）都给出明确诊断 [@ref-kimi-code-src-plugin-manifest] [@ref-kimi-code-plugins-manifest]：

```text
插件根/kimi.plugin.json
插件根/.kimi-plugin/plugin.json
```

| 字段 | 说明 |
| --- | --- |
| `name` | 必填，作为插件 id，必须匹配 `[a-z0-9][a-z0-9_-]{0,63}` |
| `version`、`description`、`keywords`、`author`、`homepage`、`license` | 展示元数据 |
| `interface` | `/plugins` 中的展示信息：`displayName`、`shortDescription`、`longDescription`、`developerName`、`websiteURL` |
| `skills` | 一个或多个插件根内的 `./` 路径；省略时取插件根 `SKILL.md` 作为唯一技能根 |
| `agents` | 一个或多个插件根内的 `./` 路径；省略时自动发现 `agents/` |
| `sessionStart.skill` | 新建或恢复会话时把指定插件技能载入主 Agent |
| `skillInstructions` | 该插件的技能被加载时一并附加的指令 |
| `systemPrompt` / `systemPromptPath` | 启用期间贡献给 system prompt 的内联文本 / 文件（同时存在时先内联后文件；文件在安装或 reload 时读取） |
| `mcpServers` | MCP server 声明，默认启用，可在 `/plugins` 中禁用 |
| `hooks` | 生命周期 hook 规则，插件启用时生效 |
| `commands` | 一个或多个指向目录或 `.md` 文件的 `./` 路径，其中的 Markdown 注册为斜杠命令 |

示例（来自 `docs/en/customization/plugins.md` 的 Plugin Manifest 一节）[@ref-kimi-code-plugins-manifest]：

```json
{
  "name": "kimi-finance",
  "version": "1.0.0",
  "description": "Finance data and analysis workflows for Kimi Code CLI",
  "skills": "./skills/",
  "systemPromptPath": "./SYSTEM.md",
  "sessionStart": { "skill": "using-finance" },
  "interface": {
    "displayName": "Kimi Finance",
    "shortDescription": "Market data and financial analysis workflows"
  }
}
```

- 插件的斜杠命令按 `<插件 id>:<命令名>` 命名空间注册，命令名默认由相对声明的路径推导（`commands/frontend/component.md` → `frontend/component`），frontmatter 的 `name` 优先；描述默认取正文首个非空行（截断到 240 字符），都不存在时显示 `No description provided.`；正文里的 `$ARGUMENTS` 被用户输入替换，正文没有该占位符时输入以 `ARGUMENTS: 输入` 追加到末尾 [@ref-kimi-code-plugins-commands]。
- 插件技能使用与普通技能相同的 `SKILL.md` 格式；`sessionStart.skill` 只注入文本、不执行代码；无论技能是怎么被加载的（`sessionStart.skill`、`/skill:名称` 还是模型自动调用），`skillInstructions` 都会随之出现 [@ref-kimi-code-plugins-skills]。
- system prompt 贡献有大小限制：每个字段（内联 `systemPrompt` 与 `systemPromptPath` 文件各自）上限 32 KB（UTF-8 字节），超限内容被忽略并记入插件诊断；一次 prompt 构建在所有启用插件之间最多注入 64 KB 指令，超出部分跳过并告警 [@ref-kimi-code-plugins-manifest]。源码中的上限常量与其诊断行为一致 [@ref-kimi-code-src-plugin-manifest]。

## 安装、启用、更新与卸载 {#plugins-install}

交互入口是 `/plugins`：单个面板、四个标签页（Installed / Official / Curated / Custom，用 `Tab`/`Shift-Tab` 切换），`Space` 启用或禁用选中插件，`D` 移除，`M` 管理该插件的 MCP server，`R` 重新读取 `installed.json` 与所有清单，`Enter` 安装/更新，`I` 查看详情 [@ref-kimi-code-plugins-install]。

| 命令 | 说明 |
| --- | --- |
| `/plugins list` | 列出已安装插件 |
| `/plugins install 路径或 URL` | 从本地目录、zip URL 或 GitHub 仓库 URL 安装 |
| `/plugins marketplace [source]` | 浏览官方市场，或指定自定义市场 JSON 路径/URL |
| `/plugins info 插件 id` | 查看详情与诊断 |
| `/plugins enable 插件 id` / `/plugins disable 插件 id` | 启用 / 禁用 |
| `/plugins remove 插件 id` | 移除（需要确认） |
| `/plugins reload` | 重新读取 `installed.json` 与所有插件清单 |
| `/plugins mcp enable 插件 id server` / `/plugins mcp disable 插件 id server` | 启用 / 禁用插件声明的 MCP server |

- 从 GitHub 安装支持四种 URL 形式：仓库主页（取最新 release，无 release 时回退默认分支）、`/tree/引用名`（分支、标签或短 commit）、`/releases/tag/标签名`、`/commit/提交号`；网络请求只经过 `github.com` 跳转与 `codeload.github.com` 下载，不调用 `api.github.com` [@ref-kimi-code-plugins-install]。
- 版本固定：用 `/tree/引用名`、`/releases/tag/标签名`、`/commit/提交号` 三种形式之一把安装钉在具体版本/提交上；不带 ref 的仓库 URL 取最新 release [@ref-kimi-code-plugins-install]。
- 安装位置与作用域：本地安装会被复制到 `$KIMI_CODE_HOME/plugins/managed/插件 id/`，CLI 始终从这份受管副本运行，改动原始目录不会生效，必须重装；插件目前按用户安装、应用于所有项目，项目级安装作用域尚不支持。移除插件只删除安装记录，受管副本与原始源文件仍留在磁盘上 [@ref-kimi-code-plugins-install]。
- 安装记录写在 `$KIMI_CODE_HOME/plugins/installed.json`，每条记录含 `id`、`root`、`source`、`enabled`、`installedAt` 等字段，写入采用「先写临时文件再重命名」的方式 [@ref-kimi-code-src-plugin-store]。
- 市场来源可用 `KIMI_CODE_PLUGIN_MARKETPLACE_URL` 覆盖（默认 `https://code.kimi.com/kimi-code/plugins/marketplace.json`），也接受 `http://`、`file://` 与本地路径；`/plugins marketplace 来源` 可临时指定自定义市场 JSON，条目至少要有 `id` 与 `source` [@ref-kimi-code-env-switches] [@ref-kimi-code-plugins-install]。
- 生效时机：插件变更在 `/reload` 之后或新会话中生效；安装、启用/禁用、移除之后要 `/reload` 或 `/new`，当前会话不会更新 [@ref-kimi-code-plugins-install] [@ref-kimi-code-slash-session]。
- 生命周期状态的可观察区分：已安装（`/plugins list`、`installed.json`）→ 已启用/禁用（`Space` 或 `/plugins enable|disable`，状态记在 `installed.json` 的 `enabled`）→ 发现/加载（`/plugins info` 的详情与诊断、`R` 重新读取清单）→ 生效（新会话或 `/reload` 后其技能、agent、命令、MCP server、hook 才可用）[@ref-kimi-code-plugins-install] [@ref-kimi-code-src-plugin-store]。
- system prompt 贡献的刷新在不同引擎上不同：新会话与新创建的 agent 读取当前启用插件的贡献；进行中的请求保持既有 prompt；`/plugins reload` 会刷新插件技能列表并为活动 agent 重建 prompt，`/plugins` 的 MCP server 开关不会改变 system prompt 段 [@ref-kimi-code-plugins-manifest]。
- 官方插件走同一套安装流程：`/plugins` 面板按 `Tab` 选到 **Official** 标签，找到插件按 `Enter` 安装，安装完成后 `/reload` 或 `/new` 激活。官方插件不会自动更新，有新版时会在下次使用旧版本时提示，按同样步骤重装即可。Kimi 目前维护三个官方插件：Kimi Datasource（自然语言查询金融、宏观、企业、文献、法规等数据，需要先 `/login` 完成 Kimi Code 账户 OAuth，查询消耗套餐额度）、Kimi Browser Extension（让 AI 驱动你自己的浏览器，安装后还需在浏览器中安装扩展）、Kimi Computer Use（操作桌面应用，macOS 需要辅助功能与屏幕录制授权，Windows 版通过 zip URL 安装并在安装后重启）[@ref-kimi-code-plugins-official]。

## 发现、解析与优先级 {#plugins-discovery}

- 清单解析：两个候选路径都检查，根目录 `kimi.plugin.json` 优先，另一个作为被遮蔽的路径记录；解析失败、类型不对、`name` 不合法都会终止该插件的加载并记诊断 [@ref-kimi-code-src-plugin-manifest]。
- 技能根：清单 `skills` 声明的 `./` 路径，省略时若插件根存在 `SKILL.md` 则以插件根为唯一技能根 [@ref-kimi-code-src-plugin-manifest]。
- agent 目录：清单 `agents` 声明的 `./` 路径，省略时自动取插件根下 `agents/` [@ref-kimi-code-src-plugin-manifest]。
- 命名冲突与优先级：插件 agent 低于所有其他文件来源——同名冲突时用户级、extra、项目级与 `--agent-file` 都优先于插件提供的 agent，替换内置 agent 仍需 frontmatter 里的 `override: true`；插件技能用「插件 id + 名称」索引，因此不会覆盖普通技能 [@ref-kimi-code-plugins-agents] [@ref-kimi-code-plugins-skills]。
- 路径安全：所有路径必须在符号链接解析之后仍位于插件根目录内；`mcpServers` 的 `command` 必须是 `PATH` 上的命令或以 `./` 开头，`cwd` 同样必须以 `./` 开头且落在插件根内，否则该条目被忽略 [@ref-kimi-code-plugins-security] [@ref-kimi-code-src-plugin-manifest]。
- 依赖与加载顺序：固定来源没有描述插件之间的依赖声明或加载顺序控制；诊断中会暴露损坏的清单与不安全路径，但不受影响的其他会话照常运行 [@ref-kimi-code-plugins-security]。

## 插件能注册什么 {#plugins-api}

| 扩展点 | 载体 | 生效条件 |
| --- | --- | --- |
| 技能 | `skills` 路径或根 `SKILL.md` | 插件启用 |
| 会话启动技能 | `sessionStart.skill` | 新会话或恢复会话时 |
| 技能附加指令 | `skillInstructions` | 该插件的技能被加载时 |
| system prompt | `systemPrompt`、`systemPromptPath` | 插件启用；受 32 KB/字段与 64 KB/次 prompt 预算限制 |
| agent | `agents` 路径或 `agents/` 目录 | 插件启用；优先级最低 |
| MCP server | `mcpServers`（复用 `mcp.json` schema） | 插件启用，默认启用，可在 `/plugins` 禁用；`/reload` 或新会话后启动 |
| Hook | `hooks`（复用 `[[hooks]]` 字段） | 插件启用；工作目录为插件根，额外注入 `KIMI_CODE_HOME` 与 `KIMI_PLUGIN_ROOT` |
| 斜杠命令 | `commands` 指向的 `.md` | 安装并启用插件后 |

上表逐项来自 Plugin Manifest、Skills and Session Start、Plugin Agents、MCP Servers in Plugins、Hooks in Plugins 与 Plugin Slash Commands 各节 [@ref-kimi-code-plugins-manifest] [@ref-kimi-code-plugins-skills] [@ref-kimi-code-plugins-agents] [@ref-kimi-code-plugins-mcp] [@ref-kimi-code-plugins-hooks] [@ref-kimi-code-plugins-commands]。宿主 API 的边界即上面这些声明式能力：

- 不接受运行期代码扩展点：命令型插件工具与遗留 tool runtime 不执行，`tools`、`apps`、`inject`、`configFile`、`config_file`、`bootstrap` 等字段按不支持处理并记为诊断 [@ref-kimi-code-src-plugin-manifest] [@ref-kimi-code-plugins-security]。
- 插件的 MCP server 以插件为单位启停：禁用一个 server 后已打开会话中的调用会以移除提示失败，添加或启用后已打开会话会立刻连接 [@ref-kimi-code-plugins-mcp]。
- 插件提供的 agent 与全局 hook 复用同一套机制，但作用域被限制在插件根目录内，并带插件专属环境变量 [@ref-kimi-code-plugins-agents] [@ref-kimi-code-plugins-hooks]。

## 诊断 {#plugins-diagnostics}

- `/plugins info 插件 id`（面板里的 `I`）给出插件详情与诊断：损坏的清单、不支持的运行期字段、不安全的路径都会出现在这里，且不影响其他会话 [@ref-kimi-code-plugins-install] [@ref-kimi-code-plugins-security]。
- 解析类诊断的严重级别由实现给出：清单缺失、JSON 解析失败、`name` 缺失或不合规为 error；`sessionStart` 不是对象、`sessionStart.skill` 缺失、`systemPrompt`/`systemPromptPath` 超过 32 KB、`mcpServers`/`hooks` 结构不对等为 warn [@ref-kimi-code-src-plugin-manifest]。
- `/plugins` 面板里的 `R` 会重新读取 `installed.json` 与所有清单，`/plugins reload` 是等价的命令形式；排查「清单改了没生效」时先用它，再 `/reload` 或开新会话 [@ref-kimi-code-plugins-install]。
- 版本与运行状态：`/plugins list`、`I` 详情与 `/status` 分别给出已安装列表、插件详情与会话运行时状态（版本、模型、工作目录、权限模式等）[@ref-kimi-code-plugins-install] [@ref-kimi-code-slash-info]。
- 日志：全局诊断日志为 `~/.kimi-code/logs/kimi-code.log`，级别由 `KIMI_LOG_LEVEL` 控制（`off`/`error`/`warn`/`info`/`debug`，进程启动时读取一次）[@ref-kimi-code-env-logs]。
- 缺口：固定来源没有给出「插件的加载顺序」「插件之间的依赖冲突」或「兼容性声明（如最低 CLI 版本）」的规则，也没有说明如何查询某个插件贡献的 token 预算占用；这些方面只能从 `info` 详情与日志间接判断 [@ref-kimi-code-plugins-manifest]。
