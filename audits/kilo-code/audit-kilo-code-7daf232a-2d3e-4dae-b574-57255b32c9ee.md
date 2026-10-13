# kilo-code 配置主题窄调查 — fb7e96ed → f70f0da2

- 审计：`audit-kilo-code-7daf232a-2d3e-4dae-b574-57255b32c9ee`
- 任务：`monitor-20261013-kilo-code`，role=worker，delivery=pr
- 范围：`configuration` 的 `config.sources`、`config.overrides`、`config.diagnostics`
- 固定工作区：`ws-f70f0da2d661-cca850a4-6746-4f83-957a-64726ea9217e`（commit `f70f0da2d66104389268b644e30f8997c18ea008`）
- 结论：三个问题全部 unaffected；未新建章节版本；无来源失败、无来源分歧。

## 来源观察

| source | kind | baseline | observed | 状态 |
|---|---|---|---|---|
| source-kilo-code-repo | git_repository | `fb7e96eda5409517a05948b9efaf01c53997bf6e` | `f70f0da2d66104389268b644e30f8997c18ea008` | changed |
| source-kilo-code-npm | npm_registry | `7.8.8@sha512-kL9L…` | 同左 | unchanged |

仓库侧是一个合并提交（`Merge pull request #15004 from Kilo-Org/igor/fork-from-message`），共 270 个文件。

## 已引证据文件的逐文件 delta

本产品的 `configuration` 章节引用了三个在本轮提交中被改动的文件。逐项核对：

**`packages/core/src/v1/config/config.ts`** — `+4 / -0`。唯一改动是在 `experimental` 结构体内新增一个可选键：

```
      glob_include_ignored: Schema.optional(Schema.mutable(Schema.Array(Schema.String))).annotate({
        description:
          "Folders or files, as gitignore-style patterns relative to the workspace root, that the glob tool should search even when they are ignored (for example by .gitignore) or hidden. …",
      }),
```

位于 observed 第 334 行，插在 `native_notebook_tools` 与 `code_mode` 之间。这是在既有 `experimental` 结构内增加一个叶子键，没有触及 `Info` 的加载路径、合并顺序、作用域判定或告警派生。它是新增键而不是来源/覆盖/诊断机制的变化，且 `config.defaults` 不在本轮指派范围。

**`packages/opencode/package.json`** — `+1 / -1`，仅 `"version": "7.8.8"` → `"7.8.9"`。这是仓库内版本号自增；npm registry 观察仍是 `7.8.8`，两者身份独立，不据此推断 npm 发行版行为。

**`packages/opencode/CHANGELOG.md`** — `+46 / -0`，新增 `## 7.8.9` 发布段落，20 条 PR 说明。其中与配置相关的两条（`#14537` 写配置被更高优先级文件遮蔽时报错、`#14906` `goal` 命令别名）对应的实现在本轮未变，见下节。

## changesets：哪些被打开，为什么

changeset 只作线索，不作机制证据。

**打开：**

- `.changeset/config-overlay-shadowed-error.md` — 点名配置行为：写配置被 `opencode.json` 等更高优先级文件遮蔽时改为报错，而不是静默保留旧值。
- `.changeset/goal-command-alias.md`、`.changeset/reserved-command-name-clash.md` — 点名配置告警行为：`command` 中名为 `goal` 的条目以 `/goal:command` 暴露，并在 `Config.warnings` 通道上产生告警。这直接落在 `config.diagnostics` 的已发布说明上，必须回到实现核对。

**未打开：** `command-frontmatter-instance`（命令 markdown 的 frontmatter 误报）、`mcp-interrupted-startup`（MCP 启动中断清理）、`subagent-open-tooltip`（编辑器 UI 提示）——分别属于命令文件解析、MCP 生命周期与编辑器界面，与本轮三个固定问题没有入口关系。

## 逐字节核对：机制未变

对下列文件比较 baseline 与 observed 的内容哈希，全部相同：

- 配置加载与合并：`packages/opencode/src/config/config.ts`、`config/paths.ts`、`config/variable.ts`、`packages/opencode/src/kilocode/config/config.ts`、`kilocode/config/variable.ts`
- 覆盖判定：`kilocode/server/httpapi/groups/config-console.ts`、`handlers/config-console.ts`
- 诊断入口：`cli/cmd/config.ts`、`cli/cmd/debug/config.ts`、`kilocode/command/reserved.ts`、`command/index.ts`
- 其它机制：`packages/core/src/flag/flag.ts`、`packages/core/src/global.ts`、`packages/kilo-memory/src/effect/config.ts`、`packages/opencode/script/schema.ts`、`packages/opencode/src/tool/shell.ts`、`kilocode/tool/shell-tmp.ts`、`kilocode/storage/json-migration.ts`
- 文档：`packages/kilo-docs/pages/contributing/architecture/cli-runtime.md` —— `config.overrides` 那张 12 条来源顺序表所在文档也未变

`ConfigOverlayShadowedError` 在 baseline 已经存在于 `groups/config-console.ts`，`ReservedCommand.rename` / `alias` / `notice` 在 baseline 已存在于 `reserved.ts`。本轮提交只是把它们的 changeset 文本并入 CHANGELOG 发布段落。

已引证据的行定位仍然有效：`ref-kilo-code-config-memory-model` 指向 `config.ts:206-209`、`ref-kilo-code-lt-retention-config-schema` 指向 `config.ts:84-98`，新增键在第 334 行，没有移动这两处。

## 逐问题判定

| question | 判定 | 依据 |
|---|---|---|
| `config.sources` | unaffected | `config/paths.ts`、`config/config.ts`、`kilocode/config/config.ts`、`global.ts`、`flag.ts` 均未变；来源发现与全局目录读取顺序不变 |
| `config.overrides` | unaffected | `mergeConfig` / `mergeConfigConcatArrays` / `mergeProject` 所在文件未变；12 条来源顺序表文档未变；遮蔽写错误的实现也未变 |
| `config.diagnostics` | unaffected | `kilo config check`、`kilo debug config`、`ReservedCommand.warnings` 三个入口的实现文件均未变 |

三者均不需要新章节版本，因此没有编写 edition，`registry/chapter-current.yaml` 仍选 `kilo-code-cli-configuration-v5`。

## 排除范围

- `packages/kilo-jetbrains/**` 的 Kotlin 设置与会话改动（含 `jetbrains-*` changesets 与 CHANGELOG 中的 JetBrains `permission.edit` 一条）
- `packages/opencode/src/kilo-sessions/**` 的云端会话代码与 `background-process/**` 的 Windows 相关提交
- `packages/kilo-docs/pages/ai-providers/mixlayer.md`（模型列表与目录来源说明）
- `packages/kilo-docs/pages/getting-started/settings/*.md`

后两项经核对未改变任何已登记的配置机制：`settings/index.md` 只新增 `experimental.glob_include_ignored` 的用户说明，`auto-approving-actions.md` 只新增 JetBrains 插件默认 `permission.edit` 说明。按本轮范围排除。

## 遗留

`config.defaults` 因新增 `experimental.glob_include_ignored` 键而可能需要维护，但不在本轮指派范围，留给后续派发。同一审计里 `config.runtime` / `config.trust` / `config.migration` 与其它主题仍未结案，故审计的 `review_status` 保持 `pending`；这不是配置主题本身需要独立复核。配置主题本轮无高影响结论，无独立复核需求。

## 自检

`pnpm maintenance:candidates check --candidate <candidate-root>` 通过。