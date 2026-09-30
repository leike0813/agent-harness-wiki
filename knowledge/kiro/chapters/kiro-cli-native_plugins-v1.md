---
schema_version: 3
record_kind: production
edition_id: kiro-cli-native_plugins-v1
harness_id: kiro
topic: native_plugins
title: "Kiro CLI 的原生插件 Powers"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-kiro-powers-intro, ref-kiro-powers-concept, ref-kiro-powers-diff, ref-kiro-v3-powers]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-kiro-powers-manifest, ref-kiro-powers-structure, ref-kiro-powers-custom]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-kiro-powers-custom, ref-kiro-powers-cli, ref-kiro-powers-update, ref-kiro-config-paths]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-kiro-powers-how, ref-kiro-powers-mcp, ref-kiro-slash-powers]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-kiro-powers-concept, ref-kiro-v3agent-fields, ref-kiro-permissions-capabilities, ref-kiro-powers-intro, ref-kiro-agentref-security]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kiro-powers-cli, ref-kiro-slash-powers, ref-kiro-config-inspect, ref-kiro-powers-update, ref-kiro-powers-test, ref-kiro-clicmd-global]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-kiro-powers-intro, ref-kiro-powers-concept, ref-kiro-powers-diff]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-kiro-powers-manifest, ref-kiro-powers-structure]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-kiro-powers-cli, ref-kiro-powers-custom, ref-kiro-powers-update]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: partial
        source_refs: [ref-kiro-powers-how, ref-kiro-powers-mcp]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-kiro-powers-concept, ref-kiro-v3agent-fields, ref-kiro-permissions-capabilities]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-kiro-powers-cli, ref-kiro-powers-update]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-kiro-slash-powers, ref-kiro-powers-test, ref-kiro-clicmd-global]
---

## Powers 作为 Kiro 的原生插件 {#plugins-model}

官方把 Powers 描述为"把工具、工作流与最佳实践打包成 Kiro 可按需激活的格式"，并明确它们遵循 **[Agent Plugins](https://agent-plugins.org/) 规范**——一个由 Amazon、Cursor、Microsoft、OpenAI、Vercel 等共同维护的开放、厂商中立的打包格式。可用性表（CLI 列）：安装与使用 Powers 在 CLI 标为 `v3`，创建 Powers 也标为 `v3`。[@ref-kiro-powers-intro]

一个 power 是含必需清单与可选组件的目录：`plugin.json`（标识 power 并声明激活关键词）、`skills/`（Agent Skills）、`mcp.json`（MCP server 配置，可选）、`dev.kiro/`（Kiro 专有扩展，如 steering 文件，可选）。[@ref-kiro-powers-concept]

与 Skill、Steering 的分工（官方对照）：Powers 是打包 MCP 工具、Skills 与知识的插件，按上下文动态激活，适合"既要工具又要指导"的集成；Skills 是独立的可移植指令包，可独立存在也可被 power 内含；Steering 是 Kiro 专有上下文。文档还建议：MCP 集成通常优先用 power，因为它把工具与内置指导一起打包并自动激活。[@ref-kiro-powers-diff]

CLI 3.0 的说明是 **"Powers auto-pickup"**：在 IDE 安装的 power 会被 CLI 会话自动检测到，装一次即可在各处使用。[@ref-kiro-v3-powers]

## 插件包格式 {#plugins-package}

`plugin.json` 的必需字段（官方 "Creating plugin.json"）：[@ref-kiro-powers-manifest]

| 字段 | 说明 |
| :-- | :-- |
| `$schema` | `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` |
| `name` | 插件标识（kebab-case，无空格），Kiro 内部用它识别 power；安装后改名可能需要卸载重装 |
| `version` | 语义化版本（如 `1.0.0`） |
| `description` | 简短描述 |
| `author` | 至少含 `name` 的对象，可含 `email`、`url` |
| `keywords` | 触发激活的字符串数组 |

可选字段：`homepage`、`repository`、`license`。[@ref-kiro-powers-manifest]

一个完整 power 的目录结构（官方给的原型）：[@ref-kiro-powers-structure]

```text
power-supabase/
├── plugin.json                           # Required manifest
├── mcp.json                              # MCP server configuration
└── skills/                               # Agent Skills
    ├── setup/
    │   ├── SKILL.md
    │   └── scripts/
    │       └── validate-deps.sh
    └── migrations/
        ├── SKILL.md
        └── references/
            └── migration-patterns.md
```

可选字段的官方示例（原样抄录）：[@ref-kiro-powers-manifest]

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "supabase",
  "version": "1.0.0",
  "description": "Build fullstack applications with Supabase",
  "author": {
    "name": "Supabase",
    "url": "https://supabase.com"
  },
  "keywords": ["database", "postgres", "supabase"],
  "homepage": "https://supabase.com/docs",
  "repository": "https://github.com/supabase/kiro-power",
  "license": "Apache-2.0"
}
```

`mcp.json` 用与 Skills 相同的 Agent Plugins schema 声明 MCP server，支持 `type: "stdio"`、`command`、`args`、`env`（含 `${...}` 展开）；官方给出的形态（凭据为环境变量占位）：[@ref-kiro-powers-manifest]

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "supabase-local": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_ANON_KEY": "${SUPABASE_ANON_KEY}"
      }
    }
  }
}
```

