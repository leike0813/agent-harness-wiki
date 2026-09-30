---
schema_version: 3
record_kind: production
edition_id: aider-cli-native_plugins-v1
harness_id: aider
topic: native_plugins
title: "Aider CLI 的原生插件边界：分发、扩展点与生命周期"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-aider-pyproject, ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-install-optional-ide]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-aider-install-channels, ref-aider-pyproject, ref-aider-models-check-deps]
  - section_id: plugins-extension-boundaries
    surface_ids: [cli]
    source_refs: [ref-aider-llms-other, ref-aider-usage-lint, ref-aider-coders-all, ref-aider-scripting-python, ref-aider-base-create, ref-aider-sendchat-roles]
  - section_id: plugins-lifecycle-diagnostics
    surface_ids: [cli]
    source_refs: [ref-aider-config-sample-yaml, ref-aider-args-verbose-load, ref-aider-models-sanity, ref-aider-models-check-deps]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-aider-pyproject, ref-aider-docs-index, ref-aider-install-optional-ide]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-aider-pyproject, ref-aider-config-sample-yaml]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: not_applicable
        source_refs: [ref-aider-install-channels, ref-aider-pyproject]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-aider-docs-index, ref-aider-config-sample-yaml, ref-aider-pyproject]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-extension-boundaries
        status: not_applicable
        source_refs: [ref-aider-coders-all, ref-aider-base-create, ref-aider-scripting-python, ref-aider-usage-lint]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle-diagnostics
        status: not_applicable
        source_refs: [ref-aider-config-sample-yaml, ref-aider-args-verbose-load]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle-diagnostics
        status: partial
        source_refs: [ref-aider-models-sanity, ref-aider-models-check-deps, ref-aider-args-verbose-load]
---


## 固定来源与"原生插件"的边界 {#plugins-model}

固定来源是官方仓库提交 `5dc9490bb35f9729ef2c95d00a19ccd30c26339c` 的文档与实现。结论：Aider 没有原生插件机制——没有插件清单格式、没有插件加载器、没有插件目录、没有插件子命令，也没有插件 API。

判定依据：

1. `pyproject.toml` 只声明一个发行包 `aider-chat`、一个可执行入口 `aider = "aider.main:main"`，可选依赖只是 `dev`、`help`、`browser`、`playwright` 四个依赖组，没有任何入口点组（例如插件发现用的 entry point）。[@ref-aider-pyproject]
2. 文档目录页 `aider/website/docs/index.md` 由站点自动列出全部文档页，没有插件相关页面。[@ref-aider-docs-index]
3. 由解析器自动生成的样例配置自称列出全部合法配置项，其中没有插件键。[@ref-aider-config-sample-yaml]
4. 官方安装说明把 IDE/编辑器集成明确定义为**第三方**插件：文档说这些第三方插件"是否跟得上 aider 最新版本并不清楚"，建议直接用 `--watch-files` 在终端旁跑 aider；并邀请想要编辑器插件的人去开 issue，而不是提供官方插件接口。[@ref-aider-install-optional-ide]

因此"插件"主题下只有四个可讲的替代机制：包的分发通道、外部命令、内置模式、进程内 Python API。下面分别说明。

## 分发与依赖：安装的是包，不是插件 {#plugins-install}

Aider 是一个 Python 应用，安装通道全部是 Python 侧的 [@ref-aider-install-channels]：

- 官方引导脚本 `aider-install`（把 aider 装进独立 Python 环境，必要时自动装 Python 3.12）；
- `uv tool install --force --python python3.12 --with pip aider-chat@latest`；
- `pipx install aider-chat`；
- `pip install -U --upgrade-strategy only-if-needed aider-chat`。

文档同时提醒：aider 也出现在若干系统包管理器里，但它们"经常装出错误的依赖"，不推荐。[@ref-aider-install-channels] 包本身的可选依赖组（含 `playwright`、`browser`、`help`）在 `pyproject.toml` 里声明。[@ref-aider-pyproject]

模型 provider 的**运行期依赖**由宿主按模型前缀自动补装：`bedrock/` 前缀要求 `boto3`，`vertex_ai/` 前缀要求 `google-cloud-aiplatform`，缺失时提示并安装。[@ref-aider-models-check-deps]

这套机制里没有"启用/禁用/卸载某个插件"的状态：安装的对象是 Python 包与可选依赖，没有插件注册表。

## 实际的扩展点及其边界 {#plugins-extension-boundaries}

在没有插件 API 的前提下，Aider 的扩展只能发生在四个层面，且都不产生"可注册的能力"：

| 层面 | 入口 | 边界 |
| :-- | :-- | :-- |
| 模型/provider | `.aider.model.settings.yml`、`.aider.model.metadata.json`、`--model {provider}/{model}` | 只能改参数与元数据；协议实现由 litellm 决定 [@ref-aider-llms-other] |
| 外部命令 | `--lint-cmd`、`--test-cmd`、`/run`、建议执行的 shell 命令 | 以子进程运行，输出回灌给模型；没有返回值协议 [@ref-aider-usage-lint] |
| 角色/模式 | 包内 coder 类（`aider/coders/__init__.py` 的 `__all__`） | 类是内置的，用户无法新增 [@ref-aider-coders-all] |
| 进程内嵌入 | `aider.coders.Coder`、`aider.models.Model`、`Coder.create()` | 文档明确"不被官方支持、不保证向后兼容" [@ref-aider-scripting-python][@ref-aider-base-create] |

进程内嵌入与 CLI 同权限：它直接构造 coder 并调用 `coder.run()`，没有权限或沙箱层；调用方必须自己维持 user/assistant 交替的消息序列。[@ref-aider-sendchat-roles][@ref-aider-base-create]

## 生命周期与诊断 {#plugins-lifecycle-diagnostics}

由于没有插件，也就没有"已安装 / 已启用 / 已发现 / 已加载 / 已激活 / 健康"这组状态。可观察的运行状态只有两项：

1. **包版本与更新**：`--version` 打印版本；`--just-check-update` 检查更新并把结果放进退出码；`--check-update` 控制启动时是否检查；`--show-release-notes` 控制新版本首次运行是否展示发布说明；`--upgrade` 升级 PyPI 版本；`--install-main-branch` 安装 main 分支版本。[@ref-aider-config-sample-yaml]
2. **加载了什么**：`--verbose` 打印模型 settings 文件与元数据文件的搜索路径和实际加载结果，以及 `.env` 加载结果。[@ref-aider-args-verbose-load]

依赖与兼容类错误的定位入口是模型检查：缺少环境变量、未知所需变量、未知上下文窗口与成本都会给出警告，并可用模糊匹配建议相近模型名；缺 `boto3` / `google-cloud-aiplatform` 这类依赖时给出安装提示。[@ref-aider-models-sanity][@ref-aider-models-check-deps]

**缺口**：本章不能证明"上游永不会提供插件 API"。固定来源证明的是该提交下不存在插件机制；若上游后续引入，需要重新固定来源复核。
