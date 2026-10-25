# gemini-cli 巡检报告：2026-10-22

- 审计：`audit-gemini-cli-5e25c33c-9b4d-4a7a-9eaa-daae464dabe5`
- 固定来源：`source-gemini-cli-repo`（`65454d01f98f0983a4fee0773528fb42433131da` →
  `09d81bf116b6f0ef084731dc996aa9d56438bb70`，`refs/heads/main`）、`source-gemini-cli-docs`（unchanged）、
  `source-gemini-cli-npm`（`0.64.0` → `0.65.0`，仅记录身份，未据此改写章节）
- 结论：`changed`；本轮新建 3 个 edition，其余派发主题维持原 edition。

## changed paths 与语义 triage

116 个变更文件中 11 个被章节引用。逐个读取实际内容后，只有以下机制级变化：

| 文件 | 变化 | 受影响问题 | 处理 |
| :-- | :-- | :-- | :-- |
| `packages/cli/src/config/settings.ts` | 占位符解析改为两遍（`.env` 前/后）；新增 `coerceValidSettings` 尽力而为校验；工作区设置仅在受信时解析与校验；`setTrusted` 补解析；旧主题归一化统一到最终遍之后 | `config.overrides`、`config.runtime`、`config.trust`、`config.defaults`、`config.migration`、`config.diagnostics` | `configuration` v3 |
| `docs/reference/configuration.md` | 说明 settings 可引用 shell 与 `.env` 变量；控制 `.env` 加载的键只能引用 shell 变量 | 同上（`config.runtime`、`config.overrides`、`config.trust`） | `configuration` v3 |
| `schemas/settings.schema.json`（+ `settingsSchema.ts`） | `mcpServers.*.oauth.allowPrivateNetwork` 布尔字段，无 `default` | `config.defaults`（字段存在性） | `configuration` v3 |
| `packages/core/src/agents/registry.ts` | 项目层加载外加 `!storage.isWorkspaceHomeDir()` 前置条件 | `agents.entry`、`agents.diagnostics` | `custom_agents` v2 |
| `packages/core/src/skills/skillLoader.ts`（+ `utils/fileUtils.ts`） | frontmatter 正则接受 BOM/行尾空白并锚定全文；简单解析器大小写不敏感、去成对引号、支持 YAML 块标量；改用带编码识别的读取 | `skills.format` | `skills` v2 |
| `packages/core/src/mcp/oauth-provider.ts`、`oauth-utils.ts`、`docs/tools/mcp-server.md` | OAuth `allowPrivateNetwork` 与端点私网校验 | `mcp.auth`（本轮未派发） | 不新建 edition |
| `packages/core/src/config/extensions/github.test.ts` 等其余被引用文件 | 仅测试或与固定问题无关 | — | 排除 |

排除依据：`custom_providers`、`hooks`、`native_plugins` 的固定问题不经过上述被改动的代码路径
（settings schema 只新增同一 OAuth 字段；hooks 配置与插件安装/启用路径未变）。因此这些主题的答案不变，
已发布引用保持其自身快照（`38700b4` / `44d764ee`）。

## 证据（新增引用，均固定到 `09d81bf1`）

- configuration：`ref-gemini-cli-config-resolve-env`（settings.ts 891-926）、
  `ref-gemini-cli-config-coerce-valid`（833-878）、`ref-gemini-cli-config-load-passes`（1047-1077）、
  `ref-gemini-cli-config-final-pass`（1089-1124）、`ref-gemini-cli-config-trust-late`（365-397）、
  `ref-gemini-cli-config-doc-env-resolution`（configuration.md 72-76）、
  `ref-gemini-cli-config-allowprivate-schema`（settings.schema.json 4165-4168）。
- custom_agents：`ref-gemini-cli-agents-registry-home-skip`（registry.ts 174-181）。
- skills：`ref-gemini-cli-skills-loader-regex`（35-36）、
  `ref-gemini-cli-skills-loader-frontmatter-09d81bf1`（86-104）、
  `ref-gemini-cli-skills-loader-read`（190-200）、`ref-gemini-cli-skills-file-encoding`（fileUtils.ts 261-277）。

每个新引用配一个 `git_source_file` artifact 与一个 `source_revision` 快照（commit、文件、内容
SHA-256）；checkout 未复制进候选。

## 候选与复核

- `pnpm -s maintenance:candidates check --candidate <candidate>` 通过。
- 无来源冲突；文件优先级与合并策略未变，本轮只改占位符解析时机与校验回退方式，属于同主题机制修订，
  按普通更新由作者自检结案（`review_status: reviewed`）。
- 无阻塞问题；`pending_question_ids` 为空。
