# OpenHands 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮 25 个登记来源里 23 个发生变化：SDK 源码从 v1.28.1 推进到 v1.51.0，Agent Canvas 仓库也有 110 个文件变动，21 个官方文档页内容 hash 全部变化。变化本身很大，但**没有一条落到已发布章节上**，因此本轮不改写任何正文、不新建 edition。

原因是一条可核实的版本边界：OpenHands 的七个已发布章节只回答 `surface_id: cli`，其来源范围明确写死为 CLI 仓库 `954f2ba6`（包 `openhands` 1.16.0）与 SDK `edaac806`。CLI 仓库本轮 unchanged，其 `pyproject.toml` 仍以 `openhands-sdk==1.28.1` 精确固定依赖；`git ls-remote` 核实 `refs/tags/v1.28.1` 正是 `edaac806`。也就是说，SDK 上游那 1165 个文件的变动，CLI 1.16.0 一个都吃不到。

最值得知道的一点是文档漂移：文档站已经整体转向 1.51.0 及更新版本的行为。`overview/skills/path` 本轮扩充成完整的 path-triggered rules 说明，而 `PathTrigger` 确实在 1.51.0 里实现了——只是不在 CLI 锁定的 1.28.1 里。v1 早就把这条记成"文档有、CLI 不生效"的版本差别，本轮核实该结论继续成立。

## 变化的意义与证据边界

### SDK 上游改写了 Skills 加载与插件/MCP 子系统，但都不在 CLI 的固定版本内

树对比（浅克隆，`git diff` 树比较有效）：SDK 全仓 1165 文件 / +217468 / -18469，Python 包内 221 文件 / +27200 / -4724。影响 `skills.loading`、`plugins.*`、`mcp.*` 的具体变化：

- `context/prompts/templates/system_message_suffix.j2`（`skills-loading` 引用的系统提示拼装模板）与 `context/skills/__init__.py` 在上游被**删除**，提示子系统改为 `context/prompts/` 下的 registry + sections 结构。
- 新增 `skills/trigger.py` 的 `PathTrigger`、`plugin/format/`（`claude_code.py`、`agent_plugins.py` 互操作格式与 JSON Schema）、`mcp/config.py`、`mcp/oauth.py`、`profiles/agent_profile_store.py`、`subagent/scope.py`。

反查确认这些在 `edaac806`（v1.28.1）中**均不存在**。被 77 条引用覆盖的 38 个 SDK 文件里 35 个在上游有改动，但全部引用都绑定在 `v1.28.1` 快照上，该快照 38 个文件一个不缺。`hooks/config.py`、`executor.py`、`manager.py` 与 `llm/` 的改动同理：`hooks.*` 与 `providers.*` 的已发布描述固定在 1.28.1，未被推翻，也没有据此制造任何版本映射。

仍缺的部分写明：文档快照的 `version_applicability` 是 `unknown`，按规则不参与精确版本验证，因此文档侧的"Claude Code 兼容性"等新表述不足以推翻已发布结论，只能按版本边界并列保留。

### 已发布证据基线整体复核通过

- 92 条官方文档引用摘录在本轮重新抓取的 21 个文档候选中**逐条原样存在，0 条失配**；全部 `document_section` 定位标题仍存在。
- 作为旁证的 Canvas 侧 `src/utils/skill-scope.ts` 与 `README.md` 在 `1ec86616→a6bba78f` 区间未被改动，摘录仍成立。
- CLI 仓库 unchanged，提交不可变，其 33 条 `file_lines` 与 4 条 `document_section` 引用天然有效。

结论覆盖全部 53 道固定问题（7 个主题），无一被新证据推翻，也无需新增证据。

### 留给维护者的范围观察（不阻塞本轮）

21 个官方文档快照都登记 `surface: cli`，但该文档站越来越多描述的是 Canvas/SDK 界面而非 CLI。是否调整这些快照的界面归属、或为 Canvas 界面单独立章，属于产品范围决定，本轮**未单方面改写任何已发布的来源归属**，仅记录供决策。

