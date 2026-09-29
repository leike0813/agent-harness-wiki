# MCP 工具契约与连续调用样例

这是[“确定 MCP 工具参数与返回契约”](issues/06-mcp-contract.md)的规划资产。示例不是已发布知识，也不是 Codex CLI、Claude Code 的行为断言。`demo-open-cli`、`demo-closed-cli`、版本映射与来源 ID 均为虚构。

用户问：“我在项目里配置 `demo-open-cli` 的 Skill，应该放哪里？如果我安装的是 `2.0.0`，这些说明还适用吗？另一个 CLI 有什么不同？”

## 1. 找产品

```json
list_harnesses({"query":"demo-open","limit":10})
→ {"release_id":"sample-release","items":[{"harness_id":"demo-open-cli","name":"Demo Open CLI","surfaces":["cli"]}],"next_cursor":null}
```

`query` 可省略以浏览全部产品。列表页只给身份和范围概况，不把来源提交说成已验证的软件版本。

## 2. 读完整主题

```json
get_topic({"harness":"demo-open-cli","topic":"skills"})
→ {
  "release_id":"sample-release",
  "status":"ok",
  "harness_id":"demo-open-cli",
  "topic":"skills",
  "version_resolution":{"requested":null,"selected_software_version":null,"match":"latest_published","requested_applicability":"not_requested"},
  "source_scopes":[{"kind":"source_snapshot","id":"sample-source-revision"}],
  "title":"Demo Open CLI / Skills",
  "body_markdown":"# Demo Open CLI / Skills\n\n## 发现位置…",
  "sections":[{"section_id":"skills-locations","title":"发现位置","question_ids":["skills.roots","skills.discovery"],"source_refs":["sample-source-1"]}],
  "questions":[{"question_id":"skills.roots","status":"answered","section_id":"skills-locations"},{"question_id":"skills.diagnostics","status":"unknown","reason":"尚未找到诊断入口"}],
  "source_refs":["sample-source-1"]
}
```

不传 `version` 读取当前知识发布中最新的调查章节；这不是“最新软件发行版”的承诺。`source_scopes` 列出章节依据的固定来源；一章可以同时依据源码提交和官方文档快照，不暗示某个安装包版本已验证。`body_markdown` 是完整正文；`sections` 是定位索引，不重复每段正文。局部未知写在受影响章节，并在 `questions` 标出。

## 3. 单独读小节

```json
get_topic({"harness":"demo-open-cli","topic":"skills","section_id":"skills-locations"})
→ {"release_id":"sample-release","status":"ok","version_resolution":{"requested":null,"selected_software_version":null,"match":"latest_published","requested_applicability":"not_requested"},"source_scopes":[{"kind":"source_snapshot","id":"sample-source-revision"}],"section_id":"skills-locations","question_ids":["skills.roots","skills.discovery"],"body_markdown":"## 发现位置…","source_refs":["sample-source-1"]}
```

`section_id` 使用页面稳定锚点；调查问题编号保留在 `question_ids` 索引。一个写作小节可回答多个问题。

整章超过响应上限时，返回明确超限结果与小节索引，Agent 再按 `section_id` 读取；不截断正文后假装整章已返回。

## 4. 查询安装版本与来源

```json
get_topic({"harness":"demo-open-cli","topic":"skills","version":"2.0.0"})
→ {"release_id":"sample-release","status":"approximate","version_resolution":{"requested":"2.0.0","selected_software_version":"1.9.0","match":"nearest_earlier","requested_applicability":"not_verified"},"source_scopes":[{"kind":"source_snapshot","id":"sample-source-revision"}],"body_markdown":"# Demo Open CLI / Skills…"}

get_topic({"harness":"demo-closed-cli","topic":"skills","version":"2.0.0"})
→ {"release_id":"sample-release","status":"source_only","version_resolution":{"requested":"2.0.0","selected_software_version":null,"match":"source_only","requested_applicability":"not_verified"},"source_scopes":[{"kind":"document_snapshot","id":"sample-doc-snapshot"}],"body_markdown":"# Demo Closed CLI / Skills…"}

get_source({"source_ref":"sample-source-1"})
→ {"release_id":"sample-release","status":"ok","source":{"id":"sample-source-1","kind":"official_source","snapshot_id":"sample-source-revision","locator":"path/to/file.ts#symbol","url":"https://example.invalid/source","excerpt":"Published short excerpt"}}
```

第一个版本请求返回 `1.9.0` 的正文，不能声称它已适用于 `2.0.0`。第二个请求只有固定官方文档快照，没有可靠的软件版本映射，因此保留正文供参考，但不编造实际匹配版本。`get_source` 只取发布内允许展示的来源定位与短摘录，不读取本地原件。

## 5. 搜索与比较

```json
search_knowledge({"text":"Skill 放置位置","topic":"skills","limit":10})
→ {"release_id":"sample-release","items":[{"harness_id":"demo-open-cli","topic":"skills","section_id":"skills-locations","preview":"…","source_scopes":[{"kind":"source_snapshot","id":"sample-source-revision"}]}],"next_cursor":null}

compare_topics({"targets":[{"harness":"demo-open-cli","version":"2.0.0"},{"harness":"demo-closed-cli"}],"topic":"skills","question_ids":["skills.roots"]})
→ {"release_id":"sample-release","items":[{"harness_id":"demo-open-cli","version_resolution":{"requested":"2.0.0","selected_software_version":"1.9.0","match":"nearest_earlier","requested_applicability":"not_verified"},"source_scopes":[{"kind":"source_snapshot","id":"sample-source-revision"}],"answers":[{"question_id":"skills.roots","status":"answered","section_id":"skills-locations","source_refs":["sample-source-1"]}]},{"harness_id":"demo-closed-cli","version_resolution":{"requested":null,"selected_software_version":null,"match":"latest_published","requested_applicability":"not_requested"},"source_scopes":[{"kind":"document_snapshot","id":"sample-doc-snapshot"}],"answers":[{"question_id":"skills.roots","status":"unknown","reason":"调查记录中的具体缺口"}]}]}
```

