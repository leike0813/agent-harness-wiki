---
schema_version: 3
record_kind: production
edition_id: lovable-web-configuration-v1
harness_id: lovable
topic: configuration
title: "Lovable Web 的配置机制：来源、优先级、运行时输入、信任边界与诊断"
sections:
  - section_id: config-sources
    surface_ids: [web]
    source_refs: [ref-lovable-wsadmin-general, ref-lovable-wsadmin-access, ref-lovable-wsadmin-customization, ref-lovable-wsadmin-build, ref-lovable-wsadmin-security, ref-lovable-wsadmin-connectors, ref-lovable-projset-general, ref-lovable-projset-git, ref-lovable-projset-domains, ref-lovable-projset-knowledge, ref-lovable-projset-skills, ref-lovable-adminconn-defaults, ref-lovable-appconn-approve, ref-lovable-secrets-vite, ref-lovable-buildsecrets-add, ref-lovable-knowledge-faq, ref-lovable-secrets-intro, ref-lovable-buildsecrets-intro, ref-lovable-wsid-tab, ref-lovable-wsid-provisioning, ref-lovable-apikeys-create, ref-lovable-secrets-reserved]
  - section_id: config-overrides
    surface_ids: [web]
    source_refs: [ref-lovable-knowledge-faq, ref-lovable-knowledge-workspace, ref-lovable-priv-access, ref-lovable-priv-publishing, ref-lovable-publish-see, ref-lovable-adminconn-defaults, ref-lovable-adminconn-create, ref-lovable-adminconn-use, ref-lovable-secrets-manage, ref-lovable-priv-sharing, ref-lovable-priv-autofix, ref-lovable-cloud-regions, ref-lovable-cloud-wsregion, ref-lovable-wsid-provisioning, ref-lovable-wsid-lock, ref-lovable-buildsecrets-limits]
  - section_id: config-runtime
    surface_ids: [web]
    source_refs: [ref-lovable-secrets-intro, ref-lovable-secrets-manage, ref-lovable-secrets-vite, ref-lovable-buildsecrets-intro, ref-lovable-buildsecrets-add, ref-lovable-secrets-reserved, ref-lovable-apikeys-use, ref-lovable-apikeys-create, ref-lovable-apikeys-faq, ref-lovable-ai-enable, ref-lovable-cloud-perms, ref-lovable-lvapi-what]
  - section_id: config-trust
    surface_ids: [web]
    source_refs: [ref-lovable-wsadmin-access, ref-lovable-wsadmin-customization, ref-lovable-apikeys-faq, ref-lovable-createconn-managing, ref-lovable-priv-access, ref-lovable-wsid-enforce, ref-lovable-priv-publishing, ref-lovable-wsid-lock, ref-lovable-priv-data, ref-lovable-priv-mcpserver, ref-lovable-buildsecrets-intro, ref-lovable-manreg-intro]
  - section_id: config-defaults-migration
    surface_ids: [web]
    source_refs: [ref-lovable-priv-access, ref-lovable-priv-publishing, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-mcpconn, ref-lovable-adminconn-defaults, ref-lovable-priv-data, ref-lovable-cloud-defaults, ref-lovable-wsadmin-general, ref-lovable-desktop-requirements, ref-lovable-mcpsrv-clients, ref-lovable-lvapi-faq, ref-lovable-apikeys-use, ref-lovable-buildmode-overview, ref-lovable-buildmode-faq, ref-lovable-ai-models]
  - section_id: config-diagnostics
    surface_ids: [web]
    source_refs: [ref-lovable-wsadmin-general, ref-lovable-priv-mcpconn, ref-lovable-knowledge-notes, ref-lovable-appconn-faq, ref-lovable-priv-publishing, ref-lovable-mcpsrv-troubleshoot, ref-lovable-apikeys-faq, ref-lovable-priv-access, ref-lovable-cloud-regions, ref-lovable-wsadmin-security]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [web]
        section_id: config-sources
        status: answered
        source_refs: [ref-lovable-wsadmin-general, ref-lovable-wsadmin-access, ref-lovable-wsadmin-customization, ref-lovable-wsadmin-build, ref-lovable-wsadmin-security, ref-lovable-wsadmin-connectors, ref-lovable-projset-general, ref-lovable-projset-git, ref-lovable-projset-domains, ref-lovable-projset-knowledge, ref-lovable-projset-skills, ref-lovable-adminconn-defaults, ref-lovable-appconn-approve, ref-lovable-secrets-vite, ref-lovable-buildsecrets-add, ref-lovable-knowledge-faq, ref-lovable-secrets-intro, ref-lovable-buildsecrets-intro, ref-lovable-wsid-tab, ref-lovable-wsid-provisioning, ref-lovable-apikeys-create, ref-lovable-secrets-reserved]
  - question_id: config.overrides
    answers:
      - surface_ids: [web]
        section_id: config-overrides
        status: answered
        source_refs: [ref-lovable-knowledge-faq, ref-lovable-knowledge-workspace, ref-lovable-priv-access, ref-lovable-priv-publishing, ref-lovable-publish-see, ref-lovable-adminconn-defaults, ref-lovable-adminconn-create, ref-lovable-adminconn-use, ref-lovable-secrets-manage, ref-lovable-priv-sharing, ref-lovable-priv-autofix, ref-lovable-cloud-regions, ref-lovable-cloud-wsregion, ref-lovable-wsid-provisioning, ref-lovable-wsid-lock, ref-lovable-buildsecrets-limits]
  - question_id: config.runtime
    answers:
      - surface_ids: [web]
        section_id: config-runtime
        status: partial
        source_refs: [ref-lovable-secrets-intro, ref-lovable-secrets-manage, ref-lovable-secrets-vite, ref-lovable-buildsecrets-intro, ref-lovable-buildsecrets-add, ref-lovable-secrets-reserved, ref-lovable-apikeys-use, ref-lovable-apikeys-create, ref-lovable-apikeys-faq, ref-lovable-ai-enable, ref-lovable-cloud-perms, ref-lovable-lvapi-what]
  - question_id: config.trust
    answers:
      - surface_ids: [web]
        section_id: config-trust
        status: answered
        source_refs: [ref-lovable-wsadmin-access, ref-lovable-wsadmin-customization, ref-lovable-apikeys-faq, ref-lovable-createconn-managing, ref-lovable-priv-access, ref-lovable-wsid-enforce, ref-lovable-priv-publishing, ref-lovable-wsid-lock, ref-lovable-priv-data, ref-lovable-priv-mcpserver, ref-lovable-buildsecrets-intro, ref-lovable-manreg-intro]
  - question_id: config.defaults
    answers:
      - surface_ids: [web]
        section_id: config-defaults-migration
        status: partial
        source_refs: [ref-lovable-priv-access, ref-lovable-priv-publishing, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-mcpconn, ref-lovable-adminconn-defaults, ref-lovable-priv-data, ref-lovable-cloud-defaults, ref-lovable-wsadmin-general, ref-lovable-desktop-requirements, ref-lovable-mcpsrv-clients, ref-lovable-lvapi-faq, ref-lovable-apikeys-use, ref-lovable-buildmode-overview, ref-lovable-buildmode-faq, ref-lovable-ai-models]
  - question_id: config.migration
    answers:
      - surface_ids: [web]
        section_id: config-defaults-migration
        status: partial
        source_refs: [ref-lovable-priv-access, ref-lovable-priv-publishing, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-mcpconn, ref-lovable-adminconn-defaults, ref-lovable-priv-data, ref-lovable-cloud-defaults, ref-lovable-wsadmin-general, ref-lovable-desktop-requirements, ref-lovable-mcpsrv-clients, ref-lovable-lvapi-faq, ref-lovable-apikeys-use, ref-lovable-buildmode-overview, ref-lovable-buildmode-faq, ref-lovable-ai-models]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [web]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-lovable-wsadmin-general, ref-lovable-priv-mcpconn, ref-lovable-knowledge-notes, ref-lovable-appconn-faq, ref-lovable-priv-publishing, ref-lovable-mcpsrv-troubleshoot, ref-lovable-apikeys-faq, ref-lovable-priv-access, ref-lovable-cloud-regions, ref-lovable-wsadmin-security]
