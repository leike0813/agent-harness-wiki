# 细化七类主题的调查问题与章节内容

Type: grilling
Status: resolved
Assignee: codex
Parent: [重新确定知识库交付与维护契约](../map.md)

## Question

将已确认的七类主题清单细化成可执行的调查契约：每类的必答问题、共同字段、产品特有小节、跨主题引用、结论/不适用/缺口的写法，以及像 Codex `agents/openai.yaml` 这类专有机制应怎样呈现？哪些例子和来源定位足以让章节可用？

## Resolution comment

用户采纳 Q13–Q18：每个适用问题写清结论、配置或使用方式、宿主处理链、适用来源与定位；第一方字段、事件和选项完整调查；每种配置入口给有来源的最小示例；专有机制归入所属主题，跨主题用链接；明确区分来源说明没有机制与当前尚未找到机制。

完整的 53 个必答问题及成稿规则见[七类主题的调查与成稿契约](../topic-contract.md)。Codex Skill 目录下的 `agents/openai.yaml` 被归为 `skills.extensions`，其 MCP 依赖连接细节链接到 MCP 主题。章节可按产品机制重排，但问题编号必须能定位答案；未查明的局部问题不阻断已查明内容的发布。
