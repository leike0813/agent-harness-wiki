# qwen-code 维护报告：audit-qwen-code-888916ad-b2ec-4dba-9e92-2b032d361ba0

## 来源观察

| source | 身份变化 | 结论 |
| --- | --- | --- |
| `source-qwen-code-repo` | `18f80f56666a347a2b67b2ef98099cc58356b253` → `6212189f1f8334da78a69e3fb6b63ff6ca88251e`（单提交 `feat(managed-agent): Add the public-event transport and the wake/materialization consumers (MQ2c) (#14080)`，503 个文件） | `maintain`，范围见下 |
| `source-qwen-code-npm` | `0.25.1` → `0.25.1`（identity 与 integrity 均未变） | `unchanged`，不涉及知识 |

workspace：`ws-6212189f1f83-5b543269-3815-4fe2-937a-60e3013b4ec1`（只读，未复制进候选）。

本轮为 `narrow_investigation`：冻结任务只派发 configuration 与 mcp 两个主题的六个固定问题（`config.sources`、`config.overrides`、`config.defaults`、`config.migration`、`mcp.entry`、`mcp.definition`），未做全库重审。

## 逐文件差异

### `packages/cli/src/config/config.ts`（+26 / -0）

三处**纯新增**，没有任何删除或修改行：

1. `CliArgs` 接口在 `allowedMcpServerNames` 之后新增 `disableMcpServer: string[] | undefined`（:192）。
2. `parseArguments()` 在 `.option('allowed-mcp-server-names', …)` 之后注册 `--disable-mcp-server`（:683-691），`string: true`，`coerce` 对每个取值再按逗号 `split(',')` 并 `trim`，因此可重复传参也可写逗号列表。
3. `loadCliConfig()` 在 allow/exclude 的 if-else-if 链**之后**新增独立代码块（:2204-2219）：`if (argv.disableMcpServer)` 时把命令行给出的名字**并入**（不是替换）已有的 `excludedMcpServers` 集合。源码注释写明三条理由与边界：放在自己的块里是因为折进 `else if (!bareMode && !safeMode)` 分支会在 `--safe-mode` 下整段不执行、且与 `--allowed-mcp-server-names` 并用时第一个分支先胜出导致集合保持 undefined；优先级是 allow-then-deny（同时被两个参数点名的 server 最终禁用）；并且这是 boot-time only——settings-watcher 与 ACP 重载只按设置重建排除集，一次 `settings.json` 编辑就会丢掉这些命令行排除项，注释跟踪在 #14009。

配置文件解析、设置合并、作用域解析与迁移相关代码路径在本提交中未被触及。

### `packages/cli/src/config/top-level-options.ts`（+4 / -0）

只在 `'allowed-mcp-server-names'` 之后插入 `'disable-mcp-server'` 的选项元数据：`type: 'array'`，`description: 'MCP server names to disable for this invocation'`（:282-285）。其它顶层选项未动。

### `packages/cli/src/config/settingsSchema.ts`（+10 / -0）

一处新增：UI 分类下的 `arrowKeysScrollTranscript` 布尔键（:1299-1308），`label: 'Arrow Keys Scroll Transcript (Virtualized History)'`、`category: 'UI'`、`requiresRestart: false`、`default: false`、`showInDialog: true`。无删除、无既有键的默认值或作用域变化。

### `packages/cli/src/config/config.test.ts` 与 `hot-reload.test.ts`

新增用例，是本轮 `--disable-mcp-server` 的行为证据而非独立机制变更：`config.test.ts:4919-5006` 覆盖“只排除点名的 server”“重复传参”“与设置 `mcp.excluded` 取并集”“未给时不排除任何 server”“与 allow-list 并用时 allow-then-deny（`isMcpServerDisabled('server1') === true`、`('server2') === false`）”“`--safe-mode` 下仍生效”；`hot-reload.test.ts:442-451` 以 `CHARACTERIZATION, not a contract` 的措辞钉住“settings 编辑会丢掉启动期的 `--disable-mcp-server` 排除项”这一缺口。

### `docs/users/configuration/settings.md`（+2 / -1）

- `ui` 表新增 `ui.arrowKeysScrollTranscript` 一行（:166），`boolean`、默认 `false`，附完整行为描述。
- `model.maxToolCallsPerTurn` 行的描述文字被扩写：补入“达到该阈值时，一段连续只读阶段会收到一次性收敛提醒（不授予新权限，只有第一个非只读工具或新回合才能再次触发）”以及“loop-detected 对话框的 ‘Disable loop detection for this session’ 同时抑制上限与提醒”。键名、类型、默认值（`100`）与作用域均未变。

### `packages/cli/src/commands/mcp/add.ts`（+35 / -9）

新增一个模块级 `splitCommaList(values)` 归一化函数（:16-32）并把三处原先各自解析的列表参数改为调用它：`oauthScopes`（原先 `flatMap(s => s.split(','))`）、`includeTools`、`excludeTools`（原先直接 `argv[...] as string[] | undefined`）。函数语义区分三种 yargs 形状：未给为 `undefined`（不写字段）、否定形式 `--no-include-tools`（yargs 给 `[false]`）视为未给、给了但无值得到空数组保留为空数组；对字符串取值再按逗号拆分、去空白、丢弃空段；否定形式与显式值同时出现时以显式值为准。

