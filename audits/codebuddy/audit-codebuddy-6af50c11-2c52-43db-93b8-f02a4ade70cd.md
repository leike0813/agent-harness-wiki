# codebuddy 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:04:27.600Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 configuration、skills 主题的 4 道固定问题。

## 变化的意义与证据边界

1 个 Git 仓库来源变更（10 个文件）、1 个 npm 来源版本自 2.172.1 前进到 2.175.0。

docs/env-vars.md 新增 CODEBUDDY_DISABLE_PARENT_MEMORY（设为 1 关闭项目指令文件越过启动目录向上递归查找，优先级高于 settings 项）；docs/settings.md 新增 parentDiscovery 设置（默认 true）与对应示例；docs/keybindings.md 把 app:redraw 与 Ctrl+L 拆为 app:clearScreen 与 app:redraw。

CHANGELOG.md 新增 104 行 2.175.0 条目，与已发布章节的行定位相交，需要按新提交重新核对。

本轮派发 configuration 的 config.sources/config.defaults/config.migration（项目指令文件向上递归查找的开关与优先级是已发布答案的直接内容）与 skills.loading（技能加载依赖的指令文件范围）。npm 版本前进属纯发布身份变化。

### 派发问题与证据入口

- `config.defaults`：本轮入口；见审计
- `config.migration`：本轮入口；见审计
- `config.sources`：本轮入口；见审计
- `skills.loading`：cited source file changed at the published locator；CHANGELOG.md (CHANGELOG.md:55-55)

## 待处理与独立复核

**审计记录：** `audits/codebuddy/audit-codebuddy-6af50c11-2c52-43db-93b8-f02a4ade70cd.yaml`。**待处理旧审计：** audit-codebuddy-9f90f95d-be63-48f2-9d75-f841bcaa2a8f、audit-codebuddy-b2f1e4d2-885e-474a-808f-950b78020684、audit-codebuddy-a717d490-f443-4c2d-bc06-21ce29a2f06a。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-codebuddy-docs` | 3d2d64bb9ad8 → ba31807f2809 | changed |
| `source-codebuddy-npm` | 2.172.1@sha5 → 2.175.0@sha5 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
