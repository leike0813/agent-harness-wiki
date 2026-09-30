---
schema_version: 3
record_kind: production
edition_id: zed-zed-configuration-v1
harness_id: zed
topic: configuration
title: "Zed 的配置机制：来源分层、合并规则、渠道覆盖与信任边界"
sections:
  - section_id: config-sources
    surface_ids: [zed]
    source_refs: [ref-zed-config-config-dir, ref-zed-config-settings-file, ref-zed-config-local-settings, ref-zed-config-repo-doc-files, ref-zed-config-settings-file-enum, ref-zed-config-user-content]
  - section_id: config-overrides
    surface_ids: [zed]
    source_refs: [ref-zed-config-file-precedence, ref-zed-config-repo-doc-merge, ref-zed-config-merge-rules, ref-zed-config-merge-vec, ref-zed-config-channel-overrides]
  - section_id: config-runtime-trust
    surface_ids: [zed]
    source_refs: [ref-zed-config-channel-overrides, ref-zed-config-repo-doc-channels, ref-zed-config-user-content, ref-zed-config-repo-doc-files, ref-zed-config-repo-doc-trust, ref-zed-config-session-trust, ref-zed-config-repo-doc-admin]
  - section_id: config-defaults-migration
    surface_ids: [zed]
    source_refs: [ref-zed-config-default-agent, ref-zed-config-default-disable-ai, ref-zed-config-default-session, ref-zed-config-doc-disable-ai, ref-zed-config-doc-theme, ref-zed-config-merge-rules, ref-zed-skills-migration, ref-zed-config-user-content]
  - section_id: config-diagnostics
    surface_ids: [zed]
    source_refs: [ref-zed-config-repo-doc-files, ref-zed-config-doc-agent-panel, ref-zed-config-settings-file-enum, ref-zed-config-watch, ref-zed-config-repo-doc-trust, ref-zed-config-file-precedence, ref-zed-config-merge-rules, ref-zed-config-config-dir]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [zed]
        section_id: config-sources
        status: answered
        source_refs: [ref-zed-config-config-dir, ref-zed-config-settings-file, ref-zed-config-local-settings, ref-zed-config-settings-file-enum]
  - question_id: config.overrides
    answers:
      - surface_ids: [zed]
        section_id: config-overrides
        status: answered
        source_refs: [ref-zed-config-file-precedence, ref-zed-config-merge-rules, ref-zed-config-merge-vec, ref-zed-config-channel-overrides]
  - question_id: config.runtime
    answers:
      - surface_ids: [zed]
        section_id: config-runtime-trust
        status: partial
        source_refs: [ref-zed-config-channel-overrides, ref-zed-config-user-content]
  - question_id: config.trust
    answers:
      - surface_ids: [zed]
        section_id: config-runtime-trust
        status: answered
        source_refs: [ref-zed-config-repo-doc-trust, ref-zed-config-session-trust, ref-zed-config-repo-doc-admin]
  - question_id: config.defaults
    answers:
      - surface_ids: [zed]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-zed-config-default-agent, ref-zed-config-default-disable-ai, ref-zed-config-default-session, ref-zed-config-doc-theme]
  - question_id: config.migration
    answers:
      - surface_ids: [zed]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-zed-skills-migration, ref-zed-config-user-content]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [zed]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-zed-config-watch, ref-zed-config-settings-file-enum, ref-zed-config-repo-doc-files]
---

本章固定来源：官方仓库提交 `5d80b4e784636899e209cae89626c3be4487e14f` 的 `crates/paths/src/paths.rs`、`crates/settings/src/settings_store.rs`、`crates/settings_content/src/merge_from.rs`、`crates/settings_content/src/settings_content.rs`、`crates/settings_content/src/project.rs`、`assets/settings/default.json`，以及官方文档站的 `docs/reference/all-settings.md` 快照和仓库内的 `docs/src/configuring-zed.md`、`docs/src/worktree-trust.md`、`docs/src/business/admin-controls.md`。文档快照不含适用软件版本号，本章按来源级知识阅读。

## 配置来源与路径 {#config-sources}

Zed 的配置目录由 `paths::config_dir()` 决定：Windows 是 `%APPDATA%` 下的 Zed 目录；Linux/FreeBSD 取 `XDG_CONFIG_HOME`，在 Flatpak 里改用 `FLATPAK_XDG_CONFIG_HOME`；macOS 回落到 home 下的 `.config/zed`。启动时若自定义了数据目录，配置目录变成该目录下的 `config`。[@ref-zed-config-config-dir]

在这个目录下：

| 文件 | 作用 | 来源 |
| :-- | :-- | :-- |
| `settings.json` | 用户设置 | `paths::settings_file()` [@ref-zed-config-settings-file] |
| `global_settings.json` | 全局设置（与用户设置分开的层） | `paths::global_settings_file()` [@ref-zed-config-settings-file] |
| `AGENTS.md`、`tasks.json`、`keymap.json` | 个人指令 / 任务 / 键位 | 同一目录下的兄弟文件 [@ref-zed-config-settings-file] |

