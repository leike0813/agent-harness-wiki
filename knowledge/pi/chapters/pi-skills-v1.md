---
schema_version: 3
record_kind: production
edition_id: pi-skills-v1
harness_id: pi
topic: skills
title: Pi Skills：发现、格式与调用（固定源码 781152f）
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-locations
      - ref-pi-skills-discovery
      - ref-pi-res-code-project-order
      - ref-pi-res-code-user-order
      - ref-pi-skills-code-discovery
      - ref-pi-skills-validation
      - ref-pi-skills-code-collision
      - ref-pi-settings-resources
      - ref-pi-packages-dedupe
  - section_id: skills-format
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-structure
      - ref-pi-skills-format
      - ref-pi-skills-validation
      - ref-pi-settings-resources
      - ref-pi-packages-structure
      - ref-pi-skills-loading
  - section_id: skills-run
    surface_ids: [cli]
    source_refs:
      - ref-pi-skills-invocation
      - ref-pi-skills-format
      - ref-pi-settings-resources
      - ref-pi-skills-validation
      - ref-pi-skills-code-collision
      - ref-pi-ext-resources-discover
      - ref-pi-ext-reload
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs:
          - ref-pi-skills-locations
          - ref-pi-skills-discovery
          - ref-pi-res-code-project-order
          - ref-pi-res-code-user-order
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs:
          - ref-pi-skills-discovery
          - ref-pi-skills-code-discovery
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs:
          - ref-pi-skills-validation
          - ref-pi-skills-code-collision
          - ref-pi-res-code-project-order
          - ref-pi-res-code-user-order
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs:
          - ref-pi-skills-discovery
          - ref-pi-settings-resources
          - ref-pi-packages-dedupe
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-pi-skills-structure
          - ref-pi-skills-format
          - ref-pi-skills-validation
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-pi-skills-format
          - ref-pi-settings-resources
          - ref-pi-packages-structure
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-pi-skills-loading
          - ref-pi-skills-structure
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-run
        status: answered
        source_refs:
          - ref-pi-skills-invocation
          - ref-pi-skills-format
          - ref-pi-settings-resources
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-run
        status: partial
        source_refs:
          - ref-pi-skills-validation
          - ref-pi-skills-code-collision
          - ref-pi-ext-resources-discover
          - ref-pi-ext-reload
