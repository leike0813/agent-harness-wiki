---
schema_version: 3
record_kind: production
edition_id: aider-cli-configuration-v1
harness_id: aider
topic: configuration
title: "Aider CLI 的配置机制：来源、优先级、默认值与诊断"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-aider-config-overview, ref-aider-config-yaml, ref-aider-args-config-envfile, ref-aider-config-dotenv, ref-aider-config-sample-yaml, ref-aider-config-keys-include, ref-aider-config-yaml-lists, ref-aider-main-config-load, ref-aider-main-search-path]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-aider-main-config-load, ref-aider-args-parser, ref-aider-config-yaml, ref-aider-config-settings-locations, ref-aider-config-metadata, ref-aider-config-aliases-priority, ref-aider-config-extra-params]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-aider-args-message, ref-aider-scripting-cli, ref-aider-main-env-writes, ref-aider-cmd-model, ref-aider-main-yes-guard]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-aider-config-sample-yaml, ref-aider-args-watch-lint, ref-aider-config-editor, ref-aider-config-editor-env, ref-aider-models-resource-settings, ref-aider-models-settings-fields, ref-aider-config-dotenv]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-aider-config-sample-yaml, ref-aider-main-yes-guard]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-aider-main-config-load, ref-aider-main-verbose-dotenv, ref-aider-main-model-settings, ref-aider-main-verbose-model, ref-aider-cmd-settings, ref-aider-args-show-prompts, ref-aider-cmd-load]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-aider-config-overview, ref-aider-config-yaml, ref-aider-config-dotenv, ref-aider-config-sample-yaml, ref-aider-config-yaml-lists, ref-aider-main-config-load, ref-aider-args-config-envfile]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: partial
        source_refs: [ref-aider-main-config-load, ref-aider-args-parser, ref-aider-config-yaml, ref-aider-config-settings-locations, ref-aider-config-aliases-priority, ref-aider-config-extra-params]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-aider-args-message, ref-aider-scripting-cli, ref-aider-main-env-writes, ref-aider-cmd-model]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: partial
        source_refs: [ref-aider-config-sample-yaml, ref-aider-main-yes-guard]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-aider-config-sample-yaml, ref-aider-args-watch-lint, ref-aider-config-editor, ref-aider-config-editor-env, ref-aider-models-resource-settings]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-aider-main-env-writes, ref-aider-main-yes-guard]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-aider-main-config-load, ref-aider-main-verbose-dotenv, ref-aider-main-model-settings, ref-aider-main-verbose-model, ref-aider-cmd-settings, ref-aider-args-show-prompts]
---


## 配置来源与路径 {#config-sources}

固定来源是官方仓库提交 `5dc9490bb35f9729ef2c95d00a19ccd30c26339c` 的文档与实现。官方文档把配置归纳为四件等价的事：命令行开关、`.aider.conf.yml`、`AIDER_*` 环境变量、`.env` 文件。[@ref-aider-config-overview]

**YAML 配置文件**：`.aider.conf.yml` 会在三个位置被查找——用户主目录、git 仓库根、当前目录；都存在时按该顺序加载，后加载者优先。`--config {file}` 只加载指定的那一个文件，不再查找默认位置。[@ref-aider-config-yaml][@ref-aider-args-config-envfile]

**`.env` 文件**：查找位置是主目录、git 仓库根、当前目录，或 `--env-file {file}` 指定的文件；顺序同上、后加载者优先。[@ref-aider-config-dotenv] `--env-file` 的默认值由 `aider/args.py` 的 `default_env_file(git_root)` 给出（有 git 根时是仓库根下的 `.env`）。[@ref-aider-args-config-envfile]

**键的清单**：`.aider.conf.yml` 的样例由 `aider.args` 生成，头部写明它列出 "all the valid configuration entries"，并给出一个关键约束——**只有 OpenAI 与 Anthropic 的 API key 可以放在 YAML 配置里**，其它 provider 的密钥要放 `.env`。[@ref-aider-config-sample-yaml] 每个配置页末尾都会引用同一段 API key 提示。[@ref-aider-config-keys-include]

**列表语法**：YAML 列表可以写成短横线块，也可以写成逗号方括号形式 [@ref-aider-config-yaml-lists]：

```yaml
read:
  - CONVENTIONS.md
  - anotherfile.txt
```

