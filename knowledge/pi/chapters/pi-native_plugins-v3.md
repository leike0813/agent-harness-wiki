---
schema_version: 3
record_kind: production
edition_id: pi-native_plugins-v3
harness_id: pi
topic: native_plugins
title: Pi 包：安装、声明与资源过滤（固定源码 8369268）
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs:
      - ref-pi-packages-doc-sources
      - ref-pi-packages-doc-identity
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs:
      - ref-pi-packages-doc-install
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs:
      - ref-pi-packages-doc-manifest
      - ref-pi-packages-doc-dependencies
      - ref-pi-packages-doc-filter
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-pi-packages-doc-install
      - ref-pi-packages-doc-identity
      - ref-pi-config-trust-protected
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-pi-packages-doc-dependencies
      - ref-pi-packages-doc-filter
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs:
          - ref-pi-packages-doc-sources
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs:
          - ref-pi-packages-doc-sources
          - ref-pi-packages-doc-identity
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs:
          - ref-pi-packages-doc-install
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs:
          - ref-pi-packages-doc-manifest
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs:
          - ref-pi-packages-doc-manifest
          - ref-pi-packages-doc-filter
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs:
          - ref-pi-packages-doc-install
          - ref-pi-packages-doc-identity
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs:
          - ref-pi-packages-doc-dependencies
          - ref-pi-packages-doc-filter
---
固定来源为 pi 仓库提交 83692682 的 Pi coding agent 包文档 `packages/coding-agent/docs/packages.md`。当前来源明确给出包身份、依赖与过滤规则，本章按该来源重写 pi-native_plugins-v2 中依赖推断的部分。本库未为 Pi 建立软件版本映射，按 source_only 阅读。

## 包是什么与来源形态 {#plugins-model}

包是扩展、skill、prompt 模板与主题的打包分发单元，来源有四类：[@ref-pi-packages-doc-sources]

| 来源 | 示例 | 行为 |
|---|---|---|
| npm | `npm:@example/pi-tools@1.0.0` | 安装到 Pi 的 npm 目录 |
| git | `git:github.com/example/pi-tools@v1` | 克隆并对所选 ref 做同步 |
| URL | `https://github.com/example/pi-tools` | 按 git 来源处理 |
| 本地 | `./pi-tools` | 从解析后的路径加载，不复制 |

带版本的 npm 规格被锁定；git tag 与 commit 同样被锁定，更新只会同步检出内容，不会移动配置的 ref。[@ref-pi-packages-doc-sources] 身份去重规则：npm 包按包名、git 包按去掉 ref 的仓库 URL、本地包按解析后的绝对路径识别，避免同一包经等价声明被加载两次。[@ref-pi-packages-doc-identity] 同一包同时出现在个人与项目设置时，项目条目通常替换个人条目；若个人条目带 `autoload: false`，项目条目改为对个人包做过滤增量。[@ref-pi-packages-doc-identity]

## 安装与卸载 {#plugins-install}

```bash
pi install npm:@example/pi-tools@1.0.0
pi install git:github.com/example/pi-tools@v1
pi install ./local-package
pi remove SOURCE
pi update --extensions
```

[@ref-pi-packages-doc-install] 个人级安装写入 `~/.pi/agent/settings.json`，加 `--local`／`-l` 则写入 `.pi/settings.json` 的包声明。[@ref-pi-packages-doc-install]

## 清单、依赖与资源过滤 {#plugins-api}

没有 `pi` 清单时，Pi 从包目录发现 TypeScript 与 JavaScript 扩展、skill 目录、Markdown prompt 和 JSON 主题；资源在别处或需要过滤时才写显式清单：[@ref-pi-packages-doc-manifest]

```json
{
  "name": "my-pi-package",
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["./src/extension.ts"],
    "skills": ["./resources/skills"],
    "prompts": ["./resources/prompts/*.md"]
  }
}
```

依赖写法有硬约束：`@earendil-works/pi-ai`、`@earendil-works/pi-agent-core`、`@earendil-works/pi-coding-agent`、`@earendil-works/pi-tui`、`typebox` 这些宿主提供的包必须声明在 `peerDependencies` 且版本范围写 `"*"`，不能打进包里。[@ref-pi-packages-doc-dependencies] 把它们写进 `dependencies` 会绕过 Pi 的扩展模块映射，在编译后的 ESM 里产生重复类、重复注册表和重复初始化，Pi 会对这种清单配置给出扩展告警；本地包不会被安装或修改，其依赖树由包作者负责。[@ref-pi-packages-doc-dependencies] 相对 v2 记录的包名列表，宿主提供的包已随项目改名为 `@earendil-works/*`。

每种资源类型的过滤语义：省略该属性则加载清单允许的全部，`[]` 表示该类型一个都不加载，`!pattern` 排除 glob 匹配，`+path` 精确包含一条路径，`-path` 精确排除一条路径。[@ref-pi-packages-doc-filter] 过滤只能收窄包清单，不能暴露包本身未声明的资源。[@ref-pi-packages-doc-filter]

## 生命周期与信任 {#plugins-lifecycle}

`pi list` 列出已配置的包，`pi update --extensions` 让安装结果与配置对齐。[@ref-pi-packages-doc-install] 项目包只有在授予项目信任之后才安装与加载。[@ref-pi-packages-doc-install] 个人与项目同时声明同一个包时按前述身份与去重规则处理，重复声明不会让同一个包被加载两次。[@ref-pi-packages-doc-identity] 相对 v2 只记 `autoload` 与热重载，当前来源把这些动作绑定到显式 CLI 命令。

## 诊断 {#plugins-diagnostics}

可观察的信号有两类：宿主提供包被写进 `dependencies` 时的扩展告警，[@ref-pi-packages-doc-dependencies] 以及过滤配置不生效时“包内并未声明该资源”这一前提。[@ref-pi-packages-doc-filter] 缺口：当前来源未给出逐包列出“实际加载了哪些资源及其来源”的命令，验证加载结果需要另做运行观察。
