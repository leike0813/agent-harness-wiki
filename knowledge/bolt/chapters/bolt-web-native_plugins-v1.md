---
schema_version: 3
record_kind: production
edition_id: bolt-web-native_plugins-v1
harness_id: bolt
topic: native_plugins
title: "Bolt 的插件边界：没有原生插件宿主，技能/连接器/私有 registry 都不是插件"
sections:
  - section_id: plugins-scope
    surface_ids: [web]
    source_refs: [ref-bolt-repo-package-json, ref-bolt-docs-index-listing, ref-bolt-repo-webcontainer]
  - section_id: plugins-model
    surface_ids: [web]
    source_refs: [ref-bolt-docs-skills-scopes, ref-bolt-docs-mcp-access, ref-bolt-docs-workspace-registries, ref-bolt-repo-package-json]
  - section_id: plugins-install
    surface_ids: [web]
    source_refs: [ref-bolt-repo-package-json, ref-bolt-docs-workspace-registries, ref-bolt-docs-workspace-templates, ref-bolt-docs-workspace-design, ref-bolt-docs-team-integrations]
  - section_id: plugins-diagnostics
    surface_ids: [web]
    source_refs: [ref-bolt-docs-workspace-open, ref-bolt-docs-account-open, ref-bolt-repo-logger-level]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [web]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-bolt-docs-skills-scopes, ref-bolt-docs-mcp-access, ref-bolt-docs-workspace-registries, ref-bolt-repo-package-json]
  - question_id: plugins.package
    answers:
      - surface_ids: [web]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-bolt-repo-package-json]
  - question_id: plugins.install
    answers:
      - surface_ids: [web]
        section_id: plugins-install
        status: not_applicable
        source_refs: [ref-bolt-repo-package-json, ref-bolt-docs-workspace-registries, ref-bolt-docs-workspace-templates]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [web]
        section_id: plugins-install
        status: not_applicable
        source_refs: [ref-bolt-repo-package-json, ref-bolt-docs-workspace-design]
  - question_id: plugins.api
    answers:
      - surface_ids: [web]
        section_id: plugins-model
        status: not_applicable
        source_refs: [ref-bolt-repo-package-json, ref-bolt-docs-skills-scopes]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [web]
        section_id: plugins-diagnostics
        status: not_applicable
        source_refs: [ref-bolt-docs-workspace-open, ref-bolt-docs-account-open]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [web]
        section_id: plugins-diagnostics
        status: not_applicable
        source_refs: [ref-bolt-docs-workspace-open, ref-bolt-docs-account-open, ref-bolt-repo-logger-level]
---

## 固定来源与机制边界 {#plugins-scope}

本章的固定来源是官方开源仓库提交 `eda10b121221b30825a4c16eec5da1fd3eb1eb99` 的依赖清单与运行时
实现，以及官方帮助站的文档索引 [@ref-bolt-repo-package-json][@ref-bolt-docs-index-listing]。

结论：**Bolt 没有原生插件机制**。仓库没有插件清单格式、没有插件宿主或加载器，`package.json`
的依赖里也没有任何插件框架 [@ref-bolt-repo-package-json]；运行时是一个浏览器内的 WebContainer
实例，启动时只做一次 `WebContainer.boot({ workdirName: 'project' })`，没有注册扩展点的环节
[@ref-bolt-repo-webcontainer]。官方文档索引列出的全部页面中也没有 plugins 页面
[@ref-bolt-docs-index-listing]。

因此本主题 7 道题按"机制不存在"记录，并在下面两节列出检查过的入口与读者可能误认成插件的
产品能力。

## 与 Skill、MCP、Hook、普通包的关系 {#plugins-model}

产品里容易被当成"插件"的能力有四类，它们都不是插件 [@ref-bolt-docs-workspace-registries][@ref-bolt-docs-skills-scopes][@ref-bolt-docs-mcp-access]：

| 能力 | 实际形态 | 与插件的差别 |
| :-- | :-- | :-- |
| 技能（Skills） | 一段带 `SKILL.md` frontmatter 的可复用指令，按描述匹配后进入提示 [@ref-bolt-docs-skills-scopes] | 只影响提示内容，不注册代码、不获得宿主 API |
| 连接器（MCP） | 远程 MCP server，工具按连接器开关 [@ref-bolt-docs-mcp-access] | 远程服务连接，不是本地代码包 |
| 私有 NPM registry | 团队管理员配置 registry URL/token/scope，让 Bolt 能安装内部包 [@ref-bolt-docs-workspace-registries] | 改变依赖安装来源，不向宿主注册能力 |
| 普通 npm 包 | 项目 `package.json` 的依赖 [@ref-bolt-repo-package-json] | 在项目里运行，不扩展宿主 |

宿主侧的扩展点为零：固定来源中不存在"插件能注册哪些能力 / 权限边界 / 宿主 API"的描述，也没有
可供插件调用的注册函数 [@ref-bolt-repo-package-json]。

## 包格式、安装与版本固定：检查结果 {#plugins-install}

**plugins.package**、**plugins.install**、**plugins.discovery**：检查过的入口与结论
[@ref-bolt-repo-package-json][@ref-bolt-docs-workspace-registries][@ref-bolt-docs-workspace-templates]：

| 检查过的入口 | 内容 | 是否插件机制 |
| :-- | :-- | :-- |
| `package.json` | 只有应用自身依赖与 scripts（`dev`/`build`/`deploy` 等），无插件清单字段 [@ref-bolt-repo-package-json] | 否 |
| 私有 registry 页 | 配置 URL、token、可选 scope，用于安装私有 NPM 包 [@ref-bolt-docs-workspace-registries] | 否，是依赖来源 |
| 团队模板 | 可复用的起始项目 [@ref-bolt-docs-workspace-templates] | 否，是项目模板 |
| 设计系统 | 团队可添加/查看/同步的设计资源，供对话里选用 [@ref-bolt-docs-workspace-design] | 否，是设计资源 |
| 团队集成控制 | GitHub / Stripe / Supabase 的团队级开关 [@ref-bolt-docs-team-integrations] | 否，是平台集成授权 |

因此"从哪里安装、如何固定版本、更新/禁用/卸载、用户级与项目级安装如何区分"这些问题没有对应
对象：不存在插件包格式与插件生命周期，也就不存在插件的版本固定或卸载入口。私有 registry 的
"安装"发生在项目构建期，作用于项目依赖，与宿主扩展无关
[@ref-bolt-docs-workspace-registries]。

## 诊断与缺口 {#plugins-diagnostics}

**plugins.lifecycle**、**plugins.diagnostics**：因为没有插件，"已安装 / 启用 / 发现 / 加载 /
激活 / 健康"这些状态没有可观察入口。可观察的相邻状态来自设置页与日志
[@ref-bolt-docs-workspace-open][@ref-bolt-docs-account-open]：

- 账户设置与工作区设置页面能显示各功能当前是否可用（例如团队工作区里的 Private registries、
  Packages knowledge、Design systems 页面）[@ref-bolt-docs-workspace-open]；
- 账户设置页面是连接器与加购功能的可见入口 [@ref-bolt-docs-account-open]；
- 通用日志级别 `VITE_LOG_LEVEL` 是唯一的运行期诊断开关 [@ref-bolt-repo-logger-level]。

**缺口**：无法回答"插件版本查询、依赖冲突、加载错误"这一类问题，因为固定来源中没有插件宿主。
如果未来版本引入插件，需要新的固定来源（插件清单格式与加载代码）才能采写本主题。
