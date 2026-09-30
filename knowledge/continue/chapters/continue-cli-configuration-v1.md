---
schema_version: 3
record_kind: production
edition_id: continue-cli-configuration-v1
harness_id: continue
topic: configuration
title: "Continue CLI 的配置机制：来源、合并、运行期覆盖与迁移"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-continue-src-configloader-precedence, ref-continue-doc-cli-config-precedence, ref-continue-src-configloader-path, ref-continue-src-configloader-local, ref-continue-src-env, ref-continue-src-auth-stub, ref-continue-src-auth-null, ref-continue-doc-cli-quickstart-auth, ref-continue-src-readme-options, ref-continue-src-index-commands, ref-continue-src-onboarding-config, ref-continue-src-perms-yaml-path, ref-continue-doc-cli-perms-yaml, ref-continue-src-hooks-paths, ref-continue-src-systemmessage-rules, ref-continue-src-skills-dirs, ref-continue-src-authenv, ref-continue-src-paths-globalcontext, ref-continue-src-globalcontext, ref-continue-src-logger, ref-continue-src-onboarding-first, ref-continue-src-systemmessage-agents]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-continue-src-configservice-blocks, ref-continue-src-merge, ref-continue-src-dupedetect, ref-continue-doc-config-local, ref-continue-doc-config-legacy, ref-continue-src-perms-precedence]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-continue-src-env, ref-continue-src-onboarding-flow, ref-continue-src-readme-env, ref-continue-src-adapters-switch, ref-continue-src-common-options, ref-continue-src-common-options2, ref-continue-src-index-program, ref-continue-src-auth-null, ref-continue-src-slash-handlers, ref-continue-src-modelpersistence, ref-continue-doc-cli-config-switch]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-continue-src-onboarding-config, ref-continue-src-onboarding-first, ref-continue-src-configservice-blocks, ref-continue-src-perms-default, ref-continue-doc-cli-perms-defaults, ref-continue-src-tokenizer, ref-continue-src-hooks-exec, ref-continue-src-configloader-path, ref-continue-src-index-program, ref-continue-src-toolsconfig]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-continue-src-systemmessage-agents, ref-continue-src-systemmessage-rules, ref-continue-src-perms-precedence, ref-continue-src-perms-modes, ref-continue-doc-cli-perms-precedence, ref-continue-src-perms-yaml-parse, ref-continue-doc-cli-perms-patterns, ref-continue-src-auth-null, ref-continue-src-common-options, ref-continue-src-perms-default, ref-continue-doc-cli-headless-perms]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-continue-doc-ref-models, ref-continue-doc-migration-create, ref-continue-doc-migration-models, ref-continue-doc-config-local, ref-continue-doc-config-legacy, ref-continue-src-configloader-path, ref-continue-src-configloader-local, ref-continue-src-model-fields, ref-continue-src-configloader-precedence, ref-continue-src-hub-throws, ref-continue-src-hub-rules]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-continue-src-getllmapi, ref-continue-src-configloader-precedence, ref-continue-src-slash-handlers, ref-continue-src-modelservice-chat, ref-continue-doc-cli-config-switch, ref-continue-src-logger, ref-continue-src-hookservice-init, ref-continue-src-streamrequest, ref-continue-doc-cli-tui-slash, ref-continue-src-tools-assemble]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: conflict
        source_refs: [ref-continue-src-configloader-precedence, ref-continue-doc-cli-config-precedence, ref-continue-src-configloader-path, ref-continue-src-configloader-local, ref-continue-src-env, ref-continue-src-auth-stub, ref-continue-src-auth-null, ref-continue-doc-cli-quickstart-auth, ref-continue-src-readme-options, ref-continue-src-index-commands, ref-continue-src-onboarding-config, ref-continue-src-perms-yaml-path, ref-continue-doc-cli-perms-yaml, ref-continue-src-hooks-paths, ref-continue-src-systemmessage-rules, ref-continue-src-skills-dirs, ref-continue-src-authenv, ref-continue-src-paths-globalcontext, ref-continue-src-globalcontext, ref-continue-src-logger, ref-continue-src-onboarding-first, ref-continue-src-systemmessage-agents]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-continue-src-configservice-blocks, ref-continue-src-merge, ref-continue-src-dupedetect, ref-continue-doc-config-local, ref-continue-doc-config-legacy, ref-continue-src-perms-precedence]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-continue-src-env, ref-continue-src-onboarding-flow, ref-continue-src-readme-env, ref-continue-src-adapters-switch, ref-continue-src-common-options, ref-continue-src-common-options2, ref-continue-src-index-program, ref-continue-src-auth-null, ref-continue-src-slash-handlers, ref-continue-src-modelpersistence, ref-continue-doc-cli-config-switch]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: partial
        source_refs: [ref-continue-src-systemmessage-agents, ref-continue-src-systemmessage-rules, ref-continue-src-perms-precedence, ref-continue-src-perms-modes, ref-continue-doc-cli-perms-precedence, ref-continue-src-perms-yaml-parse, ref-continue-doc-cli-perms-patterns, ref-continue-src-auth-null, ref-continue-src-common-options, ref-continue-src-perms-default, ref-continue-doc-cli-headless-perms]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-continue-src-onboarding-config, ref-continue-src-onboarding-first, ref-continue-src-configservice-blocks, ref-continue-src-perms-default, ref-continue-doc-cli-perms-defaults, ref-continue-src-tokenizer, ref-continue-src-hooks-exec, ref-continue-src-configloader-path, ref-continue-src-index-program, ref-continue-src-toolsconfig]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: partial
        source_refs: [ref-continue-doc-ref-models, ref-continue-doc-migration-create, ref-continue-doc-migration-models, ref-continue-doc-config-local, ref-continue-doc-config-legacy, ref-continue-src-configloader-path, ref-continue-src-configloader-local, ref-continue-src-model-fields, ref-continue-src-configloader-precedence, ref-continue-src-hub-throws, ref-continue-src-hub-rules]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-continue-src-getllmapi, ref-continue-src-configloader-precedence, ref-continue-src-slash-handlers, ref-continue-src-modelservice-chat, ref-continue-doc-cli-config-switch, ref-continue-src-logger, ref-continue-src-hookservice-init, ref-continue-src-streamrequest, ref-continue-doc-cli-tui-slash, ref-continue-src-tools-assemble]