---

## 配置来源与作用域 {#config-sources}

Lovable 是托管 Web 产品，**没有本地配置文件、没有 profile、没有 CLI 参数**：配置全部落在平台的四层作用域里，外加随项目代码走的少量文件。固定来源是 2026-10-01 抓取的 `features/workspace-admin-settings.md`、`features/projects/settings.md`、`features/privacy-and-security-settings.md`、`features/secrets.md`、`features/build-secrets.md`、`features/managed-registry.md`、`features/workspace-identity.md`、`features/api-keys.md`、`features/cloud.md`、`integrations/admin-controls.md` 等页。

| 作用域 | 入口 | 覆盖内容（依据） |
| :-- | :-- | :-- |
| **工作区** | `Workspace settings`（`lovable.dev/settings`），侧栏分组 General / Billing / Insights / **Access** / **Customization** / **Build & deploy** / **Security** / **Connectors** | 名称与 handle、默认成员月度积分上限、People、Groups、Identity（域名/SSO/SCIM）、Knowledge、Skills、Templates、Design systems、Connector settings、Git、**Build secrets**、**Managed registry**、**MCP server**、Workspace domains、Privacy & security、Security center、Audit logs [@ref-lovable-wsadmin-general][@ref-lovable-wsadmin-access][@ref-lovable-wsadmin-customization][@ref-lovable-wsadmin-build][@ref-lovable-wsadmin-security][@ref-lovable-wsadmin-connectors] |
| **项目** | `Project settings`（编辑器内 `More → Settings`、聊天 **+ → Project → Settings**、Cmd/Ctrl+.） | General（名称、URL 子域、monitoring、live preview、发布选项、sharing、actions、Danger zone）、Git、Domains、Knowledge、Skills [@ref-lovable-projset-general][@ref-lovable-projset-git][@ref-lovable-projset-domains][@ref-lovable-projset-knowledge][@ref-lovable-projset-skills] |
| **连接器** | `Connectors`（`lovable.dev/dashboard?connectors`）与 `Connectors → Admin settings` | 目录连接、自定义 connector、MCP server/registry、各连接的 Sharing，以及按连接类型的工作区策略 [@ref-lovable-adminconn-defaults] |
| **个人（相对工作区/项目）** | `Account settings → Preferences → Agent permissions` | 逐个 connector 的审批偏好（Always allow / Ask each time / Never allow）[@ref-lovable-appconn-approve] |
| **项目代码里的文件** | 随 Git 仓库同步 | `.env`（`VITE_` 前缀的构建期浏览器变量，必须提交）[@ref-lovable-secrets-vite]；`.npmrc`（私有 registry 认证，引用 build secret）[@ref-lovable-buildsecrets-add]；根目录 `AGENTS.md`（始终被读取）与 `CLAUDE.md` [@ref-lovable-knowledge-faq] |
| **密钥/凭据** | 项目 `More → Cloud → Secrets`；工作区 `Build & deploy → Build secrets`（Enterprise） | 项目运行时密钥与工作区构建期变量是两套独立机制 [@ref-lovable-secrets-intro][@ref-lovable-buildsecrets-intro] |
| **组织/身份** | `Access → Identity`（域名、SSO、Enforce SSO、User provisioning、SCIM） | 成员如何登录与自动加入工作区；SCIM 为 Enterprise [@ref-lovable-wsid-tab][@ref-lovable-wsid-provisioning] |
| **平台 API** | `Workspace settings → Access tokens` | Lovable API 的 key，作用域为 Projects / Workspace [@ref-lovable-apikeys-create] |

