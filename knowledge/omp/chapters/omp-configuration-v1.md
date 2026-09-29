---
schema_version: 2
record_kind: production
edition_id: omp-configuration-v1
harness_id: omp
topic: configuration
title: OMP 配置机制
sections:
  - section_id: config-sources
    source_refs:
      - ref-omp-config-roots-doc
  - section_id: config-precedence
    source_refs:
      - ref-omp-settings-precedence-doc
      - ref-omp-settings-merge-doc
      - ref-omp-settings-provenance-code
  - section_id: config-behavior
    source_refs:
      - ref-omp-settings-migration-doc
      - ref-omp-config-command-code
      - ref-omp-settings-precedence-doc
      - ref-omp-settings-provenance-code
questions:
  - question_id: config.sources
    section_id: config-sources
    status: answered
    source_refs:
      - ref-omp-config-roots-doc
  - question_id: config.overrides
    section_id: config-precedence
    status: answered
    source_refs:
      - ref-omp-settings-precedence-doc
      - ref-omp-settings-merge-doc
  - question_id: config.runtime
    section_id: config-precedence
    status: answered
    source_refs:
      - ref-omp-settings-provenance-code
  - question_id: config.trust
    section_id: config-behavior
    status: unknown
    source_refs: []
  - question_id: config.defaults
    section_id: config-behavior
    status: partial
    source_refs:
      - ref-omp-settings-precedence-doc
  - question_id: config.migration
    section_id: config-behavior
    status: answered
    source_refs:
      - ref-omp-settings-migration-doc
  - question_id: config.diagnostics
    section_id: config-behavior
    status: answered
    source_refs:
      - ref-omp-config-command-code
      - ref-omp-settings-provenance-code
---
## 配置来源 {#config-sources}

**config.sources**：`src/config.ts` 固定来源优先级为 .omp、.claude、.codex、.gemini；用户级基目录是原生 agentDir 与各工具家目录，项目级是当前工作目录下的同名目录。命名 profile 只迁移 OMP 原生用户级路径，外部工具目录与项目目录不随 profile 变化。 [@ref-omp-config-roots-doc]

## 覆盖与运行时 {#config-precedence}

**config.overrides**：层优先级从低到高为内置默认、全局、项目、CLI overlay、运行时覆盖；对象深度合并，标量与数组整体替换（高优先层的数组不追加到低优先层）。 [@ref-omp-settings-precedence-doc] [@ref-omp-settings-merge-doc]

**config.runtime**：运行时覆盖（如 --model 等）只作用于当前进程且不持久化；`getProvenance()` 按运行时覆盖、config overlay、项目、全局、父 overlay、默认的顺序报告实际生效层。 [@ref-omp-settings-provenance-code]

## 生效边界与诊断 {#config-behavior}

**config.trust**：本章未找到项目信任或组织策略门控配置读取的直接机制。已检查的直接入口是 src/config/claude-paths.ts（只涉及 CLAUDE_CONFIG_DIR）与 src/config/settings.ts（层与迁移）；是否存在信任门控仍未确认，属明确缺口，不能据此断言不存在。

**config.defaults**：默认值来自设置定义；`getProvenance()` 在未配置时返回 default，声明在设置上的 env 变量是最高层（env 层细节本节未取证）。 [@ref-omp-settings-precedence-doc]

**config.migration**：启动时若全局 config.yml 与 config.yaml 都不存在，先迁移 `~/.omp/agent/settings.json`（成功后改名 .bak），再合并 agent.db 旧设置并写入 config.yml。 [@ref-omp-settings-migration-doc]

**config.diagnostics**：`omp config` 提供 list、get、set、reset、path、init-xdg（含 --json）；配合 `getProvenance()` 可查实际生效层，回答“文件已写但没生效”。 [@ref-omp-config-command-code] [@ref-omp-settings-provenance-code]
