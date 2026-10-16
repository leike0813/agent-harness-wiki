# OpenHands 增量维护报告 · 2026-10-13（审计 `audit-openhands-9af885fb-475c-47f5-8fb1-9c7bd64e189e`）

## 结论

本轮范围是 `skills` 与 `configuration` 两个主题的五道固定问题（`skills.conditions`、`skills.loading`、`skills.invocation`、`config.trust`、`config.sources`）。**五题全部判定为已发布答案不变（unaffected）**，因此**没有新建任何章节版本**，也没有新增或修改 reference / snapshot / artifact / mapping，`registry/chapter-current.yaml` 未变（`skills` 仍选 `openhands-cli-skills-v1`，`configuration` 仍选 `openhands-cli-configuration-v1`）。coordinator 写入的八条通用 impacts 已按实际 diff 收窄为空，`pending_question_ids` 清空。

两个提交都带有实质机制变化，但都不落在已发布章节的固定来源与界面范围内：一处是 SDK/agent-server 的**新增第四条 Skill 供给通道**，一处是 Agent Canvas（web 界面）的**新增密钥请求准入门控**。两者都作为源码级知识记录在审计中，不改章节、不建版本映射。

## 来源变化与语义 triage

| 来源 | baseline → observed | triage |
| --- | --- | --- |
| `source-openhands-repo`（`All-Hands-AI/OpenHands`） | `26f590d1f710` → `da4c7564dcf4` | `reviewed_no_impact`（295 文件；唯一与本轮五题相关的机制是 web 界面的密钥请求弹窗） |
| `source-openhands-sdk-repo`（`OpenHands/software-agent-sdk`） | `e3a26821f8f7` → `27308a4b3f23` | `narrow_investigation` → 已查清并结案（85 文件；新增启动期 Skill 通道） |
| `source-openhands-npm` | `1.27.0` → `1.27.1` | `reviewed_no_knowledge_impact`（仅发布身份变化） |
| `source-openhands-cli-repo` + 20 个官方文档源 | — | unchanged（本轮未取用） |

固定检出（coordinator pin，worker 未新建租约）：`ws-da4c7564dcf4-a7844d7e-932a-4af2-b071-554160678d9c`、`ws-27308a4b3f23-ae7ae0c6-9f9c-4f62-bdc5-7c5e16e62204`。

## 决定性问题：SDK 的启动期附加 Skill

提交 `feat(agent-server): accept additional skills when launching an agent` 新增 `AgentLaunchAdditions.skills`。逐项证据：

1. **入口**：`StartConversationRequest.agent_launch_additions` 字段（`openhands-sdk/openhands/sdk/conversation/request.py:204-210`）；字段体定义在同文件 `82-95` 行，自述用途为
   > "Deployment-supplied skills merged into the resolved agent's context. For a client that ships its own skill catalog and so cannot rely on the server's: an ``agent_profile_id`` launch sends no ``agent_settings``, leaving it no other way to supply them."
2. **形状**：已解析的 `Skill` 对象列表（不是路径或名字），随请求体传入；`AgentLaunchAdditions.model_config = ConfigDict(extra="forbid")`（同文件 `72` 行）。
3. **解析时机**：只在会话启动时一次，位于 `finalize()` 中 `settings.create_agent()`（`launch/finalize.py:83`）之后、系统提示后缀追加之后、`_apply_acp_skill_sourcing` 之前，调用 `_with_launch_skills`（`finalize.py:98-99`、`200-217`）。唯一非 agent-server 调用方 `launch/preview.py:73` 不传 additions；agent-server 侧由 `conversation_service.py:1565-1579` 传入 `additions=request.agent_launch_additions`。
4. **扩展而非覆盖**：`_with_launch_skills` 以
   `taken = {skill.name for skill in context.skills} | set(context.disabled_skills)` 为准，只追加不在 `taken` 中的项（`finalize.py:203-208`）。已存在的同名 Skill 与 profile 的 `disabled_skills` 拒绝名单都胜出。
5. **信任/准入门控**：只有上述按名去重与 `disabled_skills` 拒绝名单，没有额外准入、审批或来源校验。同提交新增的 `llm_profile_ref` 覆盖仅在有 `agent_profile_id` / `agent_profile` 时合法（`request.py:405-410`、`launch.py:138-145`、`resolve.py` 的 `llm_ref` 覆盖），与 skills 通道互不影响。

