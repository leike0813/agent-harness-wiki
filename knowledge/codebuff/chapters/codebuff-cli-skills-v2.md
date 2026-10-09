---
schema_version: 3
record_kind: production
edition_id: codebuff-cli-skills-v2
harness_id: codebuff
topic: skills
title: "Codebuff 的 Skills：位置、格式、发现、加载与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-codebuff-workspaces, ref-codebuff-doc-quickstart, ref-codebuff-skills-cli-registry]
  - section_id: skills-roots-format
    surface_ids: [cli]
    source_refs: [ref-codebuff-skills-dirs, ref-codebuff-skills-dirs-20261009, ref-codebuff-skills-home-optin, ref-codebuff-skills-cli-registry, ref-codebuff-doc-skills-locations, ref-codebuff-skills-parse, ref-codebuff-skills-frontmatter, ref-codebuff-skills-constants, ref-codebuff-doc-skills-create, ref-codebuff-init-type-files]
  - section_id: skills-discovery-collision
    surface_ids: [cli]
    source_refs: [ref-codebuff-skills-cli-registry, ref-codebuff-cli-startup, ref-codebuff-skills-discover, ref-codebuff-skills-constants, ref-codebuff-doc-skills-locations, ref-codebuff-skills-dirs, ref-codebuff-skills-load, ref-codebuff-agentdir-trust-doc]
  - section_id: skills-loading-invocation
    surface_ids: [cli]
    source_refs: [ref-codebuff-skills-xml, ref-codebuff-skills-tool-params, ref-codebuff-skills-tool-handler, ref-codebuff-skills-runwire, ref-codebuff-skills-command, ref-codebuff-skills-prompt, ref-codebuff-doc-skills-usage]
  - section_id: skills-conditions-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuff-skills-home-optin, ref-codebuff-skills-cli-registry, ref-codebuff-agentdir-trust-doc, ref-codebuff-skills-tool-handler, ref-codebuff-skills-command, ref-codebuff-doc-troubleshoot-config, ref-codebuff-cli-logs]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots-format
        status: answered
        source_refs: [ref-codebuff-skills-dirs, ref-codebuff-skills-dirs-20261009, ref-codebuff-skills-home-optin, ref-codebuff-skills-cli-registry, ref-codebuff-doc-skills-locations]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: partial
        source_refs: [ref-codebuff-skills-cli-registry, ref-codebuff-cli-startup, ref-codebuff-skills-discover, ref-codebuff-skills-constants, ref-codebuff-doc-skills-locations]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: answered
        source_refs: [ref-codebuff-skills-dirs, ref-codebuff-skills-load, ref-codebuff-doc-skills-locations, ref-codebuff-skills-discover, ref-codebuff-agentdir-trust-doc]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-roots-format
        status: answered
        source_refs: [ref-codebuff-skills-parse, ref-codebuff-skills-frontmatter, ref-codebuff-skills-constants, ref-codebuff-doc-skills-create]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-roots-format
        status: partial
        source_refs: [ref-codebuff-skills-frontmatter, ref-codebuff-skills-dirs]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-codebuff-skills-xml, ref-codebuff-skills-tool-params, ref-codebuff-skills-tool-handler, ref-codebuff-skills-runwire]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-codebuff-skills-command, ref-codebuff-skills-prompt, ref-codebuff-skills-tool-params, ref-codebuff-doc-skills-usage, ref-codebuff-skills-xml, ref-codebuff-skills-tool-handler]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-codebuff-skills-home-optin, ref-codebuff-skills-cli-registry, ref-codebuff-agentdir-trust-doc, ref-codebuff-skills-tool-handler]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-codebuff-skills-cli-registry, ref-codebuff-skills-tool-handler, ref-codebuff-skills-command, ref-codebuff-doc-troubleshoot-config, ref-codebuff-cli-logs]
---

## 固定来源与适用范围 {#skills-scope}

