---
schema_version: 3
record_kind: fixture
edition_id: demo-open-cli-local_transcripts-v1
harness_id: demo-open-cli
topic: local_transcripts
title: Demo Open CLI 本地 Transcript（虚构）
sections:
  - section_id: transcript-storage
    surface_ids:
      - cli
    source_refs:
      - ref-demo-open-transcripts
  - section_id: transcript-diagnostics
    surface_ids:
      - cli
    source_refs: []
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids:
          - cli
        section_id: transcript-storage
        status: partial
        source_refs:
          - ref-demo-open-transcripts
  - question_id: transcripts.location
    answers:
      - surface_ids:
          - cli
        section_id: transcript-storage
        status: partial
        source_refs:
          - ref-demo-open-transcripts
  - question_id: transcripts.naming
    answers:
      - surface_ids:
          - cli
        section_id: transcript-storage
        status: answered
        source_refs:
          - ref-demo-open-transcripts
  - question_id: transcripts.format
    answers:
      - surface_ids:
          - cli
        section_id: transcript-storage
        status: answered
        source_refs:
          - ref-demo-open-transcripts
  - question_id: transcripts.schema
    answers:
      - surface_ids:
          - cli
        section_id: transcript-storage
        status: partial
        source_refs:
          - ref-demo-open-transcripts
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids:
          - cli
        section_id: transcript-storage
        status: partial
        source_refs:
          - ref-demo-open-transcripts
  - question_id: transcripts.database
    answers:
      - surface_ids:
          - cli
        section_id: transcript-storage
        status: answered
        source_refs:
          - ref-demo-open-transcripts
  - question_id: transcripts.archive
    answers:
      - surface_ids:
          - cli
        section_id: transcript-storage
        status: partial
        source_refs:
          - ref-demo-open-transcripts
  - question_id: transcripts.cleanup
    answers:
      - surface_ids:
          - cli
        section_id: transcript-storage
        status: partial
        source_refs:
          - ref-demo-open-transcripts
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids:
          - cli
        section_id: transcript-diagnostics
        status: unknown
        source_refs: []
---
## 本地记录与存储 {#transcript-storage}

这是虚构测试产品，所有路径和操作只用于验证知识链路。固定虚构文档没有证明任何真实产品或软件包版本。

记录包含用户和助手消息；工具事件的持久化范围在虚构来源中没有说明。 [@ref-demo-open-transcripts]

虚构路径为 `~/.demo/sessions/{session_id}.jsonl`；其他平台和路径覆盖规则未说明。 [@ref-demo-open-transcripts]

创建时指定 session ID，恢复沿用同一 ID；文件名为 `{session_id}.jsonl`。 [@ref-demo-open-transcripts]

记录采用 UTF-8 JSONL，每条消息追加一行。 [@ref-demo-open-transcripts]

每条记录必需 `type: message`、`session_id`、`role`（user 或 assistant）与字符串 `content`。 [@ref-demo-open-transcripts]

消息以追加方式写入，恢复使用原 session ID；刷盘、分支和上下文压缩细节未说明。 [@ref-demo-open-transcripts]

这个虚构产品不使用数据库，恢复历史保存在会话文件。 [@ref-demo-open-transcripts]

关闭 CLI 后复制文件；恢复时放回原路径并使用原 session ID。跨机器迁移未说明。 [@ref-demo-open-transcripts]

关闭 CLI 后可删除会话文件，删除会失去恢复历史；自动保留规则未说明。 [@ref-demo-open-transcripts]

最小脱敏消息示例：

```json
{"type":"message","session_id":"demo-session","role":"user","content":"Example request"}
```

字段只描述虚构来源中的这一种消息记录；其他记录类型和 schema 版本信息尚无来源。 [@ref-demo-open-transcripts]

## 诊断缺口 {#transcript-diagnostics}

来源没有诊断命令或损坏记录处理说明，需要检查虚构产品的读取入口。
