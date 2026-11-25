# command-code 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:04:36.223Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 custom_agents、configuration、mcp 主题的 22 道固定问题。

## 变化的意义与证据边界

18 个官方文档来源变更（该站以 HTML 提供，正文按标签剥离后比较）、1 个 npm 来源版本自 1.87.1 前进到 1.88.0。

按正文文本比较：16 个页面有实质新增。docs/agents、docs/byok、docs/context、docs/headless 等页面新增 Artifacts、Extensions、Cloud、Actions、Authentication、Early Access Program 等入口；docs/headless 单独新增 90 个词，涉及 own machine、login、once、reuse login 等机制表述。

本产品的已发布章节引用这些页面（agents 系列与 configuration、mcp 系列均以 document_section 定位），因此页面新增机制直接落在已发布答案上。

本轮派发 custom_agents、configuration、mcp 三个主题的全部相关固定问题，由 worker 逐页核对新增入口是否改变已发布答案；npm 版本前进属纯发布身份变化。

## 待处理与独立复核

**审计记录：** `audits/command-code/audit-command-code-3b6b4b85-0a95-454f-9a92-bca9c8f65900.yaml`。**待处理旧审计：** audit-command-code-de61b740-0976-43a0-9f80-106ac8f37706、audit-command-code-613f0cb0-0a11-4a83-a216-02a31b79c345、audit-command-code-89f93372-a6b1-4938-83a4-738cbe8017c5、audit-command-code-7b51087b-3d6d-4e39-80a2-9ca8ef1e3944。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-command-code-docs-agents` | 124060480d57 → d028c8e062a3 | changed |
| `source-command-code-docs-byok` | 134c34f4cbca → 7e41ee145e7f | changed |
| `source-command-code-docs-context` | 21a0a8138c64 → 1104a6f4672f | changed |
| `source-command-code-docs-headless` | 6c51f0b02ab5 → dc0f0a1c821f | changed |
| `source-command-code-docs-hooks` | 335505aed8e8 → 21dea922b652 | changed |
| `source-command-code-docs-import` | e07f9c71bdba → cf9c2a137a69 | changed |
| `source-command-code-docs-mcp` | ebfb96610ded → f2afb16d69c9 | changed |
| `source-command-code-docs-memory` | e6e2fae73da4 → ea41a2ac0112 | changed |
| `source-command-code-docs-mods` | 14e4c167d85f → 71bc97881a3b | changed |
| `source-command-code-docs-permissions` | 5d2df129e048 → af9349c24efe | changed |
| `source-command-code-docs-provider` | d4bef0bd978d → 5b419661fffe | changed |
| `source-command-code-docs-reference-cli` | 1e43ca66fc66 → fd9f23b784b4 | changed |
| `source-command-code-docs-reference-slash-commands` | 6dda621bd7e2 → 2532dddba780 | changed |
| `source-command-code-docs-resource-security` | 3531b870a926 → c005814418f2 | changed |
| `source-command-code-docs-settings` | 89c473c6aa43 → fc51553f9488 | changed |
| `source-command-code-docs-skills` | 04ca38f9bfd7 → e92bef8d8b69 | changed |
| `source-command-code-docs-troubleshooting-common-issues` | 8603db5a13e9 → 35e289f4237b | changed |
| `source-command-code-docs-troubleshooting-telemetry` | 9a921b13fb93 → 10f98722836b | changed |
| `source-command-code-npm` | 1.87.1@sha51 → 1.88.0@sha51 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
