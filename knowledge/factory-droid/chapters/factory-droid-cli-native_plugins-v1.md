---
schema_version: 3
record_kind: production
edition_id: factory-droid-cli-native_plugins-v1
harness_id: factory-droid
topic: native_plugins
title: "Droid CLI 的原生插件：包结构、marketplace、作用域与版本"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-fd-plugins-contain]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-fd-plugins-build, ref-fd-plugins-manifest, ref-fd-plugins-marketplaces, ref-fd-marketplaces-manifest]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-fd-plugins-manage, ref-fd-plugins-sources, ref-fd-plugins-npm, ref-fd-plugins-add-pin, ref-fd-org-plugins, ref-fd-marketplaces-npm, ref-fd-marketplaces-org, ref-fd-marketplaces-users]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-fd-plugins-marketplaces, ref-fd-plugins-team, ref-fd-marketplaces-restrict-mp, ref-fd-marketplaces-restrict-plugins, ref-fd-marketplaces-preinstall, ref-fd-org-plugins, ref-fd-plugins-discover, ref-fd-marketplaces-setup, ref-fd-marketplaces-manifest]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-fd-plugins-contain, ref-fd-plugins-output, ref-fd-plugins-hooks, ref-fd-plugins-mcp, ref-fd-marketplaces-restrict-mp]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-fd-plugins-version, ref-fd-plugins-add-pin, ref-fd-marketplaces-version, ref-fd-plugins-manage, ref-fd-plugins-test, ref-fd-marketplaces-restrict-mp]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-fd-plugins-contain]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-fd-plugins-build, ref-fd-plugins-manifest, ref-fd-plugins-marketplaces]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-fd-plugins-manage, ref-fd-plugins-sources, ref-fd-plugins-add-pin, ref-fd-plugins-npm]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-fd-plugins-marketplaces, ref-fd-plugins-team, ref-fd-marketplaces-restrict-mp, ref-fd-marketplaces-restrict-plugins, ref-fd-marketplaces-preinstall, ref-fd-plugins-discover, ref-fd-marketplaces-setup]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-fd-plugins-contain, ref-fd-plugins-output, ref-fd-plugins-hooks, ref-fd-plugins-mcp]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-fd-plugins-version, ref-fd-plugins-add-pin, ref-fd-marketplaces-version, ref-fd-plugins-manage]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-fd-plugins-manage, ref-fd-plugins-test, ref-fd-marketplaces-restrict-mp]
---

## 什么是原生插件 {#plugins-model}

本章的固定来源是官方文档站 `harness/plugins`、`enterprise/internal-plugin-marketplaces`、`droid-cli/settings`、`enterprise/hierarchical-settings-and-org-control` 页面快照。CLI 本体不开源，整章按 source_only 阅读。

插件是「打包成可分发单元的一组 Droid 扩展」：一个插件是含清单目录的普通目录，把 skills、slash commands、droids、output styles、hooks 与 MCP server 配置打成一个包，方便在项目与团队之间安装同一套能力。个人或项目内的实验用 `.factory/` 下的独立配置即可，需要共享、版本化或治理时再做成插件。[@ref-fd-plugins-contain]

| 组件 | 插件内位置 | 加载形态 | 用途 |
| :-- | :-- | :-- | :-- |
| Skills | `skills/NAME/SKILL.md` | 模型按需调用的技能 | 可复用流程与领域知识 |
| Slash commands | `commands/NAME.md` 或可执行命令文件 | `/NAME` 命令 | 用户显式调用的流程 |
| Droids | `droids/NAME.md` | Task 可调用的子代理 | 专属提示、工具与模型的子代理 |
| Output styles | `output-styles/NAME.md` | 设置里的输出样式选项 | 交互式回复的结构化指令 |
| Hooks | `hooks/hooks.json` 加脚本 | 生命周期 hook | 校验、策略、格式化、日志、上下文注入 |
| MCP servers | `mcp.json` | MCP 工具配置 | 插件启用时可见的外部工具与数据源 |

原生布局用 `.factory-plugin/` 目录；同时支持 Claude Code 布局：复制进缓存时把 `.claude-plugin/` 译为 `.factory-plugin/`、`agents/` 译为 `droids/`、`.mcp.json` 译为 `mcp.json`。插件与技能、MCP server、hook 脚本的关系是「打包关系」而不是替代关系——插件只是把这些既有机制的产物集中分发。[@ref-fd-plugins-contain]