**为何不改章节**：该机制位于 agent-server / SDK launch 路径。`skills` 与 `configuration` 两章没有任何 `source_ref` 指向 `agent_server`、`sdk/launch` 或 `conversation/request.py`（全八章 grep `agent_server` / `agent-server` / `launch_additions` / `AgentLaunchAdditions` 零命中）；CLI 侧仍由 `openhands_cli/stores/agent_store.py` 的 `_build_agent_context()` 直接构造 `AgentContext`（`ref-openhands-cli-skills-context`，CLI 仓库本轮 unchanged）。版本边界上，skills 章节的固定来源是 SDK `edaac806`（`openhands-sdk==1.28.1`），而本轮 SDK 提交的 `pyproject` 版本为 `1.54.0`（`openhands-sdk/pyproject.toml:3`，两个提交同值）。按既有纪律，源码 HEAD 不能证明已发行包行为，不从源码 HEAD 写版本映射，故只记录、不改章。

## `config.trust`：主仓新增密钥请求门控

提交 `feat(secrets): let the agent request a secret through an in-conversation modal` 新增四个文件，构成一条**新的用户确认后才提供密钥**的门控：

- `src/api/request-secret-client-tool.ts`：客户端自定义工具 `request_secret`，JSON schema 要求 `name` + `reason`，`additionalProperties: false`（`25-52` 行）。
- `src/constants/secret-request.ts`：工具名与结果前缀 `"[secret-request] "`。
- `src/services/secret-request.ts`：`handleRequestSecretAction`（`42-68` 行）按 `conversationId + toolCallId` 用 `claimClientToolCall` 去重；已存在的同名 secret 直接挂载，否则入队弹窗。`completeSecretRequest`（`105-127` 行）只回报 `saved` / `not_saved` / `error` 三态，注释明确
  > "Hand the outcome of a secret request back to the agent. It never carries the value."
  且指引要求用户"never ask them to paste it into the chat"。
- `src/stores/secret-request-store.ts`：待处理请求持久化到 `localStorage`，刷新后可重开。

**为何不改章节**：这是 Agent Canvas（web 界面）的行为，与模型权限确认策略无关；已发布的 `config-trust` 只回答 `surface_id: cli`，其全部 `source_ref` 均为 OpenHands-CLI 文件与 `SDK hooks/executor.py`，并明确"CLI 没有'项目信任'概念"。catalog 中 `web` 界面 binding 状态为 `unknown`，本轮无 web 章节，不越过固定来源与界面范围。

同一 SDK 提交的 agent-server 侧改动（`config.py` 空 `secret_key` 视为未设置并记录 `_secret_key_was_blank`，`73`/`502`/`513-534` 行；`init_router.py` 含空 key 的初始化请求不再覆盖默认，`check_init_api_key` 在"配置过空 key 且无可用 key"时 fail-closed 返回 401，`179` 与 `357` 行）属于 agent-server 会话鉴权配置，同样不被任何章节引用，记录不改章。

## 引用交叉核对

候选 `knowledge/openhands/references` 下全部引用的 `locator.file` 去重后为 72 个文件；与本轮 `295 + 85` 条 changed paths 的交集只有三个：

1. **`README.md`**（主仓）：唯一 hunk 是第 97-100 行 docker 镜像 tag `1.27.0 → 1.27.1`；被引区间 20-45 行（`ref-openhands-canvas-readme`）逐字未变。
2. **`package.json`**（主仓）：唯一 hunk 是第 3 行 `version 1.27.0 → 1.27.1`，与 `ref-openhands-canvas-package` 的 locator 区间 1-22 行重叠，但该引用**不被任何当前章节使用**，且其 `snapshot-openhands-repo` 固定在 `1ec86616`，引用自身自洽，不改引用。
3. **`openhands-sdk/openhands/sdk/settings/model.py`**：两个 hunk 分别是第 39 行的 import 重构（`SendMessageRequest` 从 `conversation/request.py` 拆到新文件 `message_request.py`）与第 1260 行新增内联 `agent_profile`。被三条引用覆盖的 `549-560`、`684-712`、`938-1010` 三段在 `e3a26821f8f7` 与 `27308a4b3f23` 之间**逐字相同、行号未移位**，引用不改。

