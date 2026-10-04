---
schema_version: 3
record_kind: production
edition_id: deep-agents-cli-skills-v2
harness_id: deep-agents
topic: skills
title: "deep-agents CLI 技能系统：来源、格式、加载与调用"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-deep-agents-skills-precedence, ref-deep-agents-skills-doc-discovery, ref-deep-agents-skills-doc-profile, ref-deep-agents-skills-doc-add]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-deep-agents-skills-sources, ref-deep-agents-skills-parse, ref-deep-agents-skills-doc-discovery, ref-deep-agents-skills-doc-allowlist]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-deep-agents-skills-parse, ref-deep-agents-skills-fields, ref-deep-agents-skills-builtinmeta, ref-deep-agents-skills-builtinskill, ref-deep-agents-skills-namespace, ref-deep-agents-skills-doc-allowlist, ref-deep-agents-skills-precedence]
  - section_id: skills-collision
    surface_ids: [cli]
    source_refs: [ref-deep-agents-skills-merge, ref-deep-agents-skills-sources, ref-deep-agents-skills-namespace, ref-deep-agents-skills-precedence, ref-deep-agents-skills-doc-list]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-deep-agents-skills-prompt, ref-deep-agents-skills-skilllist, ref-deep-agents-skills-skill-paths, ref-deep-agents-skills-envelope, ref-deep-agents-skills-doc-invoke, ref-deep-agents-skills-doc-launch]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-deep-agents-skills-doc-allowlist, ref-deep-agents-skills-trust, ref-deep-agents-skills-precedence, ref-deep-agents-skills-doc-list, ref-deep-agents-skills-trustcli, ref-deep-agents-skills-doc-contextdoctor, ref-deep-agents-skills-doc-discovery, ref-deep-agents-skills-warnings]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-deep-agents-skills-precedence, ref-deep-agents-skills-doc-discovery, ref-deep-agents-skills-doc-profile, ref-deep-agents-skills-doc-add]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-deep-agents-skills-sources, ref-deep-agents-skills-doc-discovery]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-deep-agents-skills-parse, ref-deep-agents-skills-fields]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-deep-agents-skills-fields, ref-deep-agents-skills-builtinmeta, ref-deep-agents-skills-namespace, ref-deep-agents-skills-doc-allowlist]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-collision
        status: answered
        source_refs: [ref-deep-agents-skills-merge, ref-deep-agents-skills-sources, ref-deep-agents-skills-namespace]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-deep-agents-skills-prompt, ref-deep-agents-skills-skilllist, ref-deep-agents-skills-skill-paths]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-deep-agents-skills-envelope, ref-deep-agents-skills-doc-invoke, ref-deep-agents-skills-doc-launch]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-deep-agents-skills-doc-allowlist, ref-deep-agents-skills-trust, ref-deep-agents-skills-precedence]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-deep-agents-skills-doc-list, ref-deep-agents-skills-trustcli, ref-deep-agents-skills-doc-contextdoctor, ref-deep-agents-skills-doc-discovery, ref-deep-agents-skills-warnings]
---

## 技能来源与优先级 {#skills-roots}

注：catalog 为该 surface 登记的参考页是 Deep Agents overview（`https://docs.langchain.com/oss/python/deepagents/overview`），该页描述 Python SDK 的 `create_deep_agent`，不描述 CLI；本页因此改用官方 CLI 文档树与固定提交的 `libs/code` 源码作为固定来源。

本主题固定来源为 deep-agents CLI（`dcode`）的源码与官方文档页 `memory-and-skills`、`configuration`、`cli-reference`；本版正文复核于提交 `f57c6f383b7018024ca5cde2dc565048ea83202a`，上一版 `c9b2ce194e422d2a61b9faf3732da15d90623c13` 的引用仍按各自快照固定，未改小节沿用原范围。每条 Skill 是一个目录，目录内必须含一个 `SKILL.md`；`dcode` 在启动时从若干固定根目录发现这些目录，并按固定优先级解决同名冲突。

