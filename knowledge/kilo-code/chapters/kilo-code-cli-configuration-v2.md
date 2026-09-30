---
schema_version: 3
record_kind: production
edition_id: kilo-code-cli-configuration-v2
harness_id: kilo-code
topic: configuration
title: "Kilo Code CLI — 配置来源、合并优先级与信任边界"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-kilo-code-cli-configref, ref-kilo-code-cli-config-location, ref-kilo-code-config-src-global, ref-kilo-code-config-src-paths, ref-kilo-code-config-src-files, ref-kilo-code-config-src-globalpaths, ref-kilo-code-runtime-entries, ref-kilo-code-runtime-persistence, ref-kilo-code-cli-package, ref-kilo-code-config-src-detect]
  - section_id: config-precedence
    surface_ids: [cli]
    source_refs: [ref-kilo-code-runtime-precedence, ref-kilo-code-config-src-project, ref-kilo-code-config-src-content, ref-kilo-code-config-src-managed, ref-kilo-code-cli-config-location, ref-kilo-code-config-src-merge, ref-kilo-code-config-src-mergeproject]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-kilo-code-cli-env-overrides, ref-kilo-code-config-src-flags, ref-kilo-code-config-src-globalpaths]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-kilo-code-cli-env-v2, ref-kilo-code-config-src-project, ref-kilo-code-config-src-managed, ref-kilo-code-config-src-flags, ref-kilo-code-runtime-auth, ref-kilo-code-config-src-variable, ref-kilo-code-config-src-guard]
  - section_id: config-defaults-migration
    surface_ids: [cli]
    source_refs: [ref-kilo-code-runtime-precedence, ref-kilo-code-cli-key-options, ref-kilo-code-cli-configuration, ref-kilo-code-cli-permissions, ref-kilo-code-cli-permission-actions, ref-kilo-code-cli-granular, ref-kilo-code-config-schema-paths, ref-kilo-code-config-schema-truth, ref-kilo-code-config-schema-overlay, ref-kilo-code-config-src-files, ref-kilo-code-config-src-global, ref-kilo-code-config-src-formatter]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kilo-code-cli-config-cmd, ref-kilo-code-cli-debug-config, ref-kilo-code-cli-help-cmd, ref-kilo-code-cli-slash, ref-kilo-code-cli-global-options, ref-kilo-code-config-src-cli-cmd]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-kilo-code-cli-configref, ref-kilo-code-cli-config-location, ref-kilo-code-config-src-global, ref-kilo-code-config-src-globalpaths, ref-kilo-code-config-src-paths]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-precedence
        status: answered
        source_refs: [ref-kilo-code-runtime-precedence, ref-kilo-code-config-src-project, ref-kilo-code-config-src-content, ref-kilo-code-config-src-managed]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-kilo-code-cli-env-overrides, ref-kilo-code-config-src-flags]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: conflict
        source_refs: [ref-kilo-code-cli-env-v2, ref-kilo-code-config-src-project, ref-kilo-code-runtime-auth, ref-kilo-code-config-src-variable]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-kilo-code-cli-key-options, ref-kilo-code-cli-permissions, ref-kilo-code-config-schema-paths, ref-kilo-code-config-schema-truth]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-migration
        status: answered
        source_refs: [ref-kilo-code-runtime-precedence, ref-kilo-code-config-src-files, ref-kilo-code-config-src-global]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-kilo-code-cli-config-cmd, ref-kilo-code-cli-debug-config, ref-kilo-code-cli-slash, ref-kilo-code-cli-global-options]
---

Kilo Code CLI 的配置模型继承自 OpenCode：配置来自若干 JSON/JSONC 文件，按固定顺序逐层深度合并，后面的来源覆盖前面的值。本章只描述 CLI（`@kilocode/cli`，二进制 `kilo` / `kilocode`，运行时代码在 `packages/opencode/`）的行为 [@ref-kilo-code-cli-package]；VS Code 扩展与 JetBrains 插件另有入口，不在此列。三个与配置并列但独立的入口：交互式 `/connect` 负责 provider 凭据，`kilo auth` 管理凭据文件，`tui.jsonc` 只控制终端界面 [@ref-kilo-code-cli-configref]。