等价的流式写法（同一文档小节给出的第二种形式）[@ref-aider-config-yaml-lists]：

```yaml
read: [CONVENTIONS.md, anotherfile.txt]
```

**实现路径**：`aider/main.py` 先按"当前目录 → git 根 → 主目录"收集默认配置文件并做存在性检查，再把列表**反转**后交给解析器（于是主目录优先级最低）；先 `parse_known_args` 拿到 `--env-file`，加载 `.env` 后再 `parse_args` 一次，让 `.env` 里定义的参数生效。[@ref-aider-main-config-load]

同一套搜索顺序也被模型相关的两个文件复用：主目录 → git 根 → 当前目录 → 命令行指定的文件。[@ref-aider-main-search-path]

## 作用域优先级与合并 {#config-overrides}

| 来源 | 位置/写法 | 相对优先级 |
| :-- | :-- | :-- |
| 命令行参数 | `--model`、`--read` 等 | 最高（最后一次 `parse_args` 显式传入）[@ref-aider-main-config-load] |
| 环境变量 | `AIDER_*` | 由 configargparse 的 `auto_env_var_prefix="AIDER_"` 在解析时映射为参数值 [@ref-aider-args-parser] |
| `.env` 文件 | 主目录 → git 根 → 当前目录 → `--env-file` | 以 `override=True` 写入进程环境，因此后加载者覆盖先加载者 [@ref-aider-main-config-load] |
| `.aider.conf.yml` | 主目录 → git 根 → 当前目录 | 最低；后加载者覆盖先加载者 [@ref-aider-config-yaml] |
| `--config {file}` | 指定文件 | 命中后不再使用默认列表 [@ref-aider-config-yaml] |

模型设置文件与元数据文件共享同一套"后加载者优先"的规则，显式 `--model-settings-file` / `--model-metadata-file` 排在搜索列表末尾。[@ref-aider-config-settings-locations][@ref-aider-config-metadata]

模型名的别名有独立的、明确写出的优先级：命令行别名 > 配置文件别名 > 内置别名。[@ref-aider-config-aliases-priority]

有一个全局覆盖例外：`aider/extra_params` 这个特殊模型条目的 `extra_params` 会与模型自身设置合并，直接冲突时 `aider/extra_params` 生效。[@ref-aider-config-extra-params]

**缺口**：官方文档没有用一句话写明"环境变量是否一定压过 YAML 配置"。上表的顺序来自 `aider/args.py` 里 configargparse 的前缀配置与 `aider/main.py` 的加载/二次解析顺序，若要逐一验证，需要运行并观察（`--verbose` 只打印配置文件搜索顺序与 `.env` 加载，不打印逐键来源）。

## 运行期介入与弃用 {#config-runtime}

- **单次指令模式**：`--message`/`-m` 与 `--message-file`/`-f` 发送一条指令、处理回复后退出（禁用聊天模式），是脚本化调用的入口。[@ref-aider-args-message][@ref-aider-scripting-cli]
- **启动时写环境变量**：`--set-env VAR=value` 与 `--api-key provider={key}` 在模型初始化之前写入进程环境，因此能影响 provider 选择与鉴权。[@ref-aider-main-env-writes]
- **会话内改配置**：`/model`、`/weak-model`、`/editor-model`、`/chat-mode`、`/reasoning-effort`、`/think-tokens` 等命令直接改当前 coder 的字段，作用范围是当前会话。[@ref-aider-cmd-model]
- **弃用与兼容**：`--openai-api-type`、`--openai-api-version`、`--openai-api-deployment-id`、`--openai-organization-id` 已弃用，启动时给出警告并改写为对应的环境变量；配置键的写法是"把旧开关换成 `--set-env NAME=value`"。[@ref-aider-main-env-writes]
- **历史键守卫**：早期配置里若出现以 `yes:` 开头的行，启动时会拒绝并提示改成 `yes-always:`。[@ref-aider-main-yes-guard]

**缺口**：固定来源没有给出 YAML 配置键的迁移表、旧格式导入规则或 `schema_version` 之类的兼容承诺；除上述弃用开关与 `yes:` 守卫外，"哪些键曾改名/移除"无法从这里确认。

## 默认值与平台差异 {#config-defaults}

