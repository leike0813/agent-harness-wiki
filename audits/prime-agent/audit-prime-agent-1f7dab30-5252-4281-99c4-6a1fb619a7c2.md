# prime-agent 巡检维护报告（audit-prime-agent-1f7dab30-5252-4281-99c4-6a1fb619a7c2）

## 观察到的来源变化

`source-prime-agent-repo`（`https://github.com/PrimeIntellect-ai/prime-agent.git`）由基线 `967eb13fd488507af5f590e9c6ea8b2672f1fc05` 变为观察提交 `2ee7e623a70d8ccd9c72ffc6c4f25be2cc1bc02d`。`git rev-list --count 967eb13..2ee7e623` 复核为 40 个提交。本轮工作区：`ws-2ee7e623a70d-ee71f12b-ec87-4a68-9846-5ecb327ec5a2`（pinned checkout，只读）。

范围限定为 `configuration` 与 `custom_agents` 两个主题及其固定问题。

## 写入章节的实质变更

### 1. configuration：commit `1e894a62c20f07311b39130fde6088fa72cecb5c`（#3413）

按模型给系统提示追加片段的机制被整体换掉：随包的 `per_model.md` 块标记机制删除，改为 TOML 规则表。

- **新的配置文档**：用户侧 `$AGENT_DIR/model-prompts.toml`，随包层 `crates/pa-core/src/prompts/layers/model_prompts.toml` 只有注释、内嵌文件表为空。文件缺失即规则为空，缺失不算错误。
- **两层顺序**：随包层 → 用户层；命中规则里的 markdown 按首次出现位置去重拼接，同名文件由用户层覆盖随包层；合成一个静态 `model-prompts` 提示段，位于缓存前缀内、动态尾部之前；无命中则该段不存在。
- **匹配**：对解析后的 `provider/id` 选择器的尾部若干段做大小写不敏感 glob 比较，先剥掉可解析为思考级别的 `:suffix`。
- **约束**：`deny_unknown_fields`（只认 `rule` 表，`rule` 只认 `match`/`files`）；`files` 拒绝绝对路径、根前缀、`..`；解析后必须仍在 agent 目录内且是普通文件。
- **失败语义**：任何一层任何问题都让本次会话的全部追加失效，且不阻塞模型使用。
- **诊断**：会话给出一条 `model_prompt_error` 状态行（`display: true`，被 `convert_to_llm` 从 LLM 上下文剔除）；`prime-agent prompt --model SELECTOR` 可预览。

命中 `config.sources`、`config.diagnostics`；`config.overrides`、`config.runtime`、`config.trust`、`config.defaults`、`config.migration` 无实质变化。新版本 `prime-agent-cli-configuration-v4`。

### 2. custom_agents：commit `b3496ee86a55f34b92d1fc30c821588e5f90c4a4`（#3434）

session role 段新增 daemonless 分支，判定条件是 `config.rlm_subagent_host.is_none()`；命中时追加一行，说明 `rlm.spawn` 将报错、轮次结束后不会有任何唤醒、应自行完成全部工作。

命中 `agents.roles`、`agents.limits`：`rlm.spawn` 的可用性除权限与深度外还取决于运行形态。新版本 `prime-agent-cli-custom_agents-v3`。

## 无实质影响

- commit `80dfbf51cb324f79b8501e6fd4464029f87b915c`（#3405，Release print session leases after runtime writers stop）：只改 `crates/pa-cli/src/print_runtime.rs`，把 print 模式的会话租约移到 tokio runtime 之外持有，使正常返回、错误与 panic 路径都在停掉 runtime writer 之后释放所有权。不触及 `configuration` 或 `custom_agents` 的任何固定问题，不改章节。

## 明确排除（任务指定，未调查）

- `846656dc6` prepare prime agent 0.10.0 release（#3441）：版本与发布记账。
- `a942de95d` fix windows update file flush permissions（#3421）：Windows 更新文件权限。
- `abadccba3` Rewrite the bash background rule: no await, collect on notification（#3436）：bash 后台规则，与两个主题的固定问题无关。
- 全部 `.changes/*.md` 与测试改动。

排除主题（未触碰）：skills、mcp、hooks、native_plugins、custom_providers、local_transcripts。

## 待复核

`pending_question_ids` 为空。`review_status` 置为 `pending`，由协调者独立复核。

本轮只写入本候选根目录，未运行 `pnpm ahw publish`、`maintenance:candidates plan`、`managed:packages`，未创建 git commit。