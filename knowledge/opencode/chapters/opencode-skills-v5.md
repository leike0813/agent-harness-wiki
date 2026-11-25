---
schema_version: 3
record_kind: production
edition_id: opencode-skills-v5
harness_id: opencode
topic: skills
title: OpenCode 的 Skills 机制
sections:
  - section_id: skills-locations
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-locations-v2
      - ref-opencode-skills-scan-load-v2
      - ref-opencode-skills-compat-scan-v2
      - ref-opencode-skills-scan-rules-v2
      - ref-opencode-skills-builtin-v2
      - ref-opencode-skills-mcp-v2
      - ref-opencode-skills-catalog-v2
  - section_id: skills-authoring
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-frontmatter-v2
      - ref-opencode-skills-frontmatter-code-v2
      - ref-opencode-skills-ids-v2
  - section_id: skills-extension-paths
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-sources-v2
      - ref-opencode-skills-config-key-v2
      - ref-opencode-skills-catalog-v2
      - ref-opencode-skills-catalog-code-v2
      - ref-opencode-skills-list-api-v2
  - section_id: skills-selection
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-permissions-v2
      - ref-opencode-skills-legacy-permissions-v2
      - ref-opencode-skills-precedence-v2
      - ref-opencode-skills-autoinvoke-code-v2
      - ref-opencode-skills-frontmatter-v2
      - ref-opencode-skills-permission-gate-v2
      - ref-opencode-skills-loading-doc-v2
      - ref-opencode-skills-claude-roots
      - ref-opencode-skills-env-disable
      - ref-opencode-skills-env-code-v2
      - ref-opencode-skills-mcp-v2
      - ref-opencode-skills-scan-load-v2
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-autoinvoke-code-v2
      - ref-opencode-skills-prepare-code-v2
      - ref-opencode-skills-permission-gate-v2
      - ref-opencode-skills-content-api-v2
      - ref-opencode-skills-loading-doc-v2
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-list-api-v2
      - ref-opencode-skills-file-api-v2
      - ref-opencode-skills-reload-v2
      - ref-opencode-skills-scan-load-v2
      - ref-opencode-skills-scan-rules-v2
      - ref-opencode-skills-frontmatter-code-v2
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-opencode-skills-locations-v2
          - ref-opencode-skills-builtin-v2
          - ref-opencode-skills-mcp-v2
          - ref-opencode-skills-compat-scan-v2
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-opencode-skills-scan-rules-v2
          - ref-opencode-skills-scan-load-v2
          - ref-opencode-skills-catalog-v2
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-selection
        status: answered
        source_refs:
          - ref-opencode-skills-precedence-v2
          - ref-opencode-skills-scan-load-v2
          - ref-opencode-skills-mcp-v2
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-authoring
        status: answered
        source_refs:
          - ref-opencode-skills-frontmatter-v2
          - ref-opencode-skills-frontmatter-code-v2
          - ref-opencode-skills-ids-v2
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-extension-paths
        status: answered
        source_refs:
          - ref-opencode-skills-sources-v2
          - ref-opencode-skills-config-key-v2
          - ref-opencode-skills-catalog-v2
          - ref-opencode-skills-catalog-code-v2
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs:
          - ref-opencode-skills-autoinvoke-code-v2
          - ref-opencode-skills-prepare-code-v2
          - ref-opencode-skills-content-api-v2
          - ref-opencode-skills-loading-doc-v2
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-selection
        status: answered
        source_refs:
          - ref-opencode-skills-permissions-v2
          - ref-opencode-skills-permission-gate-v2
          - ref-opencode-skills-loading-doc-v2
          - ref-opencode-skills-autoinvoke-code-v2
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-selection
        status: answered
        source_refs:
          - ref-opencode-skills-frontmatter-v2
          - ref-opencode-skills-env-code-v2
          - ref-opencode-skills-claude-roots
          - ref-opencode-skills-env-disable
          - ref-opencode-skills-mcp-v2
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs:
          - ref-opencode-skills-list-api-v2
          - ref-opencode-skills-file-api-v2
          - ref-opencode-skills-reload-v2
---

本章依据固定源码提交 d62d2db9bcff 的官方文档与实现，抓取时间 2026-11-25T02:22:50Z；文档页位于 services/site/src/docs/content/skills.mdx。该提交的源码树不等于任何 npm 发行包的运行时行为；下文路径、字段与接口属于固定源码知识，尚未建立与具体发行版本的映射。示例中的凭据一律写成占位符。

## Skill 的存放位置与扫描范围 {#skills-locations}