## 配置来源与文件路径 {#config-sources}

本节描述的是 npm 包 `@kilocode/cli`（二进制 `kilo` / `kilocode`）的本地配置行为 [@ref-kilo-code-cli-package]；配置由“全局文件 + 项目文件”两层组成，并可由交互式 `/connect`、`kilo auth` 与独立的 `tui.jsonc` 补充 [@ref-kilo-code-cli-configref]。

全局（用户）配置目录是 `${Global.Path.config}`，由 XDG 配置目录拼接应用名 `kilo` 得到；`packages/core/src/global.ts` 里 `app = "kilo"`、`config = path.join(clean(xdgConfig), app)`，也就是通常的 `~/.config/kilo`（`$XDG_CONFIG_HOME` 可改写）[@ref-kilo-code-config-src-globalpaths]。官方 CLI 文档把该目录写成 `~/.config/kilo/`，并提示 Windows 的配置目录可能不同 [@ref-kilo-code-cli-config-location]。

全局目录中按以下顺序逐个读取并合并，后者覆盖前者 [@ref-kilo-code-config-src-global]：

1. `config.json`
2. `kilo.json`
3. `kilo.jsonc`
4. `opencode.json`
5. `opencode.jsonc`

同目录下如果存在扩展名缺失的历史文件 `${Global.Path.config}/config`（TOML），CLI 会读取它，把 `provider` + `model` 合成为 `model` 字段，写出 `config.json` 并删除原文件 [@ref-kilo-code-config-src-global]。配置目录扫描与 managed 目录读取都使用常量 `ALL_CONFIG_FILES = ["kilo.jsonc", "kilo.json", "opencode.jsonc", "opencode.json"]`（注意其内部顺序与全局逐文件加载顺序不同）[@ref-kilo-code-config-src-files]。

项目层配置分两类 [@ref-kilo-code-cli-config-location]：

| 作用域 | 路径 |
|---|---|
| 全局 | `~/.config/kilo/kilo.json[c]`，兼容旧名 `opencode.json[c]` |
| 项目 | `./kilo.json[c]`、旧名 `./opencode.json[c]`，或 `./.kilo/` 内的配置（`./.kilocode/` 也会被读取） |

项目文件的发现由 `ConfigPaths.files` 完成：从实例目录向上查找，目标为 `{name}.jsonc` 与 `{name}.json`，上界是 worktree 根（非 git 项目为目录本身），结果反转后使用，即越靠近项目根的越先加载 [@ref-kilo-code-config-src-paths]。代码里对 `kilo` 与 `opencode` 两个基名各跑一遍该查找 [@ref-kilo-code-config-src-project]。配置目录（`.kilo` / `.kilocode`）同样从实例目录向上发现，与全局配置目录一起去重后逐个加载其下的全部 `ALL_CONFIG_FILES` [@ref-kilo-code-config-src-paths]。

CLI 不再回退读取 `.opencode` 目录（无论 `~/.config/opencode` 还是项目 `./.opencode/`）；迁移办法是把全局配置移入 `~/.config/kilo/`、项目配置移入 `./.kilo/` [@ref-kilo-code-cli-config-location]。`packages/opencode/src/kilocode/config/config.ts` 里 `detectOpencodeConfig` 会扫描这些残留位置（全局与项目，最高优先级在前），并由 `opencodeConfigNotification` 生成一次迁移提示 [@ref-kilo-code-config-src-detect]。

配置是按目录实例加载的：`kilo`、`kilo run`、`kilo serve` 等入口都归到同一套 CLI runtime，每个目录上下文（工作区根或 worktree）各自持有运行时状态并各自加载配置 [@ref-kilo-code-runtime-entries]。配置与运行时数据是分开存储的：结构化数据默认写入 `${Global.Path.data}/kilo.db`（可用 `KILO_DB` 覆盖），而配置文件仍由上述文件路径所有者持有 [@ref-kilo-code-runtime-persistence]。

