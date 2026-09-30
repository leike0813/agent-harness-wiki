---
schema_version: 3
record_kind: production
edition_id: bolt-web-configuration-v1
harness_id: bolt
topic: configuration
title: "Bolt 的配置机制：账户/工作区/项目/团队四个设置面、环境变量、默认值与信任边界"
sections:
  - section_id: config-scope
    surface_ids: [web]
    source_refs: [ref-bolt-repo-package-json, ref-bolt-docs-index-listing]
  - section_id: config-sources-overrides
    surface_ids: [web]
    source_refs: [ref-bolt-docs-account-open, ref-bolt-docs-workspace-open, ref-bolt-docs-project-open, ref-bolt-docs-team-general, ref-bolt-docs-account-knowledge, ref-bolt-docs-workspace-knowledge, ref-bolt-docs-project-knowledge, ref-bolt-docs-skills-scopes, ref-bolt-docs-account-default-agent, ref-bolt-docs-project-agent, ref-bolt-docs-team-publish, ref-bolt-docs-team-visibility, ref-bolt-docs-team-role, ref-bolt-docs-account-applications, ref-bolt-docs-workspace-subscription, ref-bolt-docs-workspace-cloud, ref-bolt-docs-workspace-team, ref-bolt-docs-workspace-packages, ref-bolt-docs-workspace-templates, ref-bolt-docs-workspace-design, ref-bolt-docs-project-domains, ref-bolt-docs-project-analytics, ref-bolt-docs-team-export]
  - section_id: config-runtime-defaults
    surface_ids: [web]
    source_refs: [ref-bolt-repo-api-key, ref-bolt-repo-worker-config, ref-bolt-repo-contributing-setup, ref-bolt-repo-bindings, ref-bolt-repo-vite-config, ref-bolt-repo-logger-level, ref-bolt-repo-chat-history, ref-bolt-repo-wrangler, ref-bolt-repo-package-json, ref-bolt-repo-llm-constants, ref-bolt-repo-workdir, ref-bolt-repo-settings-store, ref-bolt-docs-account-general, ref-bolt-docs-account-addons, ref-bolt-docs-team-role, ref-bolt-docs-team-publish, ref-bolt-docs-team-visibility, ref-bolt-docs-team-personal, ref-bolt-docs-team-external, ref-bolt-docs-team-integrations, ref-bolt-docs-workspace-registries]
  - section_id: config-trust
    surface_ids: [web]
    source_refs: [ref-bolt-docs-account-training, ref-bolt-docs-team-role, ref-bolt-docs-team-personal, ref-bolt-docs-team-external, ref-bolt-docs-team-integrations, ref-bolt-docs-workspace-registries, ref-bolt-docs-skills-safety, ref-bolt-docs-skills-permissions, ref-bolt-docs-forge-privacy, ref-bolt-docs-security-audit]
  - section_id: config-migration-diagnostics
    surface_ids: [web]
    source_refs: [ref-bolt-docs-account-open, ref-bolt-docs-workspace-open, ref-bolt-docs-project-open, ref-bolt-docs-project-context, ref-bolt-docs-project-backups, ref-bolt-docs-chat-queue-pause, ref-bolt-docs-security-audit, ref-bolt-repo-logger-level, ref-bolt-repo-db, ref-bolt-repo-chat-history]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [web]
        section_id: config-sources-overrides
        status: partial
        source_refs: [ref-bolt-docs-account-open, ref-bolt-docs-workspace-open, ref-bolt-docs-project-open, ref-bolt-docs-team-general, ref-bolt-docs-account-knowledge, ref-bolt-docs-workspace-knowledge, ref-bolt-docs-project-knowledge, ref-bolt-docs-skills-scopes]
  - question_id: config.overrides
    answers:
      - surface_ids: [web]
        section_id: config-sources-overrides
        status: partial
        source_refs: [ref-bolt-docs-account-default-agent, ref-bolt-docs-project-agent, ref-bolt-docs-account-knowledge, ref-bolt-docs-project-knowledge, ref-bolt-docs-workspace-knowledge, ref-bolt-docs-team-role, ref-bolt-docs-team-publish, ref-bolt-docs-team-visibility]
  - question_id: config.runtime
    answers:
      - surface_ids: [web]
        section_id: config-runtime-defaults
        status: answered
        source_refs: [ref-bolt-repo-api-key, ref-bolt-repo-worker-config, ref-bolt-repo-contributing-setup, ref-bolt-repo-bindings, ref-bolt-repo-vite-config, ref-bolt-repo-logger-level, ref-bolt-repo-chat-history, ref-bolt-repo-wrangler]
  - question_id: config.defaults
    answers:
      - surface_ids: [web]
        section_id: config-runtime-defaults
        status: answered
        source_refs: [ref-bolt-docs-account-general, ref-bolt-docs-account-addons, ref-bolt-docs-team-role, ref-bolt-docs-team-publish, ref-bolt-docs-team-visibility, ref-bolt-docs-team-personal, ref-bolt-docs-team-external, ref-bolt-docs-team-integrations, ref-bolt-docs-workspace-registries, ref-bolt-repo-llm-constants, ref-bolt-repo-workdir, ref-bolt-repo-settings-store]
  - question_id: config.trust
    answers:
      - surface_ids: [web]
        section_id: config-trust
        status: partial
        source_refs: [ref-bolt-docs-account-training, ref-bolt-docs-team-role, ref-bolt-docs-team-personal, ref-bolt-docs-team-external, ref-bolt-docs-team-integrations, ref-bolt-docs-workspace-registries, ref-bolt-docs-skills-safety, ref-bolt-docs-skills-permissions, ref-bolt-docs-forge-privacy, ref-bolt-docs-security-audit]
  - question_id: config.migration
    answers:
      - surface_ids: [web]
        section_id: config-migration-diagnostics
        status: unknown
        source_refs: [ref-bolt-docs-account-open, ref-bolt-docs-workspace-open, ref-bolt-docs-project-open]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [web]
        section_id: config-migration-diagnostics
        status: partial
        source_refs: [ref-bolt-docs-project-context, ref-bolt-docs-project-backups, ref-bolt-docs-chat-queue-pause, ref-bolt-docs-security-audit, ref-bolt-repo-logger-level, ref-bolt-repo-db, ref-bolt-repo-chat-history, ref-bolt-docs-account-open, ref-bolt-docs-workspace-open, ref-bolt-docs-project-open]
