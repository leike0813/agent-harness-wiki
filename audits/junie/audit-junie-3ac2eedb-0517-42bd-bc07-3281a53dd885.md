# Junie 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮 21 个登记来源全部报 `changed`，但**没有一条读者可见的知识变化**。

20 个官方文档来源的 hash 变化是同一个原因：本轮抓取把原件保存形态从提取后的 Markdown 换成了原始 HTML，`archive/junie/` 下新写入的 20 份 `source.md` 是 Writerside 渲染页，而不是上一轮的 `raw.txt`。逐页把当前原件抽成正文文本后按小节标题与高信号标识复核，`knowledge/junie/references/` 的 115 条引用短摘录全部仍然成立，20 个页面的 locator 标题一个都没被删改。

Git 仓库从 `1ee36c00` 前进到 `b1e2839d`，但 `changed_paths` 只有五个分发元数据文件：`registry-eap.json`、`registry-nightly.json` 和三个 `update-info*.jsonl`。内容是新增 release 构建记录（`3419.26`、`3419.29`）与 nightly 构建记录（`3593.1`、`3595.1` …），外加第三方 ACP agent 的版本号与下载归档更新。`README.md` 和 `install.sh` 都不在其中，四条 Git 侧引用在新提交上逐行仍成立、行号未漂移。

结果：已发布的七个 v1 章节全部原样保留，不新建 edition，不改 `registry/chapter-current.yaml`。

## 变化的意义与证据边界

### 20 个文档来源同时变更是保存形态变化，不是正文改版

扫描器按字节身份判断 `changed`，而这一轮 20 页的 observed 与快照记录的 `raw_sha256` 逐页不同。差异的来源是抓取管线的输出形态：从 `raw.txt`（`extractor: identity-markdown@1`）变成 `source.md`（原始 HTML，含 `<script type="application/json" id="virtual-toc-data">`、OG 标签、`last-modified` 等样板）。

因此本轮不做字节比对，改做表示无关的复核：把每份原件的正文抽成文本，对每条引用核对两件事——locator 指向的小节标题是否还在，以及摘录里的高信号标识（backtick 标识、CLI flag、`JUNIE_*` 环境变量、文件路径、JSON 片段）是否仍出现在该页。115 条中 108 条一次通过。

余下 7 条的表面缺失全部定位到核对脚本自身的表示误差，不是内容差异：

- `norm()` 会剥掉 `*`，于是 `.junie/rules/*.md`、`$JUNIE_HOME/models/*.json`、`.junie/models/*.json`、`[a-z][a-z0-9_-]*`、`*.md` 这类含星号的路径与正则对不上；
- Writerside 对 `%` 和 `…` 用了双重实体转义（`&amp;#37;`、`&amp;hellip;`），使 `%USERPROFILE%\.junie\AGENTS.md` 与 `{"decision":"block","reason":"…"}` 在抽取文本里短暂不可见。

逐条回看原件后，这 7 条同样成立。结论覆盖 `skills`、`mcp`、`custom_agents`、`custom_providers`、`hooks`、`native_plugins`、`configuration` 七个主题的全部固定问题——没有一个小节被删除或改名，已发布答案不受影响。

证据边界：这一轮只核对了已登记的 20 个页面，没有对未登记页面作任何断言。

### Git 变化是分发元数据，不构成机制变化

`changed_paths` 里的 `update-info*.jsonl` 只增删构建记录（version、marketing、platform、downloadUrl、sha256、size），`registry-*.json` 只改第三方 agent 的 `version` / `archive` / `package` 字段。据此复核了四条 Git 侧引用，在新提交上逐行仍成立：

- `ref-junie-repo-install`（`README.md` 29-44）：Homebrew 与 npm 安装方式未变；
- `ref-junie-repo-channels`（`README.md` 46-68）：`--eap` / `--nightly` / `--experimental` / `--release` / `--use-version` 未变；
- `ref-junie-repo-auth`（`README.md` 70-78）：JetBrains Account、Junie API Key、BYOK 三种认证方式未变；
- `ref-junie-repo-installer`（`install.sh` 1-22）：安装脚本头部与渠道变量未变。

