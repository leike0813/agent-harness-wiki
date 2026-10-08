# github-copilot 维护审计 · audit-github-copilot-f19a14af-a207-45bf-a176-528b6df7d3d0

## 观察到的来源变化

| source_id | 基线 | 观察到 | 结果 |
|---|---|---|---|
| `source-github-copilot-repo` | `6783c47b` | `475c5ba9` | changed（唯一变更文件 `changelog.md`，新增 1.0.93 段） |
| `source-github-copilot-docs-cfgdir` | `25543caf` | `8e729d40` | changed |
| `source-github-copilot-docs-cmdref` | `92c43e42` | `0a0c815d` | changed |
| `source-github-copilot-docs-hooks-ref` | `81cebd7f` | `3b492ffd` | changed |
| `source-github-copilot-docs-cli-concept` | `d88b94d9` | — | blocked（HTTP 404，连续第二轮） |

原件读取自项目 archive 中与观察哈希对应的修订：`artifact-source-github-copilot-docs-cfgdir-8e729d408816/`、`artifact-source-github-copilot-docs-cmdref-0a0c815d00bb/`、`artifact-source-github-copilot-docs-hooks-ref-3b492ffdadfd/`；源码读取自 coordinator 固定的工作区 `ws-475c5ba9cfe9-029e429b-a315-4406-8d72-d8170be0ae29`（commit `475c5ba9cfe90fe06a673534296f28e62903565e`，baseline `6783c47bfd23f2b497808cc3b8d217560bdf19bf`）。

## 推翻已发布结论的变化（高影响）

1. **配置迁移语义**（`config.migration`）。changelog `475c5ba9` 第 15 行：`Read user settings only from ~/.copilot/settings.json; user-setting keys in ~/.copilot/config.json are ignored.`；配置目录参考页同一位置的说明也从“启动时自动迁移”改为“`config.json` 中的用户设置被忽略，该文件只保存内部状态（已安装插件、已信任文件夹）”。已发布 edition `github-copilot-cli-configuration-v3` 的“迁移与诊断”小节写的是自动迁移，属被新证据推翻的已发布步骤，必须新建 edition 改写，旧版保留。
2. **settings.json 校验失败的回落**（`config.diagnostics`）。同页删去“（仍会合并可识别的 `config.json` 值）”，v3 的对应表述失效。
3. **`copilot sandbox ca` 与 `--config-dir`**（`config.runtime`）。命令参考页删掉“`copilot sandbox ca` 不接受 `--config-dir`”的例外，改为与 CLI 其余部分一致；v3 的运行时覆盖小节写的是相反的例外。
4. **hooks 入口**（`hooks.entry`）。hooks 参考页新增“CLI 不再从 `~/.copilot/config.json` 读取 hooks”，与第 1 条同源。
5. **hooks 输出校验**（`hooks.output`）。同一小节新增两条规则：命令型/HTTP 型 hook 保持宽松（不支持的裁决字段与非对象输出被忽略，`reason` 仅在带非空 `block` 时生效）；SDK 回调输出在合并前严格校验，非法 `decision`、无 `block` 的 `reason`、无非空 `reason` 的 `block`、非对象输出都会使 subagent hook 失败。

## 新增但不改变既有机制的内容

`copilot config [KEY] [VALUE]` 与 “Using `copilot config`” 小节（默认读写用户设置文件，`--repo`／`--local` 指向 `.github/copilot/settings.json` 与 `.github/copilot/settings.local.json`，只接受仓库可覆盖的键；`--list`／`--json`／`--rm`／`--global`）。这是已登记三个设置文件作用域的非交互写入口，补进配置章节的来源/诊断小节，不新造配置字段。

## 按范围排除的同页变化

沙箱 host rules 与本地代理改写（含 “Sandbox settings are user-level or enterprise-managed” 一句）、`/sandbox` 对话框 Auth→Credentials 标签改名、托管 `permissions` 新增 `limitTo` 域边界、调试日志收集与预会话环境选择器、`/model` 表描述文字调整。这些条目不改变已登记的配置字段、路径、加载顺序或生效条件，按冻结任务的排除清单不写入章节。

## 变更产物

- 新 edition：`github-copilot-cli-configuration-v4`、`github-copilot-cli-hooks-v2`（v3/v1 原字节保留）。
- 新记录：3 个文档 artifact+snapshot、1 个 Git artifact+snapshot、10 个 reference。
- 选章：`registry/chapter-current.yaml` 的 configuration→v4、hooks→v2。

## Blocker

1. `source-github-copilot-docs-cli-concept` 仍 404。本轮已定位当前页面地址：旧的 `.md` 端点 `.../concepts/agents/copilot-cli/about-copilot-cli.md` 返回 404，旧页面地址（去 `.md`）重定向到 `https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli`，该路径的 `.md` 原始端点返回 200 与 markdown。但数据集校验强制 `registry/sources/<id>.url` 与该来源既有快照的 `requested_url` 相等，直接改 URL 会使既有快照报 `HASH_MISMATCH`；补一份新快照需要把新原件写入项目 `archive/`，超出 worker 的候选目录写权限。因此 registry 未改，连带修复步骤移交协调者：改 URL + 新建快照/原件 + 用新证据补回引用。
2. 本轮为高影响改写（新证据推翻已发布配置步骤 + 跨主题关键加载机制改变），`configuration` 与 `hooks` 新 edition 需独立 reviewer 后再发布；`review_status` 保持 `pending`。
## 独立复核第 1 轮（changes_requested）与修复

| 复核意见 | 处理 |
|---|---|
| `config.migration` 丢失版本边界：`changelog.md 15/15` 未包含 `## 1.0.93` 标题，v4 读起来像“所有版本都忽略 `config.json` 用户设置” | 引用定位扩为 `1-15`，摘录补上 `## 1.0.93 - 2026-10-07` 标题；正文改为“自 1.0.93 的 changelog 记录起”，并说明 1.0.93 之前文档记录的是自动迁移语义；文档页仍按来源级（未版本化）证据引用；`config.diagnostics` 的“不再回落到 `config.json`”同样标注 1.0.93；未建立任何版本映射 |
| 推翻句仍被列出：`configuration-migration-diagnostics` 的 source_refs 含 `ref-github-copilot-cfgdir-config` | 仅从该小节 source_refs 移除；引用文件本身及其在 `configuration-scope`、v1–v3 中的用途不变 |
| `ref-github-copilot-cmdref-config-command` 摘录非逐字 | 恢复完整句（含链接与 `Run copilot help config …`），正文无需改 |
| `hooks.entry` 引用未覆盖整句 | 句子拆分：hooksref 引用承担“不再从 `config.json` 读取 hooks”，`ref-github-copilot-cfgdir-config-internal-state` 承担“该文件只保存内部状态”，并加入 `hooks-entry-events` 的 section 与 `hooks.entry` 的 source_refs |

修复后 `pnpm maintenance:candidates check` 通过（exit 0）。`review_status` 仍为 `pending`，等待第 2 轮独立复核。
