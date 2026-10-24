# github-copilot 维护报告（audit-github-copilot-f1c17c21-04ad-401f-8b62-a564e2bf2659）

- 只读观察：2026-10-22T12:54:24.938Z，会话 4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns。
- 固定 Git 来源：`source-github-copilot-repo` @ `17631dc79466e1cf4a3e3f19e9ea907a56217d2c`（baseline `76c3172e…`），变更路径仅 `changelog.md`。该 commit 的 changelog 头部新增 1.0.100–1.0.102 条目，其中多条与插件安装/发现/生命周期直接相关（`ghapp://` 安装链接、受信仓库插件自动安装/更新、托管激活更新、团队市场、git-subdir 来源），已按发布说明级做语义 triage（见下），不再判定为“不含配置/加载机制变化”。
- 范围：configuration、custom_providers、hooks、mcp、native_plugins、skills 六个主题下 17 道固定问题；其余主题与问题不重审。

## 逐页差异与语义 triage

已归档 baseline（项目 `archive/github-copilot/` 只读）与冻结 observed（sha256 与观察记录一致）逐页 diff：

| 页面 | baseline | observed | 正文差异 |
| --- | --- | --- | --- |
| cli-config-dir-reference | `b1bc2aed…` | `8be36090…` | 新增 `showReasoning` 设置；托管键新增 `autoTier`/`requireBase64ImageAttachments`/`telemetry.headersProvider`；托管 MCP `serverName` 匹配放宽到 `[A-Za-z0-9_./-]`；沙箱 proxy 继承 `HTTPS_PROXY`→`HTTP_PROXY`→`ALL_PROXY` 与 `NO_PROXY` 语义；`allowed_models.txt` 示例值更新 |
| cli-command-reference | `2f309f72…` | `c61997ef…` | 新增 `--trust-folder`、`--disable-client-telemetry`；新增 Extension modes 小节；`/plugin list` 增加团队默认启用与托管强制语义；`/sandbox … session`；模型表删除 `gpt-5.4`、`gemini-3.7-flash` |
| cli-programmatic-reference | `41add277…` | `10f321e9…` | `--trust-folder` 行（含不延伸父/兄弟目录、托管策略仍生效）；模型示例换为 `gpt-6-astra` |
| hooks-reference | `fdf139f8…` | `7ad7c168…` | 新增“子 agent 内 Hook 的额外输入字段”小节（`agentId`/`agentType`/`parentAgentId`） |
| custom-instructions-support | `bc7a4ee4…` | `90150f5a…` | 仅链接改写（`About customizing…` → `Custom instructions for GitHub Copilot`） |

其余 changed 页（admin、agents-*、allowing-tools、auth、best-practices、byok、change-settings、configure、custom-instructions、hooks-howto、install、lsp、mcp、plugin-ref、plugins-*、skills）baseline 未归档或差异仅为提示框转义 `\[!NOTE]` → `[!NOTE]`；对未归档页面改为“按当前页逐条复核已发布断言”的方式判断，而非猜测 diff。

未归档观测页：cli-config-dir-reference（`8be36090…`）、use-byok-models（`22fd5852…`）、authenticate-copilot-cli（`207aea56…`）、administer-copilot-cli（`4d8b05d5…`）的字节本轮没有留存为 `archived_document` artifact，候选与原项目 `archive/` 都没有这些 observed 版本；“未变”结论只能回到归档 baseline 复核，审计把 config.* 与 providers.* 六道问题保持 pending 并记录取证缺口。

## 固定仓库 changelog 语义 triage

`changelog.md` 在 commit `17631dc` 的 1.0.100–1.0.102 条目中，与 `plugins.install`/`plugins.discovery`/`plugins.lifecycle` 相关的逐条判断：