## 合并顺序与覆盖规则 {#config-precedence}

官方架构文档给出实例配置加载的有序来源表，按列出的顺序依次合并，**后面的来源覆盖前面的值** [@ref-kilo-code-runtime-precedence]：

| 顺序 | 来源 |
|---|---|
| 1 | Legacy Kilo 迁移（modes、workflows、rules、MCP、ignore） |
| 2 | 组织（organization）modes |
| 3 | auth 记录中的 `.well-known/opencode` 远程配置 |
| 4 | 全局配置文件 |
| 5 | 显式的 `KILO_CONFIG` 文件 |
| 6 | 项目 `kilo.json[c]`、`opencode.json[c]` 及发现的配置目录 |
| 7 | `KILO_CONFIG_DIR` 目录 |
| 8 | `KILO_CONFIG_CONTENT` |
| 9 | 当前 Kilo Cloud 组织配置 |
| 10 | Managed 配置目录 |
| 11 | macOS managed preferences |
| 12 | 运行时 flag 派生的 permission、tool、compaction、plugin 行为 |

全局配置文件从 `${Global.Path.config}` 加载 [@ref-kilo-code-runtime-precedence]。项目层与全局层的关系在用户文档里同样被概括为“项目级配置优先于全局设置” [@ref-kilo-code-cli-config-location]。

各来源的加载方式：项目 `kilo`/`opencode` 文件由 `ConfigPaths.files` 发现后逐个 `merge`，合并时按“项目配置不可信”处理（见下一节）[@ref-kilo-code-config-src-project]；`KILO_CONFIG_CONTENT` 作为一份内联 JSON 以 `local` 作用域但受信任的方式合并 [@ref-kilo-code-config-src-content]；managed 目录存在时，其下的每个 `ALL_CONFIG_FILES` 作为全局作用域、受信任来源合并，macOS 的 MDM（`.mobileconfig`）配置最后合并、覆盖前面所有内容 [@ref-kilo-code-config-src-managed]。`KILO_CONFIG_DIR` 指定的目录在 `packages/opencode/src/config/config.ts` 中作为全局作用域、受信任来源加载。

合并算法（`packages/opencode/src/config/config.ts` 的 `mergeConfig` / `mergeConfigConcatArrays` [@ref-kilo-code-config-src-merge]，与 `packages/opencode/src/kilocode/config/config.ts` 的 `merge` / `mergeProject` [@ref-kilo-code-config-src-mergeproject]）：

- 基础是深度合并 `mergeDeep`；`instructions` 数组在两份来源都有值时做去重拼接，而不是覆盖。
- `permission` 在合并前做标量归一：某工具此前是字符串（如 `"bash": "allow"`），新层用对象覆盖时，旧值被改写成 `{"*": old}` 再合并。
- `mcp` 按 server 名逐项合并；`null` 表示删除该 server。远端 server 的 URL 发生变化时不继承原有的 `headers` / `oauth`，必须在新层重新给出。
- 项目层走 `mergeProject`，不做受信任路径的 `null` 哨兵清理；配置写入路径（如设置界面）用 `null` 作为删除哨兵，并通过 `propagateUnset` 从所有仍含该键的层中删除它，避免“高层删了、低层副本又冒出来”。

因此“文件已写但不生效”常见原因是：写到了优先级更低的层（例如项目文件写完了，但 `KILO_CONFIG_CONTENT` 或 managed 配置仍覆盖它），或同一 key 在更高优先级的全局文件里仍有值。

## 运行时输入：环境变量与命令行 {#config-runtime}

环境变量可以在文件配置之外直接覆盖取值 [@ref-kilo-code-cli-env-overrides]：

