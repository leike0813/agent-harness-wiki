---
schema_version: 3
record_kind: production
edition_id: warp-desktop-skills-v2
harness_id: warp
topic: skills
title: "Warp 桌面端的 Skill：目录发现、SKILL.md 格式与斜杠调用"
sections:
  - section_id: skills-sources
    surface_ids: [desktop]
    source_refs: [ref-warp-skills-locations, ref-warp-skills-project, ref-warp-skills-global, ref-warp-skills-how, ref-warp-skills-extra]
  - section_id: skills-format
    surface_ids: [desktop]
    source_refs: [ref-warp-skills-format, ref-warp-skills-supporting, ref-warp-skills-arguments, ref-warp-skills-identify, ref-warp-skills-conflicts]
  - section_id: skills-invocation
    surface_ids: [desktop]
    source_refs: [ref-warp-skills-how, ref-warp-slash-static, ref-warp-slash-modes-20261006, ref-warp-skills-invoking, ref-warp-skills-arguments, ref-warp-skills-extra, ref-warp-skills-prebuilt]
  - section_id: skills-diagnostics
    surface_ids: [desktop]
    source_refs: [ref-warp-skills-viewing, ref-warp-skills-managing, ref-warp-slash-static, ref-warp-slash-prompts, ref-warp-skills-identify, ref-warp-skills-how]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [desktop]
        section_id: skills-sources
        status: answered
        source_refs: [ref-warp-skills-locations, ref-warp-skills-project, ref-warp-skills-global, ref-warp-skills-extra]
  - question_id: skills.discovery
    answers:
      - surface_ids: [desktop]
        section_id: skills-sources
        status: answered
        source_refs: [ref-warp-skills-locations, ref-warp-skills-how, ref-warp-skills-project]
  - question_id: skills.collision
    answers:
      - surface_ids: [desktop]
        section_id: skills-format
        status: answered
        source_refs: [ref-warp-skills-conflicts]
  - question_id: skills.format
    answers:
      - surface_ids: [desktop]
        section_id: skills-format
        status: answered
        source_refs: [ref-warp-skills-format]
  - question_id: skills.extensions
    answers:
      - surface_ids: [desktop]
        section_id: skills-format
        status: answered
        source_refs: [ref-warp-skills-arguments, ref-warp-skills-supporting, ref-warp-skills-identify]
  - question_id: skills.loading
    answers:
      - surface_ids: [desktop]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-warp-skills-how]
  - question_id: skills.invocation
    answers:
      - surface_ids: [desktop]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-warp-skills-invoking, ref-warp-slash-static, ref-warp-slash-modes-20261006]
  - question_id: skills.conditions
    answers:
      - surface_ids: [desktop]
        section_id: skills-sources
        status: partial
        source_refs: [ref-warp-skills-extra, ref-warp-skills-how]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [desktop]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-warp-skills-managing, ref-warp-skills-viewing, ref-warp-skills-identify]
---

## Skill 的目录与发现范围 {#skills-sources}

本章的固定来源是 Warp 官方文档站 `https://docs.warp.dev/` 的 Markdown 页面快照（Skills、Rules、MCP、Profiles、Settings 等，见各小节引用）。Warp 是闭源桌面产品，来源为文档快照而非源码提交，因此本章是 source-level 知识，`version_applicability` 保持 unknown；不提供软件版本映射。

Skill 由用户自己放在磁盘目录里，Warp 在会话开始时扫描。项目级目录（相对当前工作目录之下的仓库）与用户级目录（home）各有一组受支持的名字 [@ref-warp-skills-locations]：

| 作用域 | 目录（任一即可） | 说明 |
| :-- | :-- | :-- |
| 项目 | `.agents/skills/`（推荐）、`.warp/skills/`、`.claude/skills/`、`.codex/skills/`、`.cursor/skills/`、`.gemini/skills/`、`.copilot/skills/`、`.factory/skills/`、`.github/skills/`、`.opencode/skills/` | 只在该项目内可用；建议放在项目根，子目录里的也只在进入该子目录工作时被发现 [@ref-warp-skills-project] |
| 用户（home） | `~/.agents/skills/`（推荐）、`~/.warp/skills/`、`~/.claude/skills/`、`~/.codex/skills/`、`~/.cursor/skills/`、`~/.gemini/skills/`、`~/.copilot/skills/`、`~/.factory/skills/`、`~/.github/skills/`、`~/.opencode/skills/` | 在本机所有项目可用 [@ref-warp-skills-global] |

文档明确说明 Warp 会扫描项目根下所有受支持的 skill 目录名，因此同一个仓库可以同时维护与其他 AI 编码工具兼容的 skill [@ref-warp-skills-locations]。文件位置参考页把 `~/.warp/skills/` 记录为「bundled skills」目录，并说明 Stable 与 Preview 共用该目录（`~/.warp/` 不随发布通道加后缀）[@ref-warp-skills-global]。

发现的边界由**当前工作目录**决定：Git 仓库中，Warp 把当前目录一路到仓库根之间的 skill 全部纳入；在项目 A 中工作不会拿到项目 B 的 skill [@ref-warp-skills-how]。会话开始时 Agent 收到的是「当前范围内的 skill 名称与描述列表」，正文此时还不在上下文里 [@ref-warp-skills-how]。固定来源没有给出目录递归深度、符号链接、符号名忽略规则或文件大小上限，这些点保持未验证 [@ref-warp-skills-locations]。

云端运行是另一条路径：cloud agent 从其 environment 里的仓库发现 skill；要把仓库之外的 skill（例如烤进自定义 Docker 镜像的）纳入索引，需设置环境变量 `WARP_SKILL_DIRS` [@ref-warp-skills-extra]。这是文档中唯一由环境变量改变 skill 发现范围的机制，且只针对云运行 [@ref-warp-skills-extra]。

