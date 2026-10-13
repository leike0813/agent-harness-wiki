# minimax-code 巡检维护报告（audit-minimax-code-d9d125d7）

## 范围与固定来源

- triage 分类：`narrow_investigation`，入口限 configuration 的三道固定问题 `config.defaults`、`config.runtime`、`config.diagnostics`。
- 固定来源：pinned 工作区 `ws-e798b460f4d8-4f63576c-a12c-45aa-ba1d-7ab1c4fcaef5`，commit `e798b460f4d8603ce732e5d319d63c8018ef6cad`，未重扫来源。
- 观察基线 `cee07913` → 观察值 `e798b46`，单提交 `feat(tui): report program status with OSC 7501`，18 个文件，+399/-18。

## 决定性结论：不是纯输出变化

任务假设「OSC 7501 状态上报若不新增用户可配置项则无需维护」。核对后该假设**不成立**：该提交新增了一个真实的用户可配置项 `tui.programStatus`。

| 证据 | 定位 | 内容 |
| --- | --- | --- |
| `ref-minimax-code-config-program-status-key` | `packages/config/src/tui-config.ts:46-47` | `TuiConfig` 新增 `programStatus?: boolean`，注释 `Defaults to true` |
| `ref-minimax-code-config-program-status-parse` | `packages/config/src/tui-config.ts:116-117` | `typeof tui.programStatus === 'boolean'` 才透传 |
| `ref-minimax-code-config-program-status-presentation` | `packages/tui/src/tui/shell/status-line-config.ts:34-36` | 展示层重复同一条布尔规则 |
| `ref-minimax-code-config-program-status-launcher` | `packages/tui/src/tui/launcher.ts:419-421` | 启动期一次性透传进 TUI 应用选项 |
| `ref-minimax-code-config-program-status-gate` | `packages/tui/src/tui/app-composition.ts:177-181` | 生效判定 `isTTY && programStatus !== false` |
| `ref-minimax-code-config-program-status-map` | `packages/tui/src/tui/platform/terminal-program-status.ts:6-17` | 状态映射表（含新增 `auth`） |
| `ref-minimax-code-config-program-status-doc` | `docs/tui-capabilities.md:21-34` | 文档写明 `Set tui.programStatus: false to disable them` |
| `ref-minimax-code-config-program-status-yaml-doc` | `docs/tui-capabilities.md:43-47` | 示例 `config.yaml` 新增 `programStatus: true` |
| `ref-minimax-code-config-program-status-statusline` | `interaction-flow.ts:152-156` | 去掉 `agentStatusLineItems` 门控，状态栏项不再决定结构化状态 |
| `ref-minimax-code-config-program-status-reload` | `launcher.ts:475-478` | `/reload` 只重读键位、清缓存、刷新插件 |

## 逐文件 delta 判定（18 个变更文件）

**配置面（改动）**

- `packages/config/src/tui-config.ts`：新增键 + 条件解析。
- `docs/tui-capabilities.md`：新增配置说明段落与示例行。
- `packages/tui/src/tui/shell/status-line-config.ts`（第 11、36 行）：**是配置面**，把 `programStatus` 接入 `TuiPresentationConfig` 与读取器，不是仅渲染。
- `packages/tui/src/tui/launcher.ts`（第 419-421 行）：配置值透传。
- `packages/tui/src/types/tui-app.ts`（第 70-71 行）：新增 `programStatus?: boolean` 选项与注释。
- `packages/tui/src/tui/app-composition.ts`（第 178-181 行）：配置生效判定。

**输出实现与渲染接线（不新增配置入口）**

- `packages/tui/src/tui/platform/terminal-program-status.ts`：新增 65 行纯发射模块，只有状态映射表与 `terminal.write`。
- `packages/tui/src/tui/app.ts`、`terminal-title.ts`、`controller/product/chrome-flow.ts`：发射与标题渲染接线；标题状态标签新增 `auth → Needs login`。
- `packages/tui/src/tui/automation/status-store.ts`：新增 `loginRequired` 派生事实，不触及配置读取。
- `release/public-source.json`：仅登记新文件。

**明确排除**

- `packages/tui/docs/status-line-config.md`：本次只改了一句 `Fatal errors` 说明（登录阻塞的 `error` 在同一会话内登录成功后清除），属 build-mode 状态栏协议的语义与渲染说明，不含配置键或加载路径，不作为配置证据引用。
- 三份测试文件（`host-tui-settings.test.ts`、`tui-app.test.ts`、`tui-terminal-presentation.test.ts`、`chrome-flow.test.ts`）：只覆盖上述行为。

## 逐题结论

| 固定问题 | 结论 | 依据 |
| --- | --- | --- |
| `config.defaults` | **变化** | 新增默认开启的 `tui.programStatus`；布尔-only 解析；启动期一次性读取；`isTTY` 门；与标题/通知/状态栏项独立 |
| `config.diagnostics` | **变化** | 该键不在 `/reload` 重载范围内，也无 `/doctor` 报告项，改后需重启；给出「写了没生效」的两种成因 |
| `config.runtime` | **不受影响** | 该键无 CLI 参数、无环境变量，只能写在 `config.yaml`；已在章节内显式写明入口清单不变 |

三题均 `answered`，已从 `pending_question_ids` 移除；`config.sources`、`config.overrides`、`config.trust`、`config.migration` 不在本轮固定问题范围，保持 pending。

## 交付物

- 新章节版本 `minimax-code-cli-configuration-v4`（旧版 v3 保留），新增内容集中在 {#config-trust-defaults}、{#config-diagnostics} 与 {#config-runtime} 的显式不受影响说明。
- 新增 10 条 `git_source_file` artifact 与逐文件 snapshot（commit `e798b460f4d8603ce732e5d319d63c8018ef6cad`，只记 commit / 仓库相对路径 / `content_sha256`，不写临时路径、不复制 checkout）。
- 新增 10 条 reference，全部绑定到对应 snapshot 的精确行区间与逐字摘录。
- `registry/chapter-current.yaml` 的 configuration 选择切到 v4。
- 未新增任何软件版本映射。

## npm 身份变化

`0.6.9 → 0.6.10` 仅记录为发布身份变化；新版本未验证，不建映射、不写 artifact、不改章节。

## 复核与自检

- `review_status` 保持 `pending`，未写 `reviewed_by`/`reviewed_at`。新增可配置键改变了已发布的配置机制表述（默认值清单与重载边界），属需独立复核的范围。
- 待复核问题：新增键的默认值表述是否需要按「默认开启且 TTY 门」的措辞改写既有结论；`/reload` 边界结论与 `ref-minimax-code-config-reload` 的既有表述是否一致。
- `pnpm maintenance:candidates check --candidate <candidate_root>` 通过。
- 未运行 publish、`managed:packages`、`chapters:update` 或 `sources:scan`；未改动候选以外的任何路径。