**保留名前缀**：`SUPABASE_` 与 `LOVABLE_` 由平台自动填充，不能在 Secrets UI 创建或覆盖（例如 `SUPABASE_URL`、`LOVABLE_API_KEY`）[@ref-lovable-secrets-reserved]。

**缺口**：来源没有给出工作区设置在平台侧的存储位置或 API 暴露（`registry/harnesses` 类文件不存在），也没有"环境变量覆盖平台配置"的概念——这一层在托管产品里不适用。已检查上述各页与官方全量页面索引。

## 优先级与合并规则 {#config-overrides}

Lovable **不是单一配置文件覆盖模型**，而是"每类设置各有自己的合并方向"，需要逐类确认：

* **知识**：工作区知识与项目知识**同时进入上下文**；若冲突，Lovable 被鼓励**优先项目知识**（更贴近当前项目）[@ref-lovable-knowledge-faq][@ref-lovable-knowledge-workspace]；
* **项目访问**：`Privacy & security → Default project access` 决定项目**创建时**的可见性，改设置**不改变已有项目**；`Restricted` 仅 Business/Enterprise [@ref-lovable-priv-access]；
* **发布可见性**：工作区 `Default website access` 只在项目**首次发布**时生效；之后改变不追溯，项目可在发布弹窗里单独覆盖 [@ref-lovable-priv-publishing][@ref-lovable-publish-see]；
* **连接器创建权**：默认值随计划变化——Free/Pro 由 editor 及以上创建；Business 默认 **Admins**；Enterprise 默认 **No one**（等于默认禁用该 connector）[@ref-lovable-adminconn-defaults][@ref-lovable-adminconn-create]；
* **连接可见性**：由创建者在 **Sharing** 里设定（Private 默认 / 指定成员 / 整个工作区），**不是管理员统一决定**；但连接级访问**在发布之后不再强制** [@ref-lovable-adminconn-use]；
* **密钥同名**：项目 secret 与工作区 build secret 可以同名；运行时用**项目值**（列表只显示项目行并带警告图标），构建时仍用**工作区值**（项目 secret 不参与构建）[@ref-lovable-secrets-manage]；
* **跨项目引用**：工作区级与项目级任一处关闭即失败（`Project settings → Cross-project sharing` 与工作区开关）[@ref-lovable-priv-sharing]；
* **auto-fix**：工作区设定默认作用域；工作区**锁定**时项目级不可改 [@ref-lovable-priv-autofix]；
* **托管区域**：Cloud 区域**在启用后不可更改**；工作区设了 default hosting region 后成员**不能**在创建项目时选别的区域 [@ref-lovable-cloud-regions][@ref-lovable-cloud-wsregion]；
* **身份供给**：SCIM 优先——SCIM 启用时 verified email sign-up 被禁用；删除最后一个 verified domain 会自动关闭 Enforce SSO 与 verified email sign-up [@ref-lovable-wsid-provisioning][@ref-lovable-wsid-lock]；
* **build secrets**：只能工作区级，**不能**按项目覆盖 [@ref-lovable-buildsecrets-limits]。

