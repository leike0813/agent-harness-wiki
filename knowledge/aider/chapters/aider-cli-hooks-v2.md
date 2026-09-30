---
schema_version: 3
record_kind: production
edition_id: aider-cli-hooks-v2
harness_id: aider
topic: hooks
title: "Aider CLI 的自动化钩子：lint、test、shell 与 git 提交"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-aider-base-after-edit, ref-aider-watch-process, ref-aider-watch-comments, ref-aider-git-disable]
  - section_id: hooks-lint-test
    surface_ids: [cli]
    source_refs: [ref-aider-args-watch-lint, ref-aider-usage-lint, ref-aider-usage-test, ref-aider-main-parse-lint-cmds, ref-aider-base-lint-cmds, ref-aider-linter-init, ref-aider-linter-lint, ref-aider-linter-python]
  - section_id: hooks-feedback
    surface_ids: [cli]
    source_refs: [ref-aider-linter-run-cmd, ref-aider-usage-lint, ref-aider-linter-lint, ref-aider-base-lint-edited, ref-aider-base-after-edit, ref-aider-cmd-test-run, ref-aider-usage-test, ref-aider-base-shell-commands, ref-aider-base-platform-text]
  - section_id: hooks-git
    surface_ids: [cli]
    source_refs: [ref-aider-git-disable, ref-aider-config-sample-yaml]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-aider-usage-commands, ref-aider-usage-lint, ref-aider-cmd-test-run, ref-aider-usage-test, ref-aider-args-verbose-load, ref-aider-watch-process, ref-aider-args-watch-lint]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: partial
        source_refs: [ref-aider-base-after-edit, ref-aider-watch-process, ref-aider-git-disable]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-lint-test
        status: partial
        source_refs: [ref-aider-args-watch-lint, ref-aider-main-parse-lint-cmds, ref-aider-usage-lint]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-feedback
        status: partial
        source_refs: [ref-aider-linter-run-cmd]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-feedback
        status: answered
        source_refs: [ref-aider-linter-run-cmd, ref-aider-linter-lint, ref-aider-base-lint-edited, ref-aider-cmd-test-run]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-feedback
        status: partial
        source_refs: [ref-aider-base-after-edit, ref-aider-base-shell-commands, ref-aider-base-platform-text]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-lint-test
        status: partial
        source_refs: [ref-aider-usage-lint, ref-aider-usage-test, ref-aider-args-watch-lint]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-aider-usage-commands, ref-aider-usage-lint, ref-aider-usage-test, ref-aider-args-verbose-load]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与触发点 {#hooks-events}

固定来源是官方仓库提交 `5dc9490bb35f9729ef2c95d00a19ccd30c26339c` 的文档与实现。Aider 没有通用的事件总线、没有可注册的回调、没有事件名与 matcher。固定来源里"在某个时点自动执行外部动作"只有三处明确的触发点：

| 触发点 | 时点 | 条件与效果 |
| :-- | :-- | :-- |
| 编辑之后 | 模型改动文件并写盘之后 | 自动 lint（默认开）→ 自动提交 → 运行模型建议的 shell 命令 → 自动测试（默认关）[@ref-aider-base-after-edit] |
| 文件变化 | 以 `--watch-files` 启动后监听仓库文件 | 出现 `AI!`/`AI?` 注释即触发一次请求，并自动把该文件加入聊天 [@ref-aider-watch-process][@ref-aider-watch-comments] |
| git 提交时 | aider 自动提交自己或 dirty 文件的改动时 | 默认跳过仓库 pre-commit 钩子，`--git-commit-verify` 才会运行它们 [@ref-aider-git-disable] |

三处之外没有其它第一方事件；固定来源里也没有"插件事件"这一类来源，因为 Aider 没有原生插件系统（见 Native plugins 主题章节）。触发点靠的是 coder 主循环里的顺序代码，不是事件分发。[@ref-aider-base-after-edit]

## 配置入口：lint 与 test 命令 {#hooks-lint-test}

唯一的"hook 配置"是外部命令加开关，全部走命令行、配置文件或 `AIDER_*` 环境变量（选项实现见 `aider/args.py`）[@ref-aider-args-watch-lint]：

| 选项 | 默认 | 作用 |
| :-- | :-- | :-- |
| `--lint-cmd` | 空 | 指定 lint 命令，可重复；形如 `"python: flake8 --select=..."` [@ref-aider-usage-lint] |
| `--auto-lint` / `--no-auto-lint` | True | 每次编辑后是否自动 lint [@ref-aider-usage-lint] |
| `--lint` | False | 一次性模式：lint 给定文件，未给定则 lint dirty 文件，然后退出 [@ref-aider-args-watch-lint] |
| `--test-cmd` | 空 | 测试命令 [@ref-aider-usage-test] |
| `--auto-test` / `--no-auto-test` | False | 每次编辑后是否自动测试 [@ref-aider-usage-test] |
| `--test` | False | 一次性模式：跑测试、尝试修问题后退出 [@ref-aider-args-watch-lint] |

`--lint-cmd` 的取值按 `^[a-z]+:` 判断是否带语言前缀：形如 `python: cmd` 的写进按语言索引的表，其余写进"所有语言"的单一命令。[@ref-aider-main-parse-lint-cmds] 这些表被交给 coder 后逐个登记进 linter：有语言名的按语言登记，无语言名的成为兜底命令。[@ref-aider-base-lint-cmds][@ref-aider-linter-init]

不配置时用内置行为：`Linter.languages` 初始只把 `python` 映射到 `py_lint`（树解析器基本检查 + 语法编译检查 + `flake8`）；其它语言只要树解析器认得，就走 `basic_lint` 的通用检查；语言都识别不出时直接跳过。[@ref-aider-linter-init][@ref-aider-linter-lint][@ref-aider-linter-python] 文档的表述是 "Aider comes with built in linters for most popular languages"，与实现的这层"python 专有 + 其它语言通用树检查"存在粒度差异，读者按实现理解更稳妥。[@ref-aider-usage-lint]

## 输入、输出与顺序 {#hooks-feedback}

**输入**：命令在仓库根目录（coder 的 root）下执行，相对文件名被 shell 引号转义后**追加**到命令末尾；只有非零退出码时其标准输出才被当作错误文本。[@ref-aider-linter-run-cmd]

官方文档给出一条与输入约定直接相关的坑：把格式化器当 linter 用时，它可能因为"确实改了文件"而返回非零退出码，被 Aider 当成真实的 lint 错误。文档给出的绕法是写一个包装脚本把命令跑两次（第一次允许改动、第二次必须干净退出），再把脚本设成 linter。[@ref-aider-usage-lint]

同一份文档还给出编译语言的做法：用 `--lint-cmd` 让每个被改文件顺带编译，或用 `--test-cmd "dotnet build && dotnet test"` 这类命令在编辑后整体构建与测试。[@ref-aider-usage-lint]

**输出回灌**：非零退出时，Aider 组装一段以 `# Fix any errors below, if possible.` 开头的错误文本，附上错误行附近的代码上下文，作为新的用户消息交回模型；在自动 lint 路径上先弹出 "Attempt to fix lint errors?" 确认。[@ref-aider-linter-lint][@ref-aider-base-lint-edited][@ref-aider-base-after-edit]

`/test` 与 `--test-cmd` 的行为一致：运行命令，只在退出码非零时把输出加入聊天并把该输出作为待修问题返回；退出码为零时静默。[@ref-aider-cmd-test-run][@ref-aider-usage-test]

**顺序**（`Coder.send_message` 处理完回复之后的收尾阶段，串行）[@ref-aider-base-after-edit]：

1. 有文件被编辑且 `auto_lint` 为真 → lint 被改动的文件；
2. 自动提交（上下文标记为 "Ran the linter"）；
3. 运行模型建议的 shell 命令（`--suggest-shell-commands`，默认开）：逐个要求用户确认后执行，再询问是否把输出加入聊天 [@ref-aider-base-shell-commands]；
4. 有文件被编辑且 `auto_test` 为真 → 运行测试命令。

当自动 lint/test 打开时，这两个命令会写进系统提示，告诉模型这些命令会由宿主自动运行、不要再建议执行它们。[@ref-aider-base-platform-text]

**缺口**：固定来源没有给出 lint/test 命令的超时时间、并发度（实现上是逐文件串行调用）、重复触发去重策略；失败也只会回到"再修一轮"的循环，没有重试上限的说明。这些点保持未验证。

## 与 git 钩子的关系 {#hooks-git}

aider 会自己提交改动，因此它与 git 仓库的 pre-commit 钩子是**反向关系**：默认情况下 aider 用 `--no-verify` 提交，即**不执行**仓库的 pre-commit 钩子；`--git-commit-verify` 打开后才让钩子参与提交。[@ref-aider-git-disable]

与之相关的联动配置：`--auto-commits`（默认 True）控制每次编辑后自动提交，`--no-dirty-commits` 停止"编辑前先提交 dirty 文件"，`--commit-prompt` 自定义生成提交信息用的提示。[@ref-aider-config-sample-yaml]

## 诊断 {#hooks-diagnostics}

- 会话内手动触发：`/lint` 对聊天中的文件（没有则对 dirty 文件）执行 lint 并询问是否修复；`/test {command}` 运行命令且仅在非零退出时把输出加入聊天；`/run {command}`（别名 `!`）运行命令并可选择把输出加入聊天。[@ref-aider-usage-commands][@ref-aider-usage-lint][@ref-aider-cmd-test-run]
- 关闭自动执行以便观察：`--no-auto-lint`、`--no-auto-test`，或一次性改用 `--lint` / `--test`。[@ref-aider-usage-lint][@ref-aider-usage-test]
- 配置来源排查：`--verbose` 会打印 lint/test 相关设置所在的配置文件搜索与加载结果。[@ref-aider-args-verbose-load]
- 修改配置后需要重启 aider 才会重新解析 `--lint-cmd` / `--test-cmd`；`--watch-files` 的监听在会话存续期间持续生效，但其开关本身在启动时确定。[@ref-aider-watch-process][@ref-aider-args-watch-lint]
