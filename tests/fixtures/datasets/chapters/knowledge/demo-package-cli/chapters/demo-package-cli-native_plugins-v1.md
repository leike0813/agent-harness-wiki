---
schema_version: 2
record_kind: fixture
edition_id: demo-package-cli-native_plugins-v1
harness_id: demo-package-cli
topic: native_plugins
title: demo-package-cli native_plugins (fictional)
sections:
  - section_id: plugin-behavior
    source_refs:
      - ref-demo-package
  - section_id: plugin-remaining
    source_refs: []
questions:
  - question_id: plugins.model
    section_id: plugin-behavior
    status: answered
    source_refs:
      - ref-demo-package
  - question_id: plugins.package
    section_id: plugin-remaining
    status: unknown
    source_refs: []
  - question_id: plugins.install
    section_id: plugin-remaining
    status: unknown
    source_refs: []
  - question_id: plugins.discovery
    section_id: plugin-remaining
    status: unknown
    source_refs: []
  - question_id: plugins.api
    section_id: plugin-remaining
    status: unknown
    source_refs: []
  - question_id: plugins.lifecycle
    section_id: plugin-remaining
    status: unknown
    source_refs: []
  - question_id: plugins.diagnostics
    section_id: plugin-remaining
    status: unknown
    source_refs: []
---
## native_plugins 1 {#plugin-behavior}

**plugins.model**：虚构来源描述了外部扩展插件的交付。 [@ref-demo-package]

## native_plugins 2 {#plugin-remaining}

**plugins.package**：plugins.package 尚未调查；需要检查相应的固定来源入口。

**plugins.install**：plugins.install 尚未调查；需要检查相应的固定来源入口。

**plugins.discovery**：plugins.discovery 尚未调查；需要检查相应的固定来源入口。

**plugins.api**：plugins.api 尚未调查；需要检查相应的固定来源入口。

**plugins.lifecycle**：plugins.lifecycle 尚未调查；需要检查相应的固定来源入口。

**plugins.diagnostics**：plugins.diagnostics 尚未调查；需要检查相应的固定来源入口。
