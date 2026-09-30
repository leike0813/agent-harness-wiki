---
schema_version: 3
record_kind: production
edition_id: pi-native_plugins-v2
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
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-pi-packages-manage
      - ref-pi-packages-dedupe
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
        section_id: plugins-diagnostics
        status: partial
        source_refs:
          - ref-pi-packages-manage
          - ref-pi-packages-dedupe
          - ref-pi-ext-reload
          - ref-pi-cp-quick
---
固定来源为 pi-mono 仓库提交 781152fc 的 Pi coding agent 包（包内文档与源码）。Pi 的“插件”对应 pi package：把 extensions、skills、prompt templates、themes 打包共享；扩展是可执行资源，Skill 是指令资源。以下来自该固定来源的包文档与扩展文档，未做运行观察，也未与任何精确 npm 版本建立映射，按 source_only 阅读。

## 什么是 pi package {#plugins-model}

Pi 没有与包无关的独立插件清单；等价物是 pi package（npm、git 或本地），把 extensions、skills、prompt templates、themes 打包共享。[@ref-pi-packages-structure] 扩展是可执行代码资源，从目录自动发现或由包提供。[@ref-pi-ext-locations] 包在 `package.json` 里用 `pi` 清单声明这四类资源：

```json
{
  "name": "my-package",
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["./extensions"],
    "skills": ["./skills"],
    "prompts": ["./prompts"],
    "themes": ["./themes"]
  }
}
```

清单里的路径相对包根，数组支持 glob 与 `!exclusions`；加上 `pi-package` 关键字便于被发现；没有清单时按约定目录自动发现这四类资源。[@ref-pi-packages-structure] 生效结果是安装并加载该包时，其中的资源按清单或约定目录被发现；只写了 `package.json` 并不表示已被加载。

## 安装与管理 {#plugins-install}

```bash
pi install npm:@foo/bar@1.0.0
pi install git:github.com/user/repo@v1
pi install /absolute/path/to/package
pi remove npm:@foo/bar
pi list
pi update
pi update --extensions
```

`pi install` 支持 npm、git、https 与 ssh 以及本地路径；默认写全局 settings，`-l` 写项目 settings；带版本或 ref 的 spec 会被固定并跳过更新；`pi remove`、`pi list`、`pi update` 负责管理，`-e` 只临时运行不落盘。[@ref-pi-packages-manage][@ref-pi-packages-sources] 这些是安装与管理命令的形态：`pi install` 成功表示包被登记，不表示其中扩展已加载或可用。npm 来源里，版本化 spec 会被固定，全局安装走 `npm install -g`，项目安装落在 `.pi/npm/`。[@ref-pi-packages-sources]

解析后按清单或约定目录发现资源，可再用 settings 的对象式过滤收窄（`[]` 全关、`!pattern` 排除、`+path` 与 `-path` 精确增删），过滤只在清单允许范围内生效。[@ref-pi-packages-structure] 同名包同时出现在全局与项目时项目条目胜出，身份按 npm 包名、去掉 ref 的 git URL、或本地绝对路径判定。[@ref-pi-packages-dedupe]

## 扩展点 {#plugins-api}

扩展可注册自定义工具（`pi.registerTool`，含参数与 execute）、命令、快捷键、flag、provider（registerProvider 与 unregisterProvider），并订阅事件；注册在加载期或运行期都可以，运行期新增的工具立即可用。[@ref-pi-ext-register][@ref-pi-cp-quick]

## 可区分的状态 {#plugins-lifecycle}

能区分的状态有：已登记（`pi list` 读 settings）、已安装（npm 或 git 缓存目录）、已启用（`pi config` 过滤）、已加载（扩展被载入并执行工厂）；自动发现目录见扩展文档。[@ref-pi-packages-manage][@ref-pi-packages-dedupe][@ref-pi-ext-locations] 缺口：没有第一方定义的“健康”状态，也没有区分“已安装但未激活”或“加载失败”的独立可观察标记。

## 诊断 {#plugins-diagnostics}

`pi list` 看登记、`pi config` 看启用、`/reload` 重载自动发现扩展；扩展工厂可以是 async，Pi 会等它返回再继续启动，因此工厂抛错会阻塞启动并暴露问题。[@ref-pi-packages-manage][@ref-pi-packages-dedupe][@ref-pi-ext-reload][@ref-pi-cp-quick] 缺口：没有查询某包版本、兼容性或依赖错误的命令，依赖问题要从安装与启动输出判断。