body: |-
  固定来源为 pi-mono 仓库提交 781152fc 的 Pi coding agent 包（包内文档与源码）。本章描述该固定来源记录的机制，不据此断言某个 npm 包版本已具备相同行为；本库没有为 Pi 建立软件版本映射，因此按 source_only 阅读。

  ## 发现位置与优先级 {#skills-roots}

  **skills.roots**：Pi 从几类位置装载 Skill：全局 `~/.pi/agent/skills/` 与 `~/.agents/skills/`；项目 `.pi/skills/` 与从当前目录逐级向上直到 git 根（不在仓库时到文件系统根）的每一级 `.agents/skills/`；包内的 `skills/` 目录或 `package.json` 的 `pi.skills` 条目；settings 的 `skills` 数组；以及可重复的 `--skill` 路径参数，它即使配合 `--no-skills` 也会追加加载。[@ref-pi-skills-locations] 祖先 `.agents/skills` 的扫描范围来自源码 collectAncestorAgentsSkillDirs：从起始目录逐级上溯并在 git 根停止。[@ref-pi-skills-discovery] 默认自动发现的登记顺序是项目组在前、用户组在后：先登记 `.pi/skills` 与项目祖先 `.agents/skills`，再登记用户 `~/.pi/agent/skills` 与 `~/.agents/skills`。[@ref-pi-res-code-project-order][@ref-pi-res-code-user-order] 路径随 home、当前目录与 git 根变化；固定来源没有给出用环境变量改写这些根的做法，这一点是本地缺口。

  **skills.discovery**：发现发生在启动扫描阶段。在 `.pi/skills/` 与 `~/.pi/agent/skills/` 中，根目录下的 `.md` 文件按单个 Skill 发现；所有位置中，含 `SKILL.md` 的目录按 Skill 根处理并停止继续下钻；否则递归子目录寻找 `SKILL.md`；`.agents/skills` 忽略根目录的 `.md`。[@ref-pi-skills-discovery] 源码把规则写成：目录内命中 SKILL.md 即返回、不再递归；否则加载根目录的直接 .md 子文件；跳过点开头目录与 node_modules，并应用 .gitignore/.ignore/.fdignore。[@ref-pi-skills-code-discovery] 文档没有规定目录深度上限，也没有说明符号链接循环如何处理，这两点是本地缺口。

  **skills.collision**：同名 Skill 产生警告并保留先发现者，后出现者不单独载入。[@ref-pi-skills-validation] 源码实现为按 name 的 Map：先到者写入，后到的同名项只记录 collision 诊断（含 winnerPath 与 loserPath），同一文件经符号链接重复出现则静默跳过。[@ref-pi-skills-code-collision] 结合默认登记顺序（项目组先行），同名时项目侧更可能胜出；此判断来自源码顺序，未在运行中观察。[@ref-pi-res-code-project-order][@ref-pi-res-code-user-order]

  **skills.conditions**：`--no-skills` 关闭默认发现，但显式 `--skill` 路径仍加载。[@ref-pi-skills-discovery] Skill 是否注册为 `/skill:name` 命令由 `enableSkillCommands`（默认 true）决定；settings 的 `skills` 数组与包内 Skill 都要经过启用/禁用过滤，可用 `pi config` 或 `!pattern`、`-path` 收窄。[@ref-pi-settings-resources][@ref-pi-packages-dedupe] 固定来源没有说明项目信任级别对 Skill 的额外限制，也没有说明 interactive、rpc、sdk 等启动入口是否改变发现范围，这些条件尚未覆盖。

  ## 格式与加载 {#skills-format}

  **skills.format**：Skill 是含 `SKILL.md` 的目录，其余内容自由组织；`SKILL.md` 由 YAML frontmatter 与正文组成，正文即指令，脚本和资源用相对 Skill 目录的路径引用。[@ref-pi-skills-structure] frontmatter 必填 `name`（最长 64，小写字母、数字、连字符，须与父目录同名）与 `description`（最长 1024）；可选 `license`、`compatibility`、`metadata`、`allowed-tools`、`disable-model-invocation`；未知字段被忽略。[@ref-pi-skills-format] 校验大多只告警仍加载，唯独 description 完全缺失的 Skill 不加载。[@ref-pi-skills-validation]

  **skills.extensions**：第一方扩展点包括 frontmatter 的 `disable-model-invocation`（为 true 时从系统提示隐藏，只能显式 `/skill:name` 调用）与 `allowed-tools`（文档标注 experimental 的预批准工具列表）。[@ref-pi-skills-format] settings 的 `enableSkillCommands` 控制命令注册，资源数组支持 glob 与 `!pattern` 排除；包可在 `package.json` 的 `pi` 清单里用 `skills` 声明 Skill 目录。[@ref-pi-settings-resources][@ref-pi-packages-structure] 这些字段的默认值与解析细节文档未逐项列出，属本地缺口。

  **skills.loading**：启动时只抽取每个 Skill 的 name 与 description，并把可用 Skill 以 XML 列进系统提示；当任务匹配时，模型用 read 工具读取完整 `SKILL.md`，正文里的相对路径按 Skill 目录解析。[@ref-pi-skills-loading] 这是渐进式披露：只有描述常驻上下文，完整指令按需加载。[@ref-pi-skills-structure] 文档明确指出模型不总会主动读取，可以用提示或 `/skill:name` 强制。

  ## 调用与诊断 {#skills-run}

  **skills.invocation**：Skill 注册为 `/skill:name` 命令，可带参数，命令后的参数以 `User:` 前缀追加到 Skill 内容。[@ref-pi-skills-invocation] 自动调用由模型依据 description 判断，并受 `disable-model-invocation` 与 `enableSkillCommands` 影响；后者默认开启，可在 `/settings` 或 settings.json 关闭。[@ref-pi-skills-format][@ref-pi-settings-resources]

  **skills.diagnostics**：能观察到的诊断是发现阶段的 warning：名称不合规、描述过长、同名冲突，以及描述缺失即不加载。[@ref-pi-skills-validation] 冲突诊断带 winnerPath/loserPath，可用来定位“改了却没生效”的同名问题。[@ref-pi-skills-code-collision] 扩展可在 `resources_discover` 事件里追加 Skill 路径，自动发现目录中的扩展可用 `/reload` 热重载。[@ref-pi-ext-resources-discover][@ref-pi-ext-reload] 缺口：固定来源没有“列出当前已加载 Skill 及其来源”的命令，也没有单独重载 Skill 的入口，验证发现结果需要另做运行观察。

---
固定来源为 pi-mono 仓库提交 781152fc 的 Pi coding agent 包（包内文档与源码）。本章描述该固定来源记录的机制，不据此断言某个 npm 包版本已具备相同行为；本库没有为 Pi 建立软件版本映射，因此按 source_only 阅读。

## 发现位置与优先级 {#skills-roots}

**skills.roots**：Pi 从几类位置装载 Skill：全局 `~/.pi/agent/skills/` 与 `~/.agents/skills/`；项目 `.pi/skills/` 与从当前目录逐级向上直到 git 根（不在仓库时到文件系统根）的每一级 `.agents/skills/`；包内的 `skills/` 目录或 `package.json` 的 `pi.skills` 条目；settings 的 `skills` 数组；以及可重复的 `--skill` 路径参数，它即使配合 `--no-skills` 也会追加加载。[@ref-pi-skills-locations] 祖先 `.agents/skills` 的扫描范围来自源码 collectAncestorAgentsSkillDirs：从起始目录逐级上溯并在 git 根停止。[@ref-pi-skills-discovery] 默认自动发现的登记顺序是项目组在前、用户组在后：先登记 `.pi/skills` 与项目祖先 `.agents/skills`，再登记用户 `~/.pi/agent/skills` 与 `~/.agents/skills`。[@ref-pi-res-code-project-order][@ref-pi-res-code-user-order] 路径随 home、当前目录与 git 根变化；固定来源没有给出用环境变量改写这些根的做法，这一点是本地缺口。

