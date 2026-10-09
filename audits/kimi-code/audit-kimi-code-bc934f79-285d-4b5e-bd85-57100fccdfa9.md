# Kimi Code 上游审阅报告 · audit-kimi-code-bc934f79 · 2026-10-09

## 给维护者的结论

**skills 与 configuration 两个章节一个字都不用改。** 本轮唯一的实质改动是 `fs:list` 新增 `allow_ignored_globs`，而 kimi-code 的 skills 章节从来就没有记录过任何「忽略规则」机制——没有旧口径可被推翻，所以不存在需要新增的章节事实。

按任务要求把这点说清楚，而不是补写一节：skills 章节对 ignore / glob / gitignore / exclude 的全文检索零命中。章节里唯一与「排除」沾边的既有事实是技能扫描的固定按名跳过（`node_modules` 与以 `.` 开头的条目），它与 gitignore 无关，且该函数本轮未改动。

## 变化的意义与证据边界

### 这次改了什么

`source-kimi-code-repo` 由 `21406fb` 移动到 `5b93669`（feat(kap-server): add allow_ignored_globs to fs:list for un-ignoring named paths，#4058），19 个文件。

排除项（任务 exclude 已列，且与登记主题无关）：4 个 changeset、7 个 TUI/survey 文件及其测试（survey 频率、popup、shell 输出清洗）。

剩下的实质改动集中在 `packages/agent-core-v2/src/workspace/workspaceFs/`：

- `fs.ts`：`fsListRequestSchema` 新增 `allow_ignored_globs: z.array(z.string()).optional()`
- `fsService.ts`：被忽略的条目不再一律 `continue`，当它匹配放行 glob、或其下可能存在放行后代（`globCanMatchBelow`）时保留；新增 `hasAllowedDescendant` 探查，受 `PROBE_MAX_DEPTH = 6` / `PROBE_MAX_ENTRIES = 500` 预算限制
- `internal/fsSearch.ts`：引入 picomatch，glob 匹配统一为 `{ dot: true, nonegate: true }`，新增 `globCanMatchBelow`（其余为 `replaceAll`/`at(-1)`/`toSorted` 等机械改写）
- `docs/{en,zh}/reference/server-api.md`：各增一行该字段说明（英文注明放行点开头还需 `show_hidden: true`）
- `packages/kap-server/test/fs.test.ts`：新增用例

### 为什么 skills 章节不受影响

两条独立依据：

1. **无口径可改。** skills 章节全文没有忽略规则的表述，既有排除事实来自 `isSkillScanExcludedEntry`，本轮未改。
2. **无共享入口。** `packages/agent-core-v2/src/features/skill/` 下不出现 `workspaceFs`、`WorkspaceFsService`、`gitignore` 任一标识——技能发现根本不走 `fs:list`。`WorkspaceFsService` 的调用方是 `program.ts`、`fs.ts`、自身测试、`packages/kap-server/src/routes/fs.ts`、`packages/node-sdk/src/sdk-rpc-client-v2.ts`，即 kap-server 的 fs:list RPC 面。

按技能契约，`skills.roots` / `skills.conditions` / `skills.discovery` 的答案、状态与引用范围原样保留，未新建 edition、未新增 reference。

### configuration 为什么也不受影响

configuration-v2 中唯一的 ignore 表述是「建议把项目级 `.kimi-code/local.toml` 加入项目 .gitignore」——那是给用户的写法建议，不描述宿主读取配置时的忽略规则。本轮也没有任何配置文件解析路径被改动。

## 边界与未做之事

- 源码 commit `5b93669` 只证明源码树，**不**证明 npm 发行版 `2.1.1` 含该字段；本轮不写 mappings。
- 项目 `archive/kimi-code/` 下无归档原件目录；`docs/{en,zh}/reference/server-api.md` 是同一提交内仓库自带文档，不是归档官方文档。本轮未从该来源取证据进候选，故不影响结论。
- 未执行 `sources:scan`、`ahw publish`、`chapters:update`、`managed:packages` 或任何网络抓取；调查只在 coordinator 已 pin 的只读工作区 `ws-5b936697670e-3135da85-b44a-4fc0-bb7d-de53d03729c8` 内进行，未复制源码进候选。

## 本次交付

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | kimi-code-cli-skills-v1 | skills.roots / skills.conditions / skills.discovery 状态与引用均不变 | 保留旧版本：改动落在 fs:list，不与技能发现共享入口 |
| configuration | kimi-code-cli-configuration-v2 | 无受影响问题 | 保留旧版本：未触及配置解析路径 |

**发布：** 仅结案审计，无新 edition。`delivery=pr` 轮次不运行 `pnpm ahw publish` 与 `pnpm chapters:update`，`registry/chapter-current.yaml` 维持现选择。**受管二进制：** 未触发。

**复核：** `review_status: reviewed`（作者自检，无 pending 问题；未触发独立复核条件）。判定属排除性结论——机制从无记录、且与 skills 无共享入口——不推翻已发布配置步骤，不涉及跨主题加载机制变更，未触发独立复核条件。
