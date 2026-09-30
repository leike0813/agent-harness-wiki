---
schema_version: 3
record_kind: production
edition_id: pi-native_plugins-v1
harness_id: pi
topic: native_plugins
title: Pi 原生插件：包与扩展装载（固定源码 781152f）
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs:
      - ref-pi-packages-structure
      - ref-pi-ext-locations
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs:
      - ref-pi-packages-manage
      - ref-pi-packages-sources
      - ref-pi-packages-structure
      - ref-pi-packages-dedupe
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs:
      - ref-pi-ext-register
      - ref-pi-cp-quick
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-pi-packages-manage
      - ref-pi-packages-dedupe
      - ref-pi-ext-locations
      - ref-pi-ext-reload
      - ref-pi-cp-quick
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs:
          - ref-pi-packages-structure
          - ref-pi-ext-locations
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs:
          - ref-pi-packages-structure
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs:
          - ref-pi-packages-manage
          - ref-pi-packages-sources
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs:
          - ref-pi-packages-structure
          - ref-pi-packages-dedupe
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs:
          - ref-pi-ext-register
          - ref-pi-cp-quick
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs:
          - ref-pi-packages-manage
          - ref-pi-packages-dedupe
          - ref-pi-ext-locations
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs:
          - ref-pi-packages-manage
          - ref-pi-packages-dedupe
          - ref-pi-ext-reload
          - ref-pi-cp-quick
body: |-
  Pi 的“插件”对应 pi package：把 extensions、skills、prompt templates、themes 打包共享；扩展是可执行资源，Skill 是指令资源。以下来自固定来源的包文档与扩展文档。

  ## 模型与包格式 {#plugins-model}

  **plugins.model**：Pi 没有与包无关的独立插件清单；等价物是 pi package（npm、git 或本地），它把 extensions、skills、prompt templates、themes 打包共享。[@ref-pi-packages-structure] 扩展是可执行代码资源，从目录自动发现或由包提供。[@ref-pi-ext-locations]

  **plugins.package**：包在 `package.json` 里用 `pi` 清单声明 extensions、skills、prompts、themes（路径相对包根，支持 glob 与 `!exclusions`），并可用 `pi-package` 关键字提高可发现性；无清单时按约定目录自动发现这四类资源。[@ref-pi-packages-structure]

  ## 安装 {#plugins-install}

  **plugins.install**：`pi install` 支持 npm、git、https 与 ssh 以及本地路径；默认写全局 settings，`-l` 写项目 settings；带版本或 ref 的 spec 会被固定并跳过更新；`pi remove`、`pi list`、`pi update` 负责管理，`-e` 只临时运行不落盘。[@ref-pi-packages-manage][@ref-pi-packages-sources]

  **plugins.discovery**：包解析后按清单或约定目录发现资源，可再用 settings 的对象式过滤收窄（`[]` 全关、`!pattern` 排除、`+path` 与 `-path` 精确增删），过滤只在清单允许范围内生效。[@ref-pi-packages-structure] 同名包同时出现在全局与项目时项目条目胜出，身份按 npm 包名、去掉 ref 的 git URL、或本地绝对路径判定。[@ref-pi-packages-dedupe]

  ## 扩展点 {#plugins-api}

  **plugins.api**：扩展可注册自定义工具（`pi.registerTool`，含参数与 execute）、命令、快捷键、flag、provider（registerProvider 与 unregisterProvider），并订阅事件；注册在加载期或运行期都可以，运行期新增的工具立即可用。[@ref-pi-ext-register][@ref-pi-cp-quick]

  ## 状态与诊断 {#plugins-lifecycle}

  **plugins.lifecycle**：可区分的状态是已登记（`pi list` 读 settings）、已安装（npm 或 git 缓存目录）、已启用（`pi config` 过滤）、已加载（扩展被载入并执行工厂）；自动发现目录见扩展文档。[@ref-pi-packages-manage][@ref-pi-packages-dedupe][@ref-pi-ext-locations] 缺口：没有第一方定义的“健康”状态，也没有区分“已安装但未激活”或“加载失败”的独立可观察标记。

  **plugins.diagnostics**：`pi list` 看登记、`pi config` 看启用、`/reload` 重载自动发现扩展；扩展工厂可以是 async，Pi 会等它返回再继续启动，因此工厂抛错会阻塞启动并暴露问题。[@ref-pi-packages-manage][@ref-pi-packages-dedupe][@ref-pi-ext-reload][@ref-pi-cp-quick] 缺口：没有查询某包版本、兼容性或依赖错误的命令，依赖问题要从安装与启动输出判断。