---

## 固定来源与配置面 {#config-scope}

本章的固定来源是官方开源仓库提交 `eda10b121221b30825a4c16eec5da1fd3eb1eb99`（环境变量、绑定、
构建配置、浏览器内持久化）与官方帮助站的设置类文档（账户 / 工作区 / 项目 / 团队四个设置面）
[@ref-bolt-repo-package-json][@ref-bolt-docs-index-listing]。

Bolt 的"配置"分成两层，本章都要照顾到：

- **托管产品（surface `web`）**：配置几乎全部在网页端设置页里，没有配置文件。四个设置面分别是
  账户、工作区、项目、团队 [@ref-bolt-docs-index-listing]。
- **开源修订**：配置是构建期与部署期的事——环境变量、Cloudflare 绑定与 `wrangler.toml`；
  没有用户级配置文件，也没有 CLI 参数或 profile 机制 [@ref-bolt-repo-package-json]。

文档快照没有标注适用软件版本，本章是来源级知识。

## 配置来源与作用域 {#config-sources-overrides}

**config.sources**：四个设置面的入口与内容 [@ref-bolt-docs-account-open][@ref-bolt-docs-workspace-open][@ref-bolt-docs-project-open][@ref-bolt-docs-team-general]：

| 作用域 | 入口 | 主要内容 |
| :-- | :-- | :-- |
| 账户 | 左侧头像 → Settings（首页或项目内都可）[@ref-bolt-docs-account-open] | General（主题、token 显示、声音、默认 Agent、编辑器换行、设计系统显示、模型训练）、Applications [@ref-bolt-docs-account-applications]、Knowledge、Connectors (MCP)、Add-on features |
| 工作区 | 设置导航里的 `Workspace`（团队账号显示团队名）[@ref-bolt-docs-workspace-open] | Subscription & Tokens [@ref-bolt-docs-workspace-subscription]、Cloud [@ref-bolt-docs-workspace-cloud]，以及团队工作区的 Knowledge、Private registries、Packages knowledge、Team templates、Design systems [@ref-bolt-docs-workspace-team][@ref-bolt-docs-workspace-packages][@ref-bolt-docs-workspace-templates][@ref-bolt-docs-workspace-design] |
| 项目 | 项目内齿轮图标 → All project settings [@ref-bolt-docs-project-open] | General、Domains & Hosting [@ref-bolt-docs-project-domains]、Analytics [@ref-bolt-docs-project-analytics]、Knowledge、Backups |
| 团队 | 团队页 → 齿轮图标（仅管理员）[@ref-bolt-docs-team-general] | General、Integration controls、Data export [@ref-bolt-docs-team-export] |

