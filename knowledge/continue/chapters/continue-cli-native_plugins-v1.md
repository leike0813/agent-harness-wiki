---
schema_version: 3
record_kind: production
edition_id: continue-cli-native_plugins-v1
harness_id: continue
topic: native_plugins
title: "Continue CLI 的原生插件：机制不存在的证据与替代边界"
sections:
  - section_id: plugins-absence
    surface_ids: [cli]
    source_refs: [ref-continue-src-cli-pkg, ref-continue-src-index-commands, ref-continue-src-common-options, ref-continue-src-hooks-settings, ref-continue-src-hub-throws]
  - section_id: plugins-boundaries
    surface_ids: [cli]
    source_refs: [ref-continue-src-mcp-schema, ref-continue-src-mcp-client, ref-continue-src-hooks-handlers, ref-continue-src-hooks-paths, ref-continue-src-skills-load, ref-continue-src-blocktypes, ref-continue-src-merge, ref-continue-src-cli-pkg, ref-continue-src-createllm]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-continue-src-cli-pkg, ref-continue-src-updateservice, ref-continue-doc-cli-quickstart-flags, ref-continue-doc-cli-tui-slash, ref-continue-src-hookservice-fire, ref-continue-src-perms-precedence, ref-continue-src-perms-default, ref-continue-src-hub-throws, ref-continue-src-configservice-blocks]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-continue-src-updateservice, ref-continue-doc-cli-quickstart-flags, ref-continue-src-mcpselector, ref-continue-src-slash-skills, ref-continue-src-hookservice-init, ref-continue-src-logger]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-continue-src-cli-pkg, ref-continue-src-index-commands, ref-continue-src-common-options, ref-continue-src-hooks-settings, ref-continue-src-hub-throws]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-absence
        status: not_applicable
        source_refs: [ref-continue-src-cli-pkg, ref-continue-src-index-commands, ref-continue-src-common-options, ref-continue-src-hooks-settings, ref-continue-src-hub-throws]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: not_applicable
        source_refs: [ref-continue-src-cli-pkg, ref-continue-src-updateservice, ref-continue-doc-cli-quickstart-flags, ref-continue-doc-cli-tui-slash, ref-continue-src-hookservice-fire, ref-continue-src-perms-precedence, ref-continue-src-perms-default, ref-continue-src-hub-throws, ref-continue-src-configservice-blocks]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-boundaries
        status: not_applicable
        source_refs: [ref-continue-src-mcp-schema, ref-continue-src-mcp-client, ref-continue-src-hooks-handlers, ref-continue-src-hooks-paths, ref-continue-src-skills-load, ref-continue-src-blocktypes, ref-continue-src-merge, ref-continue-src-cli-pkg, ref-continue-src-createllm]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-boundaries
        status: not_applicable
        source_refs: [ref-continue-src-mcp-schema, ref-continue-src-mcp-client, ref-continue-src-hooks-handlers, ref-continue-src-hooks-paths, ref-continue-src-skills-load, ref-continue-src-blocktypes, ref-continue-src-merge, ref-continue-src-cli-pkg, ref-continue-src-createllm]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: not_applicable
        source_refs: [ref-continue-src-cli-pkg, ref-continue-src-updateservice, ref-continue-doc-cli-quickstart-flags, ref-continue-doc-cli-tui-slash, ref-continue-src-hookservice-fire, ref-continue-src-perms-precedence, ref-continue-src-perms-default, ref-continue-src-hub-throws, ref-continue-src-configservice-blocks]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: not_applicable
        source_refs: [ref-continue-src-updateservice, ref-continue-doc-cli-quickstart-flags, ref-continue-src-mcpselector, ref-continue-src-slash-skills, ref-continue-src-hookservice-init, ref-continue-src-logger]
---

## 结论：CLI 没有原生插件机制 {#plugins-absence}

本轮固定来源支持一个明确结论：**Continue CLI（`cn`）在本提交里没有「原生插件」这一层**。没有插件清单格式、没有插件入口点、没有安装/启用/卸载命令、没有插件宿主 API，也没有插件加载生命周期。可以逐条核对：

- 包本身：`@continuedev/cli` 的 `package.json` 只有 `main`、`types` 与单个 `bin`（`cn` → `dist/cn.js`），没有 `contributes`、`extensionPoints`、`plugins` 之类字段；唯一出现 `plugin` 字样的地方是开发依赖里的 `eslint-plugin-*` 与 `prettier-plugin-tailwindcss`，属于构建工具而不是运行时插件。[@ref-continue-src-cli-pkg]
- 命令面：CLI 注册的命令是 `cn`（默认交互/headless）、`cn ls`、`cn serve`（隐藏）、`cn checks`、`cn review`，加上 `--config`、`--rule`、`--mcp`、`--model`、`--prompt`、`--agent`、`--allow/--ask/--exclude` 等启动选项；没有任何 `install`/`plugin`/`extension` 子命令。[@ref-continue-src-index-commands][@ref-continue-src-common-options]
- 源码：`extensions/cli/src` 下不存在插件注册表、加载器或清单解析模块；检索 `plugin` 只命中一处注释——hooks 设置文件里那个「Plugin-level description」的字段说明。[@ref-continue-src-hooks-settings]
- 曾经的插件式入口已被显式移除：`hubLoader.ts` 的模块注释写明「Hub package loading has been removed. Only local file-based rule processing and string detection remain.」，`loadPackageFromHub` / `loadRuleFromHub` / `loadMcpFromHub` / `loadModelFromHub` 全部改成直接抛错。[@ref-continue-src-hub-throws]