**对读者可见的部分仅限于此**：字段名（`includeTools`/`excludeTools`/`oauth.scopes`）、各字段默认值、传输形状（middleware 里“URL → `http`，否则 `stdio`”的自动探测未改）、路径与作用域处理（`--scope` 的解析与写入目标未改）都不变。`add.test.ts`（+124 / -0）新增 7 个用例加 1 个 OAuth 用例，全部围绕该函数的行为（逗号拆分、重复传参、空段丢弃、空数组保留、否定形式视为未给、否定与显式值并存时显式优先、`--no-oauth-scopes` 不再抛错）。

### 排除的文件

| 文件 | 排除依据 |
| --- | --- |
| `packages/core/src/services/sessionService.ts`（+12 / -17） | diff 把两处 `file_history_snapshot` 记录判断收敛到 `session-file-history-state.ts` 新导出的 `readFileHistorySnapshotPayload`，是纯重构（判断条件未变）；且该文件属 `local_transcripts` 主题，不在本轮范围内 |
| `docs/developers/daemon/08-session-lifecycle.md`（+8 / -2） | 只在 replay 快照字段列表补入 `lifecycleReplay` / `lifecycleReplayIncomplete`，属 daemon/托管 Agent 传输层，不涉及 configuration 或 mcp 的已发布机制 |
| `docs/users/reference/keyboard-shortcuts.md`、`docs/users/support/troubleshooting.md` | 只是把新键 `ui.arrowKeysScrollTranscript` 写进既有排障条目，属同一新键的用户说明，已由 settingsSchema.ts 与 settings.md 的引用覆盖 |
| `packages/cli/src/serve/hosted-mcp-session.ts`（+58 / -3） | `reconcileEffects`/`closeResources` 拆分与 `lifecycleAuthority` 门控是托管 Agent 的宿主会话生命周期，不是 `settings.json` 的 MCP server 定义或入口面 |
| `docs/design/**`（含 `2026-10-12-managed-agent-event-transport-mq2`） | 显式排除：managed-agent 设计文档是设计材料，不作为已发布机制证据 |

## 逐题结论

| 固定问题 | 结论 | 依据 |
| --- | --- | --- |
| `config.sources` | 不受影响 | `config.ts` 的 diff 只新增一个 CLI 选项与一个并入块，四个设置文件路径、`QWEN_HOME`/`QWEN_RUNTIME_DIR`、`.env` 加载顺序、上下文文件层级均未被触及 |
| `config.overrides` | 变化，已写入新 edition | 新增第三类合并规则：第 7 层的 `--disable-mcp-server` 并入排除集，allow-then-deny、`--safe-mode` 下仍生效、boot-time only |
| `config.defaults` | 变化，已写入新 edition | 新增 `ui.arrowKeysScrollTranscript`（默认 `false`、UI、`requiresRestart` false、对话框可见），schema 与官方设置参考表同步新增 |
| `config.migration` | 不受影响 | 迁移表与弃用处理未变；`settings.md` 的 `model.maxToolCallsPerTurn` 描述扩写不改键名、默认值或作用域，且不落在迁移语义上 |
| `mcp.entry` | 变化，已写入新 edition | 新增本次运行的 server 排除入口 `--disable-mcp-server`，已发布的“全局级开关只来自 settings 的 `mcp` 对象”需限定 |
| `mcp.definition` | 变化，已写入新 edition（仅边界说明） | 字段表本身不变，只补一段说明 `qwen mcp add` 的列表参数归一化 |

## 候选内容

- 新章节 edition：`qwen-code-cli-configuration-v5`、`qwen-code-cli-mcp-v5`，旧 edition `v4` 全部保留，原 `{#section-id}` 锚点不变。
- `registry/chapter-current.yaml` 只移动本轮实际修订的两个产品 × 主题：configuration → v5、mcp → v5。
- 新增 7 个 artifact / 7 个 snapshot / 10 个 source reference，全部 pin 在 `6212189f1f8334da78a69e3fb6b63ff6ca88251e`，`content_sha256` 由 workspace 的实际字节计算。
- 摘录逐条与固定提交的对应行区间做了字节级比对，10/10 命中且均 ≤ 800 字符（`settings.md` 的 1358 字符表格行按完整句子截到 690 字符）。
- 未创建任何软件版本映射：npm 侧身份未变，且不从源码 HEAD 推导发行版行为。

## 待独立复核

`review_status` 保持 `pending`，原因有二：

1. 本轮为 `config.overrides` 新增了一类合并机制（命令行并入排除集）**并同时改写** `mcp-entry` 的已发布表述，属跨主题的关键配置/入口机制变化，需独立 reviewer 确认表述未过度延伸、两条章节的分工（配置章写合并细节、MCP 章写入口与边界）没有互相矛盾或重复。
2. `pending_audit_refs` 仍指向 `review_status` 为 `pending` 的 `audit-qwen-code-42d06e9b-b1b5-410a-8c7c-948096791695`，不能在未解决它的情况下把本审计标为 reviewed。

复核建议重点：`--disable-mcp-server` 的“boot-time only / #14009”表述是否应写成缺口还是短期特性；`mcp-v5` 中“合并与优先级的逐条细节见配置章节”是否足够自洽。

## 验证

`pnpm maintenance:candidates check --candidate /tmp/ahw-monitor-fa60cb88-ac51-446f-83dd-ae9a5d0a45e2-QlS6z6/batch-1/candidates/qwen-code` → 退出码 0。

未运行仓库级 `pnpm knowledge:validate` / `pnpm verify`（由协调者在集成后统一执行）。