**数组/空值/删除标记的合并语义**：因为配置面是表单而不是文件，来源没有"数组替换还是追加""空值是否删除键"这类规则，也没有任何键的例外清单。**缺口**：以上每条都只能按"界面语义"理解，官方没有给出统一的优先级总表；已检查 `features/privacy-and-security-settings.md`、`integrations/admin-controls.md`、`features/knowledge.md`、`features/secrets.md`、`features/build-secrets.md`、`features/cloud.md`、`features/workspace-identity.md`。

## 运行时输入：环境变量、密钥与请求头 {#config-runtime}

托管产品没有"启动参数"或"命名配置集"，但有四类真正影响运行时的输入：

| 输入 | 位置 | 生效时机 | 依据 |
| :-- | :-- | :-- | :-- |
| **项目 secrets** | `More → Cloud → Secrets` | 应用**运行时**注入 Edge Functions/服务端集成，从不进浏览器；写入后**只写不可读** | [@ref-lovable-secrets-intro][@ref-lovable-secrets-manage] |
| **`VITE_` 环境变量** | 项目 `.env`（必须提交，不能 gitignore，否则预览会坏） | **构建期**打进客户端 bundle，公开可见 | [@ref-lovable-secrets-vite] |
| **Build secrets**（Enterprise） | `Workspace settings → Build & deploy → Build secrets` | 项目**构建/安装**期间作为环境变量注入（例如 `NPM_TOKEN`），发布后应用读不到 | [@ref-lovable-buildsecrets-intro][@ref-lovable-buildsecrets-add] |
| **平台保留变量** | 自动填充 | Edge Function 环境里已存在，例如 `Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")` | [@ref-lovable-secrets-reserved] |