文档给出的查找位置是四组：全局 `~/.config/opencode/skills`，全局兼容 `~/.claude/skills` 与 `~/.agents/skills`，项目 `.opencode/skills`，项目兼容 `.claude/skills` 与 `.agents/skills`。项目来源从当前目录向上找到项目根，每一层命中的目录都纳入；兼容目录的全局项排在最前，随后由远及近。 [@ref-opencode-skills-locations-v2]

实现侧的入口是配置发现结果，而不是硬编码路径。加载器从配置条目里取出所有 directory 条目，对每个目录同时注册 `skill/` 与 `skills/` 两个子目录；配置文档 `skills` 键里的每一项按本地目录或 http／https 地址展开为来源。兼容目录由独立的兼容插件负责，它把 `.claude` 与 `.agents` 根目录下的 `skills` 子目录作为来源，并交给与主加载器相同的扫描函数。 [@ref-opencode-skills-scan-load-v2] [@ref-opencode-skills-compat-scan-v2]

此外还有两类不经过文件扫描的来源。内置技能由内部插件直接注册：`opencode` 与 `report`，两者的路径都是 `skill://` 开头的技能 URI（后面跟 id 与 `SKILL.md`），`opencode` 的 API 文件在 opencode_api 标志开启时作为虚拟文件加入。MCP 技能在 `mcp_skills` 标志开启时按 `server:skill名` 的字符串注册，内容按需从服务器读取。 [@ref-opencode-skills-builtin-v2] [@ref-opencode-skills-mcp-v2]

扫描规则在固定提交里统一由一个专门模块实现： [@ref-opencode-skills-scan-rules-v2]

- 广度优先遍历，深度上限 6 层，超出的目录不再进入。
- 以 `.` 开头的文件与目录整支跳过；`node_modules`、`.git`、`.venv`、`venv`、`__pycache__` 按忽略目录表跳过。
- 符号链接先 stat 解析目标类型：指向目录的链接会被继续遍历，指向文件的按文件处理，解析失败的丢弃。
- 某个目录内出现 `SKILL.md` 时，该文件就是这一层的 Skill 入口，并且不再向该目录的子目录递归，因此 Skill 目录内部的嵌套目录不会被单独当作来源。
- 只有扫描根这一层会额外收下散装的 `.md` 文件，更深层只认 `SKILL.md`。
- 结果排序后返回，同一来源内的处理顺序稳定。

加载循环对每个来源目录执行上述扫描，并对结果中落在已监听根之外的条目单独加文件级监听，因此额外目录里的文件改动也会触发重扫。http 或 https 来源先经远端索引拉取到缓存目录，再按同一规则读取 [@ref-opencode-skills-scan-load-v2] [@ref-opencode-skills-catalog-v2]。

## 编写一个 SKILL.md {#skills-authoring}

SKILL.md 是可编辑的文本入口。项目级放在 `.opencode/skills/{name}/SKILL.md`，全局级放在 `~/.config/opencode/skills/{name}/SKILL.md`。frontmatter 字段的行为如下： [@ref-opencode-skills-frontmatter-v2]

| 字段 | 行为 |
| --- | --- |
| `name` | 显示名；缺省时等于按路径派生的 ID |
| `description` | 展示给模型的摘要；缺失的技能不会进入可用列表 |
| `metadata.opencode/autoinvoke` | 设为 false 时把该 Skill 排除在模型的可用列表之外 |
| `disable-model-invocation` | 设为 true 与 `opencode/autoinvoke: false` 等效 |

frontmatter 全部可选；`license` 与 `compatibility` 这类可移植字段被接受但不解释。两个开关同时出现时 `opencode/autoinvoke` 优先。 [@ref-opencode-skills-frontmatter-v2]

```markdown
---
name: Git Release
description: 根据已合并的 PR 起草发布说明，并给出 gh release create 命令
"metadata":
  opencode/autoinvoke: false
---

Prepare the changelog, version bump, tag, and release notes.
```

解析实现只读取 name、description、metadata 与 disable-model-invocation 四个 frontmatter 字段。Skill 的 id 取自文件名或所在目录名：文件位于来源根且文件名不是 SKILL.md 时取文件名，否则取目录名；name 缺省时回退到 id；metadata 的布尔值接受布尔、0／1 与 true／false／yes／no／on／off 字符串。 [@ref-opencode-skills-frontmatter-code-v2]

ID 由路径决定，大小写敏感。官方建议便携技能使用 1–64 字符的小写 kebab-case，但 V2 不强制该正则、长度、name 与目录名一致或描述长度上限。 [@ref-opencode-skills-ids-v2]

```text
skills/git-release.md         → git-release
skills/git-release/SKILL.md   → git-release
skills/teams/release/SKILL.md → release
```

## 扩展目录、HTTP 目录与内置来源 {#skills-extension-paths}

