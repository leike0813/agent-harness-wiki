# OpenHands 增量维护报告 · 2026-10-12（审计 `audit-openhands-72fdbc68-ec2f-4d17-9267-75b7c46c43f5`）

## 结论

八个主题（`skills` / `mcp` / `custom_agents` / `custom_providers` / `hooks` / `native_plugins` / `configuration` / `local_transcripts`）**均无知识影响**：本轮没有新建章节版本，没有改动任何 `reference` / `snapshot` / `artifact`，`registry/chapter-current.yaml` 未变，也没有新建版本映射。scan 写下的八个 `impacts`（全部 62 道题）已按实际 diff 收窄为空，`pending_question_ids` 为空。

## 来源身份

| 来源 | baseline | observed | triage |
| --- | --- | --- | --- |
| `source-openhands-repo` | `fd3a76f48327` | `02e02ae0c92e` | reviewed_no_impact（画端实现与内部规范，CLI 章节零引用） |
| `source-openhands-sdk-repo` | `f824a949af7f` | `e3a26821f8f7` | reviewed_no_impact（唯一语义改动见下，落在未固定发行版） |
| `source-openhands-npm` | `1.26.0` | `1.27.0` | reviewed_no_knowledge_impact（integrity 随版本同步变化） |
| `source-openhands-cli-repo` + 20 个文档源 | — | unchanged | 本轮未取用 |

工作区：`ws-02e02ae0c92e-3ea3e0a9-b0a4-49d5-822b-474db2da3351`、`ws-e3a26821f8f7-3e5cb009-f15a-433a-a6b6-cfbedc2845c6`（owner PID 2042161，worker 未新建租约）。

## 需要 coordinator 知悉的来源身份异常

scan 为 `source-openhands-repo` 记录的 `observed` 是 `26f590d1f710ff153ee22ec478348ddd1922716c`，该 commit 在 coordinator pin 的检出中**不存在**（`git cat-file` 失败；该检出 HEAD = `02e02ae0c92e`，与基线 `fd3a76f48327` 之间仅 1 个提交）。本轮全部结论按冻结观察 `02e02ae0c92e` 核验，审计 `checks` 的 `observed` 已改为该提交；scan 原值原样记录在本报告与审计 `investigation_notes` 中。若 coordinator 认为 `26f590d1` 才是本轮真实 HEAD，需要重新 pin 并复核。

## 引用交叉核对（不采信 scan 的 impacts）

`knowledge/openhands/references/*.yaml` 的 239 条引用共命中 **72 个不同 `locator.file`**（`kind: file_lines`），与本轮 307 + 24 条 changed paths 的交集只有三个文件：

1. `README.md`（画端仓库）：唯一 hunk 是第 97-100 行 docker 镜像 tag `agent-canvas:1.26.0` → `1.27.0`；章节使用的 “Repository boundaries” 段（20-45 行）逐字未变。
2. `package.json`（画端仓库）：`version` 与依赖 churn（`@openhands/extensions` 0.29.0 → 0.30.0、新增 `ws`/`@tailwindcss/node`/`@types/ws`、`@shadcn/lint` 0.2.0 → 0.2.1）。引用它的 `ref-openhands-canvas-package` 不被任何当前章节使用；不改变 CLI 的字段/默认/加载顺序。
3. `tests/sdk/mcp/test_create_mcp_tool.py`：新增 `test_mcp_tool_reconnects_after_http_error`（第 776 行起）并在文件头加 3 行 import，使 `mcp.exposure` 所引的 210-245 行在 `e3a2682` 下下移 3 行（现 213-248）。被引的“server 名_工具名”前缀断言逐字未变，且该引用固定在 `snapshot-openhands-sdk-repo`（提交 `edaac806`），excerpt 与其 pinned 快照一致，故不改引用、不改正文。

## 唯一有语义的机制改动：MCP 客户端重连

