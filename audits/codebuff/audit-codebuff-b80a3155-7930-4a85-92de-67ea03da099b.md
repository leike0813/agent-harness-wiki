# codebuff 维护报告 audit-codebuff-b80a3155-7930-4a85-92de-67ea03da099b

## 来源身份变化

- `source-codebuff-repo`：`0d100eda9cd93b5a7e9ab8fa3f85c3703a1a09d8` → `7bffbd4b0a1966294260b5d201eb68cecb3cb6b5`（298 个文件，提交标题 "Sync public snapshot from freebuff-private"）。
- `source-codebuff-npm`：unchanged（`1.0.688`，integrity 相同）。
- 10 个 `source-codebuff-docs-*`：均为 changed，逐字比对后判定无正文影响（见下）。

## 语义 triage

对 scope.focus 点名的每个文件逐一 diff：

| 文件 | 变化 | 判定 |
| --- | --- | --- |
| `common/src/templates/initial-agents-dir/{README.md,my-custom-agent.ts,examples/*,skills/*,package.json,LICENSE}` | 整体删除，模板目录只剩 `types/` | 实质变化：skills 与 custom_agents 两章的模板引用失效 |
| `common/src/templates/initial-agents-dir/types/agent-definition.ts` | `compactContext` 注释由"模型写交接摘要"改为"进程内机械改写，不发模型请求"；`ModelName` 移除 `anthropic/claude-opus-4.1` | 实质变化：agents.format / agents.limits |
| `common/src/constants/agents.ts` | 新增 `AGENT_TRUST_GATE_HEADER` / `_VALUE` | 新增能力，未推翻已发布答案；已登记引用 `MAX_AGENT_STEPS_DEFAULT` 未变 |
| `common/src/constants/byok.ts` | 新增 `BYOK_LOCAL_USER_ID = 'byok-local'` | 等价重构（`sdk/src/run.ts` 同步改为引用常量） |
| `agents/base2/base2.ts` | 删除 `fast` 模式与 `isFast` / `hasNoValidation` 分支 | 只影响 hooks 章的 `ref-codebuff-root-toolnames`，hooks 不在本轮范围；该引用所支撑的 toolNames 结论在本轮仍成立 |
| `sdk/src/impl/model-provider.ts` | `FINAL_REFUSALS` 新增 503 `model_at_capacity` | 属 `providers.responses`，不在本轮 scope.questions（`providers.models` / `providers.metadata`）内；两题答案未变，登记证据不改正文 |
| `sdk/src/run.ts` | 字面量换常量、压缩注释措辞 | 等价重构 |

## 文档站变化：verified no-impact

对 10 个 docs 来源在 `archive/codebuff/` 中的新旧两份 `source.md` 逐字 diff：每个文件只有 `<head>` 里的 Next.js 预加载指纹与 CSS chunk 名变化（`bb3ef058…`/`e4af272c…` 与 `70bc3e13…`/`83afe278…` 两组互换），正文段落、代码块高亮内容、页脚导航文案逐字相同。不重写任何文档站引用、快照或章节。

## 候选变更

- `knowledge/codebuff/chapters/codebuff-cli-skills-v2.md`（新 edition）：`skills-roots-format` 小节删除已不存在的模板 `SKILL.md` 示例，改用 `/init` 实际写入清单（`ref-codebuff-init-type-files`）说明 `/init` 不写 skill 文件，最小示例按解析模式给出；`skills.roots` 另以新提交的 `resolveSkillsDirs`（`ref-codebuff-skills-dirs-20261009`）逐字复核。
- `knowledge/codebuff/chapters/codebuff-cli-custom-agents-v3.md`（新 edition）：`agents-entry` 更正 `/init` 只复制三个类型文件、不再写 `my-custom-agent.ts`；`agents.invocation` 去掉已删除模板 README 的用法引用，改引 CLI `--agent` 开关证据；`agents.format` 补 `ModelName` 当前 Anthropic 段并说明 `claude-opus-4.1` 已移出联合（别名映射仍在）；`agents.limits` 更正 `compactContext` 为进程内机械改写。
- `registry/chapter-current.yaml`：skills → v2，custom_agents → v3；custom_providers 保持 v2。

## 复核

未做独立复核：本轮变化是"删除示例模板 + 两处字段语义更正"，不构成高影响项（无来源冲突、无被推翻的已发布配置步骤、无跨主题加载机制改变）。仍引用 `review_status=pending` 的 `audit-codebuff-eda05354-7192-4f3c-bf52-a0915a62bf19`，故本审计保持 `pending`，不写 `reviewed_by` / `reviewed_at`。

## 未完成与后续

- `providers.responses` 的 503 `model_at_capacity` 终态拒绝已备好证据 `ref-codebuff-provider-capacity-refusal`，但不在本轮固定问题范围，留给后续维护。
- hooks 主题的 `ref-codebuff-root-toolnames`（`agents/base2/base2.ts`）在本轮失去 `'fast'` 分支上下文，待 hooks 主题下次维护时复核。