追加 Skill 来源的配置键是 opencode.json 顶层的 `skills`，写成字符串数组；元素既可以是本地目录也可以是 http 或 https 地址。相对路径按当前 OpenCode 工作目录解析，而不是按配置文件所在目录；`~/` 展开到用户 home，绝对路径原样使用。所有被发现的配置文件都贡献条目，数组是合并而不是替换；连接的 Console 工作区也可以共享技能。 [@ref-opencode-skills-sources-v2]

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "skills": ["./team-skills", "~/shared/opencode-skills", "/opt/company-skills"]
}
```

旧的对象形式（`paths` 与 `urls` 两个子键）仍被归一化层展开并合并进同一个数组，因此两种写法都能被接受。 [@ref-opencode-skills-config-key-v2]

http 或 https 元素按 HTTP 目录处理：在基地址下取 `index.json`，其结构是 `{ "skills": [{ "name", "version", "files": [...] }] }`；对每个条目按“基地址／条目名／相对文件路径”下载文件。路径必须是安全、相对且同源的；文件列表必须包含 `SKILL.md` 或“条目名加 `.md`”的入口文件；`version` 变化时整目录重新下载并替换缓存，未变化则复用缓存。 [@ref-opencode-skills-catalog-v2] [@ref-opencode-skills-catalog-code-v2]

远端拉取的缓存根在全局 cache 下 `skills/` 里的地址哈希目录；下载目录会成为来源根，因此两种入口文件都得到同一个 ID。 [@ref-opencode-skills-catalog-code-v2]

扩展来源是否真的被发现，可以用列表接口返回的 path 字段核对：来自配置目录的条目落在该目录下的 skill 或 skills 子目录里，扩展来源则落在配置里写出的那个路径本身或远端缓存目录。 [@ref-opencode-skills-list-api-v2]

## 权限、优先级与调用 {#skills-selection}

Skill 的可用性由权限控制。原生写法是 `permissions` 数组，每条规则由 action、resource 与 effect 组成；Skill 的 action 是 `skill`，resource 是 Skill ID 或通配模式，effect 取 allow、ask 或 deny。规则按顺序求值，最后匹配的一条生效。 [@ref-opencode-skills-permissions-v2]

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "skill", "resource": "*", "effect": "allow" },
    { "action": "skill", "resource": "internal-*", "effect": "deny" },
    { "action": "skill", "resource": "experimental-*", "effect": "ask" }
  ]
}
```

旧的 `permission.skill` 对象仍被归一化：先展开旧 `tools` 规则与旧 `permission` 规则，再追加原生 `permissions`，因此原生规则的优先级高于旧写法。 deny 把该 Skill 从可用列表隐藏并拒绝访问，ask 在加载前要求批准。Agent 级规则写在该 Agent 的 `permissions` 里，位于 `agents` 记录下。 [@ref-opencode-skills-legacy-permissions-v2] [@ref-opencode-skills-permissions-v2]

同名冲突按注册顺序覆盖：每个来源按顺序加载，后处理到的来源用同 ID 的条目整体替换先前的条目，不合并正文也不保留命名空间。官方给出的来源优先级由低到高是：内置技能、`.claude/skills`、`.agents/skills`、`~/.config/opencode/skills`、项目 `.opencode/skills`、显式 `skills` 配置条目。 [@ref-opencode-skills-precedence-v2] [@ref-opencode-skills-scan-load-v2]

MCP 技能在这个覆盖规则上有一处例外：注册时若同 ID 已存在则跳过，不让 MCP 技能覆盖已有条目。 [@ref-opencode-skills-mcp-v2]

autoinvoke 为假的 Skill 不进入面向模型的可用技能列表，但仍保留注册并可按精确 ID 加载。 [@ref-opencode-skills-autoinvoke-code-v2] [@ref-opencode-skills-frontmatter-v2]

调用由模型发起：加载工具的输入是 Skill 的 id，工具在取出 Skill 后、构造输出前调用权限断言，资源名是 Skill id。 [@ref-opencode-skills-permission-gate-v2] 用户也可以在提示里以 `@skill-id` 直接引用技能，宿主会把该技能正文以 skill_content 块注入当前用户消息，效果与调用 skill 工具相同。 [@ref-opencode-skills-loading-doc-v2]

条件维度有三处可核对。`.claude` 兼容根在配置发现阶段由 `claude` 选项控制，取 false 时该数组整体为空，`.claude/skills` 不再被发现；`.agents` 兼容根没有对应开关，始终参与发现。 [@ref-opencode-skills-claude-roots] 命令行入口把 `OPENCODE_DISABLE_CLAUDE_CODE` 与 `OPENCODE_DISABLE_CLAUDE_CODE_SKILLS` 任一为真映射成 `claude: false`，官方文档同样只把这两个变量描述为停止读取 `.claude`；`OPENCODE_DISABLE_CLAUDE_CODE_PROMPT` 只影响提示词，不改变 Skill 根。 [@ref-opencode-skills-env-disable] [@ref-opencode-skills-env-code-v2] MCP 技能受 `mcp_skills` 标志控制，属于实验能力：本地与 dev 构建默认开启，发行版默认关闭，可在 `experimental.mcp_skills` 或 `OPENCODE_FLAGS` 中显式开启。 [@ref-opencode-skills-mcp-v2]

