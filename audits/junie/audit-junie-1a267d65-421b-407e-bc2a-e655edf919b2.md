# junie 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:05:37.269Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 custom_agents、configuration、skills、mcp 主题的 29 道固定问题。

## 变化的意义与证据边界

20 个官方文档来源变更（该站以 HTML 提供，正文按标签剥离后比较，全部 20 页均有实质新增）、1 个 Git 仓库来源变更（9 个文件，已发布引用未被其行定位命中）。

页面级实质变化：docs/quickstart 新增 Early Access Program 入口并改写可用版本限制；docs/config 与 docs/env 的版本要求由 14/01 改为 23；docs/params 新增 --max-steps 及其与 MAX_STEPS 环境变量的优先级；docs/subagents 等页面有 frontmatter 与字段相关改写。

已发布章节的引用以 document_section 定位这些页面，且 frontmatter 字段、文件位置、配置来源与参数优先级都是已发布答案的直接内容。

本轮派发 custom_agents、configuration、skills、mcp 四个主题的相关固定问题，由 worker 按新页面重新定位并逐题判断结论是否变化。

## 待处理与独立复核

**审计记录：** `audits/junie/audit-junie-1a267d65-421b-407e-bc2a-e655edf919b2.yaml`。**待处理旧审计：** audit-junie-1072e035-c529-4b1e-93bf-4651d667a6ff。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-junie-repo` | 9f8a9fd66d72 → a355f2dcda40 | changed |
| `source-junie-docs-quickstart` | 5feb2b57b12d → 087e32ebd0ef | changed |
| `source-junie-docs-config` | 4ba170874af4 → 18977403624f | changed |
| `source-junie-docs-env` | dd868ae1aea0 → dc7146712333 | changed |
| `source-junie-docs-params` | 1426f65c0402 → 8434f814d9eb | changed |
| `source-junie-docs-guidelines` | 32afafe337c3 → b6afffecf68a | changed |
| `source-junie-docs-skills` | faad637c2121 → b3c676900e3d | changed |
| `source-junie-docs-mcp` | 5f5832413b2e → d633a20cb2a9 | changed |
| `source-junie-docs-subagents` | b943b43899bc → 5690773f210e | changed |
| `source-junie-docs-hooks` | a947ad8a2c06 → 6ef4b8eae242 | changed |
| `source-junie-docs-allowlist` | c79bad9ba5ec → c36bfaa872f4 | changed |
| `source-junie-docs-extensions` | 6be41aa79e9d → 6e9193c421ff | changed |
| `source-junie-docs-commands` | 9247d36e8ac4 → 45e930f5e1f2 | changed |
| `source-junie-docs-acp` | 1250879f32ab → 625beac41fd1 | changed |
| `source-junie-docs-custom-models` | 59c3da09d680 → 9accab4c224b | changed |
| `source-junie-docs-model-selection` | bc25abd0c0b7 → e9a8e1d7e548 | changed |
| `source-junie-docs-byok` | 5694eeb4f93d → ab7c91d2d668 | changed |
| `source-junie-docs-byok-copilot` | 9f1111f62db0 → 53424aea2116 | changed |
| `source-junie-docs-proxies` | 1cc6b68bda9a → bb7cf31d3d22 | changed |
| `source-junie-docs-litellm` | e6502274e177 → e9058f50704f | changed |
| `source-junie-docs-ollama` | 228d501e94ee → 29166e9374a6 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
