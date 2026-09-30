---
schema_version: 3
record_kind: production
edition_id: qwen-code-cli-native_plugins-v1
harness_id: qwen-code
topic: native_plugins
title: "Qwen Code CLI 的扩展（原生插件）：形态、清单、安装、发现、能力、生命周期与诊断"
sections:
  - section_id: plugins-scope
    surface_ids: [cli]
    source_refs: [ref-qwen-readme-acknowledgments]
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-qwen-introduction-extension-management, ref-qwen-architecture-extension-points, ref-qwen-introduction-qwen-extension-json, ref-qwen-skills-extension-skills, ref-qwen-sub-agents-extension-subagents, ref-qwen-rules-rules-from-extensions, ref-qwen-extension-releasing-package-requirements, ref-qwen-agent-plugins-supported-capabilities]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-qwen-introduction-how-it-works, ref-qwen-agent-plugins-supported-capabilities, ref-qwen-introduction-qwen-extension-json, ref-qwen-getting-started-extensions-step-2-understand-the-extension-files, ref-qwen-getting-started-extensions-package-json-and-tsconfig-json, ref-qwen-extension-releasing-package-requirements, ref-qwen-extension-releasing-managing-release-channels]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-qwen-introduction-installing-an-extension, ref-qwen-introduction-from-claude-code-marketplace, ref-qwen-introduction-from-gemini-cli-extensions, ref-qwen-introduction-from-qoder-plugins, ref-qwen-introduction-from-agent-plugins-v1, ref-qwen-introduction-from-npm-registry, ref-qwen-introduction-from-git-repository, ref-qwen-introduction-from-local-path, ref-qwen-introduction-from-archive-url, ref-qwen-introduction-choosing-an-install-scope, ref-qwen-introduction-managing-marketplace-sources, ref-qwen-introduction-enabling-an-extension, ref-qwen-introduction-disabling-an-extension, ref-qwen-introduction-updating-an-extension, ref-qwen-introduction-uninstalling-an-extension]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-qwen-introduction-how-it-works, ref-qwen-introduction-managing-extension-settings, ref-qwen-introduction-conflict-resolution, ref-qwen-skills-how-extension-skills-are-named, ref-qwen-introduction-custom-workflows, ref-qwen-introduction-variables]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-qwen-introduction-custom-commands, ref-qwen-introduction-custom-skills, ref-qwen-introduction-custom-subagents, ref-qwen-introduction-custom-workflows, ref-qwen-introduction-qwen-extension-json, ref-qwen-getting-started-extensions-step-6-add-a-custom-qwen-md, ref-qwen-getting-started-extensions-adding-conditional-rules, ref-qwen-agent-plugins-supported-capabilities]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-qwen-introduction-runtime-extension-management-slash-commands, ref-qwen-introduction-the-interactive-extension-manager, ref-qwen-introduction-cli-extension-management, ref-qwen-introduction-enabling-an-extension, ref-qwen-introduction-disabling-an-extension, ref-qwen-skills-extension-skills]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-qwen-settings-command-line-arguments-table, ref-qwen-introduction-the-interactive-extension-manager, ref-qwen-introduction-managing-extension-settings, ref-qwen-introduction-cli-extension-management, ref-qwen-introduction-extension-management]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-qwen-introduction-extension-management, ref-qwen-agent-plugins-supported-capabilities]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-qwen-introduction-qwen-extension-json, ref-qwen-getting-started-extensions-step-2-understand-the-extension-files, ref-qwen-extension-releasing-managing-release-channels]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-qwen-introduction-installing-an-extension, ref-qwen-introduction-from-npm-registry, ref-qwen-introduction-choosing-an-install-scope, ref-qwen-introduction-updating-an-extension]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: partial
        source_refs: [ref-qwen-introduction-how-it-works, ref-qwen-introduction-conflict-resolution, ref-qwen-introduction-variables]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-qwen-introduction-custom-commands, ref-qwen-introduction-custom-skills, ref-qwen-introduction-custom-subagents, ref-qwen-introduction-custom-workflows, ref-qwen-agent-plugins-supported-capabilities]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-qwen-introduction-runtime-extension-management-slash-commands, ref-qwen-introduction-the-interactive-extension-manager, ref-qwen-introduction-enabling-an-extension]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: answered
        source_refs: [ref-qwen-settings-command-line-arguments-table, ref-qwen-introduction-managing-extension-settings, ref-qwen-introduction-cli-extension-management]