- `KILO_PROVIDER`：覆盖当前 provider ID。
- 对 `kilocode` provider：`KILOCODE_{FIELD_NAME}`，例如 `KILOCODE_MODEL` 映射到 `kilocodeModel`。
- 对其他 provider：`KILO_{FIELD_NAME}`，例如 `KILO_API_KEY` 映射到 `apiKey`。

进程与配置相关的 flag 由 `packages/core/src/flag/flag.ts` 定义 [@ref-kilo-code-config-src-flags]：

| 变量 | 作用 |
|---|---|
| `KILO_CONFIG` | 指定一份额外/显式配置文件路径，作为受信任来源加载 |
| `KILO_CONFIG_CONTENT` | 直接以字符串提供一份配置 JSON，受信任、`local` 作用域 |
| `KILO_CONFIG_DIR` | 增加一个配置目录，按全局作用域、受信任来源加载 |
| `KILO_DISABLE_PROJECT_CONFIG` | 真值（`true` / `1`）时跳过项目文件与项目配置目录的发现 |
| `KILO_TEST_HOME` | 覆盖 `Global.Path.home`（`process.env.KILO_TEST_HOME ?? os.homedir()`），影响 home 相关路径解析 [@ref-kilo-code-config-src-globalpaths] |
| `KILO_ORG_ID` / `KILO_API_KEY` | 参与组织与 provider 凭据解析 |

CLI 的全局命令行开关与配置本身关系不大，只有日志相关的会改变诊断可见性：`--help`/`-h`、`--version`/`-v`、`--print-logs`、`--log-level`（DEBUG/INFO/WARN/ERROR）[@ref-kilo-code-cli-global-options]。没有 `--config` 之类的 CLI 标志把配置文件路径作为参数传入；等价的入口是上面的 `KILO_CONFIG` 环境变量。文档未描述 profile 概念（`config.runtime` 的 profile 部分记为不适用，固定来源中没有对应入口）。

## 信任边界：项目配置能做什么 {#config-trust}

`{env:VARIABLE_NAME}` 与 `{file:...}` 变量引用只在受信任配置中解析：全局配置（`~/.config/kilo`）、经 `KILO_CONFIG` / `KILO_CONFIG_CONTENT` 传入的配置，以及组织/MDM managed 配置。仓库里提交的项目级 `kilo.json` / `opencode.json` 不能使用 `{env:VAR}`，否则该引用被忽略并记录一条 warning，目的是防止恶意仓库把密钥外传到攻击者控制的 `baseURL` [@ref-kilo-code-cli-env-v2]。`{file:...}` 在项目配置中仍可用，但只能引用项目根之内的文件（绝对路径、`../` 上跳、symlink 逃逸都被拒绝）[@ref-kilo-code-cli-env-v2]。

上面的“忽略引用”是文档表述；源码给出的是更严格的实现，两者对项目文件其余字段的命运描述不一致：

- 文档：`{env:VAR}` 引用被忽略，并记录 warning [@ref-kilo-code-cli-env-v2]。
- 源码：`packages/opencode/src/config/variable.ts` 的 `substitute()` 在 `trusted` 为假且文本含未被注释的 `{env:...}` 时抛出 `InvalidError`，消息为 `environment references are not allowed in project config: "{env:...}"` [@ref-kilo-code-config-src-variable]；`packages/opencode/src/config/config.ts` 在加载项目文件时用 `catchDefect` 捕获它并记为 warning，同时返回空对象——也就是**整份项目配置文件被丢弃**，而不是只让该引用失效 [@ref-kilo-code-config-src-project]。

因此本问题记为 `conflict`：文档说“引用被忽略”，实现是“文件加载失败并被跳过”。无论按哪种解释，结论一致——不要在提交进仓库的项目配置里写 `{env:...}`。

其他信任相关规则：

