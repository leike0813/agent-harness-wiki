# minimax-code 巡检维护报告（audit-minimax-code-3d493871）

## 范围与固定来源

- 观察时间 `2026-11-24T14:09:42Z`；五份官方文档来源全部 `changed`，成立原因是文档主机从 `agent.minimax.io` 迁到 `code.minimax.io`（同 `/docs/cli/*.md` 路径），随后内容更新。
- 保留原件：每份文档的新鲜保留版本都是 `2026-09-30T17:03Z` 抓取的 `snapshot-minimax-code-docs-*`（features `a1230063`、configuration `9429573a`、reference `e35d9d1a`、security `a651d452`、faq `39fd1c25`）。观察文档首次缓存于 `2026-11-03T02:02Z`。
- 因此只能声明 **2026-09-30 → 2026-11-24** 窗口内的变化。更早的差异没有保留原件，本轮不作判断。
- 仓库来源 `3c21163` 与 npm `0.7.9` 的变化只记录身份：未下载包字节，不新增映射，也不据此断言任何已发布版本的行为。

## 先排除的非知识差异

| 差异 | 判定 |
| --- | --- |
| `agent.minimax.io` → `code.minimax.io`（`observation_url`） | 仅观察入口迁移；registry `url` 身份未改，页面内部链接仍写 `agent.minimax.io` |
| 去掉 `<div className="code-docs">` 包裹与整体缩进 | 渲染差异，features/configuration/reference/security 四页 |
| `<AccordionGroup>/<Accordion>` → `> [accordion]` 引用块 | faq 渲染差异 |
| reference 相对链接 → 绝对链接 | 渲染差异 |
| 标题 | 未变：features 仍是 “Features and configuration”，faq 仍是 “Troubleshooting”；保留原件已是这两个标题，本轮窗口不存在改题 |
| features 吸收 configuration 内容 | 未发生：保留原件中的 features 已含 providers/plugins/ACP 小节，本轮结构未变 |

## 实质变化与处理

### 1. Provider API 格式新增第四种（已维护）

三份页面同时出现同一语义变化：

- `configuration` “Custom providers”：列表新增 `google-generative-ai`（Google Gemini），并写明 “a Base URL with only the host gets `/v1beta` appended automatically”。
- `features` “Providers and models”：`--api-format` 取值改为四项，同样标注 Google Gemini。
- `reference` “Provider commands”：`provider add` 的 `--api-format` 枚举加入 `google-generative-ai`。

这推翻了已发布 `custom_providers v3` 的版本边界：v3 明确写“官方 CLI 文档仍只列三种……第四种只作来源级知识，不能据此断言任何已发布 npm 版本接受它”。本轮处理后：

- 新建 `snapshot-minimax-code-docs-features-20261124`（`84582d83`）与 `snapshot-minimax-code-docs-configuration-20261124`（`99bb8bf9`），pinned 观察 hash 与 `checked_at`；artifact 指向扫描已保留的原件。
- 新建 `ref-minimax-code-doc-feat-providers-20261124`、`ref-minimax-code-doc-custom-providers-20261124`。
- 新建完整 edition `minimax-code-cli-custom_providers-v4` 并切换 `registry/chapter-current.yaml`；改写该条为“文档与仓库 `da22f11` 允许列表在四种格式上已一致”，并补上 `/v1beta` 文档规则。
- 仍不建立软件版本映射：文档不含版本号，npm `0.7.9` 未验证。
- 旧 edition v3 与全部旧 snapshot/reference 字节未改动。

### 2. Computer Use 的界面边界改述（不建章节）

`features` “CLI and desktop boundaries”、`security` “Protocol boundaries”、`faq` “Sessions, terminals, and desktop boundaries” 一致改述：

- 交互式 TUI（macOS/Windows）可经确认选择官方插件使用 Computer Use；
- `mcode exec`、ACP、计划任务与 subtasks 不能控制计算机；
- 同一时间只允许一个桌面会话或 TUI 会话控制计算机（faq 新增 “computer is busy” 条目）；
- Browser、桌面面板与桌面快捷键仍属桌面应用，不在 CLI。

八类固定问题没有覆盖“按界面可用的桌面能力”，`configuration`、`custom_agents`、`native_plugins` 的现有章节也未陈述相反结论（custom_agents 只描述规范角色的工具过滤，不涉及计算机控制）。因此只记录为审计观察，不改任何章节选择；若后续要成稿，应作为新的产品专有问题提出。

### 3. `/provider` 用途文案（不建章节）

features 斜杠命令表把 `/provider` 从“查看 providers 或编辑 MiniMax 凭据”改为“查看 providers、删除第三方连接或编辑 MiniMax 凭据”。入口与作用域答案不变。

### 4. 命令名核对

`reference` 中 `mcode`、`mcode init`、`mcode exec`、`mcode acp`、`mcode login/logout`、`mcode provider *`、`mcode plugin *`、`mcode update` 命令块逐字未变；唯一变更是 `provider add` 的 `--api-format` 取值枚举。

## 逐主题结论

| 主题 | 结论 | 依据 |
| --- | --- | --- |
| custom_providers | 维护：新 edition v4 + 选择 | 格式枚举与 `/v1beta` 规则变化 |
| configuration | 不变 | layers/data directory/runtime settings/sign-in/proxy/skills+MCP/plugins/configuration checks 文本未变 |
| custom_agents | 不变 | slash 表除 `/provider` 文案外未变；agents 的模型/工具/上限语义无新证据 |
| native_plugins | 不变 | configuration “Plugins” 与 faq “ACP and plugins” 文本未变 |
| mcp / skills | 不变 | 引用的 `Configuration checks`、`Skills and MCP` 段落未变 |

## 候选与校验

- 候选：`/tmp/ahw-batch-3/candidates/minimax-code`
- 新增：2 artifact、2 snapshot、2 reference、1 chapter edition、1 audit 报告
- 修改：`registry/chapter-current.yaml`（custom_providers → v4）、新审计 YAML
- 校验：`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-3/candidates/minimax-code`（结果见返回）

## 复核与遗留

- 本轮没有推翻已发布的配置步骤，也没有无法由版本/分发/条件解释的来源冲突；变更是文档对既有仓库行为的追认，属普通更新，按作者自检 + 协调者复核记录 `reviewed`。
- `pending_audit_refs` 中的 6 份旧审计原文件未改动，本轮不关闭、不重开其 pending 问题。
