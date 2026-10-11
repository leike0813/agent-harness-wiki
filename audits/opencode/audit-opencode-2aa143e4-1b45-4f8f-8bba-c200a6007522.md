# opencode 维护报告 20261011T015904Z（configuration / native_plugins / skills）

## 范围

- 来源：`source-opencode-repo`，baseline `388406238bd5ca15564a762840a2362c3a45bd9c` → observed `0d61729b3fa005cec9aa754c075a809663c736a4`（refs/heads/dev，4393 个提交）。
- `source-opencode-npm`：1.18.35 → 1.19.0，仅记录身份，未据此建立版本映射。
- 固定工作区：`ws-0d61729b3fa0-0d2ae98b-9aea-4c68-9a88-f3143b52301e`。
- 主题范围：configuration、native_plugins、skills。custom_agents、custom_providers、hooks、mcp、local_transcripts 未调查。

## configuration：结论改变

区间内 `packages/opencode` 整包被移除，配置实现迁至 `packages/core/src/config.ts` 与 `packages/core/src/config/discovery.ts`，CLI 迁至 `packages/cli`。以下差异直接影响已发布答案：

1. **诊断输出语义改变**。旧版 `opencode debug config` 通过 `Config.Service.get()` 打印合并后的最终配置；新版经 `GET /api/config` 取回 `Config.Entry[]`，按优先级从低到高打印配置文档与目录条目（`packages/cli/src/commands/handlers/debug/config.ts`，`packages/protocol/src/groups/config.ts`）。
2. **debug 子命令集合缩减**。CLI 的 debug 分组现在只有 agents、config、paths（`packages/cli/src/commands/commands.ts`），旧版注册的 lsp、ripgrep、file、scrap、skill、snapshot、startup、v2、info、wait 均不再存在。
3. **受管配置出现来源分歧**。文档仍描述 `/etc/opencode`、`%ProgramData%\opencode` 与 macOS `ai.opencode.managed` 偏好域；本提交源码中按这些路径与偏好名检索未再找到读取入口，改由 `packages/core/src/managed-policy.ts` 的组织策略语句与配置文档 `experimental.policies` 承担。config.trust 记为 conflict，两侧说法与适用边界均写入章节。
4. **键迁移明确化**。`autoupdate` → `update`（disable/notify/auto）、`permission`/`tools` → 有序 `permissions` 规则数组、`plugin` → `plugins` 条目、`skills` 对象 → 字符串数组，均在 `packages/core/src/config/normalize.ts` 有明确改写实现；CLI 侧另有 tui.json + kv.json 的独立迁移。config.migration 由 partial 升为 answered。

## skills：结论改变

1. **新增宿主识别的 metadata 键**：`opencode/slash`（暴露为 TUI `/name` 命令）与 `opencode/autoinvoke`（排除出模型可见列表），源码另有顶层 `disable-model-invocation` 字段，`opencode/autoinvoke` 优先。`Skill.Info` 增加 `autoinvoke` 字段。
2. **来源推导方式改变**：由配置条目中的目录派生 `skill/` 与 `skills/`，配置文档 `skills` 键的元素按路径或 URL 展开；`.claude/`、`.agents/` 兼容根由独立插件处理。
3. **扫描模式改变**为 `{*.md,**/SKILL.md}`，开启 symlink 与 dot。
4. **冲突规则**：按 Skill id 覆盖，后处理来源整体替换先前条目。
5. **`opencode debug skill` 已移除**，诊断入口改为服务端 `GET /api/skill`。
6. skills.conditions 保持 partial：旧提交中的 RuntimeFlags（disableExternalSkills、disableClaudeCodeSkills）在本提交固定范围内未找到对应来源位置。

## native_plugins：无影响

点名的两个提交经 `git merge-base --is-ancestor` 验证均不是 `0d61729b` 的祖先：

- `247eb5cc9a` fix(tui): allow plugin keymaps during setup (#53010)
- `8380c864bf` feat(plugin): add select dialog search and actions (#53009)

二者改动的 `packages/tui`、`packages/plugin/src/tui`、`packages/www/src/docs` 路径在本提交树中均不存在，因此对已记录插件答案无影响，未新建 edition。区间内 `packages/web/src/content/docs/plugins.mdx` 仅删除 Todo Events 一节，归属 Hooks 主题，按范围约定未处理。

## 候选产物

- 新建 `opencode-configuration-v4`、`opencode-skills-v3`；v3/v2 旧版保留未改。
- 新增 18 条 `git_source_file` artifact（commit 0d61729b，含 content_sha256）及对应 snapshot 与 reference。
- `registry/chapter-current.yaml` 在候选内选入两个新 edition。

## 复核

本轮结论推翻已发布的配置诊断步骤（debug config 输出语义、debug 子命令集合、debug skill 移除），并记录受管配置的来源冲突，满足高影响独立复核的触发条件。`review_status: pending`，须由独立 reviewer 就 config.sources、config.trust、config.diagnostics、config.migration 与 skills.format、skills.extensions、skills.invocation、skills.conditions、skills.diagnostics 复核。
