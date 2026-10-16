# gemini-cli 维护报告（audit-gemini-cli-cc261cb8-12aa-4f8c-ac95-8f1a3f99fc7f）

## 来源观察

- `source-gemini-cli-repo`：`9b6e0265d16bbd29ca51e33c9e0c01dc4cec5e83` →
  `c10f094ee01c81663474d7d88252d6e6d2943583`，单提交
  `fix(cli): restore debounced static UI refresh on terminal width changes (#29644)`，10 个文件。
- `source-gemini-cli-docs`：hash 未变。
- `source-gemini-cli-npm`：`0.63.0@sha512-mmhqMmAdsoplCzrLQQC4yJBqr4uSKXghnrLspgUU6N9drmsaq7pi7oF09skRYzEq2dYK6eMT4UpFQP6rG2o/ew==` 未变。
- 固定来源工作区：`ws-c10f094ee01c-6dd93dec-d3d5-40e3-8caa-804a1b101c9c`（由协调者 pin，本任务只读）。
- 本轮 triage 分类：`narrow_investigation`，只调查 `native_plugins` 的
  `plugins.install`、`plugins.discovery`、`plugins.diagnostics`。

## 提交标题与实际改动的差异

提交标题声明的是终端宽度变化时的防抖静态 UI 刷新，但同一提交里也带了一处扩展加载路径的
安全白名单容错修复。标题不能作为 triage 依据，本轮以 diff 内容为准。

## 逐文件差异

### 已检查：与章节已引证据重合的两个文件

**`packages/cli/src/config/extension-manager.ts`（+16 / -7，唯一 hunk 在 `_buildExtension`）**

`_buildExtension`（`c10f094e` 第 712-772 行）中 `security.allowedExtensions` 非空的分支改了三处：

| 位置 | 改动前 | 改动后 |
| :-- | :-- | :-- |
| 726-738 | `source` 缺失即 `throw new Error(...missing or misconfigured.)`，异常经 `loadExtensions()` 的 `Promise.all` 中断整次加载 | `source` 缺失**或不是字符串**时 `debugLogger.warn(...)` 后 `return null`，只跳过该扩展；新增注释说明安装元数据是未校验 JSON，非字符串与缺失同样不可用 |
| 739-753 | 白名单中某条正则非法 → `throw new Error(Invalid regex pattern...)`，整次加载失败 | 该条 `debugLogger.warn` 后按不匹配处理（`return false`），`some` 继续求值后续条目；注释给出理由：一条写错的模式不应让所有扩展都不可用 |
| 738 | 每次 `some` 回调内调用 `getRealPath(...)` | 提到循环外算一次 `const source = getRealPath(installMetadata.source)`，被测值不变 |

安装/更新路径 `installOrUpdateExtension`（第 181-213 行）**逐行未变**：同一白名单下非法正则仍
`throw new Error`，不允许的来源仍 `throw new Error`。加载路径与安装路径因此不对称。

**扩展安装/发现/link/卸载是否变化：没有。** changed paths 中不含
`packages/cli/src/config/extensions/storage.ts`、`extensionEnablement.ts`，也不含任何
`/extensions` 命令入口文件；`installOrUpdateExtension`、`uninstall`、`link` 的实现均未出现在
diff 中。安装源（GitHub 仓库或本地路径）、`--ref` 固定、`link` 符号链接、`uninstall` 的语义与
路径全部不变。变化的只是"加载期被白名单过滤掉"时的失败处理。

**`packages/core/src/utils/fileUtils.ts`（+31 / -19）**：BOM 处理重构。抽出
`decodeBOMContent(buffer, bom)`，供 `readFileWithEncoding`（原 273 行处内联 switch）与
`isEmpty`（原 457 行处 `subarray(...).toString('utf8')`）共用；`decodeUTF16BE` 改为忽略尾部
半个码元（`usable = buf.length - (buf.length % 2)`），理由是 `swap16` 对奇数长度抛错。扩展清单
由 `packages/cli/src/config/extension.ts:62` 的 `fs.readFileSync(metadataFilePath, 'utf-8')`
读取，不走 fileUtils 的编码/BOM 路径，故不影响扩展发现或安装；该文件现有引用属
`local_transcripts` 章节，不在本任务范围。

### 已检查并排除