代码中的权威优先级从低到高为：内置目录 `built_in_skills_dir`（安装包内的 `built_in_skills/`）、插件技能源 `plugin_skill_sources`、用户目录 `~/.deepagents/{agent}/skills/`、用户工具无关别名 `~/.agents/skills/`、项目目录 `.deepagents/skills/`、项目工具无关别名 `.agents/skills/`，以及两个实验性的 Claude 目录 `~/.claude/skills/` 与 `.claude/skills/`；高优先级目录中同名 Skill 覆盖低优先级者 [@ref-deep-agents-skills-precedence]。

| 优先级 | 目录 | source 标签 | 作用域 |
|---|---|---|---|
| 0（最低） | 包内 `built_in_skills/` | `built-in` | 随 dcode 发布 |
| 1 | 插件携带的 `skills/` 组件 | `plugin` | 已发现插件 |
| 2 | `~/.deepagents/{agent}/skills/` | `user` | 当前 agent 用户级 |
| 3 | `~/.agents/skills/` | `user` | 跨 AI CLI 工具用户级 |
| 4 | `.deepagents/skills/` | `project` | 当前项目 |
| 5 | `.agents/skills/` | `project` | 当前项目（工具无关） |
| 6 | `~/.claude/skills/` | `claude (experimental)` | 实验性 |
| 7（最高） | `.claude/skills/` | `claude (experimental)` | 实验性 |

官方文档把技能来源归纳为同一批目录，并说明项目级技能以包含 `.git` 的目录作为项目根来确定作用域 [@ref-deep-agents-skills-doc-discovery]。

路径随环境变化：

- 用户技能根位于 agent 目录之下，`DEEPAGENTS_HOME` 会整体搬迁该 profile 目录（含 `config.toml`、`AGENTS.md`、`skills/`、`memories/`）[@ref-deep-agents-skills-doc-profile]。
- `~/.agents/skills/` 这一工具无关别名源自启动时的 home 目录，不随 `DEEPAGENTS_HOME` 迁移 [@ref-deep-agents-skills-doc-profile]。
- 项目目录以包含 `.git` 的目录为项目根；无项目根时不扫描该来源 [@ref-deep-agents-skills-doc-discovery]。

创建入口区分作用域：`dcode skills create test-skill` 写入用户目录 `~/.deepagents/{agent_name}/skills/`，加 `--project` 则写入项目目录 `.deepagents/skills/`，生成模板 `SKILL.md`；也可直接把已有技能目录复制进相应技能根 [@ref-deep-agents-skills-doc-add]。

## 发现范围与扫描时机 {#skills-discovery}

发现发生在启动时，并在会话内执行 `/reload` 后重新运行 [@ref-deep-agents-skills-doc-discovery]。发现逻辑由 `list_skills` 驱动，它把上述八个来源按优先级顺序逐个扫描 [@ref-deep-agents-skills-sources]。

扫描方式：

- 对非插件来源，只列出来源目录的**直接子目录**（深度为 1），每个子目录下查找 `SKILL.md`。
- 目录项不是目录者被忽略；不含 `SKILL.md` 的目录不构成技能，不会递归下钻。
- 插件来源例外——插件技能目录会被递归遍历，嵌套目录按 `plugin:sub:skill` 拼接命名空间 [@ref-deep-agents-skills-sources][@ref-deep-agents-skills-doc-discovery]。
- 单个 `SKILL.md` 超过 10 MB 会被静默跳过 [@ref-deep-agents-skills-parse]。

健壮性：每个来源单独 `try/except` 包裹，某个目录不可读或某个 `SKILL.md` 半成品不会阻断其余来源；缺失的目录直接跳过 [@ref-deep-agents-skills-sources]。

符号链接与包含范围：加载技能内容时会校验解析后的真实路径是否落在某个允许根内，指向所有技能根之外的符号链接被拒绝，除非目标目录被显式加入允许清单 [@ref-deep-agents-skills-doc-allowlist]。

## SKILL.md 格式与宿主扩展字段 {#skills-format}

`SKILL.md` 以 YAML frontmatter 开头，用文件起点的 `---` 行界定；不匹配该模式、YAML 解析失败或 frontmatter 不是映射时，该技能被跳过并记一条 warning [@ref-deep-agents-skills-parse]。

必填字段为 `name` 与 `description`，缺一即跳过：

- `name` 长度上限 64，按 Agent Skills 规范应为小写字母、数字与连字符；不合规只告警、仍继续加载，以兼容旧文件。
- `description` 上限 1024，超出时截断保留前 1024 字节，被截断部分不再参与模型的选择判断 [@ref-deep-agents-skills-parse][@ref-deep-agents-skills-fields]。