## 排除项

- **两仓 `.agents/skills/**`**：主仓 33 个（`verify-openhands` 31、`frontend-development` 1、`frontend-api-contracts` 1`）与 SDK 仓 42 个（`verify-agent-server`）都是项目自用的验证材料，不是宿主机制证据，不作章节来源。
- **SDK `openhands/sdk/security/**`**（`_shell_ast.py`、`defense_in_depth/pattern.py`、`policy_rails.py`、`shell_semantics.py`）：本轮把破坏性命令检测改为 tree-sitter AST 语义并新增 `SecurityRisk.UNKNOWN`（`pattern.py` 注释："ConfirmRisky prompts for UNKNOWN by default"）。八章中 `ConfirmRisky` / `SecurityAnalyzer` / `defense_in_depth` / `security` 零命中，无一引用。
- **SDK `subagent/scope.py`、`tool/tool.py`、`tools/task_tracker/definition.py`**：新增 `conversation_local` 标记，子代理作用域不再继承会话本地工具；无一被引用。
- **其余 SDK 路径**：`.impeccable/config.json`（新增）、`agent_server/AGENTS.md`、`openai/service.py`、`docker_runtime/routers.py`、`server_details_router.py`、`tests/**`。
- **主仓其余路径**：`.pr/**`、`__tests__/**`、`tests/**`、`src/**`（除上述四个新增文件外）、`electron/**`、`scripts/**`、`helm/**`、`docs/**` 等，均无 `source_ref`。
- **npm 1.27.0 → 1.27.1**：仅发布身份变化（integrity 随版本同步），不固定也不比较发行包字节，不改章节、不建映射。

## 逐题结论

| 问题 | 结论 | 依据 |
| --- | --- | --- |
| `skills.conditions` | unaffected（维持 answered） | skills/context 目录在本轮 85 条路径中零改动；新增 skills 字段与自动加载开关、`disabled_skills` 无交集 |
| `skills.loading` | unaffected（维持 answered） | 发现/解析/分区（`available_skills`、`REPO_CONTEXT`）证据文件全部未变 |
| `skills.invocation` | unaffected（维持 partial） | 调用路径证据文件未变；新增通道不在 CLI 固定来源内 |
| `config.trust` | unaffected（维持 answered） | 新门控属 web 界面；agent-server 鉴权配置无章节引用 |
| `config.sources` | unaffected（维持 answered） | `settings/model.py` 被引三段逐字未变；`agent_profile` 内联来源不在 CLI 的 `StartConversationRequest` 路径 |

## 待处理与独立复核

**审计记录**：`audits/openhands/audit-openhands-9af885fb-475c-47f5-8fb1-9c7bd64e189e.yaml`（本文件同名）。**待处理旧审计**：`audit-openhands-72fdbc68-ec2f-4d17-9267-75b7c46c43f5`。

该旧审计记录的来源身份异常（"scan 观察到的 `26f590d1` 不在 pin 内"）**已由本轮固定解决**：`ws-da4c7564…` 的 HEAD = `da4c7564dcf4`，`git rev-list --count 26f590d1f710ff153ee22ec478348ddd1922716c..da4c7564dcf460f80d1889fee1c951802c448c56` = 1，`git cat-file -t 26f590d1f710` 成功。本审计 `review_status` 保持 `pending` 的唯一原因就是该旧审计在数据集中仍为 `pending`；关闭它是 coordinator 的决定，本 worker 不代为改写。五道固定问题本身已全部带证据结案，无 blocked 来源。

**高影响复核判定为不需要**：无来源冲突、无推翻已发布配置步骤的新证据、无跨主题关键加载或配置机制改变——两项实质变化都落在已发布章节的固定来源与界面范围之外。

## 验证

```
pnpm maintenance:candidates check --candidate /tmp/ahw-monitor-fa60cb88-ac51-446f-83dd-ae9a5d0a45e2-QlS6z6/batch-1/candidates/openhands
# exit 0，无 diagnostics
```

未运行 `plan` / `publish` / `managed:packages`（`delivery=pr`，worker 不执行）。