因此本主题 7 道固定问题全部按 `not_applicable` 记录：机制在该产品该界面上不存在。

## 关系澄清：什么不是插件 {#plugins-boundaries}

把容易和「插件」混淆的四个机制摆在一起，可以看清边界（都不是可加载、可安装、有入口点的插件）：

| 机制 | 形态 | 与插件的关系 |
| :-- | :-- | :-- |
| MCP server | 独立进程或远端 HTTP 服务，由 `mcpServers` 配置并通过协议连接 | 它是**外部进程**，不进 CLI 进程，也不注册宿主 API；工具能力通过 MCP 协议暴露，见 MCP 主题章节 [@ref-continue-src-mcp-schema][@ref-continue-src-mcp-client] |
| Hook | 设置文件里的回调条目，由 CLI 在事件点执行外部命令或发 HTTP 请求 | 它是**事件回调**，作用范围限于声明的事件与 matcher；类型定义照搬 Claude Code，不是插件 API [@ref-continue-src-hooks-handlers][@ref-continue-src-hooks-paths] |
| Skill | 目录 + `SKILL.md`，被内置 `Skills` 工具读取 | 它是**提示词与资源包**，没有代码执行，也没有宿主 API [@ref-continue-src-skills-load] |
| Hub block / 配置块 | config.yaml 里的 `models`/`rules`/`prompts`/`mcpServers`/`context`/`data`/`docs` 条目，可用 `uses:` 引用 | 它是**配置内容单元**，由配置展开器合并，不是可执行代码 [@ref-continue-src-blocktypes][@ref-continue-src-merge] |

另外两种容易误解的「扩展」也不属于本题范围：Continue 的 VS Code / JetBrains 扩展是**独立产品界面**（catalog 里的 `vscode`、`jetbrains`），不是 CLI 的插件；仓库 `packages/*` 下的 `config-yaml`、`openai-adapters`、`llm-info` 等是**构建期工作区包**，被 CLI 以普通 npm 依赖方式引用，用户无法在运行期安装或替换。[@ref-continue-src-cli-pkg][@ref-continue-src-createllm]

## 关系澄清：什么最接近「安装与生命周期」 {#plugins-lifecycle}

虽然没有插件，CLI 里确实有一套**自身的更新机制**和一套**配置内容的获取机制**，读者的实际需求（「怎么装、怎么固定版本、怎么更新、怎么停用」）落在它们身上：

- **安装与更新**：`cn` 通过 npm 全局安装（`npm i -g @continuedev/cli`）或官方 shell/PowerShell 安装脚本；运行时由 `UpdateService` 检查并自动更新自身——它读全局设置里的 `autoUpdateCli`（默认 `true`），在非 headless 且非测试环境下触发检查，`package.json` 版本为 `0.0.0-dev` 时直接跳过（开发态不检查）。TUI 里对应 `/update` 命令。[@ref-continue-src-cli-pkg][@ref-continue-src-updateservice][@ref-continue-doc-cli-quickstart-flags][@ref-continue-doc-cli-tui-slash]
- **版本固定**：CLI 自身没有版本锁定文件；固定版本等同于固定 npm 包版本或安装脚本来源，不是插件锁。[@ref-continue-src-cli-pkg]
- **停用某个扩展能力**：靠配置与权限，而不是插件开关——MCP server 从配置里删掉或用 `/mcp` 停掉、hook 用 `disableAllHooks: true` 整体停用、工具用 `--exclude` 或 `permissions.yaml` 排除、skill 靠 `Skills` 工具的权限位。[@ref-continue-src-hookservice-fire][@ref-continue-src-perms-precedence][@ref-continue-src-perms-default]
- **配置内容的分发**：config.yaml 可以引用 `uses: owner/package` 形式的块，由配置展开器解析并合并；本提交里 CLI 侧专用的 hub 载入路径已移除，规则/agent 文件只支持本地文件与内联字符串，模型/MCP 的 slug 注入仍走平台客户端（是否能匿名解析未在固定来源中证实）。[@ref-continue-src-hub-throws][@ref-continue-src-configservice-blocks]

## 诊断：可以观察什么 {#plugins-diagnostics}

由于不存在插件，也就没有插件版本查询、依赖冲突或加载失败诊断。读者在这些场景下能用的替代入口是：

- `cn --version` 与 `UpdateService` 的检查结果（TUI 里 `/update` 会给出可用版本与状态）。[@ref-continue-src-updateservice][@ref-continue-doc-cli-quickstart-flags]
- `/mcp` 选择器看外部 server 的连接状态与错误；`/skills` 看被发现的 skill；hook 加载情况只在 debug 日志里有一行统计。[@ref-continue-src-mcpselector][@ref-continue-src-slash-skills][@ref-continue-src-hookservice-init]
- CLI 自身的日志在 `{continueHome}/logs/cn.log`。[@ref-continue-src-logger]

**缺口**：没有任何入口能列出「当前装了什么扩展」——因为不存在这样的概念；如果上游在后续提交里引入插件机制，需要重新固定来源再复核本章全部 7 道题。
