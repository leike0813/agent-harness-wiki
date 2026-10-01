# 开发指南

使用 `package.json` 与 `.node-version` 指定的 Node.js 24.x、pnpm 11.10.0；安装依赖使用 `pnpm install --frozen-lockfile`。不执行上游来源中的命令。虚构章节数据位于 `tests/fixtures/datasets/chapters/`，与正式知识隔离。

产品与界面身份先写在 `catalog/harnesses.yaml`；registry 只登记产品 id 与来源引用。新增章节时，按 [固定问题清单](topic-questions.md)为每个问题记录 `answers`：每条答案带 `surface_ids`、状态、主要小节、具体说明和本问题来源引用。章节放在 `knowledge/<harness-id>/chapters/<edition-id>.md`；小节标题用 `{#section-id}`，引用用 `[@reference-id]`。来源引用和软件版本映射分别放在同产品的 `references/` 与 `mappings/`。另在 `registry/chapter-current.yaml` 选择当前章节。改写正文须创建新 `edition_id`，保留旧文件；新增版本映射无需修改章节。

运行 `pnpm chapters:validate` 校验虚构数据。运行 `pnpm chapters:build` 在隔离的 `var/chapter-release-fixture/releases/` 构建固定 ID `fixture-chapters`；该 ID 不可覆盖，重复构建前应改用显式命令和新 ID，例如：

```bash
pnpm exec tsx scripts/compile-chapters.ts --dataset-root tests/fixtures/datasets/chapters --profile fixture --release-id fixture-chapters-next --published-at 2026-09-29T00:00:00Z --releases-root var/chapter-release-fixture/releases
```

`pnpm exec vitest run tests/integration/chapter-release.test.ts tests/integration/query.test.ts tests/integration/mcp.test.ts tests/integration/site.test.ts` 检查章节发布、版本选择、来源、真实 MCP stdio 和站点。修改 schema 后运行 `pnpm schema:export`、`pnpm schema:check`、`pnpm typecheck`、`pnpm lint`、`pnpm format:check`。正式来源原件另以 `pnpm sources:audit` 显式离线核对；普通章节校验和构建不依赖忽略的原件。

`pnpm verify` 验证章节读取链，`pnpm fixtures:build` 生成虚构章节发布。公共查询、MCP 与站点只读取 schema 3 发布，不适配旧 release；发布内嵌 catalog。生产章节运行 `pnpm knowledge:validate`，用 `pnpm ahw compile --dataset-root . --profile production --release-id <new-id> --published-at <fixed-time> --stage` 先构建。验收该 release 的 CLI、MCP 与站点之后，运行 `pnpm ahw publish --release-id <new-id>` 原子切换当前指针。CLI 的 `query list/topic/search/compare/source` 与 MCP 的五个工具读取同一 release；`get_topic` 用 `section_id` 定位搜索结果。Windows 尚未实测。

生产编译前确认本机 Ollama 已有 `qwen3-embedding:4b`，且 `/api/tags` 报告的 digest 与 `registry/search-model.json` 一致；编译器会再核对 GGUF blob digest，不会自动下载模型。默认端点 `127.0.0.1:11434` 可用 `OLLAMA_ENDPOINT` 覆盖，便于改用另一个本机实例（例如把嵌入模型放到 GPU 上的实例）。新发布的 `search.json` 和 SQLite FTS5 收录当前小节，`semantic.jsonl` 收录固定模型生成的有界片段向量。搜索返回命中方式、正文片段、来源范围和 `semantic_status`；模型暂时不可用时可继续词法检索，但不能据此宣称语义验收通过。模型与索引的选择依据见 [ADR 0007](decisions/0007-offline-hybrid-search.md)。

修订已发布章节时新增 edition 文件，保留旧版及不可变 release；审阅完成后更新 `registry/chapter-current.yaml`。写作按 [固定问题和成稿规则](topic-questions.md)：机制分节，问题在索引中定位；配置文件按不同形态给带来源的最小完整片段，解释路径、字段、前提、结果与检查方式。校验器检查章节结构和引用关系；正文能否让读者找到入口、理解示例与条件、追溯来源，由调查 Agent 按真实读者视角自检，高影响变更再请另一 Agent 独立复核。

