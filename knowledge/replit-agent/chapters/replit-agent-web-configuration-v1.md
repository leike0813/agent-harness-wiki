---
schema_version: 3
record_kind: production
edition_id: replit-agent-web-configuration-v1
harness_id: replit-agent
topic: configuration
title: "Replit Agent 的配置机制：来源、覆盖、运行期、权限与诊断"
sections:
  - section_id: config-scope
    surface_ids: [web]
    source_refs: [ref-replit-config-ws-settings, ref-replit-config-replitmd-how, ref-replit-config-replitfile, ref-replit-config-secrets-vs, ref-replit-config-ci-setup, ref-replit-config-mem-manage, ref-replit-config-user-settings, ref-replit-collab-workspaces, ref-replit-config-cp-what, ref-replit-config-git-pane, ref-replit-index-enterprise]
  - section_id: config-sources
    surface_ids: [web]
    source_refs: [ref-replit-config-ws-settings, ref-replit-config-ws-account, ref-replit-config-ws-user, ref-replit-config-user-settings, ref-replit-config-replitmd-how, ref-replit-config-replitmd-setup, ref-replit-config-replitmd-manual, ref-replit-config-replitfile, ref-replit-config-replitnix, ref-replit-config-secrets-usage, ref-replit-config-ci-setup, ref-replit-config-mem-manage]
  - section_id: config-overrides
    surface_ids: [web]
    source_refs: [ref-replit-agent-cust-vs, ref-replit-agent-cust-instructions, ref-replit-config-replitmd-limits, ref-replit-agent-cust-manage, ref-replit-config-secrets-vs, ref-replit-config-secrets-visibility, ref-replit-config-mem-manage, ref-replit-modes-choices, ref-replit-config-ws-settings]
  - section_id: config-runtime
    surface_ids: [web]
    source_refs: [ref-replit-config-secrets-features, ref-replit-config-secrets-usage, ref-replit-config-secrets-account, ref-replit-config-secrets-prod, ref-replit-config-secrets-db, ref-replit-config-secrets-predefined, ref-replit-config-envtable, ref-replit-config-runenv, ref-replit-config-basic]
  - section_id: config-trust
    surface_ids: [web]
    source_refs: [ref-replit-collab-invite, ref-replit-collab-workspaces, ref-replit-collab-groups, ref-replit-collab-groups-apps, ref-replit-agent-cust-availability, ref-replit-config-ws-account, ref-replit-config-secrets-visibility]
  - section_id: config-diagnostics
    surface_ids: [web]
    source_refs: [ref-replit-agent-cust-create-inst, ref-replit-agent-cust-manage, ref-replit-config-mem-manage, ref-replit-config-secrets-usage, ref-replit-config-basic, ref-replit-config-replitmd-limits, ref-replit-config-cp-what, ref-replit-config-cp-rollback, ref-replit-config-cp-finding, ref-replit-config-cp-git, ref-replit-config-git-pane, ref-replit-config-git-shell, ref-replit-config-user-notifications]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [web]
        section_id: config-sources
        status: partial
        source_refs: [ref-replit-config-ws-settings, ref-replit-config-ws-account, ref-replit-config-ws-user, ref-replit-config-user-settings, ref-replit-config-replitmd-how, ref-replit-config-replitmd-setup, ref-replit-config-replitmd-manual, ref-replit-config-replitfile, ref-replit-config-replitnix, ref-replit-config-secrets-usage, ref-replit-config-ci-setup, ref-replit-config-mem-manage]
  - question_id: config.overrides
    answers:
      - surface_ids: [web]
        section_id: config-overrides
        status: partial
        source_refs: [ref-replit-agent-cust-vs, ref-replit-agent-cust-instructions, ref-replit-config-replitmd-limits, ref-replit-agent-cust-manage, ref-replit-config-secrets-vs, ref-replit-config-secrets-visibility, ref-replit-config-mem-manage, ref-replit-modes-choices, ref-replit-config-ws-settings]
  - question_id: config.runtime
    answers:
      - surface_ids: [web]
        section_id: config-runtime
        status: partial
        source_refs: [ref-replit-config-secrets-features, ref-replit-config-secrets-usage, ref-replit-config-secrets-account, ref-replit-config-secrets-prod, ref-replit-config-secrets-db, ref-replit-config-secrets-predefined, ref-replit-config-envtable, ref-replit-config-runenv, ref-replit-config-basic]
  - question_id: config.trust
    answers:
      - surface_ids: [web]
        section_id: config-trust
        status: partial
        source_refs: [ref-replit-collab-invite, ref-replit-collab-workspaces, ref-replit-collab-groups, ref-replit-collab-groups-apps, ref-replit-agent-cust-availability, ref-replit-config-ws-account, ref-replit-config-secrets-visibility]
  - question_id: config.defaults
    answers:
      - surface_ids: [web]
        section_id: config-sources
        status: partial
        source_refs: [ref-replit-config-ws-settings, ref-replit-config-ws-account, ref-replit-config-ws-user, ref-replit-config-user-settings, ref-replit-config-replitmd-how, ref-replit-config-replitmd-setup, ref-replit-config-replitmd-manual, ref-replit-config-replitfile, ref-replit-config-replitnix, ref-replit-config-secrets-usage, ref-replit-config-ci-setup, ref-replit-config-mem-manage]
  - question_id: config.migration
    answers:
      - surface_ids: [web]
        section_id: config-overrides
        status: partial
        source_refs: [ref-replit-agent-cust-vs, ref-replit-agent-cust-instructions, ref-replit-config-replitmd-limits, ref-replit-agent-cust-manage, ref-replit-config-secrets-vs, ref-replit-config-secrets-visibility, ref-replit-config-mem-manage, ref-replit-modes-choices, ref-replit-config-ws-settings]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [web]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-replit-agent-cust-create-inst, ref-replit-agent-cust-manage, ref-replit-config-mem-manage, ref-replit-config-secrets-usage, ref-replit-config-basic, ref-replit-config-replitmd-limits, ref-replit-config-cp-what, ref-replit-config-cp-rollback, ref-replit-config-cp-finding, ref-replit-config-cp-git, ref-replit-config-git-pane, ref-replit-config-git-shell, ref-replit-config-user-notifications]