---

## Qwen Code 中的原生扩展 {#plugins-scope}

本章介绍 Qwen Code 的第一方扩展机制，CLI 称之为*扩展*（`qwen extensions ...`），用户也常称作插件。固定来源：`https://github.com/QwenLM/qwen-code.git` 的提交 `e767e223c5c1d6fe13217d95faf365721e6e3437`；所依据的文档为 `docs/users/extension/introduction.md`、`docs/users/extension/getting-started-extensions.md`、`docs/users/extension/agent-plugins.md`、`docs/users/extension/extension-releasing.md`、`docs/users/configuration/settings.md`，以及 `docs/users/features/skills.md`、`docs/users/features/sub-agents.md`、`docs/users/features/rules.md` 中与扩展相关的章节。Qwen Code 最初基于 Google Gemini CLI v0.8.2；自 v0.1 起不再与上游同步、转为独立开发，因此该固定提交上的这些文档是当前行为的权威依据 [@ref-qwen-readme-acknowledgments]。当文档描述与另一 agent 的兼容性时，属于“已文档化的兼容”，而非继承行为：Gemini CLI 与 Claude Code 市场支持、以及可移植的 Agent Plugins v1 格式，都是本仓库为自己记录的能力 [@ref-qwen-readme-acknowledgments]。

## 扩展模型 {#plugins-model}

扩展把提示词（prompts）、MCP 服务器、子代理、技能与自定义命令打包为一个可安装、可分享的单元 [@ref-qwen-introduction-extension-management]。架构文档把扩展相关层次列为：MCP 服务器为运行时添加工具、提示词与资源；扩展与技能打包可复用的命令、配置与代理行为；channel 插件把消息平台适配到共享运行时；SDK 客户端与 UI 适配器构建其他界面 [@ref-qwen-architecture-extension-points]。

与相邻机制的关系：

- **MCP 服务器**在扩展清单的 `mcpServers` 下声明，启动时加载，方式与在 `settings.json` 中配置的服务器相同 [@ref-qwen-introduction-qwen-extension-json]。
- **技能**放在扩展的 `skills/` 目录下会被自动发现，并通过 `/skills` 可用；它们以所属扩展之名注册（`rust:pdf`），而不会遮蔽个人或项目技能 [@ref-qwen-skills-extension-skills]。
- **子代理**放在 `agents/` 下，当扩展启用时可用，并出现在 `/agents manage` 的 “Extension Agents” 分区 [@ref-qwen-sub-agents-extension-subagents]。
- **规则**可随扩展放在 `rules/` 目录中，但扩展规则必须是有条件的，并以所有者标注 [@ref-qwen-rules-rules-from-extensions]。

普通 npm 包只是分发渠道：npm 扩展仍必须在包根携带受支持的根清单 [@ref-qwen-extension-releasing-package-requirements]。文档还描述了一种*独立*的可移植格式——**Agent Plugins v1**，Qwen Code 原生加载它，不改写 `plugin.json`、`mcp.json` 或 `SKILL.md`。该可移植运行时支持 Agent Skills 以及 stdio 与 Streamable HTTP MCP 服务器；命令、代理、hooks、客户端命名空间、工作流与旧版 SSE MCP 均**不会**被激活 [@ref-qwen-agent-plugins-supported-capabilities]。因此原生 Qwen 扩展并未记录 `hooks` 字段：从扩展可达的唯一钩子形接口是技能自带的确定性 `hooks:` 块，那属于技能特性，而非扩展注册点。

## 扩展包与清单 {#plugins-package}