- **`packages/cli/src/ui/AppContainer.tsx`（+257）**：终端尺寸变化时的防抖刷新。新增
  `ENTER_SYNCHRONIZED_OUTPUT = '\x1b[?2026h'` / `EXIT_SYNCHRONIZED_OUTPUT`、`RESIZE_DEBOUNCE_MS = 100`、
  `RESIZE_CORK_SAFETY_TIMEOUT_MS = 1000`，以及 `discardCorkedStdoutBuffer()`——为丢弃 Node 内部
  `_writableState.buffered` 队列里已 cork 的写入而直接访问 `_writableState` / `_refreshSize` 私有状态。
  全文不含 extension/plugin 路径字面量，属终端宽度 UI 行为，排除。
- **`packages/cli/src/ui/hooks/useReverseSearchCompletion.tsx`（+17 / -6）及其测试（+79）**：
  历史补全改为先 `escapeRegExp(query)` 再用 `new RegExp(..., 'iu')` 匹配，以修正"长度会变化的
  Unicode 字符"（如 `İ`）导致的 `matchedIndex` 偏移；同时把 `debouncedQuery.toLowerCase()` 与
  `lowerQuery` 分开，`startsWith` 前缀判断用小写形式、传给 `searchHistory` 的用原形式。
  仅触及命令历史匹配，不改扩展路径，排除（与任务排除项一致）。
- **其余 4 个文件**：`integration-tests/utf-bom-encoding.test.ts`、
  `packages/core/src/utils/fileUtils.test.ts`、`packages/cli/src/ui/AppContainer.test.tsx`、
  `packages/core/src/utils/planUtils.test.ts`，均为上述三处改动的测试，无独立机制。

## 受影响与未受影响的固定问题

| question_id | 判定 | 依据 |
| :-- | :-- | :-- |
| `plugins.discovery` | **变化** | 白名单过滤的失败处理从"抛错中断整次加载"改为"逐扩展/逐模式警告并跳过"，加载容错语义改变 |
| `plugins.diagnostics` | **变化** | 新增两条可观察的警告文本（安装元数据缺失/不可解析/`source` 非字符串；白名单正则非法），成为区分"扩展坏了"与"白名单挡住了"的线索 |
| `plugins.install` | **不变** | `installOrUpdateExtension` 181-213 行逐行未变；安装源、`--ref`、link、uninstall 路径与语义均不在 diff 中 |

`plugins.model`、`plugins.package`、`plugins.api`、`plugins.lifecycle` 不在固定问题范围内；其中
`plugins.lifecycle` 的"构建失败会跳过并记录"在 v1 已表述，本轮只是把白名单分支也纳入同一处理，
未另立新答案。

## 候选产物

- 新建完整 edition `gemini-cli-cli-native_plugins-v2`（v1 原样保留，未原地修改）。
  改动限于：`plugins-scope` 增补 `c10f094e` 白名单核实说明；`plugins-discovery-api` 增补白名单
  加载期容错与加载/安装路径不对称的段落；`plugins-lifecycle-diagnostics` 增补两条警告文本的
  诊断用法；`plugins-install`、`plugins.discovery`、`plugins.diagnostics` 三条答案补新证据。
- 新增 2 个 `git_source_file` artifact（`extension-manager.ts`、`extension.test.ts`，commit
  `c10f094ee01c81663474d7d88252d6e6d2943583`，含 `content_sha256`）、2 个 snapshot、4 条 reference。
  四条 excerpt 均逐字取自固定工作区并按文件/行定位，`loadExtensions()` 的测试引用固定在
  `extension.test.ts:893-909`。
- `registry/chapter-current.yaml` **未改动**：`native_plugins` 仍指向 v1。原因见下节。
- 未新增任何软件版本映射：本轮证据全部来自源码 HEAD，不能证明 npm 发行版行为。

## 复核状态

结论改变了已发布机制（白名单在加载期的失败处理），按维护契约保留
`review_status: pending` 并声明独立复核。复核范围：v2 中 `plugins-discovery-api` 与
`plugins-lifecycle-diagnostics` 两个小节，以及 `plugins.discovery`、`plugins.diagnostics`
两条答案的新增证据是否足以支撑"仅加载路径改变、安装路径不变"的结论。

因复核未完成，`registry/chapter-current.yaml` 保持指向 v1；v2 作为未发布 edition 留在候选内，
交协调者在复核通过后再决定选章。本任务未运行 publish、未切换发布指针。

## 自检

`pnpm maintenance:candidates check --candidate …/candidates/gemini-cli` 通过（exit 0）。

## 未验证项

- `source-gemini-cli-docs` 与 `source-gemini-cli-npm` 本轮 unchanged，未据此新建任何映射；
  `0.63.0` 是否已含本提交的扩展容错修复未验证。
- 白名单失败时的警告是否在默认（非 debug）日志级别下可见，未在固定来源中核实；
  文中只按源码写"可观察线索是 `debugLogger.warn`"，未声称默认可见。