---

## 固定来源与适用范围 {#config-scope}

本章固定来源是 Replit 官方文档站的 markdown 快照：Workspace Settings
[@ref-replit-config-ws-settings]、`replit.md` [@ref-replit-config-replitmd-how]、Replit
App Configuration（`.replit` / `replit.nix`）[@ref-replit-config-replitfile]、Secrets
[@ref-replit-config-secrets-vs]、Custom Instructions
[@ref-replit-config-ci-setup]、Memories [@ref-replit-config-mem-manage]、User Settings
[@ref-replit-config-user-settings]、Workspaces / 协作与权限
[@ref-replit-collab-workspaces]、Checkpoints [@ref-replit-config-cp-what]、Git pane
[@ref-replit-config-git-pane]，以及官方文档索引 Enterprise 一节
[@ref-replit-index-enterprise]。界面为 `web`，快照未标注软件版本。

Replit 的配置面分三层：**平台设置**（Workspace / Account / User 三组，在 Settings
对话框里）[@ref-replit-config-ws-settings]；**项目文件**（`replit.md` 给 Agent
的项目上下文，`.replit` 与 `replit.nix` 控制 app
的运行与环境）[@ref-replit-config-replitmd-how][@ref-replit-config-replitfile]；**运行期值**（Secrets
与 Configurations，以环境变量形式进入项目代码）[@ref-replit-config-secrets-vs]。

## 配置来源与作用域 {#config-sources}

**config.sources**：Settings 对话框把配置分成三组
[@ref-replit-config-ws-settings]。**Workspace** 组管理当前 Workspace：Workspace
overview、Workspace collaborators、Integrations、**Customization**（workspace-wide
custom instructions / skills / Memory）、Security、Groups
[@ref-replit-config-ws-settings]；**Account** 组跨 Workspace：Usage、Billing、Account
seats、**Advanced**（含 Agent model-provider policies、Enterprise
的模型控制）、**Developer**（Admin API keys
与请求历史）[@ref-replit-config-ws-account]；**User**
组只影响本人：Profile、Personalization，以及编辑器相关偏好
[@ref-replit-config-ws-user][@ref-replit-config-user-settings]。

