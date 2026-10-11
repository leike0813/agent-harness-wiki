# kilo-code 维护审计（round 20261011T015904Z）

- audit id：`audit-kilo-code-fb7e96ed-maintenance`
- 上一份：`audit-kilo-code-a28d44e2-fad2-43dc-90f5-575c51ae934a`
- 来源身份：`source-kilo-code-repo` 提交 `fb7e96eda5409517a05948b9efaf01c53997bf6e`（基线 `974723450caa7c91f140b128e2f2e3b4a932ade8`，52 个提交）
- triage 分类：`maintain`
- 状态：`changed`；`pending_question_ids` 为空

## 改动的章节路径与来源身份

| 章节（新 edition） | 取代 | 证据 |
|---|---|---|
| `knowledge/kilo-code/chapters/kilo-code-cli-custom_agents-v4.md` | v3 | 提交 `fb7e96e` 的 `packages/opencode/src/kilocode/tool/task.ts`（`content_sha256` `c33bf282…0881df`）、`packages/kilo-docs/pages/code-with-ai/agents/model-selection.md`（`4197eaa4…8ed8c6b`） |
| `knowledge/kilo-code/chapters/kilo-code-cli-mcp-v3.md` | v2 | 提交 `fb7e96e` 的 `packages/opencode/src/mcp/index.ts`（`826f3add…63185c`）、`packages/opencode/src/effect/instance-state.ts`（`23e03f02…6941014`）、`packages/opencode/src/kilocode/effect/instance-state.ts`（`b450b3c8…2b34d97`）、`packages/opencode/src/kilocode/mcp/cleanup.ts`（`2a028085…bcba16`） |
| `knowledge/kilo-code/chapters/kilo-code-cli-configuration-v5.md` | v4 | 提交 `fb7e96e` 的 `packages/opencode/src/kilocode/tool/shell-tmp.ts`（`f195ed5a…5bf60ea`）、`packages/opencode/src/tool/shell/prompt.ts`（`d6ac29d5…afe9367`） |

新增 artifact / snapshot / reference 各 8 条，全部为 `git_source_file` 身份（只有 commit + 仓库相对路径 + 内容哈希，没有复制 checkout）。

## 语义 triage 理由

1. **custom_agents**。提交 `4ed8e7b461`（fix(cli): resolve bare model names for task subagents）加上 `ca197fdd78`、`4abafa9dee` 两轮 review 修订，把 `agent.<name>.model` 与 `subagent_model` 的解析从“按 `/` 切成 provider/model”改为“先查 provider 目录：限定键 → 模型 ID → 显示名，优先父会话 provider，含 `/` 的名字不被当分隔符”，并新增 `task model name is not available` / `task model name is ambiguous` 两条 warning。这**改写**了 v3 中 `agents.overrides` 关于 `model` 字段格式的说明和 `agents.diagnostics` 的定位手段，故新建 v4。其余问题（entry / format / roles / invocation / limits）结论未变，未改写；`agents.limits` 仍是 `partial`。
2. **mcp**。changeset `.changeset/mcp-interrupted-startup.md` 对应提交 `3b0be767c7`：`InstanceState` 的 ScopedCache 改为 `makeWith` 并对**被中断**的 lookup 立即过期，MCP 的 client finalizer 提前到连接任何 server 之前注册，`kilocode/mcp/cleanup.ts` 负责 SIGTERM 子进程并 close。v2 的 `mcp-lifecycle` 与 `mcp-diagnostics` 描述未覆盖启动中断路径，故新建 v3；`mcp.lifecycle` 仍记 `conflict`（文档 timeout 5000 与源码 `DEFAULT_TIMEOUT = 30_000` 的既有冲突未被本次提交触及）。
3. **configuration**。提交 `9c96d61049` 与其 review 修订 `4290338d85`：bash 工具描述里的 `${tmp}` 在云端会话（`KILO_CLOUD_AGENT` 真值 + `SESSION_ID` 为安全路径段）渲染为 `/tmp/<SESSION_ID>`，根目录取字面量 `/tmp` 而非 `os.tmpdir()`，四种情况回落到共享 `Global.Path.tmp`。这是运行时环境变量如何改变行为、以及与平台注入的 `external_directory` 放行集合如何对应，属 `config.runtime`；v4 未覆盖，故新建 v5。

## 受影响与排除的问题及理由

受影响并已回答：`agents.overrides`、`agents.diagnostics`、`mcp.lifecycle`、`mcp.diagnostics`、`config.runtime`。

调查后确认**未变**、因此未改写的：`agents.entry`、`agents.format`、`agents.roles`、`agents.invocation`、`agents.limits`、`mcp.entry`、`mcp.definition`、`mcp.exposure`。云端临时目录问题未触及 `config.sources` / `config.overrides` / `config.trust` / `config.defaults` / `config.migration` / `config.diagnostics` 的任何已发布结论。

**明确排除（按指派，未调查）**：

- JetBrains 前端 Kotlin 的会话 UI / 滚动 / header 面板改动（`297abe6c2c` 等）。
- 全部合并提交，含 `Merge branch 'main' into fix/shell-tmp-cloud-session`。
- `.changeset/cloud-session-shell-tmp.md` 中超出临时目录问题所需的其余内容。
- 排除主题：skills、hooks、native_plugins、custom_providers、local_transcripts。

本轮 52 个提交中未被指派的部分同样未调查；观察结果按冻结输入处理，未重新运行 `pnpm sources:scan`。

## 跨主题失效声明

`agents.overrides` 的答案变化**不使其他已发布章节的陈述失效**：`configuration` v5 记录模型类键时没有把 `model` / `subagent_model` 描述成“只接受 `provider/model`”，因此无需连带改写。`local_transcripts` 章节里 `${TMPDIR}/kilo` 的陈述仍然成立 —— 它描述的是 `Global.Path.tmp` 本身，而云端临时目录只改变 bash 工具描述里渲染出来的 `${tmp}`，不改变该路径的解析；且该主题本轮被排除。`mcp` v3 保留 v2 的全部结论，仅新增启动中断路径，未推翻任何已发布陈述。

## 候选与复核结果

`pnpm maintenance:candidates check --candidate <candidate-root>` 通过（退出码 0，无 failures）。

复核判断：三项改动都是同一提交上的局部机制变化，不推翻已发布配置步骤，也不涉及无法用版本/分发/条件差异解释的来源冲突（`mcp.lifecycle` 的 `conflict` 是既有且已如实保留的文档/源码 timeout 分歧）。按 SKILL 第 5 节判定为**无需独立复核**，作者自检已逐条核对 source_ref ↔ question ↔ section ↔ 固定来源身份。

## blocker

无。