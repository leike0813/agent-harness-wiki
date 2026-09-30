---
schema_version: 3
record_kind: production
edition_id: crush-cli-native_plugins-v1
harness_id: crush
topic: native_plugins
title: "Crush 的原生插件：机制不存在的判定与替代扩展点"
sections:
  - section_id: plugins-scope
    surface_ids: [cli]
    source_refs: [ref-crush-schema-root, ref-crush-configdoc-cmdref, ref-crush-readme-features, ref-crush-code-cli-flags]
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-crush-readme-features, ref-crush-configdoc-cmdref, ref-crush-readme-mcp, ref-crush-readme-skills, ref-crush-readme-hooks, ref-crush-code-skill-discovery, ref-crush-code-mcp-initialize, ref-crush-code-hook-run, ref-crush-code-command-sources, ref-crush-schema-root, ref-crush-code-cli-flags]
  - section_id: plugins-package-install
    surface_ids: [cli]
    source_refs: [ref-crush-schema-root, ref-crush-configdoc-cmdref, ref-crush-code-cli-flags, ref-crush-readme-features, ref-crush-code-skill-discovery, ref-crush-code-mcp-initialize, ref-crush-code-hook-run, ref-crush-code-command-sources, ref-crush-code-dev-skills, ref-crush-code-schema-cmd]
  - section_id: plugins-discovery-api
    surface_ids: [cli]
    source_refs: [ref-crush-schema-root, ref-crush-readme-features, ref-crush-code-skill-discovery, ref-crush-code-command-sources, ref-crush-code-mcp-initialize, ref-crush-code-hook-validate]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-crush-code-mcp-states, ref-crush-code-skill-discover]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-crush-code-info-mcp, ref-crush-code-info-skills, ref-crush-code-info-hooks, ref-crush-code-models-cmd, ref-crush-readme-logging, ref-crush-code-info-tool, ref-crush-code-cli-flags]
  - section_id: plugins-alternatives
    surface_ids: [cli]
    source_refs: [ref-crush-readme-skills, ref-crush-readme-mcp, ref-crush-readme-hooks, ref-crush-code-command-sources, ref-crush-readme-skills-user, ref-crush-readme-features, ref-crush-code-mcp-tool-mount, ref-crush-hooksdoc-facts, ref-crush-code-skill-builtin-fs, ref-crush-readme-disable-skills, ref-crush-code-dev-skills, ref-crush-schema-root, ref-crush-configdoc-cmdref]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-crush-readme-features, ref-crush-configdoc-cmdref, ref-crush-readme-mcp, ref-crush-readme-skills, ref-crush-readme-hooks, ref-crush-code-skill-discovery]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package-install
        status: not_applicable
        source_refs: [ref-crush-schema-root, ref-crush-configdoc-cmdref, ref-crush-code-cli-flags, ref-crush-readme-features, ref-crush-code-dev-skills]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-package-install
        status: not_applicable
        source_refs: [ref-crush-schema-root, ref-crush-configdoc-cmdref, ref-crush-code-cli-flags, ref-crush-readme-features, ref-crush-code-schema-cmd]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-api
        status: not_applicable
        source_refs: [ref-crush-schema-root, ref-crush-code-skill-discovery, ref-crush-code-command-sources, ref-crush-code-mcp-initialize, ref-crush-code-hook-validate]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-api
        status: not_applicable
        source_refs: [ref-crush-schema-root, ref-crush-readme-features, ref-crush-code-skill-discovery]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: not_applicable
        source_refs: [ref-crush-code-mcp-states, ref-crush-code-skill-discover]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: not_applicable
        source_refs: [ref-crush-code-info-mcp, ref-crush-code-info-skills, ref-crush-code-info-hooks, ref-crush-code-models-cmd, ref-crush-readme-logging, ref-crush-code-info-tool, ref-crush-code-cli-flags]
---

## 固定来源与界面 {#plugins-scope}

本章依据官方仓库 `charmbracelet/crush` 固定 commit `69c65c3d5be0a388d62047feb55d88b9bad7f1b2` 的检出，逐项检查“Crush 是否有原生插件体系”。检查的入口是 [@ref-crush-schema-root][@ref-crush-configdoc-cmdref][@ref-crush-readme-features][@ref-crush-code-cli-flags]：

