---
schema_version: 3
record_kind: production
edition_id: aider-cli-skills-v1
harness_id: aider
topic: skills
title: "Aider CLI 的 Skill 边界与只读指令文件机制"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-aider-readme, ref-aider-pyproject, ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-coders-all]
  - section_id: skills-conventions
    surface_ids: [cli]
    source_refs: [ref-aider-usage-conventions, ref-aider-args-read-file, ref-aider-usage-conventions-config, ref-aider-main-read-files, ref-aider-usage-commands, ref-aider-cmd-read-only]
  - section_id: skills-reuse
    surface_ids: [cli]
    source_refs: [ref-aider-args-message, ref-aider-scripting-cli, ref-aider-args-verbose-load, ref-aider-cmd-load, ref-aider-args-editor, ref-aider-config-editor-env]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-aider-main-read-files, ref-aider-args-verbose-load, ref-aider-usage-commands, ref-aider-cmd-read-only, ref-aider-usage-watch, ref-aider-usage-watch-add, ref-aider-watch-process, ref-aider-watch-comments]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-aider-usage-commands, ref-aider-cmd-settings, ref-aider-args-show-prompts, ref-aider-main-show-prompts]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-scope
        status: not_applicable
        source_refs: [ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-coders-all]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-scope
        status: not_applicable
        source_refs: [ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-coders-all]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-scope
        status: not_applicable
        source_refs: [ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-coders-all]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-scope
        status: not_applicable
        source_refs: [ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-coders-all]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-scope
        status: not_applicable
        source_refs: [ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-coders-all]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-scope
        status: not_applicable
        source_refs: [ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-coders-all]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-conventions
        status: not_applicable
        source_refs: [ref-aider-usage-conventions, ref-aider-main-read-files]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-conventions
        status: not_applicable
        source_refs: [ref-aider-usage-commands, ref-aider-cmd-read-only]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: not_applicable
        source_refs: [ref-aider-usage-commands, ref-aider-cmd-settings, ref-aider-main-show-prompts]
---


## 固定来源与机制边界 {#skills-scope}

本章的固定来源是官方仓库提交 `5dc9490bb35f9729ef2c95d00a19ccd30c26339c`：`README.md`、`pyproject.toml`、`aider/website/docs/` 下的官方文档页，以及 `aider/args.py`、`aider/main.py`、`aider/commands.py`、`aider/coders/` 的实现。产品以 Python 包分发，没有官方 npm 包，也没有软件版本映射，因此整章按 source_only 阅读。[@ref-aider-readme][@ref-aider-pyproject]

结论：这批固定来源中不存在 Skill 机制——没有 `SKILL.md`、没有 skill 目录约定、没有 skill 的发现、命名或调用入口。判定依据是三个可直接复核的入口：

1. 文档站目录页 `aider/website/docs/index.md` 由 Jekyll 按页面 frontmatter 的 `parent`/`title` 自动列出全部顶层文档页与子页；`skills` 不在其中，`aider/website/docs/` 下也没有任何 skill 页面。[@ref-aider-docs-index]
2. `aider/website/assets/sample.aider.conf.yml` 由 `aider/args.py` 的解析器自动生成，文件头写明它列出 "all the valid configuration entries"；所有配置项中没有一个与 skill 有关。[@ref-aider-config-sample-yaml]
3. `pyproject.toml` 只声明一个发行包 `aider-chat`（`include = ["aider"]`）与一个入口点 `aider = "aider.main:main"`；`aider/coders/__init__.py` 的 `__all__` 列出全部 coder 类，没有加载指令包的角色。[@ref-aider-pyproject][@ref-aider-coders-all]

因此本主题 9 道题都按"机制不存在"记录，答案统一指向本小节与下面三个等价机制小节：只读指令文件（下一节）、可复用提示与命令文件、文件监听触发的提示。读者若需要 Skill 式的"按名调用的一段指令"，只能用这些机制手工搭出来。

## 只读指令文件与 --read {#skills-conventions}

最接近 Skill 的机制是**只读文件**。官方推荐做法是在仓库里放一个 markdown 说明文件（文档示例统一用 `CONVENTIONS.md`），然后用 `/read CONVENTIONS.md` 或 `aider --read CONVENTIONS.md` 加入聊天：以只读方式加入、不会被编辑，并且在开启 prompt caching 时会被缓存。[@ref-aider-usage-conventions]

`--read` 的取值是文件路径，可以重复出现；与之成对的 `--file` 把文件作为可编辑文件加入。[@ref-aider-args-read-file]

把它固化进配置的写法（来自 conventions 页的 "Always load conventions" 小节，键名与 `--read` 同名）[@ref-aider-usage-conventions-config]：