**skills.discovery**：发现发生在启动扫描阶段。在 `.pi/skills/` 与 `~/.pi/agent/skills/` 中，根目录下的 `.md` 文件按单个 Skill 发现；所有位置中，含 `SKILL.md` 的目录按 Skill 根处理并停止继续下钻；否则递归子目录寻找 `SKILL.md`；`.agents/skills` 忽略根目录的 `.md`。[@ref-pi-skills-discovery] 源码把规则写成：目录内命中 SKILL.md 即返回、不再递归；否则加载根目录的直接 .md 子文件；跳过点开头目录与 node_modules，并应用 .gitignore/.ignore/.fdignore。[@ref-pi-skills-code-discovery] 文档没有规定目录深度上限，也没有说明符号链接循环如何处理，这两点是本地缺口。

**skills.collision**：同名 Skill 产生警告并保留先发现者，后出现者不单独载入。[@ref-pi-skills-validation] 源码实现为按 name 的 Map：先到者写入，后到的同名项只记录 collision 诊断（含 winnerPath 与 loserPath），同一文件经符号链接重复出现则静默跳过。[@ref-pi-skills-code-collision] 结合默认登记顺序（项目组先行），同名时项目侧更可能胜出；此判断来自源码顺序，未在运行中观察。[@ref-pi-res-code-project-order][@ref-pi-res-code-user-order]

**skills.conditions**：`--no-skills` 关闭默认发现，但显式 `--skill` 路径仍加载。[@ref-pi-skills-discovery] Skill 是否注册为 `/skill:name` 命令由 `enableSkillCommands`（默认 true）决定；settings 的 `skills` 数组与包内 Skill 都要经过启用/禁用过滤，可用 `pi config` 或 `!pattern`、`-path` 收窄。[@ref-pi-settings-resources][@ref-pi-packages-dedupe] 固定来源没有说明项目信任级别对 Skill 的额外限制，也没有说明 interactive、rpc、sdk 等启动入口是否改变发现范围，这些条件尚未覆盖。

## 格式与加载 {#skills-format}

**skills.format**：Skill 是含 `SKILL.md` 的目录，其余内容自由组织；`SKILL.md` 由 YAML frontmatter 与正文组成，正文即指令，脚本和资源用相对 Skill 目录的路径引用。[@ref-pi-skills-structure] frontmatter 必填 `name`（最长 64，小写字母、数字、连字符，须与父目录同名）与 `description`（最长 1024）；可选 `license`、`compatibility`、`metadata`、`allowed-tools`、`disable-model-invocation`；未知字段被忽略。[@ref-pi-skills-format] 校验大多只告警仍加载，唯独 description 完全缺失的 Skill 不加载。[@ref-pi-skills-validation]

**skills.extensions**：第一方扩展点包括 frontmatter 的 `disable-model-invocation`（为 true 时从系统提示隐藏，只能显式 `/skill:name` 调用）与 `allowed-tools`（文档标注 experimental 的预批准工具列表）。[@ref-pi-skills-format] settings 的 `enableSkillCommands` 控制命令注册，资源数组支持 glob 与 `!pattern` 排除；包可在 `package.json` 的 `pi` 清单里用 `skills` 声明 Skill 目录。[@ref-pi-settings-resources][@ref-pi-packages-structure] 这些字段的默认值与解析细节文档未逐项列出，属本地缺口。

**skills.loading**：启动时只抽取每个 Skill 的 name 与 description，并把可用 Skill 以 XML 列进系统提示；当任务匹配时，模型用 read 工具读取完整 `SKILL.md`，正文里的相对路径按 Skill 目录解析。[@ref-pi-skills-loading] 这是渐进式披露：只有描述常驻上下文，完整指令按需加载。[@ref-pi-skills-structure] 文档明确指出模型不总会主动读取，可以用提示或 `/skill:name` 强制。

## 调用与诊断 {#skills-run}

**skills.invocation**：Skill 注册为 `/skill:name` 命令，可带参数，命令后的参数以 `User:` 前缀追加到 Skill 内容。[@ref-pi-skills-invocation] 自动调用由模型依据 description 判断，并受 `disable-model-invocation` 与 `enableSkillCommands` 影响；后者默认开启，可在 `/settings` 或 settings.json 关闭。[@ref-pi-skills-format][@ref-pi-settings-resources]

**skills.diagnostics**：能观察到的诊断是发现阶段的 warning：名称不合规、描述过长、同名冲突，以及描述缺失即不加载。[@ref-pi-skills-validation] 冲突诊断带 winnerPath/loserPath，可用来定位“改了却没生效”的同名问题。[@ref-pi-skills-code-collision] 扩展可在 `resources_discover` 事件里追加 Skill 路径，自动发现目录中的扩展可用 `/reload` 热重载。[@ref-pi-ext-resources-discover][@ref-pi-ext-reload] 缺口：固定来源没有“列出当前已加载 Skill 及其来源”的命令，也没有单独重载 Skill 的入口，验证发现结果需要另做运行观察。