- 1.0.100 `Add --trust-folder for one-off prompt-mode sessions…`：已由本轮 cmdref/prog-ref 快照覆盖，写入 hooks-v3 与 mcp-v3（知识变化）。
- 1.0.100 `Install verified Skills and plugins from GitHub install links via copilot plugin install "ghapp://air/install?..."`：新增安装来源，固定文档（插件参考 install 来源表、安装指南）未收录；按发布说明级写入 native_plugins-v2 的 plugins.install，不给 URL 参数细节（知识变化）。
- 1.0.100 `Trusted repository plugins install and update automatically before chat runs`：生命周期自动安装/更新，固定文档未展开；发布说明级记录（知识变化，plugins.lifecycle 仍为 partial）。
- 1.0.100 `Managed plugins update activation in existing sessions when managed policy changes`：托管策略变化的激活更新，固定文档未展开；发布说明级（知识变化）。
- 1.0.100 `Rename the built-in browser plugin to browser-use…`：命名变化，固定文档未覆盖；发布说明级（不改变加载机制）。
- 1.0.101 `Install Team-assigned plugins from Team-defined GitHub marketplaces`：发现/安装来源变化，固定文档未展开；发布说明级（知识变化线索）。
- 1.0.102 `Plugin marketplaces accept git-subdir sources and long plugin descriptions`：市场条目格式变化，固定文档未覆盖；发布说明级。
- 其余条目（模型、沙箱、MCP 恢复等）不在本轮固定问题范围，或已由文档快照覆盖。

## 结论

新建 edition（旧 edition 字节未改）：

- `github-copilot-cli-hooks-v3`：hooks.input（子 agent 字段）、hooks.conditions（`--trust-folder`）。
- `github-copilot-cli-mcp-v3`：mcp.entry（`/mcp search` 注册表入口为第五种添加方式）、mcp.lifecycle（`--trust-folder`、注册表安装后立即启动）。
- `github-copilot-cli-native_plugins-v2`：plugins.install（`copilot-plugins` 不再是内置默认市场并需自行注册、`copilot plugins` 跨类标志移除、本地目录市场 path-sourced 插件实时加载、changelog 记录的 `ghapp://` 安装链接按发布说明级补记）、plugins.discovery（内置市场只剩 `awesome-copilot`、团队默认启用/托管强制、`--trust-folder`）。
- `github-copilot-cli-skills-v3`：skills.conditions（团队默认启用插件、`--trust-folder`）；skills.collision 未变。

保持原 edition（答案按归档 baseline 复核未变；观测页字节缺口见上）：

- `github-copilot-cli-configuration-v4`：config.sources / config.overrides / config.migration / config.diagnostics。
- `github-copilot-cli-custom_providers-v2`：providers.auth / providers.metadata。

新增证据（快照 + artifact + reference）：

- `snapshot-source-github-copilot-docs-{hooks-ref,cmdref,mcp,plugin-ref,prog-ref}-20261022`，artifact 为 `artifact-source-github-copilot-docs-*`（`archive_document`，原件已按 `archive_path` 落在项目 `archive/github-copilot/`），reference：`ref-github-copilot-hooksref-subagent-input`、`ref-github-copilot-cmdref-trustfolder`、`ref-github-copilot-progref-trustfolder`、`ref-github-copilot-cmdref-plugin-list-teamdefaults`、`ref-github-copilot-mcp-registry-search`、`ref-github-copilot-mcp-registry-start`、`ref-github-copilot-pluginref-marketplace-defaults`、`ref-github-copilot-pluginref-local-plugin-reload`、`ref-github-copilot-pluginref-legacy-flags-removed`、`ref-github-copilot-pluginref-builtin-marketplace`、`ref-github-copilot-pluginref-firstparty-autoupdate`、`ref-github-copilot-pluginref-marketplace-autoupdate`、`ref-github-copilot-pluginref-marketplace-collision`。
- `snapshot-source-github-copilot-repo-20261022` + `artifact-source-github-copilot-repo-20261022`（commit `17631dc` 的 `changelog.md`，`git_source_file`，content_sha256 `66d7af8b…`），reference：`ref-github-copilot-repochangelog-plugin-install-links`、`-plugin-repo-autoinstall`、`-plugin-managed-activation`、`-plugin-team-marketplaces`、`-plugin-git-subdir`。