知识（knowledge）是唯一同时存在于账户、工作区、项目三个作用域的配置项：账户级"对所有项目生效"，
工作区/团队级"对团队内所有项目生效"，项目级"只对该项目生效"
[@ref-bolt-docs-account-knowledge][@ref-bolt-docs-workspace-knowledge][@ref-bolt-docs-project-knowledge]。
技能也有工作区与项目两个作用域 [@ref-bolt-docs-skills-scopes]。

路径随 home / 当前目录 / 仓库根变化的问题在本产品里没有对象：设置不落盘为文件。

**config.overrides**：固定来源只给出零散、局部的作用域规则，没有通用的合并顺序文档：

- **Default agent** 只影响新项目；已有项目沿用上次选中的 Agent
  [@ref-bolt-docs-account-default-agent]；项目内可覆盖，且"所有项目都使用 Bolt Agent，可在聊天框
  切换 Standard 与 Max" [@ref-bolt-docs-project-agent]。
- **Knowledge** 按作用域拆分：账户级面向个人所有项目，项目级面向单个项目，两者可以同时存在
  [@ref-bolt-docs-account-knowledge][@ref-bolt-docs-project-knowledge]；团队工作区另有团队级
  knowledge [@ref-bolt-docs-workspace-knowledge]。
- 技能同名时项目技能优先于工作区技能 [@ref-bolt-docs-skills-scopes]。
- 团队级约束会压过成员选择：设置了默认发布提供方或站点可见性后，成员在项目里看不到选择项
  [@ref-bolt-docs-team-publish][@ref-bolt-docs-team-visibility]；默认成员角色决定成员对团队项目
  的默认权限 [@ref-bolt-docs-team-role]。

**缺口**：账户 knowledge、工作区 knowledge 与项目 knowledge 同时存在时的合并/覆盖顺序没有
文档依据；"对象、数组、空值、删除标记如何合并"在本产品里没有对应概念（没有配置文件），也
无法从设置页描述推断。partial。

## 运行时介入、环境变量与默认值 {#config-runtime-defaults}

**config.runtime**：托管产品没有环境变量或命令行参数入口。开源修订运行时介入的手段如下
[@ref-bolt-repo-api-key][@ref-bolt-repo-contributing-setup][@ref-bolt-repo-bindings]：

