# audit-kilo-code-20261006t134000z

- harness：`kilo-code`
- 来源：`source-kilo-code-repo`（`https://github.com/Kilo-Org/kilocode.git`）
- baseline `62f674d4a91969ac077e4a7b6ceeb8a99de80e47` → observed `9d0f7a1dd8e843457f1166f64fb87b2275d00b35`
- npm 来源 `source-kilo-code-npm`：`7.8.3`，integrity 未变
- 固定检出：coordinator 已 pin 的临时检出，只读 `git diff`（临时路径按契约不写入记录）
- 结论：`status: changed`，`review_status: pending`，本轮修订 `configuration` 一章

## 变更面

250 个变更文件。剔除 `packages/kilo-vscode/**`（含 webview-ui、25 个语言包与 28 个测试文件）与
`packages/kilo-docs/**` 后只剩 42 个，其中真正落在配置机制上的有 6 个：

| 文件 | 性质 |
|---|---|
| `packages/core/src/v1/config/config.ts` | 新增顶层键 `memory_model` |
| `packages/opencode/src/kilocode/memory/ports.ts` | 模型解析的三条回落分支 |
| `packages/opencode/src/kilocode/memory/turn.ts` | 读取 `cfg.memory_model` 并传入 |
| `packages/kilo-memory/src/effect/config.ts` | `providerID/modelID` 解析（本轮未改，随机制一并取证） |
| `packages/opencode/src/kilocode/bootstrap.ts` | 把 `Config.Service` 注入 memory 生命周期 |
| `packages/opencode/script/schema.ts` | 本地 JSON Schema 生成，标注 `memory_model` 为 model `$ref` |

`.changeset/memory-model-setting.md` 为本轮新增 changeset，声明 `@kilocode/cli` 与 `kilo-code` 的
minor 影响。按契约 changeset 只作意图说明，正文机制事实全部引用上述源码。

## 新增知识（configuration / config.defaults）

`memory_model` 作为顶层配置键进入 `kilo.json[c]`：取值可选字符串或 `null`，格式 `provider/model`，
为项目记忆的自动保存指定模型，未设置或不可用时改用会话模型。

回落是三条独立分支，行为并不一致，这是正文的重点：

- 未配置：直接用会话模型，**不**记警告。
- 配置了但格式错误：记 `invalid model`，退回会话模型。
- 配置了、格式合法，但模型取不到或其语言模型加载失败：记 `model unavailable`，退回会话模型。
  `ports.ts` 对普通失败与 defect 两条通道都做了捕获。

后两种会记一条 `memory model config ignored` 警告。因此“配了却没生效”不能直接判定为配置没被读取，
要区分回落与优先级覆盖两种情形。

## 定位漂移修正（config.defaults / 配置 schema 规范来源）

原 v2 章节写“运行时配置的规范来源是 `packages/opencode/src/config/config.ts` 里的 Effect Schema
`Config.Info`”。核实后确认这是漂移：

- `packages/opencode/src/config/config.ts:30` 从 `@opencode-ai/core/v1/config/config` 引入 `ConfigV1`；
- 同文件 `:173-174` 是 `export const Info = ConfigV1.Info`，源码注释自述为 value re-export；
- 同文件 `:303` 的配置解析同样以 `ConfigV1.Info` 为 schema。

即 Effect Schema 的实际定义处在 `packages/core/src/v1/config/config.ts`，opencode 侧只做再导出，
两者是同一份 schema，不是两条独立路径。父进程提示的第 4 条属“两个独立路径”的猜测，经核实不成立。

官方文档 `packages/kilo-docs/pages/contributing/architecture/config-schema.md` 的 “Source of truth”
小节仍写作 opencode 路径。本章保留该文档引用并同时给出源码结论，按上游表述不精确处理，不记为冲突；
该文档页本轮不在变更集内。

编辑器校验面同步核对：`packages/opencode/script/schema.ts:77` 以 `ConfigV1.Info` 生成本地 JSON Schema，
`:58-64` 把 `model`、`small_model`、`subagent_model`、`memory_model` 一并标注为 model `$ref`。据此把
“本地生成 schema 与运行时读同一份 core schema，但与云端上传路径仍是两条独立路径”写入正文，替换 v2 的
笼统说法。`packages/sdk/js/src/v2/gen/types.gen.ts` 与 `packages/sdk/openapi.json` 属派生产物，未单独引用。

## 已核对并排除

- **custom_providers**：`provider/model` 解析只是按第一个斜杠切分两段，不含 provider 侧语义；结果交给
  既有的 `provider.getModel(ProviderV2.ID, ModelV2.ID)` 注册表查找。该路径属本章已覆盖的
  `providers.models` / `providers.diagnostics`，本轮无新语义，故不新建 edition，八题仍 pending。
- **skills、mcp、custom_agents、hooks、native_plugins、local_transcripts**：相关变更全部落在
  `packages/kilo-vscode/**` 与文档站，属 VS Code 与桌面/文档站界面，不是已登记的 `cli` 界面。
  唯一非界面改动 `packages/opencode/src/session/processor.ts:1013` 只在重试前清理失败尝试的
  reasoning 状态，与这六主题的固定问题无关。
- **工具与界面类 changeset**：`fix-grep-target-path`（检索目标路径展示）、
  `fix-agent-manager-project-sessions`（VS Code 会话隔离）、`settings-search`、`swift-settings-startup`、
  `browser-editor-tab`、`browser-pointer-latency`、`mention-path-tooltip`、`retry-thinking-indicator`、
  `session-dock-todos`、`spreadsheet-date-times`（表格日期读取）。
- **依赖与杂项**：`simple-git-4`、`dompurify-3-4-16`、`bun.lock`、`nix/hashes.json`、各 `package.json`；
  根 `AGENTS.md` 仅新增一行 VS Code 自测说明；`packages/opencode/src/kilo-sessions/**` 为会话 PR 链接。

## 未解决项

- `config.trust` 仍记 `conflict`（文档称 `{env:}` 引用被忽略，源码为整份项目配置加载失败被跳过）。
  本轮变更集不含 `packages/opencode/src/config/variable.ts` 与项目配置 `catchDefect` 路径，双方均未获新
  证据，不重开也不结案。
- 其余六主题 46 题按父进程范围限定保持 pending。

## 交付

- 新 edition：`knowledge/kilo-code/chapters/kilo-code-cli-configuration-v3.md`（v1、v2 原样保留）
- 新增 6 个 `git_source_file` artifact、6 个 `source_revision` snapshot、10 条 reference，
  全部 pin 在 `9d0f7a1dd8e843457f1166f64fb87b2275d00b35`，不含临时路径与源码副本
- 未新增 software mapping（changeset 未发布，不能证明发行版行为）
- 校验：`pnpm maintenance:candidates check --candidate /tmp/ahw-batch-20261006a/candidates/kilo-code`