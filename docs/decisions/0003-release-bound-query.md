# 0003：固定发布的离线查询

状态：已采用（2026-09-27）

## 决定

QueryService 在打开时核验并固定一个本地 KnowledgeRelease，之后只读取该发布的 SQLite；fixture 必须显式指定发布 ID。精确版本不回退，`latest_verified` 从同一 Target scope 和主题的已接受 Claim 选单一版本，`latest_upstream` 从已发布 Snapshot 选已发现版本并标注 `source_fetched_at`。只为纯数字点分 release 排序；无法比较时返回 ambiguous。

查询条件只来自调用参数，不读取服务进程环境。CLI 调用共享服务，不复写事实判断。搜索用结构化过滤、别名、精确键与路径及参数化的字面 FTS5；中文主题名使用固定别名。分页 cursor 绑定 release、查询和排序版本。

## 理由与边界

这使查询不会随上游或 `current.json` 的后续变化改写答案，也不会把发现时间当成验证时间。发布保留经校验的 Source/Snapshot 元数据，但不发布原始文件内容或未审核断言。当前无 MCP 工具、embedding 或联网查询；这些须单独实施。