| 变量/参数 | 何时用 | 作用 |
| :-- | :-- | :-- |
| `ANTHROPIC_API_KEY` | 服务端取 key 时 | 开发环境读 `process.env`，部署/本地预览读 Cloudflare 绑定 [@ref-bolt-repo-api-key][@ref-bolt-repo-worker-config] |
| `.env.local` | 本地开发/预览 | `CONTRIBUTING.md` 规定把它写成键值行，并注明不要提交 [@ref-bolt-repo-contributing-setup] |
| `./bindings.sh` | `pnpm run start` | 逐行把 `.env.local` 转成 `--binding NAME=VALUE` 交给 `wrangler pages dev` [@ref-bolt-repo-bindings] |
| `VITE_LOG_LEVEL` | 构建/运行 | 初始日志级别；生产环境不允许调到 trace/debug [@ref-bolt-repo-logger-level] |
| `VITE_DISABLE_PERSISTENCE` | 构建/运行 | 置位后禁用浏览器内的聊天历史持久化 [@ref-bolt-repo-chat-history] |
| `wrangler.toml` | 部署 | `compatibility_flags = ["nodejs_compat"]`、`compatibility_date = "2024-07-01"`、`pages_build_output_dir = "./build/client"` [@ref-bolt-repo-wrangler] |
| `vite.config.ts` | 构建 | 构建目标 `esnext`，Node polyfill 只注入 `path` 与 `buffer` [@ref-bolt-repo-vite-config] |

没有 profile 概念，也没有可切换的命名配置集 [@ref-bolt-repo-package-json]。

**config.defaults**：设置页把默认值直接写在文档里，仓库侧默认值是常量
[@ref-bolt-docs-account-general][@ref-bolt-docs-account-addons][@ref-bolt-repo-llm-constants][@ref-bolt-repo-workdir]：

| 键 | 默认值 | 来源 |
| :-- | :-- | :-- |
| Theme | `Dark`（可选 Light / Dark / System） | [@ref-bolt-docs-account-general] |
| Display token usage in chat | 关 | [@ref-bolt-docs-account-general] |
| Sound notification | 开 | [@ref-bolt-docs-account-general] |
| Default agent | `Standard` | [@ref-bolt-docs-account-general] |
| Editor line wrapping | 开 | [@ref-bolt-docs-account-general] |
| Show open-source design systems after creating your own | 开 | [@ref-bolt-docs-account-general] |
| Model training | 开（EU / UK / 瑞士默认关） | [@ref-bolt-docs-account-general] |
| Dynamic reasoning | 关 | [@ref-bolt-docs-account-addons] |
| Image generation | 关 | [@ref-bolt-docs-account-addons] |
| 默认成员角色 | `Viewer` | [@ref-bolt-docs-team-role] |
| Team-wide deploy provider | `User-specified` | [@ref-bolt-docs-team-publish] |
| Published site visibility | `User-specified` | [@ref-bolt-docs-team-visibility] |
| Personal account restriction | 关 | [@ref-bolt-docs-team-personal] |
| External collaboration in team projects | 关 | [@ref-bolt-docs-team-external] |
| Integration controls | 全部开启 | [@ref-bolt-docs-team-integrations] |
| 私有 registry 的 scope 字段 | 留空即全部安装走私有 registry | [@ref-bolt-docs-workspace-registries] |
| 工作目录常量 | `/home/project` | [@ref-bolt-repo-workdir] |
| 单轮输出上限 | `MAX_TOKENS = 8192`，最多续写 `MAX_RESPONSE_SEGMENTS = 2` 段 | [@ref-bolt-repo-llm-constants] |
| 前端快捷键 | `toggleTerminal` = `Ctrl/Cmd+J` | [@ref-bolt-repo-settings-store] |

改变默认值的方式就是改对应的设置项或常量；设置页里没有"平台差异"项，平台差异只体现在系统
主题 `System` 选项 [@ref-bolt-docs-account-general]。

## 信任与权限 {#config-trust}

**config.trust**：本产品没有"信任项目/信任文件夹"这类开关，能限制配置生效的是账号与团队权限
以及数据使用条款 [@ref-bolt-docs-account-training][@ref-bolt-docs-team-role]：

