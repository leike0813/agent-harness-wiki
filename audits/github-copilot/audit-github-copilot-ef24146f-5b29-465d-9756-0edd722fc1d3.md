# github-copilot 上游巡检 2026-10-14

- 审计：`audit-github-copilot-ef24146f-5b29-465d-9756-0edd722fc1d3`
- 结论：`blocked`，未派发 maintenance
- 观察：`official_documentation` 来源本轮检查失败（无镜像、归档或已 pin 的替代入口）

## 来源身份

| 来源 | 变化 |
|---|---|
| source-github-copilot-repo | `a3f560eca2c0` → `76c3172eb38f` |
| source-github-copilot-npm | `1.0.96` → `1.0.97`（integrity 同步变化，正常发布身份） |
| official_documentation | `blocked`，保留上次成功 baseline |

## 语义 triage

Git 区间 `a3f560ec..76c3172e` 只有 `changelog.md` 一个文件，不触及任何已录配置或机制入口。
npm 的版本跳变只是发布身份，未固定也未比较包内容，不能据此推断已发布章节结论。

文档侧无可用原件，本轮既不能确认也不能排除语义变化，因此不给出 `reviewed_no_impact` 结论。

## 未解决项

保留上次成功 baseline 与既有 pending 问题。同一阻塞没有新证据，不重复派发相同探查。

## 恢复条件

需要以下任一可执行入口：镜像站点、上游仓库内的文档副本，或针对已引用页面的已 pin 证据。
