# antigravity 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:04:01.076Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 skills、hooks、configuration 主题的 8 道固定问题。

## 变化的意义与证据边界

11 个官方文档来源变更、1 个 Git 仓库变更（仅 CHANGELOG.md 新增 1.4.7 条目）、1 个来源阻塞（source-agy-install-doc）。

CHANGELOG 1.4.7 明确写出三项可能改变已发布答案的内容：hook 命令 stdin 新增 lastUserInput 字段；skills、rules、custom agents、plugins、plugin MCP servers 与 hooks 在 AGY_ADC_AUTH 登录时曾不加载（已修复）；MCP 按需加载的工具返回上限由 4 KB 改为 10 KB。

其中 skills 与 plugins 的加载条件（hooks.events、skills.conditions 一类）、hook stdin 载荷（hooks.input）、以及按需 MCP 工具返回上限（mcp.lifecycle）都直接落在已发布答案上，需要逐条核对当前文档表述，不能只按 CHANGELOG 一行改写。

本轮只派发受 CHANGELOG 明确点名、且已发布章节引用了该机制的固定问题；source-agy-install-doc 的阻塞保持 pending，不据此改写章节。

### 派发问题与证据入口

- `skills.discovery`：cited source file changed at the published locator；CHANGELOG.md (CHANGELOG.md:37-37)
- `skills.extensions`：cited source file changed at the published locator；CHANGELOG.md (CHANGELOG.md:37-37)
- `skills.invocation`：cited source file changed at the published locator；CHANGELOG.md (CHANGELOG.md:19-19)
- `skills.roots`：cited source file changed at the published locator；CHANGELOG.md (CHANGELOG.md:18-18)
- `hooks.events`：本轮入口；见审计
- `hooks.entry`：本轮入口；见审计
- `config.defaults`：cited source file changed at the published locator；CHANGELOG.md (CHANGELOG.md:9-9)
- `config.sources`：cited source file changed at the published locator；CHANGELOG.md (CHANGELOG.md:18-18)

## 待处理与独立复核

**审计记录：** `audits/antigravity/audit-antigravity-b4b42a62-073e-4ea5-a425-66ed783d591c.yaml`。**待处理旧审计：** audit-antigravity-37963c6d-36f9-4f2f-b6df-aa68cabd8089、audit-antigravity-20261004t061205z、audit-antigravity-f0c2b3af-0175-48ad-bfc9-79007af32fdf、audit-antigravity-20261006t134000z、audit-antigravity-71e51770-0888-4ac4-9142-bce409594c5f、audit-antigravity-2d27bace-9e71-4e47-bfa4-f0d9d852e1e4、audit-antigravity-67652ea2-c1f2-4152-b06d-3d06ec9a33cc、audit-antigravity-5aa78882-77cd-4003-b03d-e1e8a91a2fdf、audit-antigravity-d3b9227e-699f-4e2d-ae81-46e75b6dc35c。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-agy-slash-commands-doc` | 522efb66e8e4 → 2d380e4ff725 | changed |
| `source-agy-mcp-doc` | 305e9fefde36 → e0bcc7541733 | changed |
| `source-agy-hooks-doc` | 9b7d616282f5 → a37e4c8295a3 | changed |
| `source-agy-agent-settings-doc` | a2e6c9da66ea → a52fead8178e | changed |
| `source-agy-install-doc` | 4c15c3264cbb → 未取得 | blocked：HTTP source returned 404. |
| `source-agy-models-doc` | 3d1799ea108e → dbee18120808 | changed |
| `source-agy-settings-doc` | ccac09bc6e37 → 76f4456de09b | changed |
| `source-agy-rules-doc` | f3dbec7233fa → 6aa5f4e08135 | changed |
| `source-agy-permissions-doc` | 8c9b312ccc7e → 1b39ca654688 | changed |
| `source-agy-sandbox-doc` | 84e5a2fb2496 → 8dbf64909bd0 | changed |
| `source-agy-cli-reference-doc` | d8e42327e8ac → af4bbbb33965 | changed |
| `source-agy-cli-troubleshooting-doc` | 02c17bfb3ff9 → 9517e70702c4 | changed |
| `source-agy-repo` | 902d212319e3 → bf1e6e6d4a05 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