**外部调用 Lovable API** 用请求头传凭据，而不是环境变量 [@ref-lovable-apikeys-use]：

```bash
curl https://api.lovable.dev/v1/workspaces \
  -H "Lovable-API-Key: lov_YOUR_KEY" \
  -H "Lovable-Version: 2026-09-11" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json"
```

（示例取自官方 `features/api-keys.md` 的 **Use the key** 一节。）key 的作用域（Projects / Workspace 的 None/Read/Read & write）、有效期（7/30/60/90/180 天、1 年、Never）与月度积分上限**在创建时确定**，作用域与有效期之后不可改 [@ref-lovable-apikeys-create][@ref-lovable-apikeys-faq]。

**逐个 connector 的运行时偏好**在 `Connectors` → 选中 connector → **Manage my agent's permissions**，或集中到 `Account settings → Preferences → Agent permissions`；三档为 **Always allow** / **Ask each time** / **Never allow** [@ref-lovable-ai-enable][@ref-lovable-cloud-perms]。

**缺口**：来源里没有 profile、CLI 参数、`--config` 之类的运行时覆盖；也没有说明这些平台设置能否通过 API 写入（Lovable API 目前只覆盖 projects/deployments/embed/workspace/analytics/security）[@ref-lovable-lvapi-what]。已检查 `features/api-keys.md`、`integrations/lovable-api.md` 与登记的各设置页。

## 信任、组织策略与权限边界 {#config-trust}

本地配置在 Lovable 里不存在，替代它的是**角色 + 计划 + 组织策略**三道闸：

**角色闸** [@ref-lovable-wsadmin-access][@ref-lovable-wsadmin-customization][@ref-lovable-apikeys-faq][@ref-lovable-createconn-managing]：

* 只有 workspace owner/admin 能管**工作区知识**、**技能**、**build secrets**、**managed registry**、**API keys**、**custom connector** 定义、**MCP registry**；
* editor 及以上能看 build secret 的**名字**（只读）以便引用；
* 观众与外部协作者不能访问工作区连接器。

**组织策略闸**（多在 Business/Enterprise）[@ref-lovable-priv-access][@ref-lovable-wsid-enforce][@ref-lovable-priv-publishing]：

| 策略 | 入口 | 效果 |
| :-- | :-- | :-- |
| Restricted / 工作区可见性默认值 | `Privacy & security → Default project access` | 新项目默认可见性；`Restricted` 仅 Business/Enterprise |
| 限制邀请 | `Privacy & security → Restrict workspace invitations` | Enterprise：只有 admin/owner 能通过邮件邀请（不影响 JIT/SCIM 供给） |
| 强制 2FA | `Privacy & security → Require two-factor authentication` | Enterprise；与 **Enforce SSO** 互斥（开 SSO 自动关 2FA） |
| 外部协作者 | `Privacy & security → External project collaborators` | Business/Enterprise：Allow all / editors and viewers / viewers / None |
| 编辑器项目迁移 | `Privacy & security → Editor project transfers` | Enterprise 默认关；防止项目离开组织治理边界 |
| 要求编辑者角色 | `Privacy & security → Require workspace editor role` | Enterprise：查看者即使被单独授权也不能编辑 |
| 谁能对外发布 | `Privacy & security → Who can publish externally` | Enterprise：Editors and above / Admins and owners / Owners only（**设成 Owners only 后只有 owner 能改回来**） |
| Enforce SSO + 会话时长 | `Access → Identity` | 强制经 IdP 登录，可选 8h/24h/48h/7d |
| Domain lock（Require SSO、Block workspace creation） | Lovable support | 域名级，由支持团队在 Enterprise 开通 [@ref-lovable-wsid-lock] |
| 敏感数据扫描 | `Privacy & security → Sensitive data scanning` | Enterprise，默认关；含 chat send protection 四档 [@ref-lovable-priv-data] |
| 数据保留模型 | `Privacy & security → Extended-retention models` | Enterprise 默认关；开关会写入 audit log [@ref-lovable-priv-data] |
| 第三方 MCP 客户端 | `Privacy & security → Third-party MCP clients` | Business 默认开、Enterprise 默认关 [@ref-lovable-priv-mcpserver] |
| 发布闸门 | `Privacy & security → Block publishing with critical issues` | 所有计划默认关（新建 Enterprise 工作区默认开）；有未解决关键发现时弹窗显示 **Fix security issues to publish** [@ref-lovable-priv-publishing] |

