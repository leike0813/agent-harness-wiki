# 0004 — 固定来源与原件边界

状态：accepted  
日期：2026-09-27  
对应：PRD §6、§12、§18，OpenSpec `m1-source-and-artifact-boundary`

首个真实来源同时采用 [Codex 官方源码](https://github.com/openai/codex) 与 [CLI 官方文档](https://developers.openai.com/codex/cli.md)。源码作为 submodule 固定到 commit `67a709665ac7b50311b93e32612c9a8281684787`，只表示源码树；选定的 `README.md` SHA-256 为 `ba4e1f69ff48386e72a9c5e1edaf76aad64a475c2d51af79ccba6d1128261ba7`。不执行源码或推断发行包行为。

2026-09-27T09:43:23Z 抓取的官方 CLI Markdown 从 `developers.openai.com` 跳转到 `learn.chatgpt.com`，保存在忽略的 `archive/`；原始与 identity 提取 SHA-256 都是 `4592869a38de248eef8c623816032bc34787c7797fcf7a64e41d860da83d1a5e`。文档没有精确软件版本适用性，因此快照显式标为 unknown，不参与版本发现或精确 Claim 复核。

普通生产校验只读 Git 跟踪的元数据，不依赖归档、submodule 内容或网络。`sources:audit` 是显式本机检查；缺失或哈希不符时报错。构建器版本 2 将 Artifact 元数据加入 JSON 和 SQLite，发布物仍不包含原件。版本 1 发布保持可读取。此阶段没有真实 Claim，查询不产生真实能力结论。
