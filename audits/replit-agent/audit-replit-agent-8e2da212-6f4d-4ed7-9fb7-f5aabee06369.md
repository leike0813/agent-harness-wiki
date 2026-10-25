# replit-agent 巡检维护报告（2026-10-13 观察批次）

- 审计：`audit-replit-agent-8e2da212-6f4d-4ed7-9fb7-f5aabee06369`
- 上一次审计：`audit-replit-agent-d90a82ec-d948-4763-b80c-6e7d7ae8de70`
- 角色：worker，`delivery=pr`，triage 分类 `narrow_investigation`
- 派发问题：`mcp.entry`、`mcp.auth`、`config.sources`、`config.overrides`

## 1. 变化的来源身份

| source_id | baseline | observed | 当前保留原件 |
| - | - | - | - |
| source-replit-connect-via-mcp-doc | `d6b920e8…636b01` | `aa555ff2…afd02bb8` | `archive/replit-agent/artifact-source-replit-connect-via-mcp-doc-aa555ff250cb/source.md` |
| source-replit-app-configuration-doc | `d21b21f7…94564a` | `8cbaf19f…1eef8` | `archive/replit-agent/artifact-source-replit-app-configuration-doc-8cbaf19fbafd/source.md` |
| source-replit-add-collaborators-doc | `f3001592…fa57293` | `ed7a32eb…4ea6b7` | `archive/replit-agent/artifact-source-replit-add-collaborators-doc-ed7a32ebecb4/source.md` |
| source-replit-docs-index | `029cf503…0f1a85` | `74d82836…dccc15e` | `archive/replit-agent/artifact-source-replit-docs-index-74d82836d7fc/source.md` |

其余 38 个来源本轮 `unchanged`。

## 2. 基线裁剪造成的能力边界

**这一节是本报告最重要的限制，不能被读成"页面没有变化"。**

三个文档来源的旧版原件没有留在 archive 里：`archive/replit-agent/` 下只有本轮新哈希目录
（`aa555ff250cb`、`8cbaf19fbafd`、`ed7a32ebecb4`），`knowledge/` 内登记的
`archive/replit-agent/artifact-replit-connect-via-mcp-doc/raw.md` 等旧路径在磁盘上已不存在
（`ls` 报 No such file or directory）。因此：

- **能证明的**：当前保留原件仍然逐字支持已发布的每一条 `mcp.entry`、`mcp.auth`、
  `config.sources`、`config.overrides` 答案。
- **不能证明的**：这些页面的**其它部分**是否同时发生了变化。本轮没有任何行级 diff 可用，
  页面中与派发问题无关的分节（例如新增章节、改写的步骤顺序、被替换的截图）即使有实质改动，
  本轮也不会发现。

审计 YAML 的 `investigation_notes` 记录了同一条限制，`reason` 字段写的是"已对照当前保留原件
核实……结论仍成立"，而不是"无变化"。后续轮次若需要行级结论，需要在 archive 保留新的基线原件。

## 3. 逐题核实

读取入口为原项目 archive 的三份 `source.md`，使用的定位锚点是页面自身的标题层级。

### 3.1 `mcp.entry` — verified-against-current-source

已发布答案（`mcp-entry-definition`，partial）列了四类入口。逐条对照
`artifact-source-replit-connect-via-mcp-doc-aa555ff250cb/source.md`：

| 已发布结论 | 当前原件（章节锚点） | 判定 |
| - | - | - |
| 预置 server 走 `replit.com/integrations` 的 Integrations 目录、逐个 Sign in | `## Connect a pre-listed MCP server` → Steps `Open the Integrations catalog`（"Go to replit.com/integrations, which opens your workspace's **Integrations** settings. Select **Discover integrations**, then choose **MCP** from **All types**"）、`Sign in`（"You'll be guided through the OAuth flow with that service"） | 成立 |
| 自定义 server 在项目侧 Connectors/面板添加，字段只有 Display name / URL / Advanced headers | `## Add a custom MCP server` → Steps `Open the add-server dialog`（"On the MCP Servers settings pane, click **+ Add MCP server**"）、`Set a display name`、`Enter the server URL`（"Paste the MCP server's HTTPS endpoint. Open **Advanced settings** to add custom headers (e.g. `X-API-Key`)"）、`Test & save` | 成立 |
| 一键安装链接 `https://replit.com/integrations?mcp=` + base64 JSON payload | `## Share an install link` 及 `<McpLinkGenerator />` 源码（`payload = { displayName, baseUrl }`、`JSON.stringify` → `btoa(unescape(encodeURIComponent(...)))` → 拼到 `https://replit.com/integrations?mcp=`） | 成立 |

`ref-replit-mcp-connect-prelisted` 与 `ref-replit-mcp-connect-custom` 的短摘录在当前原件中逐字
可查。**未发现推翻。**

### 3.2 `mcp.auth` — verified-against-current-source

已发布答案（`mcp-transport-auth`，partial）给两条路径。核对：

- 预置 server 的 OAuth：`## Connect a pre-listed MCP server` / `Sign in` 步骤仍在。
- 自定义 server 走 OAuth：`## Add a custom MCP server` / `Test & save` —
  "Click **Test & save**. Replit attempts to connect and walks you through any OAuth flow the
  server requires."
- 自定义 header 认证：同节 `Enter the server URL` — "add custom headers (e.g. `X-API-Key`) if the
  server needs authentication"。
- 两条路径的正式表述（OAuth DCR / Custom headers）来自 `ref-replit-mcp-auth`，其来源
  `source-replit-mcp-overview-doc` 本轮 `unchanged`；Enterprise 自带 OAuth 客户端来自
  `source-replit-managing-connectors-doc`，同样 `unchanged`。

