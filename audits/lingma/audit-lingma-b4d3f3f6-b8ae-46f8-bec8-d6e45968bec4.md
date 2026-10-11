# audit-lingma-b4d3f3f6 — 官方文档 22 页变化的语义复核

产品：lingma（Qoder CN / 通义灵码，catalog 唯一界面 `jetbrains`）
基线审计：audit-lingma-323acf8c
本轮 triage：maintain

## 1. 变更来源与原件身份

22 个 `official_documentation` 来源的 `observed` 哈希均不同于 `baseline`。本轮逐对比对本项目 archive 中的新旧原件
（`archive/lingma/artifact-source-<source-id>-<hash>/source.md`），不复用任何临时 checkout，未重新扫描来源。

保留并固定的两组新原件：

| 来源 | baseline | observed | 新原件 |
| --- | --- | --- | --- |
| source-lingma-docs-extensions | `c9cd19508df1…` | `3767bec1b8d3…` | `archive/lingma/artifact-source-lingma-docs-extensions-3767bec1b8d3/source.md` |
| source-lingma-docs-faq-mcp | `f9de22b806f2…` | `9e03e36028f3…` | `archive/lingma/artifact-source-lingma-docs-faq-mcp-9e03e36028f3/source.md` |

对应新增记录：`artifact-source-lingma-docs-extensions-3767bec1b8d3`、`snapshot-lingma-docs-extensions-20261011`、
`artifact-source-lingma-docs-faq-mcp-9e03e36028f3`、`snapshot-lingma-docs-faq-mcp-20261011`。
既有 `artifact-lingma-docs-extensions` / `artifact-lingma-docs-faq-mcp` 与其快照、引用全部保留，未就地改写。

## 2. 排除依据（20 页）

- **19 页锚点 CSS**：逐行 diff 后，差异全部落在 `<a id=… style={{ scrollMarginTop: … }}>` 属性上，由 `8rem` 变为
  `calc(max(var(--topbar-height, 112px), calc(var(--topbar-height-h5, 62px) + 40px)) + 8px)`。正文、字段、路径、条件均无变化，属站点排版调整。
- **source-lingma-docs-install**：安装目录表格中 `C:\Users\用户名\AppData\Local` 被写成 `C:&#92;Users&#92;用户名&#92;AppData&#92;Local`。
  这是 HTML 实体转义写法，同一路径、同一权限要求，配置语义不变。

排除经逐页核对，不是按“绝大多数相同”推断。

## 3. 更正协调方的两处判断

**(1) source-lingma-docs-extensions 确为语义改写 —— 判断成立。**
标题 `扩展管理` → `扩展与市场`；适用版本 `企业标准版、企业专属版` → `仅适用 Enterprise`；管理对象由自定义指令改为
组织认可的插件与技能；新增专属市场（Private Marketplace）、集合、下发范围/下发策略等概念。

**(2) source-lingma-docs-faq-mcp “删除分平台安装步骤、改写为扁平安装验证流程” —— 与原文不符，本轮按实际差异处理。**
对新旧两版做去缩进归一化比对后确认，新版**仍然保留**以下全部内容：

- `nvm-windows` 管理多版本、`nvm install 22.14.0` / `nvm use 22.14.0`；
- `brew update` / `brew install node`；
- 向 `~/.zshrc` 追加 `export PATH="/usr/local/opt/node@16/bin:$PATH"`；
- Node ≥ 18、npm ≥ 8 的版本门槛。

实际变化为：整段从列表项的缩进中提出为平铺段落；页签标题由 `Windows 系统`/`Mac 系统` 简化为 `Windows`/`macOS`
（uv 一节由 `Mac 系统` 改为 `macOS / Linux`）；步骤编号补空格；若干 HTML 表格改为普通列表（`工具使用相关问题` 第 1 条、
`无法初始化 MCP Client` 排查步骤、`JCEF` 解决方案）；“MCP 服务列表无法正常加载”一节新增 `<Tabs>` 包裹（原先是两段平铺的
`## Windows 系统` / `## Mac 系统`）。

唯一带行为含义的变化是连接中断的处理措辞：该页此前写明“在界面右侧单击，系统会自动尝试重新启动 MCP 服务”，新版改为
“如果服务连接中断，请尝试重新启动 MCP 服务”，不再描述界面右侧这个自动重启入口，改为让读者自行重启。新页全文已无“界面右侧”字样
（`重新启动` 仅两处：第 187 行为该新措辞，第 219 行为“重新启动 IDE”），因此本页不存在新旧两种说法并存的情况。

需要区分的是：`在界面右侧单击自动重启`这一表述仍出现在**用户指南页**（`guide-for-using-mcp.md`，其原件第 312 行），
由 `ref-lingma-mcp-protocol` / `snapshot-lingma-docs-mcp` 固定，与 faq-mcp 是两份不同文档，不构成同页分歧。
本轮初稿曾把该指南页句子误记为 faq-mcp 同页的另一处表述，经独立复核已更正；章节中涉及该入口的结论仍按各自来源分别记录。

因此 `mcp` 仅 `mcp.diagnostics` 需要复核；该页不定义 MCP server 条目，`mcp.entry` 不受影响。