- 项目配置按“不可信”合并（`mergeProject`），MCP 条目中带变量引用的 header 会在代换前被丢弃 [@ref-kilo-code-config-src-project]。
- 配置目录的信任取决于作用域：只有全局作用域的配置目录才允许 `{env:}`；项目内发现的 `.kilo` / `.kilocode` 目录按不可信处理，`{file:}` 读取被限制在项目根 [@ref-kilo-code-config-src-paths]。
- managed 配置目录与 macOS MDM preferences 是受信任来源，可解析 `{env:}` / `{file:}` [@ref-kilo-code-config-src-managed]。
- 与信任相关的进程开关集中在 `packages/core/src/flag/flag.ts`：`KILO_CONFIG`（显式文件，受信任）、`KILO_CONFIG_CONTENT`（内联 JSON，受信任、local 作用域）、`KILO_CONFIG_DIR`（额外配置目录，按全局作用域受信任）、`KILO_DISABLE_PROJECT_CONFIG`（真值时跳过项目配置发现）[@ref-kilo-code-config-src-flags]。
- 即使受信任，部分环境变量也禁止被引用：`packages/opencode/src/kilocode/config/variable.ts` 的 `ConfigVariableGuard` 维护 `secret` 集合（`KILO_SERVER_PASSWORD`、`KILO_SERVER_USERNAME`、`KILO_BROWSER_BROKER_URL`、`KILO_BROWSER_BROKER_TOKEN`），`env(name)` 对集合内名称返回 false，代换随即抛出 `blocked environment reference` [@ref-kilo-code-config-src-guard]。
- 本地 `kilo serve` 的 Basic Auth 默认关闭，仅在 `KILO_SERVER_PASSWORD` 非空时启用；用户名为 `kilo`，可用 `KILO_SERVER_USERNAME` 覆盖——这也是这些变量被禁止做 `{env:}` 代换的原因 [@ref-kilo-code-runtime-auth]。

## 默认值、权限规则与迁移 {#config-defaults-migration}

常见顶层键（文档列举）[@ref-kilo-code-cli-key-options]：

| 键 | 用途 |
|---|---|
| `model` | 默认模型，`provider_id/model_id` 形式 |
| `provider` | provider 级设置（API key、base URL、自定义模型） |
| `mcp` | MCP server 配置 |
| `permission` | 工具权限（`allow` / `ask`） |
| `instructions` | 指令文件路径列表，例如 `["CONTRIBUTING.md", ".cursor/rules/*.md"]` |
| `formatter` | 代码格式化，`true`/`false` 或按工具的条目 |
| `lsp` | 语言服务器，`true`/`false` 或按 server 的条目 |
| `disabled_providers` / `enabled_providers` | 控制 provider 可用性 |
| `privacy_mode` | TUI 中模糊个人信息（默认关闭） |

`formatter` / `lsp` 默认由内置集合提供：设为 `true` 用内置默认，`false` 完全关闭；也可写成对象。自定义 LSP server 条目必须带 `extensions` 数组，除非它是用来关闭内置 server 的 [@ref-kilo-code-config-src-formatter]。

权限规则取值 [@ref-kilo-code-cli-permission-actions]：`"allow"` 直接执行、`"ask"` 请求批准、`"deny"` 阻断。可以一次性设成字符串，也可以用对象按工具细粒度配置 [@ref-kilo-code-cli-configuration]：

```json
{
  "$schema": "https://app.kilo.ai/config.json",
  "permission": {
    "*": "ask",
    "bash": "allow",
    "edit": "deny"
  }
}
```

（示例依据 [@ref-kilo-code-cli-configuration]。）对象形式可按工具输入做模式匹配，**最后一条匹配的规则生效**，常见写法是把 `"*"` 放在最前面 [@ref-kilo-code-cli-granular]。通配符为 `*`（零或多字符）与 `?`（恰好一字符）；模式开头可用 `~` 或 `$HOME` 展开为主目录。`external_directory` 用来允许访问工作目录之外的路径，其允许项继承当前工作区的默认权限（例如 `read` 默认 `allow`），需要限制时可再补一条显式 `deny` [@ref-kilo-code-cli-permissions]。