本章的固定来源是官方仓库 `CodebuffAI/codebuff` 在提交
`639e3f3c7a96658035d008e935398417843067fc` 的工作树（Bun 工作区，含 `sdk/`、`cli/`、`common/`、`packages/agent-runtime/`）[@ref-codebuff-workspaces]，以及官方文档站
`www.codebuff.com/docs` 在该日抓取的 HTML 快照 [@ref-codebuff-doc-quickstart]。

需要说明来源身份：catalog 为 codebuff 固定的 `cat-codebuff-readme` 指向本仓库
`README.md`，而该提交的 README 描述的是构建在 Codebuff 之上的 Freebuff 产品（README
自述 "Built on Codebuff"），不是 Codebuff 本身。因此本章不把该 README 当作 Codebuff
能力证据，而以仓库里的 `@codebuff/sdk`/`@codebuff/cli` 源码与 codebuff.com 文档站为准
[@ref-codebuff-workspaces][@ref-codebuff-doc-quickstart]。官方 npm 渠道登记为包名 `codebuff`，只用于核对官方包名，
不作为机制证据（npm 渠道按本库约定不建快照）。仓库与文档站都没有标注软件版本，本章是来源级知识。

Skill 在该产品里是一份带 YAML frontmatter 的 `SKILL.md`，放在 `skills/` 目录下的
独立子目录里，通过 `skill` 工具按需加载 [@ref-codebuff-skills-cli-registry]。

## 位置、格式与宿主专有字段 {#skills-roots-format}

**skills.roots**：SDK 的解析函数把搜索目录按"后者覆盖前者"的顺序展开为：全局
`~/.claude/skills/`、`~/.agents/skills/`，然后项目 `{cwd}/.claude/skills/`、
`{cwd}/.agents/skills/` [@ref-codebuff-skills-dirs]。`homeDir` 是显式入参，且只有当
调用方传入 `includeHomeSkills: true` 时才会取 `os.homedir()`；默认只看两个项目目录
[@ref-codebuff-skills-dirs][@ref-codebuff-skills-home-optin]。CLI 在启动时调用 SDK 加载器并显式
传入 `includeHomeSkills: true`，所以 CLI 里四个目录都会参与；`cwd` 取 CLI 的项目根
[@ref-codebuff-skills-cli-registry]。文档站把同样四个位置写成"低到高优先级"的发现顺序，
并说明 `.claude/` 路径是为兼容 Claude Code 而设 [@ref-codebuff-doc-skills-locations]。没有发现
改写 skill 路径的专用环境变量；路径只随 home、当前工作目录变化
[@ref-codebuff-skills-dirs]。该解析函数在本轮固定提交 `7bffbd4b0a1966294260b5d201eb68cecb3cb6b5`
上逐字未变 [@ref-codebuff-skills-dirs-20261009]。

**skills.format**：`SKILL.md` 用 `gray-matter` 解析文件顶部的 YAML frontmatter；frontmatter
缺失或解析出空对象时整份文件被丢弃 [@ref-codebuff-skills-parse]。Zod 模式接受且只接受这些
字段：`name`（必填，1–64 字符，匹配 `^[a-z0-9]+(-[a-z0-9]+)*$`）、`description`（必填，
超长时截断到 1024 字符而不是拒绝）、`license`（可选）、`disable-model-invocation`（可选布尔）、
`metadata`（可选、自由键值对象）[@ref-codebuff-skills-frontmatter][@ref-codebuff-skills-constants]。
名称还必须与所在目录名完全一致，否则该 skill 被丢弃——加载器是按目录发现、按
frontmatter 的 `name` 建索引的 [@ref-codebuff-skills-parse]。模式未声明的键不会被保留（普通
对象解析，未知键被忽略）[@ref-codebuff-skills-frontmatter]。文档站的字段说明与源码一致
（`name` 与 `description` 必填、`metadata` 可选，名称 1–64 字符且必须等于目录名）
[@ref-codebuff-doc-skills-create]。