原生 Qwen 扩展是一个包含 `qwen-extension.json` 清单的目录；Agent Plugins v1 包则保留其根部的 `plugin.json` [@ref-qwen-introduction-how-it-works] [@ref-qwen-agent-plugins-supported-capabilities]。清单结构如文档所述 [@ref-qwen-introduction-qwen-extension-json] [@ref-qwen-getting-started-extensions-step-2-understand-the-extension-files]：

```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "mcpServers": { "my-server": { "command": "node my-server.js" } },
  "channels": { "my-platform": { "entry": "dist/index.js", "displayName": "My Platform Channel" } },
  "contextFileName": "QWEN.md",
  "commands": "commands",
  "skills": "skills",
  "agents": "agents",
  "workflows": "workflows",
  "settings": [
    { "name": "API Key", "description": "Your API key", "envVar": "MY_API_KEY", "sensitive": true }
  ]
}
```

字段与默认值 [@ref-qwen-introduction-qwen-extension-json]：

- `name` —— 唯一标识符，也是 CLI 中的引用名；由小写字母/数字与短横线组成；应与扩展目录名一致。用于与用户/项目命令冲突时的消解。
- `version` —— 扩展版本。
- `mcpServers` —— 服务器名到服务器配置的映射；启动时加载。支持所有 MCP 选项，**唯独**不支持 `trust`。若扩展与 `settings.json` 定义了同名服务器，则以 `settings.json` 中的定义为准。
- `channels` —— 自定义 channel 适配器映射；每个值有 `entry`（一个编译后的 JS 入口点，导出符合 `ChannelPlugin` 的 `plugin` 对象）与可选的 `displayName`。
- `contextFileName` —— 要从扩展目录加载的上下文文件；若省略但存在 `QWEN.md`，则加载后者。
- `commands`（默认 `commands`）、`skills`（默认 `skills`）、`agents`（默认 `agents`）—— 分别为 Markdown 命令目录、技能目录与 YAML/Markdown 子代理目录。
- `workflows` —— 一个目录，或目录与 `.js` 文件的列表（默认 `workflows`）。
- `settings` —— 扩展所需的设置数组；安装时提示用户提供这些值，值被安全存储并作为环境变量传给 MCP 服务器。每项含 `name`、`description`、`envVar`、`sensitive`。

扩展入口由 TypeScript 构建：getting-started 模板附带 `package.json`、`tsconfig.json` 与一个 `example.ts` MCP 服务器，`npm run build` 会把 `example.ts` 编译为 `dist/example.js`，即清单所引用的文件 [@ref-qwen-getting-started-extensions-package-json-and-tsconfig-json] [@ref-qwen-getting-started-extensions-step-2-understand-the-extension-files]。以 npm 发布时，包内必须包含受支持的根清单（`qwen-extension.json` 或 Agent Plugins v1 的 `plugin.json`），且每个被引用的文件都必须通过 `.npmignore`/`files` 过滤 [@ref-qwen-extension-releasing-package-requirements]。

发布渠道有三种建模方式 [@ref-qwen-extension-releasing-managing-release-channels]：

- **Git ref** —— 用户用 `--ref` 固定引用（分支、标签或具体提交）；维护 `stable`/`preview`/`dev` 分支即形成渠道，且 HEAD 提交恒被视为最新版本，与清单中的版本无关。
- **npm dist-tag** —— 用 `npm publish --tag beta` 发布，并以 `@scope/pkg@beta` 安装。
- **GitHub Releases** —— 按平台提供单一归档，资源命名顺序为 `{platform}.{arch}.{name}.{ext}`（平台+架构优先，其次仅平台，最后回退到唯一通用资源）。

## 安装扩展 {#plugins-install}

安装命令是 `qwen extensions install` 加一个来源参数，支持多种来源类型 [@ref-qwen-introduction-installing-an-extension]：