## Skill 文件格式与专有扩展 {#skills-format}

每个 skill 是独立子目录中的一个 `SKILL.md`：带 YAML frontmatter 的 Markdown 文件，必须包含 `name`（唯一标识，通常 kebab-case）与 `description`（做什么、何时用）[@ref-warp-skills-format]。文档给出的最小结构是 frontmatter 两个字段加正文，正文里可用 `$ARGUMENTS` 或 `$0` 这样的占位符；下面用行内形式复述该结构（字段名与取值形式原样来自 Skills 页面的「Basic structure」代码块）：

- frontmatter：`name: your-skill-name`、`description: Brief description of what this skill does and when to use it`
- 正文：标题、Instructions 段（步骤化指令，可含 `$ARGUMENTS`/`$0` 占位符）、Examples 段

除 `name`、`description` 外的 frontmatter 字段没有在任何固定来源中出现，因此不能断言存在其他元数据 [@ref-warp-skills-format]。支撑文件（脚本、模板、配置）与 `SKILL.md` 放同一目录，并在指令正文中用相对路径引用，例如 `python3 .agents/skills/check-broken-links/check_links.py --internal-only` [@ref-warp-skills-supporting]。

专有扩展是**参数占位符**：`$ARGUMENTS` 替换为 skill 名之后的整段原始参数；`$ARGUMENTS[N]` 替换为第 N 个（0 起）空白分隔参数；`$N` 是 `$ARGUMENTS[N]` 的简写 [@ref-warp-skills-arguments]。替换发生在 skill 指令发送给模型之前；若 skill 中没有占位符，调用时附带的文字会作为单独的用户消息跟在指令之后发送；占位符引用了未提供的下标时保持原样 [@ref-warp-skills-arguments]。Conversation API 把 skill 加载记录为 `read_skill` 动作，`input` 里的 `bundled_skill_id` 表示 Warp 内置参考，`skill_path` 表示解析到的路径（文件型 skill，或路径引用的内置 skill，包括远端主机上的）[@ref-warp-skills-identify]。

同名冲突按调用方式处理：自然语言调用时 Agent 看到全部范围内 skill 的名称、描述与文件路径，由它按路径选择；斜杠命令调用时菜单列出所有同名项由用户选；Warp 自行解析名称（无用户直接选择）时，**先 home 目录（全局）skill，再越靠近仓库根的上级目录** [@ref-warp-skills-conflicts]。

## 加载、调用与生效条件 {#skills-invocation}

加载分两步：会话开始把范围内全部 skill 的**名称与描述**放入 Agent 上下文；Agent 判断某个 skill 有助于完成任务时，才载入该 skill 的完整指令并执行 [@ref-warp-skills-how]。因此「描述」是模型是否自动选中该 skill 的唯一依据 [@ref-warp-skills-how]。

显式调用有两种入口，都要求用户显式给出 skill 名：

- 斜杠命令 `/{skill-name}`，例如 `/deploy`、`/add-feature-flag`；内置 `/skills` 打开可搜索的 skill 菜单，`/open-skill` 打开浏览与编辑菜单 [@ref-warp-slash-static]。这类入口的适用范围按**输入模式**划分：文档当前把 Slash Commands 的可用模式写作 terminal mode 与 Agent Mode，即在终端模式与 Agent Mode 下都能直接键入 `/`，上一版文档写的 Auto-Detection Mode 已不再出现在适用范围表述里 [@ref-warp-slash-modes-20261006]。
- 自然语言的显式请求，例如 “Use the deploy skill to push to staging” [@ref-warp-skills-invoking]。

带 prompt 调用时：有占位符就替换后发送，没有占位符就把额外文字作为后续用户消息发送 [@ref-warp-skills-invoking]。固定来源没有描述禁用某个 skill、skill 之间的依赖声明，或基于信任/策略的可用性开关；本主题按「未记录」处理，不写成功能可用 [@ref-warp-skills-arguments]。

条件方面只有两条有来源：发现范围随当前工作目录变化，以及云运行的 `WARP_SKILL_DIRS` 额外目录 [@ref-warp-skills-how][@ref-warp-skills-extra]。Warp 还维护一个公开的预置 skill 集合 `warpdotdev/oz-skills`，可复制到项目的 `.agents/skills/` 使用；这些 skill 同时出现在 Oz web app 里 [@ref-warp-skills-prebuilt]。

## 诊断与重载 {#skills-diagnostics}

- `Viewing available skills`：直接问 Agent “What skills do I have?”，它会列出当前发现到的全部 skill 及其名称与描述（含当前项目与 home 目录）[@ref-warp-skills-viewing]。
- `/open-skill`：交互菜单里按项目级 / home 级浏览，能看到每个 skill 所在目录，并直接在编辑器中打开 [@ref-warp-skills-managing]。
- `/skills` 与 `/open-skill` 都出现在内置斜杠命令表中 [@ref-warp-slash-static]；保存的 Warp Drive Agent Prompt 也会以 `/` 开头出现在同一菜单里，可用来固定复用一段调用文本 [@ref-warp-slash-prompts]。
- 事后核对：Conversation API 的 `read_skill` 动作可以确认某次会话实际加载了哪些 skill、解析到哪个路径；按 `bundled_skill_id` 可排除 Warp 内置项，只统计团队自有的 `skill_path` [@ref-warp-skills-identify]。

改动 `SKILL.md` 后如何重载没有在固定来源中说明：文档只说 Agent 在会话开始时收到 skill 列表，因此最确定的做法是开新会话；热重载未验证 [@ref-warp-skills-how]。
