---
schema_version: 2
record_kind: production
edition_id: codex-cli-configuration-v2
harness_id: codex-cli
topic: configuration
title: "Codex CLI 主题章节：配置机制"
sections:
  - section_id: config-sources
    source_refs:
      - ref-codex-cli-config-user-doc
      - ref-codex-cli-config-precedence-source
  - section_id: config-overrides
    source_refs:
      - ref-codex-cli-config-precedence-source
      - ref-codex-cli-config-merge-source
      - ref-codex-cli-config-blocked-doc
  - section_id: config-runtime-trust
    source_refs:
      - ref-codex-cli-config-profiles-doc
      - ref-codex-cli-config-trust-doc
      - ref-codex-cli-config-user-doc
  - section_id: config-defaults-migration
    source_refs:
      - ref-codex-cli-config-requirements-doc
      - ref-codex-cli-config-user-doc
      - ref-codex-cli-config-migration-doc
      - ref-codex-cli-config-deprecation-doc
  - section_id: config-diagnostics
    source_refs:
      - ref-codex-cli-config-schema-doc
      - ref-codex-cli-config-requirements-doc
questions:
  - question_id: config.sources
    section_id: config-sources
    status: answered
    source_refs:
      - ref-codex-cli-config-user-doc
      - ref-codex-cli-config-precedence-source
  - question_id: config.overrides
    section_id: config-overrides
    status: answered
    source_refs:
      - ref-codex-cli-config-precedence-source
      - ref-codex-cli-config-merge-source
      - ref-codex-cli-config-blocked-doc
  - question_id: config.runtime
    section_id: config-runtime-trust
    status: answered
    source_refs:
      - ref-codex-cli-config-profiles-doc
      - ref-codex-cli-config-trust-doc
  - question_id: config.trust
    section_id: config-runtime-trust
    status: answered
    source_refs:
      - ref-codex-cli-config-trust-doc
      - ref-codex-cli-config-user-doc
  - question_id: config.defaults
    section_id: config-defaults-migration
    status: partial
    source_refs:
      - ref-codex-cli-config-requirements-doc
      - ref-codex-cli-config-user-doc
  - question_id: config.migration
    section_id: config-defaults-migration
    status: answered
    source_refs:
      - ref-codex-cli-config-migration-doc
      - ref-codex-cli-config-deprecation-doc
  - question_id: config.diagnostics
    section_id: config-diagnostics
    status: partial
    source_refs:
      - ref-codex-cli-config-schema-doc
      - ref-codex-cli-config-requirements-doc
---

本主题的固定来源是官方配置参考快照（snapshot-codex-cli-configuration-doc）与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文只陈述来源范围内的机制。

## 配置来源与目录 {#config-sources}

用户级配置在 `~/.codex/config.toml`，项目级在项目根下的 `.codex/config.toml`，后者只在信任项目时加载。源码的配置层枚举还包括随包默认值、MDM、系统级文件、企业云托管、当前会话覆盖与旧版托管来源。[@ref-codex-cli-config-user-doc][@ref-codex-cli-config-precedence-source]

这几处文件的位置关系可以用下面的目录图对照，路径随 home 与项目根移动：

```text
~/.codex/config.toml          # 用户层
~/.codex/work.config.toml     # 名为 work 的 profile 文件，与 config.toml 同级
project/.codex/config.toml    # 项目层，仅信任项目时加载
```

前提是 home 与项目根按语义确定，结果是这几处文件一起参与合并；某个键最终取哪一层见优先级小节，如何确认见诊断小节。

## 优先级与合并 {#config-overrides}

源码给每一层一个优先级数值：随包默认 -10、MDM 0、System 10、企业托管 15、User 20（选中 profile 时为 21）、Project 25、会话覆盖 30、旧版托管文件 40、旧版托管 MDM 50；数值高的层覆盖数值低的层。TOML 合并按 key 递归，overlay 优先。项目级 `.codex/config.toml` 不能覆盖 provider、认证、通知、profile 选择与遥测路由等键，写在项目层会被忽略。[@ref-codex-cli-config-precedence-source][@ref-codex-cli-config-merge-source][@ref-codex-cli-config-blocked-doc]