`skills/` 下的每个子目录需要 `SKILL.md`，可带 `scripts/` 与 `references/`。[@ref-kiro-powers-structure]

**旧格式仍受支持**：用旧的 `POWER.md` 格式构建的 power 继续可用，Kiro 对新旧格式的安装体验一致；官方推荐新 power 用 Agent Plugins 格式。[@ref-kiro-powers-manifest][@ref-kiro-powers-custom]

## 安装、更新与卸载 {#plugins-install}

- **官方目录**：浏览 `https://kiro.dev/powers` 的精选 power（Datadog、Dynatrace、Figma、Neon、Netlify、Postman、Supabase、Stripe、Strands SDK、AWS Aurora 等），点击安装即可。[@ref-kiro-powers-custom]
- **从 GitHub 或本地目录**：每个 power 必须在其包根有合法的 `plugin.json` 或 `POWER.md`；一个仓库可含多个 power，各自在独立目录中。文档给出的 CLI 侧管理指令是 `kiro-cli powers install NAME|PATH` 与 `kiro-cli powers uninstall NAME`，在会话内则是 `/powers install`、`/powers uninstall`。[@ref-kiro-powers-custom][@ref-kiro-powers-cli]
- **交互与无会话两条路径**的差别：交互式 `/powers` 命令成功后 Kiro **立即刷新当前会话**；不带会话的 `kiro-cli powers` 命令只更新本地注册表然后退出，**下一次会话**才加载更新后的 powers。[@ref-kiro-powers-cli]
- **更新与卸载**：面板里对某个 power 选 **Check for updates**，有更新则 **Install updates**，power 会从远端仓库刷新到最新版本。[@ref-kiro-powers-update] 卸载用 `/powers uninstall NAME` 或 `kiro-cli powers uninstall NAME`。[@ref-kiro-powers-cli]
- **作用域**：配置作用域参考页的 "File paths" 表只给出 Powers 的**全局**位置 `~/.kiro/powers/`（项目列标为 `—`），即 Powers 是用户级（外加 IDE/云同步来源），没有项目级目录。[@ref-kiro-config-paths]
- **云会话限制**：安装/卸载 power 会改动本机，文档明确 **cloud session 不支持** 这两个命令。Web 侧改用 **Settings > Powers** 管理，启用的 power 在沙箱启动时加载。[@ref-kiro-powers-cli]

## 发现与激活 {#plugins-discovery}

激活由**关键词**驱动：Kiro 读取任务描述，评估已安装的 powers，只把相关的 power 载入上下文。文档的例子是——任务提到 "payment"/"checkout" 时 Stripe power 激活，切到数据库任务时 Supabase power 激活而 Stripe 卸载。这套机制的目的是避免"连五个 MCP server 就在写第一行代码前耗尽 40% 上下文"。[@ref-kiro-powers-how]