可选字段 [@ref-deep-agents-skills-fields]：

| 字段 | 类型 | 约束/用途 |
|---|---|---|
| `license` | 字符串 | 许可证名或指向随附许可文件的引用 |
| `compatibility` | 字符串 | 环境要求，上限 500，超出截断 |
| `metadata` | 映射 | 任意键值；必须为映射类型，否则忽略并告警 |
| `allowed-tools` | 列表 | 推荐使用的工具名；当前为实验性 |

frontmatter 之后的正文是自由 Markdown；同级目录可放脚本或参考资料等附带资源，调用时按该技能自身 `SKILL.md` 所在目录解析（见加载小节）。

宿主扩展字段与配置项：

- 内置技能在加载时会把 `metadata.deepagents-code-version` 注入元数据，并把来源标注为 `built-in` [@ref-deep-agents-skills-builtinmeta]。
- 内置技能的 `compatibility` 通常声明为 `designed for deepagents-code`，表明适用产品 [@ref-deep-agents-skills-builtinskill]。
- 插件技能的名称是带 `plugin_id` 命名空间前缀的 `plugin:sub:skill` 形式，用于区分不同插件的同名技能 [@ref-deep-agents-skills-namespace]。
- `[skills].extra_allowed_dirs`（TOML，字符串数组，支持 `~` 展开）与等价的 `DEEPAGENTS_CODE_EXTRA_SKILLS_DIRS`（冒号分隔）扩展符号链接包含允许清单；它**不**新增发现目录，只放宽符号链接目标 [@ref-deep-agents-skills-doc-allowlist]。
- 两个 Claude 技能目录属于实验性来源，在元数据中带有 `claude (experimental)` 标签 [@ref-deep-agents-skills-precedence]。

## 同名技能的去重与命名空间 {#skills-collision}

合并规则是“后者覆盖前者”（last-one-wins），以技能 `name` 为键：来源按优先级升序迭代，高优先级技能整体替换低优先级的同名技能，不做字段级合并 [@ref-deep-agents-skills-merge][@ref-deep-agents-skills-sources]。

每次发生覆盖都会记录一条 DEBUG 日志，包含技能名、被替换与被采用的定义路径及其 source 标签，便于判定最终生效的是哪一个文件 [@ref-deep-agents-skills-merge]。

因此一个项目技能可以用同名文件“遮蔽”用户技能，用户技能又可遮蔽内置技能；`dcode skills info` 在检测到项目技能遮蔽用户同名技能时会显示提示 [@ref-deep-agents-skills-doc-list]。

插件技能通过命名空间隔离：不同插件即使提供同名技能，其合并键也不同，可共存；插件内部嵌套目录再以 `:` 追加中间段 [@ref-deep-agents-skills-namespace]。

两个实验性 Claude 目录在 CLI 加载器中共享同一个 `claude (experimental)` 标签且无命名空间，因此用户级 Claude 技能与项目级 Claude 技能同名时，后者按来源顺序胜出 [@ref-deep-agents-skills-precedence]。

## 上下文加载与调用方式 {#skills-loading}

渐进披露（progressive disclosure）：会话开始前，技能中间件只把每个技能的名称、描述、可选注解与 `SKILL.md` 路径注入 system prompt，正文不进入上下文 [@ref-deep-agents-skills-prompt]。

- system prompt 中的清单形如 `- **name**: description -> Read path for full instructions` [@ref-deep-agents-skills-skilllist]。
- CLI 自带的 system prompt 用一节 `### Skill Paths` 说明路径规则：该节同时点明 agent 专属技能目录，并声明**来源目录仅供参考，不能当作构造技能路径的基准**；要加载清单里的技能，须把该条 `-> Read` 的路径原样交给 `read_file`，既不把来源目录与技能名拼接，也不改用另一个来源目录 [@ref-deep-agents-skills-skill-paths]。
- 附带文件按该技能清单中列出的 `SKILL.md` 所在目录解析，并遵循其正文指示 [@ref-deep-agents-skills-skill-paths]。同一份 prompt 里技能中间件的使用说明仍写作"use absolute paths"访问辅助文件 [@ref-deep-agents-skills-prompt]；两者不冲突——落在该技能目录下的绝对路径同时满足——但**路径的来源**以清单行本身为准，这是本版固定提交相对上一版唯一变化的技能提示内容。
- 当任务匹配某技能描述时，模型自行用 `read_file` 读取该路径的完整正文（文档建议传 `limit=1000`，因为默认 100 行对多数技能文件过小），再按正文执行 [@ref-deep-agents-skills-prompt]。