项目级设置写在 worktree 根的 `.zed/settings.json`，相对路径常量为 `.zed/settings.json`；文档说明同一目录树里还可以有更下一级的设置文件以实现更细粒度控制。[@ref-zed-config-local-settings][@ref-zed-config-repo-doc-files]

设置存储内部把「文件」建模成 `SettingsFile` 枚举：`Default`、`Global`、`User`、`Server`、`Project((WorktreeId, 路径))`；项目设置同时服务本地与 SSH 项目。[@ref-zed-config-settings-file-enum] 这四类之外还有一个来源：用户设置内容里带 `release_channel_overrides`、`platform_overrides` 与 `profiles` 三个附加结构，因此同一份用户设置文件还能按发行渠道、平台与命名 profile 拆出不同取值。[@ref-zed-config-user-content]

**限制**：文档明确指出并非所有键都能写在项目层——影响全局的键（例如 `theme`、`vim_mode`）只对用户设置生效，项目设置限于编辑器行为与语言工具类选项（`tab_size`、`formatter`、`format_on_save` 等）。[@ref-zed-config-repo-doc-files]

## 优先级与合并规则 {#config-overrides}

`SettingsFile` 实现了 `Ord`，注释写明顺序即**优先级顺序**：`Default` 最低，其后 `Global`、`User`、`Server`，`Project` 最高；两个项目设置之间先按 worktree id、再按相对路径的**逆序**比较。[@ref-zed-config-file-precedence] 逆序意味着同一 worktree 内更深的 `.zed/settings.json` 覆盖更浅的；文档用「默认 → 用户 → 项目」三层描述同一件事，并补充「后一层覆盖前一层」。[@ref-zed-config-file-precedence][@ref-zed-config-repo-doc-merge]

合并语义由 `MergeFrom` trait 定义：[@ref-zed-config-merge-rules]

| 类型 | 规则 |
| :-- | :-- |
| 结构体与映射（HashMap/BTreeMap/IndexMap） | 按键深合并：已有键递归合并，新键插入 [@ref-zed-config-merge-rules] |
| `Option` | 值为 `None` 时忽略，`Some` 时递归合并 [@ref-zed-config-merge-rules] |
| `Vec` 与其它类型 | **整体覆盖**，不做元素级合并 [@ref-zed-config-merge-vec] |
| `HashSet`/`BTreeSet` | 取并集（逐项插入） [@ref-zed-config-merge-vec] |
| 标量（数字、布尔、字符串、路径） | 直接覆盖 [@ref-zed-config-merge-rules] |

由此可得两条实践结论：对象类设置（例如 `terminal`）在后一层只写部分字段时其余字段保留；数组类设置（例如 `available_models`、`always_allow`）的高层取值会**替换**低层，而不是追加。[@ref-zed-config-merge-rules][@ref-zed-config-merge-vec]

**没有删除标记**：合并实现里 `Option` 的 `None` 表示「这一层没给值」，没有把它解释成「清除低层的值」的分支；因此把某个键从高层删掉不会恢复默认值，只会让低层的值继续生效。[@ref-zed-config-merge-rules] 例外存在于个别键自己的类型里：`ExtendingVec`、`SaturatingBool` 之类的特化类型可以自定义合并行为，哪些键使用这些类型要按各键的定义查。[@ref-zed-config-merge-rules]

**渠道与平台覆盖**：用户设置内容由 `settings_overrides!` 宏生成 `dev`、`nightly`、`preview`、`stable` 四组覆盖与 `macos`、`linux`、`windows` 三组覆盖，所以同一份文件可以同时给不同渠道与平台写不同值。[@ref-zed-config-channel-overrides]

## 运行时覆盖与信任边界 {#config-runtime-trust}

**运行时介入点**：

- 发行渠道键：在用户设置顶层写 `nightly` / `preview`（以及 `dev`、`stable`）对象，当前运行渠道对应的对象会覆盖同一文件里的同名顶层键；文档给出的例子是同一份设置里 `theme` 与 `vim_mode` 在 Stable/Preview/Nightly 下取不同值。[@ref-zed-config-channel-overrides][@ref-zed-config-repo-doc-channels]
- 平台键：`macos` / `linux` / `windows` 三组覆盖，用于按平台改键值。[@ref-zed-config-channel-overrides]
- 命名 profile：用户设置里的 `profiles` 映射可保存多套设置，存储层提供了「观察当前激活 profile 名」的接口，说明 profile 是运行期可切换的一层。[@ref-zed-config-user-content]
- 环境变量：Zed 的进程环境与项目环境决定任务、终端与语言服务器如何被启动，但它不是设置文件的一层；设置的值仍然是文件里写的那个。[@ref-zed-config-repo-doc-files]