`openhands-sdk/openhands/sdk/mcp/client.py` 的 `connect()` 新增：若 `session_task` 已结束则先 `_reset_session_state(full=True)` 再连接。新增测试断言首次 `tools/call` 收到 504 报错、第二次调用成功。

不改章节的理由：`mcp` 章节的固定来源是 CLI 依赖的 `openhands-sdk==1.28.1`（提交 `edaac806`），本轮观察到的 `e3a2682` 不被任何固定版本映射覆盖；源码 HEAD 不能证明已发行包行为。待把包含该改动的发行版固定进 `mappings/` 后，再评估 `mcp.lifecycle` 是否需要修订。

## 其余变更组的排除依据

- **agent_server 组**（`config.py` 新增丢弃空 `session_api_keys` 的 `field_validator`；`init_router.py` 对含空 key 的初始化请求返回 422；`sockets.py` 拒绝空字符串凭据；`canvas_extensions/backend.py` 调整画端后端进程组回收）：72 个被引文件中没有一个来自 `openhands-agent-server`，章节无相关 `source_ref`；`hooks` 章节关于 `SESSION_API_KEY` 被剥离的表述来自 `sdk/hooks/executor.py`（未变）。
- **LLM 组**（`OPENAI_CODEX_MODELS` 增补 gpt-6.1-sol / gpt-6-sol / gpt-6-luna；`PROMPT_CACHE_MODELS` 增补 claude-haiku-5-5；`telemetry.py` 记录前复制并脱敏 `kwargs`、错误 `message`/`repr`/`traceback` 走 `redact_text_secrets`；`redact.py` 正则扩展到双引号/转义/带连字符的 authorization 与 x-api-key）：`custom_providers` 现有表述不枚举这些模型清单，也不断言遥测日志字段；grep 全部八章无 telemetry/遥测 断言；`sdk/hooks`、`sdk/context`、`sdk/conversation` 下无 redact 调用点。
- **terminal 组**（新增 `MIN_POLL_INTERVAL = 0.02`、轮询调整）：八章不覆盖终端轮询，无相关 `source_ref`。
- **`.agents/skills/**`（23 个文件）**：画端仓库内部用于验证自身 UI 的开发技能（`verify-openhands` 等），不是 harness 的 skill 机制；`skills` 章节引用的加载器文件全部未变。
- **其余主仓路径**：`.pr/bugs/**`、`.pr/map-maintenance/**`、`__tests__/**`、`tests/**`、`.github/**`、`src/**`（React 组件/hooks/routes/i18n/主题）、`electron/**`、`scripts/**`、`helm/**`、`docs/**`、lockfile、`AGENTS.md`、`config/defaults.json`（仅 agentCanvas 版本行 + 新增 mars 段）、`specs/mcp-settings.md`（新增 MCP-004 验收条目）、新增 `specs/mcp-secret-selection.md`——CLI 界面的章节证据全部指向 `OpenHands-CLI` 与 `software-agent-sdk`，这些路径无 `source_ref` 引用，判为 `reviewed_no_impact`。

## 复核与自检

- 高影响复核判定为**不需要**：无来源冲突、无推翻已发布配置步骤的新证据、无跨主题关键加载/配置机制改变。
- `pnpm maintenance:candidates check --candidate /tmp/ahw-batch-1791831061/candidates/openhands` 通过（exit 0，无 diagnostics）。
- 八个主题既有的 `partial` 答案与上一轮一致，本轮未新增未完成问题；`review_status: reviewed`，`reviewed_by` 为本 worker 自检。

## 后续建议

1. 把包含 `mcp/client.py` 重连恢复的 SDK 发行版固定进 `mappings/` 后，复核 `mcp.lifecycle`。
2. 下一轮复核上游 HEAD 身份：scan 记录的 `26f590d1` 与 pin 到的 `02e02ae` 不一致，建议在 pin 阶段记录远端 ref 解析结果。