---

## 配置来源与路径 {#config-sources}

`cn` 的配置来源按固定优先级解析，实现在 `configLoader.ts` 的 `determineConfigSource`：[@ref-continue-src-configloader-precedence][@ref-continue-doc-cli-config-precedence]

1. **`--config {path}`**：命令行显式给出的配置。`isFilePath` 判定它是文件路径还是 assistant slug——以 `.`、`/`、`~`、盘符、UNC 开头，或字符串里含 `.yaml`/`.yml`/`.json` 就算文件，否则当作 `owner/package` slug 去平台取 assistant。[@ref-continue-src-configloader-path]
2. **已保存的配置 URI**：上一份被记录下来的 `file://` 或 `slug://` 地址。[@ref-continue-src-configloader-precedence]
3. **默认解析**：先看 `{continueHome}/config.yaml` 是否存在，存在就用它；否则回退到平台上的 `continuedev/default-cli-config`。[@ref-continue-src-configloader-precedence][@ref-continue-src-configloader-local]

其中 `{continueHome}` 由 `CONTINUE_GLOBAL_DIR` 覆盖，否则是 `~/.continue`。[@ref-continue-src-env]

**本轮固定提交的重要偏差**：`determineConfigSource` 里没有读取保存 URI 的分支实现，而且认证层已被整体替换成空实现——`extensions/cli/src/auth/workos.ts` 的模块注释写明「Hub/WorkOS authentication has been removed. These exports are kept as no-op stubs so that the rest of the codebase compiles」，`AuthConfig` 类型固定为 `null`，`getAccessToken`/`getOrganizationId`/`getConfigUri` 恒返回 `null`，`loadAuthConfig` 恒返回 `null`，`updateConfigUri` 是空函数。也就是说**第 2 条来源在当前源码里永远不会被写入**，会实际生效的只有「`--config` 文件/slug」与「`config.yaml` 或远端默认配置」。[@ref-continue-src-auth-stub][@ref-continue-src-auth-null][@ref-continue-src-configloader-precedence]