## 加载正文与资源 {#skills-loading}

每个模型步骤都会重建一次可用技能列表：只列出权限未 deny、带 description 且 autoinvoke 不为 false 的条目，内容只有 id、name 与 description，按 id 排序；列表变化时按新增、变化、移除三种增量重述，只有完全无差异时才整表重述。 [@ref-opencode-skills-autoinvoke-code-v2]

调用形态是：

```js
skill({ id: "git-release" })
```

加载工具按 id 取出 Skill，断言权限通过后返回目录与正文，并把 skill_content 模板作为内容交给模型：模板包含正文、基目录说明、一句“相对路径以该基目录解析”的提示、一句“文件列表是采样的”，以及最多 10 个文件路径。 [@ref-opencode-skills-permission-gate-v2] [@ref-opencode-skills-prepare-code-v2]

文件列表的取法分两种。目录型 SKILL.md 会递归扫描技能目录下的文件（按忽略规则，包含点文件），排序后取前 10 个，并排除 SKILL.md 本身；扫描根层的扁平 `.md` 技能没有文件列表；`skill://` URI 型技能（内置与 MCP）的文件列表来自虚拟文件清单，同样排除 SKILL.md 并取前 10 个，路径写成 `skill://` 加 id 与相对文件名。 [@ref-opencode-skills-prepare-code-v2]

正文不一定是内联字符串。Skill 服务允许条目带一个按需加载的 effect：这样的技能在列表中 content 为空，首次读取时才执行 loader；MCP 技能就是这种形态，读取后按 digest 缓存并在需要时触发重新注册。 [@ref-opencode-skills-content-api-v2] [@ref-opencode-skills-mcp-v2]

用户侧的直接加载入口是提示里的 `@skill-id`：TUI 的补全把技能作为提示的一部分，服务端在准备提示时读取该技能正文并注入 skill_content 块。 [@ref-opencode-skills-loading-doc-v2]

## 诊断与重载 {#skills-diagnostics}

服务端按位置查询 Skill 的接口是 `GET /api/skill`，返回当前注册的全部 Skill 及其 id、name、description、autoinvoke、路径与正文，这是核对“文件写了但没出现”的主要入口。对按需加载的技能，列表里的正文可能为空，需再读文件接口。 [@ref-opencode-skills-list-api-v2]

单个文件的读取入口是 `GET /api/experimental/skill/:skillID/file/*`：`SKILL.md` 返回去掉 frontmatter 的正文，其余路径返回对应文件；不属于该技能或不安全的路径按未找到处理。该接口标记为 experimental，可能不承诺兼容。 [@ref-opencode-skills-file-api-v2]

排查时先看列表里是否有目标 Skill，再对照 path 判断命中的是配置目录、扩展来源、内置来源还是兼容目录。命中范围的判定依据是扫描规则本身：隐藏目录与忽略目录不进入，深度超过 6 层的不进入，某目录出现 SKILL.md 后其子目录不再单独扫描，只有扫描根层的散装 `.md` 才会被收下。 [@ref-opencode-skills-scan-rules-v2] [@ref-opencode-skills-scan-load-v2]

重载不需要重启进程：来源目录、单个 Skill 文件以及配置文档的变化都会进入同一条事件流，去抖 100 毫秒后重扫一次并重新注册，配置更新事件则额外触发一次完整刷新。没有显式的立即重载命令。 [@ref-opencode-skills-reload-v2]

日志入口分三级：重扫时以 INFO 记一条 “skills rescanned”，带触发文件、来源键与最终 skill id 列表；每个来源加载完记一条 DEBUG 级别的 “skill source loaded”；frontmatter 不合法的文件记 DEBUG 级别的 “skill file skipped” 并附带原因。需要看这些日志时把日志级别调到 DEBUG。远端目录拉取失败记 “failed to load skill source” 警告并跳过该来源。 [@ref-opencode-skills-reload-v2] [@ref-opencode-skills-scan-load-v2]

ID 与 frontmatter 的常见错配也在这里核对：ID 是路径派生且大小写敏感的，frontmatter 的 name 只是显示名；缺少 description 的技能不会出现在模型可用列表中。 [@ref-opencode-skills-frontmatter-code-v2]
