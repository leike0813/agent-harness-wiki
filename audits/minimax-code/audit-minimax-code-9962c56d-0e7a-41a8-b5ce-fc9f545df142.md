# 巡检维护报告：minimax-code / configuration

- audit_id：`audit-minimax-code-9962c56d-0e7a-41a8-b5ce-fc9f545df142`
- 产品 / 主题：`minimax-code` / `configuration`
- 上一审计：`audit-minimax-code-20261006t134000z`
- 交付方式：`delivery=pr`，隔离候选，不发布、不切换外部指针。

## 来源变化

| source | 基线 | 观察值 | 状态 |
| --- | --- | --- | --- |
| source-minimax-code-repo | `4401b0ed` | `834831165d58c8739ccdda82beee9af1cc7bea8c` | changed |
| source-minimax-code-npm | `0.6.3` | `0.6.5` | changed |
| docs-configuration / docs-reference / docs-security / docs-features / docs-faq | — | — | unchanged |

仓库共 51 个文件变化，pinned workspace 为 `ws-834831165d58-b4e08c2d-7e98-4ae7-9251-8d9237fa166b`。

## 语义 triage

提交标题是 `fix(tui): exclude buffered bursts from the output rate at turn start`，但该提交的**主体语义变化不是**输出速率修正。逐文件核对后的实际变化分三类：

1. **配置入口变化（命中本主题，需要维护）**
   - 新增 `packages/tui/src/cli/system-prompt-options.ts`：声明 `--system-prompt`、`--system-prompt-file`、`--append-system-prompt`、`--append-system-prompt-file` 四个选项，定义「替换/追加」两个槽位，实现父命令继承、不支持子命令的拒绝、启动期一次性读文件与解析。
   - `packages/tui/src/cli/contract.ts`：`RawTuiInteractiveOptions` 继承 `RawSystemPromptOptions`，交互/exec/exec-review 三个 CLI contract 都调用 `applySystemPromptCliOptions`，`TuiInteractiveLaunchRequest` 携带 `systemPromptOverrides`。
   - `packages/tui/src/cli/program.ts`：`preAction` 钩子调用 `rejectUnsupportedSystemPromptOptions`；exec / exec review / acp 三条路径用 `inheritSystemPromptOptions` 逐槽位继承。
   - `packages/tui/src/cli/main.ts`、`run-exec-command.ts`、`run-acp-command.ts`、`packages/tui/src/tui/launcher.ts`：把覆盖值沿启动链传到 runtime；登录后重启用 `systemPromptRestartArguments` 保留原参数。
   - `packages/local-runtime-v2/.../local-agent-config-builder.ts`：新增 `SystemPromptOverrides` 类型与 `systemPromptOverrides` 选项，在 `buildSystemPrompt`/`buildIdentityPrompt` 中装配——替换槽位非空时整段替换身份提示词，追加槽位作为独立片段插在身份段之后、instructions 之前。选项注释明确「never persisted」，且对 task child 界面不生效。
   - `packages/local-runtime-v2` 的 `host-contract.ts`/`runtime.ts`/`services.ts`/`runtime-agent-product.ts`/`runtime-session-composition.ts`：把该选项接进 runtime 宿主契约。
   - `docs/tui-capabilities.md`：新增「Launch-scoped system prompt overrides」小节，描述适用界面、槽位规则、就近胜出优先级、读文件失败终止启动、进程内存内不落盘、task child 保留打包提示词。
2. **交互表现（按 exclude 不改写）**：输出速率计算、Ask/Plan 待答请求的 TUI 呈现（`turn-output-rate.ts`、`turn-projection.ts`、`tui-main-screen.ts`、`pending-questionnaire.ts` 等）。这些文件没有已登记小节，且属交互行为，不进入 configuration 章节。
3. **无关变化**：cron `once-time.ts` 与 `cron-schedule-input.ts` 的排期输入调整、`package.json` 版本号、`LOCAL_CHANGES.*`、测试脚本与 `release/public-source.json`。不命中任何已登记小节。

## 知识更新

- 新建完整 edition `minimax-code-cli-configuration-v3`，新增小节 `config-prompt-overrides`（适用界面、两个槽位四种写法、解析与优先级、生效范围与装配位置、版本边界）。
- `config-runtime` 小节补记这四个公开选项，并说明它们是「参数只影响选文件」这一既有结论的唯一例外分支；`config-diagnostics` 补记覆盖没有诊断面、唯一失败信号是启动期报错；`config-trust-defaults`、`config-migration` 各补一句「覆盖不落盘、无默认键、不参与迁移」。
- `registry/chapter-current.yaml` 的 configuration 选择切到 v3；v2 文件保持原样不动。
- 新增 8 条引用（`ref-minimax-code-config-prompt-{flags,inherit,reject,resolve,surfaces,assembly,composition,doc}`）、4 条 snapshot 与 4 条 `git_source_file` artifact，全部固定到 `834831165d58c8739ccdda82beee9af1cc7bea8c`，无 workspace 临时路径。

## 未完成与边界

- `config.sources`、`config.overrides`、`config.trust`、`config.defaults`、`config.migration` 本轮无新增证据，保持 pending，未做无证据改写。
- 官方文档来源全部 unchanged，因此提示词覆盖只作**来源级**知识；源码 commit 不能证明任何已发布 npm 版本的 CLI 行为，本轮不建软件版本映射。
- 审计仍引用 `review_status=pending` 的旧审计，故本审计保持 `pending`，不写 `reviewed_by`/`reviewed_at`。
- 高影响复核判定：新增的是**新入口**而非对已发布配置步骤的推翻，官方文档与源码无冲突，未发现跨主题关键加载机制改变，因此不触发独立 reviewer；结论由作者自检覆盖。