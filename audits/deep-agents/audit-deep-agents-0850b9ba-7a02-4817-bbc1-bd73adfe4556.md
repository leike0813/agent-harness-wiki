# deep-agents 来源复核报告（`audit-deep-agents-0850b9ba`）

- 产品 / 界面：`deep-agents` / `cli`
- 审计日期：2026-10-12（观察冻结），本轮复核与改写：2026-10-13
- 候选根：`/tmp/ahw-batch-1791831061/candidates/deep-agents`
- 结论：`status: changed`、`review_status: pending`（`skills.diagnostics` 仍未完成）

## 1. 来源变化与固定位置

| 来源 | 基线 | 观察值 | 读取位置 |
|---|---|---|---|
| `source-deep-agents-repo` | `9f0e39d55a5f` | `7a6974309ac7` | pinned workspace `ws-7a6974309ac7-ff4f672d-49a4-4b02-9eaf-53e05d9c7223`（115 个变更路径） |
| `source-deep-agents-docs-cli-reference` | `a9784bdcf781` | `48c4099900b0` | `archive/deep-agents/artifact-source-deep-agents-docs-cli-reference-48c4099900b0/source.md`（只读） |
| `source-deep-agents-docs-config-file` | `22b42e2e2c60` | `71b3ea8270b2` | `archive/deep-agents/artifact-source-deep-agents-docs-config-file-71b3ea8270b2/source.md`（只读） |
| `source-deep-agents-docs-configuration` | `472e7ac0dfed` | `83aa7347dd39` | `archive/deep-agents/artifact-source-deep-agents-docs-configuration-83aa7347dd39/source.md`（只读） |

其余 10 个文档来源 `unchanged`，本轮未触碰。**无来源失败**：四个变化来源都能在其固定位置读取到字节。

## 2. 语义判断：纳入的入口

### 2.1 `[ui].show_reasoning` 默认值翻转（configuration）

真实的 hunk，不是文档近似：

- `config_manifest.py:2358-2372`——`display.show_reasoning` 的 `default` 由 `False` 改为 `True`，summary 同步改写。
- `config_manifest.py:1459-1467`——`load_bool_display_preference` 新增 `default` 参数，**仅当** `ranked.ranks == (DEFAULT_RANK,)` 时替换 manifest 默认值。
- `app.py:1481-1488`（TUI，`fallback=True`）与 `main.py:1131-1145`（headless，`default=False`）是按模式分叉的两个调用点。
- `_env_vars.py:583-592` 重写变量文档；三页官方文档一致描述为“交互式默认显示、非交互默认隐藏”，并给出 `0`/`1` 语义与覆盖方向。

结论：`config.defaults` 与 `config.runtime` 需改写。**排除**其余五题——`resolver.py`、`providers.py`、`service.py`、`writer.py`、`THREAT_MODEL.md`、`ARCHITECTURE.md`、`doctor.py` 均不在 115 个变更路径内，本次 manifest 改动也不新增任何键、路径、rank 或合并策略。

### 2.2 `/skill:` 改为服务端固定（skills）

`skills-v3` 曾两次断言“CLI 侧没有任何写入 `pinned_skills` 的位置、`/skill:` 仍走 envelope 路径”。该断言现在为假：

- `skills/invocation.py:169-201`——`build_skill_invocation_envelope` 只发送技能名，`__skill` 标记改为 `{name, args, pinned: True}`。
- `tui/textual_adapter.py:2106-2110` 与 `client/non_interactive.py:2333-2335` 写入 `stream_input["pinned_skills"]`，且都在 hook 抑制原始提示时跳过写入。
- `skills_middleware.py:512-541` 在 `before_model` 解析名字、读取正文，**名字不存在时抛错而非静默跳过**。
- `skills/trust.py:71-101` 新增 `skill_trust` 中断，信任询问从客户端移到 agent server；任何非 `{"approved": true}` 的应答一律视为拒绝（fail-closed）。

### 2.3 Anthropic 兜底档案合并方向（custom_providers）

`model_config.py:1490-1503` 把 `{**FALLBACKS, **profiles}`（整条覆盖）改为按模型的字段合并 `{**FALLBACKS[model], **profile}`。包档案字段仍胜出，但兜底表中包未覆盖的字段不再被整条丢弃。`providers-v3` 正文published 了旧表达式，已在 `providers-v4` 更正。

注意区分两个合并点：`config.py:7085-7096` 的**模型创建期**兜底合并未变，`providers-metadata` 原文仍成立。

## 3. 排除的题目与依据

| 排除对象 | 依据 |
|---|---|
| `config.sources` / `config.overrides` / `config.trust` / `config.migration` / `config.diagnostics` | 对应入口文件均不在变更路径内 |
| `skills.roots` / `discovery` / `format` / `extensions` / `collision` | 变更只涉及调用、pin 与信任；来源列表与优先级未变（`extra_skill_roots()` 只是抽取），`load.py` 未变 |
| `agents.entry` / `roles` / `invocation` / `limits` | `agent.py` 两处 hunk 属技能中间件 `path_base` 与 fork 目标的 goal-tools 中间件注入，与自定义 Agent 的发现、格式、优先级、限额无关 |
| `mcp.*` / `plugins.*` | 无 MCP 或插件发现入口在变更路径内 |
| `hooks.*` | `app.py` 接入的两个回调是技能中断的客户端管线，不是 hook 事件/入口/输出/顺序变化 |
| `transcripts.*` | 变更涉及固定技能消息的呈现管线（`message_store.py`、`widgets/messages.py`、`auto_mode`），不是记录存储语义；会话、迁移、线程归属模块未变 |
| `providers.auth` / `protocol` / `metadata` / `forwarding` / `responses` | `model_config.py` 仅一处 hunk；`config.py` 的模型创建期合并未变 |

## 4. 未完成：pending

**`skills.diagnostics`**（`review_status: pending`）。`skills-v3` 的四条 CLI 诊断要点（`skills list/info/delete`、`skills trust list|revoke|clear`、`/context-doctor`、`/reload`）均引自**未变化**的文档页，本次未逐一对照改写后的 `_discover_skills` 路径核实“信任 CLI 是否仍完整覆盖新的服务端中断流程”。按契约，不把未验证的答案写成结论，故列为 pending 而非补写。

## 5. 版本映射

**未新增任何软件版本映射。** 本次是源码树提交，`libs/code` 没有对应的 npm 发布快照；按映射契约，仓库 HEAD 本身不能证明已发布包版本，因此保留 source-level knowledge。

## 6. 候选产物

- 新章节版本：`deep-agents-cli-configuration-v2`、`deep-agents-cli-custom_providers-v4`、`deep-agents-cli-skills-v4`（旧版本全部保留，未原地改写）。
- `registry/chapter-current.yaml` 仅切换上述三题到新版本，其余五题选择不变。
- 新增记录全部为 `git_source_file` / `archived_document` 身份记录（commit、file、`content_sha256` 或 `archive_path`）。**未把任何 checkout 或 archive 字节复制进候选。**
- `pnpm maintenance:candidates check --candidate /tmp/ahw-batch-1791831061/candidates/deep-agents` 通过。

## 7. 复核建议

需要独立 reviewer。三条高影响判据中有两条命中：新证据**推翻了已发布的配置步骤**（`show_reasoning` 默认值与 Anthropic 合并表达式），且**跨主题的关键加载机制改变**（`/skill:` 的正文注入路径与信任询问位置同时变化）。复核范围建议限于本报告 §2 的三处入口与 §4 的 pending 判断。