`/init` 不写任何 skill 文件：它只创建 `.agents/`、`.agents/types/` 并复制三个类型文件
[@ref-codebuff-init-type-files]。早期提交里 `common/src/templates/initial-agents-dir/skills/`
（一份 `SKILL.md` 示例与说明）已在本轮固定提交中整体删除，因此本章不再引用仓库模板示例，
最小示例按解析模式给出：

```markdown
---
name: my-skill
description: 一句话说明这个 skill 什么时候该被加载
---
```

上面两个字段是解析模式的必填项，键名与取值规则见 [@ref-codebuff-skills-frontmatter]
（可选 `license`、`metadata` 同样出自该模式）。

**skills.extensions**：除标准字段外，宿主识别的专有项是
`disable-model-invocation`（`true` 时只有用户能触发，见下一节）、`license`、自由形式的
`metadata`，以及 `.claude/` 兼容目录名本身 [@ref-codebuff-skills-frontmatter][@ref-codebuff-skills-dirs]。
缺口：固定来源没有确立任何资源目录约定（如 `scripts/`、`references/`、`assets/`），也没有
除上述字段外的 skill 级配置项；`MetadataSchema` 是自由对象，注册方可以嵌套自己的结构但
宿主不解释它 [@ref-codebuff-skills-frontmatter]。这三点按 partial 阅读。

## 发现时机、扫描范围与同名冲突 {#skills-discovery-collision}

**skills.discovery**：CLI 在启动早期（TUI 挂载前）调用一次注册表初始化，把 skill 读进内存
缓存 [@ref-codebuff-skills-cli-registry][@ref-codebuff-cli-startup]。扫描实现对每个搜索目录做一次 `readdirSync`
[@ref-codebuff-skills-discover]：只接受目录项，目录名必须通过 `isValidSkillName`，且目录里必须
存在 `SKILL.md`，否则跳过；因此默认发现深度是"skills 根的直接子目录"一层，更深嵌套不会命中
[@ref-codebuff-skills-discover][@ref-codebuff-skills-constants]。当前版本没有会话内重新扫描的
用户入口，文档站的排障建议是"重启 Codebuff 以重新加载 skills"
[@ref-codebuff-doc-skills-locations]。

缺口：固定来源没有说明是否跟随符号链接、是否读取 ignore 文件，也没有给出目录项数量或耗时
上限；源码只做 `statSync`/`existsSync` 判定 [@ref-codebuff-skills-discover]。按 partial 阅读。

**skills.collision**：没有命名空间机制。加载器按目录顺序调用 `Object.assign` 合并成
"名字 → skill"的映射，后者覆盖前者，于是项目目录覆盖全局目录、同一层内 `.agents/skills`
覆盖 `.claude/skills` [@ref-codebuff-skills-dirs][@ref-codebuff-skills-load]，文档站叙述相同
[@ref-codebuff-doc-skills-locations]。落败的一方直接消失，不会合并内容。`skill` 工具执行时还会
优先读盘上的同名 skill（内容以磁盘最新为准），失败才回退到启动缓存；两条查找路径都把
`.agents` 排在 `.claude` 之前、项目排在全局之前 [@ref-codebuff-skills-discover]。信任门只拦
`.agents` 里的可执行 agent 文件与 `mcp.json`，纯 `skills/` 目录不需要信任即可加载
[@ref-codebuff-agentdir-trust-doc]。

## 加载、调用与禁用 {#skills-loading-invocation}

