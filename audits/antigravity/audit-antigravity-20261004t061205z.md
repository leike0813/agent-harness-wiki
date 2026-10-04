# Antigravity 上游巡检报告 · 2026-10-04

- 审计记录：`audit-antigravity-20261004t061205z`（status `changed`，review_status `pending`）
- 本轮观察：20 个登记来源，其中 1 个非 unchanged
- 协调者语义 triage：限定调查（narrow_investigation）
- 交付方式：`delivery=pr`，本轮不切换本地发布指针、不更新受管二进制

## 来源身份变化

| 来源 | 类型 | 状态 | 基线 | 本轮观察 |
| --- | --- | --- | --- | --- |
| `source-agy-install-doc` | official_documentation | changed | `403673e1e5a8d781c7aa6b4adb624833fb24eae9c87f…` | `322c3ee907924d9e0b4ff4fd6927ba33779aabd65e3c…` |

## 语义 triage 与理由

### configuration

受影响固定问题：`config.sources`、`config.overrides`、`config.runtime`、`config.trust`、`config.defaults`、`config.migration`、`config.diagnostics`

关联小节：`config-sources`、`config-overrides`、`config-runtime`、`config-trust`、`config-defaults`、`config-migration`、`config-diagnostics`

source-agy-install-doc 内容哈希变化，需限定到安装位置与配置来源相关问题复查。

**本轮核实结论：七道固定问题的答案都没有变化，configuration 不需要改章节。** 当前选中的 `antigravity-cli-configuration-v3` 保持不变，本轮不新建章节版本，也不改写任何已发布引用。

核实方式与结果：

- 抓取到的 `install.md` 内容 sha256 为 `322c3ee9…`，与本轮扫描观察值逐字节一致，因此比对对象确定就是扫描当时看到的内容。
- 本入口被标记的面就是章内引用该页的全部来源，共 6 条，与 `impacts` 标记的 `source_refs` 完全对应。逐条核对后 5 条仍逐字命中当前页面，6 条的 `heading` 全部存在。已发布摘录整体仍与当前页面一致。
- 唯一漂移的 `ref-agy-configuration-install-api-key` 是纯措辞改写：`you have to` 改为 `you must`，并删去句首的 `Only`。命题本身逐字等价——须同时设置 provider 与带密钥的环境变量，单独设 `GEMINI_API_KEY` 没有作用——`config.runtime` 的答案不受影响。
- 页面其余内容与已发布结论一致，没有相互矛盾之处：钥匙串凭据与 SSH 手动码登录流程、安装脚本的 `--skip-path` 与 `--skip-aliases`、`GEMINI_API_KEY` 的三条排障行、`settings.json` 里 `modelProvider` 的键名与 `gemini` 取值，在当前页面上都能找到对应。章内其它小节依赖的来源本轮全部 unchanged。

两点必须写明的边界：

- **本轮没有可用的基线原件。** `archive/antigravity/` 不存在，快照 `snapshot-agy-install-doc` 记录的 `0706cc98…` 还早于本轮基线 `403673e1…`。所以无法逐行 diff，本轮不把当前页面上的任何内容判为「本轮新增」或「本轮删除」的事实。
- **官方页未标注适用版本。** 上述核实只能支持「当前页面与已发布结论一致」，不能用来证明任何精确版本的行为，因此不建立任何版本映射。

观察到但未采纳的内容：当前页面还有一些与配置相邻、章内尚未收录的材料（钥匙串小节的平台与静默登录细节、installer flags、另外三行 `modelProvider` 排障、shell profile 持久化示例、会话终止时清理本地缓存目录）。由于无基线原件可归因，按不新增事实处理，留给专门的重锚轮次。

## 调查记录

- 本轮协调者语义 triage 结论：narrow_investigation。已交回隔离候选做定向维护。
- 本轮 antigravity 仍带 1 条未结案审计；安装文档变化可能与之相关，一并交回，但只交回本入口。
- 旧审计 `audit-antigravity-37963c6d-36f9-4f2f-b6df-aa68cabd8089` **保持 `pending`**。本轮变化不构成可执行的重锚入口：install.md 没有基线原件可比对，待重锚的引用横跨 19 个页面，而本轮观察到的漂移与上一轮已记录的「文档站整体改写」是同一类——标题与小节行文被改写，机制描述未变。已发布引用本轮一律未改写。
- `pending_question_ids` 本轮未改动。七道 configuration 固定问题仍待处理，但原因是上一轮记录的整批引用重锚工作，与本轮变化是否影响答案无关；其中的 `custom_providers` 条目不在本入口范围，未触碰。

## 候选与复核

本产品已交回隔离候选做定向维护；候选只允许编辑本产品的 `knowledge/`、`audits/` 与本产品来源登记，逐产品 `check` 通过后由协调者生成合并计划。高影响结论按维护契约另行独立复核。

本轮候选只改动本产品的审计记录（`impacts` 的理由补上核实结论，`investigation_notes` 记录核实过程与边界），未新增章节版本、未改 `registry/chapter-current.yaml`、未改写任何已发布引用，也未登记新的原件。逐产品 `check` 已通过。