项目内有三个文件/工具入口。`replit.md` 位于**项目根目录**，由 Agent
自动创建并读取；它不是普通配置文件，而是注入 Agent 上下文的项目说明
[@ref-replit-config-replitmd-how][@ref-replit-config-replitmd-setup]；也可以手工新建同名文件，Agent
会在后续对话中自动检测并使用 [@ref-replit-config-replitmd-manual]。`.replit` 用 TOML
描述 app 行为（入口、run/build、模块、Nix 渠道、部署目标等），`replit.nix`
声明系统依赖（`deps` 数组里的 `pkgs.*`），两者默认在文件树里隐藏，需要 **Show hidden
files** 才能看到
[@ref-replit-config-replitfile][@ref-replit-config-replitnix]。项目级的敏感值与普通配置在
**Secrets** 工具里管理：**Secrets** 放 API key/令牌/连接串，**Configurations**
放非敏感设置（日志级别、功能开关、公开 URL），两者都以环境变量形式对代码可见
[@ref-replit-config-secrets-usage]。

Workspace 级的 Agent 定制有两类，都在 **Workspace Settings → Customization**：**Custom
Instructions**（常驻指引，可把 Workspace 级规则一次写好）[@ref-replit-config-ci-setup]
与 **Memory**（可选开启、默认私有、默认不与协作者共享，可查看和编辑 Memory
file）[@ref-replit-config-mem-manage]。缺口：**config.defaults**
部分未知——没有文档化的"默认值文件"或可枚举默认值来源；文档只给出与计划/Workspace
类型相关的默认行为（例如 Free Mode 固定走智能路由、Workspace
类型决定可用标签页）[@ref-replit-config-ws-settings]。

## 覆盖与优先级 {#config-overrides}

**config.overrides**：登记来源给出的是**分工**而不是合并算法。作用域上：**Custom
Instructions 是 Workspace 范围的常驻指引**，而项目特有的上下文应放进 `replit.md`
[@ref-replit-agent-cust-vs][@ref-replit-agent-cust-instructions]；`replit.md`
必须位于项目根目录，Agent 不会自动检测子目录里的同名文件，文件过大可能无法被完整处理
[@ref-replit-config-replitmd-limits]。管理面改动"应用于未来聊天，不回溯进行中的会话"
[@ref-replit-agent-cust-manage]。Secrets 与 Configurations 明确按敏感性分开存储，且可用
**More → New published app configuration / New testing configuration**
为不同环境建不同的值 [@ref-replit-config-secrets-vs]。可见性上，协作者与组织成员能否看到
secret 的**名称**和**值**取决于访问方式与角色（例如组织内非 Owner
成员看不到值，但可以通过打印环境变量取到）[@ref-replit-config-secrets-visibility]。显式请求与
Custom Instructions 的优先级高于 Memory——Memory 只提供背景，不覆盖用户当次要求
[@ref-replit-config-mem-manage]。缺口：多值来源之间的合并/替换规则（对象、数组、空值、删除标记）没有文档，因为没有统一的配置文件语法。

**config.migration**：文档化的迁移只有**产品级弃用**，没有配置键迁移规则。已确认的弃用包括：**Economy
Mode 已下线，由 Power Mode 在同价位取代** [@ref-replit-modes-choices]；Enterprise
Workspace 中仍显示 **Design systems / Slides templates**
的属于旧设置，现已弃用，workspace 级指令与 skill 改用 Agent customization
[@ref-replit-config-ws-settings]。缺口：没有旧配置格式导入、键重命名或兼容层说明。

## 运行期与环境变量 {#config-runtime}

**config.runtime**：本界面没有 CLI 参数或 profile
机制；运行期注入靠环境变量。**Secrets** 添加后自动加密（静态 AES-256、传输
TLS）并以环境变量形式提供给项目 [@ref-replit-config-secrets-features]；Secrets 工具在
Project Editor 的 **Tools → Setup → Secrets** 打开
[@ref-replit-config-secrets-usage]。三种作用域：项目级 secret、**Account
Secrets**（可在多个项目间复用，"Link Account Secrets" 后保持同步）、以及发布版专用的
**Production app secrets**（在 Publishing → Adjust settings
下）[@ref-replit-config-secrets-account][@ref-replit-config-secrets-prod]。数据库接入会自动创建
`DATABASE_URL`（旧 Neon 开发库可能另有
`PGHOST`/`PGUSER`/`PGPASSWORD`/`PGDATABASE`/`PGPORT`）[@ref-replit-config-secrets-db]。除了用户添加的键，Replit
还会自动设置一批预定义变量：`REPLIT_DOMAINS`、`REPLIT_USER`、`REPLIT_DEPLOYMENT`、`REPLIT_DEV_DOMAIN`
[@ref-replit-config-secrets-predefined]；`.replit` 文档另列
`REPL_OWNER`、`REPL_ID`、`HOME`、`REPL_IMAGE`、`REPL_LANGUAGE`、`REPL_PUBKEYS`、`REPL_SLUG`、`PRYBAR_FILE`、`REPLIT_DEV_DOMAIN`
等，并指出 `REPLIT_DEV_DOMAIN` 在 Deployment 中不可用
[@ref-replit-config-envtable]。开发者也可以直接在 `.replit` 里为 run 命令注入变量：把
`run` 改写成 `[run]` 表，用 `args` 传命令、用 `[run.env]` 传变量
[@ref-replit-config-runenv]。相关基础字段（`entrypoint`、`build`、`onBoot`、`hidden`、`audio`
等）见 [@ref-replit-config-basic]。

