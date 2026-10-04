# Factory Droid 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮两个官方文档来源发生变化，配置、MCP、原生插件三个主题的已发布结论逐条复核后仍然成立，不需要改写。真正需要你判断的是自定义 Provider 主题里一句关于组织托管静态密钥的表述：已发布章节说「只有新模型禁止静态 `apiKey`，已存在的静态密钥模型仍可用并可轮换」，而当前固定来源写的是托管设置端点**拒绝任何**带静态 `apiKey` 的组织托管自定义模型，没有豁免也没有轮换说明。这句话关系到管理员现有配置会不会被判非法，按契约属于「新来源与已发布配置约束相抵触」，本轮不改写正文，把它连同 `providers.entry`、`providers.auth` 一起留作待复核。

需要注意的证据边界：这两个来源的基线原件在本轮之前的 archive 清理中已经不在了，所以判断来自对新抓取原件的逐条主张复核，不是逐字节 diff，也无法断言文档本轮具体改了哪几行。

## 变化的意义与证据边界

### 组织托管自定义模型的静态密钥表述与已发布章节冲突

已发布的 `factory-droid-cli-custom_providers-v1` 在 `providers-entry` 与 `providers-auth` 两处写明：组织托管层下发的自定义模型「新模型不允许使用静态 `apiKey`，只能用 `${VAR_NAME}` 引用、keyless 端点或 Bedrock」，并补了一句「已存在的静态密钥模型仍可用并可轮换」。

当前固定来源 `source-factory-droid-docs-org-control` 的 Models and BYOK 中，`apiKey` 字段的描述是一个无条件警告：静态 API 密钥对组织托管模型一律禁止，托管设置端点会拒绝任何带静态 `apiKey` 值的自定义模型，只允许 `${VAR_NAME}` 引用。全文检索该文档，没有关于既有条目豁免或密钥轮换的任何表述；`references/` 里也没有任何短摘录支撑那句豁免。

两种解释都说得通：文档本轮收紧了表述，或者当初写作时就把条件写宽了。因为基线原件已清理，这一轮无法判定是哪一种，所以正文保持原样，问题挂起等独立复核。影响面是 `providers.entry`、`providers.auth` 两个问题与 `providers-entry`、`providers-auth` 两个小节；`providers.models`、`providers.metadata` 已单独复核通过，不在挂起范围内。

### models.md 的变化是原生模型目录，不改变章节机制结论

`source-factory-droid-docs-models` 本轮变化落在按提供方排列的原生模型表（模型 ID、倍率、可接受 `reasoningEffort` 档位）上。章节里被引用的两处默认值仍然成立：Claude Opus 4.8 默认 `high`、Claude Sonnet 4.5 默认 `off`，配置示例用的 `claude-opus-4-7` 仍在目录中。章节不枚举原生模型目录，`providers.models`、`providers.metadata` 结论不变。

### 配置、MCP、原生插件的机制结论逐条复核通过

`source-factory-droid-docs-org-control` 变化面较大，但对四个主题的被引内容逐行比对后没有发现与已发布正文相抵触的地方：10 条被引短摘录在新原件中缺失行数为 0。层级表与 7 级构建顺序、硬控制与会话默认两套方向相反的优先级、四种合并模式、`permissionRules` 的 ID 解析与工作区信任要求、系统级 `settings.json` 的三个平台路径、Enterprise Controls 的规则编辑步骤（`config.sources`、`config.overrides`、`config.trust`）；`mcpPolicy` 的 allowlist-only 语义与「无 blocklist」（`mcp.capabilities`、`mcp.exposure`）；`enabledPlugins` 启动时自动安装、`strictEnabledPlugins` 穷尽式允许清单、`extraKnownMarketplaces` 的 source 形态、`strictKnownMarketplaces` 的上限语义（`plugins.install`、`plugins.discovery`）。

### 留给下一轮的线索

