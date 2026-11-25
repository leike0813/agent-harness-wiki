# prime-agent — audit c5836a30 (late triage continuation, 2026-11-25)

## 来源观察

- `source-prime-agent-repo`：`672085e883c25a8a5f10c77ad8e5d3fb38dd6584` → `e44e9ae9dff2f6c410e84edb4a7dce2dea610d54`（`refs/heads/main`）。上一语义基线为 `798d97032a3ec6d70142cc75c0420cb2b260f194`；`798d9703...e44e9ae9` 的 33 个提交用 compare 逐文件核对，更早区间只在现行章节与 HEAD 不一致时回查。
- 只处理协调者 intersect 列表的 54 个被引用文件；新增证据全部钉在 `e44e9ae9`，记录 commit / 仓库相对路径 / sha256（raw.githubusercontent），未保留 checkout。

## 实质变化

1. **配置作用域收紧（安全相关）**：`manager.rs::load_scope(Project)` 把 `sessionDir`、`shellPath`、`shellCommandPrefix`、`npmCommand`、`packages`、`mcpServers`、`mcpCatalogSources` 置空；项目 `packages` 仅保留给显式移除。v7 的“项目 packages 会启动时自动安装”“shellPath 项目覆盖全局”两段说明被推翻。
2. **新增设置键**：`pythonCellTimeoutMs`（默认 60s，超预算自动转后台而非中断，daemonless 不启用）、`agentInbox.enabled` / `reminderIntervalMs`（与既有 idleDebounceMs/successHoldMs 共四个全局键）、`webSearchProvider`（serper 默认 / eco，全局只读，SERPER_API_KEY / YOU_API_KEY 覆盖存储凭据）。设置加载失败文案改为 `settings file failed to load`。
3. **custom_agents**：daemonless 提示从“bash 完成不唤醒”改为“以排队 `[bash-done]` 轮次唤醒”；print 运行时实际传入 `bash_notice_wake`/`on_background_work_settled`。前台单元格只有一个，长等待/超预算自动转后台后可与新单元格并行；`await bash()` 固定最多等 1 秒。
4. **skills**：内置 Skill 先加载并赢得所有同名冲突（含 `--skill`），落败状态 `ignoredForBundled`；新增 `prime-agent skills [--cwd DIR] [--json]` 与根会话首次启动的 problem 警告；内核工具名 `python_repl`。
5. **custom_providers**：`input` 增加 `video`；`type:"video"` 只由 `openai-completions` 转成 `video_url`，其它 provider 文本占位。
6. **local_transcripts**：sidecar 版本 2→3（扫描折叠改为通用 billed row）；会话文件/重写临时文件私有权限；custom 行缺 timestamp 时解析填充；ledger delete 可带 `usage.byModel`（账本版本仍 1）。清掉 v5 中仍把自动归档写成运行机制的旧段。
7. **mcp**：上一轮 `/mcp login NAME` 文档步骤 vs HEAD 菜单命令的冲突未解决；`acp/daemon.rs`、`worker/commands.rs` 的本轮改动不改变该冲突结论。mcp v3 不新建 edition，`mcp.entry`/`mcp.auth` 转为本审计 pending。

## 候选与选择

- 新建：`prime-agent-cli-configuration-v8`、`prime-agent-cli-custom_agents-v6`、`prime-agent-cli-skills-v2`、`prime-agent-cli-custom_providers-v3`、`prime-agent-local_transcripts-v6`；旧 edition 全部保留。
- `chapter-current.yaml` 只切上述五题；hooks v2、native_plugins v1、mcp v3 保持原选择。
- 新增 19 个 artifact/snapshot 与 25 条 reference。审计 `pending_audit_refs: []`，历史 8 条审计的待办在 investigation_notes 中逐条说明接续/转入，不通过 reviewed 关闭。

## 复核

`review_status: pending`。配置作用域的更正是对已发布安全说明的高影响修订，需独立复核；mcp 冲突继续 held。自检：`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-15/candidates/prime-agent` 通过。