token 刷新周期、凭据存储与轮换仍无来源，原缺口陈述不变。**未发现推翻。**

### 3.3 `config.sources` — verified-against-current-source

对照 `artifact-source-replit-app-configuration-doc-8cbaf19fbafd/source.md`：

- 前言仍写 "Replit Apps are configured with two files: the `.replit` and `replit.nix`"，隐藏文件
  步骤（Library → Files → **Show hidden files**）仍在。
- `## \`replit.nix\` file`：deps 数组、`pkgs.` 前缀、"Any changes will be synced after your shell
  is reloaded" 仍在。
- `## \`.replit\` file`：键表完整保留 `entrypoint`、`modules`、`[nix]`/`channel`、`packages`、
  `[unitTest]`/`language`、`[gitHubImport]`/`requiredFiles`、`[deployment]`/`run`/`deploymentTarget`。
- `## Environment variables`：`REPL_OWNER`、`REPL_ID`、`HOME`、`system`、`LANG`、`REPL_IMAGE`、
  `REPL_LANGUAGE`、`REPL_PUBKEYS`、`REPL_SLUG`、`PRYBAR_FILE`、`REPLIT_DEV_DOMAIN` 全部在表内，
  `REPLIT_DEV_DOMAIN` 在 Deployment 中不可用的说明仍在。
- `## Configuring basic settings` / `Including environment variables`：`[run]` 的 `args` 与
  `[run.env]` 写法与章节引用一致。
- `config.defaults` 依赖的"没有文档化的默认值来源"结论同样未被推翻。

**未发现推翻。**

### 3.4 `config.overrides` — verified-against-current-source

当前 app-configuration 页给出的仍然只有**单文件内**的键作用域（`[run]`/`[run.env]`、
`[deployment]`、`[packager.features]`、`[nix]`、`[[ports]]`）与 shell 重载同步说明，**没有**跨来源的
合并顺序、覆盖规则或删除标记。章节已发布的结论——"登记来源给出的是分工而不是合并算法"以及对应
缺口——照旧成立。Custom Instructions 与 `replit.md` 的分工、Secrets 与 Configurations 按敏感性
分离、多环境 published/testing configuration 等结论来自 `source-replit-agent-customization-doc`、
`source-replit-secrets-doc`、`source-replit-replit-md-doc`，三者本轮均 `unchanged`。**未发现推翻。**

## 4. `docs/add-collaborators` 的范围判定

该页全文只讲：团队 Workspace 的成员邀请流程（Steps：Open Workspace collaborators / Choose a role
/ Enter email addresses and send invitations）、三种角色（Member / Guest / Viewer）、SCIM 与
SSO 域的企业限制、以及结尾指向 "Manage connectors" 的 Next step 卡片。

判定：**超出本轮派发问题**。它不描述交给 Agent 的任何配置来源（没有 `replit.md`、`.replit`、
`replit.nix`、Secrets、Settings 分组），也不描述任何覆盖或优先级机制，因此对 `config.sources` 与
`config.overrides` 两题没有落点。它唯一的被引用处 `ref-replit-collab-invite` 支撑的是
`config.trust`（角色可见性），不在本轮 `question_ids` 内；该短摘录在当前原件中仍逐字可查，故
`config.trust` 未被推翻，仅因本轮未派发而保持 pending。

## 5. `docs/index` 的排除

按协调者结论排除：改动仅为页面数量统计（226→227、每种语言 445→443）与一条被替换的 Stripe
用例条目。`local_transcripts`、`skills`、`custom_agents`、`custom_providers` 四个 topic 的
impact 现在记录"唯一变化来源是 source-replit-docs-index，按协调者结论排除"。

## 6. 交付内容

- 未新建 chapter edition：四题在当前保留原件下全部仍被支持，按 Skill 第 5 节不制造 edition。
- 未新增或修改 reference、snapshot、artifact、mapping：`chapter-current.yaml` 不变，
  `replit-agent-web-mcp-v1` 与 `replit-agent-web-configuration-v1` 仍是当前选章。
- 更新 `audits/replit-agent/audit-replit-agent-8e2da212-6f4d-4ed7-9fb7-f5aabee06369.yaml`：
  三个变化来源补 `candidate_path`（指向原项目 archive 的保留原件，不是临时路径）；
  `impacts` 按派发范围收窄并逐条写明核实依据；`pending_question_ids` 移除本轮已结的四题；
  `investigation_notes` 补入基线裁剪限制、实际读取入口、逐题结论、add-collaborators 范围判定。

## 7. 复核状态

`review_status` 维持 `pending`，**未**标记 `reviewed`，原因有两条：

1. 本审计引用四个未结审计：`audit-replit-agent-f9dec7ee`（providers.* 未结）、
   `audit-replit-agent-3eac336d`、`audit-replit-agent-50b6e7ad`、`audit-replit-agent-d90a82ec`。
   引用未结审计时不得标记 reviewed，否则等于间接关闭它们的阻塞。
2. 仍有多题未调查：`config.runtime`、`config.trust`、`config.defaults`、`config.diagnostics`、
   `mcp.definition`、`mcp.transport`、`mcp.lifecycle`、`mcp.capabilities`、`mcp.exposure`、
   `mcp.diagnostics`、`hooks.diagnostics`、`plugins.install`、`plugins.discovery`、
   `plugins.api`、`plugins.lifecycle`、`plugins.diagnostics`。

本轮结论**没有**改变任何已发布机制，因此按 Skill 第 5 节不属于必须独立复核的高影响变化，
无需独立 reviewer。但它也未消除上述 pending 项，`review_status: pending` 应保持到全部问题结完。