## 新收录产品接入

新 CLI 由维护者调用 `$harness-investigation <harness-id>`：在 `catalog/harnesses.yaml` 固定产品与界面身份，登记 `registry/harnesses/`、`registry/sources/` 的官方来源（有 npm 包时登记 `npm_registry` 身份），直接固定 Git commit/文档 sha256 并写入 `snapshots/`、`artifacts/`、`references/`，按 [固定问题清单](topic-questions.md) 采写七章，在 `registry/chapter-current.yaml` 选入七个新版本后运行 `pnpm knowledge:validate`。发布用 `pnpm chapters:update ... --stage --blocked '[]'` 构建不可变 release，验收后 `pnpm ahw publish --release-id <new-id>` 切换；首次接入不运行 `pnpm sources:scan`，也不写审计 YAML。知识发布成功后，Skill 会明确询问是否继续接入受管二进制；同意后由 `harness-binary` 先在 `src/sources/managed.ts` 登记官方包信息，再运行 `pnpm managed:packages update <harness-id>`。

## 手动增量更新流程

手动更新由维护者调用 `harness-maintenance` 启动：`$harness-maintenance pi` 是 ID 模式，给出固定来源与具体问题则走定向模式。ID 模式每一轮还会调用 `harness-binary` 核对受管二进制最新版本；定向模式只在明确要求时核对。流程没有逐条人工接受门禁，普通更新由调查 Agent 自检后直接采纳。

先运行 `pnpm sources:scan <harness-id>...` 观察登记来源并把变化映射到受影响问题和章节，写出审计；它只读元数据、不下载包字节、不切换发布，字段含义与恢复方式见 [知识怎样进入读者章节](knowledge-workflow.md) 的“手动观察与审计”一节。Agent 随后读取本次 `changed`、`blocked` 与 `pending_audit_refs` 指出的旧审计，沿固定来源定位到问题 ID 和小节，为受影响主题起草完整的新 `edition_id`（保留未受影响小节的引用范围），再检查实际 diff、运行 `pnpm knowledge:validate` 并确认正文按读者任务可读。普通更新到此即可采纳。只有来源冲突、推翻已发布配置步骤或跨主题关键加载机制变化才请另一 Agent 独立复核；复核未完成的问题留在待处理状态，其他已完成章节仍可发布。结论写进同目录 Markdown 报告，格式见 [报告模板](../.agents/skills/harness-maintenance/assets/review-report.md)。

完成的 edition 进入分阶段发布：先在 `registry/chapter-current.yaml` 选入新版本，再用 `--stage` 构建不可变 release。发布器只接受 `--stage` 与 `--blocked`；受阻产品主题传给 `--blocked`（JSON 数组）。

```bash
pnpm chapters:update --dataset-root . --profile production --release-id <new-id> --published-at <fixed-time> --releases-root releases --stage --blocked '[]'
```

命令在 staging 核对 hash、引用、SQLite 完整性和共享查询服务可读性，生成不可变 release 但不切换指针。核对后运行 `pnpm ahw publish --release-id <new-id>` 切换 `releases/current.json`；同一 release ID 不要再用不带 `--stage` 的 `chapters:update` 重跑，否则会因 `Release already exists` 失败。没有读者可见的章节、来源定位或版本映射变化时只结案审计，不新建发布；构建或验收失败保留原 current 指针。受阻章节保留其旧 edition 与审计阻塞，其他章节照常进入新发布。结果只报告知识 `status`、`retained` 与 `knowledge_error`；生产发布后的真实 MCP stdio 和站点可按上文集成命令复核。

同一次观察发现新的包候选时，由 `harness-binary` Skill 另行处理；`chapters:update` 只发布知识，不触发受管刷新。二进制是独立结果：成功或失败都记入同一份报告，但不能否决或阻断上面的知识发布，失败时旧的可运行包集保持不变，细节见下节。