- 配置 schema 的全部顶层键与 `$defs` 定义。
- `docs/config/README.md` 的完整命令清单（`provider`/`model`/`mcp`/`lsp`/`hook`/`permissions`/`option`）。
- README 的功能清单与扩展相关章节（Features、Agent Skills、MCPs、Hooks）。
- CLI 子命令注册表（run、dirs、projects、update-providers、logs、logout、schema、login、stats、session）与隐藏旗标。
- 仓库里是否存在插件包、清单或加载器的代码。

界面口径为 catalog 唯一登记的 `cli`。**结论：本版本没有原生插件机制，7 道问题全部记为 `not_applicable`。**

本章的 `not_applicable` 属于“机制不存在”的判定，依据是固定来源里可核对的缺席证据，而不是“没找到”。证据只对上面这个 commit 成立。[@ref-crush-schema-root][@ref-crush-configdoc-cmdref]

## 什么算宿主的原生插件 {#plugins-model}

`plugins.model` 的答案是 `not_applicable`：固定来源里不存在“插件”这一概念——没有插件目录、清单格式、加载器或注册 API。Crush 的扩展面是四个彼此独立的机制，且都不采用“插件包”的形态 [@ref-crush-readme-features][@ref-crush-configdoc-cmdref]：

| 机制 | 形态 | 入口 |
| :-- | :-- | :-- |
| Agent Skills | 含 `SKILL.md` 的目录 | 技能目录 + `option skill-path` |
| MCP server | 外部进程或远端服务 | `mcp` 配置块 / `mcp add` |
| Hooks | 配置里的 shell 命令 | `hooks` 配置块 / `hook add` |
| 自定义命令 | markdown 文件 | 命令目录（`~/.config/crush/commands` 等） |

依据分别是：README 把“可扩展”定义为通过 MCP，并另列技能与 hook 两节；配置命令清单里只有 provider、model、mcp、lsp、hook、permissions、option 七组命令，没有任何插件相关命令。[@ref-crush-readme-features][@ref-crush-readme-mcp][@ref-crush-readme-skills][@ref-crush-readme-hooks][@ref-crush-configdoc-cmdref]

与 Skill、MCP server、Hook 脚本及普通包的关系，可以按四个维度对照 [@ref-crush-code-skill-discovery][@ref-crush-code-mcp-initialize][@ref-crush-code-hook-run][@ref-crush-code-command-sources]：

| 扩展机制 | 是否有代码被加载进 Crush 进程 | 是否有清单/元数据文件 | 能否注册宿主能力点 | 是否声明与自己适配的版本 |
| :-- | :-- | :-- | :-- | :-- |
| Agent Skills | 否（只是被读取的 Markdown 正文） | `SKILL.md` 的 frontmatter，但不是安装清单 | 否 | 否 |
| MCP server | 否（独立进程或远端服务，通过协议通信） | 无宿主清单，只有连接配置 | 只能提供 MCP 工具/资源/提示 | 否（协议版本由 SDK 协商） |
| Hooks | 否（作为外部命令执行） | 无 | 否 | 否 |
| 自定义命令 | 否（Markdown 内容展开为提示） | 无 | 否 | 否 |

把“插件机制”通常具备的四要素逐项对照，Crush 一项都没有 [@ref-crush-schema-root][@ref-crush-configdoc-cmdref][@ref-crush-code-cli-flags]：

| 要素 | Crush 的情况 |
| :-- | :-- |
| 包与清单（可安装单元） | 不存在；没有插件包格式或被解析的清单文件 |
| 装载点（宿主把代码装进进程） | 不存在；没有加载器、没有注册 API |
| 生命周期（安装/启用/发现/加载/健康） | 不存在；相关状态机属于 MCP server 与技能，不属于插件 |
| 版本兼容声明 | 不存在；没有承载它的清单字段，也没有宿主校验 |

也就是说：Crush 的“扩展”全部是数据或外部进程，不存在任何被宿主按“插件”装载的可执行代码单元，因而不构成原生插件机制。逐条看：

- 技能只是 Markdown 文本，宿主解析 frontmatter 后把描述放进提示，正文由模型按需读取。
- MCP server 是独立进程或远端服务，宿主只按协议调用它，不 `dlopen`/`exec` 它的代码。
- hook 是外部命令，宿主只负责匹配与执行，并按约定解析退出码与 stdout。
- 自定义命令是磁盘上的 Markdown 文件，展开成一条提示。[@ref-crush-code-skill-discovery][@ref-crush-code-mcp-initialize][@ref-crush-code-hook-run][@ref-crush-code-command-sources]

