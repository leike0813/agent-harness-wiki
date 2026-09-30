---
schema_version: 3
record_kind: production
edition_id: lingma-jetbrains-native_plugins-v1
harness_id: lingma
topic: native_plugins
title: "Lingma（Qoder CN）JetBrains 插件的原生插件：包格式、安装与扩展点"
sections:
  - section_id: plugins-scope
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-product-rename, ref-lingma-plugins-components, ref-lingma-changelog-plugins]
  - section_id: plugins-package
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-plugins-manifest, ref-lingma-plugins-layout, ref-lingma-plugins-packaging]
  - section_id: plugins-install-discovery
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-plugins-manifest, ref-lingma-plugins-layout, ref-lingma-plugins-packaging, ref-lingma-changelog-plugins]
  - section_id: plugins-api-lifecycle
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-plugins-components, ref-lingma-plugins-hooks, ref-lingma-plugins-mcp, ref-lingma-plugins-skill, ref-lingma-install-jetbrains, ref-lingma-changelog-plugins]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [jetbrains]
        section_id: plugins-scope
        status: partial
        source_refs: [ref-lingma-plugins-components]
  - question_id: plugins.package
    answers:
      - surface_ids: [jetbrains]
        section_id: plugins-package
        status: answered
        source_refs: [ref-lingma-plugins-manifest, ref-lingma-plugins-layout, ref-lingma-plugins-packaging]
  - question_id: plugins.install
    answers:
      - surface_ids: [jetbrains]
        section_id: plugins-install-discovery
        status: partial
        source_refs: [ref-lingma-changelog-plugins]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [jetbrains]
        section_id: plugins-install-discovery
        status: partial
        source_refs: [ref-lingma-plugins-manifest, ref-lingma-plugins-layout, ref-lingma-plugins-packaging]
  - question_id: plugins.api
    answers:
      - surface_ids: [jetbrains]
        section_id: plugins-api-lifecycle
        status: answered
        source_refs: [ref-lingma-plugins-components, ref-lingma-plugins-hooks, ref-lingma-plugins-mcp]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [jetbrains]
        section_id: plugins-api-lifecycle
        status: partial
        source_refs: [ref-lingma-changelog-plugins, ref-lingma-install-jetbrains]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [jetbrains]
        section_id: plugins-api-lifecycle
        status: unknown
        source_refs: []
---

## 固定来源与界面 {#plugins-scope}

本章依据官方文档站点 docs.qoder.cn：插件格式说明页（`qoder-plugins.md`）与 Qoder CN 用户指南，界面口径为 catalog 唯一登记的 `jetbrains`（JetBrains IDE 插件，kind `ide`）。产品自 2026-05-20 起由通义灵码更名为 Qoder CN 系列，相关进程与目录仍为 `.lingma` / `Lingma.exe`。[@ref-lingma-product-rename]

**什么算原生插件**：插件（Plugins）把规则、技能、Agents、命令、MCP 服务器和钩子打包成可分发的捆绑包，用于扩展 Qoder CN 的能力——从代码审查、自动部署到连接企业内部系统 [@ref-lingma-plugins-components]。因此插件是比单一 Skill / MCP server / Hook 更上层的分发单位：Skill 是“具体怎么做一件事”的原子执行单元，MCP server 是外部工具连接，Hook 是事件脚本，三者都可作为插件组件被打包 [@ref-lingma-plugins-components]。

JetBrains 插件的原生插件支持由更新日志给出：2026-09-03 版“个人设置新增插件管理，支持自定义插件” [@ref-lingma-changelog-plugins]。缺口：本节所用格式说明页在“客户端行为”说明中以 QoderWork 举例，未逐条声明 JetBrains 插件的完整兼容范围；把该格式套用到 JetBrains 插件属于源级知识，尚无针对该界面的专门安装/加载文档。

## 插件包格式与清单 {#plugins-package}

**目录结构** [@ref-lingma-plugins-layout]：

```plaintext
my-plugin/
├── .qoder-plugin/
│   └── plugin.json         # 插件清单（必需）
├── skills/                 # 技能
│   ├── skill-a/
│   │   └── SKILL.md
│   └── skill-b/
│       └── SKILL.md
├── rules/                  # 规则（.md 文件）
├── agents/                 # 子代理（.md 文件）
├── commands/               # 斜杠命令（.md 文件）
├── hooks/
│   └── hooks.json          # 钩子配置
├── mcp.json                # MCP 服务器配置
├── qoder.md                # 项目指令文件（可选）
├── CONNECTORS.md           # Connector 依赖说明（可选）
└── README.md               # 插件说明文档（可选）
```

除 `.qoder-plugin/` 以外，所有目录均为可选；`plugin.json` 可显式声明路径覆盖默认约定 [@ref-lingma-plugins-layout]。

**清单字段**（`plugin.json` 位于 `.qoder-plugin/` 下，是唯一必需文件）[@ref-lingma-plugins-manifest]：

| 字段 | 类型 | 必填 | 说明 |
| :-- | :-- | :-- | :-- |
| `name` | string | 是 | 插件标识符，必须 kebab-case |
| `version` | string | 是 | 语义化版本号，如 `1.0.0` |
| `description` | string | 否 | 插件简介 |
| `displayName` | string | 否 | 展示名称（支持中文），用于客户端 UI 和市场展示 |
| `author` | object | 否 | 作者信息 |
| `keywords` | string 数组 | 否 | 搜索关键词 |
| `homepage` | string | 否 | 主页或文档 URL |
| `repository` | string | 否 | 源码仓库 URL |
| `license` | string | 否 | SPDX 许可证标识 |

