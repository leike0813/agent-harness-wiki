---
schema_version: 3
record_kind: production
edition_id: omp-native_plugins-v1
harness_id: omp
topic: native_plugins
title: OMP 原生插件机制
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs:
      - ref-omp-extensions-doc
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs:
      - ref-omp-plugins-manifest-code
      - ref-omp-plugins-loader-code
      - ref-omp-plugins-command-code
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-omp-plugins-installed-code
      - ref-omp-plugins-command-code
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs:
          - ref-omp-extensions-doc
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs:
          - ref-omp-plugins-manifest-code
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs:
          - ref-omp-plugins-command-code
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs:
          - ref-omp-plugins-loader-code
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: partial
        source_refs:
          - ref-omp-extensions-doc
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs:
          - ref-omp-plugins-installed-code
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs:
          - ref-omp-plugins-command-code
---
## 插件模型与 API {#plugins-model}

**plugins.model**：OMP 的扩展是默认导出工厂的 TS/JS 模块，可注册事件处理、工具、slash 命令、快捷键、消息渲染与注入 API；插件包据此以 manifest 声明工具、钩子、扩展与命令入口。它与 Skill、MCP server、Hook 脚本属于不同层。 [@ref-omp-extensions-doc]

**plugins.api**：API 面为 pi.on、pi.registerTool、pi.registerCommand 等；加载阶段只允许注册，运行时动作要等 ExtensionRunner 初始化之后。宿主的权限边界本章未取证，属部分结论。 [@ref-omp-extensions-doc]

## 包格式与安装发现 {#plugins-package}

**plugins.package**：manifest 取自包 package.json 的 omp 或 pi 字段，字段含 name、version、description、tools、hooks、extensions、commands、features 与 settings。兼容性声明方式本章未取证。 [@ref-omp-plugins-manifest-code]

**plugins.install**：`omp plugin` 的动作集含 install、uninstall、list、link、doctor、enable、disable、discover、upgrade 等；安装作用域通过 --scope user 或 project 区分。本轮未真正安装插件。 [@ref-omp-plugins-command-code]

**plugins.discovery**：每个插件根从 node_modules、package.json 的 dependencies 与 omp-plugins.lock.json 的 plugins 枚举，并遵循项目级 disabled 与 features 覆盖。加载顺序与命名冲突处理本章未验证。 [@ref-omp-plugins-loader-code]

## 生命周期与诊断 {#plugins-lifecycle}

**plugins.lifecycle**：已安装记录区分 enabled 与 enabledFeatures（null 表示用默认），运行态另有 version 与 enabled 字段。区分已安装、启用、发现、加载、激活与健康需要运行态观察，本章未做。 [@ref-omp-plugins-installed-code]

**plugins.diagnostics**：doctor 动作用于诊断，命令另有 --json 输出；本轮没有安装受管插件，list 与 doctor 的实际输出以及 loaded、active、healthy 判定均未取证。 [@ref-omp-plugins-command-code]