**信任**：worktree 默认处于 Restricted Mode，此时项目设置（`.zed/settings.json`）**不会被解析和应用**，语言服务器与 MCP server 也不会被安装或启动；全局安装的工具（全局 MCP server、全局语言服务器）不受影响。授予信任后设置才生效，信任决定会跨重启保留，可用 `workspace::ClearTrustedWorktrees` 清空。用户也可以（不推荐地）设置 `session.trust_all_worktrees: true` 信任所有 worktree，这种自动信任不跨重启保留。[@ref-zed-config-repo-doc-trust] 对应的设置字段在项目设置内容里，默认 `false`。[@ref-zed-config-session-trust]

**组织策略**：Zed Business 的管理员在控制台里配置的开关（协作、Zed 托管模型、编辑预测、Agent 线程反馈等）多数在服务端生效；文档明确这些控制**不覆盖** BYOK、网关、本地/自托管模型、External Agents、Terminal Threads 与第三方扩展，因为它们的流量不经过 Zed 服务器。[@ref-zed-config-repo-doc-admin]

## 默认值与迁移 {#config-defaults-migration}

**默认值来源**：`assets/settings/default.json` 是随二进制发布的默认设置文件，可以用 `zed::OpenDefaultSettings` 打开只读查看。几个具体默认值：`disable_ai` 为 `false`；`agent.max_idle_retained_threads` 为 `5`；`session` 段里 `trust_all_worktrees` 为 `false`；顶层 `theme` 是一个对象（含 `mode`/`light`/`dark`）。[@ref-zed-config-default-agent][@ref-zed-config-default-disable-ai][@ref-zed-config-default-session]

文档站的 All Settings 参考页逐条列出设置的说明、键名与默认值（例如 `disable_ai` 的默认值是 `false`、`theme` 的默认值是 `One Dark`），是核对「当前默认是什么」的官方入口。[@ref-zed-config-doc-disable-ai][@ref-zed-config-doc-theme]

在这个默认文件之上，用户设置、全局设置、服务器设置与项目设置依次合并，合并规则见上一节。[@ref-zed-config-merge-rules]

**迁移**：

- Rules → Skills/Instructions 的一次性迁移由全局 KVP 标记短路，只跑一次；非 Default Rules 变成全局 skill（带 `disable-model-invocation: true`），Default Rules 追加到全局 `AGENTS.md`，迁移不删除原数据。[@ref-zed-skills-migration]
- 用户设置内容里保留渠道与平台覆盖结构，本身就是对旧式「按渠道复制整份设置」做法的替代；迁移与弃用键在设置内容类型上以注释标注（例如 agent 段里若干 `Deprecated` 字段），新键会替换旧键的语义而不是并存。[@ref-zed-config-user-content]

## 诊断：查看实际生效来源与排查「写了没生效」 {#config-diagnostics}

- **看默认值**：`zed::OpenDefaultSettings` 打开只读默认设置文件。[@ref-zed-config-repo-doc-files]
- **看当前值**：设置编辑器（`zed::OpenSettings`）可搜索并修改设置，改动会写回用户设置文件。[@ref-zed-config-repo-doc-files] 仓库内的 All Settings 参考页与设置编辑器同源，可按键名查默认值与说明。[@ref-zed-config-doc-agent-panel]
- **看来源分层**：存储层保存每个 `SettingsFile` 的解析结果与错误（`file_errors` 是一个按设置文件索引解析结果的映射），并提供按字段查询「某个值来自哪个文件」的接口，因此「同一键在多层都写了」是可以被回答的问题。[@ref-zed-config-settings-file-enum]
- **看是否重载**：`SettingsStore::watch_settings_files` 同时监听用户设置文件与全局设置文件，变更通过回调上报给调用方；说明改设置文件后不需要重启，但监听只覆盖这两个文件，项目设置由各自的 worktree 机制处理。[@ref-zed-config-watch]

**排查顺序建议**（依据上面的规则）：

1. 键写在项目层了吗？若是全局性键（`theme`、`vim_mode` 之类）则项目层不生效。[@ref-zed-config-repo-doc-files]
2. worktree 信任了吗？未信任时项目设置根本不解析。[@ref-zed-config-repo-doc-trust]
3. 被更高层覆盖了吗？项目层 > 服务器 > 用户 > 全局 > 默认。[@ref-zed-config-file-precedence]
4. 值来自环境或别处吗？数组类键的高层会整体替换低层，对象类键只覆盖同名子键。[@ref-zed-config-merge-rules]

**缺口**：固定来源没有给出「设置文件解析失败时」的用户可见报错形态（只有存储层的错误映射），也没有列出 `--user-data-dir` 之类命令行入口的完整清单；这些点留作未验证。[@ref-zed-config-settings-file-enum][@ref-zed-config-config-dir]
