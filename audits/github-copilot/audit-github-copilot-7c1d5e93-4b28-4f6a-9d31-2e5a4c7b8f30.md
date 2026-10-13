# github-copilot 维护审计 · audit-github-copilot-7c1d5e93-4b28-4f6a-9d31-2e5a4c7b8f30

## 观察到的来源变化

| source_id | 基线 | 观察到 | 结果 |
|---|---|---|---|
| `source-github-copilot-repo` | `dcdc0273` | `a3f560ec` | changed（唯一变更文件 `changelog.md`，新增 1.0.96 段，+12 行） |
| `source-github-copilot-npm` | `1.0.95` | `1.0.96` | changed（仅发布身份） |
| `source-github-copilot-docs-cfgdir` | `8e729d40` | `b1bc2aed` | changed |
| `source-github-copilot-docs-cmdref` | `53380857` | `2f309f72` | changed |
| `source-github-copilot-docs-hooks-ref` | `3b492ffd` | `fdf139f8` | changed |
| `source-github-copilot-docs-cli-concept` | `d88b94d9` | — | blocked（HTTP 404，与 2026-10-09 同一阻塞） |

原件读取自项目 archive 中与观察哈希对应的修订：`artifact-source-github-copilot-docs-hooks-ref-fdf139f89138/`、
`…-cfgdir-b1bc2aed0c78/`、`…-cmdref-2f309f72d658/`；源码读取自协调者固定的工作区
`ws-a3f560eca2c0-44905b7b-2c83-4bca-8f3d-63f9bc69953a`（commit `a3f560eca2c03168a1730b162f859c15c72713e1`）。

## 语义 triage

### 1. hooks 参考页新增 “Agent-scoped hooks”（推翻已发布入口，属高影响）

新小节明确：在自定义 agent 的 frontmatter 里声明 `hooks` 事件映射，命令型或 HTTP 型 Hook **只在该 agent 被选中时**
运行，且叠加在会话、用户、仓库、插件与策略 Hook 之上。官方行为表给出：运行时名与别名都接受；`command` 是回退、
`windows`/`linux`/`osx` 按平台覆盖、路径从仓库根解析；子代理的作用域 `Stop`（`agentStop`）在 `SubagentStop`
触发，**连续 8 次作用域拦截之后后续拦截被忽略**；仓库来源与继承自上层 agent 的作用域 Hook 需要工作区准入，
禁用设置、企业限制与超时照常生效；**远程或组织托管的 agent 定义不运行作用域 Hook**。

已发布的 `github-copilot-cli-hooks-v2` 把 Hook 加载来源穷举为“策略→用户→仓库→插件”，没有 agent 作用域这一入口，
也没有 8 次作用域拦截上限与工作区准入条件，因此 `hooks.entry`、`hooks.order`、`hooks.conditions` 三题答案改变；
新建 `github-copilot-cli-hooks-v3`（v2 原字节保留）。

### 2. preToolUse 决策表补 autopilot 语义

`permissionDecision` 行新增：Copilot CLI 的 autopilot 模式下不弹提示，`"ask"` 被拒绝，agent 会看到 CLI 无法向用户
确认。这改变了 `hooks.output` 中“`ask` 只在 cloud agent 下按 deny 处理”的表述，同一 edition 内一并更新。

### 3. custom_agents：frontmatter 新增 `hooks`，且两页不一致

hooks 参考页描述了 frontmatter 的 `hooks` 字段，但命令参考页的 “Custom agent frontmatter fields” 表本轮**未新增**
`hooks` 行，共享的 `custom-agents-configuration` 页也未变。因此 `agents.format` 记录该字段形态与官方示例，同时明确
它目前只有单一来源、字段解析细节（是否受仓库可覆盖键限制、与 `disableAllHooks` 的交互）文档未写明，按 `partial`
处理，并交叉链接 hooks 主题。新建 `github-copilot-cli-custom_agents-v2`。

### 4. configuration：`inlineImages` 新键与 `forceRemoteSettingsRefresh` 语义收紧

用户设置表新增 `inlineImages`（`boolean`，默认 `true`，Kitty 图形协议，要求 Ghostty/kitty/WezTerm，禁用后显示文本
占位）→ `config.defaults`。托管键 `forceRemoteSettingsRefresh` 的描述从“缓存条目在拉取失败时仍作为回退保留”改为
“**缓存策略不能满足新鲜度要求；拉取失败时受影响操作保持受限，直到当前策略被确认**”→ `config.sources`，这是回退语义
的收紧，不是措辞修辞。命令参考页另改写 `/add-dir`（开启沙箱时授予目录沙箱访问）、`/model`（模型 ID 大小写不敏感、
保存规范 ID）、`/sandbox`（保存前提示环境密钥并可加 masking hosts）→ `config.sources` 与 `config.runtime`。
新建 `github-copilot-cli-configuration-v5`。

## 版本边界

- `/add-dir` 沙箱授予、`/model` 规范 ID、`/sandbox` 密钥提示三项在 1.0.96 changelog 逐条出现，按 **1.0.96** 记边界。
- `forceRemoteSettingsRefresh` 的 fail-closed 取向可追到 **1.0.81** changelog 条目，作为交叉参照。
- **范围说明（非行号证据）**：agent-scoped hooks 与 `inlineImages` 键在截至 1.0.96 的 changelog 快照中通读未见对应条目；这是整份 `changelog.md` 的通读结论，不由某一小段行号引用承载，正文按此写成范围说明，不作被引证据。`inlineImages` 另有一条可追溯记录：1.0.64（2026-06-23）的 "Add inline image rendering in the CLI"（`changelog.md:1066`），说明行内图片渲染能力随该版本落地，但设置键名未被点名。两者都只按来源级记录，未建立键名级别的版本映射。

## 排除与无知识影响

- 仓库单提交 `a3f560e` 只改 `changelog.md`（`git diff --stat` 为 1 file / +12），源码无语义变化；它在本轮的作用是
  提供上述 1.0.96 / 1.0.81 的版本边界证据。
- npm `1.0.95 → 1.0.96` 只是 registry 发布身份变化，新版本仍未验证。
- 上一轮已结案的其余同页变化（沙箱 host rules、`/sandbox` Auth→Credentials 标签、托管 `permissions` 的 `limitTo`、
  调试日志收集等）本轮无再变化，不重开。

## Blocker

`source-github-copilot-docs-cli-concept` 仍 404。与 2026-10-09 审计（`audit-github-copilot-f19a14af…`）记录的阻塞
完全一致且无新证据，本轮**未重复探测**，保留上次成功 baseline `d88b94d9` 与 pending 状态。修复步骤与上一轮相同，
需协调者改 `registry/sources` 的 URL 并新建快照/原件（超出 worker 的候选目录写权限）。

## 复核状态

`review_status: pending`。本轮 hooks / custom_agents / configuration 的新 edition 属高影响改写（新入口改变已发布的
Hook 入口与配置回退语义），加上 2026-10-09 审计遗留的复核链尚未完成，相关问题继续 pending，不以作者自审替代独立
复核。作者已完成候选自检（`maintenance:candidates check` 通过），独立 reviewer 结论仍缺。