## 插件包与清单 {#plugins-package}

最小原生插件目录 [@ref-fd-plugins-build]：

```text
my-plugin/
├── .factory-plugin/
│   └── plugin.json
├── commands/
├── skills/
├── droids/
├── output-styles/
├── hooks/
│   ├── hooks.json
│   └── check.sh
├── mcp.json
└── README.md
```

`commands/`、`skills/`、`droids/`、`output-styles/`、`hooks/` 与 `mcp.json` 必须放在插件根，不能塞进 `.factory-plugin/`——该目录只放插件元数据。[@ref-fd-plugins-build]

`.factory-plugin/plugin.json` 示例 [@ref-fd-plugins-manifest]：

```json
{
  "name": "my-plugin",
  "description": "A helpful plugin description",
  "version": "1.0.0",
  "author": { "name": "Your Team" },
  "homepage": "https://github.com/your-org/my-plugin",
  "repository": "https://github.com/your-org/my-plugin",
  "license": "MIT",
  "keywords": ["review", "security"]
}
```

关键点：Droid **不读取** `plugin.json` 里的这些字段；已安装插件的身份来自 marketplace 条目名与已注册的 marketplace 名，浏览时显示的描述与分类也来自 marketplace 条目。目录里出现 `.factory-plugin/` 表示原生布局，出现 `.claude-plugin/`、`agents/` 或 `.mcp.json` 表示需转换的 Claude Code 布局。`version` 只是给人和发布记录用的元数据，Git 安装仍按提交哈希追踪。[@ref-fd-plugins-manifest]

marketplace 的清单是 `.factory-plugin/marketplace.json`（回退 `.claude-plugin/marketplace.json`），必填 `name`，可选 `description`、`owner`，`plugins[]` 每项必填 `name` 与 `source`，可选 `description`、`category`、`homepage`、`tags`。[@ref-fd-plugins-marketplaces][@ref-fd-marketplaces-manifest]

## 安装、启用与来源 {#plugins-install}

`/plugins` 提供交互界面，三个标签页分别是 Available（从未安装的已注册 marketplace 中安装）、Installed（按空格在策略允许时启停、查看详情与操作，org 作用域安装只暴露详情）、Marketplaces（添加/更新 marketplace、切换自动更新，只有用户自行添加的 marketplace 能在这里删除）。CLI 侧对应命令 [@ref-fd-plugins-manage]：

```bash
droid plugin marketplace add FACTORY-MARKETPLACE-SOURCE
droid plugin marketplace list
droid plugin marketplace update NAME
droid plugin marketplace remove NAME
droid plugin install PLUGIN@MARKETPLACE --scope user
droid plugin install PLUGIN@MARKETPLACE --scope project
droid plugin list --scope user
droid plugin update PLUGIN@MARKETPLACE --scope project
droid plugin uninstall PLUGIN@MARKETPLACE --scope project
```

- **没有** `droid plugin enable` / `disable` 命令：启用状态存在 `enabledPlugins` 设置里，组织托管的启用状态无法在本机改动。[@ref-fd-plugins-manage]
- 插件 ID 形如 `pluginName@marketplaceName`；因为 Droid 在首字符之后按第一个 `@` 切分，带 scope 的 npm 包名也可用（`@scope/plugin@marketplace`）。用固定源派生的 marketplace 名会把 pin 附在后面，例如 `your-org/plugins#v1.2.0` 注册为 `plugins@v1.2.0`，其中的插件安装为 `code-standards@plugins@v1.2.0`；SHA pin 取前 8 位。[@ref-fd-plugins-manage]
- 作用域只有 user 与 project 两种可选，org 作用域由组织托管设置自动安装，用户不能手动指定；一个插件只能存在于一个作用域，要换作用域必须先卸载再装。[@ref-fd-plugins-manage]

`plugins[].source` 支持相对路径（只允许在 marketplace 目录内，绝对路径与越界路径被拒绝）、`url`（外部 Git 仓库，可用 `ref`/`sha` 固定）、`git-subdir`（大仓库子目录，可用 `ref`/`sha`）、`npm`（`package` 必填，`version` 为版本/范围/dist-tag，可选 `registry` 与 `authTokenEnvVar`）。`npm` 只在 marketplace 的 `plugins[].source` 中有效：`droid plugin marketplace add npm:包名` 会被明确拒绝，要分发单个 npm 插件需要写一个小的包装 marketplace。[@ref-fd-plugins-sources][@ref-fd-plugins-npm]