搜索结果给可回读的小节定位；比较沿共同问题编号对齐，保留各产品自己的来源边界，给出状态与小节定位，不另写比较摘要或综合排名。Agent 再按需调用 `get_topic` 读取原文。搜索不接受安装版本筛选；安装版本适用性由 `get_topic` 检查。

## 五个工具

`harness` 接收目录中的 ID 或无歧义别名。所有响应带 `release_id`；服务启动时固定知识发布，工具输入不含发布 ID。主题正文描述产品形态、平台及生效条件，工具无需逐项接收这些条件。细节由章节解释，不能根据 MCP 进程的环境变量推断用户环境。

<!-- prettier-ignore -->
| 工具 | 输入与默认值 | 返回 |
|---|---|---|
| `list_harnesses` | `query?`、`limit=10`、`cursor?`；上限 20 | 产品 ID、名称、别名、形态、主题可用性、`next_cursor`；来源提交不写成已验证软件版本 |
| `get_topic` | `harness`、`topic` 必填；`section_id?`、`version?` | 章节或小节 Markdown、稳定小节索引、调查问题状态、版本解析、`source_scopes` 与 `source_refs` |
| `search_knowledge` | `text?`、`harness?`、`topic?` 至少一个；`limit=10`、`cursor?`；上限 20 | 当前最新章节的小节定位、正文片段、来源范围、`next_cursor`；无命中返回空数组 |
| `compare_topics` | `targets` 为 2–5 个 `{harness, version?}`；`topic` 必填；`question_ids?` 默认该主题全部共同问题 | 按问题编号对齐的状态、小节定位和来源；各目标分别给版本解析，不另维护比较摘要 |
| `get_source` | `source_ref` 必填 | 发布内官方链接、固定快照身份、精确定位与可展示短摘录；不读完整归档原件 |

`section_id` 是页面稳定锚点，`question_ids` 是调查问题索引。一个写作小节可以回答多个问题。搜索命中给 `section_id`，Agent 用 `get_topic` 读取原文。`compare_topics` 的目标分别指定版本，允许把两个产品或同一产品的两个版本并排比较；不自动排名，不把未知当作不支持。

## 版本选择与历史

省略 `version` 读取当前知识发布中该产品主题的最新调查章节。这是发布选择，不是联网查到的最新软件发行版。当前发布的只读索引包含仍可查询的历史章节；MCP 进程不会为了单次调用切换发布。历史章节的存储形式见[“确定结构化知识的最小模型”](issues/10-knowledge-model.md)。

指定 `version` 时，先找与软件发行版可靠对应的精确章节；版本前缀（如 `2` 或 `2.1`）选匹配前缀的最新已知版本；否则只在有可信排序规则的已知版本中，找不晚于请求版本的最近版本。不能把源码提交时间、文档抓取时间或不具备可比规则的版本字符串硬排成软件版本。若没有可信软件版本映射，返回最新固定来源章节供参考，标为 `source_only`，实际匹配版本为 `null`。

每个 `get_topic` 结果和比较目标都给 `version_resolution`：`requested`、`selected_software_version`、`match`（`latest_published`、`exact`、`prefix`、`nearest_earlier`、`source_only`）及 `requested_applicability`。精确映射可标为 `verified`，只表示来源与该软件版本的对应关系有依据，不表示实际启动测试；前缀与近似匹配只对选中的实际版本有依据，对请求范围标为 `not_verified`；省略请求标为 `not_requested`。`status` 用 `ok`、`approximate` 或 `source_only` 区分正文选取方式。Agent 不得把近似版本或来源章节的正文表述为请求版本已经验证。

版本选择以请求的整个章节或小节为单位，不把几个软件版本的小节拼成虚构章节。若只对部分小节建立了软件版本映射，整章可退到标明来源边界的 `source_only`；小节请求仍可单独命中自己的版本。正文上的条件、冲突和局部缺口原样保留。

## 状态、分页与响应大小

章节存在但有局部未查明、不适用或冲突时，章节状态仍为 `ok`；`questions` 按问题给 `answered`、`partial`、`unknown`、`not_applicable`、`conflict` 与必要的原因、小节定位及该问题自己的来源引用。明确不支持属于已回答问题，正文写明限制与来源。产品、主题、小节或来源 ID 不存在返回 `not_found`；别名无法唯一解析返回 `ambiguous`。这些是正常业务结果。

`list_harnesses` 与 `search_knowledge` 的 cursor 绑定发布、规范化查询和排序版本。输入格式错误、续页条件变化或索引不可用返回结构化错误码，MCP 标记 `isError`。正文和短摘录遵守 128 KiB 响应上限，来源短摘录最多 2000 字符。整章超限时返回普通业务结果 `response_too_large` 与小节索引，不截断正文；发布前保证每个小节可在上限内完整读取。`structuredContent` 和文本内容表达同一结果。