同一提交的官方文档仍写着「Saved config — the last-used configuration, persisted across sessions」，并且 quickstart 里仍有 `cn login` 登录流程；CLI 自带的 `README.md` 也还列着 `cn login`、`cn logout`、`cn remote` 三个命令，而 `index.ts` 里注册的子命令只有 `ls`、`serve`、`checks`、`review`。**这是文档与源码的明确冲突**，本章在相关结论处同时保留两种说法，读者应以实际源码行为为准。[@ref-continue-doc-cli-config-precedence][@ref-continue-doc-cli-quickstart-auth][@ref-continue-src-readme-options][@ref-continue-src-index-commands]

**配置目录里还有哪些文件**（都在 `{continueHome}` 下，随 `CONTINUE_GLOBAL_DIR` 一起搬家）：[@ref-continue-src-env]

| 路径 | 作用 | 由谁读写 |
| :-- | :-- | :-- |
| `config.yaml` | 主配置（`models`/`rules`/`prompts`/`mcpServers` 等） | 配置加载器读；引导流程写 [@ref-continue-src-onboarding-config] |
| `permissions.yaml` | 持久化工具权限（`allow`/`ask`/`exclude`） | 权限解析器读；TUI 批准时写 [@ref-continue-src-perms-yaml-path][@ref-continue-doc-cli-perms-yaml] |
| `settings.json` | hooks 配置 | hooks 系统读 [@ref-continue-src-hooks-paths] |
| `rules/` | 全局 Markdown 规则目录 | 系统消息构造时读 [@ref-continue-src-systemmessage-rules] |
| `skills/` | 全局 skill 目录 | skill 发现时读 [@ref-continue-src-skills-dirs] |
| `auth.json` | 认证信息路径常量 | 本提交中认证已停用，实际不会被写入 [@ref-continue-src-authenv][@ref-continue-src-auth-stub] |
| `index/globalContext.json` | 全局状态（`autoUpdateCli`、`cliSelectedModel` 等） | 更新服务与模型记忆读写 [@ref-continue-src-paths-globalcontext][@ref-continue-src-globalcontext] |
| `logs/cn.log` | 运行日志 | logger 写 [@ref-continue-src-logger] |
| `.onboarding_complete` | 首次运行标记 | 引导流程读写 [@ref-continue-src-onboarding-first] |

**工作目录侧还会被读取的配置**：`AGENTS.md`、`AGENT.md`、`CLAUDE.md`、`CODEX.md` 中**第一个存在**的文件会被整篇读入系统消息；`.continue/rules/` 下的 Markdown 规则文件（递归）会被扫描，其中 `invokable` 为真的规则会被排除在「总是应用」之外；`{continueHome}/rules/` 同样被扫描。[@ref-continue-src-systemmessage-agents][@ref-continue-src-systemmessage-rules]

## 覆盖与合并规则 {#config-overrides}

CLI 的配置合并发生在「基础配置」与「附加层」之间，附加层来自 `--rule`/`--prompt`/`--model`/`--mcp`/`--agent` 的展开结果，形如 `{name: "hidden", version: "1.0.0", rules: [], mcpServers: [], prompts: []}`。[@ref-continue-src-configservice-blocks]

合并规则（`mergeUnrolledAssistants`）：[@ref-continue-src-merge][@ref-continue-src-dupedetect]