npm 源插件的安装方式：Droid 在每插件临时目录里执行 `npm install --ignore-scripts --no-save --no-audit --no-fund`，然后把解析出的包根复制进插件缓存——生命周期脚本不运行、不修改全局 npm 配置、包必须自带可用文件。[@ref-fd-plugins-npm][@ref-fd-marketplaces-npm]

marketplace 的添加与固定：`droid plugin marketplace add` 接受 `owner/repo` 简写、GitHub URL、其它 Git URL 或本地路径；简写与 `http(s)://github.com/owner/repo` 变成 `github` 源，其它非路径输入变成 `url` 源。追加 `#ref` 跟踪分支或标签，`@40位SHA` 硬固定提交；本地路径会被解析为绝对路径且不接受 ref 或 SHA。设置里的 `extraKnownMarketplaces` 也可以带 `ref` 或 `sha`。[@ref-fd-plugins-add-pin][@ref-fd-org-plugins]

组织侧的安装路径：在托管设置里用 `extraKnownMarketplaces` 注册 marketplace（让用户可浏览可安装），用 `enabledPlugins` 启用并在缺失时按 org 作用域安装；用户执行 `/plugins` 时该 marketplace 会出现，org 启用的插件在启动时自动安装，除非 `strictEnabledPlugins` 限制清单。[@ref-fd-marketplaces-org]

`/plugins` 的 Available 标签页列出所有已注册 marketplace（含组织 marketplace）中的插件并去掉已安装项，组织 marketplace 在 Marketplaces 标签里被标注，托管安装项在 Installed 标签里被标注，Available 还会标出每个插件的来源 marketplace。[@ref-fd-marketplaces-users]

## 发现、自动安装与治理 {#plugins-discovery}

- Droid 先读 `.factory-plugin/marketplace.json`，找不到再回退到 `.claude-plugin/marketplace.json`。[@ref-fd-plugins-marketplaces]
- 在 `settings.json` 里声明 `extraKnownMarketplaces` 与 `enabledPlugins` 可以让团队自动获得 marketplace 与插件；安装作用域跟随设置所在的层级：org 托管设置装成 org 作用域，用户设置装成 user，项目设置装成 project。[@ref-fd-plugins-team]
- 组织用 `strictKnownMarketplaces` 限制可添加的 marketplace 来源：列表一旦设置，用户只能添加批准过的来源，非批准来源的插件安装被阻断；org 在 `extraKnownMarketplaces` 里声明的 marketplace 天然算作已批准。本地路径条目必须是绝对路径或以 `~` 开头。[@ref-fd-marketplaces-restrict-mp]
- 组织用 `strictEnabledPlugins` 把 `enabledPlugins` 变成穷尽式允许清单：设为 `true` 后，更低层级不能再启用或安装其它插件，Factory 默认插件也必须出现在该清单里才启用；旧版 CLI 不识别该设置，因此依赖它需要先确认版本。[@ref-fd-marketplaces-restrict-plugins]
- `enabledPlugins` 中值为 `true` 的插件在该 marketplace 可用后于 CLI 启动时自动安装；org 作用域的插件只用安装一次，`/plugins` 对它们只提供详情，不提供更新或卸载操作。源较慢时可能先在会话可用之后才装完。[@ref-fd-marketplaces-preinstall][@ref-fd-org-plugins]
- 官方 marketplace 是 `Factory-AI/factory-plugins`，常见官方插件有 `droid-control`、`droid-evolved`、`security-engineer`；Droid 也能安装兼容的 Claude Code 插件。[@ref-fd-plugins-discover]
- 企业内部 marketplace 是一个 Git 仓库：`.factory-plugin/marketplace.json` 列出各插件的 `name`、`description`、`source`、`category`，插件目录通常按团队或能力组织。[@ref-fd-marketplaces-setup][@ref-fd-marketplaces-manifest]

## 插件提供的能力与边界 {#plugins-api}

插件能贡献的能力面就是上文组件表里的六类：skills、slash commands、droids、output styles、hooks 与 MCP server 配置。各自的注册方式 [@ref-fd-plugins-contain]：