用一个跨层同名键说明结果为什么这样：

```toml
# ~/.codex/config.toml        （User=20）
model = "from-user"

# project/.codex/config.toml  （Project=25）
model = "from-project"
```

字段与结果：两个文件给 `model` 赋了不同值，Project 层优先级 25 高于 User 层 20，同名键由高优先级覆盖，所以最终生效值是 `from-project`。未验证：固定来源没有把数组、空值与删除标记的合并语义逐项说明（例如数组是追加还是整体替换）。[@ref-codex-cli-config-merge-source]

## 运行时覆盖与信任 {#config-runtime-trust}

`--profile NAME` 选择 `$CODEX_HOME/profile-name.config.toml`，profile 文件与 `config.toml` 同级；CLI 参数以会话层（优先级 30）叠加在文件配置之上。[@ref-codex-cli-config-profiles-doc] 项目信任是运行时门槛：未信任项目会跳过项目级 `.codex/` 层，包括项目配置、hooks 与 rules。`projects.PATH.trust_level` 取 `trusted` 或 `untrusted`，该键写在用户级 `~/.codex/config.toml`。[@ref-codex-cli-config-trust-doc][@ref-codex-cli-config-user-doc]

把某个项目标记为受信任的完整块：

```toml
# ~/.codex/config.toml
[projects."/home/you/repo"]
trust_level = "trusted"
```

字段与检查：`projects` 表的键是项目路径，`trust_level` 只接受 `trusted` 或 `untrusted`；前提是写在用户级配置。结果是 `trusted` 的项目其 `.codex/` 层会被加载，`untrusted` 则被跳过。可观察的检查是同一份项目配置在两种取值下是否生效。

## 默认值、迁移与弃用 {#config-defaults-migration}

默认值状态 partial：文档在具体键上给出默认值（例如 MCP 超时与 skills 预算），`requirements.toml` 可强制某些安全键；固定来源没有集中列出默认值来源、功能开关与平台差异的完整清单。[@ref-codex-cli-config-requirements-doc][@ref-codex-cli-config-user-doc] `requirements.toml` 是管理员强制、限制用户不可覆盖的安全敏感设置的文件；固定来源只以链接给出它的位置与示例，本次没有捕获其正文，因此这里不写具体路径。

迁移与弃用：`approval_policy = "untrusted"` 已不再支持（项目层 `trust_level = "untrusted"` 仍支持）；`experimental_instructions_file` 改名为 `model_instructions_file`，旧键被弃用。[@ref-codex-cli-config-migration-doc][@ref-codex-cli-config-deprecation-doc]

```toml
# ~/.codex/config.toml
# 旧键（已弃用）
experimental_instructions_file = "./AGENTS.md"

# 新键
model_instructions_file = "./AGENTS.md"
```

字段与检查：两行是同一个键的旧名与新名，取值不变；旧键被弃用，应改用新键。前提是文件已使用旧键；结果是把键名替换后行为不变，检查方式是启动时不再出现与旧键相关的弃用提示。

## 诊断 {#config-diagnostics}

状态 partial：可用的手段是把 `#:schema` 指向 `config-schema.json` 让编辑器校验键；固定来源没有给出"文件已写但未生效"的专门诊断入口（例如打印有效合并结果）。[@ref-codex-cli-config-schema-doc][@ref-codex-cli-config-requirements-doc]

```toml
# ~/.codex/config.toml
#:schema https://developers.openai.com/codex/config-schema.json
```

字段与检查：`#:schema` 是文件首行的注释式提示，值是该配置的 JSON Schema 地址；前提是编辑器支持这种提示。结果是键名与类型的错误会在编辑器里标出；它只校验键，不代表配置已经生效或某一层已被加载。
