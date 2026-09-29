# 知识怎样进入读者章节

读者从产品概览进入 Skills、MCP、自定义 Agent、自定义 Provider、Hooks、原生插件与配置机制七个主题页。每篇章节按 [53 个固定问题](topic-questions.md)记录 `answered`、`partial`、`unknown`、`not_applicable` 或 `conflict`，在正文相应位置说明机制、条件和缺口。状态属于具体问题；同一页中已知与未知可以并存。

## 来源和版本

`registry/` 登记产品与官方来源。`knowledge/<harness-id>/artifacts/` 和 `snapshots/` 固定所查的源码提交、文档内容或包身份；`references/` 把短摘录与文件行号、符号或文档章节绑定到某个快照。章节正文的 `[@reference-id]` 可在站点打开，也能用 CLI `query source` 或 MCP `get_source` 查询。归档原件位于 Git 忽略的 `archive/`，供显式审计；普通阅读只使用发布内的短摘录和来源定位。

章节默认说明固定来源中发现的机制。源码提交和未标软件版本的网页不能自动证明某个 npm 版本。只有 `mappings/` 中有对应包快照及逐小节证据时，查询才选出映射版本；无映射时返回 `source_only`，请求版本仍为 `not_verified`。前缀或最近较早版本匹配也不把请求版本变成已验证版本。

## 从编辑到发布

```text
固定官方来源 → 逐题调查与章节引用 → 章节和来源校验
    → 构建不可变 release → 站点、CLI、MCP 验收 → 切换 current
```

Git 中的章节 Markdown、来源引用 YAML、版本映射 YAML 与 `registry/chapter-current.yaml` 是知识真源。编译器从同一份输入生成 JSON、SQLite 与站点 Markdown，在 staging 中核对 hash、数据库和页面后保存不可变发布。正式发布可先用 `pnpm ahw compile ... --stage` 构建；验收后用 `pnpm ahw publish --release-id <id>` 切换 `releases/current.json`。运行中的 MCP 进程固定启动时选定的发布，切换指针后需要重启才会读取新版本。

旧 `claims/`、`evidence/`、`assessments/`、`coverage/` 与 `guides/` 保留为调查材料，不由新查询接口读取，也不作为新章节的人工接受门禁。发现来源冲突或推翻既有配置步骤时，应先在受影响的问题中并列证据与适用边界，再按 [PRD](PRD.md) 的维护规则复核。查询不会联网、执行 harness 或调用 LLM。