---
Pi 的“插件”对应 pi package：把 extensions、skills、prompt templates、themes 打包共享；扩展是可执行资源，Skill 是指令资源。以下来自固定来源的包文档与扩展文档。

## 模型与包格式 {#plugins-model}

**plugins.model**：Pi 没有与包无关的独立插件清单；等价物是 pi package（npm、git 或本地），它把 extensions、skills、prompt templates、themes 打包共享。[@ref-pi-packages-structure] 扩展是可执行代码资源，从目录自动发现或由包提供。[@ref-pi-ext-locations]

**plugins.package**：包在 `package.json` 里用 `pi` 清单声明 extensions、skills、prompts、themes（路径相对包根，支持 glob 与 `!exclusions`），并可用 `pi-package` 关键字提高可发现性；无清单时按约定目录自动发现这四类资源。[@ref-pi-packages-structure]

## 安装 {#plugins-install}

**plugins.install**：`pi install` 支持 npm、git、https 与 ssh 以及本地路径；默认写全局 settings，`-l` 写项目 settings；带版本或 ref 的 spec 会被固定并跳过更新；`pi remove`、`pi list`、`pi update` 负责管理，`-e` 只临时运行不落盘。[@ref-pi-packages-manage][@ref-pi-packages-sources]

**plugins.discovery**：包解析后按清单或约定目录发现资源，可再用 settings 的对象式过滤收窄（`[]` 全关、`!pattern` 排除、`+path` 与 `-path` 精确增删），过滤只在清单允许范围内生效。[@ref-pi-packages-structure] 同名包同时出现在全局与项目时项目条目胜出，身份按 npm 包名、去掉 ref 的 git URL、或本地绝对路径判定。[@ref-pi-packages-dedupe]

## 扩展点 {#plugins-api}

**plugins.api**：扩展可注册自定义工具（`pi.registerTool`，含参数与 execute）、命令、快捷键、flag、provider（registerProvider 与 unregisterProvider），并订阅事件；注册在加载期或运行期都可以，运行期新增的工具立即可用。[@ref-pi-ext-register][@ref-pi-cp-quick]

## 状态与诊断 {#plugins-lifecycle}

**plugins.lifecycle**：可区分的状态是已登记（`pi list` 读 settings）、已安装（npm 或 git 缓存目录）、已启用（`pi config` 过滤）、已加载（扩展被载入并执行工厂）；自动发现目录见扩展文档。[@ref-pi-packages-manage][@ref-pi-packages-dedupe][@ref-pi-ext-locations] 缺口：没有第一方定义的“健康”状态，也没有区分“已安装但未激活”或“加载失败”的独立可观察标记。

**plugins.diagnostics**：`pi list` 看登记、`pi config` 看启用、`/reload` 重载自动发现扩展；扩展工厂可以是 async，Pi 会等它返回再继续启动，因此工厂抛错会阻塞启动并暴露问题。[@ref-pi-packages-manage][@ref-pi-packages-dedupe][@ref-pi-ext-reload][@ref-pi-cp-quick] 缺口：没有查询某包版本、兼容性或依赖错误的命令，依赖问题要从安装与启动输出判断。