**计划的硬门槛**：API key 创建需 Business/Enterprise + admin/owner [@ref-lovable-apikeys-faq]；build secrets 与 managed registry 需 Enterprise [@ref-lovable-buildsecrets-intro][@ref-lovable-manreg-intro]；custom connector 全计划但需 admin/owner [@ref-lovable-createconn-managing]。

## 默认值、功能开关与平台差异 {#config-defaults-migration}

**默认值**（来源明确标注的）：

| 设置 | 默认 | 依据 |
| :-- | :-- | :-- |
| Default project access | **Workspace** | [@ref-lovable-priv-access] |
| Default website access | **Anyone**（Business/Enterprise 可改 Workspace） | [@ref-lovable-priv-publishing] |
| Visitor analytics / Live preview | 均**开启** | [@ref-lovable-projset-general] |
| Project monitoring | **关闭**（Pro 及以上可用） | [@ref-lovable-projset-general] |
| Block publishing with critical issues | 关闭（新建 Enterprise 工作区例外：开启） | [@ref-lovable-priv-publishing] |
| Auto-fix security issues | **Selected project**（=默认不自动修） | [@ref-lovable-priv-autofix] |
| Remote MCP connectors | **开启**（所有计划） | [@ref-lovable-priv-mcpconn] |
| Local desktop MCP servers | 开启；**Enterprise 默认关闭** | [@ref-lovable-priv-mcpconn] |
| 连接器创建权 | Free/Pro 全 editor；Business **Admins**；Enterprise **No one** | [@ref-lovable-adminconn-defaults] |
| Sensitive data scanning / Extended-retention models | 均**关闭** | [@ref-lovable-priv-data] |
| Block public storage buckets | **开启**（新桶强制私有） | [@ref-lovable-priv-data] |
| Cloud 区域 | 未设时取"离当前位置最近"的区域 | [@ref-lovable-cloud-defaults] |
| Default monthly member credit limit | 不限 | [@ref-lovable-wsadmin-general] |

**平台差异**：桌面应用只支持 **macOS 12+ 与 Windows** [@ref-lovable-desktop-requirements]；Claude Desktop 的 MCP 配置路径按平台不同（macOS `~/Library/Application Support/Claude/claude_desktop_config.json`，Windows `%APPDATA%\Claude\claude_desktop_config.json`）[@ref-lovable-mcpsrv-clients]。**来源没有提到"功能开关（feature flag）"这一概念**，发布轨道的差异表现为"当前可用/计划门槛"，而不是可自选开关。

**迁移与弃用** [@ref-lovable-lvapi-faq][@ref-lovable-apikeys-use][@ref-lovable-buildmode-overview][@ref-lovable-buildmode-faq][@ref-lovable-ai-models][@ref-lovable-projset-general]：

