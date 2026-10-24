# DeepSeek Harness 上游审阅报告 · 2026-10-22

## 给维护者的结论

本轮上游有实质机制变化：插件兼容性判定从「只看 `@deepseek-ai/dsh*` peer」改为「先读 `engines.dsh`，缺省才回退到 peer」，未满足项的字段名也从 `peers` 改成 `requirements`。`native_plugins` 的 `bundle-format` 已按新机制重写并发布新版；`mcp` 的能力覆盖答案没有变化，只因文档表格新增一行导致引用行号位移，另发一版把证据定位修正。

其余三个观察都不构成知识影响：npm 只是版本与 integrity 前进到 `0.2.1-rc.2`；官方文档页面的字节变化仅限 VitePress 资产 hash；Git 提交里大量 `system-prompt.expected.md`、`tool-schemas.expected.json` 是插件市场与新工具带来的快照重录，落在本轮未派发的主题外。

## 变化的意义与证据边界

### 兼容声明现在是 `engines.dsh` 优先

`packages/boot/app-boot/src/plugin-compatibility.ts` 的 `unmetRequirements` 先看 `engines`：声明了 `engines.dsh` 时该范围单独决定结果，`peerDependencies` 整段跳过；为空、非法 SemVer 或写成 `workspace:` 值都判为不兼容；`engines` 不是对象、`engines.dsh` 不是字符串则清单不可读。只有缺 `engines.dsh` 时才回退到原来的 peer 规则（仅 `@deepseek-ai/dsh` 与 `@deepseek-ai/dsh-` 前缀，`workspace:^`/`~`/`*` 指向当前运行时，prerelease 参与匹配）。返回结构的 `peers` 字段改名 `requirements`，引擎规则的键是 `engines.dsh`，回退规则的键是 peer 包名。

三处独立来源口径一致，没有冲突：源码本身、`packages/boot/app-boot/README.md:52`、`docs/user/develop/basic/publish.md:66`（另有 `docs/upgrade-guide/v0.2.1-alpha.3/plugin-engines-dsh` 的迁移说明）。旧章节「`engines.dsh` 是声明性的，不是强制通道」的结论已被推翻，因此 `plugins.package` 需要新的完整 edition。

### MCP 能力覆盖：答案不变，引用位移

`docs/tool-catalog.md` 在本轮为 `@deepseek-ai/dsh-plugin-market` 新增一行，`@deepseek-ai/dsh-mcp-resources` 那一行从第 19 行移到第 20 行，已发布引用不再命中。三个能力分支（tools 已实现、resources 由独立包提供、prompts 未实现）的机制与 `docs/subsystems/mcp.md:99-101` 的限制清单都没有改动，所以 `mcp.capabilities` 答案保持原样，只在 `deepseek-harness-mcp-v2` 里把该证据换成新快照上的正确行。

### 排除项

- **npm**：`0.2.0-rc.2` → `0.2.1-rc.2`，只有版本与 integrity 身份变化。未建立版本映射，也未据此改写任何章节。
- **官方文档**：与留存原件 `archive/deepseek-harness/artifact-source-deepseek-harness-docs-665aa28b1c3a` 逐行比对，差异仅为 CSS/JS 预加载路径的 hash 与一行清单增减，正文 0 行变化；本产品没有章节引用该来源。
- **Git 提交其余部分**：`plugin-market` 相关新增（工具目录行、用户指南、索引格式笔记）、发布工作流、`THIRD_PARTY_NOTICES.md` 与大量测试期望文件重录，均不在本轮 `mcp`/`native_plugins` 的固定问题内。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 旧 edition | 新 edition | 受影响问题 | 结果 |
| --- | --- | --- | --- | --- |
| mcp | `deepseek-harness-mcp-v1` | `deepseek-harness-mcp-v2` | `mcp.capabilities` | 答案不变；证据换到 `docs/tool-catalog.md:20` 的新快照引用 |
| native_plugins | `deepseek-harness-native_plugins-v1` | `deepseek-harness-native_plugins-v2` | `plugins.package` | `bundle-format` 兼容声明段落按 `engines.dsh` 优先规则重写 |

两个旧 edition 原样保留，历史引用 `ref-dsh-mcp-resources-tools` 与 `ref-dsh-compat-peer-scope` 均未改动；新证据指向新快照 `snapshot-deepseek-harness-repo-20261022`（`git_source_file`，`README.md`，与旧快照同一内容 hash）。未新建版本映射。

## 待处理与独立复核

**审计记录：** [`audit-deepseek-harness-c748b1d3-cf0d-4d94-819c-572a6a3843de.yaml`](./audit-deepseek-harness-c748b1d3-cf0d-4d94-819c-572a6a3843de.yaml)。**待处理旧审计：** `audit-deepseek-harness-5ab74160-9971-489f-994f-f30dccc91e5c` 仍保留在 `pending_audit_refs`。**待复核问题：** 无——未出现来源冲突，新规则由源码与两处文档互相印证，且只影响单一主题的清单兼容声明，不满足独立复核的三项触发条件。

## 范围外观察（留给后续任务）

本轮只派发 `mcp.capabilities` 与 `plugins.package`，以下两处旧陈述已在新提交上失真，但未调查、未改写：

- `native_plugins` 的 `plugin-model` 小节仍称本产品「没有插件市场」，而新提交已带 `@deepseek-ai/dsh-plugin-market`、`plugin_market` 工具与 `docs/user/guide/plugin-market.md`。
- `plugin-diagnostics` 引用的 `ref-dsh-pm-version-exemptions`（`packages/boot/plugin-manager/README.md:69`）在该行已整段换成安装前校验的描述，摘录不再命中；同段还出现 `peers` → `requirements` 的改名。

## 验证与差异入口

```sh
pnpm -s maintenance:candidates check --candidate /tmp/ahw-monitor-4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns/batch-20261022/candidates/deepseek-harness
```

源码调查在 pinned workspace `ws-687f282e8625-6f15605a-bea6-4cbb-bd51-949af2baffac` 内完成，临时路径未写入任何知识或审计记录。