**MCP server 的命名空间与归属**：[@ref-kiro-powers-mcp]

- **Agent Plugins 格式（`plugin.json`）**：power 内的 MCP server 由 Kiro 内部管理，**不**写入用户级 `~/.kiro/settings/mcp.json`；它们随 power 激活/停用。安装时 Kiro 会自动给 server 名加命名空间（如 `supabase-local` 变为 `power-supabase-supabase-local`）以避免冲突。
- **旧格式（`POWER.md`）**：MCP server 会注册到 `~/.kiro/settings/mcp.json` 的 Powers 区段。

激活后的 power 提供其 `skills/` 与 `mcp.json` 声明的能力；CLI V3 中已安装的 power 也会出现在输入 `/` 时的命令列表中。[@ref-kiro-slash-powers]

## 可注册的能力与宿主边界 {#plugins-api}

一个 power 能带来的扩展点是：**Agent Skills**（`skills/NAME/SKILL.md`，可含 `scripts/`、`references/`）、**MCP server**（`mcp.json`，stdio 等类型）、以及 **Kiro 专有的 `dev.kiro/` 扩展**（文档举例为 steering 文件）。[@ref-kiro-powers-concept]

宿主侧的接入点集中在 agent 配置的 `includePowers` 字段（是否自动纳入 IDE 安装的 powers）与 `resources` 的 `skill://`；V3 的新字段表把 `includePowers` 列为 agent 配置项。[@ref-kiro-v3agent-fields]

权限侧用独立的 `power` capability 控制，与 `mcp`、`skill`、`subagent` 等并列，遵循 deny-overrides。[@ref-kiro-permissions-capabilities]

**边界**：power 是第三方工具，官方警告其可能受单独条款约束，只应从可信来源安装并审查文档与许可，Kiro 不对第三方 power 负责。power 内含的 skill 仍是文本指令，不会自行执行代码。[@ref-kiro-powers-intro][@ref-kiro-agentref-security]

## 生命周期与诊断 {#plugins-diagnostics}

- **状态区分**：安装来自 `kiro-cli powers install` / `/powers install` / 面板 / 云设置；激活由关键词在会话中触发；会话内安装立即刷新当前会话，无会话安装则下次会话加载；Web 的 power 在沙箱启动时加载并持续到任务结束。[@ref-kiro-powers-cli]
- **列举与查询**：会话内 `/powers` 列出已安装 Powers；`/config` 的配置总览含 Powers 分类（只读列表）。[@ref-kiro-slash-powers][@ref-kiro-config-inspect]
- **更新检查**：面板的 Check for updates / Install updates 是文档给出的版本刷新入口。[@ref-kiro-powers-update]
- **自建 power 的验证**：官方给出的本地流程是——建好目录与文件 → 打开 Kiro → Powers 面板 → **Add Custom Power** → **Import power from a folder** → 选择 power 目录 → 用 power 的 keywords 在对话中测试激活。[@ref-kiro-powers-test]
- **分享**：把 power 推到**公开** GitHub 仓库（`git init` / `git add plugin.json mcp.json skills/ dev.kiro/` / 提交 / 推送），他人即可用 **Add Custom Power** → **Import power from GitHub** 输入仓库 URL 安装；私有仓库要求对方有访问权限。[@ref-kiro-powers-test]

**缺口与文档冲突**：`/docs/powers/installation.md` 给出 `kiro-cli powers install|uninstall` 命令，但 `reference/cli-commands.md` 的 "Commands" 章节**没有**列出 `kiro-cli powers` 子命令，两处文档不一致，实际可用性未在本轮固定来源中确证；此外固定来源没有提供 power 的版本查询命令、健康检查入口或加载失败的错误诊断路径（`/powers` 只说列出已安装项）。这些点保持未验证。[@ref-kiro-powers-cli][@ref-kiro-clicmd-global]