**skills.loading**：启动时进入上下文的只有名字与描述——它们被格式化成一块
`available_skills` 文本插进 `skill` 工具的说明里（描述经 XML 转义），供模型判断相关性
[@ref-codebuff-skills-xml][@ref-codebuff-skills-tool-params]。正文不常驻：模型调用 `skill` 工具并给出
`name` 后，工具返回该 skill 的 `name`、`description`、完整 `content`（含 frontmatter）与可选
`license`，代码把它作为工具结果写回上下文 [@ref-codebuff-skills-tool-handler]。工具执行时会按同样的
优先级重新读盘，所以会话中新建或更新的 skill 也按最新内容生效 [@ref-codebuff-skills-tool-handler]。
SDK 在每次 run 的状态初始化里加载 skills 并允许宿主用 `skillsLoader` 覆盖，加载抛错时降级为
"无 skill"而不是让整轮失败 [@ref-codebuff-skills-runwire]。

**skills.invocation**：两条路径。其一，用户输入斜杠命令 `/skill:<名字>`（截图为 `/skill:`
前缀补全），无参数时进入输入模式让用户补充说明，有参数时直接发送；两类入口都调用同一个
提示构造器，把整份 `SKILL.md` 包进一段带 skill 名的标记文本再发给 agent
[@ref-codebuff-skills-command][@ref-codebuff-skills-prompt]。其二，模型在看到工具说明里的可用列表后
自行调用 `skill` 工具 [@ref-codebuff-skills-tool-params]，文档站同样描述这两种用法
[@ref-codebuff-doc-skills-usage]。`disable-model-invocation: true` 的 skill 会从
`available_skills` 列表过滤掉，模型调用它时收到"只能由用户调用"的错误，但用户的
`/skill:` 入口仍可使用 [@ref-codebuff-skills-xml][@ref-codebuff-skills-tool-handler]。没有发现按 agent、
按目录或按策略禁用 skill 的配置项。缺口：文档站提到会话中可用 `npx skills add` 安装 skill，
但该命令的实现不在本仓库固定提交中 [@ref-codebuff-skills-tool-params]。按 partial 阅读。

## 生效条件与诊断 {#skills-conditions-diagnostics}

**skills.conditions**：可验证的条件有三项。其一，是否能读到 home 目录的全局 skill 取决于
宿主的 `includeHomeSkills`：SDK 默认 `false`（服务端嵌入时绝不能读宿主机的 home），CLI
显式打开 [@ref-codebuff-skills-home-optin][@ref-codebuff-skills-cli-registry]。其二，仓库
`.agents` 目录的信任门：目录里若只有 `skills/` 的 markdown 就不需要信任，只有存在可执行
agent 文件或 `mcp.json` 时才要求用户确认；技能仍从"未受信任"的目录加载，只有 agent 与
`mcp.json` 被扣留 [@ref-codebuff-agentdir-trust-doc]。其三，`disable-model-invocation` 只在
"模型能否自行调用"这一维度上生效 [@ref-codebuff-skills-tool-handler]。缺口：没有发现 skill 级
功能开关、插件状态依赖或策略引擎条目。按 partial 阅读。

**skills.diagnostics**：可用入口是磁盘错误日志与运行期错误消息，而不是专门命令。骨架里
`getLoadedSkillsMessage` 会汇总"已加载 N 个 skill"，但在本提交的 `cli/src` 中除定义外未发现
调用点，因此不能算作用户可见的清单入口 [@ref-codebuff-skills-cli-registry]。真正可观察的是
`skill` 工具失败时的返回：它会列出当前可用的 skill 名，并提示"也可以按名字加载会话中新建的
skill" [@ref-codebuff-skills-tool-handler]。改动文件后没有热重载入口，文档站的排障清单要求
重启 Codebuff、核对 frontmatter 与目录名一致 [@ref-codebuff-skills-command][@ref-codebuff-doc-troubleshoot-config]。
CLI 的每会话调试日志写在项目 `debug/` 与每会话记录目录，可用 `--clear-logs` 在启动前清理
[@ref-codebuff-cli-logs]。缺口：没有"这个 skill 为什么没被发现"的独立诊断输出，加载失败只在
`verbose` 打开时打印。按 partial 阅读。