方法学限制：两个源码工作区为浅克隆，树对比结论有效，但 `rev-list` 计数与 `--is-ancestor` 祖先关系不可靠，故本审计不含提交条数或标签祖先关系断言；`v1.51.0` 标签指向 `a955aa5`，与观察到的 HEAD `08af1d5a` 的关系未予认定。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `openhands-cli-configuration-v1` | 7 题：全部维持 v1 既有状态 | 保留旧版本；SDK 版本边界未变 |
| custom_agents | `openhands-cli-custom_agents-v1` | 7 题：维持 v1 既有状态 | 保留旧版本；上游 `subagent/scope.py` 不在 1.28.1 |
| custom_providers | `openhands-cli-custom_providers-v1` | 9 题：维持 v1 既有状态 | 保留旧版本；上游 `llm/` 改动不在 1.28.1 |
| hooks | `openhands-cli-hooks-v1` | 7 题：维持 v1 既有状态 | 保留旧版本；文档新表述按版本边界并列 |
| mcp | `openhands-cli-mcp-v1` | 8 题：维持 v1 既有状态 | 保留旧版本；上游 `mcp/config.py`、`oauth.py` 不在 1.28.1 |
| native_plugins | `openhands-cli-native_plugins-v1` | 7 题：维持 v1 既有状态 | 保留旧版本；上游 `plugin/format/` 不在 1.28.1 |
| skills | `openhands-cli-skills-v1` | 9 题：维持 v1 既有状态 | 保留旧版本；`PathTrigger` 在 1.51.0 有、1.28.1 无 |

**发布：** 仅结案审计——无读者可见的章节、来源定位或版本映射变化，未运行 `ahw publish`／`chapters:update`。`registry/chapter-current.yaml` 未改动，七个 v1 edition 仍是当前版本，建议维持。**受管二进制：** `delivery=pr` 轮次未触发，不做受管二进制核对。

## 待处理与独立复核

**审计记录：** [audit-openhands-8f8b8fd5-afc9-4c73-984a-17925d504fab.yaml](audit-openhands-8f8b8fd5-afc9-4c73-984a-17925d504fab.yaml)。**待处理旧审计：** 无（此前无 openhands 审计记录）。**待复核问题：** 无——三个触发条件均未命中：文档与源码的张力已由版本／分发差异解释；没有新来源推翻已发布的配置步骤（92/92 摘录复核通过）；跨主题加载机制虽在上游重写，但已发布范围（CLI 1.16.0 + SDK 1.28.1）未变，无新内容进入发布。本会话无原生 subagent 委派入口，若后续把"文档快照 `surface: cli` 归属"升级为实际改写，则须先委派只读 verifier 复核。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-openhands-cli-repo` | `954f2ba6` → `954f2ba6` | unchanged；CLI 1.16.0 固定 `openhands-sdk==1.28.1`，是本轮全部版本边界判断的基准 |
| `source-openhands-sdk-repo` | `edaac806`（v1.28.1）→ `08af1d5a`（1.51.0） | changed；1165 文件 / +217468 / -18469；`system_message_suffix.j2`、`context/skills/__init__.py` 删除，新增 `PathTrigger`、`plugin/format/`、`mcp/config.py`、`mcp/oauth.py`、`profiles/` |
| `source-openhands-repo`（Canvas） | `1ec86616` → `a6bba78f` | changed；110 文件 / +6429 / -2076；被引的 `src/utils/skill-scope.ts` 与 `README.md` 未改动 |
| `source-openhands-npm` | 无基线 → `@openhands/agent-canvas` 1.24.0 | changed；首次记录版本观察值；属 Canvas Web 产品而非 cli 界面，不构成章节变化或版本映射 |
| `source-openhands-docs-skills-path` | `f032e743` → `489792da` | changed；扩充为完整 path-triggered rules 说明并指向 SDK `PathTrigger` API；v1 定位的两处摘录仍原样存在 |
| 其余 20 个 `source-openhands-docs-*` | 见审计 YAML | changed（内容 hash 变化）；21 页合计 92 条引用摘录与全部 `document_section` 标题复核通过，无一条失配 |

## 验证与差异入口

- `pnpm knowledge:validate` → 通过，校验 517 个章节版本。输出中的 `COVERAGE_INCOMPLETE` 警告全部属于 codex／omp／opencode／pi 的历史 coverage 记录，**非 openhands 问题，按契约未改动**。
- `pnpm sources:audit-log` → 通过，校验 36 份上游审计记录。
- `git diff --check` → 通过，无空白问题。
- `git status --short --untracked-files=all -- knowledge/openhands audits/openhands` → 仅新增本审计 YAML 与本报告；`knowledge/openhands/` 无任何改动。
- 查看本轮改动：`git status --short --untracked-files=all -- audits/openhands` 与 `git diff`（其余产品的未提交改动不属于本轮，未触碰）。
- 已关闭的来源工作区：`ws-a6bba78ffd5a-4bb3ca2b-0a98-4f21-ad10-79e648e025fe`（Canvas @ `a6bba78f`）、`ws-08af1d5aa3c7-64f6af49-05f0-4d07-8a0c-5fde04a81bbe`（SDK @ `08af1d5a`）。临时工作区路径未写入任何知识或审计记录。