| 键 | 规则 |
| :-- | :-- |
| `models`、`context`、`data`、`mcpServers`、`rules`、`prompts`、`docs` | 数组拼接，**附加层在前**；随后按「块名」去重——rules 用字符串本身或 `rule.name`，context 用 `name ?? params.title ?? provider`，其余块用 `name`。先去到者胜出，之后同名的被丢弃 |
| `env` | 对象展开合并，附加层覆盖同名键 |
| `requestOptions` | 逐字段合并；`headers` 是「global 先、base 后」的对象展开，即 base 覆盖 global |
| 其它标量（`name`、`version`、`schema`） | 直接取当前对象的值 |

配置文件内部的合并规则由配置模型决定：`config.yaml` 是单个文件，不存在多文件叠加；`docs/customize/deep-dives/configuration.mdx` 里描述的 `.continuerc.json`（带 `mergeBehavior: merge|overwrite`）与 `config.ts` 的 `modifyConfig` 属于 IDE 时代的 JSON 配置体系，本轮固定的 CLI 源码只读 YAML。[@ref-continue-src-merge][@ref-continue-doc-config-local][@ref-continue-doc-config-legacy]

**同名块的删不掉的语义**：没有 `null` 或删除标记这类「移除」语法；要让某个块失效只能改配置本身或做权限收窄。[@ref-continue-src-merge][@ref-continue-src-perms-precedence]

## 环境变量、CLI 参数与运行期介入 {#config-runtime}

**环境变量**（CLI 直接读取的）：

| 变量 | 作用 | 来源 |
| :-- | :-- | :-- |
| `CONTINUE_GLOBAL_DIR` | 改写 `{continueHome}`，连带 `config.yaml`、`permissions.yaml`、`settings.json`、`skills/`、`rules/`、`logs/`、`index/` 全部搬家 | [@ref-continue-src-env] |
| `CONTINUE_API_BASE` | 改写平台 API 基址，默认 `https://api.continue.dev/` | [@ref-continue-src-env] |
| `ANTHROPIC_API_KEY` | 引导流程使用（测试/CI 环境优先读取），用来生成或更新 `config.yaml` | [@ref-continue-src-onboarding-flow] |
| `CONTINUE_USE_BEDROCK=1` | 引导流程直接跳过交互 | [@ref-continue-src-onboarding-flow] |
| `NODE_ENV=test` / `CI=true` | 引导流程进入非交互分支 | [@ref-continue-src-onboarding-flow] |
| `CONTINUE_CLI_DISABLE_COMMIT_SIGNATURE` | 关闭生成的提交信息里的 Continue 签名 | [@ref-continue-src-readme-env] |
| `FORCE_NO_TTY` | 强制无终端模式，禁止读 stdin | [@ref-continue-src-readme-env] |
| `CONTINUE_USE_AI_SDK` | 让 `openai`/`anthropic` 改走 Vercel AI SDK 适配器 | [@ref-continue-src-adapters-switch] |

**CLI 参数在启动时介入**，优先级高于配置文件里的同类内容（因为它们是「附加层」，且合并时排在前面）：`--config`、`--org`、`--rule`、`--prompt`、`--model`、`--mcp`、`--agent`、`--allow`/`--ask`/`--exclude`、`--readonly`/`--auto`、`--beta-subagent-tool`、`--beta-status-tool`、`--verbose`。[@ref-continue-src-common-options][@ref-continue-src-common-options2][@ref-continue-src-index-program]

注意 `--org` 的帮助文本写明「supported only in headless mode」，而本提交里组织 ID 恒为 `null`，该参数实际不产生效果。[@ref-continue-src-common-options][@ref-continue-src-auth-null]

**运行期切换**：TUI 里 `/config` 打开配置选择器（在可用配置之间切换），`/model` 切换 chat 模型并把选择持久化到 `globalContext.json` 的 `cliSelectedModel`（未认证用户场景）。**没有 profile 概念**。[@ref-continue-src-slash-handlers][@ref-continue-src-modelpersistence][@ref-continue-doc-cli-config-switch]

## 默认值与平台差异 {#config-defaults}

