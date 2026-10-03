---
schema_version: 3
record_kind: production
edition_id: pi-skills-v3
harness_id: pi
topic: skills
title: Pi Skills：位置、编写规则与调用（固定源码 8369268）
sections:
  - section_id: skills-locations
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-doc-locations
      - ref-pi-skills-doc-frontmatter
      - ref-pi-config-trust-protected
  - section_id: skills-authoring
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-doc-frontmatter
      - ref-pi-skills-code-name-validation
  - section_id: skills-extension-fields
    surface_ids: [cli]
    source_refs:
      - ref-pi-config-resources
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-doc-loading
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-doc-command-control
      - ref-pi-config-resources
      - ref-pi-config-trust-protected
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-doc-frontmatter
      - ref-pi-skills-code-name-validation
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-pi-skills-doc-locations
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: partial
        source_refs:
          - ref-pi-skills-doc-locations
          - ref-pi-skills-doc-frontmatter
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs:
          - ref-pi-skills-doc-frontmatter
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-authoring
        status: answered
        source_refs:
          - ref-pi-skills-doc-frontmatter
          - ref-pi-skills-code-name-validation
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-extension-fields
        status: partial
        source_refs:
          - ref-pi-config-resources
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs:
          - ref-pi-skills-doc-loading
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-pi-skills-doc-command-control
          - ref-pi-config-resources
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: partial
        source_refs:
          - ref-pi-config-trust-protected
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs:
          - ref-pi-skills-doc-frontmatter
          - ref-pi-skills-code-name-validation
---
固定来源为 pi 仓库提交 83692682 的 Pi coding agent 包（`packages/coding-agent/docs/skills.md`、`src/core/skills.ts`、`docs/settings.md`、`docs/security.md`）。相对 pi-skills-v2 有一处结论被推翻：Skill 名称不再要求与父目录同名，也不再因此告警。本章取代 v2 的对应结论；v2 中未被本章重写的部分仍按其固定来源范围阅读。本库未为 Pi 建立软件版本映射，按 source_only 阅读。

## 发现位置与信任前提 {#skills-locations}

含 `SKILL.md` 的目录会被递归发现。默认位置是用户级与项目级 skills 目录（`~/.pi/agent/skills/` 与项目 `.pi/skills/`）。[@ref-pi-skills-doc-locations] Pi 还支持 Agent Skills 位置 `~/.agents/skills/` 与 `.agents/skills/`，其中项目 `.agents/skills/` 从工作目录逐级向上发现，到仓库根目录为止。[@ref-pi-skills-doc-locations] 相对 v2，本节改写的原因是文档不再写“`.agents/skills` 根目录下的 `.md` 文件被忽略”，改为强调目录式 `SKILL.md` 才是可移植形态；这处忽略规则本固定来源未再确认，仍按 v2 范围阅读。发现阶段遇到格式错误的 `SKILL.md`、缺少描述的已声明 skill 以及同名冲突时的处理见诊断一节。[@ref-pi-skills-doc-frontmatter]

项目 skill 可以指示模型执行脚本或改文件，因此文档要求在授予项目信任前先审阅不熟悉的 skill 及其配套文件。[@ref-pi-skills-doc-locations] 信任范围见配置章：当前目录或祖先目录下的项目 `.agents/skills` 属于受保护资源。[@ref-pi-config-trust-protected]

## 编写规则 {#skills-authoring}

名称用小写字母、数字与连字符，不允许前导、尾随或连续连字符，最多 64 字符；描述最多 1024 字符。[@ref-pi-skills-doc-frontmatter] 名称校验的代码判据与此一致：超长、不匹配 `^[a-z0-9-]+$`、首尾连字符、连续连字符都会进入错误列表。[@ref-pi-skills-code-name-validation]

与 v2 相反，Pi 既不要求名称与父目录一致，也不就此告警；文档只说明其他 Agent Skills 实现可能强制该要求，所以同名仍是可移植的选择。[@ref-pi-skills-doc-frontmatter] 这是本章相对 v2 最重要的一处更正。

另外两条不再加载的规则：格式错误的 `SKILL.md` 与缺少描述的已声明 skill 都不加载。[@ref-pi-skills-doc-frontmatter]

## 扩展字段 {#skills-extension-fields}

settings 的 `skills` 数组默认空，用于追加 skill 文件或目录；`enableSkillCommands` 默认 `true`。[@ref-pi-config-resources] 数组支持 `!pattern` 排除、`+path` 精确包含、`-path` 精确排除，用户级与项目设置里列出的资源都会加载。[@ref-pi-config-resources] 本固定来源未在本章复核第一方扩展字段的完整清单，仍按 v2 范围阅读。

## 加载时机与渐进披露 {#skills-loading}

启动时 Pi 扫描配置的 skill 位置，把每个 skill 的名称、描述与路径加入系统提示，不加入完整指令；任务匹配时模型再读 `SKILL.md`，相对路径按 skill 目录解析，文档也明说模型可能不去加载相关 skill，可用 `/skill:name` 强制。[@ref-pi-skills-doc-loading] 提示中的读取方式随可用的文件读取工具变化：默认提示用 `read` 工具读取 skill 文件。相对 v2 只记 `read`，这一句在当前代码里按 `fileReadTool` 分支。

## 调用与开关 {#skills-invocation}

`/skill:name` 载入对应 skill，命令名后的参数作为用户请求追加到已载入的指令后：

```text
/skill:pdf-tools extract report.pdf
```

[@ref-pi-skills-doc-loading] `disable-model-invocation: true` 让 skill 只通过显式命令可用；`enableSkillCommands` 控制 skill 命令是否出现在交互式命令发现里，手动输入的 `/skill:name` 仍然可用。[@ref-pi-skills-doc-command-control] 这比 v2 更精确：v2 说该键关闭命令注册，实际语义是只影响交互式命令发现。[@ref-pi-config-resources] 关闭该键的写法：

```json
{ "enableSkillCommands": false }
```

项目 skill 所在目录受项目信任约束；其它启动入口（interactive、rpc、sdk）是否改变发现范围，本固定来源未说明。[@ref-pi-config-trust-protected]

## 诊断 {#skills-diagnostics}

同名冲突保留先发现的那个 skill，并产生告警。[@ref-pi-skills-doc-frontmatter] 名称不合规与描述缺失在加载阶段体现为不加载加诊断信息。[@ref-pi-skills-code-name-validation] 缺口：固定来源仍没有“列出当前已加载 skill 及其来源”的命令，也没有单独重载 skill 的入口，验证发现结果需要另做运行观察。