样例配置列出了每个键的默认值，例如：`pretty: true`、`stream: true`、`auto-commits: true`、`auto-lint: true`、`auto-test: false`、`gitignore: true`、`check-update: true`、`map-refresh: auto`、`dark-mode: false`、`light-mode: false`、`analytics` 未设置时随机决定。[@ref-aider-config-sample-yaml]

布尔开关在命令行上成对出现（`--x` / `--no-x`），实现上多数用 `BooleanOptionalAction`，例如 `--auto-lint` 默认 True、可用 `--no-auto-lint` 关闭。[@ref-aider-args-watch-lint]

平台差异最清楚的一处是外部编辑器：未配置时 Windows 用 `notepad`、macOS 用 `vim`、其它 Unix 用 `vi`；解析顺序是 `AIDER_EDITOR`、`VISUAL`、`EDITOR`，也可以用 `--editor` 或配置键 `editor:` 指定。[@ref-aider-config-editor][@ref-aider-config-editor-env]

模型层面的默认值不在配置文件里，而在包内资源：`aider/resources/model-settings.yml` 在导入时被读成模型设置表，字段默认值即 `ModelSettings` 的默认值；元数据（窗口与价格）另由包内 `model-metadata.json` 与 litellm 提供。[@ref-aider-models-resource-settings][@ref-aider-models-settings-fields]

凭据的"默认来源"受一条硬约束限制：YAML 配置只接受 OpenAI 与 Anthropic 的密钥，其它 provider 一律走 `.env` 或环境变量。[@ref-aider-config-sample-yaml][@ref-aider-config-dotenv]

## 信任、权限与作用范围 {#config-trust}

固定来源里没有"项目信任"提示、没有组织策略层、没有权限或沙箱开关。能限制配置或改动实际效果的机制都是普通选项 [@ref-aider-config-sample-yaml]：

| 机制 | 作用 |
| :-- | :-- |
| `yes-always` / `--yes` | 对所有确认一律回答是；旧写法 `yes:` 会被启动守卫拒绝 [@ref-aider-main-yes-guard] |
| `--dry-run` | 只演算、不写文件 |
| `--no-auto-commits`、`--no-dirty-commits`、`--no-git` | 收缩 aider 对仓库的写权限（不提交、不处理 dirty、完全不用 git） |
| `--skip-sanity-check-repo` | 跳过仓库合理性检查 |
| `.aiderignore`、`--subtree-only`、`--add-gitignore-files` | 限定参与编辑与 repo map 的文件范围 |
| `--analytics-disable` | 永久关闭遥测 |

**缺口**：没有 pager/"不受信任目录只读"一类的信任模型可引用；上表是从完整配置项清单里筛出的"会限制实际效果"的键，不是官方的权限分层声明。

## 诊断与重载 {#config-diagnostics}

排查"文件写了但没生效"的固定手段：

1. `--verbose` 打印 "Config files search order, if no --config:" 之后的候选文件列表，并对存在者标注 `(exists)`；同一开关还会打印实际加载的 `.env` 文件。[@ref-aider-main-config-load][@ref-aider-main-verbose-dotenv]
2. `--verbose` 打印模型 settings 与元数据文件的搜索路径、实际加载结果（"Searched for model settings files:" / "Loaded model settings from:" / "Loaded model metadata from:"）。[@ref-aider-main-model-settings]
3. `--verbose` 在启动时转储当前模型的元数据 JSON 与全部模型设置字段，用来核对最终生效值。[@ref-aider-main-verbose-model]
4. 会话内 `/settings` 打印当前生效的设置，并附主要模型、editor 模型、weak 模型的元数据字段。[@ref-aider-cmd-settings]
5. `--show-prompts` 打印系统提示后退出，可确认配置是否真的改变了提示内容。[@ref-aider-args-show-prompts]
6. `/load {file}` 可以重放一串 `/` 命令，用来复现某次配置组合下的会话行为。[@ref-aider-cmd-load]

**重载语义**：配置文件、`.env`、模型设置与元数据都在启动阶段读取，改动后需要重启 aider 才确定生效；`--verbose` 输出的就是这一次启动实际使用的路径清单。[@ref-aider-main-config-load] 会话内只有 `/model`、`/settings` 这类命令能即时改变行为，它们改的是当前 coder 的运行时字段而不是磁盘配置。[@ref-aider-cmd-settings]
