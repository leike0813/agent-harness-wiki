---
schema_version: 3
record_kind: production
edition_id: opencode-skills-v3
harness_id: opencode
topic: skills
title: OpenCode 的 Skills 机制
sections:
  - section_id: skills-locations
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-locations
      - ref-opencode-skills-discovery-scan
      - ref-opencode-skills-compat-roots
      - ref-opencode-skills-scan-glob
  - section_id: skills-authoring
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-frontmatter
      - ref-opencode-skills-metadata-keys
      - ref-opencode-skills-frontmatter-code
  - section_id: skills-extension-paths
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-skills-key
      - ref-opencode-skills-discovery-scan
      - ref-opencode-skills-list-api
  - section_id: skills-selection
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-permissions
      - ref-opencode-skills-permission-gate
      - ref-opencode-skills-autoinvoke-code
      - ref-opencode-skills-autoinvoke-doc
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-prepare-code
      - ref-opencode-skills-permission-gate
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-skills-list-api
      - ref-opencode-skills-collision
      - ref-opencode-skills-scan-glob
      - ref-opencode-skills-frontmatter-code
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-opencode-skills-locations
          - ref-opencode-skills-discovery-scan
          - ref-opencode-skills-compat-roots
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-locations
        status: answered
        source_refs:
          - ref-opencode-skills-discovery-scan
          - ref-opencode-skills-scan-glob
          - ref-opencode-skills-compat-roots
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs:
          - ref-opencode-skills-collision
          - ref-opencode-skills-frontmatter-code
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-authoring
        status: answered
        source_refs:
          - ref-opencode-skills-frontmatter
          - ref-opencode-skills-metadata-keys
          - ref-opencode-skills-frontmatter-code
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-extension-paths
        status: answered
        source_refs:
          - ref-opencode-config-skills-key
          - ref-opencode-skills-discovery-scan
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs:
          - ref-opencode-skills-prepare-code
          - ref-opencode-skills-permission-gate
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-selection
        status: answered
        source_refs:
          - ref-opencode-skills-permissions
          - ref-opencode-skills-permission-gate
          - ref-opencode-skills-autoinvoke-doc
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-selection
        status: partial
        source_refs:
          - ref-opencode-skills-permissions
          - ref-opencode-skills-autoinvoke-code
          - ref-opencode-skills-autoinvoke-doc
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs:
          - ref-opencode-skills-list-api
          - ref-opencode-skills-collision
          - ref-opencode-skills-scan-glob
---
本章依据固定源码提交 0d61729b 的官方文档与实现。该提交的源码树不等于 npm 包 opencode-ai@1.19.0 的运行时行为；下文路径、字段与接口属于固定源码知识，对 1.19.0 二进制的适用性尚未建立映射。示例中的凭据一律写成占位符。

## Skill 的存放位置与扫描范围 {#skills-locations}

OpenCode 以“一个目录一个 Skill”为单位组织能力，每个目录里的 SKILL.md 是入口文件。文档给出的查找位置仍是六项：项目配置 .opencode/skills/name/SKILL.md、全局配置 ~/.config/opencode/skills/name/SKILL.md，以及 .claude/ 与 .agents/ 两套兼容目录各自的项目级与全局级对应路径。 [@ref-opencode-skills-locations]

实现侧的入口是配置发现结果，而不是硬编码路径。加载器从配置条目里取出所有 directory 条目，对每个目录同时注册 skill/ 与 skills/ 两个子目录，再把配置文档 skills 键里的每一项按路径或 URL 展开为来源。 [@ref-opencode-skills-discovery-scan] 兼容目录由独立的兼容插件负责，它把 .claude/ 与 .agents/ 根目录下的 skills/ 子目录作为来源。 [@ref-opencode-skills-compat-roots]

扫描模式在实现中是 `{*.md,**/SKILL.md}`，同时开启 symlink 与 dot，因此目录根下的散装 `.md` 文件与嵌套的 SKILL.md 都会被读取，隐藏目录也被纳入。 [@ref-opencode-skills-scan-glob]

## 编写一个 SKILL.md {#skills-authoring}

SKILL.md 是可编辑的文本入口。项目级放在 .opencode/skills/{name}/SKILL.md，全局级放在 ~/.config/opencode/skills/{name}/SKILL.md，两者格式相同。文档列出的 frontmatter 字段是 name（必填）、description（必填）、license（可选）、compatibility（可选）与 metadata（可选，字符串到字符串映射）。 [@ref-opencode-skills-frontmatter]

本提交新增了一条明确要求：OpenCode 特有行为写在 metadata 里，不要新增自定义顶层字段。宿主识别两个可选的 metadata 键：opencode/slash 设为 "true" 时把该 Skill 暴露为 TUI 里的斜杠命令；opencode/autoinvoke 设为 "false" 时把它排除在面向模型的自动选择提示之外。Agent Skills 规范规定 metadata 取值为字符串，引号形式是可移植写法，OpenCode 也接受 YAML 布尔值。 [@ref-opencode-skills-metadata-keys]

```markdown
---
name: git-release
description: 根据已合并的 PR 起草发布说明，并给出 gh release create 命令
license: MIT
compatibility: opencode
---

Use this skill when preparing a tagged release.
```

上面的示例是最小形态；宿主特有开关写在 metadata 映射里，写作时把 metadata 与其下的 audience、opencode/slash 等键作为同一个映射插入 frontmatter。 [@ref-opencode-skills-metadata-keys]