## 4. 受影响问题与处理

### native_plugins

新版本 `lingma-jetbrains-native_plugins-v2`（v1 保留）。除更新既有小节外，新增
`plugins-enterprise-distribution` 小节，用四条新引用固定新页面的四类事实：

| 引用 | 固定内容 |
| --- | --- |
| `ref-lingma-extensions-concepts` | 仅适用 Enterprise；技能/插件/专属市场/集合/下发五个概念；插件在 QoderWork CN 客户端市场展示为专家套件 |
| `ref-lingma-extensions-marketplace` | 集合为管理单位且只含一种内容类型；仅 QoderWork CN 在客户端市场展示，Qoder CN 与 QoderWork CN 均支持管理员下发；技能市场与专家套件市场的归属 |
| `ref-lingma-extensions-rollout` | 下发范围（未下发/全员/分组）、下发策略（客户端可配置/强制开启/静默启用）、市场可见范围与下发范围的区别及不一致后果 |
| `ref-lingma-extensions-upload` | 插件 ZIP 根目录须含 `.qoder-plugin/`、技能 ZIP 根目录须含 `SKILL.md`；移出集合不删除原始包 |

**界面边界（重要）**：本页的专属市场与下发机制，原文明确限定在 QoderWork CN 与 Qoder CN；仅 QoderWork CN 在客户端市场展示，
且**未声明 JetBrains 插件接入专属市场或其客户端市场**。本章登记的唯一界面是 `jetbrains`，故该节标注为跨界面参考，
明确不把企业分发结论外推到本界面。`plugins.install` 仍为 `partial`（本界面安装入口、更新、卸载、用户级/项目级区别仍无来源）。

`plugins.diagnostics` 保持 `unknown`。已检查 `qoder-plugins.md` 的“常见问题”、extensions 页“常见问题”、JetBrains 更新日志与安装指南，
未找到查询插件版本/运行状态或定位兼容、依赖、加载错误的官方入口。按契约，缺失机制不得反推结论。

### mcp

新版本 `lingma-jetbrains-mcp-v3`（v2 保留）。`mcp.diagnostics` 增补四条新引用：Node.js/uvx 依赖缺失、Client 初始化失败
（含镜像源兜底）、工具调用异常参数补填、服务列表卡加载时的手动启动（Windows `Lingma.exe start`、macOS `Qoder CN start`）。
并在小节内显式记录第 3 节的版本比对结论与连接中断措辞的实际变化。`mcp.entry`、`mcp.definition` 等答案未变。

### configuration —— 已发布结论被取代

extensions 改写使本主题两处**已发布**结论失去现行来源支持：

1. `config.sources`：“企业标准版、企业专属版的管理员在控制台创建自定义指令……该功能目前仅支持 VS Code 和 JetBrains IDE 插件”。
2. `config.trust`：“企业自定义指令由管理员在控制台按‘公开/私有’控制可见范围，指令启用或修改后预计需 5～10 分钟生效”。

新原文不再出现“自定义指令”、上述版本口径、VS Code/JetBrains 适用性声明或生效延迟表述；控制维度变为市场可见范围与下发范围，
对象是插件与技能。按协调要求，以新版本 `lingma-jetbrains-configuration-v2` **取代**（已发布 v1 文件保持原样，未就地编辑），
只在两处失效段落与对应 `source_refs`/答案上改动，未对该主题做全量复审。

**范围说明**：协调清单把 `configuration` 列为不得触碰的排除主题，同时要求“若 extensions 改写使已发布的企业自定义指令陈述失效，
须显式声明并以新版本取代”。这两条要求在本题上不可分离——失效陈述只存在于 configuration 章节，而取代必须以新章节版本发布。
故本轮做了最小必要取代，并把范围判断写入审计 `investigation_notes`。若协调方认为应由他人处理，回退 `configuration-v2`
与 `registry/chapter-current.yaml` 中该主题的指针即可，其余改动不受影响。

## 5. 界面与排除主题

本产品 catalog 只登记 `jetbrains`，本轮所有答案 `surface_ids` 均为 `[jetbrains]`，未为他界面生成答案。
`configuration`、`custom_agents`、`custom_providers`、`hooks`、`skills`、`local_transcripts` 未做章节改写
（configuration 除外，且仅为上述最小取代）。前一轮审计中对这六个主题的 impact 已按实际证据收敛移除。

## 6. 复核请求

本轮属高影响：新证据推翻已发布结论（configuration 两处），且涉及跨主题关键分发机制。
请求独立 reviewer 只读复核以下问题范围：

1. `ref-lingma-extensions-*` 四条引用的摘录是否忠实于新原件，定位与快照身份是否对应。
2. 专属市场/下发结论限定在 QoderWork CN 与 Qoder CN、不外推到 `jetbrains`，是否证据充分、是否有过度断言。
3. configuration 两处失效判定是否成立，取代范围是否已收敛到最小。
4. 第 3 节对 faq-mcp “分平台步骤未被删除”的更正是否与原文一致。

`plugins.diagnostics` 保持 `unknown` 属既有缺口，非本轮新增。