组织托管 schema 的 `provider` 取值除 `anthropic`、`openai`、`generic-chat-completion-api` 外还包含 `bedrock-converse`、`factory`、`google`、`xai`、`voyage`，而章节的 provider 取值表来自 BYOK 页，讲的是用户设置路径。本轮该问题不在影响集内，未做改写；后续值得核实这两条路径的适用边界。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | factory-droid-cli-configuration-v1 | config.sources：answered；config.overrides：answered；config.trust：partial | 复核通过，保留旧版本 |
| custom_providers | factory-droid-cli-custom_providers-v1 | providers.models：partial（复核通过）；providers.metadata：answered；providers.entry、providers.auth：待复核 | 保留旧版本；providers.entry、providers.auth 因来源与已发布表述冲突而挂起 |
| mcp | factory-droid-cli-mcp-v1 | mcp.capabilities：partial；mcp.exposure：answered | 复核通过，保留旧版本 |
| native_plugins | factory-droid-cli-native_plugins-v1 | plugins.install：answered；plugins.discovery：answered | 复核通过，保留旧版本 |

**发布：** 仅结案审计，无读者可见的章节变化；`delivery=pr`，本轮未运行 `pnpm ahw publish`、`pnpm chapters:update` 或 `pnpm managed:packages`，未切换任何发布指针。**受管二进制：** `delivery=pr` 不执行；`source-factory-droid-npm` 观察到 0.233.0，按契约版本变化本身不构成章节变化或源码到包映射，留给 `harness-binary` 在合适的轮次核对。

## 待处理与独立复核

**审计记录：** [audit-factory-droid-a13bddc0-67d0-4107-bb78-be0210f27af2.yaml](./audit-factory-droid-a13bddc0-67d0-4107-bb78-be0210f27af2.yaml) **待处理旧审计：** 无（`pending_audit_refs` 为空）。

**待复核问题：** `providers.entry`、`providers.auth`。触发原因是新来源与已发布的配置约束相抵触（组织托管自定义模型的静态 `apiKey` 豁免）。当前子代理没有可用的 subagent 委派入口，无法按契约取得第二个 Agent 的只读复核，因此 `review_status` 保持 `pending`、不填 `reviewed_by` / `reviewed_at`，正文不改写。复核要点：以当前固定来源为准，判断那句豁免表述是应删除、还是应另找来源支撑；在结论出来前不要把 `factory-droid-cli-custom_providers-v1` 改写进任何发布。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| [source-factory-droid-docs-models](https://docs.factory.com/models.md) | a03b32a4… → 5c2f5c12… | changed；原生模型目录变化，章节引用部分仍成立 |
| [source-factory-droid-docs-org-control](https://docs.factory.com/enterprise/hierarchical-settings-and-org-control.md) | 821f7eb3… → a514f00b… | changed；10 条被引短摘录逐行命中，机制结论不变，但与自定义 Provider 章节的静态密钥表述冲突 |
| [source-factory-droid-npm](https://www.npmjs.com/package/@factory-ai/droid) | 0.233.0@sha512-bIAxfGMw… | changed；版本推进，本轮不据此改写章节或建立映射 |
| source-factory-droid-repo | 485a0c3b… → 485a0c3b… | unchanged；未打开受管源码工作区 |
| 其余 15 个官方文档来源（skills、mcp、subagents、hooks、plugins、plugin-marketplaces、byok、settings、cli-reference、agents-md、custom-commands、permission-rules、autonomy、output-styles、exec） | 与基线一致 | unchanged |

## 验证与差异入口

在仓库根目录运行：`pnpm knowledge:validate`（通过）、`pnpm sources:audit-log`（通过）、`git diff --check`（无空白错误）、`git status --short --untracked-files=all`（仅本产品审计文件为新增，其余为同轮其他产品的改动，未触碰）。全树校验覆盖到其他产品的错误按契约只记录、不修改；本轮未发现属于 factory-droid 的校验错误。

本轮改动只有本目录下的审计 YAML 与本报告，没有新增章节、来源引用或版本映射。查看本产品差异：

```sh
git status --short --untracked-files=all -- audits/factory-droid knowledge/factory-droid
```