- **Claude Code 市场** —— `qwen extensions install` 加市场名或市场 GitHub URL，可选地再以冒号后缀插件名。Claude 插件在安装时自动转换：`claude-plugin.json` 变为 `qwen-extension.json`，代理与技能转为 Qwen 格式，工具映射被自动处理 [@ref-qwen-introduction-from-claude-code-marketplace]。
- **Gemini CLI 扩展** —— 以 GitHub URL 或 `owner/repo` 安装；`gemini-extension.json` 转换为 `qwen-extension.json`，TOML 命令文件迁移为 Markdown，MCP 服务器、上下文文件与设置被保留 [@ref-qwen-introduction-from-gemini-cli-extensions]。
- **Qoder 插件** —— 含 `.qoder-plugin/plugin.json` 清单；可安装本地目录、`.zip`、git 仓库、归档 URL 或带作用域的 npm 包。安装器会转换 Qoder 清单，并保留 `commands/`、`agents/`、`skills/`、根部 `.mcp.json` 服务器，以及作为扩展上下文的 `system-prompt.md` [@ref-qwen-introduction-from-qoder-plugins]。
- **Agent Plugins v1** —— 安装或 link 本地目录，或安装 `owner/repo`；可移植文件保持原样 [@ref-qwen-introduction-from-agent-plugins-v1]。
- **npm 仓库** —— 仅支持带作用域的包（`@scope/my-extension`，可选 `@1.2.0`），可用 `--registry` 指定自定义仓库。仓库解析优先级为：`--registry` 参数、`.npmrc` 中的作用域仓库、`.npmrc` 的默认仓库、最后回退到 `https://registry.npmjs.org/`。认证来自 `NPM_TOKEN` 或 `_authToken` 条目 [@ref-qwen-introduction-from-npm-registry]。
- **Git 仓库** —— 需要 2.37 及以上版本才能用于带凭据/非 GitHub/嵌套来源；较旧 Git 仅支持匿名公开 GitHub 根仓库，并有 100 MiB 压缩、100,000 条目/1 GiB 解压的归档上限与符号链接限制 [@ref-qwen-introduction-from-git-repository]。
- **本地路径** —— 一个目录，或本地 `.zip`/`.tar.gz` 归档，其根必须是完整扩展或包含扩展的单一顶层目录；安装会复制一份，因此需要 `qwen extensions update` 才能拉取后续改动 [@ref-qwen-introduction-from-local-path]。
- **归档 URL** —— `https://.../extension.zip` 或 `.tar.gz`，只要 URL 仍指向同一扩展的更新归档即可后续更新 [@ref-qwen-introduction-from-archive-url]。

**作用域。** 默认安装的扩展全局启用（用户作用域，位于 `~/.qwen/extensions` 下）。`--scope project`（别名 `--scope workspace`）令其仅在当前工作区启用，与 `/extensions manage` 的 Discover 标签页提供的选项一致 [@ref-qwen-introduction-choosing-an-install-scope]。为 Discover 标签页提供数据源的市场（marketplace）通过 `qwen extensions sources add|list|update|remove` 管理 [@ref-qwen-introduction-managing-marketplace-sources]。

**启用 / 禁用 / 更新 / 卸载。** `qwen extensions enable` 加扩展名（[@ref-qwen-introduction-enabling-an-extension]）与 `qwen extensions disable` 加扩展名（接受 `--scope=workspace`）（[@ref-qwen-introduction-disabling-an-extension]）切换状态；`qwen extensions update` 加扩展名（或 `--all`）从本地路径、归档 URL、git 或 npm 刷新扩展——其中未固定版本的 npm 安装跟踪 `latest`，带 dist-tag 的跟踪该 tag，而精确版本固定者恒为最新 [@ref-qwen-introduction-updating-an-extension]；`qwen extensions uninstall` 加扩展名移除扩展 [@ref-qwen-introduction-uninstalling-an-extension]。

## 发现、加载与冲突消解 {#plugins-discovery}

启动时 Qwen Code 在 `~/.qwen/extensions` 下查找扩展；原生扩展是含 `qwen-extension.json` 的目录，例如 `~/.qwen/extensions/my-extension/qwen-extension.json` [@ref-qwen-introduction-how-it-works]。启动时 Qwen Code 加载所有扩展并合并其配置；若存在冲突，工作区配置优先 [@ref-qwen-introduction-managing-extension-settings]。

组件命名与冲突：