- **首次运行会生成配置**：若 `{continueHome}/config.yaml` 不存在且 `--config` 未给出，引导流程会写入一份托管 Anthropic 模型配置（`provider: anthropic`、`roles: [chat, edit, apply]`、`defaultCompletionOptions`、`capabilities`），设置文件权限，并在 `{continueHome}/.onboarding_complete` 写标记；此后再启动不再引导。[@ref-continue-src-onboarding-config][@ref-continue-src-onboarding-first]
- **无模型时的兜底**：配置里没有任何 chat 模型时，CLI 会尝试加载默认模型并追加进 `models`；headless 下失败就直接报错终止，交互模式下只记日志。[@ref-continue-src-configservice-blocks]
- **权限默认值**：读写工具分档——`Edit`/`MultiEdit`/`Write` 默认 `ask`，只读类（`Read`、`List`、`Search`、`Fetch`、`Diff`、`AskQuestion`、`Checklist`、`Status`、`CheckBackgroundJob`、`ReportFailure`、`UploadArtifact`、`Skills`、`Exit`）默认 `allow`，`Bash` 与通配 `*` 在 TUI 下是 `ask`、在 headless 下是 `allow`。[@ref-continue-src-perms-default][@ref-continue-doc-cli-perms-defaults]
- **上下文长度默认值**：模型没写 `defaultCompletionOptions.contextLength` 时按 200000 计算，输出上限按 `min(contextLength × 0.35, 64000)`。[@ref-continue-src-tokenizer]
- **平台差异**：hook 的命令执行在 Windows 用 `cmd.exe /c`、其它平台用 `/bin/sh -c`；`configPath` 的文件判定单独处理盘符与 UNC 路径。[@ref-continue-src-hooks-exec][@ref-continue-src-configloader-path]
- **功能开关**：`--beta-subagent-tool` 与 `--beta-status-tool`（以及 upload-artifact 的 beta 开关）是运行期开关，默认关闭。[@ref-continue-src-index-program][@ref-continue-src-toolsconfig]

## 项目信任与权限边界 {#config-trust}

- **没有项目信任机制**。CLI 不会因为「打开了某个仓库」而限制或放行配置：`config.yaml` 的工作目录侧内容（`AGENTS.md` 与 `.continue/rules`）只要存在就会被读入系统消息，没有任何确认步骤。[@ref-continue-src-systemmessage-agents][@ref-continue-src-systemmessage-rules]
- **权限是运行期边界**，四层来源按优先级叠加：模式策略（`--auto`/`--readonly`）> CLI 的 `--allow`/`--ask`/`--exclude` > `permissions.yaml` > 内置默认；同一工具由更高优先级来源完全覆盖。plan 与 auto 是绝对覆盖，会忽略其余三层。[@ref-continue-src-perms-precedence][@ref-continue-src-perms-modes][@ref-continue-doc-cli-perms-precedence]
- **pattern 语法**：`Tool`、`Tool(*)`、`Tool(glob)` 三种；参数匹配键按工具映射（`Write`→`file_path`、`Bash`→`command`、`Search`→`query`、`Fetch`→`url`、`List`→`path`）。[@ref-continue-src-perms-yaml-parse][@ref-continue-doc-cli-perms-patterns]
- **组织策略**：文档与帮助文本提到 `--org` 与组织上下文，但本提交里 `getOrganizationId` 恒返回 `null`，因此**不存在按组织下发策略的生效路径**。[@ref-continue-src-auth-null][@ref-continue-src-common-options]
- **headless 差异**：headless 下 `ask` 类工具被当作排除处理（无人可批准），默认策略里 `Bash` 与 `*` 直接是 `allow`；配置文件里 `ask` 的条目在 headless 下等于不可用。[@ref-continue-src-perms-default][@ref-continue-doc-cli-headless-perms]

## 迁移与旧格式 {#config-migration}

