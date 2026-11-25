# Pi 上游巡检报告 · 2026-11-25

- 审计记录：`audit-pi-03a473b7-d465-42cf-98cb-52d62f6cb6ca`（status `changed`，review_status `reviewed`）
- 固定来源观察：`source-pi-repo` / `source-pi-legacy-repo` 同由 `a588a7bc4d1bc16554ed2a8044fd4be72ce26ec9` 前进到 `c11a73bfba1310dc4075ad836254ea87003f409b`；两个 npm 来源未变
- 交付方式：`delivery=pr`；worker 不切换发布指针、不运行 publish、不建立版本映射、不执行受管二进制

## 本轮只做增量

v8 的结论按 `a588a7bc` 固定；本轮仅复核 `/tmp/git-intersect-1125.json` 中 pi 的 11 个被引用文件在 `c11a73bf` 上的新 hunk，不重读无关变化。三个主题需要新 edition，其余文件按无知识影响结案。

| 主题 | 新 edition | 受影响问题 | 结果 |
| --- | --- | --- | --- |
| custom_providers | pi-custom_providers-v9 | providers.models / protocol / forwarding / auth | answered 保持，补新语义 |
| hooks | pi-hooks-v4 | hooks.events / hooks.order | answered 保持，补新语义 |
| local_transcripts | pi-local_transcripts-v3 | transcripts.schema | answered 保持，补字段 |
| configuration、mcp、native_plugins、skills、custom_agents | 不新建 | — | 无受影响答案 |

## 各文件判断

### 需要维护

- `packages/coding-agent/docs/models.md`：GitHub Copilot 分类器行加入 `gpt-6-luna-decisions`；新增按计划可见的规则（`/login` 只列账号 Copilot 模型目录，`COPILOT_GITHUB_TOKEN` 列两个）。→ `providers.models`
- `packages/ai/src/api/pi-classifier.ts`：200 响应体新增可选 `responseId`，`classify()` 只在非空字符串时写入结果。→ `providers.protocol`
- `packages/ai/src/types.ts`：`ProviderRequestOptions.onResponse` / `StreamOptions.onResponse` 注释改为每次 HTTP 响应都调用（含 4xx/5xx 与重试的每次尝试），并声明覆盖程度随 provider/transport 而异；`ClassifierResult` 新增 `responseId`，`usage` 成本在服务报告账单金额（`cost.totalFromProvider`）时改用该金额。→ `providers.forwarding`、`providers.protocol`；同一契约也是 `after_provider_response` 的实现侧，供 hooks 引用
- `packages/coding-agent/docs/providers.md`：`!command` 解析失败后 `/login` 显示 `stored key did not resolve`；重试方式是在 `/login` 重新输入同一命令或重启。→ `providers.auth`
- `packages/coding-agent/docs/extensions.md`：`after_provider_response` 顺序行与专节改为每次 HTTP 响应触发（含错误与重试），并补覆盖边界（部分 provider 只给空 header/部分响应；SSE 流内错误与 WebSocket 传输不触发）。→ `hooks.events`、`hooks.order`
- `packages/coding-agent/docs/message-types.md`：`BashExecutionMessage` 新增 `fullOutputError`（截断的完整输出为何没能保存）。→ `transcripts.schema`

### 结案但不改章节

- `packages/coding-agent/docs/extensions.md` 的 `blockedKind`（`ctx.ui.select/confirm/input` 指定 OSC 7501 程序状态 kind）：对话框显示选项；八道固定问题没有对应题，native_plugins v4 的 `plugins.api` 范围是包清单与资源过滤，hooks 也不覆盖 UI 对话框 API，故只记录、不新建 edition。
- `packages/coding-agent/src/core/session-manager.ts`：只有 `loadEntriesFromFile()` 的扫描方式变化（只扫描新解码文本，避免超长行按读取块重扫）；解析、迁移、写入与索引未变。性能修复。
- `packages/coding-agent/src/modes/interactive/session-share.ts`：`shareSession()` 对 `fs.mkdtempSync` 失败改为 `showError` 返回；`/share` 去向、导出格式与设置未变。
- `packages/coding-agent/src/package-manager-cli.ts`：`getActiveManagedInstallRoot()` 拒绝在 WSL 下更新 Windows 托管安装；安装守卫，不改变配置加载或默认值。
- `packages/mcp/CHANGELOG.md`：Streamable HTTP SSE 分块解析改为增量扫描；MCP 协议与工具语义未变，mcp 八题不受影响。
- `packages/coding-agent/CHANGELOG.md`：`compat.supportsStrictMode` 的 Google 扩展只出现在 CHANGELOG 行，对应 models 文档与 schema 不在本轮被引用文件内，未据单条发布说明扩写 `providers.metadata`；Mistral 默认模型属内置目录默认值，不属自定义 provider；其余为缺陷修复或界面细节，均不改变固定问题答案。

## 证据与产物

新增 6 个 `git_source_file` artifact/snapshot（commit `c11a73bfba1310dc4075ad836254ea87003f409b`，`content_sha256` 由该提交的 raw file 字节计算）与 9 条 reference；新 edition 三个，旧 edition 与旧 reference 字节未改。`registry/chapter-current.yaml` 的 pi 选择切到 v9 / v4 / v3。

## 自检与复核

- 9 条新 reference 的摘录逐条与 `c11a73bf` 的文件行比对一致，均不超过 800 字符；6 个 artifact 的 sha256 用 `curl | sha256sum` 复算一致。
- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/pi` 通过（507 个文件，无诊断）。
- 本轮为文档/类型契约的增量澄清，没有推翻可执行配置步骤，也没有来源冲突（docs 与 types.ts 一致），未另请独立 reviewer。
- `pending_audit_refs` 置空；历史 pending 审计（11 条）仍保持未解决，不被本审计关闭。
