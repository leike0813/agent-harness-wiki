# codebuddy 上游审阅报告 · 2026-11-25

## 给维护者的结论

本轮不能完成知识维护，结论为 **blocked / pending**。批次提供给 `source-codebuddy-docs` 的
GitHub compare 差异是一页 `Not Found`（HTTP 404），因此没有取得
`7576ffa88f81540b71d4326cfbca779f78132073..7177f7e009422b0621b9d722c026bc35a8fe9f84`
的文件级 changed paths，也没有任何 hunk 可核对。本轮未新建或改写章节、快照、引用、映射与选章，
基线保留在 `7576ffa88f81540b71d4326cfbca779f78132073`。

登记仓库是 `https://cnb.cool/codebuddy/codebuddy-code.git`，不是 GitHub；只读核对确认该仓库可达、
HEAD 与审计 observed 一致。该范围内至少 63 个路径发生变化，且包含当前章节引用的文档页，因此
**不能**把本轮判为 no-impact 或宣称「没有被引用文件变化」。下一轮需从登记的 cnb.cool 仓库或
coordinator 的 pinned source workspace 取得逐字差异后继续。

## 变化的意义与证据边界

### GitHub compare 404 与来源身份

- `source-codebuddy-docs`：baseline `7576ffa8…` → observed `7177f7e0…`（`refs/heads/main`），
  批次差异抓取返回 404，changed paths 缺失。
- 只读核对（不作为发布证据，未写入 artifact）：`git ls-remote` 的 main HEAD 为
  `7177f7e009422b0621b9d722c026bc35a8fe9f84`，与审计 observed 一致；baseline 与 observed
  两个提交都能从 cnb.cool 仓库取得。按审计范围执行 `git diff --name-status` 得到 63 个路径。
- 相对上次观察 `631c44fe29aa522dc67c589603190bd1c3ee8fbf`（2026-11-22）→ `7177f7e0…`
  （2026-11-24）只有一个自动同步提交，涉及 5 个文件：
  `CHANGELOG.md`、`docs/env-vars.md`、`docs/release-notes/README.md`、
  `docs/release-notes/v2.186.0.md`（新增）、`docs/slash-commands.md`。
  其中 [docs/env-vars.md](https://cnb.cool/codebuddy/codebuddy-code/-/blob/7177f7e009422b0621b9d722c026bc35a8fe9f84/docs/env-vars.md)
  新增 `CODEBUDDY_MIORA_MEDIA_ENDPOINT` 并收窄 `CODEBUDDY_IMAGE_EDIT_ENABLED` 的表述；
  [docs/slash-commands.md](https://cnb.cool/codebuddy/codebuddy-code/-/blob/7177f7e009422b0621b9d722c026bc35a8fe9f84/docs/slash-commands.md)
  把 `/model:text-to-image`、`/model:image-to-image` 改为 `/model:image-gen`、`/model:video-gen`。
  以上只是失败通道之外的人工只读观察，未提取逐字 hunk、未对照固定问题，故不形成任何
  answered/partial 结论，也不作为引用。

### 证据边界

- 审计 baseline 是台账 processed 基线（`7576ffa8…`），因此待核对范围包含 10 月中旬以来的累积变化，
  其中相当一部分已被 4 份旧 pending 审计部分 triage，但都没有结案；本轮没有新增证据可以关闭它们。
- 未改动知识面：候选中的章节、快照、引用、映射、`registry/chapter-current.yaml` 与基线逐字一致
  （`diff -rq` 无输出）。
- 没有版本映射：npm `2.186.0` 身份未变，Git HEAD 与官方网页本身也不能单独证明发行版行为。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| skills | `codebuddy-cli-skills-v3` | 未重开 | 保留旧版本；blocked/pending |
| mcp | `codebuddy-cli-mcp-v2` | 未重开 | 保留旧版本；blocked/pending |
| custom_agents | `codebuddy-cli-custom_agents-v1` | 未重开 | 保留旧版本；blocked/pending |
| custom_providers | `codebuddy-cli-custom_providers-v2` | 未重开 | 保留旧版本；blocked/pending |
| hooks | `codebuddy-cli-hooks-v2` | 未重开 | 保留旧版本；blocked/pending |
| native_plugins | `codebuddy-cli-native_plugins-v1` | 未重开 | 保留旧版本；blocked/pending |
| configuration | `codebuddy-cli-configuration-v5` | 未重开 | 保留旧版本；blocked/pending |
| local_transcripts | `codebuddy-local_transcripts-v3` | 未重开 | 保留旧版本；blocked/pending |

**发布：** 无（本轮没有候选章节，不进入 release）。**受管二进制：** worker 不执行。

## 待处理与独立复核

**审计记录：**
`audits/codebuddy/audit-codebuddy-c9060433-a55e-489b-832e-e2bd9e2ff1bd.yaml`（本报告同名）。
**待处理旧审计：**
`audit-codebuddy-9f90f95d-be63-48f2-9d75-f841bcaa2a8f`、
`audit-codebuddy-b2f1e4d2-885e-474a-808f-950b78020684`、
`audit-codebuddy-a717d490-f443-4c2d-bc06-21ce29a2f06a`、
`audit-codebuddy-6af50c11-2c52-43db-93b8-f02a4ade70cd`。它们保持各自的 pending 状态与问题清单，
本审计不引用也不代为结案。
**待复核问题：** 无（本轮没有产生需要独立复核的新结论）。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-codebuddy-docs`（[cnb.cool/codebuddy/codebuddy-code](https://cnb.cool/codebuddy/codebuddy-code)） | `7576ffa88f81540b71d4326cfbca779f78132073` → `7177f7e009422b0621b9d722c026bc35a8fe9f84` | changed；批次 GitHub compare 差异 404，changed paths 未取得；只读核对显示该范围至少 63 个路径变化，含被引用文档页 |
| `source-codebuddy-site` | `6041efd96529c902c63c14e21d51505ef4bb9d9e3aeafce9e2e28e0b151c649b` → 同值 | unchanged |
| `source-codebuddy-npm` | `2.186.0@sha512-4SlDz…` → 同值 | unchanged（npm 身份不变，本身不构成知识影响） |

## 验证与差异入口

- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/codebuddy`
  → exit 0，`harness_id: codebuddy`，338 个候选文件（含本报告）通过路径归属、章节引用与审计校验。
- 未运行 `pnpm knowledge:validate`、`pnpm sources:audit-log`、release 构建与
  `pnpm ahw publish`：worker 不集成、不发布（由 coordinator 执行）。
- 差异查看：`git diff --name-status 7576ffa8…7177f7e0`（只读探针），
  以及本审计 YAML 的 `checks[0].error`。
