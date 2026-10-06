# Zoo Code 本地 Transcript 首采报告 · 2026-10-06

## 给维护者的结论

本轮不是上游增量维护，是 `local_transcripts` 主题的**首次采写**。该产品在固定 commit `d7963fc2db8ff07189e9f22079b15d67ad3a8bfd` 的源码树里带有一套完整的第一方会话记录实现（`src/core/task-persistence/`、随仓库一起提供的 `@roo-code/types`、以及 per-task 的 checkpoint 影子 git 仓库），所以十道固定问题基本都能从源码直接回答，不需要文档仓库。

新增当前章节 `zoo-code-vscode-local_transcripts-v1`，7 个小节、38 条引用、19 个 artifact/snapshot 对（一个文件一个 artifact 一个 snapshot）。没有写 `mappings/`：没有该 commit 对应的 npm 发行包快照。

## 来源身份与本轮阻塞

可用来源只有 `source-zoo-code-repo`（`Zoo-Code-Org/Zoo-Code.git` @ `d7963fc2…`），由 coordinator 已打开的 pinned workspace 只读检出，本 worker 没有新建工作区，也没有执行扩展或受管二进制。

两处需要维护者知道的边界：

1. **`source-zoo-code-docs` 本轮打不开。** coordinator 报告按 commit `dfd2628c` 打开 `Zoo-Code-Docs.git` 检出时上游返回 `not our ref`（该 commit 目前不可达）。这只影响本轮能否为文档来源建立新证据，**不构成该来源已失效的结论**。审计 `checks` 里 `source-zoo-code-docs: unchanged` 是扫描器自己的结果，我没有改写。
2. **项目根 `archive/zoo-code/` 在本轮不存在。** 既有的 `artifact-zoo-code-docs` / `artifact-zoo-code-docs-site` 记录指向 `archive/zoo-code/git/...` 下的检出，但目录当前不在。因此本轮**没有新建任何 `archived_document`**，38 条引用全部是 `git_source_file`，`content_sha256` 由 pinned 工作区真实字节计算。

这两点合起来意味着：本章节的每一条结论都只由源码支撑，没有任何官方文档侧的交叉验证。

## 实际机制（简述）

- **落盘位置**：`<基准路径>/tasks/<taskId>/`。基准路径优先取宿主配置 `zoo-code.customStoragePath`，不可用则回退到 VS Code 的 `context.globalStorageUri`。源码不硬编码任何操作系统绝对路径。
- **文件**：`api_conversation_history.json`（发往模型的 API 消息历史）、`ui_messages.json`（webview 消息列表）、`history_item.json`（历史列表条目），文件名由 `GlobalFileNames` 常量固定。
- **格式**：UTF-8 紧凑 JSON 整份重写，写临时文件 → 旧文件改名为 `.bak` → `rename` 提交 → 删备份，全程在咨询锁内并支持 merge 读-改-写。没有分片、没有压缩、没有 JSONL。
- **没有数据库**：`TaskHistoryStore` 的类注释直接写明"没有共享索引文件，读取靠扫描任务目录"，内存 `Map` 只是按 mtime 刷新的缓存。
- **一个容易踩的例外**：checkpoint 影子 git 仓库的根目录取的是**未经** `customStoragePath` 处理的 `globalStorageDir`。改了 `customStoragePath`，会话消息搬走了，工作区快照仍留在原处。

## 逐题状态

answered：`transcripts.scope`、`naming`、`format`、`schema`、`lifecycle`、`database`。

partial（4 题，正文都写了已查入口与剩余缺口）：

- `location` —— 宿主 VS Code 决定 `globalStorageUri` 在各 OS 的实际绝对路径，源码不含路径模板；本轮也没有在 Windows/macOS 上运行。
- `archive` —— 导出只把 API 对话历史转成 Markdown，**不含** `ui_messages.json`、`history_item.json`、委派状态与 checkpoint；而产品提供的导入路径是"从 Roo Code 存储根导入 JSON 任务目录"，不是回灌导出的 Markdown。所以导出文件不能当可回灌备份用。
- `cleanup` —— 删除机制（级联子任务、先关栈内任务、删影子仓库、`fs.rm -r` 任务目录）有源码证据；但**找不到任何任务目录保留期或自动清理机制**。这是"未找到"而不是"不存在"，更不等于"可以安全删除"。
- `diagnostics` —— 产品内两个读取入口（调试视图、错误诊断包）有源码证据，但源码里没有"校验全部任务完整性"的产品内命令；排错建议由读取契约与对账逻辑推导。

十题都没有写 `not_applicable`，也没有写 `conflict`。

## 排除与自查

- 只覆盖 catalog 登记的 `vscode` 界面。源码树里的 `apps/cli` 未在 catalog 登记为界面，本轮不为它写答案，查询会派生为未调查。
- 未归档缓存、日志、遥测文件（`cache/` 目录与本主题无关）。
- 已自查：38 条引用逐条核对 `locator.file` 等于其 snapshot 绑定 artifact 的 `file`、excerpt 在 pinned 源码中逐字命中且落在 `file_lines` 区间内、artifact 的 `content_sha256` 等于该文件真实字节 sha256；正文 38 个 `[@...]` 标记与 38 个引用文件一一对应，无孤儿 artifact、无未被引用的 reference。

## 未解决项

1. docs 仓库来源当前不可达，需要维护者在网络允许时确认 `dfd2628c` 是否仍可达，或更新 `source-zoo-code-docs` 的 revision。
2. `archive/zoo-code/` 缺失导致既有 `archived_document` 记录无法做原件审计，本轮未触碰这些记录。
3. 保留机制与完整性校验两处缺口需要官方文档或后续源码证据才能升级到 `answered`。
4. 其它主题在本产品上仍有遗留 pending 题（来自本轮 scan 的 `requires_maintenance` 提示），因此 `review_status` 保持 `pending`，本轮未改动它们的 `pending_question_ids`。