`$schema` 与运行时无关。`"$schema": "https://app.kilo.ai/config.json"` 只给编辑器提供校验和补全；云端 schema 会拉取上游 `https://opencode.ai/config.json` 再叠加 Kilo 的扩展桶（`top`、`agents`、`experimental`）[@ref-kilo-code-config-schema-overlay]，它**不会**加载、应用或覆盖实际运行时配置 [@ref-kilo-code-config-schema-paths]。运行时配置的规范来源是 `packages/opencode/src/config/config.ts` 里的 Effect Schema `Config.Info`（CLI 由它派生 `.zod` 兼容面），schema 与运行时是两条独立路径 [@ref-kilo-code-config-schema-truth]。也就是说：编辑器报 `unknown property` 不影响 CLI 是否接受该键，反之亦然。

迁移与兼容规则：

- 数据模型中的 Legacy 迁移作为最低优先级来源加载，把旧 Kilo modes 转成 `agent`、workflows 转成 `command`、rules 转成 `instructions`、旧 MCP 配置与 `.kilocodeignore` 转成 `mcp` / `permission` [@ref-kilo-code-runtime-precedence]。
- 旧扩展名文件名 `opencode.json[c]` 在所有作用域仍被读取，因此“kilo 与 opencode 两套文件名”可共存并按顺序合并 [@ref-kilo-code-config-src-files]。
- `~/.config/kilo/config`（TOML）在首次加载时被迁移为 `config.json` 并删除 [@ref-kilo-code-config-src-global]。
- 已退休的键会被归一：例如 `experimental.semantic_indexing` 被忽略并提示改用 `indexing.enabled`；`theme` / `keybinds` / `tui` 出现在主配置里会告警，要求移到 `tui.json`。
- 全局配置里的 `indexing.enabled` 会被剥离，保证“是否启用索引”由项目本地决定。

## 诊断与重载 {#config-diagnostics}

三个直接入口：

- `kilo config check`（属于 `kilo config` 工具组）：检查配置中的 warning 与 error [@ref-kilo-code-cli-config-cmd]。实现上它取配置服务累积的 warning 列表：列表为空时 stdout 打印 `No config warnings.`，否则把每条 warning 的路径、消息与可选 detail 写到 stderr 并把退出码设为 1，可直接用于 CI 判定 [@ref-kilo-code-config-src-cli-cmd]。
- `kilo debug config`：把解析后的最终配置以 JSON 打印到 stdout，用来查看“实际生效”的结果而不是某个文件的内容 [@ref-kilo-code-cli-debug-config]。
- `kilo help [command]` / `--all` / `--format md|text`：查看命令的完整帮助 [@ref-kilo-code-cli-help-cmd]。

交互式会话中：

- `/reload` 从磁盘重新加载该项目的**每一个实例**（主 checkout 与兄弟 worktree 都包括），覆盖 config、skills、agents 与 commands；只要项目里还有会话在运行就拒绝重载，需要先等它结束或中止 [@ref-kilo-code-cli-slash]。
- 全局开关 `--print-logs` 把日志打到 stderr，`--log-level` 选择 DEBUG/INFO/WARN/ERROR，用于观察配置加载期间的告警 [@ref-kilo-code-cli-global-options]。

改动文件后的生效时机：编辑 `~/.config/kilo/` 或项目配置文件后，官方文档要求重启 CLI [@ref-kilo-code-cli-configref]；交互式会话内可用 `/reload` 替代重启（有运行中会话时不可用）[@ref-kilo-code-cli-slash]。若 `kilo config check` 无告警、`kilo debug config` 里仍是旧值，优先怀疑更高优先级的层（`KILO_CONFIG_CONTENT`、`KILO_CONFIG_DIR`、managed/MDM 配置）覆盖了刚改的文件，或改动落在被跳过的项目配置上（`KILO_DISABLE_PROJECT_CONFIG`）。配置加载产生的 excess-key 与退休键告警都会进入 `kilo config check` 的输出。
