---
schema_version: 3
record_kind: production
edition_id: junie-cli-configuration-v1
harness_id: junie
topic: configuration
title: "Junie CLI 的配置机制：config.json、优先级、项目信任与诊断"
sections:
  - section_id: config-scope
    surface_ids: [cli]
    source_refs: [ref-junie-config-locations, ref-junie-quickstart-overview]
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-junie-config-locations, ref-junie-config-extra, ref-junie-config-fields, ref-junie-env-config, ref-junie-params-config, ref-junie-quickstart-transcript]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-junie-config-precedence, ref-junie-config-fields, ref-junie-env-precedence, ref-junie-params-core, ref-junie-config-extra, ref-junie-env-model]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-junie-config-trust]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-junie-config-fields, ref-junie-env-skills, ref-junie-env-mcp, ref-junie-env-agents, ref-junie-env-config, ref-junie-env-extensions, ref-junie-params-managed, ref-junie-guidelines-discovery, ref-junie-env-guidelines, ref-junie-guidelines-intro, ref-junie-config-trust]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-junie-config-trust, ref-junie-env-precedence, ref-junie-params-config, ref-junie-quickstart-transcript]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-junie-config-locations, ref-junie-config-extra, ref-junie-config-fields, ref-junie-env-config, ref-junie-params-config]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-junie-config-precedence, ref-junie-env-precedence, ref-junie-params-core, ref-junie-config-extra]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-junie-env-precedence, ref-junie-params-core, ref-junie-config-extra, ref-junie-env-model]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-junie-config-trust]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-junie-config-fields, ref-junie-env-skills, ref-junie-env-mcp, ref-junie-env-agents, ref-junie-env-config, ref-junie-env-extensions, ref-junie-params-managed]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: partial
        source_refs: [ref-junie-guidelines-intro, ref-junie-guidelines-discovery, ref-junie-env-guidelines, ref-junie-config-trust]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-junie-config-trust, ref-junie-env-precedence, ref-junie-params-config, ref-junie-quickstart-transcript]
---

## 固定来源与适用范围 {#config-scope}

本章依据 Junie 官方文档站 `junie.jetbrains.com/docs` 的 `junie-cli-configuration.html`、
`environment-variables.html`、`parameters.html`、`guidelines-and-memory.html` 与
`junie-cli.html` 快照，未标注适用构建号，属来源级知识。Junie CLI 的配置面有三条独立通道：
`config.json` 文件、`~/.junie/settings.json` 用户设置（交互界面保存的偏好，如子代理模型策略）、
以及从高到低介入的命令行标志与环境变量 [@ref-junie-config-locations][@ref-junie-quickstart-overview]。

## 配置来源与路径 {#config-sources}

**config.sources**。默认读取两处 `config.json` [@ref-junie-config-locations]：

- 用户作用域：`~/.junie/config.json` —— 本机个人默认值。
- 项目作用域：`项目根/.junie/config.json` —— 团队共享的项目默认值。

可用 `--config-location`（可重复）追加额外配置文件，用 `--config-default-locations false` 关闭
默认的用户与项目位置；显式传入的文件即使项目未受信任也会加载
[@ref-junie-config-extra]。对应的环境变量是 `JUNIE_CONFIG_LOCATION` 与
`JUNIE_CONFIG_DEFAULT_LOCATIONS`（默认 `true`），另有 `JUNIE_HOME` 覆盖默认的 `~/.junie`
[@ref-junie-env-config][@ref-junie-params-config]。

`config.json` 支持的顶层字段包括：`model`、`effort`、`provider`、`brave`、`flags`、
`mcp-locations`/`mcp-default-locations`、`skill-locations`/`skill-default-locations`、
`command-locations`/`command-default-locations`、`agent-locations`/`agent-default-locations`、
`model-locations`/`model-default-locations`、`auto-update`、`guidelines-location`、`byok`、
`proxies`、`hooks`；文件内的相对路径以该文件所在目录为基准解析
[@ref-junie-config-fields]。此外有 `~/.junie/settings.json` 作为用户设置通道，交互界面写入的设置
（例如子代理模型策略）保存在这里 [@ref-junie-quickstart-transcript]。

## 优先级与合并 {#config-overrides}

**config.overrides**。多个 `config.json` 合并，命令行标志覆盖其值；同一设置在多文件出现时按下列
顺序解析（高优先级在前）[@ref-junie-config-precedence]：

1. 命令行标志。
2. 项目配置 `项目根/.junie/config.json`（项目受信任时）。
3. 用户配置 `~/.junie/config.json`。

文档给出一例：用户配置 `"model": "sonnet"`、项目配置 `"model": "gpt"`、运行
`junie --model opus`，最终生效 `opus` [@ref-junie-config-precedence]。`~/.junie/settings.json`
是**独立通道**，不参与上述 `config.json` 合并；文档明确指出不存在跨两套通道的单一全局优先级，
模型、provider、brave、effort 等各自沿自己的消费路径解析
[@ref-junie-config-precedence]。数组与空值/删除标记的语义在固定来源里没有说明，因此对象级合并规则
只对已列出的字段与代理合并成立（代理按 `name` 合并、`headers` 合并去重）
[@ref-junie-config-fields]。

