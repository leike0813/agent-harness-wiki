---
schema_version: 3
record_kind: production
edition_id: aider-cli-mcp-v1
harness_id: aider
topic: mcp
title: "Aider CLI 与 MCP：机制边界、替代集成与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-aider-readme, ref-aider-pyproject, ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-coders-all]
  - section_id: mcp-integration-alternatives
    surface_ids: [cli]
    source_refs: [ref-aider-cmd-test-run, ref-aider-usage-run, ref-aider-usage-lint, ref-aider-llms-other, ref-aider-llms-openai-compat, ref-aider-usage-commands]
  - section_id: mcp-diagnostics-absence
    surface_ids: [cli]
    source_refs: [ref-aider-main-config-load, ref-aider-main-verbose-dotenv, ref-aider-main-metadata, ref-aider-main-verbose-model]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-scope
        status: not_applicable
        source_refs: [ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-pyproject]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-scope
        status: not_applicable
        source_refs: [ref-aider-config-sample-yaml, ref-aider-coders-all]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-scope
        status: not_applicable
        source_refs: [ref-aider-config-sample-yaml, ref-aider-pyproject]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-scope
        status: not_applicable
        source_refs: [ref-aider-config-sample-yaml, ref-aider-docs-index]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-scope
        status: not_applicable
        source_refs: [ref-aider-coders-all, ref-aider-config-sample-yaml]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-integration-alternatives
        status: not_applicable
        source_refs: [ref-aider-usage-commands, ref-aider-cmd-test-run, ref-aider-usage-lint]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-integration-alternatives
        status: not_applicable
        source_refs: [ref-aider-usage-run, ref-aider-usage-commands]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics-absence
        status: not_applicable
        source_refs: [ref-aider-main-verbose-dotenv, ref-aider-main-verbose-model]
---


## 固定来源与机制边界 {#mcp-scope}

本章的固定来源是官方仓库提交 `5dc9490bb35f9729ef2c95d00a19ccd30c26339c` 的文档与实现：`README.md`、`pyproject.toml`、`aider/website/docs/` 全部页面、`aider/args.py`、`aider/main.py`、`aider/commands.py`、`aider/coders/`。[@ref-aider-readme][@ref-aider-pyproject]

结论：Aider 在这批固定来源里**没有 MCP 客户端或服务端机制**。没有 MCP 配置键、没有 server 定义文件、没有连接生命周期，也没有把远端工具暴露给模型的通道。判定依据：

1. `aider/website/docs/index.md` 是文档站自动生成的目录，列出全部文档页（连接 LLM、配置、使用、脚本、排错等），其中没有任何 MCP 页面。[@ref-aider-docs-index]
2. `aider/website/assets/sample.aider.conf.yml` 由 `aider/args.py` 的解析器自动生成，自称列出全部合法配置项；没有 `mcp` 相关键，也没有"外部工具服务器"类的键。[@ref-aider-config-sample-yaml]
3. `pyproject.toml` 的依赖由 `requirements.txt` 动态给出、可选依赖只有 `dev`/`help`/`browser`/`playwright`；发行包名为 `aider-chat`，没有任何 MCP 依赖或 MCP 入口点。[@ref-aider-pyproject]
4. `aider/coders/__init__.py` 的 `__all__` 是模型的全部能力实现（提问、编辑、架构、整文件、补丁、上下文等），其中没有工具协议客户端。[@ref-aider-coders-all]

因此本主题 8 道题全部按"机制不存在"记录。下面两节说明 Aider 实际用来对接外部世界的手段，供读者判断如何替代 MCP 场景。

## Aider 实际提供的外部集成方式 {#mcp-integration-alternatives}

没有 MCP 时，Aider 对接外部工具与服务的现有手段是"进程与文件"，而不是"工具协议"：

- **Shell 命令**：`/run {command}`（别名 `!`）运行一条命令，并询问是否把输出加入聊天；`/test` 在退出码非零时把输出加入聊天。[@ref-aider-cmd-test-run][@ref-aider-usage-run]
- **自动 lint / test 命令**：`--lint-cmd`、`--auto-lint`、`--test-cmd`、`--auto-test` 让外部工具在每次编辑后自动运行，输出回灌给模型（见 Hooks 主题章节）。[@ref-aider-usage-lint]
- **模型与 provider**：所有 LLM 后端统一由 litellm 提供，`--model {provider}/{model}` 选择，`--openai-api-base` 指向 OpenAI 兼容端点；没有"工具服务器"这一层。[@ref-aider-llms-other][@ref-aider-llms-openai-compat]
- **网页抓取**：`/web {url}` 抓取页面并转成 markdown 发给模型；`--detect-urls` 控制是否在消息里自动发现 URL。[@ref-aider-usage-commands]

这些能力都要求用户显式触发或配置，模型不能自行发现并调用一个外部工具服务器。

## 诊断入口与缺口 {#mcp-diagnostics-absence}

可用的诊断只覆盖配置与模型，不覆盖工具协议：

- `--verbose` 会打印配置文件的搜索顺序（"Config files search order, if no --config:"）、实际加载的 `.env` 文件、模型 settings 文件与元数据文件的搜索与加载结果。[@ref-aider-main-config-load][@ref-aider-main-verbose-dotenv][@ref-aider-main-metadata]
- `--verbose` 还会转储当前模型的元数据与全部模型设置字段。[@ref-aider-main-verbose-model]

在这两处输出里都不存在 MCP 相关的段落或断言，因为解析器里没有对应参数。

**缺口（本主题所有问题共同的证据边界）**：以上是"文本与解析器里没有该机制"的证明，而不是运行期观察。固定来源没有给出 `aider --help` 在其它版本下的输出，也没有官方声明"永不支持 MCP"，因此若上游后续引入 MCP，需要重新固定来源再复核。没有 SDK、没有注册中心、也没有第三方 MCP 桥接的官方说明可引用。