* **API 版本**用请求头 `Lovable-Version` 固定（示例为 `2026-09-11`）；`/v1` 是版本化且稳定的表面，官方承诺弃用端点保留迁移期并公布日落日期；
* **API key / 连接能力**：作用域与有效期不可改，改用"新建 + 吊销"；吊销不可逆（有短暂传播延迟）；
* **产品改名**：Agent mode 即现在的 **Build mode**；旧版项目仍有已弃用的 **Message queue**（可在 `Account settings → Preferences` 切换回 follow-ups）；
* **模型弃用**：标记 `(deprecated)` 的模型在已有 app 里继续工作，但新建 AI 功能不会再选它；请求弃用模型时 Lovable 会改推受支持模型；
* **模板迁移**：旧 React + Vite 项目可在 `Project settings → General → Migrate to TanStack Start` 升级（行只在可升级项目出现）。

**缺口**：由于没有本地配置文件，也就不存在"配置键迁移/旧格式导入"；来源没有给出平台设置的历史版本或回滚语义。已检查 `features/api-keys.md`、`integrations/lovable-api.md`、`features/projects/settings.md`、`features/ai.md`。

## 生效确认与排错 {#config-diagnostics}

**确认改动已生效**：

* 设置页顶部有 **Search settings** 过滤框（认常见同义词，`env` 能找到 build secrets、`sso` 能找到 identity），也可用 `Cmd/Ctrl+K` 命令面板直接跳转 [@ref-lovable-wsadmin-general]；
* `Privacy & security` 页改完要**点 Update** 才应用大部分更改；按钮旁边就是当前值 [@ref-lovable-priv-mcpconn]；
* 知识与技能的改动**立即生效**：更新工作区知识后，同一会话的后续消息就会用新指令 [@ref-lovable-knowledge-notes]。

**"写了但没生效"的常见原因与定位**（官方给出的可操作清单）[@ref-lovable-appconn-faq][@ref-lovable-priv-publishing][@ref-lovable-priv-mcpconn][@ref-lovable-mcpsrv-troubleshoot][@ref-lovable-apikeys-faq]：

| 症状 | 检查顺序 |
| :-- | :-- |
| 建不了/链不上连接 | 1) 自己的角色（viewer 与外部协作者不能访问工作区连接器）2) 该 connector 的 **Who can create connections**（可能被设成 **No one**/**Admins**）3) 自己对**这条连接**的访问权限；`Add connection` 按钮会写出具体原因 |
| 发布被拒 | 弹窗显示 **Fix security issues to publish**；用 `finding_refs` 定位阻塞发布的发现，修复或显式忽略后再发 |
| chat connector 被禁用 | 工作区 admin 关了 **Remote MCP connectors**（总开关），Connectors 页会写明这是原因 |
| 不想再看到 build secret 的行 | 需要工作区 editor 及以上；外部协作者看不到工作区级 secret 行 |
| 外部 MCP 客户端连不上 / 工具不出现 | 跑 `tools/list`；UI/OAuth 连接删除条目重加，配置文件连接的检查 JSON 合法性与 `mcpServers` 嵌套结构后重启客户端；Claude Code 用 `/mcp` 查看 |
| API key 报错 | 确认 key 未过期/未被吊销（吊销不可逆、过期不删除条目），并核对 `Lovable-API-Key` 与 `Lovable-Version` 头 |
| 设置改了但项目没变 | 检查该设置是否只在生命周期特定时刻生效（Default project access 只影响新项目、Default website access 只影响首次发布、hosting region 只在创建时可选）[@ref-lovable-priv-access][@ref-lovable-priv-publishing][@ref-lovable-cloud-regions] |

**审计入口**：Enterprise 工作区的 **Audit logs** 可按成员、动作、资源、时间范围筛选并展开事件详情，覆盖成员与访问变更、项目活动、认证事件、工作区配置变更；`features/audit-logs` 说明经 Lovable API 触发的事件会归属到发起请求的 access token（展开 JSON 里有 `api_key_id`）[@ref-lovable-wsadmin-security]。

**缺口**：来源没有提供"当前生效配置"的导出或 diff 视图，也没有设置修改的本地日志（改为审计日志）。已检查 `features/workspace-admin-settings.md`、`features/privacy-and-security-settings.md`、`integrations/admin-controls.md`、`integrations/lovable-mcp-server.md`、`features/api-keys.md` 与官方全量页面索引。