按 maintenance 第 3 节，版本与构建记录的变化本身不构成章节变化或源码到包的映射，本轮不据此改写任何主题。

### 一处覆盖缺口：JetBrains IDE 集成页未登记

`source-junie-docs-acp` 正文现在说明：当 Junie CLI 连着同一项目的 JetBrains IDE 时，可用 `/ide` 命令查看当前 IDE 连接状态与会话可用的 IDE 功能，并指向 `junie-cli-jetbrains-ide-integration.html`。

该页不在 `registry/harnesses/junie.yaml` 登记的来源内。另有 17 个未登记的站内链接（`android-development-with-junie.html`、`junie-headless.html`、`junie-cli-plan-mode.html` 等）都出自 Writerside 的上一页/下一页导航，只有这一条出现在正文语境。

登记新来源要写 `registry/sources/`，超出本轮「只写 `knowledge/junie/` 与 `audits/junie/`」的范围，因此本轮不改写章节，留给登记该来源之后的定向调查。这是本轮唯一的未解决项。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | `junie-cli-skills-v1` | 本轮复核后无变化（`skills.*` 维持已发布状态） | 保留旧版本 |
| mcp | `junie-cli-mcp-v1` | 本轮复核后无变化（`mcp.*` 维持已发布状态） | 保留旧版本 |
| custom_agents | `junie-cli-custom_agents-v1` | 本轮复核后无变化（`agents.*` 维持已发布状态） | 保留旧版本 |
| custom_providers | `junie-cli-custom_providers-v1` | 本轮复核后无变化（`providers.*` 维持已发布状态） | 保留旧版本 |
| hooks | `junie-cli-hooks-v1` | 本轮复核后无变化（`hooks.*` 维持已发布状态） | 保留旧版本 |
| native_plugins | `junie-cli-native_plugins-v1` | 本轮复核后无变化（`plugins.*` 维持已发布状态） | 保留旧版本 |
| configuration | `junie-cli-configuration-v1` | 本轮复核后无变化（`config.*` 维持已发布状态） | 保留旧版本 |

**发布：** 仅结案审计。`delivery=pr`，本轮不构建 release、不切换任何发布指针，改动留在工作区交回巡检主进程。**受管二进制：** 未触发，`delivery=pr` 不进入受管二进制核对；`source-junie-npm` 观察到的 `3110.7.0` 留给 `harness-binary`。

## 待处理与独立复核

**审计记录：** [`audit-junie-3ac2eedb-0517-42bd-bc07-3281a53dd885.yaml`](./audit-junie-3ac2eedb-0517-42bd-bc07-3281a53dd885.yaml)。**待处理旧审计：** 无（`audits/junie/` 在本轮之前没有记录）。**待复核问题：** 无——三类高影响情形都不成立：不存在来源间冲突，不存在新来源推翻已发布的配置步骤，不存在跨主题关键加载机制变化，因此本轮不委派独立复核。**后续工作：** 登记 `junie-cli-jetbrains-ide-integration.html` 作为新来源，再定向调查 IDE 集成机制。

## 来源核查记录

