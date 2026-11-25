# Cursor 维护审计 2026-11-25

本次为 cursor 的增量维护，冻结观察来自 `audit-cursor-791cd0bb-4e48-4d97-b6bb-a9af66afbd43.yaml`（40 个来源，22 changed）。本轮只维护受影响的四个主题：configuration、mcp、hooks、local_transcripts，并新建 4 个完整 edition；custom_agents、custom_providers、native_plugins、skills 的实质变化记录在 YAML 的 investigation_notes 中，留待后续任务。

## 观察窗口

- `cli/headless.md`：d767966f → fb47dabe（print 审批、禁用 headless）
- `cli/reference/parameters.md`：b50b48d6 → 7bec5b26（`agent ls`、`--mint-scm-token`）
- `cli/shell-mode.md`：7acca778 → e1d8a73d（登录 shell、`CURSOR_LOGIN_SHELL`）
- `cli/changelog.md`：70d57616 → a6c77f4d（keyring、SHA-256、调试器、MCP、hooks、worker、sandbox）
- `cli/using.md`：b070cb1f → 4857306b（非交互审批指向 headless）
- `agent/security/run-modes.md`：7373592c → 082beca7（临时目录、Nightly 路径、分类器）
- `enterprise/model-and-integration-management.md`：c629fcd1 → f9cb9db8（blocklist 范围、MCP Local/Cloud）
- `customize-cursor.md`：9ae0878d → 0731e9f6（home 目录表，仅取 worker mcp 行）

其余 14 个 changed 来源未用于章节证据：agent-projects、subagents、aws-bedrock、sdk-typescript、rules、index、models-pricing、cursor-router、ent-organizations、hooks、mcp、plugins、skills、help-api-keys。其中 7 个无保留基线，无法给出窗口内差异。

## 结论

- configuration v4：print 模式审批、团队禁用 headless、`CURSOR_LOGIN_SHELL`、keyring 与凭据权限、进程检查开关、更新 SHA-256、`--mint-scm-token`、`sandbox.json` 临时目录与 Nightly 路径、blocklist 范围、MCP allowlist Local/Cloud、分类器模型口径。
- mcp v3：worker home `mcp.json` 与 loopback server、worker MCP 超时、工具检索/空参数/连接器参数修复、resource 写盘审批、OAuth 占位符、团队 allowlist 两半与 worker 豁免、print 模式下 MCP 工具被拒。
- hooks v3：worker hook 会话字段与 `surface`、dashboard prompt hook、子代理 post-tool hook 与 transcript 路径、Auto-review 下的 `ask`、Windows 失败上报。
- local_transcripts v2：子代理 transcript 相对布局、`agent ls` 选择器、团队切换后的 store 同步条件。

## 待复核

`subagents.md` 与 `customize-cursor.md` 均写明 CLI 不读 home 下的 `~/.cursor/agents`，与已发布 `cursor-cli-custom_agents-v4` 的用户子代理表冲突。本轮未改该章，需独立复核后另起 edition。历史 pending 审计 607611f4、3bba47fe、ad14c23c、661c3c03 保持未关闭。
