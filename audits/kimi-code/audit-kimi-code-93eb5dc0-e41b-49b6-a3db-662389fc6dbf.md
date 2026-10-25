# Kimi Code 上游审阅报告 · audit-kimi-code-93eb5dc0 · 2026-10-13

## 给维护者的结论

`source-kimi-code-repo` 由 `cbd75404` 移动到 `b510fa9e`（feat(kap-server): add remote control device deletion），单提交，101 个文件。其中只有一处改动了本轮范围内的已发布机制：**插件技能改用限定名 `<pluginId>:<skillName>` 登记**，连带影响同名解析、模型清单里的技能名与手动调用形式。清单 `name` 校验正则放宽是第二处真实变化。SKILL.md 的文件格式解析没有变化。

据此新建两份完整章节版本（`kimi-code-cli-skills-v2`、`kimi-code-cli-native_plugins-v2`），旧版本保留不动；两处结论都改写了已发布的机制表述，按契约保持 `review_status: pending` 并交独立复核。`registry/chapter-current.yaml` 未切换。

## 两个已引证据文件的逐文件 delta

### packages/agent-core-v2/src/features/skill/catalog/registry.ts（+19 −9）

- `register()` 开头新增分支：`skill.plugin !== undefined` 时直接调用 `registerPluginSkill` 并 **提前 return**，此前的 `this.byName.set(key, skill)` 完全不再执行（36-45 行）。这意味着带插件上下文的技能**不再占用裸名键**。
- 私有方法 `indexPluginSkill` 重写为 `registerPluginSkill`（123-139 行）：签名多一个 `plugin: SkillPluginContext` 参数、去掉默认值；函数体从「只写 `byPluginAndName`」改为「同时写两个索引」——`byPluginAndName` 存裸名副本，另把 `${plugin.id}:` 前缀加到名字上写进 `byName`。前缀剥离逻辑（`startsWith` + `slice`）使重复登记幂等。
- `escapeRegExp` 的 `value.replace(...)` 改为 `value.replaceAll(...)`（289 行），纯机械改写，不改语义。

### apps/kimi-code/src/tui/kimi-tui.ts（+约 300 −约 250，重写为主）

技能激活路径合并为一条：`sendSkillActivation` 及其 `activateSkill` 调用被删除，`prepareSkillActivations` / `runInlineSkillActivations` 抽出为独立方法，媒体占位符改写与暂存租约的释放集中管理。与本轮固定问题相关的实质点只有一处：转向（steer）路径提交技能时传 `{ steerIfActive: true }`（2249-2256 行），其余为消息渲染、按键与租约生命周期改动。

## 逐问题判定

| 问题 | 判定 | 依据 |
| --- | --- | --- |
| skills.collision | **答案改变** | 裸名索引不再接受插件技能；同名技能从不同插件各自保留在限定名下；限定前缀不叠加 |
| skills.format | **不受影响** | frontmatter 解析、别名规整、类型白名单、占位符展开所在文件（`catalog/fileSkillDiscovery.ts`、`catalog/types.ts` 等）不在 101 个变更文件内 |
| skills.loading | **答案改变** | 模型清单打印登记名（即限定名），技能工具要求「copied verbatim from the current skill listing」；`promptWithSkills` 新增 `steerIfActive`，技能正文可并入正在运行的一轮 |
| plugins.discovery | **答案改变** | `PLUGIN_NAME_REGEX` 放宽并保留 `normalizePluginId` 小写化；`manifest.ts` 是唯一调用点；插件技能的限定名与命令优先级规则进入发现与命名冲突小节 |

## 打开的 changeset：线索与结论分开

四个 changeset 只当线索，机制主张一律回到实现：

- **plugin-skill-qualified-names**（minor）— 指向 `registerPluginSkill` 的重写。核对实现后确认：同名技能全部按限定名保留、裸名不再解析到插件技能。写入 `skills.collision`。
- **unify-skill-prompts**（minor）— 技能卡片改高亮提示、Ctrl-S 支持技能提示。对应 `kimi-tui.ts` 的合并提交路径与 `promptWithSkills` 的 `steerIfActive`，写入 `skills.loading`。changeset 文本本身未被当作证据。
- **plugin-name-validation**（patch）— 清单 `name` 输入校验。**确实改变一条已发布的发现规则**：`[a-z0-9][a-z0-9_-]{0,63}` 不再成立，新规则允许大写、点分段与单个 `@` 后缀。因此写入 `plugins.discovery`，并顺带修正 `plugins-package` 小节里同一表述的两处。
- **select-tools-failure-reasons**（patch）— 工具选择与失败原因提示。不涉及 skills 与 native_plugins 的任何固定问题，排除。

## 排除项

- `packages/kap-server`、`packages/remote-control` 的设备删除功能（任务显式排除的独立特性）。
- `apps/kimi-code/src/tui` 下其余 UI/呈现、编辑按键、消息回放与租约改动；`apps/vscode` 的 replay 适配；`packages/node-sdk` 与 `packages/klient` 的传输层类型扩展（`steerIfActive` 透传）；`toolPolicy`/`toolSelect`/`selectTools` 相关改动；`contextMemory` 与遥测事件改动。这些都不在两个主题的固定问题范围内，也不构成技能或插件的发现/加载入口。
- `docs/en/reference/slash-commands.md` 与 `docs/en/reference/tools.md` 同提交改写：前者是限定名规则的文档侧表述（已作为佐证记入 native_plugins 章节），后者是 `WaitFor` 与 Ctrl-S 转向的说明，属 tools 主题，不在本轮范围。

## 证据与边界

新增 12 条 reference，全部绑定到 commit `b510fa9e` 上对应文件的 `git_source_file` artifact 与 snapshot，逐条记录文件相对路径、行区间与逐字摘录（行区间已逐条比对确认命中源码原文）。8 份新 artifact/snapshot 记录 commit、仓库相对 file 与 content_sha256，未写入任何临时路径。

源码 commit `b510fa9e` 只证明源码树，**不**证明 npm 发行版 `2.1.1` 含这些行为，本轮不写映射。

## 交付与复核

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题 | 结果 |
| --- | --- | --- | --- |
| skills | kimi-code-cli-skills-v2 | skills.collision、skills.loading（答案改变）；skills.format（不受影响） | 新建完整版本，v1 保留 |
| native_plugins | kimi-code-cli-native_plugins-v2 | plugins.discovery（答案改变） | 新建完整版本，v1 保留 |

**发布：** `delivery=pr`，未运行 `pnpm ahw publish`、`pnpm chapters:update`、`pnpm managed:packages` 或 `sources:scan`；`registry/chapter-current.yaml` 维持 `kimi-code-cli-skills-v1` 与 `kimi-code-cli-native_plugins-v1`。

**复核：** 结论改写了已发布的机制表述（同名解析规则、清单校验规则、调用形式），触发高影响独立复核条件；`pending_question_ids` 保留 `skills.collision`、`skills.loading`、`plugins.discovery`，`review_status: pending`，由协调者安排只读 reviewer 在合并前复核。未做作者自审结案。

**自检：** `pnpm maintenance:candidates check --candidate <candidate-root>` 通过。