- **数据使用**：**Model training** 控制 Bolt 能否用你的项目与对话训练模型，默认开（EU / UK /
  瑞士默认关），关闭不影响计划 [@ref-bolt-docs-account-training]。Forge 的数据共享条款独立于该
  开关，使用 Forge 会把提示、代码、项目文件等去标识化后交给合作方训练 [@ref-bolt-docs-forge-privacy]。
- **团队策略**：管理员可设默认成员角色 [@ref-bolt-docs-team-role]、禁止成员使用个人工作区或另建
  团队（Personal account restriction）[@ref-bolt-docs-team-personal]、允许或禁止邀请团队外
  协作者 [@ref-bolt-docs-team-external]、按应用关闭 GitHub / Stripe / Supabase 集成
  [@ref-bolt-docs-team-integrations]；Private registries 与 Packages knowledge 页面只有管理员可见
  [@ref-bolt-docs-workspace-registries]。
- **技能与凭据**：技能没有签名或策略校验，把关靠导入前的人工审阅（文档要求完整阅读 `SKILL.md`，
  不信任索要凭据或含未知 URL 的技能）[@ref-bolt-docs-skills-safety]；团队管理员删除技能会对所有
  成员生效 [@ref-bolt-docs-skills-permissions]。
- **安全扫描**：Pro 及以上才有项目安全审计，用于发现并修复项目里的安全问题
  [@ref-bolt-docs-security-audit]。

**缺口**：没有"工作区/项目可信度"这一层条件，因此"项目信任怎样限制配置读取或生效"在本产品中
没有对象；能回答的是上面的账号、团队与数据使用限制。partial。

## 迁移与诊断 {#config-migration-diagnostics}

**config.migration**：固定来源中没有配置键迁移、弃用或旧格式导入的任何描述。检查过的入口是
三个设置面（账户、工作区、项目、团队）与仓库的 `wrangler.toml`/`vite.config.ts`：设置页是
"就地生效"的托管配置，仓库侧只有构建期常量，没有版本化配置格式可迁移
[@ref-bolt-docs-account-open][@ref-bolt-docs-workspace-open][@ref-bolt-docs-project-open]。
因此本项记为 unknown——**缺失的证据**是"存在旧配置格式或迁移代码"这一事实本身，固定来源中
没有任何此类记录。

**config.diagnostics**：可观察入口分三类 [@ref-bolt-repo-logger-level][@ref-bolt-repo-db][@ref-bolt-docs-project-context]：

| 目的 | 入口 |
| :-- | :-- |
| 查看/修改实际生效的设置 | 账户设置、工作区设置、项目设置各自的页面就是事实来源；改完即在界面生效 [@ref-bolt-docs-account-open][@ref-bolt-docs-workspace-open][@ref-bolt-docs-project-open] |
| 排查"以为改了却没生效" | 项目设置的 **Context → Clear context** 清掉短期记忆 [@ref-bolt-docs-project-context]；**Backups** 与 Version History 可回到自动保存的版本 [@ref-bolt-docs-project-backups] |
| 开源修订的运行期诊断 | `VITE_LOG_LEVEL` 调日志级别（生产环境不允许 trace/debug）[@ref-bolt-repo-logger-level]；聊天历史默认存在浏览器 IndexedDB（库名 `boltHistory`），可用 `VITE_DISABLE_PERSISTENCE` 关闭以复现"无历史"状态 [@ref-bolt-repo-db][@ref-bolt-repo-chat-history] |
| 队列与版本恢复互相影响 | 处理中的提示会挡住版本恢复；队列可暂停后再恢复版本，然后续跑 [@ref-bolt-docs-chat-queue-pause] |
| 项目安全问题 | Pro 计划可运行安全扫描并查看检查项 [@ref-bolt-docs-security-audit] |

**缺口**：托管产品没有"打印当前生效配置及其来源链"的命令或页面，四项设置只能逐页人工对照；
"文件已写但没有生效"这类问题只存在于开源修订侧（环境变量与绑定），表现为请求失败，需要看
服务端日志与客户端 toast。partial。