- **命令**优先级最低。无冲突时扩展命令保留自然名（`/deploy`）；与用户或项目命令冲突时，被重命名为带扩展前缀并加 `[gcp]` 标签的形式（`/gcp.deploy`）[@ref-qwen-introduction-conflict-resolution]。
- **技能**始终携带其所有者：两个都提供 `pdf-processor` 的扩展会产生两个技能，前缀是在技能加载时加上的，不会改写磁盘上的文件 [@ref-qwen-skills-how-extension-skills-are-named]。
- **工作流**同样始终携带其所有者（`gcp:deep-research`）；发现范围刻意很窄——只读取每个目录直接内含的 `.js` 文件，`meta.name` 限小写字母、数字与连字符且以字母开头（至多 41 个字符），超过 256 KiB 或缺少有效 `meta` 块的脚本会被跳过并给出警告，多个脚本声明同一 `meta.name` 时保留最先发现者 [@ref-qwen-introduction-custom-workflows]。

**设置。** 扩展所需的设置用 `qwen extensions settings set`（扩展名与设置名）与 `qwen extensions settings list`（扩展名）管理，分用户级（`~/.qwen/.env`，默认）或工作区级（`.qwen/.env`）；工作区设置优先于用户设置，敏感值不会以明文显示 [@ref-qwen-introduction-managing-extension-settings]。

**变量。** `qwen-extension.json` 支持替换：`${extensionPath}`（扩展的完整安装路径，不展开符号链接）、`${workspacePath}`（当前工作区路径）、`${/}` 或 `${pathSeparator}`（操作系统路径分隔符）[@ref-qwen-introduction-variables]。

**已知缺口。** 文档未描述扩展之间的依赖图，也未描述独立扩展之间的确定性加载顺序；唯一给出的顺序是重复工作流 `meta.name` 的“先发现者保留”，以及项目/用户命令对扩展命令的固定优先级。因此扩展之间能否相互依赖，在所列来源中并未确立。

## 扩展可用的注册点 {#plugins-api}

扩展通过目录或清单字段贡献组件，而非通过运行时 API：

- **自定义命令** —— `commands/` 下的 Markdown 文件，沿用与用户/项目命令相同的格式；嵌套路径成为子命令名（`commands/gcs/sync.md` 变为 `/gcs:sync`）[@ref-qwen-introduction-custom-commands]。
- **自定义技能** —— `skills/` 下的技能目录，每个含一个带 YAML frontmatter `name` 与 `description` 的 `SKILL.md`；注册为 `extension-name:skill-name`，以 `/gcp:pdf-processor` 运行 [@ref-qwen-introduction-custom-skills]。
- **自定义子代理** —— `agents/` 下的 YAML 或 Markdown 文件；它们出现在子代理管理器的 “Extension Agents” 分区，且不能就地编辑（应改扩展源）[@ref-qwen-introduction-custom-subagents]。
- **自定义工作流** —— `workflows/`（或清单列出的路径）下的 `.js` 脚本，每个导出静态 `meta = { name, description }` 块；注册为 `extension-name:meta.name`，仅在 `tools.workflowsEnabled` 开启时出现 [@ref-qwen-introduction-custom-workflows]。
- **MCP 服务器** —— `mcpServers` 清单字段，像 `settings.json` 服务器一样加载 [@ref-qwen-introduction-qwen-extension-json]。
- **上下文文件** —— `contextFileName`（或默认的 `QWEN.md`）被拼接到该扩展处于活动状态的每个请求的系统提示中，无相关性门控、无大小限制，因此文档提醒保持精简，并把场景性指导放进技能 [@ref-qwen-getting-started-extensions-step-6-add-a-custom-qwen-md]。
- **条件规则** —— `rules/` 目录下的 Markdown 文件，带 `paths:` frontmatter；没有 `paths:` 的规则会被跳过并在启动时给出警告 [@ref-qwen-getting-started-extensions-adding-conditional-rules]。
- **Channel 适配器** —— `channels` 清单字段，其条目必须导出符合 `ChannelPlugin` 的 `plugin` 对象 [@ref-qwen-introduction-qwen-extension-json]。