首批五个 npm CLI 的受管启动流程见 [包集说明](../research/package-set/README.md)。首次接入与后续更新都由 `harness-binary` Skill 统一调用 `pnpm managed:packages update <harness-id>`；新产品先在 `src/sources/managed.ts` 的 `managedPackages` 登记官方包信息，并在 `registry/sources/` 登记官方 npm 来源，非 npm 分发报告 unsupported。`pnpm managed:packages observe` 记录官方 latest；`pnpm managed:packages check-current` 检查当前入口；`pnpm managed:packages update <harness-id>` 在忽略的候选目录安装并验证后才切换包集。网络中断后可用 `update <harness-id> <candidate-id>` 复核已完整安装的候选，仍会重新核对官方 latest、锁文件和启动。审计记录位于 `var/managed-packages/audits/`，候选和失败原因可由记录中的 `candidate` 定位。Linux bwrap 检查使用临时 HOME、配置根和工作区，候选包只读挂载、`--unshare-all` 禁网，以非 root UID 65534 运行，并限制 20 秒、64 KiB 输出缓冲、64 个进程和 128 个文件描述符；运行时可执行文件从当前 Node/Bun 安装只读绑定。`AHW_SANDBOX_TEST=1 pnpm exec vitest run tests/integration/managed-packages.test.ts` 运行本机隔离测试。该测试只覆盖当前 Linux 主机；Windows、其他架构、内核命名空间策略及进程限制的不同实现仍需分别验收。

受管包 NFS 布局与本机迁移验收见 [ADR 0008](decisions/0008-managed-package-storage.md)。该文档定义 `storage.json` 的三个必填字段与本次部署值、远端完整快照和 `current` 原子替换，以及本地四处链接，并记录 Btrfs 快照仍可能持有旧包字节导致 `df` 暂无净释放。pnpm 的 `index.db`、WAL、`projects/` 登记和包集清单、锁文件、操作锁、审计、备份与恢复记录留在本地。仅配置文件不存在时使用本地布局；无效配置、挂载身份、权限或路径边界不符时报阻塞，不回退。

NFSv4 权限检查使用本机 `getfattr`，拒绝所有者之外的有效或继承写授权。NAS 的 ACL 继承可能覆盖创建模式，须配置整个专属目录树的 ACL；`0755` 与 `umask 022` 本身不证明只有维护者可写。迁移修正 ACL 使用本机 `setfattr`，不安装项目依赖。

修改包集状态的 update 持本地操作锁；`check-current` 遇恢复记录时报阻塞，`observe` 只观察元数据，两者不持 update 锁。晋升前恢复记录保存旧指针，以及本地 `package.json`、`pnpm-lock.yaml` 的旧内容；远端指针与本地文件的更新不构成跨文件系统原子事务。Git 本地固定的 `pnpm-workspace.yaml` 在创建候选时复制进快照，晋升不替换；晋升校验清单、锁文件和 `node_modules`。失败恢复到上一个一致包集，中断后下一次更新先恢复再继续。完整历史快照和失败候选保留，不自动清理。hard NFS 断连时文件操作及恢复可能持续等待，子进程超时不证明已结束或回滚。上面的本机隔离测试及下面的历史启动记录均不构成 NFS 迁移验收；实施侧须另行确认实际挂载、完整快照、真实快照 bwrap 绑定、晋升故障与中断恢复。

2026-09-29 在本机 Linux/x64/glibc 的 `check-current` 实测记录：

| 产品        | 选中版本 | 直接入口与运行时                                     | 离线版本命令 |
| ----------- | -------- | ---------------------------------------------------- | ------------ |
| Codex CLI   | 0.157.1  | 主包 `bin/codex.js`，Node；锁定平台包提供原生二进制  | 成功，退出 0 |
| Claude Code | 2.1.283  | `@anthropic-ai/claude-code-linux-x64/claude`，原生   | 成功，退出 0 |
| OpenCode    | 1.18.33  | `opencode-linux-x64/bin/opencode`，原生              | 成功，退出 0 |
| Pi          | 0.73.1   | 主包 `dist/cli.js`，Node                             | 成功，退出 0 |
| OMP         | 18.3.4   | 主包 `dist/cli.js`，Bun；核对 `pi-natives-linux-x64` | 成功，退出 0 |

OpenCode 1.18.33 曾因候选锁文件生成阶段的 registry 超时被阻塞；失败候选未切换选中环境。已完整安装的候选重新核对并通过五项启动后才晋升。以上只记录启动状态，不能推断 Skills、MCP 等主题能力。