**组件路径声明** [@ref-lingma-plugins-manifest]：`skills`、`rules`、`agents`、`commands`、`hooks`、`mcpServers` 字段可指向对应目录或文件；`skills` 支持精确声明加载哪些技能路径，指向目录时加载该目录下所有含 `SKILL.md` 的子目录。最小配置与完整示例 [@ref-lingma-plugins-manifest]：

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A simple Qoder CN plugin"
}
```

```json
{
  "name": "requirement-pool",
  "version": "2.3.0",
  "description": "需求池管理工具集",
  "displayName": "需求池管理",
  "author": { "name": "Product Team" },
  "keywords": ["requirement", "backlog"],
  "skills": ["skills/提交需求", "skills/评估Backlog"],
  "rules": "./rules",
  "agents": ["./agents/requirement-reviewer.md"],
  "commands": {
    "submit-req": {
      "source": "./commands/submit.md",
      "description": "提交新需求到需求池",
      "argumentHint": "[title]"
    }
  },
  "hooks": "./hooks/hooks.json",
  "mcpServers": "./mcp.json"
}
```

**打包与分发**：插件以 `.zip` 格式分发，zip 根目录即插件根目录（不额外嵌套一层），必须包含 `.qoder-plugin/plugin.json`，建议文件名 `{name}-{version}.zip`。路径规则：所有相对路径必须以 `./` 开头；不允许包含 `..`（禁止路径穿越）；JSON 路径必须以 `.json` 结尾；Markdown 路径必须以 `.md` 结尾。[@ref-lingma-plugins-packaging]

缺口：清单没有 `engines`/兼容版本字段，也没有依赖声明（`CONNECTORS.md` 只是面向使用者的说明文档，不是机器可解析的依赖清单）。

## 安装与发现 {#plugins-install-discovery}

**安装入口**：JetBrains 插件在**个人设置**中提供“插件管理”，支持自定义插件 [@ref-lingma-changelog-plugins]。插件清单中的 `displayName` 用于客户端 UI 和市场展示，说明存在插件市场 [@ref-lingma-plugins-manifest]。

**发现与加载**：客户端依据清单字段加载对应组件——`skills` 指向目录时加载该目录下所有含 `SKILL.md` 的子目录，指向路径列表时只加载声明的技能；`rules`、`agents`、`commands`、`hooks`、`mcpServers` 分别从声明的路径读取 [@ref-lingma-plugins-manifest][@ref-lingma-plugins-layout]。路径校验在打包/分发时约束（`./` 前缀、禁止 `..`、扩展名匹配）[@ref-lingma-plugins-packaging]。

缺口：文档没有说明 JetBrains 插件从何处安装（本地 zip？市场？）、如何固定版本、更新或卸载、用户级与项目级安装的区别，也没有给出加载顺序、命名冲突处理与依赖解析规则；这些只存在于“个人设置 - 插件管理”的入口描述中，属源级知识。

## 扩展点、装载与诊断 {#plugins-api-lifecycle}

**扩展点（`plugins.api`）** [@ref-lingma-plugins-components]：插件可注册六类组件——Skills、Rules、Agents、Commands、MCP Servers、Hooks。各自的文件约定与宿主边界：

- 技能：每个技能是含 `SKILL.md` 的独立目录，`description` 决定何时自动调用 [@ref-lingma-plugins-skill]。
- 钩子：`hooks/hooks.json` 在事件发生时执行命令，`matcher` 过滤触发的工具名，`${QODER_PLUGIN_ROOT}` 解析为当前插件安装目录的绝对路径，用于引用插件内部脚本与资源 [@ref-lingma-plugins-hooks]。
- MCP 服务器：`mcp.json`（或 `.mcp.json`）顶层 `mcpServers`；需要在安装时由用户填凭证的服务可用 `{{USER_CONFIG}}` 占位符与 `_setup`（`configUrl`、`guide`、`required`）引导配置 [@ref-lingma-plugins-mcp]。

**状态区分（`plugins.lifecycle`，partial）**：JetBrains 插件于 2026-09-03 起提供插件管理入口 [@ref-lingma-changelog-plugins]；插件本身通过 JetBrains 插件市场或 zip 安装包安装并需重启 IDE 生效 [@ref-lingma-install-jetbrains]。但“已安装 / 已启用 / 已发现 / 已加载 / 已激活 / 健康”这些状态的区分与对应的可观察入口，文档均未描述，故记为部分。

**诊断（`plugins.diagnostics`，unknown）**：官方文档没有提供查询插件版本与运行状态、或定位兼容/依赖/加载错误的入口。已检查 `qoder-plugins.md` 的“常见问题”小节、JetBrains 插件的更新日志与安装指南；缺失的证明是一个描述插件加载错误、版本不匹配或依赖缺失排查的官方页面。JetBrains 侧的通用排查（诊断脚本、`.lingma` 目录、`lingma.log`）针对插件进程整体，而非单个 Qoder 插件包。