明确的限制：Agent Plugins v1 仅激活 Agent Skills 与 stdio/Streamable HTTP MCP 服务器——命令、代理、hooks、工作流、上下文、设置、channels、apps 与客户端命名空间均被忽略，且无效技能会被跳过而不影响有效的同级技能 [@ref-qwen-agent-plugins-supported-capabilities]。原生扩展的工作流发现有上述限制，且每个扩展工作流运行仍要走常规的工作流审批 [@ref-qwen-introduction-custom-workflows]。

## 生命周期与状态 {#plugins-lifecycle}

文档呈现的是面向用户可见的状态，而非正式状态机：

- **运行时斜杠命令（热重载）** —— `/extensions` 或 `/extensions manage` 管理扩展；`/extensions install` 加来源进行安装；`/extensions explore [Gemini|ClaudeCode]` 在浏览器中打开市场页面。这些命令热重载，改动无需重启即时生效 [@ref-qwen-introduction-runtime-extension-management-slash-commands]。
- **交互式管理器** —— `/extensions` 打开三个标签页：**Discover**（浏览已配置的市场，`Ctrl+R` 重新拉取）、**Installed**（按用户级、项目级与收藏分组；`Space` 切换启用/禁用，`f` 收藏，扩展捆绑的 MCP 服务器嵌套显示在其父扩展下并带实时连接状态，可逐个启用/禁用）、**Sources**（`d` 移除市场源，等同于 `qwen extensions sources`）。改动热重载 [@ref-qwen-introduction-the-interactive-extension-manager]。
- **CLI 管理** —— `qwen extensions` 命令是非交互路径；通过 CLI 所做的改动在活动会话重启后体现 [@ref-qwen-introduction-cli-extension-management]。

文档点名的可观察状态有：已安装并按**用户**与**项目**作用域分组；**启用/禁用**（enable 接受 `--scope=workspace`；被禁用的扩展可在全局或按工作区重新启用）[@ref-qwen-introduction-enabling-an-extension] [@ref-qwen-introduction-disabling-an-extension]；以及**活动**——运行中的扩展其上下文文件作用于每个请求，其 MCP 服务器显示实时连接状态，其子代理在扩展启用时被发现。技能在扩展安装并启用时被发现 [@ref-qwen-skills-extension-skills]。除这些之外，没有向用户暴露单独的“已加载 vs 已激活 vs 健康”状态。

## 诊断：列出与管理扩展 {#plugins-diagnostics}

- **从 shell 列出** —— `qwen --list-extensions`（或 `-l`）列出所有可用扩展并退出；`qwen --extensions`/`-e` 把会话限制在指定扩展，`qwen -e none` 为一次运行禁用所有扩展 [@ref-qwen-settings-command-line-arguments-table]。
- **交互式状态** —— `/extensions manage` 的 **Installed** 标签页把扩展捆绑的 MCP 服务器嵌套显示在其父扩展下并带实时连接状态，可逐个切换——这是最接近逐插件健康视图的入口 [@ref-qwen-introduction-the-interactive-extension-manager]。
- **设置检查** —— `qwen extensions settings list` 加扩展名会打印该扩展的所有设置与当前值（敏感值被遮蔽）[@ref-qwen-introduction-managing-extension-settings]。
- **管理入口** —— `/extensions` 斜杠命令与 `qwen extensions` CLI 都提供安装/启用/禁用/更新/卸载，CLI 改动重启后体现、斜杠命令改动热重载 [@ref-qwen-introduction-cli-extension-management] [@ref-qwen-introduction-extension-management]。

**排查时的已知缺口。** 所列文档描述了扩展设置与捆绑 MCP 服务器连接状态的诊断，并说明安装/更新同意提示会列出工作流，但没有记录任何打印逐扩展版本、加载错误或依赖解析失败的命令。`qwen extensions update` 除“精确版本固定被视为最新”这一行为外不再报告其他信息。因此定位加载/兼容性错误依赖通用 CLI 输出与交互式管理器，而非专门的诊断命令。