## 信任、权限与策略 {#config-trust}

**config.trust**：配置能做什么首先由**角色**决定。Workspace 邀请时可选
**Member**（可看成员、可建 app 与项目）、**Guest**（只能访问与编辑被共享的
app）、**Viewer**（对 Workspace 内 app 与部署只读）[@ref-replit-collab-invite]；个人
Workspace 只有你自己是管理员，其他人只能被邀请访问单个项目；Team Workspace
成员默认可访问 Workspace 内所有项目 [@ref-replit-collab-workspaces]。Enterprise 的
**Groups** 在基础角色之上叠加授权，权限分 Workspace / Groups / Apps
三个页签逐项配置，app 级可选 Owner / Publisher / Editor / Read-only /
None，且"移除某个组的授权不会移除个人通过基础角色或其它授权得到的权限"
[@ref-replit-collab-groups][@ref-replit-collab-groups-apps]。计划与角色还直接限制功能：Skills
在所有付费计划可用，Custom Instructions 仅 Pro/Enterprise，Enterprise
只有管理员能创建/编辑/删除指令与 skill，Pro 任意成员可以
[@ref-replit-agent-cust-availability]；Admin API 密钥、Agent 模型策略等只在 Account →
Advanced / Developer 出现且需要相应权限 [@ref-replit-config-ws-account]。Secret
可见性同样受角色影响，组织非 Owner 成员看不到 secret 的值
[@ref-replit-config-secrets-visibility]。缺口：没有文档化的"项目信任"弹窗或 trust
标记（这与本地 CLI 类产品不同），因为配置主要在平台侧而非项目文件里。

## 诊断与版本恢复 {#config-diagnostics}

**config.diagnostics**：可观察点分四类。其一，**改动何时生效**：Custom Instructions
保存后"作用于 Workspace 中的新项目"
[@ref-replit-agent-cust-create-inst]；skill/指令的管理改动"应用到未来聊天，不回溯进行中的会话"
[@ref-replit-agent-cust-manage]；Memory 可在 **Settings → Customization → Memory**
开启、关闭、查看与编辑 Memory file
[@ref-replit-config-mem-manage]。其二，**值是否生效**：Secrets 在工具里逐个查看/隐藏，可
**Edit as JSON** 或 **Edit as .env** 批量编辑（注意批量编辑会替换项目现有
secrets），也可在 Shell 里 `printenv` 查看全部环境变量
[@ref-replit-config-secrets-usage]。其三，**文件配置**：`.replit`/`replit.nix`
改动后按文档说明在 shell 重载后同步；`audio = true` 等设置需要 **Restart compute**
[@ref-replit-config-basic]；`replit.md` 损坏时删除并开新会话让 Agent 重新生成
[@ref-replit-config-replitmd-limits]。其四，**回退**：Agent 自动创建
checkpoint（覆盖项目文件、AI 对话上下文、环境配置、Agent memory、数据库内容），可在
Agent 标签页、History 视图或 Git pane 回滚到任一状态
[@ref-replit-config-cp-what][@ref-replit-config-cp-rollback][@ref-replit-config-cp-finding]；checkpoint
同时生成对应的 Git commit，Git pane 与 Shell 中的 git 命令双向同步，可用 `git
status`/`git add`/`git commit`/`git push` 做长期版本跟踪
[@ref-replit-config-cp-git][@ref-replit-config-git-pane][@ref-replit-config-git-shell]。另有
Production Alerts 邮件通知覆盖发布 app 的可用性、依赖漏洞与模型更新
[@ref-replit-config-user-notifications]。缺口：没有"实际生效来源"查看器或配置重载命令；"文件已写但没生效"只能靠上述入口间接判断。