- 命令：`commands/review-pr.md` 变成 `/review-pr`，Markdown 正文里可用 `$ARGUMENTS` 接收参数。[@ref-fd-plugins-contain]
- 技能：`skills/NAME/SKILL.md`，frontmatter 与独立技能一致。[@ref-fd-plugins-contain]
- 子代理：`droids/NAME.md`，frontmatter 与自定义 droid 相同。[@ref-fd-plugins-contain]
- 输出样式：`output-styles/NAME.md` 成为 `/settings` → **Output style** 的选项，frontmatter 可选，样式只作用于交互式 CLI 会话。[@ref-fd-plugins-output]
- Hooks：`hooks/hooks.json`，启用插件后与 user、project、托管 hook 合并，命令里可用插件根变量。[@ref-fd-plugins-hooks]
- MCP：插件根的 `mcp.json`，与用户/项目 `mcp.json` 同 schema，可以用 `${MY_API_KEY}` 之类的环境变量引用而不把密钥写进文件。[@ref-fd-plugins-mcp]

权限与宿主边界：插件 hook 的 `${DROID_PLUGIN_ROOT}`、`$DROID_PLUGIN_ROOT`、`${CLAUDE_PLUGIN_ROOT}`、`$CLAUDE_PLUGIN_ROOT` 会被展开为已安装插件的缓存路径；org 作用域的插件只读；被 `strictKnownMarketplaces` 或旧版策略阻断的插件保留在已安装列表中并在 `/plugins` 里显示原因，而不是被静默移除。文档没有给出插件可调用的宿主 API 清单，插件的能力边界即上述六类静态产物。[@ref-fd-plugins-hooks][@ref-fd-marketplaces-restrict-mp]

## 版本、生命周期与诊断 {#plugins-lifecycle}

版本追踪按来源区分 [@ref-fd-plugins-version]：

| 来源 | 追踪的版本 | 更新行为 |
| :-- | :-- | :-- |
| marketplace 内的相对路径插件 | marketplace 的提交哈希 | 更新 marketplace 才会移动插件 |
| `url` 或 `git-subdir` 插件源 | 只记录 marketplace 检出提交；外部提交不记录 | 更新插件时按配置的 `ref`/`sha` 或默认分支重新克隆外部源 |
| `npm` 插件源 | 解析出的 npm 版本与元数据 | 每次更新重新解析 `version` 规格 |
| 插件 `plugin.json` 的 `version` | 只是元数据 | Git 安装仍按提交追踪 |

自动同步最多可以跳过未变化的项目上下文与最近检查过的 marketplace 六个小时；`droid plugin marketplace update` 请求立即更新。[@ref-fd-plugins-version]

- 固定版本用 marketplace 源上的 `ref`（分支或标签）或 `sha`（40 位提交）：`sha` 是硬固定，`droid plugin marketplace update` 变成空操作；`ref` 用来跟随分支或标签。[@ref-fd-plugins-add-pin][@ref-fd-marketplaces-version]
- 相对路径插件跟随 marketplace 的 pin；外部 `url`/`git-subdir` 用自己的 `ref`/`sha`；npm 条目用 `plugins[].source.version`。插件自身 `plugin.json` 的 `version` 不能固定任何东西。[@ref-fd-marketplaces-version]
- 删除 marketplace 不会卸载来自它的插件（安装产物仍在缓存中）；要真正移除需卸载插件。[@ref-fd-plugins-manage]
- 本地测试：`marketplace add` 只接受 marketplace 而不是单个插件目录，因此要把插件包进一个本地 marketplace（`.factory-plugin/marketplace.json` 里列出 `"source": "./my-plugin"`）再安装；分享前的检查清单包括命令在有无 `$ARGUMENTS` 时都可用、技能与 droid 的名称和描述清晰、输出样式出现在 `/settings` 且 `/diagnostics` 报告无样式错误、hook 脚本用绝对路径或插件根变量、MCP 不内嵌密钥。[@ref-fd-plugins-test]
- 查询入口：`/plugins` 的 Installed 页看版本与操作，`droid plugin list` 列出已安装插件，`/diagnostics` 报告输出样式等校验错误，被阻断的插件在 `/plugins` 中给出原因。[@ref-fd-plugins-manage][@ref-fd-plugins-test][@ref-fd-marketplaces-restrict-mp]