```yaml
read:
  - CONVENTIONS.md
  - anotherfile.txt
```

启动时这些路径的解析规则在 `aider/main.py` 里：相对路径先做用户目录展开、再相对当前目录解析为绝对路径；如果指向目录，则递归展开该目录下的所有文件并全部登记为只读文件。[@ref-aider-main-read-files]

会话内还有两个命令：`/read` 继续加入只读文件；`/read-only` 无参数时把聊天中所有文件转成只读，带参数时把匹配到的文件转成只读。[@ref-aider-usage-commands][@ref-aider-cmd-read-only]

这些文件不是 Skill：没有名称或描述字段、没有 frontmatter、没有"按名字调用"的入口；它们只是被整体放进上下文的普通文件内容。区别在于"谁来选"——选文件的是用户或配置文件，不是模型按描述自动匹配。

## 可复用的提示与命令文件 {#skills-reuse}

Aider 里可复用的"指令包"是文件而不是 Skill 包，入口有四类，都要求用户显式给出路径：

| 入口 | 作用 | 生命周期 |
| :-- | :-- | :-- |
| `--message` / `-m` | 把一条指令交给模型并处理回复 | 处理完即退出，禁用聊天模式 [@ref-aider-args-message][@ref-aider-scripting-cli] |
| `--message-file` / `-f` | 从文件读入同一条指令 | 同上 [@ref-aider-args-message] |
| `--load {file}` 与 `/load {file}` | 逐行执行文件中的 `/` 命令 | `--load` 在启动时执行；`/load` 在会话中执行，跳过空行与 `#` 开头的行 [@ref-aider-args-verbose-load][@ref-aider-cmd-load] |
| `--editor` 与 `/editor` | 用外部编辑器撰写提示 | `--editor` 指定编辑器；未指定时按 `AIDER_EDITOR`、`VISUAL`、`EDITOR` 顺序取环境变量 [@ref-aider-args-editor][@ref-aider-config-editor-env] |

一个最小的命令文件（`/load` 与 `--load` 的输入格式，依据 `/load` 的实现：逐行执行、跳过 `#` 行）[@ref-aider-cmd-load]：

```
# 准备上下文
/read CONVENTIONS.md
add src/main.py
/ask 这个模块的入口在哪里
```

需要注意，这些入口都不构成 Skill 系统：没有元数据、没有作用域、没有同名冲突消解，命令文件里的每一行只是被当作聊天输入提交。

## 进入上下文的时机 {#skills-loading}

三条加载路径：

1. **启动时**：命令行或配置文件里的 `--read`/`read:` 文件在启动阶段解析并作为只读文件进入聊天；指向目录时递归展开。[@ref-aider-main-read-files] `--load` 指定的命令文件也在启动时按行执行。[@ref-aider-args-verbose-load]
2. **会话中**：`/read`、`/read-only` 修改只读文件集合，`/add`、`/drop` 修改可编辑文件集合。[@ref-aider-usage-commands][@ref-aider-cmd-read-only]
3. **文件监听**：以 `--watch-files` 启动时，aider 监听仓库中的文件；只要某个文件里出现以 `AI`、`AI!` 或 `AI?` 开头或结尾的单行注释，该文件就会被自动加入聊天。[@ref-aider-usage-watch][@ref-aider-usage-watch-add][@ref-aider-watch-process]

调用方式也只有显式一种：用户用命令行、`/read`、`/add`，或者写 `AI!`/`AI?` 注释来触发。固定来源里没有"模型读描述后自动调用某段指令包"的机制，也没有禁用/启用某个指令包的开关。[@ref-aider-watch-comments]

## 诊断与重载 {#skills-diagnostics}

- `/ls` 列出全部已知文件并标出哪些已在聊天中；`/tokens` 报告当前上下文的 token 用量；`/drop`、`/clear`、`/reset` 收缩上下文。[@ref-aider-usage-commands]
- `/settings` 打印当前生效的设置（含配置来源解析后的结果）。[@ref-aider-cmd-settings]
- `--show-prompts` 打印系统提示与当前消息后退出，可用来确认只读文件内容是否真的进了提示。[@ref-aider-args-show-prompts][@ref-aider-main-show-prompts]
- 改动 `CONVENTIONS.md` 这类只读文件后，已经在上下文中的文件内容需要在下一轮重新读入；固定来源没有给出热重载保证，改动配置文件或 `--read` 列表需要重启 aider 才确定生效。运行中用 `/read` 新加入的文件立即生效。

**缺口**：固定来源没有描述只读文件的大小上限、编码限制或与 repo map 的交互；这些点没有可引用证据，保持未验证。
