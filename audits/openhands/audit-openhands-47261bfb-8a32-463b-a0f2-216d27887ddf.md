# OpenHands 增量维护报告 · 2026-10-22（审计 `audit-openhands-47261bfb-8a32-463b-a0f2-216d27887ddf`）

## 结论

本轮范围是 `configuration`、`custom_providers`、`hooks`、`native_plugins` 四个主题的九道固定问题（`config.defaults`、`config.migration`、`providers.diagnostics`、`hooks.events`、`hooks.output`、`plugins.model`、`plugins.install`、`plugins.api`、`plugins.lifecycle`）。九题的已发布答案对各自声明的固定来源**仍成立**：本轮没有新建章节 edition、没有新增或修改 reference / snapshot / artifact / mapping，`registry/chapter-current.yaml` 未变。coordinator 写入的四条 impacts 已逐题核对并改写为实际结论，`pending_question_ids` 清空。

## 来源身份与本轮增量

| 来源 | baseline → observed | triage |
| --- | --- | --- |
| `source-openhands-cli-repo` | `0403f1a`（unchanged） | 已发布章节的 CLI 固定来源是更早的 `954f2ba` 快照；本轮未移动，未取用 |
| `source-openhands-repo`（Agent Canvas） | `71427af5` → `9508e72` | reviewed_no_impact：522 文件均为画端前端/electron/测试/文档；README 只改 docker tag `1.27.1→1.30.1`，被引的 “Repository boundaries” 段未变，CLI 章节无对应 source_ref |
| `source-openhands-sdk-repo` | `95cb37b7` → `b3d93b6`（`openhands-sdk` 1.57.0） | reviewed_no_impact（版本边界外，见下） |
| `source-openhands-npm`（`@openhands/agent-canvas`） | `1.27.1` → `1.30.1` | 仅发布身份，CLI 章节不消费该包，不建映射 |
| 20 个官方文档来源 | 全部 changed | 绝大多数为 Mintlify MDX→Markdown 重渲染，逐节归一等价；4 处真实语义变化均不影响九题（见下） |

固定来源（已发布章节自述）：CLI 仓库 `954f2ba`（包 `openhands` 1.16.0）+ `openhands-sdk==1.28.1`（提交 `edaac806`）+ 各文档快照。

### 版本边界

`ref-openhands-cli-pyproject` 的 pyproject 摘录把依赖精确写死为 `openhands-sdk==1.28.1`，audit-openhands-8f8b8fd5 曾以 `git ls-remote` 核实 `refs/tags/v1.28.1` 即 `edaac806`。本轮 pinned SDK 工作区在 `b3d93b6`（1.57.0），不被任何固定版本映射覆盖，CLI 1.16.0 也不会加载它。因此 SDK HEAD 的机制变化按 source-level knowledge 记录、不改写章节：

- `settings/model.py`：`AGENT_SETTINGS_SCHEMA_VERSION` 8→9，新增 v8→v9 迁移与 `_reject_removed_settings_input`（对 `enable_sub_agents`/`enable_switch_llm_tool`、acp 的 `llm` 直接报错）；
- `llm/llm.py`：默认 `model` 由 `gpt-5.5` 改为 `gpt-5.6`；
- `hooks/conversation_hooks.py`：SessionStart 的 `additional_context` 改为收集后延到系统提示之后注入；
- 插件：新增 `plugin/paths.py`（按 resolved ref 的不可变缓存）、`plugin/strict_fetch.py`，`extensions/installation/manager.py` 增加 `_install`/`_load_fetched`/`root_name`。

## 文档来源语义 triage

20 页 changed 中，`docs/sdk-hooks`、`docs/sdk-plugins`、`docs/plugins`、`docs/agent-plugins`、`docs/config-options`、`docs/llm-settings`、`docs/agent-settings`、`docs/agent-file-based`、`docs/cli-installation`、`docs/cli-mcp-servers` 的差异是渲染层（`<Note>/<Warning>` → `[!NOTE]/[!WARNING]`、`<Steps>/<Tabs>/<CardGroup>/<Accordion>` → 标题与引用卡片、`LLM\_API\_KEY` → `LLM_API_KEY`、`export const path_to_script_*` 移除、模板代码块展开）。逐节归一化比对后的真实语义变化只有四处：

