# Lingma 2026-11-25 巡检维护报告

- 审计：`audit-lingma-1fe9218a-fa4b-45df-823d-6929873df03f`
- 观察时间：2026-11-25T00:29:09.029Z
- 候选：`/tmp/ahw-batch-10/candidates/lingma`
- 基线：2026-11-23 审计（14 个来源在本轮 changed，8 个 unchanged）
- 结论：两处插件界面事实更新（`native_plugins-v3`、`configuration-v3`）；其余 11 个 `/user-guide/` IDE 页面（另 `faq-mcp` 仅标题变化）不再证明 `jetbrains` 插件界面，保留旧 edition 并建议重新绑定插件来源。

## 1. 来源边界（为什么不能直接照抄新页面）

- 11 个 `/user-guide/` 页面（skills、MCP、custom-agent、agent-mode、hooks、custom-model、model-selector、rules、plugin-config、network-proxy、custom-commands）的新快照以 **Qoder CN IDE** 为口径；涉及路径的页面改用 `~/.qoder-cn/...` 与项目内 `.qoder/...`。MCP 与网络代理页明确写“本文介绍 IDE 配置；JetBrains 插件入口见 /plugins/settings”。
- 同批 `faq.md` 仍分节：“Qoder CN 插件常见问题（JetBrains / VS Code）”使用 `.lingma` / `Lingma.exe` 与 `.qodercn` / `QoderCN.exe` 两套路径，明确把插件与 IDE 分开。
- 未变化的 `product-overview/introduction-of-qodercn.md` 把 Qoder CN IDE 与 Qoder CN JetBrains 插件列为两个子产品。
- 因此 `jetbrains` 界面的机制不能从这些 IDE 页面重新推导；旧快照与旧 edition 仍是插件侧证据。`/plugins/*` 插件文档未在本产品来源中登记。

## 2. 逐来源差异与结论

行数为去掉 `scrollMarginTop`/`<a id>`/空行后的可见文本 diff。

| 来源 | 行数 | 主要变化 | 结论 |
| :-- | :-- | :-- | :-- |
| `source-lingma-docs-skills` | +63 / -34 | 标题改为“技能”；正文改为 Qoder CN IDE；路径改为 `~/.qoder-cn/skills`、`.qoder/skills`；新增设置页“新建/导入”、Skills CLI（`npx skills add ... -a qoder --copy`）、`.agents/skills`、内置 `/create-agent`；删除“重启 IDE”。 | IDE 口径；插件章节不改。旧插件的 `.lingma/skills` 结论保留。 |
| `source-lingma-docs-plugins` | +10 / -13 | 删除 QoderWork 客户端列与 QoderWork 专属注记；删除 `qoderwork.md` 别名；新增客户端支持矩阵（JetBrains：Skills/Agents/Commands/MCP/Hooks 已支持，Rules 即将支持，qoder.md 不适用）。 | **插件界面**；更新 `native_plugins-v3`。 |
| `source-lingma-docs-mcp` | +129 / -175 | 重写为 IDE 文档；新增 Streamable HTTP、`~/.qoder-cn/mcp.json`、`请求超时时长`、`一键修复`；删除版本前提、10 个服务上限、qwen3、JCEF/手动启动服务等；JetBrains 指向 `/plugins/settings`。 | IDE 口径；`mcp-v3` 不改。旧页的 10 上限/前提只对旧插件快照有效。 |
| `source-lingma-docs-faq-mcp` | +1 / -1 | 仅标题“MCP常见问题说明”→“MCP 常见问题”。 | 纯编辑噪声；无影响。 |
| `source-lingma-docs-custom-agent` | +50 / -34 | 改为 IDE；路径 `~/.qoder-cn/agents`、`.qoder/agents`；新增 `model`/`skills`/`mcpServers` 字段与对应小节；“模型配置”标题下无正文；`Shell`→`Bash`。 | IDE 口径；`custom_agents-v1` 不改。 |
| `source-lingma-docs-agent-mode` | +3 / -2 | 终端自动执行策略改为“设置 → 会话 → 自动执行 → 终端”；环境感知措辞微调。 | IDE 口径；插件终端策略仍以旧快照/更新日志为准。 |
| `source-lingma-docs-hooks` | +1410 / -148 | 5→12 事件；新增 `http` 类型、`if`/`async`/`asyncRewake`/`statusMessage`；配置路径改为 `~/.qoder-cn`/`.qoder`；多 Hook 可并行；配置下一次请求生效；新增 Transcript JSONL 格式与调试指南；删除 FAQ。 | IDE 口径；`hooks-v1` 与 `local_transcripts-v1` 不改。 |
| `source-lingma-docs-custom-model` | +24 / -8 | 供应商新增千问AI平台、DeepSeek、小米 MIMO；入口改为 IDE 设置；说明 Repo Wiki 消耗 Credits。 | IDE 口径；`custom_providers-v2` 不改。 |
| `source-lingma-docs-model-selector` | +21 / -20 | Auto 0.5×→0.3×、Fast 0.8×→0.6×；新增 Qwen4-Max、Kimi-K3.1-Pro、Step-5-Preview；删除 Qwen3.7-Max/Plus、Kimi-K3；新增使用规范与 Credits 用尽说明；参数配置改为“以控件为准”。 | IDE/营销口径；不改 `custom_providers`。模型清单以客户端为准，未造映射。 |
| `source-lingma-docs-rules` | +44 / -85 | `.lingma/rules`→`.qoder/rules`；上限 10,000 字符/文件→100,000 字符/全部活跃规则；新增 AGENTS.md 兼容与“规则优先”；删除版本前提与 VS Code/JetBrains 分页。 | IDE 口径；`configuration-v3` 不采用新路径/上限。 |
| `source-lingma-docs-plugin-config` | +42 / -99 | 页面由“配置和反馈”改为“快捷键”；删除 VS Code/JetBrains 配置、行间生成开关、规则入口、帮助反馈；链接到 `/plugins/keyboard-shortcuts`。 | IDE 口径；插件配置结论保留旧快照。 |
| `source-lingma-docs-network-proxy` | +16 / -10 | 改为 IDE `http.proxy`、系统代理/环境变量、网络诊断；JetBrains 指向 `/plugins/settings`。 | IDE 口径；插件代理结论保留旧快照与 FAQ。 |
| `source-lingma-docs-faq` | +15 / -2 | 新增 JetBrains 插件第 11 条“本地服务连不上/一键修复”；“QoderWork/Qoder CLI”标题改为“Qoder CN CLI”；插件 `.lingma` 与 IDE `.qodercn` 仍分节。 | **插件界面**；更新 `configuration-v3` 诊断。 |
| `source-lingma-docs-custom-commands` | +243 / -20 | 改为 IDE；路径 `.qoder-cn/commands`、`.qoder/commands`；新增“技能与指令”入口、名称规则、空正文不显示、刷新说明与 5 个示例；删除“仅适用于 Qoder CN IDE”警告。 | IDE 口径；`configuration-v3` 保留旧结论，并注明插件包 Commands 是另一机制。 |