下表的 hash 取前 12 位，完整值见审计 YAML。

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-junie-repo` | `1ee36c003043` → `b1e2839df156` | changed；仅 5 个分发元数据文件，构建记录与第三方 agent 版本号 |
| `source-junie-npm` | 无基线 → `3110.7.0@sha512-2OikZxvM…` | changed；首次观察（无 npm_release 快照），非新发布证据 |
| `source-junie-docs-quickstart` | `fbe528893ee2` → `b3d6b55bea92` | changed；保存形态改为原始 HTML，正文未变 |
| `source-junie-docs-config` | `91cf8a107f5d` → `4b7ffcf7fa49` | changed；同上 |
| `source-junie-docs-env` | `27a4447ae76b` → `af36e8917455` | changed；同上 |
| `source-junie-docs-params` | `2128ce1d12ea` → `361f3257a3e0` | changed；同上 |
| `source-junie-docs-guidelines` | `60d8ae0a8052` → `e95db1684db2` | changed；同上 |
| `source-junie-docs-skills` | `070e4dbed1ba` → `2180471bb578` | changed；同上 |
| `source-junie-docs-mcp` | `c7c2717c4e17` → `0d4a2877d6a3` | changed；同上 |
| `source-junie-docs-subagents` | `8316cf7143ab` → `912e67b7dedd` | changed；同上 |
| `source-junie-docs-hooks` | `27a21e554314` → `5a5bb8117e23` | changed；同上 |
| `source-junie-docs-allowlist` | `d888abc2db72` → `db732098f439` | changed；同上 |
| `source-junie-docs-extensions` | `8dc89c27f64b` → `d754a96e2fdc` | changed；同上 |
| `source-junie-docs-commands` | `60d8fdd8665e` → `8a9277215f524` | changed；同上 |
| `source-junie-docs-acp` | `49fe5809a6ee` → `d77c75e5fb91` | changed；正文新增 `/ide` 命令与 IDE 集成页链接（见覆盖缺口） |
| `source-junie-docs-custom-models` | `3c115096c459` → `67aa7fd480d1` | changed；保存形态改为原始 HTML，正文未变 |
| `source-junie-docs-model-selection` | `565f4c65acab` → `b0dd4db95a7d` | changed；同上 |
| `source-junie-docs-byok` | `78110c66fe16` → `36ed36b44ce9` | changed；同上 |
| `source-junie-docs-byok-copilot` | `7aea63f7bfd9` → `abbe20af26fd` | changed；同上 |
| `source-junie-docs-proxies` | `b9aa7907618f` → `a360854e1b95` | changed；同上 |
| `source-junie-docs-litellm` | `6463c2c33cf9` → `53fcf57879e1` | changed；同上 |
| `source-junie-docs-ollama` | `328cedbecd5f` → `7e8fa5508037` | changed；同上 |

## 验证与差异入口

本轮在仓库根实际运行：

- `pnpm sources:scan junie` —— 21 个来源全部观察成功，0 blocked，退出码 0。
- `pnpm knowledge:validate` —— 通过，`Validated 504 chapter editions.`，0 error，无 junie 相关诊断。输出的 `COVERAGE_INCOMPLETE` 警告全部属于其他产品（`claude-code`、`codex`、`omp`、`opencode`、`pi`），按契约未改动。
- `pnpm sources:audit-log` —— 通过，`Validated 30 upstream audit records.`，退出码 0。
- `git diff --check` —— 通过，无空白错误。
- `git status --short --untracked-files=all` —— 本产品只新增 `audits/junie/` 下的审计 YAML 与本报告，`knowledge/junie/` 无改动。

需要维护者知道的一个跨产品现象：本轮抓取把文档原件统一写成 `archive/<product>/artifact-source-<source-id>-<hash>/source.md`（原始 HTML），而 `knowledge/*/artifacts/*.yaml` 里的 686 条 `archived_document` 仍记录 `extractor: identity-markdown@1` 并指向 `raw.md` / `raw.txt`；扫描会清除上一轮的旧目录，因此这些 `archive_path` 目前不再解析。`bob` 等本轮同样重新归档的产品也是这个状态。这不是 junie 独有的问题，本轮没有改写 artifact／snapshot 记录——把 HTML 字节记成 Markdown 提取结果会让 `extractor` 字段失真，且与全树 686 条记录不一致，需要在管线层面统一决定。

查看本轮差异：

```sh
git status --short --untracked-files=all -- knowledge/junie audits/junie
git diff -- audits/junie
```