1. `docs/openhands/usage/environment-variables.md` 改标题为 **Archived Environment Variables Reference**，新增警告：该页为原 Python monorepo 汇集、不再是对当前 Canvas/SDK 发行的完整或已核实参考，并移除 Canvas Docker 会话运行时变量表改为指向 Canvas Development。
2. `docs/openhands/usage/llms/custom-llm-configs.md` 改标题为 **Legacy Custom LLM Configurations** 并加同类警告，指向 Canvas LLM Profiles 与 SDK LLM Profile Store。
3. `docs/openhands/usage/customization/hooks.md` 的 Quick Start 重写：`hooks.json` 位于会话工作目录本身、OpenHands 不向上搜索父目录，并补 Claude Code 兼容差异（文件位置、工具名）。
4. `docs/overview/plugins.md` 的 MCP 示例由 `uvx mcp-server-github` 换成 `docker ghcr.io/github-mcp-server`（示例级）。

## 逐题结论

| 问题 | 状态 | 结论与证据 |
| --- | --- | --- |
| `config.defaults` | answered（不变） | SDK 默认值取自固定快照 `edaac806`；Windows→WSL 要求在重写后的安装页仍以 NOTE 保留（`Installation Methods`）；CLI 侧默认值来自未变的 CLI 快照。 |
| `config.migration` | answered（不变） | pre-1.0.0 重做设置（`cli/installation`）、TOML→JSON（`cli/mcp-servers`）、`Deprecated Variables` 小节（归档后的 env-vars 页仍在）、`Need legacy options?`（`configuration-options`）逐条仍在；SDK 迁移链 v0→v4 属固定快照。 |
| `providers.diagnostics` | partial（不变） | `OH_PERSISTENCE_DIR` 仍由当前 V1 页 `configuration-options` 的 “Common V1 environment variables” 记录，命名约定小节仍在归档页内，目录不一致诊断结论不变。 |
| `hooks.events` | answered（不变） | 两页 `Hook Types` 表逐字未变（六事件、可阻断列一致）；HEAD 的 `HookEventType`/`HOOK_EVENT_FIELDS` 亦仍是同一组六事件。 |
| `hooks.output` | answered（不变） | hooks 页 `Output` 与 sdk-hooks 页 `Exit Codes` 仅把 `<Warning>` 换成 `[!WARNING]`；退出码 0/2/其它与 `decision`/`reason`/`additionalContext`/`continue` 语义不变。 |
| `plugins.model` | answered（不变） | `What Are Plugins?`、`Plugins vs Skills` 归一等价；根清单 Agent Plugins 格式「1.49.2 起」的版本说明未变，与固定快照 1.28.1 的差别结论一致。 |
| `plugins.install` | partial（不变） | `Using Plugins`/`Plugin Sources`/`Installing Plugins` 仍以 `~/.openhands/config.toml [plugins]` 与 `openhands --plugin` 描述 CLI 入口，与固定 CLI 源码的差别结论继续成立。 |
| `plugins.api` | partial（不变） | `Plugin Components Explained` 组件集合不变（MCP 示例换镜像属示例级）；`How OpenHands Picks the Format` 逐字未变。 |
| `plugins.lifecycle` | partial（不变） | `Installing Plugins to Persistent Storage` 与 `Installed Plugin Lifecycle` 归一化差异为 0。 |

## 引用处理

全部已发布引用继续绑定原 snapshot（保留副本仍在项目 `archive/`），逐节比对仍支持原结论；按数据模型「已发布引用保持不变，新原件用新引用 id」，本轮不新增引用。triage 提到的「行定位不再命中」源于已发布 locator 绑定 `edaac806`/`954f2ba` 快照，而本轮对照的是 `b3d93b6`/`9508e72` 与重渲染后的页面，属版本/渲染漂移，不是知识变化。`edaac806` 不在本轮浅克隆工作区内，无法逐字节复核该快照，结论以快照不可变性与发布时核验为依据。

## 越界观察（本轮不改写，供后续派发）

- `docs/environment-variables` 的归档状态削弱配置章 `config-runtime` 的“环境变量通用规则与完整清单在官方参考页”表述（该页已自称不完整且未针对当前发行核实），并影响 `config-diagnostics` 对 `env-naming` 的依赖。两者均不在本轮九题内。
- `docs/custom-llm-configs` 的 Legacy 标注与 `custom_providers` 章 `providers-protocol` 既有“旧版应用路径”表述一致，反而加强。

## 台账与自检

- 本审计引用的三个待处理审计（`72fdbc68`、`9af885fb`、`e6a9b08b`）`pending_question_ids` 均为空；按派发要求保留 `pending_audit_refs` 原样并标 `reviewed`，关闭它们仍是 coordinator 的决定。`e6a9b08b` 建议的 skills/custom_agents 派发本轮未执行（不在本轮固定范围）。
- 限制：CLI 仓库本轮 unchanged 且未 pin 工作区，其 `0403f1a` 的依赖 pin 无法在本轮复核；主仓与 SDK 仅按文件实际内容核对，未做发行包字节比较。
- `pnpm -s maintenance:candidates check --candidate <candidate root>` 通过（exit 0，无 diagnostics）。