显式调用：交互会话内用 `/skill:{name} [args]` 直接触发。加载器读取 `SKILL.md` 正文，把它包装成调用提示——形如“正在调用技能 X，以下是完整指令”并附上用户参数——再作为一条消息发给 agent，正文因此被注入本轮上下文 [@ref-deep-agents-skills-envelope][@ref-deep-agents-skills-doc-invoke]。

启动时调用：`--skill NAME` 让你在启动时立即运行一个技能，交互（TUI）与非交互（headless）模式均可 [@ref-deep-agents-skills-doc-launch]。

- `-m '请求'` 追加用户请求；管道把 stdin 内容作为输入。
- `-n` 进入非交互模式；`-q` 只输出 agent 结果。
- `--skill` 与 `--quiet` 或 `--no-stream` 搭配时必须同时给 `-n`。

以下示例依据文档页 `memory-and-skills` 的“Launch with a skill”一节 [@ref-deep-agents-skills-doc-launch]：

```bash
# 打开 TUI 并立即运行该技能
dcode --skill code-review

# 附带请求
dcode --skill code-review -m 'review the auth module'

# 非交互地运行
dcode --skill code-review -n 'review this patch'
```

自动调用：模型根据 skill 清单里的名称与描述判断是否相关，相关时读取正文并遵循之；描述中的关键词越具体，越容易被正确命中 [@ref-deep-agents-skills-prompt]。

## 生效条件与诊断 {#skills-diagnostics}

生效条件：

- **信任与包含范围**：技能内容的真实路径必须落在某个允许根内，否则读取被拒并提示把目标目录加入 `DEEPAGENTS_CODE_EXTRA_SKILLS_DIRS` 或 `[skills].extra_allowed_dirs`；`extra_allowed_dirs` 支持 `~` 展开，环境变量优先于配置文件，改动在 `/reload` 后生效，且不新增发现目录 [@ref-deep-agents-skills-doc-allowlist]。
- **交互式信任**：当技能解析到受信任根之外时，用户会被询问一次是否永久信任该真实目录；决定写入 `~/.deepagents/.state/skill_trust.json`，以已批准目录的规范绝对路径为键，而非手改配置。事后若把发现用符号链接改指到新目标，包含范围检查会再次拒绝并要求重新授权 [@ref-deep-agents-skills-trust]。
- **实验性 / 插件状态**：Claude 技能目录为实验性来源；插件技能仅在插件被发现时参与 [@ref-deep-agents-skills-precedence]。
- 本次调查未在 `config_manifest.py`、`configuration` 文档与 `memory-and-skills` 文档中发现用于整体启用或禁用技能加载的功能开关。这些入口已逐一检查，源码未提供对应键，故 `skills.conditions` 记为 partial。

诊断与重载：

- `dcode skills list [--project]` 列出技能；`dcode skills info NAME` 显示描述、来源、遮蔽提示、附带文件与完整 `SKILL.md` 内容；`dcode skills delete` 删除技能 [@ref-deep-agents-skills-doc-list]。
- `dcode skills trust list|revoke|clear` 管理上文的持久信任目录；信任文件位于 profile 的 `.state/skill_trust.json` [@ref-deep-agents-skills-trustcli]。
- `/context-doctor` 在会话内审计注入上下文，技能索引会单列一行（例如 `Skills index (1 loaded)` 及其占用的估算 token 与最大条目），据此判断技能索引是否过大 [@ref-deep-agents-skills-doc-contextdoctor]。
- 发现结果在启动时生成；执行 `/reload` 会重新扫描目录以反映新增、修改或删除的技能 [@ref-deep-agents-skills-doc-discovery]。
- 加载失败（缺 frontmatter、YAML 错误、超大文件等）会以转义文本作为“不可信诊断”项，集中出现在 system prompt 的技能加载告警区 [@ref-deep-agents-skills-warnings]。