- `config.json` 是旧格式，官方参考页已被标记为 deprecated 并 `noindex`，迁移指南给出的是「把 `models`、`tabAutocompleteModel`、`embeddingsProvider`、`reranker` 合并进 YAML 的 `models` 并按 `roles` 区分」的对应关系（例如 `tabAutocompleteModel` → `roles: [autocomplete]`，`embeddingsProvider` → `roles: [embed]`，`reranker` → `roles: [rerank]`，`completionOptions` → `defaultCompletionOptions`）。[@ref-continue-doc-ref-models][@ref-continue-doc-migration-create][@ref-continue-doc-migration-models]
- `docs/customize/deep-dives/configuration.mdx` 说明「如果存在 `config.yaml` 就加载它而不是 `config.json`」，同一页还保留了 `.continuerc.json`（工作区级，带 `mergeBehavior`）与 `config.ts`（`modifyConfig`）两种旧做法的说明。[@ref-continue-doc-config-local][@ref-continue-doc-config-legacy]
- **CLI 侧的现状**：`configLoader` 只处理 YAML 路径（`loadConfigYaml`），没有读取 `config.json`、`.continuerc.json` 或 `config.ts` 的代码；`--config` 只要以 `.json` 结尾也会被当成「文件」交给同一套 YAML 解析器（JSON 是 YAML 的子集，因此能解析，但随后仍按 YAML 配置模型校验）。[@ref-continue-src-configloader-path][@ref-continue-src-configloader-local]
- **没有配置键迁移或弃用告警机制**：源码里没有版本化的迁移表，也没有「旧键被忽略时提示」的逻辑；模型 schema 对未知字段是宽松的（zod 对象默认剥离未知键），因此写错键的直接现象是「配置被接受但行为不变」。[@ref-continue-src-model-fields][@ref-continue-src-configloader-precedence]
- **Hub 载入的迁移**：CLI 侧的 hub 包载入已被移除，规则与 agent 文件只接受本地文件路径或内联字符串；`--patch`/`--rule` 等的 slug 形式会报 `Hub package loading has been removed.`。[@ref-continue-src-hub-throws][@ref-continue-src-hub-rules]

## 诊断：确认实际生效的来源 {#config-diagnostics}

区分「文件已写但没生效」的四个可观察点：

1. **启动期错误**：配置文件不存在、YAML 非法、slug 取不到 assistant、或模型/provider 不可用都会在启动时直接抛错并带原文（例如 `Failed to initialize LLM. Please check your configuration.`）。这是最强、最快的一层。[@ref-continue-src-getllmapi][@ref-continue-src-configloader-precedence]
2. **`/config` 与 `/model`**：`/config` 打开配置选择器查看可用配置；`/model` 列出当前配置里的 chat 模型。列表为空基本等于「这份配置里没有 chat 模型」，而不是协议问题。[@ref-continue-src-slash-handlers][@ref-continue-src-modelservice-chat][@ref-continue-doc-cli-config-switch]
3. **`--verbose` 与日志**：debug 日志写在 `{continueHome}/logs/cn.log`，会记录服务初始化、工具集构造、模型请求与重试、hook 加载统计（`Hooks loaded: N handler(s) across M event type(s)`）、MCP 连接等。[@ref-continue-src-logger][@ref-continue-src-hookservice-init][@ref-continue-src-streamrequest]
4. **`/info`**：会话信息（含 token 用量与成本）可用于确认「当前用的是哪个模型、用量是否合理」。[@ref-continue-doc-cli-tui-slash]

**重载方式**：没有 `/reload`；配置文件改动需要重启会话（`--config` 与已保存 URI 的选择在启动时确定）。少数东西会在每次请求重新读取，例如 skill 目录与工具集构造、hook 配置只在服务初始化时读一次。[@ref-continue-src-tools-assemble][@ref-continue-src-hookservice-init]

**缺口**：固定来源没有提供「打印当前实际生效的合并配置」的入口（例如列出合并后每个块的来源文件）。要定位「哪个来源赢了」，只能按本页的优先级表人工比对，或读 debug 日志里的服务初始化记录。这是 `config.diagnostics` 记为 partial 的原因。[@ref-continue-src-configloader-precedence][@ref-continue-src-logger]