## 插件包格式、入口与清单 {#plugins-package-install}

`plugins.package` 与 `plugins.install` 的答案都是 `not_applicable`：没有插件包格式、没有清单字段、没有安装/版本固定/更新/禁用/卸载命令，也就没有用户级与项目级安装之分。[@ref-crush-schema-root][@ref-crush-configdoc-cmdref]

可核对的缺席证据：

- **配置层面**：`schema.json` 的顶层键只有 `$schema`、`models`、`providers`、`mcp`、`lsp`、`options`、`permissions`、`tools`、`hooks`、`env`，`$defs` 里只有配置、模型、provider、MCP/LSP、选项、hook、工具等定义，没有任何插件、扩展或清单定义。[@ref-crush-schema-root]
- **命令层面**：`crushrc` 能写出的配置命令固定为七组；顶层 CLI 子命令是 run、dirs、projects、update-providers、logs、logout、schema、login、stats、session（`schema` 为隐藏命令），另有隐藏的 `--channels` 旗标，没有 `plugin`/`extension` 类命令。[@ref-crush-configdoc-cmdref][@ref-crush-code-cli-flags]
- **分发层面**：官方安装渠道是 Homebrew、npm、系统包、Nix、包管理器与二进制，都是“装 Crush 本身”，不是“装某个插件”。[@ref-crush-readme-features]
- **代码层面**：仓库里没有插件加载器、插件注册表或清单解析器；技能、MCP、hook、命令四条扩展路径的实现分别在 `internal/skills`、`internal/agent/tools/mcp`、`internal/hooks`、`internal/commands` 下，互不共享“插件”抽象。[@ref-crush-code-skill-discovery][@ref-crush-code-mcp-initialize][@ref-crush-code-hook-run][@ref-crush-code-command-sources]
- **目录层面**：仓库自身只有两份给贡献者用的技能文件（`.agents/skills/` 下），它们是这个仓库的开发约定，不是产品插件。[@ref-crush-code-dev-skills]
- **版本声明层面**：没有任何“插件对宿主版本/协议版本的兼容声明”这一概念存在的位置——没有清单文件可以承载它。[@ref-crush-schema-root][@ref-crush-configdoc-cmdref]

读者要自行复核，用固定来源里的两个入口即可：`crush --help` 看子命令清单，`crush schema` 重新生成并核对顶层键。[@ref-crush-code-cli-flags][@ref-crush-code-schema-cmd]

## 插件的发现、解析、加载与 API 边界 {#plugins-discovery-api}

`plugins.discovery` 与 `plugins.api` 的答案都是 `not_applicable`：既然没有插件模型，就不存在插件的发现、解析、校验、依赖解析、加载顺序或命名冲突处理，也不存在插件可注册的能力点与宿主 API 边界。[@ref-crush-schema-root][@ref-crush-readme-features]

容易与“插件发现”混淆的四条真实路径，逐条说明其归属，避免误读 [@ref-crush-code-skill-discovery][@ref-crush-code-command-sources][@ref-crush-code-mcp-initialize][@ref-crush-code-hook-validate]：

- 技能目录扫描 → Agent Skills：递归查找 `SKILL.md`、解析 frontmatter、校验名称与目录一致；这是“发现”语义最接近插件的一条，但它扫描的是内容文件而不是包。
- MCP server 启动与工具注册 → MCP：每条配置并发启动、按能力列出工具/资源/提示并包装成宿主工具。
- hook 命令的匹配与执行 → Hook：加载期编译 matcher，运行期按事件筛出并执行。
- 命令目录里 markdown 文件的扫描 → 自定义命令：按目录扫描 `.md`，展开成命令面板条目。

结论上要注意的区分：`plugins.discovery` 问的是“宿主怎样发现、解析、校验和加载插件”，Crush 里最接近的三条链路（技能目录扫描、MCP 启动、hook 匹配）都在别的主题下描述，它们加载的是内容文件或外部进程，而不是插件包；因此这里不把它们记作插件的发现机制。[@ref-crush-code-skill-discovery][@ref-crush-code-mcp-initialize][@ref-crush-code-hook-validate]

## 插件状态与生命周期 {#plugins-lifecycle}

