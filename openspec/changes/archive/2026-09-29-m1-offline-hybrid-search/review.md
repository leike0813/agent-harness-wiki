# 2026-09-29 离线混合检索验收

暂存生产发布 `hybrid-search-20260929-v1` 从当前 35 篇章节生成 174 个小节、485 个最长 400 字符的片段；历史版不在搜索语料中，53 道固定问题都有问法。模型锁定为本机 Ollama `qwen3-embedding:4b`，manifest digest 为 `df5bd2e3c74cd8d069d21dc038f1b359fcdc9458fce1c99bd43c9eb1518ff907`，维度 2560。构建未安装依赖或下载模型。

固定问法以对应主题过滤：

| 问法 | 词法结果 | 离线混合结果首项 |
|---|---:|---|
| 怎样让代理调用外部工具？／MCP | 0 | `opencode/mcp-runtime`，可用 `get_topic` 回读，保留 3 个来源引用 |
| How are task recipes surfaced?／Skills | 0 | `claude-code/skills-invocation`，可用 `get_topic` 回读，保留 8 个来源引用 |

两条问法均返回 `semantic_status: available`，相同问法连续三次查询的前 20 项排序一致，每个小节只出现一次。`mcpServers` 的配置键精确命中排在语义候选前；`~/.codex/config.toml` 命中精确路径，中文短别名“钩子”命中 Hooks 小节。分页 cursor 拒绝主题变化。使用不可达的本机模型端点，或在临时发布副本中移走 `semantic.json`，都返回 `semantic_unavailable` 和保留的词法结果。CLI 与真实 MCP stdio 客户端对同一发布、同一查询返回相同的前五个小节 ID 和语义状态；MCP 保留来源范围。

`pnpm verify` 通过：16 个单元测试、42 个集成测试，以及类型、lint、格式、schema、章节校验和构建。`openspec validate m1-offline-hybrid-search --strict` 通过。`pnpm docs:build --release-id hybrid-search-20260929-v1` 通过，站点含 35 个产品主题页。重算首批片段时向量有轻微数值差异；发布内的向量文件及其 hash 固定，见 ADR 0007。