## 待办与风险

- 原件留存：本轮 5 个文档快照的原始字节已按 artifact 的 `archive_path` 落在项目 `archive/github-copilot/`（复核确认）；仍未归档的是 cfgdir（`8be36090…`）、byok（`22fd5852…`）、auth（`207aea56…`）、admin（`4d8b05d5…`）四个观测页，因此只把归档 baseline 用作证据，config.*/providers.* 保持 pending。后续轮次若能取得这四页字节，需另建 `archived_document` artifact + snapshot 后再复核。
- 来源阻塞：7 个文档来源返回 404（`*-concept`、`cli-concept`、`comparing`）。其既有快照仍是这些主题的补充证据；本轮问题结论不依赖它们的当前字节，但这 7 个来源身份仍需下一轮重新解析真实 URL。
- 范围外漂移（未改写）：custom_providers 的 providers.models 仍列已下线的 `gpt-5.4`/`gemini-3.7-flash`；native_plugins 的 plugins.package 未反映 marketplace 名称允许点号。
- npm 来源：`1.0.97`→`1.0.102` 只是发布身份（integrity）变化，未下载或比较包内容；按普通版本变化结案，不改章节、不造版本映射，新版本行为仍未验证。
- 未结案旧审计：`pending_audit_refs` 的 10 个旧审计仍未关闭，其中多个带 config.* 待办；本审计不替它们结案，因此保持 `review_status: pending`。

## 复核

独立复核 `rev2-github-copilot` 返回 `changes_requested`：17 道固定问题中 16 道 upheld，`plugins.install` corrected。本轮命中高影响触发，不能按作者自审定稿：

- `native_plugins-v2` 推翻已发布结论：`native_plugins-v1` 写“内置市场（`copilot-plugins`、`awesome-copilot`）由运行时自带、不能移除”“第一方插件（装自 `copilot-plugins` 与 `awesome-copilot` 市场）自动更新”；新快照改为 `copilot-plugins` 不再是默认市场、需自行注册、旧安装一次性迁移进 `extraKnownMarketplaces` 并置 `autoUpdate: true`。
- 该变化跨主题影响 `skills`（团队默认启用插件的 skills 随之加载）与 `configuration`（`extraKnownMarketplaces`/`autoUpdate` 设置）。

因此审计保持 `review_status: pending`，不写 `reviewed_by`/`reviewed_at`；`status` 保持 `blocked`（`checks` 仍有 404 来源）。待独立复核确认的具体断言：

1. `copilot-plugins` 不再是默认市场、需自行注册、一次性迁移 `autoUpdate: true`（`snapshot-source-github-copilot-docs-plugin-ref-20261022` 第 83 行）。
2. 第一方插件（装自 `awesome-copilot`）会话开始自动更新、`autoUpdate`/`COPILOT_AUTO_UPDATE` 关闭、CI 跳过（第 80 行）；自加市场 opt-in 仅交互与 `-p`（第 85 行）；同名冲突优先级（第 85 行）；内置 `awesome-copilot` 不能移除（第 91 行）。
3. `ghapp://` 安装链接属发布说明级证据（commit `17631dc` 的 `changelog.md` 第 49 行），固定文档未覆盖。
4. hooks-v3 的子 agent 负载字段与 `--trust-folder` 叙述。
5. mcp-v3 的 `/mcp search` 第五入口与 `--trust-folder`。
6. skills-v3 的团队默认启用与 `--trust-folder` 条件。
7. configuration/custom_providers 六道问题的结论只能回到归档 baseline 复核；观测字节缺口未修复，保持 pending。

已按复核意见修正 `plugins.install`（补 `ghapp://` 与发布说明级证据段）、把 `native_plugins-v2` 的自动更新/第一方市场断言改绑到新快照 reference，并按主题重写 impact 原因；范围维持本轮六主题、十七道固定问题。