**config.runtime**：环境变量与 CLI 标志在存在同名设置时，**命令行标志优先**——例如
`JUNIE_MODEL=sonnet` 而运行 `junie --model gpt`，以 CLI 标志为准
[@ref-junie-env-precedence]。绝大多数 CLI 标志都有对应环境变量，便于 CI/无头环境
[@ref-junie-params-core]。显式 `--config-location` 文件在未受信任项目里也生效，因为它们由用户
主动选择 [@ref-junie-config-extra]；模型选择还可用 `--model`/`--provider`/`--effort`
（或 `JUNIE_MODEL`/`JUNIE_LLM_PROVIDER`/`JUNIE_EFFORT`）在运行期覆盖
[@ref-junie-env-model]。

## 项目信任 {#config-trust}

**config.trust**。交互式会话在项目没有有效信任标记时先请求信任决定，三选一：保持不受信任（使用
隔离的临时项目 Junie 存储）、只信任该项目（仅规范化的项目目录）、信任父目录及其下所有项目。
Junie 在评估信任前会规范化项目与作用域路径并解析符号链接；父级信任按路径包含关系而非字符串前缀
匹配，有效标记让匹配的项目免于再次询问 [@ref-junie-config-trust]。

未受信任的项目仍可作为普通文件操作的工作区，但 Junie **不隐式加载**项目配置、MCP server、hooks、
扩展、模型、计划、演示、自定义 agent/命令、skills、根或项目级 Junie guidelines、项目记忆以及自动
迁移/入门来源；改用仓库之外的可写临时 Junie 目录，会话期间新增的 MCP server、skills、命令随进程
关闭被移除。Junie Home 下的全局来源仍启用 [@ref-junie-config-trust]。信任密钥只存于 macOS 钥匙串、
Windows 凭据管理器或 Linux Secret Service；原生安全存储不可用时退化为同目录下仅所有者可读的
`authentication-key` 文件。每个精确项目或父目录作用域在 Junie Home 的 `trust` 目录（默认
`~/.junie/trust`）各有独立标记，删除精确标记吊销该项目，删除父标记在下次进程吊销其下继承信任。
非交互的 JSON、ACP 与 Gateway 启动总是受信任，不弹询问 [@ref-junie-config-trust]。

## 默认值与功能开关 {#config-defaults}

**config.defaults**。发现类开关默认开启：`mcp-default-locations`、`skill-default-locations`、
`agent-default-locations`、`model-default-locations`、`command-default-locations`、
`config-default-locations` 等默认均为 `true`，可在 `config.json` 或用对应 CLI/环境变量关闭
[@ref-junie-config-fields][@ref-junie-env-skills][@ref-junie-env-mcp][@ref-junie-env-agents]
[@ref-junie-env-config]。其他默认：`--model` 未指定时使用动态选取的 `Default` 模型；`extensions`
默认目录为 `~/.junie/extensions`，可用 `JUNIE_EXTENSIONS_DEFAULT_LOCATION` 或
`--extensions-default-location` 覆盖 [@ref-junie-env-extensions]。托管启动器的 `--channel`
默认取 `release`，支持 `release`/`eap`/`nightly`/`experimental`，`--force` 配合 `junie update`
重装当前通道最新构建 [@ref-junie-params-managed]。

**config.migration**：固定来源只覆盖部分迁移面。guidelines 的旧格式 `.junie/guidelines.md`（或
`.junie/guidelines/` 目录）仍被支持，仅在更高优先级的文件都不存在时使用
[@ref-junie-guidelines-discovery][@ref-junie-env-guidelines]。首次打开项目时，Junie 会检测其它 AI
agent 的 guidelines/记忆文件，若发现则建议把指令导入 `.junie/AGENTS.md`
[@ref-junie-guidelines-intro]。配置键的迁移、弃用与兼容规则在固定来源中没有描述，因此本项按
partial 阅读。信任侧的“自动迁移/入门来源”与未受信任项目一起被描述，可视为迁移相关行为的一部分
[@ref-junie-config-trust]。

## 诊断 {#config-diagnostics}

**config.diagnostics**：“文件已写但没生效”的三个可观察点。其一，信任：交互式 UI 打开未受信任项目
后，启动头部会说明项目文件仍可访问但项目提供的 Junie 配置未加载；受信任后匹配的精确/祖先标记让
项目免问 [@ref-junie-config-trust]。其二，优先级：CLI 标志与环境变量同名时以标志为准，可用
`JUNIE_MODEL` 与 `--model` 的对照验证哪个值在生效 [@ref-junie-env-precedence]。其三，来源位置：
`--config-default-locations false` 会关闭默认位置的加载，`--config-location` 可显式指定文件，用它们
可区分“读到的是哪份文件” [@ref-junie-params-config]。会话内还可用 `Ctrl+O` 打开会话目录下的
`transcript.md` 复核实际交互，`/settings` 也可改“Show transcript”为终端视图
[@ref-junie-quickstart-transcript]。固定来源没有提供“打印实际生效配置来源”的专门命令，因此本项按
partial 阅读。
