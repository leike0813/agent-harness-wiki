---
schema_version: 3
record_kind: production
edition_id: omp-configuration-v2
harness_id: omp
topic: configuration
title: OMP 配置来源、优先级与诊断
sections:
  - section_id: config-roots
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-roots-doc
      - ref-omp-settings-precedence-doc
  - section_id: config-precedence
    surface_ids: [cli]
    source_refs:
      - ref-omp-settings-precedence-doc
      - ref-omp-settings-merge-doc
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs:
      - ref-omp-settings-provenance-code
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: []
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs:
      - ref-omp-settings-precedence-doc
  - section_id: config-migration
    surface_ids: [cli]
    source_refs:
      - ref-omp-settings-migration-doc
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-omp-config-command-code
      - ref-omp-settings-provenance-code
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-roots
        status: answered
        source_refs:
          - ref-omp-config-roots-doc
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-precedence
        status: answered
        source_refs:
          - ref-omp-settings-precedence-doc
          - ref-omp-settings-merge-doc
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs:
          - ref-omp-settings-provenance-code
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: unknown
        source_refs: []
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: partial
        source_refs:
          - ref-omp-settings-precedence-doc
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: answered
        source_refs:
          - ref-omp-settings-migration-doc
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs:
          - ref-omp-config-command-code
          - ref-omp-settings-provenance-code
---
本章材料来自源码修订 dff728c 的官方文档 `docs/config-usage.md` 与 `docs/settings.md`，以及 npm 包 `@oh-my-pi/pi-coding-agent` 18.3.4 的包内实现 `src/config/settings.ts` 与命令定义 `src/commands/config.ts`。来源顺序、层级与合并规则来自文档，provenance 顺序来自包内代码，命令动作来自包内命令定义。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。

## 配置来源与文件位置 {#config-roots}

`src/config.ts` 固定一组来源优先级：`.omp`（原生）、`.claude`、`.codex`、`.gemini`。用户级基目录是原生 agentDir（正常为 `~/.omp/agent`；命名 profile 改成 `~/.omp/profiles/NAME/agent`）以及各工具的家目录；项目级是工作目录下的同名目录。这几个通用 helpers 不把 `.pi` 列入发现顺序。 [@ref-omp-config-roots-doc]

设置文件有两个主要位置：全局是 `~/.omp/agent/config.yml`（既有 `config.yaml` 会被就地读写），项目层由工作目录下的 `.omp/config.yml` 与同目录的 `.omp/settings.json` 组成，其中 `config.yml` 覆盖 `settings.json`。命名 profile 只迁移 OMP 原生用户级路径，外部工具目录与项目目录不随 profile 变化。 [@ref-omp-settings-precedence-doc]

## 层优先级与合并规则 {#config-precedence}

设置从低到高的层是：内置默认、全局配置、项目配置、CLI overlay、运行时覆盖、设置上声明的环境变量。合并时对象深度合并（低层独有的键保留，高层覆盖同名键），标量与数组由高优先层整体替换，高优先层的数组不会追加到低优先层的数组。 [@ref-omp-settings-precedence-doc] [@ref-omp-settings-merge-doc]

一份全局文件与一份项目文件：

```yaml
# ~/.omp/agent/config.yml
tools:
  approval:
    bash: prompt
    read: allow
disabledProviders:
  - anthropic
  - openai
```

```yaml
# 项目 .omp/config.yml
tools:
  approval:
    bash: allow
disabledProviders:
  - groq
```

在该项目里生效的结果是 `tools.approval.bash` 变成 `allow`，`tools.approval.read` 保留全局的 `allow`，而 `disabledProviders` 被项目数组整体替换成只剩 `groq`，全局列出的 anthropic、openai 在这个项目里重新可用。要在一个项目里追加禁用项，必须把全局的 ID 也在项目数组里重写一遍。 [@ref-omp-settings-merge-doc]

检查方式是 `omp config get disabledProviders` 看合并后的实际值，或 `omp config list --json` 看每个键的来源。 [@ref-omp-settings-precedence-doc]

## 运行时覆盖与来源判定 {#config-runtime}

运行时覆盖来自专用 CLI 标志（`--model`、`--smol`、`--plan`、`--approval-mode`、`--api-key` 等）与部分功能环境变量，只作用于当前进程且不持久化。`getProvenance()` 按运行时覆盖、config overlay、项目、全局、父 overlay、schema 默认的顺序报告某个设置实际由哪一层提供，用它回答“文件已写但没有生效”。 [@ref-omp-settings-provenance-code]

## 信任边界 {#config-trust}

本章未找到项目信任或组织策略门控配置读取的直接机制。已检查的直接入口是来源与设置层（`src/config.ts` 的来源顺序、`src/config/settings.ts` 的层与迁移）；是否存在信任门控仍未确认，属明确缺口，不能据此断言不存在。

## 默认值与功能开关 {#config-defaults}

默认值来自每个设置的定义；`getProvenance()` 在没有更高层配置时返回 default。声明在设置上的 env 变量是最高的层，fallback 型变量只替换内置默认。 [@ref-omp-settings-precedence-doc]

缺口：功能开关与平台差异的完整清单、以及各自如何改变生效结果，本章未逐项取证，属部分结论。 [@ref-omp-settings-precedence-doc]

## 旧格式迁移 {#config-migration}

启动时如果全局 `config.yml` 与 `config.yaml` 都不存在，OMP 先迁移 `~/.omp/agent/settings.json`（成功后改名 `.bak`），再合并 `agent.db` 里的旧设置（冲突时 DB 值胜出），最后把合并结果写入 `config.yml`。 [@ref-omp-settings-migration-doc]

## 诊断与实际生效来源 {#config-diagnostics}

`omp config` 提供 `list`、`get`、`set`、`reset`、`path` 与 `init-xdg` 动作；其中 `list`、`get`、`set`、`reset` 支持 `--json`。 [@ref-omp-config-command-code]

```bash
omp config list --json
omp config get disabledProviders
omp config set compaction.enabled false
omp config reset steeringMode
omp config path
```

`set` 与 `reset` 写的是全局主文件，不写项目文件的任意键；只有模型选择器角色在 `modelRoleStorage: project` 时例外地写入项目 `.omp/config.yml` 的 `modelRoles`。配合 `getProvenance()`，`omp config get` 能指出当前生效值来自哪一层，回答“文件已写但没有生效”的典型问题；`omp config path` 打印当前 agent 目录，用来确认 `PI_CODING_AGENT_DIR` 或 profile 是否把文件读到了别处。 [@ref-omp-config-command-code] [@ref-omp-settings-provenance-code]