`plugins.lifecycle` 的答案是 `not_applicable`：没有“已安装/已启用/已发现/已加载/已激活/健康”这样的插件状态机，也没有对应的进程内状态表可以查询。宿主里存在的状态机属于其它机制——例如 MCP server 的 `disabled`/`starting`/`connected`/`error`/`needs auth` 状态，以及技能发现的成功/失败状态；它们描述的是 server 与技能，不是插件。[@ref-crush-code-mcp-states][@ref-crush-code-skill-discover]

## 插件的版本与运行状态诊断 {#plugins-diagnostics}

`plugins.diagnostics` 的答案是 `not_applicable`：没有插件版本查询、插件运行状态、兼容性检查或依赖错误诊断，因为不存在插件。可用的诊断面全部属于其它机制：`crush_info` 的 `[skills]`、`[mcp]`、`[mcp_configured]`、`[hooks]` 小节，`crush models`，以及 `crush logs`。[@ref-crush-code-info-mcp][@ref-crush-code-info-skills][@ref-crush-code-info-hooks][@ref-crush-code-models-cmd][@ref-crush-readme-logging]

同样地，`crush_info` 没有任何 `[plugins]` 小节，`crush` 也没有 `plugins` 之类的子命令——这两点也是同一缺席证据的一部分。[@ref-crush-code-info-tool][@ref-crush-code-cli-flags]

按“读者想确认什么”列一下现有诊断入口能回答的问题：

- 装了哪些扩展能力？`crush_info` 的 `[skills]`、`[mcp]`、`[hooks]` 小节。
- 有哪些模型/provider？`crush models` 与 `crush_info` 的 `[providers]`/`[model]`。
- 刚才为什么没生效？`crush logs --follow` 与配置脏检查。

## 实际存在的扩展点 {#plugins-alternatives}

读者若在找“像插件一样扩展 Crush”的办法，固定来源给出的是下面四条；本章把它们列在这里，机制细节分别见对应主题章节。选择哪一条，取决于你要扩的是“知识/流程”“外部能力”“策略控制”还是“快捷提示” [@ref-crush-readme-skills][@ref-crush-readme-mcp][@ref-crush-readme-hooks][@ref-crush-code-command-sources]：

- 要扩“模型知道怎么做”：写技能。
- 要扩“模型能调用什么”：接一个 MCP server。
- 要控“模型敢不敢做”：写 hook。
- 要扩“用户少打几个字”：写自定义命令。

- **Agent Skills**：写一个含 `SKILL.md` 的技能目录放进技能搜索路径，或 `option skill-path` 追加目录。
  - 用户可用 `user-invocable` 让它出现在命令面板；模型按 `description` 自行决定是否加载正文。
  - 技能文件可读且不会被权限询问拦截；`disable-model-invocation` 可让它只对用户可见。[@ref-crush-readme-skills][@ref-crush-readme-skills-user]
- **MCP server**：实现一个 stdio/http/sse 的 MCP server 并写进 `mcp` 配置。
  - 它的工具会以 `mcp_` 前缀加入模型工具集，调用仍需过权限系统。
  - 这是官方在 README 的 Features 里点名的扩展方式。[@ref-crush-readme-mcp][@ref-crush-readme-features][@ref-crush-code-mcp-tool-mount]
- **Hooks**：在配置里声明 `PreToolUse` hook 命令。
  - 用途是阻断危险调用、改写工具输入、注入上下文或预批准工具调用。
  - 只在顶层 agent 的工具调用上触发。[@ref-crush-readme-hooks][@ref-crush-hooksdoc-facts]
- **自定义命令**：把 markdown 文件放进 `~/.config/crush/commands`、`~/.crush/commands` 或项目数据目录的 `commands/`，它们会作为命令面板条目出现；文件名与参数占位符决定展示名与参数。[@ref-crush-code-command-sources]

内置能力（`crush-config`、`crush-hooks`、`jq` 三个内嵌技能）是编译进二进制的官方内容，不能按插件方式安装、卸载或替换，只能整体按名称禁用 [@ref-crush-code-skill-builtin-fs][@ref-crush-readme-disable-skills]。仓库里的 `.agents/skills/` 是项目自身的开发技能，只在本仓库工作时生效，也不是对外分发的插件。[@ref-crush-code-dev-skills]

需要注意的版本边界：本章结论只对固定 commit `69c65c3d5be0a388d62047feb55d88b9bad7f1b2` 成立；官方文档或后续版本若引入插件机制，需要按新来源重新调查，而不是沿用本章的 `not_applicable`。[@ref-crush-schema-root][@ref-crush-configdoc-cmdref]
