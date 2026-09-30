---
schema_version: 3
record_kind: production
edition_id: opencode-configuration-v1
harness_id: opencode
topic: configuration
title: OpenCode 的配置机制
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-sources
      - ref-opencode-config-merge
      - ref-opencode-config-runtime
      - ref-opencode-config-trust
      - ref-opencode-config-vars
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-schema
      - ref-opencode-config-defaults
      - ref-opencode-config-migration
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-diagnostics
      - ref-opencode-config-sources
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-opencode-config-sources
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: partial
        source_refs:
          - ref-opencode-config-merge
          - ref-opencode-config-sources
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-opencode-config-runtime
          - ref-opencode-config-vars
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-opencode-config-trust
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs:
          - ref-opencode-config-schema
          - ref-opencode-config-defaults
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: partial
        source_refs:
          - ref-opencode-config-migration
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs:
          - ref-opencode-config-diagnostics
          - ref-opencode-config-sources
---
本章依据固定源码提交 545f51d 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.18.32 的运行时行为；以下路径与优先级属于固定源码知识，对 1.18.32 二进制的适用性尚未建立映射。

## 来源与优先级 {#config-sources}

**config.sources**：配置按固定顺序加载并合并：远程 `.well-known/opencode`、全局 `~/.config/opencode/opencode.json`、自定义 `OPENCODE_CONFIG`、项目 `opencode.json`、`.opencode` 目录、内联 `OPENCODE_CONFIG_CONTENT`、受管文件，最后是 macOS 受管偏好。项目配置放在项目根，启动时从当前目录向上找到最近的 Git 目录。`.opencode` 与 `~/.config/opencode` 下的子目录用复数名（`agents/`、`commands/`、`modes/`、`plugins/`、`skills/`、`tools/`、`themes/`），单数名向后兼容。 [@ref-opencode-config-sources]

**config.overrides**：多文件是合并而非替换，只有冲突键由后者覆盖，非冲突项保留；源码用 `mergeDeep` 深合并，并对 `instructions` 这类数组字段拼接去重。`disabled_providers` 优先于 `enabled_providers`。文档没有穷举“哪些键例外”，空值与删除标记的语义也未说明，故本项标 partial。 [@ref-opencode-config-merge] [@ref-opencode-config-sources]

**config.runtime**：`OPENCODE_CONFIG` 指定自定义配置文件，插在全局与项目之间；`OPENCODE_CONFIG_DIR` 指定额外配置目录（在全局与 `.opencode` 之后加载，可覆盖它们）；`OPENCODE_CONFIG_CONTENT` 提供内联配置，位于项目之后。配置值支持 `{env:VAR}` 与 `{file:path}` 替换，环境变量缺失时替换为空串，文件路径相对配置文件目录或为绝对路径。CLI 参数与 profile 的介入方式未在本页说明，本项对该部分留缺口。 [@ref-opencode-config-runtime] [@ref-opencode-config-vars]

**config.trust**：组织可通过受管设置强制配置：Linux `/etc/opencode/`、macOS `/Library/Application Support/opencode/`、Windows `%ProgramData%\opencode` 下的 `opencode.json(c)`，以及 macOS 的 `ai.opencode.managed` 偏好（经 MDM 下发）。这些位于最高优先级且用户不可覆盖。固定来源没有单独的项目信任开关，信任相关限制体现在受管层，本项据此作答。 [@ref-opencode-config-trust]

## 默认与迁移 {#config-defaults}

**config.defaults**：运行时配置的 schema 在 `opencode.ai/config.json`，TUI 在 `opencode.ai/tui.json`，编辑器据此校验补全。默认行为上，`autoupdate` 默认开启（可设 `false` 或 `"notify"`），`formatter` 与 `lsp` 默认关闭，需显式开启或配置。平台差异由具体选项决定，例如 `shell` 未指定时按操作系统自动选择。 [@ref-opencode-config-schema] [@ref-opencode-config-defaults]

**config.migration**：`opencode.json` 中旧的 `theme`、`keybinds`、`tui` 键已弃用并会“尽可能”自动迁移；TUI 专属设置迁到 `tui.json`。Agent 的旧字段 `maxSteps` 也已弃用，改用 `steps`。文档未给出迁移失败时的替代路径或版本边界，故本项标 partial。 [@ref-opencode-config-migration]

## 诊断 {#config-diagnostics}

**config.diagnostics**：`opencode debug config` 打印解析后的最终配置，可核对实际生效的键，受管键也会出现在其中且不可被用户或项目覆盖。排查“文件写了但没生效”时，按优先级检查是否有更高优先级的来源覆盖同一键，并确认配置目录是否正确、是否需要重启进程。文档没有“显示每个键来自哪个文件”的命令，故来源溯源为缺口，本项标 partial。 [@ref-opencode-config-diagnostics] [@ref-opencode-config-sources]