排除的噪声：`scrollMarginTop`/`<a id>` 锚点、标题层级与空白、`themes`→`text`/`bash` 代码块语言、`<b>`→`**` 等 Markdown 表现差异；`faq-mcp` 仅标题差。未计入 build/CDN 哈希、日期或图片域名。

## 3. 候选变更

- `knowledge/lingma/chapters/lingma-jetbrains-native_plugins-v3.md`：客户端支持矩阵（JetBrains 组件范围）、`qoder.md` 只保留 `qoder.md` 文件名、Rules 即将支持、qoder.md 不适用；Commands 与个人版自定义指令区分。
- `knowledge/lingma/chapters/lingma-jetbrains-configuration-v3.md`：插件 `.lingma` / IDE `.qodercn` 边界；FAQ 第 11 条本地服务一键修复与失败处理；Hooks 重载口径的界面边界说明。
- 新固定记录：`artifact-source-lingma-docs-plugins-cacd40d123c3`、`snapshot-lingma-docs-plugins-20261125`、`artifact-source-lingma-docs-faq-d05003676195`、`snapshot-lingma-docs-faq-20261125`。
- 新引用：`ref-lingma-plugins-support-20261125`、`ref-lingma-plugins-support-rest-20261125`、`ref-lingma-plugins-qoder-md-20261125`、`ref-lingma-faq-selfrepair-20261125`、`ref-lingma-faq-selfrepair-failures-20261125`、`ref-lingma-faq-plugin-identity-20261125`。
- 选章：`native_plugins`→v3、`configuration`→v3；其余六主题保持原 edition。
- 未创建 mapping：无可证明的软件版本。

## 4. 复核与未完成

- 作者自检：逐条核对 6 条新引用摘录与 `archive/lingma/.../source.md` 逐字一致（长度 181–734 字节，均 ≤800）；新章节引用均属于本产品 snapshot。
- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-10/candidates/lingma` 通过（exit 0）。
- 未完成/需协调者决定：11 个 `/user-guide/*` 来源已不再覆盖 `jetbrains` 界面。建议把观察入口或来源重新绑定到 `/plugins/*` 插件文档（未登记），或在 catalog 增加 Qoder CN IDE 界面后再维护；在此之前不把 IDE 页面写入插件章节。
- 历史 pending audit（含 `audit-lingma-26c6bee5…`、`audit-lingma-323acf8c…`、`audit-lingma-7be0e761…`）保持未关闭；本审计不借 `reviewed` 关闭它们。
- 高影响复核：本轮无需独立复核。来源变化可由文档/界面改版解释，未推翻插件已发布步骤；两处新事实为组件支持矩阵与排障步骤。