解析实现只读取 name、description、metadata 与 disable-model-invocation 四个 frontmatter 字段；license 与 compatibility 被文档接受但不进入解析结构。Skill 的 id 取自文件名或所在目录名，name 缺省时回退到 id；opencode/autoinvoke 优先于顶层 disable-model-invocation，后者为真时等价于前者为假。 [@ref-opencode-skills-frontmatter-code]

前提是目录名与 name 一致且 frontmatter 是合法 YAML。生效结果是发现阶段解析出 id、name、description 与可选的 autoinvoke。检查方式见诊断一节。

## 扩展目录与远端来源 {#skills-extension-paths}

追加 Skill 来源的配置键是 opencode.json 顶层的 skills。本提交把它写成字符串数组，元素既可以是本地目录也可以是 http 或 https 地址；旧的对象形式（paths 与 urls 两个子键）由配置归一化层展开合并进同一个数组，因此两种写法都能被接受。 [@ref-opencode-config-skills-key]

```json
{
  "$schema": "https://opencode.ai/config.json",
  "skills": ["~/.config/opencode/skills-extra", "https://skills.example.com/catalog"]
}
```

以 ~/ 开头时展开到 home，绝对路径原样使用，相对路径基于当前工作目录解析；能被 URL 解析且协议为 http 或 https 的元素按远端索引处理，交给拉取流程下载后再按同一模式扫描。示例里的远端地址只是示意占位，固定来源没有声明这样一个远端真实可用。 [@ref-opencode-skills-discovery-scan]

扩展来源是否真的被发现，可以用诊断接口返回的 path 字段核对：来自配置目录的条目落在该目录下的 skill 或 skills 子目录里，扩展来源则落在配置里写出的那个路径本身。 [@ref-opencode-skills-list-api]

## 权限、可见性与调用 {#skills-selection}

Skill 的可用性由权限控制，权限写在 opencode.json 的 permission.skill 下，键是 Skill 名或通配模式，值是动作：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "skill": {
      "*": "allow",
      "internal-*": "deny",
      "experimental-*": "ask"
    }
  }
}
```

allow 立即加载，ask 在加载前要求用户批准，deny 把该 Skill 从可用列表隐藏并拒绝访问。加载工具在取出 Skill 之后、构造输出之前调用权限断言，断言的资源名是 Skill id。 [@ref-opencode-skills-permissions] [@ref-opencode-skills-permission-gate]

除了权限，还有一个只影响模型可见性的开关：autoinvoke 为假的 Skill 不进入面向模型的可用技能列表，但仍可按精确名称手工选中并加载。实现把这条过滤与描述缺失的判断写在一起，两者都不进入该列表。 [@ref-opencode-skills-autoinvoke-code] [@ref-opencode-skills-autoinvoke-doc]

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "skill": { "internal-*": "deny" }
  },
  "agent": {
    "plan": {
      "tools": { "skill": false }
    }
  }
}
```

调用由模型发起：加载工具的输入是 Skill 的 id，用户没有单独的运行 Skill 命令。运行时特性开关在旧提交中以 disableExternalSkills、disableClaudeCodeSkills 形式存在；本提交的固定范围内未找到对应的来源位置，相关条件仍属缺口，因此本节对条件维度保持 partial。 [@ref-opencode-skills-permissions]

## 加载正文与资源 {#skills-loading}

调用形态是：

```js
skill({ id: "git-release" })
```

加载工具按 id 取出 Skill，断言权限通过后返回该 Skill 的 name、基目录与构造好的输出文本。 [@ref-opencode-skills-permission-gate] 输出模板包含 Skill 正文、基目录说明、一句“相对路径以该基目录解析”的提示，以及一句“文件列表是采样的”，随后是最多 10 个同目录文件路径；只有当入口文件名是 SKILL.md 时才会采样这些文件，否则文件列表为空。 [@ref-opencode-skills-prepare-code]

由此可推断：Skill 里的 scripts/、reference/ 等相对路径以 Skill 目录为基准解析；给出的清单是采样而非完整列举，因此不要把“没列出来”当成“文件不存在”。 [@ref-opencode-skills-prepare-code]

## 诊断与重载 {#skills-diagnostics}

旧提交提供的 opencode debug skill 命令在本提交已不存在，取代它的是服务端按位置查询 Skill 的接口，返回当前注册的全部 Skill 及其 id、name、description、autoinvoke、路径与正文。 [@ref-opencode-skills-list-api]

排查“文件写了但没出现”时，先看该接口返回的列表里是否有目标 Skill，再对照 path 判断命中的是配置目录、扩展来源还是兼容目录；命中范围的判定依据是扫描模式本身，目录根下的散装 .md 与嵌套 SKILL.md 都会被收进来。 [@ref-opencode-skills-scan-glob] 同名冲突按 id 覆盖，后处理到的来源整体替换先前条目，不合并正文也不保留命名空间；id 取自文件名或所在目录名。 [@ref-opencode-skills-collision] [@ref-opencode-skills-frontmatter-code]

如果 Skill 出现在列表里却始终不被模型调用，按文档顺序检查 frontmatter 是否含 name 与 description、权限是否 deny，再检查 metadata 里的 opencode/autoinvoke 是否设为 "false"。 [@ref-opencode-skills-autoinvoke-doc]

Skill 目录设有文件监听：来源目录与配置文档变化都会触发去抖后重扫并重新注册，因此改动文件后不需要重启进程。固定来源未给出显式的立即重载命令，具体去抖时长与重扫日志格式仍属未记录细节。
